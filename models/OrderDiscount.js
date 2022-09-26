'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class OrderDiscount extends Model {
        static associate(models) {
        }
    }
    OrderDiscount.init({
        id: { primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
        rate: DataTypes.FLOAT,
        reason: DataTypes.STRING,
        order_id: DataTypes.UUID,
        discount_id: DataTypes.UUID,
        created_by: DataTypes.UUID,
        updated_by: DataTypes.UUID
    }, {
        sequelize,
        modelName: 'OrderDiscount',
        tableName: 'order_discounts',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    })
  return OrderDiscount
}