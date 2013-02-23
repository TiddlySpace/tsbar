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
     * Get user details from status.js (or server)
     */
	function getUserDetails(callback) {
		if (window.tiddlyweb && tiddlyweb.status) {
			callback(tiddlyweb.status);
		} else {
			$.getJSON('/status.js', callback);
		}
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

		getUserDetails(function(resp) {
			tsbar.tsLinksWidget.setAuthClass(resp.status.username);
		});
    }

    main();
};

(function(exports, $) {
	"use strict";

    tsbar.initTSLinksWidget(exports, $);

}(window, jQuery));