
const Customer = require("../models/customer")

//GET /customer
async function getCustomer(req, res){
    try{
        const customer = await Customer.find().sort({_id:-1});
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

        const customerProducts = Array.isArray(product) ? product.map((item) => {
            return {
                selectedProduct: item.selectedProduct,
                productPrice: item.totalProductPrice,
                quantity: item.quantity
            };
        }) : product ;

        const customer = new Customer({
            name,
            number,
            product: customerProducts
        });

        await customer.save();
        res.status(201).json(customer);
    }catch(err){
        console.log(err);
        res.status(500).send("Server Error");
    }
}


module.exports = { getCustomer, postCustomer }