var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');
var header = require('../../header');

page('/signup', header, function (ctx, next) {
	title('Signup');
	var main = document.getElementById('main-container');
	empty(main).appendChild(template);
})