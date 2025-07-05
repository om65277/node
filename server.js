const express = require('express');
const app = express();
const db = require('./db')

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


app.listen(3000, () => {
  console.log('listenong on port 3000'); 
})