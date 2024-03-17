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
const categoryController_1 = require("./controllers/categoryController");
let cookieParser = require('cookie-parser');
// let session = require('express-session');
// let flash = require('connect-flash');
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
// flash
// app.use(session({cookie: { maxAge: 60000 }}));
// app.use(flash());
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
app.use((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield (0, categoryController_1.getAllCategories)();
    res.render('404', { title: 'Page Not Found', categories });
}));
app.listen(port, () => {
    console.log(`server is listening to port : ${port}`);
});
