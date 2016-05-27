(function() {

	// This is just a wrapper for tracking analytics events. It's actually
	// really hard to come up with an appropriate abbreviation of analytics,
	// so I'm just going to call them events.

	var EventTracker = {};

	var validEvents = [
		'store-visit',   // Someone clicks on the store link.
		'contact-start',  // Someone starts filling out the contact form.
		'contact-complete', // Someone finishes filling out the contact form.
		'newsletter-signup', // Someone signs up for the newsletter.
		'chat-engaged', // Someone activates the Intercom widget. 
		'social-facebook',
		'social-twitter'
	];

	function log(action, label) {
		// Only track valid events.
		// Prevents tpyos from messing up the graphs.
		if (validEvents.indexOf(action) == -1) {
			throw "Invalid event: "+action;
		}
		ga('send', 'event', 'PageAction', action, label);
		Intercom('trackEvent', action);
	};

	function trackLink(hrefPattern, actionName) {
		$('a[href*="'+hrefPattern+'"]').on('click', function(evt) {
			var href = this.href;
			evt.preventDefault();
			log(actionName);
			// Make sure we log the event before the next page loads.
			setTimeout(function() { 
				window.location = href;
			}, 500);
		});
	}


	$(function() { // Wrap all the things with jQuery!  What's a closure?

		// Log when someone clicks on the contact form, presumably to start
		// writing a message.
		var started = false;
		$('#form-contact').on('click', function() {
			if (!started) log('contact-start');
			started = true;
		});

		// Log when someone submits the contact form.
		$('#form-contact').on('submit', function() {
			log('contact-complete');
		});

		// Log when someone signs up for the newsletter.
		$('#mc-embedded-subscribe').on('click', function() {
			log('newsletter-signup');
		});

		// Log when someone uses the chat box.
		Intercom('onActivatorClick', function() { 
			log('chat-engaged');
		});

		// Update the customer's name on Intercom when they fill out the
		// contact form.
		$('#form-contact input[name=name]').on('blur', function(evt) {
			var value = this.value;
			if (value) Intercom('update', {"name": value});
		});

		// Update the customer's email on Intercom when they fill out the
		// contact form.
		$('#form-contact input[name=email]').on('blur', function(evt) {
			var value = this.value;
			if (value) Intercom('update', {"email": value});
		});

		// Log when someone clicks on the store link.
		trackLink('opentrons.myshopify.com', 'store-visit');

		// That social engagement.
		trackLink('facebook.com', 'social-facebook');
		trackLink('twitter.com', 'social-twitter');

		// We're using hash tags as a quick way to keep track of marketing
		// referrals and other targeted traffic sources.
		//
		// If a user comes to the page and they have a hash tag attached
		// to their URL, we'll send it to Google so we can graph all the
		// different tags.
	    var refTag = window.location.hash;
	    if (refTag) {
	    	refTag = refTag.substring(1); // Get rid of leading #.
	        ga('send', 'event', 'HashTag', refTag);
	    }

	});

	// Sure, export, why not?  Feel free to send us silly events through the
	// dev console.  Like EventTracker.log("job-application")!
	var EventTracker = {
		log: log
	};

	window.EventTracker = EventTracker;

}());