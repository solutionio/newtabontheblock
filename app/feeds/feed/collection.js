define(function (require) {
	return function (module, app, Backbone, Marionette, $, _) {
		var collection = Backbone.Collection.extend({
				model: Backbone.Model.extend({
					parse: function (data) {
						return data;
					}
				}),

				comparator: function (a, b) {
					if (a.get('dateAdded') > b.get('dateAdded'))
						return -1;

					if (a.get('dateAdded') < b.get('dateAdded'))
						return 1;

					return 0;
				},

				initialize: function () {

					if (arguments[1]) {

						chrome.bookmarks.getChildren(arguments[1], _( function (node) {
							this.reset(node, {parse: true});
						}).bind(this));

					}
				}
			});

		_(module).extend({
			collection: collection
		});
	}
})