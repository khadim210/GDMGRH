const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const expressConfig = require('./config/express');
const envConfig = require('./config/config');
const app = express();

// connect to database
mongoose.connect(envConfig.mongo.uri, envConfig.mongo.option);

// On connection
mongoose.connection.on('connected', () => {
    console.log('connected to database '+envConfig.mongo.uri);
});

// On error
mongoose.connection.on('error', (error) => {
    console.log('database error '+error);
});

// Express config
expressConfig(app);

// Router
// User
app.use('/users', require('./api/users'));
// Groupe
app.use('/groupe', require('./api/goupe'));

// Invalid Router Index
app.use('/*', (req, res) => {
		res.send('Invalid Endpoint');
	}
);

// Start Server
app.listen( envConfig.port, envConfig.ip, () => {
		console.log('Server Start on http://'+envConfig.ip+':'+ envConfig.port);
	}
);

