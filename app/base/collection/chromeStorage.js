define(function (require) {
	return function (module, app, Backbone, Marionette, $, _) {
		var collection = Backbone.Collection.extend({

				constructor: function () {
					/**
					Execute Parent Constructor
					*/
					Backbone.Collection.apply(this, arguments);

					/**
					Error
					*/
					function chromeStorageException (message) {
						this.name = 'chromeStorageException';
						this.message = message;
					}

					if(!'name' in this)
						throw new chromeStorageException('collection needs a name property to enable ChromeStorage functionality');

					if(!_(chrome).has('storage'))
						throw new chromeStorageException('this app does not have the necessary permissions to use the ChromeStorage API');

					/**
					Reset Collection with data stored in ChromeStorage
					*/
					chrome.storage.sync.get(this.name, _(function (data) {

						if (data && _(data).has(this.name) ) {
							this.reset(data[this.name]);
						}
					
					}).bind(this));

					/**
					Sync changes to collection with ChromeStorage
					*/
					this.on('all', function () {
						var data = {};

						data[this.name] = _( this.models ).map( function (model) {
							return model.attributes;
						});

						chrome.storage.sync.set(data);
					});

					/**
					Sync changes to ChromeStorage with Collection
					*/
					chrome.storage.onChanged.addListener(function () {
						console.log('cS:changed', arguments);
					});

				},
			});

		_(module).extend({
			collection: collection
		});
	}
})