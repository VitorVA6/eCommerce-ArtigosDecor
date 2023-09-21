const express = require('express') 
const app = express() 
const cors = require('cors')

const connectDb = require('./config/dbConnection')
require('dotenv').config()

connectDb()

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
  }));
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const catalogRoutes = require('./routes/catalogRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const variationRoutes = require('./routes/variationRoutes')
const paymentRoutes = require('./routes/paymentRoutes')

app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/catalog', catalogRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/variation', variationRoutes)
app.use('/api/mercado-pago', paymentRoutes)

app.listen(4000)