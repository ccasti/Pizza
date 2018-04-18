var yo = require('yo-yo');

module.exports = function layout (content) {
	return yo`<div class="content fondo base">
		<div>
			<img class="pic-ini" src="fondo.jpg" />
		</div>
		<div class="container principal">
			<div class="row principal2">
				<div class="col s12 seccion">
					<div class="row">
						${content}
					</div>
				</div>
			</div>
		</div>
		<div>
			<img class="pic-ini" src="fondo.jpg" />
		</div>
	</div>`;
}