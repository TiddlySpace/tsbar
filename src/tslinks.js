/*
 * Provide a links widget that provides jumping off points to elsewhere in TS
 * Should be further options for a logged in user
 */
tsbar.initTSLinksWidget = function(exports, $) {
	var $linksWidgetTemplate = $(window.tswidgets.templates['tslinks.hbs'](Handlebars)),
		$button = $linksWidgetTemplate.first(),
		$popup = $linksWidgetTemplate.last();

	/*
     * Create the widget and register it
     */
    function main() {
        tsbar.tsLinksWidget = tsbar.Widget({
			el:$button,
			popup:$popup
		});
    }

    main();
};

(function(exports, $) {
	"use strict";

    //tsbar.initTSLinksWidget(exports, $);

}(window, jQuery));