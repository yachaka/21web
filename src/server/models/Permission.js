
var objection = require('objection')
	, Model = require('objection').Model;

function Permission() {
	Model.apply(this, arguments);
}

Model.extend(Permission);

Permission.tableName = 'user_permissions';

module.exports = Permission;