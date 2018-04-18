var yo = require('yo-yo');

module.exports = function (pic) {
	return yo`<div class="item">
		<input type="checkbox" class="filled-in" id="filled-in-box${pic.vegid}" />
		<label for="filled-in-box${pic.vegid}">${pic.vegname}</label>
		<img src="${pic.vegurl}" class="vegetal" />
		<span class="precio">$${pic.vegprice}.-</span>
	</div>`
}