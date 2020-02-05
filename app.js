var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

// Using monk and mongodb
/*var mongo = require('mongodb');
var monk = require('monk');*/

// Using mongoose
var mongoose = require('mongoose');
var routes = require('./routes/contactDetailsService');

/*var db = monk('localhost:27017/autodeskapp');*/

var app = express();

// Configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/localDatabase');

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'assets')));

// Make db accessible to the router
/*app.use(function(req, res, next) {
    req.db = db;
    next();
});*/

// Registering the routes
app.use('/', routes);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Development error handler
// Will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// Production error handler
// No stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
