import{j as e}from"./jsx-runtime-CFY_2KVU.js";import{$ as _}from"./ToggleButton-BiCImOGv.js";import{c as A}from"./cn-DjqsqOe8.js";import{S as c}from"./star-sK8VX0BB.js";import{c as j}from"./createLucideIcon-BnGyhE3A.js";import{C as B}from"./check-Be_n60n5.js";import"./index-Dq4ZvVuH.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-LaqegW2K.js";import"./SelectionIndicator-CoNWZYQ1.js";import"./useToggleState-bM5DcLtG.js";import"./useControlledState-BJxFPo-I.js";import"./useButton-BLdXFJ-e.js";import"./usePress-B20iDxoD.js";import"./useFocusRing-ubySK4Mk.js";import"./textSelection-BF8X-_NC.js";import"./index-BodQkoVg.js";import"./index-N4qaH3Gp.js";/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=[["path",{d:"M10.268 21a2 2 0 0 0 3.464 0",key:"vwvbt9"}],["path",{d:"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",key:"11g9vi"}]],S=j("bell",L);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}]],y=j("heart",R),$={orange:"data-[selected]:bg-[var(--accent-orange)] data-[selected]:text-white data-[selected]:border-[var(--accent-orange)]",blue:"data-[selected]:bg-[var(--accent-blue)] data-[selected]:text-white data-[selected]:border-[var(--accent-blue)]",green:"data-[selected]:bg-[var(--accent-green)] data-[selected]:text-white data-[selected]:border-[var(--accent-green)]",purple:"data-[selected]:bg-[var(--accent-purple)] data-[selected]:text-white data-[selected]:border-[var(--accent-purple)]"};function r({color:D="blue",className:k,children:C,...F}){return e.jsx(_,{className:A("inline-flex items-center gap-2 px-4 py-2 bg-secondary text-foreground rounded-lg","hover:bg-muted transition-colors border border-border cursor-default outline-none","focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",$[D],k),...F,children:C})}r.__docgenInfo={description:"",methods:[],displayName:"ToggleButton",props:{color:{required:!1,tsType:{name:"union",raw:"'orange' | 'blue' | 'green' | 'purple'",elements:[{name:"literal",value:"'orange'"},{name:"literal",value:"'blue'"},{name:"literal",value:"'green'"},{name:"literal",value:"'purple'"}]},description:"",defaultValue:{value:"'blue'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}},composes:["ToggleButtonProps"]};const ee={title:"Components/ToggleButton",component:r,tags:["autodocs"],argTypes:{color:{control:"select",options:["orange","blue","green","purple"]},isSelected:{control:"boolean"},isDisabled:{control:"boolean"},children:{control:"text"}}},o={args:{color:"orange",children:"Toggle me"}},a={args:{color:"orange",children:e.jsxs(e.Fragment,{children:[e.jsx(c,{className:"w-4 h-4"}),"Favorite"]})}},t={args:{color:"blue",isDisabled:!0,children:"Disabled toggle"}},l={render:()=>e.jsxs("div",{className:"flex flex-wrap gap-3",children:[e.jsxs(r,{color:"orange",children:[e.jsx(c,{className:"w-4 h-4"}),"Favorite"]}),e.jsxs(r,{color:"blue",children:[e.jsx(y,{className:"w-4 h-4"}),"Like"]}),e.jsxs(r,{color:"green",children:[e.jsx(B,{className:"w-4 h-4"}),"Done"]}),e.jsxs(r,{color:"purple",children:[e.jsx(S,{className:"w-4 h-4"}),"Notify"]})]})},s={render:()=>e.jsxs("div",{className:"flex flex-wrap gap-3",children:[e.jsxs(r,{color:"orange",defaultSelected:!0,children:[e.jsx(c,{className:"w-4 h-4"}),"Favorite"]}),e.jsxs(r,{color:"blue",defaultSelected:!0,children:[e.jsx(y,{className:"w-4 h-4"}),"Like"]}),e.jsxs(r,{color:"green",defaultSelected:!0,children:[e.jsx(B,{className:"w-4 h-4"}),"Done"]}),e.jsxs(r,{color:"purple",defaultSelected:!0,children:[e.jsx(S,{className:"w-4 h-4"}),"Notify"]})]})};var n,d,i;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    color: 'orange',
    children: 'Toggle me'
  }
}`,...(i=(d=o.parameters)==null?void 0:d.docs)==null?void 0:i.source}}};var g,u,p;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    color: 'orange',
    children: <><Star className="w-4 h-4" />Favorite</> as any
  }
}`,...(p=(u=a.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};var m,h,f;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    color: 'blue',
    isDisabled: true,
    children: 'Disabled toggle'
  }
}`,...(f=(h=t.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};var b,x,v;l.parameters={...l.parameters,docs:{...(b=l.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-3">
      <ToggleButton color="orange"><Star className="w-4 h-4" />Favorite</ToggleButton>
      <ToggleButton color="blue"><Heart className="w-4 h-4" />Like</ToggleButton>
      <ToggleButton color="green"><Check className="w-4 h-4" />Done</ToggleButton>
      <ToggleButton color="purple"><Bell className="w-4 h-4" />Notify</ToggleButton>
    </div>
}`,...(v=(x=l.parameters)==null?void 0:x.docs)==null?void 0:v.source}}};var N,w,T;s.parameters={...s.parameters,docs:{...(N=s.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-3">
      <ToggleButton color="orange" defaultSelected><Star className="w-4 h-4" />Favorite</ToggleButton>
      <ToggleButton color="blue" defaultSelected><Heart className="w-4 h-4" />Like</ToggleButton>
      <ToggleButton color="green" defaultSelected><Check className="w-4 h-4" />Done</ToggleButton>
      <ToggleButton color="purple" defaultSelected><Bell className="w-4 h-4" />Notify</ToggleButton>
    </div>
}`,...(T=(w=s.parameters)==null?void 0:w.docs)==null?void 0:T.source}}};const re=["Default","Favorite","Disabled","ColorPalette","AllSelected"];export{s as AllSelected,l as ColorPalette,o as Default,t as Disabled,a as Favorite,re as __namedExportsOrder,ee as default};
