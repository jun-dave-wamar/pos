const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    stock:{
        type: Number, 
        required: true
    },
    datecreated:{
        type: Date,
        default: Date.now
    }
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product