const router = require('express').Router()
let Cake = require('../models/cake.model')

router.route('/').get((req, res) => {
    Cake.find()
        .then(cake => res.json(cake))
        .catch(err => res.status(400).json('error: ' + err))
})

router.route('/add').post((req, res) => {
    const amount = req.body.data.amount;
    const sizeWidth = req.body.data.sizeWidth;
    const sizeHeight = req.body.data.sizeHeight;
    const sizeLength = req.body.data.sizeLength;
    const decoration = req.body.data.decoration;
    const filling = req.body.data.filling;
    const cost = req.body.data.cost;
    const newCake = new Cake({ amount, sizeWidth, sizeHeight, sizeLength, decoration, filling, cost });

    newCake.save()
        .then(() => res.json('cake added'))
        .catch(err => res.status(400).json('erroe: ' + err))

})

router.route('/update').post((req, res) => {
    Cake.findById(req.body.cakeid)
        .then(cake => {
            cake.amount = req.body.amount;
            cake.sizeWidth = req.body.sizeWidth;
            cake.sizeHeight = req.body.sizeHeight;
            cake.sizeLength = req.body.sizeLength;
            cake.decoration = req.body.decoration;
            cake.filling = req.body.filling;
            cake.cost = req.body.cost;

            cake.save()
                .then(() => res.json('cake update'))
                .catch(err => res.status(400).json('erroe: ' + err))
        })
        .catch(err => res.status(400).json('erroe: ' + err))

})

module.exports = router