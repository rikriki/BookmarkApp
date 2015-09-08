var express = require('express');
var app = express();
var server =require('http').createServer(app)
var path = require('path');
var users =0;
//var runningPortNumber = process.env.PORT;
// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 1337;

var bodyParser = require('body-parser');
var router = express.Router();

var pgp = require('pg-promise')();
var connectionString = process.env.DATABASE_URL || 'postgres://postgres:1@localhost:5432/todo';
var db = pgp(connectionString);

var session = require('express-session');

var sess;
// Session-persisted message middleware                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
app.use(session({
  secret: 'ssshhhhh',
  resave: true,
  saveUninitialized: true
}));

app.use(express.static(__dirname + '/dist/'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('app', __dirname + '/dist/');
app.engine('html', require('ejs').renderFile);

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});  

router.route('/')
  .get(function(req,res){
    res.render('index.html');
})

//API GET, POST for 
//  users
router.route('/api/v2/users')
  .get(function(req,res){
    sess=req.session;
      if(sess.userid==null)  
      {
        res.json({status:500, message: 'Unauthorized access!!', type:'internal'});
      }else{
        db.query("SELECT * FROM users ORDER BY id ASC")
          .then(
            function (data) {
              return res.json(data);
            }, 
            function (reason) {
              res.json({status:500, message: 'internal error', type:'internal'});
        });
      }
      
  })
  .post(function(req,res){
      var data = {username: req.body.username,password:req.body.password};
      
      db.none("INSERT INTO users(name, password) values($1, $2)", [data.username,data.password])
      .then(
        function () {
        sess.userid = null;
        sess=req.session;
        sess.userid = req.body.username;
        console.log(req.body.username)
        res.json({status:200, message: 'sucess'});
        }, 
        function (reason) {
          res.json({status:500, message: 'username is not available please choose again', type:'internal'});
      })
  });

//API GET, POST for 
//  Login  
router.route('/api/v2/login')
		.get(function (req, res) {
			sess=req.session;
      if(sess.userid==null)  
      {
        res.status(200).json({success:false,message: 'Unauthorized access!!'})
      }else{
        res.status(200).json({success:true,message: 'Access granted'})
      }
		})
		.post(function (req, res) {
	     db.result("SELECT name FROM users where name=$1 and password=$2",[req.body.username,req.body.password])
       .then(function (result) {
            if(result.rowCount){
                sess.userid = null;
                sess=req.session;
                sess.userid = result.rows[0].name;
                res.json({status:200, message: 'sucess'});
                
            }else{
               res.json({status:500, message: 'invalid username and password', type:'internal'});
            }
            
      }, function (reason) {
             res.json({status:500, message: 'internal error', type:'internal'});
      });
		})
		.delete(function (req, res) {
			sess.userid = null;
      req.session.destroy(function(err){
        if(err){
          res.json({status:500, message: 'internal error', type:'internal'});
        }
        else
        {
          res.json({status:200, message: 'sucess'});
        }

      });
		});


router.route('/api/v2/bookmark')
  .get(function(req, res) {
    sess=req.session;
    if(sess.userid==null)  
    {
       res.json({status:500, message: 'Unauthorized access!!', type:'internal'});
    }else{
        db.query("SELECT * FROM bookmarks where username=$1",sess.userid)
        .then(
          function (data) {
            console.log("check")
            return res.json(data);
          }, 
          function (reason) {
            res.json({status:500, message: 'internal error', type:'internal'});
        });
    }
  })
  .put(function(req, res) {
    sess=req.session;
    if(sess.userid==null)  
    {
       res.json({status:500, message: 'Unauthorized access!!', type:'internal'});
    }else{
      var results=[];
      var data = {"title": req.body.title,description:req.body.description, tagname: req.body.tagname,url:req.body.url};
      db.none("INSERT INTO bookmarks(title, description,tagname,url,username) values($1, $2,$3,$4,$5)", [data.title,data.description,data.tagname,data.url,sess.userid])
      .then(
        function () {
          return res.json({'success':true});
        }, 
        function (reason) {
          return res.json({'success':true});
        }
      )
    }
      
  });

//API UPDATE, GET and DELETE for 
//  individual bookmarks
router.route('/api/v2/bookmark/:bookmark_id')
	.post(function(req, res) {
	    var results=[];
	    var data = {"title": req.body.title,description:req.body.description, tagname: req.body.tagname,url:req.body.url};
	    var id = req.params.bookmark_id;
	    db.none("UPDATE bookmarks SET title=($1), description=($2),tagname=($3),url=($4) WHERE id=($5)", [data.title,data.description,data.tagname,data.url,id])
	    .then(
	    	function () {
	         res.json({status:200, message: 'success'});
	    	}, 
	    	function (reason) {
	         res.json({status:500, message: 'internal error', type:'internal'});
	 		}
	 	)
	})
	.delete(function(req, res) {
    sess=req.session;
    if(sess.userid==null)  
    {

       res.json({status:500, message: 'Unauthorized access!!', type:'internal'});
    }else{
	    var results=[];
	    var id = req.params.bookmark_id;
	    db.none("DELETE FROM bookmarks WHERE id=($1)", [id])
	    .then(
	    	function () {
          res.status(200).json({status:200, message: 'success'});
	    	}, 
	    	function (reason) {
          console.log("failed")
	        res.status(500).json({status:500, message: 'Wrong ID'});
	 		}
	 	  )
    }
	});
	




app.use('/',router)

server.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});







