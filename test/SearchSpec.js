describe('Search Widget', function() {

    var searchWidget;

    function performSearch() {

        searchWidget.find('.tsbar-widget button').click();
        searchWidget.find("input[type='text']").val('test');
        searchWidget.find("input[value='Find']").click();
    }
    
    beforeEach(function () {

        setFixtures('<div id="sandbox"></div>');
        tsbar.clear();
        searchWidget = tsbar.searchWidget;
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

    describe('Peforming searches', function() {

        beforeEach(function () {

            tsbar.define('left', searchWidget);
            var toolbar = tsbar.render();
            $('#sandbox').append(toolbar);
        });

        xit('should render some search results when the search button is clicked', function() {

            runs(function() {

                performSearch();
            });

            waits(500);

            runs(function() {

                expect(searchWidget.find("div:not('.tsbar-popup')").html()).toEqual(
                    '<div id="container"><div>some search results</div></div>');
            });
        });

        it('should clear the search results area and search query text', function() {

            runs(function() {

                performSearch();
            });

            waitsFor(function () {

                return searchWidget.find("div:not('.tsbar-popup')").html() ===
                '<div id="container"><div>some search results</div></div>';

            }, 'the search should be performed', 500);

            runs(function() {

                searchWidget.find("input[value='Clear']").trigger('click');
            });

            waits(500);

            runs(function() {
                expect(searchWidget.find("div:not('.tsbar-popup'):empty").length).toEqual(1);
                expect(searchWidget.find("input[type='text']").val()).toEqual('');
            });
        });
    });
});

