import{j as c}from"./jsx-runtime-CFY_2KVU.js";import{r as v}from"./index-Dq4ZvVuH.js";import{F as d}from"./FilterSidebar-CQQiGZjF.js";import"./_commonjsHelpers-CqkleIqs.js";import"./Checkbox-BeXo_dSX.js";import"./RSPContexts-Dr342rEE.js";import"./utils-LaqegW2K.js";import"./cn-DjqsqOe8.js";import"./Form-C-hz59zZ.js";import"./useFocusRing-ubySK4Mk.js";import"./usePress-B20iDxoD.js";import"./textSelection-BF8X-_NC.js";import"./index-BodQkoVg.js";import"./index-N4qaH3Gp.js";import"./useToggle-C9uo3gsR.js";import"./useFormReset-BTJT5q7I.js";import"./useToggleState-bM5DcLtG.js";import"./useControlledState-BJxFPo-I.js";import"./VisuallyHidden-Bfe7IVUU.js";import"./createLucideIcon-BnGyhE3A.js";import"./chevron-down-Bn5it-yX.js";import"./check-Be_n60n5.js";const A=[{id:"category",label:"Category",options:[{id:"electronics",label:"Electronics",count:42},{id:"clothing",label:"Clothing",count:28},{id:"books",label:"Books",count:15},{id:"home",label:"Home & Garden",count:9}]},{id:"price",label:"Price Range",options:[{id:"under25",label:"Under $25",count:30},{id:"25to50",label:"$25 – $50",count:21},{id:"50to100",label:"$50 – $100",count:18},{id:"over100",label:"Over $100",count:12}]},{id:"rating",label:"Rating",defaultExpanded:!1,options:[{id:"4plus",label:"4★ & up",count:55},{id:"3plus",label:"3★ & up",count:72}]}],L={title:"Components/FilterSidebar",component:d,tags:["autodocs"],parameters:{layout:"padded"},args:{groups:[]}},l={render:()=>{const[e,r]=v.useState({}),p=(t,o,u)=>{r(n=>{const s=n[t]??[];return{...n,[t]:u?[...s,o]:s.filter(m=>m!==o)}})};return c.jsx(d,{groups:A,selectedFilters:e,onFilterChange:p,onClearAll:()=>r({})})}},a={render:()=>{const[e,r]=v.useState({category:["electronics","books"],price:["under25"]}),p=(t,o,u)=>{r(n=>{const s=n[t]??[];return{...n,[t]:u?[...s,o]:s.filter(m=>m!==o)}})};return c.jsx(d,{groups:A,selectedFilters:e,onFilterChange:p,onClearAll:()=>r({})})}},i={render:()=>c.jsx("div",{className:"flex gap-8",children:["orange","blue","green","purple"].map(e=>c.jsx(d,{color:e,groups:[{id:"demo",label:`${e.charAt(0).toUpperCase()+e.slice(1)} filters`,options:[{id:"a",label:"Option A"},{id:"b",label:"Option B"}]}],selectedFilters:{demo:["a"]}},e))})};var g,b,h;l.parameters={...l.parameters,docs:{...(g=l.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => {
    const [selected, setSelected] = useState<Record<string, string[]>>({});
    const handleChange = (groupId: string, optionId: string, checked: boolean) => {
      setSelected(prev => {
        const current = prev[groupId] ?? [];
        return {
          ...prev,
          [groupId]: checked ? [...current, optionId] : current.filter(id => id !== optionId)
        };
      });
    };
    return <FilterSidebar groups={sampleGroups} selectedFilters={selected} onFilterChange={handleChange} onClearAll={() => setSelected({})} />;
  }
}`,...(h=(b=l.parameters)==null?void 0:b.docs)==null?void 0:h.source}}};var C,S,f;a.parameters={...a.parameters,docs:{...(C=a.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => {
    const [selected, setSelected] = useState<Record<string, string[]>>({
      category: ['electronics', 'books'],
      price: ['under25']
    });
    const handleChange = (groupId: string, optionId: string, checked: boolean) => {
      setSelected(prev => {
        const current = prev[groupId] ?? [];
        return {
          ...prev,
          [groupId]: checked ? [...current, optionId] : current.filter(id => id !== optionId)
        };
      });
    };
    return <FilterSidebar groups={sampleGroups} selectedFilters={selected} onFilterChange={handleChange} onClearAll={() => setSelected({})} />;
  }
}`,...(f=(S=a.parameters)==null?void 0:S.docs)==null?void 0:f.source}}};var F,x,k;i.parameters={...i.parameters,docs:{...(F=i.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => <div className="flex gap-8">
      {(['orange', 'blue', 'green', 'purple'] as const).map(color => <FilterSidebar key={color} color={color} groups={[{
      id: 'demo',
      label: \`\${color.charAt(0).toUpperCase() + color.slice(1)} filters\`,
      options: [{
        id: 'a',
        label: 'Option A'
      }, {
        id: 'b',
        label: 'Option B'
      }]
    }]} selectedFilters={{
      demo: ['a']
    }} />)}
    </div>
}`,...(k=(x=i.parameters)==null?void 0:x.docs)==null?void 0:k.source}}};const M=["Default","WithPreselected","ColorVariants"];export{i as ColorVariants,l as Default,a as WithPreselected,M as __namedExportsOrder,L as default};
