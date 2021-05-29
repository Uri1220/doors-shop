const express = require('express')
const router = express.Router()
const Door = require('../models/doorModal')
const { isAdmin, isAuth } = require('../util');


router.get('/list', async (req, res) => {

  const category = req.query.category || '';
  const categoryFilter = category ? { category } : {};

  const sub_category = req.query.sub_category || '';
  const sub_categoryFilter = sub_category ? { sub_category } : {};

  const min =
    req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
  const max =
    req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
  const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};

   const colorId = req.query.colorId || '';
    const colorsFilter =colorId ?{ colors: { $elemMatch: { _id: colorId } } } : {};
  //  const colorsFilter ={ colors: { $elemMatch: { _id: '60505d8a763ba31915b86fdf' } } } ;

  // const color = req.query.color || '';
  // const colorsFilter = color ? { colors: { $elemMatch: { colorName: color } } } : {};
  //  const colorsFilter =  {colors:{$elemMatch:{colorName:"Virgin"}}} ;

      const word = req.query.word || '';

    //  const searchFilter = word ? {$text: {$search: word}} : {}
     const searchFilter = word ? { title: { $regex: word, $options: 'i' } } : {};


  try {
    const doors = await Door.find({
      ...categoryFilter,
      ...sub_categoryFilter,
      ...priceFilter,
      ...colorsFilter,
       ...searchFilter
    })
    // .populate(
    //   'colors',
    //   'colorName colorUrl',
    // )

    res.json(doors)

  } catch (error) {
    res.json({ message: error })
  }
  // fetch('http://localhost:5000/door').then(result=>{console.log(result)})  

  // fetch('http://localhost:5000/doors/list')
  // .then(result=>result.json()).then(json=>console.log(json))
})

//Создать
router.post('/',
  isAuth,
  isAdmin,
  async (req, res) => {
    const product = new Door({
      title: req.body.title,
      price: req.body.price,
      url: req.body.url,
      typ: req.body.typ,
      color_id: req.body.color_id,
      category: req.body.category,
      sub_category: req.body.sub_category,
      countInStock: req.body.countInStock,
      position: req.body.position,
      description: req.body.description,
      complect: req.body.complect,
      size: req.body.size,
      colors: req.body.colors
    });
    const newProduct = await product.save();
    if (newProduct) {
      return res
        .status(201)
        .send({ message: 'New Product Created', data: newProduct });
    }
    return res.status(500).send({ message: ' Error in Creating Product.' });
  });

//Получить один
router.get('/:doorId', async (req, res) => {
  try {
    const door = await Door.findById(req.params.doorId)

    res.json(door)
  } catch (error) {
    res.json({ message: error })
  }
})

//Удалить
router.delete('/:doorId', isAuth, isAdmin, async (req, res) => {
  try {
    // const removedDoor = await Door.remove({_id:req.params.doorId}) 
    const removedDoor = await Door.deleteOne({ _id: req.params.doorId })
    res.json(removedDoor)
  } catch (error) {
    res.json({ message: error })
  }
})

//Update PUT
router.put('/:id',
  //  isAuth,
  //   isAdmin,
  async (req, res) => {
    const productId = req.params.id;
    const product = await Door.findById(productId);
    if (product) {
      product.title = req.body.title;
      product.price = req.body.price;
      product.url = req.body.url;
      product.typ = req.body.typ;
      product.color_id = req.body.color_id;
      product.category = req.body.category;
      product.sub_category = req.body.sub_category;
      product.countInStock = req.body.countInStock;
      product.position = req.body.position;
      product.description = req.body.description;
      product.complect = req.body.complect
      product.size = req.body.size
      product.colors = req.body.colors


      const updatedProduct = await product.save();
      if (updatedProduct) {
        return res
          .status(200)
          .send({ message: 'Product Updated', data: updatedProduct });
      }
    }
    return res.status(500).send({ message: ' Error in Updating Product.' });
  });

// router.patch('/:doorId',async(req,res) => {
//     try {
//         const updatedDoor = await Door.updateOne(
//             {_id:req.params.doorId},
//             {$set:{title:req.body.title}},
//             ) 
//         res.json(updatedDoor)     
//     } catch (error) {
//         res.json({message:error})
//     }   
// })


module.exports = router