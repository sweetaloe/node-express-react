const router = require('express').Router()
let Decoration = require('../models/decoration.model')

router.route('/').get((req,res)=>{
    Decoration.find()
    .then(decorations => res.json(decorations))
    .catch(err => res.status(400).json('error: '+err))
})

router.route('/add').post((req,res)=>{
    const cream = req.body.data.cream;
    const type = req.body.data.type;
    const color = req.body.data.color;
    const cost = req.body.data.cost;
    const newDecoration = new Decoration({cream, type,color,cost});

    newDecoration.save()
    .then(() => res.json('decoration added'))
    .catch(err => res.status(400).json('erroe: '+err))
    
})

router.route('/update').post((req, res) => {
    Decoration.findById(req.body.decorationid)
        .then(decor => {
            decor.cream = req.body.cream;
            decor.type = req.body.type;
            decor.color = req.body.color;
            decor.cost = req.body.cost;

            decor.save()
                .then(() => res.json('decoration update'))
                .catch(err => res.status(400).json('erroe: ' + err))
        })
        .catch(err => res.status(400).json('erroe: ' + err))

})
module.exports = router