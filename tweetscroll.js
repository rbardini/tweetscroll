/*
 * Tweetscroll v1.0
 * Copyright (c) 2011 Rafael Bardini
 * http://github.com/rbardini/tweetscroll
 * 
 * Licensed under the MIT license
 * http://www.opensource.org/licenses/mit-license.php
 */

(function tweetscroll() {
	// Assumes jQuery is already included, and waits for it to load.
	// For a more bulletproof solution see joanpiedra.com/jquery/greasemonkey/
	if (typeof window.jQuery === 'undefined') {
		window.setTimeout(tweetscroll, 200);
	} else {
		var $ = jQuery = window.jQuery,
			hasFocus = true,
			isEnqueued = false;
		
		function show(event) {
			$(event.target).click();
			isEnqueued = false;
		}
		
		$('head').append('<style>#new-tweets-bar {display:none !important}</style>');
		
		$(window).bind({
			'blur': function() { hasFocus = false; },
			'focus': function() { hasFocus = true; }
		});
		
		$(document).bind('DOMNodeInserted', function(event) {
			if (event.target.id === 'new-tweets-bar') {
				if (hasFocus) { show(event); }
				else if (!isEnqueued) {
					$(window).one('focus', function() { show(event); });
					isEnqueued = true;
				}
			}
		});
	}
})();
