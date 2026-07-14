import{j as e}from"./jsx-runtime-CFY_2KVU.js";import{r as I}from"./index-Dq4ZvVuH.js";import{c}from"./cn-DjqsqOe8.js";import"./_commonjsHelpers-CqkleIqs.js";const g=[{label:"In Queue"},{label:"Printing"},{label:"Done"}],A={waiting:0,in_progress:1,complete:2};function r({status:a,className:p}){if(a==="cancelled")return e.jsx("div",{className:c("flex items-center",p),children:e.jsxs("span",{className:"inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-[var(--accent-red-light)] text-[var(--accent-red)]",children:[e.jsx("span",{"aria-hidden":"true",children:"✕"}),e.jsx("span",{children:"Cancelled"})]})});const u=A[a];return e.jsx("div",{className:c("flex items-start",p),"aria-label":`Order status: ${a}`,children:g.map((O,s)=>{const t=a==="complete"?s<=u:s<u,n=a!=="complete"&&s===u,_=c("w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0",t&&"bg-[var(--accent-green)] text-white",n&&"bg-[var(--accent-orange)] text-white",!t&&!n&&"bg-[var(--secondary)] text-[var(--muted-foreground)] border border-[var(--border)]"),E=c("text-xs text-center mt-1 whitespace-nowrap",t&&"text-[var(--accent-green)] font-medium",n&&"text-[var(--accent-orange)] font-medium",!t&&!n&&"text-[var(--muted-foreground)]");return e.jsxs(I.Fragment,{children:[e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsx("div",{className:_,"aria-current":n?"step":void 0,children:t?"✓":s+1}),e.jsx("span",{className:E,children:O.label})]}),s<g.length-1&&e.jsx("div",{className:"flex-1 self-start mt-3.5 px-1",children:e.jsx("div",{className:c("h-0.5 w-full transition-colors",t?"bg-[var(--accent-green)]":"bg-[var(--border)]")})})]},s)})})}r.__docgenInfo={description:`Visual timeline / progress indicator that shows an order moving through its
stages: In Queue → Printing → Done. Cancelled orders display a distinct
"Cancelled" badge instead of the timeline.`,methods:[],displayName:"OrderStatusTimeline",props:{status:{required:!0,tsType:{name:"union",raw:"'waiting' | 'in_progress' | 'complete' | 'cancelled'",elements:[{name:"literal",value:"'waiting'"},{name:"literal",value:"'in_progress'"},{name:"literal",value:"'complete'"},{name:"literal",value:"'cancelled'"}]},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const V={title:"Components/OrderStatusTimeline",component:r,tags:["autodocs"],parameters:{layout:"padded"},argTypes:{status:{control:"select",options:["Queue","Printing","Complete","Cancelled"]}}},i={args:{status:"Queue"}},l={args:{status:"Printing"}},o={args:{status:"Complete"}},d={args:{status:"Cancelled"}},m={args:{status:"Queue"},render:()=>e.jsxs("div",{className:"space-y-8 max-w-sm",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsx("p",{className:"text-xs text-[var(--muted-foreground)] uppercase tracking-wider",children:"Queue"}),e.jsx(r,{status:"Queue"})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("p",{className:"text-xs text-[var(--muted-foreground)] uppercase tracking-wider",children:"Printing"}),e.jsx(r,{status:"Printing"})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("p",{className:"text-xs text-[var(--muted-foreground)] uppercase tracking-wider",children:"Complete"}),e.jsx(r,{status:"Complete"})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("p",{className:"text-xs text-[var(--muted-foreground)] uppercase tracking-wider",children:"Cancelled"}),e.jsx(r,{status:"Cancelled"})]})]})};var x,v,f;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    status: 'Queue'
  }
}`,...(f=(v=i.parameters)==null?void 0:v.docs)==null?void 0:f.source}}};var h,N,j;l.parameters={...l.parameters,docs:{...(h=l.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    status: 'Printing'
  }
}`,...(j=(N=l.parameters)==null?void 0:N.docs)==null?void 0:j.source}}};var C,w,y;o.parameters={...o.parameters,docs:{...(C=o.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    status: 'Complete'
  }
}`,...(y=(w=o.parameters)==null?void 0:w.docs)==null?void 0:y.source}}};var b,S,P;d.parameters={...d.parameters,docs:{...(b=d.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    status: 'Cancelled'
  }
}`,...(P=(S=d.parameters)==null?void 0:S.docs)==null?void 0:P.source}}};var Q,T,k;m.parameters={...m.parameters,docs:{...(Q=m.parameters)==null?void 0:Q.docs,source:{originalSource:`{
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
}`,...(k=(T=m.parameters)==null?void 0:T.docs)==null?void 0:k.source}}};const X=["InQueue","Printing","Complete","Cancelled","AllStates"];export{m as AllStates,d as Cancelled,o as Complete,i as InQueue,l as Printing,X as __namedExportsOrder,V as default};
