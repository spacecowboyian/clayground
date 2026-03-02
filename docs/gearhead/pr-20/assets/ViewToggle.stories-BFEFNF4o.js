import{j as e}from"./jsx-runtime-CFY_2KVU.js";import{r as f}from"./index-Dq4ZvVuH.js";import{V as a}from"./ViewToggle-DT6Qrzo-.js";import"./_commonjsHelpers-CqkleIqs.js";import"./ToggleButton-BiCImOGv.js";import"./utils-LaqegW2K.js";import"./cn-DjqsqOe8.js";import"./SelectionIndicator-CoNWZYQ1.js";import"./useToggleState-bM5DcLtG.js";import"./useControlledState-BJxFPo-I.js";import"./useButton-BLdXFJ-e.js";import"./usePress-B20iDxoD.js";import"./useFocusRing-ubySK4Mk.js";import"./textSelection-BF8X-_NC.js";import"./index-BodQkoVg.js";import"./index-N4qaH3Gp.js";import"./createLucideIcon-BnGyhE3A.js";const k={title:"Components/ViewToggle",component:a,tags:["autodocs"],parameters:{layout:"padded"},args:{value:"list",onChange:()=>{}}},o={render:()=>{const[r,n]=f.useState("list");return e.jsxs("div",{className:"flex flex-col gap-4",children:[e.jsx(a,{value:r,onChange:n}),e.jsxs("p",{className:"text-sm text-muted-foreground",children:["Current mode: ",e.jsx("strong",{className:"text-foreground",children:r})]})]})}},t={render:()=>{const[r,n]=f.useState("grid");return e.jsx(a,{value:r,onChange:n})}},s={render:()=>e.jsx("div",{className:"flex flex-wrap gap-4",children:["orange","blue","green","purple"].map(r=>e.jsxs("div",{className:"flex flex-col items-center gap-2",children:[e.jsx(a,{value:"grid",onChange:()=>{},color:r}),e.jsx("span",{className:"text-xs text-muted-foreground capitalize",children:r})]},r))})};var d,l,m;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => {
    const [mode, setMode] = useState<ViewMode>('list');
    return <div className="flex flex-col gap-4">
        <ViewToggle value={mode} onChange={setMode} />
        <p className="text-sm text-muted-foreground">Current mode: <strong className="text-foreground">{mode}</strong></p>
      </div>;
  }
}`,...(m=(l=o.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var i,c,p;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: () => {
    const [mode, setMode] = useState<ViewMode>('grid');
    return <ViewToggle value={mode} onChange={setMode} />;
  }
}`,...(p=(c=t.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var u,g,x;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-4">
      {(['orange', 'blue', 'green', 'purple'] as const).map(color => <div key={color} className="flex flex-col items-center gap-2">
          <ViewToggle value="grid" onChange={() => {}} color={color} />
          <span className="text-xs text-muted-foreground capitalize">{color}</span>
        </div>)}
    </div>
}`,...(x=(g=s.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};const O=["Default","GridSelected","ColorVariants"];export{s as ColorVariants,o as Default,t as GridSelected,O as __namedExportsOrder,k as default};
