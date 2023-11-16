"use strict";
function e(e, t) {
  return (
    t.forEach(function (t) {
      t &&
        "string" != typeof t &&
        !Array.isArray(t) &&
        Object.keys(t).forEach(function (n) {
          if ("default" !== n && !(n in e)) {
            var r = Object.getOwnPropertyDescriptor(t, n);
            Object.defineProperty(
              e,
              n,
              r.get
                ? r
                : {
                    enumerable: !0,
                    get: function () {
                      return t[n];
                    },
                  }
            );
          }
        });
    }),
    Object.freeze(e)
  );
}
var t = function (e, n) {
  return (
    (t =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function (e, t) {
          e.__proto__ = t;
        }) ||
      function (e, t) {
        for (var n in t)
          Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
      }),
    t(e, n)
  );
};
var n = function () {
  return (
    (n =
      Object.assign ||
      function (e) {
        for (var t, n = 1, r = arguments.length; n < r; n++)
          for (var o in (t = arguments[n]))
            Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
        return e;
      }),
    n.apply(this, arguments)
  );
};
function r(e, t, n, r) {
  return new (n || (n = Promise))(function (o, i) {
    function s(e) {
      try {
        c(r.next(e));
      } catch (e) {
        i(e);
      }
    }
    function a(e) {
      try {
        c(r.throw(e));
      } catch (e) {
        i(e);
      }
    }
    function c(e) {
      var t;
      e.done
        ? o(e.value)
        : ((t = e.value),
          t instanceof n
            ? t
            : new n(function (e) {
                e(t);
              })).then(s, a);
    }
    c((r = r.apply(e, t || [])).next());
  });
}
function o(e, t) {
  var n,
    r,
    o,
    i,
    s = {
      label: 0,
      sent: function () {
        if (1 & o[0]) throw o[1];
        return o[1];
      },
      trys: [],
      ops: [],
    };
  return (
    (i = { next: a(0), throw: a(1), return: a(2) }),
    "function" == typeof Symbol &&
      (i[Symbol.iterator] = function () {
        return this;
      }),
    i
  );
  function a(i) {
    return function (a) {
      return (function (i) {
        if (n) throw new TypeError("Generator is already executing.");
        for (; s; )
          try {
            if (
              ((n = 1),
              r &&
                (o =
                  2 & i[0]
                    ? r.return
                    : i[0]
                    ? r.throw || ((o = r.return) && o.call(r), 0)
                    : r.next) &&
                !(o = o.call(r, i[1])).done)
            )
              return o;
            switch (((r = 0), o && (i = [2 & i[0], o.value]), i[0])) {
              case 0:
              case 1:
                o = i;
                break;
              case 4:
                return s.label++, { value: i[1], done: !1 };
              case 5:
                s.label++, (r = i[1]), (i = [0]);
                continue;
              case 7:
                (i = s.ops.pop()), s.trys.pop();
                continue;
              default:
                if (
                  !((o = s.trys),
                  (o = o.length > 0 && o[o.length - 1]) ||
                    (6 !== i[0] && 2 !== i[0]))
                ) {
                  s = 0;
                  continue;
                }
                if (3 === i[0] && (!o || (i[1] > o[0] && i[1] < o[3]))) {
                  s.label = i[1];
                  break;
                }
                if (6 === i[0] && s.label < o[1]) {
                  (s.label = o[1]), (o = i);
                  break;
                }
                if (o && s.label < o[2]) {
                  (s.label = o[2]), s.ops.push(i);
                  break;
                }
                o[2] && s.ops.pop(), s.trys.pop();
                continue;
            }
            i = t.call(e, s);
          } catch (e) {
            (i = [6, e]), (r = 0);
          } finally {
            n = o = 0;
          }
        if (5 & i[0]) throw i[1];
        return { value: i[0] ? i[1] : void 0, done: !0 };
      })([i, a]);
    };
  }
}
"undefined" != typeof globalThis
  ? globalThis
  : "undefined" != typeof window
  ? window
  : "undefined" != typeof global
  ? global
  : "undefined" != typeof self && self;
function i(e, t, n) {
  return (
    e(
      (n = {
        path: t,
        exports: {},
        require: function (e, t) {
          return (function () {
            throw new Error(
              "Dynamic requires are not currently supported by @rollup/plugin-commonjs"
            );
          })(null == t && n.path);
        },
      }),
      n.exports
    ),
    n.exports
  );
}
var s = i(function (e, t) {
  e.exports = (function (e) {
    function t(r) {
      if (n[r]) return n[r].exports;
      var o = (n[r] = { exports: {}, id: r, loaded: !1 });
      return e[r].call(o.exports, o, o.exports, t), (o.loaded = !0), o.exports;
    }
    var n = {};
    return (t.m = e), (t.c = n), (t.p = ""), t(0);
  })([
    function (e, t, n) {
      function r(e, t) {
        "object" == typeof e && ((t = e), (e = void 0)), (t = t || {});
        var n,
          r = o(e),
          i = r.source,
          d = r.id,
          u = r.path,
          p = c[d] && u in c[d].nsps;
        return (
          t.forceNew || t["force new connection"] || !1 === t.multiplex || p
            ? (a("ignoring socket cache for %s", i), (n = s(i, t)))
            : (c[d] || (a("new io instance for %s", i), (c[d] = s(i, t))),
              (n = c[d])),
          r.query && !t.query && (t.query = r.query),
          n.socket(r.path, t)
        );
      }
      var o = n(1),
        i = n(7),
        s = n(15),
        a = n(3)("socket.io-client");
      e.exports = t = r;
      var c = (t.managers = {});
      (t.protocol = i.protocol),
        (t.connect = r),
        (t.Manager = n(15)),
        (t.Socket = n(39));
    },
    function (e, t, n) {
      function r(e, t) {
        var n = e;
        (t = t || ("undefined" != typeof location && location)),
          null == e && (e = t.protocol + "//" + t.host),
          "string" == typeof e &&
            ("/" === e.charAt(0) &&
              (e = "/" === e.charAt(1) ? t.protocol + e : t.host + e),
            /^(https?|wss?):\/\//.test(e) ||
              (i("protocol-less url %s", e),
              (e = void 0 !== t ? t.protocol + "//" + e : "https://" + e)),
            i("parse %s", e),
            (n = o(e))),
          n.port ||
            (/^(http|ws)$/.test(n.protocol)
              ? (n.port = "80")
              : /^(http|ws)s$/.test(n.protocol) && (n.port = "443")),
          (n.path = n.path || "/");
        var r = -1 !== n.host.indexOf(":") ? "[" + n.host + "]" : n.host;
        return (
          (n.id = n.protocol + "://" + r + ":" + n.port),
          (n.href =
            n.protocol +
            "://" +
            r +
            (t && t.port === n.port ? "" : ":" + n.port)),
          n
        );
      }
      var o = n(2),
        i = n(3)("socket.io-client:url");
      e.exports = r;
    },
    function (e, t) {
      var n =
          /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
        r = [
          "source",
          "protocol",
          "authority",
          "userInfo",
          "user",
          "password",
          "host",
          "port",
          "relative",
          "path",
          "directory",
          "file",
          "query",
          "anchor",
        ];
      e.exports = function (e) {
        var t = e,
          o = e.indexOf("["),
          i = e.indexOf("]");
        -1 != o &&
          -1 != i &&
          (e =
            e.substring(0, o) +
            e.substring(o, i).replace(/:/g, ";") +
            e.substring(i, e.length));
        for (var s = n.exec(e || ""), a = {}, c = 14; c--; )
          a[r[c]] = s[c] || "";
        return (
          -1 != o &&
            -1 != i &&
            ((a.source = t),
            (a.host = a.host
              .substring(1, a.host.length - 1)
              .replace(/;/g, ":")),
            (a.authority = a.authority
              .replace("[", "")
              .replace("]", "")
              .replace(/;/g, ":")),
            (a.ipv6uri = !0)),
          a
        );
      };
    },
    function (e, t, n) {
      (function (r) {
        function o() {
          return (
            !(
              "undefined" == typeof window ||
              !window.process ||
              ("renderer" !== window.process.type && !window.process.__nwjs)
            ) ||
            (("undefined" == typeof navigator ||
              !navigator.userAgent ||
              !navigator.userAgent
                .toLowerCase()
                .match(/(edge|trident)\/(\d+)/)) &&
              (("undefined" != typeof document &&
                document.documentElement &&
                document.documentElement.style &&
                document.documentElement.style.WebkitAppearance) ||
                ("undefined" != typeof window &&
                  window.console &&
                  (window.console.firebug ||
                    (window.console.exception && window.console.table))) ||
                ("undefined" != typeof navigator &&
                  navigator.userAgent &&
                  navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
                  parseInt(RegExp.$1, 10) >= 31) ||
                ("undefined" != typeof navigator &&
                  navigator.userAgent &&
                  navigator.userAgent
                    .toLowerCase()
                    .match(/applewebkit\/(\d+)/))))
          );
        }
        function i(t) {
          if (
            ((t[0] =
              (this.useColors ? "%c" : "") +
              this.namespace +
              (this.useColors ? " %c" : " ") +
              t[0] +
              (this.useColors ? "%c " : " ") +
              "+" +
              e.exports.humanize(this.diff)),
            this.useColors)
          ) {
            var n = "color: " + this.color;
            t.splice(1, 0, n, "color: inherit");
            var r = 0,
              o = 0;
            t[0].replace(/%[a-zA-Z%]/g, function (e) {
              "%%" !== e && (r++, "%c" === e && (o = r));
            }),
              t.splice(o, 0, n);
          }
        }
        function s() {
          var e;
          return (
            "object" ===
              ("undefined" == typeof console ? "undefined" : u(console)) &&
            console.log &&
            (e = console).log.apply(e, arguments)
          );
        }
        function a(e) {
          try {
            e ? t.storage.setItem("debug", e) : t.storage.removeItem("debug");
          } catch (e) {}
        }
        function c() {
          var e = void 0;
          try {
            e = t.storage.getItem("debug");
          } catch (e) {}
          return !e && void 0 !== r && "env" in r && (e = r.env.DEBUG), e;
        }
        function d() {
          try {
            return localStorage;
          } catch (e) {}
        }
        var u =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              };
        (t.log = s),
          (t.formatArgs = i),
          (t.save = a),
          (t.load = c),
          (t.useColors = o),
          (t.storage = d()),
          (t.colors = [
            "#0000CC",
            "#0000FF",
            "#0033CC",
            "#0033FF",
            "#0066CC",
            "#0066FF",
            "#0099CC",
            "#0099FF",
            "#00CC00",
            "#00CC33",
            "#00CC66",
            "#00CC99",
            "#00CCCC",
            "#00CCFF",
            "#3300CC",
            "#3300FF",
            "#3333CC",
            "#3333FF",
            "#3366CC",
            "#3366FF",
            "#3399CC",
            "#3399FF",
            "#33CC00",
            "#33CC33",
            "#33CC66",
            "#33CC99",
            "#33CCCC",
            "#33CCFF",
            "#6600CC",
            "#6600FF",
            "#6633CC",
            "#6633FF",
            "#66CC00",
            "#66CC33",
            "#9900CC",
            "#9900FF",
            "#9933CC",
            "#9933FF",
            "#99CC00",
            "#99CC33",
            "#CC0000",
            "#CC0033",
            "#CC0066",
            "#CC0099",
            "#CC00CC",
            "#CC00FF",
            "#CC3300",
            "#CC3333",
            "#CC3366",
            "#CC3399",
            "#CC33CC",
            "#CC33FF",
            "#CC6600",
            "#CC6633",
            "#CC9900",
            "#CC9933",
            "#CCCC00",
            "#CCCC33",
            "#FF0000",
            "#FF0033",
            "#FF0066",
            "#FF0099",
            "#FF00CC",
            "#FF00FF",
            "#FF3300",
            "#FF3333",
            "#FF3366",
            "#FF3399",
            "#FF33CC",
            "#FF33FF",
            "#FF6600",
            "#FF6633",
            "#FF9900",
            "#FF9933",
            "#FFCC00",
            "#FFCC33",
          ]),
          (e.exports = n(5)(t)),
          (e.exports.formatters.j = function (e) {
            try {
              return JSON.stringify(e);
            } catch (e) {
              return "[UnexpectedJSONParseError]: " + e.message;
            }
          });
      }).call(t, n(4));
    },
    function (e, t) {
      function n() {
        throw new Error("setTimeout has not been defined");
      }
      function r() {
        throw new Error("clearTimeout has not been defined");
      }
      function o(e) {
        if (u === setTimeout) return setTimeout(e, 0);
        if ((u === n || !u) && setTimeout)
          return (u = setTimeout), setTimeout(e, 0);
        try {
          return u(e, 0);
        } catch (t) {
          try {
            return u.call(null, e, 0);
          } catch (t) {
            return u.call(this, e, 0);
          }
        }
      }
      function i(e) {
        if (p === clearTimeout) return clearTimeout(e);
        if ((p === r || !p) && clearTimeout)
          return (p = clearTimeout), clearTimeout(e);
        try {
          return p(e);
        } catch (t) {
          try {
            return p.call(null, e);
          } catch (t) {
            return p.call(this, e);
          }
        }
      }
      function s() {
        m &&
          h &&
          ((m = !1), h.length ? (f = h.concat(f)) : (g = -1), f.length && a());
      }
      function a() {
        if (!m) {
          var e = o(s);
          m = !0;
          for (var t = f.length; t; ) {
            for (h = f, f = []; ++g < t; ) h && h[g].run();
            (g = -1), (t = f.length);
          }
          (h = null), (m = !1), i(e);
        }
      }
      function c(e, t) {
        (this.fun = e), (this.array = t);
      }
      function d() {}
      var u,
        p,
        l = (e.exports = {});
      !(function () {
        try {
          u = "function" == typeof setTimeout ? setTimeout : n;
        } catch (e) {
          u = n;
        }
        try {
          p = "function" == typeof clearTimeout ? clearTimeout : r;
        } catch (e) {
          p = r;
        }
      })();
      var h,
        f = [],
        m = !1,
        g = -1;
      (l.nextTick = function (e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1)
          for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
        f.push(new c(e, t)), 1 !== f.length || m || o(a);
      }),
        (c.prototype.run = function () {
          this.fun.apply(null, this.array);
        }),
        (l.title = "browser"),
        (l.browser = !0),
        (l.env = {}),
        (l.argv = []),
        (l.version = ""),
        (l.versions = {}),
        (l.on = d),
        (l.addListener = d),
        (l.once = d),
        (l.off = d),
        (l.removeListener = d),
        (l.removeAllListeners = d),
        (l.emit = d),
        (l.prependListener = d),
        (l.prependOnceListener = d),
        (l.listeners = function (e) {
          return [];
        }),
        (l.binding = function (e) {
          throw new Error("process.binding is not supported");
        }),
        (l.cwd = function () {
          return "/";
        }),
        (l.chdir = function (e) {
          throw new Error("process.chdir is not supported");
        }),
        (l.umask = function () {
          return 0;
        });
    },
    function (e, t, n) {
      function r(e) {
        if (Array.isArray(e)) {
          for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
          return n;
        }
        return Array.from(e);
      }
      function o(e) {
        function t(e) {
          for (var t = 0, n = 0; n < e.length; n++)
            (t = (t << 5) - t + e.charCodeAt(n)), (t |= 0);
          return o.colors[Math.abs(t) % o.colors.length];
        }
        function o(e) {
          function n() {
            for (var e = arguments.length, t = Array(e), i = 0; i < e; i++)
              t[i] = arguments[i];
            if (n.enabled) {
              var s = n,
                a = Number(new Date()),
                c = a - (r || a);
              (s.diff = c),
                (s.prev = r),
                (s.curr = a),
                (r = a),
                (t[0] = o.coerce(t[0])),
                "string" != typeof t[0] && t.unshift("%O");
              var d = 0;
              (t[0] = t[0].replace(/%([a-zA-Z%])/g, function (e, n) {
                if ("%%" === e) return e;
                d++;
                var r = o.formatters[n];
                if ("function" == typeof r) {
                  var i = t[d];
                  (e = r.call(s, i)), t.splice(d, 1), d--;
                }
                return e;
              })),
                o.formatArgs.call(s, t),
                (s.log || o.log).apply(s, t);
            }
          }
          var r = void 0;
          return (
            (n.namespace = e),
            (n.enabled = o.enabled(e)),
            (n.useColors = o.useColors()),
            (n.color = t(e)),
            (n.destroy = i),
            (n.extend = s),
            "function" == typeof o.init && o.init(n),
            o.instances.push(n),
            n
          );
        }
        function i() {
          var e = o.instances.indexOf(this);
          return -1 !== e && (o.instances.splice(e, 1), !0);
        }
        function s(e, t) {
          var n = o(this.namespace + (void 0 === t ? ":" : t) + e);
          return (n.log = this.log), n;
        }
        function a(e) {
          o.save(e), (o.names = []), (o.skips = []);
          var t = void 0,
            n = ("string" == typeof e ? e : "").split(/[\s,]+/),
            r = n.length;
          for (t = 0; t < r; t++)
            n[t] &&
              ("-" === (e = n[t].replace(/\*/g, ".*?"))[0]
                ? o.skips.push(new RegExp("^" + e.substr(1) + "$"))
                : o.names.push(new RegExp("^" + e + "$")));
          for (t = 0; t < o.instances.length; t++) {
            var i = o.instances[t];
            i.enabled = o.enabled(i.namespace);
          }
        }
        function c() {
          var e = []
            .concat(
              r(o.names.map(u)),
              r(
                o.skips.map(u).map(function (e) {
                  return "-" + e;
                })
              )
            )
            .join(",");
          return o.enable(""), e;
        }
        function d(e) {
          if ("*" === e[e.length - 1]) return !0;
          var t = void 0,
            n = void 0;
          for (t = 0, n = o.skips.length; t < n; t++)
            if (o.skips[t].test(e)) return !1;
          for (t = 0, n = o.names.length; t < n; t++)
            if (o.names[t].test(e)) return !0;
          return !1;
        }
        function u(e) {
          return e
            .toString()
            .substring(2, e.toString().length - 2)
            .replace(/\.\*\?$/, "*");
        }
        function p(e) {
          return e instanceof Error ? e.stack || e.message : e;
        }
        return (
          (o.debug = o),
          (o.default = o),
          (o.coerce = p),
          (o.disable = c),
          (o.enable = a),
          (o.enabled = d),
          (o.humanize = n(6)),
          Object.keys(e).forEach(function (t) {
            o[t] = e[t];
          }),
          (o.instances = []),
          (o.names = []),
          (o.skips = []),
          (o.formatters = {}),
          (o.selectColor = t),
          o.enable(o.load()),
          o
        );
      }
      e.exports = o;
    },
    function (e, t) {
      function n(e) {
        if (!((e = String(e)).length > 100)) {
          var t =
            /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
              e
            );
          if (t) {
            var n = parseFloat(t[1]);
            switch ((t[2] || "ms").toLowerCase()) {
              case "years":
              case "year":
              case "yrs":
              case "yr":
              case "y":
                return n * p;
              case "weeks":
              case "week":
              case "w":
                return n * u;
              case "days":
              case "day":
              case "d":
                return n * d;
              case "hours":
              case "hour":
              case "hrs":
              case "hr":
              case "h":
                return n * c;
              case "minutes":
              case "minute":
              case "mins":
              case "min":
              case "m":
                return n * a;
              case "seconds":
              case "second":
              case "secs":
              case "sec":
              case "s":
                return n * s;
              case "milliseconds":
              case "millisecond":
              case "msecs":
              case "msec":
              case "ms":
                return n;
              default:
                return;
            }
          }
        }
      }
      function r(e) {
        var t = Math.abs(e);
        return t >= d
          ? Math.round(e / d) + "d"
          : t >= c
          ? Math.round(e / c) + "h"
          : t >= a
          ? Math.round(e / a) + "m"
          : t >= s
          ? Math.round(e / s) + "s"
          : e + "ms";
      }
      function o(e) {
        var t = Math.abs(e);
        return t >= d
          ? i(e, t, d, "day")
          : t >= c
          ? i(e, t, c, "hour")
          : t >= a
          ? i(e, t, a, "minute")
          : t >= s
          ? i(e, t, s, "second")
          : e + " ms";
      }
      function i(e, t, n, r) {
        var o = t >= 1.5 * n;
        return Math.round(e / n) + " " + r + (o ? "s" : "");
      }
      var s = 1e3,
        a = 60 * s,
        c = 60 * a,
        d = 24 * c,
        u = 7 * d,
        p = 365.25 * d;
      e.exports = function (e, t) {
        t = t || {};
        var i = typeof e;
        if ("string" === i && e.length > 0) return n(e);
        if ("number" === i && isFinite(e)) return t.long ? o(e) : r(e);
        throw new Error(
          "val is not a non-empty string or a valid number. val=" +
            JSON.stringify(e)
        );
      };
    },
    function (e, t, n) {
      function r() {}
      function o(e) {
        var n = "" + e.type;
        if (
          ((t.BINARY_EVENT !== e.type && t.BINARY_ACK !== e.type) ||
            (n += e.attachments + "-"),
          e.nsp && "/" !== e.nsp && (n += e.nsp + ","),
          null != e.id && (n += e.id),
          null != e.data)
        ) {
          var r = i(e.data);
          if (!1 === r) return v;
          n += r;
        }
        return l("encoded %j as %s", e, n), n;
      }
      function i(e) {
        try {
          return JSON.stringify(e);
        } catch (e) {
          return !1;
        }
      }
      function s(e, t) {
        function n(e) {
          var n = f.deconstructPacket(e),
            r = o(n.packet),
            i = n.buffers;
          i.unshift(r), t(i);
        }
        f.removeBlobs(e, n);
      }
      function a() {
        this.reconstructor = null;
      }
      function c(e) {
        var n = 0,
          r = { type: Number(e.charAt(0)) };
        if (null == t.types[r.type]) return p("unknown packet type " + r.type);
        if (t.BINARY_EVENT === r.type || t.BINARY_ACK === r.type) {
          for (
            var o = "";
            "-" !== e.charAt(++n) && ((o += e.charAt(n)), n != e.length);

          );
          if (o != Number(o) || "-" !== e.charAt(n))
            throw new Error("Illegal attachments");
          r.attachments = Number(o);
        }
        if ("/" === e.charAt(n + 1))
          for (
            r.nsp = "";
            ++n && "," !== (s = e.charAt(n)) && ((r.nsp += s), n !== e.length);

          );
        else r.nsp = "/";
        var i = e.charAt(n + 1);
        if ("" !== i && Number(i) == i) {
          for (r.id = ""; ++n; ) {
            var s;
            if (null == (s = e.charAt(n)) || Number(s) != s) {
              --n;
              break;
            }
            if (((r.id += e.charAt(n)), n === e.length)) break;
          }
          r.id = Number(r.id);
        }
        if (e.charAt(++n)) {
          var a = d(e.substr(n));
          if (!1 === a || (r.type !== t.ERROR && !m(a)))
            return p("invalid payload");
          r.data = a;
        }
        return l("decoded %s as %j", e, r), r;
      }
      function d(e) {
        try {
          return JSON.parse(e);
        } catch (e) {
          return !1;
        }
      }
      function u(e) {
        (this.reconPack = e), (this.buffers = []);
      }
      function p(e) {
        return { type: t.ERROR, data: "parser error: " + e };
      }
      var l = n(8)("socket.io-parser"),
        h = n(11),
        f = n(12),
        m = n(13),
        g = n(14);
      (t.protocol = 4),
        (t.types = [
          "CONNECT",
          "DISCONNECT",
          "EVENT",
          "ACK",
          "ERROR",
          "BINARY_EVENT",
          "BINARY_ACK",
        ]),
        (t.CONNECT = 0),
        (t.DISCONNECT = 1),
        (t.EVENT = 2),
        (t.ACK = 3),
        (t.ERROR = 4),
        (t.BINARY_EVENT = 5),
        (t.BINARY_ACK = 6),
        (t.Encoder = r),
        (t.Decoder = a);
      var v = t.ERROR + '"encode error"';
      (r.prototype.encode = function (e, n) {
        l("encoding packet %j", e),
          t.BINARY_EVENT === e.type || t.BINARY_ACK === e.type
            ? s(e, n)
            : n([o(e)]);
      }),
        h(a.prototype),
        (a.prototype.add = function (e) {
          var n;
          if ("string" == typeof e)
            (n = c(e)),
              t.BINARY_EVENT === n.type || t.BINARY_ACK === n.type
                ? ((this.reconstructor = new u(n)),
                  0 === this.reconstructor.reconPack.attachments &&
                    this.emit("decoded", n))
                : this.emit("decoded", n);
          else {
            if (!g(e) && !e.base64) throw new Error("Unknown type: " + e);
            if (!this.reconstructor)
              throw new Error(
                "got binary data when not reconstructing a packet"
              );
            (n = this.reconstructor.takeBinaryData(e)) &&
              ((this.reconstructor = null), this.emit("decoded", n));
          }
        }),
        (a.prototype.destroy = function () {
          this.reconstructor && this.reconstructor.finishedReconstruction();
        }),
        (u.prototype.takeBinaryData = function (e) {
          if (
            (this.buffers.push(e),
            this.buffers.length === this.reconPack.attachments)
          ) {
            var t = f.reconstructPacket(this.reconPack, this.buffers);
            return this.finishedReconstruction(), t;
          }
          return null;
        }),
        (u.prototype.finishedReconstruction = function () {
          (this.reconPack = null), (this.buffers = []);
        });
    },
    function (e, t, n) {
      (function (r) {
        function o() {
          return (
            !(
              "undefined" == typeof window ||
              !window.process ||
              "renderer" !== window.process.type
            ) ||
            (("undefined" == typeof navigator ||
              !navigator.userAgent ||
              !navigator.userAgent
                .toLowerCase()
                .match(/(edge|trident)\/(\d+)/)) &&
              (("undefined" != typeof document &&
                document.documentElement &&
                document.documentElement.style &&
                document.documentElement.style.WebkitAppearance) ||
                ("undefined" != typeof window &&
                  window.console &&
                  (window.console.firebug ||
                    (window.console.exception && window.console.table))) ||
                ("undefined" != typeof navigator &&
                  navigator.userAgent &&
                  navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
                  parseInt(RegExp.$1, 10) >= 31) ||
                ("undefined" != typeof navigator &&
                  navigator.userAgent &&
                  navigator.userAgent
                    .toLowerCase()
                    .match(/applewebkit\/(\d+)/))))
          );
        }
        function i(e) {
          var n = this.useColors;
          if (
            ((e[0] =
              (n ? "%c" : "") +
              this.namespace +
              (n ? " %c" : " ") +
              e[0] +
              (n ? "%c " : " ") +
              "+" +
              t.humanize(this.diff)),
            n)
          ) {
            var r = "color: " + this.color;
            e.splice(1, 0, r, "color: inherit");
            var o = 0,
              i = 0;
            e[0].replace(/%[a-zA-Z%]/g, function (e) {
              "%%" !== e && (o++, "%c" === e && (i = o));
            }),
              e.splice(i, 0, r);
          }
        }
        function s() {
          return (
            "object" ===
              ("undefined" == typeof console ? "undefined" : u(console)) &&
            console.log &&
            Function.prototype.apply.call(console.log, console, arguments)
          );
        }
        function a(e) {
          try {
            null == e ? t.storage.removeItem("debug") : (t.storage.debug = e);
          } catch (e) {}
        }
        function c() {
          var e;
          try {
            e = t.storage.debug;
          } catch (e) {}
          return !e && void 0 !== r && "env" in r && (e = r.env.DEBUG), e;
        }
        function d() {
          try {
            return window.localStorage;
          } catch (e) {}
        }
        var u =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              };
        ((t = e.exports = n(9)).log = s),
          (t.formatArgs = i),
          (t.save = a),
          (t.load = c),
          (t.useColors = o),
          (t.storage =
            "undefined" != typeof chrome && void 0 !== chrome.storage
              ? chrome.storage.local
              : d()),
          (t.colors = [
            "#0000CC",
            "#0000FF",
            "#0033CC",
            "#0033FF",
            "#0066CC",
            "#0066FF",
            "#0099CC",
            "#0099FF",
            "#00CC00",
            "#00CC33",
            "#00CC66",
            "#00CC99",
            "#00CCCC",
            "#00CCFF",
            "#3300CC",
            "#3300FF",
            "#3333CC",
            "#3333FF",
            "#3366CC",
            "#3366FF",
            "#3399CC",
            "#3399FF",
            "#33CC00",
            "#33CC33",
            "#33CC66",
            "#33CC99",
            "#33CCCC",
            "#33CCFF",
            "#6600CC",
            "#6600FF",
            "#6633CC",
            "#6633FF",
            "#66CC00",
            "#66CC33",
            "#9900CC",
            "#9900FF",
            "#9933CC",
            "#9933FF",
            "#99CC00",
            "#99CC33",
            "#CC0000",
            "#CC0033",
            "#CC0066",
            "#CC0099",
            "#CC00CC",
            "#CC00FF",
            "#CC3300",
            "#CC3333",
            "#CC3366",
            "#CC3399",
            "#CC33CC",
            "#CC33FF",
            "#CC6600",
            "#CC6633",
            "#CC9900",
            "#CC9933",
            "#CCCC00",
            "#CCCC33",
            "#FF0000",
            "#FF0033",
            "#FF0066",
            "#FF0099",
            "#FF00CC",
            "#FF00FF",
            "#FF3300",
            "#FF3333",
            "#FF3366",
            "#FF3399",
            "#FF33CC",
            "#FF33FF",
            "#FF6600",
            "#FF6633",
            "#FF9900",
            "#FF9933",
            "#FFCC00",
            "#FFCC33",
          ]),
          (t.formatters.j = function (e) {
            try {
              return JSON.stringify(e);
            } catch (e) {
              return "[UnexpectedJSONParseError]: " + e.message;
            }
          }),
          t.enable(c());
      }).call(t, n(4));
    },
    function (e, t, n) {
      function r(e) {
        var n,
          r = 0;
        for (n in e) (r = (r << 5) - r + e.charCodeAt(n)), (r |= 0);
        return t.colors[Math.abs(r) % t.colors.length];
      }
      function o(e) {
        function n() {
          if (n.enabled) {
            var e = n,
              r = +new Date(),
              i = r - (o || r);
            (e.diff = i), (e.prev = o), (e.curr = r), (o = r);
            for (var s = new Array(arguments.length), a = 0; a < s.length; a++)
              s[a] = arguments[a];
            (s[0] = t.coerce(s[0])), "string" != typeof s[0] && s.unshift("%O");
            var c = 0;
            (s[0] = s[0].replace(/%([a-zA-Z%])/g, function (n, r) {
              if ("%%" === n) return n;
              c++;
              var o = t.formatters[r];
              if ("function" == typeof o) {
                var i = s[c];
                (n = o.call(e, i)), s.splice(c, 1), c--;
              }
              return n;
            })),
              t.formatArgs.call(e, s),
              (n.log || t.log || console.log.bind(console)).apply(e, s);
          }
        }
        var o;
        return (
          (n.namespace = e),
          (n.enabled = t.enabled(e)),
          (n.useColors = t.useColors()),
          (n.color = r(e)),
          (n.destroy = i),
          "function" == typeof t.init && t.init(n),
          t.instances.push(n),
          n
        );
      }
      function i() {
        var e = t.instances.indexOf(this);
        return -1 !== e && (t.instances.splice(e, 1), !0);
      }
      function s(e) {
        t.save(e), (t.names = []), (t.skips = []);
        var n,
          r = ("string" == typeof e ? e : "").split(/[\s,]+/),
          o = r.length;
        for (n = 0; n < o; n++)
          r[n] &&
            ("-" === (e = r[n].replace(/\*/g, ".*?"))[0]
              ? t.skips.push(new RegExp("^" + e.substr(1) + "$"))
              : t.names.push(new RegExp("^" + e + "$")));
        for (n = 0; n < t.instances.length; n++) {
          var i = t.instances[n];
          i.enabled = t.enabled(i.namespace);
        }
      }
      function a() {
        t.enable("");
      }
      function c(e) {
        if ("*" === e[e.length - 1]) return !0;
        var n, r;
        for (n = 0, r = t.skips.length; n < r; n++)
          if (t.skips[n].test(e)) return !1;
        for (n = 0, r = t.names.length; n < r; n++)
          if (t.names[n].test(e)) return !0;
        return !1;
      }
      function d(e) {
        return e instanceof Error ? e.stack || e.message : e;
      }
      ((t = e.exports = o.debug = o.default = o).coerce = d),
        (t.disable = a),
        (t.enable = s),
        (t.enabled = c),
        (t.humanize = n(10)),
        (t.instances = []),
        (t.names = []),
        (t.skips = []),
        (t.formatters = {});
    },
    function (e, t) {
      function n(e) {
        if (!((e = String(e)).length > 100)) {
          var t =
            /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
              e
            );
          if (t) {
            var n = parseFloat(t[1]);
            switch ((t[2] || "ms").toLowerCase()) {
              case "years":
              case "year":
              case "yrs":
              case "yr":
              case "y":
                return n * u;
              case "days":
              case "day":
              case "d":
                return n * d;
              case "hours":
              case "hour":
              case "hrs":
              case "hr":
              case "h":
                return n * c;
              case "minutes":
              case "minute":
              case "mins":
              case "min":
              case "m":
                return n * a;
              case "seconds":
              case "second":
              case "secs":
              case "sec":
              case "s":
                return n * s;
              case "milliseconds":
              case "millisecond":
              case "msecs":
              case "msec":
              case "ms":
                return n;
              default:
                return;
            }
          }
        }
      }
      function r(e) {
        return e >= d
          ? Math.round(e / d) + "d"
          : e >= c
          ? Math.round(e / c) + "h"
          : e >= a
          ? Math.round(e / a) + "m"
          : e >= s
          ? Math.round(e / s) + "s"
          : e + "ms";
      }
      function o(e) {
        return (
          i(e, d, "day") ||
          i(e, c, "hour") ||
          i(e, a, "minute") ||
          i(e, s, "second") ||
          e + " ms"
        );
      }
      function i(e, t, n) {
        if (!(e < t))
          return e < 1.5 * t
            ? Math.floor(e / t) + " " + n
            : Math.ceil(e / t) + " " + n + "s";
      }
      var s = 1e3,
        a = 60 * s,
        c = 60 * a,
        d = 24 * c,
        u = 365.25 * d;
      e.exports = function (e, t) {
        t = t || {};
        var i = typeof e;
        if ("string" === i && e.length > 0) return n(e);
        if ("number" === i && !1 === isNaN(e)) return t.long ? o(e) : r(e);
        throw new Error(
          "val is not a non-empty string or a valid number. val=" +
            JSON.stringify(e)
        );
      };
    },
    function (e, t, n) {
      function r(e) {
        if (e) return o(e);
      }
      function o(e) {
        for (var t in r.prototype) e[t] = r.prototype[t];
        return e;
      }
      (e.exports = r),
        (r.prototype.on = r.prototype.addEventListener =
          function (e, t) {
            return (
              (this._callbacks = this._callbacks || {}),
              (this._callbacks["$" + e] = this._callbacks["$" + e] || []).push(
                t
              ),
              this
            );
          }),
        (r.prototype.once = function (e, t) {
          function n() {
            this.off(e, n), t.apply(this, arguments);
          }
          return (n.fn = t), this.on(e, n), this;
        }),
        (r.prototype.off =
          r.prototype.removeListener =
          r.prototype.removeAllListeners =
          r.prototype.removeEventListener =
            function (e, t) {
              if (
                ((this._callbacks = this._callbacks || {}),
                0 == arguments.length)
              )
                return (this._callbacks = {}), this;
              var n = this._callbacks["$" + e];
              if (!n) return this;
              if (1 == arguments.length)
                return delete this._callbacks["$" + e], this;
              for (var r, o = 0; o < n.length; o++)
                if ((r = n[o]) === t || r.fn === t) {
                  n.splice(o, 1);
                  break;
                }
              return this;
            }),
        (r.prototype.emit = function (e) {
          this._callbacks = this._callbacks || {};
          var t = [].slice.call(arguments, 1),
            n = this._callbacks["$" + e];
          if (n)
            for (var r = 0, o = (n = n.slice(0)).length; r < o; ++r)
              n[r].apply(this, t);
          return this;
        }),
        (r.prototype.listeners = function (e) {
          return (
            (this._callbacks = this._callbacks || {}),
            this._callbacks["$" + e] || []
          );
        }),
        (r.prototype.hasListeners = function (e) {
          return !!this.listeners(e).length;
        });
    },
    function (e, t, n) {
      function r(e, t) {
        if (!e) return e;
        if (s(e)) {
          var n = { _placeholder: !0, num: t.length };
          return t.push(e), n;
        }
        if (i(e)) {
          for (var o = new Array(e.length), a = 0; a < e.length; a++)
            o[a] = r(e[a], t);
          return o;
        }
        if ("object" == typeof e && !(e instanceof Date)) {
          for (var c in ((o = {}), e)) o[c] = r(e[c], t);
          return o;
        }
        return e;
      }
      function o(e, t) {
        if (!e) return e;
        if (e && e._placeholder) return t[e.num];
        if (i(e)) for (var n = 0; n < e.length; n++) e[n] = o(e[n], t);
        else if ("object" == typeof e) for (var r in e) e[r] = o(e[r], t);
        return e;
      }
      var i = n(13),
        s = n(14),
        a = Object.prototype.toString,
        c =
          "function" == typeof Blob ||
          ("undefined" != typeof Blob &&
            "[object BlobConstructor]" === a.call(Blob)),
        d =
          "function" == typeof File ||
          ("undefined" != typeof File &&
            "[object FileConstructor]" === a.call(File));
      (t.deconstructPacket = function (e) {
        var t = [],
          n = e.data,
          o = e;
        return (
          (o.data = r(n, t)),
          (o.attachments = t.length),
          { packet: o, buffers: t }
        );
      }),
        (t.reconstructPacket = function (e, t) {
          return (e.data = o(e.data, t)), (e.attachments = void 0), e;
        }),
        (t.removeBlobs = function (e, t) {
          function n(e, a, u) {
            if (!e) return e;
            if ((c && e instanceof Blob) || (d && e instanceof File)) {
              r++;
              var p = new FileReader();
              (p.onload = function () {
                u ? (u[a] = this.result) : (o = this.result), --r || t(o);
              }),
                p.readAsArrayBuffer(e);
            } else if (i(e)) for (var l = 0; l < e.length; l++) n(e[l], l, e);
            else if ("object" == typeof e && !s(e))
              for (var h in e) n(e[h], h, e);
          }
          var r = 0,
            o = e;
          n(o), r || t(o);
        });
    },
    function (e, t) {
      var n = {}.toString;
      e.exports =
        Array.isArray ||
        function (e) {
          return "[object Array]" == n.call(e);
        };
    },
    function (e, t) {
      function n(e) {
        return (
          (r && Buffer.isBuffer(e)) || (o && (e instanceof ArrayBuffer || i(e)))
        );
      }
      e.exports = n;
      var r =
          "function" == typeof Buffer && "function" == typeof Buffer.isBuffer,
        o = "function" == typeof ArrayBuffer,
        i = function (e) {
          return "function" == typeof ArrayBuffer.isView
            ? ArrayBuffer.isView(e)
            : e.buffer instanceof ArrayBuffer;
        };
    },
    function (e, t, n) {
      function r(e, t) {
        if (!(this instanceof r)) return new r(e, t);
        e && "object" == typeof e && ((t = e), (e = void 0)),
          ((t = t || {}).path = t.path || "/socket.io"),
          (this.nsps = {}),
          (this.subs = []),
          (this.opts = t),
          this.reconnection(!1 !== t.reconnection),
          this.reconnectionAttempts(t.reconnectionAttempts || 1 / 0),
          this.reconnectionDelay(t.reconnectionDelay || 1e3),
          this.reconnectionDelayMax(t.reconnectionDelayMax || 5e3),
          this.randomizationFactor(t.randomizationFactor || 0.5),
          (this.backoff = new l({
            min: this.reconnectionDelay(),
            max: this.reconnectionDelayMax(),
            jitter: this.randomizationFactor(),
          })),
          this.timeout(null == t.timeout ? 2e4 : t.timeout),
          (this.readyState = "closed"),
          (this.uri = e),
          (this.connecting = []),
          (this.lastPing = null),
          (this.encoding = !1),
          (this.packetBuffer = []);
        var n = t.parser || a;
        (this.encoder = new n.Encoder()),
          (this.decoder = new n.Decoder()),
          (this.autoConnect = !1 !== t.autoConnect),
          this.autoConnect && this.open();
      }
      var o = n(16),
        i = n(39),
        s = n(11),
        a = n(7),
        c = n(41),
        d = n(42),
        u = n(3)("socket.io-client:manager"),
        p = n(38),
        l = n(43),
        h = Object.prototype.hasOwnProperty;
      (e.exports = r),
        (r.prototype.emitAll = function () {
          for (var e in (this.emit.apply(this, arguments), this.nsps))
            h.call(this.nsps, e) &&
              this.nsps[e].emit.apply(this.nsps[e], arguments);
        }),
        (r.prototype.updateSocketIds = function () {
          for (var e in this.nsps)
            h.call(this.nsps, e) && (this.nsps[e].id = this.generateId(e));
        }),
        (r.prototype.generateId = function (e) {
          return ("/" === e ? "" : e + "#") + this.engine.id;
        }),
        s(r.prototype),
        (r.prototype.reconnection = function (e) {
          return arguments.length
            ? ((this._reconnection = !!e), this)
            : this._reconnection;
        }),
        (r.prototype.reconnectionAttempts = function (e) {
          return arguments.length
            ? ((this._reconnectionAttempts = e), this)
            : this._reconnectionAttempts;
        }),
        (r.prototype.reconnectionDelay = function (e) {
          return arguments.length
            ? ((this._reconnectionDelay = e),
              this.backoff && this.backoff.setMin(e),
              this)
            : this._reconnectionDelay;
        }),
        (r.prototype.randomizationFactor = function (e) {
          return arguments.length
            ? ((this._randomizationFactor = e),
              this.backoff && this.backoff.setJitter(e),
              this)
            : this._randomizationFactor;
        }),
        (r.prototype.reconnectionDelayMax = function (e) {
          return arguments.length
            ? ((this._reconnectionDelayMax = e),
              this.backoff && this.backoff.setMax(e),
              this)
            : this._reconnectionDelayMax;
        }),
        (r.prototype.timeout = function (e) {
          return arguments.length ? ((this._timeout = e), this) : this._timeout;
        }),
        (r.prototype.maybeReconnectOnOpen = function () {
          !this.reconnecting &&
            this._reconnection &&
            0 === this.backoff.attempts &&
            this.reconnect();
        }),
        (r.prototype.open = r.prototype.connect =
          function (e, t) {
            if (
              (u("readyState %s", this.readyState),
              ~this.readyState.indexOf("open"))
            )
              return this;
            u("opening %s", this.uri), (this.engine = o(this.uri, this.opts));
            var n = this.engine,
              r = this;
            (this.readyState = "opening"), (this.skipReconnect = !1);
            var i = c(n, "open", function () {
                r.onopen(), e && e();
              }),
              s = c(n, "error", function (t) {
                if (
                  (u("connect_error"),
                  r.cleanup(),
                  (r.readyState = "closed"),
                  r.emitAll("connect_error", t),
                  e)
                ) {
                  var n = new Error("Connection error");
                  (n.data = t), e(n);
                } else r.maybeReconnectOnOpen();
              });
            if (!1 !== this._timeout) {
              var a = this._timeout;
              u("connect attempt will timeout after %d", a);
              var d = setTimeout(function () {
                u("connect attempt timed out after %d", a),
                  i.destroy(),
                  n.close(),
                  n.emit("error", "timeout"),
                  r.emitAll("connect_timeout", a);
              }, a);
              this.subs.push({
                destroy: function () {
                  clearTimeout(d);
                },
              });
            }
            return this.subs.push(i), this.subs.push(s), this;
          }),
        (r.prototype.onopen = function () {
          u("open"),
            this.cleanup(),
            (this.readyState = "open"),
            this.emit("open");
          var e = this.engine;
          this.subs.push(c(e, "data", d(this, "ondata"))),
            this.subs.push(c(e, "ping", d(this, "onping"))),
            this.subs.push(c(e, "pong", d(this, "onpong"))),
            this.subs.push(c(e, "error", d(this, "onerror"))),
            this.subs.push(c(e, "close", d(this, "onclose"))),
            this.subs.push(c(this.decoder, "decoded", d(this, "ondecoded")));
        }),
        (r.prototype.onping = function () {
          (this.lastPing = new Date()), this.emitAll("ping");
        }),
        (r.prototype.onpong = function () {
          this.emitAll("pong", new Date() - this.lastPing);
        }),
        (r.prototype.ondata = function (e) {
          this.decoder.add(e);
        }),
        (r.prototype.ondecoded = function (e) {
          this.emit("packet", e);
        }),
        (r.prototype.onerror = function (e) {
          u("error", e), this.emitAll("error", e);
        }),
        (r.prototype.socket = function (e, t) {
          function n() {
            ~p(o.connecting, r) || o.connecting.push(r);
          }
          var r = this.nsps[e];
          if (!r) {
            (r = new i(this, e, t)), (this.nsps[e] = r);
            var o = this;
            r.on("connecting", n),
              r.on("connect", function () {
                r.id = o.generateId(e);
              }),
              this.autoConnect && n();
          }
          return r;
        }),
        (r.prototype.destroy = function (e) {
          var t = p(this.connecting, e);
          ~t && this.connecting.splice(t, 1),
            this.connecting.length || this.close();
        }),
        (r.prototype.packet = function (e) {
          u("writing packet %j", e);
          var t = this;
          e.query && 0 === e.type && (e.nsp += "?" + e.query),
            t.encoding
              ? t.packetBuffer.push(e)
              : ((t.encoding = !0),
                this.encoder.encode(e, function (n) {
                  for (var r = 0; r < n.length; r++)
                    t.engine.write(n[r], e.options);
                  (t.encoding = !1), t.processPacketQueue();
                }));
        }),
        (r.prototype.processPacketQueue = function () {
          if (this.packetBuffer.length > 0 && !this.encoding) {
            var e = this.packetBuffer.shift();
            this.packet(e);
          }
        }),
        (r.prototype.cleanup = function () {
          u("cleanup");
          for (var e = this.subs.length, t = 0; t < e; t++)
            this.subs.shift().destroy();
          (this.packetBuffer = []),
            (this.encoding = !1),
            (this.lastPing = null),
            this.decoder.destroy();
        }),
        (r.prototype.close = r.prototype.disconnect =
          function () {
            u("disconnect"),
              (this.skipReconnect = !0),
              (this.reconnecting = !1),
              "opening" === this.readyState && this.cleanup(),
              this.backoff.reset(),
              (this.readyState = "closed"),
              this.engine && this.engine.close();
          }),
        (r.prototype.onclose = function (e) {
          u("onclose"),
            this.cleanup(),
            this.backoff.reset(),
            (this.readyState = "closed"),
            this.emit("close", e),
            this._reconnection && !this.skipReconnect && this.reconnect();
        }),
        (r.prototype.reconnect = function () {
          if (this.reconnecting || this.skipReconnect) return this;
          var e = this;
          if (this.backoff.attempts >= this._reconnectionAttempts)
            u("reconnect failed"),
              this.backoff.reset(),
              this.emitAll("reconnect_failed"),
              (this.reconnecting = !1);
          else {
            var t = this.backoff.duration();
            u("will wait %dms before reconnect attempt", t),
              (this.reconnecting = !0);
            var n = setTimeout(function () {
              e.skipReconnect ||
                (u("attempting reconnect"),
                e.emitAll("reconnect_attempt", e.backoff.attempts),
                e.emitAll("reconnecting", e.backoff.attempts),
                e.skipReconnect ||
                  e.open(function (t) {
                    t
                      ? (u("reconnect attempt error"),
                        (e.reconnecting = !1),
                        e.reconnect(),
                        e.emitAll("reconnect_error", t.data))
                      : (u("reconnect success"), e.onreconnect());
                  }));
            }, t);
            this.subs.push({
              destroy: function () {
                clearTimeout(n);
              },
            });
          }
        }),
        (r.prototype.onreconnect = function () {
          var e = this.backoff.attempts;
          (this.reconnecting = !1),
            this.backoff.reset(),
            this.updateSocketIds(),
            this.emitAll("reconnect", e);
        });
    },
    function (e, t, n) {
      (e.exports = n(17)), (e.exports.parser = n(24));
    },
    function (e, t, n) {
      function r(e, t) {
        return this instanceof r
          ? ((t = t || {}),
            e && "object" == typeof e && ((t = e), (e = null)),
            e
              ? ((e = u(e)),
                (t.hostname = e.host),
                (t.secure = "https" === e.protocol || "wss" === e.protocol),
                (t.port = e.port),
                e.query && (t.query = e.query))
              : t.host && (t.hostname = u(t.host).host),
            (this.secure =
              null != t.secure
                ? t.secure
                : "undefined" != typeof location &&
                  "https:" === location.protocol),
            t.hostname && !t.port && (t.port = this.secure ? "443" : "80"),
            (this.agent = t.agent || !1),
            (this.hostname =
              t.hostname ||
              ("undefined" != typeof location
                ? location.hostname
                : "localhost")),
            (this.port =
              t.port ||
              ("undefined" != typeof location && location.port
                ? location.port
                : this.secure
                ? 443
                : 80)),
            (this.query = t.query || {}),
            "string" == typeof this.query &&
              (this.query = p.decode(this.query)),
            (this.upgrade = !1 !== t.upgrade),
            (this.path = (t.path || "/engine.io").replace(/\/$/, "") + "/"),
            (this.forceJSONP = !!t.forceJSONP),
            (this.jsonp = !1 !== t.jsonp),
            (this.forceBase64 = !!t.forceBase64),
            (this.enablesXDR = !!t.enablesXDR),
            (this.withCredentials = !1 !== t.withCredentials),
            (this.timestampParam = t.timestampParam || "t"),
            (this.timestampRequests = t.timestampRequests),
            (this.transports = t.transports || ["polling", "websocket"]),
            (this.transportOptions = t.transportOptions || {}),
            (this.readyState = ""),
            (this.writeBuffer = []),
            (this.prevBufferLen = 0),
            (this.policyPort = t.policyPort || 843),
            (this.rememberUpgrade = t.rememberUpgrade || !1),
            (this.binaryType = null),
            (this.onlyBinaryUpgrades = t.onlyBinaryUpgrades),
            (this.perMessageDeflate =
              !1 !== t.perMessageDeflate && (t.perMessageDeflate || {})),
            !0 === this.perMessageDeflate && (this.perMessageDeflate = {}),
            this.perMessageDeflate &&
              null == this.perMessageDeflate.threshold &&
              (this.perMessageDeflate.threshold = 1024),
            (this.pfx = t.pfx || null),
            (this.key = t.key || null),
            (this.passphrase = t.passphrase || null),
            (this.cert = t.cert || null),
            (this.ca = t.ca || null),
            (this.ciphers = t.ciphers || null),
            (this.rejectUnauthorized =
              void 0 === t.rejectUnauthorized || t.rejectUnauthorized),
            (this.forceNode = !!t.forceNode),
            (this.isReactNative =
              "undefined" != typeof navigator &&
              "string" == typeof navigator.product &&
              "reactnative" === navigator.product.toLowerCase()),
            ("undefined" == typeof self || this.isReactNative) &&
              (t.extraHeaders &&
                Object.keys(t.extraHeaders).length > 0 &&
                (this.extraHeaders = t.extraHeaders),
              t.localAddress && (this.localAddress = t.localAddress)),
            (this.id = null),
            (this.upgrades = null),
            (this.pingInterval = null),
            (this.pingTimeout = null),
            (this.pingIntervalTimer = null),
            (this.pingTimeoutTimer = null),
            void this.open())
          : new r(e, t);
      }
      function o(e) {
        var t = {};
        for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
        return t;
      }
      var i = n(18),
        s = n(11),
        a = n(3)("engine.io-client:socket"),
        c = n(38),
        d = n(24),
        u = n(2),
        p = n(32);
      (e.exports = r),
        (r.priorWebsocketSuccess = !1),
        s(r.prototype),
        (r.protocol = d.protocol),
        (r.Socket = r),
        (r.Transport = n(23)),
        (r.transports = n(18)),
        (r.parser = n(24)),
        (r.prototype.createTransport = function (e) {
          a('creating transport "%s"', e);
          var t = o(this.query);
          (t.EIO = d.protocol), (t.transport = e);
          var n = this.transportOptions[e] || {};
          return (
            this.id && (t.sid = this.id),
            console.log("================"),
            console.log({
              query: t,
              socket: this,
              agent: n.agent || this.agent,
              hostname: n.hostname || this.hostname,
              port: n.port || this.port,
              secure: n.secure || this.secure,
              path: n.path || this.path,
              forceJSONP: n.forceJSONP || this.forceJSONP,
              jsonp: n.jsonp || this.jsonp,
              forceBase64: n.forceBase64 || this.forceBase64,
              enablesXDR: n.enablesXDR || this.enablesXDR,
              withCredentials: n.withCredentials || this.withCredentials,
              timestampRequests: n.timestampRequests || this.timestampRequests,
              timestampParam: n.timestampParam || this.timestampParam,
              policyPort: n.policyPort || this.policyPort,
              pfx: n.pfx || this.pfx,
              key: n.key || this.key,
              passphrase: n.passphrase || this.passphrase,
              cert: n.cert || this.cert,
              ca: n.ca || this.ca,
              ciphers: n.ciphers || this.ciphers,
              rejectUnauthorized:
                n.rejectUnauthorized || this.rejectUnauthorized,
              perMessageDeflate: n.perMessageDeflate || this.perMessageDeflate,
              extraHeaders: n.extraHeaders || this.extraHeaders,
              forceNode: n.forceNode || this.forceNode,
              localAddress: n.localAddress || this.localAddress,
              requestTimeout: n.requestTimeout || this.requestTimeout,
              protocols: n.protocols || void 0,
              isReactNative: this.isReactNative,
            }),
            new i[e]({
              query: t,
              socket: this,
              agent: n.agent || this.agent,
              hostname: n.hostname || this.hostname,
              port: n.port || this.port,
              secure: n.secure || this.secure,
              path: n.path || this.path,
              forceJSONP: n.forceJSONP || this.forceJSONP,
              jsonp: n.jsonp || this.jsonp,
              forceBase64: n.forceBase64 || this.forceBase64,
              enablesXDR: n.enablesXDR || this.enablesXDR,
              withCredentials: n.withCredentials || this.withCredentials,
              timestampRequests: n.timestampRequests || this.timestampRequests,
              timestampParam: n.timestampParam || this.timestampParam,
              policyPort: n.policyPort || this.policyPort,
              pfx: n.pfx || this.pfx,
              key: n.key || this.key,
              passphrase: n.passphrase || this.passphrase,
              cert: n.cert || this.cert,
              ca: n.ca || this.ca,
              ciphers: n.ciphers || this.ciphers,
              rejectUnauthorized:
                n.rejectUnauthorized || this.rejectUnauthorized,
              perMessageDeflate: n.perMessageDeflate || this.perMessageDeflate,
              extraHeaders: n.extraHeaders || this.extraHeaders,
              forceNode: n.forceNode || this.forceNode,
              localAddress: n.localAddress || this.localAddress,
              requestTimeout: n.requestTimeout || this.requestTimeout,
              protocols: n.protocols || void 0,
              isReactNative: this.isReactNative,
            })
          );
        }),
        (r.prototype.open = function () {
          var e;
          if (
            this.rememberUpgrade &&
            r.priorWebsocketSuccess &&
            -1 !== this.transports.indexOf("websocket")
          )
            e = "websocket";
          else {
            if (0 === this.transports.length) {
              var t = this;
              return void setTimeout(function () {
                t.emit("error", "No transports available");
              }, 0);
            }
            e = this.transports[0];
          }
          this.readyState = "opening";
          try {
            e = this.createTransport(e);
          } catch (e) {
            return this.transports.shift(), void this.open();
          }
          e.open(), this.setTransport(e);
        }),
        (r.prototype.setTransport = function (e) {
          a("setting transport %s", e.name);
          var t = this;
          this.transport &&
            (a("clearing existing transport %s", this.transport.name),
            this.transport.removeAllListeners()),
            (this.transport = e),
            e
              .on("drain", function () {
                t.onDrain();
              })
              .on("packet", function (e) {
                t.onPacket(e);
              })
              .on("error", function (e) {
                t.onError(e);
              })
              .on("close", function () {
                t.onClose("transport close");
              });
        }),
        (r.prototype.probe = function (e) {
          function t() {
            if (l.onlyBinaryUpgrades) {
              var t = !this.supportsBinary && l.transport.supportsBinary;
              p = p || t;
            }
            p ||
              (a('probe transport "%s" opened', e),
              u.send([{ type: "ping", data: "probe" }]),
              u.once("packet", function (t) {
                if (!p)
                  if ("pong" === t.type && "probe" === t.data) {
                    if (
                      (a('probe transport "%s" pong', e),
                      (l.upgrading = !0),
                      l.emit("upgrading", u),
                      !u)
                    )
                      return;
                    (r.priorWebsocketSuccess = "websocket" === u.name),
                      a('pausing current transport "%s"', l.transport.name),
                      l.transport.pause(function () {
                        p ||
                          ("closed" !== l.readyState &&
                            (a("changing transport and sending upgrade packet"),
                            d(),
                            l.setTransport(u),
                            u.send([{ type: "upgrade" }]),
                            l.emit("upgrade", u),
                            (u = null),
                            (l.upgrading = !1),
                            l.flush()));
                      });
                  } else {
                    a('probe transport "%s" failed', e);
                    var n = new Error("probe error");
                    (n.transport = u.name), l.emit("upgradeError", n);
                  }
              }));
          }
          function n() {
            p || ((p = !0), d(), u.close(), (u = null));
          }
          function o(t) {
            var r = new Error("probe error: " + t);
            (r.transport = u.name),
              n(),
              a('probe transport "%s" failed because of error: %s', e, t),
              l.emit("upgradeError", r);
          }
          function i() {
            o("transport closed");
          }
          function s() {
            o("socket closed");
          }
          function c(e) {
            u &&
              e.name !== u.name &&
              (a('"%s" works - aborting "%s"', e.name, u.name), n());
          }
          function d() {
            u.removeListener("open", t),
              u.removeListener("error", o),
              u.removeListener("close", i),
              l.removeListener("close", s),
              l.removeListener("upgrading", c);
          }
          a('probing transport "%s"', e);
          var u = this.createTransport(e, { probe: 1 }),
            p = !1,
            l = this;
          (r.priorWebsocketSuccess = !1),
            u.once("open", t),
            u.once("error", o),
            u.once("close", i),
            this.once("close", s),
            this.once("upgrading", c),
            u.open();
        }),
        (r.prototype.onOpen = function () {
          if (
            (a("socket open"),
            (this.readyState = "open"),
            (r.priorWebsocketSuccess = "websocket" === this.transport.name),
            this.emit("open"),
            this.flush(),
            "open" === this.readyState && this.upgrade && this.transport.pause)
          ) {
            a("starting upgrade probes");
            for (var e = 0, t = this.upgrades.length; e < t; e++)
              this.probe(this.upgrades[e]);
          }
        }),
        (r.prototype.onPacket = function (e) {
          if (
            "opening" === this.readyState ||
            "open" === this.readyState ||
            "closing" === this.readyState
          )
            switch (
              (a('socket receive: type "%s", data "%s"', e.type, e.data),
              this.emit("packet", e),
              this.emit("heartbeat"),
              e.type)
            ) {
              case "open":
                this.onHandshake(JSON.parse(e.data));
                break;
              case "pong":
                this.setPing(), this.emit("pong");
                break;
              case "error":
                var t = new Error("server error");
                (t.code = e.data), this.onError(t);
                break;
              case "message":
                this.emit("data", e.data), this.emit("message", e.data);
            }
          else
            a('packet received with socket readyState "%s"', this.readyState);
        }),
        (r.prototype.onHandshake = function (e) {
          this.emit("handshake", e),
            (this.id = e.sid),
            (this.transport.query.sid = e.sid),
            (this.upgrades = this.filterUpgrades(e.upgrades)),
            (this.pingInterval = e.pingInterval),
            (this.pingTimeout = e.pingTimeout),
            this.onOpen(),
            "closed" !== this.readyState &&
              (this.setPing(),
              this.removeListener("heartbeat", this.onHeartbeat),
              this.on("heartbeat", this.onHeartbeat));
        }),
        (r.prototype.onHeartbeat = function (e) {
          clearTimeout(this.pingTimeoutTimer);
          var t = this;
          t.pingTimeoutTimer = setTimeout(function () {
            "closed" !== t.readyState && t.onClose("ping timeout");
          }, e || t.pingInterval + t.pingTimeout);
        }),
        (r.prototype.setPing = function () {
          var e = this;
          clearTimeout(e.pingIntervalTimer),
            (e.pingIntervalTimer = setTimeout(function () {
              a(
                "writing ping packet - expecting pong within %sms",
                e.pingTimeout
              ),
                e.ping(),
                e.onHeartbeat(e.pingTimeout);
            }, e.pingInterval));
        }),
        (r.prototype.ping = function () {
          var e = this;
          this.sendPacket("ping", function () {
            e.emit("ping");
          });
        }),
        (r.prototype.onDrain = function () {
          this.writeBuffer.splice(0, this.prevBufferLen),
            (this.prevBufferLen = 0),
            0 === this.writeBuffer.length ? this.emit("drain") : this.flush();
        }),
        (r.prototype.flush = function () {
          "closed" !== this.readyState &&
            this.transport.writable &&
            !this.upgrading &&
            this.writeBuffer.length &&
            (a("flushing %d packets in socket", this.writeBuffer.length),
            this.transport.send(this.writeBuffer),
            (this.prevBufferLen = this.writeBuffer.length),
            this.emit("flush"));
        }),
        (r.prototype.write = r.prototype.send =
          function (e, t, n) {
            return this.sendPacket("message", e, t, n), this;
          }),
        (r.prototype.sendPacket = function (e, t, n, r) {
          if (
            ("function" == typeof t && ((r = t), (t = void 0)),
            "function" == typeof n && ((r = n), (n = null)),
            "closing" !== this.readyState && "closed" !== this.readyState)
          ) {
            (n = n || {}).compress = !1 !== n.compress;
            var o = { type: e, data: t, options: n };
            this.emit("packetCreate", o),
              this.writeBuffer.push(o),
              r && this.once("flush", r),
              this.flush();
          }
        }),
        (r.prototype.close = function () {
          function e() {
            r.onClose("forced close"),
              a("socket closing - telling transport to close"),
              r.transport.close();
          }
          function t() {
            r.removeListener("upgrade", t),
              r.removeListener("upgradeError", t),
              e();
          }
          function n() {
            r.once("upgrade", t), r.once("upgradeError", t);
          }
          if ("opening" === this.readyState || "open" === this.readyState) {
            this.readyState = "closing";
            var r = this;
            this.writeBuffer.length
              ? this.once("drain", function () {
                  this.upgrading ? n() : e();
                })
              : this.upgrading
              ? n()
              : e();
          }
          return this;
        }),
        (r.prototype.onError = function (e) {
          a("socket error %j", e),
            (r.priorWebsocketSuccess = !1),
            this.emit("error", e),
            this.onClose("transport error", e);
        }),
        (r.prototype.onClose = function (e, t) {
          if (
            "opening" === this.readyState ||
            "open" === this.readyState ||
            "closing" === this.readyState
          ) {
            a('socket close with reason: "%s"', e);
            var n = this;
            clearTimeout(this.pingIntervalTimer),
              clearTimeout(this.pingTimeoutTimer),
              this.transport.removeAllListeners("close"),
              this.transport.close(),
              this.transport.removeAllListeners(),
              (this.readyState = "closed"),
              (this.id = null),
              this.emit("close", e, t),
              (n.writeBuffer = []),
              (n.prevBufferLen = 0);
          }
        }),
        (r.prototype.filterUpgrades = function (e) {
          for (var t = [], n = 0, r = e.length; n < r; n++)
            ~c(this.transports, e[n]) && t.push(e[n]);
          return t;
        });
    },
    function (e, t, n) {
      function r(e) {
        var t = !1,
          n = !1,
          r = !1 !== e.jsonp;
        if ("undefined" != typeof location) {
          var a = "https:" === location.protocol,
            c = location.port;
          c || (c = a ? 443 : 80),
            (t = e.hostname !== location.hostname || c !== e.port),
            (n = e.secure !== a);
        }
        if (
          ((e.xdomain = t),
          (e.xscheme = n),
          "open" in new o(e) && !e.forceJSONP)
        )
          return new i(e);
        if (!r) throw new Error("JSONP disabled");
        return new s(e);
      }
      var o = n(19),
        i = n(21),
        s = n(35),
        a = n(36);
      (t.polling = r), (t.websocket = a);
    },
    function (e, t, n) {
      var r = n(20);
      e.exports = function (e) {
        var t = e.xdomain,
          n = e.xscheme,
          o = e.enablesXDR;
        try {
          if ("undefined" != typeof XMLHttpRequest && (!t || r))
            return new XMLHttpRequest();
        } catch (e) {}
        try {
          if ("undefined" != typeof XDomainRequest && !n && o)
            return new XDomainRequest();
        } catch (e) {}
        if (!t)
          try {
            return new self[["Active"].concat("Object").join("X")](
              "Microsoft.XMLHTTP"
            );
          } catch (e) {}
      };
    },
    function (e, t) {
      try {
        e.exports =
          "undefined" != typeof XMLHttpRequest &&
          "withCredentials" in new XMLHttpRequest();
      } catch (t) {
        e.exports = !1;
      }
    },
    function (e, t, n) {
      function r() {}
      function o(e) {
        if (
          (c.call(this, e),
          (this.requestTimeout = e.requestTimeout),
          (this.extraHeaders = e.extraHeaders),
          "undefined" != typeof location)
        ) {
          var t = "https:" === location.protocol,
            n = location.port;
          n || (n = t ? 443 : 80),
            (this.xd =
              ("undefined" != typeof location &&
                e.hostname !== location.hostname) ||
              n !== e.port),
            (this.xs = e.secure !== t);
        }
      }
      function i(e) {
        (this.method = e.method || "GET"),
          (this.uri = e.uri),
          (this.xd = !!e.xd),
          (this.xs = !!e.xs),
          (this.async = !1 !== e.async),
          (this.data = void 0 !== e.data ? e.data : null),
          (this.agent = e.agent),
          (this.isBinary = e.isBinary),
          (this.supportsBinary = e.supportsBinary),
          (this.enablesXDR = e.enablesXDR),
          (this.withCredentials = e.withCredentials),
          (this.requestTimeout = e.requestTimeout),
          (this.pfx = e.pfx),
          (this.key = e.key),
          (this.passphrase = e.passphrase),
          (this.cert = e.cert),
          (this.ca = e.ca),
          (this.ciphers = e.ciphers),
          (this.rejectUnauthorized = e.rejectUnauthorized),
          (this.extraHeaders = e.extraHeaders),
          this.create();
      }
      function s() {
        for (var e in i.requests)
          i.requests.hasOwnProperty(e) && i.requests[e].abort();
      }
      var a = n(19),
        c = n(22),
        d = n(11),
        u = n(33),
        p = n(3)("engine.io-client:polling-xhr");
      if (
        ((e.exports = o),
        (e.exports.Request = i),
        u(o, c),
        (o.prototype.supportsBinary = !0),
        (o.prototype.request = function (e) {
          return (
            ((e = e || {}).uri = this.uri()),
            (e.xd = this.xd),
            (e.xs = this.xs),
            (e.agent = this.agent || !1),
            (e.supportsBinary = this.supportsBinary),
            (e.enablesXDR = this.enablesXDR),
            (e.withCredentials = this.withCredentials),
            (e.pfx = this.pfx),
            (e.key = this.key),
            (e.passphrase = this.passphrase),
            (e.cert = this.cert),
            (e.ca = this.ca),
            (e.ciphers = this.ciphers),
            (e.rejectUnauthorized = this.rejectUnauthorized),
            (e.requestTimeout = this.requestTimeout),
            (e.extraHeaders = this.extraHeaders),
            new i(e)
          );
        }),
        (o.prototype.doWrite = function (e, t) {
          var n = "string" != typeof e && void 0 !== e,
            r = this.request({ method: "POST", data: e, isBinary: n }),
            o = this;
          r.on("success", t),
            r.on("error", function (e) {
              o.onError("xhr post error", e);
            }),
            (this.sendXhr = r);
        }),
        (o.prototype.doPoll = function () {
          p("xhr poll");
          var e = this.request(),
            t = this;
          e.on("data", function (e) {
            t.onData(e);
          }),
            e.on("error", function (e) {
              t.onError("xhr poll error", e);
            }),
            (this.pollXhr = e);
        }),
        d(i.prototype),
        (i.prototype.create = function () {
          var e = {
            agent: this.agent,
            xdomain: this.xd,
            xscheme: this.xs,
            enablesXDR: this.enablesXDR,
          };
          (e.pfx = this.pfx),
            (e.key = this.key),
            (e.passphrase = this.passphrase),
            (e.cert = this.cert),
            (e.ca = this.ca),
            (e.ciphers = this.ciphers),
            (e.rejectUnauthorized = this.rejectUnauthorized);
          var t = (this.xhr = new a(e)),
            n = this;
          try {
            p("xhr open %s: %s", this.method, this.uri),
              t.open(this.method, this.uri, this.async);
            try {
              if (this.extraHeaders)
                for (var r in (t.setDisableHeaderCheck &&
                  t.setDisableHeaderCheck(!0),
                this.extraHeaders))
                  this.extraHeaders.hasOwnProperty(r) &&
                    t.setRequestHeader(r, this.extraHeaders[r]);
            } catch (e) {}
            if ("POST" === this.method)
              try {
                this.isBinary
                  ? t.setRequestHeader(
                      "Content-type",
                      "application/octet-stream"
                    )
                  : t.setRequestHeader(
                      "Content-type",
                      "text/plain;charset=UTF-8"
                    );
              } catch (e) {}
            try {
              t.setRequestHeader("Accept", "*/*");
            } catch (e) {}
            "withCredentials" in t &&
              (t.withCredentials = this.withCredentials),
              this.requestTimeout && (t.timeout = this.requestTimeout),
              this.hasXDR()
                ? ((t.onload = function () {
                    n.onLoad();
                  }),
                  (t.onerror = function () {
                    n.onError(t.responseText);
                  }))
                : (t.onreadystatechange = function () {
                    if (2 === t.readyState)
                      try {
                        var e = t.getResponseHeader("Content-Type");
                        ((n.supportsBinary &&
                          "application/octet-stream" === e) ||
                          "application/octet-stream; charset=UTF-8" === e) &&
                          (t.responseType = "arraybuffer");
                      } catch (e) {}
                    4 === t.readyState &&
                      (200 === t.status || 1223 === t.status
                        ? n.onLoad()
                        : setTimeout(function () {
                            n.onError(
                              "number" == typeof t.status ? t.status : 0
                            );
                          }, 0));
                  }),
              p("xhr data %s", this.data),
              t.send(this.data);
          } catch (e) {
            return void setTimeout(function () {
              n.onError(e);
            }, 0);
          }
          "undefined" != typeof document &&
            ((this.index = i.requestsCount++), (i.requests[this.index] = this));
        }),
        (i.prototype.onSuccess = function () {
          this.emit("success"), this.cleanup();
        }),
        (i.prototype.onData = function (e) {
          this.emit("data", e), this.onSuccess();
        }),
        (i.prototype.onError = function (e) {
          this.emit("error", e), this.cleanup(!0);
        }),
        (i.prototype.cleanup = function (e) {
          if (void 0 !== this.xhr && null !== this.xhr) {
            if (
              (this.hasXDR()
                ? (this.xhr.onload = this.xhr.onerror = r)
                : (this.xhr.onreadystatechange = r),
              e)
            )
              try {
                this.xhr.abort();
              } catch (e) {}
            "undefined" != typeof document && delete i.requests[this.index],
              (this.xhr = null);
          }
        }),
        (i.prototype.onLoad = function () {
          var e;
          try {
            var t;
            try {
              t = this.xhr.getResponseHeader("Content-Type");
            } catch (e) {}
            e =
              (("application/octet-stream" === t ||
                "application/octet-stream; charset=UTF-8" === t) &&
                this.xhr.response) ||
              this.xhr.responseText;
          } catch (e) {
            this.onError(e);
          }
          null != e && this.onData(e);
        }),
        (i.prototype.hasXDR = function () {
          return (
            "undefined" != typeof XDomainRequest && !this.xs && this.enablesXDR
          );
        }),
        (i.prototype.abort = function () {
          this.cleanup();
        }),
        (i.requestsCount = 0),
        (i.requests = {}),
        "undefined" != typeof document)
      )
        if ("function" == typeof attachEvent) attachEvent("onunload", s);
        else if ("function" == typeof addEventListener) {
          var l = "onpagehide" in self ? "pagehide" : "unload";
          addEventListener(l, s, !1);
        }
    },
    function (e, t, n) {
      function r(e) {
        var t = e && e.forceBase64;
        (u && !t) || (this.supportsBinary = !1), o.call(this, e);
      }
      var o = n(23),
        i = n(32),
        s = n(24),
        a = n(33),
        c = n(34),
        d = n(3)("engine.io-client:polling");
      e.exports = r;
      var u = null != new (n(19))({ xdomain: !1 }).responseType;
      a(r, o),
        (r.prototype.name = "polling"),
        (r.prototype.doOpen = function () {
          this.poll();
        }),
        (r.prototype.pause = function (e) {
          function t() {
            d("paused"), (n.readyState = "paused"), e();
          }
          var n = this;
          if (((this.readyState = "pausing"), this.polling || !this.writable)) {
            var r = 0;
            this.polling &&
              (d("we are currently polling - waiting to pause"),
              r++,
              this.once("pollComplete", function () {
                d("pre-pause polling complete"), --r || t();
              })),
              this.writable ||
                (d("we are currently writing - waiting to pause"),
                r++,
                this.once("drain", function () {
                  d("pre-pause writing complete"), --r || t();
                }));
          } else t();
        }),
        (r.prototype.poll = function () {
          d("polling"), (this.polling = !0), this.doPoll(), this.emit("poll");
        }),
        (r.prototype.onData = function (e) {
          var t = this;
          d("polling got data %s", e);
          var n = function (e, n, r) {
            return (
              "opening" === t.readyState && t.onOpen(),
              "close" === e.type ? (t.onClose(), !1) : void t.onPacket(e)
            );
          };
          s.decodePayload(e, this.socket.binaryType, n),
            "closed" !== this.readyState &&
              ((this.polling = !1),
              this.emit("pollComplete"),
              "open" === this.readyState
                ? this.poll()
                : d('ignoring poll - transport state "%s"', this.readyState));
        }),
        (r.prototype.doClose = function () {
          function e() {
            d("writing close packet"), t.write([{ type: "close" }]);
          }
          var t = this;
          "open" === this.readyState
            ? (d("transport open - closing"), e())
            : (d("transport not open - deferring close"), this.once("open", e));
        }),
        (r.prototype.write = function (e) {
          var t = this;
          this.writable = !1;
          var n = function () {
            (t.writable = !0), t.emit("drain");
          };
          s.encodePayload(e, this.supportsBinary, function (e) {
            t.doWrite(e, n);
          });
        }),
        (r.prototype.uri = function () {
          var e = this.query || {},
            t = this.secure ? "https" : "http",
            n = "";
          return (
            !1 !== this.timestampRequests && (e[this.timestampParam] = c()),
            this.supportsBinary || e.sid || (e.b64 = 1),
            (e = i.encode(e)),
            this.port &&
              (("https" === t && 443 !== Number(this.port)) ||
                ("http" === t && 80 !== Number(this.port))) &&
              (n = ":" + this.port),
            e.length && (e = "?" + e),
            t +
              "://" +
              (-1 !== this.hostname.indexOf(":")
                ? "[" + this.hostname + "]"
                : this.hostname) +
              n +
              this.path +
              e
          );
        });
    },
    function (e, t, n) {
      function r(e) {
        (this.path = e.path),
          (this.hostname = e.hostname),
          (this.port = e.port),
          (this.secure = e.secure),
          (this.query = e.query),
          (this.timestampParam = e.timestampParam),
          (this.timestampRequests = e.timestampRequests),
          (this.readyState = ""),
          (this.agent = e.agent || !1),
          (this.socket = e.socket),
          (this.enablesXDR = e.enablesXDR),
          (this.withCredentials = e.withCredentials),
          (this.pfx = e.pfx),
          (this.key = e.key),
          (this.passphrase = e.passphrase),
          (this.cert = e.cert),
          (this.ca = e.ca),
          (this.ciphers = e.ciphers),
          (this.rejectUnauthorized = e.rejectUnauthorized),
          (this.forceNode = e.forceNode),
          (this.isReactNative = e.isReactNative),
          (this.extraHeaders = e.extraHeaders),
          (this.localAddress = e.localAddress);
      }
      var o = n(24),
        i = n(11);
      (e.exports = r),
        i(r.prototype),
        (r.prototype.onError = function (e, t) {
          var n = new Error(e);
          return (
            (n.type = "TransportError"),
            (n.description = t),
            this.emit("error", n),
            this
          );
        }),
        (r.prototype.open = function () {
          return (
            ("closed" !== this.readyState && "" !== this.readyState) ||
              ((this.readyState = "opening"), this.doOpen()),
            this
          );
        }),
        (r.prototype.close = function () {
          return (
            ("opening" !== this.readyState && "open" !== this.readyState) ||
              (this.doClose(), this.onClose()),
            this
          );
        }),
        (r.prototype.send = function (e) {
          if ("open" !== this.readyState) throw new Error("Transport not open");
          this.write(e);
        }),
        (r.prototype.onOpen = function () {
          (this.readyState = "open"), (this.writable = !0), this.emit("open");
        }),
        (r.prototype.onData = function (e) {
          var t = o.decodePacket(e, this.socket.binaryType);
          this.onPacket(t);
        }),
        (r.prototype.onPacket = function (e) {
          this.emit("packet", e);
        }),
        (r.prototype.onClose = function () {
          (this.readyState = "closed"), this.emit("close");
        });
    },
    function (e, t, n) {
      function r(e, n) {
        return n("b" + t.packets[e.type] + e.data.data);
      }
      function o(e, n, r) {
        if (!n) return t.encodeBase64Packet(e, r);
        var o = e.data,
          i = new Uint8Array(o),
          s = new Uint8Array(1 + o.byteLength);
        s[0] = y[e.type];
        for (var a = 0; a < i.length; a++) s[a + 1] = i[a];
        return r(s.buffer);
      }
      function i(e, n, r) {
        if (!n) return t.encodeBase64Packet(e, r);
        var o = new FileReader();
        return (
          (o.onload = function () {
            t.encodePacket({ type: e.type, data: o.result }, n, !0, r);
          }),
          o.readAsArrayBuffer(e.data)
        );
      }
      function s(e, n, r) {
        if (!n) return t.encodeBase64Packet(e, r);
        if (v) return i(e, n, r);
        var o = new Uint8Array(1);
        return (o[0] = y[e.type]), r(new w([o.buffer, e.data]));
      }
      function a(e) {
        try {
          e = f.decode(e, { strict: !1 });
        } catch (e) {
          return !1;
        }
        return e;
      }
      function c(e, t, n) {
        for (
          var r = new Array(e.length),
            o = h(e.length, n),
            i = function (e, n, o) {
              t(n, function (t, n) {
                (r[e] = n), o(t, r);
              });
            },
            s = 0;
          s < e.length;
          s++
        )
          i(s, e[s], o);
      }
      var d,
        u = n(25),
        p = n(26),
        l = n(27),
        h = n(28),
        f = n(29);
      "undefined" != typeof ArrayBuffer && (d = n(30));
      var m =
          "undefined" != typeof navigator &&
          /Android/i.test(navigator.userAgent),
        g =
          "undefined" != typeof navigator &&
          /PhantomJS/i.test(navigator.userAgent),
        v = m || g;
      t.protocol = 3;
      var y = (t.packets = {
          open: 0,
          close: 1,
          ping: 2,
          pong: 3,
          message: 4,
          upgrade: 5,
          noop: 6,
        }),
        b = u(y),
        C = { type: "error", data: "parser error" },
        w = n(31);
      (t.encodePacket = function (e, t, n, i) {
        "function" == typeof t && ((i = t), (t = !1)),
          "function" == typeof n && ((i = n), (n = null));
        var a = void 0 === e.data ? void 0 : e.data.buffer || e.data;
        if ("undefined" != typeof ArrayBuffer && a instanceof ArrayBuffer)
          return o(e, t, i);
        if (void 0 !== w && a instanceof w) return s(e, t, i);
        if (a && a.base64) return r(e, i);
        var c = y[e.type];
        return (
          void 0 !== e.data &&
            (c += n
              ? f.encode(String(e.data), { strict: !1 })
              : String(e.data)),
          i("" + c)
        );
      }),
        (t.encodeBase64Packet = function (e, n) {
          var r,
            o = "b" + t.packets[e.type];
          if (void 0 !== w && e.data instanceof w) {
            var i = new FileReader();
            return (
              (i.onload = function () {
                var e = i.result.split(",")[1];
                n(o + e);
              }),
              i.readAsDataURL(e.data)
            );
          }
          try {
            r = String.fromCharCode.apply(null, new Uint8Array(e.data));
          } catch (t) {
            for (
              var s = new Uint8Array(e.data), a = new Array(s.length), c = 0;
              c < s.length;
              c++
            )
              a[c] = s[c];
            r = String.fromCharCode.apply(null, a);
          }
          return (o += btoa(r)), n(o);
        }),
        (t.decodePacket = function (e, n, r) {
          if (void 0 === e) return C;
          if ("string" == typeof e) {
            if ("b" === e.charAt(0))
              return t.decodeBase64Packet(e.substr(1), n);
            if (r && !1 === (e = a(e))) return C;
            var o = e.charAt(0);
            return Number(o) == o && b[o]
              ? e.length > 1
                ? { type: b[o], data: e.substring(1) }
                : { type: b[o] }
              : C;
          }
          o = new Uint8Array(e)[0];
          var i = l(e, 1);
          return w && "blob" === n && (i = new w([i])), { type: b[o], data: i };
        }),
        (t.decodeBase64Packet = function (e, t) {
          var n = b[e.charAt(0)];
          if (!d) return { type: n, data: { base64: !0, data: e.substr(1) } };
          var r = d.decode(e.substr(1));
          return "blob" === t && w && (r = new w([r])), { type: n, data: r };
        }),
        (t.encodePayload = function (e, n, r) {
          function o(e) {
            return e.length + ":" + e;
          }
          function i(e, r) {
            t.encodePacket(e, !!s && n, !1, function (e) {
              r(null, o(e));
            });
          }
          "function" == typeof n && ((r = n), (n = null));
          var s = p(e);
          return n && s
            ? w && !v
              ? t.encodePayloadAsBlob(e, r)
              : t.encodePayloadAsArrayBuffer(e, r)
            : e.length
            ? void c(e, i, function (e, t) {
                return r(t.join(""));
              })
            : r("0:");
        }),
        (t.decodePayload = function (e, n, r) {
          if ("string" != typeof e) return t.decodePayloadAsBinary(e, n, r);
          var o;
          if (("function" == typeof n && ((r = n), (n = null)), "" === e))
            return r(C, 0, 1);
          for (var i, s, a = "", c = 0, d = e.length; c < d; c++) {
            var u = e.charAt(c);
            if (":" === u) {
              if ("" === a || a != (i = Number(a))) return r(C, 0, 1);
              if (a != (s = e.substr(c + 1, i)).length) return r(C, 0, 1);
              if (s.length) {
                if (
                  ((o = t.decodePacket(s, n, !1)),
                  C.type === o.type && C.data === o.data)
                )
                  return r(C, 0, 1);
                if (!1 === r(o, c + i, d)) return;
              }
              (c += i), (a = "");
            } else a += u;
          }
          return "" !== a ? r(C, 0, 1) : void 0;
        }),
        (t.encodePayloadAsArrayBuffer = function (e, n) {
          function r(e, n) {
            t.encodePacket(e, !0, !0, function (e) {
              return n(null, e);
            });
          }
          return e.length
            ? void c(e, r, function (e, t) {
                var r = t.reduce(function (e, t) {
                    var n;
                    return (
                      e +
                      (n =
                        "string" == typeof t
                          ? t.length
                          : t.byteLength).toString().length +
                      n +
                      2
                    );
                  }, 0),
                  o = new Uint8Array(r),
                  i = 0;
                return (
                  t.forEach(function (e) {
                    var t = "string" == typeof e,
                      n = e;
                    if (t) {
                      for (
                        var r = new Uint8Array(e.length), s = 0;
                        s < e.length;
                        s++
                      )
                        r[s] = e.charCodeAt(s);
                      n = r.buffer;
                    }
                    o[i++] = t ? 0 : 1;
                    var a = n.byteLength.toString();
                    for (s = 0; s < a.length; s++) o[i++] = parseInt(a[s]);
                    for (
                      o[i++] = 255, r = new Uint8Array(n), s = 0;
                      s < r.length;
                      s++
                    )
                      o[i++] = r[s];
                  }),
                  n(o.buffer)
                );
              })
            : n(new ArrayBuffer(0));
        }),
        (t.encodePayloadAsBlob = function (e, n) {
          function r(e, n) {
            t.encodePacket(e, !0, !0, function (e) {
              var t = new Uint8Array(1);
              if (((t[0] = 1), "string" == typeof e)) {
                for (var r = new Uint8Array(e.length), o = 0; o < e.length; o++)
                  r[o] = e.charCodeAt(o);
                (e = r.buffer), (t[0] = 0);
              }
              var i = (
                  e instanceof ArrayBuffer ? e.byteLength : e.size
                ).toString(),
                s = new Uint8Array(i.length + 1);
              for (o = 0; o < i.length; o++) s[o] = parseInt(i[o]);
              if (((s[i.length] = 255), w)) {
                var a = new w([t.buffer, s.buffer, e]);
                n(null, a);
              }
            });
          }
          c(e, r, function (e, t) {
            return n(new w(t));
          });
        }),
        (t.decodePayloadAsBinary = function (e, n, r) {
          "function" == typeof n && ((r = n), (n = null));
          for (var o = e, i = []; o.byteLength > 0; ) {
            for (
              var s = new Uint8Array(o), a = 0 === s[0], c = "", d = 1;
              255 !== s[d];
              d++
            ) {
              if (c.length > 310) return r(C, 0, 1);
              c += s[d];
            }
            (o = l(o, 2 + c.length)), (c = parseInt(c));
            var u = l(o, 0, c);
            if (a)
              try {
                u = String.fromCharCode.apply(null, new Uint8Array(u));
              } catch (e) {
                var p = new Uint8Array(u);
                for (u = "", d = 0; d < p.length; d++)
                  u += String.fromCharCode(p[d]);
              }
            i.push(u), (o = l(o, c));
          }
          var h = i.length;
          i.forEach(function (e, o) {
            r(t.decodePacket(e, n, !0), o, h);
          });
        });
    },
    function (e, t) {
      e.exports =
        Object.keys ||
        function (e) {
          var t = [],
            n = Object.prototype.hasOwnProperty;
          for (var r in e) n.call(e, r) && t.push(r);
          return t;
        };
    },
    function (e, t, n) {
      function r(e) {
        if (!e || "object" != typeof e) return !1;
        if (o(e)) {
          for (var t = 0, n = e.length; t < n; t++) if (r(e[t])) return !0;
          return !1;
        }
        if (
          ("function" == typeof Buffer &&
            Buffer.isBuffer &&
            Buffer.isBuffer(e)) ||
          ("function" == typeof ArrayBuffer && e instanceof ArrayBuffer) ||
          (s && e instanceof Blob) ||
          (a && e instanceof File)
        )
          return !0;
        if (e.toJSON && "function" == typeof e.toJSON && 1 === arguments.length)
          return r(e.toJSON(), !0);
        for (var i in e)
          if (Object.prototype.hasOwnProperty.call(e, i) && r(e[i])) return !0;
        return !1;
      }
      var o = n(13),
        i = Object.prototype.toString,
        s =
          "function" == typeof Blob ||
          ("undefined" != typeof Blob &&
            "[object BlobConstructor]" === i.call(Blob)),
        a =
          "function" == typeof File ||
          ("undefined" != typeof File &&
            "[object FileConstructor]" === i.call(File));
      e.exports = r;
    },
    function (e, t) {
      e.exports = function (e, t, n) {
        var r = e.byteLength;
        if (((t = t || 0), (n = n || r), e.slice)) return e.slice(t, n);
        if (
          (t < 0 && (t += r),
          n < 0 && (n += r),
          n > r && (n = r),
          t >= r || t >= n || 0 === r)
        )
          return new ArrayBuffer(0);
        for (
          var o = new Uint8Array(e), i = new Uint8Array(n - t), s = t, a = 0;
          s < n;
          s++, a++
        )
          i[a] = o[s];
        return i.buffer;
      };
    },
    function (e, t) {
      function n(e, t, n) {
        function o(e, r) {
          if (o.count <= 0) throw new Error("after called too many times");
          --o.count,
            e ? ((i = !0), t(e), (t = n)) : 0 !== o.count || i || t(null, r);
        }
        var i = !1;
        return (n = n || r), (o.count = e), 0 === e ? t() : o;
      }
      function r() {}
      e.exports = n;
    },
    function (e, t) {
      function n(e) {
        for (var t, n, r = [], o = 0, i = e.length; o < i; )
          (t = e.charCodeAt(o++)) >= 55296 && t <= 56319 && o < i
            ? 56320 == (64512 & (n = e.charCodeAt(o++)))
              ? r.push(((1023 & t) << 10) + (1023 & n) + 65536)
              : (r.push(t), o--)
            : r.push(t);
        return r;
      }
      function r(e) {
        for (var t, n = e.length, r = -1, o = ""; ++r < n; )
          (t = e[r]) > 65535 &&
            ((o += f((((t -= 65536) >>> 10) & 1023) | 55296)),
            (t = 56320 | (1023 & t))),
            (o += f(t));
        return o;
      }
      function o(e, t) {
        if (e >= 55296 && e <= 57343) {
          if (t)
            throw Error(
              "Lone surrogate U+" +
                e.toString(16).toUpperCase() +
                " is not a scalar value"
            );
          return !1;
        }
        return !0;
      }
      function i(e, t) {
        return f(((e >> t) & 63) | 128);
      }
      function s(e, t) {
        if (0 == (4294967168 & e)) return f(e);
        var n = "";
        return (
          0 == (4294965248 & e)
            ? (n = f(((e >> 6) & 31) | 192))
            : 0 == (4294901760 & e)
            ? (o(e, t) || (e = 65533),
              (n = f(((e >> 12) & 15) | 224)),
              (n += i(e, 6)))
            : 0 == (4292870144 & e) &&
              ((n = f(((e >> 18) & 7) | 240)), (n += i(e, 12)), (n += i(e, 6))),
          n + f((63 & e) | 128)
        );
      }
      function a(e, t) {
        for (
          var r = !1 !== (t = t || {}).strict,
            o = n(e),
            i = o.length,
            a = -1,
            c = "";
          ++a < i;

        )
          c += s(o[a], r);
        return c;
      }
      function c() {
        if (h >= l) throw Error("Invalid byte index");
        var e = 255 & p[h];
        if ((h++, 128 == (192 & e))) return 63 & e;
        throw Error("Invalid continuation byte");
      }
      function d(e) {
        var t, n;
        if (h > l) throw Error("Invalid byte index");
        if (h == l) return !1;
        if (((t = 255 & p[h]), h++, 0 == (128 & t))) return t;
        if (192 == (224 & t)) {
          if ((n = ((31 & t) << 6) | c()) >= 128) return n;
          throw Error("Invalid continuation byte");
        }
        if (224 == (240 & t)) {
          if ((n = ((15 & t) << 12) | (c() << 6) | c()) >= 2048)
            return o(n, e) ? n : 65533;
          throw Error("Invalid continuation byte");
        }
        if (
          240 == (248 & t) &&
          (n = ((7 & t) << 18) | (c() << 12) | (c() << 6) | c()) >= 65536 &&
          n <= 1114111
        )
          return n;
        throw Error("Invalid UTF-8 detected");
      }
      function u(e, t) {
        var o = !1 !== (t = t || {}).strict;
        (p = n(e)), (l = p.length), (h = 0);
        for (var i, s = []; !1 !== (i = d(o)); ) s.push(i);
        return r(s);
      }
      var p,
        l,
        h,
        f = String.fromCharCode;
      e.exports = { version: "2.1.2", encode: a, decode: u };
    },
    function (e, t) {
      !(function () {
        for (
          var e =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
            n = new Uint8Array(256),
            r = 0;
          r < e.length;
          r++
        )
          n[e.charCodeAt(r)] = r;
        (t.encode = function (t) {
          var n,
            r = new Uint8Array(t),
            o = r.length,
            i = "";
          for (n = 0; n < o; n += 3)
            (i += e[r[n] >> 2]),
              (i += e[((3 & r[n]) << 4) | (r[n + 1] >> 4)]),
              (i += e[((15 & r[n + 1]) << 2) | (r[n + 2] >> 6)]),
              (i += e[63 & r[n + 2]]);
          return (
            o % 3 == 2
              ? (i = i.substring(0, i.length - 1) + "=")
              : o % 3 == 1 && (i = i.substring(0, i.length - 2) + "=="),
            i
          );
        }),
          (t.decode = function (e) {
            var t,
              r,
              o,
              i,
              s,
              a = 0.75 * e.length,
              c = e.length,
              d = 0;
            "=" === e[e.length - 1] && (a--, "=" === e[e.length - 2] && a--);
            var u = new ArrayBuffer(a),
              p = new Uint8Array(u);
            for (t = 0; t < c; t += 4)
              (r = n[e.charCodeAt(t)]),
                (o = n[e.charCodeAt(t + 1)]),
                (i = n[e.charCodeAt(t + 2)]),
                (s = n[e.charCodeAt(t + 3)]),
                (p[d++] = (r << 2) | (o >> 4)),
                (p[d++] = ((15 & o) << 4) | (i >> 2)),
                (p[d++] = ((3 & i) << 6) | (63 & s));
            return u;
          });
      })();
    },
    function (e, t) {
      function n(e) {
        return e.map(function (e) {
          if (e.buffer instanceof ArrayBuffer) {
            var t = e.buffer;
            if (e.byteLength !== t.byteLength) {
              var n = new Uint8Array(e.byteLength);
              n.set(new Uint8Array(t, e.byteOffset, e.byteLength)),
                (t = n.buffer);
            }
            return t;
          }
          return e;
        });
      }
      function r(e, t) {
        t = t || {};
        var r = new i();
        return (
          n(e).forEach(function (e) {
            r.append(e);
          }),
          t.type ? r.getBlob(t.type) : r.getBlob()
        );
      }
      function o(e, t) {
        return new Blob(n(e), t || {});
      }
      var i =
          void 0 !== i
            ? i
            : "undefined" != typeof WebKitBlobBuilder
            ? WebKitBlobBuilder
            : "undefined" != typeof MSBlobBuilder
            ? MSBlobBuilder
            : "undefined" != typeof MozBlobBuilder && MozBlobBuilder,
        s = (function () {
          try {
            return 2 === new Blob(["hi"]).size;
          } catch (e) {
            return !1;
          }
        })(),
        a =
          s &&
          (function () {
            try {
              return 2 === new Blob([new Uint8Array([1, 2])]).size;
            } catch (e) {
              return !1;
            }
          })(),
        c = i && i.prototype.append && i.prototype.getBlob;
      "undefined" != typeof Blob &&
        ((r.prototype = Blob.prototype), (o.prototype = Blob.prototype)),
        (e.exports = s ? (a ? Blob : o) : c ? r : void 0);
    },
    function (e, t) {
      (t.encode = function (e) {
        var t = "";
        for (var n in e)
          e.hasOwnProperty(n) &&
            (t.length && (t += "&"),
            (t += encodeURIComponent(n) + "=" + encodeURIComponent(e[n])));
        return t;
      }),
        (t.decode = function (e) {
          for (var t = {}, n = e.split("&"), r = 0, o = n.length; r < o; r++) {
            var i = n[r].split("=");
            t[decodeURIComponent(i[0])] = decodeURIComponent(i[1]);
          }
          return t;
        });
    },
    function (e, t) {
      e.exports = function (e, t) {
        var n = function () {};
        (n.prototype = t.prototype),
          (e.prototype = new n()),
          (e.prototype.constructor = e);
      };
    },
    function (e, t) {
      function n(e) {
        var t = "";
        do {
          (t = s[e % a] + t), (e = Math.floor(e / a));
        } while (e > 0);
        return t;
      }
      function r(e) {
        var t = 0;
        for (u = 0; u < e.length; u++) t = t * a + c[e.charAt(u)];
        return t;
      }
      function o() {
        var e = n(+new Date());
        return e !== i ? ((d = 0), (i = e)) : e + "." + n(d++);
      }
      for (
        var i,
          s =
            "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(
              ""
            ),
          a = 64,
          c = {},
          d = 0,
          u = 0;
        u < a;
        u++
      )
        c[s[u]] = u;
      (o.encode = n), (o.decode = r), (e.exports = o);
    },
    function (e, t, n) {
      (function (t) {
        function r() {}
        function o() {
          return "undefined" != typeof self
            ? self
            : "undefined" != typeof window
            ? window
            : void 0 !== t
            ? t
            : {};
        }
        function i(e) {
          if ((s.call(this, e), (this.query = this.query || {}), !c)) {
            var t = o();
            c = t.___eio = t.___eio || [];
          }
          this.index = c.length;
          var n = this;
          c.push(function (e) {
            n.onData(e);
          }),
            (this.query.j = this.index),
            "function" == typeof addEventListener &&
              addEventListener(
                "beforeunload",
                function () {
                  n.script && (n.script.onerror = r);
                },
                !1
              );
        }
        var s = n(22),
          a = n(33);
        e.exports = i;
        var c,
          d = /\n/g,
          u = /\\n/g;
        a(i, s),
          (i.prototype.supportsBinary = !1),
          (i.prototype.doClose = function () {
            this.script &&
              (this.script.parentNode.removeChild(this.script),
              (this.script = null)),
              this.form &&
                (this.form.parentNode.removeChild(this.form),
                (this.form = null),
                (this.iframe = null)),
              s.prototype.doClose.call(this);
          }),
          (i.prototype.doPoll = function () {
            var e = this,
              t = document.createElement("script");
            this.script &&
              (this.script.parentNode.removeChild(this.script),
              (this.script = null)),
              (t.async = !0),
              (t.src = this.uri()),
              (t.onerror = function (t) {
                e.onError("jsonp poll error", t);
              });
            var n = document.getElementsByTagName("script")[0];
            n
              ? n.parentNode.insertBefore(t, n)
              : (document.head || document.body).appendChild(t),
              (this.script = t),
              "undefined" != typeof navigator &&
                /gecko/i.test(navigator.userAgent) &&
                setTimeout(function () {
                  var e = document.createElement("iframe");
                  document.body.appendChild(e), document.body.removeChild(e);
                }, 100);
          }),
          (i.prototype.doWrite = function (e, t) {
            function n() {
              r(), t();
            }
            function r() {
              if (o.iframe)
                try {
                  o.form.removeChild(o.iframe);
                } catch (e) {
                  o.onError("jsonp polling iframe removal error", e);
                }
              try {
                var e = '<iframe src="javascript:0" name="' + o.iframeId + '">';
                i = document.createElement(e);
              } catch (e) {
                ((i = document.createElement("iframe")).name = o.iframeId),
                  (i.src = "javascript:0");
              }
              (i.id = o.iframeId), o.form.appendChild(i), (o.iframe = i);
            }
            var o = this;
            if (!this.form) {
              var i,
                s = document.createElement("form"),
                a = document.createElement("textarea"),
                c = (this.iframeId = "eio_iframe_" + this.index);
              (s.className = "socketio"),
                (s.style.position = "absolute"),
                (s.style.top = "-1000px"),
                (s.style.left = "-1000px"),
                (s.target = c),
                (s.method = "POST"),
                s.setAttribute("accept-charset", "utf-8"),
                (a.name = "d"),
                s.appendChild(a),
                document.body.appendChild(s),
                (this.form = s),
                (this.area = a);
            }
            (this.form.action = this.uri()),
              r(),
              (e = e.replace(u, "\\\n")),
              (this.area.value = e.replace(d, "\\n"));
            try {
              this.form.submit();
            } catch (e) {}
            this.iframe.attachEvent
              ? (this.iframe.onreadystatechange = function () {
                  "complete" === o.iframe.readyState && n();
                })
              : (this.iframe.onload = n);
          });
      }).call(
        t,
        (function () {
          return this;
        })()
      );
    },
    function (e, t, n) {
      function r(e) {
        e && e.forceBase64 && (this.supportsBinary = !1),
          (this.perMessageDeflate = e.perMessageDeflate),
          (this.usingBrowserWebSocket = o && !e.forceNode),
          (this.protocols = e.protocols),
          this.usingBrowserWebSocket || (l = i),
          s.call(this, e);
      }
      var o,
        i,
        s = n(23),
        a = n(24),
        c = n(32),
        d = n(33),
        u = n(34),
        p = n(3)("engine.io-client:websocket");
      if (
        ("undefined" != typeof WebSocket
          ? (o = WebSocket)
          : "undefined" != typeof self &&
            (o = self.WebSocket || self.MozWebSocket),
        "undefined" == typeof window)
      )
        try {
          i = n(37);
        } catch (e) {}
      var l = o || i;
      (e.exports = r),
        d(r, s),
        (r.prototype.name = "websocket"),
        (r.prototype.supportsBinary = !0),
        (r.prototype.doOpen = function () {
          if (this.check()) {
            var e = this.uri(),
              t = this.protocols,
              n = {
                agent: this.agent,
                perMessageDeflate: this.perMessageDeflate,
              };
            (n.pfx = this.pfx),
              (n.key = this.key),
              (n.passphrase = this.passphrase),
              (n.cert = this.cert),
              (n.ca = this.ca),
              (n.ciphers = this.ciphers),
              (n.rejectUnauthorized = this.rejectUnauthorized),
              this.extraHeaders && (n.headers = this.extraHeaders),
              this.localAddress && (n.localAddress = this.localAddress);
            try {
              this.ws =
                this.usingBrowserWebSocket && !this.isReactNative
                  ? t
                    ? new l(e, t)
                    : new l(e)
                  : new l(e, t, n);
            } catch (e) {
              return this.emit("error", e);
            }
            void 0 === this.ws.binaryType && (this.supportsBinary = !1),
              this.ws.supports && this.ws.supports.binary
                ? ((this.supportsBinary = !0),
                  (this.ws.binaryType = "nodebuffer"))
                : (this.ws.binaryType = "arraybuffer"),
              this.addEventListeners();
          }
        }),
        (r.prototype.addEventListeners = function () {
          var e = this;
          (this.ws.onopen = function () {
            e.onOpen();
          }),
            (this.ws.onclose = function () {
              e.onClose();
            }),
            (this.ws.onmessage = function (t) {
              e.onData(t.data);
            }),
            (this.ws.onerror = function (t) {
              e.onError("websocket error", t);
            });
        }),
        (r.prototype.write = function (e) {
          function t() {
            n.emit("flush"),
              setTimeout(function () {
                (n.writable = !0), n.emit("drain");
              }, 0);
          }
          var n = this;
          this.writable = !1;
          for (var r = e.length, o = 0, i = r; o < i; o++)
            !(function (e) {
              a.encodePacket(e, n.supportsBinary, function (o) {
                if (!n.usingBrowserWebSocket) {
                  var i = {};
                  e.options && (i.compress = e.options.compress),
                    n.perMessageDeflate &&
                      ("string" == typeof o ? Buffer.byteLength(o) : o.length) <
                        n.perMessageDeflate.threshold &&
                      (i.compress = !1);
                }
                try {
                  n.usingBrowserWebSocket ? n.ws.send(o) : n.ws.send(o, i);
                } catch (e) {
                  p("websocket closed before onclose event");
                }
                --r || t();
              });
            })(e[o]);
        }),
        (r.prototype.onClose = function () {
          s.prototype.onClose.call(this);
        }),
        (r.prototype.doClose = function () {
          void 0 !== this.ws && this.ws.close();
        }),
        (r.prototype.uri = function () {
          var e = this.query || {},
            t = this.secure ? "wss" : "ws",
            n = "";
          return (
            this.port &&
              (("wss" === t && 443 !== Number(this.port)) ||
                ("ws" === t && 80 !== Number(this.port))) &&
              (n = ":" + this.port),
            this.timestampRequests && (e[this.timestampParam] = u()),
            this.supportsBinary || (e.b64 = 1),
            (e = c.encode(e)).length && (e = "?" + e),
            t +
              "://" +
              (-1 !== this.hostname.indexOf(":")
                ? "[" + this.hostname + "]"
                : this.hostname) +
              n +
              this.path +
              e
          );
        }),
        (r.prototype.check = function () {
          return !(
            !l ||
            ("__initialize" in l && this.name === r.prototype.name)
          );
        });
    },
    function (e, t) {},
    function (e, t) {
      var n = [].indexOf;
      e.exports = function (e, t) {
        if (n) return e.indexOf(t);
        for (var r = 0; r < e.length; ++r) if (e[r] === t) return r;
        return -1;
      };
    },
    function (e, t, n) {
      function r(e, t, n) {
        (this.io = e),
          (this.nsp = t),
          (this.json = this),
          (this.ids = 0),
          (this.acks = {}),
          (this.receiveBuffer = []),
          (this.sendBuffer = []),
          (this.connected = !1),
          (this.disconnected = !0),
          (this.flags = {}),
          n && n.query && (this.query = n.query),
          this.io.autoConnect && this.open();
      }
      var o = n(7),
        i = n(11),
        s = n(40),
        a = n(41),
        c = n(42),
        d = n(3)("socket.io-client:socket"),
        u = n(32),
        p = n(26);
      e.exports = r;
      var l = {
          connect: 1,
          connect_error: 1,
          connect_timeout: 1,
          connecting: 1,
          disconnect: 1,
          error: 1,
          reconnect: 1,
          reconnect_attempt: 1,
          reconnect_failed: 1,
          reconnect_error: 1,
          reconnecting: 1,
          ping: 1,
          pong: 1,
        },
        h = i.prototype.emit;
      i(r.prototype),
        (r.prototype.subEvents = function () {
          if (!this.subs) {
            var e = this.io;
            this.subs = [
              a(e, "open", c(this, "onopen")),
              a(e, "packet", c(this, "onpacket")),
              a(e, "close", c(this, "onclose")),
            ];
          }
        }),
        (r.prototype.open = r.prototype.connect =
          function () {
            return (
              this.connected ||
                (this.subEvents(),
                this.io.open(),
                "open" === this.io.readyState && this.onopen(),
                this.emit("connecting")),
              this
            );
          }),
        (r.prototype.send = function () {
          var e = s(arguments);
          return e.unshift("message"), this.emit.apply(this, e), this;
        }),
        (r.prototype.emit = function (e) {
          if (l.hasOwnProperty(e)) return h.apply(this, arguments), this;
          var t = s(arguments),
            n = {
              type: (void 0 !== this.flags.binary ? this.flags.binary : p(t))
                ? o.BINARY_EVENT
                : o.EVENT,
              data: t,
              options: {},
            };
          return (
            (n.options.compress = !this.flags || !1 !== this.flags.compress),
            "function" == typeof t[t.length - 1] &&
              (d("emitting packet with ack id %d", this.ids),
              (this.acks[this.ids] = t.pop()),
              (n.id = this.ids++)),
            this.connected ? this.packet(n) : this.sendBuffer.push(n),
            (this.flags = {}),
            this
          );
        }),
        (r.prototype.packet = function (e) {
          (e.nsp = this.nsp), this.io.packet(e);
        }),
        (r.prototype.onopen = function () {
          if ((d("transport is open - connecting"), "/" !== this.nsp))
            if (this.query) {
              var e =
                "object" == typeof this.query
                  ? u.encode(this.query)
                  : this.query;
              d("sending connect packet with query %s", e),
                this.packet({ type: o.CONNECT, query: e });
            } else this.packet({ type: o.CONNECT });
        }),
        (r.prototype.onclose = function (e) {
          d("close (%s)", e),
            (this.connected = !1),
            (this.disconnected = !0),
            delete this.id,
            this.emit("disconnect", e);
        }),
        (r.prototype.onpacket = function (e) {
          var t = e.nsp === this.nsp,
            n = e.type === o.ERROR && "/" === e.nsp;
          if (t || n)
            switch (e.type) {
              case o.CONNECT:
                this.onconnect();
                break;
              case o.EVENT:
              case o.BINARY_EVENT:
                this.onevent(e);
                break;
              case o.ACK:
              case o.BINARY_ACK:
                this.onack(e);
                break;
              case o.DISCONNECT:
                this.ondisconnect();
                break;
              case o.ERROR:
                this.emit("error", e.data);
            }
        }),
        (r.prototype.onevent = function (e) {
          var t = e.data || [];
          d("emitting event %j", t),
            null != e.id &&
              (d("attaching ack callback to event"), t.push(this.ack(e.id))),
            this.connected ? h.apply(this, t) : this.receiveBuffer.push(t);
        }),
        (r.prototype.ack = function (e) {
          var t = this,
            n = !1;
          return function () {
            if (!n) {
              n = !0;
              var r = s(arguments);
              d("sending ack %j", r),
                t.packet({ type: p(r) ? o.BINARY_ACK : o.ACK, id: e, data: r });
            }
          };
        }),
        (r.prototype.onack = function (e) {
          var t = this.acks[e.id];
          "function" == typeof t
            ? (d("calling ack %s with %j", e.id, e.data),
              t.apply(this, e.data),
              delete this.acks[e.id])
            : d("bad ack %s", e.id);
        }),
        (r.prototype.onconnect = function () {
          (this.connected = !0),
            (this.disconnected = !1),
            this.emit("connect"),
            this.emitBuffered();
        }),
        (r.prototype.emitBuffered = function () {
          var e;
          for (e = 0; e < this.receiveBuffer.length; e++)
            h.apply(this, this.receiveBuffer[e]);
          for (this.receiveBuffer = [], e = 0; e < this.sendBuffer.length; e++)
            this.packet(this.sendBuffer[e]);
          this.sendBuffer = [];
        }),
        (r.prototype.ondisconnect = function () {
          d("server disconnect (%s)", this.nsp),
            this.destroy(),
            this.onclose("io server disconnect");
        }),
        (r.prototype.destroy = function () {
          if (this.subs) {
            for (var e = 0; e < this.subs.length; e++) this.subs[e].destroy();
            this.subs = null;
          }
          this.io.destroy(this);
        }),
        (r.prototype.close = r.prototype.disconnect =
          function () {
            return (
              this.connected &&
                (d("performing disconnect (%s)", this.nsp),
                this.packet({ type: o.DISCONNECT })),
              this.destroy(),
              this.connected && this.onclose("io client disconnect"),
              this
            );
          }),
        (r.prototype.compress = function (e) {
          return (this.flags.compress = e), this;
        }),
        (r.prototype.binary = function (e) {
          return (this.flags.binary = e), this;
        });
    },
    function (e, t) {
      function n(e, t) {
        for (var n = [], r = (t = t || 0) || 0; r < e.length; r++)
          n[r - t] = e[r];
        return n;
      }
      e.exports = n;
    },
    function (e, t) {
      function n(e, t, n) {
        return (
          e.on(t, n),
          {
            destroy: function () {
              e.removeListener(t, n);
            },
          }
        );
      }
      e.exports = n;
    },
    function (e, t) {
      var n = [].slice;
      e.exports = function (e, t) {
        if (("string" == typeof t && (t = e[t]), "function" != typeof t))
          throw new Error("bind() requires a function");
        var r = n.call(arguments, 2);
        return function () {
          return t.apply(e, r.concat(n.call(arguments)));
        };
      };
    },
    function (e, t) {
      function n(e) {
        (e = e || {}),
          (this.ms = e.min || 100),
          (this.max = e.max || 1e4),
          (this.factor = e.factor || 2),
          (this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0),
          (this.attempts = 0);
      }
      (e.exports = n),
        (n.prototype.duration = function () {
          var e = this.ms * Math.pow(this.factor, this.attempts++);
          if (this.jitter) {
            var t = Math.random(),
              n = Math.floor(t * this.jitter * e);
            e = 0 == (1 & Math.floor(10 * t)) ? e - n : e + n;
          }
          return 0 | Math.min(e, this.max);
        }),
        (n.prototype.reset = function () {
          this.attempts = 0;
        }),
        (n.prototype.setMin = function (e) {
          this.ms = e;
        }),
        (n.prototype.setMax = function (e) {
          this.max = e;
        }),
        (n.prototype.setJitter = function (e) {
          this.jitter = e;
        });
    },
  ]);
});
let a = !0,
  c = !0;
function d(e, t, n) {
  const r = e.match(t);
  return r && r.length >= n && parseInt(r[n], 10);
}
function u(e, t, n) {
  if (!e.RTCPeerConnection) return;
  const r = e.RTCPeerConnection.prototype,
    o = r.addEventListener;
  r.addEventListener = function (e, r) {
    if (e !== t) return o.apply(this, arguments);
    const i = (e) => {
      const t = n(e);
      t && (r.handleEvent ? r.handleEvent(t) : r(t));
    };
    return (
      (this._eventMap = this._eventMap || {}),
      this._eventMap[t] || (this._eventMap[t] = new Map()),
      this._eventMap[t].set(r, i),
      o.apply(this, [e, i])
    );
  };
  const i = r.removeEventListener;
  (r.removeEventListener = function (e, n) {
    if (e !== t || !this._eventMap || !this._eventMap[t])
      return i.apply(this, arguments);
    if (!this._eventMap[t].has(n)) return i.apply(this, arguments);
    const r = this._eventMap[t].get(n);
    return (
      this._eventMap[t].delete(n),
      0 === this._eventMap[t].size && delete this._eventMap[t],
      0 === Object.keys(this._eventMap).length && delete this._eventMap,
      i.apply(this, [e, r])
    );
  }),
    Object.defineProperty(r, "on" + t, {
      get() {
        return this["_on" + t];
      },
      set(e) {
        this["_on" + t] &&
          (this.removeEventListener(t, this["_on" + t]),
          delete this["_on" + t]),
          e && this.addEventListener(t, (this["_on" + t] = e));
      },
      enumerable: !0,
      configurable: !0,
    });
}
function p(e) {
  return "boolean" != typeof e
    ? new Error("Argument type: " + typeof e + ". Please use a boolean.")
    : ((a = e),
      e ? "adapter.js logging disabled" : "adapter.js logging enabled");
}
function l(e) {
  return "boolean" != typeof e
    ? new Error("Argument type: " + typeof e + ". Please use a boolean.")
    : ((c = !e),
      "adapter.js deprecation warnings " + (e ? "disabled" : "enabled"));
}
function h() {
  if ("object" == typeof window) {
    if (a) return;
    "undefined" != typeof console &&
      "function" == typeof console.log &&
      console.log.apply(console, arguments);
  }
}
function f(e, t) {
  c && console.warn(e + " is deprecated, please use " + t + " instead.");
}
function m(e) {
  return "[object Object]" === Object.prototype.toString.call(e);
}
function g(e) {
  return m(e)
    ? Object.keys(e).reduce(function (t, n) {
        const r = m(e[n]),
          o = r ? g(e[n]) : e[n],
          i = r && !Object.keys(o).length;
        return void 0 === o || i ? t : Object.assign(t, { [n]: o });
      }, {})
    : e;
}
function v(e, t, n) {
  t &&
    !n.has(t.id) &&
    (n.set(t.id, t),
    Object.keys(t).forEach((r) => {
      r.endsWith("Id")
        ? v(e, e.get(t[r]), n)
        : r.endsWith("Ids") &&
          t[r].forEach((t) => {
            v(e, e.get(t), n);
          });
    }));
}
function y(e, t, n) {
  const r = n ? "outbound-rtp" : "inbound-rtp",
    o = new Map();
  if (null === t) return o;
  const i = [];
  return (
    e.forEach((e) => {
      "track" === e.type && e.trackIdentifier === t.id && i.push(e);
    }),
    i.forEach((t) => {
      e.forEach((n) => {
        n.type === r && n.trackId === t.id && v(e, n, o);
      });
    }),
    o
  );
}
const b = h;
function C(e, t) {
  const n = e && e.navigator;
  if (!n.mediaDevices) return;
  const r = function (e) {
      if ("object" != typeof e || e.mandatory || e.optional) return e;
      const t = {};
      return (
        Object.keys(e).forEach((n) => {
          if ("require" === n || "advanced" === n || "mediaSource" === n)
            return;
          const r = "object" == typeof e[n] ? e[n] : { ideal: e[n] };
          void 0 !== r.exact &&
            "number" == typeof r.exact &&
            (r.min = r.max = r.exact);
          const o = function (e, t) {
            return e
              ? e + t.charAt(0).toUpperCase() + t.slice(1)
              : "deviceId" === t
              ? "sourceId"
              : t;
          };
          if (void 0 !== r.ideal) {
            t.optional = t.optional || [];
            let e = {};
            "number" == typeof r.ideal
              ? ((e[o("min", n)] = r.ideal),
                t.optional.push(e),
                (e = {}),
                (e[o("max", n)] = r.ideal),
                t.optional.push(e))
              : ((e[o("", n)] = r.ideal), t.optional.push(e));
          }
          void 0 !== r.exact && "number" != typeof r.exact
            ? ((t.mandatory = t.mandatory || {}),
              (t.mandatory[o("", n)] = r.exact))
            : ["min", "max"].forEach((e) => {
                void 0 !== r[e] &&
                  ((t.mandatory = t.mandatory || {}),
                  (t.mandatory[o(e, n)] = r[e]));
              });
        }),
        e.advanced && (t.optional = (t.optional || []).concat(e.advanced)),
        t
      );
    },
    o = function (e, o) {
      if (t.version >= 61) return o(e);
      if ((e = JSON.parse(JSON.stringify(e))) && "object" == typeof e.audio) {
        const t = function (e, t, n) {
          t in e && !(n in e) && ((e[n] = e[t]), delete e[t]);
        };
        t(
          (e = JSON.parse(JSON.stringify(e))).audio,
          "autoGainControl",
          "googAutoGainControl"
        ),
          t(e.audio, "noiseSuppression", "googNoiseSuppression"),
          (e.audio = r(e.audio));
      }
      if (e && "object" == typeof e.video) {
        let i = e.video.facingMode;
        i = i && ("object" == typeof i ? i : { ideal: i });
        const s = t.version < 66;
        if (
          i &&
          ("user" === i.exact ||
            "environment" === i.exact ||
            "user" === i.ideal ||
            "environment" === i.ideal) &&
          (!n.mediaDevices.getSupportedConstraints ||
            !n.mediaDevices.getSupportedConstraints().facingMode ||
            s)
        ) {
          let t;
          if (
            (delete e.video.facingMode,
            "environment" === i.exact || "environment" === i.ideal
              ? (t = ["back", "rear"])
              : ("user" !== i.exact && "user" !== i.ideal) || (t = ["front"]),
            t)
          )
            return n.mediaDevices.enumerateDevices().then((n) => {
              let s = (n = n.filter((e) => "videoinput" === e.kind)).find((e) =>
                t.some((t) => e.label.toLowerCase().includes(t))
              );
              return (
                !s && n.length && t.includes("back") && (s = n[n.length - 1]),
                s &&
                  (e.video.deviceId = i.exact
                    ? { exact: s.deviceId }
                    : { ideal: s.deviceId }),
                (e.video = r(e.video)),
                b("chrome: " + JSON.stringify(e)),
                o(e)
              );
            });
        }
        e.video = r(e.video);
      }
      return b("chrome: " + JSON.stringify(e)), o(e);
    },
    i = function (e) {
      return t.version >= 64
        ? e
        : {
            name:
              {
                PermissionDeniedError: "NotAllowedError",
                PermissionDismissedError: "NotAllowedError",
                InvalidStateError: "NotAllowedError",
                DevicesNotFoundError: "NotFoundError",
                ConstraintNotSatisfiedError: "OverconstrainedError",
                TrackStartError: "NotReadableError",
                MediaDeviceFailedDueToShutdown: "NotAllowedError",
                MediaDeviceKillSwitchOn: "NotAllowedError",
                TabCaptureError: "AbortError",
                ScreenCaptureError: "AbortError",
                DeviceCaptureError: "AbortError",
              }[e.name] || e.name,
            message: e.message,
            constraint: e.constraint || e.constraintName,
            toString() {
              return this.name + (this.message && ": ") + this.message;
            },
          };
    };
  if (
    ((n.getUserMedia = function (e, t, r) {
      o(e, (e) => {
        n.webkitGetUserMedia(e, t, (e) => {
          r && r(i(e));
        });
      });
    }.bind(n)),
    n.mediaDevices.getUserMedia)
  ) {
    const e = n.mediaDevices.getUserMedia.bind(n.mediaDevices);
    n.mediaDevices.getUserMedia = function (t) {
      return o(t, (t) =>
        e(t).then(
          (e) => {
            if (
              (t.audio && !e.getAudioTracks().length) ||
              (t.video && !e.getVideoTracks().length)
            )
              throw (
                (e.getTracks().forEach((e) => {
                  e.stop();
                }),
                new DOMException("", "NotFoundError"))
              );
            return e;
          },
          (e) => Promise.reject(i(e))
        )
      );
    };
  }
}
function w(e) {
  e.MediaStream = e.MediaStream || e.webkitMediaStream;
}
function S(e) {
  if (
    "object" == typeof e &&
    e.RTCPeerConnection &&
    !("ontrack" in e.RTCPeerConnection.prototype)
  ) {
    Object.defineProperty(e.RTCPeerConnection.prototype, "ontrack", {
      get() {
        return this._ontrack;
      },
      set(e) {
        this._ontrack && this.removeEventListener("track", this._ontrack),
          this.addEventListener("track", (this._ontrack = e));
      },
      enumerable: !0,
      configurable: !0,
    });
    const t = e.RTCPeerConnection.prototype.setRemoteDescription;
    e.RTCPeerConnection.prototype.setRemoteDescription = function () {
      return (
        this._ontrackpoly ||
          ((this._ontrackpoly = (t) => {
            t.stream.addEventListener("addtrack", (n) => {
              let r;
              r = e.RTCPeerConnection.prototype.getReceivers
                ? this.getReceivers().find(
                    (e) => e.track && e.track.id === n.track.id
                  )
                : { track: n.track };
              const o = new Event("track");
              (o.track = n.track),
                (o.receiver = r),
                (o.transceiver = { receiver: r }),
                (o.streams = [t.stream]),
                this.dispatchEvent(o);
            }),
              t.stream.getTracks().forEach((n) => {
                let r;
                r = e.RTCPeerConnection.prototype.getReceivers
                  ? this.getReceivers().find(
                      (e) => e.track && e.track.id === n.id
                    )
                  : { track: n };
                const o = new Event("track");
                (o.track = n),
                  (o.receiver = r),
                  (o.transceiver = { receiver: r }),
                  (o.streams = [t.stream]),
                  this.dispatchEvent(o);
              });
          }),
          this.addEventListener("addstream", this._ontrackpoly)),
        t.apply(this, arguments)
      );
    };
  } else
    u(
      e,
      "track",
      (e) => (
        e.transceiver ||
          Object.defineProperty(e, "transceiver", {
            value: { receiver: e.receiver },
          }),
        e
      )
    );
}
function k(e) {
  if (
    "object" == typeof e &&
    e.RTCPeerConnection &&
    !("getSenders" in e.RTCPeerConnection.prototype) &&
    "createDTMFSender" in e.RTCPeerConnection.prototype
  ) {
    const t = function (e, t) {
      return {
        track: t,
        get dtmf() {
          return (
            void 0 === this._dtmf &&
              ("audio" === t.kind
                ? (this._dtmf = e.createDTMFSender(t))
                : (this._dtmf = null)),
            this._dtmf
          );
        },
        _pc: e,
      };
    };
    if (!e.RTCPeerConnection.prototype.getSenders) {
      e.RTCPeerConnection.prototype.getSenders = function () {
        return (this._senders = this._senders || []), this._senders.slice();
      };
      const n = e.RTCPeerConnection.prototype.addTrack;
      e.RTCPeerConnection.prototype.addTrack = function (e, r) {
        let o = n.apply(this, arguments);
        return o || ((o = t(this, e)), this._senders.push(o)), o;
      };
      const r = e.RTCPeerConnection.prototype.removeTrack;
      e.RTCPeerConnection.prototype.removeTrack = function (e) {
        r.apply(this, arguments);
        const t = this._senders.indexOf(e);
        -1 !== t && this._senders.splice(t, 1);
      };
    }
    const n = e.RTCPeerConnection.prototype.addStream;
    e.RTCPeerConnection.prototype.addStream = function (e) {
      (this._senders = this._senders || []),
        n.apply(this, [e]),
        e.getTracks().forEach((e) => {
          this._senders.push(t(this, e));
        });
    };
    const r = e.RTCPeerConnection.prototype.removeStream;
    e.RTCPeerConnection.prototype.removeStream = function (e) {
      (this._senders = this._senders || []),
        r.apply(this, [e]),
        e.getTracks().forEach((e) => {
          const t = this._senders.find((t) => t.track === e);
          t && this._senders.splice(this._senders.indexOf(t), 1);
        });
    };
  } else if (
    "object" == typeof e &&
    e.RTCPeerConnection &&
    "getSenders" in e.RTCPeerConnection.prototype &&
    "createDTMFSender" in e.RTCPeerConnection.prototype &&
    e.RTCRtpSender &&
    !("dtmf" in e.RTCRtpSender.prototype)
  ) {
    const t = e.RTCPeerConnection.prototype.getSenders;
    (e.RTCPeerConnection.prototype.getSenders = function () {
      const e = t.apply(this, []);
      return e.forEach((e) => (e._pc = this)), e;
    }),
      Object.defineProperty(e.RTCRtpSender.prototype, "dtmf", {
        get() {
          return (
            void 0 === this._dtmf &&
              ("audio" === this.track.kind
                ? (this._dtmf = this._pc.createDTMFSender(this.track))
                : (this._dtmf = null)),
            this._dtmf
          );
        },
      });
  }
}
function T(e) {
  if (!e.RTCPeerConnection) return;
  const t = e.RTCPeerConnection.prototype.getStats;
  e.RTCPeerConnection.prototype.getStats = function () {
    const [e, n, r] = arguments;
    if (arguments.length > 0 && "function" == typeof e)
      return t.apply(this, arguments);
    if (0 === t.length && (0 === arguments.length || "function" != typeof e))
      return t.apply(this, []);
    const o = function (e) {
        const t = {};
        return (
          e.result().forEach((e) => {
            const n = {
              id: e.id,
              timestamp: e.timestamp,
              type:
                {
                  localcandidate: "local-candidate",
                  remotecandidate: "remote-candidate",
                }[e.type] || e.type,
            };
            e.names().forEach((t) => {
              n[t] = e.stat(t);
            }),
              (t[n.id] = n);
          }),
          t
        );
      },
      i = function (e) {
        return new Map(Object.keys(e).map((t) => [t, e[t]]));
      };
    if (arguments.length >= 2) {
      const r = function (e) {
        n(i(o(e)));
      };
      return t.apply(this, [r, e]);
    }
    return new Promise((e, n) => {
      t.apply(this, [
        function (t) {
          e(i(o(t)));
        },
        n,
      ]);
    }).then(n, r);
  };
}
function R(e) {
  if (
    !(
      "object" == typeof e &&
      e.RTCPeerConnection &&
      e.RTCRtpSender &&
      e.RTCRtpReceiver
    )
  )
    return;
  if (!("getStats" in e.RTCRtpSender.prototype)) {
    const t = e.RTCPeerConnection.prototype.getSenders;
    t &&
      (e.RTCPeerConnection.prototype.getSenders = function () {
        const e = t.apply(this, []);
        return e.forEach((e) => (e._pc = this)), e;
      });
    const n = e.RTCPeerConnection.prototype.addTrack;
    n &&
      (e.RTCPeerConnection.prototype.addTrack = function () {
        const e = n.apply(this, arguments);
        return (e._pc = this), e;
      }),
      (e.RTCRtpSender.prototype.getStats = function () {
        const e = this;
        return this._pc.getStats().then((t) => y(t, e.track, !0));
      });
  }
  if (!("getStats" in e.RTCRtpReceiver.prototype)) {
    const t = e.RTCPeerConnection.prototype.getReceivers;
    t &&
      (e.RTCPeerConnection.prototype.getReceivers = function () {
        const e = t.apply(this, []);
        return e.forEach((e) => (e._pc = this)), e;
      }),
      u(e, "track", (e) => ((e.receiver._pc = e.srcElement), e)),
      (e.RTCRtpReceiver.prototype.getStats = function () {
        const e = this;
        return this._pc.getStats().then((t) => y(t, e.track, !1));
      });
  }
  if (
    !("getStats" in e.RTCRtpSender.prototype) ||
    !("getStats" in e.RTCRtpReceiver.prototype)
  )
    return;
  const t = e.RTCPeerConnection.prototype.getStats;
  e.RTCPeerConnection.prototype.getStats = function () {
    if (arguments.length > 0 && arguments[0] instanceof e.MediaStreamTrack) {
      const e = arguments[0];
      let t, n, r;
      return (
        this.getSenders().forEach((n) => {
          n.track === e && (t ? (r = !0) : (t = n));
        }),
        this.getReceivers().forEach(
          (t) => (t.track === e && (n ? (r = !0) : (n = t)), t.track === e)
        ),
        r || (t && n)
          ? Promise.reject(
              new DOMException(
                "There are more than one sender or receiver for the track.",
                "InvalidAccessError"
              )
            )
          : t
          ? t.getStats()
          : n
          ? n.getStats()
          : Promise.reject(
              new DOMException(
                "There is no sender or receiver for the track.",
                "InvalidAccessError"
              )
            )
      );
    }
    return t.apply(this, arguments);
  };
}
function P(e) {
  e.RTCPeerConnection.prototype.getLocalStreams = function () {
    return (
      (this._shimmedLocalStreams = this._shimmedLocalStreams || {}),
      Object.keys(this._shimmedLocalStreams).map(
        (e) => this._shimmedLocalStreams[e][0]
      )
    );
  };
  const t = e.RTCPeerConnection.prototype.addTrack;
  e.RTCPeerConnection.prototype.addTrack = function (e, n) {
    if (!n) return t.apply(this, arguments);
    this._shimmedLocalStreams = this._shimmedLocalStreams || {};
    const r = t.apply(this, arguments);
    return (
      this._shimmedLocalStreams[n.id]
        ? -1 === this._shimmedLocalStreams[n.id].indexOf(r) &&
          this._shimmedLocalStreams[n.id].push(r)
        : (this._shimmedLocalStreams[n.id] = [n, r]),
      r
    );
  };
  const n = e.RTCPeerConnection.prototype.addStream;
  e.RTCPeerConnection.prototype.addStream = function (e) {
    (this._shimmedLocalStreams = this._shimmedLocalStreams || {}),
      e.getTracks().forEach((e) => {
        if (this.getSenders().find((t) => t.track === e))
          throw new DOMException("Track already exists.", "InvalidAccessError");
      });
    const t = this.getSenders();
    n.apply(this, arguments);
    const r = this.getSenders().filter((e) => -1 === t.indexOf(e));
    this._shimmedLocalStreams[e.id] = [e].concat(r);
  };
  const r = e.RTCPeerConnection.prototype.removeStream;
  e.RTCPeerConnection.prototype.removeStream = function (e) {
    return (
      (this._shimmedLocalStreams = this._shimmedLocalStreams || {}),
      delete this._shimmedLocalStreams[e.id],
      r.apply(this, arguments)
    );
  };
  const o = e.RTCPeerConnection.prototype.removeTrack;
  e.RTCPeerConnection.prototype.removeTrack = function (e) {
    return (
      (this._shimmedLocalStreams = this._shimmedLocalStreams || {}),
      e &&
        Object.keys(this._shimmedLocalStreams).forEach((t) => {
          const n = this._shimmedLocalStreams[t].indexOf(e);
          -1 !== n && this._shimmedLocalStreams[t].splice(n, 1),
            1 === this._shimmedLocalStreams[t].length &&
              delete this._shimmedLocalStreams[t];
        }),
      o.apply(this, arguments)
    );
  };
}
function _(e, t) {
  if (!e.RTCPeerConnection) return;
  if (e.RTCPeerConnection.prototype.addTrack && t.version >= 65) return P(e);
  const n = e.RTCPeerConnection.prototype.getLocalStreams;
  e.RTCPeerConnection.prototype.getLocalStreams = function () {
    const e = n.apply(this);
    return (
      (this._reverseStreams = this._reverseStreams || {}),
      e.map((e) => this._reverseStreams[e.id])
    );
  };
  const r = e.RTCPeerConnection.prototype.addStream;
  e.RTCPeerConnection.prototype.addStream = function (t) {
    if (
      ((this._streams = this._streams || {}),
      (this._reverseStreams = this._reverseStreams || {}),
      t.getTracks().forEach((e) => {
        if (this.getSenders().find((t) => t.track === e))
          throw new DOMException("Track already exists.", "InvalidAccessError");
      }),
      !this._reverseStreams[t.id])
    ) {
      const n = new e.MediaStream(t.getTracks());
      (this._streams[t.id] = n), (this._reverseStreams[n.id] = t), (t = n);
    }
    r.apply(this, [t]);
  };
  const o = e.RTCPeerConnection.prototype.removeStream;
  function i(e, t) {
    let n = t.sdp;
    return (
      Object.keys(e._reverseStreams || []).forEach((t) => {
        const r = e._reverseStreams[t],
          o = e._streams[r.id];
        n = n.replace(new RegExp(o.id, "g"), r.id);
      }),
      new RTCSessionDescription({ type: t.type, sdp: n })
    );
  }
  function s(e, t) {
    let n = t.sdp;
    return (
      Object.keys(e._reverseStreams || []).forEach((t) => {
        const r = e._reverseStreams[t],
          o = e._streams[r.id];
        n = n.replace(new RegExp(r.id, "g"), o.id);
      }),
      new RTCSessionDescription({ type: t.type, sdp: n })
    );
  }
  (e.RTCPeerConnection.prototype.removeStream = function (e) {
    (this._streams = this._streams || {}),
      (this._reverseStreams = this._reverseStreams || {}),
      o.apply(this, [this._streams[e.id] || e]),
      delete this._reverseStreams[
        this._streams[e.id] ? this._streams[e.id].id : e.id
      ],
      delete this._streams[e.id];
  }),
    (e.RTCPeerConnection.prototype.addTrack = function (t, n) {
      if ("closed" === this.signalingState)
        throw new DOMException(
          "The RTCPeerConnection's signalingState is 'closed'.",
          "InvalidStateError"
        );
      const r = [].slice.call(arguments, 1);
      if (1 !== r.length || !r[0].getTracks().find((e) => e === t))
        throw new DOMException(
          "The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.",
          "NotSupportedError"
        );
      const o = this.getSenders().find((e) => e.track === t);
      if (o)
        throw new DOMException("Track already exists.", "InvalidAccessError");
      (this._streams = this._streams || {}),
        (this._reverseStreams = this._reverseStreams || {});
      const i = this._streams[n.id];
      if (i)
        i.addTrack(t),
          Promise.resolve().then(() => {
            this.dispatchEvent(new Event("negotiationneeded"));
          });
      else {
        const r = new e.MediaStream([t]);
        (this._streams[n.id] = r),
          (this._reverseStreams[r.id] = n),
          this.addStream(r);
      }
      return this.getSenders().find((e) => e.track === t);
    }),
    ["createOffer", "createAnswer"].forEach(function (t) {
      const n = e.RTCPeerConnection.prototype[t],
        r = {
          [t]() {
            const e = arguments;
            return arguments.length && "function" == typeof arguments[0]
              ? n.apply(this, [
                  (t) => {
                    const n = i(this, t);
                    e[0].apply(null, [n]);
                  },
                  (t) => {
                    e[1] && e[1].apply(null, t);
                  },
                  arguments[2],
                ])
              : n.apply(this, arguments).then((e) => i(this, e));
          },
        };
      e.RTCPeerConnection.prototype[t] = r[t];
    });
  const a = e.RTCPeerConnection.prototype.setLocalDescription;
  e.RTCPeerConnection.prototype.setLocalDescription = function () {
    return arguments.length && arguments[0].type
      ? ((arguments[0] = s(this, arguments[0])), a.apply(this, arguments))
      : a.apply(this, arguments);
  };
  const c = Object.getOwnPropertyDescriptor(
    e.RTCPeerConnection.prototype,
    "localDescription"
  );
  Object.defineProperty(e.RTCPeerConnection.prototype, "localDescription", {
    get() {
      const e = c.get.apply(this);
      return "" === e.type ? e : i(this, e);
    },
  }),
    (e.RTCPeerConnection.prototype.removeTrack = function (e) {
      if ("closed" === this.signalingState)
        throw new DOMException(
          "The RTCPeerConnection's signalingState is 'closed'.",
          "InvalidStateError"
        );
      if (!e._pc)
        throw new DOMException(
          "Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.",
          "TypeError"
        );
      if (!(e._pc === this))
        throw new DOMException(
          "Sender was not created by this connection.",
          "InvalidAccessError"
        );
      let t;
      (this._streams = this._streams || {}),
        Object.keys(this._streams).forEach((n) => {
          this._streams[n].getTracks().find((t) => e.track === t) &&
            (t = this._streams[n]);
        }),
        t &&
          (1 === t.getTracks().length
            ? this.removeStream(this._reverseStreams[t.id])
            : t.removeTrack(e.track),
          this.dispatchEvent(new Event("negotiationneeded")));
    });
}
function A(e, t) {
  !e.RTCPeerConnection &&
    e.webkitRTCPeerConnection &&
    (e.RTCPeerConnection = e.webkitRTCPeerConnection),
    e.RTCPeerConnection &&
      t.version < 53 &&
      [
        "setLocalDescription",
        "setRemoteDescription",
        "addIceCandidate",
      ].forEach(function (t) {
        const n = e.RTCPeerConnection.prototype[t],
          r = {
            [t]() {
              return (
                (arguments[0] = new (
                  "addIceCandidate" === t
                    ? e.RTCIceCandidate
                    : e.RTCSessionDescription
                )(arguments[0])),
                n.apply(this, arguments)
              );
            },
          };
        e.RTCPeerConnection.prototype[t] = r[t];
      });
}
function x(e, t) {
  u(e, "negotiationneeded", (e) => {
    const n = e.target;
    if (
      !(
        t.version < 72 ||
        (n.getConfiguration && "plan-b" === n.getConfiguration().sdpSemantics)
      ) ||
      "stable" === n.signalingState
    )
      return e;
  });
}
var D = Object.freeze({
  __proto__: null,
  shimMediaStream: w,
  shimOnTrack: S,
  shimGetSendersWithDtmf: k,
  shimGetStats: T,
  shimSenderReceiverGetStats: R,
  shimAddTrackRemoveTrackWithNative: P,
  shimAddTrackRemoveTrack: _,
  shimPeerConnection: A,
  fixNegotiationNeeded: x,
  shimGetUserMedia: C,
  shimGetDisplayMedia: function (e, t) {
    (e.navigator.mediaDevices &&
      "getDisplayMedia" in e.navigator.mediaDevices) ||
      (e.navigator.mediaDevices &&
        ("function" == typeof t
          ? (e.navigator.mediaDevices.getDisplayMedia = function (n) {
              return t(n).then((t) => {
                const r = n.video && n.video.width,
                  o = n.video && n.video.height,
                  i = n.video && n.video.frameRate;
                return (
                  (n.video = {
                    mandatory: {
                      chromeMediaSource: "desktop",
                      chromeMediaSourceId: t,
                      maxFrameRate: i || 3,
                    },
                  }),
                  r && (n.video.mandatory.maxWidth = r),
                  o && (n.video.mandatory.maxHeight = o),
                  e.navigator.mediaDevices.getUserMedia(n)
                );
              });
            })
          : console.error(
              "shimGetDisplayMedia: getSourceId argument is not a function"
            )));
  },
});
function E(e, t) {
  const n = e && e.navigator,
    r = e && e.MediaStreamTrack;
  if (
    ((n.getUserMedia = function (e, t, r) {
      f("navigator.getUserMedia", "navigator.mediaDevices.getUserMedia"),
        n.mediaDevices.getUserMedia(e).then(t, r);
    }),
    !(
      t.version > 55 &&
      "autoGainControl" in n.mediaDevices.getSupportedConstraints()
    ))
  ) {
    const e = function (e, t, n) {
        t in e && !(n in e) && ((e[n] = e[t]), delete e[t]);
      },
      t = n.mediaDevices.getUserMedia.bind(n.mediaDevices);
    if (
      ((n.mediaDevices.getUserMedia = function (n) {
        return (
          "object" == typeof n &&
            "object" == typeof n.audio &&
            ((n = JSON.parse(JSON.stringify(n))),
            e(n.audio, "autoGainControl", "mozAutoGainControl"),
            e(n.audio, "noiseSuppression", "mozNoiseSuppression")),
          t(n)
        );
      }),
      r && r.prototype.getSettings)
    ) {
      const t = r.prototype.getSettings;
      r.prototype.getSettings = function () {
        const n = t.apply(this, arguments);
        return (
          e(n, "mozAutoGainControl", "autoGainControl"),
          e(n, "mozNoiseSuppression", "noiseSuppression"),
          n
        );
      };
    }
    if (r && r.prototype.applyConstraints) {
      const t = r.prototype.applyConstraints;
      r.prototype.applyConstraints = function (n) {
        return (
          "audio" === this.kind &&
            "object" == typeof n &&
            ((n = JSON.parse(JSON.stringify(n))),
            e(n, "autoGainControl", "mozAutoGainControl"),
            e(n, "noiseSuppression", "mozNoiseSuppression")),
          t.apply(this, [n])
        );
      };
    }
  }
}
function O(e) {
  "object" == typeof e &&
    e.RTCTrackEvent &&
    "receiver" in e.RTCTrackEvent.prototype &&
    !("transceiver" in e.RTCTrackEvent.prototype) &&
    Object.defineProperty(e.RTCTrackEvent.prototype, "transceiver", {
      get() {
        return { receiver: this.receiver };
      },
    });
}
function j(e, t) {
  if ("object" != typeof e || (!e.RTCPeerConnection && !e.mozRTCPeerConnection))
    return;
  !e.RTCPeerConnection &&
    e.mozRTCPeerConnection &&
    (e.RTCPeerConnection = e.mozRTCPeerConnection),
    t.version < 53 &&
      [
        "setLocalDescription",
        "setRemoteDescription",
        "addIceCandidate",
      ].forEach(function (t) {
        const n = e.RTCPeerConnection.prototype[t],
          r = {
            [t]() {
              return (
                (arguments[0] = new (
                  "addIceCandidate" === t
                    ? e.RTCIceCandidate
                    : e.RTCSessionDescription
                )(arguments[0])),
                n.apply(this, arguments)
              );
            },
          };
        e.RTCPeerConnection.prototype[t] = r[t];
      });
  const n = {
      inboundrtp: "inbound-rtp",
      outboundrtp: "outbound-rtp",
      candidatepair: "candidate-pair",
      localcandidate: "local-candidate",
      remotecandidate: "remote-candidate",
    },
    r = e.RTCPeerConnection.prototype.getStats;
  e.RTCPeerConnection.prototype.getStats = function () {
    const [e, o, i] = arguments;
    return r
      .apply(this, [e || null])
      .then((e) => {
        if (t.version < 53 && !o)
          try {
            e.forEach((e) => {
              e.type = n[e.type] || e.type;
            });
          } catch (t) {
            if ("TypeError" !== t.name) throw t;
            e.forEach((t, r) => {
              e.set(r, Object.assign({}, t, { type: n[t.type] || t.type }));
            });
          }
        return e;
      })
      .then(o, i);
  };
}
function I(e) {
  if ("object" != typeof e || !e.RTCPeerConnection || !e.RTCRtpSender) return;
  if (e.RTCRtpSender && "getStats" in e.RTCRtpSender.prototype) return;
  const t = e.RTCPeerConnection.prototype.getSenders;
  t &&
    (e.RTCPeerConnection.prototype.getSenders = function () {
      const e = t.apply(this, []);
      return e.forEach((e) => (e._pc = this)), e;
    });
  const n = e.RTCPeerConnection.prototype.addTrack;
  n &&
    (e.RTCPeerConnection.prototype.addTrack = function () {
      const e = n.apply(this, arguments);
      return (e._pc = this), e;
    }),
    (e.RTCRtpSender.prototype.getStats = function () {
      return this.track
        ? this._pc.getStats(this.track)
        : Promise.resolve(new Map());
    });
}
function M(e) {
  if ("object" != typeof e || !e.RTCPeerConnection || !e.RTCRtpSender) return;
  if (e.RTCRtpSender && "getStats" in e.RTCRtpReceiver.prototype) return;
  const t = e.RTCPeerConnection.prototype.getReceivers;
  t &&
    (e.RTCPeerConnection.prototype.getReceivers = function () {
      const e = t.apply(this, []);
      return e.forEach((e) => (e._pc = this)), e;
    }),
    u(e, "track", (e) => ((e.receiver._pc = e.srcElement), e)),
    (e.RTCRtpReceiver.prototype.getStats = function () {
      return this._pc.getStats(this.track);
    });
}
function F(e) {
  e.RTCPeerConnection &&
    !("removeStream" in e.RTCPeerConnection.prototype) &&
    (e.RTCPeerConnection.prototype.removeStream = function (e) {
      f("removeStream", "removeTrack"),
        this.getSenders().forEach((t) => {
          t.track && e.getTracks().includes(t.track) && this.removeTrack(t);
        });
    });
}
function N(e) {
  e.DataChannel && !e.RTCDataChannel && (e.RTCDataChannel = e.DataChannel);
}
function B(e) {
  if ("object" != typeof e || !e.RTCPeerConnection) return;
  const t = e.RTCPeerConnection.prototype.addTransceiver;
  t &&
    (e.RTCPeerConnection.prototype.addTransceiver = function () {
      this.setParametersPromises = [];
      const e = arguments[1],
        n = e && "sendEncodings" in e;
      n &&
        e.sendEncodings.forEach((e) => {
          if ("rid" in e) {
            if (!/^[a-z0-9]{0,16}$/i.test(e.rid))
              throw new TypeError("Invalid RID value provided.");
          }
          if (
            "scaleResolutionDownBy" in e &&
            !(parseFloat(e.scaleResolutionDownBy) >= 1)
          )
            throw new RangeError("scale_resolution_down_by must be >= 1.0");
          if ("maxFramerate" in e && !(parseFloat(e.maxFramerate) >= 0))
            throw new RangeError("max_framerate must be >= 0.0");
        });
      const r = t.apply(this, arguments);
      if (n) {
        const { sender: t } = r,
          n = t.getParameters();
        (!("encodings" in n) ||
          (1 === n.encodings.length &&
            0 === Object.keys(n.encodings[0]).length)) &&
          ((n.encodings = e.sendEncodings),
          (t.sendEncodings = e.sendEncodings),
          this.setParametersPromises.push(
            t
              .setParameters(n)
              .then(() => {
                delete t.sendEncodings;
              })
              .catch(() => {
                delete t.sendEncodings;
              })
          ));
      }
      return r;
    });
}
function L(e) {
  if ("object" != typeof e || !e.RTCRtpSender) return;
  const t = e.RTCRtpSender.prototype.getParameters;
  t &&
    (e.RTCRtpSender.prototype.getParameters = function () {
      const e = t.apply(this, arguments);
      return (
        "encodings" in e ||
          (e.encodings = [].concat(this.sendEncodings || [{}])),
        e
      );
    });
}
function U(e) {
  if ("object" != typeof e || !e.RTCPeerConnection) return;
  const t = e.RTCPeerConnection.prototype.createOffer;
  e.RTCPeerConnection.prototype.createOffer = function () {
    return this.setParametersPromises && this.setParametersPromises.length
      ? Promise.all(this.setParametersPromises)
          .then(() => t.apply(this, arguments))
          .finally(() => {
            this.setParametersPromises = [];
          })
      : t.apply(this, arguments);
  };
}
function q(e) {
  if ("object" != typeof e || !e.RTCPeerConnection) return;
  const t = e.RTCPeerConnection.prototype.createAnswer;
  e.RTCPeerConnection.prototype.createAnswer = function () {
    return this.setParametersPromises && this.setParametersPromises.length
      ? Promise.all(this.setParametersPromises)
          .then(() => t.apply(this, arguments))
          .finally(() => {
            this.setParametersPromises = [];
          })
      : t.apply(this, arguments);
  };
}
var z = Object.freeze({
  __proto__: null,
  shimOnTrack: O,
  shimPeerConnection: j,
  shimSenderGetStats: I,
  shimReceiverGetStats: M,
  shimRemoveStream: F,
  shimRTCDataChannel: N,
  shimAddTransceiver: B,
  shimGetParameters: L,
  shimCreateOffer: U,
  shimCreateAnswer: q,
  shimGetUserMedia: E,
  shimGetDisplayMedia: function (e, t) {
    (e.navigator.mediaDevices &&
      "getDisplayMedia" in e.navigator.mediaDevices) ||
      (e.navigator.mediaDevices &&
        (e.navigator.mediaDevices.getDisplayMedia = function (n) {
          if (!n || !n.video) {
            const e = new DOMException(
              "getDisplayMedia without video constraints is undefined"
            );
            return (e.name = "NotFoundError"), (e.code = 8), Promise.reject(e);
          }
          return (
            !0 === n.video
              ? (n.video = { mediaSource: t })
              : (n.video.mediaSource = t),
            e.navigator.mediaDevices.getUserMedia(n)
          );
        }));
  },
});
function V(e) {
  if ("object" == typeof e && e.RTCPeerConnection) {
    if (
      ("getLocalStreams" in e.RTCPeerConnection.prototype ||
        (e.RTCPeerConnection.prototype.getLocalStreams = function () {
          return (
            this._localStreams || (this._localStreams = []), this._localStreams
          );
        }),
      !("addStream" in e.RTCPeerConnection.prototype))
    ) {
      const t = e.RTCPeerConnection.prototype.addTrack;
      (e.RTCPeerConnection.prototype.addStream = function (e) {
        this._localStreams || (this._localStreams = []),
          this._localStreams.includes(e) || this._localStreams.push(e),
          e.getAudioTracks().forEach((n) => t.call(this, n, e)),
          e.getVideoTracks().forEach((n) => t.call(this, n, e));
      }),
        (e.RTCPeerConnection.prototype.addTrack = function (e, ...n) {
          return (
            n &&
              n.forEach((e) => {
                this._localStreams
                  ? this._localStreams.includes(e) || this._localStreams.push(e)
                  : (this._localStreams = [e]);
              }),
            t.apply(this, arguments)
          );
        });
    }
    "removeStream" in e.RTCPeerConnection.prototype ||
      (e.RTCPeerConnection.prototype.removeStream = function (e) {
        this._localStreams || (this._localStreams = []);
        const t = this._localStreams.indexOf(e);
        if (-1 === t) return;
        this._localStreams.splice(t, 1);
        const n = e.getTracks();
        this.getSenders().forEach((e) => {
          n.includes(e.track) && this.removeTrack(e);
        });
      });
  }
}
function J(e) {
  if (
    "object" == typeof e &&
    e.RTCPeerConnection &&
    ("getRemoteStreams" in e.RTCPeerConnection.prototype ||
      (e.RTCPeerConnection.prototype.getRemoteStreams = function () {
        return this._remoteStreams ? this._remoteStreams : [];
      }),
    !("onaddstream" in e.RTCPeerConnection.prototype))
  ) {
    Object.defineProperty(e.RTCPeerConnection.prototype, "onaddstream", {
      get() {
        return this._onaddstream;
      },
      set(e) {
        this._onaddstream &&
          (this.removeEventListener("addstream", this._onaddstream),
          this.removeEventListener("track", this._onaddstreampoly)),
          this.addEventListener("addstream", (this._onaddstream = e)),
          this.addEventListener(
            "track",
            (this._onaddstreampoly = (e) => {
              e.streams.forEach((e) => {
                if (
                  (this._remoteStreams || (this._remoteStreams = []),
                  this._remoteStreams.includes(e))
                )
                  return;
                this._remoteStreams.push(e);
                const t = new Event("addstream");
                (t.stream = e), this.dispatchEvent(t);
              });
            })
          );
      },
    });
    const t = e.RTCPeerConnection.prototype.setRemoteDescription;
    e.RTCPeerConnection.prototype.setRemoteDescription = function () {
      const e = this;
      return (
        this._onaddstreampoly ||
          this.addEventListener(
            "track",
            (this._onaddstreampoly = function (t) {
              t.streams.forEach((t) => {
                if (
                  (e._remoteStreams || (e._remoteStreams = []),
                  e._remoteStreams.indexOf(t) >= 0)
                )
                  return;
                e._remoteStreams.push(t);
                const n = new Event("addstream");
                (n.stream = t), e.dispatchEvent(n);
              });
            })
          ),
        t.apply(e, arguments)
      );
    };
  }
}
function H(e) {
  if ("object" != typeof e || !e.RTCPeerConnection) return;
  const t = e.RTCPeerConnection.prototype,
    n = t.createOffer,
    r = t.createAnswer,
    o = t.setLocalDescription,
    i = t.setRemoteDescription,
    s = t.addIceCandidate;
  (t.createOffer = function (e, t) {
    const r = arguments.length >= 2 ? arguments[2] : arguments[0],
      o = n.apply(this, [r]);
    return t ? (o.then(e, t), Promise.resolve()) : o;
  }),
    (t.createAnswer = function (e, t) {
      const n = arguments.length >= 2 ? arguments[2] : arguments[0],
        o = r.apply(this, [n]);
      return t ? (o.then(e, t), Promise.resolve()) : o;
    });
  let a = function (e, t, n) {
    const r = o.apply(this, [e]);
    return n ? (r.then(t, n), Promise.resolve()) : r;
  };
  (t.setLocalDescription = a),
    (a = function (e, t, n) {
      const r = i.apply(this, [e]);
      return n ? (r.then(t, n), Promise.resolve()) : r;
    }),
    (t.setRemoteDescription = a),
    (a = function (e, t, n) {
      const r = s.apply(this, [e]);
      return n ? (r.then(t, n), Promise.resolve()) : r;
    }),
    (t.addIceCandidate = a);
}
function W(e) {
  const t = e && e.navigator;
  if (t.mediaDevices && t.mediaDevices.getUserMedia) {
    const e = t.mediaDevices,
      n = e.getUserMedia.bind(e);
    t.mediaDevices.getUserMedia = (e) => n(G(e));
  }
  !t.getUserMedia &&
    t.mediaDevices &&
    t.mediaDevices.getUserMedia &&
    (t.getUserMedia = function (e, n, r) {
      t.mediaDevices.getUserMedia(e).then(n, r);
    }.bind(t));
}
function G(e) {
  return e && void 0 !== e.video
    ? Object.assign({}, e, { video: g(e.video) })
    : e;
}
function X(e) {
  if (!e.RTCPeerConnection) return;
  const t = e.RTCPeerConnection;
  (e.RTCPeerConnection = function (e, n) {
    if (e && e.iceServers) {
      const t = [];
      for (let n = 0; n < e.iceServers.length; n++) {
        let r = e.iceServers[n];
        !r.hasOwnProperty("urls") && r.hasOwnProperty("url")
          ? (f("RTCIceServer.url", "RTCIceServer.urls"),
            (r = JSON.parse(JSON.stringify(r))),
            (r.urls = r.url),
            delete r.url,
            t.push(r))
          : t.push(e.iceServers[n]);
      }
      e.iceServers = t;
    }
    return new t(e, n);
  }),
    (e.RTCPeerConnection.prototype = t.prototype),
    "generateCertificate" in t &&
      Object.defineProperty(e.RTCPeerConnection, "generateCertificate", {
        get: () => t.generateCertificate,
      });
}
function K(e) {
  "object" == typeof e &&
    e.RTCTrackEvent &&
    "receiver" in e.RTCTrackEvent.prototype &&
    !("transceiver" in e.RTCTrackEvent.prototype) &&
    Object.defineProperty(e.RTCTrackEvent.prototype, "transceiver", {
      get() {
        return { receiver: this.receiver };
      },
    });
}
function Y(e) {
  const t = e.RTCPeerConnection.prototype.createOffer;
  e.RTCPeerConnection.prototype.createOffer = function (e) {
    if (e) {
      void 0 !== e.offerToReceiveAudio &&
        (e.offerToReceiveAudio = !!e.offerToReceiveAudio);
      const t = this.getTransceivers().find(
        (e) => "audio" === e.receiver.track.kind
      );
      !1 === e.offerToReceiveAudio && t
        ? "sendrecv" === t.direction
          ? t.setDirection
            ? t.setDirection("sendonly")
            : (t.direction = "sendonly")
          : "recvonly" === t.direction &&
            (t.setDirection
              ? t.setDirection("inactive")
              : (t.direction = "inactive"))
        : !0 !== e.offerToReceiveAudio ||
          t ||
          this.addTransceiver("audio", { direction: "recvonly" }),
        void 0 !== e.offerToReceiveVideo &&
          (e.offerToReceiveVideo = !!e.offerToReceiveVideo);
      const n = this.getTransceivers().find(
        (e) => "video" === e.receiver.track.kind
      );
      !1 === e.offerToReceiveVideo && n
        ? "sendrecv" === n.direction
          ? n.setDirection
            ? n.setDirection("sendonly")
            : (n.direction = "sendonly")
          : "recvonly" === n.direction &&
            (n.setDirection
              ? n.setDirection("inactive")
              : (n.direction = "inactive"))
        : !0 !== e.offerToReceiveVideo ||
          n ||
          this.addTransceiver("video", { direction: "recvonly" });
    }
    return t.apply(this, arguments);
  };
}
function $(e) {
  "object" != typeof e ||
    e.AudioContext ||
    (e.AudioContext = e.webkitAudioContext);
}
var Q = Object.freeze({
    __proto__: null,
    shimLocalStreamsAPI: V,
    shimRemoteStreamsAPI: J,
    shimCallbacksAPI: H,
    shimGetUserMedia: W,
    shimConstraints: G,
    shimRTCIceServerUrls: X,
    shimTrackEventTransceiver: K,
    shimCreateOfferLegacy: Y,
    shimAudioContext: $,
  }),
  Z = i(function (e) {
    const t = {
      generateIdentifier: function () {
        return Math.random().toString(36).substr(2, 10);
      },
    };
    (t.localCName = t.generateIdentifier()),
      (t.splitLines = function (e) {
        return e
          .trim()
          .split("\n")
          .map((e) => e.trim());
      }),
      (t.splitSections = function (e) {
        return e
          .split("\nm=")
          .map((e, t) => (t > 0 ? "m=" + e : e).trim() + "\r\n");
      }),
      (t.getDescription = function (e) {
        const n = t.splitSections(e);
        return n && n[0];
      }),
      (t.getMediaSections = function (e) {
        const n = t.splitSections(e);
        return n.shift(), n;
      }),
      (t.matchPrefix = function (e, n) {
        return t.splitLines(e).filter((e) => 0 === e.indexOf(n));
      }),
      (t.parseCandidate = function (e) {
        let t;
        t =
          0 === e.indexOf("a=candidate:")
            ? e.substring(12).split(" ")
            : e.substring(10).split(" ");
        const n = {
          foundation: t[0],
          component: { 1: "rtp", 2: "rtcp" }[t[1]] || t[1],
          protocol: t[2].toLowerCase(),
          priority: parseInt(t[3], 10),
          ip: t[4],
          address: t[4],
          port: parseInt(t[5], 10),
          type: t[7],
        };
        for (let e = 8; e < t.length; e += 2)
          switch (t[e]) {
            case "raddr":
              n.relatedAddress = t[e + 1];
              break;
            case "rport":
              n.relatedPort = parseInt(t[e + 1], 10);
              break;
            case "tcptype":
              n.tcpType = t[e + 1];
              break;
            case "ufrag":
              (n.ufrag = t[e + 1]), (n.usernameFragment = t[e + 1]);
              break;
            default:
              void 0 === n[t[e]] && (n[t[e]] = t[e + 1]);
          }
        return n;
      }),
      (t.writeCandidate = function (e) {
        const t = [];
        t.push(e.foundation);
        const n = e.component;
        "rtp" === n ? t.push(1) : "rtcp" === n ? t.push(2) : t.push(n),
          t.push(e.protocol.toUpperCase()),
          t.push(e.priority),
          t.push(e.address || e.ip),
          t.push(e.port);
        const r = e.type;
        return (
          t.push("typ"),
          t.push(r),
          "host" !== r &&
            e.relatedAddress &&
            e.relatedPort &&
            (t.push("raddr"),
            t.push(e.relatedAddress),
            t.push("rport"),
            t.push(e.relatedPort)),
          e.tcpType &&
            "tcp" === e.protocol.toLowerCase() &&
            (t.push("tcptype"), t.push(e.tcpType)),
          (e.usernameFragment || e.ufrag) &&
            (t.push("ufrag"), t.push(e.usernameFragment || e.ufrag)),
          "candidate:" + t.join(" ")
        );
      }),
      (t.parseIceOptions = function (e) {
        return e.substr(14).split(" ");
      }),
      (t.parseRtpMap = function (e) {
        let t = e.substr(9).split(" ");
        const n = { payloadType: parseInt(t.shift(), 10) };
        return (
          (t = t[0].split("/")),
          (n.name = t[0]),
          (n.clockRate = parseInt(t[1], 10)),
          (n.channels = 3 === t.length ? parseInt(t[2], 10) : 1),
          (n.numChannels = n.channels),
          n
        );
      }),
      (t.writeRtpMap = function (e) {
        let t = e.payloadType;
        void 0 !== e.preferredPayloadType && (t = e.preferredPayloadType);
        const n = e.channels || e.numChannels || 1;
        return (
          "a=rtpmap:" +
          t +
          " " +
          e.name +
          "/" +
          e.clockRate +
          (1 !== n ? "/" + n : "") +
          "\r\n"
        );
      }),
      (t.parseExtmap = function (e) {
        const t = e.substr(9).split(" ");
        return {
          id: parseInt(t[0], 10),
          direction: t[0].indexOf("/") > 0 ? t[0].split("/")[1] : "sendrecv",
          uri: t[1],
        };
      }),
      (t.writeExtmap = function (e) {
        return (
          "a=extmap:" +
          (e.id || e.preferredId) +
          (e.direction && "sendrecv" !== e.direction ? "/" + e.direction : "") +
          " " +
          e.uri +
          "\r\n"
        );
      }),
      (t.parseFmtp = function (e) {
        const t = {};
        let n;
        const r = e.substr(e.indexOf(" ") + 1).split(";");
        for (let e = 0; e < r.length; e++)
          (n = r[e].trim().split("=")), (t[n[0].trim()] = n[1]);
        return t;
      }),
      (t.writeFmtp = function (e) {
        let t = "",
          n = e.payloadType;
        if (
          (void 0 !== e.preferredPayloadType && (n = e.preferredPayloadType),
          e.parameters && Object.keys(e.parameters).length)
        ) {
          const r = [];
          Object.keys(e.parameters).forEach((t) => {
            void 0 !== e.parameters[t]
              ? r.push(t + "=" + e.parameters[t])
              : r.push(t);
          }),
            (t += "a=fmtp:" + n + " " + r.join(";") + "\r\n");
        }
        return t;
      }),
      (t.parseRtcpFb = function (e) {
        const t = e.substr(e.indexOf(" ") + 1).split(" ");
        return { type: t.shift(), parameter: t.join(" ") };
      }),
      (t.writeRtcpFb = function (e) {
        let t = "",
          n = e.payloadType;
        return (
          void 0 !== e.preferredPayloadType && (n = e.preferredPayloadType),
          e.rtcpFeedback &&
            e.rtcpFeedback.length &&
            e.rtcpFeedback.forEach((e) => {
              t +=
                "a=rtcp-fb:" +
                n +
                " " +
                e.type +
                (e.parameter && e.parameter.length ? " " + e.parameter : "") +
                "\r\n";
            }),
          t
        );
      }),
      (t.parseSsrcMedia = function (e) {
        const t = e.indexOf(" "),
          n = { ssrc: parseInt(e.substr(7, t - 7), 10) },
          r = e.indexOf(":", t);
        return (
          r > -1
            ? ((n.attribute = e.substr(t + 1, r - t - 1)),
              (n.value = e.substr(r + 1)))
            : (n.attribute = e.substr(t + 1)),
          n
        );
      }),
      (t.parseSsrcGroup = function (e) {
        const t = e.substr(13).split(" ");
        return { semantics: t.shift(), ssrcs: t.map((e) => parseInt(e, 10)) };
      }),
      (t.getMid = function (e) {
        const n = t.matchPrefix(e, "a=mid:")[0];
        if (n) return n.substr(6);
      }),
      (t.parseFingerprint = function (e) {
        const t = e.substr(14).split(" ");
        return { algorithm: t[0].toLowerCase(), value: t[1].toUpperCase() };
      }),
      (t.getDtlsParameters = function (e, n) {
        return {
          role: "auto",
          fingerprints: t
            .matchPrefix(e + n, "a=fingerprint:")
            .map(t.parseFingerprint),
        };
      }),
      (t.writeDtlsParameters = function (e, t) {
        let n = "a=setup:" + t + "\r\n";
        return (
          e.fingerprints.forEach((e) => {
            n += "a=fingerprint:" + e.algorithm + " " + e.value + "\r\n";
          }),
          n
        );
      }),
      (t.parseCryptoLine = function (e) {
        const t = e.substr(9).split(" ");
        return {
          tag: parseInt(t[0], 10),
          cryptoSuite: t[1],
          keyParams: t[2],
          sessionParams: t.slice(3),
        };
      }),
      (t.writeCryptoLine = function (e) {
        return (
          "a=crypto:" +
          e.tag +
          " " +
          e.cryptoSuite +
          " " +
          ("object" == typeof e.keyParams
            ? t.writeCryptoKeyParams(e.keyParams)
            : e.keyParams) +
          (e.sessionParams ? " " + e.sessionParams.join(" ") : "") +
          "\r\n"
        );
      }),
      (t.parseCryptoKeyParams = function (e) {
        if (0 !== e.indexOf("inline:")) return null;
        const t = e.substr(7).split("|");
        return {
          keyMethod: "inline",
          keySalt: t[0],
          lifeTime: t[1],
          mkiValue: t[2] ? t[2].split(":")[0] : void 0,
          mkiLength: t[2] ? t[2].split(":")[1] : void 0,
        };
      }),
      (t.writeCryptoKeyParams = function (e) {
        return (
          e.keyMethod +
          ":" +
          e.keySalt +
          (e.lifeTime ? "|" + e.lifeTime : "") +
          (e.mkiValue && e.mkiLength
            ? "|" + e.mkiValue + ":" + e.mkiLength
            : "")
        );
      }),
      (t.getCryptoParameters = function (e, n) {
        return t.matchPrefix(e + n, "a=crypto:").map(t.parseCryptoLine);
      }),
      (t.getIceParameters = function (e, n) {
        const r = t.matchPrefix(e + n, "a=ice-ufrag:")[0],
          o = t.matchPrefix(e + n, "a=ice-pwd:")[0];
        return r && o
          ? { usernameFragment: r.substr(12), password: o.substr(10) }
          : null;
      }),
      (t.writeIceParameters = function (e) {
        let t =
          "a=ice-ufrag:" +
          e.usernameFragment +
          "\r\na=ice-pwd:" +
          e.password +
          "\r\n";
        return e.iceLite && (t += "a=ice-lite\r\n"), t;
      }),
      (t.parseRtpParameters = function (e) {
        const n = {
            codecs: [],
            headerExtensions: [],
            fecMechanisms: [],
            rtcp: [],
          },
          r = t.splitLines(e)[0].split(" ");
        for (let o = 3; o < r.length; o++) {
          const i = r[o],
            s = t.matchPrefix(e, "a=rtpmap:" + i + " ")[0];
          if (s) {
            const r = t.parseRtpMap(s),
              o = t.matchPrefix(e, "a=fmtp:" + i + " ");
            switch (
              ((r.parameters = o.length ? t.parseFmtp(o[0]) : {}),
              (r.rtcpFeedback = t
                .matchPrefix(e, "a=rtcp-fb:" + i + " ")
                .map(t.parseRtcpFb)),
              n.codecs.push(r),
              r.name.toUpperCase())
            ) {
              case "RED":
              case "ULPFEC":
                n.fecMechanisms.push(r.name.toUpperCase());
            }
          }
        }
        return (
          t.matchPrefix(e, "a=extmap:").forEach((e) => {
            n.headerExtensions.push(t.parseExtmap(e));
          }),
          n
        );
      }),
      (t.writeRtpDescription = function (e, n) {
        let r = "";
        (r += "m=" + e + " "),
          (r += n.codecs.length > 0 ? "9" : "0"),
          (r += " UDP/TLS/RTP/SAVPF "),
          (r +=
            n.codecs
              .map((e) =>
                void 0 !== e.preferredPayloadType
                  ? e.preferredPayloadType
                  : e.payloadType
              )
              .join(" ") + "\r\n"),
          (r += "c=IN IP4 0.0.0.0\r\n"),
          (r += "a=rtcp:9 IN IP4 0.0.0.0\r\n"),
          n.codecs.forEach((e) => {
            (r += t.writeRtpMap(e)),
              (r += t.writeFmtp(e)),
              (r += t.writeRtcpFb(e));
          });
        let o = 0;
        return (
          n.codecs.forEach((e) => {
            e.maxptime > o && (o = e.maxptime);
          }),
          o > 0 && (r += "a=maxptime:" + o + "\r\n"),
          n.headerExtensions &&
            n.headerExtensions.forEach((e) => {
              r += t.writeExtmap(e);
            }),
          r
        );
      }),
      (t.parseRtpEncodingParameters = function (e) {
        const n = [],
          r = t.parseRtpParameters(e),
          o = -1 !== r.fecMechanisms.indexOf("RED"),
          i = -1 !== r.fecMechanisms.indexOf("ULPFEC"),
          s = t
            .matchPrefix(e, "a=ssrc:")
            .map((e) => t.parseSsrcMedia(e))
            .filter((e) => "cname" === e.attribute),
          a = s.length > 0 && s[0].ssrc;
        let c;
        const d = t.matchPrefix(e, "a=ssrc-group:FID").map((e) =>
          e
            .substr(17)
            .split(" ")
            .map((e) => parseInt(e, 10))
        );
        d.length > 0 && d[0].length > 1 && d[0][0] === a && (c = d[0][1]),
          r.codecs.forEach((e) => {
            if ("RTX" === e.name.toUpperCase() && e.parameters.apt) {
              let t = {
                ssrc: a,
                codecPayloadType: parseInt(e.parameters.apt, 10),
              };
              a && c && (t.rtx = { ssrc: c }),
                n.push(t),
                o &&
                  ((t = JSON.parse(JSON.stringify(t))),
                  (t.fec = { ssrc: a, mechanism: i ? "red+ulpfec" : "red" }),
                  n.push(t));
            }
          }),
          0 === n.length && a && n.push({ ssrc: a });
        let u = t.matchPrefix(e, "b=");
        return (
          u.length &&
            ((u =
              0 === u[0].indexOf("b=TIAS:")
                ? parseInt(u[0].substr(7), 10)
                : 0 === u[0].indexOf("b=AS:")
                ? 1e3 * parseInt(u[0].substr(5), 10) * 0.95 - 16e3
                : void 0),
            n.forEach((e) => {
              e.maxBitrate = u;
            })),
          n
        );
      }),
      (t.parseRtcpParameters = function (e) {
        const n = {},
          r = t
            .matchPrefix(e, "a=ssrc:")
            .map((e) => t.parseSsrcMedia(e))
            .filter((e) => "cname" === e.attribute)[0];
        r && ((n.cname = r.value), (n.ssrc = r.ssrc));
        const o = t.matchPrefix(e, "a=rtcp-rsize");
        (n.reducedSize = o.length > 0), (n.compound = 0 === o.length);
        const i = t.matchPrefix(e, "a=rtcp-mux");
        return (n.mux = i.length > 0), n;
      }),
      (t.writeRtcpParameters = function (e) {
        let t = "";
        return (
          e.reducedSize && (t += "a=rtcp-rsize\r\n"),
          e.mux && (t += "a=rtcp-mux\r\n"),
          void 0 !== e.ssrc &&
            e.cname &&
            (t += "a=ssrc:" + e.ssrc + " cname:" + e.cname + "\r\n"),
          t
        );
      }),
      (t.parseMsid = function (e) {
        let n;
        const r = t.matchPrefix(e, "a=msid:");
        if (1 === r.length)
          return (n = r[0].substr(7).split(" ")), { stream: n[0], track: n[1] };
        const o = t
          .matchPrefix(e, "a=ssrc:")
          .map((e) => t.parseSsrcMedia(e))
          .filter((e) => "msid" === e.attribute);
        return o.length > 0
          ? ((n = o[0].value.split(" ")), { stream: n[0], track: n[1] })
          : void 0;
      }),
      (t.parseSctpDescription = function (e) {
        const n = t.parseMLine(e),
          r = t.matchPrefix(e, "a=max-message-size:");
        let o;
        r.length > 0 && (o = parseInt(r[0].substr(19), 10)),
          isNaN(o) && (o = 65536);
        const i = t.matchPrefix(e, "a=sctp-port:");
        if (i.length > 0)
          return {
            port: parseInt(i[0].substr(12), 10),
            protocol: n.fmt,
            maxMessageSize: o,
          };
        const s = t.matchPrefix(e, "a=sctpmap:");
        if (s.length > 0) {
          const e = s[0].substr(10).split(" ");
          return {
            port: parseInt(e[0], 10),
            protocol: e[1],
            maxMessageSize: o,
          };
        }
      }),
      (t.writeSctpDescription = function (e, t) {
        let n = [];
        return (
          (n =
            "DTLS/SCTP" !== e.protocol
              ? [
                  "m=" +
                    e.kind +
                    " 9 " +
                    e.protocol +
                    " " +
                    t.protocol +
                    "\r\n",
                  "c=IN IP4 0.0.0.0\r\n",
                  "a=sctp-port:" + t.port + "\r\n",
                ]
              : [
                  "m=" + e.kind + " 9 " + e.protocol + " " + t.port + "\r\n",
                  "c=IN IP4 0.0.0.0\r\n",
                  "a=sctpmap:" + t.port + " " + t.protocol + " 65535\r\n",
                ]),
          void 0 !== t.maxMessageSize &&
            n.push("a=max-message-size:" + t.maxMessageSize + "\r\n"),
          n.join("")
        );
      }),
      (t.generateSessionId = function () {
        return Math.random().toString().substr(2, 21);
      }),
      (t.writeSessionBoilerplate = function (e, n, r) {
        let o;
        const i = void 0 !== n ? n : 2;
        o = e || t.generateSessionId();
        return (
          "v=0\r\no=" +
          (r || "thisisadapterortc") +
          " " +
          o +
          " " +
          i +
          " IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n"
        );
      }),
      (t.getDirection = function (e, n) {
        const r = t.splitLines(e);
        for (let e = 0; e < r.length; e++)
          switch (r[e]) {
            case "a=sendrecv":
            case "a=sendonly":
            case "a=recvonly":
            case "a=inactive":
              return r[e].substr(2);
          }
        return n ? t.getDirection(n) : "sendrecv";
      }),
      (t.getKind = function (e) {
        return t.splitLines(e)[0].split(" ")[0].substr(2);
      }),
      (t.isRejected = function (e) {
        return "0" === e.split(" ", 2)[1];
      }),
      (t.parseMLine = function (e) {
        const n = t.splitLines(e)[0].substr(2).split(" ");
        return {
          kind: n[0],
          port: parseInt(n[1], 10),
          protocol: n[2],
          fmt: n.slice(3).join(" "),
        };
      }),
      (t.parseOLine = function (e) {
        const n = t.matchPrefix(e, "o=")[0].substr(2).split(" ");
        return {
          username: n[0],
          sessionId: n[1],
          sessionVersion: parseInt(n[2], 10),
          netType: n[3],
          addressType: n[4],
          address: n[5],
        };
      }),
      (t.isValidSDP = function (e) {
        if ("string" != typeof e || 0 === e.length) return !1;
        const n = t.splitLines(e);
        for (let e = 0; e < n.length; e++)
          if (n[e].length < 2 || "=" !== n[e].charAt(1)) return !1;
        return !0;
      }),
      (e.exports = t);
  }),
  ee = e({ __proto__: null, default: Z }, [Z]);
function te(e) {
  if (
    !e.RTCIceCandidate ||
    (e.RTCIceCandidate && "foundation" in e.RTCIceCandidate.prototype)
  )
    return;
  const t = e.RTCIceCandidate;
  (e.RTCIceCandidate = function (e) {
    if (
      ("object" == typeof e &&
        e.candidate &&
        0 === e.candidate.indexOf("a=") &&
        ((e = JSON.parse(JSON.stringify(e))).candidate = e.candidate.substr(2)),
      e.candidate && e.candidate.length)
    ) {
      const n = new t(e),
        r = Z.parseCandidate(e.candidate),
        o = Object.assign(n, r);
      return (
        (o.toJSON = function () {
          return {
            candidate: o.candidate,
            sdpMid: o.sdpMid,
            sdpMLineIndex: o.sdpMLineIndex,
            usernameFragment: o.usernameFragment,
          };
        }),
        o
      );
    }
    return new t(e);
  }),
    (e.RTCIceCandidate.prototype = t.prototype),
    u(
      e,
      "icecandidate",
      (t) => (
        t.candidate &&
          Object.defineProperty(t, "candidate", {
            value: new e.RTCIceCandidate(t.candidate),
            writable: "false",
          }),
        t
      )
    );
}
function ne(e, t) {
  if (!e.RTCPeerConnection) return;
  "sctp" in e.RTCPeerConnection.prototype ||
    Object.defineProperty(e.RTCPeerConnection.prototype, "sctp", {
      get() {
        return void 0 === this._sctp ? null : this._sctp;
      },
    });
  const n = function (e) {
      if (!e || !e.sdp) return !1;
      const t = Z.splitSections(e.sdp);
      return (
        t.shift(),
        t.some((e) => {
          const t = Z.parseMLine(e);
          return (
            t && "application" === t.kind && -1 !== t.protocol.indexOf("SCTP")
          );
        })
      );
    },
    r = function (e) {
      const t = e.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);
      if (null === t || t.length < 2) return -1;
      const n = parseInt(t[1], 10);
      return n != n ? -1 : n;
    },
    o = function (e) {
      let n = 65536;
      return (
        "firefox" === t.browser &&
          (n =
            t.version < 57
              ? -1 === e
                ? 16384
                : 2147483637
              : t.version < 60
              ? 57 === t.version
                ? 65535
                : 65536
              : 2147483637),
        n
      );
    },
    i = function (e, n) {
      let r = 65536;
      "firefox" === t.browser && 57 === t.version && (r = 65535);
      const o = Z.matchPrefix(e.sdp, "a=max-message-size:");
      return (
        o.length > 0
          ? (r = parseInt(o[0].substr(19), 10))
          : "firefox" === t.browser && -1 !== n && (r = 2147483637),
        r
      );
    },
    s = e.RTCPeerConnection.prototype.setRemoteDescription;
  e.RTCPeerConnection.prototype.setRemoteDescription = function () {
    if (((this._sctp = null), "chrome" === t.browser && t.version >= 76)) {
      const { sdpSemantics: e } = this.getConfiguration();
      "plan-b" === e &&
        Object.defineProperty(this, "sctp", {
          get() {
            return void 0 === this._sctp ? null : this._sctp;
          },
          enumerable: !0,
          configurable: !0,
        });
    }
    if (n(arguments[0])) {
      const e = r(arguments[0]),
        t = o(e),
        n = i(arguments[0], e);
      let s;
      s =
        0 === t && 0 === n
          ? Number.POSITIVE_INFINITY
          : 0 === t || 0 === n
          ? Math.max(t, n)
          : Math.min(t, n);
      const a = {};
      Object.defineProperty(a, "maxMessageSize", { get: () => s }),
        (this._sctp = a);
    }
    return s.apply(this, arguments);
  };
}
function re(e) {
  if (
    !e.RTCPeerConnection ||
    !("createDataChannel" in e.RTCPeerConnection.prototype)
  )
    return;
  function t(e, t) {
    const n = e.send;
    e.send = function () {
      const r = arguments[0],
        o = r.length || r.size || r.byteLength;
      if ("open" === e.readyState && t.sctp && o > t.sctp.maxMessageSize)
        throw new TypeError(
          "Message too large (can send a maximum of " +
            t.sctp.maxMessageSize +
            " bytes)"
        );
      return n.apply(e, arguments);
    };
  }
  const n = e.RTCPeerConnection.prototype.createDataChannel;
  (e.RTCPeerConnection.prototype.createDataChannel = function () {
    const e = n.apply(this, arguments);
    return t(e, this), e;
  }),
    u(e, "datachannel", (e) => (t(e.channel, e.target), e));
}
function oe(e) {
  if (
    !e.RTCPeerConnection ||
    "connectionState" in e.RTCPeerConnection.prototype
  )
    return;
  const t = e.RTCPeerConnection.prototype;
  Object.defineProperty(t, "connectionState", {
    get() {
      return (
        { completed: "connected", checking: "connecting" }[
          this.iceConnectionState
        ] || this.iceConnectionState
      );
    },
    enumerable: !0,
    configurable: !0,
  }),
    Object.defineProperty(t, "onconnectionstatechange", {
      get() {
        return this._onconnectionstatechange || null;
      },
      set(e) {
        this._onconnectionstatechange &&
          (this.removeEventListener(
            "connectionstatechange",
            this._onconnectionstatechange
          ),
          delete this._onconnectionstatechange),
          e &&
            this.addEventListener(
              "connectionstatechange",
              (this._onconnectionstatechange = e)
            );
      },
      enumerable: !0,
      configurable: !0,
    }),
    ["setLocalDescription", "setRemoteDescription"].forEach((e) => {
      const n = t[e];
      t[e] = function () {
        return (
          this._connectionstatechangepoly ||
            ((this._connectionstatechangepoly = (e) => {
              const t = e.target;
              if (t._lastConnectionState !== t.connectionState) {
                t._lastConnectionState = t.connectionState;
                const n = new Event("connectionstatechange", e);
                t.dispatchEvent(n);
              }
              return e;
            }),
            this.addEventListener(
              "iceconnectionstatechange",
              this._connectionstatechangepoly
            )),
          n.apply(this, arguments)
        );
      };
    });
}
function ie(e, t) {
  if (!e.RTCPeerConnection) return;
  if ("chrome" === t.browser && t.version >= 71) return;
  if ("safari" === t.browser && t.version >= 605) return;
  const n = e.RTCPeerConnection.prototype.setRemoteDescription;
  e.RTCPeerConnection.prototype.setRemoteDescription = function (t) {
    if (t && t.sdp && -1 !== t.sdp.indexOf("\na=extmap-allow-mixed")) {
      const n = t.sdp
        .split("\n")
        .filter((e) => "a=extmap-allow-mixed" !== e.trim())
        .join("\n");
      e.RTCSessionDescription && t instanceof e.RTCSessionDescription
        ? (arguments[0] = new e.RTCSessionDescription({ type: t.type, sdp: n }))
        : (t.sdp = n);
    }
    return n.apply(this, arguments);
  };
}
function se(e, t) {
  if (!e.RTCPeerConnection || !e.RTCPeerConnection.prototype) return;
  const n = e.RTCPeerConnection.prototype.addIceCandidate;
  n &&
    0 !== n.length &&
    (e.RTCPeerConnection.prototype.addIceCandidate = function () {
      return arguments[0]
        ? (("chrome" === t.browser && t.version < 78) ||
            ("firefox" === t.browser && t.version < 68) ||
            "safari" === t.browser) &&
          arguments[0] &&
          "" === arguments[0].candidate
          ? Promise.resolve()
          : n.apply(this, arguments)
        : (arguments[1] && arguments[1].apply(null), Promise.resolve());
    });
}
function ae(e, t) {
  if (!e.RTCPeerConnection || !e.RTCPeerConnection.prototype) return;
  const n = e.RTCPeerConnection.prototype.setLocalDescription;
  n &&
    0 !== n.length &&
    (e.RTCPeerConnection.prototype.setLocalDescription = function () {
      let e = arguments[0] || {};
      if ("object" != typeof e || (e.type && e.sdp))
        return n.apply(this, arguments);
      if (((e = { type: e.type, sdp: e.sdp }), !e.type))
        switch (this.signalingState) {
          case "stable":
          case "have-local-offer":
          case "have-remote-pranswer":
            e.type = "offer";
            break;
          default:
            e.type = "answer";
        }
      if (e.sdp || ("offer" !== e.type && "answer" !== e.type))
        return n.apply(this, [e]);
      const t = "offer" === e.type ? this.createOffer : this.createAnswer;
      return t.apply(this).then((e) => n.apply(this, [e]));
    });
}
var ce = Object.freeze({
  __proto__: null,
  shimRTCIceCandidate: te,
  shimMaxMessageSize: ne,
  shimSendThrowTypeError: re,
  shimConnectionState: oe,
  removeExtmapAllowMixed: ie,
  shimAddIceCandidateNullOrEmpty: se,
  shimParameterlessSetLocalDescription: ae,
});
const de = (function (
  { window: e } = {},
  t = { shimChrome: !0, shimFirefox: !0, shimSafari: !0 }
) {
  const n = h,
    r = (function (e) {
      const t = { browser: null, version: null };
      if (void 0 === e || !e.navigator)
        return (t.browser = "Not a browser."), t;
      const { navigator: n } = e;
      if (n.mozGetUserMedia)
        (t.browser = "firefox"),
          (t.version = d(n.userAgent, /Firefox\/(\d+)\./, 1));
      else if (
        n.webkitGetUserMedia ||
        (!1 === e.isSecureContext &&
          e.webkitRTCPeerConnection &&
          !e.RTCIceGatherer)
      )
        (t.browser = "chrome"),
          (t.version = d(n.userAgent, /Chrom(e|ium)\/(\d+)\./, 2));
      else {
        if (!e.RTCPeerConnection || !n.userAgent.match(/AppleWebKit\/(\d+)\./))
          return (t.browser = "Not a supported browser."), t;
        (t.browser = "safari"),
          (t.version = d(n.userAgent, /AppleWebKit\/(\d+)\./, 1)),
          (t.supportsUnifiedPlan =
            e.RTCRtpTransceiver &&
            "currentDirection" in e.RTCRtpTransceiver.prototype);
      }
      return t;
    })(e),
    o = {
      browserDetails: r,
      commonShim: ce,
      extractVersion: d,
      disableLog: p,
      disableWarnings: l,
      sdp: ee,
    };
  switch (r.browser) {
    case "chrome":
      if (!D || !A || !t.shimChrome)
        return n("Chrome shim is not included in this adapter release."), o;
      if (null === r.version)
        return n("Chrome shim can not determine version, not shimming."), o;
      n("adapter.js shimming chrome."),
        (o.browserShim = D),
        se(e, r),
        ae(e),
        C(e, r),
        w(e),
        A(e, r),
        S(e),
        _(e, r),
        k(e),
        T(e),
        R(e),
        x(e, r),
        te(e),
        oe(e),
        ne(e, r),
        re(e),
        ie(e, r);
      break;
    case "firefox":
      if (!z || !j || !t.shimFirefox)
        return n("Firefox shim is not included in this adapter release."), o;
      n("adapter.js shimming firefox."),
        (o.browserShim = z),
        se(e, r),
        ae(e),
        E(e, r),
        j(e, r),
        O(e),
        F(e),
        I(e),
        M(e),
        N(e),
        B(e),
        L(e),
        U(e),
        q(e),
        te(e),
        oe(e),
        ne(e, r),
        re(e);
      break;
    case "safari":
      if (!Q || !t.shimSafari)
        return n("Safari shim is not included in this adapter release."), o;
      n("adapter.js shimming safari."),
        (o.browserShim = Q),
        se(e, r),
        ae(e),
        X(e),
        Y(e),
        H(e),
        V(e),
        J(e),
        K(e),
        W(e),
        $(e),
        te(e),
        ne(e, r),
        re(e),
        ie(e, r);
      break;
    default:
      n("Unsupported browser!");
  }
  return o;
})({ window: "undefined" == typeof window ? void 0 : window });
class ue {
  static create(...e) {
    return new this(...e);
  }
  mixIn(e) {
    return Object.assign(this, e);
  }
  clone() {
    const e = new this.constructor();
    return Object.assign(e, this), e;
  }
}
class pe extends ue {
  constructor(e = [], t = 4 * e.length) {
    super();
    let n = e;
    if (
      (n instanceof ArrayBuffer && (n = new Uint8Array(n)),
      (n instanceof Int8Array ||
        n instanceof Uint8ClampedArray ||
        n instanceof Int16Array ||
        n instanceof Uint16Array ||
        n instanceof Int32Array ||
        n instanceof Uint32Array ||
        n instanceof Float32Array ||
        n instanceof Float64Array) &&
        (n = new Uint8Array(n.buffer, n.byteOffset, n.byteLength)),
      n instanceof Uint8Array)
    ) {
      const e = n.byteLength,
        t = [];
      for (let r = 0; r < e; r += 1) t[r >>> 2] |= n[r] << (24 - (r % 4) * 8);
      (this.words = t), (this.sigBytes = e);
    } else (this.words = e), (this.sigBytes = t);
  }
  static random(e) {
    const t = [],
      n = (e) => {
        let t = e,
          n = 987654321;
        const r = 4294967295;
        return () => {
          (n = (36969 * (65535 & n) + (n >> 16)) & r),
            (t = (18e3 * (65535 & t) + (t >> 16)) & r);
          let e = ((n << 16) + t) & r;
          return (
            (e /= 4294967296), (e += 0.5), e * (Math.random() > 0.5 ? 1 : -1)
          );
        };
      };
    for (let r, o = 0; o < e; o += 4) {
      const e = n(4294967296 * (r || Math.random()));
      (r = 987654071 * e()), t.push((4294967296 * e()) | 0);
    }
    return new pe(t, e);
  }
  toString(e = le) {
    return e.stringify(this);
  }
  concat(e) {
    const t = this.words,
      n = e.words,
      r = this.sigBytes,
      o = e.sigBytes;
    if ((this.clamp(), r % 4))
      for (let e = 0; e < o; e += 1) {
        const o = (n[e >>> 2] >>> (24 - (e % 4) * 8)) & 255;
        t[(r + e) >>> 2] |= o << (24 - ((r + e) % 4) * 8);
      }
    else for (let e = 0; e < o; e += 4) t[(r + e) >>> 2] = n[e >>> 2];
    return (this.sigBytes += o), this;
  }
  clamp() {
    const { words: e, sigBytes: t } = this;
    (e[t >>> 2] &= 4294967295 << (32 - (t % 4) * 8)),
      (e.length = Math.ceil(t / 4));
  }
  clone() {
    const e = super.clone.call(this);
    return (e.words = this.words.slice(0)), e;
  }
}
const le = {
    stringify(e) {
      const { words: t, sigBytes: n } = e,
        r = [];
      for (let e = 0; e < n; e += 1) {
        const n = (t[e >>> 2] >>> (24 - (e % 4) * 8)) & 255;
        r.push((n >>> 4).toString(16)), r.push((15 & n).toString(16));
      }
      return r.join("");
    },
    parse(e) {
      const t = e.length,
        n = [];
      for (let r = 0; r < t; r += 2)
        n[r >>> 3] |= parseInt(e.substr(r, 2), 16) << (24 - (r % 8) * 4);
      return new pe(n, t / 2);
    },
  },
  he = {
    stringify(e) {
      const { words: t, sigBytes: n } = e,
        r = [];
      for (let e = 0; e < n; e += 1) {
        const n = (t[e >>> 2] >>> (24 - (e % 4) * 8)) & 255;
        r.push(String.fromCharCode(n));
      }
      return r.join("");
    },
    parse(e) {
      const t = e.length,
        n = [];
      for (let r = 0; r < t; r += 1)
        n[r >>> 2] |= (255 & e.charCodeAt(r)) << (24 - (r % 4) * 8);
      return new pe(n, t);
    },
  },
  fe = {
    stringify(e) {
      try {
        return decodeURIComponent(escape(he.stringify(e)));
      } catch (e) {
        throw new Error("Malformed UTF-8 data");
      }
    },
    parse: (e) => he.parse(unescape(encodeURIComponent(e))),
  };
class me extends ue {
  constructor() {
    super(), (this._minBufferSize = 0);
  }
  reset() {
    (this._data = new pe()), (this._nDataBytes = 0);
  }
  _append(e) {
    let t = e;
    "string" == typeof t && (t = fe.parse(t)),
      this._data.concat(t),
      (this._nDataBytes += t.sigBytes);
  }
  _process(e) {
    let t;
    const { _data: n, blockSize: r } = this,
      o = n.words,
      i = n.sigBytes;
    let s = i / (4 * r);
    s = e ? Math.ceil(s) : Math.max((0 | s) - this._minBufferSize, 0);
    const a = s * r,
      c = Math.min(4 * a, i);
    if (a) {
      for (let e = 0; e < a; e += r) this._doProcessBlock(o, e);
      (t = o.splice(0, a)), (n.sigBytes -= c);
    }
    return new pe(t, c);
  }
  clone() {
    const e = super.clone.call(this);
    return (e._data = this._data.clone()), e;
  }
}
class ge extends me {
  constructor(e) {
    super(),
      (this.blockSize = 16),
      (this.cfg = Object.assign(new ue(), e)),
      this.reset();
  }
  static _createHelper(e) {
    return (t, n) => new e(n).finalize(t);
  }
  static _createHmacHelper(e) {
    return (t, n) => new ve(e, n).finalize(t);
  }
  reset() {
    super.reset.call(this), this._doReset();
  }
  update(e) {
    return this._append(e), this._process(), this;
  }
  finalize(e) {
    e && this._append(e);
    return this._doFinalize();
  }
}
class ve extends ue {
  constructor(e, t) {
    super();
    const n = new e();
    this._hasher = n;
    let r = t;
    "string" == typeof r && (r = fe.parse(r));
    const o = n.blockSize,
      i = 4 * o;
    r.sigBytes > i && (r = n.finalize(t)), r.clamp();
    const s = r.clone();
    this._oKey = s;
    const a = r.clone();
    this._iKey = a;
    const c = s.words,
      d = a.words;
    for (let e = 0; e < o; e += 1) (c[e] ^= 1549556828), (d[e] ^= 909522486);
    (s.sigBytes = i), (a.sigBytes = i), this.reset();
  }
  reset() {
    const e = this._hasher;
    e.reset(), e.update(this._iKey);
  }
  update(e) {
    return this._hasher.update(e), this;
  }
  finalize(e) {
    const t = this._hasher,
      n = t.finalize(e);
    t.reset();
    return t.finalize(this._oKey.clone().concat(n));
  }
}
const ye = [];
for (let e = 0; e < 64; e += 1)
  ye[e] = (4294967296 * Math.abs(Math.sin(e + 1))) | 0;
const be = (e, t, n, r, o, i, s) => {
    const a = e + ((t & n) | (~t & r)) + o + s;
    return ((a << i) | (a >>> (32 - i))) + t;
  },
  Ce = (e, t, n, r, o, i, s) => {
    const a = e + ((t & r) | (n & ~r)) + o + s;
    return ((a << i) | (a >>> (32 - i))) + t;
  },
  we = (e, t, n, r, o, i, s) => {
    const a = e + (t ^ n ^ r) + o + s;
    return ((a << i) | (a >>> (32 - i))) + t;
  },
  Se = (e, t, n, r, o, i, s) => {
    const a = e + (n ^ (t | ~r)) + o + s;
    return ((a << i) | (a >>> (32 - i))) + t;
  };
const ke = ge._createHmacHelper(
  class extends ge {
    _doReset() {
      this._hash = new pe([1732584193, 4023233417, 2562383102, 271733878]);
    }
    _doProcessBlock(e, t) {
      const n = e;
      for (let r = 0; r < 16; r += 1) {
        const o = t + r,
          i = e[o];
        n[o] =
          (16711935 & ((i << 8) | (i >>> 24))) |
          (4278255360 & ((i << 24) | (i >>> 8)));
      }
      const r = this._hash.words,
        o = n[t + 0],
        i = n[t + 1],
        s = n[t + 2],
        a = n[t + 3],
        c = n[t + 4],
        d = n[t + 5],
        u = n[t + 6],
        p = n[t + 7],
        l = n[t + 8],
        h = n[t + 9],
        f = n[t + 10],
        m = n[t + 11],
        g = n[t + 12],
        v = n[t + 13],
        y = n[t + 14],
        b = n[t + 15];
      let C = r[0],
        w = r[1],
        S = r[2],
        k = r[3];
      (C = be(C, w, S, k, o, 7, ye[0])),
        (k = be(k, C, w, S, i, 12, ye[1])),
        (S = be(S, k, C, w, s, 17, ye[2])),
        (w = be(w, S, k, C, a, 22, ye[3])),
        (C = be(C, w, S, k, c, 7, ye[4])),
        (k = be(k, C, w, S, d, 12, ye[5])),
        (S = be(S, k, C, w, u, 17, ye[6])),
        (w = be(w, S, k, C, p, 22, ye[7])),
        (C = be(C, w, S, k, l, 7, ye[8])),
        (k = be(k, C, w, S, h, 12, ye[9])),
        (S = be(S, k, C, w, f, 17, ye[10])),
        (w = be(w, S, k, C, m, 22, ye[11])),
        (C = be(C, w, S, k, g, 7, ye[12])),
        (k = be(k, C, w, S, v, 12, ye[13])),
        (S = be(S, k, C, w, y, 17, ye[14])),
        (w = be(w, S, k, C, b, 22, ye[15])),
        (C = Ce(C, w, S, k, i, 5, ye[16])),
        (k = Ce(k, C, w, S, u, 9, ye[17])),
        (S = Ce(S, k, C, w, m, 14, ye[18])),
        (w = Ce(w, S, k, C, o, 20, ye[19])),
        (C = Ce(C, w, S, k, d, 5, ye[20])),
        (k = Ce(k, C, w, S, f, 9, ye[21])),
        (S = Ce(S, k, C, w, b, 14, ye[22])),
        (w = Ce(w, S, k, C, c, 20, ye[23])),
        (C = Ce(C, w, S, k, h, 5, ye[24])),
        (k = Ce(k, C, w, S, y, 9, ye[25])),
        (S = Ce(S, k, C, w, a, 14, ye[26])),
        (w = Ce(w, S, k, C, l, 20, ye[27])),
        (C = Ce(C, w, S, k, v, 5, ye[28])),
        (k = Ce(k, C, w, S, s, 9, ye[29])),
        (S = Ce(S, k, C, w, p, 14, ye[30])),
        (w = Ce(w, S, k, C, g, 20, ye[31])),
        (C = we(C, w, S, k, d, 4, ye[32])),
        (k = we(k, C, w, S, l, 11, ye[33])),
        (S = we(S, k, C, w, m, 16, ye[34])),
        (w = we(w, S, k, C, y, 23, ye[35])),
        (C = we(C, w, S, k, i, 4, ye[36])),
        (k = we(k, C, w, S, c, 11, ye[37])),
        (S = we(S, k, C, w, p, 16, ye[38])),
        (w = we(w, S, k, C, f, 23, ye[39])),
        (C = we(C, w, S, k, v, 4, ye[40])),
        (k = we(k, C, w, S, o, 11, ye[41])),
        (S = we(S, k, C, w, a, 16, ye[42])),
        (w = we(w, S, k, C, u, 23, ye[43])),
        (C = we(C, w, S, k, h, 4, ye[44])),
        (k = we(k, C, w, S, g, 11, ye[45])),
        (S = we(S, k, C, w, b, 16, ye[46])),
        (w = we(w, S, k, C, s, 23, ye[47])),
        (C = Se(C, w, S, k, o, 6, ye[48])),
        (k = Se(k, C, w, S, p, 10, ye[49])),
        (S = Se(S, k, C, w, y, 15, ye[50])),
        (w = Se(w, S, k, C, d, 21, ye[51])),
        (C = Se(C, w, S, k, g, 6, ye[52])),
        (k = Se(k, C, w, S, a, 10, ye[53])),
        (S = Se(S, k, C, w, f, 15, ye[54])),
        (w = Se(w, S, k, C, i, 21, ye[55])),
        (C = Se(C, w, S, k, l, 6, ye[56])),
        (k = Se(k, C, w, S, b, 10, ye[57])),
        (S = Se(S, k, C, w, u, 15, ye[58])),
        (w = Se(w, S, k, C, v, 21, ye[59])),
        (C = Se(C, w, S, k, c, 6, ye[60])),
        (k = Se(k, C, w, S, m, 10, ye[61])),
        (S = Se(S, k, C, w, s, 15, ye[62])),
        (w = Se(w, S, k, C, h, 21, ye[63])),
        (r[0] = (r[0] + C) | 0),
        (r[1] = (r[1] + w) | 0),
        (r[2] = (r[2] + S) | 0),
        (r[3] = (r[3] + k) | 0);
    }
    _doFinalize() {
      const e = this._data,
        t = e.words,
        n = 8 * this._nDataBytes,
        r = 8 * e.sigBytes;
      t[r >>> 5] |= 128 << (24 - (r % 32));
      const o = Math.floor(n / 4294967296),
        i = n;
      (t[15 + (((r + 64) >>> 9) << 4)] =
        (16711935 & ((o << 8) | (o >>> 24))) |
        (4278255360 & ((o << 24) | (o >>> 8)))),
        (t[14 + (((r + 64) >>> 9) << 4)] =
          (16711935 & ((i << 8) | (i >>> 24))) |
          (4278255360 & ((i << 24) | (i >>> 8)))),
        (e.sigBytes = 4 * (t.length + 1)),
        this._process();
      const s = this._hash,
        a = s.words;
      for (let e = 0; e < 4; e += 1) {
        const t = a[e];
        a[e] =
          (16711935 & ((t << 8) | (t >>> 24))) |
          (4278255360 & ((t << 24) | (t >>> 8)));
      }
      return s;
    }
    clone() {
      const e = super.clone.call(this);
      return (e._hash = this._hash.clone()), e;
    }
  }
);
var Te = "1.3.2-beta.8";
function Re() {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
  var n = e.join(" ");
  console.log(n);
}
function Pe() {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
  var n = e.join(" ");
  console.error(n);
}
var _e = (function () {
    function e(e) {
      this.baseURL = e;
    }
    return (
      (e.prototype.send = function (e) {
        var t = e.method || "GET",
          n = "GET" === t,
          r = this.baseURL + e.path;
        return (
          e.path.includes("http") && (r = e.path),
          new Promise(function (o, i) {
            var s = new XMLHttpRequest();
            (s.responseType = "json"),
              (s.onreadystatechange = function () {
                this.readyState === s.DONE &&
                  (this.response
                    ? o(this.response)
                    : (window.webrtcFailedCallback &&
                        window.webrtcFailedCallback(),
                      i("错误的请求:".concat(r))));
              });
            var a = Object.entries(e.body)
                .map(function (e) {
                  var t = e[0],
                    n = e[1];
                  return "&".concat(t, "=").concat(n);
                })
                .join("")
                .replace("&", ""),
              c = n ? r + "?" + a : r,
              d = n ? null : JSON.stringify(e.body);
            s.open(t.toLocaleLowerCase(), c, !0),
              s.setRequestHeader(
                "Content-Type",
                "application/json;charset=utf-8"
              ),
              s.setRequestHeader("Accept", "application/json;charset=utf-8"),
              e.Authorization &&
                s.setRequestHeader("Authorization", e.Authorization),
              s.send(d);
          })
        );
      }),
      e
    );
  })(),
  Ae = (function () {
    function e(e) {
      this.baseURL = e;
    }
    return (
      (e.prototype.send = function (e) {
        var t = e.method || "GET",
          n = "GET" === t,
          r = (this.baseURL + e.path).substring(
            0,
            (this.baseURL + e.path).length - 1
          ),
          o = Object.assign({}, e.body);
        return (
          o.req_type || (o.req_type = "0"),
          new Promise(function (i, s) {
            var a = new XMLHttpRequest();
            (a.responseType = "json"),
              (a.onreadystatechange = function () {
                if (this.readyState === a.DONE)
                  if (this.response) {
                    var e =
                      this.response["C-Response-Body"] &&
                      this.response["C-Response-Body"].Data_Enqr_Rslt;
                    i(JSON.parse(e) || {});
                  } else s("错误的请求:".concat(r));
              });
            var c = Object.entries(e.body)
                .map(function (e) {
                  var t = e[0],
                    n = e[1];
                  return "&".concat(t, "=").concat(n);
                })
                .join("")
                .replace("&", ""),
              d = n ? r + "?" + c : r,
              u = n ? null : JSON.stringify({ Data_Cntnt: JSON.stringify(o) });
            a.open(t.toLocaleLowerCase(), d, !0),
              a.setRequestHeader(
                "Content-Type",
                "application/json;charset=utf-8"
              ),
              a.setRequestHeader("Accept", "application/json;charset=utf-8"),
              a.send(u);
          })
        );
      }),
      e
    );
  })(),
  xe = "TA238DH09",
  De = "TA238DH10",
  Ee = "TA238DH11",
  Oe = {
    asrOld: "/asr/",
    asr: "/asr/getResult/",
    login: "/user/auth/eaccess_token_login/",
    chat: "/api/v1/dmp/ttsa/chat/",
    interrupt: "/api/v1/dmp/ttsa/interrupt/",
    mute: "/api/v1/dmp/ttsa/mute/",
    ue4_config: "/api/v1/dmp/ttsa/ue4_config/",
    close: "/api/v1/dmp/ttsa/close/",
    open: "/api/v1/dmp/ttsa/open/",
    ttsa: "/api/v1/dmp/ttsa/ttsa/",
    action: "/api/v1/dmp/ttsa/auto_action/",
    predict: "/predict",
    registerC6: "/szr/business/register/",
    chatC6: "/szr/business/chat/",
    logoutC6: "/szr/business/logout/",
    asrC6: "/szr/asr/getResult/",
  },
  je = function (e, t) {
    var n = "";
    return "test" === e && (n = "/szr"), "".concat(n).concat(Oe[t]);
  };
(Me.sessions = {}),
  (Me.isExtensionEnabled = function () {
    if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia)
      return !0;
    if (window.navigator.userAgent.match("Chrome")) {
      var e = parseInt(
          window.navigator.userAgent.match(/Chrome\/(.*) /)[1],
          10
        ),
        t = 33;
      return (
        window.navigator.userAgent.match("Linux") && (t = 35),
        (e >= 26 && e <= t) || Me.extension.isInstalled()
      );
    }
    return !0;
  });
var Ie = {
  extensionId: "hapfgfdkleiggjjpfpenajgdnfckjpaj",
  isInstalled: function () {
    return null !== document.querySelector("#janus-extension-installed");
  },
  getScreen: function (e) {
    var t = window.setTimeout(function () {
      var t = new Error("NavigatorUserMediaError");
      return (
        (t.name =
          'The required Chrome extension is not installed: click <a href="#">here</a> to install it. (NOTE: this will need you to refresh the page)'),
        e(t)
      );
    }, 1e3);
    (this.cache[t] = e),
      window.postMessage({ type: "janusGetScreen", id: t }, "*");
  },
  init: function () {
    var e = {};
    (this.cache = e),
      window.addEventListener("message", function (t) {
        if (t.origin == window.location.origin)
          if ("janusGotScreen" == t.data.type && e[t.data.id]) {
            var n = e[t.data.id];
            if ((delete e[t.data.id], "" === t.data.sourceId)) {
              var r = new Error("NavigatorUserMediaError");
              (r.name =
                "You cancelled the request for permission, giving up..."),
                n(r);
            } else n(null, t.data.sourceId);
          } else
            "janusGetScreenPending" == t.data.type &&
              (console.log("clearing ", t.data.id),
              window.clearTimeout(t.data.id));
      });
  },
};
function Me(e) {
  if (
    (((e = e || {}).success =
      "function" == typeof e.success ? e.success : Me.noop),
    (e.error = "function" == typeof e.error ? e.error : Me.noop),
    (e.destroyed = "function" == typeof e.destroyed ? e.destroyed : Me.noop),
    !Me.initDone)
  )
    return e.error("Library not initialized"), {};
  if (!Me.isWebrtcSupported())
    return e.error("WebRTC not supported by this browser"), {};
  if ((Me.log("Library initialized: " + Me.initDone), !e.server))
    return e.error("Invalid server url"), {};
  var t = !1,
    n = null,
    r = {},
    o = null,
    i = null,
    s = 0,
    a = e.server;
  Me.isArray(a)
    ? (Me.log(
        "Multiple servers provided (" +
          a.length +
          "), will use the first that works"
      ),
      (a = null),
      (i = e.server),
      Me.debug(i))
    : 0 === a.indexOf("ws")
    ? ((t = !0), Me.log("Using WebSockets to contact Janus: " + a))
    : ((t = !1), Me.log("Using REST API to contact Janus: " + a));
  var c = e.iceServers || [{ urls: "stun:stun.l.google.com:19302" }],
    d = e.iceTransportPolicy,
    u = e.bundlePolicy,
    p = !0 === e.ipv6,
    l = !1;
  void 0 !== e.withCredentials &&
    null !== e.withCredentials &&
    (l = !0 === e.withCredentials);
  var h = 10;
  void 0 !== e.max_poll_events &&
    null !== e.max_poll_events &&
    (h = e.max_poll_events),
    h < 1 && (h = 1);
  var f = null;
  void 0 !== e.token && null !== e.token && (f = e.token);
  var m = null;
  void 0 !== e.apisecret && null !== e.apisecret && (m = e.apisecret),
    (this.destroyOnUnload = !0),
    void 0 !== e.destroyOnUnload &&
      null !== e.destroyOnUnload &&
      (this.destroyOnUnload = !0 === e.destroyOnUnload);
  var g = 25e3;
  void 0 !== e.keepAlivePeriod &&
    null !== e.keepAlivePeriod &&
    (g = e.keepAlivePeriod),
    isNaN(g) && (g = 25e3);
  var v = 6e4;
  function y(e) {
    var t = { high: 9e5, medium: 3e5, low: 1e5 };
    return (
      null != e &&
        (e.high && (t.high = e.high),
        e.medium && (t.medium = e.medium),
        e.low && (t.low = e.low)),
      t
    );
  }
  void 0 !== e.longPollTimeout &&
    null !== e.longPollTimeout &&
    (v = e.longPollTimeout),
    isNaN(v) && (v = 6e4);
  var b,
    C = !1,
    w = null,
    S = {},
    k = this,
    T = 0,
    R = {};
  function P() {
    if (null != w)
      if ((Me.debug("Long poll..."), C)) {
        var t = a + "/" + w + "?rid=" + new Date().getTime();
        h && (t = t + "&maxev=" + h),
          f && (t = t + "&token=" + encodeURIComponent(f)),
          m && (t = t + "&apisecret=" + encodeURIComponent(m)),
          Me.httpAPICall(t, {
            verb: "GET",
            withCredentials: l,
            success: _,
            timeout: v,
            error: function (t, n) {
              if ((Me.error(t + ":", n), ++T > 3))
                return (
                  (C = !1),
                  void e.error("Lost connection to the server (is it down?)")
                );
              P();
            },
          });
      } else Me.warn("Is the server down? (connected=false)");
  }
  function _(e, r) {
    if (((T = 0), t || null == w || !0 === r || P(), t || !Me.isArray(e)))
      if ("keepalive" !== e.janus)
        if ("ack" !== e.janus)
          if ("success" !== e.janus)
            if ("trickle" === e.janus) {
              if (!(c = e.sender)) return void Me.warn("Missing sender...");
              if (!(u = S[c]))
                return void Me.debug(
                  "This handle is not attached to this session"
                );
              var o = e.candidate;
              Me.debug("Got a trickled candidate on session " + w), Me.debug(o);
              var i = u.webrtcStuff;
              i.pc && i.remoteSdp
                ? (Me.debug("Adding remote candidate:", o),
                  o && !0 !== o.completed
                    ? i.pc.addIceCandidate(o)
                    : i.pc.addIceCandidate(Me.endOfCandidates))
                : (Me.debug(
                    "We didn't do setRemoteDescription (trickle got here before the offer?), caching candidate"
                  ),
                  i.candidates || (i.candidates = []),
                  i.candidates.push(o),
                  Me.debug(i.candidates));
            } else {
              if ("webrtcup" === e.janus)
                return (
                  Me.debug("Got a webrtcup event on session " + w),
                  Me.debug(e),
                  (c = e.sender)
                    ? (u = S[c])
                      ? void u.webrtcState(!0)
                      : void Me.debug(
                          "This handle is not attached to this session"
                        )
                    : void Me.warn("Missing sender...")
                );
              if ("hangup" === e.janus) {
                if (
                  (Me.debug("Got a hangup event on session " + w),
                  Me.debug(e),
                  !(c = e.sender))
                )
                  return void Me.warn("Missing sender...");
                if (!(u = S[c]))
                  return void Me.debug(
                    "This handle is not attached to this session"
                  );
                u.webrtcState(!1, e.reason), u.hangup();
              } else if ("detached" === e.janus) {
                if (
                  (Me.debug("Got a detached event on session " + w),
                  Me.debug(e),
                  !(c = e.sender))
                )
                  return void Me.warn("Missing sender...");
                if (!(u = S[c])) return;
                (u.detached = !0), u.ondetached(), u.detach();
              } else if ("media" === e.janus) {
                if (
                  (Me.debug("Got a media event on session " + w),
                  Me.debug(e),
                  !(c = e.sender))
                )
                  return void Me.warn("Missing sender...");
                if (!(u = S[c]))
                  return void Me.debug(
                    "This handle is not attached to this session"
                  );
                u.mediaState(e.type, e.receiving);
              } else if ("slowlink" === e.janus) {
                if (
                  (Me.debug("Got a slowlink event on session " + w),
                  Me.debug(e),
                  !(c = e.sender))
                )
                  return void Me.warn("Missing sender...");
                if (!(u = S[c]))
                  return void Me.debug(
                    "This handle is not attached to this session"
                  );
                u.slowLink(e.uplink, e.lost);
              } else {
                if ("error" === e.janus) {
                  var s, a;
                  if (
                    (Me.error("Ooops: " + e.error.code + " " + e.error.reason),
                    Me.debug(e),
                    (s = e.transaction))
                  )
                    (a = R[s]) && a(e), delete R[s];
                  return;
                }
                if ("event" === e.janus) {
                  var c;
                  if (
                    (Me.debug("Got a plugin event on session " + w),
                    Me.debug(e),
                    !(c = e.sender))
                  )
                    return void Me.warn("Missing sender...");
                  var d = e.plugindata;
                  if (!d) return void Me.warn("Missing plugindata...");
                  Me.debug(
                    "  -- Event is coming from " + c + " (" + d.plugin + ")"
                  );
                  var u,
                    p = d.data;
                  if ((Me.debug(p), !(u = S[c])))
                    return void Me.warn(
                      "This handle is not attached to this session"
                    );
                  var l = e.jsep;
                  l && (Me.debug("Handling SDP as well..."), Me.debug(l));
                  var h = u.onmessage;
                  h
                    ? (Me.debug("Notifying application..."), h(p, l))
                    : Me.debug("No provided notification callback");
                } else {
                  if ("timeout" === e.janus)
                    return (
                      Me.error("Timeout on session " + w),
                      Me.debug(e),
                      void (t && n.close(3504, "Gateway timeout"))
                    );
                  Me.warn(
                    "Unknown message/event  '" + e.janus + "' on session " + w
                  ),
                    Me.debug(e);
                }
              }
            }
          else
            Me.debug("Got a success on session " + w),
              Me.debug(e),
              (s = e.transaction) && ((a = R[s]) && a(e), delete R[s]);
        else
          Me.debug("Got an ack on session " + w),
            Me.debug(e),
            (s = e.transaction) && ((a = R[s]) && a(e), delete R[s]);
      else Me.vdebug("Got a keepalive on session " + w);
    else for (var f = 0; f < e.length; f++) _(e[f], !0);
  }
  function A() {
    if (a && t && C) {
      o = setTimeout(A, g);
      var e = {
        janus: "keepalive",
        session_id: w,
        transaction: Me.randomString(12),
      };
      f && (e.token = f), m && (e.apisecret = m), n.send(JSON.stringify(e));
    }
  }
  function x(c) {
    var d = Me.randomString(12),
      u = { janus: "create", transaction: d };
    if (
      (c.reconnect &&
        ((C = !1),
        (u.janus = "claim"),
        (u.session_id = w),
        n &&
          ((n.onopen = null),
          (n.onerror = null),
          (n.onclose = null),
          o && (clearTimeout(o), (o = null)))),
      f && (u.token = f),
      m && (u.apisecret = m),
      !a &&
        Me.isArray(i) &&
        (0 === (a = i[s]).indexOf("ws")
          ? ((t = !0),
            Me.log(
              "Server #" +
                (s + 1) +
                ": trying WebSockets to contact Janus (" +
                a +
                ")"
            ))
          : ((t = !1),
            Me.log(
              "Server #" +
                (s + 1) +
                ": trying REST API to contact Janus (" +
                a +
                ")"
            ))),
      t)
    )
      for (var p in ((n = Me.newWebSocket(a, "janus-protocol")),
      (r = {
        error: function () {
          if (
            (Me.error(
              "Error connecting to the Janus WebSockets server... " + a
            ),
            Me.isArray(i) && !c.reconnect)
          )
            return ++s === i.length
              ? void c.error(
                  "Error connecting to any of the provided Janus servers: Is the server down?"
                )
              : ((a = null),
                void setTimeout(function () {
                  x(c);
                }, 200));
          c.error(
            "Error connecting to the Janus WebSockets server: Is the server down?"
          );
        },
        open: function () {
          (R[d] = function (e) {
            if ((Me.debug(e), "success" !== e.janus))
              return (
                Me.error("Ooops: " + e.error.code + " " + e.error.reason),
                void c.error(e.error.reason)
              );
            (o = setTimeout(A, g)),
              (C = !0),
              (w = e.session_id ? e.session_id : e.data.id),
              c.reconnect
                ? Me.log("Claimed session: " + w)
                : Me.log("Created session: " + w),
              (Me.sessions[w] = k),
              c.success();
          }),
            n.send(JSON.stringify(u));
        },
        message: function (e) {
          _(JSON.parse(e.data));
        },
        close: function () {
          a &&
            C &&
            ((C = !1), e.error("Lost connection to the server (is it down?)"));
        },
      })))
        n.addEventListener(p, r[p]);
    else
      Me.httpAPICall(a, {
        verb: "POST",
        withCredentials: l,
        body: u,
        success: function (e) {
          if ((Me.debug(e), "success" !== e.janus))
            return (
              Me.error("Ooops: " + e.error.code + " " + e.error.reason),
              void c.error(e.error.reason)
            );
          (C = !0),
            (w = e.session_id ? e.session_id : e.data.id),
            c.reconnect
              ? Me.log("Claimed session: " + w)
              : Me.log("Created session: " + w),
            (Me.sessions[w] = k),
            P(),
            c.success();
        },
        error: function (e, t) {
          if ((Me.error(e + ":", t), Me.isArray(i) && !c.reconnect))
            return ++s === i.length
              ? void c.error(
                  "Error connecting to any of the provided Janus servers: Is the server down?"
                )
              : ((a = null),
                void setTimeout(function () {
                  x(c);
                }, 200));
          "" === t
            ? c.error(e + ": Is the server down?")
            : c.error(e + ": " + t);
        },
      });
  }
  function D(e, r) {
    if (
      (((r = r || {}).success =
        "function" == typeof r.success ? r.success : Me.noop),
      (r.error = "function" == typeof r.error ? r.error : Me.noop),
      !C)
    )
      return (
        Me.warn("Is the server down? (connected=false)"),
        void r.error("Is the server down? (connected=false)")
      );
    var o = S[e];
    if (!o || !o.webrtcStuff)
      return Me.warn("Invalid handle"), void r.error("Invalid handle");
    var i = r.message,
      s = r.jsep,
      c = Me.randomString(12),
      d = { janus: "message", body: i, transaction: c };
    if (
      (o.token && (d.token = o.token),
      m && (d.apisecret = m),
      s && (d.jsep = s),
      Me.debug("Sending message to plugin (handle=" + e + "):"),
      Me.debug(d),
      t)
    )
      return (
        (d.session_id = w),
        (d.handle_id = e),
        (R[c] = function (e) {
          if ((Me.debug("Message sent!"), Me.debug(e), "success" === e.janus)) {
            var t = e.plugindata;
            if (!t)
              return (
                Me.warn("Request succeeded, but missing plugindata..."),
                void r.success()
              );
            Me.log("Synchronous transaction successful (" + t.plugin + ")");
            var n = t.data;
            return Me.debug(n), void r.success(n);
          }
          "ack" === e.janus
            ? r.success()
            : e.error
            ? (Me.error("Ooops: " + e.error.code + " " + e.error.reason),
              r.error(e.error.code + " " + e.error.reason))
            : (Me.error("Unknown error"), r.error("Unknown error"));
        }),
        void n.send(JSON.stringify(d))
      );
    Me.httpAPICall(a + "/" + w + "/" + e, {
      verb: "POST",
      withCredentials: l,
      body: d,
      success: function (e) {
        if ((Me.debug("Message sent!"), Me.debug(e), "success" === e.janus)) {
          var t = e.plugindata;
          if (!t)
            return (
              Me.warn("Request succeeded, but missing plugindata..."),
              void r.success()
            );
          Me.log("Synchronous transaction successful (" + t.plugin + ")");
          var n = t.data;
          return Me.debug(n), void r.success(n);
        }
        "ack" === e.janus
          ? r.success()
          : e.error
          ? (Me.error("Ooops: " + e.error.code + " " + e.error.reason),
            r.error(e.error.code + " " + e.error.reason))
          : (Me.error("Unknown error"), r.error("Unknown error"));
      },
      error: function (e, t) {
        Me.error(e + ":", t), r.error(e + ": " + t);
      },
    });
  }
  function E(e, r) {
    if (C) {
      var o = S[e];
      if (o && o.webrtcStuff) {
        var i = {
          janus: "trickle",
          candidate: r,
          transaction: Me.randomString(12),
        };
        if (
          (o.token && (i.token = o.token),
          m && (i.apisecret = m),
          Me.vdebug("Sending trickle candidate (handle=" + e + "):"),
          Me.vdebug(i),
          t)
        )
          return (
            (i.session_id = w),
            (i.handle_id = e),
            void n.send(JSON.stringify(i))
          );
        Me.httpAPICall(a + "/" + w + "/" + e, {
          verb: "POST",
          withCredentials: l,
          body: i,
          success: function (e) {
            Me.vdebug("Candidate sent!"),
              Me.vdebug(e),
              "ack" === e.janus ||
                Me.error("Ooops: " + e.error.code + " " + e.error.reason);
          },
          error: function (e, t) {
            Me.error(e + ":", t);
          },
        });
      } else Me.warn("Invalid handle");
    } else Me.warn("Is the server down? (connected=false)");
  }
  function O(e) {
    if (Me.statCallback) {
      Me.statCheckId && clearTimeout(Me.statCheckId);
      var t = window.frameInterval || 1500;
      Me.statCheckId = setTimeout(function () {
        e.getStats().then(function (n) {
          n.forEach(function (n) {
            if (n && "video" === n.kind && "inbound-rtp" === n.type) {
              if (
                (console.log(
                  "lastPacketReceivedTimestamp:",
                  n.lastPacketReceivedTimestamp
                ),
                !b)
              )
                return (b = n.lastPacketReceivedTimestamp), void O(e);
              var r = n.lastPacketReceivedTimestamp - b < t;
              Me.statCallback(r),
                r
                  ? ((b = n.lastPacketReceivedTimestamp), O(e))
                  : clearTimeout(Me.statCheckId);
            }
          });
        });
      }, 1e3);
    }
  }
  function j(e, t, n, r) {
    var o = S[e];
    if (o && o.webrtcStuff) {
      var i = o.webrtcStuff,
        s = function (e) {
          Me.log("Received state change on data channel:", e);
          var t = e.target.label,
            n = i.dataChannel[t] ? i.dataChannel[t].readyState : "null";
          if (
            (Me.log("State change on <" + t + "> data channel: " + n),
            "open" === n)
          ) {
            if (
              (O(i.pc),
              i.dataChannel[t].pending && i.dataChannel[t].pending.length > 0)
            ) {
              for (var r of (Me.log(
                "Sending pending messages on <" + t + ">:",
                i.dataChannel[t].pending.length
              ),
              i.dataChannel[t].pending))
                Me.log("Sending data on data channel <" + t + ">"),
                  Me.debug(r),
                  i.dataChannel[t].send(r);
              i.dataChannel[t].pending = [];
            }
            o.ondataopen(t);
          }
          "close" === n && clearTimeout(Me.statCheckId);
        };
      (i.dataChannel[t] = n || i.pc.createDataChannel(t, { ordered: !0 })),
        (i.dataChannel[t].onmessage = function (e) {
          Me.log("Received message on data channel:", e);
          var t = e.target.label;
          o.ondata(e.data, t);
        }),
        (i.dataChannel[t].onopen = s),
        (i.dataChannel[t].onclose = s),
        (i.dataChannel[t].onerror = function (e) {
          Me.error("Got error on data channel:", e);
        }),
        (i.dataChannel[t].pending = []),
        r && i.dataChannel[t].pending.push(r);
    } else Me.warn("Invalid handle");
  }
  function I(e, t) {
    ((t = t || {}).success =
      "function" == typeof t.success ? t.success : Me.noop),
      (t.error = "function" == typeof t.error ? t.error : Me.noop);
    var n = S[e];
    if (!n || !n.webrtcStuff)
      return Me.warn("Invalid handle"), void t.error("Invalid handle");
    var r = n.webrtcStuff,
      o = t.text || t.data;
    if (!o) return Me.warn("Invalid data"), void t.error("Invalid data");
    var i = t.label ? t.label : Me.dataChanDefaultLabel;
    return r.dataChannel[i]
      ? "open" !== r.dataChannel[i].readyState
        ? (r.dataChannel[i].pending.push(o), void t.success())
        : (Me.log("Sending data on data channel <" + i + ">"),
          Me.debug(o),
          r.dataChannel[i].send(o),
          void t.success())
      : (j(e, i, !1, o), void t.success());
  }
  function M(e, t) {
    ((t = t || {}).success =
      "function" == typeof t.success ? t.success : Me.noop),
      (t.error = "function" == typeof t.error ? t.error : Me.noop);
    var n = S[e];
    if (!n || !n.webrtcStuff)
      return Me.warn("Invalid handle"), void t.error("Invalid handle");
    var r = n.webrtcStuff;
    if (!r.dtmfSender) {
      if (r.pc) {
        var o = r.pc.getSenders().find(function (e) {
          return e.track && "audio" === e.track.kind;
        });
        if (!o)
          return (
            Me.warn("Invalid DTMF configuration (no audio track)"),
            void t.error("Invalid DTMF configuration (no audio track)")
          );
        (r.dtmfSender = o.dtmf),
          r.dtmfSender &&
            (Me.log("Created DTMF Sender"),
            (r.dtmfSender.ontonechange = function (e) {
              Me.debug("Sent DTMF tone: " + e.tone);
            }));
      }
      if (!r.dtmfSender)
        return (
          Me.warn("Invalid DTMF configuration"),
          void t.error("Invalid DTMF configuration")
        );
    }
    var i = t.dtmf;
    if (!i)
      return (
        Me.warn("Invalid DTMF parameters"),
        void t.error("Invalid DTMF parameters")
      );
    var s = i.tones;
    if (!s)
      return (
        Me.warn("Invalid DTMF string"), void t.error("Invalid DTMF string")
      );
    var a = "number" == typeof i.duration ? i.duration : 500,
      c = "number" == typeof i.gap ? i.gap : 50;
    Me.debug(
      "Sending DTMF string " + s + " (duration " + a + "ms, gap " + c + "ms)"
    ),
      r.dtmfSender.insertDTMF(s, a, c),
      t.success();
  }
  function F(e, r) {
    ((r = r || {}).success =
      "function" == typeof r.success ? r.success : Me.noop),
      (r.error = "function" == typeof r.error ? r.error : Me.noop);
    var o = !0 === r.noRequest;
    Me.log("Destroying handle " + e + " (only-locally=" + o + ")"), H(e);
    var i = S[e];
    if (!i || i.detached) return delete S[e], void r.success();
    if (o) return delete S[e], void r.success();
    if (!C)
      return (
        Me.warn("Is the server down? (connected=false)"),
        void r.error("Is the server down? (connected=false)")
      );
    var s = { janus: "detach", transaction: Me.randomString(12) };
    if ((i.token && (s.token = i.token), m && (s.apisecret = m), t))
      return (
        (s.session_id = w),
        (s.handle_id = e),
        n.send(JSON.stringify(s)),
        delete S[e],
        void r.success()
      );
    Me.httpAPICall(a + "/" + w + "/" + e, {
      verb: "POST",
      withCredentials: l,
      body: s,
      success: function (t) {
        Me.log("Destroyed handle:"),
          Me.debug(t),
          "success" !== t.janus &&
            Me.error("Ooops: " + t.error.code + " " + t.error.reason),
          delete S[e],
          r.success();
      },
      error: function (t, n) {
        Me.error(t + ":", n), delete S[e], r.success();
      },
    });
  }
  function N(e, t, n, r, o) {
    var i = S[e];
    if (!i || !i.webrtcStuff)
      return Me.warn("Invalid handle"), void r.error("Invalid handle");
    var s = i.webrtcStuff;
    Me.debug("streamsDone:", o),
      o &&
        (Me.debug("  -- Audio tracks:", o.getAudioTracks()),
        Me.debug("  -- Video tracks:", o.getVideoTracks()));
    var a = !1;
    if (s.myStream && n.update && !s.streamExternal) {
      if (
        ((!n.update && W(n)) || (n.update && (n.addAudio || n.replaceAudio))) &&
        o.getAudioTracks() &&
        o.getAudioTracks().length
      )
        if ((s.myStream.addTrack(o.getAudioTracks()[0]), Me.unifiedPlan)) {
          Me.log(
            (n.replaceAudio ? "Replacing" : "Adding") + " audio track:",
            o.getAudioTracks()[0]
          );
          var l = null;
          if ((f = s.pc.getTransceivers()) && f.length > 0)
            for (var h of f)
              if (
                (h.sender &&
                  h.sender.track &&
                  "audio" === h.sender.track.kind) ||
                (h.receiver &&
                  h.receiver.track &&
                  "audio" === h.receiver.track.kind)
              ) {
                l = h;
                break;
              }
          l && l.sender
            ? l.sender.replaceTrack(o.getAudioTracks()[0])
            : s.pc.addTrack(o.getAudioTracks()[0], o);
        } else
          Me.log(
            (n.replaceAudio ? "Replacing" : "Adding") + " audio track:",
            o.getAudioTracks()[0]
          ),
            s.pc.addTrack(o.getAudioTracks()[0], o);
      if (
        ((!n.update && X(n)) || (n.update && (n.addVideo || n.replaceVideo))) &&
        o.getVideoTracks() &&
        o.getVideoTracks().length
      )
        if ((s.myStream.addTrack(o.getVideoTracks()[0]), Me.unifiedPlan)) {
          Me.log(
            (n.replaceVideo ? "Replacing" : "Adding") + " video track:",
            o.getVideoTracks()[0]
          );
          var f,
            m = null;
          if ((f = s.pc.getTransceivers()) && f.length > 0)
            for (var h of f)
              if (
                (h.sender &&
                  h.sender.track &&
                  "video" === h.sender.track.kind) ||
                (h.receiver &&
                  h.receiver.track &&
                  "video" === h.receiver.track.kind)
              ) {
                m = h;
                break;
              }
          m && m.sender
            ? m.sender.replaceTrack(o.getVideoTracks()[0])
            : s.pc.addTrack(o.getVideoTracks()[0], o);
        } else
          Me.log(
            (n.replaceVideo ? "Replacing" : "Adding") + " video track:",
            o.getVideoTracks()[0]
          ),
            s.pc.addTrack(o.getVideoTracks()[0], o);
    } else (s.myStream = o), (a = !0);
    if (!s.pc) {
      var g = { iceServers: c, iceTransportPolicy: d, bundlePolicy: u };
      "chrome" === Me.webRTCAdapter.browserDetails.browser &&
        (g.sdpSemantics =
          Me.webRTCAdapter.browserDetails.version < 72
            ? "plan-b"
            : "unified-plan");
      var v = { optional: [{ DtlsSrtpKeyAgreement: !0 }] };
      if (
        (p && v.optional.push({ googIPv6: !0 }),
        r.rtcConstraints && "object" == typeof r.rtcConstraints)
      )
        for (var b in (Me.debug(
          "Adding custom PeerConnection constraints:",
          r.rtcConstraints
        ),
        r.rtcConstraints))
          v.optional.push(r.rtcConstraints[b]);
      "edge" === Me.webRTCAdapter.browserDetails.browser &&
        (g.bundlePolicy = "max-bundle"),
        Me.log("Creating PeerConnection"),
        Me.debug(v),
        (s.pc = new RTCPeerConnection(g, v)),
        Me.debug(s.pc),
        s.pc.getStats && ((s.volume = {}), (s.bitrate.value = "0 kbits/sec")),
        Me.log(
          "Preparing local SDP and gathering candidates (trickle=" +
            s.trickle +
            ")"
        ),
        (s.pc.oniceconnectionstatechange = function (e) {
          s.pc && i.iceState(s.pc.iceConnectionState);
        }),
        (s.pc.onicecandidate = function (t) {
          if (
            (console.log("【【 关键日志 onicecandidate 】】"),
            console.log(t.candidate),
            console.log(Me.webRTCAdapter.browserDetails.browser),
            !t.candidate ||
              ("edge" === Me.webRTCAdapter.browserDetails.browser &&
                t.candidate.candidate.indexOf("endOfCandidates") > 0))
          )
            Me.log("End of candidates."),
              (s.iceDone = !0),
              !0 === s.trickle
                ? E(e, { completed: !0 })
                : (function (e, t) {
                    ((t = t || {}).success =
                      "function" == typeof t.success ? t.success : Me.noop),
                      (t.error =
                        "function" == typeof t.error ? t.error : Me.noop);
                    var n = S[e];
                    if (!n || !n.webrtcStuff)
                      return void Me.warn(
                        "Invalid handle, not sending anything"
                      );
                    var r = n.webrtcStuff;
                    if ((Me.log("Sending offer/answer SDP..."), !r.mySdp))
                      return void Me.warn(
                        "Local SDP instance is invalid, not sending anything..."
                      );
                    (r.mySdp = {
                      type: r.pc.localDescription.type,
                      sdp: r.pc.localDescription.sdp,
                    }),
                      !1 === r.trickle && (r.mySdp.trickle = !1);
                    Me.debug(t), (r.sdpSent = !0), t.success(r.mySdp);
                  })(e, r);
          else {
            var n = {
              candidate: t.candidate.candidate,
              sdpMid: t.candidate.sdpMid,
              sdpMLineIndex: t.candidate.sdpMLineIndex,
            };
            !0 === s.trickle && E(e, n);
          }
        }),
        (s.pc.ontrack = function (e) {
          Me.log("Handling Remote Track"),
            Me.debug(e),
            e.streams &&
              ((s.remoteStream = e.streams[0]),
              i.onremotestream(s.remoteStream),
              e.track.onended ||
                Me.log("Adding onended callback to track:", e.track));
        });
    }
    if (a && o) {
      Me.log("Adding local stream");
      var C = !0 === r.simulcast2;
      o.getTracks().forEach(function (e) {
        if ((Me.log("Adding local track:", e), C))
          if ("audio" === e.kind) s.pc.addTrack(e, o);
          else {
            Me.log("Enabling rid-based simulcasting:", e);
            var t = y(r.simulcastMaxBitrates);
            s.pc.addTransceiver(e, {
              direction: "sendrecv",
              streams: [o],
              sendEncodings: [
                { rid: "h", active: !0, maxBitrate: t.high },
                {
                  rid: "m",
                  active: !0,
                  maxBitrate: t.medium,
                  scaleResolutionDownBy: 2,
                },
                {
                  rid: "l",
                  active: !0,
                  maxBitrate: t.low,
                  scaleResolutionDownBy: 4,
                },
              ],
            });
          }
        else s.pc.addTrack(e, o);
      });
    }
    (function (e) {
      if (
        (Me.debug("isDataEnabled:", e),
        "edge" === Me.webRTCAdapter.browserDetails.browser)
      )
        return Me.warn("Edge doesn't support data channels yet"), !1;
      return null != e && !0 === e.data;
    })(n) &&
      !s.dataChannel[Me.dataChanDefaultLabel] &&
      (Me.log("Creating data channel"),
      j(e, Me.dataChanDefaultLabel, !1),
      (s.pc.ondatachannel = function (t) {
        Me.log("Data channel created by Janus:", t),
          j(e, t.channel.label, t.channel);
      })),
      s.myStream && i.onlocalstream(s.myStream),
      t
        ? s.pc.setRemoteDescription(t).then(function () {
            if (
              (Me.log("Remote description accepted!"),
              (s.remoteSdp = t.sdp),
              s.candidates && s.candidates.length > 0)
            ) {
              for (var o = 0; o < s.candidates.length; o++) {
                var i = s.candidates[o];
                Me.debug("Adding remote candidate:", i),
                  i && !0 !== i.completed
                    ? s.pc.addIceCandidate(i)
                    : s.pc.addIceCandidate(Me.endOfCandidates);
              }
              s.candidates = [];
            }
            !(function (e, t, n) {
              ((n = n || {}).success =
                "function" == typeof n.success ? n.success : Me.noop),
                (n.error = "function" == typeof n.error ? n.error : Me.noop),
                (n.customizeSdp =
                  "function" == typeof n.customizeSdp
                    ? n.customizeSdp
                    : Me.noop);
              var r = S[e];
              if (!r || !r.webrtcStuff)
                return (
                  Me.warn("Invalid handle"), void n.error("Invalid handle")
                );
              var o = r.webrtcStuff,
                i = !0 === n.simulcast;
              i
                ? Me.log(
                    "Creating answer (iceDone=" +
                      o.iceDone +
                      ", simulcast=" +
                      i +
                      ")"
                  )
                : Me.log("Creating answer (iceDone=" + o.iceDone + ")");
              var s = null;
              if (Me.unifiedPlan) {
                s = {};
                var a = null,
                  c = null,
                  d = o.pc.getTransceivers();
                if (d && d.length > 0)
                  for (var u of d)
                    (u.sender &&
                      u.sender.track &&
                      "audio" === u.sender.track.kind) ||
                    (u.receiver &&
                      u.receiver.track &&
                      "audio" === u.receiver.track.kind)
                      ? a || (a = u)
                      : ((u.sender &&
                          u.sender.track &&
                          "video" === u.sender.track.kind) ||
                          (u.receiver &&
                            u.receiver.track &&
                            "video" === u.receiver.track.kind)) &&
                        (c || (c = u));
                var p = W(t),
                  l = G(t);
                if (p || l) {
                  if (p && l) {
                    if (a)
                      try {
                        a.setDirection
                          ? a.setDirection("sendrecv")
                          : (a.direction = "sendrecv"),
                          Me.log("Setting audio transceiver to sendrecv:", a);
                      } catch (e) {
                        Me.error(e);
                      }
                  } else if (p && !l)
                    try {
                      a &&
                        (a.setDirection
                          ? a.setDirection("sendonly")
                          : (a.direction = "sendonly"),
                        Me.log("Setting audio transceiver to sendonly:", a));
                    } catch (e) {
                      Me.error(e);
                    }
                  else if (!p && l)
                    if (a)
                      try {
                        a.setDirection
                          ? a.setDirection("recvonly")
                          : (a.direction = "recvonly"),
                          Me.log("Setting audio transceiver to recvonly:", a);
                      } catch (e) {
                        Me.error(e);
                      }
                    else
                      (a = o.pc.addTransceiver("audio", {
                        direction: "recvonly",
                      })),
                        Me.log("Adding recvonly audio transceiver:", a);
                } else if (t.removeAudio && a)
                  try {
                    a.setDirection
                      ? a.setDirection("inactive")
                      : (a.direction = "inactive"),
                      Me.log("Setting audio transceiver to inactive:", a);
                  } catch (e) {
                    Me.error(e);
                  }
                var h = X(t),
                  f = K(t);
                if (h || f) {
                  if (h && f) {
                    if (c)
                      try {
                        c.setDirection
                          ? c.setDirection("sendrecv")
                          : (c.direction = "sendrecv"),
                          Me.log("Setting video transceiver to sendrecv:", c);
                      } catch (e) {
                        Me.error(e);
                      }
                  } else if (h && !f) {
                    if (c)
                      try {
                        c.setDirection
                          ? c.setDirection("sendonly")
                          : (c.direction = "sendonly"),
                          Me.log("Setting video transceiver to sendonly:", c);
                      } catch (e) {
                        Me.error(e);
                      }
                  } else if (!h && f)
                    if (c)
                      try {
                        c.setDirection
                          ? c.setDirection("recvonly")
                          : (c.direction = "recvonly"),
                          Me.log("Setting video transceiver to recvonly:", c);
                      } catch (e) {
                        Me.error(e);
                      }
                    else
                      (c = o.pc.addTransceiver("video", {
                        direction: "recvonly",
                      })),
                        Me.log("Adding recvonly video transceiver:", c);
                } else if (t.removeVideo && c)
                  try {
                    c.setDirection
                      ? c.setDirection("inactive")
                      : (c.direction = "inactive"),
                      Me.log("Setting video transceiver to inactive:", c);
                  } catch (e) {
                    Me.error(e);
                  }
              } else s = "firefox" === Me.webRTCAdapter.browserDetails.browser || "edge" === Me.webRTCAdapter.browserDetails.browser ? { offerToReceiveAudio: G(t), offerToReceiveVideo: K(t) } : { mandatory: { OfferToReceiveAudio: G(t), OfferToReceiveVideo: K(t) } };
              Me.debug(s);
              var m = X(t);
              if (
                m &&
                i &&
                "firefox" === Me.webRTCAdapter.browserDetails.browser
              ) {
                Me.log("Enabling Simulcasting for Firefox (RID)");
                var g = o.pc.getSenders()[1];
                Me.log(g);
                var v = g.getParameters();
                Me.log(v);
                var b = y(n.simulcastMaxBitrates);
                g.setParameters({
                  encodings: [
                    {
                      rid: "high",
                      active: !0,
                      priority: "high",
                      maxBitrate: b.high,
                    },
                    {
                      rid: "medium",
                      active: !0,
                      priority: "medium",
                      maxBitrate: b.medium,
                    },
                    {
                      rid: "low",
                      active: !0,
                      priority: "low",
                      maxBitrate: b.low,
                    },
                  ],
                });
              }
              o.pc.createAnswer(s).then(function (e) {
                Me.debug(e);
                var t = { type: e.type, sdp: e.sdp };
                n.customizeSdp(t),
                  (e.sdp = t.sdp),
                  Me.log("Setting local description"),
                  m &&
                    i &&
                    ("chrome" === Me.webRTCAdapter.browserDetails.browser
                      ? Me.warn(
                          "simulcast=true, but this is an answer, and video breaks in Chrome if we enable it"
                        )
                      : "firefox" !== Me.webRTCAdapter.browserDetails.browser &&
                        Me.warn(
                          "simulcast=true, but this is not Chrome nor Firefox, ignoring"
                        )),
                  (o.mySdp = e.sdp),
                  o.pc.setLocalDescription(e).catch(n.error),
                  (o.mediaConstraints = s),
                  o.iceDone || o.trickle
                    ? n.success(e)
                    : Me.log("Waiting for all candidates...");
              }, n.error);
            })(e, n, r);
          }, r.error)
        : (function (e, t, n) {
            ((n = n || {}).success =
              "function" == typeof n.success ? n.success : Me.noop),
              (n.error = "function" == typeof n.error ? n.error : Me.noop),
              (n.customizeSdp =
                "function" == typeof n.customizeSdp ? n.customizeSdp : Me.noop);
            var r = S[e];
            if (!r || !r.webrtcStuff)
              return Me.warn("Invalid handle"), void n.error("Invalid handle");
            var o = r.webrtcStuff,
              i = !0 === n.simulcast;
            i
              ? Me.log(
                  "Creating offer (iceDone=" +
                    o.iceDone +
                    ", simulcast=" +
                    i +
                    ")"
                )
              : Me.log("Creating offer (iceDone=" + o.iceDone + ")");
            var s = {};
            if (Me.unifiedPlan) {
              var a = null,
                c = null,
                d = o.pc.getTransceivers();
              if (d && d.length > 0)
                for (var u of d)
                  (u.sender &&
                    u.sender.track &&
                    "audio" === u.sender.track.kind) ||
                  (u.receiver &&
                    u.receiver.track &&
                    "audio" === u.receiver.track.kind)
                    ? a || (a = u)
                    : ((u.sender &&
                        u.sender.track &&
                        "video" === u.sender.track.kind) ||
                        (u.receiver &&
                          u.receiver.track &&
                          "video" === u.receiver.track.kind)) &&
                      (c || (c = u));
              var p = W(t),
                l = G(t);
              p || l
                ? p && l
                  ? a &&
                    (a.setDirection
                      ? a.setDirection("sendrecv")
                      : (a.direction = "sendrecv"),
                    Me.log("Setting audio transceiver to sendrecv:", a))
                  : p && !l
                  ? a &&
                    (a.setDirection
                      ? a.setDirection("sendonly")
                      : (a.direction = "sendonly"),
                    Me.log("Setting audio transceiver to sendonly:", a))
                  : !p &&
                    l &&
                    (a
                      ? (a.setDirection
                          ? a.setDirection("recvonly")
                          : (a.direction = "recvonly"),
                        Me.log("Setting audio transceiver to recvonly:", a))
                      : ((a = o.pc.addTransceiver("audio", {
                          direction: "recvonly",
                        })),
                        Me.log("Adding recvonly audio transceiver:", a)))
                : t.removeAudio &&
                  a &&
                  (a.setDirection
                    ? a.setDirection("inactive")
                    : (a.direction = "inactive"),
                  Me.log("Setting audio transceiver to inactive:", a));
              var h = X(t),
                f = K(t);
              h || f
                ? h && f
                  ? c &&
                    (c.setDirection
                      ? c.setDirection("sendrecv")
                      : (c.direction = "sendrecv"),
                    Me.log("Setting video transceiver to sendrecv:", c))
                  : h && !f
                  ? c &&
                    (c.setDirection
                      ? c.setDirection("sendonly")
                      : (c.direction = "sendonly"),
                    Me.log("Setting video transceiver to sendonly:", c))
                  : !h &&
                    f &&
                    (c
                      ? (c.setDirection
                          ? c.setDirection("recvonly")
                          : (c.direction = "recvonly"),
                        Me.log("Setting video transceiver to recvonly:", c))
                      : ((c = o.pc.addTransceiver("video", {
                          direction: "recvonly",
                        })),
                        Me.log("Adding recvonly video transceiver:", c)))
                : t.removeVideo &&
                  c &&
                  (c.setDirection
                    ? c.setDirection("inactive")
                    : (c.direction = "inactive"),
                  Me.log("Setting video transceiver to inactive:", c));
            } else
              (s.offerToReceiveAudio = G(t)), (s.offerToReceiveVideo = K(t));
            !0 === n.iceRestart && (s.iceRestart = !0);
            Me.debug(s);
            var m = X(t);
            if (
              m &&
              i &&
              "firefox" === Me.webRTCAdapter.browserDetails.browser
            ) {
              Me.log("Enabling Simulcasting for Firefox (RID)");
              var g = o.pc.getSenders().find(function (e) {
                return "video" === e.track.kind;
              });
              if (g) {
                var v = g.getParameters();
                v || (v = {});
                var b = y(n.simulcastMaxBitrates);
                (v.encodings = [
                  { rid: "h", active: !0, maxBitrate: b.high },
                  {
                    rid: "m",
                    active: !0,
                    maxBitrate: b.medium,
                    scaleResolutionDownBy: 2,
                  },
                  {
                    rid: "l",
                    active: !0,
                    maxBitrate: b.low,
                    scaleResolutionDownBy: 4,
                  },
                ]),
                  g.setParameters(v);
              }
            }
            o.pc.createOffer(s).then(function (e) {
              Me.debug(e);
              var t = { type: e.type, sdp: e.sdp };
              n.customizeSdp(t),
                (e.sdp = t.sdp),
                Me.log("Setting local description"),
                m &&
                  i &&
                  ("chrome" === Me.webRTCAdapter.browserDetails.browser ||
                  "safari" === Me.webRTCAdapter.browserDetails.browser
                    ? (Me.log("Enabling Simulcasting for Chrome (SDP munging)"),
                      (e.sdp = (function (e) {
                        for (
                          var t = e.split("\r\n"),
                            n = !1,
                            r = [-1],
                            o = [-1],
                            i = null,
                            s = null,
                            a = null,
                            c = null,
                            d = -1,
                            u = 0;
                          u < t.length;
                          u++
                        ) {
                          if ((l = t[u].match(/m=(\w+) */))) {
                            if ("video" === l[1]) {
                              if (!(r[0] < 0)) {
                                d = u;
                                break;
                              }
                              n = !0;
                            } else if (r[0] > -1) {
                              d = u;
                              break;
                            }
                          } else if (n) {
                            var p = t[u].match(/a=ssrc-group:FID (\d+) (\d+)/);
                            if (p)
                              (r[0] = p[1]), (o[0] = p[2]), t.splice(u, 1), u--;
                            else {
                              if (r[0]) {
                                if (
                                  ((f = t[u].match(
                                    "a=ssrc:" + r[0] + " cname:(.+)"
                                  )) && (i = f[1]),
                                  (f = t[u].match(
                                    "a=ssrc:" + r[0] + " msid:(.+)"
                                  )) && (s = f[1]),
                                  (f = t[u].match(
                                    "a=ssrc:" + r[0] + " mslabel:(.+)"
                                  )) && (a = f[1]),
                                  (f = t[u].match(
                                    "a=ssrc:" + r[0] + " label:(.+)"
                                  )) && (c = f[1]),
                                  0 === t[u].indexOf("a=ssrc:" + o[0]))
                                ) {
                                  t.splice(u, 1), u--;
                                  continue;
                                }
                                if (0 === t[u].indexOf("a=ssrc:" + r[0])) {
                                  t.splice(u, 1), u--;
                                  continue;
                                }
                              }
                              0 != t[u].length || (t.splice(u, 1), u--);
                            }
                          }
                        }
                        if (r[0] < 0) {
                          (d = -1), (n = !1);
                          for (u = 0; u < t.length; u++) {
                            var l;
                            if ((l = t[u].match(/m=(\w+) */))) {
                              if ("video" === l[1]) {
                                if (!(r[0] < 0)) {
                                  d = u;
                                  break;
                                }
                                n = !0;
                              } else if (r[0] > -1) {
                                d = u;
                                break;
                              }
                            } else if (n) {
                              if (r[0] < 0) {
                                var h = t[u].match(/a=ssrc:(\d+)/);
                                if (h) {
                                  (r[0] = h[1]), t.splice(u, 1), u--;
                                  continue;
                                }
                              } else {
                                var f;
                                if (
                                  ((f = t[u].match(
                                    "a=ssrc:" + r[0] + " cname:(.+)"
                                  )) && (i = f[1]),
                                  (f = t[u].match(
                                    "a=ssrc:" + r[0] + " msid:(.+)"
                                  )) && (s = f[1]),
                                  (f = t[u].match(
                                    "a=ssrc:" + r[0] + " mslabel:(.+)"
                                  )) && (a = f[1]),
                                  (f = t[u].match(
                                    "a=ssrc:" + r[0] + " label:(.+)"
                                  )) && (c = f[1]),
                                  0 === t[u].indexOf("a=ssrc:" + o[0]))
                                ) {
                                  t.splice(u, 1), u--;
                                  continue;
                                }
                                if (0 === t[u].indexOf("a=ssrc:" + r[0])) {
                                  t.splice(u, 1), u--;
                                  continue;
                                }
                              }
                              0 !== t[u].length || (t.splice(u, 1), u--);
                            }
                          }
                        }
                        if (r[0] < 0)
                          return (
                            Me.warn(
                              "Couldn't find the video SSRC, simulcasting NOT enabled"
                            ),
                            e
                          );
                        d < 0 && (d = t.length);
                        (r[1] = Math.floor(4294967295 * Math.random())),
                          (r[2] = Math.floor(4294967295 * Math.random())),
                          (o[1] = Math.floor(4294967295 * Math.random())),
                          (o[2] = Math.floor(4294967295 * Math.random()));
                        for (u = 0; u < r.length; u++)
                          i &&
                            (t.splice(d, 0, "a=ssrc:" + r[u] + " cname:" + i),
                            d++),
                            s &&
                              (t.splice(d, 0, "a=ssrc:" + r[u] + " msid:" + s),
                              d++),
                            a &&
                              (t.splice(
                                d,
                                0,
                                "a=ssrc:" + r[u] + " mslabel:" + a
                              ),
                              d++),
                            c &&
                              (t.splice(d, 0, "a=ssrc:" + r[u] + " label:" + c),
                              d++),
                            i &&
                              (t.splice(d, 0, "a=ssrc:" + o[u] + " cname:" + i),
                              d++),
                            s &&
                              (t.splice(d, 0, "a=ssrc:" + o[u] + " msid:" + s),
                              d++),
                            a &&
                              (t.splice(
                                d,
                                0,
                                "a=ssrc:" + o[u] + " mslabel:" + a
                              ),
                              d++),
                            c &&
                              (t.splice(d, 0, "a=ssrc:" + o[u] + " label:" + c),
                              d++);
                        t.splice(d, 0, "a=ssrc-group:FID " + r[2] + " " + o[2]),
                          t.splice(
                            d,
                            0,
                            "a=ssrc-group:FID " + r[1] + " " + o[1]
                          ),
                          t.splice(
                            d,
                            0,
                            "a=ssrc-group:FID " + r[0] + " " + o[0]
                          ),
                          t.splice(
                            d,
                            0,
                            "a=ssrc-group:SIM " + r[0] + " " + r[1] + " " + r[2]
                          ),
                          (e = t.join("\r\n")).endsWith("\r\n") ||
                            (e += "\r\n");
                        return e;
                      })(e.sdp)))
                    : "firefox" !== Me.webRTCAdapter.browserDetails.browser &&
                      Me.warn(
                        "simulcast=true, but this is not Chrome nor Firefox, ignoring"
                      )),
                (o.mySdp = e.sdp),
                o.pc.setLocalDescription(e).catch(n.error),
                (o.mediaConstraints = s),
                o.iceDone || o.trickle
                  ? (Me.log("Offer ready"), Me.debug(n), n.success(e))
                  : Me.log("Waiting for all candidates...");
            }, n.error);
          })(e, n, r);
  }
  function B(e, t, n) {
    ((n = n || {}).success =
      "function" == typeof n.success ? n.success : Me.noop),
      (n.error = "function" == typeof n.error ? n.error : J);
    var r = n.jsep;
    if (t && r)
      return (
        Me.error("Provided a JSEP to a createOffer"),
        void n.error("Provided a JSEP to a createOffer")
      );
    if (!(t || (r && r.type && r.sdp)))
      return (
        Me.error("A valid JSEP is required for createAnswer"),
        void n.error("A valid JSEP is required for createAnswer")
      );
    n.media =
      "object" == typeof n.media && n.media
        ? n.media
        : { audio: !0, video: !0 };
    var o = n.media,
      i = S[e];
    if (!i || !i.webrtcStuff)
      return Me.warn("Invalid handle"), void n.error("Invalid handle");
    var s,
      a = i.webrtcStuff;
    if (
      ((a.trickle = ((s = n.trickle), Me.debug("isTrickleEnabled:", s), !!s)),
      a.pc)
    ) {
      if (
        (Me.log("Updating existing media session"), (o.update = !0), n.stream)
      )
        n.stream !== a.myStream &&
          Me.log("Renegotiation involves a new external stream");
      else {
        if (o.addAudio) {
          if (
            ((o.keepAudio = !1),
            (o.replaceAudio = !1),
            (o.removeAudio = !1),
            (o.audioSend = !0),
            a.myStream &&
              a.myStream.getAudioTracks() &&
              a.myStream.getAudioTracks().length)
          )
            return (
              Me.error("Can't add audio stream, there already is one"),
              void n.error("Can't add audio stream, there already is one")
            );
        } else
          o.removeAudio
            ? ((o.keepAudio = !1),
              (o.replaceAudio = !1),
              (o.addAudio = !1),
              (o.audioSend = !1))
            : o.replaceAudio &&
              ((o.keepAudio = !1),
              (o.addAudio = !1),
              (o.removeAudio = !1),
              (o.audioSend = !0));
        if (
          (a.myStream &&
          a.myStream.getAudioTracks() &&
          0 !== a.myStream.getAudioTracks().length
            ? !W(o) || o.removeAudio || o.replaceAudio || (o.keepAudio = !0)
            : (o.replaceAudio &&
                ((o.keepAudio = !1),
                (o.replaceAudio = !1),
                (o.addAudio = !0),
                (o.audioSend = !0)),
              W(o) && ((o.keepAudio = !1), (o.addAudio = !0))),
          o.addVideo)
        ) {
          if (
            ((o.keepVideo = !1),
            (o.replaceVideo = !1),
            (o.removeVideo = !1),
            (o.videoSend = !0),
            a.myStream &&
              a.myStream.getVideoTracks() &&
              a.myStream.getVideoTracks().length)
          )
            return (
              Me.error("Can't add video stream, there already is one"),
              void n.error("Can't add video stream, there already is one")
            );
        } else
          o.removeVideo
            ? ((o.keepVideo = !1),
              (o.replaceVideo = !1),
              (o.addVideo = !1),
              (o.videoSend = !1))
            : o.replaceVideo &&
              ((o.keepVideo = !1),
              (o.addVideo = !1),
              (o.removeVideo = !1),
              (o.videoSend = !0));
        a.myStream &&
        a.myStream.getVideoTracks() &&
        0 !== a.myStream.getVideoTracks().length
          ? !X(o) || o.removeVideo || o.replaceVideo || (o.keepVideo = !0)
          : (o.replaceVideo &&
              ((o.keepVideo = !1),
              (o.replaceVideo = !1),
              (o.addVideo = !0),
              (o.videoSend = !0)),
            X(o) && ((o.keepVideo = !1), (o.addVideo = !0))),
          o.addData && (o.data = !0);
      }
      if (W(o) && o.keepAudio && X(o) && o.keepVideo)
        return i.consentDialog(!1), void N(e, r, o, n, a.myStream);
    } else (o.update = !1), (o.keepAudio = !1), (o.keepVideo = !1);
    if (o.update && !a.streamExternal) {
      if (o.removeAudio || o.replaceAudio) {
        if (
          a.myStream &&
          a.myStream.getAudioTracks() &&
          a.myStream.getAudioTracks().length
        ) {
          var c = a.myStream.getAudioTracks()[0];
          Me.log("Removing audio track:", c), a.myStream.removeTrack(c);
          try {
            c.stop();
          } catch (A) {}
        }
        if (a.pc.getSenders() && a.pc.getSenders().length) {
          var d = !0;
          if ((o.replaceAudio && Me.unifiedPlan && (d = !1), d))
            for (var u of a.pc.getSenders())
              u &&
                u.track &&
                "audio" === u.track.kind &&
                (Me.log("Removing audio sender:", u), a.pc.removeTrack(u));
        }
      }
      if (o.removeVideo || o.replaceVideo) {
        if (
          a.myStream &&
          a.myStream.getVideoTracks() &&
          a.myStream.getVideoTracks().length
        ) {
          var p = a.myStream.getVideoTracks()[0];
          Me.log("Removing video track:", p), a.myStream.removeTrack(p);
          try {
            p.stop();
          } catch (x) {}
        }
        if (a.pc.getSenders() && a.pc.getSenders().length) {
          var l = !0;
          if ((o.replaceVideo && Me.unifiedPlan && (l = !1), l))
            for (var h of a.pc.getSenders())
              h &&
                h.track &&
                "video" === h.track.kind &&
                (Me.log("Removing video sender:", h), a.pc.removeTrack(h));
        }
      }
    }
    if (n.stream) {
      var f = n.stream;
      if (
        (Me.log("MediaStream provided by the application"),
        Me.debug(f),
        o.update && a.myStream && a.myStream !== n.stream && !a.streamExternal)
      ) {
        try {
          var m = a.myStream.getTracks();
          for (var g of m) Me.log(g), g && g.stop();
        } catch (D) {}
        a.myStream = null;
      }
      return (
        (a.streamExternal = !0), i.consentDialog(!1), void N(e, r, o, n, f)
      );
    }
    if (W(o) || X(o)) {
      if (!Me.isGetUserMediaAvailable())
        return void n.error("getUserMedia not available");
      var v = { mandatory: {}, optional: [] };
      i.consentDialog(!0);
      var y = W(o);
      y && o && "object" == typeof o.audio && (y = o.audio);
      var b = X(o);
      if (b && o) {
        var C = !0 === n.simulcast,
          w = !0 === n.simulcast2;
        if (
          ((!C && !w) || r || o.video || (o.video = "hires"),
          o.video && "screen" != o.video && "window" != o.video)
        )
          if ("object" == typeof o.video) b = o.video;
          else {
            var k = 0,
              T = 0;
            "lowres" === o.video
              ? ((T = 240), (k = 320))
              : "lowres-16:9" === o.video
              ? ((T = 180), (k = 320))
              : "hires" === o.video ||
                "hires-16:9" === o.video ||
                "hdres" === o.video
              ? ((T = 720), (k = 1280))
              : "fhdres" === o.video
              ? ((T = 1080), (k = 1920))
              : "4kres" === o.video
              ? ((T = 2160), (k = 3840))
              : "stdres" === o.video
              ? ((T = 480), (k = 640))
              : "stdres-16:9" === o.video
              ? ((T = 360), (k = 640))
              : (Me.log("Default video setting is stdres 4:3"),
                (T = 480),
                (k = 640)),
              Me.log("Adding media constraint:", o.video),
              (b = { height: { ideal: T }, width: { ideal: k } }),
              Me.log("Adding video constraint:", b);
          }
        else if ("screen" === o.video || "window" === o.video) {
          if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia)
            return (
              (v.video = {}),
              o.screenshareFrameRate &&
                (v.video.frameRate = o.screenshareFrameRate),
              o.screenshareHeight && (v.video.height = o.screenshareHeight),
              o.screenshareWidth && (v.video.width = o.screenshareWidth),
              (v.audio = o.captureDesktopAudio),
              void navigator.mediaDevices.getDisplayMedia(v).then(
                function (t) {
                  i.consentDialog(!1),
                    W(o) && !o.keepAudio
                      ? navigator.mediaDevices
                          .getUserMedia({ audio: !0, video: !1 })
                          .then(function (i) {
                            t.addTrack(i.getAudioTracks()[0]), N(e, r, o, n, t);
                          })
                      : N(e, r, o, n, t);
                },
                function (e) {
                  i.consentDialog(!1), n.error(e);
                }
              )
            );
          function E(t, s) {
            i.consentDialog(!1), t ? n.error(t) : N(e, r, o, n, s);
          }
          function O(e, t, n) {
            Me.log("Adding media constraint (screen capture)"),
              Me.debug(e),
              navigator.mediaDevices
                .getUserMedia(e)
                .then(function (e) {
                  n
                    ? navigator.mediaDevices
                        .getUserMedia({ audio: !0, video: !1 })
                        .then(function (n) {
                          e.addTrack(n.getAudioTracks()[0]), t(null, e);
                        })
                    : t(null, e);
                })
                .catch(function (e) {
                  i.consentDialog(!1), t(e);
                });
          }
          if ("chrome" === Me.webRTCAdapter.browserDetails.browser) {
            var R = Me.webRTCAdapter.browserDetails.version,
              P = 33;
            window.navigator.userAgent.match("Linux") && (P = 35),
              R >= 26 && R <= P
                ? O(
                    (v = {
                      video: {
                        mandatory: {
                          googLeakyBucket: !0,
                          maxWidth: window.screen.width,
                          maxHeight: window.screen.height,
                          minFrameRate: o.screenshareFrameRate,
                          maxFrameRate: o.screenshareFrameRate,
                          chromeMediaSource: "screen",
                        },
                      },
                      audio: W(o) && !o.keepAudio,
                    }),
                    E
                  )
                : Me.extension.getScreen(function (e, t) {
                    if (e) return i.consentDialog(!1), n.error(e);
                    ((v = {
                      audio: !1,
                      video: {
                        mandatory: {
                          chromeMediaSource: "desktop",
                          maxWidth: window.screen.width,
                          maxHeight: window.screen.height,
                          minFrameRate: o.screenshareFrameRate,
                          maxFrameRate: o.screenshareFrameRate,
                        },
                        optional: [
                          { googLeakyBucket: !0 },
                          { googTemporalLayeredScreencast: !0 },
                        ],
                      },
                    }).video.mandatory.chromeMediaSourceId = t),
                      O(v, E, W(o) && !o.keepAudio);
                  });
          } else if ("firefox" === Me.webRTCAdapter.browserDetails.browser) {
            if (!(Me.webRTCAdapter.browserDetails.version >= 33)) {
              var _ = new Error("NavigatorUserMediaError");
              return (
                (_.name =
                  "Your version of Firefox does not support screen sharing, please install Firefox 33 (or more recent versions)"),
                i.consentDialog(!1),
                void n.error(_)
              );
            }
            O(
              (v = {
                video: { mozMediaSource: o.video, mediaSource: o.video },
                audio: W(o) && !o.keepAudio,
              }),
              function (e, t) {
                if ((E(e, t), !e))
                  var n = t.currentTime,
                    r = window.setInterval(function () {
                      t || window.clearInterval(r),
                        t.currentTime == n &&
                          (window.clearInterval(r), t.onended && t.onended()),
                        (n = t.currentTime);
                    }, 500);
              }
            );
          }
          return;
        }
      }
      (o && "screen" === o.video) ||
        navigator.mediaDevices
          .enumerateDevices()
          .then(function (t) {
            var s = t.some(function (e) {
                return "audioinput" === e.kind;
              }),
              a =
                (function (e) {
                  if ((Me.debug("isScreenSendEnabled:", e), !e)) return !1;
                  if (
                    "object" != typeof e.video ||
                    "object" != typeof e.video.mandatory
                  )
                    return !1;
                  var t = e.video.mandatory;
                  if (t.chromeMediaSource)
                    return (
                      "desktop" === t.chromeMediaSource ||
                      "screen" === t.chromeMediaSource
                    );
                  if (t.mozMediaSource)
                    return (
                      "window" === t.mozMediaSource ||
                      "screen" === t.mozMediaSource
                    );
                  if (t.mediaSource)
                    return (
                      "window" === t.mediaSource || "screen" === t.mediaSource
                    );
                  return !1;
                })(o) ||
                t.some(function (e) {
                  return "videoinput" === e.kind;
                }),
              c = W(o),
              d = X(o),
              u = (function (e) {
                return (
                  Me.debug("isAudioSendRequired:", e),
                  !!e &&
                    !1 !== e.audio &&
                    !1 !== e.audioSend &&
                    void 0 !== e.failIfNoAudio &&
                    null !== e.failIfNoAudio &&
                    !0 === e.failIfNoAudio
                );
              })(o),
              p = (function (e) {
                return (
                  Me.debug("isVideoSendRequired:", e),
                  !!e &&
                    !1 !== e.video &&
                    !1 !== e.videoSend &&
                    void 0 !== e.failIfNoVideo &&
                    null !== e.failIfNoVideo &&
                    !0 === e.failIfNoVideo
                );
              })(o);
            if (c || d || u || p) {
              var l = !!c && s,
                h = !!d && a;
              if (!l && !h)
                return (
                  i.consentDialog(!1), n.error("No capture device found"), !1
                );
              if (!l && u)
                return (
                  i.consentDialog(!1),
                  n.error(
                    "Audio capture is required, but no capture device found"
                  ),
                  !1
                );
              if (!h && p)
                return (
                  i.consentDialog(!1),
                  n.error(
                    "Video capture is required, but no capture device found"
                  ),
                  !1
                );
            }
            var m = {
              audio: !(!s || o.keepAudio) && y,
              video: !(!a || o.keepVideo) && b,
            };
            Me.debug("getUserMedia constraints", m),
              m.audio || m.video
                ? navigator.mediaDevices
                    .getUserMedia(m)
                    .then(function (t) {
                      i.consentDialog(!1), N(e, r, o, n, t);
                    })
                    .catch(function (e) {
                      i.consentDialog(!1),
                        n.error({
                          code: e.code,
                          name: e.name,
                          message: e.message,
                        });
                    })
                : (i.consentDialog(!1), N(e, r, o, n, f));
          })
          .catch(function (e) {
            i.consentDialog(!1), n.error("enumerateDevices error", e);
          });
    } else N(e, r, o, n);
  }
  function L(e, t) {
    ((t = t || {}).success =
      "function" == typeof t.success ? t.success : Me.noop),
      (t.error = "function" == typeof t.error ? t.error : J);
    var n = t.jsep,
      r = S[e];
    if (!r || !r.webrtcStuff)
      return Me.warn("Invalid handle"), void t.error("Invalid handle");
    var o = r.webrtcStuff;
    if (n) {
      if (!o.pc)
        return (
          Me.warn(
            "Wait, no PeerConnection?? if this is an answer, use createAnswer and not handleRemoteJsep"
          ),
          void t.error(
            "No PeerConnection: if this is an answer, use createAnswer and not handleRemoteJsep"
          )
        );
      o.pc.setRemoteDescription(n).then(function () {
        if (
          (Me.log("Remote description accepted!"),
          (o.remoteSdp = n.sdp),
          o.candidates && o.candidates.length > 0)
        ) {
          for (var e = 0; e < o.candidates.length; e++) {
            var r = o.candidates[e];
            Me.debug("Adding remote candidate:", r),
              r && !0 !== r.completed
                ? o.pc.addIceCandidate(r)
                : o.pc.addIceCandidate(Me.endOfCandidates);
          }
          o.candidates = [];
        }
        t.success();
      }, t.error);
    } else t.error("Invalid JSEP");
  }
  function U(e, t) {
    var n = S[e];
    if (!n || !n.webrtcStuff) return Me.warn("Invalid handle"), 0;
    var r = t ? "remote" : "local",
      o = n.webrtcStuff;
    return (
      o.volume[r] || (o.volume[r] = { value: 0 }),
      !o.pc.getStats ||
      ("chrome" !== Me.webRTCAdapter.browserDetails.browser &&
        "safari" !== Me.webRTCAdapter.browserDetails.browser)
        ? (Me.warn("Getting the " + r + " volume unsupported by browser"), 0)
        : t && !o.remoteStream
        ? (Me.warn("Remote stream unavailable"), 0)
        : t || o.myStream
        ? o.volume[r].timer
          ? o.volume[r].value
          : (Me.log("Starting " + r + " volume monitor"),
            (o.volume[r].timer = setInterval(function () {
              o.pc.getStats().then(function (e) {
                e.forEach(function (e) {
                  e &&
                    "audio" === e.kind &&
                    ((t && !e.remoteSource) ||
                      (!t && "media-source" !== e.type) ||
                      (o.volume[r].value = e.audioLevel ? e.audioLevel : 0));
                });
              });
            }, 200)),
            0)
        : (Me.warn("Local stream unavailable"), 0)
    );
  }
  function q(e, t) {
    var n = S[e];
    if (!n || !n.webrtcStuff) return Me.warn("Invalid handle"), !0;
    var r = n.webrtcStuff;
    return r.pc
      ? r.myStream
        ? t
          ? r.myStream.getVideoTracks() &&
            0 !== r.myStream.getVideoTracks().length
            ? !r.myStream.getVideoTracks()[0].enabled
            : (Me.warn("No video track"), !0)
          : r.myStream.getAudioTracks() &&
            0 !== r.myStream.getAudioTracks().length
          ? !r.myStream.getAudioTracks()[0].enabled
          : (Me.warn("No audio track"), !0)
        : (Me.warn("Invalid local MediaStream"), !0)
      : (Me.warn("Invalid PeerConnection"), !0);
  }
  function z(e, t, n) {
    var r = S[e];
    if (!r || !r.webrtcStuff) return Me.warn("Invalid handle"), !1;
    var o = r.webrtcStuff;
    return o.pc
      ? o.myStream
        ? t
          ? o.myStream.getVideoTracks() &&
            0 !== o.myStream.getVideoTracks().length
            ? ((o.myStream.getVideoTracks()[0].enabled = !n), !0)
            : (Me.warn("No video track"), !1)
          : o.myStream.getAudioTracks() &&
            0 !== o.myStream.getAudioTracks().length
          ? ((o.myStream.getAudioTracks()[0].enabled = !n), !0)
          : (Me.warn("No audio track"), !1)
        : (Me.warn("Invalid local MediaStream"), !1)
      : (Me.warn("Invalid PeerConnection"), !1);
  }
  function V(e) {
    var t = S[e];
    if (!t || !t.webrtcStuff)
      return Me.warn("Invalid handle"), "Invalid handle";
    var n = t.webrtcStuff;
    return n.pc
      ? n.pc.getStats
        ? n.bitrate.timer
          ? n.bitrate.value
          : (Me.log("Starting bitrate timer (via getStats)"),
            (n.bitrate.timer = setInterval(function () {
              n.pc.getStats().then(function (e) {
                e.forEach(function (e) {
                  if (e) {
                    var t = !1;
                    if (
                      (("video" === e.mediaType ||
                        e.id.toLowerCase().indexOf("video") > -1) &&
                      "inbound-rtp" === e.type &&
                      e.id.indexOf("rtcp") < 0
                        ? (t = !0)
                        : "ssrc" != e.type ||
                          !e.bytesReceived ||
                          ("VP8" !== e.googCodecName &&
                            "" !== e.googCodecName) ||
                          (t = !0),
                      t)
                    )
                      if (
                        ((n.bitrate.bsnow = e.bytesReceived),
                        (n.bitrate.tsnow = e.timestamp),
                        null === n.bitrate.bsbefore ||
                          null === n.bitrate.tsbefore)
                      )
                        (n.bitrate.bsbefore = n.bitrate.bsnow),
                          (n.bitrate.tsbefore = n.bitrate.tsnow);
                      else {
                        var r = n.bitrate.tsnow - n.bitrate.tsbefore;
                        "safari" === Me.webRTCAdapter.browserDetails.browser &&
                          (r /= 1e3);
                        var o = Math.round(
                          (8 * (n.bitrate.bsnow - n.bitrate.bsbefore)) / r
                        );
                        "safari" === Me.webRTCAdapter.browserDetails.browser &&
                          (o = parseInt(o / 1e3)),
                          (n.bitrate.value = o + " kbits/sec"),
                          (n.bitrate.bsbefore = n.bitrate.bsnow),
                          (n.bitrate.tsbefore = n.bitrate.tsnow);
                      }
                  }
                });
              });
            }, 1e3)),
            "0 kbits/sec")
        : (Me.warn("Getting the video bitrate unsupported by browser"),
          "Feature unsupported by browser")
      : "Invalid PeerConnection";
  }
  function J(e) {
    Me.error("WebRTC error:", e);
  }
  function H(e, r) {
    Me.log("Cleaning WebRTC stuff");
    var o = S[e];
    if (o) {
      var i = o.webrtcStuff;
      if (i) {
        if (!0 === r) {
          var s = { janus: "hangup", transaction: Me.randomString(12) };
          o.token && (s.token = o.token),
            m && (s.apisecret = m),
            Me.debug("Sending hangup request (handle=" + e + "):"),
            Me.debug(s),
            t
              ? ((s.session_id = w),
                (s.handle_id = e),
                n.send(JSON.stringify(s)))
              : Me.httpAPICall(a + "/" + w + "/" + e, {
                  verb: "POST",
                  withCredentials: l,
                  body: s,
                });
        }
        (i.remoteStream = null),
          i.volume &&
            (i.volume.local &&
              i.volume.local.timer &&
              clearInterval(i.volume.local.timer),
            i.volume.remote &&
              i.volume.remote.timer &&
              clearInterval(i.volume.remote.timer)),
          (i.volume = {}),
          i.bitrate.timer && clearInterval(i.bitrate.timer),
          (i.bitrate.timer = null),
          (i.bitrate.bsnow = null),
          (i.bitrate.bsbefore = null),
          (i.bitrate.tsnow = null),
          (i.bitrate.tsbefore = null),
          (i.bitrate.value = null);
        try {
          if (!i.streamExternal && i.myStream) {
            Me.log("Stopping local stream tracks");
            var c = i.myStream.getTracks();
            for (var d of c) Me.log(d), d && d.stop();
          }
        } catch (e) {}
        (i.streamExternal = !1), (i.myStream = null);
        try {
          i.pc.close();
        } catch (e) {}
        (i.pc = null),
          (i.candidates = null),
          (i.mySdp = null),
          (i.remoteSdp = null),
          (i.iceDone = !1),
          (i.dataChannel = {}),
          (i.dtmfSender = null);
      }
      o.oncleanup();
    }
  }
  function W(e) {
    return (
      Me.debug("isAudioSendEnabled:", e),
      !e ||
        (!1 !== e.audio &&
          (void 0 === e.audioSend ||
            null === e.audioSend ||
            !0 === e.audioSend))
    );
  }
  function G(e) {
    return (
      Me.debug("isAudioRecvEnabled:", e),
      !e ||
        (!1 !== e.audio &&
          (void 0 === e.audioRecv ||
            null === e.audioRecv ||
            !0 === e.audioRecv))
    );
  }
  function X(e) {
    return (
      Me.debug("isVideoSendEnabled:", e),
      !e ||
        (!1 !== e.video &&
          (void 0 === e.videoSend ||
            null === e.videoSend ||
            !0 === e.videoSend))
    );
  }
  function K(e) {
    return (
      Me.debug("isVideoRecvEnabled:", e),
      !e ||
        (!1 !== e.video &&
          (void 0 === e.videoRecv ||
            null === e.videoRecv ||
            !0 === e.videoRecv))
    );
  }
  x(e),
    (this.getServer = function () {
      return a;
    }),
    (this.isConnected = function () {
      return C;
    }),
    (this.reconnect = function (e) {
      ((e = e || {}).success =
        "function" == typeof e.success ? e.success : Me.noop),
        (e.error = "function" == typeof e.error ? e.error : Me.noop),
        (e.reconnect = !0),
        x(e);
    }),
    (this.getSessionId = function () {
      return w;
    }),
    (this.destroy = function (i) {
      !(function (i) {
        clearTimeout(Me.statCheckId),
          ((i = i || {}).success =
            "function" == typeof i.success ? i.success : Me.noop),
          (i.error = "function" == typeof i.error ? i.error : Me.noop);
        var s = !0 === i.unload,
          c = !0;
        void 0 !== i.notifyDestroyed &&
          null !== i.notifyDestroyed &&
          (c = !0 === i.notifyDestroyed);
        var d = !0 === i.cleanupHandles;
        if ((Me.log("Destroying session " + w + " (unload=" + s + ")"), !w))
          return (
            Me.warn("No session to destroy"),
            i.success(),
            void (c && e.destroyed())
          );
        if (d) for (var u in S) F(u, { noRequest: !0 });
        if (!C)
          return (
            Me.warn("Is the server down? (connected=false)"),
            (w = null),
            void i.success()
          );
        var p = { janus: "destroy", transaction: Me.randomString(12) };
        f && (p.token = f);
        m && (p.apisecret = m);
        if (s)
          return (
            t
              ? ((n.onclose = null), n.close(), (n = null))
              : navigator.sendBeacon(a + "/" + w, JSON.stringify(p)),
            Me.log("Destroyed session:"),
            (w = null),
            (C = !1),
            i.success(),
            void (c && e.destroyed())
          );
        if (t) {
          p.session_id = w;
          var h = function () {
              for (var e in r) n.removeEventListener(e, r[e]);
              n.removeEventListener("message", g),
                n.removeEventListener("error", v),
                o && clearTimeout(o),
                n.close();
            },
            g = function (t) {
              var n = JSON.parse(t.data);
              n.session_id == p.session_id &&
                n.transaction == p.transaction &&
                (h(), i.success(), c && e.destroyed());
            },
            v = function (t) {
              h(),
                i.error("Failed to destroy the server: Is the server down?"),
                c && e.destroyed();
            };
          return (
            n.addEventListener("message", g),
            n.addEventListener("error", v),
            void n.send(JSON.stringify(p))
          );
        }
        Me.httpAPICall(a + "/" + w, {
          verb: "POST",
          withCredentials: l,
          body: p,
          success: function (t) {
            Me.log("Destroyed session:"),
              Me.debug(t),
              (w = null),
              (C = !1),
              "success" !== t.janus &&
                Me.error("Ooops: " + t.error.code + " " + t.error.reason),
              i.success(),
              c && e.destroyed();
          },
          error: function (t, n) {
            Me.error(t + ":", n),
              (w = null),
              (C = !1),
              i.success(),
              c && e.destroyed();
          },
        });
      })(i);
    }),
    (this.attach = function (e) {
      !(function (e) {
        if (
          (((e = e || {}).success =
            "function" == typeof e.success ? e.success : Me.noop),
          (e.error = "function" == typeof e.error ? e.error : Me.noop),
          (e.consentDialog =
            "function" == typeof e.consentDialog ? e.consentDialog : Me.noop),
          (e.iceState = "function" == typeof e.iceState ? e.iceState : Me.noop),
          (e.mediaState =
            "function" == typeof e.mediaState ? e.mediaState : Me.noop),
          (e.webrtcState =
            "function" == typeof e.webrtcState ? e.webrtcState : Me.noop),
          (e.slowLink = "function" == typeof e.slowLink ? e.slowLink : Me.noop),
          (e.onmessage =
            "function" == typeof e.onmessage ? e.onmessage : Me.noop),
          (e.onlocalstream =
            "function" == typeof e.onlocalstream ? e.onlocalstream : Me.noop),
          (e.onremotestream =
            "function" == typeof e.onremotestream ? e.onremotestream : Me.noop),
          (e.ondata = "function" == typeof e.ondata ? e.ondata : Me.noop),
          (e.ondataopen =
            "function" == typeof e.ondataopen ? e.ondataopen : Me.noop),
          (e.oncleanup =
            "function" == typeof e.oncleanup ? e.oncleanup : Me.noop),
          (e.ondetached =
            "function" == typeof e.ondetached ? e.ondetached : Me.noop),
          !C)
        )
          return (
            Me.warn("Is the server down? (connected=false)"),
            void e.error("Is the server down? (connected=false)")
          );
        var r = e.plugin;
        if (!r)
          return Me.error("Invalid plugin"), void e.error("Invalid plugin");
        var o = e.opaqueId,
          i = e.token ? e.token : f,
          s = Me.randomString(12),
          c = { janus: "attach", plugin: r, opaque_id: o, transaction: s };
        i && (c.token = i);
        m && (c.apisecret = m);
        if (t)
          return (
            (R[s] = function (t) {
              if ((Me.debug(t), "success" !== t.janus))
                return (
                  Me.error("Ooops: " + t.error.code + " " + t.error.reason),
                  void e.error("Ooops: " + t.error.code + " " + t.error.reason)
                );
              var n = t.data.id;
              Me.log("Created handle: " + n);
              var o = {
                session: k,
                plugin: r,
                id: n,
                token: i,
                detached: !1,
                webrtcStuff: {
                  started: !1,
                  myStream: null,
                  streamExternal: !1,
                  remoteStream: null,
                  mySdp: null,
                  mediaConstraints: null,
                  pc: null,
                  dataChannel: {},
                  dtmfSender: null,
                  trickle: !0,
                  iceDone: !1,
                  volume: { value: null, timer: null },
                  bitrate: {
                    value: null,
                    bsnow: null,
                    bsbefore: null,
                    tsnow: null,
                    tsbefore: null,
                    timer: null,
                  },
                },
                getId: function () {
                  return n;
                },
                getPlugin: function () {
                  return r;
                },
                getVolume: function () {
                  return U(n, !0);
                },
                getRemoteVolume: function () {
                  return U(n, !0);
                },
                getLocalVolume: function () {
                  return U(n, !1);
                },
                isAudioMuted: function () {
                  return q(n, !1);
                },
                muteAudio: function () {
                  return z(n, !1, !0);
                },
                unmuteAudio: function () {
                  return z(n, !1, !1);
                },
                isVideoMuted: function () {
                  return q(n, !0);
                },
                muteVideo: function () {
                  return z(n, !0, !0);
                },
                unmuteVideo: function () {
                  return z(n, !0, !1);
                },
                getBitrate: function () {
                  return V(n);
                },
                send: function (e) {
                  D(n, e);
                },
                data: function (e) {
                  I(n, e);
                },
                dtmf: function (e) {
                  M(n, e);
                },
                consentDialog: e.consentDialog,
                iceState: e.iceState,
                mediaState: e.mediaState,
                webrtcState: e.webrtcState,
                slowLink: e.slowLink,
                onmessage: e.onmessage,
                createOffer: function (e) {
                  B(n, !0, e);
                },
                createAnswer: function (e) {
                  B(n, !1, e);
                },
                handleRemoteJsep: function (e) {
                  L(n, e);
                },
                onlocalstream: e.onlocalstream,
                onremotestream: e.onremotestream,
                ondata: e.ondata,
                ondataopen: e.ondataopen,
                oncleanup: e.oncleanup,
                ondetached: e.ondetached,
                hangup: function (e) {
                  H(n, !0 === e);
                },
                detach: function (e) {
                  F(n, e);
                },
              };
              (S[n] = o), e.success(o);
            }),
            (c.session_id = w),
            void n.send(JSON.stringify(c))
          );
        Me.httpAPICall(a + "/" + w, {
          verb: "POST",
          withCredentials: l,
          body: c,
          success: function (t) {
            if ((Me.debug(t), "success" !== t.janus))
              return (
                Me.error("Ooops: " + t.error.code + " " + t.error.reason),
                void e.error("Ooops: " + t.error.code + " " + t.error.reason)
              );
            var n = t.data.id;
            Me.log("Created handle: " + n);
            var o = {
              session: k,
              plugin: r,
              id: n,
              token: i,
              detached: !1,
              webrtcStuff: {
                started: !1,
                myStream: null,
                streamExternal: !1,
                remoteStream: null,
                mySdp: null,
                mediaConstraints: null,
                pc: null,
                dataChannel: {},
                dtmfSender: null,
                trickle: !0,
                iceDone: !1,
                volume: { value: null, timer: null },
                bitrate: {
                  value: null,
                  bsnow: null,
                  bsbefore: null,
                  tsnow: null,
                  tsbefore: null,
                  timer: null,
                },
              },
              getId: function () {
                return n;
              },
              getPlugin: function () {
                return r;
              },
              getVolume: function () {
                return U(n, !0);
              },
              getRemoteVolume: function () {
                return U(n, !0);
              },
              getLocalVolume: function () {
                return U(n, !1);
              },
              isAudioMuted: function () {
                return q(n, !1);
              },
              muteAudio: function () {
                return z(n, !1, !0);
              },
              unmuteAudio: function () {
                return z(n, !1, !1);
              },
              isVideoMuted: function () {
                return q(n, !0);
              },
              muteVideo: function () {
                return z(n, !0, !0);
              },
              unmuteVideo: function () {
                return z(n, !0, !1);
              },
              getBitrate: function () {
                return V(n);
              },
              send: function (e) {
                D(n, e);
              },
              data: function (e) {
                I(n, e);
              },
              dtmf: function (e) {
                M(n, e);
              },
              consentDialog: e.consentDialog,
              iceState: e.iceState,
              mediaState: e.mediaState,
              webrtcState: e.webrtcState,
              slowLink: e.slowLink,
              onmessage: e.onmessage,
              createOffer: function (e) {
                B(n, !0, e);
              },
              createAnswer: function (e) {
                B(n, !1, e);
              },
              handleRemoteJsep: function (e) {
                L(n, e);
              },
              onlocalstream: e.onlocalstream,
              onremotestream: e.onremotestream,
              ondata: e.ondata,
              ondataopen: e.ondataopen,
              oncleanup: e.oncleanup,
              ondetached: e.ondetached,
              hangup: function (e) {
                H(n, !0 === e);
              },
              detach: function (e) {
                F(n, e);
              },
            };
            (S[n] = o), e.success(o);
          },
          error: function (t, n) {
            Me.error(t + ":", n),
              "" === n
                ? e.error(t + ": Is the server down?")
                : e.error(t + ": " + n);
          },
        });
      })(e);
    });
}
(Me.useDefaultDependencies = function (e) {
  var t = (e && e.fetch) || fetch,
    n = (e && e.Promise) || Promise,
    r = (e && e.WebSocket) || WebSocket;
  return {
    newWebSocket: function (e, t) {
      return new r(e, t);
    },
    extension: (e && e.extension) || Ie,
    isArray: function (e) {
      return Array.isArray(e);
    },
    webRTCAdapter: (e && e.adapter) || adapter,
    httpAPICall: function (e, r) {
      this.options.params.roomId;
      var o = this.options.params.serverNode,
        i = {
          method: r.verb,
          headers: { Accept: "application/json, text/plain, */*" },
          cache: "no-cache",
        };
      o && (i.headers["Server-Id"] = 1),
        "POST" === r.verb && (i.headers["Content-Type"] = "application/json"),
        void 0 !== r.withCredentials &&
          (i.credentials =
            !0 === r.withCredentials
              ? "include"
              : r.withCredentials
              ? r.withCredentials
              : "omit"),
        r.body && (i.body = JSON.stringify(r.body));
      var s = t(e, i).catch(function (e) {
        return n.reject({
          message: "Probably a network error, is the server down?",
          error: e,
        });
      });
      if (r.timeout) {
        var a = new n(function (e, t) {
          var n = setTimeout(function () {
            return (
              clearTimeout(n),
              t({ message: "Request timed out", timeout: r.timeout })
            );
          }, r.timeout);
        });
        s = n.race([s, a]);
      }
      return (
        s
          .then(function (e) {
            return e.ok
              ? typeof r.success == typeof Me.noop
                ? e
                    .json()
                    .then(function (e) {
                      r.success(e);
                    })
                    .catch(function (t) {
                      return n.reject({
                        message: "Failed to parse response body",
                        error: t,
                        response: e,
                      });
                    })
                : void 0
              : n.reject({ message: "API call failed", response: e });
          })
          .catch(function (e) {
            typeof r.error == typeof Me.noop &&
              r.error(e.message || "<< internal error >>", e);
          }),
        s
      );
    },
  };
}),
  (Me.useOldDependencies = function (e) {
    var t = (e && e.jQuery) || jQuery,
      n = (e && e.WebSocket) || WebSocket;
    return {
      newWebSocket: function (e, t) {
        return new n(e, t);
      },
      isArray: function (e) {
        return t.isArray(e);
      },
      extension: (e && e.extension) || Ie,
      webRTCAdapter: (e && e.adapter) || adapter,
      httpAPICall: function (e, n) {
        var r =
            void 0 !== n.body
              ? {
                  contentType: "application/json",
                  data: JSON.stringify(n.body),
                }
              : {},
          o =
            void 0 !== n.withCredentials
              ? { xhrFields: { withCredentials: n.withCredentials } }
              : {};
        return t.ajax(
          t.extend(r, o, {
            url: e,
            type: n.verb,
            cache: !1,
            dataType: "json",
            async: n.async,
            timeout: n.timeout,
            success: function (e) {
              typeof n.success == typeof Me.noop && n.success(e);
            },
            error: function (e, t, r) {
              typeof n.error == typeof Me.noop && n.error(t, r);
            },
          })
        );
      },
    };
  }),
  (Me.noop = function () {}),
  (Me.dataChanDefaultLabel = "JanusDataChannel"),
  (Me.endOfCandidates = null),
  (Me.init = function (e) {
    if (
      ((e = e || {}),
      (this.options = e),
      (e.callback = "function" == typeof e.callback ? e.callback : Me.noop),
      (Me.statCallback = e.statCallback),
      Me.initDone)
    )
      e.callback();
    else {
      if (
        (("undefined" != typeof console && void 0 !== console.log) ||
          (console = { log: function () {} }),
        (Me.trace = Me.noop),
        (Me.debug = Me.noop),
        (Me.vdebug = Me.noop),
        (Me.log = Me.noop),
        (Me.warn = Me.noop),
        (Me.error = Me.noop),
        !0 === e.debug || "all" === e.debug)
      )
        (Me.trace = console.trace.bind(console)),
          (Me.debug = console.debug.bind(console)),
          (Me.vdebug = console.debug.bind(console)),
          (Me.log = console.log.bind(console)),
          (Me.warn = console.warn.bind(console)),
          (Me.error = console.error.bind(console));
      else if (Array.isArray(e.debug))
        for (var t of e.debug)
          switch (t) {
            case "trace":
              Me.trace = console.trace.bind(console);
              break;
            case "debug":
              Me.debug = console.debug.bind(console);
              break;
            case "vdebug":
              Me.vdebug = console.debug.bind(console);
              break;
            case "log":
              Me.log = console.log.bind(console);
              break;
            case "warn":
              Me.warn = console.warn.bind(console);
              break;
            case "error":
              Me.error = console.error.bind(console);
              break;
            default:
              console.error(
                "Unknown debugging option '" +
                  t +
                  "' (supported: 'trace', 'debug', 'vdebug', 'log', warn', 'error')"
              );
          }
      Me.log("Initializing library");
      var n = e.dependencies || Me.useDefaultDependencies();
      (Me.isArray = n.isArray),
        (Me.webRTCAdapter = n.webRTCAdapter),
        (Me.httpAPICall = n.httpAPICall),
        (Me.newWebSocket = n.newWebSocket),
        (Me.extension = n.extension),
        Me.extension.init(),
        (Me.listDevices = function (e, t) {
          (e = "function" == typeof e ? e : Me.noop),
            null == t && (t = { audio: !0, video: !0 }),
            Me.isGetUserMediaAvailable()
              ? navigator.mediaDevices
                  .getUserMedia(t)
                  .then(function (t) {
                    navigator.mediaDevices
                      .enumerateDevices()
                      .then(function (n) {
                        Me.debug(n), e(n);
                        try {
                          var r = t.getTracks();
                          for (var o of r) o && o.stop();
                        } catch (e) {}
                      });
                  })
                  .catch(function (t) {
                    Me.error(t), e([]);
                  })
              : (Me.warn("navigator.mediaDevices unavailable"), e([]));
        }),
        (Me.attachMediaStream = function (e, t) {
          try {
            e.srcObject = t;
          } catch (n) {
            try {
              e.src = URL.createObjectURL(t);
            } catch (e) {
              Me.error("Error attaching stream to element");
            }
          }
        }),
        (Me.reattachMediaStream = function (e, t) {
          try {
            e.srcObject = t.srcObject;
          } catch (n) {
            try {
              e.src = t.src;
            } catch (e) {
              Me.error("Error reattaching stream to element");
            }
          }
        });
      var r =
          ["iPad", "iPhone", "iPod"].indexOf(navigator.platform) >= 0
            ? "pagehide"
            : "beforeunload",
        o = window["on" + r];
      if (
        (window.addEventListener(r, function (e) {
          for (var t in (Me.log("Closing window"), Me.sessions))
            Me.sessions[t] &&
              Me.sessions[t].destroyOnUnload &&
              (Me.log("Destroying session " + t),
              Me.sessions[t].destroy({ unload: !0, notifyDestroyed: !1 }));
          o && "function" == typeof o && o();
        }),
        (Me.safariVp8 = !1),
        "safari" === Me.webRTCAdapter.browserDetails.browser &&
          Me.webRTCAdapter.browserDetails.version >= 605)
      )
        if (
          RTCRtpSender &&
          RTCRtpSender.getCapabilities &&
          RTCRtpSender.getCapabilities("video") &&
          RTCRtpSender.getCapabilities("video").codecs &&
          RTCRtpSender.getCapabilities("video").codecs.length
        ) {
          for (var i of RTCRtpSender.getCapabilities("video").codecs)
            if (i && i.mimeType && "video/vp8" === i.mimeType.toLowerCase()) {
              Me.safariVp8 = !0;
              break;
            }
          Me.safariVp8
            ? Me.log("This version of Safari supports VP8")
            : Me.warn(
                "This version of Safari does NOT support VP8: if you're using a Technology Preview, try enabling the 'WebRTC VP8 codec' setting in the 'Experimental Features' Develop menu"
              );
        } else {
          var s = new RTCPeerConnection({});
          s.createOffer({ offerToReceiveVideo: !0 }).then(function (e) {
            (Me.safariVp8 = -1 !== e.sdp.indexOf("VP8")),
              Me.safariVp8
                ? Me.log("This version of Safari supports VP8")
                : Me.warn(
                    "This version of Safari does NOT support VP8: if you're using a Technology Preview, try enabling the 'WebRTC VP8 codec' setting in the 'Experimental Features' Develop menu"
                  ),
              s.close(),
              (s = null);
          });
        }
      if (
        ((Me.unifiedPlan = !1),
        "firefox" === Me.webRTCAdapter.browserDetails.browser &&
          Me.webRTCAdapter.browserDetails.version >= 59)
      )
        Me.unifiedPlan = !0;
      else if (
        "chrome" === Me.webRTCAdapter.browserDetails.browser &&
        Me.webRTCAdapter.browserDetails.version < 72
      )
        Me.unifiedPlan = !1;
      else if (
        window.RTCRtpTransceiver &&
        "currentDirection" in RTCRtpTransceiver.prototype
      ) {
        var a = new RTCPeerConnection();
        try {
          a.addTransceiver("audio"), (Me.unifiedPlan = !0);
        } catch (e) {}
        a.close();
      } else Me.unifiedPlan = !1;
      (Me.initDone = !0), e.callback();
    }
  }),
  (Me.isWebrtcSupported = function () {
    return !!window.RTCPeerConnection;
  }),
  (Me.isGetUserMediaAvailable = function () {
    return navigator.mediaDevices && navigator.mediaDevices.getUserMedia;
  }),
  (Me.randomString = function (e) {
    for (
      var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
        n = "",
        r = 0;
      r < e;
      r++
    ) {
      var o = Math.floor(Math.random() * t.length);
      n += t.substring(o, o + 1);
    }
    return n;
  });
var Fe = Me,
  Ne = (function () {
    function e(e) {
      (this.tag = ":::[JanusClient]"),
        (this.videoEl = null),
        (this.janus = null),
        (this.opaqueId = "videoroomtest" + Fe.randomString(12)),
        (this.closed = !1),
        (this.containerEl = e);
    }
    return (
      (e.prototype.setup = function (e, t, n) {
        var r = this;
        (this.closed = !1),
          (this.roomId = parseInt(e.room_id)),
          (this.pin = e.pin),
          (this.server = e.janus_server_info),
          (this.options = n);
        var o = (n || {}).janusServer;
        return (
          Re(this.tag, "【 ttsa options 】"),
          console.log(n),
          Re(this.tag, "【 webrtc config 】"),
          console.log(e),
          new Promise(function (e, n) {
            var i, s;
            (r.resolve = e),
              (r.reject = n),
              Re(r.tag, "【 webrtc janus地址 】"),
              console.log(o || r.server),
              Fe.init({
                debug: !0,
                callback: function () {
                  console.log("【 janus init 】"),
                    (r.janus = new Fe({
                      server: o || r.server,
                      success: function () {
                        console.log("Janus服务创建成功！"), r.attachVideoRoom();
                      },
                      error: function (e) {
                        Re(r.tag, "create janus error", e), Fe.error(e);
                      },
                      destroyed: function () {
                        Re(r.tag, "janus destroyed");
                      },
                    }));
                },
                statCallback: t,
                params: {
                  roomId: r.roomId,
                  serverNode:
                    (null ===
                      (s =
                        null === (i = location.search) || void 0 === i
                          ? void 0
                          : i.split("serverNode")[1]) || void 0 === s
                      ? void 0
                      : s.split("=")[1]) || 0,
                },
              });
          })
        );
      }),
      (e.prototype.attachVideoRoom = function () {
        var e = this;
        this.janus
          ? this.janus.attach({
              plugin: "janus.plugin.videoroom",
              opaqueId: this.opaqueId,
              success: function (t) {
                var n, r;
                Fe.log("pluginHandle: ", t),
                  (e.sfutest = t),
                  Fe.log(
                    "Plugin attached! ("
                      .concat(
                        null === (n = null == e ? void 0 : e.sfutest) ||
                          void 0 === n
                          ? void 0
                          : n.getPlugin(),
                        ",id="
                      )
                      .concat(
                        null === (r = null == e ? void 0 : e.sfutest) ||
                          void 0 === r
                          ? void 0
                          : r.getId(),
                        ")"
                      )
                  ),
                  Fe.log("  -- This is a publisher/manager"),
                  e.registerUsername();
              },
              error: function (e) {
                Fe.error("  -- Error attaching plugin...", e);
              },
              onmessage: function (t, n) {
                Fe.debug(" ::: Got a message (publisher) :::", t);
                var r = t.videoroom;
                if ((Fe.debug("Event: " + r), r)) {
                  if ("joined" === r) {
                    if (
                      ((e.myid = t.id),
                      (e.mypvtid = t.private_id),
                      Fe.log(
                        "Successfully joined room:"
                          .concat(t.room, " with ID:")
                          .concat(e.myid)
                      ),
                      t.publishers)
                    ) {
                      var o = t.publishers;
                      for (var i in (Fe.log(
                        "Got a list of available publishers/feeds:",
                        o
                      ),
                      o)) {
                        var s = o[i].id,
                          a = o[i].display,
                          c = o[i].audio_codec,
                          d = o[i].video_codec;
                        Fe.log(
                          "  >> ["
                            .concat(s, "] ")
                            .concat(a, " (audio: ")
                            .concat(c, ", video: ")
                            .concat(d, ")")
                        ),
                          null == e.remoteFeed && e.newRemoteFeed(s, a, c, d);
                      }
                    }
                  } else if ("destroyed" === r)
                    Fe.warn("The room has been destroyed!");
                  else if ("event" === r)
                    if (t.publishers) {
                      o = t.publishers;
                      for (var i in (Fe.log(
                        "Got a list of available publishers/feeds:",
                        o
                      ),
                      o)) {
                        (s = o[i].id),
                          (a = o[i].display),
                          (c = o[i].audio_codec),
                          (d = o[i].video_codec);
                        Fe.log(
                          "  >> ["
                            .concat(s, "] ")
                            .concat(a, " (audio: ")
                            .concat(c, ", video: ")
                            .concat(d, ")")
                        ),
                          null == e.remoteFeed && e.newRemoteFeed(s, a, c, d);
                      }
                    } else if (t.leaving) {
                      var u = t.leaving;
                      Fe.log("Publisher left: " + u);
                    } else if (t.unpublished) {
                      var p = t.unpublished;
                      if (
                        (Fe.log("Publisher left: " + p),
                        "ok" === p && e.sfutest)
                      )
                        return void e.sfutest.hangup();
                    } else
                      t.error &&
                        (426 === t.error_code
                          ? Re(
                              e.tag,
                              "<p>Apparently room <code>"
                                .concat(
                                  e.roomId,
                                  "</code> (the one this demo uses as a test room) does not exist...</p><p>Do you have an updated <code>janus.plugin.videoroom.jcfg</code> configuration file? If not, make sure you copy the details of room <code>"
                                )
                                .concat(
                                  e.roomId,
                                  "</code> from that sample in your current configuration file, then restart Janus and try again."
                                )
                            )
                          : Re(t.error));
                } else e.reject("invalid event");
              },
            })
          : Re(this.tag, "invalid janus instance");
      }),
      (e.prototype.registerUsername = function () {
        var e = Fe.randomString(5);
        Fe.log("username:".concat(e));
        var t = {
          request: "join",
          room: this.roomId,
          pin: this.pin,
          ptype: "publisher",
          display: e,
        };
        this.sfutest && this.sfutest.send({ message: t });
      }),
      (e.prototype.newRemoteFeed = function (e, t, n, r) {
        var o = this,
          i = this;
        this.janus
          ? this.janus.attach({
              plugin: "janus.plugin.videoroom",
              opaqueId: this.opaqueId,
              success: function (t) {
                (o.remoteFeed = t),
                  Fe.log(
                    "Plugin attached! ("
                      .concat(o.remoteFeed.getPlugin(), ", id=")
                      .concat(o.remoteFeed.getId(), ")")
                  ),
                  Fe.log("  -- This is a subscriber");
                var n = {
                  request: "join",
                  room: o.roomId,
                  pin: o.pin,
                  ptype: "subscriber",
                  feed: e,
                  private_id: o.mypvtid,
                };
                o.remoteFeed && o.remoteFeed.send({ message: n });
              },
              error: function (e) {
                Fe.error("  -- Error attaching plugin...", e);
              },
              onmessage: function (e, t) {
                var n;
                Fe.log(" ::: Got a message (subscriber) :::", e);
                var r = e.videoroom;
                if ((Fe.debug("Event: ".concat(r)), e.error)) Re(e.error);
                else if (r && "attached" === r) {
                  o.rfindex = 1;
                  var i = e.id,
                    s = e.display;
                  Fe.log(
                    "Successfully attached to feed "
                      .concat(i, " (")
                      .concat(s, ") in room ")
                      .concat(e.room)
                  );
                }
                t &&
                  (Fe.log("Handling SDP as well...", t),
                  null === (n = o.remoteFeed) ||
                    void 0 === n ||
                    n.createAnswer({
                      jsep: t,
                      media: { audioSend: !1, videoSend: !1, data: !0 },
                      success: function (e) {
                        Fe.debug("Got SDP!", e);
                        var t = { request: "start", room: o.roomId };
                        o.remoteFeed &&
                          o.remoteFeed.send({ message: t, jsep: e });
                      },
                      error: function (e) {
                        Fe.error("WebRTC error:", e),
                          Re("WebRTC error... ".concat(e.message));
                      },
                    }));
              },
              iceState: function (e) {
                var t,
                  n = "ICE state of this WebRTC PeerConnection (feed #"
                    .concat(o.rfindex, ") changed to ")
                    .concat(e);
                Fe.log(n),
                "disconnected" !== e ||
                    o.closed ||
                    null === (t = null == o ? void 0 : o.options) ||
                    void 0 === t ||
                    t.errorCallback("数字人链接已断开", "webrtcState_error");
              },
              webrtcState: function (e) {
                Fe.log(
                  "Janus says this WebRTC PeerConnection (feed #" +
                    o.rfindex +
                    ") is " +
                    (e ? "up" : "down") +
                    " now"
                );
              },
              onremotestream: function (e) {
                if (o.closed) Fe.debug("closed()");
                else if (
                  (Fe.debug("Remote feed #" + o.rfindex + ", stream:", e),
                  0 === o.containerEl.querySelectorAll("video").length)
                ) {
                  var t = document.createElement("video");
                  t.setAttribute(
                    "style",
                    "display:block;width:100%;height:100%;"
                  ),
                    t.setAttribute("autoplay", "true"),
                    t.setAttribute("playsinline", "true"),
                    t.setAttribute("webkit-playsinline", "true"),
                    t.setAttribute("x5-playsinline", "true"),
                    t.setAttribute("controls", "true"),
                    t.addEventListener("click", function (e) {
                      e.stopPropagation(), t.play();
                    }),
                    Fe.attachMediaStream(t, e),
                    Fe.log("Streaming attached"),
                    (t.onloadeddata = function () {
                      setTimeout(function () {
                        var e;
                        (null === (e = i.options) || void 0 === e
                          ? void 0
                          : e.onVideoLoadedData) &&
                          i.options.onVideoLoadedData(),
                          t.removeAttribute("controls");
                      }, 0);
                    }),
                    o.containerEl.appendChild(t),
                    (o.videoEl = t),
                    o.resolve();
                }
              },
              ondata: function (e, t) {
                Fe.log("receive data: ".concat(e, ", label: ").concat(t));
              },
              oncleanup: function () {
                Fe.log(
                  " ::: Got a cleanup notification (remote feed ".concat(
                    e,
                    ") :::"
                  )
                ),
                  (o.remoteFeed = void 0);
              },
            })
          : Re(this.tag, "invalid janus instance");
      }),
      (e.prototype.leaveRoom = function () {
        this.remoteFeed &&
          (this.remoteFeed.send({ message: { request: "leave" } }),
          this.remoteFeed.send({ message: { request: "destroy" } }),
          (this.remoteFeed = void 0)),
          this.janus && this.janus.destroy(),
          this.videoEl && this.containerEl.removeChild(this.videoEl),
          (this.closed = !0);
      }),
      e
    );
  })(),
  Be = function (e) {
    var t = Object.assign(e, { req_type: e.req_type || "0" });
    return JSON.stringify(t).replace(/\"|\'/g, '"');
  },
  Le = function (e) {
    var t = this;
    (this.eventName = { success: [], error: [] }),
      (this._ajax = null),
      (this._isTest = !1),
      (this.then = function (e) {
        if (e) return (t.eventName.success = [e]), t;
      }),
      (this.catch = function (e) {
        if (e) return (t.eventName.error = [e]), t;
      }),
      (this.post = function (e) {
        var n = t,
          r = e.code,
          o = e.data,
          i = e.maskAll,
          s = void 0 !== i && i;
        return (
          setTimeout(function () {
            console.log("【【 请求参数 】】"),
              console.log(JSON.stringify({ Data_Cntnt: Be(o) })),
              t._ajax({
                url: "/ecpweb/ecpJson.action",
                safe: !0,
                maskAll: s,
                data: {
                  _fw_service_id: "simpleTransaction",
                  transaction_id: r,
                  jsonData: JSON.stringify({ Data_Cntnt: Be(o) }),
                  jsonClass: "java.util.Map",
                },
                success: function (e, t) {
                  if (
                    (console.log("【【 返回参数 】】"),
                    console.log(e),
                    "00" === (null == e ? void 0 : e.BK_STATUS))
                  ) {
                    var r = JSON.parse(null == e ? void 0 : e.Data_Enqr_Rslt),
                      o = n.eventName.success;
                    (o || o.length) && o[0](r, t);
                  }
                },
                error: function (e, t) {
                  var r = n.eventName.error;
                  (r || r.length) && r[0](e, t);
                },
              });
          }),
          t
        );
      });
    var n = e.ajax;
    this._ajax = n;
  };
window.adapter = de;
var Ue = Te,
  qe = (function () {
    function e(e) {
      var t = this;
      (this.tag = "[FTC TTSA SDK v".concat(Ue, "]")),
        (this.ajax = null),
        (this.ajaxPromise = null),
        (this.token = null),
        (this.bizType = null),
        (this.room = null),
        (this.widgetCallback = function (e) {
          return console.log(t.tag, e);
        }),
        (this.errorCallback = function (e) {
          return console.log(t.tag, e);
        }),
        (this.widgetSocket = null);
      var n = e.width,
        r = e.height,
        o = e.widgetCallback,
        i = e.webrtcCallback,
        s = e.errorCallback;
      (this.widgetCallback = o),
        (this.errorCallback = s),
        (this.webrtcCallback = i);
      var a = document.querySelector(e.container);
      a || Pe(this.tag, "错误的容器标识：", e.container),
        (a.style.width = "".concat(n, "px")),
        (a.style.height = "".concat(r, "px")),
        (this.containerEl = a),
        (this.options = e),
        (this.options.account.username = ""
          .concat(e.account.username, "_")
          .concat(new Date().valueOf())),
        "test" === e.bizMode
          ? (this.http = new Ae(e.server || "http://10.208.53.5:31118"))
          : (this.http = new _e(e.server || "http://10.208.53.5:31118")),
        e.ajax &&
          ((this.ajax = e.ajax), (this.ajaxPromise = new Le({ ajax: e.ajax })));
    }
    return (
      (e.prototype.setup = function () {
        var e = this,
          t = this;
        return this.openRoom()
          .then(function (n) {
            e.room = n;
            var r,
              o = ((r = e.containerEl), new Ne(r));
            return (
              (e.webrtcClient = o), o.setup(n, e.webrtcCallback, t.options)
            );
          })
          .then(function () {
            return e.setupWidgetSocket();
          })
          .catch(function (t) {
            return (
              console.log("TTSA连接失败。"),
              console.log(t),
              e.errorCallback && e.errorCallback(t, "open_error"),
              Pe(e.tag, JSON.stringify(t)),
              Promise.reject(t)
            );
          });
      }),
      (e.prototype.openRoom = function () {
        return r(this, void 0, void 0, function () {
          var e,
            t = this;
          return o(this, function (n) {
            return (
              (e = this),
              this.options.account
                ? [
                    2,
                    this.closeRoom()
                      .then(function () {
                        return e.loginAccount();
                      })
                      .then(function (e) {
                        return (t.token = e), t.openAccount();
                      })
                      .catch(function (e) {
                        t.errorCallback && t.errorCallback(e, "open_error"),
                          console.log(e);
                      }),
                  ]
                : [2]
            );
          });
        });
      }),
      (e.prototype.getSecretId = function () {
        return this.options.config.secret_id
          ? (console.warn(
              this.tag,
              "config.secret_id 在下个版本即将弃用，请使用 account.role_id"
            ),
            this.options.config.secret_id)
          : this.options.account.role_id
          ? this.options.account.role_id
          : (Pe(this.tag, "无效的 role_id"), "");
      }),
      (e.prototype.loginAccount = function () {
        return r(this, void 0, void 0, function () {
          var e, t, n, r, i, s, a, c;
          return o(this, function (o) {
            switch (o.label) {
              case 0:
                return (
                  (e = this.options.account),
                  (t = e.username),
                  (n = e.app_id),
                  (r = e.app_secret),
                  (i = parseInt("".concat(+Date.now() / 1e3), 10)),
                  (s = ke(i + "", n + r + t).toString()),
                  (a = window.btoa(s)),
                  [
                    4,
                    this.http.send({
                      method: "POST",
                      path: je(this.options.bizMode, "login"),
                      body: { username: t, app_id: n, access_token: a, ts: i },
                    }),
                  ]
                );
              case 1:
                return (c = o.sent()).error_code
                  ? (Pe(this.tag, "login() error:", c.error_reason),
                    [2, Promise.reject(c)])
                  : [2, c];
            }
          });
        });
      }),
      (e.prototype.openAccount = function () {
        return r(this, void 0, void 0, function () {
          var e, t, n, r, i, s, a, c, d, u, p;
          return o(this, function (o) {
            switch (o.label) {
              case 0:
                return this.token
                  ? (Re(this.tag, "open()"),
                    (e = this.getSecretId()),
                    (t = this.token),
                    (n = t.user_id),
                    (r = t.key),
                    (i = this.options),
                    (s = i.config),
                    (a = i.width),
                    (c = i.height),
                    a && c && (d = "".concat(a, "x").concat(c)),
                    (u = Object.assign(
                      {
                        user_id: n,
                        key: r,
                        secret_id: e,
                        resolution: d,
                        room_type: "janus",
                      },
                      s
                    )),
                    [
                      4,
                      this.http.send({
                        method: "POST",
                        path: je(this.options.bizMode, "open"),
                        body: u,
                      }),
                    ])
                  : [2, Promise.reject("未登录")];
              case 1:
                return (p = o.sent()).error_code
                  ? (Pe(this.tag, p.error_reason), [2, Promise.reject(p)])
                  : [2, p.data];
            }
          });
        });
      }),
      (e.prototype.sendText = function (e, t) {
        return r(this, void 0, void 0, function () {
          var n,
            r,
            i,
            s,
            a,
            autoAction,
            d,
            u,
            p,
            l = this;
          return o(this, function (o) {
            switch (o.label) {
              case 0:
                return this.token
                  ? 
                  e
                    ? (Re(this.tag, "sendText()"),
                        (n = this.getSecretId()),
                        (r = this.token),
                        (i = r.user_id),
                        (s = r.key),
                        (a = e),
                      (null == t ? void 0 : t.xml) &&
                        ((d = /<[^>]*>/g), a = e.replace(d, "")),
                      (u = /&nbsp;|<br>|<br \/>|<HTML>|<\/HTML>/g),
                      (a = a.replace(u, "，")),
                      (l = /(《|》|:|：|——)/g),
                      (a = a.replace(l, "$1，")),
                      (
                        null === (autoAction = null == t ? void 0 : t.type) ||
                        void 0 === autoAction
                          ? void 0
                          : autoAction.includes("autoAction")
                      )
                        ? [4, this.autoAction(a)]
                        : [3, 2])
                    : [2]
                  : (Pe(this.tag, "未登录"), [2]);

                // (Re(this.tag, "sendText()"),
                //   (n = this.getSecretId()),
                //   (r = this.token),
                //   (i = r.user_id),
                //   (s = r.key),
                //   (a = e),
                //   "pause" !== t
                //     ? [3, 2]
                //     : ((c = /&nbsp;|<br>|<HTML>|<\/HTML>/g),
                //       (a = a.replace(c, "")),
                //       (d = /(《|》|:|：)/g),
                //       (a = a.replace(d, "$1，")),
                //       [4, this.autoAction(a)]))
                // : (Pe(this.tag, "未登录"), [2]);
              case 1:
                (u = o.sent()), (a = u.data || a), (o.label = 2);
              case 2:
                return (
                  (p = {
                    async: !0,
                    interrupt: !0,
                    user_id: i,
                    key: s,
                    secret_id: n,
                    query_text: "ttsa",
                    text: a,
                  }),
                  [
                    2,
                    this.http
                      .send({
                        method: "POST",
                        path: je(this.options.bizMode, "ttsa"),
                        body: p,
                      })
                      .then(function (e) {
                        e.error_code &&
                          Pe(l.tag, "sendText() error:", e.error_reason);
                      })
                      .catch(function (e) {
                        l.errorCallback && l.errorCallback(e),
                          Re(l.tag, JSON.stringify(e));
                      }),
                  ]
                );
            }
          });
        });
      }),
      (e.prototype.chat = function (e) {
        return r(this, void 0, void 0, function () {
          var t,
            r,
            i,
            s,
            a,
            c,
            d,
            u = this;
          return o(this, function (o) {
            return (
              (t = this),
              this.token
                ? ((r =
                    "string" == typeof e
                      ? { query_text: e }
                      : n({ auto_action: this.options.config.auto_action }, e)),
                  (i = this.getSecretId()),
                  (s = this.token),
                  (a = s.user_id),
                  (c = s.key),
                  (d = n(
                    {
                      async: !0,
                      interrupt: !0,
                      user_id: a,
                      key: c,
                      secret_id: i,
                    },
                    r
                  )),
                  [
                    2,
                    this.http
                      .send({
                        method: "POST",
                        path: je(this.options.bizMode, "chat"),
                        body: d,
                      })
                      .then(function (e) {
                        return (
                          t.widgetCallback({
                            callback_info: {
                              data: e.data,
                              type: "voice_chat_data",
                            },
                          }),
                          e.error_code &&
                            Pe(u.tag, "chat() error:", e.error_reason),
                          e
                        );
                      })
                      .catch(function (e) {
                        u.errorCallback && u.errorCallback(e),
                          Re(u.tag, JSON.stringify(e));
                      }),
                  ])
                : (Pe(this.tag, "未登录"), [2])
            );
          });
        });
      }),
      (e.prototype.interrupt = function () {
        return r(this, void 0, void 0, function () {
          var e,
            t,
            n,
            r = this;
          return o(this, function (o) {
            return this.token
              ? ((e = this.token),
                (t = e.user_id),
                (n = e.key),
                [
                  2,
                  this.http
                    .send({
                      method: "POST",
                      path: je(this.options.bizMode, "interrupt"),
                      body: { user_id: t, key: n },
                    })
                    .then(function (e) {
                      e.error_code &&
                        Pe(r.tag, "interrupt() error:", e.error_reason);
                    })
                    .catch(function (e) {
                      Re(r.tag, JSON.stringify(e));
                    }),
                ])
              : (Pe(this.tag, "未登录"), [2]);
          });
        });
      }),
      (e.prototype.mute = function (e) {
        return r(this, void 0, void 0, function () {
          var t,
            n,
            r,
            i,
            s = this;
          return o(this, function (o) {
            return this.token
              ? (Re(this.tag, "mute()"),
                (t = this.token),
                (n = t.user_id),
                (r = t.key),
                (i = { mute: e ? "1" : "0", user_id: n, key: r }),
                [
                  2,
                  this.http
                    .send({
                      method: "POST",
                      path: je(this.options.bizMode, "mute"),
                      body: i,
                    })
                    .then(function (e) {
                      e.error_code &&
                        Pe(s.tag, "mute() error:", e.error_reason);
                    })
                    .catch(function (e) {
                      s.errorCallback && s.errorCallback(e),
                        Re(s.tag, JSON.stringify(e));
                    }),
                ])
              : (Pe(this.tag, "未登录"), [2]);
          });
        });
      }),
      (e.prototype.roomConfig = function (e) {
        return r(this, void 0, void 0, function () {
          var t,
            r,
            i,
            s,
            a,
            c = this;
          return o(this, function (o) {
            return this.token
              ? ((t = this.getSecretId()),
                (r = this.token),
                (i = r.user_id),
                (s = r.key),
                (a = n({ user_id: i, key: s, secret_id: t }, e)),
                [
                  2,
                  this.http
                    .send({
                      method: "POST",
                      path: je(this.options.bizMode, "ue4_config"),
                      body: a,
                    })
                    .then(function (e) {
                      e.error_code &&
                        Pe(c.tag, "roomConfig() error:", e.error_reason);
                    })
                    .catch(function (e) {
                      c.errorCallback && c.errorCallback(e),
                        Re(c.tag, JSON.stringify(e));
                    }),
                ])
              : (Pe(this.tag, "未登录"), [2]);
          });
        });
      }),
      (e.prototype.closeRoom = function () {
        return r(this, void 0, void 0, function () {
          var e,
            t,
            n,
            r,
            i = this;
          return o(this, function (o) {
            return this.token && this.room
              ? (Re(this.tag, "closeRoom()"),
                (e = this.token),
                (t = e.user_id),
                (n = e.key),
                (r = this.room.room_id),
                this.widgetSocket && this.widgetSocket.close(),
                this.webrtcClient && this.webrtcClient.leaveRoom(),
                [
                  2,
                  this.http
                    .send({
                      method: "POST",
                      path: je(this.options.bizMode, "close"),
                      body: { user_id: t, key: n, room_id: r },
                    })
                    .then(function (e) {
                      e.error_code &&
                        Pe(i.tag, "closeRoom() error:", e.error_reason),
                        (i.token = null),
                        (i.room = null);
                    }),
                ])
              : [2, Promise.resolve()];
          });
        });
      }),
      (e.prototype.autoAction = function (e) {
        return r(this, void 0, void 0, function () {
          var t, n, r, i;
          return o(this, function (o) {
            return this.token
              ? (Re(this.tag, "autoAction()"),
                (t = this.token),
                (n = t.user_id),
                (r = t.key),
                (i = {
                  text: e,
                  digital_id: 1,
                  insert_arm_action: !0,
                  keep_existent_arm_action: !0,
                  insert_head_action: !1,
                  keep_existent_head_action: !1,
                }),
                [
                  2,
                  this.http
                    .send({
                      method: "POST",
                      path: je(this.options.bizMode, "action"),
                      body: i,
                      Authorization: "token ".concat(n, " ").concat(r),
                    })
                    .then(function (e) {
                      return e;
                    }),
                ])
              : [2, Promise.resolve()];
          });
        });
      }),
      (e.prototype.setupWidgetSocket = function () {
        var e = this;
        return new Promise(function (t, n) {
          if (!e.token || !e.room) return n({ error_reason: "无效的登录信息" });
          var r = ":::[UICallback]",
            o = e.token.user_id,
            i = e.room.app_server_info,
            a = e.options.appServer;
          (e.widgetSocket = s(a || i)),
            e.widgetSocket &&
              (e.widgetSocket.on("connect", function () {
                if (
                  (Re(r, "".concat(a || i, " connected")),
                  e.widgetSocket && e.token)
                ) {
                  var n = { user_id: o, session_id: e.token.session_id };
                  e.widgetSocket.emit("session_info", n), t(!0);
                }
              }),
              e.widgetSocket.on("ui_callback", function (t) {
                e.widgetCallback(t);
              }),
              e.widgetSocket.on("error", function (e) {
                Pe(r, e);
              }),
              e.widgetSocket.on("connect_error", function (t) {
                console.log("widgetSocket连接错误-connect_error"),
                  e.errorCallback && e.errorCallback(t, "widgetSocket_error"),
                  Pe(r, t);
              }),
              e.widgetSocket.on("disconnect", function (t) {
                Pe(r, "disconnect:", t), (e.widgetSocket = null);
              }));
        });
      }),
      e
    );
  })();
console.log("[FTC TTSA SDK v".concat(Ue, "] loaded")),
  (window.FTC_TTSA_PRIM = qe);
var ze = (function (e) {
  function i(t) {
    var n = e.call(this, t) || this;
    return (n.sessionId = ""), n;
  }
  return (
    (function (e, n) {
      if ("function" != typeof n && null !== n)
        throw new TypeError(
          "Class extends value " + String(n) + " is not a constructor or null"
        );
      function r() {
        this.constructor = e;
      }
      t(e, n),
        (e.prototype =
          null === n
            ? Object.create(n)
            : ((r.prototype = n.prototype), new r()));
    })(i, e),
    (i.prototype.env = function (e, t) {
      return (
        void 0 === e && (e = {}),
        r(this, void 0, void 0, function () {
          var n;
          return o(this, function (r) {
            return (
              Object.assign(e, { req_type: "1" }),
              Re(this.tag, "env获取环境："),
              (n = {
                env: "https://apis.xmov.ai",
                appServer: "",
                janusServer: "",
                account: {
                  username: "jiansheyinhang",
                  app_id: "C8Dk6aAfhiWQp8s*lrDljAvg",
                  app_secret: "PPWxM@1@(ZbC$Fh^FUoT8LP240Jk9C",
                  role_id: "cb963ecf57524201bcda8098f93ccf36",
                },
              }),
              "huaweiyun" === e.env
                ? ((n = {
                    env: "http://122.9.33.164:88",
                    appServer: "",
                    janusServer: "",
                    account: {
                      username: "husunqiang",
                      role_id: "5f0db8fa3b904b64a89a459eafcd170f",
                      app_id: "5KbEUSWiQH!qo9nHsnWLqdQM",
                      app_secret: "%55^nSz%EO62Tm8qyP#gZ#yguUiLI%",
                    },
                  }),
                  (this.options.account = n.account),
                  (this.options.server = n.env),
                  (this.http = new _e(n.env)))
                : "opm" === e.env &&
                  ((n = {
                    env: "https://opm.tech.ccb.com",
                    appServer: "https://opm.tech.ccb.com",
                    janusServer: "https://opm.tech.ccb.com/janus",
                    account: {
                      username: "husunqiang",
                      app_id: "oe@njW8nseAcI(bwnqkKTPo4",
                      app_secret: "51rnf^qot0jswGoGhtZK4CS2uhE8Qs",
                      role_id: "728966b26fd94bc09714f11882806139",
                    },
                  }),
                  (this.options.account = n.account),
                  (this.options.server = n.env),
                  (this.options.appServer = n.appServer),
                  (this.options.janusServer = n.janusServer),
                  (this.options.account.username = ""
                    .concat(n.account.username, "_")
                    .concat(new Date().valueOf())),
                  (this.http = new _e(n.env))),
              t && t(n),
              [2]
            );
          });
        })
      );
    }),
    (i.prototype.register = function (e, t) {
      return (
        void 0 === e && (e = {}),
        r(this, void 0, void 0, function () {
          var n,
            r,
            i,
            s = this;
          return o(this, function (o) {
            return (
              (n = this),
              (this.bizType = "0"),
              (r = Object.assign(e, { req_type: "1" })),
              this.ajax
                ? (Re(this.tag, "register()"),
                  (i = this.ajaxPromise.post({
                    code: xe,
                    data: r,
                    maskAll: !1,
                  })),
                  setTimeout(function () {
                    i.then(function (e) {
                      Re(s.tag, "ECP注册接口请求成功 then()"),
                        console.log(e),
                        (null == e ? void 0 : e.Ssn_ID) &&
                          ((s.sessionId = null == e ? void 0 : e.Ssn_ID),
                          t && t(e),
                          n.sendText(null == e ? void 0 : e.Cnvs_Cntnt));
                    });
                  }),
                  [2, i])
                : [2]
            );
          });
        })
      );
    }),
    (i.prototype.registerC6 = function (e) {
      return r(this, void 0, void 0, function () {
        var t = this;
        return o(this, function (r) {
          return [
            2,
            this.http
              .send({
                method: "POST",
                path: Oe.registerC6,
                body: n({ req_type: "1" }, e),
              })
              .then(function (e) {
                return console.log("=========="), console.log(e), e && e.Ssn_ID;
              })
              .catch(function (e) {
                Re(t.tag, JSON.stringify(e));
              }),
          ];
        });
      });
    }),
    (i.prototype.chatC6 = function (e) {
      return r(this, void 0, void 0, function () {
        var t = this;
        return o(this, function (r) {
          return [
            2,
            this.http
              .send({
                method: "POST",
                path: Oe.chatC6,
                body: n({ req_type: "1" }, e),
              })
              .then(function (e) {
                return console.log("=========="), console.log(e), e;
              })
              .catch(function (e) {
                Re(t.tag, JSON.stringify(e));
              }),
          ];
        });
      });
    }),
    (i.prototype.asrC6 = function (e) {
      return r(this, void 0, void 0, function () {
        var t = this;
        return o(this, function (r) {
          return [
            2,
            this.http
              .send({
                method: "POST",
                path: Oe.asrC6,
                body: n({ req_type: "1" }, e),
              })
              .then(function (e) {
                return console.log("asr=========="), console.log(e), e;
              })
              .catch(function (e) {
                Re(t.tag, JSON.stringify(e));
              }),
          ];
        });
      });
    }),
    (i.prototype.chatECP = function (e, t) {
      return r(this, void 0, void 0, function () {
        var i,
          s,
          a,
          c,
          d,
          u = this;
        return o(this, function (p) {
          i = this;
          try {
            this.getSecretId(), (s = this.token), s.user_id, s.key;
          } catch (e) {}
          return (
            (a = Object.assign(e, { req_type: "1" })),
            (c = n(n({}, a), {
              role_id: "test",
              token: "test",
              user_id: 123456,
              ttsa_type: 1,
            })),
            this.ajax
              ? (Re(this.tag, "chatECP()"),
                (d = this.ajaxPromise.post({ code: De, data: c, maskAll: !1 })),
                setTimeout(function () {
                  d.then(function (e) {
                    return r(u, void 0, void 0, function () {
                      var n, r, s, a, c, d;
                      return o(this, function (o) {
                        switch (o.label) {
                          case 0:
                            return (
                              Re(this.tag, "ECP问答请求成功"),
                              console.log(e),
                              (n = e.Cnvs_Cntnt),
                              (r = void 0 === n ? "" : n),
                              (s = e.Bsn_Parm_Tp),
                              [
                                4,
                                i.autoAction(
                                  ((u = r),
                                  u
                                    .replace(/app|APP/g, "诶批批")
                                    .replace(/logo/g, "搂狗")
                                    .replace("E超人", "亿超人")
                                    .replace(/ATM|atm/g, "诶踢爱慕")
                                    .replace(/iPhone/g, "爱凤")
                                    .replace(/u|U/g, "优")
                                    .replace(/a|A/g, "诶")
                                    .replace(/p|P/g, "批")
                                    .replace(/i|I/g, "艾")
                                    .replace(/n|N/g, "嗯")
                                    .replace(/v|V/g, "微")
                                    .replace(/x|X/g, "艾克四"))
                                ),
                              ]
                            );
                          case 1:
                            a = o.sent();
                            try {
                              (c = document.querySelector("#ttsa video")) &&
                                c.play();
                            } catch (e) {}
                            return (
                              (d = 0),
                              ("2" !== s && "5" !== s) || (d = 0),
                              setTimeout(function () {
                                i.sendText((null == a ? void 0 : a.data) || r);
                              }, d),
                              t && t(e),
                              [2]
                            );
                        }
                        var u;
                      });
                    });
                  });
                }),
                [2, d])
              : [
                  2,
                  this.http
                    .send({
                      method: "POST",
                      path: "/business/chat/",
                      body: n({ req_type: "1", sessionid: this.sessionId }, c),
                    })
                    .then(function (e) {
                      console.log("=========="), console.log(e);
                    })
                    .catch(function (e) {
                      Re(u.tag, JSON.stringify(e));
                    }),
                ]
          );
        });
      });
    }),
    (i.prototype.logoutECP = function (e, t) {
      return r(this, void 0, void 0, function () {
        var r,
          i,
          s,
          a,
          c = this;
        return o(this, function (o) {
          return (
            (r = this),
            (i = Object.assign(e, { req_type: "1" })),
            (s = n({}, i)),
            this.ajax
              ? (Re(this.tag, "logoutECP()"),
                (a = this.ajaxPromise.post({ code: Ee, data: s })),
                setTimeout(function () {
                  a.then(function (e) {
                    Re(c.tag, "ECP注销成功"), r.closeRoom(), t && t(e);
                  });
                }),
                [2, a])
              : [2, null]
          );
        });
      });
    }),
    (i.prototype.asr = function (e) {
      return r(this, void 0, void 0, function () {
        var t = this;
        return o(this, function (n) {
          return (
            Re(this.tag, "语音 base64Data"),
            console.log(e),
            [
              2,
              this.http
                .send({
                  method: "POST",
                  path: je(this.options.bizMode, "asr"),
                  body: { req_type: "1", data: e },
                })
                .then(function (e) {
                  return console.log("=========="), console.log(e), e;
                })
                .catch(function (e) {
                  Re(t.tag, JSON.stringify(e));
                }),
            ]
          );
        });
      });
    }),
    (i.prototype.predict = function (e) {
      return r(this, void 0, void 0, function () {
        var t,
          n = this;
        return o(this, function (r) {
          return (
            (t = this),
            Re(this.tag, "语音 predict"),
            console.log(e),
            [
              2,
              this.http
                .send({
                  method: "POST",
                  path: "http://13.115.19.0:9000/chat",
                  body: { data: e },
                })
                .then(function (e) {
                  return (
                    console.log("=========="),
                    console.log(e),
                    t.sendText(
                      (e && e.content && e.content.join("")) ||
                        "您好，我不明白您的意思"
                    ),
                    {
                      results:
                        (e && e.content && e.content.join("")) ||
                        "您好，我不明白您的意思",
                    }
                  );
                })
                .catch(function (e) {
                  return (
                    Re(n.tag, JSON.stringify(e)),
                    t.sendText("您好，我不明白您的意思"),
                    { results: "您好，我不明白您的意思" }
                  );
                }),
            ]
          );
        });
      });
    }),
    i
  );
})(qe);
window.FTC_TTSA = ze;