const e="VueTabData",t={get(t){var a=window.localStorage.getItem(e);return""!==a&&null!==a&&JSON.parse(a).data[t]||null},set(t,a){const r=window.localStorage.getItem(e);if(""!==r&&null!==r){const o=JSON.parse(r);o.data[t]=a,o.msg.key=t,window.localStorage.setItem(e,JSON.stringify(o))}else{const r={data:{},msg:{key:""}};r.data[t]=a,r.msg.key=t,window.localStorage.setItem(e,JSON.stringify(r))}}},a=(e,a)=>{let r={};if(a)for(let a=0;a<e.length;a++)r[e[a]]=function(r){t.set(e[a],r)};return r};export default function(t,r=!0,o=!0){var l={},n=[];if("object"==typeof t)if(Array.isArray(t)){n=t;for(let e=0;e<t.length;e++)l[t[e]]=void 0}else{l=t;for(let e in t)n.push(e)}else{if("string"!=typeof t)throw new Error("参数不合法");l[t]=void 0,n=[t]}return{data:()=>(t=>{let a={},r=window.localStorage.getItem(e);if(null===r||""===r)a=t;else{let e=JSON.parse(r).data;for(let r in t)null!==t[r]&&void 0!==t[r]?a[r]=t[r]:a[r]=e[r]||void 0}return a})(l),watch:a(n,r),created(){((t,a,r)=>{a&&window.addEventListener("storage",a=>{if(a.key===e){let e=JSON.parse(a.newValue);-1!==t.indexOf(e.msg.key)&&(r[e.msg.key]=e.data[e.msg.key])}})})(n,o,this)}}}
