requirejs.config({
    baseUrl: 	'app',
    paths: 		{
    	'backbone'					: '../bower_components/backbone-amd/backbone',
    	'underscore'				: '../bower_components/underscore-amd/underscore',
    	'backbone.marionette'		: 'lib/backbone.marionette.extended',
    	'backbone.marionette.orig'	: '../bower_components/marionette/lib/core/amd/backbone.marionette',
        'backbone.babysitter'       : '../bower_components/backbone.babysitter/lib/amd/backbone.babysitter',
        'backbone.eventbinder'      : '../bower_components/backbone.eventbinder/lib/amd/backbone.eventbinder',
        'backbone.wreqr'            : '../bower_components/backbone.wreqr/lib/amd/backbone.wreqr',

    	'jquery'                    : '../bower_components/jquery/jquery',

        'font'                      : '../bower_components/requirejs-plugins/src/font',

        'hogan'                     : '../bower_components/requirejs-hogan-plugin/hogan',
        'hgn'                       : '../bower_components/requirejs-hogan-plugin/hgn',

        'propertyParser'            : '../bower_components/requirejs-plugins/src/propertyParser',

        'text'                      : '../bower_components/requirejs-hogan-plugin/text',
    }
});

require(['app']);