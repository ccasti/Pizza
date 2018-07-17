var yo = require('yo-yo');
var empty = require('empty-element');

$(document).ready(function(){
	$('.button-collapse').sideNav();
});

var el = yo`<nav class="header grey lighten-3">
	<div class="container">
		<div class="row piso-nav">
			<div class="col s12 sp">
				<div class="nav-wrapper">
					<div id="todoHeader" class="container barra">
						<div class="row piso-nav">
							<div class="col s2 m4 l2 sp">
							  	<a href="/" class="brand-logo">RAGUSTINO</a>
							  	<a href="/carta" class="hide-on-large-only center-align"><i class="material-icons">store</i></a>
							</div>
							<div class="col l6 hide-on-med-and-down">
								<ul class="right">
									<li><a href="/">INICIO</a></li>
									<li><a href="/carta">NUESTROS PRODUCTOS</a></li>
								</ul>
							</div>
							<div class="col s2 m2 offset-m4 l2 center-align sp">
								<a href="#" class="btn btn-flat dropdown-button chip-user" data-activates="drop-user"><i class="small material-icons carrito">perm_identity</i></a>
								<ul id="drop-user" class="dropdown-content">
									<li><a href="#">Salir</a></li>
								</ul>
							</div>
							<div class="col s3 offset-s5 m2 l2 sp">
								<a class="btn modal-trigger blue darken-2 chip-carro" href="#modal9"><i class="small material-icons left carrito">shopping_cart</i><span id="totalProductos">0</span></a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</nav>`;

module.exports = function header (ctx, next) {

	var container = document.getElementById('header-container')
	empty(container).appendChild(el);
	next();
}