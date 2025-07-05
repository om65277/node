const mongoose = require('mongoose');


// define thet mongodb connection url -

const mongoURL = 'mongodb://localhost:27017/hotels';


// Set up Mongodb connection

mongoose.connect('mongodb://localhost:27017/myDatabase')
  .then(() => console.log('Connected'))
  .catch(err => console.error('MongoDB connection error:', err));



// Get the default connection
// Mongoose maintains a default connections ojb representing the mongoodb connection.

const db = mongoose.connection;


// event listernes for database connections 

db.on('connected', () => {
    console.log("Connected to MongoDb server");
    
})

db.on('error', (err) => {
    console.log("Mongodb Connection error:", err);
    
})

db.on('disconnected', () => {
    console.log("disconnected");
    
})

//Export the database connections

module.exports = db;