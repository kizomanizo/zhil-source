// @Author Kizito Mrema
// @Usage ApiHelper function accepts res object, string type, string title and a message array
const orderService = require('../../services/orders')
const viewHelper = require('../../helpers/view')
const Item = require('../../models').Item
const axios = require('axios').default

async function list(req, res) {
    try { viewHelper.viewRender(req, res, 'orders/index', 'Available Orders', await orderService.list()) }
    catch (error) {console.log(error) }
}

async function add(req, res) {
    const items = await Item.findAll()
    try { viewHelper.viewRender(req, res, 'orders/create', 'Add New Orders', items) }
    catch (error) {console.log(error) }
}

async function create(req, res) {
    try { viewHelper.viewRender(req, res, 'orders/index', 'Available Orders', await orderService.create(req, res)) }
    catch (error) {console.log(error) }
}

async function find(req, res) {
    try { viewHelper.viewRender(req, res, 'orders/details', 'Order Details', await orderService.find(req)) }
    catch (error) {console.log(error) }
}

async function remove(req, res) {
    try { await orderService.remove(req.params.id) }
    catch (error) {console.log(error) }
}

async function submit(req, res) {
    try {
        const response = await axios.post('localhost:3001/orders/submit', {
            success: true,
            type: 'create',
            title: 'orders',
            message: await orderService.submit(req, res)
        });
        res.status(200).json({
            success: true,
            response: response
        })
    }
    catch (error) {console.log(error) }
}

module.exports = { list, create, add, find, submit, remove }