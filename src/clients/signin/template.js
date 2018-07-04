var yo = require('yo-yo');
var landing = require('../../landing');

var signinForm = yo`<div class="col s10 push-s1 m6 push-m3 l4 push-l4">
    <div class="row">
        <div class="signin-box">
            <form class="signin-form">
                <div class="row">
                    <div class="col s12">
                        <h2 class="center-align">Inicia sesión</h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col s12 input-field">
                        <input id="email" type="email" class="validate" />
                        <label for="email">Correo Electronico</label>
                    </div>
                </div>
                <div class="row">
                    <div class="col s12 input-field">
                        <input id="password" type="password" class="validate">
                        <label for="password">Contraseña</label>
                    </div>
                </div>
                <div class="row signin-btn">
                    <div class="col s12 center-align">
                        <button class="btn waves-effect waves-light blue darken-2">Ingresar</button>
                    </div>
                </div>
                <div class="row">
                    <div class="col s12 center-align">
                        ¿No estás registrado? <a class="indigo-text text-darken-4" href="/signup">Regístrate</a>
                    </div>
                </div>
            </form>
        </div>            
    </div>
</div>`;

module.exports = landing(signinForm);