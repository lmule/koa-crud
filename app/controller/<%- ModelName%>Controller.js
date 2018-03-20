const <%- ModelName%>Model = require('../model/<%- ModelName%>Model')
const util = require('util')

let controller = {}

controller.get = async (ctx, next) => {
    const { <%- table.primaryKey%> } = ctx.query
    return await <%- ModelName%>Model
        .where({
            <%- table.primaryKey%>: <%- table.primaryKey%>
        })
        .fetch()
}

controller.list = async (ctx, next) => {
    return await <%- ModelName%>Model
        .fetchAll({
        })
}

controller.add  = async (ctx, next) => {
    const { <% for (var i = 0; i < table.columns.length; i++) { if (i == table.columns.length - 1) {%> <%- table.columns[i]%><% } else {%><%- table.columns[i]%>, <% }} %> } = ctx.query
    // TODO: 这里是验证

    const value = {<% -_%>
        <% for (var i = 0; i < table.columns.length; i++) {
            if (i == table.columns.length - 1) {%>
        <%- table.columns[i]%>: <%- table.columns[i]-%>
        <% } else {%>
        <%- table.columns[i]%>: <%- table.columns[i]-%>
        <% }} %>
    }

    let result = await new <%- ModelName%>Model(value).save()
    if (result.id <= 0) {
        throw new Error(util.format('保存失败，具体数据是:%s', JSON.stringify(value)))
    }
    return true
}

controller.update = async (ctx, next) => {
    const { <% for (var i = 0; i < table.columns.length; i++) { if (i == table.columns.length - 1) {%> <%- table.columns[i]%><% } else {%><%- table.columns[i]%>, <% }} %> } = ctx.query
    // TODO: 这里是验证

    <%# 等有空的时候把主键单独拿出来%>
    const value = {
        <% for (var i = 0; i < table.columns.length; i++) {
            if (i == table.columns.length - 1) {-%>
        <%- table.columns[i]%>: <%- table.columns[i]-%>
        <% } else {%>
        <%- table.columns[i]%>: <%- table.columns[i]-%>,
        <% }} %>
    }

    let result = await new <%- ModelName%>Model(value).save()
    if (result.id <= 0) {
        throw new Error(util.format('保存失败，具体数据是:%s', JSON.stringify(value)))
    }
    return true
}

controller.delete = async (ctx, next) => {
    const { <%- table.primaryKey%> } = ctx.query
    <%# bookshelf在删除的时候好像没有标识是否删除成功（只要不报错就认为是删除成功，然而它并不知道删除了几条）%>
    await <%- ModelName%>Model
        .where({
            <%- table.primaryKey%>: <%- table.primaryKey%>
        })
        .destroy()
    return true
}

module.exports = controller