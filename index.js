const express = require("express")
const cors = require("cors");
const app = express();


const corsOptions = {
    //origin: ["http://localhost:3001", "http://localhost:3000"],
    origin: ["https://snack.expo.dev"],
     method: ["GET", "POST", "PATCH", "PUT", "HEAD", "OPTIONS"],
     credentials: true,
};

//Middlewares
app.use(cors(corsOptions));
app.use(express.json())
const {validateToken} = require("./middleware/auth");


const {login, register, getUsers, logout} = require("./api/controllers/User");
const {getProduct, postProduct} = require("./api/controllers/Product");

app.post("/api/login", login);
app.post("/api/register", register);
app.post("/api/products", validateToken, postProduct);

app.get("/api/products", validateToken, getProduct);
app.get("/api/logout", logout);
app.get("/api/users", validateToken, getUsers);

app.get("/", async (req, res) => {
    res.json({
      message: "Please contact Jun Dave Wamar for authorization",
      Contact: "jundavewamar@gmail.com",
    });
  });

app.listen(3001, ()=>{
    console.log("Server listening on port 3001 ")
})