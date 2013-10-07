/**
This file evolves to be an example for the responsibilites,
a an 
*/
define(function (require) {
	return function (module, app, Backbone, Marionette, $, _) {
		var collection = Backbone.Collection.extend({
				model: Backbone.Model.extend({
					/**
					Parse single model
					*/
					parse: function (model) {
						/**
						What we actually need here is a mapping to happen,
						which maps the resource's custom field names to a standardized
						api, materialized in the template.
						*/

						/**
						Extend model with url to favicon
							use chrome cache to get favicon
						*/
						var loc = $('<a />').attr({ href: model.url })[0];

						return _( model ).extend({
							favicon: 'chrome://favicon/' + loc.protocol + '//' + loc.hostname
						});
					}
				}),

				/**
				Parse whole collection
				*/
				parse: function (models) {
					/**
					Reject folders
					*/
					return _( models ).reject( function (model) {
						return _( model ).has('dateGroupModified');
					});
				},

				/**
				Used to keep collection auto-sorted
				*/
				comparator: function (a, b) {
					/**
					Sort from newest to oldest
					*/
					if (a.get('dateAdded') > b.get('dateAdded'))
						return -1;

					if (a.get('dateAdded') < b.get('dateAdded'))
						return 1;

					return 0;
				},

				initialize: function () {
					/**
					Fill Collection with children of node passed with options hash
					*/					
					this.nodeId
					&&  chrome.bookmarks.getChildren(this.nodeId, _( function (model) {
							this.reset(model, {parse: true});
						}).bind(this));

				/**
				Listen to local bookmarks api for CRUD events and update collection accordingly
				*/
					/*
					Ignore onCreateEvents during bookmark import
					*/
					var ignoreCreateEvents = false; 	// create switch

					chrome.bookmarks.onImportBegan.addListener( function( ) {
						ignoreCreateEvents = true; 		// switch on
					});

					chrome.bookmarks.onImportEnded.addListener( function( ) {
						ignoreCreateEvents = false; 	// switch off
					});

					/*
					Create
					*/
					chrome.bookmarks.onCreated.addListener( _( function (nodeId, model) {
						!ignoreCreateEvents 					// respect the switch
						&& this.nodeId == model.parentId		// make sure this event is actually relevent to the current collection we're in
						&& !_( model ).has('dateGroupModified') // don't add folders
						&& this.add( model, { parse: true } ); 	// add & parse
					}).bind(this) );

					/*
					Remove
					*/
					chrome.bookmarks.onRemoved.addListener( _( function (nodeId, model) {
						this.nodeId == model.parentId 			// works without this bc nodeId is unique, but kept for performance reasons
						&& this.remove(nodeId);
					}).bind(this) );

					/**
					Update
					*/
					chrome.bookmarks.onChanged.addListener( _( function (nodeId, model) {
						/**
						model here only contains title and url, i.e. no parentId
							- makes this operation expensive, because it has to be executed on every collection
						*/
						this.set(
							_( model ).extend({
								id: nodeId
							}),
							{
								merge: 	true,
								add: 	false,
								remove: false
							}
						);
					}).bind(this) );

					/**
					Move = remove + create from source
					*/
					chrome.bookmarks.onMoved.addListener( _( function (nodeId, moveInfo) {
						this.nodeId == moveInfo.oldParentId
						&& this.remove(nodeId);

						this.nodeId == moveInfo.parentId
						&& 	chrome.bookmarks.get(nodeId, _( function (models) {
								!_( models ).has('dateGroupModified') // don't add folders
								&& this.add( models, { parse: true } ); 	// add & parse
							}).bind(this) );
					}).bind(this) );
				}
			});

		_(module).extend({
			collection: collection
		});
	}
})