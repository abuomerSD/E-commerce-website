"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = exports.Category = void 0;
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('ecommerce-website', 'asdf', '', {
    host: 'localhost',
    dialect: 'postgres',
    timezone: '+02:00',
    dialectOptions: {
        useUTC: false //for reading from database
    },
});
// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: './back-end/database/database.sqlite',
// });
// initiallize the tables
function init() {
    // sequelize.sync();
    // sequelize.sync({force: true});
}
init();
// Category table creation
class Category extends sequelize_1.Model {
}
exports.Category = Category;
Category.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_1.UUIDV4,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
}, {
    sequelize,
    modelName: 'Category'
});
// Product Table creation
class Product extends sequelize_1.Model {
}
exports.Product = Product;
Product.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize_1.UUIDV4,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    quantity: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
    },
    cost: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    saledTimes: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: true,
        defaultValue: 0,
    },
    viewedTimes: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: true,
        defaultValue: 0,
    },
}, {
    sequelize,
    modelName: 'Product',
});
// Relationships 
// Category.hasOne(Product);
Product.belongsTo(Category, {
    foreignKey: 'categoryId'
});