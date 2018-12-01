//This file makes the SQL schema of the contributions table
module.exports = (sequelize, DataTypes) => {
  const Pseudonyms = sequelize.define('pseudonym', {
    contribution: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isUUID: true,
      },
    },

    PapaBear: {
      //Foreign Key to the other table
      type: DataTypes.UUID,
      allowNull: true,
      unique: false,
      validate: {
        isUUID: true,
      },
    },

    MamaBear: {
      type: DataTypes.UUID,
      allowNUll: true,
      unique: false,
      validate: {
        isUUID: true,
      },
    },

    TeddyBear: {
      type: DataTypes.UUID,
      allowNull: true,
      unique: false,
      validate: {
        isUUID: true,
      },
    },

    GrizzlyBear: {
      type: DataTypes.UUID,
      allowNull: true,
      unique: false,
      validate: {
        isUUID: true,
      },
    },

  });

  return Pseudonyms;
}