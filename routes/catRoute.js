const express = require('express')
const router = express.Router();
const Cat = require('../models/catModal')
const { isAdmin, isAuth } = require('../util');
const expressAsyncHandler = require('express-async-handler');


router.post(
  '/create',
    isAuth,
    isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {   
      const {cat} = req.body
      const candidate = await Cat.findOne({ cat })
      if (candidate) {
        return res.status(400).json({ message: 'Такая категория уже существует' })
      }
      const category = new Cat({
        cat
      })
      await category.save()
      res.status(201).json({ message: 'Категория создана' })

    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  }))

  //LIST
router.get('/list', async (req, res) => {
  try {
    const cats = await Cat.find()
    res.json(cats)
  } catch (error) {
    res.json({ message: error })
  }
})



module.exports = router 