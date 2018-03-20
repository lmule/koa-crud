const <%- ModelName %>Model = require('../model/<%- ModelName %>Model')
const util = require('util')

let controller = {}

controller.get = async (ctx, next) => {
    const { <%- table.primaryKey %> } = ctx.query
    return await <%- ModelName %>Model
        .where({
        })
        .fetch()
}

controller.list = async (ctx, next) => {
    return await <%- ModelName %>Model
        .fetchAll({
        })
}

controller.add  = async (ctx, next) => {
    // TODO: 这里是验证


    let result = await new <%- ModelName %>Model(value).save()
    if (result.id <= 0) {
        throw new Error(util.format('保存失败，具体数据是:%s', JSON.stringify(value)))
    }
    return true
}

controller.update = async (ctx, next) => {
    // TODO: 这里是验证


    let result = await new <%- ModelName %>Model(value).save()
    if (result.id <= 0) {
        throw new Error(util.format('保存失败，具体数据是:%s', JSON.stringify(value)))
    }
    return true
}

controller.delete = async (ctx, next) => {
    const { <%- table.primaryKey %> } = ctx.query
    <%- ! bookshelf在删除的时候好像没有标识是否删除成功（只要不报错就认为是删除成功，然而它并不知道删除了几条） %> 
    await <%- ModelName %>Model
        .where({
            <%- table.primaryKey %>: <%- table.primaryKey %>
        })
        .destroy()
    return true
}

module.exports = controller