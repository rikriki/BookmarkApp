/*global Bbone, Backbone, JST*/


(function () {
    'use strict';
    var books;
    backboneApp.Views.MainView = Backbone.View.extend({

        
        el: '#bookmark-app',

        //template: Handlebars.compile( $("#home-template").html()),
        template: Handlebars.compile( Templates.home),
        events: {
            "click a":"logout"
            
        },

        initialize: function () {
            this.render();
            books = new backboneApp.Collections.BookmarkCollection();
          
            this.listenTo( Backbone, 'modal-event-save', function (data) {
                console.log(data)
              this.updateList();
            }, this );
            this.listenTo( Backbone, 'login-event-submit', function () {
              this.loginSuccessful();
            }, this );
            this.listenTo( Backbone, 'bookmark-event-new', function () {
              this.reloadBookMark();
            }, this );
        },
        render: function () {
            $(this.el).empty();
            this.$el.html(this.template());
            var self= this;
            backboneApp.user =  new backboneApp.Models.UserModel();
            backboneApp.user.fetch({
                success: function (req, res) {
                    if(res.success){
                         backboneApp.bookmarks =  new backboneApp.Models.BookmarkModel();
                         backboneApp.bookmarks.fetch({ 
                            success: function (req, res) {
                                
                                books.fetch({
                                    success:function(req,res){
                                        self.reloadBookMark();        
                                    }
                                });
                                var formview = new backboneApp.Views.BookmarkFormView();
                                 $('.nav').show();
                            },
                            error: function (err, res) {
                               self.renderLogin();
                            }
                         }); 
                    }else{
                        self.renderLogin();
                    }
                    
                },
                error: function (req, res) {
                    self.renderLogin();
                }
            });
        },
        addBookmarkItem: function (Bookmark) {
            var view = new backboneApp.Views.BookmarkView({ model: Bookmark });
            this.$('#bookmark-list').append(view.render().el);
        },

        addAllBookmarkItems: function () {
            books.each(this.addBookmarkItem, this);
        },
        updateList:function(){
            var self =this;
            books.fetch();
        },
        reloadBookMark:function(){
            var self =this;
            this.$('#bookmark-list').empty();
            books.fetch({
                success:function(req,res){
                    self.addAllBookmarkItems();
                }
            });
        },
        loginSuccessful:function(){
              var self =this;
              $(this.el).empty();
              this.$el.html(this.template());
              books.fetch({
                success:function(req,res){
                    self.reloadBookMark();        
                }
        });
              var formview = new backboneApp.Views.BookmarkFormView({collection:this.collection});
        },
        renderLogin:function(){
           $('.nav').hide();
           var loginview = new backboneApp.Views.LoginView();
        },
        logout:function(){
            event.preventDefault();
            var self = this;
            books.reset();
            this.$('#bookmark-list').empty();
            $.ajax({
                url: '/api/v2/login',
                type: 'DELETE',
                dataType: 'json',
                success: function (req, res) {
                    if(res.status==500){
                        that.showError('.form-signin', res);
                    }else{
                        self.render();
                    }
                },
                error: function (req, res) {
                }
            })
        }

    });

})();
