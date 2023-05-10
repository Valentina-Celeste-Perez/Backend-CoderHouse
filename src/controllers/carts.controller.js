import CartManager from "../managers/CartManager.js";
import ProductManager from "../managers/ProductManager.js";

class CartsController {
    static getOne = async (req, res) => {
        try {
            const manager = new CartManager();
            const { cid } = req.params;
            const result = await manager.getOne(cid);
            res.status(200).send({status: "success", data: result});
        } catch (err) {
            res.status(400).send({status: "error", error: err.message});
        }
    }

    static post = async (req, res) => {
        try {
            const manager = new CartManager();
            const result = await manager.addOne();
            res.status(200).send({status: "success", message: "El carrito ha sido creado exitosamente", data: result});
        } catch (err) {
            res.status(400).send({status: "error", error: err.message});
        }
    }

    static postOne = async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const cartManager = new CartManager();
            const productManager = new ProductManager();
            await productManager.getOne(pid);
            const result = await cartManager.addProduct(cid, pid);
            res.status(200).send({status: "success", message: "El producto ha sido agregado al carrito exitosamente", data: result});
        } catch (err) {
            res.status(400).send({status: "error", error: err.message});
        }
    }

    static put = async (req, res) => {
        try {
            const { cid } = req.params;
            const {products: update} = req.body;
            const manager = new CartManager();
            const result = await manager.updateOne(cid, update);
            res.status(200).send({status: "success", message: "El carrito ha sido actualizado exitosamente", data: result});
        } catch (err) {
            res.status(400).send({status: "error", error: err.message});
        }
    }

    static putOne = async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const {quantity: update} = req.body;
            const cartManager = new CartManager();
            const productManager = new ProductManager();
            await productManager.getOne(pid);
            const result = await cartManager.updateProduct(cid, pid, +update);
            res.status(200).send({status: "success", message: "El producto del carrito ha sido actualizado exitosamente", data: result});
        } catch (err) {
            res.status(400).send({status: "error", error: err.message});
        }
    }

    static delete = async (req, res) => {
        try {
            const { cid } = req.params;
            const manager = new CartManager();
            await manager.deleteOne(cid);
            res.status(200).send({status: "success", message: "El carrito ha sido eliminado exitosamente"});
        } catch (err) {
            res.status(400).send({status: "error", error: err.message});
        }
    }

    static deleteOne = async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const cartManager = new CartManager();
            const productManager = new ProductManager();
            await productManager.getOne(pid);
            const result = await cartManager.deleteProduct(cid, pid);
            res.status(200).send({status: "success", message: "El producto del carrito ha sido eliminado exitosamente", data: result});
        } catch (err) {
            throw new Error(err);
        }
    }

}

export default CartsController;
