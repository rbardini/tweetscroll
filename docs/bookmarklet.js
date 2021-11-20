/*
 * Tweetscroll v1.1
 * Copyright (c) 2011 Rafael Bardini
 * https://github.com/rbardini/tweetscroll
 * 
 * Licensed under the MIT license
 * http://www.opensource.org/licenses/mit-license.php
 */

(function tweetscroll() {
	if (typeof window.jQuery === 'undefined') {
		window.setTimeout(tweetscroll, 200);
	} else {
		var $ = jQuery = window.jQuery,
			hasFocus = true,
			isEnqueued = false,
			msg, bar;
		
		function show(el) {
			el.click();
			isEnqueued = false;
		}
		
		$('head').append('<style>#tweetspeak-bar {background:#DFF1DF; border-top:1px solid #BBE2BB; -webkit-box-shadow: inset 0 3px 8px rgba(0,0,0,.05); -moz-box-shadow: inset 0 3px 8px rgba(0,0,0,.05); box-shadow: inset 0 3px 8px rgba(0,0,0,.05); display:none; font-size:13px; padding:10px 1px; text-align:center; text-shadow: 0 1px 0 rgba(255, 255, 255, .6); z-index:2; zoom:1} .tweetspeak-warning {background:#FFF0C0 !important; border-color:#FFE38D !important}</style>');
		
		bar = $('<div class="stream-item"><div id="tweetspeak-bar"></div></div>').prependTo($('.js-stream-manager-container')).children();
			
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
			
			msg = 'Tweetscroll set up! New tweets will show up automatically.';
		} catch(e) {
			bar.addClass('tweetscroll-warning');
			msg = 'Tweetscroll could not be set up!<br/>Please visit <a href="http://browsehappy.com/">Browse Happy</a> to upgrade your browser and try again.';
		}
		
		bar.html(msg).slideDown();
		window.setTimeout(function() {
			bar.slideUp();
		}, 15000);
	}
})();
