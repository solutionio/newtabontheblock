define(function (require) {
	return function (module, parent, Backbone, Marionette, $, _) {
		var view = Marionette.ItemView.extend({
				tagName: 'li',
				className: 'list-group-item',
				template: require('hgn!../template/item'),

				/**
				Reflect changes to model in DOM
				*/
				modelEvents: {
					'change:title': function (model) {
						this.$('[data-key="title"]').html( model.get('title') );
					},
					'change:url': function (model) {
						this.$('[data-key="url"]').attr({ href: model.get('url') });
					}
				}
			});

		_( module ).extend({
			view: view
		});
	}
});