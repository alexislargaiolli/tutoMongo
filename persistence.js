// Inclusion de Mongoose
var mongoose = require('mongoose');

function init(){
	var commentaireArticleSchema = new mongoose.Schema({
	  pseudo : { type : String, match: /^[a-zA-Z0-9-_]+$/ },
	  contenu : String,
	  date : { type : Date, default : Date.now }
	});
	mongoose.model('commentaires', commentaireArticleSchema);
	/*var articleSchema = new mongoose.Schema({
	  auteur : Schema.ObjectId,
	  contenu : String,
	  date : { type : Date, default : Date.now },
	  commentaires : [ commentaireArticleSchema ],
	  votes : {
		plus : { type : Number, min : 0 },
		moins : { type : Number, min : 0 }
	  }
	});*/
	console.log('Persistence initialized');
}

exports.init = init;
