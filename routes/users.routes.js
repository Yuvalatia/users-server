const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users.controllers');

router.get('/', UsersController.getUsers);
router.get('/:userId', UsersController.getUser);
router.post('/', UsersController.createNewUser);
router.patch('/:userId', UsersController.updateUser);

module.exports = router;