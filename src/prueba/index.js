var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');
var header = require('../header');
var footer = require('../footer');
var request = require('superagent');

page('/', header, loadPizzas, footer, function (ctx, next) {
	title('Ragustino');
	var main = document.getElementById('main-container');

	empty(main).appendChild(template(ctx.pizzas));

	$(document).ready(function(){
		$('.collapsible').collapsible();
	});
});

function loadPizzas (ctx, next) {
	request
		.get('http://www.ragustino.cl/js/conector.php')
		.end(function (err, res) {
			if (err) return console.log(err);

			ctx.pizzas = res.body;
			next();
		})
}