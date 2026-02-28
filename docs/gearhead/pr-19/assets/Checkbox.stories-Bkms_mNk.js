import{j as r}from"./jsx-runtime-CFY_2KVU.js";import{$ as w}from"./Checkbox-BeXo_dSX.js";import{c as n}from"./cn-DjqsqOe8.js";import{C as R}from"./check-Be_n60n5.js";import"./index-Dq4ZvVuH.js";import"./_commonjsHelpers-CqkleIqs.js";import"./RSPContexts-Dr342rEE.js";import"./utils-LaqegW2K.js";import"./Form-C-hz59zZ.js";import"./useFocusRing-ubySK4Mk.js";import"./usePress-B20iDxoD.js";import"./textSelection-BF8X-_NC.js";import"./index-BodQkoVg.js";import"./index-N4qaH3Gp.js";import"./useToggle-C9uo3gsR.js";import"./useFormReset-BTJT5q7I.js";import"./useToggleState-bM5DcLtG.js";import"./useControlledState-BJxFPo-I.js";import"./VisuallyHidden-Bfe7IVUU.js";import"./createLucideIcon-BnGyhE3A.js";const T={orange:"group-data-[selected]:bg-[var(--accent-orange)] group-data-[selected]:border-[var(--accent-orange)]",blue:"group-data-[selected]:bg-[var(--accent-blue)] group-data-[selected]:border-[var(--accent-blue)]",green:"group-data-[selected]:bg-[var(--accent-green)] group-data-[selected]:border-[var(--accent-green)]",purple:"group-data-[selected]:bg-[var(--accent-purple)] group-data-[selected]:border-[var(--accent-purple)]"};function l({children:e,color:N="blue",className:y,...j}){return r.jsxs(w,{className:n("flex items-center gap-2 group cursor-default",y),...j,children:[r.jsx("div",{className:n("w-5 h-5 rounded border-2 border-border bg-input flex items-center justify-center transition-colors",T[N]),children:r.jsx(R,{className:"w-3 h-3 text-white opacity-0 group-data-[selected]:opacity-100 transition-opacity"})}),e&&r.jsx("span",{className:"text-sm text-foreground",children:e})]})}l.__docgenInfo={description:"",methods:[],displayName:"Checkbox",props:{children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},color:{required:!1,tsType:{name:"union",raw:"'orange' | 'blue' | 'green' | 'purple'",elements:[{name:"literal",value:"'orange'"},{name:"literal",value:"'blue'"},{name:"literal",value:"'green'"},{name:"literal",value:"'purple'"}]},description:"",defaultValue:{value:"'blue'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}},composes:["CheckboxProps"]};const W={title:"Components/Checkbox",component:l,tags:["autodocs"],argTypes:{color:{control:"select",options:["orange","blue","green","purple"]},isSelected:{control:"boolean"},defaultSelected:{control:"boolean"},isDisabled:{control:"boolean"},children:{control:"text"}}},a={args:{color:"blue",children:"Accept terms and conditions"}},o={args:{color:"green",defaultSelected:!0,children:"Subscribe to newsletter"}},t={args:{color:"blue",isDisabled:!0,children:"Disabled option"}},c={args:{color:"blue",isDisabled:!0,defaultSelected:!0,children:"Disabled & checked"}},s={render:()=>r.jsx("div",{className:"flex flex-col gap-3",children:["orange","blue","green","purple"].map(e=>r.jsx(l,{color:e,defaultSelected:!0,className:"capitalize",children:e},e))})};var d,i,p;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    color: 'blue',
    children: 'Accept terms and conditions'
  }
}`,...(p=(i=a.parameters)==null?void 0:i.docs)==null?void 0:p.source}}};var u,m,b;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    color: 'green',
    defaultSelected: true,
    children: 'Subscribe to newsletter'
  }
}`,...(b=(m=o.parameters)==null?void 0:m.docs)==null?void 0:b.source}}};var g,f,h;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    color: 'blue',
    isDisabled: true,
    children: 'Disabled option'
  }
}`,...(h=(f=t.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};var x,v,C;c.parameters={...c.parameters,docs:{...(x=c.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    color: 'blue',
    isDisabled: true,
    defaultSelected: true,
    children: 'Disabled & checked'
  }
}`,...(C=(v=c.parameters)==null?void 0:v.docs)==null?void 0:C.source}}};var D,S,k;s.parameters={...s.parameters,docs:{...(D=s.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-3">
      {(['orange', 'blue', 'green', 'purple'] as const).map(c => <Checkbox key={c} color={c} defaultSelected className="capitalize">{c}</Checkbox>)}
    </div>
}`,...(k=(S=s.parameters)==null?void 0:S.docs)==null?void 0:k.source}}};const X=["Default","Checked","Disabled","DisabledChecked","ColorPalette"];export{o as Checked,s as ColorPalette,a as Default,t as Disabled,c as DisabledChecked,X as __namedExportsOrder,W as default};
