/**
 A stub to get the tsbar into TiddlySpace as a tiddler.
 The common recipe in TiddlySpace refers to this file.
 **/
(function($) {

    $('body').prepend('<header class="tsbar">Loading...</header>');
    var $tsbar = $('.tsbar');
    var $belowTsbar = $tsbar.next();

    $tsbar.load('/bags/tsbar_public/tiddlers/tsbar.html', function () {

		$('head').append('<link rel="stylesheet" href="/bags/tsbar_public/tiddlers/tsbar.css" type="text/css"/>');
		setMarginBelowTsbar();
    });

    var $window = $(window);
    $window.resize(function() {

		setMarginBelowTsbar();
    });

    function setMarginBelowTsbar() {

		var windowWidth = $window.width();

		if (windowWidth < 1024) {
			$('.tsbar h1 a').text('TS');
		} else {
			$('.tsbar h1 a').text('TiddlySpace');
		}

		if (windowWidth <= 420) {
			$belowTsbar.css('margin-top', '230px');
		} else if (windowWidth < 800) {
			$belowTsbar.css('margin-top', '100px');
		} else {
			$belowTsbar.css('margin-top', '60px');
		}
    }
})($);