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
							collection: feedsCollection,

							initialize: function () {
								/**
								Make list sortable
								*/
								require('jquery.ui.sortable');

								$(this.el).sortable({
									update: _( function (event, ui) {
										var models = [];

										_( this.$el.children() ).each(function (node) {
											var view = this.children.filter( function (view) {
												return node.isEqualNode(view.el);
											}).shift();

											models[ $(node).index() ] = {
												id: view.model.id
											};

										}, this );

										app.reqres.hasHandler('folders:reset')
										&& 	app.request('folders:reset', models )
										|| 	alert('Fehler');										
									}).bind(this)
								});
							}
						});

					this.el = new CollectionView;
				}
			});

		_( module ).extend({
			controller: controller
		})
	}
});