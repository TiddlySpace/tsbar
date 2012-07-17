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
	var _widgets = {
			left: [],
			middle: [],
			right: []
		},
		_defaultOptions = {
			title: 'TiddlySpace',
			defaultTemplate: [
				'<div id="tsbar">',
					'<div class="tsbar-left"></div>',
					'<div class="tsbar-middle"></div>',
					'<div class="tsbar-right"></div>',
				'</div>'
			].join()
		};

	/*
	 * Provide a default widget that can be used to define buttons, etc
	 */
	tsbar.Widget = function(options) {
	};

	/*
	 * Notify tsbar of a new widget for inclusion
	 *
	 * position can be 'left', 'middle' or 'right'
	 */
	tsbar.define = function(position, widget) {
	};

	/*
	 * Main Entry point. Load in all the widgets, set them up and add them
	 * to the correct place
	 */
	tsbar.render = function(options) {
	};

	// export the bar to the global object
	exports.tsbar = tsbar;

}(window));
