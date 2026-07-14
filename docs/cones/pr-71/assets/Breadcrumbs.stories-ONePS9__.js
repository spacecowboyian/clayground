import{j as d}from"./jsx-runtime-CFY_2KVU.js";import{c as $,$ as xe,a as T,b as ve,i as he,f as ge}from"./filterDOMProps-C-i4UaIy.js";import{d as Ce,$ as De,a as Be,b as Ee,h as Pe}from"./Collection-DW_ZqzJs.js";import{a as ye,$ as je}from"./Link-B4HpJ7jx.js";import{$ as Re}from"./useLocalizedStringFormatter-hpMpqGU3.js";import{r as i,R as o}from"./index-Dq4ZvVuH.js";import{c as g}from"./cn-DjqsqOe8.js";import"./useHover-CLL8Ak4f.js";import"./Hidden-hL_qQZMu.js";import"./index-C_c1dzyj.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-CdngGiDl.js";import"./usePress-DyjE3WMG.js";import"./textSelection-DvZix-fT.js";import"./I18nProvider-Dh5L25AP.js";var F={};F={breadcrumbs:"عناصر الواجهة"};var I={};I={breadcrumbs:"Трохи хляб"};var L={};L={breadcrumbs:"Popis cesty"};var H={};H={breadcrumbs:"Brødkrummer"};var M={};M={breadcrumbs:"Breadcrumbs"};var O={};O={breadcrumbs:"Πλοηγήσεις breadcrumb"};var w={};w={breadcrumbs:"Breadcrumbs"};var _={};_={breadcrumbs:"Migas de pan"};var z={};z={breadcrumbs:"Lingiread"};var G={};G={breadcrumbs:"Navigointilinkit"};var K={};K={breadcrumbs:"Chemin de navigation"};var U={};U={breadcrumbs:"שבילי ניווט"};var q={};q={breadcrumbs:"Navigacijski putovi"};var V={};V={breadcrumbs:"Morzsamenü"};var J={};J={breadcrumbs:"Breadcrumb"};var W={};W={breadcrumbs:"パンくずリスト"};var Z={};Z={breadcrumbs:"탐색 표시"};var Q={};Q={breadcrumbs:"Naršymo kelias"};var X={};X={breadcrumbs:"Atpakaļceļi"};var Y={};Y={breadcrumbs:"Navigasjonsstier"};var ee={};ee={breadcrumbs:"Broodkruimels"};var re={};re={breadcrumbs:"Struktura nawigacyjna"};var ae={};ae={breadcrumbs:"Caminho detalhado"};var te={};te={breadcrumbs:"Categorias"};var se={};se={breadcrumbs:"Miez de pâine"};var ce={};ce={breadcrumbs:"Навигация"};var oe={};oe={breadcrumbs:"Navigačné prvky Breadcrumbs"};var ue={};ue={breadcrumbs:"Drobtine"};var de={};de={breadcrumbs:"Putanje navigacije"};var ne={};ne={breadcrumbs:"Sökvägar"};var be={};be={breadcrumbs:"İçerik haritaları"};var le={};le={breadcrumbs:"Навігаційна стежка"};var me={};me={breadcrumbs:"导航栏"};var ie={};ie={breadcrumbs:"導覽列"};var fe={};fe={"ar-AE":F,"bg-BG":I,"cs-CZ":L,"da-DK":H,"de-DE":M,"el-GR":O,"en-US":w,"es-ES":_,"et-EE":z,"fi-FI":G,"fr-FR":K,"he-IL":U,"hr-HR":q,"hu-HU":V,"it-IT":J,"ja-JP":W,"ko-KR":Z,"lt-LT":Q,"lv-LV":X,"nb-NO":Y,"nl-NL":ee,"pl-PL":re,"pt-BR":ae,"pt-PT":te,"ro-RO":se,"ru-RU":ce,"sk-SK":oe,"sl-SI":ue,"sr-SP":de,"sv-SE":ne,"tr-TR":be,"uk-UA":le,"zh-CN":me,"zh-TW":ie};function Se(r){return r&&r.__esModule?r.default:r}function ke(r){let{"aria-label":e,...s}=r,t=Re(Se(fe),"@react-aria/breadcrumbs");return{navProps:{...$(s,{labelable:!0}),"aria-label":e||t.format("breadcrumbs")}}}const f=i.createContext(null),Ne=i.forwardRef(function(e,s){[e,s]=xe(e,s,f);let{CollectionRoot:t}=i.useContext(Ce),{navProps:a}=ke(e),c=$(e,{global:!0,labelable:!0});return o.createElement(De,{content:o.createElement(Be,e)},u=>o.createElement(T.ol,{render:e.render,ref:s,...ve(c,a),slot:e.slot||void 0,style:e.style,className:e.className??"react-aria-Breadcrumbs"},o.createElement(f.Provider,{value:e},o.createElement(t,{collection:u}))))}),x=class x extends Pe{};x.type="item";let p=x;const Ae=Ee(p,function(e,s,t){let a=t.nextKey==null,{isDisabled:c,onAction:u}=he(f),$e={"aria-current":a?"page":null,isDisabled:c||a,onPress:()=>u==null?void 0:u(t.key)},v=ge({...t.props,children:t.rendered,values:{isDisabled:c||a,isCurrent:a},defaultClassName:"react-aria-Breadcrumb"}),h=$(e,{global:!0,labelable:!0});return delete h.id,o.createElement(T.li,{...h,...v,ref:s,"data-disabled":c||a||void 0,"data-current":a||void 0},o.createElement(ye.Provider,{value:$e},v.children))});function pe({items:r,separator:e="/",className:s,...t}){return d.jsx(Ne,{className:g("flex items-center gap-2 text-sm",s),...t,children:r.map((a,c)=>d.jsxs(Ae,{id:a.id,className:"flex items-center gap-2",children:[d.jsx(je,{href:a.href??"#",className:g("transition-colors hover:text-[var(--accent-blue)] outline-none focus:underline",c===r.length-1?"text-foreground cursor-default pointer-events-none":"text-muted-foreground"),"aria-current":c===r.length-1?"page":void 0,children:a.label}),c<r.length-1&&d.jsx("span",{className:"text-muted-foreground",children:e})]},a.id))})}pe.__docgenInfo={description:"",methods:[],displayName:"Breadcrumbs",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"BreadcrumbItem"}],raw:"BreadcrumbItem[]"},description:""},separator:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'/'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}},composes:["Omit"]};const Je={title:"Components/Breadcrumbs",component:pe,tags:["autodocs"],parameters:{layout:"padded"}},n={args:{items:[{id:"home",label:"Home",href:"#"},{id:"components",label:"Components",href:"#"},{id:"current",label:"Breadcrumbs"}]}},b={args:{items:[{id:"root",label:"Clayground",href:"#"},{id:"projects",label:"Projects",href:"#"},{id:"gearhead",label:"Gearhead",href:"#"},{id:"components",label:"Components",href:"#"},{id:"current",label:"Breadcrumbs"}]}},l={args:{items:[{id:"home",label:"Home",href:"#"},{id:"current",label:"Settings"}]}},m={args:{separator:"›",items:[{id:"home",label:"Home",href:"#"},{id:"docs",label:"Docs",href:"#"},{id:"current",label:"API Reference"}]}};var C,D,B;n.parameters={...n.parameters,docs:{...(C=n.parameters)==null?void 0:C.docs,source:{originalSource:`{
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
}`,...(B=(D=n.parameters)==null?void 0:D.docs)==null?void 0:B.source}}};var E,P,y;b.parameters={...b.parameters,docs:{...(E=b.parameters)==null?void 0:E.docs,source:{originalSource:`{
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
}`,...(y=(P=b.parameters)==null?void 0:P.docs)==null?void 0:y.source}}};var j,R,S;l.parameters={...l.parameters,docs:{...(j=l.parameters)==null?void 0:j.docs,source:{originalSource:`{
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
}`,...(S=(R=l.parameters)==null?void 0:R.docs)==null?void 0:S.source}}};var k,N,A;m.parameters={...m.parameters,docs:{...(k=m.parameters)==null?void 0:k.docs,source:{originalSource:`{
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
}`,...(A=(N=m.parameters)==null?void 0:N.docs)==null?void 0:A.source}}};const We=["Default","Deep","TwoLevels","CustomSeparator"];export{m as CustomSeparator,b as Deep,n as Default,l as TwoLevels,We as __namedExportsOrder,Je as default};
