/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';
import {apiUrl} from './config';

export default function(app) {
    // Insert routes below

  /**
   * Module Noyau
   */
  app.use(`${apiUrl}/noyau/user`, require('./api/module_noyau/account_management/user'));
  app.use(`${apiUrl}/noyau/groupe`, require('./api/module_noyau/account_management/group'));

  app.use(`${apiUrl}/noyau/diplomes`, require('./api/module_noyau/diplomes'));
  app.use(`${apiUrl}/noyau/grades`, require('./api/module_noyau/grades'));

  app.use(`${apiUrl}/noyau/sanction/punition`, require('./api/module_noyau/sanction/punition'));
  app.use(`${apiUrl}/noyau/sanction/recompense`, require('./api/module_noyau/sanction/recompense'));

  app.use(`${apiUrl}/noyau/organigramme/sous-command`, require('./api/module_noyau/hierarchie/sous-command'));
  app.use(`${apiUrl}/noyau/organigramme/etat-major`, require('./api/module_noyau/hierarchie/etat-major'));
  app.use(`${apiUrl}/noyau/organigramme/mobile`, require('./api/module_noyau/hierarchie/mobile'));
  app.use(`${apiUrl}/noyau/organigramme/territorial`, require('./api/module_noyau/hierarchie/territorial'));

  /**
   * Module DAM
   */
  app.use(`${apiUrl}/dam/recrutement/promotion`, require('./api/module-dam/promotion'));
  app.use(`${apiUrl}/dam/recrutement/auxiliaire`, require('./api/module-dam/auxiliaire'));
  app.use(`${apiUrl}/dam/recrutement/candidat`, require('./api/module-dam/candidat'));


  /**
   * Module DGP
   */
  app.use(`${apiUrl}/agents`, require('./api/module_dgp/agents'));


  app.use(`${apiUrl}/media`, require('./api/media'));
  app.use(`${apiUrl}/archive`, require('./api/archive-document'));
  app.use(`${apiUrl}/validation`, require('./api/validation'));
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
        .get(errors[404]);

    // All other routes should redirect to the index.html
  app.route('/*')
        .get((req, res) => {
          res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
        });
}
