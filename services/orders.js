const Item = require('../models').Item
const Discount = require('../models').Discount
const Order = require('../models').Order
const OrderItem = require('../models').OrderItem
const OrderDiscount = require('../models').OrderDiscount
const { ErrorHandler } = require("../helpers/error")
const logsHelper = require('../helpers/logger')

async function list() {
    const allOrders = await Order.findAll({})
        if (!allOrders.length) { throw new ErrorHandler (404, 'Lolz; No orders found!.') }
    return allOrders
}

async function create(req) {
    const newOrder = new Order(req)
        newOrder.order_date = req.body.order_date
        newOrder.status = true
        newOrder.created_by = req.decoded.id
        newOrder.updated_by = null
        await newOrder.save()
        for (const orderItem of req.body.items) {
            const newOrderItem = new OrderItem()
            const item = await Item.findOne({ where: { id: orderItem.item_id }})
                newOrderItem.order_id = newOrder.id
                newOrderItem.item_id = orderItem.item_id
                newOrderItem.quantity = orderItem.quantity
                newOrderItem.payment = orderItem.quantity * item.selling_price
                newOrderItem.created_by = req.decoded.id
                newOrderItem.updated_at = null
            newOrderItem.save()
        }           
        if (req.body.discounts.length > 0) {
            for (const discount of req.body.discounts) {
                const newOrderDiscount = new OrderDiscount()
                    newOrderDiscount.order_id = newOrder.id
                    newOrderDiscount.discount_id = discount.discount_id
                    newOrderDiscount.rate = discount.rate
                    newOrderDiscount.reason = discount.reason
                    newOrderDiscount.created_by = req.decoded.id
                newOrderDiscount.save()
            }
        }
        req.params.id = newOrder.id
    return this.find(req)
}



/**
 * Find a specific order using its ID, "Everyone should read each Library's DOCS"
 * @param  {Object} foundOrder                  Specific order that we query
 * @param  {ObjectConstructor} ErrorHandler     Custom error handling utility
 * @return {Object}                             The full object as retrieved from the DB
 */
async function find(req) {
    const foundOrder = await Order.findOne({
        where: { id: req.params.id },
        // include: [{all: true, nested: true}],
        include: [{
            model: Item,
            as: 'items',
            through: {
                attributes: ['id', 'quantity', 'payment', 'created_at']
            }
        }, {
            model: Discount,
            as: 'discounts',
            through: {
                attributes: ['id', 'rate', 'reason', 'created_at']
            }
        }]
    })
    if(!foundOrder) { throw new ErrorHandler(404, 'Yikes, Order not found!') }
    return foundOrder
}

async function update(req) {
    const updatedOrder = await Order.findOne({ where:{ id:req.params.id } })
        if(!updatedOrder) { throw new ErrorHandler(404, 'Error: Order not found!') }
        else {
            if (req.body.order_date != null) {updatedOrder.order_date = req.body.date}
            if (req.body.status != null) {updatedOrder.status = req.body.status}
            updatedOrder.updated_by = req.decoded.id
            updatedOrder.updated_at = Date()
            await updatedOrder.save()
            if(req.body.items.length > 0) {
                await OrderItem.destroy({where: {order_id: updatedOrder.id}})
                for (newItem of req.body.items) {
                    const oldItem = await Item.findOne({ where: { id: newItem.item_id }})
                    const updatedOrderItem = new OrderItem()
                        updatedOrderItem.order_id = updatedOrder.id
                        updatedOrderItem.item_id = newItem.item_id
                        updatedOrderItem.quantity = newItem.quantity
                        updatedOrderItem.payment = newItem.quantity * oldItem.selling_price
                        updatedOrderItem.updated_by = req.decoded.id
                        updatedOrderItem.updated_at = Date()
                    updatedOrderItem.save()
                }
            }
            if (req.body.discounts.length > 0) {
                await OrderDiscount.destroy({where: {order_id: updatedOrder.id}})
                for (const newDiscount of req.body.discounts) {
                    const updatedOrderDiscount = new OrderDiscount()
                        updatedOrderDiscount.order_id = updatedOrder.id
                        updatedOrderDiscount.discount_id = newDiscount.discount_id
                        updatedOrderDiscount.rate = newDiscount.rate
                        updatedOrderDiscount.reason = newDiscount.reason
                        updatedOrderDiscount.created_by = req.decoded.id
                    updatedOrderDiscount.save()
                }
            }
            logsHelper.infoLogger(updatedOrder.id, ' order has been updated by '+ req.decoded.id)
        }   
        req.params.id = updatedOrder.id
    return this.find(req)
}

 async function remove(req) {
    const orderToRemove = await Order.findOne({ where:{ id:req.params.id } })
    if (!orderToRemove) { throw new ErrorHandler(404, 'Humpty dumpty, Order not Found!.') }
    else {
        logsHelper.infoLogger(orderToRemove.id, ' order has been deleted')
        await OrderItem.destroy({ where:{ order_id:req.params.id }})
        await OrderDiscount.destroy({ where:{ order_id:req.params.id }})
        return Order.destroy({ where:{ id:req.params.id } })
    }      
}
module.exports = { list, create, find, update, remove, }