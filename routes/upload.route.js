var express = require('express');

var router = express.Router();

var uploadController = require('../controllers/upload.controller');

/* GET ALL for get Upload. */

router.get('/', uploadController.getAllUpload);

/* POST request for creating Upload. */

router.post('/create', uploadController.createUpload);

/* GET request for get Upload. */

router.get('/:id', uploadController.getOneUploadItem);

/* UPDATE request for Upload. */

router.post('/:id/update', uploadController.updateOneUploadItem);

/* DELETE request for Upload. */

router.delete('/:id', uploadController.deleteOneUploadItem);

module.exports = router