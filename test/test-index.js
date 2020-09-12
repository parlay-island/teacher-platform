var chai = require("chai");
var chaiHttp = require("chai-http");
var app = require("../app");
var should = chai.should();

chai.use(chaiHttp);

it("should route to the index page", function (done) {
  chai
    .request(app)
    .get("/")
    .end(function (err, res) {
      res.should.have.status(200);
      done();
    });
});