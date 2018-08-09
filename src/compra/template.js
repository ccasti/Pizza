var yo = require('yo-yo');
var layout = require('../layout');
var itemS = require('./products/itemSingle');
var itemP = require('./products/itemPack');
var itemC = require('./products/itemCustom');
var itemO = require('./products/itemOferta');

module.exports = function (itemsCarrito) {
	var singles = itemsCarrito.filter(function(obj) {
		if(!obj.excep && !obj.custom && !obj.oferta) {
			return true;
		}else{
			return false;
		}
	});
	var packs = itemsCarrito.filter(function(obj) {
		if(obj.excep) {
			return true;
		}else{
			return false;
		}
	});
	var customs = itemsCarrito.filter(function(obj) {
		if(obj.custom) {
			return true;
		}else{
			return false;
		}
	});
	
	var ofertas = itemsCarrito.filter(function(obj) {
		if(obj.oferta) {
			return true;
		}else{
			return false;
		}
	});

	var el = yo`<div id="finalizando" class="col s12 seccion">
		<div class="row nobottom">
			<div class="col s12 center-align">
				<h3 class="compraTit">RAGUSTINO FOOD EXPERIENCE</h3>
			</div>
		</div>
		<div class="row nobottom">
			<div class="col s12 center-align">
				<p class="detalleCompra">Detalle de tu compra</p>
			</div>
		</div>
		<div class="row nobottom">
			<div id="pintandoCompra" class="col s12 center-align">
			</div>
		</div>
		<div class="row nobottom">
			<div class="col s12 m6 offset-m3">
				${singles.map(function (pic) {
					return itemS(pic);
				})}
			</div>
		</div>
		<div class="row nobottom">
			<div class="col s12 m6 offset-m3">
				${packs.map(function (pic) {
					return itemP(pic);
				})}
			</div>
		</div>
		<div class="row nobottom">
			<div class="col s12 m6 offset-m3">
				${customs.map(function (pic) {
					return itemC(pic);
				})}
			</div>
		</div>
		<div class="row nobottom">
			<div class="col s12 m6 offset-m3">
				${ofertas.map(function (pic) {
					return itemO(pic);
				})}
			</div>
		</div>
		<div class="row">
			<div class="col s12 m6 offset-m3">
				<div class="row itemComprando">
					<div class="col s9">
						<i class="tiny material-icons">motorcycle</i>Delivery
					</div>
					<div id="deliveryCost" class="col s3 right-align">
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col s12 m6 offset-m3">
				<div class="row itemComprando totales">
					<div class="col s8">
						Total Compra
					</div>
					<div id="totalCompra" class="col s4 right-align">
					</div>
				</div>
			</div>
		</div>
		<div class="row nobottom">
			<div class="col s12 center-align">
				<p class="programarCompra">Programa la Entrega</p>
			</div>
		</div>
		<div class="row">
			<div class="col s10 offset-s1 m4 offset-m4">
				<ul class="collapsible" class="">
					<li id="listaAhora">
						<div class="collapsible-header">Tan pronto sea posible</div>
						<div id="templateParaAhora" class="collapsible-body center-align">
							<a href="#" id="paraAhora" class="waves-effect waves-light btn blue darken-2">Consultar</a>
						</div>
					</li>
					<li id="listaMasTarde" class="">
						<div class="collapsible-header">Para más tarde</div>
						<div id="templateMasTarde" class="collapsible-body center-align">
							<a href="#" id="masTarde" class="waves-effect waves-light btn blue darken-2">Consultar</a>
							<div id="textoMasTarde" class="hide row">
								<div class="col s12 center-align">
									<p class="blue-text text-darken-2">Selecciona Hora y Minutos</p>
								</div>
							</div>
							<div id="rangeMasTarde" class="hide row nobottom">
								<div class="col s12 center-align">
									<div id="rangeContainer" class="row">
										<div class="col s12 center-align">
											<div id="slider-hora"></div>
											<div class="separador" id="slider-minutos"></div>
										</div>
									</div>
									<div class="row">
										<div class="col s12 center-align">
											<span id="slider-hora-value"></span>:<span id="slider-minutos-value"></span> hrs.
										</div>
									</div>
									<div class="row">
										<div class="col s12 center-align">
											<a href="#" id="confirmandoMasTarde" class="waves-effect waves-light btn blue darken-2">Confirmar</a>
										</div>
									</div>
								</div>
							</div>	
						</div>
					</li>
					<li id="listaOtroDia" class="">
						<div class="collapsible-header">Para otro día</div>
						<div class="collapsible-body">
							<div id="texto1OtroDia" class="row nobottom">
								<div class="col s12 center-align">
									<p class="blue-text text-darken-2">Indicanos la fecha de entrega. Recuerda que sólo atendemos de Jueves a Domingo</p>
								</div>
							</div>
							<div class="row nobottom">
								<div class="col s6 offset-s3">
									<input id="fechaOtro" type="text" class="datepicker fechaFinal">
								</div>
							</div>
							<div id="texto2OtroDia" class="row nobottom">
								<div class="col s12 center-align">
									<p class="blue-text text-darken-2">Indicanos la hora de entrega. Chequea nuestros horarios de atención</p>
								</div>
							</div>
							<div class="row nobottom">
								<div class="col s6 offset-s3 center-align">
									<div id="" class="row nobottom">
										<div class="input-field col s5 horaFutura">
											<select id="horaOtro">
												<option value="" disabled selected>Hora</option>
												<option value="13">13</option>
												<option value="14">14</option>
												<option value="15">15</option>
												<option value="16">16</option>
												<option value="17">17</option>
												<option value="18">18</option>
												<option value="19">19</option>
												<option value="20">20</option>
												<option value="21">21</option>
												<option value="22">22</option>
												<option value="23">23</option>
												<option value="24">24</option>
											</select>
										</div>
										<div class="col s2 center-align separadorHora">
											<span>:</span>
										</div>
										<div class="input-field col s5 horaFutura">
											<select id="minOtro">
												<option value="" disabled selected>Min.</option>
												<option value="0">00</option>
												<option value="10">10</option>
												<option value="20">20</option>
												<option value="30">30</option>
												<option value="40">40</option>
												<option value="50">50</option>
											</select>
										</div>
									</div>
								</div>
							</div>
							<div id="texto3OtroDia" class="row">
								<div class="col s12 center-align">
									<p class="blue-text text-darken-2">Nuestro administrador se contactará contigo para confirmar factibilidad.</p>
								</div>
							</div>
							<div class="row">
								<div class="col s12 center-align">
									<a href="#" id="paraOtro" class="waves-effect waves-light btn blue darken-2">Confirmar</a>
								</div>
							</div>
						</div>
					</li>					
				</ul>
			</div>
		</div>
		<div id="contFormCompra" class="">
			<div id="formCompra" class="form">
				<div class="row nobottom">
					<div class="col s12 center-align">
						<p class="programarCompra">Ingresa tus datos</p>
					</div>
				</div>
				<div class="row nobottom">
					<div class="input-field col s10 offset-s1 m4 offset-m4">
						<input id="nomCompra" type="text" class="validate formDefault">
						<label for="nomCompra">Nombre y Apellido</label>
					</div>
				</div>
				<div class="row nobottom">
					<div class="input-field col s10 offset-s1 m4 offset-m4">
						<input id="dirCompra" type="text" class="validate formDefault">
						<label for="dirCompra">Dirección</label>
					</div>
				</div>
				<div class="row nobottom">
					<div class="input-field col s10 offset-s1 m4 offset-m4">
						<input id="mailCompra" type="email" class="validate formDefault">
						<label for="mailCompra">Email</label>
					</div>
				</div>
				<div class="row">
					<div class="input-field col s10 offset-s1 m4 offset-m4">
						<input id="fonoCompra" type="tel" class="validate formDefault">
						<label for="fonoCompra">Teléfono</label>
					</div>
				</div>
				<div class="row">
					<div id="" class="col s12 center-align">
						<a href="#" id="confDatos" class="waves-effect waves-light btn blue darken-2">Confirmar Datos</a>
					</div>
				</div>
			</div>
		</div>
		<div class="row nobottom">
			<div class="col s12 center-align">
				<p class="programarCompra">Forma de Pago</p>
			</div>
		</div>
		<div class="row">
			<div class="col s10 offset-s1 m4 offset-m4">
				<ul class="collapsible" class="">
					<li id="pagoEfec">
						<div class="collapsible-header">Pago en Efectivo</div>
						<div class="collapsible-body center-align">
							<div class="row">
								<div id="tempEfec" class="col s12 center-align">	
									<a href="#" id="botonEfec" class="waves-effect waves-light btn blue darken-2" data-pago="1">Confirmar</a>
								</div>
							</div>
						</div>
					</li>
					<li id="pagoRedb" class="">
						<div class="collapsible-header">Pago Redbank</div>
						<div id="tempRedb" class="collapsible-body center-align">
							<a href="#" id="botonRedb" class="waves-effect waves-light btn blue darken-2" data-pago="2">Confirmar</a>
						</div>
					</li>
					<li id="pagoTran" class="">
						<div class="collapsible-header">Transferencia</div>
						<div class="collapsible-body">
							<div class="row">
								<div class="col s12 center-align blue-text text-darken-2">
									<p>Nuestros datos:</p>
									<p class="horariosCompra" >Cuenta Corriente N° 1300242665</p>
									<p class="horariosCompra" >Banco Estado</p>
									<p class="horariosCompra" >Rut: 76.830.997-3</p>
									<p class="horariosCompra" >Servicios Gastronómicos GRC Ltda.</p>
								</div>
							</div>
							<div class="row">
								<div class="col s12 center-align">
									<p class="blue-text text-darken-2">Una vez confirmada la transferencia procesaremos tu pedido.</p>
								</div>
							</div>
							<div class="row">
								<div id="tempTran" class="col s12 center-align">
									<a href="#" id="botonTran" class="waves-effect waves-light btn blue darken-2" data-pago="3">Confirmar</a>
								</div>
							</div>
						</div>
					</li>					
				</ul>
			</div>
		</div>
		<div class="row">
			<div class="col s12 center-align">
				<a href="#" id="compraFinal" class="waves-effect waves-light btn blue darken-2">Comprar</a>
			</div>
		</div>
	</div>`;

	return layout(el);
}