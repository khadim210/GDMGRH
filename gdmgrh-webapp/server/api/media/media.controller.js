import multer from 'multer';
import Media from './media.model';
import GenericRepository from '../service/generic.repository';
import Errorshandling from '../service/errorshandling';
import {mediaDestination} from '../../config';


var dest = `${mediaDestination}`;

const store = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    var datetimestamp = Date.now();
    cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
  }
});

const upload = multer({ storage: store }).array('uploads[]', 12);

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
          urlResized: req.body.urlResized || '/uploads/',
          type: file.mimetype,
          fileName: file.filename,
          creator: req.user._id,
          created: Date.now()
        });
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
