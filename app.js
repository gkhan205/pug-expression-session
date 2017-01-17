var express = require('express');
var bodyparser = require('body-parser');
var session = require('express-session');
var routes = require('./routes/routes.js');

var app = express();

port = process.env.PORT || 3000;

app.use(express.static(__dirname + ('/public')));
app.set("views engine", "pug");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

app.use(session({secret: "ghazi", resave : true,  saveUninitialized : false}));

app.get('/', routes.index);
app.get('/login', routes.login);
app.post('/loginMethod', routes.loginMethod);
app.get('/admin', routes.admin);
app.get('/about', routes.about);
app.get('/services', routes.services);
app.post('/exp-result', routes.ExpResultHandler);

app.listen(port, function(){
	console.log("Server running on Port No. "+port);
});