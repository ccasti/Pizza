var yo = require('yo-yo');

module.exports = function (pic) {
	return yo`<div class="item">
		<input type="checkbox" class="filled-in" id="filled-in-box${pic.carid}" />
		<label for="filled-in-box${pic.carid}">${pic.carname}</label>
		<img src="${pic.carurl}" class="vegetal" />
		<span class="precio">$${pic.carprice}.-</span>
	</div>`
}