
// @Author Kizito Mrema
// @Usage orders controller forwards all requests to order service and responds to api helper
const orderService = require('../../services/orders')
const apiHelper = require('../../helpers/api')

async function list(req, res, next) {
    try { apiHelper.apiResponse(req, res, true, 200, 'Search', 'Orders found!', await orderService.list()) }
    catch (error) { next(error) }
}

async function create(req, res, next) {
    try { apiHelper.apiResponse(req, res, true, 201, 'Create', 'Order created!', await orderService.create(req)) }
    catch (error) { next(error) }
}

async function find(req, res, next) {
    try {apiHelper.apiResponse(req, res, true, 200, 'Find', 'Order found!', await orderService.find(req)) }
    catch (error) { next(error) }
}

async function update(req, res, next) {
    try { apiHelper.apiResponse(req, res, true, 200, 'Update', "Order updated!", await orderService.update(req)) }
    catch (error) { next(error) }
}

async function remove(req, res, next) {
    try { apiHelper.apiResponse(req, res, true, 202, 'Delete', "Order deleted!", await orderService.remove(req)) }
    catch (error) { next(error) }
}

module.exports = { list, create, find, update, remove, }