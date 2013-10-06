define(function (require) {
	return function (module, app, Backbone, Marionette, $, _) {
		var controller = Marionette.Controller.extend({
				initialize: function (options) {
					/**
					Extend Backbone with ChromeStorage Capabilities
					*/
					var FeedsCollection = module.sub('collection', require('./collection')).collection
							.extend({
								name: 'Feeds'
							}),
						feedsCollection = new FeedsCollection;

					var ItemView = module.sub('list', require('./feed/views/list')).view,
						CollectionView = Marionette.CollectionView.extend({
							className: 	'row',
							itemView: 	ItemView,
							collection: feedsCollection
						});

					this.el = new CollectionView;
				}
			});

		_( module ).extend({
			controller: controller
		})
	}
});