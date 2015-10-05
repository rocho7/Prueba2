// Copyright 2012 Google Inc. All rights reserved.
// Container Version: 2
(function(w,g){w[g]=w[g]||{};w[g].e=function(s){return eval(s);};})(window,'google_tag_manager');(function(){
var m=this,ba=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var d=Object.prototype.toString.call(a);if("[object Window]"==d)return"object";if("[object Array]"==d||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==d||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b},ca=function(a,b){var d=Array.prototype.slice.call(arguments,1);return function(){var b=d.slice();b.push.apply(b,arguments);return a.apply(this,b)}},da=null;/*
 jQuery v1.9.1 (c) 2005, 2012 jQuery Foundation, Inc. jquery.org/license. */
var ea=/\[object (Boolean|Number|String|Function|Array|Date|RegExp)\]/,fa=function(a){if(null==a)return String(a);var b=ea.exec(Object.prototype.toString.call(Object(a)));return b?b[1].toLowerCase():"object"},ga=function(a,b){return Object.prototype.hasOwnProperty.call(Object(a),b)},ha=function(a){if(!a||"object"!=fa(a)||a.nodeType||a==a.window)return!1;try{if(a.constructor&&!ga(a,"constructor")&&!ga(a.constructor.prototype,"isPrototypeOf"))return!1}catch(b){return!1}for(var d in a);return void 0===
d||ga(a,d)},ia=function(a,b){var d=b||("array"==fa(a)?[]:{}),c;for(c in a)if(ga(a,c)){var e=a[c];"array"==fa(e)?("array"!=fa(d[c])&&(d[c]=[]),d[c]=ia(e,d[c])):ha(e)?(ha(d[c])||(d[c]={}),d[c]=ia(e,d[c])):d[c]=e}return d};var ja=function(){},x=function(a){return"function"==typeof a},A=function(a){return"[object Array]"==Object.prototype.toString.call(Object(a))},la=function(a){return"number"==fa(a)&&!isNaN(a)},ma=function(a,b){if(Array.prototype.indexOf){var d=a.indexOf(b);return"number"==typeof d?d:-1}for(var c=0;c<a.length;c++)if(a[c]===b)return c;return-1},na=function(a){return a?a.replace(/^\s+|\s+$/g,""):""},D=function(a){return Math.round(Number(a))||0},oa=function(a){var b=[];if(A(a))for(var d=0;d<a.length;d++)b.push(String(a[d]));
return b},F=function(){return new Date},pa=function(a,b){if(!la(a)||!la(b)||a>b)a=0,b=2147483647;return Math.round(Math.random()*(b-a)+a)},qa=function(){this.prefix="gtm.";this.ha={}};qa.prototype.set=function(a,b){this.ha[this.prefix+a]=b};qa.prototype.get=function(a){return this.ha[this.prefix+a]};qa.prototype.contains=function(a){return void 0!==this.get(a)};
var ra=function(a,b,d){try{return a["3"](a,b||ja,d||ja)}catch(c){}return!1},ua=function(a,b){function d(b,c){a.contains(b)||a.set(b,[]);a.get(b).push(c)}for(var c=na(b).split("&"),e=0;e<c.length;e++)if(c[e]){var f=c[e].indexOf("=");0>f?d(c[e],"1"):d(c[e].substring(0,f),c[e].substring(f+1))}},va=function(a){var b=a?a.length:0;return 0<b?a[b-1]:""},wa=function(a){for(var b=0;b<a.length;b++)a[b]()},xa=F().getTime(),ya=function(a,b,d){return a&&a.hasOwnProperty(b)?a[b]:d},Aa=function(a,
b,d){a.prototype["gtm_proxy_"+b]=a.prototype[b];a.prototype[b]=d};var Ba=new qa,Ca={},Ea={set:function(a,b){ia(Da(a,b),Ca)},get:function(a){return H(a,2)}},H=function(a,b){if(2==b){for(var d=Ca,c=a.split("."),e=0;e<c.length;e++){if(void 0===d[c[e]])return;d=d[c[e]]}return d}return Ba.get(a)},Da=function(a,b){for(var d={},c=d,e=a.split("."),f=0;f<e.length-1;f++)c=c[e[f]]={};c[e[e.length-1]]=b;return d};var Fa={customPixels:["nonGooglePixels"],html:["customScripts","customPixels","nonGooglePixels","nonGoogleScripts","nonGoogleIframes"],customScripts:["html","customPixels","nonGooglePixels","nonGoogleScripts","nonGoogleIframes"],nonGooglePixels:[],nonGoogleScripts:["nonGooglePixels"],nonGoogleIframes:["nonGooglePixels"]},Ga={customPixels:["customScripts","html"],html:["customScripts"],customScripts:["html"],nonGooglePixels:["customPixels","customScripts","html","nonGoogleScripts","nonGoogleIframes"],
nonGoogleScripts:["customScripts","html"],nonGoogleIframes:["customScripts","html","nonGoogleScripts"]},Ha=function(a,b){for(var d=[],c=0;c<a.length;c++)d.push(a[c]),d.push.apply(d,b[a[c]]||[]);return d},Ia=function(){var a=H("gtm.whitelist"),b=a&&Ha(oa(a),Fa),d=H("gtm.blacklist")||H("tagTypeBlacklist"),c=d&&Ha(oa(d),Ga),e={};return function(f){var g=f&&f["3"];if(!g)return!0;if(void 0!==e[g.a])return e[g.a];var h=!0;if(a)e:{if(0>ma(b,g.a))if(g.b&&0<g.b.length)for(var n=0;n<g.b.length;n++){if(0>
ma(b,g.b[n])){h=!1;break e}}else{h=!1;break e}h=!0}var p=!1;if(d){var l;if(!(l=0<=ma(c,g.a)))e:{for(var q=g.b||[],r=new qa,t=0;t<c.length;t++)r.set(c[t],!0);for(t=0;t<q.length;t++)if(r.get(q[t])){l=!0;break e}l=!1}p=l}return e[g.a]=!h||p}};var K=window,L=document,Ja=navigator,M=function(a,b,d){var c=K[a],e="var "+a+";";if(m.execScript)m.execScript(e,"JavaScript");else if(m.eval)if(null==da&&(m.eval("var _et_ = 1;"),"undefined"!=typeof m._et_?(delete m._et_,da=!0):da=!1),da)m.eval(e);else{var f=m.document,g=f.createElement("script");g.type="text/javascript";g.defer=!1;g.appendChild(f.createTextNode(e));f.body.appendChild(g);f.body.removeChild(g)}else throw Error("goog.globalEval not available");K[a]=void 0===c||d?b:c;return K[a]},N=
function(a,b,d,c){return(c||"http:"!=K.location.protocol?a:b)+d},Ka=function(a){var b=L.getElementsByTagName("script")[0];b.parentNode.insertBefore(a,b)},La=function(a,b){b&&(a.addEventListener?a.onload=b:a.onreadystatechange=function(){a.readyState in{loaded:1,complete:1}&&(a.onreadystatechange=null,b())})},O=function(a,b,d){var c=L.createElement("script");c.type="text/javascript";c.async=!0;c.src=a;La(c,b);d&&(c.onerror=d);Ka(c)},Pa=function(a,b){var d=L.createElement("iframe");d.height="0";d.width=
"0";d.style.display="none";d.style.visibility="hidden";Ka(d);La(d,b);void 0!==a&&(d.src=a);return d},k=function(a,b,d){var c=new Image(1,1);c.onload=function(){c.onload=null;b&&b()};c.onerror=function(){c.onerror=null;d&&d()};c.src=a},P=function(a,b,d,c){a.addEventListener?a.addEventListener(b,d,!!c):a.attachEvent&&a.attachEvent("on"+b,d)},R=function(a){K.setTimeout(a,0)},Qa=!1,Ra=[],Sa=function(a){if(!Qa){var b=L.createEventObject,d="complete"==L.readyState,c="interactive"==L.readyState;if(!a||"readystatechange"!=
a.type||d||!b&&c){Qa=!0;for(var e=0;e<Ra.length;e++)Ra[e]()}}},Ta=0,Ua=function(){if(!Qa&&140>Ta){Ta++;try{L.documentElement.doScroll("left"),Sa()}catch(a){K.setTimeout(Ua,50)}}},Wa=function(a){var b=L.getElementById(a);if(b&&Va(b,"id")!=a)for(var d=1;d<document.all[a].length;d++)if(Va(document.all[a][d],"id")==a)return document.all[a][d];return b},Va=function(a,b){return a&&b&&a.attributes[b]?a.attributes[b].value:null},Xa=function(a){return a.target||a.srcElement||{}},Ya=function(a){var b=L.createElement("div");
b.innerHTML="A<div>"+a+"</div>";for(var b=b.lastChild,d=[];b.firstChild;)d.push(b.removeChild(b.firstChild));return d},Za=function(a,b){for(var d={},c=0;c<b.length;c++)d[b[c]]=!0;for(var e=a,c=0;e&&!d[String(e.tagName).toLowerCase()]&&100>c;c++)e=e.parentElement;e&&!d[String(e.tagName).toLowerCase()]&&(e=null);return e},$a=!1,ab=[],bb=function(){if(!$a){$a=!0;for(var a=0;a<ab.length;a++)ab[a]()}},cb=function(a){a=a||K;var b=a.location.href,d=b.indexOf("#");return 0>d?"":b.substring(d+1)};var db;e:{var eb=/MSIE +([\d\.]+)/.exec(Ja.userAgent);if(eb&&eb[1]){var fb=L.documentMode;fb||(fb="CSS1Compat"==L.compatMode?parseInt(eb[1],10):5);if(!fb||8>=fb){db=!1;break e}}db=!!L.querySelectorAll}var gb=db;var ib=function(a,b,d,c,e){var f=hb(a),g=(a.protocol.replace(":","")||K.location.protocol.replace(":","")).toLowerCase();switch(b){case "protocol":f=g;break;case "host":f=(a.hostname||K.location.hostname).split(":")[0].toLowerCase();if(d){var h=/^www\d*\./.exec(f);h&&h[0]&&(f=f.substr(h[0].length))}break;case "port":f=String(1*(a.hostname?a.port:K.location.port)||("http"==g?80:"https"==g?443:""));break;case "path":var f="/"==a.pathname.substr(0,1)?a.pathname:"/"+a.pathname,n=f.split("/");0<=ma(c||
[],n[n.length-1])&&(n[n.length-1]="");f=n.join("/");break;case "query":f=a.search.replace("?","");if(e)e:{for(var p=f.split("&"),l=0;l<p.length;l++){var q=p[l].split("=");if(decodeURIComponent(q[0]).replace("+"," ")==e){f=decodeURIComponent(q.slice(1).join("=")).replace("+"," ");break e}}f=void 0}break;case "fragment":f=a.hash.replace("#","")}return f},hb=function(a){var b=a||K.location;return b.hash?b.href.replace(b.hash,""):b.href},kb=function(a){var b=L.createElement("a");b.href=a;return b};var _eu=function(a){var b=String(H("gtm.elementUrl")||a[""]||""),d=kb(b);return b};_eu.a="eu";_eu.b=["google"];var lb=null,mb=null;var _e=function(){return mb};_e.a="e";_e.b=["google"];var _f=function(a){var b=String(H("gtm.referrer")||L.referrer),d=kb(b);return b};_f.a="f";_f.b=["google"];var nb=function(a){var b=K.location,d=b.hash?b.href.replace(b.hash,""):b.href,c;if(c=a[""]?a[""]:H("gtm.url"))d=String(c),b=kb(d);var e,f,g;
a["2"]&&(d=ib(b,a["2"],e,f,g));return d},_u=nb;_u.a="u";_u.b=["google"];var _eq=function(a){return String(a["0"])==String(a["1"])};_eq.a="eq";_eq.b=["google"];var _re=function(a){return(new RegExp(a["1"],a[""]?"i":void 0)).test(a["0"])};_re.a="re";_re.b=["google"];var vb=ja,wb=[],xb=!1,yb=function(a){return K["dataLayer"].push(a)},zb=function(a){var b=!1;return function(){!b&&x(a)&&R(a);b=!0}},Fb=function(){for(var a=!1;!xb&&0<wb.length;){xb=!0;var b=wb.shift();if(x(b))try{b.call(Ea)}catch(d){}else if(A(b))e:{var c=b;if("string"==fa(c[0])){for(var e=c[0].split("."),f=e.pop(),g=c.slice(1),h=Ca,n=0;n<e.length;n++){if(void 0===h[e[n]])break e;h=h[e[n]]}try{h[f].apply(h,g)}catch(p){}}}else{var l=b,q=void 0;for(q in l)if(l.hasOwnProperty(q)){var r=q,t=l[q];
Ba.set(r,t);ia(Da(r,t),Ca)}var B=!1,G=l.event;if(G){mb=G;var w=zb(l.eventCallback),Q=l.eventTimeout;Q&&K.setTimeout(w,Number(Q));B=vb(G,w,l.eventReporter)}if(!lb&&(lb=l["gtm.start"])){}mb=null;a=B||a}var J=b,W=Ca;Eb();xb=!1}return!a};var Gb,Hb=/(Firefox\D28\D)/g.test(Ja.userAgent),Ib={nwnc:{},nwc:{},wnc:{},wc:{},wt:null,l:!1},Jb={nwnc:{},nwc:{},wnc:{},wc:{},wt:null,l:!1},Pb=function(a,b,d,c){return function(e){e=e||K.event;var f=Xa(e),g=!1;if(3!==e.which||"CLICK"!=a&&"LINK_CLICK"!=a)if(2!==e.which&&(null!=e.which||4!=e.button)||"LINK_CLICK"!=a){"LINK_CLICK"==a&&(f=Za(f,["a","area"]),g=!f||!f.href||Kb(f.href)||e.ctrlKey||e.shiftKey||e.altKey||!0===e.metaKey);var h="FORM_SUBMIT"==a?Jb:Ib;if(e.defaultPrevented||!1===e.returnValue||
e.U&&e.U()){if(f){var n={simulateDefault:!1};if("LINK_CLICK"==a||"FORM_SUBMIT"==a){var p=Lb(h);p&&Mb(a,f,n,h.wt,p)}else d||Mb(a,f,n,c)}}else{if(f){var n={},l=!0;"LINK_CLICK"==a||"FORM_SUBMIT"==a?(l=Mb(a,f,n,h.wt,""))||(Nb(n.eventReport,h)?b=!0:g=!0):l=Mb(a,f,n,c);g=g||l||"LINK_CLICK"==a&&Hb;n.simulateDefault=!l&&b&&!g;n.simulateDefault&&(g=Ob(f,n)||g,!g&&e.preventDefault&&e.preventDefault());e.returnValue=l||!b||g;return e.returnValue}return!0}}}},Mb=function(a,b,d,c,e){var f=c||2E3,g={"gtm.element":b,
"gtm.elementClasses":b.className,"gtm.elementId":b["for"]||Va(b,"id")||"","gtm.elementTarget":b.formTarget||b.target||""};switch(a){case "LINK_CLICK":g["gtm.triggers"]=e||"";g.event="gtm.linkClick";g["gtm.elementUrl"]=b.href;g.eventTimeout=f;g.eventCallback=Qb(b,d);g.eventReporter=function(a){d.eventReport=a};break;case "FORM_SUBMIT":g["gtm.triggers"]=e||"";g.event="gtm.formSubmit";g["gtm.elementUrl"]=Rb(b);g.eventTimeout=f;g.eventCallback=Sb(b,d);g.eventReporter=function(a){d.eventReport=a};break;
case "CLICK":g.event="gtm.click";g["gtm.elementUrl"]=b.formAction||b.action||b.href||b.src||b.code||b.codebase||"";break;default:return!0}return yb(g)},Rb=function(a){var b=a.action;b&&b.tagName&&(b=a.cloneNode(!1).action);return b},Vb=function(a){var b=a.target;if(!b)switch(String(a.tagName).toLowerCase()){case "a":case "area":case "form":b="_self"}return b},Ob=function(a,b){var d=!1,c=/(iPad|iPhone|iPod)/g.test(Ja.userAgent),e=Vb(a).toLowerCase();switch(e){case "":case "_self":case "_parent":case "_top":var f;
f=(e||"_self").substring(1);b.targetWindow=K.frames&&K.frames[f]||K[f];break;case "_blank":c?(b.simulateDefault=!1,d=!0):(b.targetWindowName="gtm_autoEvent_"+F().getTime(),b.targetWindow=K.open("",b.targetWindowName));break;default:c&&!K.frames[e]?(b.simulateDefault=!1,d=!0):(K.frames[e]||(b.targetWindowName=e),b.targetWindow=K.frames[e]||K.open("",e))}return d},Qb=function(a,b,d){return function(){b.simulateDefault&&(b.targetWindow?b.targetWindow.location.href=a.href:(d=d||F().getTime(),500>F().getTime()-
d&&K.setTimeout(Qb(a,b,d),25)))}},Sb=function(a,b,d){return function(){if(b.simulateDefault)if(b.targetWindow){var c;b.targetWindowName&&(c=a.target,a.target=b.targetWindowName);L.gtmSubmitFormNow=!0;Wb(a).call(a);b.targetWindowName&&(a.target=c)}else d=d||F().getTime(),500>F().getTime()-d&&K.setTimeout(Sb(a,b,d),25)}},Lb=function(a){for(var b=["wnc","nwnc"],d=[],c=0;c<b.length;c++){var e=a[b[c]],f;for(f in e)e.hasOwnProperty(f)&&e[f]&&d.push(f)}return d.join(",")},Xb=function(a,b,d,c,e){var f=e;
if(!f||"0"==f){if(a.l)return;a.l=!0;f="0"}var g=a.wt;b&&(!g||g>c)&&(a.wt=c);a[b?d?"wc":"wnc":d?"nwc":"nwnc"][f]=!0},Nb=function(a,b){if(b.wnc["0"]||b.wc["0"])return!0;for(var d=0;d<U.length;d++)if(a.passingRules[d]){var c=U[d],e=Yb[d],f=e&&e[0]&&e[0][0]||e[1]&&e[1][0];if(f&&"0"!=f&&(b.wc[f]||b.wnc[f]))for(var g=c[1],h=0;h<g.length;h++)if(a.resolvedTags[g[h]])return!0}return!1},Zb=function(a,b,d,c,e){var f,g;switch(a){case "CLICK":if(L.gtmHasClickListenerTag)return;L.gtmHasClickListenerTag=!0;f="click";
g=function(a){var b=Xa(a);b&&Mb("CLICK",b,{},c);return!0};break;case "LINK_CLICK":b&&!Gb&&(Gb=hb());Xb(Ib,b||!1,d||!1,c,e);if(L.gtmHasLinkClickListenerTag)return;L.gtmHasLinkClickListenerTag=!0;f="click";g=Pb(a,b||!1,d||!1,c);break;case "FORM_SUBMIT":Xb(Jb,b||!1,d||!1,c,e);if(L.gtmHasFormSubmitListenerTag)return;L.gtmHasFormSubmitListenerTag=!0;f="submit";g=Pb(a,b||!1,d||!1,c);break;default:return}P(L,f,g,!1)},Kb=function(a){if(!Gb)return!0;var b=a.indexOf("#");if(0>b)return!1;if(0==b)return!0;var d=
kb(a);return Gb==hb(d)},Wb=function(a){try{if(a.constructor&&a.constructor.prototype)return a.constructor.prototype.submit}catch(b){}if(a.gtmReplacedFormSubmit)return a.gtmReplacedFormSubmit;L.gtmFormElementSubmitter||(L.gtmFormElementSubmitter=L.createElement("form"));return L.gtmFormElementSubmitter.submit.call?L.gtmFormElementSubmitter.submit:a.submit};var gc=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},hc=function(a,b){return a<b?-1:a>b?1:0};var ic;e:{var jc=m.navigator;if(jc){var kc=jc.userAgent;if(kc){ic=kc;break e}}ic=""}var lc=function(a){return-1!=ic.indexOf(a)};var mc=lc("Opera")||lc("OPR"),X=lc("Trident")||lc("MSIE"),nc=lc("Gecko")&&-1==ic.toLowerCase().indexOf("webkit")&&!(lc("Trident")||lc("MSIE")),oc=-1!=ic.toLowerCase().indexOf("webkit"),pc=function(){var a=m.document;return a?a.documentMode:void 0},qc=function(){var a="",b;if(mc&&m.opera){var d=m.opera.version;return"function"==ba(d)?d():d}nc?b=/rv\:([^\);]+)(\)|;)/:X?b=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:oc&&(b=/WebKit\/(\S+)/);if(b)var c=b.exec(ic),a=c?c[1]:"";if(X){var e=pc();if(e>parseFloat(a))return String(e)}return a}(),
rc={},sc=function(a){var b;if(!(b=rc[a])){for(var d=0,c=gc(String(qc)).split("."),e=gc(String(a)).split("."),f=Math.max(c.length,e.length),g=0;0==d&&g<f;g++){var h=c[g]||"",n=e[g]||"",p=RegExp("(\\d*)(\\D*)","g"),l=RegExp("(\\d*)(\\D*)","g");do{var q=p.exec(h)||["","",""],r=l.exec(n)||["","",""];if(0==q[0].length&&0==r[0].length)break;d=hc(0==q[1].length?0:parseInt(q[1],10),0==r[1].length?0:parseInt(r[1],10))||hc(0==q[2].length,0==r[2].length)||hc(q[2],r[2])}while(0==d)}b=rc[a]=0<=d}return b},tc=
m.document,uc=tc&&X?pc()||("CSS1Compat"==tc.compatMode?parseInt(qc,10):5):void 0;var vc;if(!(vc=!nc&&!X)){var wc;if(wc=X)wc=X&&9<=uc;vc=wc}vc||nc&&sc("1.9.1");X&&sc("9");var xc=function(a){xc[" "](a);return a};xc[" "]=function(){};var Cc=function(a,b){var d="";X&&!yc(a)&&(d='<script>document.domain="'+document.domain+'";\x3c/script>'+d);var c="<!DOCTYPE html><html><head><script>var inDapIF=true;\x3c/script>"+d+"</head><body>"+b+"</body></html>";if(zc)a.srcdoc=c;else if(Ac){var e=a.contentWindow.document;e.open("text/html","replace");e.write(c);e.close()}else Bc(a,c)},zc=oc&&"srcdoc"in document.createElement("iframe"),Ac=nc||oc||X&&sc(11),Bc=function(a,b){X&&sc(7)&&!sc(10)&&6>Dc()&&Ec(b)&&(b=Fc(b));var d=function(){a.contentWindow.goog_content=
b;a.contentWindow.location.replace("javascript:window.goog_content")};X&&!yc(a)?Gc(a,d):d()},Dc=function(){var a=navigator.userAgent.match(/Trident\/([0-9]+.[0-9]+)/);return a?parseFloat(a[1]):0},yc=function(a){try{var b;var d=a.contentWindow;try{var c;if(c=!!d&&null!=d.location.href)t:{try{xc(d.foo);c=!0;break t}catch(e){}c=!1}b=c}catch(f){b=!1}return b}catch(g){return!1}},Hc=0,Gc=function(a,b){var d="goog_rendering_callback"+Hc++;window[d]=b;X&&sc(6)&&!sc(7)?a.src="javascript:'<script>window.onload = function() { document.write(\\'<script>(function() {document.domain = \""+
document.domain+'";var continuation = window.parent.'+d+";window.parent."+d+" = null;continuation()})()<\\\\/script>\\');document.close();};\x3c/script>'":a.src="javascript:'<script>(function() {document.domain = \""+document.domain+'";var continuation = window.parent.'+d+";window.parent."+d+" = null;continuation();})()\x3c/script>'"},Ec=function(a){for(var b=0;b<a.length;++b)if(127<a.charCodeAt(b))return!0;return!1},Fc=function(a){for(var b=unescape(encodeURIComponent(a)),d=Math.floor(b.length/2),
c=[],e=0;e<d;++e)c[e]=String.fromCharCode(256*b.charCodeAt(2*e+1)+b.charCodeAt(2*e));1==b.length%2&&(c[d]=b.charAt(b.length-1));return c.join("")};/*
 Copyright (c) 2013 Derek Brans, MIT license https://github.com/krux/postscribe/blob/master/LICENSE. Portions derived from simplehtmlparser, which is licensed under the Apache License, Version 2.0 */

