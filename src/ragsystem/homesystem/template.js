var yo = require('yo-yo');

module.exports = function () {
	return yo`<div class="content">
		<div class="container">
			<div class="top row">
			    <div class="col s12 m6 offset-m3 l4 offset-l4 signin-box">
		            <form class="signin-form" method="POST" action="./js/login.php">
		                <div class="row">
		                    <div class="col s12">
		                        <h2 class="center-align">Inicia sesión</h2>
		                    </div>
		                </div>
		                <div class="row">
		                    <div class="col s12 input-field">
		                        <input type="email" name="nnombre" value="" class="validate formDefault" />
		                        <label for="email">Correo Electronico</label>
		                    </div>
		                </div>
		                <div class="row">
		                    <div class="col s12 input-field">
		                        <input type="password" name="password" value="" class="validate formDefault">
		                        <label for="password">Contraseña</label>
		                    </div>
		                </div>
		                <div class="row signin-btn">
		                    <div class="col s12 center-align">
		                    	<input value="Iniciar Sesion" type="submit" />
		                    </div>
		                </div>
		            </form>
		        </div>
			</div>
		</div>	
	</div>`;
}