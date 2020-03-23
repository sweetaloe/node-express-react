const express = require('express')
const cors = require('cors')


//require('dotenv').config()

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

const graphRouter = require('./routes/graph')
app.use('/', graphRouter)





app.listen(port, () => {
    console.log(`Server soset on port: ${port}`)
})