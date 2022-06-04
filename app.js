var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

// import config file
var config = require('./config'); // get our config file

// Rutas
var auth = require('./routes/auth.route');
var apiv1 = require('./routes/apiv1.route');
var setup = require('./routes/setup.route');
var media = require('./routes/media.route');
var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.set('superSecret', config.secret); // secret variable
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Tiene que tener este orden
app.use(expressValidator() ); // Add this after the bodyParser middleware!
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'dist')));

// Point static path to dist
app.use('/api', apiv1);
app.use('/setup', setup);
app.use('/media', media);
app.use('/auth', auth);

// Todas las demas rutas al raiz
app.get('*',function (req, res) {
    res.redirect('/');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // INICIO UPLOADER
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    // FIN DE UPLOADER
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    //res.render('error');
    res.json({
        message: err.message,
        error: err
    });
});

module.exports = app;
