
exports.defaultHandler = function(req, res){
	res.render('index', {title:'Landing page'});
}

exports.loginHandler = function(req, res){
	res.render('login', {title:'Login page'});
}//loginHandler

exports.logoutHandler = function(req, res){
	req.session.destroy();
	res.render('login', {title:'Logout page', LOGGEDIN:false});
}//logoutHandler


exports.loginSuccessHandler = function(req, res){ // printing response after getting values from login form


	// user comes to this handler after login, set loggedin variable in session to true.
	req.session.loggedin = true;
	console.log("processing GET request for landing page. Req Param  " + req.query.nm);

	var person;
	if (req.session.userName){   //session store has userName
		console.log("User Name already in session. It is " + req.session.userName);
		person = req.session.userName;
	}else{ //session store does NOT have userName
		// read username from req.query and keep into the session store
		person = req.query.nm;
		req.session.userName = person;
		console.log("User Name does not exist in session. Hence storing it in session store " + person);
	}

	res.render('afterLogin', {welcomeMessage:person, 
										LOGGEDIN:req.session.loggedin});
	/*
	//Following code if you want to print output normally without any page calling
	var fn = req.body.fn;
	var ln = req.body.ln;
	var em = req.body.em;

	//or => res.send("You are successfully logged in"); // No need to end response in this case
	res.write("You are successfully logged in \n");//we can break line in output by ending our string with \n
	res.write("Hi, "+person+"\n");
	res.write("Name : "+fn+" "+ln +"\n");
	res.write("Email : " + em);
	res.end(); // we need response to end for sending it to output.*/


}//loginSuccessHandler


exports.cityHandler = function(req, res){
	var interestValue = req.body.interest;
	var cityNameValue, taglineValue;
	console.log("received interestValue  as " + interestValue);
	var famousfor = new Array();

	if (interestValue === 'history'){
		cityNameValue = 'Rome';
		taglineValue = 'City of earliest civilization';
		famousfor = ["Colloseum", "Trevi Fountain"];
	}else if (interestValue === 'fashion'){
		cityNameValue = 'Paris';
		taglineValue = 'Fashion capital of the world ';
		famousfor = ["Eiffel Tower"];
	}else if (interestValue === 'finance'){
		cityNameValue = 'New York';
		taglineValue = 'Business capital of the world ';
		famousfor = ["Statue of Liberty", "Wall Street"];
	}
	
	res.render('city', {cityName:cityNameValue, 
						tagline: taglineValue, 
						welcomeMessage:req.session.userName,
						LOGGEDIN:req.session.loggedin,
						FAMOUSFOR:famousfor
					});

}//cityHandler

// No predefined queries order
exports.studentHandler = function(req, res){ // http://localhost:3333/student?class="10th"&name="kuldeep"
	res.write("Name : " + req.query.name+"\n"); 
	res.write("Class : " + req.query.class);
	res.end();
}//studentHandler


//Request query order is important because we have mentioned parameters with url
exports.playerHandler = function(req, res){ // http://localhost:3333/player/kuldeep/India
	res.write("Name : " + req.params.name+"\n");
	res.write("Country : " + req.params.country);
	res.end();
}//playerHandler

