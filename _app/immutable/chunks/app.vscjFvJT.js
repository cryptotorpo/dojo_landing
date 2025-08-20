import {
  O as bt,
  o as mt,
  P as We,
  s as be,
  l as ee,
  i as ae,
  f as X,
  Q as fe,
  R as Z,
  S as Be,
  T as P,
  r as gt,
  U as xe,
  e as Ue,
  c as De,
  b as Ke,
  V as pe,
  W as O,
  X as Ee,
  Y as Ce,
  Z as Se,
  y as He,
  _ as ht,
  z as yt,
} from "./scheduler.pkNSFYYW.js";
import {
  S as qe,
  i as Ye,
  g as vt,
  t as B,
  c as wt,
  a as U,
  b as _t,
  d as At,
  m as kt,
  e as xt,
} from "./index.7lOteS4m.js";
import { d as Je, w as Xe, r as $ } from "./entry.06bXtA_0.js";
function Fr(e) {
  return (e == null ? void 0 : e.length) !== void 0 ? e : Array.from(e);
}
function Me(e, t) {
  const r = {},
    o = {},
    s = { $$scope: 1 };
  let n = e.length;
  for (; n--; ) {
    const i = e[n],
      a = t[n];
    if (a) {
      for (const l in i) l in a || (o[l] = 1);
      for (const l in a) s[l] || ((r[l] = a[l]), (s[l] = 1));
      e[n] = a;
    } else for (const l in i) s[l] = 1;
  }
  for (const i in o) i in r || (r[i] = void 0);
  return r;
}
function Et(e) {
  return typeof e == "object" && e !== null ? e : {};
}
var Re = (e) => (typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e),
  T = (e) => !e || typeof e != "object" || Object.keys(e).length === 0,
  Ct = (e, t) => JSON.stringify(e) === JSON.stringify(t);
function Ze(e, t) {
  e.forEach(function (r) {
    Array.isArray(r) ? Ze(r, t) : t.push(r);
  });
}
function Qe(e) {
  let t = [];
  return Ze(e, t), t;
}
var $e = (...e) => Qe(e).filter(Boolean),
  et = (e, t) => {
    let r = {},
      o = Object.keys(e),
      s = Object.keys(t);
    for (let n of o)
      if (s.includes(n)) {
        let i = e[n],
          a = t[n];
        typeof i == "object" && typeof a == "object"
          ? (r[n] = et(i, a))
          : Array.isArray(i) || Array.isArray(a)
          ? (r[n] = $e(a, i))
          : (r[n] = a + " " + i);
      } else r[n] = e[n];
    for (let n of s) o.includes(n) || (r[n] = t[n]);
    return r;
  },
  je = (e) => (!e || typeof e != "string" ? e : e.replace(/\s+/g, " ").trim());
const ze = "-";
function St(e) {
  const t = zt(e),
    { conflictingClassGroups: r, conflictingClassGroupModifiers: o } = e;
  function s(i) {
    const a = i.split(ze);
    return a[0] === "" && a.length !== 1 && a.shift(), tt(a, t) || Mt(i);
  }
  function n(i, a) {
    const l = r[i] || [];
    return a && o[i] ? [...l, ...o[i]] : l;
  }
  return { getClassGroupId: s, getConflictingClassGroupIds: n };
}
function tt(e, t) {
  var i;
  if (e.length === 0) return t.classGroupId;
  const r = e[0],
    o = t.nextPart.get(r),
    s = o ? tt(e.slice(1), o) : void 0;
  if (s) return s;
  if (t.validators.length === 0) return;
  const n = e.join(ze);
  return (i = t.validators.find(({ validator: a }) => a(n))) == null
    ? void 0
    : i.classGroupId;
}
const Te = /^\[(.+)\]$/;
function Mt(e) {
  if (Te.test(e)) {
    const t = Te.exec(e)[1],
      r = t == null ? void 0 : t.substring(0, t.indexOf(":"));
    if (r) return "arbitrary.." + r;
  }
}
function zt(e) {
  const { theme: t, prefix: r } = e,
    o = { nextPart: new Map(), validators: [] };
  return (
    Rt(Object.entries(e.classGroups), r).forEach(([n, i]) => {
      we(i, o, n, t);
    }),
    o
  );
}
function we(e, t, r, o) {
  e.forEach((s) => {
    if (typeof s == "string") {
      const n = s === "" ? t : Oe(t, s);
      n.classGroupId = r;
      return;
    }
    if (typeof s == "function") {
      if (Pt(s)) {
        we(s(o), t, r, o);
        return;
      }
      t.validators.push({ validator: s, classGroupId: r });
      return;
    }
    Object.entries(s).forEach(([n, i]) => {
      we(i, Oe(t, n), r, o);
    });
  });
}
function Oe(e, t) {
  let r = e;
  return (
    t.split(ze).forEach((o) => {
      r.nextPart.has(o) ||
        r.nextPart.set(o, { nextPart: new Map(), validators: [] }),
        (r = r.nextPart.get(o));
    }),
    r
  );
}
function Pt(e) {
  return e.isThemeGetter;
}
function Rt(e, t) {
  return t
    ? e.map(([r, o]) => {
        const s = o.map((n) =>
          typeof n == "string"
            ? t + n
            : typeof n == "object"
            ? Object.fromEntries(Object.entries(n).map(([i, a]) => [t + i, a]))
            : n
        );
        return [r, s];
      })
    : e;
}
function jt(e) {
  if (e < 1) return { get: () => {}, set: () => {} };
  let t = 0,
    r = new Map(),
    o = new Map();
  function s(n, i) {
    r.set(n, i), t++, t > e && ((t = 0), (o = r), (r = new Map()));
  }
  return {
    get(n) {
      let i = r.get(n);
      if (i !== void 0) return i;
      if ((i = o.get(n)) !== void 0) return s(n, i), i;
    },
    set(n, i) {
      r.has(n) ? r.set(n, i) : s(n, i);
    },
  };
}
const rt = "!";
function Tt(e) {
  const t = e.separator,
    r = t.length === 1,
    o = t[0],
    s = t.length;
  return function (i) {
    const a = [];
    let l = 0,
      d = 0,
      c;
    for (let w = 0; w < i.length; w++) {
      let S = i[w];
      if (l === 0) {
        if (S === o && (r || i.slice(w, w + s) === t)) {
          a.push(i.slice(d, w)), (d = w + s);
          continue;
        }
        if (S === "/") {
          c = w;
          continue;
        }
      }
      S === "[" ? l++ : S === "]" && l--;
    }
    const u = a.length === 0 ? i : i.substring(d),
      y = u.startsWith(rt),
      z = y ? u.substring(1) : u,
      v = c && c > d ? c - d : void 0;
    return {
      modifiers: a,
      hasImportantModifier: y,
      baseClassName: z,
      maybePostfixModifierPosition: v,
    };
  };
}
function Ot(e) {
  if (e.length <= 1) return e;
  const t = [];
  let r = [];
  return (
    e.forEach((o) => {
      o[0] === "[" ? (t.push(...r.sort(), o), (r = [])) : r.push(o);
    }),
    t.push(...r.sort()),
    t
  );
}
function Ft(e) {
  return { cache: jt(e.cacheSize), splitModifiers: Tt(e), ...St(e) };
}
const Gt = /\s+/;
function Nt(e, t) {
  const {
      splitModifiers: r,
      getClassGroupId: o,
      getConflictingClassGroupIds: s,
    } = t,
    n = new Set();
  return e
    .trim()
    .split(Gt)
    .map((i) => {
      const {
        modifiers: a,
        hasImportantModifier: l,
        baseClassName: d,
        maybePostfixModifierPosition: c,
      } = r(i);
      let u = o(c ? d.substring(0, c) : d),
        y = !!c;
      if (!u) {
        if (!c) return { isTailwindClass: !1, originalClassName: i };
        if (((u = o(d)), !u))
          return { isTailwindClass: !1, originalClassName: i };
        y = !1;
      }
      const z = Ot(a).join(":");
      return {
        isTailwindClass: !0,
        modifierId: l ? z + rt : z,
        classGroupId: u,
        originalClassName: i,
        hasPostfixModifier: y,
      };
    })
    .reverse()
    .filter((i) => {
      if (!i.isTailwindClass) return !0;
      const { modifierId: a, classGroupId: l, hasPostfixModifier: d } = i,
        c = a + l;
      return n.has(c)
        ? !1
        : (n.add(c), s(l, d).forEach((u) => n.add(a + u)), !0);
    })
    .reverse()
    .map((i) => i.originalClassName)
    .join(" ");
}
function Lt() {
  let e = 0,
    t,
    r,
    o = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (r = nt(t)) && (o && (o += " "), (o += r));
  return o;
}
function nt(e) {
  if (typeof e == "string") return e;
  let t,
    r = "";
  for (let o = 0; o < e.length; o++)
    e[o] && (t = nt(e[o])) && (r && (r += " "), (r += t));
  return r;
}
function _e(e, ...t) {
  let r,
    o,
    s,
    n = i;
  function i(l) {
    const d = t.reduce((c, u) => u(c), e());
    return (r = Ft(d)), (o = r.cache.get), (s = r.cache.set), (n = a), a(l);
  }
  function a(l) {
    const d = o(l);
    if (d) return d;
    const c = Nt(l, r);
    return s(l, c), c;
  }
  return function () {
    return n(Lt.apply(null, arguments));
  };
}
function C(e) {
  const t = (r) => r[e] || [];
  return (t.isThemeGetter = !0), t;
}
const ot = /^\[(?:([a-z-]+):)?(.+)\]$/i,
  It = /^\d+\/\d+$/,
  Vt = new Set(["px", "full", "screen"]),
  Wt = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
  Bt =
    /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
  Ut = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,
  Dt = /^-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
  Kt =
    /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
