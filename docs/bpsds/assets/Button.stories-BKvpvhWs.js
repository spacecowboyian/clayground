import{j as r}from"./jsx-runtime-Cf8x2fCZ.js";import{B as a}from"./Button-Dg1gxc82.js";import{S as C}from"./shopping-cart-CwtpCo5h.js";import"./index-yBjzXJbu.js";import"./Button-BusymwjI.js";import"./Hidden-CJaOgpXL.js";import"./index-Dx_1l3Sb.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-DML4njjH.js";import"./index-BLHw34Di.js";import"./cn-DjqsqOe8.js";import"./createLucideIcon-CGLhuAmF.js";const F={title:"BPS Components/Button",component:a,tags:["autodocs"],parameters:{backgrounds:{default:"light"}},argTypes:{variant:{control:"select",options:["primary","secondary","gold","outline","ghost","destructive","link"]},size:{control:"select",options:["sm","md","lg","xl"]},isDisabled:{control:"boolean"},fullWidth:{control:"boolean"},children:{control:"text"}}},t={args:{variant:"primary",size:"lg",children:"Add to Cart"},render:A=>r.jsxs(a,{...A,children:[r.jsx(C,{className:"w-4 h-4"}),"Add to Cart"]})},e={args:{variant:"gold",size:"xl",children:"Shop Now"}},n={render:()=>r.jsxs("div",{className:"flex flex-wrap gap-3 p-4",children:[r.jsx(a,{variant:"primary",children:"Primary (Add to Cart)"}),r.jsx(a,{variant:"secondary",children:"Secondary"}),r.jsx(a,{variant:"gold",children:"Gold (Shop Now)"}),r.jsx(a,{variant:"outline",children:"Outline"}),r.jsx(a,{variant:"ghost",children:"Ghost"}),r.jsx(a,{variant:"destructive",children:"Remove Item"}),r.jsx(a,{variant:"link",children:"View Details"})]})},s={render:()=>r.jsxs("div",{className:"flex flex-wrap items-center gap-3 p-4",children:[r.jsx(a,{variant:"primary",size:"sm",children:"Small"}),r.jsx(a,{variant:"primary",size:"md",children:"Medium"}),r.jsx(a,{variant:"primary",size:"lg",children:"Large"}),r.jsx(a,{variant:"primary",size:"xl",children:"X-Large"})]})},o={render:()=>r.jsx("div",{className:"w-72 p-4",children:r.jsxs(a,{variant:"primary",size:"lg",fullWidth:!0,children:[r.jsx(C,{className:"w-4 h-4"}),"Add to Cart"]})})},i={args:{variant:"primary",size:"md",children:"Out of Stock",isDisabled:!0}};var d,l,c;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'lg',
    children: 'Add to Cart'
  },
  render: args => <Button {...args}>
      <ShoppingCart className="w-4 h-4" />
      Add to Cart
    </Button>
}`,...(c=(l=t.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};var m,p,u;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    variant: 'gold',
    size: 'xl',
    children: 'Shop Now'
  }
}`,...(u=(p=e.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var h,v,g;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-3 p-4">
      <Button variant="primary">Primary (Add to Cart)</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="gold">Gold (Shop Now)</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Remove Item</Button>
      <Button variant="link">View Details</Button>
    </div>
}`,...(g=(v=n.parameters)==null?void 0:v.docs)==null?void 0:g.source}}};var x,B,y;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap items-center gap-3 p-4">
      <Button variant="primary" size="sm">Small</Button>
      <Button variant="primary" size="md">Medium</Button>
      <Button variant="primary" size="lg">Large</Button>
      <Button variant="primary" size="xl">X-Large</Button>
    </div>
}`,...(y=(B=s.parameters)==null?void 0:B.docs)==null?void 0:y.source}}};var S,j,z;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <div className="w-72 p-4">
      <Button variant="primary" size="lg" fullWidth>
        <ShoppingCart className="w-4 h-4" />
        Add to Cart
      </Button>
    </div>
}`,...(z=(j=o.parameters)==null?void 0:j.docs)==null?void 0:z.source}}};var f,w,N;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Out of Stock',
    isDisabled: true
  }
}`,...(N=(w=i.parameters)==null?void 0:w.docs)==null?void 0:N.source}}};const I=["AddToCart","ShopNow","AllVariants","Sizes","FullWidth","Disabled"];export{t as AddToCart,n as AllVariants,i as Disabled,o as FullWidth,e as ShopNow,s as Sizes,I as __namedExportsOrder,F as default};
