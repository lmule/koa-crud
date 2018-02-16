const router = require('koa-router')()
const controller = require('../controller/{{ModelClass}}Controller')

router.prefix('/{{modelclass}}');

router.get('/list', controller.list)

router.get('/add', controller.add)

router.get('/update', controller.update)

router.get('/delete', controller.delete)

module.exports = router