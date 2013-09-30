define(function (require) {
	return function (module, parent, Backbone, Marionette, $, _) {
		var view = Marionette.ItemView.extend({
				tagName: 'li',
				className: 'list-group-item',
				template: require('hgn!../template/item'),
			});

		_( module ).extend({
			view: view
		});
	}
});