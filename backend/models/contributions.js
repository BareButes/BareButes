const bcrypt = require('bcrypt-nodejs');
const User = require(`./users.js`);

module.exports = (sequelize, DataTypes) => {
  const Contribution = sequelize.define('user', {
    //bute_id that will be used for individual contributions
    //TODO: tell postgres to generate unique uuid
    bute_id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isUUID: true, //sequelize validation for uuid
      },
    },
    data: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        notEmpty: true,
      },
    },
    // author: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   unique: true,
    //   validate: {
    //     notEmpty: true,
    //     isEmail: true, // sequelize validation
    //   },
    // },
    //the dynamic array linking to contribution table
    prev_versions: {
      type: Contribution,
      allowNull: true, //may be init_bute
      validate: {
        isArray: true,
      },
    },
    date_and_time: {
      type: DataTypes.DATE,
    },
    reviewers: {
      type: DataTypes.STRING,
    },
  });

Contribution.belongsTo(User);