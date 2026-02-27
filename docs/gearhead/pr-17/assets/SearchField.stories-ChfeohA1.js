import{j as s}from"./jsx-runtime-CFY_2KVU.js";import{S as f}from"./SearchField-0q3E4o1W.js";import"./index-Dq4ZvVuH.js";import"./_commonjsHelpers-CqkleIqs.js";import"./Button-kWM7j8ju.js";import"./utils-LaqegW2K.js";import"./cn-DjqsqOe8.js";import"./ProgressBar-C-avWlme.js";import"./Label-ZdcYzoi0.js";import"./useLabels-CQ1wxQuf.js";import"./Hidden-o7BpdpsO.js";import"./useNumberFormatter-BKAMG5zQ.js";import"./context-DWzCBS5d.js";import"./useButton-BLdXFJ-e.js";import"./usePress-B20iDxoD.js";import"./useFocusRing-ubySK4Mk.js";import"./textSelection-BF8X-_NC.js";import"./index-BodQkoVg.js";import"./index-N4qaH3Gp.js";import"./FieldError-7evEVdN1.js";import"./Text-VdVr9Ew-.js";import"./Input-DanMQf3D.js";import"./useFormReset-BTJT5q7I.js";import"./useControlledState-BJxFPo-I.js";import"./useField-DNsN5OOF.js";import"./Form-C-hz59zZ.js";import"./RSPContexts-Dr342rEE.js";import"./useLocalizedStringFormatter-CFq54QRB.js";import"./createLucideIcon-BnGyhE3A.js";import"./x-BEzLMO8q.js";const M={title:"Components/SearchField",component:f,tags:["autodocs"],argTypes:{focusColor:{control:"select",options:["orange","blue","green","purple"]},label:{control:"text"},placeholder:{control:"text"}}},r={args:{label:"Search",placeholder:"Search...",focusColor:"purple"}},o={args:{placeholder:"Search files...",focusColor:"blue"}},e={render:()=>s.jsx("div",{className:"flex flex-col gap-4 w-72",children:["orange","blue","green","purple"].map(a=>s.jsx(f,{placeholder:`${a} focus ring`,focusColor:a},a))})};var t,p,l;r.parameters={...r.parameters,docs:{...(t=r.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    label: 'Search',
    placeholder: 'Search...',
    focusColor: 'purple'
  }
}`,...(l=(p=r.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};var c,m,i;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    placeholder: 'Search files...',
    focusColor: 'blue'
  }
}`,...(i=(m=o.parameters)==null?void 0:m.docs)==null?void 0:i.source}}};var n,u,d;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4 w-72">
      {(['orange', 'blue', 'green', 'purple'] as const).map(c => <SearchField key={c} placeholder={\`\${c} focus ring\`} focusColor={c} />)}
    </div>
}`,...(d=(u=e.parameters)==null?void 0:u.docs)==null?void 0:d.source}}};const P=["Default","NoLabel","FocusColors"];export{r as Default,e as FocusColors,o as NoLabel,P as __namedExportsOrder,M as default};
