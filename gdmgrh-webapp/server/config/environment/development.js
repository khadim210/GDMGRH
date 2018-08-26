'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {
    // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/gdmgrhwebapp-dev'
  },

    // Seed database on startup
  seedDB: true,

  CLIENT_DOMAINE: 'http://localhost:3000',
  SERVER_DOMAINE: 'http://localhost:9000',
};
