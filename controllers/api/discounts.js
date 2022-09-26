
// @Author Kizito Mrema
// @Usage ApiHelper function accepts res object, string type, string title and a message array
const discountService = require('../../services/discounts')
const apiHelper = require('../../helpers/api')

async function list(req, res, next) {
    try { apiHelper.apiResponse(req, res, true, 200, 'Search', 'Discounts found!', await discountService.list()) }
    catch (error) { next(error) }
}

async function create(req, res, next) {
    try { apiHelper.apiResponse(req, res, true, 201, 'Create', 'Discount created!', await discountService.create(req)) }
    catch (error) { next(error) }
}

async function find(req, res, next) {
    try {apiHelper.apiResponse(req, res, true, 200, 'Find', 'Discount found!', await discountService.find(req)) }
    catch (error) { next(error) }
}

async function update(req, res, next) {
    try { apiHelper.apiResponse(req, res, true, 200, 'Update', "Discount updated!", await discountService.update(req)) }
    catch (error) { next(error) }
}

async function remove(req, res, next) {
    try { apiHelper.apiResponse(req, res, true, 202, 'Delete', "Discount deleted!", await discountService.remove(req)) }
    catch (error) { next(error) }
}

module.exports = { list, create, find, update, remove, }