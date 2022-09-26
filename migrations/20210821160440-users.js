'use strict'

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('users', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            username: {
                type: Sequelize.STRING,
                required: [true, "Username is required"],
                defaultValue: "Some String"
            },
            email: {
                type: Sequelize.STRING,
                required: [true, "Email is required, it's not 1993"],
                defaultValue: "Some String"
            },
            password: {
                type: Sequelize.STRING,
                required: [true, "Password is required"],
                allowNull: false
            },
            salt_rounds: {
                type: Sequelize.INTEGER,
                required: true
            },
            join_date: {
                type: Sequelize.DATE,
                required: true
            },
            last_login: {
                type: Sequelize.DATE,
                required: true
            },
            token_expiry: {
                type: Sequelize.DATE,
                required: false
            },
            status: {
                type: Sequelize.BOOLEAN,
                required: false,
                defaultValue: true
            },
            level_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                  model: 'levels',
                  key: 'id'
                }
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
        await queryInterface.dropTable('users')
    }
}