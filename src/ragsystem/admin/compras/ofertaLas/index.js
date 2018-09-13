var yo = require('yo-yo');

module.exports = function (picOL) {
	return yo`<div class="row itemComprando nobottom">
		<div class="col s11">
			${picOL.name}
		</div>
		<div class="col s11">
			<p class="itemPackOk">- ${picOL.lasname}</p>
			<p class="itemPackOk">- ${picOL.bebname}</p>
			<p class="itemPackOk">- Lasagna Adicional: ${picOL.qlasag}</p>
			<p class="itemPackOk">- Gnocchi Adicional: ${picOL.qnocch}</p>
		</div>
	</div>`
}