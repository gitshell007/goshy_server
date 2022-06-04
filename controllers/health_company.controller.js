var Health_company = require('../models/health_company.model');
var async = require('async');
/* COUNT FUNCTIONS */
exports.index = function(req, res) {
    async.parallel({
        health_companyCount: function(callback) {
            Health_company.count(callback);
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

// Display list of all health_company
exports.getAllHealth_company = function(req, res, next) {


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

    Health_company.paginate(query, options).then(function(result) {

        //Successful, so render
        res.json(result);
    })
};


/*
 *
 * GET ONE
 *
 */

exports.getOneHealth_companyItem = function(req, res, next) {
    var _id = req.params.id;
    Health_company.findById(_id, function(err, results) {
        res.json(results);
    });

};

/*
 *
 * DELETE
 *
 */

exports.deleteOneHealth_companyItem = function(req, res, next) {
    var _id = req.params.id;
    Health_company.findByIdAndRemove(_id, function(err, results) {
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

// Edit Health_company item
exports.updateOneHealth_companyItem = function(req, res, next) {
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
    const health_company = new Health_company({

        des: _des,
        code: _code, // Trailing comma add by python script
        _id: _id
    });
    if (insert) {
        Health_company.findByIdAndUpdate(_id, health_company, {}, function(err) {
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

// Create Health_company item
exports.createHealth_company = function(req, res, next) {

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
    const health_company = new Health_company({

        des: _des,
        code: _code
    });
    if (insert) {
        health_company.save(function(err) {
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

exports.getHealth_companyDropDown = function(req, res, next) {
    var query_value = req.params.value;
    var regexp = new RegExp(query_value, "i");
    var myquery = Health_company.find({}).sort({
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