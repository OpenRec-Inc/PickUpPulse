const router = require('express').Router();
const passport = require('passport');
const userController = require('../controllers/userControllers');

// Update User information
router.patch('/', userController.updateUser, (req, res) => {
    return res.status(200).json(res.locals.updatedUser);
})

router.get('/', userController.getUser, (req, res) => {
  return res.status(200).json(res.locals.user);
})

module.exports = router;