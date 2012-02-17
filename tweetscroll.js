/*
 * Tweetscroll v1.1
 * Copyright (c) 2011 Rafael Bardini
 * https://github.com/rbardini/tweetscroll
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
		
		function show(el) {
			el.click();
			isEnqueued = false;
		}
		
		try {
			$(window).on({
				'blur': function() { hasFocus = false; },
				'focus': function() { hasFocus = true; }
			});
			
			$('.new-tweets-bar').click();
			
			$(document).on('DOMNodeInserted', function(event) {
				var el = $(event.target);
				if (el.hasClass('stream-item')) {
					bar = el.children('.new-tweets-bar');
					if (bar.length) {
						if (hasFocus) { show(bar); }
						else if (!isEnqueued) {
							$(window).one('focus', function() { show(bar); });
							isEnqueued = true;
						}
					}
				}
			});
			
			$('head').append('<style>.new-tweets-bar {display:none !important}</style>');
		} catch(e) {}
	}
})();
