import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{c as t,s as ae}from"./tokens-PUChd5-i.js";import{a as x,u as le}from"./useHover-DxhSpJwM.js";import{r as B,R as ne}from"./index-Dx_1l3Sb.js";import"./index-yBjzXJbu.js";import"./_commonjsHelpers-CqkleIqs.js";const de={fontFamily:"var(--ui)",fontWeight:600,fontSize:12,letterSpacing:".1em",textTransform:"uppercase",color:t.muted,display:"block",marginBottom:7},S={width:"100%",fontFamily:"var(--ui)",fontSize:15,color:t.ink,padding:"12px 15px",border:"1.5px solid #E0DACF",borderRadius:11,background:"#FDFCF9",outline:"none",transition:"border-color .2s ease,box-shadow .2s ease"},j={borderColor:t.pine,boxShadow:"0 0 0 3px rgba(24,74,79,.14)"},ce={color:t.jade,border:`1.5px solid ${t.jade}`,background:t.surface,boxShadow:"0 0 0 3px rgba(9,109,97,.12)"},pe={color:t.red,border:`1.5px solid ${t.red}`,background:t.surface,boxShadow:"0 0 0 3px rgba(255,59,59,.1)"},ue={fontFamily:"var(--ui)",fontSize:12,color:t.jade},me={fontFamily:"var(--ui)",fontSize:12,color:t.red};function w(a){return a==="valid"?ce:a==="invalid"?pe:{}}function F({children:a}){return a?e.jsx("label",{style:de,children:a}):null}function R({state:a,message:r}){if(a==="default")return null;const s=r??(a==="valid"?"✓ Looks good":"Please enter a valid email");return e.jsx("div",{style:{marginTop:8,...a==="valid"?ue:me},children:s})}function c({label:a,state:r="default",message:s,style:i,type:o="text",...d}){const{isFocused:l,focusProps:n}=x();return e.jsxs("div",{children:[e.jsx(F,{children:a}),e.jsx("input",{type:o,...d,...n,style:{...S,...w(r),...r==="default"&&l?j:{},...i}}),e.jsx(R,{state:r,message:s})]})}function T({label:a,state:r="default",message:s,options:i,children:o,style:d,...l}){const{isFocused:n,focusProps:v}=x();return e.jsxs("div",{children:[e.jsx(F,{children:a}),e.jsx("select",{...l,...v,style:{...S,cursor:"pointer",...w(r),...r==="default"&&n?j:{},...d},children:i?i.map(g=>e.jsx("option",{children:g},g)):o}),e.jsx(R,{state:r,message:s})]})}function k({label:a,state:r="default",message:s,rows:i=3,style:o,...d}){const{isFocused:l,focusProps:n}=x();return e.jsxs("div",{children:[e.jsx(F,{children:a}),e.jsx("textarea",{rows:i,...d,...n,style:{...S,fontFamily:"var(--serif)",resize:"vertical",...w(r),...r==="default"&&l?j:{},...o}}),e.jsx(R,{state:r,message:s})]})}c.__docgenInfo={description:"",methods:[],displayName:"TextInput",props:{label:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},state:{required:!1,tsType:{name:"union",raw:"'default' | 'valid' | 'invalid'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'valid'"},{name:"literal",value:"'invalid'"}]},description:"",defaultValue:{value:"'default'",computed:!1}},message:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Override the auto helper message shown for valid/invalid states."},style:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:""},type:{defaultValue:{value:"'text'",computed:!1},required:!1}}};T.__docgenInfo={description:"",methods:[],displayName:"SelectInput",props:{label:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},state:{required:!1,tsType:{name:"union",raw:"'default' | 'valid' | 'invalid'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'valid'"},{name:"literal",value:"'invalid'"}]},description:"",defaultValue:{value:"'default'",computed:!1}},message:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Override the auto helper message shown for valid/invalid states."},options:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},style:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:""}}};k.__docgenInfo={description:"",methods:[],displayName:"TextAreaField",props:{label:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},state:{required:!1,tsType:{name:"union",raw:"'default' | 'valid' | 'invalid'",elements:[{name:"literal",value:"'default'"},{name:"literal",value:"'valid'"},{name:"literal",value:"'invalid'"}]},description:"",defaultValue:{value:"'default'",computed:!1}},message:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Override the auto helper message shown for valid/invalid states."},style:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:""},rows:{defaultValue:{value:"3",computed:!1},required:!1}}};const fe={background:t.pine,borderRadius:16,padding:"30px 28px",color:t.paper},ye={fontFamily:"var(--ui)",fontSize:11,letterSpacing:".2em",textTransform:"uppercase",color:"#9FC2BF",marginBottom:8},ge={fontFamily:"var(--display)",fontWeight:800,fontSize:24,margin:"0 0 6px",lineHeight:1.1},xe={fontFamily:"var(--serif)",fontSize:15,color:"#CFE2E0",margin:"0 0 18px"},ve={fontFamily:"var(--ui)",fontWeight:600,fontSize:15,background:t.lime,color:t.ink,padding:"14px 16px",borderRadius:12,textAlign:"center",animation:`sc-pop .3s ${ae} both`},he={flex:1,minWidth:0,fontFamily:"var(--ui)",fontSize:15,color:t.ink,padding:"12px 15px",border:"none",borderRadius:11,background:"#FDFCF9",outline:"none"},be={boxShadow:"0 0 0 3px rgba(240,252,151,.5)"},Se={fontFamily:"var(--ui)",fontWeight:600,fontSize:15,background:t.red,color:"#fff",border:"none",padding:"12px 22px",borderRadius:11,cursor:"pointer",transition:`transform .2s ${ae}`},je={transform:"translateY(-2px)"};function C({subscribed:a=!1,eyebrow:r="Weekly Marketing Newsletter",heading:s="Go further every week.",body:i="One sharp idea on brand and story. No noise.",onSubscribe:o}){const[d,l]=B.useState(a),[n,v]=B.useState(""),{isHovered:g,hoverProps:re}=le(),{isFocused:se,focusProps:oe}=x();ne.useEffect(()=>l(a),[a]);const ie=h=>{h.preventDefault(),o==null||o(n),l(!0)};return e.jsxs("div",{style:fe,children:[e.jsx("div",{style:ye,children:r}),e.jsx("h3",{style:ge,children:s}),e.jsx("p",{style:xe,children:i}),d?e.jsx("div",{style:ve,children:"✓ You're on the list. Talk soon."}):e.jsxs("form",{onSubmit:ie,style:{display:"flex",gap:9},children:[e.jsx("input",{type:"email",value:n,onChange:h=>v(h.target.value),placeholder:"you@email.com",...oe,style:{...he,...se?be:{}}}),e.jsx("button",{type:"submit",...re,style:{...Se,...g?je:{}},children:"Join"})]})]})}C.__docgenInfo={description:"",methods:[],displayName:"NewsletterSignup",props:{subscribed:{required:!1,tsType:{name:"boolean"},description:"Force the confirmed state (useful for stories / SSR).",defaultValue:{value:"false",computed:!1}},eyebrow:{required:!1,tsType:{name:"string"},description:"Eyebrow label above the heading.",defaultValue:{value:"'Weekly Marketing Newsletter'",computed:!1}},heading:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Go further every week.'",computed:!1}},body:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'One sharp idea on brand and story. No noise.'",computed:!1}},onSubscribe:{required:!1,tsType:{name:"signature",type:"function",raw:"(email: string) => void",signature:{arguments:[{type:{name:"string"},name:"email"}],return:{name:"void"}}},description:"Called with the submitted email when the form is sent."}}};const we={background:"#fff",border:`1px solid ${t.border}`,borderRadius:16,padding:28,display:"flex",flexDirection:"column",gap:18},Fe={display:"flex",gap:18},b={fontFamily:"var(--ui)",fontSize:14,color:t.ink,display:"flex",alignItems:"center",gap:8,cursor:"pointer"},Re={width:18,height:18,borderRadius:5,background:t.pine,display:"inline-flex",alignItems:"center",justifyContent:"center",color:t.lime,fontSize:11},Te={width:18,height:18,borderRadius:5,border:"1.5px solid #C9C2B6"},ke={width:18,height:18,borderRadius:"50%",border:`5px solid ${t.pine}`,background:"#fff"};function N({projectTypes:a=["Branding","Video production","Marketing strategy"]}){return e.jsxs("div",{style:we,children:[e.jsx(c,{label:"Full name",placeholder:"Miles Ramsay"}),e.jsx(T,{label:"Project type",options:a}),e.jsx(k,{label:"Tell us the story",rows:3,placeholder:"What are you trying to say, and to whom?"}),e.jsxs("div",{style:Fe,children:[e.jsxs("label",{style:b,children:[e.jsx("span",{style:Re,children:"✓"}),"Email"]}),e.jsxs("label",{style:b,children:[e.jsx("span",{style:Te}),"Phone"]}),e.jsxs("label",{style:b,children:[e.jsx("span",{style:ke}),"ASAP"]})]})]})}N.__docgenInfo={description:"",methods:[],displayName:"ContactForm",props:{projectTypes:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:'Options for the "Project type" select.',defaultValue:{value:"['Branding', 'Video production', 'Marketing strategy']",computed:!1}}}};const Ee={title:"Components/Forms",tags:["autodocs"],parameters:{docs:{description:{component:"Forms & Inputs — inputs focus to pine with a soft ring. Includes the inline newsletter signup and the valid/invalid field states from the live site."}}}},Ce={background:"#fff",border:"1px solid #E7E1D8",borderRadius:16,padding:28,display:"flex",flexDirection:"column",gap:18,maxWidth:420},p={render:()=>e.jsxs("div",{style:Ce,children:[e.jsx(c,{label:"Full name",placeholder:"Miles Ramsay"}),e.jsx(T,{label:"Project type",options:["Branding","Video production","Marketing strategy"]}),e.jsx(k,{label:"Tell us the story",rows:3,placeholder:"What are you trying to say, and to whom?"})]})},u={render:()=>e.jsxs("div",{style:{background:"#fff",border:"1px solid #E7E1D8",borderRadius:16,padding:"24px 28px",maxWidth:420},children:[e.jsx("div",{style:{fontFamily:"var(--ui)",fontSize:11,letterSpacing:".2em",textTransform:"uppercase",color:"#5C6B68",marginBottom:14},children:"States"}),e.jsx("div",{style:{marginBottom:14},children:e.jsx(c,{state:"valid",defaultValue:"hello@5280.com",message:"✓ Looks good"})}),e.jsx(c,{state:"invalid",defaultValue:"not-an-email",message:"Please enter a valid email"})]})},m={render:()=>e.jsx("div",{style:{maxWidth:420},children:e.jsx(C,{})})},f={render:()=>e.jsx("div",{style:{maxWidth:420},children:e.jsx(N,{})})},y={parameters:{layout:"fullscreen"},render:()=>e.jsx("div",{style:{padding:32,background:"#FBF9F5"},children:e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18,alignItems:"start",maxWidth:880},children:[e.jsx(N,{}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:18},children:[e.jsx(C,{}),e.jsxs("div",{style:{background:"#fff",border:"1px solid #E7E1D8",borderRadius:16,padding:"24px 28px"},children:[e.jsx("div",{style:{fontFamily:"var(--ui)",fontSize:11,letterSpacing:".2em",textTransform:"uppercase",color:"#5C6B68",marginBottom:14},children:"States"}),e.jsx("div",{style:{marginBottom:14},children:e.jsx(c,{state:"valid",defaultValue:"hello@5280.com",message:"✓ Looks good"})}),e.jsx(c,{state:"invalid",defaultValue:"not-an-email",message:"Please enter a valid email"})]})]})]})})};var I,V,q,P,E;p.parameters={...p.parameters,docs:{...(I=p.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <div style={card}>
      <TextInput label="Full name" placeholder="Miles Ramsay" />
      <SelectInput label="Project type" options={['Branding', 'Video production', 'Marketing strategy']} />
      <TextAreaField label="Tell us the story" rows={3} placeholder="What are you trying to say, and to whom?" />
    </div>
}`,...(q=(V=p.parameters)==null?void 0:V.docs)==null?void 0:q.source},description:{story:"Label + input + focus ring across all three control types.",...(E=(P=p.parameters)==null?void 0:P.docs)==null?void 0:E.description}}};var W,z,D,M,_;u.parameters={...u.parameters,docs:{...(W=u.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: () => <div style={{
    background: '#fff',
    border: '1px solid #E7E1D8',
    borderRadius: 16,
    padding: '24px 28px',
    maxWidth: 420
  }}>
      <div style={{
      fontFamily: 'var(--ui)',
      fontSize: 11,
      letterSpacing: '.2em',
      textTransform: 'uppercase',
      color: '#5C6B68',
      marginBottom: 14
    }}>
        States
      </div>
      <div style={{
      marginBottom: 14
    }}>
        <TextInput state="valid" defaultValue="hello@5280.com" message="✓ Looks good" />
      </div>
      <TextInput state="invalid" defaultValue="not-an-email" message="Please enter a valid email" />
    </div>
}`,...(D=(z=u.parameters)==null?void 0:z.docs)==null?void 0:D.source},description:{story:'Green "Looks good" and red "Please enter a valid email" states.',...(_=(M=u.parameters)==null?void 0:M.docs)==null?void 0:_.description}}};var A,L,O,$,H;m.parameters={...m.parameters,docs:{...(A=m.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => <div style={{
    maxWidth: 420
  }}>
      <NewsletterSignup />
    </div>
}`,...(O=(L=m.parameters)==null?void 0:L.docs)==null?void 0:O.source},description:{story:"Interactive: submit swaps the form for the lime confirmation (sc-pop).",...(H=($=m.parameters)==null?void 0:$.docs)==null?void 0:H.description}}};var G,Y,J,K,Q;f.parameters={...f.parameters,docs:{...(G=f.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: () => <div style={{
    maxWidth: 420
  }}>
      <ContactForm />
    </div>
}`,...(J=(Y=f.parameters)==null?void 0:Y.docs)==null?void 0:J.source},description:{story:"The full white-card contact form composite.",...(Q=(K=f.parameters)==null?void 0:K.docs)==null?void 0:Q.description}}};var U,X,Z,ee,te;y.parameters={...y.parameters,docs:{...(U=y.parameters)==null?void 0:U.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen'
  },
  render: () => <div style={{
    padding: 32,
    background: '#FBF9F5'
  }}>
      <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 18,
      alignItems: 'start',
      maxWidth: 880
    }}>
        <ContactForm />
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 18
      }}>
          <NewsletterSignup />
          <div style={{
          background: '#fff',
          border: '1px solid #E7E1D8',
          borderRadius: 16,
          padding: '24px 28px'
        }}>
            <div style={{
            fontFamily: 'var(--ui)',
            fontSize: 11,
            letterSpacing: '.2em',
            textTransform: 'uppercase',
            color: '#5C6B68',
            marginBottom: 14
          }}>
              States
            </div>
            <div style={{
            marginBottom: 14
          }}>
              <TextInput state="valid" defaultValue="hello@5280.com" message="✓ Looks good" />
            </div>
            <TextInput state="invalid" defaultValue="not-an-email" message="Please enter a valid email" />
          </div>
        </div>
      </div>
    </div>
}`,...(Z=(X=y.parameters)==null?void 0:X.docs)==null?void 0:Z.source},description:{story:"The complete forms section: contact card alongside newsletter + states.",...(te=(ee=y.parameters)==null?void 0:ee.docs)==null?void 0:te.description}}};const We=["Fields","FieldStates","Newsletter","Contact","Section"];export{f as Contact,u as FieldStates,p as Fields,m as Newsletter,y as Section,We as __namedExportsOrder,Ee as default};
