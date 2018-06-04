const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const passport = require('passport');

module.exports = function(app) {
    // CORS Middleware
    app.use(cors());

    // Body Parser Middleware
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    
    app.use(bodyParser.json());
}