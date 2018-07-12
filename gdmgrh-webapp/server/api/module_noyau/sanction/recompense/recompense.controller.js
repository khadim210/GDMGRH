import Recompense from './recompense.model';
import GenericRepository from '../../../service/generic.repository';
import Errorshandling from '../../../service/errorshandling';

const RecompenseRepository = new GenericRepository(Recompense);

export async function addRecompense(req, res) {
    var type_recompense = req.body.type_recompense;
    var nom_recompense = req.body.nom_recompense;

    if(type_recompense && nom_recompense) {
        var recompenseParams = {
            type_recompense : type_recompense,
            nom_recompense: nom_recompense
        };
        var recompense = new Recompense(recompenseParams);
        try {
            var recompenseSave = await RecompenseRepository.save(recompense);
            return res.status(200).send(recompenseSave);
        } catch (error) {
            return Errorshandling.handleError(res, 500, error, 'Erreur serveur (Mauvaise requete) !!!');
        }
    } else {
        return res.json({response: 'Bad params'});
    }
}

export async function getAllRecompense(req, res) {
    try {
        var allRecompense = await RecompenseRepository.getAll();
        // res.status(200).json({response: allRecompense});
        res.status(200).send(allRecompense);
    } catch (error) {
        return Errorshandling.handleError(res, 422, 'Bad params !!!', 'Mauvaise paramètre !!!');
    }
}

export async function updateRecompense(req, res) {
    var recompenseParams = req.body;
    var id = recompenseParams._id;
    if(recompenseParams && id) {
        try {
            var recompense = await RecompenseRepository.getOneBy({_id: id});
            recompense.type_recompense = recompenseParams.type_recompense;
            recompense.nom_recompense = recompenseParams.nom_recompense;
            var allRecompnse = await RecompenseRepository.save(recompense);
            res.status(200).send(allRecompnse);
        } catch (error) {
            return Errorshandling.handleError(res, 500, error, 'Erreur serveur (Mauvaise requete) !!!');
        }

    } else {
        return Errorshandling.handleError(res, 422, 'Recompense doesn\'t exist !!!', 'Recompense n\'existe pas !!!');
    }
}

export async function deleteRecompense(req, res) {
    var id = req.params.id;
    Recompense.findByIdAndRemove(id, function(error, docs){
        if(error)
            res.status(500).send('');
        else
            res.status(200).send('Suppression success');
    })
}
