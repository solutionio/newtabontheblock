define(function (require) {
	return function (module, parent, Backbone, Marionette, $, _)	 {
		var controller = Marionette.Controller.extend({
				initialize: function (options) {
					var Feeds = module.sub('feeds', 	require('feeds/controller')).controller,
						feeds = new Feeds;

					this.el = feeds.el;
				}
			});

		_( module ).extend({
			controller: controller
		})
	}
});