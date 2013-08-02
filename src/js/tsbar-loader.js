/**
 A stub to get the tsbar into TiddlySpace as a tiddler.
 The common recipe in TiddlySpace refers to this file.
 **/
(function() {

    var body = document.getElementsByTagName('body')[0];
    var tsBar = document.createElement('div');
    tsBar.appendChild(document.createTextNode('TS Bar (Coming Soon)'));
    body.insertBefore(tsBar, body.firstChild);
})();