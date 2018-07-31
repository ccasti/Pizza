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
	var armar_pizza = new Armar_Pizza();
	var comprando = new Comprando();
	
	$(document).ready(function(){
		carrito.constructor();
		comprando.constructor();
		armar_pizza.constructor();
	});
});