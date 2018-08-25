'use strict';

mongoose.Promise = require('bluebird');
import mongoose, {Schema} from 'mongoose';

const AgentSchema = mongoose.Schema({
    matricule: {
        type: String
    },
    access: {
        type: String,
        default: true
    },
    unite: {
        type: String
    },
    civilite: {
        type: String
    },
    name: {
        type: String
    },
    nom: {
        type: String
    },
    prenom: {
        type: String
    },
    datenaissance: {
        type: Date
    },
    lieunaissance: {
        type: String
    },
    filiation: {
        type: String
    },
    dateentreeservice: {
        type: Date
    },
    dateliberation: {
        type: Date
    },
    grade: {
        type: String
    },
    service: {
        type: String
    },
    diplome: {
        type: String
    },
    libellediplome: {
        type: String
    },
    specialite: {
        type: String
    },
    stages: {
        type: String
    },
    permis_conduire: {
        type: String
    },
    langues: {
        type: [String]
    },
    personnes_prevenir: {
        type: String
    },
    datemariage: {
        type: String
    },
    nomconjoint: {
        type: String
    },
    datenaissanceconjoint: {
        type: String
    },
    lieunaissanceconjoint: {
        type: String
    },
    datedivorce: {
        type: String
    },
    suivant: {
        type: String
    },
    dateremariage: {
        type: String
    },
    nom_conjoint: {
        type: String
    },
    datenaissance_conjoint: {
        type: String
    },
    lieunaissance_conjoint: {
        type: String
    },
});

module.exports = mongoose.model('Agents', AgentSchema);