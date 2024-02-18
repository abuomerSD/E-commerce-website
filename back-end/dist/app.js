"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const adminRoute_1 = require("./routes/adminRoute");
const logger_1 = require("./middlewares/logger");
const app = (0, express_1.default)();
(0, dotenv_1.config)();
const port = process.env.PORT || 3000;
// Request logger middleware for Debuging
app.use(logger_1.logger);
// to be sure that the application will accept json
app.use(express_1.default.json());
app.use('/admin', adminRoute_1.adminRouter);
app.listen(port, () => {
    console.log(`server is listening to port : ${port}`);
});
