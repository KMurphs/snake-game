(this["webpackJsonpsnake-game"]=this["webpackJsonpsnake-game"]||[]).push([[0],{33:function(e,t,n){},34:function(e,t,n){},35:function(e,t,n){},36:function(e,t,n){},37:function(e,t,n){},38:function(e,t,n){},39:function(e,t,n){},45:function(e,t,n){"use strict";n.r(t);var r=n(0),c=n(1),s=n.n(c),a=n(15),o=n.n(a),i=(n(33),n(3)),l=n(9),u=n(6),j=(n(34),n(26)),d=n(4),f=(n(35),function(e){var t=e.value,n=e.setValue,c=e.label,s=e.type,a=e.fontawesomeClass,o=e.extraClasses;return Object(r.jsxs)("div",{className:"input-with-moving-label ".concat(o),children:[Object(r.jsx)("input",{id:"input-1",type:s,required:!0,value:t,onChange:function(e){return n(e.target.value)}}),Object(r.jsx)("i",{className:"".concat(a," input-with-moving-label__icon")}),Object(r.jsx)("label",{htmlFor:"input-1",className:"moving-label",children:c})]})});f.defaultProps={fontawesomeClass:"hidden",extraClasses:""};var b=function(e,t){return function(n){return Object(r.jsx)(e,Object(i.a)({type:t},n))}},m=function(e){return b(f,"text")(e)};function x(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"animating",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:300,n=arguments.length>2?arguments[2]:void 0,r=function(r,c){n&&n(c);var s=r.currentTarget;!s.classList.contains(e)&&s.classList.add(e),setTimeout((function(){s.classList.remove(e)}),t)};return r}n(36);function h(e){var t=e.children,n=e.show,c=e.onClose,s=e.containerExtraClasses,a=x("animating",300,c);return Object(r.jsx)("div",{className:"modal__outer-container fixed left-0 right-0 top-0 bottom-0 bg-gray-800 flex items-center justify-center overflow-hidden container-frozen ".concat(n?"modal--zoom-in--visible":"modal--zoom-in--invisible"),children:Object(r.jsx)("div",{className:"modal__inner-container w-min max-w-11/12 bg-gray-600 p-2 rounded-sm relative ".concat(s),children:Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("button",{onClick:a,className:"modal__close-btn bg-inherit inline-flex justify-center items-center w-8 h-8 rounded-full absolute -top-3 -right-3 focus:outline-none",children:Object(r.jsx)("i",{className:"fas fa-times","aria-hidden":"true"})}),t]})})})}var O;n(37);!function(e){e[e.UP=1]="UP",e[e.DOWN=2]="DOWN",e[e.LEFT=3]="LEFT",e[e.RIGHT=4]="RIGHT"}(O||(O={}));var v=function(e,t){return t===O.UP?{x:e.x,y:e.y-1}:t===O.DOWN?{x:e.x,y:e.y+1}:t===O.LEFT?{x:e.x-1,y:e.y}:{x:e.x+1,y:e.y}},g=function(e,t){var n={x:Math.floor(e/2),y:Math.floor(t/2)};return{body:Array(3).fill(0).reduce((function(e){return[].concat(Object(l.a)(e),[v(e[e.length-1],O.LEFT)])}),[n]),direction:O.RIGHT}},p=function(e,t){Object(c.useLayoutEffect)((function(){!e&&t(1,1),e&&t(e.clientWidth,e.clientHeight)}),[e,t])},y=function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]&&arguments[3];e&&t.forEach((function(t){var c=e.querySelector(".grid-item.row-".concat(t.y,".col-").concat(t.x));r&&!(null===c||void 0===c?void 0:c.classList.contains(n))&&(null===c||void 0===c||c.classList.add(n)),!r&&(null===c||void 0===c||c.classList.remove(n))}))},S=function e(t){return(0===Math.floor(t/60)?"":e(Math.round(t/60))+":")+function(e,t){var n=Array(t).fill("0").join("")+parseInt(e+"");return n.substr(n.length-t,t)}(t%60,2)},N=function(e,t){return{x:Math.floor(Math.random()*(t-1)),y:Math.floor(Math.random()*(e-1))}},w=function(e,t){return t.reduce((function(t,n){return t||E(n,e)}),!1)},E=function(e,t){return e.x===t.x&&e.y===t.y},T=function e(t,n,r){return n<r?[n].concat(Object(l.a)(e(t,n+t,r))):[]},L=function(e,t){return Math.max(Math.floor((e-t)/2),0)},C=function(e,t,n){return n>=t?e:n+1};function k(){var e=Object(c.useState)({cols:1,rows:1}),t=Object(u.a)(e,2),n=t[0],s=t[1],a=n.cols,o=n.rows,i=Array(o*a).fill(0).map((function(e,t){return{row:Math.floor(t/a),col:t%a,index:t}})),j=Object(c.useRef)(null),d=Object(c.useCallback)((function(e,t){return s({cols:Math.floor(e/20),rows:Math.floor(t/20)})}),[]);p(j.current,d);var f=function(e,t,n,r){var c=function(e,r){return r>=L(t,n)&&r<t-L(t,n)},s=L(e,r),a=Array(t).fill(0).map((function(e,n){return t*s+n})).filter(c),o=Array(t).fill(0).map((function(e,n){return t*Math.floor(s+.5*r)+n})).filter(c),i=Array(t).fill(0).map((function(e,n){return t*(s+r)+n})).filter(c),u=T(t,a[0],o[0]),j=T(t,o[o.length-1],i[i.length-1]),d=i[0]-t,f=a[a.length-1]+t,b=new Set([d].concat(Object(l.a)(i),Object(l.a)(j.reverse()),Object(l.a)(o.reverse()),Object(l.a)(u.reverse()),Object(l.a)(a),[f]));return Array.from(b).reverse()}(o,a,6,10);return Object(c.useEffect)((function(){var e=0,t=f.length,n=setInterval((function(){for(var n,r=0,c=(e=C(0,f.length-1,e))-1;r<f.length-1;){var s;r++,c=C(0,f.length-1,c);var a=null===(s=j.current)||void 0===s?void 0:s.querySelector(".grid-item.idx-".concat(f[c]));a&&(a.classList.remove("logo-snake"),r<t&&a.classList.add("logo-snake"),r<t&&(a.style.opacity="".concat((n=0)+r*(1-n)/t)))}}),100);return function(){return clearInterval(n)}})),Object(r.jsx)("div",{className:"logo-inner-container",ref:j,children:i.map((function(e,t){return Object(r.jsx)("div",{className:"grid-item idx-".concat(e.index," row-").concat(e.row," col-").concat(e.col)},t)}))})}var R=function(e){return e&&""!==e&&null!==e&&void 0!==e};function I(e){var t=e.onLogin,n=e.getUserByName,s=e.addUser,a=Object(c.useState)(!1),o=Object(u.a)(a,2),i=o[0],l=o[1],j=Object(c.useState)(""),d=Object(u.a)(j,2),f=d[0],b=d[1],x=Object(c.useState)(!1),O=Object(u.a)(x,2),v=O[0],g=O[1];return Object(r.jsxs)("section",{id:"login",className:"flex flex-col w-full height-100vh p-6 m-auto flex-wrap justify-center max-w-lg md:max-w-screen-xl",children:[Object(r.jsx)("header",{className:"logo-container flex-auto md:flex-full md:w-5/12 md:mr-10 lg:mr-20 lg:flex lg:items-center",children:Object(r.jsx)(k,{})}),Object(r.jsxs)("main",{className:"main-text pt-8 flex-initial md:w-5/12 md:max-w-sm md:mx-4 lg:mr-auto lg:max-w-screen-lg",children:[Object(r.jsx)("h1",{className:"text-3xl md:text-4xl lg:text-5xl pb-2 md:pb-8 text-gray-600 ",children:"Snake Game"}),Object(r.jsxs)("h2",{className:"text-gray-500 md:text-xl lg:text-2xl",children:["A most addictive game. ",Object(r.jsx)("br",{}),"Enter username to start playing."]})]}),Object(r.jsxs)("footer",{className:"form-container mt-4 flex-initial md:mt-20 md:max-w-sm md:mx-4",children:[Object(r.jsx)(m,{value:f,setValue:function(e){return b(e+"")},label:"Enter Username",fontawesomeClass:"fas fa-user",extraClasses:v&&!R(f)?"invalid":""}),Object(r.jsx)("button",{className:"btn w-full mt-16",onClick:function(){return function(e){if(g(!0),R(e)){var r=n(e);r&&t(r),!r&&l(!0)}}(f)},children:"Start"})]}),Object(r.jsx)(h,{show:i,onClose:function(){return l(!1)},containerExtraClasses:"new-user-container",children:Object(r.jsx)(D,{name:f,onResponse:function(e){return function(e,n){R(e)&&(n&&t(s(e)),!n&&b(""),l(!1))}(f,e)}})})]})}function D(e){var t=e.onResponse,n=e.name;return Object(r.jsxs)("div",{className:"new-user p-4 rounded-lg",children:[Object(r.jsxs)("div",{children:[Object(r.jsx)("h1",{className:"text-lg font-bold mb-8",children:"New User"}),Object(r.jsxs)("p",{children:[' We could not find user "',Object(r.jsx)("strong",{children:n}),'" in our records.',Object(r.jsx)("br",{})]}),Object(r.jsxs)("p",{children:[' Would you like to register "',Object(r.jsx)("strong",{children:n}),'" as a new user?',Object(r.jsx)("br",{})]})]}),Object(r.jsxs)("div",{className:"flex color-main justify-between flex-wrap ",children:[Object(r.jsx)("button",{onClick:function(){return t(!1)},className:"btn btn-secondary p-4 mt-8 mx-2",children:"No, Return"}),Object(r.jsx)("button",{onClick:function(){return t(!0)},className:"btn mt-8 mx-2",children:"Yes, Register"})]})]})}n(38);function P(e){var t=e.onChange,n=e.state;return Object(r.jsxs)("div",{className:"hamburger-menu-container",children:[Object(r.jsx)("input",{type:"checkbox",id:"hamburger-menu-checkbox",checked:n,onChange:function(e){return t(e.target.checked)}}),Object(r.jsxs)("label",{htmlFor:"hamburger-menu-checkbox",className:"hamburger-menu",children:[Object(r.jsx)("span",{}),Object(r.jsx)("span",{}),Object(r.jsx)("span",{})]})]})}var _=n.p+"static/media/snake-game-logo-sm.1ad9620f.gif";function G(e){var t=e.grabNextDirection,n=e.isPaused,s=e.hasLost,a=e.hasWon,o=e.notifyGameFailure,i=e.notifyScorePoint,j=e.user,d=e.onTimerTick,f=Object(c.useState)({cols:1,rows:1}),b=Object(u.a)(f,2),m=b[0],x=b[1],h=m.cols,S=m.rows,T=Array(S*h).fill(0).map((function(e,t){return{row:Math.floor(t/h),col:t%h,index:t}})),L=Object(c.useRef)(null),C=Object(c.useCallback)((function(e,t){return x({cols:Math.floor(e/20),rows:Math.floor(t/20)})}),[]);p(L.current,C);var k="is-of-body",R="is-crumb",I=Object(c.useRef)({snake:g(S,h),crumb:null});Object(c.useEffect)((function(){return I.current.snake=g(S,h),y(L.current,I.current.snake.body,k,!0),function(){return y(L.current,I.current.snake.body,k,!1)}}),[S,h,j.current.id]);var D=function(){return{getNextDirection:t,getPausedState:function(){return n},getLostState:function(){return s},getWonState:function(){return a},notifyGameFailure:o,notifyCrumbAssimilation:i,getLevelSpeed:function(){return 500-50*j.current.level},onTimerTick:d}},P=Object(c.useRef)(D());return Object(c.useEffect)((function(){P.current=D()}),[t,n,o,j.current.id]),Object(c.useEffect)((function(){var e=setInterval((function(){var e,t;if(!P.current.getPausedState()&&!P.current.getLostState()&&!P.current.getWonState()){if(P.current.onTimerTick(),null===I.current.crumb){var n,r=function(e,t,n){for(var r=n[0];w(r,n);)r=N(e,t);return r}(S,h,I.current.snake.body);I.current.crumb=r;var c=null===(n=L.current)||void 0===n?void 0:n.querySelector(".grid-item.row-".concat(r.y,".col-").concat(r.x));null===c||void 0===c||c.classList.add(R)}var s=I.current.crumb,a=P.current.getNextDirection();(function(e,t){var n=[O.LEFT,O.RIGHT],r=[O.UP,O.DOWN];return(!n.includes(e)||!n.includes(t))&&(!r.includes(e)||!r.includes(t))})(a||I.current.snake.direction,I.current.snake.direction)&&(I.current.snake.direction=a||I.current.snake.direction);var o=function(e,t,n){var r=v(e[0],t),c=E(r,n),s=e.slice(0,e.length-(c?0:1)),a=c?[]:[e[e.length-1]];return[[r].concat(Object(l.a)(s)),a]}(I.current.snake.body,I.current.snake.direction,s),i=Object(u.a)(o,2),j=i[0],d=i[1];I.current.snake.body=j;var f=null===(e=L.current)||void 0===e?void 0:e.querySelector(".grid-item.row-".concat(j[0].y,".col-").concat(j[0].x)),b=!f||f.classList.contains(k)||j[0].x<0||j[0].x>=h||j[0].y<0||j[0].y>=S;if(b&&P.current.notifyGameFailure(),!b&&(null===f||void 0===f||f.classList.add(k)),E(j[0],I.current.crumb)){var m,x=I.current.crumb;I.current.crumb=null;var g=null===(m=L.current)||void 0===m?void 0:m.querySelector(".grid-item.row-".concat(x.y,".col-").concat(x.x));return null===g||void 0===g||g.classList.remove(R),void P.current.notifyCrumbAssimilation()}if(0!==d.length){var p=null===(t=L.current)||void 0===t?void 0:t.querySelector(".grid-item.row-".concat(d[0].y,".col-").concat(d[0].x));null===p||void 0===p||p.classList.remove(k)}}}),P.current.getLevelSpeed());return function(){return clearInterval(e)}}),[h,S,j.current.id]),Object(r.jsx)("div",{className:"logo-inner-container",ref:L,children:T.map((function(e,t){return Object(r.jsx)("div",{className:"grid-item idx-".concat(e.index," row-").concat(e.row," col-").concat(e.col)},t)}))})}n(39);function A(e){var t=e.onKeyPress,n=e.isPaused,c=x("animating",500,t);return Object(r.jsxs)("div",{className:"game-keypad grid mx-auto w-full",children:[Object(r.jsx)("div",{className:"flex justify-center items-center",children:Object(r.jsx)("button",{className:"game-control rounded-full w-14 h-14 bg-transparent flex justify-center items-center",onClick:function(e){return c(e,"RESET")},children:Object(r.jsx)("i",{className:"fas fa-reply"})})}),Object(r.jsx)("div",{className:"flex justify-center items-center"}),Object(r.jsx)("div",{className:"flex justify-center items-center",children:Object(r.jsx)("button",{className:"game-control rounded-full w-14 h-14 bg-transparent flex justify-center items-center",onClick:function(e){return c(e,"PAUSE")},children:Object(r.jsx)("i",{className:"fas fa-".concat(n?"play":"pause")})})}),Object(r.jsx)("div",{className:"flex justify-center items-center"}),Object(r.jsx)("div",{className:"flex justify-center items-center",children:Object(r.jsx)("button",{className:"game-control rounded-full w-14 h-14 bg-transparent flex justify-center items-center",onClick:function(e){return c(e,"DIRECTION_UP")},children:Object(r.jsx)("i",{className:"fas fa-play transform -rotate-90"})})}),Object(r.jsx)("div",{className:"flex justify-center items-center"}),Object(r.jsx)("div",{className:"flex justify-center items-center",children:Object(r.jsx)("button",{className:"game-control rounded-full w-14 h-14 bg-transparent flex justify-center items-center",onClick:function(e){return c(e,"DIRECTION_LEFT")},children:Object(r.jsx)("i",{className:"fas fa-play transform rotate-180"})})}),Object(r.jsx)("div",{className:"flex justify-center items-center"}),Object(r.jsx)("div",{className:"flex justify-center items-center",children:Object(r.jsx)("button",{className:"game-control rounded-full w-14 h-14 bg-transparent flex justify-center items-center",onClick:function(e){return c(e,"DIRECTION_RIGHT")},children:Object(r.jsx)("i",{className:"fas fa-play "})})}),Object(r.jsx)("div",{className:"flex justify-center items-center"}),Object(r.jsx)("div",{className:"flex justify-center items-center",children:Object(r.jsx)("button",{className:"game-control rounded-full w-14 h-14 bg-transparent flex justify-center items-center",onClick:function(e){return c(e,"DIRECTION_DOWN")},children:Object(r.jsx)("i",{className:"fas fa-play transform rotate-90"})})}),Object(r.jsx)("div",{className:"flex justify-center items-center"})]})}function U(e){var t=e.user,n=e.notifyGameFailure,s=e.onChangePauseState,a=e.onResetGame,o=e.onNextDirection,i=e.DetailsFC,l=e.gameTimeScore,j=e.isPaused,d=e.hasLost,f=e.hasWon,b=e.grabNextDirection,m=e.onResultFeedback,x=e.notifyScorePoint,v=(e.level,e.onTimerTick),g=Object(c.useState)(!1),p=Object(u.a)(g,2),y=p[0],N=p[1],w=Object(c.useState)(!1),E=Object(u.a)(w,2),T=E[0],L=E[1],C=Object(c.useRef)(null),k=function(e){return" "===e||"PAUSE"===e?s():"RESET"===e||"r"===e?a():"DIRECTION_UP"===e?o(O.UP):"DIRECTION_DOWN"===e?o(O.DOWN):"DIRECTION_LEFT"===e?o(O.LEFT):"DIRECTION_RIGHT"===e?o(O.RIGHT):"ArrowUp"===e?o(O.UP):"ArrowDown"===e?o(O.DOWN):"ArrowLeft"===e?o(O.LEFT):"ArrowRight"===e?o(O.RIGHT):void 0},R=function(){var e;L(!1),m(),null===(e=C.current)||void 0===e||e.focus()},I=d?"has-lost":f?"has-won":"";return Object(c.useEffect)((function(){var e;d&&L(!0),f&&L(!0),null===(e=C.current)||void 0===e||e.focus()}),[d,f]),Object(r.jsxs)("section",{id:"game",ref:C,className:"flex flex-col w-full height-100vh px-6 py-2 m-auto ".concat(I),tabIndex:0,onKeyDown:function(e){return k(e.key)},children:[Object(r.jsxs)("header",{className:"flex justify-between items-center h-8 mb-6 relative",children:[Object(r.jsx)("img",{src:_,alt:"Gif of a snake drawing a S",className:"h-6"}),Object(r.jsxs)("div",{className:"",children:[Object(r.jsx)("span",{className:"text-lg",children:t.name}),Object(r.jsx)("span",{className:"ml-4",children:S(l)}),Object(r.jsx)("span",{className:"text-gray-400 ml-4",children:t.current.pointScore})]}),Object(r.jsx)(P,{state:y,onChange:N})]}),Object(r.jsxs)("main",{className:"flex-auto",children:[Object(r.jsx)(G,{grabNextDirection:b,isPaused:j,user:t,hasLost:d,hasWon:f,notifyGameFailure:n,onTimerTick:v,notifyScorePoint:x}),Object(r.jsx)("div",{className:"side-pane fixed top-0 bottom-0 right-0 w-full p-4 pt-12 z-10 container-frozen ".concat(y?"":"-right-full"),children:Object(r.jsx)(i,{})})]}),Object(r.jsx)("footer",{className:"game-footer -rotate-90mx-auto w-full mt-6",children:Object(r.jsx)(A,{onKeyPress:k,isPaused:j})}),Object(r.jsx)(h,{show:T,onClose:R,containerExtraClasses:"new-user-container",children:Object(r.jsx)(M,{hasWon:f,hasLost:d,onResponse:R,user:t})})]})}function M(e){var t=e.hasWon,n=e.hasLost,c=e.onResponse,s=e.user;return Object(r.jsxs)("div",{className:"new-user p-4 rounded-lg",children:[Object(r.jsxs)("div",{children:[t&&Object(r.jsxs)(r.Fragment,{children:[Object(r.jsxs)("h1",{className:"text-lg font-bold mb-8",children:["Congratulations ",Object(r.jsx)("strong",{children:s.name})]}),Object(r.jsx)("p",{children:" You have won at this level of difficulty. Congrats again!!"}),Object(r.jsxs)("p",{children:[" Score: ",s.current.pointScore,Object(r.jsx)("br",{})]}),Object(r.jsxs)("p",{children:[" Time: ",S(s.current.timeScore),Object(r.jsx)("br",{})]}),Object(r.jsxs)("p",{children:[" Difficulty Level: Level ",s.current.level+1,Object(r.jsx)("br",{}),Object(r.jsx)("br",{}),Object(r.jsx)("br",{})]}),Object(r.jsx)("p",{children:" Do you want to move to next level?"})]}),n&&Object(r.jsxs)(r.Fragment,{children:[Object(r.jsxs)("h1",{className:"text-lg font-bold mb-8",children:["Sorry ",Object(r.jsx)("strong",{children:s.name})]}),Object(r.jsx)("p",{children:" It seems that the current difficulty level was too great."}),Object(r.jsxs)("p",{children:[" Score: ",s.current.pointScore,Object(r.jsx)("br",{})]}),Object(r.jsxs)("p",{children:[" Time: ",S(s.current.timeScore),Object(r.jsx)("br",{})]}),Object(r.jsxs)("p",{children:[" Difficulty Level: Level ",s.current.level+1,Object(r.jsx)("br",{}),Object(r.jsx)("br",{}),Object(r.jsx)("br",{})]}),Object(r.jsx)("p",{children:" Do you want to restart?"})]})]}),Object(r.jsxs)("div",{className:"flex color-main justify-between flex-wrap ",children:[t&&Object(r.jsx)("button",{onClick:function(){return c()},className:"btn mt-8 mx-2",children:"Yes! On to next Level"}),n&&Object(r.jsx)("button",{onClick:function(){return c()},className:"btn mt-8 mx-2",children:"Let's Restart"})]})]})}var F=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"/",t=Object(c.useMemo)((function(){var t=window.location.pathname.split("/")[1];return"/".concat(t&&""!==t?t:e).replaceAll("//","/")}),[1]);return t},W=function(e,t){return e.level!==t.level?e.level>t.level?e:t:e.timeScore*e.pointScore<t.timeScore*t.pointScore?t:e};var H=function(e){var t=e.isLoggedIn,n=e.version,s=e.user,a=e.gameTimeScore,o=e.nextSnakeDirection,f=e.isPaused,b=e.hasLost,m=e.hasWon,x=e.level,h=e.onUserLogin,O=e.onLogout,v=e.onResetGame,g=e.onChangePauseState,p=e.onNextDirection,y=e.getNewUser,S=e.onResultFeedback,N=e.onLostGame,w=e.onScorePoint,E=e.onTimerTick,T=function(){return o&&p(null),o};Object(c.useEffect)((function(){console.log("Current App version: ".concat(n))}),[n]),function(e){var t=e||document.querySelector(":root"),n=function(e){null===e||void 0===e||e.style.setProperty("--vh",window.innerHeight/100+"px")};n(t),Object(c.useEffect)((function(){return window.addEventListener("resize",(function(){return n(t)})),function(){window.removeEventListener("resize",(function(){return n(t)}))}}))}(),function(e,t){var n=F(e||"/"),r=function(){(!t||t())&&window.history.pushState(n,n,"".concat(n))};Object(c.useEffect)((function(){return window.addEventListener("load",r),function(){window.removeEventListener("load",r)}}))}("snake-game",(function(){return!(null===/(localhost|127.0.0.1|127.0.0.0|0.0.0.0)/.exec(window.location.origin))}));var L=F("snake-game"),C=Object(c.useState)([]),k=Object(u.a)(C,2),R=k[0],D=k[1];Object(c.useEffect)((function(){R.length>0&&function(e,t){var n="object"!==typeof t?t+"":JSON.stringify(t);localStorage.setItem(e,n)}("users",R);var e=function(e,t){var n=localStorage.getItem(e);if(!n)return t;if("string"===typeof t)return n;if("number"===typeof t)return parseFloat(n);var r=t;try{r=JSON.parse(n)}catch(c){}return r}("users",[]);R.length!==e.length&&D(e)}),[R]);var P=function(e){return R.find((function(t){return t.name.toLowerCase()===e.toLowerCase()}))},_=function(){return R.sort((function(e,t){return n=e.best,r=t.best,W(n,r)===n?1:-1;var n,r}))[0]};Object(c.useEffect)((function(){var e,t;e=s.name,t=s.current,D((function(n){return n.map((function(n){return n.name===e&&(n.last=Object(i.a)({},t)),n.name===e&&(n.best=W(n.best,n.last)),n}))}))}),[b,m]);var G=function(){return Object(r.jsx)(q,{currentUser:P(s.name),bestUser:_(),onLogout:O})};return Object(r.jsx)(j.a,{basename:"".concat(L),children:Object(r.jsxs)(d.d,{children:[Object(r.jsx)(d.b,{path:"/login",children:t?Object(r.jsx)(d.a,{to:"/play"}):Object(r.jsx)(I,{onLogin:h,getUserByName:P,addUser:function(e){var t=y(e);return D((function(e){return[].concat(Object(l.a)(e),[t])})),t}})}),Object(r.jsx)(d.b,{path:"/play",render:function(e){e.history;return t?Object(r.jsx)(U,{user:s,nextSnakeDirection:o,onResetGame:v,onChangePauseState:g,onNextDirection:p,grabNextDirection:T,notifyGameFailure:N,notifyScorePoint:w,onTimerTick:E,onResultFeedback:S,isPaused:f,hasLost:b,DetailsFC:G,hasWon:m,level:x,gameTimeScore:a}):Object(r.jsx)(d.a,{to:"/login"})}}),Object(r.jsx)(d.b,{path:"/",children:Object(r.jsx)(d.a,{to:"/play"})}),Object(r.jsx)(d.b,{path:"/*",children:Object(r.jsx)(d.a,{to:"/login"})})]})})};function q(e){var t=e.currentUser,n=e.bestUser,c=e.onLogout;return Object(r.jsxs)("div",{id:"details",className:" p-4 pt-8 rounded-lg h-full flex flex-col justify-between items-stretch",children:[Object(r.jsxs)("div",{children:[Object(r.jsxs)("h1",{className:"text-xl pb-2",children:[Object(r.jsx)("span",{children:"Current: "}),Object(r.jsx)("strong",{children:t?t.name:"None"})]}),t&&Object(r.jsxs)("ul",{children:[Object(r.jsxs)("li",{children:[Object(r.jsx)("span",{children:"Score: "}),null===t||void 0===t?void 0:t.last.pointScore," points"]}),Object(r.jsxs)("li",{children:[Object(r.jsx)("span",{children:"Time: "}),S(null===t||void 0===t?void 0:t.last.timeScore)," sec"]}),Object(r.jsxs)("li",{children:[Object(r.jsx)("span",{children:"Level: "}),"Level ",null===t||void 0===t?void 0:t.last.level]})]})]}),Object(r.jsxs)("div",{children:[Object(r.jsxs)("h1",{className:"text-xl pb-2",children:[Object(r.jsx)("span",{children:"Best Overall: "}),Object(r.jsx)("strong",{children:n?n.name:"None"})]}),n&&Object(r.jsxs)("ul",{children:[Object(r.jsxs)("li",{children:[Object(r.jsx)("span",{children:"Score: "}),null===n||void 0===n?void 0:n.best.pointScore," points"]}),Object(r.jsxs)("li",{children:[Object(r.jsx)("span",{children:"Time: "}),S(null===n||void 0===n?void 0:n.best.timeScore)," sec"]}),Object(r.jsxs)("li",{children:[Object(r.jsx)("span",{children:"Level: "}),"Level ",null===n||void 0===n?void 0:n.best.level]})]})]}),Object(r.jsx)("div",{className:"flex color-main justify-between flex-wrap ",children:Object(r.jsx)("button",{onClick:c,className:"btn mt-8 mx-2 w-full bg-red-600",children:"Logout"})})]})}var z,B=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,46)).then((function(t){var n=t.getCLS,r=t.getFID,c=t.getFCP,s=t.getLCP,a=t.getTTFB;n(e),r(e),c(e),s(e),a(e)}))},J=n(14),V=n(24),K=n(18),Y=function(e,t,n,r){return{name:e.name,current:{pointScore:e.current.pointScore+(t||0),timeScore:e.current.timeScore+(n||0),level:e.current.level+(r||0),id:e.current.id}}},X=function(e){return Object(i.a)(Object(i.a)(Object(i.a)(Object(i.a)({},e),{isLoggedIn:""!==e.user.name}),{gameTimeScore:e.user.current.timeScore+e.chronometerCurrent/1e3}),{getNewUser:te})},Q=function(e){return{onUserLogin:function(t){return e({type:"LOGIN_USER",payload:t})},onLogout:function(t){return e({type:"LOGOUT_USER",payload:t})},onNextDirection:function(t){return e({type:"CHANGE_DIRECTION",payload:t})},onChangePauseState:function(){return e({type:"PAUSE_RESUME_GAME",payload:null})},onResetGame:function(){return e({type:"RESET_GAME",payload:null})},onLostGame:function(){return e({type:"LOSE_GAME",payload:null})},onScorePoint:function(){return e({type:"SCORE_POINT",payload:null})},onTimerTick:function(){return e({type:"UPDATE_TIME_SCORE",payload:null})},onResultFeedback:function(){return e({type:"RESTART_GAME",payload:null})}}},Z=function(e){return e.substr(0,1).toUpperCase()+e.substr(1).toLowerCase()},$=function(){return{pointScore:0,timeScore:0,level:0,id:(new Date).getTime()}},ee=function(e){return{name:Z(e||""),current:$()}},te=function(e){return{name:Z(e||""),last:$(),best:$()}},ne=function(){return{version:"1.0",user:ee(),nextSnakeDirection:null,isPaused:!0,hasLost:!1,hasWon:!1,maximumScore:3,chronometerStart:null,chronometerCurrent:0,levelScore:0}},re=Object(K.b)((function e(t,n){if(!t)return t;switch(n.type){case"LOGIN_USER":return n.payload&&(t.user=ee()),n.payload&&(t.user.name=n.payload.name),Object(i.a)({},t);case"LOGOUT_USER":return n.payload&&(t.user=ee()),n.payload&&(t.user.name=""),Object(i.a)({},t);case"CHANGE_DIRECTION":return n.payload&&(t.nextSnakeDirection=n.payload),Object(i.a)({},t);case"PAUSE_RESUME_GAME":var r=Object(i.a)({},t),c=r.user,s=Object(J.a)(r,["user"]),a=Y(c,0,s.chronometerCurrent/1e3);return s.isPaused&&(s.chronometerStart=(new Date).getTime()),s.isPaused&&(s.chronometerCurrent=0),!s.isPaused&&(s.chronometerStart=null),!s.isPaused&&(s.chronometerCurrent=0),s.isPaused=!s.isPaused,Object(i.a)({user:a},s);case"RESET_GAME":var o=ne();return o.user.name=t.user.name,o.user.current={pointScore:0,timeScore:0,level:0,id:(new Date).getTime()},o;case"NEXT_LEVEL":var l=e(t,{type:"RESET_GAME",payload:null});return l?(l.user.name=t.user.name,l.user.current={pointScore:t.user.current.pointScore,timeScore:t.user.current.timeScore,level:t.user.current.level+1,id:(new Date).getTime()},Object(i.a)({},l)):l;case"RESTART_GAME":return t.hasWon?e(t,{type:"NEXT_LEVEL",payload:null}):e(t,{type:"RESET_GAME",payload:null});case"SCORE_POINT":var u=Object(i.a)({},t),j=u.user,d=Object(J.a)(u,["user"]),f=Y(j,1);return d.levelScore+=1,d.levelScore>=d.maximumScore?e(Object(i.a)({user:f},d),{type:"WIN_GAME",payload:null}):Object(i.a)({user:f},d);case"WIN_GAME":var b=Object(i.a)({},t),m=b.user,x=Object(J.a)(b,["user"]),h=Y(m,0,x.chronometerCurrent/1e3);return x.hasWon=!0,x.chronometerCurrent=0,x.chronometerStart=null,Object(i.a)({user:h},x);case"LOSE_GAME":var O=Object(i.a)({},t),v=O.user,g=Object(J.a)(O,["user"]),p=Y(v,0,g.chronometerCurrent/1e3);return g.hasLost=!0,g.chronometerCurrent=0,g.chronometerStart=null,Object(i.a)({user:p},g);case"UPDATE_TIME_SCORE":return t.chronometerStart?(t.chronometerCurrent=t.chronometerStart?(new Date).getTime()-t.chronometerStart:0,Object(i.a)({},t)):t;default:return t}}),ne()),ce=(z=H,function(){var e=Object(V.b)(X,Q)(z);return Object(r.jsx)(V.a,{store:re,children:Object(r.jsx)(e,{})})});o.a.render(Object(r.jsx)(s.a.StrictMode,{children:Object(r.jsx)(ce,{})}),document.getElementById("root")),B()}},[[45,1,2]]]);
//# sourceMappingURL=main.aff68c5a.chunk.js.map