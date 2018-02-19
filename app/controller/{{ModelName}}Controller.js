const {{ModelName}}Model = require('../model/{{ModelName}}Model')
const util = require('util')

let controller = {}

controller.get= async (ctx, next) => {
    const { {{table.primaryKey}} } = ctx.query
    return await {{ModelName}}Model
        .query({
            where: { {{table.primaryKey}}: {{table.primaryKey}} }
        })
}

controller.list = async (ctx, next) => {
    return await {{ModelName}}Model
        .fetchAll({
        })
}

controller.add  = async (ctx, next) => {
    const { {{#each table.columns}}{{#if @last}}{{this}}{{else}}{{this}}, {{/if}}{{/each}} } = ctx.query
    // 这里是验证

    const value = {
        {{#each table.columns}}
        {{#if @last}}
        {{this}}: {{this}}
        {{else}}
        {{this}}: {{this}},
        {{/if}}
        {{/each}}
    }

    let result = await new {{ModelName}}Model(value).save()
    if (result.id <= 0) {
        throw new Error(util.format('保存失败，具体数据是:%s', JSON.stringify(value)))
    }
    return true
}

controller.update = async (ctx, next) => {
    const { {{#each table.columns}}{{#if @last}}{{this}}{{else}}{{this}}, {{/if}}{{/each}} } = ctx.query
    // TODO: 这里是验证

    const value = {
        {{#each table.columns}}
        {{#if @last}}
        {{this}}: {{this}}
        {{else}}
        {{this}}: {{this}},
        {{/if}}
        {{/each}}
    }

    let result = await new {{ModelName}}Model(value).save()
    if (result.id <= 0) {
        throw new Error(util.format('保存失败，具体数据是:%s', JSON.stringify(value)))
    }
    return true
}

controller.delete = async (ctx, next) => {
    return await {{ModelName}}Model
        .query({
            where: { {{table.primaryKey}}: {{table.primaryKey}} }
        })
        .destroy()
}


module.exports = controller