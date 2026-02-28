import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{a as c,C as m}from"./Checkbox-BK9RRFJG.js";import{R as p,a as u}from"./RadioGroup-BSiVfkM5.js";import{A as b}from"./Accordion-BwyP45W8.js";import{c as h}from"./cn-DjqsqOe8.js";import"./index-yBjzXJbu.js";import"./RSPContexts-DBLJ5UHR.js";import"./index-Dx_1l3Sb.js";import"./_commonjsHelpers-CqkleIqs.js";import"./Hidden-CJaOgpXL.js";import"./index-DML4njjH.js";import"./index-BLHw34Di.js";import"./Form-CtNYcFWn.js";import"./Text-CtOaLkQJ.js";import"./useLabels-aAoTIJ3H.js";import"./useControlledState-BKOD5Axx.js";import"./VisuallyHidden-DzgZ0AbB.js";import"./createLucideIcon-CGLhuAmF.js";import"./minus-SJonCl4P.js";import"./SelectionIndicator-ESC2ylKy.js";import"./FocusScope-DkXgkvhN.js";import"./context-BGnht7tc.js";import"./Button-BusymwjI.js";import"./useEvent-BFPHVnvf.js";import"./chevron-down-C9pjfVXO.js";function s({sections:d,className:n}){return e.jsxs("aside",{className:h("flex flex-col gap-0 w-64",n),children:[e.jsx("h2",{className:"text-sm font-bold uppercase tracking-wider text-[var(--bps-gray-700)] pb-2 border-b border-[var(--bps-gray-200)]",children:"Refine Results"}),e.jsx(b,{allowsMultipleExpanded:!0,items:d.map(i=>({id:i.id,title:i.title,content:e.jsxs("div",{className:"flex flex-col gap-2 py-1",children:[i.type==="checkbox"&&i.options&&e.jsx(c,{children:i.options.map(t=>e.jsxs(m,{value:t.id,children:[e.jsx("span",{children:t.label}),t.count!==void 0&&e.jsxs("span",{className:"ml-auto text-[var(--bps-gray-400)] text-xs",children:["(",t.count,")"]})]},t.id))}),i.type==="radio"&&i.options&&e.jsx(p,{children:i.options.map(t=>e.jsxs(u,{value:t.id,children:[t.label,t.count!==void 0&&e.jsxs("span",{className:"ml-1 text-[var(--bps-gray-400)] text-xs",children:["(",t.count,")"]})]},t.id))})]})}))})]})}s.__docgenInfo={description:"",methods:[],displayName:"Filters",props:{sections:{required:!0,tsType:{name:"Array",elements:[{name:"FilterSection"}],raw:"FilterSection[]"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const q={title:"BPS Components/Filters",component:s,tags:["autodocs"],parameters:{backgrounds:{default:"light"}}},a={args:{sections:[{id:"brand",title:"Brand",type:"checkbox",options:[{id:"ugly-stik",label:"Ugly Stik",count:47},{id:"shimano",label:"Shimano",count:38},{id:"abu-garcia",label:"Abu Garcia",count:29},{id:"st-croix",label:"St. Croix",count:22},{id:"lew",label:"Lew's",count:18}]},{id:"power",title:"Power",type:"checkbox",options:[{id:"ultra-light",label:"Ultra Light",count:15},{id:"light",label:"Light",count:28},{id:"medium-light",label:"Medium Light",count:34},{id:"medium",label:"Medium",count:52},{id:"medium-heavy",label:"Medium Heavy",count:41},{id:"heavy",label:"Heavy",count:23}]},{id:"action",title:"Action",type:"checkbox",options:[{id:"fast",label:"Fast",count:65},{id:"extra-fast",label:"Extra Fast",count:38},{id:"moderate-fast",label:"Moderate Fast",count:29},{id:"moderate",label:"Moderate",count:18}]},{id:"availability",title:"Availability",type:"radio",options:[{id:"all",label:"Show All"},{id:"in-stock",label:"In Stock Only"},{id:"in-store",label:"Available In Store"}]}]}};var l,o,r;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    sections: [{
      id: 'brand',
      title: 'Brand',
      type: 'checkbox',
      options: [{
        id: 'ugly-stik',
        label: 'Ugly Stik',
        count: 47
      }, {
        id: 'shimano',
        label: 'Shimano',
        count: 38
      }, {
        id: 'abu-garcia',
        label: 'Abu Garcia',
        count: 29
      }, {
        id: 'st-croix',
        label: 'St. Croix',
        count: 22
      }, {
        id: 'lew',
        label: "Lew's",
        count: 18
      }]
    }, {
      id: 'power',
      title: 'Power',
      type: 'checkbox',
      options: [{
        id: 'ultra-light',
        label: 'Ultra Light',
        count: 15
      }, {
        id: 'light',
        label: 'Light',
        count: 28
      }, {
        id: 'medium-light',
        label: 'Medium Light',
        count: 34
      }, {
        id: 'medium',
        label: 'Medium',
        count: 52
      }, {
        id: 'medium-heavy',
        label: 'Medium Heavy',
        count: 41
      }, {
        id: 'heavy',
        label: 'Heavy',
        count: 23
      }]
    }, {
      id: 'action',
      title: 'Action',
      type: 'checkbox',
      options: [{
        id: 'fast',
        label: 'Fast',
        count: 65
      }, {
        id: 'extra-fast',
        label: 'Extra Fast',
        count: 38
      }, {
        id: 'moderate-fast',
        label: 'Moderate Fast',
        count: 29
      }, {
        id: 'moderate',
        label: 'Moderate',
        count: 18
      }]
    }, {
      id: 'availability',
      title: 'Availability',
      type: 'radio',
      options: [{
        id: 'all',
        label: 'Show All'
      }, {
        id: 'in-stock',
        label: 'In Stock Only'
      }, {
        id: 'in-store',
        label: 'Available In Store'
      }]
    }]
  }
}`,...(r=(o=a.parameters)==null?void 0:o.docs)==null?void 0:r.source}}};const T=["FishingRodFilters"];export{a as FishingRodFilters,T as __namedExportsOrder,q as default};
