var Upload = require('../models/upload.model');
var async = require('async');
/* COUNT FUNCTIONS */
exports.index = function(req, res) {
    async.parallel({
        uploadCount: function(callback) {
            Upload.count(callback);
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

// Display list of all upload
exports.getAllUpload = function(req, res, next) {


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

    Upload.paginate(query, options).then(function(result) {

        //Successful, so render
        res.json(result);
    })
};


/*
 *
 * GET ONE
 *
 */

exports.getOneUploadItem = function(req, res, next) {
    var _id = req.params.id;
    Upload.findById(_id, function(err, results) {
        res.json(results);
    });

};

/*
 *
 * DELETE
 *
 */

exports.deleteOneUploadItem = function(req, res, next) {
    var _id = req.params.id;
    Upload.findByIdAndRemove(_id, function(err, results) {
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

// Edit Upload item
exports.updateOneUploadItem = function(req, res, next) {
    _id = req.params.id;
    var insert = true;
    var _type = "null";
    if (req.body.type) {
        _type = req.body.type;
    } else {
        console.log("falta el campo type");
        insert = false;
    }
    var _name = "null";
    if (req.body.name) {
        _name = req.body.name;
    } else {
        console.log("falta el campo name");
        insert = false;
    }
    var _status = "null";
    if (req.body.status) {
        _status = req.body.status;
    } else {
        console.log("falta el campo status");
        insert = false;
    }
    var _upload_date = "null";
    if (req.body.upload_date) {
        _upload_date = req.body.upload_date;
    }

    const upload = new Upload({

        type: _type,
        name: _name,
        status: _status,
        upload_date: _upload_date, // Trailing comma add by python script
        _id: _id
    });
    if (insert) {
        Upload.findByIdAndUpdate(_id, upload, {}, function(err) {
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

// Create Upload item
exports.createUpload = function(req, res, next) {

    var insert = true;
    var _type = "null";
    if (req.body.type) {
        _type = req.body.type;
    } else {
        console.log("falta el campo type");
        insert = false;
    }
    var _name = "null";
    if (req.body.name) {
        _name = req.body.name;
    } else {
        console.log("falta el campo name");
        insert = false;
    }
    var _status = "null";
    if (req.body.status) {
        _status = req.body.status;
    } else {
        console.log("falta el campo status");
        insert = false;
    }
    var _upload_date = "null";
    if (req.body.upload_date) {
        _upload_date = req.body.upload_date;
    }

    const upload = new Upload({

        type: _type,
        name: _name,
        status: _status,
        upload_date: _upload_date
    });
    if (insert) {
        upload.save(function(err) {
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