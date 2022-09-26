'use strict'

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('levels', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            name: {
                type: Sequelize.STRING,
                required: [true, "Level name is required"]
            },
            description: {
                type: Sequelize.TEXT,
                required: false,
                defaultValue: "Level description"
            },
            access: {
                type: Sequelize.STRING,
                required: [true, "Level access level should be like 0.1.2.3"]
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
        await queryInterface.dropTable('levels')
    }
}