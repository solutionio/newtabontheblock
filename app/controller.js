define(function (require) {
	return function (module, app, Backbone, Marionette, $, _) {
		var controller = Marionette.Controller.extend({
				initialize: function (options) {
					/**
					Nav
					*/
					var NavController = module.sub('nav', require('nav/controller')).controller,
						navController = new NavController;

					app.nav.show(navController.el);

					/**
					Index
					*/
					var IndexController = module.sub('index', require('index/controller')).controller,
						indexController = new IndexController;

					app.index.show(indexController.el);
				}
			});

		_( module ).extend({
			controller: controller
		});
	}
});