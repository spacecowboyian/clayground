import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{P as a}from"./PromoBanner-Bh12TMWC.js";import"./index-yBjzXJbu.js";import"./cn-DjqsqOe8.js";import"./index-Dx_1l3Sb.js";import"./_commonjsHelpers-CqkleIqs.js";import"./x-UdCLiosU.js";import"./createLucideIcon-CGLhuAmF.js";const B={title:"BPS Components/PromoBanner",component:a,tags:["autodocs"],parameters:{backgrounds:{default:"light"},layout:"fullscreen"},argTypes:{variant:{control:"select",options:["sale","info","shipping","loyalty"]},message:{control:"text"},ctaLabel:{control:"text"},dismissible:{control:"boolean"}}},r={args:{variant:"sale",message:"🎣 SUMMER SALE — Up to 40% OFF Fishing Gear",ctaLabel:"Shop Sale",dismissible:!0}},s={args:{variant:"shipping",message:"FREE Standard Shipping on orders $50+",ctaLabel:"Learn More"}},n={args:{variant:"loyalty",message:"⭐ Club Members earn 2X points this weekend only!",ctaLabel:"Join Club"}},o={render:()=>e.jsxs("div",{className:"flex flex-col w-full",children:[e.jsx(a,{variant:"sale",message:"🎣 SUMMER SALE — Up to 40% OFF",ctaLabel:"Shop Sale"}),e.jsx(a,{variant:"info",message:"New arrivals every week — check out the latest gear",ctaLabel:"See What's New"}),e.jsx(a,{variant:"shipping",message:"FREE Shipping on orders $50+"}),e.jsx(a,{variant:"loyalty",message:"⭐ Club Members earn 2X points this weekend!",ctaLabel:"Join Club"})]})};var t,i,l;r.parameters={...r.parameters,docs:{...(t=r.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    variant: 'sale',
    message: '🎣 SUMMER SALE — Up to 40% OFF Fishing Gear',
    ctaLabel: 'Shop Sale',
    dismissible: true
  }
}`,...(l=(i=r.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};var p,m,c;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    variant: 'shipping',
    message: 'FREE Standard Shipping on orders $50+',
    ctaLabel: 'Learn More'
  }
}`,...(c=(m=s.parameters)==null?void 0:m.docs)==null?void 0:c.source}}};var g,d,u;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    variant: 'loyalty',
    message: '⭐ Club Members earn 2X points this weekend only!',
    ctaLabel: 'Join Club'
  }
}`,...(u=(d=n.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};var S,b,h;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col w-full">
      <PromoBanner variant="sale" message="🎣 SUMMER SALE — Up to 40% OFF" ctaLabel="Shop Sale" />
      <PromoBanner variant="info" message="New arrivals every week — check out the latest gear" ctaLabel="See What's New" />
      <PromoBanner variant="shipping" message="FREE Shipping on orders $50+" />
      <PromoBanner variant="loyalty" message="⭐ Club Members earn 2X points this weekend!" ctaLabel="Join Club" />
    </div>
}`,...(h=(b=o.parameters)==null?void 0:b.docs)==null?void 0:h.source}}};const w=["SaleBanner","ShippingBanner","LoyaltyBanner","AllVariants"];export{o as AllVariants,n as LoyaltyBanner,r as SaleBanner,s as ShippingBanner,w as __namedExportsOrder,B as default};
