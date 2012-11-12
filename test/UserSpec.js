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
            var toolbar = tsbar.render();
            $('#sandbox').append(toolbar);
            fixtures.loggedIn = false;
        });

        it('should initialise with the Tiddlyspace site icon', function() {

            waitsFor(function() {

                return userWidget.find('img').attr('src') === 'http://tiddlyspace.com/SiteIcon';

            }, 'the Tiddlyspace site icon to appear', 500);
        });

        it('should only have the login form present', function() {

            waitsFor(function() {

                return userWidget.find('.tsbar-logged-in').size() === 0;

            }, 'the notifications area to be removed', 500);

            runs(function () {

                expect(userWidget.find('.tsbar-logged-out').size()).toEqual(2);
            });
        });

        xit('should be able to login and view the notifications area', function() {

            waitsFor(function() {

                return userWidget.find('.tsbar-logged-in').size() === 0;

            }, 'the notifications area to be removed', 500);

            runs(function() {

                userWidget.find('.tsbar-login-username').val('pads');
                userWidget.find('.tsbar-login-password').val('letmein');
                userWidget.find('.tsbar-login-btn').click();
            });

            waitsFor(function() {

                return userWidget.find('.tsbar-logged-out').size() === 0;

            }, 'the login area to be removed', 500);

            runs(function () {

                expect(userWidget.find('.tsbar-logged-in').size()).toEqual(2);
            });
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

        it('should not have the login form present', function() {

            waitsFor(function() {

                return userWidget.find('.tsbar-logged-out').size() === 0;

            }, 'the login area to be removed', 500);

            runs(function () {

                expect(userWidget.find('.tsbar-logged-in').size()).toEqual(2);
            });
        });
    });
});