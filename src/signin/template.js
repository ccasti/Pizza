var yo = require('yo-yo');
var landing = require('../landing');

var signinForm = yo`<div class="col s10 push-s1 m6 push-m3">
    <div class="row">
        <div class="signup-box center-align top blue-text text-darken-2">
            <form class="signup-form">
                <h2>Inicia sesión</h2>
                <div class="section">
                    <input type="email" name="email" placeholder="Correo electrónico" />
                    <input type="password" name="password" placeholder="Contraseña" />
                    <button class="btn btn-emp waves-effect waves-light" type="submit">Ingresar</button>
                </div>
            </form>
        	<div class="login-box">
                ¿No estás registrado? <a class="indigo-text text-darken-4" href="/signup">Regístrate</a>
            </div>
        </div>            
    </div>
</div>`;

module.exports = landing(signinForm);