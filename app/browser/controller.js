define(function (require) {
	return function (module, app, Backbone, Marionette, $, _) {
		var controller = Marionette.Controller.extend({
				initialize: function (options) {
					var Collection = Backbone.Collection.extend({
							initialize: function () {
								chrome.bookmarks.getTree( _(function (tree) {
									this.reset(tree);
								}).bind(this) );
							}
						});

					// var TreeView = Marionette.CompositeView.extend({
					// 		tagName: 'ul',

					// 		initialize: function () {
					// 			this.collection = this.model.children;
					// 		},
					// 		template: function (item) {
					// 			return item.model.title;
					// 		}
					// 	}),
					// var RootView = Marionette.CollectionView.extend({
					// 	collection: new Collection,
					// 	itemView: TreeView
					// });


					/**
					Taken from
						http://lostechies.com/derickbailey/2012/04/05/composite-views-tree-structures-tables-and-more/
					*/
					// The recursive tree view
					var TreeView = Backbone.Marionette.CompositeView.extend({
					    template: function (model) {
					    	return $(document.createTextNode(model.title) + '<ul />');
					    },
					    
					    tagName: "li",
					    
					    initialize: function(){
					        // grab the child collection from the parent model
					        // so that we can render the collection as children
					        // of this parent node
					        this.collection = this.model.children;
					    },
					    
					    appendHtml: function(cv, iv){
					        cv.$("ul:first").append(iv.el);
					    },
					    onRender: function() {
					        if( _(this.collection).isUndefined() ){
					            this.$("ul:first").remove();
					        }
					    }
					});

					// The tree's root: a simple collection view that renders 
					// a recursive tree structure for each item in the collection
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