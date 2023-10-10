const User = require('../models/userModel');

const userController = {};


//update profile fields (ex: usernames, password, ...etc);
userController.updateUser = async (req, res, next) => {
  const { _id, username, fullName, favoriteSports } = req.body;

  
  await User.findByIdAndUpdate( _id, {username: username, fullName: fullName, favoriteSports: favoriteSports})
    .catch((err) => next(err))


  res.locals.updatedUser = await User.findById(_id);  
  return next()  
};

userController.getUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).populate();

    res.locals.user = user;
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = userController;