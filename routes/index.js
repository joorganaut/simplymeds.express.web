var express = require('express');
var router = express.Router();
const UserDAO = require('../bin/data-access/UserDAO.PG');
/* GET home page. */
// router.get('/', function(req, res, next) {
  router.get('/', function(req, res, next) {
  debugger; 
  
  console.log(Object.keys(UserDAO));
  debugger;
  var result = {}
  var userId = req.query['ID'];
  console.log('this is request ID '+ userId);
  UserDAO.GetAllUsers(userId, res);
  // UserDAO.GetUser(userId, res);
});
router.get('/GetUserByEmail', function(req, res, next) {
  debugger; 
  
  console.log(Object.keys(UserDAO));
  debugger;
  var result = {}
  var userId = req.query['Email'];
  console.log('this is request ID '+ userId);
  UserDAO.GetUserByEmail(req, res);
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

module.exports = router;
