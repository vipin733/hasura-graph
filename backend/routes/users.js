const express = require('express');
const UserController = require('../controllers/userController');
const router = express.Router();

/* get users listing. */
router.post('/', async (req, res, next) =>  {
  let userController = new UserController(req, res)
  return userController.getUsers()
});


/* get users listing. by radius */
router.post('/radius', function(req, res, next) {
  let userController = new UserController(req, res)
  return userController.getUsersByRadius()
});

module.exports = router;
