
(function () {
    'use strict';

    backboneApp.Views.ModalView = Backbone.View.extend({

        el: '#my-modal',
        //template: Handlebars.compile( $("#modal-template").html()),
        template: Handlebars.compile(Templates.modal),
        events: {
        	'click #submit' : 'submitEdit',
        },

        initialize: function () {

        },

        render: function () {
            this.$el.html(this.template(this.model));
            this.$('#tags-todo').tagsInput({width:'auto'});
			return this;
        },
        submitEdit: function(){
        	event.preventDefault();
        	var titled = this.$('#title-todo').val().trim();
	        var urls = this.$('#url-todo').val().trim();
	        var descriptions = this.$('#description-todo').val().trim();
	        var tags = this.$('#tag-container').find('input').eq(0).val().trim();
	        var id = this.$('input.id').val().trim();
	        var url = "/api/v2/bookmark/"+id;
	        var data = {"title":titled,description:descriptions, tagname: tags,url:urls,id:id};
	        $.ajax({
				  type: "post",
				  url:url,
				  data:data,
				  success: function(){
				  	 Backbone.trigger('modal-event-save', data );
				  	 $('.modal-backdrop').removeClass('in');
				  	 $('#my-modal').modal('hide');
				  	 setTimeout(function(){
				  	 	
				  	 	$('body').removeClass('modal-open');
					 	$('.modal-backdrop').remove();
				  	 },500)
		        	 
        		  },
				  error:function(error){
				  	console.log(error)
				  }
			});

	        
        }

    });


})();


