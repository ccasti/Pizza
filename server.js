var express = require('express');

var app = express();

app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/', function (req, res) {
	res.render('index', { title: 'Ragustino' });//el index será el .pug de views
})

app.get('/signup', function (req, res) {
	res.render('index', { title: 'Signup' });
})

app.get('/signin', function (req, res) {
	res.render('index', { title: 'Signin' });
})

app.get('/carta', function (req, res) {
	res.render('index', { title: 'Ragustino - Carta' });
})

app.get('/packs', function (req, res) {
	res.render('index', { title: 'Ragustino - Packs' });
})

app.get('/fiesta', function (req, res) {
	res.render('index', { title: 'Ragustino - Fiesta' });
})

app.get('/carro', function (req, res) {
	res.render('index', { title: 'Ragustino - Carro' });
})	

app.get('/ragsystem', function (req, res) {
	res.render('index', { title: 'Sistema Interno' });
})

app.get('/estadisticas', function (req, res) {
	res.render('index', { title: 'Estadisticas' });
})

/*app.get('/ragsystem/adm_equipo', function (req, res) {
	res.render('index', { title: 'Adm-Equipo' });
})

app.get('/ragsystem/adm_productos', function (req, res) {
	res.render('index', { title: 'Adm-Productos' });
})*/

app.get('/api/pizzas', function (req, res) {
	var pizzas = [
		{
			pizzaid: '100001',
			pizzaname: 'PIZZA PRIMERA',
			pizzaurl: 'pizza.png',
			pizzacontent: 'Exquisitos vegetales preprados de manera especial con un toque de esto y lo otro y terminada de la mejor manera, todo en base de salsa pomodoro y nuestra masa especial',
			likes: 101,
			liked: false,
			pizzaprice: 9000
		},
		{
			pizzaid: '100002',
			pizzaname: 'PIZZA SEGUNDA',
			pizzaurl: 'pizza2.png',
			pizzacontent: 'Exquisitos vegetales preprados de manera especial con un toque de esto y lo otro y terminada de la mejor manera, todo en base de salsa pomodoro y nuestra masa especial',
			likes: 102,
			liked: false,
			pizzaprice: 8500
		},
		{
			pizzaid: '100003',
			pizzaname: 'PIZZA TERCERA',
			pizzaurl: 'pizza3.png',
			pizzacontent: 'Exquisitos vegetales preprados de manera especial con un toque de esto y lo otro y terminada de la mejor manera, todo en base de salsa pomodoro y nuestra masa especial',
			likes: 103,
			liked: false,
			pizzaprice: 9000
		},
		{
			pizzaid: '100004',
			pizzaname: 'PIZZA CUARTA',
			pizzaurl: 'pizza.png',
			pizzacontent: 'Exquisitos vegetales preprados de manera especial con un toque de esto y lo otro y terminada de la mejor manera, todo en base de salsa pomodoro y nuestra masa especial',
			likes: 104,
			liked: false,
			pizzaprice: 10000
		},
		{
			pizzaid: '100005',
			pizzaname: 'PIZZA QUINTA',
			pizzaurl: 'pizza2.png',
			pizzacontent: 'Exquisitos vegetales preprados de manera especial con un toque de esto y lo otro y terminada de la mejor manera, todo en base de salsa pomodoro y nuestra masa especial',
			likes: 105,
			liked: false,
			pizzaprice: 9000
		},
		{
			pizzaid: '100006',
			pizzaname: 'PIZZA SEXTA',
			pizzaurl: 'pizza3.png',
			pizzacontent: 'Exquisitos vegetales preprados de manera especial con un toque de esto y lo otro y terminada de la mejor manera, todo en base de salsa pomodoro y nuestra masa especial',
			likes: 106,
			liked: false,
			pizzaprice: 10000
		},
		{
			pizzaid: '100007',
			pizzaname: 'PIZZA SEPTIMA',
			pizzaurl: 'pizza.png',
			pizzacontent: 'Exquisitos vegetales preprados de manera especial con un toque de esto y lo otro y terminada de la mejor manera, todo en base de salsa pomodoro y nuestra masa especial',
			likes: 107,
			liked: false,
			pizzaprice: 9000
		},
		{
			pizzaid: '100008',
			pizzaname: 'PIZZA OCTAVA',
			pizzaurl: 'pizza2.png',
			pizzacontent: 'Exquisitos vegetales preprados de manera especial con un toque de esto y lo otro y terminada de la mejor manera, todo en base de salsa pomodoro y nuestra masa especial',
			likes: 108,
			liked: false,
			pizzaprice: 8500
		},
		{
			pizzaid: '100009',
			pizzaname: 'PIZZA NOVENA',
			pizzaurl: 'pizza3.png',
			pizzacontent: 'Exquisitos vegetales preprados de manera especial con un toque de esto y lo otro y terminada de la mejor manera, todo en base de salsa pomodoro y nuestra masa especial',
			likes: 109,
			liked: false,
			pizzaprice: 9000
		},
		{
			pizzaid: '100010',
			pizzaname: 'PIZZA DECIMA',
			pizzaurl: 'pizza.png',
			pizzacontent: 'Exquisitos vegetales preprados de manera especial con un toque de esto y lo otro y terminada de la mejor manera, todo en base de salsa pomodoro y nuestra masa especial',
			likes: 110,
			liked: false,
			pizzaprice: 10000
		},
		{
			pizzaid: '1000011',
			pizzaname: 'PIZZA UNDECIMA',
			pizzaurl: 'pizza2.png',
			pizzacontent: 'Exquisitos vegetales preprados de manera especial con un toque de esto y lo otro y terminada de la mejor manera, todo en base de salsa pomodoro y nuestra masa especial',
			likes: 111,
			liked: false,
			pizzaprice: 9000
		},
		{
			pizzaid: '1000012',
			pizzaname: 'PIZZA DUODECIMA',
			pizzaurl: 'pizza3.png',
			pizzacontent: 'Exquisitos vegetales preprados de manera especial con un toque de esto y lo otro y terminada de la mejor manera, todo en base de salsa pomodoro y nuestra masa especial',
			likes: 112,
			liked: false,
			pizzaprice: 10000
		},
		{
			pizzaid: '1000013',
			pizzaname: 'PIZZA TRECEAVA',
			pizzaurl: 'pizza3.png',
			pizzacontent: 'Exquisitos vegetales preprados de manera especial con un toque de esto y lo otro y terminada de la mejor manera, todo en base de salsa pomodoro y nuestra masa especial',
			likes: 113,
			liked: false,
			pizzaprice: 10000
		}
	];

	res.send(pizzas);
})

