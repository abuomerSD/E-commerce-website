"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const adminRoute_1 = require("./routes/adminRoute");
const app = (0, express_1.default)();
(0, dotenv_1.config)();
const port = process.env.PORT || 3000;
app.use('/admin', adminRoute_1.adminRouter);
app.listen(port, () => {
    console.log(`server is listening to port : ${port}`);
});
