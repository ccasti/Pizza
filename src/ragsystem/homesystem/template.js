var yo = require('yo-yo');

module.exports = function () {
	return yo`<div class="content">
		<div class="container">
			<div class="top row">
			    <div class="col s12 m6 offset-m3 l4 offset-l4 signin-box">
		            <form class="signin-form">
		                <div class="row">
		                    <div class="col s12">
		                        <h2 class="center-align">Inicia sesión</h2>
		                    </div>
		                </div>
		                <div class="row">
		                    <div class="col s12 input-field">
		                        <input id="email" type="email" class="validate formDefault" />
		                        <label for="email">Correo Electronico</label>
		                    </div>
		                </div>
		                <div class="row">
		                    <div class="col s12 input-field">
		                        <input id="password" type="password" class="validate formDefault">
		                        <label for="password">Contraseña</label>
		                    </div>
		                </div>
		                <div class="row signin-btn">
		                    <div class="col s12 center-align">
		                    	<a id="login" class="waves-effect waves-light btn blue darken-2">Ingresar</a>
		                    </div>
		                </div>
		            </form>
		        </div>
			</div>
		</div>	
	</div>`;
}