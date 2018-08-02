var yo = require('yo-yo');
var empty = require('empty-element');

var el = yo`<footer class="page-footer grey lighten-2">
    <div class="container">
        <div class="row nobottom">
		    <div class="col l6 s12 boxEmp">
                <h5 class="grey-text text-darken-4 titFooter">RAGUSTINO FOOD EXPERIENCE</h5>
                <p class="grey-text text-darken-4 descFooter">Es una empresa perteneciente a SERVICIOS GASTRONOMICOS GRC LTDA.</p>
            </div>
            <div class="col s7 m3 center-align">
                <h5 class="grey-text text-darken-4 titFooter">Horarios Ragustino</h5>
                <ul class="listFooter">
                    <li><p class="grey-text text-darken-4 descFooter">Jueves y Domingo de 18:00 a 00:00 hrs.</p></li>
                    <li><p class="grey-text text-darken-4 descFooter">Viernes y Sábados de 18:00 a 01:00 hrs.</p></li>
                </ul>
            </div>
            <div class="col s5 m3 center-align">
                <h5 class="grey-text text-darken-4 titFooter">info@ragustino.cl</h5>
                <ul class="listFooter">
	                <li><p class="grey-text text-darken-4 descFooter">Whatsapp +56 986574828</p></li>
                    <li><p class="grey-text text-darken-4 descFooter">Fono Iquique 2 23106944</p></li>
                </ul>
        	</div>
        </div>
  	</div>
  	<div class="footer-copyright">
        <div class="grey-text text-darken-4 container">
            <div class="row nobottom descFooter">
                <div class="col s9">
        	       © 2018 Ragustino. Todos los derechos reservados. Desarrollado por Casti
                </div>
            </div>
        </div>
  	</div>
</footer>`;

module.exports = function footer (ctx, next) {
    var container = document.getElementById('footer-container')
    empty(container).appendChild(el);
    next();
}