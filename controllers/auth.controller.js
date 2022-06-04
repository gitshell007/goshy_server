var jwt = require('jsonwebtoken');
var Personal = require('../models/personal.model');
// Display list of all user
exports.authUser = function(req, res, next) {
    // find the user
    Personal.findOne({
        username: new RegExp('^' + req.body.username + '$', "i")
    }, function(err, user) {

        if (err) throw err;

        if (!user) {
            res.status(401).json({
                success: false,
                message: 'Authentication failed. User not found.'
            });
        } else if (user) {

            // check if password matches
            if (user.password != req.body.password) {
                res.status(401).json({
                    success: false,
                    message: 'Authentication failed. Wrong password.'
                });
            } else {

                // if user is found and password is right
                // create a token
                var token = jwt.sign(user.toJSON(), req.app.get('superSecret'), {
                    expiresIn: 1440 // expires in 24 hours
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }
        }
    });
};