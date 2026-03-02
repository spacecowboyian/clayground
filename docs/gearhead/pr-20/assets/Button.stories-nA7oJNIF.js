import{j as r}from"./jsx-runtime-CFY_2KVU.js";import{B as e}from"./Button-DUSK_GUh.js";import{D as X}from"./download-Fc3s7BHs.js";import{c as H}from"./createLucideIcon-BnGyhE3A.js";import{C as L}from"./check-Be_n60n5.js";import{X as M}from"./x-BEzLMO8q.js";import"./index-Dq4ZvVuH.js";import"./_commonjsHelpers-CqkleIqs.js";import"./Button-kWM7j8ju.js";import"./utils-LaqegW2K.js";import"./cn-DjqsqOe8.js";import"./ProgressBar-C-avWlme.js";import"./Label-ZdcYzoi0.js";import"./useLabels-CQ1wxQuf.js";import"./Hidden-o7BpdpsO.js";import"./useNumberFormatter-BKAMG5zQ.js";import"./context-DWzCBS5d.js";import"./useButton-BLdXFJ-e.js";import"./usePress-B20iDxoD.js";import"./useFocusRing-ubySK4Mk.js";import"./textSelection-BF8X-_NC.js";import"./index-BodQkoVg.js";import"./index-N4qaH3Gp.js";/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]],T=H("upload",R),gr={title:"Components/Button",component:e,tags:["autodocs"],argTypes:{variant:{control:"select",options:["primary","secondary","outline","ghost","destructive","icon"]},color:{control:"select",options:["orange","blue","green","purple","red"]},isDisabled:{control:"boolean"},children:{control:"text"}}},a={args:{variant:"primary",color:"orange",children:"Primary Action"}},o={args:{variant:"secondary",color:"orange",children:"Secondary Action"}},n={args:{variant:"outline",children:"Outline"}},t={args:{variant:"ghost",children:"Ghost"}},s={args:{variant:"destructive",children:"Delete"}},i={args:{variant:"primary",color:"orange",children:"Disabled",isDisabled:!0}},c={render:()=>r.jsx("div",{className:"flex flex-wrap gap-3",children:["orange","blue","green","purple","red"].map(m=>r.jsx(e,{variant:"primary",color:m,className:"capitalize",children:m},m))})},l={render:()=>r.jsxs("div",{className:"flex gap-3",children:[r.jsx(e,{variant:"icon",color:"orange",children:r.jsx(X,{className:"w-5 h-5"})}),r.jsx(e,{variant:"icon",color:"blue",children:r.jsx(T,{className:"w-5 h-5"})}),r.jsx(e,{variant:"icon",color:"green",children:r.jsx(L,{className:"w-5 h-5"})}),r.jsx(e,{variant:"icon",color:"red",children:r.jsx(M,{className:"w-5 h-5"})})]})},d={render:()=>r.jsxs("div",{className:"flex flex-wrap gap-3",children:[r.jsx(e,{variant:"primary",color:"orange",children:"Primary"}),r.jsx(e,{variant:"secondary",color:"orange",children:"Secondary"}),r.jsx(e,{variant:"outline",children:"Outline"}),r.jsx(e,{variant:"ghost",children:"Ghost"}),r.jsx(e,{variant:"destructive",children:"Destructive"}),r.jsx(e,{variant:"primary",color:"orange",isDisabled:!0,children:"Disabled"})]})};var p,u,g;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    color: 'orange',
    children: 'Primary Action'
  }
}`,...(g=(u=a.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var v,h,y;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    color: 'orange',
    children: 'Secondary Action'
  }
}`,...(y=(h=o.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};var x,B,j;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    variant: 'outline',
    children: 'Outline'
  }
}`,...(j=(B=n.parameters)==null?void 0:B.docs)==null?void 0:j.source}}};var D,b,f;t.parameters={...t.parameters,docs:{...(D=t.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    variant: 'ghost',
    children: 'Ghost'
  }
}`,...(f=(b=t.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};var N,w,S;s.parameters={...s.parameters,docs:{...(N=s.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    variant: 'destructive',
    children: 'Delete'
  }
}`,...(S=(w=s.parameters)==null?void 0:w.docs)==null?void 0:S.source}}};var P,O,k;i.parameters={...i.parameters,docs:{...(P=i.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    color: 'orange',
    children: 'Disabled',
    isDisabled: true
  }
}`,...(k=(O=i.parameters)==null?void 0:O.docs)==null?void 0:k.source}}};var A,C,G;c.parameters={...c.parameters,docs:{...(A=c.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-3">
      {(['orange', 'blue', 'green', 'purple', 'red'] as const).map(c => <Button key={c} variant="primary" color={c} className="capitalize">{c}</Button>)}
    </div>
}`,...(G=(C=c.parameters)==null?void 0:C.docs)==null?void 0:G.source}}};var _,I,z;l.parameters={...l.parameters,docs:{...(_=l.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => <div className="flex gap-3">
      <Button variant="icon" color="orange"><Download className="w-5 h-5" /></Button>
      <Button variant="icon" color="blue"><Upload className="w-5 h-5" /></Button>
      <Button variant="icon" color="green"><Check className="w-5 h-5" /></Button>
      <Button variant="icon" color="red"><X className="w-5 h-5" /></Button>
    </div>
}`,...(z=(I=l.parameters)==null?void 0:I.docs)==null?void 0:z.source}}};var E,U,V;d.parameters={...d.parameters,docs:{...(E=d.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-3">
      <Button variant="primary" color="orange">Primary</Button>
      <Button variant="secondary" color="orange">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="primary" color="orange" isDisabled>Disabled</Button>
    </div>
}`,...(V=(U=d.parameters)==null?void 0:U.docs)==null?void 0:V.source}}};const vr=["Primary","Secondary","Outline","Ghost","Destructive","Disabled","ColorPalette","IconButtons","AllVariants"];export{d as AllVariants,c as ColorPalette,s as Destructive,i as Disabled,t as Ghost,l as IconButtons,n as Outline,a as Primary,o as Secondary,vr as __namedExportsOrder,gr as default};
