const express = require("express")
const Product = require("../models/product")

//GET /products
async function getProduct(req, res){
    try{
        const product = await Product.find().sort({_id:-1});
        res.status(200).json(product);

    }catch(err){
        console.log(err);
        res.status(500).send("Server Error");
    }
}

//POST /products
async function postProduct(req, res){
    try{
        const {productName, price, stock} = req.body;

        const product = new Product({
            productName,
            price,
            stock,
        });
        await product.save();
        res.status(201).json(product);
    }catch(err){
        console.log(err);
        res.status(500).send("Server Error");
    }
}

//PUT /products/:id
async function updateProduct(req, res){
    try{
    
        const {id, productName, price, stock} = req.body;

        const product = await Product.findById(id);

        if(!product){
            return res.status(404).json({msg: "Product not found"});
        }

        product.productName = productName;
        product.price = price;
        product.stock = stock;

        await product.save();

        res.status(200).json(product);

    }catch(err){
        console.log(err);
        res.status(500).send("Server Error");
    }
}


module.exports = { getProduct, postProduct, updateProduct }

