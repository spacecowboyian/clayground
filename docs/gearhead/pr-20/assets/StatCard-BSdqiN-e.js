import{c as n}from"./createLucideIcon-BnGyhE3A.js";import{j as e}from"./jsx-runtime-CFY_2KVU.js";import{c as a}from"./cn-DjqsqOe8.js";/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]],q=n("activity",u);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=[["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",key:"1b0p4s"}]],M=n("dollar-sign",p);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=[["path",{d:"M5 12h14",key:"1ays0h"}]],g=n("minus",m);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=[["circle",{cx:"8",cy:"21",r:"1",key:"jimo8o"}],["circle",{cx:"19",cy:"21",r:"1",key:"13723u"}],["path",{d:"M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",key:"9zh506"}]],S=n("shopping-cart",x);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=[["polyline",{points:"22 17 13.5 8.5 8.5 13.5 2 7",key:"1r2t7k"}],["polyline",{points:"16 17 22 17 22 11",key:"11uiuu"}]],h=n("trending-down",y);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17",key:"126l90"}],["polyline",{points:"16 7 22 7 22 13",key:"kwv8wd"}]],f=n("trending-up",v);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]],$=n("users",N),b={orange:{icon:"text-[var(--accent-orange)]",iconBg:"bg-[var(--accent-orange-light)]",trend:{up:"text-[var(--accent-orange)]",down:"text-[var(--accent-red)]",neutral:"text-muted-foreground"}},blue:{icon:"text-[var(--accent-blue)]",iconBg:"bg-[var(--accent-blue-light)]",trend:{up:"text-[var(--accent-green)]",down:"text-[var(--accent-red)]",neutral:"text-muted-foreground"}},green:{icon:"text-[var(--accent-green)]",iconBg:"bg-[var(--accent-green-light)]",trend:{up:"text-[var(--accent-green)]",down:"text-[var(--accent-red)]",neutral:"text-muted-foreground"}},purple:{icon:"text-[var(--accent-purple)]",iconBg:"bg-[var(--accent-purple-light)]",trend:{up:"text-[var(--accent-green)]",down:"text-[var(--accent-red)]",neutral:"text-muted-foreground"}}},k={up:e.jsx(f,{className:"w-3.5 h-3.5"}),down:e.jsx(h,{className:"w-3.5 h-3.5"}),neutral:e.jsx(g,{className:"w-3.5 h-3.5"})};function j({title:o,value:i,description:c,trend:t,icon:s,color:l="blue",className:d}){const r=b[l];return e.jsxs("div",{className:a("p-5 bg-card rounded-xl border border-border flex flex-col gap-3",d),children:[e.jsxs("div",{className:"flex items-start justify-between",children:[e.jsx("span",{className:"text-sm text-muted-foreground",children:o}),s&&e.jsx("div",{className:a("p-2 rounded-lg",r.iconBg),children:e.jsx("div",{className:a("w-5 h-5",r.icon),children:s})})]}),e.jsxs("div",{className:"flex items-end justify-between gap-2",children:[e.jsx("span",{className:"text-3xl font-medium text-foreground leading-none",children:i}),t&&e.jsxs("div",{className:a("flex items-center gap-1 text-xs font-medium",r.trend[t.direction]),children:[k[t.direction],e.jsx("span",{children:t.value})]})]}),(c||(t==null?void 0:t.label))&&e.jsx("p",{className:"text-xs text-muted-foreground",children:(t==null?void 0:t.label)??c})]})}j.__docgenInfo={description:"",methods:[],displayName:"StatCard",props:{title:{required:!0,tsType:{name:"string"},description:""},value:{required:!0,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:""},description:{required:!1,tsType:{name:"string"},description:""},trend:{required:!1,tsType:{name:"StatTrend"},description:""},icon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},color:{required:!1,tsType:{name:"union",raw:"'orange' | 'blue' | 'green' | 'purple'",elements:[{name:"literal",value:"'orange'"},{name:"literal",value:"'blue'"},{name:"literal",value:"'green'"},{name:"literal",value:"'purple'"}]},description:"",defaultValue:{value:"'blue'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""}}};export{q as A,M as D,j as S,f as T,$ as U,S as a};
