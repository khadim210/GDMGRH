const User = require('./user.model');
const Groupe = require('./groupe.model');
var GenericRepository = require('../service/generic.repository');

const UserRepository = new GenericRepository(User);
const GroupeRepository = new GenericRepository(Groupe);

module.exports = {

    /**
     * 
     */
    addUser : async (req, res) => {
        var agent = req.body.agent;
        var rule = req.body.rule;
        var username = req.body.username;
        var password = req.body.password;
        if(username && password && agent && rule) {
            var userParams = {
                agent : agent,
                rule: rule,
                username: username,
                password: password
            };
            var user = new User(userParams);
            try {
                var userSave = await UserRepository.save(user);
                return res.status(200).json({response: userSave});   
            } catch (error) {
                return res.json({response: 'Bad request POST USER'});
            }
        } else {
            return res.json({response: 'Bad params POST USER'});
        }
    },

    getAllUser : async (req, res) => {
        try {
            var allUser = await UserRepository.getAll();
            return res.status(200).json({response: allUser});
        } catch (error) {
            return res.json({response: 'Bad request GET USER'});
        } 
    },
    
    getOneUser : async (req, res) => {
        var id = req.params.id;
        if(id) {
            try {
                var allUser = await UserRepository.getOne(id);
                return res.status(200).json({response: allUser});
            } catch (error) {
                return res.json({response: 'Bad request GET ONE USER'});
            }
        } else {
            return res.json({response: 'User doesn\'t exist !!!'});
        } 
    },

    updateUser : async (req, res) => {
        var userParams = req.body;
        var id = req.params.id;
        if(userParams && id) {
            try {
                var user = await UserRepository.getOneBy({_id: id});
                user.lastname = userParams.lastname;
                user.firstname = userParams.firstname;
                if(userParams.password) {
                    user.password = userParams.password;
                }
                user.status = userParams.status;
                user.username = userParams.username;
                user = await UserRepository.save(user);
                return res.status(200).json({response: user});
            } catch (error) {
                return res.json({response: 'Bad request PUT USER'});
            }
        } else {
            return res.json({response: 'User doesn\'t exist !!!'});
        }  
    },


    /**
     * Groupe User
     */

     getGoupData: async (req, res) => {
        try {
            var allUser = await UserRepository.getAll({status: 'actif'});
            return res.status(200).json({response: allUser});
        } catch (error) {
            return res.json({response: 'Bad request GET USER'});
        }
     },

     createUserGroupe : async (req, res) => {
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
     },

     getAllUserGroupe: async (req, res) => {
        var groupe = null;
        try {
            groupe = await GroupeRepository.getAll();
        } catch (error) {
            return res.json({response: 'error on geting all Groupe'})
        }
        return res.json({response: groupe});
     },

     getOneUserGroupe: async (req, res) => {
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
     },

     updateUserGroupe : async (req, res) => {
        var id = req.params._id;
        var name = req.body.name;
        var description = req.body.description;
        var users = req.body.users;
        if(name && description && users.length && id) {
            try {
               groupe = await GroupeRepository.getOneBy({_id: id});
               groupe.name = name;
               groupe.description = description;
               groupe.users = users;
               groupe = await GroupeRepository.save(groupe);   
            } catch (error) {
                return res.json({response: 'error on saving groupe'});
            }
            return res.json({response: groupe});
        } else {
            return res.json({response: 'Bad request PUT!!!'});
        }
     },
}
