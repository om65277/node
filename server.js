const express = require('express');
const app = express();
const db = require('./db')
require ('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());



app.get('/', function (req, res) {
  res.send('Welcome to our hotel');
})

// Import the router files
const personRouter = require('./routes/personRouter.js');
const menuItemRoutes = require('./routes/menuItemRoutes');


// use the routers
app.use('/person', personRouter);
app.use('/menu', menuItemRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('listenong on port 3000'); 
})