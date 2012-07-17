module('main bar');

test('tsbar complete', function() {
	equal(typeof tsbar, 'object', 'tsbar exists');
	equal(typeof tsbar.Widget, 'function', 'you can create widgets');
	equal(typeof tsbar.define, 'function', 'you can publish widgets to the bar');
	equal(typeof tsbar.render, 'function',
		'there is a render function for choosing when to render');
});
