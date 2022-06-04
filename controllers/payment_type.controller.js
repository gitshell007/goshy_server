var Payment_type = require('../models/payment_type.model');
var async = require('async');
/* COUNT FUNCTIONS */
exports.index = function(req, res) {
    async.parallel({
        payment_typeCount: function(callback) {
            Payment_type.count(callback);
        }
    }, function(err, results) {
        res.json(err);
    });
};

/*
 *
 * SEARCH
 *
 */

// Display list of all payment_type
exports.getAllPayment_type = function(req, res, next) {


    var sort_field = req.query.sort_field;
    var sort_order = req.query.sort_order;
    var offset = parseInt(req.query.offset);
    var limit = parseInt(req.query.limit);
    var query_field = req.query.query_field;
    var query_value = req.query.query_value;
    var fields_to_show = req.query.fields_to_show.replace(/#/g, ' ');
    var query = {};
    var regexp = new RegExp(query_value, "i");
    if (query_field) {
        query[query_field] = regexp;
    } else {
        //console.log("no encontro ningun campo para filtrar");
    }
    var options = {
        select: fields_to_show,
        sort: {
            sort_field: -1
        },
        page: offset,
        limit: limit
    };

    Payment_type.paginate(query, options).then(function(result) {

        //Successful, so render
        res.json(result);
    })
};


/*
 *
 * GET ONE
 *
 */

exports.getOnePayment_typeItem = function(req, res, next) {
    var _id = req.params.id;
    Payment_type.findById(_id, function(err, results) {
        res.json(results);
    });

};

/*
 *
 * DELETE
 *
 */

exports.deleteOnePayment_typeItem = function(req, res, next) {
    var _id = req.params.id;
    Payment_type.findByIdAndRemove(_id, function(err, results) {
        if (err) {
            res.json({
                status: 0,
                message: err
            });
        } else {
            res.json({
                status: 1,
                message: "OK"
            });
        }
    });

};


/*
 *
 * EDIT
 *
 */

// Edit Payment_type item
exports.updateOnePayment_typeItem = function(req, res, next) {
    _id = req.params.id;
    var insert = true;
    var _des = "null";
    if (req.body.des) {
        _des = req.body.des;
    } else {
        console.log("falta el campo des");
        insert = false;
    }
    var _code = "null";
    if (req.body.code) {
        _code = req.body.code;
    } else {
        console.log("falta el campo code");
        insert = false;
    }
    const payment_type = new Payment_type({

        des: _des,
        code: _code, // Trailing comma add by python script
        _id: _id
    });
    if (insert) {
        Payment_type.findByIdAndUpdate(_id, payment_type, {}, function(err) {
            if (err) {
                res.json({
                    status: 0,
                    message: " Error"
                });
            } else {
                res.json({
                    status: 1,
                    message: "OK"
                });
            }
        });
    } else {
        res.json({
            status: 0,
            message: " Error"
        });
    }
};

/*
 *
 * CREATE
 *
 */

// Create Payment_type item
exports.createPayment_type = function(req, res, next) {

    var insert = true;
    var _des = "null";
    if (req.body.des) {
        _des = req.body.des;
    } else {
        console.log("falta el campo des");
        insert = false;
    }
    var _code = "null";
    if (req.body.code) {
        _code = req.body.code;
    } else {
        console.log("falta el campo code");
        insert = false;
    }
    const payment_type = new Payment_type({

        des: _des,
        code: _code
    });
    if (insert) {
        payment_type.save(function(err) {
            if (err) {
                res.json({
                    status: 0,
                    message: " Error"
                });
            } else {
                res.json({
                    status: 1,
                    message: "OK"
                });
            }
        });
    } else {
        res.json({
            status: 0,
            message: " Error"
        });
    }
};

exports.getPayment_typeDropDown = function(req, res, next) {
    var query_value = req.params.value;
    var regexp = new RegExp(query_value, "i");
    var myquery = Payment_type.find({}).sort({
        des: 1
    }).select({
        des: 1,
        code: 1
    });
    myquery.exec(function(err, items) {
        if (!err) {
            // console.log(items);
            return res.send(items);
        } else {
            return res.send({
                status: '500 Server error'
            });
        }
    });
};