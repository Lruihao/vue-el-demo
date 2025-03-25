(self["webpackChunkvue_el_demo"]=self["webpackChunkvue_el_demo"]||[]).push([[454],{41740:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return m}});var r=function(){var e=this,t=e._self._c;return t("div",[t("h2",[e._v("dom-to-image vs dom-to-image-more")]),t("p",[e._v(" Select a PNG image 👇 "),t("el-link",{staticStyle:{"margin-left":"13rem"},attrs:{type:"primary",href:e.srcUrl}},[e._v("view source")])],1),t("input",{attrs:{type:"file"},on:{change:e.handleChange}}),t("button",{attrs:{type:"button"},on:{click:e.handleDownload1}},[e._v("Download")]),e._v("    "),t("button",{attrs:{type:"button"},on:{click:e.handleDownload2}},[e._v("Download More")]),t("div",[t("img",{directives:[{name:"show",rawName:"v-show",value:e.customImg,expression:"customImg"}],staticClass:"preview",attrs:{src:e.customImg,alt:"preview"}})])])},o=[],i=(n(98858),n(61318),n(33228),n(12254)),u=n.n(i),a=n(25230),c=n.n(a),l={name:"DomToImageView",data(){return{customImg:"",srcUrl:"https://github.com/Lruihao/vue-el-demo/blob/main/src/views/dom-to-image.vue"}},methods:{handleChange(e){this.customImg=URL.createObjectURL(e.target.files[0])},handleDownload1(){u().toPng(document.querySelector("img.preview")).then((e=>{const t=document.createElement("a");t.download="preview.png",t.href=e,t.click()}))},handleDownload2(){c().toPng(document.querySelector("img.preview"),{cacheBust:!0}).then((e=>{const t=document.createElement("a");t.download="preview-more.png",t.href=e,t.click()}))}}},s=l,f=n(1001),h=(0,f.Z)(s,r,o,!1,null,null,null),m=h.exports},12254:function(e,t,n){n(13429),n(24224),n(61121),n(37133),n(70560),function(t){"use strict";var n=y(),r=P(),o=b(),i=E(),u={imagePlaceholder:void 0,cacheBust:!1},a={toSvg:c,toPng:s,toJpeg:f,toBlob:h,toPixelData:l,impl:{fontFaces:o,images:i,util:n,inliner:r,options:{}}};function c(e,t){return t=t||{},m(t),Promise.resolve(e).then((function(e){return g(e,t.filter,!0)})).then(p).then(v).then(r).then((function(r){return w(r,t.width||n.width(e),t.height||n.height(e))}));function r(e){return t.bgcolor&&(e.style.backgroundColor=t.bgcolor),t.width&&(e.style.width=t.width+"px"),t.height&&(e.style.height=t.height+"px"),t.style&&Object.keys(t.style).forEach((function(n){e.style[n]=t.style[n]})),e}}function l(e,t){return d(e,t||{}).then((function(t){return t.getContext("2d").getImageData(0,0,n.width(e),n.height(e)).data}))}function s(e,t){return d(e,t||{}).then((function(e){return e.toDataURL()}))}function f(e,t){return t=t||{},d(e,t).then((function(e){return e.toDataURL("image/jpeg",t.quality||1)}))}function h(e,t){return d(e,t||{}).then(n.canvasToBlob)}function m(e){"undefined"===typeof e.imagePlaceholder?a.impl.options.imagePlaceholder=u.imagePlaceholder:a.impl.options.imagePlaceholder=e.imagePlaceholder,"undefined"===typeof e.cacheBust?a.impl.options.cacheBust=u.cacheBust:a.impl.options.cacheBust=e.cacheBust}function d(e,t){return c(e,t).then(n.makeImage).then(n.delay(100)).then((function(t){var n=r(e);return n.getContext("2d").drawImage(t,0,0),n}));function r(e){var r=document.createElement("canvas");if(r.width=t.width||n.width(e),r.height=t.height||n.height(e),t.bgcolor){var o=r.getContext("2d");o.fillStyle=t.bgcolor,o.fillRect(0,0,r.width,r.height)}return r}}function g(e,t,r){return r||!t||t(e)?Promise.resolve(e).then(o).then((function(n){return i(e,n,t)})).then((function(t){return u(e,t)})):Promise.resolve();function o(e){return e instanceof HTMLCanvasElement?n.makeImage(e.toDataURL()):e.cloneNode(!1)}function i(e,t,r){var o=e.childNodes;return 0===o.length?Promise.resolve(t):i(t,n.asArray(o),r).then((function(){return t}));function i(e,t,n){var r=Promise.resolve();return t.forEach((function(t){r=r.then((function(){return g(t,n)})).then((function(t){t&&e.appendChild(t)}))})),r}}function u(e,t){return t instanceof Element?Promise.resolve().then(r).then(o).then(i).then(u).then((function(){return t})):t;function r(){function r(e,t){function r(e,t){n.asArray(e).forEach((function(n){t.setProperty(n,e.getPropertyValue(n),e.getPropertyPriority(n))}))}e.cssText?t.cssText=e.cssText:r(e,t)}r(window.getComputedStyle(e),t.style)}function o(){function r(r){var o=window.getComputedStyle(e,r),i=o.getPropertyValue("content");if(""!==i&&"none"!==i){var u=n.uid();t.className=t.className+" "+u;var a=document.createElement("style");a.appendChild(c(u,r,o)),t.appendChild(a)}function c(e,t,r){var o="."+e+":"+t,i=r.cssText?u(r):a(r);return document.createTextNode(o+"{"+i+"}");function u(e){var t=e.getPropertyValue("content");return e.cssText+" content: "+t+";"}function a(e){return n.asArray(e).map(t).join("; ")+";";function t(t){return t+": "+e.getPropertyValue(t)+(e.getPropertyPriority(t)?" !important":"")}}}}[":before",":after"].forEach((function(e){r(e)}))}function i(){e instanceof HTMLTextAreaElement&&(t.innerHTML=e.value),e instanceof HTMLInputElement&&t.setAttribute("value",e.value)}function u(){t instanceof SVGElement&&(t.setAttribute("xmlns","http://www.w3.org/2000/svg"),t instanceof SVGRectElement&&["width","height"].forEach((function(e){var n=t.getAttribute(e);n&&t.style.setProperty(e,n)})))}}}function p(e){return o.resolveAll().then((function(t){var n=document.createElement("style");return e.appendChild(n),n.appendChild(document.createTextNode(t)),e}))}function v(e){return i.inlineAll(e).then((function(){return e}))}function w(e,t,r){return Promise.resolve(e).then((function(e){return e.setAttribute("xmlns","http://www.w3.org/1999/xhtml"),(new XMLSerializer).serializeToString(e)})).then(n.escapeXhtml).then((function(e){return'<foreignObject x="0" y="0" width="100%" height="100%">'+e+"</foreignObject>"})).then((function(e){return'<svg xmlns="http://www.w3.org/2000/svg" width="'+t+'" height="'+r+'">'+e+"</svg>"})).then((function(e){return"data:image/svg+xml;charset=utf-8,"+e}))}function y(){return{escape:h,parseExtension:t,mimeType:n,dataAsUrl:f,isDataUrl:r,canvasToBlob:i,resolveUrl:u,getAndEncode:s,uid:c(),delay:m,asArray:d,escapeXhtml:g,makeImage:l,width:p,height:v};function e(){var e="application/font-woff",t="image/jpeg";return{woff:e,woff2:e,ttf:"application/font-truetype",eot:"application/vnd.ms-fontobject",png:"image/png",jpg:t,jpeg:t,gif:"image/gif",tiff:"image/tiff",svg:"image/svg+xml"}}function t(e){var t=/\.([^\.\/]*?)$/g.exec(e);return t?t[1]:""}function n(n){var r=t(n).toLowerCase();return e()[r]||""}function r(e){return-1!==e.search(/^(data:)/)}function o(e){return new Promise((function(t){for(var n=window.atob(e.toDataURL().split(",")[1]),r=n.length,o=new Uint8Array(r),i=0;i<r;i++)o[i]=n.charCodeAt(i);t(new Blob([o],{type:"image/png"}))}))}function i(e){return e.toBlob?new Promise((function(t){e.toBlob(t)})):o(e)}function u(e,t){var n=document.implementation.createHTMLDocument(),r=n.createElement("base");n.head.appendChild(r);var o=n.createElement("a");return n.body.appendChild(o),r.href=t,o.href=e,o.href}function c(){var e=0;return function(){return"u"+t()+e++;function t(){return("0000"+(Math.random()*Math.pow(36,4)<<0).toString(36)).slice(-4)}}}function l(e){return new Promise((function(t,n){var r=new Image;r.onload=function(){t(r)},r.onerror=n,r.src=e}))}function s(e){var t=3e4;return a.impl.options.cacheBust&&(e+=(/\?/.test(e)?"&":"?")+(new Date).getTime()),new Promise((function(n){var r,o=new XMLHttpRequest;if(o.onreadystatechange=u,o.ontimeout=c,o.responseType="blob",o.timeout=t,o.open("GET",e,!0),o.send(),a.impl.options.imagePlaceholder){var i=a.impl.options.imagePlaceholder.split(/,/);i&&i[1]&&(r=i[1])}function u(){if(4===o.readyState)if(200===o.status){var t=new FileReader;t.onloadend=function(){var e=t.result.split(/,/)[1];n(e)},t.readAsDataURL(o.response)}else r?n(r):l("cannot fetch resource: "+e+", status: "+o.status)}function c(){r?n(r):l("timeout of "+t+"ms occured while fetching resource: "+e)}function l(e){console.error(e),n("")}}))}function f(e,t){return"data:"+t+";base64,"+e}function h(e){return e.replace(/([.*+?^${}()|\[\]\/\\])/g,"\\$1")}function m(e){return function(t){return new Promise((function(n){setTimeout((function(){n(t)}),e)}))}}function d(e){for(var t=[],n=e.length,r=0;r<n;r++)t.push(e[r]);return t}function g(e){return e.replace(/#/g,"%23").replace(/\n/g,"%0A")}function p(e){var t=w(e,"border-left-width"),n=w(e,"border-right-width");return e.scrollWidth+t+n}function v(e){var t=w(e,"border-top-width"),n=w(e,"border-bottom-width");return e.scrollHeight+t+n}function w(e,t){var n=window.getComputedStyle(e).getPropertyValue(t);return parseFloat(n.replace("px",""))}}function P(){var e=/url\(['"]?([^'"]+?)['"]?\)/g;return{inlineAll:i,shouldProcess:t,impl:{readUrls:r,inline:o}};function t(t){return-1!==t.search(e)}function r(t){var r,o=[];while(null!==(r=e.exec(t)))o.push(r[1]);return o.filter((function(e){return!n.isDataUrl(e)}))}function o(e,t,r,o){return Promise.resolve(t).then((function(e){return r?n.resolveUrl(e,r):e})).then(o||n.getAndEncode).then((function(e){return n.dataAsUrl(e,n.mimeType(t))})).then((function(n){return e.replace(i(t),"$1"+n+"$3")}));function i(e){return new RegExp("(url\\(['\"]?)("+n.escape(e)+")(['\"]?\\))","g")}}function i(e,n,i){return u()?Promise.resolve(e):Promise.resolve(e).then(r).then((function(t){var r=Promise.resolve(e);return t.forEach((function(e){r=r.then((function(t){return o(t,e,n,i)}))})),r}));function u(){return!t(e)}}}function b(){return{resolveAll:e,impl:{readAll:t}};function e(){return t(document).then((function(e){return Promise.all(e.map((function(e){return e.resolve()})))})).then((function(e){return e.join("\n")}))}function t(){return Promise.resolve(n.asArray(document.styleSheets)).then(t).then(e).then((function(e){return e.map(o)}));function e(e){return e.filter((function(e){return e.type===CSSRule.FONT_FACE_RULE})).filter((function(e){return r.shouldProcess(e.style.getPropertyValue("src"))}))}function t(e){var t=[];return e.forEach((function(e){try{n.asArray(e.cssRules||[]).forEach(t.push.bind(t))}catch(r){console.log("Error while reading CSS rules from "+e.href,r.toString())}})),t}function o(e){return{resolve:function(){var t=(e.parentStyleSheet||{}).href;return r.inlineAll(e.cssText,t)},src:function(){return e.style.getPropertyValue("src")}}}}}function E(){return{inlineAll:t,impl:{newImage:e}};function e(e){return{inline:t};function t(t){return n.isDataUrl(e.src)?Promise.resolve():Promise.resolve(e.src).then(t||n.getAndEncode).then((function(t){return n.dataAsUrl(t,n.mimeType(e.src))})).then((function(t){return new Promise((function(n,r){e.onload=n,e.onerror=r,e.src=t}))}))}}function t(o){return o instanceof Element?i(o).then((function(){return o instanceof HTMLImageElement?e(o).inline():Promise.all(n.asArray(o.childNodes).map((function(e){return t(e)})))})):Promise.resolve(o);function i(e){var t=e.style.getPropertyValue("background");return t?r.inlineAll(t).then((function(t){e.style.setProperty("background",t,e.style.getPropertyPriority("background"))})).then((function(){return e})):Promise.resolve(e)}}}e.exports=a}()}}]);
//# sourceMappingURL=domToImage.522698bb.js.map