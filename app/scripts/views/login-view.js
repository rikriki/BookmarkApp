/*global backboneApp, Backbone, JST*/

(function(){
	
	'use strict';
	backboneApp.Views.LoginView = Backbone.View.extend({

	    el: '#bookmark-form',

	    //template: Handlebars.compile( $("#login-template").html() ),
	    template: Handlebars.compile( Templates.login ),
	    events: {
	        "click #sign-in": "signIn",
	        "click #sign-up":"signup"
	    },

	    initialize: function () {
	        this.render();
	        //this.listenTo(this.collection, 'add', this.addTodoItem);
	        //this.listenTo(this.collection, 'reset', this.addAllTodoItems);
	        //this.collection.fetch();
	    },

	    render: function () {
	    	
	        $(this.el).html(this.template({content:"Please login"}));
	    },
	    
		signIn: function (event) {
			event.preventDefault();
			var that = this;
			var username = $('#inputUsername').val();
			var password = $('#inputPassword').val();
			if (username && password) {
				backboneApp.currentUser = new backboneApp.Models.UserModel({username: username, password: password});
		    	backboneApp.currentUser.save({},{
		    		success: function (req,res) {
						if(res.status==500){
							that.showError('.form-signin', res.message);
						}else{
							Backbone.trigger('login-event-submit');
						}
					},
					error: function (res) {
						that.showError('.form-signin', res.message);
						
					}	

		    	})
		    }else{
		    	that.showError('.form-signin', "Please do not leave blanks on every field.");
		    	$('#inputUsername').addClass('errorField');	
				$('#inputPassword').addClass('errorField');	
		    }
		},
		signup:function(){
			event.preventDefault();
			var username = $('#inputUsernameSU').val();
			var password = $('#inputPasswordSU').val();
			var rePassword = $('#reInputPassword').val();
			if (username && password && rePassword) {
				if(password == rePassword){
					backboneApp.currentUser = new backboneApp.Models.AuthenticateModel({username: username, password: password});
			    	backboneApp.currentUser.save({},{
			    		success: function (req,res) {
			    			
							if(res.status==500){
								that.showError('.form-signin', res.message);
							}else{
								console.log(res)
								Backbone.trigger('login-event-submit');
							}
						},
						error: function (res) {
							console.log(res)
							that.showError('.form-signin', res.message);

						}	

			    	})	
				}else{
				this.showError('.form-signin', "Password doesnt match.");	
				$('#reInputPassword').addClass('errorField');	
				$('#inputPasswordSU').addClass('errorField');		
				}
			}else{
		    	this.showError('.form-signin', "Please do not leave blanks on every field.");
		    	$('#inputUsernameSU').addClass('errorField');	
		    	$('#inputPasswordSU').addClass('errorField');	
				$('#reInputPassword').addClass('errorField');	
		    }
            
            
        },
	

	   
	    showError: function (selector, message, type) {
	    
		var element = "<p><h2 class='error' style='color:red;margin:5px 0'>"+message+"</h2></p>";
		if (type === 'login') {
			$(selector).before(element);
		} else {
			$(selector).append(element);
		}

		window.setTimeout(function () {
			$('.error').remove();
			$('input').removeClass('errorField');
		}, 2000);
	},

	});

})();
 
