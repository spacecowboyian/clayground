import{j as t}from"./jsx-runtime-Cf8x2fCZ.js";import{S as f}from"./SearchField-BT5sfKa0.js";import"./index-yBjzXJbu.js";import"./Button-9zdgzkAD.js";import"./filterDOMProps--ZktyO9b.js";import"./index-Dx_1l3Sb.js";import"./_commonjsHelpers-CqkleIqs.js";import"./cn-DjqsqOe8.js";import"./ProgressBar-CDMxxlwg.js";import"./useLabel-DecDrJvF.js";import"./Hidden-CUdQ9qGV.js";import"./useLabels-E9QH9sio.js";import"./number-DBXyMkBJ.js";import"./I18nProvider-B3IKknB2.js";import"./useButton-Bn2drWpu.js";import"./useHover-2nYSjO6d.js";import"./usePress-Be_r5wll.js";import"./textSelection-CryKVKjm.js";import"./index-BaBTCQBq.js";import"./index-B6ujFmsw.js";import"./FieldError-_eDrgAjd.js";import"./Text-Bn2MnSxE.js";import"./useTextField-YBVDUWHR.js";import"./useField-63t4_CSt.js";import"./useFormReset-CWPUIR94.js";import"./useFormValidation-IN6bGenm.js";import"./useControlledState-C3twlykq.js";import"./Autocomplete-BTFG-eR4.js";import"./Form-BUiea3vT.js";import"./useLocalizedStringFormatter-DARnyLbS.js";import"./createLucideIcon-CGLhuAmF.js";import"./x-UdCLiosU.js";const Q={title:"Components/SearchField",component:f,tags:["autodocs"],argTypes:{focusColor:{control:"select",options:["orange","blue","green","purple"]},label:{control:"text"},placeholder:{control:"text"}}},r={args:{label:"Search",placeholder:"Search...",focusColor:"purple"}},o={args:{placeholder:"Search files...",focusColor:"blue"}},e={render:()=>t.jsx("div",{className:"flex flex-col gap-4 w-72",children:["orange","blue","green","purple"].map(a=>t.jsx(f,{placeholder:`${a} focus ring`,focusColor:a},a))})};var p,s,l;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
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
}`,...(d=(u=e.parameters)==null?void 0:u.docs)==null?void 0:d.source}}};const U=["Default","NoLabel","FocusColors"];export{r as Default,e as FocusColors,o as NoLabel,U as __namedExportsOrder,Q as default};
