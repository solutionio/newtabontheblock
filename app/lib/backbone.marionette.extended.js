define(['backbone', 'backbone.marionette.orig', 'underscore', 'lib/module_abs_path'], function (Backbone, Marionette, _, moduleAbsPath) {
		
	/**
	Create a module.sub() method
	*/
	_(Marionette.Module.prototype).extend({
		/**
		Convenience method for creating submodule hanging off of caller
		*/
		sub: function (moduleName, fn) {
			var path = moduleAbsPath(this);
				path.push(moduleName);


			/**
			Load module the marionette-way, i.e. as a property of the app module
			*/
			var module =	this.app.module(
								path.join('.'),
								fn ? fn : function () {}
							);

			/**
			Attach a separate instance of Request/Response functionality to each module
				in some cases, req/res is superior to EA, i.e. when caller actually needs to know
				if a specfic module has not only been loaded (that is easily done via 'modules'-module, that returns/resolves
				promises), but its containing factory has also been instantiated
			*/
			_(module).extend({
				reqres: new Backbone.Wreqr.RequestResponse()
			});

			return module;
		}
	});


	/**
	Hijack Module Definition Function
		to inject @parentModule into every create module instance
	*/
	( function () {

		var addModuleDefinition = Marionette.Module._addModuleDefinition;

		_(Marionette.Module).extend({
			_addModuleDefinition: function(parentModule, module, def, args) {
				_(module).extend({
					parentModule: parentModule
				});

				addModuleDefinition.apply(this, arguments);
			}		
		});	

	} )();

	return Marionette;
});