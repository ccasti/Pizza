var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');
var header = require('../layout/header');

page('/', header, function (ctx, next) {
	title('Ragustino');
	var main = document.getElementById('main-container');

	var pizzas = [
		{
			id: '100001',
			pizzaname: 'PIZZA PRIMERA',
			url: 'pizza.png',
			pizzacontent: 'Exquisitos vegetales preprados de manera especial con un toque de esto y lo otro y terminada de la mejor manera, todo en base de salsa pomodoro y nuestra masa especial',
			likes: 47,
			liked: true,
			price: 9000
		},
		{
			id: '100002',
			pizzaname: 'PIZZA SEGUNDA',
			url: 'pizza2.png',
			pizzacontent: 'Exquisitos vegetales preprados de manera especial con un toque de esto y lo otro y terminada de la mejor manera, todo en base de salsa pomodoro y nuestra masa especial',
			likes: 124,
			liked: false,
			price: 8500
		},
		{
			id: '100003',
			pizzaname: 'PIZZA TERCERA',
			url: 'pizza3.png',
			pizzacontent: 'Exquisitos vegetales preprados de manera especial con un toque de esto y lo otro y terminada de la mejor manera, todo en base de salsa pomodoro y nuestra masa especial',
			likes: 10,
			liked: true,
			price: 9000
		},
		{
			id: '100004',
			pizzaname: 'PIZZA CUARTA',
			url: 'pizza.png',
			pizzacontent: 'Exquisitos vegetales preprados de manera especial con un toque de esto y lo otro y terminada de la mejor manera, todo en base de salsa pomodoro y nuestra masa especial',
			likes: 15,
			liked: true,
			price: 10000
		},
		{
			id: '100005',
			pizzaname: 'PIZZA QUINTA',
			url: 'pizza2.png',
			pizzacontent: 'Exquisitos vegetales preprados de manera especial con un toque de esto y lo otro y terminada de la mejor manera, todo en base de salsa pomodoro y nuestra masa especial',
			likes: 72,
			liked: true,
			price: 9000
		},
		{
			id: '100006',
			pizzaname: 'PIZZA SEXTA',
			url: 'pizza3.png',
			pizzacontent: 'Exquisitos vegetales preprados de manera especial con un toque de esto y lo otro y terminada de la mejor manera, todo en base de salsa pomodoro y nuestra masa especial',
			likes: 4,
			liked: true,
			price: 10000
		}
	];
	
	empty(main).appendChild(template(pizzas));
})