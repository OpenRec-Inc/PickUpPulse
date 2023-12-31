const router = require('express').Router();
const passport = require('passport');
const gameController = require('../controllers/gameController');

//Verify if we need to add passport authenticate for each route

// Create Game route
router.post('/', gameController.createGame, gameController.addCreatedGame, (req, res) => {
    return res.status(200).json(res.locals.gameArr)
});

// Get All Games route
router.get('/', gameController.getAllGames, (req, res) => {
    return res.status(200).json(res.locals.gameArr);
});

// Update Game route
router.patch('/', gameController.updateGame, (req, res) => {
    return res.status(200).json(res.locals.gameArr);
});

// Delete Game route (From host)
// Bobby :/gameId
router.delete('/:gameId', gameController.hostCheck, gameController.removeAttendeeGame, gameController.removeHostGame, gameController.deleteGame,(req, res) => {
    return res.status(200).json(res.locals.gameArr);
})


//Update remove attending game by user
router.patch('/unattendGame/:gameId', gameController.unattendGame, (req, res) => {
    // SEND BACK USER
    return res.status(200).json(res.locals.stillAttending)
})

router.patch('/attendGame/:gameId', gameController.doubleAttendCheck, gameController.attendGame,(req, res) => {
    return res.status(200).json(res.locals.newAttendingGames);
})

router.get('/nearMe', gameController.findWithin,(req, res) => {
    return res.status(200).json(res.locals.filteredGames)
})

module.exports = router;