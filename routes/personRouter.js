const express = require('express');
const router = express.Router();

const Person = require('./../models/person');

router.post('/', async (req, res) => {

    try{
      
      // assusming the req body conatins the person data 
      const data = req.body;

      // create a new person doc using the mongoose model
      const newPerson = new Person(data);

      // save the new person to the db

      const response = await newPerson.save();
      console.log('data Saved');
      res.status(200).json(response);
      
    } catch (err){
      console.log(err);
      res.status(500).json({error : 'Internal server error'});
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


module.exports = router;