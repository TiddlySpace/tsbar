describe('TS Links Widget', function() {
	var tsLinksWidget;

	function initWidget() {
		tsbar.initTSLinksWidget(window, $);
        tsbar.clear();
	}

	it('has init function', function() {
		expect(tsbar.initTSLinksWidget).not.toBeUndefined();
		expect(tsbar.initTSLinksWidget).not.toBeNull();
	});

	describe('when instantiated', function() {
		beforeEach(function () {
	        initWidget();
			tsLinksWidget = tsbar.tsLinksWidget;
	    });

	    afterEach(function () {
	        $('#sandbox').html('');
	    });

		it('should become a property of tsbar', function() {
			expect(tsbar.tsLinksWidget).not.toBeUndefined();
			expect(tsbar.tsLinksWidget).not.toBeNull();
		});

		it('should contain a button', function() {
			expect(tsLinksWidget.find(".tsbar-links-btn").length).toEqual(1);
        });

		it('should contain a popup with an iframe', function() {
			expect(tsLinksWidget.find(".tsbar-links-widget").length).toEqual(1);
			expect(tsLinksWidget.find(".tsbar-links-widget iframe").length).toEqual(1);
		});
	});

});