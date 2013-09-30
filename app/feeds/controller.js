define(function (require) {
	return function (module, parent, Backbone, Marionette, $, _)	 {
		var controller = Marionette.Controller.extend({
				initialize: function (options) {
					var FeedView = module.sub('list', require('./feed/views/list')).view;

					var view = Marionette.CollectionView.extend({
						className: 'row',
						itemView: FeedView,
						collection: new Backbone.Collection([
							{
								id: '106',
								name: 'General'
							},
							{
								id: '110',
								name: 'Penis',
							},
							{
								id: '198',
								name: 'Penis',
							}
						])
					});

					this.el = new view;
				}
			});

		_( module ).extend({
			controller: controller
		})
	}
});