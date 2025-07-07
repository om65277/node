const express = require('express');
const app = express();
const db = require('./db')
require ('dotenv').config();
const passport = require('./auth.js');

const bodyParser = require('body-parser');
app.use(bodyParser.json());


// middleware functions ---------------------

const logRequest = (req, res, next) => {
  console.log(`${new Date().toLocaleString()} Request Made to: ${req.originalUrl}`);
  next();
}

app.use(logRequest);


app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local', {session: false});

app.get('/', function (req, res) {
  res.send('Welcome to our hotel');
})

// Import the router files
const personRouter = require('./routes/personRouter.js');
const menuItemRoutes = require('./routes/menuItemRoutes.js');



// use the routers
app.use('/person', localAuthMiddleware, personRouter);
app.use('/menu', menuItemRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('listenong on port 3000'); 
})