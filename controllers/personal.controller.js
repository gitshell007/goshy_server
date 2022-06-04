var Personal = require('../models/personal.model');
var async = require('async');
/* COUNT FUNCTIONS */
exports.index = function(req, res) {
    async.parallel({
        personalCount: function(callback) {
            Personal.count(callback);
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

// Display list of all personal
exports.getAllPersonal = function(req, res, next) {


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

    Personal.paginate(query, options).then(function(result) {

        //Successful, so render
        res.json(result);
    })
};


/*
 *
 * GET ONE
 *
 */

exports.getOnePersonalItem = function(req, res, next) {
    var _id = req.params.id;
    Personal.findById(_id, function(err, results) {
        res.json(results);
    });

};

/*
 *
 * DELETE
 *
 */

exports.deleteOnePersonalItem = function(req, res, next) {
    var _id = req.params.id;
    Personal.findByIdAndRemove(_id, function(err, results) {
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

// Edit Personal item
exports.updateOnePersonalItem = function(req, res, next) {
    _id = req.params.id;
    var insert = true;
    var _first_name = "null";
    if (req.body.first_name) {
        _first_name = req.body.first_name;
    } else {
        console.log("falta el campo first_name");
        insert = false;
    }
    var _last_name = "null";
    if (req.body.last_name) {
        _last_name = req.body.last_name;
    } else {
        console.log("falta el campo last_name");
        insert = false;
    }
    var _enabled = "null";
    if (req.body.enabled) {
        _enabled = req.body.enabled;
    } else {
        console.log("falta el campo enabled");
        insert = false;
    }
    var _username = "null";
    if (req.body.username) {
        _username = req.body.username;
    } else {
        console.log("falta el campo username");
        insert = false;
    }
    var _email = "null";
    if (req.body.email) {
        _email = req.body.email;
    } else {
        console.log("falta el campo email");
        insert = false;
    }
    var _password = "null";
    if (req.body.password) {
        _password = req.body.password;
    } else {
        console.log("falta el campo password");
        insert = false;
    }
    var _cod_corto = "null";
    if (req.body.cod_corto) {
        _cod_corto = req.body.cod_corto;
    } else {
        console.log("falta el campo cod_corto");
        insert = false;
    }
    var _phone_mobile1 = "null";
    if (req.body.phone_mobile1) {
        _phone_mobile1 = req.body.phone_mobile1;
    } else {
        console.log("falta el campo phone_mobile1");
        insert = false;
    }
    var _phone_mobile2 = "null";
    if (req.body.phone_mobile2) {
        _phone_mobile2 = req.body.phone_mobile2;
    } else {
        console.log("falta el campo phone_mobile2");
        insert = false;
    }
    var _phone_fixed = "null";
    if (req.body.phone_fixed) {
        _phone_fixed = req.body.phone_fixed;
    } else {
        console.log("falta el campo phone_fixed");
        insert = false;
    }
    var _fecha_nac = "null";
    if (req.body.fecha_nac) {
        _fecha_nac = req.body.fecha_nac;
    } else {
        console.log("falta el campo fecha_nac");
        insert = false;
    }
    var _nif = "null";
    if (req.body.nif) {
        _nif = req.body.nif;
    } else {
        console.log("falta el campo nif");
        insert = false;
    }
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
    var _user_type = "null";
    if (req.body.user_type) {
        _user_type = req.body.user_type;
    } else {
        console.log("falta el campo user_type");
        insert = false;
    }
    var _tax_type = "null";
    if (req.body.tax_type) {
        _tax_type = req.body.tax_type;
    } else {
        console.log("falta el campo tax_type");
        insert = false;
    }
    var _payment_type = "null";
    if (req.body.payment_type) {
        _payment_type = req.body.payment_type;
    } else {
        console.log("falta el campo payment_type");
        insert = false;
    }
    var _photo = "null";
    if (req.body.photo) {
        _photo = req.body.photo;
    } else {
        console.log("falta el campo photo");
        insert = false;
    }
    const personal = new Personal({

        first_name: _first_name,
        last_name: _last_name,
        enabled: _enabled,
        username: _username,
        email: _email,
        password: _password,
        cod_corto: _cod_corto,
        phone_mobile1: _phone_mobile1,
        phone_mobile2: _phone_mobile2,
        phone_fixed: _phone_fixed,
        fecha_nac: _fecha_nac,
        nif: _nif,
        localidad: _localidad,
        provincia: _provincia,
        cp: _cp,
        user_type: _user_type,
        tax_type: _tax_type,
        payment_type: _payment_type,
        photo: _photo, // Trailing comma add by python script
        _id: _id
    });
    if (insert) {
        Personal.findByIdAndUpdate(_id, personal, {}, function(err) {
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

// Create Personal item
exports.createPersonal = function(req, res, next) {

    var insert = true;
    var _first_name = "null";
    if (req.body.first_name) {
        _first_name = req.body.first_name;
    } else {
        console.log("falta el campo first_name");
        insert = false;
    }
    var _last_name = "null";
    if (req.body.last_name) {
        _last_name = req.body.last_name;
    } else {
        console.log("falta el campo last_name");
        insert = false;
    }
    var _enabled = "null";
    if (req.body.enabled) {
        _enabled = req.body.enabled;
    } else {
        console.log("falta el campo enabled");
        insert = false;
    }
    var _username = "null";
    if (req.body.username) {
        _username = req.body.username;
    } else {
        console.log("falta el campo username");
        insert = false;
    }
    var _email = "null";
    if (req.body.email) {
        _email = req.body.email;
    } else {
        console.log("falta el campo email");
        insert = false;
    }
    var _password = "null";
    if (req.body.password) {
        _password = req.body.password;
    } else {
        console.log("falta el campo password");
        insert = false;
    }
    var _cod_corto = "null";
    if (req.body.cod_corto) {
        _cod_corto = req.body.cod_corto;
    } else {
        console.log("falta el campo cod_corto");
        insert = false;
    }
    var _phone_mobile1 = "null";
    if (req.body.phone_mobile1) {
        _phone_mobile1 = req.body.phone_mobile1;
    } else {
        console.log("falta el campo phone_mobile1");
        insert = false;
    }
    var _phone_mobile2 = "null";
    if (req.body.phone_mobile2) {
        _phone_mobile2 = req.body.phone_mobile2;
    } else {
        console.log("falta el campo phone_mobile2");
        insert = false;
    }
    var _phone_fixed = "null";
    if (req.body.phone_fixed) {
        _phone_fixed = req.body.phone_fixed;
    } else {
        console.log("falta el campo phone_fixed");
        insert = false;
    }
    var _fecha_nac = "null";
    if (req.body.fecha_nac) {
        _fecha_nac = req.body.fecha_nac;
    } else {
        console.log("falta el campo fecha_nac");
        insert = false;
    }
    var _nif = "null";
    if (req.body.nif) {
        _nif = req.body.nif;
    } else {
        console.log("falta el campo nif");
        insert = false;
    }
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
    var _user_type = "null";
    if (req.body.user_type) {
        _user_type = req.body.user_type;
    } else {
        console.log("falta el campo user_type");
        insert = false;
    }
    var _tax_type = "null";
    if (req.body.tax_type) {
        _tax_type = req.body.tax_type;
    } else {
        console.log("falta el campo tax_type");
        insert = false;
    }
    var _payment_type = "null";
    if (req.body.payment_type) {
        _payment_type = req.body.payment_type;
    } else {
        console.log("falta el campo payment_type");
        insert = false;
    }
    var _photo = "null";
    if (req.body.photo) {
        _photo = req.body.photo;
    } else {
        console.log("falta el campo photo");
        insert = false;
    }
    const personal = new Personal({

        first_name: _first_name,
        last_name: _last_name,
        enabled: _enabled,
        username: _username,
        email: _email,
        password: _password,
        cod_corto: _cod_corto,
        phone_mobile1: _phone_mobile1,
        phone_mobile2: _phone_mobile2,
        phone_fixed: _phone_fixed,
        fecha_nac: _fecha_nac,
        nif: _nif,
        localidad: _localidad,
        provincia: _provincia,
        cp: _cp,
        user_type: _user_type,
        tax_type: _tax_type,
        payment_type: _payment_type,
        photo: _photo
    });
    if (insert) {
        personal.save(function(err) {
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