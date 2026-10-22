/* Distritec V3.7.2 - módulo independiente: no modifica datos ni claves anteriores. */
(function(){'use strict';
const STORE='distritec-marketing-v372';const get=id=>document.getElementById(id);
const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const num=v=>Number(v)||0;const money=n=>'$'+Math.round(n).toLocaleString('es-CO');
const defined=v=>v!==''&&v!==null&&v!==undefined;
const read=()=>{try{const a=JSON.parse(localStorage.getItem(STORE)||'[]');return Array.isArray(a)?a:[]}catch{return []}};
const write=a=>localStorage.setItem(STORE,JSON.stringify(a));
const month=()=>get('mkMonth').value;
function campaigns(){return read().filter(x=>x.month===month());}
function kpi(name,val,foot){return `<div class="mk-kpi"><span>${escape(name)}</span><b>${escape(val)}</b><span>${escape(foot)}</span></div>`}
function businessRecords(){try{const all=typeof records==='function'?records():[];return all.filter(x=>String(x.date||'').startsWith(month())&&defined(x.leads_received))}catch{return []}}
function render(){if(!get('mkMonth')||!month())return;const c=campaigns(),spend=c.reduce((n,x)=>n+num(x.spend),0),leads=c.reduce((n,x)=>n+num(x.leads),0);
get('mkKpis').innerHTML=kpi('Inversión registrada',money(spend),'Mes seleccionado')+kpi('Leads de Marketing',leads.toLocaleString('es-CO'),`${c.length} campaña(s)`)+kpi('Costo por lead (CPL)',leads?money(spend/leads):'—','Inversión / leads')+kpi('Conversaciones atribuibles',c.some(x=>x.conversations!==null)?c.filter(x=>x.conversations!==null).reduce((n,x)=>n+num(x.conversations),0).toLocaleString('es-CO'):'—','Solo campañas con atribución');
get('mkRows').innerHTML=c.map(x=>`<tr><td>${escape(x.name)}</td><td>${money(x.spend)}</td><td>${num(x.leads).toLocaleString('es-CO')}</td><td>${x.leads?money(x.spend/x.leads):'—'}</td><td>${x.conversations===null?'Sin atribución':num(x.conversations)}</td><td>${x.sales===null?'Sin atribución':num(x.sales)}</td><td>${x.sales===null||!x.sales?'—':money(x.spend/x.sales)}</td><td><button class="mk-delete" data-remove="${escape(x.id)}" type="button">Eliminar</button></td></tr>`).join('')||'<tr><td colspan="8">Aún no hay campañas registradas para este mes.</td></tr>';
const r=businessRecords(),total=r.reduce((n,x)=>n+num(x.leads_received),0),eff=r.reduce((n,x)=>n+num(x.lead_effective),0),info=r.reduce((n,x)=>n+num(x.lead_info),0),nr=r.reduce((n,x)=>n+num(x.lead_noresponse),0),invalid=r.reduce((n,x)=>n+num(x.lead_invalid),0);
get('mkLeadsPanel').innerHTML=r.length?`<div class="mk-status"><strong>${total.toLocaleString('es-CO')} leads registrados por Redes</strong><p>${r.length} reportes clasificados · ${eff.toLocaleString('es-CO')} conversaciones efectivas (${total?(eff/total*100).toFixed(1).replace('.',','):'0'}%)</p><div class="mk-meter"><div style="width:${total?Math.min(100,eff/total*100):0}%"></div></div><p>Informativos: ${info} · Sin interacción: ${nr} · Accidentales/no válidos: ${invalid}</p></div>`:'<div class="mk-status">Aún no hay reportes clasificados de Redes para este mes. Los registros anteriores permanecen sin reinterpretar.</div>';
}
function notify(m){get('mkMessage').textContent=m;}
get('mkMonth').value=new Date().getFullYear()+'-'+String(new Date().getMonth()+1).padStart(2,'0');
get('mkMonth').addEventListener('change',()=>{notify('');render()});
get('mkForm').addEventListener('submit',e=>{e.preventDefault();if(typeof role!=='undefined'&&role!=='admin')return;const name=get('mkCampaign').value.trim(),spend=Number(get('mkSpend').value),leads=Number(get('mkLeads').value),cv=get('mkConversations').value,sv=get('mkSales').value,conversations=cv===''?null:Number(cv),sales=sv===''?null:Number(sv);
if(!name||![spend,leads].every(Number.isFinite)||spend<0||leads<0||!Number.isInteger(leads)||[conversations,sales].some(v=>v!==null&&(!Number.isInteger(v)||v<0))){notify('Revisa nombres y cantidades: no se permiten valores negativos ni fracciones de leads/ventas.');return}
if((conversations!==null&&conversations>leads)||(sales!==null&&conversations!==null&&sales>conversations)){notify('Los resultados atribuibles no pueden superar los leads ni las conversaciones atribuidas.');return}
const all=read(),id=month()+'|'+name.toLocaleLowerCase('es-CO'),row={id,month:month(),name,spend,leads,conversations,sales},i=all.findIndex(x=>x.id===id);if(i===-1)all.push(row);else all[i]=row;
try{write(all);notify(i===-1?'Campaña guardada.':'Campaña actualizada.');get('mkForm').reset();render()}catch{notify('No fue posible guardar. Revisa el almacenamiento del navegador.')}});
get('mkRows').addEventListener('click',e=>{const b=e.target.closest('button[data-remove]');if(!b||typeof role!=='undefined'&&role!=='admin')return;if(!confirm('¿Eliminar esta campaña de la demo local?'))return;try{write(read().filter(x=>x.id!==b.dataset.remove));render()}catch{notify('No fue posible eliminar.')}});
const oldShow=window.show;if(typeof oldShow==='function'){window.show=function(id,btn){if(id==='marketing'&&role!=='admin')return oldShow.call(this,'dashboard',document.querySelector('[data-view="dashboard"]'));const result=oldShow.apply(this,arguments);if(id==='marketing')render();return result}}
const oldEnter=window.enter;if(typeof oldEnter==='function'){window.enter=function(){const result=oldEnter.apply(this,arguments);const logged=!get('app').classList.contains('hidden');if(logged)get('marketingNav').classList.toggle('hidden',role!=='admin');return result}}
get('marketingNav').classList.add('hidden');render();
})();