app.get('/api/vegetales', function (req, res) {
	var vegetales = [
		{
			vegid: '110001',
			vegname: 'Vegetal_1',
			vegurl: 'vegetal.jpg',
			vegprice: 1200
		},
		{
			vegid: '110002',
			vegname: 'Vegetal_2',
			vegurl: 'vegetal.jpg',
			vegprice: 1200
		},
		{
			vegid: '110003',
			vegname: 'Vegetal_3',
			vegurl: 'vegetal.jpg',
			vegprice: 1200
		},
		{
			vegid: '110004',
			vegname: 'Vegetal_4',
			vegurl: 'vegetal.jpg',
			vegprice: 1200
		},
		{
			vegid: '110005',
			vegname: 'Vegetal_5',
			vegurl: 'vegetal.jpg',
			vegprice: 1200
		},
		{
			vegid: '110006',
			vegname: 'Vegetal_6',
			vegurl: 'vegetal.jpg',
			vegprice: 1200
		}
	];

	res.send(vegetales);
})

app.get('/api/carnes', function (req, res) {
	var carnes = [
		{
			carid: '120001',
			carname: 'Carne_1',
			carurl: 'carne.jpg',
			carprice: 1200
		},
		{
			carid: '120002',
			carname: 'Carne_2',
			carurl: 'carne.jpg',
			carprice: 1200
		},
		{
			carid: '120003',
			carname: 'Carne_3',
			carurl: 'carne.jpg',
			carprice: 1200
		},
		{
			carid: '120004',
			carname: 'Carne_4',
			carurl: 'carne.jpg',
			carprice: 1200
		},
		{
			carid: '120005',
			carname: 'Carne_5',
			carurl: 'carne.jpg',
			carprice: 1200
		},
		{
			carid: '120006',
			carname: 'Carne_6',
			carurl: 'carne.jpg',
			carprice: 1200
		}
	];

	res.send(carnes);
})

