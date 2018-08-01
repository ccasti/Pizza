var yo = require('yo-yo');

module.exports = function (picS) {
	return yo`<div class="row itemComprando nobottom">
		<div class="col s11">
			<p class="datoVenta">${picS.cantidad} ${picS.name}</p>
		</div>
	</div>`
}