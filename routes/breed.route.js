var express = require('express');

var router = express.Router();

var breedController = require('../controllers/breed.controller');

/* GET ALL for get Breed. */

router.get('/', breedController.getAllBreed);

/* POST request for creating Breed. */

router.post('/create', breedController.createBreed);

/* GET request for get Breed. */

router.get('/:id', breedController.getOneBreedItem);

/* UPDATE request for Breed. */

router.post('/:id/update', breedController.updateOneBreedItem);

/* DELETE request for Breed. */

router.delete('/:id', breedController.deleteOneBreedItem);

router.get('/dropdown/:value', breedController.getBreedDropDown);

module.exports = router