/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';
import {apiUrl} from './config';

export default function(app) {
    // Insert routes below
  app.use(`${apiUrl}/user`, require('./api/module_noyau/account_management/user'));
  app.use(`${apiUrl}/groupe`, require('./api/module_noyau/account_management/group'));

  app.use(`${apiUrl}/diplomes`, require('./api/module_noyau/diplomes'));
  app.use(`${apiUrl}/grades`, require('./api/module_noyau/grades'));

  app.use(`${apiUrl}/sanction/punition`, require('./api/module_noyau/sanction/punition'));
  app.use(`${apiUrl}/sanction/recompense`, require('./api/module_noyau/sanction/recompense'));

  app.use(`${apiUrl}/organigramme/sous-command`, require('./api/module_noyau/hierarchie/sous-command'));
  app.use(`${apiUrl}/organigramme/etat-major`, require('./api/module_noyau/hierarchie/etat-major'));
  app.use(`${apiUrl}/organigramme/mobile`, require('./api/module_noyau/hierarchie/mobile'));
  app.use(`${apiUrl}/organigramme/territorial`, require('./api/module_noyau/hierarchie/territorial'));


  app.use(`${apiUrl}/media`, require('./api/media'));

    // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
        .get(errors[404]);

    // All other routes should redirect to the index.html
  app.route('/*')
        .get((req, res) => {
          res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
        });
}
