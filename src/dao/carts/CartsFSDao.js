import fs from "fs/promises";
import { resolve } from "path";

class CartsFSDao {
    #carts;
    #autoID;
    #path = resolve("src/data/carts.json");

    async get() {
        try {
            const carts = await fs.readFile(this.#path, 'utf-8');

            return JSON.parse(carts);

        } catch (err) {
            console.log(`Sorry, your file ${this.#path} doesn't exist. It will be created now...`);
            await fs.writeFile(this.#path, '[]');

            return [];
        }
    }

    async getData() {
        this.#carts = await this.getCarts();

        if (this.#carts.length > 0) {
            this.#autoID = this.#carts.length + 1;
        } else {
            this.#autoID = 1;
        }
    }

    async add() {
        await this.getData();

        const cart = {id: this.#autoID, products: []}
        
        this.#carts.push(cart);
        this.#autoID++;
        await fs.writeFile(this.#path, JSON.stringify(this.#carts, null, 2));
    }

    async getOne(id) {
        await this.getData();

        const cart = this.#carts.find(cart => cart.id === id);

        if (!cart) {
            throw new Error("Cart not found");
        }

        return cart.products;
    }

    async addProduct(CartId, productId) {
        await this.getData();

        const cart = this.#carts.find(cart => cart.id === CartId);

        if (!cart) {
            throw new Error("Cart not found");
        }

        const isInArray = cart.products.find(product => product.id === productId); 

        if (!(isInArray)) {
            cart.products = [...cart.products, {id: productId, quantity: 1}];
        } else {
            isInArray.quantity++;
        }

        await fs.writeFile(this.#path, JSON.stringify(this.#carts, null, 2));
    }
}

export default CartsFSDao;
