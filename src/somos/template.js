var yo = require('yo-yo');
var layout = require('../layout');

module.exports = function () {
	var el = yo`<div class="col s12 seccion">
		<div class="row nobottom">
			<div class="col s12 center-align">
				<h2 class="tituloHome">RAGUSTINO FOOD EXPERIENCE</h2>
			</div>
		</div>
		<div class="row nobottom">
			<div class="col s12 center-align">
				<p class="programa">En RAGUSTINO FOOD EXPERIENCE puedes agendar fácilmente el DIA y HORA que quieres recibir tu pedido.   Entra a nuestra carta, selecciona tus favoritos y PROGRAMA para el mismo día o cuando quieras, SIN COBROS ADICIONALES</p>
			</div>
		</div>
		<div class="row">
			<div class="col s12 center-align">
				<p>Disfruta de la comida más deliciosa, equilibrada y nutritiva a tu puerta sin esperas ni retrasos...</p>
			</div>
			<div class="col s12 m4 offset-m4 center-align">
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
						<p class="horas">Sábados 18:00 - 1:00</p>
					</div>
				</div>
				<div class="row nobottom">
					<div class="col s12 center-align">
						<p class="horas">Domingos 13:00 - 19:00</p>
					</div>
				</div>
				<div class="row programa">
					<div class="col s2 offset-s4 l2 offset-l4 face center-align">
						<a href="http://www.facebook.com/ragustinofoodexperience" target="_blank" class="icon-facebook iconoRedes"></a>
					</div>
					<div class="col s2 l2 center-align insta">
						<a href="http://www.instagram.com/ragustinofoodexperience" target="_blank" class="icon-instagram iconoRedes"></a>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col s12 center-align">
				<p>Es un nuevo concepto de negocio, innovador, diferenciado y acorde a los tiempos actuales. Somos parte del cambio radical que ha experimentado la industria gastronómica desde la expansión sin precedentes de internet y las redes sociales. Somos un DELI GOURMET o un PORTAL WEB DE PEDIDOS GASTRONÓMICOS, pero queremos ir mucho más allá y darle un salto de calidad al ya clásico e irregular servicio de “pedido a domicilio”. Nuestro principal objetivo es entregar una experiencia gastronómica integral, moderna y de excelencia. Para ello contamos con una cocina creativa y versátil, procesos completamente digitalizados para pagos online, rastreo interactivo de reparto y programación de pedidos por horas o días. Cocinamos con pasión y trabajamos con energía porque NOS ENCANTA LO QUE HACEMOS! Queremos crecer e innovar pero por sobre todo queremos hacer la diferencia entregando siempre un servicio de calidad orientado al cliente. Te invitamos a disfrutar hoy de una nueva experiencia gourmet a domicilio. TE ESPERAMOS!!!</p>
			</div>
		</div>
		<div class="row">
			<div class="col s12 center-align">
				<p>"Nuestras Pizzas son 100% artesanales, siguiendo la receta que aprendimos en Bagnoli, Nápoles.  Fermentamos la masa por más de 24 horas  para conseguir una pizza esponjosa, liviana y fácil de digerir.  Todas son cocinadas en horno de leña con ingredientes frescos y preparados con pasión, cariño y el toque RAGUSTINO."</p>
			</div>
		</div>
		<div class="row nobottom">
			<div class="col s12 center-align">
				<h2 class="tituloHome">QUE ES UNA PIADINA?</h2>
			</div>
		</div>
		<div class="row">
			<div class="col s12 center-align">
				<p>La piadina es un producto gastronómico de origen italiano, típico de las provincias de la Romaña. Está compuesto por una masa hojaldrada de harina de trigo, manteca o aceite de oliva, sal y agua. Se rellena con vegetales, quesos y jamones y se cocina sobre una piedra o plancha caliente por unos minutos. El resultado es delicioso, saludable y contundente. Ideal para quienes buscan nuevas opciones además de pizzas, sándwiches o creppes. Pide la tuya en exclusiva en RAGUSTINO FOOD EXPERIENCE!</p>
			</div>
		</div>
		<div class="row nobottom">
			<div class="col s12 center-align">
				<h2 class="tituloHome">QUE ES UNA FOCACCIA?</h2>
			</div>
		</div>
		<div class="row">
			<div class="col s12 center-align">
				<p>Es una pieza de pan aromática y apetitosa de origen italiano muy relacionada a la popular pizza aunque de mayor altura. Se cocina al fuego con romero y aceite de oliva y otros ingredientes. A nosotros nos encantan con aceitunas, un poco de cebolla glaseada y queso mozzarella. Mmmmm … Majestuosas!!!</p>
			</div>
		</div>
		<div class="row nobottom">
			<div class="col s12 center-align">
				<h2 class="tituloHome">GRISSINIS</h2>
			</div>
		</div>
		<div class="row">
			<div class="col s12 center-align">
				<p>Los grissinis italianos son palitos de pan aromatizados con especias, muy crocantes y de forma fina y alargada. Son el acompañamiento perfecto para ensaladas, jamones, quesos y salsas. Nuestro chef los prepara de albahaca y queso y los acompaña con una salsa sublime. IMPERDIBLES!</p>
			</div>
		</div>
		<div class="row nobottom">
			<div class="col s12 center-align">
				<h2 class="tituloHome">ENSALADA RAGUSTINO</h2>
			</div>
		</div>
		<div class="row">
			<div class="col s12 center-align">
				<p>La más clásica de nuestras ensaladas y la primera de una serie que verán la luz muy pronto, inaugurando nuestra carta “primavera-verano”. “La RAGUSTINO” se compone de un mix de hojas verdes (espinaca, rúcula, lechuga francesa y escarola), un sutil toque de repollo, tomates cherry, cubitos de pepino, pollo a la plancha, tortilla chips, semillas de sésamo, nueces y aderezo (yoghurt griego, vinagre balsámico, aceite de oliva, mostaza Dijon, sal y pimienta). LOS CLÁSICOS NO PASAN DE MODA!</p>
			</div>
		</div>
	</div>`;

	return layout(el);
}