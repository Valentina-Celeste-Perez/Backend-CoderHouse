import { nanoid } from "nanoid";
import ProductsMongooseDao from "../dao/products/ProductsMongooseDao.js";

class ProductManager {
    #dao = new ProductsMongooseDao();

    async getAll(params) {
        try {
            const isLimit = +params.limit > 0 ? +params.limit : 8;
            const isQuery = {}
            if (params.query) {
                const arr = params.query.split(":");
                isQuery[arr[0]] = JSON.parse(arr[1]);
            }
            const isPage = +params.page > 0 ? +params.page : 1;
            const isSort = params.sort === "asc" || params.sort === "desc" ? params.sort : 1;
            const validateParams = {query: isQuery, limit: isLimit, page: isPage, sort: isSort}
            return this.#dao.find(validateParams); 
        } catch (err) {
            throw new Error(err);
        }
    }

    async getOne(id) {
        try {
            return this.#dao.findOne(id);
        } catch (err) {
            throw new Error(err);
        }

    }

    async addOne(data) {
        try {
            const product = {...data, code: nanoid(13)}
            return this.#dao.insertOne(product);
        } catch (err) {
            throw new Error(err); 
        }
    }

    async updateOne(id, update) {
        try {
            return this.#dao.update(id, update);
        } catch (err) {
            throw new Error(err); 
        }
    }

    async deleteOne(id) {
        try {
            return this.#dao.delete(id);
        } catch (err) {
            throw new Error(err)
        }
    }
}

export default ProductManager;
