var yo = require('yo-yo');
var empty = require('empty-element');

var el = yo`<footer class="page-footer grey lighten-2">
    <div class="container">
        <div class="row nobottom">
		    <div class="col l6 s12">
                <h5 class="grey-text text-darken-4">RAGUSTINO FOOD EXPERIENCE</h5>
                <p class="grey-text text-darken-4">Es una empresa perteneciente a SERVICIOS GASTRONÓMICOS GRC LTDA.</p>
            </div>
            <div class="col l4 offset-l2 s12">
                <h5 class="grey-text text-darken-4">Redes Sociales</h5>
                <ul>
	                <li><a class="grey-text text-darken-4" href="http://www.facebook.com/ragustinofoodexperience" target="_blank">Facebook</a></li>
	                <li><a class="grey-text text-darken-4" href="http://www.instagram.com/ragustinofoodexperience" target="_blank">Instagram</a></li>
                    <li><a class="grey-text text-darken-4" href="/carta">--------</a></li>
	            </ul>
        	</div>
        </div>
  	</div>
  	<div class="footer-copyright">
        <div class="grey-text text-darken-4 container">
        	© 2018 Ragustino. Todos los derechos reservados. Diseñado por Casti
        </div>
  	</div>
</footer>`;

module.exports = function footer (ctx, next) {
    var container = document.getElementById('footer-container')
    empty(container).appendChild(el);
    next();
}