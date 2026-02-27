import{j as r}from"./jsx-runtime-CFY_2KVU.js";import{$ as w}from"./FieldError-7evEVdN1.js";import{c as S}from"./Input-DanMQf3D.js";import{a as U}from"./Label-ZdcYzoi0.js";import{$ as W}from"./Text-VdVr9Ew-.js";import{$ as _}from"./TextField-2A2py1Iz.js";import{c as i}from"./cn-DjqsqOe8.js";import"./index-Dq4ZvVuH.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-LaqegW2K.js";import"./useFormReset-BTJT5q7I.js";import"./useFocusRing-ubySK4Mk.js";import"./useControlledState-BJxFPo-I.js";import"./useField-DNsN5OOF.js";import"./Form-C-hz59zZ.js";import"./Hidden-o7BpdpsO.js";import"./useLabels-CQ1wxQuf.js";import"./RSPContexts-Dr342rEE.js";const J={orange:"focus:ring-[var(--accent-orange)]",blue:"focus:ring-[var(--accent-blue)]",green:"focus:ring-[var(--accent-green)]",purple:"focus:ring-[var(--accent-purple)]"};function t({label:e,description:c,errorMessage:N,placeholder:D,focusColor:F="blue",className:j,inputClassName:E,...R}){return r.jsxs(_,{className:i("flex flex-col gap-2",j),...R,children:[e&&r.jsx(U,{className:"text-sm text-foreground",children:e}),r.jsx(S,{placeholder:D,className:i("px-3 py-2 bg-input rounded-lg border border-border text-foreground","placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-0",J[F],E)}),c&&r.jsx(W,{slot:"description",className:"text-xs text-muted-foreground",children:c}),r.jsx(w,{className:"text-xs text-destructive",children:N})]})}t.__docgenInfo={description:"",methods:[],displayName:"TextField",props:{label:{required:!1,tsType:{name:"string"},description:""},description:{required:!1,tsType:{name:"string"},description:""},errorMessage:{required:!1,tsType:{name:"string"},description:""},placeholder:{required:!1,tsType:{name:"string"},description:""},focusColor:{required:!1,tsType:{name:"union",raw:"'orange' | 'blue' | 'green' | 'purple'",elements:[{name:"literal",value:"'orange'"},{name:"literal",value:"'blue'"},{name:"literal",value:"'green'"},{name:"literal",value:"'purple'"}]},description:"",defaultValue:{value:"'blue'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""},inputClassName:{required:!1,tsType:{name:"string"},description:""}},composes:["AriaTextFieldProps"]};const re={title:"Components/TextField",component:t,tags:["autodocs"],argTypes:{focusColor:{control:"select",options:["orange","blue","green","purple"]},label:{control:"text"},placeholder:{control:"text"},description:{control:"text"},isDisabled:{control:"boolean"},isRequired:{control:"boolean"}}},o={args:{label:"Username",placeholder:"Enter username",focusColor:"blue"}},s={args:{label:"Email",placeholder:"email@example.com",description:"We will never share your email.",focusColor:"green",type:"email"}},a={args:{label:"Full Name",placeholder:"John Doe",isRequired:!0,focusColor:"orange"}},l={args:{label:"Username",placeholder:"Enter username",isDisabled:!0,focusColor:"blue"}},n={render:()=>r.jsx("div",{className:"flex flex-col gap-4 w-72",children:["orange","blue","green","purple"].map(e=>r.jsx(t,{label:`Focus: ${e}`,placeholder:`${e} focus ring`,focusColor:e},e))})};var p,u,m;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    focusColor: 'blue'
  }
}`,...(m=(u=o.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};var d,f,g;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    label: 'Email',
    placeholder: 'email@example.com',
    description: 'We will never share your email.',
    focusColor: 'green',
    type: 'email'
  }
}`,...(g=(f=s.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};var b,x,h;a.parameters={...a.parameters,docs:{...(b=a.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    label: 'Full Name',
    placeholder: 'John Doe',
    isRequired: true,
    focusColor: 'orange'
  }
}`,...(h=(x=a.parameters)==null?void 0:x.docs)==null?void 0:h.source}}};var $,C,v;l.parameters={...l.parameters,docs:{...($=l.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    isDisabled: true,
    focusColor: 'blue'
  }
}`,...(v=(C=l.parameters)==null?void 0:C.docs)==null?void 0:v.source}}};var y,T,q;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:"{\n  render: () => <div className=\"flex flex-col gap-4 w-72\">\n      {(['orange', 'blue', 'green', 'purple'] as const).map(c => <TextField key={c} label={`Focus: ${c}`} placeholder={`${c} focus ring`} focusColor={c} />)}\n    </div>\n}",...(q=(T=n.parameters)==null?void 0:T.docs)==null?void 0:q.source}}};const oe=["Default","WithDescription","Required","Disabled","FocusColors"];export{o as Default,l as Disabled,n as FocusColors,a as Required,s as WithDescription,oe as __namedExportsOrder,re as default};
