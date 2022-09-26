'use strict'

const { v4: uuidv4 } = require('uuid')
const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('levels', [{
            id: uuidv4(),
            name: process.env.LEVEL_ONE_NAME,
            description: 'An autogenerated admin level.',
            access: process.env.LEVEL_ONE_ACCESS,
            status: true,
            created_by: uuidv4(),
            created_at: new Date(Date.now()),
        }, {
            id: uuidv4(),
            name: process.env.LEVEL_TWO_NAME,
            description: 'An autogenerated user level.',
            access: process.env.LEVEL_TWO_ACCESS,
            status: true,
            created_by: uuidv4(),
            created_at: new Date(Date.now()),
        },{
            id: uuidv4(),
            name: process.env.LEVEL_THREE_NAME,
            description: 'An autogenerated viewer level.',
            access: process.env.LEVEL_THREE_ACCESS,
            status: true,
            created_by: uuidv4(),
            created_at: new Date(Date.now()),
        }], {})
    },

    down: async (queryInterface, Sequelize) => {
         await queryInterface.bulkDelete('levels', null, {})
    }
}
