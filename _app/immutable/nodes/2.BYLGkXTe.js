import{a as N,t as P,c as Ge}from"../chunks/disclose-version.yZ1RdqRG.js";import{n as Y,q as ve,V as He,a3 as Ye,p as We,m as Ve,k as Qe,a1 as Ne,H as Xe,r as me,t as ue,y as ae,Z as Ze,ar as ne,v as qe,w as Pe,x as $e,aa as ea,h as Se,as as ge,at as De,au as Ce,av as aa,a0 as sa,aw as ra,a5 as ta,ax as je,R as la,ay as ca,am as ia,s as be,az as da,X as na,aA as oa,j as fa,aB as va,G as oe,L as b,M as E,J as j,K as fe,I as ye,N as q,f as _,D as K,aq as ua,e as pa}from"../chunks/runtime.q96lkfRn.js";import{d as ke,s as V}from"../chunks/render.BFyDhuu6.js";import{p as Ie,i as F}from"../chunks/if.BuwVjZQ7.js";import{i as ha}from"../chunks/legacy.CcqOJQNb.js";function Te(a,e){return e}function ya(a,e,r,l){for(var c=[],i=e.length,t=0;t<i;t++)aa(e[t].e,c,!0);var f=i>0&&c.length===0&&r!==null;if(f){var o=r.parentNode;sa(o),o.append(r),l.clear(),W(a,e[0].prev,e[i-1].next)}ra(c,()=>{for(var h=0;h<i;h++){var p=e[h];f||(l.delete(p.k),W(a,p.prev,p.next)),ta(p.e,!f)}})}function xe(a,e,r,l,c,i=null){var t=a,f={flags:e,items:new Map,first:null},o=(e&je)!==0;if(o){var h=a;t=Y?ve(He(h)):h.appendChild(Ye())}Y&&We();var p=null,R=!1;Ve(()=>{var w=r(),n=Qe(w)?w:w==null?[]:Ne(w),v=n.length;if(R&&v===0)return;R=v===0;let y=!1;if(Y){var I=t.data===Xe;I!==(v===0)&&(t=me(),ve(t),ue(!1),y=!0)}if(Y){for(var C=null,m,S=0;S<v;S++){if(ae.nodeType===8&&ae.data===Ze){t=ae,y=!0,ue(!1);break}var B=n[S],u=l(B,S);m=Ue(ae,f,C,null,B,u,S,c,e),f.items.set(u,m),C=m}v>0&&ve(me())}if(!Y){var g=la;ga(n,f,t,c,e,(g.f&ne)!==0,l)}i!==null&&(v===0?p?qe(p):p=Pe(()=>i(t)):p!==null&&$e(p,()=>{p=null})),y&&ue(!0),r()}),Y&&(t=ae)}function ga(a,e,r,l,c,i,t,f){var $,ie,_e,Ee;var o=(c&ca)!==0,h=(c&(ge|Ce))!==0,p=a.length,R=e.items,w=e.first,n=w,v,y=null,I,C=[],m=[],S,B,u,g;if(o)for(g=0;g<p;g+=1)S=a[g],B=t(S,g),u=R.get(B),u!==void 0&&(($=u.a)==null||$.measure(),(I??(I=new Set)).add(u));for(g=0;g<p;g+=1){if(S=a[g],B=t(S,g),u=R.get(B),u===void 0){var Z=n?n.e.nodes_start:r;y=Ue(Z,e,y,y===null?e.first:y.next,S,B,g,l,c),R.set(B,y),C=[],m=[],n=y.next;continue}if(h&&Ca(u,S,g,c),u.e.f&ne&&(qe(u.e),o&&((ie=u.a)==null||ie.unfix(),(I??(I=new Set)).delete(u))),u!==n){if(v!==void 0&&v.has(u)){if(C.length<m.length){var D=m[0],k;y=D.prev;var J=C[0],X=C[C.length-1];for(k=0;k<C.length;k+=1)Ae(C[k],D,r);for(k=0;k<m.length;k+=1)v.delete(m[k]);W(e,J.prev,X.next),W(e,y,J),W(e,X,D),n=D,y=X,g-=1,C=[],m=[]}else v.delete(u),Ae(u,n,r),W(e,u.prev,u.next),W(e,u,y===null?e.first:y.next),W(e,y,u),y=u;continue}for(C=[],m=[];n!==null&&n.k!==B;)(i||!(n.e.f&ne))&&(v??(v=new Set)).add(n),m.push(n),n=n.next;if(n===null)continue;u=n}C.push(u),y=u,n=u.next}if(n!==null||v!==void 0){for(var O=v===void 0?[]:Ne(v);n!==null;)(i||!(n.e.f&ne))&&O.push(n),n=n.next;var U=O.length;if(U>0){var z=c&je&&p===0?r:null;if(o){for(g=0;g<U;g+=1)(_e=O[g].a)==null||_e.measure();for(g=0;g<U;g+=1)(Ee=O[g].a)==null||Ee.fix()}ya(e,O,z,R)}}o&&ea(()=>{var Re;if(I!==void 0)for(u of I)(Re=u.a)==null||Re.apply()}),Se.first=e.first&&e.first.e,Se.last=y&&y.e}function Ca(a,e,r,l){l&ge&&De(a.v,e),l&Ce?De(a.i,r):a.i=r}function Ue(a,e,r,l,c,i,t,f,o,h){var p=(o&ge)!==0,R=(o&da)===0,w=p?R?ia(c):be(c):c,n=o&Ce?be(t):t,v={i:n,v:w,k:i,a:null,e:null,prev:r,next:l};try{return v.e=Pe(()=>f(a,w,n),Y),v.e.prev=r&&r.e,v.e.next=l&&l.e,r===null?e.first=v:(r.next=v,r.e.next=v.e),l!==null&&(l.prev=v,l.e.prev=v.e),v}finally{}}function Ae(a,e,r){for(var l=a.next?a.next.e.nodes_start:r,c=e?e.e.nodes_start:r,i=a.e.nodes_start;i!==l;){var t=na(i);c.before(i),i=t}}function W(a,e,r){e===null?a.first=r:(e.next=r,e.e.next=r&&r.e),r!==null&&(r.prev=e,r.e.prev=e&&e.e)}function ce(a,e,r,l){var c=a.__attributes??(a.__attributes={});Y&&(c[e]=a.getAttribute(e),e==="src"||e==="srcset"||e==="href"&&a.nodeName==="LINK")||c[e]!==(c[e]=r)&&(e==="style"&&"__styles"in a&&(a.__styles={}),e==="loading"&&(a[oa]=r),r==null?a.removeAttribute(e):typeof r!="string"&&ka(a).includes(e)?a[e]=r:a.setAttribute(e,r))}var Be=new Map;function ka(a){var e=Be.get(a.nodeName);if(e)return e;Be.set(a.nodeName,e=[]);for(var r,l=a,c=Element.prototype;c!==l;){r=va(l);for(var i in r)r[i].set&&e.push(i);l=fa(l)}return e}function G(a,e,r){if(r){if(a.classList.contains(e))return;a.classList.add(e)}else{if(!a.classList.contains(e))return;a.classList.remove(e)}}function de(a,e,r,l){var c=a.__styles??(a.__styles={});c[e]!==r&&(c[e]=r,r==null?a.style.removeProperty(e):a.style.setProperty(e,r,""))}var d=(a=>(a.DRAW="draw",a.ROYALS="royals",a.CENTER="center",a.BORDER="border",a.ACES="aces",a.JOKERS="jokers",a.NULL="null",a))(d||{}),x=(a=>(a.HEART="♥",a.SPADE="♠",a.CLUB="♣",a.DIAMOND="♦",a.JOKER="joker",a))(x||{}),A=(a=>(a.ACE="ace",a.TWO="two",a.THREE="three",a.FOUR="four",a.FIVE="five",a.SIX="six",a.SEVEN="seven",a.EIGHT="eight",a.NINE="nine",a.TEN="ten",a.JACK="jack",a.QUEEN="queen",a.KING="king",a.JOKER="joker",a))(A||{});const ee={stacks:[{id:"-1",cards:[],type:d.NULL,validDropLocation:!1},{id:"B0",cards:[],type:d.BORDER,validDropLocation:!1},{id:"B1",cards:[],type:d.BORDER,validDropLocation:!1},{id:"B2",cards:[],type:d.BORDER,validDropLocation:!1},{id:"-1",cards:[],type:d.NULL,validDropLocation:!1},{id:"B3",cards:[],type:d.BORDER,validDropLocation:!1},{id:"C0",cards:[],type:d.CENTER,validDropLocation:!1},{id:"C1",cards:[],type:d.CENTER,validDropLocation:!1},{id:"C2",cards:[],type:d.CENTER,validDropLocation:!1},{id:"B4",cards:[],type:d.BORDER,validDropLocation:!1},{id:"B5",cards:[],type:d.BORDER,validDropLocation:!1},{id:"C3",cards:[],type:d.CENTER,validDropLocation:!1},{id:"C4",cards:[],type:d.CENTER,validDropLocation:!1},{id:"C5",cards:[],type:d.CENTER,validDropLocation:!1},{id:"B6",cards:[],type:d.BORDER,validDropLocation:!1},{id:"B7",cards:[],type:d.BORDER,validDropLocation:!1},{id:"C6",cards:[],type:d.CENTER,validDropLocation:!1},{id:"C7",cards:[],type:d.CENTER,validDropLocation:!1},{id:"C8",cards:[],type:d.CENTER,validDropLocation:!1},{id:"B8",cards:[],type:d.BORDER,validDropLocation:!1},{id:"-1",cards:[],type:d.NULL,validDropLocation:!1},{id:"B9",cards:[],type:d.BORDER,validDropLocation:!1},{id:"B10",cards:[],type:d.BORDER,validDropLocation:!1},{id:"B11",cards:[],type:d.BORDER,validDropLocation:!1},{id:"-1",cards:[],type:d.NULL,validDropLocation:!1}],draw:{id:"draw",cards:[],type:d.DRAW,validDropLocation:!1},jokers:{id:"jokers",cards:[],type:d.JOKERS,validDropLocation:!1},aces:{id:"aces",cards:[],type:d.ACES,validDropLocation:!1},royals:{id:"royals",cards:[],type:d.ROYALS,validDropLocation:!1},selectedCard:null,selectedSource:null,jokerActive:!1,aceActive:!1,gameOver:!1,gameOverMessage:"",hoveredStack:null},s=Ie(structuredClone(ee)),_a=()=>{s.stacks=structuredClone(ee.stacks),s.draw=structuredClone(ee.draw),s.jokers=structuredClone(ee.jokers),s.aces=structuredClone(ee.aces),s.royals=structuredClone(ee.royals),s.selectedCard=null,s.selectedSource=null,s.jokerActive=!1,s.aceActive=!1,s.gameOver=!1,s.gameOverMessage="",s.hoveredStack=null,ze()},Ea={B0:"C0",B1:"C1",B2:"C2",B3:"C0",B4:"C2",B5:"C3",B6:"C5",B7:"C6",B8:"C8",B9:"C6",B10:"C7",B11:"C8"},H={C0:["B0","B3"],C1:["B1"],C2:["B2","B4"],C3:["B5"],C4:[],C5:["B6"],C6:["B7","B9"],C7:["B10"],C8:["B8","B11"]};function Q(a){return a.rank===A.JACK||a.rank===A.QUEEN||a.rank===A.KING}function M(a){return a.suit===x.DIAMOND||a.suit===x.HEART}function Ke(a){if(a.cards.length===0)if(s.selectedCard&&a.validDropLocation){we(a);return}else return;const e=a.cards[a.cards.length-1];if(!(!e.isPlayable&&!e.isSelected)){if(s.selectedCard===null&&e.rank===A.ACE&&a.type===d.ACES){e.isSelected?(e.isSelected=!1,s.aceActive=!1):(e.isSelected=!0,s.aceActive=!0),te();return}if(s.selectedCard===null&&e.rank===A.JOKER&&a.type===d.JOKERS){e.isSelected?(e.isSelected=!1,s.jokerActive=!1):(e.isSelected=!0,s.jokerActive=!0),te();return}if(e.isSelected){Fe(),te();return}if(e.isPlayable&&s.selectedCard==null){if(e.isSelected=!0,e.isFaceUp=!0,s.selectedCard=e,s.selectedSource=a,s.aceActive){s.aceActive=!1,s.aces.cards.pop();for(const r of a.cards)r.isFaceUp=!1;s.draw.cards=a.cards.concat(s.draw.cards),a.cards=[],e.isSelected=!1,e.isPlayable=!1,s.selectedCard=null,s.selectedSource=null}te();return}if(e.isPlayable&&s.selectedCard&&s.selectedSource){we(a);return}}}const we=a=>{if(s.selectedSource){const e=s.selectedSource.cards.pop();if(e){if(a.type===d.BORDER&&s.selectedSource.type===d.DRAW&&!Q(e)){if(a.cards.length>0){const r=a.cards[a.cards.length-1];if(r.value+=e.value,r.value>=20){pe();return}else if(r.value>=19&&r.rank===A.KING){pe();return}r.isArmoured=!0,a.cards=[e].concat(a.cards)}}else a.cards.push(e);Fe(),s.jokerActive&&(s.jokerActive=!1,s.jokers.cards.pop()),a.type===d.CENTER&&Ra(a),te()}}s.draw.cards.length===0&&!Me()&&!s.jokerActive&&!s.aceActive&&s.jokers.cards.length==0&&s.aces.cards.length===0&&pe()},pe=()=>{s.gameOverMessage="You Lost!",s.gameOver=!0},Ra=a=>{switch(a.id){case"C0":{T("C1","C2","B4"),T("C3","C6","B9");break}case"C1":{T("C4","C7","B10");break}case"C2":{T("C5","C8","B11"),T("C1","C0","B3");break}case"C3":{T("C4","C5","B6");break}case"C5":{T("C4","C3","B5");break}case"C6":{T("C3","C0","B0"),T("C7","C8","B8");break}case"C7":{T("C4","C1","B1");break}case"C8":{T("C5","C2","B2"),T("C7","C6","B7");break}}},T=(a,e,r)=>{const l=s.stacks.find(t=>t.id==a),c=s.stacks.find(t=>t.id==e),i=s.stacks.find(t=>t.id==r);if(l&&c&&i){if(i.cards.length===0)return;{const t=i.cards[i.cards.length-1];let f=0;if(t.rank===A.JACK){if(l.cards.length>0){const o=l.cards[l.cards.length-1];f+=o.value}if(c.cards.length>0){const o=c.cards[c.cards.length-1];f+=o.value}}else if(t.rank===A.QUEEN){if(l.cards.length>0){const o=l.cards[l.cards.length-1];M(o)===M(t)&&(f+=o.value)}if(c.cards.length>0){const o=c.cards[c.cards.length-1];M(o)===M(t)&&(f+=o.value)}}else if(t.rank===A.KING){if(l.cards.length>0){const o=l.cards[l.cards.length-1];o.suit===t.suit&&(f+=o.value)}if(c.cards.length>0){const o=c.cards[c.cards.length-1];o.suit===t.suit&&(f+=o.value)}}if(f>=t.value){if(t.isFaceUp=!1,console.log(t.id," turned face down"),Me()){s.gameOverMessage="You Won! With a score of: "+(s.jokers.cards.length+s.aces.cards.length),s.gameOver=!0;return}ma()}}}},ma=()=>{let a=0;for(let e=0;e<s.stacks.length;e++){const r=s.stacks[e];if(r.type===d.BORDER&&r&&r.cards.length>0){const l=r.cards[r.cards.length-1];Q(l)&&l.isFaceUp&&a++}}a===0&&Je()};function Je(){const a=[];for(;s.royals.cards.length==0&&s.draw.cards.length>0;){const e=s.draw.cards.pop();e&&(Q(e)?(e.isFaceUp=!0,e.isPlayable=!0,s.royals.cards.push(e)):a.push(e))}s.draw.cards=a.concat(s.draw.cards)}function Me(){let a=0;for(let e=0;e<s.stacks.length;e++){const r=s.stacks[e];if(r.type===d.BORDER&&r&&r.cards.length>0){const l=r.cards[r.cards.length-1];Q(l)&&!l.isFaceUp&&a++}}return a>=12}const Fe=()=>{s.selectedCard&&(s.selectedCard.isSelected=!1,s.selectedCard=null,s.selectedSource=null)},te=()=>{if(s.selectedCard===null){if(s.aceActive||s.jokerActive){s.draw.cards.length>0&&(s.draw.cards[s.draw.cards.length-1].isPlayable=!1);for(let a=0;a<s.stacks.length;a++){const e=s.stacks[a];e.type===d.CENTER?e.cards.length>0&&(e.cards[e.cards.length-1].isPlayable=!0):e.type===d.BORDER&&(e.validDropLocation=!1,e.cards.length>0&&(e.cards[e.cards.length-1].isPlayable=!1))}s.aceActive?se():s.jokerActive&&re()}else s.royals.cards.length>0?(s.draw.cards.length>0&&(s.draw.cards[s.draw.cards.length-1].isPlayable=!1,s.royals.cards[s.royals.cards.length-1].isPlayable=!0),re(),se()):s.draw.cards.length>0?(s.draw.cards[s.draw.cards.length-1].isPlayable=!0,s.aces.cards.length>0&&(s.aces.cards[s.aces.cards.length-1].isPlayable=!0),s.jokers.cards.length>0&&(s.jokers.cards[s.jokers.cards.length-1].isPlayable=!0)):s.draw.cards.length===0&&(s.draw.validDropLocation=!1,s.aces.cards.length>0&&(s.aces.cards[s.aces.cards.length-1].isPlayable=!0),s.jokers.cards.length>0&&(s.jokers.cards[s.jokers.cards.length-1].isPlayable=!0));!s.aceActive&&!s.jokerActive&&he()}else if(s.selectedCard.isPlayable=!1,Q(s.selectedCard)){let a=null,e=[];for(let r=0;r<s.stacks.length;r++){const l=s.stacks[r];if(l.type===d.BORDER)if(l.cards.length===0){const c=s.stacks.find(i=>i.id==Ea[l.id]);if(c){if(c.cards.length>0){const i=c.cards[c.cards.length-1];if(a){if(Le(i,a,s.selectedCard)>0){a=i,e=[];for(let t=0;t<H[c.id].length;t++){const f=s.stacks.find(o=>o.id==H[c.id][t]);f&&e.push(f)}}else if(Le(i,a,s.selectedCard)===0)for(let t=0;t<H[c.id].length;t++){const f=s.stacks.find(o=>o.id==H[c.id][t]);f&&e.push(f)}}else{a=i;for(let t=0;t<H[c.id].length;t++){const f=s.stacks.find(o=>o.id==H[c.id][t]);f&&e.push(f)}}}else if(e.length===0)for(let i=0;i<H[c.id].length;i++){const t=s.stacks.find(f=>f.id==H[c.id][i]);t&&e.push(t)}}}else l.validDropLocation=!1,l.cards[l.cards.length-1].isPlayable=!1}for(let r=0;r<e.length;r++)e[r].validDropLocation=e[r].cards.length===0;se(),re(),Sa()}else if(s.selectedCard.rank==A.JOKER)console.log("cleared for selected rank joker"),Da(),re(),he();else if(s.selectedCard.rank==A.ACE)console.log("cleared for selected rank ace"),ba(),se(),he();else{let a=0;for(let e=1;e<s.stacks.length;e++){const r=s.stacks[e];r.type===d.CENTER&&(r.cards.length==0?(r.validDropLocation=!0,a++):s.selectedCard.value>=r.cards[r.cards.length-1].value?(r.validDropLocation=!0,r.cards[r.cards.length-1].isPlayable=!0,a++):(r.validDropLocation=!1,r.cards[r.cards.length-1].isPlayable=!1))}if(a===0&&s.jokers.cards.length+s.aces.cards.length===0)for(let e=0;e<s.stacks.length;e++){const r=s.stacks[e];if(r.type===d.BORDER&&r.cards.length>0){const l=r.cards[r.cards.length-1];l.isFaceUp&&(l.isPlayable=!0)}}se(),re()}},Le=(a,e,r)=>e.suit===r.suit?a.suit!==r.suit?-1:a.value-e.value:a.suit===r.suit?1:M(e)===M(r)?M(a)!==M(r)?-1:a.value-e.value:M(a)===M(r)?1:a.value-e.value,he=()=>{for(let a=1;a<s.stacks.length;a++){const e=s.stacks[a];(e.type===d.BORDER||e.type===d.CENTER)&&(e.validDropLocation=!1,e.cards.length!==0&&(e.cards[e.cards.length-1].isPlayable=!1))}},Sa=()=>{for(let a=1;a<s.stacks.length;a++){const e=s.stacks[a];e.type===d.CENTER&&(e.validDropLocation=!1,e.cards.length!==0&&(e.cards[e.cards.length-1].isPlayable=!1))}},se=()=>{s.jokers.validDropLocation=!1,s.jokers.cards.length>0&&(s.jokers.cards[s.jokers.cards.length-1].isPlayable=!1)},Da=()=>{s.jokers.validDropLocation=!0,s.jokers.cards.length>0&&(s.jokers.cards[s.jokers.cards.length-1].isPlayable=!0)},re=()=>{s.aces.validDropLocation=!1,s.aces.cards.length>0&&(s.aces.cards[s.aces.cards.length-1].isPlayable=!1)},ba=()=>{s.aces.validDropLocation=!0,s.aces.cards.length>0&&(s.aces.cards[s.aces.cards.length-1].isPlayable=!0)};function ze(){s.draw.cards=wa(Ba()),Aa()}const Aa=()=>{let a=0;for(;s.draw.cards.length>0;){const e=s.draw.cards[s.draw.cards.length-1];if(e.rank===A.JOKER)e.isFaceUp=!0,s.jokers.cards.push(s.draw.cards.pop());else if(e.rank===A.ACE)e.isFaceUp=!0,s.aces.cards.push(s.draw.cards.pop());else if(Q(e))e.isFaceUp=!0,e.isPlayable=!0,s.royals.cards.push(s.draw.cards.pop());else if(a<9){const r=s.stacks.find(l=>l.id==`C${a}`);r&&(e.isFaceUp=!0,r.cards.push(s.draw.cards.pop())),a++}else if(s.royals.cards.length===0)Je();else return}},Ba=()=>{const a=[],e=Object.values(A);return Object.values(x).forEach(l=>{l!==x.JOKER&&e.forEach((c,i)=>{c!==A.JOKER&&a.push({id:`${l}-${c}`,suit:l,value:i+1,rank:c,isSelected:!1,isFaceUp:!1,isPlayable:!1,isArmoured:!1})})}),a.push({id:`${x.JOKER}-${A.JOKER}-1`,suit:x.JOKER,value:0,rank:A.JOKER,isSelected:!1,isFaceUp:!1,isPlayable:!1,isArmoured:!1}),a.push({id:`${x.JOKER}-${A.JOKER}-2`,suit:x.JOKER,value:0,rank:A.JOKER,isSelected:!1,isFaceUp:!1,isPlayable:!1,isArmoured:!1}),a},wa=a=>{for(let e=a.length-1;e>0;e--){const r=Math.floor(Math.random()*(e+1));[a[e],a[r]]=[a[r],a[e]]}return a},L=Ie({cardSize:100,cardSizeRatio:1.4,cardPaddingRatio:.1,cardBorderRadiusRatio:.1,gridGap:"0.5rem"});function La(a,e){e.topCardClicked()}function Oa(a,e){e.topCardOver()}function Na(a,e){e.topCardOut()}var qa=P('<div class="suit svelte-a68yci"> </div>'),Pa=P('<div class="card-center suit svelte-a68yci"> </div>'),ja=P('<div class="suit svelte-a68yci"> </div>'),Ia=P('<div class="card-corner top-left svelte-a68yci"><div class="rank svelte-a68yci"> </div> <!></div> <!> <div class="card-corner bottom-right svelte-a68yci"><div class="rank svelte-a68yci"> </div> <!></div>',1),Ta=P('<div class="card svelte-a68yci"><!></div>');function xa(a,e){oe(e,!0);let r=K(()=>({padding:L.cardSize*L.cardPaddingRatio,width:L.cardSize,height:L.cardSize*L.cardSizeRatio,borderRadius:L.cardSize*L.cardBorderRadiusRatio}));const l=K(()=>`
		--card-width: ${_(r).width}px;
    --card-height: ${_(r).height}px;
    --card-radius: ${_(r).borderRadius}px;
    --card-padding: ${_(r).padding}px;
	`),c=K(()=>e.card.suit===x.HEART||e.card.suit===x.DIAMOND),i=K(()=>e.card.suit!==x.JOKER);var t=Ta();t.__click=[La,e],t.__mouseover=[Oa,e],t.__mouseout=[Na,e];const f=K(()=>Q(e.card));var o=b(t);{var h=p=>{var R=Ia(),w=ye(R),n=b(w),v=b(n,!0);E(n);var y=q(n,2);{var I=D=>{var k=qa(),J=b(k,!0);E(k),j(()=>V(J,e.card.suit)),N(D,k)};F(y,D=>{_(i)&&D(I)})}E(w);var C=q(w,2);{var m=D=>{var k=Pa(),J=b(k,!0);E(k),j(()=>V(J,e.card.suit)),N(D,k)};F(C,D=>{_(i)&&D(m)})}var S=q(C,2),B=b(S),u=b(B,!0);E(B);var g=q(B,2);{var Z=D=>{var k=ja(),J=b(k,!0);E(k),j(()=>V(J,e.card.suit)),N(D,k)};F(g,D=>{_(i)&&D(Z)})}E(S),j(()=>{V(v,e.card.rank),V(u,e.card.rank)}),N(p,R)};F(o,p=>{e.card.isFaceUp&&p(h)})}E(t),j(()=>{ce(t,"style",_(l)),G(t,"playable",e.card.isPlayable),G(t,"selected",e.card.isSelected),G(t,"facedown",!e.card.isFaceUp),G(t,"royal",_(f)),G(t,"red",_(c)),G(t,"armoured",e.card.isArmoured)}),N(a,t),fe()}ke(["click","mouseover","mouseout"]);function Ua(a,e){Ke(e.cardStack)}var Ka=P('<span class="stack-label svelte-1dgnt4y" style="color: #3E7B27;"> </span>'),Ja=P('<div class="empty-card-placeholder svelte-1dgnt4y"><!></div>'),Ma=P('<div class="card-stack svelte-1dgnt4y"><!></div>');function le(a,e){oe(e,!0);let r=K(()=>e.cardStack.cards.length===0),l=K(()=>_(r)?null:e.cardStack.cards[e.cardStack.cards.length-1]),c=K(()=>e.cardStack.type!==d.CENTER&&e.cardStack.type!==d.BORDER);const i=K(()=>`
		--width: ${L.cardSize}px;
		--height: ${L.cardSize*L.cardSizeRatio}px;
	`);function t(){Ke(e.cardStack)}function f(){e.cardStack.type!==d.DRAW&&(s.hoveredStack=e.cardStack)}function o(){s.hoveredStack==e.cardStack&&(s.hoveredStack=null)}var h=Ma(),p=b(h);{var R=n=>{xa(n,{get card(){return _(l)},topCardClicked:t,topCardOver:f,topCardOut:o})},w=n=>{var v=Ja();v.__click=[Ua,e];var y=b(v);{var I=C=>{var m=Ka(),S=b(m,!0);E(m),j(()=>V(S,e.cardStack.type)),N(C,m)};F(y,C=>{e.cardStack.type&&C(I)})}E(v),j(()=>G(v,"valid",e.cardStack.validDropLocation)),N(n,v)};F(p,n=>{_(r)?n(w,!1):n(R)})}E(h),j(()=>{ce(h,"aria-label",e.cardStack.type||(e.cardStack.cards.length?"Card stack":"Empty card stack")),ce(h,"style",_(i)),G(h,"noncenter",_(c))}),N(a,h),fe()}ke(["click"]);var Fa=P('<div class="card-cell svelte-afnb6e"><!></div>'),za=P('<div class="game-board svelte-afnb6e"></div>');function Ga(a,e){oe(e,!1);const r=5;ha();var l=za();xe(l,5,()=>s.stacks,Te,(c,i)=>{var t=Fa(),f=b(t);{var o=h=>{le(h,{get cardStack(){return _(i)}})};F(f,h=>{_(i).type!==d.NULL&&h(o)})}E(t),j(()=>{de(t,"width",L.cardSize),de(t,"height",L.cardSize*L.cardSizeRatio)}),N(c,t)}),E(l),j(()=>{de(l,"grid-template-columns",`repeat(${r}, ${L.cardSize}px)`),de(l,"gap",L.gridGap)}),N(a,l),fe()}function Oe(){_a()}var Ha=P('<div class="overlay svelte-1sqnpey"><h1 class="svelte-1sqnpey"> </h1> <button class="game-button svelte-1sqnpey">Play Again</button></div>'),Ya=(a,e)=>e(),Wa=P('<div class="instructions svelte-1sqnpey"><h1 class="svelte-1sqnpey">Game Instructions</h1> <h2 class="svelte-1sqnpey">Setup</h2> <ul class="svelte-1sqnpey"><li class="svelte-1sqnpey">Start with a shuffled deck, including jokers.</li> <li class="svelte-1sqnpey">Draw cards from the top to create a 3×3 grid with number cards only. Place royals, aces, and jokers in a separate pile.</li> <li class="svelte-1sqnpey">For any drawn royals, place them adjacent to the grid card they are most similar to:</li> <ul class="svelte-1sqnpey"><li class="svelte-1sqnpey">Highest value card of the same suit.</li> <li class="svelte-1sqnpey">If none, highest value card of the same color.</li> <li class="svelte-1sqnpey">If none, highest value card.</li></ul> <li class="svelte-1sqnpey">Keep any aces and jokers face-up to one side as <strong>Ploys</strong>.</li> <li class="svelte-1sqnpey">Optionally replace one grid card by drawing a new one.</li></ul> <h2 class="svelte-1sqnpey">The Goal</h2> <p>Find and kill all the royals.</p> <h2 class="svelte-1sqnpey">Play</h2> <ul class="svelte-1sqnpey"><li class="svelte-1sqnpey">Draw the top card:</li> <ul class="svelte-1sqnpey"><li class="svelte-1sqnpey">If it’s a royal: place it using the placement rule above.</li> <li class="svelte-1sqnpey">If it’s a number card: place it on the grid (on a card with the same or lower value).</li> <li class="svelte-1sqnpey">If it’s an ace or joker: keep it as a <strong>Ploy</strong>.</li></ul> <li class="svelte-1sqnpey"><strong>Killing royals:</strong> Place a card opposite a royal, forming an attack:</li> <ul class="svelte-1sqnpey"><li class="svelte-1sqnpey">The two cards between must sum to at least the royal’s health.</li> <li class="svelte-1sqnpey">Specific rules for Jacks, Queens, and Kings apply.</li></ul> <li class="svelte-1sqnpey">Turn killed royals face-down but do not remove them.</li></ul> <h3 class="svelte-1sqnpey">Ploys</h3> <ul class="svelte-1sqnpey"><li class="svelte-1sqnpey"><strong>Aces:</strong> Pick up one grid stack and put it at the bottom of the draw pile.</li> <li class="svelte-1sqnpey"><strong>Jokers:</strong> Move the top card of one stack to another valid position.</li></ul> <h3 class="svelte-1sqnpey">Other Rules</h3> <ul class="svelte-1sqnpey"><li class="svelte-1sqnpey">If you cannot place a card, add it as <strong>Armour</strong> to the most similar royal.</li> <li class="svelte-1sqnpey">If a royal’s health exceeds the attackable limit, you lose.</li> <li class="svelte-1sqnpey">If the draw pile runs out and not all royals are dead, you lose.</li></ul> <h2 class="svelte-1sqnpey">Scoring</h2> <p>Your score is the number of unused Ploys when all royals are dead. Maximum score: 6.</p> <div class="highlight svelte-1sqnpey"><strong>Note:</strong> Play strategically to maximize your score!</div></div>'),Va=P("<p> </p>"),Qa=P('<!> <div class="page-container svelte-1sqnpey"><div class="top-bar svelte-1sqnpey"><button class="game-button svelte-1sqnpey" aria-label="Reset Game">Reset Game</button> <h1 style="margin: 0;" class="svelte-1sqnpey">GRID CANNON</h1> <button class="game-button svelte-1sqnpey" aria-label="Show Instructions">Show Instructions</button></div> <!> <div class="game-container svelte-1sqnpey"><div class="side-panel svelte-1sqnpey"><!> <!></div> <!> <div class="side-panel svelte-1sqnpey"><!> <!></div></div></div> <div class="info-panel svelte-1sqnpey"></div>',1);function ss(a,e){oe(e,!0),ze();const r=K(()=>`--card-size: ${L.cardSize+20}px;`);let l=ua(!1);function c(){pa(l,!_(l))}let i=K(()=>{const h=[];if(s.hoveredStack)for(const p of s.hoveredStack.cards){let R=p.id;Q(p)&&(R+=" total value: "+p.value),h.push(R)}return h});var t=Ge(),f=ye(t);{var o=h=>{var p=Qa(),R=ye(p);{var w=O=>{var U=Ha(),z=b(U),$=b(z,!0);E(z);var ie=q(z,2);ie.__click=[Oe],E(U),j(()=>V($,s.gameOverMessage)),N(O,U)};F(R,O=>{s.gameOver&&O(w)})}var n=q(R,2),v=b(n),y=b(v);y.__click=[Oe];var I=q(y,4);I.__click=[Ya,c],E(v);var C=q(v,2);{var m=O=>{var U=Wa();N(O,U)};F(C,O=>{_(l)&&O(m)})}var S=q(C,2),B=b(S),u=b(B);le(u,{get cardStack(){return s.draw}});var g=q(u,2);le(g,{get cardStack(){return s.royals}}),E(B);var Z=q(B,2);Ga(Z,{});var D=q(Z,2),k=b(D);le(k,{get cardStack(){return s.aces}});var J=q(k,2);le(J,{get cardStack(){return s.jokers}}),E(D),E(S),E(n);var X=q(n,2);xe(X,21,()=>_(i).reverse(),Te,(O,U)=>{var z=Va(),$=b(z,!0);E(z),j(()=>V($,_(U))),N(O,z)}),E(X),j(()=>{ce(B,"style",_(r)),ce(D,"style",_(r)),G(X,"visible",s.hoveredStack!==null)}),N(h,p)};F(f,h=>{h(o)})}N(a,t),fe()}ke(["click"]);export{ss as component};