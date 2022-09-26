
// @Author Kizito Mrema
// @Usage ApiHelper function accepts res object, title string , remark string and a message array
const userService = require('../../services/users');
const apiHelper = require('../../helpers/api');

async function list(req, res, next) {
    try { apiHelper.apiResponse(req, res, true, 200, "Search", "All Users", await userService.list()) }
    catch (error) { next(error) }
}

async function create(req, res, next) {
    try { apiHelper.apiResponse(req, res, true, 201, "Create", "User created!", await userService.create(req)) }
    catch (error) { next(error) }
}

async function find(req, res, next) {
    try { apiHelper.apiResponse(req, res, true, 200, "Search", "User found!", await userService.find(req)) }
    catch (error) { next(error) }
}

async function update(req, res, next) {
    try { apiHelper.apiResponse(req, res, true, 200, "Update", "User updated!", await userService.update(req)) }
    catch (error) { next(error) }
}

async function remove(req, res, next) {
    try { apiHelper.apiResponse(req, res, true, 202, "Delete", "User deleted!", await userService.remove(req)) }
    catch (error) { next(error) }
}

async function login(req, res, next) {
    try { apiHelper.apiResponse(req, res, true, 200, "Login", "Login successful!", await userService.login(req)) }
    catch (error) { next(error) }
}

async function me(req, res, next) {
    try { apiHelper.apiResponse(req, res, true, 200, "Details", "Details found!", await userService.me(req)) }
    catch (error) { next(error) }
}

async function signout(req, res, next) {
    try { apiHelper.apiResponse(req, res, true, 200, "Signout", "You have signed out!", await userService.signout()) }
    catch (error) { next(error) }
}

module.exports = { list, create, find, update, remove, login, me, signout, };