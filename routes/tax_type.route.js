var express = require('express');

var router = express.Router();

var tax_typeController = require('../controllers/tax_type.controller');

/* GET ALL for get Tax_type. */

router.get('/', tax_typeController.getAllTax_type);

/* POST request for creating Tax_type. */

router.post('/create', tax_typeController.createTax_type);

/* GET request for get Tax_type. */

router.get('/:id', tax_typeController.getOneTax_typeItem);

/* UPDATE request for Tax_type. */

router.post('/:id/update', tax_typeController.updateOneTax_typeItem);

/* DELETE request for Tax_type. */

router.delete('/:id', tax_typeController.deleteOneTax_typeItem);

router.get('/dropdown/:value', tax_typeController.getTax_typeDropDown);

module.exports = router