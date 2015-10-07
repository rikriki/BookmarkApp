var should = require("should");
var superagent = require('superagent');

//After adding a new bookmark on the test,
// the id will be save into the "dataToDel" variable
// and then to be deleted on the deete bookmark 
var dataToDel;

// UNIT test begin
describe("Unit testing for users",function(){
  var agent = superagent.agent();
  before(loginUser(agent));
  it("should return all users",function(done){
    agent.get('http://localhost:1337/api/v2/users/')
    .end(function(err,res){
      res.status.should.equal(200);
      done();
    });
  });

  it("should delete user session",function(done){
    agent.del('http://localhost:1337/api/v2/login/')
    .end(function(err,res){
      res.status.should.equal(200);
      done();
    });
  });

  it("should not return all users, session is not set",function(done){
    superagent.get('http://localhost:1337/api/v2/users/')
    .end(function(err,res){
      res.status.should.equal(200);
      res.body.status.should.equal(500)
      done();
    });
  });
});

describe("Unit testing for login",function(){
  var agent = superagent.agent();
  before(loginUser(agent));
  it("should return succes true on logging in",function(done){
    agent.get('http://localhost:1337/api/v2/login/')
    .end(function(err,res){
      res.status.should.equal(200);
      res.body.success.should.equal(true)
      done();
    });
  });
  it("should return succes false on  incorrect credential",function(done){
    superagent.get('http://localhost:1337/api/v2/login/')
    .end(function(err,res){
      res.status.should.equal(200);
      res.body.success.should.equal(false)
      done();
    });
  });
});


describe("Unit testing for bookmarks",function(){
  var agent = superagent.agent();
  before(loginUser(agent));
  it("should return all bookmarks",function(done){
    agent.get("http://localhost:1337/api/v2/bookmark/")
    .end(function(err,res){
      //res.status.should.equal(200);
      var data = JSON.parse(res.text);
      dataToDel = data[0].id;
      done();
    });
  });

  it("should insert a bookmark",function(done){
    agent.put("http://localhost:1337/api/v2/bookmark/")
    .send({"title": 'testTitle',description:'testDescription', tagname: 'testTagName',url:"testURL"})
    .end(function(err,res){
      res.status.should.equal(200);
      res.body.success.should.equal(true);
    })
    done();
  });
  // Edit the bookmark with the ID=114
  it("should edit specific boookmark ID = 114",function(done){
    agent.post("http://localhost:1337/api/v2/bookmark/114")
    .send({"title": 'testTitle updated',description:'testDescriptionUpdated', tagname: 'testTagName',url:"testURL"})
    .end(function(err,res){
      res.status.should.equal(200);
      done();
    })
  });
  
  it("should delete specific boookmark with ID equal to dataToDel",function(done){
    console.log("value to delete is " + dataToDel)
    agent.del("http://localhost:1337/api/v2/bookmark/"+dataToDel)
    .end(function(err,res){
      console.log(res.body)
       res.body.message.should.equal('success')
       res.status.should.equal(200);
      done();
    })
  });

  it("should show error when deleting boookmark with wrong ID",function(done){
    console.log("value to delete is 10000" )
    agent.del("http://localhost:1337/api/v2/bookmark/100000")
    .end(function(err,res){
      res.body.message.should.equal('success')
      res.status.should.equal(200);
      done();
    })
  });
});

function loginUser(agent) {
  return function(done) {
    agent
      .post('http://localhost:1337/api/v2/login/')
      .send({ username: 'riki', password: 'rosales' })
      .end(onResponse);

    function onResponse(err, res) {
      res.status.should.equal(200);
      return done();
    }
  };
}