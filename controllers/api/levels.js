
// @Author Kizito Mrema
// @Usage ApiHelper function accepts res object, string type, string title and a message array
const levelService = require('../../services/levels')
const apiHelper = require('../../helpers/api')

async function list(req, res, next) {
    try { apiHelper.apiResponse(req, res, true, 200, 'Search', 'Levels found!', await levelService.list()) }
    catch (error) { next(error) }
}

async function create(req, res, next) {
    try { apiHelper.apiResponse(req, res, true, 201, 'Create', 'Level created!', await levelService.create(req)) }
    catch (error) { next(error) }
}

async function find(req, res, next) {
    try {apiHelper.apiResponse(req, res, true, 200, 'Find', 'Level found!', await levelService.find(req)) }
    catch (error) { next(error) }
}

async function update(req, res, next) {
    try { apiHelper.apiResponse(req, res, true, 200, 'Update', "Level updated!", await levelService.update(req)) }
    catch (error) { next(error) }
}

async function remove(req, res, next) {
    try { apiHelper.apiResponse(req, res, true, 202, 'Delete', "Level deleted!", await levelService.remove(req)) }
    catch (error) { next(error) }
}

module.exports = { list, create, find, update, remove, }