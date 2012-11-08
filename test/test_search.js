var searchWidget;

function performSearch() {
    searchWidget.find('.tsbar-widget button').click();
    searchWidget.find("input[type='text']").val('test');
    searchWidget.find("input[value='Find']").click();
}

module('search widget', {
    setup: function() {
        tsbar.clear();
        searchWidget = tsbar.searchWidget;
    },
    teardown: function() {
        $('#sandbox').html('');
    }
});

test('can create a search widget', function() {
    strictEqual(searchWidget.find("input[type='text']").length, 1,
        'the widget contains an input text field');
    strictEqual(searchWidget.find("input[value='Find']").length, 1,
        'the widget contains a find button');
    strictEqual(searchWidget.find("input[value='Clear']").length, 1,
        'the widget contains a clear button');
    strictEqual(searchWidget.find("div:not('.tsbar-popup')").length, 1,
        'the widget contains a div area for search results');
});

asyncTest('can perform a search', 1, function() {

    tsbar.define('left', searchWidget);
    var toolbar = tsbar.render();
    $('#sandbox').append(toolbar);

    performSearch();

    setTimeout(function() {
        strictEqual(searchWidget.find("div:not('.tsbar-popup')").html(),
            '<div id="container"><div>some search results</div></div>', 'the search results were returned');
        start();
    }, 500);
});

//TODO: figure out async behaviour
//asyncTest('can clear the search results', 3, function() {
//
//    tsbar.define('left', searchWidget);
//    var toolbar = tsbar.render();
//    $('#sandbox').append(toolbar);
//
//    performSearch();
//
//    searchWidget.find("input[value='Clear']").click();
//
//    setTimeout(function() {
//        strictEqual(searchWidget.find("div:not('.tsbar-popup'):empty").length, 1,
//            'the search results area was cleared');
//        strictEqual(searchWidget.find("input[type='text']").val(), '',
//            'the search query text was cleared');
//        start();
//    }, 500);
//});
