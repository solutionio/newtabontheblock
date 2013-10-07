define(function (require) {
	return function (module, app, Backbone, Marionette, $, _) {
		var collection = module.sub('base', require('base/collection/chromeStorage')).collection
				.extend({
					initialize: function () {
						/**
						Make CRUD operations on collection globally available via app object
						*/
						app.reqres.setHandler( 'folders:add',
							_(function ( id ) {
								if ( !id )
									return false;

								if ( !_( id ).isString() )
									return false;

								this.add({
									id: id
								});

								return true;
							}).bind(this)
						);

						app.reqres.setHandler( 'folders:reset',
							_( function ( models, options ) {
								this.reset( models, options );

								return true;
							} ).bind(this)
						);

						// app.reqres.setHandler( 'folders:refresh',
						// 	_( function (node) {
								
						// 	} ).bind(this)
						// );
					}
				});

		_(module).extend({
			collection: collection
		});
	}
})