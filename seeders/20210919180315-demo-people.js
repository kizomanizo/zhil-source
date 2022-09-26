'use strict'
const { v4: uuidv4 } = require('uuid')
const dotenv = require('dotenv').config()
const User = require('../models').User

async function getUser (username) {
    var userId = await User.findOne({ where: {username: username}, attributes: ["id"] })
    userId = JSON.stringify(userId)
    userId = JSON.parse(userId)
    return userId.id
}

module.exports = {
    up: async (queryInterface, Sequelize) => {
        console.log(await getUser(process.env.LEVEL_ONE_NAME))
        await queryInterface.bulkInsert('people', [
            {
                id: uuidv4(),
                firstname: process.env.LEVEL_ONE_NAME,
                lastname: "Demo",
                mobilephone: "0755437887",
                user_id: await getUser(process.env.LEVEL_ONE_NAME),
                created_by: uuidv4(),
                created_at: new Date(Date.now()),
            },
            {
                id: uuidv4(),
                firstname: process.env.LEVEL_TWO_NAME,
                lastname: "Demo",
                mobilephone: "0755437887",
                user_id: await getUser(process.env.LEVEL_TWO_NAME),
                created_by: uuidv4(),
                created_at: new Date(Date.now()),
            },
            {
                id: uuidv4(),
                firstname: process.env.LEVEL_THREE_NAME,
                lastname: "Demo",
                mobilephone: "0755437887",
                user_id: await getUser(process.env.LEVEL_THREE_NAME),
                created_by: uuidv4(),
                created_at: new Date(Date.now()),
            }
        ], {})
    },

    down: async (queryInterface, Sequelize) => {
         await queryInterface.bulkDelete('people', null, {})
    }
}