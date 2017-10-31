// Importando todas as libs que vamos precisar para a construção da api
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var morgan = require('morgan');
var consign = require('consign');
var cors = require('cors');

// Conectando ao banco de dados externo
//mongoose.connect('mongodb://luis:luis@cluster0-shard-00-00-ntvbt.mongodb.net:27017,cluster0-shard-00-01-ntvbt.mongodb.net:27017,cluster0-shard-00-02-ntvbt.mongodb.net:27017/help?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin')
mongoose.connect('mongodb://luis:luis@ds125113.mlab.com:25113/help');
var db = mongoose.connection;

// Iniciando o aplicativo
var app = express();

// Dizendo onde está a aplicação cliente
app.set('clientPath', path.join(__dirname, '..', 'client'));

// Permitindo cors
app.use(cors())

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(require('method-override')());
app.use(cookieParser());

// Criando segredo para sessão
app.use(session({secret: 'mySecret', resave: true, saveUninitialized: true, expires: new Date(Date.now() + (30 * 86400 * 1000))}));

// Variável secreta para 
app.set('superSecret', 'ilove');

// Recebemos logs mais detalhados
app.use(morgan('dev'));

// Usando consgin para chamar arquivos
consign({cwd:'app'})
	.include('models')
	.then('controllers')
	.then('routes')
	.into(app)

// Dizendo qual a porta em que rodará 
//(process.env.PORT é a porta do Heroku)
app.set('port', (process.env.PORT || 4030));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+ app.get('port'));
});
