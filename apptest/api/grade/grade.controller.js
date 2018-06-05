const User = require('./grade.model');
var GenericRepository = require('../service/generic.repository');

const GradeRepository = new GenericRepository(User);

module.exports = {

    /**
     *
     */
    addGrade : async (req, res) => {
        var degree = req.body.degree;

        if(degree) {
            var degreeParams = {
                degree : degree
            };
            var grade = new Grade(degreeParams);
            try {
                var GradeSave = await GradeRepository.save(Grade);
                return res.status(200).json({response: GradeSave});
            } catch (error) {
                res.json({response: 'Bad request'});
            }
        } else {
            return res.json({response: 'Bad params'});
        }
    }/*,

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
    },*/

}
