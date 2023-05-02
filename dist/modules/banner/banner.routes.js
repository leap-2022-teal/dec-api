"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bannerRouter = void 0;
const express_1 = require("express");
const banner_controller_1 = require("./banner.controller");
const router = (0, express_1.Router)();
router.get("/", banner_controller_1.getBanner);
router.get("/:id", banner_controller_1.getBannerById);
router.post("/:id", banner_controller_1.createNewBanner);
router.delete("/:id", banner_controller_1.deleteBannerById);
router.put("/:id", banner_controller_1.updateBannerById);
exports.bannerRouter = router;
