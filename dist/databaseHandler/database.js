"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Product = exports.Category = void 0;
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('ecommerce-website', 'asdf', '', {
    host: 'localhost',
    dialect: 'postgres',
    timezone: '+02:00',
    dialectOptions: {
        useUTC: false
    },
});
// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: './back-end/db/database.sqlite',
// });
// initiallize the tables
function init() {
    // sequelize.sync({alter: true});
    sequelize.sync({ force: true });
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
// Users table creation
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize_1.UUIDV4
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: 'user',
    },
    isActive: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    sequelize,
    modelName: 'User',
});
// Relationships 
Category.hasMany(Product, {
    foreignKey: 'categoryId'
});
Product.belongsTo(Category);
// invoice tables
class salesInvoiceHead extends sequelize_1.Model {
}
salesInvoiceHead.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    total: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'SalesInvoiceHead',
});
class salesInvoiceDetails extends sequelize_1.Model {
}
salesInvoiceDetails.init({
    // invoiceHeadId:{
    //   type: DataTypes.BIGINT,
    //   allowNull: false,
    // },
    productId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    productName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    productQty: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
    },
    productPrice: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
    },
    productTotal: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'SalesInvoiceDetails'
});
// Relationships 
salesInvoiceHead.hasMany(salesInvoiceDetails, {
    foreignKey: 'salesInvoiceHeadId'
});
salesInvoiceDetails.belongsTo(salesInvoiceHead);
// cart tables
class cartHead extends sequelize_1.Model {
}
cartHead.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    total: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'CartHead',
});
class cartDetails extends sequelize_1.Model {
}
cartDetails.init({
    // invoiceHeadId:{
    //   type: DataTypes.BIGINT,
    //   allowNull: false,
    // },
    productId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    productName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    productQty: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
    },
    productPrice: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
    },
    productTotal: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'CartDetails'
});
// Relationships 
cartHead.hasMany(cartDetails, {
    foreignKey: 'salesInvoiceHeadId'
});
cartDetails.belongsTo(cartHead);