app.get('/api/ensaladas', function (req, res) {
	var ensaladas = [
		{
			ensaladaid: '200001',
			ensaladaname: 'ENSALADA 1',
			ensaladaurl: 'ensalada.jpg',
			ensaladacontent: 'detalle de la ensalada con los productos que contiene y las característics que se quiera destacar',
			likes: 201,
			liked: false,
			ensaladaprice: 10000
		},
		{
			ensaladaid: '200002',
			ensaladaname: 'ENSALADA 2',
			ensaladaurl: 'ensalada.jpg',
			ensaladacontent: 'detalle de la ensalada 2 con los productos que contiene y las característics que se quiera destacar',
			likes: 202,
			liked: false,
			ensaladaprice: 9000
		},
		{
			ensaladaid: '200003',
			ensaladaname: 'ENSALADA 3',
			ensaladaurl: 'ensalada.jpg',
			ensaladacontent: 'detalle de la ensalada 3 con los productos que contiene y las característics que se quiera destacar',
			likes: 203,
			liked: false,
			ensaladaprice: 8000
		}
	];

	res.send(ensaladas);
})

app.get('/api/adicionales', function (req, res) {
	var adicionales = [
		{
			adicionalid: '300001',
			adicionalname: 'GRISSINI',
			adicionalurl: 'grissini.jpg',
			adicionalcontent: 'detalle y características de Grissini',
			likes: 301,
			liked: false,
			adicionalprice: 5000
		},
		{
			adicionalid: '300002',
			adicionalname: 'MINI CALZONE',
			adicionalurl: 'minicalzone.jpg',
			adicionalcontent: 'detalle y características de Mini Calzone',
			likes: 302,
			liked: false,
			adicionalprice: 5000
		},
		{
			adicionalid: '300003',
			adicionalname: 'FOCACCIA',
			adicionalurl: 'focaccia.jpg',
			adicionalcontent: 'detalle y características de Focaccia',
			likes: 303,
			liked: false,
			adicionalprice: 5000
		}
	];

	res.send(adicionales);
})

app.get('/api/packs', function (req, res) {
	var packs = [
		{
			packid: '500001',
			packname: 'PACK INDIVIDUAL 1',
			packurl: 'packcard.jpg',
			packcontent: 'Productos 1 a n del Pack Individual 1',
			likes: 501,
			liked: false,
			packprice: 8000
		},
		{
			packid: '500002',
			packname: 'PACK INDIVIDUAL 2',
			packurl: 'packcard.jpg',
			packcontent: 'Productos 1 a n del Pack Individual 2',
			likes: 502,
			liked: false,
			packprice: 11000
		},
		{
			packid: '500003',
			packname: 'PACK INDIVIDUAL 3',
			packurl: 'packcard.jpg',
			packcontent: 'Productos 1 a n del Pack Individual 3',
			likes: 503,
			liked: false,
			packprice: 15000
		}
	];

	res.send(packs);
})

app.listen(3000, function (err) {
	if (err) return console.log('Hubo un error'), process.exit(1);

	console.log('escuchando en el puerto 3000');
})