function G(e) {
  return J(e) || Vt.has(e) || It.test(e);
}
function I(e) {
  return te(e, "length", $t);
}
function J(e) {
  return !!e && !Number.isNaN(Number(e));
}
function ce(e) {
  return te(e, "number", J);
}
function oe(e) {
  return !!e && Number.isInteger(Number(e));
}
function Ht(e) {
  return e.endsWith("%") && J(e.slice(0, -1));
}
function b(e) {
  return ot.test(e);
}
function V(e) {
  return Wt.test(e);
}
const qt = new Set(["length", "size", "percentage"]);
function Yt(e) {
  return te(e, qt, st);
}
function Jt(e) {
  return te(e, "position", st);
}
const Xt = new Set(["image", "url"]);
function Zt(e) {
  return te(e, Xt, tr);
}
function Qt(e) {
  return te(e, "", er);
}
function se() {
  return !0;
}
function te(e, t, r) {
  const o = ot.exec(e);
  return o
    ? o[1]
      ? typeof t == "string"
        ? o[1] === t
        : t.has(o[1])
      : r(o[2])
    : !1;
}
function $t(e) {
  return Bt.test(e) && !Ut.test(e);
}
function st() {
  return !1;
}
function er(e) {
  return Dt.test(e);
}
function tr(e) {
  return Kt.test(e);
}
function Ae() {
  const e = C("colors"),
    t = C("spacing"),
    r = C("blur"),
    o = C("brightness"),
    s = C("borderColor"),
    n = C("borderRadius"),
    i = C("borderSpacing"),
    a = C("borderWidth"),
    l = C("contrast"),
    d = C("grayscale"),
    c = C("hueRotate"),
    u = C("invert"),
    y = C("gap"),
    z = C("gradientColorStops"),
    v = C("gradientColorStopPositions"),
    w = C("inset"),
    S = C("margin"),
    k = C("opacity"),
    R = C("padding"),
    D = C("saturate"),
    K = C("scale"),
    Q = C("sepia"),
    H = C("skew"),
    q = C("space"),
    Y = C("translate"),
    p = () => ["auto", "contain", "none"],
    re = () => ["auto", "hidden", "clip", "visible", "scroll"],
    ne = () => ["auto", b, t],
    f = () => [b, t],
    g = () => ["", G, I],
    m = () => ["auto", J, b],
    _ = () => [
      "bottom",
      "center",
      "left",
      "left-bottom",
      "left-top",
      "right",
      "right-bottom",
      "right-top",
      "top",
    ],
    h = () => ["solid", "dashed", "dotted", "double", "none"],
    A = () => [
      "normal",
      "multiply",
      "screen",
      "overlay",
      "darken",
      "lighten",
      "color-dodge",
      "color-burn",
      "hard-light",
      "soft-light",
      "difference",
      "exclusion",
      "hue",
      "saturation",
      "color",
      "luminosity",
      "plus-lighter",
    ],
    x = () => [
      "start",
      "end",
      "center",
      "between",
      "around",
      "evenly",
      "stretch",
    ],
    E = () => ["", "0", b],
    M = () => [
      "auto",
      "avoid",
      "all",
      "avoid-page",
      "page",
      "left",
      "right",
      "column",
    ],
    F = () => [J, ce],
    j = () => [J, b];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [se],
      spacing: [G, I],
      blur: ["none", "", V, b],
      brightness: F(),
      borderColor: [e],
      borderRadius: ["none", "", "full", V, b],
      borderSpacing: f(),
      borderWidth: g(),
      contrast: F(),
      grayscale: E(),
      hueRotate: j(),
      invert: E(),
      gap: f(),
      gradientColorStops: [e],
      gradientColorStopPositions: [Ht, I],
      inset: ne(),
      margin: ne(),
      opacity: F(),
      padding: f(),
      saturate: F(),
      scale: F(),
      sepia: E(),
      skew: j(),
      space: f(),
      translate: f(),
    },
    classGroups: {
      aspect: [{ aspect: ["auto", "square", "video", b] }],
      container: ["container"],
      columns: [{ columns: [V] }],
      "break-after": [{ "break-after": M() }],
      "break-before": [{ "break-before": M() }],
      "break-inside": [
        { "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"] },
      ],
      "box-decoration": [{ "box-decoration": ["slice", "clone"] }],
      box: [{ box: ["border", "content"] }],
      display: [
        "block",
        "inline-block",
        "inline",
        "flex",
        "inline-flex",
        "table",
        "inline-table",
        "table-caption",
        "table-cell",
        "table-column",
        "table-column-group",
        "table-footer-group",
        "table-header-group",
        "table-row-group",
        "table-row",
        "flow-root",
        "grid",
        "inline-grid",
        "contents",
        "list-item",
        "hidden",
      ],
      float: [{ float: ["right", "left", "none", "start", "end"] }],
      clear: [{ clear: ["left", "right", "both", "none", "start", "end"] }],
      isolation: ["isolate", "isolation-auto"],
      "object-fit": [
        { object: ["contain", "cover", "fill", "none", "scale-down"] },
      ],
      "object-position": [{ object: [..._(), b] }],
      overflow: [{ overflow: re() }],
      "overflow-x": [{ "overflow-x": re() }],
      "overflow-y": [{ "overflow-y": re() }],
      overscroll: [{ overscroll: p() }],
      "overscroll-x": [{ "overscroll-x": p() }],
      "overscroll-y": [{ "overscroll-y": p() }],
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      inset: [{ inset: [w] }],
      "inset-x": [{ "inset-x": [w] }],
      "inset-y": [{ "inset-y": [w] }],
      start: [{ start: [w] }],
      end: [{ end: [w] }],
      top: [{ top: [w] }],
      right: [{ right: [w] }],
      bottom: [{ bottom: [w] }],
      left: [{ left: [w] }],
      visibility: ["visible", "invisible", "collapse"],
      z: [{ z: ["auto", oe, b] }],
      basis: [{ basis: ne() }],
      "flex-direction": [
        { flex: ["row", "row-reverse", "col", "col-reverse"] },
      ],
      "flex-wrap": [{ flex: ["wrap", "wrap-reverse", "nowrap"] }],
      flex: [{ flex: ["1", "auto", "initial", "none", b] }],
      grow: [{ grow: E() }],
      shrink: [{ shrink: E() }],
      order: [{ order: ["first", "last", "none", oe, b] }],
      "grid-cols": [{ "grid-cols": [se] }],
      "col-start-end": [{ col: ["auto", { span: ["full", oe, b] }, b] }],
      "col-start": [{ "col-start": m() }],
      "col-end": [{ "col-end": m() }],
      "grid-rows": [{ "grid-rows": [se] }],
      "row-start-end": [{ row: ["auto", { span: [oe, b] }, b] }],
      "row-start": [{ "row-start": m() }],
      "row-end": [{ "row-end": m() }],
      "grid-flow": [
        { "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"] },
      ],
      "auto-cols": [{ "auto-cols": ["auto", "min", "max", "fr", b] }],
      "auto-rows": [{ "auto-rows": ["auto", "min", "max", "fr", b] }],
      gap: [{ gap: [y] }],
      "gap-x": [{ "gap-x": [y] }],
      "gap-y": [{ "gap-y": [y] }],
      "justify-content": [{ justify: ["normal", ...x()] }],
      "justify-items": [
        { "justify-items": ["start", "end", "center", "stretch"] },
      ],
      "justify-self": [
        { "justify-self": ["auto", "start", "end", "center", "stretch"] },
      ],
      "align-content": [{ content: ["normal", ...x(), "baseline"] }],
      "align-items": [
        { items: ["start", "end", "center", "baseline", "stretch"] },
      ],
      "align-self": [
        { self: ["auto", "start", "end", "center", "stretch", "baseline"] },
      ],
      "place-content": [{ "place-content": [...x(), "baseline"] }],
      "place-items": [
        { "place-items": ["start", "end", "center", "baseline", "stretch"] },
      ],
      "place-self": [
        { "place-self": ["auto", "start", "end", "center", "stretch"] },
      ],
      p: [{ p: [R] }],
      px: [{ px: [R] }],
      py: [{ py: [R] }],
      ps: [{ ps: [R] }],
      pe: [{ pe: [R] }],
      pt: [{ pt: [R] }],
      pr: [{ pr: [R] }],
      pb: [{ pb: [R] }],
      pl: [{ pl: [R] }],
      m: [{ m: [S] }],
      mx: [{ mx: [S] }],
      my: [{ my: [S] }],
      ms: [{ ms: [S] }],
      me: [{ me: [S] }],
      mt: [{ mt: [S] }],
      mr: [{ mr: [S] }],
      mb: [{ mb: [S] }],
      ml: [{ ml: [S] }],
      "space-x": [{ "space-x": [q] }],
      "space-x-reverse": ["space-x-reverse"],
      "space-y": [{ "space-y": [q] }],
      "space-y-reverse": ["space-y-reverse"],
      w: [{ w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", b, t] }],
      "min-w": [{ "min-w": [b, t, "min", "max", "fit"] }],
      "max-w": [
        {
          "max-w": [
            b,
            t,
            "none",
            "full",
            "min",
            "max",
            "fit",
            "prose",
            { screen: [V] },
            V,
          ],
        },
      ],
      h: [{ h: [b, t, "auto", "min", "max", "fit", "svh", "lvh", "dvh"] }],
      "min-h": [{ "min-h": [b, t, "min", "max", "fit", "svh", "lvh", "dvh"] }],
      "max-h": [{ "max-h": [b, t, "min", "max", "fit", "svh", "lvh", "dvh"] }],
      size: [{ size: [b, t, "auto", "min", "max", "fit"] }],
      "font-size": [{ text: ["base", V, I] }],
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      "font-style": ["italic", "not-italic"],
      "font-weight": [
        {
          font: [
            "thin",
            "extralight",
            "light",
            "normal",
            "medium",
            "semibold",
            "bold",
            "extrabold",
            "black",
            ce,
          ],
        },
      ],
      "font-family": [{ font: [se] }],
      "fvn-normal": ["normal-nums"],
      "fvn-ordinal": ["ordinal"],
      "fvn-slashed-zero": ["slashed-zero"],
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      "fvn-fraction": ["diagonal-fractions", "stacked-fractons"],
      tracking: [
        {
          tracking: [
            "tighter",
            "tight",
            "normal",
            "wide",
            "wider",
            "widest",
            b,
          ],
        },
      ],
      "line-clamp": [{ "line-clamp": ["none", J, ce] }],
      leading: [
        {
          leading: [
            "none",
            "tight",
            "snug",
            "normal",
            "relaxed",
            "loose",
            G,
            b,
          ],
        },
      ],
      "list-image": [{ "list-image": ["none", b] }],
      "list-style-type": [{ list: ["none", "disc", "decimal", b] }],
      "list-style-position": [{ list: ["inside", "outside"] }],
      "placeholder-color": [{ placeholder: [e] }],
      "placeholder-opacity": [{ "placeholder-opacity": [k] }],
      "text-alignment": [
        { text: ["left", "center", "right", "justify", "start", "end"] },
      ],
      "text-color": [{ text: [e] }],
      "text-opacity": [{ "text-opacity": [k] }],
      "text-decoration": [
        "underline",
        "overline",
        "line-through",
        "no-underline",
      ],
      "text-decoration-style": [{ decoration: [...h(), "wavy"] }],
      "text-decoration-thickness": [
        { decoration: ["auto", "from-font", G, I] },
      ],
      "underline-offset": [{ "underline-offset": ["auto", G, b] }],
      "text-decoration-color": [{ decoration: [e] }],
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      "text-wrap": [{ text: ["wrap", "nowrap", "balance", "pretty"] }],
      indent: [{ indent: f() }],
      "vertical-align": [
        {
          align: [
            "baseline",
            "top",
            "middle",
            "bottom",
            "text-top",
            "text-bottom",
            "sub",
            "super",
            b,
          ],
        },
      ],
      whitespace: [
        {
          whitespace: [
            "normal",
            "nowrap",
            "pre",
            "pre-line",
            "pre-wrap",
            "break-spaces",
          ],
        },
      ],
      break: [{ break: ["normal", "words", "all", "keep"] }],
      hyphens: [{ hyphens: ["none", "manual", "auto"] }],
      content: [{ content: ["none", b] }],
      "bg-attachment": [{ bg: ["fixed", "local", "scroll"] }],
      "bg-clip": [{ "bg-clip": ["border", "padding", "content", "text"] }],
      "bg-opacity": [{ "bg-opacity": [k] }],
      "bg-origin": [{ "bg-origin": ["border", "padding", "content"] }],
      "bg-position": [{ bg: [..._(), Jt] }],
      "bg-repeat": [
        { bg: ["no-repeat", { repeat: ["", "x", "y", "round", "space"] }] },
      ],
      "bg-size": [{ bg: ["auto", "cover", "contain", Yt] }],
      "bg-image": [
        {
          bg: [
            "none",
            { "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"] },
            Zt,
          ],
        },
      ],
      "bg-color": [{ bg: [e] }],
      "gradient-from-pos": [{ from: [v] }],
      "gradient-via-pos": [{ via: [v] }],
      "gradient-to-pos": [{ to: [v] }],
      "gradient-from": [{ from: [z] }],
      "gradient-via": [{ via: [z] }],
      "gradient-to": [{ to: [z] }],
      rounded: [{ rounded: [n] }],
      "rounded-s": [{ "rounded-s": [n] }],
      "rounded-e": [{ "rounded-e": [n] }],
      "rounded-t": [{ "rounded-t": [n] }],
      "rounded-r": [{ "rounded-r": [n] }],
      "rounded-b": [{ "rounded-b": [n] }],
      "rounded-l": [{ "rounded-l": [n] }],
      "rounded-ss": [{ "rounded-ss": [n] }],
      "rounded-se": [{ "rounded-se": [n] }],
      "rounded-ee": [{ "rounded-ee": [n] }],
      "rounded-es": [{ "rounded-es": [n] }],
      "rounded-tl": [{ "rounded-tl": [n] }],
      "rounded-tr": [{ "rounded-tr": [n] }],
      "rounded-br": [{ "rounded-br": [n] }],
      "rounded-bl": [{ "rounded-bl": [n] }],
      "border-w": [{ border: [a] }],
      "border-w-x": [{ "border-x": [a] }],
      "border-w-y": [{ "border-y": [a] }],
      "border-w-s": [{ "border-s": [a] }],
      "border-w-e": [{ "border-e": [a] }],
      "border-w-t": [{ "border-t": [a] }],
      "border-w-r": [{ "border-r": [a] }],
      "border-w-b": [{ "border-b": [a] }],
      "border-w-l": [{ "border-l": [a] }],
      "border-opacity": [{ "border-opacity": [k] }],
      "border-style": [{ border: [...h(), "hidden"] }],
      "divide-x": [{ "divide-x": [a] }],
      "divide-x-reverse": ["divide-x-reverse"],
      "divide-y": [{ "divide-y": [a] }],
      "divide-y-reverse": ["divide-y-reverse"],
      "divide-opacity": [{ "divide-opacity": [k] }],
      "divide-style": [{ divide: h() }],
      "border-color": [{ border: [s] }],
      "border-color-x": [{ "border-x": [s] }],
      "border-color-y": [{ "border-y": [s] }],
      "border-color-t": [{ "border-t": [s] }],
      "border-color-r": [{ "border-r": [s] }],
      "border-color-b": [{ "border-b": [s] }],
      "border-color-l": [{ "border-l": [s] }],
      "divide-color": [{ divide: [s] }],
      "outline-style": [{ outline: ["", ...h()] }],
      "outline-offset": [{ "outline-offset": [G, b] }],
      "outline-w": [{ outline: [G, I] }],
      "outline-color": [{ outline: [e] }],
      "ring-w": [{ ring: g() }],
      "ring-w-inset": ["ring-inset"],
      "ring-color": [{ ring: [e] }],
      "ring-opacity": [{ "ring-opacity": [k] }],
      "ring-offset-w": [{ "ring-offset": [G, I] }],
      "ring-offset-color": [{ "ring-offset": [e] }],
      shadow: [{ shadow: ["", "inner", "none", V, Qt] }],
      "shadow-color": [{ shadow: [se] }],
      opacity: [{ opacity: [k] }],
      "mix-blend": [{ "mix-blend": A() }],
      "bg-blend": [{ "bg-blend": A() }],
      filter: [{ filter: ["", "none"] }],
      blur: [{ blur: [r] }],
      brightness: [{ brightness: [o] }],
      contrast: [{ contrast: [l] }],
      "drop-shadow": [{ "drop-shadow": ["", "none", V, b] }],
      grayscale: [{ grayscale: [d] }],
      "hue-rotate": [{ "hue-rotate": [c] }],
      invert: [{ invert: [u] }],
      saturate: [{ saturate: [D] }],
      sepia: [{ sepia: [Q] }],
      "backdrop-filter": [{ "backdrop-filter": ["", "none"] }],
      "backdrop-blur": [{ "backdrop-blur": [r] }],
      "backdrop-brightness": [{ "backdrop-brightness": [o] }],
      "backdrop-contrast": [{ "backdrop-contrast": [l] }],
      "backdrop-grayscale": [{ "backdrop-grayscale": [d] }],
      "backdrop-hue-rotate": [{ "backdrop-hue-rotate": [c] }],
      "backdrop-invert": [{ "backdrop-invert": [u] }],
      "backdrop-opacity": [{ "backdrop-opacity": [k] }],
      "backdrop-saturate": [{ "backdrop-saturate": [D] }],
      "backdrop-sepia": [{ "backdrop-sepia": [Q] }],
      "border-collapse": [{ border: ["collapse", "separate"] }],
      "border-spacing": [{ "border-spacing": [i] }],
      "border-spacing-x": [{ "border-spacing-x": [i] }],
      "border-spacing-y": [{ "border-spacing-y": [i] }],
      "table-layout": [{ table: ["auto", "fixed"] }],
      caption: [{ caption: ["top", "bottom"] }],
      transition: [
        {
          transition: [
            "none",
            "all",
            "",
            "colors",
            "opacity",
            "shadow",
            "transform",
            b,
          ],
        },
      ],
      duration: [{ duration: j() }],
      ease: [{ ease: ["linear", "in", "out", "in-out", b] }],
      delay: [{ delay: j() }],
      animate: [{ animate: ["none", "spin", "ping", "pulse", "bounce", b] }],
      transform: [{ transform: ["", "gpu", "none"] }],
      scale: [{ scale: [K] }],
      "scale-x": [{ "scale-x": [K] }],
      "scale-y": [{ "scale-y": [K] }],
      rotate: [{ rotate: [oe, b] }],
      "translate-x": [{ "translate-x": [Y] }],
      "translate-y": [{ "translate-y": [Y] }],
      "skew-x": [{ "skew-x": [H] }],
      "skew-y": [{ "skew-y": [H] }],
      "transform-origin": [
        {
          origin: [
            "center",
            "top",
            "top-right",
            "right",
            "bottom-right",
            "bottom",
            "bottom-left",
            "left",
            "top-left",
            b,
          ],
        },
      ],
      accent: [{ accent: ["auto", e] }],
      appearance: [{ appearance: ["none", "auto"] }],
      cursor: [
        {
          cursor: [
            "auto",
            "default",
            "pointer",
            "wait",
            "text",
            "move",
            "help",
            "not-allowed",
            "none",
            "context-menu",
            "progress",
            "cell",
            "crosshair",
            "vertical-text",
            "alias",
            "copy",
            "no-drop",
            "grab",
            "grabbing",
            "all-scroll",
            "col-resize",
            "row-resize",
            "n-resize",
            "e-resize",
            "s-resize",
            "w-resize",
            "ne-resize",
            "nw-resize",
            "se-resize",
            "sw-resize",
            "ew-resize",
            "ns-resize",
            "nesw-resize",
            "nwse-resize",
            "zoom-in",
            "zoom-out",
            b,
          ],
        },
      ],
      "caret-color": [{ caret: [e] }],
      "pointer-events": [{ "pointer-events": ["none", "auto"] }],
      resize: [{ resize: ["none", "y", "x", ""] }],
      "scroll-behavior": [{ scroll: ["auto", "smooth"] }],
      "scroll-m": [{ "scroll-m": f() }],
      "scroll-mx": [{ "scroll-mx": f() }],
      "scroll-my": [{ "scroll-my": f() }],
      "scroll-ms": [{ "scroll-ms": f() }],
      "scroll-me": [{ "scroll-me": f() }],
      "scroll-mt": [{ "scroll-mt": f() }],
      "scroll-mr": [{ "scroll-mr": f() }],
      "scroll-mb": [{ "scroll-mb": f() }],
      "scroll-ml": [{ "scroll-ml": f() }],
      "scroll-p": [{ "scroll-p": f() }],
      "scroll-px": [{ "scroll-px": f() }],
      "scroll-py": [{ "scroll-py": f() }],
      "scroll-ps": [{ "scroll-ps": f() }],
      "scroll-pe": [{ "scroll-pe": f() }],
      "scroll-pt": [{ "scroll-pt": f() }],
      "scroll-pr": [{ "scroll-pr": f() }],
      "scroll-pb": [{ "scroll-pb": f() }],
      "scroll-pl": [{ "scroll-pl": f() }],
      "snap-align": [{ snap: ["start", "end", "center", "align-none"] }],
      "snap-stop": [{ snap: ["normal", "always"] }],
      "snap-type": [{ snap: ["none", "x", "y", "both"] }],
      "snap-strictness": [{ snap: ["mandatory", "proximity"] }],
      touch: [{ touch: ["auto", "none", "manipulation"] }],
      "touch-x": [{ "touch-pan": ["x", "left", "right"] }],
      "touch-y": [{ "touch-pan": ["y", "up", "down"] }],
      "touch-pz": ["touch-pinch-zoom"],
      select: [{ select: ["none", "text", "all", "auto"] }],
      "will-change": [
        { "will-change": ["auto", "scroll", "contents", "transform", b] },
      ],
      fill: [{ fill: [e, "none"] }],
      "stroke-w": [{ stroke: [G, I, ce] }],
      stroke: [{ stroke: [e, "none"] }],
      sr: ["sr-only", "not-sr-only"],
      "forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }],
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: [
        "inset-x",
        "inset-y",
        "start",
        "end",
        "top",
        "right",
        "bottom",
        "left",
      ],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": [
        "fvn-ordinal",
        "fvn-slashed-zero",
        "fvn-figure",
        "fvn-spacing",
        "fvn-fraction",
      ],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: [
        "rounded-s",
        "rounded-e",
        "rounded-t",
        "rounded-r",
        "rounded-b",
        "rounded-l",
        "rounded-ss",
        "rounded-se",
        "rounded-ee",
        "rounded-es",
        "rounded-tl",
        "rounded-tr",
        "rounded-br",
        "rounded-bl",
      ],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": [
        "border-w-s",
        "border-w-e",
        "border-w-t",
        "border-w-r",
        "border-w-b",
        "border-w-l",
      ],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": [
        "border-color-t",
        "border-color-r",
        "border-color-b",
        "border-color-l",
      ],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": [
        "scroll-mx",
        "scroll-my",
        "scroll-ms",
        "scroll-me",
        "scroll-mt",
        "scroll-mr",
        "scroll-mb",
        "scroll-ml",
      ],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": [
        "scroll-px",
        "scroll-py",
        "scroll-ps",
        "scroll-pe",
        "scroll-pt",
        "scroll-pr",
        "scroll-pb",
        "scroll-pl",
      ],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"],
    },
    conflictingClassGroupModifiers: { "font-size": ["leading"] },
  };
}
function rr(
  e,
  { cacheSize: t, prefix: r, separator: o, extend: s = {}, override: n = {} }
) {
  de(e, "cacheSize", t), de(e, "prefix", r), de(e, "separator", o);
  for (const i in n) nr(e[i], n[i]);
  for (const i in s) or(e[i], s[i]);
  return e;
}
function de(e, t, r) {
  r !== void 0 && (e[t] = r);
}
function nr(e, t) {
  if (t) for (const r in t) de(e, r, t[r]);
}
function or(e, t) {
  if (t)
    for (const r in t) {
      const o = t[r];
      o !== void 0 && (e[r] = (e[r] || []).concat(o));
    }
}
function sr(e, ...t) {
  return typeof e == "function" ? _e(Ae, e, ...t) : _e(() => rr(Ae(), e), ...t);
}
const it = _e(Ae);
var ir = { twMerge: !0, twMergeConfig: {}, responsiveVariants: !1 },
  lt = (e) => e || void 0,
  le = (...e) => lt(Qe(e).filter(Boolean).join(" ")),
  he = null,
  N = {},
  ke = !1,
  ie =
    (...e) =>
    (t) =>
      t.twMerge
        ? ((!he || ke) &&
            ((ke = !1),
            (he = T(N)
              ? it
              : sr({
                  ...N,
                  extend: {
                    theme: N.theme,
                    classGroups: N.classGroups,
                    conflictingClassGroupModifiers:
                      N.conflictingClassGroupModifiers,
                    conflictingClassGroups: N.conflictingClassGroups,
                    ...N.extend,
                  },
                }))),
          lt(he(le(e))))
        : le(e),
  Fe = (e, t) => {
    for (let r in t)
      e.hasOwnProperty(r) ? (e[r] = le(e[r], t[r])) : (e[r] = t[r]);
    return e;
  },
  lr = (e, t) => {
    let {
        extend: r = null,
        slots: o = {},
        variants: s = {},
        compoundVariants: n = [],
        compoundSlots: i = [],
        defaultVariants: a = {},
      } = e,
      l = { ...ir, ...t },
      d =
        r != null && r.base
          ? le(r.base, e == null ? void 0 : e.base)
          : e == null
          ? void 0
          : e.base,
      c = r != null && r.variants && !T(r.variants) ? et(s, r.variants) : s,
      u =
        r != null && r.defaultVariants && !T(r.defaultVariants)
          ? { ...r.defaultVariants, ...a }
          : a;
    !T(l.twMergeConfig) &&
      !Ct(l.twMergeConfig, N) &&
      ((ke = !0), (N = l.twMergeConfig));
    let y = T(r == null ? void 0 : r.slots),
      z = T(o)
        ? {}
        : {
            base: le(
              e == null ? void 0 : e.base,
              y && (r == null ? void 0 : r.base)
            ),
            ...o,
          },
      v = y
        ? z
        : Fe(
            { ...(r == null ? void 0 : r.slots) },
            T(z) ? { base: e == null ? void 0 : e.base } : z
          ),
      w = (k) => {
        if (T(c) && T(o) && y)
          return ie(
            d,
            k == null ? void 0 : k.class,
            k == null ? void 0 : k.className
          )(l);
        if (n && !Array.isArray(n))
          throw new TypeError(
            `The "compoundVariants" prop must be an array. Received: ${typeof n}`
          );
        if (i && !Array.isArray(i))
          throw new TypeError(
            `The "compoundSlots" prop must be an array. Received: ${typeof i}`
          );
        let R = (f, g, m = [], _) => {
            let h = m;
            if (typeof g == "string")
              h = h.concat(
                je(g)
                  .split(" ")
                  .map((A) => `${f}:${A}`)
              );
            else if (Array.isArray(g))
              h = h.concat(g.reduce((A, x) => A.concat(`${f}:${x}`), []));
            else if (typeof g == "object" && typeof _ == "string") {
              for (let A in g)
                if (g.hasOwnProperty(A) && A === _) {
                  let x = g[A];
                  if (x && typeof x == "string") {
                    let E = je(x);
                    h[_]
                      ? (h[_] = h[_].concat(
                          E.split(" ").map((M) => `${f}:${M}`)
                        ))
                      : (h[_] = E.split(" ").map((M) => `${f}:${M}`));
                  } else
                    Array.isArray(x) &&
                      x.length > 0 &&
                      (h[_] = x.reduce((E, M) => E.concat(`${f}:${M}`), []));
                }
            }
            return h;
          },
          D = (f, g = c, m = null, _ = null) => {
            var h;
            let A = g[f];
            if (!A || T(A)) return null;
            let x =
              (h = _ == null ? void 0 : _[f]) != null
                ? h
                : k == null
                ? void 0
                : k[f];
            if (x === null) return null;
            let E = Re(x),
              M =
                (Array.isArray(l.responsiveVariants) &&
                  l.responsiveVariants.length > 0) ||
                l.responsiveVariants === !0,
              F = u == null ? void 0 : u[f],
              j = [];
            if (typeof E == "object" && M)
              for (let [ge, Pe] of Object.entries(E)) {
                let pt = A[Pe];
                if (ge === "initial") {
                  F = Pe;
                  continue;
                }
                (Array.isArray(l.responsiveVariants) &&
                  !l.responsiveVariants.includes(ge)) ||
                  (j = R(ge, pt, j, m));
              }
            let ft = E != null && typeof E != "object" ? E : Re(F),
              me = A[ft] || A.false;
            return typeof j == "object" && typeof m == "string" && j[m]
              ? Fe(j, me)
              : j.length > 0
              ? (j.push(me), j)
              : me;
          },
          K = () => (c ? Object.keys(c).map((f) => D(f, c)) : null),
          Q = (f, g) => {
            if (!c || typeof c != "object") return null;
            let m = new Array();
            for (let _ in c) {
              let h = D(_, c, f, g),
                A = f === "base" && typeof h == "string" ? h : h && h[f];
              A && (m[m.length] = A);
            }
            return m;
          },
          H = {};
        for (let f in k) k[f] !== void 0 && (H[f] = k[f]);
        let q = (f, g) => {
            var m;
            let _ =
              typeof (k == null ? void 0 : k[f]) == "object"
                ? { [f]: (m = k[f]) == null ? void 0 : m.initial }
                : {};
            return { ...u, ...H, ..._, ...g };
          },
          Y = (f = [], g) => {
            let m = [];
            for (let { class: _, className: h, ...A } of f) {
              let x = !0;
              for (let [E, M] of Object.entries(A)) {
                let F = q(E, g);
                if (Array.isArray(M)) {
                  if (!M.includes(F[E])) {
                    x = !1;
                    break;
                  }
                } else if (F[E] !== M) {
                  x = !1;
                  break;
                }
              }
              x && (_ && m.push(_), h && m.push(h));
            }
            return m;
          },
          p = (f) => {
            let g = Y(n, f),
              m = Y(r == null ? void 0 : r.compoundVariants, f);
            return $e(m, g);
          },
          re = (f) => {
            let g = p(f);
            if (!Array.isArray(g)) return g;
            let m = {};
            for (let _ of g)
              if (
                (typeof _ == "string" && (m.base = ie(m.base, _)(l)),
                typeof _ == "object")
              )
                for (let [h, A] of Object.entries(_)) m[h] = ie(m[h], A)(l);
            return m;
          },
          ne = (f) => {
            if (i.length < 1) return null;
            let g = {};
            for (let { slots: m = [], class: _, className: h, ...A } of i) {
              if (!T(A)) {
                let x = !0;
                for (let E of Object.keys(A)) {
                  let M = q(E, f)[E];
                  if (
                    M === void 0 ||
                    (Array.isArray(A[E]) ? !A[E].includes(M) : A[E] !== M)
                  ) {
                    x = !1;
                    break;
                  }
                }
                if (!x) continue;
              }
              for (let x of m) (g[x] = g[x] || []), g[x].push([_, h]);
            }
            return g;
          };
        if (!T(o) || !y) {
          let f = {};
          if (typeof v == "object" && !T(v))
            for (let g of Object.keys(v))
              f[g] = (m) => {
                var _, h;
                return ie(
                  v[g],
                  Q(g, m),
                  ((_ = re(m)) != null ? _ : [])[g],
                  ((h = ne(m)) != null ? h : [])[g],
                  m == null ? void 0 : m.class,
                  m == null ? void 0 : m.className
                )(l);
              };
          return f;
        }
        return ie(
          d,
          K(),
          p(),
          k == null ? void 0 : k.class,
          k == null ? void 0 : k.className
        )(l);
      },
      S = () => {
        if (!(!c || typeof c != "object")) return Object.keys(c);
      };
    return (
      (w.variantKeys = S()),
      (w.extend = r),
      (w.base = d),
      (w.slots = v),
      (w.variants = c),
      (w.defaultVariants = u),
      (w.compoundSlots = i),
      (w.compoundVariants = n),
      w
    );
  };
