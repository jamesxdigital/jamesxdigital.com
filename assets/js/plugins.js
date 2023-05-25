/*
 * FitVids 1.1
 * Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
 * Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
 * Released under the WTFPL license - http://sam.zoy.org/wtfpl/
 */
!(function (t) {
  "use strict";
  t.fn.fitVids = function (e) {
    var i = { customSelector: null, ignore: null };
    if (!document.getElementById("fit-vids-style")) {
      var r = document.head || document.getElementsByTagName("head")[0],
        a =
          ".fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}",
        d = document.createElement("div");
      (d.innerHTML = '<p>x</p><style id="fit-vids-style">' + a + "</style>"),
        r.appendChild(d.childNodes[1]);
    }
    return (
      e && t.extend(i, e),
      this.each(function () {
        var e = [
          'iframe[src*="player.vimeo.com"]',
          'iframe[src*="youtube.com"]',
          'iframe[src*="youtube-nocookie.com"]',
          'iframe[src*="kickstarter.com"][src*="video.html"]',
          "object",
          "embed",
        ];
        i.customSelector && e.push(i.customSelector);
        var r = ".fitvidsignore";
        i.ignore && (r = r + ", " + i.ignore);
        var a = t(this).find(e.join(","));
        (a = a.not("object object")),
          (a = a.not(r)),
          a.each(function (e) {
            var i = t(this);
            if (
              !(
                i.parents(r).length > 0 ||
                ("embed" === this.tagName.toLowerCase() &&
                  i.parent("object").length) ||
                i.parent(".fluid-width-video-wrapper").length
              )
            ) {
              i.css("height") ||
                i.css("width") ||
                (!isNaN(i.attr("height")) && !isNaN(i.attr("width"))) ||
                (i.attr("height", 9), i.attr("width", 16));
              var a =
                  "object" === this.tagName.toLowerCase() ||
                  (i.attr("height") && !isNaN(parseInt(i.attr("height"), 10)))
                    ? parseInt(i.attr("height"), 10)
                    : i.height(),
                d = isNaN(parseInt(i.attr("width"), 10))
                  ? i.width()
                  : parseInt(i.attr("width"), 10),
                o = a / d;
              if (!i.attr("id")) {
                var h = "fitvid" + e;
                i.attr("id", h);
              }
              i
                .wrap('<div class="fluid-width-video-wrapper"></div>')
                .parent(".fluid-width-video-wrapper")
                .css("padding-top", 100 * o + "%"),
                i.removeAttr("height").removeAttr("width");
            }
          });
      })
    );
  };
})(window.jQuery || window.Zepto);

/*
 * debouncedresize
 * https://github.com/louisremi/jquery-smartresize
 * Copyright 2012 @louis_remi
 * Licensed under the MIT license.
 */
(function ($) {
  var $event = $.event,
    $special,
    resizeTimeout;

  $special = $event.special.debouncedresize = {
    setup: function () {
      $(this).on("resize", $special.handler);
    },
    teardown: function () {
      $(this).off("resize", $special.handler);
    },
    handler: function (event, execAsap) {
      // Save the context
      var context = this,
        args = arguments,
        dispatch = function () {
          // set correct event type
          event.type = "debouncedresize";
          $event.dispatch.apply(context, args);
        };

      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }

      execAsap
        ? dispatch()
        : (resizeTimeout = setTimeout(dispatch, $special.threshold));
    },
    threshold: 150,
  };
})(jQuery);

