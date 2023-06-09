"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductById = exports.deleteProductById = exports.createNewProduct = exports.getProductById = exports.getProduct = void 0;
const product_model_1 = require("./product.model");
function getProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { limit } = req.query;
        const { searchQuery, categoryId, categoryIds, size, color, price } = req.query;
        const filter = {};
        if (color === null || color === void 0 ? void 0 : color.length) {
            filter.color = { $in: color };
        }
        if (categoryIds === null || categoryIds === void 0 ? void 0 : categoryIds.length) {
            filter.categoryId = { $in: categoryIds };
        }
        if (size === null || size === void 0 ? void 0 : size.length) {
            filter["sizes.size"] = { $in: size };
        }
        if (searchQuery === null || searchQuery === void 0 ? void 0 : searchQuery.length) {
            const qregex = new RegExp(`${searchQuery}`, "i");
            filter["name"] = qregex;
        }
        if (categoryId === null || categoryId === void 0 ? void 0 : categoryId.length) {
            filter["$or"] = [{ subCategoryId: { $in: categoryId } }, { categoryId: { $in: categoryId } }];
        }
        if (price === null || price === void 0 ? void 0 : price.length) {
            const priceConditions = Array.isArray(price) ? price.map(parsePriceRange) : [parsePriceRange(price)];
            if (filter["$or"]) {
                const existingCondition = filter["$or"];
                filter["$and"] = [{ $or: existingCondition }, ...priceConditions];
            }
            else {
                filter["$or"] = priceConditions;
            }
        }
        const list = yield product_model_1.products.find(filter).maxTimeMS(20000).limit(Number(limit));
        res.json(list);
    });
}
exports.getProduct = getProduct;
function parsePriceRange(priceRange) {
    const [minPrice, maxPrice] = priceRange.split(" - ");
    const parsedMinPrice = priceRange && priceRange === "Over $150" ? parseInt(minPrice.split(" ")[1].substring(1), 10) : parseInt(minPrice.substring(1), 10);
    const parsedMaxPrice = priceRange && priceRange === "Over $150" ? Infinity : parseInt(maxPrice === null || maxPrice === void 0 ? void 0 : maxPrice.substring(1), 10);
    const priceCondition = {
        price: {
            $gte: isNaN(parsedMinPrice) ? 0 : parsedMinPrice,
        },
    };
    if (!isNaN(parsedMaxPrice)) {
        priceCondition.price.$lte = parsedMaxPrice;
    }
    return priceCondition;
}
function getProductById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const one = yield product_model_1.products.findById({ _id: id });
        res.json(one);
    });
}
exports.getProductById = getProductById;
function createNewProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newProduct = req.body;
        yield product_model_1.products.create(newProduct.data);
        res.sendStatus(200);
    });
}
exports.createNewProduct = createNewProduct;
function deleteProductById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        yield product_model_1.products.findByIdAndRemove({ _id: id });
        res.json({ removedId: id });
    });
}
exports.deleteProductById = deleteProductById;
function updateProductById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const updatedFields = req.body;
        yield product_model_1.products.findByIdAndUpdate({ _id: id }, updatedFields);
        res.json({ updatedId: id });
    });
}
exports.updateProductById = updateProductById;
