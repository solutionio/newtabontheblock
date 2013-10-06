requirejs.config({
    baseUrl: 	'app',
    paths: 		{
    	'backbone'					: '../bower_components/backbone-amd/backbone',
        'backbone.localStorage'     : '../bower_components/backbone.localStorage/backbone.localStorage',
        'backbone.ChromeStorage'    : '../bower_components/backbone.ChromeStorage/backbone.chromestorage',
    	'backbone.marionette'		: 'lib/backbone.marionette.extended',
    	'backbone.marionette.orig'	: '../bower_components/marionette/lib/core/amd/backbone.marionette',
        'backbone.babysitter'       : '../bower_components/backbone.babysitter/lib/amd/backbone.babysitter',
        'backbone.eventbinder'      : '../bower_components/backbone.eventbinder/lib/amd/backbone.eventbinder',
        'backbone.wreqr'            : '../bower_components/backbone.wreqr/lib/amd/backbone.wreqr',

        'underscore'                : '../bower_components/underscore-amd/underscore',
    	'jquery'                    : '../bower_components/jquery/jquery',

        'jquery.ui.core'            : '../bower_components/jquery.ui/ui/jquery.ui.core',
        'jquery.ui.widget'           : '../bower_components/jquery.ui/ui/jquery.ui.widget',
        'jquery.ui.mouse'           : '../bower_components/jquery.ui/ui/jquery.ui.mouse',
        'jquery.ui.position'        : '../bower_components/jquery.ui/ui/jquery.ui.position',

        'jquery.ui.sortable'        : '../bower_components/jquery.ui/ui/jquery.ui.sortable',

        'font'                      : '../bower_components/requirejs-plugins/src/font',

        'hogan'                     : '../bower_components/requirejs-hogan-plugin/hogan',
        'hgn'                       : '../bower_components/requirejs-hogan-plugin/hgn',

        'propertyParser'            : '../bower_components/requirejs-plugins/src/propertyParser',

        'text'                      : '../bower_components/requirejs-hogan-plugin/text',
    },

    shim: {
        'jquery.ui.sortable': {
            /**
            This array of dependencies is the core dependency of any other jquery.ui.module
            */
            deps: ['jquery', 'jquery.ui.core', 'jquery.ui.widget', 'jquery.ui.mouse', 'jquery.ui.position'],
            exports: '$'
        }
    }
});

require(['app']);