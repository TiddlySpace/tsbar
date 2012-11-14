/*
 * Provide a search widget with a popup to enter and clear search terms.
 * Test suite can get a handle on this for clean slate testing.
 */
tsbar.initSearchWidget = function(exports, $) {

    function SearchWidget() {

        this.$el = $('<button class="tsbar-search-btn">Search</button>');

        this.$popup = $('<div class="tsbar-popup tsbar-search-widget">' +
            '<span>Search:</span>' +
            '<input id="tsbar-query-text" type="text" name="query"/>' +
            '<input id="tsbar-search-button" type="submit" value="Find"/>' +
            '<input id="tsbar-clear-button" type="submit" value="Clear"/>' +
            '<div id="tsbar-search-results"></div>' +
            '</div>');

        this._widget = tsbar.Widget({
            el: this.$el,
            popup: this.$popup
        });
    }

    SearchWidget.prototype.getWidget = function() {
        return this._widget;
    };

    SearchWidget.prototype._registerListeners = function() {
        this.$popup.find('#tsbar-search-button').click(this._doSearch);
        this.$popup.find('#tsbar-clear-button').click(this._doClear);
    };

    SearchWidget.prototype._doSearch = function() {
        var query = $('#tsbar-query-text').val();
        $('#tsbar-search-results').load('/hsearch?q=' + query + ' #container');
    };

    SearchWidget.prototype._doClear = function() {
        $('#tsbar-search-results').html('');
        $('#tsbar-query-text').val('');
    };

    function main() {
        var searchWidget = new SearchWidget();
        searchWidget._registerListeners();

        exports.tsbar.searchWidget = searchWidget.getWidget();
    }

    main();

};

(function(exports, $) {

    tsbar.initSearchWidget(exports, $);

}(window, jQuery));
