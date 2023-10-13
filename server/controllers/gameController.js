const Game = require('../models/gameModel');
const User = require('../models/userModel');
const userController = require('../controllers/userControllers')
const gameController = {};

// Create Game Controller
gameController.createGame = async (req, res, next) => {
    const { gameName, sport, location, address, partySize, dateTime } = req.body;
    console.log(req.user)
    const newGame = await Game.create({
        
        gameName: gameName,
        sport: sport,
        location: location,
        address: address,
        partySize: partySize,
        dateTime: dateTime,
        attending: [req.user.id],
        host: req.user.id
    })
        .then((game) => {
            if(!game) return next({message: 'Issue creating Game'});
            res.locals.game = {
                host: req.user.id,
                gameId: game._id
            };
        })
        .catch((err) => next(err));

    res.locals.gameArr = await Game.find().catch((err) => next(err));


    return next();
}

// Get all games created
gameController.getAllGames = async (req, res, next) => {
    res.locals.gameArr = await Game.find().catch((err) => next(err));
    return next();
}



// Update specific game and return array of games
gameController.updateGame = async (req, res, next) => {
    const { gameId, gameName, location, address, sports, partySize } = req.body;
    await Game.findByIdAndUpdate(gameId, { gameName: gameName, location: location, address: address, sports: sports, partySize: partySize })
        .catch((err) => next(err));
    
    res.locals.gameArr = await Game.find().catch((err) => next(err));
    return next();
}

// Delete specific game and return array of games
gameController.deleteGame = async (req, res, next) => {
    // BOBBY Switch to params
    const { gameId } = req.params;
    
    await Game.findByIdAndDelete(gameId).catch((err) => next(err));

    res.locals.gameArr = await Game.find().catch((err) => next(err));
    return next();
}

// Sign up for game and adds it to attending array, Checks to see if user is the host, if so adds it to 'Hosted Games'
gameController.addCreatedGame = async (req, res, next) => {
    // ADD Created Game
    req.user.attendingGames.push(res.locals.game.gameId);
    req.user.hostedGames.push(res.locals.game.gameId)
    await req.user.save();

    return next()
    
}

// Check to see if user trying to delete game is the Host of the Game
gameController.hostCheck = async (req, res, next) => {
    const { gameId } = req.params;
    const { user } = req;
    const game = await Game.findById(gameId)

    // BOBBY
    // HAD TO CHANGE THIS AFTER POPULATING IN THE PASSPORT MIDDLEWARE
    if (game.host.equals(user._id)) {
        return next()
    }
    // if(user.hostedGames.includes(gameId)) return next();

    return next({message: 'Only host may delete game'})
}


// Remove Deleted Game from Hosted array and Attending array
gameController.removeHostGame = async (req, res, next) => {
    const { gameId } = req.params;
    const { user } = req;

    const newHostArr = [];
    const newAttendArr = [];

    user.hostedGames.forEach((game) => {
        if(!game._id.equals(gameId)) {
            newHostArr.push(game);
        }
    })

    user.attendingGames.forEach((game) => {
        if(!game._id.equals(gameId)) {
            newHostArr.push(game);
        }
    })


    user.hostedGames = newHostArr;
    user.attendingGames = newHostArr;
    await user.save();
    
    
    return next()
}

gameController.removeAttendeeGame = async (req, res, next) => {
    const { gameId } = req.params
    await Game.findById(gameId)
        .then(async (foundGame) => {
            foundGame.attending.forEach(async (userId) =>  {
                if(`${userId}` === `${req.user._id}`) {
                    await User.findById(userId)
                .then(async (foundUser) => {
                    const newGamesArr = [];
                    foundUser.attendingGames.forEach((game) => {
                        if(`${game._id}` !== `${gameId}`) {
                            newGamesArr.push(game);
                        }
                    })
                    console.log('newGamesArr')
                    res.locals.newArr = newGamesArr;
                }).catch((err) => next(err))

            } else {
               await User.findById(userId)
                .then(async (foundUser) => {
                    const newGamesArr = [];
                    foundUser.attendingGames.forEach((game) => {
                        if(`${game._id}` !== `${gameId}`) {
                            newGamesArr.push(game);
                        }
                    })
                    foundUser.attendingGames = newGamesArr;
                    await foundUser.save()
                }).catch((err) => next(err))
            }
        })
        // }).catch((err) => next(err))
    })

    return next();
};


gameController.unattendGame = async (req, res, next) => {
  const { gameId } = req.params;
  const { user } = req;

  try {
    user.attendingGames = user.attendingGames.filter(game => game.id !== gameId);
    console.log(user.attendingGames);
    await user.save();

    res.locals.stillAttending = {
     message: "Game unattended", 
     updatedAttendingGames: user.attendingGames
    };
    return next();
  } catch (err) {
    next(err);
  }

};

gameController.attendGame = async (req, res, next) => {
    const { gameId } = req.params;
    const { user } = req;
 
    user.attendingGames.push(gameId);
    await user.save();

    await User.findById(user._id)
        .then(async (foundUser) => {
            res.locals.newAttendingGames = await foundUser.populate('attendingGames')
            return next();
        })
        .catch((err) => next(err))
}

gameController.doubleAttendCheck = async (req, res, next) => {
    const { user } = req;
    const { gameId } = req.params;
    for (const game of user.attendingGames) {
        if(game._id.equals(gameId)) return next({message: 'Already attending this game'})    
    }
    return next();  
    
    // if(!user.attendingGames.includes(gameId)) return next();
    // return next({message: 'Already attending this game'})
}

gameController.findWithin = async (req, res, next) => {
    const { lat, lng, radius } = req.query;
    
    res.locals.filteredGames = await Game.find({
        location: {
            $geoWithin: {
                $centerSphere: [[Number(lng), Number(lat)], Number(radius) / 3963.2]
            }
        }
    })

    next();
}

module.exports = gameController;