const express = require('express')
const config = require('config')
// const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())

app.use(cors())
app.use(express.json({ extended: true }))

const pensRoute = require('./routes/pens')
const userRoute = require('./routes/userRoute')
const doorRoute = require('./routes/doorRoute')
const orderRoute = require('./routes/orderRouter')
const catRoute = require('./routes/catRoute')
 const colorRoute = require('./routes/colorRoute')

 app.use('/api/pens',pensRoute)
 app.use('/api/doors',doorRoute)
 app.use('/api/users',userRoute)
 app.use('/api/orders',orderRoute)
 app.use('/api/cat',catRoute)
  app.use('/api/color',colorRoute)

  //

// app.get('/pens',(req,res) => {
//     res.send('pens page')
// })
// app.get('/',(req,res) => {
//     res.send('Home page !!!')
// })

// app.use('/api/auth', require('./routes/auth.routes'))
// app.use('/api/link', require('./routes/link.routes'))
// app.use('/t', require('./routes/redirect.routes'))

// if (process.env.NODE_ENV === 'production') {
//   app.use('/', express.static(path.join(__dirname, 'client', 'build')))

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//   })
// }

const PORT = config.get('port') || 5000

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
        useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    },()=>{console.log('connect to DB')})
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

// "mongoUri": "mongodb+srv://shop:shop12345@cluster0-fokk9.mongodb.net/star?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true",
// "baseUrl": "http://localhost:5000"

start()