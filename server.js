import express from 'express';
import {createServer} from 'node:http';
import {Server} from 'socket.io';
import {randomInt} from 'node:crypto';
import {questions} from './questions.js';
const app=express();const http=createServer(app);const io=new Server(http);app.use(express.static('public'));
const rooms=new Map();
const code=()=>String(randomInt(100000,999999));
const snapshot=r=>({code:r.code,status:r.status,index:r.index,total:questions.length,teams:[...r.teams.values()].map(t=>({id:t.id,name:t.name,score:t.score,answered:r.answers.has(t.id)})).sort((a,b)=>b.score-a.score),question:r.status==='question'?{title:questions[r.index].title,options:questions[r.index].options,level:questions[r.index].level}:null,reveal:r.status==='reveal'?{correct:questions[r.index].correct,explanation:questions[r.index].explanation}:null,deadline:r.deadline});
function broadcast(r){io.to(r.code).emit('state',snapshot(r))}
function clear(r){if(r.timer)clearTimeout(r.timer);r.timer=null}
function reveal(r){if(r.status!=='question')return;clear(r);r.status='reveal';for(const [id,answer] of r.answers){const t=r.teams.get(id);if(t&&answer===questions[r.index].correct)t.score+=100}broadcast(r)}
function next(r){clear(r);r.answers.clear();r.index++;if(r.index>=questions.length){r.status='finished';broadcast(r);return}r.status='question';r.deadline=Date.now()+30000;broadcast(r);r.timer=setTimeout(()=>reveal(r),30000)}
io.on('connection',socket=>{
 socket.on('create',(_,ack)=>{let c=code();while(rooms.has(c))c=code();let r={code:c,host:socket.id,status:'lobby',index:-1,teams:new Map(),answers:new Map(),timer:null,deadline:null};rooms.set(c,r);socket.join(c);socket.data.room=c;socket.data.host=true;ack?.({ok:true,code:c});broadcast(r)});
 socket.on('join',({code:c,name},ack)=>{let r=rooms.get(String(c));name=String(name||'').trim().slice(0,32);if(!r||r.status!=='lobby'||!name){ack?.({ok:false,error:'Sala inexistente, iniciada o nombre vacío'});return}if([...r.teams.values()].some(t=>t.name.toLowerCase()===name.toLowerCase())){ack?.({ok:false,error:'Ese nombre ya está ocupado'});return}const id=socket.id;r.teams.set(id,{id,name,score:0});socket.join(r.code);socket.data.room=r.code;socket.data.team=id;ack?.({ok:true});broadcast(r)});
 socket.on('start',(_,ack)=>{const r=rooms.get(socket.data.room);if(!r||r.host!==socket.id||r.status!=='lobby'||r.teams.size<2)return ack?.({ok:false,error:'Se requieren al menos dos mesas'});next(r);ack?.({ok:true})});
 socket.on('answer',({choice},ack)=>{const r=rooms.get(socket.data.room);if(!r||r.status!=='question'||!r.teams.has(socket.data.team)||r.answers.has(socket.data.team)||!Number.isInteger(choice)||choice<0||choice>3||Date.now()>r.deadline)return ack?.({ok:false});r.answers.set(socket.data.team,choice);ack?.({ok:true});broadcast(r);if(r.answers.size===r.teams.size)reveal(r)});
 socket.on('next',(_,ack)=>{const r=rooms.get(socket.data.room);if(!r||r.host!==socket.id||r.status!=='reveal')return ack?.({ok:false});next(r);ack?.({ok:true})});
 socket.on('disconnect',()=>{const r=rooms.get(socket.data.room);if(!r)return;if(r.host===socket.id){clear(r);rooms.delete(r.code);io.to(r.code).emit('closed');return}if(r.teams.delete(socket.id)){r.answers.delete(socket.id);broadcast(r);if(r.status==='question'&&r.teams.size===r.answers.size)reveal(r)}});
});
const port=process.env.PORT||3000;http.listen(port,()=>console.log(`Código Azul en puerto ${port}`));
