import{j as e}from"./jsx-runtime-CFY_2KVU.js";import{r as m}from"./index-Dq4ZvVuH.js";import{P as E}from"./PageHeader-r1I1E2Uw.js";import{F as I}from"./FilterSidebar-CQQiGZjF.js";import{V as R}from"./ViewToggle-DT6Qrzo-.js";import{S as L}from"./SearchField-0q3E4o1W.js";import{c as U}from"./cn-DjqsqOe8.js";import{B as h}from"./Button-DUSK_GUh.js";import{E as B}from"./EmptyState-CpqEsYvn.js";import{P as v}from"./plus-DMroLpWo.js";import{c as G}from"./createLucideIcon-BnGyhE3A.js";import{U as _}from"./user-Cl9z8PF0.js";import{D as H}from"./download-Fc3s7BHs.js";import{S as W}from"./star-sK8VX0BB.js";import"./_commonjsHelpers-CqkleIqs.js";import"./Checkbox-BeXo_dSX.js";import"./RSPContexts-Dr342rEE.js";import"./utils-LaqegW2K.js";import"./Form-C-hz59zZ.js";import"./useFocusRing-ubySK4Mk.js";import"./usePress-B20iDxoD.js";import"./textSelection-BF8X-_NC.js";import"./index-BodQkoVg.js";import"./index-N4qaH3Gp.js";import"./useToggle-C9uo3gsR.js";import"./useFormReset-BTJT5q7I.js";import"./useToggleState-bM5DcLtG.js";import"./useControlledState-BJxFPo-I.js";import"./VisuallyHidden-Bfe7IVUU.js";import"./chevron-down-Bn5it-yX.js";import"./check-Be_n60n5.js";import"./ToggleButton-BiCImOGv.js";import"./SelectionIndicator-CoNWZYQ1.js";import"./useButton-BLdXFJ-e.js";import"./Button-kWM7j8ju.js";import"./ProgressBar-C-avWlme.js";import"./Label-ZdcYzoi0.js";import"./useLabels-CQ1wxQuf.js";import"./Hidden-o7BpdpsO.js";import"./useNumberFormatter-BKAMG5zQ.js";import"./context-DWzCBS5d.js";import"./FieldError-7evEVdN1.js";import"./Text-VdVr9Ew-.js";import"./Input-DanMQf3D.js";import"./useField-DNsN5OOF.js";import"./useLocalizedStringFormatter-CFq54QRB.js";import"./x-BEzLMO8q.js";/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],$=G("file-text",z);function u({title:s,description:a,breadcrumbs:r,actions:c,filterGroups:i=[],selectedFilters:t,onFilterChange:n,onClearFilters:l,searchValue:o,onSearchChange:d,searchPlaceholder:f="Search...",viewMode:P="list",onViewModeChange:k,filterColor:T="orange",viewToggleColor:q="orange",children:D,className:A}){return e.jsxs("div",{className:U("flex flex-col gap-6 min-h-screen bg-background p-6",A),children:[e.jsx(E,{title:s,description:a,breadcrumbs:r,actions:c}),e.jsxs("div",{className:"flex gap-6 flex-1",children:[i.length>0&&e.jsx(I,{groups:i,selectedFilters:t,onFilterChange:n,onClearAll:l,color:T,className:"hidden md:flex"}),e.jsxs("div",{className:"flex flex-col gap-4 flex-1 min-w-0",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"flex-1",children:e.jsx(L,{placeholder:f,value:o,onChange:d,focusColor:"orange"})}),e.jsx(R,{value:P,onChange:k??(()=>{}),color:q})]}),e.jsx("div",{className:"flex-1",children:D})]})]})]})}u.__docgenInfo={description:"",methods:[],displayName:"ListPage",props:{title:{required:!0,tsType:{name:"string"},description:""},description:{required:!1,tsType:{name:"string"},description:""},breadcrumbs:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:"{ label: string; href?: string; onClick?: () => void }",signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"href",value:{name:"string",required:!1}},{key:"onClick",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!1}}]}}],raw:"Array<{ label: string; href?: string; onClick?: () => void }>"},description:""},actions:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},filterGroups:{required:!1,tsType:{name:"Array",elements:[{name:"FilterGroup"}],raw:"FilterGroup[]"},description:"",defaultValue:{value:"[]",computed:!1}},selectedFilters:{required:!1,tsType:{name:"Record",elements:[{name:"string"},{name:"Array",elements:[{name:"string"}],raw:"string[]"}],raw:"Record<string, string[]>"},description:""},onFilterChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(groupId: string, optionId: string, checked: boolean) => void",signature:{arguments:[{type:{name:"string"},name:"groupId"},{type:{name:"string"},name:"optionId"},{type:{name:"boolean"},name:"checked"}],return:{name:"void"}}},description:""},onClearFilters:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},searchValue:{required:!1,tsType:{name:"string"},description:""},onSearchChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},searchPlaceholder:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Search...'",computed:!1}},viewMode:{required:!1,tsType:{name:"union",raw:"'list' | 'grid'",elements:[{name:"literal",value:"'list'"},{name:"literal",value:"'grid'"}]},description:"",defaultValue:{value:"'list'",computed:!1}},onViewModeChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(mode: ViewMode) => void",signature:{arguments:[{type:{name:"union",raw:"'list' | 'grid'",elements:[{name:"literal",value:"'list'"},{name:"literal",value:"'grid'"}]},name:"mode"}],return:{name:"void"}}},description:""},filterColor:{required:!1,tsType:{name:"union",raw:"'orange' | 'blue' | 'green' | 'purple'",elements:[{name:"literal",value:"'orange'"},{name:"literal",value:"'blue'"},{name:"literal",value:"'green'"},{name:"literal",value:"'purple'"}]},description:"",defaultValue:{value:"'orange'",computed:!1}},viewToggleColor:{required:!1,tsType:{name:"union",raw:"'orange' | 'blue' | 'green' | 'purple'",elements:[{name:"literal",value:"'orange'"},{name:"literal",value:"'blue'"},{name:"literal",value:"'green'"},{name:"literal",value:"'purple'"}]},description:"",defaultValue:{value:"'orange'",computed:!1}},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const Ge={title:"Patterns/ListPage",component:u,parameters:{layout:"fullscreen"},args:{title:"List"}},J=[{id:"status",label:"Status",options:[{id:"active",label:"Active",count:24},{id:"inactive",label:"Inactive",count:8},{id:"pending",label:"Pending",count:3}]},{id:"role",label:"Role",options:[{id:"admin",label:"Admin",count:5},{id:"editor",label:"Editor",count:12},{id:"viewer",label:"Viewer",count:18}]}],b=[{id:1,name:"Alice Johnson",email:"alice@example.com",role:"Admin",status:"Active"},{id:2,name:"Bob Smith",email:"bob@example.com",role:"Editor",status:"Active"},{id:3,name:"Carol White",email:"carol@example.com",role:"Viewer",status:"Inactive"},{id:4,name:"Dan Brown",email:"dan@example.com",role:"Editor",status:"Pending"},{id:5,name:"Eve Davis",email:"eve@example.com",role:"Viewer",status:"Active"}],p={render:()=>{const[s,a]=m.useState({}),[r,c]=m.useState("list"),i=(t,n,l)=>{a(o=>{const d=o[t]??[];return{...o,[t]:l?[...d,n]:d.filter(f=>f!==n)}})};return e.jsx(u,{title:"Users",description:"Manage your team members and their account permissions.",breadcrumbs:[{label:"Dashboard",href:"#"},{label:"Users"}],actions:e.jsxs("div",{className:"flex gap-2",children:[e.jsxs(h,{variant:"outline",children:[e.jsx(H,{className:"w-4 h-4"}),"Export"]}),e.jsxs(h,{variant:"primary",color:"orange",children:[e.jsx(v,{className:"w-4 h-4"}),"Add User"]})]}),filterGroups:J,selectedFilters:s,onFilterChange:i,onClearFilters:()=>a({}),viewMode:r,onViewModeChange:c,searchPlaceholder:"Search users...",children:r==="list"?e.jsx("div",{className:"rounded-xl border border-border overflow-hidden",children:e.jsxs("table",{className:"w-full text-sm",children:[e.jsx("thead",{className:"bg-secondary",children:e.jsxs("tr",{children:[e.jsx("th",{className:"text-left px-4 py-3 text-muted-foreground font-medium",children:"Name"}),e.jsx("th",{className:"text-left px-4 py-3 text-muted-foreground font-medium",children:"Email"}),e.jsx("th",{className:"text-left px-4 py-3 text-muted-foreground font-medium",children:"Role"}),e.jsx("th",{className:"text-left px-4 py-3 text-muted-foreground font-medium",children:"Status"})]})}),e.jsx("tbody",{className:"divide-y divide-border",children:b.map(t=>e.jsxs("tr",{className:"hover:bg-secondary/50 transition-colors",children:[e.jsx("td",{className:"px-4 py-3 text-foreground font-medium",children:t.name}),e.jsx("td",{className:"px-4 py-3 text-muted-foreground",children:t.email}),e.jsx("td",{className:"px-4 py-3 text-muted-foreground",children:t.role}),e.jsx("td",{className:"px-4 py-3",children:e.jsx("span",{className:`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${t.status==="Active"?"bg-[var(--accent-green-light)] text-[var(--accent-green)]":t.status==="Pending"?"bg-[var(--accent-orange-light)] text-[var(--accent-orange)]":"bg-secondary text-muted-foreground"}`,children:t.status})})]},t.id))})]})}):e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",children:b.map(t=>e.jsx("div",{className:"p-4 bg-card rounded-xl border border-border hover:border-[var(--accent-orange)] transition-colors cursor-pointer",children:e.jsxs("div",{className:"flex items-start gap-3",children:[e.jsx("div",{className:"w-10 h-10 rounded-full bg-[var(--accent-orange-light)] flex items-center justify-center flex-shrink-0",children:e.jsx(_,{className:"w-5 h-5 text-[var(--accent-orange)]"})}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsx("p",{className:"text-sm font-medium text-foreground truncate",children:t.name}),e.jsx("p",{className:"text-xs text-muted-foreground truncate",children:t.email}),e.jsx("p",{className:"text-xs text-muted-foreground mt-1",children:t.role})]})]})},t.id))})})}},g={render:()=>{const[s,a]=m.useState({}),[r,c]=m.useState("list");return e.jsx(u,{title:"Documents",description:"All your documents in one place.",breadcrumbs:[{label:"Dashboard",href:"#"},{label:"Documents"}],actions:e.jsxs(h,{variant:"primary",color:"orange",children:[e.jsx(v,{className:"w-4 h-4"}),"New Document"]}),filterGroups:[{id:"type",label:"Type",options:[{id:"pdf",label:"PDF",count:0},{id:"doc",label:"Word",count:0}]}],selectedFilters:s,onFilterChange:(i,t,n)=>{a(l=>{const o=l[i]??[];return{...l,[i]:n?[...o,t]:o.filter(d=>d!==t)}})},onClearFilters:()=>a({}),viewMode:r,onViewModeChange:c,children:e.jsx(B,{icon:e.jsx($,{className:"w-12 h-12"}),title:"No documents yet",description:"Upload or create a document to get started.",action:e.jsxs(h,{variant:"primary",color:"orange",children:[e.jsx(v,{className:"w-4 h-4"}),"New Document"]})})})}},x={render:()=>{const[s,a]=m.useState("grid");return e.jsx(u,{title:"Favorites",viewMode:s,onViewModeChange:a,searchPlaceholder:"Search favorites...",children:e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",children:b.map(r=>e.jsxs("div",{className:"p-4 bg-card rounded-xl border border-border",children:[e.jsxs("div",{className:"flex items-center justify-between mb-2",children:[e.jsx("p",{className:"text-sm font-medium text-foreground",children:r.name}),e.jsx(W,{className:"w-4 h-4 text-[var(--accent-orange)]"})]}),e.jsx("p",{className:"text-xs text-muted-foreground",children:r.role})]},r.id))})})}};var y,N,w;p.parameters={...p.parameters,docs:{...(y=p.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => {
    const [selected, setSelected] = useState<Record<string, string[]>>({});
    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const handleFilterChange = (groupId: string, optionId: string, checked: boolean) => {
      setSelected(prev => {
        const current = prev[groupId] ?? [];
        return {
          ...prev,
          [groupId]: checked ? [...current, optionId] : current.filter(id => id !== optionId)
        };
      });
    };
    return <ListPage title="Users" description="Manage your team members and their account permissions." breadcrumbs={[{
      label: 'Dashboard',
      href: '#'
    }, {
      label: 'Users'
    }]} actions={<div className="flex gap-2">
            <Button variant="outline"><Download className="w-4 h-4" />Export</Button>
            <Button variant="primary" color="orange"><Plus className="w-4 h-4" />Add User</Button>
          </div>} filterGroups={sampleFilters} selectedFilters={selected} onFilterChange={handleFilterChange} onClearFilters={() => setSelected({})} viewMode={viewMode} onViewModeChange={setViewMode} searchPlaceholder="Search users...">
        {viewMode === 'list' ? <div className="rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-secondary">
                <tr>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">Name</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">Email</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">Role</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {sampleUsers.map(user => <tr key={user.id} className="hover:bg-secondary/50 transition-colors">
                    <td className="px-4 py-3 text-foreground font-medium">{user.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
                    <td className="px-4 py-3 text-muted-foreground">{user.role}</td>
                    <td className="px-4 py-3">
                      <span className={\`inline-flex items-center px-2 py-0.5 rounded-full text-xs \${user.status === 'Active' ? 'bg-[var(--accent-green-light)] text-[var(--accent-green)]' : user.status === 'Pending' ? 'bg-[var(--accent-orange-light)] text-[var(--accent-orange)]' : 'bg-secondary text-muted-foreground'}\`}>{user.status}</span>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div> : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sampleUsers.map(user => <div key={user.id} className="p-4 bg-card rounded-xl border border-border hover:border-[var(--accent-orange)] transition-colors cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--accent-orange-light)] flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-[var(--accent-orange)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    <p className="text-xs text-muted-foreground mt-1">{user.role}</p>
                  </div>
                </div>
              </div>)}
          </div>}
      </ListPage>;
  }
}`,...(w=(N=p.parameters)==null?void 0:N.docs)==null?void 0:w.source}}};var j,M,S;g.parameters={...g.parameters,docs:{...(j=g.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => {
    const [selected, setSelected] = useState<Record<string, string[]>>({});
    const [viewMode, setViewMode] = useState<ViewMode>('list');
    return <ListPage title="Documents" description="All your documents in one place." breadcrumbs={[{
      label: 'Dashboard',
      href: '#'
    }, {
      label: 'Documents'
    }]} actions={<Button variant="primary" color="orange"><Plus className="w-4 h-4" />New Document</Button>} filterGroups={[{
      id: 'type',
      label: 'Type',
      options: [{
        id: 'pdf',
        label: 'PDF',
        count: 0
      }, {
        id: 'doc',
        label: 'Word',
        count: 0
      }]
    }]} selectedFilters={selected} onFilterChange={(groupId, optionId, checked) => {
      setSelected(prev => {
        const current = prev[groupId] ?? [];
        return {
          ...prev,
          [groupId]: checked ? [...current, optionId] : current.filter(id => id !== optionId)
        };
      });
    }} onClearFilters={() => setSelected({})} viewMode={viewMode} onViewModeChange={setViewMode}>
        <EmptyState icon={<FileText className="w-12 h-12" />} title="No documents yet" description="Upload or create a document to get started." action={<Button variant="primary" color="orange"><Plus className="w-4 h-4" />New Document</Button>} />
      </ListPage>;
  }
}`,...(S=(M=g.parameters)==null?void 0:M.docs)==null?void 0:S.source}}};var F,V,C;x.parameters={...x.parameters,docs:{...(F=x.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => {
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    return <ListPage title="Favorites" viewMode={viewMode} onViewModeChange={setViewMode} searchPlaceholder="Search favorites...">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sampleUsers.map(user => <div key={user.id} className="p-4 bg-card rounded-xl border border-border">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-foreground">{user.name}</p>
                <Star className="w-4 h-4 text-[var(--accent-orange)]" />
              </div>
              <p className="text-xs text-muted-foreground">{user.role}</p>
            </div>)}
        </div>
      </ListPage>;
  }
}`,...(C=(V=x.parameters)==null?void 0:V.docs)==null?void 0:C.source}}};const _e=["ListViewWithFilters","EmptyList","NoFilters"];export{g as EmptyList,p as ListViewWithFilters,x as NoFilters,_e as __namedExportsOrder,Ge as default};
