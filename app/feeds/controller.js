define(function (require) {
	return function (module, app, Backbone, Marionette, $, _) {
		var controller = Marionette.Controller.extend({
				initialize: function (options) {

					var Collection = Backbone.Collection.extend({
							localStorage: new Backbone.LocalStorage('feeds'),

							initialize: function () {
								app.reqres.setHandler( 'addFolder',
									function ( id ) {
										if ( !id )
											return false;

										if ( !_( id ).isString() )
											return false;

										collection.add({
											id: id
										});

										return true;
									}
								);							
							}
						}),
						collection = new Collection;

					var ItemView = module.sub('list', require('./feed/views/list')).view,
						CollectionView = Marionette.CollectionView.extend({
							className: 	'row',
							itemView: 	ItemView,
							collection: collection
						});

					this.el = new CollectionView;
				}
			});

		_( module ).extend({
			controller: controller
		})
	}
});