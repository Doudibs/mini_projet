'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tache extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tache.belongsTo(models.Project, {
        foreignKey: 'project_id',
        as: 'project'
      })
    }
  }
  Tache.init({
    titre: DataTypes.STRING,
    statut: DataTypes.STRING,
    project_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tache',
  });
  return Tache;
};