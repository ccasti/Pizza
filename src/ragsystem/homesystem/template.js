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
		                        <button class="btn waves-effect waves-light blue darken-2">Ingresar</button>
		                    </div>
		                </div>
		            </form>
		        </div>
			</div>
		</div>	
	</div>`;
}
 /*
 <ul class="collection with-header">
 	<li class="collection-header"><h4>Pedidos</h4></li>
 	<li class="collection-item avatar venta-item">
 		<div class="row">
 			<div class="col s12 m6">
 				<span class="title">Dueño</span>
 				<p>Direccion <br>
 					Fono <br>
 					Detalle
 				</p>
 			</div>
 			<div class="col s12 m6">
 				<form action="#">
 					<div class="row">
 						<div class="col s12 m4">
 							<input type="checkbox" class="filled-in" id="filled-in-box50" />
 							<label for="filled-in-box50">Cocina</label>
 						</div>
 						<div class="col s12 m4">
 							<input type="checkbox" class="filled-in" id="filled-in-box52" />
 							<label for="filled-in-box52">Despacho</label>
 						</div>
 						<div class="col s12 m4">
 							<input type="checkbox" class="filled-in" id="filled-in-box53" />
 							<label for="filled-in-box53">Entregado</label>
 						</div>
 					</div>		
 				</form>
 			</div>
 		</div>
 		<a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
 	</li>
 </ul>
 */