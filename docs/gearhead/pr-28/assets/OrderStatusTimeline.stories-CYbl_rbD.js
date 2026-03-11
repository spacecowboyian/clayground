import{j as e}from"./jsx-runtime-CFY_2KVU.js";import{r as _}from"./index-Dq4ZvVuH.js";import{c}from"./cn-DjqsqOe8.js";import"./_commonjsHelpers-CqkleIqs.js";const g=[{label:"In Queue"},{label:"Printing"},{label:"Done"}],A={Queue:0,Printing:1,Complete:2};function r({status:a,className:p}){if(a==="Cancelled")return e.jsx("div",{className:c("flex items-center",p),children:e.jsxs("span",{className:"inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-[var(--accent-red-light)] text-[var(--accent-red)]",children:[e.jsx("span",{"aria-hidden":"true",children:"✕"}),e.jsx("span",{children:"Cancelled"})]})});const m=A[a];return e.jsx("div",{className:c("flex items-start",p),"aria-label":`Order status: ${a}`,children:g.map((O,s)=>{const t=a==="Complete"?s<=m:s<m,n=a!=="Complete"&&s===m,E=c("w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0",t&&"bg-[var(--accent-green)] text-white",n&&"bg-[var(--accent-orange)] text-white",!t&&!n&&"bg-[var(--secondary)] text-[var(--muted-foreground)] border border-[var(--border)]"),I=c("text-xs text-center mt-1 whitespace-nowrap",t&&"text-[var(--accent-green)] font-medium",n&&"text-[var(--accent-orange)] font-medium",!t&&!n&&"text-[var(--muted-foreground)]");return e.jsxs(_.Fragment,{children:[e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsx("div",{className:E,"aria-current":n?"step":void 0,children:t?"✓":s+1}),e.jsx("span",{className:I,children:O.label})]}),s<g.length-1&&e.jsx("div",{className:"flex-1 self-start mt-3.5 px-1",children:e.jsx("div",{className:c("h-0.5 w-full transition-colors",t?"bg-[var(--accent-green)]":"bg-[var(--border)]")})})]},s)})})}r.__docgenInfo={description:`Visual timeline / progress indicator that shows an order moving through its
stages: In Queue → Printing → Done. Cancelled orders display a distinct
"Cancelled" badge instead of the timeline.`,methods:[],displayName:"OrderStatusTimeline",props:{status:{required:!0,tsType:{name:"union",raw:"'Queue' | 'Printing' | 'Complete' | 'Cancelled'",elements:[{name:"literal",value:"'Queue'"},{name:"literal",value:"'Printing'"},{name:"literal",value:"'Complete'"},{name:"literal",value:"'Cancelled'"}]},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const V={title:"Components/OrderStatusTimeline",component:r,tags:["autodocs"],parameters:{layout:"padded"},argTypes:{status:{control:"select",options:["Queue","Printing","Complete","Cancelled"]}}},i={args:{status:"Queue"}},l={args:{status:"Printing"}},o={args:{status:"Complete"}},d={args:{status:"Cancelled"}},u={args:{status:"Queue"},render:()=>e.jsxs("div",{className:"space-y-8 max-w-sm",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx("p",{className:"text-xs text-[var(--muted-foreground)] uppercase tracking-wider",children:"Queue"}),e.jsx(r,{status:"Queue"})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("p",{className:"text-xs text-[var(--muted-foreground)] uppercase tracking-wider",children:"Printing"}),e.jsx(r,{status:"Printing"})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("p",{className:"text-xs text-[var(--muted-foreground)] uppercase tracking-wider",children:"Complete"}),e.jsx(r,{status:"Complete"})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("p",{className:"text-xs text-[var(--muted-foreground)] uppercase tracking-wider",children:"Cancelled"}),e.jsx(r,{status:"Cancelled"})]})]})};var x,v,f;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    status: 'Queue'
  }
}`,...(f=(v=i.parameters)==null?void 0:v.docs)==null?void 0:f.source}}};var h,C,N;l.parameters={...l.parameters,docs:{...(h=l.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    status: 'Printing'
  }
}`,...(N=(C=l.parameters)==null?void 0:C.docs)==null?void 0:N.source}}};var j,y,b;o.parameters={...o.parameters,docs:{...(j=o.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    status: 'Complete'
  }
}`,...(b=(y=o.parameters)==null?void 0:y.docs)==null?void 0:b.source}}};var w,S,P;d.parameters={...d.parameters,docs:{...(w=d.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    status: 'Cancelled'
  }
}`,...(P=(S=d.parameters)==null?void 0:S.docs)==null?void 0:P.source}}};var Q,T,k;u.parameters={...u.parameters,docs:{...(Q=u.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    status: 'Queue'
  },
  render: () => <div className="space-y-8 max-w-sm">
      <div className="space-y-2">
        <p className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider">Queue</p>
        <OrderStatusTimeline status="Queue" />
      </div>
      <div className="space-y-2">
        <p className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider">Printing</p>
        <OrderStatusTimeline status="Printing" />
      </div>
      <div className="space-y-2">
        <p className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider">Complete</p>
        <OrderStatusTimeline status="Complete" />
      </div>
      <div className="space-y-2">
        <p className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider">Cancelled</p>
        <OrderStatusTimeline status="Cancelled" />
      </div>
    </div>
}`,...(k=(T=u.parameters)==null?void 0:T.docs)==null?void 0:k.source}}};const X=["InQueue","Printing","Complete","Cancelled","AllStates"];export{u as AllStates,d as Cancelled,o as Complete,i as InQueue,l as Printing,X as __namedExportsOrder,V as default};
