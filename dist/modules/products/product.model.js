"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.products = exports.productsScema = void 0;
const mongoose_1 = require("mongoose");
exports.productsScema = new mongoose_1.Schema({
    name: { type: String },
    color: { type: String },
    image: [
        {
            path: { type: String, default: "" },
            width: { type: Number, default: 0 },
            height: { type: Number, default: 0 },
        },
    ],
    sizes: [{ size: Number, stock: Number }, { nullable: true }],
    details: { type: String },
    brand: { type: String, nullable: true },
    price: { type: Number },
    categoryId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Category" },
    subCategoryId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Category" },
});
exports.products = (0, mongoose_1.model)("Products", exports.productsScema);
