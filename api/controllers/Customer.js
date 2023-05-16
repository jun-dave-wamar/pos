
const Customer = require("../models/customer");
const Product = require("../models/product");
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
        const {productID, name, number, product} = req.body;

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

// PUT /customer
async function updateCustomer(req, res){
    try {
      const { id, name, number, product } = req.body;
  
      const customer = await Customer.findById(id);
  
      if (!customer) {
        return res.status(404).json({ msg: "Customer not found" });
      }
  
      const customerProducts = Array.isArray(product) ? product.map((item) => {
        return {
          selectedProduct: item.selectedProduct,
          productPrice: item.productPrice,
          quantity: item.quantity,
          id: item._id
        };
      }) : product;
  

    // Subtract product quantities by finding the products using their IDs
    for (const productOrder of customerProducts) {
        const product = await Product.findById(productOrder.id);
  
        if (!product) {
          return res.status(404).json({ msg: "Product not found" });
        }
  
        const quantity = parseInt(productOrder.quantity, 10);
        if (product.stock < quantity) {
          return res
            .status(400)
            .json({ msg: `Only ${product.stock} ${product.name} available.` });
        }
  
        product.quantity -= quantity;
        await product.save();
      }


      customer.name = name;
      customer.number = number;
      customer.product = customerProducts;
  
      await customer.save();
      res.status(200).json(customer);
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  }

// POST /remove-customer
async function deleteCustomer(req, res) {
    try {
      const { id } = req.body;
      const customer = await Customer.findOneAndDelete({ _id: id });
      if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
      }
      res.status(200).json({ message: "Customer deleted successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
}



module.exports = { getCustomer, postCustomer, deleteCustomer, updateCustomer }