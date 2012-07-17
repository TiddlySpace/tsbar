module('main bar', {
	setup: function() {
		tsbar.clear();
	},
	teardown: function() {
		$('#sandbox').html('');
	}
});

test('tsbar complete', function() {
	equal(typeof tsbar, 'object', 'tsbar exists');
	equal(typeof tsbar.Widget, 'function', 'you can create widgets');
	equal(typeof tsbar.define, 'function', 'you can publish widgets to the bar');
	equal(typeof tsbar.render, 'function',
		'there is a render function for choosing when to render');
});

test('tsbar.Widget returns a jQuery DOM element', function() {
	var myWidget = tsbar.Widget();
	strictEqual(myWidget.children().length, 0,
		'blank Widget parameters lead to a widget with no children');

	myWidget = tsbar.Widget({
		el: '<span>Hello World.</span>',
		popup: 'This is a popup.'
	});
	strictEqual(myWidget.text(), 'Hello World.This is a popup.',
		'both elements have been appended to the widget');
});

test('tsbar.render renders any defined widgets', function() {
	tsbar.define('left', tsbar.Widget({
		el: '<span>Widget</span>',
		popup: '<span>Popup</span>',
		className: 'class-name'
	}));

	var toolbar = tsbar.render();

	strictEqual(toolbar.find('.tsbar-widget.class-name').length, 1,
		'the widget is in the toolbar');
	strictEqual(toolbar.find('.tsbar-left').find('.class-name').length, 1,
		'the widget is in the left section');
});

test('you can override the default template', function() {
	var toolbar = tsbar.render();
	strictEqual(toolbar.children().length, 3,
		'there are three containers by default');

	toolbar = tsbar.render({
		defaultTemplate: '<div></div>'
	});
	strictEqual(toolbar.children().length, 0,
		'you can override the default toolbar to whatever you want');
});

test('clicking on a widget toggles the "open" class', function() {
	tsbar.define('left', tsbar.Widget({
		el: '<button>Click me</button>',
		popup: '<ul><li>list</li><li>of</li><li>items</li></ul>'
	}));

	var toolbar = tsbar.render();
	$('#sandbox').append(toolbar);

	strictEqual(toolbar.find('.open').length, 0,
		'pre-clicking, there are no open widgets');

	toolbar.find('.tsbar-widget button').click();
	ok(toolbar.find('.tsbar-widget').hasClass('open'),
		'the widget now has the open class');

	toolbar.find('.tsbar-widget button').click();
	strictEqual(toolbar.find('.open').length, 0,
		'clicking again closes the widget');
});

test('you can add widgets after creating the toolbar', function() {
	var toolbar = tsbar.render();

	tsbar.define('right', tsbar.Widget({
		el: '<span>Hello World.</span>',
		popup: 'This is a popup.'
	}));

	strictEqual(toolbar.find('.tsbar-right').find('.tsbar-widget').length, 1,
		'there is now a widget in the right hand pane');
});
