var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');
var header = require('../layout/header');
var request = require('superagent');

page('/carta',
	header,
	loadPizzas,
	loadVegetales,
	loadCarnes,
	loadEnsaladas,
	loadAdicionales,

	function (ctx, next) {
	title('Ragustino - Carta');
	var main = document.getElementById('main-container');

	$(document).ready(function(){
		$('.collapsible').collapsible();
	});

	$(document).ready(function() {
		$('select').material_select();
	});

	empty(main).appendChild(template(
		ctx.pizzas,
		ctx.vegetales,
		ctx.carnes,
		ctx.ensaladas,
		ctx.adicionales
	));
})

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

function loadEnsaladas (ctx, next) {
	request
		.get('/api/ensaladas')
		.end(function (err, res) {
			if (err) return console.log(err);

			ctx.ensaladas = res.body;
			next();
		})
}

function loadAdicionales (ctx, next) {
	request
		.get('/api/adicionales')
		.end(function (err, res) {
			if (err) return console.log(err);

			ctx.adicionales = res.body;
			next();
		})
}