"use strict";(self.webpackChunk_hms_hmsv1_1=self.webpackChunk_hms_hmsv1_1||[]).push([[366],{67871:function(e,r,n){n.d(r,{Z:function(){return Z}});var t=n(1413),i=n(45987),o=n(65406),s=n.n(o),a=n(57829),c=n(61113),l=n(47723),d=n(29466),u=n(3404),x=n(46417),h=["links","activeLast"];function p(e){var r=e.links,n=e.activeLast,o=void 0!==n&&n,s=(0,i.Z)(e,h),l=r[r.length-1].name,d=r.map((function(e){return(0,x.jsx)(g,{link:e},e.name)})),p=r.map((function(e){return(0,x.jsx)("div",{children:e.name!==l?(0,x.jsx)(g,{link:e}):(0,x.jsx)(c.Z,{variant:"body2",sx:{maxWidth:260,overflow:"hidden",whiteSpace:"nowrap",color:"text.disabled",textOverflow:"ellipsis"},children:l})},e.name)}));return(0,x.jsx)(u.Z,(0,t.Z)((0,t.Z)({separator:(0,x.jsx)(a.Z,{component:"span",sx:{width:4,height:4,borderRadius:"50%",bgcolor:"text.disabled"}})},s),{},{children:o?d:p}))}function g(e){var r=e.link,n=r.href,t=r.name,i=r.icon;return(0,x.jsxs)(l.Z,{variant:"body2",component:d.rU,to:n||"#",sx:{lineHeight:2,display:"flex",alignItems:"center",color:"text.primary","& > div":{display:"inherit"}},children:[i&&(0,x.jsx)(a.Z,{sx:{mr:1,"& svg":{width:20,height:20}},children:i}),t]},t)}var f=["links","action","heading","moreLink","sx"];function Z(e){var r=e.links,n=e.action,o=e.heading,d=e.moreLink,u=void 0===d?[]:d,h=e.sx,g=(0,i.Z)(e,f);return(0,x.jsxs)(a.Z,{sx:(0,t.Z)({mb:5},h),children:[(0,x.jsxs)(a.Z,{sx:{display:"flex",alignItems:"center"},children:[(0,x.jsxs)(a.Z,{sx:{flexGrow:1},children:[(0,x.jsx)(c.Z,{variant:"h4",gutterBottom:!0,children:o}),(0,x.jsx)(p,(0,t.Z)({links:r},g))]}),n&&(0,x.jsx)(a.Z,{sx:{flexShrink:0},children:n})]}),(0,x.jsx)(a.Z,{sx:{mt:2},children:s()(u)?(0,x.jsx)(l.Z,{href:u,target:"_blank",rel:"noopener",variant:"body2",children:u}):u.map((function(e){return(0,x.jsx)(l.Z,{noWrap:!0,href:e,variant:"body2",target:"_blank",rel:"noopener",sx:{display:"table"},children:e},e)}))})]})}},83145:function(e,r,n){var t=n(4942),i=n(1413),o=n(88564),s=n(15082),a=(0,o.ZP)(s.Z,{shouldForwardProp:function(e){return"stretchStart"!==e}})((function(e){var r=e.stretchStart,n=e.theme;return{"& .MuiOutlinedInput-root":(0,i.Z)({transition:n.transitions.create(["box-shadow","width"],{easing:n.transitions.easing.easeInOut,duration:n.transitions.duration.shorter}),"&.Mui-focused":{boxShadow:n.customShadows.z12}},r&&{width:r,"&.Mui-focused":(0,t.Z)({boxShadow:n.customShadows.z12},n.breakpoints.up("sm"),{width:r+60})}),"& fieldset":{borderWidth:"1px !important",borderColor:"".concat(n.palette.grey[50032]," !important")}}}));r.Z=a},83393:function(e,r,n){n.d(r,{Z:function(){return l}});var t=n(1413),i=n(45987),o=n(82295),s=n(61113),a=n(46417),c=["searchQuery"];function l(e){var r=e.searchQuery,n=void 0===r?"":r,l=(0,i.Z)(e,c);return n?(0,a.jsxs)(o.Z,(0,t.Z)((0,t.Z)({},l),{},{children:[(0,a.jsx)(s.Z,{gutterBottom:!0,align:"center",variant:"subtitle1",children:"Not found"}),(0,a.jsxs)(s.Z,{variant:"body2",align:"center",children:["No results found for \xa0",(0,a.jsxs)("strong",{children:['"',n,'"']}),". Try checking for typos or using complete words."]})]})):(0,a.jsx)(s.Z,{variant:"body2",children:" Please enter keywords"})}},50574:function(e,r,n){n.d(r,{dS:function(){return Z},ZQ:function(){return d},tR:function(){return w}});var t=n(88564),i=n(17551),o=n(57829),s=n(61113),a=n(46417),c=(0,t.ZP)(o.Z)((function(){return{display:"flex",alignItems:"center",justifyContent:"flex-end"}})),l=(0,t.ZP)("div")((function(e){var r=e.theme;return{marginLeft:-4,borderRadius:"50%",width:r.spacing(2),height:r.spacing(2),border:"solid 2px ".concat(r.palette.background.paper),boxShadow:"inset -1px 1px 2px ".concat((0,i.Fq)(r.palette.common.black,.24))}}));function d(e){var r=e.colors,n=e.limit,t=void 0===n?3:n,i=e.sx,o=r.slice(0,t),d=r.length-t;return(0,a.jsxs)(c,{component:"span",sx:i,children:[o.map((function(e,r){return(0,a.jsx)(l,{sx:{bgcolor:e}},e+r)})),r.length>t&&(0,a.jsx)(s.Z,{variant:"subtitle2",children:"+".concat(d)})]})}var u=n(1413),x=n(45987),h=n(44758),p=n(42593),g=["colors","onChangeColor","sx"],f=["sx"];function Z(e){var r=e.colors,n=e.onChangeColor,t=e.sx,i=(0,x.Z)(e,g);return(0,a.jsx)(o.Z,{sx:t,children:r.map((function(e){var r="#FFFFFF"===e||"white"===e;return(0,a.jsx)(h.Z,(0,u.Z)({size:"small",value:e,color:"default",onChange:function(){return n(e)},icon:(0,a.jsx)(v,{sx:(0,u.Z)({},r&&{border:function(e){return"solid 1px ".concat(e.palette.divider)}})}),checkedIcon:(0,a.jsx)(v,{sx:(0,u.Z)({transform:"scale(1.4)","&:before":{opacity:.48,width:"100%",content:"''",height:"100%",borderRadius:"50%",position:"absolute",boxShadow:"4px 4px 8px 0 currentColor"},"& svg":{width:12,height:12,color:"common.white"}},r&&{border:function(e){return"solid 1px ".concat(e.palette.divider)},boxShadow:function(e){return"4px 4px 8px 0 ".concat(e.palette.grey[50024])},"& svg":{width:12,height:12,color:"common.black"}})}),sx:{color:e,"&:hover":{opacity:.72}}},i),e)}))})}function v(e){var r=e.sx,n=(0,x.Z)(e,f);return(0,a.jsx)(o.Z,(0,u.Z)((0,u.Z)({sx:(0,u.Z)({width:20,height:20,display:"flex",borderRadius:"50%",position:"relative",alignItems:"center",justifyContent:"center",bgcolor:"currentColor",transition:function(e){return e.transitions.create("all",{duration:e.transitions.duration.shortest})}},r)},n),{},{children:(0,a.jsx)(p.Z,{icon:"eva:checkmark-fill"})}))}var j=n(54299),m=n(33827),b=["colors"];function w(e){var r=e.colors,n=(0,x.Z)(e,b);return(0,a.jsx)(j.Z,(0,u.Z)((0,u.Z)({row:!0},n),{},{children:r.map((function(e){var r="#FFFFFF"===e||"white"===e;return(0,a.jsx)(m.Z,{value:e,color:"default",icon:(0,a.jsx)(y,{sx:(0,u.Z)({},r&&{border:function(e){return"solid 1px ".concat(e.palette.divider)}})}),checkedIcon:(0,a.jsx)(y,{sx:(0,u.Z)({transform:"scale(1.4)","&:before":{opacity:.48,width:"100%",content:"''",height:"100%",borderRadius:"50%",position:"absolute",boxShadow:"4px 4px 8px 0 currentColor"},"& svg":{width:12,height:12,color:"common.white"}},r&&{border:function(e){return"solid 1px ".concat(e.palette.divider)},boxShadow:function(e){return"4px 4px 8px 0 ".concat(e.palette.grey[50024])},"& svg":{width:12,height:12,color:"common.black"}})}),sx:{color:e,"&:hover":{opacity:.72}}},e)}))}))}function y(e){var r=e.sx;return(0,a.jsx)(o.Z,{sx:(0,u.Z)({width:20,height:20,display:"flex",borderRadius:"50%",position:"relative",alignItems:"center",justifyContent:"center",bgcolor:"currentColor",transition:function(e){return e.transitions.create("all",{duration:e.transitions.duration.shortest})}},r),children:(0,a.jsx)(p.Z,{icon:"eva:checkmark-fill"})})}},21421:function(e,r,n){n.d(r,{i4:function(){return Z},Ml:function(){return g},bB:function(){return f},VJ:function(){return s},M2:function(){return l},Ti:function(){return c},JJ:function(){return x}});var t=n(46417);var i=n(84488),o=n(57829);function s(){return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(i.Z,{width:"100%",height:560,variant:"rectangular",sx:{borderRadius:2}}),(0,t.jsxs)(o.Z,{sx:{mt:3,display:"flex",alignItems:"center"},children:[(0,t.jsx)(i.Z,{variant:"circular",width:64,height:64}),(0,t.jsxs)(o.Z,{sx:{flexGrow:1,ml:2},children:[(0,t.jsx)(i.Z,{variant:"text",height:20}),(0,t.jsx)(i.Z,{variant:"text",height:20}),(0,t.jsx)(i.Z,{variant:"text",height:20})]})]})]})}var a=n(9019);function c(){return(0,t.jsxs)(a.ZP,{container:!0,spacing:3,children:[(0,t.jsx)(a.ZP,{item:!0,xs:12,md:6,lg:7,children:(0,t.jsx)(i.Z,{variant:"rectangular",width:"100%",sx:{paddingTop:"100%",borderRadius:2}})}),(0,t.jsxs)(a.ZP,{item:!0,xs:12,md:6,lg:5,children:[(0,t.jsx)(i.Z,{variant:"circular",width:80,height:80}),(0,t.jsx)(i.Z,{variant:"text",height:240}),(0,t.jsx)(i.Z,{variant:"text",height:40}),(0,t.jsx)(i.Z,{variant:"text",height:40}),(0,t.jsx)(i.Z,{variant:"text",height:40})]})]})}function l(){return(0,t.jsxs)(a.ZP,{item:!0,xs:12,sm:6,md:3,children:[(0,t.jsx)(i.Z,{variant:"rectangular",width:"100%",sx:{height:200,borderRadius:2}}),(0,t.jsxs)(o.Z,{sx:{display:"flex",mt:1.5},children:[(0,t.jsx)(i.Z,{variant:"circular",sx:{width:40,height:40}}),(0,t.jsx)(i.Z,{variant:"text",sx:{mx:1,flexGrow:1}})]})]})}var d=n(73428),u=n(35898);function x(){return(0,t.jsxs)(d.Z,{children:[(0,t.jsx)(i.Z,{variant:"rectangular",sx:{paddingTop:"100%"}}),(0,t.jsxs)(u.Z,{spacing:2,sx:{p:3},children:[(0,t.jsx)(i.Z,{variant:"text",sx:{width:.5}}),(0,t.jsxs)(u.Z,{direction:"row",justifyContent:"space-between",alignItems:"center",children:[(0,t.jsxs)(u.Z,{direction:"row",children:[(0,t.jsx)(i.Z,{variant:"circular",sx:{width:16,height:16}}),(0,t.jsx)(i.Z,{variant:"circular",sx:{width:16,height:16}}),(0,t.jsx)(i.Z,{variant:"circular",sx:{width:16,height:16}})]}),(0,t.jsx)(i.Z,{variant:"text",sx:{width:40}})]})]})]})}var h=n(93433),p=n(82295);function g(){return(0,t.jsx)(o.Z,{sx:{display:"grid",gap:3,gridTemplateColumns:"repeat(4, 1fr)"},children:(0,h.Z)(Array(3)).map((function(e,r){return(0,t.jsx)(p.Z,{variant:"outlined",sx:{p:2.5,width:310},children:(0,t.jsxs)(u.Z,{spacing:2,children:[(0,t.jsx)(i.Z,{variant:"rectangular",sx:{paddingTop:"75%",borderRadius:1.5}}),0===r&&(0,t.jsx)(i.Z,{variant:"rectangular",sx:{paddingTop:"25%",borderRadius:1.5}}),2!==r&&(0,t.jsx)(i.Z,{variant:"rectangular",sx:{paddingTop:"25%",borderRadius:1.5}})]})},r)}))})}function f(){return(0,t.jsxs)(u.Z,{spacing:1,direction:"row",alignItems:"center",sx:{px:3,py:1},children:[(0,t.jsx)(i.Z,{variant:"circular",width:32,height:32}),(0,t.jsx)(i.Z,{variant:"text",sx:{width:.25,height:16}})]})}function Z(){return(0,t.jsxs)(u.Z,{spacing:1,direction:"row",alignItems:"center",sx:{px:3,py:1.5},children:[(0,t.jsx)(i.Z,{variant:"circular",width:48,height:48}),(0,t.jsxs)(u.Z,{spacing:.5,sx:{flexGrow:1},children:[(0,t.jsx)(i.Z,{variant:"text",sx:{width:.5,height:16}}),(0,t.jsx)(i.Z,{variant:"text",sx:{width:.25,height:12}})]})]})}},70366:function(e,r,n){n.r(r),n.d(r,{default:function(){return Fe}});var t=n(29439),i=n(47313),o=n(68520),s=n.n(o),a=n(75627),c=n(43265),l=n(35898),d=n(61113),u=n(5239),x=n(42785),h=n(48175),p=n(11338),g=n(71361),f=n(67871),Z=n(40844),v=n(1413),j=n(13305),m=n(88564),b=n(19860),w=n(66212),y=n(69099),k=n(80202),C=n(42593),R=n(46417),F=(0,m.ZP)("div")({flexGrow:1,display:"flex",flexWrap:"wrap",alignItems:"center"}),S=(0,m.ZP)("div")((function(e){var r=e.theme;return{display:"flex",overflow:"hidden",alignItems:"stretch",margin:r.spacing(.5),borderRadius:r.shape.borderRadius,border:"solid 1px ".concat(r.palette.divider)}})),I=(0,m.ZP)((function(e){return(0,R.jsx)(d.Z,(0,v.Z)({component:"span",variant:"subtitle2"},e))}))((function(e){var r=e.theme;return{display:"flex",alignItems:"center",padding:r.spacing(0,1),color:r.palette.text.secondary,backgroundColor:r.palette.background.neutral,borderRight:"solid 1px ".concat(r.palette.divider)}}));function P(e){var r,n=e.filters,t=e.isShowReset,i=e.onRemoveGender,o=e.onRemoveCategory,s=e.onRemoveColor,a=e.onRemovePrice,c=e.onRemoveRating,d=e.onResetAll,u=(0,b.Z)(),x=n.gender,h=n.category,p=n.colors,g=n.priceRange,f=n.rating;return(0,R.jsxs)(F,{children:[x.length>0&&(0,R.jsxs)(S,{children:[(0,R.jsx)(I,{children:"Gender:"}),(0,R.jsx)(l.Z,{direction:"row",flexWrap:"wrap",sx:{p:.75},children:x.map((function(e){return(0,R.jsx)(w.Z,{label:e,size:"small",onDelete:function(){return i(e)},sx:{m:.5}},e)}))})]}),"All"!==h&&(0,R.jsxs)(S,{children:[(0,R.jsx)(I,{children:"Category:"}),(0,R.jsx)(l.Z,{direction:"row",flexWrap:"wrap",sx:{p:.75},children:(0,R.jsx)(w.Z,{size:"small",label:h,onDelete:o,sx:{m:.5}})})]}),p.length>0&&(0,R.jsxs)(S,{children:[(0,R.jsx)(I,{children:"Colors:"}),(0,R.jsx)(l.Z,{direction:"row",flexWrap:"wrap",sx:{p:.75},children:p.map((function(e){return(0,R.jsx)(w.Z,{label:(0,k.Z)(e),size:"small",onDelete:function(){return s(e)},sx:(0,v.Z)({m:.5,bgcolor:e,color:u.palette.getContrastText(e)},("#FFFFFF"===e||"#000000"===e)&&{border:"solid 1px ".concat(u.palette.grey[50032]),"& .MuiChip-deleteIcon":{color:"text.disabled"}})},e)}))})]}),g&&(0,R.jsxs)(S,{children:[(0,R.jsx)(I,{children:"Price:"}),(0,R.jsx)(l.Z,{direction:"row",flexWrap:"wrap",sx:{p:.75},children:(0,R.jsx)(w.Z,{size:"small",label:(r=g,"below"===r?"Below $25":"between"===r?"Between $25 - $75":"Above $75"),onDelete:a,sx:{m:.5}})})]}),f&&(0,R.jsxs)(S,{children:[(0,R.jsx)(I,{children:"Rating:"}),(0,R.jsx)(l.Z,{direction:"row",flexWrap:"wrap",sx:{p:.75},children:(0,R.jsx)(w.Z,{size:"small",label:(0,j.G)(f),onDelete:c,sx:{m:.5}})})]}),t&&(0,R.jsx)(y.Z,{color:"error",size:"small",onClick:d,startIcon:(0,R.jsx)(C.Z,{icon:"ic:round-clear-all"}),children:"Clear All"})]})}var A=n(12488),B=n(29466),T=n(73428),W=n(57829),D=n(47723),O=n(76221),z=n(86853),G=n(3484),L=n(50574);function _(e){var r=e.product,n=r.name,t=r.cover,i=r.price,o=r.colors,s=r.status,a=r.priceSale,c=h.vB.eCommerce.view((0,A.o)(n));return(0,R.jsxs)(T.Z,{children:[(0,R.jsxs)(W.Z,{sx:{position:"relative"},children:[s&&(0,R.jsx)(z.Z,{variant:"filled",color:"sale"===s?"error":"info",sx:{top:16,right:16,zIndex:9,position:"absolute",textTransform:"uppercase"},children:s}),(0,R.jsx)(G.Z,{alt:n,src:t,ratio:"1/1"})]}),(0,R.jsxs)(l.Z,{spacing:2,sx:{p:3},children:[(0,R.jsx)(D.Z,{to:c,color:"inherit",component:B.rU,children:(0,R.jsx)(d.Z,{variant:"subtitle2",noWrap:!0,children:n})}),(0,R.jsxs)(l.Z,{direction:"row",alignItems:"center",justifyContent:"space-between",children:[(0,R.jsx)(L.ZQ,{colors:o}),(0,R.jsxs)(l.Z,{direction:"row",spacing:.5,children:[a&&(0,R.jsx)(d.Z,{component:"span",sx:{color:"text.disabled",textDecoration:"line-through"},children:(0,O.e_)(a)}),(0,R.jsx)(d.Z,{variant:"subtitle1",children:(0,O.e_)(i)})]})]})]})]})}var M=n(93433),E=n(21421);function $(e){var r=e.products,n=e.loading;return(0,R.jsx)(W.Z,{sx:{display:"grid",gap:3,gridTemplateColumns:{xs:"repeat(1, 1fr)",sm:"repeat(2, 1fr)",md:"repeat(3, 1fr)",lg:"repeat(4, 1fr)"}},children:(n?(0,M.Z)(Array(12)):r).map((function(e,r){return e?(0,R.jsx)(_,{product:e},e.id):(0,R.jsx)(E.JJ,{},r)}))})}var H=n(51405),Q=n(28100),N=[{value:"featured",label:"Featured"},{value:"newest",label:"Newest"},{value:"priceDesc",label:"Price: High-Low"},{value:"priceAsc",label:"Price: Low-High"}];function V(){var e,r=(0,u.I0)(),n=(0,u.v9)((function(e){return e.product})).sortBy,o=(0,i.useState)(null),s=(0,t.Z)(o,2),a=s[0],c=s[1],l=function(){c(null)};return(0,R.jsxs)(R.Fragment,{children:[(0,R.jsxs)(y.Z,{color:"inherit",disableRipple:!0,onClick:function(e){return r=e.currentTarget,void c(r);var r},endIcon:(0,R.jsx)(C.Z,{icon:a?"eva:chevron-up-fill":"eva:chevron-down-fill"}),children:["Sort By:\xa0",(0,R.jsx)(d.Z,{component:"span",variant:"subtitle2",sx:{color:"text.secondary"},children:(e=n,"featured"===e?"Featured":"newest"===e?"Newest":"priceDesc"===e?"Price: High-Low":"Price: Low-High")})]}),(0,R.jsx)(Q.Z,{anchorEl:a,open:Boolean(a),onClose:l,sx:{width:"auto","& .MuiMenuItem-root":{typography:"body2",borderRadius:.75}},children:N.map((function(e){return(0,R.jsx)(H.Z,{selected:e.value===n,onClick:function(){return n=e.value,l(),void r((0,x.dG)(n));var n},children:e.label},e.value)}))})]})}var J=n(46923),U=n(47131),q=n(19536),K=n(54299),X=n(83929),Y=n(33827),ee=n(55942),re=n(36287),ne=n(62677),te=["Men","Women","Kids"],ie=["All","Shose","Apparel","Accessories"],oe=["up4Star","up3Star","up2Star","up1Star"],se=[{value:"below",label:"Below $25"},{value:"between",label:"Between $25 - $75"},{value:"above",label:"Above $75"}],ae=["#00AB55","#000000","#FFFFFF","#FFC0CB","#FF4842","#1890FF","#94D82D","#FFC107"];function ce(e){var r=e.isOpen,n=e.onResetAll,t=e.onOpen,i=e.onClose,o=(0,a.Gc)().control;return(0,R.jsxs)(R.Fragment,{children:[(0,R.jsx)(y.Z,{disableRipple:!0,color:"inherit",endIcon:(0,R.jsx)(C.Z,{icon:"ic:round-filter-list"}),onClick:t,children:"Filters"}),(0,R.jsxs)(J.ZP,{anchor:"right",open:r,onClose:i,PaperProps:{sx:{width:re.Au.BASE_WIDTH}},children:[(0,R.jsxs)(l.Z,{direction:"row",alignItems:"center",justifyContent:"space-between",sx:{px:1,py:2},children:[(0,R.jsx)(d.Z,{variant:"subtitle1",sx:{ml:1},children:"Filters"}),(0,R.jsx)(U.Z,{onClick:i,children:(0,R.jsx)(C.Z,{icon:"eva:close-fill",width:20,height:20})})]}),(0,R.jsx)(q.Z,{}),(0,R.jsx)(ne.Z,{children:(0,R.jsxs)(l.Z,{spacing:3,sx:{p:3},children:[(0,R.jsxs)(l.Z,{spacing:1,children:[(0,R.jsx)(d.Z,{variant:"subtitle1",children:"Gender"}),(0,R.jsx)(Z.s2,{name:"gender",options:te,sx:{width:1}})]}),(0,R.jsxs)(l.Z,{spacing:1,children:[(0,R.jsx)(d.Z,{variant:"subtitle1",children:"Category"}),(0,R.jsx)(Z.km,{name:"category",options:ie,row:!1})]}),(0,R.jsxs)(l.Z,{spacing:1,children:[(0,R.jsx)(d.Z,{variant:"subtitle1",children:"Colour"}),(0,R.jsx)(a.Qr,{name:"colors",control:o,render:function(e){var r=e.field;return(0,R.jsx)(L.dS,{colors:ae,onChangeColor:function(e){return r.onChange((n=r.value,t=e,n.includes(t)?n.filter((function(e){return e!==t})):[].concat((0,M.Z)(n),[t])));var n,t},sx:{maxWidth:144}})}})]}),(0,R.jsxs)(l.Z,{spacing:1,children:[(0,R.jsx)(d.Z,{variant:"subtitle1",children:"Price"}),(0,R.jsx)(Z.km,{name:"priceRange",options:se.map((function(e){return e.value})),getOptionLabel:se.map((function(e){return e.label}))})]}),(0,R.jsxs)(l.Z,{spacing:1,children:[(0,R.jsx)(d.Z,{variant:"subtitle1",children:"Rating"}),(0,R.jsx)(a.Qr,{name:"rating",control:o,render:function(e){var r=e.field;return(0,R.jsx)(K.Z,(0,v.Z)((0,v.Z)({},r),{},{children:oe.map((function(e,n){return(0,R.jsx)(X.Z,{value:e,control:(0,R.jsx)(Y.Z,{disableRipple:!0,color:"default",icon:(0,R.jsx)(ee.Z,{readOnly:!0,value:4-n}),checkedIcon:(0,R.jsx)(ee.Z,{readOnly:!0,value:4-n}),sx:{"&:hover":{bgcolor:"transparent"}}}),label:"& Up",sx:(0,v.Z)({my:.5,borderRadius:1,"&:hover":{opacity:.48}},r.value.includes(e)&&{bgcolor:"action.selected"})},e)}))}))}})]})]})}),(0,R.jsx)(W.Z,{sx:{p:3},children:(0,R.jsx)(y.Z,{fullWidth:!0,size:"large",type:"submit",color:"inherit",variant:"outlined",onClick:n,startIcon:(0,R.jsx)(C.Z,{icon:"ic:round-clear-all"}),children:"Clear All"})})]})]})}var le=n(15861),de=n(87757),ue=n.n(de),xe=n(83870),he=n.n(xe),pe=n(46642),ge=n.n(pe),fe=n(97890),Ze=n(53540),ve=n(93542),je=n(41727),me=n(58434),be=n(85077),we=n(83145),ye=n(83393),ke=(0,m.ZP)((function(e){return(0,R.jsx)(Ze.Z,(0,v.Z)({placement:"bottom-start"},e))}))({width:"280px !important"});function Ce(){var e=(0,fe.s0)(),r=(0,me.Z)(),n=(0,i.useState)(""),o=(0,t.Z)(n,2),s=o[0],a=o[1],c=(0,i.useState)([]),l=(0,t.Z)(c,2),u=l[0],x=l[1],p=function(){var e=(0,le.Z)(ue().mark((function e(n){var t;return ue().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,a(n),!n){e.next=7;break}return e.next=5,be.Z.get("/api/products/search",{params:{query:n}});case 5:t=e.sent,r.current&&x(t.data.results);case 7:e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.error(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(r){return e.apply(this,arguments)}}(),g=function(r){e(h.vB.eCommerce.view((0,A.o)(r)))},f=function(e){"Enter"===e.key&&g(s)};return(0,R.jsx)(ve.Z,{size:"small",autoHighlight:!0,popupIcon:null,PopperComponent:ke,options:u,onInputChange:function(e,r){return p(r)},getOptionLabel:function(e){return e.name},noOptionsText:(0,R.jsx)(ye.Z,{searchQuery:s}),isOptionEqualToValue:function(e,r){return e.id===r.id},renderInput:function(e){return(0,R.jsx)(we.Z,(0,v.Z)((0,v.Z)({},e),{},{stretchStart:200,placeholder:"Search product...",onKeyUp:f,InputProps:(0,v.Z)((0,v.Z)({},e.InputProps),{},{startAdornment:(0,R.jsx)(je.Z,{position:"start",children:(0,R.jsx)(C.Z,{icon:"eva:search-fill",sx:{ml:1,width:20,height:20,color:"text.disabled"}})})})}))},renderOption:function(e,r,n){var t=n.inputValue,i=r.name,o=r.cover,s=ge()(i,t),a=he()(i,s);return(0,R.jsxs)("li",(0,v.Z)((0,v.Z)({},e),{},{children:[(0,R.jsx)(G.Z,{alt:o,src:o,sx:{width:48,height:48,borderRadius:1,flexShrink:0,mr:1.5}}),(0,R.jsx)(D.Z,{underline:"none",onClick:function(){return g(i)},children:a.map((function(e,r){return(0,R.jsx)(d.Z,{component:"span",variant:"subtitle2",color:e.highlight?"primary":"textPrimary",children:e.text},r)}))})]}))}})}var Re=n(65794);function Fe(){var e=(0,p.Z)().themeStretch,r=(0,u.I0)(),n=(0,i.useState)(!1),o=(0,t.Z)(n,2),v=o[0],j=o[1],m=(0,u.v9)((function(e){return e.product})),b=m.products,w=m.sortBy,y=m.filters,k=function(e,r,n){"featured"===r&&(e=s()(e,["sold"],["desc"]));"newest"===r&&(e=s()(e,["createdAt"],["desc"]));"priceDesc"===r&&(e=s()(e,["price"],["desc"]));"priceAsc"===r&&(e=s()(e,["price"],["asc"]));n.gender.length>0&&(e=e.filter((function(e){return n.gender.includes(e.gender)})));"All"!==n.category&&(e=e.filter((function(e){return e.category===n.category})));n.colors.length>0&&(e=e.filter((function(e){return e.colors.some((function(e){return n.colors.includes(e)}))})));n.priceRange&&(e=e.filter((function(e){return"below"===n.priceRange?e.price<25:"between"===n.priceRange?e.price>=25&&e.price<=75:e.price>75})));n.rating&&(e=e.filter((function(e){var r=function(e){return"up4Star"===e?4:"up3Star"===e?3:"up2Star"===e?2:1};return e.totalRating>r(n.rating)})));return e}(b,w,y),C={gender:y.gender,category:y.category,colors:y.colors,priceRange:y.priceRange,rating:y.rating},F=(0,a.cI)({defaultValues:C}),S=F.reset,I=F.watch,A=F.setValue,B=I(),T=!B.priceRange&&!B.rating&&0===B.gender.length&&0===B.colors.length&&"All"===B.category;(0,i.useEffect)((function(){r((0,x.Xp)())}),[r]),(0,i.useEffect)((function(){r((0,x.ft)(B))}),[r,B]);var W=function(){j(!1)},D=function(){S(),W()};return(0,R.jsx)(g.Z,{title:"Ecommerce: Shop",children:(0,R.jsxs)(c.Z,{maxWidth:!e&&"lg",children:[(0,R.jsx)(f.Z,{heading:"Shop",links:[{name:"Dashboard",href:h.vB.root},{name:"E-Commerce",href:h.vB.eCommerce.root},{name:"Shop"}]}),(0,R.jsxs)(l.Z,{spacing:2,direction:{xs:"column",sm:"row"},alignItems:{sm:"center"},justifyContent:"space-between",sx:{mb:2},children:[(0,R.jsx)(Ce,{}),(0,R.jsxs)(l.Z,{direction:"row",spacing:1,flexShrink:0,sx:{my:1},children:[(0,R.jsx)(Z.RV,{methods:F,children:(0,R.jsx)(ce,{onResetAll:D,isOpen:v,onOpen:function(){j(!0)},onClose:W})}),(0,R.jsx)(V,{})]})]}),(0,R.jsx)(l.Z,{sx:{mb:3},children:!T&&(0,R.jsxs)(R.Fragment,{children:[(0,R.jsxs)(d.Z,{variant:"body2",gutterBottom:!0,children:[(0,R.jsx)("strong",{children:k.length}),"\xa0Products found"]}),(0,R.jsx)(P,{filters:y,isShowReset:!T&&!v,onRemoveGender:function(e){var r=y.gender.filter((function(r){return r!==e}));A("gender",r)},onRemoveCategory:function(){A("category","All")},onRemoveColor:function(e){var r=y.colors.filter((function(r){return r!==e}));A("colors",r)},onRemovePrice:function(){A("priceRange","")},onRemoveRating:function(){A("rating","")},onResetAll:D})]})}),(0,R.jsx)($,{products:k,loading:!b.length&&T}),(0,R.jsx)(Re.Z,{})]})})}},65794:function(e,r,n){n.d(r,{Z:function(){return h}});var t=n(90972),i=n.n(t),o=n(29466),s=n(88564),a=n(50919),c=n(5239),l=n(48175),d=n(42593),u=n(46417),x=(0,s.ZP)(o.rU)((function(e){var r=e.theme;return{zIndex:999,right:0,display:"flex",cursor:"pointer",position:"fixed",alignItems:"center",top:r.spacing(16),height:r.spacing(5),paddingLeft:r.spacing(2),paddingRight:r.spacing(2),paddingTop:r.spacing(1.25),boxShadow:r.customShadows.z20,color:r.palette.text.primary,backgroundColor:r.palette.background.paper,borderTopLeftRadius:2*Number(r.shape.borderRadius),borderBottomLeftRadius:2*Number(r.shape.borderRadius),transition:r.transitions.create("opacity"),"&:hover":{opacity:.72}}}));function h(){var e=(0,c.v9)((function(e){return e.product})).checkout,r=i()(e.cart.map((function(e){return e.quantity})));return(0,u.jsx)(x,{to:l.vB.eCommerce.checkout,children:(0,u.jsx)(a.Z,{showZero:!0,badgeContent:r,color:"error",max:99,children:(0,u.jsx)(d.Z,{icon:"eva:shopping-cart-fill",width:24,height:24})})})}},80202:function(e,r,n){function t(e){var r;switch(e){case"#00AB55":r="Green";break;case"#000000":r="Black";break;case"#FFFFFF":r="White";break;case"#FFC0CB":r="Pink";break;case"#FF4842":r="Red";break;case"#1890FF":r="Blue";break;case"#94D82D":r="Greenyellow";break;case"#FFC107":r="Orange";break;default:r=e}return r}n.d(r,{Z:function(){return t}})}}]);