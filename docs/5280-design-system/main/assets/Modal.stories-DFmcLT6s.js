import{j as n}from"./jsx-runtime-Cf8x2fCZ.js";import{r as l}from"./index-Dx_1l3Sb.js";import{M as i}from"./Modal-CtJXWPR4.js";import{s as u,c as r,f}from"./tokens-PUChd5-i.js";import{u as c}from"./useHover-DxhSpJwM.js";import"./index-yBjzXJbu.js";import"./_commonjsHelpers-CqkleIqs.js";const v={title:"Components/Modal",component:i,tags:["autodocs"]};function m({onClick:s}){const{isHovered:e,hoverProps:d}=c();return n.jsx("button",{type:"button",onClick:s,...d,style:{fontFamily:f.ui,fontWeight:600,fontSize:15,background:r.pine,color:r.paper,border:"none",padding:"13px 26px",borderRadius:999,cursor:"pointer",transition:`transform .22s ${u}`,transform:e?"translateY(-2px)":"none"},children:"Open modal"})}const o={args:{isOpen:!1,onClose:()=>{}},render:()=>{const[s,e]=l.useState(!1);return n.jsxs("div",{style:{background:"#fff",border:"1px solid #E7E1D8",borderRadius:16,padding:32},children:[n.jsx(m,{onClick:()=>e(!0)}),n.jsx(i,{isOpen:s,onClose:()=>e(!1)})]})}};var t,a,p;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    isOpen: false,
    onClose: () => {}
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return <div style={{
      background: '#fff',
      border: '1px solid #E7E1D8',
      borderRadius: 16,
      padding: 32
    }}>
        <OpenModalButton onClick={() => setIsOpen(true)} />
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>;
  }
}`,...(p=(a=o.parameters)==null?void 0:a.docs)==null?void 0:p.source}}};const M=["Default"];export{o as Default,M as __namedExportsOrder,v as default};
