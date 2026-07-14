import{j as t}from"./jsx-runtime-CFY_2KVU.js";import{S as f}from"./SearchField-_HZtZ8cT.js";import"./index-Dq4ZvVuH.js";import"./_commonjsHelpers-CqkleIqs.js";import"./Button-Awlg6USr.js";import"./filterDOMProps-C-i4UaIy.js";import"./cn-DjqsqOe8.js";import"./ProgressBar-CT7HeBe_.js";import"./useLabel-D_wYjLm1.js";import"./Hidden-hL_qQZMu.js";import"./useLabels-yyCjzuWQ.js";import"./number-Bmk5IpGB.js";import"./I18nProvider-Dh5L25AP.js";import"./useButton-DdCWC2Uk.js";import"./useHover-CLL8Ak4f.js";import"./usePress-DyjE3WMG.js";import"./textSelection-DvZix-fT.js";import"./index-C_c1dzyj.js";import"./index-CdngGiDl.js";import"./FieldError-CZaR1p35.js";import"./Text-BIWCb63P.js";import"./useTextField-BfCPbT0U.js";import"./useField-DAu3Fhqm.js";import"./useFormReset-ClS4IEIe.js";import"./useFormValidation-Ds08AJik.js";import"./useControlledState-NPcgB-Xr.js";import"./Autocomplete-DqsIPf2K.js";import"./Form-BjOwIjrs.js";import"./useLocalizedStringFormatter-hpMpqGU3.js";import"./createLucideIcon-BnGyhE3A.js";import"./x-BEzLMO8q.js";const P={title:"Components/SearchField",component:f,tags:["autodocs"],argTypes:{focusColor:{control:"select",options:["orange","blue","green","purple"]},label:{control:"text"},placeholder:{control:"text"}}},r={args:{label:"Search",placeholder:"Search...",focusColor:"purple"}},o={args:{placeholder:"Search files...",focusColor:"blue"}},e={render:()=>t.jsx("div",{className:"flex flex-col gap-4 w-72",children:["orange","blue","green","purple"].map(a=>t.jsx(f,{placeholder:`${a} focus ring`,focusColor:a},a))})};var p,s,l;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    label: 'Search',
    placeholder: 'Search...',
    focusColor: 'purple'
  }
}`,...(l=(s=r.parameters)==null?void 0:s.docs)==null?void 0:l.source}}};var c,m,i;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    placeholder: 'Search files...',
    focusColor: 'blue'
  }
}`,...(i=(m=o.parameters)==null?void 0:m.docs)==null?void 0:i.source}}};var n,u,d;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-4 w-72">
      {(['orange', 'blue', 'green', 'purple'] as const).map(c => <SearchField key={c} placeholder={\`\${c} focus ring\`} focusColor={c} />)}
    </div>
}`,...(d=(u=e.parameters)==null?void 0:u.docs)==null?void 0:d.source}}};const Q=["Default","NoLabel","FocusColors"];export{r as Default,e as FocusColors,o as NoLabel,Q as __namedExportsOrder,P as default};
