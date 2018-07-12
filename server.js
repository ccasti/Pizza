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

app.get('/api/ingredientes', function(req, res) {
	var ingredientes = [
		{
			id: '600001',
			control: true,
			tipo: 'queso',
			name: 'Mozzarella',
			url: 'mozzarella.jpg',
			gramo: 100,
			price: 2190
		},
		{
			id: '600002',
			control: true,
			tipo: 'queso',
			name: 'Gruyere',
			url: 'gruyere.jpg',
			gramo: 80,
			price: 2190
		},
		{
			id: '600003',
			control: true,
			tipo: 'queso',
			name: 'Azul',
			url: 'azul.jpg',
			gramo: 30,
			price: 2190
		},
		{
			id: '600004',
			control: true,
			tipo: 'queso',
			name: 'Parmesano',
			url: 'parmesano.jpg',
			gramo: 50,
			price: 2190
		},
		{
			id: '600005',
			control: true,
			tipo: 'carne',
			name: 'Pavo a las Finas Hiervas',
			url: 'pavo.jpg',
			gramo: 150,
			price: 1890
		},
		{
			id: '600006',
			control: true,
			tipo: 'carne',
			name: 'Pollo al Curry',
			url: 'pollo.jpg',
			gramo: 150,
			price: 1890
		},
		{
			id: '600007',
			control: true,
			tipo: 'carne',
			name: 'Pollo al Grill',
			url: 'pollo.jpg',
			gramo: 150,
			price: 1890
		},
		{
			id: '600008',
			control: true,
			tipo: 'carne',
			name: 'Pollo al Pesto',
			url: 'pollo.jpg',
			gramo: 150,
			price: 1890
		},
		{
			id: '600009',
			control: true,
			tipo: 'carne',
			name: 'Pollo a la Plancha',
			url: 'pollo.jpg',
			gramo: 150,
			price: 1890
		},
		{
			id: '600010',
			control: true,
			tipo: 'carne',
			name: 'Codero Salteado',
			url: 'cordero.jpg',
			gramo: 150,
			price: 2190
		},
		{
			id: '600011',
			control: true,
			tipo: 'embu',
			name: 'Jamón Pierna',
			url: 'jamon.jpg',
			gramo: 150,
			price: 1490
		},
		{
			id: '600012',
			control: true,
			tipo: 'embu',
			name: 'Chorizo Ibérico',
			url: 'chorizo.jpg',
			gramo: 150,
			price: 1890
		},
		{
			id: '600031',
			control: false,
			tipo: 'espec',
			name: 'Oregano',
			url: 'oregano.jpg',
			gramo: 1,
			price: 390
		},
		{
			id: '600032',
			control: false,
			tipo: 'espec',
			name: 'Pesto Casero de Albahaca y Nueces',
			url: 'pesto.jpg',
			gramo: 1,
			price: 390
		},
		{
			id: '600033',
			control: false,
			tipo: 'espec',
			name: 'Romero',
			url: 'romero.jpg',
			gramo: 1,
			price: 390
		},
		{
			id: '600034',
			control: false,
			tipo: 'espec',
			name: 'Pimienta Blanca',
			url: 'pblanca.jpg',
			gramo: 1,
			price: 390
		},
		{
			id: '600035',
			control: false,
			tipo: 'espec',
			name: 'Pimienta Negra',
			url: 'pnegra.jpg',
			gramo: 1,
			price: 390
		}
	];

	res.send(ingredientes);
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
						tipo: 'Pizza',
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
						tipo: 'Líquido',
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
						tipo: 'Pizza',
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
						tipo: 'Líquido',
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
						tipo: 'Pizza',
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
						tipo: 'Líquido',
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
			queso: true,
			name: 'Mozzarella',
			url: 'mozzarella.jpg',
			gramo: 100,
			price: 2190
		},
		{
			id: '600002',
			queso: true,
			name: 'Gruyere',
			url: 'gruyere.jpg',
			gramo: 80,
			price: 2190
		},
		{
			id: '600003',
			queso: true,
			name: 'Azul',
			url: 'azul.jpg',
			gramo: 30,
			price: 2190
		},
		{
			id: '600004',
			queso: true,
			name: 'Parmesano',
			url: 'parmesano.jpg',
			gramo: 50,
			price: 2190
		},
		{
			id: '600005',
			carne: true,
			name: 'Pavo a las Finas Hiervas',
			url: 'pavo.jpg',
			gramo: 150,
			price: 1890
		},
		{
			id: '600006',
			carne: true,
			name: 'Pollo al Curry',
			url: 'pollo.jpg',
			gramo: 150,
			price: 1890
		},
		{
			id: '600007',
			carne: true,
			name: 'Pollo al Grill',
			url: 'pollo.jpg',
			gramo: 150,
			price: 1890
		},
		{
			id: '600008',
			carne: true,
			name: 'Pollo al Pesto',
			url: 'pollo.jpg',
			gramo: 150,
			price: 1890
		},
		{
			id: '600009',
			carne: true,
			name: 'Pollo a la Plancha',
			url: 'pollo.jpg',
			gramo: 150,
			price: 1890
		},
		{
			id: '600010',
			carne: true,
			name: 'Codero Salteado',
			url: 'cordero.jpg',
			gramo: 150,
			price: 2190
		}
	];

	res.send(items);
})

app.listen(3000, function (err) {
	if (err) return console.log('Hubo un error'), process.exit(1);

	console.log('escuchando en el puerto 3000');
})