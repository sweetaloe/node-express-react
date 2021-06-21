const router = require('express').Router()
let Client = require('../models/client.model')

router.route('/').get((req, res) => {
    Client.find()
        .then(clients => res.json(clients))
        .catch(err => res.status(400).json('error: ' + err))
})

router.route('/add').post((req, res) => {
    const firstname = req.body.data.firstname;
    const lastname = req.body.data.lastname;
    const email = req.body.data.email;
    const phone = req.body.data.phone;
    const newClient = new Client({ firstname, lastname, email, phone });

    newClient.save()
        .then(() => res.json('client added'))
        .catch(err => res.status(400).json('erroe: ' + err))

})

router.route('/update').post((req, res) => {
    Client.findById(req.body.clientid)
        .then(client => {
            client.firstname = req.body.firstname;
            client.lastname = req.body.lastname;
            client.email = req.body.email;
            client.phone = req.body.phone;

            client.save()
                .then(() => res.json('client update'))
                .catch(err => res.status(400).json('erroe: ' + err))
        })
        .catch(err => res.status(400).json('erroe: ' + err))

})
module.exports = router