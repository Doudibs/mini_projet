'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Project.init({
    nom: DataTypes.STRING,
    description: DataTypes.TEXT,
    dateCreation: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};