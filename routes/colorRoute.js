const express = require('express')
const router = express.Router();
const Color = require('../models/colorModel')
const { isAdmin, isAuth } = require('../util');
const expressAsyncHandler = require('express-async-handler');

//Создать 
router.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const { colorName, colorUrl,cat } = req.body
      const candidate = await Color.findOne({ colorName })
      if (candidate) {
        return res.status(400).json({ message: 'Такой цвет уже существует' })
      }
      const newColor = new Color({
        colorName,
        colorUrl,
        cat
      })
      await newColor.save()
      res.status(201).json({
        message: 'Цвет создан',
        // можно в ответ добавить data
        data: newColor,
      })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  }))
//Update PUT
router.put('/:id', isAuth, isAdmin, async (req, res) => {
  const productId = req.params.id;
  const product = await Color.findById(productId);
  if (product) {
    product.colorName = req.body.colorName;
    product.colorUrl = req.body.colorUrl;

    const updatedProduct = await product.save();
    if (updatedProduct) {
      return res
        .status(200)
        .send({ message: 'Цвет обновлен', data: updatedProduct });
    }
  }
  return res.status(500).send({ message: ' Error in Updating Product.' });
});
//LIST
router.get('/', async (req, res) => {
  try {
    const colors = await Color.find()
    res.json(colors)
  } catch (error) {
    res.json({ message: error })
  }
})
//Удалить
router.delete('/:id', isAuth, isAdmin, async (req, res) => {
  try {
    // const removedDoor = await Door.remove({_id:req.params.doorId}) 
    const removedColor = await Color.deleteOne({ _id: req.params.id })
    res.json({
      message:'Цвет удален',
       color:removedColor
    })
  } catch (error) {
    res.json({ message: error })
  }
})



module.exports = router 