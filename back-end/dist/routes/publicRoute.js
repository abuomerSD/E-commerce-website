"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicRouter = void 0;
const express_1 = require("express");
const publicController_1 = require("../controllers/publicController");
exports.publicRouter = (0, express_1.Router)();
exports.publicRouter.route('/')
    .get(publicController_1.renderPublicHomePage);
