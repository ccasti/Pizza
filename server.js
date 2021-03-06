var express = require('express');

var app = express();

app.set('view engine', 'pug');

app.use(express.static('public'));

//Rutas
app.get('/', function (req, res) {
	res.render('index', { title: 'Ragustino' });
})

app.get('/carta', function (req, res) {
	res.render('index', { title: 'Nuestros Productos' });
})

app.get('/somos', function (req, res) {
	res.render('index', { title: 'Nosotros' });
})

app.get('/compra', function (req, res) {
	res.render('index', { title: 'Ragustino - Carro' });
})

app.get('/ragsystem-admin', function (req, res) {
	res.render('index', { title: 'Ragustino - Admin' });
})

app.get('/ragsystem-cocina', function (req, res) {
	res.render('index', { title: 'Ragustino - Cocina' });
})

/*app.get('/ragsystem', function (req, res) {
	res.render('index', { title: 'Ragustino - System' });
})

app.get('/signup', function (req, res) {
	res.render('index', { title: 'Signup' });
})

app.get('/signin', function (req, res) {
	res.render('index', { title: 'Signin' });
})
*/

//Productos
app.get('/api/pizzas', function(req, res) {
	var pizzas = [
		{
			id: '100001',
			name: 'Campesina',
			url: 'campesina.png',
			content: 'Exquisitos vegetales preprados de manera especial con un toque de esto y lo otro y terminada de la mejor manera, todo en base de salsa pomodoro y nuestra masa especial',
			price: 9000
		},
		{
			id: '100002',
			name: 'Caprese',
			url: 'caprese.png',
			content: 'Exquisitos vegetales preprados de manera especial con un toque de esto y lo otro y terminada de la mejor manera, todo en base de salsa pomodoro y nuestra masa especial',
			price: 8500
		},
		{
			id: '100003',
			name: 'Caprichosa',
			url: 'caprichosa.png',
			content: 'Exquisitos vegetales preprados de manera especial con un toque de esto y lo otro y terminada de la mejor manera, todo en base de salsa pomodoro y nuestra masa especial',
			price: 9000
		},
		{
			id: '100004',
			name: 'Carnívora',
			url: 'carnivora.png',
			content: 'Exquisitos vegetales preprados de manera especial con un toque de esto y lo otro y terminada de la mejor manera, todo en base de salsa pomodoro y nuestra masa especial',
			price: 10000
		},
		{
			id: '100005',
			name: 'Ibérica',
			url: 'iberica.png',
			content: 'Exquisitos vegetales preprados de manera especial con un toque de esto y lo otro y terminada de la mejor manera, todo en base de salsa pomodoro y nuestra masa especial',
			price: 9000
		},
		{
			id: '100006',
			name: 'Prosciutto',
			url: 'jamon.png',
			content: 'Exquisitos vegetales preprados de manera especial con un toque de esto y lo otro y terminada de la mejor manera, todo en base de salsa pomodoro y nuestra masa especial',
			price: 9000
		}
	];

	res.send(pizzas);
})

