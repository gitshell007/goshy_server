var Breed = require('../models/breed.model');
var async = require('async');
/* COUNT FUNCTIONS */
exports.index = function(req, res) {
    async.parallel({
        breedCount: function(callback) {
            Breed.count(callback);
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

// Display list of all breed
exports.getAllBreed = function(req, res, next) {


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

    Breed.paginate(query, options).then(function(result) {

        //Successful, so render
        res.json(result);
    })
};


/*
 *
 * GET ONE
 *
 */

exports.getOneBreedItem = function(req, res, next) {
    var _id = req.params.id;
    Breed.findById(_id, function(err, results) {
        res.json(results);
    });

};

/*
 *
 * DELETE
 *
 */

exports.deleteOneBreedItem = function(req, res, next) {
    var _id = req.params.id;
    Breed.findByIdAndRemove(_id, function(err, results) {
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

// Edit Breed item
exports.updateOneBreedItem = function(req, res, next) {
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
    const breed = new Breed({

        des: _des,
        code: _code, // Trailing comma add by python script
        _id: _id
    });
    if (insert) {
        Breed.findByIdAndUpdate(_id, breed, {}, function(err) {
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

// Create Breed item
exports.createBreed = function(req, res, next) {

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
    const breed = new Breed({

        des: _des,
        code: _code
    });
    if (insert) {
        breed.save(function(err) {
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

exports.getBreedDropDown = function(req, res, next) {
    var query_value = req.params.value;
    var regexp = new RegExp(query_value, "i");
    var myquery = Breed.find({}).sort({
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