import{z as Me,a2 as ii,a4 as oi,c as L,h as W,B as Ce,g as je,V as Ye,K as ti,X as si,Z as ai,r as Oe,E as ni,$ as ri,ar as li,w as Ve,P as ci,H as De,as as di,at as ui,d as bi}from"./index.d67af4a6.js";import{u as wi,a as mi,b as fi,c as gi,d as pi,e as hi}from"./_commonjsHelpers.fa85a760.js";var et=Me({name:"QCard",props:{...ii,tag:{type:String,default:"div"},square:Boolean,flat:Boolean,bordered:Boolean},setup(e,{slots:m}){const{proxy:{$q:h}}=je(),f=oi(e,h),N=L(()=>"q-card"+(f.value===!0?" q-card--dark q-dark":"")+(e.bordered===!0?" q-card--bordered":"")+(e.square===!0?" q-card--square no-border-radius":"")+(e.flat===!0?" q-card--flat no-shadow":""));return()=>W(e.tag,{class:N.value},Ce(m.default))}}),it=Me({name:"QCardSection",props:{tag:{type:String,default:"div"},horizontal:Boolean},setup(e,{slots:m}){const h=L(()=>`q-card__section q-card__section--${e.horizontal===!0?"horiz row no-wrap":"vert"}`);return()=>W(e.tag,{class:h.value},Ce(m.default))}});const Q=[];let ue;function vi(e){ue=e.keyCode===27}function xi(){ue===!0&&(ue=!1)}function yi(e){ue===!0&&(ue=!1,ti(e,27)===!0&&Q[Q.length-1](e))}function Ge(e){window[e]("keydown",vi),window[e]("blur",xi),window[e]("keyup",yi),ue=!1}function ki(e){Ye.is.desktop===!0&&(Q.push(e),Q.length===1&&Ge("addEventListener"))}function Fe(e){const m=Q.indexOf(e);m!==-1&&(Q.splice(m,1),Q.length===0&&Ge("removeEventListener"))}const X=[];function Ke(e){X[X.length-1](e)}function Si(e){Ye.is.desktop===!0&&(X.push(e),X.length===1&&document.body.addEventListener("focusin",Ke))}function Le(e){const m=X.indexOf(e);m!==-1&&(X.splice(m,1),X.length===0&&document.body.removeEventListener("focusin",Ke))}let ke=0;const Ti={standard:"fixed-full flex-center",top:"fixed-top justify-center",bottom:"fixed-bottom justify-center",right:"fixed-right items-center",left:"fixed-left items-center"},We={standard:["scale","scale"],top:["slide-down","slide-up"],bottom:["slide-up","slide-down"],right:["slide-left","slide-right"],left:["slide-right","slide-left"]};var ot=Me({name:"QDialog",inheritAttrs:!1,props:{...si,...wi,transitionShow:String,transitionHide:String,persistent:Boolean,autoClose:Boolean,allowFocusOutside:Boolean,noEscDismiss:Boolean,noBackdropDismiss:Boolean,noRouteDismiss:Boolean,noRefocus:Boolean,noFocus:Boolean,noShake:Boolean,seamless:Boolean,maximized:Boolean,fullWidth:Boolean,fullHeight:Boolean,square:Boolean,backdropFilter:String,position:{type:String,default:"standard",validator:e=>["standard","top","bottom","left","right"].includes(e)}},emits:[...ai,"shake","click","escapeKey"],setup(e,{slots:m,emit:h,attrs:f}){const N=je(),y=Oe(null),T=Oe(!1),E=Oe(!1);let O=null,M=null,R,J;const o=L(()=>e.persistent!==!0&&e.noRouteDismiss!==!0&&e.seamless!==!0),{preventBodyScroll:s}=di(),{registerTimeout:i}=ni(),{registerTick:t,removeTick:a}=mi(),{transitionProps:k,transitionStyle:D}=fi(e,()=>We[e.position][0],()=>We[e.position][1]),r=L(()=>D.value+(e.backdropFilter!==void 0?`;backdrop-filter:${e.backdropFilter};-webkit-backdrop-filter:${e.backdropFilter}`:"")),{showPortal:c,hidePortal:v,portalIsAccessible:C,renderPortal:we}=gi(N,y,re,"dialog"),{hide:F}=ri({showing:T,hideOnRouteChange:o,handleShow:Se,handleHide:oe,processOnMount:!0}),{addToHistory:$,removeFromHistory:H}=li(T,F,o),he=L(()=>`q-dialog__inner flex no-pointer-events q-dialog__inner--${e.maximized===!0?"maximized":"minimized"} q-dialog__inner--${e.position} ${Ti[e.position]}`+(E.value===!0?" q-dialog__inner--animating":"")+(e.fullWidth===!0?" q-dialog__inner--fullwidth":"")+(e.fullHeight===!0?" q-dialog__inner--fullheight":"")+(e.square===!0?" q-dialog__inner--square":"")),j=L(()=>T.value===!0&&e.seamless!==!0),ee=L(()=>e.autoClose===!0?{onClick:G}:{}),ie=L(()=>[`q-dialog fullscreen no-pointer-events q-dialog--${j.value===!0?"modal":"seamless"}`,f.class]);Ve(()=>e.maximized,d=>{T.value===!0&&ae(d)}),Ve(j,d=>{s(d),d===!0?(Si(ne),ki(Y)):(Le(ne),Fe(Y))});function Se(d){$(),M=e.noRefocus===!1&&document.activeElement!==null?document.activeElement:null,ae(e.maximized),c(),E.value=!0,e.noFocus!==!0?(document.activeElement!==null&&document.activeElement.blur(),t(B)):a(),i(()=>{if(N.proxy.$q.platform.is.ios===!0){if(e.seamless!==!0&&document.activeElement){const{top:p,bottom:z}=document.activeElement.getBoundingClientRect(),{innerHeight:me}=window,le=window.visualViewport!==void 0?window.visualViewport.height:me;p>0&&z>le/2&&(document.scrollingElement.scrollTop=Math.min(document.scrollingElement.scrollHeight-le,z>=me?1/0:Math.ceil(document.scrollingElement.scrollTop+z-le/2))),document.activeElement.scrollIntoView()}J=!0,y.value.click(),J=!1}c(!0),E.value=!1,h("show",d)},e.transitionDuration)}function oe(d){a(),H(),se(!0),E.value=!0,v(),M!==null&&(((d&&d.type.indexOf("key")===0?M.closest('[tabindex]:not([tabindex^="-"])'):void 0)||M).focus(),M=null),i(()=>{v(!0),E.value=!1,h("hide",d)},e.transitionDuration)}function B(d){pi(()=>{let p=y.value;if(p!==null){if(d!==void 0){const z=p.querySelector(d);if(z!==null){z.focus({preventScroll:!0});return}}p.contains(document.activeElement)!==!0&&(p=p.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]")||p.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]")||p.querySelector("[autofocus], [data-autofocus]")||p,p.focus({preventScroll:!0}))}})}function te(d){d&&typeof d.focus=="function"?d.focus({preventScroll:!0}):B(),h("shake");const p=y.value;p!==null&&(p.classList.remove("q-animate--scale"),p.classList.add("q-animate--scale"),O!==null&&clearTimeout(O),O=setTimeout(()=>{O=null,y.value!==null&&(p.classList.remove("q-animate--scale"),B())},170))}function Y(){e.seamless!==!0&&(e.persistent===!0||e.noEscDismiss===!0?e.maximized!==!0&&e.noShake!==!0&&te():(h("escapeKey"),F()))}function se(d){O!==null&&(clearTimeout(O),O=null),(d===!0||T.value===!0)&&(ae(!1),e.seamless!==!0&&(s(!1),Le(ne),Fe(Y))),d!==!0&&(M=null)}function ae(d){d===!0?R!==!0&&(ke<1&&document.body.classList.add("q-body--dialog"),ke++,R=!0):R===!0&&(ke<2&&document.body.classList.remove("q-body--dialog"),ke--,R=!1)}function G(d){J!==!0&&(F(d),h("click",d))}function K(d){e.persistent!==!0&&e.noBackdropDismiss!==!0?F(d):e.noShake!==!0&&te()}function ne(d){e.allowFocusOutside!==!0&&C.value===!0&&ui(y.value,d.target)!==!0&&B('[tabindex]:not([tabindex="-1"])')}Object.assign(N.proxy,{focus:B,shake:te,__updateRefocusTarget(d){M=d||null}}),ci(se);function re(){return W("div",{role:"dialog","aria-modal":j.value===!0?"true":"false",...f,class:ie.value},[W(De,{name:"q-transition--fade",appear:!0},()=>j.value===!0?W("div",{class:"q-dialog__backdrop fixed-full",style:r.value,"aria-hidden":"true",tabindex:-1,onClick:K}):null),W(De,k.value,()=>T.value===!0?W("div",{ref:y,class:he.value,style:D.value,tabindex:-1,...ee.value},Ce(m.default)):null)])}return we}}),_e={exports:{}};(function(e,m){(function(h,f){var N="1.0.40",y="",T="?",E="function",O="undefined",M="object",R="string",J="major",o="model",s="name",i="type",t="vendor",a="version",k="architecture",D="console",r="mobile",c="tablet",v="smarttv",C="wearable",we="embedded",F=500,$="Amazon",H="Apple",he="ASUS",j="BlackBerry",ee="Browser",ie="Chrome",Se="Edge",oe="Firefox",B="Google",te="Huawei",Y="LG",se="Microsoft",ae="Motorola",G="Opera",K="Samsung",ne="Sharp",re="Sony",d="Xiaomi",p="Zebra",z="Facebook",me="Chromium OS",le="Mac OS",Pe=" Browser",Je=function(u,b){var l={};for(var g in u)b[g]&&b[g].length%2===0?l[g]=b[g].concat(u[g]):l[g]=u[g];return l},ve=function(u){for(var b={},l=0;l<u.length;l++)b[u[l].toUpperCase()]=u[l];return b},Ne=function(u,b){return typeof u===R?ce(b).indexOf(ce(u))!==-1:!1},ce=function(u){return u.toLowerCase()},$e=function(u){return typeof u===R?u.replace(/[^\d\.]/g,y).split(".")[0]:f},Te=function(u,b){if(typeof u===R)return u=u.replace(/^\s\s*/,y),typeof b===O?u:u.substring(0,F)},fe=function(u,b){for(var l=0,g,U,q,w,n,A;l<b.length&&!n;){var Ee=b[l],Ue=b[l+1];for(g=U=0;g<Ee.length&&!n&&Ee[g];)if(n=Ee[g++].exec(u),n)for(q=0;q<Ue.length;q++)A=n[++U],w=Ue[q],typeof w===M&&w.length>0?w.length===2?typeof w[1]==E?this[w[0]]=w[1].call(this,A):this[w[0]]=w[1]:w.length===3?typeof w[1]===E&&!(w[1].exec&&w[1].test)?this[w[0]]=A?w[1].call(this,A,w[2]):f:this[w[0]]=A?A.replace(w[1],w[2]):f:w.length===4&&(this[w[0]]=A?w[3].call(this,A.replace(w[1],w[2])):f):this[w]=A||f;l+=2}},xe=function(u,b){for(var l in b)if(typeof b[l]===M&&b[l].length>0){for(var g=0;g<b[l].length;g++)if(Ne(b[l][g],u))return l===T?f:l}else if(Ne(b[l],u))return l===T?f:l;return b.hasOwnProperty("*")?b["*"]:u},ei={"1.0":"/8","1.2":"/1","1.3":"/3","2.0":"/412","2.0.2":"/416","2.0.3":"/417","2.0.4":"/419","?":"/"},Re={ME:"4.90","NT 3.11":"NT3.51","NT 4.0":"NT4.0",2e3:"NT 5.0",XP:["NT 5.1","NT 5.2"],Vista:"NT 6.0",7:"NT 6.1",8:"NT 6.2","8.1":"NT 6.3",10:["NT 6.4","NT 10.0"],RT:"ARM"},ze={browser:[[/\b(?:crmo|crios)\/([\w\.]+)/i],[a,[s,"Chrome"]],[/edg(?:e|ios|a)?\/([\w\.]+)/i],[a,[s,"Edge"]],[/(opera mini)\/([-\w\.]+)/i,/(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,/(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i],[s,a],[/opios[\/ ]+([\w\.]+)/i],[a,[s,G+" Mini"]],[/\bop(?:rg)?x\/([\w\.]+)/i],[a,[s,G+" GX"]],[/\bopr\/([\w\.]+)/i],[a,[s,G]],[/\bb[ai]*d(?:uhd|[ub]*[aekoprswx]{5,6})[\/ ]?([\w\.]+)/i],[a,[s,"Baidu"]],[/\b(?:mxbrowser|mxios|myie2)\/?([-\w\.]*)\b/i],[a,[s,"Maxthon"]],[/(kindle)\/([\w\.]+)/i,/(lunascape|maxthon|netfront|jasmine|blazer|sleipnir)[\/ ]?([\w\.]*)/i,/(avant|iemobile|slim(?:browser|boat|jet))[\/ ]?([\d\.]*)/i,/(?:ms|\()(ie) ([\w\.]+)/i,/(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|duckduckgo|klar|helio|(?=comodo_)?dragon)\/([-\w\.]+)/i,/(heytap|ovi|115)browser\/([\d\.]+)/i,/(weibo)__([\d\.]+)/i],[s,a],[/quark(?:pc)?\/([-\w\.]+)/i],[a,[s,"Quark"]],[/\bddg\/([\w\.]+)/i],[a,[s,"DuckDuckGo"]],[/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],[a,[s,"UC"+ee]],[/microm.+\bqbcore\/([\w\.]+)/i,/\bqbcore\/([\w\.]+).+microm/i,/micromessenger\/([\w\.]+)/i],[a,[s,"WeChat"]],[/konqueror\/([\w\.]+)/i],[a,[s,"Konqueror"]],[/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],[a,[s,"IE"]],[/ya(?:search)?browser\/([\w\.]+)/i],[a,[s,"Yandex"]],[/slbrowser\/([\w\.]+)/i],[a,[s,"Smart Lenovo "+ee]],[/(avast|avg)\/([\w\.]+)/i],[[s,/(.+)/,"$1 Secure "+ee],a],[/\bfocus\/([\w\.]+)/i],[a,[s,oe+" Focus"]],[/\bopt\/([\w\.]+)/i],[a,[s,G+" Touch"]],[/coc_coc\w+\/([\w\.]+)/i],[a,[s,"Coc Coc"]],[/dolfin\/([\w\.]+)/i],[a,[s,"Dolphin"]],[/coast\/([\w\.]+)/i],[a,[s,G+" Coast"]],[/miuibrowser\/([\w\.]+)/i],[a,[s,"MIUI"+Pe]],[/fxios\/([\w\.-]+)/i],[a,[s,oe]],[/\bqihoobrowser\/?([\w\.]*)/i],[a,[s,"360"]],[/\b(qq)\/([\w\.]+)/i],[[s,/(.+)/,"$1Browser"],a],[/(oculus|sailfish|huawei|vivo|pico)browser\/([\w\.]+)/i],[[s,/(.+)/,"$1"+Pe],a],[/samsungbrowser\/([\w\.]+)/i],[a,[s,K+" Internet"]],[/metasr[\/ ]?([\d\.]+)/i],[a,[s,"Sogou Explorer"]],[/(sogou)mo\w+\/([\d\.]+)/i],[[s,"Sogou Mobile"],a],[/(electron)\/([\w\.]+) safari/i,/(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,/m?(qqbrowser|2345(?=browser|chrome|explorer))\w*[\/ ]?v?([\w\.]+)/i],[s,a],[/(lbbrowser|rekonq)/i,/\[(linkedin)app\]/i],[s],[/ome\/([\w\.]+) \w* ?(iron) saf/i,/ome\/([\w\.]+).+qihu (360)[es]e/i],[a,s],[/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i],[[s,z],a],[/(Klarna)\/([\w\.]+)/i,/(kakao(?:talk|story))[\/ ]([\w\.]+)/i,/(naver)\(.*?(\d+\.[\w\.]+).*\)/i,/safari (line)\/([\w\.]+)/i,/\b(line)\/([\w\.]+)\/iab/i,/(alipay)client\/([\w\.]+)/i,/(twitter)(?:and| f.+e\/([\w\.]+))/i,/(chromium|instagram|snapchat)[\/ ]([-\w\.]+)/i],[s,a],[/\bgsa\/([\w\.]+) .*safari\//i],[a,[s,"GSA"]],[/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i],[a,[s,"TikTok"]],[/headlesschrome(?:\/([\w\.]+)| )/i],[a,[s,ie+" Headless"]],[/ wv\).+(chrome)\/([\w\.]+)/i],[[s,ie+" WebView"],a],[/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i],[a,[s,"Android "+ee]],[/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i],[s,a],[/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i],[a,[s,"Mobile Safari"]],[/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i],[a,s],[/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],[s,[a,xe,ei]],[/(webkit|khtml)\/([\w\.]+)/i],[s,a],[/(navigator|netscape\d?)\/([-\w\.]+)/i],[[s,"Netscape"],a],[/(wolvic|librewolf)\/([\w\.]+)/i],[s,a],[/mobile vr; rv:([\w\.]+)\).+firefox/i],[a,[s,oe+" Reality"]],[/ekiohf.+(flow)\/([\w\.]+)/i,/(swiftfox)/i,/(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror)[\/ ]?([\w\.\+]+)/i,/(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,/(firefox)\/([\w\.]+)/i,/(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,/(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,/(links) \(([\w\.]+)/i],[s,[a,/_/g,"."]],[/(cobalt)\/([\w\.]+)/i],[s,[a,/master.|lts./,""]]],cpu:[[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i],[[k,"amd64"]],[/(ia32(?=;))/i],[[k,ce]],[/((?:i[346]|x)86)[;\)]/i],[[k,"ia32"]],[/\b(aarch64|arm(v?8e?l?|_?64))\b/i],[[k,"arm64"]],[/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i],[[k,"armhf"]],[/windows (ce|mobile); ppc;/i],[[k,"arm"]],[/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i],[[k,/ower/,y,ce]],[/(sun4\w)[;\)]/i],[[k,"sparc"]],[/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i],[[k,ce]]],device:[[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i],[o,[t,K],[i,c]],[/\b((?:s[cgp]h|gt|sm)-(?![lr])\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,/samsung[- ]((?!sm-[lr])[-\w]+)/i,/sec-(sgh\w+)/i],[o,[t,K],[i,r]],[/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i],[o,[t,H],[i,r]],[/\((ipad);[-\w\),; ]+apple/i,/applecoremedia\/[\w\.]+ \((ipad)/i,/\b(ipad)\d\d?,\d\d?[;\]].+ios/i],[o,[t,H],[i,c]],[/(macintosh);/i],[o,[t,H]],[/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],[o,[t,ne],[i,r]],[/(?:honor)([-\w ]+)[;\)]/i],[o,[t,"Honor"],[i,r]],[/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i],[o,[t,te],[i,c]],[/(?:huawei)([-\w ]+)[;\)]/i,/\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i],[o,[t,te],[i,r]],[/\b(poco[\w ]+|m2\d{3}j\d\d[a-z]{2})(?: bui|\))/i,/\b; (\w+) build\/hm\1/i,/\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,/\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,/oid[^\)]+; (m?[12][0-389][01]\w{3,6}[c-y])( bui|; wv|\))/i,/\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite|pro)?)(?: bui|\))/i],[[o,/_/g," "],[t,d],[i,r]],[/oid[^\)]+; (2\d{4}(283|rpbf)[cgl])( bui|\))/i,/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i],[[o,/_/g," "],[t,d],[i,c]],[/; (\w+) bui.+ oppo/i,/\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i],[o,[t,"OPPO"],[i,r]],[/\b(opd2\d{3}a?) bui/i],[o,[t,"OPPO"],[i,c]],[/vivo (\w+)(?: bui|\))/i,/\b(v[12]\d{3}\w?[at])(?: bui|;)/i],[o,[t,"Vivo"],[i,r]],[/\b(rmx[1-3]\d{3})(?: bui|;|\))/i],[o,[t,"Realme"],[i,r]],[/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,/\bmot(?:orola)?[- ](\w*)/i,/((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i],[o,[t,ae],[i,r]],[/\b(mz60\d|xoom[2 ]{0,2}) build\//i],[o,[t,ae],[i,c]],[/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i],[o,[t,Y],[i,c]],[/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,/\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,/\blg-?([\d\w]+) bui/i],[o,[t,Y],[i,r]],[/(ideatab[-\w ]+)/i,/lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i],[o,[t,"Lenovo"],[i,c]],[/(?:maemo|nokia).*(n900|lumia \d+)/i,/nokia[-_ ]?([-\w\.]*)/i],[[o,/_/g," "],[t,"Nokia"],[i,r]],[/(pixel c)\b/i],[o,[t,B],[i,c]],[/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],[o,[t,B],[i,r]],[/droid.+; (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i],[o,[t,re],[i,r]],[/sony tablet [ps]/i,/\b(?:sony)?sgp\w+(?: bui|\))/i],[[o,"Xperia Tablet"],[t,re],[i,c]],[/ (kb2005|in20[12]5|be20[12][59])\b/i,/(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i],[o,[t,"OnePlus"],[i,r]],[/(alexa)webm/i,/(kf[a-z]{2}wi|aeo(?!bc)\w\w)( bui|\))/i,/(kf[a-z]+)( bui|\)).+silk\//i],[o,[t,$],[i,c]],[/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],[[o,/(.+)/g,"Fire Phone $1"],[t,$],[i,r]],[/(playbook);[-\w\),; ]+(rim)/i],[o,t,[i,c]],[/\b((?:bb[a-f]|st[hv])100-\d)/i,/\(bb10; (\w+)/i],[o,[t,j],[i,r]],[/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i],[o,[t,he],[i,c]],[/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],[o,[t,he],[i,r]],[/(nexus 9)/i],[o,[t,"HTC"],[i,c]],[/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,/(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,/(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i],[t,[o,/_/g," "],[i,r]],[/droid [\w\.]+; ((?:8[14]9[16]|9(?:0(?:48|60|8[01])|1(?:3[27]|66)|2(?:6[69]|9[56])|466))[gqswx])\w*(\)| bui)/i],[o,[t,"TCL"],[i,c]],[/(itel) ((\w+))/i],[[t,ce],o,[i,xe,{tablet:["p10001l","w7001"],"*":"mobile"}]],[/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],[o,[t,"Acer"],[i,c]],[/droid.+; (m[1-5] note) bui/i,/\bmz-([-\w]{2,})/i],[o,[t,"Meizu"],[i,r]],[/; ((?:power )?armor(?:[\w ]{0,8}))(?: bui|\))/i],[o,[t,"Ulefone"],[i,r]],[/; (energy ?\w+)(?: bui|\))/i,/; energizer ([\w ]+)(?: bui|\))/i],[o,[t,"Energizer"],[i,r]],[/; cat (b35);/i,/; (b15q?|s22 flip|s48c|s62 pro)(?: bui|\))/i],[o,[t,"Cat"],[i,r]],[/((?:new )?andromax[\w- ]+)(?: bui|\))/i],[o,[t,"Smartfren"],[i,r]],[/droid.+; (a(?:015|06[35]|142p?))/i],[o,[t,"Nothing"],[i,r]],[/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron|infinix|tecno|micromax|advan)[-_ ]?([-\w]*)/i,/; (imo) ((?!tab)[\w ]+?)(?: bui|\))/i,/(hp) ([\w ]+\w)/i,/(asus)-?(\w+)/i,/(microsoft); (lumia[\w ]+)/i,/(lenovo)[-_ ]?([-\w]+)/i,/(jolla)/i,/(oppo) ?([\w ]+) bui/i],[t,o,[i,r]],[/(imo) (tab \w+)/i,/(kobo)\s(ereader|touch)/i,/(archos) (gamepad2?)/i,/(hp).+(touchpad(?!.+tablet)|tablet)/i,/(kindle)\/([\w\.]+)/i,/(nook)[\w ]+build\/(\w+)/i,/(dell) (strea[kpr\d ]*[\dko])/i,/(le[- ]+pan)[- ]+(\w{1,9}) bui/i,/(trinity)[- ]*(t\d{3}) bui/i,/(gigaset)[- ]+(q\w{1,9}) bui/i,/(vodafone) ([\w ]+)(?:\)| bui)/i],[t,o,[i,c]],[/(surface duo)/i],[o,[t,se],[i,c]],[/droid [\d\.]+; (fp\du?)(?: b|\))/i],[o,[t,"Fairphone"],[i,r]],[/(u304aa)/i],[o,[t,"AT&T"],[i,r]],[/\bsie-(\w*)/i],[o,[t,"Siemens"],[i,r]],[/\b(rct\w+) b/i],[o,[t,"RCA"],[i,c]],[/\b(venue[\d ]{2,7}) b/i],[o,[t,"Dell"],[i,c]],[/\b(q(?:mv|ta)\w+) b/i],[o,[t,"Verizon"],[i,c]],[/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i],[o,[t,"Barnes & Noble"],[i,c]],[/\b(tm\d{3}\w+) b/i],[o,[t,"NuVision"],[i,c]],[/\b(k88) b/i],[o,[t,"ZTE"],[i,c]],[/\b(nx\d{3}j) b/i],[o,[t,"ZTE"],[i,r]],[/\b(gen\d{3}) b.+49h/i],[o,[t,"Swiss"],[i,r]],[/\b(zur\d{3}) b/i],[o,[t,"Swiss"],[i,c]],[/\b((zeki)?tb.*\b) b/i],[o,[t,"Zeki"],[i,c]],[/\b([yr]\d{2}) b/i,/\b(dragon[- ]+touch |dt)(\w{5}) b/i],[[t,"Dragon Touch"],o,[i,c]],[/\b(ns-?\w{0,9}) b/i],[o,[t,"Insignia"],[i,c]],[/\b((nxa|next)-?\w{0,9}) b/i],[o,[t,"NextBook"],[i,c]],[/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i],[[t,"Voice"],o,[i,r]],[/\b(lvtel\-)?(v1[12]) b/i],[[t,"LvTel"],o,[i,r]],[/\b(ph-1) /i],[o,[t,"Essential"],[i,r]],[/\b(v(100md|700na|7011|917g).*\b) b/i],[o,[t,"Envizen"],[i,c]],[/\b(trio[-\w\. ]+) b/i],[o,[t,"MachSpeed"],[i,c]],[/\btu_(1491) b/i],[o,[t,"Rotor"],[i,c]],[/(shield[\w ]+) b/i],[o,[t,"Nvidia"],[i,c]],[/(sprint) (\w+)/i],[t,o,[i,r]],[/(kin\.[onetw]{3})/i],[[o,/\./g," "],[t,se],[i,r]],[/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],[o,[t,p],[i,c]],[/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],[o,[t,p],[i,r]],[/smart-tv.+(samsung)/i],[t,[i,v]],[/hbbtv.+maple;(\d+)/i],[[o,/^/,"SmartTV"],[t,K],[i,v]],[/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i],[[t,Y],[i,v]],[/(apple) ?tv/i],[t,[o,H+" TV"],[i,v]],[/crkey/i],[[o,ie+"cast"],[t,B],[i,v]],[/droid.+aft(\w+)( bui|\))/i],[o,[t,$],[i,v]],[/\(dtv[\);].+(aquos)/i,/(aquos-tv[\w ]+)\)/i],[o,[t,ne],[i,v]],[/(bravia[\w ]+)( bui|\))/i],[o,[t,re],[i,v]],[/(mitv-\w{5}) bui/i],[o,[t,d],[i,v]],[/Hbbtv.*(technisat) (.*);/i],[t,o,[i,v]],[/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,/hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i],[[t,Te],[o,Te],[i,v]],[/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],[[i,v]],[/(ouya)/i,/(nintendo) ([wids3utch]+)/i],[t,o,[i,D]],[/droid.+; (shield) bui/i],[o,[t,"Nvidia"],[i,D]],[/(playstation [345portablevi]+)/i],[o,[t,re],[i,D]],[/\b(xbox(?: one)?(?!; xbox))[\); ]/i],[o,[t,se],[i,D]],[/\b(sm-[lr]\d\d[05][fnuw]?s?)\b/i],[o,[t,K],[i,C]],[/((pebble))app/i],[t,o,[i,C]],[/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i],[o,[t,H],[i,C]],[/droid.+; (glass) \d/i],[o,[t,B],[i,C]],[/droid.+; (wt63?0{2,3})\)/i],[o,[t,p],[i,C]],[/droid.+; (glass) \d/i],[o,[t,B],[i,C]],[/(pico) (4|neo3(?: link|pro)?)/i],[t,o,[i,C]],[/; (quest( \d| pro)?)/i],[o,[t,z],[i,C]],[/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],[t,[i,we]],[/(aeobc)\b/i],[o,[t,$],[i,we]],[/droid .+?; ([^;]+?)(?: bui|; wv\)|\) applew).+? mobile safari/i],[o,[i,r]],[/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i],[o,[i,c]],[/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],[[i,c]],[/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i],[[i,r]],[/(android[-\w\. ]{0,9});.+buil/i],[o,[t,"Generic"]]],engine:[[/windows.+ edge\/([\w\.]+)/i],[a,[s,Se+"HTML"]],[/(arkweb)\/([\w\.]+)/i],[s,a],[/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],[a,[s,"Blink"]],[/(presto)\/([\w\.]+)/i,/(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna|servo)\/([\w\.]+)/i,/ekioh(flow)\/([\w\.]+)/i,/(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,/(icab)[\/ ]([23]\.[\d\.]+)/i,/\b(libweb)/i],[s,a],[/rv\:([\w\.]{1,9})\b.+(gecko)/i],[a,s]],os:[[/microsoft (windows) (vista|xp)/i],[s,a],[/(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i],[s,[a,xe,Re]],[/windows nt 6\.2; (arm)/i,/windows[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i,/(?:win(?=3|9|n)|win 9x )([nt\d\.]+)/i],[[a,xe,Re],[s,"Windows"]],[/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,/(?:ios;fbsv\/|iphone.+ios[\/ ])([\d\.]+)/i,/cfnetwork\/.+darwin/i],[[a,/_/g,"."],[s,"iOS"]],[/(mac os x) ?([\w\. ]*)/i,/(macintosh|mac_powerpc\b)(?!.+haiku)/i],[[s,le],[a,/_/g,"."]],[/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i],[a,s],[/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish|openharmony)[-\/ ]?([\w\.]*)/i,/(blackberry)\w*\/([\w\.]*)/i,/(tizen|kaios)[\/ ]([\w\.]+)/i,/\((series40);/i],[s,a],[/\(bb(10);/i],[a,[s,j]],[/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i],[a,[s,"Symbian"]],[/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i],[a,[s,oe+" OS"]],[/web0s;.+rt(tv)/i,/\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i],[a,[s,"webOS"]],[/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i],[a,[s,"watchOS"]],[/crkey\/([\d\.]+)/i],[a,[s,ie+"cast"]],[/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i],[[s,me],a],[/panasonic;(viera)/i,/(netrange)mmh/i,/(nettv)\/(\d+\.[\w\.]+)/i,/(nintendo|playstation) ([wids345portablevuch]+)/i,/(xbox); +xbox ([^\);]+)/i,/\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,/(mint)[\/\(\) ]?(\w*)/i,/(mageia|vectorlinux)[; ]/i,/([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,/(hurd|linux) ?([\w\.]*)/i,/(gnu) ?([\w\.]*)/i,/\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,/(haiku) (\w+)/i],[s,a],[/(sunos) ?([\w\.\d]*)/i],[[s,"Solaris"],a],[/((?:open)?solaris)[-\/ ]?([\w\.]*)/i,/(aix) ((\d)(?=\.|\)| )[\w\.])*/i,/\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,/(unix) ?([\w\.]*)/i],[s,a]]},I=function(u,b){if(typeof u===M&&(b=u,u=f),!(this instanceof I))return new I(u,b).getResult();var l=typeof h!==O&&h.navigator?h.navigator:f,g=u||(l&&l.userAgent?l.userAgent:y),U=l&&l.userAgentData?l.userAgentData:f,q=b?Je(ze,b):ze,w=l&&l.userAgent==g;return this.getBrowser=function(){var n={};return n[s]=f,n[a]=f,fe.call(n,g,q.browser),n[J]=$e(n[a]),w&&l&&l.brave&&typeof l.brave.isBrave==E&&(n[s]="Brave"),n},this.getCPU=function(){var n={};return n[k]=f,fe.call(n,g,q.cpu),n},this.getDevice=function(){var n={};return n[t]=f,n[o]=f,n[i]=f,fe.call(n,g,q.device),w&&!n[i]&&U&&U.mobile&&(n[i]=r),w&&n[o]=="Macintosh"&&l&&typeof l.standalone!==O&&l.maxTouchPoints&&l.maxTouchPoints>2&&(n[o]="iPad",n[i]=c),n},this.getEngine=function(){var n={};return n[s]=f,n[a]=f,fe.call(n,g,q.engine),n},this.getOS=function(){var n={};return n[s]=f,n[a]=f,fe.call(n,g,q.os),w&&!n[s]&&U&&U.platform&&U.platform!="Unknown"&&(n[s]=U.platform.replace(/chrome os/i,me).replace(/macos/i,le)),n},this.getResult=function(){return{ua:this.getUA(),browser:this.getBrowser(),engine:this.getEngine(),os:this.getOS(),device:this.getDevice(),cpu:this.getCPU()}},this.getUA=function(){return g},this.setUA=function(n){return g=typeof n===R&&n.length>F?Te(n,F):n,this},this.setUA(g),this};I.VERSION=N,I.BROWSER=ve([s,a,J]),I.CPU=ve([k]),I.DEVICE=ve([o,t,i,D,r,v,c,C,we]),I.ENGINE=I.OS=ve([s,a]),e.exports&&(m=e.exports=I),m.UAParser=I;var de=typeof h!==O&&(h.jQuery||h.Zepto);if(de&&!de.ua){var ye=new I;de.ua=ye.getResult(),de.ua.get=function(){return ye.getUA()},de.ua.set=function(u){ye.setUA(u);var b=ye.getResult();for(var l in b)de.ua[l]=b[l]}}})(typeof window=="object"?window:hi)})(_e,_e.exports);var Ei=_e.exports;const be=new Ei,x=be.getBrowser();be.getCPU();const _=be.getDevice(),Qe=be.getEngine(),Z=be.getOS(),Be=be.getUA(),V={Mobile:"mobile",Tablet:"tablet",SmartTv:"smarttv",Console:"console",Wearable:"wearable",Embedded:"embedded",Browser:void 0},S={Chrome:"Chrome",Firefox:"Firefox",Opera:"Opera",Yandex:"Yandex",Safari:"Safari",InternetExplorer:"Internet Explorer",Edge:"Edge",Chromium:"Chromium",Ie:"IE",MobileSafari:"Mobile Safari",EdgeChromium:"Edge Chromium",MIUI:"MIUI Browser",SamsungBrowser:"Samsung Browser"},ge={IOS:"iOS",Android:"Android",WindowsPhone:"Windows Phone",Windows:"Windows",MAC_OS:"Mac OS"},P=(e,m="none")=>e||m,Ie=()=>typeof window!==void 0&&(window.navigator||navigator)?window.navigator||navigator:!1,qe=e=>{const m=Ie();return m&&m.platform&&(m.platform.includes(e)||m.platform==="MacIntel"&&m.maxTouchPoints>1&&!window.MSStream)},Oi=({type:e})=>e===V.Mobile,_i=({type:e})=>e===V.Tablet,Mi=({type:e})=>e===V.Mobile||e===V.Tablet,Ci=({type:e})=>e===V.SmartTv,Xe=({type:e})=>e===V.Browser,Bi=({type:e})=>e===V.Wearable,Ii=({type:e})=>e===V.Console,qi=({type:e})=>e===V.Embedded,Ai=({vendor:e})=>P(e),Pi=({model:e})=>P(e),Ni=({type:e})=>P(e,"browser"),Ri=({name:e})=>e===ge.Android,zi=({name:e})=>e===ge.Windows,Ui=({name:e})=>e===ge.MAC_OS,Vi=({name:e})=>e===ge.WindowsPhone,Di=({name:e})=>e===ge.IOS,Fi=({version:e})=>P(e),Li=({name:e})=>P(e),Wi=({name:e})=>e===S.Chrome,Hi=({name:e})=>e===S.Firefox,ji=({name:e})=>e===S.Chromium,Ze=({name:e})=>e===S.Edge,Yi=({name:e})=>e===S.Yandex,Gi=({name:e})=>e===S.Safari||e===S.MobileSafari,Ki=({name:e})=>e===S.MobileSafari,Qi=({name:e})=>e===S.Opera,Xi=({name:e})=>e===S.InternetExplorer||e===S.Ie,Zi=({name:e})=>e===S.MIUI,Ji=({name:e})=>e===S.SamsungBrowser,$i=({version:e})=>P(e),eo=({major:e})=>P(e),io=({name:e})=>P(e),oo=({name:e})=>P(e),to=({version:e})=>P(e),so=()=>{const e=Ie(),m=e&&e.userAgent&&e.userAgent.toLowerCase();return m==="string"?/electron/.test(m):!1},Ae=e=>typeof e=="string"&&e.includes("Edg/"),pe=()=>qe("iPad"),ao=()=>qe("iPhone"),no=()=>qe("iPod"),ro=()=>{const e=Ie();return e&&(/iPad|iPhone|iPod/.test(e.platform)||e.platform==="MacIntel"&&e.maxTouchPoints>1)&&!window.MSStream},lo=Ci(_),co=Ii(_),uo=Bi(_),bo=qi(_),wo=Ki(x)||pe(),mo=ji(x),fo=Mi(_)||pe(),go=Oi(_),po=_i(_)||pe(),ho=Xe(_),vo=Xe(_),xo=Ri(Z),yo=Vi(Z),ko=Di(Z)||pe(),So=Wi(x),To=Hi(x),Eo=Gi(x),Oo=Qi(x),_o=Xi(x),Mo=Fi(Z),Co=Li(Z),Bo=$i(x),Io=eo(x),qo=io(x),Ao=Ai(_),Po=Pi(_),No=oo(Qe),Ro=to(Qe),zo=Ze(x)||Ae(Be),Uo=Yi(x),Vo=Ni(_),Do=ro(),Fo=pe(),Lo=ao(),Wo=no(),Ho=so(),jo=Ae(Be),Yo=Ze(x)&&!Ae(Be),Go=zi(Z),Ko=Ui(Z),Qo=Zi(x),Xo=Ji(x);var He=Object.freeze({__proto__:null,isSmartTV:lo,isConsole:co,isWearable:uo,isEmbedded:bo,isMobileSafari:wo,isChromium:mo,isMobile:fo,isMobileOnly:go,isTablet:po,isBrowser:ho,isDesktop:vo,isAndroid:xo,isWinPhone:yo,isIOS:ko,isChrome:So,isFirefox:To,isSafari:Eo,isOpera:Oo,isIE:_o,osVersion:Mo,osName:Co,fullBrowserVersion:Bo,browserVersion:Io,browserName:qo,mobileVendor:Ao,mobileModel:Po,engineName:No,engineVersion:Ro,isEdge:zo,isYandex:Uo,deviceType:Vo,isIOS13:Do,isIPad13:Fo,isIPhone13:Lo,isIPod13:Wo,isElectron:Ho,isEdgeChromium:jo,isLegacyEdge:Yo,isWindows:Go,isMacOs:Ko,isMIUI:Qo,isSamsungBrowser:Xo});function Zo(e,m){const h=e.substring(2);return bi({name:`${h}View`,props:{tagName:{type:String,default:"div"}},setup(f,N){return()=>{var T,E;const y=(E=(T=N.slots).default)==null?void 0:E.call(T);return m?W(f.tagName,null,{default:()=>y}):null}}})}for(const e in He)e.startsWith("is")&&Zo(e,He[e]);export{et as Q,So as a,it as b,ot as c,xo as i};