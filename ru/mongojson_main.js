/*
----------------
Collection sites
----------------
*/
{
	_id: new ObjectId("519373cc5f6084a828b065ff"),
	title: 'Паркетный пол',
	slug: 'parketnypol', // unique index
	urls: [ // Index
		'http://parket-nn.ru',
		'http://parketnn.ru'
	],

	sign_date: new Date(2013, 3, 5),
	expiration_date: new Date(2014, 3, 5),
	online_manager_version: 1.1,
	site_code: '<script type="text/javascript" src="http://on-linemanager.ru/client.php?id=sDfF23fvs32d"></script>',
	manager: {
				name: 'svetlana',
				password_hash: 'asdf3e232fwsxdSDdf'
				},

	visitors: [ObjectId("51937ft32f6084a828b065cc")]
}

/*
----------------
Collection visitors
----------------
*/
{
	_id: new ObjectId("51937ft32f6084a828b065cc"),
	site_id: new ObjectId("519373cc5f6084a828b065ff"), // Index
	v_id: 'asdf',  // unique index
	system_info: {
		country: 'Russia',
		city: 'Moscow',
		browser: 'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.64 Safari/537.31',
		timezone: '+0400',
		ip: '213.54.25.157',
		},
	date_in: new Date(2013, 4, 5, 14, 53), // Index
	date_out: new Date(2013, 4, 5, 14, 57),
	landing_page: '/about.html',
	messages: [
	{
		text: 'Здравствуйте',
		time: new Date(2014, 4, 5, 14, 54, 17),
		page: '/contacts.html',
		manager: 'svetlana',
		out: true
	},
	{
		text: 'Добрый день, как я могу Вам помочь?',
		time: new Date(2014, 4, 5, 14, 54, 35),
		page: '/contacts.html',
		manager: 'svetlana',
		out: false
	}
	]	
}
/*
-------
queries
-------

1. Модуль статистика
	1.1 Посетители, заходившие на сайт, за период
	db.collection('visitors', function(error, colSites) {
		var query = {
			urls: 'http://parketnn.ru'
			}
		var d = db.sites.findOne(query);
		
		var query = {
			site_id: d._id,
			'date_in': {'$gte': new Date(2013, 4, 5), '$lte': new Date(2013, 4, 7)}
			}
		db.visitors.find(query).pretty();
			
	});
	
	1.2 Все сообщения посетителей за этот период
	db.collection('clients', function(error, colSites) {
		var query = {
			urls: 'http://parketnn.ru'
			}
		var d = db.sites.findOne(query);
		
		var query = {
			site_id: d._id,
			'date_in': {'$gte': new Date(2013, 4, 5), '$lte': new Date(2013, 4, 7)}
			}
		var pattern = {
				'messages': true
			};
		db.visitors.find(query, pattern).pretty();
		
		colSites.find(query, pattern).toArray( function(error, docs) {
		
		});
	});
	
	1.3 Все сообщения посетителя, за период
	db.collection('clients', function(error, colSites) {
		
		var id = ObjectId("519373f25f6084a828b06600");
		var query = {
			_id: id,
			'date_in': {'$gte': new Date(2013, 4, 5), '$lte': new Date(2013, 4, 7)}
			}
		var pattern = {
				'messages': true
			};
		db.visitors.find(query, pattern).pretty();
		
		colSites.find(query, pattern).toArray( function(error, docs) {
		
		});
	});
	
2. Посетители

	2.1 Заход посетителя на сайт, добавление нового посетителя

	var query = {
			urls: 'http://parketnn.ru'
			}
	var d = db.sites.findOne(query);
	
	var data = {
		site_id: d._id,
		v_id: Math.random().toString(36).substr(2,16),
		system_info: {
			country: 'Russia',
			city: 'Moscow',
			browser: 'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.64 Safari/537.31',
			timezone: '+0400',
			ip: '213.54.25.157',
			},
		date_in: new Date(),
		landing_page: '/about.html',
		messages: []
		}
	
	
	db.visitors.save(data);
	
3 Чат с посетителем
	3.1 Добавление, написанного посетителем в историю
	
	var query = {
				'_id': ObjectId("51937e715f6084a828b06601")
			};
	var data = {
			text: 'Hello',
			time: new Date(),
			manager: 'svetlana',
			out: true
		}
			
	var update = {
			'$addToSet': {'messages': data}
		};
	db.visitors.update(query, update, false, true);
	
	3.2 Добавление, написанного администратором в историю
	
	var query = {
				'_id': ObjectId("51937e715f6084a828b06601")
			};
	var data = {
			text: 'hi',
			time: new Date(),
			manager: 'svetlana',
			out: false
		}
			
	var update = {
			'$addToSet': {'messages': data}
		};
	db.visitors.update(query, update, false, true);
	
	4. Работа с файлами
	
	4.1 Загрузка файла на сервер
	
		mongofiles put filename
		
		new GridStore(db, file.name, "w", { "content_type": file.type }).open(function(err, gridStore) {
			if ( err ) {
				console.log(err);
			}
			gridStore.writeFile(file.path, function(err, fileInfo) {
				if ( err ) {
					console.log(err);
				}
				
				fs.unlinkSync(file.path);
				db.close();
			});
	
	4.2 Отображенеи файла пользователю
	
		mongofiles get filename
		
		db.open(function(err, client) {
            
            new GridStore(db, filename, "r").open(function(err, gridStore) {
                if ( err ) {
                    console.log(err);
                }
                var stream = gridStore.stream(true);
                stream.on("end", function(err) { 
                    db.close();
                });
                stream.pipe(res);
                
            });
            
        });
	
	### Server data structures ###
	
	** Replica set **
	1. Primary server ( with journaling )
	2. Slave replication server 
	3. Possibly one backcup replication server
	4. One arbitraty server
	
	** Replica set # **
	
	One ore more replica sets depending on scaling
	
	
	Sharding on more than one replica sets
	
	Other configuration:
	
	* Bootstrap js lib is dojo.
	
	Alternative: Sencha ExtJS
		License: ~ $400
		Well documented
		Widely used and free for Open source software
	
	* Javascript Grid display like table libraries and plugins
	
	1. jQgrid
	
	2. Dojo grid
	
	3. Google data visualization
	
	
	* To build from basement:
	
	1. Backbone
		+ Good documented, many projects
		- Old, dependent
		
	2. Knockout
		+ New, AND, flexible
		- Not proven
				
	3. Angular JS
		+ Newest, big community support, actively developed, no dependecies
		- Not proven
		
	* Visualization and chart tools
	
	1. Google visualization api
		License: Free for current project
	
	2. Dojox and dijit graphs
		License: Free for current project
	
	3. Raphael
		License: MIT
	
	4. Hight charts
		License $90
		
		
	* Useful nodejs modules
	
	1. Step
		For performing step by step iterations like getting data from different
		collections to perform joins like data compound
		
	2. Async js
		To perform async or sync querying
		More power and more complicated than step but makes the similar things
	
	3. Mongoose ( http://mongoosejs.com/ )
		Perhaphs better and flexible proxy for mongodb 
		than a native driver support
		
	
		
	
*/
// Map-reduce alternative -- aggregation framework, since 2.1 vesion of MongoDB

db.sites.group({
 key: { visitors:true },
 reduce: function(obj,prev) {
  var count = 0;
  for(k in obj.messages)
   count++;
  prev.count = count;
 },
 initial: { count: 0}
});

	