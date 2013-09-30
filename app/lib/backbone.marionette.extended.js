define(['backbone', 'backbone.marionette.orig', 'underscore', 'lib/module_abs_path', 'lib/modules'], function (Backbone, Marionette, _, moduleAbsPath, modules) {
		
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


			/**
			Event Mapping to special controller properties, namely
				layout(s), view(s), controller(s), router(s), collection(s), [models via collection]

			currently not implemented
			*/


			/**
			Register the module with the 'modules'-module, which is a register for instantiated modules,
			which always returns a promise object, that is either already resolved if the module is already
			instantiated or is to be resolved when the requested module will eventually be instantiated

				Attention: since the promise will immediately be resolved on calling set, all event plumming
				has to be done before (since events may be fired immediately)
			*/
			modules.set(module);

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