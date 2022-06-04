var Upload = require('../models/upload.model');
var async = require('async');
var fs = require('fs');
let folder = '/Users/gitshell/Dropbox/PROYECTOS/MERCURY/PRENALIA/source/backend/uploads/'
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

exports.getProfilePicture = function(req, res, next) {
    let file_id = req.params.file_id;
    let file_name = '';
    Upload.findById(file_id , function(err, results) {
        file_name = results.name;
        fs.readFile(folder + file_name, function(err, data) {
            if (err) throw err;
            res.writeHead(200, {'Content-Type': 'image/png' });
            res.write(data);
            res.end();
        });
    });

};

