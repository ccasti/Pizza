var yo = require('yo-yo');
var layout = require('../layout');
var menu = require('../store-card');

module.exports = function (menuss) {
	var el = yo`<div class="content">
		<div class="container">
			<div class="row">
				<div class="col s12">
					<div class="row top">
						<div class="col s12 center-align">
					        <p class="menu-text hide-on-small-only blue-text text-darken-2 ">Texto introductorio, podrá definir una visión general de la pizza, con el sello propio, talvez las características de la masa y la base de salsa</p>
					        <p class="menu-text hide-on-med-and-up blue-text text-darken-2 ">Texto introductorio, resumido y acotado...</p>
			    		</div>
			    	</div>
					<ul class="collapsible popout" data-collapsible="accordion">
					    <li class="bottom">
					    	<div class="collapsible-header blue lighten-2">
					    		<p class="menu-text padding1 hide-on-small-only white-text center-align">Nuestras Recetas Especiales</p>
					        	<p class="menu-text padding1 hide-on-med-and-up white-text center-align">Nuestras Recetas</p>
					    	</div>
					    	<div class="collapsible-body">
					    		<div class="col s12 white ajuste-menu-store">
					    			${menuss.map(function (pic) {
										return menu(pic);
									})}
								</div>
					    	</div>
					    </li>
					    <li class="bottom">
					    	<div class="collapsible-header blue lighten-2">
					    		<p class="menu-text padding1 hide-on-small-only white-text center-align">Armala a tu gusto</p>
					        	<p class="menu-text padding1 hide-on-med-and-up white-text center-align">A tu gusto</p>
					    	</div>
					    	<div class="collapsible-body">
					    		<div class="col s12 white">
					    			<div class="row reset">
										<div class="col s12 center-align">
									        <p class="menu-text padding1 hide-on-small-only blue-text text-darken-2 ">Descripciones generales de la pizza como la base y masa además de explicar la cantidad y tipos de ingredientes, rectricciones si existen...</p>
									        <p class="menu-text padding1 hide-on-med-and-up blue-text text-darken-2 ">Breve descripción e instrucciones...</p>
							    		</div>
							    	</div>
							    	<div class="row">
										<div class="col s12">
											<form action="#">
												<div class="row paddingl">
													<div class="col s12">
														<p class="menu-text paddingl blue-text text-darken-2">Vegetales</p>
													</div>
												</div>
    											<div class="row">
												    <div class="col s12 ajuste-menu-store">
												    	<div class="item menu-store">
														   	<input type="checkbox" class="filled-in" id="filled-in-box1" />
														   	<label for="filled-in-box1">Producto</label>
														   	<img src="vegetal.jpg" class="vegetal" />
														   	<span class="precio">$1.200.-</span>
														</div>
														<div class="item menu-store">
														   	<input type="checkbox" class="filled-in" id="filled-in-box2" />
														   	<label for="filled-in-box2">Producto</label>
														   	<img src="vegetal.jpg" class="vegetal" />
														   	<span class="precio">$1.200.-</span>
														</div>
														<div class="item menu-store">
														   	<input type="checkbox" class="filled-in" id="filled-in-box3" />
														   	<label for="filled-in-box3">Producto</label>
														   	<img src="vegetal.jpg" class="vegetal" />
														   	<span class="precio">$1.200.-</span>
														</div>
														<div class="item menu-store">
														   	<input type="checkbox" class="filled-in" id="filled-in-box4" />
														   	<label for="filled-in-box4">Producto</label>
														   	<img src="vegetal.jpg" class="vegetal" />
														   	<span class="precio">$1.200.-</span>
														</div>
														<div class="item menu-store">
														   	<input type="checkbox" class="filled-in" id="filled-in-box5" />
														   	<label for="filled-in-box5">Producto</label>
														   	<img src="vegetal.jpg" class="vegetal" />
														   	<span class="precio">$1.200.-</span>
														</div>
														<div class="item menu-store">
														   	<input type="checkbox" class="filled-in" id="filled-in-box6" />
														   	<label for="filled-in-box6">Producto</label>
														   	<img src="vegetal.jpg" class="vegetal" />
														   	<span class="precio">$1.200.-</span>
														</div>
												    </div>
												</div>
												<div class="divider bottom"></div>
												<div class="row paddingl">
													<div class="col s12">
														<p class="menu-text paddingl blue-text text-darken-2">Carnes</p>
													</div>
												</div>
												<div class="row">
												    <div class="col s12 ajuste-menu-store">
												    	<div class="item menu-store">
														   	<input type="checkbox" class="filled-in" id="filled-in-box7" />
														   	<label for="filled-in-box7">Producto</label>
														   	<img src="carne.jpg" class="vegetal" />
														   	<span class="precio">$1.200.-</span>
														</div><div class="item menu-store">
														   	<input type="checkbox" class="filled-in" id="filled-in-box8" />
														   	<label for="filled-in-box8">Producto</label>
														   	<img src="carne.jpg" class="vegetal" />
														   	<span class="precio">$1.200.-</span>
														</div>
														<div class="item menu-store">
														   	<input type="checkbox" class="filled-in" id="filled-in-box9" />
														   	<label for="filled-in-box9">Producto</label>
														   	<img src="carne.jpg" class="vegetal" />
														   	<span class="precio">$1.200.-</span>
														</div>
														<div class="item menu-store">
														   	<input type="checkbox" class="filled-in" id="filled-in-box10" />
														   	<label for="filled-in-box10">Producto</label>
														   	<img src="carne.jpg" class="vegetal" />
														   	<span class="precio">$1.200.-</span>
														</div>
														<div class="item menu-store">
														   	<input type="checkbox" class="filled-in" id="filled-in-box11" />
														   	<label for="filled-in-box11">Producto</label>
														   	<img src="carne.jpg" class="vegetal" />
														   	<span class="precio">$1.200.-</span>
														</div>
														<div class="item menu-store">
														   	<input type="checkbox" class="filled-in" id="filled-in-box12" />
														   	<label for="filled-in-box12">Producto</label>
														   	<img src="carne.jpg" class="vegetal" />
														   	<span class="precio">$1.200.-</span>
														</div>
													</div>
												</div>
												<div class="divider bottom"></div>
												<div class="row paddingl">
													<div class="col s12">
														<p class="menu-text paddingl blue-text text-darken-2">Otros</p>
													</div>
												</div>

											</form>
									    </div>
							    	</div>
					    		</div>
					    	</div>
					    </li>
					    <li class="bottom">
					    	<div class="collapsible-header blue lighten-2">
					    		<p class="menu-text padding1 hide-on-small-only white-text center-align">Líquidos para acompañarla</p>
					        	<p class="menu-text padding1 hide-on-med-and-up white-text center-align">Líquidos</p>
					    	</div>
					    	<div class="collapsible-body">
					    	</div>
					    </li>
					  </ul>
				</div>		
			</div>
		</div>
	</div>`;

	return layout(el);
}