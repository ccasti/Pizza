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

app.get('/ragsystem', function (req, res) {
	res.render('index', { title: 'Sistema Interno' });
})

app.get('/estadisticas', function (req, res) {
	res.render('index', { title: 'Estadisticas' });
})

/*app.get('/ragsystem/adm_equipo', function (req, res) {
	res.render('index', { title: 'Adm-Equipo' });
})*/

app.get('/adm_productos', function (req, res) {
	res.render('index', { title: 'Adm-Productos' });
})

app.get('/api/pizzas', function(req, res) {
	var pizzas = [
		{
			id: '100001',
			name: 'PIZZA PRIMERA',
			url: 'pizza.png',
			content: 'Exquisitos vegetales preprados de manera especial con un toque de esto y lo otro y terminada de la mejor manera, todo en base de salsa pomodoro y nuestra masa especial',
			likes: 101,
			liked: false,
			price: 9000
		},
		{
			id: '100002',
			name: 'PIZZA SEGUNDA',
			url: 'pizza2.png',
			content: 'Exquisitos vegetales preprados de manera especial con un toque de esto y lo otro y terminada de la mejor manera, todo en base de salsa pomodoro y nuestra masa especial',
			likes: 102,
			liked: false,
			price: 8500
		},
		{
			id: '100003',
			name: 'PIZZA TERCERA',
			url: 'pizza3.png',
			content: 'Exquisitos vegetales preprados de manera especial con un toque de esto y lo otro y terminada de la mejor manera, todo en base de salsa pomodoro y nuestra masa especial',
			likes: 103,
			liked: false,
			price: 9000
		},
		{
			id: '100004',
			name: 'PIZZA CUARTA',
			url: 'pizza.png',
			content: 'Exquisitos vegetales preprados de manera especial con un toque de esto y lo otro y terminada de la mejor manera, todo en base de salsa pomodoro y nuestra masa especial',
			likes: 104,
			liked: false,
			price: 10000
		},
		{
			id: '100005',
			name: 'PIZZA QUINTA',
			url: 'pizza2.png',
			content: 'Exquisitos vegetales preprados de manera especial con un toque de esto y lo otro y terminada de la mejor manera, todo en base de salsa pomodoro y nuestra masa especial',
			likes: 105,
			liked: false,
			price: 9000
		},
		{
			id: '100006',
			name: 'PIZZA SEXTA',
			url: 'pizza3.png',
			content: 'Exquisitos vegetales preprados de manera especial con un toque de esto y lo otro y terminada de la mejor manera, todo en base de salsa pomodoro y nuestra masa especial',
			likes: 105,
			liked: true,
			price: 9000
		}
	];

	res.send(pizzas);
})

