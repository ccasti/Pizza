var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');
var header = require('../header');
var footer = require('../footer');
var request = require('superagent');

page('/carta',
	header,
	loadPizzas,
	loadVegetales,
	loadCarnes,
	loadCalzones,
	loadPiadinas,
	loadPacks,
	loadItems,
	footer,

	function (ctx, next) {
	title('Ragustino - Carta');
	var main = document.getElementById('main-container');

	empty(main).appendChild(template(
		ctx.pizzas,
		ctx.vegetales,
		ctx.carnes,
		ctx.calzones,
		ctx.piadinas,
		ctx.packs,
		ctx.items
	));

	function Carrito() {
		this.constructor = function() {
			if(!localStorage.getItem("carrito")){
				localStorage.setItem('carrito','[]');
			}
		}
			
		this.getCarrito = JSON.parse(localStorage.getItem("carrito"));
			
		this.agregarItem = function() {

		}
	}
		
	var carrito = new Carrito();

	$(document).ready(function(){
		$('.collapsible').collapsible();
		$('select').material_select();
		
		carrito.constructor();

		document.getElementById('catalogo').addEventListener("click", function(ev) {
			ev.preventDefault();
			if(ev.target.id === "addItem"){
				var item = ev.path[0].dataset;
				console.log(item);
			}
		});
	});
});

function loadPizzas (ctx, next) {
	request
		.get('/api/pizzas')
		.end(function (err, res) {
			if (err) return console.log(err);

			ctx.pizzas = res.body;
			next();
		})
}

function loadVegetales (ctx, next) {
	request
		.get('/api/vegetales')
		.end(function (err, res) {
			if (err) return console.log(err);

			ctx.vegetales = res.body;
			next();
		})
}

function loadCarnes (ctx, next) {
	request
		.get('/api/carnes')
		.end(function (err, res) {
			if (err) return console.log(err);

			ctx.carnes = res.body;
			next();
		})
}

function loadCalzones (ctx, next) {
	request
		.get('/api/calzones')
		.end(function (err, res) {
			if (err) return console.log(err);

			ctx.calzones = res.body;
			next();
		})
}

function loadPiadinas (ctx, next) {
	request
		.get('/api/piadinas')
		.end(function (err, res) {
			if (err) return console.log(err);

			ctx.piadinas = res.body;
			next();
		})
}

function loadPacks (ctx, next) {
	request
		.get('/api/packs')
		.end(function (err, res) {
			if (err) return console.log(err);

			ctx.packs = res.body;
			next();
		})
}

function loadItems (ctx, next) {
	request
		.get('/api/items')
		.end(function (err, res) {
			if (err) return console.log(err);

			ctx.items = res.body;
			next();
		})
}