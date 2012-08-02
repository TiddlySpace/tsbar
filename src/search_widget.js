function SearchWidget() {

    this._widget = tsbar.Widget({
        el: '<button>Search</button>',
        popup: '<div class="popup">' +
                    '<span>Search:</span>' +
                    '<input id="query-text" type="text" name="query"/>' +
                    '<input id="search-button" type="submit" value="Find"/>' +
                    '<input id="clear-button" type="submit" value="Clear"/>' +
                    '<div id="search-results"></div>' +
                '</div>'
    });
}

SearchWidget.prototype.getWidget = function() {
    return this._widget;
}

SearchWidget.prototype.registerListeners = function() {
    $('#search-button').click(this._doSearch);
    $('#clear-button').click(this._doClear);
}

SearchWidget.prototype._doSearch = function() {
    var query = $('#query-text').val();
    $('#search-results').load('/hsearch?q=' + query + ' #container');
}

SearchWidget.prototype._doClear = function() {
    $('#search-results').html('');
    $('#query-text').val('');
}
