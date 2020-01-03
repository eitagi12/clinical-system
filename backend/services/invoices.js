const passport = require('passport')
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = (app, db) => {
  app.post("/getinvoices", passport.authenticate('jwt', { session: false }), function(req, res) {
    db.invoices
      .findAll({
        name: req.body.name,
        type: req.body.type,
        price: req.body.price,
      })
      .then(result => {
        res.status(201).send(result);
      })
      .catch(err => {
        res.status(400).send({ message: err.message });
      });
  });

  app.get("/invoicesDetail/:id",passport.authenticate('jwt', { session: false }), function(req, res) {
    db.invoices
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
}
