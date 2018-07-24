const <%- ModelName%>Model = require('../model/<%- ModelName%>Model')

let controller = {}

controller.get = async (ctx, next) => {
    const { <%- table.camelCasedprimaryKey%> } = ctx.query
    return await <%- ModelName%>Model
        .where({
            <%- table.primaryKey%>: <%- table.camelCasedprimaryKey%>
        })
        .fetch()
}

controller.list = async (ctx, next) => {
    const { page = 1, pageSize = 20 } = ctx.query;

    const collection = await <%- ModelName%>Model
        .query((qb) => {

        })
        .orderBy('-<%- table.primaryKey%>')
        .fetchPage({
            page,
            pageSize
        })
    const { pagination } = collection
    return { 
        data: collection,
        pagination
    }

}

controller.add  = async (ctx, next) => {
    const { <% for (var i = 0; i < table.columns.length; i++) { if (i == table.columns.length - 1) { if (table.columns[i] != table.primaryKey) {%> <%- table.columns[i]%><% }} else { if (table.columns[i] != table.primaryKey) {%><%- table.columns[i]%>, <% }}} %> } = ctx.request.body
    // TODO: 这里是验证

    const value = {<% -%>
        <% for (var i = 0; i < table.columns.length; i++) {
            if (i == table.columns.length - 1) {
                if (table.columns[i] != table.primaryKey) {%>
        <%- table.columns[i]%>: <%- table.columns[i]-%>
        <% }} else {
            if (table.columns[i] != table.primaryKey) {%>
        <%- table.columns[i]%>: <%- table.columns[i]%>, <% }}} %>
    }

    let result = await new <%- ModelName%>Model(value).save()
    if (result.id <= 0) {
        throw new Error(`保存失败，具体数据是:${JSON.stringify(value)}`)
    }
    return true
}

controller.update = async (ctx, next) => {
    const { <% for (var i = 0; i < table.columns.length; i++) { if (i == table.columns.length - 1) {%> <%- table.columns[i]%><% } else {%><%- table.columns[i]%>, <% }} %> } = ctx.request.body
    // TODO: 这里是验证

    const value = {<% -%>
        <% for (var i = 0; i < table.columns.length; i++) {
            if (i == table.columns.length - 1) {
                if (table.columns[i] != table.camelCasedprimaryKey) {%>
        <%- table.columns[i]%>: <%- table.columns[i]-%>
        <% }} else {
            if (table.columns[i] != table.primaryKey) {%>
        <%- table.columns[i]%>: <%- table.columns[i]%>, <% }}} %>
    }

    let result = await new <%- ModelName%>Model({<%- table.primaryKey%>: <%- table.camelCasedprimaryKey%>}).save(value, {patch: true})
    if (result.id <= 0) {
        throw new Error(`保存失败，具体数据是:${JSON.stringify(value)}`)
    }
    return true
}

controller.delete = async (ctx, next) => {
    const { <%- table.camelCasedprimaryKey%> } = ctx.request.body
    <%# bookshelf在删除的时候好像没有标识是否删除成功（只要不报错就认为是删除成功，然而它并不知道删除了几条）%>
    await <%- ModelName%>Model
        .where({
            <%- table.primaryKey%>: <%- table.camelCasedprimaryKey%>
        })
        .destroy()
    return true
}

module.exports = controller
