
// Database name
const dbname = 'gdmgrh';
const dbuser = 'gendarmerie';
const dbpassword ='P@ssw0rdgendarmerie';

module.exports = {
	// Server Port number
	port: process.env.PORT || 3000,


	// Server IP address
	//ip: process.env.IP || 'localhost',
	ip: process.env.IP || 'https://mlab.com/login/',


	// Mongoose config
	mongo: {
		//uri: `mongodb://localhost:27017/${dbname}`,
		uri: 'mongodb://'+dbuser+':'+dbpassword+'@ds147190.mlab.com:47190/database_gdmgrh',


		option: {
			autoIndex: false, // Don't build indexes
			reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
			reconnectInterval: 500, // Reconnect every 500ms
		}
	}
};
