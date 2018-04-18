var yo = require('yo-yo');
var landing = require('../../landing');

var signupForm = yo`<div class="col s10 push-s1 m6 push-m3">
    <div class="row">
        <div class="signup-box top blue-text text-darken-2">
            <form class="signup-form">
                <h2 class="center-align">Ingresa tus datos</h2>
                <div class="section">
                    <div class="input-field col s12">
                        <input id="email" type="email" class="validate" />
                        <label for="email">Correo Electronico</label>
                    </div>
                    <div class="input-field col s12">
                        <input id="name" type="text" />
                        <label for="name">Nombre y Apellidos</label>
                    </div>
                    <div class="input-field col s12">
                        <input type="text" name="direccion" placeholder="Dirección" />
                    </div>
                    <div class="input-field col s12">
                        <input type="password" name="password" placeholder="Contraseña" />
                    </div>
                    <div class="input-field col s12">
                        <input type="password" name="check_password" placeholder="Repetir Contraseña" />
                    </div>
                    <button class="btn waves-effect waves-light center-align" type="submit">Regístrate</button>
                </div>
            </form>
        	<div class="center-align">
                ¿Ya estás registrado? <a class="indigo-text text-darken-4" href="/signin">Entrar</a>
            </div>
        </div>            
    </div>
</div>`;

module.exports = landing(signupForm);