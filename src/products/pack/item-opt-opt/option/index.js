var yo = require('yo-yo');

module.exports = function (item) {
	return yo`<li class="itemOpt hover" id="itemSelect" data-idpack="${item.idpack}" data-idopt="${item.idopt}" data-id="${item.iditem}"><a href="#" id="itemSelect" class="opcionElejida" data-idpack="${item.idpack}" data-idopt="${item.idopt}" data-id="${item.iditem}">- ${item.itemname}</a></li>`
}