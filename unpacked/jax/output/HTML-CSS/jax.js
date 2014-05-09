/*
 *  /MathJax/jax/output/HTML-CSS/jax.js
 *
 *  Copyright (c) 2009-2013 The MathJax Consortium
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

(function (h, b, d)
{
    var g, i = b.Browser.isMobile;
    var e = function ()
    {
        var k = [].slice.call(arguments, 0);
        k[0][0] = ["HTML-CSS", k[0][0]];
        return MathJax.Message.Set.apply(MathJax.Message, k)
    };
    var f = MathJax.Object.Subclass({timeout: (i ? 15 : 8) * 1000, FontInfo: {STIX: {family: "STIXSizeOneSym", testString: "() {} []"}, TeX: {family: "MathJax_Size1", testString: "() {} []"}, "STIX-Web": {family: "STIXWeb_Size1", testString: "() {} []"}, "Asana-Math": {family: "AsanaMath_Size1", testString: "() {} []"}, "Gyre-Pagella": {family: "GyrePagella_Size1", testString: "() {} []"}, "Gyre-Termes": {family: "GyreTermes_Size1", testString: "() {} []"}, "Latin-Modern": {family: "LatinModern_Size1", testString: "() {} []"}, "Neo-Euler": {family: "NeoEuler_Size1", testString: "() {} []"}}, comparisonFont: ["sans-serif", "monospace", "script", "Times", "Courier", "Arial", "Helvetica"], testSize: ["40px", "50px", "60px", "30px", "20px"], Init: function ()
    {
        this.div = MathJax.HTML.addElement(document.body, "div", {id: "MathJax_Font_Test", style: {position: "absolute", visibility: "hidden", top: 0, left: 0, width: "auto", padding: 0, border: 0, margin: 0, whiteSpace: "nowrap", textAlign: "left", textIndent: 0, textTransform: "none", lineHeight: "normal", letterSpacing: "normal", wordSpacing: "normal", fontSize: this.testSize[0], fontWeight: "normal", fontStyle: "normal", fontSizeAdjust: "none"}}, [""]);
        this.text = this.div.firstChild
    }, findFont: function (o, l)
    {
        if(l && this.testCollection(l))
        {
            return l
        }
        for(var n = 0, k = o.length; n < k; n++)
        {
            if(o[n] === l)
            {
                continue
            }
            if(this.testCollection(o[n]))
            {
                return o[n]
            }
        }
        return null
    }, testCollection: function (k)
    {
        return this.testFont(this.FontInfo[k])
    }, testFont: function (n)
    {
        if(n.isWebFont && d.FontFaceBug)
        {
            this.div.style.fontWeight = this.div.style.fontStyle = "normal"
        }
        else
        {
            this.div.style.fontWeight = (n.weight || "normal");
            this.div.style.fontStyle = (n.style || "normal")
        }
        var l = this.getComparisonWidths(n.testString, n.noStyleChar);
        if(l)
        {
            this.div.style.fontFamily = "'" + n.family + "'," + this.comparisonFont[0];
            if(this.div.offsetWidth == l[0])
            {
                this.div.style.fontFamily = "'" + n.family + "'," + this.comparisonFont[l[2]];
                if(this.div.offsetWidth == l[1])
                {
                    return false
                }
            }
            if(this.div.offsetWidth != l[3] || this.div.offsetHeight != l[4])
            {
                if(n.noStyleChar || !d.FONTDATA || !d.FONTDATA.hasStyleChar)
                {
                    return true
                }
                for(var o = 0, k = this.testSize.length; o < k; o++)
                {
                    if(this.testStyleChar(n, this.testSize[o]))
                    {
                        return true
                    }
                }
            }
        }
        return false
    }, styleChar: "\uEFFD", versionChar: "\uEFFE", compChar: "\uEFFF", testStyleChar: function (m, p)
    {
        var s = 3 + (m.weight ? 2 : 0) + (m.style ? 4 : 0);
        var l = "", o = 0;
        var r = this.div.style.fontSize;
        this.div.style.fontSize = p;
        if(d.msieItalicWidthBug && m.style === "italic")
        {
            this.text.nodeValue = l = this.compChar;
            o = this.div.offsetWidth
        }
        if(d.safariTextNodeBug)
        {
            this.div.innerHTML = this.compChar + l
        }
        else
        {
            this.text.nodeValue = this.compChar + l
        }
        var k = this.div.offsetWidth - o;
        if(d.safariTextNodeBug)
        {
            this.div.innerHTML = this.styleChar + l
        }
        else
        {
            this.text.nodeValue = this.styleChar + l
        }
        var q = Math.floor((this.div.offsetWidth - o) / k + 0.5);
        if(q === s)
        {
            if(d.safariTextNodeBug)
            {
                this.div.innerHTML = this.versionChar + l
            }
            else
            {
                this.text.nodeValue = this.versionChar + l
            }
            m.version = Math.floor((this.div.offsetWidth - o) / k + 1.5) / 2
        }
        this.div.style.fontSize = r;
        return(q === s)
    }, getComparisonWidths: function (p, n)
    {
        if(d.FONTDATA && d.FONTDATA.hasStyleChar && !n)
        {
            p += this.styleChar + " " + this.compChar
        }
        if(d.safariTextNodeBug)
        {
            this.div.innerHTML = p
        }
        else
        {
            this.text.nodeValue = p
        }
        this.div.style.fontFamily = this.comparisonFont[0];
        var l = this.div.offsetWidth;
        this.div.style.fontFamily = d.webFontDefault;
        var r = this.div.offsetWidth, o = this.div.offsetHeight;
        for(var q = 1, k = this.comparisonFont.length; q < k; q++)
        {
            this.div.style.fontFamily = this.comparisonFont[q];
            if(this.div.offsetWidth != l)
            {
                return[l, this.div.offsetWidth, q, r, o]
            }
        }
        return null
    }, loadWebFont: function (l)
    {
        b.Startup.signal.Post("HTML-CSS Jax - Web-Font " + d.fontInUse + "/" + l.directory);
        var o = e(["LoadWebFont", "Loading web-font %1", d.fontInUse + "/" + l.directory]);
        var k = MathJax.Callback({});
        var m = MathJax.Callback(["loadComplete", this, l, o, k]);
        h.timer.start(h, [this.checkWebFont, l, m], 0, this.timeout);
        return k
    }, loadComplete: function (m, p, l, k)
    {
        MathJax.Message.Clear(p);
        if(k === h.STATUS.OK)
        {
            this.webFontLoaded = true;
            l();
            return
        }
        this.loadError(m);
        if(b.Browser.isFirefox && d.allowWebFonts)
        {
            var o = document.location.protocol + "//" + document.location.hostname;
            if(document.location.port != "")
            {
                o += ":" + document.location.port
            }
            o += "/";
            if(h.fileURL(d.webfontDir).substr(0, o.length) !== o)
            {
                this.firefoxFontError(m)
            }
        }
        if(!this.webFontLoaded)
        {
            d.loadWebFontError(m, l)
        }
        else
        {
            l()
        }
    }, loadError: function (k)
    {
        e(["CantLoadWebFont", "Can't load web font %1", d.fontInUse + "/" + k.directory], null, 2000);
        b.Startup.signal.Post(["HTML-CSS Jax - web font error", d.fontInUse + "/" + k.directory, k])
    }, firefoxFontError: function (k)
    {
        e(["FirefoxCantLoadWebFont", "Firefox can't load web fonts from a remote host"], null, 3000);
        b.Startup.signal.Post("HTML-CSS Jax - Firefox web fonts on remote host error")
    }, checkWebFont: function (k, l, m)
    {
        if(k.time(m))
        {
            return
        }
        if(d.Font.testFont(l))
        {
            m(k.STATUS.OK)
        }
        else
        {
            setTimeout(k, k.delay)
        }
    }, fontFace: function (m)
    {
        var n = d.allowWebFonts;
        var p = d.FONTDATA.FONTS[m];
        if(d.msieFontCSSBug && !p.family.match(/-Web$/))
        {
            p.family += "-Web"
        }
        var l = h.fileURL(d.webfontDir + "/" + n);
        var k = m.replace(/-b/, "-B").replace(/-i/, "-I").replace(/-Bold-/, "-Bold");
        if(!k.match(/-/))
        {
            k += "-Regular"
        }
        if(n === "svg")
        {
            k += ".svg#" + k
        }
        else
        {
            k += "." + n
        }
        var o = {"font-family": p.family, src: "url('" + l + "/" + k + "')"};
        if(n === "otf")
        {
            o.src += " format('opentype')";
            l = h.fileURL(d.webfontDir + "/woff");
            o.src = "url('" + l + "/" + k.replace(/otf$/, "woff") + "') format('woff'), " + o.src
        }
        else
        {
            if(n !== "eot")
            {
                o.src += " format('" + n + "')"
            }
        }
        if(!(d.FontFaceBug && p.isWebFont))
        {
            if(m.match(/-bold/))
            {
                o["font-weight"] = "bold"
            }
            if(m.match(/-italic/))
            {
                o["font-style"] = "italic"
            }
        }
        return o
    }});
    var j, a, c;
    d.Augment({config: {styles: {".MathJax": {display: "inline", "font-style": "normal", "font-weight": "normal", "line-height": "normal", "font-size": "100%", "font-size-adjust": "none", "text-indent": 0, "text-align": "left", "text-transform": "none", "letter-spacing": "normal", "word-spacing": "normal", "word-wrap": "normal", "white-space": "nowrap", "float": "none", direction: "ltr", border: 0, padding: 0, margin: 0}, ".MathJax_Display": {position: "relative", display: "block", width: "100%"}, ".MathJax img, .MathJax nobr, .MathJax a": {border: 0, padding: 0, margin: 0, "max-width": "none", "max-height": "none", "vertical-align": 0, "line-height": "normal", "text-decoration": "none"}, "img.MathJax_strut": {border: "0 !important", padding: "0 !important", margin: "0 !important", "vertical-align": "0 !important"}, ".MathJax span": {display: "inline", position: "static", border: 0, padding: 0, margin: 0, "vertical-align": 0, "line-height": "normal", "text-decoration": "none"}, ".MathJax nobr": {"white-space": "nowrap ! important"}, ".MathJax img": {display: "inline ! important", "float": "none ! important"}, ".MathJax *": {transition: "none", "-webkit-transition": "none", "-moz-transition": "none", "-ms-transition": "none", "-o-transition": "none"}, ".MathJax_Processing": {visibility: "hidden", position: "fixed", width: 0, height: 0, overflow: "hidden"}, ".MathJax_Processed": {display: "none!important"}, ".MathJax_ExBox": {display: "block", overflow: "hidden", width: "1px", height: "60ex"}, ".MathJax .MathJax_EmBox": {display: "block", overflow: "hidden", width: "1px", height: "60em"}, ".MathJax .MathJax_HitBox": {cursor: "text", background: "white", opacity: 0, filter: "alpha(opacity=0)"}, ".MathJax .MathJax_HitBox *": {filter: "none", opacity: 1, background: "transparent"}, "#MathJax_Tooltip": {position: "absolute", left: 0, top: 0, width: "auto", height: "auto", display: "none"}, "#MathJax_Tooltip *": {filter: "none", opacity: 1, background: "transparent"}, "@font-face": {"font-family": "MathJax_Blank", src: "url('about:blank')"}}}, settings: b.config.menuSettings, hideProcessedMath: true, Font: null, webFontDefault: "MathJax_Blank", allowWebFonts: "otf", maxStretchyParts: 1000, Config: function ()
    {
        if(!this.require)
        {
            this.require = []
        }
        this.Font = f();
        this.SUPER(arguments).Config.call(this);
        var l = this.settings;
        if(this.adjustAvailableFonts)
        {
            this.adjustAvailableFonts(this.config.availableFonts)
        }
        if(l.scale)
        {
            this.config.scale = l.scale
        }
        if(l.font && l.font !== "Auto")
        {
            if(l.font === "TeXLocal")
            {
                this.config.availableFonts = ["TeX"];
                this.config.preferredFont = "TeX";
                this.config.webFont = "TeX"
            }
            else
            {
                if(l.font === "TeXWeb")
                {
                    this.config.availableFonts = [];
                    this.config.preferredFont = "";
                    this.config.webFont = "TeX"
                }
                else
                {
                    if(l.font === "TeXimage")
                    {
                        this.config.availableFonts = [];
                        this.config.preferredFont = "";
                        this.config.webFont = ""
                    }
                    else
                    {
                        if(l.font === "STIXlocal")
                        {
                            this.config.availableFonts = ["STIX"];
                            this.config.preferredFont = "STIX";
                            this.config.webFont = "STIX-Web"
                        }
                        else
                        {
                            if(l.font === "STIXWeb")
                            {
                                this.config.availableFonts = [];
                                this.config.preferredFont = "";
                                this.config.webFont = "STIX-Web"
                            }
                            else
                            {
                                if(l.font === "AsanaMathWeb")
                                {
                                    this.config.availableFonts = [];
                                    this.config.preferredFont = "";
                                    this.config.webFont = "Asana-Math"
                                }
                                else
                                {
                                    if(l.font === "GyrePagellaWeb")
                                    {
                                        this.config.availableFonts = [];
                                        this.config.preferredFont = "";
                                        this.config.webFont = "Gyre-Pagella"
                                    }
                                    else
                                    {
                                        if(l.font === "GyreTermesWeb")
                                        {
                                            this.config.availableFonts = [];
                                            this.config.preferredFont = "";
                                            this.config.webFont = "Gyre-Termes"
                                        }
                                        else
                                        {
                                            if(l.font === "LatinModernWeb")
                                            {
                                                this.config.availableFonts = [];
                                                this.config.preferredFont = "";
                                                this.config.webFont = "Latin-Modern"
                                            }
                                            else
                                            {
                                                if(l.font === "NeoEulerWeb")
                                                {
                                                    this.config.availableFonts = [];
                                                    this.config.preferredFont = "";
                                                    this.config.webFont = "Neo-Euler"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        var k = this.Font.findFont(this.config.availableFonts, this.config.preferredFont);
        if(!k && this.allowWebFonts)
        {
            k = this.config.webFont;
            if(k)
            {
                this.webFonts = true
            }
        }
        if(!k && this.config.imageFont)
        {
            k = this.config.imageFont;
            this.imgFonts = true
        }
        if(k)
        {
            this.fontInUse = k;
            this.fontDir += "/" + k;
            this.webfontDir += "/" + k;
            this.require.push(this.fontDir + "/fontdata.js");
            if(this.imgFonts)
            {
                this.require.push(this.directory + "/imageFonts.js");
                b.Startup.signal.Post("HTML-CSS Jax - using image fonts")
            }
        }
        else
        {
            e(["CantFindFontUsing", "Can't find a valid font using %1", "[" + this.config.availableFonts.join(", ") + "]"], null, 3000);
            this.fontInUse = "generic";
            this.FONTDATA = {TeX_factor: 1, baselineskip: 1.2, lineH: 0.8, lineD: 0.2, ffLineH: 0.8, FONTS: {}, VARIANT: {normal: {fonts: []}, "-generic-variant": {fonts: []}, "-largeOp": {fonts: []}, "-smallOp": {fonts: []}}, RANGES: [], DELIMITERS: {}, RULECHAR: 45, REMAP: {}};
            b.Startup.signal.Post("HTML-CSS Jax - no valid font")
        }
        this.require.push(MathJax.OutputJax.extensionDir + "/MathEvents.js")
    }, Startup: function ()
    {
        j = MathJax.Extension.MathEvents.Event;
        a = MathJax.Extension.MathEvents.Touch;
        c = MathJax.Extension.MathEvents.Hover;
        this.ContextMenu = j.ContextMenu;
        this.Mousedown = j.AltContextMenu;
        this.Mouseover = c.Mouseover;
        this.Mouseout = c.Mouseout;
        this.Mousemove = c.Mousemove;
        this.hiddenDiv = this.Element("div", {style: {visibility: "hidden", overflow: "hidden", position: "absolute", top: 0, height: "1px", width: "auto", padding: 0, border: 0, margin: 0, textAlign: "left", textIndent: 0, textTransform: "none", lineHeight: "normal", letterSpacing: "normal", wordSpacing: "normal"}});
        if(!document.body.firstChild)
        {
            document.body.appendChild(this.hiddenDiv)
        }
        else
        {
            document.body.insertBefore(this.hiddenDiv, document.body.firstChild)
        }
        this.hiddenDiv = this.addElement(this.hiddenDiv, "div", {id: "MathJax_Hidden"});
        var l = this.addElement(this.hiddenDiv, "div", {style: {width: "5in"}});
        this.pxPerInch = l.offsetWidth / 5;
        this.hiddenDiv.removeChild(l);
        this.startMarker = this.createStrut(this.Element("span"), 10, true);
        this.endMarker = this.addText(this.Element("span"), "x").parentNode;
        this.HDspan = this.Element("span");
        if(this.operaHeightBug)
        {
            this.createStrut(this.HDspan, 0)
        }
        if(this.msieInlineBlockAlignBug)
        {
            this.HDimg = this.addElement(this.HDspan, "img", {style: {height: "0px", width: "1px"}});
            try
            {
                this.HDimg.src = "about:blank"
            }
            catch(k)
            {
            }
        }
        else
        {
            this.HDimg = this.createStrut(this.HDspan, 0)
        }
        this.EmExSpan = this.Element("span", {style: {position: "absolute", "font-size-adjust": "none"}}, [
            ["span", {className: "MathJax_ExBox"}],
            ["span", {className: "MathJax"}, [
                ["span", {className: "MathJax_EmBox"}]
            ]]
        ]);
        this.linebreakSpan = this.Element("span", null, [
            ["hr", {style: {width: "100%", size: 1, padding: 0, border: 0, margin: 0}}]
        ]);
        return h.Styles(this.config.styles, ["InitializeHTML", this])
    }, removeSTIXfonts: function (n)
    {
        for(var l = 0, k = n.length; l < k; l++)
        {
            if(n[l] === "STIX")
            {
                n.splice(l, 1);
                k--;
                l--
            }
        }
        if(this.config.preferredFont === "STIX")
        {
            this.config.preferredFont = n[0]
        }
    }, PreloadWebFonts: function ()
    {
        if(!d.allowWebFonts || !d.config.preloadWebFonts)
        {
            return
        }
        for(var l = 0, k = d.config.preloadWebFonts.length; l < k; l++)
        {
            var n = d.FONTDATA.FONTS[d.config.preloadWebFonts[l]];
            if(!n.available)
            {
                d.Font.testFont(n)
            }
        }
    }, InitializeHTML: function ()
    {
        this.PreloadWebFonts();
        document.body.appendChild(this.EmExSpan);
        document.body.appendChild(this.linebreakSpan);
        this.defaultEx = this.EmExSpan.firstChild.offsetHeight / 60;
        this.defaultEm = this.EmExSpan.lastChild.firstChild.offsetHeight / 60;
        this.defaultWidth = this.linebreakSpan.firstChild.offsetWidth;
        document.body.removeChild(this.linebreakSpan);
        document.body.removeChild(this.EmExSpan)
    }, preTranslate: function (o)
    {
        var u = o.jax[this.id], v, r = u.length, z, t, A, n, y, l, x, q, s, k, w = false, B = this.config.linebreaks.automatic, p = this.config.linebreaks.width;
        if(B)
        {
            w = (p.match(/^\s*(\d+(\.\d*)?%\s*)?container\s*$/) != null);
            if(w)
            {
                p = p.replace(/\s*container\s*/, "")
            }
            else
            {
                k = this.defaultWidth
            }
            if(p === "")
            {
                p = "100%"
            }
        }
        else
        {
            k = 100000
        }
        for(v = 0; v < r; v++)
        {
            z = u[v];
            if(!z.parentNode)
            {
                continue
            }
            t = z.previousSibling;
            if(t && String(t.className).match(/^MathJax(_Display)?( MathJax_Processing)?$/))
            {
                t.parentNode.removeChild(t)
            }
            l = z.MathJax.elementJax;
            if(!l)
            {
                continue
            }
            l.HTMLCSS = {display: (l.root.Get("display") === "block")};
            A = n = this.Element("span", {className: "MathJax", id: l.inputID + "-Frame", isMathJax: true, jaxID: this.id, oncontextmenu: j.Menu, onmousedown: j.Mousedown, onmouseover: j.Mouseover, onmouseout: j.Mouseout, onmousemove: j.Mousemove, onclick: j.Click, ondblclick: j.DblClick});
            if(b.Browser.noContextMenu)
            {
                A.ontouchstart = a.start;
                A.ontouchend = a.end
            }
            if(l.HTMLCSS.display)
            {
                n = this.Element("div", {className: "MathJax_Display"});
                n.appendChild(A)
            }
            else
            {
                if(this.msieDisappearingBug)
                {
                    A.style.display = "inline-block"
                }
            }
            n.setAttribute("role", "textbox");
            n.setAttribute("aria-readonly", "true");
            n.className += " MathJax_Processing";
            z.parentNode.insertBefore(n, z);
            z.parentNode.insertBefore(this.EmExSpan.cloneNode(true), z);
            if(w)
            {
                n.parentNode.insertBefore(this.linebreakSpan.cloneNode(true), n)
            }
        }
        for(v = 0; v < r; v++)
        {
            z = u[v];
            if(!z.parentNode)
            {
                continue
            }
            y = z.previousSibling;
            n = y.previousSibling;
            l = z.MathJax.elementJax;
            if(!l)
            {
                continue
            }
            x = y.firstChild.offsetHeight / 60;
            q = y.lastChild.firstChild.offsetHeight / 60;
            if(w)
            {
                k = n.previousSibling.firstChild.offsetWidth
            }
            if(x === 0 || x === "NaN")
            {
                this.hiddenDiv.appendChild(n);
                l.HTMLCSS.isHidden = true;
                x = this.defaultEx;
                q = this.defaultEm;
                if(w)
                {
                    k = this.defaultWidth
                }
            }
            s = (this.config.matchFontHeight ? x / this.TeX.x_height / q : 1);
            s = Math.floor(Math.max(this.config.minScaleAdjust / 100, s) * this.config.scale);
            l.HTMLCSS.scale = s / 100;
            l.HTMLCSS.fontSize = s + "%";
            l.HTMLCSS.em = l.HTMLCSS.outerEm = q;
            this.em = q * s / 100;
            l.HTMLCSS.ex = x;
            l.HTMLCSS.lineWidth = (B ? this.length2em(p, 1, k / this.em) : 1000000)
        }
        for(v = 0; v < r; v++)
        {
            z = u[v];
            if(!z.parentNode)
            {
                continue
            }
            y = u[v].previousSibling;
            l = u[v].MathJax.elementJax;
            if(!l)
            {
                continue
            }
            if(w)
            {
                A = y.previousSibling;
                if(!l.HTMLCSS.isHidden)
                {
                    A = A.previousSibling
                }
                A.parentNode.removeChild(A)
            }
            y.parentNode.removeChild(y)
        }
        o.HTMLCSSeqn = o.HTMLCSSlast = 0;
        o.HTMLCSSi = -1;
        o.HTMLCSSchunk = this.config.EqnChunk;
        o.HTMLCSSdelay = false
    }, Translate: function (l, p)
    {
        if(!l.parentNode)
        {
            return
        }
        if(p.HTMLCSSdelay)
        {
            p.HTMLCSSdelay = false;
            b.RestartAfter(MathJax.Callback.Delay(this.config.EqnChunkDelay))
        }
        var k = l.MathJax.elementJax, o = k.root, m = document.getElementById(k.inputID + "-Frame"), q = (k.HTMLCSS.display ? m.parentNode : m);
        this.em = g.mbase.prototype.em = k.HTMLCSS.em * k.HTMLCSS.scale;
        this.outerEm = k.HTMLCSS.em;
        this.scale = k.HTMLCSS.scale;
        this.linebreakWidth = k.HTMLCSS.lineWidth;
        if(this.scale !== 1)
        {
            m.style.fontSize = k.HTMLCSS.fontSize
        }
        this.initImg(m);
        this.initHTML(o, m);
        o.setTeXclass();
        try
        {
            o.toHTML(m, q)
        }
        catch(n)
        {
            if(n.restart)
            {
                while(m.firstChild)
                {
                    m.removeChild(m.firstChild)
                }
            }
            throw n
        }
        if(k.HTMLCSS.isHidden)
        {
            l.parentNode.insertBefore(q, l)
        }
        q.className = q.className.split(/ /)[0];
        if(this.hideProcessedMath)
        {
            q.className += " MathJax_Processed";
            if(l.MathJax.preview)
            {
                k.HTMLCSS.preview = l.MathJax.preview;
                delete l.MathJax.preview
            }
            p.HTMLCSSeqn += (p.i - p.HTMLCSSi);
            p.HTMLCSSi = p.i;
            if(p.HTMLCSSeqn >= p.HTMLCSSlast + p.HTMLCSSchunk)
            {
                this.postTranslate(p, true);
                p.HTMLCSSchunk = Math.floor(p.HTMLCSSchunk * this.config.EqnChunkFactor);
                p.HTMLCSSdelay = true
            }
        }
    }, postTranslate: function (s, o)
    {
        var l = s.jax[this.id];
        if(!this.hideProcessedMath)
        {
            return
        }
        for(var q = s.HTMLCSSlast, k = s.HTMLCSSeqn; q < k; q++)
        {
            var n = l[q];
            if(n && n.MathJax.elementJax)
            {
                n.previousSibling.className = n.previousSibling.className.split(/ /)[0];
                var r = n.MathJax.elementJax.HTMLCSS;
                if(r.preview)
                {
                    r.preview.innerHTML = "";
                    n.MathJax.preview = r.preview;
                    delete r.preview
                }
            }
        }
        if(this.forceReflow)
        {
            var p = (document.styleSheets || [])[0] || {};
            p.disabled = true;
            p.disabled = false
        }
        s.HTMLCSSlast = s.HTMLCSSeqn
    }, getJaxFromMath: function (k)
    {
        if(k.parentNode.className === "MathJax_Display")
        {
            k = k.parentNode
        }
        do {
            k = k.nextSibling
        }
        while(k && k.nodeName.toLowerCase() !== "script");
        return b.getJaxFor(k)
    }, getHoverSpan: function (k, l)
    {
        return k.root.HTMLspanElement()
    }, getHoverBBox: function (k, n, o)
    {
        var p = n.bbox, m = k.HTMLCSS.outerEm;
        var l = {w: p.w * m, h: p.h * m, d: p.d * m};
        if(p.width)
        {
            l.width = p.width
        }
        return l
    }, Zoom: function (l, v, u, k, s)
    {
        v.className = "MathJax";
        v.style.fontSize = l.HTMLCSS.fontSize;
        var x = v.appendChild(this.EmExSpan.cloneNode(true));
        var o = x.lastChild.firstChild.offsetHeight / 60;
        this.em = g.mbase.prototype.em = o;
        this.outerEm = o / l.HTMLCSS.scale;
        x.parentNode.removeChild(x);
        this.idPostfix = "-zoom";
        l.root.toHTML(v, v);
        this.idPostfix = "";
        var n = l.root.HTMLspanElement().bbox.width;
        if(n)
        {
            v.style.width = Math.floor(k - 1.5 * d.em) + "px";
            v.style.display = "inline-block";
            var m = (l.root.id || "MathJax-Span-" + l.root.spanID) + "-zoom";
            var p = document.getElementById(m).firstChild;
            while(p && p.style.width !== n)
            {
                p = p.nextSibling
            }
            if(p)
            {
                p.style.width = "100%"
            }
        }
        v.style.position = "absolute";
        if(!n)
        {
            u.style.position = "absolute"
        }
        var t = v.offsetWidth, r = v.offsetHeight, w = u.offsetHeight, q = u.offsetWidth;
        if(q === 0)
        {
            q = u.parentNode.offsetWidth
        }
        v.style.position = u.style.position = "";
        return{Y: -j.getBBox(v).h, mW: q, mH: w, zW: t, zH: r}
    }, initImg: function (k)
    {
    }, initHTML: function (l, k)
    {
    }, initFont: function (k)
    {
        var m = d.FONTDATA.FONTS, l = d.config.availableFonts;
        if(l && l.length && d.Font.testFont(m[k]))
        {
            m[k].available = true;
            return null
        }
        if(!this.allowWebFonts)
        {
            return null
        }
        m[k].isWebFont = true;
        if(d.FontFaceBug)
        {
            m[k].family = k;
            if(d.msieFontCSSBug)
            {
                m[k].family += "-Web"
            }
        }
        return h.Styles({"@font-face": this.Font.fontFace(k)})
    }, Remove: function (k)
    {
        var l = document.getElementById(k.inputID + "-Frame");
        if(l)
        {
            if(k.HTMLCSS.display)
            {
                l = l.parentNode
            }
            l.parentNode.removeChild(l)
        }
        delete k.HTMLCSS
    }, getHD: function (l)
    {
        var k = l.style.position;
        l.style.position = "absolute";
        this.HDimg.style.height = "0px";
        l.appendChild(this.HDspan);
        var m = {h: l.offsetHeight};
        this.HDimg.style.height = m.h + "px";
        m.d = l.offsetHeight - m.h;
        m.h -= m.d;
        m.h /= this.em;
        m.d /= this.em;
        l.removeChild(this.HDspan);
        l.style.position = k;
        return m
    }, getW: function (o)
    {
        var l, n, m = (o.bbox || {}).w, p = o;
        if(o.bbox && o.bbox.exactW)
        {
            return m
        }
        if((o.bbox && m >= 0 && !this.initialSkipBug) || this.negativeBBoxes || !o.firstChild)
        {
            l = o.offsetWidth;
            n = o.parentNode.offsetHeight
        }
        else
        {
            if(o.bbox && m < 0 && this.msieNegativeBBoxBug)
            {
                l = -o.offsetWidth, n = o.parentNode.offsetHeight
            }
            else
            {
                if(this.initialSkipBug)
                {
                    var k = o.style.position;
                    o.style.position = "absolute";
                    p = this.startMarker;
                    o.insertBefore(p, o.firstChild)
                }
                o.appendChild(this.endMarker);
                l = this.endMarker.offsetLeft - p.offsetLeft;
                o.removeChild(this.endMarker);
                if(this.initialSkipBug)
                {
                    o.removeChild(p);
                    o.style.position = k
                }
            }
        }
        if(n != null)
        {
            o.parentNode.HH = n / this.em
        }
        return l / this.em
    }, Measured: function (m, l)
    {
        var n = m.bbox;
        if(n.width == null && n.w && !n.isMultiline)
        {
            var k = this.getW(m);
            n.rw += k - n.w;
            n.w = k;
            n.exactW = true
        }
        if(!l)
        {
            l = m.parentNode
        }
        if(!l.bbox)
        {
            l.bbox = n
        }
        return m
    }, Remeasured: function (l, k)
    {
        k.bbox = this.Measured(l, k).bbox
    }, MeasureSpans: function (o)
    {
        var r = [], t, q, n, u, k, p, l, s;
        for(q = 0, n = o.length; q < n; q++)
        {
            t = o[q];
            if(!t)
            {
                continue
            }
            u = t.bbox;
            s = this.parentNode(t);
            if(u.exactW || u.width || u.w === 0 || u.isMultiline)
            {
                if(!s.bbox)
                {
                    s.bbox = u
                }
                continue
            }
            if(this.negativeBBoxes || !t.firstChild || (u.w >= 0 && !this.initialSkipBug) || (u.w < 0 && this.msieNegativeBBoxBug))
            {
                r.push([t])
            }
            else
            {
                if(this.initialSkipBug)
                {
                    k = this.startMarker.cloneNode(true);
                    p = this.endMarker.cloneNode(true);
                    t.insertBefore(k, t.firstChild);
                    t.appendChild(p);
                    r.push([t, k, p, t.style.position]);
                    t.style.position = "absolute"
                }
                else
                {
                    p = this.endMarker.cloneNode(true);
                    t.appendChild(p);
                    r.push([t, null, p])
                }
            }
        }
        for(q = 0, n = r.length; q < n; q++)
        {
            t = r[q][0];
            u = t.bbox;
            s = this.parentNode(t);
            if((u.w >= 0 && !this.initialSkipBug) || this.negativeBBoxes || !t.firstChild)
            {
                l = t.offsetWidth;
                s.HH = s.offsetHeight / this.em
            }
            else
            {
                if(u.w < 0 && this.msieNegativeBBoxBug)
                {
                    l = -t.offsetWidth, s.HH = s.offsetHeight / this.em
                }
                else
                {
                    l = r[q][2].offsetLeft - ((r[q][1] || {}).offsetLeft || 0)
                }
            }
            l /= this.em;
            u.rw += l - u.w;
            u.w = l;
            u.exactW = true;
            if(!s.bbox)
            {
                s.bbox = u
            }
        }
        for(q = 0, n = r.length; q < n; q++)
        {
            t = r[q];
            if(t[1])
            {
                t[1].parentNode.removeChild(t[1]), t[0].style.position = t[3]
            }
            if(t[2])
            {
                t[2].parentNode.removeChild(t[2])
            }
        }
    }, Em: function (k)
    {
        if(Math.abs(k) < 0.0006)
        {
            return"0em"
        }
        return k.toFixed(3).replace(/\.?0+$/, "") + "em"
    }, EmRounded: function (k)
    {
        k = (Math.round(k * d.em) + 0.05) / d.em;
        if(Math.abs(k) < 0.0006)
        {
            return"0em"
        }
        return k.toFixed(3).replace(/\.?0+$/, "") + "em"
    }, unEm: function (k)
    {
        return parseFloat(k)
    }, Px: function (k)
    {
        k *= this.em;
        var l = (k < 0 ? "-" : "");
        return l + Math.abs(k).toFixed(1).replace(/\.?0+$/, "") + "px"
    }, unPx: function (k)
    {
        return parseFloat(k) / this.em
    }, Percent: function (k)
    {
        return(100 * k).toFixed(1).replace(/\.?0+$/, "") + "%"
    }, length2em: function (r, l, p)
    {
        if(typeof(r) !== "string")
        {
            r = r.toString()
        }
        if(r === "")
        {
            return""
        }
        if(r === g.SIZE.NORMAL)
        {
            return 1
        }
        if(r === g.SIZE.BIG)
        {
            return 2
        }
        if(r === g.SIZE.SMALL)
        {
            return 0.71
        }
        if(r === "infinity")
        {
            return d.BIGDIMEN
        }
        var o = this.FONTDATA.TeX_factor;
        if(r.match(/mathspace$/))
        {
            return d.MATHSPACE[r] * o
        }
        var n = r.match(/^\s*([-+]?(?:\.\d+|\d+(?:\.\d*)?))?(pt|em|ex|mu|px|pc|in|mm|cm|%)?/);
        var k = parseFloat(n[1] || "1"), q = n[2];
        if(p == null)
        {
            p = 1
        }
        if(l == null)
        {
            l = 1
        }
        if(q === "em")
        {
            return k * o
        }
        if(q === "ex")
        {
            return k * d.TeX.x_height * o
        }
        if(q === "%")
        {
            return k / 100 * p
        }
        if(q === "px")
        {
            return k / d.em
        }
        if(q === "pt")
        {
            return k / 10 * o
        }
        if(q === "pc")
        {
            return k * 1.2 * o
        }
        if(q === "in")
        {
            return k * this.pxPerInch / d.em
        }
        if(q === "cm")
        {
            return k * this.pxPerInch / d.em / 2.54
        }
        if(q === "mm")
        {
            return k * this.pxPerInch / d.em / 25.4
        }
        if(q === "mu")
        {
            return k / 18 * o * l
        }
        return k * o * p
    }, thickness2em: function (l, k)
    {
        var m = d.TeX.rule_thickness;
        if(l === g.LINETHICKNESS.MEDIUM)
        {
            return m
        }
        if(l === g.LINETHICKNESS.THIN)
        {
            return 0.67 * m
        }
        if(l === g.LINETHICKNESS.THICK)
        {
            return 1.67 * m
        }
        return this.length2em(l, k, m)
    }, getPadding: function (l)
    {
        var n = {top: 0, right: 0, bottom: 0, left: 0}, k = false;
        for(var o in n)
        {
            if(n.hasOwnProperty(o))
            {
                var m = l.style["padding" + o.charAt(0).toUpperCase() + o.substr(1)];
                if(m)
                {
                    n[o] = this.length2em(m);
                    k = true
                }
            }
        }
        return(k ? n : false)
    }, getBorders: function (p)
    {
        var m = {top: 0, right: 0, bottom: 0, left: 0}, n = {}, l = false;
        for(var q in m)
        {
            if(m.hasOwnProperty(q))
            {
                var k = "border" + q.charAt(0).toUpperCase() + q.substr(1);
                var o = p.style[k + "Style"];
                if(o)
                {
                    l = true;
                    m[q] = this.length2em(p.style[k + "Width"]);
                    n[k] = [p.style[k + "Width"], p.style[k + "Style"], p.style[k + "Color"]].join(" ")
                }
            }
        }
        m.css = n;
        return(l ? m : false)
    }, setBorders: function (k, l)
    {
        if(l)
        {
            for(var m in l.css)
            {
                if(l.css.hasOwnProperty(m))
                {
                    k.style[m] = l.css[m]
                }
            }
        }
    }, createStrut: function (m, l, n)
    {
        var k = this.Element("span", {isMathJax: true, style: {display: "inline-block", overflow: "hidden", height: l + "px", width: "1px", marginRight: "-1px"}});
        if(n)
        {
            m.insertBefore(k, m.firstChild)
        }
        else
        {
            m.appendChild(k)
        }
        return k
    }, createBlank: function (l, k, m)
    {
        var n = this.Element("span", {isMathJax: true, style: {display: "inline-block", overflow: "hidden", height: "1px", width: this.Em(k)}});
        if(m)
        {
            l.insertBefore(n, l.firstChild)
        }
        else
        {
            l.appendChild(n)
        }
        return n
    }, createShift: function (l, k, n)
    {
        var m = this.Element("span", {style: {marginLeft: this.Em(k)}, isMathJax: true});
        if(n)
        {
            l.insertBefore(m, l.firstChild)
        }
        else
        {
            l.appendChild(m)
        }
        return m
    }, createSpace: function (p, n, o, q, m, s)
    {
        if(n < -o)
        {
            o = -n
        }
        var r = this.Em(n + o), k = this.Em(-o);
        if(this.msieInlineBlockAlignBug)
        {
            k = this.Em(d.getHD(p.parentNode).d - o)
        }
        if(p.isBox || s)
        {
            var l = (p.scale == null ? 1 : p.scale);
            p.bbox = {exactW: true, h: n * l, d: o * l, w: q * l, rw: q * l, lw: 0};
            p.style.height = r;
            p.style.verticalAlign = k;
            p.HH = (n + o) * l
        }
        else
        {
            p = this.addElement(p, "span", {style: {height: r, verticalAlign: k}, isMathJax: true})
        }
        if(q >= 0)
        {
            p.style.width = this.Em(q);
            p.style.display = "inline-block";
            p.style.overflow = "hidden"
        }
        else
        {
            if(this.msieNegativeSpaceBug)
            {
                p.style.height = ""
            }
            p.style.marginLeft = this.Em(q);
            if(d.safariNegativeSpaceBug && p.parentNode.firstChild == p)
            {
                this.createBlank(p, 0, true)
            }
        }
        if(m && m !== g.COLOR.TRANSPARENT)
        {
            p.style.backgroundColor = m;
            p.style.position = "relative"
        }
        return p
    }, createRule: function (r, n, p, s, l)
    {
        if(n < -p)
        {
            p = -n
        }
        var m = d.TeX.min_rule_thickness, o = 1;
        if(s > 0 && s * this.em < m)
        {
            s = m / this.em
        }
        if(n + p > 0 && (n + p) * this.em < m)
        {
            o = 1 / (n + p) * (m / this.em);
            n *= o;
            p *= o
        }
        if(!l)
        {
            l = "solid"
        }
        else
        {
            l = "solid " + l
        }
        l = this.Em(s) + " " + l;
        var t = (o === 1 ? this.Em(n + p) : m + "px"), k = this.Em(-p);
        var q = this.addElement(r, "span", {style: {borderLeft: l, display: "inline-block", overflow: "hidden", width: 0, height: t, verticalAlign: k}, bbox: {h: n, d: p, w: s, rw: s, lw: 0, exactW: true}, noAdjust: true, HH: n + p, isMathJax: true});
        if(s > 0 && q.offsetWidth == 0)
        {
            q.style.width = this.Em(s)
        }
        if(r.isBox || r.className == "mspace")
        {
            r.bbox = q.bbox, r.HH = n + p
        }
        return q
    }, createFrame: function (s, q, r, u, x, l)
    {
        if(q < -r)
        {
            r = -q
        }
        var p = 2 * x;
        if(this.msieFrameSizeBug)
        {
            if(u < p)
            {
                u = p
            }
            if(q + r < p)
            {
                q = p - r
            }
        }
        if(this.msieBorderWidthBug)
        {
            p = 0
        }
        var v = this.Em(q + r - p), k = this.Em(-r - x), o = this.Em(u - p);
        var m = this.Em(x) + " " + l;
        var n = this.addElement(s, "span", {style: {border: m, display: "inline-block", overflow: "hidden", width: o, height: v}, bbox: {h: q, d: r, w: u, rw: u, lw: 0, exactW: true}, noAdjust: true, HH: q + r, isMathJax: true});
        if(k)
        {
            n.style.verticalAlign = k
        }
        return n
    }, parentNode: function (l)
    {
        var k = l.parentNode;
        if(k.nodeName.toLowerCase() === "a")
        {
            k = k.parentNode
        }
        return k
    }, createStack: function (m, o, l)
    {
        if(this.msiePaddingWidthBug)
        {
            this.createStrut(m, 0)
        }
        var n = String(l).match(/%$/);
        var k = (!n && l != null ? l : 0);
        m = this.addElement(m, "span", {noAdjust: true, HH: 0, isMathJax: true, style: {display: "inline-block", position: "relative", width: (n ? "100%" : this.Em(k)), height: 0}});
        if(!o)
        {
            m.parentNode.bbox = m.bbox = {exactW: true, h: -this.BIGDIMEN, d: -this.BIGDIMEN, w: k, lw: this.BIGDIMEN, rw: (!n && l != null ? l : -this.BIGDIMEN)};
            if(n)
            {
                m.bbox.width = l
            }
        }
        return m
    }, createBox: function (l, k)
    {
        var m = this.addElement(l, "span", {style: {position: "absolute"}, isBox: true, isMathJax: true});
        if(k != null)
        {
            m.style.width = k
        }
        return m
    }, addBox: function (k, l)
    {
        l.style.position = "absolute";
        l.isBox = l.isMathJax = true;
        return k.appendChild(l)
    }, placeBox: function (u, s, q, o)
    {
        u.isMathJax = true;
        var v = d.parentNode(u), C = u.bbox, z = v.bbox;
        if(this.msiePlaceBoxBug)
        {
            this.addText(u, this.NBSP)
        }
        if(this.imgSpaceBug)
        {
            this.addText(u, this.imgSpace)
        }
        var w, F = 0;
        if(u.HH != null)
        {
            w = u.HH
        }
        else
        {
            if(C)
            {
                w = Math.max(3, C.h + C.d)
            }
            else
            {
                w = u.offsetHeight / this.em
            }
        }
        if(!u.noAdjust)
        {
            w += 1;
            w = Math.round(w * this.em) / this.em;
            if(this.msieInlineBlockAlignBug)
            {
                this.addElement(u, "img", {className: "MathJax_strut", border: 0, src: "about:blank", isMathJax: true, style: {width: 0, height: this.Em(w)}})
            }
            else
            {
                this.addElement(u, "span", {isMathJax: true, style: {display: "inline-block", width: 0, height: this.Em(w)}});
                if(d.chromeHeightBug)
                {
                    w -= (u.lastChild.offsetHeight - Math.round(w * this.em)) / this.em
                }
            }
        }
        if(C)
        {
            if(this.initialSkipBug)
            {
                if(C.lw < 0)
                {
                    F = C.lw;
                    d.createBlank(u, -F, true)
                }
                if(C.rw > C.w)
                {
                    d.createBlank(u, C.rw - C.w + 0.1)
                }
            }
            if(!this.msieClipRectBug && !C.noclip && !o)
            {
                var B = 3 / this.em;
                var A = (C.H == null ? C.h : C.H), m = (C.D == null ? C.d : C.D);
                var E = w - A - B, p = w + m + B, n = C.lw - 3 * B, k = 1000;
                if(this.initialSkipBug && C.lw < 0)
                {
                    n = -3 * B
                }
                if(C.isFixed)
                {
                    k = C.width - n
                }
                u.style.clip = "rect(" + this.Em(E) + " " + this.Em(k) + " " + this.Em(p) + " " + this.Em(n) + ")"
            }
        }
        u.style.top = this.Em(-q - w);
        u.style.left = this.Em(s + F);
        if(C && z)
        {
            if(C.H != null && (z.H == null || C.H + q > z.H))
            {
                z.H = C.H + q
            }
            if(C.D != null && (z.D == null || C.D - q > z.D))
            {
                z.D = C.D - q
            }
            if(C.h + q > z.h)
            {
                z.h = C.h + q
            }
            if(C.d - q > z.d)
            {
                z.d = C.d - q
            }
            if(z.H != null && z.H <= z.h)
            {
                delete z.H
            }
            if(z.D != null && z.D <= z.d)
            {
                delete z.D
            }
            if(C.w + s > z.w)
            {
                z.w = C.w + s;
                if(z.width == null)
                {
                    v.style.width = this.Em(z.w)
                }
            }
            if(C.rw + s > z.rw)
            {
                z.rw = C.rw + s
            }
            if(C.lw + s < z.lw)
            {
                z.lw = C.lw + s
            }
            if(C.width != null && !C.isFixed)
            {
                if(z.width == null)
                {
                    v.style.width = z.width = "100%";
                    if(C.minWidth)
                    {
                        v.style.minWidth = z.minWidth = C.minWidth
                    }
                }
                u.style.width = C.width
            }
        }
    }, alignBox: function (n, t, s)
    {
        this.placeBox(n, 0, s);
        var p = n.bbox;
        if(p.isMultiline)
        {
            return
        }
        var m = p.width != null && !p.isFixed;
        var o = 0, q = -p.w / 2, k = "50%";
        if(this.initialSkipBug)
        {
            o = p.w - p.rw - 0.1;
            q += p.lw
        }
        if(this.msieMarginScaleBug)
        {
            q = (q * this.em) + "px"
        }
        else
        {
            q = this.Em(q)
        }
        if(m)
        {
            q = "";
            k = (50 - parseFloat(p.width) / 2) + "%"
        }
        b.Insert(n.style, ({right: {left: "", right: this.Em(o)}, center: {left: k, marginLeft: q}})[t])
    }, setStackWidth: function (l, k)
    {
        if(typeof(k) === "number")
        {
            l.style.width = this.Em(Math.max(0, k));
            var m = l.bbox;
            if(m)
            {
                m.w = k;
                m.exactW = true
            }
            m = l.parentNode.bbox;
            if(m)
            {
                m.w = k;
                m.exactW = true
            }
        }
        else
        {
            l.style.width = l.parentNode.style.width = "100%";
            if(l.bbox)
            {
                l.bbox.width = k
            }
            if(l.parentNode.bbox)
            {
                l.parentNode.bbox.width = k
            }
        }
    }, createDelimiter: function (u, k, n, q, o)
    {
        if(!k)
        {
            u.bbox = {h: 0, d: 0, w: this.TeX.nulldelimiterspace, lw: 0};
            u.bbox.rw = u.bbox.w;
            this.createSpace(u, u.bbox.h, u.bbox.d, u.bbox.w);
            return
        }
        if(!q)
        {
            q = 1
        }
        if(!(n instanceof Array))
        {
            n = [n, n]
        }
        var t = n[1];
        n = n[0];
        var l = {alias: k};
        while(l.alias)
        {
            k = l.alias;
            l = this.FONTDATA.DELIMITERS[k];
            if(!l)
            {
                l = {HW: [0, this.FONTDATA.VARIANT[g.VARIANT.NORMAL]]}
            }
        }
        if(l.load)
        {
            b.RestartAfter(h.Require(this.fontDir + "/fontdata-" + l.load + ".js"))
        }
        for(var s = 0, p = l.HW.length; s < p; s++)
        {
            if(l.HW[s][0] * q >= n - 0.01 || (s == p - 1 && !l.stretch))
            {
                if(l.HW[s][2])
                {
                    q *= l.HW[s][2]
                }
                if(l.HW[s][3])
                {
                    k = l.HW[s][3]
                }
                var r = this.addElement(u, "span");
                this.createChar(r, [k, l.HW[s][1]], q, o);
                u.bbox = r.bbox;
                u.offset = 0.65 * u.bbox.w;
                u.scale = q;
                return
            }
        }
        if(l.stretch)
        {
            this["extendDelimiter" + l.dir](u, t, l.stretch, q, o)
        }
    }, extendDelimiterV: function (A, t, E, F, w)
    {
        var o = this.createStack(A, true);
        var v = this.createBox(o), u = this.createBox(o);
        this.createChar(v, (E.top || E.ext), F, w);
        this.createChar(u, (E.bot || E.ext), F, w);
        var m = {bbox: {w: 0, lw: 0, rw: 0}}, D = m, p;
        var B = v.bbox.h + v.bbox.d + u.bbox.h + u.bbox.d;
        var r = -v.bbox.h;
        this.placeBox(v, 0, r, true);
        r -= v.bbox.d;
        if(E.mid)
        {
            D = this.createBox(o);
            this.createChar(D, E.mid, F, w);
            B += D.bbox.h + D.bbox.d
        }
        if(E.min && t < B * E.min)
        {
            t = B * E.min
        }
        if(t > B)
        {
            m = this.Element("span");
            this.createChar(m, E.ext, F, w);
            var C = m.bbox.h + m.bbox.d, l = C - 0.05, x, q, z = (E.mid ? 2 : 1);
            q = x = Math.min(Math.ceil((t - B) / (z * l)), this.maxStretchyParts);
            if(!E.fullExtenders)
            {
                l = (t - B) / (z * x)
            }
            var s = (x / (x + 1)) * (C - l);
            l = C - s;
            r += s + l - m.bbox.h;
            while(z-- > 0)
            {
                while(x-- > 0)
                {
                    if(!this.msieCloneNodeBug)
                    {
                        p = m.cloneNode(true)
                    }
                    else
                    {
                        p = this.Element("span");
                        this.createChar(p, E.ext, F, w)
                    }
                    p.bbox = m.bbox;
                    r -= l;
                    this.placeBox(this.addBox(o, p), 0, r, true)
                }
                r += s - m.bbox.d;
                if(E.mid && z)
                {
                    this.placeBox(D, 0, r - D.bbox.h, true);
                    x = q;
                    r += -(D.bbox.h + D.bbox.d) + s + l - m.bbox.h
                }
            }
        }
        else
        {
            r += (B - t) / 2;
            if(E.mid)
            {
                this.placeBox(D, 0, r - D.bbox.h, true);
                r += -(D.bbox.h + D.bbox.d)
            }
            r += (B - t) / 2
        }
        this.placeBox(u, 0, r - u.bbox.h, true);
        r -= u.bbox.h + u.bbox.d;
        A.bbox = {w: Math.max(v.bbox.w, m.bbox.w, u.bbox.w, D.bbox.w), lw: Math.min(v.bbox.lw, m.bbox.lw, u.bbox.lw, D.bbox.lw), rw: Math.max(v.bbox.rw, m.bbox.rw, u.bbox.rw, D.bbox.rw), h: 0, d: -r, exactW: true};
        A.scale = F;
        A.offset = 0.55 * A.bbox.w;
        A.isMultiChar = true;
        this.setStackWidth(o, A.bbox.w)
    }, extendDelimiterH: function (B, o, E, G, y)
    {
        var r = this.createStack(B, true);
        var p = this.createBox(r), C = this.createBox(r);
        this.createChar(p, (E.left || E.rep), G, y);
        this.createChar(C, (E.right || E.rep), G, y);
        var l = this.Element("span");
        this.createChar(l, E.rep, G, y);
        var D = {bbox: {h: -this.BIGDIMEN, d: -this.BIGDIMEN}}, m;
        this.placeBox(p, -p.bbox.lw, 0, true);
        var u = (p.bbox.rw - p.bbox.lw) + (C.bbox.rw - C.bbox.lw) - 0.05, t = p.bbox.rw - p.bbox.lw - 0.025, v;
        if(E.mid)
        {
            D = this.createBox(r);
            this.createChar(D, E.mid, G, y);
            u += D.bbox.w
        }
        if(E.min && o < u * E.min)
        {
            o = u * E.min
        }
        if(o > u)
        {
            var F = l.bbox.rw - l.bbox.lw, q = F - 0.05, z, s, A = (E.mid ? 2 : 1);
            s = z = Math.min(Math.ceil((o - u) / (A * q)), this.maxStretchyParts);
            if(!E.fillExtenders)
            {
                q = (o - u) / (A * z)
            }
            v = (z / (z + 1)) * (F - q);
            q = F - v;
            t -= l.bbox.lw + v;
            while(A-- > 0)
            {
                while(z-- > 0)
                {
                    if(!this.cloneNodeBug)
                    {
                        m = l.cloneNode(true)
                    }
                    else
                    {
                        m = this.Element("span");
                        this.createChar(m, E.rep, G, y)
                    }
                    m.bbox = l.bbox;
                    this.placeBox(this.addBox(r, m), t, 0, true);
                    t += q
                }
                if(E.mid && A)
                {
                    this.placeBox(D, t, 0, true);
                    t += D.bbox.w - v;
                    z = s
                }
            }
        }
        else
        {
            t -= (u - o) / 2;
            if(E.mid)
            {
                this.placeBox(D, t, 0, true);
                t += D.bbox.w
            }
            t -= (u - o) / 2
        }
        this.placeBox(C, t, 0, true);
        B.bbox = {w: t + C.bbox.rw, lw: 0, rw: t + C.bbox.rw, H: Math.max(p.bbox.h, l.bbox.h, C.bbox.h, D.bbox.h), D: Math.max(p.bbox.d, l.bbox.d, C.bbox.d, D.bbox.d), h: l.bbox.h, d: l.bbox.d, exactW: true};
        B.scale = G;
        B.isMultiChar = true;
        this.setStackWidth(r, B.bbox.w)
    }, createChar: function (s, p, n, k)
    {
        s.isMathJax = true;
        var r = s, t = "", o = {fonts: [p[1]], noRemap: true};
        if(k && k === g.VARIANT.BOLD)
        {
            o.fonts = [p[1] + "-bold", p[1]]
        }
        if(typeof(p[1]) !== "string")
        {
            o = p[1]
        }
        if(p[0] instanceof Array)
        {
            for(var q = 0, l = p[0].length; q < l; q++)
            {
                t += String.fromCharCode(p[0][q])
            }
        }
        else
        {
            t = String.fromCharCode(p[0])
        }
        if(p[4])
        {
            n *= p[4]
        }
        if(n !== 1 || p[3])
        {
            r = this.addElement(s, "span", {style: {fontSize: this.Percent(n)}, scale: n, isMathJax: true});
            this.handleVariant(r, o, t);
            s.bbox = r.bbox
        }
        else
        {
            this.handleVariant(s, o, t)
        }
        if(p[2])
        {
            s.style.marginLeft = this.Em(p[2])
        }
        if(p[3])
        {
            s.firstChild.style.verticalAlign = this.Em(p[3]);
            s.bbox.h += p[3];
            if(s.bbox.h < 0)
            {
                s.bbox.h = 0
            }
        }
        if(p[5])
        {
            s.bbox.h += p[5]
        }
        if(p[6])
        {
            s.bbox.d += p[6]
        }
        if(this.AccentBug && s.bbox.w === 0)
        {
            r.firstChild.nodeValue += this.NBSP
        }
    }, positionDelimiter: function (l, k)
    {
        k -= l.bbox.h;
        l.bbox.d -= k;
        l.bbox.h += k;
        if(k)
        {
            if(this.safariVerticalAlignBug || this.konquerorVerticalAlignBug || (this.operaVerticalAlignBug && l.isMultiChar))
            {
                if(l.firstChild.style.display === "" && l.style.top !== "")
                {
                    l = l.firstChild;
                    k -= d.unEm(l.style.top)
                }
                l.style.position = "relative";
                l.style.top = this.Em(-k)
            }
            else
            {
                l.style.verticalAlign = this.Em(k);
                if(d.ffVerticalAlignBug)
                {
                    d.createRule(l.parentNode, l.bbox.h, 0, 0)
                }
            }
        }
    }, handleVariant: function (A, p, s)
    {
        var z = "", x, C, t, D, k = A, l = !!A.style.fontFamily;
        if(s.length === 0)
        {
            return
        }
        if(!A.bbox)
        {
            A.bbox = {w: 0, h: -this.BIGDIMEN, d: -this.BIGDIMEN, rw: -this.BIGDIMEN, lw: this.BIGDIMEN}
        }
        if(!p)
        {
            p = this.FONTDATA.VARIANT[g.VARIANT.NORMAL]
        }
        D = p;
        for(var B = 0, y = s.length; B < y; B++)
        {
            p = D;
            x = s.charCodeAt(B);
            C = s.charAt(B);
            if(x >= 55296 && x < 56319)
            {
                B++;
                x = (((x - 55296) << 10) + (s.charCodeAt(B) - 56320)) + 65536;
                if(this.FONTDATA.RemapPlane1)
                {
                    var E = this.FONTDATA.RemapPlane1(x, p);
                    x = E.n;
                    p = E.variant
                }
            }
            else
            {
                var u, r, v = this.FONTDATA.RANGES;
                for(u = 0, r = v.length; u < r; u++)
                {
                    if(v[u].name === "alpha" && p.noLowerCase)
                    {
                        continue
                    }
                    var q = p["offset" + v[u].offset];
                    if(q && x >= v[u].low && x <= v[u].high)
                    {
                        if(v[u].remap && v[u].remap[x])
                        {
                            x = q + v[u].remap[x]
                        }
                        else
                        {
                            x = x - v[u].low + q;
                            if(v[u].add)
                            {
                                x += v[u].add
                            }
                        }
                        if(p["variant" + v[u].offset])
                        {
                            p = this.FONTDATA.VARIANT[p["variant" + v[u].offset]]
                        }
                        break
                    }
                }
            }
            if(p.remap && p.remap[x])
            {
                if(p.remap[x] instanceof Array)
                {
                    var o = p.remap[x];
                    x = o[0];
                    p = this.FONTDATA.VARIANT[o[1]]
                }
                else
                {
                    if(typeof(p.remap[x]) === "string")
                    {
                        s = p.remap[x] + s.substr(B + 1);
                        B = 0;
                        y = s.length;
                        x = s.charCodeAt(0)
                    }
                    else
                    {
                        x = p.remap[x];
                        if(p.remap.variant)
                        {
                            p = this.FONTDATA.VARIANT[p.remap.variant]
                        }
                    }
                }
            }
            if(this.FONTDATA.REMAP[x] && !p.noRemap)
            {
                x = this.FONTDATA.REMAP[x];
                if(x instanceof Array)
                {
                    p = this.FONTDATA.VARIANT[x[1]];
                    x = x[0]
                }
                if(typeof(x) === "string")
                {
                    s = x + s.substr(B + 1);
                    B = 0;
                    y = s.length;
                    x = x.charCodeAt(0)
                }
            }
            t = this.lookupChar(p, x);
            C = t[x];
            if(l || (!this.checkFont(t, k.style) && !C[5].img))
            {
                if(z.length)
                {
                    this.addText(k, z);
                    z = ""
                }
                var w = !!k.style.fontFamily || !!A.style.fontStyle || !!A.style.fontWeight || !t.directory || l;
                l = false;
                if(k !== A)
                {
                    w = !this.checkFont(t, A.style);
                    k = A
                }
                if(w)
                {
                    k = this.addElement(A, "span", {isMathJax: true, subSpan: true})
                }
                this.handleFont(k, t, k !== A)
            }
            z = this.handleChar(k, t, C, x, z);
            if(!(C[5] || {}).space)
            {
                if(C[0] / 1000 > A.bbox.h)
                {
                    A.bbox.h = C[0] / 1000
                }
                if(C[1] / 1000 > A.bbox.d)
                {
                    A.bbox.d = C[1] / 1000
                }
            }
            if(A.bbox.w + C[3] / 1000 < A.bbox.lw)
            {
                A.bbox.lw = A.bbox.w + C[3] / 1000
            }
            if(A.bbox.w + C[4] / 1000 > A.bbox.rw)
            {
                A.bbox.rw = A.bbox.w + C[4] / 1000
            }
            A.bbox.w += C[2] / 1000
        }
        if(z.length)
        {
            this.addText(k, z)
        }
        if(A.scale && A.scale !== 1)
        {
            A.bbox.h *= A.scale;
            A.bbox.d *= A.scale;
            A.bbox.w *= A.scale;
            A.bbox.lw *= A.scale;
            A.bbox.rw *= A.scale
        }
        if(s.length == 1 && t.skew && t.skew[x])
        {
            A.bbox.skew = t.skew[x]
        }
    }, checkFont: function (k, l)
    {
        var m = (l.fontWeight || "normal");
        if(m.match(/^\d+$/))
        {
            m = (parseInt(m) >= 600 ? "bold" : "normal")
        }
        return(k.family.replace(/'/g, "") === l.fontFamily.replace(/'/g, "") && (k.style || "normal") === (l.fontStyle || "normal") && (k.weight || "normal") === m)
    }, handleFont: function (m, k, o)
    {
        m.style.fontFamily = k.family;
        if(!k.directory)
        {
            m.style.fontSize = Math.floor(100 / d.scale + 0.5) + "%"
        }
        if(!(d.FontFaceBug && k.isWebFont))
        {
            var l = k.style || "normal", n = k.weight || "normal";
            if(l !== "normal" || o)
            {
                m.style.fontStyle = l
            }
            if(n !== "normal" || o)
            {
                m.style.fontWeight = n
            }
        }
    }, handleChar: function (l, k, s, r, q)
    {
        var p = s[5];
        if(p.space)
        {
            if(q.length)
            {
                this.addText(l, q)
            }
            d.createShift(l, s[2] / 1000);
            return""
        }
        if(p.img)
        {
            return this.handleImg(l, k, s, r, q)
        }
        if(p.isUnknown && this.FONTDATA.DELIMITERS[r])
        {
            if(q.length)
            {
                this.addText(l, q)
            }
            var o = l.scale;
            d.createDelimiter(l, r, 0, 1, k);
            if(this.FONTDATA.DELIMITERS[r].dir === "V")
            {
                l.style.verticalAlign = this.Em(l.bbox.d);
                l.bbox.h += l.bbox.d;
                l.bbox.d = 0
            }
            l.scale = o;
            s[0] = l.bbox.h * 1000;
            s[1] = l.bbox.d * 1000;
            s[2] = l.bbox.w * 1000;
            s[3] = l.bbox.lw * 1000;
            s[4] = l.bbox.rw * 1000;
            return""
        }
        if(p.c == null)
        {
            if(r <= 65535)
            {
                p.c = String.fromCharCode(r)
            }
            else
            {
                var m = r - 65536;
                p.c = String.fromCharCode((m >> 10) + 55296) + String.fromCharCode((m & 1023) + 56320)
            }
        }
        if(p.rfix)
        {
            this.addText(l, q + p.c);
            d.createShift(l, p.rfix / 1000);
            return""
        }
        if(s[2] || !this.msieAccentBug || q.length)
        {
            return q + p.c
        }
        d.createShift(l, s[3] / 1000);
        d.createShift(l, (s[4] - s[3]) / 1000);
        this.addText(l, p.c);
        d.createShift(l, -s[4] / 1000);
        return""
    }, handleImg: function (l, k, p, o, m)
    {
        return m
    }, lookupChar: function (p, s)
    {
        var o, k;
        if(!p.FONTS)
        {
            var r = this.FONTDATA.FONTS;
            var q = (p.fonts || this.FONTDATA.VARIANT.normal.fonts);
            if(!(q instanceof Array))
            {
                q = [q]
            }
            if(p.fonts != q)
            {
                p.fonts = q
            }
            p.FONTS = [];
            for(o = 0, k = q.length; o < k; o++)
            {
                if(r[q[o]])
                {
                    p.FONTS.push(r[q[o]]);
                    r[q[o]].name = q[o]
                }
            }
        }
        for(o = 0, k = p.FONTS.length; o < k; o++)
        {
            var l = p.FONTS[o];
            if(typeof(l) === "string")
            {
                delete p.FONTS;
                this.loadFont(l)
            }
            if(l[s])
            {
                if(l[s].length === 5)
                {
                    l[s][5] = {}
                }
                if(d.allowWebFonts && !l.available)
                {
                    this.loadWebFont(l)
                }
                else
                {
                    return l
                }
            }
            else
            {
                this.findBlock(l, s)
            }
        }
        return this.unknownChar(p, s)
    }, unknownChar: function (k, m)
    {
        var l = (k.defaultFont || {family: d.config.undefinedFamily});
        if(k.bold)
        {
            l.weight = "bold"
        }
        if(k.italic)
        {
            l.style = "italic"
        }
        if(!l[m])
        {
            l[m] = [800, 200, 500, 0, 500, {isUnknown: true}]
        }
        b.signal.Post(["HTML-CSS Jax - unknown char", m, k]);
        return l
    }, findBlock: function (l, q)
    {
        if(l.Ranges)
        {
            for(var p = 0, k = l.Ranges.length; p < k; p++)
            {
                if(q < l.Ranges[p][0])
                {
                    return
                }
                if(q <= l.Ranges[p][1])
                {
                    var o = l.Ranges[p][2];
                    for(var n = l.Ranges.length - 1; n >= 0; n--)
                    {
                        if(l.Ranges[n][2] == o)
                        {
                            l.Ranges.splice(n, 1)
                        }
                    }
                    this.loadFont(l.directory + "/" + o + ".js")
                }
            }
        }
    }, loadFont: function (l)
    {
        var k = MathJax.Callback.Queue();
        k.Push(["Require", h, this.fontDir + "/" + l]);
        if(this.imgFonts)
        {
            if(!MathJax.isPacked)
            {
                l = l.replace(/\/([^\/]*)$/, d.imgPacked + "/$1")
            }
            k.Push(["Require", h, this.webfontDir + "/png/" + l])
        }
        b.RestartAfter(k.Push({}))
    }, loadWebFont: function (k)
    {
        k.available = k.isWebFont = true;
        if(d.FontFaceBug)
        {
            k.family = k.name;
            if(d.msieFontCSSBug)
            {
                k.family += "-Web"
            }
        }
        b.RestartAfter(this.Font.loadWebFont(k))
    }, loadWebFontError: function (l, k)
    {
        b.Startup.signal.Post("HTML-CSS Jax - disable web fonts");
        l.isWebFont = false;
        if(this.config.imageFont && this.config.imageFont === this.fontInUse)
        {
            this.imgFonts = true;
            b.Startup.signal.Post("HTML-CSS Jax - switch to image fonts");
            b.Startup.signal.Post("HTML-CSS Jax - using image fonts");
            e(["WebFontNotAvailable", "Web-Fonts not available -- using image fonts instead"], null, 3000);
            h.Require(this.directory + "/imageFonts.js", k)
        }
        else
        {
            this.allowWebFonts = false;
            k()
        }
    }, Element: MathJax.HTML.Element, addElement: MathJax.HTML.addElement, TextNode: MathJax.HTML.TextNode, addText: MathJax.HTML.addText, ucMatch: MathJax.HTML.ucMatch, BIGDIMEN: 10000000, ID: 0, idPostfix: "", GetID: function ()
    {
        this.ID++;
        return this.ID
    }, MATHSPACE: {veryverythinmathspace: 1 / 18, verythinmathspace: 2 / 18, thinmathspace: 3 / 18, mediummathspace: 4 / 18, thickmathspace: 5 / 18, verythickmathspace: 6 / 18, veryverythickmathspace: 7 / 18, negativeveryverythinmathspace: -1 / 18, negativeverythinmathspace: -2 / 18, negativethinmathspace: -3 / 18, negativemediummathspace: -4 / 18, negativethickmathspace: -5 / 18, negativeverythickmathspace: -6 / 18, negativeveryverythickmathspace: -7 / 18}, TeX: {x_height: 0.430554, quad: 1, num1: 0.676508, num2: 0.393732, num3: 0.44373, denom1: 0.685951, denom2: 0.344841, sup1: 0.412892, sup2: 0.362892, sup3: 0.288888, sub1: 0.15, sub2: 0.247217, sup_drop: 0.386108, sub_drop: 0.05, delim1: 2.39, delim2: 1, axis_height: 0.25, rule_thickness: 0.06, big_op_spacing1: 0.111111, big_op_spacing2: 0.166666, big_op_spacing3: 0.2, big_op_spacing4: 0.6, big_op_spacing5: 0.1, scriptspace: 0.1, nulldelimiterspace: 0.12, delimiterfactor: 901, delimitershortfall: 0.1, min_rule_thickness: 1.25}, NBSP: "\u00A0", rfuzz: 0});
    MathJax.Hub.Register.StartupHook("mml Jax Ready", function ()
    {
        g = MathJax.ElementJax.mml;
        g.mbase.Augment({toHTML: function (o)
        {
            o = this.HTMLcreateSpan(o);
            if(this.type != "mrow")
            {
                o = this.HTMLhandleSize(o)
            }
            for(var l = 0, k = this.data.length; l < k; l++)
            {
                if(this.data[l])
                {
                    this.data[l].toHTML(o)
                }
            }
            var q = this.HTMLcomputeBBox(o);
            var n = o.bbox.h, p = o.bbox.d;
            for(l = 0, k = q.length; l < k; l++)
            {
                q[l].HTMLstretchV(o, n, p)
            }
            if(q.length)
            {
                this.HTMLcomputeBBox(o, true)
            }
            if(this.HTMLlineBreaks(o))
            {
                o = this.HTMLmultiline(o)
            }
            this.HTMLhandleSpace(o);
            this.HTMLhandleColor(o);
            return o
        }, HTMLlineBreaks: function ()
        {
            return false
        }, HTMLmultiline: function ()
        {
            g.mbase.HTMLautoloadFile("multiline")
        }, HTMLcomputeBBox: function (q, p, o, k)
        {
            if(o == null)
            {
                o = 0
            }
            if(k == null)
            {
                k = this.data.length
            }
            var n = q.bbox = {exactW: true}, r = [];
            while(o < k)
            {
                var l = this.data[o];
                if(!l)
                {
                    continue
                }
                if(!p && l.HTMLcanStretch("Vertical"))
                {
                    r.push(l);
                    l = (l.CoreMO() || l)
                }
                this.HTMLcombineBBoxes(l, n);
                o++
            }
            this.HTMLcleanBBox(n);
            return r
        }, HTMLcombineBBoxes: function (k, l)
        {
            if(l.w == null)
            {
                this.HTMLemptyBBox(l)
            }
            var n = (k.bbox ? k : k.HTMLspanElement());
            if(!n || !n.bbox)
            {
                return
            }
            var m = n.bbox;
            if(m.d > l.d)
            {
                l.d = m.d
            }
            if(m.h > l.h)
            {
                l.h = m.h
            }
            if(m.D != null && m.D > l.D)
            {
                l.D = m.D
            }
            if(m.H != null && m.H > l.H)
            {
                l.H = m.H
            }
            if(n.style.paddingLeft)
            {
                l.w += d.unEm(n.style.paddingLeft) * (n.scale || 1)
            }
            if(l.w + m.lw < l.lw)
            {
                l.lw = l.w + m.lw
            }
            if(l.w + m.rw > l.rw)
            {
                l.rw = l.w + m.rw
            }
            l.w += m.w;
            if(n.style.paddingRight)
            {
                l.w += d.unEm(n.style.paddingRight) * (n.scale || 1)
            }
            if(m.width)
            {
                l.width = m.width;
                l.minWidth = m.minWidth
            }
            if(m.ic)
            {
                l.ic = m.ic
            }
            else
            {
                delete l.ic
            }
            if(l.exactW && !m.exactW)
            {
                delete l.exactW
            }
        }, HTMLemptyBBox: function (k)
        {
            k.h = k.d = k.H = k.D = k.rw = -d.BIGDIMEN;
            k.w = 0;
            k.lw = d.BIGDIMEN;
            return k
        }, HTMLcleanBBox: function (k)
        {
            if(k.h === this.BIGDIMEN)
            {
                k.h = k.d = k.H = k.D = k.w = k.rw = k.lw = 0
            }
            if(k.D <= k.d)
            {
                delete k.D
            }
            if(k.H <= k.h)
            {
                delete k.H
            }
        }, HTMLzeroBBox: function ()
        {
            return{h: 0, d: 0, w: 0, lw: 0, rw: 0}
        }, HTMLcanStretch: function (l)
        {
            if(this.isEmbellished())
            {
                var k = this.Core();
                if(k && k !== this)
                {
                    return k.HTMLcanStretch(l)
                }
            }
            return false
        }, HTMLstretchH: function (l, k)
        {
            return this.HTMLspanElement()
        }, HTMLstretchV: function (l, k, m)
        {
            return this.HTMLspanElement()
        }, HTMLnotEmpty: function (k)
        {
            while(k)
            {
                if((k.type !== "mrow" && k.type !== "texatom") || k.data.length > 1)
                {
                    return true
                }
                k = k.data[0]
            }
            return false
        }, HTMLmeasureChild: function (l, k)
        {
            if(this.data[l])
            {
                d.Measured(this.data[l].toHTML(k), k)
            }
            else
            {
                k.bbox = this.HTMLzeroBBox()
            }
        }, HTMLboxChild: function (l, k)
        {
            if(!this.data[l])
            {
                this.SetData(l, g.mrow())
            }
            return this.data[l].toHTML(k)
        }, HTMLcreateSpan: function (k)
        {
            if(this.spanID)
            {
                var l = this.HTMLspanElement();
                if(l && (l.parentNode === k || (l.parentNode || {}).parentNode === k))
                {
                    while(l.firstChild)
                    {
                        l.removeChild(l.firstChild)
                    }
                    l.bbox = this.HTMLzeroBBox();
                    l.scale = 1;
                    l.isMultChar = l.HH = null;
                    l.style.cssText = "";
                    return l
                }
            }
            if(this.href)
            {
                k = d.addElement(k, "a", {href: this.href, isMathJax: true})
            }
            k = d.addElement(k, "span", {className: this.type, isMathJax: true});
            if(d.imgHeightBug)
            {
                k.style.display = "inline-block"
            }
            if(this["class"])
            {
                k.className += " " + this["class"]
            }
            if(!this.spanID)
            {
                this.spanID = d.GetID()
            }
            k.id = (this.id || "MathJax-Span-" + this.spanID) + d.idPostfix;
            k.bbox = this.HTMLzeroBBox();
            this.styles = {};
            if(this.style)
            {
                k.style.cssText = this.style;
                if(k.style.fontSize)
                {
                    this.mathsize = k.style.fontSize;
                    k.style.fontSize = ""
                }
                this.styles = {border: d.getBorders(k), padding: d.getPadding(k)};
                if(this.styles.border)
                {
                    k.style.border = ""
                }
                if(this.styles.padding)
                {
                    k.style.padding = ""
                }
            }
            if(this.href)
            {
                k.parentNode.bbox = k.bbox
            }
            return k
        }, HTMLspanElement: function ()
        {
            if(!this.spanID)
            {
                return null
            }
            return document.getElementById((this.id || "MathJax-Span-" + this.spanID) + d.idPostfix)
        }, HTMLhandleVariant: function (l, k, m)
        {
            d.handleVariant(l, k, m)
        }, HTMLhandleSize: function (k)
        {
            if(!k.scale)
            {
                k.scale = this.HTMLgetScale();
                if(k.scale !== 1)
                {
                    k.style.fontSize = d.Percent(k.scale)
                }
            }
            return k
        }, HTMLhandleDir: function (l)
        {
            var k = this.Get("dir", true);
            if(k)
            {
                l.dir = k
            }
            return l
        }, HTMLhandleColor: function (w, id)
        {

            var y = this.getValues("mathcolor", "color");
            var mo;
            var mu;
            if(this.mathoutline)
            {
                mo = this.mathoutline;
            }
            else
            {
                mo="initial";
            }
            if(this.mathunderline)
            {
                mu=this.mathunderline;
            }


            if(this.mathbackground)
            {
                y.mathbackground = this.mathbackground
            }
            if(this.background)
            {
                y.background = this.background
            }
            if(this.style && w.style.backgroundColor)
            {
                y.mathbackground = w.style.backgroundColor;
                w.style.backgroundColor = "transparent"
            }
            var t = (this.styles || {}).border, v = (this.styles || {}).padding;
            if(y.color && !this.mathcolor)
            {
                y.mathcolor = y.color
            }
            if(y.background && !this.mathbackground)
            {
                y.mathbackground = y.background
            }
            if(y.mathcolor)
            {
                w.style.color = y.mathcolor
            }
            if((y.mathbackground && y.mathbackground !== g.COLOR.TRANSPARENT) || t || v)
            {
                var A = w.bbox, z = (A.exact ? 0 : 1 / d.em), u = 0, s = 0, m = w.style.paddingLeft, q = w.style.paddingRight;
                if(this.isToken)
                {
                    u = A.lw;
                    s = A.rw - A.w
                }
                if(m !== "")
                {
                    u += d.unEm(m) * (w.scale || 1)
                }
                if(q !== "")
                {
                    s -= d.unEm(q) * (w.scale || 1)
                }
                var l = (d.PaddingWidthBug || A.keepPadding || A.exactW ? 0 : s - u);
                var o = Math.max(0, d.getW(w) + l);
                var x = A.h + A.d, k = -A.d, r = 0, p = 0;
                if(o > 0)
                {
                    o += 2 * z;
                    u -= z
                }
                if(x > 0)
                {
                    x += 2 * z;
                    k -= z
                }
                s = -o - u;
                if(t)
                {
                    s -= t.right;
                    k -= t.bottom;
                    r += t.left;
                    p += t.right;
                    A.h += t.top;
                    A.d += t.bottom;
                    A.w += t.left + t.right;
                    A.lw -= t.left;
                    A.rw += t.right
                }
                if(v)
                {
                    x += v.top + v.bottom;
                    o += v.left + v.right;
                    s -= v.right;
                    k -= v.bottom;
                    r += v.left;
                    p += v.right;
                    A.h += v.top;
                    A.d += v.bottom;
                    A.w += v.left + v.right;
                    A.lw -= v.left;
                    A.rw += v.right
                }
                if(p)
                {
                    w.style.paddingRight = d.Em(p)
                }
                var n = d.Element("span", {id: "MathJax-Color-" + this.spanID + d.idPostfix, isMathJax: true, style: {display: "inline-block", outline: mo, backgroundColor: y.mathbackground, width: d.Em(o), height: d.Em(x), verticalAlign: d.Em(k), marginLeft: d.Em(u), marginRight: d.Em(s)}});
                d.setBorders(n, t);
                if(A.width)
                {
                    n.style.width = A.width;
                    n.style.marginRight = "-" + A.width
                }
                if(d.msieInlineBlockAlignBug)
                {
                    n.style.position = "relative";
                    n.style.width = n.style.height = 0;
                    n.style.verticalAlign = n.style.marginLeft = n.style.marginRight = "";
                    n.style.border = n.style.padding = "";
                    if(t && d.msieBorderWidthBug)
                    {
                        x += t.top + t.bottom;
                        o += t.left + t.right
                    }
                    n.style.width = d.Em(r + z);
                    d.placeBox(d.addElement(n, "span", {noAdjust: true, isMathJax: true, style: {display: "inline-block", position: "absolute", overflow: "hidden", background: (y.mathbackground || "transparent"), width: d.Em(o), height: d.Em(x)}}), u, A.h + z);
                    d.setBorders(n.firstChild, t)
                }
                w.parentNode.insertBefore(n, w);
                if(d.msieColorPositionBug)
                {
                    w.style.position = "relative"
                }
                return n
            }
            return null
        }, HTMLremoveColor: function ()
        {
            var k = document.getElementById("MathJax-Color-" + this.spanID + d.idPostfix);
            if(k)
            {
                k.parentNode.removeChild(k)
            }
        }, HTMLhandleSpace: function (o)
        {
            if(this.useMMLspacing)
            {
                if(this.type !== "mo")
                {
                    return
                }
                var m = this.getValues("scriptlevel", "lspace", "rspace");
                if(m.scriptlevel <= 0 || this.hasValue("lspace") || this.hasValue("rspace"))
                {
                    var l = this.HTMLgetMu(o);
                    m.lspace = Math.max(0, d.length2em(m.lspace, l));
                    m.rspace = Math.max(0, d.length2em(m.rspace, l));
                    var k = this, n = this.Parent();
                    while(n && n.isEmbellished() && n.Core() === k)
                    {
                        k = n;
                        n = n.Parent();
                        o = k.HTMLspanElement()
                    }
                    if(m.lspace)
                    {
                        o.style.paddingLeft = d.Em(m.lspace)
                    }
                    if(m.rspace)
                    {
                        o.style.paddingRight = d.Em(m.rspace)
                    }
                }
            }
            else
            {
                var p = this.texSpacing();
                if(p !== "")
                {
                    p = d.length2em(p, this.HTMLgetScale()) / (o.scale || 1);
                    if(o.style.paddingLeft)
                    {
                        p += d.unEm(o.style.paddingLeft)
                    }
                    o.style.paddingLeft = d.Em(p)
                }
            }
        }, HTMLgetScale: function ()
        {
            var m = 1, k = this.getValues("mathsize", "scriptlevel", "fontsize");
            if(this.style)
            {
                var l = this.HTMLspanElement();
                if(l.style.fontSize != "")
                {
                    k.fontsize = l.style.fontSize
                }
            }
            if(k.fontsize && !this.mathsize)
            {
                k.mathsize = k.fontsize
            }
            if(k.scriptlevel !== 0)
            {
                if(k.scriptlevel > 2)
                {
                    k.scriptlevel = 2
                }
                m = Math.pow(this.Get("scriptsizemultiplier"), k.scriptlevel);
                k.scriptminsize = d.length2em(this.Get("scriptminsize"));
                if(m < k.scriptminsize)
                {
                    m = k.scriptminsize
                }
            }
            if(this.isToken)
            {
                m *= d.length2em(k.mathsize)
            }
            return m
        }, HTMLgetMu: function (m)
        {
            var k = 1, l = this.getValues("scriptlevel", "scriptsizemultiplier");
            if(m.scale && m.scale !== 1)
            {
                k = 1 / m.scale
            }
            if(l.scriptlevel !== 0)
            {
                if(l.scriptlevel > 2)
                {
                    l.scriptlevel = 2
                }
                k = Math.sqrt(Math.pow(l.scriptsizemultiplier, l.scriptlevel))
            }
            return k
        }, HTMLgetVariant: function ()
        {
            var k = this.getValues("mathvariant", "fontfamily", "fontweight", "fontstyle");
            k.hasVariant = this.Get("mathvariant", true);
            if(!k.hasVariant)
            {
                k.family = k.fontfamily;
                k.weight = k.fontweight;
                k.style = k.fontstyle
            }
            if(this.style)
            {
                var m = this.HTMLspanElement();
                if(!k.family && m.style.fontFamily)
                {
                    k.family = m.style.fontFamily
                }
                if(!k.weight && m.style.fontWeight)
                {
                    k.weight = m.style.fontWeight
                }
                if(!k.style && m.style.fontStyle)
                {
                    k.style = m.style.fontStyle
                }
            }
            if(k.weight && k.weight.match(/^\d+$/))
            {
                k.weight = (parseInt(k.weight) > 600 ? "bold" : "normal")
            }
            var l = k.mathvariant;
            if(this.variantForm)
            {
                l = "-" + d.fontInUse + "-variant"
            }
            if(k.family && !k.hasVariant)
            {
                if(!k.weight && k.mathvariant.match(/bold/))
                {
                    k.weight = "bold"
                }
                if(!k.style && k.mathvariant.match(/italic/))
                {
                    k.style = "italic"
                }
                return{FONTS: [], fonts: [], noRemap: true, defaultFont: {family: k.family, style: k.style, weight: k.weight}}
            }
            if(k.weight === "bold")
            {
                l = {normal: g.VARIANT.BOLD, italic: g.VARIANT.BOLDITALIC, fraktur: g.VARIANT.BOLDFRAKTUR, script: g.VARIANT.BOLDSCRIPT, "sans-serif": g.VARIANT.BOLDSANSSERIF, "sans-serif-italic": g.VARIANT.SANSSERIFBOLDITALIC}[l] || l
            }
            else
            {
                if(k.weight === "normal")
                {
                    l = {bold: g.VARIANT.normal, "bold-italic": g.VARIANT.ITALIC, "bold-fraktur": g.VARIANT.FRAKTUR, "bold-script": g.VARIANT.SCRIPT, "bold-sans-serif": g.VARIANT.SANSSERIF, "sans-serif-bold-italic": g.VARIANT.SANSSERIFITALIC}[l] || l
                }
            }
            if(k.style === "italic")
            {
                l = {normal: g.VARIANT.ITALIC, bold: g.VARIANT.BOLDITALIC, "sans-serif": g.VARIANT.SANSSERIFITALIC, "bold-sans-serif": g.VARIANT.SANSSERIFBOLDITALIC}[l] || l
            }
            else
            {
                if(k.style === "normal")
                {
                    l = {italic: g.VARIANT.NORMAL, "bold-italic": g.VARIANT.BOLD, "sans-serif-italic": g.VARIANT.SANSSERIF, "sans-serif-bold-italic": g.VARIANT.BOLDSANSSERIF}[l] || l
                }
            }
            if(!(l in d.FONTDATA.VARIANT))
            {
                l = "normal"
            }
            return d.FONTDATA.VARIANT[l]
        }}, {HTMLautoload: function ()
        {
            var k = d.autoloadDir + "/" + this.type + ".js";
            b.RestartAfter(h.Require(k))
        }, HTMLautoloadFile: function (k)
        {
            var l = d.autoloadDir + "/" + k + ".js";
            b.RestartAfter(h.Require(l))
        }, HTMLstretchH: function (l, k)
        {
            this.HTMLremoveColor();
            return this.toHTML(l, k)
        }, HTMLstretchV: function (l, k, m)
        {
            this.HTMLremoveColor();
            return this.toHTML(l, k, m)
        }});
        g.chars.Augment({toHTML: function (n, m, l, o)
        {
            var r = this.data.join("").replace(/[\u2061-\u2064]/g, "");
            if(l)
            {
                r = l(r, o)
            }
            if(m.fontInherit)
            {
                var q = Math.floor(100 / d.scale + 0.5) + "%";
                d.addElement(n, "span", {style: {"font-size": q}}, [r]);
                if(m.bold)
                {
                    n.lastChild.style.fontWeight = "bold"
                }
                if(m.italic)
                {
                    n.lastChild.style.fontStyle = "italic"
                }
                var p = d.getHD(n), k = d.getW(n);
                n.bbox = {h: p.h, d: p.d, w: k, lw: 0, rw: k, exactW: true}
            }
            else
            {
                this.HTMLhandleVariant(n, m, r)
            }
        }});
        g.entity.Augment({toHTML: function (n, m, l, o)
        {
            var r = this.toString().replace(/[\u2061-\u2064]/g, "");
            if(l)
            {
                r = l(r, o)
            }
            if(m.fontInherit)
            {
                var q = Math.floor(100 / d.scale + 0.5) + "%";
                d.addElement(n, "span", {style: {"font-size": q}}, [r]);
                if(m.bold)
                {
                    n.lastChild.style.fontWeight = "bold"
                }
                if(m.italic)
                {
                    n.lastChild.style.fontStyle = "italic"
                }
                var p = d.getHD(n), k = d.getW(n);
                n.bbox = {h: p.h, d: p.d, w: k, lw: 0, rw: k, exactW: true}
            }
            else
            {
                this.HTMLhandleVariant(n, m, r)
            }
        }});
        g.mi.Augment({toHTML: function (o)
        {
            o = this.HTMLhandleSize(this.HTMLcreateSpan(o));
            o.bbox = null;
            var n = this.HTMLgetVariant();
            for(var l = 0, k = this.data.length; l < k; l++)
            {
                if(this.data[l])
                {
                    this.data[l].toHTML(o, n)
                }
            }
            if(!o.bbox)
            {
                o.bbox = this.HTMLzeroBBox()
            }
            var q = this.data.join(""), p = o.bbox;
            if(p.skew && q.length !== 1)
            {
                delete p.skew
            }
            if(p.rw > p.w && q.length === 1 && !n.noIC)
            {
                p.ic = p.rw - p.w;
                d.createBlank(o, p.ic);
                p.w = p.rw
            }
            this.HTMLhandleSpace(o);
            this.HTMLhandleColor(o);
            this.HTMLhandleDir(o);
            return o
        }});
        g.mn.Augment({toHTML: function (o)
        {
            o = this.HTMLhandleSize(this.HTMLcreateSpan(o));
            o.bbox = null;
            var n = this.HTMLgetVariant();
            for(var l = 0, k = this.data.length; l < k; l++)
            {
                if(this.data[l])
                {
                    this.data[l].toHTML(o, n)
                }
            }
            if(!o.bbox)
            {
                o.bbox = this.HTMLzeroBBox()
            }
            if(this.data.join("").length !== 1)
            {
                delete o.bbox.skew
            }
            this.HTMLhandleSpace(o);
            this.HTMLhandleColor(o);
            this.HTMLhandleDir(o);
            return o
        }});
        g.mo.Augment({toHTML: function (u)
        {
            u = this.HTMLhandleSize(this.HTMLcreateSpan(u));
            if(this.data.length == 0)
            {
                return u
            }
            else
            {
                u.bbox = null
            }
            var x = this.data.join("");
            var q = this.HTMLgetVariant();
            var w = this.getValues("largeop", "displaystyle");
            if(w.largeop)
            {
                q = d.FONTDATA.VARIANT[w.displaystyle ? "-largeOp" : "-smallOp"]
            }
            var v = this.CoreParent(), o = (v && v.isa(g.msubsup) && this !== v.data[v.base]), l = (o ? this.HTMLremapChars : null);
            if(x.length === 1 && v && v.isa(g.munderover) && this.CoreText(v.data[v.base]).length === 1)
            {
                var s = v.data[v.over], t = v.data[v.under];
                if(s && this === s.CoreMO() && v.Get("accent"))
                {
                    l = d.FONTDATA.REMAPACCENT
                }
                else
                {
                    if(t && this === t.CoreMO() && v.Get("accentunder"))
                    {
                        l = d.FONTDATA.REMAPACCENTUNDER
                    }
                }
            }
            if(o && x.match(/['`"\u00B4\u2032-\u2037\u2057]/))
            {
                q = d.FONTDATA.VARIANT["-" + d.fontInUse + "-variant"]
            }
            for(var r = 0, n = this.data.length; r < n; r++)
            {
                if(this.data[r])
                {
                    this.data[r].toHTML(u, q, this.HTMLremap, l)
                }
            }
            if(!u.bbox)
            {
                u.bbox = this.HTMLzeroBBox()
            }
            if(x.length !== 1)
            {
                delete u.bbox.skew
            }
            if(d.AccentBug && u.bbox.w === 0 && x.length === 1 && u.firstChild)
            {
                u.firstChild.nodeValue += d.NBSP;
                d.createSpace(u, 0, 0, -u.offsetWidth / d.em)
            }
            if(w.largeop)
            {
                var k = (u.bbox.h - u.bbox.d) / 2 - d.TeX.axis_height * u.scale;
                if(d.safariVerticalAlignBug && u.lastChild.nodeName === "IMG")
                {
                    u.lastChild.style.verticalAlign = d.Em(d.unEm(u.lastChild.style.verticalAlign || 0) / d.em - k / u.scale)
                }
                else
                {
                    if(d.konquerorVerticalAlignBug && u.lastChild.nodeName === "IMG")
                    {
                        u.style.position = "relative";
                        u.lastChild.style.position = "relative";
                        u.lastChild.style.top = d.Em(k / u.scale)
                    }
                    else
                    {
                        u.style.verticalAlign = d.Em(-k / u.scale)
                    }
                }
                u.bbox.h -= k;
                u.bbox.d += k;
                if(u.bbox.rw > u.bbox.w)
                {
                    u.bbox.ic = u.bbox.rw - u.bbox.w;
                    d.createBlank(u, u.bbox.ic);
                    u.bbox.w = u.bbox.rw
                }
            }
            this.HTMLhandleSpace(u);
            this.HTMLhandleColor(u);
            this.HTMLhandleDir(u);
            return u
        }, CoreParent: function ()
        {
            var k = this;
            while(k && k.isEmbellished() && k.CoreMO() === this && !k.isa(g.math))
            {
                k = k.Parent()
            }
            return k
        }, CoreText: function (k)
        {
            if(!k)
            {
                return""
            }
            if(k.isEmbellished())
            {
                return k.CoreMO().data.join("")
            }
            while((k.isa(g.mrow) || k.isa(g.TeXAtom) || k.isa(g.mstyle) || k.isa(g.mphantom)) && k.data.length === 1 && k.data[0])
            {
                k = k.data[0]
            }
            if(!k.isToken)
            {
                return""
            }
            else
            {
                return k.data.join("")
            }
        }, HTMLremapChars: {"*": "\u2217", '"': "\u2033", "\u00B0": "\u2218", "\u00B2": "2", "\u00B3": "3", "\u00B4": "\u2032", "\u00B9": "1"}, HTMLremap: function (l, k)
        {
            l = l.replace(/-/g, "\u2212");
            if(k)
            {
                l = l.replace(/'/g, "\u2032").replace(/`/g, "\u2035");
                if(l.length === 1)
                {
                    l = k[l] || l
                }
            }
            return l
        }, HTMLcanStretch: function (n)
        {
            if(!this.Get("stretchy"))
            {
                return false
            }
            var o = this.data.join("");
            if(o.length > 1)
            {
                return false
            }
            var l = this.CoreParent();
            if(l && l.isa(g.munderover) && this.CoreText(l.data[l.base]).length === 1)
            {
                var m = l.data[l.over], k = l.data[l.under];
                if(m && this === m.CoreMO() && l.Get("accent"))
                {
                    o = d.FONTDATA.REMAPACCENT[o] || o
                }
                else
                {
                    if(k && this === k.CoreMO() && l.Get("accentunder"))
                    {
                        o = d.FONTDATA.REMAPACCENTUNDER[o] || o
                    }
                }
            }
            o = d.FONTDATA.DELIMITERS[o.charCodeAt(0)];
            return(o && o.dir == n.substr(0, 1))
        }, HTMLstretchV: function (m, n, o)
        {
            this.HTMLremoveColor();
            var r = this.getValues("symmetric", "maxsize", "minsize");
            var p = this.HTMLspanElement(), s = this.HTMLgetMu(p), q;
            var k = d.TeX.axis_height, l = p.scale;
            if(r.symmetric)
            {
                q = 2 * Math.max(n - k, o + k)
            }
            else
            {
                q = n + o
            }
            r.maxsize = d.length2em(r.maxsize, s, p.bbox.h + p.bbox.d);
            r.minsize = d.length2em(r.minsize, s, p.bbox.h + p.bbox.d);
            q = Math.max(r.minsize, Math.min(r.maxsize, q));
            p = this.HTMLcreateSpan(m);
            d.createDelimiter(p, this.data.join("").charCodeAt(0), q, l);
            if(r.symmetric)
            {
                q = (p.bbox.h + p.bbox.d) / 2 + k
            }
            else
            {
                q = (p.bbox.h + p.bbox.d) * n / (n + o)
            }
            d.positionDelimiter(p, q);
            this.HTMLhandleSpace(p);
            this.HTMLhandleColor(p);
            return p
        }, HTMLstretchH: function (o, k)
        {
            this.HTMLremoveColor();
            var m = this.getValues("maxsize", "minsize", "mathvariant", "fontweight");
            if((m.fontweight === "bold" || parseInt(m.fontweight) >= 600) && !this.Get("mathvariant", true))
            {
                m.mathvariant = g.VARIANT.BOLD
            }
            var n = this.HTMLspanElement(), l = this.HTMLgetMu(n), p = n.scale;
            m.maxsize = d.length2em(m.maxsize, l, n.bbox.w);
            m.minsize = d.length2em(m.minsize, l, n.bbox.w);
            k = Math.max(m.minsize, Math.min(m.maxsize, k));
            n = this.HTMLcreateSpan(o);
            d.createDelimiter(n, this.data.join("").charCodeAt(0), k, p, m.mathvariant);
            this.HTMLhandleSpace(n);
            this.HTMLhandleColor(n);
            return n
        }});
        g.mtext.Augment({toHTML: function (o)
        {
            o = this.HTMLhandleSize(this.HTMLcreateSpan(o));
            var n = this.HTMLgetVariant();
            if(d.config.mtextFontInherit || this.Parent().type === "merror")
            {
                n = {bold: n.bold, italic: n.italic, fontInherit: true}
            }
            for(var l = 0, k = this.data.length; l < k; l++)
            {
                if(this.data[l])
                {
                    this.data[l].toHTML(o, n)
                }
            }
            if(!o.bbox)
            {
                o.bbox = this.HTMLzeroBBox()
            }
            if(this.data.join("").length !== 1)
            {
                delete o.bbox.skew
            }
            this.HTMLhandleSpace(o);
            this.HTMLhandleColor(o);
            this.HTMLhandleDir(o);
            return o
        }});
        g.merror.Augment({toHTML: function (l)
        {
            var n = MathJax.HTML.addElement(l, "span", {style: {display: "inline-block"}});
            l = this.SUPER(arguments).toHTML.call(this, n);
            var m = d.getHD(n), k = d.getW(n);
            n.bbox = {h: m.h, d: m.d, w: k, lw: 0, rw: k, exactW: true};
            n.id = l.id;
            l.id = null;
            return n
        }});
        g.ms.Augment({toHTML: g.mbase.HTMLautoload});
        g.mglyph.Augment({toHTML: g.mbase.HTMLautoload});
        g.mspace.Augment({toHTML: function (o)
        {
            o = this.HTMLcreateSpan(o);
            var m = this.getValues("height", "depth", "width");
            var l = this.HTMLgetMu(o);
            m.mathbackground = this.mathbackground;
            if(this.background && !this.mathbackground)
            {
                m.mathbackground = this.background
            }
            var n = d.length2em(m.height, l), p = d.length2em(m.depth, l), k = d.length2em(m.width, l);
            d.createSpace(o, n, p, k, m.mathbackground, true);
            return o
        }});
        g.mphantom.Augment({toHTML: function (o, l, q)
        {
            o = this.HTMLcreateSpan(o);
            if(this.data[0] != null)
            {
                var p = this.data[0].toHTML(o);
                if(q != null)
                {
                    d.Remeasured(this.data[0].HTMLstretchV(o, l, q), o)
                }
                else
                {
                    if(l != null)
                    {
                        d.Remeasured(this.data[0].HTMLstretchH(o, l), o)
                    }
                    else
                    {
                        p = d.Measured(p, o)
                    }
                }
                o.bbox = {w: p.bbox.w, h: p.bbox.h, d: p.bbox.d, lw: 0, rw: 0, exactW: true};
                for(var n = 0, k = o.childNodes.length; n < k; n++)
                {
                    o.childNodes[n].style.visibility = "hidden"
                }
            }
            this.HTMLhandleSpace(o);
            this.HTMLhandleColor(o);
            return o
        }, HTMLstretchH: g.mbase.HTMLstretchH, HTMLstretchV: g.mbase.HTMLstretchV});
        g.mpadded.Augment({toHTML: function (s, m, k)
        {
            s = this.HTMLcreateSpan(s);
            if(this.data[0] != null)
            {
                var q = d.createStack(s, true);
                var n = d.createBox(q);
                var l = this.data[0].toHTML(n);
                if(k != null)
                {
                    d.Remeasured(this.data[0].HTMLstretchV(n, m, k), n)
                }
                else
                {
                    if(m != null)
                    {
                        d.Remeasured(this.data[0].HTMLstretchH(n, m), n)
                    }
                    else
                    {
                        d.Measured(l, n)
                    }
                }
                var t = this.getValues("height", "depth", "width", "lspace", "voffset"), r = 0, p = 0, u = this.HTMLgetMu(s);
                if(t.lspace)
                {
                    r = this.HTMLlength2em(n, t.lspace, u)
                }
                if(t.voffset)
                {
                    p = this.HTMLlength2em(n, t.voffset, u)
                }
                d.placeBox(n, r, p);
                s.bbox = {h: n.bbox.h, d: n.bbox.d, w: n.bbox.w, exactW: true, lw: Math.min(0, n.bbox.lw + r), rw: Math.max(n.bbox.w, n.bbox.rw + r), H: Math.max((n.bbox.H == null ? -d.BIGDIMEN : n.bbox.H), n.bbox.h + p), D: Math.max((n.bbox.D == null ? -d.BIGDIMEN : n.bbox.D), n.bbox.d - p)};
                if(t.height !== "")
                {
                    s.bbox.h = this.HTMLlength2em(n, t.height, u, "h", 0)
                }
                if(t.depth !== "")
                {
                    s.bbox.d = this.HTMLlength2em(n, t.depth, u, "d", 0)
                }
                if(t.width !== "")
                {
                    s.bbox.w = this.HTMLlength2em(n, t.width, u, "w", 0)
                }
                if(s.bbox.H <= s.bbox.h)
                {
                    delete s.bbox.H
                }
                if(s.bbox.D <= s.bbox.d)
                {
                    delete s.bbox.D
                }
                var o = /^\s*(\d+(\.\d*)?|\.\d+)\s*(pt|em|ex|mu|px|pc|in|mm|cm)\s*$/;
                s.bbox.exact = !!((this.data[0] && this.data[0].data.length == 0) || o.exec(t.height) || o.exec(t.width) || o.exec(t.depth));
                d.setStackWidth(q, s.bbox.w)
            }
            this.HTMLhandleSpace(s);
            this.HTMLhandleColor(s);
            return s
        }, HTMLlength2em: function (q, r, l, s, k)
        {
            if(k == null)
            {
                k = -d.BIGDIMEN
            }
            var o = String(r).match(/width|height|depth/);
            var p = (o ? q.bbox[o[0].charAt(0)] : (s ? q.bbox[s] : 0));
            var n = d.length2em(r, l, p);
            if(s && String(r).match(/^\s*[-+]/))
            {
                return Math.max(k, q.bbox[s] + n)
            }
            else
            {
                return n
            }
        }, HTMLstretchH: g.mbase.HTMLstretchH, HTMLstretchV: g.mbase.HTMLstretchV});
        g.mrow.Augment({HTMLlineBreaks: function (k)
        {
            if(!this.parent.linebreakContainer)
            {
                return false
            }
            return(d.config.linebreaks.automatic && k.bbox.w > d.linebreakWidth) || this.hasNewline()
        }, HTMLstretchH: function (m, k)
        {
            this.HTMLremoveColor();
            var l = this.HTMLspanElement();
            this.data[this.core].HTMLstretchH(l, k);
            this.HTMLcomputeBBox(l, true);
            this.HTMLhandleColor(l);
            return l
        }, HTMLstretchV: function (m, l, n)
        {
            this.HTMLremoveColor();
            var k = this.HTMLspanElement();
            this.data[this.core].HTMLstretchV(k, l, n);
            this.HTMLcomputeBBox(k, true);
            this.HTMLhandleColor(k);
            return k
        }});
        g.mstyle.Augment({toHTML: function (l, k, m)
        {
            l = this.HTMLcreateSpan(l);
            if(this.data[0] != null)
            {
                var n = this.data[0].toHTML(l);
                if(m != null)
                {
                    this.data[0].HTMLstretchV(l, k, m)
                }
                else
                {
                    if(k != null)
                    {
                        this.data[0].HTMLstretchH(l, k)
                    }
                }
                l.bbox = n.bbox
            }
            this.HTMLhandleSpace(l);
            this.HTMLhandleColor(l);
            return l
        }, HTMLstretchH: g.mbase.HTMLstretchH, HTMLstretchV: g.mbase.HTMLstretchV});
        g.mfrac.Augment({toHTML: function (D)
        {
            D = this.HTMLcreateSpan(D);
            var m = d.createStack(D);
            var r = d.createBox(m), o = d.createBox(m);
            d.MeasureSpans([this.HTMLboxChild(0, r), this.HTMLboxChild(1, o)]);
            var k = this.getValues("displaystyle", "linethickness", "numalign", "denomalign", "bevelled");
            var I = this.HTMLgetScale(), C = k.displaystyle;
            var G = d.TeX.axis_height * I;
            if(k.bevelled)
            {
                var F = (C ? 0.4 : 0.15);
                var s = Math.max(r.bbox.h + r.bbox.d, o.bbox.h + o.bbox.d) + 2 * F;
                var E = d.createBox(m);
                d.createDelimiter(E, 47, s);
                d.placeBox(r, 0, (r.bbox.d - r.bbox.h) / 2 + G + F);
                d.placeBox(E, r.bbox.w - F / 2, (E.bbox.d - E.bbox.h) / 2 + G);
                d.placeBox(o, r.bbox.w + E.bbox.w - F, (o.bbox.d - o.bbox.h) / 2 + G - F)
            }
            else
            {
                var l = Math.max(r.bbox.w, o.bbox.w);
                var y = d.thickness2em(k.linethickness, I), A, z, x, w;
                var B = d.TeX.min_rule_thickness / this.em;
                if(C)
                {
                    x = d.TeX.num1;
                    w = d.TeX.denom1
                }
                else
                {
                    x = (y === 0 ? d.TeX.num3 : d.TeX.num2);
                    w = d.TeX.denom2
                }
                x *= I;
                w *= I;
                if(y === 0)
                {
                    A = Math.max((C ? 7 : 3) * d.TeX.rule_thickness, 2 * B);
                    z = (x - r.bbox.d) - (o.bbox.h - w);
                    if(z < A)
                    {
                        x += (A - z) / 2;
                        w += (A - z) / 2
                    }
                }
                else
                {
                    A = Math.max((C ? 2 : 0) * B + y, y / 2 + 1.5 * B);
                    z = (x - r.bbox.d) - (G + y / 2);
                    if(z < A)
                    {
                        x += A - z
                    }
                    z = (G - y / 2) - (o.bbox.h - w);
                    if(z < A)
                    {
                        w += A - z
                    }
                    var n = d.createBox(m);
                    d.createRule(n, y, 0, l + 2 * y);
                    d.placeBox(n, 0, G - y / 2)
                }
                d.alignBox(r, k.numalign, x);
                d.alignBox(o, k.denomalign, -w)
            }
            this.HTMLhandleSpace(D);
            this.HTMLhandleColor(D);
            return D
        }, HTMLcanStretch: function (k)
        {
            return false
        }, HTMLhandleSpace: function (k)
        {
            if(!this.texWithDelims)
            {
                var l = (this.useMMLspacing ? 0 : d.length2em(this.texSpacing() || 0)) + 0.12;
                k.style.paddingLeft = d.Em(l);
                k.style.paddingRight = d.Em(0.12)
            }
        }});
        g.msqrt.Augment({toHTML: function (w)
        {
            w = this.HTMLcreateSpan(w);
            var z = d.createStack(w);
            var n = d.createBox(z), u = d.createBox(z), s = d.createBox(z);
            var r = this.HTMLgetScale();
            var A = d.TeX.rule_thickness * r, m, l, y, o;
            if(this.Get("displaystyle"))
            {
                m = d.TeX.x_height * r
            }
            else
            {
                m = A
            }
            l = Math.max(A + m / 4, 1.5 * d.TeX.min_rule_thickness / this.em);
            var k = this.HTMLboxChild(0, n);
            y = k.bbox.h + k.bbox.d + l + A;
            d.createDelimiter(s, 8730, y, r);
            d.MeasureSpans([k, s]);
            o = k.bbox.w;
            var v = 0;
            if(s.isMultiChar || (d.AdjustSurd && d.imgFonts))
            {
                s.bbox.w *= 0.95
            }
            if(s.bbox.h + s.bbox.d > y)
            {
                l = ((s.bbox.h + s.bbox.d) - (y - A)) / 2
            }
            var B = d.FONTDATA.DELIMITERS[d.FONTDATA.RULECHAR];
            if(!B || o < B.HW[0][0] * r || r < 0.75)
            {
                d.createRule(u, 0, A, o)
            }
            else
            {
                d.createDelimiter(u, d.FONTDATA.RULECHAR, o, r)
            }
            y = k.bbox.h + l + A;
            l = y * d.rfuzz;
            if(s.isMultiChar)
            {
                l = d.rfuzz
            }
            v = this.HTMLaddRoot(z, s, v, s.bbox.h + s.bbox.d - y, r);
            d.placeBox(s, v, y - s.bbox.h);
            d.placeBox(u, v + s.bbox.w, y - u.bbox.h + l);
            d.placeBox(n, v + s.bbox.w, 0);
            this.HTMLhandleSpace(w);
            this.HTMLhandleColor(w);
            return w
        }, HTMLaddRoot: function (m, l, k, o, n)
        {
            return k
        }});
        g.mroot.Augment({toHTML: g.msqrt.prototype.toHTML, HTMLaddRoot: function (s, l, q, o, k)
        {
            var m = d.createBox(s);
            if(this.data[1])
            {
                var p = this.data[1].toHTML(m);
                p.style.paddingRight = p.style.paddingLeft = "";
                d.Measured(p, m)
            }
            else
            {
                m.bbox = this.HTMLzeroBBox()
            }
            var n = this.HTMLrootHeight(l.bbox.h + l.bbox.d, k, m) - o;
            var r = Math.min(m.bbox.w, m.bbox.rw);
            q = Math.max(r, l.offset);
            d.placeBox(m, q - r, n);
            return q - l.offset
        }, HTMLrootHeight: function (m, l, k)
        {
            return 0.45 * (m - 0.9 * l) + 0.6 * l + Math.max(0, k.bbox.d - 0.075)
        }});
        g.mfenced.Augment({toHTML: function (o)
        {
            o = this.HTMLcreateSpan(o);
            if(this.data.open)
            {
                this.data.open.toHTML(o)
            }
            if(this.data[0] != null)
            {
                this.data[0].toHTML(o)
            }
            for(var l = 1, k = this.data.length; l < k; l++)
            {
                if(this.data[l])
                {
                    if(this.data["sep" + l])
                    {
                        this.data["sep" + l].toHTML(o)
                    }
                    this.data[l].toHTML(o)
                }
            }
            if(this.data.close)
            {
                this.data.close.toHTML(o)
            }
            var q = this.HTMLcomputeBBox(o);
            var n = o.bbox.h, p = o.bbox.d;
            for(l = 0, k = q.length; l < k; l++)
            {
                q[l].HTMLstretchV(o, n, p)
            }
            if(q.length)
            {
                this.HTMLcomputeBBox(o, true)
            }
            this.HTMLhandleSpace(o);
            this.HTMLhandleColor(o);
            return o
        }, HTMLcomputeBBox: function (p, o)
        {
            var l = p.bbox = {}, q = [];
            this.HTMLcheckStretchy(this.data.open, l, q, o);
            this.HTMLcheckStretchy(this.data[0], l, q, o);
            for(var n = 1, k = this.data.length; n < k; n++)
            {
                if(this.data[n])
                {
                    this.HTMLcheckStretchy(this.data["sep" + n], l, q, o);
                    this.HTMLcheckStretchy(this.data[n], l, q, o)
                }
            }
            this.HTMLcheckStretchy(this.data.close, l, q, o);
            this.HTMLcleanBBox(l);
            return q
        }, HTMLcheckStretchy: function (k, l, n, m)
        {
            if(k)
            {
                if(!m && k.HTMLcanStretch("Vertical"))
                {
                    n.push(k);
                    k = (k.CoreMO() || k)
                }
                this.HTMLcombineBBoxes(k, l)
            }
        }});
        g.menclose.Augment({toHTML: g.mbase.HTMLautoload});
        g.maction.Augment({toHTML: g.mbase.HTMLautoload});
        g.semantics.Augment({toHTML: function (l, k, m)
        {
            l = this.HTMLcreateSpan(l);
            if(this.data[0] != null)
            {
                var n = this.data[0].toHTML(l);
                if(m != null)
                {
                    this.data[0].HTMLstretchV(l, k, m)
                }
                else
                {
                    if(k != null)
                    {
                        this.data[0].HTMLstretchH(l, k)
                    }
                }
                l.bbox = n.bbox
            }
            this.HTMLhandleSpace(l);
            return l
        }, HTMLstretchH: g.mbase.HTMLstretchH, HTMLstretchV: g.mbase.HTMLstretchV});
        g.munderover.Augment({toHTML: function (L, H, F)
        {
            var l = this.getValues("displaystyle", "accent", "accentunder", "align");
            if(!l.displaystyle && this.data[this.base] != null && this.data[this.base].CoreMO().Get("movablelimits"))
            {
                return g.msubsup.prototype.toHTML.call(this, L)
            }
            L = this.HTMLcreateSpan(L);
            var P = this.HTMLgetScale();
            var q = d.createStack(L);
            var r = [], o = [], N = [], w, M, I;
            for(M = 0, I = this.data.length; M < I; M++)
            {
                if(this.data[M] != null)
                {
                    w = r[M] = d.createBox(q);
                    o[M] = this.data[M].toHTML(w);
                    if(M == this.base)
                    {
                        if(F != null)
                        {
                            this.data[this.base].HTMLstretchV(w, H, F)
                        }
                        else
                        {
                            if(H != null)
                            {
                                this.data[this.base].HTMLstretchH(w, H)
                            }
                        }
                        N[M] = (F == null && H != null ? false : this.data[M].HTMLcanStretch("Horizontal"))
                    }
                    else
                    {
                        N[M] = this.data[M].HTMLcanStretch("Horizontal")
                    }
                }
            }
            d.MeasureSpans(o);
            var n = -d.BIGDIMEN, K = n;
            for(M = 0, I = this.data.length; M < I; M++)
            {
                if(this.data[M])
                {
                    if(r[M].bbox.w > K)
                    {
                        K = r[M].bbox.w
                    }
                    if(!N[M] && K > n)
                    {
                        n = K
                    }
                }
            }
            if(F == null && H != null)
            {
                n = H
            }
            else
            {
                if(n == -d.BIGDIMEN)
                {
                    n = K
                }
            }
            for(M = K = 0, I = this.data.length; M < I; M++)
            {
                if(this.data[M])
                {
                    w = r[M];
                    if(N[M])
                    {
                        w.bbox = this.data[M].HTMLstretchH(w, n).bbox
                    }
                    if(w.bbox.w > K)
                    {
                        K = w.bbox.w
                    }
                }
            }
            var E = d.TeX.rule_thickness, G = d.FONTDATA.TeX_factor;
            var p = r[this.base] || {bbox: this.HTMLzeroBBox()};
            var v, s, A, z, u, C, J, O = 0;
            if(p.bbox.ic)
            {
                O = 1.3 * p.bbox.ic + 0.05
            }
            for(M = 0, I = this.data.length; M < I; M++)
            {
                if(this.data[M] != null)
                {
                    w = r[M];
                    u = d.TeX.big_op_spacing5 * P;
                    var B = (M != this.base && l[this.ACCENTS[M]]);
                    if(B && w.bbox.w <= 1 / d.em + 0.0001)
                    {
                        w.bbox.w = w.bbox.rw - w.bbox.lw;
                        w.bbox.noclip = true;
                        if(w.bbox.lw)
                        {
                            w.insertBefore(d.createSpace(w.parentNode, 0, 0, -w.bbox.lw), w.firstChild)
                        }
                        d.createBlank(w, 0, 0, w.bbox.rw + 0.1)
                    }
                    C = {left: 0, center: (K - w.bbox.w) / 2, right: K - w.bbox.w}[l.align];
                    v = C;
                    s = 0;
                    if(M == this.over)
                    {
                        if(B)
                        {
                            J = Math.max(E * P * G, 2.5 / this.em);
                            u = 0;
                            if(p.bbox.skew)
                            {
                                v += p.bbox.skew
                            }
                        }
                        else
                        {
                            A = d.TeX.big_op_spacing1 * P * G;
                            z = d.TeX.big_op_spacing3 * P * G;
                            J = Math.max(A, z - Math.max(0, w.bbox.d))
                        }
                        J = Math.max(J, 1.5 / this.em);
                        v += O / 2;
                        s = p.bbox.h + w.bbox.d + J;
                        w.bbox.h += u
                    }
                    else
                    {
                        if(M == this.under)
                        {
                            if(B)
                            {
                                J = 3 * E * P * G;
                                u = 0
                            }
                            else
                            {
                                A = d.TeX.big_op_spacing2 * P * G;
                                z = d.TeX.big_op_spacing4 * P * G;
                                J = Math.max(A, z - w.bbox.h)
                            }
                            J = Math.max(J, 1.5 / this.em);
                            v -= O / 2;
                            s = -(p.bbox.d + w.bbox.h + J);
                            w.bbox.d += u
                        }
                    }
                    d.placeBox(w, v, s)
                }
            }
            this.HTMLhandleSpace(L);
            this.HTMLhandleColor(L);
            return L
        }, HTMLstretchH: g.mbase.HTMLstretchH, HTMLstretchV: g.mbase.HTMLstretchV});
        g.msubsup.Augment({toHTML: function (K, I, C)
        {
            K = this.HTMLcreateSpan(K);
            var N = this.HTMLgetScale(), H = this.HTMLgetMu(K);
            var w = d.createStack(K), l, n = [];
            var o = d.createBox(w);
            if(this.data[this.base])
            {
                n.push(this.data[this.base].toHTML(o));
                if(C != null)
                {
                    this.data[this.base].HTMLstretchV(o, I, C)
                }
                else
                {
                    if(I != null)
                    {
                        this.data[this.base].HTMLstretchH(o, I)
                    }
                }
            }
            else
            {
                o.bbox = this.HTMLzeroBBox()
            }
            var L = d.TeX.x_height * N, B = d.TeX.scriptspace * N * 0.75;
            var k, x;
            if(this.HTMLnotEmpty(this.data[this.sup]))
            {
                k = d.createBox(w);
                n.push(this.data[this.sup].toHTML(k))
            }
            if(this.HTMLnotEmpty(this.data[this.sub]))
            {
                x = d.createBox(w);
                n.push(this.data[this.sub].toHTML(x))
            }
            d.MeasureSpans(n);
            if(k)
            {
                k.bbox.w += B;
                k.bbox.rw = Math.max(k.bbox.w, k.bbox.rw)
            }
            if(x)
            {
                x.bbox.w += B;
                x.bbox.rw = Math.max(x.bbox.w, x.bbox.rw)
            }
            d.placeBox(o, 0, 0);
            var m;
            if(k)
            {
                m = this.data[this.sup].HTMLgetScale()
            }
            else
            {
                if(x)
                {
                    m = this.data[this.sub].HTMLgetScale()
                }
                else
                {
                    m = this.HTMLgetScale()
                }
            }
            var F = d.TeX.sup_drop * m, E = d.TeX.sub_drop * m;
            var z = o.bbox.h - F, y = o.bbox.d + E, M = 0, G;
            if(o.bbox.ic)
            {
                o.bbox.w -= o.bbox.ic;
                M = 1.3 * o.bbox.ic + 0.05
            }
            if(this.data[this.base] && (this.data[this.base].type === "mi" || this.data[this.base].type === "mo"))
            {
                if(this.data[this.base].data.join("").length === 1 && o.bbox.scale === 1 && !this.data[this.base].Get("largeop"))
                {
                    z = y = 0
                }
            }
            var J = this.getValues("subscriptshift", "superscriptshift");
            J.subscriptshift = (J.subscriptshift === "" ? 0 : d.length2em(J.subscriptshift, H));
            J.superscriptshift = (J.superscriptshift === "" ? 0 : d.length2em(J.superscriptshift, H));
            if(!k)
            {
                if(x)
                {
                    y = Math.max(y, d.TeX.sub1 * N, x.bbox.h - (4 / 5) * L, J.subscriptshift);
                    d.placeBox(x, o.bbox.w, -y, x.bbox)
                }
            }
            else
            {
                if(!x)
                {
                    l = this.getValues("displaystyle", "texprimestyle");
                    G = d.TeX[(l.displaystyle ? "sup1" : (l.texprimestyle ? "sup3" : "sup2"))];
                    z = Math.max(z, G * N, k.bbox.d + (1 / 4) * L, J.superscriptshift);
                    d.placeBox(k, o.bbox.w + M, z, k.bbox)
                }
                else
                {
                    y = Math.max(y, d.TeX.sub2 * N);
                    var A = d.TeX.rule_thickness * N;
                    if((z - k.bbox.d) - (x.bbox.h - y) < 3 * A)
                    {
                        y = 3 * A - z + k.bbox.d + x.bbox.h;
                        F = (4 / 5) * L - (z - k.bbox.d);
                        if(F > 0)
                        {
                            z += F;
                            y -= F
                        }
                    }
                    d.placeBox(k, o.bbox.w + M, Math.max(z, J.superscriptshift));
                    d.placeBox(x, o.bbox.w, -Math.max(y, J.subscriptshift))
                }
            }
            this.HTMLhandleSpace(K);
            this.HTMLhandleColor(K);
            return K
        }, HTMLstretchH: g.mbase.HTMLstretchH, HTMLstretchV: g.mbase.HTMLstretchV});
        g.mmultiscripts.Augment({toHTML: g.mbase.HTMLautoload});
        g.mtable.Augment({toHTML: g.mbase.HTMLautoload});
        g["annotation-xml"].Augment({toHTML: g.mbase.HTMLautoload});
        g.math.Augment({toHTML: function (u, l)
        {
            var r = this.Get("alttext");
            if(r && r !== "")
            {
                l.setAttribute("aria-label", r)
            }
            var m = d.addElement(u, "nobr", {isMathJax: true});
            u = this.HTMLcreateSpan(m);
            var s = d.createStack(u), n = d.createBox(s), t;
            s.style.fontSize = m.parentNode.style.fontSize;
            m.parentNode.style.fontSize = "";
            if(this.data[0] != null)
            {
                if(d.msieColorBug)
                {
                    if(this.background)
                    {
                        this.data[0].background = this.background;
                        delete this.background
                    }
                    if(this.mathbackground)
                    {
                        this.data[0].mathbackground = this.mathbackground;
                        delete this.mathbackground
                    }
                }
                g.mbase.prototype.displayAlign = b.config.displayAlign;
                g.mbase.prototype.displayIndent = b.config.displayIndent;
                var o = this.data[0].toHTML(n);
                o.bbox.exactW = false;
                t = d.Measured(o, n)
            }
            d.placeBox(n, 0, 0);
            u.style.width = d.Em((Math.round(t.bbox.w * this.em) + 0.25) / d.outerEm);
            u.style.display = "inline-block";
            var k = 1 / d.em, q = d.em / d.outerEm;
            d.em /= q;
            u.bbox.h *= q;
            u.bbox.d *= q;
            u.bbox.w *= q;
            u.bbox.lw *= q;
            u.bbox.rw *= q;
            if(t && t.bbox.width != null)
            {
                u.style.minWidth = (t.bbox.minWidth || u.style.width);
                u.style.width = s.style.width = t.bbox.width;
                n.style.width = "100%"
            }
            this.HTMLhandleColor(u);
            if(t)
            {
                d.createRule(u, (t.bbox.h + k) * q, (t.bbox.d + k) * q, 0)
            }
            if(!this.isMultiline && this.Get("display") === "block" && u.bbox.width == null)
            {
                var v = this.getValues("indentalignfirst", "indentshiftfirst", "indentalign", "indentshift");
                if(v.indentalignfirst !== g.INDENTALIGN.INDENTALIGN)
                {
                    v.indentalign = v.indentalignfirst
                }
                if(v.indentalign === g.INDENTALIGN.AUTO)
                {
                    v.indentalign = this.displayAlign
                }
                l.style.textAlign = v.indentalign;
                if(v.indentshiftfirst !== g.INDENTSHIFT.INDENTSHIFT)
                {
                    v.indentshift = v.indentshiftfirst
                }
                if(v.indentshift === "auto")
                {
                    v.indentshift = this.displayIndent
                }
                if(v.indentshift && v.indentalign !== g.INDENTALIGN.CENTER)
                {
                    u.style[{left: "marginLeft", right: "marginRight"}[v.indentalign]] = d.Em(d.length2em(v.indentshift))
                }
            }
            return u
        }, HTMLspanElement: g.mbase.prototype.HTMLspanElement});
        g.TeXAtom.Augment({toHTML: function (l)
        {
            l = this.HTMLcreateSpan(l);
            if(this.data[0] != null)
            {
                if(this.texClass === g.TEXCLASS.VCENTER)
                {
                    var k = d.createStack(l);
                    var m = d.createBox(k);
                    d.Measured(this.data[0].toHTML(m), m);
                    d.placeBox(m, 0, d.TeX.axis_height - (m.bbox.h + m.bbox.d) / 2 + m.bbox.d)
                }
                else
                {
                    l.bbox = this.data[0].toHTML(l).bbox
                }
            }
            this.HTMLhandleSpace(l);
            this.HTMLhandleColor(l);
            return l
        }});
        MathJax.Hub.Register.StartupHook("onLoad", function ()
        {
            setTimeout(MathJax.Callback(["loadComplete", d, "jax.js"]), 0)
        })
    });
    b.Register.StartupHook("End Config", function ()
    {
        b.Browser.Select({MSIE: function (k)
        {
            var o = (document.documentMode || 0);
            var n = k.versionAtLeast("7.0");
            var m = k.versionAtLeast("8.0") && o > 7;
            var l = (document.compatMode === "BackCompat");
            if(o < 9)
            {
                d.config.styles[".MathJax .MathJax_HitBox"]["background-color"] = "white";
                d.config.styles[".MathJax .MathJax_HitBox"].opacity = 0;
                d.config.styles[".MathJax .MathJax_HitBox"].filter = "alpha(opacity=0)"
            }
            d.Augment({PaddingWidthBug: true, msieAccentBug: true, msieColorBug: true, msieColorPositionBug: true, msieRelativeWidthBug: l, msieDisappearingBug: (o >= 8), msieMarginScaleBug: (o < 8), msiePaddingWidthBug: true, msieBorderWidthBug: l, msieFrameSizeBug: (o <= 8), msieInlineBlockAlignBug: (!m || l), msiePlaceBoxBug: (m && !l), msieClipRectBug: !m, msieNegativeSpaceBug: l, cloneNodeBug: (m && k.version === "8.0"), initialSkipBug: (o < 8), msieNegativeBBoxBug: (o >= 8), msieIE6: !n, msieItalicWidthBug: true, FontFaceBug: true, msieFontCSSBug: k.isIE9, allowWebFonts: (o >= 9 ? "woff" : "eot")})
        }, Firefox: function (l)
        {
            var m = false;
            if(l.versionAtLeast("3.5"))
            {
                var k = String(document.location).replace(/[^\/]*$/, "");
                if(document.location.protocol !== "file:" || b.config.root.match(/^https?:\/\//) || (b.config.root + "/").substr(0, k.length) === k)
                {
                    m = "otf"
                }
            }
            d.Augment({ffVerticalAlignBug: true, AccentBug: true, allowWebFonts: m})
        }, Safari: function (p)
        {
            var n = p.versionAtLeast("3.0");
            var m = p.versionAtLeast("3.1");
            var k = navigator.appVersion.match(/ Safari\/\d/) && navigator.appVersion.match(/ Version\/\d/) && navigator.vendor.match(/Apple/);
            var l = (navigator.appVersion.match(/ Android (\d+)\.(\d+)/));
            var q = (m && p.isMobile && ((navigator.platform.match(/iPad|iPod|iPhone/) && !p.versionAtLeast("5.0")) || (l != null && (l[1] < 2 || (l[1] == 2 && l[2] < 2)))));
            d.Augment({config: {styles: {".MathJax img, .MathJax nobr, .MathJax a": {"max-width": "5000em", "max-height": "5000em"}}}, rfuzz: 0.011, AccentBug: true, AdjustSurd: true, negativeBBoxes: true, safariNegativeSpaceBug: true, safariVerticalAlignBug: !m, safariTextNodeBug: !n, forceReflow: true, allowWebFonts: (m && !q ? "otf" : false)});
            if(k)
            {
                d.Augment({webFontDefault: (p.isMobile ? "sans-serif" : "serif")})
            }
            if(p.isPC)
            {
                d.Augment({adjustAvailableFonts: d.removeSTIXfonts, checkWebFontsTwice: true})
            }
            if(q)
            {
                var o = b.config["HTML-CSS"];
                if(o)
                {
                    o.availableFonts = [];
                    o.preferredFont = null
                }
                else
                {
                    b.config["HTML-CSS"] = {availableFonts: [], preferredFont: null}
                }
            }
        }, Chrome: function (k)
        {
            d.Augment({Em: d.EmRounded, cloneNodeBug: true, rfuzz: 0.011, AccentBug: true, AdjustSurd: true, negativeBBoxes: true, safariNegativeSpaceBug: true, safariWebFontSerif: [""], forceReflow: true, allowWebFonts: (k.versionAtLeast("4.0") ? "otf" : "svg")})
        }, Opera: function (k)
        {
            k.isMini = (navigator.appVersion.match("Opera Mini") != null);
            d.config.styles[".MathJax .merror"]["vertical-align"] = null;
            d.config.styles[".MathJax span"]["z-index"] = 0;
            d.Augment({operaHeightBug: true, operaVerticalAlignBug: true, operaFontSizeBug: k.versionAtLeast("10.61"), initialSkipBug: true, FontFaceBug: true, PaddingWidthBug: true, allowWebFonts: (k.versionAtLeast("10.0") && !k.isMini ? "otf" : false), adjustAvailableFonts: d.removeSTIXfonts})
        }, Konqueror: function (k)
        {
            d.Augment({konquerorVerticalAlignBug: true})
        }})
    });
    MathJax.Hub.Register.StartupHook("End Cookie", function ()
    {
        if(b.config.menuSettings.zoom !== "None")
        {
            h.Require("[MathJax]/extensions/MathZoom.js")
        }
    })
})(MathJax.Ajax, MathJax.Hub, MathJax.OutputJax["HTML-CSS"]);
