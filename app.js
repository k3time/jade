var express = require('express'); // Third party module
var app = express(); // Initailising express or creating instance of it

var bodyparser = require('body-parser'); // Third party module
app.use(bodyparser.json()); // Following two lines needed in case we 
app.use(bodyparser.urlencoded({extended:false})); // using body parser

var routes = require('./routes/route'); // calling route.js

var session = require('express-session'); // Third party module
app.use(session({secret: "secret",  resave : true,  saveUninitialized : false}));

app.use(express.static(__dirname + "/")); // to set folder to read by browser

app.set('view engine', 'jade'); // Third party module
var layout = require('express-layout');
app.use(layout());
app.set('layouts', './views/layouts');


var chalk = require('chalk'); // to print colourful console in command liine

/*
//Following code to create a server

var net = require('net'); //core module
var netServer = net.createServer();// To create TCP/IP server*/

app.get('/', routes.defaultHandler);
app.get('/login', routes.loginHandler);
app.get('/logout', routes.logoutHandler);
app.get('/loginSuccess', routes.loginSuccessHandler);
app.post('/city', routes.cityHandler);
app.get('/cancel', function(req, res){
	console.log(chalk.red('Cancel button clicked'));
	res.send('This is response whenever you click cancel button. Please see app.js');
});
app.get('/student', routes.studentHandler);
app.get('/player/:name/:country', routes.playerHandler);

app.use("*", function(req, res) {
     res.status(404);
     res.render('404.jade', {});
});

app.use(function(error, req, res, next) {
     console.log('Error : 500::' + error);
     res.status(500);
     res.render('500.jade', {err:error});  // good for knowledge but don't do it
});


var port = process.env.PORT || 3333;
app.listen(port, function(){ //To run local server and show command line message
	console.log('HTTP server is listening on port: ' + port);
}); 