function at(e) {
  var t,
    r,
    o = "";
  if (typeof e == "string" || typeof e == "number") o += e;
  else if (typeof e == "object")
    if (Array.isArray(e)) {
      var s = e.length;
      for (t = 0; t < s; t++)
        e[t] && (r = at(e[t])) && (o && (o += " "), (o += r));
    } else for (r in e) e[r] && (o && (o += " "), (o += r));
  return o;
}
function ar() {
  for (var e, t, r = 0, o = "", s = arguments.length; r < s; r++)
    (e = arguments[r]) && (t = at(e)) && (o && (o += " "), (o += t));
  return o;
}
function Gr(e) {
  return e < 0.5 ? 4 * e * e * e : 0.5 * Math.pow(2 * e - 2, 3) + 1;
}
function cr(e) {
  const t = e - 1;
  return t * t * t + 1;
}
function Ge(...e) {
  return it(ar(e));
}
const Nr = (e, t = { y: -8, x: 0, start: 0.95, duration: 150 }) => {
  const r = getComputedStyle(e),
    o = r.transform === "none" ? "" : r.transform,
    s = (i, a, l) => {
      const [d, c] = a,
        [u, y] = l;
      return ((i - d) / (c - d)) * (y - u) + u;
    },
    n = (i) =>
      Object.keys(i).reduce(
        (a, l) => (i[l] === void 0 ? a : a + l + ":" + i[l] + ";"),
        ""
      );
  return {
    duration: t.duration ?? 200,
    delay: 0,
    css: (i) => {
      const a = s(i, [0, 1], [t.y ?? 5, 0]),
        l = s(i, [0, 1], [t.x ?? 0, 0]),
        d = s(i, [0, 1], [t.start ?? 0.95, 1]);
      return n({
        transform:
          o + "translate3d(" + l + "px, " + a + "px, 0) scale(" + d + ")",
        opacity: i,
      });
    },
    easing: cr,
  };
};
function ur(e) {
  return Object.keys(e).reduce(
    (t, r) => (e[r] === void 0 ? t : t + `${r}:${e[r]};`),
    ""
  );
}
function Lr(e) {
  return e ? !0 : void 0;
}
ur({
  position: "absolute",
  opacity: 0,
  "pointer-events": "none",
  margin: 0,
  transform: "translateX(-100%)",
});
function Ir(e) {
  if (e !== null) return "";
}
function Ne(e) {
  function t(r) {
    return r(e), () => {};
  }
  return { subscribe: t };
}
const ue = (e) =>
    new Proxy(e, {
      get(t, r, o) {
        return Reflect.get(t, r, o);
      },
      ownKeys(t) {
        return Reflect.ownKeys(t).filter((r) => r !== "action");
      },
    }),
  Le = (e) => typeof e == "function";
