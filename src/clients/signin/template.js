var yo = require('yo-yo');
var landing = require('../../landing');

var signinForm = yo`<div class="col s10 push-s1 m6 push-m3">
    <div class="row">
        <div class="signin-box center-align top blue-text text-darken-2">
            <form class="signin-form">
                <h2>Inicia sesión</h2>
                <div class="input-field">
                    <input type="email" name="email" placeholder="Correo electrónico" class="validate" />
                </div>
                <div class="input-field">
                    <input type="password" name="password" placeholder="Contraseña" class="validate" />
                </div>
                <button class="btn btn-emp waves-effect waves-light" type="submit">Ingresar</button>
            </form>
        	<div>
                ¿No estás registrado? <a class="indigo-text text-darken-4" href="/signup">Regístrate</a>
            </div>
        </div>            
    </div>
</div>`;

module.exports = landing(signinForm);