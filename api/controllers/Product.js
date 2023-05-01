const express = require("express")
const Product = require("../models/product")

//GET /products
async function getProduct(req, res){
    try{
        const product = await Product.find();
        res.status(200).json(product);

    }catch(err){
        console.log(err);
        res.status(500).send("Server Error");
    }
}

//POST /products
async function postProduct(req, res){
    try{
        const {productName, price, stocks} = req.body;

        const product = new Product({
            productName,
            price,
            stocks,
        });
        await product.save();
        res.status(201).json(product);
    }catch(err){
        console.log(err);
        res.status(500).send("Server Error");
    }
}


module.exports = { getProduct, postProduct }