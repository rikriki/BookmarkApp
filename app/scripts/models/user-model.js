/*global backboneApp, Backbone*/

(function(){
	
	'use strict';
	
	backboneApp.Models.UserModel = Backbone.Model.extend({

		urlRoot: '/api/v2/login',
	    defaults: {
	        username: "",
	        password:""
	    }  
	});

})();
