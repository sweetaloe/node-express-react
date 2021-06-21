const router = require('express').Router()
let Filling = require('../models/filling.model')


router.route('/add').post((req, res) => {
    const type = req.body.data.type;
    const weight = req.body.data.weight;
    const cost = req.body.data.cost;
    const newFilling = new Filling({ type, weight, cost });

    newFilling.save()
        .then(() => res.json('filling added'))
        .catch(err => res.status(400).json('erroe: ' + err))

})

router.route('/update').post((req, res) => {
    Filling.findById(req.body.fillingid)
        .then(filling => {
            filling.type = req.body.type;
            filling.weight = req.body.weight;
            filling.cost = req.body.cost;

            filling.save()
                .then(() => res.json('filling update'))
                .catch(err => res.status(400).json('erroe: ' + err))
        })
        .catch(err => res.status(400).json('erroe: ' + err))

})
module.exports = router