const express = require('express')
const cors = require('cors')
var path = require('path');
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const graphRouter = require('./routes/graph')
app.use('/graph', graphRouter)


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
 

}

app.listen(port, () => {
    console.log(`Server start on port: ${port}`)
})