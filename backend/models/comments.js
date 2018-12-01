const User = require('./users.js');
const Discussion = require ('./discussions.js');
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('comment', {
    comment_id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isUUID: true,
      },
    },

    comment_text: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        notEmpty: true,
        isSTRING: true,
      },
    },

    timestamp: {
      type: DataTypes.DATE,
      allowNUll: false,
    },
  });

  Comment.belongsTo(User, {as: 'Maker'});
  Comment.belongsTo(Discussion, {as: 'Convo'});

  return Comment;
}