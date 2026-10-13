import productsModel from "../Models/products.model.js";


const CreatProduct = async (req, res) => {
      try {
    const productReq = req.body;

    const product = await productsModel.create(productReq);

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

}

const getProducts = async (req, res) => {
        const products = await productsModel.find();

    res.json({
        message: "Get Products",
        data: products
    })

}

const updateProducts = async (req, res) => {
        const product = await 
    productsModel.findById(req.params.id);

    product.productName = req.body.productName;
    product.price = req.body.price;
    product.description = req.body.description;
    product.quantity = req.body.quantity;

    await product.save();

    res.json({
        message: "Update Product",
        data: product
    })
}

const DeleteProduct = async (req,res) => {
       await productsModel.findByIdAndDelete(req.params.id);

    res.json({
        message: "Product deleted"
    });
}



export default {
    CreatProduct,
    getProducts,
    updateProducts,
    DeleteProduct
}