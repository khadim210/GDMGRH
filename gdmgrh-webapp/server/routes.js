/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

import config from './config/environment';

export default function(app) {
    // Insert routes below
  app.use(`${config.url}user`, require('./api/module_noyau/account_management/user'));
  app.use(`${config.url}diplomes`, require('./api/module_noyau/diplomes'));
  app.use(`${config.url}grades`, require('./api/module_noyau/grades'));
  app.use('/auth', require('./auth').default);

    // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
        .get(errors[404]);

    // All other routes should redirect to the index.html
  app.route('/*')
        .get((req, res) => {
          res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
        });
}
