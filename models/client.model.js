const mongoose  = require("mongoose");
const Schema = mongoose.Schema;
const clientSchema = new Schema({
    firstname:{
        type: String,
        required: true,
    },
    lastname:{
        type: String,
        required: true,
    },
    phone: {type:String},
    email: {type:String},
}
);

const Client = mongoose.model('Client', clientSchema);
module.exports = Client;