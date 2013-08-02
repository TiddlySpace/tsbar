/**
 A stub to get the tsbar into TiddlySpace as a tiddler.
 The common recipe in TiddlySpace refers to this file.
 **/
(function($, exports) {

    $('body').prepend('<div class="tsbar">Loading...</div>');
    $('.tsbar').html(exports.tsbar['tsbar.html']());
})($, window);