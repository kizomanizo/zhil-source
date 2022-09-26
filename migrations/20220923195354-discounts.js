'use strict'

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('discounts', {
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
            status: {
                type: Sequelize.BOOLEAN,
                required: false,
                defaultValue: true
            },
            created_by: {
                type: Sequelize.UUID,
                required: true
            },
            updated_by: {
                type: Sequelize.UUID,
                allowNull: true
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
        await queryInterface.dropTable('discounts')
    }
}