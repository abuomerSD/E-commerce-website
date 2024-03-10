
import {DataTypes, Model, Sequelize, UUIDV4} from 'sequelize';

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
  sequelize.sync({alter: true});
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
export class User extends Model{}

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



