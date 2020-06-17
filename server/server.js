const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

//USERS API
const users = require("./api/users");
const brands = require("./api/brands");
const categories = require("./api/categories");
const products = require("./api/products");

//Config node
const app = express();

//DB config
const db = require("./config/keys").mongoURI;

//Body parser middleware for req.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// Connect to mongoDb
mongoose
  .connect(db, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDb connected"))
  .catch((err) => console.log(err));

//Config PORT 5000
const port = process.env.PORT || 5000;

//Use Routes
//note
app.use("/api/users", users);
app.use("/api/product", brands);
app.use("/api/product", categories);
app.use("/api/product", products);

//Server static assets if in production
if (process.env.NODE_ENV === "production") {
  const path = require("path");
  //Set static folder
  app.use(express.static("client/build"));
  //any route that get hit load this
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

//see what up up
app.listen(port, () => console.log(`server running on port ${port}`));
