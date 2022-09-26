'use strict'

const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Level extends Model {
        static associate(models) {
            Level.hasMany(models.User, { as: 'users', foreignKey: 'level_id', onDelete: 'RESTRICT', hooks: true })
        }
    }
    Level.init({
        id: { primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        access: DataTypes.STRING,
        status: DataTypes.BOOLEAN,
        created_by: DataTypes.UUID,
        updated_by: DataTypes.UUID,
    }, {
        sequelize,
        modelName: 'Level',
        tableName: 'levels',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    })
    return Level
}