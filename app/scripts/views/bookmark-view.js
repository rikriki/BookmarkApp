	/*global backboneApp, Backbone, JST*/

(function(){
	
	'use strict';
	
	backboneApp.Views.BookmarkView = Backbone.View.extend({

	    tagName: 'li',

	    //template: Handlebars.compile( $("#bookmarks-template").html()),
	    template: Handlebars.compile(Templates.bookmarkElement),
	    events: {
	        //'dblclick .label': 'toggleEdit',
	        'submit form': 'toggleEdit',
	        'click .edit' : 'toggleEdit',
	        'click .destroy': 'destroy',
	        'click .url':'urlOpen'
	    },


	   initialize: function () {
	        this.listenTo(this.model, 'change', this.render);
	        this.listenTo(this.model, 'destroy', this.remove);

	    },

	    render: function () {
	    	this.$el.html(this.template(this.model.toJSON()));
			return this;
	    },

	    toggleEdit: function () {
	    	
	    	var id = this.$('input.id').val().trim();
	    	var title = this.$('.title').html().trim();
	    	var url = this.$('.url').html().trim();
	    	var tagname = this.$('.tagname span').html().trim();
	    	var description = this.$('.description span').html().trim();
	    	var bookmark = {title:title,tagname:tagname,url:url,description:description,id:id}
	    	var Modalview = new backboneApp.Views.ModalView({model:bookmark});
	    	this.$('#my-modal').append(Modalview.render().el);
			$('#my-modal').modal('show');	    	


            
	    },
	    urlOpen:function(){
	    	window.open(this.model.attributes.url,'_blank')
	    },
	    destroy: function(){
	    	this.model.destroy({model:this.model.id});
      	},		 
	    close: function(){
        var value = this.$('.edit').val().trim();
        if(value) {
          this.model.save({title: value});
        }
        this.$el.removeClass('editing');
      },

	});

})();