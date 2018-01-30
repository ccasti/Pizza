var yo = require('yo-yo');
var landing = require('../landing');

var signupForm = yo`<div class="col s10 push-s1 m6 push-m3">
    <div class="row">
        <div class="signup-box center-align top blue-text text-darken-2">
            <form class="signup-form">
                <h2>Ingresa tus datos</h2>
                <div class="section">
                    <input type="email" name="email" placeholder="Correo electrónico" />
                    <input type="text" name="usuario" placeholder="Nombre de usuario" />
                    <input type="password" name="password" placeholder="Contraseña" />
                    <input type="password" name="check_password" placeholder="Repetir Contraseña" />
                    <button class="btn btn-emp waves-effect waves-light" type="submit">Regístrate</button>
                </div>
            </form>
        	<div class="login-box">
                ¿Ya estás registrado? <a class="indigo-text text-darken-4" href="/signin">Entrar</a>
            </div>
        </div>            
    </div>
</div>`;

module.exports = landing(signupForm);