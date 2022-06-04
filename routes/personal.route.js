var express = require('express');

var router = express.Router();

var personalController = require('../controllers/personal.controller');

var multer = require('multer');

var path = require('path');

var uploadModule = require('../aux_modules/upload.module');

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb){
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init Upload
const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    }
}).single('file');


// Check File Type
function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null,true);
    } else {
        cb('Error: Images Only!');
    }
}

router.post('/upload', (req, res) => {
    console.log("test");

    upload(req, res, (err) => {
        if(err){
            console.log(err);
        } else {
            //req.file.filename
            let row = uploadModule.saveFile('default',req.file.filename,res);
            console.log('el id que devuelve es' + row._id);
            if(row._id != undefined)
            {
                res.json({result:'1',_id:row._id});
            }
            else
            {
                res.json({result:'0',_id:''});
            }
            /*
            if(req.file == undefined){
                res.json({result:'1',_id:row._id});
            } else {
                res.json({result:'0',_id:'0'});
            }*/
        }
    });
});


/* GET ALL for get Personal. */

router.get('/', personalController.getAllPersonal);

/* POST request for creating Personal. */

router.post('/create', personalController.createPersonal);

/* GET request for get Personal. */

router.get('/:id', personalController.getOnePersonalItem);

/* UPDATE request for Personal. */

router.post('/:id/update', personalController.updateOnePersonalItem);

/* DELETE request for Personal. */

router.delete('/:id', personalController.deleteOnePersonalItem);

module.exports = router