/*global backboneApp, Backbone, JST*/

(function(){
	
	'use strict';
	backboneApp.Views.BookmarkFormView = Backbone.View.extend({

	    el: '#bookmark-form',

	    //template: Handlebars.compile( $("#bookmark-form-template").html() ),
	    template: Handlebars.compile( Templates.bookmarkForm ),
	    events: {
	        'submit': 'createBookmark'
	    },

	    initialize: function () {
	        this.render();
	    },

	    render: function () {
	    	this.$el.html(this.template({content:"nothing"}));
	    	$('#tags-todo').tagsInput({width:'auto'});
	    },
	    createBookmark: function (event) {
	        event.preventDefault();
			var titled = this.$('#title-todo').val().trim();
	        var urls = this.$('#url-todo').val().trim();
	        var descriptions = this.$('#description-todo').val().trim();
	        var tags = this.$('#tag-container').find('input').eq(0).val().trim();
	        var that =this;
	        if (titled && urls && descriptions && tags) {
	          	var newBookmark = new backboneApp.Models.BookmarkModel({title: titled,url: urls,description: descriptions,tagname: tags});
				newBookmark.save({},{
					success: function(res, req){
					  	Backbone.trigger('bookmark-event-new');
						$('#title-todo').val('');
			            $('#tags-todo').val('');
			            $('.tagsinput').find('span').remove();
			            $('#url-todo').val('http://');
			            $('#description-todo').val('');
					 },
					 error: function (error) {
						console.log(error);
					 }
				})
			}
	    },
	    showError: function (selector, message, type) {
		var element = "<h1 class='error' style='color:red;margin:5px 0'>"+message+"</h1>";
		if (type === 'login') {
			$(selector).before(element);
		} else {
			$(selector).append(element);
		}

		window.setTimeout(function () {
			$('.error').remove();
		}, 2000);
	},

	});

})();
 
