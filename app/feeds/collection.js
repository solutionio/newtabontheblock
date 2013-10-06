define(function (require) {
	return function (module, app, Backbone, Marionette, $, _) {
		var collection = module.sub('base', require('base/collection/chromeStorage')).collection
				.extend({
					initialize: function () {
						/**
						Make ability to add new folders globally available via app object
						*/
						app.reqres.setHandler( 'addFolder',
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

						app.reqres.setHandler( 'resetFolders', _( function () {
							this.reset();

							return true;
						} ).bind(this) );
					}
				});

		_(module).extend({
			collection: collection
		});
	}
})