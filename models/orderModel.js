const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        name: { type: String, required: false },
        sz: { type: String, required: false, default:'' },
        // cl: { type: mongoose.Schema.Types.ObjectId, ref: 'Color'},
         cl: { type: String, required: false,  default:''},
        qty: { type: Number, required: false },
        image: { type: String, required: false },
        price: { type: Number, required: false },
      },
    ],  

    // shippingAddress: {
    shipping: {
      fullName: { type: String, required: false },
      address: { type: String, required: false },
      postalCode: { type: String, required: false },
    },
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      deliveredAt: { type:String,default:null},
      orderDate: { type: String },
      description: { type: String,default:''},
      // completed:{type:Boolean, default:false},
  },
  //  {
  //    timestamps: false,
  //  }
);
module.exports = mongoose.model('Order', orderSchema);