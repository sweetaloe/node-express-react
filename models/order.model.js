const mongoose  = require("mongoose");
const Schema = mongoose.Schema;
const orderSchema = new Schema({
    clientid:{type: mongoose.Schema.Types.ObjectId},
    orderDate: {type:Date},
    deadlineDate: {type:Date},
    cakeid: {type:mongoose.Schema.Types.ObjectId},
    cost: {type:Number},
}
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;