const express = require('express')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

console.log(process.env.PORT)
const graphRouter = require('./routes/graph')
app.use('/', graphRouter)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
}

app.listen(port, () => {
    console.log(`Server start on port: ${port}`)
})