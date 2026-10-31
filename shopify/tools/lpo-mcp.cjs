// Local LPO MCP client. Credentials stay in the ignored .local directory.
const fs=require('node:fs');const path=require('node:path');
const dir=path.resolve(__dirname,'../.local/lpo');
const credential=JSON.parse(fs.readFileSync(path.join(dir,'mcp-credential.json'),'utf8'));
let session;
async function rpc(method,params,id){
 const response=await fetch('https://mcp.cloudlift.app/mcp/options',{method:'POST',headers:{Authorization:`Bearer ${credential.token}`,'X-Shop':credential.shop,'Content-Type':'application/json',Accept:'application/json, text/event-stream',...(session?{'Mcp-Session-Id':session}:{})},body:JSON.stringify({jsonrpc:'2.0',...(id?{id}:{}),method,params})});
 session=response.headers.get('mcp-session-id')||session;
 if(!response.ok)throw new Error(`LPO MCP returned HTTP ${response.status}`);
 const body=await response.text();if(!body)return {};
 if(body.startsWith('event:')||body.startsWith('data:')){const events=body.split('\n').filter(line=>line.startsWith('data:')).map(line=>JSON.parse(line.slice(5)));return events.find(e=>e.id===id)||events.at(-1);}
 return JSON.parse(body);
}
(async()=>{
 await rpc('initialize',{protocolVersion:'2025-03-26',capabilities:{},clientInfo:{name:'lumina-theme-migration',version:'1.0.0'}},1);
 await rpc('notifications/initialized',{});
 const arg=process.argv[2];
 const request=arg?(arg.endsWith('.json')?JSON.parse(fs.readFileSync(arg,'utf8')):{method:'tools/call',params:{name:arg,arguments:process.argv[3]?JSON.parse(fs.readFileSync(process.argv[3],'utf8')):{}}}):{method:'tools/list',params:{}};
 const result=await rpc(request.method,request.params,2);
 fs.writeFileSync(path.join(dir,'last-response.json'),JSON.stringify(result,null,2));
 if(request.params?.name){const key=request.params.name+(request.params.arguments?.optionType?'-'+request.params.arguments.optionType:'');fs.writeFileSync(path.join(dir,key+'.json'),JSON.stringify(result,null,2));fs.writeFileSync(path.join(dir,key+'.txt'),(result.result?.content||[]).filter(x=>x.type==='text').map(x=>x.text).join('\n'));}
 if(request.method==='tools/list')console.log(JSON.stringify(result.result?.tools?.map(({name,description,inputSchema})=>({name,description,inputSchema}))||result,null,2));
 else console.log((result.result?.content||[]).filter(x=>x.type==='text').map(x=>x.text).join('\n')||JSON.stringify(result,null,2));
})().catch(e=>{console.error(e.message);process.exit(1)});
