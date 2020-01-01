const express = require('express')
const bodyParser = require('body-parser')
const db = require('./models')
const userService = require('./services/user')
const patientService = require('./services/patients')
const checkupCase = require('./services/checkupcase')
// const postService = require('./services/post')
const cors = require('cors')

const app = express()

// import passport
const passport = require('passport')

// use the strategy
app.use(passport.initialize())
app.use(cors())

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// import config of passport
require('./config/passport/passport')

db.sequelize.sync({ alter: true }).then(() => {
  userService(app, db);
  patientService(app, db);
  checkupCase(app, db);
//   postService(app, db);

  app.listen(8080, () => console.log("Server is running on port 8080"))
})