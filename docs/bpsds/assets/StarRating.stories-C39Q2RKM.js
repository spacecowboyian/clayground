import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{S as r}from"./StarRating-CM2DwtkS.js";import"./index-yBjzXJbu.js";import"./cn-DjqsqOe8.js";const N={title:"BPS Components/StarRating",component:r,tags:["autodocs"],parameters:{backgrounds:{default:"light"}},argTypes:{rating:{control:{type:"range",min:0,max:5,step:.5}},reviewCount:{control:"number"},size:{control:"select",options:["sm","md","lg"]},showCount:{control:"boolean"}}},a={args:{rating:5,reviewCount:1243}},s={args:{rating:4.5,reviewCount:387}},t={args:{rating:3,reviewCount:42}},n={render:()=>e.jsx("div",{className:"flex flex-col gap-2 p-4",children:[5,4.5,4,3.5,3,2,1].map(i=>e.jsx(r,{rating:i,reviewCount:Math.floor(i*100),size:"md"},i))})},o={render:()=>e.jsxs("div",{className:"flex flex-col gap-2 p-4",children:[e.jsx(r,{rating:4.5,reviewCount:387,size:"sm"}),e.jsx(r,{rating:4.5,reviewCount:387,size:"md"}),e.jsx(r,{rating:4.5,reviewCount:387,size:"lg"})]})};var c,m,g;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    rating: 5,
    reviewCount: 1243
  }
}`,...(g=(m=a.parameters)==null?void 0:m.docs)==null?void 0:g.source}}};var l,p,d;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    rating: 4.5,
    reviewCount: 387
  }
}`,...(d=(p=s.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};var u,v,x;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    rating: 3,
    reviewCount: 42
  }
}`,...(x=(v=t.parameters)==null?void 0:v.docs)==null?void 0:x.source}}};var S,C,f;n.parameters={...n.parameters,docs:{...(S=n.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-2 p-4">
      {[5, 4.5, 4, 3.5, 3, 2, 1].map(r => <StarRating key={r} rating={r} reviewCount={Math.floor(r * 100)} size="md" />)}
    </div>
}`,...(f=(C=n.parameters)==null?void 0:C.docs)==null?void 0:f.source}}};var w,z,R;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-2 p-4">
      <StarRating rating={4.5} reviewCount={387} size="sm" />
      <StarRating rating={4.5} reviewCount={387} size="md" />
      <StarRating rating={4.5} reviewCount={387} size="lg" />
    </div>
}`,...(R=(z=o.parameters)==null?void 0:z.docs)==null?void 0:R.source}}};const b=["FiveStars","FourAndHalf","ThreeStars","AllRatings","Sizes"];export{n as AllRatings,a as FiveStars,s as FourAndHalf,o as Sizes,t as ThreeStars,b as __namedExportsOrder,N as default};
