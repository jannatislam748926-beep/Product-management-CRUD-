import { Router } from "express";

import productsController from "../Controllers/products.controller.js";
 
const route = Router();

route.post ("/product/create", productsController.CreatProduct);
route.get ("/product/get", productsController.getProducts);
route.put("/product/update/:id", productsController.updateProducts);
route.delete("/product/delete/:id", productsController.DeleteProduct);

export default route;
