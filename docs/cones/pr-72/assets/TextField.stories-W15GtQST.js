import{j as r}from"./jsx-runtime-Cf8x2fCZ.js";import{$ as w}from"./FieldError-_eDrgAjd.js";import{c as S}from"./useTextField-YBVDUWHR.js";import{a as U}from"./useLabel-DecDrJvF.js";import{$ as W}from"./Text-Bn2MnSxE.js";import{$ as _}from"./TextField-DZHFF2KA.js";import{c as i}from"./cn-DjqsqOe8.js";import"./index-yBjzXJbu.js";import"./filterDOMProps--ZktyO9b.js";import"./index-Dx_1l3Sb.js";import"./_commonjsHelpers-CqkleIqs.js";import"./useHover-2nYSjO6d.js";import"./Hidden-CUdQ9qGV.js";import"./useField-63t4_CSt.js";import"./useFormReset-CWPUIR94.js";import"./useFormValidation-IN6bGenm.js";import"./useControlledState-C3twlykq.js";import"./useLabels-E9QH9sio.js";import"./Autocomplete-BTFG-eR4.js";import"./Form-BUiea3vT.js";const J={orange:"focus:ring-[var(--accent-orange)]",blue:"focus:ring-[var(--accent-blue)]",green:"focus:ring-[var(--accent-green)]",purple:"focus:ring-[var(--accent-purple)]"};function n({label:e,description:c,errorMessage:N,placeholder:D,focusColor:F="blue",className:j,inputClassName:E,...R}){return r.jsxs(_,{className:i("flex flex-col gap-2",j),...R,children:[e&&r.jsx(U,{className:"text-sm text-foreground",children:e}),r.jsx(S,{placeholder:D,className:i("h-10 px-3 bg-input rounded-lg border border-border text-foreground","placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-0",J[F],E)}),c&&r.jsx(W,{slot:"description",className:"text-xs text-muted-foreground",children:c}),r.jsx(w,{className:"text-xs text-destructive",children:N})]})}n.__docgenInfo={description:"",methods:[],displayName:"TextField",props:{label:{required:!1,tsType:{name:"string"},description:""},description:{required:!1,tsType:{name:"string"},description:""},errorMessage:{required:!1,tsType:{name:"string"},description:""},placeholder:{required:!1,tsType:{name:"string"},description:""},focusColor:{required:!1,tsType:{name:"union",raw:"'orange' | 'blue' | 'green' | 'purple'",elements:[{name:"literal",value:"'orange'"},{name:"literal",value:"'blue'"},{name:"literal",value:"'green'"},{name:"literal",value:"'purple'"}]},description:"",defaultValue:{value:"'blue'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""},inputClassName:{required:!1,tsType:{name:"string"},description:""}},composes:["AriaTextFieldProps"]};const ae={title:"Components/TextField",component:n,tags:["autodocs"],argTypes:{focusColor:{control:"select",options:["orange","blue","green","purple"]},label:{control:"text"},placeholder:{control:"text"},description:{control:"text"},isDisabled:{control:"boolean"},isRequired:{control:"boolean"}}},o={args:{label:"Username",placeholder:"Enter username",focusColor:"blue"}},a={args:{label:"Email",placeholder:"email@example.com",description:"We will never share your email.",focusColor:"green",type:"email"}},s={args:{label:"Full Name",placeholder:"John Doe",isRequired:!0,focusColor:"orange"}},l={args:{label:"Username",placeholder:"Enter username",isDisabled:!0,focusColor:"blue"}},t={render:()=>r.jsx("div",{className:"flex flex-col gap-4 w-72",children:["orange","blue","green","purple"].map(e=>r.jsx(n,{label:`Focus: ${e}`,placeholder:`${e} focus ring`,focusColor:e},e))})};var p,u,m;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    focusColor: 'blue'
  }
}`,...(m=(u=o.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};var d,f,g;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    label: 'Email',
    placeholder: 'email@example.com',
    description: 'We will never share your email.',
    focusColor: 'green',
    type: 'email'
  }
}`,...(g=(f=a.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};var b,x,h;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    label: 'Full Name',
    placeholder: 'John Doe',
    isRequired: true,
    focusColor: 'orange'
  }
}`,...(h=(x=s.parameters)==null?void 0:x.docs)==null?void 0:h.source}}};var $,C,v;l.parameters={...l.parameters,docs:{...($=l.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    isDisabled: true,
    focusColor: 'blue'
  }
}`,...(v=(C=l.parameters)==null?void 0:C.docs)==null?void 0:v.source}}};var y,T,q;t.parameters={...t.parameters,docs:{...(y=t.parameters)==null?void 0:y.docs,source:{originalSource:"{\n  render: () => <div className=\"flex flex-col gap-4 w-72\">\n      {(['orange', 'blue', 'green', 'purple'] as const).map(c => <TextField key={c} label={`Focus: ${c}`} placeholder={`${c} focus ring`} focusColor={c} />)}\n    </div>\n}",...(q=(T=t.parameters)==null?void 0:T.docs)==null?void 0:q.source}}};const se=["Default","WithDescription","Required","Disabled","FocusColors"];export{o as Default,l as Disabled,t as FocusColors,s as Required,a as WithDescription,se as __namedExportsOrder,ae as default};
