this.JST=this.JST||{},this.JST["app/scripts/templates/main.ejs"]=function(obj){obj||(obj={});var __p="";_.escape;with(obj)__p+="<p>Your content here.</p>\n\n";return __p},this.JST["app/scripts/templates/modal.ejs"]=function(obj){obj||(obj={});var __t,__p="",__e=_.escape;with(obj)__p+='  <div class="modal-dialog" role="document">\n    <div class="modal-content">\n      <div class="modal-header">\n        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n        <h4 class="modal-title" id="myModalLabel">Edit bookmark</h4>\n      </div>\n      <div class="modal-body">\n        <form class="form-group">\n        	<input class="id" type="hidden" value="'+__e(id)+'">\n			<div class="clearfix"> \n				<input type="text" id="title-todo" placeholder="Title" value="'+(null==(__t=title)?"":__t)+'">\n			</div>\n			<div class="clearfix"> \n				<input type="text" id="url-todo" placeholder="URL" value="'+(null==(__t=url)?"":__t)+'">\n			</div>\n			<div class="clearfix"> \n				<input type="text" id="description-todo" placeholder="Description" value="'+(null==(__t=description)?"":__t)+'">\n			</div>\n			<div class="clearfix"> \n				<input type="text" id="tags-todo" placeholder="Tags" value="'+(null==(__t=tagname)?"":__t)+'">\n			</div>\n		</form>\n      </div>\n      <div class="modal-footer">\n        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n        <button type="button" id="submit" class="btn btn-primary">Save changes</button>\n      </div>\n    </div>\n  </div>';return __p},this.JST["app/scripts/templates/todo.ejs"]=function(obj){obj||(obj={});var __t,__p="",__e=_.escape;with(obj)__p+='<input class="id" type="hidden" value="'+__e(id)+'">\n\n	<img src="http://placehold.it/200x200" class="img-thumbnail">\n	\n\n<div class="title">\n	    '+(null==(__t=title)?"":__t)+'\n	\n</div>\n\n<div class="url">\n	    '+(null==(__t=url)?"":__t)+'\n	\n</div>\n\n<div class="tagname">\n	    '+(null==(__t=tagname)?"":__t)+'\n</div>\n\n<div class="description">\n	    '+(null==(__t=description)?"":__t)+'\n</div>\n\n<button class="btn btn-primary edit" >edit</button>\n<button class="btn btn-danger destroy">remove</button>\n\n</div>\n\n';return __p},this.JST["app/scripts/templates/todos.ejs"]=function(obj){obj||(obj={});var __p="";_.escape;with(obj)__p+='<div class="header">\n    <ul class="nav nav-pills pull-right">\n        <li class="active"><a href="#">Signup</a></li>\n    </ul>\n    <h3 class="text-muted">Bookmark App</h3>\n</div>\n\n<div class="jumbotron">\n    <h1>\'Happy bookmarking! :)</h1>\n    <section id="bookmark">\n    <form class="form-group">\n		<div class="clearfix"> \n			<input type="text" id="title-todo" placeholder="Title">\n		</div>\n		<div class="clearfix"> \n			<input type="text" id="url-todo" placeholder="URL">\n		</div>\n		<div class="clearfix"> \n			<input type="text" id="description-todo" placeholder="Description">\n		</div>\n		<div class="clearfix"> \n			<input type="text" id="tags-todo" placeholder="Tags">\n		</div>\n		<div class="clearfix"> \n			<input type="submit" class="btn createTo" value="Submit">\n		</div>\n	</form>\n	</section> \n</div>\n<ul id="todo-list">\n		<!-- Where our To Do items will go -->\n</ul>\n<div class="footer">\n    <p>Footer 2015</p>\n</div>\n\n\n<!-- Modal -->\n<div class="modal fade" id="my-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">\n\n</div>';return __p},Templates={},Templates.home='<div class="header"> <ul class="nav nav-pills pull-right"> <li class="active"><a href="#">Logout</a></li></ul> <h3 class="text-muted">Bookmark App</h3> </div><div class="jumbotron"> <section id="bookmark-form"> </section> </div><ul id="bookmark-list"> </ul> <div class="footer"> <p>Footer 2015</p></div><div class="modal fade" id="my-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"> </div>',Templates.bookmarkForm='<h2>Add a new Bookmark</h2><br/><section id="bookmark"> <form class="form-group"> <div class="clearfix"> <input type="text" id="title-todo" placeholder="Title" class="form-control"> </div><div class="clearfix"> <input type="text" id="url-todo" value="http://" class="form-control"> </div><div class="clearfix"> <input type="text" id="description-todo" placeholder="Description" class="form-control"> </div><div class="clearfix" id="tag-container"> <input type="text" id="tags-todo" placeholder="Tags" class="form-control"> </div><div class="clearfix"> <input type="submit" class="btn createTo" value="Submit" class="form-control"> </div></form> </section> ',Templates.bookmarkElement=' <input class="id" type="hidden" value="{{id}}"> <div class="panel panel-default"> <div class="panel-body"> <img src="http://placehold.it/200x200" class="img-thumbnail"> </div><div class="panel-footer"> <h4 class="title">{{title}}</h4> <p class="url ">{{url}}</p><p class="description"> <b> Descriptions:</b><br/> <span>{{description}}</span> </p><button class="btn btn-primary edit" >edit</button> <button class="btn btn-danger destroy">remove</button> </div><p class="tagname text-primary"> <b> Tags :</b> <span>{{tagname}}</span> </p></div>',Templates.login="<p>{{content}}</p><form class='form-signin'> <label for='inputUsername' class='sr-only'>Username</label> <input id='inputUsername' class='form-control' placeholder='Username'> <label for='inputPassword' class='sr-only'>Password</label> <input type='password' id='inputPassword' class='form-control' placeholder='Password'> <button class='btn btn-lg btn-primary btn-block' id='sign-in' type='submit'>Sign in</button> <br/><p class='form-signin-heading'>Or</p><input id='inputUsernameSU' class='form-control' placeholder='Username'> <label for='inputPassword' class='sr-only'>Password</label> <input type='password' id='inputPasswordSU' class='form-control' placeholder='Password'> <label for='reInputPassword' class='sr-only'>Re-Enter Password</label> <input type='password' id='reInputPassword' class='form-control' placeholder='Re-Enter Password'> <button class='btn btn-lg btn-default btn-block' id='sign-up' type='submit'>Sign Up</button> </form>",Templates.modal='<div class="modal-dialog" role="document"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> <h4 class="modal-title" id="myModalLabel">Edit bookmark</h4> </div><div class="modal-body"> <form class="form-group"> <input class="id" type="hidden" value="{{id}}" class="form-control"> <div class="clearfix"> <input type="text" id="title-todo" placeholder="Title" value="{{title}}" class="form-control"> </div><div class="clearfix"> <input type="text" id="url-todo" placeholder="URL" value="{{url}}" class="form-control"> </div><div class="clearfix"> <input type="text" id="description-todo" placeholder="Description" value="{{description}}" class="form-control"> </div><div class="clearfix" id="tag-container"> <input type="text" id="tags-todo" placeholder="Tags" value="{{tagname}}" class="form-control"> </div></form> </div><div class="modal-footer"> <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> <button type="button" id="submit" class="btn btn-primary">Save changes</button> </div></div></div>',function(){"use strict";window.backboneApp={Models:{},Collections:{},Views:{},Routers:{},init:function(){new this.Views.MainView}},$(document).ready(function(){backboneApp.init()})}(),function(){"use strict";backboneApp.Collections.BookmarkCollection=Backbone.Collection.extend({url:function(a){return"/api/v2/bookmark"},initialize:function(){this.model=backboneApp.Models.BookmarkModel}})}(),function(){"use strict";backboneApp.Models.BookmarkModel=Backbone.Model.extend({defaults:{titled:"",urls:"",descriptions:"",tags:"",id:""},url:function(a){return"/api/v2/bookmark/"+this.id},toggle:function(){this.save({completed:!this.get("completed")})}})}(),function(){"use strict";backboneApp.Models.UserModel=Backbone.Model.extend({urlRoot:"/api/v2/login",defaults:{username:"",password:""}})}(),function(){"use strict";backboneApp.Models.AuthenticateModel=Backbone.Model.extend({urlRoot:"api/v2/users",defaults:{username:"",password:""}})}(),function(){"use strict";var a;backboneApp.Views.MainView=Backbone.View.extend({el:"#bookmark-app",template:Handlebars.compile(Templates.home),events:{"click a":"logout"},initialize:function(){this.render(),a=new backboneApp.Collections.BookmarkCollection,this.listenTo(Backbone,"modal-event-save",function(a){console.log(a),this.updateList()},this),this.listenTo(Backbone,"login-event-submit",function(){this.loginSuccessful()},this),this.listenTo(Backbone,"bookmark-event-new",function(){this.reloadBookMark()},this)},render:function(){$(this.el).empty(),this.$el.html(this.template());var b=this;backboneApp.user=new backboneApp.Models.UserModel,backboneApp.user.fetch({success:function(c,d){d.success?(backboneApp.bookmarks=new backboneApp.Models.BookmarkModel,backboneApp.bookmarks.fetch({success:function(c,d){a.fetch({success:function(a,c){b.reloadBookMark()}});new backboneApp.Views.BookmarkFormView;$(".nav").show()},error:function(a,c){b.renderLogin()}})):b.renderLogin()},error:function(a,c){b.renderLogin()}})},addBookmarkItem:function(a){var b=new backboneApp.Views.BookmarkView({model:a});this.$("#bookmark-list").append(b.render().el)},addAllBookmarkItems:function(){a.each(this.addBookmarkItem,this)},updateList:function(){a.fetch()},reloadBookMark:function(){var b=this;this.$("#bookmark-list").empty(),a.fetch({success:function(a,c){b.addAllBookmarkItems()}})},loginSuccessful:function(){var b=this;$(this.el).empty(),this.$el.html(this.template()),a.fetch({success:function(a,c){b.reloadBookMark()}});new backboneApp.Views.BookmarkFormView({collection:this.collection})},renderLogin:function(){$(".nav").hide();new backboneApp.Views.LoginView},logout:function(){event.preventDefault();var b=this;a.reset(),this.$("#bookmark-list").empty(),$.ajax({url:"/api/v2/login",type:"DELETE",dataType:"json",success:function(a,c){500==c.status?that.showError(".form-signin",c):b.render()},error:function(a,b){}})}})}(),function(){"use strict";backboneApp.Views.LoginView=Backbone.View.extend({el:"#bookmark-form",template:Handlebars.compile(Templates.login),events:{"click #sign-in":"signIn","click #sign-up":"signup"},initialize:function(){this.render()},render:function(){$(this.el).html(this.template({content:"Please login"}))},signIn:function(a){$('button[type="submit"]').prop("disabled",!0),a.preventDefault();var b=this,c=$("#inputUsername").val(),d=$("#inputPassword").val();c&&d?(backboneApp.currentUser=new backboneApp.Models.UserModel({username:c,password:d}),backboneApp.currentUser.save({},{success:function(a,c){500==c.status?b.showError(".form-signin",c.message):Backbone.trigger("login-event-submit"),$('button[type="submit"]').prop("disabled",!1)},error:function(a){b.showError(".form-signin",a.message)}})):(b.showError(".form-signin","Please do not leave blanks on every field."),$("#inputUsername").addClass("errorField"),$("#inputPassword").addClass("errorField"))},signup:function(){event.preventDefault(),$('button[type="submit"]').prop("disabled",!0);var a=$("#inputUsernameSU").val(),b=$("#inputPasswordSU").val(),c=$("#reInputPassword").val(),d=this;a&&b&&c?b==c?(backboneApp.currentUser=new backboneApp.Models.AuthenticateModel({username:a,password:b}),backboneApp.currentUser.save({},{success:function(a,b){500==b.status?d.showError(".form-signin",b.message):(console.log(b),Backbone.trigger("login-event-submit"),$('button[type="submit"]').prop("disabled",!1))},error:function(a){console.log(a),d.showError(".form-signin",a.message)}})):(this.showError(".form-signin","Password doesnt match."),$("#reInputPassword").addClass("errorField"),$("#inputPasswordSU").addClass("errorField")):(this.showError(".form-signin","Please do not leave blanks on every field."),$("#inputUsernameSU").addClass("errorField"),$("#inputPasswordSU").addClass("errorField"),$("#reInputPassword").addClass("errorField"))},showError:function(a,b,c){var d="<p><h2 class='error' style='color:red;margin:5px 0'>"+b+"</h2></p>";"login"===c?$(a).before(d):$(a).append(d),window.setTimeout(function(){$(".error").remove(),$("input").removeClass("errorField"),$('button[type="submit"]').prop("disabled",!1)},2e3)}})}(),function(){"use strict";backboneApp.Views.BookmarkFormView=Backbone.View.extend({el:"#bookmark-form",template:Handlebars.compile(Templates.bookmarkForm),events:{submit:"createBookmark"},initialize:function(){this.render()},render:function(){this.$el.html(this.template({content:"nothing"})),$("#tags-todo").tagsInput({width:"auto"})},createBookmark:function(a){a.preventDefault();var b=this.$("#title-todo").val().trim(),c=this.$("#url-todo").val().trim(),d=this.$("#description-todo").val().trim(),e=this.$("#tag-container").find("input").eq(0).val().trim();if($('input[type="submit"]').prop("disabled",!0),b&&c&&d&&e){var f=new backboneApp.Models.BookmarkModel({title:b,url:c,description:d,tagname:e});f.save({},{success:function(a,b){Backbone.trigger("bookmark-event-new"),$("#title-todo").val(""),$("#tags-todo").val(""),$(".tagsinput").find("span").remove(),$("#url-todo").val("http://"),$("#description-todo").val(""),$('input[type="submit"]').prop("disabled",!1)},error:function(a){console.log(a),$('input[type="submit"]').prop("disabled",!1)}})}else this.showError("#bookmark","Please do not leave blanks on every field."),$(".form-control").addClass("errorField"),$(".tagsinput").addClass("errorField")},showError:function(a,b,c){var d="<p class='error' style='color:red;margin:5px 0'>"+b+"</p>";"login"===c?$(a).before(d):$(a).append(d),window.setTimeout(function(){$(".error").remove(),$(".form-control").removeClass("errorField"),$(".tagsinput").removeClass("errorField"),$('input[type="submit"]').prop("disabled",!1)},2e3)}})}(),function(){"use strict";backboneApp.Views.BookmarkView=Backbone.View.extend({tagName:"li",template:Handlebars.compile(Templates.bookmarkElement),events:{"submit form":"toggleEdit","click .edit":"toggleEdit","click .destroy":"destroy","click .url":"urlOpen"},initialize:function(){this.listenTo(this.model,"change",this.render),this.listenTo(this.model,"destroy",this.remove)},render:function(){return this.$el.html(this.template(this.model.toJSON())),this},toggleEdit:function(){var a=this.$("input.id").val().trim(),b=this.$(".title").html().trim(),c=this.$(".url").html().trim(),d=this.$(".tagname span").html().trim(),e=this.$(".description span").html().trim(),f={title:b,tagname:d,url:c,description:e,id:a},g=new backboneApp.Views.ModalView({model:f});this.$("#my-modal").append(g.render().el),$("#my-modal").modal("show")},urlOpen:function(){window.open(this.model.attributes.url,"_blank")},destroy:function(){this.model.destroy({model:this.model.id})},close:function(){var a=this.$(".edit").val().trim();a&&this.model.save({title:a}),this.$el.removeClass("editing")}})}(),function(){"use strict";backboneApp.Views.ModalView=Backbone.View.extend({el:"#my-modal",template:Handlebars.compile(Templates.modal),events:{"click #submit":"submitEdit"},initialize:function(){},render:function(){return this.$el.html(this.template(this.model)),this.$("#tags-todo").tagsInput({width:"auto"}),this},submitEdit:function(){event.preventDefault();var a=this.$("#title-todo").val().trim(),b=this.$("#url-todo").val().trim(),c=this.$("#description-todo").val().trim(),d=this.$("#tag-container").find("input").eq(0).val().trim(),e=this.$("input.id").val().trim(),f="/api/v2/bookmark/"+e,g={title:a,description:c,tagname:d,url:b,id:e};$.ajax({type:"post",url:f,data:g,success:function(){Backbone.trigger("modal-event-save",g),$(".modal-backdrop").removeClass("in"),$("#my-modal").modal("hide"),setTimeout(function(){$("body").removeClass("modal-open"),$(".modal-backdrop").remove()},500)},error:function(a){console.log(a)}})}})}();