dr("empty");
function dr(e, t) {
  const { stores: r, action: o, returned: s } = t ?? {},
    n = (() => {
      if (r && s)
        return Je(r, (a) => {
          const l = s(a);
          if (Le(l)) {
            const d = (...c) =>
              ue({ ...l(...c), [`data-melt-${e}`]: "", action: o ?? W });
            return (d.action = o ?? W), d;
          }
          return ue({ ...l, [`data-melt-${e}`]: "", action: o ?? W });
        });
      {
        const a = s,
          l = a == null ? void 0 : a();
        if (Le(l)) {
          const d = (...c) =>
            ue({ ...l(...c), [`data-melt-${e}`]: "", action: o ?? W });
          return (d.action = o ?? W), Ne(d);
        }
        return Ne(ue({ ...l, [`data-melt-${e}`]: "", action: o ?? W }));
      }
    })(),
    i = o ?? (() => {});
  return (i.subscribe = n.subscribe), i;
}
function Vr(e) {
  const t = (n) => (n ? `${e}-${n}` : e),
    r = (n) => `data-melt-${e}${n ? `-${n}` : ""}`,
    o = (n) => `[data-melt-${e}${n ? `-${n}` : ""}]`;
  return {
    name: t,
    attribute: r,
    selector: o,
    getEl: (n) => document.querySelector(o(n)),
  };
}
const Wr = typeof document < "u",
  fr = (e) => typeof e == "function";
