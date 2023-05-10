import ProductManager from "../managers/ProductManager.js";

class ProductsController {
    static get = async (req, res) => {
        try {
            const manager = new ProductManager();
            const params = req.query;
            const result = await manager.getAll(params);
            res.status(200).send({status: "success", data: result});
        } catch (err) {
            res.status(500).send({status: 'error', error: err.message});
        }
    }

    static getOne = async (req, res) => {
        try {
            const manager = new ProductManager();
            const { pid } = req.params;
            const result = await manager.getOne(pid);
            res.status(200).send({data: result});
        } catch(err) {
            res.status(404).send({status: 'error', error: err.message});
        }
    }

    static post = async (req, res) => {
        try {
            const manager = new ProductManager();
            const product = req.body;
            await manager.addOne(product);
            res.status(200).send({status: 'success', message: 'El producto ha sido creado exitosamente'})
        } catch(err) {
            res.status(400).send({status: 'error', error: err.message});
        }
    }

    static put = async (req, res) => {
        try {
            const manager = new ProductManager();
            const { pid } = req.params;
            const { id, ...update} = req.body;
            const result = await manager.updateOne(pid, update);
            res.status(200).send({status: "success", message: "El producto ha sido actualizado exitosamente", data: result});
        } catch (err) {
            res.status(400).send({status: "error", error: err.message});
        }
    }

    static delete = async (req, res) => {
        try {
            const manager = new ProductManager();
            const { pid } = req.params;
            await manager.deleteOne(pid);
            res.status(200).send({status: "success", message: "El producto ha sido eliminado exitosamente"});
        } catch (err) {
            res.status(400).send({status: "error", error: err.message});
        }
    }
}

export default ProductsController;
