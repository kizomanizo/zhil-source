const Express = require('express')
const Router = Express.Router()
const Auth = require('../../middlewares/auth')
const Controller = require('../../controllers/api/users')

Router.route('/')
.get(Auth.checkToken, Controller.list)
.post(Auth.checkToken, Controller.create)

Router.route('/:id')
.get(Auth.checkToken, Controller.find)
.patch(Auth.checkToken, Controller.update)
.delete(Auth.checkToken, Controller.remove)

Router.route('/login')
    .post(Controller.login)

Router.route('/me/details')
    .get(Auth.checkToken, Controller.me)

Router.route('/signout')
    .post(Auth.checkToken, Controller.signout)

module.exports = Router