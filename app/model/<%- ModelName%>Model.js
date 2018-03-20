const db = require('../helper/db')

module.exports = db.Model.extend({
      tableName: '<%- table.name%>',
})