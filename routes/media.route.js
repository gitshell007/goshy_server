/**
 * Created by gitshell on 03/08/2018.
 */
var express = require('express');
var router = express.Router();

var mediaController = require('../controllers/media.controller');

router.get('/get_picture_profile/:file_id', mediaController.getProfilePicture);


module.exports = router;