"use strict";(self.webpackChunk_hms_hmsv1_1=self.webpackChunk_hms_hmsv1_1||[]).push([[5217],{67871:function(e,n,t){t.d(n,{Z:function(){return m}});var i=t(1413),r=t(45987),s=t(65406),a=t.n(s),o=t(57829),c=t(61113),l=t(47723),d=t(29466),u=t(3404),h=t(46417),x=["links","activeLast"];function p(e){var n=e.links,t=e.activeLast,s=void 0!==t&&t,a=(0,r.Z)(e,x),l=n[n.length-1].name,d=n.map((function(e){return(0,h.jsx)(Z,{link:e},e.name)})),p=n.map((function(e){return(0,h.jsx)("div",{children:e.name!==l?(0,h.jsx)(Z,{link:e}):(0,h.jsx)(c.Z,{variant:"body2",sx:{maxWidth:260,overflow:"hidden",whiteSpace:"nowrap",color:"text.disabled",textOverflow:"ellipsis"},children:l})},e.name)}));return(0,h.jsx)(u.Z,(0,i.Z)((0,i.Z)({separator:(0,h.jsx)(o.Z,{component:"span",sx:{width:4,height:4,borderRadius:"50%",bgcolor:"text.disabled"}})},a),{},{children:s?d:p}))}function Z(e){var n=e.link,t=n.href,i=n.name,r=n.icon;return(0,h.jsxs)(l.Z,{variant:"body2",component:d.rU,to:t||"#",sx:{lineHeight:2,display:"flex",alignItems:"center",color:"text.primary","& > div":{display:"inherit"}},children:[r&&(0,h.jsx)(o.Z,{sx:{mr:1,"& svg":{width:20,height:20}},children:r}),i]},i)}var f=["links","action","heading","moreLink","sx"];function m(e){var n=e.links,t=e.action,s=e.heading,d=e.moreLink,u=void 0===d?[]:d,x=e.sx,Z=(0,r.Z)(e,f);return(0,h.jsxs)(o.Z,{sx:(0,i.Z)({mb:5},x),children:[(0,h.jsxs)(o.Z,{sx:{display:"flex",alignItems:"center"},children:[(0,h.jsxs)(o.Z,{sx:{flexGrow:1},children:[(0,h.jsx)(c.Z,{variant:"h4",gutterBottom:!0,children:s}),(0,h.jsx)(p,(0,i.Z)({links:n},Z))]}),t&&(0,h.jsx)(o.Z,{sx:{flexShrink:0},children:t})]}),(0,h.jsx)(o.Z,{sx:{mt:2},children:a()(u)?(0,h.jsx)(l.Z,{href:u,target:"_blank",rel:"noopener",variant:"body2",children:u}):u.map((function(e){return(0,h.jsx)(l.Z,{noWrap:!0,href:e,variant:"body2",target:"_blank",rel:"noopener",sx:{display:"table"},children:e},e)}))})]})}},11004:function(e,n,t){t.d(n,{Z:function(){return p}});var i=t(45987),r=t(1413),s=t(47313),a=t(68278),o=t(19860),c=t(17551),l=t(70499),d=t(61113),u=t(46417),h=["images","photoIndex","setPhotoIndex","isOpen"];function x(){var e=(0,o.Z)(),n="rtl"===e.direction,t=e.palette.grey[600].replace("#",""),i=function(e){return"url(https://api.iconify.design/carbon/".concat(e,".svg?color=%23").concat(t,"&width=").concat(32,"&height=").concat(32,")")},s=function(n){return{opacity:1,alignItems:"center",display:"inline-flex",justifyContent:"center",backgroundImage:"unset",backgroundColor:"transparent",transition:e.transitions.create("opacity"),"&:before":{display:"block",width:32,height:32,content:i(n)},"&:hover":{opacity:.72}}};return(0,u.jsx)(l.Z,{styles:{"& .ReactModalPortal":{"& .ril__outer":{backgroundColor:(0,c.Fq)(e.palette.grey[900],.96)},"& .ril__toolbar":{height:"auto !important",padding:e.spacing(2,3),backgroundColor:"transparent"},"& .ril__toolbarLeftSide":{display:"none"},"& .ril__toolbarRightSide":{height:"auto !important",padding:0,flexGrow:1,display:"flex",alignItems:"center","& li":{display:"flex",alignItems:"center"},"& li:first-of-type":{flexGrow:1},"& li:not(:first-of-type)":{width:40,height:40,justifyContent:"center",marginLeft:e.spacing(2)}},"& button:focus":{outline:"none"},"& .ril__toolbarRightSide button":{width:"100%",height:"100%","&.ril__zoomInButton":s("zoom-in"),"&.ril__zoomOutButton":s("zoom-out"),"&.ril__closeButton":s("close")},"& .ril__navButtons":{padding:e.spacing(3),"&.ril__navButtonPrev":(0,r.Z)({right:"auto",left:e.spacing(2)},s(n?"arrow-right":"arrow-left")),"&.ril__navButtonNext":(0,r.Z)({left:"auto",right:e.spacing(2)},s(n?"arrow-left":"arrow-right"))}}}})}function p(e){var n=e.images,t=e.photoIndex,o=e.setPhotoIndex,c=e.isOpen,l=(0,i.Z)(e,h);(0,s.useEffect)((function(){document.body.style.overflow=c?"hidden":"unset"}),[c]);var p=[(0,u.jsx)(d.Z,{variant:"subtitle2",children:"".concat(t+1," / ").concat(n.length)})];return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(x,{}),c&&(0,u.jsx)(a.Z,(0,r.Z)({animationDuration:160,nextSrc:n[(t+1)%n.length],prevSrc:n[(t+n.length-1)%n.length],onMovePrevRequest:function(){return o((t+n.length-1)%n.length)},onMoveNextRequest:function(){return o((t+1)%n.length)},toolbarButtons:p,reactModalStyle:{overlay:{zIndex:9999}}},l))]})}},21421:function(e,n,t){t.d(n,{i4:function(){return m},Ml:function(){return Z},bB:function(){return f},VJ:function(){return a},M2:function(){return l},Ti:function(){return c},JJ:function(){return h}});var i=t(46417);var r=t(84488),s=t(57829);function a(){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(r.Z,{width:"100%",height:560,variant:"rectangular",sx:{borderRadius:2}}),(0,i.jsxs)(s.Z,{sx:{mt:3,display:"flex",alignItems:"center"},children:[(0,i.jsx)(r.Z,{variant:"circular",width:64,height:64}),(0,i.jsxs)(s.Z,{sx:{flexGrow:1,ml:2},children:[(0,i.jsx)(r.Z,{variant:"text",height:20}),(0,i.jsx)(r.Z,{variant:"text",height:20}),(0,i.jsx)(r.Z,{variant:"text",height:20})]})]})]})}var o=t(9019);function c(){return(0,i.jsxs)(o.ZP,{container:!0,spacing:3,children:[(0,i.jsx)(o.ZP,{item:!0,xs:12,md:6,lg:7,children:(0,i.jsx)(r.Z,{variant:"rectangular",width:"100%",sx:{paddingTop:"100%",borderRadius:2}})}),(0,i.jsxs)(o.ZP,{item:!0,xs:12,md:6,lg:5,children:[(0,i.jsx)(r.Z,{variant:"circular",width:80,height:80}),(0,i.jsx)(r.Z,{variant:"text",height:240}),(0,i.jsx)(r.Z,{variant:"text",height:40}),(0,i.jsx)(r.Z,{variant:"text",height:40}),(0,i.jsx)(r.Z,{variant:"text",height:40})]})]})}function l(){return(0,i.jsxs)(o.ZP,{item:!0,xs:12,sm:6,md:3,children:[(0,i.jsx)(r.Z,{variant:"rectangular",width:"100%",sx:{height:200,borderRadius:2}}),(0,i.jsxs)(s.Z,{sx:{display:"flex",mt:1.5},children:[(0,i.jsx)(r.Z,{variant:"circular",sx:{width:40,height:40}}),(0,i.jsx)(r.Z,{variant:"text",sx:{mx:1,flexGrow:1}})]})]})}var d=t(73428),u=t(35898);function h(){return(0,i.jsxs)(d.Z,{children:[(0,i.jsx)(r.Z,{variant:"rectangular",sx:{paddingTop:"100%"}}),(0,i.jsxs)(u.Z,{spacing:2,sx:{p:3},children:[(0,i.jsx)(r.Z,{variant:"text",sx:{width:.5}}),(0,i.jsxs)(u.Z,{direction:"row",justifyContent:"space-between",alignItems:"center",children:[(0,i.jsxs)(u.Z,{direction:"row",children:[(0,i.jsx)(r.Z,{variant:"circular",sx:{width:16,height:16}}),(0,i.jsx)(r.Z,{variant:"circular",sx:{width:16,height:16}}),(0,i.jsx)(r.Z,{variant:"circular",sx:{width:16,height:16}})]}),(0,i.jsx)(r.Z,{variant:"text",sx:{width:40}})]})]})]})}var x=t(93433),p=t(82295);function Z(){return(0,i.jsx)(s.Z,{sx:{display:"grid",gap:3,gridTemplateColumns:"repeat(4, 1fr)"},children:(0,x.Z)(Array(3)).map((function(e,n){return(0,i.jsx)(p.Z,{variant:"outlined",sx:{p:2.5,width:310},children:(0,i.jsxs)(u.Z,{spacing:2,children:[(0,i.jsx)(r.Z,{variant:"rectangular",sx:{paddingTop:"75%",borderRadius:1.5}}),0===n&&(0,i.jsx)(r.Z,{variant:"rectangular",sx:{paddingTop:"25%",borderRadius:1.5}}),2!==n&&(0,i.jsx)(r.Z,{variant:"rectangular",sx:{paddingTop:"25%",borderRadius:1.5}})]})},n)}))})}function f(){return(0,i.jsxs)(u.Z,{spacing:1,direction:"row",alignItems:"center",sx:{px:3,py:1},children:[(0,i.jsx)(r.Z,{variant:"circular",width:32,height:32}),(0,i.jsx)(r.Z,{variant:"text",sx:{width:.25,height:16}})]})}function m(){return(0,i.jsxs)(u.Z,{spacing:1,direction:"row",alignItems:"center",sx:{px:3,py:1.5},children:[(0,i.jsx)(r.Z,{variant:"circular",width:48,height:48}),(0,i.jsxs)(u.Z,{spacing:.5,sx:{flexGrow:1},children:[(0,i.jsx)(r.Z,{variant:"text",sx:{width:.5,height:16}}),(0,i.jsx)(r.Z,{variant:"text",sx:{width:.25,height:12}})]})]})}},75217:function(e,n,t){t.r(n),t.d(n,{default:function(){return ge}});var i=t(4942),r=t(1413),s=t(93433),a=t(47313),o=t(43265),c=t(35898),l=t(70015),d=t(5239),u=t(42095),h=t(48175),x=t(71361),p=t(67871),Z=t(21421),f=t(29439),m=t(82295),g=t(57829),j=t(61113),v=t(44758),w=t(3484),y=t(42593),b=t(38539),k=t(88564),I=t(46923),C=t(61689),S=t(69099),D=t(19536),R=t(49914),_=t(63585),P=t(15082),T=t(51405),M=t(66281),z=t(62677),O=t(57597),A=t(61484),W=t(11004),B=t(46417);function F(e){var n=e.comments,t=(0,a.useState)(!1),i=(0,f.Z)(t,2),r=i[0],s=i[1],o=(0,a.useState)(0),l=(0,f.Z)(o,2),d=l[0],u=l[1],h=n.filter((function(e){return"image"===e.messageType})).map((function(e){return e.message}));return(0,B.jsxs)(B.Fragment,{children:[(0,B.jsx)(c.Z,{spacing:3,sx:{py:3,px:2.5,bgcolor:"background.neutral"},children:n.map((function(e){return(0,B.jsxs)(c.Z,{direction:"row",spacing:2,children:[(0,B.jsx)(_.Z,{src:e.avatar,sx:{width:32,height:32}}),(0,B.jsxs)("div",{children:[(0,B.jsxs)(c.Z,{direction:"row",alignItems:"center",spacing:1,children:[(0,B.jsxs)(j.Z,{variant:"subtitle2",children:[" ",e.name]}),(0,B.jsx)(j.Z,{variant:"caption",sx:{color:"text.secondary"},children:(0,A.DY)(e.createdAt)})]}),"image"===e.messageType?(0,B.jsx)(w.Z,{src:e.message,onClick:function(){return function(e){var n=h.findIndex((function(n){return n===e}));s(!0),u(n)}(e.message)},sx:{mt:2,borderRadius:1}}):(0,B.jsx)(j.Z,{variant:"body2",sx:{mt:.5},children:e.message})]})]},e.id)}))}),(0,B.jsx)(W.Z,{images:h,mainSrc:h[d],photoIndex:d,setPhotoIndex:u,isOpen:r,onCloseRequest:function(){return s(!1)}})]})}var E=t(65406),U=t.n(E),G=t(80614),L=t(17551),q=t(47131),K=(0,k.ZP)("div")((function(e){var n=e.theme;return{width:64,height:64,fontSize:24,display:"flex",cursor:"pointer",alignItems:"center",justifyContent:"center",margin:n.spacing(.5),borderRadius:n.shape.borderRadius,border:"dashed 1px ".concat(n.palette.divider),"&:hover":{opacity:.72}}}));function N(e){var n=e.attachments,t=(0,a.useState)(!1),i=(0,f.Z)(t,2),r=i[0],s=i[1],o=(0,a.useState)(0),c=(0,f.Z)(o,2),l=c[0],d=c[1],u=n;return(0,B.jsxs)(B.Fragment,{children:[n.map((function(e){return(0,B.jsx)(w.Z,{src:e,onClick:function(){return function(e){var n=u.findIndex((function(n){return n===e}));s(!0),d(n)}(e)},sx:{m:.5,width:64,height:64,borderRadius:1,cursor:"pointer"}},e)})),(0,B.jsx)(H,{}),(0,B.jsx)(W.Z,{images:u,mainSrc:u[l],photoIndex:l,setPhotoIndex:d,isOpen:r,onCloseRequest:function(){return s(!1)}})]})}function H(){var e=(0,a.useState)([]),n=(0,f.Z)(e,2),t=n[0],i=n[1],s=(0,a.useCallback)((function(e){i(e.map((function(e){return Object.assign(e,{preview:URL.createObjectURL(e)})})))}),[i]),o=(0,G.uI)({onDrop:s}),c=o.getRootProps,l=o.getInputProps,d=o.isDragActive;return(0,B.jsxs)(B.Fragment,{children:[t.map((function(e){var n=e.name,s=e.preview,a=U()(e)?e:n;return(0,B.jsxs)(g.Z,(0,r.Z)((0,r.Z)({},(0,O.EU)().inRight),{},{sx:{p:0,m:.5,width:64,height:64,borderRadius:1,overflow:"hidden",position:"relative"},children:[(0,B.jsx)(w.Z,{src:U()(e)?e:s,sx:{height:1,position:"absolute",border:function(e){return"solid 1px ".concat(e.palette.divider)}}}),(0,B.jsx)(g.Z,{sx:{top:6,right:6,position:"absolute"},children:(0,B.jsx)(q.Z,{size:"small",onClick:function(){return function(e){var n=t.filter((function(n){return n!==e}));i(n)}(e)},sx:{p:"2px",color:"common.white",bgcolor:function(e){return(0,L.Fq)(e.palette.grey[900],.72)},"&:hover":{bgcolor:function(e){return(0,L.Fq)(e.palette.grey[900],.48)}}},children:(0,B.jsx)(y.Z,{icon:"eva:close-fill"})})})]}),a)})),(0,B.jsxs)(K,(0,r.Z)((0,r.Z)({},c()),{},{sx:(0,r.Z)({},d&&{opacity:.72}),children:[(0,B.jsx)("input",(0,r.Z)({},l())),(0,B.jsx)(y.Z,{icon:"eva:plus-fill",sx:{color:"text.secondary"}})]}))]})}var J=t(29101);function Y(){return(0,B.jsxs)(c.Z,{direction:"row",spacing:2,sx:{py:3,px:2.5},children:[(0,B.jsx)(J.Z,{}),(0,B.jsxs)(m.Z,{variant:"outlined",sx:{p:1,flexGrow:1},children:[(0,B.jsx)(R.Z,{fullWidth:!0,multiline:!0,rows:2,placeholder:"Type a message",sx:{"& fieldset":{display:"none"}}}),(0,B.jsxs)(c.Z,{direction:"row",justifyContent:"space-between",alignItems:"center",children:[(0,B.jsxs)(c.Z,{direction:"row",spacing:.5,children:[(0,B.jsx)(C.Z,{title:"Add photo",children:(0,B.jsx)(q.Z,{size:"small",children:(0,B.jsx)(y.Z,{icon:"ic:round-add-photo-alternate",width:20,height:20})})}),(0,B.jsx)(q.Z,{size:"small",children:(0,B.jsx)(y.Z,{icon:"eva:attach-2-fill",width:20,height:20})})]}),(0,B.jsx)(S.Z,{variant:"contained",children:"Comment"})]})]})]})}var V=t(3051),Q=t(98789),X=t(89600),$=t(31685),ee=t(46092),ne={attachments:[],comments:[],description:"",due:[null,null],assignee:[]};function te(e){var n=e.onAddTask,t=e.onCloseAddTask,i=(0,a.useState)(""),s=(0,f.Z)(i,2),o=s[0],l=s[1],d=(0,a.useState)(!1),u=(0,f.Z)(d,2),h=u[0],x=u[1],p=ie({date:[null,null]}),Z=p.dueDate,g=p.startTime,j=p.endTime,w=p.isSameDays,k=p.isSameMonths,I=p.onChangeDueDate,S=p.openPicker,D=p.onOpenPicker,_=p.onClosePicker;return(0,B.jsx)(B.Fragment,{children:(0,B.jsx)($.Z,{onClickAway:function(){o&&n((0,r.Z)((0,r.Z)({},ne),{},{id:(0,ee.Z)(),name:o,due:Z,completed:h})),t()},children:(0,B.jsxs)(m.Z,{variant:"outlined",sx:{p:2},children:[(0,B.jsx)(R.Z,{multiline:!0,size:"small",placeholder:"Task name",value:o,onChange:function(e){return l(e.target.value)},onKeyUp:function(e){"Enter"===e.key&&""!==o.trim()&&n((0,r.Z)((0,r.Z)({},ne),{},{id:(0,ee.Z)(),name:o,due:Z,completed:h}))},sx:{"& input":{p:0},"& fieldset":{borderColor:"transparent !important"}}}),(0,B.jsxs)(c.Z,{direction:"row",justifyContent:"space-between",children:[(0,B.jsx)(C.Z,{title:"Mark task complete",children:(0,B.jsx)(v.Z,{disableRipple:!0,checked:h,onChange:function(e){x(e.target.checked)},icon:(0,B.jsx)(y.Z,{icon:"eva:radio-button-off-outline"}),checkedIcon:(0,B.jsx)(y.Z,{icon:"eva:checkmark-circle-2-outline"})})}),(0,B.jsxs)(c.Z,{direction:"row",spacing:1.5,alignItems:"center",children:[(0,B.jsx)(C.Z,{title:"Assign this task",children:(0,B.jsx)(q.Z,{size:"small",children:(0,B.jsx)(y.Z,{icon:"eva:people-fill",width:20,height:20})})}),g&&j?(0,B.jsx)(re,{startTime:g,endTime:j,isSameDays:w,isSameMonths:k,onOpenPicker:D}):(0,B.jsx)(C.Z,{title:"Add due date",children:(0,B.jsx)(q.Z,{size:"small",onClick:D,children:(0,B.jsx)(y.Z,{icon:"eva:calendar-fill",width:20,height:20})})}),(0,B.jsx)(b.Z,{open:S,onClose:_,onOpen:D,value:Z,onChange:I,renderInput:function(){}})]})]})]})})})}function ie(e){var n=e.date,t=(0,a.useState)([n[0],n[1]]),i=(0,f.Z)(t,2),r=i[0],s=i[1],o=(0,a.useState)(!1),c=(0,f.Z)(o,2),l=c[0],d=c[1],u=r[0]||"",h=r[1]||"";return{dueDate:r,startTime:u,endTime:h,isSameDays:(0,V.Z)(new Date(u),new Date(h)),isSameMonths:(0,Q.Z)(new Date(u),new Date(h)),onChangeDueDate:function(e){s(e)},openPicker:l,onOpenPicker:function(){d(!0)},onClosePicker:function(){d(!1)}}}function re(e){var n=e.startTime,t=e.endTime,i=e.isSameDays,s=e.isSameMonths,a=e.onOpenPicker,o=e.sx,c={typography:"caption",cursor:"pointer","&:hover":{opacity:.72}};return s?(0,B.jsx)(g.Z,{onClick:a,sx:(0,r.Z)((0,r.Z)({},c),o),children:i?(0,X.Z)(new Date(t),"dd MMM"):"".concat((0,X.Z)(new Date(n),"dd")," - ").concat((0,X.Z)(new Date(t),"dd MMM"))}):(0,B.jsxs)(g.Z,{onClick:a,sx:(0,r.Z)((0,r.Z)({},c),o),children:[(0,X.Z)(new Date(n),"dd MMM")," - ",(0,X.Z)(new Date(t),"dd MMM")]})}var se=["low","medium","hight"],ae=(0,k.ZP)(j.Z)((function(e){var n=e.theme;return(0,r.Z)((0,r.Z)({},n.typography.body2),{},{width:140,fontSize:13,flexShrink:0,color:n.palette.text.secondary})}));function oe(e){var n=e.card,t=e.isOpen,i=e.onClose,s=e.onDeleteTask,o=(0,M.Z)("up","sm"),l=(0,a.useRef)(null),d=(0,a.useState)(n.completed),u=(0,f.Z)(d,2),h=u[0],x=u[1],p=(0,a.useState)("low"),Z=(0,f.Z)(p,2),m=Z[0],v=Z[1],w=n.name,k=n.description,A=n.due,W=n.assignee,E=n.attachments,U=n.comments,G=ie({date:A}),L=G.dueDate,q=G.startTime,K=G.endTime,H=G.isSameDays,J=G.isSameMonths,V=G.onChangeDueDate,Q=G.openPicker,X=G.onOpenPicker,$=G.onClosePicker;return(0,B.jsx)(B.Fragment,{children:(0,B.jsxs)(I.ZP,{open:t,onClose:i,anchor:"right",PaperProps:{sx:{width:{xs:1,sm:480}}},children:[(0,B.jsxs)(c.Z,{p:2.5,direction:"row",alignItems:"center",children:[!o&&(0,B.jsx)(B.Fragment,{children:(0,B.jsx)(C.Z,{title:"Back",children:(0,B.jsx)(O.w_,{onClick:i,sx:{mr:1},children:(0,B.jsx)(y.Z,{icon:"eva:arrow-ios-back-fill",width:20,height:20})})})}),(0,B.jsx)(S.Z,{size:"small",variant:"outlined",color:h?"primary":"inherit",startIcon:!h&&(0,B.jsx)(y.Z,{icon:"eva:checkmark-fill",width:16,height:16}),onClick:function(){x((function(e){return!e}))},children:h?"Complete":"Mark complete"}),(0,B.jsxs)(c.Z,{direction:"row",spacing:1,justifyContent:"flex-end",flexGrow:1,children:[(0,B.jsx)(C.Z,{title:"Like this",children:(0,B.jsx)(O.w_,{size:"small",children:(0,B.jsx)(y.Z,{icon:"ic:round-thumb-up",width:20,height:20})})}),(0,B.jsxs)(B.Fragment,{children:[(0,B.jsx)(C.Z,{title:"Attachment",children:(0,B.jsx)(O.w_,{size:"small",onClick:function(){var e;null===(e=l.current)||void 0===e||e.click()},children:(0,B.jsx)(y.Z,{icon:"eva:attach-2-fill",width:20,height:20})})}),(0,B.jsx)("input",{ref:l,type:"file",style:{display:"none"}})]}),(0,B.jsx)(C.Z,{title:"Delete task",children:(0,B.jsx)(O.w_,{onClick:s,size:"small",children:(0,B.jsx)(y.Z,{icon:"eva:trash-2-outline",width:20,height:20})})}),(0,B.jsx)(C.Z,{title:"More actions",children:(0,B.jsx)(O.w_,{size:"small",children:(0,B.jsx)(y.Z,{icon:"eva:more-horizontal-fill",width:20,height:20})})})]})]}),(0,B.jsx)(D.Z,{}),(0,B.jsxs)(z.Z,{children:[(0,B.jsxs)(c.Z,{spacing:3,sx:{px:2.5,py:3},children:[(0,B.jsx)(R.Z,{fullWidth:!0,multiline:!0,size:"small",placeholder:"Task name",value:w,sx:{typography:"h6","& .MuiOutlinedInput-notchedOutline":{borderColor:"transparent"}}}),(0,B.jsxs)(c.Z,{direction:"row",children:[(0,B.jsx)(ae,{sx:{mt:1.5},children:"Assignee"}),(0,B.jsxs)(c.Z,{direction:"row",flexWrap:"wrap",alignItems:"center",children:[W.map((function(e){return(0,B.jsx)(_.Z,{alt:e.name,src:e.avatar,sx:{m:.5,width:36,height:36}},e.id)})),(0,B.jsx)(C.Z,{title:"Add assignee",children:(0,B.jsx)(O.w_,{sx:{p:1,ml:.5,border:function(e){return"dashed 1px ".concat(e.palette.divider)}},children:(0,B.jsx)(y.Z,{icon:"eva:plus-fill",width:20,height:20})})})]})]}),(0,B.jsxs)(c.Z,{direction:"row",alignItems:"center",children:[(0,B.jsx)(ae,{children:" Due date"}),(0,B.jsxs)(B.Fragment,{children:[q&&K?(0,B.jsx)(re,{startTime:q,endTime:K,isSameDays:H,isSameMonths:J,onOpenPicker:X,sx:{typography:"body2"}}):(0,B.jsx)(C.Z,{title:"Add assignee",children:(0,B.jsx)(O.w_,{onClick:X,sx:{p:1,ml:.5,border:function(e){return"dashed 1px ".concat(e.palette.divider)}},children:(0,B.jsx)(y.Z,{icon:"eva:plus-fill",width:20,height:20})})}),(0,B.jsx)(b.Z,{open:Q,onClose:$,onOpen:X,value:L,onChange:V,renderInput:function(){}})]})]}),(0,B.jsxs)(c.Z,{direction:"row",alignItems:"center",children:[(0,B.jsx)(ae,{children:"Prioritize"}),(0,B.jsx)(P.Z,{fullWidth:!0,select:!0,size:"small",value:m,onChange:function(e){v(e.target.value)},sx:{"& svg":{display:"none"},"& fieldset":{display:"none"},"& .MuiSelect-select":{p:0,display:"flex",alignItems:"center"}},children:se.map((function(e){return(0,B.jsxs)(T.Z,{value:e,sx:{mx:1,my:.5,borderRadius:1},children:[(0,B.jsx)(g.Z,{sx:(0,r.Z)((0,r.Z)({mr:1,width:14,height:14,borderRadius:.5,bgcolor:"error.main"},"low"===e&&{bgcolor:"info.main"}),"medium"===e&&{bgcolor:"warning.main"})}),(0,B.jsx)(j.Z,{variant:"body2",sx:{textTransform:"capitalize"},children:e})]},e)}))})]}),(0,B.jsxs)(c.Z,{direction:"row",children:[(0,B.jsx)(ae,{sx:{mt:2},children:"Description"}),(0,B.jsx)(R.Z,{fullWidth:!0,multiline:!0,rows:3,size:"small",placeholder:"Task name",value:k,sx:{typography:"body2"}})]}),(0,B.jsxs)(c.Z,{direction:"row",children:[(0,B.jsx)(ae,{sx:{mt:2},children:"Attachments"}),(0,B.jsx)(c.Z,{direction:"row",flexWrap:"wrap",children:(0,B.jsx)(N,{attachments:E})})]})]}),U.length>0&&(0,B.jsx)(F,{comments:U})]}),(0,B.jsx)(D.Z,{}),(0,B.jsx)(Y,{})]})})}function ce(e){var n=e.card,t=e.onDeleteTask,i=e.index,s=n.name,o=n.attachments,c=(0,a.useState)(!1),d=(0,f.Z)(c,2),u=d[0],h=d[1],x=(0,a.useState)(n.completed),p=(0,f.Z)(x,2),Z=p[0],b=p[1],k=function(){h(!0)},I=function(){h(!1)},C=function(e){b(e.target.checked)};return(0,B.jsx)(l._l,{draggableId:n.id,index:i,children:function(e){return(0,B.jsxs)("div",(0,r.Z)((0,r.Z)((0,r.Z)({},e.draggableProps),e.dragHandleProps),{},{ref:e.innerRef,children:[(0,B.jsxs)(m.Z,{sx:(0,r.Z)({px:2,width:1,position:"relative",boxShadow:function(e){return e.customShadows.z1},"&:hover":{boxShadow:function(e){return e.customShadows.z16}}},o.length>0&&{pt:2}),children:[(0,B.jsxs)(g.Z,{onClick:k,sx:{cursor:"pointer"},children:[o.length>0&&(0,B.jsx)(g.Z,{sx:(0,r.Z)({pt:"60%",borderRadius:1,overflow:"hidden",position:"relative",transition:function(e){return e.transitions.create("opacity",{duration:e.transitions.duration.shortest})}},Z&&{opacity:.48}),children:(0,B.jsx)(w.Z,{src:o[0],sx:{position:"absolute",top:0,width:1,height:1}})}),(0,B.jsx)(j.Z,{noWrap:!0,variant:"subtitle2",sx:(0,r.Z)({py:3,pl:5,transition:function(e){return e.transitions.create("opacity",{duration:e.transitions.duration.shortest})}},Z&&{opacity:.48}),children:s})]}),(0,B.jsx)(v.Z,{disableRipple:!0,checked:Z,icon:(0,B.jsx)(y.Z,{icon:"eva:radio-button-off-outline"}),checkedIcon:(0,B.jsx)(y.Z,{icon:"eva:checkmark-circle-2-outline"}),onChange:C,sx:{position:"absolute",bottom:15}})]}),(0,B.jsx)(oe,{card:n,isOpen:u,onClose:I,onDeleteTask:function(){return t(n.id)}})]}))}})}var le=t(15861),de=t(87757),ue=t.n(de),he=t(58908),xe=t(1084),pe=t(28100);function Ze(e){var n=e.columnName,t=e.onDelete,i=e.onUpdate,r=(0,a.useRef)(null),s=(0,a.useState)(n),o=(0,f.Z)(s,2),l=o[0],d=o[1],u=(0,a.useState)(null),h=(0,f.Z)(u,2),x=h[0],p=h[1];(0,a.useEffect)((function(){x&&r.current&&r.current.focus()}),[x]);var Z=function(){p(null)};return(0,B.jsxs)(B.Fragment,{children:[(0,B.jsxs)(c.Z,{direction:"row",justifyContent:"space-between",alignItems:"center",spacing:1,sx:{pt:3},children:[(0,B.jsx)(R.Z,{size:"small",placeholder:"Section name",value:l,onChange:function(e){d(e.target.value)},onKeyUp:function(e){"Enter"===e.key&&r.current&&(r.current.blur(),i(l))},inputRef:r,sx:{typography:"h6",fontWeight:"fontWeightBold","& .MuiOutlinedInput-notchedOutline":{borderColor:"transparent"}}}),(0,B.jsx)(q.Z,{size:"small",onClick:function(e){p(e.currentTarget)},color:x?"inherit":"default",children:(0,B.jsx)(y.Z,{icon:"eva:more-horizontal-fill",width:20,height:20})})]}),(0,B.jsxs)(pe.Z,{open:Boolean(x),anchorEl:x,onClose:Z,sx:{width:"auto","& .MuiMenuItem-root":{px:1,typography:"body2",borderRadius:.75}},children:[(0,B.jsxs)(T.Z,{onClick:t,sx:{color:"error.main"},children:[(0,B.jsx)(y.Z,{icon:"eva:trash-2-outline",sx:{width:20,height:20,flexShrink:0,mr:1}}),"Delete section"]}),(0,B.jsxs)(T.Z,{onClick:function(){Z()},children:[(0,B.jsx)(y.Z,{icon:"eva:edit-fill",sx:{width:20,height:20,flexShrink:0,mr:1}}),"Rename section"]})]})]})}function fe(e){var n=e.column,t=e.index,i=(0,d.I0)(),s=(0,he.Ds)().enqueueSnackbar,o=(0,xe.v9)((function(e){return e.kanban})).board,h=(0,a.useState)(!1),x=(0,f.Z)(h,2),p=x[0],Z=x[1],g=n.name,j=n.cardIds,v=n.id,w=function(){Z((function(e){return!e}))},b=function(){Z(!1)},k=function(e){i((0,u._5)({cardId:e,columnId:v}))},I=function(){var e=(0,le.Z)(ue().mark((function e(t){return ue().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:try{t!==g&&(i((0,u.Gw)(v,(0,r.Z)((0,r.Z)({},n),{},{name:t}))),s("Update success!"))}catch(a){console.error(a)}case 1:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),C=function(){var e=(0,le.Z)(ue().mark((function e(){return ue().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:try{i((0,u.eA)(v))}catch(n){console.error(n)}case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),D=function(e){i((0,u.gI)({card:e,columnId:v})),b()};return(0,B.jsx)(l._l,{draggableId:v,index:t,children:function(e){return(0,B.jsx)(m.Z,(0,r.Z)((0,r.Z)({},e.draggableProps),{},{ref:e.innerRef,variant:"outlined",sx:{px:2,bgcolor:"grey.5008"},children:(0,B.jsxs)(c.Z,(0,r.Z)((0,r.Z)({spacing:3},e.dragHandleProps),{},{children:[(0,B.jsx)(Ze,{columnName:g,onDelete:C,onUpdate:I}),(0,B.jsx)(l.bK,{droppableId:v,type:"task",children:function(e){return(0,B.jsxs)(c.Z,(0,r.Z)((0,r.Z)({ref:e.innerRef},e.droppableProps),{},{spacing:2,width:280,children:[j.map((function(e,n){return(0,B.jsx)(ce,{onDeleteTask:k,card:null===o||void 0===o?void 0:o.cards[e],index:n},e)})),e.placeholder]}))}}),(0,B.jsxs)(c.Z,{spacing:2,sx:{pb:3},children:[p&&(0,B.jsx)(te,{onAddTask:D,onCloseAddTask:b}),(0,B.jsx)(S.Z,{fullWidth:!0,size:"large",color:"inherit",startIcon:(0,B.jsx)(y.Z,{icon:"eva:plus-fill",width:20,height:20}),onClick:w,sx:{fontSize:14},children:"Add Task"})]})]}))}))}})}function me(){var e=(0,a.useRef)(null),n=(0,d.I0)(),t=(0,a.useState)(""),i=(0,f.Z)(t,2),r=i[0],s=i[1],o=(0,a.useState)(!1),c=(0,f.Z)(o,2),l=c[0],h=c[1];(0,a.useEffect)((function(){l&&e.current&&e.current.focus()}),[l]);var x=function(){var e=(0,le.Z)(ue().mark((function e(){return ue().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:try{r&&(n((0,u.wy)({name:r})),s("")),h(!1)}catch(t){console.error(t)}case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,B.jsxs)(m.Z,{sx:{minWidth:280,width:280},children:[!l&&(0,B.jsx)(S.Z,{fullWidth:!0,size:"large",color:"inherit",variant:"outlined",startIcon:(0,B.jsx)(y.Z,{icon:"eva:plus-fill",width:20,height:20}),onClick:function(){h(!0)},children:"Add section"}),l&&(0,B.jsx)($.Z,{onClickAway:x,children:(0,B.jsx)(R.Z,{fullWidth:!0,placeholder:"New section",inputRef:e,value:r,onChange:function(e){s(e.target.value)},onKeyUp:function(e){"Enter"===e.key&&x()},sx:{typography:"h6"}})})]})}function ge(){var e=(0,d.I0)(),n=(0,d.v9)((function(e){return e.kanban})).board;(0,a.useEffect)((function(){e((0,u.SZ)())}),[e]);return(0,B.jsx)(x.Z,{title:"Kanban",sx:{height:1},children:(0,B.jsxs)(o.Z,{maxWidth:!1,sx:{height:1},children:[(0,B.jsx)(p.Z,{heading:"Kanban",links:[{name:"Dashboard",href:h.vB.root},{name:"Kanban"}]}),(0,B.jsx)(l.Z5,{onDragEnd:function(t){var a,o=t.destination,c=t.source,l=t.draggableId,d=t.type;if(o&&(o.droppableId!==c.droppableId||o.index!==c.index)){if("column"===d){var h=Array.from(n.columnOrder);return h.splice(c.index,1),h.splice(o.index,0,l),void e((0,u.Rc)(h))}var x=n.columns[c.droppableId],p=n.columns[o.droppableId];if(x.id!==p.id){var Z=(0,s.Z)(x.cardIds);Z.splice(c.index,1);var f=(0,r.Z)((0,r.Z)({},x),{},{cardIds:Z}),m=(0,s.Z)(p.cardIds);m.splice(o.index,0,l);var g=(0,r.Z)((0,r.Z)({},p),{},{cardIds:m});e((0,u.B)((0,r.Z)((0,r.Z)({},n.columns),{},(a={},(0,i.Z)(a,f.id,f),(0,i.Z)(a,g.id,g),a))))}else{var j=(0,s.Z)(x.cardIds);j.splice(c.index,1),j.splice(o.index,0,l);var v=(0,r.Z)((0,r.Z)({},x),{},{cardIds:j});e((0,u.B)((0,r.Z)((0,r.Z)({},n.columns),{},(0,i.Z)({},v.id,v))))}}},children:(0,B.jsx)(l.bK,{droppableId:"all-columns",direction:"horizontal",type:"column",children:function(e){return(0,B.jsxs)(c.Z,(0,r.Z)((0,r.Z)({},e.droppableProps),{},{ref:e.innerRef,direction:"row",alignItems:"flex-start",spacing:3,sx:{height:"calc(100% - 32px)",overflowY:"hidden"},children:[n.columnOrder.length?n.columnOrder.map((function(e,t){return(0,B.jsx)(fe,{index:t,column:n.columns[e]},e)})):(0,B.jsx)(Z.Ml,{}),e.placeholder,(0,B.jsx)(me,{})]}))}})})]})})}},46092:function(e,n,t){function i(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){var n=16*Math.random()|0;return("x"===e?n:3&n|8).toString(16)}))}t.d(n,{Z:function(){return i}})}}]);