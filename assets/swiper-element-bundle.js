/**
 * Swiper Custom Element 11.0.3
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * https://swiperjs.com
 *
 * Copyright 2014-2023 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: October 26, 2023
 */

!function() {
    "use strict";
    function e(e) {
        return null !== e && "object" == typeof e && "constructor"in e && e.constructor === Object
    }
    function t(s, i) {
        void 0 === s && (s = {}),
        void 0 === i && (i = {}),
        Object.keys(i).forEach((a=>{
            void 0 === s[a] ? s[a] = i[a] : e(i[a]) && e(s[a]) && Object.keys(i[a]).length > 0 && t(s[a], i[a])
        }
        ))
    }
    const s = {
        body: {},
        addEventListener() {},
        removeEventListener() {},
        activeElement: {
            blur() {},
            nodeName: ""
        },
        querySelector: ()=>null,
        querySelectorAll: ()=>[],
        getElementById: ()=>null,
        createEvent: ()=>({
            initEvent() {}
        }),
        createElement: ()=>({
            children: [],
            childNodes: [],
            style: {},
            setAttribute() {},
            getElementsByTagName: ()=>[]
        }),
        createElementNS: ()=>({}),
        importNode: ()=>null,
        location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: ""
        }
    };
    function i() {
        const e = "undefined" != typeof document ? document : {};
        return t(e, s),
        e
    }
    const a = {
        document: s,
        navigator: {
            userAgent: ""
        },
        location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: ""
        },
        history: {
            replaceState() {},
            pushState() {},
            go() {},
            back() {}
        },
        CustomEvent: function() {
            return this
        },
        addEventListener() {},
        removeEventListener() {},
        getComputedStyle: ()=>({
            getPropertyValue: ()=>""
        }),
        Image() {},
        Date() {},
        screen: {},
        setTimeout() {},
        clearTimeout() {},
        matchMedia: ()=>({}),
        requestAnimationFrame: e=>"undefined" == typeof setTimeout ? (e(),
        null) : setTimeout(e, 0),
        cancelAnimationFrame(e) {
            "undefined" != typeof setTimeout && clearTimeout(e)
        }
    };
    function r() {
        const e = "undefined" != typeof window ? window : {};
        return t(e, a),
        e
    }
    function n(e) {
        return void 0 === e && (e = ""),
        e.trim().split(" ").filter((e=>!!e.trim()))
    }
    function l(e, t) {
        return void 0 === t && (t = 0),
        setTimeout(e, t)
    }
    function o() {
        return Date.now()
    }
    function d(e, t) {
        void 0 === t && (t = "x");
        const s = r();
        let i, a, n;
        const l = function(e) {
            const t = r();
            let s;
            return t.getComputedStyle && (s = t.getComputedStyle(e, null)),
            !s && e.currentStyle && (s = e.currentStyle),
            s || (s = e.style),
            s
        }(e);
        return s.WebKitCSSMatrix ? (a = l.transform || l.webkitTransform,
        a.split(",").length > 6 && (a = a.split(", ").map((e=>e.replace(",", "."))).join(", ")),
        n = new s.WebKitCSSMatrix("none" === a ? "" : a)) : (n = l.MozTransform || l.OTransform || l.MsTransform || l.msTransform || l.transform || l.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"),
        i = n.toString().split(",")),
        "x" === t && (a = s.WebKitCSSMatrix ? n.m41 : 16 === i.length ? parseFloat(i[12]) : parseFloat(i[4])),
        "y" === t && (a = s.WebKitCSSMatrix ? n.m42 : 16 === i.length ? parseFloat(i[13]) : parseFloat(i[5])),
        a || 0
    }
    function p(e) {
        return "object" == typeof e && null !== e && e.constructor && "Object" === Object.prototype.toString.call(e).slice(8, -1)
    }
    function c() {
        const e = Object(arguments.length <= 0 ? void 0 : arguments[0])
          , t = ["__proto__", "constructor", "prototype"];
        for (let i = 1; i < arguments.length; i += 1) {
            const a = i < 0 || arguments.length <= i ? void 0 : arguments[i];
            if (null != a && (s = a,
            !("undefined" != typeof window && void 0 !== window.HTMLElement ? s instanceof HTMLElement : s && (1 === s.nodeType || 11 === s.nodeType)))) {
                const s = Object.keys(Object(a)).filter((e=>t.indexOf(e) < 0));
                for (let t = 0, i = s.length; t < i; t += 1) {
                    const i = s[t]
                      , r = Object.getOwnPropertyDescriptor(a, i);
                    void 0 !== r && r.enumerable && (p(e[i]) && p(a[i]) ? a[i].__swiper__ ? e[i] = a[i] : c(e[i], a[i]) : !p(e[i]) && p(a[i]) ? (e[i] = {},
                    a[i].__swiper__ ? e[i] = a[i] : c(e[i], a[i])) : e[i] = a[i])
                }
            }
        }
        var s;
        return e
    }
    function u(e, t, s) {
        e.style.setProperty(t, s)
    }
    function m(e) {
        let {swiper: t, targetPosition: s, side: i} = e;
        const a = r()
          , n = -t.translate;
        let l, o = null;
        const d = t.params.speed;
        t.wrapperEl.style.scrollSnapType = "none",
        a.cancelAnimationFrame(t.cssModeFrameID);
        const p = s > n ? "next" : "prev"
          , c = (e,t)=>"next" === p && e >= t || "prev" === p && e <= t
          , u = ()=>{
            l = (new Date).getTime(),
            null === o && (o = l);
            const e = Math.max(Math.min((l - o) / d, 1), 0)
              , r = .5 - Math.cos(e * Math.PI) / 2;
            let p = n + r * (s - n);
            if (c(p, s) && (p = s),
            t.wrapperEl.scrollTo({
                [i]: p
            }),
            c(p, s))
                return t.wrapperEl.style.overflow = "hidden",
                t.wrapperEl.style.scrollSnapType = "",
                setTimeout((()=>{
                    t.wrapperEl.style.overflow = "",
                    t.wrapperEl.scrollTo({
                        [i]: p
                    })
                }
                )),
                void a.cancelAnimationFrame(t.cssModeFrameID);
            t.cssModeFrameID = a.requestAnimationFrame(u)
        }
        ;
        u()
    }
    function h(e) {
        return e.querySelector(".swiper-slide-transform") || e.shadowRoot && e.shadowRoot.querySelector(".swiper-slide-transform") || e
    }
    function f(e, t) {
        return void 0 === t && (t = ""),
        [...e.children].filter((e=>e.matches(t)))
    }
    function g(e) {
        try {
            return void console.warn(e)
        } catch (e) {}
    }
    function v(e, t) {
        void 0 === t && (t = []);
        const s = document.createElement(e);
        return s.classList.add(...Array.isArray(t) ? t : n(t)),
        s
    }
    function w(e) {
        const t = r()
          , s = i()
          , a = e.getBoundingClientRect()
          , n = s.body
          , l = e.clientTop || n.clientTop || 0
          , o = e.clientLeft || n.clientLeft || 0
          , d = e === t ? t.scrollY : e.scrollTop
          , p = e === t ? t.scrollX : e.scrollLeft;
        return {
            top: a.top + d - l,
            left: a.left + p - o
        }
    }
    function b(e, t) {
        return r().getComputedStyle(e, null).getPropertyValue(t)
    }
    function y(e) {
        let t, s = e;
        if (s) {
            for (t = 0; null !== (s = s.previousSibling); )
                1 === s.nodeType && (t += 1);
            return t
        }
    }
    function x(e, t) {
        const s = [];
        let i = e.parentElement;
        for (; i; )
            t ? i.matches(t) && s.push(i) : s.push(i),
            i = i.parentElement;
        return s
    }
    function E(e, t) {
        t && e.addEventListener("transitionend", (function s(i) {
            i.target === e && (t.call(e, i),
            e.removeEventListener("transitionend", s))
        }
        ))
    }
    function S(e, t, s) {
        const i = r();
        return s ? e["width" === t ? "offsetWidth" : "offsetHeight"] + parseFloat(i.getComputedStyle(e, null).getPropertyValue("width" === t ? "margin-right" : "margin-top")) + parseFloat(i.getComputedStyle(e, null).getPropertyValue("width" === t ? "margin-left" : "margin-bottom")) : e.offsetWidth
    }
    let T, M, C;
    function P() {
        return T || (T = function() {
            const e = r()
              , t = i();
            return {
                smoothScroll: t.documentElement && t.documentElement.style && "scrollBehavior"in t.documentElement.style,
                touch: !!("ontouchstart"in e || e.DocumentTouch && t instanceof e.DocumentTouch)
            }
        }()),
        T
    }
    function L(e) {
        return void 0 === e && (e = {}),
        M || (M = function(e) {
            let {userAgent: t} = void 0 === e ? {} : e;
            const s = P()
              , i = r()
              , a = i.navigator.platform
              , n = t || i.navigator.userAgent
              , l = {
                ios: !1,
                android: !1
            }
              , o = i.screen.width
              , d = i.screen.height
              , p = n.match(/(Android);?[\s\/]+([\d.]+)?/);
            let c = n.match(/(iPad).*OS\s([\d_]+)/);
            const u = n.match(/(iPod)(.*OS\s([\d_]+))?/)
              , m = !c && n.match(/(iPhone\sOS|iOS)\s([\d_]+)/)
              , h = "Win32" === a;
            let f = "MacIntel" === a;
            return !c && f && s.touch && ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"].indexOf(`${o}x ${d}`) >= 0 && (c = n.match(/(Version)\/([\d.]+)/),
            c || (c = [0, 1, "13_0_0"]),
            f = !1),
            p && !h && (l.os = "android",
            l.android = !0),
            (c || m || u) && (l.os = "ios",
            l.ios = !0),
            l
        }(e)),
        M
    }
    function z() {
        return C || (C = function() {
            const e = r();
            let t = !1;
            function s() {
                const t = e.navigator.userAgent.toLowerCase();
                return t.indexOf("safari") >= 0 && t.indexOf("chrome") < 0 && t.indexOf("android") < 0
            }
            if (s()) {
                const s = String(e.navigator.userAgent);
                if (s.includes("Version/")) {
                    const [e,i] = s.split("Version/")[1].split(" ")[0].split(".").map((e=>Number(e)));
                    t = e < 16 || 16 === e && i < 2
                }
            }
            return {
                isSafari: t || s(),
                needPerspectiveFix: t,
                isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent)
            }
        }()),
        C
    }
    var k = {
        on(e, t, s) {
            const i = this;
            if (!i.eventsListeners || i.destroyed)
                return i;
            if ("function" != typeof t)
                return i;
            const a = s ? "unshift" : "push";
            return e.split(" ").forEach((e=>{
                i.eventsListeners[e] || (i.eventsListeners[e] = []),
                i.eventsListeners[e][a](t)
            }
            )),
            i
        },
        once(e, t, s) {
            const i = this;
            if (!i.eventsListeners || i.destroyed)
                return i;
            if ("function" != typeof t)
                return i;
            function a() {
                i.off(e, a),
                a.__emitterProxy && delete a.__emitterProxy;
                for (var s = arguments.length, r = new Array(s), n = 0; n < s; n++)
                    r[n] = arguments[n];
                t.apply(i, r)
            }
            return a.__emitterProxy = t,
            i.on(e, a, s)
        },
        onAny(e, t) {
            const s = this;
            if (!s.eventsListeners || s.destroyed)
                return s;
            if ("function" != typeof e)
                return s;
            const i = t ? "unshift" : "push";
            return s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[i](e),
            s
        },
        offAny(e) {
            const t = this;
            if (!t.eventsListeners || t.destroyed)
                return t;
            if (!t.eventsAnyListeners)
                return t;
            const s = t.eventsAnyListeners.indexOf(e);
            return s >= 0 && t.eventsAnyListeners.splice(s, 1),
            t
        },
        off(e, t) {
            const s = this;
            return !s.eventsListeners || s.destroyed ? s : s.eventsListeners ? (e.split(" ").forEach((e=>{
                void 0 === t ? s.eventsListeners[e] = [] : s.eventsListeners[e] && s.eventsListeners[e].forEach(((i,a)=>{
                    (i === t || i.__emitterProxy && i.__emitterProxy === t) && s.eventsListeners[e].splice(a, 1)
                }
                ))
            }
            )),
            s) : s
        },
        emit() {
            const e = this;
            if (!e.eventsListeners || e.destroyed)
                return e;
            if (!e.eventsListeners)
                return e;
            let t, s, i;
            for (var a = arguments.length, r = new Array(a), n = 0; n < a; n++)
                r[n] = arguments[n];
            "string" == typeof r[0] || Array.isArray(r[0]) ? (t = r[0],
            s = r.slice(1, r.length),
            i = e) : (t = r[0].events,
            s = r[0].data,
            i = r[0].context || e),
            s.unshift(i);
            return (Array.isArray(t) ? t : t.split(" ")).forEach((t=>{
                e.eventsAnyListeners && e.eventsAnyListeners.length && e.eventsAnyListeners.forEach((e=>{
                    e.apply(i, [t, ...s])
                }
                )),
                e.eventsListeners && e.eventsListeners[t] && e.eventsListeners[t].forEach((e=>{
                    e.apply(i, s)
                }
                ))
            }
            )),
            e
        }
    };
    const A = (e,t)=>{
        if (!e || e.destroyed || !e.params)
            return;
        const s = t.closest(e.isElement ? "swiper-slide" : `.${e.params.slideClass}`);
        if (s) {
            let t = s.querySelector(`.${e.params.lazyPreloaderClass}`);
            !t && e.isElement && (s.shadowRoot ? t = s.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`) : requestAnimationFrame((()=>{
                s.shadowRoot && (t = s.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`),
                t && t.remove())
            }
            ))),
            t && t.remove()
        }
    }
      , I = (e,t)=>{
        if (!e.slides[t])
            return;
        const s = e.slides[t].querySelector('[loading="lazy"]');
        s && s.removeAttribute("loading")
    }
      , $ = e=>{
        if (!e || e.destroyed || !e.params)
            return;
        let t = e.params.lazyPreloadPrevNext;
        const s = e.slides.length;
        if (!s || !t || t < 0)
            return;
        t = Math.min(t, s);
        const i = "auto" === e.params.slidesPerView ? e.slidesPerViewDynamic() : Math.ceil(e.params.slidesPerView)
          , a = e.activeIndex;
        if (e.params.grid && e.params.grid.rows > 1) {
            const s = a
              , r = [s - t];
            return r.push(...Array.from({
                length: t
            }).map(((e,t)=>s + i + t))),
            void e.slides.forEach(((t,s)=>{
                r.includes(t.column) && I(e, s)
            }
            ))
        }
        const r = a + i - 1;
        if (e.params.rewind || e.params.loop)
            for (let i = a - t; i <= r + t; i += 1) {
                const t = (i % s + s) % s;
                (t < a || t > r) && I(e, t)
            }
        else
            for (let i = Math.max(a - t, 0); i <= Math.min(r + t, s - 1); i += 1)
                i !== a && (i > r || i < a) && I(e, i)
    }
    ;
    var O = {
        updateSize: function() {
            const e = this;
            let t, s;
            const i = e.el;
            t = void 0 !== e.params.width && null !== e.params.width ? e.params.width : i.clientWidth,
            s = void 0 !== e.params.height && null !== e.params.height ? e.params.height : i.clientHeight,
            0 === t && e.isHorizontal() || 0 === s && e.isVertical() || (t = t - parseInt(b(i, "padding-left") || 0, 10) - parseInt(b(i, "padding-right") || 0, 10),
            s = s - parseInt(b(i, "padding-top") || 0, 10) - parseInt(b(i, "padding-bottom") || 0, 10),
            Number.isNaN(t) && (t = 0),
            Number.isNaN(s) && (s = 0),
            Object.assign(e, {
                width: t,
                height: s,
                size: e.isHorizontal() ? t : s
            }))
        },
        updateSlides: function() {
            const e = this;
            function t(t, s) {
                return parseFloat(t.getPropertyValue(e.getDirectionLabel(s)) || 0)
            }
            const s = e.params
              , {wrapperEl: i, slidesEl: a, size: r, rtlTranslate: n, wrongRTL: l} = e
              , o = e.virtual && s.virtual.enabled
              , d = o ? e.virtual.slides.length : e.slides.length
              , p = f(a, `.${e.params.slideClass}, swiper-slide`)
              , c = o ? e.virtual.slides.length : p.length;
            let m = [];
            const h = []
              , g = [];
            let v = s.slidesOffsetBefore;
            "function" == typeof v && (v = s.slidesOffsetBefore.call(e));
            let w = s.slidesOffsetAfter;
            "function" == typeof w && (w = s.slidesOffsetAfter.call(e));
            const y = e.snapGrid.length
              , x = e.slidesGrid.length;
            let E = s.spaceBetween
              , T = -v
              , M = 0
              , C = 0;
            if (void 0 === r)
                return;
            "string" == typeof E && E.indexOf("%") >= 0 ? E = parseFloat(E.replace("%", "")) / 100 * r : "string" == typeof E && (E = parseFloat(E)),
            e.virtualSize = -E,
            p.forEach((e=>{
                n ? e.style.marginLeft = "" : e.style.marginRight = "",
                e.style.marginBottom = "",
                e.style.marginTop = ""
            }
            )),
            s.centeredSlides && s.cssMode && (u(i, "--swiper-centered-offset-before", ""),
            u(i, "--swiper-centered-offset-after", ""));
            const P = s.grid && s.grid.rows > 1 && e.grid;
            let L;
            P ? e.grid.initSlides(p) : e.grid && e.grid.unsetSlides();
            const z = "auto" === s.slidesPerView && s.breakpoints && Object.keys(s.breakpoints).filter((e=>void 0 !== s.breakpoints[e].slidesPerView)).length > 0;
            for (let i = 0; i < c; i += 1) {
                let a;
                if (L = 0,
                p[i] && (a = p[i]),
                P && e.grid.updateSlide(i, a, p),
                !p[i] || "none" !== b(a, "display")) {
                    if ("auto" === s.slidesPerView) {
                        z && (p[i].style[e.getDirectionLabel("width")] = "");
                        const r = getComputedStyle(a)
                          , n = a.style.transform
                          , l = a.style.webkitTransform;
                        if (n && (a.style.transform = "none"),
                        l && (a.style.webkitTransform = "none"),
                        s.roundLengths)
                            L = e.isHorizontal() ? S(a, "width", !0) : S(a, "height", !0);
                        else {
                            const e = t(r, "width")
                              , s = t(r, "padding-left")
                              , i = t(r, "padding-right")
                              , n = t(r, "margin-left")
                              , l = t(r, "margin-right")
                              , o = r.getPropertyValue("box-sizing");
                            if (o && "border-box" === o)
                                L = e + n + l;
                            else {
                                const {clientWidth: t, offsetWidth: r} = a;
                                L = e + s + i + n + l + (r - t)
                            }
                        }
                        n && (a.style.transform = n),
                        l && (a.style.webkitTransform = l),
                        s.roundLengths && (L = Math.floor(L))
                    } else
                        L = (r - (s.slidesPerView - 1) * E) / s.slidesPerView,
                        s.roundLengths && (L = Math.floor(L)),
                        p[i] && (p[i].style[e.getDirectionLabel("width")] = `${L}px`);
                    p[i] && (p[i].swiperSlideSize = L),
                    g.push(L),
                    s.centeredSlides ? (T = T + L / 2 + M / 2 + E,
                    0 === M && 0 !== i && (T = T - r / 2 - E),
                    0 === i && (T = T - r / 2 - E),
                    Math.abs(T) < .001 && (T = 0),
                    s.roundLengths && (T = Math.floor(T)),
                    C % s.slidesPerGroup == 0 && m.push(T),
                    h.push(T)) : (s.roundLengths && (T = Math.floor(T)),
                    (C - Math.min(e.params.slidesPerGroupSkip, C)) % e.params.slidesPerGroup == 0 && m.push(T),
                    h.push(T),
                    T = T + L + E),
                    e.virtualSize += L + E,
                    M = L,
                    C += 1
                }
            }
            if (e.virtualSize = Math.max(e.virtualSize, r) + w,
            n && l && ("slide" === s.effect || "coverflow" === s.effect) && (i.style.width = `${e.virtualSize + E}px`),
            s.setWrapperSize && (i.style[e.getDirectionLabel("width")] = `${e.virtualSize + E}px`),
            P && e.grid.updateWrapperSize(L, m),
            !s.centeredSlides) {
                const t = [];
                for (let i = 0; i < m.length; i += 1) {
                    let a = m[i];
                    s.roundLengths && (a = Math.floor(a)),
                    m[i] <= e.virtualSize - r && t.push(a)
                }
                m = t,
                Math.floor(e.virtualSize - r) - Math.floor(m[m.length - 1]) > 1 && m.push(e.virtualSize - r)
            }
            if (o && s.loop) {
                const t = g[0] + E;
                if (s.slidesPerGroup > 1) {
                    const i = Math.ceil((e.virtual.slidesBefore + e.virtual.slidesAfter) / s.slidesPerGroup)
                      , a = t * s.slidesPerGroup;
                    for (let e = 0; e < i; e += 1)
                        m.push(m[m.length - 1] + a)
                }
                for (let i = 0; i < e.virtual.slidesBefore + e.virtual.slidesAfter; i += 1)
                    1 === s.slidesPerGroup && m.push(m[m.length - 1] + t),
                    h.push(h[h.length - 1] + t),
                    e.virtualSize += t
            }
            if (0 === m.length && (m = [0]),
            0 !== E) {
                const t = e.isHorizontal() && n ? "marginLeft" : e.getDirectionLabel("marginRight");
                p.filter(((e,t)=>!(s.cssMode && !s.loop) || t !== p.length - 1)).forEach((e=>{
                    e.style[t] = `${E}px`
                }
                ))
            }
            if (s.centeredSlides && s.centeredSlidesBounds) {
                let e = 0;
                g.forEach((t=>{
                    e += t + (E || 0)
                }
                )),
                e -= E;
                const t = e - r;
                m = m.map((e=>e <= 0 ? -v : e > t ? t + w : e))
            }
            if (s.centerInsufficientSlides) {
                let e = 0;
                if (g.forEach((t=>{
                    e += t + (E || 0)
                }
                )),
                e -= E,
                e < r) {
                    const t = (r - e) / 2;
                    m.forEach(((e,s)=>{
                        m[s] = e - t
                    }
                    )),
                    h.forEach(((e,s)=>{
                        h[s] = e + t
                    }
                    ))
                }
            }
            if (Object.assign(e, {
                slides: p,
                snapGrid: m,
                slidesGrid: h,
                slidesSizesGrid: g
            }),
            s.centeredSlides && s.cssMode && !s.centeredSlidesBounds) {
                u(i, "--swiper-centered-offset-before", -m[0] + "px"),
                u(i, "--swiper-centered-offset-after", e.size / 2 - g[g.length - 1] / 2 + "px");
                const t = -e.snapGrid[0]
                  , s = -e.slidesGrid[0];
                e.snapGrid = e.snapGrid.map((e=>e + t)),
                e.slidesGrid = e.slidesGrid.map((e=>e + s))
            }
            if (c !== d && e.emit("slidesLengthChange"),
            m.length !== y && (e.params.watchOverflow && e.checkOverflow(),
            e.emit("snapGridLengthChange")),
            h.length !== x && e.emit("slidesGridLengthChange"),
            s.watchSlidesProgress && e.updateSlidesOffset(),
            !(o || s.cssMode || "slide" !== s.effect && "fade" !== s.effect)) {
                const t = `${s.containerModifierClass}backface-hidden`
                  , i = e.el.classList.contains(t);
                c <= s.maxBackfaceHiddenSlides ? i || e.el.classList.add(t) : i && e.el.classList.remove(t)
            }
        },
        updateAutoHeight: function(e) {
            const t = this
              , s = []
              , i = t.virtual && t.params.virtual.enabled;
            let a, r = 0;
            "number" == typeof e ? t.setTransition(e) : !0 === e && t.setTransition(t.params.speed);
            const n = e=>i ? t.slides[t.getSlideIndexByData(e)] : t.slides[e];
            if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
                if (t.params.centeredSlides)
                    (t.visibleSlides || []).forEach((e=>{
                        s.push(e)
                    }
                    ));
                else
                    for (a = 0; a < Math.ceil(t.params.slidesPerView); a += 1) {
                        const e = t.activeIndex + a;
                        if (e > t.slides.length && !i)
                            break;
                        s.push(n(e))
                    }
            else
                s.push(n(t.activeIndex));
            for (a = 0; a < s.length; a += 1)
                if (void 0 !== s[a]) {
                    const e = s[a].offsetHeight;
                    r = e > r ? e : r
                }
            (r || 0 === r) && (t.wrapperEl.style.height = `${r}px`)
        },
        updateSlidesOffset: function() {
            const e = this
              , t = e.slides
              , s = e.isElement ? e.isHorizontal() ? e.wrapperEl.offsetLeft : e.wrapperEl.offsetTop : 0;
            for (let i = 0; i < t.length; i += 1)
                t[i].swiperSlideOffset = (e.isHorizontal() ? t[i].offsetLeft : t[i].offsetTop) - s - e.cssOverflowAdjustment()
        },
        updateSlidesProgress: function(e) {
            void 0 === e && (e = this && this.translate || 0);
            const t = this
              , s = t.params
              , {slides: i, rtlTranslate: a, snapGrid: r} = t;
            if (0 === i.length)
                return;
            void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
            let n = -e;
            a && (n = e),
            i.forEach((e=>{
                e.classList.remove(s.slideVisibleClass, s.slideFullyVisibleClass)
            }
            )),
            t.visibleSlidesIndexes = [],
            t.visibleSlides = [];
            let l = s.spaceBetween;
            "string" == typeof l && l.indexOf("%") >= 0 ? l = parseFloat(l.replace("%", "")) / 100 * t.size : "string" == typeof l && (l = parseFloat(l));
            for (let e = 0; e < i.length; e += 1) {
                const o = i[e];
                let d = o.swiperSlideOffset;
                s.cssMode && s.centeredSlides && (d -= i[0].swiperSlideOffset);
                const p = (n + (s.centeredSlides ? t.minTranslate() : 0) - d) / (o.swiperSlideSize + l)
                  , c = (n - r[0] + (s.centeredSlides ? t.minTranslate() : 0) - d) / (o.swiperSlideSize + l)
                  , u = -(n - d)
                  , m = u + t.slidesSizesGrid[e]
                  , h = u >= 0 && u <= t.size - t.slidesSizesGrid[e];
                (u >= 0 && u < t.size - 1 || m > 1 && m <= t.size || u <= 0 && m >= t.size) && (t.visibleSlides.push(o),
                t.visibleSlidesIndexes.push(e),
                i[e].classList.add(s.slideVisibleClass)),
                h && i[e].classList.add(s.slideFullyVisibleClass),
                o.progress = a ? -p : p,
                o.originalProgress = a ? -c : c
            }
        },
        updateProgress: function(e) {
            const t = this;
            if (void 0 === e) {
                const s = t.rtlTranslate ? -1 : 1;
                e = t && t.translate && t.translate * s || 0
            }
            const s = t.params
              , i = t.maxTranslate() - t.minTranslate();
            let {progress: a, isBeginning: r, isEnd: n, progressLoop: l} = t;
            const o = r
              , d = n;
            if (0 === i)
                a = 0,
                r = !0,
                n = !0;
            else {
                a = (e - t.minTranslate()) / i;
                const s = Math.abs(e - t.minTranslate()) < 1
                  , l = Math.abs(e - t.maxTranslate()) < 1;
                r = s || a <= 0,
                n = l || a >= 1,
                s && (a = 0),
                l && (a = 1)
            }
            if (s.loop) {
                const s = t.getSlideIndexByData(0)
                  , i = t.getSlideIndexByData(t.slides.length - 1)
                  , a = t.slidesGrid[s]
                  , r = t.slidesGrid[i]
                  , n = t.slidesGrid[t.slidesGrid.length - 1]
                  , o = Math.abs(e);
                l = o >= a ? (o - a) / n : (o + n - r) / n,
                l > 1 && (l -= 1)
            }
            Object.assign(t, {
                progress: a,
                progressLoop: l,
                isBeginning: r,
                isEnd: n
            }),
            (s.watchSlidesProgress || s.centeredSlides && s.autoHeight) && t.updateSlidesProgress(e),
            r && !o && t.emit("reachBeginning toEdge"),
            n && !d && t.emit("reachEnd toEdge"),
            (o && !r || d && !n) && t.emit("fromEdge"),
            t.emit("progress", a)
        },
        updateSlidesClasses: function() {
            const e = this
              , {slides: t, params: s, slidesEl: i, activeIndex: a} = e
              , r = e.virtual && s.virtual.enabled
              , n = e.grid && s.grid && s.grid.rows > 1
              , l = e=>f(i, `.${s.slideClass}${e}, swiper-slide ${e}`)[0];
            let o, d, p;
            if (t.forEach((e=>{
                e.classList.remove(s.slideActiveClass, s.slideNextClass, s.slidePrevClass)
            }
            )),
            r)
                if (s.loop) {
                    let t = a - e.virtual.slidesBefore;
                    t < 0 && (t = e.virtual.slides.length + t),
                    t >= e.virtual.slides.length && (t -= e.virtual.slides.length),
                    o = l(`[data-swiper-slide-index="${t}"]`)
                } else
                    o = l(`[data-swiper-slide-index="${a}"]`);
            else
                n ? (o = t.filter((e=>e.column === a))[0],
                p = t.filter((e=>e.column === a + 1))[0],
                d = t.filter((e=>e.column === a - 1))[0]) : o = t[a];
            o && (o.classList.add(s.slideActiveClass),
            n ? (p && p.classList.add(s.slideNextClass),
            d && d.classList.add(s.slidePrevClass)) : (p = function(e, t) {
                const s = [];
                for (; e.nextElementSibling; ) {
                    const i = e.nextElementSibling;
                    t ? i.matches(t) && s.push(i) : s.push(i),
                    e = i
                }
                return s
            }(o, `.${s.slideClass}, swiper-slide`)[0],
            s.loop && !p && (p = t[0]),
            p && p.classList.add(s.slideNextClass),
            d = function(e, t) {
                const s = [];
                for (; e.previousElementSibling; ) {
                    const i = e.previousElementSibling;
                    t ? i.matches(t) && s.push(i) : s.push(i),
                    e = i
                }
                return s
            }(o, `.${s.slideClass}, swiper-slide`)[0],
            s.loop && 0 === !d && (d = t[t.length - 1]),
            d && d.classList.add(s.slidePrevClass))),
            e.emitSlidesClasses()
        },
        updateActiveIndex: function(e) {
            const t = this
              , s = t.rtlTranslate ? t.translate : -t.translate
              , {snapGrid: i, params: a, activeIndex: r, realIndex: n, snapIndex: l} = t;
            let o, d = e;
            const p = e=>{
                let s = e - t.virtual.slidesBefore;
                return s < 0 && (s = t.virtual.slides.length + s),
                s >= t.virtual.slides.length && (s -= t.virtual.slides.length),
                s
            }
            ;
            if (void 0 === d && (d = function(e) {
                const {slidesGrid: t, params: s} = e
                  , i = e.rtlTranslate ? e.translate : -e.translate;
                let a;
                for (let e = 0; e < t.length; e += 1)
                    void 0 !== t[e + 1] ? i >= t[e] && i < t[e + 1] - (t[e + 1] - t[e]) / 2 ? a = e : i >= t[e] && i < t[e + 1] && (a = e + 1) : i >= t[e] && (a = e);
                return s.normalizeSlideIndex && (a < 0 || void 0 === a) && (a = 0),
                a
            }(t)),
            i.indexOf(s) >= 0)
                o = i.indexOf(s);
            else {
                const e = Math.min(a.slidesPerGroupSkip, d);
                o = e + Math.floor((d - e) / a.slidesPerGroup)
            }
            if (o >= i.length && (o = i.length - 1),
            d === r && !t.params.loop)
                return void (o !== l && (t.snapIndex = o,
                t.emit("snapIndexChange")));
            if (d === r && t.params.loop && t.virtual && t.params.virtual.enabled)
                return void (t.realIndex = p(d));
            const c = t.grid && a.grid && a.grid.rows > 1;
            let u;
            if (t.virtual && a.virtual.enabled && a.loop)
                u = p(d);
            else if (c) {
                const e = t.slides.filter((e=>e.column === d))[0];
                let s = parseInt(e.getAttribute("data-swiper-slide-index"), 10);
                Number.isNaN(s) && (s = Math.max(t.slides.indexOf(e), 0)),
                u = Math.floor(s / a.grid.rows)
            } else if (t.slides[d]) {
                const e = t.slides[d].getAttribute("data-swiper-slide-index");
                u = e ? parseInt(e, 10) : d
            } else
                u = d;
            Object.assign(t, {
                previousSnapIndex: l,
                snapIndex: o,
                previousRealIndex: n,
                realIndex: u,
                previousIndex: r,
                activeIndex: d
            }),
            t.initialized && $(t),
            t.emit("activeIndexChange"),
            t.emit("snapIndexChange"),
            (t.initialized || t.params.runCallbacksOnInit) && (n !== u && t.emit("realIndexChange"),
            t.emit("slideChange"))
        },
        updateClickedSlide: function(e, t) {
            const s = this
              , i = s.params;
            let a = e.closest(`.${i.slideClass}, swiper-slide`);
            !a && s.isElement && t && t.length > 1 && t.includes(e) && [...t.slice(t.indexOf(e) + 1, t.length)].forEach((e=>{
                !a && e.matches && e.matches(`.${i.slideClass}, swiper-slide`) && (a = e)
            }
            ));
            let r, n = !1;
            if (a)
                for (let e = 0; e < s.slides.length; e += 1)
                    if (s.slides[e] === a) {
                        n = !0,
                        r = e;
                        break
                    }
            if (!a || !n)
                return s.clickedSlide = void 0,
                void (s.clickedIndex = void 0);
            s.clickedSlide = a,
            s.virtual && s.params.virtual.enabled ? s.clickedIndex = parseInt(a.getAttribute("data-swiper-slide-index"), 10) : s.clickedIndex = r,
            i.slideToClickedSlide && void 0 !== s.clickedIndex && s.clickedIndex !== s.activeIndex && s.slideToClickedSlide()
        }
    };
    var D = {
        getTranslate: function(e) {
            void 0 === e && (e = this.isHorizontal() ? "x" : "y");
            const {params: t, rtlTranslate: s, translate: i, wrapperEl: a} = this;
            if (t.virtualTranslate)
                return s ? -i : i;
            if (t.cssMode)
                return i;
            let r = d(a, e);
            return r += this.cssOverflowAdjustment(),
            s && (r = -r),
            r || 0
        },
        setTranslate: function(e, t) {
            const s = this
              , {rtlTranslate: i, params: a, wrapperEl: r, progress: n} = s;
            let l, o = 0, d = 0;
            s.isHorizontal() ? o = i ? -e : e : d = e,
            a.roundLengths && (o = Math.floor(o),
            d = Math.floor(d)),
            s.previousTranslate = s.translate,
            s.translate = s.isHorizontal() ? o : d,
            a.cssMode ? r[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal() ? -o : -d : a.virtualTranslate || (s.isHorizontal() ? o -= s.cssOverflowAdjustment() : d -= s.cssOverflowAdjustment(),
            r.style.transform = `translate3d(${o}px, ${d}px, 0px)`);
            const p = s.maxTranslate() - s.minTranslate();
            l = 0 === p ? 0 : (e - s.minTranslate()) / p,
            l !== n && s.updateProgress(e),
            s.emit("setTranslate", s.translate, t)
        },
        minTranslate: function() {
            return -this.snapGrid[0]
        },
        maxTranslate: function() {
            return -this.snapGrid[this.snapGrid.length - 1]
        },
        translateTo: function(e, t, s, i, a) {
            void 0 === e && (e = 0),
            void 0 === t && (t = this.params.speed),
            void 0 === s && (s = !0),
            void 0 === i && (i = !0);
            const r = this
              , {params: n, wrapperEl: l} = r;
            if (r.animating && n.preventInteractionOnTransition)
                return !1;
            const o = r.minTranslate()
              , d = r.maxTranslate();
            let p;
            if (p = i && e > o ? o : i && e < d ? d : e,
            r.updateProgress(p),
            n.cssMode) {
                const e = r.isHorizontal();
                if (0 === t)
                    l[e ? "scrollLeft" : "scrollTop"] = -p;
                else {
                    if (!r.support.smoothScroll)
                        return m({
                            swiper: r,
                            targetPosition: -p,
                            side: e ? "left" : "top"
                        }),
                        !0;
                    l.scrollTo({
                        [e ? "left" : "top"]: -p,
                        behavior: "smooth"
                    })
                }
                return !0
            }
            return 0 === t ? (r.setTransition(0),
            r.setTranslate(p),
            s && (r.emit("beforeTransitionStart", t, a),
            r.emit("transitionEnd"))) : (r.setTransition(t),
            r.setTranslate(p),
            s && (r.emit("beforeTransitionStart", t, a),
            r.emit("transitionStart")),
            r.animating || (r.animating = !0,
            r.onTranslateToWrapperTransitionEnd || (r.onTranslateToWrapperTransitionEnd = function(e) {
                r && !r.destroyed && e.target === this && (r.wrapperEl.removeEventListener("transitionend", r.onTranslateToWrapperTransitionEnd),
                r.onTranslateToWrapperTransitionEnd = null,
                delete r.onTranslateToWrapperTransitionEnd,
                s && r.emit("transitionEnd"))
            }
            ),
            r.wrapperEl.addEventListener("transitionend", r.onTranslateToWrapperTransitionEnd))),
            !0
        }
    };
    function _(e) {
        let {swiper: t, runCallbacks: s, direction: i, step: a} = e;
        const {activeIndex: r, previousIndex: n} = t;
        let l = i;
        if (l || (l = r > n ? "next" : r < n ? "prev" : "reset"),
        t.emit(`transition ${a}`),
        s && r !== n) {
            if ("reset" === l)
                return void t.emit(`slideResetTransition ${a}`);
            t.emit(`slideChangeTransition ${a}`),
            "next" === l ? t.emit(`slideNextTransition ${a}`) : t.emit(`slidePrevTransition ${a}`)
        }
    }
    var G = {
        slideTo: function(e, t, s, i, a) {
            void 0 === e && (e = 0),
            void 0 === t && (t = this.params.speed),
            void 0 === s && (s = !0),
            "string" == typeof e && (e = parseInt(e, 10));
            const r = this;
            let n = e;
            n < 0 && (n = 0);
            const {params: l, snapGrid: o, slidesGrid: d, previousIndex: p, activeIndex: c, rtlTranslate: u, wrapperEl: h, enabled: f} = r;
            if (r.animating && l.preventInteractionOnTransition || !f && !i && !a)
                return !1;
            const g = Math.min(r.params.slidesPerGroupSkip, n);
            let v = g + Math.floor((n - g) / r.params.slidesPerGroup);
            v >= o.length && (v = o.length - 1);
            const w = -o[v];
            if (l.normalizeSlideIndex)
                for (let e = 0; e < d.length; e += 1) {
                    const t = -Math.floor(100 * w)
                      , s = Math.floor(100 * d[e])
                      , i = Math.floor(100 * d[e + 1]);
                    void 0 !== d[e + 1] ? t >= s && t < i - (i - s) / 2 ? n = e : t >= s && t < i && (n = e + 1) : t >= s && (n = e)
                }
            if (r.initialized && n !== c) {
                if (!r.allowSlideNext && (u ? w > r.translate && w > r.minTranslate() : w < r.translate && w < r.minTranslate()))
                    return !1;
                if (!r.allowSlidePrev && w > r.translate && w > r.maxTranslate() && (c || 0) !== n)
                    return !1
            }
            let b;
            if (n !== (p || 0) && s && r.emit("beforeSlideChangeStart"),
            r.updateProgress(w),
            b = n > c ? "next" : n < c ? "prev" : "reset",
            u && -w === r.translate || !u && w === r.translate)
                return r.updateActiveIndex(n),
                l.autoHeight && r.updateAutoHeight(),
                r.updateSlidesClasses(),
                "slide" !== l.effect && r.setTranslate(w),
                "reset" !== b && (r.transitionStart(s, b),
                r.transitionEnd(s, b)),
                !1;
            if (l.cssMode) {
                const e = r.isHorizontal()
                  , s = u ? w : -w;
                if (0 === t) {
                    const t = r.virtual && r.params.virtual.enabled;
                    t && (r.wrapperEl.style.scrollSnapType = "none",
                    r._immediateVirtual = !0),
                    t && !r._cssModeVirtualInitialSet && r.params.initialSlide > 0 ? (r._cssModeVirtualInitialSet = !0,
                    requestAnimationFrame((()=>{
                        h[e ? "scrollLeft" : "scrollTop"] = s
                    }
                    ))) : h[e ? "scrollLeft" : "scrollTop"] = s,
                    t && requestAnimationFrame((()=>{
                        r.wrapperEl.style.scrollSnapType = "",
                        r._immediateVirtual = !1
                    }
                    ))
                } else {
                    if (!r.support.smoothScroll)
                        return m({
                            swiper: r,
                            targetPosition: s,
                            side: e ? "left" : "top"
                        }),
                        !0;
                    h.scrollTo({
                        [e ? "left" : "top"]: s,
                        behavior: "smooth"
                    })
                }
                return !0
            }
            return r.setTransition(t),
            r.setTranslate(w),
            r.updateActiveIndex(n),
            r.updateSlidesClasses(),
            r.emit("beforeTransitionStart", t, i),
            r.transitionStart(s, b),
            0 === t ? r.transitionEnd(s, b) : r.animating || (r.animating = !0,
            r.onSlideToWrapperTransitionEnd || (r.onSlideToWrapperTransitionEnd = function(e) {
                r && !r.destroyed && e.target === this && (r.wrapperEl.removeEventListener("transitionend", r.onSlideToWrapperTransitionEnd),
                r.onSlideToWrapperTransitionEnd = null,
                delete r.onSlideToWrapperTransitionEnd,
                r.transitionEnd(s, b))
            }
            ),
            r.wrapperEl.addEventListener("transitionend", r.onSlideToWrapperTransitionEnd)),
            !0
        },
        slideToLoop: function(e, t, s, i) {
            if (void 0 === e && (e = 0),
            void 0 === t && (t = this.params.speed),
            void 0 === s && (s = !0),
            "string" == typeof e) {
                e = parseInt(e, 10)
            }
            const a = this
              , r = a.grid && a.params.grid && a.params.grid.rows > 1;
            let n = e;
            if (a.params.loop)
                if (a.virtual && a.params.virtual.enabled)
                    n += a.virtual.slidesBefore;
                else {
                    let e;
                    if (r) {
                        const t = n * a.params.grid.rows;
                        e = a.slides.filter((e=>1 * e.getAttribute("data-swiper-slide-index") === t))[0].column
                    } else
                        e = a.getSlideIndexByData(n);
                    const t = r ? Math.ceil(a.slides.length / a.params.grid.rows) : a.slides.length
                      , {centeredSlides: s} = a.params;
                    let i = a.params.slidesPerView;
                    "auto" === i ? i = a.slidesPerViewDynamic() : (i = Math.ceil(parseFloat(a.params.slidesPerView, 10)),
                    s && i % 2 == 0 && (i += 1));
                    let l = t - e < i;
                    if (s && (l = l || e < Math.ceil(i / 2)),
                    l) {
                        const i = s ? e < a.activeIndex ? "prev" : "next" : e - a.activeIndex - 1 < a.params.slidesPerView ? "next" : "prev";
                        a.loopFix({
                            direction: i,
                            slideTo: !0,
                            activeSlideIndex: "next" === i ? e + 1 : e - t + 1,
                            slideRealIndex: "next" === i ? a.realIndex : void 0
                        })
                    }
                    if (r) {
                        const e = n * a.params.grid.rows;
                        n = a.slides.filter((t=>1 * t.getAttribute("data-swiper-slide-index") === e))[0].column
                    } else
                        n = a.getSlideIndexByData(n)
                }
            return requestAnimationFrame((()=>{
                a.slideTo(n, t, s, i)
            }
            )),
            a
        },
        slideNext: function(e, t, s) {
            void 0 === e && (e = this.params.speed),
            void 0 === t && (t = !0);
            const i = this
              , {enabled: a, params: r, animating: n} = i;
            if (!a)
                return i;
            let l = r.slidesPerGroup;
            "auto" === r.slidesPerView && 1 === r.slidesPerGroup && r.slidesPerGroupAuto && (l = Math.max(i.slidesPerViewDynamic("current", !0), 1));
            const o = i.activeIndex < r.slidesPerGroupSkip ? 1 : l
              , d = i.virtual && r.virtual.enabled;
            if (r.loop) {
                if (n && !d && r.loopPreventsSliding)
                    return !1;
                if (i.loopFix({
                    direction: "next"
                }),
                i._clientLeft = i.wrapperEl.clientLeft,
                i.activeIndex === i.slides.length - 1 && r.cssMode)
                    return requestAnimationFrame((()=>{
                        i.slideTo(i.activeIndex + o, e, t, s)
                    }
                    )),
                    !0
            }
            return r.rewind && i.isEnd ? i.slideTo(0, e, t, s) : i.slideTo(i.activeIndex + o, e, t, s)
        },
        slidePrev: function(e, t, s) {
            void 0 === e && (e = this.params.speed),
            void 0 === t && (t = !0);
            const i = this
              , {params: a, snapGrid: r, slidesGrid: n, rtlTranslate: l, enabled: o, animating: d} = i;
            if (!o)
                return i;
            const p = i.virtual && a.virtual.enabled;
            if (a.loop) {
                if (d && !p && a.loopPreventsSliding)
                    return !1;
                i.loopFix({
                    direction: "prev"
                }),
                i._clientLeft = i.wrapperEl.clientLeft
            }
            function c(e) {
                return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e)
            }
            const u = c(l ? i.translate : -i.translate)
              , m = r.map((e=>c(e)));
            let h = r[m.indexOf(u) - 1];
            if (void 0 === h && a.cssMode) {
                let e;
                r.forEach(((t,s)=>{
                    u >= t && (e = s)
                }
                )),
                void 0 !== e && (h = r[e > 0 ? e - 1 : e])
            }
            let f = 0;
            if (void 0 !== h && (f = n.indexOf(h),
            f < 0 && (f = i.activeIndex - 1),
            "auto" === a.slidesPerView && 1 === a.slidesPerGroup && a.slidesPerGroupAuto && (f = f - i.slidesPerViewDynamic("previous", !0) + 1,
            f = Math.max(f, 0))),
            a.rewind && i.isBeginning) {
                const a = i.params.virtual && i.params.virtual.enabled && i.virtual ? i.virtual.slides.length - 1 : i.slides.length - 1;
                return i.slideTo(a, e, t, s)
            }
            return a.loop && 0 === i.activeIndex && a.cssMode ? (requestAnimationFrame((()=>{
                i.slideTo(f, e, t, s)
            }
            )),
            !0) : i.slideTo(f, e, t, s)
        },
        slideReset: function(e, t, s) {
            return void 0 === e && (e = this.params.speed),
            void 0 === t && (t = !0),
            this.slideTo(this.activeIndex, e, t, s)
        },
        slideToClosest: function(e, t, s, i) {
            void 0 === e && (e = this.params.speed),
            void 0 === t && (t = !0),
            void 0 === i && (i = .5);
            const a = this;
            let r = a.activeIndex;
            const n = Math.min(a.params.slidesPerGroupSkip, r)
              , l = n + Math.floor((r - n) / a.params.slidesPerGroup)
              , o = a.rtlTranslate ? a.translate : -a.translate;
            if (o >= a.snapGrid[l]) {
                const e = a.snapGrid[l];
                o - e > (a.snapGrid[l + 1] - e) * i && (r += a.params.slidesPerGroup)
            } else {
                const e = a.snapGrid[l - 1];
                o - e <= (a.snapGrid[l] - e) * i && (r -= a.params.slidesPerGroup)
            }
            return r = Math.max(r, 0),
            r = Math.min(r, a.slidesGrid.length - 1),
            a.slideTo(r, e, t, s)
        },
        slideToClickedSlide: function() {
            const e = this
              , {params: t, slidesEl: s} = e
              , i = "auto" === t.slidesPerView ? e.slidesPerViewDynamic() : t.slidesPerView;
            let a, r = e.clickedIndex;
            const n = e.isElement ? "swiper-slide" : `.${t.slideClass}`;
            if (t.loop) {
                if (e.animating)
                    return;
                a = parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"), 10),
                t.centeredSlides ? r < e.loopedSlides - i / 2 || r > e.slides.length - e.loopedSlides + i / 2 ? (e.loopFix(),
                r = e.getSlideIndex(f(s, `${n}[data-swiper-slide-index="${a}"]`)[0]),
                l((()=>{
                    e.slideTo(r)
                }
                ))) : e.slideTo(r) : r > e.slides.length - i ? (e.loopFix(),
                r = e.getSlideIndex(f(s, `${n}[data-swiper-slide-index="${a}"]`)[0]),
                l((()=>{
                    e.slideTo(r)
                }
                ))) : e.slideTo(r)
            } else
                e.slideTo(r)
        }
    };
    var B = {
        loopCreate: function(e) {
            const t = this
              , {params: s, slidesEl: i} = t;
            if (!s.loop || t.virtual && t.params.virtual.enabled)
                return;
            const a = ()=>{
                f(i, `.${s.slideClass}, swiper-slide`).forEach(((e,t)=>{
                    e.setAttribute("data-swiper-slide-index", t)
                }
                ))
            }
              , r = t.grid && s.grid && s.grid.rows > 1
              , n = s.slidesPerGroup * (r ? s.grid.rows : 1)
              , l = t.slides.length % n != 0
              , o = r && t.slides.length % s.grid.rows != 0
              , d = e=>{
                for (let i = 0; i < e; i += 1) {
                    const e = t.isElement ? v("swiper-slide", [s.slideBlankClass]) : v("div", [s.slideClass, s.slideBlankClass]);
                    t.slidesEl.append(e)
                }
            }
            ;
            if (l) {
                if (s.loopAddBlankSlides) {
                    d(n - t.slides.length % n),
                    t.recalcSlides(),
                    t.updateSlides()
                } else
                    g("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
                a()
            } else if (o) {
                if (s.loopAddBlankSlides) {
                    d(s.grid.rows - t.slides.length % s.grid.rows),
                    t.recalcSlides(),
                    t.updateSlides()
                } else
                    g("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
                a()
            } else
                a();
            t.loopFix({
                slideRealIndex: e,
                direction: s.centeredSlides ? void 0 : "next"
            })
        },
        loopFix: function(e) {
            let {slideRealIndex: t, slideTo: s=!0, direction: i, setTranslate: a, activeSlideIndex: r, byController: n, byMousewheel: l} = void 0 === e ? {} : e;
            const o = this;
            if (!o.params.loop)
                return;
            o.emit("beforeLoopFix");
            const {slides: d, allowSlidePrev: p, allowSlideNext: c, slidesEl: u, params: m} = o
              , {centeredSlides: h} = m;
            if (o.allowSlidePrev = !0,
            o.allowSlideNext = !0,
            o.virtual && m.virtual.enabled)
                return s && (m.centeredSlides || 0 !== o.snapIndex ? m.centeredSlides && o.snapIndex < m.slidesPerView ? o.slideTo(o.virtual.slides.length + o.snapIndex, 0, !1, !0) : o.snapIndex === o.snapGrid.length - 1 && o.slideTo(o.virtual.slidesBefore, 0, !1, !0) : o.slideTo(o.virtual.slides.length, 0, !1, !0)),
                o.allowSlidePrev = p,
                o.allowSlideNext = c,
                void o.emit("loopFix");
            let f = m.slidesPerView;
            "auto" === f ? f = o.slidesPerViewDynamic() : (f = Math.ceil(parseFloat(m.slidesPerView, 10)),
            h && f % 2 == 0 && (f += 1));
            const v = m.slidesPerGroupAuto ? f : m.slidesPerGroup;
            let w = v;
            w % v != 0 && (w += v - w % v),
            w += m.loopAdditionalSlides,
            o.loopedSlides = w;
            const b = o.grid && m.grid && m.grid.rows > 1;
            d.length < f + w ? g("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters") : b && "row" === m.grid.fill && g("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
            const y = []
              , x = [];
            let E = o.activeIndex;
            void 0 === r ? r = o.getSlideIndex(d.filter((e=>e.classList.contains(m.slideActiveClass)))[0]) : E = r;
            const S = "next" === i || !i
              , T = "prev" === i || !i;
            let M = 0
              , C = 0;
            const P = b ? Math.ceil(d.length / m.grid.rows) : d.length
              , L = (b ? d[r].column : r) + (h && void 0 === a ? -f / 2 + .5 : 0);
            if (L < w) {
                M = Math.max(w - L, v);
                for (let e = 0; e < w - L; e += 1) {
                    const t = e - Math.floor(e / P) * P;
                    if (b) {
                        const e = P - t - 1;
                        for (let t = d.length - 1; t >= 0; t -= 1)
                            d[t].column === e && y.push(t)
                    } else
                        y.push(P - t - 1)
                }
            } else if (L + f > P - w) {
                C = Math.max(L - (P - 2 * w), v);
                for (let e = 0; e < C; e += 1) {
                    const t = e - Math.floor(e / P) * P;
                    b ? d.forEach(((e,s)=>{
                        e.column === t && x.push(s)
                    }
                    )) : x.push(t)
                }
            }
            if (o.__preventObserver__ = !0,
            requestAnimationFrame((()=>{
                o.__preventObserver__ = !1
            }
            )),
            T && y.forEach((e=>{
                d[e].swiperLoopMoveDOM = !0,
                u.prepend(d[e]),
                d[e].swiperLoopMoveDOM = !1
            }
            )),
            S && x.forEach((e=>{
                d[e].swiperLoopMoveDOM = !0,
                u.append(d[e]),
                d[e].swiperLoopMoveDOM = !1
            }
            )),
            o.recalcSlides(),
            "auto" === m.slidesPerView ? o.updateSlides() : b && (y.length > 0 && T || x.length > 0 && S) && o.slides.forEach(((e,t)=>{
                o.grid.updateSlide(t, e, o.slides)
            }
            )),
            m.watchSlidesProgress && o.updateSlidesOffset(),
            s)
                if (y.length > 0 && T) {
                    if (void 0 === t) {
                        const e = o.slidesGrid[E]
                          , t = o.slidesGrid[E + M] - e;
                        l ? o.setTranslate(o.translate - t) : (o.slideTo(E + M, 0, !1, !0),
                        a && (o.touchEventsData.startTranslate = o.touchEventsData.startTranslate - t,
                        o.touchEventsData.currentTranslate = o.touchEventsData.currentTranslate - t))
                    } else if (a) {
                        const e = b ? y.length / m.grid.rows : y.length;
                        o.slideTo(o.activeIndex + e, 0, !1, !0),
                        o.touchEventsData.currentTranslate = o.translate
                    }
                } else if (x.length > 0 && S)
                    if (void 0 === t) {
                        const e = o.slidesGrid[E]
                          , t = o.slidesGrid[E - C] - e;
                        l ? o.setTranslate(o.translate - t) : (o.slideTo(E - C, 0, !1, !0),
                        a && (o.touchEventsData.startTranslate = o.touchEventsData.startTranslate - t,
                        o.touchEventsData.currentTranslate = o.touchEventsData.currentTranslate - t))
                    } else {
                        const e = b ? x.length / m.grid.rows : x.length;
                        o.slideTo(o.activeIndex - e, 0, !1, !0)
                    }
            if (o.allowSlidePrev = p,
            o.allowSlideNext = c,
            o.controller && o.controller.control && !n) {
                const e = {
                    slideRealIndex: t,
                    direction: i,
                    setTranslate: a,
                    activeSlideIndex: r,
                    byController: !0
                };
                Array.isArray(o.controller.control) ? o.controller.control.forEach((t=>{
                    !t.destroyed && t.params.loop && t.loopFix({
                        ...e,
                        slideTo: t.params.slidesPerView === m.slidesPerView && s
                    })
                }
                )) : o.controller.control instanceof o.constructor && o.controller.control.params.loop && o.controller.control.loopFix({
                    ...e,
                    slideTo: o.controller.control.params.slidesPerView === m.slidesPerView && s
                })
            }
            o.emit("loopFix")
        },
        loopDestroy: function() {
            const e = this
              , {params: t, slidesEl: s} = e;
            if (!t.loop || e.virtual && e.params.virtual.enabled)
                return;
            e.recalcSlides();
            const i = [];
            e.slides.forEach((e=>{
                const t = void 0 === e.swiperSlideIndex ? 1 * e.getAttribute("data-swiper-slide-index") : e.swiperSlideIndex;
                i[t] = e
            }
            )),
            e.slides.forEach((e=>{
                e.removeAttribute("data-swiper-slide-index")
            }
            )),
            i.forEach((e=>{
                s.append(e)
            }
            )),
            e.recalcSlides(),
            e.slideTo(e.realIndex, 0)
        }
    };
    function N(e, t, s) {
        const i = r()
          , {params: a} = e
          , n = a.edgeSwipeDetection
          , l = a.edgeSwipeThreshold;
        return !n || !(s <= l || s >= i.innerWidth - l) || "prevent" === n && (t.preventDefault(),
        !0)
    }
    function H(e) {
        const t = this
          , s = i();
        let a = e;
        a.originalEvent && (a = a.originalEvent);
        const n = t.touchEventsData;
        if ("pointerdown" === a.type) {
            if (null !== n.pointerId && n.pointerId !== a.pointerId)
                return;
            n.pointerId = a.pointerId
        } else
            "touchstart" === a.type && 1 === a.targetTouches.length && (n.touchId = a.targetTouches[0].identifier);
        if ("touchstart" === a.type)
            return void N(t, a, a.targetTouches[0].pageX);
        const {params: l, touches: d, enabled: p} = t;
        if (!p)
            return;
        if (!l.simulateTouch && "mouse" === a.pointerType)
            return;
        if (t.animating && l.preventInteractionOnTransition)
            return;
        !t.animating && l.cssMode && l.loop && t.loopFix();
        let c = a.target;
        if ("wrapper" === l.touchEventsTarget && !t.wrapperEl.contains(c))
            return;
        if ("which"in a && 3 === a.which)
            return;
        if ("button"in a && a.button > 0)
            return;
        if (n.isTouched && n.isMoved)
            return;
        const u = !!l.noSwipingClass && "" !== l.noSwipingClass
          , m = a.composedPath ? a.composedPath() : a.path;
        u && a.target && a.target.shadowRoot && m && (c = m[0]);
        const h = l.noSwipingSelector ? l.noSwipingSelector : `.${l.noSwipingClass}`
          , f = !(!a.target || !a.target.shadowRoot);
        if (l.noSwiping && (f ? function(e, t) {
            return void 0 === t && (t = this),
            function t(s) {
                if (!s || s === i() || s === r())
                    return null;
                s.assignedSlot && (s = s.assignedSlot);
                const a = s.closest(e);
                return a || s.getRootNode ? a || t(s.getRootNode().host) : null
            }(t)
        }(h, c) : c.closest(h)))
            return void (t.allowClick = !0);
        if (l.swipeHandler && !c.closest(l.swipeHandler))
            return;
        d.currentX = a.pageX,
        d.currentY = a.pageY;
        const g = d.currentX
          , v = d.currentY;
        if (!N(t, a, g))
            return;
        Object.assign(n, {
            isTouched: !0,
            isMoved: !1,
            allowTouchCallbacks: !0,
            isScrolling: void 0,
            startMoving: void 0
        }),
        d.startX = g,
        d.startY = v,
        n.touchStartTime = o(),
        t.allowClick = !0,
        t.updateSize(),
        t.swipeDirection = void 0,
        l.threshold > 0 && (n.allowThresholdMove = !1);
        let w = !0;
        c.matches(n.focusableElements) && (w = !1,
        "SELECT" === c.nodeName && (n.isTouched = !1)),
        s.activeElement && s.activeElement.matches(n.focusableElements) && s.activeElement !== c && s.activeElement.blur();
        const b = w && t.allowTouchMove && l.touchStartPreventDefault;
        !l.touchStartForcePreventDefault && !b || c.isContentEditable || a.preventDefault(),
        l.freeMode && l.freeMode.enabled && t.freeMode && t.animating && !l.cssMode && t.freeMode.onTouchStart(),
        t.emit("touchStart", a)
    }
    function R(e) {
        const t = i()
          , s = this
          , a = s.touchEventsData
          , {params: r, touches: n, rtlTranslate: l, enabled: d} = s;
        if (!d)
            return;
        if (!r.simulateTouch && "mouse" === e.pointerType)
            return;
        let p, c = e;
        if (c.originalEvent && (c = c.originalEvent),
        "pointermove" === c.type) {
            if (null !== a.touchId)
                return;
            if (c.pointerId !== a.pointerId)
                return
        }
        if ("touchmove" === c.type) {
            if (p = [...c.changedTouches].filter((e=>e.identifier === a.touchId))[0],
            !p || p.identifier !== a.touchId)
                return
        } else
            p = c;
        if (!a.isTouched)
            return void (a.startMoving && a.isScrolling && s.emit("touchMoveOpposite", c));
        const u = p.pageX
          , m = p.pageY;
        if (c.preventedByNestedSwiper)
            return n.startX = u,
            void (n.startY = m);
        if (!s.allowTouchMove)
            return c.target.matches(a.focusableElements) || (s.allowClick = !1),
            void (a.isTouched && (Object.assign(n, {
                startX: u,
                startY: m,
                currentX: u,
                currentY: m
            }),
            a.touchStartTime = o()));
        if (r.touchReleaseOnEdges && !r.loop)
            if (s.isVertical()) {
                if (m < n.startY && s.translate <= s.maxTranslate() || m > n.startY && s.translate >= s.minTranslate())
                    return a.isTouched = !1,
                    void (a.isMoved = !1)
            } else if (u < n.startX && s.translate <= s.maxTranslate() || u > n.startX && s.translate >= s.minTranslate())
                return;
        if (t.activeElement && c.target === t.activeElement && c.target.matches(a.focusableElements))
            return a.isMoved = !0,
            void (s.allowClick = !1);
        a.allowTouchCallbacks && s.emit("touchMove", c),
        n.previousX = n.currentX,
        n.previousY = n.currentY,
        n.currentX = u,
        n.currentY = m;
        const h = n.currentX - n.startX
          , f = n.currentY - n.startY;
        if (s.params.threshold && Math.sqrt(h ** 2 + f ** 2) < s.params.threshold)
            return;
        if (void 0 === a.isScrolling) {
            let e;
            s.isHorizontal() && n.currentY === n.startY || s.isVertical() && n.currentX === n.startX ? a.isScrolling = !1 : h * h + f * f >= 25 && (e = 180 * Math.atan2(Math.abs(f), Math.abs(h)) / Math.PI,
            a.isScrolling = s.isHorizontal() ? e > r.touchAngle : 90 - e > r.touchAngle)
        }
        if (a.isScrolling && s.emit("touchMoveOpposite", c),
        void 0 === a.startMoving && (n.currentX === n.startX && n.currentY === n.startY || (a.startMoving = !0)),
        a.isScrolling)
            return void (a.isTouched = !1);
        if (!a.startMoving)
            return;
        s.allowClick = !1,
        !r.cssMode && c.cancelable && c.preventDefault(),
        r.touchMoveStopPropagation && !r.nested && c.stopPropagation();
        let g = s.isHorizontal() ? h : f
          , v = s.isHorizontal() ? n.currentX - n.previousX : n.currentY - n.previousY;
        r.oneWayMovement && (g = Math.abs(g) * (l ? 1 : -1),
        v = Math.abs(v) * (l ? 1 : -1)),
        n.diff = g,
        g *= r.touchRatio,
        l && (g = -g,
        v = -v);
        const w = s.touchesDirection;
        s.swipeDirection = g > 0 ? "prev" : "next",
        s.touchesDirection = v > 0 ? "prev" : "next";
        const b = s.params.loop && !r.cssMode
          , y = "next" === s.touchesDirection && s.allowSlideNext || "prev" === s.touchesDirection && s.allowSlidePrev;
        if (!a.isMoved) {
            if (b && y && s.loopFix({
                direction: s.swipeDirection
            }),
            a.startTranslate = s.getTranslate(),
            s.setTransition(0),
            s.animating) {
                const e = new window.CustomEvent("transitionend",{
                    bubbles: !0,
                    cancelable: !0
                });
                s.wrapperEl.dispatchEvent(e)
            }
            a.allowMomentumBounce = !1,
            !r.grabCursor || !0 !== s.allowSlideNext && !0 !== s.allowSlidePrev || s.setGrabCursor(!0),
            s.emit("sliderFirstMove", c)
        }
        if ((new Date).getTime(),
        a.isMoved && a.allowThresholdMove && w !== s.touchesDirection && b && y && Math.abs(g) >= 1)
            return Object.assign(n, {
                startX: u,
                startY: m,
                currentX: u,
                currentY: m,
                startTranslate: a.currentTranslate
            }),
            a.loopSwapReset = !0,
            void (a.startTranslate = a.currentTranslate);
        s.emit("sliderMove", c),
        a.isMoved = !0,
        a.currentTranslate = g + a.startTranslate;
        let x = !0
          , E = r.resistanceRatio;
        if (r.touchReleaseOnEdges && (E = 0),
        g > 0 ? (b && y && a.allowThresholdMove && a.currentTranslate > (r.centeredSlides ? s.minTranslate() - s.slidesSizesGrid[s.activeIndex + 1] : s.minTranslate()) && s.loopFix({
            direction: "prev",
            setTranslate: !0,
            activeSlideIndex: 0
        }),
        a.currentTranslate > s.minTranslate() && (x = !1,
        r.resistance && (a.currentTranslate = s.minTranslate() - 1 + (-s.minTranslate() + a.startTranslate + g) ** E))) : g < 0 && (b && y && a.allowThresholdMove && a.currentTranslate < (r.centeredSlides ? s.maxTranslate() + s.slidesSizesGrid[s.slidesSizesGrid.length - 1] : s.maxTranslate()) && s.loopFix({
            direction: "next",
            setTranslate: !0,
            activeSlideIndex: s.slides.length - ("auto" === r.slidesPerView ? s.slidesPerViewDynamic() : Math.ceil(parseFloat(r.slidesPerView, 10)))
        }),
        a.currentTranslate < s.maxTranslate() && (x = !1,
        r.resistance && (a.currentTranslate = s.maxTranslate() + 1 - (s.maxTranslate() - a.startTranslate - g) ** E))),
        x && (c.preventedByNestedSwiper = !0),
        !s.allowSlideNext && "next" === s.swipeDirection && a.currentTranslate < a.startTranslate && (a.currentTranslate = a.startTranslate),
        !s.allowSlidePrev && "prev" === s.swipeDirection && a.currentTranslate > a.startTranslate && (a.currentTranslate = a.startTranslate),
        s.allowSlidePrev || s.allowSlideNext || (a.currentTranslate = a.startTranslate),
        r.threshold > 0) {
            if (!(Math.abs(g) > r.threshold || a.allowThresholdMove))
                return void (a.currentTranslate = a.startTranslate);
            if (!a.allowThresholdMove)
                return a.allowThresholdMove = !0,
                n.startX = n.currentX,
                n.startY = n.currentY,
                a.currentTranslate = a.startTranslate,
                void (n.diff = s.isHorizontal() ? n.currentX - n.startX : n.currentY - n.startY)
        }
        r.followFinger && !r.cssMode && ((r.freeMode && r.freeMode.enabled && s.freeMode || r.watchSlidesProgress) && (s.updateActiveIndex(),
        s.updateSlidesClasses()),
        r.freeMode && r.freeMode.enabled && s.freeMode && s.freeMode.onTouchMove(),
        s.updateProgress(a.currentTranslate),
        s.setTranslate(a.currentTranslate))
    }
    function X(e) {
        const t = this
          , s = t.touchEventsData;
        let i, a = e;
        a.originalEvent && (a = a.originalEvent);
        if ("touchend" === a.type || "touchcancel" === a.type) {
            if (i = [...a.changedTouches].filter((e=>e.identifier === s.touchId))[0],
            !i || i.identifier !== s.touchId)
                return
        } else {
            if (null !== s.touchId)
                return;
            if (a.pointerId !== s.pointerId)
                return;
            i = a
        }
        if (["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(a.type)) {
            if (!(["pointercancel", "contextmenu"].includes(a.type) && (t.browser.isSafari || t.browser.isWebView)))
                return
        }
        s.pointerId = null,
        s.touchId = null;
        const {params: r, touches: n, rtlTranslate: d, slidesGrid: p, enabled: c} = t;
        if (!c)
            return;
        if (!r.simulateTouch && "mouse" === a.pointerType)
            return;
        if (s.allowTouchCallbacks && t.emit("touchEnd", a),
        s.allowTouchCallbacks = !1,
        !s.isTouched)
            return s.isMoved && r.grabCursor && t.setGrabCursor(!1),
            s.isMoved = !1,
            void (s.startMoving = !1);
        r.grabCursor && s.isMoved && s.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
        const u = o()
          , m = u - s.touchStartTime;
        if (t.allowClick) {
            const e = a.path || a.composedPath && a.composedPath();
            t.updateClickedSlide(e && e[0] || a.target, e),
            t.emit("tap click", a),
            m < 300 && u - s.lastClickTime < 300 && t.emit("doubleTap doubleClick", a)
        }
        if (s.lastClickTime = o(),
        l((()=>{
            t.destroyed || (t.allowClick = !0)
        }
        )),
        !s.isTouched || !s.isMoved || !t.swipeDirection || 0 === n.diff && !s.loopSwapReset || s.currentTranslate === s.startTranslate && !s.loopSwapReset)
            return s.isTouched = !1,
            s.isMoved = !1,
            void (s.startMoving = !1);
        let h;
        if (s.isTouched = !1,
        s.isMoved = !1,
        s.startMoving = !1,
        h = r.followFinger ? d ? t.translate : -t.translate : -s.currentTranslate,
        r.cssMode)
            return;
        if (r.freeMode && r.freeMode.enabled)
            return void t.freeMode.onTouchEnd({
                currentPos: h
            });
        let f = 0
          , g = t.slidesSizesGrid[0];
        for (let e = 0; e < p.length; e += e < r.slidesPerGroupSkip ? 1 : r.slidesPerGroup) {
            const t = e < r.slidesPerGroupSkip - 1 ? 1 : r.slidesPerGroup;
            void 0 !== p[e + t] ? h >= p[e] && h < p[e + t] && (f = e,
            g = p[e + t] - p[e]) : h >= p[e] && (f = e,
            g = p[p.length - 1] - p[p.length - 2])
        }
        let v = null
          , w = null;
        r.rewind && (t.isBeginning ? w = r.virtual && r.virtual.enabled && t.virtual ? t.virtual.slides.length - 1 : t.slides.length - 1 : t.isEnd && (v = 0));
        const b = (h - p[f]) / g
          , y = f < r.slidesPerGroupSkip - 1 ? 1 : r.slidesPerGroup;
        if (m > r.longSwipesMs) {
            if (!r.longSwipes)
                return void t.slideTo(t.activeIndex);
            "next" === t.swipeDirection && (b >= r.longSwipesRatio ? t.slideTo(r.rewind && t.isEnd ? v : f + y) : t.slideTo(f)),
            "prev" === t.swipeDirection && (b > 1 - r.longSwipesRatio ? t.slideTo(f + y) : null !== w && b < 0 && Math.abs(b) > r.longSwipesRatio ? t.slideTo(w) : t.slideTo(f))
        } else {
            if (!r.shortSwipes)
                return void t.slideTo(t.activeIndex);
            t.navigation && (a.target === t.navigation.nextEl || a.target === t.navigation.prevEl) ? a.target === t.navigation.nextEl ? t.slideTo(f + y) : t.slideTo(f) : ("next" === t.swipeDirection && t.slideTo(null !== v ? v : f + y),
            "prev" === t.swipeDirection && t.slideTo(null !== w ? w : f))
        }
    }
    function Y() {
        const e = this
          , {params: t, el: s} = e;
        if (s && 0 === s.offsetWidth)
            return;
        t.breakpoints && e.setBreakpoint();
        const {allowSlideNext: i, allowSlidePrev: a, snapGrid: r} = e
          , n = e.virtual && e.params.virtual.enabled;
        e.allowSlideNext = !0,
        e.allowSlidePrev = !0,
        e.updateSize(),
        e.updateSlides(),
        e.updateSlidesClasses();
        const l = n && t.loop;
        !("auto" === t.slidesPerView || t.slidesPerView > 1) || !e.isEnd || e.isBeginning || e.params.centeredSlides || l ? e.params.loop && !n ? e.slideToLoop(e.realIndex, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0) : e.slideTo(e.slides.length - 1, 0, !1, !0),
        e.autoplay && e.autoplay.running && e.autoplay.paused && (clearTimeout(e.autoplay.resizeTimeout),
        e.autoplay.resizeTimeout = setTimeout((()=>{
            e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.resume()
        }
        ), 500)),
        e.allowSlidePrev = a,
        e.allowSlideNext = i,
        e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow()
    }
    function q(e) {
        const t = this;
        t.enabled && (t.allowClick || (t.params.preventClicks && e.preventDefault(),
        t.params.preventClicksPropagation && t.animating && (e.stopPropagation(),
        e.stopImmediatePropagation())))
    }
    function V() {
        const e = this
          , {wrapperEl: t, rtlTranslate: s, enabled: i} = e;
        if (!i)
            return;
        let a;
        e.previousTranslate = e.translate,
        e.isHorizontal() ? e.translate = -t.scrollLeft : e.translate = -t.scrollTop,
        0 === e.translate && (e.translate = 0),
        e.updateActiveIndex(),
        e.updateSlidesClasses();
        const r = e.maxTranslate() - e.minTranslate();
        a = 0 === r ? 0 : (e.translate - e.minTranslate()) / r,
        a !== e.progress && e.updateProgress(s ? -e.translate : e.translate),
        e.emit("setTranslate", e.translate, !1)
    }
    function j(e) {
        const t = this;
        A(t, e.target),
        t.params.cssMode || "auto" !== t.params.slidesPerView && !t.params.autoHeight || t.update()
    }
    function F() {
        const e = this;
        e.documentTouchHandlerProceeded || (e.documentTouchHandlerProceeded = !0,
        e.params.touchReleaseOnEdges && (e.el.style.touchAction = "auto"))
    }
    const W = (e,t)=>{
        const s = i()
          , {params: a, el: r, wrapperEl: n, device: l} = e
          , o = !!a.nested
          , d = "on" === t ? "addEventListener" : "removeEventListener"
          , p = t;
        s[d]("touchstart", e.onDocumentTouchStart, {
            passive: !1,
            capture: o
        }),
        r[d]("touchstart", e.onTouchStart, {
            passive: !1
        }),
        r[d]("pointerdown", e.onTouchStart, {
            passive: !1
        }),
        s[d]("touchmove", e.onTouchMove, {
            passive: !1,
            capture: o
        }),
        s[d]("pointermove", e.onTouchMove, {
            passive: !1,
            capture: o
        }),
        s[d]("touchend", e.onTouchEnd, {
            passive: !0
        }),
        s[d]("pointerup", e.onTouchEnd, {
            passive: !0
        }),
        s[d]("pointercancel", e.onTouchEnd, {
            passive: !0
        }),
        s[d]("touchcancel", e.onTouchEnd, {
            passive: !0
        }),
        s[d]("pointerout", e.onTouchEnd, {
            passive: !0
        }),
        s[d]("pointerleave", e.onTouchEnd, {
            passive: !0
        }),
        s[d]("contextmenu", e.onTouchEnd, {
            passive: !0
        }),
        (a.preventClicks || a.preventClicksPropagation) && r[d]("click", e.onClick, !0),
        a.cssMode && n[d]("scroll", e.onScroll),
        a.updateOnWindowResize ? e[p](l.ios || l.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", Y, !0) : e[p]("observerUpdate", Y, !0),
        r[d]("load", e.onLoad, {
            capture: !0
        })
    }
    ;
    const U = (e,t)=>e.grid && t.grid && t.grid.rows > 1;
    var K = {
        init: !0,
        direction: "horizontal",
        oneWayMovement: !1,
        touchEventsTarget: "wrapper",
        initialSlide: 0,
        speed: 300,
        cssMode: !1,
        updateOnWindowResize: !0,
        resizeObserver: !0,
        nested: !1,
        createElements: !1,
        eventsPrefix: "swiper",
        enabled: !0,
        focusableElements: "input, select, option, textarea, button, video, label",
        width: null,
        height: null,
        preventInteractionOnTransition: !1,
        userAgent: null,
        url: null,
        edgeSwipeDetection: !1,
        edgeSwipeThreshold: 20,
        autoHeight: !1,
        setWrapperSize: !1,
        virtualTranslate: !1,
        effect: "slide",
        breakpoints: void 0,
        breakpointsBase: "window",
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerGroup: 1,
        slidesPerGroupSkip: 0,
        slidesPerGroupAuto: !1,
        centeredSlides: !1,
        centeredSlidesBounds: !1,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        normalizeSlideIndex: !0,
        centerInsufficientSlides: !1,
        watchOverflow: !0,
        roundLengths: !1,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: !0,
        shortSwipes: !0,
        longSwipes: !0,
        longSwipesRatio: .5,
        longSwipesMs: 300,
        followFinger: !0,
        allowTouchMove: !0,
        threshold: 5,
        touchMoveStopPropagation: !1,
        touchStartPreventDefault: !0,
        touchStartForcePreventDefault: !1,
        touchReleaseOnEdges: !1,
        uniqueNavElements: !0,
        resistance: !0,
        resistanceRatio: .85,
        watchSlidesProgress: !1,
        grabCursor: !1,
        preventClicks: !0,
        preventClicksPropagation: !0,
        slideToClickedSlide: !1,
        loop: !1,
        loopAddBlankSlides: !0,
        loopAdditionalSlides: 0,
        loopPreventsSliding: !0,
        rewind: !1,
        allowSlidePrev: !0,
        allowSlideNext: !0,
        swipeHandler: null,
        noSwiping: !0,
        noSwipingClass: "swiper-no-swiping",
        noSwipingSelector: null,
        passiveListeners: !0,
        maxBackfaceHiddenSlides: 10,
        containerModifierClass: "swiper-",
        slideClass: "swiper-slide",
        slideBlankClass: "swiper-slide-blank",
        slideActiveClass: "swiper-slide-active",
        slideVisibleClass: "swiper-slide-visible",
        slideFullyVisibleClass: "swiper-slide-fully-visible",
        slideNextClass: "swiper-slide-next",
        slidePrevClass: "swiper-slide-prev",
        wrapperClass: "swiper-wrapper",
        lazyPreloaderClass: "swiper-lazy-preloader",
        lazyPreloadPrevNext: 0,
        runCallbacksOnInit: !0,
        _emitClasses: !1
    };
    function Z(e, t) {
        return function(s) {
            void 0 === s && (s = {});
            const i = Object.keys(s)[0]
              , a = s[i];
            "object" == typeof a && null !== a ? (!0 === e[i] && (e[i] = {
                enabled: !0
            }),
            "navigation" === i && e[i] && e[i].enabled && !e[i].prevEl && !e[i].nextEl && (e[i].auto = !0),
            ["pagination", "scrollbar"].indexOf(i) >= 0 && e[i] && e[i].enabled && !e[i].el && (e[i].auto = !0),
            i in e && "enabled"in a ? ("object" != typeof e[i] || "enabled"in e[i] || (e[i].enabled = !0),
            e[i] || (e[i] = {
                enabled: !1
            }),
            c(t, s)) : c(t, s)) : c(t, s)
        }
    }
    const Q = {
        eventsEmitter: k,
        update: O,
        translate: D,
        transition: {
            setTransition: function(e, t) {
                const s = this;
                s.params.cssMode || (s.wrapperEl.style.transitionDuration = `${e}ms`,
                s.wrapperEl.style.transitionDelay = 0 === e ? "0ms" : ""),
                s.emit("setTransition", e, t)
            },
            transitionStart: function(e, t) {
                void 0 === e && (e = !0);
                const s = this
                  , {params: i} = s;
                i.cssMode || (i.autoHeight && s.updateAutoHeight(),
                _({
                    swiper: s,
                    runCallbacks: e,
                    direction: t,
                    step: "Start"
                }))
            },
            transitionEnd: function(e, t) {
                void 0 === e && (e = !0);
                const s = this
                  , {params: i} = s;
                s.animating = !1,
                i.cssMode || (s.setTransition(0),
                _({
                    swiper: s,
                    runCallbacks: e,
                    direction: t,
                    step: "End"
                }))
            }
        },
        slide: G,
        loop: B,
        grabCursor: {
            setGrabCursor: function(e) {
                const t = this;
                if (!t.params.simulateTouch || t.params.watchOverflow && t.isLocked || t.params.cssMode)
                    return;
                const s = "layout" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
                t.isElement && (t.__preventObserver__ = !0),
                s.style.cursor = "move",
                s.style.cursor = e ? "grabbing" : "grab",
                t.isElement && requestAnimationFrame((()=>{
                    t.__preventObserver__ = !1
                }
                ))
            },
            unsetGrabCursor: function() {
                const e = this;
                e.params.watchOverflow && e.isLocked || e.params.cssMode || (e.isElement && (e.__preventObserver__ = !0),
                e["layout" === e.params.touchEventsTarget ? "el" : "wrapperEl"].style.cursor = "",
                e.isElement && requestAnimationFrame((()=>{
                    e.__preventObserver__ = !1
                }
                )))
            }
        },
        events: {
            attachEvents: function() {
                const e = this
                  , {params: t} = e;
                e.onTouchStart = H.bind(e),
                e.onTouchMove = R.bind(e),
                e.onTouchEnd = X.bind(e),
                e.onDocumentTouchStart = F.bind(e),
                t.cssMode && (e.onScroll = V.bind(e)),
                e.onClick = q.bind(e),
                e.onLoad = j.bind(e),
                W(e, "on")
            },
            detachEvents: function() {
                W(this, "off")
            }
        },
        breakpoints: {
            setBreakpoint: function() {
                const e = this
                  , {realIndex: t, initialized: s, params: i, el: a} = e
                  , r = i.breakpoints;
                if (!r || r && 0 === Object.keys(r).length)
                    return;
                const n = e.getBreakpoint(r, e.params.breakpointsBase, e.el);
                if (!n || e.currentBreakpoint === n)
                    return;
                const l = (n in r ? r[n] : void 0) || e.originalParams
                  , o = U(e, i)
                  , d = U(e, l)
                  , p = i.enabled;
                o && !d ? (a.classList.remove(`${i.containerModifierClass}grid`, `${i.containerModifierClass}grid-column`),
                e.emitContainerClasses()) : !o && d && (a.classList.add(`${i.containerModifierClass}grid`),
                (l.grid.fill && "column" === l.grid.fill || !l.grid.fill && "column" === i.grid.fill) && a.classList.add(`${i.containerModifierClass}grid-column`),
                e.emitContainerClasses()),
                ["navigation", "pagination", "scrollbar"].forEach((t=>{
                    if (void 0 === l[t])
                        return;
                    const s = i[t] && i[t].enabled
                      , a = l[t] && l[t].enabled;
                    s && !a && e[t].disable(),
                    !s && a && e[t].enable()
                }
                ));
                const u = l.direction && l.direction !== i.direction
                  , m = i.loop && (l.slidesPerView !== i.slidesPerView || u)
                  , h = i.loop;
                u && s && e.changeDirection(),
                c(e.params, l);
                const f = e.params.enabled
                  , g = e.params.loop;
                Object.assign(e, {
                    allowTouchMove: e.params.allowTouchMove,
                    allowSlideNext: e.params.allowSlideNext,
                    allowSlidePrev: e.params.allowSlidePrev
                }),
                p && !f ? e.disable() : !p && f && e.enable(),
                e.currentBreakpoint = n,
                e.emit("_beforeBreakpoint", l),
                s && (m ? (e.loopDestroy(),
                e.loopCreate(t),
                e.updateSlides()) : !h && g ? (e.loopCreate(t),
                e.updateSlides()) : h && !g && e.loopDestroy()),
                e.emit("breakpoint", l)
            },
            getBreakpoint: function(e, t, s) {
                if (void 0 === t && (t = "window"),
                !e || "layout" === t && !s)
                    return;
                let i = !1;
                const a = r()
                  , n = "window" === t ? a.innerHeight : s.clientHeight
                  , l = Object.keys(e).map((e=>{
                    if ("string" == typeof e && 0 === e.indexOf("@")) {
                        const t = parseFloat(e.substr(1));
                        return {
                            value: n * t,
                            point: e
                        }
                    }
                    return {
                        value: e,
                        point: e
                    }
                }
                ));
                l.sort(((e,t)=>parseInt(e.value, 10) - parseInt(t.value, 10)));
                for (let e = 0; e < l.length; e += 1) {
                    const {point: r, value: n} = l[e];
                    "window" === t ? a.matchMedia(`(min-width: ${n}px)`).matches && (i = r) : n <= s.clientWidth && (i = r)
                }
                return i || "max"
            }
        },
        checkOverflow: {
            checkOverflow: function() {
                const e = this
                  , {isLocked: t, params: s} = e
                  , {slidesOffsetBefore: i} = s;
                if (i) {
                    const t = e.slides.length - 1
                      , s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * i;
                    e.isLocked = e.size > s
                } else
                    e.isLocked = 1 === e.snapGrid.length;
                !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked),
                !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
                t && t !== e.isLocked && (e.isEnd = !1),
                t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock")
            }
        },
        classes: {
            addClasses: function() {
                const e = this
                  , {classNames: t, params: s, rtl: i, el: a, device: r} = e
                  , n = function(e, t) {
                    const s = [];
                    return e.forEach((e=>{
                        "object" == typeof e ? Object.keys(e).forEach((i=>{
                            e[i] && s.push(t + i)
                        }
                        )) : "string" == typeof e && s.push(t + e)
                    }
                    )),
                    s
                }(["initialized", s.direction, {
                    "free-mode": e.params.freeMode && s.freeMode.enabled
                }, {
                    autoheight: s.autoHeight
                }, {
                    rtl: i
                }, {
                    grid: s.grid && s.grid.rows > 1
                }, {
                    "grid-column": s.grid && s.grid.rows > 1 && "column" === s.grid.fill
                }, {
                    android: r.android
                }, {
                    ios: r.ios
                }, {
                    "css-mode": s.cssMode
                }, {
                    centered: s.cssMode && s.centeredSlides
                }, {
                    "watch-progress": s.watchSlidesProgress
                }], s.containerModifierClass);
                t.push(...n),
                a.classList.add(...t),
                e.emitContainerClasses()
            },
            removeClasses: function() {
                const {el: e, classNames: t} = this;
                e.classList.remove(...t),
                this.emitContainerClasses()
            }
        }
    }
      , J = {};
    class ee {
        constructor() {
            let e, t;
            for (var s = arguments.length, a = new Array(s), r = 0; r < s; r++)
                a[r] = arguments[r];
            1 === a.length && a[0].constructor && "Object" === Object.prototype.toString.call(a[0]).slice(8, -1) ? t = a[0] : [e,t] = a,
            t || (t = {}),
            t = c({}, t),
            e && !t.el && (t.el = e);
            const n = i();
            if (t.el && "string" == typeof t.el && n.querySelectorAll(t.el).length > 1) {
                const e = [];
                return n.querySelectorAll(t.el).forEach((s=>{
                    const i = c({}, t, {
                        el: s
                    });
                    e.push(new ee(i))
                }
                )),
                e
            }
            const l = this;
            l.__swiper__ = !0,
            l.support = P(),
            l.device = L({
                userAgent: t.userAgent
            }),
            l.browser = z(),
            l.eventsListeners = {},
            l.eventsAnyListeners = [],
            l.modules = [...l.__modules__],
            t.modules && Array.isArray(t.modules) && l.modules.push(...t.modules);
            const o = {};
            l.modules.forEach((e=>{
                e({
                    params: t,
                    swiper: l,
                    extendParams: Z(t, o),
                    on: l.on.bind(l),
                    once: l.once.bind(l),
                    off: l.off.bind(l),
                    emit: l.emit.bind(l)
                })
            }
            ));
            const d = c({}, K, o);
            return l.params = c({}, d, J, t),
            l.originalParams = c({}, l.params),
            l.passedParams = c({}, t),
            l.params && l.params.on && Object.keys(l.params.on).forEach((e=>{
                l.on(e, l.params.on[e])
            }
            )),
            l.params && l.params.onAny && l.onAny(l.params.onAny),
            Object.assign(l, {
                enabled: l.params.enabled,
                el: e,
                classNames: [],
                slides: [],
                slidesGrid: [],
                snapGrid: [],
                slidesSizesGrid: [],
                isHorizontal: ()=>"horizontal" === l.params.direction,
                isVertical: ()=>"vertical" === l.params.direction,
                activeIndex: 0,
                realIndex: 0,
                isBeginning: !0,
                isEnd: !1,
                translate: 0,
                previousTranslate: 0,
                progress: 0,
                velocity: 0,
                animating: !1,
                cssOverflowAdjustment() {
                    return Math.trunc(this.translate / 2 ** 23) * 2 ** 23
                },
                allowSlideNext: l.params.allowSlideNext,
                allowSlidePrev: l.params.allowSlidePrev,
                touchEventsData: {
                    isTouched: void 0,
                    isMoved: void 0,
                    allowTouchCallbacks: void 0,
                    touchStartTime: void 0,
                    isScrolling: void 0,
                    currentTranslate: void 0,
                    startTranslate: void 0,
                    allowThresholdMove: void 0,
                    focusableElements: l.params.focusableElements,
                    lastClickTime: 0,
                    clickTimeout: void 0,
                    velocities: [],
                    allowMomentumBounce: void 0,
                    startMoving: void 0,
                    pointerId: null,
                    touchId: null
                },
                allowClick: !0,
                allowTouchMove: l.params.allowTouchMove,
                touches: {
                    startX: 0,
                    startY: 0,
                    currentX: 0,
                    currentY: 0,
                    diff: 0
                },
                imagesToLoad: [],
                imagesLoaded: 0
            }),
            l.emit("_swiper"),
            l.params.init && l.init(),
            l
        }
        getDirectionLabel(e) {
            return this.isHorizontal() ? e : {
                width: "height",
                "margin-top": "margin-left",
                "margin-bottom ": "margin-right",
                "margin-left": "margin-top",
                "margin-right": "margin-bottom",
                "padding-left": "padding-top",
                "padding-right": "padding-bottom",
                marginRight: "marginBottom"
            }[e]
        }
        getSlideIndex(e) {
            const {slidesEl: t, params: s} = this
              , i = y(f(t, `.${s.slideClass}, swiper-slide`)[0]);
            return y(e) - i
        }
        getSlideIndexByData(e) {
            return this.getSlideIndex(this.slides.filter((t=>1 * t.getAttribute("data-swiper-slide-index") === e))[0])
        }
        recalcSlides() {
            const {slidesEl: e, params: t} = this;
            this.slides = f(e, `.${t.slideClass}, swiper-slide`)
        }
        enable() {
            const e = this;
            e.enabled || (e.enabled = !0,
            e.params.grabCursor && e.setGrabCursor(),
            e.emit("enable"))
        }
        disable() {
            const e = this;
            e.enabled && (e.enabled = !1,
            e.params.grabCursor && e.unsetGrabCursor(),
            e.emit("disable"))
        }
        setProgress(e, t) {
            const s = this;
            e = Math.min(Math.max(e, 0), 1);
            const i = s.minTranslate()
              , a = (s.maxTranslate() - i) * e + i;
            s.translateTo(a, void 0 === t ? 0 : t),
            s.updateActiveIndex(),
            s.updateSlidesClasses()
        }
        emitContainerClasses() {
            const e = this;
            if (!e.params._emitClasses || !e.el)
                return;
            const t = e.el.className.split(" ").filter((t=>0 === t.indexOf("swiper") || 0 === t.indexOf(e.params.containerModifierClass)));
            e.emit("_containerClasses", t.join(" "))
        }
        getSlideClasses(e) {
            const t = this;
            return t.destroyed ? "" : e.className.split(" ").filter((e=>0 === e.indexOf("swiper-slide") || 0 === e.indexOf(t.params.slideClass))).join(" ")
        }
        emitSlidesClasses() {
            const e = this;
            if (!e.params._emitClasses || !e.el)
                return;
            const t = [];
            e.slides.forEach((s=>{
                const i = e.getSlideClasses(s);
                t.push({
                    slideEl: s,
                    classNames: i
                }),
                e.emit("_slideClass", s, i)
            }
            )),
            e.emit("_slideClasses", t)
        }
        slidesPerViewDynamic(e, t) {
            void 0 === e && (e = "current"),
            void 0 === t && (t = !1);
            const {params: s, slides: i, slidesGrid: a, slidesSizesGrid: r, size: n, activeIndex: l} = this;
            let o = 1;
            if ("number" == typeof s.slidesPerView)
                return s.slidesPerView;
            if (s.centeredSlides) {
                let e, t = i[l] ? i[l].swiperSlideSize : 0;
                for (let s = l + 1; s < i.length; s += 1)
                    i[s] && !e && (t += i[s].swiperSlideSize,
                    o += 1,
                    t > n && (e = !0));
                for (let s = l - 1; s >= 0; s -= 1)
                    i[s] && !e && (t += i[s].swiperSlideSize,
                    o += 1,
                    t > n && (e = !0))
            } else if ("current" === e)
                for (let e = l + 1; e < i.length; e += 1) {
                    (t ? a[e] + r[e] - a[l] < n : a[e] - a[l] < n) && (o += 1)
                }
            else
                for (let e = l - 1; e >= 0; e -= 1) {
                    a[l] - a[e] < n && (o += 1)
                }
            return o
        }
        update() {
            const e = this;
            if (!e || e.destroyed)
                return;
            const {snapGrid: t, params: s} = e;
            function i() {
                const t = e.rtlTranslate ? -1 * e.translate : e.translate
                  , s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
                e.setTranslate(s),
                e.updateActiveIndex(),
                e.updateSlidesClasses()
            }
            let a;
            if (s.breakpoints && e.setBreakpoint(),
            [...e.el.querySelectorAll('[loading="lazy"]')].forEach((t=>{
                t.complete && A(e, t)
            }
            )),
            e.updateSize(),
            e.updateSlides(),
            e.updateProgress(),
            e.updateSlidesClasses(),
            s.freeMode && s.freeMode.enabled && !s.cssMode)
                i(),
                s.autoHeight && e.updateAutoHeight();
            else {
                if (("auto" === s.slidesPerView || s.slidesPerView > 1) && e.isEnd && !s.centeredSlides) {
                    const t = e.virtual && s.virtual.enabled ? e.virtual.slides : e.slides;
                    a = e.slideTo(t.length - 1, 0, !1, !0)
                } else
                    a = e.slideTo(e.activeIndex, 0, !1, !0);
                a || i()
            }
            s.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
            e.emit("update")
        }
        changeDirection(e, t) {
            void 0 === t && (t = !0);
            const s = this
              , i = s.params.direction;
            return e || (e = "horizontal" === i ? "vertical" : "horizontal"),
            e === i || "horizontal" !== e && "vertical" !== e || (s.el.classList.remove(`${s.params.containerModifierClass}${i}`),
            s.el.classList.add(`${s.params.containerModifierClass}${e}`),
            s.emitContainerClasses(),
            s.params.direction = e,
            s.slides.forEach((t=>{
                "vertical" === e ? t.style.width = "" : t.style.height = ""
            }
            )),
            s.emit("changeDirection"),
            t && s.update()),
            s
        }
        changeLanguageDirection(e) {
            const t = this;
            t.rtl && "rtl" === e || !t.rtl && "ltr" === e || (t.rtl = "rtl" === e,
            t.rtlTranslate = "horizontal" === t.params.direction && t.rtl,
            t.rtl ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`),
            t.el.dir = "rtl") : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`),
            t.el.dir = "ltr"),
            t.update())
        }
        mount(e) {
            const t = this;
            if (t.mounted)
                return !0;
            let s = e || t.params.el;
            if ("string" == typeof s && (s = document.querySelector(s)),
            !s)
                return !1;
            s.swiper = t,
            s.parentNode && s.parentNode.host && "SWIPER-CONTAINER" === s.parentNode.host.nodeName && (t.isElement = !0);
            const i = ()=>`.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
            let a = (()=>{
                if (s && s.shadowRoot && s.shadowRoot.querySelector) {
                    return s.shadowRoot.querySelector(i())
                }
                return f(s, i())[0]
            }
            )();
            return !a && t.params.createElements && (a = v("div", t.params.wrapperClass),
            s.append(a),
            f(s, `.${t.params.slideClass}`).forEach((e=>{
                a.append(e)
            }
            ))),
            Object.assign(t, {
                el: s,
                wrapperEl: a,
                slidesEl: t.isElement && !s.parentNode.host.slideSlots ? s.parentNode.host : a,
                hostEl: t.isElement ? s.parentNode.host : s,
                mounted: !0,
                rtl: "rtl" === s.dir.toLowerCase() || "rtl" === b(s, "direction"),
                rtlTranslate: "horizontal" === t.params.direction && ("rtl" === s.dir.toLowerCase() || "rtl" === b(s, "direction")),
                wrongRTL: "-webkit-box" === b(a, "display")
            }),
            !0
        }
        init(e) {
            const t = this;
            if (t.initialized)
                return t;
            if (!1 === t.mount(e))
                return t;
            t.emit("beforeInit"),
            t.params.breakpoints && t.setBreakpoint(),
            t.addClasses(),
            t.updateSize(),
            t.updateSlides(),
            t.params.watchOverflow && t.checkOverflow(),
            t.params.grabCursor && t.enabled && t.setGrabCursor(),
            t.params.loop && t.virtual && t.params.virtual.enabled ? t.slideTo(t.params.initialSlide + t.virtual.slidesBefore, 0, t.params.runCallbacksOnInit, !1, !0) : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0),
            t.params.loop && t.loopCreate(),
            t.attachEvents();
            const s = [...t.el.querySelectorAll('[loading="lazy"]')];
            return t.isElement && s.push(...t.hostEl.querySelectorAll('[loading="lazy"]')),
            s.forEach((e=>{
                e.complete ? A(t, e) : e.addEventListener("load", (e=>{
                    A(t, e.target)
                }
                ))
            }
            )),
            $(t),
            t.initialized = !0,
            $(t),
            t.emit("init"),
            t.emit("afterInit"),
            t
        }
        destroy(e, t) {
            void 0 === e && (e = !0),
            void 0 === t && (t = !0);
            const s = this
              , {params: i, el: a, wrapperEl: r, slides: n} = s;
            return void 0 === s.params || s.destroyed || (s.emit("beforeDestroy"),
            s.initialized = !1,
            s.detachEvents(),
            i.loop && s.loopDestroy(),
            t && (s.removeClasses(),
            a.removeAttribute("style"),
            r.removeAttribute("style"),
            n && n.length && n.forEach((e=>{
                e.classList.remove(i.slideVisibleClass, i.slideFullyVisibleClass, i.slideActiveClass, i.slideNextClass, i.slidePrevClass),
                e.removeAttribute("style"),
                e.removeAttribute("data-swiper-slide-index")
            }
            ))),
            s.emit("destroy"),
            Object.keys(s.eventsListeners).forEach((e=>{
                s.off(e)
            }
            )),
            !1 !== e && (s.el.swiper = null,
            function(e) {
                const t = e;
                Object.keys(t).forEach((e=>{
                    try {
                        t[e] = null
                    } catch (e) {}
                    try {
                        delete t[e]
                    } catch (e) {}
                }
                ))
            }(s)),
            s.destroyed = !0),
            null
        }
        static extendDefaults(e) {
            c(J, e)
        }
        static get extendedDefaults() {
            return J
        }
        static get defaults() {
            return K
        }
        static installModule(e) {
            ee.prototype.__modules__ || (ee.prototype.__modules__ = []);
            const t = ee.prototype.__modules__;
            "function" == typeof e && t.indexOf(e) < 0 && t.push(e)
        }
        static use(e) {
            return Array.isArray(e) ? (e.forEach((e=>ee.installModule(e))),
            ee) : (ee.installModule(e),
            ee)
        }
    }
    function te(e, t, s, i) {
        return e.params.createElements && Object.keys(i).forEach((a=>{
            if (!s[a] && !0 === s.auto) {
                let r = f(e.el, `.${i[a]}`)[0];
                r || (r = v("div", i[a]),
                r.className = i[a],
                e.el.append(r)),
                s[a] = r,
                t[a] = r
            }
        }
        )),
        s
    }
    function se(e) {
        return void 0 === e && (e = ""),
        `.${e.trim().replace(/([\.:!+\/])/g, "\\$1").replace(/ /g, ".")}`
    }
    function ie(e) {
        const t = this
          , {params: s, slidesEl: i} = t;
        s.loop && t.loopDestroy();
        const a = e=>{
            if ("string" == typeof e) {
                const t = document.createElement("div");
                t.innerHTML = e,
                i.append(t.children[0]),
                t.innerHTML = ""
            } else
                i.append(e)
        }
        ;
        if ("object" == typeof e && "length"in e)
            for (let t = 0; t < e.length; t += 1)
                e[t] && a(e[t]);
        else
            a(e);
        t.recalcSlides(),
        s.loop && t.loopCreate(),
        s.observer && !t.isElement || t.update()
    }
    function ae(e) {
        const t = this
          , {params: s, activeIndex: i, slidesEl: a} = t;
        s.loop && t.loopDestroy();
        let r = i + 1;
        const n = e=>{
            if ("string" == typeof e) {
                const t = document.createElement("div");
                t.innerHTML = e,
                a.prepend(t.children[0]),
                t.innerHTML = ""
            } else
                a.prepend(e)
        }
        ;
        if ("object" == typeof e && "length"in e) {
            for (let t = 0; t < e.length; t += 1)
                e[t] && n(e[t]);
            r = i + e.length
        } else
            n(e);
        t.recalcSlides(),
        s.loop && t.loopCreate(),
        s.observer && !t.isElement || t.update(),
        t.slideTo(r, 0, !1)
    }
    function re(e, t) {
        const s = this
          , {params: i, activeIndex: a, slidesEl: r} = s;
        let n = a;
        i.loop && (n -= s.loopedSlides,
        s.loopDestroy(),
        s.recalcSlides());
        const l = s.slides.length;
        if (e <= 0)
            return void s.prependSlide(t);
        if (e >= l)
            return void s.appendSlide(t);
        let o = n > e ? n + 1 : n;
        const d = [];
        for (let t = l - 1; t >= e; t -= 1) {
            const e = s.slides[t];
            e.remove(),
            d.unshift(e)
        }
        if ("object" == typeof t && "length"in t) {
            for (let e = 0; e < t.length; e += 1)
                t[e] && r.append(t[e]);
            o = n > e ? n + t.length : n
        } else
            r.append(t);
        for (let e = 0; e < d.length; e += 1)
            r.append(d[e]);
        s.recalcSlides(),
        i.loop && s.loopCreate(),
        i.observer && !s.isElement || s.update(),
        i.loop ? s.slideTo(o + s.loopedSlides, 0, !1) : s.slideTo(o, 0, !1)
    }
    function ne(e) {
        const t = this
          , {params: s, activeIndex: i} = t;
        let a = i;
        s.loop && (a -= t.loopedSlides,
        t.loopDestroy());
        let r, n = a;
        if ("object" == typeof e && "length"in e) {
            for (let s = 0; s < e.length; s += 1)
                r = e[s],
                t.slides[r] && t.slides[r].remove(),
                r < n && (n -= 1);
            n = Math.max(n, 0)
        } else
            r = e,
            t.slides[r] && t.slides[r].remove(),
            r < n && (n -= 1),
            n = Math.max(n, 0);
        t.recalcSlides(),
        s.loop && t.loopCreate(),
        s.observer && !t.isElement || t.update(),
        s.loop ? t.slideTo(n + t.loopedSlides, 0, !1) : t.slideTo(n, 0, !1)
    }
    function le() {
        const e = this
          , t = [];
        for (let s = 0; s < e.slides.length; s += 1)
            t.push(s);
        e.removeSlide(t)
    }
    function oe(e) {
        const {effect: t, swiper: s, on: i, setTranslate: a, setTransition: r, overwriteParams: n, perspective: l, recreateShadows: o, getEffectParams: d} = e;
        let p;
        i("beforeInit", (()=>{
            if (s.params.effect !== t)
                return;
            s.classNames.push(`${s.params.containerModifierClass}${t}`),
            l && l() && s.classNames.push(`${s.params.containerModifierClass}3d`);
            const e = n ? n() : {};
            Object.assign(s.params, e),
            Object.assign(s.originalParams, e)
        }
        )),
        i("setTranslate", (()=>{
            s.params.effect === t && a()
        }
        )),
        i("setTransition", ((e,i)=>{
            s.params.effect === t && r(i)
        }
        )),
        i("transitionEnd", (()=>{
            if (s.params.effect === t && o) {
                if (!d || !d().slideShadows)
                    return;
                s.slides.forEach((e=>{
                    e.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((e=>e.remove()))
                }
                )),
                o()
            }
        }
        )),
        i("virtualUpdate", (()=>{
            s.params.effect === t && (s.slides.length || (p = !0),
            requestAnimationFrame((()=>{
                p && s.slides && s.slides.length && (a(),
                p = !1)
            }
            )))
        }
        ))
    }
    function de(e, t) {
        const s = h(t);
        return s !== t && (s.style.backfaceVisibility = "hidden",
        s.style["-webkit-backface-visibility"] = "hidden"),
        s
    }
    function pe(e) {
        let {swiper: t, duration: s, transformElements: i, allSlides: a} = e;
        const {activeIndex: r} = t;
        if (t.params.virtualTranslate && 0 !== s) {
            let e, s = !1;
            e = a ? i : i.filter((e=>{
                const s = e.classList.contains("swiper-slide-transform") ? (e=>{
                    if (!e.parentElement)
                        return t.slides.filter((t=>t.shadowRoot && t.shadowRoot === e.parentNode))[0];
                    return e.parentElement
                }
                )(e) : e;
                return t.getSlideIndex(s) === r
            }
            )),
            e.forEach((e=>{
                E(e, (()=>{
                    if (s)
                        return;
                    if (!t || t.destroyed)
                        return;
                    s = !0,
                    t.animating = !1;
                    const e = new window.CustomEvent("transitionend",{
                        bubbles: !0,
                        cancelable: !0
                    });
                    t.wrapperEl.dispatchEvent(e)
                }
                ))
            }
            ))
        }
    }
    function ce(e, t, s) {
        const i = `swiper-slide-shadow ${s ? `-${s}` : ""}${e ? ` swiper-slide-shadow-${e}` : ""}`
          , a = h(t);
        let r = a.querySelector(`.${i.split(" ").join(".")}`);
        return r || (r = v("div", i.split(" ")),
        a.append(r)),
        r
    }
    Object.keys(Q).forEach((e=>{
        Object.keys(Q[e]).forEach((t=>{
            ee.prototype[t] = Q[e][t]
        }
        ))
    }
    )),
    ee.use([function(e) {
        let {swiper: t, on: s, emit: i} = e;
        const a = r();
        let n = null
          , l = null;
        const o = ()=>{
            t && !t.destroyed && t.initialized && (i("beforeResize"),
            i("resize"))
        }
          , d = ()=>{
            t && !t.destroyed && t.initialized && i("orientationchange")
        }
        ;
        s("init", (()=>{
            t.params.resizeObserver && void 0 !== a.ResizeObserver ? t && !t.destroyed && t.initialized && (n = new ResizeObserver((e=>{
                l = a.requestAnimationFrame((()=>{
                    const {width: s, height: i} = t;
                    let a = s
                      , r = i;
                    e.forEach((e=>{
                        let {contentBoxSize: s, contentRect: i, target: n} = e;
                        n && n !== t.el || (a = i ? i.width : (s[0] || s).inlineSize,
                        r = i ? i.height : (s[0] || s).blockSize)
                    }
                    )),
                    a === s && r === i || o()
                }
                ))
            }
            )),
            n.observe(t.el)) : (a.addEventListener("resize", o),
            a.addEventListener("orientationchange", d))
        }
        )),
        s("destroy", (()=>{
            l && a.cancelAnimationFrame(l),
            n && n.unobserve && t.el && (n.unobserve(t.el),
            n = null),
            a.removeEventListener("resize", o),
            a.removeEventListener("orientationchange", d)
        }
        ))
    }
    , function(e) {
        let {swiper: t, extendParams: s, on: i, emit: a} = e;
        const n = []
          , l = r()
          , o = function(e, s) {
            void 0 === s && (s = {});
            const i = new (l.MutationObserver || l.WebkitMutationObserver)((e=>{
                if (t.__preventObserver__)
                    return;
                if (1 === e.length)
                    return void a("observerUpdate", e[0]);
                const s = function() {
                    a("observerUpdate", e[0])
                };
                l.requestAnimationFrame ? l.requestAnimationFrame(s) : l.setTimeout(s, 0)
            }
            ));
            i.observe(e, {
                attributes: void 0 === s.attributes || s.attributes,
                childList: void 0 === s.childList || s.childList,
                characterData: void 0 === s.characterData || s.characterData
            }),
            n.push(i)
        };
        s({
            observer: !1,
            observeParents: !1,
            observeSlideChildren: !1
        }),
        i("init", (()=>{
            if (t.params.observer) {
                if (t.params.observeParents) {
                    const e = x(t.hostEl);
                    for (let t = 0; t < e.length; t += 1)
                        o(e[t])
                }
                o(t.hostEl, {
                    childList: t.params.observeSlideChildren
                }),
                o(t.wrapperEl, {
                    attributes: !1
                })
            }
        }
        )),
        i("destroy", (()=>{
            n.forEach((e=>{
                e.disconnect()
            }
            )),
            n.splice(0, n.length)
        }
        ))
    }
    ]);
    const ue = [function(e) {
        let t, {swiper: s, extendParams: a, on: r, emit: n} = e;
        a({
            virtual: {
                enabled: !1,
                slides: [],
                cache: !0,
                renderSlide: null,
                renderExternal: null,
                renderExternalUpdate: !0,
                addSlidesBefore: 0,
                addSlidesAfter: 0
            }
        });
        const l = i();
        s.virtual = {
            cache: {},
            from: void 0,
            to: void 0,
            slides: [],
            offset: 0,
            slidesGrid: []
        };
        const o = l.createElement("div");
        function d(e, t) {
            const i = s.params.virtual;
            if (i.cache && s.virtual.cache[t])
                return s.virtual.cache[t];
            let a;
            return i.renderSlide ? (a = i.renderSlide.call(s, e, t),
            "string" == typeof a && (o.innerHTML = a,
            a = o.children[0])) : a = s.isElement ? v("swiper-slide") : v("div", s.params.slideClass),
            a.setAttribute("data-swiper-slide-index", t),
            i.renderSlide || (a.innerHTML = e),
            i.cache && (s.virtual.cache[t] = a),
            a
        }
        function p(e) {
            const {slidesPerView: t, slidesPerGroup: i, centeredSlides: a, loop: r} = s.params
              , {addSlidesBefore: l, addSlidesAfter: o} = s.params.virtual
              , {from: p, to: c, slides: u, slidesGrid: m, offset: h} = s.virtual;
            s.params.cssMode || s.updateActiveIndex();
            const g = s.activeIndex || 0;
            let v, w, b;
            v = s.rtlTranslate ? "right" : s.isHorizontal() ? "left" : "top",
            a ? (w = Math.floor(t / 2) + i + o,
            b = Math.floor(t / 2) + i + l) : (w = t + (i - 1) + o,
            b = (r ? t : i) + l);
            let y = g - b
              , x = g + w;
            r || (y = Math.max(y, 0),
            x = Math.min(x, u.length - 1));
            let E = (s.slidesGrid[y] || 0) - (s.slidesGrid[0] || 0);
            function S() {
                s.updateSlides(),
                s.updateProgress(),
                s.updateSlidesClasses(),
                n("virtualUpdate")
            }
            if (r && g >= b ? (y -= b,
            a || (E += s.slidesGrid[0])) : r && g < b && (y = -b,
            a && (E += s.slidesGrid[0])),
            Object.assign(s.virtual, {
                from: y,
                to: x,
                offset: E,
                slidesGrid: s.slidesGrid,
                slidesBefore: b,
                slidesAfter: w
            }),
            p === y && c === x && !e)
                return s.slidesGrid !== m && E !== h && s.slides.forEach((e=>{
                    e.style[v] = E - Math.abs(s.cssOverflowAdjustment()) + "px"
                }
                )),
                s.updateProgress(),
                void n("virtualUpdate");
            if (s.params.virtual.renderExternal)
                return s.params.virtual.renderExternal.call(s, {
                    offset: E,
                    from: y,
                    to: x,
                    slides: function() {
                        const e = [];
                        for (let t = y; t <= x; t += 1)
                            e.push(u[t]);
                        return e
                    }()
                }),
                void (s.params.virtual.renderExternalUpdate ? S() : n("virtualUpdate"));
            const T = []
              , M = []
              , C = e=>{
                let t = e;
                return e < 0 ? t = u.length + e : t >= u.length && (t -= u.length),
                t
            }
            ;
            if (e)
                s.slides.filter((e=>e.matches(`.${s.params.slideClass}, swiper-slide`))).forEach((e=>{
                    e.remove()
                }
                ));
            else
                for (let e = p; e <= c; e += 1)
                    if (e < y || e > x) {
                        const t = C(e);
                        s.slides.filter((e=>e.matches(`.${s.params.slideClass}[data-swiper-slide-index="${t}"], swiper-slide[data-swiper-slide-index="${t}"]`))).forEach((e=>{
                            e.remove()
                        }
                        ))
                    }
            const P = r ? -u.length : 0
              , L = r ? 2 * u.length : u.length;
            for (let t = P; t < L; t += 1)
                if (t >= y && t <= x) {
                    const s = C(t);
                    void 0 === c || e ? M.push(s) : (t > c && M.push(s),
                    t < p && T.push(s))
                }
            if (M.forEach((e=>{
                s.slidesEl.append(d(u[e], e))
            }
            )),
            r)
                for (let e = T.length - 1; e >= 0; e -= 1) {
                    const t = T[e];
                    s.slidesEl.prepend(d(u[t], t))
                }
            else
                T.sort(((e,t)=>t - e)),
                T.forEach((e=>{
                    s.slidesEl.prepend(d(u[e], e))
                }
                ));
            f(s.slidesEl, ".swiper-slide, swiper-slide").forEach((e=>{
                e.style[v] = E - Math.abs(s.cssOverflowAdjustment()) + "px"
            }
            )),
            S()
        }
        r("beforeInit", (()=>{
            if (!s.params.virtual.enabled)
                return;
            let e;
            if (void 0 === s.passedParams.virtual.slides) {
                const t = [...s.slidesEl.children].filter((e=>e.matches(`.${s.params.slideClass}, swiper-slide`)));
                t && t.length && (s.virtual.slides = [...t],
                e = !0,
                t.forEach(((e,t)=>{
                    e.setAttribute("data-swiper-slide-index", t),
                    s.virtual.cache[t] = e,
                    e.remove()
                }
                )))
            }
            e || (s.virtual.slides = s.params.virtual.slides),
            s.classNames.push(`${s.params.containerModifierClass}virtual`),
            s.params.watchSlidesProgress = !0,
            s.originalParams.watchSlidesProgress = !0,
            p()
        }
        )),
        r("setTranslate", (()=>{
            s.params.virtual.enabled && (s.params.cssMode && !s._immediateVirtual ? (clearTimeout(t),
            t = setTimeout((()=>{
                p()
            }
            ), 100)) : p())
        }
        )),
        r("init update resize", (()=>{
            s.params.virtual.enabled && s.params.cssMode && u(s.wrapperEl, "--swiper-virtual-size", `${s.virtualSize}px`)
        }
        )),
        Object.assign(s.virtual, {
            appendSlide: function(e) {
                if ("object" == typeof e && "length"in e)
                    for (let t = 0; t < e.length; t += 1)
                        e[t] && s.virtual.slides.push(e[t]);
                else
                    s.virtual.slides.push(e);
                p(!0)
            },
            prependSlide: function(e) {
                const t = s.activeIndex;
                let i = t + 1
                  , a = 1;
                if (Array.isArray(e)) {
                    for (let t = 0; t < e.length; t += 1)
                        e[t] && s.virtual.slides.unshift(e[t]);
                    i = t + e.length,
                    a = e.length
                } else
                    s.virtual.slides.unshift(e);
                if (s.params.virtual.cache) {
                    const e = s.virtual.cache
                      , t = {};
                    Object.keys(e).forEach((s=>{
                        const i = e[s]
                          , r = i.getAttribute("data-swiper-slide-index");
                        r && i.setAttribute("data-swiper-slide-index", parseInt(r, 10) + a),
                        t[parseInt(s, 10) + a] = i
                    }
                    )),
                    s.virtual.cache = t
                }
                p(!0),
                s.slideTo(i, 0)
            },
            removeSlide: function(e) {
                if (null == e)
                    return;
                let t = s.activeIndex;
                if (Array.isArray(e))
                    for (let i = e.length - 1; i >= 0; i -= 1)
                        s.params.virtual.cache && (delete s.virtual.cache[e[i]],
                        Object.keys(s.virtual.cache).forEach((t=>{
                            t > e && (s.virtual.cache[t - 1] = s.virtual.cache[t],
                            s.virtual.cache[t - 1].setAttribute("data-swiper-slide-index", t - 1),
                            delete s.virtual.cache[t])
                        }
                        ))),
                        s.virtual.slides.splice(e[i], 1),
                        e[i] < t && (t -= 1),
                        t = Math.max(t, 0);
                else
                    s.params.virtual.cache && (delete s.virtual.cache[e],
                    Object.keys(s.virtual.cache).forEach((t=>{
                        t > e && (s.virtual.cache[t - 1] = s.virtual.cache[t],
                        s.virtual.cache[t - 1].setAttribute("data-swiper-slide-index", t - 1),
                        delete s.virtual.cache[t])
                    }
                    ))),
                    s.virtual.slides.splice(e, 1),
                    e < t && (t -= 1),
                    t = Math.max(t, 0);
                p(!0),
                s.slideTo(t, 0)
            },
            removeAllSlides: function() {
                s.virtual.slides = [],
                s.params.virtual.cache && (s.virtual.cache = {}),
                p(!0),
                s.slideTo(0, 0)
            },
            update: p
        })
    }
    , function(e) {
        let {swiper: t, extendParams: s, on: a, emit: n} = e;
        const l = i()
          , o = r();
        function d(e) {
            if (!t.enabled)
                return;
            const {rtlTranslate: s} = t;
            let i = e;
            i.originalEvent && (i = i.originalEvent);
            const a = i.keyCode || i.charCode
              , r = t.params.keyboard.pageUpDown
              , d = r && 33 === a
              , p = r && 34 === a
              , c = 37 === a
              , u = 39 === a
              , m = 38 === a
              , h = 40 === a;
            if (!t.allowSlideNext && (t.isHorizontal() && u || t.isVertical() && h || p))
                return !1;
            if (!t.allowSlidePrev && (t.isHorizontal() && c || t.isVertical() && m || d))
                return !1;
            if (!(i.shiftKey || i.altKey || i.ctrlKey || i.metaKey || l.activeElement && l.activeElement.nodeName && ("input" === l.activeElement.nodeName.toLowerCase() || "textarea" === l.activeElement.nodeName.toLowerCase()))) {
                if (t.params.keyboard.onlyInViewport && (d || p || c || u || m || h)) {
                    let e = !1;
                    if (x(t.el, `.${t.params.slideClass}, swiper-slide`).length > 0 && 0 === x(t.el, `.${t.params.slideActiveClass}`).length)
                        return;
                    const i = t.el
                      , a = i.clientWidth
                      , r = i.clientHeight
                      , n = o.innerWidth
                      , l = o.innerHeight
                      , d = w(i);
                    s && (d.left -= i.scrollLeft);
                    const p = [[d.left, d.top], [d.left + a, d.top], [d.left, d.top + r], [d.left + a, d.top + r]];
                    for (let t = 0; t < p.length; t += 1) {
                        const s = p[t];
                        if (s[0] >= 0 && s[0] <= n && s[1] >= 0 && s[1] <= l) {
                            if (0 === s[0] && 0 === s[1])
                                continue;
                            e = !0
                        }
                    }
                    if (!e)
                        return
                }
                t.isHorizontal() ? ((d || p || c || u) && (i.preventDefault ? i.preventDefault() : i.returnValue = !1),
                ((p || u) && !s || (d || c) && s) && t.slideNext(),
                ((d || c) && !s || (p || u) && s) && t.slidePrev()) : ((d || p || m || h) && (i.preventDefault ? i.preventDefault() : i.returnValue = !1),
                (p || h) && t.slideNext(),
                (d || m) && t.slidePrev()),
                n("keyPress", a)
            }
        }
        function p() {
            t.keyboard.enabled || (l.addEventListener("keydown", d),
            t.keyboard.enabled = !0)
        }
        function c() {
            t.keyboard.enabled && (l.removeEventListener("keydown", d),
            t.keyboard.enabled = !1)
        }
        t.keyboard = {
            enabled: !1
        },
        s({
            keyboard: {
                enabled: !1,
                onlyInViewport: !0,
                pageUpDown: !0
            }
        }),
        a("init", (()=>{
            t.params.keyboard.enabled && p()
        }
        )),
        a("destroy", (()=>{
            t.keyboard.enabled && c()
        }
        )),
        Object.assign(t.keyboard, {
            enable: p,
            disable: c
        })
    }
    , function(e) {
        let {swiper: t, extendParams: s, on: i, emit: a} = e;
        const n = r();
        let d;
        s({
            mousewheel: {
                enabled: !1,
                releaseOnEdges: !1,
                invert: !1,
                forceToAxis: !1,
                sensitivity: 1,
                eventsTarget: "layout",
                thresholdDelta: null,
                thresholdTime: null,
                noMousewheelClass: "swiper-no-mousewheel"
            }
        }),
        t.mousewheel = {
            enabled: !1
        };
        let p, c = o();
        const u = [];
        function m() {
            t.enabled && (t.mouseEntered = !0)
        }
        function h() {
            t.enabled && (t.mouseEntered = !1)
        }
        function f(e) {
            return !(t.params.mousewheel.thresholdDelta && e.delta < t.params.mousewheel.thresholdDelta) && (!(t.params.mousewheel.thresholdTime && o() - c < t.params.mousewheel.thresholdTime) && (e.delta >= 6 && o() - c < 60 || (e.direction < 0 ? t.isEnd && !t.params.loop || t.animating || (t.slideNext(),
            a("scroll", e.raw)) : t.isBeginning && !t.params.loop || t.animating || (t.slidePrev(),
            a("scroll", e.raw)),
            c = (new n.Date).getTime(),
            !1)))
        }
        function g(e) {
            let s = e
              , i = !0;
            if (!t.enabled)
                return;
            if (e.target.closest(`.${t.params.mousewheel.noMousewheelClass}`))
                return;
            const r = t.params.mousewheel;
            t.params.cssMode && s.preventDefault();
            let n = t.el;
            "layout" !== t.params.mousewheel.eventsTarget && (n = document.querySelector(t.params.mousewheel.eventsTarget));
            const c = n && n.contains(s.target);
            if (!t.mouseEntered && !c && !r.releaseOnEdges)
                return !0;
            s.originalEvent && (s = s.originalEvent);
            let m = 0;
            const h = t.rtlTranslate ? -1 : 1
              , g = function(e) {
                let t = 0
                  , s = 0
                  , i = 0
                  , a = 0;
                return "detail"in e && (s = e.detail),
                "wheelDelta"in e && (s = -e.wheelDelta / 120),
                "wheelDeltaY"in e && (s = -e.wheelDeltaY / 120),
                "wheelDeltaX"in e && (t = -e.wheelDeltaX / 120),
                "axis"in e && e.axis === e.HORIZONTAL_AXIS && (t = s,
                s = 0),
                i = 10 * t,
                a = 10 * s,
                "deltaY"in e && (a = e.deltaY),
                "deltaX"in e && (i = e.deltaX),
                e.shiftKey && !i && (i = a,
                a = 0),
                (i || a) && e.deltaMode && (1 === e.deltaMode ? (i *= 40,
                a *= 40) : (i *= 800,
                a *= 800)),
                i && !t && (t = i < 1 ? -1 : 1),
                a && !s && (s = a < 1 ? -1 : 1),
                {
                    spinX: t,
                    spinY: s,
                    pixelX: i,
                    pixelY: a
                }
            }(s);
            if (r.forceToAxis)
                if (t.isHorizontal()) {
                    if (!(Math.abs(g.pixelX) > Math.abs(g.pixelY)))
                        return !0;
                    m = -g.pixelX * h
                } else {
                    if (!(Math.abs(g.pixelY) > Math.abs(g.pixelX)))
                        return !0;
                    m = -g.pixelY
                }
            else
                m = Math.abs(g.pixelX) > Math.abs(g.pixelY) ? -g.pixelX * h : -g.pixelY;
            if (0 === m)
                return !0;
            r.invert && (m = -m);
            let v = t.getTranslate() + m * r.sensitivity;
            if (v >= t.minTranslate() && (v = t.minTranslate()),
            v <= t.maxTranslate() && (v = t.maxTranslate()),
            i = !!t.params.loop || !(v === t.minTranslate() || v === t.maxTranslate()),
            i && t.params.nested && s.stopPropagation(),
            t.params.freeMode && t.params.freeMode.enabled) {
                const e = {
                    time: o(),
                    delta: Math.abs(m),
                    direction: Math.sign(m)
                }
                  , i = p && e.time < p.time + 500 && e.delta <= p.delta && e.direction === p.direction;
                if (!i) {
                    p = void 0;
                    let n = t.getTranslate() + m * r.sensitivity;
                    const o = t.isBeginning
                      , c = t.isEnd;
                    if (n >= t.minTranslate() && (n = t.minTranslate()),
                    n <= t.maxTranslate() && (n = t.maxTranslate()),
                    t.setTransition(0),
                    t.setTranslate(n),
                    t.updateProgress(),
                    t.updateActiveIndex(),
                    t.updateSlidesClasses(),
                    (!o && t.isBeginning || !c && t.isEnd) && t.updateSlidesClasses(),
                    t.params.loop && t.loopFix({
                        direction: e.direction < 0 ? "next" : "prev",
                        byMousewheel: !0
                    }),
                    t.params.freeMode.sticky) {
                        clearTimeout(d),
                        d = void 0,
                        u.length >= 15 && u.shift();
                        const s = u.length ? u[u.length - 1] : void 0
                          , i = u[0];
                        if (u.push(e),
                        s && (e.delta > s.delta || e.direction !== s.direction))
                            u.splice(0);
                        else if (u.length >= 15 && e.time - i.time < 500 && i.delta - e.delta >= 1 && e.delta <= 6) {
                            const s = m > 0 ? .8 : .2;
                            p = e,
                            u.splice(0),
                            d = l((()=>{
                                t.slideToClosest(t.params.speed, !0, void 0, s)
                            }
                            ), 0)
                        }
                        d || (d = l((()=>{
                            p = e,
                            u.splice(0),
                            t.slideToClosest(t.params.speed, !0, void 0, .5)
                        }
                        ), 500))
                    }
                    if (i || a("scroll", s),
                    t.params.autoplay && t.params.autoplayDisableOnInteraction && t.autoplay.stop(),
                    r.releaseOnEdges && (n === t.minTranslate() || n === t.maxTranslate()))
                        return !0
                }
            } else {
                const s = {
                    time: o(),
                    delta: Math.abs(m),
                    direction: Math.sign(m),
                    raw: e
                };
                u.length >= 2 && u.shift();
                const i = u.length ? u[u.length - 1] : void 0;
                if (u.push(s),
                i ? (s.direction !== i.direction || s.delta > i.delta || s.time > i.time + 150) && f(s) : f(s),
                function(e) {
                    const s = t.params.mousewheel;
                    if (e.direction < 0) {
                        if (t.isEnd && !t.params.loop && s.releaseOnEdges)
                            return !0
                    } else if (t.isBeginning && !t.params.loop && s.releaseOnEdges)
                        return !0;
                    return !1
                }(s))
                    return !0
            }
            return s.preventDefault ? s.preventDefault() : s.returnValue = !1,
            !1
        }
        function v(e) {
            let s = t.el;
            "layout" !== t.params.mousewheel.eventsTarget && (s = document.querySelector(t.params.mousewheel.eventsTarget)),
            s[e]("mouseenter", m),
            s[e]("mouseleave", h),
            s[e]("wheel", g)
        }
        function w() {
            return t.params.cssMode ? (t.wrapperEl.removeEventListener("wheel", g),
            !0) : !t.mousewheel.enabled && (v("addEventListener"),
            t.mousewheel.enabled = !0,
            !0)
        }
        function b() {
            return t.params.cssMode ? (t.wrapperEl.addEventListener(event, g),
            !0) : !!t.mousewheel.enabled && (v("removeEventListener"),
            t.mousewheel.enabled = !1,
            !0)
        }
        i("init", (()=>{
            !t.params.mousewheel.enabled && t.params.cssMode && b(),
            t.params.mousewheel.enabled && w()
        }
        )),
        i("destroy", (()=>{
            t.params.cssMode && w(),
            t.mousewheel.enabled && b()
        }
        )),
        Object.assign(t.mousewheel, {
            enable: w,
            disable: b
        })
    }
    , function(e) {
        let {swiper: t, extendParams: s, on: i, emit: a} = e;
        s({
            navigation: {
                nextEl: null,
                prevEl: null,
                hideOnClick: !1,
                disabledClass: "swiper-button-disabled",
                hiddenClass: "swiper-button-hidden",
                lockClass: "swiper-button-lock",
                navigationDisabledClass: "swiper-navigation-disabled"
            }
        }),
        t.navigation = {
            nextEl: null,
            prevEl: null
        };
        const r = e=>(Array.isArray(e) ? e : [e]).filter((e=>!!e));
        function n(e) {
            let s;
            return e && "string" == typeof e && t.isElement && (s = t.el.querySelector(e),
            s) ? s : (e && ("string" == typeof e && (s = [...document.querySelectorAll(e)]),
            t.params.uniqueNavElements && "string" == typeof e && s.length > 1 && 1 === t.el.querySelectorAll(e).length && (s = t.el.querySelector(e))),
            e && !s ? e : s)
        }
        function l(e, s) {
            const i = t.params.navigation;
            (e = r(e)).forEach((e=>{
                e && (e.classList[s ? "add" : "remove"](...i.disabledClass.split(" ")),
                "BUTTON" === e.tagName && (e.disabled = s),
                t.params.watchOverflow && t.enabled && e.classList[t.isLocked ? "add" : "remove"](i.lockClass))
            }
            ))
        }
        function o() {
            const {nextEl: e, prevEl: s} = t.navigation;
            if (t.params.loop)
                return l(s, !1),
                void l(e, !1);
            l(s, t.isBeginning && !t.params.rewind),
            l(e, t.isEnd && !t.params.rewind)
        }
        function d(e) {
            e.preventDefault(),
            (!t.isBeginning || t.params.loop || t.params.rewind) && (t.slidePrev(),
            a("navigationPrev"))
        }
        function p(e) {
            e.preventDefault(),
            (!t.isEnd || t.params.loop || t.params.rewind) && (t.slideNext(),
            a("navigationNext"))
        }
        function c() {
            const e = t.params.navigation;
            if (t.params.navigation = te(t, t.originalParams.navigation, t.params.navigation, {
                nextEl: "swiper-button-next",
                prevEl: "swiper-button-prev"
            }),
            !e.nextEl && !e.prevEl)
                return;
            let s = n(e.nextEl)
              , i = n(e.prevEl);
            Object.assign(t.navigation, {
                nextEl: s,
                prevEl: i
            }),
            s = r(s),
            i = r(i);
            const a = (s,i)=>{
                s && s.addEventListener("click", "next" === i ? p : d),
                !t.enabled && s && s.classList.add(...e.lockClass.split(" "))
            }
            ;
            s.forEach((e=>a(e, "next"))),
            i.forEach((e=>a(e, "prev")))
        }
        function u() {
            let {nextEl: e, prevEl: s} = t.navigation;
            e = r(e),
            s = r(s);
            const i = (e,s)=>{
                e.removeEventListener("click", "next" === s ? p : d),
                e.classList.remove(...t.params.navigation.disabledClass.split(" "))
            }
            ;
            e.forEach((e=>i(e, "next"))),
            s.forEach((e=>i(e, "prev")))
        }
        i("init", (()=>{
            !1 === t.params.navigation.enabled ? m() : (c(),
            o())
        }
        )),
        i("toEdge fromEdge lock unlock", (()=>{
            o()
        }
        )),
        i("destroy", (()=>{
            u()
        }
        )),
        i("enable disable", (()=>{
            let {nextEl: e, prevEl: s} = t.navigation;
            e = r(e),
            s = r(s),
            t.enabled ? o() : [...e, ...s].filter((e=>!!e)).forEach((e=>e.classList.add(t.params.navigation.lockClass)))
        }
        )),
        i("click", ((e,s)=>{
            let {nextEl: i, prevEl: n} = t.navigation;
            i = r(i),
            n = r(n);
            const l = s.target;
            if (t.params.navigation.hideOnClick && !n.includes(l) && !i.includes(l)) {
                if (t.pagination && t.params.pagination && t.params.pagination.clickable && (t.pagination.el === l || t.pagination.el.contains(l)))
                    return;
                let e;
                i.length ? e = i[0].classList.contains(t.params.navigation.hiddenClass) : n.length && (e = n[0].classList.contains(t.params.navigation.hiddenClass)),
                a(!0 === e ? "navigationShow" : "navigationHide"),
                [...i, ...n].filter((e=>!!e)).forEach((e=>e.classList.toggle(t.params.navigation.hiddenClass)))
            }
        }
        ));
        const m = ()=>{
            t.el.classList.add(...t.params.navigation.navigationDisabledClass.split(" ")),
            u()
        }
        ;
        Object.assign(t.navigation, {
            enable: ()=>{
                t.el.classList.remove(...t.params.navigation.navigationDisabledClass.split(" ")),
                c(),
                o()
            }
            ,
            disable: m,
            update: o,
            init: c,
            destroy: u
        })
    }
    , function(e) {
        let {swiper: t, extendParams: s, on: i, emit: a} = e;
        const r = "swiper-pagination";
        let n;
        s({
            pagination: {
                el: null,
                bulletElement: "span",
                clickable: !1,
                hideOnClick: !1,
                renderBullet: null,
                renderProgressbar: null,
                renderFraction: null,
                renderCustom: null,
                progressbarOpposite: !1,
                type: "bullets",
                dynamicBullets: !1,
                dynamicMainBullets: 1,
                formatFractionCurrent: e=>e,
                formatFractionTotal: e=>e,
                bulletClass: `${r}-bullet`,
                bulletActiveClass: `${r}-bullet-active`,
                modifierClass: `${r}-`,
                currentClass: `${r}-current`,
                totalClass: `${r}-total`,
                hiddenClass: `${r}-hidden`,
                progressbarFillClass: `${r}-progressbar-fill`,
                progressbarOppositeClass: `${r}-progressbar-opposite`,
                clickableClass: `${r}-clickable`,
                lockClass: `${r}-lock`,
                horizontalClass: `${r}-horizontal`,
                verticalClass: `${r}-vertical`,
                paginationDisabledClass: `${r}-disabled`
            }
        }),
        t.pagination = {
            el: null,
            bullets: []
        };
        let l = 0;
        const o = e=>(Array.isArray(e) ? e : [e]).filter((e=>!!e));
        function d() {
            return !t.params.pagination.el || !t.pagination.el || Array.isArray(t.pagination.el) && 0 === t.pagination.el.length
        }
        function p(e, s) {
            const {bulletActiveClass: i} = t.params.pagination;
            e && (e = e[("prev" === s ? "previous" : "next") + "ElementSibling"]) && (e.classList.add(`${i}-${s}`),
            (e = e[("prev" === s ? "previous" : "next") + "ElementSibling"]) && e.classList.add(`${i}-${s}-${s}`))
        }
        function c(e) {
            const s = e.target.closest(se(t.params.pagination.bulletClass));
            if (!s)
                return;
            e.preventDefault();
            const i = y(s) * t.params.slidesPerGroup;
            if (t.params.loop) {
                if (t.realIndex === i)
                    return;
                t.slideToLoop(i)
            } else
                t.slideTo(i)
        }
        function u() {
            const e = t.rtl
              , s = t.params.pagination;
            if (d())
                return;
            let i, r, c = t.pagination.el;
            c = o(c);
            const u = t.virtual && t.params.virtual.enabled ? t.virtual.slides.length : t.slides.length
              , m = t.params.loop ? Math.ceil(u / t.params.slidesPerGroup) : t.snapGrid.length;
            if (t.params.loop ? (r = t.previousRealIndex || 0,
            i = t.params.slidesPerGroup > 1 ? Math.floor(t.realIndex / t.params.slidesPerGroup) : t.realIndex) : void 0 !== t.snapIndex ? (i = t.snapIndex,
            r = t.previousSnapIndex) : (r = t.previousIndex || 0,
            i = t.activeIndex || 0),
            "bullets" === s.type && t.pagination.bullets && t.pagination.bullets.length > 0) {
                const a = t.pagination.bullets;
                let o, d, u;
                if (s.dynamicBullets && (n = S(a[0], t.isHorizontal() ? "width" : "height", !0),
                c.forEach((e=>{
                    e.style[t.isHorizontal() ? "width" : "height"] = n * (s.dynamicMainBullets + 4) + "px"
                }
                )),
                s.dynamicMainBullets > 1 && void 0 !== r && (l += i - (r || 0),
                l > s.dynamicMainBullets - 1 ? l = s.dynamicMainBullets - 1 : l < 0 && (l = 0)),
                o = Math.max(i - l, 0),
                d = o + (Math.min(a.length, s.dynamicMainBullets) - 1),
                u = (d + o) / 2),
                a.forEach((e=>{
                    const t = [...["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map((e=>`${s.bulletActiveClass}${e}`))].map((e=>"string" == typeof e && e.includes(" ") ? e.split(" ") : e)).flat();
                    e.classList.remove(...t)
                }
                )),
                c.length > 1)
                    a.forEach((e=>{
                        const a = y(e);
                        a === i ? e.classList.add(...s.bulletActiveClass.split(" ")) : t.isElement && e.setAttribute("part", "bullet"),
                        s.dynamicBullets && (a >= o && a <= d && e.classList.add(...`${s.bulletActiveClass}-main`.split(" ")),
                        a === o && p(e, "prev"),
                        a === d && p(e, "next"))
                    }
                    ));
                else {
                    const e = a[i];
                    if (e && e.classList.add(...s.bulletActiveClass.split(" ")),
                    t.isElement && a.forEach(((e,t)=>{
                        e.setAttribute("part", t === i ? "bullet-active" : "bullet")
                    }
                    )),
                    s.dynamicBullets) {
                        const e = a[o]
                          , t = a[d];
                        for (let e = o; e <= d; e += 1)
                            a[e] && a[e].classList.add(...`${s.bulletActiveClass}-main`.split(" "));
                        p(e, "prev"),
                        p(t, "next")
                    }
                }
                if (s.dynamicBullets) {
                    const i = Math.min(a.length, s.dynamicMainBullets + 4)
                      , r = (n * i - n) / 2 - u * n
                      , l = e ? "right" : "left";
                    a.forEach((e=>{
                        e.style[t.isHorizontal() ? l : "top"] = `${r}px`
                    }
                    ))
                }
            }
            c.forEach(((e,r)=>{
                if ("fraction" === s.type && (e.querySelectorAll(se(s.currentClass)).forEach((e=>{
                    e.textContent = s.formatFractionCurrent(i + 1)
                }
                )),
                e.querySelectorAll(se(s.totalClass)).forEach((e=>{
                    e.textContent = s.formatFractionTotal(m)
                }
                ))),
                "progressbar" === s.type) {
                    let a;
                    a = s.progressbarOpposite ? t.isHorizontal() ? "vertical" : "horizontal" : t.isHorizontal() ? "horizontal" : "vertical";
                    const r = (i + 1) / m;
                    let n = 1
                      , l = 1;
                    "horizontal" === a ? n = r : l = r,
                    e.querySelectorAll(se(s.progressbarFillClass)).forEach((e=>{
                        e.style.transform = `translate3d(0,0,0) scaleX(${n}) scaleY(${l})`,
                        e.style.transitionDuration = `${t.params.speed}ms`
                    }
                    ))
                }
                "custom" === s.type && s.renderCustom ? (e.innerHTML = s.renderCustom(t, i + 1, m),
                0 === r && a("paginationRender", e)) : (0 === r && a("paginationRender", e),
                a("paginationUpdate", e)),
                t.params.watchOverflow && t.enabled && e.classList[t.isLocked ? "add" : "remove"](s.lockClass)
            }
            ))
        }
        function m() {
            const e = t.params.pagination;
            if (d())
                return;
            const s = t.virtual && t.params.virtual.enabled ? t.virtual.slides.length : t.grid && t.params.grid.rows > 1 ? t.slides.length / Math.ceil(t.params.grid.rows) : t.slides.length;
            let i = t.pagination.el;
            i = o(i);
            let r = "";
            if ("bullets" === e.type) {
                let i = t.params.loop ? Math.ceil(s / t.params.slidesPerGroup) : t.snapGrid.length;
                t.params.freeMode && t.params.freeMode.enabled && i > s && (i = s);
                for (let s = 0; s < i; s += 1)
                    e.renderBullet ? r += e.renderBullet.call(t, s, e.bulletClass) : r += `<${e.bulletElement} ${t.isElement ? 'part="bullet"' : ""} class="${e.bulletClass}"></${e.bulletElement}>`
            }
            "fraction" === e.type && (r = e.renderFraction ? e.renderFraction.call(t, e.currentClass, e.totalClass) : `<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`),
            "progressbar" === e.type && (r = e.renderProgressbar ? e.renderProgressbar.call(t, e.progressbarFillClass) : `<span class="${e.progressbarFillClass}"></span>`),
            t.pagination.bullets = [],
            i.forEach((s=>{
                "custom" !== e.type && (s.innerHTML = r || ""),
                "bullets" === e.type && t.pagination.bullets.push(...s.querySelectorAll(se(e.bulletClass)))
            }
            )),
            "custom" !== e.type && a("paginationRender", i[0])
        }
        function h() {
            t.params.pagination = te(t, t.originalParams.pagination, t.params.pagination, {
                el: "swiper-pagination"
            });
            const e = t.params.pagination;
            if (!e.el)
                return;
            let s;
            "string" == typeof e.el && t.isElement && (s = t.el.querySelector(e.el)),
            s || "string" != typeof e.el || (s = [...document.querySelectorAll(e.el)]),
            s || (s = e.el),
            s && 0 !== s.length && (t.params.uniqueNavElements && "string" == typeof e.el && Array.isArray(s) && s.length > 1 && (s = [...t.el.querySelectorAll(e.el)],
            s.length > 1 && (s = s.filter((e=>x(e, ".swiper")[0] === t.el))[0])),
            Array.isArray(s) && 1 === s.length && (s = s[0]),
            Object.assign(t.pagination, {
                el: s
            }),
            s = o(s),
            s.forEach((s=>{
                "bullets" === e.type && e.clickable && s.classList.add(...(e.clickableClass || "").split(" ")),
                s.classList.add(e.modifierClass + e.type),
                s.classList.add(t.isHorizontal() ? e.horizontalClass : e.verticalClass),
                "bullets" === e.type && e.dynamicBullets && (s.classList.add(`${e.modifierClass}${e.type}-dynamic`),
                l = 0,
                e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)),
                "progressbar" === e.type && e.progressbarOpposite && s.classList.add(e.progressbarOppositeClass),
                e.clickable && s.addEventListener("click", c),
                t.enabled || s.classList.add(e.lockClass)
            }
            )))
        }
        function f() {
            const e = t.params.pagination;
            if (d())
                return;
            let s = t.pagination.el;
            s && (s = o(s),
            s.forEach((s=>{
                s.classList.remove(e.hiddenClass),
                s.classList.remove(e.modifierClass + e.type),
                s.classList.remove(t.isHorizontal() ? e.horizontalClass : e.verticalClass),
                e.clickable && (s.classList.remove(...(e.clickableClass || "").split(" ")),
                s.removeEventListener("click", c))
            }
            ))),
            t.pagination.bullets && t.pagination.bullets.forEach((t=>t.classList.remove(...e.bulletActiveClass.split(" "))))
        }
        i("changeDirection", (()=>{
            if (!t.pagination || !t.pagination.el)
                return;
            const e = t.params.pagination;
            let {el: s} = t.pagination;
            s = o(s),
            s.forEach((s=>{
                s.classList.remove(e.horizontalClass, e.verticalClass),
                s.classList.add(t.isHorizontal() ? e.horizontalClass : e.verticalClass)
            }
            ))
        }
        )),
        i("init", (()=>{
            !1 === t.params.pagination.enabled ? g() : (h(),
            m(),
            u())
        }
        )),
        i("activeIndexChange", (()=>{
            void 0 === t.snapIndex && u()
        }
        )),
        i("snapIndexChange", (()=>{
            u()
        }
        )),
        i("snapGridLengthChange", (()=>{
            m(),
            u()
        }
        )),
        i("destroy", (()=>{
            f()
        }
        )),
        i("enable disable", (()=>{
            let {el: e} = t.pagination;
            e && (e = o(e),
            e.forEach((e=>e.classList[t.enabled ? "remove" : "add"](t.params.pagination.lockClass))))
        }
        )),
        i("lock unlock", (()=>{
            u()
        }
        )),
        i("click", ((e,s)=>{
            const i = s.target
              , r = o(t.pagination.el);
            if (t.params.pagination.el && t.params.pagination.hideOnClick && r && r.length > 0 && !i.classList.contains(t.params.pagination.bulletClass)) {
                if (t.navigation && (t.navigation.nextEl && i === t.navigation.nextEl || t.navigation.prevEl && i === t.navigation.prevEl))
                    return;
                const e = r[0].classList.contains(t.params.pagination.hiddenClass);
                a(!0 === e ? "paginationShow" : "paginationHide"),
                r.forEach((e=>e.classList.toggle(t.params.pagination.hiddenClass)))
            }
        }
        ));
        const g = ()=>{
            t.el.classList.add(t.params.pagination.paginationDisabledClass);
            let {el: e} = t.pagination;
            e && (e = o(e),
            e.forEach((e=>e.classList.add(t.params.pagination.paginationDisabledClass)))),
            f()
        }
        ;
        Object.assign(t.pagination, {
            enable: ()=>{
                t.el.classList.remove(t.params.pagination.paginationDisabledClass);
                let {el: e} = t.pagination;
                e && (e = o(e),
                e.forEach((e=>e.classList.remove(t.params.pagination.paginationDisabledClass)))),
                h(),
                m(),
                u()
            }
            ,
            disable: g,
            render: m,
            update: u,
            init: h,
            destroy: f
        })
    }
    , function(e) {
        let {swiper: t, extendParams: s, on: a, emit: r} = e;
        const o = i();
        let d, p, c, u, m = !1, h = null, f = null;
        function g() {
            if (!t.params.scrollbar.el || !t.scrollbar.el)
                return;
            const {scrollbar: e, rtlTranslate: s} = t
              , {dragEl: i, el: a} = e
              , r = t.params.scrollbar
              , n = t.params.loop ? t.progressLoop : t.progress;
            let l = p
              , o = (c - p) * n;
            s ? (o = -o,
            o > 0 ? (l = p - o,
            o = 0) : -o + p > c && (l = c + o)) : o < 0 ? (l = p + o,
            o = 0) : o + p > c && (l = c - o),
            t.isHorizontal() ? (i.style.transform = `translate3d(${o}px, 0, 0)`,
            i.style.width = `${l}px`) : (i.style.transform = `translate3d(0px, ${o}px, 0)`,
            i.style.height = `${l}px`),
            r.hide && (clearTimeout(h),
            a.style.opacity = 1,
            h = setTimeout((()=>{
                a.style.opacity = 0,
                a.style.transitionDuration = "400ms"
            }
            ), 1e3))
        }
        function b() {
            if (!t.params.scrollbar.el || !t.scrollbar.el)
                return;
            const {scrollbar: e} = t
              , {dragEl: s, el: i} = e;
            s.style.width = "",
            s.style.height = "",
            c = t.isHorizontal() ? i.offsetWidth : i.offsetHeight,
            u = t.size / (t.virtualSize + t.params.slidesOffsetBefore - (t.params.centeredSlides ? t.snapGrid[0] : 0)),
            p = "auto" === t.params.scrollbar.dragSize ? c * u : parseInt(t.params.scrollbar.dragSize, 10),
            t.isHorizontal() ? s.style.width = `${p}px` : s.style.height = `${p}px`,
            i.style.display = u >= 1 ? "none" : "",
            t.params.scrollbar.hide && (i.style.opacity = 0),
            t.params.watchOverflow && t.enabled && e.el.classList[t.isLocked ? "add" : "remove"](t.params.scrollbar.lockClass)
        }
        function y(e) {
            return t.isHorizontal() ? e.clientX : e.clientY
        }
        function x(e) {
            const {scrollbar: s, rtlTranslate: i} = t
              , {el: a} = s;
            let r;
            r = (y(e) - w(a)[t.isHorizontal() ? "left" : "top"] - (null !== d ? d : p / 2)) / (c - p),
            r = Math.max(Math.min(r, 1), 0),
            i && (r = 1 - r);
            const n = t.minTranslate() + (t.maxTranslate() - t.minTranslate()) * r;
            t.updateProgress(n),
            t.setTranslate(n),
            t.updateActiveIndex(),
            t.updateSlidesClasses()
        }
        function E(e) {
            const s = t.params.scrollbar
              , {scrollbar: i, wrapperEl: a} = t
              , {el: n, dragEl: l} = i;
            m = !0,
            d = e.target === l ? y(e) - e.target.getBoundingClientRect()[t.isHorizontal() ? "left" : "top"] : null,
            e.preventDefault(),
            e.stopPropagation(),
            a.style.transitionDuration = "100ms",
            l.style.transitionDuration = "100ms",
            x(e),
            clearTimeout(f),
            n.style.transitionDuration = "0ms",
            s.hide && (n.style.opacity = 1),
            t.params.cssMode && (t.wrapperEl.style["scroll-snap-type"] = "none"),
            r("scrollbarDragStart", e)
        }
        function S(e) {
            const {scrollbar: s, wrapperEl: i} = t
              , {el: a, dragEl: n} = s;
            m && (e.preventDefault ? e.preventDefault() : e.returnValue = !1,
            x(e),
            i.style.transitionDuration = "0ms",
            a.style.transitionDuration = "0ms",
            n.style.transitionDuration = "0ms",
            r("scrollbarDragMove", e))
        }
        function T(e) {
            const s = t.params.scrollbar
              , {scrollbar: i, wrapperEl: a} = t
              , {el: n} = i;
            m && (m = !1,
            t.params.cssMode && (t.wrapperEl.style["scroll-snap-type"] = "",
            a.style.transitionDuration = ""),
            s.hide && (clearTimeout(f),
            f = l((()=>{
                n.style.opacity = 0,
                n.style.transitionDuration = "400ms"
            }
            ), 1e3)),
            r("scrollbarDragEnd", e),
            s.snapOnRelease && t.slideToClosest())
        }
        function M(e) {
            const {scrollbar: s, params: i} = t
              , a = s.el;
            if (!a)
                return;
            const r = a
              , n = !!i.passiveListeners && {
                passive: !1,
                capture: !1
            }
              , l = !!i.passiveListeners && {
                passive: !0,
                capture: !1
            };
            if (!r)
                return;
            const d = "on" === e ? "addEventListener" : "removeEventListener";
            r[d]("pointerdown", E, n),
            o[d]("pointermove", S, n),
            o[d]("pointerup", T, l)
        }
        function C() {
            const {scrollbar: e, el: s} = t;
            t.params.scrollbar = te(t, t.originalParams.scrollbar, t.params.scrollbar, {
                el: "swiper-scrollbar"
            });
            const i = t.params.scrollbar;
            if (!i.el)
                return;
            let a, r;
            if ("string" == typeof i.el && t.isElement && (a = t.el.querySelector(i.el)),
            a || "string" != typeof i.el)
                a || (a = i.el);
            else if (a = o.querySelectorAll(i.el),
            !a.length)
                return;
            t.params.uniqueNavElements && "string" == typeof i.el && a.length > 1 && 1 === s.querySelectorAll(i.el).length && (a = s.querySelector(i.el)),
            a.length > 0 && (a = a[0]),
            a.classList.add(t.isHorizontal() ? i.horizontalClass : i.verticalClass),
            a && (r = a.querySelector(se(t.params.scrollbar.dragClass)),
            r || (r = v("div", t.params.scrollbar.dragClass),
            a.append(r))),
            Object.assign(e, {
                el: a,
                dragEl: r
            }),
            i.draggable && t.params.scrollbar.el && t.scrollbar.el && M("on"),
            a && a.classList[t.enabled ? "remove" : "add"](...n(t.params.scrollbar.lockClass))
        }
        function P() {
            const e = t.params.scrollbar
              , s = t.scrollbar.el;
            s && s.classList.remove(...n(t.isHorizontal() ? e.horizontalClass : e.verticalClass)),
            t.params.scrollbar.el && t.scrollbar.el && M("off")
        }
        s({
            scrollbar: {
                el: null,
                dragSize: "auto",
                hide: !1,
                draggable: !1,
                snapOnRelease: !0,
                lockClass: "swiper-scrollbar-lock",
                dragClass: "swiper-scrollbar-drag",
                scrollbarDisabledClass: "swiper-scrollbar-disabled",
                horizontalClass: "swiper-scrollbar-horizontal",
                verticalClass: "swiper-scrollbar-vertical"
            }
        }),
        t.scrollbar = {
            el: null,
            dragEl: null
        },
        a("init", (()=>{
            !1 === t.params.scrollbar.enabled ? L() : (C(),
            b(),
            g())
        }
        )),
        a("update resize observerUpdate lock unlock", (()=>{
            b()
        }
        )),
        a("setTranslate", (()=>{
            g()
        }
        )),
        a("setTransition", ((e,s)=>{
            !function(e) {
                t.params.scrollbar.el && t.scrollbar.el && (t.scrollbar.dragEl.style.transitionDuration = `${e}ms`)
            }(s)
        }
        )),
        a("enable disable", (()=>{
            const {el: e} = t.scrollbar;
            e && e.classList[t.enabled ? "remove" : "add"](...n(t.params.scrollbar.lockClass))
        }
        )),
        a("destroy", (()=>{
            P()
        }
        ));
        const L = ()=>{
            t.el.classList.add(...n(t.params.scrollbar.scrollbarDisabledClass)),
            t.scrollbar.el && t.scrollbar.el.classList.add(...n(t.params.scrollbar.scrollbarDisabledClass)),
            P()
        }
        ;
        Object.assign(t.scrollbar, {
            enable: ()=>{
                t.el.classList.remove(...n(t.params.scrollbar.scrollbarDisabledClass)),
                t.scrollbar.el && t.scrollbar.el.classList.remove(...n(t.params.scrollbar.scrollbarDisabledClass)),
                C(),
                b(),
                g()
            }
            ,
            disable: L,
            updateSize: b,
            setTranslate: g,
            init: C,
            destroy: P
        })
    }
    , function(e) {
        let {swiper: t, extendParams: s, on: i} = e;
        s({
            parallax: {
                enabled: !1
            }
        });
        const a = "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"
          , r = (e,s)=>{
            const {rtl: i} = t
              , a = i ? -1 : 1
              , r = e.getAttribute("data-swiper-parallax") || "0";
            let n = e.getAttribute("data-swiper-parallax-x")
              , l = e.getAttribute("data-swiper-parallax-y");
            const o = e.getAttribute("data-swiper-parallax-scale")
              , d = e.getAttribute("data-swiper-parallax-opacity")
              , p = e.getAttribute("data-swiper-parallax-rotate");
            if (n || l ? (n = n || "0",
            l = l || "0") : t.isHorizontal() ? (n = r,
            l = "0") : (l = r,
            n = "0"),
            n = n.indexOf("%") >= 0 ? parseInt(n, 10) * s * a + "%" : n * s * a + "px",
            l = l.indexOf("%") >= 0 ? parseInt(l, 10) * s + "%" : l * s + "px",
            null != d) {
                const t = d - (d - 1) * (1 - Math.abs(s));
                e.style.opacity = t
            }
            let c = `translate3d(${n}, ${l}, 0px)`;
            if (null != o) {
                c += ` scale(${o - (o - 1) * (1 - Math.abs(s))})`
            }
            if (p && null != p) {
                c += ` rotate(${p * s * -1}deg)`
            }
            e.style.transform = c
        }
          , n = ()=>{
            const {el: e, slides: s, progress: i, snapGrid: n, isElement: l} = t
              , o = f(e, a);
            t.isElement && o.push(...f(t.hostEl, a)),
            o.forEach((e=>{
                r(e, i)
            }
            )),
            s.forEach(((e,s)=>{
                let l = e.progress;
                t.params.slidesPerGroup > 1 && "auto" !== t.params.slidesPerView && (l += Math.ceil(s / 2) - i * (n.length - 1)),
                l = Math.min(Math.max(l, -1), 1),
                e.querySelectorAll(`${a}, [data-swiper-parallax-rotate]`).forEach((e=>{
                    r(e, l)
                }
                ))
            }
            ))
        }
        ;
        i("beforeInit", (()=>{
            t.params.parallax.enabled && (t.params.watchSlidesProgress = !0,
            t.originalParams.watchSlidesProgress = !0)
        }
        )),
        i("init", (()=>{
            t.params.parallax.enabled && n()
        }
        )),
        i("setTranslate", (()=>{
            t.params.parallax.enabled && n()
        }
        )),
        i("setTransition", ((e,s)=>{
            t.params.parallax.enabled && function(e) {
                void 0 === e && (e = t.params.speed);
                const {el: s, hostEl: i} = t
                  , r = [...s.querySelectorAll(a)];
                t.isElement && r.push(...i.querySelectorAll(a)),
                r.forEach((t=>{
                    let s = parseInt(t.getAttribute("data-swiper-parallax-duration"), 10) || e;
                    0 === e && (s = 0),
                    t.style.transitionDuration = `${s}ms`
                }
                ))
            }(s)
        }
        ))
    }
    , function(e) {
        let {swiper: t, extendParams: s, on: i, emit: a} = e;
        const n = r();
        s({
            zoom: {
                enabled: !1,
                maxRatio: 3,
                minRatio: 1,
                toggle: !0,
                containerClass: "swiper-zoom-container",
                zoomedSlideClass: "swiper-slide-zoomed"
            }
        }),
        t.zoom = {
            enabled: !1
        };
        let l, o, p = 1, c = !1;
        const u = []
          , m = {
            originX: 0,
            originY: 0,
            slideEl: void 0,
            slideWidth: void 0,
            slideHeight: void 0,
            imageEl: void 0,
            imageWrapEl: void 0,
            maxRatio: 3
        }
          , h = {
            isTouched: void 0,
            isMoved: void 0,
            currentX: void 0,
            currentY: void 0,
            minX: void 0,
            minY: void 0,
            maxX: void 0,
            maxY: void 0,
            width: void 0,
            height: void 0,
            startX: void 0,
            startY: void 0,
            touchesStart: {},
            touchesCurrent: {}
        }
          , g = {
            x: void 0,
            y: void 0,
            prevPositionX: void 0,
            prevPositionY: void 0,
            prevTime: void 0
        };
        let v = 1;
        function b() {
            if (u.length < 2)
                return 1;
            const e = u[0].pageX
              , t = u[0].pageY
              , s = u[1].pageX
              , i = u[1].pageY;
            return Math.sqrt((s - e) ** 2 + (i - t) ** 2)
        }
        function y(e) {
            const s = t.isElement ? "swiper-slide" : `.${t.params.slideClass}`;
            return !!e.target.matches(s) || t.slides.filter((t=>t.contains(e.target))).length > 0
        }
        function E(e) {
            if ("mouse" === e.pointerType && u.splice(0, u.length),
            !y(e))
                return;
            const s = t.params.zoom;
            if (l = !1,
            o = !1,
            u.push(e),
            !(u.length < 2)) {
                if (l = !0,
                m.scaleStart = b(),
                !m.slideEl) {
                    m.slideEl = e.target.closest(`.${t.params.slideClass}, swiper-slide`),
                    m.slideEl || (m.slideEl = t.slides[t.activeIndex]);
                    let i = m.slideEl.querySelector(`.${s.containerClass}`);
                    if (i && (i = i.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0]),
                    m.imageEl = i,
                    m.imageWrapEl = i ? x(m.imageEl, `.${s.containerClass}`)[0] : void 0,
                    !m.imageWrapEl)
                        return void (m.imageEl = void 0);
                    m.maxRatio = m.imageWrapEl.getAttribute("data-swiper-zoom") || s.maxRatio
                }
                if (m.imageEl) {
                    const [e,t] = function() {
                        if (u.length < 2)
                            return {
                                x: null,
                                y: null
                            };
                        const e = m.imageEl.getBoundingClientRect();
                        return [(u[0].pageX + (u[1].pageX - u[0].pageX) / 2 - e.x - n.scrollX) / p, (u[0].pageY + (u[1].pageY - u[0].pageY) / 2 - e.y - n.scrollY) / p]
                    }();
                    m.originX = e,
                    m.originY = t,
                    m.imageEl.style.transitionDuration = "0ms"
                }
                c = !0
            }
        }
        function S(e) {
            if (!y(e))
                return;
            const s = t.params.zoom
              , i = t.zoom
              , a = u.findIndex((t=>t.pointerId === e.pointerId));
            a >= 0 && (u[a] = e),
            u.length < 2 || (o = !0,
            m.scaleMove = b(),
            m.imageEl && (i.scale = m.scaleMove / m.scaleStart * p,
            i.scale > m.maxRatio && (i.scale = m.maxRatio - 1 + (i.scale - m.maxRatio + 1) ** .5),
            i.scale < s.minRatio && (i.scale = s.minRatio + 1 - (s.minRatio - i.scale + 1) ** .5),
            m.imageEl.style.transform = `translate3d(0,0,0) scale(${i.scale})`))
        }
        function T(e) {
            if (!y(e))
                return;
            if ("mouse" === e.pointerType && "pointerout" === e.type)
                return;
            const s = t.params.zoom
              , i = t.zoom
              , a = u.findIndex((t=>t.pointerId === e.pointerId));
            a >= 0 && u.splice(a, 1),
            l && o && (l = !1,
            o = !1,
            m.imageEl && (i.scale = Math.max(Math.min(i.scale, m.maxRatio), s.minRatio),
            m.imageEl.style.transitionDuration = `${t.params.speed}ms`,
            m.imageEl.style.transform = `translate3d(0,0,0) scale(${i.scale})`,
            p = i.scale,
            c = !1,
            i.scale > 1 && m.slideEl ? m.slideEl.classList.add(`${s.zoomedSlideClass}`) : i.scale <= 1 && m.slideEl && m.slideEl.classList.remove(`${s.zoomedSlideClass}`),
            1 === i.scale && (m.originX = 0,
            m.originY = 0,
            m.slideEl = void 0)))
        }
        function M(e) {
            if (!y(e) || !function(e) {
                const s = `.${t.params.zoom.containerClass}`;
                return !!e.target.matches(s) || [...t.hostEl.querySelectorAll(s)].filter((t=>t.contains(e.target))).length > 0
            }(e))
                return;
            const s = t.zoom;
            if (!m.imageEl)
                return;
            if (!h.isTouched || !m.slideEl)
                return;
            h.isMoved || (h.width = m.imageEl.offsetWidth,
            h.height = m.imageEl.offsetHeight,
            h.startX = d(m.imageWrapEl, "x") || 0,
            h.startY = d(m.imageWrapEl, "y") || 0,
            m.slideWidth = m.slideEl.offsetWidth,
            m.slideHeight = m.slideEl.offsetHeight,
            m.imageWrapEl.style.transitionDuration = "0ms");
            const i = h.width * s.scale
              , a = h.height * s.scale;
            if (i < m.slideWidth && a < m.slideHeight)
                return;
            h.minX = Math.min(m.slideWidth / 2 - i / 2, 0),
            h.maxX = -h.minX,
            h.minY = Math.min(m.slideHeight / 2 - a / 2, 0),
            h.maxY = -h.minY,
            h.touchesCurrent.x = u.length > 0 ? u[0].pageX : e.pageX,
            h.touchesCurrent.y = u.length > 0 ? u[0].pageY : e.pageY;
            if (Math.max(Math.abs(h.touchesCurrent.x - h.touchesStart.x), Math.abs(h.touchesCurrent.y - h.touchesStart.y)) > 5 && (t.allowClick = !1),
            !h.isMoved && !c) {
                if (t.isHorizontal() && (Math.floor(h.minX) === Math.floor(h.startX) && h.touchesCurrent.x < h.touchesStart.x || Math.floor(h.maxX) === Math.floor(h.startX) && h.touchesCurrent.x > h.touchesStart.x))
                    return void (h.isTouched = !1);
                if (!t.isHorizontal() && (Math.floor(h.minY) === Math.floor(h.startY) && h.touchesCurrent.y < h.touchesStart.y || Math.floor(h.maxY) === Math.floor(h.startY) && h.touchesCurrent.y > h.touchesStart.y))
                    return void (h.isTouched = !1)
            }
            e.cancelable && e.preventDefault(),
            e.stopPropagation(),
            h.isMoved = !0;
            const r = (s.scale - p) / (m.maxRatio - t.params.zoom.minRatio)
              , {originX: n, originY: l} = m;
            h.currentX = h.touchesCurrent.x - h.touchesStart.x + h.startX + r * (h.width - 2 * n),
            h.currentY = h.touchesCurrent.y - h.touchesStart.y + h.startY + r * (h.height - 2 * l),
            h.currentX < h.minX && (h.currentX = h.minX + 1 - (h.minX - h.currentX + 1) ** .8),
            h.currentX > h.maxX && (h.currentX = h.maxX - 1 + (h.currentX - h.maxX + 1) ** .8),
            h.currentY < h.minY && (h.currentY = h.minY + 1 - (h.minY - h.currentY + 1) ** .8),
            h.currentY > h.maxY && (h.currentY = h.maxY - 1 + (h.currentY - h.maxY + 1) ** .8),
            g.prevPositionX || (g.prevPositionX = h.touchesCurrent.x),
            g.prevPositionY || (g.prevPositionY = h.touchesCurrent.y),
            g.prevTime || (g.prevTime = Date.now()),
            g.x = (h.touchesCurrent.x - g.prevPositionX) / (Date.now() - g.prevTime) / 2,
            g.y = (h.touchesCurrent.y - g.prevPositionY) / (Date.now() - g.prevTime) / 2,
            Math.abs(h.touchesCurrent.x - g.prevPositionX) < 2 && (g.x = 0),
            Math.abs(h.touchesCurrent.y - g.prevPositionY) < 2 && (g.y = 0),
            g.prevPositionX = h.touchesCurrent.x,
            g.prevPositionY = h.touchesCurrent.y,
            g.prevTime = Date.now(),
            m.imageWrapEl.style.transform = `translate3d(${h.currentX}px, ${h.currentY}px,0)`
        }
        function C() {
            const e = t.zoom;
            m.slideEl && t.activeIndex !== t.slides.indexOf(m.slideEl) && (m.imageEl && (m.imageEl.style.transform = "translate3d(0,0,0) scale(1)"),
            m.imageWrapEl && (m.imageWrapEl.style.transform = "translate3d(0,0,0)"),
            m.slideEl.classList.remove(`${t.params.zoom.zoomedSlideClass}`),
            e.scale = 1,
            p = 1,
            m.slideEl = void 0,
            m.imageEl = void 0,
            m.imageWrapEl = void 0,
            m.originX = 0,
            m.originY = 0)
        }
        function P(e) {
            const s = t.zoom
              , i = t.params.zoom;
            if (!m.slideEl) {
                e && e.target && (m.slideEl = e.target.closest(`.${t.params.slideClass}, swiper-slide`)),
                m.slideEl || (t.params.virtual && t.params.virtual.enabled && t.virtual ? m.slideEl = f(t.slidesEl, `.${t.params.slideActiveClass}`)[0] : m.slideEl = t.slides[t.activeIndex]);
                let s = m.slideEl.querySelector(`.${i.containerClass}`);
                s && (s = s.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0]),
                m.imageEl = s,
                m.imageWrapEl = s ? x(m.imageEl, `.${i.containerClass}`)[0] : void 0
            }
            if (!m.imageEl || !m.imageWrapEl)
                return;
            let a, r, l, o, d, c, u, g, v, b, y, E, S, T, M, C, P, L;
            t.params.cssMode && (t.wrapperEl.style.overflow = "hidden",
            t.wrapperEl.style.touchAction = "none"),
            m.slideEl.classList.add(`${i.zoomedSlideClass}`),
            void 0 === h.touchesStart.x && e ? (a = e.pageX,
            r = e.pageY) : (a = h.touchesStart.x,
            r = h.touchesStart.y);
            const z = "number" == typeof e ? e : null;
            1 === p && z && (a = void 0,
            r = void 0),
            s.scale = z || m.imageWrapEl.getAttribute("data-swiper-zoom") || i.maxRatio,
            p = z || m.imageWrapEl.getAttribute("data-swiper-zoom") || i.maxRatio,
            !e || 1 === p && z ? (u = 0,
            g = 0) : (P = m.slideEl.offsetWidth,
            L = m.slideEl.offsetHeight,
            l = w(m.slideEl).left + n.scrollX,
            o = w(m.slideEl).top + n.scrollY,
            d = l + P / 2 - a,
            c = o + L / 2 - r,
            v = m.imageEl.offsetWidth,
            b = m.imageEl.offsetHeight,
            y = v * s.scale,
            E = b * s.scale,
            S = Math.min(P / 2 - y / 2, 0),
            T = Math.min(L / 2 - E / 2, 0),
            M = -S,
            C = -T,
            u = d * s.scale,
            g = c * s.scale,
            u < S && (u = S),
            u > M && (u = M),
            g < T && (g = T),
            g > C && (g = C)),
            z && 1 === s.scale && (m.originX = 0,
            m.originY = 0),
            m.imageWrapEl.style.transitionDuration = "300ms",
            m.imageWrapEl.style.transform = `translate3d(${u}px, ${g}px,0)`,
            m.imageEl.style.transitionDuration = "300ms",
            m.imageEl.style.transform = `translate3d(0,0,0) scale(${s.scale})`
        }
        function L() {
            const e = t.zoom
              , s = t.params.zoom;
            if (!m.slideEl) {
                t.params.virtual && t.params.virtual.enabled && t.virtual ? m.slideEl = f(t.slidesEl, `.${t.params.slideActiveClass}`)[0] : m.slideEl = t.slides[t.activeIndex];
                let e = m.slideEl.querySelector(`.${s.containerClass}`);
                e && (e = e.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0]),
                m.imageEl = e,
                m.imageWrapEl = e ? x(m.imageEl, `.${s.containerClass}`)[0] : void 0
            }
            m.imageEl && m.imageWrapEl && (t.params.cssMode && (t.wrapperEl.style.overflow = "",
            t.wrapperEl.style.touchAction = ""),
            e.scale = 1,
            p = 1,
            m.imageWrapEl.style.transitionDuration = "300ms",
            m.imageWrapEl.style.transform = "translate3d(0,0,0)",
            m.imageEl.style.transitionDuration = "300ms",
            m.imageEl.style.transform = "translate3d(0,0,0) scale(1)",
            m.slideEl.classList.remove(`${s.zoomedSlideClass}`),
            m.slideEl = void 0,
            m.originX = 0,
            m.originY = 0)
        }
        function z(e) {
            const s = t.zoom;
            s.scale && 1 !== s.scale ? L() : P(e)
        }
        function k() {
            return {
                passiveListener: !!t.params.passiveListeners && {
                    passive: !0,
                    capture: !1
                },
                activeListenerWithCapture: !t.params.passiveListeners || {
                    passive: !1,
                    capture: !0
                }
            }
        }
        function A() {
            const e = t.zoom;
            if (e.enabled)
                return;
            e.enabled = !0;
            const {passiveListener: s, activeListenerWithCapture: i} = k();
            t.wrapperEl.addEventListener("pointerdown", E, s),
            t.wrapperEl.addEventListener("pointermove", S, i),
            ["pointerup", "pointercancel", "pointerout"].forEach((e=>{
                t.wrapperEl.addEventListener(e, T, s)
            }
            )),
            t.wrapperEl.addEventListener("pointermove", M, i)
        }
        function I() {
            const e = t.zoom;
            if (!e.enabled)
                return;
            e.enabled = !1;
            const {passiveListener: s, activeListenerWithCapture: i} = k();
            t.wrapperEl.removeEventListener("pointerdown", E, s),
            t.wrapperEl.removeEventListener("pointermove", S, i),
            ["pointerup", "pointercancel", "pointerout"].forEach((e=>{
                t.wrapperEl.removeEventListener(e, T, s)
            }
            )),
            t.wrapperEl.removeEventListener("pointermove", M, i)
        }
        Object.defineProperty(t.zoom, "scale", {
            get: ()=>v,
            set(e) {
                if (v !== e) {
                    const t = m.imageEl
                      , s = m.slideEl;
                    a("zoomChange", e, t, s)
                }
                v = e
            }
        }),
        i("init", (()=>{
            t.params.zoom.enabled && A()
        }
        )),
        i("destroy", (()=>{
            I()
        }
        )),
        i("touchStart", ((e,s)=>{
            t.zoom.enabled && function(e) {
                const s = t.device;
                if (!m.imageEl)
                    return;
                if (h.isTouched)
                    return;
                s.android && e.cancelable && e.preventDefault(),
                h.isTouched = !0;
                const i = u.length > 0 ? u[0] : e;
                h.touchesStart.x = i.pageX,
                h.touchesStart.y = i.pageY
            }(s)
        }
        )),
        i("touchEnd", ((e,s)=>{
            t.zoom.enabled && function() {
                const e = t.zoom;
                if (!m.imageEl)
                    return;
                if (!h.isTouched || !h.isMoved)
                    return h.isTouched = !1,
                    void (h.isMoved = !1);
                h.isTouched = !1,
                h.isMoved = !1;
                let s = 300
                  , i = 300;
                const a = g.x * s
                  , r = h.currentX + a
                  , n = g.y * i
                  , l = h.currentY + n;
                0 !== g.x && (s = Math.abs((r - h.currentX) / g.x)),
                0 !== g.y && (i = Math.abs((l - h.currentY) / g.y));
                const o = Math.max(s, i);
                h.currentX = r,
                h.currentY = l;
                const d = h.width * e.scale
                  , p = h.height * e.scale;
                h.minX = Math.min(m.slideWidth / 2 - d / 2, 0),
                h.maxX = -h.minX,
                h.minY = Math.min(m.slideHeight / 2 - p / 2, 0),
                h.maxY = -h.minY,
                h.currentX = Math.max(Math.min(h.currentX, h.maxX), h.minX),
                h.currentY = Math.max(Math.min(h.currentY, h.maxY), h.minY),
                m.imageWrapEl.style.transitionDuration = `${o}ms`,
                m.imageWrapEl.style.transform = `translate3d(${h.currentX}px, ${h.currentY}px,0)`
            }()
        }
        )),
        i("doubleTap", ((e,s)=>{
            !t.animating && t.params.zoom.enabled && t.zoom.enabled && t.params.zoom.toggle && z(s)
        }
        )),
        i("transitionEnd", (()=>{
            t.zoom.enabled && t.params.zoom.enabled && C()
        }
        )),
        i("slideChange", (()=>{
            t.zoom.enabled && t.params.zoom.enabled && t.params.cssMode && C()
        }
        )),
        Object.assign(t.zoom, {
            enable: A,
            disable: I,
            in: P,
            out: L,
            toggle: z
        })
    }
    , function(e) {
        let {swiper: t, extendParams: s, on: i} = e;
        function a(e, t) {
            const s = function() {
                let e, t, s;
                return (i,a)=>{
                    for (t = -1,
                    e = i.length; e - t > 1; )
                        s = e + t >> 1,
                        i[s] <= a ? t = s : e = s;
                    return e
                }
            }();
            let i, a;
            return this.x = e,
            this.y = t,
            this.lastIndex = e.length - 1,
            this.interpolate = function(e) {
                return e ? (a = s(this.x, e),
                i = a - 1,
                (e - this.x[i]) * (this.y[a] - this.y[i]) / (this.x[a] - this.x[i]) + this.y[i]) : 0
            }
            ,
            this
        }
        function r() {
            t.controller.control && t.controller.spline && (t.controller.spline = void 0,
            delete t.controller.spline)
        }
        s({
            controller: {
                control: void 0,
                inverse: !1,
                by: "slide"
            }
        }),
        t.controller = {
            control: void 0
        },
        i("beforeInit", (()=>{
            if ("undefined" != typeof window && ("string" == typeof t.params.controller.control || t.params.controller.control instanceof HTMLElement)) {
                const e = document.querySelector(t.params.controller.control);
                if (e && e.swiper)
                    t.controller.control = e.swiper;
                else if (e) {
                    const s = i=>{
                        t.controller.control = i.detail[0],
                        t.update(),
                        e.removeEventListener("init", s)
                    }
                    ;
                    e.addEventListener("init", s)
                }
            } else
                t.controller.control = t.params.controller.control
        }
        )),
        i("update", (()=>{
            r()
        }
        )),
        i("resize", (()=>{
            r()
        }
        )),
        i("observerUpdate", (()=>{
            r()
        }
        )),
        i("setTranslate", ((e,s,i)=>{
            t.controller.control && !t.controller.control.destroyed && t.controller.setTranslate(s, i)
        }
        )),
        i("setTransition", ((e,s,i)=>{
            t.controller.control && !t.controller.control.destroyed && t.controller.setTransition(s, i)
        }
        )),
        Object.assign(t.controller, {
            setTranslate: function(e, s) {
                const i = t.controller.control;
                let r, n;
                const l = t.constructor;
                function o(e) {
                    if (e.destroyed)
                        return;
                    const s = t.rtlTranslate ? -t.translate : t.translate;
                    "slide" === t.params.controller.by && (!function(e) {
                        t.controller.spline = t.params.loop ? new a(t.slidesGrid,e.slidesGrid) : new a(t.snapGrid,e.snapGrid)
                    }(e),
                    n = -t.controller.spline.interpolate(-s)),
                    n && "layout" !== t.params.controller.by || (r = (e.maxTranslate() - e.minTranslate()) / (t.maxTranslate() - t.minTranslate()),
                    !Number.isNaN(r) && Number.isFinite(r) || (r = 1),
                    n = (s - t.minTranslate()) * r + e.minTranslate()),
                    t.params.controller.inverse && (n = e.maxTranslate() - n),
                    e.updateProgress(n),
                    e.setTranslate(n, t),
                    e.updateActiveIndex(),
                    e.updateSlidesClasses()
                }
                if (Array.isArray(i))
                    for (let e = 0; e < i.length; e += 1)
                        i[e] !== s && i[e]instanceof l && o(i[e]);
                else
                    i instanceof l && s !== i && o(i)
            },
            setTransition: function(e, s) {
                const i = t.constructor
                  , a = t.controller.control;
                let r;
                function n(s) {
                    s.destroyed || (s.setTransition(e, t),
                    0 !== e && (s.transitionStart(),
                    s.params.autoHeight && l((()=>{
                        s.updateAutoHeight()
                    }
                    )),
                    E(s.wrapperEl, (()=>{
                        a && s.transitionEnd()
                    }
                    ))))
                }
                if (Array.isArray(a))
                    for (r = 0; r < a.length; r += 1)
                        a[r] !== s && a[r]instanceof i && n(a[r]);
                else
                    a instanceof i && s !== a && n(a)
            }
        })
    }
    , function(e) {
        let {swiper: t, extendParams: s, on: i} = e;
        s({
            a11y: {
                enabled: !0,
                notificationClass: "swiper-notification",
                prevSlideMessage: "Previous slide",
                nextSlideMessage: "Next slide",
                firstSlideMessage: "This is the first slide",
                lastSlideMessage: "This is the last slide",
                paginationBulletMessage: "Go to slide {{index}}",
                slideLabelMessage: "{{index}} / {{slidesLength}}",
                containerMessage: null,
                containerRoleDescriptionMessage: null,
                itemRoleDescriptionMessage: null,
                slideRole: "group",
                id: null
            }
        }),
        t.a11y = {
            clicked: !1
        };
        let a = null;
        function r(e) {
            const t = a;
            0 !== t.length && (t.innerHTML = "",
            t.innerHTML = e)
        }
        const n = e=>(Array.isArray(e) ? e : [e]).filter((e=>!!e));
        function l(e) {
            (e = n(e)).forEach((e=>{
                e.setAttribute("tabIndex", "0")
            }
            ))
        }
        function o(e) {
            (e = n(e)).forEach((e=>{
                e.setAttribute("tabIndex", "-1")
            }
            ))
        }
        function d(e, t) {
            (e = n(e)).forEach((e=>{
                e.setAttribute("role", t)
            }
            ))
        }
        function p(e, t) {
            (e = n(e)).forEach((e=>{
                e.setAttribute("aria-roledescription", t)
            }
            ))
        }
        function c(e, t) {
            (e = n(e)).forEach((e=>{
                e.setAttribute("aria-label", t)
            }
            ))
        }
        function u(e) {
            (e = n(e)).forEach((e=>{
                e.setAttribute("aria-disabled", !0)
            }
            ))
        }
        function m(e) {
            (e = n(e)).forEach((e=>{
                e.setAttribute("aria-disabled", !1)
            }
            ))
        }
        function h(e) {
            if (13 !== e.keyCode && 32 !== e.keyCode)
                return;
            const s = t.params.a11y
              , i = e.target;
            t.pagination && t.pagination.el && (i === t.pagination.el || t.pagination.el.contains(e.target)) && !e.target.matches(se(t.params.pagination.bulletClass)) || (t.navigation && t.navigation.nextEl && i === t.navigation.nextEl && (t.isEnd && !t.params.loop || t.slideNext(),
            t.isEnd ? r(s.lastSlideMessage) : r(s.nextSlideMessage)),
            t.navigation && t.navigation.prevEl && i === t.navigation.prevEl && (t.isBeginning && !t.params.loop || t.slidePrev(),
            t.isBeginning ? r(s.firstSlideMessage) : r(s.prevSlideMessage)),
            t.pagination && i.matches(se(t.params.pagination.bulletClass)) && i.click())
        }
        function f() {
            return t.pagination && t.pagination.bullets && t.pagination.bullets.length
        }
        function g() {
            return f() && t.params.pagination.clickable
        }
        const w = (e,t,s)=>{
            l(e),
            "BUTTON" !== e.tagName && (d(e, "button"),
            e.addEventListener("keydown", h)),
            c(e, s),
            function(e, t) {
                (e = n(e)).forEach((e=>{
                    e.setAttribute("aria-controls", t)
                }
                ))
            }(e, t)
        }
          , b = ()=>{
            t.a11y.clicked = !0
        }
          , x = ()=>{
            requestAnimationFrame((()=>{
                requestAnimationFrame((()=>{
                    t.destroyed || (t.a11y.clicked = !1)
                }
                ))
            }
            ))
        }
          , E = e=>{
            if (t.a11y.clicked)
                return;
            const s = e.target.closest(`.${t.params.slideClass}, swiper-slide`);
            if (!s || !t.slides.includes(s))
                return;
            const i = t.slides.indexOf(s) === t.activeIndex
              , a = t.params.watchSlidesProgress && t.visibleSlides && t.visibleSlides.includes(s);
            i || a || e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents || (t.isHorizontal() ? t.el.scrollLeft = 0 : t.el.scrollTop = 0,
            t.slideTo(t.slides.indexOf(s), 0))
        }
          , S = ()=>{
            const e = t.params.a11y;
            e.itemRoleDescriptionMessage && p(t.slides, e.itemRoleDescriptionMessage),
            e.slideRole && d(t.slides, e.slideRole);
            const s = t.slides.length;
            e.slideLabelMessage && t.slides.forEach(((i,a)=>{
                const r = t.params.loop ? parseInt(i.getAttribute("data-swiper-slide-index"), 10) : a;
                c(i, e.slideLabelMessage.replace(/\{\{index\}\}/, r + 1).replace(/\{\{slidesLength\}\}/, s))
            }
            ))
        }
          , T = ()=>{
            const e = t.params.a11y;
            t.el.append(a);
            const s = t.el;
            e.containerRoleDescriptionMessage && p(s, e.containerRoleDescriptionMessage),
            e.containerMessage && c(s, e.containerMessage);
            const i = t.wrapperEl
              , r = e.id || i.getAttribute("id") || `swiper-wrapper-${l = 16,
            void 0 === l && (l = 16),
            "x".repeat(l).replace(/x/g, (()=>Math.round(16 * Math.random()).toString(16)))}`;
            var l;
            const o = t.params.autoplay && t.params.autoplay.enabled ? "off" : "polite";
            var d;
            d = r,
            n(i).forEach((e=>{
                e.setAttribute("id", d)
            }
            )),
            function(e, t) {
                (e = n(e)).forEach((e=>{
                    e.setAttribute("aria-live", t)
                }
                ))
            }(i, o),
            S();
            let {nextEl: u, prevEl: m} = t.navigation ? t.navigation : {};
            if (u = n(u),
            m = n(m),
            u && u.forEach((t=>w(t, r, e.nextSlideMessage))),
            m && m.forEach((t=>w(t, r, e.prevSlideMessage))),
            g()) {
                (Array.isArray(t.pagination.el) ? t.pagination.el : [t.pagination.el]).forEach((e=>{
                    e.addEventListener("keydown", h)
                }
                ))
            }
            t.el.addEventListener("focus", E, !0),
            t.el.addEventListener("pointerdown", b, !0),
            t.el.addEventListener("pointerup", x, !0)
        }
        ;
        i("beforeInit", (()=>{
            a = v("span", t.params.a11y.notificationClass),
            a.setAttribute("aria-live", "assertive"),
            a.setAttribute("aria-atomic", "true")
        }
        )),
        i("afterInit", (()=>{
            t.params.a11y.enabled && T()
        }
        )),
        i("slidesLengthChange snapGridLengthChange slidesGridLengthChange", (()=>{
            t.params.a11y.enabled && S()
        }
        )),
        i("fromEdge toEdge afterInit lock unlock", (()=>{
            t.params.a11y.enabled && function() {
                if (t.params.loop || t.params.rewind || !t.navigation)
                    return;
                const {nextEl: e, prevEl: s} = t.navigation;
                s && (t.isBeginning ? (u(s),
                o(s)) : (m(s),
                l(s))),
                e && (t.isEnd ? (u(e),
                o(e)) : (m(e),
                l(e)))
            }()
        }
        )),
        i("paginationUpdate", (()=>{
            t.params.a11y.enabled && function() {
                const e = t.params.a11y;
                f() && t.pagination.bullets.forEach((s=>{
                    t.params.pagination.clickable && (l(s),
                    t.params.pagination.renderBullet || (d(s, "button"),
                    c(s, e.paginationBulletMessage.replace(/\{\{index\}\}/, y(s) + 1)))),
                    s.matches(se(t.params.pagination.bulletActiveClass)) ? s.setAttribute("aria-current", "true") : s.removeAttribute("aria-current")
                }
                ))
            }()
        }
        )),
        i("destroy", (()=>{
            t.params.a11y.enabled && function() {
                a && a.remove();
                let {nextEl: e, prevEl: s} = t.navigation ? t.navigation : {};
                e = n(e),
                s = n(s),
                e && e.forEach((e=>e.removeEventListener("keydown", h))),
                s && s.forEach((e=>e.removeEventListener("keydown", h))),
                g() && (Array.isArray(t.pagination.el) ? t.pagination.el : [t.pagination.el]).forEach((e=>{
                    e.removeEventListener("keydown", h)
                }
                ));
                t.el.removeEventListener("focus", E, !0),
                t.el.removeEventListener("pointerdown", b, !0),
                t.el.removeEventListener("pointerup", x, !0)
            }()
        }
        ))
    }
    , function(e) {
        let {swiper: t, extendParams: s, on: i} = e;
        s({
            history: {
                enabled: !1,
                root: "",
                replaceState: !1,
                key: "slides",
                keepQuery: !1
            }
        });
        let a = !1
          , n = {};
        const l = e=>e.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
          , o = e=>{
            const t = r();
            let s;
            s = e ? new URL(e) : t.location;
            const i = s.pathname.slice(1).split("/").filter((e=>"" !== e))
              , a = i.length;
            return {
                key: i[a - 2],
                value: i[a - 1]
            }
        }
          , d = (e,s)=>{
            const i = r();
            if (!a || !t.params.history.enabled)
                return;
            let n;
            n = t.params.url ? new URL(t.params.url) : i.location;
            const o = t.slides[s];
            let d = l(o.getAttribute("data-history"));
            if (t.params.history.root.length > 0) {
                let s = t.params.history.root;
                "/" === s[s.length - 1] && (s = s.slice(0, s.length - 1)),
                d = `${s}/${e ? `${e}/` : ""}${d}`
            } else
                n.pathname.includes(e) || (d = `${e ? `${e}/` : ""}${d}`);
            t.params.history.keepQuery && (d += n.search);
            const p = i.history.state;
            p && p.value === d || (t.params.history.replaceState ? i.history.replaceState({
                value: d
            }, null, d) : i.history.pushState({
                value: d
            }, null, d))
        }
          , p = (e,s,i)=>{
            if (s)
                for (let a = 0, r = t.slides.length; a < r; a += 1) {
                    const r = t.slides[a];
                    if (l(r.getAttribute("data-history")) === s) {
                        const s = t.getSlideIndex(r);
                        t.slideTo(s, e, i)
                    }
                }
            else
                t.slideTo(0, e, i)
        }
          , c = ()=>{
            n = o(t.params.url),
            p(t.params.speed, n.value, !1)
        }
        ;
        i("init", (()=>{
            t.params.history.enabled && (()=>{
                const e = r();
                if (t.params.history) {
                    if (!e.history || !e.history.pushState)
                        return t.params.history.enabled = !1,
                        void (t.params.hashNavigation.enabled = !0);
                    a = !0,
                    n = o(t.params.url),
                    n.key || n.value ? (p(0, n.value, t.params.runCallbacksOnInit),
                    t.params.history.replaceState || e.addEventListener("popstate", c)) : t.params.history.replaceState || e.addEventListener("popstate", c)
                }
            }
            )()
        }
        )),
        i("destroy", (()=>{
            t.params.history.enabled && (()=>{
                const e = r();
                t.params.history.replaceState || e.removeEventListener("popstate", c)
            }
            )()
        }
        )),
        i("transitionEnd _freeModeNoMomentumRelease", (()=>{
            a && d(t.params.history.key, t.activeIndex)
        }
        )),
        i("slideChange", (()=>{
            a && t.params.cssMode && d(t.params.history.key, t.activeIndex)
        }
        ))
    }
    , function(e) {
        let {swiper: t, extendParams: s, emit: a, on: n} = e
          , l = !1;
        const o = i()
          , d = r();
        s({
            hashNavigation: {
                enabled: !1,
                replaceState: !1,
                watchState: !1,
                getSlideIndex(e, s) {
                    if (t.virtual && t.params.virtual.enabled) {
                        const e = t.slides.filter((e=>e.getAttribute("data-hash") === s))[0];
                        if (!e)
                            return 0;
                        return parseInt(e.getAttribute("data-swiper-slide-index"), 10)
                    }
                    return t.getSlideIndex(f(t.slidesEl, `.${t.params.slideClass}[data-hash="${s}"], swiper-slide[data-hash="${s}"]`)[0])
                }
            }
        });
        const p = ()=>{
            a("hashChange");
            const e = o.location.hash.replace("#", "")
              , s = t.virtual && t.params.virtual.enabled ? t.slidesEl.querySelector(`[data-swiper-slide-index="${t.activeIndex}"]`) : t.slides[t.activeIndex];
            if (e !== (s ? s.getAttribute("data-hash") : "")) {
                const s = t.params.hashNavigation.getSlideIndex(t, e);
                if (void 0 === s || Number.isNaN(s))
                    return;
                t.slideTo(s)
            }
        }
          , c = ()=>{
            if (!l || !t.params.hashNavigation.enabled)
                return;
            const e = t.virtual && t.params.virtual.enabled ? t.slidesEl.querySelector(`[data-swiper-slide-index="${t.activeIndex}"]`) : t.slides[t.activeIndex]
              , s = e ? e.getAttribute("data-hash") || e.getAttribute("data-history") : "";
            t.params.hashNavigation.replaceState && d.history && d.history.replaceState ? (d.history.replaceState(null, null, `#${s}` || ""),
            a("hashSet")) : (o.location.hash = s || "",
            a("hashSet"))
        }
        ;
        n("init", (()=>{
            t.params.hashNavigation.enabled && (()=>{
                if (!t.params.hashNavigation.enabled || t.params.history && t.params.history.enabled)
                    return;
                l = !0;
                const e = o.location.hash.replace("#", "");
                if (e) {
                    const s = 0
                      , i = t.params.hashNavigation.getSlideIndex(t, e);
                    t.slideTo(i || 0, s, t.params.runCallbacksOnInit, !0)
                }
                t.params.hashNavigation.watchState && d.addEventListener("hashchange", p)
            }
            )()
        }
        )),
        n("destroy", (()=>{
            t.params.hashNavigation.enabled && t.params.hashNavigation.watchState && d.removeEventListener("hashchange", p)
        }
        )),
        n("transitionEnd _freeModeNoMomentumRelease", (()=>{
            l && c()
        }
        )),
        n("slideChange", (()=>{
            l && t.params.cssMode && c()
        }
        ))
    }
    , function(e) {
        let t, s, {swiper: a, extendParams: r, on: n, emit: l, params: o} = e;
        a.autoplay = {
            running: !1,
            paused: !1,
            timeLeft: 0
        },
        r({
            autoplay: {
                enabled: !1,
                delay: 3e3,
                waitForTransition: !0,
                disableOnInteraction: !1,
                stopOnLastSlide: !1,
                reverseDirection: !1,
                pauseOnMouseEnter: !1
            }
        });
        let d, p, c, u, m, h, f, g, v = o && o.autoplay ? o.autoplay.delay : 3e3, w = o && o.autoplay ? o.autoplay.delay : 3e3, b = (new Date).getTime();
        function y(e) {
            a && !a.destroyed && a.wrapperEl && e.target === a.wrapperEl && (a.wrapperEl.removeEventListener("transitionend", y),
            g || C())
        }
        const x = ()=>{
            if (a.destroyed || !a.autoplay.running)
                return;
            a.autoplay.paused ? p = !0 : p && (w = d,
            p = !1);
            const e = a.autoplay.paused ? d : b + w - (new Date).getTime();
            a.autoplay.timeLeft = e,
            l("autoplayTimeLeft", e, e / v),
            s = requestAnimationFrame((()=>{
                x()
            }
            ))
        }
          , E = e=>{
            if (a.destroyed || !a.autoplay.running)
                return;
            cancelAnimationFrame(s),
            x();
            let i = void 0 === e ? a.params.autoplay.delay : e;
            v = a.params.autoplay.delay,
            w = a.params.autoplay.delay;
            const r = (()=>{
                let e;
                if (e = a.virtual && a.params.virtual.enabled ? a.slides.filter((e=>e.classList.contains("swiper-slide-active")))[0] : a.slides[a.activeIndex],
                !e)
                    return;
                return parseInt(e.getAttribute("data-swiper-autoplay"), 10)
            }
            )();
            !Number.isNaN(r) && r > 0 && void 0 === e && (i = r,
            v = r,
            w = r),
            d = i;
            const n = a.params.speed
              , o = ()=>{
                a && !a.destroyed && (a.params.autoplay.reverseDirection ? !a.isBeginning || a.params.loop || a.params.rewind ? (a.slidePrev(n, !0, !0),
                l("autoplay")) : a.params.autoplay.stopOnLastSlide || (a.slideTo(a.slides.length - 1, n, !0, !0),
                l("autoplay")) : !a.isEnd || a.params.loop || a.params.rewind ? (a.slideNext(n, !0, !0),
                l("autoplay")) : a.params.autoplay.stopOnLastSlide || (a.slideTo(0, n, !0, !0),
                l("autoplay")),
                a.params.cssMode && (b = (new Date).getTime(),
                requestAnimationFrame((()=>{
                    E()
                }
                ))))
            }
            ;
            return i > 0 ? (clearTimeout(t),
            t = setTimeout((()=>{
                o()
            }
            ), i)) : requestAnimationFrame((()=>{
                o()
            }
            )),
            i
        }
          , S = ()=>{
            b = (new Date).getTime(),
            a.autoplay.running = !0,
            E(),
            l("autoplayStart")
        }
          , T = ()=>{
            a.autoplay.running = !1,
            clearTimeout(t),
            cancelAnimationFrame(s),
            l("autoplayStop")
        }
          , M = (e,s)=>{
            if (a.destroyed || !a.autoplay.running)
                return;
            clearTimeout(t),
            e || (f = !0);
            const i = ()=>{
                l("autoplayPause"),
                a.params.autoplay.waitForTransition ? a.wrapperEl.addEventListener("transitionend", y) : C()
            }
            ;
            if (a.autoplay.paused = !0,
            s)
                return h && (d = a.params.autoplay.delay),
                h = !1,
                void i();
            const r = d || a.params.autoplay.delay;
            d = r - ((new Date).getTime() - b),
            a.isEnd && d < 0 && !a.params.loop || (d < 0 && (d = 0),
            i())
        }
          , C = ()=>{
            a.isEnd && d < 0 && !a.params.loop || a.destroyed || !a.autoplay.running || (b = (new Date).getTime(),
            f ? (f = !1,
            E(d)) : E(),
            a.autoplay.paused = !1,
            l("autoplayResume"))
        }
          , P = ()=>{
            if (a.destroyed || !a.autoplay.running)
                return;
            const e = i();
            "hidden" === e.visibilityState && (f = !0,
            M(!0)),
            "visible" === e.visibilityState && C()
        }
          , L = e=>{
            "mouse" === e.pointerType && (f = !0,
            g = !0,
            a.animating || a.autoplay.paused || M(!0))
        }
          , z = e=>{
            "mouse" === e.pointerType && (g = !1,
            a.autoplay.paused && C())
        }
        ;
        n("init", (()=>{
            a.params.autoplay.enabled && (a.params.autoplay.pauseOnMouseEnter && (a.el.addEventListener("pointerenter", L),
            a.el.addEventListener("pointerleave", z)),
            i().addEventListener("visibilitychange", P),
            S())
        }
        )),
        n("destroy", (()=>{
            a.el.removeEventListener("pointerenter", L),
            a.el.removeEventListener("pointerleave", z),
            i().removeEventListener("visibilitychange", P),
            a.autoplay.running && T()
        }
        )),
        n("_freeModeStaticRelease", (()=>{
            (u || f) && C()
        }
        )),
        n("_freeModeNoMomentumRelease", (()=>{
            a.params.autoplay.disableOnInteraction ? T() : M(!0, !0)
        }
        )),
        n("beforeTransitionStart", ((e,t,s)=>{
            !a.destroyed && a.autoplay.running && (s || !a.params.autoplay.disableOnInteraction ? M(!0, !0) : T())
        }
        )),
        n("sliderFirstMove", (()=>{
            !a.destroyed && a.autoplay.running && (a.params.autoplay.disableOnInteraction ? T() : (c = !0,
            u = !1,
            f = !1,
            m = setTimeout((()=>{
                f = !0,
                u = !0,
                M(!0)
            }
            ), 200)))
        }
        )),
        n("touchEnd", (()=>{
            if (!a.destroyed && a.autoplay.running && c) {
                if (clearTimeout(m),
                clearTimeout(t),
                a.params.autoplay.disableOnInteraction)
                    return u = !1,
                    void (c = !1);
                u && a.params.cssMode && C(),
                u = !1,
                c = !1
            }
        }
        )),
        n("slideChange", (()=>{
            !a.destroyed && a.autoplay.running && (h = !0)
        }
        )),
        Object.assign(a.autoplay, {
            start: S,
            stop: T,
            pause: M,
            resume: C
        })
    }
    , function(e) {
        let {swiper: t, extendParams: s, on: a} = e;
        s({
            thumbs: {
                swiper: null,
                multipleActiveThumbs: !0,
                autoScrollOffset: 0,
                slideThumbActiveClass: "swiper-slide-thumb-active",
                thumbsContainerClass: "swiper-thumbs"
            }
        });
        let r = !1
          , n = !1;
        function l() {
            const e = t.thumbs.swiper;
            if (!e || e.destroyed)
                return;
            const s = e.clickedIndex
              , i = e.clickedSlide;
            if (i && i.classList.contains(t.params.thumbs.slideThumbActiveClass))
                return;
            if (null == s)
                return;
            let a;
            a = e.params.loop ? parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"), 10) : s,
            t.params.loop ? t.slideToLoop(a) : t.slideTo(a)
        }
        function o() {
            const {thumbs: e} = t.params;
            if (r)
                return !1;
            r = !0;
            const s = t.constructor;
            if (e.swiper instanceof s)
                t.thumbs.swiper = e.swiper,
                Object.assign(t.thumbs.swiper.originalParams, {
                    watchSlidesProgress: !0,
                    slideToClickedSlide: !1
                }),
                Object.assign(t.thumbs.swiper.params, {
                    watchSlidesProgress: !0,
                    slideToClickedSlide: !1
                }),
                t.thumbs.swiper.update();
            else if (p(e.swiper)) {
                const i = Object.assign({}, e.swiper);
                Object.assign(i, {
                    watchSlidesProgress: !0,
                    slideToClickedSlide: !1
                }),
                t.thumbs.swiper = new s(i),
                n = !0
            }
            return t.thumbs.swiper.el.classList.add(t.params.thumbs.thumbsContainerClass),
            t.thumbs.swiper.on("tap", l),
            !0
        }
        function d(e) {
            const s = t.thumbs.swiper;
            if (!s || s.destroyed)
                return;
            const i = "auto" === s.params.slidesPerView ? s.slidesPerViewDynamic() : s.params.slidesPerView;
            let a = 1;
            const r = t.params.thumbs.slideThumbActiveClass;
            if (t.params.slidesPerView > 1 && !t.params.centeredSlides && (a = t.params.slidesPerView),
            t.params.thumbs.multipleActiveThumbs || (a = 1),
            a = Math.floor(a),
            s.slides.forEach((e=>e.classList.remove(r))),
            s.params.loop || s.params.virtual && s.params.virtual.enabled)
                for (let e = 0; e < a; e += 1)
                    f(s.slidesEl, `[data-swiper-slide-index="${t.realIndex + e}"]`).forEach((e=>{
                        e.classList.add(r)
                    }
                    ));
            else
                for (let e = 0; e < a; e += 1)
                    s.slides[t.realIndex + e] && s.slides[t.realIndex + e].classList.add(r);
            const n = t.params.thumbs.autoScrollOffset
              , l = n && !s.params.loop;
            if (t.realIndex !== s.realIndex || l) {
                const a = s.activeIndex;
                let r, o;
                if (s.params.loop) {
                    const e = s.slides.filter((e=>e.getAttribute("data-swiper-slide-index") === `${t.realIndex}`))[0];
                    r = s.slides.indexOf(e),
                    o = t.activeIndex > t.previousIndex ? "next" : "prev"
                } else
                    r = t.realIndex,
                    o = r > t.previousIndex ? "next" : "prev";
                l && (r += "next" === o ? n : -1 * n),
                s.visibleSlidesIndexes && s.visibleSlidesIndexes.indexOf(r) < 0 && (s.params.centeredSlides ? r = r > a ? r - Math.floor(i / 2) + 1 : r + Math.floor(i / 2) - 1 : r > a && s.params.slidesPerGroup,
                s.slideTo(r, e ? 0 : void 0))
            }
        }
        t.thumbs = {
            swiper: null
        },
        a("beforeInit", (()=>{
            const {thumbs: e} = t.params;
            if (e && e.swiper)
                if ("string" == typeof e.swiper || e.swiper instanceof HTMLElement) {
                    const s = i()
                      , a = ()=>{
                        const i = "string" == typeof e.swiper ? s.querySelector(e.swiper) : e.swiper;
                        if (i && i.swiper)
                            e.swiper = i.swiper,
                            o(),
                            d(!0);
                        else if (i) {
                            const s = a=>{
                                e.swiper = a.detail[0],
                                i.removeEventListener("init", s),
                                o(),
                                d(!0),
                                e.swiper.update(),
                                t.update()
                            }
                            ;
                            i.addEventListener("init", s)
                        }
                        return i
                    }
                      , r = ()=>{
                        if (t.destroyed)
                            return;
                        a() || requestAnimationFrame(r)
                    }
                    ;
                    requestAnimationFrame(r)
                } else
                    o(),
                    d(!0)
        }
        )),
        a("slideChange update resize observerUpdate", (()=>{
            d()
        }
        )),
        a("setTransition", ((e,s)=>{
            const i = t.thumbs.swiper;
            i && !i.destroyed && i.setTransition(s)
        }
        )),
        a("beforeDestroy", (()=>{
            const e = t.thumbs.swiper;
            e && !e.destroyed && n && e.destroy()
        }
        )),
        Object.assign(t.thumbs, {
            init: o,
            update: d
        })
    }
    , function(e) {
        let {swiper: t, extendParams: s, emit: i, once: a} = e;
        s({
            freeMode: {
                enabled: !1,
                momentum: !0,
                momentumRatio: 1,
                momentumBounce: !0,
                momentumBounceRatio: 1,
                momentumVelocityRatio: 1,
                sticky: !1,
                minimumVelocity: .02
            }
        }),
        Object.assign(t, {
            freeMode: {
                onTouchStart: function() {
                    if (t.params.cssMode)
                        return;
                    const e = t.getTranslate();
                    t.setTranslate(e),
                    t.setTransition(0),
                    t.touchEventsData.velocities.length = 0,
                    t.freeMode.onTouchEnd({
                        currentPos: t.rtl ? t.translate : -t.translate
                    })
                },
                onTouchMove: function() {
                    if (t.params.cssMode)
                        return;
                    const {touchEventsData: e, touches: s} = t;
                    0 === e.velocities.length && e.velocities.push({
                        position: s[t.isHorizontal() ? "startX" : "startY"],
                        time: e.touchStartTime
                    }),
                    e.velocities.push({
                        position: s[t.isHorizontal() ? "currentX" : "currentY"],
                        time: o()
                    })
                },
                onTouchEnd: function(e) {
                    let {currentPos: s} = e;
                    if (t.params.cssMode)
                        return;
                    const {params: r, wrapperEl: n, rtlTranslate: l, snapGrid: d, touchEventsData: p} = t
                      , c = o() - p.touchStartTime;
                    if (s < -t.minTranslate())
                        t.slideTo(t.activeIndex);
                    else if (s > -t.maxTranslate())
                        t.slides.length < d.length ? t.slideTo(d.length - 1) : t.slideTo(t.slides.length - 1);
                    else {
                        if (r.freeMode.momentum) {
                            if (p.velocities.length > 1) {
                                const e = p.velocities.pop()
                                  , s = p.velocities.pop()
                                  , i = e.position - s.position
                                  , a = e.time - s.time;
                                t.velocity = i / a,
                                t.velocity /= 2,
                                Math.abs(t.velocity) < r.freeMode.minimumVelocity && (t.velocity = 0),
                                (a > 150 || o() - e.time > 300) && (t.velocity = 0)
                            } else
                                t.velocity = 0;
                            t.velocity *= r.freeMode.momentumVelocityRatio,
                            p.velocities.length = 0;
                            let e = 1e3 * r.freeMode.momentumRatio;
                            const s = t.velocity * e;
                            let c = t.translate + s;
                            l && (c = -c);
                            let u, m = !1;
                            const h = 20 * Math.abs(t.velocity) * r.freeMode.momentumBounceRatio;
                            let f;
                            if (c < t.maxTranslate())
                                r.freeMode.momentumBounce ? (c + t.maxTranslate() < -h && (c = t.maxTranslate() - h),
                                u = t.maxTranslate(),
                                m = !0,
                                p.allowMomentumBounce = !0) : c = t.maxTranslate(),
                                r.loop && r.centeredSlides && (f = !0);
                            else if (c > t.minTranslate())
                                r.freeMode.momentumBounce ? (c - t.minTranslate() > h && (c = t.minTranslate() + h),
                                u = t.minTranslate(),
                                m = !0,
                                p.allowMomentumBounce = !0) : c = t.minTranslate(),
                                r.loop && r.centeredSlides && (f = !0);
                            else if (r.freeMode.sticky) {
                                let e;
                                for (let t = 0; t < d.length; t += 1)
                                    if (d[t] > -c) {
                                        e = t;
                                        break
                                    }
                                c = Math.abs(d[e] - c) < Math.abs(d[e - 1] - c) || "next" === t.swipeDirection ? d[e] : d[e - 1],
                                c = -c
                            }
                            if (f && a("transitionEnd", (()=>{
                                t.loopFix()
                            }
                            )),
                            0 !== t.velocity) {
                                if (e = l ? Math.abs((-c - t.translate) / t.velocity) : Math.abs((c - t.translate) / t.velocity),
                                r.freeMode.sticky) {
                                    const s = Math.abs((l ? -c : c) - t.translate)
                                      , i = t.slidesSizesGrid[t.activeIndex];
                                    e = s < i ? r.speed : s < 2 * i ? 1.5 * r.speed : 2.5 * r.speed
                                }
                            } else if (r.freeMode.sticky)
                                return void t.slideToClosest();
                            r.freeMode.momentumBounce && m ? (t.updateProgress(u),
                            t.setTransition(e),
                            t.setTranslate(c),
                            t.transitionStart(!0, t.swipeDirection),
                            t.animating = !0,
                            E(n, (()=>{
                                t && !t.destroyed && p.allowMomentumBounce && (i("momentumBounce"),
                                t.setTransition(r.speed),
                                setTimeout((()=>{
                                    t.setTranslate(u),
                                    E(n, (()=>{
                                        t && !t.destroyed && t.transitionEnd()
                                    }
                                    ))
                                }
                                ), 0))
                            }
                            ))) : t.velocity ? (i("_freeModeNoMomentumRelease"),
                            t.updateProgress(c),
                            t.setTransition(e),
                            t.setTranslate(c),
                            t.transitionStart(!0, t.swipeDirection),
                            t.animating || (t.animating = !0,
                            E(n, (()=>{
                                t && !t.destroyed && t.transitionEnd()
                            }
                            )))) : t.updateProgress(c),
                            t.updateActiveIndex(),
                            t.updateSlidesClasses()
                        } else {
                            if (r.freeMode.sticky)
                                return void t.slideToClosest();
                            r.freeMode && i("_freeModeNoMomentumRelease")
                        }
                        (!r.freeMode.momentum || c >= r.longSwipesMs) && (i("_freeModeStaticRelease"),
                        t.updateProgress(),
                        t.updateActiveIndex(),
                        t.updateSlidesClasses())
                    }
                }
            }
        })
    }
    , function(e) {
        let t, s, i, a, {swiper: r, extendParams: n, on: l} = e;
        n({
            grid: {
                rows: 1,
                fill: "column"
            }
        });
        const o = ()=>{
            let e = r.params.spaceBetween;
            return "string" == typeof e && e.indexOf("%") >= 0 ? e = parseFloat(e.replace("%", "")) / 100 * r.size : "string" == typeof e && (e = parseFloat(e)),
            e
        }
        ;
        l("init", (()=>{
            a = r.params.grid && r.params.grid.rows > 1
        }
        )),
        l("update", (()=>{
            const {params: e, el: t} = r
              , s = e.grid && e.grid.rows > 1;
            a && !s ? (t.classList.remove(`${e.containerModifierClass}grid`, `${e.containerModifierClass}grid-column`),
            i = 1,
            r.emitContainerClasses()) : !a && s && (t.classList.add(`${e.containerModifierClass}grid`),
            "column" === e.grid.fill && t.classList.add(`${e.containerModifierClass}grid-column`),
            r.emitContainerClasses()),
            a = s
        }
        )),
        r.grid = {
            initSlides: e=>{
                const {slidesPerView: a} = r.params
                  , {rows: n, fill: l} = r.params.grid
                  , o = r.virtual && r.params.virtual.enabled ? r.virtual.slides.length : e.length;
                i = Math.floor(o / n),
                t = Math.floor(o / n) === o / n ? o : Math.ceil(o / n) * n,
                "auto" !== a && "row" === l && (t = Math.max(t, a * n)),
                s = t / n
            }
            ,
            unsetSlides: ()=>{
                r.slides && r.slides.forEach((e=>{
                    e.swiperSlideGridSet && (e.style.height = "",
                    e.style[r.getDirectionLabel("margin-top")] = "")
                }
                ))
            }
            ,
            updateSlide: (e,a,n)=>{
                const {slidesPerGroup: l} = r.params
                  , d = o()
                  , {rows: p, fill: c} = r.params.grid
                  , u = r.virtual && r.params.virtual.enabled ? r.virtual.slides.length : n.length;
                let m, h, f;
                if ("row" === c && l > 1) {
                    const s = Math.floor(e / (l * p))
                      , i = e - p * l * s
                      , r = 0 === s ? l : Math.min(Math.ceil((u - s * p * l) / p), l);
                    f = Math.floor(i / r),
                    h = i - f * r + s * l,
                    m = h + f * t / p,
                    a.style.order = m
                } else
                    "column" === c ? (h = Math.floor(e / p),
                    f = e - h * p,
                    (h > i || h === i && f === p - 1) && (f += 1,
                    f >= p && (f = 0,
                    h += 1))) : (f = Math.floor(e / s),
                    h = e - f * s);
                a.row = f,
                a.column = h,
                a.style.height = `calc((100% - ${(p - 1) * d}px) / ${p})`,
                a.style[r.getDirectionLabel("margin-top")] = 0 !== f ? d && `${d}px` : "",
                a.swiperSlideGridSet = !0
            }
            ,
            updateWrapperSize: (e,s)=>{
                const {centeredSlides: i, roundLengths: a} = r.params
                  , n = o()
                  , {rows: l} = r.params.grid;
                if (r.virtualSize = (e + n) * t,
                r.virtualSize = Math.ceil(r.virtualSize / l) - n,
                r.params.cssMode || (r.wrapperEl.style[r.getDirectionLabel("width")] = `${r.virtualSize + n}px`),
                i) {
                    const e = [];
                    for (let t = 0; t < s.length; t += 1) {
                        let i = s[t];
                        a && (i = Math.floor(i)),
                        s[t] < r.virtualSize + s[0] && e.push(i)
                    }
                    s.splice(0, s.length),
                    s.push(...e)
                }
            }
        }
    }
    , function(e) {
        let {swiper: t} = e;
        Object.assign(t, {
            appendSlide: ie.bind(t),
            prependSlide: ae.bind(t),
            addSlide: re.bind(t),
            removeSlide: ne.bind(t),
            removeAllSlides: le.bind(t)
        })
    }
    , function(e) {
        let {swiper: t, extendParams: s, on: i} = e;
        s({
            fadeEffect: {
                crossFade: !1
            }
        }),
        oe({
            effect: "fade",
            swiper: t,
            on: i,
            setTranslate: ()=>{
                const {slides: e} = t;
                t.params.fadeEffect;
                for (let s = 0; s < e.length; s += 1) {
                    const e = t.slides[s];
                    let i = -e.swiperSlideOffset;
                    t.params.virtualTranslate || (i -= t.translate);
                    let a = 0;
                    t.isHorizontal() || (a = i,
                    i = 0);
                    const r = t.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(e.progress), 0) : 1 + Math.min(Math.max(e.progress, -1), 0)
                      , n = de(0, e);
                    n.style.opacity = r,
                    n.style.transform = `translate3d(${i}px, ${a}px, 0px)`
                }
            }
            ,
            setTransition: e=>{
                const s = t.slides.map((e=>h(e)));
                s.forEach((t=>{
                    t.style.transitionDuration = `${e}ms`
                }
                )),
                pe({
                    swiper: t,
                    duration: e,
                    transformElements: s,
                    allSlides: !0
                })
            }
            ,
            overwriteParams: ()=>({
                slidesPerView: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: !0,
                spaceBetween: 0,
                virtualTranslate: !t.params.cssMode
            })
        })
    }
    , function(e) {
        let {swiper: t, extendParams: s, on: i} = e;
        s({
            cubeEffect: {
                slideShadows: !0,
                shadow: !0,
                shadowOffset: 20,
                shadowScale: .94
            }
        });
        const a = (e,t,s)=>{
            let i = s ? e.querySelector(".swiper-slide-shadow-left") : e.querySelector(".swiper-slide-shadow-top")
              , a = s ? e.querySelector(".swiper-slide-shadow-right") : e.querySelector(".swiper-slide-shadow-bottom");
            i || (i = v("div", ("swiper-slide-shadow-cube swiper-slide-shadow-" + (s ? "left" : "top")).split(" ")),
            e.append(i)),
            a || (a = v("div", ("swiper-slide-shadow-cube swiper-slide-shadow-" + (s ? "right" : "bottom")).split(" ")),
            e.append(a)),
            i && (i.style.opacity = Math.max(-t, 0)),
            a && (a.style.opacity = Math.max(t, 0))
        }
        ;
        oe({
            effect: "cube",
            swiper: t,
            on: i,
            setTranslate: ()=>{
                const {el: e, wrapperEl: s, slides: i, width: r, height: n, rtlTranslate: l, size: o, browser: d} = t
                  , p = t.params.cubeEffect
                  , c = t.isHorizontal()
                  , u = t.virtual && t.params.virtual.enabled;
                let m, h = 0;
                p.shadow && (c ? (m = t.wrapperEl.querySelector(".swiper-cube-shadow"),
                m || (m = v("div", "swiper-cube-shadow"),
                t.wrapperEl.append(m)),
                m.style.height = `${r}px`) : (m = e.querySelector(".swiper-cube-shadow"),
                m || (m = v("div", "swiper-cube-shadow"),
                e.append(m))));
                for (let e = 0; e < i.length; e += 1) {
                    const t = i[e];
                    let s = e;
                    u && (s = parseInt(t.getAttribute("data-swiper-slide-index"), 10));
                    let r = 90 * s
                      , n = Math.floor(r / 360);
                    l && (r = -r,
                    n = Math.floor(-r / 360));
                    const d = Math.max(Math.min(t.progress, 1), -1);
                    let m = 0
                      , f = 0
                      , g = 0;
                    s % 4 == 0 ? (m = 4 * -n * o,
                    g = 0) : (s - 1) % 4 == 0 ? (m = 0,
                    g = 4 * -n * o) : (s - 2) % 4 == 0 ? (m = o + 4 * n * o,
                    g = o) : (s - 3) % 4 == 0 && (m = -o,
                    g = 3 * o + 4 * o * n),
                    l && (m = -m),
                    c || (f = m,
                    m = 0);
                    const v = `rotateX(${c ? 0 : -r}deg) rotateY(${c ? r : 0}deg) translate3d(${m}px, ${f}px, ${g}px)`;
                    d <= 1 && d > -1 && (h = 90 * s + 90 * d,
                    l && (h = 90 * -s - 90 * d)),
                    t.style.transform = v,
                    p.slideShadows && a(t, d, c)
                }
                if (s.style.transformOrigin = `50% 50% -${o / 2}px`,
                s.style["-webkit-transform-origin"] = `50% 50% -${o / 2}px`,
                p.shadow)
                    if (c)
                        m.style.transform = `translate3d(0px, ${r / 2 + p.shadowOffset}px, ${-r / 2}px) rotateX(90deg) rotateZ(0deg) scale(${p.shadowScale})`;
                    else {
                        const e = Math.abs(h) - 90 * Math.floor(Math.abs(h) / 90)
                          , t = 1.5 - (Math.sin(2 * e * Math.PI / 360) / 2 + Math.cos(2 * e * Math.PI / 360) / 2)
                          , s = p.shadowScale
                          , i = p.shadowScale / t
                          , a = p.shadowOffset;
                        m.style.transform = `scale3d(${s}, 1, ${i}) translate3d(0px, ${n / 2 + a}px, ${-n / 2 / i}px) rotateX(-90deg)`
                    }
                const f = (d.isSafari || d.isWebView) && d.needPerspectiveFix ? -o / 2 : 0;
                s.style.transform = `translate3d(0px,0,${f}px) rotateX(${t.isHorizontal() ? 0 : h}deg) rotateY(${t.isHorizontal() ? -h : 0}deg)`,
                s.style.setProperty("--swiper-cube-translate-z", `${f}px`)
            }
            ,
            setTransition: e=>{
                const {el: s, slides: i} = t;
                if (i.forEach((t=>{
                    t.style.transitionDuration = `${e}ms`,
                    t.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((t=>{
                        t.style.transitionDuration = `${e}ms`
                    }
                    ))
                }
                )),
                t.params.cubeEffect.shadow && !t.isHorizontal()) {
                    const t = s.querySelector(".swiper-cube-shadow");
                    t && (t.style.transitionDuration = `${e}ms`)
                }
            }
            ,
            recreateShadows: ()=>{
                const e = t.isHorizontal();
                t.slides.forEach((t=>{
                    const s = Math.max(Math.min(t.progress, 1), -1);
                    a(t, s, e)
                }
                ))
            }
            ,
            getEffectParams: ()=>t.params.cubeEffect,
            perspective: ()=>!0,
            overwriteParams: ()=>({
                slidesPerView: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: !0,
                resistanceRatio: 0,
                spaceBetween: 0,
                centeredSlides: !1,
                virtualTranslate: !0
            })
        })
    }
    , function(e) {
        let {swiper: t, extendParams: s, on: i} = e;
        s({
            flipEffect: {
                slideShadows: !0,
                limitRotation: !0
            }
        });
        const a = (e,s)=>{
            let i = t.isHorizontal() ? e.querySelector(".swiper-slide-shadow-left") : e.querySelector(".swiper-slide-shadow-top")
              , a = t.isHorizontal() ? e.querySelector(".swiper-slide-shadow-right") : e.querySelector(".swiper-slide-shadow-bottom");
            i || (i = ce("flip", e, t.isHorizontal() ? "left" : "top")),
            a || (a = ce("flip", e, t.isHorizontal() ? "right" : "bottom")),
            i && (i.style.opacity = Math.max(-s, 0)),
            a && (a.style.opacity = Math.max(s, 0))
        }
        ;
        oe({
            effect: "flip",
            swiper: t,
            on: i,
            setTranslate: ()=>{
                const {slides: e, rtlTranslate: s} = t
                  , i = t.params.flipEffect;
                for (let r = 0; r < e.length; r += 1) {
                    const n = e[r];
                    let l = n.progress;
                    t.params.flipEffect.limitRotation && (l = Math.max(Math.min(n.progress, 1), -1));
                    const o = n.swiperSlideOffset;
                    let d = -180 * l
                      , p = 0
                      , c = t.params.cssMode ? -o - t.translate : -o
                      , u = 0;
                    t.isHorizontal() ? s && (d = -d) : (u = c,
                    c = 0,
                    p = -d,
                    d = 0),
                    n.style.zIndex = -Math.abs(Math.round(l)) + e.length,
                    i.slideShadows && a(n, l);
                    const m = `translate3d(${c}px, ${u}px, 0px) rotateX(${p}deg) rotateY(${d}deg)`;
                    de(0, n).style.transform = m
                }
            }
            ,
            setTransition: e=>{
                const s = t.slides.map((e=>h(e)));
                s.forEach((t=>{
                    t.style.transitionDuration = `${e}ms`,
                    t.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((t=>{
                        t.style.transitionDuration = `${e}ms`
                    }
                    ))
                }
                )),
                pe({
                    swiper: t,
                    duration: e,
                    transformElements: s
                })
            }
            ,
            recreateShadows: ()=>{
                t.params.flipEffect,
                t.slides.forEach((e=>{
                    let s = e.progress;
                    t.params.flipEffect.limitRotation && (s = Math.max(Math.min(e.progress, 1), -1)),
                    a(e, s)
                }
                ))
            }
            ,
            getEffectParams: ()=>t.params.flipEffect,
            perspective: ()=>!0,
            overwriteParams: ()=>({
                slidesPerView: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: !0,
                spaceBetween: 0,
                virtualTranslate: !t.params.cssMode
            })
        })
    }
    , function(e) {
        let {swiper: t, extendParams: s, on: i} = e;
        s({
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                scale: 1,
                modifier: 1,
                slideShadows: !0
            }
        }),
        oe({
            effect: "coverflow",
            swiper: t,
            on: i,
            setTranslate: ()=>{
                const {width: e, height: s, slides: i, slidesSizesGrid: a} = t
                  , r = t.params.coverflowEffect
                  , n = t.isHorizontal()
                  , l = t.translate
                  , o = n ? e / 2 - l : s / 2 - l
                  , d = n ? r.rotate : -r.rotate
                  , p = r.depth;
                for (let e = 0, t = i.length; e < t; e += 1) {
                    const t = i[e]
                      , s = a[e]
                      , l = (o - t.swiperSlideOffset - s / 2) / s
                      , c = "function" == typeof r.modifier ? r.modifier(l) : l * r.modifier;
                    let u = n ? d * c : 0
                      , m = n ? 0 : d * c
                      , h = -p * Math.abs(c)
                      , f = r.stretch;
                    "string" == typeof f && -1 !== f.indexOf("%") && (f = parseFloat(r.stretch) / 100 * s);
                    let g = n ? 0 : f * c
                      , v = n ? f * c : 0
                      , w = 1 - (1 - r.scale) * Math.abs(c);
                    Math.abs(v) < .001 && (v = 0),
                    Math.abs(g) < .001 && (g = 0),
                    Math.abs(h) < .001 && (h = 0),
                    Math.abs(u) < .001 && (u = 0),
                    Math.abs(m) < .001 && (m = 0),
                    Math.abs(w) < .001 && (w = 0);
                    const b = `translate3d(${v}px,${g}px,${h}px)  rotateX(${m}deg) rotateY(${u}deg) scale(${w})`;
                    if (de(0, t).style.transform = b,
                    t.style.zIndex = 1 - Math.abs(Math.round(c)),
                    r.slideShadows) {
                        let e = n ? t.querySelector(".swiper-slide-shadow-left") : t.querySelector(".swiper-slide-shadow-top")
                          , s = n ? t.querySelector(".swiper-slide-shadow-right") : t.querySelector(".swiper-slide-shadow-bottom");
                        e || (e = ce("coverflow", t, n ? "left" : "top")),
                        s || (s = ce("coverflow", t, n ? "right" : "bottom")),
                        e && (e.style.opacity = c > 0 ? c : 0),
                        s && (s.style.opacity = -c > 0 ? -c : 0)
                    }
                }
            }
            ,
            setTransition: e=>{
                t.slides.map((e=>h(e))).forEach((t=>{
                    t.style.transitionDuration = `${e}ms`,
                    t.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((t=>{
                        t.style.transitionDuration = `${e}ms`
                    }
                    ))
                }
                ))
            }
            ,
            perspective: ()=>!0,
            overwriteParams: ()=>({
                watchSlidesProgress: !0
            })
        })
    }
    , function(e) {
        let {swiper: t, extendParams: s, on: i} = e;
        s({
            creativeEffect: {
                limitProgress: 1,
                shadowPerProgress: !1,
                progressMultiplier: 1,
                perspective: !0,
                prev: {
                    translate: [0, 0, 0],
                    rotate: [0, 0, 0],
                    opacity: 1,
                    scale: 1
                },
                next: {
                    translate: [0, 0, 0],
                    rotate: [0, 0, 0],
                    opacity: 1,
                    scale: 1
                }
            }
        });
        const a = e=>"string" == typeof e ? e : `${e}px`;
        oe({
            effect: "creative",
            swiper: t,
            on: i,
            setTranslate: ()=>{
                const {slides: e, wrapperEl: s, slidesSizesGrid: i} = t
                  , r = t.params.creativeEffect
                  , {progressMultiplier: n} = r
                  , l = t.params.centeredSlides;
                if (l) {
                    const e = i[0] / 2 - t.params.slidesOffsetBefore || 0;
                    s.style.transform = `translateX(calc(50% - ${e}px))`
                }
                for (let s = 0; s < e.length; s += 1) {
                    const i = e[s]
                      , o = i.progress
                      , d = Math.min(Math.max(i.progress, -r.limitProgress), r.limitProgress);
                    let p = d;
                    l || (p = Math.min(Math.max(i.originalProgress, -r.limitProgress), r.limitProgress));
                    const c = i.swiperSlideOffset
                      , u = [t.params.cssMode ? -c - t.translate : -c, 0, 0]
                      , m = [0, 0, 0];
                    let h = !1;
                    t.isHorizontal() || (u[1] = u[0],
                    u[0] = 0);
                    let f = {
                        translate: [0, 0, 0],
                        rotate: [0, 0, 0],
                        scale: 1,
                        opacity: 1
                    };
                    d < 0 ? (f = r.next,
                    h = !0) : d > 0 && (f = r.prev,
                    h = !0),
                    u.forEach(((e,t)=>{
                        u[t] = `calc(${e}px + (${a(f.translate[t])} * ${Math.abs(d * n)}))`
                    }
                    )),
                    m.forEach(((e,t)=>{
                        m[t] = f.rotate[t] * Math.abs(d * n)
                    }
                    )),
                    i.style.zIndex = -Math.abs(Math.round(o)) + e.length;
                    const g = u.join(", ")
                      , v = `rotateX(${m[0]}deg) rotateY(${m[1]}deg) rotateZ(${m[2]}deg)`
                      , w = p < 0 ? `scale(${1 + (1 - f.scale) * p * n})` : `scale(${1 - (1 - f.scale) * p * n})`
                      , b = p < 0 ? 1 + (1 - f.opacity) * p * n : 1 - (1 - f.opacity) * p * n
                      , y = `translate3d(${g}) ${v} ${w}`;
                    if (h && f.shadow || !h) {
                        let e = i.querySelector(".swiper-slide-shadow");
                        if (!e && f.shadow && (e = ce("creative", i)),
                        e) {
                            const t = r.shadowPerProgress ? d * (1 / r.limitProgress) : d;
                            e.style.opacity = Math.min(Math.max(Math.abs(t), 0), 1)
                        }
                    }
                    const x = de(0, i);
                    x.style.transform = y,
                    x.style.opacity = b,
                    f.origin && (x.style.transformOrigin = f.origin)
                }
            }
            ,
            setTransition: e=>{
                const s = t.slides.map((e=>h(e)));
                s.forEach((t=>{
                    t.style.transitionDuration = `${e}ms`,
                    t.querySelectorAll(".swiper-slide-shadow").forEach((t=>{
                        t.style.transitionDuration = `${e}ms`
                    }
                    ))
                }
                )),
                pe({
                    swiper: t,
                    duration: e,
                    transformElements: s,
                    allSlides: !0
                })
            }
            ,
            perspective: ()=>t.params.creativeEffect.perspective,
            overwriteParams: ()=>({
                watchSlidesProgress: !0,
                virtualTranslate: !t.params.cssMode
            })
        })
    }
    , function(e) {
        let {swiper: t, extendParams: s, on: i} = e;
        s({
            cardsEffect: {
                slideShadows: !0,
                rotate: !0,
                perSlideRotate: 2,
                perSlideOffset: 8
            }
        }),
        oe({
            effect: "cards",
            swiper: t,
            on: i,
            setTranslate: ()=>{
                const {slides: e, activeIndex: s, rtlTranslate: i} = t
                  , a = t.params.cardsEffect
                  , {startTranslate: r, isTouched: n} = t.touchEventsData
                  , l = i ? -t.translate : t.translate;
                for (let o = 0; o < e.length; o += 1) {
                    const d = e[o]
                      , p = d.progress
                      , c = Math.min(Math.max(p, -4), 4);
                    let u = d.swiperSlideOffset;
                    t.params.centeredSlides && !t.params.cssMode && (t.wrapperEl.style.transform = `translateX(${t.minTranslate()}px)`),
                    t.params.centeredSlides && t.params.cssMode && (u -= e[0].swiperSlideOffset);
                    let m = t.params.cssMode ? -u - t.translate : -u
                      , h = 0;
                    const f = -100 * Math.abs(c);
                    let g = 1
                      , v = -a.perSlideRotate * c
                      , w = a.perSlideOffset - .75 * Math.abs(c);
                    const b = t.virtual && t.params.virtual.enabled ? t.virtual.from + o : o
                      , y = (b === s || b === s - 1) && c > 0 && c < 1 && (n || t.params.cssMode) && l < r
                      , x = (b === s || b === s + 1) && c < 0 && c > -1 && (n || t.params.cssMode) && l > r;
                    if (y || x) {
                        const e = (1 - Math.abs((Math.abs(c) - .5) / .5)) ** .5;
                        v += -28 * c * e,
                        g += -.5 * e,
                        w += 96 * e,
                        h = -25 * e * Math.abs(c) + "%"
                    }
                    if (m = c < 0 ? `calc(${m}px ${i ? "-" : "+"} (${w * Math.abs(c)}%))` : c > 0 ? `calc(${m}px ${i ? "-" : "+"} (-${w * Math.abs(c)}%))` : `${m}px`,
                    !t.isHorizontal()) {
                        const e = h;
                        h = m,
                        m = e
                    }
                    const E = c < 0 ? "" + (1 + (1 - g) * c) : "" + (1 - (1 - g) * c)
                      , S = `\n        translate3d(${m}, ${h}, ${f}px)\n        rotateZ(${a.rotate ? i ? -v : v : 0}deg)\n        scale(${E})\n      `;
                    if (a.slideShadows) {
                        let e = d.querySelector(".swiper-slide-shadow");
                        e || (e = ce("cards", d)),
                        e && (e.style.opacity = Math.min(Math.max((Math.abs(c) - .5) / .5, 0), 1))
                    }
                    d.style.zIndex = -Math.abs(Math.round(p)) + e.length;
                    de(0, d).style.transform = S
                }
            }
            ,
            setTransition: e=>{
                const s = t.slides.map((e=>h(e)));
                s.forEach((t=>{
                    t.style.transitionDuration = `${e}ms`,
                    t.querySelectorAll(".swiper-slide-shadow").forEach((t=>{
                        t.style.transitionDuration = `${e}ms`
                    }
                    ))
                }
                )),
                pe({
                    swiper: t,
                    duration: e,
                    transformElements: s
                })
            }
            ,
            perspective: ()=>!0,
            overwriteParams: ()=>({
                watchSlidesProgress: !0,
                virtualTranslate: !t.params.cssMode
            })
        })
    }
    ];
    ee.use(ue);
    const me = ["eventsPrefix", "injectStyles", "injectStylesUrls", "modules", "init", "_direction", "oneWayMovement", "touchEventsTarget", "initialSlide", "_speed", "cssMode", "updateOnWindowResize", "resizeObserver", "nested", "focusableElements", "_enabled", "_width", "_height", "preventInteractionOnTransition", "userAgent", "url", "_edgeSwipeDetection", "_edgeSwipeThreshold", "_freeMode", "_autoHeight", "setWrapperSize", "virtualTranslate", "_effect", "breakpoints", "breakpointsBase", "_spaceBetween", "_slidesPerView", "maxBackfaceHiddenSlides", "_grid", "_slidesPerGroup", "_slidesPerGroupSkip", "_slidesPerGroupAuto", "_centeredSlides", "_centeredSlidesBounds", "_slidesOffsetBefore", "_slidesOffsetAfter", "normalizeSlideIndex", "_centerInsufficientSlides", "_watchOverflow", "roundLengths", "touchRatio", "touchAngle", "simulateTouch", "_shortSwipes", "_longSwipes", "longSwipesRatio", "longSwipesMs", "_followFinger", "allowTouchMove", "_threshold", "touchMoveStopPropagation", "touchStartPreventDefault", "touchStartForcePreventDefault", "touchReleaseOnEdges", "uniqueNavElements", "_resistance", "_resistanceRatio", "_watchSlidesProgress", "_grabCursor", "preventClicks", "preventClicksPropagation", "_slideToClickedSlide", "_loop", "loopAdditionalSlides", "loopAddBlankSlides", "loopPreventsSliding", "_rewind", "_allowSlidePrev", "_allowSlideNext", "_swipeHandler", "_noSwiping", "noSwipingClass", "noSwipingSelector", "passiveListeners", "containerModifierClass", "slideClass", "slideActiveClass", "slideVisibleClass", "slideFullyVisibleClass", "slideNextClass", "slidePrevClass", "slideBlankClass", "wrapperClass", "lazyPreloaderClass", "lazyPreloadPrevNext", "runCallbacksOnInit", "observer", "observeParents", "observeSlideChildren", "a11y", "_autoplay", "_controller", "coverflowEffect", "cubeEffect", "fadeEffect", "flipEffect", "creativeEffect", "cardsEffect", "hashNavigation", "history", "keyboard", "mousewheel", "_navigation", "_pagination", "parallax", "_scrollbar", "_thumbs", "virtual", "zoom", "control"];
    function he(e) {
        return "object" == typeof e && null !== e && e.constructor && "Object" === Object.prototype.toString.call(e).slice(8, -1) && !e.__swiper__
    }
    function fe(e, t) {
        const s = ["__proto__", "constructor", "prototype"];
        Object.keys(t).filter((e=>s.indexOf(e) < 0)).forEach((s=>{
            void 0 === e[s] ? e[s] = t[s] : he(t[s]) && he(e[s]) && Object.keys(t[s]).length > 0 ? t[s].__swiper__ ? e[s] = t[s] : fe(e[s], t[s]) : e[s] = t[s]
        }
        ))
    }
    function ge(e) {
        return void 0 === e && (e = ""),
        e.replace(/-[a-z]/g, (e=>e.toUpperCase().replace("-", "")))
    }
    const ve = e=>{
        if (parseFloat(e) === Number(e))
            return Number(e);
        if ("true" === e)
            return !0;
        if ("" === e)
            return !0;
        if ("false" === e)
            return !1;
        if ("null" === e)
            return null;
        if ("undefined" !== e) {
            if ("string" == typeof e && e.includes("{") && e.includes("}") && e.includes('"')) {
                let t;
                try {
                    t = JSON.parse(e)
                } catch (s) {
                    t = e
                }
                return t
            }
            return e
        }
    }
      , we = ["a11y", "autoplay", "controller", "cards-effect", "coverflow-effect", "creative-effect", "cube-effect", "fade-effect", "flip-effect", "free-mode", "grid", "hash-navigation", "history", "keyboard", "mousewheel", "navigation", "pagination", "parallax", "scrollbar", "thumbs", "virtual", "zoom"];
    function be(e, t, s) {
        const i = {}
          , a = {};
        fe(i, K);
        const r = [...me, "on"]
          , n = r.map((e=>e.replace(/_/, "")));
        r.forEach((t=>{
            t = t.replace("_", ""),
            void 0 !== e[t] && (a[t] = e[t])
        }
        ));
        const l = [...e.attributes];
        return "string" == typeof t && void 0 !== s && l.push({
            name: t,
            value: he(s) ? {
                ...s
            } : s
        }),
        l.forEach((e=>{
            const t = we.filter((t=>0 === e.name.indexOf(`${t}-`)))[0];
            if (t) {
                const s = ge(t)
                  , i = ge(e.name.split(`${t}-`)[1]);
                void 0 === a[s] && (a[s] = {}),
                !0 === a[s] && (a[s] = {
                    enabled: !0
                }),
                a[s][i] = ve(e.value)
            } else {
                const t = ge(e.name);
                if (!n.includes(t))
                    return;
                const s = ve(e.value);
                a[t] && we.includes(e.name) && !he(s) ? (a[t].constructor !== Object && (a[t] = {}),
                a[t].enabled = !!s) : a[t] = s
            }
        }
        )),
        fe(i, a),
        i.navigation ? i.navigation = {
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
            ...!0 !== i.navigation ? i.navigation : {}
        } : !1 === i.navigation && delete i.navigation,
        i.scrollbar ? i.scrollbar = {
            el: ".swiper-scrollbar",
            ...!0 !== i.scrollbar ? i.scrollbar : {}
        } : !1 === i.scrollbar && delete i.scrollbar,
        i.pagination ? i.pagination = {
            el: ".swiper-pagination",
            ...!0 !== i.pagination ? i.pagination : {}
        } : !1 === i.pagination && delete i.pagination,
        {
            params: i,
            passedParams: a
        }
    }
    const ye = ":host{--swiper-theme-color:#007aff}:host{position:relative;display:block;margin-left:auto;margin-right:auto;z-index:1}.swiper{width:100%;height:100%;margin-left:auto;margin-right:auto;position:relative;overflow:hidden;list-style:none;padding:0;z-index:1;display:block}.swiper-vertical>.swiper-wrapper{flex-direction:column}.swiper-wrapper{position:relative;width:100%;height:100%;z-index:1;display:flex;transition-property:transform;transition-timing-function:var(--swiper-wrapper-transition-timing-function,initial);box-sizing:content-box}.swiper-android ::slotted(swiper-slide),.swiper-ios ::slotted(swiper-slide),.swiper-wrapper{transform:translate3d(0px,0,0)}.swiper-horizontal{touch-action:pan-y}.swiper-vertical{touch-action:pan-x}::slotted(swiper-slide){flex-shrink:0;width:100%;height:100%;position:relative;transition-property:transform;display:block}::slotted(.swiper-slide-invisible-blank){visibility:hidden}.swiper-autoheight,.swiper-autoheight ::slotted(swiper-slide){height:auto}.swiper-autoheight .swiper-wrapper{align-items:flex-start;transition-property:transform,height}.swiper-backface-hidden ::slotted(swiper-slide){transform:translateZ(0);-webkit-backface-visibility:hidden;backface-visibility:hidden}.swiper-3d.swiper-css-mode .swiper-wrapper{perspective:1200px}.swiper-3d .swiper-wrapper{transform-style:preserve-3d}.swiper-3d{perspective:1200px}.swiper-3d .swiper-cube-shadow,.swiper-3d ::slotted(swiper-slide){transform-style:preserve-3d}.swiper-css-mode>.swiper-wrapper{overflow:auto;scrollbar-width:none;-ms-overflow-style:none}.swiper-css-mode>.swiper-wrapper::-webkit-scrollbar{display:none}.swiper-css-mode ::slotted(swiper-slide){scroll-snap-align:start start}.swiper-css-mode.swiper-horizontal>.swiper-wrapper{scroll-snap-type:x mandatory}.swiper-css-mode.swiper-vertical>.swiper-wrapper{scroll-snap-type:y mandatory}.swiper-css-mode.swiper-free-mode>.swiper-wrapper{scroll-snap-type:none}.swiper-css-mode.swiper-free-mode ::slotted(swiper-slide){scroll-snap-align:none}.swiper-css-mode.swiper-centered>.swiper-wrapper::before{content:'';flex-shrink:0;order:9999}.swiper-css-mode.swiper-centered ::slotted(swiper-slide){scroll-snap-align:center center;scroll-snap-stop:always}.swiper-css-mode.swiper-centered.swiper-horizontal ::slotted(swiper-slide):first-child{margin-inline-start:var(--swiper-centered-offset-before)}.swiper-css-mode.swiper-centered.swiper-horizontal>.swiper-wrapper::before{height:100%;min-height:1px;width:var(--swiper-centered-offset-after)}.swiper-css-mode.swiper-centered.swiper-vertical ::slotted(swiper-slide):first-child{margin-block-start:var(--swiper-centered-offset-before)}.swiper-css-mode.swiper-centered.swiper-vertical>.swiper-wrapper::before{width:100%;min-width:1px;height:var(--swiper-centered-offset-after)}.swiper-virtual ::slotted(swiper-slide){-webkit-backface-visibility:hidden;transform:translateZ(0)}.swiper-virtual.swiper-css-mode .swiper-wrapper::after{content:'';position:absolute;left:0;top:0;pointer-events:none}.swiper-virtual.swiper-css-mode.swiper-horizontal .swiper-wrapper::after{height:1px;width:var(--swiper-virtual-size)}.swiper-virtual.swiper-css-mode.swiper-vertical .swiper-wrapper::after{width:1px;height:var(--swiper-virtual-size)}:host{--swiper-navigation-size:44px}.swiper-button-next,.swiper-button-prev{position:absolute;top:var(--swiper-navigation-top-offset,50%);width:calc(var(--swiper-navigation-size)/ 44 * 27);height:var(--swiper-navigation-size);margin-top:calc(0px - (var(--swiper-navigation-size)/ 2));z-index:10;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--swiper-navigation-color,var(--swiper-theme-color))}.swiper-button-next.swiper-button-disabled,.swiper-button-prev.swiper-button-disabled{opacity:.35;cursor:auto;pointer-events:none}.swiper-button-next.swiper-button-hidden,.swiper-button-prev.swiper-button-hidden{opacity:0;cursor:auto;pointer-events:none}.swiper-navigation-disabled .swiper-button-next,.swiper-navigation-disabled .swiper-button-prev{display:none!important}.swiper-button-next svg,.swiper-button-prev svg{width:100%;height:100%;object-fit:contain;transform-origin:center}.swiper-rtl .swiper-button-next svg,.swiper-rtl .swiper-button-prev svg{transform:rotate(180deg)}.swiper-button-prev,.swiper-rtl .swiper-button-next{left:var(--swiper-navigation-sides-offset,10px);right:auto}.swiper-button-next,.swiper-rtl .swiper-button-prev{right:var(--swiper-navigation-sides-offset,10px);left:auto}.swiper-button-lock{display:none}.swiper-pagination{position:absolute;text-align:center;transition:.3s opacity;transform:translate3d(0,0,0);z-index:10}.swiper-pagination.swiper-pagination-hidden{opacity:0}.swiper-pagination-disabled>.swiper-pagination,.swiper-pagination.swiper-pagination-disabled{display:none!important}.swiper-horizontal>.swiper-pagination-bullets,.swiper-pagination-bullets.swiper-pagination-horizontal,.swiper-pagination-custom,.swiper-pagination-fraction{bottom:var(--swiper-pagination-bottom,8px);top:var(--swiper-pagination-top,auto);left:0;width:100%}.swiper-pagination-bullets-dynamic{overflow:hidden;font-size:0}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{transform:scale(.33);position:relative}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active{transform:scale(1)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-main{transform:scale(1)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev{transform:scale(.66)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev-prev{transform:scale(.33)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next{transform:scale(.66)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next-next{transform:scale(.33)}.swiper-pagination-bullet{width:var(--swiper-pagination-bullet-width,var(--swiper-pagination-bullet-size,8px));height:var(--swiper-pagination-bullet-height,var(--swiper-pagination-bullet-size,8px));display:inline-block;border-radius:var(--swiper-pagination-bullet-border-radius,50%);background:var(--swiper-pagination-bullet-inactive-color,#000);opacity:var(--swiper-pagination-bullet-inactive-opacity, .2)}button.swiper-pagination-bullet{border:none;margin:0;padding:0;box-shadow:none;-webkit-appearance:none;appearance:none}.swiper-pagination-clickable .swiper-pagination-bullet{cursor:pointer}.swiper-pagination-bullet:only-child{display:none!important}.swiper-pagination-bullet-active{opacity:var(--swiper-pagination-bullet-opacity, 1);background:var(--swiper-pagination-color,var(--swiper-theme-color))}.swiper-pagination-vertical.swiper-pagination-bullets,.swiper-vertical>.swiper-pagination-bullets{right:var(--swiper-pagination-right,8px);left:var(--swiper-pagination-left,auto);top:50%;transform:translate3d(0px,-50%,0)}.swiper-pagination-vertical.swiper-pagination-bullets .swiper-pagination-bullet,.swiper-vertical>.swiper-pagination-bullets .swiper-pagination-bullet{margin:var(--swiper-pagination-bullet-vertical-gap,6px) 0;display:block}.swiper-pagination-vertical.swiper-pagination-bullets.swiper-pagination-bullets-dynamic,.swiper-vertical>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic{top:50%;transform:translateY(-50%);width:8px}.swiper-pagination-vertical.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet,.swiper-vertical>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{display:inline-block;transition:.2s transform,.2s top}.swiper-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet,.swiper-pagination-horizontal.swiper-pagination-bullets .swiper-pagination-bullet{margin:0 var(--swiper-pagination-bullet-horizontal-gap,4px)}.swiper-horizontal>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic,.swiper-pagination-horizontal.swiper-pagination-bullets.swiper-pagination-bullets-dynamic{left:50%;transform:translateX(-50%);white-space:nowrap}.swiper-horizontal>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet,.swiper-pagination-horizontal.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{transition:.2s transform,.2s left}.swiper-horizontal.swiper-rtl>.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{transition:.2s transform,.2s right}.swiper-pagination-fraction{color:var(--swiper-pagination-fraction-color,inherit)}.swiper-pagination-progressbar{background:var(--swiper-pagination-progressbar-bg-color,rgba(0,0,0,.25));position:absolute}.swiper-pagination-progressbar .swiper-pagination-progressbar-fill{background:var(--swiper-pagination-color,var(--swiper-theme-color));position:absolute;left:0;top:0;width:100%;height:100%;transform:scale(0);transform-origin:left top}.swiper-rtl .swiper-pagination-progressbar .swiper-pagination-progressbar-fill{transform-origin:right top}.swiper-horizontal>.swiper-pagination-progressbar,.swiper-pagination-progressbar.swiper-pagination-horizontal,.swiper-pagination-progressbar.swiper-pagination-vertical.swiper-pagination-progressbar-opposite,.swiper-vertical>.swiper-pagination-progressbar.swiper-pagination-progressbar-opposite{width:100%;height:var(--swiper-pagination-progressbar-size,4px);left:0;top:0}.swiper-horizontal>.swiper-pagination-progressbar.swiper-pagination-progressbar-opposite,.swiper-pagination-progressbar.swiper-pagination-horizontal.swiper-pagination-progressbar-opposite,.swiper-pagination-progressbar.swiper-pagination-vertical,.swiper-vertical>.swiper-pagination-progressbar{width:var(--swiper-pagination-progressbar-size,4px);height:100%;left:0;top:0}.swiper-pagination-lock{display:none}.swiper-scrollbar{border-radius:var(--swiper-scrollbar-border-radius,10px);position:relative;touch-action:none;background:var(--swiper-scrollbar-bg-color,rgba(0,0,0,.1))}.swiper-scrollbar-disabled>.swiper-scrollbar,.swiper-scrollbar.swiper-scrollbar-disabled{display:none!important}.swiper-horizontal>.swiper-scrollbar,.swiper-scrollbar.swiper-scrollbar-horizontal{position:absolute;left:var(--swiper-scrollbar-sides-offset,1%);bottom:var(--swiper-scrollbar-bottom,4px);top:var(--swiper-scrollbar-top,auto);z-index:50;height:var(--swiper-scrollbar-size,4px);width:calc(100% - 2 * var(--swiper-scrollbar-sides-offset,1%))}.swiper-scrollbar.swiper-scrollbar-vertical,.swiper-vertical>.swiper-scrollbar{position:absolute;left:var(--swiper-scrollbar-left,auto);right:var(--swiper-scrollbar-right,4px);top:var(--swiper-scrollbar-sides-offset,1%);z-index:50;width:var(--swiper-scrollbar-size,4px);height:calc(100% - 2 * var(--swiper-scrollbar-sides-offset,1%))}.swiper-scrollbar-drag{height:100%;width:100%;position:relative;background:var(--swiper-scrollbar-drag-bg-color,rgba(0,0,0,.5));border-radius:var(--swiper-scrollbar-border-radius,10px);left:0;top:0}.swiper-scrollbar-cursor-drag{cursor:move}.swiper-scrollbar-lock{display:none}::slotted(.swiper-slide-zoomed){cursor:move;touch-action:none}.swiper .swiper-notification{position:absolute;left:0;top:0;pointer-events:none;opacity:0;z-index:-1000}.swiper-free-mode>.swiper-wrapper{transition-timing-function:ease-out;margin:0 auto}.swiper-grid>.swiper-wrapper{flex-wrap:wrap}.swiper-grid-column>.swiper-wrapper{flex-wrap:wrap;flex-direction:column}.swiper-fade.swiper-free-mode ::slotted(swiper-slide){transition-timing-function:ease-out}.swiper-fade ::slotted(swiper-slide){pointer-events:none;transition-property:opacity}.swiper-fade ::slotted(swiper-slide) ::slotted(swiper-slide){pointer-events:none}.swiper-fade ::slotted(.swiper-slide-active){pointer-events:auto}.swiper-fade ::slotted(.swiper-slide-active) ::slotted(.swiper-slide-active){pointer-events:auto}.swiper-cube{overflow:visible}.swiper-cube ::slotted(swiper-slide){pointer-events:none;-webkit-backface-visibility:hidden;backface-visibility:hidden;z-index:1;visibility:hidden;transform-origin:0 0;width:100%;height:100%}.swiper-cube ::slotted(swiper-slide) ::slotted(swiper-slide){pointer-events:none}.swiper-cube.swiper-rtl ::slotted(swiper-slide){transform-origin:100% 0}.swiper-cube ::slotted(.swiper-slide-active),.swiper-cube ::slotted(.swiper-slide-active) ::slotted(.swiper-slide-active){pointer-events:auto}.swiper-cube ::slotted(.swiper-slide-active),.swiper-cube ::slotted(.swiper-slide-next),.swiper-cube ::slotted(.swiper-slide-prev){pointer-events:auto;visibility:visible}.swiper-cube .swiper-cube-shadow{position:absolute;left:0;bottom:0px;width:100%;height:100%;opacity:.6;z-index:0}.swiper-cube .swiper-cube-shadow:before{content:'';background:#000;position:absolute;left:0;top:0;bottom:0;right:0;filter:blur(50px)}.swiper-cube ::slotted(.swiper-slide-next)+::slotted(swiper-slide){pointer-events:auto;visibility:visible}.swiper-flip{overflow:visible}.swiper-flip ::slotted(swiper-slide){pointer-events:none;-webkit-backface-visibility:hidden;backface-visibility:hidden;z-index:1}.swiper-flip ::slotted(swiper-slide) ::slotted(swiper-slide){pointer-events:none}.swiper-flip ::slotted(.swiper-slide-active),.swiper-flip ::slotted(.swiper-slide-active) ::slotted(.swiper-slide-active){pointer-events:auto}.swiper-creative ::slotted(swiper-slide){-webkit-backface-visibility:hidden;backface-visibility:hidden;overflow:hidden;transition-property:transform,opacity,height}.swiper-cards{overflow:visible}.swiper-cards ::slotted(swiper-slide){transform-origin:center bottom;-webkit-backface-visibility:hidden;backface-visibility:hidden;overflow:hidden}";
    const xe = "undefined" == typeof window || "undefined" == typeof HTMLElement ? class {
    }
    : HTMLElement
      , Ee = '<svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z" fill="currentColor"/></svg>\n    '
      , Se = (e,t)=>{
        if ("undefined" != typeof CSSStyleSheet && e.adoptedStyleSheets) {
            const s = new CSSStyleSheet;
            s.replaceSync(t),
            e.adoptedStyleSheets = [s]
        } else {
            const s = document.createElement("style");
            s.rel = "stylesheet",
            s.textContent = t,
            e.appendChild(s)
        }
    }
    ;
    class Te extends xe {
        constructor() {
            super(),
            this.attachShadow({
                mode: "open"
            })
        }
        static get nextButtonSvg() {
            return Ee
        }
        static get prevButtonSvg() {
            return Ee.replace("/></svg>", ' transform-origin="center" transform="rotate(180)"/></svg>')
        }
        cssStyles() {
            return [ye, ...this.injectStyles && Array.isArray(this.injectStyles) ? this.injectStyles : []].join("\n")
        }
        cssLinks() {
            return this.injectStylesUrls || []
        }
        calcSlideSlots() {
            const e = this.slideSlots || 0
              , t = [...this.querySelectorAll("[slot^=slide-]")].map((e=>parseInt(e.getAttribute("slot").split("slide-")[1], 10)));
            if (this.slideSlots = t.length ? Math.max(...t) + 1 : 0,
            this.rendered)
                if (this.slideSlots > e)
                    for (let t = e; t < this.slideSlots; t += 1) {
                        const e = document.createElement("swiper-slide");
                        e.setAttribute("part", `slide slide-${t + 1}`);
                        const s = document.createElement("slot");
                        s.setAttribute("name", `slide-${t + 1}`),
                        e.appendChild(s),
                        this.shadowRoot.querySelector(".swiper-wrapper").appendChild(e)
                    }
                else if (this.slideSlots < e) {
                    const e = this.swiper.slides;
                    for (let t = e.length - 1; t >= 0; t -= 1)
                        t > this.slideSlots && e[t].remove()
                }
        }
        render() {
            if (this.rendered)
                return;
            this.calcSlideSlots();
            let e = this.cssStyles();
            this.slideSlots > 0 && (e = e.replace(/::slotted\(([a-z-0-9.]*)\)/g, "$1")),
            e.length && Se(this.shadowRoot, e),
            this.cssLinks().forEach((e=>{
                if (this.shadowRoot.querySelector(`link[href="${e}"]`))
                    return;
                const t = document.createElement("link");
                t.rel = "stylesheet",
                t.href = e,
                this.shadowRoot.appendChild(t)
            }
            ));
            const t = document.createElement("div");
            var s;
            t.classList.add("swiper"),
            t.part = "layout",
            t.innerHTML = `\n      <slot name="container-start"></slot>\n      <div class="swiper-wrapper" part="wrapper">\n        <slot></slot>\n        ${Array.from({
                length: this.slideSlots
            }).map(((e,t)=>`\n        <swiper-slide part="slide slide-${t}">\n          <slot name="slide-${t}"></slot>\n        </swiper-slide>\n        `)).join("")}\n      </div>\n      <slot name="container-end"></slot>\n      ${s = this.passedParams,
            void 0 === s && (s = {}),
            s.navigation && void 0 === s.navigation.nextEl && void 0 === s.navigation.prevEl ? `\n        <div part="button-prev" class="swiper-button-prev">${this.constructor.prevButtonSvg}</div>\n        <div part="button-next" class="swiper-button-next">${this.constructor.nextButtonSvg}</div>\n      ` : ""}\n      ${function(e) {
                return void 0 === e && (e = {}),
                e.pagination && void 0 === e.pagination.el
            }(this.passedParams) ? '\n        <div part="pagination" class="swiper-pagination"></div>\n      ' : ""}\n      ${function(e) {
                return void 0 === e && (e = {}),
                e.scrollbar && void 0 === e.scrollbar.el
            }(this.passedParams) ? '\n        <div part="scrollbar" class="swiper-scrollbar"></div>\n      ' : ""}\n    `,
            this.shadowRoot.appendChild(t),
            this.rendered = !0
        }
        initialize() {
            var e = this;
            if (this.initialized)
                return;
            this.initialized = !0;
            const {params: t, passedParams: s} = be(this);
            this.swiperParams = t,
            this.passedParams = s,
            delete this.swiperParams.init,
            this.render(),
            this.swiper = new ee(this.shadowRoot.querySelector(".swiper"),{
                ...t.virtual ? {} : {
                    observer: !0,
                    observeSlideChildren: this.slideSlots > 0
                },
                ...t,
                touchEventsTarget: "layout",
                onAny: function(s) {
                    "observerUpdate" === s && e.calcSlideSlots();
                    const i = t.eventsPrefix ? `${t.eventsPrefix}${s.toLowerCase()}` : s.toLowerCase();
                    for (var a = arguments.length, r = new Array(a > 1 ? a - 1 : 0), n = 1; n < a; n++)
                        r[n - 1] = arguments[n];
                    const l = new CustomEvent(i,{
                        detail: r,
                        bubbles: "hashChange" !== s,
                        cancelable: !0
                    });
                    e.dispatchEvent(l)
                }
            })
        }
        connectedCallback() {
            this.initialized && this.nested && this.closest("swiper-slide") && this.closest("swiper-slide").swiperLoopMoveDOM || !1 !== this.init && "false" !== this.getAttribute("init") && this.initialize()
        }
        disconnectedCallback() {
            this.nested && this.closest("swiper-slide") && this.closest("swiper-slide").swiperLoopMoveDOM || (this.swiper && this.swiper.destroy && this.swiper.destroy(),
            this.initialized = !1)
        }
        updateSwiperOnPropChange(e, t) {
            const {params: s, passedParams: i} = be(this, e, t);
            this.passedParams = i,
            this.swiperParams = s,
            this.swiper && this.swiper.params[e] === t || function(e) {
                let {swiper: t, slides: s, passedParams: i, changedParams: a, nextEl: r, prevEl: n, scrollbarEl: l, paginationEl: o} = e;
                const d = a.filter((e=>"children" !== e && "direction" !== e && "wrapperClass" !== e))
                  , {params: p, pagination: c, navigation: u, scrollbar: m, virtual: h, thumbs: f} = t;
                let g, v, w, b, y, x, E, S;
                a.includes("thumbs") && i.thumbs && i.thumbs.swiper && p.thumbs && !p.thumbs.swiper && (g = !0),
                a.includes("controller") && i.controller && i.controller.control && p.controller && !p.controller.control && (v = !0),
                a.includes("pagination") && i.pagination && (i.pagination.el || o) && (p.pagination || !1 === p.pagination) && c && !c.el && (w = !0),
                a.includes("scrollbar") && i.scrollbar && (i.scrollbar.el || l) && (p.scrollbar || !1 === p.scrollbar) && m && !m.el && (b = !0),
                a.includes("navigation") && i.navigation && (i.navigation.prevEl || n) && (i.navigation.nextEl || r) && (p.navigation || !1 === p.navigation) && u && !u.prevEl && !u.nextEl && (y = !0);
                const T = e=>{
                    t[e] && (t[e].destroy(),
                    "navigation" === e ? (t.isElement && (t[e].prevEl.remove(),
                    t[e].nextEl.remove()),
                    p[e].prevEl = void 0,
                    p[e].nextEl = void 0,
                    t[e].prevEl = void 0,
                    t[e].nextEl = void 0) : (t.isElement && t[e].el.remove(),
                    p[e].el = void 0,
                    t[e].el = void 0))
                }
                ;
                a.includes("loop") && t.isElement && (p.loop && !i.loop ? x = !0 : !p.loop && i.loop ? E = !0 : S = !0),
                d.forEach((e=>{
                    if (he(p[e]) && he(i[e]))
                        Object.assign(p[e], i[e]),
                        "navigation" !== e && "pagination" !== e && "scrollbar" !== e || !("enabled"in i[e]) || i[e].enabled || T(e);
                    else {
                        const t = i[e];
                        !0 !== t && !1 !== t || "navigation" !== e && "pagination" !== e && "scrollbar" !== e ? p[e] = i[e] : !1 === t && T(e)
                    }
                }
                )),
                d.includes("controller") && !v && t.controller && t.controller.control && p.controller && p.controller.control && (t.controller.control = p.controller.control),
                a.includes("children") && s && h && p.virtual.enabled ? (h.slides = s,
                h.update(!0)) : a.includes("virtual") && h && p.virtual.enabled && (s && (h.slides = s),
                h.update(!0)),
                a.includes("children") && s && p.loop && (S = !0),
                g && f.init() && f.update(!0);
                v && (t.controller.control = p.controller.control),
                w && (!t.isElement || o && "string" != typeof o || (o = document.createElement("div"),
                o.classList.add("swiper-pagination"),
                o.part.add("pagination"),
                t.el.appendChild(o)),
                o && (p.pagination.el = o),
                c.init(),
                c.render(),
                c.update()),
                b && (!t.isElement || l && "string" != typeof l || (l = document.createElement("div"),
                l.classList.add("swiper-scrollbar"),
                l.part.add("scrollbar"),
                t.el.appendChild(l)),
                l && (p.scrollbar.el = l),
                m.init(),
                m.updateSize(),
                m.setTranslate()),
                y && (t.isElement && (r && "string" != typeof r || (r = document.createElement("div"),
                r.classList.add("swiper-button-next"),
                r.innerHTML = t.hostEl.constructor.nextButtonSvg,
                r.part.add("button-next"),
                t.el.appendChild(r)),
                n && "string" != typeof n || (n = document.createElement("div"),
                n.classList.add("swiper-button-prev"),
                n.innerHTML = t.hostEl.constructor.prevButtonSvg,
                n.part.add("button-prev"),
                t.el.appendChild(n))),
                r && (p.navigation.nextEl = r),
                n && (p.navigation.prevEl = n),
                u.init(),
                u.update()),
                a.includes("allowSlideNext") && (t.allowSlideNext = i.allowSlideNext),
                a.includes("allowSlidePrev") && (t.allowSlidePrev = i.allowSlidePrev),
                a.includes("direction") && t.changeDirection(i.direction, !1),
                (x || S) && t.loopDestroy(),
                (E || S) && t.loopCreate(),
                t.update()
            }({
                swiper: this.swiper,
                passedParams: this.passedParams,
                changedParams: [ge(e)],
                ..."navigation" === e && i[e] ? {
                    prevEl: ".swiper-button-prev",
                    nextEl: ".swiper-button-next"
                } : {},
                ..."pagination" === e && i[e] ? {
                    paginationEl: ".swiper-pagination"
                } : {},
                ..."scrollbar" === e && i[e] ? {
                    scrollbarEl: ".swiper-scrollbar"
                } : {}
            })
        }
        attributeChangedCallback(e, t, s) {
            this.initialized && ("true" === t && null === s && (s = !1),
            this.updateSwiperOnPropChange(e, s))
        }
        static get observedAttributes() {
            return me.filter((e=>e.includes("_"))).map((e=>e.replace(/[A-Z]/g, (e=>`-${e}`)).replace("_", "").toLowerCase()))
        }
    }
    me.forEach((e=>{
        "init" !== e && (e = e.replace("_", ""),
        Object.defineProperty(Te.prototype, e, {
            configurable: !0,
            get() {
                return (this.passedParams || {})[e]
            },
            set(t) {
                this.passedParams || (this.passedParams = {}),
                this.passedParams[e] = t,
                this.initialized && this.updateSwiperOnPropChange(e, t)
            }
        }))
    }
    ));
    class Me extends xe {
        constructor() {
            super(),
            this.attachShadow({
                mode: "open"
            })
        }
        render() {
            const e = this.lazy || "" === this.getAttribute("lazy") || "true" === this.getAttribute("lazy");
            if (Se(this.shadowRoot, "::slotted(.swiper-slide-shadow),::slotted(.swiper-slide-shadow-bottom),::slotted(.swiper-slide-shadow-left),::slotted(.swiper-slide-shadow-right),::slotted(.swiper-slide-shadow-top){position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:10}::slotted(.swiper-slide-shadow){background:rgba(0,0,0,.15)}::slotted(.swiper-slide-shadow-left){background-image:linear-gradient(to left,rgba(0,0,0,.5),rgba(0,0,0,0))}::slotted(.swiper-slide-shadow-right){background-image:linear-gradient(to right,rgba(0,0,0,.5),rgba(0,0,0,0))}::slotted(.swiper-slide-shadow-top){background-image:linear-gradient(to top,rgba(0,0,0,.5),rgba(0,0,0,0))}::slotted(.swiper-slide-shadow-bottom){background-image:linear-gradient(to bottom,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-lazy-preloader{animation:swiper-preloader-spin 1s infinite linear;width:42px;height:42px;position:absolute;left:50%;top:50%;margin-left:-21px;margin-top:-21px;z-index:10;transform-origin:50%;box-sizing:border-box;border:4px solid var(--swiper-preloader-color,var(--swiper-theme-color));border-radius:50%;border-top-color:transparent}@keyframes swiper-preloader-spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}::slotted(.swiper-slide-shadow-cube.swiper-slide-shadow-bottom),::slotted(.swiper-slide-shadow-cube.swiper-slide-shadow-left),::slotted(.swiper-slide-shadow-cube.swiper-slide-shadow-right),::slotted(.swiper-slide-shadow-cube.swiper-slide-shadow-top){z-index:0;-webkit-backface-visibility:hidden;backface-visibility:hidden}::slotted(.swiper-slide-shadow-flip.swiper-slide-shadow-bottom),::slotted(.swiper-slide-shadow-flip.swiper-slide-shadow-left),::slotted(.swiper-slide-shadow-flip.swiper-slide-shadow-right),::slotted(.swiper-slide-shadow-flip.swiper-slide-shadow-top){z-index:0;-webkit-backface-visibility:hidden;backface-visibility:hidden}::slotted(.swiper-zoom-container){width:100%;height:100%;display:flex;justify-content:center;align-items:center;text-align:center}::slotted(.swiper-zoom-container)>canvas,::slotted(.swiper-zoom-container)>img,::slotted(.swiper-zoom-container)>svg{max-width:100%;max-height:100%;object-fit:contain}"),
            this.shadowRoot.appendChild(document.createElement("slot")),
            e) {
                const e = document.createElement("div");
                e.classList.add("swiper-lazy-preloader"),
                e.part.add("preloader"),
                this.shadowRoot.appendChild(e)
            }
        }
        initialize() {
            this.render()
        }
        connectedCallback() {
            this.initialize()
        }
    }
    "undefined" != typeof window && (window.SwiperElementRegisterParams = e=>{
        me.push(...e)
    }
    ),
    "undefined" != typeof window && (window.customElements.get("swiper-container") || window.customElements.define("swiper-container", Te),
    window.customElements.get("swiper-slide") || window.customElements.define("swiper-slide", Me))
}();
//# sourceMappingURL=swiper-element-bundle.min.js.map
