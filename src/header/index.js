var yo = require('yo-yo');
var empty = require('empty-element');

var el = yo`<nav class="header grey lighten-3">
	<div class="container">
		<div class="row piso-nav">
			<div class="col s12 sp">
				<div class="nav-wrapper">
					<div id="todoHeader" class="container barra">
						<div class="row piso-nav">
							<div class="col s2 sp">
							  	<a href="/" class="brand-logo hide-on-med-and-down">Ragustino Food Experience</a>
							  	<a href="/" class="hide-on-large-only center-align"><i class="material-icons">home</i></a>
							</div>
							<div class="col s2 sp hide-on-large-only center-align">
								<a href="/carta"><i class="material-icons iconStore">store</i></a>
							</div>
							<div class="col s2 hide-on-large-only center-align">
								<a href="/somos"><i class="material-icons">nature_people</i></a>
							</div>
							<div class="col l6 hide-on-med-and-down">
								<ul class="right">
									<li><a href="/">INICIO</a></li>
									<li><a href="/carta">NUESTROS PRODUCTOS</a></li>
									<li><a href="/somos">NUESTRA FILOSOFIA</a></li>
								</ul>
							</div>
							<div class="col s2 center-align sp">
								<a href="#" class="btn btn-flat dropdown-button chip-user center-align" data-activates="drop-user"><i class="small material-icons iconoSign">perm_identity</i></a>
								<ul id="drop-user" class="dropdown-content">
									<li><a href="#">Salir</a></li>
								</ul>
							</div>
							<div class="col s2 offset-s1 m2 l2 sp center-align">
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