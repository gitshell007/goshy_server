var express = require('express');
var router = express.Router();
var authController = require('../controllers/auth.controller');
/* POST request for creating User. */
router.post('/', authController.authUser);
module.exports = router