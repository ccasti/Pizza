var yo = require('yo-yo');
var layout = require('../layout');
var menu = require('../menu-card');

module.exports = function (menus) {
	var el = yo`<div class="content">
		<div class="container">
			<div class="row">
				<div class="col s10 push-s1 m12">
					<div class="row top">
						<div class="col s12 center-align">
					        <p class="menu-text hide-on-small-only blue-text text-darken-2">Texto de bienvenida o descriptivo, destacando características específicas o la funcionalidad de seguimiento en línea</p>
					        <p class="menu-text hide-on-med-and-up blue-text text-darken-2">Nuestras Recetas</p>
			    		</div>
			    	</div>
			    	<div class="row">
			    		<div class="col ">
			    		</div>
						<div class="col s12 m8 push-m2 l6 push-l3">
							<div class="carousel carousel-slider">
								${menus.map(function (pic) {
					            	return menu(pic);
					            })}
					        </div>
						</div>
					</div>
					<div class="row">
						<div class="col s12 center-align">
					        <p class="menu-text hide-on-small-only blue-text text-darken-2">También puedes prepararla</p>
					        <p class="menu-text hide-on-med-and-up blue-text text-darken-2">Preparala</p>
					</div>
			    	</div>
				</div>			
			</div>
		</div>
	</div>`;

	return layout(el);
}