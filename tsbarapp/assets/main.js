$(document).ready(function() {

    tsbar.define('left', tsbar.searchWidget);

    tsbar.define('middle', tsbar.tsLinksWidget);

    tsbar.define('right', tsbar.userWidget);

    $('#bar').html(tsbar.render());

});