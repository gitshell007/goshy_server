var mongoose = require('mongoose')
    , csv = require('fast-csv');
var Personal = require('../models/personal.model');
var user_type = require('../models/user_type.model');
var tax_type = require('../models/tax_type.model');
var payment_type = require('../models/payment_type.model');

module.exports.importMunicipios = function(filePath, fileHeaders, modelName) {
    csv
        .fromPath(filePath, {headers: fileHeaders, delimiter:'#'})
        .on('data', function(data) {

            var Obj = mongoose.model(modelName);

            var obj = new Municipios();

            Object.keys(data).forEach(function(key) {
                var val = data[key];
                if (val !== '')
                    obj.set(key, val);
            });

            obj.save(function (err) {
                if (err)
                    console.log(err);
            });
        })
        .on('end', function() {
            console.log("done");
        });
};

module.exports.importUserType = function(filePath, fileHeaders, modelName) {
    csv
        .fromPath(filePath, {headers: fileHeaders, delimiter:'#'})
        .on('data', function(data) {

            var Obj = mongoose.model(modelName);

            var obj = new UserType();

            Object.keys(data).forEach(function(key) {
                var val = data[key];
                if (val !== '')
                    obj.set(key, val);
            });

            obj.save(function (err) {
                if (err)
                    console.log(err);
            });
        })
        .on('end', function() {
            console.log("done");
        });

    return true;
};

module.exports.importPaymentType = function(filePath, fileHeaders, modelName) {
    csv
        .fromPath(filePath, {headers: fileHeaders, delimiter:'#'})
        .on('data', function(data) {


            var obj = new PaymentType();

            Object.keys(data).forEach(function(key) {
                var val = data[key];
                if (val !== '')
                    obj.set(key, val);
            });

            obj.save(function (err) {
                if (err)
                    console.log(err);
            });
        })
        .on('end', function() {
            console.log("done");
        });

    return true;
};

module.exports.importTaxType = function(filePath, fileHeaders, modelName) {
    csv
        .fromPath(filePath, {headers: fileHeaders, delimiter:'#'})
        .on('data', function(data) {


            var obj = new TaxType();

            Object.keys(data).forEach(function(key) {
                var val = data[key];
                if (val !== '')
                    obj.set(key, val);
            });

            obj.save(function (err) {
                if (err)
                    console.log(err);
            });
        })
        .on('end', function() {
            console.log("done");
        });

    return true;
};

