const User = require('../models').User
const Level = require('../models').Level
const Person = require('../models').Person
const { ErrorHandler } = require("../helpers/error")
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
const auth = require('../middlewares/auth')
const logsHelper = require('../helpers/logger')
dotenv.config()

async function hasher(password) {
    const saltRounds = parseInt(process.env.SALT_ROUNDS)
    const salt = bcrypt.genSaltSync(saltRounds)
    return bcrypt.hashSync(password, salt)
}

async function list() {
    const users = await User.findAll({attributes: ['id', 'username', 'email', 'status', 'join_date'], include: 'person'})
    if (!users.length) { throw new ErrorHandler (404, 'Huh No records found.') }
    return users
}

async function create(req, _res) {
    const level = await Level.findOne({where: {id: req.body.level_id}})
    if(!level) {throw new ErrorHandler (404, 'Aargh That level doesn\'t exist.')}
    const user =  new User({
        username: req.body.username,
        email: req.body.email,
        password: await hasher(req.body.password),
        salt_rounds: parseInt(process.env.SALT_ROUNDS),
        join_date: new Date(Date.now()),
        status: req.body.status || false,
        level_id: req.body.level_id,
        created_by: req.decoded.id,
        updated_by: null,
        person: [{
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            mobilephone: req.body.mobilephone,
            created_by: req.decoded.id,
            updated_by: null,
        }]
    }, {include: ['person']})
    const newUser = await user.save({ include: ['person'] })
        // Covering private parts...
        delete user.dataValues.salt_rounds
        delete user.dataValues.password
        delete user.dataValues.token_expiry
    logsHelper.infoLogger(newUser.id, ' user has been created by '+ req.decoded.id)    
    return newUser
}

async function find (req) {
    const foundUser = await User.findOne({where:{ id: req.params.id }, attributes: ['id', 'username', 'email', 'status', 'join_date', 'token_expiry'], include: 'person'})
    if (!foundUser) { throw new ErrorHandler(404, 'A\'ight, User not Found!.') }
    else { 
        logsHelper.infoLogger(foundUser.id, ' User has been searched by '+req.decoded.id)
        return foundUser
    }
}

async function update (req) {
    // first update the user object
    const updatedUser = await User.findOne({where:{id: req.params.id}, include: ['person'] })
    if(!updatedUser) { throw new ErrorHandler(404, 'Hmm! User not found.') }
    else {
        if  (req.body.username != null ) { updatedUser.username = req.body.username }
        if ( req.body.email != null ) { updatedUser.email = req.body.email }
        if ( req.body.status != null ) { updatedUser.status = req.body.status }
        if ( req.body.level_id != null ) { updatedUser.level_id = req.body.level_id }
        if ( req.body.password != null ) { updatedUser.password = hasher(req.body.password)
        updatedUser.salt_rounds = parseInt(process.env.salt_rounds) }
        updatedUser.updated_by = req.decoded.id
        updatedUser.updated_at = Date()
        await updatedUser.save()
        // Log user update event
        logsHelper.infoLogger(updatedUser.id, ' Has been updated, now updating the person object...')

        // Then upate the person object
        const updatedPerson = await Person.findOne({where: {user_id: req.params.id}})
        if (req.body.firstname != null) { updatedPerson.firstname = req.body.firstname }
        if (req.body.lastname != null) { updatedPerson.lastname = req.body.lastname }
        if (req.body.mobilephone != null) { updatedPerson.mobilephone = req.body.mobilephone }
        updatedPerson.updated_by = req.decoded.id
        updatedPerson.updated_at = Date(0)
        await updatedPerson.save()
            delete updatedUser.dataValues.salt_rounds
            delete updatedUser.dataValues.password
            delete updatedUser.dataValues.token_expiry
        // Log person update event
        logsHelper.infoLogger(updatedPerson.id, ' Person belonging to user '+updatedUser.id+' has also been updated by '+req.decoded.id)   
        return await User.findOne({where:{id: req.params.id}, attributes: ['id', 'username', 'email', 'status', 'join_date', 'token_expiry'], include: ['person'] })
    }   
}

async function remove(req) {
    const userToRemove = await User.findOne({where:{id: req.params.id}})
    if (!userToRemove) { throw new ErrorHandler(404, 'Humpty dumpty, User not Found!.') }
    else {
        userToRemove.destroy()
        logsHelper.infoLogger(userToRemove.id, ' user has been deletedby '+req.decoded.id)
        return userToRemove.id
    }
}

async function login(req) {
    return auth.login(req)
}

async function me(req) {
    const details = await User.findOne({ where: { id: req.decoded.id }, include: ['person'] })
        delete details.dataValues.salt_rounds
        delete details.dataValues.password
    return details
}

async function signout() {
    return 'User has performed a signout action'
}

module.exports = { list, create, find, update, remove, login, me, signout, }