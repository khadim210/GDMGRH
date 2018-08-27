/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/module_noyau/account_management/user/user.model';
import Groupe from '../api/module_noyau/account_management/group/groupe.model';
import Agent from '../api/module_noyau/account_management/agent/agent.model';
import SousCommandement from '../api/module_noyau/hierarchie/sous-command/sous-command.model';
import Subdivision from '../api/module_noyau/hierarchie/subdivision/subdivision.model';
import Entite from '../api/module_noyau/hierarchie/entite/entite.model';
import EtatMajor from '../api/module_noyau/hierarchie/etat-major/etat-major.model';
import Mobile from '../api/module_noyau/hierarchie/mobile/mobile.model';
import Territorial from '../api/module_noyau/hierarchie/territorial/territorial.model';

import * as Constante from './constante';
import * as SousCommandController from '../api/module_noyau/hierarchie/sous-command/sous-command.controller';
import * as EtatMajorController from '../api/module_noyau/hierarchie/etat-major/etat-major.controller';
import * as MobileController from '../api/module_noyau/hierarchie/mobile/mobile.controller';
import * as TerritorialController from '../api/module_noyau/hierarchie/territorial/territorial.controller';


var constante = Constante.souscommandt;
var allSousCommandement = [constante.commandement1, constante.commandement2,
                           constante.commandement3, constante.commandement4,
                           constante.commandement5];

var etatmajorconst = Constante.etatmajor;
var allDivision = [etatmajorconst.division0, etatmajorconst.division1,
                    etatmajorconst.division2, etatmajorconst.division3];

var mobilemain = Constante.mobile.mobilemain;
var allUnite = Constante.mobile.allUnite;
var allLegion = Constante.mobile.allLegion;


const territorialmain = Constante.territorial.territorialmain;
const allsection = Constante.territorial.allsection;
const alllegions = Constante.territorial.alllegions;

Entite.find({}).remove()
    .then(() => {
      console.log('entité drop');
    });

Subdivision.find({}).remove()
    .then(() => {
      console.log('subdivision drop');
    });

Groupe.find({}).remove()
    .then(() => {
      console.log('Group drop');
    });

User.find({}).remove()
    .then(() => {
      User.create({
        username: 'admin',
        password: 'admin',
        role: 'admin'
      })
    .then(() => {
      console.log('finished populating users');
    });
    });

Agent.find({}).remove()
    .then(() => {
      Agent.create({
        name: 'Ndiaye Samba',
        unite: 'DAM'
      }, {
        name: 'Diaw Samba',
        unite: 'DCC'
      }, {
        name: 'Tall Abrahm',
        unite: 'DGP'
      }, {
        name: 'Sall Mark',
        unite: 'DIF'
      }, {
        name: 'Sy Aziz',
        unite: 'DDD'
      }, {
        name: 'Fall Soulman',
        unite: 'AAA'
      })
      .then(() => {
        console.log('finished populating agents');
      });
    });


SousCommandement.find({}).remove()
    .then(async function() {
      try {
        await SousCommandController.handlerSousCommandement(allSousCommandement);
        console.log('finished created five sous commandement');
      } catch(error) {
        console.log('Erreur in create sous commandement in data base');
      }
    });

EtatMajor.find({}).remove()
    .then(async function() {
      try {
        await EtatMajorController.handlerEtatMajor(etatmajorconst, allDivision);
        console.log('finished created EtatMajor sous commandement');
      } catch(error) {
        console.log('Erreur in create EtatMajor sous commandement in data base');
      }
    });

Mobile.find({}).remove()
    .then(async function() {
      try {
        await MobileController.handlerMobile(mobilemain, allUnite, allLegion);
        console.log('finished create Mobile sous commandement');
      } catch(error) {
        console.log('Erreur in create Mobile sous commandement in data base');
      }
    });

Territorial.find({}).remove()
    .then(async function() {
      try {
        await TerritorialController.handlerTerritorial(territorialmain, allsection, alllegions);
        console.log('finished create Territorial sous commandement');
      } catch(error) {
        console.log('Erreur in create Territorial sous commandement in data base');
      }
    });

/*
import Thing from '../api/thing/thing.model';

Thing.find({}).remove()
    .then(() => {
      Thing.create({
        name: 'Development Tools',
        info: 'Integration with popular tools such as Webpack, Gulp, Babel, TypeScript, Karma, '
                + 'Mocha, ESLint, Node Inspector, Livereload, Protractor, Pug, '
                + 'Stylus, Sass, and Less.'
      }, {
        name: 'Server and Client integration',
        info: 'Built with a powerful and fun stack: MongoDB, Express, '
                + 'AngularJS, and Node.'
      }, {
        name: 'Smart Build System',
        info: 'Build system ignores `spec` files, allowing you to keep '
                + 'tests alongside code. Automatic injection of scripts and '
                + 'styles into your index.html'
      }, {
        name: 'Modular Structure',
        info: 'Best practice client and server structures allow for more '
                + 'code reusability and maximum scalability'
      }, {
        name: 'Optimized Build',
        info: 'Build process packs up your templates as a single JavaScript '
                + 'payload, minifies your scripts/css/images, and rewrites asset '
                + 'names for caching.'
      }, {
        name: 'Deployment Ready',
        info: 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
      });
    });
*/
