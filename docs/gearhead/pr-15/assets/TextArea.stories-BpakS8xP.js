import{j as e}from"./jsx-runtime-CFY_2KVU.js";import{$ as w}from"./FieldError-7evEVdN1.js";import{a as M}from"./Label-ZdcYzoi0.js";import{$ as E}from"./Text-VdVr9Ew-.js";import{$ as S,a as W}from"./TextField-2A2py1Iz.js";import{c as n}from"./cn-DjqsqOe8.js";import"./index-Dq4ZvVuH.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-LaqegW2K.js";import"./useLabels-CQ1wxQuf.js";import"./Hidden-o7BpdpsO.js";import"./RSPContexts-Dr342rEE.js";import"./Form-C-hz59zZ.js";import"./useFocusRing-ubySK4Mk.js";import"./Input-DanMQf3D.js";import"./useFormReset-BTJT5q7I.js";import"./useControlledState-BJxFPo-I.js";import"./useField-DNsN5OOF.js";const _={orange:"focus:ring-[var(--accent-orange)]",blue:"focus:ring-[var(--accent-blue)]",green:"focus:ring-[var(--accent-green)]",purple:"focus:ring-[var(--accent-purple)]"};function $({label:t,description:l,errorMessage:T,placeholder:C,focusColor:v="blue",rows:N=4,className:q,textareaClassName:D,...j}){return e.jsxs(S,{className:n("flex flex-col gap-2",q),...j,children:[t&&e.jsx(M,{className:"text-sm text-foreground",children:t}),e.jsx(W,{placeholder:C,rows:N,className:n("px-3 py-2 bg-input rounded-lg border border-border text-foreground resize-y","placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-0",_[v],D)}),l&&e.jsx(E,{slot:"description",className:"text-xs text-muted-foreground",children:l}),e.jsx(w,{className:"text-xs text-destructive",children:T})]})}$.__docgenInfo={description:"",methods:[],displayName:"TextArea",props:{label:{required:!1,tsType:{name:"string"},description:""},description:{required:!1,tsType:{name:"string"},description:""},errorMessage:{required:!1,tsType:{name:"string"},description:""},placeholder:{required:!1,tsType:{name:"string"},description:""},focusColor:{required:!1,tsType:{name:"union",raw:"'orange' | 'blue' | 'green' | 'purple'",elements:[{name:"literal",value:"'orange'"},{name:"literal",value:"'blue'"},{name:"literal",value:"'green'"},{name:"literal",value:"'purple'"}]},description:"",defaultValue:{value:"'blue'",computed:!1}},rows:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"4",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""},textareaClassName:{required:!1,tsType:{name:"string"},description:""}},composes:["TextFieldProps"]};const Y={title:"Components/TextArea",component:$,tags:["autodocs"],argTypes:{focusColor:{control:"select",options:["orange","blue","green","purple"]},label:{control:"text"},placeholder:{control:"text"},rows:{control:"number"}}},r={args:{label:"Message",placeholder:"Enter your message...",focusColor:"blue"}},o={args:{label:"Notes",placeholder:"Write your notes here...",rows:8,focusColor:"green"}},s={args:{label:"Bio",placeholder:"Tell us about yourself",description:"Maximum 500 characters.",focusColor:"purple"}},a={args:{label:"Comments",placeholder:"Comments disabled",isDisabled:!0}};var c,i,p;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    label: 'Message',
    placeholder: 'Enter your message...',
    focusColor: 'blue'
  }
}`,...(p=(i=r.parameters)==null?void 0:i.docs)==null?void 0:p.source}}};var u,m,d;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    label: 'Notes',
    placeholder: 'Write your notes here...',
    rows: 8,
    focusColor: 'green'
  }
}`,...(d=(m=o.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var f,g,b;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself',
    description: 'Maximum 500 characters.',
    focusColor: 'purple'
  }
}`,...(b=(g=s.parameters)==null?void 0:g.docs)==null?void 0:b.source}}};var x,h,y;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    label: 'Comments',
    placeholder: 'Comments disabled',
    isDisabled: true
  }
}`,...(y=(h=a.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};const Z=["Default","Tall","WithDescription","Disabled"];export{r as Default,a as Disabled,o as Tall,s as WithDescription,Z as __namedExportsOrder,Y as default};