function Br(e) {
  return e instanceof Element;
}
function ct(e) {
  return e instanceof HTMLElement;
}
function Ur(e) {
  const t = e.getAttribute("aria-disabled"),
    r = e.getAttribute("disabled"),
    o = e.hasAttribute("data-disabled");
  return !!(t === "true" || r !== null || o);
}
function pr(e) {
  return e !== null && typeof e == "object";
}
function br(e) {
  return pr(e) && "subscribe" in e;
}
function mr(...e) {
  return (...t) => {
    for (const r of e) typeof r == "function" && r(...t);
  };
}
function W() {}
function ut(e, t, r, o) {
  const s = Array.isArray(t) ? t : [t];
  return (
    s.forEach((n) => e.addEventListener(n, r, o)),
    () => {
      s.forEach((n) => e.removeEventListener(n, r, o));
    }
  );
}
function Dr(e, t, r, o) {
  const s = Array.isArray(t) ? t : [t];
  if (typeof r == "function") {
    const n = hr((i) => r(i));
    return (
      s.forEach((i) => e.addEventListener(i, n, o)),
      () => {
        s.forEach((i) => e.removeEventListener(i, n, o));
      }
    );
  }
  return () => void 0;
}
function gr(e) {
  const t = e.currentTarget;
  if (!ct(t)) return null;
  const r = new CustomEvent(`m-${e.type}`, {
    detail: { originalEvent: e },
    cancelable: !0,
  });
  return t.dispatchEvent(r), r;
}
function hr(e) {
  return (t) => {
    const r = gr(t);
    if (!(r != null && r.defaultPrevented)) return e(t);
  };
}
const Kr = (e) => {
    try {
      mt(e);
    } catch {
      return e;
    }
  },
  yr = (e) => {
    try {
      bt(e);
    } catch {
      return e;
    }
  };
