define(function (require) {
	return function (module, parent, Backbone, Marionette, $, _) {
		var FeedCollection = module.sub('collection', require('../collection')).collection,
			ItemView = module.sub('view', require('./item')).view;

		var view = Marionette.CompositeView.extend({
				className: 'col-md-3',

				itemView: ItemView,
				itemViewContainer: 'ul',

				template: function () {
					return $('<ul class="feed list-group" />');
				},				

				initialize: function () {
					this.collection = new FeedCollection([], this.model.get('id'));
				}
			});

		_( module ).extend({
			view: view
		});
	}
});