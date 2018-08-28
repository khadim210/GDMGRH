/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/module_noyau/account_management/user/user.model';
import Groupe from '../api/module_noyau/account_management/group/groupe.model';
import Agent from '../api/module_noyau/account_management/agent/agent.model';
import Punition from '../api/module_noyau/sanction/punition/punition.model';
import Recompense from '../api/module_noyau/sanction/recompense/recompense.model';

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

var user = null;
var agent = null;
var groupe = null;

Entite.find({}).remove()
    .then(() => {});

Subdivision.find({}).remove()
    .then(() => {});

Agent.find({}).remove()
    .then(() => {});

User.find({}).remove()
    .then(() => {});

Groupe.find({}).remove()
    .then(() => {});

Agent.find({}).remove()
    .then(() => {
      /**
       * ADMIN
       */
      user = new User({
        username: 'admin',
        password: 'admin',
        role: 'admin'
      });
      user.save();

      /**
       * DAM
       */
      agent = new Agent({
        name: 'Ndiaye Samba',
        unite: 'DAM'
      });
      agent.save();

      user = new User({
        username: 'user1',
        password: 'user1',
        role: 'chef_division',
        agent: agent._id
      });
      user.save();

      groupe = new Groupe({
        users: [user._id],
        name: 'Groupe DAM',
        description: 'Division DAM',
        moduleSelect: 'DAM',
      });
      groupe.save();

      /**
       * DCC
       */
      agent = new Agent({
        name: 'Diaw Samba',
        unite: 'DCC'
      });
      agent.save();

      user = new User({
        username: 'user2',
        password: 'user2',
        role: 'chef_division',
        agent: agent._id
      });
      user.save();

      groupe = new Groupe({
        users: [user._id],
        name: 'Groupe DCC',
        description: 'Division DCC',
        moduleSelect: 'DCC',
      });
      groupe.save();

      /**
       * DGP
       */

      agent = new Agent({
        name: 'Tall Abrahm',
        unite: 'DGP'
      });
      agent.save();

      user = new User({
        username: 'user3',
        password: 'user3',
        role: 'chef_division',
        agent: agent._id
      });
      user.save();

      groupe = new Groupe({
        users: [user._id],
        name: 'Groupe DGP',
        description: 'Division DGP',
        moduleSelect: 'DGP',
      });
      groupe.save();

      /**
       * DIF
       */
      agent = new Agent({
        name: 'Sall Mark',
        unite: 'DIF'
      });
      agent.save();

      user = new User({
        username: 'user4',
        password: 'user4',
        role: 'chef_division',
        agent: agent._id
      });
      user.save();

      groupe = new Groupe({
        users: [user._id],
        name: 'Groupe DIF',
        description: 'Division DIF',
        moduleSelect: 'DIF',
      });
      groupe.save();
    });

Recompense.find({}).remove()
    .then(() => {
      Recompense.create({
        nom_recompense: 'test decoration',
        type_recompense: 'Decoration'
      }, {
        nom_recompense: 'test autre decoration',
        type_recompense: 'Autre decoration'
      });
    });

Punition.find({}).remove()
    .then(() => {
      Punition.create({
        nom_punition: 'Punition sous officier carriere',
        type_officier: 'Sous officiers de carrière - commisionnées',
        type_punition: 'Punition statuaire'
      }, {
        nom_punition: 'Punition sous officier',
        type_officier: 'Tous les sous officiers',
        type_punition: 'Punition normale'
      }, {
        nom_punition: 'Punition autre sous officier',
        type_officier: 'Autres sous officiers',
        type_punition: 'Punition statuaire'
      });
    });

SousCommandement.find({}).remove()
    .then(async function() {
      try {
        await SousCommandController.handlerSousCommandement(allSousCommandement);
        //console.log('finished created five sous commandement');
      } catch(error) {
        console.log('Erreur in create sous commandement in data base');
      }
    });

EtatMajor.find({}).remove()
    .then(async function() {
      try {
        await EtatMajorController.handlerEtatMajor(etatmajorconst, allDivision);
        //console.log('finished created EtatMajor sous commandement');
      } catch(error) {
        console.log('Erreur in create EtatMajor sous commandement in data base');
      }
    });

Mobile.find({}).remove()
    .then(async function() {
      try {
        await MobileController.handlerMobile(mobilemain, allUnite, allLegion);
        //console.log('finished create Mobile sous commandement');
      } catch(error) {
        console.log('Erreur in create Mobile sous commandement in data base');
      }
    });

Territorial.find({}).remove()
    .then(async function() {
      try {
        await TerritorialController.handlerTerritorial(territorialmain, allsection, alllegions);
        //console.log('finished create Territorial sous commandement');
      } catch(error) {
        console.log('Erreur in create Territorial sous commandement in data base');
      }
    });
