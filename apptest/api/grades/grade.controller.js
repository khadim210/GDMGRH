const Grade = require('./grade.model');
var GenericRepository = require('../service/generic.repository');

const GradeRepository = new GenericRepository(Grade);

module.exports = {

    /**
     *
     */
    addGrade : async (req, res) => {
        var nomgrade = req.body.nomgrade;
        var codegrade = req.body.codegrade;
        var categoriegrade = req.body.categoriegrade;

        if(nomgrade && codegrade &&categoriegrade) {
            var gradeParams = {
                nomgrade : nomgrade,
                codegrade : codegrade,
                categoriegrade: {
                    categorie : categorie,
                    niveau : niveau 
                                }
            };
            var grade = new Grade(gradeParams);
            try {
                var gradeSave = await GradeRepository.save(grade);
                return res.status(200).json({response: gradeSave});
            } catch (error) {
                res.json({response: 'Bad request'});
            }
        } else {
            return res.json({response: 'Bad params'});
        }
    },

    getAllGrade : async (req, res) => {
        try {
            var allGrade = await GradeRepository.getAll();
            res.status(200).json({response: allGrade});
        } catch (error) {
            res.json({response: 'Mauvaise requête'});
        }
    },

    getOneGrade : async (req, res) => {
        var id = req.params.id;
        if(id) {
            try {
                var allGrade = await GradeRepository.getOne(id);
                res.status(200).json({response: allGrade});
            } catch (error) {
                res.json({response: 'Mauvaise requête'});
            }
        } else {
            res.json({response: 'Grade n\'existe pas !!!'});
        }
    },
    updateGrade : async (req, res) => {
        var gradeParams = req.body;
        var id = req.params.id;
        if(gradeParams && id) {
            try {
                var grade = await GradeRepository.getOneBy({_id: id});
                grade.nomgrade = gradeParams.nomgrade;
                grade.codegrade = gradeParams.codegrade;
                grade.categoriegrade = gradeParams.categoriegrade;

                var allGrade = await GradeRepository.save(grade);
                res.status(200).json({response: allGrade});
            } catch (error) {
                res.json({response: 'Mauvaise requête'});
            }
            res.send(grade)
        } else {
            res.json({response: 'Grade n\'existe pas !!!'});
        }
    }
}
