/* V3.6 Demo gerencial: evolución temporal del Resumen. No altera datos. */
function renderExecutiveTrend(reports){
  const holder=document.getElementById('trendBars');
  const selector=document.getElementById('trend36Metric');
  if(!holder||!selector)return;
  const metric=selector.value==='revenue'?'revenue':'sales';
  const period=document.getElementById('dashPeriod')?.value||'month';
  const monthly=period==='all';
  const groups=new Map();
  for(const report of reports){
    const date=String(report.date||'');
    if(!/^\d{4}-\d{2}-\d{2}$/.test(date))continue;
    const key=monthly?date.slice(0,7):date;
    groups.set(key,(groups.get(key)||0)+Math.max(0,Number(report[metric])||0));
  }
  const values=[...groups].sort(([a],[b])=>a.localeCompare(b));
  if(!values.length){holder.innerHTML='<p class="trend36-empty">No hay registros en el periodo seleccionado.</p>';return;}
  const fmt=n=>Math.round(n).toLocaleString('es-CO');
  const moneyFmt=n=>'$'+Math.round(n).toLocaleString('es-CO');
  const dateLabel=k=>{
    if(monthly){const [y,m]=k.split('-').map(Number);return new Date(y,m-1,1).toLocaleDateString('es-CO',{month:'short',year:'2-digit'}).replace('.','');}
    const [y,m,d]=k.split('-');return d+'/'+m;
  };
  const isRevenue=metric==='revenue';
  const total=values.reduce((s,[,v])=>s+v,0);
  const unit=isRevenue?'Valor vendido en COP':'Cantidad de ventas cerradas';
  const compact=n=>isRevenue?(n>=1000000?(n/1000000).toLocaleString('es-CO',{maximumFractionDigits:1})+' M':n>=1000?(n/1000).toLocaleString('es-CO',{maximumFractionDigits:0})+' mil':fmt(n)):fmt(n);
  const max=Math.max(1,...values.map(x=>x[1]));
  const width=760,height=260,left=78,right=26,top=22,bottom=48,iw=width-left-right,ih=height-top-bottom;
  const tick=Math.ceil(max/4)||1,upper=tick*4;
  const x=i=>left+(values.length===1?iw/2:i*iw/(values.length-1));
  const y=v=>top+ih-(v/upper)*ih;
  const grid=Array.from({length:5},(_,i)=>{
    const val=tick*i,cy=y(val);
    return `<line x1="${left}" y1="${cy}" x2="${width-right}" y2="${cy}" class="trend36-grid"/><text x="${left-12}" y="${cy+4}" text-anchor="end">${compact(val)}</text>`;
  }).join('');
  const pts=values.map(([,v],i)=>`${x(i).toFixed(2)},${y(v).toFixed(2)}`).join(' ');
  const marks=values.map(([key,val],i)=>`<circle cx="${x(i)}" cy="${y(val)}" r="4.6" class="trend36-dot"><title>${dateLabel(key)}: ${isRevenue?moneyFmt(val):fmt(val)+' ventas cerradas'}</title></circle>`).join('');
  // Eje X legible incluso con 31 días de un mes.
  const labelEvery=Math.max(1,Math.ceil(values.length/9));
  const xLabels=values.map(([key],i)=>i%labelEvery===0||i===values.length-1?`<text x="${x(i)}" y="${height-19}" text-anchor="middle">${dateLabel(key)}</text>`:'').join('');
  const periodLabel=period==='all'?'Agrupación mensual':'Agrupación diaria';
  const summary=`<div class="trend36-summary"><span>${unit} · ${periodLabel}</span><strong>Total: ${isRevenue?moneyFmt(total):fmt(total)+' ventas'}</strong></div>`;
  const svg=`<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Evolución temporal de ${unit.toLowerCase()} con ${values.length} fechas y total ${isRevenue?moneyFmt(total):fmt(total)}"><g class="trend36-axis">${grid}${xLabels}</g><polyline class="trend36-line" points="${pts}"/>${marks}</svg>`;
  holder.innerHTML=summary+svg+`<p class="trend36-foot">Cada punto representa el total de ${isRevenue?'pesos vendidos':'ventas cerradas'} de ${monthly?'un mes':'una fecha'}, no un asesor. ${period==='today'?'Para observar una tendencia, selecciona Semana, Mes o Acumulado.':''}</p>`;
}
