
// @Author Kizito Mrema
// @Usage ApiHelper function accepts res object, string type, string title and a message array
const itemService = require('../../services/items')
const apiHelper = require('../../helpers/api')

async function list(req, res, next) {
    try { apiHelper.apiResponse(req, res, true, 200, 'Search', 'Items found!', await itemService.list()) }
    catch (error) { next(error) }
}

async function create(req, res, next) {
    try { apiHelper.apiResponse(req, res, true, 201, 'Create', 'Item created!', await itemService.create(req)) }
    catch (error) { next(error) }
}

async function find(req, res, next) {
    try {apiHelper.apiResponse(req, res, true, 200, 'Find', 'Item found!', await itemService.find(req)) }
    catch (error) { next(error) }
}

async function update(req, res, next) {
    try { apiHelper.apiResponse(req, res, true, 200, 'Update', "Item updated!", await itemService.update(req)) }
    catch (error) { next(error) }
}

async function remove(req, res, next) {
    try { apiHelper.apiResponse(req, res, true, 202, 'Delete', "Item deleted!", await itemService.remove(req)) }
    catch (error) { next(error) }
}

module.exports = { list, create, find, update, remove, }