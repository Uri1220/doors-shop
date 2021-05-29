const expressAsyncHandler = require('express-async-handler');
const express = require('express')
const orderRouter = express.Router()
const Order = require('../models/orderModel')
const { isAdmin, isAuth } = require('../util');
var dateFormat = require("dateformat");
var now = new Date();
dateFormat.i18n = {
  dayNames: [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  monthNames: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "Января",
    "Февраля",
    "Марта",
    "Апреля",
    "Мая",
    "Июня",
    "Июля",
    "Августа",
    "Сентября",
    "Октября",
    "Ноября",
    "Декабря",
  ],
  timeNames: ["a", "p", "am", "pm", "A", "P", "AM", "PM"],
};


//LIST
orderRouter.get('/list', async (req, res) => {
  try {
    const orders = await Order.find().populate(
      'user',
      'name email isAdmin',
    )
    res.json(orders)
  } catch (error) {
    res.json({ message: error })
  }

})
//MINE
orderRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler ( async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);
//DELETE
orderRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      const deleteOrder = await order.remove();
      res.send({ message: 'Order Deleted', order: deleteOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);
//ONE
orderRouter.get(
  '/:id',
   isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

//CREATE
orderRouter.post('/',
   isAuth,
  async (req, res) => {
  // router.post('/',  isAuth, isAdmin, async (req, res) => {
  const order = new Order({

    orderItems: req.body.orderItems,
    shipping: req.body.shippingAddress,
     orderDate : dateFormat(now,"dd mmmm, yyyy, HH:MM"),
    //  orderDate : dateFormat(now,"dd mmmm, yyyy, HH:MM"),
    user: req.user._id,              

  });

  const newOrder = await order.save();
  if (newOrder) {
    return res
      .status(201)
      .send({ message: 'New Order Created', order: newOrder });
  }
  return res.status(500).send({ message: ' Error in Creating Order.' });
});


// orderRouter.get(
//   '/',
//    isAuth,
//    isSellerOrAdmin,
//   expressAsyncHandler(async (req, res) => {
//     const seller = req.query.seller || '';
//     const sellerFilter = seller ? { seller } : {};

//     const orders = await Order.find({ ...sellerFilter }).populate(
//       'user',
//       'name'
//     );
//     res.send(orders);
//   })
// );

// orderRouter.get(
//   '/mine',
//   isAuth,
//   expressAsyncHandler(async (req, res) => {
//     const orders = await Order.find({ user: req.user._id });
//     res.send(orders);
//   })
// );




// orderRouter.put(
//   '/:id/pay',
//   isAuth,
//   expressAsyncHandler(async (req, res) => {
//     const order = await Order.findById(req.params.id);
//     if (order) {
//       order.isPaid = true;
//       order.paidAt = Date.now();
//       order.paymentResult = {
//         id: req.body.id,
//         status: req.body.status,
//         update_time: req.body.update_time,
//         email_address: req.body.email_address,
//       };
//       const updatedOrder = await order.save();
//       res.send({ message: 'Order Paid', order: updatedOrder });
//     } else {
//       res.status(404).send({ message: 'Order Not Found' });
//     }
//   })
// );




orderRouter.put(
   '/:id/deliver',
  //  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      //  order.completed = req.body.completed;
       order. description = req.body.description || order.description;

       if(req.body.deliverDate){
        order.deliveredAt = dateFormat(req.body.deliverDate,"dd mmmm, yyyy") 

       }else{
        order.deliveredAt =  null
       }
      //  order.deliveredAt = req.body.deliverDate || null
      //  order.deliveredAt = dateFormat(req.body.deliverDate,"dd mmmm, yyyy") || null
       
      const updatedOrder = await order.save();
      res.send({ message: 'Order Delivered', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

module.exports = orderRouter;