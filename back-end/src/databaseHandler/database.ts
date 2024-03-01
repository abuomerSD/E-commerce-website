import {DataTypes, Model, Sequelize, UUIDV4} from 'sequelize';

const sequelize = new Sequelize('ecommerce-website', 'asdf', '',{
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
  sequelize.sync();
  // sequelize.sync({force: true});
}

init();

// Category table creation
export class Category extends Model {}
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

export class Product extends Model {}


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

// Relationships 

// Category.hasOne(Product);
Product.belongsTo(Category,{
  foreignKey: 'categoryId'
});

