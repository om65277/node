const express = require('express');
const router = express.Router();
const Person = require('./../models/person');
const {jwtAuthMiddleware, generateToken} = require('../jwt');
const { use } = require('passport');

router.post('/', async (req, res) => {

    try{
      
      // assusming the req body conatins the person data 
      const data = req.body;

      // create a new person doc using the mongoose model
      const newPerson = new Person(data);

      // save the new person to the db

      const response = await newPerson.save();
      console.log('data Saved');

      const token = generateToken(response.username);
      console.log("Token is :", token);
      

      res.status(200).json(response);
      
    } catch (err){
      console.log(err);
      res.status(500).json({error : 'Internal server error'});
    }
});


// Login route

router.post('/login', async(req, res) => {
  try {
    // Extract username and the password from request body
    const { username, password } = req.body;

    // find the user by username
    const user = await Person.findOne({username: username});

    // if user does not exist or password does not match, retun error
    if(!user || !(await user.comparePassword(password))){
      return res.status(401).json({error: 'Invalid username or password'});
    }

    // generate tokens
     const payload = {
      id : user.id,
      username: user.username
    }

    const token = generateToken(payload);

    // return token as response

    res.json({token});
    
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal server Error'});
  }
});


// GET method to get the person

router.get('/', async(req, res) => {

    try {
      const data = await Person.find();
      console.log('Data fetched');
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({error : 'Internal server error'});
    }
})



// parameterized api call

router.get('/:workType', async(req, res) => {
  try{
    const workType = req.params.workType;
    if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
      const response = await Person.find({ work: workType });
      console.log('Response fetched');
      res.status(200).json(response);
    } else {
      res.status(404).json({error: 'NOT FOUND'});      
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({error : 'Internal server error'});
  }
})


// Update method (PUT) 

router.put('/:id', async(req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;

    const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
      new: true,
      runValidators : true,
    })

    if (!response) {
      return res.status(404).json({error: 'Person not found'});
    }

    console.log('DATA UPDATED')
    res.status(200).json(response);

  } catch (error) {
    console.log(err);
    res.status(500).json({error : 'Internal server error'});
  }
})


// Delete method 

router.delete('/:id', async(req, res) => {
  try {
    const personId = req.params.id;


    const response = await Person.findByIdAndDelete(personId);

     if (!response) {
      return res.status(404).json({error: 'Person not found'});
    }

     console.log('DATA DELETED')
    res.status(200).json({messege : 'Perosn Deleted'});

  } catch (error) {
    console.log(err);
    res.status(500).json({error : 'Internal server error'}); 
  }
})

// hello bhai

module.exports = router;