function dt(e) {
  return { ...e, get: () => We(e) };
}
dt.writable = function (e) {
  const t = Xe(e);
  let r = e;
  return {
    subscribe: t.subscribe,
    set(o) {
      t.set(o), (r = o);
    },
    update(o) {
      const s = o(r);
      t.set(s), (r = s);
    },
    get() {
      return r;
    },
  };
};
dt.derived = function (e, t) {
  const r = new Map(),
    o = () => {
      const n = Array.isArray(e) ? e.map((i) => i.get()) : e.get();
      return t(n);
    };
  return {
    get: o,
    subscribe: (n) => {
      const i = [];
      return (
        (Array.isArray(e) ? e : [e]).forEach((l) => {
          i.push(
            l.subscribe(() => {
              n(o());
            })
          );
        }),
        n(o()),
        r.set(n, i),
        () => {
          const l = r.get(n);
          if (l) for (const d of l) d();
          r.delete(n);
        }
      );
    },
  };
};
const L = {
    ALT: "Alt",
    ARROW_DOWN: "ArrowDown",
    ARROW_LEFT: "ArrowLeft",
    ARROW_RIGHT: "ArrowRight",
    ARROW_UP: "ArrowUp",
    BACKSPACE: "Backspace",
    CAPS_LOCK: "CapsLock",
    CONTROL: "Control",
    DELETE: "Delete",
    END: "End",
    ENTER: "Enter",
    ESCAPE: "Escape",
    F1: "F1",
    F10: "F10",
    F11: "F11",
    F12: "F12",
    F2: "F2",
    F3: "F3",
    F4: "F4",
    F5: "F5",
    F6: "F6",
    F7: "F7",
    F8: "F8",
    F9: "F9",
    HOME: "Home",
    META: "Meta",
    PAGE_DOWN: "PageDown",
    PAGE_UP: "PageUp",
    SHIFT: "Shift",
    SPACE: " ",
    TAB: "Tab",
    CTRL: "Control",
    ASTERISK: "*",
    A: "a",
    P: "p",
  },
  vr = [L.ARROW_DOWN, L.PAGE_UP, L.HOME],
  wr = [L.ARROW_UP, L.PAGE_DOWN, L.END],
  Hr = [...vr, ...wr],
  qr = [L.ENTER, L.SPACE];
