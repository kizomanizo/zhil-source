'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class OrderItem extends Model {
        static associate(models) {
        }
    }
    OrderItem.init({
        id: { primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
        quantity: DataTypes.INTEGER,
        payment: DataTypes.INTEGER,
        order_id: DataTypes.UUID,
        item_id: DataTypes.UUID,
        created_by: DataTypes.UUID,
        updated_by: DataTypes.UUID
    }, {
        sequelize,
        modelName: 'OrderItem',
        tableName: 'order_items',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    })
  return OrderItem
}