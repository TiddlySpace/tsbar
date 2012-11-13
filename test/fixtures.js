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
	response: function(settings) {
        if(settings.data.password && settings.data.password === 'letmein') {
            this.responseText = '';
        } else {
            this.status = 401;
        }
    }
});

$.mockjax({
	url: '/challenge/tiddlywebplugins.tiddlyspace.openid',
	responseText: ''
});

$.mockjax({
    url: '/logout',
    responseText: ''
});

$.mockjax({
    url: '/hsearch?q=test',
    responseText: '<body><div id="container"><div>some search results</div></div></body>'
});