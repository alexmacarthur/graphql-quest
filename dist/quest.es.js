async function e({endpoint:e,fetchOptions:t,query:n,variables:r}){const a={query:n,variables:JSON.stringify(r)},{method:o="POST",headers:s={}}=t,i="get"===o.toLowerCase(),c=i?function(e,t){const n=new URL(e);for(const e in t)n.searchParams.append(e,t[e]);return n.toString()}(e,a):e;try{const e=await fetch(c,{method:o.toUpperCase(),headers:{"Content-Type":"application/"+(i?"x-www-form-urlencoded":"json"),...s},body:i?null:JSON.stringify(a)}),{data:t,errors:n}=await e.json(),r={data:t};return n&&(r.errors=n),r}catch(e){return{errors:[e]}}}async function t(t,n,r={},a={}){return await e({endpoint:t,query:n,variables:r,fetchOptions:a})}function n({endpoint:t,method:n,headers:r}){return{send:async(a,o={})=>await e({endpoint:t,query:a,variables:o,fetchOptions:{method:n,headers:r}})}}export{n as QuestClient,t as quest};