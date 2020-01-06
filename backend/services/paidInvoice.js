const passport = require('passport')
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = (app, db) => {
  app.post("/createpaidinvoice",  function(req, res) {
    db.paidInvoice
      .create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        total: req.body.total,
      })
      .then(result => {
        res.status(201).send(result);
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
}
