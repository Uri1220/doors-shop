const mongoose = require('mongoose')

const colorSchema = new mongoose.Schema({

    colorName: { type: String },
   
    colorUrl: { type: String},

    image: { type: String},
  
  });

const PensSchema = mongoose.Schema({
    
    title:{type:String,required:true },
    category: { type: String, required: true },
    sub_category: { type: String, required: true},
    price: { type: Number, default: 0, required: true },

    color_id:{type:String,default:'pens/'},
    
    countInStock:{type:Number, default: 0},
    url:{type:String},  
    
    description: {type: String},
    
    
    colors:[colorSchema],


})
module.exports = mongoose.model('Pens',PensSchema)