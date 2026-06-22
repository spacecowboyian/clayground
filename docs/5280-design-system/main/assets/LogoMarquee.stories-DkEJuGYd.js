import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{c as i,f as c}from"./tokens-PUChd5-i.js";import"./index-yBjzXJbu.js";const m=["PTBA","Altitude","Northbound","Cardinal Co.","Rivertown","Field & Co."];function a({logos:t,hidden:n}){return e.jsx("div",{"aria-hidden":n?"true":void 0,style:{display:"flex",gap:48,paddingRight:48,alignItems:"center"},children:t.map((u,p)=>e.jsx("div",{style:{fontFamily:c.display,fontWeight:800,fontSize:22,color:"#C9C2B6"},children:u},p))})}function o({logos:t=m,label:n="We really like working with these folks"}){return e.jsxs("div",{style:{background:"#fff",border:`1px solid ${i.border}`,borderRadius:16,padding:"30px 0",overflow:"hidden"},children:[e.jsx("div",{style:{fontFamily:c.ui,fontSize:11,letterSpacing:".2em",textTransform:"uppercase",color:i.muted,textAlign:"center",marginBottom:22},children:n}),e.jsxs("div",{style:{display:"flex",width:"max-content",animation:"sc-marquee 22s linear infinite"},children:[e.jsx(a,{logos:t}),e.jsx(a,{logos:t,hidden:!0})]})]})}o.__docgenInfo={description:"Continuously scrolling client logo strip with two duplicated tracks.",methods:[],displayName:"LogoMarquee",props:{logos:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"Client logo names rendered in the scrolling strip.",defaultValue:{value:`[
  'PTBA',
  'Altitude',
  'Northbound',
  'Cardinal Co.',
  'Rivertown',
  'Field & Co.',
]`,computed:!1}},label:{required:!1,tsType:{name:"string"},description:"Small uppercase label above the track.",defaultValue:{value:"'We really like working with these folks'",computed:!1}}}};const x={title:"Components/Logo Marquee",component:o,tags:["autodocs"],parameters:{layout:"fullscreen"}},r={render:()=>e.jsx("div",{style:{padding:40},children:e.jsx(o,{})})};var s,l,d;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: 40
  }}>
      <LogoMarquee />
    </div>
}`,...(d=(l=r.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};const y=["Default"];export{r as Default,y as __namedExportsOrder,x as default};
