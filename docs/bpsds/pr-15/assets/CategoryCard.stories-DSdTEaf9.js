import{j as t}from"./jsx-runtime-Cf8x2fCZ.js";import{c as u}from"./cn-DjqsqOe8.js";import"./index-yBjzXJbu.js";function r({image:e,imageAlt:x,title:h,subtitle:n,href:s,className:f}){const o=t.jsxs("div",{className:u("group relative overflow-hidden rounded-lg bg-[var(--bps-gray-100)]","border border-[var(--bps-gray-200)] hover:shadow-[var(--shadow-lg)] transition-shadow duration-200 cursor-pointer",f),children:[t.jsxs("div",{className:"relative overflow-hidden aspect-[4/3]",children:[t.jsx("img",{src:e,alt:x,className:"w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"}),t.jsx("div",{className:"absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"})]}),t.jsxs("div",{className:"absolute bottom-0 left-0 right-0 p-3",children:[t.jsx("h3",{className:"text-white font-bold text-base leading-tight drop-shadow",children:h}),n&&t.jsx("p",{className:"text-white/80 text-xs mt-0.5",children:n}),t.jsx("span",{className:"inline-block mt-1.5 text-[var(--bps-gold)] text-xs font-semibold uppercase tracking-wide group-hover:underline",children:"Shop Now →"})]})]});return s?t.jsx("a",{href:s,className:"block no-underline",children:o}):o}r.__docgenInfo={description:"",methods:[],displayName:"CategoryCard",props:{image:{required:!0,tsType:{name:"string"},description:""},imageAlt:{required:!0,tsType:{name:"string"},description:""},title:{required:!0,tsType:{name:"string"},description:""},subtitle:{required:!1,tsType:{name:"string"},description:""},href:{required:!1,tsType:{name:"string"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};const w={title:"BPS Components/CategoryCard",component:r,tags:["autodocs"],parameters:{backgrounds:{default:"light"}}},i={args:{image:"https://placehold.co/400x300/1a472a/ffffff?text=Fishing",imageAlt:"Fishing",title:"Fishing",subtitle:"Rods, Reels, Tackle & More",href:"#"}},a={render:()=>t.jsx("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-4 p-4 max-w-4xl",children:[{title:"Fishing",img:"1a472a",text:"Fishing"},{title:"Hunting",img:"2d6a4f",text:"Hunting"},{title:"Camping",img:"5c3d2e",text:"Camping"},{title:"Boating",img:"1a3a5c",text:"Boating"},{title:"Clothing",img:"c9a227",text:"Clothing"},{title:"Footwear",img:"3a7d59",text:"Footwear"},{title:"Optics",img:"333333",text:"Optics"},{title:"Sale",img:"c0392b",text:"SALE"}].map(e=>t.jsx(r,{image:`https://placehold.co/400x300/${e.img}/ffffff?text=${e.text}`,imageAlt:e.title,title:e.title,href:"#"},e.title))})};var l,g,d;i.parameters={...i.parameters,docs:{...(l=i.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    image: 'https://placehold.co/400x300/1a472a/ffffff?text=Fishing',
    imageAlt: 'Fishing',
    title: 'Fishing',
    subtitle: 'Rods, Reels, Tackle & More',
    href: '#'
  }
}`,...(d=(g=i.parameters)==null?void 0:g.docs)==null?void 0:d.source}}};var c,m,p;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 max-w-4xl">
      {[{
      title: 'Fishing',
      img: '1a472a',
      text: 'Fishing'
    }, {
      title: 'Hunting',
      img: '2d6a4f',
      text: 'Hunting'
    }, {
      title: 'Camping',
      img: '5c3d2e',
      text: 'Camping'
    }, {
      title: 'Boating',
      img: '1a3a5c',
      text: 'Boating'
    }, {
      title: 'Clothing',
      img: 'c9a227',
      text: 'Clothing'
    }, {
      title: 'Footwear',
      img: '3a7d59',
      text: 'Footwear'
    }, {
      title: 'Optics',
      img: '333333',
      text: 'Optics'
    }, {
      title: 'Sale',
      img: 'c0392b',
      text: 'SALE'
    }].map(cat => <CategoryCard key={cat.title} image={\`https://placehold.co/400x300/\${cat.img}/ffffff?text=\${cat.text}\`} imageAlt={cat.title} title={cat.title} href="#" />)}
    </div>
}`,...(p=(m=a.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};const y=["Default","CategoryGrid"];export{a as CategoryGrid,i as Default,y as __namedExportsOrder,w as default};