/*!
 * imagesLoaded PACKAGED v4.1.3
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */
!(function (e, t) {
  "function" == typeof define && define.amd
    ? define("ev-emitter/ev-emitter", t)
    : "object" == typeof module && module.exports
    ? (module.exports = t())
    : (e.EvEmitter = t());
})("undefined" != typeof window ? window : this, function () {
  function e() {}
  var t = e.prototype;
  return (
    (t.on = function (e, t) {
      if (e && t) {
        var i = (this._events = this._events || {}),
          n = (i[e] = i[e] || []);
        return -1 == n.indexOf(t) && n.push(t), this;
      }
    }),
    (t.once = function (e, t) {
      if (e && t) {
        this.on(e, t);
        var i = (this._onceEvents = this._onceEvents || {}),
          n = (i[e] = i[e] || {});
        return (n[t] = !0), this;
      }
    }),
    (t.off = function (e, t) {
      var i = this._events && this._events[e];
      if (i && i.length) {
        var n = i.indexOf(t);
        return -1 != n && i.splice(n, 1), this;
      }
    }),
    (t.emitEvent = function (e, t) {
      var i = this._events && this._events[e];
      if (i && i.length) {
        var n = 0,
          o = i[n];
        t = t || [];
        for (var r = this._onceEvents && this._onceEvents[e]; o; ) {
          var s = r && r[o];
          s && (this.off(e, o), delete r[o]),
            o.apply(this, t),
            (n += s ? 0 : 1),
            (o = i[n]);
        }
        return this;
      }
    }),
    (t.allOff = t.removeAllListeners =
      function () {
        delete this._events, delete this._onceEvents;
      }),
    e
  );
}),
  (function (e, t) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(["ev-emitter/ev-emitter"], function (i) {
          return t(e, i);
        })
      : "object" == typeof module && module.exports
      ? (module.exports = t(e, require("ev-emitter")))
      : (e.imagesLoaded = t(e, e.EvEmitter));
  })("undefined" != typeof window ? window : this, function (e, t) {
    function i(e, t) {
      for (var i in t) e[i] = t[i];
      return e;
    }
    function n(e) {
      var t = [];
      if (Array.isArray(e)) t = e;
      else if ("number" == typeof e.length)
        for (var i = 0; i < e.length; i++) t.push(e[i]);
      else t.push(e);
      return t;
    }
    function o(e, t, r) {
      return this instanceof o
        ? ("string" == typeof e && (e = document.querySelectorAll(e)),
          (this.elements = n(e)),
          (this.options = i({}, this.options)),
          "function" == typeof t ? (r = t) : i(this.options, t),
          r && this.on("always", r),
          this.getImages(),
          h && (this.jqDeferred = new h.Deferred()),
          void setTimeout(
            function () {
              this.check();
            }.bind(this)
          ))
        : new o(e, t, r);
    }
    function r(e) {
      this.img = e;
    }
    function s(e, t) {
      (this.url = e), (this.element = t), (this.img = new Image());
    }
    var h = e.jQuery,
      a = e.console;
    (o.prototype = Object.create(t.prototype)),
      (o.prototype.options = {}),
      (o.prototype.getImages = function () {
        (this.images = []), this.elements.forEach(this.addElementImages, this);
      }),
      (o.prototype.addElementImages = function (e) {
        "IMG" == e.nodeName && this.addImage(e),
          this.options.background === !0 && this.addElementBackgroundImages(e);
        var t = e.nodeType;
        if (t && d[t]) {
          for (var i = e.querySelectorAll("img"), n = 0; n < i.length; n++) {
            var o = i[n];
            this.addImage(o);
          }
          if ("string" == typeof this.options.background) {
            var r = e.querySelectorAll(this.options.background);
            for (n = 0; n < r.length; n++) {
              var s = r[n];
              this.addElementBackgroundImages(s);
            }
          }
        }
      });
    var d = { 1: !0, 9: !0, 11: !0 };
    return (
      (o.prototype.addElementBackgroundImages = function (e) {
        var t = getComputedStyle(e);
        if (t)
          for (
            var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(t.backgroundImage);
            null !== n;

          ) {
            var o = n && n[2];
            o && this.addBackground(o, e), (n = i.exec(t.backgroundImage));
          }
      }),
      (o.prototype.addImage = function (e) {
        var t = new r(e);
        this.images.push(t);
      }),
      (o.prototype.addBackground = function (e, t) {
        var i = new s(e, t);
        this.images.push(i);
      }),
      (o.prototype.check = function () {
        function e(e, i, n) {
          setTimeout(function () {
            t.progress(e, i, n);
          });
        }
        var t = this;
        return (
          (this.progressedCount = 0),
          (this.hasAnyBroken = !1),
          this.images.length
            ? void this.images.forEach(function (t) {
                t.once("progress", e), t.check();
              })
            : void this.complete()
        );
      }),
      (o.prototype.progress = function (e, t, i) {
        this.progressedCount++,
          (this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded),
          this.emitEvent("progress", [this, e, t]),
          this.jqDeferred &&
            this.jqDeferred.notify &&
            this.jqDeferred.notify(this, e),
          this.progressedCount == this.images.length && this.complete(),
          this.options.debug && a && a.log("progress: " + i, e, t);
      }),
      (o.prototype.complete = function () {
        var e = this.hasAnyBroken ? "fail" : "done";
        if (
          ((this.isComplete = !0),
          this.emitEvent(e, [this]),
          this.emitEvent("always", [this]),
          this.jqDeferred)
        ) {
          var t = this.hasAnyBroken ? "reject" : "resolve";
          this.jqDeferred[t](this);
        }
      }),
      (r.prototype = Object.create(t.prototype)),
      (r.prototype.check = function () {
        var e = this.getIsImageComplete();
        return e
          ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth")
          : ((this.proxyImage = new Image()),
            this.proxyImage.addEventListener("load", this),
            this.proxyImage.addEventListener("error", this),
            this.img.addEventListener("load", this),
            this.img.addEventListener("error", this),
            void (this.proxyImage.src = this.img.src));
      }),
      (r.prototype.getIsImageComplete = function () {
        return this.img.complete && void 0 !== this.img.naturalWidth;
      }),
      (r.prototype.confirm = function (e, t) {
        (this.isLoaded = e), this.emitEvent("progress", [this, this.img, t]);
      }),
      (r.prototype.handleEvent = function (e) {
        var t = "on" + e.type;
        this[t] && this[t](e);
      }),
      (r.prototype.onload = function () {
        this.confirm(!0, "onload"), this.unbindEvents();
      }),
      (r.prototype.onerror = function () {
        this.confirm(!1, "onerror"), this.unbindEvents();
      }),
      (r.prototype.unbindEvents = function () {
        this.proxyImage.removeEventListener("load", this),
          this.proxyImage.removeEventListener("error", this),
          this.img.removeEventListener("load", this),
          this.img.removeEventListener("error", this);
      }),
      (s.prototype = Object.create(r.prototype)),
      (s.prototype.check = function () {
        this.img.addEventListener("load", this),
          this.img.addEventListener("error", this),
          (this.img.src = this.url);
        var e = this.getIsImageComplete();
        e &&
          (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"),
          this.unbindEvents());
      }),
      (s.prototype.unbindEvents = function () {
        this.img.removeEventListener("load", this),
          this.img.removeEventListener("error", this);
      }),
      (s.prototype.confirm = function (e, t) {
        (this.isLoaded = e),
          this.emitEvent("progress", [this, this.element, t]);
      }),
      (o.makeJQueryPlugin = function (t) {
        (t = t || e.jQuery),
          t &&
            ((h = t),
            (h.fn.imagesLoaded = function (e, t) {
              var i = new o(this, e, t);
              return i.jqDeferred.promise(h(this));
            }));
      }),
      o.makeJQueryPlugin(),
      o
    );
  });