function _r(e, t) {
  let r;
  const o = Je(e, (n) => {
      r == null || r(), (r = t(n));
    }).subscribe(W),
    s = () => {
      o(), r == null || r();
    };
  return yr(s), s;
}
$(void 0, (e) => {
  function t(o) {
    e(o), e(void 0);
  }
  return ut(document, "pointerup", t, { passive: !1, capture: !0 });
});
const Ar = $(void 0, (e) => {
    function t(o) {
      o && o.key === L.ESCAPE && e(o), e(void 0);
    }
    return ut(document, "keydown", t, { passive: !1 });
  }),
  Yr = (e, t = {}) => {
    let r = W;
    function o(s = {}) {
      r();
      const n = { enabled: !0, ...s },
        i = br(n.enabled) ? n.enabled : $(n.enabled);
      r = mr(
        Ar.subscribe((a) => {
          var d;
          if (!a || !We(i)) return;
          const l = a.target;
          if (!(!ct(l) || l.closest("[data-escapee]") !== e)) {
            if ((a.preventDefault(), n.ignore)) {
              if (fr(n.ignore)) {
                if (n.ignore(a)) return;
              } else if (
                Array.isArray(n.ignore) &&
                n.ignore.length > 0 &&
                n.ignore.some((c) => c && l === c)
              )
                return;
            }
            (d = n.handler) == null || d.call(n, a);
          }
        }),
        _r(i, (a) => {
          a ? (e.dataset.escapee = "") : delete e.dataset.escapee;
        })
      );
    }
    return (
      o(t),
      {
        update: o,
        destroy() {
          e.removeAttribute("data-escapee"), r();
        },
      }
    );
  };
