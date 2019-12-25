const passport = require('passport');
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

module.exports = (app, db) => {
    app.post('/createpatients', 
      function (req, res) {
        db.patients.create({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          birthday: req.body.birthday,
          address: req.body.address,
          phone_number: req.body.phone_number,
          phone_number_emergency: req.body.phone_number_emergency,
          congenital_disease: req.body.congenital_disease,
          allergic_medicine: req.body.allergic_medicine,
          blood_type: req.body.blood_type,
        })
          .then(result => {
            res.status(201).send("Created")
          })
          .catch(err => {
            res.status(400).send({ message: err.message })
          })
      }
    )

    app.post('/getpatients',
      function (req, res) {
        db.patients.findAll({
          where: { firstname: req.body.firstname, lastname: req.body.lastname},
        })
        .then(result => {
          res.status(201).send(result)
        })
        .catch(err => {
          res.status(400).send({ message: err.message })
        })
      }
    )
}