app.get('/api/vegetales', function(req, res) {
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

app.get('/api/carnes', function(req, res) {
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

app.get('/api/calzones', function(req, res) {
	var calzones = [
		{
			id: '200001',
			name: 'CALZONE JAMON-PESTO',
			url: 'grissini.jpg',
			content: 'Pomodoro, mozzarella, jamón, pesto, albhaca',
			likes: 301,
			liked: false,
			price: 9400
		},
		{
			id: '200002',
			name: 'CALZONE CHAMPIÑON',
			url: 'minicalzone.jpg',
			content: 'Pomodoro, mozzarella, jamón, champiñones, oregano',
			likes: 302,
			liked: false,
			price: 9600
		},
		{
			id: '200003',
			name: 'CALZONE PIMENTON',
			url: 'focaccia.jpg',
			content: 'Pomodoro, mozzarella, pimentón asado, zuchinni asado',
			likes: 303,
			liked: false,
			price: 8900
		}
	];

	res.send(calzones);
})

app.get('/api/piadinas', function(req, res) {
	var piadinas = [
		{
			id: '300001',
			name: 'PIADINA CLASICA',
			url: 'grissini.jpg',
			content: 'Queso crema, jamón, tomate cherry, rúcula',
			likes: 301,
			liked: false,
			price: 9400
		},
		{
			id: '300002',
			name: 'PIADINA CHAMPIÑON',
			url: 'minicalzone.jpg',
			content: 'Queso crema, jamón, champiñon, rúcula',
			likes: 302,
			liked: false,
			price: 5000
		},
		{
			id: '300003',
			name: 'PIADINA ATUN',
			url: 'focaccia.jpg',
			content: 'Mozzarella, atún, cebolla, tomate',
			likes: 303,
			liked: false,
			price: 9600
		}
	];

	res.send(piadinas);
})

app.get('/api/packs', function(req, res) {
	var packs = [
		{
			id: '510000',
			name: 'PACK INDIVIDUAL A',
			url: 'pack1.png',
			contents: [
				{
					optid: '510001',
					opttipo: 'Elije tu Pizza',
					optname: [
						{
							itemid: '100001',
							itemname: 'Margarita'
						},
						{
							itemid: '100002',
							itemname: 'Zucchini Parmesano'
						},
						{
							itemid: '100003',
							itemname: 'Caprese'
						},
						{
							itemid: '100004',
							itemname: 'Margarita'
						}
					]
				},
				{
					optid: '500004',
					opttipo: 'Elije tu Líquido',
					optname: [
						{
							itemid: '190001',
							itemname: 'Opción 1'
						},
						{
							itemid: '190002',
							itemname: 'Opción 2'
						},
						{
							itemid: '190003',
							itemname: 'Opción 3'
						},
						{
							itemid: '190004',
							itemname: 'Opción 4'
						}
					]
				}
			],
			content: [
				{
					optid: '50002',
					optname: '- Ensalada Ragustino'
				},
				{
					optid: '500003',
					optname: '- Grissinis'
				},
				
				{
					optid: '500005',
					optname: '- Bombones Ferrero Rocher (3 unidades)'
				},
				{
					optid: '500006',
					optname: '- Cortador de Pizza'
				},
				{
					optid: '500007',
					optname: '- Tarjeta de Saludo'
				}
			],
			likes: 501,
			liked: false,
			price: 18900
		},
		{
			id: '520000',
			name: 'PACK INDIVIDUAL B',
			url: 'pack2.png',
			contents: [
				{
					optid: '500001',
					opttipo: 'Elije tu Pizza',
					optname: [
						{
							itemid: '100001',
							itemname: 'Margarita'
						},
						{
							itemid: '100002',
							itemname: 'Zucchini Parmesano'
						},
						{
							itemid: '100003',
							itemname: 'Caprese'
						},
						{
							itemid: '100004',
							itemname: 'Margarita'
						},
						{
							itemid: '100005',
							itemname: 'Prosciutto'
						},
						{
							itemid: '100006',
							itemname: 'Pimentón'
						},
						{
							itemid: '100007',
							itemname: 'Campesina'
						},
						{
							itemid: '100008',
							itemname: 'Capricciosa'
						},
						{
							itemid: '100009',
							itemname: 'Silvestre'
						}
					]
				},
				{
					optid: '500004',
					opttipo: 'Elije tu Líquido',
					optname: [
						{
							itemid: '190001',
							itemname: 'Opción 1'
						},
						{
							itemid: '190002',
							itemname: 'Opción 2'
						},
						{
							itemid: '190003',
							itemname: 'Opción 3'
						},
						{
							itemid: '190004',
							itemname: 'Opción 4'
						}
					]
				}
			],
			content: [
				{
					optid: '500002',
					optname: '- Ensalada Ragustino'
				},
				{
					optid: '500003',
					optname: '- 02 Mini Focaccias Cebolla-Aceitunas'
				},
				{
					optid: '500005',
					optname: '- Maní Crocante con Jamón Ahuado 100g'
				},
				{
					optid: '500006',
					optname: '- Bombones Ferrero Rocher (3 unidades)'
				},
				{
					optid: '500007',
					optname: '- Cortador de Pizza Vinilo'
				},
				{
					optid: '500008',
					optname: '- Tarjeta de Saludo'
				}
			],
			likes: 501,
			liked: false,
			price: 22900
		},
		{
			id: '530000',
			name: 'PACK INDIVIDUAL C',
			url: 'pack3.png',
			contents: [
				{
					optid: '500001',
					opttipo: 'Elije tu Pizza',
					optname: [
						{
							itemid: '100001',
							itemname: 'Margarita'
						},
						{
							itemid: '100002',
							itemname: 'Zucchini Parmesano'
						},
						{
							itemid: '100003',
							itemname: 'Caprese'
						},
						{
							itemid: '100004',
							itemname: 'Margarita'
						},
						{
							itemid: '100005',
							itemname: 'Prosciutto'
						},
						{
							itemid: '100006',
							itemname: 'Pimentón'
						},
						{
							itemid: '100007',
							itemname: 'Campesina'
						},
						{
							itemid: '100008',
							itemname: 'Capricciosa'
						},
						{
							itemid: '100009',
							itemname: 'Silvestre'
						},
						{
							itemid: '100010',
							itemname: 'Carnivora'
						},
						{
							itemid: '100011',
							itemname: 'Ibérica'
						},
						{
							itemid: '100012',
							itemname: 'Pollo, Jamón y Rucula'
						},
						{
							itemid: '100013',
							itemname: 'Patagónica'
						},
						{
							itemid: '100014',
							itemname: '4 Quesos'
						},
						{
							itemid: '100015',
							itemname: 'Mar y Tierra'
						}
					]
				},
				{
					optid: '500004',
					opttipo: 'Elije tu Líquido',
					optname: [
						{
							itemid: '190001',
							itemname: 'Opción 1'
						},
						{
							itemid: '190002',
							itemname: 'Opción 2'
						},
						{
							itemid: '190003',
							itemname: 'Opción 3'
						},
						{
							itemid: '190004',
							itemname: 'Opción 4'
						}
					]
				}
			],
			content: [
				{
					optid: '500002',
					optname: '- Ensalada Ragustino'
				},
				{
					optid: '500003',
					optname: '- 04 Mini Focaccias Cebolla-Aceitunas'
				},
				{
					optid: '500005',
					optname: '- Almendras Naturales 80g'
				},
				{
					optid: '500006',
					optname: '- Aceitunas Rellenas de Almendras Fragata 142g (3 unidades)'
				},
				{
					optid: '500007',
					optname: '- Bombones Ferrero Rocher (3 unidades)'
				},
				{
					optid: '500008',
					optname: '- Mini cuchillos corta quesos (5 piezas)'
				},
				{
					optid: '500008',
					optname: '- Tarjeta de Saludo'
				}
			],
			likes: 501,
			liked: false,
			price: 24900
		}
	];

	res.send(packs);
})

app.get('/api/items', function(req, res) {
	var items = [
		{
			id: '600001',
			name: 'Producto Individual 1',
			url: 'vegetal.jpg',
			content: 'Detalle Producto Individual 1',
			price: 1000
		},
		{
			id: '600002',
			name: 'Producto Individual 2',
			url: 'vegetal.jpg',
			content: 'Detalle Producto Individual 2',
			price: 1200
		},
		{
			id: '600003',
			name: 'Producto Individual 3',
			url: 'bebida.jpg',
			content: 'Detalle Producto Individual 3',
			price: 5000
		}
	];

	res.send(items);
})

app.listen(3000, function (err) {
	if (err) return console.log('Hubo un error'), process.exit(1);

	console.log('escuchando en el puerto 3000');
})