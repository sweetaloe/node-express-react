const express = require('express')
const cors = require('cors')
require('dotenv') .config()
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

console.log(process.env.PORT)
const graphRouter = require('./routes/graph')
app.use('/', graphRouter)

 
app.listen(port, () => {
    console.log(`Server start on port: ${port}`)
})