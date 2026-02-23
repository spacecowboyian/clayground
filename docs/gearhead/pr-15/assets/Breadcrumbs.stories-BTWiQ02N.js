import{j as n}from"./jsx-runtime-CFY_2KVU.js";import{a as $,d as $e,e as A,$ as xe,i as ve,c as he}from"./utils-LaqegW2K.js";import{d as ge,$ as Ce,a as De,b as Be,h as Ee}from"./Collection-B0KnfY9F.js";import{a as Pe,$ as Ne}from"./Link-BwPIsxeg.js";import{r as f,R as o}from"./index-Dq4ZvVuH.js";import{$ as ye}from"./useLocalizedStringFormatter-CFq54QRB.js";import{c as h}from"./cn-DjqsqOe8.js";import"./Hidden-o7BpdpsO.js";import"./index-BodQkoVg.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-N4qaH3Gp.js";import"./useFocusRing-ubySK4Mk.js";import"./usePress-B20iDxoD.js";import"./textSelection-BF8X-_NC.js";import"./context-DWzCBS5d.js";var T={};T={breadcrumbs:"عناصر الواجهة"};var F={};F={breadcrumbs:"Трохи хляб"};var I={};I={breadcrumbs:"Popis cesty"};var L={};L={breadcrumbs:"Brødkrummer"};var H={};H={breadcrumbs:"Breadcrumbs"};var _={};_={breadcrumbs:"Πλοηγήσεις breadcrumb"};var M={};M={breadcrumbs:"Breadcrumbs"};var O={};O={breadcrumbs:"Migas de pan"};var w={};w={breadcrumbs:"Lingiread"};var z={};z={breadcrumbs:"Navigointilinkit"};var G={};G={breadcrumbs:"Chemin de navigation"};var K={};K={breadcrumbs:"שבילי ניווט"};var U={};U={breadcrumbs:"Navigacijski putovi"};var q={};q={breadcrumbs:"Morzsamenü"};var V={};V={breadcrumbs:"Breadcrumb"};var J={};J={breadcrumbs:"パンくずリスト"};var W={};W={breadcrumbs:"탐색 표시"};var Z={};Z={breadcrumbs:"Naršymo kelias"};var Q={};Q={breadcrumbs:"Atpakaļceļi"};var X={};X={breadcrumbs:"Navigasjonsstier"};var Y={};Y={breadcrumbs:"Broodkruimels"};var ee={};ee={breadcrumbs:"Struktura nawigacyjna"};var re={};re={breadcrumbs:"Caminho detalhado"};var ae={};ae={breadcrumbs:"Categorias"};var te={};te={breadcrumbs:"Miez de pâine"};var se={};se={breadcrumbs:"Навигация"};var de={};de={breadcrumbs:"Navigačné prvky Breadcrumbs"};var oe={};oe={breadcrumbs:"Drobtine"};var ce={};ce={breadcrumbs:"Putanje navigacije"};var ue={};ue={breadcrumbs:"Sökvägar"};var ne={};ne={breadcrumbs:"İçerik haritaları"};var be={};be={breadcrumbs:"Навігаційна стежка"};var le={};le={breadcrumbs:"导航栏"};var me={};me={breadcrumbs:"導覽列"};var ie={};ie={"ar-AE":T,"bg-BG":F,"cs-CZ":I,"da-DK":L,"de-DE":H,"el-GR":_,"en-US":M,"es-ES":O,"et-EE":w,"fi-FI":z,"fr-FR":G,"he-IL":K,"hr-HR":U,"hu-HU":q,"it-IT":V,"ja-JP":J,"ko-KR":W,"lt-LT":Z,"lv-LV":Q,"nb-NO":X,"nl-NL":Y,"pl-PL":ee,"pt-BR":re,"pt-PT":ae,"ro-RO":te,"ru-RU":se,"sk-SK":de,"sl-SI":oe,"sr-SP":ce,"sv-SE":ue,"tr-TR":ne,"uk-UA":be,"zh-CN":le,"zh-TW":me};function je(r){return r&&r.__esModule?r.default:r}function Re(r){let{"aria-label":e,...s}=r,t=ye(je(ie),"@react-aria/breadcrumbs");return{navProps:{...$(s,{labelable:!0}),"aria-label":e||t.format("breadcrumbs")}}}const p=f.createContext(null),Se=f.forwardRef(function(e,s){[e,s]=$e(e,s,p);let{CollectionRoot:t}=f.useContext(ge),{navProps:a}=Re(e),d=$(e,{global:!0,labelable:!0});return o.createElement(Ce,{content:o.createElement(De,e)},c=>{var u;return o.createElement(A.ol,{render:e.render,ref:s,...xe(d,a),slot:e.slot||void 0,style:e.style,className:(u=e.className)!==null&&u!==void 0?u:"react-aria-Breadcrumbs"},o.createElement(p.Provider,{value:e},o.createElement(t,{collection:c})))})});class fe extends Ee{}fe.type="item";const ke=Be(fe,function(e,s,t){let a=t.nextKey==null,{isDisabled:d,onAction:c}=ve(p),u={"aria-current":a?"page":null,isDisabled:d||a,onPress:()=>c==null?void 0:c(t.key)},x=he({...t.props,children:t.rendered,values:{isDisabled:d||a,isCurrent:a},defaultClassName:"react-aria-Breadcrumb"}),v=$(e,{global:!0,labelable:!0});return delete v.id,o.createElement(A.li,{...v,...x,ref:s,"data-disabled":d||a||void 0,"data-current":a||void 0},o.createElement(Pe.Provider,{value:u},x.children))});function pe({items:r,separator:e="/",className:s,...t}){return n.jsx(Se,{className:h("flex items-center gap-2 text-sm",s),...t,children:r.map((a,d)=>n.jsxs(ke,{id:a.id,className:"flex items-center gap-2",children:[n.jsx(Ne,{href:a.href??"#",className:h("transition-colors hover:text-[var(--accent-blue)] outline-none focus:underline",d===r.length-1?"text-foreground cursor-default pointer-events-none":"text-muted-foreground"),"aria-current":d===r.length-1?"page":void 0,children:a.label}),d<r.length-1&&n.jsx("span",{className:"text-muted-foreground",children:e})]},a.id))})}pe.__docgenInfo={description:"",methods:[],displayName:"Breadcrumbs",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"BreadcrumbItem"}],raw:"BreadcrumbItem[]"},description:""},separator:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'/'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}},composes:["Omit"]};const Ve={title:"Components/Breadcrumbs",component:pe,tags:["autodocs"],parameters:{layout:"padded"}},b={args:{items:[{id:"home",label:"Home",href:"#"},{id:"components",label:"Components",href:"#"},{id:"current",label:"Breadcrumbs"}]}},l={args:{items:[{id:"root",label:"Clayground",href:"#"},{id:"projects",label:"Projects",href:"#"},{id:"gearhead",label:"Gearhead",href:"#"},{id:"components",label:"Components",href:"#"},{id:"current",label:"Breadcrumbs"}]}},m={args:{items:[{id:"home",label:"Home",href:"#"},{id:"current",label:"Settings"}]}},i={args:{separator:"›",items:[{id:"home",label:"Home",href:"#"},{id:"docs",label:"Docs",href:"#"},{id:"current",label:"API Reference"}]}};var g,C,D;b.parameters={...b.parameters,docs:{...(g=b.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    items: [{
      id: 'home',
      label: 'Home',
      href: '#'
    }, {
      id: 'components',
      label: 'Components',
      href: '#'
    }, {
      id: 'current',
      label: 'Breadcrumbs'
    }]
  }
}`,...(D=(C=b.parameters)==null?void 0:C.docs)==null?void 0:D.source}}};var B,E,P;l.parameters={...l.parameters,docs:{...(B=l.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    items: [{
      id: 'root',
      label: 'Clayground',
      href: '#'
    }, {
      id: 'projects',
      label: 'Projects',
      href: '#'
    }, {
      id: 'gearhead',
      label: 'Gearhead',
      href: '#'
    }, {
      id: 'components',
      label: 'Components',
      href: '#'
    }, {
      id: 'current',
      label: 'Breadcrumbs'
    }]
  }
}`,...(P=(E=l.parameters)==null?void 0:E.docs)==null?void 0:P.source}}};var N,y,j;m.parameters={...m.parameters,docs:{...(N=m.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    items: [{
      id: 'home',
      label: 'Home',
      href: '#'
    }, {
      id: 'current',
      label: 'Settings'
    }]
  }
}`,...(j=(y=m.parameters)==null?void 0:y.docs)==null?void 0:j.source}}};var R,S,k;i.parameters={...i.parameters,docs:{...(R=i.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    separator: '›',
    items: [{
      id: 'home',
      label: 'Home',
      href: '#'
    }, {
      id: 'docs',
      label: 'Docs',
      href: '#'
    }, {
      id: 'current',
      label: 'API Reference'
    }]
  }
}`,...(k=(S=i.parameters)==null?void 0:S.docs)==null?void 0:k.source}}};const Je=["Default","Deep","TwoLevels","CustomSeparator"];export{i as CustomSeparator,l as Deep,b as Default,m as TwoLevels,Je as __namedExportsOrder,Ve as default};
