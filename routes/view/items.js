
const Express = require('express')
const Router = Express.Router()
const Auth = require('../../middlewares/auth')
const Controller = require('../../controllers/view/items')

Router.route('/')
    .get(Controller.list)
    .post(Auth.checkToken, Controller.add)

Router.route('/:id')
    .get(Controller.find)
    .patch(Controller.update)
    .delete(Controller.remove)

module.exports = Router