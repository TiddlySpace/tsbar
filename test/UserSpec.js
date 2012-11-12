describe('User Widget', function() {

    var userWidget

    beforeEach(function () {

        tsbar.initUserWidget($);
        tsbar.clear();
        userWidget = tsbar.userWidget;

    });

    afterEach(function () {

        $('#sandbox').html('');
    });

    describe('Logged out state', function() {

        beforeEach(function() {

            tsbar.define('right', userWidget);
            tsbar.render();
            $('#sandbox').append(toolbar);
            fixtures.loggedIn = false;
        });

        it('should initialise with the Tiddlyspace site icon', function() {

            waitsFor(function() {

                return userWidget.find("img").attr('src') === 'http://tiddlyspace.com/SiteIcon';

            }, 'the Tiddlyspace site icon to appear', 500);

        });

    });

    describe('Logged in state', function() {

        beforeEach(function() {

            tsbar.define('right', userWidget);
            tsbar.render();
            $('#sandbox').append(toolbar);
            fixtures.loggedIn = true;
        });

        it("should initialise with the user's site icon", function() {

            waitsFor(function() {

                return userWidget.find("img").attr('src') ===
                    'http://tiddlyspace.com/bags/bengillies_public/tiddlers/SiteIcon';

            }, "the user's site icon to appear", 500);

        });

    });

});