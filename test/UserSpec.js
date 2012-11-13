describe('User Widget', function() {

    var userWidget

    function setupPage() {
        tsbar.initUserWidget(mockWindow, $);
        tsbar.clear();
        userWidget = tsbar.userWidget;

        tsbar.define('right', userWidget);
        $('#sandbox').append(tsbar.render());
    }

    var mockWindow = {
        io: {
            connect: function() {
                return {
                    emit: function(action, data) {
                    },
                    on: function(tiddler, callback) {
                        setTimeout(function() {
                            callback('/bags/colm_public/tiddlers/quux');
                        }, 100);
                        setTimeout(function() {
                            callback('/bags/cdent_public/tiddlers/@bengillies');
                        }, 100);
                        setTimeout(function() {
                            callback('/bags/patrick_public/tiddlers/@fnd');
                        }, 100);
                    }
                };
            }
        },
        location: {
            reload: function() {
                if(fixtures.loggedIn) {
                    fixtures.loggedIn = false;
                } else {
                    fixtures.loggedIn = true;
                }
                setupPage();
                console.log('page reloaded');
            }
        },
        getCSRFToken: function() {
            return 'asdfghjki765redscvbhjuytre4dety3uhwekdshfuybj';
        }
    };

    beforeEach(function() {

        setupPage();
    });

    afterEach(function() {

        $('#sandbox').html('');
    });

    describe('Logged out state', function() {

        beforeEach(function() {

            fixtures.loggedIn = false;

            waitsFor(function() {

                return userWidget.find('.tsbar-logged-in').size() === 0;

            }, 'the notifications area to be removed', 500);
        });

        it('should initialise with the Tiddlyspace site icon', function() {

            waitsFor(function() {

                return userWidget.find('img').attr('src') === 'http://tiddlyspace.com/SiteIcon';

            }, 'the Tiddlyspace site icon to appear', 500);
        });

        it('should only have the login form present', function() {

            runs(function () {

                expect(userWidget.find('.tsbar-logged-out').size()).toEqual(2);
            });
        });

        it('should be able to login and view the notifications area', function() {

            runs(function() {

                userWidget.find('.tsbar-login-username').val('pads');
                userWidget.find('.tsbar-login-password').val('letmein');
                userWidget.find('.tsbar-login-btn').click();
            });

            waitsFor(function() {

                return userWidget.find('.tsbar-logged-out').size() === 0;

            }, 'the login area to be removed', 1000);

            runs(function() {

                expect(userWidget.find('.tsbar-logged-in').size()).toEqual(2);
            });
        });

        it('should show an error message when a login fails', function() {

            runs(function() {

                userWidget.find('.tsbar-login-username').val('pads');
                userWidget.find('.tsbar-login-password').val('ha><0r');
                userWidget.find('.tsbar-login-btn').click();
            });

            waitsFor(function() {

                return userWidget.find('#tsbar-login-message').hasClass('tsbar-error') === true;

            }, 'the login error message to appear', 500);

            runs(function() {

                expect(userWidget.find('#tsbar-login-message').text()).toEqual('Error - Unauthorised');
            });

        });

    });

    describe('Logged in state', function() {

        beforeEach(function() {

            fixtures.loggedIn = true;

            waitsFor(function() {

                return userWidget.find('.tsbar-logged-out').size() === 0;

            }, 'the login area to be removed', 500);
        });

        it("should initialise with the user's site icon", function() {

            waitsFor(function() {

                return userWidget.find("img").attr('src') ===
                    'http://tiddlyspace.com/bags/bengillies_public/tiddlers/SiteIcon';

            }, "the user's site icon to appear", 500);
        });

        it('should have the notifications area present', function() {

            runs(function () {

                expect(userWidget.find('.tsbar-logged-in').size()).toEqual(2);
            });
        });

        it('should be able to logout and view the login form', function() {

            runs(function() {

                userWidget.find('.tsbar-logout-btn').click();
            });

            waitsFor(function() {

                return userWidget.find('.tsbar-logged-in').size() === 0;

            }, 'the notifications area to be removed', 1000);

            runs(function () {

                expect(userWidget.find('.tsbar-logged-out').size()).toEqual(2);
            });
        });
    });
});