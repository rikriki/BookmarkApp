
var Bookmark = Backbone.Model.extend({
        urlRoot: "/json/bookmark",
        defaults: {
            url: "http://"
        }
    }),
    BookmarksCollection = Backbone.Collection.extend({
        model: Bookmark,
        url: "/json/bookmark"
    }),
    Tag = Backbone.Model.extend({
        urlRoot: "/json/tag"
    }),
    TagsCollection = Backbone.Collection.extend({
        model: Tag,
        url: "/json/tag"
    }),
    PublicView = Backbone.View.extend({
        events: {
            "submit #frm-signup": "signup"
        },
        initialize: function() {
            _.bindAll(this, "render", "signup"), $(this.el).css("width", "960px").css("margin", "0px auto")
        },
        render: function() {
            $(this.el).html(Templates.pub), $("#app").append(this.el)
        },
        unrender: function() {
            $(this.el).detach()
        },
        signup: function(a) {
            a.preventDefault();
            var b = $("#frm-signup input[name=username]").val(),
                c = $("#frm-signup input[name=password]").val(),
                d = $("#frm-signup input[name=email]").val();
            b = $.trim(b), c = $.trim(c), d = $.trim(d);
            var e = "",
                f = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
            f.test(d) || (e = "That e-mail address is invalid.");
            if (b.length == 0 || c.length == 0 || d.length == 0) e = "Please fill out all the fields.";
            if (e != "") return $("#signup-error").html(e).addClass("alert-message").addClass("error"), !1;
            $.ajax({
                type: "POST",
                url: "/json/register",
                dataType: "json",
                data: {
                    username: b,
                    password: c,
                    email: d
                },
                success: function(a) {
                    typeof a.error != "undefined" ? $("#signup-error").html(a.error).addClass("alert-message").addClass("error") : ($("#header .public").hide(), $("#header .logged-in").show(), App.user = a, App.router.navigate("bookmarks", !0))
                },
                error: function() {
                    $("#signup-error").html("An error occurred. Please try again.").addClass("alert-message").addClass("error")
                }
            })
        }
    }),
    AccountView = Backbone.View.extend({
        events: {
            "submit #frm-account": "account"
        },
        initialize: function() {
            _.bindAll(this, "render", "account", "unrender")
        },
        render: function() {
            var a = Templates.account,
                b = Handlebars.compile(a),
                c = b(App.user);
            $(this.el).html(c), $(this.el).css("margin", "100px auto 15px auto"), $("#app").append(this.el), $(this.el).masonry({
                itemSelector: ".box",
                columnWidth: 460,
                isFitWidth: !0
            })
        },
        unrender: function() {
            $(this.el).masonry("destroy").detach()
        },
        account: function(a) {
            a.preventDefault();
            var b = this.$("input[name=username]").val(),
                c = this.$("input[name=email]").val(),
                d = this.$("input[name=password]").val();
            this.$("input[type=submit]").attr("disabled", "disabled");
            var e = this;
            $.ajax({
                type: "PUT",
                url: "/json/user",
                dataType: "json",
                data: {
                    username: b,
                    password: d,
                    email: c
                },
                success: function(a) {
                    App.user = a, e.$("input[type=submit]").removeAttr("disabled"), e.$(".account_info").html("Changes saved"), setTimeout(function() {
                        e.$(".account_info").html("")
                    }, 3e3)
                },
                error: function() {
                    window.location = "/"
                }
            })
        }
    }),
    EditView = Backbone.View.extend({
        events: {
            "click .save": "save",
            "click .cancel": "cancel",
            "submit form": "save"
        },
        initialize: function() {
            _.bindAll(this, "render", "unrender", "save", "cancel")
        },
        render: function() {
            var a = Templates.edit,
                b = Handlebars.compile(a),
                c = b(this.model.attributes);
            $(this.el).html(c), $("body").append(this.el), this.$("input[name=tags]").attr("id", "tags" + this.model.id), this.$("input[name=tags]").tagsInput({
                autocomplete_url: "/json/autocomplete"
            }), $(this.el).modal({
                backdrop: !0,
                keyboard: !1,
                show: !0
            })
        },
        unrender: function() {
            $(this.el).modal("hide"), $(this.el).remove()
        },
        save: function(a) {
            a.preventDefault();
            var b = this.$("input[name=url]").val(),
                c = this.$("input[name=title]").val(),
                d = this.$("input[name=description]").val(),
                e = this.$("input[name=tags]").val(),
                f = Array();
            e.indexOf(",") !== -1 ? f = e.split(",") : e.length > 0 && f.push(e), this.model.set({
                url: b,
                title: c,
                description: d,
                tags: f,
                timestamp: Math.round((new Date).getTime() / 1e3)
            }), this.model.save(), this.model.isNew() ? App.router.view.body.collection.add(this.model, {
                at: 0
            }) : $(App.router.view.body.el).masonry("reload"), this.unrender()
        },
        cancel: function(a) {
            a.preventDefault(), this.unrender()
        }
    }),
    BookmarkView = Backbone.View.extend({
        events: {
            dblclick: "edit",
            "click .edit": "edit",
            "click .delete": "del",
            "click .tag": "filter"
        },
        initialize: function() {
            _.bindAll(this, "render", "edit", "del");
            var a = new Date(this.model.get("timestamp") * 1e3),
                b = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            this.model.set({
                date: a.getDate() + " " + b[a.getMonth()] + " " + a.getFullYear()
            }), this.model.set({
                thumburl: encodeURIComponent(this.model.get("url"))
            }), this.model.bind("change", this.render), $(this.el).addClass("bookmark")
        },
        render: function() {
            var a = Templates.bookmark,
                b = Handlebars.compile(a),
                c = b(this.model.attributes);
            $(this.el).html(c)
        },
        edit: function(a) {
            a.preventDefault(), (new EditView({
                model: this.model
            })).render()
        },
        del: function(a) {
            a.preventDefault();
            var b = confirm("Are you sure you want to delete this bookmark?");
            b && (App.router.view.body.collection.remove(this.model), this.model.destroy(), $(this.el).remove(), $(App.router.view.body.el).masonry("reload"))
        },
        filter: function(a) {
            a.preventDefault();
            var b = $(a.target).html();
            App.router.navigate("tag/" + b, !0)
        }
    }),
    BookmarksView = Backbone.View.extend({
        initialize: function() {
            _.bindAll(this, "fetch", "render", "unrender", "scroll"), this.collection = new BookmarksCollection, this.collection.bind("reset", this.render, this), this.collection.bind("add", this.render, this)
        },
        fetch: function(a) {
            this.search = !1, typeof a != "undefined" && (this.search = !0), this.collection.fetch(a)
        },
        render: function() {
            this.offset = 50;
            if (this.search == 0) {
                var a = this;
                $(window).scroll(function() {
                    a.scroll()
                })
            }
            $(this.el).masonry("destroy"), $("#app").html("").append(this.el);
            if (this.search == 0 && this.collection.models.length == 0) $(this.el).css("width", "960px").css("margin", "0px auto"), $(this.el).html(Templates.bookmarks);
            else {
                $(this.el).css("margin", "100px auto 15px auto").css("width", "auto").css("background", "transparent"), $(this.el).html("");
                var a = this;
                _(this.collection.models).each(function(b) {
                    var c = new BookmarkView({
                        model: b
                    });
                    c.render(), $(a.el).append(c.el)
                }), $(this.el).masonry({
                    itemSelector: ".bookmark",
                    columnWidth: 265,
                    isFitWidth: !0
                })
            }
        },
        unrender: function() {
            $(this.el).masonry("destroy").detach(), $(window).unbind("scroll")
        },
        scroll: function() {
            var a = $(document).height() - $(window).height() - 50 <= $(window).scrollTop(),
                b = this;
            a && ($(window).unbind("scroll"), $.getJSON("/json/bookmark?offset=" + b.offset, function(a) {
                b.collection.unbind("add"), b.offset += 50, b.collection.add(a), _(a).each(function(a) {
                    var c = new BookmarkView({
                        model: new Bookmark(a)
                    });
                    c.render(), $(b.el).append(c.el).masonry("appended", $(c.el), !0)
                }), $(window).scroll(function() {
                    b.scroll()
                }), b.collection.bind("add", b.render, b)
            }))
        }
    }),
    TagView = Backbone.View.extend({
        events: {
            "click a": "go"
        },
        initialize: function() {
            _.bindAll(this, "render", "go"), $(this.el).addClass("taglist")
        },
        render: function() {
            var a = Templates.tag,
                b = Handlebars.compile(a),
                c = b(this.model.attributes);
            $(this.el).html(c)
        },
        go: function(a) {
            a.preventDefault(), App.router.navigate("#tag/" + this.model.get("tag"), !0)
        }
    }),
    TagsView = Backbone.View.extend({
        initialize: function() {
            _.bindAll(this, "fetch", "render", "unrender"), this.collection = new TagsCollection, this.collection.bind("reset", this.render, this), $(this.el).css("margin", "100px auto 15px auto"), $(this.el).masonry()
        },
        fetch: function(a) {
            this.collection.fetch(a)
        },
        render: function() {
            if (this.collection.length == 0) {
                App.router.navigate("bookmarks", !0);
                return
            }
            $("#app").append(this.el), $(this.el).html("").masonry("destroy");
            var a = this;
            _(this.collection.models).each(function(b) {
                var c = new TagView({
                    model: b
                });
                c.render(), $(a.el).append(c.el)
            }), $(this.el).masonry({
                itemSelector: ".taglist",
                columnWidth: 200,
                isFitWidth: !0
            })
        },
        unrender: function() {
            $(this.el).masonry("destroy").detach()
        }
    }),
    AppView = Backbone.View.extend({
        events: {
            "click  #btn-home": "home",
            "click  #btn-mytags": "mytags",
            "click  #btn-addbookmark": "addbookmark",
            "click  #btn-account": "account",
            "click  #btn-logout": "logout",
            "click  #btn-login": "toggleLogin",
            "submit #frm-search": "search",
            "submit #frm-login": "login"
        },
        initialize: function() {
            _.bindAll(this, "render", "search", "home", "mytags", "addbookmark", "account", "logout", "toggleLogin", "login")
        },
        render: function() {
            $("#header").html(Templates.header), typeof App.user != "undefined" && ($("#header .public").hide(), $("#header .logged-in").show())
        },
        home: function(a) {
            a.preventDefault(), App.router.navigate("", !0)
        },
        search: function(a) {
            a.preventDefault();
            var b = $(a.target).find("input").val();
            $(a.target).find("input").val("").blur(), App.router.navigate("search/" + b, !0)
        },
        mytags: function(a) {
            a.preventDefault(), App.router.navigate("mytags", !0)
        },
        addbookmark: function(a) {
            a.preventDefault(), App.router.navigate("bookmarks", !0), (new EditView({
                model: new Bookmark
            })).render()
        },
        account: function(a) {
            a.preventDefault(), App.router.navigate("account", !0)
        },
        logout: function(a) {
            a.preventDefault(), $.ajax({
                type: "POST",
                url: "/json/logout",
                dataType: "json",
                success: function(a) {
                    window.location = "/"
                }
            })
        },
        toggleLogin: function(a) {
            a.preventDefault(), l = $(a.target).offset().left, t = $(a.target).offset().top, height = $(a.target).outerHeight(), width = $(a.target).outerWidth(), $("#login").css("top", t + height), $("#login").css("left", l - 328), $("#login").toggle()
        },
        login: function(a) {
            a.preventDefault();
            var b = $("#login input[name=username]").val(),
                c = $("#login input[name=password]").val();
            $.ajax({
                type: "POST",
                url: "/json/login",
                dataType: "json",
                data: {
                    username: b,
                    password: c
                },
                success: function(a) {
                    $("#header .public").hide(), $("#header .logged-in").show(), App.user = a, App.router.navigate("bookmarks", !0)
                },
                error: function() {
                    $("#login-error").html("That username &amp; password was not found.").addClass("alert-message").addClass("error")
                }
            })
        }
    }),
    BookmarklyRouter = Backbone.Router.extend({
        routes: {
            "": "index",
            bookmarks: "bookmarks",
            "tag/:tag": "tag",
            mytags: "tags",
            "search/*search": "search",
            account: "account",
            "bookmarklet/*params": "bookmarklet"
        },
        views: {},
        initialize: function() {
            _.bindAll(this, "index", "bookmarks", "tag", "tags", "search", "bookmarklet", "setBody"), this.views.app = new AppView({
                el: $("body")
            }), this.views.bookmarks = new BookmarksView, this.views.pub = new PublicView, this.views.tags = new TagsView, this.views.account = new AccountView, this.view = this.views.app, this.view.render()
        },
        index: function() {
            typeof App.user != "undefined" ? this.navigate("bookmarks", !0) : (this.setBody(this.views.pub), this.view.body.render())
        },
        bookmarks: function() {
            this.setBody(this.views.bookmarks, !0), this.view.body.fetch()
        },
        tag: function(a) {
            this.setBody(this.views.bookmarks, !0), this.view.body.fetch({
                data: {
                    tag: a
                }
            })
        },
        search: function(a) {
            this.setBody(this.views.bookmarks, !0), this.view.body.fetch({
                data: {
                    search: a
                }
            })
        },
        tags: function() {
            this.setBody(this.views.tags, !0), this.view.body.fetch()
        },
        account: function() {
            this.setBody(this.views.account, !0), this.view.body.render()
        },
        bookmarklet: function(a) {
            this.setBody(this.views.bookmarks, !0), this.view.body.fetch();
            var b = /\?url=(.*?)&title=(.*)/gi;
            matches = b.exec(a);
            var c = matches[1],
                d = matches[2],
                e = {
                    url: c,
                    title: d
                };
            (new EditView({
                model: new Bookmark(e)
            })).render()
        },
        setBody: function(a, b) {
            if (b == 1 && typeof App.user == "undefined") {
                this.navigate("", !0);
                return
            }
            typeof this.view.body != "undefined" && this.view.body.unrender(), this.view.body = a
        }
    }),
    App = {
        initialize: function() {
            var a = Backbone.sync;
            Backbone.sync = function(b, c, d) {
                d.error = function(a, b, c) {
                    a.status == 401 && (window.location = "/")
                }, a(b, c, d)
            }, this.router = new BookmarklyRouter, Backbone.history.start({
                pushState: !0
            });
            var b = this;
            $(window).resize(function() {
                b.resizeHeader()
            }), this.resizeHeader()
        },
        resizeHeader: function() {
            setTimeout(function() {
                var a = $("#app div:first");
                if (a && a.offset()) {
                    var b = a.offset().left;
                    b > 132 && (b = 132), b < 20 && (b = 20), $("#redbar .wrap").css("margin-left", b + "px"), $("#redbar .wrap").css("margin-right", b + 20 + "px")
                }
            }, 1e3)
        }
    }