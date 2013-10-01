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
												return $('<a href="#" />').html( data.title );
											},

											events: {
												'click a': function () {
													this.model.get('onClick').apply(this, arguments);
												}
											}
										})
									});

								navbar.nav.show( new Nav({
									collection: new Backbone.Collection([ 
										{
											id: 'addFeed',
											title: 'Add Folder',
											onClick: function (event) {
												app.reqres.hasHandler('addFolder')
												&& 	app.request(
														'addFolder',
														prompt('What is the id of the folder you want to add?')
													)
												|| 	alert('Fehler');
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