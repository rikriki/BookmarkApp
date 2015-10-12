


var pgp = require('pg-promise')();
var connectionString = process.env.DATABASE_URL || 'postgres://postgres:1@localhost:5432/todo';
var db = pgp(connectionString);
var dbConn = "asd riki"

var rikiModified = function(){

	var newChanges ="2 "
	console.log("^^^^^^^^^^^");
}

var riki = function(){

	return function(a,b){
		a= 1 + 2
		return b;

	}
}

db.query("CREATE TABLE users(id SERIAL, PRIMARY KEY, name VARCHAR(255) not null, password VARCHAR(255) not null)")
.then(function (data) {
        console.log(data); // print data;
        console.log("success in creating database!!!")
    }, function (reason) {
        console.log(reason); // print error;
    });