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
			contents: {
				opciones: [
					{
						id: '511000',
						tipo: 'Elije tu Pizza',
						selec: false,
						items: [
							{
								idpack: '510000',
								idopt: '511000',
								iditem: '511001',
								itemname: 'Margarita',
								selected: false
							},
							{
								idpack: '510000',
								idopt: '511000',
								iditem: '511002',
								itemname: 'Zucchini Parmesano',
								selected: false
							},
							{
								idpack: '510000',
								idopt: '511000',
								iditem: '511003',
								itemname: 'Caprese',
								selected: false
							},
							{
								idpack: '510000',
								idopt: '511000',
								iditem: '511004',
								itemname: 'Pollo al pesto',
								selected: false
							}
						]
					},
					{
						id: '512000',
						tipo: 'Elije tu Líquido',
						selec: false,
						items: [
							{
								idpack: '510000',
								idopt: '512000',
								iditem: '512001',
								itemname: 'Opción 1',
								selected: false
							},
							{
								idpack: '510000',
								idopt: '512000',
								iditem: '512002',
								itemname: 'Opción 2',
								selected: false
							},
							{
								idpack: '510000',
								idopt: '512000',
								iditem: '512003',
								itemname: 'Opción 3',
								selected: false
							},
							{
								idpack: '510000',
								idopt: '512000',
								iditem: '512004',
								itemname: 'Opción 4',
								selected: false
							}
						]
					}
				]
			},
			content: [
				{
					optid: '513001',
					optname: '- Ensalada Ragustino'
				},
				{
					optid: '513002',
					optname: '- Grissinis'
				},
				
				{
					optid: '513003',
					optname: '- Bombones Ferrero Rocher (3 unidades)'
				},
				{
					optid: '513004',
					optname: '- Cortador de Pizza'
				},
				{
					optid: '513005',
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
			contents: {
				opciones: [
					{
						id: '521000',
						tipo: 'Elije tu Pizza',
						selec: false,
						items: [
							{
								idpack: '520000',
								idopt: '521000',
								iditem: '521001',
								itemname: 'Margarita',
								selected: false
							},
							{
								idpack: '520000',
								idopt: '521000',
								iditem: '521002',
								itemname: 'Zucchini Parmesano',
								selected: false
							},
							{
								idpack: '520000',
								idopt: '521000',
								iditem: '521003',
								itemname: 'Caprese',
								selected: false
							},
							{
								idpack: '520000',
								idopt: '521000',
								iditem: '521004',
								itemname: 'Pollo al pesto',
								selected: false
							},
							{
								idpack: '520000',
								idopt: '521000',
								iditem: '521005',
								itemname: 'Prosciutto',
								selected: false
							},
							{
								idpack: '520000',
								idopt: '521000',
								iditem: '521006',
								itemname: 'Pimentón',
								selected: false
							},
							{
								idpack: '520000',
								idopt: '521000',
								iditem: '521007',
								itemname: 'Campesina',
								selected: false
							},
							{
								idpack: '520000',
								idopt: '521000',
								iditem: '521008',
								itemname: 'Capricciosa',
								selected: false
							},
							{
								idpack: '520000',
								idopt: '521000',
								iditem: '521009',
								itemname: 'Silvestre',
								selected: false
							}
						]
					},
					{
						id: '522000',
						tipo: 'Elije tu Líquido',
						selec: false,
						items: [
							{
								idpack: '520000',
								idopt: '522000',
								iditem: '522001',
								itemname: 'Opción 1',
								selected: false
							},
							{
								idpack: '520000',
								idopt: '522000',
								iditem: '522002',
								itemname: 'Opción 2',
								selected: false
							},
							{
								idpack: '520000',
								idopt: '522000',
								iditem: '522003',
								itemname: 'Opción 3',
								selected: false
							},
							{
								idpack: '520000',
								idopt: '522000',
								iditem: '522004',
								itemname: 'Opción 4',
								selected: false
							}
						]
					}
				]
			},
			content: [
				{
					optid: '523001',
					optname: '- Ensalada Ragustino'
				},
				{
					optid: '523002',
					optname: '- 02 Mini Focaccias Cebolla-Aceitunas'
				},
				{
					optid: '523003',
					optname: '- Maní Crocante con Jamón Ahuado 100g'
				},
				{
					optid: '523004',
					optname: '- Bombones Ferrero Rocher (3 unidades)'
				},
				{
					optid: '523005',
					optname: '- Cortador de Pizza Vinilo'
				},
				{
					optid: '523006',
					optname: '- Tarjeta de Saludo'
				}
			],
			likes: 502,
			liked: false,
			price: 22900
		},
		{
			id: '530000',
			name: 'PACK INDIVIDUAL C',
			url: 'pack3.png',
			contents: {
				opciones: [
					{
						id: '531000',
						tipo: 'Elije tu Pizza',
						selec: false,
						items: [
							{
								idpack: '530000',
								idopt: '531000',
								iditem: '531001',
								itemname: 'Margarita',
								selected: false
							},
							{
								idpack: '530000',
								idopt: '531000',
								iditem: '531002',
								itemname: 'Zucchini Parmesano',
								selected: false
							},
							{
								idpack: '530000',
								idopt: '531000',
								iditem: '531003',
								itemname: 'Caprese',
								selected: false
							},
							{
								idpack: '530000',
								idopt: '531000',
								iditem: '531004',
								itemname: 'Pollo al pesto',
								selected: false
							},
							{
								idpack: '530000',
								idopt: '531000',
								iditem: '531005',
								itemname: 'Prosciutto',
								selected: false
							},
							{
								idpack: '530000',
								idopt: '531000',
								iditem: '531006',
								itemname: 'Pimentón',
								selected: false
							},
							{
								idpack: '530000',
								idopt: '531000',
								iditem: '531007',
								itemname: 'Campesina',
								selected: false
							},
							{
								idpack: '530000',
								idopt: '531000',
								iditem: '531008',
								itemname: 'Capricciosa',
								selected: false
							},
							{
								idpack: '530000',
								idopt: '531000',
								iditem: '521009',
								itemname: 'Silvestre',
								selected: false
							},
							{
								idpack: '530000',
								idopt: '531000',
								iditem: '521010',
								itemname: 'Carnivora',
								selected: false
							},
							{
								idpack: '530000',
								idopt: '531000',
								iditem: '521011',
								itemname: 'Ibérica',
								selected: false
							},
							{
								idpack: '530000',
								idopt: '531000',
								iditem: '521012',
								itemname: 'Pollo, Jamón y Rucula',
								selected: false
							},
							{
								idpack: '530000',
								idopt: '531000',
								iditem: '521013',
								itemname: 'Patagónica',
								selected: false
							},
							{
								idpack: '530000',
								idopt: '531000',
								iditem: '521014',
								itemname: '4 Quesos',
								selected: false
							},
							{
								idpack: '530000',
								idopt: '531000',
								iditem: '521015',
								itemname: 'Mar y Tierra',
								selected: false
							}
						]
					},
					{
						id: '532000',
						tipo: 'Elije tu Líquido',
						selec: false,
						items: [
							{
								idpack: '530000',
								idopt: '532000',
								iditem: '532001',
								itemname: 'Opción 1',
								selected: false
							},
							{
								idpack: '530000',
								idopt: '532000',
								iditem: '532002',
								itemname: 'Opción 2',
								selected: false
							},
							{
								idpack: '530000',
								idopt: '532000',
								iditem: '532003',
								itemname: 'Opción 3',
								selected: false
							},
							{
								idpack: '530000',
								idopt: '532000',
								iditem: '532004',
								itemname: 'Opción 4',
								selected: false
							},
						]
					}
				]
			},
			content: [
				{
					optid: '533001',
					optname: '- Ensalada Ragustino'
				},
				{
					optid: '533002',
					optname: '- 04 Mini Focaccias Cebolla-Aceitunas'
				},
				{
					optid: '533003',
					optname: '- Almendras Naturales 80g'
				},
				{
					optid: '533004',
					optname: '- Aceitunas Rellenas de Almendras Fragata 142g (3 unidades)'
				},
				{
					optid: '533005',
					optname: '- Bombones Ferrero Rocher (3 unidades)'
				},
				{
					optid: '533006',
					optname: '- Mini cuchillos corta quesos (5 piezas)'
				},
				{
					optid: '533007',
					optname: '- Tarjeta de Saludo'
				}
			],
			likes: 503,
			liked: false,
			price: 24900
		},
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