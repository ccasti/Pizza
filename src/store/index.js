var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');
var header = require('../header');

page('/store', header, function (ctx, next) {
	title('Tienda en Línea');
	var main = document.getElementById('main-container');

	var menuss = [
		{
			pizzaname: 'Pizza Primera',
			url: 'pizza.png',
			pizzacontent: 'Exquisitos vegetales preprados de manera especial con un toque de esto y lo otro y terminada de la mejor manera, todo en base de salsa pomodoro y nuestra masa especial',
			likes: 14,
			liked: true
		},
		{
			pizzaname: 'Pizza Segunda',
			url: 'pizza2.png',
			pizzacontent: 'Exquisitos vegetales preprados de manera especial con un toque de esto y lo otro y terminada de la mejor manera, todo en base de salsa pomodoro y nuestra masa especial',
			likes: 1,
			liked: false
		},
		{
			pizzaname: 'Pizza Tercera',
			url: 'pizza3.png',
			pizzacontent: 'Exquisitos vegetales preprados de manera especial con un toque de esto y lo otro y terminada de la mejor manera, todo en base de salsa pomodoro y nuestra masa especial',
			likes: 124,
			liked: true
		},
		{
			pizzaname: 'Pizza Cuarta',
			url: 'pizza.png',
			pizzacontent: 'Exquisitos vegetales preprados de manera especial con un toque de esto y lo otro y terminada de la mejor manera, todo en base de salsa pomodoro y nuestra masa especial',
			likes: 14,
			liked: true
		},
		{
			pizzaname: 'Pizza Cuarta',
			url: 'pizza.png',
			pizzacontent: 'Exquisitos vegetales preprados de manera especial con un toque de esto y lo otro y terminada de la mejor manera, todo en base de salsa pomodoro y nuestra masa especial',
			likes: 14,
			liked: true
		},
		{
			pizzaname: 'Pizza Sexta',
			url: 'pizza3.png',
			pizzacontent: 'Exquisitos vegetales preprados de manera especial con un toque de esto y lo otro y terminada de la mejor manera, todo en base de salsa pomodoro y nuestra masa especial',
			likes: 4,
			liked: true
		}
	];
	
	empty(main).appendChild(template(menuss));

	$(document).ready(function(){
		$('.collapsible').collapsible();
	});
})