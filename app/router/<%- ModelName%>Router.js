const router = require('koa-router')()
const controller = require('../controller/<%- ModelName%>Controller')

router.prefix('/<%- modelname%>');

router.get('/get', controller.get)

router.get('/list', controller.list)

router.get('/add', controller.add)

router.get('/update', controller.update)

router.get('/delete', controller.delete)

module.exports = router