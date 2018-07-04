var yo = require('yo-yo');
var empty = require('empty-element');

var el = yo`<footer class="page-footer grey lighten-2">
    <div class="container">
        <div class="row">
		    <div class="col l6 s12">
                <h5 class="grey-text text-darken-4">Contenido del Footer</h5>
                <p class="grey-text text-darken-4">Espacio para información de la empresa u otra relevante, se podrá organizar por columnas u otro...</p>
            </div>
            <div class="col l4 offset-l2 s12">
                <h5 class="grey-text text-darken-4">Ragustino</h5>
                <ul>
	                <li><a class="grey-text text-darken-4" href="/">Inicio</a></li>
	                <li><a class="grey-text text-darken-4" href="/carro">Carro</a></li>
	            </ul>
        	</div>
        </div>
  	</div>
  	<div class="footer-copyright">
        <div class="grey-text text-darken-4 container">
        	© 2018 Copyright Texto
        	<a class="grey-text text-darken-4 right" href="#!">Más Links</a>
        </div>
  	</div>
</footer>`;

module.exports = function footer (ctx, next) {
    var container = document.getElementById('footer-container')
    empty(container).appendChild(el);
    next();
}