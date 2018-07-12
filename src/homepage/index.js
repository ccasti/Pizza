
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
});

/*function loadIngredientes (ctx, next) {
	request
		.get('/api/Ingredientes')
		.end(function (err, res) {
			if (err) return console.log(err);

			ctx.Ingredientes = res.body;
			next();
		})
}*/

function loadPizzas (ctx, next) {
	request
		.get('mysqlwslib.js', function() {
			select_all_pizza();
		})
		.end(function (err, res) {
			if (err) return console.log(err);

			ctx.pizzas = res.body;
			next();
		})
}


/*function loadPizzas (ctx, next) {
	request
		.get('/api/pizzas', function(){
			select_all_pizza();
		})

		.end(function (err, res) {
			if (err) return console.log(err);

			ctx.pizzas = res.body;
			next();
		})
}*/