const <%- ModelName %>Model = require('../model/<%- ModelName %>Model')
const util = require('util')

let controller = {}

controller.get = async (ctx, next) => {
    const { <%- table.primaryKey %> } = ctx.query
    return await <%- ModelName %>Model
        .where({
            <%- table.primaryKey %>: <%- table.primaryKey %>
        })
        .fetch()
}

controller.list = async (ctx, next) => {
    return await <%- ModelName %>Model
        .fetchAll({
        })
}

module.exports = controller