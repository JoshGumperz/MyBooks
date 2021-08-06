const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Book extends Model {}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    book_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "No Title data"
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "No Author data"
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "No Description data"
    },
    release_date: {
      type: DataTypes.STRING,
      defaultValue: "No Release_date info"
    },
    image_link: {
      type: DataTypes.TEXT,
      defaultValue: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png"

    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'book',
  }
);

module.exports = Book;