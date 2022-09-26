'use strict'

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('items', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            name: {
                type: Sequelize.STRING,
                required: [true, "Item name is required"]
            },
            description: {
                type: Sequelize.STRING,
                required: false,
                defaultValue: "Item description"
            },
            batch_number: {
                type: Sequelize.STRING,
                required: false,
                allowNull: true
            },
            purchase_date: {
                allowNull: false,
                type: Sequelize.DATE
            },
            expiry_date: {
                allowNull: false,
                type: Sequelize.DATE
            },
            buying_price: {
                type: Sequelize.INTEGER,
                required: [true, "Buying price must be specified"],
            },
            selling_price: {
                type: Sequelize.INTEGER,
                required: [true, "Selling price must be specified"],
            },
            status: {
                type: Sequelize.BOOLEAN,
                required: false,
                defaultValue: false
            },
            created_by: {
                type: Sequelize.UUID,
                required: true
            },
            updated_by: {
                type: Sequelize.UUID,
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                type: Sequelize.DATE
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('items')
    }
}