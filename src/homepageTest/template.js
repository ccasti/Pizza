var yo = require('yo-yo');
var layout = require('../layout');

module.exports = function () {
	var el = yo`<div class="col s12 seccion">
		<div class="row nobottom">
			<div class="col s12 center-align">
				<h2 class="tituloHome">PAGINA EN CONSTRUCCION</h2>
			</div>
		</div>
		<div class="row">
			<div class="col s12 center-align">
				<p>... En unos días</p>
			</div>
		</div>
		<div class="row nobottom">
			<div class="col s12 center-align">
				<h2 class="tituloHome">RAGUSTINO FOOD EXPERIENCE</h2>
			</div>
		</div>
		<div class="row">
			<div class="col s12 center-align">
				<p>completamente digital</p>
			</div>
		</div>
		<div class="row">
			<div class="col s12 m4">
				<div class="row nobottom">
					<div class="col s12 center-align">
						<p class="programa">En RAGUSTINO FOOD EXPERIENCE puedes agendar fácilmente el DIA y HORA que quieres recibir tu pedido.   Entra a nuestra carta, selecciona tus favoritos y PROGRAMA para el mismo día o cuando quieras, SIN COBROS ADICIONALES</p>
					</div>
				</div>
				<div class="row">
					<div class="col s12 center-align">
						<p>Disfruta de la comida más deliciosa, equilibrada y nutritiva a tu puerta sin esperas ni retrasos...</p>
					</div>
				</div>
			</div>
			<div class="col s12 m4 centroIm">
				<img class="fotoCentro" src="centroinfo.png" />
			</div>
			<div class="col s12 m4 center-align">
				<div class="row nobottom">
					<div class="col s12 center-align">
						<p class="horario"></p>
					</div>
				</div>
				<div class="row nobottom">
					<div class="col s12 center-align">
						<p class="horas">HORARIO: RAGUSTINO</p>
					</div>
				</div><div class="row nobottom">
					<div class="col s12 center-align">
						<p class="horas">Realiza repartos sólo de jueves a domingo:</p>
					</div>
				</div>
				<div class="row nobottom">
					<div class="col s12 center-align">
						<p class="horas">Jueves 18:00 - 0:00</p>
					</div>
				</div>
				<div class="row nobottom">
					<div class="col s12 center-align">
						<p class="horas">Viernes 18:00 - 1:00</p>
					</div>
				</div>
				<div class="row nobottom">
					<div class="col s12 center-align">
						<p class="horas">Sábado 18:00 - 1:00</p>
					</div>
				</div>
				<div class="row nobottom">
					<div class="col s12 center-align">
						<p class="horas">Domingo 18:00 - 0:00</p>
					</div>
				</div>
				<div class="row programa">
					<div class="col s2 offset-s4 m2 offset-m4 face center-align">
						<a href="http://www.facebook.com/ragustinofoodexperience" target="_blank" class="icon-facebook iconoRedes"></a>
					</div>
					<div class="col s2 m2 center-align insta">
						<a href="http://www.instagram.com/ragustinofoodexperience" target="_blank" class="icon-instagram iconoRedes"></a>
					</div>
				</div>
			</div>
		</div>
	</div>`;

	return layout(el);
}

/*
<div class="row">
	<div class="col s12 center-align">
		<p>Es un nuevo concepto de negocio, innovador, diferenciado y acorde a los tiempos actuales. Somos parte del cambio radical que ha experimentado la industria gastronómica desde la expansión sin precedentes de internet y las redes sociales. Somos un DELI GOURMET o un PORTAL WEB DE PEDIDOS GASTRONÓMICOS, pero queremos ir mucho más allá y darle un salto de calidad al ya clásico e irregular servicio de “pedido a domicilio”. Nuestro principal objetivo es entregar una experiencia gastronómica integral, moderna y de excelencia. Para ello contamos con una cocina creativa y versátil, procesos completamente digitalizados para pagos online, rastreo interactivo de reparto y programación de pedidos por horas o días. Cocinamos con pasión y trabajamos con energía porque NOS ENCANTA LO QUE HACEMOS! Queremos crecer e innovar pero por sobre todo queremos hacer la diferencia entregando siempre un servicio de calidad orientado al cliente. Te invitamos a disfrutar hoy de una nueva experiencia gourmet a domicilio. TE ESPERAMOS!!!</p>
	</div>
</div>
<div class="row">
	<div class="col s12 center-align">
		<a href="/carta" class="waves-effect waves-light btn blue darken-2"><i class="material-icons left">store</i>Nuestra Carta</a>
	</div>
</div>
*/