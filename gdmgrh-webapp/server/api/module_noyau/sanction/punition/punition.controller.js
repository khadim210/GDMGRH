import Punition from './punition.model';
import GenericRepository from '../../../service/generic.repository';

const PunitionRepository = new GenericRepository(Punition);

export async function addPunition(req, res) {
    var type_punition = req.body.type_punition;
    var type_officier = req.body.type_officier;
    var nom_punition = req.body.nom_punition;

    if(type_punition && nom_punition && type_officier ) {
        var punitionParams = {
            type_punition : type_punition,
            type_officier: type_officier,
            nom_punition: nom_punition
        };
        var punition = new Punition(punitionParams);
        try {
            var punitionSave = await PunitionRepository.save(punition);
            return res.status(200).send(punitionSave);
        } catch (error) {
            res.json({response: 'Bad request'});
        }
    } else {
        return res.json({response: 'Bad params'});
    }
}

export async function getAllPunition(req, res) {
    try {
        var allPunition = await PunitionRepository.getAll();
        // res.status(200).json({response: allPunition});
        res.status(200).send(allPunition);
    } catch (error) {
        res.json({response: 'Bad request'});
    }
}

export async function updatePunition(req, res) {
    var punitionParams = req.body;
    var id = punitionParams._id;
    if(punitionParams && id) {
        try {
            var punition = await PunitionRepository.getOneBy({_id: id});
            punition.type_punition = punitionParams.type_punition;
            punition.type_officier = punitionParams.type_officier;
            punition.nom_punition = punitionParams.nom_punition;

            var allPunition = await PunitionRepository.save(punition);
            res.status(200).send(allPunition);
        } catch (error) {
            console.log(error);
            res.json({response: 'Bad request'});
        }

    } else {
        return res.status(500).json({response: 'Recompense doesn\'t exist !!!'});
    }
}

export async function deletePunition(req, res) {
    var id = req.params.id;
    // try{
        // var recompense = await RecompenseRepository.save({_id: id});
        Punition.findByIdAndRemove(id, function(error, docs){
            if(error)
                res.status(500).send('');
            else
                res.status(200).send('Suppression success');
        })
        //res.status(200).json({response: recompense});
    // } catch (error){
        //res.json({response: 'Bad request'});
    //}
}
