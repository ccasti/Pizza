var yo = require('yo-yo');
var layout = require('../layout');

module.exports = function () {
	var el = yo`<div class="content fondo base">
		<div class="col s12 m4">
			<div class="row">
				<div class="col s12 center-align">
					<p class="pack-text grey-text text-darken-4">Sorprende a tus seres queridos con nustros pack's preparados con exquisitos productos</p>
					<img class="pic-pack" src="pack.jpg" />
				</div>
			</div>
			<div class="divider"></div>
			<div class="row">
				<div class="col s12 center-align">
					<p class="pack-text grey-text text-darken-4">La fiesta la armamos nosotros, conoce nuestros excelentes pack's para disfrutar con tus amigos</p>
					<img class="pic-pack" src="pack-fiesta.jpg" />
				</div>
			</div>
			<div class="divider hide-on-med-and-up"></div>
		</div>
		<div class="col s12 m8">
			<p class="pack-text grey-text text-darken-4 center-align">Conoce las recetas que hemos preparado especialmente para ti con productos de primera selección</p>
			<div class="divider"></div>
			<p class="pack-text grey-text text-darken-4 center-align">También puedes prepararla a tu gusto selleccionando x ingredientes de distintos tipos, todas las pizzas son preparadas en nuestra masa especial con nuestra receta de salsa</p>
			<div class="divider"></div>
			<p class="pack-text grey-text text-darken-4 center-align">Descubre las ofertas que hemos preparado especialmente para ti.</p>
		</div>
	</div>`;

	return layout(el);
}