app.get('/api/ingredientes', function(req, res) {
	var ingredientes = [
		{
			id: '600001',
			control: 1,
			tipo: 'queso',
			name: 'Mozzarella',
			url: 'mozzarella.jpg',
			gramo: 100,
			price: 2190
		},
		{
			id: '600002',
			control: 1,
			tipo: 'queso',
			name: 'Gruyere',
			url: 'gruyere.jpg',
			gramo: 80,
			price: 2190
		},
		{
			id: '600003',
			control: 1,
			tipo: 'queso',
			name: 'Azul',
			url: 'azul.jpg',
			gramo: 30,
			price: 2190
		},
		{
			id: '600004',
			control: 1,
			tipo: 'queso',
			name: 'Parmesano',
			url: 'parmesano.jpg',
			gramo: 50,
			price: 2190
		},
		{
			id: '600005',
			control: 1,
			tipo: 'carne',
			name: 'Pavo a las Finas Hiervas',
			url: 'pavo.jpg',
			gramo: 150,
			price: 1890
		},
		{
			id: '600006',
			control: 1,
			tipo: 'mar',
			name: 'Pollo al Curry',
			url: 'pollo.jpg',
			gramo: 150,
			price: 1890
		},
		{
			id: '600007',
			control: 1,
			tipo: 'mar',
			name: 'Pollo al Grill',
			url: 'pollo.jpg',
			gramo: 150,
			price: 1890
		},
		{
			id: '600008',
			control: 1,
			tipo: 'carne',
			name: 'Pollo al Pesto',
			url: 'pollo.jpg',
			gramo: 150,
			price: 1890
		},
		{
			id: '600009',
			control: 1,
			tipo: 'carne',
			name: 'Pollo a la Plancha',
			url: 'pollo.jpg',
			gramo: 150,
			price: 1890
		},
		{
			id: '600010',
			control: 1,
			tipo: 'carne',
			name: 'Codero Salteado',
			url: 'cordero.jpg',
			gramo: 150,
			price: 2190
		},
		{
			id: '600011',
			control: 1,
			tipo: 'embus',
			name: 'Jamón Pierna',
			url: 'jamon.jpg',
			gramo: 150,
			price: 1490
		},
		{
			id: '600012',
			control: 1,
			tipo: 'embus',
			name: 'Chorizo Ibérico',
			url: 'chorizo.jpg',
			gramo: 150,
			price: 1890
		},
		{
			id: '600031',
			control: 0,
			tipo: 'verdu',
			name: 'Oregano',
			url: 'oregano.jpg',
			gramo: 1,
			price: 390
		},
		{
			id: '600032',
			control: 0,
			tipo: 'verdu',
			name: 'Pesto Casero de Albahaca y Nueces',
			url: 'pesto.jpg',
			gramo: 1,
			price: 390
		},
		{
			id: '600033',
			control: 0,
			tipo: 'espec',
			name: 'Romero',
			url: 'romero.jpg',
			gramo: 1,
			price: 390
		},
		{
			id: '600034',
			control: 0,
			tipo: 'espec',
			name: 'Pimienta Blanca',
			url: 'pblanca.jpg',
			gramo: 1,
			price: 390
		},
		{
			id: '600035',
			control: 0,
			tipo: 'espec',
			name: 'Pimienta Negra',
			url: 'pnegra.jpg',
			gramo: 1,
			price: 390
		}
	];

	res.send(ingredientes);
})

app.get('/api/otro', function(req, res) {
	var otros = [
		{
			id: '200001',
			name: 'Pollo',
			url: 'sandpollo.png',
			content: 'Pollo, espinacas, rúcula, albahaca, pimientos asados, zucchini asado, cebolla caramelizada y queso mozzarella.',
			tipo: 'calzone',
			price: 5500
		},
		{
			id: '200002',
			name: 'Roast Beef',
			url: 'sandroast.png',
			content: 'Roast Beef, espinacas, rúcula, albahaca, pimientos asados, zucchini asado, cebolla caramelizada y queso mozzarella.',
			tipo: 'calzone',
			price: 5500
		},
		{
			id: '200003',
			name: 'Mixto',
			url: 'sandmixto.png',
			content: 'Pollo, Roast Beef, espinacas, rúcula, albahaca, pimientos asados, zucchini asado, cebolla caramelizada y queso mozzarella.',
			tipo: 'calzone',
			price: 5500
		},
		{
			id: '300001',
			name: 'Piadina Clásica',
			url: 'grissini.jpg',
			content: 'Queso crema, jamón, tomate cherry, rúcula',
			tipo: 'piadina',
			price: 9400
		},
		{
			id: '300002',
			name: 'Piadina Champiñon',
			url: 'minicalzone.jpg',
			content: 'Queso crema, jamón, champiñon, rúcula',
			tipo: 'piadina',
			price: 5000
		},
		{
			id: '300003',
			name: 'Piadina Atún',
			url: 'focaccia.jpg',
			content: 'Mozzarella, atún, cebolla, tomate',
			tipo: 'piadina',
			price: 9600
		}
	];

	res.send(otros);
})

