import{j as e}from"./jsx-runtime-CFY_2KVU.js";import{S as a,U as j,a as R,D as C,A as T}from"./StatCard-BSdqiN-e.js";import"./index-Dq4ZvVuH.js";import"./_commonjsHelpers-CqkleIqs.js";import"./createLucideIcon-BnGyhE3A.js";import"./cn-DjqsqOe8.js";const $={title:"Components/StatCard",component:a,tags:["autodocs"],parameters:{layout:"padded"},args:{title:"Metric",value:"0"},argTypes:{color:{control:"select",options:["orange","blue","green","purple"]},title:{control:"text"},value:{control:"text"},description:{control:"text"}}},r={args:{title:"Total Users",value:"12,483",description:"Active accounts",color:"blue"}},t={args:{title:"Revenue",value:"$84,240",color:"green",trend:{direction:"up",value:"+12.5%",label:"vs. last month"},icon:e.jsx(C,{className:"w-5 h-5"})}},o={args:{title:"Churn Rate",value:"3.2%",color:"orange",trend:{direction:"down",value:"-0.8%",label:"vs. last month"}}},l={render:()=>e.jsxs("div",{className:"grid grid-cols-2 gap-4 max-w-2xl",children:[e.jsx(a,{title:"Total Users",value:"12,483",color:"blue",icon:e.jsx(j,{className:"w-5 h-5"}),trend:{direction:"up",value:"+5.2%",label:"vs. last month"}}),e.jsx(a,{title:"Orders",value:"1,847",color:"orange",icon:e.jsx(R,{className:"w-5 h-5"}),trend:{direction:"up",value:"+2.1%",label:"vs. last month"}}),e.jsx(a,{title:"Revenue",value:"$84,240",color:"green",icon:e.jsx(C,{className:"w-5 h-5"}),trend:{direction:"up",value:"+12.5%",label:"vs. last month"}}),e.jsx(a,{title:"Bounce Rate",value:"42.8%",color:"purple",icon:e.jsx(T,{className:"w-5 h-5"}),trend:{direction:"down",value:"-3.1%",label:"vs. last month"}})]})},s={args:{title:"Page Views",value:"98,312",color:"purple",trend:{direction:"neutral",value:"0%",label:"No change"}}};var n,c,i;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    title: 'Total Users',
    value: '12,483',
    description: 'Active accounts',
    color: 'blue'
  }
}`,...(i=(c=r.parameters)==null?void 0:c.docs)==null?void 0:i.source}}};var u,d,p;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    title: 'Revenue',
    value: '$84,240',
    color: 'green',
    trend: {
      direction: 'up',
      value: '+12.5%',
      label: 'vs. last month'
    },
    icon: <DollarSign className="w-5 h-5" />
  }
}`,...(p=(d=t.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};var m,v,g;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    title: 'Churn Rate',
    value: '3.2%',
    color: 'orange',
    trend: {
      direction: 'down',
      value: '-0.8%',
      label: 'vs. last month'
    }
  }
}`,...(g=(v=o.parameters)==null?void 0:v.docs)==null?void 0:g.source}}};var h,x,b;l.parameters={...l.parameters,docs:{...(h=l.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-2 gap-4 max-w-2xl">
      <StatCard title="Total Users" value="12,483" color="blue" icon={<Users className="w-5 h-5" />} trend={{
      direction: 'up',
      value: '+5.2%',
      label: 'vs. last month'
    }} />
      <StatCard title="Orders" value="1,847" color="orange" icon={<ShoppingCart className="w-5 h-5" />} trend={{
      direction: 'up',
      value: '+2.1%',
      label: 'vs. last month'
    }} />
      <StatCard title="Revenue" value="$84,240" color="green" icon={<DollarSign className="w-5 h-5" />} trend={{
      direction: 'up',
      value: '+12.5%',
      label: 'vs. last month'
    }} />
      <StatCard title="Bounce Rate" value="42.8%" color="purple" icon={<Activity className="w-5 h-5" />} trend={{
      direction: 'down',
      value: '-3.1%',
      label: 'vs. last month'
    }} />
    </div>
}`,...(b=(x=l.parameters)==null?void 0:x.docs)==null?void 0:b.source}}};var w,N,S;s.parameters={...s.parameters,docs:{...(w=s.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    title: 'Page Views',
    value: '98,312',
    color: 'purple',
    trend: {
      direction: 'neutral',
      value: '0%',
      label: 'No change'
    }
  }
}`,...(S=(N=s.parameters)==null?void 0:N.docs)==null?void 0:S.source}}};const O=["Default","WithTrend","NegativeTrend","ColorPalette","NoIcon"];export{l as ColorPalette,r as Default,o as NegativeTrend,s as NoIcon,t as WithTrend,O as __namedExportsOrder,$ as default};
