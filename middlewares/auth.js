const jwt = require('jsonwebtoken')
const { ErrorHandler } = require("../helpers/error")
const dotenv = require('dotenv')
const User = require('../models').User
const ms = require('ms')
const bcrypt = require('bcrypt')
const logsHelper = require('../helpers/logger')
dotenv.config()

async function checkToken (req, _res, next) {
    try {
        let token = await req.headers['x-access-token'] || req.headers['authorization'] // express induced lowercase kumbuka
        if (!token) { throw new ErrorHandler (401, 'Auth token is not supplied.') }
        if (token.startsWith('Bearer ')) { token = token.slice(7, token.length) }
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) { throw new ErrorHandler(401, 'An invalid or missing auth token!.') }
                else { 
                    req.decoded = decoded
                    next()
                }
            })
        } else { throw new ErrorHandler (401, 'Auth token is not supplied.') }
    }
    catch (error) { next(error) }
}

async function login(req) {
    const attemptingUser = await User.findOne({where:{username: req.body.username}})
    if (!attemptingUser) { throw new ErrorHandler(404, 'Humpty dumpty, User not Found!.') }
    const match = await bcrypt.compare(req.body.password, attemptingUser.password)
    if (match) {
        let token = jwt.sign(
            {
                username: req.body.username,
                id: attemptingUser.id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.TOKEN_EXPIRY
            }
        )
        attemptingUser.tokenExpiry = new Date (Date.now() + ms(process.env.TOKEN_EXPIRY))
        attemptingUser.lastLogin = new Date(Date.now())
        attemptingUser.save()
        
        // log the login action for reference
        logsHelper.infoLogger(attemptingUser.id, ' user has logged in successfully')
        
        // return the token to the user who requested it.
        return token
    } else {
        throw new ErrorHandler (400, "Match "+match)
    } 
}

module.exports = { checkToken, login, }