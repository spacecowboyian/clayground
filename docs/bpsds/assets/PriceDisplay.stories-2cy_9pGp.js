import{j as r}from"./jsx-runtime-Cf8x2fCZ.js";import{P as c}from"./PriceDisplay-iHHtK1Wr.js";import"./index-yBjzXJbu.js";import"./cn-DjqsqOe8.js";const D={title:"BPS Components/PriceDisplay",component:c,tags:["autodocs"],parameters:{backgrounds:{default:"light"}},argTypes:{price:{control:"number"},originalPrice:{control:"number"},size:{control:"select",options:["sm","md","lg"]}}},e={args:{price:49.99}},s={args:{price:34.99,originalPrice:49.99}},i={args:{price:149.99,originalPrice:299.99}},a={render:()=>r.jsxs("div",{className:"flex flex-col gap-4 p-4",children:[r.jsx(c,{price:34.99,originalPrice:49.99,size:"sm"}),r.jsx(c,{price:34.99,originalPrice:49.99,size:"md"}),r.jsx(c,{price:34.99,originalPrice:49.99,size:"lg"})]})};var o,n,p;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    price: 49.99
  }
}`,...(p=(n=e.parameters)==null?void 0:n.docs)==null?void 0:p.source}}};var l,t,m;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    price: 34.99,
    originalPrice: 49.99
  }
}`,...(m=(t=s.parameters)==null?void 0:t.docs)==null?void 0:m.source}}};var g,d,u;i.parameters={...i.parameters,docs:{...(g=i.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    price: 149.99,
    originalPrice: 299.99
  }
}`,...(u=(d=i.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};var P,x,S;a.parameters={...a.parameters,docs:{...(P=a.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4 p-4">
      <PriceDisplay price={34.99} originalPrice={49.99} size="sm" />
      <PriceDisplay price={34.99} originalPrice={49.99} size="md" />
      <PriceDisplay price={34.99} originalPrice={49.99} size="lg" />
    </div>
}`,...(S=(x=a.parameters)==null?void 0:x.docs)==null?void 0:S.source}}};const b=["Regular","OnSale","BigSale","Sizes"];export{i as BigSale,s as OnSale,e as Regular,a as Sizes,b as __namedExportsOrder,D as default};
