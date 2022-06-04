var Municipios = require('../models/municipios.model');
var async = require('async');
/* COUNT FUNCTIONS */
exports.index = function(req, res) {
    async.parallel({
        municipiosCount: function(callback) {
            Municipios.count(callback);
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

// Display list of all municipios
exports.getAllMunicipios = function(req, res, next) {


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

    Municipios.paginate(query, options).then(function(result) {

        //Successful, so render
        res.json(result);
    })
};


/*
 *
 * GET ONE
 *
 */

exports.getOneMunicipiosItem = function(req, res, next) {
    var _id = req.params.id;
    Municipios.findById(_id, function(err, results) {
        res.json(results);
    });

};

/*
 *
 * DELETE
 *
 */

exports.deleteOneMunicipiosItem = function(req, res, next) {
    var _id = req.params.id;
    Municipios.findByIdAndRemove(_id, function(err, results) {
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

// Edit Municipios item
exports.updateOneMunicipiosItem = function(req, res, next) {
    _id = req.params.id;
    var insert = true;
    var _localidad = "null";
    if (req.body.localidad) {
        _localidad = req.body.localidad;
    } else {
        console.log("falta el campo localidad");
        insert = false;
    }
    var _provincia = "null";
    if (req.body.provincia) {
        _provincia = req.body.provincia;
    } else {
        console.log("falta el campo provincia");
        insert = false;
    }
    var _cp = "null";
    if (req.body.cp) {
        _cp = req.body.cp;
    } else {
        console.log("falta el campo cp");
        insert = false;
    }
    const municipios = new Municipios({

        localidad: _localidad,
        provincia: _provincia,
        cp: _cp, // Trailing comma add by python script
        _id: _id
    });
    if (insert) {
        Municipios.findByIdAndUpdate(_id, municipios, {}, function(err) {
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

// Create Municipios item
exports.createMunicipios = function(req, res, next) {

    var insert = true;
    var _localidad = "null";
    if (req.body.localidad) {
        _localidad = req.body.localidad;
    } else {
        console.log("falta el campo localidad");
        insert = false;
    }
    var _provincia = "null";
    if (req.body.provincia) {
        _provincia = req.body.provincia;
    } else {
        console.log("falta el campo provincia");
        insert = false;
    }
    var _cp = "null";
    if (req.body.cp) {
        _cp = req.body.cp;
    } else {
        console.log("falta el campo cp");
        insert = false;
    }
    const municipios = new Municipios({

        localidad: _localidad,
        provincia: _provincia,
        cp: _cp
    });
    if (insert) {
        municipios.save(function(err) {
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

exports.getMunicipiosAutocomplete = function(req, res, next) {
    var query_value = req.params.value;
    var regexp = new RegExp(query_value, "i");
    var myquery = Municipios.find({
        localidad: regexp
    }).limit(10).sort({
        localidad: -1
    }).select({
        localidad: 1,
        provincia: 1,
        localidad_provincia: 1,
        cp: 1
    })
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

// Get one row from other field value rather than ID municipios
exports.getOneMunicipiosItemByCP = function(req, res, next) {
    Municipios.aggregate([{
                "$match": {
                    "cp": {
                        "$regex": req.params.id,
                        "$options": "i"
                    }
                }
            },
            // Group back as an array with only the matching elements
            {
                "$group": {

                    "_id": "$provincia",
                    "_id2": {
                        "$first": "$_id"
                    },
                    "localidad": {
                        "$first": "$localidad"
                    },
                    "provincia": {
                        "$first": "$provincia"
                    },
                    "cp": {
                        "$first": "$cp"
                    }
                }
            }
        ],
        function(err, result) {
            if (err) {
                next(err);
            } else {
                //console.log('el resultado es' + JSON.stringify(result));
                res.json(result);
            }
        }
    );
};
exports.getManyMunicipiosItemByCP = function(req, res, next) {
    //console.log('getManyMunicipiosItemByCP' + req.params.id);
    //var query_field = 'cp';
    var regexp = new RegExp(req.params.id, "i");
    var myquery = Municipios.find({
        cp: regexp
    }).
    select({
        localidad: 1,
        provincia: 1,
        cp: 1
    })
    myquery.exec(function(err, items) {
        if (!err) {
            return res.send(items);
        } else {
            return res.send({
                status: '500 Server error'
            });
        }
    });
};