app.get('/api/packs', function(req, res) {
	var packs = [
		{
			id: '510000',
			name: 'PACK INDIVIDUAL A',
			url: 'pack1.png',
			excep: true,
			tipo: "single",
			contents: {
				opciones: [
					{
						id: '511000',
						idpack: '510000',
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
						idpack: '510000',
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
			id: '540000',
			name: 'PACK INDIVIDUAL A',
			url: 'pack1.png',
			excep: true,
			tipo: "four",
			contents: {
				opciones: [
					{
						id: '541000',
						idpack: '540000',
						tipo: 'Pizza',
						selec: false,
						items: [
							{
								idpack: '540000',
								idopt: '541000',
								iditem: '541001',
								itemname: 'Margarita',
								selected: false
							},
							{
								idpack: '540000',
								idopt: '541000',
								iditem: '541002',
								itemname: 'Zucchini Parmesano',
								selected: false
							},
							{
								idpack: '540000',
								idopt: '541000',
								iditem: '541003',
								itemname: 'Caprese',
								selected: false
							},
							{
								idpack: '540000',
								idopt: '541000',
								iditem: '541004',
								itemname: 'Pollo al pesto',
								selected: false
							}
						]
					},
					{
						id: '542000',
						idpack: '540000',
						tipo: 'Líquido',
						selec: false,
						items: [
							{
								idpack: '540000',
								idopt: '542000',
								iditem: '542001',
								itemname: 'Opción 1',
								selected: false
							},
							{
								idpack: '540000',
								idopt: '542000',
								iditem: '542002',
								itemname: 'Opción 2',
								selected: false
							},
							{
								idpack: '540000',
								idopt: '542000',
								iditem: '542003',
								itemname: 'Opción 3',
								selected: false
							},
							{
								idpack: '540000',
								idopt: '542000',
								iditem: '542004',
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
			excep: true,
			tipo: "six",
			contents: {
				opciones: [
					{
						id: '521000',
						idpack: '520000',
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
						idpack: '520000',
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
			excep: true,
			tipo: "eight",
			contents: {
				opciones: [
					{
						id: '531000',
						idpack: '530000',
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
						idpack: '530000',
						tipo: 'Pizza',
						selec: false,
						items: [
							{
								idpack: '530000',
								idopt: '532000',
								iditem: '532001',
								itemname: 'Margarita',
								selected: false
							},
							{
								idpack: '530000',
								idopt: '532000',
								iditem: '532002',
								itemname: 'Zucchini Parmesano',
								selected: false
							},
							{
								idpack: '530000',
								idopt: '532000',
								iditem: '532003',
								itemname: 'Caprese',
								selected: false
							},
							{
								idpack: '530000',
								idopt: '532000',
								iditem: '532004',
								itemname: 'Pollo al pesto',
								selected: false
							},
							{
								idpack: '530000',
								idopt: '532000',
								iditem: '532005',
								itemname: 'Prosciutto',
								selected: false
							},
							{
								idpack: '530000',
								idopt: '532000',
								iditem: '532006',
								itemname: 'Pimentón',
								selected: false
							},
							{
								idpack: '530000',
								idopt: '532000',
								iditem: '532007',
								itemname: 'Campesina',
								selected: false
							},
							{
								idpack: '530000',
								idopt: '532000',
								iditem: '532008',
								itemname: 'Capricciosa',
								selected: false
							},
							{
								idpack: '530000',
								idopt: '532000',
								iditem: '532009',
								itemname: 'Silvestre',
								selected: false
							},
							{
								idpack: '530000',
								idopt: '532000',
								iditem: '532010',
								itemname: 'Carnivora',
								selected: false
							},
							{
								idpack: '530000',
								idopt: '532000',
								iditem: '532011',
								itemname: 'Ibérica',
								selected: false
							},
							{
								idpack: '530000',
								idopt: '532000',
								iditem: '532012',
								itemname: 'Pollo, Jamón y Rucula',
								selected: false
							},
							{
								idpack: '530000',
								idopt: '532000',
								iditem: '532013',
								itemname: 'Patagónica',
								selected: false
							},
							{
								idpack: '530000',
								idopt: '532000',
								iditem: '532014',
								itemname: '4 Quesos',
								selected: false
							},
							{
								idpack: '530000',
								idopt: '532000',
								iditem: '532015',
								itemname: 'Mar y Tierra',
								selected: false
							}
						]
					},
					{
						id: '533000',
						idpack: '530000',
						tipo: 'Líquido',
						selec: false,
						items: [
							{
								idpack: '530000',
								idopt: '533000',
								iditem: '533001',
								itemname: 'Opción 1',
								selected: false
							},
							{
								idpack: '530000',
								idopt: '533000',
								iditem: '533002',
								itemname: 'Opción 2',
								selected: false
							},
							{
								idpack: '530000',
								idopt: '533000',
								iditem: '533003',
								itemname: 'Opción 3',
								selected: false
							},
							{
								idpack: '530000',
								idopt: '533000',
								iditem: '533004',
								itemname: 'Opción 4',
								selected: false
							},
						]
					},
					{
						id: '534000',
						idpack: '530000',
						tipo: 'Líquido',
						selec: false,
						items: [
							{
								idpack: '530000',
								idopt: '534000',
								iditem: '534001',
								itemname: 'Opción 1',
								selected: false
							},
							{
								idpack: '530000',
								idopt: '534000',
								iditem: '534002',
								itemname: 'Opción 2',
								selected: false
							},
							{
								idpack: '530000',
								idopt: '534000',
								iditem: '534003',
								itemname: 'Opción 3',
								selected: false
							},
							{
								idpack: '530000',
								idopt: '534000',
								iditem: '534004',
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
			id: '400001',
			name: 'Fanta Normal',
			content: 'Lata Individual 350ml',
			tipo: 'beblata',
			url: 'fantal.png',
			price: 1750
		},
		{
			id: '400002',
			name: 'Fanta Zero',
			content: 'Lata Individual 350ml',
			tipo: 'beblata',
			url: 'fantalz.png',
			price: 1750
		},
		{
			id: '400003',
			name: 'Coca Cola Normal',
			content: 'Lata Individual 350ml',
			tipo: 'bebgra',
			url: 'cocal.png',
			price: 1750
		},
		{
			id: '400004',
			name: 'Coca Cola Zero',
			content: 'Lata Individual 350ml',
			tipo: 'bebgra',
			url: 'cocalz.png',
			price: 1750
		},
		{
			id: '400005',
			name: 'Coca Cola Normal',
			content: 'Lata Individual 350ml',
			tipo: 'bebext',
			url: 'cocalz.png',
			price: 1750
		},
		{
			id: '400006',
			name: 'Coca Cola Zero',
			content: 'Lata Individual 350ml',
			tipo: 'bebext',
			url: 'cocalz.png',
			price: 1750
		},
		{
			id: '400007',
			name: 'Jugo 1',
			content: 'Lata Individual 350ml',
			tipo: 'jugo',
			url: 'cocalz.png',
			price: 1750
		},
		{
			id: '400008',
			name: 'Jugo 2',
			content: 'Lata Individual 350ml',
			tipo: 'jugo',
			url: 'cocalz.png',
			price: 1750
		},
		{
			id: '400009',
			name: 'Cerveza 1',
			content: 'Lata Individual 350ml',
			tipo: 'cerveza',
			url: 'cocalz.png',
			price: 1750
		},
		{
			id: '400010',
			name: 'Cerveza 2',
			content: 'Lata Individual 350ml',
			tipo: 'cerveza',
			url: 'cocalz.png',
			price: 1750
		},
		{
			id: '400011',
			name: 'Agua 1',
			content: 'Lata Individual 350ml',
			tipo: 'agua',
			url: 'cocalz.png',
			price: 1750
		},
		{
			id: '400012',
			name: 'Agua 2',
			content: 'Lata Individual 350ml',
			tipo: 'agua',
			url: 'cocalz.png',
			price: 1750
		},
		{
			id: '400013',
			name: 'Accesorio 1',
			content: 'Lata Individual 350ml',
			tipo: 'acces',
			url: 'cocalz.png',
			price: 1750
		},
		{
			id: '400014',
			name: 'Accesorio 2',
			content: 'Lata Individual 350ml',
			tipo: 'acces',
			url: 'cocalz.png',
			price: 1750
		},
		{
			id: '400015',
			name: 'Queso 1',
			content: 'Lata Individual 350ml',
			tipo: 'queso',
			url: 'cracor.png',
			price: 1750
		},
		{
			id: '400016',
			name: 'Queso 2',
			content: 'Lata Individual 350ml',
			tipo: 'queso',
			url: 'cuchi.png',
			price: 1750
		},
		{
			id: '400017',
			name: 'Aceituna 1',
			content: 'Lata Individual 350ml',
			tipo: 'aceit',
			url: 'cocalz.png',
			price: 1750
		},
		{
			id: '400018',
			name: 'Aceituna 2',
			content: 'Lata Individual 350ml',
			tipo: 'aceit',
			url: 'cocalz.png',
			price: 1750
		},
		{
			id: '400019',
			name: 'Fruto Seco 1',
			content: 'Lata Individual 350ml',
			tipo: 'secos',
			url: 'cocalz.png',
			price: 1750
		},
		{
			id: '400020',
			name: 'Fruto Seco 2',
			content: 'Lata Individual 350ml',
			tipo: 'secos',
			url: 'cocalz.png',
			price: 1750
		},
		{
			id: '400021',
			name: 'Papa Frita 1',
			content: 'Lata Individual 350ml',
			tipo: 'papas',
			url: 'cocalz.png',
			price: 1750
		},
		{
			id: '400022',
			name: 'Papa Frita 2',
			content: 'Lata Individual 350ml',
			tipo: 'papas',
			url: 'cocalz.png',
			price: 1750
		},
		{
			id: '400023',
			name: 'Chocolate 1',
			content: 'Lata Individual 350ml',
			tipo: 'choco',
			url: 'cocalz.png',
			price: 1750
		},
		{
			id: '400024',
			name: 'Chocolate 2',
			content: 'Lata Individual 350ml',
			tipo: 'choco',
			url: 'cocalz.png',
			price: 1750
		},
		{
			id: '400025',
			name: 'Galleta 1',
			content: 'Lata Individual 350ml',
			tipo: 'galle',
			url: 'cocalz.png',
			price: 1750
		},
		{
			id: '400026',
			name: 'Galleta 2',
			content: 'Lata Individual 350ml',
			tipo: 'galle',
			url: 'cocalz.png',
			price: 1750
		}
	];

	res.send(items);
})

//Compra
app.get('/api/Compra', function(req, res) {
	var compras = [
		{
			id_compra: '10',
			client: 'Prueba Lasagna',
			address: 'Ejemplo N 2563',
			email: 'ejemplo@algo.com',
			fono: '912345678',
			content: [
				{
					name: 'Oferta Lasagna Domingos',
					cantidad: '1',
					bebname: 'Bebida Seleccionada',
					lasname: 'Lasagna Adicional',
					qlasag: '3',
					id: '900003',
					price: 12900,
					oferta_ls: 1
				}
			],
			monto: '19500',
			pago: '1',
			delivery: '1',
			año: '2018',
			mes: '6',
			diam: '29',
			hora: '21',
			minuto: '15',
			repartidor: '',
			cocina: '0',
			reparto: '0',
			ok: '0'
		},
		{
			id_compra: '1',
			client: 'Juanito Perez',
			address: 'Calle algo N 2563',
			email: 'ejemplo@algo.com',
			fono: '912345678',
			content: [
				{
					id: '200001',
					cantidad: '2',
					name: 'Calzone Jamón Pesto',
					url: 'grissini.jpg',//No se utilizará
					content: 'Pomodoro, mozzarella, jamón, pesto, albhaca',//No se utilizará
					tipo: 'calzone',
					price: '9400'
				}
			],
			monto: '19500',
			pago: '1',
			delivery: '1',
			año: '2018',
			mes: '6',
			diam: '29',
			hora: '21',
			minuto: '15',
			repartidor: '',
			cocina: '0',
			reparto: '0',
			ok: '0'
		},
		{
			id_compra: '4',
			client: 'Cristian Castillo',
			address: 'Hochstetter N 385',
			email: 'ejemplo@otro.com',
			fono: '912345678',
			content: [
				{
					id: '200002',
					cantidad: '1',
					name: 'Otro Producto Individual',
					url: 'grissini.jpg',//No se utilizará
					content: 'Pomodoro, mozzarella, jamón, pesto, albhaca',//No se utilizará
					tipo: 'calzone',
					price: '9400'
				},
			],
			monto: '10900',
			pago: '2',
			delivery: '1',
			año: '2018',
			mes: '6',
			diam: '29',
			hora: '21',
			minuto: '15',
			repartidor: '',
			cocina: '1',
			reparto: '0',
			ok: '0'
		},
		{
			id_compra: '2',
			client: 'Pedro Carrasco',
			address: 'Calle otra N 2389',
			email: 'ejemplo@algo.com',
			fono: '912345678',
			content: [
				{
					id: '200001',
					cantidad: '1',
					name: 'Calzone Jamón Pesto',
					url: 'grissini.jpg',//No se utilizará
					content: 'Pomodoro, mozzarella, jamón, pesto, albhaca',//No se utilizará
					tipo: 'calzone',
					price: '9400'
				},
				{
					name: 'Oferta',
					cantidad: '1',
					pizname: 'Pizza Elejida',
					bebname: 'Bebida Elejida',
					id: '900001',
					price: '11900',
					oferta: '1'
				}
			],
			monto: '22800',
			pago: '2',
			delivery: '2',
			año: '2018',
			mes: '6',
			diam: '29',
			hora: '21',
			minuto: '20',
			repartidor: '',
			cocina: '1',
			reparto: '0',
			ok: '0',
			horap: '22',
			minutop: '30'
		},
		{
			id_compra: '3',
			client: 'Juanita Perez',
			address: 'Calle Escondida N 5687',
			email: 'ejemplo@algo.com',
			fono: '912345678',
			content: [
				{
					id: '200001',
					cantidad: '1',
					name: 'Calzone Jamón Pesto',
					url: 'grissini.jpg',//No se utilizará
					content: 'Pomodoro, mozzarella, jamón, pesto, albhaca',//No se utilizará
					tipo: 'calzone',
					price: '9400'
				},
				{
					name: 'Oferta',
					cantidad: '1',
					pizname: 'Pizza Elejida',
					bebname: 'Bebida Elejida',
					id: '900001',
					price: '11900',
					oferta: '1'
				},
				{
					id: '100001',
					cantidad: '1',
					name: 'Pizza a tu gusto',
					ingredientes:[
						{
							control: '1',//No se utilizará
							gramo: '100',//No se utilizará
							id: "600001",
							name: "Mozzarella",
							price: '2190',
							tipo: "queso",
							url: "mozzarella.jpg"//No se utilizará
						},
						{
							control: '1',//No se utilizará
							gramo: '150',//No se utilizará
							id: "600009",
							name: "Pollo a la Plancha",
							price: '1890',
							tipo: "carne",
							url: "pollo.jpg"//No se utilizará
						},
						{
							control: '0',//No se utilizará
							gramo: '1',//No se utilizará
							id: "600031",
							name: "Oregano",
							price: '390',
							tipo: "verdu",
							url: "oregano.jpg"//No se utilizará
						},
						{
							control: '1',//No se utilizará
							gramo: '150',//No se utilizará
							id: "600006",
							name: "Pollo al Curry",
							price: '1890',
							tipo: "carne",
							url: "pollo.jpg"//No se utilizará
						}
					],
					custom: 'true',
					price: '9400'
				}
			],
			monto: '30700',
			pago: '3',
			delivery: '3',
			año: '2018',
			mes: '6',
			diam: '29',
			hora: '21',
			minuto: '20',
			repartidor: '',
			cocina: '1',
			reparto: '1',
			ok: '0',
			fechap: '2018/07/2018',
			horap: '22',
			minutop: '30'
		}
	];

	res.send(compras);
})


//Server
app.listen(3000, function (err) {
	if (err) return console.log('Hubo un error'), process.exit(1);

	console.log('escuchando en el puerto 3000');
})