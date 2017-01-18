var ngexpr = require("angular-expressions");

exports.index = function(req, res){
	res.render('index.pug', {user: req.session.userName});
}

exports.login = function(req, res){
	req.session.destroy();
	res.render('login.pug', {});
}	

exports.loginMethod = function(req, res){
	var a = req.body.uname;
	var b = req.body.pass;
	var name = req.body.name;
	console.log(a);
	console.log(b);

	var person;
	if (req.session.userName){   //session store has userName
		console.log("User Name already in session. It is " + req.session.userName);
		person = req.session.userName;
	}else{ //session store does NOT have userName
		// read username from req.query and keep into the session store
		person = req.body.name;
		req.session.userName = person;
		console.log("User Name does not exist in session. Hence storing it in session store " + person);
	}

	res.render('admin.pug', {welcomeMessage:person});
}

exports.admin = function(req, res){
	res.render('admin.pug', {user: req.session.userName});
}	

exports.about = function(req, res){
	res.render('about.pug', {user: req.session.userName});
}	

exports.services = function(req, res){
	res.render('services.pug', {user: req.session.userName});
}	

exports.ExpResultHandler = function(req, res){
	var person = req.session.userName;

	var expr = req.body.expression;
	console.log(expr);
	var resultValue = 0;
	var resultString = "";
	console.log("expression=%s", expr);
	try{
		var fn = ngexpr.compile(expr);
		resultValue = fn();
		resultString = "" + resultValue;
	}catch(err){
		resultString = "" + err;
	}
	
	console.log("resultValue=%s resultString=%s", resultValue, resultString);
	res.render('admin.pug', {result: resultString, user: req.session.userName});
}//ExpResultHandler