/* PrismJS 1.11.0
http://prismjs.com/download.html?themes=prism-okaidia&languages=markup+css+clike+javascript */
var _self =
    "undefined" != typeof window
      ? window
      : "undefined" != typeof WorkerGlobalScope &&
        self instanceof WorkerGlobalScope
      ? self
      : {},
  Prism = (function () {
    var e = /\blang(?:uage)?-(\w+)\b/i,
      t = 0,
      n = (_self.Prism = {
        manual: _self.Prism && _self.Prism.manual,
        disableWorkerMessageHandler:
          _self.Prism && _self.Prism.disableWorkerMessageHandler,
        util: {
          encode: function (e) {
            return e instanceof r
              ? new r(e.type, n.util.encode(e.content), e.alias)
              : "Array" === n.util.type(e)
              ? e.map(n.util.encode)
              : e
                  .replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/\u00a0/g, " ");
          },
          type: function (e) {
            return Object.prototype.toString
              .call(e)
              .match(/\[object (\w+)\]/)[1];
          },
          objId: function (e) {
            return (
              e.__id || Object.defineProperty(e, "__id", { value: ++t }), e.__id
            );
          },
          clone: function (e) {
            var t = n.util.type(e);
            switch (t) {
              case "Object":
                var r = {};
                for (var a in e)
                  e.hasOwnProperty(a) && (r[a] = n.util.clone(e[a]));
                return r;
              case "Array":
                return e.map(function (e) {
                  return n.util.clone(e);
                });
            }
            return e;
          },
        },
        languages: {
          extend: function (e, t) {
            var r = n.util.clone(n.languages[e]);
            for (var a in t) r[a] = t[a];
            return r;
          },
          insertBefore: function (e, t, r, a) {
            a = a || n.languages;
            var l = a[e];
            if (2 == arguments.length) {
              r = arguments[1];
              for (var i in r) r.hasOwnProperty(i) && (l[i] = r[i]);
              return l;
            }
            var o = {};
            for (var s in l)
              if (l.hasOwnProperty(s)) {
                if (s == t)
                  for (var i in r) r.hasOwnProperty(i) && (o[i] = r[i]);
                o[s] = l[s];
              }
            return (
              n.languages.DFS(n.languages, function (t, n) {
                n === a[e] && t != e && (this[t] = o);
              }),
              (a[e] = o)
            );
          },
          DFS: function (e, t, r, a) {
            a = a || {};
            for (var l in e)
              e.hasOwnProperty(l) &&
                (t.call(e, l, e[l], r || l),
                "Object" !== n.util.type(e[l]) || a[n.util.objId(e[l])]
                  ? "Array" !== n.util.type(e[l]) ||
                    a[n.util.objId(e[l])] ||
                    ((a[n.util.objId(e[l])] = !0),
                    n.languages.DFS(e[l], t, l, a))
                  : ((a[n.util.objId(e[l])] = !0),
                    n.languages.DFS(e[l], t, null, a)));
          },
        },
        plugins: {},
        highlightAll: function (e, t) {
          n.highlightAllUnder(document, e, t);
        },
        highlightAllUnder: function (e, t, r) {
          var a = {
            callback: r,
            selector:
              'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
          };
          n.hooks.run("before-highlightall", a);
          for (
            var l, i = a.elements || e.querySelectorAll(a.selector), o = 0;
            (l = i[o++]);

          )
            n.highlightElement(l, t === !0, a.callback);
        },
        highlightElement: function (t, r, a) {
          for (var l, i, o = t; o && !e.test(o.className); ) o = o.parentNode;
          o &&
            ((l = (o.className.match(e) || [, ""])[1].toLowerCase()),
            (i = n.languages[l])),
            (t.className =
              t.className.replace(e, "").replace(/\s+/g, " ") +
              " language-" +
              l),
            t.parentNode &&
              ((o = t.parentNode),
              /pre/i.test(o.nodeName) &&
                (o.className =
                  o.className.replace(e, "").replace(/\s+/g, " ") +
                  " language-" +
                  l));
          var s = t.textContent,
            g = { element: t, language: l, grammar: i, code: s };
          if ((n.hooks.run("before-sanity-check", g), !g.code || !g.grammar))
            return (
              g.code &&
                (n.hooks.run("before-highlight", g),
                (g.element.textContent = g.code),
                n.hooks.run("after-highlight", g)),
              n.hooks.run("complete", g),
              void 0
            );
          if ((n.hooks.run("before-highlight", g), r && _self.Worker)) {
            var u = new Worker(n.filename);
            (u.onmessage = function (e) {
              (g.highlightedCode = e.data),
                n.hooks.run("before-insert", g),
                (g.element.innerHTML = g.highlightedCode),
                a && a.call(g.element),
                n.hooks.run("after-highlight", g),
                n.hooks.run("complete", g);
            }),
              u.postMessage(
                JSON.stringify({
                  language: g.language,
                  code: g.code,
                  immediateClose: !0,
                })
              );
          } else
            (g.highlightedCode = n.highlight(g.code, g.grammar, g.language)),
              n.hooks.run("before-insert", g),
              (g.element.innerHTML = g.highlightedCode),
              a && a.call(t),
              n.hooks.run("after-highlight", g),
              n.hooks.run("complete", g);
        },
        highlight: function (e, t, a) {
          var l = n.tokenize(e, t);
          return r.stringify(n.util.encode(l), a);
        },
        matchGrammar: function (e, t, r, a, l, i, o) {
          var s = n.Token;
          for (var g in r)
            if (r.hasOwnProperty(g) && r[g]) {
              if (g == o) return;
              var u = r[g];
              u = "Array" === n.util.type(u) ? u : [u];
              for (var c = 0; c < u.length; ++c) {
                var h = u[c],
                  f = h.inside,
                  d = !!h.lookbehind,
                  m = !!h.greedy,
                  p = 0,
                  y = h.alias;
                if (m && !h.pattern.global) {
                  var v = h.pattern.toString().match(/[imuy]*$/)[0];
                  h.pattern = RegExp(h.pattern.source, v + "g");
                }
                h = h.pattern || h;
                for (var b = a, k = l; b < t.length; k += t[b].length, ++b) {
                  var w = t[b];
                  if (t.length > e.length) return;
                  if (!(w instanceof s)) {
                    h.lastIndex = 0;
                    var _ = h.exec(w),
                      P = 1;
                    if (!_ && m && b != t.length - 1) {
                      if (((h.lastIndex = k), (_ = h.exec(e)), !_)) break;
                      for (
                        var A = _.index + (d ? _[1].length : 0),
                          j = _.index + _[0].length,
                          x = b,
                          O = k,
                          N = t.length;
                        N > x && (j > O || (!t[x].type && !t[x - 1].greedy));
                        ++x
                      )
                        (O += t[x].length), A >= O && (++b, (k = O));
                      if (t[b] instanceof s || t[x - 1].greedy) continue;
                      (P = x - b), (w = e.slice(k, O)), (_.index -= k);
                    }
                    if (_) {
                      d && (p = _[1].length);
                      var A = _.index + p,
                        _ = _[0].slice(p),
                        j = A + _.length,
                        S = w.slice(0, A),
                        C = w.slice(j),
                        M = [b, P];
                      S && (++b, (k += S.length), M.push(S));
                      var E = new s(g, f ? n.tokenize(_, f) : _, y, _, m);
                      if (
                        (M.push(E),
                        C && M.push(C),
                        Array.prototype.splice.apply(t, M),
                        1 != P && n.matchGrammar(e, t, r, b, k, !0, g),
                        i)
                      )
                        break;
                    } else if (i) break;
                  }
                }
              }
            }
        },
        tokenize: function (e, t) {
          var r = [e],
            a = t.rest;
          if (a) {
            for (var l in a) t[l] = a[l];
            delete t.rest;
          }
          return n.matchGrammar(e, r, t, 0, 0, !1), r;
        },
        hooks: {
          all: {},
          add: function (e, t) {
            var r = n.hooks.all;
            (r[e] = r[e] || []), r[e].push(t);
          },
          run: function (e, t) {
            var r = n.hooks.all[e];
            if (r && r.length) for (var a, l = 0; (a = r[l++]); ) a(t);
          },
        },
      }),
      r = (n.Token = function (e, t, n, r, a) {
        (this.type = e),
          (this.content = t),
          (this.alias = n),
          (this.length = 0 | (r || "").length),
          (this.greedy = !!a);
      });
    if (
      ((r.stringify = function (e, t, a) {
        if ("string" == typeof e) return e;
        if ("Array" === n.util.type(e))
          return e
            .map(function (n) {
              return r.stringify(n, t, e);
            })
            .join("");
        var l = {
          type: e.type,
          content: r.stringify(e.content, t, a),
          tag: "span",
          classes: ["token", e.type],
          attributes: {},
          language: t,
          parent: a,
        };
        if (e.alias) {
          var i = "Array" === n.util.type(e.alias) ? e.alias : [e.alias];
          Array.prototype.push.apply(l.classes, i);
        }
        n.hooks.run("wrap", l);
        var o = Object.keys(l.attributes)
          .map(function (e) {
            return (
              e + '="' + (l.attributes[e] || "").replace(/"/g, "&quot;") + '"'
            );
          })
          .join(" ");
        return (
          "<" +
          l.tag +
          ' class="' +
          l.classes.join(" ") +
          '"' +
          (o ? " " + o : "") +
          ">" +
          l.content +
          "</" +
          l.tag +
          ">"
        );
      }),
      !_self.document)
    )
      return _self.addEventListener
        ? (n.disableWorkerMessageHandler ||
            _self.addEventListener(
              "message",
              function (e) {
                var t = JSON.parse(e.data),
                  r = t.language,
                  a = t.code,
                  l = t.immediateClose;
                _self.postMessage(n.highlight(a, n.languages[r], r)),
                  l && _self.close();
              },
              !1
            ),
          _self.Prism)
        : _self.Prism;
    var a =
      document.currentScript ||
      [].slice.call(document.getElementsByTagName("script")).pop();
    return (
      a &&
        ((n.filename = a.src),
        n.manual ||
          a.hasAttribute("data-manual") ||
          ("loading" !== document.readyState
            ? window.requestAnimationFrame
              ? window.requestAnimationFrame(n.highlightAll)
              : window.setTimeout(n.highlightAll, 16)
            : document.addEventListener("DOMContentLoaded", n.highlightAll))),
      _self.Prism
    );
  })();
