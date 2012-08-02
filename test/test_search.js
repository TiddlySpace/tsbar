var searchWidget = undefined;

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
    strictEqual(searchWidget.getWidget().find("div:not('.popup')").length, 1,
        'the widget contains a div area for search results');
});

test('can perform a search', function() {
    fakeAjaxResponse();

    tsbar.define('left', searchWidget.getWidget());
    var toolbar = tsbar.render();
    $('#sandbox').append(toolbar);
    searchWidget.registerListeners();

    performSearch();

    strictEqual(searchWidget.getWidget().find("div:not('.popup')").html(),
        '<div id="container"><div>some search results</div></div>', 'the search results were returned');
});

test('can clear the search results', function() {
    fakeAjaxResponse();

    tsbar.define('left', searchWidget.getWidget());
    var toolbar = tsbar.render();
    $('#sandbox').append(toolbar);
    searchWidget.registerListeners();

    performSearch();

    searchWidget.getWidget().find("input[value='Clear']").click();

    strictEqual(searchWidget.getWidget().find("div:not('.popup'):empty").length, 1,
        'the search results area was cleared');
    strictEqual(searchWidget.getWidget().find("input[type='text']").val(), '',
        'the search query text was cleared');
});

function fakeAjaxResponse() {
    $.ajax = function(options) {
        strictEqual(options.url, '/hsearch?q=test', 'the correct URL was sent');
        options.complete({
            responseText: '<body><div id="container"><div>some search results</div></div></body>',
            isResolved: function() { return true; },
            done: function() {}
        });
    };
}

function performSearch() {
    searchWidget.getWidget().find('.tsbar-widget button').click();
    searchWidget.getWidget().find("input[type='text']").val('test');
    searchWidget.getWidget().find("input[value='Find']").click();
}

