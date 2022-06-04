var Tax_type = require('../models/tax_type.model');
var async = require('async');
/* COUNT FUNCTIONS */
exports.index = function(req, res) {
    async.parallel({
        tax_typeCount: function(callback) {
            Tax_type.count(callback);
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

// Display list of all tax_type
exports.getAllTax_type = function(req, res, next) {


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

    Tax_type.paginate(query, options).then(function(result) {

        //Successful, so render
        res.json(result);
    })
};


/*
 *
 * GET ONE
 *
 */

exports.getOneTax_typeItem = function(req, res, next) {
    var _id = req.params.id;
    Tax_type.findById(_id, function(err, results) {
        res.json(results);
    });

};

/*
 *
 * DELETE
 *
 */

exports.deleteOneTax_typeItem = function(req, res, next) {
    var _id = req.params.id;
    Tax_type.findByIdAndRemove(_id, function(err, results) {
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

// Edit Tax_type item
exports.updateOneTax_typeItem = function(req, res, next) {
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
    const tax_type = new Tax_type({

        des: _des,
        code: _code, // Trailing comma add by python script
        _id: _id
    });
    if (insert) {
        Tax_type.findByIdAndUpdate(_id, tax_type, {}, function(err) {
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

// Create Tax_type item
exports.createTax_type = function(req, res, next) {

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
    const tax_type = new Tax_type({

        des: _des,
        code: _code
    });
    if (insert) {
        tax_type.save(function(err) {
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

exports.getTax_typeDropDown = function(req, res, next) {
    var query_value = req.params.value;
    var regexp = new RegExp(query_value, "i");
    var myquery = Tax_type.find({}).sort({
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