'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Discount extends Model {
        static associate(models) {
            Discount.belongsToMany(models.Order, {
                as:'orders',
                through: 'order_discounts',
                foreignKey: 'discount_id',
                otherKey: 'order_id',
                onDelete: 'CASCADE'
            })
        }
    }
    Discount.init({
        id: { primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
        name: DataTypes.STRING,
        status: DataTypes.BOOLEAN,
        created_by: DataTypes.UUID,
        updated_by: DataTypes.UUID
    }, {
        sequelize,
        modelName: 'Discount',
        tableName: 'discounts',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    })
    return Discount
};