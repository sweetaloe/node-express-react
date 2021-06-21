const mongoose  = require("mongoose");
const Schema = mongoose.Schema;

const fillingSchema = new Schema({
    type: {type:String},
    weight: {type:String},
    cost: {type:Number}
}
);

const Filling = mongoose.model('Filling', fillingSchema);
module.exports = Filling;