/**
Reconstruct the absolute path of a module
*/
define(['underscore'], function (_) {
	
	/**
	module: the module from which to create the absolute path, going upwards
	*/
	function moduleAbsPath (module, path) {
		if (!path) path = [];

		module.moduleName
		&& path.push(module.moduleName);

		if (module.parentModule) 
			return moduleAbsPath(module.parentModule, path);

		return path.reverse();
	};

	return moduleAbsPath;
});