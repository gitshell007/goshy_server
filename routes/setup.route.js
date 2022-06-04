/**
 * Created by gitshell on 03/08/2017.
 */
var express = require('express');
var router = express.Router();
var Personal = require('../models/personal.model');
var User_type = require('../models/user_type.model');
var Tax_type = require('../models/tax_type.model');
var Payment_type = require('../models/payment_type.model');
var Upload_model = require('../models/upload.model');
var csv = require('../modules/csv');
router.get('/admin', function (req, res) {




    //Personal.collection.remove();

    // IMPORTAMOS TIPOS DE USUARIO
/*
    UserType.collection.remove();
    var csvHeaders = {
        USERTYPE: {
            headers: ['des', 'code']
        }
    };

    csv.importUserType('ext/user_type.csv', csvHeaders.USERTYPE.headers, 'UserType');




    // IMPORTAMOS TIPOS DE PAGO
    PaymentType.remove();

    csvHeaders = {
        PAYMENTTYPE: {
            headers: ['des', 'code']
        }
    };

    csv.importPaymentType('ext/payment_type.csv', csvHeaders.PAYMENTTYPE.headers, 'PaymentType');

    // IMPORTAMOS TIPOS DE IMPUESTO

    TaxType.collection.remove();
    csvHeaders = {
        TAXTYPE: {
            headers: ['des', 'code']
        }
    };

    csv.importTaxType('ext/tax_type.csv', csvHeaders.TAXTYPE.headers, 'TaxType');

       */

    // create a sample user
    var admin = new Personal({
        cod_num: 'null',
        cod_corto: 'adm',
        first_name: 'Miguel',
        last_name: 'Burgos Canto',
        phone_mobile1: '600980214',
        phone_mobile2: 'null',
        phone_fixed: 'null',
        fecha_nac: 'null',
        username: 'admin',
        password: 'gitshell',
        enabled: '1',
        nif: '30806388G',
        tax_type: '5a9ebb9c65b950b60a7efa2f',
        localidad: '59feea632b57e5e6c4da3da2',
        provincia: '59feea632b57e5e6c4da3da2',
        cp: '59feea632b57e5e6c4da3da2',
        user_type: '5a9ebb9c65b950b60a7efa2e',
        payment_type: '5a9ebb9c65b950b60a7efa2f',
        photo: 'asdfasfdsfdsaf',
        email: 'xx'
    });

    // save the sample user
    admin.save(function (err) {
        if (err) {
            console.log(err);
            res.json({success: false});
        }
        else {
            console.log('User saved successfully');
            res.json({success: true});
        }
    });


/*
res.json({success: true});
    // Importamos municipios


    var csvHeaders = {
        PROVINCIA: {
            headers: ['cp', 'localidad', 'provincia']
        }
    }

//adjust this path to the correct location
    csv.importFile('ext/municipios.csv', csvHeaders.PROVINCIA.headers, 'Municipios');
    */
});

module.exports = router;