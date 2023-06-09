"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesRouter = void 0;
const express_1 = require("express");
const category_controller_1 = require("./category.controller");
const router = (0, express_1.Router)();
router.get("/", category_controller_1.getCategory);
router.get("/:id", category_controller_1.getCategoryById);
router.post("/", category_controller_1.createNewCategory);
router.delete("/:id", category_controller_1.deleteCategoryById);
router.put("/:id", category_controller_1.updateCategoryById);
exports.categoriesRouter = router;
