const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error.message);
  });

const productSchema = new mongoose.Schema({
  productName: String,
  price: Number,
  description: String,
  quantity: Number
});

const Product = mongoose.model("Product", productSchema);



//post
app.post("/api/v1/products", async (req, res) => {
  try {
    const productReq = req.body;

    const product = await Product.create(productReq);

    res.json({
      message: "Create Product",
      data: product
    });
  } catch (error) {
    res.status(500).json({
      message: "Product create failed",
      error: error.message
    });
  }
});

//get
app.get("/api/v1/products", async (req, res) => {
    const products = await Product.find();

    res.json({
        message: "Get Products",
        data: products
    })
});


//put
app.put("/api/v1/products/:id", async (req, res) => {
    const product = await 
    Product.findById(req.params.id);

    product.productName = req.body.productName;
    product.price = req.body.price;
    product.description = req.body.description;
    product.quantity = req.body.quantity;

    await product.save();

    res.json({
        message: "Update Product",
        data: product
    })
});

//delete
app.delete("/api/v1/products/:id", async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);

    res.json({
        message: "Product deleted"
    });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});