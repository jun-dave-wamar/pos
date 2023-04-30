const mongoose = require("mongoose")

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    number:{
        type: String,
        required: true
    },
    product:[
        {
            selectedProduct:{
                type: String,
                required: true
            },
            productPrice:{
                type: Number,
                required: true,
            },
            quantity:{
                type: Number,
                required: true
            }
        }
    ],
    datecreated:{
        type: Date,
        default: Date.now
    }
})

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer