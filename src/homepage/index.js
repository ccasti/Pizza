var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');
var header = require('../header');

page('/', header, function (ctx, next) {
	title('Pizza Algo');
	var main = document.getElementById('main-container');

	var menus = [
		{
			pizzaname: 'Pizza Primera',
			url: 'pizza.png',
			pizzacontent: 'Exquisitos vegetales preprados de manera especial con un toque de esto y lo otro y terminada de la mejor manera, todo en base de salsa pomodoro y nuestra masa especial',
			likes: 47,
			liked: true
		},
		{
			pizzaname: 'Pizza Segunda',
			url: 'pizza2.png',
			pizzacontent: 'Exquisitos vegetales preprados de manera especial con un toque de esto y lo otro y terminada de la mejor manera, todo en base de salsa pomodoro y nuestra masa especial',
			likes: 124,
			liked: true
		},
		{
			pizzaname: 'Pizza Tercera',
			url: 'pizza3.png',
			pizzacontent: 'Exquisitos vegetales preprados de manera especial con un toque de esto y lo otro y terminada de la mejor manera, todo en base de salsa pomodoro y nuestra masa especial',
			likes: 10,
			liked: true
		}
	];
	
	empty(main).appendChild(template(menus));

	$('.carousel.carousel-slider').carousel({fullWidth: true});
})