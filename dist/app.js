"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const adminRoute_1 = require("./routes/adminRoute");
const logger_1 = require("./middlewares/logger");
const errorHandler_1 = require("./middlewares/errorHandler");
const body_parser_1 = __importDefault(require("body-parser"));
const publicRoute_1 = require("./routes/publicRoute");
const isUser_1 = require("./middlewares/isUser");
var cookieParser = require('cookie-parser');
const app = (0, express_1.default)();
(0, dotenv_1.config)();
const port = process.env.PORT || 3000;
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express_1.default.static('public'));
app.use(express_1.default.static('uploads'));
app.set('view engine', 'ejs');
// Request logger middleware for Debuging
app.use(logger_1.logger);
// cookie parser
app.use(cookieParser());
// is user middleware 
app.use(isUser_1.isUser);
// to be sure that the application will accept json
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
// custom error handler 
app.use(errorHandler_1.errorHandler);
// handle public routes
app.get('/', (req, res) => {
    res.redirect('/shop');
});
app.use('/shop', publicRoute_1.publicRouter);
// handle private routes
app.use('/admin', adminRoute_1.adminRouter);
// handle public products route 
// app.use('/products', publicProductsRoute);
// handle categories products route 
// app.use('/categories', publicCategoriesRoute);
// handle 404 page
app.use((req, res) => {
    res.render('404', { title: 'Page Not Found' });
});
app.listen(port, () => {
    console.log(`server is listening to port : ${port}`);
});
