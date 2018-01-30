var express = require('express');

var app = express();

app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/', function (req, res) {
	res.render('index', { title: 'Pizza Algo' });//el index será el .pug de views
})

app.get('/store', function (req, res) {
	res.render('index', { title: 'Tienda en línea' });
})

app.get('/app', function (req, res) {
	res.render('index', { title: 'Administración' });
})

app.get('/signup', function (req, res) {
	res.render('index', { title: 'Signup' });
})

app.get('/signin', function (req, res) {
	res.render('index', { title: 'Signin' });
})

app.listen(3000, function (err) {
	if (err) return console.log('Hubo un error'), process.exit(1);

	console.log('escuchando en el puerto 3000');
})