const mongoose = require('mongoose')

const catSchema = new mongoose.Schema({

  cat: { type: String, required: true },
 
});

module.exports = mongoose.model('Cat', catSchema);

