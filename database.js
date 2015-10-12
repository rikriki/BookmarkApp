


var pgp = require('pg-promise')();
var connectionString = process.env.DATABASE_URL || 'postgres://postgres:1@localhost:5432/todo';
var db = pgp(connectionString);
var dbConn = "asd riki"

var rikiModified = function(){

	return function(a,b){
		a= 1+ b
		return "Value of a is = " + a;

	}
}

db.query("CREATE TABLE users(id SERIAL PRIMARY KEY, name VARCHAR(255) not null, password VARCHAR(255) not null)")
.then(function (data) {
        console.log(data); // print data;
        console.log("success")
    }, function (reason) {
        console.log(reason); // print error;
    });