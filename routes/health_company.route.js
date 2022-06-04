var express = require('express');

var router = express.Router();

var health_companyController = require('../controllers/health_company.controller');

/* GET ALL for get Health_company. */

router.get('/', health_companyController.getAllHealth_company);

/* POST request for creating Health_company. */

router.post('/create', health_companyController.createHealth_company);

/* GET request for get Health_company. */

router.get('/:id', health_companyController.getOneHealth_companyItem);

/* UPDATE request for Health_company. */

router.post('/:id/update', health_companyController.updateOneHealth_companyItem);

/* DELETE request for Health_company. */

router.delete('/:id', health_companyController.deleteOneHealth_companyItem);

router.get('/dropdown/:value', health_companyController.getHealth_companyDropDown);

module.exports = router