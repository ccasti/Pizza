var yo = require('yo-yo');

module.exports = function (picO) {
	return yo`<div class="row itemComprando nobottom">
		<div class="col s11">
			${picO.name}
		</div>
		<div class="col s11">
			<p class="itemPackOk">- ${picO.pizname}</p>
			<p class="itemPackOk">- ${picO.bebname}</p>
		</div>
	</div>`
}