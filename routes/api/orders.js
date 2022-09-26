
const Express = require('express')
const Router = Express.Router()
const Auth = require('../../middlewares/auth')
const Controller = require('../../controllers/api/orders')

Router.route('/')
    .get(Auth.checkToken, Controller.list)
    .post(Auth.checkToken, Controller.create)

Router.route('/:id')
    .get(Auth.checkToken, Controller.find)
    .patch(Auth.checkToken, Controller.update)
    .delete(Auth.checkToken, Controller.remove)

module.exports = Router