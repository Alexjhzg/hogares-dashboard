var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(e&&(t=e(e=0)),t),s=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),c=(e,n)=>{let r={};for(var i in e)t(r,i,{get:e[i],enumerable:!0});return n||t(r,Symbol.toStringTag,{value:`Module`}),r},l=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},u=(n,r,a)=>(a=n==null?{}:e(i(n)),l(r||!n||!n.__esModule?t(a,`default`,{value:n,enumerable:!0}):a,n)),d=e=>a.call(e,`module.exports`)?e[`module.exports`]:l(t({},`__esModule`,{value:!0}),e);(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var f,p=o((()=>{f={rawData:[],filtered:[],encMap:{},assetName:``,charts:{},map:null,markerCluster:null,geoJSONLayer:null,geoJSONData:null,segmentBBoxes:[],detailMiniMapObj:null,controlsData:null,controlsIndex:null,controlsLayer:null,detailTable:null,rankingTabulator:null,mm111Table:null,currentSort:`eficiencia`,currentPage:1,quickFilterMode:`all`,filterINE:!1,filterSEGEN:!1,lastFocused:null}})),m,h,g,_,v,y,b,x,S,C=o((()=>{m=[`#2563EB`,`#DC2626`,`#16A34A`,`#FACC15`,`#7C3AED`,`#EA580C`,`#06B6D4`,`#DB2777`,`#84CC16`,`#92400E`,`#312E81`,`#FDA4AF`],h=9999999,g=[{code:`APERT_LEJOS`,label:`Apertura Distante`,detail:`El punto donde se abrió el formulario (apertura automática) está a más de
500 m del punto de inicio marcado manualmente. Puede indicar que el
encuestador abrió la encuesta fuera de la vivienda o del segmento asignado.`},{code:`FUERA_SEGMENTO`,label:`Fuera de Cobertura`,detail:`El punto de captura se encuentra a más de 600 m del centro
del segmento asignado. El encuestador pudo haber trabajado en un área que no corresponde
a su segmento.`},{code:`TIEMPO_CORTO`,label:`Velocidad Sospechosa (corto)`,detail:`La encuesta se completó en menos de 15 minutos, por debajo del
tiempo mínimo razonable para una entrevista de calidad. Es probable que los datos se
hayan completado sin realizar las preguntas completas.`},{code:`TIEMPO_LARGO`,label:`Duración Larga`,color:`#EF4444`,detail:`La encuesta superó los 45 minutos. Posible pausa prolongada o error de cierre.`},{code:`SEGMENTO_INCORRECTO`,label:`Segmento Erróneo`,color:`#EF4444`,detail:`La ubicación GPS del levantamiento no coincide con el segmento declarado en la encuesta.`},{code:`TIEMPO_CORTO_EHM`,label:`Rapidez Inusual (EHM)`,detail:`EHM efectiva con una sola persona completada en menos de 10 minutos.
El mínimo razonable para EHM con un solo miembro del hogar es 10 minutos.`},{code:`TIEMPO_CORTO_ESCA`,label:`Rapidez Inusual (ESCA)`,detail:`ESCA efectiva completada en menos de 15 minutos.
El mínimo razonable para ESCA es 15 minutos.`},{code:`ARRANQUE_INCONSISTENTE`,label:`Arranque Incorrecto`,detail:`El número de arranque declarado en el hogar no correlaciona con el número de línea del control. Posible error de captura o salto de registro.`},{code:`LINEA_SERIE_INVALIDA`,label:`Inconsistencia Línea/Serie`,detail:`Uno o más datos (Control, Serie o Línea) no se encuentran definidos en la base de datos oficial del proyecto.`},{code:`CEDULA_INVALIDA`,label:`Cédula Inválida`,detail:`La cédula del encuestador no es numérica o su longitud está fuera del rango permitido (6–9 dígitos).`},{code:`INGRESO_ANOMALO`,label:`Ingreso Anómalo`,detail:`El ingreso declarado por un miembro del hogar está fuera del rango razonable (1 – ${h.toLocaleString(`es-VE`)} Bs.). Posible error de digitación.`},{code:`DESPLAZAMIENTO_ANOMALO`,label:`Desplazamiento Anómalo`,detail:`La distancia entre el punto de captura inicial y el punto de cierre de la encuesta supera los 30 metros. El encuestador pudo haberse movido durante la encuesta.`,color:`#F59E0B`},{code:`HOGARES_INCONSISTENTES`,label:`Hogares con Inconsistencias`,detail:`La cantidad de hogares registrados difiere de la cantidad de hogares declarados.`,color:`#EF4444`},{code:`INTEGRANTES_INCONSISTENTES`,label:`Integrantes con Inconsistencias`,detail:`La lista de integrantes por hogar no coincide con el total de miembros declarado.`,color:`#EF4444`},{code:`CONTROL_DISTANTE`,label:`Control Distante`,detail:`La ubicación GPS del levantamiento está a más de 600 metros del punto de control teórico definido en la base de datos oficial.`,color:`#EF4444`}],_={condicion:{ocupada_con_ocupantes_presentes:`OCUPADA CON OCUPANTES PRESENTES`,ocupadas_con_ocupantes_ausentes:`OCUPADA CON OCUPANTES AUSENTES`,desocupada:`DESOCUPADO`,"N/A":`N/A`},uso:{residencial:`RESIDENCIAL`,construcci_n:`CONSTRUCCIÓN`,comercio:`COMERCIO`,mixto:`MIXTO`,agr_cola:`AGRÍCOLA`,transporte:`TRANSPORTE`,religioso:`RELIGIOSO`,servicio_social_comunal:`SERVICIO`,creativo_cultural_deportivo:`CREATIVO O CULTURAL`,"N/A":`N/A`}},v=Object.fromEntries(g.map(e=>[e.code,e])),y=[`12151751`,`13293815`,`13476080`,`17695927`,`22719373`,`29879307`,`28474258`].map(e=>e.trim()),b=new Set(y),x={RESIDENCIAL:{color:`#2563EB`,badge:`bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50`},COMERCIO:{color:`#FACC15`,badge:`bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800/50`},COMERCIAL:{color:`#FACC15`,badge:`bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800/50`},MIXTO:{color:`#16A34A`,badge:`bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800/50`},CONSTRUCCI:{color:`#DC2626`,badge:`bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800/50`},RELIGIOSO:{color:`#7C3AED`,badge:`bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border border-purple-200 dark:border-purple-800/50`},CREATIVO:{color:`#DB2777`,badge:`bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400 border border-pink-200 dark:border-pink-800/50`},CULTURAL:{color:`#DB2777`,badge:`bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400 border border-pink-200 dark:border-pink-800/50`},SERVICIO:{color:`#F97316`,badge:`bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border border-orange-200 dark:border-orange-800/50`},AGRÍCOLA:{color:`#84CC16`,badge:`bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-400 border border-lime-200 dark:border-lime-800/50`},TRANSPORTE:{color:`#06B6D4`,badge:`bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800/50`},DEFAULT:{color:`#94A3B8`,badge:`bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400`}},S={"TIPO A":{color:`#8B5CF6`,badge:`bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border border-purple-200 dark:border-purple-800/50`},"TIPO B":{color:`#F59E0B`,badge:`bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border border-orange-200 dark:border-orange-800/50`},"TIPO C":{color:`#DC2626`,badge:`bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800/50`},"TIPO E":{color:`#10B981`,badge:`bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50`},"NO DEFINIDO":{color:`#94A3B8`,badge:`bg-slate-100 text-slate-500 dark:bg-slate-800/50 dark:text-slate-400`},PRESENTES:{color:`#2563EB`,badge:`bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50`},AUSENTES:{color:`#FACC15`,badge:`bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 border border-amber-100 dark:border-amber-800/50`},DESOCUPAD:{color:`#DC2626`,badge:`bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 border border-red-100 dark:border-red-800/50`},RECHAZO:{color:`#FACC15`,badge:`bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 border border-amber-100 dark:border-amber-800/50`},NADIE:{color:`#FACC15`,badge:`bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 border border-amber-100 dark:border-amber-800/50`},DEFAULT:{color:`#94A3B8`,badge:`bg-slate-100 text-slate-500 dark:bg-slate-800/50 dark:text-slate-400 border border-slate-200 dark:border-slate-700`}}})),w=o((()=>{p(),C()}));function T(e){return e.reduce((e,t)=>e+t,0)/e.length}function E(e){if(!e)return null;try{let t=String(e).trim().split(/\s+/);return t.length<2?null:[parseFloat(t[0]),parseFloat(t[1])]}catch{return null}}function D(e,t){if(!e||!t)return!1;let n=String(e).trim(),r=String(t).trim();return!!(n===r||n.padStart(3,`0`)===r.padStart(3,`0`)||n.endsWith(r)||r.endsWith(n))}var O,k=o((()=>{O=e=>document.getElementById(e)})),A=o((()=>{k()}));function j(e){let t=O(`loadingOverlay`),n=O(`loadingMsg`);t&&(P&&=(clearTimeout(P),null),t.style.display=`flex`,setTimeout(()=>{t.style.opacity=`1`,t.style.pointerEvents=`all`},10),n&&(n.textContent=e))}function M(){let e=O(`loadingOverlay`);e&&(P&&clearTimeout(P),e.style.opacity=`0`,e.style.pointerEvents=`none`,P=setTimeout(()=>{e.style.display=`none`,P=null},500))}function N(e){let t=document.getElementById(`connectionStatus`),n=document.getElementById(`connectionDot`),r=document.getElementById(`connectionPing`);!t||!n||(e?(t.textContent=`Live Connection`,t.classList.remove(`text-amber-500`),t.classList.add(`text-emerald-400`),n.className=`relative inline-flex rounded-full h-2 w-2 bg-brand-emerald`,r&&(r.className=`animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-emerald opacity-75`)):(t.textContent=`Modo Offline - Datos Cacheados`,t.classList.remove(`text-emerald-400`,`text-slate-400`),t.classList.add(`text-amber-500`),n.className=`relative inline-flex rounded-full h-2 w-2 bg-amber-500`,r&&(r.className=`absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-20`)))}var P,F=o((()=>{A(),P=null})),I,R,z,ee=o((()=>{I=`KoboDashboardDB`,R=`cacheStore`,z={async open(){return new Promise((e,t)=>{let n=indexedDB.open(I,1);n.onerror=()=>t(`Error opening DB`),n.onupgradeneeded=e=>{let t=e.target.result;t.objectStoreNames.contains(R)||t.createObjectStore(R)},n.onsuccess=t=>e(t.target.result)})},async get(e){try{let t=await this.open();return new Promise((n,r)=>{let i=t.transaction(R,`readonly`).objectStore(R).get(e);i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)})}catch(e){return console.error(`IndexedDB Get Error:`,e),null}},async set(e,t){try{let n=await this.open();return new Promise((r,i)=>{let a=n.transaction(R,`readwrite`).objectStore(R).put(t,e);a.onsuccess=()=>r(),a.onerror=()=>i(a.error)})}catch(e){console.error(`IndexedDB Set Error:`,e)}}}}));async function te(){let e=await fetch(`/api/assets`);if(!e.ok)throw Error(`Error API (${e.status}) at fetchAssets`);return await e.json()}async function ne(e,t=!1,n=``){if(!e)throw Error(`Missing UID in fetchSurveyData`);let r=new URLSearchParams;t&&r.set(`refresh`,`true`),n&&r.set(`next_uid`,n);let i=`/api/data/${e}${r.toString()?`?${r.toString()}`:``}`,a=await fetch(i);if(!a.ok)throw Error(`Error API (${a.status}) at fetchSurveyData`);return await a.json()}function re(e){e&&fetch(`/api/prefetch/${e}`,{method:`POST`}).then(t=>{t.ok&&console.info(`[api/services] Prefetch scheduled → ${e}`)}).catch(t=>console.warn(`[api/services] Prefetch request failed → ${e}:`,t))}var ie=o((()=>{w()}));async function ae(e){console.log(`api/index.js: Orchestrating loadAssets()...`),j(`Buscando formularios en KoboToolbox…`);let t=null;try{t=await te(),await z.set(`assets_cache`,t),N(!0)}catch(e){console.warn(`Network failure. Trying cache...`,e),t=await z.get(`assets_cache`),t&&N(!1)}if(!t){M(),O(`errorState`)&&(O(`errorState`).style.display=`flex`);let e=O(`statusBadge`);e&&(e.textContent=`Error de conexión`,e.classList.remove(`active`)),N(!1);return}let n=O(`assetSelect`);n&&(n.innerHTML=`<option value="">— Seleccionar encuesta —</option>`,t.forEach(e=>{let t=document.createElement(`option`);t.value=e.uid,t.textContent=e.name,n.appendChild(t)}),n.addEventListener(`change`,()=>{let e=n.options[n.selectedIndex];f.assetName=e?e.textContent.trim():``}));let r=O(`statusBadge`);r&&(r.textContent=`Formularios Listos`),window.lucide&&lucide.createIcons();let i=t.find(e=>e.name.toLowerCase().includes(`esca`)&&e.name.toLowerCase().includes(`v3`));if(i){n&&(n.value=i.uid),f.assetName=i.name,e&&e(i.uid);let r=t.find(e=>e.uid!==i.uid);r&&re(r.uid)}else M()}async function oe(e,t,n=!1){if(!e)return;j(n?`Sincronizando con KoboToolbox…`:`Descargando datos desde el servidor…`);let r=O(`btnRefresh`);r&&(r.disabled=!0);let i=null,a=!1,o=O(`assetSelect`),s=o?[...o.options].map(e=>e.value).filter(Boolean):[],c=s.indexOf(e),l=c>=0&&c+1<s.length?s[c+1]:``;try{i=await ne(e,n,l),await z.set(`data_cache_${e}`,i),N(!0)}catch(t){console.warn(`Network failure. Trying cache...`,t),n||(i=await z.get(`data_cache_${e}`),i&&(a=!0,N(!1)))}if(!i){alert(`Error: No se pudieron descargar los datos y no hay caché disponible.`),M(),r&&(r.disabled=!1);return}f.rawData=i.results||(Array.isArray(i)?i:[]),console.log(`api/index.js: Loaded ${f.rawData.length} records ${a?`(Offline Cache)`:``}`);let u=O(`statusBadge`);u&&(u.textContent=`${f.rawData.length} registros`),O(`errorState`)&&O(`errorState`).classList.add(`hidden`),O(`mainContent`)&&O(`mainContent`).classList.remove(`hidden`),j(`Renderizando dashboard...`),requestAnimationFrame(()=>{setTimeout(async()=>{t&&await t(),window.lucide&&lucide.createIcons(),requestAnimationFrame(()=>{setTimeout(()=>{M(),r&&(r.disabled=!1)},800)})},100)})}var se=o((()=>{w(),A(),F(),ee(),ie(),window.loadAssets=()=>ae(e=>oe(e,window.__onProcessData))}));function ce(e){let t=String(e[`S0/cedula_encuestador`]||`N/A`).trim(),n=String(e[`S0/s0_nombreapellido`]||`Desconocido`).trim(),r=e.start||``,i=e.end||``,a=e[`ubicacion_final/hora_fin`]||e[`ubicacion_final/hora_f`]||e.hora_f;a&&(i=!a.includes(`T`)&&r.includes(`T`)?r.split(`T`)[0]+`T`+a:a,e.end=i);let o=(e.today||e._submission_time||``).slice(0,10),s=(f.assetName||``).toUpperCase().includes(`EHM`)?`EHM`:`ESCA`,c=null;if(r)try{c=new Date(r).getHours()}catch{}let l=null;if(e._submission_time)try{l=new Date(e._submission_time).getHours()}catch{}let u=e=>{if(!e||typeof e!=`string`)return null;let t=e.trim().split(` `);return t.length>=4?parseFloat(t[3]):null};return{cedula:t,nombre:n,start:r,end:i,fecha:o,hora:c,hora_trans:l,formType:s,start_precision:u(e[`start-geopoint`]||e.start_geopoint),end_precision:u(e[`group_sh53u78/ubicacion_i`]||e[`end-geopoint`]),ent:e[`S1/ent`]||``,mun:e[`S1/mun`]||``,par:e[`S1/par`]||``,nodo:e[`S1/nodo`]||``,semana:e[`group_sh53u78/semana`]||``,uso:e[`S1/Uso_de_la_Unidad_inmobiliaria`]||`N/A`,condicion:e[`Condici_n_de_ocupaci_n/condicion_de_ocupacion`]||`N/A`,control:e[`group_sh53u78/control`]||e._uuid||``,lote:e[`group_sh53u78/lote`]||``,situacion_vivienda:e[`Condici_n_de_ocupaci_n/situacion_vivienda`]||``,segmento:e[`S1/segmento`]||e[`S1/group_segmeto_sector/segmento`]||e[`group_segmeto_sector/segmento`]||``,sector:e[`S1/sector`]||e[`S1/group_segmeto_sector/sector`]||e[`group_segmeto_sector/sector`]||``,manzana:e[`S1/manzana`]||``,parcela:e[`S1/parcela`]||``,edificacion:e[`S1/Edificaci_n`]||e[`S1/edificacion`]||``,lado_manz:e[`S1/lado_manz`]||``,n_linea:e[`group_sh53u78/n_linea`]||``,n_serie:e[`group_sh53u78/n_serie`]||``,direccion:e[`S1/P_nomsect`]||e[`S1/direccion`]||``,nota:e[`ubicacion_final/nota`]||``}}function le(e,t){if(!e||!t)return null;try{let n=new Date(e),r=new Date(t),i=Math.round((r-n)/6e4*10)/10;return i>=0&&i<=600?i:null}catch{return null}}var ue=o((()=>{w()}));function de(e,t){let n=0,r=0,i=0,a=[];return t===`EHM`?(a=Array.isArray(e.lista_hogar)?e.lista_hogar:[],a.forEach(e=>{let t=Array.isArray(e[`lista_hogar/lista_miembros`])?e[`lista_hogar/lista_miembros`]:[];if(t.length>0)n+=t.length;else{let t=parseInt(e[`lista_hogar/personas_hogar`]||e[`lista_hogar/lista_miembros_count`]||`0`,10);isNaN(t)||(n+=t)}t.forEach(e=>{let{hCount:t,mCount:n}=fe(e);r+=t,i+=n})})):(a=Array.isArray(e[`datos_hogar/hogar`])?e[`datos_hogar/hogar`]:[],a.forEach(e=>{let t=Array.isArray(e[`datos_hogar/hogar/integrantes_hogar`])?e[`datos_hogar/hogar/integrantes_hogar`]:[];n+=t.length,t.forEach(e=>{let{hCount:t,mCount:n}=fe(e);r+=t,i+=n})})),{totalPers:n,totalHombres:r,totalMujeres:i,hogaresCount:a.length,hogaresRaw:a}}function fe(e){let t=0,n=0,r=Object.keys(e).find(e=>e.endsWith(`/sexo`)||e.endsWith(`:sexo`)||e===`sexo`);if(r){let i=String(e[r]).trim().toLowerCase();[`1`,`sexo1`,`v`,`m`,`masculino`,`hombre`].includes(i)&&(t=1),[`2`,`sexo2`,`h`,`f`,`femenino`,`mujer`].includes(i)&&(n=1)}return{hCount:t,mCount:n}}var pe=o((()=>{}));function me(e){let t=E(e[`ubicacion_final/ubicacion_f`]||e.ubicacion_f),n=E(e[`group_sh53u78/ubicacion_i`]||e.ubicacion_i),r=null,i=null;if(n&&n[0])r=n[0],i=n[1];else if(t&&t[0])r=t[0],i=t[1];else if(e._geolocation&&e._geolocation.length>=2)r=e._geolocation[0],i=e._geolocation[1];else if(e[`S1/ubicacion`]){let t=e[`S1/ubicacion`].split(` `);t.length>=2&&(r=parseFloat(t[0]),i=parseFloat(t[1]))}return{lat:r,lng:i,ptIni:n,ptFin:t}}var he=o((()=>{A()}));function ge(e,t,n={}){let r={type:`Feature`};return(n.id===0||n.id)&&(r.id=n.id),n.bbox&&(r.bbox=n.bbox),r.properties=t||{},r.geometry=e,r}function _e(e,t,n={}){if(!e)throw Error(`coordinates is required`);if(!Array.isArray(e))throw Error(`coordinates must be an Array`);if(e.length<2)throw Error(`coordinates must be at least 2 numbers long`);if(!Ce(e[0])||!Ce(e[1]))throw Error(`coordinates must contain numbers`);return ge({type:`Point`,coordinates:e},t,n)}function ve(e,t,n={}){for(let t of e){if(t.length<4)throw Error(`Each LinearRing of a Polygon must have 4 or more Positions.`);if(t[t.length-1].length!==t[0].length)throw Error(`First and last Position are not equivalent.`);for(let e=0;e<t[t.length-1].length;e++)if(t[t.length-1][e]!==t[0][e])throw Error(`First and last Position are not equivalent.`)}return ge({type:`Polygon`,coordinates:e},t,n)}function ye(e,t,n={}){if(e.length<2)throw Error(`coordinates must be an array of two or more positions`);return ge({type:`LineString`,coordinates:e},t,n)}function be(e,t={}){let n={type:`FeatureCollection`};return t.id&&(n.id=t.id),t.bbox&&(n.bbox=t.bbox),n.features=e,n}function xe(e,t=`kilometers`){let n=Te[t];if(!n)throw Error(t+` units is invalid`);return e*n}function Se(e){return e%360*Math.PI/180}function Ce(e){return!isNaN(e)&&e!==null&&!Array.isArray(e)}function we(e){return typeof e==`object`&&!!e&&!Array.isArray(e)}var B,Te,V=o((()=>{B=6371008.8,Te={centimeters:B*100,centimetres:B*100,degrees:360/(2*Math.PI),feet:B*3.28084,inches:B*39.37,kilometers:B/1e3,kilometres:B/1e3,meters:B,metres:B,miles:B/1609.344,millimeters:B*1e3,millimetres:B*1e3,nauticalmiles:B/1852,radians:1,yards:B*1.0936}}));function Ee(e){if(!e)throw Error(`coord is required`);if(!Array.isArray(e)){if(e.type===`Feature`&&e.geometry!==null&&e.geometry.type===`Point`)return[...e.geometry.coordinates];if(e.type===`Point`)return[...e.coordinates]}if(Array.isArray(e)&&e.length>=2&&!Array.isArray(e[0])&&!Array.isArray(e[1]))return[...e];throw Error(`coord must be GeoJSON Point or an Array of numbers`)}function De(e){if(Array.isArray(e))return e;if(e.type===`Feature`){if(e.geometry!==null)return e.geometry.coordinates}else if(e.coordinates)return e.coordinates;throw Error(`coords must be GeoJSON Feature, Geometry Object or an Array`)}function Oe(e){return e.type===`Feature`?e.geometry:e}function ke(e,t){return e.type===`FeatureCollection`?`FeatureCollection`:e.type===`GeometryCollection`?`GeometryCollection`:e.type===`Feature`&&e.geometry!==null?e.geometry.type:e.type}var Ae=o((()=>{}));function je(e,t,n={}){var r=Ee(e),i=Ee(t),a=Se(i[1]-r[1]),o=Se(i[0]-r[0]),s=Se(r[1]),c=Se(i[1]),l=Math.sin(a/2)**2+Math.sin(o/2)**2*Math.cos(s)*Math.cos(c);return xe(2*Math.atan2(Math.sqrt(l),Math.sqrt(1-l)),n.units)}var Me=o((()=>{Ae(),V()}));function Ne(e,t,n){if(e!==null)for(var r,i,a,o,s,c,l,u=0,d=0,f,p=e.type,m=p===`FeatureCollection`,h=p===`Feature`,g=m?e.features.length:1,_=0;_<g;_++){l=m?e.features[_].geometry:h?e.geometry:e,f=l?l.type===`GeometryCollection`:!1,s=f?l.geometries.length:1;for(var v=0;v<s;v++){var y=0,b=0;if(o=f?l.geometries[v]:l,o!==null){c=o.coordinates;var x=o.type;switch(u=n&&(x===`Polygon`||x===`MultiPolygon`)?1:0,x){case null:break;case`Point`:if(t(c,d,_,y,b)===!1)return!1;d++,y++;break;case`LineString`:case`MultiPoint`:for(r=0;r<c.length;r++){if(t(c[r],d,_,y,b)===!1)return!1;d++,x===`MultiPoint`&&y++}x===`LineString`&&y++;break;case`Polygon`:case`MultiLineString`:for(r=0;r<c.length;r++){for(i=0;i<c[r].length-u;i++){if(t(c[r][i],d,_,y,b)===!1)return!1;d++}x===`MultiLineString`&&y++,x===`Polygon`&&b++}x===`Polygon`&&y++;break;case`MultiPolygon`:for(r=0;r<c.length;r++){for(b=0,i=0;i<c[r].length;i++){for(a=0;a<c[r][i].length-u;a++){if(t(c[r][i][a],d,_,y,b)===!1)return!1;d++}b++}y++}break;case`GeometryCollection`:for(r=0;r<o.geometries.length;r++)if(Ne(o.geometries[r],t,n)===!1)return!1;break;default:throw Error(`Unknown Geometry Type`)}}}}}function Pe(e,t){var n,r,i,a,o,s,c,l,u,d,f=0,p=e.type===`FeatureCollection`,m=e.type===`Feature`,h=p?e.features.length:1;for(n=0;n<h;n++){for(s=p?e.features[n].geometry:m?e.geometry:e,l=p?e.features[n].properties:m?e.properties:{},u=p?e.features[n].bbox:m?e.bbox:void 0,d=p?e.features[n].id:m?e.id:void 0,c=s?s.type===`GeometryCollection`:!1,o=c?s.geometries.length:1,i=0;i<o;i++){if(a=c?s.geometries[i]:s,a===null){if(t(null,f,l,u,d)===!1)return!1;continue}switch(a.type){case`Point`:case`LineString`:case`MultiPoint`:case`Polygon`:case`MultiLineString`:case`MultiPolygon`:if(t(a,f,l,u,d)===!1)return!1;break;case`GeometryCollection`:for(r=0;r<a.geometries.length;r++)if(t(a.geometries[r],f,l,u,d)===!1)return!1;break;default:throw Error(`Unknown Geometry Type`)}}f++}}var Fe=o((()=>{}));function Ie(e,t,n,r,i){let a,o,s,c,l=t[0],u=r[0],d=0,f=0;u>l==u>-l?(a=l,l=t[++d]):(a=u,u=r[++f]);let p=0;if(d<e&&f<n)for(u>l==u>-l?(o=l+a,s=a-(o-l),l=t[++d]):(o=u+a,s=a-(o-u),u=r[++f]),a=o,s!==0&&(i[p++]=s);d<e&&f<n;)u>l==u>-l?(o=a+l,c=o-a,s=a-(o-c)+(l-c),l=t[++d]):(o=a+u,c=o-a,s=a-(o-c)+(u-c),u=r[++f]),a=o,s!==0&&(i[p++]=s);for(;d<e;)o=a+l,c=o-a,s=a-(o-c)+(l-c),l=t[++d],a=o,s!==0&&(i[p++]=s);for(;f<n;)o=a+u,c=o-a,s=a-(o-c)+(u-c),u=r[++f],a=o,s!==0&&(i[p++]=s);return(a!==0||p===0)&&(i[p++]=a),p}function Le(e,t){let n=t[0];for(let r=1;r<e;r++)n+=t[r];return n}function H(e){return new Float64Array(e)}var U,W,Re,ze=o((()=>{U=11102230246251565e-32,W=134217729,Re=(3+8*U)*U}));function Be(e,t,n,r,i,a,o){let s,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T=e-i,E=n-i,D=t-a,O=r-a;b=T*O,f=W*T,p=f-(f-T),m=T-p,f=W*O,h=f-(f-O),g=O-h,x=m*g-(b-p*h-m*h-p*g),S=D*E,f=W*D,p=f-(f-D),m=D-p,f=W*E,h=f-(f-E),g=E-h,C=m*g-(S-p*h-m*h-p*g),_=x-C,d=x-_,G[0]=x-(_+d)+(d-C),v=b+_,d=v-b,y=b-(v-d)+(_-d),_=y-S,d=y-_,G[1]=y-(_+d)+(d-S),w=v+_,d=w-v,G[2]=v-(w-d)+(_-d),G[3]=w;let k=Le(4,G),A=Ue*o;if(k>=A||-k>=A||(d=e-T,s=e-(T+d)+(d-i),d=n-E,l=n-(E+d)+(d-i),d=t-D,c=t-(D+d)+(d-a),d=r-O,u=r-(O+d)+(d-a),s===0&&c===0&&l===0&&u===0)||(A=We*o+Re*Math.abs(k),k+=T*u+O*s-(D*l+E*c),k>=A||-k>=A))return k;b=s*O,f=W*s,p=f-(f-s),m=s-p,f=W*O,h=f-(f-O),g=O-h,x=m*g-(b-p*h-m*h-p*g),S=c*E,f=W*c,p=f-(f-c),m=c-p,f=W*E,h=f-(f-E),g=E-h,C=m*g-(S-p*h-m*h-p*g),_=x-C,d=x-_,K[0]=x-(_+d)+(d-C),v=b+_,d=v-b,y=b-(v-d)+(_-d),_=y-S,d=y-_,K[1]=y-(_+d)+(d-S),w=v+_,d=w-v,K[2]=v-(w-d)+(_-d),K[3]=w;let j=Ie(4,G,4,K,Ge);b=T*u,f=W*T,p=f-(f-T),m=T-p,f=W*u,h=f-(f-u),g=u-h,x=m*g-(b-p*h-m*h-p*g),S=D*l,f=W*D,p=f-(f-D),m=D-p,f=W*l,h=f-(f-l),g=l-h,C=m*g-(S-p*h-m*h-p*g),_=x-C,d=x-_,K[0]=x-(_+d)+(d-C),v=b+_,d=v-b,y=b-(v-d)+(_-d),_=y-S,d=y-_,K[1]=y-(_+d)+(d-S),w=v+_,d=w-v,K[2]=v-(w-d)+(_-d),K[3]=w;let M=Ie(j,Ge,4,K,Ke);return b=s*u,f=W*s,p=f-(f-s),m=s-p,f=W*u,h=f-(f-u),g=u-h,x=m*g-(b-p*h-m*h-p*g),S=c*l,f=W*c,p=f-(f-c),m=c-p,f=W*l,h=f-(f-l),g=l-h,C=m*g-(S-p*h-m*h-p*g),_=x-C,d=x-_,K[0]=x-(_+d)+(d-C),v=b+_,d=v-b,y=b-(v-d)+(_-d),_=y-S,d=y-_,K[1]=y-(_+d)+(d-S),w=v+_,d=w-v,K[2]=v-(w-d)+(_-d),K[3]=w,qe[Ie(M,Ke,4,K,qe)-1]}function Ve(e,t,n,r,i,a){let o=(t-a)*(n-i),s=(e-i)*(r-a),c=o-s,l=Math.abs(o+s);return Math.abs(c)>=He*l?c:-Be(e,t,n,r,i,a,l)}var He,Ue,We,G,Ge,Ke,qe,K,Je=o((()=>{ze(),He=(3+16*U)*U,Ue=(2+12*U)*U,We=(9+64*U)*U*U,G=H(4),Ge=H(8),Ke=H(12),qe=H(16),K=H(4)})),Ye=o((()=>{ze(),(7+56*U)*U,(3+28*U)*U,(26+288*U)*U*U,H(4),H(4),H(4),H(4),H(4),H(4),H(4),H(4),H(4),H(8),H(8),H(8),H(4),H(8),H(8),H(16),H(12),H(192),H(192)})),Xe=o((()=>{ze(),(10+96*U)*U,(4+48*U)*U,(44+576*U)*U*U,H(4),H(4),H(4),H(4),H(4),H(4),H(4),H(4),H(8),H(8),H(8),H(8),H(8),H(8),H(8),H(8),H(8),H(4),H(4),H(4),H(8),H(16),H(16),H(16),H(32),H(32),H(48),H(64),H(1152),H(1152)})),Ze=o((()=>{ze(),(16+224*U)*U,(5+72*U)*U,(71+1408*U)*U*U,H(4),H(4),H(4),H(4),H(4),H(4),H(4),H(4),H(4),H(4),H(24),H(24),H(24),H(24),H(24),H(24),H(24),H(24),H(24),H(24),H(1152),H(1152),H(1152),H(1152),H(1152),H(2304),H(2304),H(3456),H(5760),H(8),H(8),H(8),H(16),H(24),H(48),H(48),H(96),H(192),H(384),H(384),H(384),H(768),H(96),H(96),H(96),H(1152)})),Qe=o((()=>{Je(),Ye(),Xe(),Ze()}));function $e(e,t){var n,r,i=0,a,o,s,c,l,u,d,f=e[0],p=e[1],m=t.length;for(n=0;n<m;n++){r=0;var h=t[n],g=h.length-1;if(u=h[0],u[0]!==h[g][0]&&u[1]!==h[g][1])throw Error(`First and last coordinates in a ring must be the same`);for(o=u[0]-f,s=u[1]-p;r<g;r++){if(d=h[r+1],c=d[0]-f,l=d[1]-p,s===0&&l===0){if(c<=0&&o>=0||o<=0&&c>=0)return 0}else if(l>=0&&s<=0||l<=0&&s>=0){if(a=Ve(o,c,s,l,0,0),a===0)return 0;(a>0&&l>0&&s<=0||a<0&&l<=0&&s>0)&&i++}u=d,s=l,o=c}}return i%2!=0}var et=o((()=>{Qe()}));function tt(e,t,n={}){if(!e)throw Error(`point is required`);if(!t)throw Error(`polygon is required`);let r=Ee(e),i=Oe(t),a=i.type,o=t.bbox,s=i.coordinates;if(o&&nt(r,o)===!1)return!1;a===`Polygon`&&(s=[s]);let c=!1;for(var l=0;l<s.length;++l){let e=$e(r,s[l]);if(e===0)return!n.ignoreBoundary;e&&(c=!0)}return c}function nt(e,t){return t[0]<=e[0]&&t[1]<=e[1]&&t[2]>=e[0]&&t[3]>=e[1]}var rt=o((()=>{et(),Ae()}));function it(e,t,n={}){let r=Ee(e),i=De(t);for(let e=0;e<i.length-1;e++){let t=!1;if(n.ignoreEndVertices&&(e===0&&(t=`start`),e===i.length-2&&(t=`end`),e===0&&e+1===i.length-1&&(t=`both`)),at(i[e],i[e+1],r,t,n.epsilon===void 0?null:n.epsilon))return!0}return!1}function at(e,t,n,r,i){let a=n[0],o=n[1],s=e[0],c=e[1],l=t[0],u=t[1],d=n[0]-s,f=n[1]-c,p=l-s,m=u-c,h=d*m-f*p;if(i!==null){if(Math.abs(h)>i)return!1}else if(h!==0)return!1;return Math.abs(p)===Math.abs(m)&&Math.abs(p)===0?r?!1:n[0]===e[0]&&n[1]===e[1]:r?r===`start`?Math.abs(p)>=Math.abs(m)?p>0?s<a&&a<=l:l<=a&&a<s:m>0?c<o&&o<=u:u<=o&&o<c:r===`end`?Math.abs(p)>=Math.abs(m)?p>0?s<=a&&a<l:l<a&&a<=s:m>0?c<=o&&o<u:u<o&&o<=c:r===`both`?Math.abs(p)>=Math.abs(m)?p>0?s<a&&a<l:l<a&&a<s:m>0?c<o&&o<u:u<o&&o<c:!1:Math.abs(p)>=Math.abs(m)?p>0?s<=a&&a<=l:l<=a&&a<=s:m>0?c<=o&&o<=u:u<=o&&o<=c}var ot=o((()=>{Ae()})),st=s(((e,t)=>{(function(n,r){typeof e==`object`&&t!==void 0?t.exports=r():typeof define==`function`&&define.amd?define(r):(n||=self).RBush=r()})(e,function(){function e(e,r,i,a,o){(function e(n,r,i,a,o){for(;a>i;){if(a-i>600){var s=a-i+1,c=r-i+1,l=Math.log(s),u=.5*Math.exp(2*l/3),d=.5*Math.sqrt(l*u*(s-u)/s)*(c-s/2<0?-1:1);e(n,r,Math.max(i,Math.floor(r-c*u/s+d)),Math.min(a,Math.floor(r+(s-c)*u/s+d)),o)}var f=n[r],p=i,m=a;for(t(n,i,r),o(n[a],f)>0&&t(n,i,a);p<m;){for(t(n,p,m),p++,m--;o(n[p],f)<0;)p++;for(;o(n[m],f)>0;)m--}o(n[i],f)===0?t(n,i,m):t(n,++m,a),m<=r&&(i=m+1),r<=m&&(a=m-1)}})(e,r,i||0,a||e.length-1,o||n)}function t(e,t,n){var r=e[t];e[t]=e[n],e[n]=r}function n(e,t){return e<t?-1:+(e>t)}var r=function(e){e===void 0&&(e=9),this._maxEntries=Math.max(4,e),this._minEntries=Math.max(2,Math.ceil(.4*this._maxEntries)),this.clear()};function i(e,t,n){if(!n)return t.indexOf(e);for(var r=0;r<t.length;r++)if(n(e,t[r]))return r;return-1}function a(e,t){o(e,0,e.children.length,t,e)}function o(e,t,n,r,i){i||=m(null),i.minX=1/0,i.minY=1/0,i.maxX=-1/0,i.maxY=-1/0;for(var a=t;a<n;a++){var o=e.children[a];s(i,e.leaf?r(o):o)}return i}function s(e,t){return e.minX=Math.min(e.minX,t.minX),e.minY=Math.min(e.minY,t.minY),e.maxX=Math.max(e.maxX,t.maxX),e.maxY=Math.max(e.maxY,t.maxY),e}function c(e,t){return e.minX-t.minX}function l(e,t){return e.minY-t.minY}function u(e){return(e.maxX-e.minX)*(e.maxY-e.minY)}function d(e){return e.maxX-e.minX+(e.maxY-e.minY)}function f(e,t){return e.minX<=t.minX&&e.minY<=t.minY&&t.maxX<=e.maxX&&t.maxY<=e.maxY}function p(e,t){return t.minX<=e.maxX&&t.minY<=e.maxY&&t.maxX>=e.minX&&t.maxY>=e.minY}function m(e){return{children:e,height:1,leaf:!0,minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0}}function h(t,n,r,i,a){for(var o=[n,r];o.length;)if(!((r=o.pop())-(n=o.pop())<=i)){var s=n+Math.ceil((r-n)/i/2)*i;e(t,s,n,r,a),o.push(n,s,s,r)}}return r.prototype.all=function(){return this._all(this.data,[])},r.prototype.search=function(e){var t=this.data,n=[];if(!p(e,t))return n;for(var r=this.toBBox,i=[];t;){for(var a=0;a<t.children.length;a++){var o=t.children[a],s=t.leaf?r(o):o;p(e,s)&&(t.leaf?n.push(o):f(e,s)?this._all(o,n):i.push(o))}t=i.pop()}return n},r.prototype.collides=function(e){var t=this.data;if(!p(e,t))return!1;for(var n=[];t;){for(var r=0;r<t.children.length;r++){var i=t.children[r],a=t.leaf?this.toBBox(i):i;if(p(e,a)){if(t.leaf||f(e,a))return!0;n.push(i)}}t=n.pop()}return!1},r.prototype.load=function(e){if(!e||!e.length)return this;if(e.length<this._minEntries){for(var t=0;t<e.length;t++)this.insert(e[t]);return this}var n=this._build(e.slice(),0,e.length-1,0);if(this.data.children.length)if(this.data.height===n.height)this._splitRoot(this.data,n);else{if(this.data.height<n.height){var r=this.data;this.data=n,n=r}this._insert(n,this.data.height-n.height-1,!0)}else this.data=n;return this},r.prototype.insert=function(e){return e&&this._insert(e,this.data.height-1),this},r.prototype.clear=function(){return this.data=m([]),this},r.prototype.remove=function(e,t){if(!e)return this;for(var n,r,a,o=this.data,s=this.toBBox(e),c=[],l=[];o||c.length;){if(o||(o=c.pop(),r=c[c.length-1],n=l.pop(),a=!0),o.leaf){var u=i(e,o.children,t);if(u!==-1)return o.children.splice(u,1),c.push(o),this._condense(c),this}a||o.leaf||!f(o,s)?r?(n++,o=r.children[n],a=!1):o=null:(c.push(o),l.push(n),n=0,r=o,o=o.children[0])}return this},r.prototype.toBBox=function(e){return e},r.prototype.compareMinX=function(e,t){return e.minX-t.minX},r.prototype.compareMinY=function(e,t){return e.minY-t.minY},r.prototype.toJSON=function(){return this.data},r.prototype.fromJSON=function(e){return this.data=e,this},r.prototype._all=function(e,t){for(var n=[];e;)e.leaf?t.push.apply(t,e.children):n.push.apply(n,e.children),e=n.pop();return t},r.prototype._build=function(e,t,n,r){var i,o=n-t+1,s=this._maxEntries;if(o<=s)return a(i=m(e.slice(t,n+1)),this.toBBox),i;r||(r=Math.ceil(Math.log(o)/Math.log(s)),s=Math.ceil(o/s**(r-1))),(i=m([])).leaf=!1,i.height=r;var c=Math.ceil(o/s),l=c*Math.ceil(Math.sqrt(s));h(e,t,n,l,this.compareMinX);for(var u=t;u<=n;u+=l){var d=Math.min(u+l-1,n);h(e,u,d,c,this.compareMinY);for(var f=u;f<=d;f+=c){var p=Math.min(f+c-1,d);i.children.push(this._build(e,f,p,r-1))}}return a(i,this.toBBox),i},r.prototype._chooseSubtree=function(e,t,n,r){for(;r.push(t),!t.leaf&&r.length-1!==n;){for(var i=1/0,a=1/0,o=void 0,s=0;s<t.children.length;s++){var c=t.children[s],l=u(c),d=(f=e,p=c,(Math.max(p.maxX,f.maxX)-Math.min(p.minX,f.minX))*(Math.max(p.maxY,f.maxY)-Math.min(p.minY,f.minY))-l);d<a?(a=d,i=l<i?l:i,o=c):d===a&&l<i&&(i=l,o=c)}t=o||t.children[0]}var f,p;return t},r.prototype._insert=function(e,t,n){var r=n?e:this.toBBox(e),i=[],a=this._chooseSubtree(r,this.data,t,i);for(a.children.push(e),s(a,r);t>=0&&i[t].children.length>this._maxEntries;)this._split(i,t),t--;this._adjustParentBBoxes(r,i,t)},r.prototype._split=function(e,t){var n=e[t],r=n.children.length,i=this._minEntries;this._chooseSplitAxis(n,i,r);var o=this._chooseSplitIndex(n,i,r),s=m(n.children.splice(o,n.children.length-o));s.height=n.height,s.leaf=n.leaf,a(n,this.toBBox),a(s,this.toBBox),t?e[t-1].children.push(s):this._splitRoot(n,s)},r.prototype._splitRoot=function(e,t){this.data=m([e,t]),this.data.height=e.height+1,this.data.leaf=!1,a(this.data,this.toBBox)},r.prototype._chooseSplitIndex=function(e,t,n){for(var r,i,a,s,c,l,d,f=1/0,p=1/0,m=t;m<=n-t;m++){var h=o(e,0,m,this.toBBox),g=o(e,m,n,this.toBBox),_=(i=h,a=g,s=void 0,c=void 0,l=void 0,d=void 0,s=Math.max(i.minX,a.minX),c=Math.max(i.minY,a.minY),l=Math.min(i.maxX,a.maxX),d=Math.min(i.maxY,a.maxY),Math.max(0,l-s)*Math.max(0,d-c)),v=u(h)+u(g);_<f?(f=_,r=m,p=v<p?v:p):_===f&&v<p&&(p=v,r=m)}return r||n-t},r.prototype._chooseSplitAxis=function(e,t,n){var r=e.leaf?this.compareMinX:c,i=e.leaf?this.compareMinY:l;this._allDistMargin(e,t,n,r)<this._allDistMargin(e,t,n,i)&&e.children.sort(r)},r.prototype._allDistMargin=function(e,t,n,r){e.children.sort(r);for(var i=this.toBBox,a=o(e,0,t,i),c=o(e,n-t,n,i),l=d(a)+d(c),u=t;u<n-t;u++){var f=e.children[u];s(a,e.leaf?i(f):f),l+=d(a)}for(var p=n-t-1;p>=t;p--){var m=e.children[p];s(c,e.leaf?i(m):m),l+=d(c)}return l},r.prototype._adjustParentBBoxes=function(e,t,n){for(var r=n;r>=0;r--)s(t[r],e)},r.prototype._condense=function(e){for(var t=e.length-1,n=void 0;t>=0;t--)e[t].children.length===0?t>0?(n=e[t-1].children).splice(n.indexOf(e[t]),1):this.clear():a(e[t],this.toBBox)},r})}));function ct(e,t={}){var n=typeof t==`object`?t.mutate:t;if(!e)throw Error(`geojson is required`);var r=ke(e),i=[];switch(r){case`LineString`:i=lt(e,r);break;case`MultiLineString`:case`Polygon`:De(e).forEach(function(e){i.push(lt(e,r))});break;case`MultiPolygon`:De(e).forEach(function(e){var t=[];e.forEach(function(e){t.push(lt(e,r))}),i.push(t)});break;case`Point`:return e;case`MultiPoint`:var a={};De(e).forEach(function(e){var t=e.join(`-`);Object.prototype.hasOwnProperty.call(a,t)||(i.push(e),a[t]=!0)});break;default:throw Error(r+` geometry not supported`)}return e.coordinates?n===!0?(e.coordinates=i,e):{type:r,coordinates:i}:n===!0?(e.geometry.coordinates=i,e):ge({type:r,coordinates:i},e.properties,{bbox:e.bbox,id:e.id})}function lt(e,t){let n=De(e);if(n.length===2&&!ut(n[0],n[1]))return n;let r=[],i=0,a=1,o=2;for(r.push(n[i]);o<n.length;)it(n[a],ye([n[i],n[o]]))?a=o:(r.push(n[a]),i=a,a++,o=a),o++;if(r.push(n[a]),t===`Polygon`||t===`MultiPolygon`){if(it(r[0],ye([r[1],r[r.length-2]]))&&(r.shift(),r.pop(),r.push(r[0])),r.length<4)throw Error(`invalid polygon, fewer than 4 points`);if(!ut(r[0],r[r.length-1]))throw Error(`invalid polygon, first and last points not equal`)}return r}function ut(e,t){return e[0]===t[0]&&e[1]===t[1]}var dt=o((()=>{V(),Ae(),ot()})),ft=c({default:()=>mt});function pt(e,t){return e<t?-1:+(e>t)}var mt,ht=o((()=>{mt=class{constructor(e=[],t=pt){if(this.data=e,this.length=this.data.length,this.compare=t,this.length>0)for(let e=(this.length>>1)-1;e>=0;e--)this._down(e)}push(e){this.data.push(e),this.length++,this._up(this.length-1)}pop(){if(this.length===0)return;let e=this.data[0],t=this.data.pop();return this.length--,this.length>0&&(this.data[0]=t,this._down(0)),e}peek(){return this.data[0]}_up(e){let{data:t,compare:n}=this,r=t[e];for(;e>0;){let i=e-1>>1,a=t[i];if(n(r,a)>=0)break;t[e]=a,e=i}t[e]=r}_down(e){let{data:t,compare:n}=this,r=this.length>>1,i=t[e];for(;e<r;){let r=(e<<1)+1,a=t[r],o=r+1;if(o<this.length&&n(t[o],a)<0&&(r=o,a=t[o]),n(a,i)>=0)break;t[e]=a,e=r}t[e]=i}}})),gt=s(((e,t)=>{t.exports=function(e,t,n,r){var i=e[0],a=e[1],o=!1;n===void 0&&(n=0),r===void 0&&(r=t.length);for(var s=(r-n)/2,c=0,l=s-1;c<s;l=c++){var u=t[n+c*2+0],d=t[n+c*2+1],f=t[n+l*2+0],p=t[n+l*2+1];d>a!=p>a&&i<(f-u)*(a-d)/(p-d)+u&&(o=!o)}return o}})),_t=s(((e,t)=>{t.exports=function(e,t,n,r){var i=e[0],a=e[1],o=!1;n===void 0&&(n=0),r===void 0&&(r=t.length);for(var s=r-n,c=0,l=s-1;c<s;l=c++){var u=t[c+n][0],d=t[c+n][1],f=t[l+n][0],p=t[l+n][1];d>a!=p>a&&i<(f-u)*(a-d)/(p-d)+u&&(o=!o)}return o}})),vt=s(((e,t)=>{var n=gt(),r=_t();t.exports=function(e,t,i,a){return t.length>0&&Array.isArray(t[0])?r(e,t,i,a):n(e,t,i,a)},t.exports.nested=r,t.exports.flat=n})),yt=s(((e,t)=>{(function(n,r){typeof e==`object`&&t!==void 0?r(e):typeof define==`function`&&define.amd?define([`exports`],r):r((n||=self).predicates={})})(e,function(e){let t=134217729;function n(e,t,n,r,i){let a,o,s,c,l=t[0],u=r[0],d=0,f=0;u>l==u>-l?(a=l,l=t[++d]):(a=u,u=r[++f]);let p=0;if(d<e&&f<n)for(u>l==u>-l?(s=a-((o=l+a)-l),l=t[++d]):(s=a-((o=u+a)-u),u=r[++f]),a=o,s!==0&&(i[p++]=s);d<e&&f<n;)u>l==u>-l?(s=a-((o=a+l)-(c=o-a))+(l-c),l=t[++d]):(s=a-((o=a+u)-(c=o-a))+(u-c),u=r[++f]),a=o,s!==0&&(i[p++]=s);for(;d<e;)s=a-((o=a+l)-(c=o-a))+(l-c),l=t[++d],a=o,s!==0&&(i[p++]=s);for(;f<n;)s=a-((o=a+u)-(c=o-a))+(u-c),u=r[++f],a=o,s!==0&&(i[p++]=s);return a===0&&p!==0||(i[p++]=a),p}function r(e){return new Float64Array(e)}let i=r(4),a=r(8),o=r(12),s=r(16),c=r(4);e.orient2d=function(e,r,l,u,d,f){let p=(r-f)*(l-d),m=(e-d)*(u-f),h=p-m;if(p===0||m===0||p>0!=m>0)return h;let g=Math.abs(p+m);return Math.abs(h)>=33306690738754716e-32*g?h:-function(e,r,l,u,d,f,p){let m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M=e-d,N=l-d,P=r-f,F=u-f;v=(O=(x=M-(b=(y=t*M)-(y-M)))*(C=F-(S=(y=t*F)-(y-F)))-((D=M*F)-b*S-x*S-b*C))-(w=O-(A=(x=P-(b=(y=t*P)-(y-P)))*(C=N-(S=(y=t*N)-(y-N)))-((k=P*N)-b*S-x*S-b*C))),i[0]=O-(w+v)+(v-A),v=(E=D-((T=D+w)-(v=T-D))+(w-v))-(w=E-k),i[1]=E-(w+v)+(v-k),v=(j=T+w)-T,i[2]=T-(j-v)+(w-v),i[3]=j;let I=function(e,t){let n=t[0];for(let r=1;r<e;r++)n+=t[r];return n}(4,i),R=22204460492503146e-32*p;if(I>=R||-I>=R||(m=e-(M+(v=e-M))+(v-d),g=l-(N+(v=l-N))+(v-d),h=r-(P+(v=r-P))+(v-f),_=u-(F+(v=u-F))+(v-f),m===0&&h===0&&g===0&&_===0)||(R=11093356479670487e-47*p+33306690738754706e-32*Math.abs(I),(I+=M*_+F*m-(P*g+N*h))>=R||-I>=R))return I;v=(O=(x=m-(b=(y=t*m)-(y-m)))*(C=F-(S=(y=t*F)-(y-F)))-((D=m*F)-b*S-x*S-b*C))-(w=O-(A=(x=h-(b=(y=t*h)-(y-h)))*(C=N-(S=(y=t*N)-(y-N)))-((k=h*N)-b*S-x*S-b*C))),c[0]=O-(w+v)+(v-A),v=(E=D-((T=D+w)-(v=T-D))+(w-v))-(w=E-k),c[1]=E-(w+v)+(v-k),v=(j=T+w)-T,c[2]=T-(j-v)+(w-v),c[3]=j;let z=n(4,i,4,c,a);v=(O=(x=M-(b=(y=t*M)-(y-M)))*(C=_-(S=(y=t*_)-(y-_)))-((D=M*_)-b*S-x*S-b*C))-(w=O-(A=(x=P-(b=(y=t*P)-(y-P)))*(C=g-(S=(y=t*g)-(y-g)))-((k=P*g)-b*S-x*S-b*C))),c[0]=O-(w+v)+(v-A),v=(E=D-((T=D+w)-(v=T-D))+(w-v))-(w=E-k),c[1]=E-(w+v)+(v-k),v=(j=T+w)-T,c[2]=T-(j-v)+(w-v),c[3]=j;let ee=n(z,a,4,c,o);return v=(O=(x=m-(b=(y=t*m)-(y-m)))*(C=_-(S=(y=t*_)-(y-_)))-((D=m*_)-b*S-x*S-b*C))-(w=O-(A=(x=h-(b=(y=t*h)-(y-h)))*(C=g-(S=(y=t*g)-(y-g)))-((k=h*g)-b*S-x*S-b*C))),c[0]=O-(w+v)+(v-A),v=(E=D-((T=D+w)-(v=T-D))+(w-v))-(w=E-k),c[1]=E-(w+v)+(v-k),v=(j=T+w)-T,c[2]=T-(j-v)+(w-v),c[3]=j,s[n(ee,o,4,c,s)-1]}(e,r,l,u,d,f,g)},e.orient2dfast=function(e,t,n,r,i,a){return(t-a)*(n-i)-(e-i)*(r-a)},Object.defineProperty(e,`__esModule`,{value:!0})})})),bt=s(((e,t)=>{var n=st(),r=(ht(),d(ft)),i=vt(),a=yt().orient2d;r.default&&(r=r.default),t.exports=o,t.exports.default=o;function o(e,t,r){t=Math.max(0,t===void 0?2:t),r||=0;var i=g(e),a=new n(16);a.toBBox=function(e){return{minX:e[0],minY:e[1],maxX:e[0],maxY:e[1]}},a.compareMinX=function(e,t){return e[0]-t[0]},a.compareMinY=function(e,t){return e[1]-t[1]},a.load(e);for(var o=[],c=0,l;c<i.length;c++){var u=i[c];a.remove(u),l=_(u,l),o.push(l)}var d=new n(16);for(c=0;c<o.length;c++)d.insert(h(o[c]));for(var f=t*t,p=r*r;o.length;){var m=o.shift(),y=m.p,b=m.next.p,x=v(y,b);if(!(x<p)){var S=x/f;u=s(a,m.prev.p,y,b,m.next.next.p,S,d),u&&Math.min(v(u,y),v(u,b))<=S&&(o.push(m),o.push(_(u,m)),a.remove(u),d.remove(m),d.insert(h(m)),d.insert(h(m.next)))}}m=l;var C=[];do C.push(m.p),m=m.next;while(m!==l);return C.push(m.p),C}function s(e,t,n,i,a,o,s){for(var u=new r([],c),d=e.data;d;){for(var p=0;p<d.children.length;p++){var m=d.children[p],h=d.leaf?y(m,n,i):l(n,i,m);h>o||u.push({node:m,dist:h})}for(;u.length&&!u.peek().node.children;){var g=u.pop(),_=g.node,v=y(_,t,n),b=y(_,i,a);if(g.dist<v&&g.dist<b&&f(n,_,s)&&f(i,_,s))return _}d=u.pop(),d&&=d.node}return null}function c(e,t){return e.dist-t.dist}function l(e,t,n){if(u(e,n)||u(t,n))return 0;var r=b(e[0],e[1],t[0],t[1],n.minX,n.minY,n.maxX,n.minY);if(r===0)return 0;var i=b(e[0],e[1],t[0],t[1],n.minX,n.minY,n.minX,n.maxY);if(i===0)return 0;var a=b(e[0],e[1],t[0],t[1],n.maxX,n.minY,n.maxX,n.maxY);if(a===0)return 0;var o=b(e[0],e[1],t[0],t[1],n.minX,n.maxY,n.maxX,n.maxY);return o===0?0:Math.min(r,i,a,o)}function u(e,t){return e[0]>=t.minX&&e[0]<=t.maxX&&e[1]>=t.minY&&e[1]<=t.maxY}function f(e,t,n){for(var r=Math.min(e[0],t[0]),i=Math.min(e[1],t[1]),a=Math.max(e[0],t[0]),o=Math.max(e[1],t[1]),s=n.search({minX:r,minY:i,maxX:a,maxY:o}),c=0;c<s.length;c++)if(m(s[c].p,s[c].next.p,e,t))return!1;return!0}function p(e,t,n){return a(e[0],e[1],t[0],t[1],n[0],n[1])}function m(e,t,n,r){return e!==r&&t!==n&&p(e,t,n)>0!=p(e,t,r)>0&&p(n,r,e)>0!=p(n,r,t)>0}function h(e){var t=e.p,n=e.next.p;return e.minX=Math.min(t[0],n[0]),e.minY=Math.min(t[1],n[1]),e.maxX=Math.max(t[0],n[0]),e.maxY=Math.max(t[1],n[1]),e}function g(e){for(var t=e[0],n=e[0],r=e[0],a=e[0],o=0;o<e.length;o++){var s=e[o];s[0]<t[0]&&(t=s),s[0]>r[0]&&(r=s),s[1]<n[1]&&(n=s),s[1]>a[1]&&(a=s)}var c=[t,n,r,a],l=c.slice();for(o=0;o<e.length;o++)i(e[o],c)||l.push(e[o]);return S(l)}function _(e,t){var n={p:e,prev:null,next:null,minX:0,minY:0,maxX:0,maxY:0};return t?(n.next=t.next,n.prev=t,t.next.prev=n,t.next=n):(n.prev=n,n.next=n),n}function v(e,t){var n=e[0]-t[0],r=e[1]-t[1];return n*n+r*r}function y(e,t,n){var r=t[0],i=t[1],a=n[0]-r,o=n[1]-i;if(a!==0||o!==0){var s=((e[0]-r)*a+(e[1]-i)*o)/(a*a+o*o);s>1?(r=n[0],i=n[1]):s>0&&(r+=a*s,i+=o*s)}return a=e[0]-r,o=e[1]-i,a*a+o*o}function b(e,t,n,r,i,a,o,s){var c=n-e,l=r-t,u=o-i,d=s-a,f=e-i,p=t-a,m=c*c+l*l,h=c*u+l*d,g=u*u+d*d,_=c*f+l*p,v=u*f+d*p,y=m*g-h*h,b,x,S,C,w=y,T=y;y===0?(x=0,w=1,C=v,T=g):(x=h*v-g*_,C=m*v-h*_,x<0?(x=0,C=v,T=g):x>w&&(x=w,C=v+h,T=g)),C<0?(C=0,-_<0?x=0:-_>m?x=w:(x=-_,w=m)):C>T&&(C=T,-_+h<0?x=0:-_+h>m?x=w:(x=-_+h,w=m)),b=x===0?0:x/w,S=C===0?0:C/T;var E=(1-b)*e+b*n,D=(1-b)*t+b*r,O=(1-S)*i+S*o,k=(1-S)*a+S*s,A=O-E,j=k-D;return A*A+j*j}function x(e,t){return e[0]===t[0]?e[1]-t[1]:e[0]-t[0]}function S(e){e.sort(x);for(var t=[],n=0;n<e.length;n++){for(;t.length>=2&&p(t[t.length-2],t[t.length-1],e[n])<=0;)t.pop();t.push(e[n])}for(var r=[],i=e.length-1;i>=0;i--){for(;r.length>=2&&p(r[r.length-2],r[r.length-1],e[i])<=0;)r.pop();r.push(e[i])}return r.pop(),t.pop(),t.concat(r)}}));function xt(e,t={}){t.concavity=t.concavity||1/0;let n=[];if(Ne(e,e=>{n.push([e[0],e[1]])}),!n.length)return null;let r=(0,St.default)(n,t.concavity);return r.length>3?ve([r]):null}var St,Ct=o((()=>{V(),Fe(),St=u(bt(),1)}));function wt(e){if(!e)throw Error(`geojson is required`);switch(e.type){case`Feature`:return Tt(e);case`FeatureCollection`:return Dt(e);case`Point`:case`LineString`:case`Polygon`:case`MultiPoint`:case`MultiLineString`:case`MultiPolygon`:case`GeometryCollection`:return Ot(e);default:throw Error(`unknown GeoJSON type`)}}function Tt(e){let t={type:`Feature`};return Object.keys(e).forEach(n=>{switch(n){case`type`:case`properties`:case`geometry`:return;default:t[n]=e[n]}}),t.properties=Et(e.properties),e.geometry==null?t.geometry=null:t.geometry=Ot(e.geometry),t}function Et(e){let t={};return e&&Object.keys(e).forEach(n=>{let r=e[n];typeof r==`object`?r===null?t[n]=null:Array.isArray(r)?t[n]=r.map(e=>e):t[n]=Et(r):t[n]=r}),t}function Dt(e){let t={type:`FeatureCollection`};return Object.keys(e).forEach(n=>{switch(n){case`type`:case`features`:return;default:t[n]=e[n]}}),t.features=e.features.map(e=>Tt(e)),t}function Ot(e){let t={type:e.type};return e.bbox&&(t.bbox=e.bbox),e.type===`GeometryCollection`?(t.geometries=e.geometries.map(e=>Ot(e)),t):(t.coordinates=kt(e.coordinates),t)}function kt(e){let t=e;return typeof t[0]==`object`?t.map(e=>kt(e)):t.slice()}var At=o((()=>{})),jt=o((()=>{})),Mt=o((()=>{})),Nt=o((()=>{})),Pt=o((()=>{})),Ft=o((()=>{}));function It(e,t){var n=e[0]-t[0],r=e[1]-t[1];return n*n+r*r}function Lt(e,t,n){var r=t[0],i=t[1],a=n[0]-r,o=n[1]-i;if(a!==0||o!==0){var s=((e[0]-r)*a+(e[1]-i)*o)/(a*a+o*o);s>1?(r=n[0],i=n[1]):s>0&&(r+=a*s,i+=o*s)}return a=e[0]-r,o=e[1]-i,a*a+o*o}function Rt(e,t){for(var n=e[0],r=[n],i,a=1,o=e.length;a<o;a++)i=e[a],It(i,n)>t&&(r.push(i),n=i);return n!==i&&r.push(i),r}function zt(e,t,n,r,i){for(var a=r,o,s=t+1;s<n;s++){var c=Lt(e[s],e[t],e[n]);c>a&&(o=s,a=c)}a>r&&(o-t>1&&zt(e,t,o,r,i),i.push(e[o]),n-o>1&&zt(e,o,n,r,i))}function Bt(e,t){var n=e.length-1,r=[e[0]];return zt(e,0,n,t,r),r.push(e[n]),r}function Vt(e,t,n){if(e.length<=2)return e;var r=t===void 0?1:t*t;return e=n?e:Rt(e,r),e=Bt(e,r),e}function Ht(e,t={}){if(t??={},!we(t))throw Error(`options is invalid`);let n=t.tolerance??1,r=t.highQuality??!1,i=t.mutate??!1;if(!e)throw Error(`geojson is required`);if(n&&n<0)throw Error(`invalid tolerance`);return i!==!0&&(e=wt(e)),Pe(e,function(e){Ut(e,n,r)}),e}function Ut(e,t,n){let r=e.type;if(r===`Point`||r===`MultiPoint`)return e;if(ct(e,{mutate:!0}),r!==`GeometryCollection`)switch(r){case`LineString`:e.coordinates=Vt(e.coordinates,t,n);break;case`MultiLineString`:e.coordinates=e.coordinates.map(e=>Vt(e,t,n));break;case`Polygon`:e.coordinates=Wt(e.coordinates,t,n);break;case`MultiPolygon`:e.coordinates=e.coordinates.map(e=>Wt(e,t,n))}return e}function Wt(e,t,n){return e.map(function(e){if(e.length<4)throw Error(`invalid polygon`);let r=t,i=Vt(e,r,n);for(;!Gt(i)&&r>=2**-52;)r-=r*.01,i=Vt(e,r,n);return Gt(i)?((i[i.length-1][0]!==i[0][0]||i[i.length-1][1]!==i[0][1])&&i.push(i[0]),i):e})}function Gt(e){return e.length<3?!1:!(e.length===3&&e[2][0]===e[0][0]&&e[2][1]===e[0][1])}var Kt=o((()=>{dt(),At(),Fe(),V()})),qt=o((()=>{rt(),At(),jt(),Ct(),Me(),V(),Ae(),Fe(),Mt(),Nt(),Pt(),Ft(),Kt()}));function Jt(e){let{r:t,normalized:n,durMin:r,totalPers:i,distance_m:a,dist_ini_fin:o,actualSeg:s,ptIni:c,isCompletada:l,hogaresRaw:u}=e,d=[];if(t._backend_meta&&t._backend_meta.flags){let e=t._backend_meta.flags;e.distance_gt_500m&&d.push(`FUERA_SEGMENTO`),e.hogar_count_mismatch&&d.push(`HOGARES_INCONSISTENTES`),e.integrantes_mismatch&&d.push(`INTEGRANTES_INCONSISTENTES`),e.wrong_segment&&d.push(`SEGMENTO_INCORRECTO`),e.far_from_control&&d.push(`CONTROL_DISTANTE`)}try{let e=E(t[`start-geopoint`]||t.start_geopoint)||(t._geolocation?.length>=2?[t._geolocation[0],t._geolocation[1]]:null);e&&c&&c[0]&&je([e[1],e[0]],[c[1],c[0]],{units:`meters`})>500&&d.push(`APERT_LEJOS`)}catch{}a!==null&&a>600&&!d.includes(`FUERA_SEGMENTO`)&&d.push(`FUERA_SEGMENTO`),o!==null&&o>30&&d.push(`DESPLAZAMIENTO_ANOMALO`),l&&r!==null&&(n.formType===`EHM`&&i===1&&r<10?d.push(`TIEMPO_CORTO_EHM`):n.formType!==`EHM`&&r<15?d.push(`TIEMPO_CORTO_ESCA`):r<15&&d.push(`TIEMPO_CORTO`)),l&&r!==null&&r>45&&d.push(`TIEMPO_LARGO`);let f=n.cedula;if(f&&f!==`N/A`){let e=f.replace(/\D/g,``);(e.length<6||e.length>9)&&d.push(`CEDULA_INVALIDA`)}u.forEach(e=>{(Array.isArray(e[`datos_hogar/hogar/integrantes_hogar`])?e[`datos_hogar/hogar/integrantes_hogar`]:[]).forEach(e=>{let t=e[`datos_hogar/hogar/integrantes_hogar/integrantes/cuanto_actividad`];if(t!=null&&t!==``){let e=Number(t);!isNaN(e)&&(e<1||e>9999999)&&(d.includes(`INGRESO_ANOMALO`)||d.push(`INGRESO_ANOMALO`))}})}),u.forEach(e=>{let t=e[`datos_hogar/hogar/productos_22/arranque`]||``,n=e[`datos_hogar/hogar/productos_22/productos`],r=Array.isArray(n)&&n.length>0;l&&r&&!t&&(d.includes(`ARRANQUE_INCONSISTENTE`)||d.push(`ARRANQUE_INCONSISTENTE`))});let p=n.segmento===`000`||n.segmento===`0`?n.sector:n.segmento;return s&&p&&(D(p,s)||d.push(`SEGMENTO_INCORRECTO`)),d}var Yt=o((()=>{w(),A(),qt()}));function Xt(e){return e?String(e).toLowerCase().normalize(`NFD`).replace(/[\u0300-\u036f]/g,``).replace(/[^a-z0-9]/g,``).trim():``}function Zt(e){let t=Xt(e);return t?Qt.has(t)?`TIPO A`:$t.has(t)?`TIPO B`:en.has(t)?`TIPO C`:tn.has(t)?`TIPO E`:`NO DEFINIDO`:`NO DEFINIDO`}var Qt,$t,en,tn,nn=o((()=>{Qt=new Set([`AUSENTE TEMPORALMENTE`,`AUSENTETEMPORALMENTE`,`ausente_temporalmente`,`NADIE EN LA VIVIENDA AL MOMENTO DE LA ENTREVISTA`,`nadie_en_vivienda`,`REHUSO LA ENTREVISTA`,`REHUSÓ LA ENTREVISTA`,`REHUSOLAENTREVISTA`,`rehuso_entrevista`,`OCUPANTES AUSENTES`,`OCUPANTES_AUSENTES`,`INFORMANTE NO CALIFICADO`,`INFORMANTE_NO_CALIFICADO`,`INCOMPLETA`,`PENDIENTE`,`NO ATIENDE TELEFONO`,`RECHAZO`,`SIN ENTREVISTA`,`RECHAZADA`,`OTRO_AUSENTES`].map(e=>Xt(e))),$t=new Set([`CONSTRUCCION`,`EN CONSTRUCCION`,`en_construccion`,`INADECUADA PARA EL USO`,`inadecuada_el_uso`,`CONSTRUYENDOSE`,`CONSTRUYÉNDOSE`,`VIVIENDA DESOCUPADA`,`VIVIENDA OCASIONAL`,`USO VACACIONAL`,`uso_vacacional`,`USO_VACACIONAL`,`TEMPORALMENTE EN NEGOCIO`,`temporalmente_en_negocio`,`DESOCUPADA EN ESTADO REGULAR`,`desocupada_estado_regular`,`VIVIENDA_DESOCUPADA`,`OTRO_DESOCUPADA`].map(e=>Xt(e))),en=new Set([`DEMOLIDA`,`demolida`,`OTRO (ESPECIFIQUE)`,`MAL LISTADA`,`NO EXISTE`,`SIN LISTAR`,`NO RESIDENCIAL`,`NO RESIENDECIAL`,`OTRO`,`NO EXISTE NRO TELEFONICO`,`NEGOCIO PERMANENTE`,`OTRA SITUACION`,`CONSOLIDADA`,`NEGOCIO O ALMACEN PERMANENTE`,`negocio_almacen_permanente`].map(e=>Xt(e))),tn=new Set([`OCUPADA CON OCUPANTES PRESENTES`,`ocupada_con_ocupantes_presentes`,`TOTALMENTE ENCUESTADA`].map(e=>Xt(e)))}));async function rn(){console.log(`data/index.js: Processing data pipeline (Optimized)...`),f.encMap={};let e=f.controlsIndex instanceof Map&&f.controlsIndex.size>0,t=f.rawData.length;for(let n=0;n<t;n+=500){let r=Math.min(n+500,t);for(let t=n;t<r;t++){let n=f.rawData[t],r=ce(n),i=n._backend_meta&&n._backend_meta.duration_minutes!==void 0?n._backend_meta.duration_minutes:le(r.start,r.end),{totalPers:a,totalHombres:o,totalMujeres:s,hogaresCount:c,hogaresRaw:l}=de(n,r.formType),{ptIni:u}=me(n),d=n._geo_meta||{},p=d.lat??null,m=d.lng??null,h=d.distance_m??null,g=d.dist_ini_fin??null,_=d.actual_seg??null,v=0;Array.isArray(l)&&l.forEach(e=>{let t=(Array.isArray(e[`lista_hogar/lista_miembros`])?e[`lista_hogar/lista_miembros`]:Array.isArray(e[`datos_hogar/hogar/integrantes_hogar`])?e[`datos_hogar/hogar/integrantes_hogar`]:[]).length;if(t===0){let n=parseInt(e[`lista_hogar/personas_hogar`]||e[`lista_hogar/lista_miembros_count`]||`0`,10);isNaN(n)||(t=n)}t===1&&v++});let y=Zt(r.situacion_vivienda||r.condicion),b=/totalment/i.test(r.nota)||y===`TIPO E`;if(n._meta={...r,durMin:i,totalPers:a,totalHombres:o,totalMujeres:s,hogares:c,hogaresUniPersonales:v,lat:p,lng:m,distance_m:h,dist_ini_fin:g,actual_seg:_,estado:b?`completada`:`no_efectiva`,tipo_vivienda:y,flag_distance_gt_500:h!==null&&h>500,flag_short_duration:i!==null&&i<10},n._meta.alertas=Jt({r:n,normalized:r,durMin:i,totalPers:a,distance_m:h,dist_ini_fin:g,actualSeg:_,ptIni:u,isCompletada:b,hogaresRaw:l}),n._meta.hasAlerts=n._meta.alertas.length>0,e){let e=n._meta.control?n._meta.control.slice(-4):``,t=`${e}-${String(parseInt(n._meta.n_serie,10)||0)}-${String(parseInt(n._meta.n_linea,10)||0)}`,r=f.controlsIndex.has(t),i=f.validControls.has(e);n._meta._ls_ctrl_ok=i,n._meta._ls_serie_ok=r,n._meta._ls_linea_ok=r,r||n._meta.alertas.includes(`LINEA_SERIE_INVALIDA`)||(n._meta.alertas.push(`LINEA_SERIE_INVALIDA`),n._meta.hasAlerts=!0)}let{cedula:x,nombre:S,estado:C,mun:w,condicion:T,semana:E,control:D}=n._meta;f.encMap[x]||(f.encMap[x]={cedula:x,nombre:S,encuestas:0,completadas:0,duraciones:[],personas:0,municipios:new Set,condiciones:{},semanas:{}});let O=f.encMap[x];O.encuestas++,C===`completada`&&O.completadas++,i!==null&&O.duraciones.push(i),O.personas+=a||0,O.municipios.add(w),O.condiciones[T]=(O.condiciones[T]||0)+1,E&&(O.semanas[E]||(O.semanas[E]=new Set),D&&O.semanas[E].add(D))}await new Promise(e=>setTimeout(e,0))}for(let e of Object.values(f.encMap)){e.avgDur=e.duraciones.length?e.duraciones.reduce((e,t)=>e+t,0)/e.duraciones.length:0,e.pctCompleta=e.encuestas>0?Math.round(e.completadas/e.encuestas*100):0,e.score=e.pctCompleta;let t=Object.values(e.semanas||{});e.avgControlesSemana=t.length?Math.round(t.reduce((e,t)=>e+t.size,0)/t.length):0,e.totalSemanas=t.length}console.log(`data/index.js: Pipeline completed ✓`)}var an=o((()=>{w(),ue(),pe(),he(),Yt(),nn()}));function on(){let e=O(`activeFiltersContainer`),t=O(`activeFiltersBadge`);if(!e||!t)return;let n=[{id:`filterMunicipio`,label:`Mpio`},{id:`filterParroquia`,label:`Parr`},{id:`filterNodo`,label:`Nodo`},{id:`filterEstado`,label:`Estado`},{id:`filterCondicion`,label:`Condición`},{id:`filterSituacionVivienda`,label:`Sit. Viv`},{id:`filterUso`,label:`Uso`},{id:`filterSemana`,label:`Sem`},{id:`filterControl`,label:`Control`},{id:`filterAlerta`,label:`Alerta`},{id:`filterClasificacion`,label:`Clasif`}],r=0;e.innerHTML=``,n.forEach(t=>{let n=O(t.id);if(n&&n.value){r++;let i=n.options[n.selectedIndex].text,a=document.createElement(`button`);a.className=`group flex items-center gap-2 px-3 py-1.5 bg-brand-blue/10 hover:bg-brand-red/10 border border-brand-blue/30 hover:border-brand-red/30 text-brand-blue hover:text-brand-red rounded-lg text-[10px] font-bold transition-all`,a.innerHTML=`
                <span class="opacity-70">${t.label}:</span> 
                <span>${i}</span> 
                <i data-lucide="x" class="w-3 h-3 group-hover:scale-110 transition-transform"></i>
            `,a.addEventListener(`click`,()=>{n.value=``,t.id===`filterMunicipio`&&n.dispatchEvent(new Event(`change`)),q()}),e.appendChild(a)}}),r>0?(t.textContent=r,t.classList.remove(`hidden`),e.classList.remove(`hidden`)):(t.classList.add(`hidden`),t.textContent=`0`,e.classList.add(`hidden`)),window.lucide&&lucide.createIcons()}var sn=o((()=>{A(),un()}));function cn(e){J=e}function q(){let e=O(`searchEncuesta`)?.value.toLowerCase()??``,t=O(`filterEncuestador`)?.value??``,n=O(`filterFechaInicio`)?.value??``,r=O(`filterFechaFin`)?.value??``,i=O(`filterSemana`)?.value??``,a=O(`filterControl`)?.value??``,o=O(`filterMunicipio`)?.value??``,s=O(`filterParroquia`)?.value??``,c=O(`filterNodo`)?.value??``,l=O(`filterEstado`)?.value??``,u=O(`filterSituacionVivienda`)?.value??``,d=O(`filterCondicion`)?.value??``,p=O(`filterUso`)?.value??``,m=O(`filterAlerta`)?.value??``,h=O(`filterHoraTransmision`)?.value??``,g=O(`filterHoraInicio`)?.value??``,_=O(`filterClasificacion`)?.value??``;f.filtered=f.rawData.filter(v=>{let y=v._meta;return!(!y||e&&!(y.nombre.toLowerCase().includes(e)||y.cedula.includes(e)||y.control.includes(e))||t&&y.cedula!==t||f.filterINE&&!b.has(String(y.cedula).trim())||f.filterSEGEN&&b.has(String(y.cedula).trim())||n&&y.fecha<n||r&&y.fecha>r||i&&y.semana!==i||a&&y.control!==a||o&&y.mun!==o||s&&y.par!==s||c&&y.nodo!==c||l===`completada`&&y.estado!==`completada`||l===`no_efectiva`&&y.estado===`completada`||f.quickFilterMode===`efectivas`&&y.estado!==`completada`||f.quickFilterMode===`no_efectiva`&&y.estado===`completada`||f.quickFilterMode===`alertas`&&!y.hasAlerts||u&&y.situacion_vivienda!==u||d&&y.condicion!==d||p&&y.uso!==p||m&&!y.alertas.includes(m)||h!==``&&String(y.hora_trans)!==h||g!==``&&String(y.hora)!==g||_&&y.tipo_vivienda!==_)}),on(),typeof J==`function`&&J(),document.dispatchEvent(new CustomEvent(`filtersApplied`))}function ln(){[`filterEncuestador`,`filterFechaInicio`,`filterFechaFin`,`filterSemana`,`filterControl`,`filterMunicipio`,`filterParroquia`,`filterNodo`,`filterEstado`,`filterCondicion`,`filterSituacionVivienda`,`filterUso`,`filterAlerta`,`filterHoraTransmision`,`filterHoraInicio`,`filterClasificacion`,`searchEncuesta`,`mm111SearchControl`].forEach(e=>{let t=O(e);t&&(t.value=``)}),O(`filterMunicipio`)&&O(`filterMunicipio`).dispatchEvent(new Event(`change`)),f.filterINE=!1,f.filterSEGEN=!1,[`filterINE`,`filterSEGEN`].forEach(e=>{let t=O(e);t&&t.classList.remove(`active`,`bg-brand-emerald`,`bg-brand-purple`,`text-white`)}),f.filtered=[...f.rawData],f.quickFilterMode=`all`,typeof window.setQuickFilter==`function`&&window.setQuickFilter(`all`),on(),typeof J==`function`&&J()}var J,un=o((()=>{w(),A(),sn(),J=()=>{}}));function dn(){let e=O(`offCanvasFilters`),t=O(`filtersOverlay`);!e||!t||(e.classList.remove(`translate-x-full`),t.classList.remove(`hidden`),setTimeout(()=>t.classList.remove(`opacity-0`),10))}function fn(){let e=O(`offCanvasFilters`),t=O(`filtersOverlay`);!e||!t||(e.classList.add(`translate-x-full`),t.classList.add(`opacity-0`),setTimeout(()=>t.classList.add(`hidden`),300))}function pn(){let e={enc:O(`filterEncuestador`),mun:O(`filterMunicipio`),con:O(`filterCondicion`),sit:O(`filterSituacionVivienda`),uso:O(`filterUso`),sem:O(`filterSemana`),ctrl:O(`filterControl`),par:O(`filterParroquia`),nodo:O(`filterNodo`),alerta:O(`filterAlerta`),htrans:O(`filterHoraTransmision`),hinicio:O(`filterHoraInicio`)};Object.values(e).forEach(e=>{if(e){let t=`Todos`;e.id===`filterAlerta`?t=`Todas las alertas`:e.id===`filterHoraTransmision`||e.id===`filterHoraInicio`?t=`Cualquier hora`:(e.id.includes(`Condicion`)||e.id.includes(`Semana`)||e.id.includes(`Parroquia`))&&(t=`Todas`),e.innerHTML=`<option value="">${t}</option>`}}),e.alerta&&g.forEach(t=>{let n=document.createElement(`option`);n.value=t.code,n.textContent=t.label,e.alerta.appendChild(n)});let t={muns:new Set,sitVs:new Set,cons:new Set,usos:new Set,semanas:new Set,controles:new Set,pars:new Set,nodos:new Set,hTrans:new Set,hInicio:new Set};e.enc&&Object.values(f.encMap).sort((e,t)=>e.nombre.localeCompare(t.nombre)).forEach(t=>{let n=b.has(String(t.cedula).trim()),r=document.createElement(`option`);r.value=t.cedula,r.textContent=`${t.nombre} (${t.cedula})${n?` [INE]`:` [SEGEN]`}`,r.style.color=n?`#10B981`:`#8B5CF6`,r.style.fontWeight=`bold`,e.enc.appendChild(r)}),f.rawData.forEach(e=>{let n=e._meta;n&&(n.mun&&n.mun!==`N/A`&&t.muns.add(n.mun),n.situacion_vivienda&&t.sitVs.add(n.situacion_vivienda),n.condicion&&n.condicion!==`N/A`&&t.cons.add(n.condicion),n.uso&&n.uso!==`N/A`&&t.usos.add(n.uso),n.semana&&t.semanas.add(n.semana),n.control&&t.controles.add(n.control),n.par&&n.par!==`N/A`&&t.pars.add(n.par),n.nodo&&n.nodo!==`N/A`&&t.nodos.add(n.nodo),n.hora_trans!==void 0&&n.hora_trans!==null&&t.hTrans.add(n.hora_trans),n.hora!==void 0&&n.hora!==null&&t.hInicio.add(n.hora))});let n=(e,t,n)=>{e&&[...t].sort().forEach(t=>{let r=document.createElement(`option`);r.value=t,r.textContent=n?n(t):t,e.appendChild(r)})};n(e.mun,t.muns),n(e.par,t.pars),n(e.nodo,t.nodos),n(e.sem,t.semanas),n(e.ctrl,t.controles),n(e.sit,t.sitVs,e=>e.replace(/_/g,` `).toUpperCase()),n(e.con,t.cons,e=>e.replace(/_/g,` `).toUpperCase()),n(e.uso,t.usos,e=>e.replace(/_/g,` `).toUpperCase()),n(e.htrans,t.hTrans,e=>`${e}:00`),n(e.hinicio,t.hInicio,e=>`${e}:00`),e.mun&&e.mun.dispatchEvent(new Event(`change`))}var mn=o((()=>{w(),A()})),hn=o((()=>{un(),mn(),sn()})),Y,X,gn,_n,vn,yn,bn=o((()=>{Y=(e,t)=>{if(!e)return null;if(e._meta&&e._meta[t]!==void 0&&e._meta[t]!==null)return e._meta[t];if(e[t]!==void 0&&e[t]!==null)return e[t];let n=String(t).split(`/`).map(e=>e.trim());for(let t of n)if(!(!t||t.includes(` `))&&e[t]!==void 0&&e[t]!==null)return e[t];return null},X=e=>e==null||e===``?`<span class="text-slate-500 font-medium italic">(No Registrado)</span>`:typeof e==`object`?`<pre class="text-[10px] bg-slate-950/20 p-2 rounded overflow-x-auto">${JSON.stringify(e,null,2)}</pre>`:`<span class="font-outfit font-bold text-slate-800 dark:text-slate-200 text-sm">${String(e)}</span>`,gn=e=>{if(!e||typeof e!=`string`)return null;let t=e.trim().split(` `);return t.length>=2?{lat:parseFloat(t[0]),lng:parseFloat(t[1]),alt:t[2]?parseFloat(t[2]):null,acc:t[3]?parseFloat(t[3]):null}:null},_n=(e,t)=>{if(!e||!t)return null;let n=e=>e*Math.PI/180,r=n(t.lat-e.lat),i=n(t.lng-e.lng),a=Math.sin(r/2)**2+Math.cos(n(e.lat))*Math.cos(n(t.lat))*Math.sin(i/2)**2;return 6371e3*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a))},vn=(e,t)=>String(parseInt(e,10)||0).padStart(t,`0`),yn=(e,t,n)=>`${String(e||``).trim().slice(-4)}-${String(parseInt(t,10)||0)}-${String(parseInt(n,10)||0)}`}));function xn(e){let{stEntidad:t,stMpio:n,stParr:r,valHeader:i,valLeftLabel:a,valLeftVal:o,segmentMatchStatus:s,actualSegClasses:c,actualSegText:l,actualSeg:u,stSect:d,stNodo:f,stEncuestador:p,stCedula:m,stFecha:h,stEstado:g,stDur:_,stControl:v,stLinea:y,stSerie:b,ctrlPanelHtml:x,stHogares:S,stPers:C,stCond:w,stUso:T,stDist:E,hasAlerts:D,alertsHtml:O,hasMapData:k,isFlagged:A,walkedDistance:j,rawDist:M,durMin:N,declaredSeg:P,alertas:F}=e,I=k?`
        <div class="bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/50 overflow-hidden mt-4">
            <div class="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <div class="flex items-center gap-3">
                    <h4 class="text-[10px] uppercase font-black text-brand-orange tracking-widest flex items-center gap-2 m-0">Verificación Geográfica Histórica</h4>
                    ${A?`<span class="px-2 py-0.5 rounded text-[9px] uppercase font-bold tracking-widest bg-brand-red/20 text-brand-red border border-brand-red/30">Desviación Detectada</span>`:``}
                </div>
                <div class="flex items-center gap-4 text-[9px] uppercase font-bold text-slate-500">
                    <div class="flex items-center gap-1.5"><div class="w-2 h-2 rounded-full bg-[#38BDF8]"></div> Vivienda</div>
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
                        <div class="flex justify-between items-center mb-1 mt-2 md:mt-0"><span class="text-[10px] text-slate-500 font-bold">Seg. Declarado:</span><span class="text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300">#${P||`N/A`}</span></div>
                        <div class="flex justify-between items-center mb-2 border-b border-slate-100 dark:border-slate-700/50 pb-2"><span class="text-[10px] text-slate-500 font-bold">Seg. en Mapa:</span><span class="text-[10px] font-mono font-bold ${F.includes(`SEGMENTO_INCORRECTO`)||F.includes(`FUERA_SEGMENTO`)?`text-brand-red`:`text-brand-emerald`}">${u?`#`+u:`(Nulo)`}</span></div>
                        <div class="flex justify-between items-center mb-1"><span class="text-[10px] text-slate-500 font-bold">Desplazamiento:</span><span class="text-[10px] font-mono font-bold ${F.includes(`DESPLAZAMIENTO_ANOMALO`)?`text-brand-orange`:`text-slate-700 dark:text-slate-300`}">${j===null?`N/A`:Math.round(j)+`m`}</span></div>
                        <div class="flex justify-between items-center mb-1"><span class="text-[10px] text-slate-500 font-bold">Dist. Centro:</span><span class="text-[10px] font-mono font-bold ${A?`text-brand-red`:`text-brand-emerald`}">${M===null?`N/A`:Math.round(M)+`m`}</span></div>
                        <div class="flex justify-between items-center"><span class="text-[10px] text-slate-500 font-bold">Tiempo Base:</span><span class="text-[10px] font-mono text-brand-blue font-bold">${N?parseFloat(N).toFixed(2)+` min`:`N/A`}</span></div>
                    </div>
                </div>
                <div id="detailMap" class="absolute inset-0 z-0 bg-slate-100 dark:bg-slate-800"></div>
            </div>
            <div class="p-1 border-t border-slate-200 dark:border-slate-700 text-center text-[10px] text-slate-400 leading-tight">El círculo sombreado indica la zona válida de cobertura (radio de 500m).</div>
        </div>`:`
        <div class="mt-4 p-4 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl text-center text-slate-500">
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
                        <div class="text-[10px] text-slate-500 font-bold uppercase mb-1">Desplazamiento (Inicio &rarr; Fin)</div>
                        ${E}
                    </div>
                    <div class="pt-2 border-t border-slate-200 dark:border-slate-700">
                        <div class="flex items-center gap-1.5 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${D?`#EF4444`:`#10B981`}" stroke-width="2.5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                            <span class="text-[10px] text-slate-500 font-bold uppercase">${D?`Alertas (${F.length})`:`Sin Alertas`}</span>
                        </div>
                        ${O}
                    </div>
                </div>
            </div>
        </div>
        ${I}
    `}function Sn(e,t){return!e||e.length===0?`<span class="text-[10px] font-bold text-brand-emerald">✔ Encuesta dentro de parámetros normales</span>`:e.map(e=>{let n=v[e];if(!n)return``;let r=``;return e===`LINEA_SERIE_INVALIDA`&&(r=`<div class="mt-1 px-2 py-1 bg-red-100 dark:bg-red-900/30 rounded text-[9px] font-mono text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800/50">
                <b>Error de Datos:</b> ${t._ls_key_reported||`—`}
            </div>`),`<div class="mb-2 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rounded-lg">
            <div class="text-[10px] font-black text-brand-red mb-0.5">⚠ ${n.label}</div>
            <div class="text-[9px] text-slate-500 dark:text-slate-400 leading-tight">${n.detail.replace(/\n/g,` `).trim()}</div>
            ${r}
        </div>`}).join(``)}function Cn(e){let{m:t,rawControl:n,rawSerie:r,rawLinea:i,_padM:a,hasCtrlIndex:o,ctrlEntry:s,ctrlKey:c}=e,l=o?``:`<div class="mt-2 text-[9px] text-slate-400 bg-slate-100 dark:bg-slate-800 rounded px-2 py-1.5 text-center">⚠ Índice de controles no cargado aún</div>`,u=``;o&&!s&&e.validCombos&&e.validCombos.length>0&&(u=`
            <div class="mt-2 p-2 bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded text-[9px] text-slate-600 dark:text-slate-400">
                <div class="font-bold mb-1 text-slate-700 dark:text-slate-300 text-center uppercase tracking-wider">Pares S/L válidos para este Control:</div>
                <div class="grid grid-cols-2 gap-1 font-mono text-center">
                    ${e.validCombos.map(e=>`<div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded py-0.5"><span class="text-slate-400">S:</span>${a(e.serie,2)} <span class="text-slate-400 ml-1">L:</span>${a(e.linea,3)}</div>`).join(``)}
                </div>
            </div>
        `);let d=o&&!s?`<div class="mt-2 px-2 py-1.5 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/30 rounded text-[9px] text-red-700 dark:text-red-300 text-center">Clave <b class="font-mono">${c}</b><br>no existe en CONTROLES.geojson</div>${u}`:``;return`<div class="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-5 border border-slate-200 dark:border-slate-700/50">
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
            ${d}
        </div>
    </div>`}function wn(e){return`<details class="mt-3 text-sm text-slate-400 group">
        <summary class="cursor-pointer font-bold text-[10px] uppercase tracking-widest flex items-center gap-2">Ver JSON crudo</summary>
        <pre class="text-[10px] bg-slate-100 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 p-2 rounded-lg mt-2 overflow-x-auto text-slate-700 dark:text-slate-300 font-mono">${JSON.stringify(e,null,2)}</pre>
    </details>`}function Tn(e){let{cod:t,mun:n,par:r,declaredSeg:i,actualSeg:a,featureLabel:o,displayId:s,color:c,isCurrent:l,isActual:u}=e,d=[l?`<span style="background:#FBBF2433;color:#FBBF24;border:1px solid #FBBF2466;padding:1px 6px;border-radius:4px;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.05em">Declarado</span>`:``,u&&!l?`<span style="background:#10B98133;color:#10B981;border:1px solid #10B98166;padding:1px 6px;border-radius:4px;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.05em">Calculado GPS</span>`:``,u&&l?`<span style="background:#10B98133;color:#10B981;border:1px solid #10B98166;padding:1px 6px;border-radius:4px;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.05em">✔ Coincide</span>`:``].filter(Boolean).join(` `);return`
        <div class="dark:text-slate-200" style="font-family:'Inter',sans-serif;min-width:180px;max-width:240px;padding:2px">
            <div class="dark:border-slate-700" style="font-family:'Outfit',sans-serif;font-weight:900;font-size:12px;color:#6366f1;border-bottom:1px solid #e2e8f0;padding-bottom:6px;margin-bottom:8px">
                ${o} <span class="text-slate-800 dark:text-white" style="font-size:15px;">#${s}</span>
            </div>
            ${d?`<div style="margin-bottom:8px;display:flex;gap:4px;flex-wrap:wrap">${d}</div>`:``}
            <div style="font-size:10px;margin-bottom:3px" class="text-slate-500 dark:text-slate-400"><b>Municipio:</b> ${n}</div>
            <div style="font-size:10px;" class="text-slate-500 dark:text-slate-400"><b>Parroquia:</b> ${r}</div>
        </div>`}function En(e,t,n,r,i,a){return`<div class="font-inter p-1 w-52">
        <div class="font-outfit font-black text-xs uppercase tracking-widest border-b border-slate-200 pb-1 mb-2" style="color:${t}">${e}</div>
        <div class="flex justify-between items-center text-[10px] mb-1"><span class="font-bold text-slate-500">Coordenada:</span><span class="font-mono text-slate-700">${n.lat.toFixed(5)}, ${n.lng.toFixed(5)}</span></div>
        <div class="flex justify-between items-center text-[10px] mb-1"><span class="font-bold text-slate-500">Precisión GPS:</span><span class="font-mono font-bold">${r}</span></div>
        <div class="flex justify-between items-center text-[10px] mb-1"><span class="font-bold text-slate-500">Altitud Nivel Mar:</span><span class="font-mono text-slate-700">${i}</span></div>
        <div class="flex justify-between items-center text-[10px] border-t border-slate-100 pt-1 mt-1"><span class="font-bold text-slate-500">Hora de Captura:</span><span class="font-mono text-brand-purple font-bold">${a}</span></div>
    </div>`}var Dn=o((()=>{w()}));function On(e,t,n,r){return`<div class="p-2 font-sans">
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
    </div>`}function kn(e){return`<div style="font-family:Inter,sans-serif;font-size:11px;line-height:1.5">
        <b>Control ${e.CONTROL}</b> · Serie ${e.SERIE}<br>
        Línea ${e.LINEA} · Seg ${e.COD_SEG} · Manz ${e.COD_MANZA}
    </div>`}function An(e,t,n,r,i,a,o,s){let c=a&&a.length>0,l=e.segmento||e.sector||e.manzana||e.parcela||e.edificacion||e.direccion?`
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
            <div class="text-[10px] text-slate-500 dark:text-slate-400 mb-1">${e.fecha} · ${e.cedula}</div>
            <div class="flex gap-2 text-[9px] font-bold text-brand-blue mb-3">
                <span class="bg-brand-blue/5 px-1.5 py-0.5 rounded">Ctrl: ${e.control?e.control.slice(-4):`—`}</span>
                <span class="bg-brand-blue/5 px-1.5 py-0.5 rounded">S: ${e.n_serie||`—`}</span>
                <span class="bg-brand-blue/5 px-1.5 py-0.5 rounded">L: ${e.n_linea||`—`}</span>
            </div>
            
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
                    <div class="text-[8px] uppercase text-slate-400 dark:text-slate-500 font-bold">Desplazamiento <span class="font-normal lowercase tracking-normal opacity-80">(ini&rarr;fin)</span></div>
                    <div class="text-[10px] font-bold" style="color:${e.dist_ini_fin!==null&&e.dist_ini_fin>30?`#EF4444`:`#10B981`}">${e.dist_ini_fin===null?`—`:Math.round(e.dist_ini_fin)+` m`}</div>
                </div>
            </div>

            ${c?`
            <div class="border-t border-red-500/10 dark:border-red-500/20 pt-3 mb-3">
                <div class="flex items-center gap-1.5 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2.5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                    <span class="text-[8px] uppercase font-bold text-red-500 dark:text-red-400 tracking-wider">Alertas Detectadas (${a.length})</span>
                </div>
                ${a.map(e=>{let t=v[e];return t?`<div class="mb-1 p-1 bg-red-500/5 dark:bg-red-500/10 border border-red-500/10 dark:border-red-500/20 rounded-lg flex items-center gap-2" title="${t.detail.replace(/\n/g,``).trim()}">
                        <div class="text-[9px] font-black text-red-500 dark:text-red-400">⚠ ${t.label}</div>
                    </div>`:``}).join(``)}
            </div>`:``}

            ${l}

            <div class="border-t border-slate-100 dark:border-white/5 pt-3 mb-3">
                <button onclick="window.viewTraceByRecord('${t}')" class="w-full justify-center px-3 py-1.5 bg-brand-blue/10 dark:bg-brand-blue/20 hover:bg-brand-blue/20 dark:hover:bg-brand-blue/40 border border-brand-blue/20 dark:border-brand-blue/30 text-brand-blue rounded-lg text-[9px] font-bold uppercase tracking-widest transition-colors flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><circle cx="10" cy="13" r="2"/><path d="m16 19-3.5-3.5"/></svg> Abrir Ficha de Inspección
                </button>
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
    `}function jn(e){return`<div style="
        width:22px;height:22px;border-radius:50%;
        background:#F97316;border:2px solid white;
        display:flex;align-items:center;justify-content:center;
        font-family:Inter,sans-serif;font-size:9px;font-weight:900;
        color:white;box-shadow:0 2px 6px rgba(0,0,0,0.4);
        cursor:pointer;
    ">${e}</div>`}function Mn(e,t,n,r){return`
        <div style="font-family:Inter,sans-serif;font-size:11px;line-height:1.6;padding:2px 4px">
            <b>#${e} · ${t}</b><br>
            ${n.nombre||`—`}<br>
            Ctrl: ${n.control?n.control.slice(-4):`—`} · S${n.n_serie||`—`} · L${n.n_linea||`—`}<br>
            Duración: ${r}
        </div>
    `}var Nn=o((()=>{w()}));function Pn(e){let{displayLat:t,displayLng:n,declaredSeg:r,actualSeg:i,ptStart:a,ptIni:o,ptFin:s,ptMain:c,isFlagged:l,rec:u}=e,d=yn(Y(u,`group_sh53u78/control`)||Y(u,`control`)||``,Y(u,`n_serie`)||``,Y(u,`n_linea`)||``);if(!f.detailMiniMapObj){f.detailMiniMapObj=L.map(`detailMap`,{zoomControl:!1}).setView([t,n],16);let e=L.tileLayer(`https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}`,{maxZoom:20,subdomains:[`mt0`,`mt1`,`mt2`,`mt3`],attribution:`&copy; Google`}),r=L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,{attribution:`&copy; OpenStreetMap contributors`});e.addTo(f.detailMiniMapObj),f.detailMiniMapLayerControl=L.control.layers({"Google Satélite":e,OpenStreetMap:r},null,{position:`topright`}).addTo(f.detailMiniMapObj)}else if(f.detailMiniMapObj.setView([t,n],16),f.detailMiniMapObj.eachLayer(e=>{e instanceof L.TileLayer||f.detailMiniMapObj.removeLayer(e)}),f.detailMiniMapLayerControl){f.detailMiniMapObj.removeControl(f.detailMiniMapLayerControl);let e=L.tileLayer(`https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}`,{maxZoom:20,subdomains:[`mt0`,`mt1`,`mt2`,`mt3`],attribution:`&copy; Google`}),t=L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,{attribution:`&copy; OpenStreetMap contributors`});f.detailMiniMapLayerControl=L.control.layers({"Google Satélite":e,OpenStreetMap:t},null,{position:`topright`}).addTo(f.detailMiniMapObj)}let p={};if(f.geoJSONData&&(p.Segmentos=L.geoJSON(f.geoJSONData,{style:e=>{let t=String(e.properties.cod_seg||`0`),n=String(e.properties.cod_seg)===String(r),i=m[t.split(``).reduce((e,t)=>e+t.charCodeAt(0),0)%m.length];return{color:n?`#FBBF24`:i,weight:n?2.5:1.5,opacity:.9,fillColor:n?`#FBBF24`:i,fillOpacity:n?.35:.15}},onEachFeature:(e,t)=>{let n=e.properties||{},a=n.cod_seg||n.id||`N/A`,o=n.cod_munici||n.mun||`N/A`,s=n.cod_parroq||n.par||`N/A`,c=String(a)===String(r),l=String(a)===String(i),u=String(a)===`000`||String(a)===`0`,d=Tn({cod:a,mun:o,par:s,declaredSeg:r,actualSeg:i,featureLabel:u?`Sector`:`Segmento`,displayId:u?n.cod_sc||`000`:a,isCurrent:c,isActual:l});t.bindPopup(d,{className:`custom-popup`,maxWidth:260})}}).addTo(f.detailMiniMapObj)),f.controlsData&&(p[`Vivienda Esperada`]=L.geoJSON(f.controlsData,{filter:e=>{let t=e.properties;return yn(t.CONTROL,t.SERIE,t.LINEA)===d},pointToLayer:(e,t)=>L.circleMarker(t,{radius:7,fillColor:`#38BDF8`,color:`#ffffff`,weight:2,opacity:1,fillOpacity:1}),onEachFeature:(e,t)=>{t.bindPopup(kn(e.properties),{className:`custom-popup`})}}).addTo(f.detailMiniMapObj)),f.detailMiniMapLayerControl)for(let[e,t]of Object.entries(p))f.detailMiniMapLayerControl.addOverlay(t,e);let h=[],g=[],_=(e,t,n,r,i)=>{if(!e)return;let a=L.divIcon({className:`custom-minimap-marker`,html:`<div style="background-color:${t};width:14px;height:14px;border-radius:50%;border:2px solid white;box-shadow:0 0 10px ${t};"></div>`,iconSize:[14,14],iconAnchor:[7,7]}),o=e.acc?`<span class="text-brand-emerald">± ${e.acc}m</span>`:`<span class="text-slate-500">N/A</span>`,s=e.alt?`${e.alt}m s.n.m.`:`N/A`,c=r===`start`?i.start:i.end,l=En(n,t,e,o,s,c?new Date(c).toLocaleTimeString():`N/A`);L.marker([e.lat,e.lng],{icon:a}).addTo(f.detailMiniMapObj).bindPopup(l,{className:`custom-popup-enrich`}),h.push([e.lat,e.lng]),g.push([e.lat,e.lng])};a&&_(a,`#3B82F6`,`Apertura de la Encuesta`,`start`,u),o&&_(o,`#10B981`,`Confirmación Inicial`,`start`,u),s&&_(s,`#F59E0B`,`Cierre de Encuesta`,`end`,u),!a&&!o&&!s&&c&&_(c,l?`#EF4444`:`#10B981`,`Ubicación Registrada`,`end`,u),g.length>1&&L.polyline(g,{color:`#94a3b8`,dashArray:`4, 4`,weight:2,opacity:.6}).addTo(f.detailMiniMapObj);let v=o||c;if(v){let e=l?`#EF4444`:`#10B981`;L.circle([v.lat,v.lng],{radius:500,color:e,fillColor:e,fillOpacity:.05,weight:1.5,dashArray:`6,5`,interactive:!1}).addTo(f.detailMiniMapObj)}if(h.length>0){let e=L.latLngBounds(h);h.length===1&&!l?f.detailMiniMapObj.setView(h[0],16):f.detailMiniMapObj.fitBounds(e,{padding:[40,40],maxZoom:18})}f.detailMiniMapObj.invalidateSize()}var Fn=o((()=>{w(),Dn(),Nn(),bn()}));function In(e){let t=O(`detailModal`),n=O(`detailModalBody`);if(!t||!n||!e)return;let r=e._meta||{},i={stEntidad:X(r.ent||e[`S1/ent`]||e.ent||null),stMpio:X(r.mun||null),stParr:X(r.par||null),stSect:X(r.sector||null),stNodo:X(r.nodo||null),stEncuestador:X(r.nombre||e[`S0/s0_nombreapellido`]||null),stCedula:X(r.cedula===`N/A`?null:r.cedula),stFecha:X(r.fecha||e.today||e._submission_time||null),stDur:X((()=>{let e=r.durMin;return e==null?null:`${parseFloat(e).toFixed(2)} min`})()),declaredSeg:r.segmento||e[`S1/segmento`]||e[`S1/group_segmeto_sector/segmento`]||null,actualSeg:r.actual_seg||null,rawControl:String(r.control||e[`group_sh53u78/control`]||``),rawSerie:String(r.n_serie||``),rawLinea:String(r.n_linea||``),stHogares:X(r.hogares??null),stPers:X(r.totalPers??null),stUso:X(r.uso||null),stCond:X(r.condicion||null),alertas:r.alertas||[],hasAlerts:r.hasAlerts||!1,isFlagged:r.flag_distance_gt_500,durMin:r.durMin??null,rawDist:r.distance_m??null,m:r};i.isRural=i.declaredSeg===`000`||i.declaredSeg===`0`,i.valHeader=i.isRural?`Validación de Sector`:`Validación de Segmento`,i.valLeftLabel=i.isRural?`Sector Declarado`:`Declarado`,i.valLeftVal=i.isRural?Y(e,`sector`)||Y(e,`S1/sector`)||`000`:i.declaredSeg||`N/A`,i.stControl=X(i.rawControl||null),i.stLinea=X(i.rawLinea||null),i.stSerie=X(i.rawSerie||null),i.stEstado=i.m.estado===`completada`?`<span class="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest bg-brand-green/20 text-brand-green border border-brand-green/30">Completada (Efectiva)</span>`:`<span class="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest bg-brand-orange/20 text-brand-orange border border-brand-orange/30">No Efectiva</span>`;let a=yn(i.rawControl,i.rawSerie,i.rawLinea),o=f.controlsIndex instanceof Map?f.controlsIndex.get(a):null,s=f.controlsIndex instanceof Map&&f.controlsIndex.size>0,c=i.rawControl?String(i.rawControl).trim().slice(-4):``,l=f.controlDetails instanceof Map?f.controlDetails.get(c):null,u=l?l.combos:[];i.ctrlPanelHtml=Cn({m:i.m,rawControl:i.rawControl,rawSerie:i.rawSerie,rawLinea:i.rawLinea,_padM:vn,hasCtrlIndex:s,ctrlEntry:o,ctrlKey:a,validCombos:u});let d=gn(e[`start-geopoint`]),p=gn(e[`group_sh53u78/ubicacion_i`]||e.ubicacion_i),m=gn(e[`ubicacion_final/ubicacion_f`]||e.ubicacion_f),h=e.lat||i.m.lat||(e._geolocation?e._geolocation[0]:null),g=e.lng||i.m.lng||(e._geolocation?e._geolocation[1]:null),_=h&&g?{lat:parseFloat(h),lng:parseFloat(g)}:null;if(i.walkedDistance=p&&m?_n(p,m):null,i.stDist=i.walkedDistance===null?`<span class="text-slate-500 font-medium italic">N/A</span>`:`<span class="font-outfit font-black ${i.walkedDistance>30?`text-brand-red`:`text-brand-emerald`}">${Math.round(i.walkedDistance)} m</span>`,i.hasMapData=d||p||m||_,i.segmentMatchStatus=!i.valLeftVal||!i.actualSeg?`<i data-lucide="minus" class="text-slate-400 w-4 h-4"></i>`:D(i.valLeftVal,i.actualSeg)?`<i data-lucide="check" class="text-brand-emerald w-5 h-5"></i>`:`<i data-lucide="x" class="text-brand-red w-5 h-5"></i>`,i.actualSegClasses=i.actualSeg&&!D(i.valLeftVal,i.actualSeg)?`bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800/30`:`bg-slate-100 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700`,i.actualSegText=i.actualSeg&&!D(i.valLeftVal,i.actualSeg)?`text-brand-red`:`text-slate-800 dark:text-slate-200`,i.alertsHtml=Sn(i.alertas,i.m),n.innerHTML=xn(i)+wn(e),window.lucide&&lucide.createIcons({root:n}),f.lastFocused=document.activeElement,t.classList.remove(`hidden`),window.innerWidth<768){let e=O(`detailModalPane`);e&&e.classList.contains(`max-w-7xl`)&&typeof window.toggleDetailModalExpand==`function`&&window.toggleDetailModalExpand()}setTimeout(()=>{t.querySelector(`#detailModalPane`)?.classList.remove(`scale-95`,`opacity-0`)},10),i.hasMapData&&setTimeout(()=>{Pn({displayLat:_?_.lat:p?p.lat:d?d.lat:m.lat,displayLng:_?_.lng:p?p.lng:d?d.lng:m.lng,declaredSeg:i.declaredSeg,actualSeg:i.actualSeg,ptStart:d,ptIni:p,ptFin:m,ptMain:_,isFlagged:i.isFlagged,rec:e})},300)}function Ln(){let e=O(`detailModal`);e&&(e.querySelector(`#detailModalPane`)?.classList.add(`scale-95`,`opacity-0`),setTimeout(()=>{e.classList.add(`hidden`);let t=O(`detailModalPane`),n=O(`detailModalExpandIcon`),r=O(`detailModalBody`);if(t?.classList.contains(`max-w-none`)&&(t.classList.remove(`w-full`,`max-w-none`,`h-full`,`rounded-none`),t.classList.add(`max-w-7xl`,`w-11/12`,`rounded-2xl`,`p-0`),n&&n.setAttribute(`data-lucide`,`maximize`),r&&(r.classList.remove(`flex-1`,`max-h-none`),r.classList.add(`max-h-[75vh]`))),f.detailMiniMapObj&&(f.detailMiniMapObj.remove(),f.detailMiniMapObj=null),f.lastFocused?.focus)try{f.lastFocused.focus()}catch{}},300))}var Rn=o((()=>{w(),A(),bn(),Dn(),Fn(),window.toggleDetailModalExpand=function(){let e=O(`detailModalPane`),t=O(`detailModalExpandIcon`),n=O(`detailMapWrapper`),r=O(`detailModalBody`);!e||!t||(e.classList.contains(`max-w-7xl`)?(e.classList.remove(`max-w-7xl`,`w-11/12`,`rounded-2xl`,`p-0`),e.classList.add(`w-full`,`max-w-none`,`h-full`,`rounded-none`),t.setAttribute(`data-lucide`,`minimize`),n&&(n.classList.remove(`h-48`,`sm:h-64`,`md:h-96`),n.classList.add(`h-[60vh]`,`md:h-[75vh]`)),r&&(r.classList.remove(`max-h-[75vh]`),r.classList.add(`flex-1`,`max-h-none`))):(e.classList.remove(`w-full`,`max-w-none`,`h-full`,`rounded-none`),e.classList.add(`max-w-7xl`,`w-11/12`,`rounded-2xl`,`p-0`),t.setAttribute(`data-lucide`,`maximize`),n&&(n.classList.remove(`h-[60vh]`,`md:h-[75vh]`),n.classList.add(`h-48`,`sm:h-64`,`md:h-96`)),r&&(r.classList.remove(`flex-1`,`max-h-none`),r.classList.add(`max-h-[75vh]`))),window.lucide&&window.lucide.createIcons(),f.detailMiniMapObj&&setTimeout(()=>f.detailMiniMapObj.invalidateSize(),350))},window.viewTraceByRecord=function(e){let t=f.rawData.find(t=>t._uuid===e||t.uuid===e);t?In(t):console.warn(`[Modal] Registro con UUID ${e} no encontrado.`)},window.closeDetailModal=Ln})),zn,Bn,Vn,Hn,Un,Wn,Gn=o((()=>{w(),zn=e=>{let t=e.getValue();return`<span style="color:${t===`completada`?`#10B981`:`#F59E0B`};font-weight:700;font-size:10px;letter-spacing:0.02em">${t===`completada`?`EFECTIVA`:`NO EFECTIVA`}</span>`},Bn=e=>{let t=e.getValue();return t===null?`—`:`<span style="color:${t<15?`#EF4444`:t<25?`#F59E0B`:`#10B981`};font-weight:800;font-family:Outfit,sans-serif;">${parseFloat(t).toFixed(2)}m</span>`},Vn=e=>{let t=e.getValue();return!t||t.length===0?`<span style="color:var(--text-muted);font-size:10px">—</span>`:t.map(e=>{let t=v[e],n=t?t.label:e;return`<span title="${t?t.detail.replace(/\n/g,` `):``}" style="display:inline-flex;align-items:center;gap:3px;background:rgba(239,68,68,0.15);color:#EF4444;border:1px solid rgba(239,68,68,0.3);border-radius:4px;padding:1px 5px;font-size:9px;font-weight:700;letter-spacing:0.02em;margin-right:3px;white-space:nowrap;">⚠ ${n}</span>`}).join(``)},Hn=e=>{let t=e.getData(),n=b.has(t.cedula)?`<span style="background:#3B82F6;color:white;font-size:8px;font-weight:900;padding:1px 4px;border-radius:4px;margin-left:6px;vertical-align:middle;">INE</span>`:``;return`<div><div style="font-weight:800;color:currentColor;font-size:12px;line-height:1.3;">${t.nombre||`Sin Nombre`}${n}</div><div style="font-size:9px;color:#94a3b8;font-weight:600;">${t.cedula||`N/A`}</div></div>`},Un=e=>{let t=e.getValue(),n=t>=80?`#10B981`:t>=50?`#F59E0B`:`#EF4444`;return`<div style="display:flex;flex-direction:column;align-items:center;gap:3px;padding:4px 0">
        <span style="font-weight:900;color:${n};font-size:15px;">${t}%</span>
        <div style="width:100%;max-width:80px;height:6px;background:rgba(0,0,0,0.05);border-radius:10px;overflow:hidden">
            <div style="width:${t}%;height:100%;background:${n};border-radius:10px;"></div>
        </div>
    </div>`},Wn=()=>`
    <div class="flex gap-2">
        <button class="tab-action-btn btn-view" data-action="view">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
            <span>VER</span>
        </button>
    </div>
