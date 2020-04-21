const express = require('express')
const cors = require('cors')


const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

const graphRouter = require('./routes/graph')
app.use('/', graphRouter)

 
app.listen(port, () => {
    console.log(`Server start on port: ${port}`)
})