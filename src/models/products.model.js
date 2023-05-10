import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productCollection = "products";

const ProductSchema = new Schema({
    title: {
        type: Schema.Types.String,
        required: [true, 'Title is required']
    },
    description: {
        type: Schema.Types.String,
        required: [true, 'Description is required']
    },
    code: {
        type: Schema.Types.String,
        required: [true, 'Product code is required'],
        unique: true,
    },
    price: {
        type: Schema.Types.Number,
        required: [true, 'Price is required']
    },
    status: {
        type: Schema.Types.Boolean,
        default: true
    },
    stock: {
        type: Schema.Types.Number,
        required: [true, "Stock is required"]
    },
    category: {
        type: Schema.Types.String,
        required: [true, 'Category is required']
    },
    thumbnails: {
        type: Schema.Types.String
    }
});

ProductSchema.plugin(mongoosePaginate);

export const ProductModel = model(productCollection, ProductSchema);
