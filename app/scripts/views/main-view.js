/*global Bbone, Backbone, JST*/


(function () {
    'use strict';
    var books;
    backboneApp.Views.MainView = Backbone.View.extend({

        
        el: '#todo-app',

        //template: Handlebars.compile( $("#home-template").html()),
        template: Handlebars.compile( Templates.home),
        events: {
            "click a":"logout"
            
        },

        initialize: function () {
            this.render();
            books = new backboneApp.Collections.BookmarkCollection();
            //this.listenTo(books, 'add', this.addTodoItem);
            //this.listenTo(books, 'reset', this.addAllTodoItems);

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
                                //self.listenTo(books, 'add', self.addTodoItem);
                                //self.listenTo(books, 'reset', self.addAllTodoItems);
                                
                                
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
        addTodoItem: function (todo) {
            var view = new backboneApp.Views.BookmarkView({ model: todo });
            this.$('#todo-list').append(view.render().el);
        },

        addAllTodoItems: function () {
            books.each(this.addTodoItem, this);
        },
        updateList:function(){
            var self =this;
            books.fetch();
        },
        reloadBookMark:function(){
            var self =this;
            this.$('#todo-list').empty();
            books.fetch({
                success:function(req,res){
                    self.addAllTodoItems();
                }
            });
        },
        loginSuccessful:function(){
              var self =this;
              $(this.el).empty();
              this.$el.html(this.template());
              //books = new backboneApp.Collections.BookmarkCollection();
              //this.listenTo(books, 'add', this.addTodoItem);
              //this.listenTo(books, 'reset', this.addAllTodoItems);
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
            this.$('#todo-list').empty();
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
