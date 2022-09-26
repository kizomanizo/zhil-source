'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            Order.belongsToMany(models.Item, {
                as:'items',
                through: 'order_items',
                foreignKey: 'order_id',
                otherKey: 'item_id',
                onDelete: 'CASCADE'
            }),
            Order.belongsToMany(models.Discount, {
                as:'discounts',
                through: 'order_discounts',
                foreignKey: 'order_id',
                otherKey: 'discount_id',
                onDelete: 'CASCADE'
            })
        }
    }
    Order.init({
        id: { primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
        order_date: DataTypes.DATE,
        status: DataTypes.BOOLEAN,
        created_by: DataTypes.UUID,
        updated_by: DataTypes.UUID
    }, {
        sequelize,
        modelName: 'Order',
        tableName: 'orders',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    })
    return Order
};