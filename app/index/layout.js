define(function (require) {
	return function (module, parent, Backbone, Marionette, $, _) {
		var layout = Marionette.Layout.extend({
			template: require('hgn!./template/layout'),

			regions: {
				feeds: '.feeds'
			}
		});

		_(module).extend({
			layout: layout
		});
	}
});