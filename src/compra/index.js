var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');
var header = require('../header');
var footer = require('../footer');
var request = require('superagent');
var noUiSlider = require('nouislider');
var aPesos = require('../utilities/aPesos');
var wNumb = require('../utilities/aPesos/wNumb')

page('/compra', header, loadCarrito, footer, function (ctx, next) {
	title('Ragustino - Carro');
	var main = document.getElementById('main-container');

	empty(main).appendChild(template(ctx.itemsCarrito));

	function Carrito() {
		this.getCarrito = JSON.parse(localStorage.getItem("carrito"));

		this.getTotal = function() {
			var total = 0;
			for(i of this.getCarrito) {
				total += parseFloat(i.cantidad) * parseFloat(i.price);
			}
			return total;
		}
	}

	function Comprando() {
		this.constructor = function() {
			if(!localStorage.getItem("comprando")){
				localStorage.setItem('comprando','[]');
			}
		}

		this.getComprando = JSON.parse(localStorage.getItem("comprando"));

		this.getDelivey = function() {
			var delivery = 0;
			var checkear = carrito.getTotal();
			for(i of carrito.getCarrito) {
				if(i.id === '900001' || i.id === '900002' || i.id === '900003') {
					var existeOferta = i;
				}
			}
			if(!existeOferta) {
				if(checkear < 30000) {
					delivery += 1900;
				}
			}
			
			return parseFloat(delivery);
		}
	}

	function Comprando_View() {
		this.renderCompra = function() {
			if(carrito.getCarrito.length <= 0) {
				templateNoItemsCompra = `<p>No tienes productos en tu carro</p>`;
				document.getElementById('pintandoCompra').innerHTML = templateNoItemsCompra;
			}
			document.getElementById('deliveryCost').innerHTML = aPesos(comprando.getDelivey())+".-";
			let total = carrito.getTotal() + comprando.getDelivey();
			document.getElementById('totalCompra').innerHTML = aPesos(total)+".-";
		}
	}

	function Programando_Compra() {
		var estaCompra = {};
		this.determinarAbierto = function(año, mes, dia, diaM, hora) {
			if(dia === 1 || dia === 2 || dia === 3) {
				document.getElementById('paraAhora').classList.toggle('hide');
				document.getElementById('templateParaAhora').innerHTML = `<div class="center-align blue-text text-darken-2">
					<p>Lo sentimos, hoy no atendemos</p>
					<p class="horariosCompra" >Nuestros Horarios</p>
					<p class="horariosCompra" >Jueves 18:00 - 0:00</p>
					<p class="horariosCompra" >Viernes 18:00 - 1:00</p>
					<p class="horariosCompra" >Sábados 18:00 - 1:00</p>
					<p class="horariosCompra" >Domingos 13:00 - 19:00</p>
				</div>`;
			}else{
				if(dia === 4) {
					if(hora >= 18 && hora <= 23) {
						programando_compra.tiendaAbierta(año, mes, diaM);
					}else{
						document.getElementById('paraAhora').classList.toggle('hide');
						document.getElementById('templateParaAhora').innerHTML = `<p class="blue-text text-darken-2">Lo sentimos, hoy atendemos de 18:00 a 00:00 horas</p>`;
					}
				}
				if(dia === 5 || dia === 6) {
					if(hora >= 18 && hora <= 24) {
						programando_compra.tiendaAbierta(año, mes, diaM);
					}else{
						document.getElementById('paraAhora').classList.toggle('hide');
						document.getElementById('templateParaAhora').innerHTML = `<p class="blue-text text-darken-2">Lo sentimos, hoy atendemos de 18:00 a 01:00 horas</p>`;
					}
				}
				if(dia === 0) {
					if(hora >= 13 && hora <= 18) {
						programando_compra.tiendaAbierta(año, mes, diaM);
					}else{
						document.getElementById('paraAhora').classList.toggle('hide');
						document.getElementById('templateParaAhora').innerHTML = `<p class="blue-text text-darken-2">Lo sentimos, hoy atendemos de 13:00 a 19:00 horas</p>`;
					}
				}
			}
		}

		this.tiendaAbierta = function(año, mes, diaM) {
			document.getElementById('paraAhora').classList.toggle('hide');
			document.getElementById('templateParaAhora').innerHTML = `<div class="container">
				<div class="row">
					<div class="col s12 center-align">
						<i class="medium material-icons blue-text text-darken-2">check</i>
					</div>
				</div>
				<div id="contConfirmar" class="row nobottom">
					<div class="col s12 center-align">
						<a href="#" id="confirmandoAhora" class="waves-effect waves-light btn blue darken-2">Confirmar</a>
					</div>
				</div>
			</div>`;
			document.getElementById('confirmandoAhora').addEventListener("click", function(ev) {
				ev.preventDefault();
				document.getElementById('listaMasTarde').classList.toggle('hide');
				document.getElementById('listaOtroDia').classList.toggle('hide');
				document.getElementById('contConfirmar').classList.toggle('hide');
				programando_compra.setearAhora(año, mes, diaM);
			})
		}

		this.setearAhora = function(año, mes, diaM) {
			estaCompra.delivery = '1';
			estaCompra.año = año;
			estaCompra.mes = mes;
			estaCompra.diam = diaM;
		}

		this.programandoHoy = function(año, mes, dia, diaM, hora, minuto) {
			if(dia === 1 || dia === 2 || dia === 3) {
				document.getElementById('masTarde').classList.toggle('hide');
				document.getElementById('templateMasTarde').innerHTML = `<div class="center-align blue-text text-darken-2">
					<p>Lo sentimos, hoy no atendemos</p>
					<p class="horariosCompra" >Nuestros Horarios</p>
					<p class="horariosCompra" >Jueves 18:00 - 0:00</p>
					<p class="horariosCompra" >Viernes 18:00 - 1:00</p>
					<p class="horariosCompra" >Sábados 18:00 - 1:00</p>
					<p class="horariosCompra" >Domingos 13:00 - 19:00</p>
				</div>`;
			}else{
				if(dia === 5 || dia === 6) {
					document.getElementById('masTarde').classList.toggle('hide');
					document.getElementById('textoMasTarde').classList.toggle('hide');
					document.getElementById('rangeMasTarde').classList.toggle('hide');
					
					var sliderH = document.getElementById('slider-hora');
					noUiSlider.create(sliderH, {
						start: [ 18 ],
						connect: [false, true],
						step: 1,
						range: {
							'min': 18,
							'max': 24
						},
						format: wNumb({
							decimals: 0
						})
					});
					
					var sliderHValueElement = document.getElementById('slider-hora-value');
					sliderH.noUiSlider.on('update', function(val){
						sliderHValueElement.innerHTML = val;
					});

					var sliderM = document.getElementById('slider-minutos');
					noUiSlider.create(sliderM, {
						start: [ 10 ],
						connect: [false, true],
						step: 5,
						range: {
							'min': 0,
							'max': 59
						},
						format: wNumb({
							decimals: 0
						})
					});
					
					var sliderMValueElement = document.getElementById('slider-minutos-value');
					sliderM.noUiSlider.on('update', function(val){
						sliderMValueElement.innerHTML = val;
					});
				}
				if(dia === 4) {
					document.getElementById('masTarde').classList.toggle('hide');
					document.getElementById('textoMasTarde').classList.toggle('hide');
					document.getElementById('rangeMasTarde').classList.toggle('hide');
					
					var sliderH = document.getElementById('slider-hora');
					noUiSlider.create(sliderH, {
						start: [ 18 ],
						connect: [false, true],
						step: 1,
						range: {
							'min': 18,
							'max': 23
						},
						format: wNumb({
							decimals: 0
						})
					});
					
					var sliderHValueElement = document.getElementById('slider-hora-value');
					sliderH.noUiSlider.on('update', function(val){
						sliderHValueElement.innerHTML = val;
					});

					var sliderM = document.getElementById('slider-minutos');
					noUiSlider.create(sliderM, {
						start: [ 10 ],
						connect: [false, true],
						step: 5,
						range: {
							'min': 0,
							'max': 59
						},
						format: wNumb({
							decimals: 0
						})
					});
					
					var sliderMValueElement = document.getElementById('slider-minutos-value');
					sliderM.noUiSlider.on('update', function(val){
						sliderMValueElement.innerHTML = val;
					});
				}
				if(dia === 0) {
					document.getElementById('masTarde').classList.toggle('hide');
					document.getElementById('textoMasTarde').classList.toggle('hide');
					document.getElementById('rangeMasTarde').classList.toggle('hide');
					
					var sliderH = document.getElementById('slider-hora');
					noUiSlider.create(sliderH, {
						start: [ 13 ],
						connect: [false, true],
						step: 1,
						range: {
							'min': 13,
							'max': 18
						},
						format: wNumb({
							decimals: 0
						})
					});
					
					var sliderHValueElement = document.getElementById('slider-hora-value');
					sliderH.noUiSlider.on('update', function(val){
						sliderHValueElement.innerHTML = val;
					});

					var sliderM = document.getElementById('slider-minutos');
					noUiSlider.create(sliderM, {
						start: [ 10 ],
						connect: [false, true],
						step: 5,
						range: {
							'min': 0,
							'max': 59
						},
						format: wNumb({
							decimals: 0
						})
					});
					
					var sliderMValueElement = document.getElementById('slider-minutos-value');
					sliderM.noUiSlider.on('update', function(val){
						sliderMValueElement.innerHTML = val;
					});
				}
			}
			document.getElementById('confirmandoMasTarde').addEventListener("click", function(ev) {
				ev.preventDefault();
				var checkHora = hora + 1;
				if(minuto < 30) {
					if(sliderH.noUiSlider.get() <= hora) {
						alert("Nos parece que estás programando tu entrega para muy pronto, deberás escoger la opción de Tan pronto sea posible.");
					}else{
						var horaP = sliderH.noUiSlider.get();
						var minP = sliderM.noUiSlider.get();
						programando_compra.programarOk(año, mes, diaM, horaP, minP);
					}
				}else{
					if(sliderH.noUiSlider.get() > checkHora) {
						var horaP = sliderH.noUiSlider.get();
						var minP = sliderM.noUiSlider.get();
						programando_compra.programarOk(año, mes, diaM, horaP, minP);
					}else{
						if(sliderH.noUiSlider.get() > hora) {
							if(sliderM.noUiSlider.get() < 30) {
								alert("Nos parece que estás programando tu entrega para muy pronto, deberás escoger la opción de Tan pronto sea posible.");		
							}else{
								var horaP = sliderH.noUiSlider.get();
								var minP = sliderM.noUiSlider.get();
								programando_compra.programarOk(año, mes, diaM, horaP, minP);
							}
						}else{
							alert("Nos parece que estás programando tu entrega para muy pronto, deberás escoger un horario valido");		
						}
					}
					
				}
			})
		}

		this.programarOk = function(año, mes, diaM, horaP, minP) {
			document.getElementById('listaAhora').classList.toggle('hide');
			document.getElementById('listaOtroDia').classList.toggle('hide');
			document.getElementById('rangeContainer').classList.toggle('hide');
			document.getElementById('confirmandoMasTarde').classList.toggle('hide');
			programando_compra.setearHoy(año, mes, diaM, horaP, minP);
		}

		this.setearHoy = function(año, mes, diaM, horaP, minP) {
			estaCompra.delivery = '2';
			estaCompra.año = año;
			estaCompra.mes = mes;
			estaCompra.diam = diaM;
			estaCompra.horap = horaP;
			estaCompra.minutop = minP;
		}

		this.setearOtro = function(fechaP, diaP, horaP, minP, año, mes, diaM) {
			if(diaP <= diaM) {
				alert("Debes programar un día a partir de mañana");
			}else{
				if(!fechaP) {
					alert("Tienes que seleccionar la fecha de entrega");
					return
				}
				
				if(!horaP) {
					alert("Tienes que seleccionar la hora de entrega");
					return
				}

				if(!minP) {
					alert("Tienes que seleccionar el minuto de entrega");
					return
				}

				document.getElementById('listaAhora').classList.toggle('hide');
				document.getElementById('listaMasTarde').classList.toggle('hide');
				document.getElementById('texto1OtroDia').classList.toggle('hide');
				document.getElementById('texto2OtroDia').classList.toggle('hide');
				document.getElementById('texto3OtroDia').classList.toggle('hide');
				document.getElementById('paraOtro').classList.toggle('hide');
				estaCompra.delivery = '3';
				estaCompra.año = año;
				estaCompra.mes = mes;
				estaCompra.diam = diaM;
				estaCompra.fechap = fechaP;
				estaCompra.horap = horaP;
				estaCompra.minutop = minP;
			}
		}

		this.formaPago = function(pago) {
			if(pago == 1) {
				estaCompra.pago = pago;
				document.getElementById('pagoRedb').classList.toggle('hide');
				document.getElementById('pagoTran').classList.toggle('hide');
				document.getElementById('botonEfec').classList.toggle('hide');
				document.getElementById('tempEfec').innerHTML = `<i class="medium material-icons blue-text text-darken-2">check</i>`;
			}

			if(pago == 2) {
				estaCompra.pago = pago;
				document.getElementById('pagoEfec').classList.toggle('hide');
				document.getElementById('pagoTran').classList.toggle('hide');
				document.getElementById('botonRedb').classList.toggle('hide');
				document.getElementById('tempRedb').innerHTML = `<i class="medium material-icons blue-text text-darken-2">check</i>`;
			}

			if(pago == 3) {
				estaCompra.pago = pago;
				document.getElementById('pagoEfec').classList.toggle('hide');
				document.getElementById('pagoRedb').classList.toggle('hide');
				document.getElementById('botonTran').classList.toggle('hide');
				document.getElementById('tempTran').innerHTML = `<i class="medium material-icons blue-text text-darken-2">check</i>`;
			}
		}

		this.setearDatos = function(client, address, email, fono) {
			if(!client) {
				alert("Debes ingresar nombre y apellido");
				return
			}

			if(!address) {
				alert("Debes ingresar tu dirección");
				return
			}

			if(!email) {
				alert("Debes ingresar tu correo electrónico");
				return
			}

			if(!fono) {
				alert("Debes ingresar tu número de teléfono");
				return
			}

			estaCompra.client = client;
			estaCompra.address = address;
			estaCompra.email = email;
			estaCompra.fono = fono;
			estaCompra.repartidor = '';
			estaCompra.cocina = 0;
			estaCompra.reparto = 0;
			estaCompra.ok = 0; 
			document.getElementById('formCompra').classList.toggle('hide');
			document.getElementById('contFormCompra').innerHTML = `<div class="row">
				<div class="col s12 center-align">
					<p>${client}</p>
					<p>${address}</p>
					<p>${email}</p>
					<p>${fono}</p>
				</div>	
			</div>`;
		}

		this.setearFinal = function(hora, minuto) {
			if(!estaCompra.año) {
				alert("Debes programar tu entrega para ahora o después.");
				return
			}
			
			if(!estaCompra.pago) {
				alert("Debes seleccionar tu forma de pago");
				return	
			}

			if(!estaCompra.client) {
				alert("Debes ingresar tus datos");
				return	
			}

			estaCompra.hora = hora;
			estaCompra.minuto = minuto;
			estaCompra.content = [];
			estaCompra.monto = carrito.getTotal() + comprando.getDelivey();
			estaCompra.content.push(JSON.parse(localStorage.getItem("carrito")));
			var data = JSON.stringify(estaCompra);
			request
				.post('https://www.ragustino.cl/js/Compra.php')
				.send('datos=' +data)
				.end(function(err, res) {
					alert("Gracias por tu preferencia, estamos procesando tu compra");
					localStorage.clear();
					page.redirect('/');
				})
		}
	}

	var carrito = new Carrito();
	var comprando = new Comprando();
	var comprando_view = new Comprando_View();
	var programando_compra = new Programando_Compra();

	$(document).ready(function(){
		$('.collapsible').collapsible();
		$('select').material_select();
		$('.datepicker').pickadate({
			selectMonths: true,
			selectYears: 1,
			today: 'Hoy',
			clear: 'Limpiar',
			close: 'Ok',
			closeOnSelect: false,
			container: undefined,
		});
		comprando_view.renderCompra();
		comprando.constructor();

		document.getElementById('finalizando').addEventListener("click", function(ev) {
			ev.preventDefault();
			var hoy = new Date();
			var año = hoy.getFullYear();
			var mes = hoy.getMonth();
			var dia = hoy.getDay();
			var diaM = hoy.getDate();
			if(ev.target.id === "paraAhora") {
				var hora = hoy.getHours();
				programando_compra.determinarAbierto(año, mes, dia, diaM, hora);
			}

			if(ev.target.id === "masTarde") {
				var hora = hoy.getHours();
				var minuto = hoy.getMinutes();
				programando_compra.programandoHoy(año, mes, dia, diaM, hora, minuto);
			}

			if(ev.target.id === "paraOtro") {
				var fechaP = document.getElementById("fechaOtro").value;
				var diaP = document.getElementById("fechaOtro").value[0] + document.getElementById("fechaOtro").value[1];
				var horaP = document.getElementById("horaOtro").value;
				var minP = document.getElementById("minOtro").value;
				programando_compra.setearOtro(fechaP, diaP, horaP, minP, año, mes, diaM);
			}

			if(ev.target.id === "botonEfec" || ev.target.id === "botonRedb" || ev.target.id === "botonTran") {
				var pago = ev.target.dataset.pago;
				programando_compra.formaPago(pago);
				
			}

			if(ev.target.id === "confDatos") {
				var client = document.getElementById("nomCompra").value;
				var address = document.getElementById("dirCompra").value;
				var email = document.getElementById("mailCompra").value;
				var fono = document.getElementById("fonoCompra").value;
				programando_compra.setearDatos(client, address, email, fono);
			}

			if(ev.target.id === "compraFinal") {
				var hora = hoy.getHours();
				var minuto = hoy.getMinutes();
				programando_compra.setearFinal(hora, minuto);
			}
		})
	});
});

function loadCarrito (ctx, next) {
	var itemsCarrito = JSON.parse(localStorage.getItem("carrito"));
	ctx.itemsCarrito = itemsCarrito;
	next();
}