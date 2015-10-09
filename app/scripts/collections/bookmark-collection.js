/*global backboneApp, Backbone*/
(function(){
	
	'use strict';
	
	backboneApp.Collections.BookmarkCollection = Backbone.Collection.extend({

	    
		url: function(id){
			return "/api/v2/bookmark";
		},
	    initialize: function () {
	        this.model = backboneApp.Models.BookmarkModel
	    }

	});

})();