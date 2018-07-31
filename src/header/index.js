var yo = require('yo-yo');
var empty = require('empty-element');

$(document).ready(function(){
	$(".button-collapse").sideNav({
      menuWidth: 200,
      closeOnClick: true,
      draggable: true
    });
});

var el = yo`<nav class="header grey lighten-3">
	<div class="container smallH">
		<div class="row piso-nav">
			<div class="col s12 sp carrito">
				<div class="nav-wrapper">
					<div id="todoHeader" class="container barra">
						<div class="row piso-nav">
							<div class="col s2 sp">
							  	<a href="/" class="brand-logo ragus hide-on-med-and-down">Ragustino Food Experience</a>
							  	<a href="/" class="brand-logo ragus hide-on-large-only">Ragustino</a>
							  	<a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
							</div>
							<div class="col l6">
								<ul class="right right hide-on-med-and-down">
									<li><a href="/">INICIO</a></li>
									<li><a href="/carta">CARTA</a></li>
									<li><a href="/somos">NOSOTROS</a></li>
								</ul>
								<ul class="side-nav lateral" id="mobile-demo">
									<li><a href="/">INICIO</a></li>
									<li><a href="/carta">CARTA</a></li>
									<li><a href="/somos">NOSOTROS</a></li>
								</ul>
							</div>
							<div class="col s2 offset-s6 l2 center-align sp">
								<a href="#" class="btn btn-flat dropdown-button chip-user center-align" data-activates="drop-user"><i class="small material-icons iconoSign">perm_identity</i></a>
								<ul id="drop-user" class="dropdown-content">
									<li><a href="#">Salir</a></li>
								</ul>
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