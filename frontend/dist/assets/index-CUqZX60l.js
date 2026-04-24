const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./logic-CLBnyjbg.js","./helpers-CBT32SXN.js"])))=>i.map(i=>d[i]);
import{a as e,c as t,l as n,n as r,o as i,r as a,s as o,t as s,u as c}from"./helpers-CBT32SXN.js";import{_ as l,a as u,c as d,d as f,f as p,g as m,h,i as g,l as _,m as v,n as y,o as b,p as x,s as S,t as C}from"./logic-CLBnyjbg.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})(),n((()=>{window.tailwind&&(tailwind.config={darkMode:`class`,theme:{extend:{fontFamily:{sans:[`Inter`,`sans-serif`],inter:[`Inter`,`sans-serif`],outfit:[`Outfit`,`sans-serif`]},colors:{brand:{blue:`#3B82F6`,emerald:`#10B981`,purple:`#8B5CF6`,orange:`#F59E0B`,red:`#EF4444`}}}}})}))();function w(e){let t=s(`loadingOverlay`),n=s(`loadingMsg`);t&&(D&&=(clearTimeout(D),null),t.style.display=`flex`,setTimeout(()=>{t.style.opacity=`1`,t.style.pointerEvents=`all`},10),n&&(n.textContent=e))}function T(){let e=s(`loadingOverlay`);e&&(D&&clearTimeout(D),e.style.opacity=`0`,e.style.pointerEvents=`none`,D=setTimeout(()=>{e.style.display=`none`,D=null},500))}function E(e){let t=document.getElementById(`connectionStatus`),n=document.getElementById(`connectionDot`),r=document.getElementById(`connectionPing`);!t||!n||(e?(t.textContent=`Live Connection`,t.classList.remove(`text-amber-500`),t.classList.add(`text-emerald-400`),n.className=`relative inline-flex rounded-full h-2 w-2 bg-brand-emerald`,r&&(r.className=`animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-emerald opacity-75`)):(t.textContent=`Modo Offline - Datos Cacheados`,t.classList.remove(`text-emerald-400`,`text-slate-400`),t.classList.add(`text-amber-500`),n.className=`relative inline-flex rounded-full h-2 w-2 bg-amber-500`,r&&(r.className=`absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-20`)))}var D,O=c((()=>{e(),D=null})),k,A,j,M=c((()=>{k=`KoboDashboardDB`,A=`cacheStore`,j={async open(){return new Promise((e,t)=>{let n=indexedDB.open(k,1);n.onerror=()=>t(`Error opening DB`),n.onupgradeneeded=e=>{let t=e.target.result;t.objectStoreNames.contains(A)||t.createObjectStore(A)},n.onsuccess=t=>e(t.target.result)})},async get(e){try{let t=await this.open();return new Promise((n,r)=>{let i=t.transaction(A,`readonly`).objectStore(A).get(e);i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)})}catch(e){return console.error(`IndexedDB Get Error:`,e),null}},async set(e,t){try{let n=await this.open();return new Promise((r,i)=>{let a=n.transaction(A,`readwrite`).objectStore(A).put(t,e);a.onsuccess=()=>r(),a.onerror=()=>i(a.error)})}catch(e){console.error(`IndexedDB Set Error:`,e)}}}}));async function N(){let e=await fetch(`/api/assets`);if(!e.ok)throw Error(`Error API (${e.status}) at fetchAssets`);return await e.json()}async function ee(e){if(!e)throw Error(`Missing UID in fetchSurveyData`);let t=`/api/data/${e}`,n=await fetch(t);if(!n.ok)throw Error(`Error API (${n.status}) at fetchSurveyData`);return await n.json()}var P=c((()=>{h()}));async function F(e){console.log(`api.js: Orchestrating loadAssets()...`),w(`Buscando formularios en KoboToolbox…`);let t=null;try{t=await N(),await j.set(`assets_cache`,t),E(!0)}catch(e){console.warn(`Network failure. Trying cache...`,e),t=await j.get(`assets_cache`),t&&E(!1)}if(!t){T(),s(`errorState`)&&(s(`errorState`).style.display=`flex`);let e=s(`statusBadge`);e&&(e.textContent=`Error de conexión`,e.classList.remove(`active`)),E(!1);return}let n=s(`assetSelect`);n&&(n.innerHTML=`<option value="">— Seleccionar encuesta —</option>`,t.forEach(e=>{let t=document.createElement(`option`);t.value=e.uid,t.textContent=e.name,n.appendChild(t)}),n.addEventListener(`change`,()=>{let e=n.options[n.selectedIndex];l.assetName=e?e.textContent.trim():``}));let r=s(`statusBadge`);r&&(r.textContent=`Formularios Listos`),window.lucide&&lucide.createIcons();let i=t.find(e=>e.name.toLowerCase().includes(`esca`)&&e.name.toLowerCase().includes(`v3`));i?(n&&(n.value=i.uid),l.assetName=i.name,e&&e(i.uid)):T()}async function I(e,t){if(!e)return;w(`Descargando datos desde Kobo API…`);let n=s(`btnRefresh`);n&&(n.disabled=!0);let r=null,i=!1;try{r=await ee(e),await j.set(`data_cache_${e}`,r),E(!0)}catch(t){console.warn(`Network failure. Trying cache...`,t),r=await j.get(`data_cache_${e}`),r&&(i=!0,E(!1))}if(!r){alert(`Error: No se pudieron descargar los datos y no hay caché disponible.`),T(),n&&(n.disabled=!1);return}l.rawData=r.results||(Array.isArray(r)?r:[]),console.log(`api.js: Loaded ${l.rawData.length} records ${i?`(Offline Cache)`:``}`);let a=s(`statusBadge`);a&&(a.textContent=`${l.rawData.length} registros`),s(`errorState`)&&s(`errorState`).classList.add(`hidden`),s(`mainContent`)&&s(`mainContent`).classList.remove(`hidden`),w(`Renderizando dashboard...`),requestAnimationFrame(()=>{setTimeout(()=>{t&&t(),window.lucide&&lucide.createIcons(),requestAnimationFrame(()=>{setTimeout(()=>{T(),n&&(n.disabled=!1)},800)})},100)})}var te=c((()=>{m(),e(),O(),M(),P(),window.loadAssets=()=>F(e=>I(e,window.__onProcessData))}));function ne(e){let t=String(e[`S0/cedula_encuestador`]||`N/A`).trim(),n=String(e[`S0/s0_nombreapellido`]||`Desconocido`).trim(),r=e.start||``,i=e.end||``,a=e[`ubicacion_final/hora_fin`]||e[`ubicacion_final/hora_f`]||e.hora_f;a&&(i=!a.includes(`T`)&&r.includes(`T`)?r.split(`T`)[0]+`T`+a:a,e.end=i);let o=(e.today||e._submission_time||``).slice(0,10),s=(l.assetName||``).toUpperCase().includes(`EHM`)?`EHM`:`ESCA`,c=null;if(r)try{c=new Date(r).getHours()}catch{}let u=null;if(e._submission_time)try{u=new Date(e._submission_time).getHours()}catch{}let d=e=>{if(!e||typeof e!=`string`)return null;let t=e.trim().split(` `);return t.length>=4?parseFloat(t[3]):null};return{cedula:t,nombre:n,start:r,end:i,fecha:o,hora:c,hora_trans:u,formType:s,start_precision:d(e[`start-geopoint`]||e.start_geopoint),end_precision:d(e[`group_sh53u78/ubicacion_i`]||e[`end-geopoint`]),mun:e[`S1/mun`]||`N/A`,par:e[`S1/par`]||`N/A`,nodo:e[`S1/nodo`]||`N/A`,semana:e[`group_sh53u78/semana`]||``,uso:e[`S1/Uso_de_la_Unidad_inmobiliaria`]||`N/A`,condicion:e[`Condici_n_de_ocupaci_n/condicion_de_ocupacion`]||`N/A`,control:e[`group_sh53u78/control`]||e._uuid||``,lote:e[`group_sh53u78/lote`]||``,situacion_vivienda:e[`Condici_n_de_ocupaci_n/situacion_vivienda`]||``,segmento:e[`S1/segmento`]||e[`S1/group_segmeto_sector/segmento`]||e[`group_segmeto_sector/segmento`]||``,sector:e[`S1/sector`]||e[`S1/group_segmeto_sector/sector`]||e[`group_segmeto_sector/sector`]||``,manzana:e[`S1/manzana`]||``,parcela:e[`S1/parcela`]||``,edificacion:e[`S1/Edificaci_n`]||e[`S1/edificacion`]||``,lado_manz:e[`S1/lado_manz`]||``,n_linea:e[`group_sh53u78/n_linea`]||``,n_serie:e[`group_sh53u78/n_serie`]||``,direccion:e[`S1/P_nomsect`]||e[`S1/direccion`]||``,nota:e[`ubicacion_final/nota`]||``}}function re(e,t){if(!e||!t)return null;try{let n=new Date(e),r=new Date(t),i=Math.round((r-n)/6e4*10)/10;return i>=0&&i<=600?i:null}catch{return null}}var ie=c((()=>{m()}));function ae(e,t){let n=0,r=0,i=0,a=[];return t===`EHM`?(a=Array.isArray(e.lista_hogar)?e.lista_hogar:[],a.forEach(e=>{let t=Array.isArray(e[`lista_hogar/lista_miembros`])?e[`lista_hogar/lista_miembros`]:[];if(t.length>0)n+=t.length;else{let t=parseInt(e[`lista_hogar/personas_hogar`]||e[`lista_hogar/lista_miembros_count`]||`0`,10);isNaN(t)||(n+=t)}t.forEach(e=>{let{hCount:t,mCount:n}=oe(e);r+=t,i+=n})})):(a=Array.isArray(e[`datos_hogar/hogar`])?e[`datos_hogar/hogar`]:[],a.forEach(e=>{let t=Array.isArray(e[`datos_hogar/hogar/integrantes_hogar`])?e[`datos_hogar/hogar/integrantes_hogar`]:[];n+=t.length,t.forEach(e=>{let{hCount:t,mCount:n}=oe(e);r+=t,i+=n})})),{totalPers:n,totalHombres:r,totalMujeres:i,hogaresCount:a.length,hogaresRaw:a}}function oe(e){let t=0,n=0,r=Object.keys(e).find(e=>e.endsWith(`/sexo`)||e.endsWith(`:sexo`)||e===`sexo`);if(r){let i=String(e[r]).trim().toLowerCase();[`1`,`sexo1`,`v`,`m`,`masculino`,`hombre`].includes(i)&&(t=1),[`2`,`sexo2`,`h`,`f`,`femenino`,`mujer`].includes(i)&&(n=1)}return{hCount:t,mCount:n}}var se=c((()=>{}));function ce(e){let n=t(e[`ubicacion_final/ubicacion_f`]||e.ubicacion_f),r=t(e[`group_sh53u78/ubicacion_i`]||e.ubicacion_i),i=null,a=null;if(r&&r[0])i=r[0],a=r[1];else if(n&&n[0])i=n[0],a=n[1];else if(e._geolocation&&e._geolocation.length>=2)i=e._geolocation[0],a=e._geolocation[1];else if(e[`S1/ubicacion`]){let t=e[`S1/ubicacion`].split(` `);t.length>=2&&(i=parseFloat(t[0]),a=parseFloat(t[1]))}return{lat:i,lng:a,ptIni:r,ptFin:n}}function le(e,n,r){let i=null,o=null;try{let s=e[`start-geopoint`]||e.start_geopoint,c=e[`group_sh53u78/ubicacion_i`]||e[`end-geopoint`]||e.end_geopoint,l=t(s)||(e._geolocation?.length>=2?[e._geolocation[0],e._geolocation[1]]:null),u=t(c)||(e._geolocation?.length>=2?[e._geolocation[0],e._geolocation[1]]:null);l&&u&&(i=a(l[0],l[1],u[0],u[1])),n&&r&&n[0]&&r[0]&&(o=a(n[0],n[1],r[0],r[1]))}catch{}return{distance_m:i,dist_ini_fin:o}}function ue(e,t,n){if(e===null||t===null||l.segmentBBoxes.length===0)return null;let r=null;for(let n of l.segmentBBoxes){let a=n.bbox;if(e>=a.minLat&&e<=a.maxLat&&t>=a.minLng&&t<=a.maxLng){let a=n.feature.geometry,o=!1;if(a.type===`Polygon`)i([e,t],a.coordinates[0])&&(o=!0);else if(a.type===`MultiPolygon`){for(let n of a.coordinates)if(i([e,t],n[0])){o=!0;break}}if(o){r=n.props.cod_seg===`000`||n.props.cod_seg===`0`?n.props.cod_sc:n.props.cod_seg;break}}}if(!r){let r=.0015;for(let i of l.segmentBBoxes){let a=i.props.cod_seg===`000`||i.props.cod_seg===`0`?i.props.cod_sc:i.props.cod_seg;if(o(n,a)){let n=i.bbox;if(e>=n.minLat-r&&e<=n.maxLat+r&&t>=n.minLng-r&&t<=n.maxLng+r)return a}}}return r}var de=c((()=>{m(),e()}));function fe(e){let{r:n,normalized:r,durMin:i,totalPers:s,distance_m:c,dist_ini_fin:l,actualSeg:u,ptIni:d,isCompletada:f,hogaresRaw:p}=e,m=[];try{let e=t(n[`start-geopoint`]||n.start_geopoint)||(n._geolocation?.length>=2?[n._geolocation[0],n._geolocation[1]]:null);e&&d&&d[0]&&a(e[0],e[1],d[0],d[1])>500&&m.push(`APERT_LEJOS`)}catch{}c!==null&&c>600&&m.push(`FUERA_SEGMENTO`),l!==null&&l>30&&m.push(`DESPLAZAMIENTO_ANOMALO`),f&&i!==null&&(r.formType===`EHM`&&s===1&&i<10?m.push(`TIEMPO_CORTO_EHM`):r.formType!==`EHM`&&i<15?m.push(`TIEMPO_CORTO_ESCA`):i<15&&m.push(`TIEMPO_CORTO`)),f&&i!==null&&i>45&&m.push(`TIEMPO_LARGO`);let h=r.cedula.replace(/\D/g,``);(h.length<6||h.length>9)&&m.push(`CEDULA_INVALIDA`),p.forEach(e=>{(Array.isArray(e[`datos_hogar/hogar/integrantes_hogar`])?e[`datos_hogar/hogar/integrantes_hogar`]:[]).forEach(e=>{let t=e[`datos_hogar/hogar/integrantes_hogar/integrantes/cuanto_actividad`];if(t!=null&&t!==``){let e=Number(t);!isNaN(e)&&(e<1||e>9999999)&&(m.includes(`INGRESO_ANOMALO`)||m.push(`INGRESO_ANOMALO`))}})}),p.forEach(e=>{let t=e[`datos_hogar/hogar/productos_22/arranque`]||``,n=e[`datos_hogar/hogar/productos_22/productos`],r=Array.isArray(n)&&n.length>0;f&&r&&!t&&(m.includes(`ARRANQUE_INCONSISTENTE`)||m.push(`ARRANQUE_INCONSISTENTE`))});let g=r.segmento===`000`||r.segmento===`0`?r.sector:r.segmento;return(u&&!o(g,u)||!u&&r.lat!==null)&&m.push(`SEGMENTO_INCORRECTO`),m}var pe=c((()=>{e(),h()}));function me(){l.encMap={},l.rawData.forEach(e=>{if(!e._meta)return;let{cedula:t,nombre:n,estado:r,durMin:i,totalPers:a,mun:o,condicion:s,semana:c,control:u}=e._meta;l.encMap[t]||(l.encMap[t]={cedula:t,nombre:n,encuestas:0,completadas:0,duraciones:[],personas:0,municipios:new Set,condiciones:{},semanas:{}});let d=l.encMap[t];d.encuestas++,r===`completada`&&d.completadas++,i!==null&&d.duraciones.push(i),d.personas+=a||0,d.municipios.add(o),d.condiciones[s]=(d.condiciones[s]||0)+1,c&&(d.semanas[c]||(d.semanas[c]=new Set),u&&d.semanas[c].add(u))}),Object.values(l.encMap).forEach(e=>{e.avgDur=e.duraciones.length?r(e.duraciones):0,e.pctCompleta=e.encuestas>0?Math.round(e.completadas/e.encuestas*100):0,e.score=e.pctCompleta;let t=Object.values(e.semanas||{});e.avgControlesSemana=t.length?Math.round(t.reduce((e,t)=>e+t.size,0)/t.length):0,e.totalSemanas=t.length})}var he=c((()=>{m(),e()}));function R(e){return e?String(e).toLowerCase().normalize(`NFD`).replace(/[\u0300-\u036f]/g,``).replace(/[^a-z0-9]/g,``).trim():``}function ge(e){let t=R(e);return t?_e.has(t)?`TIPO A`:ve.has(t)?`TIPO B`:ye.has(t)?`TIPO C`:be.has(t)?`TIPO E`:`NO DEFINIDO`:`NO DEFINIDO`}var _e,ve,ye,be,xe=c((()=>{_e=new Set([`AUSENTE TEMPORALMENTE`,`AUSENTETEMPORALMENTE`,`ausente_temporalmente`,`NADIE EN LA VIVIENDA AL MOMENTO DE LA ENTREVISTA`,`nadie_en_vivienda`,`REHUSO LA ENTREVISTA`,`REHUSÓ LA ENTREVISTA`,`REHUSOLAENTREVISTA`,`rehuso_entrevista`,`OCUPANTES AUSENTES`,`OCUPANTES_AUSENTES`,`INFORMANTE NO CALIFICADO`,`INFORMANTE_NO_CALIFICADO`,`INCOMPLETA`,`PENDIENTE`,`NO ATIENDE TELEFONO`,`RECHAZO`,`SIN ENTREVISTA`,`RECHAZADA`,`OTRO_AUSENTES`].map(e=>R(e))),ve=new Set([`CONSTRUCCION`,`EN CONSTRUCCION`,`en_construccion`,`INADECUADA PARA EL USO`,`inadecuada_el_uso`,`CONSTRUYENDOSE`,`CONSTRUYÉNDOSE`,`VIVIENDA DESOCUPADA`,`VIVIENDA OCASIONAL`,`USO VACACIONAL`,`uso_vacacional`,`USO_VACACIONAL`,`TEMPORALMENTE EN NEGOCIO`,`temporalmente_en_negocio`,`DESOCUPADA EN ESTADO REGULAR`,`desocupada_estado_regular`,`VIVIENDA_DESOCUPADA`,`OTRO_DESOCUPADA`].map(e=>R(e))),ye=new Set([`DEMOLIDA`,`demolida`,`OTRO (ESPECIFIQUE)`,`MAL LISTADA`,`NO EXISTE`,`SIN LISTAR`,`NO RESIDENCIAL`,`NO RESIENDECIAL`,`OTRO`,`NO EXISTE NRO TELEFONICO`,`NEGOCIO PERMANENTE`,`OTRA SITUACION`,`CONSOLIDADA`,`NEGOCIO O ALMACEN PERMANENTE`,`negocio_almacen_permanente`].map(e=>R(e))),be=new Set([`OCUPADA CON OCUPANTES PRESENTES`,`ocupada_con_ocupantes_presentes`,`TOTALMENTE ENCUESTADA`].map(e=>R(e)))}));function Se(){console.log(`dataProcessor: Processing raw data pipeline...`),l.rawData.forEach(e=>{let t=ne(e),n=re(t.start,t.end),{totalPers:r,totalHombres:i,totalMujeres:a,hogaresCount:o,hogaresRaw:s}=ae(e,t.formType),{lat:c,lng:l,ptIni:u,ptFin:d}=ce(e),{distance_m:f,dist_ini_fin:p}=le(e,u,d),m=ue(c,l,t.segmento===`000`||t.segmento===`0`?t.sector:t.segmento),h=0;Array.isArray(s)&&s.forEach(e=>{let t=(Array.isArray(e[`lista_hogar/lista_miembros`])?e[`lista_hogar/lista_miembros`]:Array.isArray(e[`datos_hogar/hogar/integrantes_hogar`])?e[`datos_hogar/hogar/integrantes_hogar`]:[]).length;if(t===0){let n=parseInt(e[`lista_hogar/personas_hogar`]||e[`lista_hogar/lista_miembros_count`]||`0`,10);isNaN(n)||(t=n)}t===1&&h++});let g=/totalment/i.test(t.nota),_=ge(t.situacion_vivienda||t.condicion);e._meta={...t,durMin:n,totalPers:r,totalHombres:i,totalMujeres:a,hogares:o,hogaresUniPersonales:h,lat:c,lng:l,distance_m:f,dist_ini_fin:p,actual_seg:m,estado:g?`completada`:`no_respuesta`,tipo_vivienda:_,flag_distance_gt_500:f!==null&&f>500,flag_short_duration:n!==null&&n<10},e._meta.alertas=fe({r:e,normalized:t,durMin:n,totalPers:r,distance_m:f,dist_ini_fin:p,actualSeg:m,ptIni:u,isCompletada:g,hogaresRaw:s}),e._meta.hasAlerts=e._meta.alertas.length>0}),Ce(),me(),console.log(`dataProcessor: Pipeline completed ✓`)}function Ce(){l.controlsIndex instanceof Map&&l.controlsIndex.size>0&&l.rawData.forEach(e=>{if(!e._meta)return;let t=e._meta.control?e._meta.control.slice(-4):``,n=String(parseInt(e._meta.n_serie,10)||0),r=String(parseInt(e._meta.n_linea,10)||0),i=l.validControls.has(t),a=l.validSeries.has(n),o=l.validLineas.has(r);if(e._meta._ls_ctrl_ok=i,e._meta._ls_serie_ok=a,e._meta._ls_linea_ok=o,!i||!a||!o){e._meta.alertas.includes(`LINEA_SERIE_INVALIDA`)||(e._meta.alertas.push(`LINEA_SERIE_INVALIDA`),e._meta.hasAlerts=!0);let t=[];i||t.push(`Control`),a||t.push(`Serie`),o||t.push(`Línea`),e._meta._ls_key_reported=`${t.join(`, `)} no definido(s) en base de datos`}})}var we=c((()=>{m(),ie(),se(),de(),pe(),he(),xe()}));function Te(){let e=s(`offCanvasFilters`),t=s(`filtersOverlay`);!e||!t||(e.classList.remove(`translate-x-full`),t.classList.remove(`hidden`),setTimeout(()=>t.classList.remove(`opacity-0`),10))}function z(){let e=s(`offCanvasFilters`),t=s(`filtersOverlay`);!e||!t||(e.classList.add(`translate-x-full`),t.classList.add(`opacity-0`),setTimeout(()=>t.classList.add(`hidden`),300))}function Ee(){let e={enc:s(`filterEncuestador`),mun:s(`filterMunicipio`),con:s(`filterCondicion`),sit:s(`filterSituacionVivienda`),uso:s(`filterUso`),sem:s(`filterSemana`),ctrl:s(`filterControl`),par:s(`filterParroquia`),nodo:s(`filterNodo`),alerta:s(`filterAlerta`),htrans:s(`filterHoraTransmision`),hinicio:s(`filterHoraInicio`)};Object.values(e).forEach(e=>{if(e){let t=`Todos`;e.id===`filterAlerta`?t=`Todas las alertas`:e.id===`filterHoraTransmision`||e.id===`filterHoraInicio`?t=`Cualquier hora`:(e.id.includes(`Condicion`)||e.id.includes(`Semana`)||e.id.includes(`Parroquia`))&&(t=`Todas`),e.innerHTML=`<option value="">${t}</option>`}}),e.alerta&&d.forEach(t=>{let n=document.createElement(`option`);n.value=t.code,n.textContent=t.label,e.alerta.appendChild(n)});let t={muns:new Set,sitVs:new Set,cons:new Set,usos:new Set,semanas:new Set,controles:new Set,pars:new Set,nodos:new Set,hTrans:new Set,hInicio:new Set};e.enc&&Object.values(l.encMap).sort((e,t)=>e.nombre.localeCompare(t.nombre)).forEach(t=>{let n=f.has(String(t.cedula).trim()),r=document.createElement(`option`);r.value=t.cedula,r.textContent=`${t.nombre} (${t.cedula})${n?` [INE]`:` [SEGEN]`}`,r.style.color=n?`#10B981`:`#8B5CF6`,r.style.fontWeight=`bold`,e.enc.appendChild(r)}),l.rawData.forEach(e=>{let n=e._meta;n&&(n.mun&&n.mun!==`N/A`&&t.muns.add(n.mun),n.situacion_vivienda&&t.sitVs.add(n.situacion_vivienda),n.condicion&&n.condicion!==`N/A`&&t.cons.add(n.condicion),n.uso&&n.uso!==`N/A`&&t.usos.add(n.uso),n.semana&&t.semanas.add(n.semana),n.control&&t.controles.add(n.control),n.par&&n.par!==`N/A`&&t.pars.add(n.par),n.nodo&&n.nodo!==`N/A`&&t.nodos.add(n.nodo),n.hora_trans!==void 0&&n.hora_trans!==null&&t.hTrans.add(n.hora_trans),n.hora!==void 0&&n.hora!==null&&t.hInicio.add(n.hora))});let n=(e,t,n)=>{e&&[...t].sort().forEach(t=>{let r=document.createElement(`option`);r.value=t,r.textContent=n?n(t):t,e.appendChild(r)})};n(e.mun,t.muns),n(e.par,t.pars),n(e.nodo,t.nodos),n(e.sem,t.semanas),n(e.ctrl,t.controles),n(e.sit,t.sitVs,e=>e.replace(/_/g,` `).toUpperCase()),n(e.con,t.cons,e=>e.replace(/_/g,` `).toUpperCase()),n(e.uso,t.usos,e=>e.replace(/_/g,` `).toUpperCase()),n(e.htrans,t.hTrans,e=>`${e}:00`),n(e.hinicio,t.hInicio,e=>`${e}:00`),e.mun&&e.mun.dispatchEvent(new Event(`change`))}var De=c((()=>{m(),e(),h()})),B=c((()=>{y(),De(),b()})),V,H,U,Oe,ke,Ae,je=c((()=>{V=(e,t)=>{if(!e)return null;if(e._meta&&e._meta[t]!==void 0&&e._meta[t]!==null)return e._meta[t];if(e[t]!==void 0&&e[t]!==null)return e[t];let n=String(t).split(`/`).map(e=>e.trim());for(let t of n)if(!(!t||t.includes(` `))&&e[t]!==void 0&&e[t]!==null)return e[t];return null},H=e=>e==null||e===``?`<span class="text-slate-500 font-medium italic">(No Registrado)</span>`:typeof e==`object`?`<pre class="text-[10px] bg-slate-950/20 p-2 rounded overflow-x-auto">${JSON.stringify(e,null,2)}</pre>`:`<span class="font-outfit font-bold text-slate-800 dark:text-slate-200 text-sm">${String(e)}</span>`,U=e=>{if(!e||typeof e!=`string`)return null;let t=e.trim().split(` `);return t.length>=2?{lat:parseFloat(t[0]),lng:parseFloat(t[1]),alt:t[2]?parseFloat(t[2]):null,acc:t[3]?parseFloat(t[3]):null}:null},Oe=(e,t)=>{if(!e||!t)return null;let n=e=>e*Math.PI/180,r=n(t.lat-e.lat),i=n(t.lng-e.lng),a=Math.sin(r/2)**2+Math.cos(n(e.lat))*Math.cos(n(t.lat))*Math.sin(i/2)**2;return 6371e3*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a))},ke=(e,t)=>String(parseInt(e,10)||0).padStart(t,`0`),Ae=(e,t,n)=>`${String(e||``).trim().slice(-4)}-${String(parseInt(t,10)||0)}-${String(parseInt(n,10)||0)}`}));function Me(e){let{stEntidad:t,stMpio:n,stParr:r,valHeader:i,valLeftLabel:a,valLeftVal:o,segmentMatchStatus:s,actualSegClasses:c,actualSegText:l,actualSeg:u,stSect:d,stNodo:f,stEncuestador:p,stCedula:m,stFecha:h,stEstado:g,stDur:_,stControl:v,stLinea:y,stSerie:b,ctrlPanelHtml:x,stHogares:S,stPers:C,stCond:w,stUso:T,stDist:E,hasAlerts:D,alertsHtml:O,hasMapData:k,isFlagged:A,walkedDistance:j,rawDist:M,durMin:N,declaredSeg:ee,alertas:P}=e,F=k?`
        <div class="bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/50 overflow-hidden mt-4">
            <div class="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <div class="flex items-center gap-3">
                    <h4 class="text-[10px] uppercase font-black text-brand-orange tracking-widest flex items-center gap-2 m-0">Verificación Geográfica Histórica</h4>
                    ${A?`<span class="px-2 py-0.5 rounded text-[9px] uppercase font-bold tracking-widest bg-brand-red/20 text-brand-red border border-brand-red/30">Desviación Detectada</span>`:``}
                </div>
                <div class="flex items-center gap-4 text-[9px] uppercase font-bold text-slate-500">
                    <div class="flex items-center gap-1.5"><div class="w-2 h-2 rounded-full bg-[#3B82F6]"></div> Apertura</div>
                    <div class="flex items-center gap-1.5"><div class="w-2 h-2 rounded-full bg-[#10B981]"></div> P. Inicial</div>
                    <div class="flex items-center gap-1.5"><div class="w-2 h-2 rounded-full bg-[#F59E0B]"></div> P. Final</div>
                </div>
            </div>
            <div id="detailMapWrapper" class="h-48 sm:h-64 md:h-96 w-full relative transition-[height] duration-300">
                <div class="metrics-panel-overlay absolute top-4 left-4 z-[var(--z-map-overlay)] bg-white/90 dark:bg-slate-900/80 backdrop-blur-md rounded-xl p-3 border border-slate-200 dark:border-slate-700/50 shadow-xl w-48 pointer-events-auto">
                    <div class="flex justify-between items-center md:block cursor-pointer md:cursor-default" onclick="if(window.innerWidth < 768) this.closest('.metrics-panel-overlay').classList.toggle('is-expanded')">
                        <h5 class="text-[9px] uppercase font-black text-brand-blue dark:text-slate-400 tracking-widest md:mb-2 md:border-b md:border-slate-100 md:dark:border-slate-700 md:pb-1 m-0">Métricas de Rastreo</h5>
                        <div class="md:hidden text-brand-blue">
                            <i data-lucide="chevron-up" class="w-4 h-4 transition-transform duration-300"></i>
                        </div>
                    </div>
                    <div class="metrics-content-body transition-opacity duration-300">
                        <div class="flex justify-between items-center mb-1 mt-2 md:mt-0"><span class="text-[10px] text-slate-500 font-bold">Seg. Declarado:</span><span class="text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300">#${ee||`N/A`}</span></div>
                        <div class="flex justify-between items-center mb-2 border-b border-slate-100 dark:border-slate-700/50 pb-2"><span class="text-[10px] text-slate-500 font-bold">Seg. en Mapa:</span><span class="text-[10px] font-mono font-bold ${P.includes(`SEGMENTO_INCORRECTO`)||P.includes(`FUERA_SEGMENTO`)?`text-brand-red`:`text-brand-emerald`}">${u?`#`+u:`(Nulo)`}</span></div>
                        <div class="flex justify-between items-center mb-1"><span class="text-[10px] text-slate-500 font-bold">Desplazamiento:</span><span class="text-[10px] font-mono font-bold ${P.includes(`DESPLAZAMIENTO_ANOMALO`)?`text-brand-orange`:`text-slate-700 dark:text-slate-300`}">${j===null?`N/A`:Math.round(j)+`m`}</span></div>
                        <div class="flex justify-between items-center mb-1"><span class="text-[10px] text-slate-500 font-bold">Dist. Centro:</span><span class="text-[10px] font-mono font-bold ${A?`text-brand-red`:`text-brand-emerald`}">${M===null?`N/A`:Math.round(M)+`m`}</span></div>
                        <div class="flex justify-between items-center"><span class="text-[10px] text-slate-500 font-bold">Tiempo Base:</span><span class="text-[10px] font-mono text-brand-blue font-bold">${N?N+` min`:`N/A`}</span></div>
                    </div>
                </div>
                <div id="detailMap" class="absolute inset-0 z-0 bg-slate-800"></div>
            </div>
            <div class="p-1 border-t border-slate-200 dark:border-slate-700 text-center text-[10px] text-slate-400 leading-tight">El círculo sombreado indica la zona válida de cobertura (radio de 500m).</div>
        </div>`:`
        <div class="mt-4 p-4 border border-dashed border-slate-700 rounded-xl text-center text-slate-500">
            <span class="text-xs uppercase tracking-widest font-bold block">No hay datos geográficos</span>
            <span class="text-[10px] block mt-1">Este registro no generó ni capturó coordenadas GPS con precisión adecuada.</span>
        </div>`;return`
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
            <div class="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-5 border border-slate-200 dark:border-slate-700/50">
                <h4 class="text-[10px] uppercase font-black text-brand-blue tracking-widest flex items-center gap-2 mb-4">Contexto Geográfico</h4>
                <div class="space-y-3">
                    <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Estado / Entidad</div>${t}</div>
                    <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Municipio</div>${n}</div>
                    <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Parroquia</div>${r}</div>
                    
                    <div class="pt-3 border-t border-slate-200 dark:border-slate-700">
                        <div class="text-[10px] text-slate-500 font-bold uppercase mb-2">${i}</div>
                        <div class="flex items-center gap-2 mb-1">
                            <div class="flex-1 bg-white dark:bg-slate-900/50 p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-center shadow-sm">
                                <div class="text-[9px] text-slate-500 uppercase font-black mb-1">${a}</div>
                                <div class="font-outfit font-bold text-slate-800 dark:text-slate-200 text-sm">#${o}</div>
                            </div>
                            <div class="flex items-center justify-center min-w-[24px]">
                                ${s}
                            </div>
                            <div class="flex-1 ${c} p-2 rounded-lg border text-center">
                                <div class="font-outfit font-bold text-slate-500 uppercase font-black mb-1">En GeoJSON</div>
                                <div class="font-outfit font-bold ${l} text-sm">${u?`#`+u:`(Nulo)`}</div>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                        <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Sector</div>${d}</div>
                        <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Nodo</div>${f}</div>
                    </div>
                </div>
            </div>
            <div class="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-5 border border-slate-200 dark:border-slate-700/50">
                <h4 class="text-[10px] uppercase font-black text-brand-purple tracking-widest flex items-center gap-2 mb-4">Datos Operativos</h4>
                <div class="space-y-3">
                    <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Encuestador de Campo</div>${p}</div>
                    <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Documento ID</div>${m}</div>
                    <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Fecha y Hora de Carga</div>${h}</div>
                    <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Estatus del Registro</div>${g}</div>
                    <div class="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                        <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Duración Real</div>${_}</div>
                        <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Control Nro.</div>${v}</div>
                    </div>
                    <div class="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                        <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Nro. Línea</div>${y}</div>
                        <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Nro. Serie</div>${b}</div>
                    </div>
                </div>
            </div>

            ${x}

            <div class="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-5 border border-slate-200 dark:border-slate-700/50">
                <h4 class="text-[10px] uppercase font-black text-brand-emerald tracking-widest flex items-center gap-2 mb-4">Resultados / Tipología</h4>
                <div class="space-y-3">
                    <div class="grid grid-cols-2 gap-2 pb-2 border-b border-slate-200 dark:border-slate-700">
                        <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Nro. Hogares</div>${S}</div>
                        <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Nro. Personas</div>${C}</div>
                    </div>
                    <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Condición de Ocupación</div>${w}</div>
                    <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Uso Estructural</div>${T}</div>
                    <div class="pt-2 border-t border-slate-200 dark:border-slate-700">
                        <div class="text-[10px] text-slate-500 font-bold uppercase mb-1">Distancia calc. al segmento</div>
                        ${E}
                    </div>
                    <div class="pt-2 border-t border-slate-200 dark:border-slate-700">
                        <div class="flex items-center gap-1.5 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${D?`#EF4444`:`#10B981`}" stroke-width="2.5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                            <span class="text-[10px] text-slate-500 font-bold uppercase">${D?`Alertas (${P.length})`:`Sin Alertas`}</span>
                        </div>
                        ${O}
                    </div>
                </div>
            </div>
        </div>
        ${F}
    `}function Ne(e,t){return!e||e.length===0?`<span class="text-[10px] font-bold text-brand-emerald">✔ Encuesta dentro de parámetros normales</span>`:e.map(e=>{let n=S[e];if(!n)return``;let r=``;return e===`LINEA_SERIE_INVALIDA`&&(r=`<div class="mt-1 px-2 py-1 bg-red-100 dark:bg-red-900/30 rounded text-[9px] font-mono text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800/50">
                <b>Error de Datos:</b> ${t._ls_key_reported||`—`}
            </div>`),`<div class="mb-2 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rounded-lg">
            <div class="text-[10px] font-black text-brand-red mb-0.5">⚠ ${n.label}</div>
            <div class="text-[9px] text-slate-500 dark:text-slate-400 leading-tight">${n.detail.replace(/\n/g,` `).trim()}</div>
            ${r}
        </div>`}).join(``)}function Pe(e){let{m:t,rawControl:n,rawSerie:r,rawLinea:i,_padM:a,hasCtrlIndex:o,ctrlEntry:s,ctrlKey:c}=e,l=o?``:`<div class="mt-2 text-[9px] text-slate-400 bg-slate-100 dark:bg-slate-800 rounded px-2 py-1.5 text-center">⚠ Índice de controles no cargado aún</div>`,u=o&&!s?`<div class="mt-2 px-2 py-1.5 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/30 rounded text-[9px] text-red-700 dark:text-red-300 text-center">Clave <b class="font-mono">${c}</b><br>no existe en CONTROLES.geojson</div>`:``;return`<div class="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-5 border border-slate-200 dark:border-slate-700/50">
        <h4 class="text-[10px] uppercase font-black text-[#EA580C] tracking-widest flex items-center gap-2 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 20H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h.5"/><path d="M13 20h3a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-.5"/><rect x="9" y="2" width="6" height="4" rx="1"/><path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L15 9"/></svg>
            Control, Serie y Línea
        </h4>
        <div class="space-y-3">
            <div class="grid grid-cols-3 gap-1.5">
                <div class="text-center p-2 rounded-lg border ${t._ls_ctrl_ok?`bg-indigo-50/50 dark:bg-indigo-900/10 border-indigo-200 dark:border-indigo-800`:`bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/50`}">
                    <div class="text-[8px] uppercase ${t._ls_ctrl_ok?`text-indigo-400`:`text-red-400`} font-black mb-1">Control</div>
                    <div class="flex items-center justify-center gap-1">
                        <span class="font-mono font-black text-xs ${t._ls_ctrl_ok?`text-slate-700 dark:text-slate-200`:`text-red-700 dark:text-red-300`}">${a(n,4)}</span>
                        ${t._ls_ctrl_ok?`<svg class="text-emerald-500" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`:`<svg class="text-red-500" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`}
                    </div>
                </div>
                <!-- Similares para Serie y Línea omitidos por brevedad pero incluidos en la versión completa -->
                <div class="text-center p-2 rounded-lg border ${t._ls_serie_ok?`bg-indigo-50/50 dark:bg-indigo-900/10 border-indigo-200 dark:border-indigo-800`:`bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/50`}">
                    <div class="text-[8px] uppercase ${t._ls_serie_ok?`text-indigo-400`:`text-red-400`} font-black mb-1">Serie</div>
                    <div class="flex items-center justify-center gap-1">
                        <span class="font-mono font-black text-xs ${t._ls_serie_ok?`text-slate-700 dark:text-slate-200`:`text-red-700 dark:text-red-300`}">${a(r,2)}</span>
                        ${t._ls_serie_ok?`<svg class="text-emerald-500" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`:`<svg class="text-red-500" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`}
                    </div>
                </div>
                <div class="text-center p-2 rounded-lg border ${t._ls_linea_ok?`bg-indigo-50/50 dark:bg-indigo-900/10 border-indigo-200 dark:border-indigo-800`:`bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/50`}">
                    <div class="text-[8px] uppercase ${t._ls_linea_ok?`text-indigo-400`:`text-red-400`} font-black mb-1">Línea</div>
                    <div class="flex items-center justify-center gap-1">
                        <span class="font-mono font-black text-xs ${t._ls_linea_ok?`text-slate-700 dark:text-slate-200`:`text-red-700 dark:text-red-300`}">${a(i,3)}</span>
                        ${t._ls_linea_ok?`<svg class="text-emerald-500" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`:`<svg class="text-red-500" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`}
                    </div>
                </div>
            </div>
            ${l}
            ${u}
        </div>
    </div>`}function Fe(e){return`<details class="mt-3 text-sm text-slate-400 group">
        <summary class="cursor-pointer font-bold text-[10px] uppercase tracking-widest flex items-center gap-2">Ver JSON crudo</summary>
        <pre class="text-[10px] bg-slate-100 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 p-2 rounded-lg mt-2 overflow-x-auto text-slate-700 dark:text-slate-300 font-mono">${JSON.stringify(e,null,2)}</pre>
    </details>`}function Ie(e){let{cod:t,mun:n,par:r,declaredSeg:i,actualSeg:a,featureLabel:o,displayId:s,color:c,isCurrent:l,isActual:u}=e,d=[l?`<span style="background:#FBBF2433;color:#FBBF24;border:1px solid #FBBF2466;padding:1px 6px;border-radius:4px;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.05em">Declarado</span>`:``,u&&!l?`<span style="background:#10B98133;color:#10B981;border:1px solid #10B98166;padding:1px 6px;border-radius:4px;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.05em">Calculado GPS</span>`:``,u&&l?`<span style="background:#10B98133;color:#10B981;border:1px solid #10B98166;padding:1px 6px;border-radius:4px;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.05em">✔ Coincide</span>`:``].filter(Boolean).join(` `);return`
        <div class="dark:text-slate-200" style="font-family:'Inter',sans-serif;min-width:180px;max-width:240px;padding:2px">
            <div class="dark:border-slate-700" style="font-family:'Outfit',sans-serif;font-weight:900;font-size:12px;color:#6366f1;border-bottom:1px solid #e2e8f0;padding-bottom:6px;margin-bottom:8px">
                ${o} <span class="text-slate-800 dark:text-white" style="font-size:15px;">#${s}</span>
            </div>
            ${d?`<div style="margin-bottom:8px;display:flex;gap:4px;flex-wrap:wrap">${d}</div>`:``}
            <div style="font-size:10px;margin-bottom:3px" class="text-slate-500 dark:text-slate-400"><b>Municipio:</b> ${n}</div>
            <div style="font-size:10px;" class="text-slate-500 dark:text-slate-400"><b>Parroquia:</b> ${r}</div>
        </div>`}function Le(e,t,n,r,i,a){return`<div class="font-inter p-1 w-52">
        <div class="font-outfit font-black text-xs uppercase tracking-widest border-b border-slate-200 pb-1 mb-2" style="color:${t}">${e}</div>
        <div class="flex justify-between items-center text-[10px] mb-1"><span class="font-bold text-slate-500">Coordenada:</span><span class="font-mono text-slate-700">${n.lat.toFixed(5)}, ${n.lng.toFixed(5)}</span></div>
        <div class="flex justify-between items-center text-[10px] mb-1"><span class="font-bold text-slate-500">Precisión GPS:</span><span class="font-mono font-bold">${r}</span></div>
        <div class="flex justify-between items-center text-[10px] mb-1"><span class="font-bold text-slate-500">Altitud Nivel Mar:</span><span class="font-mono text-slate-700">${i}</span></div>
        <div class="flex justify-between items-center text-[10px] border-t border-slate-100 pt-1 mt-1"><span class="font-bold text-slate-500">Hora de Captura:</span><span class="font-mono text-brand-purple font-bold">${a}</span></div>
    </div>`}var Re=c((()=>{h()}));function ze(e){let{displayLat:t,displayLng:n,declaredSeg:r,actualSeg:i,ptStart:a,ptIni:o,ptFin:s,ptMain:c,isFlagged:u}=e;if(l.detailMiniMapObj)l.detailMiniMapObj.setView([t,n],16),l.detailMiniMapObj.eachLayer(e=>{e instanceof L.TileLayer||l.detailMiniMapObj.removeLayer(e)});else{l.detailMiniMapObj=L.map(`detailMap`,{zoomControl:!1}).setView([t,n],16);let e=L.tileLayer(`https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}`,{maxZoom:20,subdomains:[`mt0`,`mt1`,`mt2`,`mt3`],attribution:`&copy; Google`}),r=L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,{attribution:`&copy; OpenStreetMap contributors`});e.addTo(l.detailMiniMapObj),L.control.layers({"Google Satélite":e,OpenStreetMap:r},null,{position:`topright`}).addTo(l.detailMiniMapObj)}l.geoJSONData&&L.geoJSON(l.geoJSONData,{style:e=>{let t=String(e.properties.cod_seg||`0`),n=String(e.properties.cod_seg)===String(r),i=_[t.split(``).reduce((e,t)=>e+t.charCodeAt(0),0)%_.length];return{color:n?`#FBBF24`:i,weight:n?2.5:1.5,opacity:.9,fillColor:n?`#FBBF24`:i,fillOpacity:n?.35:.15}},onEachFeature:(e,t)=>{let n=e.properties||{},a=n.cod_seg||n.id||`N/A`,o=n.cod_munici||n.mun||`N/A`,s=n.cod_parroq||n.par||`N/A`,c=String(a)===String(r),l=String(a)===String(i),u=String(a)===`000`||String(a)===`0`,d=Ie({cod:a,mun:o,par:s,declaredSeg:r,actualSeg:i,featureLabel:u?`Sector`:`Segmento`,displayId:u?n.cod_sc||`000`:a,isCurrent:c,isActual:l});t.bindPopup(d,{className:`custom-popup`,maxWidth:260}),t.on(`mouseover`,function(){this.setStyle({fillOpacity:.45,weight:2.5})}),t.on(`mouseout`,function(){let e=String(this.feature.properties.cod_seg);this.setStyle({fillOpacity:e===String(r)?.35:.15,weight:e===String(r)?2.5:1.5})})}}).addTo(l.detailMiniMapObj);let d=[],f=[],p=(e,t,n,r,i)=>{if(!e)return;let a=e.acc?`<span class="text-brand-emerald">± ${e.acc}m</span>`:`<span class="text-slate-500">N/A</span>`,o=e.alt?`${e.alt}m s.n.m.`:`N/A`,s=r===`start`?i.start:i.end,c=s?new Date(s).toLocaleTimeString():`N/A`,u=L.divIcon({className:`custom-minimap-marker`,html:`<div style="background-color:${t};width:14px;height:14px;border-radius:50%;border:2px solid white;box-shadow:0 0 10px ${t};"></div>`,iconSize:[14,14],iconAnchor:[7,7]}),p=Le(n,t,e,a,o,c);L.marker([e.lat,e.lng],{icon:u}).addTo(l.detailMiniMapObj).bindPopup(p,{className:`custom-popup-enrich`}),d.push([e.lat,e.lng]),f.push([e.lat,e.lng])},{rec:m}=e;a&&p(a,`#3B82F6`,`Apertura de la Encuesta`,`start`,m),o&&p(o,`#10B981`,`Confirmación Inicial`,`start`,m),s&&p(s,`#F59E0B`,`Cierre de Encuesta`,`end`,m),!a&&!o&&!s&&c&&p(c,u?`#EF4444`:`#10B981`,`Ubicación Registrada`,`end`,m),f.length>1&&L.polyline(f,{color:`#94a3b8`,dashArray:`4, 4`,weight:2,opacity:.6}).addTo(l.detailMiniMapObj);let h=o||c;if(h){let e=u?`#EF4444`:`#10B981`;L.circle([h.lat,h.lng],{radius:500,color:e,fillColor:e,fillOpacity:.05,weight:1.5,dashArray:`6,5`,interactive:!1}).addTo(l.detailMiniMapObj)}if(d.length>0){let e=L.latLngBounds(d);d.length===1&&!u?l.detailMiniMapObj.setView(d[0],16):l.detailMiniMapObj.fitBounds(e,{padding:[40,40],maxZoom:18})}l.detailMiniMapObj.invalidateSize()}var Be=c((()=>{m(),h(),Re()}));function W(e){let t=s(`detailModal`),n=s(`detailModalBody`);if(!t||!n||!e)return;let r={stEntidad:H(V(e,`S1/ent`)||V(e,`ent`)),stMpio:H(V(e,`mun`)),stParr:H(V(e,`par`)),stSect:H(V(e,`sector`)||V(e,`S1/sector`)||V(e,`S1/group_segmeto_sector/sector`)),stNodo:H(V(e,`nodo`)),stEncuestador:H(V(e,`nombre`)||V(e,`S0/s0_nombreapellido`)),stCedula:H(V(e,`cedula`)||V(e,`S0/cedula_encuestador`)),stFecha:H(V(e,`fecha`)||V(e,`today/_submission_time`)),stDur:H(V(e,`durMin`)?`${V(e,`durMin`)} min`:null),declaredSeg:V(e,`segmento`)||V(e,`S1/segmento`)||V(e,`S1/group_segmeto_sector/segmento`),actualSeg:V(e,`actual_seg`),rawControl:String(V(e,`group_sh53u78/control`)||V(e,`control`)||``),rawSerie:String(V(e,`n_serie`)||``),rawLinea:String(V(e,`n_linea`)||``),stHogares:H(V(e,`hogares`)||V(e,`datos_hogar/hogar_count`)||V(e,`lista_hogar_count`)),stPers:H(V(e,`totalPers`)||V(e,`datos_hogar/hogar.integrantes_hogar`)),stUso:H(V(e,`uso`)||V(e,`S1/Uso_de_la_Unidad_inmobiliaria`)),stCond:H(V(e,`condicion`)||V(e,`Condici_n_de_ocupaci_n/condicion_de_ocupacion`)),alertas:e._meta?.alertas||[],hasAlerts:e._meta?.hasAlerts||!1,isFlagged:e._meta?.flag_distance_gt_500,durMin:V(e,`durMin`),rawDist:V(e,`distance_m`),m:e._meta||{}};r.isRural=r.declaredSeg===`000`||r.declaredSeg===`0`,r.valHeader=r.isRural?`Validación de Sector`:`Validación de Segmento`,r.valLeftLabel=r.isRural?`Sector Declarado`:`Declarado`,r.valLeftVal=r.isRural?V(e,`sector`)||V(e,`S1/sector`)||`000`:r.declaredSeg||`N/A`,r.stControl=H(r.rawControl||null),r.stLinea=H(r.rawLinea||null),r.stSerie=H(r.rawSerie||null),r.stEstado=r.m.estado===`completada`?`<span class="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest bg-brand-green/20 text-brand-green border border-brand-green/30">Completada (Efectiva)</span>`:`<span class="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest bg-brand-orange/20 text-brand-orange border border-brand-orange/30">No Respuesta / Error</span>`,r.stDist=r.rawDist===null?`<span class="text-slate-500 font-medium italic">N/A</span>`:`<span class="font-outfit font-black ${r.isFlagged?`text-brand-red`:`text-brand-emerald`}">${Math.round(r.rawDist)} m</span>`;let i=Ae(r.rawControl,r.rawSerie,r.rawLinea),a=l.controlsIndex instanceof Map?l.controlsIndex.get(i):null,c=l.controlsIndex instanceof Map&&l.controlsIndex.size>0;r.ctrlPanelHtml=Pe({m:r.m,rawControl:r.rawControl,rawSerie:r.rawSerie,rawLinea:r.rawLinea,_padM:ke,hasCtrlIndex:c,ctrlEntry:a,ctrlKey:i});let u=U(e[`start-geopoint`]),d=U(e[`group_sh53u78/ubicacion_i`]||e.ubicacion_i),f=U(e[`ubicacion_final/ubicacion_f`]||e.ubicacion_f),p=e.lat||r.m.lat||(e._geolocation?e._geolocation[0]:null),m=e.lng||r.m.lng||(e._geolocation?e._geolocation[1]:null),h=p&&m?{lat:parseFloat(p),lng:parseFloat(m)}:null;if(r.walkedDistance=d&&f?Oe(d,f):null,r.hasMapData=u||d||f||h,r.segmentMatchStatus=!r.valLeftVal||!r.actualSeg?`<i data-lucide="minus" class="text-slate-400 w-4 h-4"></i>`:o(r.valLeftVal,r.actualSeg)?`<i data-lucide="check" class="text-brand-emerald w-5 h-5"></i>`:`<i data-lucide="x" class="text-brand-red w-5 h-5"></i>`,r.actualSegClasses=r.actualSeg&&!o(r.valLeftVal,r.actualSeg)?`bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800/30`:`bg-slate-100 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700`,r.actualSegText=r.actualSeg&&!o(r.valLeftVal,r.actualSeg)?`text-brand-red`:`text-slate-800 dark:text-slate-200`,r.alertsHtml=Ne(r.alertas,r.m),n.innerHTML=Me(r)+Fe(e),window.lucide&&lucide.createIcons({root:n}),l.lastFocused=document.activeElement,t.classList.remove(`hidden`),window.innerWidth<768){let e=s(`detailModalPane`);e&&e.classList.contains(`max-w-7xl`)&&typeof window.toggleDetailModalExpand==`function`&&window.toggleDetailModalExpand()}setTimeout(()=>{t.querySelector(`#detailModalPane`)?.classList.remove(`scale-95`,`opacity-0`)},10),r.hasMapData&&setTimeout(()=>{ze({displayLat:h?h.lat:d?d.lat:u?u.lat:f.lat,displayLng:h?h.lng:d?d.lng:u?u.lng:f.lng,declaredSeg:r.declaredSeg,actualSeg:r.actualSeg,ptStart:u,ptIni:d,ptFin:f,ptMain:h,isFlagged:r.isFlagged,rec:e})},300)}function Ve(){let e=s(`detailModal`);e&&(e.querySelector(`#detailModalPane`)?.classList.add(`scale-95`,`opacity-0`),setTimeout(()=>{e.classList.add(`hidden`);let t=s(`detailModalPane`),n=s(`detailModalExpandIcon`),r=s(`detailModalBody`);if(t?.classList.contains(`max-w-none`)&&(t.classList.remove(`w-full`,`max-w-none`,`h-full`,`rounded-none`),t.classList.add(`max-w-7xl`,`w-11/12`,`rounded-2xl`,`p-0`),n&&n.setAttribute(`data-lucide`,`maximize`),r&&(r.classList.remove(`flex-1`,`max-h-none`),r.classList.add(`max-h-[75vh]`))),l.detailMiniMapObj&&=(l.detailMiniMapObj.remove(),null),l.lastFocused?.focus)try{l.lastFocused.focus()}catch{}},300))}var G=c((()=>{m(),e(),je(),Re(),Be(),window.toggleDetailModalExpand=function(){let e=s(`detailModalPane`),t=s(`detailModalExpandIcon`),n=s(`detailMapWrapper`),r=s(`detailModalBody`);!e||!t||(e.classList.contains(`max-w-7xl`)?(e.classList.remove(`max-w-7xl`,`w-11/12`,`rounded-2xl`,`p-0`),e.classList.add(`w-full`,`max-w-none`,`h-full`,`rounded-none`),t.setAttribute(`data-lucide`,`minimize`),n&&(n.classList.remove(`h-48`,`sm:h-64`,`md:h-96`),n.classList.add(`h-[60vh]`,`md:h-[75vh]`)),r&&(r.classList.remove(`max-h-[75vh]`),r.classList.add(`flex-1`,`max-h-none`))):(e.classList.remove(`w-full`,`max-w-none`,`h-full`,`rounded-none`),e.classList.add(`max-w-7xl`,`w-11/12`,`rounded-2xl`,`p-0`),t.setAttribute(`data-lucide`,`maximize`),n&&(n.classList.remove(`h-[60vh]`,`md:h-[75vh]`),n.classList.add(`h-48`,`sm:h-64`,`md:h-96`)),r&&(r.classList.remove(`flex-1`,`max-h-none`),r.classList.add(`max-h-[75vh]`))),window.lucide&&window.lucide.createIcons(),l.detailMiniMapObj&&setTimeout(()=>l.detailMiniMapObj.invalidateSize(),350))},window.viewTraceByRecord=function(e){let t=l.rawData.find(t=>t._uuid===e||t.uuid===e);t?W(t):console.warn(`[Modal] Registro con UUID ${e} no encontrado.`)},window.closeDetailModal=Ve})),He,Ue,We,Ge,Ke,qe,Je=c((()=>{h(),He=e=>{let t=e.getValue();return`<span style="color:${t===`completada`?`#10B981`:`#F59E0B`};font-weight:700;font-size:10px;letter-spacing:0.02em">${t===`completada`?`EFECTIVA`:`NO RESPUESTA`}</span>`},Ue=e=>{let t=e.getValue();return t===null?`—`:`<span style="color:${t<15?`#EF4444`:t<25?`#F59E0B`:`#10B981`};font-weight:800;font-family:Outfit,sans-serif;">${t}m</span>`},We=e=>{let t=e.getValue();return!t||t.length===0?`<span style="color:var(--text-muted);font-size:10px">—</span>`:t.map(e=>{let t=S[e],n=t?t.label:e;return`<span title="${t?t.detail.replace(/\n/g,` `):``}" style="display:inline-flex;align-items:center;gap:3px;background:rgba(239,68,68,0.15);color:#EF4444;border:1px solid rgba(239,68,68,0.3);border-radius:4px;padding:1px 5px;font-size:9px;font-weight:700;letter-spacing:0.02em;margin-right:3px;white-space:nowrap;">⚠ ${n}</span>`}).join(``)},Ge=e=>{let t=e.getData(),n=f.has(t.cedula)?`<span style="background:#3B82F6;color:white;font-size:8px;font-weight:900;padding:1px 4px;border-radius:4px;margin-left:6px;vertical-align:middle;">INE</span>`:``;return`<div><div style="font-weight:800;color:currentColor;font-size:12px;line-height:1.3;">${t.nombre||`Sin Nombre`}${n}</div><div style="font-size:9px;color:#94a3b8;font-weight:600;">${t.cedula||`N/A`}</div></div>`},Ke=e=>{let t=e.getValue(),n=t>=80?`#10B981`:t>=50?`#F59E0B`:`#EF4444`;return`<div style="display:flex;flex-direction:column;align-items:center;gap:3px;padding:4px 0">
        <span style="font-weight:900;color:${n};font-size:15px;">${t}%</span>
        <div style="width:100%;max-width:80px;height:6px;background:rgba(0,0,0,0.05);border-radius:10px;overflow:hidden">
            <div style="width:${t}%;height:100%;background:${n};border-radius:10px;"></div>
        </div>
    </div>`},qe=()=>`
    <div class="flex gap-2">
        <button class="tab-action-btn btn-view" data-action="view">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
            <span>VER</span>
        </button>
    </div>
