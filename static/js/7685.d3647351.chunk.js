"use strict";(self.webpackChunk_hms_hmsv1_1=self.webpackChunk_hms_hmsv1_1||[]).push([[7685],{57685:function(e,n,r){r.r(n),r.d(n,{default:function(){return E}});var t=r(29466),i=r(88564),o=r(43265),c=r(57829),a=r(69099),s=r(61113),d=r(47723),u=r(33896),l=r(48175),h=r(71361),f=r(42593),m=r(1413),x=r(15861),v=r(87757),p=r.n(v),g=r(28089),Z=r(58908),j=r(97890),b=r(47313),y=r(75627),q=r(1432),k=r(35898),C=r(49914),_=r(32703),w=r(46417);function S(){var e=(0,j.s0)(),n=(0,Z.Ds)().enqueueSnackbar,r=g.Ry().shape({code1:g.Z_().required("Code is required"),code2:g.Z_().required("Code is required"),code3:g.Z_().required("Code is required"),code4:g.Z_().required("Code is required"),code5:g.Z_().required("Code is required"),code6:g.Z_().required("Code is required")}),t=(0,y.cI)({mode:"onBlur",resolver:(0,q.X)(r),defaultValues:{code1:"",code2:"",code3:"",code4:"",code5:"",code6:""}}),i=t.watch,o=t.control,c=t.setValue,a=t.handleSubmit,s=t.formState,d=s.isSubmitting,u=s.isValid,h=i();(0,b.useEffect)((function(){document.addEventListener("paste",v)}),[]);var f=function(){var r=(0,x.Z)(p().mark((function r(t){return p().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,new Promise((function(e){return setTimeout(e,500)}));case 3:console.log("code:",Object.values(t).join("")),n("Verify success!"),e(l.vB.root,{replace:!0}),r.next=11;break;case 8:r.prev=8,r.t0=r.catch(0),console.error(r.t0);case 11:case"end":return r.stop()}}),r,null,[[0,8]])})));return function(e){return r.apply(this,arguments)}}(),v=function(e){var n,r=(null===e||void 0===e||null===(n=e.clipboardData)||void 0===n?void 0:n.getData("Text"))||"";r=r.split(""),[].forEach.call(document.querySelectorAll("#field-code"),(function(e,n){e.value=r[n];var t="code".concat(n+1);c(t,r[n])}))};return(0,w.jsxs)("form",{onSubmit:a(f),children:[(0,w.jsx)(k.Z,{direction:"row",spacing:2,justifyContent:"center",children:Object.keys(h).map((function(e,n){return(0,w.jsx)(y.Qr,{name:"code".concat(n+1),control:o,render:function(e){var r=e.field;return(0,w.jsx)(C.Z,(0,m.Z)((0,m.Z)({},r),{},{id:"field-code",autoFocus:0===n,placeholder:"-",onChange:function(e){return function(e,n){var r=e.target,t=r.maxLength,i=r.value,o=r.name.replace("code",""),c=Number(o);if(i.length>=t&&c<6){var a=document.querySelector("input[name=code".concat(c+1,"]"));null!==a&&a.focus()}n(e)}(e,r.onChange)},inputProps:{maxLength:1,sx:{p:0,textAlign:"center",width:{xs:36,sm:56},height:{xs:36,sm:56}}}}))}},e)}))}),(0,w.jsx)(_.Z,{fullWidth:!0,size:"large",type:"submit",variant:"contained",loading:d,disabled:!u,sx:{mt:3},children:"Verify"})]})}var V=(0,i.ZP)("div")((function(e){return{display:"flex",height:"100%",alignItems:"center",padding:e.theme.spacing(12,0)}}));function E(){return(0,w.jsx)(h.Z,{title:"Verify",sx:{height:1},children:(0,w.jsxs)(V,{children:[(0,w.jsx)(u.Z,{}),(0,w.jsx)(o.Z,{children:(0,w.jsxs)(c.Z,{sx:{maxWidth:480,mx:"auto"},children:[(0,w.jsx)(a.Z,{size:"small",component:t.rU,to:l.EE.login,startIcon:(0,w.jsx)(f.Z,{icon:"eva:arrow-ios-back-fill",width:20,height:20}),sx:{mb:3},children:"Back"}),(0,w.jsx)(s.Z,{variant:"h3",paragraph:!0,children:"Please check your email!"}),(0,w.jsx)(s.Z,{sx:{color:"text.secondary"},children:"We have emailed a 6-digit confirmation code to acb@domain, please enter the code in below box to verify your email."}),(0,w.jsx)(c.Z,{sx:{mt:5,mb:3},children:(0,w.jsx)(S,{})}),(0,w.jsxs)(s.Z,{variant:"body2",align:"center",children:["Don\u2019t have a code? \xa0",(0,w.jsx)(d.Z,{variant:"subtitle2",underline:"none",onClick:function(){},children:"Resend code"})]})]})})]})})}}}]);