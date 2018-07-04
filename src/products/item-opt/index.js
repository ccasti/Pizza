var yo = require('yo-yo');

module.exports = function (opt) {
	return yo`<div class="col s12 opt-pizza">
		<p class="item-name-pack">${opt.optname}</p>
	</div>`
}