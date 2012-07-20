/*
 * Provide a user widget with a popup showing information and notifications
 */

(function($) {
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
				'<div class="tsbar-logged-out">',
					'You are not logged in',
				'</div>',
				'<div class="tsbar-logged-in">',
					'<button class="tsbar-logout">Log out</button>',
				'</div>',
			'</div>',
			'<div class="tsbar-logged-out">',
				'<form class="tsbar-login-classic">',
					'<div class="tsbar-login-group">',
						'<label>Username</label>',
						'<input type="text" class="tsbar-login-username" name="username">',
					'</div>',
					'<div class="tsbar-login-group">',
						'<label>Password</label>',
						'<input type="password" class="tsbar-login-username" name="username">',
					'</div>',
					'<div class="tsbar-login-footer">',
						'<a href="#openid" class="tsbar-login-switch">',
							'use openid',
						'</a>',
						'<input type="submit" value="Log in">',
					'</div>',
				'</form>',
				'<form class="tsbar-login-openid">',
					'<div class="tsbar-login-group">',
						'<label>OpenID</label>',
						'<input type="text" class="tsbar-login-id" name="username">',
					'</div>',
					'<div class="tsbar-login-footer">',
						'<a href="#openid" class="tsbar-login-switch">',
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
		following: [
			'<li>',
				'<img class="tsbar-notification-icon">',
				'<p><a class="tsbar-notification-user"></a> ',
				'started following you</p>',
			'</li>'].join(''),
		atTag: [
			'<li>',
				'<img class="tsbar-notification-icon">',
				'<p><a class="tsbar-notification-user"></a> ',
				'wrote <a class="tsbar-notification-at"></a> for you</p>',
			'</li>'].join('')
	};

	/*
	 * fill in areas in HTML that require data from /status
	 * hide areas that we don't need to see
	 */
	function populateUserDetails(status) {
		var username = status.username,
			siteIcon = 'http://tiddlyspace.com/bags/' + username +
				'_public/tiddlers/SiteIcon',
			loggedIn = username !== 'GUEST';

		$button.find('img.tsbar-user-icon').attr('src', siteIcon);
		$popup.find('img.tsbar-user-icon').attr('src', siteIcon);

		$popup.find('.tsbar-logged-' + (loggedIn ? 'out' : 'in')).remove();

		if (!loggedIn) {
			$popup.find('.tsbar-login-openid').hide();
		} else {
			$popup.find('.tsbar-user-name').text(username);
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
			username: username,
			$countEl: $button.find('.tsbar-user-notification'),
			$listEl: $popup.find('.tsbar-user-notification ul')
		});

		activity.getRecent(function(tiddlers) {
			tiddlers.sort(function(a, b) { return b.modified - a.modified; });
			activity.renderAll(tiddlers.slice(0, Activity.MAX_NOTIFICATIONS));
		});
	}

	/*
	 * add event listeners and behaviours to clicks inside the popup
	 */
	function hookupEvents() {
	}


	/*
	 * Create an Activity object to handle notifications
	 */
	function Activity(options) {
		Activity.MAX_NOTIFICATIONS = 7; // on Activity, not |this|

		$.extend(this, options);

		// set up a promise like system for lastChecked and followers
		this.promises = {};

		// get the time of the most recent notification the user saw
		this.getLastChecked(function() {});
	}

	$.extend(Activity.prototype, {
		getRecent: function(callback) {
			var self = this;
			this._promise('notifications', callback, function(doneFn) {
				// get people who are now following you
				$.ajax({
					url: '/search?q=(title:@' + self.username +
						'%20OR%20title:' + self.username +
						')%20AND%20tag:follow&sort:-modified',
					dataType: 'json',
					success: _getRecentReplies,
					error: _getRecentReplies
				});

				function _getRecentReplies(followers) {
					var resultSet = [];
					if ($.isArray(followers)) {
						resultSet = followers;
					}
					var searchUrl = '/search?q=tag:@' + self.username +
						'&sort=-modified';
					$.ajax({
						url: searchUrl,
						dataType: 'json',
						success: function(atReplies) {
							doneFn(resultSet.concat(atReplies));
						},
						error: function() {
							doneFn(resultSet);
						}
					});
				}
			});
		},
		render: function(tiddler) {
			var self = this;

			var template = tiddler.tags &&
				~tiddler.tags.indexOf('@' + this.username) ?
					notificationTemplates.atTag :
					notificationTemplates.following;

			var $li = $(template).find('.tsbar-notification-icon')
					.attr('src', 'http://tiddlyspace.com/bags/' + tiddler.bag +
						'_public/tiddlers/SiteIcon')
				.end().find('.tsbar-notification-user')
					.text(tiddler.modifier)
					.attr('href', 'http://' + tiddler.modifier +
						'.tiddlyspace.com')
				.end().find('.tsbar-notification-at')
					.attr('href', tiddler.url).text(tiddler.title).end();

			this.getLastChecked(function(lastChecked) {
				if (_getDate(tiddler.modified) > lastChecked) {
					$li.addClass('tsbar-notification-new');
				}
				self.$listEl.prepend($li);
			});
		},
		renderAll: function(tiddlers) {
			var self = this;

			tiddlers = tiddlers.slice(0, this.MAX_NOTIFICATIONS);

			$.each(tiddlers, function(i, tiddler) { self.render(tiddler); });
		},
		getLastChecked: function(callback) {
			var self = this;
			this._promise('lastChecked', callback, function(doneFn) {
				$.ajax({
					url: '/bags/' + self.username + '_private/tiddlers/' +
						'_notificationState',
					dataType: 'json',
					success: function(tiddler) {
						doneFn(_getDate(tiddler.modified));
					},
					error: function() {
						doneFn(0);
					}
				});
			});
		},
		listen: function() {
		},
		_promise: function(name, callback, promise) {
			var self = this;
			if (name in this) {
				callback(this[name]);
			} else {
				if (!this.promises[name]) {
					this.promises[name] = [callback];
				} else {
					this.promises[name].push(callback);
				}
				promise(function(data) {
					self[name] = data;
					$.each(self.promises[name], function(i, fn) {
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
		getUserDetails(function(status) {
			populateUserDetails(status);
			if (status.username) {
				getNotifications(status.username);
			}
			hookupEvents();

			tsbar.userWidget = tsbar.Widget({
				el: $button,
				popup: $popup
			});
		});
	}



	main();

}(jQuery));
