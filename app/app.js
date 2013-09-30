define(function (require) {
	var _ = require('underscore'),
		Marionette = require('backbone.marionette');

	var app = new Marionette.Application;

	app.name = "nevv tab on the block";

	app.addInitializer(function (options) {
		var Controller = app.module('controller', require('controller')).controller,
			controller = new Controller;
	});


	app.addRegions({
		nav: '.nav',
		index: '.body'
	});

	/**
	Start App
		runs the initializers
	*/
	app.start();

	return app;
});