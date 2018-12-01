const Contribution = require('./contributions.js');
const Translation = require ('./translation.js');
const Comment = require('./comments.js');

module.exports = (sequelize, DataTypes) => {
  const Discussion = sequelize.define('discussion', {
  });
  
  //Discussion has one contribution
  Discussion.hasOne(Contribution, {as: 'Contribution', foreignKey: 'contrib_id'});
  //Discussion has many comments
  Discussion.hasMany(Comment, {as: 'Comments'});
  //Discussion has one translation table
  Discussion.hasOne(Translation, {as: 'Pseudonym', foreignKey: 'transTableId'});
  
  return Discussion;
}

