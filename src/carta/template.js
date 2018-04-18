var yo = require('yo-yo');
var layout = require('../layout');
var pizza = require('../products/pizza');
var vegetal = require('../products/vegetal');
var carne = require('../products/carne');
var ensalada = require('../products/ensalada');
var adicional = require('../products/adicional');

module.exports = function (pizzas, vegetales, carnes, ensaladas, adicionales) {
	var el = yo`<div class="col s12 seccion">
		<div class="row">
			<div class="col s12">
				<ul class="collapsible popout" data-collapsible="accordion">
					<p class="pack-text grey-text text-darken-4 center-align">Conoce las recetas que hemos preparado especialmente para ti con productos de primera selección</p>
				    <li>
				    	<div class="collapsible-header grey lighten-2">
				    		<p class="menu-text padding1 grey-text text-darken-4 center-align">Pizzas</p>
				        </div>
				    	<div class="collapsible-body">
				    		<div class="col s12 white">
				    			<div class="row">
									<div class="col s12 ajuste-menu-store">
						    			${pizzas.map(function (pic) {
											return pizza(pic);
										})}
									</div>
								</div>
								<div class="divider separar"></div>
							</div>
						</div>
				    </li>
				    <li>
				    	<div class="collapsible-header grey lighten-2">
				    		<p class="menu-text padding1 grey-text text-darken-4 center-align">Arma tu Pizza</p>
				        </div>
				    	<div class="collapsible-body">
				    		<div class="col s12 white">
				    			<div class="row principal2">
				    				<div class="col s12">
				    					<p class="menu-text-in grey-text text-darken-4 center-align">Todas preparadas en nuestra masa especial y una exquisita salsa... </p>
				    				</div>
				    			</div>
				    			<form action="#">
				    				<div class="row">
				    					<div class="col s12">
				    						<p class="menu-text-in paddingl grey-text text-darken-4">Vegetales</p>
				    					</div>
				    				</div>
				    				<div class="row">
				    				    <div class="col s12 ajuste-menu-store">
				    						${vegetales.map(function (pic) {
				    					  		return vegetal(pic);
				    					   	})}
				    					</div>
				    				</div>
				    				<div class="divider"></div>
				    				<div class="row">
				    					<div class="col s12">
				    						<p class="menu-text-in paddingl grey-text text-darken-4">Carnes</p>
				    					</div>
				    				</div>
				    				<div class="row">
				    				    <div class="col s12 ajuste-menu-store">
				    				    	${carnes.map(function (pic) {
				    				    		return carne(pic);
				    				    	})}
				    					</div>
				    				</div>
				    				<div class="divider"></div>
				    				<div class="row">
				    					<div class="col s12">
				    						<p class="menu-text-in paddingl grey-text text-darken-4">Otros</p>
				    					</div>
				    				</div>
				    				<div class="divider"></div>
				    				<div class="row top">
				    					<div class="col s10 offset-s1 m4 offset-m4 center-align">
				    						<a class="waves-effect waves-light btn blue darken-2">Subir al carro</a>
				    					</div>
				    				</div>
				    				<div class="divider separar"></div>
				    			</form>
				    		</div>
				    	</div>
				    </li>
				    <li>
						<div class="collapsible-header grey lighten-2">
							<p class="menu-text padding1 grey-text text-darken-4 center-align">Ensaladas</p>
					    </div>
					   	<div class="collapsible-body">
					   		<div class="col s12 white">
					   			<div class="row">
									<div class="col s12 ajuste-menu-store">
										${ensaladas.map(function (pic) {
											return ensalada(pic);
										})}
									</div>
							    </div>
							    <div class="divider separar"></div>
					    	</div>
					    </div>
					</li>
					<li>
				    	<div class="collapsible-header grey lighten-2">
				    		<p class="menu-text padding1 grey-text text-darken-4 center-align">Acompañamientos</p>
				        </div>
				    	<div class="collapsible-body">
				    		<div class="col s12 white">
				    			<div class="row">
				    				<div class="col s12 ajuste-menu-store">
				    	    			${adicionales.map(function (pic) {
				    						return adicional(pic);
				    					})}
				    				</div>
				    			</div>
				    			<div class="divider"></div>
				    			<div class="row top">
				    				<form class="col s12 m6 l4">
					    				<div class="row">
					    					<div class="col s10 offset-s1">
					    						<input type="checkbox" class="filled-in" id="filled-in-box1" />
					    						<label for="filled-in-box1">Bebidas</label>
					    						<img src="bebida.jpg" class="vegetal" />
					    					</div>
					    				</div>
					    				<div class="row">
					    					<div class="input-field col s10 offset-s1">
					    						<select>
					    					    	<option value="" disabled selected>Sabor</option>
					    					    	<option value="1">Coca Cola</option>
					    					    	<option value="2">Fanta</option>
					    					    	<option value="3">Sprite</option>
					    						</select>
					    					</div>
					    				</div>
					    				<div class="row">
					    					<div class="input-field col s10 offset-s1">
					    						<select>
					    					    	<option value="" disabled selected>Tipo</option>
					    					    	<option value="1">Normal</option>
					    					    	<option value="2">Ligth</option>
					    					    	<option value="3">Zero</option>
					    						</select>
					    					</div>
					    				</div>
					    				<div class="row">
					    					<div class="input-field col s10 offset-s1">
					    						<select>
					    					    	<option value="" disabled selected>Tamaño</option>
					    					    	<option value="1">lata</option>
					    					    	<option value="2">500cc</option>
					    					    	<option value="3">1.500cc</option>
					    						</select>
					    					</div>
					    				</div>
					    				<div class="row">
					    					<div class="input-field col s10 offset-s1">
					    						<select>
					    					    	<option value="" disabled selected>Cantidad</option>
					    					    	<option value="1">1</option>
					    					    	<option value="2">2</option>
					    					    	<option value="3">3</option>
					    					    	<option value="3">4</option>
					    						</select>
					    					</div>
					    				</div>
					    				<div class="row">
					    					<div class="col s10 offset-s1 center-align">
					    						<a class="waves-effect waves-light btn blue darken-2">Subir al carro</a>
					    					</div>
					    				</div>
					    				<div class="divider separar hide-on-med-and-up"></div>
					    			</form>
					    			<form class="col s12 m6 l4">
					    				<div class="row">
					    					<div class="col s10 offset-s1">
					    						<input type="checkbox" class="filled-in" id="filled-in-box2" />
					    						<label for="filled-in-box2">Aguas</label>
					    						<img src="agua.jpg" class="vegetal" />
					    					</div>
					    				</div>
					    				<div class="row">
					    					<div class="input-field col s10 offset-s1">
					    						<select>
					    					    	<option value="" disabled selected>Tipo</option>
					    					    	<option value="1">Gasificada</option>
					    					    	<option value="2">Sin Gas</option>
					    					    </select>
					    					</div>
					    				</div>
					    				<div class="row">
					    					<div class="input-field col s10 offset-s1">
					    						<select>
					    					    	<option value="" disabled selected>Tamaño</option>
					    					    	<option value="1">500cc</option>
					    					    	<option value="2">1.500cc</option>
					    					    </select>
					    					</div>
					    				</div>
					    				<div class="row">
					    					<div class="input-field col s10 offset-s1">
					    						<select>
					    					    	<option value="" disabled selected>Cantidad</option>
					    					    	<option value="1">1</option>
					    					    	<option value="2">2</option>
					    					    	<option value="3">3</option>
					    					    	<option value="3">4</option>
					    						</select>
					    					</div>
					    				</div>
					    				<div class="row">
					    					<div class="col s10 offset-s1 center-align">
					    						<a class="waves-effect waves-light btn blue darken-2">Subir al carro</a>
					    					</div>
					    				</div>
					    				<div class="divider separar hide-on-large-only"></div>
					    			</form>
					    			<form class="col s12 m6 l4">
					    				<div class="row">
					    					<div class="col s10 offset-s1">
					    						<input type="checkbox" class="filled-in" id="filled-in-box3" />
					    						<label for="filled-in-box3">Jugos</label>
					    						<img src="jugo.jpg" class="vegetal" />
					    					</div>
					    				</div>
					    				<div class="row">
					    					<div class="input-field col s10 offset-s1">
					    						<select>
					    					    	<option value="" disabled selected>Sabor</option>
					    					    	<option value="1">Naranja</option>
					    					    	<option value="2">Piña</option>
					    					    	<option value="3">Durazno</option>
					    					    </select>
					    					</div>
					    				</div>
					    				<div class="row">
					    					<div class="input-field col s10 offset-s1">
					    						<select>
					    					    	<option value="" disabled selected>Tamaño</option>
					    					    	<option value="1">500cc</option>
					    					    	<option value="2">1.500cc</option>
					    					    </select>
					    					</div>
					    				</div>
					    				<div class="row">
					    					<div class="input-field col s10 offset-s1">
					    						<select>
					    					    	<option value="" disabled selected>Cantidad</option>
					    					    	<option value="1">1</option>
					    					    	<option value="2">2</option>
					    					    	<option value="3">3</option>
					    					    	<option value="3">4</option>
					    						</select>
					    					</div>
					    				</div>
					    				<div class="row">
					    					<div class="col s10 offset-s1 center-align">
					    						<a class="waves-effect waves-light btn blue darken-2">Subir al carro</a>
					    					</div>
					    				</div>
					    			</form>					    			
				    			</div>
				    			<div class="divider separar"></div>
				    		</div>
				    	</div>
				    </li>
				    <li>
				    	<div class="collapsible-header grey lighten-2">
				    		<p class="menu-text padding1 grey-text text-darken-4 center-align">Ofertas</p>
				        </div>
				    	<div class="collapsible-body">
				    	</div>
				    </li>
				</ul>
			</div>
		</div>
	</div>`;

	return layout(el);
}