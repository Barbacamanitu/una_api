var express = require('express')
var app = express()
var port = 8081;
var apiRoute = require('./api/router')
var orm = require('orm');
var configFile = './api/config/db.json';
var opts = require(configFile);
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(orm.express(opts, {
    define: function (db, models, next) {
        models.professor = require('./api/db/professorModel')(db);
        models.student = require('./api/db/studentModel')(db);
        next();
    }
}));


app.use('/api',apiRoute);

app.listen(port)
console.log("Listening on port " + port.toString());