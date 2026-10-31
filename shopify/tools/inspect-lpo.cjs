const fs=require('node:fs');const path=require('node:path');
const store='lumina-10621.myshopify.com';
(async()=>{
 const query=`query { currentAppInstallation { accessScopes { handle } } shop { id metafields(first:100) { nodes { namespace key type value } } } product(id:"gid://shopify/Product/8894906695837") { id title handle metafields(first:100) { nodes { namespace key type value } } } appInstallations(first:100) { nodes { app { title handle installation { id } } } } }`;
 const response=await fetch(`https://${store}/admin/api/2026-07/graphql.json`,{method:'POST',headers:{'X-Shopify-Access-Token':process.env.SHOPIFY_ADMIN_ACCESS_TOKEN,'Content-Type':'application/json'},body:JSON.stringify({query})});
 const result=await response.json();
 const out=path.resolve(__dirname,'../.local/lpo');fs.mkdirSync(out,{recursive:true});
 fs.writeFileSync(path.join(out,'admin-inspection.json'),JSON.stringify(result,null,2));
 console.log(JSON.stringify({status:response.status,errors:result.errors,scopes:result.data?.currentAppInstallation?.accessScopes,apps:result.data?.appInstallations,shopMetafields:result.data?.shop?.metafields.nodes.map(({namespace,key,type})=>({namespace,key,type})),productMetafields:result.data?.product?.metafields.nodes.map(({namespace,key,type})=>({namespace,key,type}))},null,2));
})();
