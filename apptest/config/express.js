const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const express = require('express');

module.exports = function(app) {
    // CORS Middleware
    app.use(cors());

    // Set static folder
    app.use(express.static('client'));

    // Body Parser Middleware
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    
    app.use(bodyParser.json());
}