/* Solo DEMO. Semilla determinista, independiente de registros y metas reales. */
(function(){'use strict';
const KEY='distritec-gerencia-simulada-v3.6-registros';
const GOALS='distritec-gerencia-simulada-v3.6-metas';
const BRANCHES={"Redes Principal":["Asesor 01","Asesor 02","Asesor 03","Asesor 04","Asesor 05"],"Redes Pereira 1":["Asesor 06","Asesor 07","Asesor 08","Asesor 09","Asesor 10"],"Redes Armenia":["Asesor 11","Asesor 12","Asesor 13","Asesor 14","Asesor 15"],"Redes Pasto":["Asesor 16","Asesor 17","Asesor 18","Asesor 19","Asesor 20"],"Redes Cali":["Asesor 21","Asesor 22","Asesor 23","Asesor 24","Asesor 25"],"Redes Manizales":["Asesor 26","Asesor 27","Asesor 28","Asesor 29","Asesor 30"]};
const sites=Object.entries(BRANCHES);
let state=20261020;
function rnd(){state=(Math.imul(1664525,state)+1013904223)>>>0;return state/4294967296}
function range(a,b){return a+Math.floor(rnd()*(b-a+1))}
function choose(a){return a[range(0,a.length-1)]}
function iso(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function generate(){state=20261020;const records=[],start=new Date(2026,4,1),stop=new Date(2026,9,20);
const origins=['origin_referido','origin_softia','origin_hubspot','origin_manychat','origin_recompra','origin_organica','origin_otro'];
let monthlyState={};
for(let d=new Date(start);d<=stop;d.setDate(d.getDate()+1)){
 if(d.getDay()===0||d.getDay()===6)continue;
 const date=iso(d),m=date.slice(0,7),monthNo=d.getMonth()-4;
 sites.forEach(([branch,advisors],bi)=>advisors.forEach((advisor,ai)=>{
  // Algunas ausencias ficticias para reflejar operación realista.
  if(rnd()<.045)return;
  const key=advisor+'|'+branch;
  const base=monthlyState[key]||{pending:range(2,10)};
  const vigour=.72+(ai*.1)+(bi*.042)+monthNo*.047;
  const chats=Math.max(1,Math.round(range(17,35)*vigour));
  const studies=Math.min(chats,Math.round(chats*(.36+rnd()*.31)));
  const approved=Math.min(studies,Math.round(studies*(.55+rnd()*.35)));
  const sales=Math.min(approved,Math.round(approved*(.38+rnd()*.52)));
  const revenue=sales?Math.round(sales*range(920000,1910000)/1000)*1000:0;
  const pending_start=base.pending, pending_managed=range(0,Math.min(pending_start,5));
  const pending_recovered=Math.min(sales,pending_managed,range(0,2));
  const pending_close=Math.max(0,pending_start-pending_managed+range(0,5));
  base.pending=pending_close;monthlyState[key]=base;
  const dist=Object.fromEntries(origins.map(x=>[x,0]));for(let i=0;i<sales;i++)dist[choose(origins)]++;
  records.push({date,advisor,branch,chats,studies,approved,sales,...dist,revenue,pending_start,pending_managed,pending_recovered,pending_close,
   mood:choose(['Excelente','Bien','Bien','Regular']),product:choose(['Celulares','Celulares','TV','Computadores','Movilidad eléctrica']),
   objection:choose(['Estoy reportado','No tengo dinero/inicial','Cuota alta','No responde','Está muy caro']),
   gap:choose(['Mejor seguimiento','Mejorar cierre','Mejor perfil de lead','Inventario/producto']),
   adfit:choose(['Sí','Sí','Regular']),bonuses:choose(['Sí','Sí','No']),manager:choose(['Excelente','Bien','Regular']),leader:choose(['Excelente','Bien','Regular']),
   why:'Observación ficticia de demostración.',notes:'Registro SIMULADO para validación gerencial.'});
 }));
}
return records;
}
function exampleGoals(){const g={defaults:{},branches:{},advisors:{}};for(let m=5;m<=10;m++){let k='2026-'+String(m).padStart(2,'0');g.defaults[k]=40000000;g.branches[k]={};sites.forEach(([branch],idx)=>{if(idx===2)g.branches[k][branch]=38000000;if(idx===4)g.branches[k][branch]=44000000});}g.advisors['2026-10']={'Asesor 01':45000000,'Asesor 17':35000000};return g}
function reset(){try{const sample=generate();localStorage.setItem(KEY,JSON.stringify(sample));localStorage.setItem(GOALS,JSON.stringify(exampleGoals()));return sample.length}catch(e){console.error('No fue posible preparar los datos de muestra:',e);return 0}}
if(localStorage.getItem(KEY)===null)reset();
document.addEventListener('DOMContentLoaded',()=>{
 const button=document.getElementById('resetGerenciaDemo');if(!button)return;
 button.addEventListener('click',()=>{if(!confirm('Esto sustituye ÚNICAMENTE los datos y metas de esta DEMO. ¿Restaurar la muestra original?'))return;
 const n=reset();if(!n)return alert('No fue posible restaurar la muestra. Revisa el espacio de almacenamiento del navegador.');
 location.reload();});
});
})();