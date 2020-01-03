const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const passport = require('passport')


module.exports = (app, db) => {
  app.post("/createpatients",passport.authenticate('jwt', { session: false }), function(req, res) {
    db.patients
      .create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        birthday: req.body.birthday,
        address: req.body.address,
        phone_number: req.body.phone_number,
        phone_number_emergency: req.body.phone_number_emergency,
        congenital_disease: req.body.congenital_disease,
        allergic_medicine: req.body.allergic_medicine,
        blood_type: req.body.blood_type
      })
      .then(result => {
        res.status(201).send("Created");
      })
      .catch(err => {
        res.status(400).send({ message: err.message });
      });
  });

  app.post("/getpatients",passport.authenticate('jwt', { session: false }), function(req, res) {
    db.patients
      .findAll({
        where: { firstname: req.body.firstname, lastname: req.body.lastname },
        attribute: [ "id", "firstname", "lastname"]
      })
      .then(result => {
        res.status(201).send(result);
      })
      .catch(err => {
        res.status(400).send({ message: err.message });
      });
  });

  app.get("/patientDetail/:id",passport.authenticate('jwt', { session: false }), function(req, res) {
    db.patients
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

  app.get('/protected-route', passport.authenticate('jwt', { session: false }),
    function (req, res) {
      res.status(200).send(req.user)
    }
  )

};


