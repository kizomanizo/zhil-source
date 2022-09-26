'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Item extends Model {
        static associate(models) {
            Item.belongsToMany(models.Order, {
                as:'orders',
                through: 'order_items',
                foreignKey: 'item_id',
                otherKey: 'order_id'
            })
        }
    }
    Item.init({
        id: { primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        batch_number: DataTypes.STRING,
        purchase_date: DataTypes.DATE,
        expiry_date: DataTypes.DATE,
        buying_price: DataTypes.INTEGER,
        selling_price: DataTypes.INTEGER,
        status: DataTypes.BOOLEAN,
        created_by: DataTypes.UUID,
        updated_by: DataTypes.UUID
    }, {
        sequelize,
        modelName: 'Item',
        tableName: 'items',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    })
    return Item
};