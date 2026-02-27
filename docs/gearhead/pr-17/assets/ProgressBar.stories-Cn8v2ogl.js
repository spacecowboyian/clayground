import{j as e}from"./jsx-runtime-CFY_2KVU.js";import{a as T}from"./Label-ZdcYzoi0.js";import{$ as V}from"./ProgressBar-C-avWlme.js";import{c as u}from"./cn-DjqsqOe8.js";import"./index-Dq4ZvVuH.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-LaqegW2K.js";import"./useLabels-CQ1wxQuf.js";import"./Hidden-o7BpdpsO.js";import"./useNumberFormatter-BKAMG5zQ.js";import"./context-DWzCBS5d.js";const q={orange:"bg-[var(--accent-orange)]",blue:"bg-[var(--accent-blue)]",green:"bg-[var(--accent-green)]",purple:"bg-[var(--accent-purple)]",red:"bg-[var(--accent-red)]"};function c({label:r,color:n="blue",showValue:p=!0,className:C,...E}){return e.jsx(V,{className:u("flex flex-col gap-2",C),...E,children:({percentage:B,valueText:S})=>e.jsxs(e.Fragment,{children:[(r||p)&&e.jsxs("div",{className:"flex justify-between text-sm",children:[r&&e.jsx(T,{className:"text-foreground",children:r}),p&&e.jsx("span",{className:"text-muted-foreground",children:S})]}),e.jsx("div",{className:"w-full h-2 bg-secondary rounded-full overflow-hidden",children:e.jsx("div",{className:u("h-full transition-all duration-300",q[n]),style:{width:`${B}%`}})})]})})}c.__docgenInfo={description:"",methods:[],displayName:"ProgressBar",props:{label:{required:!1,tsType:{name:"string"},description:""},color:{required:!1,tsType:{name:"union",raw:"'orange' | 'blue' | 'green' | 'purple' | 'red'",elements:[{name:"literal",value:"'orange'"},{name:"literal",value:"'blue'"},{name:"literal",value:"'green'"},{name:"literal",value:"'purple'"},{name:"literal",value:"'red'"}]},description:"",defaultValue:{value:"'blue'",computed:!1}},showValue:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}},composes:["ProgressBarProps"]};const G={title:"Components/ProgressBar",component:c,tags:["autodocs"],argTypes:{color:{control:"select",options:["orange","blue","green","purple","red"]},label:{control:"text"},value:{control:{type:"range",min:0,max:100,step:1}},showValue:{control:"boolean"}}},a={args:{label:"Loading",value:60,color:"blue"}},o={args:{label:"Upload complete",value:100,color:"green"}},l={args:{label:"Error Rate",value:20,color:"red"}},s={args:{value:45,color:"purple",showValue:!1}},t={render:()=>e.jsx("div",{className:"flex flex-col gap-4 w-80",children:["orange","blue","green","purple","red"].map((r,n)=>e.jsx(c,{label:r,value:(n+1)*18,color:r,className:"capitalize"},r))})};var d,m,i;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    label: 'Loading',
    value: 60,
    color: 'blue'
  }
}`,...(i=(m=a.parameters)==null?void 0:m.docs)==null?void 0:i.source}}};var g,f,b;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    label: 'Upload complete',
    value: 100,
    color: 'green'
  }
}`,...(b=(f=o.parameters)==null?void 0:f.docs)==null?void 0:b.source}}};var v,x,h;l.parameters={...l.parameters,docs:{...(v=l.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    label: 'Error Rate',
    value: 20,
    color: 'red'
  }
}`,...(h=(x=l.parameters)==null?void 0:x.docs)==null?void 0:h.source}}};var N,j,y;s.parameters={...s.parameters,docs:{...(N=s.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    value: 45,
    color: 'purple',
    showValue: false
  }
}`,...(y=(j=s.parameters)==null?void 0:j.docs)==null?void 0:y.source}}};var w,P,$;t.parameters={...t.parameters,docs:{...(w=t.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4 w-80">
      {(['orange', 'blue', 'green', 'purple', 'red'] as const).map((c, i) => <ProgressBar key={c} label={c} value={(i + 1) * 18} color={c} className="capitalize" />)}
    </div>
}`,...($=(P=t.parameters)==null?void 0:P.docs)==null?void 0:$.source}}};const H=["Default","Complete","Error","NoLabel","ColorPalette"];export{t as ColorPalette,o as Complete,a as Default,l as Error,s as NoLabel,H as __namedExportsOrder,G as default};
