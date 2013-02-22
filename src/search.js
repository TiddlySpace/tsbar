/*
 * Provide a search widget with a popup to enter and clear search terms.
 * Test suite can get a handle on this for clean slate testing.
 */
tsbar.initSearchWidget = function(exports, $) {

    function SearchWidget() {
        this.$compiledTemplate = $(exports.tswidgets.templates['search.hbs'](Handlebars));
        this.$el = this.$compiledTemplate.first();

        this._widget = tsbar.Widget({
            el: this.$el
        });
    }

    SearchWidget.prototype.getWidget = function() {
        return this._widget;
    };

    SearchWidget.prototype._registerListeners = function() {
		var self = this;
        this.$el.find('#tsbar-query-text').on("input", this._toggleInuse);
        this.$el.find('#tsbar-clear-button').on("click", function(e) {
			self._doClear.call(self, e);
		});
    };

	SearchWidget.prototype._toggleInuse = function(e) {
		var len = $(this).val().length,
			$form = $(this).parent("form");
		$form.toggleClass("inuse", len && len > 0);
	};

    SearchWidget.prototype._doClear = function(e) {
		e.preventDefault();
		this.$el
			.find("#tsbar-query-text")
				.val("")
				.focus()
			.end()
			.removeClass("inuse");
    };

    function main() {
        var searchWidget = new SearchWidget();
        searchWidget._registerListeners();

        exports.tsbar.searchWidget = searchWidget.getWidget();
    }

    main();

};

(function(exports, $) {
	"use strict";

    tsbar.initSearchWidget(exports, $);

}(window, jQuery));
