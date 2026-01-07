"use strict";(self.webpackChunkvue_el_demo=self.webpackChunkvue_el_demo||[]).push([["823"],{31901:function(e,t,o){o.r(t),o.d(t,{default:function(){return r}});let i=document.createElement("template");i.innerHTML=`
<style>
/* Light Theme (default) */
:host {
  --jv-bg-color: #ffffff;
  --jv-border-color: #ddd;
  --jv-text-color: #111;
  --jv-key-color: #111;
  --jv-string-color: #42b983;
  --jv-number-color: #fc1e70;
  --jv-boolean-color: #fc1e70;
  --jv-null-color: #e08331;
  --jv-undefined-color: #b0b0b0;
  --jv-function-color: #067bca;
  --jv-regexp-color: #fc1e70;
  --jv-copy-bg: #eee;
  --jv-copy-text: #333;
  --jv-ellipsis-color: #999999;
  --jv-ellipsis-bg: #eeeeee;
  --jv-hover-shadow: rgba(0,0,0,0.1);
}

/* Dark Theme */
:host([theme="dark"]) {
  --jv-bg-color: #23272f;
  --jv-border-color: #2c313a;
  --jv-text-color: #d4d4d4;
  --jv-key-color: #79c0ff;
  --jv-string-color: #a5d6a7;
  --jv-number-color: #e2b86b;
  --jv-boolean-color: #ff7b72;
  --jv-null-color: #ffab70;
  --jv-undefined-color: #d2a8ff;
  --jv-function-color: #c678dd;
  --jv-regexp-color: #56b6c2;
  --jv-copy-bg: #3a3f4b;
  --jv-copy-text: #fff;
  --jv-ellipsis-color: #6e7681;
  --jv-ellipsis-bg: #2c313a;
  --jv-hover-shadow: rgba(0,0,0,0.4);
}

:host {
  display: block;
  width: 100%;
  max-width: 100%;
  font-family: Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  padding: 8px;
  overflow-x: auto;
  box-sizing: border-box;
  position: relative;
  background-color: var(--jv-bg-color);
  color: var(--jv-text-color);
}

:host([boxed]) {
  border: 1px solid var(--jv-border-color);
  border-radius: 4px;
  padding: 16px;
  transition: box-shadow 0.2s ease;
}
:host([boxed]:hover) {
  box-shadow: 0 2px 8px var(--jv-hover-shadow);
}
#root:has(+.align-left) {
  margin-top: 16px;
}
.jv-copy {
  cursor: pointer;
  font-size: 12px;
  background: var(--jv-copy-bg);
  color: var(--jv-copy-text);
  padding: 4px 8px;
  border-radius: 3px;
  opacity: 0;
  transition: opacity 0.2s ease;
}
:host(:hover) .jv-copy {
  opacity: 1;
}
slot[name="copy-button"] {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 10;
  opacity: 0;
  transition: opacity 0.2s ease;
  display: block !important;
}
slot[name="copy-button"][hidden] {
  display: none !important;
}
slot[name="copy-button"].align-left {
  left: 8px;
  right: auto;
}
slot[name="copy-button"].align-right {
  right: 8px;
  left: auto;
}
:host(:hover) slot[name="copy-button"] {
  opacity: 1;
}
.jv-toggle {
  background-image: url("data:image/svg+xml;charset=utf-8;base64,PHN2ZyBoZWlnaHQ9IjE2IiB3aWR0aD0iOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtMCAwIDggOC04IDh6IiBmaWxsPSIjNjY2Ii8+PC9zdmc+");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  cursor: pointer;
  width: 10px;
  height: 10px;
  margin-right: 2px;
  display: inline-block;
  transition: rotate .1s;
}
.jv-toggle.open {
  rotate: 90deg;
}
.jv-key {
  color: var(--jv-key-color);
}
.jv-string {
  color: var(--jv-string-color);
}
.jv-number {
  color: var(--jv-number-color);
}
.jv-boolean {
  color: var(--jv-boolean-color);
}
.jv-null {
  color: var(--jv-null-color);
}
.jv-undefined {
  color: var(--jv-undefined-color);
}
.jv-function {
  color: var(--jv-function-color);
}
.jv-regexp {
  color: var(--jv-regexp-color);
}
.jv-list {
  margin-left: 16px;
}
.jv-item:not(:has(.jv-toggle)) .jv-key {
  margin-left: 12px;
}
.jv-item:not(:last-child):after {
  content: ',';
}
.jv-node > .jv-ellipsis {
  display: none;
}
.jv-node.empty > .jv-list {
  display: inline-block;
  margin-inline: 4px;
}
.jv-node.collapsed > .jv-list,
.jv-node.collapsed.empty > .jv-ellipsis {
  display: none;
}
.jv-node.collapsed > .jv-ellipsis {
  color: var(--jv-ellipsis-color);
  background-color: var(--jv-ellipsis-bg);
  display: inline-block;
  line-height: 0.9;
  font-size: 0.85em;
  vertical-align: 2px;
  cursor: pointer;
  user-select: none;
  padding: 2px 4px;
  margin: 0px 4px;
  border-radius: 3px;
}
</style>
<div id="root" part="root"></div>
<slot name="copy-button" part="copy-button" hidden>
  <span class="jv-copy"></span>
</slot>
`;class n extends HTMLElement{constructor(){super(),this._value=null,this.root=this.attachShadow({mode:"open"}),this.root.appendChild(i.content.cloneNode(!0)),this.container=this.root.getElementById("root")}static get observedAttributes(){return["value","expand-depth","copyable","sort","boxed","theme","parse"]}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}set value(e){e!==this._value&&(this._value=e,this.render())}get value(){return this._value??this.getAttribute("value")}get expandDepth(){return Number(this.getAttribute("expand-depth")??1)}get sort(){return this.hasAttribute("sort")}get theme(){return this.getAttribute("theme")||"light"}get parse(){return"false"!==this.getAttribute("parse")}get copyable(){if(!this.hasAttribute("copyable"))return!1;let e=this.getAttribute("copyable"),t={copyText:"Copy",copiedText:"Copied",timeout:2e3,align:"right"};if(""===e||null===e)return t;try{return{...t,...JSON.parse(e)}}catch{return t}}copyText(e){return navigator.clipboard?this.copyText=e=>navigator.clipboard.writeText(e):this.copyText=e=>new Promise((t,o)=>{let i=document.createElement("input");i.value=e,document.body.appendChild(i),i.select(),document.execCommand("copy")?(document.body.removeChild(i),t()):(document.body.removeChild(i),o(Error("Copy failed")))}),this.copyText(e)}render(){if("string"==typeof this.value&&this.parse)try{this._value=JSON.parse(this.value)}catch{}this.container.innerHTML="",this.container.appendChild(this.build(this._value,0));let e=this.copyable;if(e){let t=e.align||"right",o=this.root.querySelector('slot[name="copy-button"]'),i=o.assignedElements()[0],n=this.root.querySelector(".jv-copy");if(o.hidden=!1,o.className=`align-${t}`,!i){let t;n.textContent=e.copyText;let o=n.cloneNode(!0);n.replaceWith(o),o.textContent=e.copyText,o.addEventListener("click",()=>{let i=JSON.stringify(this._value,null,2);this.copyText(i).then(()=>{o.textContent=e.copiedText,t=window.setTimeout(()=>{o.textContent=e.copyText,clearTimeout(t)},e.timeout),this.dispatchEvent(new CustomEvent("copy-success",{detail:{text:i,options:e}}))}).catch(()=>{console.warn("Failed to copy text to clipboard"),this.dispatchEvent(new CustomEvent("copy-error",{detail:{text:i,options:e}}))})})}}}build(e,t){if(null===e)return this.leaf("null","jv-null");if(void 0===e)return this.leaf("undefined","jv-undefined");if("boolean"==typeof e)return this.leaf(String(e),"jv-boolean");if("number"==typeof e)return this.leaf(String(e),"jv-number");if("string"==typeof e)return this.leaf(`"${e}"`,"jv-string");if("function"==typeof e)return this.leaf("<function>","jv-function");if(e instanceof RegExp)return this.leaf("<regexp>","jv-regexp");if(e instanceof Date)return this.leaf(`"${e.toLocaleString()}"`,"jv-string");let o=Array.isArray(e),i=document.createElement("span");i.className="jv-node",i.setAttribute("part","node");let n=document.createElement("div");n.className="jv-list",n.setAttribute("part","list");let r=o?this.sort?[...e.keys()].sort((e,t)=>e-t):[...e.keys()]:this.sort?Object.keys(e).sort():Object.keys(e);for(let i of r){let r=document.createElement("div"),s=this.build(e[i],t+1);if(r.className="jv-item",s instanceof Element&&s.classList.contains("jv-node")){let e=s.querySelector(".jv-toggle");e&&(e.remove(),r.append(e))}if(!o){let e=document.createElement("span");e.className="jv-key",e.setAttribute("part","key"),e.textContent=`"${i}": `,r.append(e)}r.append(s),n.append(r)}let s=document.createElement("span");s.className="jv-toggle",s.setAttribute("part","toggle"),i.classList.contains("collapsed")||s.classList.add("open"),s.addEventListener("click",()=>{i.classList.toggle("collapsed"),s.classList.toggle("open"),this.dispatchEvent(new CustomEvent("toggle",{detail:{node:i,data:e,isCollapsed:i.classList.contains("collapsed")}}))});let l=document.createElement("span");return l.className="jv-ellipsis",l.setAttribute("part","ellipsis"),l.textContent=`...${r.length}`,l.addEventListener("click",()=>{i.classList.remove("collapsed"),s.classList.add("open")}),t>=this.expandDepth&&(i.classList.add("collapsed"),s.classList.remove("open")),r.length||i.classList.add("empty"),i.append(s,o?"[":"{",l,n,o?"]":"}"),i}leaf(e,t){let o=document.createElement("span");return o.className=`jv-value ${t}`,o.setAttribute("part",`value ${t.replace("jv-","")}`),o.textContent=e,o}}customElements.define("json-viewer",n);var r=(0,o(51900).Z)({name:"JsonViewerElementView",data:()=>({jsonData:{name:"json-viewer-element",description:"A web component for viewing JSON data in a pretty, interactive way.",version:"1.0.0",repository:{type:"git",url:"https://github.com/Lruihao/json-viewer-element"},author:"Lruihao",license:"MIT"},theme:"dark",copyOptions:{copyText:"复制",copiedText:"复制成功",timeout:2e3,align:"right"}}),methods:{switchTheme(){this.theme="dark"===this.theme?"light":"dark"}}},function(){var e=this._self._c;return e("div",[e("p",[this._v("Web Components 和 Vue 擦出的火花～")]),e("p",[this._v(" 在 Vue2 中用原生自定义元素 "),e("el-link",{attrs:{href:"https://github.com/Lruihao/json-viewer-element"}},[this._v("<json-viewer>")]),this._v(" 来展示 JSON 格式化数据。 "),e("el-button",{attrs:{type:"primary",size:"mini"},on:{click:this.switchTheme}},[this._v("切换主题")])],1),e("json-viewer",{attrs:{value:JSON.stringify(this.jsonData),boxed:"",copyable:JSON.stringify(this.copyOptions),theme:this.theme}})],1)},[],!1,null,null,null).exports}}]);