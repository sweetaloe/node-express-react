const router = require('express').Router()
let Filling = require('../models/filling.model')
let Decoration = require('../models/decoration.model')
let Client = require('../models/client.model')
let Cake = require('../models/cake.model')
let Order = require('../models/order.model')

router.route('/get').get((req, res) => {

    if (req.query[0] == "client")
        Client.find()
            .then((client) => res.json(client))
            .catch(err => res.status(400).json('erroe: ' + err))
    else if (req.query[0] == "decoration")
        Decoration.find()
            .then((dec) => res.json(dec))
            .catch(err => res.status(400).json('erroe: ' + err))
    else if (req.query[0] == "filling")
        Filling.find()
            .then((filling) => res.json(filling))
            .catch(err => res.status(400).json('erroe: ' + err))
    else if (req.query[0] == "cake")
        Cake.find()
            .then((cake) => res.json(cake))
            .catch(err => res.status(400).json('erroe: ' + err))
    else if (req.query[0] == "order")
        Order.find()
            .then((order) => res.json(order))
            .catch(err => res.status(400).json('erroe: ' + err))

})


module.exports = router