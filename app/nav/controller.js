define(function (require) {
	return function (module, app, Backbone, Marionette, $, _) {
		var controller = Marionette.Controller.extend({
				initialize: function (options) {
					var Navbar = Marionette.Layout.extend({
							template: require('hgn!./template/navbar/layout'),
							regions: {
								header: '.navbar-header'
							}
						}),
						navbar = new Navbar;

					navbar.render();

					var Header = Marionette.ItemView.extend({
							template: function () {
								return require('hgn!./template/navbar/header')({
									brand: app.name
								})
							}
						}),
						header = new Header;

					navbar.header.show(header);

					console.log(header, navbar);

					this.el = navbar;
				}
			});

		_( module ).extend({
			controller: controller
		});
	}
});