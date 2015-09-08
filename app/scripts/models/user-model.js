/*global backboneApp, Backbone*/

(function(){
	
	'use strict';
	
	backboneApp.Models.UserModel = Backbone.Model.extend({

		urlRoot: 'http://localhost:1337/api/v2/login',
	    defaults: {
	        username: "",
	        password:""
	    }  
	});

})();
