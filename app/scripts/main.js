/*global backboneApp, $*/

(function(){
	
	'use strict';
	
	window.backboneApp = {
	    Models: {},
	    Collections: {},
	    Views: {},
	    Routers: {},
	    init: function () {
	    	new this.Views.MainView();
	    }
	};

	$(document).ready(function () {
	    backboneApp.init();
		
	});


})();