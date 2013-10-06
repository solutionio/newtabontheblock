/**
Popup Module
*/

define(function (require) {

	/**
	Creates a Popup Factory,

	@return {object}			Return API of Module
		{function}	create 			create popup and enhance it with:
			{function}	destroy 		destroy popup
			{function}	show 			show popup
			{function}	hide 			hide popup

	*/

	return function (options) {
		var $ = require('jquery'),
			_ = require('underscore');


		/**
		Create copy of module API

		@moduleAPI {object}			link to module instance for reference inside module methods
									(since 'this' will be overriden by local context)
		*/
		var	moduleAPI = this;

		/**
		Creates a Popup

		@param {object}	options		An options hash to configure the popup
			{string}	size 			size of popup
			{string} 	addClass		add class(es) to popup overlay-div
			{bool} 		closeOnEsc 		hide on press of Escape button
			{bool}		disableParent	disable scrolling in and blur parent

		@return {object}			cf. @return of parent function
		*/	
		var popup = $('<div/>'),
			blur,									

			/**
			Gives the popup a size within the viewport

			@param {jQuery.object} 	popup 		jQuery enhanced DOM object of popup overlay-div
			@param {object} 		options		cf. parent function definition

			@return {object} 					returns a computed collection of properties of
												sizes array below
			*/
			resize = function (popup, options) {
				var sizes = {
						cinema: {
							width: 80,			// % if no unit specified; px otherwise
							height: 60,			
							minWidth: 800,		// always px
							minHeight: 600
						}
					},
					size = sizes[options.size],
					size = _.extend(size, {
						width: 		_.isString(size.width)
								?	(size.width)
								: 	(
											$(window).width()	* size.width / 100 < size.minWidth
										? 	(size.minWidth)
										: 	($(window).width()	* size.width / 100)
									),
						height: 	_.isString(size.height)
								?	(size.height)
								: 	(
											$(window).height()	* size.height / 100 < size.minHeight
										? 	(size.minHeight)
										: 	($(window).height()	* size.height / 100)
									)
					});

				popup.css(size);

				return size;
			},
			/**
			Gives the popup a position in the viewport

			@param {jQuery.object} 	popup 		jQuery enhanced DOM object of popup overlay-div
			@param {object}			size 		cf. @return value of @resize {function} above
			@param {object} 		options		cf. parent function definition

			@return 							!implicit
			*/				
			position = function (popup, size, options) {
				popup.css({
					position: 	'absolute',
					zIndex: 	1000,
					left: 		($(window).width() - size.width) / 2 + 'px',
					top: 		($(window).height() - size.height) / 2 + 'px'
				})
			},
			show = function () {
				popup.add(blur).fadeIn();

				// execute option
				if(options.disableParent)
					$('body')
						.css({
							overflow: 'hidden'
						});							

				return moduleAPI;
			},
			hide = function () {
				popup.add(blur).fadeOut();
				$('body')
					.css({
						overflow: 'auto'
					});

				return moduleAPI;
			},
			destroy = function () {
				popup.add(blur).remove();

				if(options.disableParent)
					$('body')
						.css({
							overflow: auto
						});

				return moduleAPI;
			},					
			size = resize(popup, options);

		// render
		popup
			.appendTo('body')
			.css({
				background: 'rgba(255,255,255,1)',
				display: 'none'
			});

		position (
			popup,
			size,
			options
		);

		// execute further options
		if(options.addClass) {
			popup.addClass(options.addClass);
		}
		if(options.disableParent) {
			blur = $('<div/>')
				.appendTo('body')
				.css({
					position: 'absolute',
					zIndex: 999,
					left: 0,
					top: 0,				
					width: '100%',
					height: '100%',	
					background: 'rgba(0,0,0,.7)',
					display: 'none'
				});
		}
		if(options.closeOnEsc) {
			$(document)
				.keydown(function (event) {
					if(event.which === 27) {	// 27 = ESC
						var tag = $(document.activeElement)[0].nodeName.toLowerCase();	// get 'name' of html tag (e.g. 'div','body', etc.)

						/* if tagname (nodename) of element with focus (activeElement) 
							is not in array of tagnames (input,select,textarea)
							then hide Popup.
							This is equivalent to: Has user pressed escape in context of
							text editing? then don't close popup!
						*/
						if(_.indexOf(['input', 'select', 'textarea'], tag) === -1)
							hide();
					}
				});
		}

		// resize popup on window resize
		$(window).resize(function () {
			position (
				popup,
				resize(popup, options),
				options
			);
		});

		// make popup visible
		show();

		// Return Module API
		return _.extend(moduleAPI, {
			$el: 		popup,			
			show: 		_.bind(show, 	moduleAPI),
			hide: 		_.bind(hide, 	moduleAPI),
			destroy: 	_.bind(destroy, moduleAPI)
		});

	}
})