const passport = require("passport");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = (app, db) => {
  app.post("/createcheckupcase",passport.authenticate('jwt', { session: false }), function(req, res) {
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

  app.post("/getcheckupcase",passport.authenticate('jwt', { session: false }), function(req, res) {
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

  app.get("/getPatientDetail/:id",passport.authenticate('jwt', { session: false }), function(req, res) {
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

      try {
        let results = await db.checkupcase
        .findAll({
          where: { id: req.params.id }r
        })
        res.status(200).send(results);
      } catch (err) {
        res.status(400).send({ message: err.message });
      }
  });

  app.delete("/deletepatientcase/:id",passport.authenticate('jwt', { session: false }), function(req, res) {
    db.checkupcase
      .destroy({
        where: { id: req.params.id}
      })
      .then(results => {
        res.status(200).send("Delete La");
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



