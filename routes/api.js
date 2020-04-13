var express = require('express');
var router = express.Router();

const UserSystem = require('../bin/services/UserSystem').UserSystem;
const MenuSystem = require('../bin/services/MenuSystem').MenuSystem;
const SchemaUpdate = require('../bin/services/SchemaUpdate')
SchemaUpdate.SchemaUpdate();
SchemaUpdate.PopulateRoles().then(()=>{});
SchemaUpdate.PopulateUserFunctions().then(()=>{})
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

router.post('/RegisterUser', function (req, res, next) {
  let service = new UserSystem(req, res);
  service.RegisterUser();
})
router.post('/Login', function (req, res, next) {
  let service = new UserSystem(req, res);
  service.Login();
})
router.post('/RetrieveMenu', function (req, res, next) {
  let service = new MenuSystem(req, res);
  service.RetrieveMenu();
})

module.exports = router;