import { Router } from "express";
import ProductsController from "../controllers/products.controller.js";

const productsRouter = Router();

productsRouter.get("/", ProductsController.get);

productsRouter.get("/:pid", ProductsController.getOne);

productsRouter.post("/", ProductsController.post);

productsRouter.put("/:pid", ProductsController.put);

productsRouter.delete("/:pid", ProductsController.delete);

export default productsRouter;
