$(document).ready(function() {
    var searchWidget = new SearchWidget();
    tsbar.define('left', searchWidget.getWidget());
    searchWidget.registerListeners();

    tsbar.define('middle', tsbar.Widget({
        el: '<button>Middle</button>',
        popup: '<div class="popup">This is the Middle Popup</div>'
    }));

    tsbar.define('right', tsbar.userWidget);

    $('#bar').html(tsbar.render());

});