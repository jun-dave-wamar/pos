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
                type: Number,
                required: true
            },
            productPrice:{
                type: Number,
                required: true,
            },
            quantity:{
                type: String,
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