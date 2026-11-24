import express from 'express';
import {createServer} from 'node:http';
import {Server} from 'socket.io';
import {randomInt,randomUUID} from 'node:crypto';
import {questions} from './questions.js';
const app=express(),http=createServer(app),io=new Server(http);app.use(express.static('public'));
const rooms=new Map(),DURATION=25000,FAST=10000;
const avatars=['buho-01','buho-02','buho-03','buho-04','buho-05','buho-06','buho-07','buho-08','buho-09','buho-10','buho-11','buho-12','buho-13','buho-14','buho-15','buho-16','buho-17','buho-18','buho-19','buho-20'];
const phraseBanks={
 correct:['Ese diagnóstico comunicativo sí pasó visita.','Bien jugado, doctor. El hospital respira.','Esa neurona sí vino a trabajar.','Te salió más limpio que expediente nuevo.','Así se habla con un paciente, máquina.','El comité médico aprueba esa jugada.','Tu equipo anda con estetoscopio de oro.','Respuesta fina, sin necesidad de recetar humo.'],
 wrong:['Esa respuesta necesita segunda opinión.','El comité médico solicita explicaciones.','Esa neurona se fue por un café.','Hoy la comunicación pidió incapacidad.','La siguiente la remontas, cirujano.','Ni el expediente entendió qué pasó.','Diagnóstico: exceso de confianza.','Eso no lo salva ni una interconsulta.'],
 fast:['Más rápido que la camilla de urgencias.','Respondieron antes de que sonara el monitor.','Reflejos de guardia nocturna, doctor.','Esa respuesta llegó en ambulancia.'],
 streak5:['Tres seguidas. El hospital está cocinando.','Racha de tres: el jefe de servicio está orgulloso.','Tres aciertos: ya te quieren dar consultorio.'],
 streak10:['Cinco seguidas. ¿Quién les dio superpoderes?','Racha de cinco: ya pidieron tu autógrafo.','Cinco aciertos, el hospital está en modo leyenda.'],
 streak15:['Ocho seguidas: ni el comité lo cree.','Racha de ocho: protocolo de leyenda activado.','Ocho aciertos: la competencia pide vacaciones.'],
 first:['Vas primero. No te duermas en la guardia.','Lideras la tabla, pero todavía hay pacientes.','La corona es tuya... por ahora.'],
 last:['Todavía hay tiempo para una remontada clínica.','Último no es eliminado: quedan puntos por ganar.','Hoy toca levantar el hospital desde urgencias.']
};
const base={Fácil:100,Media:200,Difícil:300};
// Mezcla las primeras 17 y conserva las últimas tres como finales difíciles.
function newDeck(){const early=questions.slice(0,-3).map(q=>({...q,base:base[q.difficulty]}));for(let i=early.length-1;i>0;i--){const j=randomInt(i+1);[early[i],early[j]]=[early[j],early[i]]}return [...early,...questions.slice(-3).map(q=>({...q,base:900,difficulty:'Final ×3'}))]}
const code=()=>String(randomInt(100000,1000000));
const ordered=r=>[...r.teams.values()].map(t=>({id:t.id,name:t.name,avatar:t.avatar,score:t.score,streak:t.streak,correctCount:t.correctCount||0,answered:r.answers.has(t.id),connected:t.connected})).sort((a,b)=>b.score-a.score||a.name.localeCompare(b.name));
function snapshot(r){const q=r.deck[r.index],teams=ordered(r);return {code:r.code,status:r.status,index:r.index,total:r.deck.length,teams,question:r.status==='question'?{title:q.title,options:q.options,level:q.level,base:q.base,difficulty:q.difficulty}:null,reveal:r.status==='reveal'?{correct:q.correct,explanation:q.explanation,base:q.base,difficulty:q.difficulty}:null,deadline:r.deadline,duration:DURATION};}
const broadcast=r=>io.to(r.code).emit('state',snapshot(r));
const clear=r=>{if(r.timer)clearTimeout(r.timer);r.timer=null};
function phrase(t,kind){const bank=phraseBanks[kind]||phraseBanks.correct;const recent=t.recentPhrases||[];const choices=bank.filter(p=>!recent.includes(p));const pool=choices.length?choices:bank.filter(p=>p!==t.lastPhrase);const p=pool[randomInt(pool.length)]||bank[0];t.lastPhrase=p;t.recentPhrases=[...recent,p].slice(-3);return p}
function streakBonus(streak){return streak>=8?.40:streak>=5?.25:streak>=3?.10:0}
function reveal(r){if(r.status!=='question')return;clear(r);r.status='reveal';const q=r.deck[r.index];for(const t of r.teams.values()){const a=r.answers.get(t.id);const correct=!!a&&a.choice===q.correct;if(correct){t.streak++;t.correctCount=(t.correctCount||0)+1}else t.streak=0;const bonus=correct?streakBonus(t.streak):0;const earned=correct?Math.round(q.base*(a.elapsed<=FAST?1:.8)*(1+bonus)):0;t.score+=earned;if(a){a.earned=earned;a.bonus=bonus}const kind=correct?(t.streak===3?'streak5':t.streak===5?'streak10':t.streak===8?'streak15':a.elapsed<=FAST&&randomInt(3)===0?'fast':'correct'):'wrong';t.roundResult={correct,choice:a?.choice??null,earned,bonus,streak:t.streak,phrase:phrase(t,kind),timedOut:!a}}const ranking=ordered(r);for(let i=0;i<ranking.length;i++){const t=r.teams.get(ranking[i].id);t.roundResult.rank=i+1;t.roundResult.above=i?{name:ranking[i-1].name,gap:ranking[i-1].score-t.score}:null;t.roundResult.below=i<ranking.length-1?{name:ranking[i+1].name,gap:t.score-ranking[i+1].score}:null}broadcast(r);for(const t of r.teams.values())if(t.connected)io.to(t.socketId).emit('personal-result',{index:r.index,...t.roundResult})}
function next(r){clear(r);r.answers.clear();r.index++;if(r.index>=r.deck.length){r.status='finished';r.deadline=null;broadcast(r);return}r.status='question';r.deadline=Date.now()+DURATION;broadcast(r);r.timer=setTimeout(()=>reveal(r),DURATION+50)}
function allAnswered(r){const active=[...r.teams.values()].filter(t=>t.connected);return active.length>0&&active.every(t=>r.answers.has(t.id))}
io.on('connection',socket=>{
 socket.on('create',(_,ack)=>{let c=code();while(rooms.has(c))c=code();const r={code:c,host:socket.id,status:'lobby',index:-1,deck:newDeck(),teams:new Map(),answers:new Map(),timer:null,deadline:null};rooms.set(c,r);socket.join(c);socket.data.room=c;socket.data.host=true;ack?.({ok:true,code:c});broadcast(r)});
 socket.on('join',({code:c,name,avatar}={},ack)=>{const r=rooms.get(String(c));name=String(name||'').trim().slice(0,32);if(!r||r.status!=='lobby'||!name)return ack?.({ok:false,error:'Sala inexistente, iniciada o nombre vacío'});if([...r.teams.values()].some(t=>t.name.toLowerCase()===name.toLowerCase()))return ack?.({ok:false,error:'Nombre ocupado'});const id=randomUUID();r.teams.set(id,{id,name,avatar:avatars.includes(avatar)?avatar:avatars[0],score:0,streak:0,correctCount:0,connected:true,socketId:socket.id,recentPhrases:[]});socket.join(r.code);socket.data.room=r.code;socket.data.team=id;ack?.({ok:true});broadcast(r)});
 socket.on('avatar',({avatar}={},ack)=>{const r=rooms.get(socket.data.room),t=r?.teams.get(socket.data.team);if(!t||r.status!=='lobby'||!avatars.includes(avatar))return ack?.({ok:false});t.avatar=avatar;broadcast(r);ack?.({ok:true})});
 socket.on('start',(_,ack)=>{const r=rooms.get(socket.data.room);if(!r||r.host!==socket.id||r.status!=='lobby'||r.teams.size<2)return ack?.({ok:false,error:'Se necesitan al menos dos mesas'});next(r);ack?.({ok:true})});
 socket.on('answer',({choice}={},ack)=>{const r=rooms.get(socket.data.room);if(!r||r.status!=='question'||!r.teams.has(socket.data.team)||r.answers.has(socket.data.team)||!Number.isInteger(choice)||choice<0||choice>3)return ack?.({ok:false});const now=Date.now();if(now>r.deadline)return ack?.({ok:false,error:'Tiempo agotado'});const elapsed=now-(r.deadline-DURATION);r.answers.set(socket.data.team,{choice,elapsed});ack?.({ok:true});broadcast(r);if(allAnswered(r))reveal(r)});
 socket.on('next',(_,ack)=>{const r=rooms.get(socket.data.room);if(!r||r.host!==socket.id||r.status!=='reveal')return ack?.({ok:false});next(r);ack?.({ok:true})});
 socket.on('disconnect',()=>{const r=rooms.get(socket.data.room);if(!r)return;if(r.host===socket.id){clear(r);rooms.delete(r.code);io.to(r.code).emit('closed');return}const t=r.teams.get(socket.data.team);if(t){if(r.status==='lobby')r.teams.delete(t.id);else t.connected=false;broadcast(r);if(r.status==='question'&&allAnswered(r))reveal(r)}});
});
http.listen(process.env.PORT||3000,()=>console.log('Código Azul V3 listo'));
