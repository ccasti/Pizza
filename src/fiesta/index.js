var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');
var header = require('../layout/header');

page('/fiesta', header, function (ctx, next) {
	title('Ragustino - Fiesta');
	var main = document.getElementById('main-container');
	empty(main).appendChild(template());
})