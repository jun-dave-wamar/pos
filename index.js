const express = require("express")
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const connection = require("./db");

connection();

//Import Controllers
const {login, register, getUsers, logout} = require("./api/controllers/User");
const {getProduct, postProduct} = require("./api/controllers/Product");
const {getCustomer, postCustomer} = require("./api/controllers/Customer");

const corsOptions = {
  //origin: ["http://localhost:3001", "http://localhost:3000"],
   origin: ["https://snack.expo.dev/@jundavewamar/pos", "https://snack.expo.dev/@jundavewamar/pos/","https://snack.expo.dev/@jundavewamar", "https://snack.expo.dev/"],
   method: ["GET", "POST", "PATCH", "PUT", "HEAD", "OPTIONS"],
   credentials: true,
};

//Middlewares
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json())


//Middleware Authentication
const {validateToken} = require("./middleware/auth");

//Routes
app.post("/api/login", login);
app.post("/api/register", register);
app.post("/api/products", postProduct);
app.post("/api/customer", postCustomer);

app.get("/api/customer", getCustomer);
app.get("/api/products", getProduct);
app.get("/api/logout", logout);
app.get("/api/users", validateToken, getUsers);

app.get("/", async (req, res) => {
  res.json({
    message: "Please contact Jun Dave Wamar for authorization",
    Contact: "jundavewamar@gmail.com",
  });

  
});

app.listen(3001, ()=>{
    console.log("Server listening on port 3001")
})