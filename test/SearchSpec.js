describe('Search Widget', function() {

    var searchWidget;

    function performSearch() {

        searchWidget.find("input[type='text']").focus().val('test').trigger("input");
    }
    
    beforeEach(function () {

        tsbar.initSearchWidget(window, $);
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

        it('should contain a clear button', function() {

            expect(searchWidget.find("button.clear").length).toEqual(1);
        });

    });

    describe('interacting with search widget', function() {

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
                return searchWidget.find("form").hasClass("inuse");
            }, 'the search form to have the in-use class', 200);

			waitsFor(function() {
				return searchWidget.find("button.clear").is(":visible");
			}, 'clear button should appear now text has been entered', 200);

            runs(function() {
				searchWidget.find("button.clear").trigger('click');
            });

            waitsFor(function() {
                return searchWidget.find("input[type='text']").val() === '';
            }, 'the search box to clear after the clear button was clicked', 200);

            waitsFor(function() {
                return searchWidget.find("button.clear").is(":hidden");
            }, 'the clear button to be invisible now search query removed', 200);

			runs(function() {
				searchWidget.find("input[type='text']").blur();
			});
			
			waitsFor(function() {
				return !searchWidget.find("form").hasClass("inuse");
			}, 'the in-use class to be removed from the form', 200);
        });
    });
});

