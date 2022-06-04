var express = require('express');
var router = express.Router();
const personalRoute = require('./personal.route');
const municipiosRoute = require('./municipios.route');
const user_typeRoute = require('./user_type.route');
const payment_typeRoute = require('./payment_type.route');
const tax_typeRoute = require('./tax_type.route');
const health_companyRoute = require('./health_company.route');
const breedRoute = require('./breed.route');
const uploadRoute = require('./upload.route');
router.use('/personal', personalRoute)
router.use('/municipios', municipiosRoute)
router.use('/user_type', user_typeRoute)
router.use('/payment_type', payment_typeRoute)
router.use('/tax_type', tax_typeRoute)
router.use('/health_company', health_companyRoute)
router.use('/breed', breedRoute)
router.use('/upload', uploadRoute)
module.exports = router