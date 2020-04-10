var express = require('express');
var router = express.Router();

const UserSystem = require('../bin/services/UserSystem').UserSystem;
/* GET home page. */
router.post('/', function (req, res, next) {
  let service = new UserSystem(req, res);
  service.RetrieveAllUsers();
});
router.post('/GetUser', function (req, res, next) {
  let service = new UserSystem(req, res);
  service.RetrieveUserByID();
});

router.post('/GetUserByEmail', function (req, res, next) {
  let service = new UserSystem(req, res);
  service.RetrieveAllUsersByEmail();
});

router.post('/CreateUser', function (req, res, next) {
  let service = new UserSystem(req, res);
  service.RegisterUser();
})
router.post('/Login', function (req, res, next) {
  let service = new UserSystem(req, res);
  service.Login();
})

module.exports = router;