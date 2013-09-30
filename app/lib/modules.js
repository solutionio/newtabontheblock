define(['backbone', 'underscore', 'jquery', 'app', 'lib/module_abs_path'], function (Backbone, _, $, app, moduleAbsPath) {
	var promisedModules = {};

	function find (path, tree) {
		var node = path.shift();

		if ( _(tree).has( node ) ) {
			if ( path.length )
					return find (path, tree[node].submodules);
			else 	return tree[node];
		}
		else return false;
	}

	return {
		get: function (path, parentModule) {
			if ( _(path).isString() )
				path = path.split('.');

				var module 		= parentModule  ? find(_(path).clone(), parentModule.submodules)
												: find(_(path).clone(), app.submodules),
					absPath 	= parentModule 	? moduleAbsPath(parentModule).concat(path).join('.')
												: path.join('.'),
					deferred 	= _(promisedModules).has(absPath)	? promisedModules[absPath]
																	: new $.Deferred;

			promisedModules[absPath] = deferred;

			return module 	? deferred.resolve( module ).promise()
							: deferred.promise();
		},
		set: function (module) {
			var path = moduleAbsPath( module ).join('.'),
				deferred = _(promisedModules).has(path)	? promisedModules[path]
														: new $.Deferred;

			promisedModules[path] = deferred;

			return deferred.resolve( module ).promise();			
		}
	};
});