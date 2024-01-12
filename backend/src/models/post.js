'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        sourceKey: 'id',
        as: 'user',
      });
    }
  }
  Post.init(
    {
      userId: DataTypes.NUMBER,
      postContent: DataTypes.STRING,
      likeCount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Post',
      tableName: 'posts',
      timestamps: true,
      createdAt: 'timeStamp',
      updatedAt: false,
    },
  );
  return Post;
};
