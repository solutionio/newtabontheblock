define(function (require) {
	return function (module, app, Backbone, Marionette, $, _) {
		var controller = Marionette.Controller.extend({
				initialize: function (options) {
					var Navbar = Marionette.Layout.extend({
							template: require('hgn!./template/navbar/layout'),
							regions: {
								header: '.navbar-header',
								nav: 	'.nav-wrapper'	
							},

							/**
							Rendering
								can happen anywhere, so put code that shows a region's content
								in the onRender method to make sure the layout is rendered
							*/
							onRender: function (navbar) {

								/**
								Header
								*/
								var Header = Marionette.ItemView.extend({
										className: 'navbar-brand navbar-left',

										template: function () {
											return require('hgn!./template/navbar/header')({
												brand: app.name
											})
										}
									});

								navbar.header.show( new Header );

								/**
								Nav
								*/
								var Nav = Marionette.CollectionView.extend({
										tagName: 'ul',
										className: 'nav navbar-nav',

										itemView: Marionette.ItemView.extend({
											tagName: 'li',
											template: function (data) {
												return $('<a href="#">').html( data.title );
											},

											events: {
												'click a': function () {
													this.model.get('onClick').apply(this, arguments);

													return false;
												}
											}
										})
									});

								navbar.nav.show( new Nav({
									collection: new Backbone.Collection([ 
										{
											title: 'Add Folder',
											/**
											Callback
												@event: the event object
												@this: 	context of view that was clicked, containing e.g. the associated model
											*/
											onClick: function (event) {
												var Browser = module.sub('browser', require('browser/controller')).controller,
													browser = new Browser;

												var Popup = require('lib/popup'),
													popup = new Popup({
														size: 'cinema',
														disableParent: true,
														closeOnEsc: true
													});

												popup.$el.html( browser.el.render().el );
											}
										},
										{
											title: 'Remove all Folders',
											onClick: function (event) {
												app.reqres.hasHandler('folders:reset')
												&& 	app.request('folders:reset')
												|| 	alert('Fehler');												
											}
										},
										{
											title: 'Bookmark Manager',
											onClick: function (event) {
												chrome.tabs.create({
													url: 'chrome://bookmarks'
												});
											}
										},
										{
											title: 'Freeze!',
											onClick: function () {
												function cheese (i) {
													chrome.tabs.captureVisibleTab(null, {format: 'png'}, function (image) {
														var Popup = require('lib/popup'),
															popup = new Popup({
																size: 'cinema',
																disableParent: true,
																closeOnEsc: true
															});

														popup.$el.html( $('<img src="'+image+'" style="width: 1140px">') );

														window.setTimeout(cheese, 500, i);														
													});
												}

												cheese(0);
											}
										}
									])
								}) );
							}
						});

					this.el = new Navbar;
				}
			});

		_( module ).extend({
			controller: controller
		});
	}
});