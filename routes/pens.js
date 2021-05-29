const express = require('express')
const router = express.Router()
const Pens = require('../models/Pens')

router.get('/list', async (req, res) => {

    const category = req.query.category || '';
    const categoryFilter = category ? { category } : {};

    const sub_category = req.query.sub_category || '';
    const sub_categoryFilter = sub_category ? { sub_category } : {};


    try {
        const pens = await Pens.find(
            {
                ...categoryFilter,
                ...sub_categoryFilter,
            }
        )
        res.json(pens)
    } catch (error) {
        res.json({ message: error })
    }
    // fetch('http://localhost:5000/pens').then(result=>{console.log(result)})  

    //fetch('http://localhost:5000/pens/list').then(result=>result.json()).then(json=>console.log(json))
})
router.post('/', async (req, res) => {
    const pens = new Pens({
        title: req.body.title,
        des: req.body.des
    })
    try {
        const savePens = await pens.save()
        res.json(savePens)
    } catch (error) {
        res.json({ message: error })
    }
})
router.get('/:penId', async (req, res) => {
    try {
        const pen = await Pens.findById(req.params.penId)
        res.json(pen)
    } catch (error) {
        res.json({ message: error })
    }
})
router.delete('/:penId', async (req, res) => {
    try {
        const removedPen = await Pens.remove({ _id: req.params.penId })
        res.json(removedPen)
    } catch (error) {
        res.json({ message: error })
    }
})
router.patch('/:penId', async (req, res) => {
    try {
        const updatedPen = await Pens.updateOne(
            { _id: req.params.penId },
            { $set: { title: req.body.title } },
        )
        res.json(updatedPen)
    } catch (error) {
        res.json({ message: error })
    }
})


module.exports = router