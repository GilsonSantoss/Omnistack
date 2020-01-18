const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')

const app = express()
const port =  3000
const stringConnection = 'mongodb+srv://gilsonsantosxd:g12345@cluster0-svgma.mongodb.net/gilsu?retryWrites=true&w=majority'

mongoose.set('useCreateIndex', true)

mongoose.connect(stringConnection,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// Registro no express dependencias e configs
app.use(express.json()) 
app.use(routes)

app.listen(port)