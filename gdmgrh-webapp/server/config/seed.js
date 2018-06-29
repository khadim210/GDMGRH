/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/module_noyau/account_management/user/user.model';
import Agent from '../api/module_noyau/account_management/agent/agent.model'

/*
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
*/
    /*
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
      });;
    });
*/

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