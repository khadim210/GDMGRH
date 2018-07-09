/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

import config from './config/environment';

export default function(app) {
    // Insert routes below
  app.use('/api/user', require('./api/module_noyau/account_management/user'));
  app.use('/api/groupe', require('./api/module_noyau/account_management/group'));

  app.use('/api/diplomes', require('./api/module_noyau/diplomes'));
  app.use('/api/grades', require('./api/module_noyau/grades'));

  app.use('/api/sanction/punition', require('./api/module_noyau/sanction/punition'));
  app.use('/api/sanction/recompense', require('./api/module_noyau/sanction/recompense'));


    // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
        .get(errors[404]);

    // All other routes should redirect to the index.html
  app.route('/*')
        .get((req, res) => {
          res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
        });
}
