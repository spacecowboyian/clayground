import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{B as l}from"./Badge-Ci0G3iKK.js";import"./index-yBjzXJbu.js";import"./cn-DjqsqOe8.js";const L={title:"BPS Components/Badge",component:l,tags:["autodocs"],parameters:{backgrounds:{default:"light"}},argTypes:{variant:{control:"select",options:["sale","new","clearance","featured","exclusive","limited","outOfStock"]},children:{control:"text"}}},a={args:{variant:"sale"}},r={args:{variant:"new"}},s={args:{variant:"clearance"}},t={args:{variant:"featured"}},o={render:()=>e.jsx("div",{className:"flex flex-wrap gap-2 p-4",children:["sale","new","clearance","featured","exclusive","limited","outOfStock"].map(d=>e.jsx(l,{variant:d},d))})},c={args:{variant:"sale",children:"30% OFF"}},n={render:()=>e.jsxs("div",{className:"relative inline-block w-48 h-48 bg-gray-100 rounded",children:[e.jsx("img",{src:"https://placehold.co/192x192/f4f4f4/999?text=Product",alt:"Product",className:"w-full h-full object-cover rounded"}),e.jsx("div",{className:"absolute top-2 left-2",children:e.jsx(l,{variant:"sale",children:"SAVE 25%"})})]})};var i,m,u;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    variant: 'sale'
  }
}`,...(u=(m=a.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var p,g,v;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    variant: 'new'
  }
}`,...(v=(g=r.parameters)==null?void 0:g.docs)==null?void 0:v.source}}};var f,x,h;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    variant: 'clearance'
  }
}`,...(h=(x=s.parameters)==null?void 0:x.docs)==null?void 0:h.source}}};var S,w,b;t.parameters={...t.parameters,docs:{...(S=t.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    variant: 'featured'
  }
}`,...(b=(w=t.parameters)==null?void 0:w.docs)==null?void 0:b.source}}};var j,N,O;o.parameters={...o.parameters,docs:{...(j=o.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-2 p-4">
      {(['sale', 'new', 'clearance', 'featured', 'exclusive', 'limited', 'outOfStock'] as const).map(v => <Badge key={v} variant={v} />)}
    </div>
}`,...(O=(N=o.parameters)==null?void 0:N.docs)==null?void 0:O.source}}};var k,B,P;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    variant: 'sale',
    children: '30% OFF'
  }
}`,...(P=(B=c.parameters)==null?void 0:B.docs)==null?void 0:P.source}}};var F,C,y;n.parameters={...n.parameters,docs:{...(F=n.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => <div className="relative inline-block w-48 h-48 bg-gray-100 rounded">
      <img src="https://placehold.co/192x192/f4f4f4/999?text=Product" alt="Product" className="w-full h-full object-cover rounded" />
      <div className="absolute top-2 left-2">
        <Badge variant="sale">SAVE 25%</Badge>
      </div>
    </div>
}`,...(y=(C=n.parameters)==null?void 0:C.docs)==null?void 0:y.source}}};const _=["Sale","New","Clearance","Featured","AllVariants","CustomLabel","OnProductImage"];export{o as AllVariants,s as Clearance,c as CustomLabel,t as Featured,r as New,n as OnProductImage,a as Sale,_ as __namedExportsOrder,L as default};
