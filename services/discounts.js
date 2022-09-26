const Discount = require('../models').Discount
const OrderDiscount = require('../models').OrderDiscount
const { ErrorHandler } = require("../helpers/error")
const logsHelper = require('../helpers/logger')

async function list() {
    const allDiscounts = await Discount.findAll({})
        if (!allDiscounts.length) { throw new ErrorHandler (404, 'Lolz; No discounts found!.') }
    return allDiscounts
}

async function create(req) {
    const newDiscount = new Discount(req.body)
        newDiscount.name = req.body.name
        newDiscount.status = false
        newDiscount.created_by = req.decoded.id
        newDiscount.updated_by = null
    return newDiscount.save()
}

async function find(req) {
    const foundDiscount = await Discount.findOne({ where:{ id:req.params.id } })
        if(!foundDiscount) { throw new ErrorHandler(404, 'Yikes, Discount not found!') }
    return foundDiscount
}

async function update(req) {
    const updatedDiscount = await Discount.findOne({ where:{ id:req.params.id } })
    if(!updatedDiscount) { throw new ErrorHandler(404, 'Error: Discount not found!') }
    else {
        if (req.body.name != null) {updatedDiscount.name = req.body.name}
        if (req.body.status != null) {updatedDiscount.status = req.body.status}
        updatedDiscount.updated_by = req.decoded.id
        updatedDiscount.updated_at = Date()
        await updatedDiscount.save()
        logsHelper.infoLogger(updatedDiscount.id, ' discount has been updated by '+ req.decoded.id)
        return updatedDiscount
    }   
}

async function remove(req) {
    const discountToRemove = await Discount.findOne({ where:{ id:req.params.id } })
    if (!discountToRemove) { throw new ErrorHandler(404, 'Humpty dumpty, Discount not Found!.') }
    else {
        logsHelper.infoLogger(discountToRemove.id, ' discount has been deleted')
        await OrderDiscount.destroy({ where:{ discount_id:req.params.id }})
        return Discount.destroy({ where:{ id:req.params.id } })
    }      
}
module.exports = { list, create, find, update, remove, }