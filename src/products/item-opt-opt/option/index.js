var yo = require('yo-yo');

module.exports = function (item) {
	return yo`<li class="itemOpt" id="itemSelect" data-idpack="${item.idpack}" data-idopt="${item.idopt}" data-id="${item.iditem}">- ${item.itemname}</li>`
}