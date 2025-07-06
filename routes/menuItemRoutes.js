const express = require('express');
const router = express.Router();

const MenuItem = require('./../models/menu');



router.get('/', async(req, res) => {

    try {
      const data = await MenuItem.find();
      console.log('Data fetched');
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({error : 'Internal server error'});
    }
})




// post method to add a menu item

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new MenuItem(data);

    const response = await newMenu.save();
    console.log('DATA SAVED');
    res.status(200).json(response);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal server Error'});
    
  }
})

// GET method for Menu items

router.get('/:taste', async(req, res) => {
  try {
    const taste = req.params.taste;
     if (taste == 'spicy' || taste =='sweet' || taste == 'sour' || taste == 'savory') {
      const response = await MenuItem.find({ taste : taste });
      console.log('Data fetched');
      res.status(200).json(response);
    } else {
      res.status(404).json({error: 'NOT FOUND'});      
    }

  } catch (err) {
     console.log(err);
    res.status(500).json({error : 'Internal server error'});
  }
})

module.exports = router;