`}));function Kn(e=[]){f.detailTable||(f.detailTable=new Tabulator(`#detailGrid`,{data:e,layout:`fitColumns`,height:`100%`,pagination:!0,paginationSize:25,paginationSizeSelector:[10,25,50,100],movableColumns:!0,responsiveLayout:`collapse`,clipboard:!0,placeholder:`<div style="padding:40px;text-align:center;color:var(--text-muted);font-size:14px;font-family:Inter,sans-serif;">Cargando base de datos...</div>`,columnHeaderVertAlign:`bottom`,columns:[{formatter:`responsiveCollapse`,width:30,minWidth:30,hozAlign:`center`,headerSort:!1,resizable:!1,responsive:0},{title:`Identificación`,frozen:!0,columns:[{title:`Cédula`,field:`cedula`,headerFilter:`input`,minWidth:90,responsive:0},{title:`Nombre`,field:`nombre`,headerFilter:`input`,minWidth:140,responsive:0},{title:`Control`,field:`control`,headerFilter:`input`,width:85,responsive:0},{title:`Serie`,field:`serie`,headerFilter:`input`,width:60,responsive:2},{title:`Línea`,field:`linea`,headerFilter:`input`,width:60,responsive:2}]},{title:`Contexto`,columns:[{title:`Fecha`,field:`fecha`,headerFilter:`input`,width:90,sorter:`date`,responsive:1},{title:`Municipio`,field:`mun`,headerFilter:`input`,width:90,responsive:2},{title:`Parroquia`,field:`par`,headerFilter:`input`,width:90,responsive:4},{title:`Segm.`,field:`segmento`,headerFilter:`input`,width:70,hozAlign:`center`,responsive:4},{title:`Sect.`,field:`sector`,headerFilter:`input`,width:70,hozAlign:`center`,responsive:4}]},{title:`Métricas`,columns:[{title:`Estado`,field:`estado`,width:100,responsive:0,formatter:zn,headerFilter:`list`,headerFilterParams:{valuesLookup:!0,clearable:!0}},{title:`Dur.`,field:`durMin`,width:70,hozAlign:`center`,responsive:2,formatter:Bn},{title:`Alertas`,field:`alertas`,minWidth:160,headerSort:!1,responsive:2,formatter:Vn}]},{title:`Social`,columns:[{title:`Hog.`,field:`hogares`,width:50,hozAlign:`center`,responsive:4},{title:`Pers.`,field:`personas`,width:50,hozAlign:`center`,responsive:4}]},{title:`Acciones`,width:120,headerSort:!1,hozAlign:`center`,responsive:0,formatter:Wn,cellClick:(e,t)=>{e.stopPropagation();let n=e.target.closest(`button`);if(!n)return;let r=t.getData()._rec;r&&n.dataset.action===`view`&&In(r)}}],rowFormatter:e=>{let t=e.getData();t.estado===`completada`?e.getElement().classList.add(`row-complete`):t.estado===`no_efectiva`&&e.getElement().classList.add(`row-no-efectiva`),t.hasAlerts&&e.getElement().classList.add(`row-flagged`)}}),f.detailTable.on(`rowClick`,(e,t)=>{let n=t.getData()._rec;n&&In(n)}))}function qn(e=f.filtered){let t=e.map(e=>{let t=e._meta||{};return{_rec:e,id:t.control||e._uuid,cedula:t.cedula||``,nombre:t.nombre||``,control:t.control||``,serie:t.n_serie||``,linea:t.n_linea||``,fecha:t.fecha||``,mun:t.mun||``,par:t.par||``,nodo:t.nodo||``,segmento:t.segmento||``,sector:t.sector||``,estado:t.estado||``,durMin:t.durMin,alertas:t.alertas||[],hasAlerts:t.hasAlerts||!1,hogares:t.hogares||0,personas:t.totalPers||0}});if(!f.detailTable)Kn(t);else try{f.detailTable.setData(t).then(()=>{f.detailTable.redraw(!0)})}catch(e){console.warn(`Tabulator setData delayed:`,e.message),setTimeout(()=>{f.detailTable&&f.detailTable.setData(t).then(()=>{f.detailTable.redraw(!0)})},100)}}var Jn=o((()=>{w(),Rn(),Gn()}));function Yn(e){if(console.log(`table.js: renderRankingTable() initializing leaderboard...`),typeof Tabulator>`u`){console.error(`table.js: CRITICAL - Tabulator library is NOT loaded.`);return}if(!document.querySelector(`#rankingTable`))return;if(!e){if(!f.filtered||!f.encMap)return;let t=f.filtered.filter(e=>e&&e._meta),n=new Set(t.map(e=>e._meta.cedula));e=Object.values(f.encMap).filter(e=>n.has(e.cedula));let r={encuestas:(e,t)=>(t.encuestas||0)-(e.encuestas||0),completadas:(e,t)=>(t.completadas||0)-(e.completadas||0),eficiencia:(e,t)=>(t.pctCompleta||0)-(e.pctCompleta||0),personas:(e,t)=>(t.personas||0)-(e.personas||0)};e.sort(r[f.currentSort]||r.eficiencia)}let t=e.map((e,t)=>({pos:t+1,nombre:e.nombre||`Sin Nombre`,cedula:e.cedula||`N/A`,encuestas:e.encuestas||0,completadas:e.completadas||0,pctCompleta:e.pctCompleta||0,personas:e.personas||0}));f.rankingTabulator?f.rankingTabulator.setData(t).then(()=>{f.rankingTabulator.redraw(!0)}):(f.rankingTabulator=new Tabulator(`#rankingTable`,{data:t,layout:`fitColumns`,height:`420px`,responsiveLayout:`collapse`,persistence:!1,placeholder:`<div style="padding:40px;text-align:center;color:#64748b;font-size:13px;font-family:Inter,sans-serif;">Sin datos disponibles</div>`,initialSort:[{column:`pctCompleta`,dir:`desc`}],columns:[{formatter:`responsiveCollapse`,width:30,minWidth:30,hozAlign:`center`,headerSort:!1,resizable:!1,responsive:0},{title:`#`,field:`pos`,width:55,hozAlign:`center`,headerSort:!1,frozen:!0,responsive:0,formatter:e=>`<span style="color:#64748b;font-weight:800;font-size:12px;">${e.getValue()}</span>`},{title:`Encuestador`,field:`nombre`,minWidth:140,frozen:!0,responsive:0,formatter:Hn},{title:`Volumen`,field:`encuestas`,hozAlign:`center`,width:90,sorter:`number`,responsive:0,formatter:e=>`<span style="font-weight:800;color:#3B82F6;font-size:14px">${e.getValue()}</span>`},{title:`% Efectividad`,field:`pctCompleta`,hozAlign:`center`,minWidth:120,sorter:`number`,responsive:0,formatter:Un},{title:`Pers.`,field:`personas`,hozAlign:`center`,width:70,sorter:`number`,responsive:2,formatter:e=>`<span style="font-weight:600;color:#64748b">${e.getValue()}</span>`}]}),f.rankingTabulator.on(`rowClick`,(e,t)=>{let n=t.getData().cedula,r=document.getElementById(`filterEncuestador`);n&&r&&(r.value=n,typeof q==`function`&&q())}))}var Xn=o((()=>{w(),hn(),Gn()})),Zn=o((()=>{Jn(),Xn(),Gn()}));async function Qn(){if(!f.geoJSONData)try{let e=await fetch(`data/segmentos_monagas_light.geojson`);if(!e.ok)throw Error(`Error loading GeoJSON`);f.geoJSONData=await e.json(),$n()}catch(e){console.error(`FAILED TO LOAD GEOJSON:`,e)}}function $n(){if(!(!f.geoJSONData||!f.map||f.geoJSONLayer))try{f.geoJSONLayer=L.geoJSON(f.geoJSONData,{style:e=>{let t=e.properties,n=m[(`${t.cod_seg===`000`||t.cod_seg===`0`?t.cod_sc||`0`:t.cod_seg||`0`}`.split(``).reduce((e,t)=>e*31+t.charCodeAt(0),0)>>>0)*13%m.length];return{color:n,weight:2,opacity:.8,fillColor:n,fillOpacity:.15}},onEachFeature:(e,t)=>{let n=e.properties,r=n.cod_seg===`000`||n.cod_seg===`0`,i=m[(`${r?n.cod_sc||`0`:n.cod_seg||`0`}`.split(``).reduce((e,t)=>e*31+t.charCodeAt(0),0)>>>0)*13%m.length],a=r?`Sector`:`Segmento`,o=r?n.cod_sc||`N/A`:n.cod_seg||`N/A`;t.bindPopup(On(a,o,i,n),{className:`custom-popup`}),t.on(`mouseover`,function(){this.setStyle({fillOpacity:.35,weight:3})}),t.on(`mouseout`,function(){this.setStyle({fillOpacity:.15,weight:2})})}}).addTo(f.map),f.layerControl&&f.layerControl.addOverlay(f.geoJSONLayer,`Segmentos Monagas`)}catch(e){console.error(`FAILED TO DRAW GEOJSON LAYER:`,e)}}async function er(){if(!f.controlsIndex)try{let e=await fetch(`data/CONTROLES.geojson`);if(!e.ok)throw Error(`Error loading CONTROLES.geojson: ${e.status}`);f.controlsData=await e.json(),f.controlsIndex=new Map,f.validControls=new Set,f.validSeries=new Set,f.validLineas=new Set,f.controlDetails=new Map;let t=e=>{if(e==null)return null;let t=parseInt(String(e).trim(),10);return isNaN(t)?null:t};f.controlsData.features.forEach(e=>{let n=e.properties,r=t(n.LINEA),i=t(n.SERIE);if(r===null||i===null)return;let a=String(n.CONTROL||``).trim(),o=String(i),s=String(r);f.validControls.add(a),f.validSeries.add(o),f.validLineas.add(s),f.controlDetails.has(a)||f.controlDetails.set(a,{series:new Set,lineas:new Set,combos:[]}),f.controlDetails.get(a).series.add(o),f.controlDetails.get(a).lineas.add(s),f.controlDetails.get(a).combos.push({serie:o,linea:s}),f.controlsIndex.set(`${a}-${o}-${s}`,{COD_SEG:String(n.COD_SEG??``).trim(),COD_MANZA:String(n.COD_MANZA??``).trim()})}),f.map&&tr()}catch(e){console.error(`FAILED TO LOAD CONTROLES.geojson:`,e)}}function tr(){if(!(!f.controlsData||!f.map))try{f.controlsLayer&&(f.controlsLayer.remove(),f.layerControl&&f.layerControl.removeLayer(f.controlsLayer)),f.controlsLayer=L.geoJSON(f.controlsData,{pointToLayer:(e,t)=>L.circleMarker(t,{radius:3.5,fillColor:`#38BDF8`,color:`#ffffff`,weight:1,opacity:.9,fillOpacity:.85}),onEachFeature:(e,t)=>{t.bindTooltip(kn(e.properties),{sticky:!0,opacity:.95})}}),f.layerControl&&f.layerControl.addOverlay(f.controlsLayer,`Viviendas`)}catch(e){console.error(`FAILED TO DRAW CONTROLS LAYER:`,e)}}var nr=o((()=>{w(),Nn()}));function rr(){if(f.map)return;let e=L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,{attribution:`&copy; OpenStreetMap contributors`}),t=L.tileLayer(`https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}`,{maxZoom:20,subdomains:[`mt0`,`mt1`,`mt2`,`mt3`],attribution:`&copy; Google`});f.map=L.map(`mapView`,{center:[10.4806,-66.8983],zoom:12,layers:[e],zoomControl:!1});let n={OpenStreetMap:e,"Google Satélite":t};f.layerControl=L.control.layers(n,{},{collapsed:window.innerWidth<768}).addTo(f.map),L.control.scale().addTo(f.map),f.markerCluster=L.markerClusterGroup({showCoverageOnHover:!1,zoomToBoundsOnClick:!0,spiderfyOnMaxZoom:!0}),f.map.addLayer(f.markerCluster),$n(),tr()}var ir=o((()=>{w(),nr()})),ar,or=o((()=>{qt(),ar={findContainingFeature(e,t,n){if(!e||!t||!n||!n.features)return null;let r=_e([t,e]);for(let e of n.features)if((e.geometry.type===`Polygon`||e.geometry.type===`MultiPolygon`)&&tt(r,e))return e.properties;return null},getDistance(e,t,n,r){return je(_e([t,e]),_e([r,n]),{units:`meters`})},createConvexHull(e){return!e||e.length<3?null:xt(be(e.map(e=>_e([e.lng,e.lat]))))},simplifyPath(e,t=1e-4){return!e||e.length<3?e:Ht(ye(e.map(e=>[e[1],e[0]])),{tolerance:t,highQuality:!0}).geometry.coordinates.map(e=>[e[1],e[0]])}}}));function sr(){f.agentRouteLayer&&(f.map.removeLayer(f.agentRouteLayer),f.agentRouteLayer=null)}function cr(e){if(sr(),!e||!f.map)return;let t=f.filtered.filter(t=>t._meta?.cedula===e&&t._meta.lat&&t._meta.lng).sort((e,t)=>new Date(e.start||0).getTime()-new Date(t.start||0).getTime());if(t.length===0)return;let n=O(`mapRouteAgentCount`);n&&(n.textContent=`${t.length} ptos`);let r=t.map(e=>[e._meta.lat,e._meta.lng]),i=ar.simplifyPath(r,5e-5),a=[];try{let e=ar.createConvexHull(t.map(e=>({lat:e._meta.lat,lng:e._meta.lng})));e&&a.push(L.geoJSON(e,{style:{color:`#F97316`,weight:1,opacity:.3,fillColor:`#F97316`,fillOpacity:.1,dashArray:`5, 5`},interactive:!1}))}catch(e){console.warn(`[Route] No se pudo crear el Convex Hull:`,e)}a.push(L.polyline(i,{color:`#F97316`,weight:2.5,opacity:.85,dashArray:`6 4`})),t.forEach((e,t)=>{let n=e._meta,r=t+1,i=(e.start||``).slice(11,16)||`—`,o=n.durMin===null?`—`:`${Math.round(n.durMin)} min`,s=L.divIcon({className:``,html:jn(r),iconSize:[22,22],iconAnchor:[11,11]}),c=L.marker([n.lat,n.lng],{icon:s});c.bindTooltip(Mn(r,i,n,o),{sticky:!0,opacity:.97}),c.on(`click`,()=>In(e)),a.push(c)}),f.agentRouteLayer=L.layerGroup(a).addTo(f.map);let o=L.latLngBounds(i);o.isValid()&&f.map.fitBounds(o,{padding:[60,60]})}function lr(){let e=document.getElementById(`filterEncuestador`),t=document.getElementById(`btnVerRutaEncuestador`),n=document.getElementById(`mapRouteAgentCount`);if(!e||!t||t._verRutaAttached)return;t._verRutaAttached=!0;let r=()=>{let r=!!e.value,i=r?f.filtered.filter(t=>t._meta?.cedula===e.value&&t._meta.lat&&t._meta.lng).length:0;if(t.disabled=!r,n&&(n.textContent=r&&i?`${i} pts`:`—`),!r){sr(),t.dataset.routeActive=`0`,t.classList.remove(`active-filter-route`);let e=t.querySelector(`.route-label`);e&&(e.textContent=`Ver Ruta`),f.map&&f.markerCluster&&!f.map.hasLayer(f.markerCluster)&&f.map.addLayer(f.markerCluster)}};r(),e.addEventListener(`change`,r),document.addEventListener(`filtersApplied`,r),t.addEventListener(`click`,()=>{let r=e.value;if(r)if(t.dataset.routeActive===`1`){sr(),t.dataset.routeActive=`0`,f.map&&f.markerCluster&&!f.map.hasLayer(f.markerCluster)&&f.map.addLayer(f.markerCluster),t.classList.remove(`active-filter-route`);let e=f.filtered.filter(e=>e._meta?.cedula===r&&e._meta.lat&&e._meta.lng).length;n&&(n.textContent=`${e} pts`);let i=t.querySelector(`.route-label`);i&&(i.textContent=`Ver Ruta`)}else{let e=document.querySelector(`[data-tab="tab-mapa"]`);e&&e.click(),setTimeout(()=>{cr(r),t.dataset.routeActive=`1`,f.map&&f.markerCluster&&f.map.hasLayer(f.markerCluster)&&f.map.removeLayer(f.markerCluster),t.classList.add(`active-filter-route`);let e=f.filtered.filter(e=>e._meta?.cedula===r&&e._meta.lat&&e._meta.lng).length;n&&(n.textContent=`${e} pts`);let i=t.querySelector(`.route-label`);i&&(i.textContent=`Ocultar Ruta`)},200)}})}var ur=o((()=>{w(),A(),hn(),Rn(),Nn(),or()}));function dr(){if(!f.map||!f.markerCluster)return;f.markerCluster.clearLayers();let e=f.filtered.filter(e=>e._meta.lat!=null&&e._meta.lng!=null),t=e.filter(e=>e._meta&&e._meta.estado===`completada`).length,n=e.length-t,r=new Set(e.map(e=>e._meta.cedula)).size,i=e.filter(e=>e._meta.hasAlerts).length,a=new Set(e.map(e=>e._meta.mun).filter(e=>e&&e!==`N/A`)),o=new Set(e.map(e=>e._meta.par).filter(e=>e&&e!==`N/A`)),s=new Set(e.map(e=>e._meta.nodo).filter(e=>e&&e!==`N/A`));O(`mapKpiPoints`)&&(O(`mapKpiPoints`).textContent=e.length),O(`mapKpiComplete`)&&(O(`mapKpiComplete`).textContent=t),O(`mapKpiNoEfectiva`)&&(O(`mapKpiNoEfectiva`).textContent=n),O(`mapKpiAgents`)&&(O(`mapKpiAgents`).textContent=r),O(`mapKpiAlertas`)&&(O(`mapKpiAlertas`).textContent=i);let c=O(`mapCoverageBadge`);c&&e.length>0&&(c.classList.remove(`hidden`),O(`mapMunCount`)&&(O(`mapMunCount`).textContent=a.size),O(`mapParCount`)&&(O(`mapParCount`).textContent=o.size),O(`mapNodoCount`)&&(O(`mapNodoCount`).textContent=s.size));let l=e.map(e=>{let t=e._meta,n=t.estado===`completada`,r=t.hasAlerts,i=t.alertas||[],a,o,s;r?(a=`#EF4444`,o=`#DC2626`,s=`Alerta`):n?(a=`#10B981`,o=`#059669`,s=`Efectiva`):(a=`#F59E0B`,o=`#D97706`,s=`No Efectiva`);let c=t.durMin===null?`—`:`${Math.round(t.durMin)} min`,l=t.distance_m===null?`—`:`${Math.round(t.distance_m)} m`,u=An(t,e._uuid,a,o,s,i,c,l);return L.circleMarker([t.lat,t.lng],{radius:7,fillColor:a,color:o,weight:2,opacity:.9,fillOpacity:.7}).bindPopup(u,{className:`custom-popup`,maxWidth:320})});if(f.markerCluster.addLayers(l),document.getElementById(`btnVerRutaEncuestador`)?.dataset?.routeActive===`1`){f.map.hasLayer(f.markerCluster)&&f.map.removeLayer(f.markerCluster);let e=document.getElementById(`filterEncuestador`);e&&e.value&&cr(e.value)}else if(l.length>0){let e=f.markerCluster.getBounds();e.isValid()&&f.map.fitBounds(e,{padding:[50,50]})}window.lucide&&lucide.createIcons()}var fr=o((()=>{w(),A(),hn(),Nn(),ur(),window.setQuickFilter=function(e){f.quickFilterMode=e,Object.entries({all:{id:`btnMapFilterAll`,active:[`bg-brand-blue/10`,`dark:bg-brand-blue/20`,`border-brand-blue`,`ring-brand-blue/30`],inactive:`border-brand-blue`},efectivas:{id:`btnMapFilterEfectivas`,active:[`bg-brand-emerald/10`,`dark:bg-brand-emerald/20`,`border-brand-emerald`,`ring-brand-emerald/30`],inactive:`border-brand-emerald`},no_efectiva:{id:`btnMapFilterNoEfectiva`,active:[`bg-brand-orange/10`,`dark:bg-brand-orange/20`,`border-brand-orange`,`ring-brand-orange/30`],inactive:`border-brand-orange`},alertas:{id:`btnMapFilterAlertas`,active:[`bg-brand-red/10`,`dark:bg-brand-red/20`,`border-brand-red`,`ring-brand-red/30`],inactive:`border-brand-red`}}).forEach(([t,n])=>{let r=O(n.id);if(r)if(r.classList.remove(`bg-brand-blue/10`,`dark:bg-brand-blue/20`,`border-brand-blue`,`ring-brand-blue/30`,`bg-brand-emerald/10`,`dark:bg-brand-emerald/20`,`border-brand-emerald`,`ring-brand-emerald/30`,`bg-brand-orange/10`,`dark:bg-brand-orange/20`,`border-brand-orange`,`ring-brand-orange/30`,`bg-brand-red/10`,`dark:bg-brand-red/20`,`border-brand-red`,`ring-brand-red/30`,`ring-1`,`shadow-md`,`border-slate-400`,`active-filter-blue`,`active-filter-emerald`,`active-filter-orange`,`active-filter-red`),t===e){let e=`active-filter-${t===`all`?`blue`:t===`efectivas`?`emerald`:t===`no_efectiva`?`orange`:`red`}`;r.classList.add(e,`shadow-md`)}else r.classList.add(n.inactive)}),q()}})),pr=o((()=>{ir(),nr(),fr(),ur()}));function mr(e){if(typeof Tabulator>`u`){console.error(`Tabulator not found`);return}let t=(e||[]).map((e,t)=>{let n=[];e[`S1/P_nomsect`]&&n.push(e[`S1/P_nomsect`]);for(let t=1;t<=4;t++){let r=e[`S1/G_P9/gp10_${t}_etiq`],i=e[`S1/G_P9/GP10_${t}b`];r&&i&&n.push(`${r} ${i}`)}let r=e[`control_de_la_entrevista/in10`]||e[`control_entrevista/in10`];r&&n.push(`Nro: ${r}`);let i=e[`control_de_la_entrevista/in11`]||e[`control_entrevista/in11`];i&&n.push(`Ref: ${i}`);let a=n.length>0?n.join(`, `):e[`S1/direccion`]||e._meta.nota||`-`;return{linea:e[`group_sh53u78/n_linea`]||t+1,serie:e[`group_sh53u78/n_serie`]||`-`,manzana:e[`S1/manzana`]||`-`,parcela:e[`S1/parcela`]||`-`,edificacion:e[`S1/Edificaci_n`]||e[`S1/edificacion`]||`-`,estructura:e[`S1/estructura`]||e[`S1/unidad`]||`-`,uso:e[`S1/Uso_de_la_Unidad_inmobiliaria`]||e._meta.uso||`-`,ladoManz:e[`S1/lado_manz`]||`-`,direccion:a,razon:e[`Condici_n_de_ocupaci_n/condicion_de_ocupacion`]||e._meta.condicion||`-`,encuestador:e._meta.nombre?e._meta.nombre.split(` `)[0]:`N/A`}});t.sort((e,t)=>parseInt(e.linea)-parseInt(t.linea)),f.mm111Table?f.mm111Table.setData(t).then(()=>{f.mm111Table.redraw(!0)}):hr(t)}function hr(e){f.mm111Table=new Tabulator(`#mm111Grid`,{data:e,layout:`fitColumns`,height:`100%`,responsiveLayout:`collapse`,placeholder:`<div class='p-12 text-center text-slate-400 font-medium'>Seleccione un número de Control para visualizar el listado de las encuestas.</div>`,columns:[{title:`Línea`,field:`linea`,width:65,hozAlign:`center`,frozen:!0,formatter:e=>`<span class="font-mono font-bold text-slate-700 dark:text-slate-200">${e.getValue()}</span>`},{title:`Serie`,field:`serie`,width:60,hozAlign:`center`,formatter:e=>`<span class="font-mono opacity-70">${e.getValue()}</span>`},{title:`Manz.`,field:`manzana`,width:65,hozAlign:`center`},{title:`Parc.`,field:`parcela`,width:65,hozAlign:`center`},{title:`Edif.`,field:`edificacion`,width:65,hozAlign:`center`},{title:`Estr.`,field:`estructura`,width:65,hozAlign:`center`},{title:`Uso de la Unidad`,field:`uso`,minWidth:120,formatter:gr},{title:`Lado Manz.`,field:`ladoManz`,width:90,hozAlign:`center`},{title:`Dirección`,field:`direccion`,minWidth:250,formatter:`textarea`},{title:`Razón Inclusión`,field:`razon`,minWidth:180,formatter:_r},{title:`Encuestador`,field:`encuestador`,width:100,hozAlign:`center`,formatter:e=>`<span class="text-[10px] font-black uppercase text-slate-400 tracking-wider">${e.getValue()}</span>`}]})}function gr(e){let t=String(e.getValue()).toUpperCase(),n=x.DEFAULT;for(let e in x)if(t.includes(e)){n=x[e];break}return`<span class="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-tight ${n.badge}">${t}</span>`}function _r(e){let t=String(e.getValue()).toUpperCase(),n=t.replace(/_/g,` `),r=S.DEFAULT;for(let e in S)if(t.includes(e)){r=S[e];break}return`<span class="px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-tight ${r.badge}">${n}</span>`}function vr(){[`mm111Entidad`,`mm111Municipio`,`mm111Parroquia`,`mm111CPoblado`].forEach(e=>{O(e)&&(O(e).textContent=`---`)}),[`mm111EntidadCod`,`mm111MunicipioCod`,`mm111ParroquiaCod`,`mm111CPobladoCod`].forEach(e=>{O(e)&&(O(e).textContent=`--`)}),[`mm111Segmento`,`mm111Sector`,`mm111Nodo`,`mm111Semana`,`mm111ControlMaestro`,`mm111Lote`].forEach(e=>{O(e)&&(O(e).textContent=`-`)}),O(`mm111ControlNro`)&&(O(`mm111ControlNro`).textContent=`0000`)}function yr(e,t){let n=O(`mm111ResultsList`);n&&(e.length>0?n.innerHTML=e.map((e,t)=>`
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
            </div>`,window.lucide&&lucide.createIcons())}var br=o((()=>{w(),A()}));function xr(e){if(!e)return;let t=f.rawData.filter(t=>String(t._meta.control).toLowerCase()===String(e).toLowerCase());if(t.length===0){vr(),mr([]);return}let n=t[0];O(`mm111Entidad`)&&(O(`mm111Entidad`).textContent=n[`S1/ent`]||n._meta.mun||`N/A`),O(`mm111Municipio`)&&(O(`mm111Municipio`).textContent=n._meta.mun||`N/A`),O(`mm111Parroquia`)&&(O(`mm111Parroquia`).textContent=n._meta.par||`N/A`),O(`mm111CPoblado`)&&(O(`mm111CPoblado`).textContent=n[`S1/cpoblado`]||`N/A`);let r=(e,t=null)=>{if(!e)return`--`;let n=String(e).match(/^(\d+)/),r=n?n[1]:`--`;return r!==`--`&&t&&(r=r.slice(-t)),r};O(`mm111EntidadCod`)&&(O(`mm111EntidadCod`).textContent=r(n[`S1/ent`])||`--`),O(`mm111MunicipioCod`)&&(O(`mm111MunicipioCod`).textContent=r(n._meta.mun,2)||`--`),O(`mm111ParroquiaCod`)&&(O(`mm111ParroquiaCod`).textContent=r(n._meta.par,2)||`--`),O(`mm111CPobladoCod`)&&(O(`mm111CPobladoCod`).textContent=r(n[`S1/cpoblado`])||`--`);let i=(e,t)=>e&&String(e).trim()!==`-`?String(e).slice(-t):`-`;O(`mm111Segmento`)&&(O(`mm111Segmento`).textContent=n[`S1/segmento`]||n[`S1/group_segmeto_sector/segmento`]||n[`group_segmeto_sector/segmento`]||`-`),O(`mm111Sector`)&&(O(`mm111Sector`).textContent=n[`S1/sector`]||n[`S1/group_segmeto_sector/sector`]||n[`group_segmeto_sector/sector`]||`-`),O(`mm111Nodo`)&&(O(`mm111Nodo`).textContent=n._meta.nodo||`-`),O(`mm111Semana`)&&(O(`mm111Semana`).textContent=i(n._meta.semana,2)),O(`mm111ControlNro`)&&(O(`mm111ControlNro`).textContent=i(n._meta.control,4));let a=n[`group_sh53u78/lote`]||n.lote||`-`;O(`mm111Lote`)&&(O(`mm111Lote`).textContent=a);let o=t.map(e=>e._meta.fecha).filter(Boolean).sort();if(o.length>0){let e=O(`filterFechaInicio`),t=O(`filterFechaFin`);e&&(e.value=o[0]),t&&(t.value=o[o.length-1])}mr(t)}function Sr(){let e=new Map;return f.filtered.forEach(t=>{let n=t._meta;!n||!n.control||e.has(n.control)||e.set(n.control,{control:n.control,mun:n.mun||`N/A`,seg:n.segmento||``,sec:n.sector||``})}),Array.from(e.values()).sort((e,t)=>e.control.localeCompare(t.control))}var Cr=o((()=>{w(),A(),br()}));function wr(){let e=O(`btnLoadMM111`),t=O(`mm111SearchControl`),n=O(`mm111SearchResults`),r=O(`mm111ClearSearch`);if(!t||!n)return;let i=-1,a=e=>{let t=e.toLowerCase().trim(),r=Sr().filter(e=>e.control.toLowerCase().includes(t)||e.mun.toLowerCase().includes(t)||e.seg.toLowerCase().includes(t)).slice(0,50);i=-1,t.length>0||e.length===0?(n.classList.remove(`hidden`),yr(r,e),n.querySelectorAll(`.result-item`).forEach(e=>{e.onclick=()=>o(e.getAttribute(`data-value`))})):n.classList.add(`hidden`)},o=async e=>{t&&(t.value=e),n&&n.classList.add(`hidden`),e.trim().length>0&&r?.classList.remove(`hidden`);let i=O(`filterControl`);i&&(i.value=e),xr(e),q()};t.onfocus=()=>a(t.value),t.oninput=()=>{t.value.trim().length>0?r?.classList.remove(`hidden`):r?.classList.add(`hidden`),a(t.value)},t.onkeydown=e=>{let t=n.querySelectorAll(`.result-item`);e.key===`ArrowDown`?(e.preventDefault(),i=Math.min(i+1,t.length-1),s(t)):e.key===`ArrowUp`?(e.preventDefault(),i=Math.max(i-1,0),s(t)):e.key===`Enter`?(e.preventDefault(),i>=0&&t[i]?o(t[i].getAttribute(`data-value`)):t.length>0&&o(t[0].getAttribute(`data-value`))):e.key===`Escape`&&n.classList.add(`hidden`)};let s=e=>{e.forEach((e,t)=>{t===i?(e.classList.add(`active`,`bg-brand-blue/10`,`dark:bg-brand-blue/20`,`ring-1`,`ring-brand-blue/30`),e.scrollIntoView({block:`nearest`})):e.classList.remove(`active`,`bg-brand-blue/10`,`dark:bg-brand-blue/20`,`ring-1`,`ring-brand-blue/30`)})};r&&(r.onclick=async()=>{t.value=``,r.classList.add(`hidden`);let e=O(`filterControl`);e&&(e.value=``);let n=O(`filterFechaInicio`),i=O(`filterFechaFin`);n&&(n.value=``),i&&(i.value=``),t.focus(),a(``),q()}),e&&(e.onclick=()=>o(t.value.trim())),document.addEventListener(`click`,e=>{!t.contains(e.target)&&!n.contains(e.target)&&n.classList.add(`hidden`)})}var Tr=o((()=>{A(),Cr(),br(),un(),document.addEventListener(`filtersApplied`,()=>{let e=O(`filterControl`)?.value,t=O(`mm111SearchControl`),n=O(`mm111ClearSearch`);t&&e&&t.value!==e?(t.value=e,n&&n.classList.remove(`hidden`),xr(e)):t&&!e&&t.value!==``&&(t.value=``,n&&n.classList.add(`hidden`),vr(),mr([]))})}));function Er(){Dr||=(wr(),!0);let e=O(`mm111SearchControl`),t=O(`mm111ClearSearch`),n=O(`mm111FilteredCount`);if(!e)return;n&&(n.textContent=O(`kpiControles`)?.textContent||`0`),e.value.trim().length===0?t?.classList.add(`hidden`):t?.classList.remove(`hidden`);let r=e.value.trim();r?xr(r):(vr(),mr([]))}var Dr,Or=o((()=>{A(),Tr(),Cr(),br(),Dr=!1}));function kr(){return`
        <div class="col-span-full text-center py-10 text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" stroke-width="1.5" class="mx-auto mb-2 text-brand-green">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <p class="font-bold text-sm">Sin inconsistencias detectadas</p>
            <p class="text-xs mt-1 opacity-60">Todos los registros del filtro actual pasan las validaciones.</p>
        </div>`}function Ar(e,t,n){let r=v[e]||{label:e},i=jr[e]||{bg:`#64748b22`,border:`#64748b`,text:`#64748b`},a=n===e,o=a?`ring-2 ring-offset-1 dark:ring-offset-[#0B1120]`:``,s=a?`ring-color: ${i.border}; border-color: ${i.border};`:`border-color:${i.border}30;`;return`
    <div class="alert-card ${o}"
         data-code="${e}"
         style="background:${i.bg}; ${s};">
        <div class="min-w-0 pr-2">
            <div class="text-[10px] sm:text-xs font-black uppercase tracking-widest mb-0.5 truncate"
                 style="color:${i.text}" title="${r.label}">${r.label}</div>
            <div class="text-[9px] text-slate-500 font-mono truncate opacity-60">${e}</div>
        </div>
        <div class="text-xl sm:text-2xl font-black font-outfit shrink-0 ml-auto" style="color:${i.text}">${t}</div>
    </div>`}var jr,Mr=o((()=>{w(),jr={TIEMPO_CORTO_EHM:{bg:`#F59E0B22`,border:`#F59E0B`,text:`#F59E0B`},TIEMPO_CORTO_ESCA:{bg:`#F59E0B22`,border:`#F59E0B`,text:`#F59E0B`},TIEMPO_CORTO:{bg:`#F59E0B22`,border:`#F59E0B`,text:`#F59E0B`},TIEMPO_LARGO:{bg:`#EF444422`,border:`#EF4444`,text:`#EF4444`},APERT_LEJOS:{bg:`#8B5CF622`,border:`#8B5CF6`,text:`#8B5CF6`},FUERA_SEGMENTO:{bg:`#EF444422`,border:`#EF4444`,text:`#EF4444`},SEGMENTO_INCORRECTO:{bg:`#EF444422`,border:`#EF4444`,text:`#EF4444`},ARRANQUE_INCONSISTENTE:{bg:`#F59E0B22`,border:`#F59E0B`,text:`#F59E0B`},LINEA_SERIE_INVALIDA:{bg:`#EF444422`,border:`#EF4444`,text:`#EF4444`},CEDULA_INVALIDA:{bg:`#EF444422`,border:`#EF4444`,text:`#EF4444`},INGRESO_ANOMALO:{bg:`#F59E0B22`,border:`#F59E0B`,text:`#F59E0B`},DESPLAZAMIENTO_ANOMALO:{bg:`#F59E0B22`,border:`#F59E0B`,text:`#F59E0B`},HOGARES_INCONSISTENTES:{bg:`#EF444422`,border:`#EF4444`,text:`#EF4444`},INTEGRANTES_INCONSISTENTES:{bg:`#EF444422`,border:`#EF4444`,text:`#EF4444`}}}));function Nr(e=[]){f.inconsistenciasTabulator||(f.inconsistenciasTabulator=new Tabulator(`#inconsistenciasTable`,{data:e,layout:`fitColumns`,height:`500px`,responsiveLayout:`collapse`,placeholder:`<div style="padding:40px;text-align:center;color:var(--text-muted);font-size:14px;font-family:Inter,sans-serif;">No hay inconsistencias para mostrar</div>`,columnHeaderVertAlign:`bottom`,columns:[{formatter:`responsiveCollapse`,width:30,minWidth:30,hozAlign:`center`,headerSort:!1,resizable:!1,responsive:0},{title:`Encuestador`,field:`nombre`,minWidth:150,responsive:0,formatter:e=>`<div style="font-weight:700;">${e.getValue()}</div>`},{title:`Cédula`,field:`cedula`,width:100,responsive:2,cssClass:`font-mono`},{title:`Control`,field:`control`,width:100,responsive:0,cssClass:`font-mono text-brand-blue font-bold`},{title:`Fecha`,field:`fecha`,width:100,responsive:1,sorter:`date`},{title:`Semana`,field:`semana`,width:80,hozAlign:`center`,responsive:1},{title:`Alertas`,field:`alertas`,minWidth:200,headerSort:!1,responsive:0,formatter:e=>{let t=e.getValue();return t?t.map(e=>`<span style="display:inline-flex;align-items:center;background:rgba(239,68,68,0.1);color:#EF4444;border:1px solid rgba(239,68,68,0.2);border-radius:4px;padding:1px 6px;font-size:9px;font-weight:700;margin-right:3px;white-space:nowrap;">${(v[e]||{label:e}).label}</span>`).join(``):``}}]}),f.inconsistenciasTabulator.on(`rowClick`,(e,t)=>{let n=t.getData()._rec;n&&In(n)}))}function Pr(e){f.inconsistenciasTabulator?f.inconsistenciasTabulator.setData(e):Nr(e)}var Fr=o((()=>{w(),Rn()}));function Ir(e){if(Z.isEventsBound)return;Z.isEventsBound=!0;let t=O(`incSearchInput`),n=O(`incClearSearch`),r=O(`incFilterAlerta`),i=O(`inconsistenciasCards`);t&&t.addEventListener(`input`,t=>{Z.currentSearchQuery=t.target.value.trim().toLowerCase(),n&&n.classList.toggle(`hidden`,Z.currentSearchQuery.length===0),e&&e()}),n&&n.addEventListener(`click`,()=>{t&&(t.value=``),Z.currentSearchQuery=``,n.classList.add(`hidden`),e&&e()}),r&&r.addEventListener(`change`,t=>{Z.currentAlertFilter=t.target.value,e&&e()}),i&&i.addEventListener(`click`,t=>{let n=t.target.closest(`.alert-card`);if(!n)return;let r=n.dataset.code;Z.currentAlertFilter=Z.currentAlertFilter===r?``:r,e&&e()})}var Z,Lr=o((()=>{A(),Z={currentAlertFilter:``,currentSearchQuery:``,isEventsBound:!1}}));function Rr(){if(!O(`inconsistenciasContainer`))return;Ir(Rr);let e=f.filtered.filter(e=>e._meta&&e._meta.hasAlerts),t={};e.forEach(e=>{e._meta.alertas.forEach(e=>{t[e]=(t[e]||0)+1})});let n=e.length;zr(t),Br(t,n),Pr(Vr(e))}function zr(e){let t=O(`incFilterAlerta`);if(!t)return;let n=Object.entries(e).sort((e,t)=>t[1]-e[1]),r=[`<option value="">Todas las alertas</option>`];n.forEach(([e,t])=>{let n=v[e]?v[e].label:e,i=e===Z.currentAlertFilter?`selected`:``;r.push(`<option value="${e}" ${i}>${n} (${t})</option>`)});let i=r.join(``);t.innerHTML!==i&&(t.innerHTML=i)}function Br(e,t){let n=O(`inconsistenciasCards`);n&&(t===0?n.innerHTML=kr():n.innerHTML=Object.entries(e).sort((e,t)=>t[1]-e[1]).map(([e,t])=>Ar(e,t,Z.currentAlertFilter)).join(``))}function Vr(e){let t=e;return Z.currentAlertFilter&&(t=t.filter(e=>e._meta.alertas.includes(Z.currentAlertFilter))),Z.currentSearchQuery&&(t=t.filter(e=>{let t=e._meta;return t.nombre&&t.nombre.toLowerCase().includes(Z.currentSearchQuery)||t.cedula&&t.cedula.toLowerCase().includes(Z.currentSearchQuery)||t.control&&t.control.toLowerCase().includes(Z.currentSearchQuery)})),t.sort((e,t)=>{let n=t._meta.alertas.length-e._meta.alertas.length;return n===0?(t._meta.fecha||``).localeCompare(e._meta.fecha||``):n}).map(e=>({_rec:e,nombre:e._meta.nombre,cedula:e._meta.cedula,control:e._meta.control||`—`,fecha:e._meta.fecha||`—`,semana:e._meta.semana||`—`,alertas:e._meta.alertas}))}var Hr=o((()=>{w(),A(),Mr(),Fr(),Lr()}));function Ur(e){if(typeof Chart>`u`)return;let t=e?`#ffffff`:`#000000`,n=e?`rgba(255,255,255,0.05)`:`rgba(0,0,0,0.05)`;Chart.defaults.color=t,Chart.defaults.scale.grid.color=n,typeof ChartDataLabels<`u`&&Chart.register(ChartDataLabels),Object.values(f.charts).forEach(e=>{e&&(e.options.color=t,e.options.plugins&&(e.options.plugins.datalabels&&(e.options.plugins.datalabels.color=t),e.options.plugins.legend&&e.options.plugins.legend.labels&&(e.options.plugins.legend.labels.color=t)),e.options.scales&&(e.options.scales.x&&e.options.scales.x.ticks&&(e.options.scales.x.ticks.color=t),e.options.scales.y&&e.options.scales.y.ticks&&(e.options.scales.y.ticks.color=t)),typeof e.update==`function`&&e.update(`none`))})}function Q(e){f.charts[e]&&(f.charts[e].destroy(),delete f.charts[e])}function $(){let e=document.documentElement.classList.contains(`dark`),t=e?`#ffffff`:`#000000`;return{responsive:!0,maintainAspectRatio:!1,color:t,plugins:{legend:{labels:{color:t,font:{size:11,family:`'Inter', sans-serif`,weight:`bold`}}},tooltip:{backgroundColor:e?`#1e293b`:`#ffffff`,titleColor:e?`#f1f5f9`:`#0f172a`,bodyColor:e?`#e2e8f0`:`#334155`,borderColor:e?`rgba(255,255,255,0.1)`:`rgba(0,0,0,0.1)`,titleFont:{weight:`bold`},bodyFont:{family:`'Inter', sans-serif`},borderWidth:1}},scales:{x:{ticks:{color:t,font:{size:11,family:`'Inter', sans-serif`,weight:`600`}},grid:{}},y:{ticks:{color:t,font:{size:11,family:`'Inter', sans-serif`,weight:`600`}},grid:{}}}}}var Wr,Gr=o((()=>{w(),Wr={id:`centerText`,afterDraw:e=>{let t=e.config.options.plugins.centerText;if(t&&t.display!==!1){let{ctx:n,chartArea:{left:r,top:i,width:a,height:o}}=e;n.save();let s=document.documentElement.classList.contains(`dark`),c=s?`#ffffff`:`#000000`;n.font=`bold 18px Outfit`,n.fillStyle=c,n.textAlign=`center`,n.textBaseline=`middle`,n.fillText(t.text||``,r+a/2,i+o/2),n.font=`bold 9px Inter`,n.fillStyle=s?`#ffffff`:`#000000`,n.fillText(`TOTAL`,r+a/2,i+o/2+18),n.restore()}}},typeof Chart<`u`&&Chart.register(Wr)}));function Kr(){Q(`enc`);let e={};f.filtered.forEach(t=>{let n=String(t._meta.nombre||`Desconocido`).split(` `)[0];e[n]=(e[n]||0)+1});let t=Object.entries(e).sort((e,t)=>t[1]-e[1]).slice(0,15),n=O(`chartEncuestador`);n&&(f.charts.enc=new Chart(n,{type:`bar`,data:{labels:t.map(e=>e[0]),datasets:[{label:`Encuestas`,data:t.map(e=>e[1]),backgroundColor:`#3B82F666`,borderColor:`#3B82F6`,borderWidth:1,borderRadius:4}]},options:{...$(),plugins:{...$().plugins,datalabels:{align:`top`,anchor:`end`,font:{weight:`bold`,size:10},color:document.documentElement.classList.contains(`dark`)?`#ffffff`:`#000000`,formatter:e=>e>0?e:``}}}}))}function qr(){Q(`dur`);let e={};f.filtered.forEach(t=>{let n=String(t._meta.nombre||`Desconocido`).split(` `)[0];t._meta.durMin!==null&&(e[n]||(e[n]=[]),e[n].push(t._meta.durMin))});let t=Object.entries(e).map(([e,t])=>[e,T(t)]).sort((e,t)=>t[1]-e[1]).slice(0,15),n=O(`chartDuracion`);n&&(f.charts.dur=new Chart(n,{type:`bar`,data:{labels:t.map(e=>e[0]),datasets:[{label:`Minutos Promedio`,data:t.map(e=>Math.round(e[1])),backgroundColor:`#8B5CF666`,borderColor:`#8B5CF6`,borderWidth:1,borderRadius:4}]},options:{...$(),plugins:{...$().plugins,datalabels:{align:`top`,anchor:`end`,font:{weight:`bold`,size:10},color:document.documentElement.classList.contains(`dark`)?`#ffffff`:`#000000`,formatter:e=>e>0?e:``}}}}))}function Jr(){Q(`hor`);let e={};f.filtered.forEach(t=>{t._meta.hora!==null&&(e[t._meta.hora]=(e[t._meta.hora]||0)+1)});let t=Object.keys(e).map(Number).sort((e,t)=>e-t),n=t.map(e=>`${e}:00`),r=t.map(t=>e[t]),i=O(`chartHorario`);i&&(f.charts.hor=new Chart(i,{type:`bar`,data:{labels:n,datasets:[{label:`Encuestas Capturadas`,data:r,backgroundColor:`#10B98144`,borderColor:`#10B981`,borderWidth:1,borderRadius:4}]},options:{...$(),plugins:{...$().plugins,legend:{display:!1},datalabels:{align:`top`,anchor:`end`,font:{weight:`bold`,size:9},color:document.documentElement.classList.contains(`dark`)?`#ffffff`:`#000000`,formatter:e=>e>0?e:``}}}}))}function Yr(){Q(`htrans`);let e={};f.filtered.forEach(t=>{t._meta.hora_trans!==null&&t._meta.hora_trans!==void 0&&(e[t._meta.hora_trans]=(e[t._meta.hora_trans]||0)+1)});let t=Object.keys(e).map(Number).sort((e,t)=>e-t),n=t.map(e=>`${e}:00`),r=t.map(t=>e[t]),i=O(`chartHoraTransmision`);i&&(f.charts.htrans=new Chart(i,{type:`bar`,data:{labels:n,datasets:[{label:`Encuestas Transmitidas`,data:r,backgroundColor:`#F9731644`,borderColor:`#F97316`,borderWidth:1,borderRadius:4}]},options:{...$(),plugins:{...$().plugins,legend:{display:!1},datalabels:{align:`top`,anchor:`end`,font:{weight:`bold`,size:9},color:document.documentElement.classList.contains(`dark`)?`#ffffff`:`#000000`,formatter:e=>e>0?e:``}}}}))}var Xr=o((()=>{w(),A(),Gr()}));function Zr(e){let t=String(e).toUpperCase();for(let e in x)if(t.includes(e))return x[e].color;return x.DEFAULT.color}function Qr(e){let t=String(e).toUpperCase();if(S[t])return S[t].color;for(let e in S)if(t.includes(e))return S[e].color;return S.DEFAULT.color}function $r(){Q(`cond`);let e={};f.filtered.forEach(t=>{let n=t._meta.condicion,r=_.condicion[n]||String(n).replace(/_/g,` `);e[r]=(e[r]||0)+1});let t=Object.entries(e),n=O(`chartCondicion`);if(!n)return;let r=t.reduce((e,t)=>e+t[1],0);f.charts.cond=new Chart(n,{type:`doughnut`,data:{labels:t.map(e=>e[0]),datasets:[{data:t.map(e=>e[1]),backgroundColor:t.map(e=>Qr(e[0])+`aa`),borderColor:`#1c2128`,borderWidth:2,hoverOffset:15}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:`bottom`,labels:{color:document.documentElement.classList.contains(`dark`)?`#ffffff`:`#000000`,boxWidth:10,font:{size:10,weight:`bold`}}},datalabels:{color:document.documentElement.classList.contains(`dark`)?`#ffffff`:`#000000`,font:{weight:`bold`,size:11},formatter:e=>e>0?e:``},centerText:{text:String(r)}}}})}function ei(){Q(`uso`);let e={};f.filtered.forEach(t=>{let n=t._meta.uso||`N/A`,r=_.uso[n]||String(n).replace(/_/g,` `).toUpperCase();e[r]=(e[r]||0)+1});let t=Object.entries(e).sort((e,t)=>t[1]-e[1]),n=O(`chartUso`);if(!n)return;let r=t.reduce((e,t)=>e+t[1],0);f.charts.uso=new Chart(n,{type:`doughnut`,data:{labels:t.map(e=>e[0]),datasets:[{data:t.map(e=>e[1]),backgroundColor:t.map(e=>Zr(e[0])+`aa`),borderColor:`#1c2128`,borderWidth:2,hoverOffset:15}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:`bottom`,labels:{color:document.documentElement.classList.contains(`dark`)?`#ffffff`:`#000000`,boxWidth:10,font:{size:10,weight:`bold`}}},datalabels:{color:document.documentElement.classList.contains(`dark`)?`#ffffff`:`#000000`,font:{weight:`bold`,size:10},formatter:e=>e>0?e:``},centerText:{text:String(r)}}}})}function ti(){if(!O(`chartClasificacion`))return;Q(`clasif`);let e={"TIPO A":0,"TIPO B":0,"TIPO C":0,"TIPO E":0};f.filtered.forEach(t=>{let n=t._meta&&t._meta.tipo_vivienda;e.hasOwnProperty(n)&&e[n]++});let t=Object.entries(e),n=t.map(e=>e[0]),r=t.map(e=>e[1]),i=n.map(e=>Qr(e)),a=r.reduce((e,t)=>e+t,0),o=O(`chartClasificacion`);f.charts.clasif=new Chart(o,{type:`doughnut`,data:{labels:n,datasets:[{data:r,backgroundColor:i.map(e=>e+`aa`),borderColor:`#1c2128`,borderWidth:2,hoverOffset:15}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:`bottom`,labels:{color:document.documentElement.classList.contains(`dark`)?`#ffffff`:`#000000`,boxWidth:10,font:{size:10,weight:`bold`}}},datalabels:{color:document.documentElement.classList.contains(`dark`)?`#ffffff`:`#000000`,font:{weight:`bold`,size:11},formatter:e=>e>0?e:``},centerText:{text:String(a)}}}})}var ni=o((()=>{w(),A(),Gr()}));function ri(){Q(`dia`);let e={};f.filtered.forEach(t=>{t._meta.fecha&&(e[t._meta.fecha]=(e[t._meta.fecha]||0)+1)});let t=Object.entries(e).sort(),n=O(`chartPorDia`);n&&(f.charts.dia=new Chart(n,{type:`line`,data:{labels:t.map(e=>e[0]),datasets:[{label:`Encuestas`,data:t.map(e=>e[1]),borderColor:`#10B981`,backgroundColor:`#10B98122`,fill:!0,tension:.3}]},options:{...$(),plugins:{...$().plugins,datalabels:{align:`top`,anchor:`end`,offset:2,font:{weight:`bold`,size:10},color:document.documentElement.classList.contains(`dark`)?`#ffffff`:`#000000`,formatter:e=>e>0?e:``}}}}))}function ii(){Q(`histo`);let e=[0,20,40,60,90,120,999],t=[`<20`,`20-40`,`40-60`,`60-90`,`90-120`,`>120`],n=Array(t.length).fill(0);f.filtered.forEach(t=>{let r=t._meta.durMin;if(r!==null){for(let t=0;t<e.length-1;t++)if(r<e[t+1]){n[t]++;break}}});let r=O(`chartHistograma`);r&&(f.charts.histo=new Chart(r,{type:`bar`,data:{labels:t,datasets:[{data:n,backgroundColor:`#F59E0B66`,borderColor:`#F59E0B`,borderWidth:1}]},options:$()}))}function ai(){Q(`semana`);let e=O(`chartResumenSemanal`);if(!e)return;let t=new Set;f.filtered.forEach(e=>{e._meta.semana&&t.add(e._meta.semana)});let n=[...t].sort();if(n.length===0)return;let r=new Set(f.filtered.map(e=>e._meta.cedula)),i=Object.values(f.encMap).filter(e=>r.has(e.cedula)&&e.semanas).sort((e,t)=>{let n=Object.values(e.semanas).reduce((e,t)=>e+t.size,0);return Object.values(t.semanas).reduce((e,t)=>e+t.size,0)-n}).slice(0,10).map((e,t)=>({label:String(e.nombre||`N/A`).split(` `)[0],data:n.map(t=>e.semanas[t]?e.semanas[t].size:0),backgroundColor:m[t%m.length]+`99`,borderColor:m[t%m.length],borderWidth:1,borderRadius:3}));f.charts.semana=new Chart(e,{type:`bar`,data:{labels:n,datasets:i},options:{...$(),plugins:{...$().plugins,legend:{position:`bottom`,labels:{boxWidth:10,font:{size:9}}}},scales:{x:{ticks:{font:{size:9}}},y:{beginAtZero:!0,ticks:{font:{size:9}},title:{display:!0,text:`Controles únicos`,font:{size:9}}}}}})}var oi=o((()=>{w(),A(),Gr()})),si=o((()=>{Gr(),Xr(),ni(),oi()}));function ci(){return`
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
            <select id="incFilterAlerta" class="bg-white dark:bg-surface-dark border rounded-xl px-3 py-2 text-xs outline-none focus:ring-1">
                <option value="">Todas las alertas</option>
            </select>
            <div class="relative w-full sm:w-64">
              <i data-lucide="search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"></i>
              <input type="text" id="incSearchInput" placeholder="Buscar..." class="w-full bg-white dark:bg-surface-dark border rounded-xl pl-10 pr-8 py-2 text-xs outline-none" />
              <button id="incClearSearch" class="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hidden"><i data-lucide="x" class="w-4 h-4"></i></button>
            </div>
          </div>
        </div>
        <div id="inconsistenciasTable" class="w-full" style="height: 500px;"></div>
      </div>
    </div>`}var li=o((()=>{}));function ui(){return`
    <div id="tab-mapa" class="tab-content flex flex-col gap-4 hidden-tab animate-fade-in">
      <div id="mapSectionWrapper" class="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:h-[80vh] lg:min-h-[700px] transition-all duration-500">
        <!-- Leaflet Container -->
        <div id="mapDisplayContainer" class="lg:col-span-10 relative glass-panel rounded-xl overflow-hidden border border-slate-200 dark:border-white/5 shadow-inner">
          <div id="mapControlGroup"
            class="absolute bottom-4 right-4 z-[var(--z-map-control)] flex items-center bg-white/90 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden shadow-xl dark:shadow-2xl transition-all">
            <button id="btnMapStateNormal" class="p-2.5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-white border-r border-slate-200 dark:border-white/10 group" title="Normal">
              <i data-lucide="layout-dashboard" class="w-4 h-4 opacity-70 group-hover:opacity-100"></i>
            </button>
            <button id="btnMapStateExpanded" class="p-2.5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-white border-r border-slate-200 dark:border-white/10 group" title="Expandido">
              <i data-lucide="maximize" class="w-4 h-4 opacity-70 group-hover:opacity-100"></i>
            </button>
            <button id="btnMapStateFull" class="p-2.5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-white group" title="Completo">
              <i data-lucide="expand" class="w-4 h-4 opacity-70 group-hover:opacity-100"></i>
            </button>
          </div>

          <div id="mapView" class="absolute inset-0 z-[var(--z-map-base)] bg-slate-100 dark:bg-surface-dark"></div>

          <!-- Legend -->
          <div class="absolute bottom-12 left-4 z-[var(--z-map-overlay)] bg-white/90 dark:bg-slate-900/95 backdrop-blur-md rounded-xl p-3 shadow-xl border border-slate-200 dark:border-white/10 text-[10px]">
            <div class="text-[9px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-widest mb-2 border-b border-slate-200 dark:border-slate-800 pb-1">Leyenda</div>
            <div class="flex flex-col gap-1.5">
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-brand-blue"></span><span>Viviendas</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-brand-emerald"></span><span>Efectiva</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-brand-orange"></span><span>No Efectiva</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-brand-red"></span><span>Alertas</span>
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
          
          <button id="btnMapFilterAll" class="glass-panel rounded-xl p-3 flex items-center justify-between border-l-4 border-brand-blue hover:bg-slate-100/50 dark:hover:bg-white/5 transition-all group active-filter-blue shadow-md">
            <div class="flex items-center gap-1.5">
              <i data-lucide="layers" class="w-3.5 h-3.5 text-brand-blue opacity-80"></i>
              <span class="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest font-sans">Todos</span>
            </div>
            <span class="text-sm font-black text-slate-900 dark:text-white font-outfit" id="mapKpiPoints">0</span>
          </button>

          <button id="btnMapFilterEfectivas" class="glass-panel rounded-xl p-3 flex items-center justify-between border-l-4 border-brand-emerald hover:bg-slate-100/50 dark:hover:bg-white/5 transition-all group">
            <div class="flex items-center gap-1.5">
              <i data-lucide="check-circle" class="w-3.5 h-3.5 text-brand-emerald opacity-80"></i>
              <span class="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest font-sans">Efectivas</span>
            </div>
            <span class="text-sm font-black text-slate-900 dark:text-white font-outfit" id="mapKpiComplete">0</span>
          </button>

          <button id="btnMapFilterNoEfectiva" class="glass-panel rounded-xl p-3 flex items-center justify-between border-l-4 border-brand-orange hover:bg-slate-100/50 dark:hover:bg-white/5 transition-all group">
            <div class="flex items-center gap-1.5">
              <i data-lucide="help-circle" class="w-3.5 h-3.5 text-brand-orange opacity-80"></i>
              <span class="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest font-sans">No Efect.</span>
            </div>
            <span class="text-sm font-black text-slate-900 dark:text-white font-outfit" id="mapKpiNoEfectiva">0</span>
          </button>

          <button id="btnMapFilterAlertas" class="glass-panel rounded-xl p-3 flex items-center justify-between border-l-4 border-brand-red hover:bg-slate-100/50 dark:hover:bg-white/5 transition-all group">
            <div class="flex items-center gap-1.5">
              <i data-lucide="shield-alert" class="w-3.5 h-3.5 text-brand-red opacity-80"></i>
              <span class="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest font-sans">Alertas</span>
            </div>
            <span class="text-sm font-black text-brand-red font-outfit" id="mapKpiAlertas">0</span>
          </button>

          <button id="btnVerRutaEncuestador" disabled class="glass-panel rounded-xl p-3 flex items-center justify-between !border-l-4 !border-orange-500 hover:bg-orange-500/5 transition-all group disabled:opacity-40 disabled:cursor-not-allowed">
            <div class="flex items-center gap-1.5">
              <i data-lucide="route" class="w-3.5 h-3.5 text-orange-500 opacity-80"></i>
              <span class="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest font-sans">Ver Ruta</span>
            </div>
            <span id="mapRouteAgentCount" class="text-[10px] font-black text-slate-500 dark:text-slate-400">—</span>
          </button>

          <div class="glass-panel rounded-xl p-3 flex items-center justify-between border-l-4 border-brand-purple opacity-90">
            <div class="flex items-center gap-1.5">
              <i data-lucide="users" class="w-3.5 h-3.5 text-brand-purple opacity-80"></i>
              <span class="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest font-sans">Encuestadores</span>
            </div>
            <span class="text-sm font-black text-slate-900 dark:text-white font-outfit" id="mapKpiAgents">0</span>
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
              class="w-full bg-white dark:bg-surface-dark border border-slate-300 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs outline-none focus:ring-1" />
          </div>
        </div>
        <div class="flex-1 bg-white dark:bg-slate-900 relative min-h-0">
          <div id="detailGrid" class="w-full h-full border-0"></div>
        </div>
      </div>
    </div>`}var di=o((()=>{}));function fi(){return`
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
                  class="w-full bg-slate-50 dark:bg-surface-dark border-2 border-brand-blue/30 rounded-xl pl-10 pr-10 py-2.5 text-sm text-slate-800 dark:text-white font-bold outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 transition-all font-outfit" />
                
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
          <div class="p-3 bg-slate-50 dark:bg-surface-dark/60 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <div>
              <p class="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Entidad Federal</p>
              <p class="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1 truncate" id="mm111Entidad">---</p>
            </div>
            <div class="bg-slate-200 dark:bg-slate-800 px-3 py-1.5 rounded-lg text-xs font-black font-outfit border border-slate-300 dark:border-slate-700" id="mm111EntidadCod">--</div>
          </div>
          <div class="p-3 bg-slate-50 dark:bg-surface-dark/60 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <div>
              <p class="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Municipio</p>
              <p class="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1 truncate" id="mm111Municipio">---</p>
            </div>
            <div class="bg-slate-200 dark:bg-slate-800 px-3 py-1.5 rounded-lg text-xs font-black font-outfit border border-slate-300 dark:border-slate-700" id="mm111MunicipioCod">--</div>
          </div>
          <div class="p-3 bg-slate-50 dark:bg-surface-dark/60 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <div>
              <p class="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Parroquia</p>
              <p class="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1 truncate" id="mm111Parroquia">---</p>
            </div>
            <div class="bg-slate-200 dark:bg-slate-800 px-3 py-1.5 rounded-lg text-xs font-black font-outfit border border-slate-300 dark:border-slate-700" id="mm111ParroquiaCod">--</div>
          </div>
          <div class="p-3 bg-slate-50 dark:bg-surface-dark/60 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <div>
              <p class="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Centro Poblado</p>
              <p class="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1 truncate" id="mm111CPoblado">---</p>
            </div>
            <div class="bg-slate-200 dark:bg-slate-800 px-3 py-1.5 rounded-lg text-xs font-black font-outfit border border-slate-300 dark:border-slate-700" id="mm111CPobladoCod">--</div>
          </div>
        </div>

        <!-- Barra de Controles Operativos -->
        <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-[1px] bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
          <div class="px-4 py-3 flex flex-col items-center justify-center text-center bg-white dark:bg-surface-dark">
            <span class="text-[9px] uppercase font-bold text-slate-500">Segmento</span>
            <div class="text-sm font-black font-outfit mt-1 text-slate-800 dark:text-slate-300" id="mm111Segmento">-</div>
          </div>
          <div class="px-4 py-3 flex flex-col items-center justify-center text-center bg-white dark:bg-surface-dark">
            <span class="text-[9px] uppercase font-bold text-slate-500">Sector</span>
            <div class="text-sm font-black font-outfit mt-1 text-slate-800 dark:text-slate-300" id="mm111Sector">-</div>
          </div>
          <div class="px-4 py-3 flex flex-col items-center justify-center text-center bg-white dark:bg-surface-dark">
            <span class="text-[9px] uppercase font-bold text-slate-500">Nodo</span>
            <div class="text-sm font-black font-outfit mt-1 text-slate-800 dark:text-slate-300" id="mm111Nodo">-</div>
          </div>
          <div class="px-4 py-3 flex flex-col items-center justify-center text-center bg-white dark:bg-surface-dark">
            <span class="text-[9px] uppercase font-bold text-slate-500">Semana</span>
            <div class="text-sm font-black font-outfit mt-1 text-slate-800 dark:text-slate-300" id="mm111Semana">-</div>
          </div>
          <div class="px-4 py-3 flex flex-col items-center justify-center text-center bg-white dark:bg-surface-dark col-span-2 sm:col-span-4 lg:col-span-1">
            <span class="text-[9px] uppercase font-bold text-slate-500">Control Maestro</span>
            <div class="text-sm font-black font-outfit mt-1 text-slate-800 dark:text-slate-300 truncate w-full" id="mm111ControlMaestro">-</div>
          </div>
          <div class="px-4 py-3 flex flex-col items-center justify-center text-center bg-yellow-50 dark:bg-yellow-500/5 border-x border-yellow-100 dark:border-yellow-500/10">
            <span class="text-[10px] uppercase font-black text-yellow-600 dark:text-yellow-400">Control Nro.</span>
            <div class="text-lg font-black font-outfit text-yellow-700 dark:text-yellow-200" id="mm111ControlNro">0000</div>
          </div>
          <div class="px-4 py-3 flex flex-col items-center justify-center text-center bg-white dark:bg-surface-dark">
            <span class="text-[9px] uppercase font-bold text-slate-500">Lote</span>
            <div class="text-sm font-black font-outfit mt-1 text-slate-800 dark:text-slate-300" id="mm111Lote">-</div>
          </div>
        </div>
      </div>

      <!-- Tabla de Listado de Viviendas -->
      <div class="card-premium flex-1 flex flex-col p-0 overflow-hidden border-2 border-slate-200 dark:border-slate-700 mt-4 relative min-h-[500px] lg:min-h-0">
        <div id="mm111Grid" class="w-full h-full bg-white dark:bg-surface-dark"></div>
      </div>
    </div>`}var pi=o((()=>{}));function mi(){return`
    <div id="tab-ranking" class="tab-content flex flex-col gap-8 hidden-tab animate-fade-in">
      <!-- Resumen de Desempeño Global -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="glass-panel rounded-2xl p-4 !border-l-4 !border-brand-emerald">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-brand-emerald/10 rounded-lg text-brand-emerald">
              <i data-lucide="check-circle" class="w-5 h-5"></i>
            </div>
            <div>
              <p class="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-widest font-sans mt-0">Efectivas</p>
              <h3 class="font-black font-outfit text-2xl text-slate-900 dark:text-white mt-0.5" id="rankKpiEfectivas">0</h3>
            </div>
          </div>
        </div>

        <div class="glass-panel rounded-2xl p-4 !border-l-4 !border-brand-orange">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-brand-orange/10 rounded-lg text-brand-orange">
              <i data-lucide="help-circle" class="w-5 h-5"></i>
            </div>
            <div>
              <p class="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-widest font-sans mt-0">No Efectiva</p>
              <h3 class="font-black font-outfit text-2xl text-slate-900 dark:text-white mt-0.5" id="rankKpiNoEfectiva">0</h3>
            </div>
          </div>
        </div>

        <div class="glass-panel rounded-2xl p-4 !border-l-4 !border-brand-red">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-brand-red/10 rounded-lg text-brand-red">
              <i data-lucide="alert-triangle" class="w-5 h-5"></i>
            </div>
            <div>
              <p class="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-widest font-sans mt-0">Alertas Totales</p>
              <h3 class="font-black font-outfit text-2xl text-brand-red mt-0.5" id="rankKpiAlerts">0</h3>
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
    </div>`}var hi=o((()=>{}));function gi(){return`
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
          <div class="text-[10px] font-bold text-emerald-400 tracking-wider uppercase mt-1">Efectiva</div>
        </div>

        <div class="card-premium group relative animate-slide-up" title="Registros donde no se pudo concretar la entrevista debido a rechazos, ausencia de informante u otros motivos.">
          <div class="card-glow bg-orange-500/10 group-hover:bg-orange-500/20"></div>
          <div class="h-10 w-10 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center mb-4">
            <i data-lucide="help-circle" class="w-5 h-5"></i>
          </div>
          <div class="kpi-value-text" id="kpiNoEfectiva">0</div>
          <div class="text-[10px] font-bold text-orange-400 tracking-wider uppercase mt-1">No Efectivas</div>
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
        <div class="card-premium !border-l-2 !border-l-brand-orange" title="Tiempo promedio invertido en completar una entrevista efectiva (desde el inicio hasta el fin del formulario).">
          <div class="kpi-label !mt-0 mb-2 flex items-center gap-1.5"><i data-lucide="clock" class="w-4 h-4 text-brand-orange/80"></i> Duración Media</div>
          <div class="kpi-value-text text-slate-900 dark:text-white" id="kpiDuracion">0m</div>
        </div>
        <div class="card-premium !border-l-2 !border-l-teal-500" title="Censo total de personas registradas dentro de los hogares que respondieron la encuesta de manera efectiva.">
          <div class="kpi-label !mt-0 mb-2 flex items-center gap-1.5"><i data-lucide="users" class="w-4 h-4 text-teal-500/80"></i> Integrantes</div>
          <div class="kpi-value-text text-slate-900 dark:text-white" id="kpiPersonas">0</div>
        </div>
        <div class="card-premium !border-l-2 !border-l-indigo-500" title="Cantidad de hogares donde solo se registró a un (1) habitante o encuestado.">
          <div class="kpi-label !mt-0 mb-2 flex items-center gap-1.5"><i data-lucide="user" class="w-4 h-4 text-indigo-500/80"></i> Hogares Unipersonales</div>
          <div class="kpi-value-text text-slate-900 dark:text-white" id="kpiHogaresUni">0</div>
        </div>
        <div class="card-premium !border-l-2 !border-l-cyan-500" title="Cantidad total de planillas físicas (Controles) registradas en el sistema.">
          <div class="kpi-label !mt-0 mb-2 flex items-center gap-1.5"><i data-lucide="clipboard-list" class="w-4 h-4 text-cyan-500/80"></i> Total Controles</div>
          <div class="kpi-value-text text-slate-900 dark:text-white" id="kpiControles">0</div>
        </div>
        <div class="card-premium !border-l-2 !border-l-blue-500" title="Total de personas de sexo masculino registradas en los hogares censados.">
          <div class="kpi-label !mt-0 mb-2 flex items-center gap-1.5"><i data-lucide="mars" class="w-4 h-4 text-blue-500/80"></i> Hombres</div>
          <div class="kpi-value-text text-slate-900 dark:text-white" id="kpiHombres">0</div>
        </div>
        <div class="card-premium !border-l-2 !border-l-pink-500" title="Total de personas de sexo femenino registradas en los hogares censados.">
          <div class="kpi-label !mt-0 mb-2 flex items-center gap-1.5"><i data-lucide="venus" class="w-4 h-4 text-pink-500/80"></i> Mujeres</div>
          <div class="kpi-value-text text-slate-900 dark:text-white" id="kpiMujeres">0</div>
        </div>
      </section>

      <!-- TIER 1.5: Clasificación de Estados de Vivienda (Ahorra arriba de las donas) -->
      <section class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div class="card-premium !border-l-2 !border-l-brand-purple" title="Viviendas donde no se pudo realizar la entrevista por ausencia o rechazo.">
          <div class="kpi-label !mt-0 mb-1 flex items-center gap-1.5"><i data-lucide="user-round-x" class="w-4 h-4 text-brand-purple"></i> TIPO A</div>
          <div class="flex items-baseline gap-2">
            <div class="kpi-value-text text-xl" id="kpiTipoA">0</div>
            <div class="text-[10px] font-bold text-slate-400 uppercase tracking-tighter" id="pctTipoA">0%</div>
          </div>
          <div class="text-[9px] text-slate-500 mt-1 uppercase font-bold tracking-widest">Ausentes / Rechazos</div>
        </div>
        <div class="card-premium !border-l-2 !border-l-brand-orange" title="Viviendas desocupadas, en construcción o de uso ocasional.">
          <div class="kpi-label !mt-0 mb-1 flex items-center gap-1.5"><i data-lucide="brick-wall" class="w-4 h-4 text-brand-orange"></i> TIPO B</div>
          <div class="flex items-baseline gap-2">
            <div class="kpi-value-text text-xl" id="kpiTipoB">0</div>
            <div class="text-[10px] font-bold text-slate-400 uppercase tracking-tighter" id="pctTipoB">0%</div>
          </div>
          <div class="text-[9px] text-slate-500 mt-1 uppercase font-bold tracking-widest">Desocupadas / Construcción</div>
        </div>
        <div class="card-premium !border-l-2 !border-l-brand-red" title="Viviendas demolidas, inexistentes o de uso no residencial permanente.">
          <div class="kpi-label !mt-0 mb-1 flex items-center gap-1.5"><i data-lucide="hammer" class="w-4 h-4 text-brand-red"></i> TIPO C</div>
          <div class="flex items-baseline gap-2">
            <div class="kpi-value-text text-xl" id="kpiTipoC">0</div>
            <div class="text-[10px] font-bold text-slate-400 uppercase tracking-tighter" id="pctTipoC">0%</div>
          </div>
          <div class="text-[9px] text-slate-500 mt-1 uppercase font-bold tracking-widest">Inexistentes / Demolidas</div>
        </div>
        <div class="card-premium !border-l-2 !border-l-brand-emerald" title="Viviendas con entrevistas exitosas (Ocupadas con ocupantes presentes).">
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
        <div class="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800/50 p-5 flex flex-col items-center min-h-[300px] sm:h-[380px] transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700/50 group" title="Distribución porcentual de las viviendas según su clasificación final.">
          <div class="w-full mb-4">
            <h3 class="font-bold flex items-center gap-2 font-outfit text-sm text-slate-800 dark:text-slate-200">
              <i data-lucide="pie-chart" class="text-brand-emerald w-4 h-4"></i> Clasificación de Viviendas
            </h3>
          </div>
          <div class="flex-1 w-full relative">
            <canvas id="chartClasificacion"></canvas>
          </div>
        </div>

        <!-- Tipología Vivienda -->
        <div class="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800/50 p-5 flex flex-col items-center min-h-[300px] sm:h-[380px] transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700/50 group" title="Distribución de las unidades inmobiliarias según su estado de habitabilidad u ocupación.">
          <div class="w-full mb-4">
            <h3 class="font-bold flex items-center gap-2 font-outfit text-sm text-slate-800 dark:text-slate-200">
              <i data-lucide="home" class="text-brand-purple w-4 h-4"></i> Tipología Vivienda
            </h3>
          </div>
          <div class="flex-1 w-full relative">
            <canvas id="chartCondicion"></canvas>
          </div>
        </div>

        <!-- Uso Estructura -->
        <div class="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800/50 p-5 flex flex-col items-center min-h-[300px] sm:h-[380px] transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700/50 group" title="Desglose del uso principal de las estructuras visitadas (Residencial, Comercial, Mixto, etc.).">
          <div class="w-full mb-4">
            <h3 class="font-bold flex items-center gap-2 font-outfit text-sm text-slate-800 dark:text-slate-200">
              <i data-lucide="building-2" class="text-brand-emerald w-4 h-4"></i> Uso Estructura
            </h3>
          </div>
          <div class="flex-1 w-full relative">
            <canvas id="chartUso"></canvas>
          </div>
        </div>
      </div>

      <!-- SECCIÓN 2: Métricas Operativas y Rendimiento -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <!-- Volumen por Encuestador -->
        <div class="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800/50 p-5 flex flex-col min-h-[300px] sm:h-[380px] transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700/50 group" title="Ranking de productividad mostrando los 15 encuestadores con mayor volumen de captación en el periodo.">
          <div class="w-full mb-4">
            <h3 class="font-bold flex items-center gap-2 font-outfit text-sm text-slate-800 dark:text-slate-200">
              <i data-lucide="bar-chart-3" class="text-brand-blue w-4 h-4"></i> Volumen por Encuestador
            </h3>
          </div>
          <div class="flex-1 min-h-0 relative">
            <canvas id="chartEncuestador"></canvas>
          </div>
        </div>

        <!-- Distribución Horaria -->
        <div class="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800/50 p-5 flex flex-col min-h-[300px] sm:h-[380px] transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700/50 group" title="Frecuencia de las encuestas según la hora de inicio registrada por el dispositivo en campo (Métricas de Jornada Laboral).">
          <div class="flex justify-between items-center mb-4">
            <h3 class="font-bold flex items-center gap-2 font-outfit text-sm text-slate-800 dark:text-slate-200">
              <i data-lucide="clock" class="text-brand-emerald w-4 h-4"></i> Distribución Horaria
            </h3>
          </div>
          <div class="flex-1 min-h-0 relative">
            <canvas id="chartHorario"></canvas>
          </div>
        </div>

        <!-- Hora de Transmisión -->
        <div class="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800/50 p-5 flex flex-col min-h-[300px] sm:h-[380px] transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700/50 group" title="Frecuencia de envío de encuestas según la hora en que el dispositivo transmitió los datos al servidor (Métricas de Envío).">
          <div class="flex justify-between items-center mb-4">
            <h3 class="font-bold flex items-center gap-2 font-outfit text-sm text-slate-800 dark:text-slate-200">
              <i data-lucide="cloud-upload" class="text-brand-orange w-4 h-4"></i> Hora de Transmisión
            </h3>
          </div>
          <div class="flex-1 min-h-0 relative">
            <canvas id="chartHoraTransmision"></canvas>
          </div>
        </div>
      </div>

      <!-- SECCIÓN 3: Tendencia Temporal (FINAL) -->
      <div class="grid grid-cols-1 gap-4 sm:gap-6">
        <!-- Tendencia Diaria de Recolección -->
        <div class="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800/50 p-5 flex flex-col min-h-[350px] transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700/50 group" title="Evolución temporal del volumen de recolección de datos según la fecha de realización de la entrevista.">
          <div class="flex justify-between items-center mb-4">
            <h3 class="font-bold flex items-center gap-2 font-outfit text-sm text-slate-800 dark:text-slate-200">
              <i data-lucide="activity" class="text-brand-blue w-4 h-4"></i> Tendencia Diaria de Recolección
            </h3>
          </div>
          <div class="flex-1 min-h-0 relative">
            <canvas id="chartPorDia"></canvas>
          </div>
        </div>
      </div>
    </div>`}var _i=o((()=>{})),vi=o((()=>{li(),di(),pi(),hi(),_i()}));function yi(){return`
    <div id="detailModal" class="hidden fixed inset-0 z-[var(--z-modal)] flex items-center justify-center">
      <div class="absolute inset-0 bg-surface-dark/80 backdrop-blur-md" id="detailModalBackdrop"></div>
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
    </div>`}var bi=o((()=>{}));function xi(){return`
    <div id="errorState"
      class="hidden fixed inset-0 z-[var(--z-modal)] bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center">
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
    </div>`}var Si=o((()=>{}));function Ci(){return`
    <div id="filtersOverlay"
      class="fixed inset-0 z-[var(--z-offcanvas)] bg-slate-900/20 dark:bg-surface-dark/40 hidden backdrop-blur-sm transition-opacity opacity-0"
      aria-hidden="true"></div>

    <div id="offCanvasFilters"
      class="fixed inset-y-0 right-0 z-[var(--z-offcanvas)] w-full sm:w-[400px] border-l border-slate-200 dark:border-white/10 transform translate-x-full transition-transform duration-300 ease-out flex flex-col shadow-[-10px_0_40px_rgba(0,0,0,0.1)] dark:shadow-[-10px_0_40px_rgba(0,0,0,0.5)] bg-white dark:bg-slate-900"
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
              <select id="filterMunicipio" class="w-full bg-white dark:bg-surface-dark border rounded-xl px-3 py-2 text-sm outline-none focus:border-brand-blue">
                <option value="">Todos los municipios</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-slate-500 mb-1.5 ml-1">Parroquia</label>
              <select id="filterParroquia" class="w-full bg-white dark:bg-surface-dark border rounded-xl px-3 py-2 text-sm outline-none focus:border-brand-blue">
                <option value="">Todas las parroquias</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-slate-500 mb-1.5 ml-1">Nodo / Zona</label>
              <select id="filterNodo" class="w-full bg-white dark:bg-surface-dark border rounded-xl px-3 py-2 text-sm outline-none focus:border-brand-blue">
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
              <select id="filterEstado" class="w-full bg-white dark:bg-surface-dark border rounded-xl px-3 py-2 text-sm outline-none">
                <option value="">Todas</option>
                <option value="completada">Completada (Efectiva)</option>
                <option value="no_efectiva">No Efectivas / Rechazo</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-slate-500 mb-1.5 ml-1">Clasificación de Vivienda (A, B, C, E)</label>
              <select id="filterClasificacion" class="w-full bg-white dark:bg-surface-dark border rounded-xl px-3 py-2 text-sm outline-none">
                <option value="">Todas las categorías</option>
                <option value="TIPO A">TIPO A - Ausentes / Rechazos</option>
                <option value="TIPO B">TIPO B - Desocupadas / Construcción</option>
                <option value="TIPO C">TIPO C - Inexistentes / Demolidas</option>
                <option value="TIPO E">TIPO E - Entrevistas Efectivas</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-slate-500 mb-1.5 ml-1">Condición de Ocupación</label>
              <select id="filterCondicion" class="w-full bg-white dark:bg-surface-dark border rounded-xl px-3 py-2 text-sm outline-none">
                <option value="">Todas</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-slate-500 mb-1.5 ml-1">Tipología Vivienda</label>
              <select id="filterSituacionVivienda" class="w-full bg-white dark:bg-surface-dark border rounded-xl px-3 py-2 text-sm outline-none">
                <option value="">Todas</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-slate-500 mb-1.5 ml-1">Uso Registrado</label>
              <select id="filterUso" class="w-full bg-white dark:bg-surface-dark border rounded-xl px-3 py-2 text-sm outline-none">
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
              <select id="filterSemana" class="w-full bg-white dark:bg-surface-dark border rounded-xl px-3 py-2 text-sm outline-none">
                <option value="">Consolidado global</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-slate-500 mb-1.5 ml-1">Supervisor Control</label>
              <select id="filterControl" class="w-full bg-white dark:bg-surface-dark border rounded-xl px-3 py-2 text-sm outline-none">
                <option value="">Todos</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-slate-500 mb-1.5 ml-1">Hora de Inicio (Campo)</label>
              <select id="filterHoraInicio" class="w-full bg-white dark:bg-surface-dark border rounded-xl px-3 py-2 text-sm outline-none">
                <option value="">Cualquier hora</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-slate-500 mb-1.5 ml-1">Hora de Transmisión</label>
              <select id="filterHoraTransmision" class="w-full bg-white dark:bg-surface-dark border rounded-xl px-3 py-2 text-sm outline-none">
                <option value="">Cualquier hora</option>
              </select>
            </div>
            <div>
              <label class="block text-[11px] font-bold text-slate-500 mb-1.5 ml-1">Alertas Detectadas</label>
              <select id="filterAlerta" class="w-full bg-white dark:bg-surface-dark border rounded-xl px-3 py-2 text-sm outline-none">
                <option value="">Todas las alertas</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="p-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/80 z-10 flex gap-3">
        <button id="btnResetOffcanvas" class="group flex items-center justify-center gap-2 py-3.5 px-4 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-500 hover:text-brand-orange hover:border-brand-orange/30 transition-all text-xs font-bold uppercase flex-1">
          <i data-lucide="brush-cleaning" class="w-4 h-4 group-hover:-rotate-12 transition-transform"></i> Limpiar
        </button>
        <button id="btnApplyFilters" class="btn-primary flex-[2] py-3.5 text-xs font-bold uppercase">
          <i data-lucide="check" class="w-4 h-4"></i> Aplicar Parámetros
        </button>
      </div>
    </div>`}var wi=o((()=>{}));function Ti(){return`
    <div id="loadingOverlay"
      class="fixed inset-0 z-[var(--z-loader)] bg-surface-dark/90 backdrop-blur-xl flex flex-col items-center justify-center gap-6 pointer-events-none opacity-0 transition-opacity duration-500">
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
    </div>`}var Ei=o((()=>{})),Di=o((()=>{bi(),Si(),wi(),Ei()}));function Oi(){let e=O(`mainContent`),t=document.body;if(!e){console.error(`Layout Error: mainContent element not found.`);return}let n=[gi(),ui(),mi(),fi(),ci()].join(``);e.insertAdjacentHTML(`beforeend`,n);let r=[Ti(),xi(),Ci(),yi()].join(``);t.insertAdjacentHTML(`beforeend`,r),console.log(`UI Layout: All components injected successfully ✓`)}var ki=o((()=>{A(),vi(),Di()})),Ai=o((()=>{ki()}));function ji(){let e=localStorage.getItem(`esca_theme`),t=!0;e===`light`?t=!1:e===`dark`&&(t=!0),Mi(t);let n=O(`btnThemeToggle`);n&&n.addEventListener(`click`,()=>{Mi(!document.documentElement.classList.contains(`dark`))})}function Mi(e){let t=O(`iconMoon`),n=O(`iconSun`);e?(document.documentElement.classList.add(`dark`),localStorage.setItem(`esca_theme`,`dark`),t&&(t.style.display=`none`),n&&(n.style.display=`block`)):(document.documentElement.classList.remove(`dark`),localStorage.setItem(`esca_theme`,`light`),t&&(t.style.display=`block`),n&&(n.style.display=`none`)),Ur(e)}var Ni=o((()=>{A(),si()}));function Pi(){let e=f.filtered.filter(e=>e._meta&&e._meta.estado===`completada`).length,t=f.filtered.length-e,n=new Set(f.filtered.map(e=>e._meta.cedula)).size,r=f.filtered.filter(e=>e._meta.estado===`completada`).map(e=>e._meta.durMin).filter(e=>e!==null),i=r.length?T(r):0,a=f.filtered.reduce((e,t)=>e+(t._meta.totalPers||0),0),o=f.filtered.reduce((e,t)=>e+(t._meta.hogaresUniPersonales||0),0),s=new Set(f.filtered.map(e=>e._meta.control)).size,c=f.filtered.reduce((e,t)=>e+(t._meta.totalHombres||0),0),l=f.filtered.reduce((e,t)=>e+(t._meta.totalMujeres||0),0),u=new Set(f.filtered.map(e=>e._meta.mun)).size,d=f.filtered.filter(e=>e._meta&&e._meta.tipo_vivienda===`TIPO A`).length,p=f.filtered.filter(e=>e._meta&&e._meta.tipo_vivienda===`TIPO B`).length,m=f.filtered.filter(e=>e._meta&&e._meta.tipo_vivienda===`TIPO C`).length,h=f.filtered.filter(e=>e._meta&&e._meta.tipo_vivienda===`TIPO E`).length,g=f.filtered.filter(e=>e._meta&&e._meta.tipo_vivienda===`NO DEFINIDO`).length,_=f.filtered.length||1,v=Math.round(d/_*100),y=Math.round(p/_*100),b=Math.round(m/_*100),x=Math.round(h/_*100),S=Math.round(g/_*100);O(`kpiTotal`)&&(O(`kpiTotal`).textContent=f.filtered.length),O(`kpiCompletadas`)&&(O(`kpiCompletadas`).textContent=e),O(`kpiNoEfectiva`)&&(O(`kpiNoEfectiva`).textContent=t),O(`kpiEncuestadores`)&&(O(`kpiEncuestadores`).textContent=n),O(`kpiDuracion`)&&(O(`kpiDuracion`).textContent=i?`${Math.round(i)} min`:`N/A`),O(`kpiPersonas`)&&(O(`kpiPersonas`).textContent=a),O(`kpiHogaresUni`)&&(O(`kpiHogaresUni`).textContent=o),O(`kpiControles`)&&(O(`kpiControles`).textContent=s),O(`kpiHombres`)&&(O(`kpiHombres`).textContent=c),O(`kpiMujeres`)&&(O(`kpiMujeres`).textContent=l),O(`kpiMunicipios`)&&(O(`kpiMunicipios`).textContent=u),O(`kpiTipoA`)&&(O(`kpiTipoA`).textContent=d),O(`pctTipoA`)&&(O(`pctTipoA`).textContent=`${v}%`),O(`kpiTipoB`)&&(O(`kpiTipoB`).textContent=p),O(`pctTipoB`)&&(O(`pctTipoB`).textContent=`${y}%`),O(`kpiTipoC`)&&(O(`kpiTipoC`).textContent=m),O(`pctTipoC`)&&(O(`pctTipoC`).textContent=`${b}%`),O(`kpiTipoE`)&&(O(`kpiTipoE`).textContent=h),O(`pctTipoE`)&&(O(`pctTipoE`).textContent=`${x}%`),O(`kpiTipoND`)&&(O(`kpiTipoND`).textContent=g),O(`pctTipoND`)&&(O(`pctTipoND`).textContent=`${S}%`);let C=f.filtered.length/(n*8||1);O(`kpiEncPerHour`)&&(O(`kpiEncPerHour`).textContent=C.toFixed(1));let w={};f.filtered.forEach(e=>{let t=e._meta&&e._meta.nombre||`Desconocido`;w[t]=(w[t]||0)+1});let E=Object.entries(w).sort((e,t)=>t[1]-e[1])[0]||[`--`,0];O(`kpiTopProducer`)&&(O(`kpiTopProducer`).textContent=String(E[0]).split(` `)[0]),O(`kpiTopProducerVal`)&&(O(`kpiTopProducerVal`).textContent=`${E[1]} encuestas`);let D=f.filtered.filter(e=>e._meta&&e._meta.hasAlerts).length,k=f.filtered.length>0?Math.round(e/f.filtered.length*100):0,A=f.filtered.length>0?Math.round(D/f.filtered.length*100):0;O(`kpiTasaEfectividad`)&&(O(`kpiTasaEfectividad`).textContent=`${k}%`),O(`kpiTotalAlertas`)&&(O(`kpiTotalAlertas`).textContent=D),O(`kpiTasaAlerta`)&&(O(`kpiTasaAlerta`).textContent=`${A}%`);let j={};f.filtered.forEach(e=>{e._meta&&e._meta.hora!==null&&(j[e._meta.hora]=(j[e._meta.hora]||0)+1)});let M=Object.entries(j).sort((e,t)=>t[1]-e[1])[0]||[null,0];O(`kpiPeakHour`)&&(O(`kpiPeakHour`).textContent=M[0]===null?`--`:`${M[0]}:00`);let N=O(`inputMetaDiaria`),P=n*(N&&!isNaN(Number(N.value))&&Number(N.value)>0?Number(N.value):20),F=Math.min(100,f.filtered.length/(P||1)*100);O(`kpiMetaProgreso`)&&(O(`kpiMetaProgreso`).textContent=`${Math.round(F)}%`),O(`kpiMetaBar`)&&(O(`kpiMetaBar`).style.width=`${F}%`),O(`rankKpiEfectivas`)&&(O(`rankKpiEfectivas`).textContent=e),O(`rankKpiNoEfectiva`)&&(O(`rankKpiNoEfectiva`).textContent=t),O(`rankKpiAlerts`)&&(O(`rankKpiAlerts`).textContent=D)}var Fi=o((()=>{w(),A()}));function Ii(e){if(!e)return;let t=O(`mainTabs`);t&&t.querySelectorAll(`.tab-btn`).forEach(t=>{let n=t.dataset.tab===e;t.classList.toggle(`tab-btn-active`,n),t.classList.toggle(`active`,n)}),document.querySelectorAll(`.tab-content`).forEach(t=>{t.classList.toggle(`hidden-tab`,t.id!==e)}),e===`tab-mapa`&&(f.map||rr(),setTimeout(()=>{f.map.invalidateSize(),setTimeout(()=>{let e=!1;Li[`tab-mapa`]||(Li[`tab-mapa`]=!0,qn(),e=!0),dr(),f.detailTable&&!e&&f.detailTable.redraw(!0),window.lucide&&window.lucide.createIcons()},200)},50)),e===`tab-ranking`&&(Li[`tab-ranking`]?f.rankingTabulator&&setTimeout(()=>f.rankingTabulator.redraw(!0),50):(Li[`tab-ranking`]=!0,setTimeout(()=>Yn(),100))),e===`tab-mm111`&&(f.mm111Table&&f.mm111Table.redraw(),!f.mm111Table&&f.filtered.length>0&&Er()),setTimeout(()=>{Object.values(f.charts).forEach(e=>{e&&typeof e.resize==`function`&&(e.update(`none`),e.resize())}),window.dispatchEvent(new Event(`resize`))},50),window.lucide&&window.lucide.createIcons()}var Li,Ri=o((()=>{w(),A(),pr(),Zn(),Or(),Hr(),Li={}}));function zi(e){let t=O(`mapSectionWrapper`),n=O(`mapKpiGrid`),r=O(`mapDisplayContainer`),i=n?n.querySelector(`.header-label`):null;if(!t||!n||!r)return;document.body.classList.remove(`has-map-fullscreen`),t.className=`flex flex-col lg:grid lg:grid-cols-12 gap-4 sm:gap-8 transition-all duration-500 overflow-visible items-stretch`,r.className=`lg:col-span-10 relative transition-all duration-500 rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-slate-900`,n.className=`lg:col-span-2 transition-all duration-500 overflow-visible flex flex-col gap-3`,i&&(i.className=`header-label text-[9px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-widest ml-1 mb-1`);let a=O(`btnToggleMapKpis`);if(a&&a.classList.add(`hidden`),n.querySelectorAll(`button:not(#btnToggleMapKpis), div.glass-panel`).forEach(e=>{e.className=e.id===`btnVerRutaEncuestador`?`glass-panel rounded-xl p-3 flex items-center justify-between !border-l-4 !border-orange-500 hover:bg-orange-500/5 transition-all group disabled:opacity-40 disabled:cursor-not-allowed`:`glass-panel rounded-xl p-3 flex items-center justify-between !border-l-4 hover:bg-slate-100/50 dark:hover:bg-white/5 transition-all group`,e.id===`btnMapFilterAll`&&e.classList.add(`!border-brand-blue`),e.id===`btnMapFilterEfectivas`&&e.classList.add(`!border-brand-emerald`),e.id===`btnMapFilterNoEfectiva`&&e.classList.add(`!border-brand-orange`),e.id===`btnMapFilterAlertas`&&e.classList.add(`!border-brand-red`),(e.classList.contains(`opacity-80`)||e.id===`kpiMapEncuestadorContainer`)&&e.classList.add(`border-brand-purple`);let t=e.querySelector(`span.uppercase`);t&&t.classList.remove(`hidden`)}),e===`normal`)t.classList.add(`h-auto`,`lg:h-[88vh]`,`lg:min-h-[700px]`),r.classList.add(`h-[500px]`,`lg:h-auto`,`lg:col-span-10`),n.classList.add(`grid`,`grid-cols-2`,`sm:flex`,`sm:flex-col`,`gap-2`),i&&i.classList.add(`hidden`,`sm:block`),n.querySelectorAll(`:scope > button, :scope > div.glass-panel`).forEach(e=>{e.id!==`btnToggleMapKpis`&&e.classList.add(`flex-row`,`items-center`,`justify-between`)});else if(e===`expanded`)t.className=`flex flex-col items-center gap-6 transition-all duration-500 w-full mb-8`,r.className=`w-full h-[75vh] relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10`,n.className=`flex flex-wrap sm:flex-nowrap grid grid-cols-2 sm:flex flex-row gap-2 sm:gap-8 mt-4 sm:mt-6 mx-auto max-w-[95%] sm:max-w-fit bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-white/10 px-4 sm:px-10 py-1.5 sm:py-2 shadow-2xl`,i&&i.classList.add(`hidden`),n.querySelectorAll(`:scope > button, :scope > div.glass-panel`).forEach(e=>{e.id!==`btnToggleMapKpis`&&e.classList.add(`flex-col`,`items-center`,`justify-center`,`min-w-0`,`sm:min-w-[130px]`,`flex-1`,`!border-l-0`,`!border-b-2`,`sm:!border-b-4`,`gap-0.5`,`py-1`,`sm:py-1.5`,`px-2`)});else if(e===`full`){r.className=`map-fullscreen fixed inset-0 z-[var(--z-map-full)] bg-slate-900`,document.body.classList.add(`has-map-fullscreen`),n.className=`flex flex-col-reverse sm:flex-row fixed bottom-40 sm:bottom-6 left-4 sm:left-1/2 sm:-translate-x-1/2 z-[var(--z-map-full-controls)] gap-2 transition-all duration-300 items-start sm:items-center w-auto sm:max-w-fit`;let e=O(`btnToggleMapKpis`);e&&e.classList.remove(`hidden`),i&&i.classList.add(`hidden`),n.querySelectorAll(`:scope > button, :scope > div.glass-panel`).forEach(e=>{if(e.id===`btnToggleMapKpis`)return;e.classList.add(`flex`,`flex-col`,`items-center`,`justify-center`,`min-w-[55px]`,`sm:min-w-[75px]`,`!border-2`,`rounded-xl`,`shadow-lg`,`gap-0`,`p-2`);let t=e.querySelector(`span.uppercase`);t&&t.classList.add(`hidden`),e.classList.add(`kpi-drawer-item`)}),n.classList.add(`kpi-drawer-collapsed`)}[`Normal`,`Expanded`,`Full`].forEach(t=>{let n=O(`btnMapState${t}`);if(n){let r=e===t.toLowerCase();n.classList.toggle(`bg-white/30`,r)}}),window.lucide&&window.lucide.createIcons(),setTimeout(()=>{f.map&&f.map.invalidateSize()},600)}var Bi=o((()=>{w(),A()}));function Vi(e){let{onProcessData:t}=e,n=()=>{ln(),[`filterINE`,`filterSEGEN`].forEach(e=>{O(e)&&O(e).classList.remove(`active`,`bg-brand-emerald`,`bg-brand-purple`,`text-white`,`border-brand-emerald`,`border-brand-purple`)}),f.filterINE=!1,f.filterSEGEN=!1};O(`btnReset`)&&(O(`btnReset`).onclick=n),O(`btnResetOffcanvas`)&&(O(`btnResetOffcanvas`).onclick=n),O(`btnRefresh`)&&O(`btnRefresh`).addEventListener(`click`,()=>{let e=O(`assetSelect`).value;e&&oe(e,t,!0)}),O(`btnRetryConnection`)&&O(`btnRetryConnection`).addEventListener(`click`,()=>ae(t)),O(`assetSelect`)&&O(`assetSelect`).addEventListener(`change`,e=>oe(e.target.value,t)),O(`searchEncuesta`)&&O(`searchEncuesta`).addEventListener(`input`,()=>q()),O(`btnOpenFilters`)&&(O(`btnOpenFilters`).onclick=dn),O(`btnCloseFilters`)&&O(`btnCloseFilters`).addEventListener(`click`,fn),O(`filtersOverlay`)&&O(`filtersOverlay`).addEventListener(`click`,fn),O(`btnApplyFilters`)&&O(`btnApplyFilters`).addEventListener(`click`,()=>{fn(),q()});let r=(e,t,n,r,i)=>{let a=O(e);a&&(a.onclick=()=>{f[t]=!f[t],f[t]&&(f[i]=!1),a.classList.toggle(`active`,f[t]),a.classList.toggle(n,f[t]),a.classList.toggle(`text-white`,f[t]),a.classList.toggle(`border-${n.split(`-`)[1]}-${n.split(`-`)[2]}`,f[t]);let e=O(r);e&&e.classList.remove(`active`,`bg-brand-emerald`,`bg-brand-purple`,`text-white`,`border-brand-emerald`,`border-brand-purple`),q()})};r(`filterINE`,`filterINE`,`bg-brand-emerald`,`filterSEGEN`,`filterSEGEN`),r(`filterSEGEN`,`filterSEGEN`,`bg-brand-purple`,`filterINE`,`filterINE`),[`filterEncuestador`,`filterFechaInicio`,`filterFechaFin`,`filterHoraTransmision`,`filterHoraInicio`].forEach(e=>{O(e)&&O(e).addEventListener(`change`,q)});let i=O(`inputMetaDiaria`);if(i){try{let e=localStorage.getItem(`esca_meta_diaria`);e&&!isNaN(Number(e))&&(i.value=e)}catch{}i.addEventListener(`input`,()=>{try{localStorage.setItem(`esca_meta_diaria`,i.value)}catch{}Pi()})}O(`filterMunicipio`)&&O(`filterMunicipio`).addEventListener(`change`,()=>{let e=O(`filterMunicipio`).value,t=O(`filterParroquia`),n=O(`filterNodo`);if(!t||!n)return;t.innerHTML=`<option value="">Todas</option>`,n.innerHTML=`<option value="">Todos</option>`;let r=new Set,i=new Set;f.rawData.forEach(t=>{t._meta&&(e===``||t._meta.mun===e)&&(t._meta.par&&r.add(t._meta.par),t._meta.nodo&&i.add(t._meta.nodo))}),[...r].sort().forEach(e=>{let n=document.createElement(`option`);n.value=e,n.textContent=e,t.appendChild(n)}),[...i].sort().forEach(e=>{let t=document.createElement(`option`);t.value=e,t.textContent=e,n.appendChild(t)})}),Object.entries({All:`all`,Efectivas:`efectivas`,NoEfectiva:`no_efectiva`,Alertas:`alertas`}).forEach(([e,t])=>{let n=O(`btnMapFilter${e}`);n&&n.addEventListener(`click`,()=>{typeof window.setQuickFilter==`function`&&window.setQuickFilter(t)})}),O(`btnMapStateNormal`)&&O(`btnMapStateNormal`).addEventListener(`click`,()=>zi(`normal`)),O(`btnMapStateExpanded`)&&O(`btnMapStateExpanded`).addEventListener(`click`,()=>zi(`expanded`)),O(`btnMapStateFull`)&&O(`btnMapStateFull`).addEventListener(`click`,()=>zi(`full`)),O(`btnToggleMapKpis`)&&O(`btnToggleMapKpis`).addEventListener(`click`,()=>{let e=O(`mapKpiGrid`);if(e){let t=e.classList.contains(`kpi-drawer-collapsed`);e.classList.toggle(`kpi-drawer-collapsed`,!t),e.classList.toggle(`kpi-drawer-expanded`,t)}}),document.querySelectorAll(`.tab-btn`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault(),Ii(e.dataset.tab)})}),document.querySelectorAll(`.sort-btn`).forEach(t=>{t.addEventListener(`click`,()=>{f.currentSort=t.dataset.sort,document.querySelectorAll(`.sort-btn`).forEach(e=>e.classList.remove(`active`)),t.classList.add(`active`);let{renderRankingTable:n}=e;n&&n()})}),O(`btnDetailExpand`)&&O(`btnDetailExpand`).addEventListener(`click`,()=>{typeof window.toggleDetailModalExpand==`function`&&window.toggleDetailModalExpand()}),O(`btnDetailClose`)&&O(`btnDetailClose`).addEventListener(`click`,()=>{let{closeDetailModal:t}=e;t&&t()}),O(`detailModalBackdrop`)&&O(`detailModalBackdrop`).addEventListener(`click`,()=>{let{closeDetailModal:t}=e;t&&t()}),document.addEventListener(`keydown`,t=>{if(t.key===`Escape`){let t=O(`detailModal`);if(t&&!t.classList.contains(`hidden`)){let{closeDetailModal:t}=e;t&&t()}}})}var Hi=o((()=>{w(),A(),se(),hn(),Bi(),Ri(),Fi()}));s((()=>{w(),A(),se(),an(),hn(),Zn(),pr(),Rn(),Or(),Hr(),si(),Ai(),Ni(),Fi(),Ri(),Bi(),Hi(),console.log(`main/index.js: Modular orchestrator initializing ✓`);function e(){console.log(`main/index.js: renderAll() starting`);try{Pi()}catch(e){console.error(`KPI Update Error:`,e)}[Kr,qr,Jr,Yr,ii,$r,ei,ti,ri,ai].forEach(e=>{try{e()}catch(t){console.warn(`Chart Renderer Error (${e.name}):`,t)}});try{dr()}catch(e){console.error(`Map Render Error:`,e)}try{qn()}catch(e){console.error(`Grid Update Error:`,e)}try{Yn()}catch(e){console.error(`Ranking Table Error:`,e)}try{Er()}catch(e){console.error(`MM111 Error:`,e)}try{Rr()}catch(e){console.error(`Inconsistencias Error:`,e)}window.lucide&&lucide.createIcons()}cn(e);var t=async()=>{await rn(),pn(),f.filtered=[...f.rawData],e()};async function n(){Oi(),ji(),console.log(`main/index.js: init() start`),r(),zi(`normal`),Vi({onProcessData:t,renderRankingTable:Yn,closeDetailModal:Ln}),i(),Promise.allSettled([Qn(),er().then(()=>{f.rawData.length>0&&(console.log(`main/index.js: Refreshing data with catalog index…`),t())}),ae(e=>oe(e,t))]).then(()=>{console.log(`main/index.js: Bootstrap phase completed.`),window.lucide&&lucide.createIcons()})}function r(){let e=O(`currentDateDisplay`);e&&(e.textContent=new Date().toLocaleDateString(`es-ES`,{weekday:`long`,year:`numeric`,month:`long`,day:`numeric`}))}function i(){let e=[];typeof Tabulator>`u`&&e.push(`Tabulator`),typeof Chart>`u`&&e.push(`Chart.js`),typeof L>`u`&&e.push(`Leaflet`);let t=O(`libCheckWarn`);e.length>0?(console.error(`CRITICAL: Missing libraries:`,e.join(`, `)),t&&t.classList.remove(`hidden`)):t&&t.classList.add(`hidden`)}document.addEventListener(`DOMContentLoaded`,()=>{n(),lr()}),window.setMapStateForDebug=zi,window.switchTabForDebug=Ii}))();