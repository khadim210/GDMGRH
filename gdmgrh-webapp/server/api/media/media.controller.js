import multer from 'multer';
import Media from './media.model';
import config from '../../config/environment';
import GenericRepository from '../service/generic.repository';
import Errorshandling from '../service/errorshandling';
import {mediaDestination} from '../../config';


var dest = `${mediaDestination}`;
var nameFile = null;

const store = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    var datetimestamp = Date.now();
    cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
  }
});

const upload = multer({ storage: store }).array('upload[]', 12);

const MediaRepository = new GenericRepository(Media);


/**
 * @param req
 * @param res
 * @return {Promise.<void>}
 */
export async function create(req, res) {
  uploadFile(req, res);
}


export async function uploadFile(req, res) {
  await upload(req, res, function(err) {
    let data = [];
    if(err) {
      // An error occurred when uploading
      return Errorshandling.handleError(res, 500, err, 'Erreur serveur !!!');
    } else {
      let promises = req.files.map(file => {
        let media = new Media({
          name: file.originalname,
          description: req.body.description,
          urlResized: req.body.urlResized || `/uploads/${file.filename}`,
          type: file.mimetype,
          fileName: file.filename,
          creator: req.user._id,
          created: Date.now()
        });
        /*
        res.sendFile(name, { root: path.join(__dirname, '../../uploads'),
                  dotfiles: 'deny', headers: { 'x-timestamp': Date.now(), 'x-sent': true} });
        */
        return MediaRepository.save(media).then(_media => {
          data.push({ _media });
        });
      });
      Promise.all(promises).then(function() {
        res.json({ data });
      });
    }
  });
}


export async function getFileUpload(req, res) {
  let idFile = req.params.id;
  if(idFile) {
    try {
      let fileInfo = await MediaRepository.getOne(idFile);
      if(fileInfo) {
        return res.status(200).json({
          type: 'GET',
          url: `${config.SERVER_DOMAINE}${fileInfo.urlResized}` });
      }
    } catch(error) {
      return Errorshandling.handleError(res, 500, error, 'Erreur serveur !!!');
    }
  }
}
