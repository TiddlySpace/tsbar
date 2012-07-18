/*
 * Provide a user widget with a popup showing information and notifications
 */

(function($) {
	/*
	 * define a button template
	 */
	var button = [
		'<button class="tsbar-user-btn">',
			'<img class="tsbar-user-icon">',
			'<div class="tsbar-notification"></div>',
		'</button>'
	].join('');

	/*
	 * define a popup template
	 */
	var popup = [
		'<div class="tsbar-popup">',
			'<div class="tsbar-user-topbar">',
				'<div class="tsbar-user-logged-out">'
					'You are not logged in',
				'</div>',
				'<div class="tsbar-user-logged-in">',
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
			'</div>'
		'</div>'
	].join('');
}(jQuery));
