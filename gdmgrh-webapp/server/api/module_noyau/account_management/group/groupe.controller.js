import Groupe from './groupe.model';
import GenericRepository from '../../../service/generic.repository';
import * as UserController from '../user/user.controller';

const GroupeRepository = new GenericRepository(Groupe);

export async function getGroupBy(criteria) {
    var group = null;
    try {
        group = await GroupeRepository.getOneBy(criteria);
    } catch (error) {
        console.log(error);
    }
    return group;
}

    /**
     * Groupe User
     */

export async function getGoupData(req, res) {
    try {
        var allUser = await UserController.getAllUserBy(res, {active: true});
        return res.status(200).json({response: allUser});
    } catch (error) {
        return res.json({response: 'Bad request'});
    }
}

export async function createUserGroupe(req, res){
    var name = req.body.name;
    var description = req.body.description;
    var users = req.body.users;
    var unite = req.body.unite;
    if(name && description && users.length && unite) {
        var groupe = {
            name: name,
            description: description,
            users: users,
            unite: unite,
            created: Date.now()
        }
        groupe = new Groupe(groupe);
        try {
            groupe = await GroupeRepository.save(groupe);   
        } catch (error) {
            return res.json({response: 'error on saving groupe'});
        }
        return res.json({response: groupe});
    } else {
        return res.json({response: 'Bad requestPOST !!!'});
    }
}

export async function getAllUserGroupe(req, res) {
    var groupe = null;
    try {
        groupe = await GroupeRepository.getAll();
    } catch (error) {
        return res.json({response: 'error on geting all Groupe'})
    }
    return res.json({response: groupe});
}

export async function getOneUserGroupe(req, res) {
    var id_groupe = req.params._id;
    var groupe = null;
    if(id_groupe) {
        try {
            groupe = await GroupeRepository.getOneBy({_id: id_groupe});
        } catch (error) {
            return res.json({response: 'error on geting one Groupe'})
        }
        return res.json({response: groupe});
    } else {
        return res.json({response: 'Bad requestGet'})
    }
}

export async function updateUserGroupe(req, res) {
    var id = req.params._id;
    var name = req.body.name;
    var description = req.body.description;
    var users = req.body.users;
    var groupe = null;
    if(name && description && users.length && id) {
        try {
            groupe = await GroupeRepository.getOneBy({_id: id});
            groupe.name = name;
            groupe.description = description;
            groupe.users = users;
            groupe = await GroupeRepository.save(groupe);   
        } catch (error) {
            console.log(error);
            return res.json({response: 'error on saving groupe'});
        }
        return res.json({response: groupe});
    } else {
        return res.json({response: 'Bad request PUT!!!'});
    }
}
