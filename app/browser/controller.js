define(function (require) {
	return function (module, app, Backbone, Marionette, $, _) {
		var controller = Marionette.Controller.extend({
				initialize: function (options) {
					var Collection = Backbone.Collection.extend({
							initialize: function () {
								chrome.bookmarks.getTree( _( function (tree) {
									this.reset(tree);
								}).bind(this) );
							}
						});

					var TreeView = Backbone.Marionette.CompositeView.extend({
					    template: require('hgn!./template/item'),
					    
					    tagName: "li",

					    events: {
					    	'click >a': function (event) {
								app.reqres.hasHandler('addFolder')
								&& 	app.request(
										'addFolder',
										this.model.id.toString()
									)
								|| 	alert('Fehler');
					    	}
					    },
					    
					    initialize: function(){
					    	var Collection = Backbone.Collection.extend({
					    		parse: function (data) {
					    			return _( data ).filter( function (node) {
					    				return _( node ).has('dateGroupModified');
					    			});
					    		}
					    	});

					        this.collection = new Collection( this.model.get('children'), { parse: true } );
					    },
					    
					    appendHtml: function(cv, iv){
					        cv.$("ul:first").append(iv.el);
					    },
					    onRender: function() {
					    	/**
							Hack to remove unnecessary ul on root element
								http://lostechies.com/derickbailey/2012/04/05/composite-views-tree-structures-tables-and-more/
					    	*/
					        if( _(this.collection).isUndefined() ){
					            this.$("ul:first").remove();
					        }
					    }
					});

					var TreeRoot = Backbone.Marionette.CollectionView.extend({
					    tagName: "ul",
					    itemView: TreeView,
					    collection: new Collection
					});


					this.el = new TreeRoot;
				}
			});

		_( module ).extend({
			controller: controller
		})
	}
});