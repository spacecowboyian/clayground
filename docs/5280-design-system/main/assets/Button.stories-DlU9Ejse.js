import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{c as a,s as x,r as C,f as J}from"./tokens-PUChd5-i.js";import{u as K}from"./useHover-DxhSpJwM.js";import"./index-yBjzXJbu.js";import"./index-Dx_1l3Sb.js";import"./_commonjsHelpers-CqkleIqs.js";const h={sm:{fontSize:13,padding:"9px 18px"},md:{fontSize:15,padding:"13px 26px"},lg:{fontSize:17,padding:"16px 34px"}},Q={sm:"9px 16px 9px 14px",md:"13px 24px 13px 22px",lg:"16px 32px 16px 30px"},U={primary:{background:a.pine,color:a.paper,border:"none"},accent:{background:a.red,color:"#fff",border:"none"},outline:{background:"transparent",color:a.pine,border:`2px solid ${a.pine}`},ghost:{background:"transparent",color:a.pine,border:"none"}},X={primary:{transform:"translateY(-3px)",boxShadow:"0 10px 22px rgba(24,74,79,.32)",background:"#13403F"},accent:{transform:"translateY(-3px)",boxShadow:"0 10px 22px rgba(255,59,59,.34)"},outline:{transform:"translateY(-3px)",background:a.pine,color:a.paper},ghost:{background:"#F0EFE6"}},Z={primary:`transform .22s ${x},box-shadow .22s ease,background .2s ease`,accent:`transform .22s ${x},box-shadow .22s ease`,outline:`transform .22s ${x},background .2s ease,color .2s ease`,ghost:"background .2s ease"},ee={background:"#D9D3C8",color:"#9A9488",border:"none",cursor:"not-allowed"};function r({variant:p="primary",size:u="md",icon:m=!1,disabled:g=!1,children:M,..._}){const{isHovered:H,hoverProps:N}=K(),f={fontFamily:J.ui,fontWeight:600,fontSize:h[u].fontSize,borderRadius:C.pill,cursor:"pointer",padding:m?Q[u]:h[u].padding,...U[p],transition:Z[p],...m?{display:"inline-flex",alignItems:"center",gap:9}:{}},Y=g?{...f,...ee}:{...f,...H?X[p]:{}};return e.jsxs("button",{..._,...g?{}:N,disabled:g,style:Y,children:[m&&e.jsx("span",{style:{display:"inline-block",width:16,height:16,borderRadius:"50%",border:`2px solid ${a.lime}`}}),M]})}r.__docgenInfo={description:"",methods:[],displayName:"Button",props:{variant:{required:!1,tsType:{name:"union",raw:"'primary' | 'accent' | 'outline' | 'ghost'",elements:[{name:"literal",value:"'primary'"},{name:"literal",value:"'accent'"},{name:"literal",value:"'outline'"},{name:"literal",value:"'ghost'"}]},description:"Visual style. Pine `primary`, red `accent`, `outline`, or `ghost`.",defaultValue:{value:"'primary'",computed:!1}},size:{required:!1,tsType:{name:"union",raw:"'sm' | 'md' | 'lg'",elements:[{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"}]},description:"Padding / font-size scale.",defaultValue:{value:"'md'",computed:!1}},icon:{required:!1,tsType:{name:"boolean"},description:"Render the small lime-ringed circle icon + gap before the label.",defaultValue:{value:"false",computed:!1}},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},disabled:{defaultValue:{value:"false",computed:!1},required:!1}}};const ie={title:"Components/Button",component:r,tags:["autodocs"],argTypes:{variant:{control:"inline-radio",options:["primary","accent","outline","ghost"]},size:{control:"inline-radio",options:["sm","md","lg"]},icon:{control:"boolean"},disabled:{control:"boolean"}}},n={args:{variant:"primary",children:"Primary"}},t={args:{variant:"accent",children:"Accent"}},s={args:{variant:"outline",children:"Outline"}},o={args:{variant:"ghost",children:"Ghost"}},i={args:{disabled:!0,children:"Disabled"}},l={render:()=>e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:14,alignItems:"center"},children:[e.jsx(r,{size:"sm",children:"Small"}),e.jsx(r,{size:"md",children:"Medium"}),e.jsx(r,{size:"lg",children:"Large"})]})},c={args:{variant:"primary",icon:!0,children:"With icon"}},d={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:26,background:"#fff",border:"1px solid #E7E1D8",borderRadius:16,padding:32},children:[e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:14,alignItems:"center"},children:[e.jsx(r,{variant:"primary",children:"Primary"}),e.jsx(r,{variant:"accent",children:"Accent"}),e.jsx(r,{variant:"outline",children:"Outline"}),e.jsx(r,{variant:"ghost",children:"Ghost"})]}),e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:14,alignItems:"center"},children:[e.jsx(r,{size:"sm",children:"Small"}),e.jsx(r,{size:"md",children:"Medium"}),e.jsx(r,{size:"lg",children:"Large"}),e.jsx(r,{icon:!0,children:"With icon"}),e.jsx(r,{disabled:!0,children:"Disabled"})]})]})};var y,b,v;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    children: 'Primary'
  }
}`,...(v=(b=n.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var B,S,z;t.parameters={...t.parameters,docs:{...(B=t.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    variant: 'accent',
    children: 'Accent'
  }
}`,...(z=(S=t.parameters)==null?void 0:S.docs)==null?void 0:z.source}}};var j,w,k;s.parameters={...s.parameters,docs:{...(j=s.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    variant: 'outline',
    children: 'Outline'
  }
}`,...(k=(w=s.parameters)==null?void 0:w.docs)==null?void 0:k.source}}};var W,D,I;o.parameters={...o.parameters,docs:{...(W=o.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    variant: 'ghost',
    children: 'Ghost'
  }
}`,...(I=(D=o.parameters)==null?void 0:D.docs)==null?void 0:I.source}}};var P,R,A;i.parameters={...i.parameters,docs:{...(P=i.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    disabled: true,
    children: 'Disabled'
  }
}`,...(A=(R=i.parameters)==null?void 0:R.docs)==null?void 0:A.source}}};var E,O,V;l.parameters={...l.parameters,docs:{...(E=l.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: 14,
    alignItems: 'center'
  }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
}`,...(V=(O=l.parameters)==null?void 0:O.docs)==null?void 0:V.source}}};var G,T,q;c.parameters={...c.parameters,docs:{...(G=c.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    icon: true,
    children: 'With icon'
  }
}`,...(q=(T=c.parameters)==null?void 0:T.docs)==null?void 0:q.source}}};var $,F,L;d.parameters={...d.parameters,docs:{...($=d.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 26,
    background: '#fff',
    border: '1px solid #E7E1D8',
    borderRadius: 16,
    padding: 32
  }}>
      <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 14,
      alignItems: 'center'
    }}>
        <Button variant="primary">Primary</Button>
        <Button variant="accent">Accent</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
      <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 14,
      alignItems: 'center'
    }}>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button icon>With icon</Button>
        <Button disabled>Disabled</Button>
      </div>
    </div>
}`,...(L=(F=d.parameters)==null?void 0:F.docs)==null?void 0:L.source}}};const le=["Primary","Accent","Outline","Ghost","Disabled","Sizes","WithIcon","AllVariants"];export{t as Accent,d as AllVariants,i as Disabled,o as Ghost,s as Outline,n as Primary,l as Sizes,c as WithIcon,le as __namedExportsOrder,ie as default};
