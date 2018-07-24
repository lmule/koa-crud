const router = require('koa-router')()
const controller = require('../controller/<%- ModelName%>Controller')

router.prefix('/<%- modelname%>');

router.get('/get', controller.get)

router.get('/list', controller.list)

router.post('/add', controller.add)

router.post('/update', controller.update)

router.post('/delete', controller.delete)

module.exports = router