const mongoose  = require("mongoose");
const Schema = mongoose.Schema;

const decorationSchema = new Schema({
    cream:{type: String},
    type: {type:String},
    dectype: {type:String},
    color: {type:String},
    cost: {type:Number},
}
);

const Decoration = mongoose.model('Decoration', decorationSchema);
module.exports = Decoration;