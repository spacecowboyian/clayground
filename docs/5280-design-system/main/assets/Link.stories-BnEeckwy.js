import{j as t}from"./jsx-runtime-Cf8x2fCZ.js";import{c as e,f as b}from"./tokens-PUChd5-i.js";import{u as k}from"./useHover-DxhSpJwM.js";import"./index-yBjzXJbu.js";import"./index-Dx_1l3Sb.js";import"./_commonjsHelpers-CqkleIqs.js";function n({href:l,children:p,...f}){const{isHovered:h,hoverProps:u}=k(),g={fontFamily:b.ui,fontWeight:600,fontSize:15,color:e.jade,textDecoration:"none",borderBottom:`2px solid ${e.jade}`,paddingBottom:2,transition:"color .2s ease,border-color .2s ease"},x={color:e.red,borderColor:e.red};return t.jsx("a",{...f,...u,href:l,style:{...g,...h?x:{}},children:p})}n.__docgenInfo={description:"Underlined text link: jade → red on hover, with matching border-color.",methods:[],displayName:"Link",props:{href:{required:!0,tsType:{name:"string"},description:"Destination URL."},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};const L={title:"Components/Link",component:n,tags:["autodocs"]},r={args:{href:"#buttons",children:"Text link →"}},o={render:()=>t.jsxs("p",{style:{fontFamily:"'Minion 3','Source Serif 4',Georgia,serif",fontSize:17,color:"#5C6B68",maxWidth:"60ch",margin:0},children:["Pine is the workhorse; red is reserved for the single most important action on a screen. Need a refresher? ",t.jsx(n,{href:"#buttons",children:"Read the button guidelines →"})]})};var s,i,a;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    href: '#buttons',
    children: 'Text link →'
  }
}`,...(a=(i=r.parameters)==null?void 0:i.docs)==null?void 0:a.source}}};var d,c,m;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => <p style={{
    fontFamily: "'Minion 3','Source Serif 4',Georgia,serif",
    fontSize: 17,
    color: '#5C6B68',
    maxWidth: '60ch',
    margin: 0
  }}>
      Pine is the workhorse; red is reserved for the single most important
      action on a screen. Need a refresher? <Link href="#buttons">Read the button guidelines →</Link>
    </p>
}`,...(m=(c=o.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};const N=["Default","InContext"];export{r as Default,o as InContext,N as __namedExportsOrder,L as default};
