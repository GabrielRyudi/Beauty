var express = require('express');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var cors = require('cors');
var path = require('path');
var morgan = require('morgan');
var app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan("dev"));

app.use('/', require('./routes'));

module.exports = app;