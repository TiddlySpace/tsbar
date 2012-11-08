$(document).ready(function() {

    tsbar.define('left', tsbar.searchWidget);

    tsbar.define('middle', tsbar.Widget({
        el: '<button>Middle</button>',
        popup: '<div class="popup">This is the Middle Popup</div>'
    }));

    tsbar.define('right', tsbar.userWidget);

    $('#bar').html(tsbar.render());

});