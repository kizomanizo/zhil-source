'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Person extends Model {
        static associate(models) {
            Person.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' })
        }
    }
    Person.init({
        id: { primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
        mobilephone: DataTypes.STRING,
        user_id: DataTypes.UUID,
        created_by: DataTypes.UUID,
        updated_by: DataTypes.UUID,
    }, {
        sequelize,
        modelName: 'Person',
        tableName: 'people',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
  })
  return Person
}