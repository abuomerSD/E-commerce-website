
import { DataTypes, Model, Sequelize, UUIDV4 } from 'sequelize';

const sequelize = new Sequelize('ecommerce-website', 'asdf', '',{
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
  // sequelize.sync({force: true});
}

init();

// Category table creation
export class Category extends Model {
  declare name: string;
  declare Products: Array<Product>;
}
Category.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  }
},
{
  sequelize,
  modelName: 'Category'
});

// Product Table creation

export class Product extends Model {
  declare name: string;
  declare viewedTimes: bigint;
  declare saledTimes: bigint;
}


Product.init({
  id: {
    type :DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  name: {
    type :DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  quantity: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  cost: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  image: {
    type : DataTypes.STRING,
    allowNull: false,
  },
  saledTimes: {
    type: DataTypes.BIGINT,
    allowNull: true,
    defaultValue: 0,
  },
  viewedTimes: {
    type: DataTypes.BIGINT,
    allowNull: true,
    defaultValue: 0,
  },
}
, {
  sequelize,
  modelName: 'Product',
});

// Users table creation
export class User extends Model{
  declare id: string;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare username: string;
  declare password: string;
  declare role: string;
  declare isActive: boolean;
}

User.init({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user',
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  sequelize,
  modelName: 'User',
})

// Relationships 

Category.hasMany(Product, {
  foreignKey: 'categoryId'
});
Product.belongsTo(Category);



// invoice tables

class salesInvoiceHead extends Model {
  declare id: bigint;
  declare date: Date;
  declare userId: string;
  declare total: number;
}

salesInvoiceHead.init({
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  total: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  }
}, 
{
  sequelize,
  modelName: 'SalesInvoiceHead',
});

class salesInvoiceDetails extends Model {
  declare invoiceHeadId: number;
  declare productId: string;
  declare productName: string;
  declare productQty: number;
  declare productPrice: number;
  declare productTotal: number;
}

salesInvoiceDetails.init({
  // invoiceHeadId:{
  //   type: DataTypes.BIGINT,
  //   allowNull: false,
  // },
  productId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  productQty: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  productPrice: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  productTotal: {
    type: DataTypes.DOUBLE,
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

class CartHead extends Model {
  declare id: bigint;
  declare date: Date;
  declare userId: string;
  declare total: number;
}

CartHead.init({
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  total: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  }
}, 
{
  sequelize,
  modelName: 'CartHead',
});

export class CartDetails extends Model {
  declare invoiceHeadId: number;
  declare productId: string;
  declare productName: string;
  declare productQty: number;
  declare productPrice: number;
  declare productTotal: number;
}

CartDetails.init({
  // invoiceHeadId:{
  //   type: DataTypes.BIGINT,
  //   allowNull: false,
  // },
  productId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  productQty: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  productPrice: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  productTotal: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'CartDetails'
});

// Relationships 

CartHead.hasMany(CartDetails, {
  foreignKey: 'salesInvoiceHeadId'
});
CartDetails.belongsTo(CartHead);