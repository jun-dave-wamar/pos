const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const cookieParser = require('cookie-parser');

const corsOptions = {
    origin: ["http://localhost:3001", "http://localhost:3000"],
    // origin: [""],
     method: ["GET", "POST", "PATCH", "PUT", "HEAD", "OPTIONS"],
     credentials: true,
};

//Import Controllers
const {login, register, getUsers, logout} = require("./controllers/User");
const { getProduct, postProduct } = require("./controllers/Product");


//Middlewares handle HTTP request
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

//Middleware Authentication
const {validateToken} =  require("./middleware/auth");

//Routes
app.post("/api/login", login);
app.post("/api/register", register);
app.get("/api/logout", logout);


app.get("/api/users", validateToken, getUsers);
app.get("/api/product", validateToken, getProduct);
app.post("/api/product", validateToken, postProduct);



app.listen(process.env.PORT, ()=>{
    console.log("Server running on port: " + process.env.PORT)
})
