const express = require('express')
const cors = require('cors')
var path = require('path');
const app = express()
const mongoose = require('mongoose')

require('dotenv').config()

const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())


const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology:true})
const connection = mongoose.connection;
connection.once('open', (err, resp)=>{
    console.log("DB-ok")
})
connection.once('error', console.error.bind(console, 'connection error:'));


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


const clientsRouter = require('./routes/clients')
app.use('/clients', clientsRouter)

const orderRouter = require('./routes/orders')
app.use('/orders', orderRouter)

const cakeRouter = require('./routes/cakes')
app.use('/cakes', cakeRouter)

const decorationRouter = require('./routes/decorations')
app.use('/decorations', decorationRouter)

const fillingRouter = require('./routes/filling')
app.use('/filling', fillingRouter)

const getRouter = require('./routes/main')
app.use('/main', getRouter)

app.listen(port, () => {
    console.log(`Server start on port: ${port}`)
})