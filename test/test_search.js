var searchWidget;

function performSearch() {
    searchWidget.getWidget().find('.tsbar-widget button').click();
    searchWidget.getWidget().find("input[type='text']").val('test');
    searchWidget.getWidget().find("input[value='Find']").click();
}

module('search widget', {
    setup: function() {
        tsbar.clear();
        searchWidget = new SearchWidget();
    },
    teardown: function() {
        $('#sandbox').html('');
    }
});

test('can create a search widget', function() {
    strictEqual(searchWidget.getWidget().find("input[type='text']").length, 1,
        'the widget contains an input text field');
    strictEqual(searchWidget.getWidget().find("input[value='Find']").length, 1,
        'the widget contains a find button');
    strictEqual(searchWidget.getWidget().find("input[value='Clear']").length, 1,
        'the widget contains a clear button');
    strictEqual(searchWidget.getWidget().find("div:not('.tsbar-popup')").length, 1,
        'the widget contains a div area for search results');
});

asyncTest('can perform a search', 1, function() {

    var searchDoneCallback = function() {
        strictEqual(searchWidget.getWidget().find("div:not('.tsbar-popup')").html(),
            '<div id="container"><div>some search results</div></div>', 'the search results were returned');
        start();
    };

    searchWidget.registerListeners(searchDoneCallback);

    tsbar.define('left', searchWidget.getWidget());
    var toolbar = tsbar.render();
    $('#sandbox').append(toolbar);

    performSearch();
});

asyncTest('can clear the search results', 2, function() {

    var searchDoneCallback = function() {
        searchWidget.getWidget().find("input[value='Clear']").click(clearDoneCallback);
        searchWidget.getWidget().find("input[value='Clear']").click();
    };

    var clearDoneCallback = function() {
        strictEqual(searchWidget.getWidget().find("div:not('.tsbar-popup'):empty").length, 1,
            'the search results area was cleared');
        strictEqual(searchWidget.getWidget().find("input[type='text']").val(), '',
            'the search query text was cleared');
        start();
    };

    searchWidget.registerListeners(searchDoneCallback);

    tsbar.define('left', searchWidget.getWidget());
    var toolbar = tsbar.render();
    $('#sandbox').append(toolbar);

    performSearch();
});
