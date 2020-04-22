var express = require('express');
var router = express.Router();

const UserSystem = require('../bin/services/UserSystem').UserSystem;
const MenuSystem = require('../bin/services/MenuSystem').MenuSystem;
const PatientSystem = require('../bin/services/PatientSystem').PatientSystem;
const ProductSystem = require('../bin/services/ProductSystem').ProductSystem;
const PatientMedicalsSystem = require('../bin/services/PatientMedicalsSystem').PatientMedicalsSystem;
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
router.post('/RetrieveMenuByUser', function (req, res, next) {
  let service = new MenuSystem(req, res);
  service.RetrieveMenuByUser();
})
router.post('/RetrievePatientDetails', function (req, res, next) {
  let service = new PatientSystem(req, res);
  service.RetrievePatientByUserID();
})
router.post('/RetrievePatientMedicals', function (req, res, next) {
  let service = new PatientMedicalsSystem(req, res);
  service.RetrievePatientMedicalsByPatientID();
})
router.post('/AddPatientMedicals', function (req, res, next) {
  let service = new PatientMedicalsSystem(req, res);
  service.AddMedicalInfo();
})
router.post('/UpdatePatientDetails', function (req, res, next) {
  let service = new PatientSystem(req, res);
  service.UpdatePatientDetails();
})
router.post('/AddProductDetails', function (req, res, next) {
  let service = new ProductSystem(req, res);
  service.AddProductInfo();
})

module.exports = router;