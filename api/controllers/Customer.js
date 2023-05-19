const Customer = require("../models/customer")
const Product = require("../models/product")

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
        const { name, number, product} = req.body;

        const customerProducts = Array.isArray(product) ? product.map((item) => {
            return {
                selectedProduct: item.productName,
                productPrice: item.totalProductPrice,
                quantity: item.quantity,
                id: item._id,
            };
        }) : product ;

        const customer = new Customer({
            name,
            number,
            product: customerProducts
        });

  

    // Subtract product quantities by finding the products using their IDs
    for (const productOrder of customerProducts) {
        const newProduct = await Product.findOne({
            productName: productOrder.selectedProduct,
          });

        if (!newProduct) {
          return res.status(404).json({ msg: "Product not found", product: `${newProduct}` });
        }
  
        const quantity = parseInt(productOrder.quantity, 10);
        if (newProduct.stock < quantity) {
          return res
            .status(400)
            .json({ msg: `Only ${newProduct.stock} ${newProduct.productName} stock available.` });
        }
  
        newProduct.stock -= quantity;
        await newProduct.save();
       
      }

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
          selectedProduct: item.selectedProduct || productName,
          productPrice: item.productPrice,
          quantity: item.quantity,
          id: item._id
        };
      }) : product;

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