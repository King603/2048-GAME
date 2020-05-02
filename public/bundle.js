(function (e) {
  function appendJS(e) {
    let js = document.createElement("script");
    js.type = "text/javascript";
    js.charset = "utf-8";
    js.src = `${p.p}${e}.${w}.hot-update.js"`;
    document.head.appendChild(js);
  }
  function r(e) {
    if ("undefined" == typeof XMLHttpRequest) return e(new Error("No browser support"));
    try {
      let xhr = new XMLHttpRequest;
      xhr.open("GET", `${p.p}${w}.hot-update.json`, !0);
      xhr.timeout = 1e4;
      xhr.send(null);
    } catch (n) { return e(n); }
    xhr.onreadystatechange = function () {
      if (4 === xhr.readyState)
        if (0 === xhr.status)
          e(new Error(`Manifest request to ${r} timed out.`));
        else if (404 === xhr.status)
          e();
        else if (200 !== xhr.status && 304 !== xhr.status)
          e(new Error(`Manifest request to ${r} failed.`));
        else {
          let n;
          try {
            n = JSON.parse(xhr.responseText);
          } catch (i) { return void e(i); }
          e(null, n);
        }
    };
  }
  function n(e) {
    function t(e, t) {
      "ready" === k && o("prepare");
      N++;
      p.e(e,
        function () {
          try {
            t.call(null, n);
          } finally {
            if ("prepare" === k) {
              A[e] || l(e);
              0 === --N && 0 === C && u();
            }
          }
        });
    }
    let r = T[e];
    if (!r) return p;
    function n(t) {
      return r.hot.active
        ? T[t]
          ? (T[t].parents.indexOf(e) < 0 && T[t].parents.push(e), r.children.indexOf(t) < 0 && r.children.push(t))
          : x = [e]
        : (console.warn(`"[HMR] unexpected require(${t}) from disposed module ${e}`), x = []), p(t);
    };
    for (let i in p)
      Object.prototype.hasOwnProperty.call(p, i) && (d ? Object.defineProperty(n, i,
        function (e) {
          return {
            configurable: !0,
            enumerable: !0,
            get() {
              return p[e];
            },
            set(t) {
              p[e] = t;
            }
          };
        }(i)) : n[i] = p[i]);
    return d ? Object.defineProperty(n, "e", { enumerable: !0, value: t }) : n.e = t, n;
  }
  function i(e) {
    return {
      _acceptedDependencies: {},
      _declinedDependencies: {},
      _selfAccepted: !1,
      _selfDeclined: !1,
      _disposeHandlers: [],
      active: !0,
      accept(event, r) {
        switch (typeof event) {
          case "undefined":
            this._selfAccepted = !0;
            break;
          case "function":
            this._selfAccepted = event;
            break;
          case "object":
            for (let e of event)
              this._acceptedDependencies[e] = r;
            break;
          default: this._acceptedDependencies[event] = r;
        }
      },
      decline(e) {
        if ("undefined" == typeof e)
          this._selfDeclined = !0;
        else if ("number" == typeof e)
          this._declinedDependencies[e] = !0;
        else
          for (let r of e)
            this._declinedDependencies[r] = !0;
      },
      dispose(e) {
        this._disposeHandlers.push(e);
      },
      addDisposeHandler(e) {
        this._disposeHandlers.push(e);
      },
      removeDisposeHandler(e) {
        let r = this._disposeHandlers.indexOf(e);
        r >= 0 && this._disposeHandlers.splice(r, 1);
      },
      check: a,
      apply: h,
      status(e) {
        return e ? void E.push(e) : k;
      },
      addStatusHandler(e) {
        E.push(e);
      },
      removeStatusHandler(e) {
        let t = E.indexOf(e);
        t >= 0 && E.splice(t, 1);
      },
      data: _[e]
    };
  }
  function o(e) {
    k = e;
    for (let t of E)
      t.call(null, e);
  }
  function s(e) {
    return +e + "" === e ? +e : e;
  }
  function a(e, t) {
    if ("idle" !== k)
      throw new Error("check() is only allowed in idle status");
    "function" == typeof e ? (y = !1, t = e) : (y = e, t = t || function (e) {
      if (e)
        throw e;
    }), o("check"), r(function (e, r) {
      if (e)
        return t(e);
      if (!r)
        return o("idle"), void t(null, null);
      O = {}, D = {}, A = {};
      for (let n of r.c)
        D[n] = !0; b = r.h, o("prepare"), m = t, g = {};
      let i = 0;
      l(i), "prepare" === k && 0 === N && 0 === C && u();
    });
  }
  function c(e, t) {
    if (D[e] && O[e]) {
      O[e] = !1;
      for (let r in t)
        Object.prototype.hasOwnProperty.call(t, r) && (g[r] = t[r]);
      0 === --C && 0 === N && u();
    }
  }
  function l(e) {
    D[e] ? (O[e] = !0, C++, appendJS(e)) : A[e] = !0;
  }
  function u() {
    o("ready");
    let e = m;
    if (m = null, e)
      if (y)
        h(y, e);
      else {
        let t = [];
        for (let r in g)
          Object.prototype.hasOwnProperty.call(g, r) && t.push(s(r));
        e(null, t);
      }
  }
  function h(t, r) {
    function n(e) {
      for (let t = [e], r = {}, n = t.slice(); n.length > 0;) {
        let o = n.pop(), e = T[o];
        if (e && !e.hot._selfAccepted) {
          if (e.hot._selfDeclined)
            return new Error("Aborted because of self decline: " + o);
          if (0 === o)
            return;
          for (let s = 0; s < e.parents.length; s++) {
            let a = e.parents[s], c = T[a];
            if (c.hot._declinedDependencies[o])
              return new Error("Aborted because of declined dependency: " + o + " in " + a);
            t.indexOf(a) >= 0 || (c.hot._acceptedDependencies[o] ? (r[a] || (r[a] = []), i(r[a], [o])) : (delete r[a], t.push(a), n.push(a)));
          }
        }
      } return [t, r];
    }
    function i(e, t) {
      for (let n of t) {
        e.indexOf(n) < 0 && e.push(n);
      }
    }
    if ("ready" !== k)
      throw new Error("apply() is only allowed in ready status"); "function" == typeof t ? (r = t, t = {}) : t && "object" == typeof t ? r = r || function (e) {
        if (e)
          throw e;
      } : (t = {}, r = r || function (e) {
        if (e)
          throw e;
      }); let a = {}, c = [], l = {}; for (let u in g)
      if (Object.prototype.hasOwnProperty.call(g, u)) {
        let h = s(u), f = n(h);
        if (!f) {
          if (t.ignoreUnaccepted)
            continue;
          return o("abort"), r(new Error("Aborted because " + h + " is not accepted"));
        }
        if (f instanceof Error)
          return o("abort"), r(f);
        l[h] = g[h], i(c, f[0]);
        for (let h in f[1])
          Object.prototype.hasOwnProperty.call(f[1], h) && (a[h] || (a[h] = []), i(a[h], f[1][h]));
      } for (let d = [], v = 0; v < c.length; v++) {
        let h = c[v];
        T[h] && T[h].hot._selfAccepted && d.push({ module: h, errorHandler: T[h].hot._selfAccepted });
      } o("dispose"); for (let m = c.slice(); m.length > 0;) {
        let h = m.pop(), y = T[h];
        if (y) {
          let E = {};
          for (let A of y.hot._disposeHandlers) A(E);
          _[h] = E, y.hot.active = !1, delete T[h];
          for (let N of y.children) {
            let O = T[N];
            if (O) {
              let D = O.parents.indexOf(h);
              D >= 0 && O.parents.splice(D, 1);
            }
          }
        }
      }
    for (let h in a)
      if (Object.prototype.hasOwnProperty.call(a, h))
        for (let $ of a[h]) {
          let D = T[h].children.indexOf($);
          D >= 0 && T[h].children.splice(D, 1);
        }
    o("apply"), w = b;
    for (let h in l)
      Object.prototype.hasOwnProperty.call(l, h) && (e[h] = l[h]);
    let S = null;
    for (let h in a)
      if (Object.prototype.hasOwnProperty.call(a, h)) {
        let L = [];
        for (let $ of a[h]) {
          let A = T[h].hot._acceptedDependencies[$];
          L.indexOf(A) >= 0 || L.push(A);
        }
        for (let A of L) {
          try {
            A(a);
          } catch (j) {
            S || (S = j);
          }
        }
      } for (let R of d) {
        let h = R.module;
        x = [h];
        try {
          p(h);
        } catch (j) {
          if ("function" == typeof R.errorHandler)
            try {
              R.errorHandler(j);
            } catch (j) {
              S || (S = j);
            }
          else S || (S = j);
        }
      } return S ? (o("fail"), r(S)) : (o("idle"), void r(null, c));
  }
  function p(t) {
    if (T[t])
      return T[t].exports;
    let r = T[t] = {
      exports: {},
      id: t,
      loaded: !1,
      hot: i(t),
      parents: x,
      children: []
    };
    return e[t].call(r.exports, r, r.exports, n(t)), r.loaded = !0, r.exports;
  }
  let f = this.webpackHotUpdate;
  this.webpackHotUpdate = function (e, t) {
    c(e, t);
    f && f(e, t);
  };
  let d = !1;
  try {
    Object.defineProperty({}, "x", { get() { } }), d = !0;
  }
  catch (v) { }
  let m, g, b, y = !0, w = "1ae9b878aab98a18fb45", _ = {}, x = [], E = [], k = "idle", C = 0, N = 0, A = {}, O = {}, D = {}, T = {};
  return p.m = e, p.c = T, p.p = "http://localhost:8080/", p.h = () => w, n(0)(0);
})([
  function (e, t, r) {
    r(55);
    r(23);
    e.exports = r(60);
  },
  function (e, t) {
    "number" == typeof __e && (__e = e.exports = { version: "2.4.0" });
  },
  function (e, t, r) {
    t = e.exports = r(7)();
    t.i(r(13), ""), t.push([e.id, "", ""]);
  },
  function (e, t, r) {
    e.exports = !r(4)(() => 7 != Object.defineProperty({}, "a", {
      get() {
        return 7;
      }
    }).a);
  },
  function (e, t) {
    e.exports = function (e) {
      try {
        return !!e();
      } catch (t) {
        return !0;
      }
    };
  },
  function (e, t) {
    e.exports = "undefined" != typeof window && window.Math == Math
      ? window
      : "undefined" != typeof self && self.Math == Math
        ? self
        : Function("return this")();
    "number" == typeof __g && (__g = e.exports);
  },
  function (e, t) {
    e.exports = function (e) {
      return "object" == typeof e
        ? null !== e
        : "function" == typeof e;
    };
  },
  function (e, t) {
    e.exports = function () {
      let e = [];
      return e.toString = function () {
        let e = [];
        for (let r of this)
          e.push(r[2] ? `@media ${r[2]}{${r[1]}}` : r[1]);
        return e.join("");
      }, e.i = function (t, r) {
        "string" == typeof t && (t = [[null, t, ""]]);
        let n = {};
        for (let i of this) {
          let o = i[0];
          "number" == typeof o && (n[o] = !0);
        }
        for (let s of t) {
          "number" == typeof s[0] && n[s[0]]
            || (r && !s[2]
              ? s[2] = r
              : r && (s[2] = `(${s[2]}) and (${r})`), e.push(s));
        }
      }, e;
    };
  },
  function (e, t) {
    function r() { }
    function n(e, t) {
      for (let r = i.length, n = []; r--;) {
        let o,
          [a, c] = i[r],
          l = c[0],
          u = l < 32 || l > 126 || 62 === l || 60 === l || 38 === l || 34 === l || 39 === l;
        if (u && (o = t[l] = t[l] || {}), c[1]) {
          let h = c[1];
          e[a] = String.fromCharCode(l) + String.fromCharCode(h), n.push(u && (o[h] = a));
        }
        else
          e[a] = String.fromCharCode(l), n.push(u && (o[""] = a));
      }
    }
    let i = [
      ["Aacute", [193]],
      ["aacute", [225]],
      ["Abreve", [258]],
      ["abreve", [259]],
      ["ac", [8766]],
      ["acd", [8767]],
      ["acE", [8766, 819]],
      ["Acirc", [194]],
      ["acirc", [226]],
      ["acute", [180]],
      ["Acy", [1040]],
      ["acy", [1072]],
      ["AElig", [198]],
      ["aelig", [230]],
      ["af", [8289]],
      ["Afr", [120068]],
      ["afr", [120094]],
      ["Agrave", [192]],
      ["agrave", [224]],
      ["alefsym", [8501]],
      ["aleph", [8501]],
      ["Alpha", [913]],
      ["alpha", [945]],
      ["Amacr", [256]],
      ["amacr", [257]],
      ["amalg", [10815]],
      ["amp", [38]],
      ["AMP", [38]],
      ["andand", [10837]],
      ["And", [10835]],
      ["and", [8743]],
      ["andd", [10844]],
      ["andslope", [10840]],
      ["andv", [10842]],
      ["ang", [8736]],
      ["ange", [10660]],
      ["angle", [8736]],
      ["angmsdaa", [10664]],
      ["angmsdab", [10665]],
      ["angmsdac", [10666]],
      ["angmsdad", [10667]],
      ["angmsdae", [10668]],
      ["angmsdaf", [10669]],
      ["angmsdag", [10670]],
      ["angmsdah", [10671]],
      ["angmsd", [8737]],
      ["angrt", [8735]],
      ["angrtvb", [8894]],
      ["angrtvbd", [10653]],
      ["angsph", [8738]],
      ["angst", [197]],
      ["angzarr", [9084]],
      ["Aogon", [260]],
      ["aogon", [261]],
      ["Aopf", [120120]],
      ["aopf", [120146]],
      ["apacir", [10863]],
      ["ap", [8776]],
      ["apE", [10864]],
      ["ape", [8778]],
      ["apid", [8779]],
      ["apos", [39]],
      ["ApplyFunction", [8289]],
      ["approx", [8776]],
      ["approxeq", [8778]],
      ["Aring", [197]],
      ["aring", [229]],
      ["Ascr", [119964]],
      ["ascr", [119990]],
      ["Assign", [8788]],
      ["ast", [42]],
      ["asymp", [8776]],
      ["asympeq", [8781]],
      ["Atilde", [195]],
      ["atilde", [227]],
      ["Auml", [196]],
      ["auml", [228]],
      ["awconint", [8755]],
      ["awint", [10769]],
      ["backcong", [8780]],
      ["backepsilon", [1014]],
      ["backprime", [8245]],
      ["backsim", [8765]],
      ["backsimeq", [8909]],
      ["Backslash", [8726]],
      ["Barv", [10983]],
      ["barvee", [8893]],
      ["barwed", [8965]],
      ["Barwed", [8966]],
      ["barwedge", [8965]],
      ["bbrk", [9141]],
      ["bbrktbrk", [9142]],
      ["bcong", [8780]],
      ["Bcy", [1041]],
      ["bcy", [1073]],
      ["bdquo", [8222]],
      ["becaus", [8757]],
      ["because", [8757]],
      ["Because", [8757]],
      ["bemptyv", [10672]],
      ["bepsi", [1014]],
      ["bernou", [8492]],
      ["Bernoullis", [8492]],
      ["Beta", [914]],
      ["beta", [946]],
      ["beth", [8502]],
      ["between", [8812]],
      ["Bfr", [120069]],
      ["bfr", [120095]],
      ["bigcap", [8898]],
      ["bigcirc", [9711]],
      ["bigcup", [8899]],
      ["bigodot", [10752]],
      ["bigoplus", [10753]],
      ["bigotimes", [10754]],
      ["bigsqcup", [10758]],
      ["bigstar", [9733]],
      ["bigtriangledown", [9661]],
      ["bigtriangleup", [9651]],
      ["biguplus", [10756]],
      ["bigvee", [8897]],
      ["bigwedge", [8896]],
      ["bkarow", [10509]],
      ["blacklozenge", [10731]],
      ["blacksquare", [9642]],
      ["blacktriangle", [9652]],
      ["blacktriangledown", [9662]],
      ["blacktriangleleft", [9666]],
      ["blacktriangleright", [9656]],
      ["blank", [9251]],
      ["blk12", [9618]],
      ["blk14", [9617]],
      ["blk34", [9619]],
      ["block", [9608]],
      ["bne", [61, 8421]],
      ["bnequiv", [8801, 8421]],
      ["bNot", [10989]],
      ["bnot", [8976]],
      ["Bopf", [120121]],
      ["bopf", [120147]],
      ["bot", [8869]],
      ["bottom", [8869]],
      ["bowtie", [8904]],
      ["boxbox", [10697]],
      ["boxdl", [9488]],
      ["boxdL", [9557]],
      ["boxDl", [9558]],
      ["boxDL", [9559]],
      ["boxdr", [9484]],
      ["boxdR", [9554]],
      ["boxDr", [9555]],
      ["boxDR", [9556]],
      ["boxh", [9472]],
      ["boxH", [9552]],
      ["boxhd", [9516]],
      ["boxHd", [9572]],
      ["boxhD", [9573]],
      ["boxHD", [9574]],
      ["boxhu", [9524]],
      ["boxHu", [9575]],
      ["boxhU", [9576]],
      ["boxHU", [9577]],
      ["boxminus", [8863]],
      ["boxplus", [8862]],
      ["boxtimes", [8864]],
      ["boxul", [9496]],
      ["boxuL", [9563]],
      ["boxUl", [9564]],
      ["boxUL", [9565]],
      ["boxur", [9492]],
      ["boxuR", [9560]],
      ["boxUr", [9561]],
      ["boxUR", [9562]],
      ["boxv", [9474]],
      ["boxV", [9553]],
      ["boxvh", [9532]],
      ["boxvH", [9578]],
      ["boxVh", [9579]],
      ["boxVH", [9580]],
      ["boxvl", [9508]],
      ["boxvL", [9569]],
      ["boxVl", [9570]],
      ["boxVL", [9571]],
      ["boxvr", [9500]],
      ["boxvR", [9566]],
      ["boxVr", [9567]],
      ["boxVR", [9568]],
      ["bprime", [8245]],
      ["breve", [728]],
      ["Breve", [728]],
      ["brvbar", [166]],
      ["bscr", [119991]],
      ["Bscr", [8492]],
      ["bsemi", [8271]],
      ["bsim", [8765]],
      ["bsime", [8909]],
      ["bsolb", [10693]],
      ["bsol", [92]],
      ["bsolhsub", [10184]],
      ["bull", [8226]],
      ["bullet", [8226]],
      ["bump", [8782]],
      ["bumpE", [10926]],
      ["bumpe", [8783]],
      ["Bumpeq", [8782]],
      ["bumpeq", [8783]],
      ["Cacute", [262]],
      ["cacute", [263]],
      ["capand", [10820]],
      ["capbrcup", [10825]],
      ["capcap", [10827]],
      ["cap", [8745]],
      ["Cap", [8914]],
      ["capcup", [10823]],
      ["capdot", [10816]],
      ["CapitalDifferentialD", [8517]],
      ["caps", [8745, 65024]],
      ["caret", [8257]],
      ["caron", [711]],
      ["Cayleys", [8493]],
      ["ccaps", [10829]],
      ["Ccaron", [268]],
      ["ccaron", [269]],
      ["Ccedil", [199]],
      ["ccedil", [231]],
      ["Ccirc", [264]],
      ["ccirc", [265]],
      ["Cconint", [8752]],
      ["ccups", [10828]],
      ["ccupssm", [10832]],
      ["Cdot", [266]],
      ["cdot", [267]],
      ["cedil", [184]],
      ["Cedilla", [184]],
      ["cemptyv", [10674]],
      ["cent", [162]],
      ["centerdot", [183]],
      ["CenterDot", [183]],
      ["cfr", [120096]],
      ["Cfr", [8493]],
      ["CHcy", [1063]],
      ["chcy", [1095]],
      ["check", [10003]],
      ["checkmark", [10003]],
      ["Chi", [935]],
      ["chi", [967]],
      ["circ", [710]],
      ["circeq", [8791]],
      ["circlearrowleft", [8634]],
      ["circlearrowright", [8635]],
      ["circledast", [8859]],
      ["circledcirc", [8858]],
      ["circleddash", [8861]],
      ["CircleDot", [8857]],
      ["circledR", [174]],
      ["circledS", [9416]],
      ["CircleMinus", [8854]],
      ["CirclePlus", [8853]],
      ["CircleTimes", [8855]],
      ["cir", [9675]],
      ["cirE", [10691]],
      ["cire", [8791]],
      ["cirfnint", [10768]],
      ["cirmid", [10991]],
      ["cirscir", [10690]],
      ["ClockwiseContourIntegral", [8754]],
      ["CloseCurlyDoubleQuote", [8221]],
      ["CloseCurlyQuote", [8217]],
      ["clubs", [9827]],
      ["clubsuit", [9827]],
      ["colon", [58]],
      ["Colon", [8759]],
      ["Colone", [10868]],
      ["colone", [8788]],
      ["coloneq", [8788]],
      ["comma", [44]],
      ["commat", [64]],
      ["comp", [8705]],
      ["compfn", [8728]],
      ["complement", [8705]],
      ["complexes", [8450]],
      ["cong", [8773]],
      ["congdot", [10861]],
      ["Congruent", [8801]],
      ["conint", [8750]],
      ["Conint", [8751]],
      ["ContourIntegral", [8750]],
      ["copf", [120148]],
      ["Copf", [8450]],
      ["coprod", [8720]],
      ["Coproduct", [8720]],
      ["copy", [169]],
      ["COPY", [169]],
      ["copysr", [8471]],
      ["CounterClockwiseContourIntegral", [8755]],
      ["crarr", [8629]],
      ["cross", [10007]],
      ["Cross", [10799]],
      ["Cscr", [119966]],
      ["cscr", [119992]],
      ["csub", [10959]],
      ["csube", [10961]],
      ["csup", [10960]],
      ["csupe", [10962]],
      ["ctdot", [8943]],
      ["cudarrl", [10552]],
      ["cudarrr", [10549]],
      ["cuepr", [8926]],
      ["cuesc", [8927]],
      ["cularr", [8630]],
      ["cularrp", [10557]],
      ["cupbrcap", [10824]],
      ["cupcap", [10822]],
      ["CupCap", [8781]],
      ["cup", [8746]],
      ["Cup", [8915]],
      ["cupcup", [10826]],
      ["cupdot", [8845]],
      ["cupor", [10821]],
      ["cups", [8746, 65024]],
      ["curarr", [8631]],
      ["curarrm", [10556]],
      ["curlyeqprec", [8926]],
      ["curlyeqsucc", [8927]],
      ["curlyvee", [8910]],
      ["curlywedge", [8911]],
      ["curren", [164]],
      ["curvearrowleft", [8630]],
      ["curvearrowright", [8631]],
      ["cuvee", [8910]],
      ["cuwed", [8911]],
      ["cwconint", [8754]],
      ["cwint", [8753]],
      ["cylcty", [9005]],
      ["dagger", [8224]],
      ["Dagger", [8225]],
      ["daleth", [8504]],
      ["darr", [8595]],
      ["Darr", [8609]],
      ["dArr", [8659]],
      ["dash", [8208]],
      ["Dashv", [10980]],
      ["dashv", [8867]],
      ["dbkarow", [10511]],
      ["dblac", [733]],
      ["Dcaron", [270]],
      ["dcaron", [271]],
      ["Dcy", [1044]],
      ["dcy", [1076]],
      ["ddagger", [8225]],
      ["ddarr", [8650]],
      ["DD", [8517]],
      ["dd", [8518]],
      ["DDotrahd", [10513]],
      ["ddotseq", [10871]],
      ["deg", [176]],
      ["Del", [8711]],
      ["Delta", [916]],
      ["delta", [948]],
      ["demptyv", [10673]],
      ["dfisht", [10623]],
      ["Dfr", [120071]],
      ["dfr", [120097]],
      ["dHar", [10597]],
      ["dharl", [8643]],
      ["dharr", [8642]],
      ["DiacriticalAcute", [180]],
      ["DiacriticalDot", [729]],
      ["DiacriticalDoubleAcute", [733]],
      ["DiacriticalGrave", [96]],
      ["DiacriticalTilde", [732]],
      ["diam", [8900]],
      ["diamond", [8900]],
      ["Diamond", [8900]],
      ["diamondsuit", [9830]],
      ["diams", [9830]],
      ["die", [168]],
      ["DifferentialD", [8518]],
      ["digamma", [989]],
      ["disin", [8946]],
      ["div", [247]],
      ["divide", [247]],
      ["divideontimes", [8903]],
      ["divonx", [8903]],
      ["DJcy", [1026]],
      ["djcy", [1106]],
      ["dlcorn", [8990]],
      ["dlcrop", [8973]],
      ["dollar", [36]],
      ["Dopf", [120123]],
      ["dopf", [120149]],
      ["Dot", [168]],
      ["dot", [729]],
      ["DotDot", [8412]],
      ["doteq", [8784]],
      ["doteqdot", [8785]],
      ["DotEqual", [8784]],
      ["dotminus", [8760]],
      ["dotplus", [8724]],
      ["dotsquare", [8865]],
      ["doublebarwedge", [8966]],
      ["DoubleContourIntegral", [8751]],
      ["DoubleDot", [168]],
      ["DoubleDownArrow", [8659]],
      ["DoubleLeftArrow", [8656]],
      ["DoubleLeftRightArrow", [8660]],
      ["DoubleLeftTee", [10980]],
      ["DoubleLongLeftArrow", [10232]],
      ["DoubleLongLeftRightArrow", [10234]],
      ["DoubleLongRightArrow", [10233]],
      ["DoubleRightArrow", [8658]],
      ["DoubleRightTee", [8872]],
      ["DoubleUpArrow", [8657]],
      ["DoubleUpDownArrow", [8661]],
      ["DoubleVerticalBar", [8741]],
      ["DownArrowBar", [10515]],
      ["downarrow", [8595]],
      ["DownArrow", [8595]],
      ["Downarrow", [8659]],
      ["DownArrowUpArrow", [8693]],
      ["DownBreve", [785]],
      ["downdownarrows", [8650]],
      ["downharpoonleft", [8643]],
      ["downharpoonright", [8642]],
      ["DownLeftRightVector", [10576]],
      ["DownLeftTeeVector", [10590]],
      ["DownLeftVectorBar", [10582]],
      ["DownLeftVector", [8637]],
      ["DownRightTeeVector", [10591]],
      ["DownRightVectorBar", [10583]],
      ["DownRightVector", [8641]],
      ["DownTeeArrow", [8615]],
      ["DownTee", [8868]],
      ["drbkarow", [10512]],
      ["drcorn", [8991]],
      ["drcrop", [8972]],
      ["Dscr", [119967]],
      ["dscr", [119993]],
      ["DScy", [1029]],
      ["dscy", [1109]],
      ["dsol", [10742]],
      ["Dstrok", [272]],
      ["dstrok", [273]],
      ["dtdot", [8945]],
      ["dtri", [9663]],
      ["dtrif", [9662]],
      ["duarr", [8693]],
      ["duhar", [10607]],
      ["dwangle", [10662]],
      ["DZcy", [1039]],
      ["dzcy", [1119]],
      ["dzigrarr", [10239]],
      ["Eacute", [201]],
      ["eacute", [233]],
      ["easter", [10862]],
      ["Ecaron", [282]],
      ["ecaron", [283]],
      ["Ecirc", [202]],
      ["ecirc", [234]],
      ["ecir", [8790]],
      ["ecolon", [8789]],
      ["Ecy", [1069]],
      ["ecy", [1101]],
      ["eDDot", [10871]],
      ["Edot", [278]],
      ["edot", [279]],
      ["eDot", [8785]],
      ["ee", [8519]],
      ["efDot", [8786]],
      ["Efr", [120072]],
      ["efr", [120098]],
      ["eg", [10906]],
      ["Egrave", [200]],
      ["egrave", [232]],
      ["egs", [10902]],
      ["egsdot", [10904]],
      ["el", [10905]],
      ["Element", [8712]],
      ["elinters", [9191]],
      ["ell", [8467]],
      ["els", [10901]],
      ["elsdot", [10903]],
      ["Emacr", [274]],
      ["emacr", [275]],
      ["empty", [8709]],
      ["emptyset", [8709]],
      ["EmptySmallSquare", [9723]],
      ["emptyv", [8709]],
      ["EmptyVerySmallSquare", [9643]],
      ["emsp13", [8196]],
      ["emsp14", [8197]],
      ["emsp", [8195]],
      ["ENG", [330]],
      ["eng", [331]],
      ["ensp", [8194]],
      ["Eogon", [280]],
      ["eogon", [281]],
      ["Eopf", [120124]],
      ["eopf", [120150]],
      ["epar", [8917]],
      ["eparsl", [10723]],
      ["eplus", [10865]],
      ["epsi", [949]],
      ["Epsilon", [917]],
      ["epsilon", [949]],
      ["epsiv", [1013]],
      ["eqcirc", [8790]],
      ["eqcolon", [8789]],
      ["eqsim", [8770]],
      ["eqslantgtr", [10902]],
      ["eqslantless", [10901]],
      ["Equal", [10869]],
      ["equals", [61]],
      ["EqualTilde", [8770]],
      ["equest", [8799]],
      ["Equilibrium", [8652]],
      ["equiv", [8801]],
      ["equivDD", [10872]],
      ["eqvparsl", [10725]],
      ["erarr", [10609]],
      ["erDot", [8787]],
      ["escr", [8495]],
      ["Escr", [8496]],
      ["esdot", [8784]],
      ["Esim", [10867]],
      ["esim", [8770]],
      ["Eta", [919]],
      ["eta", [951]],
      ["ETH", [208]],
      ["eth", [240]],
      ["Euml", [203]],
      ["euml", [235]],
      ["euro", [8364]],
      ["excl", [33]],
      ["exist", [8707]],
      ["Exists", [8707]],
      ["expectation", [8496]],
      ["exponentiale", [8519]],
      ["ExponentialE", [8519]],
      ["fallingdotseq", [8786]],
      ["Fcy", [1060]],
      ["fcy", [1092]],
      ["female", [9792]],
      ["ffilig", [64259]],
      ["fflig", [64256]],
      ["ffllig", [64260]],
      ["Ffr", [120073]],
      ["ffr", [120099]],
      ["filig", [64257]],
      ["FilledSmallSquare", [9724]],
      ["FilledVerySmallSquare", [9642]],
      ["fjlig", [102, 106]],
      ["flat", [9837]],
      ["fllig", [64258]],
      ["fltns", [9649]],
      ["fnof", [402]],
      ["Fopf", [120125]],
      ["fopf", [120151]],
      ["forall", [8704]],
      ["ForAll", [8704]],
      ["fork", [8916]],
      ["forkv", [10969]],
      ["Fouriertrf", [8497]],
      ["fpartint", [10765]],
      ["frac12", [189]],
      ["frac13", [8531]],
      ["frac14", [188]],
      ["frac15", [8533]],
      ["frac16", [8537]],
      ["frac18", [8539]],
      ["frac23", [8532]],
      ["frac25", [8534]],
      ["frac34", [190]],
      ["frac35", [8535]],
      ["frac38", [8540]],
      ["frac45", [8536]],
      ["frac56", [8538]],
      ["frac58", [8541]],
      ["frac78", [8542]],
      ["frasl", [8260]],
      ["frown", [8994]],
      ["fscr", [119995]],
      ["Fscr", [8497]],
      ["gacute", [501]],
      ["Gamma", [915]],
      ["gamma", [947]],
      ["Gammad", [988]],
      ["gammad", [989]],
      ["gap", [10886]],
      ["Gbreve", [286]],
      ["gbreve", [287]],
      ["Gcedil", [290]],
      ["Gcirc", [284]],
      ["gcirc", [285]],
      ["Gcy", [1043]],
      ["gcy", [1075]],
      ["Gdot", [288]],
      ["gdot", [289]],
      ["ge", [8805]],
      ["gE", [8807]],
      ["gEl", [10892]],
      ["gel", [8923]],
      ["geq", [8805]],
      ["geqq", [8807]],
      ["geqslant", [10878]],
      ["gescc", [10921]],
      ["ges", [10878]],
      ["gesdot", [10880]],
      ["gesdoto", [10882]],
      ["gesdotol", [10884]],
      ["gesl", [8923, 65024]],
      ["gesles", [10900]],
      ["Gfr", [120074]],
      ["gfr", [120100]],
      ["gg", [8811]],
      ["Gg", [8921]],
      ["ggg", [8921]],
      ["gimel", [8503]],
      ["GJcy", [1027]],
      ["gjcy", [1107]],
      ["gla", [10917]],
      ["gl", [8823]],
      ["glE", [10898]],
      ["glj", [10916]],
      ["gnap", [10890]],
      ["gnapprox", [10890]],
      ["gne", [10888]],
      ["gnE", [8809]],
      ["gneq", [10888]],
      ["gneqq", [8809]],
      ["gnsim", [8935]],
      ["Gopf", [120126]],
      ["gopf", [120152]],
      ["grave", [96]],
      ["GreaterEqual", [8805]],
      ["GreaterEqualLess", [8923]],
      ["GreaterFullEqual", [8807]],
      ["GreaterGreater", [10914]],
      ["GreaterLess", [8823]],
      ["GreaterSlantEqual", [10878]],
      ["GreaterTilde", [8819]],
      ["Gscr", [119970]],
      ["gscr", [8458]],
      ["gsim", [8819]],
      ["gsime", [10894]],
      ["gsiml", [10896]],
      ["gtcc", [10919]],
      ["gtcir", [10874]],
      ["gt", [62]],
      ["GT", [62]],
      ["Gt", [8811]],
      ["gtdot", [8919]],
      ["gtlPar", [10645]],
      ["gtquest", [10876]],
      ["gtrapprox", [10886]],
      ["gtrarr", [10616]],
      ["gtrdot", [8919]],
      ["gtreqless", [8923]],
      ["gtreqqless", [10892]],
      ["gtrless", [8823]],
      ["gtrsim", [8819]],
      ["gvertneqq", [8809, 65024]],
      ["gvnE", [8809, 65024]],
      ["Hacek", [711]],
      ["hairsp", [8202]],
      ["half", [189]],
      ["hamilt", [8459]],
      ["HARDcy", [1066]],
      ["hardcy", [1098]],
      ["harrcir", [10568]],
      ["harr", [8596]],
      ["hArr", [8660]],
      ["harrw", [8621]],
      ["Hat", [94]],
      ["hbar", [8463]],
      ["Hcirc", [292]],
      ["hcirc", [293]],
      ["hearts", [9829]],
      ["heartsuit", [9829]],
      ["hellip", [8230]],
      ["hercon", [8889]],
      ["hfr", [120101]],
      ["Hfr", [8460]],
      ["HilbertSpace", [8459]],
      ["hksearow", [10533]],
      ["hkswarow", [10534]],
      ["hoarr", [8703]],
      ["homtht", [8763]],
      ["hookleftarrow", [8617]],
      ["hookrightarrow", [8618]],
      ["hopf", [120153]],
      ["Hopf", [8461]],
      ["horbar", [8213]],
      ["HorizontalLine", [9472]],
      ["hscr", [119997]],
      ["Hscr", [8459]],
      ["hslash", [8463]],
      ["Hstrok", [294]],
      ["hstrok", [295]],
      ["HumpDownHump", [8782]],
      ["HumpEqual", [8783]],
      ["hybull", [8259]],
      ["hyphen", [8208]],
      ["Iacute", [205]],
      ["iacute", [237]],
      ["ic", [8291]],
      ["Icirc", [206]],
      ["icirc", [238]],
      ["Icy", [1048]],
      ["icy", [1080]],
      ["Idot", [304]],
      ["IEcy", [1045]],
      ["iecy", [1077]],
      ["iexcl", [161]],
      ["iff", [8660]],
      ["ifr", [120102]],
      ["Ifr", [8465]],
      ["Igrave", [204]],
      ["igrave", [236]],
      ["ii", [8520]],
      ["iiiint", [10764]],
      ["iiint", [8749]],
      ["iinfin", [10716]],
      ["iiota", [8489]],
      ["IJlig", [306]],
      ["ijlig", [307]],
      ["Imacr", [298]],
      ["imacr", [299]],
      ["image", [8465]],
      ["ImaginaryI", [8520]],
      ["imagline", [8464]],
      ["imagpart", [8465]],
      ["imath", [305]],
      ["Im", [8465]],
      ["imof", [8887]],
      ["imped", [437]],
      ["Implies", [8658]],
      ["incare", [8453]],
      ["in", [8712]],
      ["infin", [8734]],
      ["infintie", [10717]],
      ["inodot", [305]],
      ["intcal", [8890]],
      ["int", [8747]],
      ["Int", [8748]],
      ["integers", [8484]],
      ["Integral", [8747]],
      ["intercal", [8890]],
      ["Intersection", [8898]],
      ["intlarhk", [10775]],
      ["intprod", [10812]],
      ["InvisibleComma", [8291]],
      ["InvisibleTimes", [8290]],
      ["IOcy", [1025]],
      ["iocy", [1105]],
      ["Iogon", [302]],
      ["iogon", [303]],
      ["Iopf", [120128]],
      ["iopf", [120154]],
      ["Iota", [921]],
      ["iota", [953]],
      ["iprod", [10812]],
      ["iquest", [191]],
      ["iscr", [119998]],
      ["Iscr", [8464]],
      ["isin", [8712]],
      ["isindot", [8949]],
      ["isinE", [8953]],
      ["isins", [8948]],
      ["isinsv", [8947]],
      ["isinv", [8712]],
      ["it", [8290]],
      ["Itilde", [296]],
      ["itilde", [297]],
      ["Iukcy", [1030]],
      ["iukcy", [1110]],
      ["Iuml", [207]],
      ["iuml", [239]],
      ["Jcirc", [308]],
      ["jcirc", [309]],
      ["Jcy", [1049]],
      ["jcy", [1081]],
      ["Jfr", [120077]],
      ["jfr", [120103]],
      ["jmath", [567]],
      ["Jopf", [120129]],
      ["jopf", [120155]],
      ["Jscr", [119973]],
      ["jscr", [119999]],
      ["Jsercy", [1032]],
      ["jsercy", [1112]],
      ["Jukcy", [1028]],
      ["jukcy", [1108]],
      ["Kappa", [922]],
      ["kappa", [954]],
      ["kappav", [1008]],
      ["Kcedil", [310]],
      ["kcedil", [311]],
      ["Kcy", [1050]],
      ["kcy", [1082]],
      ["Kfr", [120078]],
      ["kfr", [120104]],
      ["kgreen", [312]],
      ["KHcy", [1061]],
      ["khcy", [1093]],
      ["KJcy", [1036]],
      ["kjcy", [1116]],
      ["Kopf", [120130]],
      ["kopf", [120156]],
      ["Kscr", [119974]],
      ["kscr", [12e4]],
      ["lAarr", [8666]],
      ["Lacute", [313]],
      ["lacute", [314]],
      ["laemptyv", [10676]],
      ["lagran", [8466]],
      ["Lambda", [923]],
      ["lambda", [955]],
      ["lang", [10216]],
      ["Lang", [10218]],
      ["langd", [10641]],
      ["langle", [10216]],
      ["lap", [10885]],
      ["Laplacetrf", [8466]],
      ["laquo", [171]],
      ["larrb", [8676]],
      ["larrbfs", [10527]],
      ["larr", [8592]],
      ["Larr", [8606]],
      ["lArr", [8656]],
      ["larrfs", [10525]],
      ["larrhk", [8617]],
      ["larrlp", [8619]],
      ["larrpl", [10553]],
      ["larrsim", [10611]],
      ["larrtl", [8610]],
      ["latail", [10521]],
      ["lAtail", [10523]],
      ["lat", [10923]],
      ["late", [10925]],
      ["lates", [10925, 65024]],
      ["lbarr", [10508]],
      ["lBarr", [10510]],
      ["lbbrk", [10098]],
      ["lbrace", [123]],
      ["lbrack", [91]],
      ["lbrke", [10635]],
      ["lbrksld", [10639]],
      ["lbrkslu", [10637]],
      ["Lcaron", [317]],
      ["lcaron", [318]],
      ["Lcedil", [315]],
      ["lcedil", [316]],
      ["lceil", [8968]],
      ["lcub", [123]],
      ["Lcy", [1051]],
      ["lcy", [1083]],
      ["ldca", [10550]],
      ["ldquo", [8220]],
      ["ldquor", [8222]],
      ["ldrdhar", [10599]],
      ["ldrushar", [10571]],
      ["ldsh", [8626]],
      ["le", [8804]],
      ["lE", [8806]],
      ["LeftAngleBracket", [10216]],
      ["LeftArrowBar", [8676]],
      ["leftarrow", [8592]],
      ["LeftArrow", [8592]],
      ["Leftarrow", [8656]],
      ["LeftArrowRightArrow", [8646]],
      ["leftarrowtail", [8610]],
      ["LeftCeiling", [8968]],
      ["LeftDoubleBracket", [10214]],
      ["LeftDownTeeVector", [10593]],
      ["LeftDownVectorBar", [10585]],
      ["LeftDownVector", [8643]],
      ["LeftFloor", [8970]],
      ["leftharpoondown", [8637]],
      ["leftharpoonup", [8636]],
      ["leftleftarrows", [8647]],
      ["leftrightarrow", [8596]],
      ["LeftRightArrow", [8596]],
      ["Leftrightarrow", [8660]],
      ["leftrightarrows", [8646]],
      ["leftrightharpoons", [8651]],
      ["leftrightsquigarrow", [8621]],
      ["LeftRightVector", [10574]],
      ["LeftTeeArrow", [8612]],
      ["LeftTee", [8867]],
      ["LeftTeeVector", [10586]],
      ["leftthreetimes", [8907]],
      ["LeftTriangleBar", [10703]],
      ["LeftTriangle", [8882]],
      ["LeftTriangleEqual", [8884]],
      ["LeftUpDownVector", [10577]],
      ["LeftUpTeeVector", [10592]],
      ["LeftUpVectorBar", [10584]],
      ["LeftUpVector", [8639]],
      ["LeftVectorBar", [10578]],
      ["LeftVector", [8636]],
      ["lEg", [10891]],
      ["leg", [8922]],
      ["leq", [8804]],
      ["leqq", [8806]],
      ["leqslant", [10877]],
      ["lescc", [10920]],
      ["les", [10877]],
      ["lesdot", [10879]],
      ["lesdoto", [10881]],
      ["lesdotor", [10883]],
      ["lesg", [8922, 65024]],
      ["lesges", [10899]],
      ["lessapprox", [10885]],
      ["lessdot", [8918]],
      ["lesseqgtr", [8922]],
      ["lesseqqgtr", [10891]],
      ["LessEqualGreater", [8922]],
      ["LessFullEqual", [8806]],
      ["LessGreater", [8822]],
      ["lessgtr", [8822]],
      ["LessLess", [10913]],
      ["lesssim", [8818]],
      ["LessSlantEqual", [10877]],
      ["LessTilde", [8818]],
      ["lfisht", [10620]],
      ["lfloor", [8970]],
      ["Lfr", [120079]],
      ["lfr", [120105]],
      ["lg", [8822]],
      ["lgE", [10897]],
      ["lHar", [10594]],
      ["lhard", [8637]],
      ["lharu", [8636]],
      ["lharul", [10602]],
      ["lhblk", [9604]],
      ["LJcy", [1033]],
      ["ljcy", [1113]],
      ["llarr", [8647]],
      ["ll", [8810]],
      ["Ll", [8920]],
      ["llcorner", [8990]],
      ["Lleftarrow", [8666]],
      ["llhard", [10603]],
      ["lltri", [9722]],
      ["Lmidot", [319]],
      ["lmidot", [320]],
      ["lmoustache", [9136]],
      ["lmoust", [9136]],
      ["lnap", [10889]],
      ["lnapprox", [10889]],
      ["lne", [10887]],
      ["lnE", [8808]],
      ["lneq", [10887]],
      ["lneqq", [8808]],
      ["lnsim", [8934]],
      ["loang", [10220]],
      ["loarr", [8701]],
      ["lobrk", [10214]],
      ["longleftarrow", [10229]],
      ["LongLeftArrow", [10229]],
      ["Longleftarrow", [10232]],
      ["longleftrightarrow", [10231]],
      ["LongLeftRightArrow", [10231]],
      ["Longleftrightarrow", [10234]],
      ["longmapsto", [10236]],
      ["longrightarrow", [10230]],
      ["LongRightArrow", [10230]],
      ["Longrightarrow", [10233]],
      ["looparrowleft", [8619]],
      ["looparrowright", [8620]],
      ["lopar", [10629]],
      ["Lopf", [120131]],
      ["lopf", [120157]],
      ["loplus", [10797]],
      ["lotimes", [10804]],
      ["lowast", [8727]],
      ["lowbar", [95]],
      ["LowerLeftArrow", [8601]],
      ["LowerRightArrow", [8600]],
      ["loz", [9674]],
      ["lozenge", [9674]],
      ["lozf", [10731]],
      ["lpar", [40]],
      ["lparlt", [10643]],
      ["lrarr", [8646]],
      ["lrcorner", [8991]],
      ["lrhar", [8651]],
      ["lrhard", [10605]],
      ["lrm", [8206]],
      ["lrtri", [8895]],
      ["lsaquo", [8249]],
      ["lscr", [120001]],
      ["Lscr", [8466]],
      ["lsh", [8624]],
      ["Lsh", [8624]],
      ["lsim", [8818]],
      ["lsime", [10893]],
      ["lsimg", [10895]],
      ["lsqb", [91]],
      ["lsquo", [8216]],
      ["lsquor", [8218]],
      ["Lstrok", [321]],
      ["lstrok", [322]],
      ["ltcc", [10918]],
      ["ltcir", [10873]],
      ["lt", [60]],
      ["LT", [60]],
      ["Lt", [8810]],
      ["ltdot", [8918]],
      ["lthree", [8907]],
      ["ltimes", [8905]],
      ["ltlarr", [10614]],
      ["ltquest", [10875]],
      ["ltri", [9667]],
      ["ltrie", [8884]],
      ["ltrif", [9666]],
      ["ltrPar", [10646]],
      ["lurdshar", [10570]],
      ["luruhar", [10598]],
      ["lvertneqq", [8808, 65024]],
      ["lvnE", [8808, 65024]],
      ["macr", [175]],
      ["male", [9794]],
      ["malt", [10016]],
      ["maltese", [10016]],
      ["Map", [10501]],
      ["map", [8614]],
      ["mapsto", [8614]],
      ["mapstodown", [8615]],
      ["mapstoleft", [8612]],
      ["mapstoup", [8613]],
      ["marker", [9646]],
      ["mcomma", [10793]],
      ["Mcy", [1052]],
      ["mcy", [1084]],
      ["mdash", [8212]],
      ["mDDot", [8762]],
      ["measuredangle", [8737]],
      ["MediumSpace", [8287]],
      ["Mellintrf", [8499]],
      ["Mfr", [120080]],
      ["mfr", [120106]],
      ["mho", [8487]],
      ["micro", [181]],
      ["midast", [42]],
      ["midcir", [10992]],
      ["mid", [8739]],
      ["middot", [183]],
      ["minusb", [8863]],
      ["minus", [8722]],
      ["minusd", [8760]],
      ["minusdu", [10794]],
      ["MinusPlus", [8723]],
      ["mlcp", [10971]],
      ["mldr", [8230]],
      ["mnplus", [8723]],
      ["models", [8871]],
      ["Mopf", [120132]],
      ["mopf", [120158]],
      ["mp", [8723]],
      ["mscr", [120002]],
      ["Mscr", [8499]],
      ["mstpos", [8766]],
      ["Mu", [924]],
      ["mu", [956]],
      ["multimap", [8888]],
      ["mumap", [8888]],
      ["nabla", [8711]],
      ["Nacute", [323]],
      ["nacute", [324]],
      ["nang", [8736, 8402]],
      ["nap", [8777]],
      ["napE", [10864, 824]],
      ["napid", [8779, 824]],
      ["napos", [329]],
      ["napprox", [8777]],
      ["natural", [9838]],
      ["naturals", [8469]],
      ["natur", [9838]],
      ["nbsp", [160]],
      ["nbump", [8782, 824]],
      ["nbumpe", [8783, 824]],
      ["ncap", [10819]],
      ["Ncaron", [327]],
      ["ncaron", [328]],
      ["Ncedil", [325]],
      ["ncedil", [326]],
      ["ncong", [8775]],
      ["ncongdot", [10861, 824]],
      ["ncup", [10818]],
      ["Ncy", [1053]],
      ["ncy", [1085]],
      ["ndash", [8211]],
      ["nearhk", [10532]],
      ["nearr", [8599]],
      ["neArr", [8663]],
      ["nearrow", [8599]],
      ["ne", [8800]],
      ["nedot", [8784, 824]],
      ["NegativeMediumSpace", [8203]],
      ["NegativeThickSpace", [8203]],
      ["NegativeThinSpace", [8203]],
      ["NegativeVeryThinSpace", [8203]],
      ["nequiv", [8802]],
      ["nesear", [10536]],
      ["nesim", [8770, 824]],
      ["NestedGreaterGreater", [8811]],
      ["NestedLessLess", [8810]],
      ["nexist", [8708]],
      ["nexists", [8708]],
      ["Nfr", [120081]],
      ["nfr", [120107]],
      ["ngE", [8807, 824]],
      ["nge", [8817]],
      ["ngeq", [8817]],
      ["ngeqq", [8807, 824]],
      ["ngeqslant", [10878, 824]],
      ["nges", [10878, 824]],
      ["nGg", [8921, 824]],
      ["ngsim", [8821]],
      ["nGt", [8811, 8402]],
      ["ngt", [8815]],
      ["ngtr", [8815]],
      ["nGtv", [8811, 824]],
      ["nharr", [8622]],
      ["nhArr", [8654]],
      ["nhpar", [10994]],
      ["ni", [8715]],
      ["nis", [8956]],
      ["nisd", [8954]],
      ["niv", [8715]],
      ["NJcy", [1034]],
      ["njcy", [1114]],
      ["nlarr", [8602]],
      ["nlArr", [8653]],
      ["nldr", [8229]],
      ["nlE", [8806, 824]],
      ["nle", [8816]],
      ["nleftarrow", [8602]],
      ["nLeftarrow", [8653]],
      ["nleftrightarrow", [8622]],
      ["nLeftrightarrow", [8654]],
      ["nleq", [8816]],
      ["nleqq", [8806, 824]],
      ["nleqslant", [10877, 824]],
      ["nles", [10877, 824]],
      ["nless", [8814]],
      ["nLl", [8920, 824]],
      ["nlsim", [8820]],
      ["nLt", [8810, 8402]],
      ["nlt", [8814]],
      ["nltri", [8938]],
      ["nltrie", [8940]],
      ["nLtv", [8810, 824]],
      ["nmid", [8740]],
      ["NoBreak", [8288]],
      ["NonBreakingSpace", [160]],
      ["nopf", [120159]],
      ["Nopf", [8469]],
      ["Not", [10988]],
      ["not", [172]],
      ["NotCongruent", [8802]],
      ["NotCupCap", [8813]],
      ["NotDoubleVerticalBar", [8742]],
      ["NotElement", [8713]],
      ["NotEqual", [8800]],
      ["NotEqualTilde", [8770, 824]],
      ["NotExists", [8708]],
      ["NotGreater", [8815]],
      ["NotGreaterEqual", [8817]],
      ["NotGreaterFullEqual", [8807, 824]],
      ["NotGreaterGreater", [8811, 824]],
      ["NotGreaterLess", [8825]],
      ["NotGreaterSlantEqual", [10878, 824]],
      ["NotGreaterTilde", [8821]],
      ["NotHumpDownHump", [8782, 824]],
      ["NotHumpEqual", [8783, 824]],
      ["notin", [8713]],
      ["notindot", [8949, 824]],
      ["notinE", [8953, 824]],
      ["notinva", [8713]],
      ["notinvb", [8951]],
      ["notinvc", [8950]],
      ["NotLeftTriangleBar", [10703, 824]],
      ["NotLeftTriangle", [8938]],
      ["NotLeftTriangleEqual", [8940]],
      ["NotLess", [8814]],
      ["NotLessEqual", [8816]],
      ["NotLessGreater", [8824]],
      ["NotLessLess", [8810, 824]],
      ["NotLessSlantEqual", [10877, 824]],
      ["NotLessTilde", [8820]],
      ["NotNestedGreaterGreater", [10914, 824]],
      ["NotNestedLessLess", [10913, 824]],
      ["notni", [8716]],
      ["notniva", [8716]],
      ["notnivb", [8958]],
      ["notnivc", [8957]],
      ["NotPrecedes", [8832]],
      ["NotPrecedesEqual", [10927, 824]],
      ["NotPrecedesSlantEqual", [8928]],
      ["NotReverseElement", [8716]],
      ["NotRightTriangleBar", [10704, 824]],
      ["NotRightTriangle", [8939]],
      ["NotRightTriangleEqual", [8941]],
      ["NotSquareSubset", [8847, 824]],
      ["NotSquareSubsetEqual", [8930]],
      ["NotSquareSuperset", [8848, 824]],
      ["NotSquareSupersetEqual", [8931]],
      ["NotSubset", [8834, 8402]],
      ["NotSubsetEqual", [8840]],
      ["NotSucceeds", [8833]],
      ["NotSucceedsEqual", [10928, 824]],
      ["NotSucceedsSlantEqual", [8929]],
      ["NotSucceedsTilde", [8831, 824]],
      ["NotSuperset", [8835, 8402]],
      ["NotSupersetEqual", [8841]],
      ["NotTilde", [8769]],
      ["NotTildeEqual", [8772]],
      ["NotTildeFullEqual", [8775]],
      ["NotTildeTilde", [8777]],
      ["NotVerticalBar", [8740]],
      ["nparallel", [8742]],
      ["npar", [8742]],
      ["nparsl", [11005, 8421]],
      ["npart", [8706, 824]],
      ["npolint", [10772]],
      ["npr", [8832]],
      ["nprcue", [8928]],
      ["nprec", [8832]],
      ["npreceq", [10927, 824]],
      ["npre", [10927, 824]],
      ["nrarrc", [10547, 824]],
      ["nrarr", [8603]],
      ["nrArr", [8655]],
      ["nrarrw", [8605, 824]],
      ["nrightarrow", [8603]],
      ["nRightarrow", [8655]],
      ["nrtri", [8939]],
      ["nrtrie", [8941]],
      ["nsc", [8833]],
      ["nsccue", [8929]],
      ["nsce", [10928, 824]],
      ["Nscr", [119977]],
      ["nscr", [120003]],
      ["nshortmid", [8740]],
      ["nshortparallel", [8742]],
      ["nsim", [8769]],
      ["nsime", [8772]],
      ["nsimeq", [8772]],
      ["nsmid", [8740]],
      ["nspar", [8742]],
      ["nsqsube", [8930]],
      ["nsqsupe", [8931]],
      ["nsub", [8836]],
      ["nsubE", [10949, 824]],
      ["nsube", [8840]],
      ["nsubset", [8834, 8402]],
      ["nsubseteq", [8840]],
      ["nsubseteqq", [10949, 824]],
      ["nsucc", [8833]],
      ["nsucceq", [10928, 824]],
      ["nsup", [8837]],
      ["nsupE", [10950, 824]],
      ["nsupe", [8841]],
      ["nsupset", [8835, 8402]],
      ["nsupseteq", [8841]],
      ["nsupseteqq", [10950, 824]],
      ["ntgl", [8825]],
      ["Ntilde", [209]],
      ["ntilde", [241]],
      ["ntlg", [8824]],
      ["ntriangleleft", [8938]],
      ["ntrianglelefteq", [8940]],
      ["ntriangleright", [8939]],
      ["ntrianglerighteq", [8941]],
      ["Nu", [925]],
      ["nu", [957]],
      ["num", [35]],
      ["numero", [8470]],
      ["numsp", [8199]],
      ["nvap", [8781, 8402]],
      ["nvdash", [8876]],
      ["nvDash", [8877]],
      ["nVdash", [8878]],
      ["nVDash", [8879]],
      ["nvge", [8805, 8402]],
      ["nvgt", [62, 8402]],
      ["nvHarr", [10500]],
      ["nvinfin", [10718]],
      ["nvlArr", [10498]],
      ["nvle", [8804, 8402]],
      ["nvlt", [60, 8402]],
      ["nvltrie", [8884, 8402]],
      ["nvrArr", [10499]],
      ["nvrtrie", [8885, 8402]],
      ["nvsim", [8764, 8402]],
      ["nwarhk", [10531]],
      ["nwarr", [8598]],
      ["nwArr", [8662]],
      ["nwarrow", [8598]],
      ["nwnear", [10535]],
      ["Oacute", [211]],
      ["oacute", [243]],
      ["oast", [8859]],
      ["Ocirc", [212]],
      ["ocirc", [244]],
      ["ocir", [8858]],
      ["Ocy", [1054]],
      ["ocy", [1086]],
      ["odash", [8861]],
      ["Odblac", [336]],
      ["odblac", [337]],
      ["odiv", [10808]],
      ["odot", [8857]],
      ["odsold", [10684]],
      ["OElig", [338]],
      ["oelig", [339]],
      ["ofcir", [10687]],
      ["Ofr", [120082]],
      ["ofr", [120108]],
      ["ogon", [731]],
      ["Ograve", [210]],
      ["ograve", [242]],
      ["ogt", [10689]],
      ["ohbar", [10677]],
      ["ohm", [937]],
      ["oint", [8750]],
      ["olarr", [8634]],
      ["olcir", [10686]],
      ["olcross", [10683]],
      ["oline", [8254]],
      ["olt", [10688]],
      ["Omacr", [332]],
      ["omacr", [333]],
      ["Omega", [937]],
      ["omega", [969]],
      ["Omicron", [927]],
      ["omicron", [959]],
      ["omid", [10678]],
      ["ominus", [8854]],
      ["Oopf", [120134]],
      ["oopf", [120160]],
      ["opar", [10679]],
      ["OpenCurlyDoubleQuote", [8220]],
      ["OpenCurlyQuote", [8216]],
      ["operp", [10681]],
      ["oplus", [8853]],
      ["orarr", [8635]],
      ["Or", [10836]],
      ["or", [8744]],
      ["ord", [10845]],
      ["order", [8500]],
      ["orderof", [8500]],
      ["ordf", [170]],
      ["ordm", [186]],
      ["origof", [8886]],
      ["oror", [10838]],
      ["orslope", [10839]],
      ["orv", [10843]],
      ["oS", [9416]],
      ["Oscr", [119978]],
      ["oscr", [8500]],
      ["Oslash", [216]],
      ["oslash", [248]],
      ["osol", [8856]],
      ["Otilde", [213]],
      ["otilde", [245]],
      ["otimesas", [10806]],
      ["Otimes", [10807]],
      ["otimes", [8855]],
      ["Ouml", [214]],
      ["ouml", [246]],
      ["ovbar", [9021]],
      ["OverBar", [8254]],
      ["OverBrace", [9182]],
      ["OverBracket", [9140]],
      ["OverParenthesis", [9180]],
      ["para", [182]],
      ["parallel", [8741]],
      ["par", [8741]],
      ["parsim", [10995]],
      ["parsl", [11005]],
      ["part", [8706]],
      ["PartialD", [8706]],
      ["Pcy", [1055]],
      ["pcy", [1087]],
      ["percnt", [37]],
      ["period", [46]],
      ["permil", [8240]],
      ["perp", [8869]],
      ["pertenk", [8241]],
      ["Pfr", [120083]],
      ["pfr", [120109]],
      ["Phi", [934]],
      ["phi", [966]],
      ["phiv", [981]],
      ["phmmat", [8499]],
      ["phone", [9742]],
      ["Pi", [928]],
      ["pi", [960]],
      ["pitchfork", [8916]],
      ["piv", [982]],
      ["planck", [8463]],
      ["planckh", [8462]],
      ["plankv", [8463]],
      ["plusacir", [10787]],
      ["plusb", [8862]],
      ["pluscir", [10786]],
      ["plus", [43]],
      ["plusdo", [8724]],
      ["plusdu", [10789]],
      ["pluse", [10866]],
      ["PlusMinus", [177]],
      ["plusmn", [177]],
      ["plussim", [10790]],
      ["plustwo", [10791]],
      ["pm", [177]],
      ["Poincareplane", [8460]],
      ["pointint", [10773]],
      ["popf", [120161]],
      ["Popf", [8473]],
      ["pound", [163]],
      ["prap", [10935]],
      ["Pr", [10939]],
      ["pr", [8826]],
      ["prcue", [8828]],
      ["precapprox", [10935]],
      ["prec", [8826]],
      ["preccurlyeq", [8828]],
      ["Precedes", [8826]],
      ["PrecedesEqual", [10927]],
      ["PrecedesSlantEqual", [8828]],
      ["PrecedesTilde", [8830]],
      ["preceq", [10927]],
      ["precnapprox", [10937]],
      ["precneqq", [10933]],
      ["precnsim", [8936]],
      ["pre", [10927]],
      ["prE", [10931]],
      ["precsim", [8830]],
      ["prime", [8242]],
      ["Prime", [8243]],
      ["primes", [8473]],
      ["prnap", [10937]],
      ["prnE", [10933]],
      ["prnsim", [8936]],
      ["prod", [8719]],
      ["Product", [8719]],
      ["profalar", [9006]],
      ["profline", [8978]],
      ["profsurf", [8979]],
      ["prop", [8733]],
      ["Proportional", [8733]],
      ["Proportion", [8759]],
      ["propto", [8733]],
      ["prsim", [8830]],
      ["prurel", [8880]],
      ["Pscr", [119979]],
      ["pscr", [120005]],
      ["Psi", [936]],
      ["psi", [968]],
      ["puncsp", [8200]],
      ["Qfr", [120084]],
      ["qfr", [120110]],
      ["qint", [10764]],
      ["qopf", [120162]],
      ["Qopf", [8474]],
      ["qprime", [8279]],
      ["Qscr", [119980]],
      ["qscr", [120006]],
      ["quaternions", [8461]],
      ["quatint", [10774]],
      ["quest", [63]],
      ["questeq", [8799]],
      ["quot", [34]],
      ["QUOT", [34]],
      ["rAarr", [8667]],
      ["race", [8765, 817]],
      ["Racute", [340]],
      ["racute", [341]],
      ["radic", [8730]],
      ["raemptyv", [10675]],
      ["rang", [10217]],
      ["Rang", [10219]],
      ["rangd", [10642]],
      ["range", [10661]],
      ["rangle", [10217]],
      ["raquo", [187]],
      ["rarrap", [10613]],
      ["rarrb", [8677]],
      ["rarrbfs", [10528]],
      ["rarrc", [10547]],
      ["rarr", [8594]],
      ["Rarr", [8608]],
      ["rArr", [8658]],
      ["rarrfs", [10526]],
      ["rarrhk", [8618]],
      ["rarrlp", [8620]],
      ["rarrpl", [10565]],
      ["rarrsim", [10612]],
      ["Rarrtl", [10518]],
      ["rarrtl", [8611]],
      ["rarrw", [8605]],
      ["ratail", [10522]],
      ["rAtail", [10524]],
      ["ratio", [8758]],
      ["rationals", [8474]],
      ["rbarr", [10509]],
      ["rBarr", [10511]],
      ["RBarr", [10512]],
      ["rbbrk", [10099]],
      ["rbrace", [125]],
      ["rbrack", [93]],
      ["rbrke", [10636]],
      ["rbrksld", [10638]],
      ["rbrkslu", [10640]],
      ["Rcaron", [344]],
      ["rcaron", [345]],
      ["Rcedil", [342]],
      ["rcedil", [343]],
      ["rceil", [8969]],
      ["rcub", [125]],
      ["Rcy", [1056]],
      ["rcy", [1088]],
      ["rdca", [10551]],
      ["rdldhar", [10601]],
      ["rdquo", [8221]],
      ["rdquor", [8221]],
      ["rdsh", [8627]],
      ["real", [8476]],
      ["realine", [8475]],
      ["realpart", [8476]],
      ["reals", [8477]],
      ["Re", [8476]],
      ["rect", [9645]],
      ["reg", [174]],
      ["REG", [174]],
      ["ReverseElement", [8715]],
      ["ReverseEquilibrium", [8651]],
      ["ReverseUpEquilibrium", [10607]],
      ["rfisht", [10621]],
      ["rfloor", [8971]],
      ["rfr", [120111]],
      ["Rfr", [8476]],
      ["rHar", [10596]],
      ["rhard", [8641]],
      ["rharu", [8640]],
      ["rharul", [10604]],
      ["Rho", [929]],
      ["rho", [961]],
      ["rhov", [1009]],
      ["RightAngleBracket", [10217]],
      ["RightArrowBar", [8677]],
      ["rightarrow", [8594]],
      ["RightArrow", [8594]],
      ["Rightarrow", [8658]],
      ["RightArrowLeftArrow", [8644]],
      ["rightarrowtail", [8611]],
      ["RightCeiling", [8969]],
      ["RightDoubleBracket", [10215]],
      ["RightDownTeeVector", [10589]],
      ["RightDownVectorBar", [10581]],
      ["RightDownVector", [8642]],
      ["RightFloor", [8971]],
      ["rightharpoondown", [8641]],
      ["rightharpoonup", [8640]],
      ["rightleftarrows", [8644]],
      ["rightleftharpoons", [8652]],
      ["rightrightarrows", [8649]],
      ["rightsquigarrow", [8605]],
      ["RightTeeArrow", [8614]],
      ["RightTee", [8866]],
      ["RightTeeVector", [10587]],
      ["rightthreetimes", [8908]],
      ["RightTriangleBar", [10704]],
      ["RightTriangle", [8883]],
      ["RightTriangleEqual", [8885]],
      ["RightUpDownVector", [10575]],
      ["RightUpTeeVector", [10588]],
      ["RightUpVectorBar", [10580]],
      ["RightUpVector", [8638]],
      ["RightVectorBar", [10579]],
      ["RightVector", [8640]],
      ["ring", [730]],
      ["risingdotseq", [8787]],
      ["rlarr", [8644]],
      ["rlhar", [8652]],
      ["rlm", [8207]],
      ["rmoustache", [9137]],
      ["rmoust", [9137]],
      ["rnmid", [10990]],
      ["roang", [10221]],
      ["roarr", [8702]],
      ["robrk", [10215]],
      ["ropar", [10630]],
      ["ropf", [120163]],
      ["Ropf", [8477]],
      ["roplus", [10798]],
      ["rotimes", [10805]],
      ["RoundImplies", [10608]],
      ["rpar", [41]],
      ["rpargt", [10644]],
      ["rppolint", [10770]],
      ["rrarr", [8649]],
      ["Rrightarrow", [8667]],
      ["rsaquo", [8250]],
      ["rscr", [120007]],
      ["Rscr", [8475]],
      ["rsh", [8625]],
      ["Rsh", [8625]],
      ["rsqb", [93]],
      ["rsquo", [8217]],
      ["rsquor", [8217]],
      ["rthree", [8908]],
      ["rtimes", [8906]],
      ["rtri", [9657]],
      ["rtrie", [8885]],
      ["rtrif", [9656]],
      ["rtriltri", [10702]],
      ["RuleDelayed", [10740]],
      ["ruluhar", [10600]],
      ["rx", [8478]],
      ["Sacute", [346]],
      ["sacute", [347]],
      ["sbquo", [8218]],
      ["scap", [10936]],
      ["Scaron", [352]],
      ["scaron", [353]],
      ["Sc", [10940]],
      ["sc", [8827]],
      ["sccue", [8829]],
      ["sce", [10928]],
      ["scE", [10932]],
      ["Scedil", [350]],
      ["scedil", [351]],
      ["Scirc", [348]],
      ["scirc", [349]],
      ["scnap", [10938]],
      ["scnE", [10934]],
      ["scnsim", [8937]],
      ["scpolint", [10771]],
      ["scsim", [8831]],
      ["Scy", [1057]],
      ["scy", [1089]],
      ["sdotb", [8865]],
      ["sdot", [8901]],
      ["sdote", [10854]],
      ["searhk", [10533]],
      ["searr", [8600]],
      ["seArr", [8664]],
      ["searrow", [8600]],
      ["sect", [167]],
      ["semi", [59]],
      ["seswar", [10537]],
      ["setminus", [8726]],
      ["setmn", [8726]],
      ["sext", [10038]],
      ["Sfr", [120086]],
      ["sfr", [120112]],
      ["sfrown", [8994]],
      ["sharp", [9839]],
      ["SHCHcy", [1065]],
      ["shchcy", [1097]],
      ["SHcy", [1064]],
      ["shcy", [1096]],
      ["ShortDownArrow", [8595]],
      ["ShortLeftArrow", [8592]],
      ["shortmid", [8739]],
      ["shortparallel", [8741]],
      ["ShortRightArrow", [8594]],
      ["ShortUpArrow", [8593]],
      ["shy", [173]],
      ["Sigma", [931]],
      ["sigma", [963]],
      ["sigmaf", [962]],
      ["sigmav", [962]],
      ["sim", [8764]],
      ["simdot", [10858]],
      ["sime", [8771]],
      ["simeq", [8771]],
      ["simg", [10910]],
      ["simgE", [10912]],
      ["siml", [10909]],
      ["simlE", [10911]],
      ["simne", [8774]],
      ["simplus", [10788]],
      ["simrarr", [10610]],
      ["slarr", [8592]],
      ["SmallCircle", [8728]],
      ["smallsetminus", [8726]],
      ["smashp", [10803]],
      ["smeparsl", [10724]],
      ["smid", [8739]],
      ["smile", [8995]],
      ["smt", [10922]],
      ["smte", [10924]],
      ["smtes", [10924, 65024]],
      ["SOFTcy", [1068]],
      ["softcy", [1100]],
      ["solbar", [9023]],
      ["solb", [10692]],
      ["sol", [47]],
      ["Sopf", [120138]],
      ["sopf", [120164]],
      ["spades", [9824]],
      ["spadesuit", [9824]],
      ["spar", [8741]],
      ["sqcap", [8851]],
      ["sqcaps", [8851, 65024]],
      ["sqcup", [8852]],
      ["sqcups", [8852, 65024]],
      ["Sqrt", [8730]],
      ["sqsub", [8847]],
      ["sqsube", [8849]],
      ["sqsubset", [8847]],
      ["sqsubseteq", [8849]],
      ["sqsup", [8848]],
      ["sqsupe", [8850]],
      ["sqsupset", [8848]],
      ["sqsupseteq", [8850]],
      ["square", [9633]],
      ["Square", [9633]],
      ["SquareIntersection", [8851]],
      ["SquareSubset", [8847]],
      ["SquareSubsetEqual", [8849]],
      ["SquareSuperset", [8848]],
      ["SquareSupersetEqual", [8850]],
      ["SquareUnion", [8852]],
      ["squarf", [9642]],
      ["squ", [9633]],
      ["squf", [9642]],
      ["srarr", [8594]],
      ["Sscr", [119982]],
      ["sscr", [120008]],
      ["ssetmn", [8726]],
      ["ssmile", [8995]],
      ["sstarf", [8902]],
      ["Star", [8902]],
      ["star", [9734]],
      ["starf", [9733]],
      ["straightepsilon", [1013]],
      ["straightphi", [981]],
      ["strns", [175]],
      ["sub", [8834]],
      ["Sub", [8912]],
      ["subdot", [10941]],
      ["subE", [10949]],
      ["sube", [8838]],
      ["subedot", [10947]],
      ["submult", [10945]],
      ["subnE", [10955]],
      ["subne", [8842]],
      ["subplus", [10943]],
      ["subrarr", [10617]],
      ["subset", [8834]],
      ["Subset", [8912]],
      ["subseteq", [8838]],
      ["subseteqq", [10949]],
      ["SubsetEqual", [8838]],
      ["subsetneq", [8842]],
      ["subsetneqq", [10955]],
      ["subsim", [10951]],
      ["subsub", [10965]],
      ["subsup", [10963]],
      ["succapprox", [10936]],
      ["succ", [8827]],
      ["succcurlyeq", [8829]],
      ["Succeeds", [8827]],
      ["SucceedsEqual", [10928]],
      ["SucceedsSlantEqual", [8829]],
      ["SucceedsTilde", [8831]],
      ["succeq", [10928]],
      ["succnapprox", [10938]],
      ["succneqq", [10934]],
      ["succnsim", [8937]],
      ["succsim", [8831]],
      ["SuchThat", [8715]],
      ["sum", [8721]],
      ["Sum", [8721]],
      ["sung", [9834]],
      ["sup1", [185]],
      ["sup2", [178]],
      ["sup3", [179]],
      ["sup", [8835]],
      ["Sup", [8913]],
      ["supdot", [10942]],
      ["supdsub", [10968]],
      ["supE", [10950]],
      ["supe", [8839]],
      ["supedot", [10948]],
      ["Superset", [8835]],
      ["SupersetEqual", [8839]],
      ["suphsol", [10185]],
      ["suphsub", [10967]],
      ["suplarr", [10619]],
      ["supmult", [10946]],
      ["supnE", [10956]],
      ["supne", [8843]],
      ["supplus", [10944]],
      ["supset", [8835]],
      ["Supset", [8913]],
      ["supseteq", [8839]],
      ["supseteqq", [10950]],
      ["supsetneq", [8843]],
      ["supsetneqq", [10956]],
      ["supsim", [10952]],
      ["supsub", [10964]],
      ["supsup", [10966]],
      ["swarhk", [10534]],
      ["swarr", [8601]],
      ["swArr", [8665]],
      ["swarrow", [8601]],
      ["swnwar", [10538]],
      ["szlig", [223]],
      ["Tab", [9]],
      ["target", [8982]],
      ["Tau", [932]],
      ["tau", [964]],
      ["tbrk", [9140]],
      ["Tcaron", [356]],
      ["tcaron", [357]],
      ["Tcedil", [354]],
      ["tcedil", [355]],
      ["Tcy", [1058]],
      ["tcy", [1090]],
      ["tdot", [8411]],
      ["telrec", [8981]],
      ["Tfr", [120087]],
      ["tfr", [120113]],
      ["there4", [8756]],
      ["therefore", [8756]],
      ["Therefore", [8756]],
      ["Theta", [920]],
      ["theta", [952]],
      ["thetasym", [977]],
      ["thetav", [977]],
      ["thickapprox", [8776]],
      ["thicksim", [8764]],
      ["ThickSpace", [8287, 8202]],
      ["ThinSpace", [8201]],
      ["thinsp", [8201]],
      ["thkap", [8776]],
      ["thksim", [8764]],
      ["THORN", [222]],
      ["thorn", [254]],
      ["tilde", [732]],
      ["Tilde", [8764]],
      ["TildeEqual", [8771]],
      ["TildeFullEqual", [8773]],
      ["TildeTilde", [8776]],
      ["timesbar", [10801]],
      ["timesb", [8864]],
      ["times", [215]],
      ["timesd", [10800]],
      ["tint", [8749]],
      ["toea", [10536]],
      ["topbot", [9014]],
      ["topcir", [10993]],
      ["top", [8868]],
      ["Topf", [120139]],
      ["topf", [120165]],
      ["topfork", [10970]],
      ["tosa", [10537]],
      ["tprime", [8244]],
      ["trade", [8482]],
      ["TRADE", [8482]],
      ["triangle", [9653]],
      ["triangledown", [9663]],
      ["triangleleft", [9667]],
      ["trianglelefteq", [8884]],
      ["triangleq", [8796]],
      ["triangleright", [9657]],
      ["trianglerighteq", [8885]],
      ["tridot", [9708]],
      ["trie", [8796]],
      ["triminus", [10810]],
      ["TripleDot", [8411]],
      ["triplus", [10809]],
      ["trisb", [10701]],
      ["tritime", [10811]],
      ["trpezium", [9186]],
      ["Tscr", [119983]],
      ["tscr", [120009]],
      ["TScy", [1062]],
      ["tscy", [1094]],
      ["TSHcy", [1035]],
      ["tshcy", [1115]],
      ["Tstrok", [358]],
      ["tstrok", [359]],
      ["twixt", [8812]],
      ["twoheadleftarrow", [8606]],
      ["twoheadrightarrow", [8608]],
      ["Uacute", [218]],
      ["uacute", [250]],
      ["uarr", [8593]],
      ["Uarr", [8607]],
      ["uArr", [8657]],
      ["Uarrocir", [10569]],
      ["Ubrcy", [1038]],
      ["ubrcy", [1118]],
      ["Ubreve", [364]],
      ["ubreve", [365]],
      ["Ucirc", [219]],
      ["ucirc", [251]],
      ["Ucy", [1059]],
      ["ucy", [1091]],
      ["udarr", [8645]],
      ["Udblac", [368]],
      ["udblac", [369]],
      ["udhar", [10606]],
      ["ufisht", [10622]],
      ["Ufr", [120088]],
      ["ufr", [120114]],
      ["Ugrave", [217]],
      ["ugrave", [249]],
      ["uHar", [10595]],
      ["uharl", [8639]],
      ["uharr", [8638]],
      ["uhblk", [9600]],
      ["ulcorn", [8988]],
      ["ulcorner", [8988]],
      ["ulcrop", [8975]],
      ["ultri", [9720]],
      ["Umacr", [362]],
      ["umacr", [363]],
      ["uml", [168]],
      ["UnderBar", [95]],
      ["UnderBrace", [9183]],
      ["UnderBracket", [9141]],
      ["UnderParenthesis", [9181]],
      ["Union", [8899]],
      ["UnionPlus", [8846]],
      ["Uogon", [370]],
      ["uogon", [371]],
      ["Uopf", [120140]],
      ["uopf", [120166]],
      ["UpArrowBar", [10514]],
      ["uparrow", [8593]],
      ["UpArrow", [8593]],
      ["Uparrow", [8657]],
      ["UpArrowDownArrow", [8645]],
      ["updownarrow", [8597]],
      ["UpDownArrow", [8597]],
      ["Updownarrow", [8661]],
      ["UpEquilibrium", [10606]],
      ["upharpoonleft", [8639]],
      ["upharpoonright", [8638]],
      ["uplus", [8846]],
      ["UpperLeftArrow", [8598]],
      ["UpperRightArrow", [8599]],
      ["upsi", [965]],
      ["Upsi", [978]],
      ["upsih", [978]],
      ["Upsilon", [933]],
      ["upsilon", [965]],
      ["UpTeeArrow", [8613]],
      ["UpTee", [8869]],
      ["upuparrows", [8648]],
      ["urcorn", [8989]],
      ["urcorner", [8989]],
      ["urcrop", [8974]],
      ["Uring", [366]],
      ["uring", [367]],
      ["urtri", [9721]],
      ["Uscr", [119984]],
      ["uscr", [120010]],
      ["utdot", [8944]],
      ["Utilde", [360]],
      ["utilde", [361]],
      ["utri", [9653]],
      ["utrif", [9652]],
      ["uuarr", [8648]],
      ["Uuml", [220]],
      ["uuml", [252]],
      ["uwangle", [10663]],
      ["vangrt", [10652]],
      ["varepsilon", [1013]],
      ["varkappa", [1008]],
      ["varnothing", [8709]],
      ["varphi", [981]],
      ["varpi", [982]],
      ["varpropto", [8733]],
      ["varr", [8597]],
      ["vArr", [8661]],
      ["varrho", [1009]],
      ["varsigma", [962]],
      ["varsubsetneq", [8842, 65024]],
      ["varsubsetneqq", [10955, 65024]],
      ["varsupsetneq", [8843, 65024]],
      ["varsupsetneqq", [10956, 65024]],
      ["vartheta", [977]],
      ["vartriangleleft", [8882]],
      ["vartriangleright", [8883]],
      ["vBar", [10984]],
      ["Vbar", [10987]],
      ["vBarv", [10985]],
      ["Vcy", [1042]],
      ["vcy", [1074]],
      ["vdash", [8866]],
      ["vDash", [8872]],
      ["Vdash", [8873]],
      ["VDash", [8875]],
      ["Vdashl", [10982]],
      ["veebar", [8891]],
      ["vee", [8744]],
      ["Vee", [8897]],
      ["veeeq", [8794]],
      ["vellip", [8942]],
      ["verbar", [124]],
      ["Verbar", [8214]],
      ["vert", [124]],
      ["Vert", [8214]],
      ["VerticalBar", [8739]],
      ["VerticalLine", [124]],
      ["VerticalSeparator", [10072]],
      ["VerticalTilde", [8768]],
      ["VeryThinSpace", [8202]],
      ["Vfr", [120089]],
      ["vfr", [120115]],
      ["vltri", [8882]],
      ["vnsub", [8834, 8402]],
      ["vnsup", [8835, 8402]],
      ["Vopf", [120141]],
      ["vopf", [120167]],
      ["vprop", [8733]],
      ["vrtri", [8883]],
      ["Vscr", [119985]],
      ["vscr", [120011]],
      ["vsubnE", [10955, 65024]],
      ["vsubne", [8842, 65024]],
      ["vsupnE", [10956, 65024]],
      ["vsupne", [8843, 65024]],
      ["Vvdash", [8874]],
      ["vzigzag", [10650]],
      ["Wcirc", [372]],
      ["wcirc", [373]],
      ["wedbar", [10847]],
      ["wedge", [8743]],
      ["Wedge", [8896]],
      ["wedgeq", [8793]],
      ["weierp", [8472]],
      ["Wfr", [120090]],
      ["wfr", [120116]],
      ["Wopf", [120142]],
      ["wopf", [120168]],
      ["wp", [8472]],
      ["wr", [8768]],
      ["wreath", [8768]],
      ["Wscr", [119986]],
      ["wscr", [120012]],
      ["xcap", [8898]],
      ["xcirc", [9711]],
      ["xcup", [8899]],
      ["xdtri", [9661]],
      ["Xfr", [120091]],
      ["xfr", [120117]],
      ["xharr", [10231]],
      ["xhArr", [10234]],
      ["Xi", [926]],
      ["xi", [958]],
      ["xlarr", [10229]],
      ["xlArr", [10232]],
      ["xmap", [10236]],
      ["xnis", [8955]],
      ["xodot", [10752]],
      ["Xopf", [120143]],
      ["xopf", [120169]],
      ["xoplus", [10753]],
      ["xotime", [10754]],
      ["xrarr", [10230]],
      ["xrArr", [10233]],
      ["Xscr", [119987]],
      ["xscr", [120013]],
      ["xsqcup", [10758]],
      ["xuplus", [10756]],
      ["xutri", [9651]],
      ["xvee", [8897]],
      ["xwedge", [8896]],
      ["Yacute", [221]],
      ["yacute", [253]],
      ["YAcy", [1071]],
      ["yacy", [1103]],
      ["Ycirc", [374]],
      ["ycirc", [375]],
      ["Ycy", [1067]],
      ["ycy", [1099]],
      ["yen", [165]],
      ["Yfr", [120092]],
      ["yfr", [120118]],
      ["YIcy", [1031]],
      ["yicy", [1111]],
      ["Yopf", [120144]],
      ["yopf", [120170]],
      ["Yscr", [119988]],
      ["yscr", [120014]],
      ["YUcy", [1070]],
      ["yucy", [1102]],
      ["yuml", [255]],
      ["Yuml", [376]],
      ["Zacute", [377]],
      ["zacute", [378]],
      ["Zcaron", [381]],
      ["zcaron", [382]],
      ["Zcy", [1047]],
      ["zcy", [1079]],
      ["Zdot", [379]],
      ["zdot", [380]],
      ["zeetrf", [8488]],
      ["ZeroWidthSpace", [8203]],
      ["Zeta", [918]],
      ["zeta", [950]],
      ["zfr", [120119]],
      ["Zfr", [8488]],
      ["ZHcy", [1046]],
      ["zhcy", [1078]],
      ["zigrarr", [8669]],
      ["zopf", [120171]],
      ["Zopf", [8484]],
      ["Zscr", [119989]],
      ["zscr", [120015]],
      ["zwj", [8205]],
      ["zwnj", [8204]]
    ],
      o = {},
      s = {};
    n(o, s);
    r.prototype.decode = function (e) {
      return 0 === e.length ? "" : e.replace(/&(#?[\w\d]+);?/g,
        function (e, t) {
          let r;
          if ("#" === t.charAt(0)) {
            let n = parseInt(..."x" === t.charAt(1) ? [t.substr(2).toLowerCase(), 16] : [t.substr(1)]);
            isNaN(n) || n < -32768 || n > 65535 || (r = String.fromCharCode(n));
          }
          else r = o[t];
          return r || e;
        });
    };
    r.decode = function (e) {
      return (new r).decode(e);
    };
    r.prototype.encode = function (e) {
      let t = e.length;
      if (0 === t) return "";
      for (let r = "", n = 0; n < t;) {
        let i = s[e.charCodeAt(n)];
        if (i) {
          let o = i[e.charCodeAt(n + 1)];
          if (o ? n++ : o = i[""], o) {
            r += "&" + o + ";", n++;
            continue;
          }
        }
        r += e.charAt(n), n++;
      }
      return r;
    };
    r.encode = function (e) { return (new r).encode(e); };
    r.prototype.encodeNonUTF = function (e) {
      let t = e.length;
      if (0 === t) return "";
      for (let r = "", n = 0; n < t;) {
        let i = e.charCodeAt(n), o = s[i];
        if (o) {
          let a = o[e.charCodeAt(n + 1)];
          if (a ? n++ : a = o[""], a) {
            r += "&" + a + ";", n++;
            continue;
          }
        }
        r += i < 32 || i > 126 ? "&#" + i + ";" : e.charAt(n), n++;
      } return r;
    };
    r.encodeNonUTF = function (e) { return (new r).encodeNonUTF(e); };
    r.prototype.encodeNonASCII = function (e) {
      let t = e.length;
      if (0 === t)
        return "";
      for (let r = "", n = 0; n < t;) {
        let i = e.charCodeAt(n);
        i <= 255 ? r += e[n++] : (r += "&#" + i + ";", n++);
      } return r;
    };
    r.encodeNonASCII = function (e) { return (new r).encodeNonASCII(e); }, e.exports = r;
  },
  function (e, t) {
    e.exports = function (e) {
      if (void 0 == e)
        throw TypeError("Can't call method on  " + e); return e;
    };
  },
  function (e, t) {
    let r = Math.ceil, n = Math.floor;
    e.exports = function (e) {
      return isNaN(e = +e) ? 0 : (e > 0 ? n : r)(e);
    };
  },
  function (e, t, r) {
    let n = r(38), i = r(9);
    e.exports = function (e) {
      return n(i(e));
    };
  },
  function (e, t) {
    function r(e) {
      if (!i.test(e))
        return e;
      let t = [], r = e.replace(/\033\[(\d+)*m/g, function (e, r) {
        let n = a[r];
        if (n)
          return ~t.indexOf(r) ? (t.pop(), "</span>") : (t.push(r), "<" == n[0] ? n : '<span style="' + n + ';">');
        let i = c[r];
        return i ? (t.pop(), i) : "";
      }), n = t.length;
      return n > 0 && (r += Array(n + 1).join("</span>")), r;
    }
    function n(e) {
      a[0] = `font-weight: normal;opacity: 1;color: #${e.reset[0]};background: #${e.reset[1]}`;
      a[7] = `"color: #${e.reset[1]};background: #${e.reset[0]}`;
      a[90] = `"color: #${e.darkgrey}`;
      for (let t in s) {
        let n = e[s[t]] || "000";
        a[t] = `color: #${n}`;
        t = parseInt(t);
        a[(t + 10).toString()] = `background: #${n}`;
      }
    }
    e.exports = r;
    let i = /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/,
      o = {
        reset: ["fff", "000"],
        black: "000",
        red: "ff0000",
        green: "209805",
        yellow: "e8bf03",
        blue: "0000ff",
        magenta: "ff00ff",
        cyan: "00ffee",
        lightgrey: "f0f0f0",
        darkgrey: "888"
      },
      s = {
        30: "black",
        31: "red",
        32: "green",
        33: "yellow",
        34: "blue",
        35: "magenta",
        36: "cyan",
        37: "lightgrey"
      },
      a = {
        1: "font-weight:bold",
        2: "opacity:0.8",
        3: "<i>",
        4: "<u>",
        8: "display:none",
        9: "<del>"
      },
      c = {
        23: "</i>",
        24: "</u>",
        29: "</del>"
      };
    [0, 21, 22, 27, 28, 39, 49].forEach(index => c[index] = "</span>");
    r.setColors = function (e) {
      if ("object" != typeof e)
        throw new Error("`colors` parameter must be an Object.");
      let t = {};
      for (let r in o) {
        let i = e.hasOwnProperty(r) ? e[r] : null;
        if (i) {
          if ("reset" == r) {
            if ("string" == typeof i && (i = [i]), !Array.isArray(i) || 0 == i.length || i.some(function (e) { return "string" != typeof e; }))
              throw new Error(`The value of "${r}" property must be an Array and each item could only be a hex string, e.g.: FF0000`);
            let s = o[r];
            i[0] || (i[0] = s[0]), 1 != i.length && i[1] || (i = [i[0]], i.push(s[1])), i = i.slice(0, 2);
          }
          else if ("string" != typeof i)
            throw new Error(`The value of "${r}" property must be a hex string, e.g.: FF0000`);
          t[r] = i;
        }
        else
          t[r] = o[r];
      }
      n(t);
    };
    r.reset = function () { n(o); };
    r.tags = {
      get open() {
        return a;
      },
      get close() {
        return c;
      }
    };
    r.reset();
  },
  function (e, t, r) { t = e.exports = r(7)(), t.push([e.id, "@keyframes fade{to{transform:scale(1);opacity:1;border-radius:0}}@keyframes bluePulse{0%{background-color:#007d9a;box-shadow:0 0 9px #333}50%{background-color:#2daebf;box-shadow:0 0 18px #2daebf}to{background-color:#007d9a;box-shadow:0 0 9px #333}}@keyframes x0{to{left:0}}.x0{animation:x0 .2s}@keyframes x25{to{left:25%}}.x25{animation:x25 .2s}@keyframes x50{to{left:50%}}.x50{animation:x50 .2s}@keyframes x75{to{left:75%}}.x75{animation:x75 .2s}@keyframes y0{to{top:0}}.y0{animation:y0 .2s}@keyframes y25{to{top:25%}}.y25{animation:y25 .2s}@keyframes y50{to{top:50%}}.y50{animation:y50 .2s}@keyframes y75{to{top:75%}}.y75{animation:y75 .2s}#app{font-family:Inknut Antiqua,Clear Sans,Helvetica Neue,Arial,sans-serif}#app,#app ul{width:100%;position:relative}#app ul{list-style:none;display:inline-block;margin:0;padding:0;height:0;padding-top:100%}.mask{top:0;left:0;padding-bottom:100%;background:rgba(0,0,0,.38);opacity:0}.mask,.mask div{position:absolute;width:100%}.mask div{cursor:pointer;height:100%;font-size:3.5em;font-weight:700;color:#ddd;display:flex;justify-content:center;align-items:center;text-shadow:2px 2px 10px #555}#app button{width:100px;height:50px;line-height:50px;font-size:20px;display:block;cursor:pointer;margin:20px auto;background-color:#2daebf;border-color:#238896;color:#fff;box-shadow:inset 0 -2px 0 rgba(0,0,0,.2);border-radius:4px;transition:background-color .3s ease-out;animation:bluePulse 2s 4s infinite}.box{width:25%;height:25%;line-height:200%;text-align:center;position:absolute;font-size:2.8em;cursor:pointer;background:hsla(30,37%,89%,.35);border:1px solid #ccc;box-shadow:1px 1px 4px;box-sizing:border-box;-webkit-user-select:none;display:flex;justify-content:center;align-items:center}.empty{background:#f0f0f0;box-shadow:inset 1px 1px 3px #929292}.combin{z-index:1;opacity:0;transform:scale(.1);border-radius:50%;animation:fade .2s ease .1s}.s2{background:#f8f3e8}.s2,.s4{box-shadow:0 0 30px 10px hsla(47,84%,70%,0),inset 0 0 0 1px hsla(0,0%,100%,0)}.s4{background:#ede0c8}.s8{background:#f2b179}.s8,.s16{color:#f9f6f2}.s16{background:#f59563}.s32{background:#f67c5f}.s32,.s64{color:#f9f6f2}.s64{background:#f65e3b}.s128{background:#edcf72;box-shadow:0 0 30px 10px hsla(47,84%,70%,.2381),inset 0 0 0 1px hsla(0,0%,100%,.14286)}.s128,.s256{color:#f9f6f2}.s256{background:#edcc61;box-shadow:0 0 30px 10px hsla(47,84%,70%,.31746),inset 0 0 0 1px hsla(0,0%,100%,.19048)}.s512{color:#f9f6f2;background:#edc850;box-shadow:0 0 30px 10px hsla(47,84%,70%,.39683),inset 0 0 0 1px hsla(0,0%,100%,.2381)}.s1024{background:#edc53f;box-shadow:0 0 30px 10px hsla(47,84%,70%,.47619),inset 0 0 0 1px hsla(0,0%,100%,.28571)}.s1024,.s2048{color:#f9f6f2;font-size:2em}.s2048{background:#edc22e;box-shadow:0 0 30px 10px hsla(47,84%,70%,.55556),inset 0 0 0 1px hsla(0,0%,100%,.33333)}.s4096{color:#f9f6f2;background:#61c0ed;font-size:2em;box-shadow:0 0 30px 10px rgba(114,176,243,.45),inset 0 0 0 1px hsla(0,0%,100%,.33333)}.show-transition{transition:all .5s ease;transform:scale(1) rotate(1turn);border-radius:0;opacity:1}.show-enter,.show-leave{transform:scale(0) rotate(0);border-radius:50%;opacity:0}@media all and (orientation:landscape){#app{width:30%;margin-top:5%}}", ""]); },
  function (e, t, r) {
    function n(e, t) {
      for (let r = 0; r < e.length; r++) {
        let n = e[r], i = h[n.id];
        if (i) {
          i.refs++;
          for (var o = 0; o < i.parts.length; o++)
            i.parts[o](n.parts[o]);
          for (; o < n.parts.length; o++)
            i.parts.push(c(n.parts[o], t));
        }
        else {
          for (let s = [], o = 0; o < n.parts.length; o++)
            s.push(c(n.parts[o], t));
          h[n.id] = { id: n.id, refs: 1, parts: s };
        }
      }
    }
    function i(e) {
      for (let t = [], r = {}, n = 0; n < e.length; n++) {
        let i = e[n], o = i[0], s = i[1], a = i[2], c = i[3], l = { css: s, media: a, sourceMap: c };
        r[o] ? r[o].parts.push(l) : t.push(r[o] = { id: o, parts: [l] });
      } return t;
    }
    function o(e, t) {
      let r = d(), n = g[g.length - 1];
      if ("top" === e.insertAt)
        n ? n.nextSibling ? r.insertBefore(t, n.nextSibling) : r.appendChild(t) : r.insertBefore(t, r.firstChild), g.push(t);
      else {
        if ("bottom" !== e.insertAt)
          throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
        r.appendChild(t);
      }
    }
    function s(e) { e.parentNode.removeChild(e); let t = g.indexOf(e); t >= 0 && g.splice(t, 1); }
    function a(e) { let t = document.createElement("style"); return t.type = "text/css", o(e, t), t; }
    function c(e, t) {
      let r, n, i; if (t.singleton) {
        let o = m++;
        r = v || (v = a(t)), n = l.bind(null, r, o, !1), i = l.bind(null, r, o, !0);
      }
      else
        r = a(t), n = u.bind(null, r), i = function () { s(r); }; return n(e),
          function (t) {
            if (t) {
              if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap)
                return;
              n(e = t);
            }
            else
              i();
          };
    }
    function l(e, t, r, n) {
      let i = r ? "" : n.css; if (e.styleSheet)
        e.styleSheet.cssText = b(t, i);
      else {
        let o = document.createTextNode(i), s = e.childNodes;
        s[t] && e.removeChild(s[t]), s.length ? e.insertBefore(o, s[t]) : e.appendChild(o);
      }
    }
    function u(e, t) {
      let r = t.css, n = t.media, i = t.sourceMap;
      if (n && e.setAttribute("media", n), i && (r += "\n/*# sourceURL=" + i.sources[0] + " */", r += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(i)))) + " */"), e.styleSheet)
        e.styleSheet.cssText = r;
      else {
        for (; e.firstChild;)
          e.removeChild(e.firstChild);
        e.appendChild(document.createTextNode(r));
      }
    } let h = {}, p = function (e) { let t; return function () { return "undefined" == typeof t && (t = e.apply(this, arguments)), t; }; }, f = p(function () { return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase()); }), d = p(function () { return document.head || document.getElementsByTagName("head")[0]; }), v = null, m = 0, g = []; e.exports = function (e, t) {
      t = t || {}, "undefined" == typeof t.singleton && (t.singleton = f()), "undefined" == typeof t.insertAt && (t.insertAt = "bottom"); let r = i(e); return n(r, t),
        function (e) {
          for (let o = [], s = 0; s < r.length; s++) {
            let a = r[s], c = h[a.id];
            c.refs--, o.push(c);
          } if (e) {
            let l = i(e);
            n(l, t);
          }
          for (let s = 0; s < o.length; s++) {
            let c = o[s];
            if (0 === c.refs) {
              for (let u = 0; u < c.parts.length; u++)
                c.parts[u]();
              delete h[c.id];
            }
          }
        };
    };
    let b = function () {
      let e = [];
      return function (t, r) {
        return e[t] = r, e.filter(Boolean).join("\n");
      };
    }();
  },
  function (e, t, r) {
    let n = r(2);
    "string" == typeof n && (n = [[e.id, n, ""]]);
    let i = r(14)(n, {});
    n.locals && (e.exports = n.locals), n.locals || e.hot.accept(2, function () {
      let t = r(2);
      "string" == typeof t && (t = [[e.id, t, ""]]), i(t);
    }), e.hot.dispose(function () {
      i();
    });
  },
  function (e, t, r) {
    (function (t, r) {
      "use strict";
      function n(e, t, r) {
        if (o(e, t))
          return void (e[t] = r); if (e._isVue)
          return void n(e._data, t, r); let i = e.__ob__; if (!i)
          return void (e[t] = r); if (i.convert(t, r), i.dep.notify(), i.vms)
          for (let s = i.vms.length; s--;) {
            let a = i.vms[s];
            a._proxy(t), a._digest();
          } return r;
      }
      function i(e, t) {
        if (o(e, t)) {
          delete e[t];
          let r = e.__ob__;
          if (!r)
            return void (e._isVue && (delete e._data[t], e._digest()));
          if (r.dep.notify(), r.vms)
            for (let n = r.vms.length; n--;) {
              let i = r.vms[n];
              i._unproxy(t), i._digest();
            }
        }
      }
      function o(e, t) { return $r.call(e, t); }
      function s(e) { return Sr.test(e); }
      function a(e) { let t = (e + "").charCodeAt(0); return 36 === t || 95 === t; }
      function c(e) { return null == e ? "" : e.toString(); }
      function l(e) {
        if ("string" != typeof e)
          return e; let t = Number(e); return isNaN(t) ? e : t;
      }
      function u(e) { return "true" === e || "false" !== e && e; }
      function h(e) { let t = e.charCodeAt(0), r = e.charCodeAt(e.length - 1); return t !== r || 34 !== t && 39 !== t ? e : e.slice(1, -1); }
      function p(e) { return e.replace(Lr, f); }
      function f(e, t) { return t ? t.toUpperCase() : ""; }
      function d(e) { return e.replace(jr, "$1-$2").toLowerCase(); }
      function v(e) { return e.replace(Rr, f); }
      function m(e, t) { return function (r) { let n = arguments.length; return n ? n > 1 ? e.apply(t, arguments) : e.call(t, r) : e.call(t); }; }
      function g(e, t) {
        t = t || 0; for (let r = e.length - t, n = new Array(r); r--;)
          n[r] = e[r + t]; return n;
      }
      function b(e, t) {
        for (let r = Object.keys(t), n = r.length; n--;)
          e[r[n]] = t[r[n]]; return e;
      }
      function y(e) { return null !== e && "object" == typeof e; }
      function w(e) { return Vr.call(e) === Hr; }
      function _(e, t, r, n) { Object.defineProperty(e, t, { value: r, enumerable: !!n, writable: !0, configurable: !0 }); }
      function x(e, t) { let r, n, i, o, s, a = function c() { let a = Date.now() - o; a < t && a >= 0 ? r = setTimeout(c, t - a) : (r = null, s = e.apply(i, n), r || (i = n = null)); }; return function () { return i = this, n = arguments, o = Date.now(), r || (r = setTimeout(a, t)), s; }; }
      function E(e, t) {
        for (let r = e.length; r--;)
          if (e[r] === t)
            return r; return -1;
      }
      function k(e) {
        let t = function r() {
          if (!r.cancelled)
            return e.apply(this, arguments);
        }; return t.cancel = function () { t.cancelled = !0; }, t;
      }
      function C(e, t) { return e == t || !(!y(e) || !y(t)) && JSON.stringify(e) === JSON.stringify(t); }
      function N(e) { this.size = 0, this.limit = e, this.head = this.tail = void 0, this._keymap = Object.create(null); }
      function A() {
        let e, t = an.slice(fn, hn).trim(); if (t) {
          e = {};
          let r = t.match(wn);
          e.name = r[0], r.length > 1 && (e.args = r.slice(1).map(O));
        } e && (cn.filters = cn.filters || []).push(e), fn = hn + 1;
      }
      function O(e) {
        if (_n.test(e))
          return { value: l(e), dynamic: !1 }; let t = h(e), r = t === e; return { value: r ? e : t, dynamic: r };
      }
      function D(e) {
        let t = yn.get(e); if (t)
          return t; for (an = e, dn = vn = !1, mn = gn = bn = 0, fn = 0, cn = {}, hn = 0, pn = an.length; hn < pn; hn++)
          if (un = ln, ln = an.charCodeAt(hn), dn)
            39 === ln && 92 !== un && (dn = !dn);
          else if (vn)
            34 === ln && 92 !== un && (vn = !vn);
          else if (124 === ln && 124 !== an.charCodeAt(hn + 1) && 124 !== an.charCodeAt(hn - 1))
            null == cn.expression ? (fn = hn + 1, cn.expression = an.slice(0, hn).trim()) : A();
          else
            switch (ln) {
              case 34:
                vn = !0;
                break;
              case 39:
                dn = !0;
                break;
              case 40:
                bn++;
                break;
              case 41:
                bn--;
                break;
              case 91:
                gn++;
                break;
              case 93:
                gn--;
                break;
              case 123:
                mn++;
                break;
              case 125: mn--;
            } return null == cn.expression ? cn.expression = an.slice(0, hn).trim() : 0 !== fn && A(), yn.put(e, cn), cn;
      }
      function T(e) { return e.replace(En, "\\$&"); }
      function q() { let e = T(qn.delimiters[0]), t = T(qn.delimiters[1]), r = T(qn.unsafeDelimiters[0]), n = T(qn.unsafeDelimiters[1]); Cn = new RegExp(r + "((?:.|\\n)+?)" + n + "|" + e + "((?:.|\\n)+?)" + t, "g"), Nn = new RegExp("^" + r + "((?:.|\\n)+?)" + n + "$"), kn = new N(1e3); }
      function $(e) {
        kn || q(); let t = kn.get(e); if (t)
          return t; if (!Cn.test(e))
          return null; for (let r, n, i, o, s, a, c = [], l = Cn.lastIndex = 0; r = Cn.exec(e);)
          n = r.index, n > l && c.push({ value: e.slice(l, n) }), i = Nn.test(r[0]), o = i ? r[1] : r[2], s = o.charCodeAt(0), a = 42 === s, o = a ? o.slice(1) : o, c.push({ tag: !0, value: o.trim(), html: i, oneTime: a }), l = n + r[0].length; return l < e.length && c.push({ value: e.slice(l) }), kn.put(e, c), c;
      }
      function S(e, t) { return e.length > 1 ? e.map(function (e) { return L(e, t); }).join("+") : L(e[0], t, !0); }
      function L(e, t, r) { return e.tag ? e.oneTime && t ? '"' + t.$eval(e.value) + '"' : j(e.value, r) : '"' + e.value + '"'; }
      function j(e, t) {
        if (An.test(e)) {
          let r = D(e);
          return r.filters ? "this._applyFilters(" + r.expression + ",null," + JSON.stringify(r.filters) + ",false)" : "(" + e + ")";
        } return t ? e : "(" + e + ")";
      }
      function R(e, t, r, n) {
        P(e, 1,
          function () { t.appendChild(e); }, r, n);
      }
      function V(e, t, r, n) {
        P(e, 1,
          function () { z(e, t); }, r, n);
      }
      function H(e, t, r) {
        P(e, -1,
          function () { G(e); }, t, r);
      }
      function P(e, t, r, n, i) {
        let o = e.__v_trans; if (!o || !o.hooks && !Xr || !n._isCompiled || n.$parent && !n.$parent._isCompiled)
          return r(), void (i && i()); let s = t > 0 ? "enter" : "leave"; o[s](r, i);
      }
      function M(e) {
        if ("string" == typeof e) {
          let t = e;
          e = document.querySelector(e), e || "production" !== r.env.NODE_ENV && $n("Cannot find element: " + t);
        } return e;
      }
      function I(e) {
        if (!e)
          return !1; let t = e.ownerDocument.documentElement, r = e.parentNode; return t === e || t === r || !(!r || 1 !== r.nodeType || !t.contains(r));
      }
      function F(e, t) { let r = e.getAttribute(t); return null !== r && e.removeAttribute(t), r; }
      function U(e, t) { let r = F(e, ":" + t); return null === r && (r = F(e, "v-bind:" + t)), r; }
      function B(e, t) { return e.hasAttribute(t) || e.hasAttribute(":" + t) || e.hasAttribute("v-bind:" + t); }
      function z(e, t) { t.parentNode.insertBefore(e, t); }
      function W(e, t) { t.nextSibling ? z(e, t.nextSibling) : t.parentNode.appendChild(e); }
      function G(e) { e.parentNode.removeChild(e); }
      function J(e, t) { t.firstChild ? z(e, t.firstChild) : t.appendChild(e); }
      function Y(e, t) { let r = e.parentNode; r && r.replaceChild(t, e); }
      function Z(e, t, r, n) { e.addEventListener(t, r, n); }
      function Q(e, t, r) { e.removeEventListener(t, r); }
      function X(e) { let t = e.className; return "object" == typeof t && (t = t.baseVal || ""), t; }
      function K(e, t) { zr && !/svg$/.test(e.namespaceURI) ? e.className = t : e.setAttribute("class", t); }
      function ee(e, t) {
        if (e.classList)
          e.classList.add(t);
        else {
          let r = " " + X(e) + " ";
          r.indexOf(" " + t + " ") < 0 && K(e, (r + t).trim());
        }
      }
      function te(e, t) {
        if (e.classList)
          e.classList.remove(t);
        else {
          for (let r = " " + X(e) + " ", n = " " + t + " "; r.indexOf(n) >= 0;)
            r = r.replace(n, " ");
          K(e, r.trim());
        } e.className || e.removeAttribute("class");
      }
      function re(e, t) {
        let r, n; if (oe(e) && ue(e.content) && (e = e.content), e.hasChildNodes())
          for (ne(e), n = t ? document.createDocumentFragment() : document.createElement("div"); r = e.firstChild;)
            n.appendChild(r); return n;
      }
      function ne(e) {
        for (let t; t = e.firstChild, ie(t);)
          e.removeChild(t); for (; t = e.lastChild, ie(t);)
          e.removeChild(t);
      }
      function ie(e) { return e && (3 === e.nodeType && !e.data.trim() || 8 === e.nodeType); }
      function oe(e) { return e.tagName && "template" === e.tagName.toLowerCase(); }
      function se(e, t) { let r = qn.debug ? document.createComment(e) : document.createTextNode(t ? " " : ""); return r.__v_anchor = !0, r; }
      function ae(e) {
        if (e.hasAttributes())
          for (let t = e.attributes, r = 0, n = t.length; r < n; r++) {
            let i = t[r].name;
            if (jn.test(i))
              return p(i.replace(jn, ""));
          }
      }
      function ce(e, t, r) {
        for (let n; e !== t;)
          n = e.nextSibling, r(e), e = n; r(t);
      }
      function le(e, t, r, n, i) {
        function o() {
          if (a++, s && a >= c.length) {
            for (let e = 0; e < c.length; e++)
              n.appendChild(c[e]);
            i && i();
          }
        } let s = !1, a = 0, c = []; ce(e, t,
          function (e) { e === t && (s = !0), c.push(e), H(e, r, o); });
      }
      function ue(e) { return e && 11 === e.nodeType; }
      function he(e) {
        if (e.outerHTML)
          return e.outerHTML; let t = document.createElement("div"); return t.appendChild(e.cloneNode(!0)), t.innerHTML;
      }
      function pe(e, t) {
        let n = e.tagName.toLowerCase(), i = e.hasAttributes(); if (Rn.test(n) || Vn.test(n)) {
          if (i)
            return fe(e, t);
        }
        else {
          if (we(t, "components", n))
            return { id: n };
          let o = i && fe(e, t);
          if (o)
            return o;
          if ("production" !== r.env.NODE_ENV) {
            let s = t._componentNameMap && t._componentNameMap[n];
            s ? $n("Unknown custom element: <" + n + "> - did you mean <" + s + ">? HTML is case-insensitive, remember to use kebab-case in templates.") : Hn(e, n) && $n("Unknown custom element: <" + n + '> - did you register the component correctly? For recursive components, make sure to provide the "name" option.');
          }
        }
      }
      function fe(e, t) {
        let r = e.getAttribute("is"); if (null != r) {
          if (we(t, "components", r))
            return e.removeAttribute("is"), { id: r };
        }
        else if (r = U(e, "is"), null != r)
          return { id: r, dynamic: !0 };
      }
      function de(e, t) {
        let r, i, s; for (r in t)
          i = e[r], s = t[r], o(e, r) ? y(i) && y(s) && de(i, s) : n(e, r, s); return e;
      }
      function ve(e, t) { let r = Object.create(e || null); return t ? b(r, be(t)) : r; }
      function me(e) {
        if (e.components) {
          let t, n = e.components = be(e.components), i = Object.keys(n);
          if ("production" !== r.env.NODE_ENV)
            let o = e._componentNameMap = {};
          for (let s = 0, a = i.length; s < a; s++) {
            let c = i[s];
            Rn.test(c) || Vn.test(c) ? "production" !== r.env.NODE_ENV && $n("Do not use built-in or reserved HTML elements as component id: " + c) : ("production" !== r.env.NODE_ENV && (o[c.replace(/-/g, "").toLowerCase()] = d(c)), t = n[c], w(t) && (n[c] = Nr.extend(t)));
          }
        }
      }
      function ge(e) {
        let t, r, n = e.props; if (Pr(n))
          for (e.props = {}, t = n.length; t--;)
            r = n[t], "string" == typeof r ? e.props[r] = null : r.name && (e.props[r.name] = r);
        else if (w(n)) {
          let i = Object.keys(n);
          for (t = i.length; t--;)
            r = n[i[t]], "function" == typeof r && (n[i[t]] = { type: r });
        }
      }
      function be(e) {
        if (Pr(e)) {
          for (let t, n = {}, i = e.length; i--;) {
            t = e[i];
            let o = "function" == typeof t ? t.options && t.options.name || t.id : t.name || t.id;
            o ? n[o] = t : "production" !== r.env.NODE_ENV && $n('Array-syntax assets must provide a "name" or "id" field.');
          }
          return n;
        } return e;
      }
      function ye(e, t, n) {
        function i(r) { let i = Pn[r] || Mn; a[r] = i(e[r], t[r], n, r); } me(t), ge(t), "production" !== r.env.NODE_ENV && t.propsData && !n && $n("propsData can only be used as an instantiation option."); let s, a = {}; if (t["extends"] && (e = "function" == typeof t["extends"] ? ye(e, t["extends"].options, n) : ye(e, t["extends"], n)), t.mixins)
          for (let c = 0, l = t.mixins.length; c < l; c++) {
            let u = t.mixins[c], h = u.prototype instanceof Nr ? u.options : u;
            e = ye(e, h, n);
          } for (s in e)
          i(s); for (s in t)
          o(e, s) || i(s); return a;
      }
      function we(e, t, n, i) {
        if ("string" == typeof n) {
          let o, s = e[t], a = s[n] || s[o = p(n)] || s[o.charAt(0).toUpperCase() + o.slice(1)];
          return "production" !== r.env.NODE_ENV && i && !a && $n("Failed to resolve " + t.slice(0, -1) + ": " + n, e), a;
        }
      }
      function _e() { this.id = In++, this.subs = []; }
      function xe(e) { zn = !1, e(), zn = !0; }
      function Ee(e) {
        if (this.value = e, this.dep = new _e, _(e, "__ob__", this), Pr(e)) {
          let t = Mr ? ke : Ce;
          t(e, Un, Bn), this.observeArray(e);
        }
        else
          this.walk(e);
      }
      function ke(e, t) { e.__proto__ = t; }
      function Ce(e, t, r) {
        for (let n = 0, i = r.length; n < i; n++) {
          let o = r[n];
          _(e, o, t[o]);
        }
      }
      function Ne(e, t) {
        if (e && "object" == typeof e) {
          let r;
          return o(e, "__ob__") && e.__ob__ instanceof Ee ? r = e.__ob__ : zn && (Pr(e) || w(e)) && Object.isExtensible(e) && !e._isVue && (r = new Ee(e)), r && t && r.addVm(t), r;
        }
      }
      function Ae(e, t, r) {
        let n = new _e, i = Object.getOwnPropertyDescriptor(e, t); if (!i || i.configurable !== !1) {
          let o = i && i.get, s = i && i.set, a = Ne(r);
          Object.defineProperty(e, t, {
            enumerable: !0, configurable: !0, get() {
              let t = o ? o.call(e) : r; if (_e.target && (n.depend(), a && a.dep.depend(), Pr(t)))
                for (let i, s = 0, c = t.length; s < c; s++)
                  i = t[s], i && i.__ob__ && i.__ob__.dep.depend(); return t;
            }, set(t) { let i = o ? o.call(e) : r; t !== i && (s ? s.call(e, t) : r = t, a = Ne(t), n.notify()); }
          });
        }
      }
      function Oe(e) { e.prototype._init = function (e) { e = e || {}, this.$el = null, this.$parent = e.parent, this.$root = this.$parent ? this.$parent.$root : this, this.$children = [], this.$refs = {}, this.$els = {}, this._watchers = [], this._directives = [], this._uid = Gn++, this._isVue = !0, this._events = {}, this._eventsCount = {}, this._isFragment = !1, this._fragment = this._fragmentStart = this._fragmentEnd = null, this._isCompiled = this._isDestroyed = this._isReady = this._isAttached = this._isBeingDestroyed = this._vForRemoving = !1, this._unlinkFn = null, this._context = e._context || this.$parent, this._scope = e._scope, this._frag = e._frag, this._frag && this._frag.children.push(this), this.$parent && this.$parent.$children.push(this), e = this.$options = ye(this.constructor.options, e, this), this._updateRef(), this._data = {}, this._callHook("init"), this._initState(), this._initEvents(), this._callHook("created"), e.el && this.$mount(e.el); }; }
      function De(e) {
        if (void 0 === e)
          return "eof"; let t = e.charCodeAt(0); switch (t) {
            case 91:
            case 93:
            case 46:
            case 34:
            case 39:
            case 48: return e;
            case 95:
            case 36: return "ident";
            case 32:
            case 9:
            case 10:
            case 13:
            case 160:
            case 65279:
            case 8232:
            case 8233: return "ws";
          } return t >= 97 && t <= 122 || t >= 65 && t <= 90 ? "ident" : t >= 49 && t <= 57 ? "number" : "else";
      }
      function Te(e) { let t = e.trim(); return ("0" !== e.charAt(0) || !isNaN(e)) && (s(t) ? h(t) : "*" + t); }
      function qe(e) {
        function t() {
          let t = e[u + 1]; if (h === ii && "'" === t || h === oi && '"' === t)
            return u++, n = "\\" + t, f[Yn](), !0;
        } let r, n, i, o, s, a, c, l = [], u = -1, h = Kn, p = 0, f = []; for (f[Zn] = function () { void 0 !== i && (l.push(i), i = void 0); }, f[Yn] = function () { void 0 === i ? i = n : i += n; }, f[Qn] = function () { f[Yn](), p++; }, f[Xn] = function () {
          if (p > 0)
            p--, h = ni, f[Yn]();
          else {
            if (p = 0, i = Te(i), i === !1)
              return !1;
            f[Zn]();
          }
        }; null != h;)
          if (u++, r = e[u], "\\" !== r || !t()) {
            if (o = De(r), c = ci[h], s = c[o] || c["else"] || ai, s === ai)
              return;
            if (h = s[0], a = f[s[1]], a && (n = s[2], n = void 0 === n ? r : n, a() === !1))
              return;
            if (h === si)
              return l.raw = e, l;
          }
      }
      function $e(e) { let t = Jn.get(e); return t || (t = qe(e), t && Jn.put(e, t)), t; }
      function Se(e, t) { return Fe(t).get(e); }
      function Le(e, t, i) {
        let o = e; if ("string" == typeof t && (t = qe(t)), !t || !y(e))
          return !1; for (let s, a, c = 0, l = t.length; c < l; c++)
          s = e, a = t[c], "*" === a.charAt(0) && (a = Fe(a.slice(1)).get.call(o, o)), c < l - 1 ? (e = e[a], y(e) || (e = {}, "production" !== r.env.NODE_ENV && s._isVue && li(t, s), n(s, a, e))) : Pr(e) ? e.$set(a, i) : a in e ? e[a] = i : ("production" !== r.env.NODE_ENV && e._isVue && li(t, e), n(e, a, i)); return !0;
      }
      function je() { }
      function Re(e, t) { let r = Ei.length; return Ei[r] = t ? e.replace(gi, "\\n") : e, '"' + r + '"'; }
      function Ve(e) { let t = e.charAt(0), r = e.slice(1); return fi.test(r) ? e : (r = r.indexOf('"') > -1 ? r.replace(yi, He) : r, t + "scope." + r); }
      function He(e, t) { return Ei[t]; }
      function Pe(e) { vi.test(e) && "production" !== r.env.NODE_ENV && $n("Avoid using reserved keywords in expression: " + e), Ei.length = 0; let t = e.replace(bi, Re).replace(mi, ""); return t = (" " + t).replace(_i, Ve).replace(yi, He), Me(t); }
      function Me(e) {
        try {
          return new Function("scope", "return " + e + ";");
        }
        catch (t) {
          return "production" !== r.env.NODE_ENV && $n(t.toString().match(/unsafe-eval|CSP/) ? "It seems you are using the default build of Vue.js in an environment with Content Security Policy that prohibits unsafe-eval. Use the CSP-compliant build instead: http://vuejs.org/guide/installation.html#CSP-compliant-build" : "Invalid expression. Generated function body: " + e), je;
        }
      }
      function Ie(e) { let t = $e(e); return t ? function (e, r) { Le(e, t, r); } : void ("production" !== r.env.NODE_ENV && $n("Invalid setter expression: " + e)); }
      function Fe(e, t) {
        e = e.trim(); let r = hi.get(e); if (r)
          return t && !r.set && (r.set = Ie(r.exp)), r; let n = { exp: e }; return n.get = Ue(e) && e.indexOf("[") < 0 ? Me("scope." + e) : Pe(e), t && (n.set = Ie(e)), hi.put(e, n), n;
      }
      function Ue(e) { return wi.test(e) && !xi.test(e) && "Math." !== e.slice(0, 5); }
      function Be() { Ci.length = 0, Ni.length = 0, Ai = {}, Oi = {}, Di = !1; }
      function ze() {
        for (let e = !0; e;)
          e = !1, We(Ci), We(Ni), Ci.length ? e = !0 : (Fr && qn.devtools && Fr.emit("flush"), Be());
      }
      function We(e) {
        for (let t = 0; t < e.length; t++) {
          let n = e[t], i = n.id;
          if (Ai[i] = null, n.run(), "production" !== r.env.NODE_ENV && null != Ai[i] && (Oi[i] = (Oi[i] || 0) + 1, Oi[i] > qn._maxUpdateCount)) {
            $n('You may have an infinite update loop for watcher with expression "' + n.expression + '"', n.vm);
            break;
          }
        } e.length = 0;
      }
      function Ge(e) {
        let t = e.id; if (null == Ai[t]) {
          let r = e.user ? Ni : Ci;
          Ai[t] = r.length, r.push(e), Di || (Di = !0, nn(ze));
        }
      }
      function Je(e, t, r, n) {
        n && b(this, n); let i = "function" == typeof t; if (this.vm = e, e._watchers.push(this), this.expression = t, this.cb = r, this.id = ++Ti, this.active = !0, this.dirty = this.lazy, this.deps = [], this.newDeps = [], this.depIds = new on, this.newDepIds = new on, this.prevError = null, i)
          this.getter = t, this.setter = void 0;
        else {
          let o = Fe(t, this.twoWay);
          this.getter = o.get, this.setter = o.set;
        } this.value = this.lazy ? void 0 : this.get(), this.queued = this.shallow = !1;
      }
      function Ye(e, t) {
        let r = void 0, n = void 0; t || (t = qi, t.clear()); let i = Pr(e), o = y(e); if ((i || o) && Object.isExtensible(e)) {
          if (e.__ob__) {
            let s = e.__ob__.dep.id;
            if (t.has(s))
              return;
            t.add(s);
          }
          if (i)
            for (r = e.length; r--;)
              Ye(e[r], t);
          else if (o)
            for (n = Object.keys(e), r = n.length; r--;)
              Ye(e[n[r]], t);
        }
      }
      function Ze(e) { return oe(e) && ue(e.content); }
      function Qe(e, t) {
        let r = t ? e : e.trim(), n = Si.get(r); if (n)
          return n; let i = document.createDocumentFragment(), o = e.match(Ri), s = Vi.test(e), a = Hi.test(e); if (o || s || a) {
            let c = o && o[1], l = ji[c] || ji.efault, u = l[0], h = l[1], p = l[2], f = document.createElement("div");
            for (f.innerHTML = h + e + p; u--;)
              f = f.lastChild;
            for (let d; d = f.firstChild;)
              i.appendChild(d);
          }
        else
          i.appendChild(document.createTextNode(e)); return t || ne(i), Si.put(r, i), i;
      }
      function Xe(e) {
        if (Ze(e))
          return Qe(e.innerHTML); if ("SCRIPT" === e.tagName)
          return Qe(e.textContent); for (let t, r = Ke(e), n = document.createDocumentFragment(); t = r.firstChild;)
          n.appendChild(t); return ne(n), n;
      }
      function Ke(e) {
        if (!e.querySelectorAll)
          return e.cloneNode(); let t, r, n, i = e.cloneNode(!0); if (Pi) {
            let o = i;
            if (Ze(e) && (e = e.content, o = i.content), r = e.querySelectorAll("template"), r.length)
              for (n = o.querySelectorAll("template"), t = n.length; t--;)
                n[t].parentNode.replaceChild(Ke(r[t]), n[t]);
          } if (Mi)
          if ("TEXTAREA" === e.tagName)
            i.value = e.value;
          else if (r = e.querySelectorAll("textarea"), r.length)
            for (n = i.querySelectorAll("textarea"), t = n.length; t--;)
              n[t].value = r[t].value; return i;
      }
      function et(e, t, r) { let n, i; return ue(e) ? (ne(e), t ? Ke(e) : e) : ("string" == typeof e ? r || "#" !== e.charAt(0) ? i = Qe(e, r) : (i = Li.get(e), i || (n = document.getElementById(e.slice(1)), n && (i = Xe(n), Li.put(e, i)))) : e.nodeType && (i = Xe(e)), i && t ? Ke(i) : i); }
      function tt(e, t, r, n, i, o) { this.children = [], this.childFrags = [], this.vm = t, this.scope = i, this.inserted = !1, this.parentFrag = o, o && o.childFrags.push(this), this.unlink = e(t, r, n, i, this); let s = this.single = 1 === r.childNodes.length && !r.childNodes[0].__v_anchor; s ? (this.node = r.childNodes[0], this.before = rt, this.remove = nt) : (this.node = se("fragment-start"), this.end = se("fragment-end"), this.frag = r, J(this.node, r), r.appendChild(this.end), this.before = it, this.remove = ot), this.node.__v_frag = this; }
      function rt(e, t) { this.inserted = !0; let r = t !== !1 ? V : z; r(this.node, e, this.vm), I(this.node) && this.callHook(st); }
      function nt() {
        this.inserted = !1; let e = I(this.node), t = this; this.beforeRemove(), H(this.node, this.vm,
          function () { e && t.callHook(at), t.destroy(); });
      }
      function it(e, t) {
        this.inserted = !0; let r = this.vm, n = t !== !1 ? V : z; ce(this.node, this.end,
          function (t) { n(t, e, r); }), I(this.node) && this.callHook(st);
      }
      function ot() {
        this.inserted = !1; let e = this, t = I(this.node); this.beforeRemove(), le(this.node, this.end, this.vm, this.frag,
          function () { t && e.callHook(at), e.destroy(); });
      }
      function st(e) { !e._isAttached && I(e.$el) && e._callHook("attached"); }
      function at(e) { e._isAttached && !I(e.$el) && e._callHook("detached"); }
      function ct(e, t) {
        this.vm = e; let r, n = "string" == typeof t; n || oe(t) && !t.hasAttribute("v-if") ? r = et(t, !0) : (r = document.createDocumentFragment(), r.appendChild(t)), this.template = r; let i, o = e.constructor.cid; if (o > 0) {
          let s = o + (n ? t : he(t));
          i = Ui.get(s), i || (i = Pt(r, e.$options, !0), Ui.put(s, i));
        }
        else
          i = Pt(r, e.$options, !0); this.linker = i;
      }
      function lt(e, t, r) {
        let n = e.node.previousSibling; if (n) {
          for (e = n.__v_frag; !(e && e.forId === r && e.inserted || n === t);) {
            if (n = n.previousSibling, !n)
              return;
            e = n.__v_frag;
          }
          return e;
        }
      }
      function ut(e) {
        let t = e.node; if (e.end)
          for (; !t.__vue__ && t !== e.end && t.nextSibling;)
            t = t.nextSibling; return t.__vue__;
      }
      function ht(e) {
        for (let t = -1, r = new Array(Math.floor(e)); ++t < e;)
          r[t] = t; return r;
      }
      function pt(e, t, r, n) { return n ? "$index" === n ? e : n.charAt(0).match(/\w/) ? Se(r, n) : r[n] : t || r; }
      function ft(e, t, r) {
        for (let n, i, o, s = t ? [] : null, a = 0, c = e.options.length; a < c; a++)
          if (n = e.options[a], o = r ? n.hasAttribute("selected") : n.selected) {
            if (i = n.hasOwnProperty("_value") ? n._value : n.value, !t)
              return i;
            s.push(i);
          } return s;
      }
      function dt(e, t) {
        for (let r = e.length; r--;)
          if (C(e[r], t))
            return r; return -1;
      }
      function vt(e, t) {
        let r = t.map(function (e) { let t = e.charCodeAt(0); return t > 47 && t < 58 ? parseInt(e, 10) : 1 === e.length && (t = e.toUpperCase().charCodeAt(0), t > 64 && t < 91) ? t : uo[e]; }); return r = [].concat.apply([], r),
          function (t) {
            if (r.indexOf(t.keyCode) > -1)
              return e.call(this, t);
          };
      }
      function mt(e) { return function (t) { return t.stopPropagation(), e.call(this, t); }; }
      function gt(e) { return function (t) { return t.preventDefault(), e.call(this, t); }; }
      function bt(e) {
        return function (t) {
          if (t.target === t.currentTarget)
            return e.call(this, t);
        };
      }
      function yt(e) {
        if (mo[e])
          return mo[e]; let t = wt(e); return mo[e] = mo[t] = t, t;
      }
      function wt(e) {
        e = d(e); let t = p(e), r = t.charAt(0).toUpperCase() + t.slice(1); go || (go = document.createElement("div")); let n, i = po.length; if ("filter" !== t && t in go.style)
          return { kebab: e, camel: t }; for (; i--;)
          if (n = fo[i] + r, n in go.style)
            return { kebab: po[i] + e, camel: n };
      }
      function _t(e) {
        let t = []; if (Pr(e))
          for (let r = 0, n = e.length; r < n; r++) {
            let i = e[r];
            if (i)
              if ("string" == typeof i)
                t.push(i);
              else
                for (let o in i)
                  i[o] && t.push(o);
          }
        else if (y(e))
          for (let s in e)
            e[s] && t.push(s); return t;
      }
      function xt(e, t, r) {
        if (t = t.trim(), t.indexOf(" ") === -1)
          return void r(e, t); for (let n = t.split(/\s+/), i = 0, o = n.length; i < o; i++)
          r(e, n[i]);
      }
      function Et(e, t, r) { function n() { ++o >= i ? r() : e[o].call(t, n); } let i = e.length, o = 0; e[0].call(t, n); }
      function kt(e, t, n) {
        for (let i, o, a, c, l, u, h, f = [], v = Object.keys(t), m = v.length; m--;)
          if (o = v[m], i = t[o] || So, "production" === r.env.NODE_ENV || "$data" !== o)
            if (l = p(o), Lo.test(l)) {
              if (h = { name: o, path: l, options: i, mode: $o.ONE_WAY, raw: null }, a = d(o), null === (c = U(e, a)) && (null !== (c = U(e, a + ".sync")) ? h.mode = $o.TWO_WAY : null !== (c = U(e, a + ".once")) && (h.mode = $o.ONE_TIME)), null !== c)
                h.raw = c, u = D(c), c = u.expression, h.filters = u.filters, s(c) && !u.filters ? h.optimizedLiteral = !0 : (h.dynamic = !0, "production" === r.env.NODE_ENV || h.mode !== $o.TWO_WAY || jo.test(c) || (h.mode = $o.ONE_WAY, $n("Cannot bind two-way prop with non-settable parent path: " + c, n))), h.parentPath = c, "production" !== r.env.NODE_ENV && i.twoWay && h.mode !== $o.TWO_WAY && $n('Prop "' + o + '" expects a two-way binding type.', n);
              else if (null !== (c = F(e, a)))
                h.raw = c;
              else if ("production" !== r.env.NODE_ENV) {
                let g = l.toLowerCase();
                c = /[A-Z\-]/.test(o) && (e.getAttribute(g) || e.getAttribute(":" + g) || e.getAttribute("v-bind:" + g) || e.getAttribute(":" + g + ".once") || e.getAttribute("v-bind:" + g + ".once") || e.getAttribute(":" + g + ".sync") || e.getAttribute("v-bind:" + g + ".sync")), c ? $n("Possible usage error for prop `" + g + "` - did you mean `" + a + "`? HTML is case-insensitive, remember to use kebab-case for props in templates.", n) : i.required && $n("Missing required prop: " + o, n);
              }
              f.push(h);
            }
            else
              "production" !== r.env.NODE_ENV && $n('Invalid prop key: "' + o + '". Prop keys must be valid identifiers.', n);
          else
            $n("Do not use $data as prop.", n); return Ct(f);
      }
      function Ct(e) {
        return function (t, r) {
          t._props = {}; for (let n, i, s, a, c, p = t.$options.propsData, f = e.length; f--;)
            if (n = e[f], c = n.raw, i = n.path, s = n.options, t._props[i] = n, p && o(p, i) && At(t, n, p[i]), null === c)
              At(t, n, void 0);
            else if (n.dynamic)
              n.mode === $o.ONE_TIME ? (a = (r || t._context || t).$get(n.parentPath), At(t, n, a)) : t._context ? t._bindDir({ name: "prop", def: Vo, prop: n }, null, null, r) : At(t, n, t.$get(n.parentPath));
            else if (n.optimizedLiteral) {
              let v = h(c);
              a = v === c ? u(l(c)) : v, At(t, n, a);
            }
            else
              a = s.type === Boolean && ("" === c || c === d(n.name)) || c, At(t, n, a);
        };
      }
      function Nt(e, t, r, n) { let i = t.dynamic && Ue(t.parentPath), o = r; void 0 === o && (o = Dt(e, t)), o = qt(t, o, e); let s = o !== r; Tt(t, o, e) || (o = void 0), i && !s ? xe(function () { n(o); }) : n(o); }
      function At(e, t, r) {
        Nt(e, t, r,
          function (r) { Ae(e, t.path, r); });
      }
      function Ot(e, t, r) {
        Nt(e, t, r,
          function (r) { e[t.path] = r; });
      }
      function Dt(e, t) {
        let n = t.options; if (!o(n, "default"))
          return n.type !== Boolean && void 0; let i = n["default"]; return y(i) && "production" !== r.env.NODE_ENV && $n('Invalid default value for prop "' + t.name + '": Props with type Object/Array must use a factory function to return the default value.', e), "function" == typeof i && n.type !== Function ? i.call(e) : i;
      }
      function Tt(e, t, n) {
        if (!e.options.required && (null === e.raw || null == t))
          return !0; let i = e.options, o = i.type, s = !o, a = []; if (o) {
            Pr(o) || (o = [o]);
            for (let c = 0; c < o.length && !s; c++) {
              let l = $t(t, o[c]);
              a.push(l.expectedType), s = l.valid;
            }
          } if (!s)
          return "production" !== r.env.NODE_ENV && $n('Invalid prop: type check failed for prop "' + e.name + '". Expected ' + a.map(St).join(", ") + ", got " + Lt(t) + ".", n), !1; let u = i.validator; return !(u && !u(t) && ("production" !== r.env.NODE_ENV && $n('Invalid prop: custom validator check failed for prop "' + e.name + '".', n), 1));
      }
      function qt(e, t, n) { let i = e.options.coerce; return i ? "function" == typeof i ? i(t) : ("production" !== r.env.NODE_ENV && $n('Invalid coerce for prop "' + e.name + '": expected function, got ' + typeof i + ".", n), t) : t; }
      function $t(e, t) { let r, n; return t === String ? (n = "string", r = typeof e === n) : t === Number ? (n = "number", r = typeof e === n) : t === Boolean ? (n = "boolean", r = typeof e === n) : t === Function ? (n = "function", r = typeof e === n) : t === Object ? (n = "object", r = w(e)) : t === Array ? (n = "array", r = Pr(e)) : r = e instanceof t, { valid: r, expectedType: n }; }
      function St(e) { return e ? e.charAt(0).toUpperCase() + e.slice(1) : "custom type"; }
      function Lt(e) { return Object.prototype.toString.call(e).slice(8, -1); }
      function jt(e) { Ho.push(e), Po || (Po = !0, nn(Rt)); }
      function Rt() {
        for (let e = document.documentElement.offsetHeight, t = 0; t < Ho.length; t++)
          Ho[t](); return Ho = [], Po = !1, e;
      }
      function Vt(e, t, n, i) { this.id = t, this.el = e, this.enterClass = n && n.enterClass || t + "-enter", this.leaveClass = n && n.leaveClass || t + "-leave", this.hooks = n, this.vm = i, this.pendingCssEvent = this.pendingCssCb = this.cancel = this.pendingJsCb = this.op = this.cb = null, this.justEntered = !1, this.entered = this.left = !1, this.typeCache = {}, this.type = n && n.type, "production" !== r.env.NODE_ENV && this.type && this.type !== Mo && this.type !== Io && $n('invalid CSS transition type for transition="' + this.id + '": ' + this.type, i); let o = this;["enterNextTick", "enterDone", "leaveNextTick", "leaveDone"].forEach(function (e) { o[e] = m(o[e], o); }); }
      function Ht(e) {
        if (/svg$/.test(e.namespaceURI)) {
          let t = e.getBoundingClientRect();
          return !(t.width || t.height);
        } return !(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
      }
      function Pt(e, t, r) { let n = r || !t._asComponent ? Wt(e, t) : null, i = n && n.terminal || lr(e) || !e.hasChildNodes() ? null : Xt(e.childNodes, t); return function (e, t, r, o, s) { let a = g(t.childNodes), c = Mt(function () { n && n(e, t, r, o, s), i && i(e, a, r, o, s); }, e); return Ft(e, c); }; }
      function Mt(e, t) {
        "production" === r.env.NODE_ENV && (t._directives = []); let n = t._directives.length; e(); let i = t._directives.slice(n); i.sort(It); for (let o = 0, s = i.length; o < s; o++)
          i[o]._bind(); return i;
      }
      function It(e, t) { return e = e.descriptor.def.priority || es, t = t.descriptor.def.priority || es, e > t ? -1 : e === t ? 0 : 1; }
      function Ft(e, t, r, n) { function i(i) { Ut(e, t, i), r && n && Ut(r, n); } return i.dirs = t, i; }
      function Ut(e, t, n) {
        for (let i = t.length; i--;)
          t[i]._teardown(), "production" === r.env.NODE_ENV || n || e._directives.$remove(t[i]);
      }
      function Bt(e, t, r, n) { let i = kt(t, r, e), o = Mt(function () { i(e, n); }, e); return Ft(e, o); }
      function zt(e, t, n) {
        let i, o, s = t._containerAttrs, a = t._replacerAttrs; if (11 !== e.nodeType)
          t._asComponent ? (s && n && (i = or(s, n)), a && (o = or(a, t))) : o = or(e.attributes, t);
        else if ("production" !== r.env.NODE_ENV && s) {
          let c = s.filter(function (e) { return e.name.indexOf("_v-") < 0 && !Zo.test(e.name) && "slot" !== e.name; }).map(function (e) { return '"' + e.name + '"'; });
          if (c.length) {
            let l = c.length > 1;
            $n("Attribute" + (l ? "s " : " ") + c.join(", ") + (l ? " are" : " is") + " ignored on component <" + t.el.tagName.toLowerCase() + "> because the component is a fragment instance: http://vuejs.org/guide/components.html#Fragment-Instance");
          }
        } return t._containerAttrs = t._replacerAttrs = null,
          function (e, t, r) { let n, s = e._context; s && i && (n = Mt(function () { i(s, t, null, r); }, s)); let a = Mt(function () { o && o(e, t); }, e); return Ft(e, a, s, n); };
      }
      function Wt(e, t) { let r = e.nodeType; return 1 !== r || lr(e) ? 3 === r && e.data.trim() ? Jt(e, t) : null : Gt(e, t); }
      function Gt(e, t) {
        if ("TEXTAREA" === e.tagName) {
          let r = $(e.value);
          r && (e.setAttribute(":value", S(r)), e.value = "");
        } let n, i = e.hasAttributes(), o = i && g(e.attributes); return i && (n = rr(e, o, t)), n || (n = er(e, t)), n || (n = tr(e, t)), !n && i && (n = or(o, t)), n;
      }
      function Jt(e, t) {
        if (e._skip)
          return Yt; let r = $(e.wholeText); if (!r)
          return null; for (let n = e.nextSibling; n && 3 === n.nodeType;)
          n._skip = !0, n = n.nextSibling; for (let i, o, s = document.createDocumentFragment(), a = 0, c = r.length; a < c; a++)
          o = r[a], i = o.tag ? Zt(o, t) : document.createTextNode(o.value), s.appendChild(i); return Qt(r, s, t);
      }
      function Yt(e, t) { G(t); }
      function Zt(e, t) {
        function r(t) {
          if (!e.descriptor) {
            let r = D(e.value);
            e.descriptor = { name: t, def: Do[t], expression: r.expression, filters: r.filters };
          }
        } let n; return e.oneTime ? n = document.createTextNode(e.value) : e.html ? (n = document.createComment("v-html"), r("html")) : (n = document.createTextNode(" "), r("text")), n;
      }
      function Qt(e, t) {
        return function (r, n, i, o) {
          for (let s, a, l, u = t.cloneNode(!0), h = g(u.childNodes), p = 0, f = e.length; p < f; p++)
            s = e[p], a = s.value, s.tag && (l = h[p], s.oneTime ? (a = (o || r).$eval(a), s.html ? Y(l, et(a, !0)) : l.data = c(a)) : r._bindDir(s.descriptor, l, i, o)); Y(n, u);
        };
      }
      function Xt(e, t) {
        for (let r, n, i, o = [], s = 0, a = e.length; s < a; s++)
          i = e[s], r = Wt(i, t), n = r && r.terminal || "SCRIPT" === i.tagName || !i.hasChildNodes() ? null : Xt(i.childNodes, t), o.push(r, n); return o.length ? Kt(o) : null;
      }
      function Kt(e) {
        return function (t, r, n, i, o) {
          for (let s, a, c, l = 0, u = 0, h = e.length; l < h; u++) {
            s = r[u], a = e[l++], c = e[l++];
            let p = g(s.childNodes);
            a && a(t, s, n, i, o), c && c(t, p, n, i, o);
          }
        };
      }
      function er(e, t) {
        let r = e.tagName.toLowerCase(); if (!Rn.test(r)) {
          let n = we(t, "elementDirectives", r);
          return n ? ir(e, r, "", t, n) : void 0;
        }
      }
      function tr(e, t) {
        let r = pe(e, t); if (r) {
          let n = ae(e), i = { name: "component", ref: n, expression: r.id, def: Jo.component, modifiers: { literal: !r.dynamic } }, o = function (e, t, r, o, s) { n && Ae((o || e).$refs, n, null), e._bindDir(i, t, r, o, s); };
          return o.terminal = !0, o;
        }
      }
      function rr(e, t, r) {
        if (null !== F(e, "v-pre"))
          return nr; if (e.hasAttribute("v-else")) {
            let n = e.previousElementSibling;
            if (n && n.hasAttribute("v-if"))
              return nr;
          } for (let i, o, s, a, c, l, u, h, p, f, d = 0, v = t.length; d < v; d++)
          i = t[d], o = i.name.replace(Xo, ""), (c = o.match(Qo)) && (p = we(r, "directives", c[1]), p && p.terminal && (!f || (p.priority || ts) > f.priority) && (f = p, u = i.name, a = sr(i.name), s = i.value, l = c[1], h = c[2])); return f ? ir(e, l, s, r, f, u, h, a) : void 0;
      }
      function nr() { }
      function ir(e, t, r, n, i, o, s, a) { let c = D(r), l = { name: t, arg: s, expression: c.expression, filters: c.filters, raw: r, attr: o, modifiers: a, def: i }; "for" !== t && "router-view" !== t || (l.ref = ae(e)); let u = function (e, t, r, n, i) { l.ref && Ae((n || e).$refs, l.ref, null), e._bindDir(l, t, r, n, i); }; return u.terminal = !0, u; }
      function or(e, t) {
        function n(e, t, r) { let n = r && cr(r), i = !n && D(s); m.push({ name: e, attr: a, raw: c, def: t, arg: u, modifiers: h, expression: i && i.expression, filters: i && i.filters, interp: r, hasOneTime: n }); } for (let i, o, s, a, c, l, u, h, p, f, d, v = e.length, m = []; v--;)
          if (i = e[v], o = a = i.name, s = c = i.value, f = $(s), u = null, h = sr(o), o = o.replace(Xo, ""), f)
            s = S(f), u = o, n("bind", Do.bind, f), "production" !== r.env.NODE_ENV && "class" === o && Array.prototype.some.call(e,
              function (e) { return ":class" === e.name || "v-bind:class" === e.name; }) && $n('class="' + c + '": Do not mix mustache interpolation and v-bind for "class" on the same element. Use one or the other.', t);
          else if (Ko.test(o))
            h.literal = !Yo.test(o), n("transition", Jo.transition);
          else if (Zo.test(o))
            u = o.replace(Zo, ""), n("on", Do.on);
          else if (Yo.test(o))
            l = o.replace(Yo, ""), "style" === l || "class" === l ? n(l, Jo[l]) : (u = l, n("bind", Do.bind));
          else if (d = o.match(Qo)) {
            if (l = d[1], u = d[2], "else" === l)
              continue;
            p = we(t, "directives", l, !0), p && n(l, p);
          } if (m.length)
          return ar(m);
      }
      function sr(e) {
        let t = Object.create(null), r = e.match(Xo); if (r)
          for (let n = r.length; n--;)
            t[r[n].slice(1)] = !0; return t;
      }
      function ar(e) {
        return function (t, r, n, i, o) {
          for (let s = e.length; s--;)
            t._bindDir(e[s], r, n, i, o);
        };
      }
      function cr(e) {
        for (let t = e.length; t--;)
          if (e[t].oneTime)
            return !0;
      }
      function lr(e) { return "SCRIPT" === e.tagName && (!e.hasAttribute("type") || "text/javascript" === e.getAttribute("type")); }
      function ur(e, t) { return t && (t._containerAttrs = pr(e)), oe(e) && (e = et(e)), t && (t._asComponent && !t.template && (t.template = "<slot></slot>"), t.template && (t._content = re(e), e = hr(e, t))), ue(e) && (J(se("v-start", !0), e), e.appendChild(se("v-end", !0))), e; }
      function hr(e, t) {
        let n = t.template, i = et(n, !0); if (i) {
          let o = i.firstChild, s = o.tagName && o.tagName.toLowerCase();
          return t.replace ? (e === document.body && "production" !== r.env.NODE_ENV && $n("You are mounting an instance with a template to <body>. This will replace <body> entirely. You should probably use `replace: false` here."), i.childNodes.length > 1 || 1 !== o.nodeType || "component" === s || we(t, "components", s) || B(o, "is") || we(t, "elementDirectives", s) || o.hasAttribute("v-for") || o.hasAttribute("v-if") ? i : (t._replacerAttrs = pr(o), fr(e, o), o)) : (e.appendChild(i), e);
        } "production" !== r.env.NODE_ENV && $n("Invalid template option: " + n);
      }
      function pr(e) {
        if (1 === e.nodeType && e.hasAttributes())
          return g(e.attributes);
      }
      function fr(e, t) {
        for (let r, n, i = e.attributes, o = i.length; o--;)
          r = i[o].name, n = i[o].value, t.hasAttribute(r) || rs.test(r) ? "class" === r && !$(n) && (n = n.trim()) && n.split(/\s+/).forEach(function (e) { ee(t, e); }) : t.setAttribute(r, n);
      }
      function dr(e, t) {
        if (t) {
          for (let n, i, o = e._slotContents = Object.create(null), s = 0, a = t.children.length; s < a; s++)
            n = t.children[s], (i = n.getAttribute("slot")) && (o[i] || (o[i] = [])).push(n), "production" !== r.env.NODE_ENV && U(n, "slot") && $n('The "slot" attribute must be static.', e.$parent);
          for (i in o)
            o[i] = vr(o[i], t);
          if (t.hasChildNodes()) {
            let c = t.childNodes;
            if (1 === c.length && 3 === c[0].nodeType && !c[0].data.trim())
              return;
            o["default"] = vr(t.childNodes, t);
          }
        }
      }
      function vr(e, t) {
        let r = document.createDocumentFragment(); e = g(e); for (let n = 0, i = e.length; n < i; n++) {
          let o = e[n];
          !oe(o) || o.hasAttribute("v-if") || o.hasAttribute("v-for") || (t.removeChild(o), o = et(o, !0)), r.appendChild(o);
        } return r;
      }
      function mr(e) {
        function t() { }
        function n(e, t) {
          let r = new Je(t, e, null, { lazy: !0 });
          return function () {
            return r.dirty && r.evaluate(),
              _e.target && r.depend(), r.value;
          };
        }
        Object.defineProperty(e.prototype, "$data", { get() { return this._data; }, set(e) { e !== this._data && this._setData(e); } }), e.prototype._initState = function () { this._initProps(), this._initMeta(), this._initMethods(), this._initData(), this._initComputed(); }, e.prototype._initProps = function () { let e = this.$options, t = e.el, n = e.props; n && !t && "production" !== r.env.NODE_ENV && $n("Props will not be compiled if no `el` option is provided at instantiation.", this), t = e.el = M(t), this._propsUnlinkFn = t && 1 === t.nodeType && n ? Bt(this, t, n, this._scope) : null; }, e.prototype._initData = function () {
          let e = this.$options.data, t = this._data = e ? e() : {}; w(t) || (t = {}, "production" !== r.env.NODE_ENV && $n("data functions should return an object.", this)); let n, i, s = this._props, a = Object.keys(t); for (n = a.length; n--;)
            i = a[n], s && o(s, i) ? "production" !== r.env.NODE_ENV && $n('Data field "' + i + '" is already defined as a prop. To provide default value for a prop, use the "default" prop option; if you want to pass prop values to an instantiation call, use the "propsData" option.', this) : this._proxy(i); Ne(t, this);
        }, e.prototype._setData = function (e) {
          e = e || {}; let t = this._data; this._data = e; let r, n, i; for (r = Object.keys(t), i = r.length; i--;)
            n = r[i], n in e || this._unproxy(n); for (r = Object.keys(e), i = r.length; i--;)
            n = r[i], o(this, n) || this._proxy(n); t.__ob__.removeVm(this), Ne(e, this), this._digest();
        }, e.prototype._proxy = function (e) {
          if (!a(e)) {
            let t = this;
            Object.defineProperty(t, e, { configurable: !0, enumerable: !0, get() { return t._data[e]; }, set(r) { t._data[e] = r; } });
          }
        }, e.prototype._unproxy = function (e) { a(e) || delete this[e]; }, e.prototype._digest = function () {
          for (let e = 0, t = this._watchers.length; e < t; e++)
            this._watchers[e].update(!0);
        }, e.prototype._initComputed = function () {
          let e = this.$options.computed; if (e)
            for (let r in e) {
              let i = e[r], o = { enumerable: !0, configurable: !0 };
              "function" == typeof i ? (o.get = n(i, this), o.set = t) : (o.get = i.get ? i.cache !== !1 ? n(i.get, this) : m(i.get, this) : t, o.set = i.set ? m(i.set, this) : t), Object.defineProperty(this, r, o);
            }
        }, e.prototype._initMethods = function () {
          let e = this.$options.methods; if (e)
            for (let t in e)
              this[t] = m(e[t], this);
        }, e.prototype._initMeta = function () {
          let e = this.$options._meta; if (e)
            for (let t in e)
              Ae(this, t, e[t]);
        };
      }
      function gr(e) {
        function t(e, t) {
          for (let r, n, i, o = t.attributes, s = 0, a = o.length; s < a; s++)
            r = o[s].name, is.test(r) && (r = r.replace(is, ""), n = o[s].value, Ue(n) && (n += ".apply(this, $arguments)"), i = (e._scope || e._context).$eval(n, !0), i._fromParent = !0, e.$on(r.replace(is), i));
        }
        function n(e, t, r) {
          if (r) {
            let n, o, s, a;
            for (o in r)
              if (n = r[o], Pr(n))
                for (s = 0, a = n.length; s < a; s++)
                  i(e, t, o, n[s]);
              else
                i(e, t, o, n);
          }
        }
        function i(e, t, n, o, s) {
          let a = typeof o; if ("function" === a)
            e[t](n, o, s);
          else if ("string" === a) {
            let c = e.$options.methods, l = c && c[o];
            l ? e[t](n, l, s) : "production" !== r.env.NODE_ENV && $n('Unknown method: "' + o + '" when registering callback for ' + t + ': "' + n + '".', e);
          }
          else
            o && "object" === a && i(e, t, n, o.handler, o);
        }
        function o() { this._isAttached || (this._isAttached = !0, this.$children.forEach(s)); }
        function s(e) { !e._isAttached && I(e.$el) && e._callHook("attached"); }
        function a() { this._isAttached && (this._isAttached = !1, this.$children.forEach(c)); }
        function c(e) { e._isAttached && !I(e.$el) && e._callHook("detached"); } e.prototype._initEvents = function () { let e = this.$options; e._asComponent && t(this, e.el), n(this, "$on", e.events), n(this, "$watch", e.watch); }, e.prototype._initDOMHooks = function () { this.$on("hook:attached", o), this.$on("hook:detached", a); }, e.prototype._callHook = function (e) {
          this.$emit("pre-hook:" + e); let t = this.$options[e]; if (t)
            for (let r = 0, n = t.length; r < n; r++)
              t[r].call(this); this.$emit("hook:" + e);
        };
      }
      function br() { }
      function yr(e, t, n, i, o, s) { this.vm = t, this.el = n, this.descriptor = e, this.name = e.name, this.expression = e.expression, this.arg = e.arg, this.modifiers = e.modifiers, this.filters = e.filters, this.literal = this.modifiers && this.modifiers.literal, this._locked = !1, this._bound = !1, this._listeners = null, this._host = i, this._scope = o, this._frag = s, "production" !== r.env.NODE_ENV && this.el && (this.el._vue_directives = this.el._vue_directives || [], this.el._vue_directives.push(this)); }
      function wr(e) {
        e.prototype._updateRef = function (e) {
          let t = this.$options._ref; if (t) {
            let r = (this._scope || this._context).$refs;
            e ? r[t] === this && (r[t] = null) : r[t] = this;
          }
        }, e.prototype._compile = function (e) {
          let t = this.$options, r = e; if (e = ur(e, t), this._initElement(e), 1 !== e.nodeType || null === F(e, "v-pre")) {
            let n = this._context && this._context.$options, i = zt(e, t, n);
            dr(this, t._content);
            let o, s = this.constructor;
            t._linkerCachable && (o = s.linker, o || (o = s.linker = Pt(e, t)));
            let a = i(this, e, this._scope), c = o ? o(this, e) : Pt(e, t)(this, e);
            this._unlinkFn = function () { a(), c(!0); }, t.replace && Y(r, e), this._isCompiled = !0, this._callHook("compiled");
          }
        }, e.prototype._initElement = function (e) { ue(e) ? (this._isFragment = !0, this.$el = this._fragmentStart = e.firstChild, this._fragmentEnd = e.lastChild, 3 === this._fragmentStart.nodeType && (this._fragmentStart.data = this._fragmentEnd.data = ""), this._fragment = e) : this.$el = e, this.$el.__vue__ = this, this._callHook("beforeCompile"); }, e.prototype._bindDir = function (e, t, r, n, i) { this._directives.push(new yr(e, this, t, r, n, i)); }, e.prototype._destroy = function (e, t) {
          if (this._isBeingDestroyed)
            return void (t || this._cleanup()); let r, n, i = this, o = function () { !r || n || t || i._cleanup(); }; e && this.$el && (n = !0, this.$remove(function () { n = !1, o(); })), this._callHook("beforeDestroy"), this._isBeingDestroyed = !0; let s, a = this.$parent; for (a && !a._isBeingDestroyed && (a.$children.$remove(this), this._updateRef(!0)), s = this.$children.length; s--;)
            this.$children[s].$destroy(); for (this._propsUnlinkFn && this._propsUnlinkFn(), this._unlinkFn && this._unlinkFn(), s = this._watchers.length; s--;)
            this._watchers[s].teardown(); this.$el && (this.$el.__vue__ = null), r = !0, o();
        }, e.prototype._cleanup = function () { this._isDestroyed || (this._frag && this._frag.children.$remove(this), this._data && this._data.__ob__ && this._data.__ob__.removeVm(this), this.$el = this.$parent = this.$root = this.$children = this._watchers = this._context = this._scope = this._directives = null, this._isDestroyed = !0, this._callHook("destroyed"), this.$off()); };
      }
      function _r(e) {
        e.prototype._applyFilters = function (e, t, r, n) {
          let i, o, s, a, c, l, u, h, p; for (l = 0, u = r.length; l < u; l++)
            if (i = r[n ? u - l - 1 : l], o = we(this.$options, "filters", i.name, !0), o && (o = n ? o.write : o.read || o, "function" == typeof o)) {
              if (s = n ? [e, t] : [e], c = n ? 2 : 1, i.args)
                for (h = 0, p = i.args.length; h < p; h++)
                  a = i.args[h], s[h + c] = a.dynamic ? this.$get(a.value) : a.value;
              e = o.apply(this, s);
            } return e;
        }, e.prototype._resolveComponent = function (t, n) {
          let i; if (i = "function" == typeof t ? t : we(this.$options, "components", t, !0))
            if (i.options)
              n(i);
            else if (i.resolved)
              n(i.resolved);
            else if (i.requested)
              i.pendingCallbacks.push(n);
            else {
              i.requested = !0;
              let o = i.pendingCallbacks = [n];
              i.call(this,
                function (t) {
                  w(t) && (t = e.extend(t)), i.resolved = t; for (let r = 0, n = o.length; r < n; r++)
                    o[r](t);
                },
                function (e) { "production" !== r.env.NODE_ENV && $n("Failed to resolve async component" + ("string" == typeof t ? ": " + t : "") + ". " + (e ? "\nReason: " + e : "")); });
            }
        };
      }
      function xr(e) {
        function t(e) { return JSON.parse(JSON.stringify(e)); } e.prototype.$get = function (e, t) {
          let r = Fe(e); if (r) {
            if (t) {
              let n = this;
              return function () { n.$arguments = g(arguments); let e = r.get.call(n, n); return n.$arguments = null, e; };
            }
            try {
              return r.get.call(this, this);
            }
            catch (i) { }
          }
        }, e.prototype.$set = function (e, t) { let r = Fe(e, !0); r && r.set && r.set.call(this, this, t); }, e.prototype.$delete = function (e) { i(this._data, e); }, e.prototype.$watch = function (e, t, r) {
          let n, i = this; "string" == typeof e && (n = D(e), e = n.expression); let o = new Je(i, e, t, { deep: r && r.deep, sync: r && r.sync, filters: n && n.filters, user: !r || r.user !== !1 }); return r && r.immediate && t.call(i, o.value),
            function () { o.teardown(); };
        }, e.prototype.$eval = function (e, t) {
          if (os.test(e)) {
            let r = D(e), n = this.$get(r.expression, t);
            return r.filters ? this._applyFilters(n, null, r.filters) : n;
          } return this.$get(e, t);
        }, e.prototype.$interpolate = function (e) { let t = $(e), r = this; return t ? 1 === t.length ? r.$eval(t[0].value) + "" : t.map(function (e) { return e.tag ? r.$eval(e.value) : e.value; }).join("") : e; }, e.prototype.$log = function (e) {
          let r = e ? Se(this._data, e) : this._data; if (r && (r = t(r)), !e) {
            let n;
            for (n in this.$options.computed)
              r[n] = t(this[n]);
            if (this._props)
              for (n in this._props)
                r[n] = t(this[n]);
          } console.log(r);
        };
      }
      function Er(e) {
        function t(e, t, n, i, o, s) {
          t = r(t); let a = !I(t), c = i === !1 || a ? o : s, l = !a && !e._isAttached && !I(e.$el); return e._isFragment ? (ce(e._fragmentStart, e._fragmentEnd,
            function (r) { c(r, t, e); }), n && n()) : c(e.$el, t, e, n), l && e._callHook("attached"), e;
        }
        function r(e) { return "string" == typeof e ? document.querySelector(e) : e; }
        function n(e, t, r, n) { t.appendChild(e), n && n(); }
        function i(e, t, r, n) { z(e, t), n && n(); }
        function o(e, t, r) { G(e), r && r(); } e.prototype.$nextTick = function (e) { nn(e, this); }, e.prototype.$appendTo = function (e, r, i) { return t(this, e, r, i, n, R); }, e.prototype.$prependTo = function (e, t, n) { return e = r(e), e.hasChildNodes() ? this.$before(e.firstChild, t, n) : this.$appendTo(e, t, n), this; }, e.prototype.$before = function (e, r, n) { return t(this, e, r, n, i, V); }, e.prototype.$after = function (e, t, n) { return e = r(e), e.nextSibling ? this.$before(e.nextSibling, t, n) : this.$appendTo(e.parentNode, t, n), this; }, e.prototype.$remove = function (e, t) {
          if (!this.$el.parentNode)
            return e && e(); let r = this._isAttached && I(this.$el); r || (t = !1); let n = this, i = function () { r && n._callHook("detached"), e && e(); }; if (this._isFragment)
            le(this._fragmentStart, this._fragmentEnd, this, this._fragment, i);
          else {
            let s = t === !1 ? o : H;
            s(this.$el, this, i);
          } return this;
        };
      }
      function kr(e) {
        function t(e, t, n) {
          let i = e.$parent; if (i && n && !r.test(t))
            for (; i;)
              i._eventsCount[t] = (i._eventsCount[t] || 0) + n, i = i.$parent;
        } e.prototype.$on = function (e, r) { return (this._events[e] || (this._events[e] = [])).push(r), t(this, e, 1), this; }, e.prototype.$once = function (e, t) { function r() { n.$off(e, r), t.apply(this, arguments); } let n = this; return r.fn = t, this.$on(e, r), this; }, e.prototype.$off = function (e, r) {
          let n; if (!arguments.length) {
            if (this.$parent)
              for (e in this._events)
                n = this._events[e], n && t(this, e, -n.length);
            return this._events = {}, this;
          } if (n = this._events[e], !n)
            return this; if (1 === arguments.length)
            return t(this, e, -n.length), this._events[e] = null, this; for (let i, o = n.length; o--;)
            if (i = n[o], i === r || i.fn === r) {
              t(this, e, -1), n.splice(o, 1);
              break;
            } return this;
        }, e.prototype.$emit = function (e) {
          let t = "string" == typeof e; e = t ? e : e.name; let r = this._events[e], n = t || !r; if (r) {
            r = r.length > 1 ? g(r) : r;
            let i = t && r.some(function (e) { return e._fromParent; });
            i && (n = !1);
            for (let o = g(arguments, 1), s = 0, a = r.length; s < a; s++) {
              let c = r[s], l = c.apply(this, o);
              l !== !0 || i && !c._fromParent || (n = !0);
            }
          } return n;
        }, e.prototype.$broadcast = function (e) {
          let t = "string" == typeof e; if (e = t ? e : e.name, this._eventsCount[e]) {
            let r = this.$children, n = g(arguments);
            t && (n[0] = { name: e, source: this });
            for (let i = 0, o = r.length; i < o; i++) {
              let s = r[i], a = s.$emit.apply(s, n);
              a && s.$broadcast.apply(s, n);
            }
            return this;
          }
        }, e.prototype.$dispatch = function (e) {
          let t = this.$emit.apply(this, arguments); if (t) {
            let r = this.$parent, n = g(arguments);
            for (n[0] = { name: e, source: this }; r;)
              t = r.$emit.apply(r, n), r = t ? r.$parent : null;
            return this;
          }
        }; let r = /^hook:/;
      }
      function Cr(e) { function t() { this._isAttached = !0, this._isReady = !0, this._callHook("ready"); } e.prototype.$mount = function (e) { return this._isCompiled ? void ("production" !== r.env.NODE_ENV && $n("$mount() should be called only once.", this)) : (e = M(e), e || (e = document.createElement("div")), this._compile(e), this._initDOMHooks(), I(this.$el) ? (this._callHook("attached"), t.call(this)) : this.$once("hook:attached", t), this); }, e.prototype.$destroy = function (e, t) { this._destroy(e, t); }, e.prototype.$compile = function (e, t, r, n) { return Pt(e, this.$options, !0)(this, e, t, r, n); }; }
      function Nr(e) { this._init(e); }
      function Ar(e, t, r) { return r = r ? parseInt(r, 10) : 0, t = l(t), "number" == typeof t ? e.slice(r, r + t) : e; }
      function Or(e, t, r) {
        if (e = ls(e), null == t)
          return e; if ("function" == typeof t)
          return e.filter(t); t = ("" + t).toLowerCase(); for (let n, i, o, s, a = "in" === r ? 3 : 2, c = Array.prototype.concat.apply([], g(arguments, a)), l = [], u = 0, h = e.length; u < h; u++)
          if (n = e[u], o = n && n.$value || n, s = c.length) {
            for (; s--;)
              if (i = c[s], "$key" === i && Tr(n.$key, t) || Tr(Se(o, i), t)) {
                l.push(n);
                break;
              }
          }
          else
            Tr(n, t) && l.push(n); return l;
      }
      function Dr(e) { function t(e, t, r) { let i = n[r]; return i && ("$key" !== i && (y(e) && "$value" in e && (e = e.$value), y(t) && "$value" in t && (t = t.$value)), e = y(e) ? Se(e, i) : e, t = y(t) ? Se(t, i) : t), e === t ? 0 : e > t ? o : -o; } let r = null, n = void 0; e = ls(e); let i = g(arguments, 1), o = i[i.length - 1]; "number" == typeof o ? (o = o < 0 ? -1 : 1, i = i.length > 1 ? i.slice(0, -1) : i) : o = 1; let s = i[0]; return s ? ("function" == typeof s ? r = function (e, t) { return s(e, t) * o; } : (n = Array.prototype.concat.apply([], i), r = function (e, i, o) { return o = o || 0, o >= n.length - 1 ? t(e, i, o) : t(e, i, o) || r(e, i, o + 1); }), e.slice().sort(r)) : e; }
      function Tr(e, t) {
        let r; if (w(e)) {
          let n = Object.keys(e);
          for (r = n.length; r--;)
            if (Tr(e[n[r]], t))
              return !0;
        }
        else if (Pr(e)) {
          for (r = e.length; r--;)
            if (Tr(e[r], t))
              return !0;
        }
        else if (null != e)
          return e.toString().toLowerCase().indexOf(t) > -1;
      }
      function qr(e) {
        function t(e) { return new Function("return function " + v(e) + " (options) { this._init(options) }")(); } e.options = { directives: Do, elementDirectives: cs, filters: hs, transitions: {}, components: {}, partials: {}, replace: !0 }, e.util = Wn, e.config = qn, e.set = n, e["delete"] = i, e.nextTick = nn, e.compiler = ns, e.FragmentFactory = ct, e.internalDirectives = Jo, e.parsers = { path: ui, text: On, template: Ii, directive: xn, expression: ki }, e.cid = 0; let o = 1; e.extend = function (e) {
          e = e || {}; let n = this, i = 0 === n.cid; if (i && e._Ctor)
            return e._Ctor; let s = e.name || n.options.name; "production" !== r.env.NODE_ENV && (/^[a-zA-Z][\w-]*$/.test(s) || ($n('Invalid component name: "' + s + '". Component names can only contain alphanumeric characaters and the hyphen.'), s = null)); let a = t(s || "VueComponent"); return a.prototype = Object.create(n.prototype), a.prototype.constructor = a, a.cid = o++, a.options = ye(n.options, e), a["super"] = n, a.extend = n.extend, qn._assetTypes.forEach(function (e) { a[e] = n[e]; }), s && (a.options.components[s] = a), i && (e._Ctor = a), a;
        }, e.use = function (e) {
          if (!e.installed) {
            let t = g(arguments, 1);
            return t.unshift(this), "function" == typeof e.install ? e.install.apply(e, t) : e.apply(null, t), e.installed = !0, this;
          }
        }, e.mixin = function (t) { e.options = ye(e.options, t); }, qn._assetTypes.forEach(function (t) { e[t] = function (n, i) { return i ? ("production" !== r.env.NODE_ENV && "component" === t && (Rn.test(n) || Vn.test(n)) && $n("Do not use built-in or reserved HTML elements as component id: " + n), "component" === t && w(i) && (i.name || (i.name = n), i = e.extend(i)), this.options[t + "s"][n] = i, i) : this.options[t + "s"][n]; }; }), b(e.transition, Ln);
      }
      let $r = Object.prototype.hasOwnProperty, Sr = /^\s?(true|false|-?[\d\.]+|'[^']*'|"[^"]*")\s?$/, Lr = /-(\w)/g, jr = /([a-z\d])([A-Z])/g, Rr = /(?:^|[-_\/])(\w)/g, Vr = Object.prototype.toString, Hr = "[object Object]", Pr = Array.isArray, Mr = "__proto__" in {}, Ir = "undefined" != typeof window && "[object Object]" !== Object.prototype.toString.call(window), Fr = Ir && window.__VUE_DEVTOOLS_GLOBAL_HOOK__, Ur = Ir && window.navigator.userAgent.toLowerCase(), Br = Ur && Ur.indexOf("trident") > 0, zr = Ur && Ur.indexOf("msie 9.0") > 0, Wr = Ur && Ur.indexOf("android") > 0, Gr = Ur && /(iphone|ipad|ipod|ios)/i.test(Ur), Jr = Gr && Ur.match(/os ([\d_]+)/), Yr = Jr && Jr[1].split("_"), Zr = Yr && Number(Yr[0]) >= 9 && Number(Yr[1]) >= 3 && !window.indexedDB, Qr = void 0, Xr = void 0, Kr = void 0, en = void 0;
      if (Ir && !zr) {
        let tn = void 0 === window.ontransitionend && void 0 !== window.onwebkittransitionend, rn = void 0 === window.onanimationend && void 0 !== window.onwebkitanimationend;
        Qr = tn ? "WebkitTransition" : "transition", Xr = tn ? "webkitTransitionEnd" : "transitionend", Kr = rn ? "WebkitAnimation" : "animation", en = rn ? "webkitAnimationEnd" : "animationend";
      }
      let nn = function () {
        function e() {
          i = !1; let e = n.slice(0); n = []; for (let t = 0; t < e.length; t++)
            e[t]();
        } let r, n = [], i = !1; if ("undefined" == typeof MutationObserver || Zr) {
          let o = Ir ? window : "undefined" != typeof t ? t : {};
          r = o.setImmediate || setTimeout;
        }
        else {
          let s = 1, a = new MutationObserver(e), c = document.createTextNode(s);
          a.observe(c, { characterData: !0 }), r = function () { s = (s + 1) % 2, c.data = s; };
        } return function (t, o) { let s = o ? function () { t.call(o); } : t; n.push(s), i || (i = !0, r(e, 0)); };
      }(), on = void 0;
      "undefined" != typeof Set && Set.toString().match(/native code/) ? on = Set : (on = function () { this.set = Object.create(null); }, on.prototype.has = function (e) { return void 0 !== this.set[e]; }, on.prototype.add = function (e) { this.set[e] = 1; }, on.prototype.clear = function () { this.set = Object.create(null); });
      let sn = N.prototype;
      sn.put = function (e, t) { let r, n = this.get(e, !0); return n || (this.size === this.limit && (r = this.shift()), n = { key: e }, this._keymap[e] = n, this.tail ? (this.tail.newer = n, n.older = this.tail) : this.head = n, this.tail = n, this.size++), n.value = t, r; }, sn.shift = function () { let e = this.head; return e && (this.head = this.head.newer, this.head.older = void 0, e.newer = e.older = void 0, this._keymap[e.key] = void 0, this.size--), e; }, sn.get = function (e, t) {
        let r = this._keymap[e]; if (void 0 !== r)
          return r === this.tail ? t ? r : r.value : (r.newer && (r === this.head && (this.head = r.newer), r.newer.older = r.older), r.older && (r.older.newer = r.newer), r.newer = void 0, r.older = this.tail, this.tail && (this.tail.newer = r), this.tail = r, t ? r : r.value);
      };
      let an, cn, ln, un, hn, pn, fn, dn, vn, mn, gn, bn, yn = new N(1e3), wn = /[^\s'"]+|'[^']*'|"[^"]*"/g, _n = /^in$|^-?\d+/, xn = Object.freeze({ parseDirective: D }), En = /[-.*+?^${}()|[\]\/\\]/g, kn = void 0, Cn = void 0, Nn = void 0, An = /[^|]\|[^|]/, On = Object.freeze({ compileRegex: q, parseText: $, tokensToExp: S }), Dn = ["{{", "}}"], Tn = ["{{{", "}}}"], qn = Object.defineProperties({ debug: !1, silent: !1, async: !0, warnExpressionErrors: !0, devtools: "production" !== r.env.NODE_ENV, _delimitersChanged: !0, _assetTypes: ["component", "directive", "elementDirective", "filter", "transition", "partial"], _propBindingModes: { ONE_WAY: 0, TWO_WAY: 1, ONE_TIME: 2 }, _maxUpdateCount: 100 }, { delimiters: { get() { return Dn; }, set(e) { Dn = e, q(); }, configurable: !0, enumerable: !0 }, unsafeDelimiters: { get() { return Tn; }, set(e) { Tn = e, q(); }, configurable: !0, enumerable: !0 } }), $n = void 0, Sn = void 0;
      "production" !== r.env.NODE_ENV && !function () { let e = "undefined" != typeof console; $n = function (t, r) { e && !qn.silent && console.error("[Vue warn]: " + t + (r ? Sn(r) : "")); }, Sn = function (e) { let t = e._isVue ? e.$options.name : e.name; return t ? " (found in component: <" + d(t) + ">)" : ""; }; }();
      let Ln = Object.freeze({ appendWithTransition: R, beforeWithTransition: V, removeWithTransition: H, applyTransition: P }), jn = /^v-ref:/, Rn = /^(div|p|span|img|a|b|i|br|ul|ol|li|h1|h2|h3|h4|h5|h6|code|pre|table|th|td|tr|form|label|input|select|option|nav|article|section|header|footer)$/i, Vn = /^(slot|partial|component)$/i, Hn = void 0;
      "production" !== r.env.NODE_ENV && (Hn = function (e, t) { return t.indexOf("-") > -1 ? e.constructor === window.HTMLUnknownElement || e.constructor === window.HTMLElement : /HTMLUnknownElement/.test(e.toString()) && !/^(data|time|rtc|rb|details|dialog|summary)$/.test(t); });
      let Pn = qn.optionMergeStrategies = Object.create(null);
      Pn.data = function (e, t, n) { return n ? e || t ? function () { let r = "function" == typeof t ? t.call(n) : t, i = "function" == typeof e ? e.call(n) : void 0; return r ? de(r, i) : i; } : void 0 : t ? "function" != typeof t ? ("production" !== r.env.NODE_ENV && $n('The "data" option should be a function that returns a per-instance value in component definitions.', n), e) : e ? function () { return de(t.call(this), e.call(this)); } : t : e; }, Pn.el = function (e, t, n) {
        if (!n && t && "function" != typeof t)
          return void ("production" !== r.env.NODE_ENV && $n('The "el" option should be a function that returns a per-instance value in component definitions.', n)); let i = t || e; return n && "function" == typeof i ? i.call(n) : i;
      }, Pn.init = Pn.created = Pn.ready = Pn.attached = Pn.detached = Pn.beforeCompile = Pn.compiled = Pn.beforeDestroy = Pn.destroyed = Pn.activate = function (e, t) { return t ? e ? e.concat(t) : Pr(t) ? t : [t] : e; }, qn._assetTypes.forEach(function (e) { Pn[e + "s"] = ve; }), Pn.watch = Pn.events = function (e, t) {
        if (!t)
          return e; if (!e)
          return t; let r = {}; b(r, e); for (let n in t) {
            let i = r[n], o = t[n];
            i && !Pr(i) && (i = [i]), r[n] = i ? i.concat(o) : [o];
          } return r;
      }, Pn.props = Pn.methods = Pn.computed = function (e, t) {
        if (!t)
          return e; if (!e)
          return t; let r = Object.create(null); return b(r, e), b(r, t), r;
      };
      let Mn = function (e, t) { return void 0 === t ? e : t; }, In = 0;
      _e.target = null, _e.prototype.addSub = function (e) { this.subs.push(e); }, _e.prototype.removeSub = function (e) { this.subs.$remove(e); }, _e.prototype.depend = function () { _e.target.addDep(this); }, _e.prototype.notify = function () {
        for (let e = g(this.subs), t = 0, r = e.length; t < r; t++)
          e[t].update();
      };
      let Fn = Array.prototype, Un = Object.create(Fn);
      ["push", "pop", "shift", "unshift", "splice", "sort", "reverse"].forEach(function (e) {
        let t = Fn[e]; _(Un, e,
          function () {
            for (let r = arguments.length, n = new Array(r); r--;)
              n[r] = arguments[r]; let i, o = t.apply(this, n), s = this.__ob__; switch (e) {
                case "push":
                  i = n;
                  break;
                case "unshift":
                  i = n;
                  break;
                case "splice": i = n.slice(2);
              } return i && s.observeArray(i), s.dep.notify(), o;
          });
      }), _(Fn, "$set",
        function (e, t) { return e >= this.length && (this.length = Number(e) + 1), this.splice(e, 1, t)[0]; }), _(Fn, "$remove",
          function (e) {
            if (this.length) {
              let t = E(this, e);
              return t > -1 ? this.splice(t, 1) : void 0;
            }
          });
      let Bn = Object.getOwnPropertyNames(Un), zn = !0;
      Ee.prototype.walk = function (e) {
        for (let t = Object.keys(e), r = 0, n = t.length; r < n; r++)
          this.convert(t[r], e[t[r]]);
      }, Ee.prototype.observeArray = function (e) {
        for (let t = 0, r = e.length; t < r; t++)
          Ne(e[t]);
      }, Ee.prototype.convert = function (e, t) { Ae(this.value, e, t); }, Ee.prototype.addVm = function (e) { (this.vms || (this.vms = [])).push(e); }, Ee.prototype.removeVm = function (e) { this.vms.$remove(e); };
      let Wn = Object.freeze({ defineReactive: Ae, set: n, del: i, hasOwn: o, isLiteral: s, isReserved: a, _toString: c, toNumber: l, toBoolean: u, stripQuotes: h, camelize: p, hyphenate: d, classify: v, bind: m, toArray: g, extend: b, isObject: y, isPlainObject: w, def: _, debounce: x, indexOf: E, cancellable: k, looseEqual: C, isArray: Pr, hasProto: Mr, inBrowser: Ir, devtools: Fr, isIE: Br, isIE9: zr, isAndroid: Wr, isIos: Gr, iosVersionMatch: Jr, iosVersion: Yr, hasMutationObserverBug: Zr, get transitionProp() { return Qr; }, get transitionEndEvent() { return Xr; }, get animationProp() { return Kr; }, get animationEndEvent() { return en; }, nextTick: nn, get _Set() { return on; }, query: M, inDoc: I, getAttr: F, getBindAttr: U, hasBindAttr: B, before: z, after: W, remove: G, prepend: J, replace: Y, on: Z, off: Q, setClass: K, addClass: ee, removeClass: te, extractContent: re, trimNode: ne, isTemplate: oe, createAnchor: se, findRef: ae, mapNodeRange: ce, removeNodeRange: le, isFragment: ue, getOuterHTML: he, mergeOptions: ye, resolveAsset: we, checkComponentAttr: pe, commonTagRE: Rn, reservedTagRE: Vn, get warn() { return $n; } }), Gn = 0, Jn = new N(1e3), Yn = 0, Zn = 1, Qn = 2, Xn = 3, Kn = 0, ei = 1, ti = 2, ri = 3, ni = 4, ii = 5, oi = 6, si = 7, ai = 8, ci = [];
      ci[Kn] = { ws: [Kn], ident: [ri, Yn], "[": [ni], eof: [si] }, ci[ei] = { ws: [ei], ".": [ti], "[": [ni], eof: [si] }, ci[ti] = { ws: [ti], ident: [ri, Yn] }, ci[ri] = { ident: [ri, Yn], 0: [ri, Yn], number: [ri, Yn], ws: [ei, Zn], ".": [ti, Zn], "[": [ni, Zn], eof: [si, Zn] }, ci[ni] = { "'": [ii, Yn], '"': [oi, Yn], "[": [ni, Qn], "]": [ei, Xn], eof: ai, "else": [ni, Yn] }, ci[ii] = { "'": [ni, Yn], eof: ai, "else": [ii, Yn] }, ci[oi] = { '"': [ni, Yn], eof: ai, "else": [oi, Yn] };
      let li;
      "production" !== r.env.NODE_ENV && (li = function (e, t) { $n('You are setting a non-existent path "' + e.raw + '" on a vm instance. Consider pre-initializing the property with the "data" option for more reliable reactivity and better performance.', t); });
      let ui = Object.freeze({ parsePath: $e, getPath: Se, setPath: Le }), hi = new N(1e3), pi = "Math,Date,this,true,false,null,undefined,Infinity,NaN,isNaN,isFinite,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,parseInt,parseFloat", fi = new RegExp("^(" + pi.replace(/,/g, "\\b|") + "\\b)"), di = "break,case,class,catch,const,continue,debugger,default,delete,do,else,export,extends,finally,for,function,if,import,in,instanceof,let,return,super,switch,throw,try,var,while,with,yield,enum,await,implements,package,protected,static,interface,private,public", vi = new RegExp("^(" + di.replace(/,/g, "\\b|") + "\\b)"), mi = /\s/g, gi = /\n/g, bi = /[\{,]\s*[\w\$_]+\s*:|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`)|new |typeof |void /g, yi = /"(\d+)"/g, wi = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\]|\[[A-Za-z_$][\w$]*\])*$/, _i = /[^\w$\.](?:[A-Za-z_$][\w$]*)/g, xi = /^(?:true|false|null|undefined|Infinity|NaN)$/, Ei = [], ki = Object.freeze({ parseExpression: Fe, isSimplePath: Ue }), Ci = [], Ni = [], Ai = {}, Oi = {}, Di = !1, Ti = 0;
      Je.prototype.get = function () {
        this.beforeGet(); let e, t = this.scope || this.vm; try {
          e = this.getter.call(t, t);
        }
        catch (n) {
          "production" !== r.env.NODE_ENV && qn.warnExpressionErrors && $n('Error when evaluating expression "' + this.expression + '": ' + n.toString(), this.vm);
        } return this.deep && Ye(e), this.preProcess && (e = this.preProcess(e)), this.filters && (e = t._applyFilters(e, null, this.filters, !1)), this.postProcess && (e = this.postProcess(e)), this.afterGet(), e;
      }, Je.prototype.set = function (e) {
        let t = this.scope || this.vm; this.filters && (e = t._applyFilters(e, this.value, this.filters, !0)); try {
          this.setter.call(t, t, e);
        }
        catch (n) {
          "production" !== r.env.NODE_ENV && qn.warnExpressionErrors && $n('Error when evaluating setter "' + this.expression + '": ' + n.toString(), this.vm);
        } let i = t.$forContext; if (i && i.alias === this.expression) {
          if (i.filters)
            return void ("production" !== r.env.NODE_ENV && $n("It seems you are using two-way binding on a v-for alias (" + this.expression + "), and the v-for has filters. This will not work properly. Either remove the filters or use an array of objects and bind to object properties instead.", this.vm));
          i._withLock(function () { t.$key ? i.rawValue[t.$key] = e : i.rawValue.$set(t.$index, e); });
        }
      }, Je.prototype.beforeGet = function () { _e.target = this; }, Je.prototype.addDep = function (e) { let t = e.id; this.newDepIds.has(t) || (this.newDepIds.add(t), this.newDeps.push(e), this.depIds.has(t) || e.addSub(this)); }, Je.prototype.afterGet = function () {
        _e.target = null; for (let e = this.deps.length; e--;) {
          let t = this.deps[e];
          this.newDepIds.has(t.id) || t.removeSub(this);
        } let r = this.depIds; this.depIds = this.newDepIds, this.newDepIds = r, this.newDepIds.clear(), r = this.deps, this.deps = this.newDeps, this.newDeps = r, this.newDeps.length = 0;
      }, Je.prototype.update = function (e) { this.lazy ? this.dirty = !0 : this.sync || !qn.async ? this.run() : (this.shallow = this.queued ? !!e && this.shallow : !!e, this.queued = !0, "production" !== r.env.NODE_ENV && qn.debug && (this.prevError = new Error("[vue] async stack trace")), Ge(this)); }, Je.prototype.run = function () {
        if (this.active) {
          let e = this.get();
          if (e !== this.value || (y(e) || this.deep) && !this.shallow) {
            let t = this.value;
            this.value = e;
            let n = this.prevError;
            if ("production" !== r.env.NODE_ENV && qn.debug && n) {
              this.prevError = null;
              try {
                this.cb.call(this.vm, e, t);
              }
              catch (i) {
                throw nn(function () { throw n; }, 0), i;
              }
            }
            else
              this.cb.call(this.vm, e, t);
          }
          this.queued = this.shallow = !1;
        }
      }, Je.prototype.evaluate = function () { let e = _e.target; this.value = this.get(), this.dirty = !1, _e.target = e; }, Je.prototype.depend = function () {
        for (let e = this.deps.length; e--;)
          this.deps[e].depend();
      }, Je.prototype.teardown = function () {
        if (this.active) {
          this.vm._isBeingDestroyed || this.vm._vForRemoving || this.vm._watchers.$remove(this);
          for (let e = this.deps.length; e--;)
            this.deps[e].removeSub(this);
          this.active = !1, this.vm = this.cb = this.value = null;
        }
      };
      let qi = new on, $i = { bind() { this.attr = 3 === this.el.nodeType ? "data" : "textContent"; }, update(e) { this.el[this.attr] = c(e); } }, Si = new N(1e3), Li = new N(1e3), ji = { efault: [0, "", ""], legend: [1, "<fieldset>", "</fieldset>"], tr: [2, "<table><tbody>", "</tbody></table>"], col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"] };
      ji.td = ji.th = [3, "<table><tbody><tr>", "</tr></tbody></table>"], ji.option = ji.optgroup = [1, '<select multiple="multiple">', "</select>"], ji.thead = ji.tbody = ji.colgroup = ji.caption = ji.tfoot = [1, "<table>", "</table>"], ji.g = ji.defs = ji.symbol = ji.use = ji.image = ji.text = ji.circle = ji.ellipse = ji.line = ji.path = ji.polygon = ji.polyline = ji.rect = [1, '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ev="http://www.w3.org/2001/xml-events"version="1.1">', "</svg>"];
      let Ri = /<([\w:-]+)/, Vi = /&#?\w+?;/, Hi = /<!--/, Pi = function () {
        if (Ir) {
          let e = document.createElement("div");
          return e.innerHTML = "<template>1</template>", !e.cloneNode(!0).firstChild.innerHTML;
        } return !1;
      }(), Mi = function () {
        if (Ir) {
          let e = document.createElement("textarea");
          return e.placeholder = "t", "t" === e.cloneNode(!0).value;
        } return !1;
      }(), Ii = Object.freeze({ cloneNode: Ke, parseTemplate: et }), Fi = {
        bind() { 8 === this.el.nodeType && (this.nodes = [], this.anchor = se("v-html"), Y(this.el, this.anchor)); }, update(e) { e = c(e), this.nodes ? this.swap(e) : this.el.innerHTML = e; }, swap(e) {
          for (let t = this.nodes.length; t--;)
            G(this.nodes[t]); let r = et(e, !0, !0); this.nodes = g(r.childNodes), z(r, this.anchor);
        }
      };
      tt.prototype.callHook = function (e) {
        let t, r; for (t = 0, r = this.childFrags.length; t < r; t++)
          this.childFrags[t].callHook(e); for (t = 0, r = this.children.length; t < r; t++)
          e(this.children[t]);
      }, tt.prototype.beforeRemove = function () {
        let e, t; for (e = 0, t = this.childFrags.length; e < t; e++)
          this.childFrags[e].beforeRemove(!1); for (e = 0, t = this.children.length; e < t; e++)
          this.children[e].$destroy(!1, !0); let r = this.unlink.dirs; for (e = 0, t = r.length; e < t; e++)
          r[e]._watcher && r[e]._watcher.teardown();
      }, tt.prototype.destroy = function () { this.parentFrag && this.parentFrag.childFrags.$remove(this), this.node.__v_frag = null, this.unlink(); };
      let Ui = new N(5e3);
      ct.prototype.create = function (e, t, r) { let n = Ke(this.template); return new tt(this.linker, this.vm, n, e, t, r); };
      let Bi = 700, zi = 800, Wi = 850, Gi = 1100, Ji = 1500, Yi = 1500, Zi = 1750, Qi = 2100, Xi = 2200, Ki = 2300, eo = 0, to = {
        priority: Xi, terminal: !0, params: ["track-by", "stagger", "enter-stagger", "leave-stagger"], bind() {
          let e = this.expression.match(/(.*) (?:in|of) (.*)/); if (e) {
            let t = e[1].match(/\((.*),(.*)\)/);
            t ? (this.iterator = t[1].trim(), this.alias = t[2].trim()) : this.alias = e[1].trim(), this.expression = e[2];
          } if (!this.alias)
            return void ("production" !== r.env.NODE_ENV && $n('Invalid v-for expression "' + this.descriptor.raw + '": alias is required.', this.vm)); this.id = "__v-for__" + ++eo; let n = this.el.tagName; this.isOption = ("OPTION" === n || "OPTGROUP" === n) && "SELECT" === this.el.parentNode.tagName, this.start = se("v-for-start"), this.end = se("v-for-end"), Y(this.el, this.end), z(this.start, this.end), this.cache = Object.create(null), this.factory = new ct(this.vm, this.el);
        }, update(e) { this.diff(e), this.updateRef(), this.updateModel(); }, diff(e) {
          let t, r, n, i, s, a, c = e[0], l = this.fromObject = y(c) && o(c, "$key") && o(c, "$value"), u = this.params.trackBy, h = this.frags, p = this.frags = new Array(e.length), f = this.alias, d = this.iterator, v = this.start, m = this.end, g = I(v), b = !h; for (t = 0, r = e.length; t < r; t++)
            c = e[t], i = l ? c.$key : null, s = l ? c.$value : c, a = !y(s), n = !b && this.getCachedFrag(s, t, i), n ? (n.reused = !0, n.scope.$index = t, i && (n.scope.$key = i), d && (n.scope[d] = null !== i ? i : t), (u || l || a) && xe(function () { n.scope[f] = s; })) : (n = this.create(s, f, t, i), n.fresh = !b), p[t] = n, b && n.before(m); if (!b) {
              let w = 0, _ = h.length - p.length;
              for (this.vm._vForRemoving = !0, t = 0, r = h.length; t < r; t++)
                n = h[t], n.reused || (this.deleteCachedFrag(n), this.remove(n, w++, _, g));
              this.vm._vForRemoving = !1, w && (this.vm._watchers = this.vm._watchers.filter(function (e) { return e.active; }));
              let x, E, k, C = 0;
              for (t = 0, r = p.length; t < r; t++)
                n = p[t], x = p[t - 1], E = x ? x.staggerCb ? x.staggerAnchor : x.end || x.node : v, n.reused && !n.staggerCb ? (k = lt(n, v, this.id), k === x || k && lt(k, v, this.id) === x || this.move(n, E)) : this.insert(n, C++, E, g), n.reused = n.fresh = !1;
            }
        }, create(e, t, r, n) { let i = this._host, o = this._scope || this.vm, s = Object.create(o); s.$refs = Object.create(o.$refs), s.$els = Object.create(o.$els), s.$parent = o, s.$forContext = this, xe(function () { Ae(s, t, e); }), Ae(s, "$index", r), n ? Ae(s, "$key", n) : s.$key && _(s, "$key", null), this.iterator && Ae(s, this.iterator, null !== n ? n : r); let a = this.factory.create(i, s, this._frag); return a.forId = this.id, this.cacheFrag(e, a, r, n), a; }, updateRef() {
          let e = this.descriptor.ref; if (e) {
            let t, r = (this._scope || this.vm).$refs;
            this.fromObject ? (t = {}, this.frags.forEach(function (e) { t[e.scope.$key] = ut(e); })) : t = this.frags.map(ut), r[e] = t;
          }
        }, updateModel() {
          if (this.isOption) {
            let e = this.start.parentNode, t = e && e.__v_model;
            t && t.forceUpdate();
          }
        }, insert(e, t, r, n) {
          e.staggerCb && (e.staggerCb.cancel(), e.staggerCb = null); let i = this.getStagger(e, t, null, "enter"); if (n && i) {
            let o = e.staggerAnchor;
            o || (o = e.staggerAnchor = se("stagger-anchor"), o.__v_frag = e), W(o, r);
            let s = e.staggerCb = k(function () { e.staggerCb = null, e.before(o), G(o); });
            setTimeout(s, i);
          }
          else {
            let a = r.nextSibling;
            a || (W(this.end, r), a = this.end), e.before(a);
          }
        }, remove(e, t, r, n) {
          if (e.staggerCb)
            return e.staggerCb.cancel(), void (e.staggerCb = null); let i = this.getStagger(e, t, r, "leave"); if (n && i) {
              let o = e.staggerCb = k(function () { e.staggerCb = null, e.remove(); });
              setTimeout(o, i);
            }
          else
            e.remove();
        }, move(e, t) { t.nextSibling || this.end.parentNode.appendChild(this.end), e.before(t.nextSibling, !1); }, cacheFrag(e, t, n, i) {
          let s, a = this.params.trackBy, c = this.cache, l = !y(e);
          i || a || l ? (s = pt(n, i, e, a), c[s] ? "$index" !== a && "production" !== r.env.NODE_ENV && this.warnDuplicate(e) : c[s] = t) : (s = this.id, o(e, s) ? null === e[s] ? e[s] = t : "production" !== r.env.NODE_ENV && this.warnDuplicate(e) : Object.isExtensible(e) ? _(e, s, t) : "production" !== r.env.NODE_ENV && $n("Frozen v-for objects cannot be automatically tracked, make sure to provide a track-by key.")), t.raw = e;
        }, getCachedFrag(e, t, n) {
          let i, o = this.params.trackBy, s = !y(e); if (n || o || s) {
            let a = pt(t, n, e, o);
            i = this.cache[a];
          }
          else
            i = e[this.id]; return i && (i.reused || i.fresh) && "production" !== r.env.NODE_ENV && this.warnDuplicate(e), i;
        }, deleteCachedFrag(e) {
          let t = e.raw, r = this.params.trackBy, n = e.scope, i = n.$index, s = o(n, "$key") && n.$key, a = !y(t); if (r || s || a) {
            let c = pt(i, s, t, r);
            this.cache[c] = null;
          }
          else
            t[this.id] = null, e.raw = null;
        }, getStagger(e, t, r, n) { n += "Stagger"; let i = e.node.__v_trans, o = i && i.hooks, s = o && (o[n] || o.stagger); return s ? s.call(e, t, r) : t * parseInt(this.params[n] || this.params.stagger, 10); }, _preProcess(e) { return this.rawValue = e, e; }, _postProcess(e) {
          if (Pr(e))
            return e; if (w(e)) {
              for (let t, r = Object.keys(e), n = r.length, i = new Array(n); n--;)
                t = r[n], i[n] = { $key: t, $value: e[t] };
              return i;
            } return "number" != typeof e || isNaN(e) || (e = ht(e)), e || [];
        }, unbind() {
          if (this.descriptor.ref && ((this._scope || this.vm).$refs[this.descriptor.ref] = null), this.frags)
            for (let e, t = this.frags.length; t--;)
              e = this.frags[t], this.deleteCachedFrag(e), e.destroy();
        }
      };
      "production" !== r.env.NODE_ENV && (to.warnDuplicate = function (e) { $n('Duplicate value found in v-for="' + this.descriptor.raw + '": ' + JSON.stringify(e) + '. Use track-by="$index" if you are expecting duplicate values.', this.vm); });
      let ro = {
        priority: Qi, terminal: !0, bind() {
          let e = this.el; if (e.__vue__)
            "production" !== r.env.NODE_ENV && $n('v-if="' + this.expression + '" cannot be used on an instance root element.', this.vm), this.invalid = !0;
          else {
            let t = e.nextElementSibling;
            t && null !== F(t, "v-else") && (G(t), this.elseEl = t), this.anchor = se("v-if"), Y(e, this.anchor);
          }
        }, update(e) { this.invalid || (e ? this.frag || this.insert() : this.remove()); }, insert() { this.elseFrag && (this.elseFrag.remove(), this.elseFrag = null), this.factory || (this.factory = new ct(this.vm, this.el)), this.frag = this.factory.create(this._host, this._scope, this._frag), this.frag.before(this.anchor); }, remove() { this.frag && (this.frag.remove(), this.frag = null), this.elseEl && !this.elseFrag && (this.elseFactory || (this.elseFactory = new ct(this.elseEl._context || this.vm, this.elseEl)), this.elseFrag = this.elseFactory.create(this._host, this._scope, this._frag), this.elseFrag.before(this.anchor)); }, unbind() { this.frag && this.frag.destroy(), this.elseFrag && this.elseFrag.destroy(); }
      }, no = { bind() { let e = this.el.nextElementSibling; e && null !== F(e, "v-else") && (this.elseEl = e); }, update(e) { this.apply(this.el, e), this.elseEl && this.apply(this.elseEl, !e); }, apply(e, t) { function r() { e.style.display = t ? "" : "none"; } I(e) ? P(e, t ? 1 : -1, r, this.vm) : r(); } }, io = {
        bind() {
          let e = this, t = this.el, r = "range" === t.type, n = this.params.lazy, i = this.params.number, o = this.params.debounce, s = !1; if (Wr || r || (this.on("compositionstart",
            function () { s = !0; }), this.on("compositionend",
              function () { s = !1, n || e.listener(); })), this.focused = !1, r || n || (this.on("focus",
                function () { e.focused = !0; }), this.on("blur",
                  function () { e.focused = !1, e._frag && !e._frag.inserted || e.rawListener(); })), this.listener = this.rawListener = function () {
                    if (!s && e._bound) {
                      let n = i || r ? l(t.value) : t.value;
                      e.set(n), nn(function () { e._bound && !e.focused && e.update(e._watcher.value); });
                    }
                  }, o && (this.listener = x(this.listener, o)), this.hasjQuery = "function" == typeof jQuery, this.hasjQuery) {
            let a = jQuery.fn.on ? "on" : "bind";
            jQuery(t)[a]("change", this.rawListener), n || jQuery(t)[a]("input", this.listener);
          }
          else
            this.on("change", this.rawListener), n || this.on("input", this.listener); !n && zr && (this.on("cut",
              function () { nn(e.listener); }), this.on("keyup",
                function (t) { 46 !== t.keyCode && 8 !== t.keyCode || e.listener(); })), (t.hasAttribute("value") || "TEXTAREA" === t.tagName && t.value.trim()) && (this.afterBind = this.listener);
        }, update(e) { e = c(e), e !== this.el.value && (this.el.value = e); }, unbind() {
          let e = this.el; if (this.hasjQuery) {
            let t = jQuery.fn.off ? "off" : "unbind";
            jQuery(e)[t]("change", this.listener), jQuery(e)[t]("input", this.listener);
          }
        }
      }, oo = {
        bind() {
          let e = this, t = this.el; this.getValue = function () {
            if (t.hasOwnProperty("_value"))
              return t._value; let r = t.value; return e.params.number && (r = l(r)), r;
          }, this.listener = function () { e.set(e.getValue()); }, this.on("change", this.listener), t.hasAttribute("checked") && (this.afterBind = this.listener);
        }, update(e) { this.el.checked = C(e, this.getValue()); }
      }, so = {
        bind() {
          let e = this, t = this, r = this.el; this.forceUpdate = function () { t._watcher && t.update(t._watcher.get()); }; let n = this.multiple = r.hasAttribute("multiple"); this.listener = function () { let e = ft(r, n); e = t.params.number ? Pr(e) ? e.map(l) : l(e) : e, t.set(e); }, this.on("change", this.listener); let i = ft(r, n, !0); (n && i.length || !n && null !== i) && (this.afterBind = this.listener), this.vm.$on("hook:attached",
            function () { nn(e.forceUpdate); }), I(r) || nn(this.forceUpdate);
        }, update(e) {
          let t = this.el; t.selectedIndex = -1; for (let r, n, i = this.multiple && Pr(e), o = t.options, s = o.length; s--;)
            r = o[s], n = r.hasOwnProperty("_value") ? r._value : r.value, r.selected = i ? dt(e, n) > -1 : C(e, n);
        }, unbind() { this.vm.$off("hook:attached", this.forceUpdate); }
      }, ao = {
        bind() {
          function e() { let e = r.checked; return e && r.hasOwnProperty("_trueValue") ? r._trueValue : !e && r.hasOwnProperty("_falseValue") ? r._falseValue : e; } let t = this, r = this.el; this.getValue = function () { return r.hasOwnProperty("_value") ? r._value : t.params.number ? l(r.value) : r.value; }, this.listener = function () {
            let n = t._watcher.value; if (Pr(n)) {
              let i = t.getValue();
              r.checked ? E(n, i) < 0 && n.push(i) : n.$remove(i);
            }
            else
              t.set(e());
          }, this.on("change", this.listener), r.hasAttribute("checked") && (this.afterBind = this.listener);
        }, update(e) { let t = this.el; Pr(e) ? t.checked = E(e, this.getValue()) > -1 : t.hasOwnProperty("_trueValue") ? t.checked = C(e, t._trueValue) : t.checked = !!e; }
      }, co = { text: io, radio: oo, select: so, checkbox: ao }, lo = {
        priority: zi, twoWay: !0, handlers: co, params: ["lazy", "number", "debounce"], bind() {
          this.checkFilters(), this.hasRead && !this.hasWrite && "production" !== r.env.NODE_ENV && $n('It seems you are using a read-only filter with v-model="' + this.descriptor.raw + '". You might want to use a two-way filter to ensure correct behavior.', this.vm); let e, t = this.el, n = t.tagName; if ("INPUT" === n)
            e = co[t.type] || co.text;
          else if ("SELECT" === n)
            e = co.select;
          else {
            if ("TEXTAREA" !== n)
              return void ("production" !== r.env.NODE_ENV && $n("v-model does not support element type: " + n, this.vm));
            e = co.text;
          } t.__v_model = this, e.bind.call(this), this.update = e.update, this._unbind = e.unbind;
        }, checkFilters() {
          let e = this.filters; if (e)
            for (let t = e.length; t--;) {
              let r = we(this.vm.$options, "filters", e[t].name);
              ("function" == typeof r || r.read) && (this.hasRead = !0), r.write && (this.hasWrite = !0);
            }
        }, unbind() { this.el.__v_model = null, this._unbind && this._unbind(); }
      }, uo = { esc: 27, tab: 9, enter: 13, space: 32, "delete": [8, 46], up: 38, left: 37, right: 39, down: 40 }, ho = {
        priority: Bi, acceptStatement: !0, keyCodes: uo, bind() {
          if ("IFRAME" === this.el.tagName && "load" !== this.arg) {
            let e = this;
            this.iframeBind = function () { Z(e.el.contentWindow, e.arg, e.handler, e.modifiers.capture); }, this.on("load", this.iframeBind);
          }
        }, update(e) {
          if (this.descriptor.raw || (e = function () { }), "function" != typeof e)
            return void ("production" !== r.env.NODE_ENV && $n("v-on:" + this.arg + '="' + this.expression + '" expects a function value, got ' + e, this.vm)); this.modifiers.stop && (e = mt(e)), this.modifiers.prevent && (e = gt(e)), this.modifiers.self && (e = bt(e)); let t = Object.keys(this.modifiers).filter(function (e) { return "stop" !== e && "prevent" !== e && "self" !== e && "capture" !== e; }); t.length && (e = vt(e, t)), this.reset(), this.handler = e, this.iframeBind ? this.iframeBind() : Z(this.el, this.arg, this.handler, this.modifiers.capture);
        }, reset() { let e = this.iframeBind ? this.el.contentWindow : this.el; this.handler && Q(e, this.arg, this.handler); }, unbind() { this.reset(); }
      }, po = ["-webkit-", "-moz-", "-ms-"], fo = ["Webkit", "Moz", "ms"], vo = /!important;?$/, mo = Object.create(null), go = null, bo = {
        deep: !0, update(e) { "string" == typeof e ? this.el.style.cssText = e : Pr(e) ? this.handleObject(e.reduce(b, {})) : this.handleObject(e || {}); }, handleObject(e) {
          let t, r, n = this.cache || (this.cache = {}); for (t in n)
            t in e || (this.handleSingle(t, null), delete n[t]); for (t in e)
            r = e[t], r !== n[t] && (n[t] = r, this.handleSingle(t, r));
        }, handleSingle(e, t) {
          if (e = yt(e))
            if (null != t && (t += ""), t) {
              let n = vo.test(t) ? "important" : "";
              n ? ("production" !== r.env.NODE_ENV && $n("It's probably a bad idea to use !important with inline rules. This feature will be deprecated in a future version of Vue."), t = t.replace(vo, "").trim(), this.el.style.setProperty(e.kebab, t, n)) : this.el.style[e.camel] = t;
            }
            else
              this.el.style[e.camel] = "";
        }
      }, yo = "http://www.w3.org/1999/xlink", wo = /^xlink:/, _o = /^v-|^:|^@|^(?:is|transition|transition-mode|debounce|track-by|stagger|enter-stagger|leave-stagger)$/, xo = /^(?:value|checked|selected|muted)$/, Eo = /^(?:draggable|contenteditable|spellcheck)$/, ko = { value: "_value", "true-value": "_trueValue", "false-value": "_falseValue" }, Co = {
        priority: Wi, bind() {
          let e = this.arg, t = this.el.tagName; e || (this.deep = !0); let n = this.descriptor, i = n.interp; if (i && (n.hasOneTime && (this.expression = S(i, this._scope || this.vm)), (_o.test(e) || "name" === e && ("PARTIAL" === t || "SLOT" === t)) && ("production" !== r.env.NODE_ENV && $n(e + '="' + n.raw + '": attribute interpolation is not allowed in Vue.js directives and special attributes.', this.vm), this.el.removeAttribute(e), this.invalid = !0), "production" !== r.env.NODE_ENV)) {
            let o = e + '="' + n.raw + '": ';
            "src" === e && $n(o + 'interpolation in "src" attribute will cause a 404 request. Use v-bind:src instead.', this.vm), "style" === e && $n(o + 'interpolation in "style" attribute will cause the attribute to be discarded in Internet Explorer. Use v-bind:style instead.', this.vm);
          }
        }, update(e) {
          if (!this.invalid) {
            let t = this.arg;
            this.arg ? this.handleSingle(t, e) : this.handleObject(e || {});
          }
        }, handleObject: bo.handleObject, handleSingle(e, t) {
          let r = this.el, n = this.descriptor.interp; if (this.modifiers.camel && (e = p(e)), !n && xo.test(e) && e in r) {
            let i = "value" === e && null == t ? "" : t;
            r[e] !== i && (r[e] = i);
          } let o = ko[e]; if (!n && o) {
            r[o] = t;
            let s = r.__v_model;
            s && s.listener();
          } return "value" === e && "TEXTAREA" === r.tagName ? void r.removeAttribute(e) : void (Eo.test(e) ? r.setAttribute(e, t ? "true" : "false") : null != t && t !== !1 ? "class" === e ? (r.__v_trans && (t += " " + r.__v_trans.id + "-transition"), K(r, t)) : wo.test(e) ? r.setAttributeNS(yo, e, t === !0 ? "" : t) : r.setAttribute(e, t === !0 ? "" : t) : r.removeAttribute(e));
        }
      }, No = {
        priority: Ji, bind() {
          if (this.arg) {
            let e = this.id = p(this.arg), t = (this._scope || this.vm).$els;
            o(t, e) ? t[e] = this.el : Ae(t, e, this.el);
          }
        }, unbind() { let e = (this._scope || this.vm).$els; e[this.id] === this.el && (e[this.id] = null); }
      }, Ao = { bind() { "production" !== r.env.NODE_ENV && $n("v-ref:" + this.arg + " must be used on a child component. Found on <" + this.el.tagName.toLowerCase() + ">.", this.vm); } }, Oo = {
        bind() {
          let e = this.el; this.vm.$once("pre-hook:compiled",
            function () { e.removeAttribute("v-cloak"); });
        }
      }, Do = { text: $i, html: Fi, "for": to, "if": ro, show: no, model: lo, on: ho, bind: Co, el: No, ref: Ao, cloak: Oo }, To = {
        deep: !0, update(e) { e ? "string" == typeof e ? this.setClass(e.trim().split(/\s+/)) : this.setClass(_t(e)) : this.cleanup(); }, setClass(e) {
          this.cleanup(e); for (let t = 0, r = e.length; t < r; t++) {
            let n = e[t];
            n && xt(this.el, n, ee);
          } this.prevKeys = e;
        }, cleanup(e) {
          let t = this.prevKeys; if (t)
            for (let r = t.length; r--;) {
              let n = t[r];
              (!e || e.indexOf(n) < 0) && xt(this.el, n, te);
            }
        }
      }, qo = {
        priority: Yi, params: ["keep-alive", "transition-mode", "inline-template"], bind() { this.el.__vue__ ? "production" !== r.env.NODE_ENV && $n('cannot mount component "' + this.expression + '" on already mounted element: ' + this.el) : (this.keepAlive = this.params.keepAlive, this.keepAlive && (this.cache = {}), this.params.inlineTemplate && (this.inlineTemplate = re(this.el, !0)), this.pendingComponentCb = this.Component = null, this.pendingRemovals = 0, this.pendingRemovalCb = null, this.anchor = se("v-component"), Y(this.el, this.anchor), this.el.removeAttribute("is"), this.el.removeAttribute(":is"), this.descriptor.ref && this.el.removeAttribute("v-ref:" + d(this.descriptor.ref)), this.literal && this.setComponent(this.expression)); }, update(e) { this.literal || this.setComponent(e); }, setComponent(e, t) {
          if (this.invalidatePending(), e) {
            let r = this;
            this.resolveComponent(e,
              function () { r.mountComponent(t); });
          }
          else
            this.unbuild(!0), this.remove(this.childVM, t), this.childVM = null;
        }, resolveComponent(e, t) { let r = this; this.pendingComponentCb = k(function (n) { r.ComponentName = n.options.name || ("string" == typeof e ? e : null), r.Component = n, t(); }), this.vm._resolveComponent(e, this.pendingComponentCb); }, mountComponent(e) {
          this.unbuild(!0); let t = this, r = this.Component.options.activate, n = this.getCached(), i = this.build(); r && !n ? (this.waitingFor = i, Et(r, i,
            function () { t.waitingFor === i && (t.waitingFor = null, t.transition(i, e)); })) : (n && i._updateRef(), this.transition(i, e));
        }, invalidatePending() { this.pendingComponentCb && (this.pendingComponentCb.cancel(), this.pendingComponentCb = null); }, build(e) {
          let t = this.getCached(); if (t)
            return t; if (this.Component) {
              let n = { name: this.ComponentName, el: Ke(this.el), template: this.inlineTemplate, parent: this._host || this.vm, _linkerCachable: !this.inlineTemplate, _ref: this.descriptor.ref, _asComponent: !0, _isRouterView: this._isRouterView, _context: this.vm, _scope: this._scope, _frag: this._frag };
              e && b(n, e);
              let i = new this.Component(n);
              return this.keepAlive && (this.cache[this.Component.cid] = i), "production" !== r.env.NODE_ENV && this.el.hasAttribute("transition") && i._isFragment && $n("Transitions will not work on a fragment instance. Template: " + i.$options.template, i), i;
            }
        }, getCached() { return this.keepAlive && this.cache[this.Component.cid]; }, unbuild(e) { this.waitingFor && (this.keepAlive || this.waitingFor.$destroy(), this.waitingFor = null); let t = this.childVM; return !t || this.keepAlive ? void (t && (t._inactive = !0, t._updateRef(!0))) : void t.$destroy(!1, e); }, remove(e, t) {
          let r = this.keepAlive; if (e) {
            this.pendingRemovals++, this.pendingRemovalCb = t;
            let n = this;
            e.$remove(function () { n.pendingRemovals--, r || e._cleanup(), !n.pendingRemovals && n.pendingRemovalCb && (n.pendingRemovalCb(), n.pendingRemovalCb = null); });
          }
          else
            t && t();
        }, transition(e, t) {
          let r = this, n = this.childVM; switch (n && (n._inactive = !0), e._inactive = !1, this.childVM = e, r.params.transitionMode) {
            case "in-out":
              e.$before(r.anchor,
                function () { r.remove(n, t); });
              break;
            case "out-in":
              r.remove(n,
                function () { e.$before(r.anchor, t); });
              break;
            default: r.remove(n), e.$before(r.anchor, t);
          }
        }, unbind() {
          if (this.invalidatePending(), this.unbuild(), this.cache) {
            for (let e in this.cache)
              this.cache[e].$destroy();
            this.cache = null;
          }
        }
      }, $o = qn._propBindingModes, So = {}, Lo = /^[$_a-zA-Z]+[\w$]*$/, jo = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\[[^\[\]]+\])*$/, Ro = qn._propBindingModes, Vo = {
        bind() {
          let e = this.vm, t = e._context, r = this.descriptor.prop, n = r.path, i = r.parentPath, o = r.mode === Ro.TWO_WAY, s = this.parentWatcher = new Je(t, i,
            function (t) { Ot(e, r, t); }, { twoWay: o, filters: r.filters, scope: this._scope }); if (At(e, r, s.value), o) {
              let a = this;
              e.$once("pre-hook:created",
                function () {
                  a.childWatcher = new Je(e, n,
                    function (e) { s.set(e); }, { sync: !0 });
                });
            }
        }, unbind() { this.parentWatcher.teardown(), this.childWatcher && this.childWatcher.teardown(); }
      }, Ho = [], Po = !1, Mo = "transition", Io = "animation", Fo = Qr + "Duration", Uo = Kr + "Duration", Bo = Ir && window.requestAnimationFrame, zo = Bo ? function (e) { Bo(function () { Bo(e); }); } : function (e) { setTimeout(e, 50); }, Wo = Vt.prototype;
      Wo.enter = function (e, t) { this.cancelPending(), this.callHook("beforeEnter"), this.cb = t, ee(this.el, this.enterClass), e(), this.entered = !1, this.callHookWithCb("enter"), this.entered || (this.cancel = this.hooks && this.hooks.enterCancelled, jt(this.enterNextTick)); }, Wo.enterNextTick = function () { let e = this; this.justEntered = !0, zo(function () { e.justEntered = !1; }); let t = this.enterDone, r = this.getCssTransitionType(this.enterClass); this.pendingJsCb ? r === Mo && te(this.el, this.enterClass) : r === Mo ? (te(this.el, this.enterClass), this.setupCssCb(Xr, t)) : r === Io ? this.setupCssCb(en, t) : t(); }, Wo.enterDone = function () { this.entered = !0, this.cancel = this.pendingJsCb = null, te(this.el, this.enterClass), this.callHook("afterEnter"), this.cb && this.cb(); }, Wo.leave = function (e, t) { this.cancelPending(), this.callHook("beforeLeave"), this.op = e, this.cb = t, ee(this.el, this.leaveClass), this.left = !1, this.callHookWithCb("leave"), this.left || (this.cancel = this.hooks && this.hooks.leaveCancelled, this.op && !this.pendingJsCb && (this.justEntered ? this.leaveDone() : jt(this.leaveNextTick))); }, Wo.leaveNextTick = function () {
        let e = this.getCssTransitionType(this.leaveClass); if (e) {
          let t = e === Mo ? Xr : en;
          this.setupCssCb(t, this.leaveDone);
        }
        else
          this.leaveDone();
      }, Wo.leaveDone = function () { this.left = !0, this.cancel = this.pendingJsCb = null, this.op(), te(this.el, this.leaveClass), this.callHook("afterLeave"), this.cb && this.cb(), this.op = null; }, Wo.cancelPending = function () { this.op = this.cb = null; let e = !1; this.pendingCssCb && (e = !0, Q(this.el, this.pendingCssEvent, this.pendingCssCb), this.pendingCssEvent = this.pendingCssCb = null), this.pendingJsCb && (e = !0, this.pendingJsCb.cancel(), this.pendingJsCb = null), e && (te(this.el, this.enterClass), te(this.el, this.leaveClass)), this.cancel && (this.cancel.call(this.vm, this.el), this.cancel = null); }, Wo.callHook = function (e) { this.hooks && this.hooks[e] && this.hooks[e].call(this.vm, this.el); }, Wo.callHookWithCb = function (e) { let t = this.hooks && this.hooks[e]; t && (t.length > 1 && (this.pendingJsCb = k(this[e + "Done"])), t.call(this.vm, this.el, this.pendingJsCb)); }, Wo.getCssTransitionType = function (e) {
        if (!(!Xr || document.hidden || this.hooks && this.hooks.css === !1 || Ht(this.el))) {
          let t = this.type || this.typeCache[e];
          if (t)
            return t;
          let r = this.el.style, n = window.getComputedStyle(this.el), i = r[Fo] || n[Fo];
          if (i && "0s" !== i)
            t = Mo;
          else {
            let o = r[Uo] || n[Uo];
            o && "0s" !== o && (t = Io);
          }
          return t && (this.typeCache[e] = t), t;
        }
      }, Wo.setupCssCb = function (e, t) { this.pendingCssEvent = e; let r = this, n = this.el, i = this.pendingCssCb = function (o) { o.target === n && (Q(n, e, i), r.pendingCssEvent = r.pendingCssCb = null, !r.pendingJsCb && t && t()); }; Z(n, e, i); };
      let Go = { priority: Gi, update(e, t) { let r = this.el, n = we(this.vm.$options, "transitions", e); e = e || "v", t = t || "v", r.__v_trans = new Vt(r, e, n, this.vm), te(r, t + "-transition"), ee(r, e + "-transition"); } }, Jo = { style: bo, "class": To, component: qo, prop: Vo, transition: Go }, Yo = /^v-bind:|^:/, Zo = /^v-on:|^@/, Qo = /^v-([^:]+)(?:$|:(.*)$)/, Xo = /\.[^\.]+/g, Ko = /^(v-bind:|:)?transition$/, es = 1e3, ts = 2e3;
      nr.terminal = !0;
      let rs = /[^\w\-:\.]/, ns = Object.freeze({ compile: Pt, compileAndLinkProps: Bt, compileRoot: zt, transclude: ur, resolveSlots: dr }), is = /^v-on:|^@/;
      yr.prototype._bind = function () {
        let e = this.name, t = this.descriptor; if (("cloak" !== e || this.vm._isCompiled) && this.el && this.el.removeAttribute) {
          let r = t.attr || "v-" + e;
          this.el.removeAttribute(r);
        } let n = t.def; if ("function" == typeof n ? this.update = n : b(this, n), this._setupParams(), this.bind && this.bind(), this._bound = !0, this.literal)
          this.update && this.update(t.raw);
        else if ((this.expression || this.modifiers) && (this.update || this.twoWay) && !this._checkStatement()) {
          let i = this;
          this.update ? this._update = function (e, t) { i._locked || i.update(e, t); } : this._update = br;
          let o = this._preProcess ? m(this._preProcess, this) : null, s = this._postProcess ? m(this._postProcess, this) : null, a = this._watcher = new Je(this.vm, this.expression, this._update, { filters: this.filters, twoWay: this.twoWay, deep: this.deep, preProcess: o, postProcess: s, scope: this._scope });
          this.afterBind ? this.afterBind() : this.update && this.update(a.value);
        }
      }, yr.prototype._setupParams = function () {
        if (this.params) {
          let e = this.params;
          this.params = Object.create(null);
          for (let t, r, n, i = e.length; i--;)
            t = d(e[i]), n = p(t), r = U(this.el, t), null != r ? this._setupParamWatcher(n, r) : (r = F(this.el, t), null != r && (this.params[n] = "" === r || r));
        }
      }, yr.prototype._setupParamWatcher = function (e, t) {
        let r = this, n = !1, i = (this._scope || this.vm).$watch(t,
          function (t, i) {
            if (r.params[e] = t, n) {
              let o = r.paramWatchers && r.paramWatchers[e];
              o && o.call(r, t, i);
            }
            else
              n = !0;
          }, { immediate: !0, user: !1 }); (this._paramUnwatchFns || (this._paramUnwatchFns = [])).push(i);
      }, yr.prototype._checkStatement = function () {
        let e = this.expression; if (e && this.acceptStatement && !Ue(e)) {
          let t = Fe(e).get, r = this._scope || this.vm, n = function (e) { r.$event = e, t.call(r, r), r.$event = null; };
          return this.filters && (n = r._applyFilters(n, null, this.filters)), this.update(n), !0;
        }
      }, yr.prototype.set = function (e) { this.twoWay ? this._withLock(function () { this._watcher.set(e); }) : "production" !== r.env.NODE_ENV && $n("Directive.set() can only be used inside twoWaydirectives."); }, yr.prototype._withLock = function (e) { let t = this; t._locked = !0, e.call(t), nn(function () { t._locked = !1; }); }, yr.prototype.on = function (e, t, r) { Z(this.el, e, t, r), (this._listeners || (this._listeners = [])).push([e, t]); }, yr.prototype._teardown = function () {
        if (this._bound) {
          this._bound = !1, this.unbind && this.unbind(), this._watcher && this._watcher.teardown();
          let e, t = this._listeners;
          if (t)
            for (e = t.length; e--;)
              Q(this.el, t[e][0], t[e][1]);
          let n = this._paramUnwatchFns;
          if (n)
            for (e = n.length; e--;)
              n[e]();
          "production" !== r.env.NODE_ENV && this.el && this.el._vue_directives.$remove(this), this.vm = this.el = this._watcher = this._listeners = null;
        }
      };
      let os = /[^|]\|[^|]/;
      Oe(Nr), mr(Nr), gr(Nr), wr(Nr), _r(Nr), xr(Nr), Er(Nr), kr(Nr), Cr(Nr);
      let ss = {
        priority: Ki, params: ["name"], bind() { let e = this.params.name || "default", t = this.vm._slotContents && this.vm._slotContents[e]; t && t.hasChildNodes() ? this.compile(t.cloneNode(!0), this.vm._context, this.vm) : this.fallback(); }, compile(e, t, r) {
          if (e && t) {
            if (this.el.hasChildNodes() && 1 === e.childNodes.length && 1 === e.childNodes[0].nodeType && e.childNodes[0].hasAttribute("v-if")) {
              let n = document.createElement("template");
              n.setAttribute("v-else", ""), n.innerHTML = this.el.innerHTML, n._context = this.vm, e.appendChild(n);
            }
            let i = r ? r._scope : this._scope;
            this.unlink = t.$compile(e, r, i, this._frag);
          } e ? Y(this.el, e) : G(this.el);
        }, fallback() { this.compile(re(this.el, !0), this.vm); }, unbind() { this.unlink && this.unlink(); }
      }, as = { priority: Zi, params: ["name"], paramWatchers: { name(e) { ro.remove.call(this), e && this.insert(e); } }, bind() { this.anchor = se("v-partial"), Y(this.el, this.anchor), this.insert(this.params.name); }, insert(e) { let t = we(this.vm.$options, "partials", e, !0); t && (this.factory = new ct(this.vm, t), ro.insert.call(this)); }, unbind() { this.frag && this.frag.destroy(); } }, cs = { slot: ss, partial: as }, ls = to._postProcess, us = /(\d{3})(?=\d)/g, hs = {
        orderBy: Dr, filterBy: Or, limitBy: Ar, json: {
          read(e, t) { return "string" == typeof e ? e : JSON.stringify(e, null, arguments.length > 1 ? t : 2); }, write(e) {
            try {
              return JSON.parse(e);
            }
            catch (t) {
              return e;
            }
          }
        }, capitalize(e) { return e || 0 === e ? (e = e.toString(), e.charAt(0).toUpperCase() + e.slice(1)) : ""; }, uppercase(e) { return e || 0 === e ? e.toString().toUpperCase() : ""; }, lowercase(e) { return e || 0 === e ? e.toString().toLowerCase() : ""; }, currency(e, t, r) {
          if (e = parseFloat(e), !isFinite(e) || !e && 0 !== e)
            return ""; t = null != t ? t : "$", r = null != r ? r : 2; let n = Math.abs(e).toFixed(r), i = r ? n.slice(0, -1 - r) : n, o = i.length % 3, s = o > 0 ? i.slice(0, o) + (i.length > 3 ? "," : "") : "", a = r ? n.slice(-1 - r) : "", c = e < 0 ? "-" : ""; return c + t + s + i.slice(o).replace(us, "$1,") + a;
        }, pluralize(e) {
          let t = g(arguments, 1), r = t.length; if (r > 1) {
            let n = e % 10 - 1;
            return n in t ? t[n] : t[r - 1];
          } return t[0] + (1 === e ? "" : "s");
        }, debounce(e, t) {
          if (e)
            return t || (t = 300), x(e, t);
        }
      };
      qr(Nr), Nr.version = "1.0.26", setTimeout(function () { qn.devtools && (Fr ? Fr.emit("init", Nr) : "production" !== r.env.NODE_ENV && Ir && /Chrome\/\d+/.test(window.navigator.userAgent) && console.log("Download the Vue Devtools for a better development experience:\nhttps://github.com/vuejs/vue-devtools")); }, 0), e.exports = Nr;
    }).call(t,
      function () { return this; }(), r(58));
  },
  function (e, t, r) { e.exports = { XmlEntities: r(19), Html4Entities: r(18), Html5Entities: r(8), AllHtmlEntities: r(8) }; },
  function (e, t) {
    function r() { } for (let n = ["apos", "nbsp", "iexcl", "cent", "pound", "curren", "yen", "brvbar", "sect", "uml", "copy", "ordf", "laquo", "not", "shy", "reg", "macr", "deg", "plusmn", "sup2", "sup3", "acute", "micro", "para", "middot", "cedil", "sup1", "ordm", "raquo", "frac14", "frac12", "frac34", "iquest", "Agrave", "Aacute", "Acirc", "Atilde", "Auml", "Aring", "Aelig", "Ccedil", "Egrave", "Eacute", "Ecirc", "Euml", "Igrave", "Iacute", "Icirc", "Iuml", "ETH", "Ntilde", "Ograve", "Oacute", "Ocirc", "Otilde", "Ouml", "times", "Oslash", "Ugrave", "Uacute", "Ucirc", "Uuml", "Yacute", "THORN", "szlig", "agrave", "aacute", "acirc", "atilde", "auml", "aring", "aelig", "ccedil", "egrave", "eacute", "ecirc", "euml", "igrave", "iacute", "icirc", "iuml", "eth", "ntilde", "ograve", "oacute", "ocirc", "otilde", "ouml", "divide", "Oslash", "ugrave", "uacute", "ucirc", "uuml", "yacute", "thorn", "yuml", "quot", "amp", "lt", "gt", "oelig", "oelig", "scaron", "scaron", "yuml", "circ", "tilde", "ensp", "emsp", "thinsp", "zwnj", "zwj", "lrm", "rlm", "ndash", "mdash", "lsquo", "rsquo", "sbquo", "ldquo", "rdquo", "bdquo", "dagger", "dagger", "permil", "lsaquo", "rsaquo", "euro", "fnof", "alpha", "beta", "gamma", "delta", "epsilon", "zeta", "eta", "theta", "iota", "kappa", "lambda", "mu", "nu", "xi", "omicron", "pi", "rho", "sigma", "tau", "upsilon", "phi", "chi", "psi", "omega", "alpha", "beta", "gamma", "delta", "epsilon", "zeta", "eta", "theta", "iota", "kappa", "lambda", "mu", "nu", "xi", "omicron", "pi", "rho", "sigmaf", "sigma", "tau", "upsilon", "phi", "chi", "psi", "omega", "thetasym", "upsih", "piv", "bull", "hellip", "prime", "prime", "oline", "frasl", "weierp", "image", "real", "trade", "alefsym", "larr", "uarr", "rarr", "darr", "harr", "crarr", "larr", "uarr", "rarr", "darr", "harr", "forall", "part", "exist", "empty", "nabla", "isin", "notin", "ni", "prod", "sum", "minus", "lowast", "radic", "prop", "infin", "ang", "and", "or", "cap", "cup", "int", "there4", "sim", "cong", "asymp", "ne", "equiv", "le", "ge", "sub", "sup", "nsub", "sube", "supe", "oplus", "otimes", "perp", "sdot", "lceil", "rceil", "lfloor", "rfloor", "lang", "rang", "loz", "spades", "clubs", "hearts", "diams"], i = [39, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 34, 38, 60, 62, 338, 339, 352, 353, 376, 710, 732, 8194, 8195, 8201, 8204, 8205, 8206, 8207, 8211, 8212, 8216, 8217, 8218, 8220, 8221, 8222, 8224, 8225, 8240, 8249, 8250, 8364, 402, 913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 929, 931, 932, 933, 934, 935, 936, 937, 945, 946, 947, 948, 949, 950, 951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962, 963, 964, 965, 966, 967, 968, 969, 977, 978, 982, 8226, 8230, 8242, 8243, 8254, 8260, 8472, 8465, 8476, 8482, 8501, 8592, 8593, 8594, 8595, 8596, 8629, 8656, 8657, 8658, 8659, 8660, 8704, 8706, 8707, 8709, 8711, 8712, 8713, 8715, 8719, 8721, 8722, 8727, 8730, 8733, 8734, 8736, 8743, 8744, 8745, 8746, 8747, 8756, 8764, 8773, 8776, 8800, 8801, 8804, 8805, 8834, 8835, 8836, 8838, 8839, 8853, 8855, 8869, 8901, 8968, 8969, 8970, 8971, 9001, 9002, 9674, 9824, 9827, 9829, 9830], o = {}, s = {}, a = 0, c = n.length; a < c;) {
      let l = n[a], u = i[a];
      o[l] = String.fromCharCode(u), s[u] = l, a++;
    } r.prototype.decode = function (e) {
      return 0 === e.length ? "" : e.replace(/&(#?[\w\d]+);?/g,
        function (e, t) {
          let r; if ("#" === t.charAt(0)) {
            let n = "x" === t.charAt(1).toLowerCase() ? parseInt(t.substr(2), 16) : parseInt(t.substr(1));
            isNaN(n) || n < -32768 || n > 65535 || (r = String.fromCharCode(n));
          }
          else
            r = o[t]; return r || e;
        });
    };
    r.decode = function (e) { return (new r).decode(e); };
    r.prototype.encode = function (e) {
      let t = e.length; if (0 === t)
        return ""; for (let r = "", n = 0; n < t;) {
          let i = s[e.charCodeAt(n)];
          r += i ? "&" + i + ";" : e.charAt(n), n++;
        } return r;
    };
    r.encode = function (e) { return (new r).encode(e); };
    r.prototype.encodeNonUTF = function (e) {
      let t = e.length; if (0 === t)
        return ""; for (let r = "", n = 0; n < t;) {
          let i = e.charCodeAt(n), o = s[i];
          r += o ? "&" + o + ";" : i < 32 || i > 126 ? "&#" + i + ";" : e.charAt(n), n++;
        } return r;
    };
    r.encodeNonUTF = function (e) { return (new r).encodeNonUTF(e); };
    r.prototype.encodeNonASCII = function (e) {
      let t = e.length; if (0 === t)
        return ""; for (let r = "", n = 0; n < t;) {
          let i = e.charCodeAt(n);
          i <= 255 ? r += e[n++] : (r += "&#" + i + ";", n++);
        } return r;
    };
    r.encodeNonASCII = function (e) { return (new r).encodeNonASCII(e); }, e.exports = r;
  },
  function (e, t) {
    function r() { } let n = { "&lt": "<", "&gt": ">", "&quot": '"', "&apos": "'", "&amp": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&apos;": "'", "&amp;": "&" }, i = { 60: "lt", 62: "gt", 34: "quot", 39: "apos", 38: "amp" }, o = { "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;", "&": "&amp;" }; r.prototype.encode = function (e) {
      return 0 === e.length ? "" : e.replace(/<|>|"|'|&/g,
        function (e) { return o[e]; });
    };
    r.encode = function (e) { return (new r).encode(e); };
    r.prototype.decode = function (e) {
      return 0 === e.length ? "" : e.replace(/&#?[0-9a-zA-Z]+;?/g,
        function (e) {
          if ("#" === e.charAt(1)) {
            let t = "x" === e.charAt(2).toLowerCase() ? parseInt(e.substr(3), 16) : parseInt(e.substr(2));
            return isNaN(t) || t < -32768 || t > 65535 ? "" : String.fromCharCode(t);
          } return n[e] || e;
        });
    };
    r.decode = function (e) { return (new r).decode(e); };
    r.prototype.encodeNonUTF = function (e) {
      let t = e.length; if (0 === t)
        return ""; for (let r = "", n = 0; n < t;) {
          let o = e.charCodeAt(n), s = i[o];
          s ? (r += "&" + s + ";", n++) : (r += o < 32 || o > 126 ? "&#" + o + ";" : e.charAt(n), n++);
        } return r;
    };
    r.encodeNonUTF = function (e) { return (new r).encodeNonUTF(e); };
    r.prototype.encodeNonASCII = function (e) {
      let t = e.length; if (0 === t)
        return ""; for (let r = "", n = 0; n < t;) {
          let i = e.charCodeAt(n);
          i <= 255 ? r += e[n++] : (r += "&#" + i + ";", n++);
        } return r;
    };
    r.encodeNonASCII = function (e) { return (new r).encodeNonASCII(e); }, e.exports = r;
  },
  function (e, t) { e.exports = ' <div id=app> <ul> <li class=box v-for="num in nums" v-text=num v-getclass=num v-getposition=$index track-by=$index> </li> </ul> <div class=mask v-show="show===1" @click="show=0" transition=show> <div>{{msg}}</div> </div> <button @click=reset>重置</button> </div> '; },
  function (e, t) {
    "use strict";
    e.exports = function () { return /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g; };
  },
  function (e, t, r) {
    function n(e) { let t = h[e] || c.red; return '<span style="background-color:#' + t + '; color:#fff; padding:2px 4px; border-radius: 2px">' + e.slice(0, -1).toUpperCase() + "</span>"; } let i = document.createElement("div"), o = { background: "rgba(0,0,0,0.85)", color: "#E8E8E8", lineHeight: "1.2", whiteSpace: "pre", fontFamily: "Menlo, Consolas, monospace", fontSize: "13px", position: "fixed", zIndex: 9999, padding: "10px", left: 0, right: 0, top: 0, bottom: 0, overflow: "auto", dir: "ltr" }; for (let s in o)
      i.style[s] = o[s]; let a = r(12), c = { reset: ["transparent", "transparent"], black: "181818", red: "E36049", green: "B3CB74", yellow: "FFD080", blue: "7CAFC2", magenta: "7FACCA", cyan: "C3C2EF", lightgrey: "EBE7E3", darkgrey: "6D7891" }; a.setColors(c); let l = r(17).AllHtmlEntities, u = new l; t.showProblems = function (e, t) { i.innerHTML = "", t.forEach(function (t) { t = a(u.encode(t)); let r = document.createElement("div"); r.style.marginBottom = "26px", r.innerHTML = n(e) + " in " + t, i.appendChild(r); }), document.body && document.body.appendChild(i); }, t.clear = function () { document.body && i.parentNode && document.body.removeChild(i); }; let h = { errors: c.red, warnings: c.yellow };
  },
  function (e, t, r) {
    (function (e) {
      function t(e) {
        function r() { o.log && console.log("[HMR] connected"), c = new Date; }
        function n(e) {
          if (c = new Date, "💓" != e.data)
            try {
              i(JSON.parse(e.data));
            }
            catch (t) {
              o.warn && console.warn("Invalid HMR message: " + e.data + "\n" + t);
            }
        }
        function s() { clearInterval(l), a.close(), setTimeout(function () { t(e); }, o.timeout); } let a = new e(o.path), c = new Date; a.onopen = r, a.onmessage = n, a.onerror = s; let l = setInterval(function () { new Date - c > o.timeout && s(); }, o.timeout / 2);
      }
      function n() { let e, t = r(52); return "undefined" != typeof document && o.overlay && (e = r(22)), { problems(r, n) { o.warn && (console.warn("[HMR] bundle has " + r + ":"), n[r].forEach(function (e) { console.warn("[HMR] " + t(e)); })), e && "warnings" !== r && e.showProblems(r, n[r]); }, success() { e && e.clear(); }, useCustomOverlay(t) { e = t; } }; }
      function i(e) { "building" == e.action ? o.log && console.log("[HMR] bundle rebuilding") : "built" == e.action ? (o.log && console.log("[HMR] bundle " + (e.name ? e.name + " " : "") + "rebuilt in " + e.time + "ms"), e.errors.length > 0 ? s && s.problems("errors", e) : (s && (e.warnings.length > 0 && s.problems("warnings", e), s.success()), u(e.hash, e.modules, o))) : c && c(e), l && l(e); } let o = { path: "/__webpack_hmr", timeout: 2e4, overlay: !0, reload: !1, log: !0, warn: !0 }; "undefined" == typeof window || ("undefined" == typeof window.EventSource ? console.warn("webpack-hot-middleware's client requires EventSource to work. You should include a polyfill if you want to support this browser: https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events#Tools") : t(window.EventSource)); let s, a = "__webpack_hot_middleware_reporter__"; "undefined" == typeof window || window[a] || (s = window[a] = n()); let c, l, u = r(24); e && (e.exports = { subscribeAll(e) { l = e; }, subscribe(e) { c = e; }, useCustomOverlay(e) { s && s.useCustomOverlay(e); } });
    }).call(t, r(59)(e));
  },
  function (e, t, r) {
    function n(e) { return e && (i = e), i == r.h(); }
    let i, o = "http://webpack.github.io/docs/hot-module-replacement-with-webpack.html", s = { abort: 1, fail: 1 }, a = {
      ignoreUnaccepted: !0
    };
    e.exports = function (t, r, i) {
      function c() {
        let t = function (t, r) {
          if (t)
            return u(t); if (!r)
            return i.warn && (console.warn("[HMR] Cannot find update (Full reload needed)"), console.warn("[HMR] (Probably because of restarting the server)")), h(), null; let o = function (e, t) { return e ? u(e) : (n() || c(), void l(r, t)); }, s = e.hot.apply(a, o); s && s.then && (s.then(function (e) { o(null, e); }), s["catch"](o));
        }, r = e.hot.check(!1, t); r && r.then && (r.then(function (e) { t(null, e); }), r["catch"](t));
      }
      function l(e, t) { let s = e.filter(function (e) { return t && t.indexOf(e) < 0; }); return s.length > 0 ? (i.warn && (console.warn("[HMR] The following modules couldn't be hot updated: (Full reload needed)\nThis is usually because the modules which have changed (and their parents) do not know how to hot reload themselves. See " + o + " for more details."), s.forEach(function (e) { console.warn("[HMR]  - " + r[e]); })), void h()) : void (i.log && (t && 0 !== t.length ? (console.log("[HMR] Updated modules:"), t.forEach(function (e) { console.log("[HMR]  - " + r[e]); })) : console.log("[HMR] Nothing hot updated."), n() && console.log("[HMR] App is up to date."))); }
      function u(t) { return e.hot.status() in s ? (i.warn && (console.warn("[HMR] Cannot check for update (Full reload needed)"), console.warn("[HMR] " + t.stack || t.message)), void h()) : void (i.warn && console.warn("[HMR] Update check failed: " + t.stack || t.message)); }
      function h() { p && (i.warn && console.warn("[HMR] Reloading page"), window.location.reload()); } let p = i.reload; n(t) || "idle" != e.hot.status() || (i.log && console.log("[HMR] Checking for updates on the server..."), c());
    };
  },
  function (e, t, r) { let n = r(1), i = n.JSON || (n.JSON = { stringify: JSON.stringify }); e.exports = function (e) { return i.stringify.apply(i, arguments); }; },
  function (e, t, r) { r(51), e.exports = r(1).Object.keys; },
  function (e, t) {
    e.exports = function (e) {
      if ("function" != typeof e)
        throw TypeError(e + " is not a function!"); return e;
    };
  },
  function (e, t, r) {
    let n = r(6); e.exports = function (e) {
      if (!n(e))
        throw TypeError(e + " is not an object!"); return e;
    };
  },
  function (e, t, r) {
    let n = r(11), i = r(47), o = r(46); e.exports = function (e) {
      return function (t, r, s) {
        let a, c = n(t), l = i(c.length), u = o(s, l); if (e && r != r) {
          for (; l > u;)
            if (a = c[u++], a != a)
              return !0;
        }
        else
          for (; l > u; u++)
            if ((e || u in c) && c[u] === r)
              return e || u || 0; return !e && -1;
      };
    };
  },
  function (e, t) { let r = {}.toString; e.exports = function (e) { return r.call(e).slice(8, -1); }; },
  function (e, t, r) {
    let n = r(27); e.exports = function (e, t, r) {
      if (n(e), void 0 === t)
        return e; switch (r) {
          case 1: return function (r) { return e.call(t, r); };
          case 2: return function (r, n) { return e.call(t, r, n); };
          case 3: return function (r, n, i) { return e.call(t, r, n, i); };
        } return function () { return e.apply(t, arguments); };
    };
  },
  function (e, t, r) { let n = r(6), i = r(5).document, o = n(i) && n(i.createElement); e.exports = function (e) { return o ? i.createElement(e) : {}; }; },
  function (e, t) { e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(","); },
  function (e, t, r) {
    let n = r(5), i = r(1), o = r(31), s = r(36), a = "prototype", c = function (e, t, r) {
      let l, u, h, p = e & c.F, f = e & c.G, d = e & c.S, v = e & c.P, m = e & c.B, g = e & c.W, b = f ? i : i[t] || (i[t] = {}), y = b[a], w = f ? n : d ? n[t] : (n[t] || {})[a]; f && (r = t); for (l in r)
        u = !p && w && void 0 !== w[l], u && l in b || (h = u ? w[l] : r[l], b[l] = f && "function" != typeof w[l] ? r[l] : m && u ? o(h, n) : g && w[l] == h ? function (e) {
          let t = function (t, r, n) {
            if (this instanceof e) {
              switch (arguments.length) {
                case 0: return new e;
                case 1: return new e(t);
                case 2: return new e(t, r);
              }
              return new e(t, r, n);
            } return e.apply(this, arguments);
          }; return t[a] = e[a], t;
        }(h) : v && "function" == typeof h ? o(Function.call, h) : h, v && ((b.virtual || (b.virtual = {}))[l] = h, e & c.R && y && !y[l] && s(y, l, h)));
    }; c.F = 1, c.G = 2, c.S = 4, c.P = 8, c.B = 16, c.W = 32, c.U = 64, c.R = 128, e.exports = c;
  },
  function (e, t) { let r = {}.hasOwnProperty; e.exports = function (e, t) { return r.call(e, t); }; },
  function (e, t, r) { let n = r(39), i = r(43); e.exports = r(3) ? function (e, t, r) { return n.f(e, t, i(1, r)); } : function (e, t, r) { return e[t] = r, e; }; },
  function (e, t, r) { e.exports = !r(3) && !r(4)(function () { return 7 != Object.defineProperty(r(32)("div"), "a", { get() { return 7; } }).a; }); },
  function (e, t, r) { let n = r(30); e.exports = Object("z").propertyIsEnumerable(0) ? Object : function (e) { return "String" == n(e) ? e.split("") : Object(e); }; },
  function (e, t, r) {
    let n = r(28), i = r(37), o = r(49), s = Object.defineProperty; t.f = r(3) ? Object.defineProperty : function (e, t, r) {
      if (n(e), t = o(t, !0), n(r), i)
        try {
          return s(e, t, r);
        }
        catch (a) { } if ("get" in r || "set" in r)
        throw TypeError("Accessors not supported!"); return "value" in r && (e[t] = r.value), e;
    };
  },
  function (e, t, r) {
    let n = r(35), i = r(11), o = r(29)(!1), s = r(44)("IE_PROTO"); e.exports = function (e, t) {
      let r, a = i(e), c = 0, l = []; for (r in a)
        r != s && n(a, r) && l.push(r); for (; t.length > c;)
        n(a, r = t[c++]) && (~o(l, r) || l.push(r)); return l;
    };
  },
  function (e, t, r) { let n = r(40), i = r(33); e.exports = Object.keys || function (e) { return n(e, i); }; },
  function (e, t, r) { let n = r(34), i = r(1), o = r(4); e.exports = function (e, t) { let r = (i.Object || {})[e] || Object[e], s = {}; s[e] = t(r), n(n.S + n.F * o(function () { r(1); }), "Object", s); }; },
  function (e, t) { e.exports = function (e, t) { return { enumerable: !(1 & e), configurable: !(2 & e), writable: !(4 & e), value: t }; }; },
  function (e, t, r) { let n = r(45)("keys"), i = r(50); e.exports = function (e) { return n[e] || (n[e] = i(e)); }; },
  function (e, t, r) { let n = r(5), i = "__core-js_shared__", o = n[i] || (n[i] = {}); e.exports = function (e) { return o[e] || (o[e] = {}); }; },
  function (e, t, r) { let n = r(10), i = Math.max, o = Math.min; e.exports = function (e, t) { return e = n(e), e < 0 ? i(e + t, 0) : o(e, t); }; },
  function (e, t, r) { let n = r(10), i = Math.min; e.exports = function (e) { return e > 0 ? i(n(e), 9007199254740991) : 0; }; },
  function (e, t, r) { let n = r(9); e.exports = function (e) { return Object(n(e)); }; },
  function (e, t, r) {
    let n = r(6); e.exports = function (e, t) {
      if (!n(e))
        return e; let r, i; if (t && "function" == typeof (r = e.toString) && !n(i = r.call(e)))
        return i; if ("function" == typeof (r = e.valueOf) && !n(i = r.call(e)))
        return i; if (!t && "function" == typeof (r = e.toString) && !n(i = r.call(e)))
        return i; throw TypeError("Can't convert object to primitive value");
    };
  },
  function (e, t) { let r = 0, n = Math.random(); e.exports = function (e) { return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++r + n).toString(36)); }; },
  function (e, t, r) {
    let n = r(48), i = r(41); r(42)("keys",
      function () { return function (e) { return i(n(e)); }; });
  },
  function (e, t, r) {
    "use strict";
    let n = r(21)();
    e.exports = function (e) { return "string" == typeof e ? e.replace(n, "") : e; };
  },
  function (e, t, r) { e.exports = { "default": r(25), __esModule: !0 }; },
  function (e, t, r) { e.exports = { "default": r(26), __esModule: !0 }; },
  function (e, t, r) {
    "use strict";
    function n(e) { return e && e.__esModule ? e : { "default": e }; }
    let i = r(16), o = n(i), s = r(57), a = n(s);
    new o["default"]({ el: "body", components: { App: a["default"] } });
  },
  function (e, t, r) {
    "use strict";
    function n(e) { return e && e.__esModule ? e : { "default": e }; }
    Object.defineProperty(t, "__esModule", { value: !0 });
    let i = r(53), o = n(i), s = r(54), a = n(s);
    t["default"] = {
      data() { return { show: 0, msg: "", pass: !1, start: {}, nums: [] }; }, ready() {
        document.addEventListener("keyup", this.keyDown), document.querySelector("#app ul").addEventListener("touchstart", this.touchStart), document.querySelector("#app ul").addEventListener("touchend", this.touchEnd), document.addEventListener("touchmove",
          function (e) { e.target.classList.contains("box") && e.preventDefault(); }), localStorage.save1 ? this.nums = JSON.parse(localStorage.save1) : this.reset();
      }, directives: {
        getclass(e) {
          let t = this.el.classList;[].forEach.call(t,
            function (e) { /^s\w+$/.test(e) && t.remove(e); }), t.remove("empty"), e ? t.add("s" + e) : t.add("empty");
        }, getposition(e) { this.el.style.left = e % 4 * 25 + "%", this.el.style.top = 25 * Math.floor(e / 4) + "%"; }
      }, methods: {
        randomAdd() { let e = this, t = this.shuffle(this.blankIndex()); setTimeout(function (r) { e.nums.$set(t.pop(), Math.random() > .9 ? 4 : 2); }, 100); }, blankIndex() { let e = []; return this.nums.forEach(function (t, r) { "" === t && e.push(r); }), e; }, shuffle(e) {
          for (let t = e.length, r = void 0; t--;) {
            r = parseInt(Math.random() * t);
            let n = [e[r], e[t]];
            e[t] = n[0], e[r] = n[1];
          } return e;
        }, T(e, t) {
          if (t %= 4, 0 === t)
            return e; for (let r = e.length, n = Math.sqrt(r), i = [], o = 0; o < n; o += 1)
            for (let s = 0; s < n; s += 1)
              i[n - o - 1 + s * n] = e[o * n + s]; return t > 1 && (i = this.T(i, t - 1)), i;
        }, touchStart(e) { this.start.x = e.changedTouches[0].pageX, this.start.y = e.changedTouches[0].pageY; }, touchEnd(e) { let t = e.changedTouches[0], r = t.pageX - this.start.x, n = t.pageY - this.start.y, i = Math.abs(r), o = Math.abs(n), s = 0; i < 50 && o < 50 || (s = i >= o ? r < 0 ? 0 : 2 : n < 0 ? 3 : 1, this.handle(s)); }, keyDown(e) { let t = { 37: 0, 38: 3, 39: 2, 40: 1, 87: 3, 68: 2, 83: 1, 65: 0 }; e.keyCode in t && this.handle(t[e.keyCode]); }, handle(e) { this.move(e), this.save(), this.isPass(); }, move(e) {
          let t = this, r = this.T((0, a["default"])(String(Array(17))), e), n = this.T(this.nums, e), i = !1, o = {}; n.forEach(function (e, s) {
            for (let a = 0, c = r[s] - 0, l = !1, u = 0; s % 4 && "" !== e;) {
              if ("" === n[s - 1])
                n[s - 1] = e, n[s] = "", i = !0, l = !0, o[s] && (o[s - 1] = !0, o[s] = !1), a = s - 1;
              else {
                if (n[s - 1] !== e || o[s] || o[s - 1])
                  break;
                e *= 2, n[s - 1] = e, n[s] = "", i = !0, l = !0, u = e, o[s - 1] = !0, a = s - 1;
              }
              s--;
            } l && t.moveNode(c, r[a], u);
          }), setTimeout(function (r) { t.nums = t.T(n, 4 - e), i && t.randomAdd(); }, 100);
        }, moveNode(e, t, r) { let n = document.querySelectorAll(".box"), i = n[e], o = n[t].cloneNode(), s = i.cloneNode(!0), a = i.parentNode, c = e % 4 * 25 + "%", l = 25 * Math.floor(e / 4) + "%", u = n[n.length - 1].cloneNode(); u.className = "box empty", u.style.left = c, u.style.top = l, a.insertAdjacentElement("beforeEnd", u), i.style.opacity = 0, r && (o.classList.add("combin"), o.classList.add("s" + r), o.innerText = r, a.insertAdjacentElement("beforeEnd", o)), s.style.left === t % 4 * 25 + "%" ? s.classList.add("y" + 25 * Math.floor(t / 4)) : s.classList.add("x" + t % 4 * 25), a.insertAdjacentElement("beforeEnd", s), setTimeout(function (e) { s.remove(), o.remove(), u.remove(), i.style.opacity = 1; }, 200); }, save() { localStorage.save1 = (0, o["default"])(this.nums); }, reset() {
          this.nums = Array(16).join("-").split("-"); for (let e = 0; e++ < 2;)
            this.randomAdd(); this.show = 0;
        }, isPass() { let e = this, t = !0, r = this.T(this.nums, 1); this.nums.forEach(function (n, i) { n && e.nums[i - 4] != n && e.nums[i + 4] != n && r[i - 4] != r[i] && r[i + 4] != r[i] || (t = !1), 2048 != n || e.pass || (e.msg = "2048", e.show = 1, e.pass = !0); }), t && (this.msg = "Game Over", this.show = 1); }
      }
    };
  },
  function (e, t, r) { let n, i; r(15), n = r(56), i = r(20), e.exports = n || {}, e.exports.__esModule && (e.exports = e.exports["default"]), i && (("function" == typeof e.exports ? e.exports.options || (e.exports.options = {}) : e.exports).template = i); },
  function (e, t) {
    function r(e) {
      if (c === setTimeout)
        return setTimeout(e, 0); try {
          return c(e, 0);
        }
      catch (t) {
        try {
          return c.call(null, e, 0);
        }
        catch (t) {
          return c.call(this, e, 0);
        }
      }
    }
    function n(e) {
      if (l === clearTimeout)
        return clearTimeout(e); try {
          return l(e);
        }
      catch (t) {
        try {
          return l.call(null, e);
        }
        catch (t) {
          return l.call(this, e);
        }
      }
    }
    function i() { f && h && (f = !1, h.length ? p = h.concat(p) : d = -1, p.length && o()); }
    function o() {
      if (!f) {
        let e = r(i);
        f = !0;
        for (let t = p.length; t;) {
          for (h = p, p = []; ++d < t;)
            h && h[d].run();
          d = -1, t = p.length;
        }
        h = null, f = !1, n(e);
      }
    }
    function s(e, t) { this.fun = e, this.array = t; }
    function a() { } let c, l, u = e.exports = {}; !function () {
      try {
        c = setTimeout;
      }
      catch (e) {
        c = function () { throw new Error("setTimeout is not defined"); };
      } try {
        l = clearTimeout;
      }
      catch (e) {
        l = function () { throw new Error("clearTimeout is not defined"); };
      }
    }(); let h, p = [], f = !1, d = -1; u.nextTick = function (e) {
      let t = new Array(arguments.length - 1); if (arguments.length > 1)
        for (let n = 1; n < arguments.length; n++)
          t[n - 1] = arguments[n]; p.push(new s(e, t)), 1 !== p.length || f || r(o);
    }, s.prototype.run = function () { this.fun.apply(null, this.array); }, u.title = "browser", u.browser = !0, u.env = {}, u.argv = [], u.version = "", u.versions = {}, u.on = a, u.addListener = a, u.once = a, u.off = a, u.removeListener = a, u.removeAllListeners = a, u.emit = a, u.binding = function (e) { throw new Error("process.binding is not supported"); }, u.cwd = function () { return "/"; }, u.chdir = function (e) { throw new Error("process.chdir is not supported"); }, u.umask = function () { return 0; };
  },
  function (e, t) { e.exports = function (e) { return e.webpackPolyfill || (e.deprecate = function () { }, e.paths = [], e.children = [], e.webpackPolyfill = 1), e; }; },
  function (e, t, r) {
    let n, i = function () { return n.indexOf(r.h()) >= 0; }, o = function a() {
      e.hot.check(!0,
        function (t, n) { return t ? void (e.hot.status() in { abort: 1, fail: 1 } ? (console.warn("[HMR] Cannot apply update. Need to do a full reload!"), console.warn("[HMR] " + t.stack || t.message), window.location.reload()) : console.warn("[HMR] Update failed: " + t.stack || t.message)) : n ? (i() || a(), r(61)(n, n), void (i() && console.log("[HMR] App is up to date."))) : (console.warn("[HMR] Cannot find update. Need to do a full reload!"), console.warn("[HMR] (Probably because of restarting the webpack-dev-server)"), void window.location.reload()); });
    }, s = window.addEventListener ? function (e, t) { window.addEventListener(e, t, !1); } : function (e, t) { window.attachEvent("on" + e, t); }; s("message",
      function (t) { "string" == typeof t.data && 0 === t.data.indexOf("webpackHotUpdate") && (n = t.data, i() || "idle" !== e.hot.status() || (console.log("[HMR] Checking for updates on the server..."), o())); }), console.log("[HMR] Waiting for update signal from WDS...");
  },
  function (e, t) { e.exports = function (e, t) { let r = e.filter(function (e) { return t && t.indexOf(e) < 0; }); r.length > 0 && (console.warn("[HMR] The following modules couldn't be hot updated: (They would need a full reload!)"), r.forEach(function (e) { console.warn("[HMR]  - " + e); })), t && 0 !== t.length ? (console.log("[HMR] Updated modules:"), t.forEach(function (e) { console.log("[HMR]  - " + e); })) : console.log("[HMR] Nothing hot updated."); }; }
]);

//# sourceMappingURL=bundle.js.map