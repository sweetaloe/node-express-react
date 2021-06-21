const mongoose  = require("mongoose");
const Schema = mongoose.Schema;

const cakeSchema = new Schema({  
    amount:{type: Number},
    sizeWidth: {type:Number},
    sizeHeight: {type:Number},
    sizeLength:{type:Number},
    decoration: {type:mongoose.Schema.Types.ObjectId},
    filling: {type:mongoose.Schema.Types.ObjectId},
    cost: {type:Number},
}
);

const Cake = mongoose.model('Cake', cakeSchema);
module.exports = Cake;