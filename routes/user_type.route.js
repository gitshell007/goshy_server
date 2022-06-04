var express = require('express');

var router = express.Router();

var user_typeController = require('../controllers/user_type.controller');

/* GET ALL for get User_type. */

router.get('/', user_typeController.getAllUser_type);

/* POST request for creating User_type. */

router.post('/create', user_typeController.createUser_type);

/* GET request for get User_type. */

router.get('/:id', user_typeController.getOneUser_typeItem);

/* UPDATE request for User_type. */

router.post('/:id/update', user_typeController.updateOneUser_typeItem);

/* DELETE request for User_type. */

router.delete('/:id', user_typeController.deleteOneUser_typeItem);

router.get('/dropdown/:value', user_typeController.getUser_typeDropDown);

module.exports = router