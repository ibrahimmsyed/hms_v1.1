"use strict";(self.webpackChunk_hms_hmsv1_1=self.webpackChunk_hms_hmsv1_1||[]).push([[5719],{67871:function(e,t,r){r.d(t,{Z:function(){return Z}});var n=r(1413),i=r(45987),o=r(65406),a=r.n(o),s=r(57829),l=r(61113),c=r(47723),d=r(29466),x=r(3404),h=r(46417),p=["links","activeLast"];function u(e){var t=e.links,r=e.activeLast,o=void 0!==r&&r,a=(0,i.Z)(e,p),c=t[t.length-1].name,d=t.map((function(e){return(0,h.jsx)(m,{link:e},e.name)})),u=t.map((function(e){return(0,h.jsx)("div",{children:e.name!==c?(0,h.jsx)(m,{link:e}):(0,h.jsx)(l.Z,{variant:"body2",sx:{maxWidth:260,overflow:"hidden",whiteSpace:"nowrap",color:"text.disabled",textOverflow:"ellipsis"},children:c})},e.name)}));return(0,h.jsx)(x.Z,(0,n.Z)((0,n.Z)({separator:(0,h.jsx)(s.Z,{component:"span",sx:{width:4,height:4,borderRadius:"50%",bgcolor:"text.disabled"}})},a),{},{children:o?d:u}))}function m(e){var t=e.link,r=t.href,n=t.name,i=t.icon;return(0,h.jsxs)(c.Z,{variant:"body2",component:d.rU,to:r||"#",sx:{lineHeight:2,display:"flex",alignItems:"center",color:"text.primary","& > div":{display:"inherit"}},children:[i&&(0,h.jsx)(s.Z,{sx:{mr:1,"& svg":{width:20,height:20}},children:i}),n]},n)}var v=["links","action","heading","moreLink","sx"];function Z(e){var t=e.links,r=e.action,o=e.heading,d=e.moreLink,x=void 0===d?[]:d,p=e.sx,m=(0,i.Z)(e,v);return(0,h.jsxs)(s.Z,{sx:(0,n.Z)({mb:5},p),children:[(0,h.jsxs)(s.Z,{sx:{display:"flex",alignItems:"center"},children:[(0,h.jsxs)(s.Z,{sx:{flexGrow:1},children:[(0,h.jsx)(l.Z,{variant:"h4",gutterBottom:!0,children:o}),(0,h.jsx)(u,(0,n.Z)({links:t},m))]}),r&&(0,h.jsx)(s.Z,{sx:{flexShrink:0},children:r})]}),(0,h.jsx)(s.Z,{sx:{mt:2},children:a()(x)?(0,h.jsx)(c.Z,{href:x,target:"_blank",rel:"noopener",variant:"body2",children:x}):x.map((function(e){return(0,h.jsx)(c.Z,{noWrap:!0,href:e,variant:"body2",target:"_blank",rel:"noopener",sx:{display:"table"},children:e},e)}))})]})}},23608:function(e,t,r){r.d(t,{x:function(){return w},O:function(){return f}});var n=r(1413),i=r(88564),o=r(73428),a=r(57829),s=r(63585),l=r(61113),c=r(35898),d=r(19536),x=r(50769),h=r(76221),p=r(3484),u=r(26746),m=r(40483),v=r(46417),Z=(0,i.ZP)("div")((function(e){var t=e.theme;return(0,n.Z)((0,n.Z)({},(0,x.Z)().bgBlur({blur:2,color:t.palette.primary.darker})),{},{top:0,zIndex:8,content:"''",width:"100%",height:"100%",position:"absolute"})}));function f(e){var t=e.user,r=t.name,n=t.cover,i=t.position,x=t.follower,f=t.totalPost,g=t.avatarUrl,b=t.following;return(0,v.jsxs)(o.Z,{sx:{textAlign:"center"},children:[(0,v.jsxs)(a.Z,{sx:{position:"relative"},children:[(0,v.jsx)(m.Z,{src:"https://minimal-assets-api.vercel.app/assets/icons/shape-avatar.svg",sx:{width:144,height:62,zIndex:10,left:0,right:0,bottom:-26,mx:"auto",position:"absolute",color:"background.paper"}}),(0,v.jsx)(s.Z,{alt:r,src:g,sx:{width:64,height:64,zIndex:11,left:0,right:0,bottom:-32,mx:"auto",position:"absolute"}}),(0,v.jsx)(Z,{}),(0,v.jsx)(p.Z,{src:n,alt:n,ratio:"16/9"})]}),(0,v.jsx)(l.Z,{variant:"subtitle1",sx:{mt:6},children:r}),(0,v.jsx)(l.Z,{variant:"body2",sx:{color:"text.secondary"},children:i}),(0,v.jsx)(c.Z,{alignItems:"center",children:(0,v.jsx)(u.Z,{initialColor:!0,sx:{my:2.5}})}),(0,v.jsx)(d.Z,{sx:{borderStyle:"dashed"}}),(0,v.jsxs)(a.Z,{sx:{py:3,display:"grid",gridTemplateColumns:"repeat(3, 1fr)"},children:[(0,v.jsxs)("div",{children:[(0,v.jsx)(l.Z,{variant:"caption",component:"div",sx:{mb:.75,color:"text.disabled"},children:"Follower"}),(0,v.jsx)(l.Z,{variant:"subtitle1",children:(0,h.v1)(x)})]}),(0,v.jsxs)("div",{children:[(0,v.jsx)(l.Z,{variant:"caption",component:"div",sx:{mb:.75,color:"text.disabled"},children:"Following"}),(0,v.jsx)(l.Z,{variant:"subtitle1",children:(0,h.v1)(b)})]}),(0,v.jsxs)("div",{children:[(0,v.jsx)(l.Z,{variant:"caption",component:"div",sx:{mb:.75,color:"text.disabled"},children:"Total Post"}),(0,v.jsx)(l.Z,{variant:"subtitle1",children:(0,h.v1)(f)})]})]})]})}var g=r(29466),b=r(47723),j=r(48175),y=(0,i.ZP)("div")((function(e){var t=e.theme;return(0,n.Z)((0,n.Z)({},(0,x.Z)().bgBlur({blur:2,color:t.palette.primary.darker})),{},{top:0,zIndex:8,content:"''",width:"100%",height:"100%",position:"absolute"})}));function w(e){var t=e.user,r=t.name,n=t.cover,i=t.position,c=t.follower,d=t.totalPost,x=t.avatarUrl;t.following;return(0,v.jsxs)(o.Z,{sx:{textAlign:"center"},children:[(0,v.jsxs)(a.Z,{sx:{position:"relative"},children:[(0,v.jsx)(m.Z,{src:"https://minimal-assets-api.vercel.app/assets/icons/shape-avatar.svg",sx:{width:144,height:62,zIndex:10,left:0,right:0,bottom:-26,mx:"auto",position:"absolute",color:"background.paper"}}),(0,v.jsx)(s.Z,{alt:r,src:x,sx:{width:64,height:64,zIndex:11,left:0,right:0,bottom:-32,mx:"auto",position:"absolute"}}),(0,v.jsx)(y,{}),(0,v.jsx)(p.Z,{src:n,alt:n,ratio:"16/9"})]}),(0,v.jsx)(b.Z,{to:"".concat(j.vB.patient.edit(r)),color:"inherit",component:g.rU,children:(0,v.jsx)(l.Z,{variant:"subtitle1",sx:{mt:6},children:r})}),(0,v.jsx)(l.Z,{variant:"body2",sx:{color:"text.secondary"},children:i}),(0,v.jsxs)(a.Z,{sx:{py:3,display:"grid",gridTemplateColumns:"repeat(2, 1fr)"},children:[(0,v.jsxs)("div",{children:[(0,v.jsx)(l.Z,{variant:"caption",component:"div",sx:{mb:.75,color:"text.disabled"},children:"Gender"}),(0,v.jsx)(l.Z,{variant:"subtitle1",children:(0,h.v1)(c)})]}),(0,v.jsxs)("div",{children:[(0,v.jsx)(l.Z,{variant:"caption",component:"div",sx:{mb:.75,color:"text.disabled"},children:"Contact No."}),(0,v.jsx)(l.Z,{variant:"subtitle1",children:(0,h.v1)(d)})]})]})]})}},3404:function(e,t,r){r.d(t,{Z:function(){return z}});var n=r(93433),i=r(29439),o=r(4942),a=r(87462),s=r(63366),l=r(47313),c=(r(96214),r(83061)),d=r(50317),x=r(88564),h=r(25469),p=r(61113),u=r(17551),m=r(54750),v=r(46417),Z=(0,m.Z)((0,v.jsx)("path",{d:"M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"}),"MoreHoriz"),f=r(38743),g=(0,x.ZP)(f.Z)((function(e){var t=e.theme;return(0,a.Z)({display:"flex",marginLeft:"calc(".concat(t.spacing(1)," * 0.5)"),marginRight:"calc(".concat(t.spacing(1)," * 0.5)")},"light"===t.palette.mode?{backgroundColor:t.palette.grey[100],color:t.palette.grey[700]}:{backgroundColor:t.palette.grey[700],color:t.palette.grey[100]},{borderRadius:2,"&:hover, &:focus":(0,a.Z)({},"light"===t.palette.mode?{backgroundColor:t.palette.grey[200]}:{backgroundColor:t.palette.grey[600]}),"&:active":(0,a.Z)({boxShadow:t.shadows[0]},"light"===t.palette.mode?{backgroundColor:(0,u._4)(t.palette.grey[200],.12)}:{backgroundColor:(0,u._4)(t.palette.grey[600],.12)})})})),b=(0,x.ZP)(Z)({width:24,height:16});var j=function(e){var t=e;return(0,v.jsx)("li",{children:(0,v.jsx)(g,(0,a.Z)({focusRipple:!0},e,{ownerState:t,children:(0,v.jsx)(b,{ownerState:t})}))})},y=r(22131);function w(e){return(0,y.Z)("MuiBreadcrumbs",e)}var k=(0,r(655).Z)("MuiBreadcrumbs",["root","ol","li","separator"]),C=["children","className","component","expandText","itemsAfterCollapse","itemsBeforeCollapse","maxItems","separator"],S=(0,x.ZP)(p.Z,{name:"MuiBreadcrumbs",slot:"Root",overridesResolver:function(e,t){return[(0,o.Z)({},"& .".concat(k.li),t.li),t.root]}})({}),B=(0,x.ZP)("ol",{name:"MuiBreadcrumbs",slot:"Ol",overridesResolver:function(e,t){return t.ol}})({display:"flex",flexWrap:"wrap",alignItems:"center",padding:0,margin:0,listStyle:"none"}),I=(0,x.ZP)("li",{name:"MuiBreadcrumbs",slot:"Separator",overridesResolver:function(e,t){return t.separator}})({display:"flex",userSelect:"none",marginLeft:8,marginRight:8});function R(e,t,r,n){return e.reduce((function(i,o,a){return a<e.length-1?i=i.concat(o,(0,v.jsx)(I,{"aria-hidden":!0,className:t,ownerState:n,children:r},"separator-".concat(a))):i.push(o),i}),[])}var z=l.forwardRef((function(e,t){var r=(0,h.Z)({props:e,name:"MuiBreadcrumbs"}),o=r.children,x=r.className,p=r.component,u=void 0===p?"nav":p,m=r.expandText,Z=void 0===m?"Show path":m,f=r.itemsAfterCollapse,g=void 0===f?1:f,b=r.itemsBeforeCollapse,y=void 0===b?1:b,k=r.maxItems,I=void 0===k?8:k,z=r.separator,P=void 0===z?"/":z,_=(0,s.Z)(r,C),M=l.useState(!1),N=(0,i.Z)(M,2),A=N[0],L=N[1],T=(0,a.Z)({},r,{component:u,expanded:A,expandText:Z,itemsAfterCollapse:g,itemsBeforeCollapse:y,maxItems:I,separator:P}),U=function(e){var t=e.classes;return(0,d.Z)({root:["root"],li:["li"],ol:["ol"],separator:["separator"]},w,t)}(T),O=l.useRef(null),W=l.Children.toArray(o).filter((function(e){return l.isValidElement(e)})).map((function(e,t){return(0,v.jsx)("li",{className:U.li,children:e},"child-".concat(t))}));return(0,v.jsx)(S,(0,a.Z)({ref:t,component:u,color:"text.secondary",className:(0,c.Z)(U.root,x),ownerState:T},_,{children:(0,v.jsx)(B,{className:U.ol,ref:O,ownerState:T,children:R(A||I&&W.length<=I?W:function(e){return y+g>=e.length?e:[].concat((0,n.Z)(e.slice(0,y)),[(0,v.jsx)(j,{"aria-label":Z,onClick:function(){L(!0);var e=O.current.querySelector("a[href],button,[tabindex]");e&&e.focus()}},"ellipsis")],(0,n.Z)(e.slice(e.length-g,e.length)))}(W),U.separator,P,T)})}))}))}}]);