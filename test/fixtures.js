$.mockjax({
	url: '/status',
	responseText: '{"username":"bengillies"}'
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
