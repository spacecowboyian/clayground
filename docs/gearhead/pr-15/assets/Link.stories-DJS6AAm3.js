import{j as e}from"./jsx-runtime-CFY_2KVU.js";import{$ as k}from"./Link-BwPIsxeg.js";import{c as v}from"./cn-DjqsqOe8.js";import"./index-Dq4ZvVuH.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-LaqegW2K.js";import"./useFocusRing-ubySK4Mk.js";import"./usePress-B20iDxoD.js";import"./textSelection-BF8X-_NC.js";import"./index-BodQkoVg.js";import"./index-N4qaH3Gp.js";const L={blue:"text-[var(--accent-blue)] hover:text-[var(--accent-blue-hover)]",green:"text-[var(--accent-green)] hover:text-[var(--accent-green-hover)]",orange:"text-[var(--accent-orange)] hover:text-[var(--accent-orange-hover)]",purple:"text-[var(--accent-purple)] hover:text-[var(--accent-purple-hover)]",default:"text-foreground hover:text-muted-foreground"};function r({color:h="blue",className:f,children:g,...x}){return e.jsx(k,{className:v("hover:underline outline-none focus-visible:ring-2 focus-visible:ring-ring rounded",L[h],f),...x,children:g})}r.__docgenInfo={description:"",methods:[],displayName:"Link",props:{color:{required:!1,tsType:{name:"union",raw:"'blue' | 'green' | 'orange' | 'purple' | 'default'",elements:[{name:"literal",value:"'blue'"},{name:"literal",value:"'green'"},{name:"literal",value:"'orange'"},{name:"literal",value:"'purple'"},{name:"literal",value:"'default'"}]},description:"",defaultValue:{value:"'blue'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}},composes:["LinkProps"]};const $={title:"Components/Link",component:r,tags:["autodocs"],argTypes:{color:{control:"select",options:["blue","green","orange","purple","default"]},children:{control:"text"}}},o={args:{color:"blue",children:"Click here",href:"#"}},n={render:()=>e.jsxs("div",{className:"flex flex-col gap-2",children:[e.jsx(r,{color:"blue",href:"#",children:"Blue Link"}),e.jsx(r,{color:"green",href:"#",children:"Green Link"}),e.jsx(r,{color:"orange",href:"#",children:"Orange Link"}),e.jsx(r,{color:"purple",href:"#",children:"Purple Link"}),e.jsx(r,{color:"default",href:"#",children:"Default Link"})]})},t={render:()=>e.jsxs("p",{className:"text-foreground text-sm max-w-sm",children:["Check out our"," ",e.jsx(r,{color:"blue",href:"#",children:"documentation"})," ","or"," ",e.jsx(r,{color:"purple",href:"#",children:"get started"})," ","with the tutorials."]})};var a,l,c;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    color: 'blue',
    children: 'Click here',
    href: '#'
  }
}`,...(c=(l=o.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};var s,i,u;n.parameters={...n.parameters,docs:{...(s=n.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-2">
      <Link color="blue" href="#">Blue Link</Link>
      <Link color="green" href="#">Green Link</Link>
      <Link color="orange" href="#">Orange Link</Link>
      <Link color="purple" href="#">Purple Link</Link>
      <Link color="default" href="#">Default Link</Link>
    </div>
}`,...(u=(i=n.parameters)==null?void 0:i.docs)==null?void 0:u.source}}};var p,d,m;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => <p className="text-foreground text-sm max-w-sm">
      Check out our{' '}
      <Link color="blue" href="#">documentation</Link>
      {' '}or{' '}
      <Link color="purple" href="#">get started</Link>
      {' '}with the tutorials.
    </p>
}`,...(m=(d=t.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};const q=["Default","ColorPalette","InParagraph"];export{n as ColorPalette,o as Default,t as InParagraph,q as __namedExportsOrder,$ as default};
