/*
 * Main entry point
 * Provide a TiddlySpace Tooltsbar suitable for use cross TiddlySpace
 * Define a suitable structure and set up config
 *
 * Requires jQuery
 *
 */
(function(exports) {

	// create the main namespace for tsbar
	var tsbar = {};

	// set up some private variables
	var $bar, // the bar itself
		_widgets = { // the widgets, sorted into where they will appear
			left: [],
			middle: [],
			right: []
		},
		_defaultOptions = { // some options that can be overridden by init
			defaultTemplate: [ // the html that makes up the toolbar
				'<div id="tsbar">',
					'<div class="tsbar-left"></div>',
					'<div class="tsbar-middle"></div>',
					'<div class="tsbar-right"></div>',
				'</div>'
			].join('')
		};

	// set up some private functions

	/*
	 * return the container given by position
	 */
	function _fetchContainer(position) {
		return $bar.find('.tsbar-' + position);
	}

	/*
	 * Add the widget to the given container
	 */
	function _addWidget(widget, $container) {
		$($container).append(widget);
	}

	/*
	 * Provide a default widget that can be used to define buttons, etc
	 */
	tsbar.Widget = function(options) {
		var _widget = {
			el: '',
			className: '',
			popup: ''
		};

		$.extend(_widget, options);
		var $el = $(_widget.el);

		if (_widget.popup) {
			$el.click(function(ev) {
				ev.preventDefault();
				$el.parent().toggleClass('open');
			});
		}

		return $('<div/>', {
				'class': 'tsbar-widget' + (_widget.className ?
					' ' + _widget.className : '')
			}).append($el).append(_widget.popup);
	};

	/*
	 * Notify tsbar of a new widget for inclusion
	 *
	 * position can be 'left', 'middle' or 'right'
	 */
	tsbar.define = function(position, widget) {
		_widgets[position].push(widget);

		if ($bar) {
			_addWidget(widget, _fetchContainer(position));
		}
	};

	/*
	 * Remove all the pre-defined widgets ready for creating a new toolbar
	 */
	tsbar.clear = function() {
		var key;
		for (key in _widgets) if (_widgets.hasOwnProperty(key)) {
			_widgets[key] = [];
		}
	};

	/*
	 * Main Entry point. Load in all the widgets, set them up and add them
	 * to the correct place
	 */
	tsbar.render = function(options) {
		// override any default options
		var defaults = $.extend({}, _defaultOptions);
		$.extend(defaults, options);

		// create the toolbar
		$bar = $(defaults.defaultTemplate);

		// add all the widgets to the toolbar
		$.each(_widgets, function(position, widgets) {
			var $container = _fetchContainer(position);
			$.each(widgets, function(i, widget) {
				_addWidget(widget, $container);
			});
		});

		return $bar;
	};

	// export the bar to the global object
	exports.tsbar = tsbar;

}(window));
