import http from 'node:http';
import {Readable,Transform} from 'node:stream';
import {timingSafeEqual} from 'node:crypto';
const E=process.env;for(const k of ['ALLOWED_ORIGIN','UPLOAD_CODE','GOOGLE_CLIENT_ID','GOOGLE_CLIENT_SECRET','GOOGLE_REFRESH_TOKEN','GOOGLE_FOLDER_ID'])if(!E[k])throw Error('Missing '+k);
const equal=(a,b)=>{const x=Buffer.from(a||''),y=Buffer.from(b||'');return x.length===y.length&&timingSafeEqual(x,y);};
let active=false;
http.createServer(async(req,res)=>{
 const origin=req.headers.origin;
 res.setHeader('Cache-Control','no-store');res.setHeader('Vary','Origin');
 const reply=(code,obj)=>{res.writeHead(code,{'Content-Type':'application/json'});res.end(JSON.stringify(obj));};
 if(origin!==E.ALLOWED_ORIGIN)return reply(403,{error:'Origin not allowed.'});
 res.setHeader('Access-Control-Allow-Origin',origin);res.setHeader('Access-Control-Allow-Methods','POST, OPTIONS');res.setHeader('Access-Control-Allow-Headers','Content-Type, X-Upload-Code, X-Pet-Metadata, X-File-Size');
 if(req.method==='OPTIONS'){res.writeHead(204);res.end();return;}
 if(req.url!=='/upload'||req.method!=='POST')return reply(404,{error:'Not found'});
 if(!equal(req.headers['x-upload-code'],E.UPLOAD_CODE))return reply(403,{error:'Incorrect test upload code.'});
 if(active)return reply(429,{error:'Another upload is running. Please wait.'});
 const size=Number(req.headers['x-file-size']),type=req.headers['content-type']||'';let m;
 try{const raw=req.headers['x-pet-metadata']||'';if(raw.length>16000)throw Error();m=JSON.parse(Buffer.from(raw,'base64').toString());if(!m.pet?.trim()||!m.person?.trim()||!m.story?.trim()||m.story.length>2000||m.pet.length>100||m.person.length>100||String(m.animalId||'').length>100||typeof m.permission!=='boolean'||!Number.isFinite(m.duration)||m.duration<=0||m.duration>30.5)throw Error();}catch{return reply(400,{error:'Missing or invalid pet details.'});}
 if(!Number.isInteger(size)||size<1||size>100000000||!/^video\/[a-zA-Z0-9.+-]+$/.test(type))return reply(400,{error:'Video must be under 100 MB.'});
 active=true;
 try{
 const auth=await fetch('https://oauth2.googleapis.com/token',{method:'POST',body:new URLSearchParams({client_id:E.GOOGLE_CLIENT_ID,client_secret:E.GOOGLE_CLIENT_SECRET,refresh_token:E.GOOGLE_REFRESH_TOKEN,grant_type:'refresh_token'})});const token=await auth.json();if(!auth.ok||!token.access_token)throw Error('Google authorization failed. Ask the owner to reconnect.');
 const ext=type.includes('quicktime')?'mov':type.includes('webm')?'webm':'mp4';
 const meta={name:m.pet.replace(/[^a-zA-Z0-9 _-]/g,'').slice(0,80)+'-'+Date.now()+'.'+ext,parents:[E.GOOGLE_FOLDER_ID],description:JSON.stringify({...m,submittedAt:new Date().toISOString()},null,2)};
 const start=await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable&fields=id',{method:'POST',headers:{Authorization:'Bearer '+token.access_token,'Content-Type':'application/json','X-Upload-Content-Type':type,'X-Upload-Content-Length':String(size)},body:JSON.stringify(meta)});
 const location=start.headers.get('location');if(!start.ok||!location)throw Error('Could not start Drive upload. Check folder access and storage.');
 let received=0;const limit=new Transform({transform(chunk,enc,cb){received+=chunk.length;cb(received>size?Error('File exceeds declared size'):null,chunk);},flush(cb){cb(received!==size?Error('Incomplete file'):null);}});
 req.on('error',err=>limit.destroy(err));req.pipe(limit);
 const result=await fetch(location,{method:'PUT',headers:{'Content-Type':type,'Content-Length':String(size)},body:Readable.toWeb(limit),duplex:'half'});const saved=await result.json();if(!result.ok||!saved.id)throw Error('Drive did not confirm the upload. Check Drive before retrying.');reply(201,{id:saved.id});
 }catch(err){reply(502,{error:err.message||'Upload failed; check Drive before retrying.'});}finally{active=false;}
}).listen(Number(E.PORT)||3000);
