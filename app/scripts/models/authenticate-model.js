/*global backboneApp, Backbone*/

(function(){
	
	'use strict';
	
	backboneApp.Models.AuthenticateModel = Backbone.Model.extend({

		urlRoot: 'api/v2/users',
	    defaults: {
	        username: "",
	        password:""
	    }  
	});

})();
