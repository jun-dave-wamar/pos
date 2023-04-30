const express = require("express");
const Customer = require("../models/customer")

//GET /customer
async function getCustomer(req, res){
    try{
        const customer = await Customer.find();
        res.status(200).json(customer);

    }catch(err){
        console.log(err);
        res.status(500).send("Server Error");
    }
}

//POST /customer
async function postCustomer(req, res){
    try{
        const {name, number, product} = req.body;

        const customer = new Customer({
            name,
            number,
            product: JSON.parse(product),
        });

        await customer.save();
        res.status(201).json(customer);
    }catch(err){
        console.log(err);
        res.status(500).send("Server Error");
    }
}


module.exports = { getCustomer, postCustomer }