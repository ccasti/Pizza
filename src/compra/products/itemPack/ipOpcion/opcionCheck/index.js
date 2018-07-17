var yo = require('yo-yo');

module.exports = function (picOk) {
	return yo`<p class="itemPackOk">- ${picOk.itemname}</p>`
}