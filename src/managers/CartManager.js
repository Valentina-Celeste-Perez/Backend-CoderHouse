import CartsMongooseDao from "../dao/carts/CartsMongooseDao.js";

class CartManager {
    #dao = new CartsMongooseDao()

    async getOne(id) {
        try {
            return this.#dao.findOne(id);
        } catch (err) {
            throw new Error(err); 
        }
    }

    async addOne() {
        try {
            return this.#dao.save();
        } catch (err) {
            throw new Error(err);
        }

    }

    async addProduct(cid, pid) {
        try {
            return this.#dao.insertOne(cid, pid);
        } catch (err) {
            throw new Error(err);
        }
    }

    async updateOne(cid, update) {
        try {
            return this.#dao.update(cid, update);
        } catch (err) {
            throw new Error(err); 
        }
    }

    async updateProduct(cid, pid, update) {
        try {
            return this.#dao.updateOne(cid, pid, update);
        } catch (err) {
            throw new Error(err); 
        }
    }

    async deleteOne(cid) {
        try {
            return this.#dao.remove(cid);
        } catch (err) {
            throw new Error(err); 
        }
    }

    async deleteProduct(cid, pid) {
        try {
            return this.#dao.removeOne(cid, pid);
        } catch (err) {
            throw new Error(err); 
        }
    }
}

export default CartManager;
