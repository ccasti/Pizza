var yo = require('yo-yo');

module.exports = function (item) {
	return yo`<option value="${item.itemid}">${item.itemname}</option>`
}