$(!1), $(!1), $(void 0);
function kr(e, t) {
  const r = [];
  return (
    t.builders.forEach((o) => {
      const s = o.action(e);
      s && r.push(s);
    }),
    {
      destroy: () => {
        r.forEach((o) => {
          o.destroy && o.destroy();
        });
      },
    }
  );
}
function Ie(e) {
  const t = {};
  return (
    e.forEach((r) => {
      Object.keys(r).forEach((o) => {
        o !== "action" && (t[o] = r[o]);
      });
    }),
    t
  );
}
function xr(e) {
  let t = e[1] ? "a" : "button",
    r,
    o,
    s = (e[1] ? "a" : "button") && ye(e);
  return {
    c() {
      s && s.c(), (r = ee());
    },
    l(n) {
      s && s.l(n), (r = ee());
    },
    m(n, i) {
      s && s.m(n, i), ae(n, r, i), (o = !0);
    },
    p(n, i) {
      n[1],
        t
          ? be(t, n[1] ? "a" : "button")
            ? (s.d(1),
              (s = ye(n)),
              (t = n[1] ? "a" : "button"),
              s.c(),
              s.m(r.parentNode, r))
            : s.p(n, i)
          : ((s = ye(n)),
            (t = n[1] ? "a" : "button"),
            s.c(),
            s.m(r.parentNode, r));
    },
    i(n) {
      o || (U(s, n), (o = !0));
    },
    o(n) {
      B(s, n), (o = !1);
    },
    d(n) {
      n && X(r), s && s.d(n);
    },
  };
}
function Er(e) {
  let t = e[1] ? "a" : "button",
    r,
    o,
    s = (e[1] ? "a" : "button") && ve(e);
  return {
    c() {
      s && s.c(), (r = ee());
    },
    l(n) {
      s && s.l(n), (r = ee());
    },
    m(n, i) {
      s && s.m(n, i), ae(n, r, i), (o = !0);
    },
    p(n, i) {
      n[1],
        t
          ? be(t, n[1] ? "a" : "button")
            ? (s.d(1),
              (s = ve(n)),
              (t = n[1] ? "a" : "button"),
              s.c(),
              s.m(r.parentNode, r))
            : s.p(n, i)
          : ((s = ve(n)),
            (t = n[1] ? "a" : "button"),
            s.c(),
            s.m(r.parentNode, r));
    },
    i(n) {
      o || (U(s, n), (o = !0));
    },
    o(n) {
      B(s, n), (o = !1);
    },
    d(n) {
      n && X(r), s && s.d(n);
    },
  };
}
function ye(e) {
  let t, r, o, s, n;
  const i = e[7].default,
    a = xe(i, e, e[6], null);
  let l = [
      { type: (r = e[1] ? void 0 : e[2]) },
      { href: e[1] },
      { tabindex: "0" },
      e[5],
      e[4],
    ],
    d = {};
  for (let c = 0; c < l.length; c += 1) d = Z(d, l[c]);
  return {
    c() {
      (t = Ue(e[1] ? "a" : "button")), a && a.c(), this.h();
    },
    l(c) {
      t = De(c, ((e[1] ? "a" : "button") || "null").toUpperCase(), {
        type: !0,
        href: !0,
        tabindex: !0,
      });
      var u = Ke(t);
      a && a.l(u), u.forEach(X), this.h();
    },
    h() {
      pe(e[1] ? "a" : "button")(t, d);
    },
    m(c, u) {
      ae(c, t, u),
        a && a.m(t, null),
        (o = !0),
        s ||
          ((n = [
            O(t, "click", e[14]),
            O(t, "change", e[15]),
            O(t, "keydown", e[16]),
            O(t, "keyup", e[17]),
            O(t, "mouseenter", e[18]),
            O(t, "mouseleave", e[19]),
          ]),
          (s = !0));
    },
    p(c, u) {
      a &&
        a.p &&
        (!o || u & 64) &&
        Ee(a, i, c, c[6], o ? Se(i, c[6], u, null) : Ce(c[6]), null),
        pe(c[1] ? "a" : "button")(
          t,
          (d = Me(l, [
            (!o || (u & 6 && r !== (r = c[1] ? void 0 : c[2]))) && { type: r },
            (!o || u & 2) && { href: c[1] },
            { tabindex: "0" },
            u & 32 && c[5],
            c[4],
          ]))
        );
    },
    i(c) {
      o || (U(a, c), (o = !0));
    },
    o(c) {
      B(a, c), (o = !1);
    },
    d(c) {
      c && X(t), a && a.d(c), (s = !1), He(n);
    },
  };
}
function ve(e) {
  let t, r, o, s, n, i;
  const a = e[7].default,
    l = xe(a, e, e[6], null);
  let d = [
      { type: (r = e[1] ? void 0 : e[2]) },
      { href: e[1] },
      { tabindex: "0" },
      Ie(e[3]),
      e[5],
      e[4],
    ],
    c = {};
  for (let u = 0; u < d.length; u += 1) c = Z(c, d[u]);
  return {
    c() {
      (t = Ue(e[1] ? "a" : "button")), l && l.c(), this.h();
    },
    l(u) {
      t = De(u, ((e[1] ? "a" : "button") || "null").toUpperCase(), {
        type: !0,
        href: !0,
        tabindex: !0,
      });
      var y = Ke(t);
      l && l.l(y), y.forEach(X), this.h();
    },
    h() {
      pe(e[1] ? "a" : "button")(t, c);
    },
    m(u, y) {
      ae(u, t, y),
        l && l.m(t, null),
        e[20](t),
        (s = !0),
        n ||
          ((i = [
            O(t, "click", e[8]),
            O(t, "change", e[9]),
            O(t, "keydown", e[10]),
            O(t, "keyup", e[11]),
            O(t, "mouseenter", e[12]),
            O(t, "mouseleave", e[13]),
            ht((o = kr.call(null, t, { builders: e[3] }))),
          ]),
          (n = !0));
    },
    p(u, y) {
      l &&
        l.p &&
        (!s || y & 64) &&
        Ee(l, a, u, u[6], s ? Se(a, u[6], y, null) : Ce(u[6]), null),
        pe(u[1] ? "a" : "button")(
          t,
          (c = Me(d, [
            (!s || (y & 6 && r !== (r = u[1] ? void 0 : u[2]))) && { type: r },
            (!s || y & 2) && { href: u[1] },
            { tabindex: "0" },
            y & 8 && Ie(u[3]),
            y & 32 && u[5],
            u[4],
          ]))
        ),
        o && yt(o.update) && y & 8 && o.update.call(null, { builders: u[3] });
    },
    i(u) {
      s || (U(l, u), (s = !0));
    },
    o(u) {
      B(l, u), (s = !1);
    },
    d(u) {
      u && X(t), l && l.d(u), e[20](null), (n = !1), He(i);
    },
  };
}
function Cr(e) {
  let t, r, o, s;
  const n = [Er, xr],
    i = [];
  function a(l, d) {
    return l[3] && l[3].length ? 0 : 1;
  }
  return (
    (t = a(e)),
    (r = i[t] = n[t](e)),
    {
      c() {
        r.c(), (o = ee());
      },
      l(l) {
        r.l(l), (o = ee());
      },
      m(l, d) {
        i[t].m(l, d), ae(l, o, d), (s = !0);
      },
      p(l, [d]) {
        let c = t;
        (t = a(l)),
          t === c
            ? i[t].p(l, d)
            : (vt(),
              B(i[c], 1, 1, () => {
                i[c] = null;
              }),
              wt(),
              (r = i[t]),
              r ? r.p(l, d) : ((r = i[t] = n[t](l)), r.c()),
              U(r, 1),
              r.m(o.parentNode, o));
      },
      i(l) {
        s || (U(r), (s = !0));
      },
      o(l) {
        B(r), (s = !1);
      },
      d(l) {
        l && X(o), i[t].d(l);
      },
    }
  );
}
function Sr(e, t, r) {
  const o = ["href", "type", "builders", "el"];
  let s = fe(t, o),
    { $$slots: n = {}, $$scope: i } = t,
    { href: a = void 0 } = t,
    { type: l = void 0 } = t,
    { builders: d = [] } = t,
    { el: c = void 0 } = t;
  const u = { "data-button-root": "" };
  function y(p) {
    P.call(this, e, p);
  }
  function z(p) {
    P.call(this, e, p);
  }
  function v(p) {
    P.call(this, e, p);
  }
  function w(p) {
    P.call(this, e, p);
  }
  function S(p) {
    P.call(this, e, p);
  }
  function k(p) {
    P.call(this, e, p);
  }
  function R(p) {
    P.call(this, e, p);
  }
  function D(p) {
    P.call(this, e, p);
  }
  function K(p) {
    P.call(this, e, p);
  }
  function Q(p) {
    P.call(this, e, p);
  }
  function H(p) {
    P.call(this, e, p);
  }
  function q(p) {
    P.call(this, e, p);
  }
  function Y(p) {
    gt[p ? "unshift" : "push"](() => {
      (c = p), r(0, c);
    });
  }
  return (
    (e.$$set = (p) => {
      (t = Z(Z({}, t), Be(p))),
        r(5, (s = fe(t, o))),
        "href" in p && r(1, (a = p.href)),
        "type" in p && r(2, (l = p.type)),
        "builders" in p && r(3, (d = p.builders)),
        "el" in p && r(0, (c = p.el)),
        "$$scope" in p && r(6, (i = p.$$scope));
    }),
    [c, a, l, d, u, s, i, n, y, z, v, w, S, k, R, D, K, Q, H, q, Y]
  );
}
let Mr = class extends qe {
  constructor(t) {
    super(), Ye(this, t, Sr, Cr, be, { href: 1, type: 2, builders: 3, el: 0 });
  }
};
function zr(e) {
  let t;
  const r = e[6].default,
    o = xe(r, e, e[9], null);
  return {
    c() {
      o && o.c();
    },
    l(s) {
      o && o.l(s);
    },
    m(s, n) {
      o && o.m(s, n), (t = !0);
    },
    p(s, n) {
      o &&
        o.p &&
        (!t || n & 512) &&
        Ee(o, r, s, s[9], t ? Se(r, s[9], n, null) : Ce(s[9]), null);
    },
    i(s) {
      t || (U(o, s), (t = !0));
    },
    o(s) {
      B(o, s), (t = !1);
    },
    d(s) {
      o && o.d(s);
    },
  };
}
function Pr(e) {
  let t, r;
  const o = [
    { builders: e[3] },
    { class: Ge(Ve({ variant: e[1], size: e[2], className: e[0] })) },
    { type: "button" },
    { disabled: e[4] },
    e[5],
  ];
  let s = { $$slots: { default: [zr] }, $$scope: { ctx: e } };
  for (let n = 0; n < o.length; n += 1) s = Z(s, o[n]);
  return (
    (t = new Mr({ props: s })),
    t.$on("click", e[7]),
    t.$on("keydown", e[8]),
    {
      c() {
        _t(t.$$.fragment);
      },
      l(n) {
        At(t.$$.fragment, n);
      },
      m(n, i) {
        kt(t, n, i), (r = !0);
      },
      p(n, [i]) {
        const a =
          i & 63
            ? Me(o, [
                i & 8 && { builders: n[3] },
                i & 7 && {
                  class: Ge(Ve({ variant: n[1], size: n[2], className: n[0] })),
                },
                o[2],
                i & 16 && { disabled: n[4] },
                i & 32 && Et(n[5]),
              ])
            : {};
        i & 512 && (a.$$scope = { dirty: i, ctx: n }), t.$set(a);
      },
      i(n) {
        r || (U(t.$$.fragment, n), (r = !0));
      },
      o(n) {
        B(t.$$.fragment, n), (r = !1);
      },
      d(n) {
        xt(t, n);
      },
    }
  );
}
function Rr(e, t, r) {
  const o = ["class", "variant", "size", "builders", "disabled"];
  let s = fe(t, o),
    { $$slots: n = {}, $$scope: i } = t,
    { class: a = void 0 } = t,
    { variant: l = "default" } = t,
    { size: d = "default" } = t,
    { builders: c = [] } = t,
    { disabled: u = !1 } = t;
  function y(v) {
    P.call(this, e, v);
  }
  function z(v) {
    P.call(this, e, v);
  }
  return (
    (e.$$set = (v) => {
      (t = Z(Z({}, t), Be(v))),
        r(5, (s = fe(t, o))),
        "class" in v && r(0, (a = v.class)),
        "variant" in v && r(1, (l = v.variant)),
        "size" in v && r(2, (d = v.size)),
        "builders" in v && r(3, (c = v.builders)),
        "disabled" in v && r(4, (u = v.disabled)),
        "$$scope" in v && r(9, (i = v.$$scope));
    }),
    [a, l, d, c, u, s, n, y, z, i]
  );
}
class Xr extends qe {
  constructor(t) {
    super(),
      Ye(this, t, Rr, Pr, be, {
        class: 0,
        variant: 1,
        size: 2,
        builders: 3,
        disabled: 4,
      });
  }
}
const Ve = lr({
    base: "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium font-proxima-nova ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-30 rounded-md",
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-gradient-to-b hover:from-[#0000000D] hover:to-[#0000000D] hover:text-black",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        warning: "bg-warning/75 text-warning-foreground hover:bg-warning/65",
        outline: "border border-[#313335] hover:border-white bg-background ",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-[56px] px-[32px] py-[12px]",
        sm: "h-7 px-3 text-xs",
        lg: "h-[80px] px-[32px] py-[12px]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }),
  Zr = "Dojo AI Protocol",
  Qr = [
    { title: "About", href: "#about" },
    { title: "Products", href: "#core-products" },
    { title: "Token", href: "https://etherscan.io/token/0xc758bc4920f6f5a585b535df1e6147d5f6a03f1f/" },
    { title: "Stake", href: "https://staking.dojoai.ink" },
    { title: "Documents", href: "https://docs.dojoai.ink" },
  ],
  $r = [
    { network: "telegram", href: "https://t.me/dojoaieth" },
    { network: "x", href: "https://x.com/dojoaieth" },
  ],
  en = [], 
  tn = Xe({
    name: "My Project",
    supportsWallet: !1,
    supportsUsers: !1,
    supportsThemeMode: !1,
    supportsNotifications: !1,
  });
export {
  Qr as A,
  Xr as B,
  Nr as C,
  lr as D,
  Zr as E,
  Hr as F,
  en as G,
  qr as S,
  Gr as a,
  tn as b,
  Ge as c,
  ct as d,
  Fr as e,
  fr as f,
  Me as g,
  Br as h,
  Wr as i,
  mr as j,
  ut as k,
  Dr as l,
  dr as m,
  W as n,
  Vr as o,
  ur as p,
  Ir as q,
  _r as r,
  $r as s,
  L as t,
  Yr as u,
  Ur as v,
  dt as w,
  Kr as x,
  Lr as y,
  Et as z,
};
