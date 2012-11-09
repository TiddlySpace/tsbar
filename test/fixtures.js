fixtures = {
	loggedIn: true
};

$.mockjax({
	url: '/status',
	response: function() {
		this.responseText = fixtures.loggedIn ? '{"username":"bengillies"}' :
			'{"username":"GUEST"}';
	}
});

$.mockjax({
	url: '/bags/bengillies_private/tiddlers/_notificationState',
	responseText: '{"modified":"20120719121212"}'
});

$.mockjax({
	url: '/search?q=(title:@bengillies%20OR%20title:bengillies)%20AND' +
		'%20tag:follow&sort:-modified',
	responseText: '[{"title":"@bengillies","bag":"colm_public","tags":["follow"],"modified":"20120719141111","modifier":"colm","url":"http://tiddlyspace.com"},{"title":"bengillies","bag":"pads_public","tags":["follow"],"modified":"20120619131313","modifier":"pads","url":"http://tiddlyspace.com"}]'
});

$.mockjax({
	url: '/search?q=tag:@bengillies&sort=-modified',
	responseText: '[{"title":"foo","bag":"colm_public","tags":["@bengillies"],"modified":"20120719111111","modifier":"colm","url":"http://tiddlyspace.com"},{"title":"bar","bag":"pads_public","tags":["@bengillies"],"modified":"20120619131356","modifier":"pads","url":"http://tiddlyspace.com"}]'
});

$.mockjax({
	url: '/bags/colm_public/tiddlers/quux',
	responseText: '{"title":"quux","modified":"20120720121212","modifier":"colm","url":"http://tiddlyspace.com","tags":["@bengillies"],"bag":"colm_public"}'
});

$.mockjax({
	url: '/bags/cdent_public/tiddlers/@bengillies',
	responseText: '{"title":"@bengillies","modified":"20120720121212","modifier":"cdent","url":"http://tiddlyspace.com","tags":["follow"],"bag":"cdent_public"}'
});

$.mockjax({
	url: '/bags/patrick_public/tiddlers/@fnd',
	responseText: '{"title":"@fnd","modified":"20120720121212","modifier":"patrick","url":"http://tiddlyspace.com","tags":["follow"],"bag":"patrick_public"}'
});

$.mockjax({
	url: '/challenge/tiddlywebplugins.tiddlyspace.cookie_form',
	responseText: ''
});

$.mockjax({
	url: '/challenge/tiddlywebplugins.tiddlyspace.openid',
	responseText: ''
});

$.mockjax({
    url: '/hsearch?q=test',
    responseText: '<body><div id="container"><div>some search results</div></div></body>'
});

io = {
	connect: function() {
		return {
			emit: function(action, data) {
			},
			on: function(tiddler, callback) {
				setTimeout(function() {
					callback('/bags/colm_public/tiddlers/quux');
				}, 100);
				setTimeout(function() {
					callback('/bags/cdent_public/tiddlers/@bengillies');
				}, 100);
				setTimeout(function() {
					callback('/bags/patrick_public/tiddlers/@fnd');
				}, 100);
			}
		};
	}
};

window.location.reload = function() {
	console.log('page reload');
};

window.getCSRFToken = function() {
	return 'asdfghjki765redscvbhjuytre4dety3uhwekdshfuybj';
};
