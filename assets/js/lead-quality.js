/* Distritec V3.7. Extensión aditiva; conserva registros y clave de almacenamiento. */
(function(){'use strict';
const ids=['leads_received','lead_effective','lead_info','lead_noresponse','lead_invalid','lead_hot','lead_warm','lead_cold'];
const el=id=>document.getElementById(id);
const num=id=>Math.max(0,Number(el(id)?.value||0));
function recalc(){
 const total=num('leads_received'),effective=num('lead_effective'),allocated=effective+num('lead_info')+num('lead_noresponse')+num('lead_invalid');
 const qualifying=num('lead_hot')+num('lead_warm')+num('lead_cold');
 const valid=allocated===total && (qualifying===0||qualifying===effective);
 if(el('chats'))el('chats').value=effective;
 if(el('lq37Status')){el('lq37Status').textContent=`${allocated} / ${total} clasificados`;el('lq37Status').classList.toggle('lq37-warn',!valid);}
 if(el('lq37Hint'))el('lq37Hint').textContent=!valid?(allocated!==total?`Revisa: ${allocated} clasificados de ${total} recibidos.`:`La temperatura debe sumar ${effective}, o quedar toda en cero.`):'Clasificación completa. Un lead se cuenta solo una vez.';
 return valid;
}
ids.forEach(id=>el(id)?.addEventListener('input',recalc));
// Captura evita guardar reportes nuevos con asignaciones inconsistentes.
el('dailyForm')?.addEventListener('submit',function(e){if(!recalc()){e.preventDefault();e.stopImmediatePropagation();alert('Revisa la distribución de leads: debe sumar el total recibido. Si clasificas la temperatura, debe sumar las conversaciones efectivas.');}},true);
// Los reportes previos a V3.7 no tienen clasificación: no imputar cero.
function render(){
 const root=el('lq37Dashboard');if(!root)return;
 const data=typeof dashboardScope==='function'?dashboardScope():[];
 const known=data.filter(x=>x.leads_received!==undefined&&x.leads_received!==''&&x.leads_received!==null);
 const count=(field)=>known.reduce((n,x)=>n+Math.max(0,Number(x[field])||0),0);
 const leads=count('leads_received'),effective=count('lead_effective'),information=count('lead_info'),unanswered=count('lead_noresponse'),invalid=count('lead_invalid');
 el('lq37Coverage').textContent=`${known.length} de ${data.length} reportes clasificados`;
 if(!known.length){el('lq37Stats').innerHTML='';el('lq37Bars').innerHTML='<p class="lq37-empty">Aún no hay leads clasificados. Los reportes anteriores se conservan sin reinterpretar sus chats.</p>';el('lq37Summary').textContent='Las métricas aparecerán después de registrar el primer reporte V3.7.';return;}
 const ratio=(n,d)=>d?(100*n/d).toFixed(1).replace('.',',')+'%':'—';
 const stats=[['Leads recibidos',leads],['Chats efectivos',effective],['Tasa de conversación',ratio(effective,leads)],['Estudios / chat',ratio(known.reduce((n,x)=>n+(Number(x.studies)||0),0),effective)]];
 el('lq37Stats').innerHTML=stats.map(([label,value])=>`<div class="lq37-stat"><strong>${value}</strong><span>${label}</span></div>`).join('');
 const groups=[['Conversación efectiva',effective],['Informativos',information],['Sin interacción',unanswered],['Accidentales / inválidos',invalid]];
 el('lq37Bars').innerHTML=groups.map(([label,value])=>`<div class="lq37-bar-row"><span>${label}</span><div class="lq37-bar-track"><div class="lq37-bar-fill" style="width:${leads?Math.min(100,100*value/leads):0}%"></div></div><strong>${value}</strong></div>`).join('');
 const hot=count('lead_hot'),warm=count('lead_warm'),cold=count('lead_cold'),classifiedTemp=known.filter(x=>Number(x.lead_hot||0)+Number(x.lead_warm||0)+Number(x.lead_cold||0)>0).length;
 el('lq37Summary').textContent=`${ratio(effective,leads)} de los leads generó conversación comercial. ${classifiedTemp?'Temperatura reportada: '+hot+' calientes, '+warm+' tibios y '+cold+' fríos.':'Temperatura comercial: sin datos todavía.'} No confundir falta de clasificación histórica con cero leads.`;
}
const oldRefresh=window.refresh;if(typeof oldRefresh==='function'){window.refresh=function(...args){const result=oldRefresh.apply(this,args);render();recalc();return result;};}
// prepareDailyForm se invoca con cada entrada al formulario. Se recalcula después de restablecer campos.
const oldPrepare=window.prepareDailyForm;if(typeof oldPrepare==='function'){window.prepareDailyForm=function(...args){const result=oldPrepare.apply(this,args);recalc();return result;};}
const oldReset=window.resetDailyForm;if(typeof oldReset==='function'){window.resetDailyForm=function(...args){const result=oldReset.apply(this,args);recalc();return result;};}
recalc();render();
})();
