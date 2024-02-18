import {DataTypes, Model, Sequelize, UUIDV4} from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './back-end/database/database.sqlite'
  });


// initiallize the tables

function init() {
  sequelize.sync({force: true});
}

init();

// Product Table creation

export class Product extends Model {}

Product.init({
  id: {
    type :DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  productName: {
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
  },
  viewedTimes: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
}
, {
  sequelize,
  modelName: 'Product',
  timestamps: true,
});
