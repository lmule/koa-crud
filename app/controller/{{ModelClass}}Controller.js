const {{ModelClass}}Model = require('../model/{{ModelClass}}Model')
const util = require('util')

let controller = {}

controller.list = async (ctx, next) => {
    return await {{ModelClass}}Model
        .fetchAll({
        })
}

controller.add  = async (ctx, next) => {
    const {code, name, description} = ctx.query
    // 这里是验证

    const value = {
        code: code,
        name: name,
        description: description
    }

    let result = await new {{ModelClass}}Model(value).save()
    if (result.id <= 0) {
        throw new Error(util.format('保存失败，具体数据是:%s', JSON.stringify(value)))
    }
    return true
}

controller.update = async (ctx, next) => {
    {{#each table.columns}}{{this}}, {{/each}} = ctx.query
    // TODO: 这里是验证

    const value = {
        code: code,
        name: name,
        description: description
    }

    let result = await new {{ModelClass}}Model(value).save()
    if (result.id <= 0) {
        throw new Error(util.format('保存失败，具体数据是:%s', JSON.stringify(value)))
    }
    return true
}

controller.delete = async (ctx, next) => {
    return await PageType
            .fetchAll({
                columns: ['id', 'code', 'name']
            })
}


module.exports = controller