`}));function Ye(e=[]){l.detailTable||(l.detailTable=new Tabulator(`#detailGrid`,{data:e,layout:`fitColumns`,height:`100%`,pagination:!0,paginationSize:25,paginationSizeSelector:[10,25,50,100],movableColumns:!0,responsiveLayout:`collapse`,clipboard:!0,placeholder:`<div style="padding:40px;text-align:center;color:var(--text-muted);font-size:14px;font-family:Inter,sans-serif;">Cargando base de datos...</div>`,columnHeaderVertAlign:`bottom`,columns:[{formatter:`responsiveCollapse`,width:30,minWidth:30,hozAlign:`center`,headerSort:!1,resizable:!1,responsive:0},{title:`Identificación`,frozen:!0,columns:[{title:`Cédula`,field:`cedula`,headerFilter:`input`,minWidth:90,responsive:0},{title:`Nombre`,field:`nombre`,headerFilter:`input`,minWidth:140,responsive:0},{title:`Control`,field:`control`,headerFilter:`input`,width:90,responsive:0}]},{title:`Contexto`,columns:[{title:`Fecha`,field:`fecha`,headerFilter:`input`,width:90,sorter:`date`,responsive:1},{title:`Municipio`,field:`mun`,headerFilter:`input`,width:90,responsive:2},{title:`Parroquia`,field:`par`,headerFilter:`input`,width:90,responsive:4},{title:`Segm.`,field:`segmento`,headerFilter:`input`,width:70,hozAlign:`center`,responsive:4},{title:`Sect.`,field:`sector`,headerFilter:`input`,width:70,hozAlign:`center`,responsive:4}]},{title:`Métricas`,columns:[{title:`Estado`,field:`estado`,width:100,responsive:0,formatter:He,headerFilter:`list`,headerFilterParams:{valuesLookup:!0,clearable:!0}},{title:`Dur.`,field:`durMin`,width:70,hozAlign:`center`,responsive:2,formatter:Ue},{title:`Alertas`,field:`alertas`,minWidth:160,headerSort:!1,responsive:2,formatter:We}]},{title:`Social`,columns:[{title:`Hog.`,field:`hogares`,width:50,hozAlign:`center`,responsive:4},{title:`Pers.`,field:`personas`,width:50,hozAlign:`center`,responsive:4}]},{title:`Acciones`,width:120,headerSort:!1,hozAlign:`center`,responsive:0,formatter:qe,cellClick:(e,t)=>{e.stopPropagation();let n=e.target.closest(`button`);if(!n)return;let r=t.getData()._rec;r&&n.dataset.action===`view`&&W(r)}}],rowFormatter:e=>{let t=e.getData();t.estado===`completada`?e.getElement().classList.add(`row-complete`):t.estado===`no_respuesta`&&e.getElement().classList.add(`row-no-respuesta`),t.hasAlerts&&e.getElement().classList.add(`row-flagged`)}}),l.detailTable.on(`rowClick`,(e,t)=>{let n=t.getData()._rec;n&&W(n)}))}function Xe(e=l.filtered){let t=e.map(e=>{let t=e._meta||{};return{_rec:e,id:t.control||e._uuid,cedula:t.cedula||``,nombre:t.nombre||``,control:t.control||``,fecha:t.fecha||``,mun:t.mun||``,par:t.par||``,nodo:t.nodo||``,segmento:t.segmento||``,sector:t.sector||``,estado:t.estado||``,durMin:t.durMin,alertas:t.alertas||[],hasAlerts:t.hasAlerts||!1,hogares:t.hogares||0,personas:t.totalPers||0}});if(!l.detailTable)Ye(t);else try{l.detailTable.setData(t)}catch(e){console.warn(`Tabulator setData delayed:`,e.message),setTimeout(()=>l.detailTable&&l.detailTable.setData(t),100)}}var Ze=c((()=>{m(),h(),G(),Je()}));function Qe(e){if(console.log(`table.js: renderRankingTable() initializing leaderboard...`),typeof Tabulator>`u`){console.error(`table.js: CRITICAL - Tabulator library is NOT loaded.`);return}if(!document.querySelector(`#rankingTable`))return;if(!e){if(!l.filtered||!l.encMap)return;let t=l.filtered.filter(e=>e&&e._meta),n=new Set(t.map(e=>e._meta.cedula));e=Object.values(l.encMap).filter(e=>n.has(e.cedula));let r={encuestas:(e,t)=>(t.encuestas||0)-(e.encuestas||0),completadas:(e,t)=>(t.completadas||0)-(e.completadas||0),eficiencia:(e,t)=>(t.pctCompleta||0)-(e.pctCompleta||0),personas:(e,t)=>(t.personas||0)-(e.personas||0)};e.sort(r[l.currentSort]||r.eficiencia)}let t=e.map((e,t)=>({pos:t+1,nombre:e.nombre||`Sin Nombre`,cedula:e.cedula||`N/A`,encuestas:e.encuestas||0,completadas:e.completadas||0,pctCompleta:e.pctCompleta||0,personas:e.personas||0}));l.rankingTabulator?l.rankingTabulator.setData(t).then(()=>{l.rankingTabulator.redraw(!0)}):(l.rankingTabulator=new Tabulator(`#rankingTable`,{data:t,layout:`fitColumns`,height:`420px`,responsiveLayout:`collapse`,persistence:!1,placeholder:`<div style="padding:40px;text-align:center;color:#64748b;font-size:13px;font-family:Inter,sans-serif;">Sin datos disponibles</div>`,initialSort:[{column:`pctCompleta`,dir:`desc`}],columns:[{formatter:`responsiveCollapse`,width:30,minWidth:30,hozAlign:`center`,headerSort:!1,resizable:!1,responsive:0},{title:`#`,field:`pos`,width:55,hozAlign:`center`,headerSort:!1,frozen:!0,responsive:0,formatter:e=>`<span style="color:#64748b;font-weight:800;font-size:12px;">${e.getValue()}</span>`},{title:`Encuestador`,field:`nombre`,minWidth:140,frozen:!0,responsive:0,formatter:Ge},{title:`Volumen`,field:`encuestas`,hozAlign:`center`,width:90,sorter:`number`,responsive:0,formatter:e=>`<span style="font-weight:800;color:#3B82F6;font-size:14px">${e.getValue()}</span>`},{title:`% Efectividad`,field:`pctCompleta`,hozAlign:`center`,minWidth:120,sorter:`number`,responsive:0,formatter:Ke},{title:`Pers.`,field:`personas`,hozAlign:`center`,width:70,sorter:`number`,responsive:2,formatter:e=>`<span style="font-weight:600;color:#64748b">${e.getValue()}</span>`}]}),l.rankingTabulator.on(`rowClick`,(e,t)=>{let n=t.getData().cedula,r=document.getElementById(`filterEncuestador`);n&&r&&(r.value=n,typeof C==`function`&&C())}))}var $e=c((()=>{m(),B(),Je()})),et=c((()=>{Ze(),$e(),Je()}));function tt(e,t,n,r){return`<div class="p-2 font-sans">
        <div class="text-[10px] uppercase font-bold text-slate-500 mb-1">${e}</div>
        <div class="text-sm font-bold flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full" style="background:${n}"></span>
            <span class="text-slate-800 dark:text-white">${t}</span>
        </div>
        <div class="space-y-2 mt-3 pt-2 border-t border-slate-100 dark:border-white/5">
            <div class="flex justify-between items-center">
                <div class="text-[8px] uppercase text-slate-400 font-bold">Municipio</div>
                <div class="text-[10px] font-semibold text-slate-700 dark:text-slate-300">${r.cod_munici||`—`}</div>
            </div>
            <div class="flex justify-between items-center">
                <div class="text-[8px] uppercase text-slate-400 font-bold">Parroquia</div>
                <div class="text-[10px] font-semibold text-slate-700 dark:text-slate-300">${r.cod_parroq||`—`}</div>
            </div>
        </div>
    </div>`}function nt(e){return`<div style="font-family:Inter,sans-serif;font-size:11px;line-height:1.5">
        <b>Control ${e.CONTROL}</b> · Serie ${e.SERIE}<br>
        Línea ${e.LINEA} · Seg ${e.COD_SEG} · Manz ${e.COD_MANZA}
    </div>`}function rt(e,t,n,r,i,a,o,s){let c=a&&a.length>0,l=e.segmento||e.sector||e.manzana||e.parcela||e.edificacion||e.direccion?`
        <div class="border-t border-slate-100 dark:border-white/5 pt-3 mb-3">
            <div class="flex items-center gap-1.5 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                <span class="text-[8px] uppercase font-bold text-sky-600 dark:text-sky-400 tracking-wider">Datos del Segmento</span>
            </div>
            <div class="grid grid-cols-3 gap-2 mb-2">
                <div><div class="text-[8px] uppercase text-slate-400 dark:text-slate-500 font-bold">Segmento</div><div class="text-[10px] font-bold text-sky-600 dark:text-sky-300">${e.segmento||`—`}</div></div>
                <div><div class="text-[8px] uppercase text-slate-400 dark:text-slate-500 font-bold">Sector</div><div class="text-[10px] font-bold text-slate-800 dark:text-white">${e.sector||`—`}</div></div>
                <div><div class="text-[8px] uppercase text-slate-400 dark:text-slate-500 font-bold">Manzana</div><div class="text-[10px] font-bold text-slate-800 dark:text-white">${e.manzana||`—`}</div></div>
            </div>
            <div class="grid grid-cols-3 gap-2">
                <div><div class="text-[8px] uppercase text-slate-400 dark:text-slate-500 font-bold">Parcela</div><div class="text-[10px] font-bold text-slate-800 dark:text-white">${e.parcela||`—`}</div></div>
                <div><div class="text-[8px] uppercase text-slate-400 dark:text-slate-500 font-bold">Edificación</div><div class="text-[10px] font-bold text-slate-800 dark:text-white">${e.edificacion||`—`}</div></div>
                <div><div class="text-[8px] uppercase text-slate-400 dark:text-slate-500 font-bold">Lado Manz.</div><div class="text-[10px] font-bold text-slate-800 dark:text-white">${e.lado_manz||`—`}</div></div>
            </div>
            ${e.direccion?`<div class="mt-2"><div class="text-[8px] uppercase text-slate-400 dark:text-slate-500 font-bold">Dirección / Sector</div><div class="text-[10px] font-semibold text-slate-600 dark:text-slate-300 leading-tight">${e.direccion}</div></div>`:``}
        </div>`:``;return`
        <div class="p-4 min-w-[280px] bg-white dark:bg-[#0f172a] text-slate-600 dark:text-slate-200 rounded-xl shadow-2xl border border-slate-100 dark:border-white/5" style="font-family:'Inter',sans-serif">
            <div class="flex justify-between items-center mb-3">
                <span class="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Encuestador</span>
                <span class="px-2 py-0.5 rounded-md text-[9px] font-bold text-white shadow-sm" style="background:${n}">${i}</span>
            </div>
            <div class="font-bold text-sm text-slate-900 dark:text-white mb-0.5">${e.nombre}</div>
            <div class="text-[10px] text-slate-500 dark:text-slate-400 mb-3">${e.fecha} · ${e.cedula}</div>
            
            <div class="border-t border-slate-100 dark:border-white/5 pt-3 mb-3">
                <div class="flex justify-between gap-4 mb-2">
                    <div class="flex-1">
                        <div class="text-[8px] uppercase text-slate-400 dark:text-slate-500 font-bold">Municipio</div>
                        <div class="text-[10px] font-bold text-slate-800 dark:text-white">${e.mun}</div>
                    </div>
                    <div class="flex-1 text-right">
                        <div class="text-[8px] uppercase text-slate-400 dark:text-slate-500 font-bold">Parroquia</div>
                        <div class="text-[10px] font-bold text-slate-800 dark:text-white">${e.par||`—`}</div>
                    </div>
                </div>
                <div class="flex justify-between items-center">
                    <div>
                        <div class="text-[8px] uppercase text-slate-400 dark:text-slate-500 font-bold">Nodo</div>
                        <div class="text-[10px] font-bold text-slate-800 dark:text-white">${e.nodo||`—`}</div>
                    </div>
                    <div class="text-right">
                        <div class="text-[8px] uppercase text-slate-400 dark:text-slate-500 font-bold">Uso</div>
                        <div class="text-[10px] font-bold text-slate-800 dark:text-white">${(e.uso||`—`).replace(/_/g,` `)}</div>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-2 gap-4 border-t border-slate-100 dark:border-white/5 pt-3 mb-3">
                <div>
                    <div class="text-[8px] uppercase text-slate-400 dark:text-slate-500 font-bold">Duración</div>
                    <div class="text-[10px] font-bold" style="color:${e.durMin!==null&&(e.durMin<15||e.durMin>45)?`#EF4444`:`#10B981`}">${o}</div>
                </div>
                <div class="text-right">
                    <div class="text-[8px] uppercase text-slate-400 dark:text-slate-500 font-bold">Distancia (A->I)</div>
                    <div class="text-[10px] font-bold" style="color:${c?`#EF4444`:`#64748b`}">${s}</div>
                </div>
            </div>

            ${c?`
            <div class="border-t border-red-500/10 dark:border-red-500/20 pt-3 mb-3">
                <div class="flex items-center gap-1.5 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2.5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                    <span class="text-[8px] uppercase font-bold text-red-500 dark:text-red-400 tracking-wider">Alertas Detectadas (${a.length})</span>
                </div>
                ${a.map(e=>{let t=S[e];return t?`<div class="mb-1 p-1 bg-red-500/5 dark:bg-red-500/10 border border-red-500/10 dark:border-red-500/20 rounded-lg flex items-center gap-2" title="${t.detail.replace(/\n/g,``).trim()}">
                        <div class="text-[9px] font-black text-red-500 dark:text-red-400">⚠ ${t.label}</div>
                    </div>`:``}).join(``)}
            </div>`:``}

            ${l}

            <div class="grid grid-cols-2 gap-2 border-t border-slate-100 dark:border-white/5 pt-3 mb-3">
                <div>
                    <div class="text-[8px] uppercase text-slate-400 dark:text-slate-500 font-bold">Desplazamiento</div>
                    <div class="text-[10px] font-bold" style="color:${e.dist_ini_fin!==null&&e.dist_ini_fin>30?`#F59E0B`:`#10B981`}">${e.dist_ini_fin===null?`—`:Math.round(e.dist_ini_fin)+` m`} <span class="text-[8px] text-slate-400 dark:text-slate-500">(Ini->Fin)</span></div>
                </div>
                <div class="flex items-end justify-end">
                    <button onclick="window.viewTraceByRecord('${t}')" class="px-3 py-1 bg-brand-blue/10 dark:bg-brand-blue/20 hover:bg-brand-blue/20 dark:hover:bg-brand-blue/40 border border-brand-blue/20 dark:border-brand-blue/30 text-brand-blue rounded-lg text-[9px] font-bold uppercase tracking-widest transition-colors flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><circle cx="10" cy="13" r="2"/><path d="m16 19-3.5-3.5"/></svg> Ficha de Inspección
                    </button>
                </div>
            </div>

            <div class="grid grid-cols-2 gap-2 border-t border-slate-100 dark:border-white/5 pt-3">
                <div>
                    <div class="text-[8px] uppercase text-slate-400 dark:text-slate-500 font-bold">Condición</div>
                    <div class="text-[10px] font-bold text-slate-800 dark:text-white">${(e.condicion||`—`).replace(/_/g,` `)}</div>
                </div>
                <div>
                    <div class="text-[8px] uppercase text-slate-400 dark:text-slate-500 font-bold">Hogares / Pers.</div>
                    <div class="text-[10px] font-bold text-slate-800 dark:text-white">${e.hogares} / ${e.totalPers}</div>
                </div>
            </div>
        </div>
    `}function it(e){return`<div style="
        width:22px;height:22px;border-radius:50%;
        background:#F97316;border:2px solid white;
        display:flex;align-items:center;justify-content:center;
        font-family:Inter,sans-serif;font-size:9px;font-weight:900;
        color:white;box-shadow:0 2px 6px rgba(0,0,0,0.4);
        cursor:pointer;
    ">${e}</div>`}function at(e,t,n,r){return`
        <div style="font-family:Inter,sans-serif;font-size:11px;line-height:1.6;padding:2px 4px">
            <b>#${e} · ${t}</b><br>
            ${n.nombre||`—`}<br>
            Ctrl: ${n.control?n.control.slice(-4):`—`} · L${n.n_linea||`—`}<br>
            Duración: ${r}
        </div>
    `}var ot=c((()=>{h()})),st,ct,lt,K,ut=c((()=>{st=`modulepreload`,ct=function(e,t){return new URL(e,t).href},lt={},K=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}r=o(t.map(t=>{if(t=ct(t,n),t in lt)return;lt[t]=!0;let r=t.endsWith(`.css`),i=r?`[rel="stylesheet"]`:``;if(n)for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${t}"]${i}`))return;let o=document.createElement(`link`);if(o.rel=r?`stylesheet`:st,r||(o.as=`script`),o.crossOrigin=``,o.href=t,a&&o.setAttribute(`nonce`,a),document.head.appendChild(o),r)return new Promise((e,n)=>{o.addEventListener(`load`,e),o.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})}}));async function dt(){if(!l.geoJSONData)try{let e=await fetch(`data/segmentos_monagas.geojson`);if(!e.ok)throw Error(`Error loading GeoJSON`);l.geoJSONData=await e.json();let{getPolygonBBox:t}=await K(async()=>{let{getPolygonBBox:e}=await import(`./helpers-CBT32SXN.js`).then(e=>(e.a(),e.i));return{getPolygonBBox:e}},[],import.meta.url);l.segmentBBoxes=l.geoJSONData.features.map(e=>{if(!e.geometry)return null;let n=[];return e.geometry.type===`Polygon`?n=e.geometry.coordinates[0]:e.geometry.type===`MultiPolygon`&&(n=e.geometry.coordinates.flatMap(e=>e[0])),n.length>0?{bbox:t(n),props:e.properties,feature:e}:null}).filter(e=>e!==null),ft()}catch(e){console.error(`FAILED TO LOAD GEOJSON:`,e)}}function ft(){if(!(!l.geoJSONData||!l.map||l.geoJSONLayer))try{l.geoJSONLayer=L.geoJSON(l.geoJSONData,{style:e=>{let t=e.properties,n=_[(`${t.cod_seg===`000`||t.cod_seg===`0`?t.cod_sc||`0`:t.cod_seg||`0`}`.split(``).reduce((e,t)=>e*31+t.charCodeAt(0),0)>>>0)*13%_.length];return{color:n,weight:2,opacity:.8,fillColor:n,fillOpacity:.15}},onEachFeature:(e,t)=>{let n=e.properties,r=n.cod_seg===`000`||n.cod_seg===`0`,i=_[(`${r?n.cod_sc||`0`:n.cod_seg||`0`}`.split(``).reduce((e,t)=>e*31+t.charCodeAt(0),0)>>>0)*13%_.length],a=r?`Sector`:`Segmento`,o=r?n.cod_sc||`N/A`:n.cod_seg||`N/A`;t.bindPopup(tt(a,o,i,n),{className:`custom-popup`}),t.on(`mouseover`,function(){this.setStyle({fillOpacity:.35,weight:3})}),t.on(`mouseout`,function(){this.setStyle({fillOpacity:.15,weight:2})})}}).addTo(l.map),l.layerControl&&l.layerControl.addOverlay(l.geoJSONLayer,`Segmentos Monagas`)}catch(e){console.error(`FAILED TO DRAW GEOJSON LAYER:`,e)}}async function pt(){if(!l.controlsIndex)try{let e=await fetch(`data/CONTROLES.geojson`);if(!e.ok)throw Error(`Error loading CONTROLES.geojson: ${e.status}`);l.controlsData=await e.json(),l.controlsIndex=new Map,l.validControls=new Set,l.validSeries=new Set,l.validLineas=new Set,l.controlDetails=new Map;let t=e=>{if(e==null)return null;let t=parseInt(String(e).trim(),10);return isNaN(t)?null:t};l.controlsData.features.forEach(e=>{let n=e.properties,r=t(n.LINEA),i=t(n.SERIE);if(r===null||i===null)return;let a=String(n.CONTROL||``).trim(),o=String(i),s=String(r);l.validControls.add(a),l.validSeries.add(o),l.validLineas.add(s),l.controlDetails.has(a)||l.controlDetails.set(a,{series:new Set,lineas:new Set}),l.controlDetails.get(a).series.add(o),l.controlDetails.get(a).lineas.add(s),l.controlsIndex.set(`${a}-${o}-${s}`,{COD_SEG:String(n.COD_SEG??``).trim(),COD_MANZA:String(n.COD_MANZA??``).trim()})}),l.map&&mt()}catch(e){console.error(`FAILED TO LOAD CONTROLES.geojson:`,e)}}function mt(){if(!(!l.controlsData||!l.map||l.controlsLayer))try{l.controlsLayer=L.geoJSON(l.controlsData,{pointToLayer:(e,t)=>L.circleMarker(t,{radius:4,fillColor:`#FACC15`,color:`#92400E`,weight:1,opacity:.9,fillOpacity:.7}),onEachFeature:(e,t)=>{t.bindTooltip(nt(e.properties),{sticky:!0,opacity:.95})}}),l.layerControl&&l.layerControl.addOverlay(l.controlsLayer,`📍 Puntos de Control`)}catch(e){console.error(`FAILED TO DRAW CONTROLS LAYER:`,e)}}var ht=c((()=>{m(),h(),ot(),ut()}));function gt(){if(l.map)return;let e=L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,{attribution:`&copy; OpenStreetMap contributors`}),t=L.tileLayer(`https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}`,{maxZoom:20,subdomains:[`mt0`,`mt1`,`mt2`,`mt3`],attribution:`&copy; Google`});l.map=L.map(`mapView`,{center:[10.4806,-66.8983],zoom:12,layers:[e],zoomControl:!1});let n={OpenStreetMap:e,"Google Satélite":t};l.layerControl=L.control.layers(n,{},{collapsed:window.innerWidth<768}).addTo(l.map),L.control.scale().addTo(l.map),l.markerCluster=L.markerClusterGroup({showCoverageOnHover:!1,zoomToBoundsOnClick:!0,spiderfyOnMaxZoom:!0}),l.map.addLayer(l.markerCluster),ft()}var _t=c((()=>{m(),ht()}));function vt(){l.agentRouteLayer&&=(l.map.removeLayer(l.agentRouteLayer),null)}function yt(e){if(vt(),!e||!l.map)return;let t=l.filtered.filter(t=>t._meta?.cedula===e&&t._meta.lat&&t._meta.lng).sort((e,t)=>new Date(e.start||0).getTime()-new Date(t.start||0).getTime());if(t.length===0)return;let n=s(`mapRouteAgentCount`);n&&(n.textContent=`${t.length} ptos`);let r=t.map(e=>[e._meta.lat,e._meta.lng]),i=[];i.push(L.polyline(r,{color:`#F97316`,weight:2.5,opacity:.85,dashArray:`6 4`})),t.forEach((e,t)=>{let n=e._meta,r=t+1,a=(e.start||``).slice(11,16)||`—`,o=n.durMin===null?`—`:`${Math.round(n.durMin)} min`,s=L.divIcon({className:``,html:it(r),iconSize:[22,22],iconAnchor:[11,11]}),c=L.marker([n.lat,n.lng],{icon:s});c.bindTooltip(at(r,a,n,o),{sticky:!0,opacity:.97}),c.on(`click`,()=>W(e)),i.push(c)}),l.agentRouteLayer=L.layerGroup(i).addTo(l.map);let a=L.latLngBounds(r);a.isValid()&&l.map.fitBounds(a,{padding:[60,60]})}function bt(){let e=document.getElementById(`filterEncuestador`),t=document.getElementById(`btnVerRutaEncuestador`),n=document.getElementById(`mapRouteAgentCount`);if(!e||!t||t._verRutaAttached)return;t._verRutaAttached=!0;let r=()=>{let r=!!e.value,i=r?l.filtered.filter(t=>t._meta?.cedula===e.value&&t._meta.lat&&t._meta.lng).length:0;if(t.disabled=!r,n&&(n.textContent=r&&i?`${i} pts`:`—`),!r){vt(),t.dataset.routeActive=`0`,t.classList.remove(`bg-brand-orange/20`,`border-brand-orange`);let e=t.querySelector(`.route-label`);e&&(e.textContent=`Ver Ruta`),l.map&&l.markerCluster&&!l.map.hasLayer(l.markerCluster)&&l.map.addLayer(l.markerCluster)}};r(),e.addEventListener(`change`,r),document.addEventListener(`filtersApplied`,r),t.addEventListener(`click`,()=>{let r=e.value;if(r)if(t.dataset.routeActive===`1`){vt(),t.dataset.routeActive=`0`,l.map&&l.markerCluster&&!l.map.hasLayer(l.markerCluster)&&l.map.addLayer(l.markerCluster),t.classList.remove(`bg-brand-orange/20`,`border-brand-orange`);let e=l.filtered.filter(e=>e._meta?.cedula===r&&e._meta.lat&&e._meta.lng).length;n&&(n.textContent=`${e} pts`);let i=t.querySelector(`.route-label`);i&&(i.textContent=`Ver Ruta`)}else{let e=document.querySelector(`[data-tab="tab-mapa"]`);e&&e.click(),setTimeout(()=>{yt(r),t.dataset.routeActive=`1`,l.map&&l.markerCluster&&l.map.hasLayer(l.markerCluster)&&l.map.removeLayer(l.markerCluster),t.classList.add(`bg-brand-orange/20`,`border-brand-orange`);let e=l.filtered.filter(e=>e._meta?.cedula===r&&e._meta.lat&&e._meta.lng).length;n&&(n.textContent=`${e} pts`);let i=t.querySelector(`.route-label`);i&&(i.textContent=`Ocultar Ruta`)},200)}})}var xt=c((()=>{m(),e(),B(),G(),ot()}));function St(){if(!l.map||!l.markerCluster)return;l.markerCluster.clearLayers();let e=l.filtered.filter(e=>e._meta.lat&&e._meta.lng),t=e.filter(e=>e._meta&&e._meta.estado===`completada`).length,n=e.length-t,r=new Set(e.map(e=>e._meta.cedula)).size,i=e.filter(e=>e._meta.hasAlerts).length,a=new Set(e.map(e=>e._meta.mun).filter(e=>e&&e!==`N/A`)),o=new Set(e.map(e=>e._meta.par).filter(e=>e&&e!==`N/A`)),c=new Set(e.map(e=>e._meta.nodo).filter(e=>e&&e!==`N/A`));s(`mapKpiPoints`)&&(s(`mapKpiPoints`).textContent=e.length),s(`mapKpiComplete`)&&(s(`mapKpiComplete`).textContent=t),s(`mapKpiNoRespuesta`)&&(s(`mapKpiNoRespuesta`).textContent=n),s(`mapKpiAgents`)&&(s(`mapKpiAgents`).textContent=r),s(`mapKpiAlertas`)&&(s(`mapKpiAlertas`).textContent=i);let u=s(`mapCoverageBadge`);u&&e.length>0&&(u.classList.remove(`hidden`),s(`mapMunCount`)&&(s(`mapMunCount`).textContent=a.size),s(`mapParCount`)&&(s(`mapParCount`).textContent=o.size),s(`mapNodoCount`)&&(s(`mapNodoCount`).textContent=c.size));let d=e.map(e=>{let t=e._meta,n=t.estado===`completada`,r=t.hasAlerts,i=t.alertas||[],a,o,s;if(r){a=`#EF4444`,o=`#DC2626`;let e=S[i[0]];s=`⚠ ${e?e.label:`Alerta`}${i.length>1?` +${i.length-1}`:``}`}else n?(a=`#10B981`,o=`#059669`,s=`Efectiva`):(a=`#F59E0B`,o=`#D97706`,s=`No Respuesta`);let c=t.durMin===null?`—`:`${Math.round(t.durMin)} min`,l=t.distance_m===null?`—`:`${Math.round(t.distance_m)} m`,u=rt(t,e._uuid,a,o,s,i,c,l);return L.circleMarker([t.lat,t.lng],{radius:7,fillColor:a,color:o,weight:2,opacity:.9,fillOpacity:.7}).bindPopup(u,{className:`custom-popup`,maxWidth:320})});if(l.markerCluster.addLayers(d),document.getElementById(`btnVerRutaEncuestador`)?.dataset?.routeActive===`1`){l.map.hasLayer(l.markerCluster)&&l.map.removeLayer(l.markerCluster);let e=document.getElementById(`filterEncuestador`);e&&e.value&&yt(e.value)}else if(d.length>0){let e=l.markerCluster.getBounds();e.isValid()&&l.map.fitBounds(e,{padding:[50,50]})}window.lucide&&lucide.createIcons()}var Ct=c((()=>{m(),e(),B(),h(),ot(),xt(),window.setQuickFilter=function(e){l.quickFilterMode=e,Object.entries({all:{id:`btnMapFilterAll`,active:[`bg-brand-blue/10`,`dark:bg-brand-blue/20`,`border-brand-blue`,`ring-brand-blue/30`],inactive:`border-brand-blue`},efectivas:{id:`btnMapFilterEfectivas`,active:[`bg-brand-emerald/10`,`dark:bg-brand-emerald/20`,`border-brand-emerald`,`ring-brand-emerald/30`],inactive:`border-brand-emerald`},no_respuesta:{id:`btnMapFilterNoRespuesta`,active:[`bg-brand-orange/10`,`dark:bg-brand-orange/20`,`border-brand-orange`,`ring-brand-orange/30`],inactive:`border-brand-orange`},alertas:{id:`btnMapFilterAlertas`,active:[`bg-brand-red/10`,`dark:bg-brand-red/20`,`border-brand-red`,`ring-brand-red/30`],inactive:`border-brand-red`}}).forEach(([t,n])=>{let r=s(n.id);r&&(r.classList.remove(`bg-brand-blue/10`,`dark:bg-brand-blue/20`,`border-brand-blue`,`ring-brand-blue/30`,`bg-brand-emerald/10`,`dark:bg-brand-emerald/20`,`border-brand-emerald`,`ring-brand-emerald/30`,`bg-brand-orange/10`,`dark:bg-brand-orange/20`,`border-brand-orange`,`ring-brand-orange/30`,`bg-brand-red/10`,`dark:bg-brand-red/20`,`border-brand-red`,`ring-brand-red/30`,`ring-1`,`shadow-md`,`border-slate-400`),t===e?r.classList.add(...n.active,`ring-1`,`shadow-md`):r.classList.add(n.inactive))}),C()}})),wt=c((()=>{_t(),ht(),Ct(),xt()}));function q(e){if(typeof Tabulator>`u`){console.error(`Tabulator not found`);return}let t=(e||[]).map((e,t)=>{let n=[];e[`S1/P_nomsect`]&&n.push(e[`S1/P_nomsect`]);for(let t=1;t<=4;t++){let r=e[`S1/G_P9/gp10_${t}_etiq`],i=e[`S1/G_P9/GP10_${t}b`];r&&i&&n.push(`${r} ${i}`)}let r=e[`control_de_la_entrevista/in10`]||e[`control_entrevista/in10`];r&&n.push(`Nro: ${r}`);let i=e[`control_de_la_entrevista/in11`]||e[`control_entrevista/in11`];i&&n.push(`Ref: ${i}`);let a=n.length>0?n.join(`, `):e[`S1/direccion`]||e._meta.nota||`-`;return{linea:e[`group_sh53u78/n_linea`]||t+1,serie:e[`group_sh53u78/n_serie`]||`-`,manzana:e[`S1/manzana`]||`-`,parcela:e[`S1/parcela`]||`-`,edificacion:e[`S1/Edificaci_n`]||e[`S1/edificacion`]||`-`,estructura:e[`S1/estructura`]||e[`S1/unidad`]||`-`,uso:e[`S1/Uso_de_la_Unidad_inmobiliaria`]||e._meta.uso||`-`,ladoManz:e[`S1/lado_manz`]||`-`,direccion:a,razon:e[`Condici_n_de_ocupaci_n/condicion_de_ocupacion`]||e._meta.condicion||`-`,encuestador:e._meta.nombre?e._meta.nombre.split(` `)[0]:`N/A`}});t.sort((e,t)=>parseInt(e.linea)-parseInt(t.linea)),l.mm111Table?l.mm111Table.setData(t).then(()=>{l.mm111Table.redraw(!0)}):Tt(t)}function Tt(e){l.mm111Table=new Tabulator(`#mm111Grid`,{data:e,layout:`fitColumns`,height:`100%`,responsiveLayout:`collapse`,placeholder:`<div class='p-12 text-center text-slate-400 font-medium'>Seleccione un número de Control para visualizar el listado de las encuestas.</div>`,columns:[{title:`Línea`,field:`linea`,width:65,hozAlign:`center`,frozen:!0,formatter:e=>`<span class="font-mono font-bold text-slate-700 dark:text-slate-200">${e.getValue()}</span>`},{title:`Serie`,field:`serie`,width:60,hozAlign:`center`,formatter:e=>`<span class="font-mono opacity-70">${e.getValue()}</span>`},{title:`Manz.`,field:`manzana`,width:65,hozAlign:`center`},{title:`Parc.`,field:`parcela`,width:65,hozAlign:`center`},{title:`Edif.`,field:`edificacion`,width:65,hozAlign:`center`},{title:`Estr.`,field:`estructura`,width:65,hozAlign:`center`},{title:`Uso de la Unidad`,field:`uso`,minWidth:120,formatter:Et},{title:`Lado Manz.`,field:`ladoManz`,width:90,hozAlign:`center`},{title:`Dirección`,field:`direccion`,minWidth:250,formatter:`textarea`},{title:`Razón Inclusión`,field:`razon`,minWidth:180,formatter:Dt},{title:`Encuestador`,field:`encuestador`,width:100,hozAlign:`center`,formatter:e=>`<span class="text-[10px] font-black uppercase text-slate-400 tracking-wider">${e.getValue()}</span>`}]})}function Et(e){let t=String(e.getValue()).toUpperCase(),n=v.DEFAULT;for(let e in v)if(t.includes(e)){n=v[e];break}return`<span class="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-tight ${n.badge}">${t}</span>`}function Dt(e){let t=String(e.getValue()).toUpperCase(),n=t.replace(/_/g,` `),r=x.DEFAULT;for(let e in x)if(t.includes(e)){r=x[e];break}return`<span class="px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-tight ${r.badge}">${n}</span>`}function Ot(){[`mm111Entidad`,`mm111Municipio`,`mm111Parroquia`,`mm111CPoblado`].forEach(e=>{s(e)&&(s(e).textContent=`---`)}),[`mm111EntidadCod`,`mm111MunicipioCod`,`mm111ParroquiaCod`,`mm111CPobladoCod`].forEach(e=>{s(e)&&(s(e).textContent=`--`)}),[`mm111Segmento`,`mm111Sector`,`mm111Nodo`,`mm111Semana`,`mm111ControlMaestro`,`mm111Lote`].forEach(e=>{s(e)&&(s(e).textContent=`-`)}),s(`mm111ControlNro`)&&(s(`mm111ControlNro`).textContent=`0000`)}function kt(e,t){let n=s(`mm111ResultsList`);n&&(e.length>0?n.innerHTML=e.map((e,t)=>`
            <div class="result-item p-3 hover:bg-brand-blue/10 dark:hover:bg-brand-blue/20 rounded-xl cursor-pointer transition-all flex items-center justify-between group" 
                 data-value="${e.control}" data-index="${t}">
               <div class="flex flex-col">
                  <span class="text-sm font-bold text-slate-700 dark:text-white group-hover:text-brand-blue">${e.control}</span>
                  <div class="flex items-center gap-2 mt-0.5">
                    <span class="text-[9px] text-slate-400 font-bold uppercase tracking-wider">${e.mun}</span>
                    ${e.seg?`<span class="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700"></span><span class="text-[9px] text-brand-blue/60 font-bold uppercase">Ség: ${e.seg}</span>`:``}
                  </div>
               </div>
               <div class="h-6 w-6 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                  <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-brand-blue"></i>
               </div>
            </div>
        `).join(``):n.innerHTML=`
            <div class="p-8 text-center flex flex-col items-center gap-2">
                <i data-lucide="search-x" class="w-8 h-8 text-slate-300"></i>
                <p class="text-xs text-slate-400 font-medium">No se encontraron resultados para "${t}"</p>
            </div>`,window.lucide&&lucide.createIcons())}var At=c((()=>{m(),e(),h()}));function jt(e){if(!e)return;let t=l.rawData.filter(t=>String(t._meta.control).toLowerCase()===String(e).toLowerCase());if(t.length===0){Ot(),q([]);return}let n=t[0];s(`mm111Entidad`)&&(s(`mm111Entidad`).textContent=n[`S1/ent`]||n._meta.mun||`N/A`),s(`mm111Municipio`)&&(s(`mm111Municipio`).textContent=n._meta.mun||`N/A`),s(`mm111Parroquia`)&&(s(`mm111Parroquia`).textContent=n._meta.par||`N/A`),s(`mm111CPoblado`)&&(s(`mm111CPoblado`).textContent=n[`S1/cpoblado`]||`N/A`);let r=(e,t=null)=>{if(!e)return`--`;let n=String(e).match(/^(\d+)/),r=n?n[1]:`--`;return r!==`--`&&t&&(r=r.slice(-t)),r};s(`mm111EntidadCod`)&&(s(`mm111EntidadCod`).textContent=r(n[`S1/ent`])||`--`),s(`mm111MunicipioCod`)&&(s(`mm111MunicipioCod`).textContent=r(n._meta.mun,2)||`--`),s(`mm111ParroquiaCod`)&&(s(`mm111ParroquiaCod`).textContent=r(n._meta.par,2)||`--`),s(`mm111CPobladoCod`)&&(s(`mm111CPobladoCod`).textContent=r(n[`S1/cpoblado`])||`--`);let i=(e,t)=>e&&String(e).trim()!==`-`?String(e).slice(-t):`-`;s(`mm111Segmento`)&&(s(`mm111Segmento`).textContent=n[`S1/segmento`]||n[`S1/group_segmeto_sector/segmento`]||n[`group_segmeto_sector/segmento`]||`-`),s(`mm111Sector`)&&(s(`mm111Sector`).textContent=n[`S1/sector`]||n[`S1/group_segmeto_sector/sector`]||n[`group_segmeto_sector/sector`]||`-`),s(`mm111Nodo`)&&(s(`mm111Nodo`).textContent=n._meta.nodo||`-`),s(`mm111Semana`)&&(s(`mm111Semana`).textContent=i(n._meta.semana,2)),s(`mm111ControlNro`)&&(s(`mm111ControlNro`).textContent=i(n._meta.control,4));let a=n[`group_sh53u78/lote`]||n.lote||`-`;s(`mm111Lote`)&&(s(`mm111Lote`).textContent=a);let o=t.map(e=>e._meta.fecha).filter(Boolean).sort();if(o.length>0){let e=s(`filterFechaInicio`),t=s(`filterFechaFin`);e&&(e.value=o[0]),t&&(t.value=o[o.length-1])}q(t)}function Mt(){let e=new Map;return l.filtered.forEach(t=>{let n=t._meta;!n||!n.control||e.has(n.control)||e.set(n.control,{control:n.control,mun:n.mun||`N/A`,seg:n.segmento||``,sec:n.sector||``})}),Array.from(e.values()).sort((e,t)=>e.control.localeCompare(t.control))}var Nt=c((()=>{m(),e(),At()}));function Pt(){let e=s(`btnLoadMM111`),t=s(`mm111SearchControl`),n=s(`mm111SearchResults`),r=s(`mm111ClearSearch`);if(!t||!n)return;let i=-1,a=e=>{let t=e.toLowerCase().trim(),r=Mt().filter(e=>e.control.toLowerCase().includes(t)||e.mun.toLowerCase().includes(t)||e.seg.toLowerCase().includes(t)).slice(0,50);i=-1,t.length>0||e.length===0?(n.classList.remove(`hidden`),kt(r,e),n.querySelectorAll(`.result-item`).forEach(e=>{e.onclick=()=>o(e.getAttribute(`data-value`))})):n.classList.add(`hidden`)},o=async e=>{t&&(t.value=e),n&&n.classList.add(`hidden`),e.trim().length>0&&r?.classList.remove(`hidden`);let i=s(`filterControl`);i&&(i.value=e),jt(e);let{applyFilters:a}=await K(async()=>{let{applyFilters:e}=await import(`./logic-CLBnyjbg.js`).then(e=>(e.n(),e.r));return{applyFilters:e}},__vite__mapDeps([0,1]),import.meta.url);a()};t.onfocus=()=>a(t.value),t.oninput=()=>{t.value.trim().length>0?r?.classList.remove(`hidden`):r?.classList.add(`hidden`),a(t.value)},t.onkeydown=e=>{let t=n.querySelectorAll(`.result-item`);e.key===`ArrowDown`?(e.preventDefault(),i=Math.min(i+1,t.length-1),c(t)):e.key===`ArrowUp`?(e.preventDefault(),i=Math.max(i-1,0),c(t)):e.key===`Enter`?(e.preventDefault(),i>=0&&t[i]?o(t[i].getAttribute(`data-value`)):t.length>0&&o(t[0].getAttribute(`data-value`))):e.key===`Escape`&&n.classList.add(`hidden`)};let c=e=>{e.forEach((e,t)=>{t===i?(e.classList.add(`active`,`bg-brand-blue/10`,`dark:bg-brand-blue/20`,`ring-1`,`ring-brand-blue/30`),e.scrollIntoView({block:`nearest`})):e.classList.remove(`active`,`bg-brand-blue/10`,`dark:bg-brand-blue/20`,`ring-1`,`ring-brand-blue/30`)})};r&&(r.onclick=async()=>{t.value=``,r.classList.add(`hidden`);let e=s(`filterControl`);e&&(e.value=``);let n=s(`filterFechaInicio`),i=s(`filterFechaFin`);n&&(n.value=``),i&&(i.value=``),t.focus(),a(``);let{applyFilters:o}=await K(async()=>{let{applyFilters:e}=await import(`./logic-CLBnyjbg.js`).then(e=>(e.n(),e.r));return{applyFilters:e}},__vite__mapDeps([0,1]),import.meta.url);o()}),e&&(e.onclick=()=>o(t.value.trim())),document.addEventListener(`click`,e=>{!t.contains(e.target)&&!n.contains(e.target)&&n.classList.add(`hidden`)})}var Ft=c((()=>{e(),Nt(),At(),ut(),document.addEventListener(`filtersApplied`,()=>{let e=s(`filterControl`)?.value,t=s(`mm111SearchControl`),n=s(`mm111ClearSearch`);t&&e&&t.value!==e?(t.value=e,n&&n.classList.remove(`hidden`),jt(e)):t&&!e&&t.value!==``&&(t.value=``,n&&n.classList.add(`hidden`),Ot(),q([]))})}));function It(){Lt||=(Pt(),!0);let e=s(`mm111SearchControl`),t=s(`mm111ClearSearch`),n=s(`mm111FilteredCount`);if(!e)return;n&&(n.textContent=s(`kpiControles`)?.textContent||`0`),e.value.trim().length===0?t?.classList.add(`hidden`):t?.classList.remove(`hidden`);let r=e.value.trim();r?jt(r):(Ot(),q([]))}var Lt,Rt=c((()=>{e(),Ft(),Nt(),At(),Lt=!1}));function zt(){return`
        <div class="col-span-full text-center py-10 text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" stroke-width="1.5" class="mx-auto mb-2 text-brand-green">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <p class="font-bold text-sm">Sin inconsistencias detectadas</p>
            <p class="text-xs mt-1 opacity-60">Todos los registros del filtro actual pasan las validaciones.</p>
        </div>`}function Bt(e,t,n){let r=S[e]||{label:e},i=Vt[e]||{bg:`#64748b22`,border:`#64748b`,text:`#64748b`},a=n===e,o=a?`ring-2 ring-offset-1 dark:ring-offset-[#0B1120]`:``,s=a?`ring-color: ${i.border}; border-color: ${i.border};`:`border-color:${i.border}30;`;return`
    <div class="alert-card ${o}"
         data-code="${e}"
         style="background:${i.bg}; ${s};">
        <div class="min-w-0 pr-2">
            <div class="text-[10px] sm:text-xs font-black uppercase tracking-widest mb-0.5 truncate"
                 style="color:${i.text}" title="${r.label}">${r.label}</div>
            <div class="text-[9px] text-slate-500 font-mono truncate opacity-60">${e}</div>
        </div>
        <div class="text-xl sm:text-2xl font-black font-outfit shrink-0 ml-auto" style="color:${i.text}">${t}</div>
    </div>`}var Vt,Ht=c((()=>{h(),Vt={TIEMPO_CORTO_EHM:{bg:`#F59E0B22`,border:`#F59E0B`,text:`#F59E0B`},TIEMPO_CORTO_ESCA:{bg:`#F59E0B22`,border:`#F59E0B`,text:`#F59E0B`},TIEMPO_CORTO:{bg:`#F59E0B22`,border:`#F59E0B`,text:`#F59E0B`},TIEMPO_LARGO:{bg:`#EF444422`,border:`#EF4444`,text:`#EF4444`},APERT_LEJOS:{bg:`#8B5CF622`,border:`#8B5CF6`,text:`#8B5CF6`},FUERA_SEGMENTO:{bg:`#EF444422`,border:`#EF4444`,text:`#EF4444`},SEGMENTO_INCORRECTO:{bg:`#EF444422`,border:`#EF4444`,text:`#EF4444`},ARRANQUE_INCONSISTENTE:{bg:`#F59E0B22`,border:`#F59E0B`,text:`#F59E0B`},LINEA_SERIE_INVALIDA:{bg:`#EF444422`,border:`#EF4444`,text:`#EF4444`},CEDULA_INVALIDA:{bg:`#EF444422`,border:`#EF4444`,text:`#EF4444`},INGRESO_ANOMALO:{bg:`#F59E0B22`,border:`#F59E0B`,text:`#F59E0B`},DESPLAZAMIENTO_ANOMALO:{bg:`#F59E0B22`,border:`#F59E0B`,text:`#F59E0B`}}}));function Ut(e=[]){l.inconsistenciasTabulator||(l.inconsistenciasTabulator=new Tabulator(`#inconsistenciasTable`,{data:e,layout:`fitColumns`,height:`500px`,responsiveLayout:`collapse`,placeholder:`<div style="padding:40px;text-align:center;color:var(--text-muted);font-size:14px;font-family:Inter,sans-serif;">No hay inconsistencias para mostrar</div>`,columnHeaderVertAlign:`bottom`,columns:[{formatter:`responsiveCollapse`,width:30,minWidth:30,hozAlign:`center`,headerSort:!1,resizable:!1,responsive:0},{title:`Encuestador`,field:`nombre`,minWidth:150,responsive:0,formatter:e=>`<div style="font-weight:700;">${e.getValue()}</div>`},{title:`Cédula`,field:`cedula`,width:100,responsive:2,cssClass:`font-mono`},{title:`Control`,field:`control`,width:100,responsive:0,cssClass:`font-mono text-brand-blue font-bold`},{title:`Fecha`,field:`fecha`,width:100,responsive:1,sorter:`date`},{title:`Semana`,field:`semana`,width:80,hozAlign:`center`,responsive:1},{title:`Alertas`,field:`alertas`,minWidth:200,headerSort:!1,responsive:0,formatter:e=>{let t=e.getValue();return t?t.map(e=>`<span style="display:inline-flex;align-items:center;background:rgba(239,68,68,0.1);color:#EF4444;border:1px solid rgba(239,68,68,0.2);border-radius:4px;padding:1px 6px;font-size:9px;font-weight:700;margin-right:3px;white-space:nowrap;">${(S[e]||{label:e}).label}</span>`).join(``):``}}]}),l.inconsistenciasTabulator.on(`rowClick`,(e,t)=>{let n=t.getData()._rec;n&&W(n)}))}function Wt(e){l.inconsistenciasTabulator?l.inconsistenciasTabulator.setData(e):Ut(e)}var Gt=c((()=>{m(),h(),G()}));function Kt(e){if(J.isEventsBound)return;J.isEventsBound=!0;let t=s(`incSearchInput`),n=s(`incClearSearch`),r=s(`incFilterAlerta`),i=s(`inconsistenciasCards`);t&&t.addEventListener(`input`,t=>{J.currentSearchQuery=t.target.value.trim().toLowerCase(),n&&n.classList.toggle(`hidden`,J.currentSearchQuery.length===0),e&&e()}),n&&n.addEventListener(`click`,()=>{t&&(t.value=``),J.currentSearchQuery=``,n.classList.add(`hidden`),e&&e()}),r&&r.addEventListener(`change`,t=>{J.currentAlertFilter=t.target.value,e&&e()}),i&&i.addEventListener(`click`,t=>{let n=t.target.closest(`.alert-card`);if(!n)return;let r=n.dataset.code;J.currentAlertFilter=J.currentAlertFilter===r?``:r,e&&e()})}var J,qt=c((()=>{e(),J={currentAlertFilter:``,currentSearchQuery:``,isEventsBound:!1}}));function Jt(){if(!s(`inconsistenciasContainer`))return;Kt(Jt);let e=l.filtered.filter(e=>e._meta&&e._meta.hasAlerts),t={};e.forEach(e=>{e._meta.alertas.forEach(e=>{t[e]=(t[e]||0)+1})});let n=e.length;Yt(t),Xt(t,n),Wt(Zt(e))}function Yt(e){let t=s(`incFilterAlerta`);if(!t)return;let n=Object.entries(e).sort((e,t)=>t[1]-e[1]),r=[`<option value="">Todas las alertas</option>`];n.forEach(([e,t])=>{let n=S[e]?S[e].label:e,i=e===J.currentAlertFilter?`selected`:``;r.push(`<option value="${e}" ${i}>${n} (${t})</option>`)});let i=r.join(``);t.innerHTML!==i&&(t.innerHTML=i)}function Xt(e,t){let n=s(`inconsistenciasCards`);n&&(t===0?n.innerHTML=zt():n.innerHTML=Object.entries(e).sort((e,t)=>t[1]-e[1]).map(([e,t])=>Bt(e,t,J.currentAlertFilter)).join(``))}function Zt(e){let t=e;return J.currentAlertFilter&&(t=t.filter(e=>e._meta.alertas.includes(J.currentAlertFilter))),J.currentSearchQuery&&(t=t.filter(e=>{let t=e._meta;return t.nombre&&t.nombre.toLowerCase().includes(J.currentSearchQuery)||t.cedula&&t.cedula.toLowerCase().includes(J.currentSearchQuery)||t.control&&t.control.toLowerCase().includes(J.currentSearchQuery)})),t.sort((e,t)=>{let n=t._meta.alertas.length-e._meta.alertas.length;return n===0?(t._meta.fecha||``).localeCompare(e._meta.fecha||``):n}).map(e=>({_rec:e,nombre:e._meta.nombre,cedula:e._meta.cedula,control:e._meta.control||`—`,fecha:e._meta.fecha||`—`,semana:e._meta.semana||`—`,alertas:e._meta.alertas}))}var Qt=c((()=>{m(),h(),e(),Ht(),Gt(),qt()}));function $t(e){if(typeof Chart>`u`)return;let t=e?`#ffffff`:`#000000`,n=e?`rgba(255,255,255,0.05)`:`rgba(0,0,0,0.05)`;Chart.defaults.color=t,Chart.defaults.scale.grid.color=n,typeof ChartDataLabels<`u`&&Chart.register(ChartDataLabels),Object.values(l.charts).forEach(e=>{e&&(e.options.color=t,e.options.plugins&&(e.options.plugins.datalabels&&(e.options.plugins.datalabels.color=t),e.options.plugins.legend&&e.options.plugins.legend.labels&&(e.options.plugins.legend.labels.color=t)),e.options.scales&&(e.options.scales.x&&e.options.scales.x.ticks&&(e.options.scales.x.ticks.color=t),e.options.scales.y&&e.options.scales.y.ticks&&(e.options.scales.y.ticks.color=t)),typeof e.update==`function`&&e.update(`none`))})}function Y(e){l.charts[e]&&(l.charts[e].destroy(),delete l.charts[e])}function X(){let e=document.documentElement.classList.contains(`dark`),t=e?`#ffffff`:`#000000`;return{responsive:!0,maintainAspectRatio:!1,color:t,plugins:{legend:{labels:{color:t,font:{size:11,family:`'Inter', sans-serif`,weight:`bold`}}},tooltip:{backgroundColor:e?`#1e293b`:`#ffffff`,titleColor:e?`#f1f5f9`:`#0f172a`,bodyColor:e?`#e2e8f0`:`#334155`,borderColor:e?`rgba(255,255,255,0.1)`:`rgba(0,0,0,0.1)`,titleFont:{weight:`bold`},bodyFont:{family:`'Inter', sans-serif`},borderWidth:1}},scales:{x:{ticks:{color:t,font:{size:11,family:`'Inter', sans-serif`,weight:`600`}},grid:{}},y:{ticks:{color:t,font:{size:11,family:`'Inter', sans-serif`,weight:`600`}},grid:{}}}}}var en,Z=c((()=>{m(),en={id:`centerText`,afterDraw:e=>{let t=e.config.options.plugins.centerText;if(t&&t.display!==!1){let{ctx:n,chartArea:{left:r,top:i,width:a,height:o}}=e;n.save();let s=document.documentElement.classList.contains(`dark`),c=s?`#ffffff`:`#000000`;n.font=`bold 18px Outfit`,n.fillStyle=c,n.textAlign=`center`,n.textBaseline=`middle`,n.fillText(t.text||``,r+a/2,i+o/2),n.font=`bold 9px Inter`,n.fillStyle=s?`#ffffff`:`#000000`,n.fillText(`TOTAL`,r+a/2,i+o/2+18),n.restore()}}},typeof Chart<`u`&&Chart.register(en)}));function tn(){Y(`enc`);let e={};l.filtered.forEach(t=>{let n=String(t._meta.nombre||`Desconocido`).split(` `)[0];e[n]=(e[n]||0)+1});let t=Object.entries(e).sort((e,t)=>t[1]-e[1]).slice(0,15),n=s(`chartEncuestador`);n&&(l.charts.enc=new Chart(n,{type:`bar`,data:{labels:t.map(e=>e[0]),datasets:[{label:`Encuestas`,data:t.map(e=>e[1]),backgroundColor:`#3B82F666`,borderColor:`#3B82F6`,borderWidth:1,borderRadius:4}]},options:{...X(),plugins:{...X().plugins,datalabels:{align:`top`,anchor:`end`,font:{weight:`bold`,size:10},color:document.documentElement.classList.contains(`dark`)?`#ffffff`:`#000000`,formatter:e=>e>0?e:``}}}}))}function nn(){Y(`dur`);let e={};l.filtered.forEach(t=>{let n=String(t._meta.nombre||`Desconocido`).split(` `)[0];t._meta.durMin!==null&&(e[n]||(e[n]=[]),e[n].push(t._meta.durMin))});let t=Object.entries(e).map(([e,t])=>[e,r(t)]).sort((e,t)=>t[1]-e[1]).slice(0,15),n=s(`chartDuracion`);n&&(l.charts.dur=new Chart(n,{type:`bar`,data:{labels:t.map(e=>e[0]),datasets:[{label:`Minutos Promedio`,data:t.map(e=>Math.round(e[1])),backgroundColor:`#8B5CF666`,borderColor:`#8B5CF6`,borderWidth:1,borderRadius:4}]},options:{...X(),plugins:{...X().plugins,datalabels:{align:`top`,anchor:`end`,font:{weight:`bold`,size:10},color:document.documentElement.classList.contains(`dark`)?`#ffffff`:`#000000`,formatter:e=>e>0?e:``}}}}))}function rn(){Y(`hor`);let e={};l.filtered.forEach(t=>{t._meta.hora!==null&&(e[t._meta.hora]=(e[t._meta.hora]||0)+1)});let t=Object.keys(e).map(Number).sort((e,t)=>e-t),n=t.map(e=>`${e}:00`),r=t.map(t=>e[t]),i=s(`chartHorario`);i&&(l.charts.hor=new Chart(i,{type:`bar`,data:{labels:n,datasets:[{label:`Encuestas Capturadas`,data:r,backgroundColor:`#10B98144`,borderColor:`#10B981`,borderWidth:1,borderRadius:4}]},options:{...X(),plugins:{...X().plugins,legend:{display:!1},datalabels:{align:`top`,anchor:`end`,font:{weight:`bold`,size:9},color:document.documentElement.classList.contains(`dark`)?`#ffffff`:`#000000`,formatter:e=>e>0?e:``}}}}))}function an(){Y(`htrans`);let e={};l.filtered.forEach(t=>{t._meta.hora_trans!==null&&t._meta.hora_trans!==void 0&&(e[t._meta.hora_trans]=(e[t._meta.hora_trans]||0)+1)});let t=Object.keys(e).map(Number).sort((e,t)=>e-t),n=t.map(e=>`${e}:00`),r=t.map(t=>e[t]),i=s(`chartHoraTransmision`);i&&(l.charts.htrans=new Chart(i,{type:`bar`,data:{labels:n,datasets:[{label:`Encuestas Transmitidas`,data:r,backgroundColor:`#F9731644`,borderColor:`#F97316`,borderWidth:1,borderRadius:4}]},options:{...X(),plugins:{...X().plugins,legend:{display:!1},datalabels:{align:`top`,anchor:`end`,font:{weight:`bold`,size:9},color:document.documentElement.classList.contains(`dark`)?`#ffffff`:`#000000`,formatter:e=>e>0?e:``}}}}))}var on=c((()=>{m(),e(),Z()}));function sn(e){let t=String(e).toUpperCase();for(let e in v)if(t.includes(e))return v[e].color;return v.DEFAULT.color}function cn(e){let t=String(e).toUpperCase();if(x[t])return x[t].color;for(let e in x)if(t.includes(e))return x[e].color;return x.DEFAULT.color}function ln(){Y(`cond`);let e={};l.filtered.forEach(t=>{let n=t._meta.condicion,r=p.condicion[n]||String(n).replace(/_/g,` `);e[r]=(e[r]||0)+1});let t=Object.entries(e),n=s(`chartCondicion`);if(!n)return;let r=t.reduce((e,t)=>e+t[1],0);l.charts.cond=new Chart(n,{type:`doughnut`,data:{labels:t.map(e=>e[0]),datasets:[{data:t.map(e=>e[1]),backgroundColor:t.map(e=>cn(e[0])+`aa`),borderColor:`#1c2128`}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:`bottom`,labels:{color:document.documentElement.classList.contains(`dark`)?`#ffffff`:`#000000`,boxWidth:10,font:{size:10,weight:`bold`}}},datalabels:{color:document.documentElement.classList.contains(`dark`)?`#ffffff`:`#000000`,font:{weight:`bold`,size:11},formatter:e=>e>0?e:``},centerText:{text:String(r)}}}})}function un(){Y(`uso`);let e={};l.filtered.forEach(t=>{let n=t._meta.uso||`N/A`,r=p.uso[n]||String(n).replace(/_/g,` `).toUpperCase();e[r]=(e[r]||0)+1});let t=Object.entries(e).sort((e,t)=>t[1]-e[1]),n=s(`chartUso`);if(!n)return;let r=t.reduce((e,t)=>e+t[1],0);l.charts.uso=new Chart(n,{type:`doughnut`,data:{labels:t.map(e=>e[0]),datasets:[{data:t.map(e=>e[1]),backgroundColor:t.map(e=>sn(e[0])+`aa`),borderColor:`#1c2128`}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:`bottom`,labels:{color:document.documentElement.classList.contains(`dark`)?`#ffffff`:`#000000`,boxWidth:10,font:{size:10,weight:`bold`}}},datalabels:{color:document.documentElement.classList.contains(`dark`)?`#ffffff`:`#000000`,font:{weight:`bold`,size:10},formatter:e=>e>0?e:``},centerText:{text:String(r)}}}})}function dn(){if(!s(`chartClasificacion`))return;Y(`clasif`);let e={"TIPO A":0,"TIPO B":0,"TIPO C":0,"TIPO E":0};l.filtered.forEach(t=>{let n=t._meta&&t._meta.tipo_vivienda;e.hasOwnProperty(n)&&e[n]++});let t=Object.entries(e),n=t.map(e=>e[0]),r=t.map(e=>e[1]),i=n.map(e=>cn(e)),a=r.reduce((e,t)=>e+t,0),o=s(`chartClasificacion`);l.charts.clasif=new Chart(o,{type:`doughnut`,data:{labels:n,datasets:[{data:r,backgroundColor:i.map(e=>e+`aa`),borderColor:`#1c2128`,borderWidth:2,hoverOffset:15}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:`bottom`,labels:{color:document.documentElement.classList.contains(`dark`)?`#ffffff`:`#000000`,boxWidth:10,font:{size:10,weight:`bold`}}},datalabels:{color:document.documentElement.classList.contains(`dark`)?`#ffffff`:`#000000`,font:{weight:`bold`,size:11},formatter:e=>e>0?e:``},centerText:{text:String(a)}}}})}var fn=c((()=>{m(),e(),h(),Z()}));function pn(){Y(`dia`);let e={};l.filtered.forEach(t=>{t._meta.fecha&&(e[t._meta.fecha]=(e[t._meta.fecha]||0)+1)});let t=Object.entries(e).sort(),n=s(`chartPorDia`);n&&(l.charts.dia=new Chart(n,{type:`line`,data:{labels:t.map(e=>e[0]),datasets:[{label:`Encuestas`,data:t.map(e=>e[1]),borderColor:`#10B981`,backgroundColor:`#10B98122`,fill:!0,tension:.3}]},options:{...X(),plugins:{...X().plugins,datalabels:{align:`top`,anchor:`end`,offset:2,font:{weight:`bold`,size:10},color:document.documentElement.classList.contains(`dark`)?`#ffffff`:`#000000`,formatter:e=>e>0?e:``}}}}))}function mn(){Y(`histo`);let e=[0,20,40,60,90,120,999],t=[`<20`,`20-40`,`40-60`,`60-90`,`90-120`,`>120`],n=Array(t.length).fill(0);l.filtered.forEach(t=>{let r=t._meta.durMin;if(r!==null){for(let t=0;t<e.length-1;t++)if(r<e[t+1]){n[t]++;break}}});let r=s(`chartHistograma`);r&&(l.charts.histo=new Chart(r,{type:`bar`,data:{labels:t,datasets:[{data:n,backgroundColor:`#F59E0B66`,borderColor:`#F59E0B`,borderWidth:1}]},options:X()}))}function hn(){Y(`semana`);let e=s(`chartResumenSemanal`);if(!e)return;let t=new Set;l.filtered.forEach(e=>{e._meta.semana&&t.add(e._meta.semana)});let n=[...t].sort();if(n.length===0)return;let r=new Set(l.filtered.map(e=>e._meta.cedula)),i=Object.values(l.encMap).filter(e=>r.has(e.cedula)&&e.semanas).sort((e,t)=>{let n=Object.values(e.semanas).reduce((e,t)=>e+t.size,0);return Object.values(t.semanas).reduce((e,t)=>e+t.size,0)-n}).slice(0,10).map((e,t)=>({label:String(e.nombre||`N/A`).split(` `)[0],data:n.map(t=>e.semanas[t]?e.semanas[t].size:0),backgroundColor:_[t%_.length]+`99`,borderColor:_[t%_.length],borderWidth:1,borderRadius:3}));l.charts.semana=new Chart(e,{type:`bar`,data:{labels:n,datasets:i},options:{...X(),plugins:{...X().plugins,legend:{position:`bottom`,labels:{boxWidth:10,font:{size:9}}}},scales:{x:{ticks:{font:{size:9}}},y:{beginAtZero:!0,ticks:{font:{size:9}},title:{display:!0,text:`Controles únicos`,font:{size:9}}}}}})}var gn=c((()=>{m(),e(),h(),Z()})),_n=c((()=>{Z(),on(),fn(),gn()}));function vn(){return`
    <div id="tab-resumen" class="tab-content flex flex-col gap-6 animate-fade-in">
      <!-- Encabezado del módulo -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 px-2">
        <div>
          <h2 class="text-xl sm:text-2xl font-black font-outfit text-slate-800 dark:text-white">Vista General</h2>
          <p class="text-sm text-slate-500 font-inter">Métricas clave de producción, calidad y caracterización del campo.</p>
        </div>
        <div id="currentDateDisplay"
          class="bg-brand-blue/10 border border-brand-blue/20 text-brand-blue px-4 py-1.5 rounded-full text-xs font-bold tracking-wide">
          --</div>
      </div>

      <!-- TIER 1: Indicadores Críticos de Producción -->
      <section class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
        <div class="card-premium group relative animate-slide-up" title="Volumen total de formularios recibidos en el servidor sin distinción de su estado de completitud.">
          <div class="card-glow bg-blue-500/10 group-hover:bg-blue-500/20"></div>
          <div class="h-10 w-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
            <i data-lucide="files" class="w-5 h-5"></i>
          </div>
          <div class="kpi-value-text" id="kpiTotal">0</div>
          <div class="text-[10px] font-bold text-blue-400 tracking-wider uppercase mt-1">Total Encuestas Recibidas</div>
        </div>

        <div class="card-premium group relative animate-slide-up" title="Entrevistas que cumplen con todos los criterios de completitud y validación del formulario.">
          <div class="card-glow bg-emerald-500/10 group-hover:bg-emerald-500/20"></div>
          <div class="h-10 w-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
            <i data-lucide="check-circle" class="w-5 h-5"></i>
          </div>
          <div class="kpi-value-text" id="kpiCompletadas">0</div>
          <div class="text-[10px] font-bold text-emerald-400 tracking-wider uppercase mt-1">Encuestas Efectivas</div>
        </div>

        <div class="card-premium group relative animate-slide-up" title="Registros donde no se pudo concretar la entrevista debido a rechazos, ausencia de informante u otros motivos.">
          <div class="card-glow bg-orange-500/10 group-hover:bg-orange-500/20"></div>
          <div class="h-10 w-10 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center mb-4">
            <i data-lucide="help-circle" class="w-5 h-5"></i>
          </div>
          <div class="kpi-value-text" id="kpiNoRespuesta">0</div>
          <div class="text-[10px] font-bold text-orange-400 tracking-wider uppercase mt-1">No Respuestas</div>
        </div>

        <div class="card-premium group relative animate-slide-up" title="Rendimiento porcentual calculado como (Encuestas Efectivas / Total Encuestas Recibidas) * 100.">
          <div class="card-glow bg-sky-500/10 group-hover:bg-sky-500/20"></div>
          <div class="h-10 w-10 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center mb-4">
            <i data-lucide="percent" class="w-5 h-5"></i>
          </div>
          <div class="kpi-value-text" id="kpiTasaEfectividad">0%</div>
          <div class="text-[10px] font-bold text-sky-400 tracking-wider uppercase mt-1">Tasa de Efectividad</div>
        </div>

        <div class="card-premium group relative animate-slide-up" title="Cantidad de encuestadores únicos que han sincronizado datos en el periodo y filtros seleccionados.">
          <div class="card-glow bg-purple-500/10 group-hover:bg-purple-500/20"></div>
          <div class="h-10 w-10 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
            <i data-lucide="users" class="w-5 h-5"></i>
          </div>
          <div class="kpi-value-text" id="kpiEncuestadores">0</div>
          <div class="text-[10px] font-bold text-purple-400 tracking-wider uppercase mt-1">Encuestadores Activos</div>
        </div>

        <div class="card-premium group relative animate-slide-up" title="Entrevistas que han disparado alguna regla del motor de inconsistencias o validaciones técnicas.">
          <div class="card-glow bg-red-500/10 group-hover:bg-red-500/20"></div>
          <div class="h-10 w-10 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center mb-4">
            <i data-lucide="shield-alert" class="w-5 h-5"></i>
          </div>
          <div class="kpi-value-text" id="kpiTotalAlertas">0</div>
          <div class="text-[10px] font-bold text-red-400 tracking-wider uppercase mt-1">Registros con Alertas</div>
        </div>
      </section>

      <!-- TIER 2: Detalle Demográfico y de Tiempo -->
      <section class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
        <div class="card-premium border-l-2 border-l-brand-orange" title="Tiempo promedio invertido en completar una entrevista efectiva (desde el inicio hasta el fin del formulario).">
          <div class="kpi-label !mt-0 mb-2 flex items-center gap-1.5"><i data-lucide="clock" class="w-4 h-4 text-brand-orange/80"></i> Duración Media</div>
          <div class="kpi-value-text text-slate-900 dark:text-white" id="kpiDuracion">0m</div>
        </div>
        <div class="card-premium border-l-2 border-l-teal-500" title="Censo total de personas registradas dentro de los hogares que respondieron la encuesta de manera efectiva.">
          <div class="kpi-label !mt-0 mb-2 flex items-center gap-1.5"><i data-lucide="users" class="w-4 h-4 text-teal-500/80"></i> Integrantes</div>
          <div class="kpi-value-text text-slate-900 dark:text-white" id="kpiPersonas">0</div>
        </div>
        <div class="card-premium border-l-2 border-l-indigo-500" title="Cantidad de hogares donde solo se registró a un (1) habitante o encuestado.">
          <div class="kpi-label !mt-0 mb-2 flex items-center gap-1.5"><i data-lucide="user" class="w-4 h-4 text-indigo-500/80"></i> Hogares Unipersonales</div>
          <div class="kpi-value-text text-slate-900 dark:text-white" id="kpiHogaresUni">0</div>
        </div>
        <div class="card-premium border-l-2 border-l-cyan-500" title="Cantidad total de planillas físicas (Controles) registradas en el sistema.">
          <div class="kpi-label !mt-0 mb-2 flex items-center gap-1.5"><i data-lucide="clipboard-list" class="w-4 h-4 text-cyan-500/80"></i> Total Controles</div>
          <div class="kpi-value-text text-slate-900 dark:text-white" id="kpiControles">0</div>
        </div>
        <div class="card-premium border-l-2 border-l-blue-500" title="Total de personas de sexo masculino registradas en los hogares censados.">
          <div class="kpi-label !mt-0 mb-2 flex items-center gap-1.5"><i data-lucide="mars" class="w-4 h-4 text-blue-500/80"></i> Hombres</div>
          <div class="kpi-value-text text-slate-900 dark:text-white" id="kpiHombres">0</div>
        </div>
        <div class="card-premium border-l-2 border-l-pink-500" title="Total de personas de sexo femenino registradas en los hogares censados.">
          <div class="kpi-label !mt-0 mb-2 flex items-center gap-1.5"><i data-lucide="venus" class="w-4 h-4 text-pink-500/80"></i> Mujeres</div>
          <div class="kpi-value-text text-slate-900 dark:text-white" id="kpiMujeres">0</div>
        </div>
      </section>

      <!-- TIER 1.5: Clasificación de Estados de Vivienda (Ahorra arriba de las donas) -->
      <section class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div class="card-premium border-l-2 border-l-brand-purple" title="Viviendas donde no se pudo realizar la entrevista por ausencia o rechazo.">
          <div class="kpi-label !mt-0 mb-1 flex items-center gap-1.5"><i data-lucide="user-round-x" class="w-4 h-4 text-brand-purple"></i> TIPO A</div>
          <div class="flex items-baseline gap-2">
            <div class="kpi-value-text text-xl" id="kpiTipoA">0</div>
            <div class="text-[10px] font-bold text-slate-400 uppercase tracking-tighter" id="pctTipoA">0%</div>
          </div>
          <div class="text-[9px] text-slate-500 mt-1 uppercase font-bold tracking-widest">Ausentes / Rechazos</div>
        </div>
        <div class="card-premium border-l-2 border-l-brand-orange" title="Viviendas desocupadas, en construcción o de uso ocasional.">
          <div class="kpi-label !mt-0 mb-1 flex items-center gap-1.5"><i data-lucide="brick-wall" class="w-4 h-4 text-brand-orange"></i> TIPO B</div>
          <div class="flex items-baseline gap-2">
            <div class="kpi-value-text text-xl" id="kpiTipoB">0</div>
            <div class="text-[10px] font-bold text-slate-400 uppercase tracking-tighter" id="pctTipoB">0%</div>
          </div>
          <div class="text-[9px] text-slate-500 mt-1 uppercase font-bold tracking-widest">Desocupadas / Construcción</div>
        </div>
        <div class="card-premium border-l-2 border-l-brand-red" title="Viviendas demolidas, inexistentes o de uso no residencial permanente.">
          <div class="kpi-label !mt-0 mb-1 flex items-center gap-1.5"><i data-lucide="hammer" class="w-4 h-4 text-brand-red"></i> TIPO C</div>
          <div class="flex items-baseline gap-2">
            <div class="kpi-value-text text-xl" id="kpiTipoC">0</div>
            <div class="text-[10px] font-bold text-slate-400 uppercase tracking-tighter" id="pctTipoC">0%</div>
          </div>
          <div class="text-[9px] text-slate-500 mt-1 uppercase font-bold tracking-widest">Inexistentes / Demolidas</div>
        </div>
        <div class="card-premium border-l-2 border-l-brand-emerald" title="Viviendas con entrevistas exitosas (Ocupadas con ocupantes presentes).">
          <div class="kpi-label !mt-0 mb-1 flex items-center gap-1.5"><i data-lucide="user-check" class="w-4 h-4 text-brand-emerald"></i> TIPO E</div>
          <div class="flex items-baseline gap-2">
            <div class="kpi-value-text text-xl" id="kpiTipoE">0</div>
            <div class="text-[10px] font-bold text-slate-400 uppercase tracking-tighter" id="pctTipoE">0%</div>
          </div>
          <div class="text-[9px] text-slate-500 mt-1 uppercase font-bold tracking-widest">Entrevistas Efectivas</div>
        </div>
      </section>

      <!-- SECCIÓN 1: Distribución y Tipologías (DONAS) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <!-- Gráfico de Clasificación (A, B, C, E) -->
        <div class="card-premium min-h-[300px] sm:h-[380px] flex flex-col items-center" title="Distribución porcentual de las viviendas según su clasificación final.">
          <div class="w-full mb-4">
            <h3 class="font-bold flex items-center gap-2 font-outfit text-sm">
              <i data-lucide="pie-chart" class="text-brand-emerald w-4 h-4"></i> Clasificación de Viviendas
            </h3>
          </div>
          <div class="flex-1 w-full relative">
            <canvas id="chartClasificacion"></canvas>
          </div>
        </div>

        <div class="card-premium min-h-[300px] sm:h-[380px] flex flex-col items-center" title="Distribución de las unidades inmobiliarias según su estado de habitabilidad u ocupación.">
          <div class="w-full mb-4">
            <h3 class="font-bold flex items-center gap-2 font-outfit text-sm">
              <i data-lucide="home" class="text-brand-purple w-4 h-4"></i> Tipología Vivienda
            </h3>
          </div>
          <div class="flex-1 w-full relative"><canvas id="chartCondicion"></canvas></div>
        </div>

        <div class="card-premium min-h-[300px] sm:h-[380px] flex flex-col items-center" title="Desglose del uso principal de las estructuras visitadas (Residencial, Comercial, Mixto, etc.).">
          <div class="w-full mb-4">
            <h3 class="font-bold flex items-center gap-2 font-outfit text-sm">
              <i data-lucide="building-2" class="text-brand-emerald w-4 h-4"></i> Uso Estructura
            </h3>
          </div>
          <div class="flex-1 w-full relative"><canvas id="chartUso"></canvas></div>
        </div>
      </div>

      <!-- SECCIÓN 2: Métricas Operativas y Rendimiento -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div class="card-premium min-h-[300px] sm:h-[380px] flex flex-col" title="Ranking de productividad mostrando los 15 encuestadores con mayor volumen de captación en el periodo.">
          <div class="w-full mb-4">
            <h3 class="font-bold flex items-center gap-2 font-outfit text-sm">
              <i data-lucide="bar-chart-3" class="text-brand-blue w-4 h-4"></i> Volumen por Encuestador
            </h3>
          </div>
          <div class="flex-1 min-h-0 relative"><canvas id="chartEncuestador"></canvas></div>
        </div>
        <div class="card-premium min-h-[300px] sm:h-[380px] flex flex-col" title="Frecuencia de las encuestas según la hora de inicio registrada por el dispositivo en campo (Métricas de Jornada Laboral).">
          <div class="flex justify-between items-center mb-4">
            <h3 class="font-bold flex items-center gap-2 font-outfit text-sm">
              <i data-lucide="clock" class="text-brand-emerald w-4 h-4"></i> Distribución Horaria
            </h3>
          </div>
          <div class="flex-1 min-h-0 relative"><canvas id="chartHorario"></canvas></div>
        </div>
        <div class="card-premium min-h-[300px] sm:h-[380px] flex flex-col" title="Frecuencia de envío de encuestas según la hora en que el dispositivo transmitió los datos al servidor (Métricas de Envío).">
          <div class="flex justify-between items-center mb-4">
            <h3 class="font-bold flex items-center gap-2 font-outfit text-sm">
              <i data-lucide="cloud-upload" class="text-brand-orange w-4 h-4"></i> Hora de Transmisión
            </h3>
          </div>
          <div class="flex-1 min-h-0 relative"><canvas id="chartHoraTransmision"></canvas></div>
        </div>
      </div>

      <!-- SECCIÓN 3: Tendencia Temporal (FINAL) -->
      <div class="grid grid-cols-1 gap-4 sm:gap-6">
        <div class="card-premium min-h-[350px] flex flex-col" title="Evolución temporal del volumen de recolección de datos según la fecha de realización de la entrevista.">
          <div class="flex justify-between items-center mb-4">
            <h3 class="font-bold flex items-center gap-2 font-outfit text-sm">
              <i data-lucide="activity" class="text-brand-blue w-4 h-4"></i> Tendencia Diaria de Recolección
            </h3>
          </div>
          <div class="flex-1 min-h-0 relative"><canvas id="chartPorDia"></canvas></div>
        </div>
      </div>
    </div>`}var yn=c((()=>{}));function bn(){return`
    <div id="tab-mapa" class="tab-content flex flex-col gap-4 hidden-tab animate-fade-in">
      <div id="mapSectionWrapper" class="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:h-[80vh] lg:min-h-[700px] transition-all duration-500">
        <!-- Leaflet Container -->
        <div id="mapDisplayContainer" class="lg:col-span-10 relative glass-panel rounded-xl overflow-hidden border border-slate-200 dark:border-white/5 shadow-inner">
          <div id="mapControlGroup"
            class="absolute bottom-4 right-4 z-[var(--z-map-control)] flex items-center bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-2xl transition-all">
            <button id="btnMapStateNormal" class="p-2.5 hover:bg-white/10 text-white border-r border-white/10 group" title="Normal">
              <i data-lucide="layout-dashboard" class="w-4 h-4 opacity-70 group-hover:opacity-100"></i>
            </button>
            <button id="btnMapStateExpanded" class="p-2.5 hover:bg-white/10 text-white border-r border-white/10 group" title="Expandido">
              <i data-lucide="maximize" class="w-4 h-4 opacity-70 group-hover:opacity-100"></i>
            </button>
            <button id="btnMapStateFull" class="p-2.5 hover:bg-white/10 text-white group" title="Completo">
              <i data-lucide="expand" class="w-4 h-4 opacity-70 group-hover:opacity-100"></i>
            </button>
          </div>

          <div id="mapView" class="absolute inset-0 z-[var(--z-map-base)] bg-slate-100 dark:bg-[#0B1120]"></div>

          <!-- Legend -->
          <div class="absolute bottom-12 left-4 z-[var(--z-map-overlay)] bg-white/90 dark:bg-[#0f172a]/95 backdrop-blur-md rounded-xl p-3 shadow-xl border border-slate-200 dark:border-white/10 text-[10px]">
            <div class="text-[9px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-widest mb-2 border-b border-slate-200 dark:border-slate-800 pb-1">Leyenda</div>
            <div class="flex flex-col gap-1.5">
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-[#10B981]"></span><span>Efectiva</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-[#F59E0B]"></span><span>No Respuesta</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-[#EF4444]"></span><span>Alertas</span>
              </div>
            </div>
          </div>

          <!-- Coverage Badge -->
          <div id="mapCoverageBadge" class="absolute top-2.5 left-2.5 z-[var(--z-map-overlay)] bg-brand-blue/90 backdrop-blur-md rounded-xl px-2.5 py-2 border border-white/20 text-[10px] hidden">
            <div class="flex flex-col sm:flex-row items-center gap-2">
              <div class="flex flex-col items-center">
                <span id="mapMunCount" class="text-white font-black text-xs">0</span><span class="text-[7px] text-white/70 uppercase">Mun</span>
              </div>
              <div class="flex flex-col items-center">
                <span id="mapParCount" class="text-white font-black text-xs">0</span><span class="text-[7px] text-white/70 uppercase">Parr</span>
              </div>
              <div class="flex flex-col items-center">
                <span id="mapNodoCount" class="text-white font-black text-xs">0</span><span class="text-[7px] text-white/70 uppercase">Nodos</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Side KPI Buttons -->
        <div id="mapKpiGrid" class="lg:col-span-2 grid grid-cols-2 sm:flex sm:flex-col gap-2">
          <!-- Toggle Button for Fullscreen Drawer -->
          <button id="btnToggleMapKpis" class="hidden glass-panel rounded-xl p-3 flex-col items-center justify-center border-2 border-brand-blue/30 group transition-all z-50 order-first sm:-order-none">
            <i data-lucide="layout-grid" class="w-5 h-5 text-brand-blue opacity-80"></i>
          </button>
          
          <button id="btnMapFilterAll" class="glass-panel rounded-xl p-3 flex items-center justify-between border-l-4 border-brand-blue hover:bg-slate-50 transition-all active-filter">
            <div class="flex items-center gap-1.5"><i data-lucide="layers" class="w-3.5 h-3.5 text-brand-blue opacity-80"></i><span class="text-[10px] font-bold uppercase">Todos</span></div>
            <span class="text-sm font-black" id="mapKpiPoints">0</span>
          </button>
          <button id="btnMapFilterEfectivas" class="glass-panel rounded-xl p-3 flex items-center justify-between border-l-4 border-brand-emerald">
            <div class="flex items-center gap-1.5"><i data-lucide="check-circle" class="w-3.5 h-3.5 text-brand-emerald opacity-80"></i><span class="text-[10px] font-bold uppercase">Efectivas</span></div>
            <span class="text-sm font-black" id="mapKpiComplete">0</span>
          </button>
          <button id="btnMapFilterNoRespuesta" class="glass-panel rounded-xl p-3 flex items-center justify-between border-l-4 border-brand-orange">
            <div class="flex items-center gap-1.5"><i data-lucide="help-circle" class="w-3.5 h-3.5 text-brand-orange opacity-80"></i><span class="text-[10px] font-bold uppercase">No Resp.</span></div>
            <span class="text-sm font-black" id="mapKpiNoRespuesta">0</span>
          </button>
          <button id="btnMapFilterAlertas" class="glass-panel rounded-xl p-3 flex items-center justify-between border-l-4 border-brand-red">
            <div class="flex items-center gap-1.5"><i data-lucide="shield-alert" class="w-3.5 h-3.5 text-brand-red opacity-80"></i><span class="text-[10px] font-bold uppercase">Alertas</span></div>
            <span class="text-sm font-black text-brand-red" id="mapKpiAlertas">0</span>
          </button>
          <button id="btnVerRutaEncuestador" disabled class="glass-panel rounded-xl p-3 flex items-center justify-between border-l-4 border-brand-orange disabled:opacity-40">
            <div class="flex items-center gap-1.5"><i data-lucide="route" class="w-3.5 h-3.5 text-brand-orange opacity-80"></i><span class="text-[10px] font-bold uppercase">Ver Ruta</span></div>
            <span id="mapRouteAgentCount" class="text-[10px] font-black">—</span>
          </button>
          <div class="glass-panel rounded-xl p-3 flex items-center justify-between border-l-4 border-brand-purple opacity-80">
            <div class="flex items-center gap-1.5"><i data-lucide="users" class="w-3.5 h-3.5 text-brand-purple opacity-80"></i><span class="text-[10px] font-bold uppercase">Encuestadores</span></div>
            <span class="text-sm font-black" id="mapKpiAgents">0</span>
          </div>
        </div>
      </div>

      <!-- Detail Grid (Stacked below) -->
      <div class="card-premium flex flex-col overflow-hidden p-0 lg:h-[85vh] lg:min-h-[750px] min-h-[600px] border border-slate-200 dark:border-white/5">
        <div class="p-5 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50 dark:bg-slate-900/50">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-brand-emerald/10 rounded-lg"><i data-lucide="database" class="text-brand-emerald w-5 h-5"></i></div>
            <div>
              <h3 class="font-bold font-outfit text-lg text-slate-800 dark:text-white">Motor de Datos Unificado</h3>
              <p class="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Explorador de registros</p>
            </div>
          </div>
          <div class="relative w-full sm:w-64">
            <i data-lucide="search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"></i>
            <input type="text" id="searchEncuesta" placeholder="Búsqueda rápida..."
              class="w-full bg-white dark:bg-[#0B1120] border border-slate-300 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs outline-none focus:ring-1" />
          </div>
        </div>
        <div class="flex-1 bg-white dark:bg-[#111827] relative">
          <div id="detailGrid" class="absolute inset-0 border-0"></div>
        </div>
      </div>
    </div>`}var xn=c((()=>{}));function Sn(){return`
    <div id="tab-ranking" class="tab-content flex flex-col gap-8 hidden-tab animate-fade-in">
      <!-- Resumen de Desempeño Global -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="glass-panel rounded-2xl p-4 border-l-4 border-brand-emerald">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-brand-emerald/10 rounded-lg"><i data-lucide="check-circle" class="text-brand-emerald w-5 h-5"></i></div>
            <div>
              <p class="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Efectivas</p>
              <h3 class="font-black font-outfit text-2xl" id="rankKpiEfectivas">0</h3>
            </div>
          </div>
        </div>
        <div class="glass-panel rounded-2xl p-4 border-l-4 border-brand-orange">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-brand-orange/10 rounded-lg"><i data-lucide="help-circle" class="text-brand-orange w-5 h-5"></i></div>
            <div>
              <p class="text-[10px] text-slate-500 uppercase font-bold tracking-widest">No Respuesta</p>
              <h3 class="font-black font-outfit text-2xl" id="rankKpiNoRespuesta">0</h3>
            </div>
          </div>
        </div>
        <div class="glass-panel rounded-2xl p-4 border-l-4 border-brand-red">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-brand-red/10 rounded-lg"><i data-lucide="alert-triangle" class="text-brand-red w-5 h-5"></i></div>
            <div>
              <p class="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Alertas Totales</p>
              <h3 class="font-black font-outfit text-2xl text-brand-red" id="rankKpiAlerts">0</h3>
            </div>
          </div>
        </div>
      </div>

      <div class="glass-panel rounded-2xl p-6 flex flex-col">
          <header class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-4 border-b border-slate-200/50 dark:border-white/5">
            <div class="flex items-center gap-3">
              <div class="p-2.5 bg-brand-orange/10 rounded-xl"><i data-lucide="award" class="text-brand-orange w-6 h-6"></i></div>
              <div>
                <h3 class="font-bold font-outfit text-xl text-slate-800 dark:text-white">Clasificación de Encuestadores</h3>
                <p class="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-0.5">Top por efectividad operativa</p>
              </div>
            </div>
            <div class="flex items-center gap-1 p-1 bg-slate-100 dark:bg-white/5 rounded-lg border border-slate-200/50">
              <button class="sort-btn px-2.5 py-1.5 text-[9px] font-black uppercase rounded-md active" data-sort="eficiencia">Eficiencia</button>
              <button class="sort-btn px-2.5 py-1.5 text-[9px] font-black uppercase rounded-md" data-sort="encuestas">Volumen</button>
            </div>
          </header>
          <div id="rankingTable" class="flex-1 border-0 custom-scrollbar"></div>
      </div>
    </div>`}var Cn=c((()=>{}));function wn(){return`
    <div id="tab-mm111" class="tab-content flex flex-col gap-4 sm:gap-6 hidden-tab lg:h-[calc(100vh-180px)] h-auto overflow-y-auto lg:overflow-visible">
      <!-- Cabecera Institucional y Geográfica -->
      <div class="glass-panel rounded-2xl p-4 sm:p-6 border-t-4 border-t-brand-blue flex flex-col gap-4 sm:gap-6 shadow-sm">
        <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center border-b border-slate-200 dark:border-slate-800 pb-4 gap-4">
          <div class="flex items-center gap-3 sm:gap-4 shrink-0">
            <div class="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 shrink-0">
              <svg class="w-6 h-6 sm:w-8 sm:h-8 text-slate-800 dark:text-white" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2">
                <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" />
                <path d="M14 2v6h6" />
                <path d="m3 12.5 5 5 9-9" />
              </svg>
            </div>
            <div>
              <h1 class="text-lg sm:text-2xl font-black font-outfit tracking-tight text-slate-800 dark:text-white leading-tight">
                Marco Maestro de Muestreo (VIV MM-111)</h1>
              <p class="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-widest mt-0.5">(CRTE) - INSTITUTO NACIONAL DE ESTADÍSTICA</p>
            </div>
          </div>

          <div class="lg:mt-0 flex flex-col items-stretch lg:items-end w-full lg:w-auto">
            <label class="text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1.5 ml-1 lg:text-right flex items-center lg:justify-end gap-2">
              Seleccionar Planilla Física (Control Nro.)
              <span id="mm111FilteredCount" class="bg-brand-blue/10 text-brand-blue px-2 py-0.5 rounded-md text-[9px] font-black border border-brand-blue/20">0</span>
            </label>
            <div class="flex items-center gap-2">
              <div class="relative flex-1 lg:w-80 group">
                <i data-lucide="search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brand-blue transition-colors"></i>
                <input type="text" id="mm111SearchControl" autocomplete="off" placeholder="Buscar Control..."
                  class="w-full bg-slate-50 dark:bg-[#0B1120] border-2 border-brand-blue/30 rounded-xl pl-10 pr-10 py-2.5 text-sm text-slate-800 dark:text-white font-bold outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 transition-all font-outfit" />
                
                <button id="mm111ClearSearch" class="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hidden">
                   <i data-lucide="x" class="w-4 h-4"></i>
                </button>

                <!-- Search Results Dropdown -->
                <div id="mm111SearchResults" class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl z-[100] max-h-64 overflow-y-auto hidden glass-panel">
                  <div class="p-2 space-y-1" id="mm111ResultsList">
                    <!-- Results will be injected here -->
                  </div>
                </div>
              </div>
              <button id="btnLoadMM111" class="btn-primary py-2.5 px-4 sm:px-6 shadow-lg shadow-brand-blue/20 flex items-center gap-2">
                <i data-lucide="map-pin" class="w-4 h-4"></i>
                <span>Localizar</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Segmento Geográfico -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="p-3 bg-slate-50 dark:bg-[#0B1120]/60 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <div>
              <p class="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Entidad Federal</p>
              <p class="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1 truncate" id="mm111Entidad">---</p>
            </div>
            <div class="bg-slate-200 dark:bg-slate-800 px-3 py-1.5 rounded-lg text-xs font-black font-outfit border border-slate-300 dark:border-slate-700" id="mm111EntidadCod">--</div>
          </div>
          <div class="p-3 bg-slate-50 dark:bg-[#0B1120]/60 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <div>
              <p class="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Municipio</p>
              <p class="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1 truncate" id="mm111Municipio">---</p>
            </div>
            <div class="bg-slate-200 dark:bg-slate-800 px-3 py-1.5 rounded-lg text-xs font-black font-outfit border border-slate-300 dark:border-slate-700" id="mm111MunicipioCod">--</div>
          </div>
          <div class="p-3 bg-slate-50 dark:bg-[#0B1120]/60 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <div>
              <p class="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Parroquia</p>
              <p class="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1 truncate" id="mm111Parroquia">---</p>
            </div>
            <div class="bg-slate-200 dark:bg-slate-800 px-3 py-1.5 rounded-lg text-xs font-black font-outfit border border-slate-300 dark:border-slate-700" id="mm111ParroquiaCod">--</div>
          </div>
          <div class="p-3 bg-slate-50 dark:bg-[#0B1120]/60 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <div>
              <p class="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Centro Poblado</p>
              <p class="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1 truncate" id="mm111CPoblado">---</p>
            </div>
            <div class="bg-slate-200 dark:bg-slate-800 px-3 py-1.5 rounded-lg text-xs font-black font-outfit border border-slate-300 dark:border-slate-700" id="mm111CPobladoCod">--</div>
          </div>
        </div>

        <!-- Barra de Controles Operativos -->
        <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-[1px] bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
          <div class="px-4 py-3 flex flex-col items-center justify-center text-center bg-slate-100 dark:bg-[#0B1120]">
            <span class="text-[9px] uppercase font-bold text-slate-500">Segmento</span>
            <div class="text-sm font-black font-outfit mt-1 text-slate-800 dark:text-slate-300" id="mm111Segmento">-</div>
          </div>
          <div class="px-4 py-3 flex flex-col items-center justify-center text-center bg-slate-100 dark:bg-[#0B1120]">
            <span class="text-[9px] uppercase font-bold text-slate-500">Sector</span>
            <div class="text-sm font-black font-outfit mt-1 text-slate-800 dark:text-slate-300" id="mm111Sector">-</div>
          </div>
          <div class="px-4 py-3 flex flex-col items-center justify-center text-center bg-slate-100 dark:bg-[#0B1120]">
            <span class="text-[9px] uppercase font-bold text-slate-500">Nodo</span>
            <div class="text-sm font-black font-outfit mt-1 text-slate-800 dark:text-slate-300" id="mm111Nodo">-</div>
          </div>
          <div class="px-4 py-3 flex flex-col items-center justify-center text-center bg-slate-100 dark:bg-[#0B1120]">
            <span class="text-[9px] uppercase font-bold text-slate-500">Semana</span>
            <div class="text-sm font-black font-outfit mt-1 text-slate-800 dark:text-slate-300" id="mm111Semana">-</div>
          </div>
          <div class="px-4 py-3 flex flex-col items-center justify-center text-center bg-slate-100 dark:bg-[#0B1120] col-span-2 sm:col-span-4 lg:col-span-1">
            <span class="text-[9px] uppercase font-bold text-slate-500">Control Maestro</span>
            <div class="text-sm font-black font-outfit mt-1 text-slate-800 dark:text-slate-300 truncate w-full" id="mm111ControlMaestro">-</div>
          </div>
          <div class="px-4 py-3 flex flex-col items-center justify-center text-center bg-[#FDE68A] dark:bg-[#FBBF24]">
            <span class="text-[10px] uppercase font-black text-[#92400E]">Control Nro.</span>
            <div class="text-lg font-black font-outfit text-[#78350F]" id="mm111ControlNro">0000</div>
          </div>
          <div class="px-4 py-3 flex flex-col items-center justify-center text-center bg-slate-100 dark:bg-[#0B1120]">
            <span class="text-[9px] uppercase font-bold text-slate-500">Lote</span>
            <div class="text-sm font-black font-outfit mt-1 text-slate-800 dark:text-slate-300" id="mm111Lote">-</div>
          </div>
        </div>
      </div>

      <!-- Tabla de Listado de Viviendas -->
      <div class="card-premium flex-1 flex flex-col p-0 overflow-hidden border-2 border-slate-200 dark:border-slate-700 mt-4 relative min-h-[500px] lg:min-h-0">
        <div id="mm111Grid" class="w-full h-full bg-white dark:bg-[#0B1120]"></div>
      </div>
    </div>`}var Tn=c((()=>{}));function En(){return`
    <div id="tab-inconsistencias" class="tab-content flex flex-col gap-4 sm:gap-6 hidden-tab lg:h-[calc(100vh-180px)] h-auto overflow-y-auto lg:overflow-visible">
      <div class="flex justify-between items-end px-2">
        <div>
          <h2 class="text-2xl font-black font-outfit text-slate-900 dark:text-white">Motor de Inconsistencias</h2>
          <p class="text-sm text-slate-500">Detección automática de anomalías en el levantamiento.</p>
        </div>
      </div>

      <!-- Cards resumen por tipo de alerta -->
      <div id="inconsistenciasCards" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3"></div>

      <!-- Tabla de detalle de registros con alertas -->
      <div id="inconsistenciasContainer" class="card-premium flex flex-col overflow-hidden p-0 min-h-[500px] lg:min-h-0">
        <div class="p-5 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50 dark:bg-slate-900/50">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-brand-red/10 rounded-lg"><i data-lucide="shield-alert" class="text-brand-red w-5 h-5"></i></div>
            <h3 class="font-bold font-outfit text-lg text-slate-800 dark:text-white">Registros con Alertas</h3>
          </div>
          <div class="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <select id="incFilterAlerta" class="bg-white dark:bg-[#0B1120] border rounded-xl px-3 py-2 text-xs outline-none focus:ring-1">
                <option value="">Todas las alertas</option>
            </select>
            <div class="relative w-full sm:w-64">
              <i data-lucide="search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"></i>
              <input type="text" id="incSearchInput" placeholder="Buscar..." class="w-full bg-white dark:bg-[#0B1120] border rounded-xl pl-10 pr-8 py-2 text-xs outline-none" />
              <button id="incClearSearch" class="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hidden"><i data-lucide="x" class="w-4 h-4"></i></button>
            </div>
          </div>
        </div>
        <div id="inconsistenciasTable" class="w-full" style="height: 500px;"></div>
      </div>
    </div>`}var Dn=c((()=>{}));function On(){return`
    <div id="loadingOverlay"
      class="fixed inset-0 z-[var(--z-loader)] bg-[#0B1120]/90 backdrop-blur-xl flex flex-col items-center justify-center gap-6 pointer-events-none opacity-0 transition-opacity duration-500">
      <div class="relative w-16 h-16">
        <div class="absolute inset-0 rounded-full border-t-2 border-brand-blue animate-spin"></div>
        <div class="absolute inset-2 rounded-full border-r-2 border-brand-purple animate-spin"
          style="animation-direction: reverse; animation-duration: 1.5s;"></div>
        <i data-lucide="database-zap" class="absolute inset-0 m-auto text-slate-400 w-6 h-6 animate-pulse"></i>
      </div>
      <div class="text-center">
        <h3 class="font-outfit font-bold text-lg text-white mb-1">Cargando Datasets</h3>
        <p id="loadingMsg" class="text-xs font-medium text-slate-400 font-inter uppercase tracking-widest">Procesando vectores...</p>
      </div>
    </div>`}var kn=c((()=>{}));function An(){return`
    <div id="errorState"
      class="hidden fixed inset-0 z-[120] bg-[#0B1120]/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center">
      <div
        class="w-24 h-24 bg-brand-red/10 rounded-full flex items-center justify-center mb-6 ring-[12px] ring-brand-red/5 animate-pulse">
        <i data-lucide="power-off" class="text-brand-red w-10 h-10"></i>
      </div>
      <h2 class="text-4xl font-black font-outfit text-white mb-3">Conexión Caída</h2>
      <p id="errorMsg"
        class="text-slate-400 max-w-md mb-8 text-sm leading-relaxed border border-slate-800 bg-slate-900/50 p-4 rounded-xl">
        Error crítico al intentar obtener los datasets desde el servidor local.
      </p>
      <button id="btnRetryConnection" class="btn-primary px-8 py-3 text-lg font-bold">
        <i data-lucide="refresh-cw" class="w-5 h-5"></i> Forzar Reintento
      </button>
    </div>`}var jn=c((()=>{}));function Mn(){return`
    <div id="filtersOverlay"
      class="fixed inset-0 z-[var(--z-offcanvas)] bg-slate-900/20 dark:bg-[#0B1120]/40 hidden backdrop-blur-sm transition-opacity opacity-0"
      aria-hidden="true"></div>

    <div id="offCanvasFilters"
      class="fixed inset-y-0 right-0 z-[var(--z-offcanvas)] w-full sm:w-[400px] border-l border-slate-200 dark:border-white/10 transform translate-x-full transition-transform duration-300 ease-out flex flex-col shadow-[-10px_0_40px_rgba(0,0,0,0.1)] dark:shadow-[-10px_0_40px_rgba(0,0,0,0.5)] bg-white dark:bg-[#0f172a]"
      role="dialog" aria-modal="true" aria-labelledby="filtersTitle">

      <!-- Background glow elements -->
      <div class="absolute top-0 right-0 w-64 h-64 bg-brand-blue/10 rounded-full blur-[80px] pointer-events-none"></div>

      <div class="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800/80 relative z-10">
        <div>
          <h3 id="filtersTitle" class="font-outfit font-black text-xl text-slate-800 dark:text-white flex items-center gap-2">
            <i data-lucide="settings-2" class="text-brand-blue w-6 h-6"></i> Reglas de Filtrado
          </h3>
          <p class="text-[10px] text-slate-400 font-medium uppercase tracking-widest mt-1">Refina el bloque de datos</p>
        </div>
        <button id="btnCloseFilters" class="p-2.5 bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 rounded-xl border border-slate-200 dark:border-slate-700 transition-all">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>

      <div class="flex-1 overflow-y-auto p-6 flex flex-col gap-8 relative z-10 custom-scrollbar">
        <!-- Contexto Geográfico -->
        <div class="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-5 border border-slate-200 dark:border-slate-800">
          <h4 class="text-xs uppercase font-black text-slate-400 tracking-widest flex items-center gap-2 mb-4">
            <i data-lucide="map-pinned" class="w-3.5 h-3.5 text-brand-blue"></i> Geografía
          </h4>
          <div class="space-y-4">
            <div>
              <label class="block text-[11px] font-bold text-slate-500 mb-1.5 ml-1">Municipio</label>
              <select id="filterMunicipio" class="w-full bg-white dark:bg-[#0B1120] border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-blue">
                <option value="">Todos los municipios</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-slate-500 mb-1.5 ml-1">Parroquia</label>
              <select id="filterParroquia" class="w-full bg-white dark:bg-[#0B1120] border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-blue">
                <option value="">Todas las parroquias</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-slate-500 mb-1.5 ml-1">Nodo / Zona</label>
              <select id="filterNodo" class="w-full bg-white dark:bg-[#0B1120] border rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-blue">
                <option value="">Todos los nodos</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Parámetros Estructurales -->
        <div class="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-5 border border-slate-200 dark:border-slate-800">
          <h4 class="text-xs uppercase font-black text-slate-400 tracking-widest flex items-center gap-2 mb-4">
            <i data-lucide="home" class="w-3.5 h-3.5 text-brand-purple"></i> Estructura
          </h4>
          <div class="space-y-4">
            <div>
              <label class="block text-[11px] font-bold text-slate-500 mb-1.5 ml-1">Estado Operativo</label>
              <select id="filterEstado" class="w-full bg-white dark:bg-[#0B1120] border rounded-lg px-3 py-2 text-sm outline-none">
                <option value="">Todas</option>
                <option value="completada">Completada (Efectiva)</option>
                <option value="parcial">No Respuestas / Rechazo</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-slate-500 mb-1.5 ml-1">Clasificación de Vivienda (A, B, C, E)</label>
              <select id="filterClasificacion" class="w-full bg-white dark:bg-[#0B1120] border rounded-lg px-3 py-2 text-sm outline-none">
                <option value="">Todas las categorías</option>
                <option value="TIPO A">TIPO A - Ausentes / Rechazos</option>
                <option value="TIPO B">TIPO B - Desocupadas / Construcción</option>
                <option value="TIPO C">TIPO C - Inexistentes / Demolidas</option>
                <option value="TIPO E">TIPO E - Entrevistas Efectivas</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-slate-500 mb-1.5 ml-1">Condición de Ocupación</label>
              <select id="filterCondicion" class="w-full bg-white dark:bg-[#0B1120] border rounded-lg px-3 py-2 text-sm outline-none">
                <option value="">Todas</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-slate-500 mb-1.5 ml-1">Tipología Vivienda</label>
              <select id="filterSituacionVivienda" class="w-full bg-white dark:bg-[#0B1120] border rounded-lg px-3 py-2 text-sm outline-none">
                <option value="">Todas</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-slate-500 mb-1.5 ml-1">Uso Registrado</label>
              <select id="filterUso" class="w-full bg-white dark:bg-[#0B1120] border rounded-lg px-3 py-2 text-sm outline-none">
                <option value="">Todos</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Metadatos -->
        <div class="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-5 border border-slate-200 dark:border-slate-800">
          <h4 class="text-xs uppercase font-black text-slate-400 tracking-widest flex items-center gap-2 mb-4">
            <i data-lucide="tag" class="w-3.5 h-3.5 text-brand-orange"></i> Metadatos
          </h4>
          <div class="space-y-4">
            <div>
              <label class="block text-[11px] font-bold text-slate-500 mb-1.5 ml-1">Agrupación Semanal</label>
              <select id="filterSemana" class="w-full bg-white dark:bg-[#0B1120] border rounded-lg px-3 py-2 text-sm outline-none">
                <option value="">Consolidado global</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-slate-500 mb-1.5 ml-1">Supervisor Control</label>
              <select id="filterControl" class="w-full bg-white dark:bg-[#0B1120] border rounded-lg px-3 py-2 text-sm outline-none">
                <option value="">Todos</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-slate-500 mb-1.5 ml-1">Hora de Inicio (Campo)</label>
              <select id="filterHoraInicio" class="w-full bg-white dark:bg-[#0B1120] border rounded-lg px-3 py-2 text-sm outline-none">
                <option value="">Cualquier hora</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-slate-500 mb-1.5 ml-1">Hora de Transmisión</label>
              <select id="filterHoraTransmision" class="w-full bg-white dark:bg-[#0B1120] border rounded-lg px-3 py-2 text-sm outline-none">
                <option value="">Cualquier hora</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-slate-500 mb-1.5 ml-1">Alertas Detectadas</label>
              <select id="filterAlerta" class="w-full bg-white dark:bg-[#0B1120] border rounded-lg px-3 py-2 text-sm outline-none">
                <option value="">Todas las alertas</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="p-6 bg-white dark:bg-[#0f172a] border-t border-slate-100 dark:border-slate-800/80 z-10 flex gap-3">
        <button id="btnResetOffcanvas" class="group flex items-center justify-center gap-2 py-3.5 px-4 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-500 hover:text-brand-orange hover:border-brand-orange/30 transition-all text-xs font-bold uppercase flex-1">
          <i data-lucide="brush-cleaning" class="w-4 h-4 group-hover:-rotate-12 transition-transform"></i> Limpiar
        </button>
        <button id="btnApplyFilters" class="btn-primary flex-[2] py-3.5 text-xs font-bold uppercase">
          <i data-lucide="check" class="w-4 h-4"></i> Aplicar Parámetros
        </button>
      </div>
    </div>`}var Nn=c((()=>{}));function Pn(){return`
    <div id="detailModal" class="hidden fixed inset-0 z-[var(--z-modal)] flex items-center justify-center">
      <div class="absolute inset-0 bg-[#0B1120]/80 backdrop-blur-md" id="detailModalBackdrop"></div>
      <div
        class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-0 rounded-xl sm:rounded-2xl z-10 w-[95%] sm:w-11/12 max-w-7xl text-slate-800 dark:text-slate-200 shadow-2xl overflow-hidden flex flex-col transform transition-all scale-95 opacity-0"
        id="detailModalPane" role="dialog" aria-modal="true" aria-labelledby="detailModalTitle">
        <div class="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/50">
          <h3 id="detailModalTitle" class="font-outfit font-black text-xl text-slate-900 dark:text-white flex items-center gap-3">
            <i data-lucide="file-json" class="text-brand-purple w-6 h-6"></i> Ficha de Inspección
          </h3>
          <div class="flex items-center gap-2">
            <button id="btnDetailExpand" class="p-2 bg-white dark:bg-slate-800 rounded-lg text-slate-500 hover:text-slate-900 transition-all border border-slate-200 dark:border-slate-700">
              <i data-lucide="maximize" id="detailModalExpandIcon" class="w-4 h-4"></i>
            </button>
            <button id="btnDetailClose" class="p-2 bg-white dark:bg-slate-800 rounded-lg text-slate-500 hover:text-slate-900 transition-all border border-slate-200 dark:border-slate-700">
              <i data-lucide="x" class="w-4 h-4"></i>
            </button>
          </div>
        </div>
        <div id="detailModalBody" class="overflow-y-auto max-h-[75vh] p-6 text-sm font-inter custom-scrollbar" tabindex="0">
          <!-- Inject dynamic content here -->
        </div>
      </div>
    </div>`}var Fn=c((()=>{}));function In(){let e=s(`mainContent`),t=document.body;if(!e){console.error(`Layout Error: mainContent element not found.`);return}let n=[vn(),bn(),Sn(),wn(),En()].join(``);e.insertAdjacentHTML(`beforeend`,n);let r=[On(),An(),Mn(),Pn()].join(``);t.insertAdjacentHTML(`beforeend`,r),console.log(`UI Layout: All components injected successfully ✓`)}var Ln=c((()=>{e(),yn(),xn(),Cn(),Tn(),Dn(),kn(),jn(),Nn(),Fn()}));function Rn(){let e=localStorage.getItem(`esca_theme`),t=!0;e===`light`?t=!1:e===`dark`&&(t=!0),zn(t);let n=s(`btnThemeToggle`);n&&n.addEventListener(`click`,()=>{zn(!document.documentElement.classList.contains(`dark`))})}function zn(e){e?(document.documentElement.classList.add(`dark`),localStorage.setItem(`esca_theme`,`dark`)):(document.documentElement.classList.remove(`dark`),localStorage.setItem(`esca_theme`,`light`)),$t(e)}var Bn=c((()=>{e(),_n()}));function Vn(){let e=l.filtered.filter(e=>e._meta&&e._meta.estado===`completada`).length,t=l.filtered.length-e,n=new Set(l.filtered.map(e=>e._meta.cedula)).size,i=l.filtered.filter(e=>e._meta.estado===`completada`).map(e=>e._meta.durMin).filter(e=>e!==null),a=i.length?r(i):0,o=l.filtered.reduce((e,t)=>e+(t._meta.totalPers||0),0),c=l.filtered.reduce((e,t)=>e+(t._meta.hogaresUniPersonales||0),0),u=new Set(l.filtered.map(e=>e._meta.control)).size,d=l.filtered.reduce((e,t)=>e+(t._meta.totalHombres||0),0),f=l.filtered.reduce((e,t)=>e+(t._meta.totalMujeres||0),0),p=new Set(l.filtered.map(e=>e._meta.mun)).size,m=l.filtered.filter(e=>e._meta&&e._meta.tipo_vivienda===`TIPO A`).length,h=l.filtered.filter(e=>e._meta&&e._meta.tipo_vivienda===`TIPO B`).length,g=l.filtered.filter(e=>e._meta&&e._meta.tipo_vivienda===`TIPO C`).length,_=l.filtered.filter(e=>e._meta&&e._meta.tipo_vivienda===`TIPO E`).length,v=l.filtered.filter(e=>e._meta&&e._meta.tipo_vivienda===`NO DEFINIDO`).length,y=l.filtered.length||1,b=Math.round(m/y*100),x=Math.round(h/y*100),S=Math.round(g/y*100),C=Math.round(_/y*100),w=Math.round(v/y*100);s(`kpiTotal`)&&(s(`kpiTotal`).textContent=l.filtered.length),s(`kpiCompletadas`)&&(s(`kpiCompletadas`).textContent=e),s(`kpiNoRespuesta`)&&(s(`kpiNoRespuesta`).textContent=t),s(`kpiEncuestadores`)&&(s(`kpiEncuestadores`).textContent=n),s(`kpiDuracion`)&&(s(`kpiDuracion`).textContent=a?`${Math.round(a)} min`:`N/A`),s(`kpiPersonas`)&&(s(`kpiPersonas`).textContent=o),s(`kpiHogaresUni`)&&(s(`kpiHogaresUni`).textContent=c),s(`kpiControles`)&&(s(`kpiControles`).textContent=u),s(`kpiHombres`)&&(s(`kpiHombres`).textContent=d),s(`kpiMujeres`)&&(s(`kpiMujeres`).textContent=f),s(`kpiMunicipios`)&&(s(`kpiMunicipios`).textContent=p),s(`kpiTipoA`)&&(s(`kpiTipoA`).textContent=m),s(`pctTipoA`)&&(s(`pctTipoA`).textContent=`${b}%`),s(`kpiTipoB`)&&(s(`kpiTipoB`).textContent=h),s(`pctTipoB`)&&(s(`pctTipoB`).textContent=`${x}%`),s(`kpiTipoC`)&&(s(`kpiTipoC`).textContent=g),s(`pctTipoC`)&&(s(`pctTipoC`).textContent=`${S}%`),s(`kpiTipoE`)&&(s(`kpiTipoE`).textContent=_),s(`pctTipoE`)&&(s(`pctTipoE`).textContent=`${C}%`),s(`kpiTipoND`)&&(s(`kpiTipoND`).textContent=v),s(`pctTipoND`)&&(s(`pctTipoND`).textContent=`${w}%`);let T=l.filtered.length/(n*8||1);s(`kpiEncPerHour`)&&(s(`kpiEncPerHour`).textContent=T.toFixed(1));let E={};l.filtered.forEach(e=>{let t=e._meta&&e._meta.nombre||`Desconocido`;E[t]=(E[t]||0)+1});let D=Object.entries(E).sort((e,t)=>t[1]-e[1])[0]||[`--`,0];s(`kpiTopProducer`)&&(s(`kpiTopProducer`).textContent=String(D[0]).split(` `)[0]),s(`kpiTopProducerVal`)&&(s(`kpiTopProducerVal`).textContent=`${D[1]} encuestas`);let O=l.filtered.filter(e=>e._meta&&e._meta.hasAlerts).length,k=l.filtered.length>0?Math.round(e/l.filtered.length*100):0,A=l.filtered.length>0?Math.round(O/l.filtered.length*100):0;s(`kpiTasaEfectividad`)&&(s(`kpiTasaEfectividad`).textContent=`${k}%`),s(`kpiTotalAlertas`)&&(s(`kpiTotalAlertas`).textContent=O),s(`kpiTasaAlerta`)&&(s(`kpiTasaAlerta`).textContent=`${A}%`);let j={};l.filtered.forEach(e=>{e._meta&&e._meta.hora!==null&&(j[e._meta.hora]=(j[e._meta.hora]||0)+1)});let M=Object.entries(j).sort((e,t)=>t[1]-e[1])[0]||[null,0];s(`kpiPeakHour`)&&(s(`kpiPeakHour`).textContent=M[0]===null?`--`:`${M[0]}:00`);let N=s(`inputMetaDiaria`),ee=n*(N&&!isNaN(Number(N.value))&&Number(N.value)>0?Number(N.value):20),P=Math.min(100,l.filtered.length/(ee||1)*100);s(`kpiMetaProgreso`)&&(s(`kpiMetaProgreso`).textContent=`${Math.round(P)}%`),s(`kpiMetaBar`)&&(s(`kpiMetaBar`).style.width=`${P}%`),s(`rankKpiEfectivas`)&&(s(`rankKpiEfectivas`).textContent=e),s(`rankKpiNoRespuesta`)&&(s(`rankKpiNoRespuesta`).textContent=t),s(`rankKpiAlerts`)&&(s(`rankKpiAlerts`).textContent=O)}var Hn=c((()=>{m(),e()}));function Un(e){if(!e)return;let t=s(`mainTabs`);t&&t.querySelectorAll(`.tab-btn`).forEach(t=>{let n=t.dataset.tab===e;t.classList.toggle(`tab-btn-active`,n),t.classList.toggle(`active`,n)}),document.querySelectorAll(`.tab-content`).forEach(t=>{t.classList.toggle(`hidden-tab`,t.id!==e)}),e===`tab-mapa`&&(l.map||gt(),setTimeout(()=>{l.map.invalidateSize(),setTimeout(()=>{let e=!1;Q[`tab-mapa`]||(Q[`tab-mapa`]=!0,Xe(),e=!0),St(),l.detailTable&&!e&&l.detailTable.redraw(!0),window.lucide&&window.lucide.createIcons()},200)},50)),e===`tab-ranking`&&(Q[`tab-ranking`]?l.rankingTabulator&&setTimeout(()=>l.rankingTabulator.redraw(!0),50):(Q[`tab-ranking`]=!0,setTimeout(()=>Qe(),100))),e===`tab-mm111`&&(l.mm111Table&&l.mm111Table.redraw(),!l.mm111Table&&l.filtered.length>0&&It()),setTimeout(()=>{Object.values(l.charts).forEach(e=>{e&&typeof e.resize==`function`&&(e.update(`none`),e.resize())}),window.dispatchEvent(new Event(`resize`))},50),window.lucide&&window.lucide.createIcons()}var Q,Wn=c((()=>{m(),e(),wt(),et(),Rt(),Qt(),Q={}}));function $(e){let t=s(`mapSectionWrapper`),n=s(`mapKpiGrid`),r=s(`mapDisplayContainer`),i=n?n.querySelector(`.header-label`):null;if(!t||!n||!r)return;document.body.classList.remove(`has-map-fullscreen`),t.className=`flex flex-col lg:grid lg:grid-cols-12 gap-4 sm:gap-8 transition-all duration-500 overflow-visible items-stretch`,r.className=`lg:col-span-10 relative transition-all duration-500 rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-slate-900`,n.className=`lg:col-span-2 transition-all duration-500 overflow-visible flex flex-col gap-3`,i&&(i.className=`header-label text-[9px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-widest ml-1 mb-1`);let a=s(`btnToggleMapKpis`);if(a&&a.classList.add(`hidden`),n.querySelectorAll(`button:not(#btnToggleMapKpis), div.glass-panel`).forEach(e=>{e.className=e.id===`btnVerRutaEncuestador`?`glass-panel rounded-xl p-3 flex items-center justify-between border-l-4 border-brand-orange hover:bg-brand-orange/5 transition-all group active:scale-[.98] disabled:opacity-40 disabled:cursor-not-allowed`:`glass-panel rounded-xl p-3 flex items-center justify-between border-l-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-all group`,e.id===`btnMapFilterAll`&&e.classList.add(`border-brand-blue`,`dark:border-brand-blue`),e.id===`btnMapFilterEfectivas`&&e.classList.add(`border-brand-emerald`,`dark:border-brand-emerald`),e.id===`btnMapFilterNoRespuesta`&&e.classList.add(`border-brand-orange`,`dark:border-brand-orange`),e.id===`btnMapFilterAlertas`&&e.classList.add(`border-brand-red`,`dark:border-brand-red`),(e.classList.contains(`opacity-80`)||e.id===`kpiMapEncuestadorContainer`)&&e.classList.add(`border-brand-purple`,`dark:border-brand-purple`);let t=e.querySelector(`span.uppercase`);t&&t.classList.remove(`hidden`)}),e===`normal`)t.classList.add(`h-auto`,`lg:h-[88vh]`,`lg:min-h-[700px]`),r.classList.add(`h-[500px]`,`lg:h-auto`,`lg:col-span-10`),n.classList.add(`grid`,`grid-cols-2`,`sm:flex`,`sm:flex-col`,`gap-2`),i&&i.classList.add(`hidden`,`sm:block`),n.querySelectorAll(`:scope > button, :scope > div.glass-panel`).forEach(e=>{e.id!==`btnToggleMapKpis`&&e.classList.add(`flex-row`,`items-center`,`justify-between`)});else if(e===`expanded`)t.className=`flex flex-col items-center gap-6 transition-all duration-500 w-full mb-8`,r.className=`w-full h-[75vh] relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10`,n.className=`flex flex-wrap sm:flex-nowrap grid grid-cols-2 sm:flex flex-row gap-2 sm:gap-8 mt-4 sm:mt-6 mx-auto max-w-[95%] sm:max-w-fit bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-white/10 px-4 sm:px-10 py-1.5 sm:py-2 shadow-2xl`,i&&i.classList.add(`hidden`),n.querySelectorAll(`:scope > button, :scope > div.glass-panel`).forEach(e=>{e.id!==`btnToggleMapKpis`&&e.classList.add(`flex-col`,`items-center`,`justify-center`,`min-w-0`,`sm:min-w-[130px]`,`flex-1`,`border-l-0`,`border-b-2`,`sm:border-b-4`,`gap-0.5`,`py-1`,`sm:py-1.5`,`px-2`)});else if(e===`full`){r.className=`map-fullscreen fixed inset-0 z-[var(--z-map-full)] bg-slate-900`,document.body.classList.add(`has-map-fullscreen`),n.className=`flex flex-col-reverse sm:flex-row fixed bottom-40 sm:bottom-6 left-4 sm:left-1/2 sm:-translate-x-1/2 z-[var(--z-map-full-controls)] gap-2 transition-all duration-300 items-start sm:items-center w-auto sm:max-w-fit`;let e=s(`btnToggleMapKpis`);e&&e.classList.remove(`hidden`),i&&i.classList.add(`hidden`),n.querySelectorAll(`:scope > button, :scope > div.glass-panel`).forEach(e=>{if(e.id===`btnToggleMapKpis`)return;e.classList.add(`flex`,`flex-col`,`items-center`,`justify-center`,`min-w-[55px]`,`sm:min-w-[75px]`,`border-2`,`rounded-xl`,`shadow-lg`,`gap-0`,`p-2`);let t=e.querySelector(`span.uppercase`);t&&t.classList.add(`hidden`),e.classList.add(`kpi-drawer-item`)}),n.classList.add(`kpi-drawer-collapsed`)}[`Normal`,`Expanded`,`Full`].forEach(t=>{let n=s(`btnMapState${t}`);if(n){let r=e===t.toLowerCase();n.classList.toggle(`bg-white/30`,r)}}),window.lucide&&window.lucide.createIcons(),setTimeout(()=>{l.map&&l.map.invalidateSize()},600)}var Gn=c((()=>{m(),e()}));function Kn(e){let{onProcessData:t}=e,n=()=>{g(),[`filterINE`,`filterSEGEN`].forEach(e=>{s(e)&&s(e).classList.remove(`active`,`bg-brand-emerald`,`bg-brand-purple`,`text-white`,`border-brand-emerald`,`border-brand-purple`)}),l.filterINE=!1,l.filterSEGEN=!1};s(`btnReset`)&&(s(`btnReset`).onclick=n),s(`btnResetOffcanvas`)&&(s(`btnResetOffcanvas`).onclick=n),s(`btnRefresh`)&&s(`btnRefresh`).addEventListener(`click`,()=>{let e=s(`assetSelect`).value;e&&I(e,t)}),s(`btnRetryConnection`)&&s(`btnRetryConnection`).addEventListener(`click`,()=>F(t)),s(`assetSelect`)&&s(`assetSelect`).addEventListener(`change`,e=>I(e.target.value,t)),s(`searchEncuesta`)&&s(`searchEncuesta`).addEventListener(`input`,()=>C()),s(`btnOpenFilters`)&&(s(`btnOpenFilters`).onclick=Te),s(`btnCloseFilters`)&&s(`btnCloseFilters`).addEventListener(`click`,z),s(`filtersOverlay`)&&s(`filtersOverlay`).addEventListener(`click`,z),s(`btnApplyFilters`)&&s(`btnApplyFilters`).addEventListener(`click`,()=>{z(),C()});let r=(e,t,n,r,i)=>{let a=s(e);a&&(a.onclick=()=>{l[t]=!l[t],l[t]&&(l[i]=!1),a.classList.toggle(`active`,l[t]),a.classList.toggle(n,l[t]),a.classList.toggle(`text-white`,l[t]),a.classList.toggle(`border-${n.split(`-`)[1]}-${n.split(`-`)[2]}`,l[t]);let e=s(r);e&&e.classList.remove(`active`,`bg-brand-emerald`,`bg-brand-purple`,`text-white`,`border-brand-emerald`,`border-brand-purple`),C()})};r(`filterINE`,`filterINE`,`bg-brand-emerald`,`filterSEGEN`,`filterSEGEN`),r(`filterSEGEN`,`filterSEGEN`,`bg-brand-purple`,`filterINE`,`filterINE`),[`filterEncuestador`,`filterFechaInicio`,`filterFechaFin`,`filterHoraTransmision`,`filterHoraInicio`].forEach(e=>{s(e)&&s(e).addEventListener(`change`,C)});let i=s(`inputMetaDiaria`);if(i){try{let e=localStorage.getItem(`esca_meta_diaria`);e&&!isNaN(Number(e))&&(i.value=e)}catch{}i.addEventListener(`input`,()=>{try{localStorage.setItem(`esca_meta_diaria`,i.value)}catch{}Vn()})}s(`filterMunicipio`)&&s(`filterMunicipio`).addEventListener(`change`,()=>{let e=s(`filterMunicipio`).value,t=s(`filterParroquia`),n=s(`filterNodo`);if(!t||!n)return;t.innerHTML=`<option value="">Todas</option>`,n.innerHTML=`<option value="">Todos</option>`;let r=new Set,i=new Set;l.rawData.forEach(t=>{t._meta&&(e===``||t._meta.mun===e)&&(t._meta.par&&r.add(t._meta.par),t._meta.nodo&&i.add(t._meta.nodo))}),[...r].sort().forEach(e=>{let n=document.createElement(`option`);n.value=e,n.textContent=e,t.appendChild(n)}),[...i].sort().forEach(e=>{let t=document.createElement(`option`);t.value=e,t.textContent=e,n.appendChild(t)})}),Object.entries({All:`all`,Efectivas:`efectivas`,NoRespuesta:`no_respuesta`,Alertas:`alertas`}).forEach(([e,t])=>{let n=s(`btnMapFilter${e}`);n&&n.addEventListener(`click`,()=>{typeof window.setQuickFilter==`function`&&window.setQuickFilter(t)})}),s(`btnMapStateNormal`)&&s(`btnMapStateNormal`).addEventListener(`click`,()=>$(`normal`)),s(`btnMapStateExpanded`)&&s(`btnMapStateExpanded`).addEventListener(`click`,()=>$(`expanded`)),s(`btnMapStateFull`)&&s(`btnMapStateFull`).addEventListener(`click`,()=>$(`full`)),s(`btnToggleMapKpis`)&&s(`btnToggleMapKpis`).addEventListener(`click`,()=>{let e=s(`mapKpiGrid`);if(e){let t=e.classList.contains(`kpi-drawer-collapsed`);e.classList.toggle(`kpi-drawer-collapsed`,!t),e.classList.toggle(`kpi-drawer-expanded`,t)}}),document.querySelectorAll(`.tab-btn`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault(),Un(e.dataset.tab)})}),document.querySelectorAll(`.sort-btn`).forEach(t=>{t.addEventListener(`click`,()=>{l.currentSort=t.dataset.sort,document.querySelectorAll(`.sort-btn`).forEach(e=>e.classList.remove(`active`)),t.classList.add(`active`);let{renderRankingTable:n}=e;n&&n()})}),s(`btnDetailExpand`)&&s(`btnDetailExpand`).addEventListener(`click`,()=>{typeof window.toggleDetailModalExpand==`function`&&window.toggleDetailModalExpand()}),s(`btnDetailClose`)&&s(`btnDetailClose`).addEventListener(`click`,()=>{let{closeDetailModal:t}=e;t&&t()}),s(`detailModalBackdrop`)&&s(`detailModalBackdrop`).addEventListener(`click`,()=>{let{closeDetailModal:t}=e;t&&t()}),document.addEventListener(`keydown`,t=>{if(t.key===`Escape`){let t=s(`detailModal`);if(t&&!t.classList.contains(`hidden`)){let{closeDetailModal:t}=e;t&&t()}}})}var qn=c((()=>{m(),e(),te(),B(),Gn(),Wn(),Hn()}));n((()=>{m(),e(),te(),we(),B(),et(),wt(),G(),Rt(),Qt(),_n(),Ln(),Bn(),Hn(),Wn(),Gn(),qn(),ut(),console.log(`main.js: Modular orchestrator initializing ✓`);function t(){console.log(`main.js: renderAll() starting`);try{Vn()}catch(e){console.error(`KPI Update Error:`,e)}[tn,nn,rn,an,mn,ln,un,dn,pn,hn].forEach(e=>{try{e()}catch(t){console.warn(`Chart Renderer Error (${e.name}):`,t)}});try{St()}catch(e){console.error(`Map Render Error:`,e)}try{Xe()}catch(e){console.error(`Grid Update Error:`,e)}try{Qe()}catch(e){console.error(`Ranking Table Error:`,e)}try{It()}catch(e){console.error(`MM111 Error:`,e)}try{Jt()}catch(e){console.error(`Inconsistencias Error:`,e)}window.lucide&&lucide.createIcons()}u(t);var n=()=>{Se(),Ee(),l.filtered=[...l.rawData],t()};async function r(){In(),Rn(),console.log(`main.js: init() start`),i(),$(`normal`),Kn({onProcessData:n,renderRankingTable:Qe,closeDetailModal:Ve}),a();let{loadGeoJSONData:e,loadControlsData:t}=await K(async()=>{let{loadGeoJSONData:e,loadControlsData:t}=await import(`./map-Cil-WqoT.js`);return{loadGeoJSONData:e,loadControlsData:t}},[],import.meta.url);Promise.allSettled([e(),t().then(()=>{l.rawData.length>0&&(console.log(`main.js: Refreshing data with catalog index…`),n())}),F(e=>I(e,n))]).then(()=>{console.log(`main.js: Bootstrap phase completed.`),window.lucide&&lucide.createIcons()})}function i(){let e=s(`currentDateDisplay`);e&&(e.textContent=new Date().toLocaleDateString(`es-ES`,{weekday:`long`,year:`numeric`,month:`long`,day:`numeric`}))}function a(){let e=[];typeof Tabulator>`u`&&e.push(`Tabulator`),typeof Chart>`u`&&e.push(`Chart.js`),typeof L>`u`&&e.push(`Leaflet`);let t=s(`libCheckWarn`);e.length>0?(console.error(`CRITICAL: Missing libraries:`,e.join(`, `)),t&&t.classList.remove(`hidden`)):t&&t.classList.add(`hidden`)}document.addEventListener(`DOMContentLoaded`,()=>{r(),bt()}),window.setMapStateForDebug=$,window.switchTabForDebug=Un}))();export{pt as a,gt as i,St as n,dt as o,bt as r,wt as t};