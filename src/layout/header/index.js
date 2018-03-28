var yo = require('yo-yo');
var empty = require('empty-element');

$(document).ready(function(){
	$('.button-collapse').sideNav();
});

var el = yo`<nav class="header grey lighten-3">
	<div class="container">
		<div class="row piso-nav">
			<div class="col s12">
				<div class="nav-wrapper">
					<div class="container barra">
						<div class="row piso-nav">
								<div class="col s2">
							  	<a href="#!" class="brand-logo">LOGO</a>
							  	<a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
							</div>
							<div class="col s8">
								<ul class="right hide-on-med-and-down">
									<li><a href="#!">CARTA</a></li>
								    <li><a href="#!">PACK's</a></li>
								    <li><a href="#!">ARTA TU FIESTA</a></li>
								    <li><a href="#!"><i class="material-icons left">shopping_cart</i></a></li>
								</ul>
							</div>
							<div class="col s2 offset-s8 m2 offset-m8 l2">
							   	<a href="#" class="btn btn-large btn-flat dropdown-button" data-activates="drop-user">
									<i class="small material-icons">perm_identity</i>
								</a>
								<ul id="drop-user" class="dropdown-content">
									<li><a href="#">Salir</a></li>
								</ul>
							</div>
						</div>
					</div>
					<ul class="side-nav" id="mobile-demo">
					  	<li><a href="#!">CARTA</a></li>
					    <li><a href="#!">PACK's</a></li>
					    <li><a href="#!">ARTA TU FIESTA</a></li>
					    <li><a href="#!"><i class="material-icons left">shopping_cart</i></a></li>
					</ul>
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