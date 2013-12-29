var express = require('express'),
	mongoose = require('mongoose'),
	persistence = require('./persistence');

var app = express();
app.use(express.bodyParser());
app.use("/public",express.static(__dirname + "/public"));
persistence.init();
app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Vous êtes à l\'accueil');
});
app.post('/comments/added', function(req,res){
	var pseudo = req.body.comment.pseudo,
		content = req.body.comment.content;
	if(pseudo && content){
		mongoose.connect('mongodb://localhost/blog', function(err) {
		  if (err) { throw err; }
		});
		
		// Création du Model pour les commentaires
		var CommentaireArticleModel = mongoose.model('commentaires');
		 
		// On crée une instance du Model
		var monCommentaire = new CommentaireArticleModel({ pseudo : pseudo });
		monCommentaire.contenu = content;
		 
		 // On le sauvegarde dans MongoDB !
		monCommentaire.save(function (err) {
		  if (err) { throw err; }
		  console.log('Commentaire ajouté avec succès !');
		  // On se déconnecte de MongoDB maintenant
		  mongoose.connection.close();
		  
		  res.setHeader('Content-Type', 'text/plain');
		  res.end('Commentaire ajouté avec succès !');
		});
	}
	else{		
		res.setHeader('Content-Type', 'text/plain');
		res.end('Erreur');
	}
});
app.get('/comments/add', function(req, res) {
    res.render('add-commentaire.ejs', null);    
});
app.get('/comments/all', function(req, res) {	
	mongoose.connect('mongodb://localhost/blog', function(err) {
	  if (err) { throw err; }
	});
		
	// Création du Model pour les commentaires
	var CommentaireArticleModel = mongoose.model('commentaires');
	CommentaireArticleModel.find(null, function (err, comms) {
	  if (err) { throw err; }
	  res.render('commentaires.ejs', {comms: comms});		  
	  mongoose.connection.close();
	});
});
app.get('/comments/find/:name', function(req, res) {	
	if(req.params.name == null || req.params.name == ''){
		res.end('Préciser un pseudo');
	}
	else{
		mongoose.connect('mongodb://localhost/blog', function(err) {
		  if (err) { throw err; }
		});
		
		// Création du Model pour les commentaires
		var CommentaireArticleModel = mongoose.model('commentaires');
		CommentaireArticleModel.find({pseudo : req.params.name}, function (err, comms) {
		  if (err) { throw err; }
		  res.render('commentaires.ejs', {comms: comms});		  
		  mongoose.connection.close();
		});
	}
});
app.listen(8080);
