var yo = require('yo-yo');
var landing = require('../../landing');

var signupForm = yo`<div class="col s10 push-s1 m6 push-m3 l4 push-l4">
    <div class="row">
        <div class="col s12 signup-box">
            <form class="signup-form">
                <div class="row item-form">
                    <div class="col s12">
                        <h2 class="center-align">Ingresa tus datos</h2>
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
                        <input id="name" type="text" />
                        <label for="name">Nombre y Apellidos</label>
                    </div>
                </div>
                <div class="row">
                    <div class="col s12 input-field">
                        <input id="direccion" type="text" />
                        <label for="direccion">Dirección</label>
                    </div>
                </div>
                <div class="row">
                    <div class="col s12 input-field">
                        <input id="password" type="password" class="validate">
                        <label for="password">Contraseña</label>
                    </div>
                </div>
                <div class="row">
                    <div class="col s12 input-field">
                        <input id="check-password" type="password" class="validate">
                        <label for="check-password">Repetir Contraseña</label>
                    </div>
                </div>
                <div class="row signup-btn">
                    <div class="col s12 center-align">
                        <button class="btn waves-effect waves-light blue darken-2">Enviar</button>
                    </div>
                </div>
                <div class="row">
                    <div class="col s12 center-align">
                        ¿Ya estás registrado? <a class="indigo-text text-darken-4" href="/signin">Entrar</a>
                    </div>
                </div>
            </form>
        </div>            
    </div>
</div>`;

module.exports = landing(signupForm);