var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');
var header = require('../../header');

page('/signin', header, function (ctx, next) {
	title('Signin');
	var main = document.getElementById('main-container');
	empty(main).appendChild(template);
})