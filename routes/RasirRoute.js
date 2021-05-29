const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Get gig list
router.get('/', (req, res) => 
  Gig.findAll()
    .then(gigs => res.render('gigs', {
        gigs
      }))
    .catch(err => res.render('error', {error: err})));

// Display add gig form
router.get('/add', (req, res) => res.render('add'));

// Add a gig
router.post('/add', (req, res) => {
  let { title, technologies, budget, description, contact_email } = req.body;
  let errors = [];

  // Validate Fields
  if(!title) {
    errors.push({ text: 'Please add a title' });
  }
  if(!technologies) {
    errors.push({ text: 'Please add some technologies' });
  }
  if(!description) {
    errors.push({ text: 'Please add a description' });
  }
  if(!contact_email) {
    errors.push({ text: 'Please add a contact email' });
  }

  // Check for errors
  if(errors.length > 0) {
    res.render('add', {
      errors,
      title, 
      technologies, 
      budget, 
      description, 
      contact_email
    });
  } else {
    if(!budget) {
      budget = 'Unknown';
    } else {
      budget = `$${budget}`;
    }

    // Make lowercase and remove space after comma
    technologies = technologies.toLowerCase().replace(/,[ ]+/g, ',');

    // Insert into table
    Gig.create({
      title,
      technologies,
      description,
      budget,
      contact_email
    })
      .then(gig => res.redirect('/gigs'))
      .catch(err => res.render('error', {error:err.message}))
  }
});

// Search for gigs
router.get('/search', (req, res) => {
  let { term } = req.query;

  // Make lowercase
  term = term.toLowerCase();

  Gig.findAll({ where: { technologies: { [Op.like]: '%' + term + '%' } } })
    .then(gigs => res.render('gigs', { gigs }))
    .catch(err => res.render('error', {error: err}));
});

// module.exports = router;


///////////////////////////////////////////////////
const express = require('express')
const Tasks = require('../db/models/tasks');
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/tasks',auth,async (req,res) =>{
    const task = new Tasks({...req.body,owner:req.user._id})
    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(500).send(e.message)
    }
})
//pagination limit=10 skip=10
//sort
router.get('/tasks',auth,async (req,res) => {
    const match = {}
    const sort = {}
    if(req.query.isCompleted){
        match.isCompleted = req.query.isCompleted === 'true'
    }
    if(req.query.sortBy){
        const str = req.query.sortBy.split(':')
        sort[str[0]] = str[1] === 'desc' ? -1:1
    }
    try {
        // const tasks = await Tasks.find({owner:req.user._id})
        await req.user.populate({
            path:'tasks',
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                sort
            }
        }).execPopulate();
        res.status(200).send(req.user.tasks)
    }catch(e) {
        res.status(400).send(e.message)
    }
})

router.get('/tasks/:id',auth,async (req,res) => {
    try {
        const task = await Tasks.findByOne({_id:req.params.id,owner:req.user._id})
        if (!task)
           return  res.status(404).send()
        res.status(200).send(task)
    }catch(e){
        res.status(400).send()
    }
})

router.patch('/tasks/:id',auth,async (req,res) => {
    const allowedUpdates = ['name','isCompleted']
    const keys = Object.keys(req.body);
    const isUpdationValid = keys.every(key => allowedUpdates.includes(key))
    if(!isUpdationValid)
    res.status(400).send()
    try {
        const task = await Tasks.findByOne({_id:req.params.id,owner:req.user._id})
        if(!task)
           return res.status(404).send()
        res.status(200).send(task)
    }catch(e){
        res.status(400).send()
    }
})

router.delete('/tasks/:id',auth,async (req,res) =>{
    try{
        const task = await Tasks.findByOne({ _id: req.params.id, owner: req.user._id })
        if (!task)
          return res.status(404).send()
        res.status(200).send(task)

    }catch(e){
        res.status(400).send()
    }
})
module.exports = router

//////////////////BASIR   
productRouter.get(
    '/',
    expressAsyncHandler(async (req, res) => {
      const pageSize = 3;
      const page = Number(req.query.pageNumber) || 1;
      const name = req.query.name || '';
      const category = req.query.category || '';
      const seller = req.query.seller || '';
      const order = req.query.order || '';
      const min =
        req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
      const max =
        req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
      const rating =
        req.query.rating && Number(req.query.rating) !== 0
          ? Number(req.query.rating)
          : 0;
  
      const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
      const sellerFilter = seller ? { seller } : {};
      const categoryFilter = category ? { category } : {};
      const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
      const ratingFilter = rating ? { rating: { $gte: rating } } : {};
      const sortOrder =
        order === 'lowest'
          ? { price: 1 }
          : order === 'highest'
          ? { price: -1 }
          : order === 'toprated'
          ? { rating: -1 }
          : { _id: -1 };
      const count = await Product.count({
        ...sellerFilter,
        ...nameFilter,
        ...categoryFilter,
        ...priceFilter,
        ...ratingFilter,
      });
      const products = await Product.find({
        ...sellerFilter,
        ...nameFilter,
        ...categoryFilter,
        ...priceFilter,
        ...ratingFilter,
      })
        .populate('seller', 'seller.name seller.logo')
        .sort(sortOrder)
        .skip(pageSize * (page - 1))
        .limit(pageSize);
      res.send({ products, page, pages: Math.ceil(count / pageSize) });
    })
  );
  