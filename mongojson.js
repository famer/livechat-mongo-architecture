/*
----------------
Collection clients
----------------
*/
{
	id: 'sDfF23fvs32d', // index
	title: 'Паркетный пол',
	sites: [
		'http://parket-nn.ru',
		'http://parketnn.ru'
	],
	expiration_date: new Date(2014, 3, 5),
	online_manager_version: 1.1,
	site_code: '<script type="text/javascript" src="http://on-linemanager.ru/client.php?id=sDfF23fvs32d"></script>',
	manager: {
				name: 'svetlana',
				password_hash: 'asdf3e232fwsxdSDdf'
				},
	visitors_count: 2,
	visitors: [
		{
			v_id: 'asdf',
			system_info: {
				country: 'Russia',
				city: 'Moscow',
				browser: 'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.64 Safari/537.31',
				timezone: '+0400',
				ip: '213.54.25.157',
				},
			date_in: new Date(2013, 4, 5, 14, 53),
			date_out: new Date(2013, 4, 5, 14, 57),
			landing_page: '/about.html',
			messages_count: 2,
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
		},
		{
			v_id: 'fdas2FwgH',
			system_info: {
				country: 'Russia',
				city: 'Nizhniy Novgorod',
				browser: 'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.64 Safari/537.31',
				timezone: '+0400',
				ip: '103.45.52.129',
				},
			date_in: new Date(2013, 5, 3, 10, 31),
			date_out: new Date(2013, 5, 3, 11, 57),
			landing_page: '/about.html',
			messages_count: 2,
			messages: [
			{
				text: 'Здравствуйте',
				time: new Date(2013, 5, 3, 10, 31, 10),
				page: '/home.html',
				manager: 'svetlana',
				out: true
			},
			{
				text: 'Добрый день, чем я могу Вам, помочь?',
				time: new Date(2013, 5, 3, 10, 31, 15),
				page: '/home.html',
				manager: 'svetlana',
				out: false
			}
			]
		}
		]
}
/*
-------
queries
-------

1. Statistics module
	1.1 Site visitors for particular time span
	db.collection('clients', function(error, colSites) {
		var query = {
				sites: 'http://parketnn.ru',
				'visitors.date_in': {'$gte': new Date(2013, 4, 5), '$lte': new Date(2013, 4, 7)}
			};
		var pattern = {
				visitors: true,
				'visitors.messages.count()': true
			};
		db.sites.find(query, pattern).pretty();
			
		colSites.find(query, pattern).toArray( function(error, docs) {
		
		});
	});
	
	1.2 All users messages for particular time span
	db.collection('clients', function(error, colSites) {
		var query = {
				sites: 'http://parketnn.ru',
				'visitors.date_in': {'$gte': new Date(2013, 4, 5), '$lte': new Date(2013, 4, 7)}
			};
		var pattern = {
				'visitors.messages': true
			};
		db.sites.find(query, pattern).pretty();
		
		colSites.find(query, pattern).toArray( function(error, docs) {
		
		});
	});
	
	1.3 All messages of partucular user for given time span
	db.collection('clients', function(error, colSites) {
		var query = {
				sites: 'http://parketnn.ru',
				'visitors.date_in': {'$gte': new Date(2013, 4, 5), '$lte': new Date(2013, 4, 7)}
			};
		var pattern = {
				'visitors': {'$elemMatch': {v_id: 'fdas2FwgH'}}
			};
			
		// Or TODO:
		
		var query = {
				sites: 'http://parketnn.ru',
				visitors: {'$elemMatch': { v_id: 'fdas2FwgH', date_in: {'$gte': new Date(2013, 5, 2), '$lte': new Date(2013, 5, 5) }}}
			};
		var pattern = {
				_id: 0,
				'visitors.$': 1
			};
			
		db.sites.find(query, pattern).pretty();
		
		colSites.find(query, pattern).toArray( function(error, docs) {
		
		});
	});
	
2. Visitors module

	2.1 Visit by user, add new visitor to db

	var query = {
			sites: 'http://parketnn.ru'
			, 'visitors.v_id': { '$ne': '' }
		};
	var data = {
		v_id: Math.random().toString(36).substr(2,16),
		system_info: {
			country: 'Russia',
			city: 'Moscow',
			browser: 'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.64 Safari/537.31',
			timezone: '+0400',
			ip: '213.54.25.157',
			},
		date_in: new Date(),
		landing_page: '/about.html'
		}
		
	var update = {
			'$inc': { 'visitors_count': 1 },
			'$push': {'visitors': data}
		};
	
	db.sites.update(query, update, false, true);
	
3 Chat with visitor
	3.1 Message from user to history addition
	
	var query = {
				'visitors.v_id': "vgiddibtjdg"
			};
	var data = {
			text: 'Hello',
			time: new Date(),
			manager: 'svetlana',
			out: true
		}
			
	var update = {
			'$inc': { 'visitors.$.messages_count': 1 },
			'$push': {'visitors.$.messages': data}
		};
	db.sites.update(query, update, false, true);
	
	3.2 Message from operator to history addition
	
	var query = {
				'visitors.v_id': "vgiddibtjdg"
			};
	var data = {
			text: 'hi',
			time: new Date(),
			manager: 'svetlana',
			out: false
		}
			
	var update = {
			'$inc': { 'visitors.$.messages_count': 1 },
			'$push': {'visitors.$.messages': data}
		};
	db.sites.update(query, update, false, true);
	
	
	
*/
	
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

	