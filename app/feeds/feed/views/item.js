define(function (require) {
	return function (module, parent, Backbone, Marionette, $, _) {
		var view = Marionette.ItemView.extend({
				tagName: 'li',
				className: 'list-group-item',
				template: require('hgn!../template/item'),

				/**
				Reflect changes to model in DOM
				*/
				modelEvents: {
					'change:title': function (model) {
						this.$('[data-key="title"]').html( model.get('title') );
					},
					'change:url': function (model) {
						this.$('[data-key="url"]').attr({ href: model.get('url') });
					}
				},

				initialize: function () {
					/**
					Add an event listener that is dependend on the result from an async chrome.* api call
					*/
					chrome.tabs.getCurrent( _( function (tab) {
						var tabsCreated = 0;

						this.$('a').on('click', _( function () {
							chrome.tabs.create({
								url: 	this.model.get('url'),
								active: false, 	// open in background
								index: tab.index + (tabsCreated++) +1
							});		
							
							return false;					
						}).bind(this) );

						// this.events = {
						// 	'click': function () {
						// 		chrome.tabs.create({
						// 			url: 	'http://www.google.com',
						// 			active: false, 	// open in background
						// 		});

						// 		return false;								
						// 	}
						// };

						// _( this.events ).extend({
						// 	'click >a': function () {
						// 		chrome.tabs.create({
						// 			url: 	'http://www.google.com',
						// 			active: false, 	// open in background
						// 		});

						// 		return false;
						// 	}
						// });
					}).bind(this) );
				}
			});

		_( module ).extend({
			view: view
		});
	}
});