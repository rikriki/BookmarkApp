/*global backboneApp, Backbone*/

(function(){
	
	'use strict';
	
	backboneApp.Models.BookmarkModel = Backbone.Model.extend({

	    defaults: {
	        titled: '',
	        urls:'',
	        descriptions:'',
	        tags:'',
	        id:''
	    },
	    url: function(options){
	    	return "/api/v2/bookmark/"+ this.id;
		},
	    toggle: function () {
	        this.save({
	            completed: !this.get('completed')
	        });
	    }

	});

})();