
// Database name
const dbname = 'pptgendarmeriesn';

module.exports = {
	// Server Port number
	port: process.env.PORT || 3000,

	// Server IP address
	ip: process.env.IP || 'localhost',

	// Mongoose config
	mongo: {
		uri: `mongodb://localhost:27017/${dbname}`,
		option: {
			autoIndex: false, // Don't build indexes
			reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
			reconnectInterval: 500, // Reconnect every 500ms
		}
	}
};