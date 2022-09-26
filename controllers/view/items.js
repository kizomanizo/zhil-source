// @Author Kizito Mrema
// @Usage VieHelper function accepts req, res, string page, string title and a message object
const itemService = require('../../services/items')
const viewHelper = require('../../helpers/view')

async function list(req, res, next) {
    try { viewHelper.viewRender(req, res, 'items/index', 'Available Items', await itemService.list()) }
    catch (error) { next(error) }
}

async function create(req, res, next) {
    try { viewHelper.viewRender(req, res, 'items/create', 'Add New Items', null) }
    catch (error) { next(error) }
}

async function add(req, res) {
    try { await itemService.create(req) }
    catch (error) {console.log(error) }
}

async function find(req, res) {
    try { viewHelper.viewRender(req, res, 'items/details', 'Item Details', await itemService.find(req)) }
    catch (error) {console.log(error) }
}

async function edit(req, res) {
    try { viewHelper.viewRender('items/edit', 'Edit Item', await itemService.edit(req.params.id)) }
    catch (error) {console.log(error) }
}

async function update(req, res) {
    try { await itemService.update(req.params.id) }
    catch (error) {console.log(error) }
}

async function remove(req, res) {
    try { await itemService.remove(req.params.id) }
    catch (error) {console.log(error) }
}

module.exports = { list, create, add, find, edit, update, remove, }