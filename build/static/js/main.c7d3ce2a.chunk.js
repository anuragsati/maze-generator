(this["webpackJsonpmaze-generator"]=this["webpackJsonpmaze-generator"]||[]).push([[0],{11:function(e,t,n){},12:function(e,t,n){},13:function(e,t,n){},15:function(e,t,n){"use strict";n.r(t);var c=n(1),a=n.n(c),o=n(4),l=n.n(o),r=(n(11),n(5)),s=n(6),i=(n(12),n(13),n(0)),d=function(e){var t=e.node,n=t.row,c=t.col;return Object(i.jsx)("div",{id:"node-".concat(n,"-").concat(c),className:"node left-wall right-wall top-wall bottom-wall"})},u=n.p+"static/media/logo.ed106706.svg",f=n.p+"static/media/caret-down.27bd7575.svg",j=Math.floor(window.innerWidth/24),m=Math.floor((window.innerHeight-200)/24),w=[],h=[-1,0,1,0],b=[0,1,0,-1],v=[0,1,2,3],p=0,g=10,O=!1,x=function(){var e=Object(c.useState)([]),t=Object(s.a)(e,2),n=t[0],o=t[1];Object(c.useEffect)((function(){var e=l();o(e)}),[]);var l=function(){for(var e=[],t=0;t<m;t++){for(var n=[],c=0;c<j;c++)n.push(x(t,c));e.push(n)}return e},x=function(e,t){return{row:e,col:t,isVisited:!1}};function k(e,t,c){var a=e+h[c],o=t+b[c];return!(a<0||o<0||a>=m||o>=j)&&!n[a][o].isVisited}function L(e,t,n){setTimeout((function(){0==n?(t.classList.remove("top-wall"),e.classList.remove("bottom-wall"),t.classList.add("fake-top-wall"),e.classList.add("fake-bottom-wall")):1==n?(t.classList.remove("right-wall"),e.classList.remove("left-wall"),t.classList.add("fake-right-wall"),e.classList.add("fake-left-wall")):2==n?(t.classList.remove("bottom-wall"),e.classList.remove("top-wall"),t.classList.add("fake-bottom-wall"),e.classList.add("fake-top-wall")):3==n&&(t.classList.remove("left-wall"),e.classList.remove("right-wall"),t.classList.add("fake-left-wall"),e.classList.add("fake-right-wall"))}),g*p)}var N=function(e,t,c){w.push({row:e,col:t,parent:c});for(var a=function(){var e=w.pop();if(n[e.row][e.col].isVisited)return"continue";var t=e.row-e.parent.row,c=e.col-e.parent.col,a=document.getElementById("node-".concat(e.row,"-").concat(e.col)),l=document.getElementById("node-".concat(e.parent.row,"-").concat(e.parent.col));-1===t&&0===c?L(a,l,0):0===t&&1===c?L(a,l,1):1===t&&0===c?L(a,l,2):0===t&&-1===c&&L(a,l,3),n[e.row][e.col].isVisited=!0,setTimeout((function(){document.getElementById("node-".concat(e.row,"-").concat(e.col)).classList.add("node-visited")}),g*p++),o(n),function(e){for(var t=e.length-1;t>0;t--){var n=Math.floor(Math.random()*(t+1)),c=[e[n],e[t]];e[t]=c[0],e[n]=c[1]}}(v);var s,i=Object(r.a)(v);try{for(i.s();!(s=i.n()).done;){var d=s.value;if(k(e.row,e.col,d)){var u=e.row+h[d],f=e.col+b[d];w.push({row:u,col:f,parent:{row:e.row,col:e.col}})}}}catch(j){i.e(j)}finally{i.f()}};w.length>0;)a()},T=function(){var e=document.getElementById("dropdown-list");e.style.display=O?"none":"block",O=!O},C=function(e){var t=document.getElementById("dropdown-button"),n=document.createElement("img");n.className="dropdown-caret",n.src="".concat(f),0===e?(t.innerText="INSTANT",g=0):1===e?(t.innerText="FAST",g=10):2===e?(t.innerText="MEDIUM",g=30):3===e&&(t.innerText="SLOW",g=80),t.appendChild(n),T()};return Object(i.jsxs)(a.a.Fragment,{children:[Object(i.jsx)("nav",{className:"navbar",children:Object(i.jsxs)("ul",{className:"navbar-nav",children:[Object(i.jsxs)("li",{className:"",children:[" ",Object(i.jsx)("img",{className:"logo",src:u})]}),Object(i.jsxs)("li",{className:"nav-item",children:[" ",Object(i.jsx)("a",{href:"#",className:"nav-link generate-button",onClick:function(){return N(0,0,{row:0,col:0})},children:" generate Maze"})," "]}),Object(i.jsxs)("li",{className:"nav-item",children:[" ",Object(i.jsx)("a",{href:"#",className:"nav-link",onClick:function(){window.location.reload()},children:" Reset "})," "]}),Object(i.jsxs)("li",{className:"dropdown",children:[Object(i.jsxs)("a",{id:"dropdown-button",className:"nav-link",onClick:function(){return T()},children:[" SPEED ",Object(i.jsx)("img",{className:"dropdown-caret",src:f})]}),Object(i.jsxs)("ul",{id:"dropdown-list",children:[Object(i.jsx)("li",{onClick:function(){return C(0)},children:Object(i.jsx)("a",{href:"#",children:"INSTANT"})}),Object(i.jsx)("li",{onClick:function(){return C(1)},children:Object(i.jsx)("a",{href:"#",children:"fast"})}),Object(i.jsx)("li",{onClick:function(){return C(2)},children:Object(i.jsx)("a",{href:"#",children:"medium"})}),Object(i.jsx)("li",{onClick:function(){return C(3)},children:Object(i.jsx)("a",{href:"#",children:"slow"})})]})]})]})}),Object(i.jsx)("div",{className:"grid",children:n.map((function(e){return Object(i.jsx)("div",{children:e.map((function(e){return Object(i.jsx)(d,{node:e})}))})}))})]})},k=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,16)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,o=t.getLCP,l=t.getTTFB;n(e),c(e),a(e),o(e),l(e)}))};l.a.render(Object(i.jsx)(a.a.StrictMode,{children:Object(i.jsx)(x,{})}),document.getElementById("root")),k()}},[[15,1,2]]]);
//# sourceMappingURL=main.c7d3ce2a.chunk.js.map