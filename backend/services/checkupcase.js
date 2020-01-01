const passport = require("passport");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = (app, db) => {
  app.post("/createcheckupcase", function(req, res) {
    db.checkupcase
      .create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        congenital_disease: req.body.congenital_disease,
        allergic_medicine: req.body.allergic_medicine,
        blood_type: req.body.blood_type,
        weight: req.body.weight,
        height: req.body.height,
        temperature: req.body.temperature,
        pressure: req.body.pressure,

      })
      .then(result => {
        res.status(201).send("Created");
      })
      .catch(err => {
        res.status(400).send({ message: err.message });
      });
  });

  app.post("/getcheckupcase", function(req, res) {
    db.checkupcase
      .findAll({
        
        attribute: [ "id", "firstname", "lastname"]
      })
      .then(result => {
        res.status(201).send(result);
      })
      .catch(err => {
        res.status(400).send({ message: err.message });
      });
  });

  app.get("/getPatientDetail/:id", function(req, res) {
    db.checkupcase
      .findAll({
        where: { id: req.params.id }
      })
      .then(results => {
        res.status(200).send(results);
      })
      .catch(err => {
        res.status(400).send({ message: err.message });
      });
  });
};



