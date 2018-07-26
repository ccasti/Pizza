var yo = require('yo-yo');
var layout = require('../layout');

module.exports = function () {
	var el = yo`<div class="col s12 seccion sp">
		<div class="row sp nobottom">
			<div class="col s12 center-align">
				<img class="pic-ini hide-on-small-only" src="home.png" />
				<img class="pic-ini hide-on-med-and-up" src="home-small.png" />
			</div>
		</div>
	</div>`;

	return layout(el);
}

/*
<div class="row nobottom">
	<div class="col s8 offset-s2 center-align">
		<a href="/carta" class="waves-effect waves-light btn blue darken-2"><i class="material-icons left">store</i>Nuestra Carta</a>
	</div>
</div>
<div class="row programa">
	<div class="col s2 offset-s4 m1 offset-m5 face center-align">
		<a href="http://www.facebook.com/ragustinofoodexperience" target="_blank" class="icon-facebook iconoRedes"></a>
	</div>
	<div class="col s2 m1 center-align insta">
		<a href="http://www.instagram.com/ragustinofoodexperience" target="_blank" class="icon-instagram iconoRedes"></a>
	</div>
</div>
*/