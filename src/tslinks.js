/*
 * Provide a links widget that provides jumping off points to elsewhere in TS
 * Should be further options for a logged in user
 */
tsbar.initTSLinksWidget = function(exports, $) {
	var $linksWidgetTemplate = $(window.tswidgets.templates['tslinks.hbs'](Handlebars)),
		$button = $linksWidgetTemplate.first(),
		$popup = $linksWidgetTemplate.last();

	// sets class on widget given logged in status
	function setAuthClass(username) {
		var state = (username === "GUEST") ? "loggedOut" : "loggedIn";
		this.addClass(state);
	}

	/*
     * Create the widget and register it
     */
    function main() {
        tsbar.tsLinksWidget = tsbar.Widget({
			el:$button,
			popup:$popup
		});

		// add required functions
		$.extend(tsbar.tsLinksWidget, {
			setAuthClass: setAuthClass
		});

		tsbar.tsLinksWidget.setAuthClass(tiddlyweb.status.username);
    }

    main();
};

(function(exports, $) {
	"use strict";

    tsbar.initTSLinksWidget(exports, $);

}(window, jQuery));