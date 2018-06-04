const User = require('./user.model');
var GenericRepository = require('../service/generic.repository');

const UserRepository = new GenericRepository(User);

module.exports = {

    /**
     * 
     */
    addUser : async (req, res) => {
        var lastname = req.body.lastname;
        var firstname = req.body.firstname;
        var email = req.body.email;
        var username = req.body.username;
        var password = req.body.password;
        if(lastname && firstname && email && username && password) {
            var userParams = {
                lastname : lastname,
                firstname: firstname,
                email: email,
                username: username,
                password: password
            };
            var user = new User(userParams);
            try {
                var userSave = await UserRepository.save(user);
                return res.status(200).json({response: userSave});   
            } catch (error) {
                res.json({response: 'Bad request'});
            }
        } else {
            return res.json({response: 'Bad params'});
        }
    },

    getAllUser : async (req, res) => {
        try {
            var allUser = await UserRepository.getAll();
            res.status(200).json({response: allUser});
        } catch (error) {
            res.json({response: 'Bad request'});
        } 
    },
    
    getOneUser : async (req, res) => {
        var id = req.params.id;
        if(id) {
            try {
                var allUser = await UserRepository.getOne(id);
                res.status(200).json({response: allUser});
            } catch (error) {
                res.json({response: 'Bad request'});
            }
        } else {
            res.json({response: 'User doesn\'t exist !!!'});
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
                user.password = userParams.password;
                user.username = userParams.username;
                var allUser = await UserRepository.save(user);
                res.status(200).json({response: allUser});
            } catch (error) {
                res.json({response: 'Bad request'});
            }
            res.send(user)
        } else {
            res.json({response: 'User doesn\'t exist !!!'});
        }  
    },

}
