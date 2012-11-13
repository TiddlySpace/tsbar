/*
 * Provide a user widget with a popup showing information and notifications.
 * Test suite can get a handle on this for clean slate testing.
 */
tsbar.initUserWidget = function (window, $) {
    /*
     * define a button template
     */
    var $button = $([
        '<button class="tsbar-user-btn">',
        '<img class="tsbar-user-icon">',
        '<div class="tsbar-user-notification"></div>',
        '</button>'
    ].join(''));

    /*
     * define a popup template
     */
    var $popup = $([
        '<div class="tsbar-popup">',
        '<div class="tsbar-user-topbar">',
        '<div id="tsbar-login-message" class="tsbar-logged-out">',
        'You are not logged in',
        '</div>',
        '<div class="tsbar-logged-in">',
        '<button class="tsbar-logout-btn">Log out</button>',
        '</div>',
        '</div>',
        '<div class="tsbar-logged-out">',
        '<form class="tsbar-login-classic">',
        '<div class="tsbar-login-group">',
        '<label>Username</label>',
        '<input type="text" class="tsbar-login-username" name="username" autocorrect="off" autocapitalize="off">',
        '</div>',
        '<div class="tsbar-login-group">',
        '<label>Password</label>',
        '<input type="password" class="tsbar-login-password" name="username">',
        '</div>',
        '<div class="tsbar-login-footer">',
        '<a href="#" class="tsbar-login-switch">',
        'use openid',
        '</a>',
        '<input class="tsbar-login-btn" type="submit" value="Log in">',
        '</div>',
        '</form>',
        '<form class="tsbar-login-openid">',
        '<div class="tsbar-login-group">',
        '<label>OpenID</label>',
        '<input type="text" class="tsbar-login-id" name="username" autocorrect="off" autocapitalize="off">',
        '</div>',
        '<div class="tsbar-login-footer">',
        '<a href="#" class="tsbar-login-switch">',
        'use username/password',
        '</a>',
        '<input type="submit" value="Log in">',
        '</div>',
        '</form>',
        '</div>',
        '<div class="tsbar-logged-in">',
        '<div class="tsbar-user-main">',
        '<div class="tsbar-user-icon-container">',
        '<img class="tsbar-user-icon">',
        '<a href="#">Click to Edit</a>',
        '</div>',
        '<div class="tsbar-user-info">',
        '<h2 class="tsbar-user-name"></h2>',
        '<a href="#" class="tsbar-user-profile">',
        'View Profile',
        '</a>',
        '</div>',
        '</div>',
        '<div class="tsbar-user-notification">',
        '<h2>Activity</h2>',
        '<ul></ul>',
        '<a href="#">See All</a>',
        '</div>',
        '</div>',
        '</div>'
    ].join(''));

    /*
     * Define templates for the notification list
     */
    var notificationTemplates = {
        following:[
            '<li>',
            '<img class="tsbar-notification-icon">',
            '<p><a class="tsbar-notification-user"></a> ',
            'started following you</p>',
            '</li>'].join(''),
        atTag:[
            '<li>',
            '<img class="tsbar-notification-icon">',
            '<p><a class="tsbar-notification-user"></a> ',
            'wrote <a class="tsbar-notification-at"></a> for you</p>',
            '</li>'].join('')
    };

    function getSiteIcon(username) {
        if (username === 'GUEST') {
            return 'http://tiddlyspace.com/SiteIcon';
        }
        return 'http://tiddlyspace.com/bags/' + username +
        '_public/tiddlers/SiteIcon';
    }
    /*
     * fill in areas in HTML that require data from /status
     * hide areas that we don't need to see
     */
    function populateUserDetails(status) {
        var username = status.username,
            siteIcon = getSiteIcon(username),
            loggedIn = username !== 'GUEST';

        $button.find('img.tsbar-user-icon').attr('src', siteIcon);
        $popup.find('img.tsbar-user-icon').attr('src', siteIcon);

        $popup.find('.tsbar-logged-' + (loggedIn ? 'out' : 'in')).remove();

        if (loggedIn) {
            $popup.find('.tsbar-user-name').text(username);
        } else {
            $popup.find('.tsbar-login-openid').hide();
        }
    }

    /*
     * Get user details from status.js (or server)
     */
    function getUserDetails(callback) {
        if (window.tiddlyweb && tiddlyweb.status) {
            callback(tiddlyweb.status);
        } else {
            $.getJSON('/status', callback);
        }
    }

    /*
     * get the most recent few notifications and listen for new ones
     */
    function getNotifications(username) {
        var activity = new Activity({
            username:username,
            $button:$button,
            $logoutButton:$popup.find('.tsbar-logout-btn'),
            $countEl:$button.find('.tsbar-user-notification'),
            $listEl:$popup.find('.tsbar-user-notification ul')
        });

        activity.getRecent(function (tiddlers) {
            tiddlers.sort(function (a, b) {
                return _getDate(a.modified) - _getDate(b.modified);
            });
            activity.renderAll(tiddlers.slice(0, Activity.MAX_NOTIFICATIONS));
            activity.listen();
        });
    }

    /*
     * set up the login forms and make sure they do the right thing
     */
    function hookupLogins() {
        $popup.find('.tsbar-login-switch').click(function (ev) {
            ev.preventDefault();
            $(this).closest('form').hide()
                .siblings('form').show();
        });

        $popup.find('form').submit(function (ev) {
            ev.preventDefault();
            var $form = $(this);

            if ($form.hasClass('tsbar-login-classic')) {
                $.ajax({
                    url:'/challenge/tiddlywebplugins.tiddlyspace.cookie_form',
                    type:'POST',
                    data:{
                        user:$form.find('.tsbar-login-username').val(),
                        password:$form.find('.tsbar-login-password').val(),
                        csrf_token:window.getCSRFToken()
                    },
                    success:function () {
                        window.location.reload();
                    },
                    error:function () {
                        $popup.find('#tsbar-login-message').addClass('tsbar-error');
                        $popup.find('#tsbar-login-message').text('Error - Unauthorised');
                    }
                });
            } else {
                $.ajax({
                    url:'/challenge/tiddlywebplugins.tiddlyspace.openid',
                    type:'POST',
                    data:{
                        openid:$form.find('.tsbar-login-username').val(),
                        csrf_token:window.getCSRFToken()
                    },
                    success:function () {
                        window.location.reload();
                    },
                    error:function () {
                        $form.find('input').val('');
                    }
                });
            }
        });
    }


    /*
     * Create an Activity object to handle notifications
     */
    function Activity(options) {
        var self = this;
        Activity.MAX_NOTIFICATIONS = 7; // on Activity, not |this|

        $.extend(this, options);

        // set up a promise like system for lastChecked and followers
        this.promises = {};

        // get the time of the most recent notification the user saw
        this.getLastChecked(function () {
        });

        // initialise the new notification variable
        this._newNotifications = 0;

        // reset the notification count on button click
        this.$button.click(function () {
            self.clearNotificationCount();
        });

        this.$logoutButton.click(function () {
            $.ajax({
                url:'/logout',
                type:'POST',
                data:{
                    csrf_token:window.getCSRFToken()
                },
                success:function () {
                    window.location.reload();
                }
            });
        });
    }

    $.extend(Activity.prototype, {
        getRecent:function (callback) {
            var self = this;
            this._promise('notifications', callback, function (doneFn) {

                function _getRecentReplies(followers) {
                    var resultSet = [];
                    if ($.isArray(followers)) {
                        resultSet = followers;
                    }
                    var searchUrl = '/search?q=tag:@' + self.username +
                        '&sort=-modified';
                    $.ajax({
                        url:searchUrl,
                        dataType:'json',
                        success:function (atReplies) {
                            doneFn(resultSet.concat(atReplies));
                        },
                        error:function () {
                            doneFn(resultSet);
                        }
                    });
                }
                // get people who are now following you
                $.ajax({
                    url:'/search?q=(title:@' + self.username +
                        '%20OR%20title:' + self.username +
                        ')%20AND%20tag:follow&sort:-modified',
                    dataType:'json',
                    success:_getRecentReplies,
                    error:_getRecentReplies
                });

            });
        },
        render:function (tiddler) {
            var self = this;

            var template = tiddler.tags && ~tiddler.tags.indexOf('@' + this.username) ?
                notificationTemplates.atTag :
                notificationTemplates.following;

            var $li = $(template).find('.tsbar-notification-icon')
                .attr('src', 'http://tiddlyspace.com/bags/' + tiddler.bag +
                '/tiddlers/SiteIcon')
                .end().find('.tsbar-notification-user')
                .text(tiddler.modifier)
                .attr('href', 'http://' + tiddler.modifier +
                '.tiddlyspace.com')
                .end().find('.tsbar-notification-at')
                .attr('href', tiddler.url).text(tiddler.title).end();

            this.getLastChecked(function (lastChecked) {
                if (_getDate(tiddler.modified) > lastChecked) {
                    self.addNotificationCount();
                    $li.addClass('tsbar-notification-new');
                }
                self.$listEl.prepend($li);
            });
        },
        renderAll:function (tiddlers) {
            var self = this;

            tiddlers = tiddlers.slice(0, this.MAX_NOTIFICATIONS);

            $.each(tiddlers, function (i, tiddler) {
                self.render(tiddler);
            });
        },
        getLastChecked:function (callback) {
            var self = this;
            this._promise('lastChecked', callback, function (doneFn) {
                $.ajax({
                    url:'/bags/' + self.username + '_private/tiddlers/' +
                        '_notificationState',
                    dataType:'json',
                    success:function (tiddler) {
                        doneFn(_getDate(tiddler.modified));
                    },
                    error:function () {
                        doneFn(0);
                    }
                });
            });
        },
        listen:function () {
            var self = this;
            if ('io' in window) {
                var socket = window.io.connect('http://tiddlyspace.com:8081');
                socket.on('connect', function () {
                    socket.emit('subscribe', 'tags/@' + self.username);
                    socket.emit('subscribe', 'tags/follow');
                });
                socket.on('tiddler', function (data) {
                    self._getTiddler(data, function (tiddler) {
                        self.render(tiddler);
                    });
                });
            }
        },
        addNotificationCount:function () {
            this._newNotifications++;
            this.$countEl.text(this._newNotifications);
        },
        clearNotificationCount:function () {
            this._newNotifications = 0;
            this.$countEl.text('');
        },
        _getTiddler:function (url, callback) {
            var self = this;
            $.ajax({
                url:url,
                dataType:'json',
                success:function (tiddler) {
                    if (~tiddler.tags.indexOf('follow') &&
                        (tiddler.title === '@' + self.username ||
                            tiddler.title === self.username)) {
                        callback(tiddler);
                    } else if (~tiddler.tags.indexOf('@' + self.username)) {
                        callback(tiddler);
                    }
                }
            });
        },
        _promise:function (name, callback, promise) {
            var self = this;
            if (name in this) {
                callback(this[name]);
            } else {
                if (!this.promises[name]) {
                    this.promises[name] = [callback];
                } else {
                    this.promises[name].push(callback);
                }
                promise(function (data) {
                    self[name] = data;
                    $.each(self.promises[name], function (i, fn) {
                        fn(data);
                    });
                });
            }
        }
    });

    /*
     * Turn a TiddlyWeb date into a date object
     */
    function _getDate(date) {
        return new Date(Date.UTC(
            parseInt(date.substr(0, 4), 10),
            parseInt(date.substr(4, 2), 10) - 1,
            parseInt(date.substr(6, 2), 10),
            parseInt(date.substr(8, 2), 10),
            parseInt(date.substr(10, 2), 10),
            parseInt(date.substr(12, 2) || "0", 10),
            parseInt(date.substr(14, 3) || "0", 10)
        ));
    }

    /*
     * Create the widget and register it
     */
    function main() {
        getUserDetails(function (status) {
            populateUserDetails(status);
            if (status.username !== 'GUEST') {
                getNotifications(status.username);
            } else {
                hookupLogins();
            }
        });

        tsbar.userWidget = tsbar.Widget({
            el:$button,
            popup:$popup
        });
    }

    main();

};

(function(window, $) {

    tsbar.initUserWidget(window, $);

}(window, jQuery));