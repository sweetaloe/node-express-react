const router = require('express').Router()
let Order = require('../models/order.model')

router.route('/').get((req, res) => {
    Order.find()
        .then(order => res.json(order))
        .catch(err => res.status(400).json('error: ' + err))
})

router.route('/add').post((req, res) => {
    const clientid = req.body.data.clientid;
    const orderDate = req.body.data.orderDate;
    const deadlineDate = req.body.data.deadlineDate;
    const cakeid = req.body.data.cakeid;
    const cost = req.body.data.cost;
    const newOrder = new Order({ clientid, orderDate, deadlineDate, cakeid, cost });

    newOrder.save()
        .then(() => res.json('order added'))
        .catch(err => res.status(400).json('erroe: ' + err))

})

router.route('/update').post((req, res) => {
    Order.findById(req.body.orderid)
        .then(order => {
            order.clientid = req.body.clientid;
            order.orderDate = req.body.orderDate;
            order.deadlineDate = req.body.deadlineDate;
            order.cakeid = req.body.cakeid;
            order.cost = req.body.cost;

            order.save()
                .then(() => res.json('order update'))
                .catch(err => res.status(400).json('erroe: ' + err))
        })
        .catch(err => res.status(400).json('erroe: ' + err))

})
module.exports = router