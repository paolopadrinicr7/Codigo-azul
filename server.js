import express from 'express';
import {createServer} from 'node:http';
import {Server} from 'socket.io';
import {randomInt,randomUUID} from 'node:crypto';
import {questions} from './questions.js';
const app=express(),http=createServer(app),io=new Server(http);app.use(express.static('public'));
const rooms=new Map(),DURATION=15000,FAST=5000;
const avatars=['🧑‍⚕️','👩‍⚕️','👨‍⚕️','👩🏽‍⚕️','👨🏾‍⚕️','🥼','🩺','🚑','🧠','🦸'];
// 17 mixed questions followed by three triple-value finale questions.
const base=[100,200,100,200,100,200,200,100,200,100,200,100,200,100,200,100,200];
const deck=questions.map((q,i)=>({...q,base: i>=17?300:base[i],difficulty:i>=17?'Final':base[i]===200?'Media':'Fácil'}));
const code=()=>String(randomInt(100000,999999));
const ordered=r=>[...r.teams.values()].map(t=>({id:t.id,name:t.name,avatar:t.avatar,score:t.score,answered:r.answers.has(t.id),connected:t.connected})).sort((a,b)=>b.score-a.score||a.name.localeCompare(b.name));
function snapshot(r){const q=deck[r.index];return {code:r.code,status:r.status,index:r.index,total:deck.length,teams:ordered(r),question:r.status==='question'?{title:q.title,options:q.options,level:q.level,base:q.base,difficulty:q.difficulty}:null,reveal:r.status==='reveal'?{correct:q.correct,explanation:q.explanation,base:q.base,difficulty:q.difficulty,results:[...r.answers].map(([id,a])=>({id,earned:a.earned,correct:a.choice===q.correct}))}:null,deadline:r.deadline,duration:DURATION,hostConnected:r.hostConnected};}
const broadcast=r=>io.to(r.code).emit('state',snapshot(r));
const clear=r=>{if(r.timer)clearTimeout(r.timer);r.timer=null};
function reveal(r){if(r.status!=='question')return;clear(r);r.status='reveal';for(const [id,a] of r.answers){const t=r.teams.get(id);if(t)t.score+=a.earned}broadcast(r)}
function next(r){clear(r);r.answers.clear();r.index++;if(r.index>=deck.length){r.status='finished';r.deadline=null;broadcast(r);return}r.status='question';r.deadline=Date.now()+DURATION;broadcast(r);r.timer=setTimeout(()=>reveal(r),DURATION+50)}
function allAnswered(r){return [...r.teams.values()].filter(t=>t.connected).every(t=>r.answers.has(t.id))}
io.on('connection',socket=>{
 socket.on('create',(_,ack)=>{let c=code();while(rooms.has(c))c=code();const r={code:c,host:socket.id,hostConnected:true,status:'lobby',index:-1,teams:new Map(),answers:new Map(),timer:null,deadline:null};rooms.set(c,r);socket.join(c);socket.data.room=c;socket.data.host=true;ack?.({ok:true,code:c});broadcast(r)});
 socket.on('join',({code:c,name,avatar},ack)=>{const r=rooms.get(String(c));name=String(name||'').trim().slice(0,32);if(!r||r.status!=='lobby'||!name)return ack?.({ok:false,error:'Sala inexistente, iniciada o nombre vacío'});if([...r.teams.values()].some(t=>t.name.toLowerCase()===name.toLowerCase()))return ack?.({ok:false,error:'Nombre ocupado'});const id=randomUUID();r.teams.set(id,{id,name,avatar:avatars.includes(avatar)?avatar:avatars[0],score:0,connected:true,socketId:socket.id});socket.join(r.code);socket.data.room=r.code;socket.data.team=id;ack?.({ok:true});broadcast(r)});
 socket.on('avatar',({avatar},ack)=>{const r=rooms.get(socket.data.room),t=r?.teams.get(socket.data.team);if(!t||r.status!=='lobby'||!avatars.includes(avatar))return ack?.({ok:false});t.avatar=avatar;broadcast(r);ack?.({ok:true})});
 socket.on('start',(_,ack)=>{const r=rooms.get(socket.data.room);if(!r||r.host!==socket.id||r.status!=='lobby'||r.teams.size<2)return ack?.({ok:false,error:'Se necesitan al menos dos mesas'});next(r);ack?.({ok:true})});
 socket.on('answer',({choice},ack)=>{const r=rooms.get(socket.data.room);if(!r||r.status!=='question'||!r.teams.has(socket.data.team)||r.answers.has(socket.data.team)||!Number.isInteger(choice)||choice<0||choice>3)return ack?.({ok:false});const now=Date.now();if(now>r.deadline)return ack?.({ok:false,error:'Tiempo agotado'});const elapsed=now-(r.deadline-DURATION),q=deck[r.index],earned=choice===q.correct?Math.round(q.base*(elapsed<=FAST?1:.8)):0;r.answers.set(socket.data.team,{choice,earned});ack?.({ok:true,earned});broadcast(r);if(allAnswered(r))reveal(r)});
 socket.on('next',(_,ack)=>{const r=rooms.get(socket.data.room);if(!r||r.host!==socket.id||r.status!=='reveal')return ack?.({ok:false});next(r);ack?.({ok:true})});
 socket.on('disconnect',()=>{const r=rooms.get(socket.data.room);if(!r)return;if(r.host===socket.id){clear(r);rooms.delete(r.code);io.to(r.code).emit('closed');return}const t=r.teams.get(socket.data.team);if(t){if(r.status==='lobby')r.teams.delete(t.id);else t.connected=false;broadcast(r);if(r.status==='question'&&allAnswered(r))reveal(r)}});
});
http.listen(process.env.PORT||3000,()=>console.log('Código Azul v2 listo'));
