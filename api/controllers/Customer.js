const connection = require("../../db")
const Customer = require("../models/customer")

connection();
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

        const parsedProduct = JSON.parse(product); // parse the product string to an object

        const customer = new Customer({
            name,
            number,
            product: parsedProduct // pass the parsed product object
        });

        await customer.save();
        res.status(201).json(customer);
    }catch(err){
        console.log(err);
        res.status(500).send("Server Error");
    }
}


module.exports = { getCustomer, postCustomer }