const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const express = require('express');
const AgentController = require('../api/agent/agent.controller');
const agentControllers = new AgentController();

//
const agent = [
    {name: 'Ndiaye Samba'},
    {name: 'Diaw Samba'},
    {name: 'Tall Abrahm'},
    {name: 'Fall Soulman'},
    {name: 'Sall Mark'},
    {name: 'Sy Aziz'},
]

const storageAgent = async () => {
    if(!(await agentControllers.getAllAgent()).length) {
        for (let index = 0; index < agent.length; index++) {
            await agentControllers.createAgent(agent[index]);
        }
    }
}

module.exports = function expressConfig (app) {
    // CORS Middleware
    app.use(cors());

    // Set static folder
    app.use(express.static('client'));

    // Body Parser Middleware
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    //
    app.use(bodyParser.json());
    //
    storageAgent();
}