var yo = require('yo-yo');
var layout = require('../layout');
var pizza = require('../products/pizza');

module.exports = function (pizzas) {
	var el = yo`<div class="content fondo base">
		<div>
			<img class="pic-ini" src="fondo.jpg" />
		</div>
		<div class="container principal">
			<div class="row principal2">
				<div class="col s12 seccion">
					<div class="row">
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
							<ul class="collapsible popout" data-collapsible="accordion">
								<p class="pack-text grey-text text-darken-4 center-align">Conoce las recetas que hemos preparado especialmente para ti con productos de primera seleccion</p>
							    <li>
							    	<div class="collapsible-header grey lighten-2">
							    		<p class="menu-text padding1 hide-on-small-only grey-text text-darken-4 center-align">Nuestras Recetas Especiales</p>
							        	<p class="menu-text padding1 hide-on-med-and-up grey-text text-darken-4 center-align">Nuestras Recetas</p>
							    	</div>
							    	<div class="collapsible-body">
							    		<div class="col s12 white">
							    			<div class="row paddingl">
												<div class="col s12">
													<p class="menu-text paddingl grey-text text-darken-4">Pizzas</p>
												</div>
											</div>
											<div class="row">
												<div class="col s12 ajuste-menu-store">
									    			${pizzas.map(function (pic) {
														return pizza(pic);
													})}
												</div>
											</div>	
											<div class="divider"></div>
											<div class="row paddingl">
												<div class="col s12">
													<p class="menu-text paddingl grey-text text-darken-4">Otros</p>
												</div>
											</div>
											<div class="divider"></div>
										</div>
									</div>
							    </li>
							    <p class="pack-text grey-text text-darken-4 center-align">Tambièn puedes prepararla a tu gusto selleccionando x ingredientes de distintos tipos, todas las pizzas son preparadas en nuestra masa especial con nuestra receta de salsa</p>
							    <li>
									<div class="collapsible-header grey lighten-2">
										<p class="menu-text padding1 hide-on-small-only grey-text text-darken-4 center-align">Armala a tu gusto</p>
								    	<p class="menu-text padding1 hide-on-med-and-up grey-text text-darken-4 center-align">A tu gusto</p>
								   	</div>
								   	<div class="collapsible-body">
								   		<div class="col s12 white">
								   			<div class="row">
												<div class="col s12">
													<form action="#">
														<div class="row paddingl">
															<div class="col s12">
																<p class="menu-text paddingl grey-text text-darken-4">Vegetales</p>
															</div>
														</div>
			    										<div class="row">
														    <div class="col s12 ajuste-menu-store">
														    	<div class="item">
																   	<input type="checkbox" class="filled-in" id="filled-in-box1" />
																   	<label for="filled-in-box1">Producto</label>
																   	<img src="vegetal.jpg" class="vegetal" />
																   	<span class="precio">$1.200.-</span>
																</div>
																<div class="item">
																   	<input type="checkbox" class="filled-in" id="filled-in-box2" />
																   	<label for="filled-in-box2">Producto</label>
																   	<img src="vegetal.jpg" class="vegetal" />
																   	<span class="precio">$1.200.-</span>
																</div>
																<div class="item">
																   	<input type="checkbox" class="filled-in" id="filled-in-box3" />
																   	<label for="filled-in-box3">Producto</label>
																   	<img src="vegetal.jpg" class="vegetal" />
																   	<span class="precio">$1.200.-</span>
																</div>
																<div class="item">
																   	<input type="checkbox" class="filled-in" id="filled-in-box4" />
																   	<label for="filled-in-box4">Producto</label>
																   	<img src="vegetal.jpg" class="vegetal" />
																   	<span class="precio">$1.200.-</span>
																</div>
																<div class="item">
																   	<input type="checkbox" class="filled-in" id="filled-in-box5" />
																   	<label for="filled-in-box5">Producto</label>
																   	<img src="vegetal.jpg" class="vegetal" />
																   	<span class="precio">$1.200.-</span>
																</div>
																<div class="item">
																   	<input type="checkbox" class="filled-in" id="filled-in-box6" />
																   	<label for="filled-in-box6">Producto</label>
																   	<img src="vegetal.jpg" class="vegetal" />
																   	<span class="precio">$1.200.-</span>
																</div>
														    </div>
														</div>
														<div class="divider"></div>
														<div class="row paddingl">
															<div class="col s12">
																<p class="menu-text paddingl grey-text text-darken-4">Carnes</p>
															</div>
														</div>
														<div class="row">
														    <div class="col s12 ajuste-menu-store">
														    	<div class="item">
																   	<input type="checkbox" class="filled-in" id="filled-in-box7" />
																   	<label for="filled-in-box7">Producto</label>
																   	<img src="carne.jpg" class="vegetal" />
																   	<span class="precio">$1.200.-</span>
																</div>
																<div class="item">
																   	<input type="checkbox" class="filled-in" id="filled-in-box8" />
																   	<label for="filled-in-box8">Producto</label>
																   	<img src="carne.jpg" class="vegetal" />
																   	<span class="precio">$1.200.-</span>
																</div>
																<div class="item">
																   	<input type="checkbox" class="filled-in" id="filled-in-box9" />
																   	<label for="filled-in-box9">Producto</label>
																   	<img src="carne.jpg" class="vegetal" />
																   	<span class="precio">$1.200.-</span>
																</div>
																<div class="item">
																   	<input type="checkbox" class="filled-in" id="filled-in-box10" />
																   	<label for="filled-in-box10">Producto</label>
																   	<img src="carne.jpg" class="vegetal" />
																   	<span class="precio">$1.200.-</span>
																</div>
																<div class="item">
																   	<input type="checkbox" class="filled-in" id="filled-in-box11" />
																   	<label for="filled-in-box11">Producto</label>
																   	<img src="carne.jpg" class="vegetal" />
																   	<span class="precio">$1.200.-</span>
																</div>
																<div class="item">
																   	<input type="checkbox" class="filled-in" id="filled-in-box12" />
																   	<label for="filled-in-box12">Producto</label>
																   	<img src="carne.jpg" class="vegetal" />
																   	<span class="precio">$1.200.-</span>
																</div>
															</div>
														</div>
														<div class="divider"></div>
														<div class="row paddingl">
															<div class="col s12">
																<p class="menu-text paddingl grey-text text-darken-4">Otros</p>
															</div>
														</div>
													</form>
												</div>
										    </div>
								    	</div>
								    </div>
								</li>
							    <p class="pack-text grey-text text-darken-4 center-align">Descubre las ofertas que hemos preparado especialmente para ti.</p>
							    <li>
							    	<div class="collapsible-header grey lighten-2">
							    		<p class="menu-text padding1 hide-on-small-only grey-text text-darken-4 center-align">Nuestras Ofertas Especiales</p>
							        	<p class="menu-text padding1 hide-on-med-and-up grey-text text-darken-4 center-align">Ofertas</p>
							    	</div>
							    	<div class="collapsible-body">
							    	</div>
							    </li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div>
			<img class="pic-ini" src="fondo.jpg" />
		</div> 
	</div>`;

	return layout(el);
}