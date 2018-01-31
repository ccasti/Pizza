var yo = require('yo-yo');
var empty = require('empty-element');

$(document).ready(function(){
	$('.button-collapse').sideNav();
});

var el = yo`<nav class="header">
	<div class="nav-wrapper blue lighten-2">
	  	<a href="#!" class="brand-logo inline">Logo</a>
	  	<a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
	   	<ul class="right hide-on-med-and-down">
	  		<li><a href="#!">Nuestra Masa</a></li>
		    <li><a href="#!">Base de Salsa</a></li>
		    <li><a href="#!">Tamaño Pizza</a></li>
		    <li><a href="#!">Más...</a></li>
		</ul>
		<div class="col s2 m8 right-align">
			<a href="#" class="icon-nav btn btn-large btn-flat dropdown-button" data-activates="drop-car">
				<i class="small material-icons icon-white">shopping_cart</i>
			</a>
			<ul id="drop-car" class="dropdown-content">	
				<li><a href="#">Pedir</a></li>
			</ul>
			<a href="#" class="icon-nav btn btn-large btn-flat dropdown-button" data-activates="drop-user">
				<i class="small material-icons icon-white">perm_identity</i>
			</a>
			<ul id="drop-user" class="dropdown-content">
				<li><a href="#">Salir</a></li>
			</ul>
		</div>
		<ul class="side-nav" id="mobile-demo">
		  	<li><a href="sass.html">Nuestra Masa</a></li>
		    <li><a href="badges.html">Base de Salsa</a></li>
		    <li><a href="collapsible.html">Tamaño Pizza</a></li>
		    <li><a href="mobile.html">Más...</a></li>
		</ul>
	</div>
</nav>`;

module.exports = function header (ctx, next) {
	var container = document.getElementById('header-container')
	empty(container).appendChild(el);
	next();
}