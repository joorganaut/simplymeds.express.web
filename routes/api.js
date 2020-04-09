var express = require('express');
var router = express.Router();

const UserDAO = require('../bin/data-access/UserDAO.PG');
/* GET home page. */
  router.post('/', function(req, res, next) {
  debugger; 
  
  console.log(Object.keys(UserDAO));
  debugger;
  var result = {}
  var userId = req;
  console.log('this is request ID '+ userId);
  UserDAO.GetAllUsers(req, res);
});
router.post('/GetUser', function(req, res, next) {
  debugger; 
  
  console.log(Object.keys(UserDAO));
  debugger;
  var result = {}
  var userId = req.body.ID;
  console.log('this is request ID '+ userId);
  UserDAO.GetUser(req, res);
  // UserDAO.GetUser(userId, res);
});

router.post('/GetUserByEmail', function(req, res, next) {
  debugger; 
  
  console.log(Object.keys(UserDAO));
  debugger;
  var result = {}
  var userId = req.body;
  console.log('this is request ID '+ JSON.stringify(userId));
  UserDAO.GetUserByEmail(req, res);
  // UserDAO.GetUser(userId, res);
});

router.post('/CreateUser', function(req, res, next){
    debugger; 
  
  console.log(Object.keys(UserDAO));
  debugger;
  var result = {}
  var userId = req.body;
  console.log('this is request ID '+ JSON.stringify(userId));
  UserDAO.Save(req, res);
  // UserDAO.GetUser(userId, res);
})

module.exports = router;