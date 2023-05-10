import express from "express";
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import { connectDB } from "./db.config.js";

const app = express();

void (async () => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use("/api/products", productsRouter);
    app.use("/api/carts", cartRouter);

    await connectDB();

    app.listen(8080, () => {
        console.log("Listening on port 8080");
    });
})(); 
