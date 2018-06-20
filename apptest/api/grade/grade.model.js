const mongoose = require('mongoose');

const GradelistSchema = mongoose.Schema({
	nomgrade: {
		type: String
	},
	codegrade: {
		type: String
	}
});
var Gradelist = mongoose.model('Gradelist', GradelistSchema);
//module.exports = mongoose.model('Gradelist', GradelistSchema);


const NiveauSchema = mongoose.Schema({
	nomniveau: {
		type: String
	},
	grades: [Gradelist.schema]
});
var Niveau = mongoose.model('Niveau', NiveauSchema);
//module.exports = mongoose.model('Niveau', NiveauSchema);


const GradeSchema = mongoose.Schema({
    nomcategorie: {
        type: String
    },
    niveaux: [Niveau.schema],
});

module.exports = mongoose.model('Grade', GradeSchema);
