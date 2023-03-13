const express = require('express') 
const app = express() 
const cors = require('cors')

const connectDb = require('./config/dbConnection')
require('dotenv').config()

connectDb()

app.use(cors({
    credentials: true,
    origin: 'http://[::1]:5173',
  }));
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const catalogRoutes = require('./routes/catalogRoutes')

app.use('/users', userRoutes)
app.use('/products', productRoutes)
app.use('/catalog', catalogRoutes)

app.listen(4000)