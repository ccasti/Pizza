var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');
var header = require('../header');
var footer = require('../footer');
var noUiSlider = require('nouislider');

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
			if(checkear < 30000) {
				delivery += 1500;
			}
			return parseFloat(delivery);
		}

		this.crearCompra = function() {
			if(!this.getComprando.length > 0) {
				let compra = {
					cliente: '',
					direccion: '',
					mail: '',
					fono: '',
					content: [],
					monto: '',
					pago: '',
					delivery: '',
					repartidor: '',
					fecha: '',
					hora: '',
					minutos: '',
					cocina: false,
					reparto: false,
					ok: false
				};
				console.log(compra);
				this.getComprando.push(compra);
				localStorage.setItem("comprando",JSON.stringify(this.getComprando));
				console.log(this.getComprando);
			}
		}
	}

	function Comprando_View() {
		this.renderCompra = function() {
			document.getElementById('todoHeader').classList.toggle('hide');
			if(carrito.getCarrito.length <= 0) {
				templateNoItemsCompra = `<p>No tienes productos en tu carro</p>`;
				document.getElementById('pintandoCompra').innerHTML = templateNoItemsCompra;
			}
			document.getElementById('deliveryCost').innerHTML = "$ "+comprando.getDelivey();
			let total = carrito.getTotal() + comprando.getDelivey();
			document.getElementById('totalCompra').innerHTML = "$ "+total;
		}
	}

	function Programando_Compra() {
		this.determinarAbierto = function(dia, hora) {
			if(dia === 1 || dia === 0 || dia === 3) {
				document.getElementById('paraAhora').classList.toggle('hide');
				document.getElementById('templateParaAhora').innerHTML = `<p class="blue-text text-darken-2">Lo sentimos, hoy no atendemos :-(</p>`;
			}else{
				if(dia === 2) {
					if(/*hora > 13 && */hora < 20) {
						programando_compra.tiendaAbierta();
					}else{
						document.getElementById('paraAhora').classList.toggle('hide');
						document.getElementById('templateParaAhora').innerHTML = `<p class="blue-text text-darken-2">Lo sentimos, atendemos de 13:00 a 20:00 horas ;-)</p>`;
					}
				}
				if(dia === 4) {
					if(hora > 18 && hora < 24) {
						programando_compra.tiendaAbierta();
					}else{
						document.getElementById('paraAhora').classList.toggle('hide');
						document.getElementById('templateParaAhora').innerHTML = `<p class="blue-text text-darken-2">Lo sentimos, atendemos de 18:00 a 00:00 horas ;-)</p>`;
					}
				}
				if(dia === 5 || dia === 6) {
					if(hora > 0 && hora < 18) {
						document.getElementById('paraAhora').classList.toggle('hide');
						document.getElementById('templateParaAhora').innerHTML = `<p class="blue-text text-darken-2">Lo sentimos, atendemos de 18:00 a 00:00 horas ;-)</p>`;
					}else{
						programando_compra.tiendaAbierta();
					}
				}
			}
		}

		this.tiendaAbierta = function() {
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
				comprando.crearCompra();
				var chequeando = comprando.getComprando;
				chequeando[0].delivery = 'ahora';
				console.log(chequeando);
			})
		}

		this.programandoHoy = function(dia, hora) {
			if(dia === 0 || dia === 2 || dia === 3) {
				document.getElementById('templateMasTarde').innerHTML = `<p class="blue-text text-darken-2">Lo sentimos, hoy no atendemos :-(</p>`;
			}else{
				/*document.getElementById('templateMasTarde').innerHTML = ``;*/
				if(dia === 1) {
					var sliderH = document.getElementById('sliderHora');
					/*var sliderHoraValue = document.getElementById('sliderHora-span');*/

					noUiSlider.create(sliderH, {
						start: 13,
						step: 1,
						orientation: 'horizontal',
						range: {
							min: 13,
							max: 20
						}/*,
						format: wNumb({
							decimals: 0
						})*/
					});
					
					/*sliderHora.noUiSlider.on('update', function(sliderHoraValue, sliderHora){
						sliderHoraValue.innerHTML = sliderHoraValue[sliderHora];
					});*/

					/*var sliderMinutos = document.getElementById('sliderMinutos');
					var sliderMinutosValue = document.getElementById('sliderMinutos-span');
					noUiSlider.create(sliderMinutos, {
						start: 1,

						animate: false,
						step: 5,
						orientation: 'horizontal',
						range: {
							min: 0,
							max: 60
						}
					});
					sliderMinutos.noUiSlider.on('update', function(sliderMinutosValue, sliderMinutos){
						sliderMinutosValue.innerHTML = sliderMinutosValue[sliderMinutos];
					});*/
				}
			}
		}
	}

	var carrito = new Carrito();
	var comprando = new Comprando();
	var comprando_view = new Comprando_View();
	var programando_compra = new Programando_Compra();

	$(document).ready(function(){
		$('.collapsible').collapsible();
		comprando_view.renderCompra();
		comprando.constructor();
		
		document.getElementById('paraAhora').addEventListener("click", function(ev) {
			ev.preventDefault();
			var hoy = new Date();
			var dia = hoy.getDay();
			var hora = hoy.getHours();
			programando_compra.determinarAbierto(dia, hora);
		});

		document.getElementById('listaMasTarde').addEventListener("click", function(ev) {
			var hoy = new Date();
			var dia = hoy.getDay();
			var hora = hoy.getHours();
			programando_compra.programandoHoy(dia, hora);
		})
	});
});

function loadCarrito (ctx, next) {
	var itemsCarrito = JSON.parse(localStorage.getItem("carrito"));
	ctx.itemsCarrito = itemsCarrito;
	next();
}