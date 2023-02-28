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

const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')

app.use('/users', userRoutes)
app.use('/products', productRoutes)

app.listen(4000)