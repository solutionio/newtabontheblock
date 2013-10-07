define(function (require) {
	return function (module, parent, Backbone, Marionette, $, _) {
		
		var view = Marionette.CompositeView.extend({
				className: 'col-md-3',

				itemView: module.sub('view', require('./item')).view,
				itemViewContainer: 'ul',

				template: function () {
					return $('<ul class="feed list-group" />');
				},				

				initialize: function () {
					var FeedCollection = module.sub('collection', require('../collection')).collection
							.extend({
								/**
								Attach nodeId to collection, to
									- populate collection onIninitialize()
									- make the collection identifiable in the context of Events
									  stemming from chrome.bookmarks
								*/								
								nodeId: this.model.get('id')
							})

					this.collection = new FeedCollection;
				}
			});

		_( module ).extend({
			view: view
		});
	}
});