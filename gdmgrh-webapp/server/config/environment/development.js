'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {
    // MongoDB connection options
  mongo: {
    uri: 'mongodb://gdmgrh:gdmgrh2018@ds235352.mlab.com:35352/gdmgrhwebapp-dev',
    urilocal: 'mongodb://localhost/gdmgrhwebapp-dev'
  },

    // Seed database on startup
  seedDB: true,

  CLIENT_DOMAINE: 'http://localhost:3000',
  SERVER_DOMAINE: 'http://localhost:9000',
};