"undefined" != typeof module && module.exports && (module.exports = Prism),
  "undefined" != typeof global && (global.Prism = Prism);
(Prism.languages.markup = {
  comment: /<!--[\s\S]*?-->/,
  prolog: /<\?[\s\S]+?\?>/,
  doctype: /<!DOCTYPE[\s\S]+?>/i,
  cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
  tag: {
    pattern:
      /<\/?(?!\d)[^\s>\/=$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i,
    inside: {
      tag: {
        pattern: /^<\/?[^\s>\/]+/i,
        inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ },
      },
      "attr-value": {
        pattern: /=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/i,
        inside: {
          punctuation: [/^=/, { pattern: /(^|[^\\])["']/, lookbehind: !0 }],
        },
      },
      punctuation: /\/?>/,
      "attr-name": {
        pattern: /[^\s>\/]+/,
        inside: { namespace: /^[^\s>\/:]+:/ },
      },
    },
  },
  entity: /&#?[\da-z]{1,8};/i,
}),
  (Prism.languages.markup.tag.inside["attr-value"].inside.entity =
    Prism.languages.markup.entity),
  Prism.hooks.add("wrap", function (a) {
    "entity" === a.type &&
      (a.attributes.title = a.content.replace(/&amp;/, "&"));
  }),
  (Prism.languages.xml = Prism.languages.markup),
  (Prism.languages.html = Prism.languages.markup),
  (Prism.languages.mathml = Prism.languages.markup),
  (Prism.languages.svg = Prism.languages.markup);
(Prism.languages.css = {
  comment: /\/\*[\s\S]*?\*\//,
  atrule: {
    pattern: /@[\w-]+?.*?(?:;|(?=\s*\{))/i,
    inside: { rule: /@[\w-]+/ },
  },
  url: /url\((?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
  selector: /[^{}\s][^{};]*?(?=\s*\{)/,
  string: {
    pattern: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: !0,
  },
  property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
  important: /\B!important\b/i,
  function: /[-a-z0-9]+(?=\()/i,
  punctuation: /[(){};:]/,
}),
  (Prism.languages.css.atrule.inside.rest = Prism.util.clone(
    Prism.languages.css
  )),
  Prism.languages.markup &&
    (Prism.languages.insertBefore("markup", "tag", {
      style: {
        pattern: /(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,
        lookbehind: !0,
        inside: Prism.languages.css,
        alias: "language-css",
        greedy: !0,
      },
    }),
    Prism.languages.insertBefore(
      "inside",
      "attr-value",
      {
        "style-attr": {
          pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
          inside: {
            "attr-name": {
              pattern: /^\s*style/i,
              inside: Prism.languages.markup.tag.inside,
            },
            punctuation: /^\s*=\s*['"]|['"]\s*$/,
            "attr-value": { pattern: /.+/i, inside: Prism.languages.css },
          },
          alias: "language-css",
        },
      },
      Prism.languages.markup.tag
    ));
Prism.languages.clike = {
  comment: [
    { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0 },
    { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0 },
  ],
  string: {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: !0,
  },
  "class-name": {
    pattern:
      /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
    lookbehind: !0,
    inside: { punctuation: /[.\\]/ },
  },
  keyword:
    /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
  boolean: /\b(?:true|false)\b/,
  function: /[a-z0-9_]+(?=\()/i,
  number: /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,
  operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
  punctuation: /[{}[\];(),.:]/,
};
(Prism.languages.javascript = Prism.languages.extend("clike", {
  keyword:
    /\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
  number:
    /\b-?(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+|\d*\.?\d+(?:[Ee][+-]?\d+)?|NaN|Infinity)\b/,
  function: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\()/i,
  operator:
    /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/,
})),
  Prism.languages.insertBefore("javascript", "keyword", {
    regex: {
      pattern:
        /(^|[^\/])\/(?!\/)(\[[^\]\r\n]+]|\\.|[^\/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
      lookbehind: !0,
      greedy: !0,
    },
    "function-variable": {
      pattern:
        /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=\s*(?:function\b|(?:\([^()]*\)|[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/i,
      alias: "function",
    },
  }),
  Prism.languages.insertBefore("javascript", "string", {
    "template-string": {
      pattern: /`(?:\\[\s\S]|[^\\`])*`/,
      greedy: !0,
      inside: {
        interpolation: {
          pattern: /\$\{[^}]+\}/,
          inside: {
            "interpolation-punctuation": {
              pattern: /^\$\{|\}$/,
              alias: "punctuation",
            },
            rest: Prism.languages.javascript,
          },
        },
        string: /[\s\S]+/,
      },
    },
  }),
  Prism.languages.markup &&
    Prism.languages.insertBefore("markup", "tag", {
      script: {
        pattern: /(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,
        lookbehind: !0,
        inside: Prism.languages.javascript,
        alias: "language-javascript",
        greedy: !0,
      },
    }),
  (Prism.languages.js = Prism.languages.javascript);
