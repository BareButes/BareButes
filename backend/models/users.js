const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    //User_id that will be used for individual contributions
    //TODO: tell postgres to generate unique uuid
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isUUID: true, //sequelize validation for uuid
      },
    },
    //Username column
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isAlphanumeric: true,
      },
    },
    //The fullName column
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true, // sequelize validation
      },
    },
    password_hash: {
      type: DataTypes.STRING,
    },
    //the dynamic array linking to contribution table
    contributions: {
      type: DataTypes.ARRAY(DataTypes.INTEGER.UNSIGNED),
      allowNull: true, //may start with no contribs
      validate: {
        isArray: true,
      },
    },
  });

  // this is a Sequelize lifecycle hook
  User.beforeCreate((user) =>
      new sequelize.Promise((resolve) => {
        bcrypt.hash(user.password_hash, null, null, (err, hashedPassword) => {
          resolve(hashedPassword);
        });
      }).then((hashedPw) => {
        user.password_hash = hashedPw;
      })
    );

  return User;
}