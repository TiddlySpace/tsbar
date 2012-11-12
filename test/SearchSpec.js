describe('Search Widget', function() {

    var searchWidget;

    function performSearch() {

        searchWidget.find('.tsbar-widget button').click();
        searchWidget.find("input[type='text']").val('test');
        searchWidget.find("input[value='Find']").click();
    }
    
    beforeEach(function () {

        tsbar.resetSearchWidget();
        tsbar.clear();
        searchWidget = tsbar.searchWidget;
    });

    afterEach(function () {

        $('#sandbox').html('');
    });

    describe('Search Widget creation', function() {

        it('should contain an input text field', function() {

            expect(searchWidget.find("input[type='text']").length).toEqual(1);
        });

        it('should contain a find button', function() {

            expect(searchWidget.find("input[value='Find']").length).toEqual(1);
        });

        it('should contain a clear button', function() {

            expect(searchWidget.find("input[value='Clear']").length).toEqual(1);
        });

        it('should contain a div area for search results', function() {

            expect(searchWidget.find("div:not('.tsbar-popup')").length).toEqual(1);
        });

    });

    describe('Performing searches', function() {

        beforeEach(function () {

            tsbar.define('left', searchWidget);
            var toolbar = tsbar.render();
            $('#sandbox').append(toolbar);
        });

        //TODO: Split into 2 tests - one for search results and one for clearing the results.
        it('should render search results then clear the search results area and search query text', function() {

            runs(function() {

                performSearch();
            });

            waitsFor(function () {

                return searchWidget.find("div:not('.tsbar-popup')").html() ===
                '<div id="container"><div>some search results</div></div>';

            }, 'the search results to appear after the search button was clicked', 500);

            runs(function() {

                searchWidget.find("input[value='Clear']").trigger('click');
            });

            waitsFor(function() {
                return searchWidget.find("div:not('.tsbar-popup'):empty").length === 1;
            }, 'the search results to clear after the clear button was clicked', 500);

            waitsFor(function() {
                return searchWidget.find("input[type='text']").val() === '';
            }, 'the query text to clear after the clear button was clicked', 500);
        });
    });
});

