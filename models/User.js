'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasOne(models.Person, { as: 'person', foreignKey: 'user_id', onDelete: 'CASCADE', hooks: true })
            User.belongsTo(models.Level, { as: 'level', foreignKey: 'level_id' })
        }
    }
    User.init({
        id: { primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        salt_rounds: DataTypes.INTEGER,
        join_date: DataTypes.DATE,
        last_login: DataTypes.DATE,
        token_expiry: DataTypes.DATE,
        status: DataTypes.BOOLEAN,
        level_id: DataTypes.UUID,
        created_by: DataTypes.UUID,
        updated_by: DataTypes.UUID,
        }, {
            sequelize,
            modelName: 'User',
            tableName: 'users',
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        })
    return User
}