var Kc=function(a,b,d,c){return function(){try{if(0<b.length){var e=b.shift(),f=Kc(a,b,d,c);if("SCRIPT"==e.nodeName&&"text/gtmscript"==e.type){var g=L.createElement("script");g.async=!1;g.type="text/javascript";g.id=e.id;g.text=e.text||e.textContent||e.innerHTML||"";e.charset&&(g.charset=e.charset);var h=e.getAttribute("data-gtmsrc");h&&(g.src=h,La(g,f));a.insertBefore(g,null);h||f()}else if(e.innerHTML&&0<=e.innerHTML.toLowerCase().indexOf("<script")){for(var n=[];e.firstChild;)n.push(e.removeChild(e.firstChild));
a.insertBefore(e,null);Kc(e,n,f,c)()}else a.insertBefore(e,null),f()}else d()}catch(p){R(c)}}};var Mc=function(a,b,d){if(L.body){if(a[""])try{Cc(Pa(),"<script>var google_tag_manager=parent.google_tag_manager;\x3c/script>"+a["4"]),R(b)}catch(c){R(d)}else a[""]?Lc(a,b,d):Kc(L.body,Ya(a["4"]),b,d)()}else K.setTimeout(function(){Mc(a,b,d)},200)},_html=Mc;_html.a="html";_html.b=["customScripts"];
var Pc,Qc;
var $c=function(a){return function(){}},ad=function(a){return function(){}};var vd=function(a){var b=K||m,d=b.onerror,c=!1;oc&&!sc("535.3")&&(c=!c);b.onerror=function(b,f,g,h,n){d&&d(b,f,g,h,n);a({message:b,fileName:f,Ca:g,Sa:h,error:n});return c}};var Ad,Bd;var de=function(){this.f=[]};de.prototype.set=function(a,b){this.f.push([a,b]);return this};de.prototype.resolve=function(a,b){for(var d={},c=0;c<this.f.length;c++){var e=ee(this.f[c][0],a,b),f=ee(this.f[c][1],a,b);d[e]=f}return d};var fe=function(a){this.index=a};fe.prototype.resolve=function(a,b){var d=Ab[this.index];if(d&&!b(d)){var c=d["5"];if(a){if(a.get(c))return;a.set(c,!0)}d=ee(d,a,b);a&&a.set(c,!1);return ra(d)}};
for(var _M=function(a){return new fe(a)},he=function(a){this.resolve=function(b,d){for(var c=[],e=0;e<a.length;e++)c.push(ee(ge[a[e]],b,d));return c.join("")}},_T=function(a){return new he(arguments)},je=function(a){function b(b){for(var c=1;c<a.length;c++)if(a[c]==b)return!0;return!1}this.resolve=function(d,c){var e=ee(a[0],d,c);if(a[0]instanceof fe&&b(8)&&b(16)){var f="gtm"+xa++;ie.set(f,e);return'google_tag_manager["GTM-49WW"].macro(\''+f+"')"}for(var e=String(e),g=1;g<a.length;g++)e=Z[a[g]](e);return e}},_E=function(a,b){return new je(arguments)},Db=function(a,b){return ee(a,new qa,b)},ee=function(a,b,d){var c=a;if(a instanceof fe||a instanceof
de||a instanceof he||a instanceof je)return a.resolve(b,d);if(A(a))for(var c=[],e=0;e<a.length;e++)c[e]=ee(a[e],b,d);else if(a&&"object"==typeof a){var c={},f;for(f in a)a.hasOwnProperty(f)&&(c[f]=ee(a[f],b,d))}return c},ke=function(a,b){var d=b[a],c=d;if(d instanceof fe||d instanceof je||d instanceof he)c=d;else if(A(d))for(var c=[],e=0;e<d.length;e++)c[e]=ke(d[e],b);else if("object"==typeof d){var c=new de,f;for(f in d)d.hasOwnProperty(f)&&c.set(b[f],ke(d[f],b))}return c},$=function(a,b){for(var d=
b?b.split(","):[],c=0;c<d.length;c++){var e=d[c]=d[c].split(":");0==a&&(e[1]=ge[e[1]]);if(1==a)for(var f=le(e[0]),e=d[c]={},g=0;g<f.length;g++){var h=me[f[g]];e[h[0]]=h[1]}if(2==a)for(g=0;4>g;g++)e[g]=le(e[g]);3==a&&(d[c]=ge[e[0]]);if(4==a)for(g=0;2>g;g++)if(e[g]){e[g]=e[g].split(".");for(var n=0;n<e[g].length;n++)e[g][n]=ge[e[g][n]]}else e[g]=[];5==a&&(d[c]=e[0])}return d},le=function(a){var b=[];if(!a)return b;for(var d=0,c=0;c<a.length&&d<ne;d+=6,c++){var e=a&&a.charCodeAt(c)||65;if(65!=e){var f=
0,f=65<e&&90>=e?e-65:97<=e&&122>=e?e-97+26:95==e?63:48<=e?e-48+52:62;1&f&&b.push(d);2&f&&b.push(d+1);4&f&&b.push(d+2);8&f&&b.push(d+3);16&f&&b.push(d+4);32&f&&b.push(d+5)}}return b},ne=21,oe=[_re,_u,'url',_M(0),'.*',_eq,_e,'_event',_M(1),'gtm.js',_html,'Google Analytics','\x3cscript type\x3d\x22text/gtmscript\x22\x3evar _gaq\x3d_gaq||[],pluginUrl\x3d\x22//www.google-analytics.com/plugins/ga/inpage_linkid.js\x22;_gaq.push([\x22_require\x22,\x22inpage_linkid\x22,pluginUrl]);_gaq.push([\x22_setAccount\x22,\x22UA-23511572-1\x22]);_gaq.push([\x22_trackPageview\x22]);(function(){var a\x3ddocument.createElement(\x22script\x22);a.type\x3d\x22text/javascript\x22;a.async\x3d!0;a.src\x3d(\x22https:\x22\x3d\x3ddocument.location.protocol?\x22https://ssl\x22:\x22http://www\x22)+\x22.google-analytics.com/ga.js\x22;var b\x3ddocument.getElementsByTagName(\x22script\x22)[0];b.parentNode.insertBefore(a,b)})();\x3c/script\x3e\n',_T(12),1,'event',_f,'referrer','url path','path','url hostname','host'],pe=[],qe=0;qe<oe.length;qe++)pe[qe]=ke(qe,oe);var ge=pe,me=$(0,"3:0,3:1,5:2,0:3,1:4,3:5,3:6,5:7,0:8,1:9,3:10,5:11,4:13,6:14,5:15,3:16,5:17,5:18,2:19,5:20,2:21"),Ab=$(1,"G,AD,ABE,AAY,CAgB,CAAG"),ie=new qa,re=$(1,"Z,gM"),Y=$(1,"AwD"),U=$(2,"D:B::"),Yb=$(4,":");var Eb=function(){};var Ce=function(){var a=this;this.v=!1;this.B=[];this.O=[];this.F=function(){a.v||wa(a.B);a.v=!0};this.G=function(){a.v||wa(a.O);a.v=!0};this.j=ja},De=function(){this.k=[];this.Z={};this.P=[];this.p=0};De.prototype.addListener=function(a){this.P.push(a)};var Ee=function(a,b,d,c){if(!d.v){a.k[b]=d;void 0!==c&&(a.Z[b]=c);a.p++;var e=function(){0<a.p&&a.p--;0<a.p||wa(a.P)};d.B.push(e);d.O.push(e)}};var Fe=function(){var a=[];return function(b,d){if(void 0===a[b]){var c=re[b]&&Db(re[b],d);a[b]=[c&&ra(c),c]}return a[b]}},Ge=function(a,b){for(var d=b[0],c=0;c<d.length;c++)if(!a.d(d[c],a.c)[0])return!1;for(var e=b[2],c=0;c<e.length;c++)if(a.d(e[c],a.c)[0])return!1;return!0},He=function(a,b){return function(){a["7"]=b.F;a["8"]=b.G;ra(a,b.F,b.G)}},vb=function(a,b,d){H("tagTypeBlacklist");for(var c={name:a,C:b||ja,r:le(),s:le(),d:Fe(),c:Ia()},e=[],f=0;f<U.length;f++)if(Ge(c,
U[f])){e[f]=!0;for(var g=c,h=U[f],n=h[1],p=0;p<n.length;p++)g.r[n[p]]=!0;for(var l=h[3],p=0;p<l.length;p++)g.s[l[p]]=!0}else e[f]=!1;var q=[];for(var r=0;r<ne;r++)if(c.r[r]&&!c.s[r])if(c.c(Y[r])){}else{q[r]=Db(Y[r],c.c);}c.t=
q;for(var t=new De,B=0;B<ne;B++)if(c.r[B]&&!c.s[B]&&!c.c(Y[B])){var G=c.t[B],w=new Ce;w.B.push($c(G));w.O.push(ad(G));w.j=He(G,w);Ee(t,B,w,G[""])}t.addListener(c.C);for(var Q=[],v=0;v<t.k.length;v++){var I=t.k[v];if(I){var C=t.Z[v];void 0!==C?C!=v&&t.k[C]&&t.k[C].B.push(I.j):Q.push(v)}}for(v=0;v<Q.length;v++)t.k[Q[v]].j();0<t.p||wa(t.P);d&&x(d)&&d({passingRules:e,resolvedTags:c.t});return 0<c.t.length};var Ie={macro:function(a){if(ie.contains(a))return ie.get(a)}};Ie.dataLayer=Ea;Ie.Ea=function(){var a=K.google_tag_manager;a||(a=K.google_tag_manager={});a["GTM-49WW"]||(a["GTM-49WW"]=Ie)};Ie.Ea();
(function(){var a=M("dataLayer",[],!1),b=M("google_tag_manager",{},!1),b=b["dataLayer"]=b["dataLayer"]||{};Ra.push(function(){b.gtmDom||(b.gtmDom=!0,a.push({event:"gtm.dom"}))});ab.push(function(){b.gtmLoad||(b.gtmLoad=!0,a.push({event:"gtm.load"}))});var d=a.push;a.push=function(){var b=[].slice.call(arguments,0);d.apply(a,b);for(wb.push.apply(wb,b);300<this.length;)this.shift();return Fb()};wb.push.apply(wb,a.slice(0));R(Fb)})();
if("interactive"==L.readyState&&!L.createEventObject||"complete"==L.readyState)Sa();else{P(L,"DOMContentLoaded",Sa);P(L,"readystatechange",Sa);if(L.createEventObject&&L.documentElement.doScroll){var Je=!0;try{Je=!K.frameElement}catch(Le){}Je&&Ua()}P(K,"load",Sa)}"complete"===L.readyState?bb():P(K,"load",bb);var _vs="res_ts:1374775961011000,srv_cl:76935338,ds:live,cv:2";
})()
