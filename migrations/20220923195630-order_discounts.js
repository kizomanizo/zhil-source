'use strict'

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('order_discounts', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            discount_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                  model: 'discounts',
                  key: 'id'
                }
            },
            order_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                  model: 'orders',
                  key: 'id'
                }
            },
            status: {
                type: Sequelize.BOOLEAN,
                required: false,
                defaultValue: false
            },
            rate: {
                type: Sequelize.FLOAT,
                required: false,
                allowNull: true
            },
            reason: {
                type: Sequelize.STRING,
                required: false,
                allowNull: true
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
        await queryInterface.dropTable('order_discounts')
    }
}