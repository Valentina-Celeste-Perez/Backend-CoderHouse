import { ProductModel } from "../../models/products.model.js";

class ProductsMongooseDao {
    async find(params) {
        const {query, page, limit, sort} = params;

        const productsDocs = await ProductModel.paginate({$and: [{status: true}, query]}, {page, sort: {price: sort}, limit});

        const { docs, ...rest } = productsDocs;

        if (!docs.length > 0) {
            throw new Error("No se pudieron encontrar productos")
        }

        return {
            payload: docs.map((doc) => ({
                id: doc._id,
                title: doc.title,
                description: doc.description,
                price: doc.price,
                thumbnails: doc.thumbnails ?? null,
                category: doc.category,
                code: doc.code,
                status: doc.status,
                stock: doc.stock
            })),
            ...rest
        };
    }

    async findOne(id) {
        const productDoc = await ProductModel.findById(id);

        if (!productDoc.status) {
            throw new Error("El producto no existe");
        }

        return {
            id: productDoc._id,
            title: productDoc.title,
            description: productDoc.description,
            price: productDoc.price,
            thumbnails: productDoc.thumbnails ?? null,
            category: productDoc.category,
            code: productDoc.code,
            status: productDoc.status,
            stock: productDoc.stock
        };
    }

    async insertOne(product) {
        const newProductDoc = new ProductModel(product);
        await newProductDoc.save();

        return true;
    }

    async update(id, update) {
        const productDoc = await ProductModel.findByIdAndUpdate(id, update, {new: true});

        return {
            id: productDoc._id,
            title: productDoc.title,
            description: productDoc.description,
            price: productDoc.price,
            thumbnails: productDoc.thumbnails ?? null,
            category: productDoc.category,
            code: productDoc.code,
            status: productDoc.status,
            stock: productDoc.stock
        };
    }

    async delete(id) {
        await ProductModel.findByIdAndUpdate(id, {status: false}, {new: true});

        return true;
    }
}

export default ProductsMongooseDao;
