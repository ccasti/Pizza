var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');
var header = require('../headerTest');
var footer = require('../footer');

page('/', header, footer, function (ctx, next) {
	title('Ragustino');
	var main = document.getElementById('main-container');

	empty(main).appendChild(template());

	function Carrito() {
		this.constructor = function() {
			if(!localStorage.getItem("carrito")){
				localStorage.setItem('carrito','[]');
			}
		}

		this.getCarrito = JSON.parse(localStorage.getItem("carrito"));

		this.getTotal = function() {
			var total = 0;
			for(i of JSON.parse(localStorage.getItem("carrito"))) {
				total += parseFloat(i.cantidad) * parseFloat(i.price);
			}
			return total;
		}

		this.eliminarItem = function(item) {
			for(var i in this.getCarrito) {
				if(this.getCarrito[i].id === item) {
					this.getCarrito.splice(i,1);
				}
			}
			localStorage.setItem("carrito",JSON.stringify(this.getCarrito));
		}

		this.iraComprar = function() {
			if(this.getCarrito.length <= 0) {
				alert("No tienes productos en tu carro");
				return
			}else{
				$('#modal9').modal('close');
				page.redirect('/compra');
			}
		}
	}

	function Carrito_View() {
		this.renderCarrito = function() {
			if(JSON.parse(localStorage.getItem("carrito")).length <= 0) {
				templateNoItems = `<div class="row">
					<div class="col s12 center-align">
						No tienes productos en tu carro
					</div>
				</div>`;
				document.getElementById('productosCarrito').innerHTML = templateNoItems;
			}else{
				templateItems = ``;
				for(i of carrito.getCarrito) {
					templateItems += `<li class="collection-item">
						<div class="row itemCarrito">
							<div class="col s8 m4">
								${i.name}
							</div>
							<div class="col s4 m2 center-align">
								$${i.price}
							</div>
							<div class="col s3 offset-s3 m2 center-align">
								${i.cantidad}
							</div>
							<div class="col s3 m2 center-align">
								${i.cantidad * i.price}
							</div>
							<div class="col s3 m2 center-align">
								<a href="#"><i class="material-icons iconoBorrar" id="deleteItem" data-id="${i.id}">delete_forever</i></a>
							</div>
						</div>
					</li>`;
				}
				document.getElementById('productosCarrito').innerHTML = templateItems;
			}
			document.getElementById('totalCarrito').innerHTML = "$ "+carrito.getTotal();
		}

		this.totalProductos = function() {
			var total = JSON.parse(localStorage.getItem("carrito")).length;
			document.getElementById('totalProductos').innerHTML = total;
		}
	}
	
	function Armar_Pizza() {
		this.constructor = function() {
			if(!localStorage.getItem("ingredientes")){
				localStorage.setItem('ingredientes','[]');
			}else{
				if(this.getIngredientes.length > 0) {
					localStorage.setItem('ingredientes','[]');
				}
			}
		}
		this.getIngredientes = JSON.parse(localStorage.getItem("ingredientes"));
	}

	function Comprando() {
		this.constructor = function() {
			if(!localStorage.getItem("comprando")){
				localStorage.setItem('comprando','[]');
			}
		}
	}

	var carrito = new Carrito();
	var carrito_view = new Carrito_View();
	var armar_pizza = new Armar_Pizza();
	var comprando = new Comprando();
	
	$(document).ready(function(){
		carrito.constructor();
		comprando.constructor();
		armar_pizza.constructor();
		carrito_view.renderCarrito();
		
		document.getElementById('productosCarrito').addEventListener("click", function(ev) {
			ev.preventDefault();
			if(ev.target.id === "deleteItem") {
				carrito.eliminarItem(ev.target.dataset.id);
				Materialize.toast('Se eliminó un producto', 2500, 'rounded')
				carrito_view.renderCarrito();
				carrito_view.totalProductos();
			}
		});

		document.getElementById('comprando').addEventListener("click", function(ev) {
			ev.preventDefault();
			carrito.iraComprar();
		})
	});
});