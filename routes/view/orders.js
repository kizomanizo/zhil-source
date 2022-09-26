
const Express = require('express')
const Router = Express.Router()
const Auth = require('../../middlewares/auth')
const Controller = require('../../controllers/view/orders')

Router.route('/')
    .get(Controller.list)
    .post(Controller.create)

Router.route('/:id')
    .get(Controller.find)
    .delete(Controller.remove)

Router.route('/add')
    .get(Controller.add)

Router.route('/:id/submit')
    .get(Controller.submit)

module.exports = Router