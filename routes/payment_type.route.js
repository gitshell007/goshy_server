var express = require('express');

var router = express.Router();

var payment_typeController = require('../controllers/payment_type.controller');

/* GET ALL for get Payment_type. */

router.get('/', payment_typeController.getAllPayment_type);

/* POST request for creating Payment_type. */

router.post('/create', payment_typeController.createPayment_type);

/* GET request for get Payment_type. */

router.get('/:id', payment_typeController.getOnePayment_typeItem);

/* UPDATE request for Payment_type. */

router.post('/:id/update', payment_typeController.updateOnePayment_typeItem);

/* DELETE request for Payment_type. */

router.delete('/:id', payment_typeController.deleteOnePayment_typeItem);

router.get('/dropdown/:value', payment_typeController.getPayment_typeDropDown);

module.exports = router