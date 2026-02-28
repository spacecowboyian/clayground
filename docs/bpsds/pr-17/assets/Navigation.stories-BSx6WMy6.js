import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{c as d}from"./cn-DjqsqOe8.js";import{S as y}from"./SearchBar-CYnUve96.js";import{r as w}from"./index-Dx_1l3Sb.js";import{c as o}from"./createLucideIcon-CGLhuAmF.js";import{X as C}from"./x-UdCLiosU.js";import{S as k}from"./shopping-cart-CwtpCo5h.js";import{C as S}from"./chevron-down-C9pjfVXO.js";import"./index-yBjzXJbu.js";import"./Button-BusymwjI.js";import"./Hidden-CJaOgpXL.js";import"./index-DML4njjH.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-BLHw34Di.js";import"./Input-CzX-v-CA.js";import"./Form-CtNYcFWn.js";import"./Text-CtOaLkQJ.js";import"./useLabels-aAoTIJ3H.js";import"./useControlledState-BKOD5Axx.js";import"./RSPContexts-DBLJ5UHR.js";import"./useLocalizedStringFormatter-BCX3snU5.js";import"./context-BGnht7tc.js";/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]],O=o("map-pin",_);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F=[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]],B=o("menu",F);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],T=o("user",M),q=[{id:"fishing",label:"Fishing",href:"#"},{id:"hunting",label:"Hunting",href:"#"},{id:"camping",label:"Camping",href:"#"},{id:"boating",label:"Boating",href:"#"},{id:"clothing",label:"Clothing",href:"#"},{id:"footwear",label:"Footwear",href:"#"},{id:"optics",label:"Optics",href:"#"},{id:"sale",label:"Sale",href:"#"}];function n({categories:l=q,cartCount:c=0,className:N}){const[i,j]=w.useState(!1);return e.jsxs("nav",{className:d("w-full",N),children:[e.jsxs("div",{className:"bg-[var(--bps-gray-700)] text-white text-xs py-1.5 px-4 flex items-center justify-end gap-4",children:[e.jsxs("a",{href:"#",className:"flex items-center gap-1 hover:text-[var(--bps-gold)] transition-colors",children:[e.jsx(O,{className:"w-3 h-3"})," Find a Store"]}),e.jsx("a",{href:"#",className:"hover:text-[var(--bps-gold)] transition-colors",children:"Order Status"}),e.jsx("a",{href:"#",className:"hover:text-[var(--bps-gold)] transition-colors",children:"Gift Cards"})]}),e.jsxs("div",{className:"bg-[var(--bps-green-dark)] text-white px-4 py-3 flex items-center gap-4",children:[e.jsx("button",{className:"lg:hidden p-1.5 rounded hover:bg-white/10 transition-colors",onClick:()=>j(!i),"aria-label":"Toggle menu",children:i?e.jsx(C,{className:"w-5 h-5"}):e.jsx(B,{className:"w-5 h-5"})}),e.jsx("a",{href:"#",className:"flex-shrink-0",children:e.jsxs("div",{className:"bg-white text-[var(--bps-green-dark)] font-bold text-sm px-2.5 py-1 rounded uppercase tracking-wider leading-tight text-center",children:[e.jsx("div",{className:"text-[10px]",children:"BASS"}),e.jsx("div",{className:"text-base leading-none",children:"PRO"}),e.jsx("div",{className:"text-[10px]",children:"SHOPS"})]})}),e.jsx("div",{className:"flex-1 max-w-2xl mx-4",children:e.jsx(y,{size:"md",placeholder:"Search products, brands, and more..."})}),e.jsxs("div",{className:"flex items-center gap-3 flex-shrink-0",children:[e.jsxs("a",{href:"#",className:"flex flex-col items-center gap-0.5 hover:text-[var(--bps-gold)] transition-colors text-xs",children:[e.jsx(T,{className:"w-5 h-5"}),e.jsx("span",{className:"hidden sm:block",children:"Account"})]}),e.jsxs("a",{href:"#",className:"relative flex flex-col items-center gap-0.5 hover:text-[var(--bps-gold)] transition-colors text-xs",children:[e.jsx(k,{className:"w-5 h-5"}),c>0&&e.jsx("span",{className:"absolute -top-1.5 -right-1.5 bg-[var(--bps-red)] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center",children:c}),e.jsx("span",{className:"hidden sm:block",children:"Cart"})]})]})]}),e.jsx("div",{className:"bg-[var(--bps-green)] hidden lg:block",children:e.jsx("div",{className:"flex items-center overflow-x-auto",children:l.map(a=>e.jsxs("a",{href:a.href??"#",className:d("flex items-center gap-1 px-4 py-2.5 text-white text-sm font-medium whitespace-nowrap transition-colors","hover:bg-[var(--bps-green-dark)] hover:text-[var(--bps-gold)]",a.id==="sale"&&"text-[var(--bps-gold)] font-bold"),children:[a.label,a.subcategories&&e.jsx(S,{className:"w-3.5 h-3.5 opacity-70"})]},a.id))})}),i&&e.jsx("div",{className:"lg:hidden bg-[var(--bps-green-dark)] border-t border-white/10",children:l.map(a=>e.jsx("a",{href:a.href??"#",className:"block px-4 py-3 text-white text-sm border-b border-white/10 hover:bg-[var(--bps-green)] transition-colors",children:a.label},a.id))})]})}n.__docgenInfo={description:"",methods:[],displayName:"Navigation",props:{categories:{required:!1,tsType:{name:"Array",elements:[{name:"NavCategory"}],raw:"NavCategory[]"},description:"",defaultValue:{value:`[
  { id: 'fishing', label: 'Fishing', href: '#' },
  { id: 'hunting', label: 'Hunting', href: '#' },
  { id: 'camping', label: 'Camping', href: '#' },
  { id: 'boating', label: 'Boating', href: '#' },
  { id: 'clothing', label: 'Clothing', href: '#' },
  { id: 'footwear', label: 'Footwear', href: '#' },
  { id: 'optics', label: 'Optics', href: '#' },
  { id: 'sale', label: 'Sale', href: '#' },
]`,computed:!1}},cartCount:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};const re={title:"BPS Components/Navigation",component:n,tags:["autodocs"],parameters:{backgrounds:{default:"light"},layout:"fullscreen"},argTypes:{cartCount:{control:"number"}}},r={args:{cartCount:0}},s={args:{cartCount:3}},t={render:()=>e.jsx("div",{className:"w-full",children:e.jsx(n,{cartCount:2})})};var m,p,h;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    cartCount: 0
  }
}`,...(h=(p=r.parameters)==null?void 0:p.docs)==null?void 0:h.source}}};var x,g,f;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    cartCount: 3
  }
}`,...(f=(g=s.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var u,b,v;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <div className="w-full">
      <Navigation cartCount={2} />
    </div>
}`,...(v=(b=t.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};const se=["Default","WithCartItems","FullNavigation"];export{r as Default,t as FullNavigation,s as WithCartItems,se as __namedExportsOrder,re as default};
