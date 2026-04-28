var e=(e,t)=>()=>(e&&(t=e(e=0)),t),t=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})(),t((()=>{window.tailwind&&(tailwind.config={darkMode:`class`,theme:{extend:{fontFamily:{sans:[`Inter`,`sans-serif`],inter:[`Inter`,`sans-serif`],outfit:[`Outfit`,`sans-serif`]},colors:{brand:{blue:`#3B82F6`,emerald:`#10B981`,purple:`#8B5CF6`,orange:`#F59E0B`,red:`#EF4444`},surface:{dark:`#0B1120`}}}}})}))();var n,r=e((()=>{n={rawData:[],filtered:[],encMap:{},assetName:``,charts:{},map:null,markerCluster:null,geoJSONLayer:null,geoJSONData:null,segmentBBoxes:[],detailMiniMapObj:null,controlsData:null,controlsIndex:null,controlsLayer:null,detailTable:null,rankingTabulator:null,mm111Table:null,currentSort:`eficiencia`,currentPage:1,quickFilterMode:`all`,filterINE:!1,filterSEGEN:!1,lastFocused:null}}));function i(e){return e.reduce((e,t)=>e+t,0)/e.length}function a(e){if(!e)return null;try{let t=String(e).trim().split(/\s+/);return t.length<2?null:[parseFloat(t[0]),parseFloat(t[1])]}catch{return null}}function o(e,t,n,r){let i=e=>e*Math.PI/180,a=i(n-e),o=i(r-t),s=Math.sin(a/2)*Math.sin(a/2)+Math.cos(i(e))*Math.cos(i(n))*Math.sin(o/2)*Math.sin(o/2);return 6371e3*2*Math.atan2(Math.sqrt(s),Math.sqrt(1-s))}function s(e,t){let[n,r]=e,i=!1;for(let e=0,a=t.length-1;e<t.length;a=e++){let[o,s]=t[e],[c,l]=t[a];s>n!=l>n&&r<(c-o)*(n-s)/(l-s)+o&&(i=!i)}return i}function c(e){let t=1/0,n=-1/0,r=1/0,i=-1/0;for(let[a,o]of e)o<t&&(t=o),o>n&&(n=o),a<r&&(r=a),a>i&&(i=a);return{minLat:t,maxLat:n,minLng:r,maxLng:i}}function l(e,t){if(!e||!t)return!1;let n=String(e).trim(),r=String(t).trim();return!!(n===r||n.padStart(3,`0`)===r.padStart(3,`0`)||n.endsWith(r)||r.endsWith(n))}var u,d=e((()=>{u=e=>document.getElementById(e)}));function f(e){let t=u(`loadingOverlay`),n=u(`loadingMsg`);t&&(h&&=(clearTimeout(h),null),t.style.display=`flex`,setTimeout(()=>{t.style.opacity=`1`,t.style.pointerEvents=`all`},10),n&&(n.textContent=e))}function p(){let e=u(`loadingOverlay`);e&&(h&&clearTimeout(h),e.style.opacity=`0`,e.style.pointerEvents=`none`,h=setTimeout(()=>{e.style.display=`none`,h=null},500))}function m(e){let t=document.getElementById(`connectionStatus`),n=document.getElementById(`connectionDot`),r=document.getElementById(`connectionPing`);!t||!n||(e?(t.textContent=`Live Connection`,t.classList.remove(`text-amber-500`),t.classList.add(`text-emerald-400`),n.className=`relative inline-flex rounded-full h-2 w-2 bg-brand-emerald`,r&&(r.className=`animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-emerald opacity-75`)):(t.textContent=`Modo Offline - Datos Cacheados`,t.classList.remove(`text-emerald-400`,`text-slate-400`),t.classList.add(`text-amber-500`),n.className=`relative inline-flex rounded-full h-2 w-2 bg-amber-500`,r&&(r.className=`absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-20`)))}var h,g=e((()=>{d(),h=null})),_,v,y,ee=e((()=>{_=`KoboDashboardDB`,v=`cacheStore`,y={async open(){return new Promise((e,t)=>{let n=indexedDB.open(_,1);n.onerror=()=>t(`Error opening DB`),n.onupgradeneeded=e=>{let t=e.target.result;t.objectStoreNames.contains(v)||t.createObjectStore(v)},n.onsuccess=t=>e(t.target.result)})},async get(e){try{let t=await this.open();return new Promise((n,r)=>{let i=t.transaction(v,`readonly`).objectStore(v).get(e);i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)})}catch(e){return console.error(`IndexedDB Get Error:`,e),null}},async set(e,t){try{let n=await this.open();return new Promise((r,i)=>{let a=n.transaction(v,`readwrite`).objectStore(v).put(t,e);a.onsuccess=()=>r(),a.onerror=()=>i(a.error)})}catch(e){console.error(`IndexedDB Set Error:`,e)}}}})),b,x,S,C,w,T,E,D,O,k=e((()=>{b=[`#2563EB`,`#DC2626`,`#16A34A`,`#FACC15`,`#7C3AED`,`#EA580C`,`#06B6D4`,`#DB2777`,`#84CC16`,`#92400E`,`#312E81`,`#FDA4AF`],x=9999999,S=[{code:`APERT_LEJOS`,label:`Apertura Distante`,detail:`El punto donde se abrió el formulario (apertura automática) está a más de
500 m del punto de inicio marcado manualmente. Puede indicar que el
encuestador abrió la encuesta fuera de la vivienda o del segmento asignado.`},{code:`FUERA_SEGMENTO`,label:`Fuera de Cobertura`,detail:`El punto de captura se encuentra a más de 600 m del centro
del segmento asignado. El encuestador pudo haber trabajado en un área que no corresponde
a su segmento.`},{code:`TIEMPO_CORTO`,label:`Velocidad Sospechosa (corto)`,detail:`La encuesta se completó en menos de 15 minutos, por debajo del
tiempo mínimo razonable para una entrevista de calidad. Es probable que los datos se
hayan completado sin realizar las preguntas completas.`},{code:`TIEMPO_LARGO`,label:`Duración Larga`,color:`#EF4444`,detail:`La encuesta superó los 60 minutos. Posible pausa prolongada o error de cierre.`},{code:`SEGMENTO_INCORRECTO`,label:`Segmento Erróneo`,color:`#EF4444`,detail:`La ubicación GPS del levantamiento no coincide con el segmento declarado en la encuesta.`},{code:`TIEMPO_CORTO_EHM`,label:`Rapidez Inusual (EHM)`,detail:`EHM efectiva con una sola persona completada en menos de 10 minutos.
El mínimo razonable para EHM con un solo miembro del hogar es 10 minutos.`},{code:`TIEMPO_CORTO_ESCA`,label:`Rapidez Inusual (ESCA)`,detail:`ESCA efectiva completada en menos de 15 minutos.
El mínimo razonable para ESCA es 15 minutos.`},{code:`ARRANQUE_INCONSISTENTE`,label:`Arranque Incorrecto`,detail:`El número de arranque declarado en el hogar no correlaciona con el número de línea del control. Posible error de captura o salto de registro.`},{code:`LINEA_SERIE_INVALIDA`,label:`Inconsistencia Línea/Serie`,detail:`Uno o más datos (Control, Serie o Línea) no se encuentran definidos en la base de datos oficial del proyecto.`},{code:`CEDULA_INVALIDA`,label:`Cédula Inválida`,detail:`La cédula del encuestador no es numérica o su longitud está fuera del rango permitido (6–9 dígitos).`},{code:`INGRESO_ANOMALO`,label:`Ingreso Anómalo`,detail:`El ingreso declarado por un miembro del hogar está fuera del rango razonable (1 – ${x.toLocaleString(`es-VE`)} Bs.). Posible error de digitación.`},{code:`DESPLAZAMIENTO_ANOMALO`,label:`Desplazamiento Anómalo`,detail:`La distancia entre el punto de captura inicial y el punto de cierre de la encuesta supera los 30 metros. El encuestador pudo haberse movido durante la encuesta.`,color:`#F59E0B`}],C={condicion:{ocupada_con_ocupantes_presentes:`OCUPADA CON OCUPANTES PRESENTES`,ocupadas_con_ocupantes_ausentes:`OCUPADA CON OCUPANTES AUSENTES`,desocupada:`DESOCUPADO`,"N/A":`N/A`},uso:{residencial:`RESIDENCIAL`,construcci_n:`CONSTRUCCIÓN`,comercio:`COMERCIO`,mixto:`MIXTO`,agr_cola:`AGRÍCOLA`,transporte:`TRANSPORTE`,religioso:`RELIGIOSO`,servicio_social_comunal:`SERVICIO`,creativo_cultural_deportivo:`CREATIVO O CULTURAL`,"N/A":`N/A`}},w=Object.fromEntries(S.map(e=>[e.code,e])),T=[`12151751`,`13293815`,`13476080`,`17695927`,`22719373`,`29879307`,`28474258`].map(e=>e.trim()),E=new Set(T),D={RESIDENCIAL:{color:`#2563EB`,badge:`bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50`},COMERCIO:{color:`#FACC15`,badge:`bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800/50`},COMERCIAL:{color:`#FACC15`,badge:`bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800/50`},MIXTO:{color:`#16A34A`,badge:`bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800/50`},CONSTRUCCI:{color:`#DC2626`,badge:`bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800/50`},RELIGIOSO:{color:`#7C3AED`,badge:`bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border border-purple-200 dark:border-purple-800/50`},CREATIVO:{color:`#DB2777`,badge:`bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400 border border-pink-200 dark:border-pink-800/50`},CULTURAL:{color:`#DB2777`,badge:`bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400 border border-pink-200 dark:border-pink-800/50`},SERVICIO:{color:`#F97316`,badge:`bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border border-orange-200 dark:border-orange-800/50`},AGRÍCOLA:{color:`#84CC16`,badge:`bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-400 border border-lime-200 dark:border-lime-800/50`},TRANSPORTE:{color:`#06B6D4`,badge:`bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800/50`},DEFAULT:{color:`#94A3B8`,badge:`bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400`}},O={"TIPO A":{color:`#8B5CF6`,badge:`bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border border-purple-200 dark:border-purple-800/50`},"TIPO B":{color:`#F59E0B`,badge:`bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border border-orange-200 dark:border-orange-800/50`},"TIPO C":{color:`#DC2626`,badge:`bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800/50`},"TIPO E":{color:`#10B981`,badge:`bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50`},"NO DEFINIDO":{color:`#94A3B8`,badge:`bg-slate-100 text-slate-500 dark:bg-slate-800/50 dark:text-slate-400`},PRESENTES:{color:`#2563EB`,badge:`bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50`},AUSENTES:{color:`#FACC15`,badge:`bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 border border-amber-100 dark:border-amber-800/50`},DESOCUPAD:{color:`#DC2626`,badge:`bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 border border-red-100 dark:border-red-800/50`},RECHAZO:{color:`#FACC15`,badge:`bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 border border-amber-100 dark:border-amber-800/50`},NADIE:{color:`#FACC15`,badge:`bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 border border-amber-100 dark:border-amber-800/50`},DEFAULT:{color:`#94A3B8`,badge:`bg-slate-100 text-slate-500 dark:bg-slate-800/50 dark:text-slate-400 border border-slate-200 dark:border-slate-700`}}}));async function A(){let e=await fetch(`/api/assets`);if(!e.ok)throw Error(`Error API (${e.status}) at fetchAssets`);return await e.json()}async function j(e){if(!e)throw Error(`Missing UID in fetchSurveyData`);let t=`/api/data/${e}`,n=await fetch(t);if(!n.ok)throw Error(`Error API (${n.status}) at fetchSurveyData`);return await n.json()}var M=e((()=>{k()}));async function N(e){console.log(`api.js: Orchestrating loadAssets()...`),f(`Buscando formularios en KoboToolbox…`);let t=null;try{t=await A(),await y.set(`assets_cache`,t),m(!0)}catch(e){console.warn(`Network failure. Trying cache...`,e),t=await y.get(`assets_cache`),t&&m(!1)}if(!t){p(),u(`errorState`)&&(u(`errorState`).style.display=`flex`);let e=u(`statusBadge`);e&&(e.textContent=`Error de conexión`,e.classList.remove(`active`)),m(!1);return}let r=u(`assetSelect`);r&&(r.innerHTML=`<option value="">— Seleccionar encuesta —</option>`,t.forEach(e=>{let t=document.createElement(`option`);t.value=e.uid,t.textContent=e.name,r.appendChild(t)}),r.addEventListener(`change`,()=>{let e=r.options[r.selectedIndex];n.assetName=e?e.textContent.trim():``}));let i=u(`statusBadge`);i&&(i.textContent=`Formularios Listos`),window.lucide&&lucide.createIcons();let a=t.find(e=>e.name.toLowerCase().includes(`esca`)&&e.name.toLowerCase().includes(`v3`));a?(r&&(r.value=a.uid),n.assetName=a.name,e&&e(a.uid)):p()}async function P(e,t){if(!e)return;f(`Descargando datos desde Kobo API…`);let r=u(`btnRefresh`);r&&(r.disabled=!0);let i=null,a=!1;try{i=await j(e),await y.set(`data_cache_${e}`,i),m(!0)}catch(t){console.warn(`Network failure. Trying cache...`,t),i=await y.get(`data_cache_${e}`),i&&(a=!0,m(!1))}if(!i){alert(`Error: No se pudieron descargar los datos y no hay caché disponible.`),p(),r&&(r.disabled=!1);return}n.rawData=i.results||(Array.isArray(i)?i:[]),console.log(`api.js: Loaded ${n.rawData.length} records ${a?`(Offline Cache)`:``}`);let o=u(`statusBadge`);o&&(o.textContent=`${n.rawData.length} registros`),u(`errorState`)&&u(`errorState`).classList.add(`hidden`),u(`mainContent`)&&u(`mainContent`).classList.remove(`hidden`),f(`Renderizando dashboard...`),requestAnimationFrame(()=>{setTimeout(()=>{t&&t(),window.lucide&&lucide.createIcons(),requestAnimationFrame(()=>{setTimeout(()=>{p(),r&&(r.disabled=!1)},800)})},100)})}var te=e((()=>{r(),d(),g(),ee(),M(),window.loadAssets=()=>N(e=>P(e,window.__onProcessData))}));function ne(e){let t=String(e[`S0/cedula_encuestador`]||`N/A`).trim(),r=String(e[`S0/s0_nombreapellido`]||`Desconocido`).trim(),i=e.start||``,a=e.end||``,o=e[`ubicacion_final/hora_fin`]||e[`ubicacion_final/hora_f`]||e.hora_f;o&&(a=!o.includes(`T`)&&i.includes(`T`)?i.split(`T`)[0]+`T`+o:o,e.end=a);let s=(e.today||e._submission_time||``).slice(0,10),c=(n.assetName||``).toUpperCase().includes(`EHM`)?`EHM`:`ESCA`,l=null;if(i)try{l=new Date(i).getHours()}catch{}let u=null;if(e._submission_time)try{u=new Date(e._submission_time).getHours()}catch{}let d=e=>{if(!e||typeof e!=`string`)return null;let t=e.trim().split(` `);return t.length>=4?parseFloat(t[3]):null};return{cedula:t,nombre:r,start:i,end:a,fecha:s,hora:l,hora_trans:u,formType:c,start_precision:d(e[`start-geopoint`]||e.start_geopoint),end_precision:d(e[`group_sh53u78/ubicacion_i`]||e[`end-geopoint`]),mun:e[`S1/mun`]||`N/A`,par:e[`S1/par`]||`N/A`,nodo:e[`S1/nodo`]||`N/A`,semana:e[`group_sh53u78/semana`]||``,uso:e[`S1/Uso_de_la_Unidad_inmobiliaria`]||`N/A`,condicion:e[`Condici_n_de_ocupaci_n/condicion_de_ocupacion`]||`N/A`,control:e[`group_sh53u78/control`]||e._uuid||``,lote:e[`group_sh53u78/lote`]||``,situacion_vivienda:e[`Condici_n_de_ocupaci_n/situacion_vivienda`]||``,segmento:e[`S1/segmento`]||e[`S1/group_segmeto_sector/segmento`]||e[`group_segmeto_sector/segmento`]||``,sector:e[`S1/sector`]||e[`S1/group_segmeto_sector/sector`]||e[`group_segmeto_sector/sector`]||``,manzana:e[`S1/manzana`]||``,parcela:e[`S1/parcela`]||``,edificacion:e[`S1/Edificaci_n`]||e[`S1/edificacion`]||``,lado_manz:e[`S1/lado_manz`]||``,n_linea:e[`group_sh53u78/n_linea`]||``,n_serie:e[`group_sh53u78/n_serie`]||``,direccion:e[`S1/P_nomsect`]||e[`S1/direccion`]||``,nota:e[`ubicacion_final/nota`]||``}}function re(e,t){if(!e||!t)return null;try{let n=new Date(e),r=new Date(t),i=Math.round((r-n)/6e4*10)/10;return i>=0&&i<=600?i:null}catch{return null}}var ie=e((()=>{r()}));function ae(e,t){let n=0,r=0,i=0,a=[];return t===`EHM`?(a=Array.isArray(e.lista_hogar)?e.lista_hogar:[],a.forEach(e=>{let t=Array.isArray(e[`lista_hogar/lista_miembros`])?e[`lista_hogar/lista_miembros`]:[];if(t.length>0)n+=t.length;else{let t=parseInt(e[`lista_hogar/personas_hogar`]||e[`lista_hogar/lista_miembros_count`]||`0`,10);isNaN(t)||(n+=t)}t.forEach(e=>{let{hCount:t,mCount:n}=oe(e);r+=t,i+=n})})):(a=Array.isArray(e[`datos_hogar/hogar`])?e[`datos_hogar/hogar`]:[],a.forEach(e=>{let t=Array.isArray(e[`datos_hogar/hogar/integrantes_hogar`])?e[`datos_hogar/hogar/integrantes_hogar`]:[];n+=t.length,t.forEach(e=>{let{hCount:t,mCount:n}=oe(e);r+=t,i+=n})})),{totalPers:n,totalHombres:r,totalMujeres:i,hogaresCount:a.length,hogaresRaw:a}}function oe(e){let t=0,n=0,r=Object.keys(e).find(e=>e.endsWith(`/sexo`)||e.endsWith(`:sexo`)||e===`sexo`);if(r){let i=String(e[r]).trim().toLowerCase();[`1`,`sexo1`,`v`,`m`,`masculino`,`hombre`].includes(i)&&(t=1),[`2`,`sexo2`,`h`,`f`,`femenino`,`mujer`].includes(i)&&(n=1)}return{hCount:t,mCount:n}}var se=e((()=>{}));function ce(e){let t=a(e[`ubicacion_final/ubicacion_f`]||e.ubicacion_f),n=a(e[`group_sh53u78/ubicacion_i`]||e.ubicacion_i),r=null,i=null;if(n&&n[0])r=n[0],i=n[1];else if(t&&t[0])r=t[0],i=t[1];else if(e._geolocation&&e._geolocation.length>=2)r=e._geolocation[0],i=e._geolocation[1];else if(e[`S1/ubicacion`]){let t=e[`S1/ubicacion`].split(` `);t.length>=2&&(r=parseFloat(t[0]),i=parseFloat(t[1]))}return{lat:r,lng:i,ptIni:n,ptFin:t}}function le(e,t,n){let r=null,i=null;try{let s=e[`start-geopoint`]||e.start_geopoint,c=e[`group_sh53u78/ubicacion_i`]||e[`end-geopoint`]||e.end_geopoint,l=a(s)||(e._geolocation?.length>=2?[e._geolocation[0],e._geolocation[1]]:null),u=a(c)||(e._geolocation?.length>=2?[e._geolocation[0],e._geolocation[1]]:null);l&&u&&(r=o(l[0],l[1],u[0],u[1])),t&&n&&t[0]&&n[0]&&(i=o(t[0],t[1],n[0],n[1]))}catch{}return{distance_m:r,dist_ini_fin:i}}function ue(e,t,r){if(e===null||t===null||n.segmentBBoxes.length===0)return null;let i=null;for(let r of n.segmentBBoxes){let n=r.bbox;if(e>=n.minLat&&e<=n.maxLat&&t>=n.minLng&&t<=n.maxLng){let n=r.feature.geometry,a=!1;if(n.type===`Polygon`)s([e,t],n.coordinates[0])&&(a=!0);else if(n.type===`MultiPolygon`){for(let r of n.coordinates)if(s([e,t],r[0])){a=!0;break}}if(a){i=r.props.cod_seg===`000`||r.props.cod_seg===`0`?r.props.cod_sc:r.props.cod_seg;break}}}if(!i){let i=.0015;for(let a of n.segmentBBoxes){let n=a.props.cod_seg===`000`||a.props.cod_seg===`0`?a.props.cod_sc:a.props.cod_seg;if(l(r,n)){let r=a.bbox;if(e>=r.minLat-i&&e<=r.maxLat+i&&t>=r.minLng-i&&t<=r.maxLng+i)return n}}}return i}var de=e((()=>{r(),d()}));function fe(e){let{r:t,normalized:n,durMin:r,totalPers:i,distance_m:s,dist_ini_fin:c,actualSeg:u,ptIni:d,isCompletada:f,hogaresRaw:p}=e,m=[];try{let e=a(t[`start-geopoint`]||t.start_geopoint)||(t._geolocation?.length>=2?[t._geolocation[0],t._geolocation[1]]:null);e&&d&&d[0]&&o(e[0],e[1],d[0],d[1])>500&&m.push(`APERT_LEJOS`)}catch{}s!==null&&s>600&&m.push(`FUERA_SEGMENTO`),c!==null&&c>30&&m.push(`DESPLAZAMIENTO_ANOMALO`),f&&r!==null&&(n.formType===`EHM`&&i===1&&r<10?m.push(`TIEMPO_CORTO_EHM`):n.formType!==`EHM`&&r<15?m.push(`TIEMPO_CORTO_ESCA`):r<15&&m.push(`TIEMPO_CORTO`)),f&&r!==null&&r>45&&m.push(`TIEMPO_LARGO`);let h=n.cedula.replace(/\D/g,``);(h.length<6||h.length>9)&&m.push(`CEDULA_INVALIDA`),p.forEach(e=>{(Array.isArray(e[`datos_hogar/hogar/integrantes_hogar`])?e[`datos_hogar/hogar/integrantes_hogar`]:[]).forEach(e=>{let t=e[`datos_hogar/hogar/integrantes_hogar/integrantes/cuanto_actividad`];if(t!=null&&t!==``){let e=Number(t);!isNaN(e)&&(e<1||e>9999999)&&(m.includes(`INGRESO_ANOMALO`)||m.push(`INGRESO_ANOMALO`))}})}),p.forEach(e=>{let t=e[`datos_hogar/hogar/productos_22/arranque`]||``,n=e[`datos_hogar/hogar/productos_22/productos`],r=Array.isArray(n)&&n.length>0;f&&r&&!t&&(m.includes(`ARRANQUE_INCONSISTENTE`)||m.push(`ARRANQUE_INCONSISTENTE`))});let g=n.segmento===`000`||n.segmento===`0`?n.sector:n.segmento;return(u&&!l(g,u)||!u&&n.lat!==null)&&m.push(`SEGMENTO_INCORRECTO`),m}var pe=e((()=>{d(),k()}));function me(){n.encMap={},n.rawData.forEach(e=>{if(!e._meta)return;let{cedula:t,nombre:r,estado:i,durMin:a,totalPers:o,mun:s,condicion:c,semana:l,control:u}=e._meta;n.encMap[t]||(n.encMap[t]={cedula:t,nombre:r,encuestas:0,completadas:0,duraciones:[],personas:0,municipios:new Set,condiciones:{},semanas:{}});let d=n.encMap[t];d.encuestas++,i===`completada`&&d.completadas++,a!==null&&d.duraciones.push(a),d.personas+=o||0,d.municipios.add(s),d.condiciones[c]=(d.condiciones[c]||0)+1,l&&(d.semanas[l]||(d.semanas[l]=new Set),u&&d.semanas[l].add(u))}),Object.values(n.encMap).forEach(e=>{e.avgDur=e.duraciones.length?i(e.duraciones):0,e.pctCompleta=e.encuestas>0?Math.round(e.completadas/e.encuestas*100):0,e.score=e.pctCompleta;let t=Object.values(e.semanas||{});e.avgControlesSemana=t.length?Math.round(t.reduce((e,t)=>e+t.size,0)/t.length):0,e.totalSemanas=t.length})}var he=e((()=>{r(),d()}));function F(e){return e?String(e).toLowerCase().normalize(`NFD`).replace(/[\u0300-\u036f]/g,``).replace(/[^a-z0-9]/g,``).trim():``}function ge(e){let t=F(e);return t?_e.has(t)?`TIPO A`:ve.has(t)?`TIPO B`:ye.has(t)?`TIPO C`:be.has(t)?`TIPO E`:`NO DEFINIDO`:`NO DEFINIDO`}var _e,ve,ye,be,xe=e((()=>{_e=new Set([`AUSENTE TEMPORALMENTE`,`AUSENTETEMPORALMENTE`,`ausente_temporalmente`,`NADIE EN LA VIVIENDA AL MOMENTO DE LA ENTREVISTA`,`nadie_en_vivienda`,`REHUSO LA ENTREVISTA`,`REHUSÓ LA ENTREVISTA`,`REHUSOLAENTREVISTA`,`rehuso_entrevista`,`OCUPANTES AUSENTES`,`OCUPANTES_AUSENTES`,`INFORMANTE NO CALIFICADO`,`INFORMANTE_NO_CALIFICADO`,`INCOMPLETA`,`PENDIENTE`,`NO ATIENDE TELEFONO`,`RECHAZO`,`SIN ENTREVISTA`,`RECHAZADA`,`OTRO_AUSENTES`].map(e=>F(e))),ve=new Set([`CONSTRUCCION`,`EN CONSTRUCCION`,`en_construccion`,`INADECUADA PARA EL USO`,`inadecuada_el_uso`,`CONSTRUYENDOSE`,`CONSTRUYÉNDOSE`,`VIVIENDA DESOCUPADA`,`VIVIENDA OCASIONAL`,`USO VACACIONAL`,`uso_vacacional`,`USO_VACACIONAL`,`TEMPORALMENTE EN NEGOCIO`,`temporalmente_en_negocio`,`DESOCUPADA EN ESTADO REGULAR`,`desocupada_estado_regular`,`VIVIENDA_DESOCUPADA`,`OTRO_DESOCUPADA`].map(e=>F(e))),ye=new Set([`DEMOLIDA`,`demolida`,`OTRO (ESPECIFIQUE)`,`MAL LISTADA`,`NO EXISTE`,`SIN LISTAR`,`NO RESIDENCIAL`,`NO RESIENDECIAL`,`OTRO`,`NO EXISTE NRO TELEFONICO`,`NEGOCIO PERMANENTE`,`OTRA SITUACION`,`CONSOLIDADA`,`NEGOCIO O ALMACEN PERMANENTE`,`negocio_almacen_permanente`].map(e=>F(e))),be=new Set([`OCUPADA CON OCUPANTES PRESENTES`,`ocupada_con_ocupantes_presentes`,`TOTALMENTE ENCUESTADA`].map(e=>F(e)))}));function Se(){console.log(`dataProcessor: Processing raw data pipeline...`),n.rawData.forEach(e=>{let t=ne(e),n=re(t.start,t.end),{totalPers:r,totalHombres:i,totalMujeres:a,hogaresCount:o,hogaresRaw:s}=ae(e,t.formType),{lat:c,lng:l,ptIni:u,ptFin:d}=ce(e),{distance_m:f,dist_ini_fin:p}=le(e,u,d),m=ue(c,l,t.segmento===`000`||t.segmento===`0`?t.sector:t.segmento),h=0;Array.isArray(s)&&s.forEach(e=>{let t=(Array.isArray(e[`lista_hogar/lista_miembros`])?e[`lista_hogar/lista_miembros`]:Array.isArray(e[`datos_hogar/hogar/integrantes_hogar`])?e[`datos_hogar/hogar/integrantes_hogar`]:[]).length;if(t===0){let n=parseInt(e[`lista_hogar/personas_hogar`]||e[`lista_hogar/lista_miembros_count`]||`0`,10);isNaN(n)||(t=n)}t===1&&h++});let g=/totalment/i.test(t.nota),_=ge(t.situacion_vivienda||t.condicion);e._meta={...t,durMin:n,totalPers:r,totalHombres:i,totalMujeres:a,hogares:o,hogaresUniPersonales:h,lat:c,lng:l,distance_m:f,dist_ini_fin:p,actual_seg:m,estado:g?`completada`:`no_efectiva`,tipo_vivienda:_,flag_distance_gt_500:f!==null&&f>500,flag_short_duration:n!==null&&n<10},e._meta.alertas=fe({r:e,normalized:t,durMin:n,totalPers:r,distance_m:f,dist_ini_fin:p,actualSeg:m,ptIni:u,isCompletada:g,hogaresRaw:s}),e._meta.hasAlerts=e._meta.alertas.length>0}),Ce(),me(),console.log(`dataProcessor: Pipeline completed ✓`)}function Ce(){n.controlsIndex instanceof Map&&n.controlsIndex.size>0&&n.rawData.forEach(e=>{if(!e._meta)return;let t=e._meta.control?e._meta.control.slice(-4):``,r=String(parseInt(e._meta.n_serie,10)||0),i=String(parseInt(e._meta.n_linea,10)||0),a=n.validControls.has(t),o=n.validSeries.has(r),s=n.validLineas.has(i);if(e._meta._ls_ctrl_ok=a,e._meta._ls_serie_ok=o,e._meta._ls_linea_ok=s,!a||!o||!s){e._meta.alertas.includes(`LINEA_SERIE_INVALIDA`)||(e._meta.alertas.push(`LINEA_SERIE_INVALIDA`),e._meta.hasAlerts=!0);let t=[];a||t.push(`Control`),o||t.push(`Serie`),s||t.push(`Línea`),e._meta._ls_key_reported=`${t.join(`, `)} no definido(s) en base de datos`}})}var we=e((()=>{r(),ie(),se(),de(),pe(),he(),xe()}));function Te(){let e=u(`activeFiltersContainer`),t=u(`activeFiltersBadge`);if(!e||!t)return;let n=[{id:`filterMunicipio`,label:`Mpio`},{id:`filterParroquia`,label:`Parr`},{id:`filterNodo`,label:`Nodo`},{id:`filterEstado`,label:`Estado`},{id:`filterCondicion`,label:`Condición`},{id:`filterSituacionVivienda`,label:`Sit. Viv`},{id:`filterUso`,label:`Uso`},{id:`filterSemana`,label:`Sem`},{id:`filterControl`,label:`Control`},{id:`filterAlerta`,label:`Alerta`},{id:`filterClasificacion`,label:`Clasif`}],r=0;e.innerHTML=``,n.forEach(t=>{let n=u(t.id);if(n&&n.value){r++;let i=n.options[n.selectedIndex].text,a=document.createElement(`button`);a.className=`group flex items-center gap-2 px-3 py-1.5 bg-brand-blue/10 hover:bg-brand-red/10 border border-brand-blue/30 hover:border-brand-red/30 text-brand-blue hover:text-brand-red rounded-lg text-[10px] font-bold transition-all`,a.innerHTML=`
                <span class="opacity-70">${t.label}:</span> 
                <span>${i}</span> 
                <i data-lucide="x" class="w-3 h-3 group-hover:scale-110 transition-transform"></i>
            `,a.addEventListener(`click`,()=>{n.value=``,t.id===`filterMunicipio`&&n.dispatchEvent(new Event(`change`)),I()}),e.appendChild(a)}}),r>0?(t.textContent=r,t.classList.remove(`hidden`),e.classList.remove(`hidden`)):(t.classList.add(`hidden`),t.textContent=`0`,e.classList.add(`hidden`)),window.lucide&&lucide.createIcons()}var Ee=e((()=>{d(),ke()}));function De(e){R=e}function I(){let e=u(`searchEncuesta`)?.value.toLowerCase()??``,t=u(`filterEncuestador`)?.value??``,r=u(`filterFechaInicio`)?.value??``,i=u(`filterFechaFin`)?.value??``,a=u(`filterSemana`)?.value??``,o=u(`filterControl`)?.value??``,s=u(`filterMunicipio`)?.value??``,c=u(`filterParroquia`)?.value??``,l=u(`filterNodo`)?.value??``,d=u(`filterEstado`)?.value??``,f=u(`filterSituacionVivienda`)?.value??``,p=u(`filterCondicion`)?.value??``,m=u(`filterUso`)?.value??``,h=u(`filterAlerta`)?.value??``,g=u(`filterHoraTransmision`)?.value??``,_=u(`filterHoraInicio`)?.value??``,v=u(`filterClasificacion`)?.value??``;n.filtered=n.rawData.filter(u=>{let y=u._meta;return!(!y||e&&!(y.nombre.toLowerCase().includes(e)||y.cedula.includes(e)||y.control.includes(e))||t&&y.cedula!==t||n.filterINE&&!E.has(String(y.cedula).trim())||n.filterSEGEN&&E.has(String(y.cedula).trim())||r&&y.fecha<r||i&&y.fecha>i||a&&y.semana!==a||o&&y.control!==o||s&&y.mun!==s||c&&y.par!==c||l&&y.nodo!==l||d===`completada`&&y.estado!==`completada`||d===`no_efectiva`&&y.estado===`completada`||n.quickFilterMode===`efectivas`&&y.estado!==`completada`||n.quickFilterMode===`no_efectiva`&&y.estado===`completada`||n.quickFilterMode===`alertas`&&!y.hasAlerts||f&&y.situacion_vivienda!==f||p&&y.condicion!==p||m&&y.uso!==m||h&&!y.alertas.includes(h)||g!==``&&String(y.hora_trans)!==g||_!==``&&String(y.hora)!==_||v&&y.tipo_vivienda!==v)}),Te(),typeof R==`function`&&R(),document.dispatchEvent(new CustomEvent(`filtersApplied`))}function Oe(){[`filterEncuestador`,`filterFechaInicio`,`filterFechaFin`,`filterSemana`,`filterControl`,`filterMunicipio`,`filterParroquia`,`filterNodo`,`filterEstado`,`filterCondicion`,`filterSituacionVivienda`,`filterUso`,`filterAlerta`,`filterHoraTransmision`,`filterHoraInicio`,`filterClasificacion`,`searchEncuesta`,`mm111SearchControl`].forEach(e=>{let t=u(e);t&&(t.value=``)}),u(`filterMunicipio`)&&u(`filterMunicipio`).dispatchEvent(new Event(`change`)),n.filtered=[...n.rawData],Te(),typeof R==`function`&&R()}var R,ke=e((()=>{r(),d(),k(),Ee(),R=()=>{}}));function Ae(){let e=u(`offCanvasFilters`),t=u(`filtersOverlay`);!e||!t||(e.classList.remove(`translate-x-full`),t.classList.remove(`hidden`),setTimeout(()=>t.classList.remove(`opacity-0`),10))}function je(){let e=u(`offCanvasFilters`),t=u(`filtersOverlay`);!e||!t||(e.classList.add(`translate-x-full`),t.classList.add(`opacity-0`),setTimeout(()=>t.classList.add(`hidden`),300))}function Me(){let e={enc:u(`filterEncuestador`),mun:u(`filterMunicipio`),con:u(`filterCondicion`),sit:u(`filterSituacionVivienda`),uso:u(`filterUso`),sem:u(`filterSemana`),ctrl:u(`filterControl`),par:u(`filterParroquia`),nodo:u(`filterNodo`),alerta:u(`filterAlerta`),htrans:u(`filterHoraTransmision`),hinicio:u(`filterHoraInicio`)};Object.values(e).forEach(e=>{if(e){let t=`Todos`;e.id===`filterAlerta`?t=`Todas las alertas`:e.id===`filterHoraTransmision`||e.id===`filterHoraInicio`?t=`Cualquier hora`:(e.id.includes(`Condicion`)||e.id.includes(`Semana`)||e.id.includes(`Parroquia`))&&(t=`Todas`),e.innerHTML=`<option value="">${t}</option>`}}),e.alerta&&S.forEach(t=>{let n=document.createElement(`option`);n.value=t.code,n.textContent=t.label,e.alerta.appendChild(n)});let t={muns:new Set,sitVs:new Set,cons:new Set,usos:new Set,semanas:new Set,controles:new Set,pars:new Set,nodos:new Set,hTrans:new Set,hInicio:new Set};e.enc&&Object.values(n.encMap).sort((e,t)=>e.nombre.localeCompare(t.nombre)).forEach(t=>{let n=E.has(String(t.cedula).trim()),r=document.createElement(`option`);r.value=t.cedula,r.textContent=`${t.nombre} (${t.cedula})${n?` [INE]`:` [SEGEN]`}`,r.style.color=n?`#10B981`:`#8B5CF6`,r.style.fontWeight=`bold`,e.enc.appendChild(r)}),n.rawData.forEach(e=>{let n=e._meta;n&&(n.mun&&n.mun!==`N/A`&&t.muns.add(n.mun),n.situacion_vivienda&&t.sitVs.add(n.situacion_vivienda),n.condicion&&n.condicion!==`N/A`&&t.cons.add(n.condicion),n.uso&&n.uso!==`N/A`&&t.usos.add(n.uso),n.semana&&t.semanas.add(n.semana),n.control&&t.controles.add(n.control),n.par&&n.par!==`N/A`&&t.pars.add(n.par),n.nodo&&n.nodo!==`N/A`&&t.nodos.add(n.nodo),n.hora_trans!==void 0&&n.hora_trans!==null&&t.hTrans.add(n.hora_trans),n.hora!==void 0&&n.hora!==null&&t.hInicio.add(n.hora))});let r=(e,t,n)=>{e&&[...t].sort().forEach(t=>{let r=document.createElement(`option`);r.value=t,r.textContent=n?n(t):t,e.appendChild(r)})};r(e.mun,t.muns),r(e.par,t.pars),r(e.nodo,t.nodos),r(e.sem,t.semanas),r(e.ctrl,t.controles),r(e.sit,t.sitVs,e=>e.replace(/_/g,` `).toUpperCase()),r(e.con,t.cons,e=>e.replace(/_/g,` `).toUpperCase()),r(e.uso,t.usos,e=>e.replace(/_/g,` `).toUpperCase()),r(e.htrans,t.hTrans,e=>`${e}:00`),r(e.hinicio,t.hInicio,e=>`${e}:00`),e.mun&&e.mun.dispatchEvent(new Event(`change`))}var Ne=e((()=>{r(),d(),k()})),z=e((()=>{ke(),Ne(),Ee()})),B,V,H,Pe,Fe,U,Ie=e((()=>{B=(e,t)=>{if(!e)return null;if(e._meta&&e._meta[t]!==void 0&&e._meta[t]!==null)return e._meta[t];if(e[t]!==void 0&&e[t]!==null)return e[t];let n=String(t).split(`/`).map(e=>e.trim());for(let t of n)if(!(!t||t.includes(` `))&&e[t]!==void 0&&e[t]!==null)return e[t];return null},V=e=>e==null||e===``?`<span class="text-slate-500 font-medium italic">(No Registrado)</span>`:typeof e==`object`?`<pre class="text-[10px] bg-slate-950/20 p-2 rounded overflow-x-auto">${JSON.stringify(e,null,2)}</pre>`:`<span class="font-outfit font-bold text-slate-800 dark:text-slate-200 text-sm">${String(e)}</span>`,H=e=>{if(!e||typeof e!=`string`)return null;let t=e.trim().split(` `);return t.length>=2?{lat:parseFloat(t[0]),lng:parseFloat(t[1]),alt:t[2]?parseFloat(t[2]):null,acc:t[3]?parseFloat(t[3]):null}:null},Pe=(e,t)=>{if(!e||!t)return null;let n=e=>e*Math.PI/180,r=n(t.lat-e.lat),i=n(t.lng-e.lng),a=Math.sin(r/2)**2+Math.cos(n(e.lat))*Math.cos(n(t.lat))*Math.sin(i/2)**2;return 6371e3*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a))},Fe=(e,t)=>String(parseInt(e,10)||0).padStart(t,`0`),U=(e,t,n)=>`${String(e||``).trim().slice(-4)}-${String(parseInt(t,10)||0)}-${String(parseInt(n,10)||0)}`}));function Le(e){let{stEntidad:t,stMpio:n,stParr:r,valHeader:i,valLeftLabel:a,valLeftVal:o,segmentMatchStatus:s,actualSegClasses:c,actualSegText:l,actualSeg:u,stSect:d,stNodo:f,stEncuestador:p,stCedula:m,stFecha:h,stEstado:g,stDur:_,stControl:v,stLinea:y,stSerie:ee,ctrlPanelHtml:b,stHogares:x,stPers:S,stCond:C,stUso:w,stDist:T,hasAlerts:E,alertsHtml:D,hasMapData:O,isFlagged:k,walkedDistance:A,rawDist:j,durMin:M,declaredSeg:N,alertas:P}=e,te=O?`
        <div class="bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/50 overflow-hidden mt-4">
            <div class="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <div class="flex items-center gap-3">
                    <h4 class="text-[10px] uppercase font-black text-brand-orange tracking-widest flex items-center gap-2 m-0">Verificación Geográfica Histórica</h4>
                    ${k?`<span class="px-2 py-0.5 rounded text-[9px] uppercase font-bold tracking-widest bg-brand-red/20 text-brand-red border border-brand-red/30">Desviación Detectada</span>`:``}
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
                        <div class="flex justify-between items-center mb-1 mt-2 md:mt-0"><span class="text-[10px] text-slate-500 font-bold">Seg. Declarado:</span><span class="text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300">#${N||`N/A`}</span></div>
                        <div class="flex justify-between items-center mb-2 border-b border-slate-100 dark:border-slate-700/50 pb-2"><span class="text-[10px] text-slate-500 font-bold">Seg. en Mapa:</span><span class="text-[10px] font-mono font-bold ${P.includes(`SEGMENTO_INCORRECTO`)||P.includes(`FUERA_SEGMENTO`)?`text-brand-red`:`text-brand-emerald`}">${u?`#`+u:`(Nulo)`}</span></div>
                        <div class="flex justify-between items-center mb-1"><span class="text-[10px] text-slate-500 font-bold">Desplazamiento:</span><span class="text-[10px] font-mono font-bold ${P.includes(`DESPLAZAMIENTO_ANOMALO`)?`text-brand-orange`:`text-slate-700 dark:text-slate-300`}">${A===null?`N/A`:Math.round(A)+`m`}</span></div>
                        <div class="flex justify-between items-center mb-1"><span class="text-[10px] text-slate-500 font-bold">Dist. Centro:</span><span class="text-[10px] font-mono font-bold ${k?`text-brand-red`:`text-brand-emerald`}">${j===null?`N/A`:Math.round(j)+`m`}</span></div>
                        <div class="flex justify-between items-center"><span class="text-[10px] text-slate-500 font-bold">Tiempo Base:</span><span class="text-[10px] font-mono text-brand-blue font-bold">${M?M+` min`:`N/A`}</span></div>
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
                        <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Nro. Serie</div>${ee}</div>
                    </div>
                </div>
            </div>

            ${b}

            <div class="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-5 border border-slate-200 dark:border-slate-700/50">
                <h4 class="text-[10px] uppercase font-black text-brand-emerald tracking-widest flex items-center gap-2 mb-4">Resultados / Tipología</h4>
                <div class="space-y-3">
                    <div class="grid grid-cols-2 gap-2 pb-2 border-b border-slate-200 dark:border-slate-700">
                        <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Nro. Hogares</div>${x}</div>
                        <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Nro. Personas</div>${S}</div>
                    </div>
                    <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Condición de Ocupación</div>${C}</div>
                    <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Uso Estructural</div>${w}</div>
                    <div class="pt-2 border-t border-slate-200 dark:border-slate-700">
                        <div class="text-[10px] text-slate-500 font-bold uppercase mb-1">Distancia calc. al segmento</div>
                        ${T}
                    </div>
                    <div class="pt-2 border-t border-slate-200 dark:border-slate-700">
                        <div class="flex items-center gap-1.5 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${E?`#EF4444`:`#10B981`}" stroke-width="2.5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                            <span class="text-[10px] text-slate-500 font-bold uppercase">${E?`Alertas (${P.length})`:`Sin Alertas`}</span>
                        </div>
                        ${D}
                    </div>
                </div>
            </div>
        </div>
        ${te}
    `}function Re(e,t){return!e||e.length===0?`<span class="text-[10px] font-bold text-brand-emerald">✔ Encuesta dentro de parámetros normales</span>`:e.map(e=>{let n=w[e];if(!n)return``;let r=``;return e===`LINEA_SERIE_INVALIDA`&&(r=`<div class="mt-1 px-2 py-1 bg-red-100 dark:bg-red-900/30 rounded text-[9px] font-mono text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800/50">
                <b>Error de Datos:</b> ${t._ls_key_reported||`—`}
            </div>`),`<div class="mb-2 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rounded-lg">
            <div class="text-[10px] font-black text-brand-red mb-0.5">⚠ ${n.label}</div>
            <div class="text-[9px] text-slate-500 dark:text-slate-400 leading-tight">${n.detail.replace(/\n/g,` `).trim()}</div>
            ${r}
        </div>`}).join(``)}function ze(e){let{m:t,rawControl:n,rawSerie:r,rawLinea:i,_padM:a,hasCtrlIndex:o,ctrlEntry:s,ctrlKey:c}=e,l=o?``:`<div class="mt-2 text-[9px] text-slate-400 bg-slate-100 dark:bg-slate-800 rounded px-2 py-1.5 text-center">⚠ Índice de controles no cargado aún</div>`,u=o&&!s?`<div class="mt-2 px-2 py-1.5 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/30 rounded text-[9px] text-red-700 dark:text-red-300 text-center">Clave <b class="font-mono">${c}</b><br>no existe en CONTROLES.geojson</div>`:``;return`<div class="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-5 border border-slate-200 dark:border-slate-700/50">
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
    </div>`}function Be(e){return`<details class="mt-3 text-sm text-slate-400 group">
        <summary class="cursor-pointer font-bold text-[10px] uppercase tracking-widest flex items-center gap-2">Ver JSON crudo</summary>
        <pre class="text-[10px] bg-slate-100 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 p-2 rounded-lg mt-2 overflow-x-auto text-slate-700 dark:text-slate-300 font-mono">${JSON.stringify(e,null,2)}</pre>
    </details>`}function Ve(e){let{cod:t,mun:n,par:r,declaredSeg:i,actualSeg:a,featureLabel:o,displayId:s,color:c,isCurrent:l,isActual:u}=e,d=[l?`<span style="background:#FBBF2433;color:#FBBF24;border:1px solid #FBBF2466;padding:1px 6px;border-radius:4px;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.05em">Declarado</span>`:``,u&&!l?`<span style="background:#10B98133;color:#10B981;border:1px solid #10B98166;padding:1px 6px;border-radius:4px;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.05em">Calculado GPS</span>`:``,u&&l?`<span style="background:#10B98133;color:#10B981;border:1px solid #10B98166;padding:1px 6px;border-radius:4px;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.05em">✔ Coincide</span>`:``].filter(Boolean).join(` `);return`
        <div class="dark:text-slate-200" style="font-family:'Inter',sans-serif;min-width:180px;max-width:240px;padding:2px">
            <div class="dark:border-slate-700" style="font-family:'Outfit',sans-serif;font-weight:900;font-size:12px;color:#6366f1;border-bottom:1px solid #e2e8f0;padding-bottom:6px;margin-bottom:8px">
                ${o} <span class="text-slate-800 dark:text-white" style="font-size:15px;">#${s}</span>
            </div>
            ${d?`<div style="margin-bottom:8px;display:flex;gap:4px;flex-wrap:wrap">${d}</div>`:``}
            <div style="font-size:10px;margin-bottom:3px" class="text-slate-500 dark:text-slate-400"><b>Municipio:</b> ${n}</div>
            <div style="font-size:10px;" class="text-slate-500 dark:text-slate-400"><b>Parroquia:</b> ${r}</div>
        </div>`}function He(e,t,n,r,i,a){return`<div class="font-inter p-1 w-52">
        <div class="font-outfit font-black text-xs uppercase tracking-widest border-b border-slate-200 pb-1 mb-2" style="color:${t}">${e}</div>
        <div class="flex justify-between items-center text-[10px] mb-1"><span class="font-bold text-slate-500">Coordenada:</span><span class="font-mono text-slate-700">${n.lat.toFixed(5)}, ${n.lng.toFixed(5)}</span></div>
        <div class="flex justify-between items-center text-[10px] mb-1"><span class="font-bold text-slate-500">Precisión GPS:</span><span class="font-mono font-bold">${r}</span></div>
        <div class="flex justify-between items-center text-[10px] mb-1"><span class="font-bold text-slate-500">Altitud Nivel Mar:</span><span class="font-mono text-slate-700">${i}</span></div>
        <div class="flex justify-between items-center text-[10px] border-t border-slate-100 pt-1 mt-1"><span class="font-bold text-slate-500">Hora de Captura:</span><span class="font-mono text-brand-purple font-bold">${a}</span></div>
    </div>`}var Ue=e((()=>{k()}));function We(e,t,n,r){return`<div class="p-2 font-sans">
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
    </div>`}function Ge(e){return`<div style="font-family:Inter,sans-serif;font-size:11px;line-height:1.5">
        <b>Control ${e.CONTROL}</b> · Serie ${e.SERIE}<br>
        Línea ${e.LINEA} · Seg ${e.COD_SEG} · Manz ${e.COD_MANZA}
    </div>`}function Ke(e,t,n,r,i,a,o,s){let c=a&&a.length>0,l=e.segmento||e.sector||e.manzana||e.parcela||e.edificacion||e.direccion?`
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
                ${a.map(e=>{let t=w[e];return t?`<div class="mb-1 p-1 bg-red-500/5 dark:bg-red-500/10 border border-red-500/10 dark:border-red-500/20 rounded-lg flex items-center gap-2" title="${t.detail.replace(/\n/g,``).trim()}">
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
    `}function qe(e){return`<div style="
        width:22px;height:22px;border-radius:50%;
        background:#F97316;border:2px solid white;
        display:flex;align-items:center;justify-content:center;
        font-family:Inter,sans-serif;font-size:9px;font-weight:900;
        color:white;box-shadow:0 2px 6px rgba(0,0,0,0.4);
        cursor:pointer;
    ">${e}</div>`}function Je(e,t,n,r){return`
        <div style="font-family:Inter,sans-serif;font-size:11px;line-height:1.6;padding:2px 4px">
            <b>#${e} · ${t}</b><br>
            ${n.nombre||`—`}<br>
            Ctrl: ${n.control?n.control.slice(-4):`—`} · L${n.n_linea||`—`}<br>
            Duración: ${r}
        </div>
    `}var W=e((()=>{k()}));function Ye(e){let{displayLat:t,displayLng:r,declaredSeg:i,actualSeg:a,ptStart:o,ptIni:s,ptFin:c,ptMain:l,isFlagged:u,rec:d}=e,f=U(B(d,`group_sh53u78/control`)||B(d,`control`)||``,B(d,`n_serie`)||``,B(d,`n_linea`)||``);if(!n.detailMiniMapObj){n.detailMiniMapObj=L.map(`detailMap`,{zoomControl:!1}).setView([t,r],16);let e=L.tileLayer(`https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}`,{maxZoom:20,subdomains:[`mt0`,`mt1`,`mt2`,`mt3`],attribution:`&copy; Google`}),i=L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,{attribution:`&copy; OpenStreetMap contributors`});e.addTo(n.detailMiniMapObj),n.detailMiniMapLayerControl=L.control.layers({"Google Satélite":e,OpenStreetMap:i},null,{position:`topright`}).addTo(n.detailMiniMapObj)}else if(n.detailMiniMapObj.setView([t,r],16),n.detailMiniMapObj.eachLayer(e=>{e instanceof L.TileLayer||n.detailMiniMapObj.removeLayer(e)}),n.detailMiniMapLayerControl){n.detailMiniMapObj.removeControl(n.detailMiniMapLayerControl);let e=L.tileLayer(`https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}`,{maxZoom:20,subdomains:[`mt0`,`mt1`,`mt2`,`mt3`],attribution:`&copy; Google`}),t=L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,{attribution:`&copy; OpenStreetMap contributors`});n.detailMiniMapLayerControl=L.control.layers({"Google Satélite":e,OpenStreetMap:t},null,{position:`topright`}).addTo(n.detailMiniMapObj)}let p={};if(n.geoJSONData&&(p.Segmentos=L.geoJSON(n.geoJSONData,{style:e=>{let t=String(e.properties.cod_seg||`0`),n=String(e.properties.cod_seg)===String(i),r=b[t.split(``).reduce((e,t)=>e+t.charCodeAt(0),0)%b.length];return{color:n?`#FBBF24`:r,weight:n?2.5:1.5,opacity:.9,fillColor:n?`#FBBF24`:r,fillOpacity:n?.35:.15}},onEachFeature:(e,t)=>{let n=e.properties||{},r=n.cod_seg||n.id||`N/A`,o=n.cod_munici||n.mun||`N/A`,s=n.cod_parroq||n.par||`N/A`,c=String(r)===String(i),l=String(r)===String(a),u=String(r)===`000`||String(r)===`0`,d=Ve({cod:r,mun:o,par:s,declaredSeg:i,actualSeg:a,featureLabel:u?`Sector`:`Segmento`,displayId:u?n.cod_sc||`000`:r,isCurrent:c,isActual:l});t.bindPopup(d,{className:`custom-popup`,maxWidth:260})}}).addTo(n.detailMiniMapObj)),n.controlsData&&(p[`Vivienda Esperada`]=L.geoJSON(n.controlsData,{filter:e=>{let t=e.properties;return U(t.CONTROL,t.SERIE,t.LINEA)===f},pointToLayer:(e,t)=>L.circleMarker(t,{radius:7,fillColor:`#38BDF8`,color:`#ffffff`,weight:2,opacity:1,fillOpacity:1}),onEachFeature:(e,t)=>{t.bindPopup(Ge(e.properties),{className:`custom-popup`})}}).addTo(n.detailMiniMapObj)),n.detailMiniMapLayerControl)for(let[e,t]of Object.entries(p))n.detailMiniMapLayerControl.addOverlay(t,e);let m=[],h=[],g=(e,t,r,i,a)=>{if(!e)return;let o=L.divIcon({className:`custom-minimap-marker`,html:`<div style="background-color:${t};width:14px;height:14px;border-radius:50%;border:2px solid white;box-shadow:0 0 10px ${t};"></div>`,iconSize:[14,14],iconAnchor:[7,7]}),s=e.acc?`<span class="text-brand-emerald">± ${e.acc}m</span>`:`<span class="text-slate-500">N/A</span>`,c=e.alt?`${e.alt}m s.n.m.`:`N/A`,l=i===`start`?a.start:a.end,u=He(r,t,e,s,c,l?new Date(l).toLocaleTimeString():`N/A`);L.marker([e.lat,e.lng],{icon:o}).addTo(n.detailMiniMapObj).bindPopup(u,{className:`custom-popup-enrich`}),m.push([e.lat,e.lng]),h.push([e.lat,e.lng])};o&&g(o,`#3B82F6`,`Apertura de la Encuesta`,`start`,d),s&&g(s,`#10B981`,`Confirmación Inicial`,`start`,d),c&&g(c,`#F59E0B`,`Cierre de Encuesta`,`end`,d),!o&&!s&&!c&&l&&g(l,u?`#EF4444`:`#10B981`,`Ubicación Registrada`,`end`,d),h.length>1&&L.polyline(h,{color:`#94a3b8`,dashArray:`4, 4`,weight:2,opacity:.6}).addTo(n.detailMiniMapObj);let _=s||l;if(_){let e=u?`#EF4444`:`#10B981`;L.circle([_.lat,_.lng],{radius:500,color:e,fillColor:e,fillOpacity:.05,weight:1.5,dashArray:`6,5`,interactive:!1}).addTo(n.detailMiniMapObj)}if(m.length>0){let e=L.latLngBounds(m);m.length===1&&!u?n.detailMiniMapObj.setView(m[0],16):n.detailMiniMapObj.fitBounds(e,{padding:[40,40],maxZoom:18})}n.detailMiniMapObj.invalidateSize()}var Xe=e((()=>{r(),k(),Ue(),W(),Ie()}));function G(e){let t=u(`detailModal`),r=u(`detailModalBody`);if(!t||!r||!e)return;let i={stEntidad:V(B(e,`S1/ent`)||B(e,`ent`)),stMpio:V(B(e,`mun`)),stParr:V(B(e,`par`)),stSect:V(B(e,`sector`)||B(e,`S1/sector`)||B(e,`S1/group_segmeto_sector/sector`)),stNodo:V(B(e,`nodo`)),stEncuestador:V(B(e,`nombre`)||B(e,`S0/s0_nombreapellido`)),stCedula:V(B(e,`cedula`)||B(e,`S0/cedula_encuestador`)),stFecha:V(B(e,`fecha`)||B(e,`today/_submission_time`)),stDur:V(B(e,`durMin`)?`${B(e,`durMin`)} min`:null),declaredSeg:B(e,`segmento`)||B(e,`S1/segmento`)||B(e,`S1/group_segmeto_sector/segmento`),actualSeg:B(e,`actual_seg`),rawControl:String(B(e,`group_sh53u78/control`)||B(e,`control`)||``),rawSerie:String(B(e,`n_serie`)||``),rawLinea:String(B(e,`n_linea`)||``),stHogares:V(B(e,`hogares`)||B(e,`datos_hogar/hogar_count`)||B(e,`lista_hogar_count`)),stPers:V(B(e,`totalPers`)||B(e,`datos_hogar/hogar.integrantes_hogar`)),stUso:V(B(e,`uso`)||B(e,`S1/Uso_de_la_Unidad_inmobiliaria`)),stCond:V(B(e,`condicion`)||B(e,`Condici_n_de_ocupaci_n/condicion_de_ocupacion`)),alertas:e._meta?.alertas||[],hasAlerts:e._meta?.hasAlerts||!1,isFlagged:e._meta?.flag_distance_gt_500,durMin:B(e,`durMin`),rawDist:B(e,`distance_m`),m:e._meta||{}};i.isRural=i.declaredSeg===`000`||i.declaredSeg===`0`,i.valHeader=i.isRural?`Validación de Sector`:`Validación de Segmento`,i.valLeftLabel=i.isRural?`Sector Declarado`:`Declarado`,i.valLeftVal=i.isRural?B(e,`sector`)||B(e,`S1/sector`)||`000`:i.declaredSeg||`N/A`,i.stControl=V(i.rawControl||null),i.stLinea=V(i.rawLinea||null),i.stSerie=V(i.rawSerie||null),i.stEstado=i.m.estado===`completada`?`<span class="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest bg-brand-green/20 text-brand-green border border-brand-green/30">Completada (Efectiva)</span>`:`<span class="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest bg-brand-orange/20 text-brand-orange border border-brand-orange/30">No Efectiva / Error</span>`,i.stDist=i.rawDist===null?`<span class="text-slate-500 font-medium italic">N/A</span>`:`<span class="font-outfit font-black ${i.isFlagged?`text-brand-red`:`text-brand-emerald`}">${Math.round(i.rawDist)} m</span>`;let a=U(i.rawControl,i.rawSerie,i.rawLinea),o=n.controlsIndex instanceof Map?n.controlsIndex.get(a):null,s=n.controlsIndex instanceof Map&&n.controlsIndex.size>0;i.ctrlPanelHtml=ze({m:i.m,rawControl:i.rawControl,rawSerie:i.rawSerie,rawLinea:i.rawLinea,_padM:Fe,hasCtrlIndex:s,ctrlEntry:o,ctrlKey:a});let c=H(e[`start-geopoint`]),d=H(e[`group_sh53u78/ubicacion_i`]||e.ubicacion_i),f=H(e[`ubicacion_final/ubicacion_f`]||e.ubicacion_f),p=e.lat||i.m.lat||(e._geolocation?e._geolocation[0]:null),m=e.lng||i.m.lng||(e._geolocation?e._geolocation[1]:null),h=p&&m?{lat:parseFloat(p),lng:parseFloat(m)}:null;if(i.walkedDistance=d&&f?Pe(d,f):null,i.hasMapData=c||d||f||h,i.segmentMatchStatus=!i.valLeftVal||!i.actualSeg?`<i data-lucide="minus" class="text-slate-400 w-4 h-4"></i>`:l(i.valLeftVal,i.actualSeg)?`<i data-lucide="check" class="text-brand-emerald w-5 h-5"></i>`:`<i data-lucide="x" class="text-brand-red w-5 h-5"></i>`,i.actualSegClasses=i.actualSeg&&!l(i.valLeftVal,i.actualSeg)?`bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800/30`:`bg-slate-100 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700`,i.actualSegText=i.actualSeg&&!l(i.valLeftVal,i.actualSeg)?`text-brand-red`:`text-slate-800 dark:text-slate-200`,i.alertsHtml=Re(i.alertas,i.m),r.innerHTML=Le(i)+Be(e),window.lucide&&lucide.createIcons({root:r}),n.lastFocused=document.activeElement,t.classList.remove(`hidden`),window.innerWidth<768){let e=u(`detailModalPane`);e&&e.classList.contains(`max-w-7xl`)&&typeof window.toggleDetailModalExpand==`function`&&window.toggleDetailModalExpand()}setTimeout(()=>{t.querySelector(`#detailModalPane`)?.classList.remove(`scale-95`,`opacity-0`)},10),i.hasMapData&&setTimeout(()=>{Ye({displayLat:h?h.lat:d?d.lat:c?c.lat:f.lat,displayLng:h?h.lng:d?d.lng:c?c.lng:f.lng,declaredSeg:i.declaredSeg,actualSeg:i.actualSeg,ptStart:c,ptIni:d,ptFin:f,ptMain:h,isFlagged:i.isFlagged,rec:e})},300)}function Ze(){let e=u(`detailModal`);e&&(e.querySelector(`#detailModalPane`)?.classList.add(`scale-95`,`opacity-0`),setTimeout(()=>{e.classList.add(`hidden`);let t=u(`detailModalPane`),r=u(`detailModalExpandIcon`),i=u(`detailModalBody`);if(t?.classList.contains(`max-w-none`)&&(t.classList.remove(`w-full`,`max-w-none`,`h-full`,`rounded-none`),t.classList.add(`max-w-7xl`,`w-11/12`,`rounded-2xl`,`p-0`),r&&r.setAttribute(`data-lucide`,`maximize`),i&&(i.classList.remove(`flex-1`,`max-h-none`),i.classList.add(`max-h-[75vh]`))),n.detailMiniMapObj&&(n.detailMiniMapObj.remove(),n.detailMiniMapObj=null),n.lastFocused?.focus)try{n.lastFocused.focus()}catch{}},300))}var K=e((()=>{r(),d(),Ie(),Ue(),Xe(),window.toggleDetailModalExpand=function(){let e=u(`detailModalPane`),t=u(`detailModalExpandIcon`),r=u(`detailMapWrapper`),i=u(`detailModalBody`);!e||!t||(e.classList.contains(`max-w-7xl`)?(e.classList.remove(`max-w-7xl`,`w-11/12`,`rounded-2xl`,`p-0`),e.classList.add(`w-full`,`max-w-none`,`h-full`,`rounded-none`),t.setAttribute(`data-lucide`,`minimize`),r&&(r.classList.remove(`h-48`,`sm:h-64`,`md:h-96`),r.classList.add(`h-[60vh]`,`md:h-[75vh]`)),i&&(i.classList.remove(`max-h-[75vh]`),i.classList.add(`flex-1`,`max-h-none`))):(e.classList.remove(`w-full`,`max-w-none`,`h-full`,`rounded-none`),e.classList.add(`max-w-7xl`,`w-11/12`,`rounded-2xl`,`p-0`),t.setAttribute(`data-lucide`,`maximize`),r&&(r.classList.remove(`h-[60vh]`,`md:h-[75vh]`),r.classList.add(`h-48`,`sm:h-64`,`md:h-96`)),i&&(i.classList.remove(`flex-1`,`max-h-none`),i.classList.add(`max-h-[75vh]`))),window.lucide&&window.lucide.createIcons(),n.detailMiniMapObj&&setTimeout(()=>n.detailMiniMapObj.invalidateSize(),350))},window.viewTraceByRecord=function(e){let t=n.rawData.find(t=>t._uuid===e||t.uuid===e);t?G(t):console.warn(`[Modal] Registro con UUID ${e} no encontrado.`)},window.closeDetailModal=Ze})),Qe,$e,et,tt,nt,rt,it=e((()=>{k(),Qe=e=>{let t=e.getValue();return`<span style="color:${t===`completada`?`#10B981`:`#F59E0B`};font-weight:700;font-size:10px;letter-spacing:0.02em">${t===`completada`?`EFECTIVA`:`NO EFECTIVA`}</span>`},$e=e=>{let t=e.getValue();return t===null?`—`:`<span style="color:${t<15?`#EF4444`:t<25?`#F59E0B`:`#10B981`};font-weight:800;font-family:Outfit,sans-serif;">${t}m</span>`},et=e=>{let t=e.getValue();return!t||t.length===0?`<span style="color:var(--text-muted);font-size:10px">—</span>`:t.map(e=>{let t=w[e],n=t?t.label:e;return`<span title="${t?t.detail.replace(/\n/g,` `):``}" style="display:inline-flex;align-items:center;gap:3px;background:rgba(239,68,68,0.15);color:#EF4444;border:1px solid rgba(239,68,68,0.3);border-radius:4px;padding:1px 5px;font-size:9px;font-weight:700;letter-spacing:0.02em;margin-right:3px;white-space:nowrap;">⚠ ${n}</span>`}).join(``)},tt=e=>{let t=e.getData(),n=E.has(t.cedula)?`<span style="background:#3B82F6;color:white;font-size:8px;font-weight:900;padding:1px 4px;border-radius:4px;margin-left:6px;vertical-align:middle;">INE</span>`:``;return`<div><div style="font-weight:800;color:currentColor;font-size:12px;line-height:1.3;">${t.nombre||`Sin Nombre`}${n}</div><div style="font-size:9px;color:#94a3b8;font-weight:600;">${t.cedula||`N/A`}</div></div>`},nt=e=>{let t=e.getValue(),n=t>=80?`#10B981`:t>=50?`#F59E0B`:`#EF4444`;return`<div style="display:flex;flex-direction:column;align-items:center;gap:3px;padding:4px 0">
        <span style="font-weight:900;color:${n};font-size:15px;">${t}%</span>
        <div style="width:100%;max-width:80px;height:6px;background:rgba(0,0,0,0.05);border-radius:10px;overflow:hidden">
            <div style="width:${t}%;height:100%;background:${n};border-radius:10px;"></div>
        </div>
    </div>`},rt=()=>`
    <div class="flex gap-2">
        <button class="tab-action-btn btn-view" data-action="view">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
            <span>VER</span>
        </button>
    </div>
`}));function at(e=[]){n.detailTable||(n.detailTable=new Tabulator(`#detailGrid`,{data:e,layout:`fitColumns`,height:`100%`,pagination:!0,paginationSize:25,paginationSizeSelector:[10,25,50,100],movableColumns:!0,responsiveLayout:`collapse`,clipboard:!0,placeholder:`<div style="padding:40px;text-align:center;color:var(--text-muted);font-size:14px;font-family:Inter,sans-serif;">Cargando base de datos...</div>`,columnHeaderVertAlign:`bottom`,columns:[{formatter:`responsiveCollapse`,width:30,minWidth:30,hozAlign:`center`,headerSort:!1,resizable:!1,responsive:0},{title:`Identificación`,frozen:!0,columns:[{title:`Cédula`,field:`cedula`,headerFilter:`input`,minWidth:90,responsive:0},{title:`Nombre`,field:`nombre`,headerFilter:`input`,minWidth:140,responsive:0},{title:`Control`,field:`control`,headerFilter:`input`,width:90,responsive:0}]},{title:`Contexto`,columns:[{title:`Fecha`,field:`fecha`,headerFilter:`input`,width:90,sorter:`date`,responsive:1},{title:`Municipio`,field:`mun`,headerFilter:`input`,width:90,responsive:2},{title:`Parroquia`,field:`par`,headerFilter:`input`,width:90,responsive:4},{title:`Segm.`,field:`segmento`,headerFilter:`input`,width:70,hozAlign:`center`,responsive:4},{title:`Sect.`,field:`sector`,headerFilter:`input`,width:70,hozAlign:`center`,responsive:4}]},{title:`Métricas`,columns:[{title:`Estado`,field:`estado`,width:100,responsive:0,formatter:Qe,headerFilter:`list`,headerFilterParams:{valuesLookup:!0,clearable:!0}},{title:`Dur.`,field:`durMin`,width:70,hozAlign:`center`,responsive:2,formatter:$e},{title:`Alertas`,field:`alertas`,minWidth:160,headerSort:!1,responsive:2,formatter:et}]},{title:`Social`,columns:[{title:`Hog.`,field:`hogares`,width:50,hozAlign:`center`,responsive:4},{title:`Pers.`,field:`personas`,width:50,hozAlign:`center`,responsive:4}]},{title:`Acciones`,width:120,headerSort:!1,hozAlign:`center`,responsive:0,formatter:rt,cellClick:(e,t)=>{e.stopPropagation();let n=e.target.closest(`button`);if(!n)return;let r=t.getData()._rec;r&&n.dataset.action===`view`&&G(r)}}],rowFormatter:e=>{let t=e.getData();t.estado===`completada`?e.getElement().classList.add(`row-complete`):t.estado===`no_efectiva`&&e.getElement().classList.add(`row-no-efectiva`),t.hasAlerts&&e.getElement().classList.add(`row-flagged`)}}),n.detailTable.on(`rowClick`,(e,t)=>{let n=t.getData()._rec;n&&G(n)}))}function ot(e=n.filtered){let t=e.map(e=>{let t=e._meta||{};return{_rec:e,id:t.control||e._uuid,cedula:t.cedula||``,nombre:t.nombre||``,control:t.control||``,fecha:t.fecha||``,mun:t.mun||``,par:t.par||``,nodo:t.nodo||``,segmento:t.segmento||``,sector:t.sector||``,estado:t.estado||``,durMin:t.durMin,alertas:t.alertas||[],hasAlerts:t.hasAlerts||!1,hogares:t.hogares||0,personas:t.totalPers||0}});if(!n.detailTable)at(t);else try{n.detailTable.setData(t)}catch(e){console.warn(`Tabulator setData delayed:`,e.message),setTimeout(()=>n.detailTable&&n.detailTable.setData(t),100)}}var st=e((()=>{r(),k(),K(),it()}));function ct(e){if(console.log(`table.js: renderRankingTable() initializing leaderboard...`),typeof Tabulator>`u`){console.error(`table.js: CRITICAL - Tabulator library is NOT loaded.`);return}if(!document.querySelector(`#rankingTable`))return;if(!e){if(!n.filtered||!n.encMap)return;let t=n.filtered.filter(e=>e&&e._meta),r=new Set(t.map(e=>e._meta.cedula));e=Object.values(n.encMap).filter(e=>r.has(e.cedula));let i={encuestas:(e,t)=>(t.encuestas||0)-(e.encuestas||0),completadas:(e,t)=>(t.completadas||0)-(e.completadas||0),eficiencia:(e,t)=>(t.pctCompleta||0)-(e.pctCompleta||0),personas:(e,t)=>(t.personas||0)-(e.personas||0)};e.sort(i[n.currentSort]||i.eficiencia)}let t=e.map((e,t)=>({pos:t+1,nombre:e.nombre||`Sin Nombre`,cedula:e.cedula||`N/A`,encuestas:e.encuestas||0,completadas:e.completadas||0,pctCompleta:e.pctCompleta||0,personas:e.personas||0}));n.rankingTabulator?n.rankingTabulator.setData(t).then(()=>{n.rankingTabulator.redraw(!0)}):(n.rankingTabulator=new Tabulator(`#rankingTable`,{data:t,layout:`fitColumns`,height:`420px`,responsiveLayout:`collapse`,persistence:!1,placeholder:`<div style="padding:40px;text-align:center;color:#64748b;font-size:13px;font-family:Inter,sans-serif;">Sin datos disponibles</div>`,initialSort:[{column:`pctCompleta`,dir:`desc`}],columns:[{formatter:`responsiveCollapse`,width:30,minWidth:30,hozAlign:`center`,headerSort:!1,resizable:!1,responsive:0},{title:`#`,field:`pos`,width:55,hozAlign:`center`,headerSort:!1,frozen:!0,responsive:0,formatter:e=>`<span style="color:#64748b;font-weight:800;font-size:12px;">${e.getValue()}</span>`},{title:`Encuestador`,field:`nombre`,minWidth:140,frozen:!0,responsive:0,formatter:tt},{title:`Volumen`,field:`encuestas`,hozAlign:`center`,width:90,sorter:`number`,responsive:0,formatter:e=>`<span style="font-weight:800;color:#3B82F6;font-size:14px">${e.getValue()}</span>`},{title:`% Efectividad`,field:`pctCompleta`,hozAlign:`center`,minWidth:120,sorter:`number`,responsive:0,formatter:nt},{title:`Pers.`,field:`personas`,hozAlign:`center`,width:70,sorter:`number`,responsive:2,formatter:e=>`<span style="font-weight:600;color:#64748b">${e.getValue()}</span>`}]}),n.rankingTabulator.on(`rowClick`,(e,t)=>{let n=t.getData().cedula,r=document.getElementById(`filterEncuestador`);n&&r&&(r.value=n,typeof I==`function`&&I())}))}var lt=e((()=>{r(),z(),it()})),ut=e((()=>{st(),lt(),it()}));async function dt(){if(!n.geoJSONData)try{let e=await fetch(`data/segmentos_monagas.geojson`);if(!e.ok)throw Error(`Error loading GeoJSON`);n.geoJSONData=await e.json(),n.segmentBBoxes=n.geoJSONData.features.map(e=>{if(!e.geometry)return null;let t=[];return e.geometry.type===`Polygon`?t=e.geometry.coordinates[0]:e.geometry.type===`MultiPolygon`&&(t=e.geometry.coordinates.flatMap(e=>e[0])),t.length>0?{bbox:c(t),props:e.properties,feature:e}:null}).filter(e=>e!==null),ft()}catch(e){console.error(`FAILED TO LOAD GEOJSON:`,e)}}function ft(){if(!(!n.geoJSONData||!n.map||n.geoJSONLayer))try{n.geoJSONLayer=L.geoJSON(n.geoJSONData,{style:e=>{let t=e.properties,n=b[(`${t.cod_seg===`000`||t.cod_seg===`0`?t.cod_sc||`0`:t.cod_seg||`0`}`.split(``).reduce((e,t)=>e*31+t.charCodeAt(0),0)>>>0)*13%b.length];return{color:n,weight:2,opacity:.8,fillColor:n,fillOpacity:.15}},onEachFeature:(e,t)=>{let n=e.properties,r=n.cod_seg===`000`||n.cod_seg===`0`,i=b[(`${r?n.cod_sc||`0`:n.cod_seg||`0`}`.split(``).reduce((e,t)=>e*31+t.charCodeAt(0),0)>>>0)*13%b.length],a=r?`Sector`:`Segmento`,o=r?n.cod_sc||`N/A`:n.cod_seg||`N/A`;t.bindPopup(We(a,o,i,n),{className:`custom-popup`}),t.on(`mouseover`,function(){this.setStyle({fillOpacity:.35,weight:3})}),t.on(`mouseout`,function(){this.setStyle({fillOpacity:.15,weight:2})})}}).addTo(n.map),n.layerControl&&n.layerControl.addOverlay(n.geoJSONLayer,`Segmentos Monagas`)}catch(e){console.error(`FAILED TO DRAW GEOJSON LAYER:`,e)}}async function pt(){if(!n.controlsIndex)try{let e=await fetch(`data/CONTROLES.geojson`);if(!e.ok)throw Error(`Error loading CONTROLES.geojson: ${e.status}`);n.controlsData=await e.json(),n.controlsIndex=new Map,n.validControls=new Set,n.validSeries=new Set,n.validLineas=new Set,n.controlDetails=new Map;let t=e=>{if(e==null)return null;let t=parseInt(String(e).trim(),10);return isNaN(t)?null:t};n.controlsData.features.forEach(e=>{let r=e.properties,i=t(r.LINEA),a=t(r.SERIE);if(i===null||a===null)return;let o=String(r.CONTROL||``).trim(),s=String(a),c=String(i);n.validControls.add(o),n.validSeries.add(s),n.validLineas.add(c),n.controlDetails.has(o)||n.controlDetails.set(o,{series:new Set,lineas:new Set}),n.controlDetails.get(o).series.add(s),n.controlDetails.get(o).lineas.add(c),n.controlsIndex.set(`${o}-${s}-${c}`,{COD_SEG:String(r.COD_SEG??``).trim(),COD_MANZA:String(r.COD_MANZA??``).trim()})}),n.map&&mt()}catch(e){console.error(`FAILED TO LOAD CONTROLES.geojson:`,e)}}function mt(){if(!(!n.controlsData||!n.map))try{n.controlsLayer&&(n.controlsLayer.remove(),n.layerControl&&n.layerControl.removeLayer(n.controlsLayer)),n.controlsLayer=L.geoJSON(n.controlsData,{pointToLayer:(e,t)=>L.circleMarker(t,{radius:3.5,fillColor:`#38BDF8`,color:`#ffffff`,weight:1,opacity:.9,fillOpacity:.85}),onEachFeature:(e,t)=>{t.bindTooltip(Ge(e.properties),{sticky:!0,opacity:.95})}}),n.layerControl&&n.layerControl.addOverlay(n.controlsLayer,`Viviendas`)}catch(e){console.error(`FAILED TO DRAW CONTROLS LAYER:`,e)}}var ht=e((()=>{r(),k(),W(),d()}));function gt(){if(n.map)return;let e=L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,{attribution:`&copy; OpenStreetMap contributors`}),t=L.tileLayer(`https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}`,{maxZoom:20,subdomains:[`mt0`,`mt1`,`mt2`,`mt3`],attribution:`&copy; Google`});n.map=L.map(`mapView`,{center:[10.4806,-66.8983],zoom:12,layers:[e],zoomControl:!1});let r={OpenStreetMap:e,"Google Satélite":t};n.layerControl=L.control.layers(r,{},{collapsed:window.innerWidth<768}).addTo(n.map),L.control.scale().addTo(n.map),n.markerCluster=L.markerClusterGroup({showCoverageOnHover:!1,zoomToBoundsOnClick:!0,spiderfyOnMaxZoom:!0}),n.map.addLayer(n.markerCluster),ft(),mt()}var _t=e((()=>{r(),ht()}));function vt(){n.agentRouteLayer&&(n.map.removeLayer(n.agentRouteLayer),n.agentRouteLayer=null)}function yt(e){if(vt(),!e||!n.map)return;let t=n.filtered.filter(t=>t._meta?.cedula===e&&t._meta.lat&&t._meta.lng).sort((e,t)=>new Date(e.start||0).getTime()-new Date(t.start||0).getTime());if(t.length===0)return;let r=u(`mapRouteAgentCount`);r&&(r.textContent=`${t.length} ptos`);let i=t.map(e=>[e._meta.lat,e._meta.lng]),a=[];a.push(L.polyline(i,{color:`#F97316`,weight:2.5,opacity:.85,dashArray:`6 4`})),t.forEach((e,t)=>{let n=e._meta,r=t+1,i=(e.start||``).slice(11,16)||`—`,o=n.durMin===null?`—`:`${Math.round(n.durMin)} min`,s=L.divIcon({className:``,html:qe(r),iconSize:[22,22],iconAnchor:[11,11]}),c=L.marker([n.lat,n.lng],{icon:s});c.bindTooltip(Je(r,i,n,o),{sticky:!0,opacity:.97}),c.on(`click`,()=>G(e)),a.push(c)}),n.agentRouteLayer=L.layerGroup(a).addTo(n.map);let o=L.latLngBounds(i);o.isValid()&&n.map.fitBounds(o,{padding:[60,60]})}function bt(){let e=document.getElementById(`filterEncuestador`),t=document.getElementById(`btnVerRutaEncuestador`),r=document.getElementById(`mapRouteAgentCount`);if(!e||!t||t._verRutaAttached)return;t._verRutaAttached=!0;let i=()=>{let i=!!e.value,a=i?n.filtered.filter(t=>t._meta?.cedula===e.value&&t._meta.lat&&t._meta.lng).length:0;if(t.disabled=!i,r&&(r.textContent=i&&a?`${a} pts`:`—`),!i){vt(),t.dataset.routeActive=`0`,t.classList.remove(`bg-brand-orange/20`,`border-brand-orange`);let e=t.querySelector(`.route-label`);e&&(e.textContent=`Ver Ruta`),n.map&&n.markerCluster&&!n.map.hasLayer(n.markerCluster)&&n.map.addLayer(n.markerCluster)}};i(),e.addEventListener(`change`,i),document.addEventListener(`filtersApplied`,i),t.addEventListener(`click`,()=>{let i=e.value;if(i)if(t.dataset.routeActive===`1`){vt(),t.dataset.routeActive=`0`,n.map&&n.markerCluster&&!n.map.hasLayer(n.markerCluster)&&n.map.addLayer(n.markerCluster),t.classList.remove(`bg-brand-orange/20`,`border-brand-orange`);let e=n.filtered.filter(e=>e._meta?.cedula===i&&e._meta.lat&&e._meta.lng).length;r&&(r.textContent=`${e} pts`);let a=t.querySelector(`.route-label`);a&&(a.textContent=`Ver Ruta`)}else{let e=document.querySelector(`[data-tab="tab-mapa"]`);e&&e.click(),setTimeout(()=>{yt(i),t.dataset.routeActive=`1`,n.map&&n.markerCluster&&n.map.hasLayer(n.markerCluster)&&n.map.removeLayer(n.markerCluster),t.classList.add(`bg-brand-orange/20`,`border-brand-orange`);let e=n.filtered.filter(e=>e._meta?.cedula===i&&e._meta.lat&&e._meta.lng).length;r&&(r.textContent=`${e} pts`);let a=t.querySelector(`.route-label`);a&&(a.textContent=`Ocultar Ruta`)},200)}})}var xt=e((()=>{r(),d(),z(),K(),W()}));function St(){if(!n.map||!n.markerCluster)return;n.markerCluster.clearLayers();let e=n.filtered.filter(e=>e._meta.lat&&e._meta.lng),t=e.filter(e=>e._meta&&e._meta.estado===`completada`).length,r=e.length-t,i=new Set(e.map(e=>e._meta.cedula)).size,a=e.filter(e=>e._meta.hasAlerts).length,o=new Set(e.map(e=>e._meta.mun).filter(e=>e&&e!==`N/A`)),s=new Set(e.map(e=>e._meta.par).filter(e=>e&&e!==`N/A`)),c=new Set(e.map(e=>e._meta.nodo).filter(e=>e&&e!==`N/A`));u(`mapKpiPoints`)&&(u(`mapKpiPoints`).textContent=e.length),u(`mapKpiComplete`)&&(u(`mapKpiComplete`).textContent=t),u(`mapKpiNoEfectiva`)&&(u(`mapKpiNoEfectiva`).textContent=r),u(`mapKpiAgents`)&&(u(`mapKpiAgents`).textContent=i),u(`mapKpiAlertas`)&&(u(`mapKpiAlertas`).textContent=a);let l=u(`mapCoverageBadge`);l&&e.length>0&&(l.classList.remove(`hidden`),u(`mapMunCount`)&&(u(`mapMunCount`).textContent=o.size),u(`mapParCount`)&&(u(`mapParCount`).textContent=s.size),u(`mapNodoCount`)&&(u(`mapNodoCount`).textContent=c.size));let d=e.map(e=>{let t=e._meta,n=t.estado===`completada`,r=t.hasAlerts,i=t.alertas||[],a,o,s;if(r){a=`#EF4444`,o=`#DC2626`;let e=w[i[0]];s=`⚠ ${e?e.label:`Alerta`}${i.length>1?` +${i.length-1}`:``}`}else n?(a=`#10B981`,o=`#059669`,s=`Efectiva`):(a=`#F59E0B`,o=`#D97706`,s=`No Efectiva`);let c=t.durMin===null?`—`:`${Math.round(t.durMin)} min`,l=t.distance_m===null?`—`:`${Math.round(t.distance_m)} m`,u=Ke(t,e._uuid,a,o,s,i,c,l);return L.circleMarker([t.lat,t.lng],{radius:7,fillColor:a,color:o,weight:2,opacity:.9,fillOpacity:.7}).bindPopup(u,{className:`custom-popup`,maxWidth:320})});if(n.markerCluster.addLayers(d),document.getElementById(`btnVerRutaEncuestador`)?.dataset?.routeActive===`1`){n.map.hasLayer(n.markerCluster)&&n.map.removeLayer(n.markerCluster);let e=document.getElementById(`filterEncuestador`);e&&e.value&&yt(e.value)}else if(d.length>0){let e=n.markerCluster.getBounds();e.isValid()&&n.map.fitBounds(e,{padding:[50,50]})}window.lucide&&lucide.createIcons()}var Ct=e((()=>{r(),d(),z(),k(),W(),xt(),window.setQuickFilter=function(e){n.quickFilterMode=e,Object.entries({all:{id:`btnMapFilterAll`,active:[`bg-brand-blue/10`,`dark:bg-brand-blue/20`,`border-brand-blue`,`ring-brand-blue/30`],inactive:`border-brand-blue`},efectivas:{id:`btnMapFilterEfectivas`,active:[`bg-brand-emerald/10`,`dark:bg-brand-emerald/20`,`border-brand-emerald`,`ring-brand-emerald/30`],inactive:`border-brand-emerald`},no_efectiva:{id:`btnMapFilterNoEfectiva`,active:[`bg-brand-orange/10`,`dark:bg-brand-orange/20`,`border-brand-orange`,`ring-brand-orange/30`],inactive:`border-brand-orange`},alertas:{id:`btnMapFilterAlertas`,active:[`bg-brand-red/10`,`dark:bg-brand-red/20`,`border-brand-red`,`ring-brand-red/30`],inactive:`border-brand-red`}}).forEach(([t,n])=>{let r=u(n.id);r&&(r.classList.remove(`bg-brand-blue/10`,`dark:bg-brand-blue/20`,`border-brand-blue`,`ring-brand-blue/30`,`bg-brand-emerald/10`,`dark:bg-brand-emerald/20`,`border-brand-emerald`,`ring-brand-emerald/30`,`bg-brand-orange/10`,`dark:bg-brand-orange/20`,`border-brand-orange`,`ring-brand-orange/30`,`bg-brand-red/10`,`dark:bg-brand-red/20`,`border-brand-red`,`ring-brand-red/30`,`ring-1`,`shadow-md`,`border-slate-400`),t===e?r.classList.add(...n.active,`ring-1`,`shadow-md`):r.classList.add(n.inactive))}),I()}})),wt=e((()=>{_t(),ht(),Ct(),xt()}));function q(e){if(typeof Tabulator>`u`){console.error(`Tabulator not found`);return}let t=(e||[]).map((e,t)=>{let n=[];e[`S1/P_nomsect`]&&n.push(e[`S1/P_nomsect`]);for(let t=1;t<=4;t++){let r=e[`S1/G_P9/gp10_${t}_etiq`],i=e[`S1/G_P9/GP10_${t}b`];r&&i&&n.push(`${r} ${i}`)}let r=e[`control_de_la_entrevista/in10`]||e[`control_entrevista/in10`];r&&n.push(`Nro: ${r}`);let i=e[`control_de_la_entrevista/in11`]||e[`control_entrevista/in11`];i&&n.push(`Ref: ${i}`);let a=n.length>0?n.join(`, `):e[`S1/direccion`]||e._meta.nota||`-`;return{linea:e[`group_sh53u78/n_linea`]||t+1,serie:e[`group_sh53u78/n_serie`]||`-`,manzana:e[`S1/manzana`]||`-`,parcela:e[`S1/parcela`]||`-`,edificacion:e[`S1/Edificaci_n`]||e[`S1/edificacion`]||`-`,estructura:e[`S1/estructura`]||e[`S1/unidad`]||`-`,uso:e[`S1/Uso_de_la_Unidad_inmobiliaria`]||e._meta.uso||`-`,ladoManz:e[`S1/lado_manz`]||`-`,direccion:a,razon:e[`Condici_n_de_ocupaci_n/condicion_de_ocupacion`]||e._meta.condicion||`-`,encuestador:e._meta.nombre?e._meta.nombre.split(` `)[0]:`N/A`}});t.sort((e,t)=>parseInt(e.linea)-parseInt(t.linea)),n.mm111Table?n.mm111Table.setData(t).then(()=>{n.mm111Table.redraw(!0)}):Tt(t)}function Tt(e){n.mm111Table=new Tabulator(`#mm111Grid`,{data:e,layout:`fitColumns`,height:`100%`,responsiveLayout:`collapse`,placeholder:`<div class='p-12 text-center text-slate-400 font-medium'>Seleccione un número de Control para visualizar el listado de las encuestas.</div>`,columns:[{title:`Línea`,field:`linea`,width:65,hozAlign:`center`,frozen:!0,formatter:e=>`<span class="font-mono font-bold text-slate-700 dark:text-slate-200">${e.getValue()}</span>`},{title:`Serie`,field:`serie`,width:60,hozAlign:`center`,formatter:e=>`<span class="font-mono opacity-70">${e.getValue()}</span>`},{title:`Manz.`,field:`manzana`,width:65,hozAlign:`center`},{title:`Parc.`,field:`parcela`,width:65,hozAlign:`center`},{title:`Edif.`,field:`edificacion`,width:65,hozAlign:`center`},{title:`Estr.`,field:`estructura`,width:65,hozAlign:`center`},{title:`Uso de la Unidad`,field:`uso`,minWidth:120,formatter:Et},{title:`Lado Manz.`,field:`ladoManz`,width:90,hozAlign:`center`},{title:`Dirección`,field:`direccion`,minWidth:250,formatter:`textarea`},{title:`Razón Inclusión`,field:`razon`,minWidth:180,formatter:Dt},{title:`Encuestador`,field:`encuestador`,width:100,hozAlign:`center`,formatter:e=>`<span class="text-[10px] font-black uppercase text-slate-400 tracking-wider">${e.getValue()}</span>`}]})}function Et(e){let t=String(e.getValue()).toUpperCase(),n=D.DEFAULT;for(let e in D)if(t.includes(e)){n=D[e];break}return`<span class="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-tight ${n.badge}">${t}</span>`}function Dt(e){let t=String(e.getValue()).toUpperCase(),n=t.replace(/_/g,` `),r=O.DEFAULT;for(let e in O)if(t.includes(e)){r=O[e];break}return`<span class="px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-tight ${r.badge}">${n}</span>`}function Ot(){[`mm111Entidad`,`mm111Municipio`,`mm111Parroquia`,`mm111CPoblado`].forEach(e=>{u(e)&&(u(e).textContent=`---`)}),[`mm111EntidadCod`,`mm111MunicipioCod`,`mm111ParroquiaCod`,`mm111CPobladoCod`].forEach(e=>{u(e)&&(u(e).textContent=`--`)}),[`mm111Segmento`,`mm111Sector`,`mm111Nodo`,`mm111Semana`,`mm111ControlMaestro`,`mm111Lote`].forEach(e=>{u(e)&&(u(e).textContent=`-`)}),u(`mm111ControlNro`)&&(u(`mm111ControlNro`).textContent=`0000`)}function kt(e,t){let n=u(`mm111ResultsList`);n&&(e.length>0?n.innerHTML=e.map((e,t)=>`
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
            </div>`,window.lucide&&lucide.createIcons())}var At=e((()=>{r(),d(),k()}));function jt(e){if(!e)return;let t=n.rawData.filter(t=>String(t._meta.control).toLowerCase()===String(e).toLowerCase());if(t.length===0){Ot(),q([]);return}let r=t[0];u(`mm111Entidad`)&&(u(`mm111Entidad`).textContent=r[`S1/ent`]||r._meta.mun||`N/A`),u(`mm111Municipio`)&&(u(`mm111Municipio`).textContent=r._meta.mun||`N/A`),u(`mm111Parroquia`)&&(u(`mm111Parroquia`).textContent=r._meta.par||`N/A`),u(`mm111CPoblado`)&&(u(`mm111CPoblado`).textContent=r[`S1/cpoblado`]||`N/A`);let i=(e,t=null)=>{if(!e)return`--`;let n=String(e).match(/^(\d+)/),r=n?n[1]:`--`;return r!==`--`&&t&&(r=r.slice(-t)),r};u(`mm111EntidadCod`)&&(u(`mm111EntidadCod`).textContent=i(r[`S1/ent`])||`--`),u(`mm111MunicipioCod`)&&(u(`mm111MunicipioCod`).textContent=i(r._meta.mun,2)||`--`),u(`mm111ParroquiaCod`)&&(u(`mm111ParroquiaCod`).textContent=i(r._meta.par,2)||`--`),u(`mm111CPobladoCod`)&&(u(`mm111CPobladoCod`).textContent=i(r[`S1/cpoblado`])||`--`);let a=(e,t)=>e&&String(e).trim()!==`-`?String(e).slice(-t):`-`;u(`mm111Segmento`)&&(u(`mm111Segmento`).textContent=r[`S1/segmento`]||r[`S1/group_segmeto_sector/segmento`]||r[`group_segmeto_sector/segmento`]||`-`),u(`mm111Sector`)&&(u(`mm111Sector`).textContent=r[`S1/sector`]||r[`S1/group_segmeto_sector/sector`]||r[`group_segmeto_sector/sector`]||`-`),u(`mm111Nodo`)&&(u(`mm111Nodo`).textContent=r._meta.nodo||`-`),u(`mm111Semana`)&&(u(`mm111Semana`).textContent=a(r._meta.semana,2)),u(`mm111ControlNro`)&&(u(`mm111ControlNro`).textContent=a(r._meta.control,4));let o=r[`group_sh53u78/lote`]||r.lote||`-`;u(`mm111Lote`)&&(u(`mm111Lote`).textContent=o);let s=t.map(e=>e._meta.fecha).filter(Boolean).sort();if(s.length>0){let e=u(`filterFechaInicio`),t=u(`filterFechaFin`);e&&(e.value=s[0]),t&&(t.value=s[s.length-1])}q(t)}function Mt(){let e=new Map;return n.filtered.forEach(t=>{let n=t._meta;!n||!n.control||e.has(n.control)||e.set(n.control,{control:n.control,mun:n.mun||`N/A`,seg:n.segmento||``,sec:n.sector||``})}),Array.from(e.values()).sort((e,t)=>e.control.localeCompare(t.control))}var Nt=e((()=>{r(),d(),At()}));function Pt(){let e=u(`btnLoadMM111`),t=u(`mm111SearchControl`),n=u(`mm111SearchResults`),r=u(`mm111ClearSearch`);if(!t||!n)return;let i=-1,a=e=>{let t=e.toLowerCase().trim(),r=Mt().filter(e=>e.control.toLowerCase().includes(t)||e.mun.toLowerCase().includes(t)||e.seg.toLowerCase().includes(t)).slice(0,50);i=-1,t.length>0||e.length===0?(n.classList.remove(`hidden`),kt(r,e),n.querySelectorAll(`.result-item`).forEach(e=>{e.onclick=()=>o(e.getAttribute(`data-value`))})):n.classList.add(`hidden`)},o=async e=>{t&&(t.value=e),n&&n.classList.add(`hidden`),e.trim().length>0&&r?.classList.remove(`hidden`);let i=u(`filterControl`);i&&(i.value=e),jt(e),I()};t.onfocus=()=>a(t.value),t.oninput=()=>{t.value.trim().length>0?r?.classList.remove(`hidden`):r?.classList.add(`hidden`),a(t.value)},t.onkeydown=e=>{let t=n.querySelectorAll(`.result-item`);e.key===`ArrowDown`?(e.preventDefault(),i=Math.min(i+1,t.length-1),s(t)):e.key===`ArrowUp`?(e.preventDefault(),i=Math.max(i-1,0),s(t)):e.key===`Enter`?(e.preventDefault(),i>=0&&t[i]?o(t[i].getAttribute(`data-value`)):t.length>0&&o(t[0].getAttribute(`data-value`))):e.key===`Escape`&&n.classList.add(`hidden`)};let s=e=>{e.forEach((e,t)=>{t===i?(e.classList.add(`active`,`bg-brand-blue/10`,`dark:bg-brand-blue/20`,`ring-1`,`ring-brand-blue/30`),e.scrollIntoView({block:`nearest`})):e.classList.remove(`active`,`bg-brand-blue/10`,`dark:bg-brand-blue/20`,`ring-1`,`ring-brand-blue/30`)})};r&&(r.onclick=async()=>{t.value=``,r.classList.add(`hidden`);let e=u(`filterControl`);e&&(e.value=``);let n=u(`filterFechaInicio`),i=u(`filterFechaFin`);n&&(n.value=``),i&&(i.value=``),t.focus(),a(``),I()}),e&&(e.onclick=()=>o(t.value.trim())),document.addEventListener(`click`,e=>{!t.contains(e.target)&&!n.contains(e.target)&&n.classList.add(`hidden`)})}var Ft=e((()=>{d(),Nt(),At(),ke(),document.addEventListener(`filtersApplied`,()=>{let e=u(`filterControl`)?.value,t=u(`mm111SearchControl`),n=u(`mm111ClearSearch`);t&&e&&t.value!==e?(t.value=e,n&&n.classList.remove(`hidden`),jt(e)):t&&!e&&t.value!==``&&(t.value=``,n&&n.classList.add(`hidden`),Ot(),q([]))})}));function It(){Lt||=(Pt(),!0);let e=u(`mm111SearchControl`),t=u(`mm111ClearSearch`),n=u(`mm111FilteredCount`);if(!e)return;n&&(n.textContent=u(`kpiControles`)?.textContent||`0`),e.value.trim().length===0?t?.classList.add(`hidden`):t?.classList.remove(`hidden`);let r=e.value.trim();r?jt(r):(Ot(),q([]))}var Lt,Rt=e((()=>{d(),Ft(),Nt(),At(),Lt=!1}));function zt(){return`
        <div class="col-span-full text-center py-10 text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" stroke-width="1.5" class="mx-auto mb-2 text-brand-green">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <p class="font-bold text-sm">Sin inconsistencias detectadas</p>
            <p class="text-xs mt-1 opacity-60">Todos los registros del filtro actual pasan las validaciones.</p>
        </div>`}function Bt(e,t,n){let r=w[e]||{label:e},i=Vt[e]||{bg:`#64748b22`,border:`#64748b`,text:`#64748b`},a=n===e,o=a?`ring-2 ring-offset-1 dark:ring-offset-[#0B1120]`:``,s=a?`ring-color: ${i.border}; border-color: ${i.border};`:`border-color:${i.border}30;`;return`
    <div class="alert-card ${o}"
         data-code="${e}"
         style="background:${i.bg}; ${s};">
        <div class="min-w-0 pr-2">
            <div class="text-[10px] sm:text-xs font-black uppercase tracking-widest mb-0.5 truncate"
                 style="color:${i.text}" title="${r.label}">${r.label}</div>
            <div class="text-[9px] text-slate-500 font-mono truncate opacity-60">${e}</div>
        </div>
        <div class="text-xl sm:text-2xl font-black font-outfit shrink-0 ml-auto" style="color:${i.text}">${t}</div>
    </div>`}var Vt,Ht=e((()=>{k(),Vt={TIEMPO_CORTO_EHM:{bg:`#F59E0B22`,border:`#F59E0B`,text:`#F59E0B`},TIEMPO_CORTO_ESCA:{bg:`#F59E0B22`,border:`#F59E0B`,text:`#F59E0B`},TIEMPO_CORTO:{bg:`#F59E0B22`,border:`#F59E0B`,text:`#F59E0B`},TIEMPO_LARGO:{bg:`#EF444422`,border:`#EF4444`,text:`#EF4444`},APERT_LEJOS:{bg:`#8B5CF622`,border:`#8B5CF6`,text:`#8B5CF6`},FUERA_SEGMENTO:{bg:`#EF444422`,border:`#EF4444`,text:`#EF4444`},SEGMENTO_INCORRECTO:{bg:`#EF444422`,border:`#EF4444`,text:`#EF4444`},ARRANQUE_INCONSISTENTE:{bg:`#F59E0B22`,border:`#F59E0B`,text:`#F59E0B`},LINEA_SERIE_INVALIDA:{bg:`#EF444422`,border:`#EF4444`,text:`#EF4444`},CEDULA_INVALIDA:{bg:`#EF444422`,border:`#EF4444`,text:`#EF4444`},INGRESO_ANOMALO:{bg:`#F59E0B22`,border:`#F59E0B`,text:`#F59E0B`},DESPLAZAMIENTO_ANOMALO:{bg:`#F59E0B22`,border:`#F59E0B`,text:`#F59E0B`}}}));function Ut(e=[]){n.inconsistenciasTabulator||(n.inconsistenciasTabulator=new Tabulator(`#inconsistenciasTable`,{data:e,layout:`fitColumns`,height:`500px`,responsiveLayout:`collapse`,placeholder:`<div style="padding:40px;text-align:center;color:var(--text-muted);font-size:14px;font-family:Inter,sans-serif;">No hay inconsistencias para mostrar</div>`,columnHeaderVertAlign:`bottom`,columns:[{formatter:`responsiveCollapse`,width:30,minWidth:30,hozAlign:`center`,headerSort:!1,resizable:!1,responsive:0},{title:`Encuestador`,field:`nombre`,minWidth:150,responsive:0,formatter:e=>`<div style="font-weight:700;">${e.getValue()}</div>`},{title:`Cédula`,field:`cedula`,width:100,responsive:2,cssClass:`font-mono`},{title:`Control`,field:`control`,width:100,responsive:0,cssClass:`font-mono text-brand-blue font-bold`},{title:`Fecha`,field:`fecha`,width:100,responsive:1,sorter:`date`},{title:`Semana`,field:`semana`,width:80,hozAlign:`center`,responsive:1},{title:`Alertas`,field:`alertas`,minWidth:200,headerSort:!1,responsive:0,formatter:e=>{let t=e.getValue();return t?t.map(e=>`<span style="display:inline-flex;align-items:center;background:rgba(239,68,68,0.1);color:#EF4444;border:1px solid rgba(239,68,68,0.2);border-radius:4px;padding:1px 6px;font-size:9px;font-weight:700;margin-right:3px;white-space:nowrap;">${(w[e]||{label:e}).label}</span>`).join(``):``}}]}),n.inconsistenciasTabulator.on(`rowClick`,(e,t)=>{let n=t.getData()._rec;n&&G(n)}))}function Wt(e){n.inconsistenciasTabulator?n.inconsistenciasTabulator.setData(e):Ut(e)}var Gt=e((()=>{r(),k(),K()}));function Kt(e){if(J.isEventsBound)return;J.isEventsBound=!0;let t=u(`incSearchInput`),n=u(`incClearSearch`),r=u(`incFilterAlerta`),i=u(`inconsistenciasCards`);t&&t.addEventListener(`input`,t=>{J.currentSearchQuery=t.target.value.trim().toLowerCase(),n&&n.classList.toggle(`hidden`,J.currentSearchQuery.length===0),e&&e()}),n&&n.addEventListener(`click`,()=>{t&&(t.value=``),J.currentSearchQuery=``,n.classList.add(`hidden`),e&&e()}),r&&r.addEventListener(`change`,t=>{J.currentAlertFilter=t.target.value,e&&e()}),i&&i.addEventListener(`click`,t=>{let n=t.target.closest(`.alert-card`);if(!n)return;let r=n.dataset.code;J.currentAlertFilter=J.currentAlertFilter===r?``:r,e&&e()})}var J,qt=e((()=>{d(),J={currentAlertFilter:``,currentSearchQuery:``,isEventsBound:!1}}));function Jt(){if(!u(`inconsistenciasContainer`))return;Kt(Jt);let e=n.filtered.filter(e=>e._meta&&e._meta.hasAlerts),t={};e.forEach(e=>{e._meta.alertas.forEach(e=>{t[e]=(t[e]||0)+1})});let r=e.length;Yt(t),Xt(t,r),Wt(Zt(e))}function Yt(e){let t=u(`incFilterAlerta`);if(!t)return;let n=Object.entries(e).sort((e,t)=>t[1]-e[1]),r=[`<option value="">Todas las alertas</option>`];n.forEach(([e,t])=>{let n=w[e]?w[e].label:e,i=e===J.currentAlertFilter?`selected`:``;r.push(`<option value="${e}" ${i}>${n} (${t})</option>`)});let i=r.join(``);t.innerHTML!==i&&(t.innerHTML=i)}function Xt(e,t){let n=u(`inconsistenciasCards`);n&&(t===0?n.innerHTML=zt():n.innerHTML=Object.entries(e).sort((e,t)=>t[1]-e[1]).map(([e,t])=>Bt(e,t,J.currentAlertFilter)).join(``))}function Zt(e){let t=e;return J.currentAlertFilter&&(t=t.filter(e=>e._meta.alertas.includes(J.currentAlertFilter))),J.currentSearchQuery&&(t=t.filter(e=>{let t=e._meta;return t.nombre&&t.nombre.toLowerCase().includes(J.currentSearchQuery)||t.cedula&&t.cedula.toLowerCase().includes(J.currentSearchQuery)||t.control&&t.control.toLowerCase().includes(J.currentSearchQuery)})),t.sort((e,t)=>{let n=t._meta.alertas.length-e._meta.alertas.length;return n===0?(t._meta.fecha||``).localeCompare(e._meta.fecha||``):n}).map(e=>({_rec:e,nombre:e._meta.nombre,cedula:e._meta.cedula,control:e._meta.control||`—`,fecha:e._meta.fecha||`—`,semana:e._meta.semana||`—`,alertas:e._meta.alertas}))}var Qt=e((()=>{r(),k(),d(),Ht(),Gt(),qt()}));function $t(e){if(typeof Chart>`u`)return;let t=e?`#ffffff`:`#000000`,r=e?`rgba(255,255,255,0.05)`:`rgba(0,0,0,0.05)`;Chart.defaults.color=t,Chart.defaults.scale.grid.color=r,typeof ChartDataLabels<`u`&&Chart.register(ChartDataLabels),Object.values(n.charts).forEach(e=>{e&&(e.options.color=t,e.options.plugins&&(e.options.plugins.datalabels&&(e.options.plugins.datalabels.color=t),e.options.plugins.legend&&e.options.plugins.legend.labels&&(e.options.plugins.legend.labels.color=t)),e.options.scales&&(e.options.scales.x&&e.options.scales.x.ticks&&(e.options.scales.x.ticks.color=t),e.options.scales.y&&e.options.scales.y.ticks&&(e.options.scales.y.ticks.color=t)),typeof e.update==`function`&&e.update(`none`))})}function Y(e){n.charts[e]&&(n.charts[e].destroy(),delete n.charts[e])}function X(){let e=document.documentElement.classList.contains(`dark`),t=e?`#ffffff`:`#000000`;return{responsive:!0,maintainAspectRatio:!1,color:t,plugins:{legend:{labels:{color:t,font:{size:11,family:`'Inter', sans-serif`,weight:`bold`}}},tooltip:{backgroundColor:e?`#1e293b`:`#ffffff`,titleColor:e?`#f1f5f9`:`#0f172a`,bodyColor:e?`#e2e8f0`:`#334155`,borderColor:e?`rgba(255,255,255,0.1)`:`rgba(0,0,0,0.1)`,titleFont:{weight:`bold`},bodyFont:{family:`'Inter', sans-serif`},borderWidth:1}},scales:{x:{ticks:{color:t,font:{size:11,family:`'Inter', sans-serif`,weight:`600`}},grid:{}},y:{ticks:{color:t,font:{size:11,family:`'Inter', sans-serif`,weight:`600`}},grid:{}}}}}var en,Z=e((()=>{r(),en={id:`centerText`,afterDraw:e=>{let t=e.config.options.plugins.centerText;if(t&&t.display!==!1){let{ctx:n,chartArea:{left:r,top:i,width:a,height:o}}=e;n.save();let s=document.documentElement.classList.contains(`dark`),c=s?`#ffffff`:`#000000`;n.font=`bold 18px Outfit`,n.fillStyle=c,n.textAlign=`center`,n.textBaseline=`middle`,n.fillText(t.text||``,r+a/2,i+o/2),n.font=`bold 9px Inter`,n.fillStyle=s?`#ffffff`:`#000000`,n.fillText(`TOTAL`,r+a/2,i+o/2+18),n.restore()}}},typeof Chart<`u`&&Chart.register(en)}));function tn(){Y(`enc`);let e={};n.filtered.forEach(t=>{let n=String(t._meta.nombre||`Desconocido`).split(` `)[0];e[n]=(e[n]||0)+1});let t=Object.entries(e).sort((e,t)=>t[1]-e[1]).slice(0,15),r=u(`chartEncuestador`);r&&(n.charts.enc=new Chart(r,{type:`bar`,data:{labels:t.map(e=>e[0]),datasets:[{label:`Encuestas`,data:t.map(e=>e[1]),backgroundColor:`#3B82F666`,borderColor:`#3B82F6`,borderWidth:1,borderRadius:4}]},options:{...X(),plugins:{...X().plugins,datalabels:{align:`top`,anchor:`end`,font:{weight:`bold`,size:10},color:document.documentElement.classList.contains(`dark`)?`#ffffff`:`#000000`,formatter:e=>e>0?e:``}}}}))}function nn(){Y(`dur`);let e={};n.filtered.forEach(t=>{let n=String(t._meta.nombre||`Desconocido`).split(` `)[0];t._meta.durMin!==null&&(e[n]||(e[n]=[]),e[n].push(t._meta.durMin))});let t=Object.entries(e).map(([e,t])=>[e,i(t)]).sort((e,t)=>t[1]-e[1]).slice(0,15),r=u(`chartDuracion`);r&&(n.charts.dur=new Chart(r,{type:`bar`,data:{labels:t.map(e=>e[0]),datasets:[{label:`Minutos Promedio`,data:t.map(e=>Math.round(e[1])),backgroundColor:`#8B5CF666`,borderColor:`#8B5CF6`,borderWidth:1,borderRadius:4}]},options:{...X(),plugins:{...X().plugins,datalabels:{align:`top`,anchor:`end`,font:{weight:`bold`,size:10},color:document.documentElement.classList.contains(`dark`)?`#ffffff`:`#000000`,formatter:e=>e>0?e:``}}}}))}function rn(){Y(`hor`);let e={};n.filtered.forEach(t=>{t._meta.hora!==null&&(e[t._meta.hora]=(e[t._meta.hora]||0)+1)});let t=Object.keys(e).map(Number).sort((e,t)=>e-t),r=t.map(e=>`${e}:00`),i=t.map(t=>e[t]),a=u(`chartHorario`);a&&(n.charts.hor=new Chart(a,{type:`bar`,data:{labels:r,datasets:[{label:`Encuestas Capturadas`,data:i,backgroundColor:`#10B98144`,borderColor:`#10B981`,borderWidth:1,borderRadius:4}]},options:{...X(),plugins:{...X().plugins,legend:{display:!1},datalabels:{align:`top`,anchor:`end`,font:{weight:`bold`,size:9},color:document.documentElement.classList.contains(`dark`)?`#ffffff`:`#000000`,formatter:e=>e>0?e:``}}}}))}function an(){Y(`htrans`);let e={};n.filtered.forEach(t=>{t._meta.hora_trans!==null&&t._meta.hora_trans!==void 0&&(e[t._meta.hora_trans]=(e[t._meta.hora_trans]||0)+1)});let t=Object.keys(e).map(Number).sort((e,t)=>e-t),r=t.map(e=>`${e}:00`),i=t.map(t=>e[t]),a=u(`chartHoraTransmision`);a&&(n.charts.htrans=new Chart(a,{type:`bar`,data:{labels:r,datasets:[{label:`Encuestas Transmitidas`,data:i,backgroundColor:`#F9731644`,borderColor:`#F97316`,borderWidth:1,borderRadius:4}]},options:{...X(),plugins:{...X().plugins,legend:{display:!1},datalabels:{align:`top`,anchor:`end`,font:{weight:`bold`,size:9},color:document.documentElement.classList.contains(`dark`)?`#ffffff`:`#000000`,formatter:e=>e>0?e:``}}}}))}var on=e((()=>{r(),d(),Z()}));function sn(e){let t=String(e).toUpperCase();for(let e in D)if(t.includes(e))return D[e].color;return D.DEFAULT.color}function cn(e){let t=String(e).toUpperCase();if(O[t])return O[t].color;for(let e in O)if(t.includes(e))return O[e].color;return O.DEFAULT.color}function ln(){Y(`cond`);let e={};n.filtered.forEach(t=>{let n=t._meta.condicion,r=C.condicion[n]||String(n).replace(/_/g,` `);e[r]=(e[r]||0)+1});let t=Object.entries(e),r=u(`chartCondicion`);if(!r)return;let i=t.reduce((e,t)=>e+t[1],0);n.charts.cond=new Chart(r,{type:`doughnut`,data:{labels:t.map(e=>e[0]),datasets:[{data:t.map(e=>e[1]),backgroundColor:t.map(e=>cn(e[0])+`aa`),borderColor:`#1c2128`,borderWidth:2,hoverOffset:15}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:`bottom`,labels:{color:document.documentElement.classList.contains(`dark`)?`#ffffff`:`#000000`,boxWidth:10,font:{size:10,weight:`bold`}}},datalabels:{color:document.documentElement.classList.contains(`dark`)?`#ffffff`:`#000000`,font:{weight:`bold`,size:11},formatter:e=>e>0?e:``},centerText:{text:String(i)}}}})}function un(){Y(`uso`);let e={};n.filtered.forEach(t=>{let n=t._meta.uso||`N/A`,r=C.uso[n]||String(n).replace(/_/g,` `).toUpperCase();e[r]=(e[r]||0)+1});let t=Object.entries(e).sort((e,t)=>t[1]-e[1]),r=u(`chartUso`);if(!r)return;let i=t.reduce((e,t)=>e+t[1],0);n.charts.uso=new Chart(r,{type:`doughnut`,data:{labels:t.map(e=>e[0]),datasets:[{data:t.map(e=>e[1]),backgroundColor:t.map(e=>sn(e[0])+`aa`),borderColor:`#1c2128`,borderWidth:2,hoverOffset:15}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:`bottom`,labels:{color:document.documentElement.classList.contains(`dark`)?`#ffffff`:`#000000`,boxWidth:10,font:{size:10,weight:`bold`}}},datalabels:{color:document.documentElement.classList.contains(`dark`)?`#ffffff`:`#000000`,font:{weight:`bold`,size:10},formatter:e=>e>0?e:``},centerText:{text:String(i)}}}})}function dn(){if(!u(`chartClasificacion`))return;Y(`clasif`);let e={"TIPO A":0,"TIPO B":0,"TIPO C":0,"TIPO E":0};n.filtered.forEach(t=>{let n=t._meta&&t._meta.tipo_vivienda;e.hasOwnProperty(n)&&e[n]++});let t=Object.entries(e),r=t.map(e=>e[0]),i=t.map(e=>e[1]),a=r.map(e=>cn(e)),o=i.reduce((e,t)=>e+t,0),s=u(`chartClasificacion`);n.charts.clasif=new Chart(s,{type:`doughnut`,data:{labels:r,datasets:[{data:i,backgroundColor:a.map(e=>e+`aa`),borderColor:`#1c2128`,borderWidth:2,hoverOffset:15}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:`bottom`,labels:{color:document.documentElement.classList.contains(`dark`)?`#ffffff`:`#000000`,boxWidth:10,font:{size:10,weight:`bold`}}},datalabels:{color:document.documentElement.classList.contains(`dark`)?`#ffffff`:`#000000`,font:{weight:`bold`,size:11},formatter:e=>e>0?e:``},centerText:{text:String(o)}}}})}var fn=e((()=>{r(),d(),k(),Z()}));function pn(){Y(`dia`);let e={};n.filtered.forEach(t=>{t._meta.fecha&&(e[t._meta.fecha]=(e[t._meta.fecha]||0)+1)});let t=Object.entries(e).sort(),r=u(`chartPorDia`);r&&(n.charts.dia=new Chart(r,{type:`line`,data:{labels:t.map(e=>e[0]),datasets:[{label:`Encuestas`,data:t.map(e=>e[1]),borderColor:`#10B981`,backgroundColor:`#10B98122`,fill:!0,tension:.3}]},options:{...X(),plugins:{...X().plugins,datalabels:{align:`top`,anchor:`end`,offset:2,font:{weight:`bold`,size:10},color:document.documentElement.classList.contains(`dark`)?`#ffffff`:`#000000`,formatter:e=>e>0?e:``}}}}))}function mn(){Y(`histo`);let e=[0,20,40,60,90,120,999],t=[`<20`,`20-40`,`40-60`,`60-90`,`90-120`,`>120`],r=Array(t.length).fill(0);n.filtered.forEach(t=>{let n=t._meta.durMin;if(n!==null){for(let t=0;t<e.length-1;t++)if(n<e[t+1]){r[t]++;break}}});let i=u(`chartHistograma`);i&&(n.charts.histo=new Chart(i,{type:`bar`,data:{labels:t,datasets:[{data:r,backgroundColor:`#F59E0B66`,borderColor:`#F59E0B`,borderWidth:1}]},options:X()}))}function hn(){Y(`semana`);let e=u(`chartResumenSemanal`);if(!e)return;let t=new Set;n.filtered.forEach(e=>{e._meta.semana&&t.add(e._meta.semana)});let r=[...t].sort();if(r.length===0)return;let i=new Set(n.filtered.map(e=>e._meta.cedula)),a=Object.values(n.encMap).filter(e=>i.has(e.cedula)&&e.semanas).sort((e,t)=>{let n=Object.values(e.semanas).reduce((e,t)=>e+t.size,0);return Object.values(t.semanas).reduce((e,t)=>e+t.size,0)-n}).slice(0,10).map((e,t)=>({label:String(e.nombre||`N/A`).split(` `)[0],data:r.map(t=>e.semanas[t]?e.semanas[t].size:0),backgroundColor:b[t%b.length]+`99`,borderColor:b[t%b.length],borderWidth:1,borderRadius:3}));n.charts.semana=new Chart(e,{type:`bar`,data:{labels:r,datasets:a},options:{...X(),plugins:{...X().plugins,legend:{position:`bottom`,labels:{boxWidth:10,font:{size:9}}}},scales:{x:{ticks:{font:{size:9}}},y:{beginAtZero:!0,ticks:{font:{size:9}},title:{display:!0,text:`Controles únicos`,font:{size:9}}}}}})}var gn=e((()=>{r(),d(),k(),Z()})),_n=e((()=>{Z(),on(),fn(),gn()}));function vn(){return`
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
        </div>
        <div class="card-premium border-l-2 border-l-brand-orange" title="Viviendas desocupadas, en construcción o de uso ocasional.">
          <div class="kpi-label !mt-0 mb-1 flex items-center gap-1.5"><i data-lucide="brick-wall" class="w-4 h-4 text-brand-orange"></i> TIPO B</div>
          <div class="flex items-baseline gap-2">
            <div class="kpi-value-text text-xl" id="kpiTipoB">0</div>
            <div class="text-[10px] font-bold text-slate-400 uppercase tracking-tighter" id="pctTipoB">0%</div>
          </div>
        </div>
        <div class="card-premium border-l-2 border-l-brand-red" title="Viviendas demolidas, inexistentes o de uso no residencial permanente.">
          <div class="kpi-label !mt-0 mb-1 flex items-center gap-1.5"><i data-lucide="hammer" class="w-4 h-4 text-brand-red"></i> TIPO C</div>
          <div class="flex items-baseline gap-2">
            <div class="kpi-value-text text-xl" id="kpiTipoC">0</div>
            <div class="text-[10px] font-bold text-slate-400 uppercase tracking-tighter" id="pctTipoC">0%</div>
          </div>
        </div>
        <div class="card-premium border-l-2 border-l-brand-emerald" title="Viviendas con entrevistas exitosas (Ocupadas con ocupantes presentes).">
          <div class="kpi-label !mt-0 mb-1 flex items-center gap-1.5"><i data-lucide="user-check" class="w-4 h-4 text-brand-emerald"></i> TIPO E</div>
          <div class="flex items-baseline gap-2">
            <div class="kpi-value-text text-xl" id="kpiTipoE">0</div>
            <div class="text-[10px] font-bold text-slate-400 uppercase tracking-tighter" id="pctTipoE">0%</div>
          </div>
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
    </div>`}var yn=e((()=>{}));function bn(){return`
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
          
          <button id="btnMapFilterAll" class="glass-panel rounded-xl p-3 flex items-center justify-between border-l-4 border-brand-blue hover:bg-slate-100/50 dark:hover:bg-white/5 transition-all group active-filter">
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

          <button id="btnVerRutaEncuestador" disabled class="glass-panel rounded-xl p-3 flex items-center justify-between border-l-4 border-brand-orange hover:bg-brand-orange/5 transition-all group disabled:opacity-40 disabled:cursor-not-allowed">
            <div class="flex items-center gap-1.5">
              <i data-lucide="route" class="w-3.5 h-3.5 text-brand-orange opacity-80"></i>
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
        <div class="flex-1 bg-white dark:bg-slate-900 relative">
          <div id="detailGrid" class="absolute inset-0 border-0"></div>
        </div>
      </div>
    </div>`}var xn=e((()=>{}));function Sn(){return`
    <div id="tab-ranking" class="tab-content flex flex-col gap-8 hidden-tab animate-fade-in">
      <!-- Resumen de Desempeño Global -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="glass-panel rounded-2xl p-4 border-l-4 border-brand-emerald">
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

        <div class="glass-panel rounded-2xl p-4 border-l-4 border-brand-orange">
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

        <div class="glass-panel rounded-2xl p-4 border-l-4 border-brand-red">
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
    </div>`}var Cn=e((()=>{}));function wn(){return`
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
          <div class="px-4 py-3 flex flex-col items-center justify-center text-center bg-slate-100 dark:bg-surface-dark">
            <span class="text-[9px] uppercase font-bold text-slate-500">Segmento</span>
            <div class="text-sm font-black font-outfit mt-1 text-slate-800 dark:text-slate-300" id="mm111Segmento">-</div>
          </div>
          <div class="px-4 py-3 flex flex-col items-center justify-center text-center bg-slate-100 dark:bg-surface-dark">
            <span class="text-[9px] uppercase font-bold text-slate-500">Sector</span>
            <div class="text-sm font-black font-outfit mt-1 text-slate-800 dark:text-slate-300" id="mm111Sector">-</div>
          </div>
          <div class="px-4 py-3 flex flex-col items-center justify-center text-center bg-slate-100 dark:bg-surface-dark">
            <span class="text-[9px] uppercase font-bold text-slate-500">Nodo</span>
            <div class="text-sm font-black font-outfit mt-1 text-slate-800 dark:text-slate-300" id="mm111Nodo">-</div>
          </div>
          <div class="px-4 py-3 flex flex-col items-center justify-center text-center bg-slate-100 dark:bg-surface-dark">
            <span class="text-[9px] uppercase font-bold text-slate-500">Semana</span>
            <div class="text-sm font-black font-outfit mt-1 text-slate-800 dark:text-slate-300" id="mm111Semana">-</div>
          </div>
          <div class="px-4 py-3 flex flex-col items-center justify-center text-center bg-slate-100 dark:bg-surface-dark col-span-2 sm:col-span-4 lg:col-span-1">
            <span class="text-[9px] uppercase font-bold text-slate-500">Control Maestro</span>
            <div class="text-sm font-black font-outfit mt-1 text-slate-800 dark:text-slate-300 truncate w-full" id="mm111ControlMaestro">-</div>
          </div>
          <div class="px-4 py-3 flex flex-col items-center justify-center text-center bg-amber-200 dark:bg-amber-400">
            <span class="text-[10px] uppercase font-black text-amber-800">Control Nro.</span>
            <div class="text-lg font-black font-outfit text-amber-900" id="mm111ControlNro">0000</div>
          </div>
          <div class="px-4 py-3 flex flex-col items-center justify-center text-center bg-slate-100 dark:bg-surface-dark">
            <span class="text-[9px] uppercase font-bold text-slate-500">Lote</span>
            <div class="text-sm font-black font-outfit mt-1 text-slate-800 dark:text-slate-300" id="mm111Lote">-</div>
          </div>
        </div>
      </div>

      <!-- Tabla de Listado de Viviendas -->
      <div class="card-premium flex-1 flex flex-col p-0 overflow-hidden border-2 border-slate-200 dark:border-slate-700 mt-4 relative min-h-[500px] lg:min-h-0">
        <div id="mm111Grid" class="w-full h-full bg-white dark:bg-surface-dark"></div>
      </div>
    </div>`}var Tn=e((()=>{}));function En(){return`
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
    </div>`}var Dn=e((()=>{}));function On(){return`
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
    </div>`}var kn=e((()=>{}));function An(){return`
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
    </div>`}var jn=e((()=>{}));function Mn(){return`
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
    </div>`}var Nn=e((()=>{}));function Pn(){return`
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
    </div>`}var Fn=e((()=>{}));function In(){let e=u(`mainContent`),t=document.body;if(!e){console.error(`Layout Error: mainContent element not found.`);return}let n=[vn(),bn(),Sn(),wn(),En()].join(``);e.insertAdjacentHTML(`beforeend`,n);let r=[On(),An(),Mn(),Pn()].join(``);t.insertAdjacentHTML(`beforeend`,r),console.log(`UI Layout: All components injected successfully ✓`)}var Ln=e((()=>{d(),yn(),xn(),Cn(),Tn(),Dn(),kn(),jn(),Nn(),Fn()}));function Rn(){let e=localStorage.getItem(`esca_theme`),t=!0;e===`light`?t=!1:e===`dark`&&(t=!0),zn(t);let n=u(`btnThemeToggle`);n&&n.addEventListener(`click`,()=>{zn(!document.documentElement.classList.contains(`dark`))})}function zn(e){e?(document.documentElement.classList.add(`dark`),localStorage.setItem(`esca_theme`,`dark`)):(document.documentElement.classList.remove(`dark`),localStorage.setItem(`esca_theme`,`light`)),$t(e)}var Bn=e((()=>{d(),_n()}));function Vn(){let e=n.filtered.filter(e=>e._meta&&e._meta.estado===`completada`).length,t=n.filtered.length-e,r=new Set(n.filtered.map(e=>e._meta.cedula)).size,a=n.filtered.filter(e=>e._meta.estado===`completada`).map(e=>e._meta.durMin).filter(e=>e!==null),o=a.length?i(a):0,s=n.filtered.reduce((e,t)=>e+(t._meta.totalPers||0),0),c=n.filtered.reduce((e,t)=>e+(t._meta.hogaresUniPersonales||0),0),l=new Set(n.filtered.map(e=>e._meta.control)).size,d=n.filtered.reduce((e,t)=>e+(t._meta.totalHombres||0),0),f=n.filtered.reduce((e,t)=>e+(t._meta.totalMujeres||0),0),p=new Set(n.filtered.map(e=>e._meta.mun)).size,m=n.filtered.filter(e=>e._meta&&e._meta.tipo_vivienda===`TIPO A`).length,h=n.filtered.filter(e=>e._meta&&e._meta.tipo_vivienda===`TIPO B`).length,g=n.filtered.filter(e=>e._meta&&e._meta.tipo_vivienda===`TIPO C`).length,_=n.filtered.filter(e=>e._meta&&e._meta.tipo_vivienda===`TIPO E`).length,v=n.filtered.filter(e=>e._meta&&e._meta.tipo_vivienda===`NO DEFINIDO`).length,y=n.filtered.length||1,ee=Math.round(m/y*100),b=Math.round(h/y*100),x=Math.round(g/y*100),S=Math.round(_/y*100),C=Math.round(v/y*100);u(`kpiTotal`)&&(u(`kpiTotal`).textContent=n.filtered.length),u(`kpiCompletadas`)&&(u(`kpiCompletadas`).textContent=e),u(`kpiNoEfectiva`)&&(u(`kpiNoEfectiva`).textContent=t),u(`kpiEncuestadores`)&&(u(`kpiEncuestadores`).textContent=r),u(`kpiDuracion`)&&(u(`kpiDuracion`).textContent=o?`${Math.round(o)} min`:`N/A`),u(`kpiPersonas`)&&(u(`kpiPersonas`).textContent=s),u(`kpiHogaresUni`)&&(u(`kpiHogaresUni`).textContent=c),u(`kpiControles`)&&(u(`kpiControles`).textContent=l),u(`kpiHombres`)&&(u(`kpiHombres`).textContent=d),u(`kpiMujeres`)&&(u(`kpiMujeres`).textContent=f),u(`kpiMunicipios`)&&(u(`kpiMunicipios`).textContent=p),u(`kpiTipoA`)&&(u(`kpiTipoA`).textContent=m),u(`pctTipoA`)&&(u(`pctTipoA`).textContent=`${ee}%`),u(`kpiTipoB`)&&(u(`kpiTipoB`).textContent=h),u(`pctTipoB`)&&(u(`pctTipoB`).textContent=`${b}%`),u(`kpiTipoC`)&&(u(`kpiTipoC`).textContent=g),u(`pctTipoC`)&&(u(`pctTipoC`).textContent=`${x}%`),u(`kpiTipoE`)&&(u(`kpiTipoE`).textContent=_),u(`pctTipoE`)&&(u(`pctTipoE`).textContent=`${S}%`),u(`kpiTipoND`)&&(u(`kpiTipoND`).textContent=v),u(`pctTipoND`)&&(u(`pctTipoND`).textContent=`${C}%`);let w=n.filtered.length/(r*8||1);u(`kpiEncPerHour`)&&(u(`kpiEncPerHour`).textContent=w.toFixed(1));let T={};n.filtered.forEach(e=>{let t=e._meta&&e._meta.nombre||`Desconocido`;T[t]=(T[t]||0)+1});let E=Object.entries(T).sort((e,t)=>t[1]-e[1])[0]||[`--`,0];u(`kpiTopProducer`)&&(u(`kpiTopProducer`).textContent=String(E[0]).split(` `)[0]),u(`kpiTopProducerVal`)&&(u(`kpiTopProducerVal`).textContent=`${E[1]} encuestas`);let D=n.filtered.filter(e=>e._meta&&e._meta.hasAlerts).length,O=n.filtered.length>0?Math.round(e/n.filtered.length*100):0,k=n.filtered.length>0?Math.round(D/n.filtered.length*100):0;u(`kpiTasaEfectividad`)&&(u(`kpiTasaEfectividad`).textContent=`${O}%`),u(`kpiTotalAlertas`)&&(u(`kpiTotalAlertas`).textContent=D),u(`kpiTasaAlerta`)&&(u(`kpiTasaAlerta`).textContent=`${k}%`);let A={};n.filtered.forEach(e=>{e._meta&&e._meta.hora!==null&&(A[e._meta.hora]=(A[e._meta.hora]||0)+1)});let j=Object.entries(A).sort((e,t)=>t[1]-e[1])[0]||[null,0];u(`kpiPeakHour`)&&(u(`kpiPeakHour`).textContent=j[0]===null?`--`:`${j[0]}:00`);let M=u(`inputMetaDiaria`),N=r*(M&&!isNaN(Number(M.value))&&Number(M.value)>0?Number(M.value):20),P=Math.min(100,n.filtered.length/(N||1)*100);u(`kpiMetaProgreso`)&&(u(`kpiMetaProgreso`).textContent=`${Math.round(P)}%`),u(`kpiMetaBar`)&&(u(`kpiMetaBar`).style.width=`${P}%`),u(`rankKpiEfectivas`)&&(u(`rankKpiEfectivas`).textContent=e),u(`rankKpiNoEfectiva`)&&(u(`rankKpiNoEfectiva`).textContent=t),u(`rankKpiAlerts`)&&(u(`rankKpiAlerts`).textContent=D)}var Hn=e((()=>{r(),d()}));function Un(e){if(!e)return;let t=u(`mainTabs`);t&&t.querySelectorAll(`.tab-btn`).forEach(t=>{let n=t.dataset.tab===e;t.classList.toggle(`tab-btn-active`,n),t.classList.toggle(`active`,n)}),document.querySelectorAll(`.tab-content`).forEach(t=>{t.classList.toggle(`hidden-tab`,t.id!==e)}),e===`tab-mapa`&&(n.map||gt(),setTimeout(()=>{n.map.invalidateSize(),setTimeout(()=>{let e=!1;Q[`tab-mapa`]||(Q[`tab-mapa`]=!0,ot(),e=!0),St(),n.detailTable&&!e&&n.detailTable.redraw(!0),window.lucide&&window.lucide.createIcons()},200)},50)),e===`tab-ranking`&&(Q[`tab-ranking`]?n.rankingTabulator&&setTimeout(()=>n.rankingTabulator.redraw(!0),50):(Q[`tab-ranking`]=!0,setTimeout(()=>ct(),100))),e===`tab-mm111`&&(n.mm111Table&&n.mm111Table.redraw(),!n.mm111Table&&n.filtered.length>0&&It()),setTimeout(()=>{Object.values(n.charts).forEach(e=>{e&&typeof e.resize==`function`&&(e.update(`none`),e.resize())}),window.dispatchEvent(new Event(`resize`))},50),window.lucide&&window.lucide.createIcons()}var Q,Wn=e((()=>{r(),d(),wt(),ut(),Rt(),Qt(),Q={}}));function $(e){let t=u(`mapSectionWrapper`),r=u(`mapKpiGrid`),i=u(`mapDisplayContainer`),a=r?r.querySelector(`.header-label`):null;if(!t||!r||!i)return;document.body.classList.remove(`has-map-fullscreen`),t.className=`flex flex-col lg:grid lg:grid-cols-12 gap-4 sm:gap-8 transition-all duration-500 overflow-visible items-stretch`,i.className=`lg:col-span-10 relative transition-all duration-500 rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-slate-900`,r.className=`lg:col-span-2 transition-all duration-500 overflow-visible flex flex-col gap-3`,a&&(a.className=`header-label text-[9px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-widest ml-1 mb-1`);let o=u(`btnToggleMapKpis`);if(o&&o.classList.add(`hidden`),r.querySelectorAll(`button:not(#btnToggleMapKpis), div.glass-panel`).forEach(e=>{e.className=e.id===`btnVerRutaEncuestador`?`glass-panel rounded-xl p-3 flex items-center justify-between border-l-4 border-brand-orange hover:bg-brand-orange/5 transition-all group disabled:opacity-40 disabled:cursor-not-allowed`:`glass-panel rounded-xl p-3 flex items-center justify-between border-l-4 hover:bg-slate-100/50 dark:hover:bg-white/5 transition-all group`,e.id===`btnMapFilterAll`&&e.classList.add(`border-brand-blue`),e.id===`btnMapFilterEfectivas`&&e.classList.add(`border-brand-emerald`),e.id===`btnMapFilterNoEfectiva`&&e.classList.add(`border-brand-orange`),e.id===`btnMapFilterAlertas`&&e.classList.add(`border-brand-red`),(e.classList.contains(`opacity-80`)||e.id===`kpiMapEncuestadorContainer`)&&e.classList.add(`border-brand-purple`);let t=e.querySelector(`span.uppercase`);t&&t.classList.remove(`hidden`)}),e===`normal`)t.classList.add(`h-auto`,`lg:h-[88vh]`,`lg:min-h-[700px]`),i.classList.add(`h-[500px]`,`lg:h-auto`,`lg:col-span-10`),r.classList.add(`grid`,`grid-cols-2`,`sm:flex`,`sm:flex-col`,`gap-2`),a&&a.classList.add(`hidden`,`sm:block`),r.querySelectorAll(`:scope > button, :scope > div.glass-panel`).forEach(e=>{e.id!==`btnToggleMapKpis`&&e.classList.add(`flex-row`,`items-center`,`justify-between`)});else if(e===`expanded`)t.className=`flex flex-col items-center gap-6 transition-all duration-500 w-full mb-8`,i.className=`w-full h-[75vh] relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10`,r.className=`flex flex-wrap sm:flex-nowrap grid grid-cols-2 sm:flex flex-row gap-2 sm:gap-8 mt-4 sm:mt-6 mx-auto max-w-[95%] sm:max-w-fit bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-white/10 px-4 sm:px-10 py-1.5 sm:py-2 shadow-2xl`,a&&a.classList.add(`hidden`),r.querySelectorAll(`:scope > button, :scope > div.glass-panel`).forEach(e=>{e.id!==`btnToggleMapKpis`&&e.classList.add(`flex-col`,`items-center`,`justify-center`,`min-w-0`,`sm:min-w-[130px]`,`flex-1`,`border-l-0`,`border-b-2`,`sm:border-b-4`,`gap-0.5`,`py-1`,`sm:py-1.5`,`px-2`)});else if(e===`full`){i.className=`map-fullscreen fixed inset-0 z-[var(--z-map-full)] bg-slate-900`,document.body.classList.add(`has-map-fullscreen`),r.className=`flex flex-col-reverse sm:flex-row fixed bottom-40 sm:bottom-6 left-4 sm:left-1/2 sm:-translate-x-1/2 z-[var(--z-map-full-controls)] gap-2 transition-all duration-300 items-start sm:items-center w-auto sm:max-w-fit`;let e=u(`btnToggleMapKpis`);e&&e.classList.remove(`hidden`),a&&a.classList.add(`hidden`),r.querySelectorAll(`:scope > button, :scope > div.glass-panel`).forEach(e=>{if(e.id===`btnToggleMapKpis`)return;e.classList.add(`flex`,`flex-col`,`items-center`,`justify-center`,`min-w-[55px]`,`sm:min-w-[75px]`,`border-2`,`rounded-xl`,`shadow-lg`,`gap-0`,`p-2`);let t=e.querySelector(`span.uppercase`);t&&t.classList.add(`hidden`),e.classList.add(`kpi-drawer-item`)}),r.classList.add(`kpi-drawer-collapsed`)}[`Normal`,`Expanded`,`Full`].forEach(t=>{let n=u(`btnMapState${t}`);if(n){let r=e===t.toLowerCase();n.classList.toggle(`bg-white/30`,r)}}),window.lucide&&window.lucide.createIcons(),setTimeout(()=>{n.map&&n.map.invalidateSize()},600)}var Gn=e((()=>{r(),d()}));function Kn(e){let{onProcessData:t}=e,r=()=>{Oe(),[`filterINE`,`filterSEGEN`].forEach(e=>{u(e)&&u(e).classList.remove(`active`,`bg-brand-emerald`,`bg-brand-purple`,`text-white`,`border-brand-emerald`,`border-brand-purple`)}),n.filterINE=!1,n.filterSEGEN=!1};u(`btnReset`)&&(u(`btnReset`).onclick=r),u(`btnResetOffcanvas`)&&(u(`btnResetOffcanvas`).onclick=r),u(`btnRefresh`)&&u(`btnRefresh`).addEventListener(`click`,()=>{let e=u(`assetSelect`).value;e&&P(e,t)}),u(`btnRetryConnection`)&&u(`btnRetryConnection`).addEventListener(`click`,()=>N(t)),u(`assetSelect`)&&u(`assetSelect`).addEventListener(`change`,e=>P(e.target.value,t)),u(`searchEncuesta`)&&u(`searchEncuesta`).addEventListener(`input`,()=>I()),u(`btnOpenFilters`)&&(u(`btnOpenFilters`).onclick=Ae),u(`btnCloseFilters`)&&u(`btnCloseFilters`).addEventListener(`click`,je),u(`filtersOverlay`)&&u(`filtersOverlay`).addEventListener(`click`,je),u(`btnApplyFilters`)&&u(`btnApplyFilters`).addEventListener(`click`,()=>{je(),I()});let i=(e,t,r,i,a)=>{let o=u(e);o&&(o.onclick=()=>{n[t]=!n[t],n[t]&&(n[a]=!1),o.classList.toggle(`active`,n[t]),o.classList.toggle(r,n[t]),o.classList.toggle(`text-white`,n[t]),o.classList.toggle(`border-${r.split(`-`)[1]}-${r.split(`-`)[2]}`,n[t]);let e=u(i);e&&e.classList.remove(`active`,`bg-brand-emerald`,`bg-brand-purple`,`text-white`,`border-brand-emerald`,`border-brand-purple`),I()})};i(`filterINE`,`filterINE`,`bg-brand-emerald`,`filterSEGEN`,`filterSEGEN`),i(`filterSEGEN`,`filterSEGEN`,`bg-brand-purple`,`filterINE`,`filterINE`),[`filterEncuestador`,`filterFechaInicio`,`filterFechaFin`,`filterHoraTransmision`,`filterHoraInicio`].forEach(e=>{u(e)&&u(e).addEventListener(`change`,I)});let a=u(`inputMetaDiaria`);if(a){try{let e=localStorage.getItem(`esca_meta_diaria`);e&&!isNaN(Number(e))&&(a.value=e)}catch{}a.addEventListener(`input`,()=>{try{localStorage.setItem(`esca_meta_diaria`,a.value)}catch{}Vn()})}u(`filterMunicipio`)&&u(`filterMunicipio`).addEventListener(`change`,()=>{let e=u(`filterMunicipio`).value,t=u(`filterParroquia`),r=u(`filterNodo`);if(!t||!r)return;t.innerHTML=`<option value="">Todas</option>`,r.innerHTML=`<option value="">Todos</option>`;let i=new Set,a=new Set;n.rawData.forEach(t=>{t._meta&&(e===``||t._meta.mun===e)&&(t._meta.par&&i.add(t._meta.par),t._meta.nodo&&a.add(t._meta.nodo))}),[...i].sort().forEach(e=>{let n=document.createElement(`option`);n.value=e,n.textContent=e,t.appendChild(n)}),[...a].sort().forEach(e=>{let t=document.createElement(`option`);t.value=e,t.textContent=e,r.appendChild(t)})}),Object.entries({All:`all`,Efectivas:`efectivas`,NoEfectiva:`no_efectiva`,Alertas:`alertas`}).forEach(([e,t])=>{let n=u(`btnMapFilter${e}`);n&&n.addEventListener(`click`,()=>{typeof window.setQuickFilter==`function`&&window.setQuickFilter(t)})}),u(`btnMapStateNormal`)&&u(`btnMapStateNormal`).addEventListener(`click`,()=>$(`normal`)),u(`btnMapStateExpanded`)&&u(`btnMapStateExpanded`).addEventListener(`click`,()=>$(`expanded`)),u(`btnMapStateFull`)&&u(`btnMapStateFull`).addEventListener(`click`,()=>$(`full`)),u(`btnToggleMapKpis`)&&u(`btnToggleMapKpis`).addEventListener(`click`,()=>{let e=u(`mapKpiGrid`);if(e){let t=e.classList.contains(`kpi-drawer-collapsed`);e.classList.toggle(`kpi-drawer-collapsed`,!t),e.classList.toggle(`kpi-drawer-expanded`,t)}}),document.querySelectorAll(`.tab-btn`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault(),Un(e.dataset.tab)})}),document.querySelectorAll(`.sort-btn`).forEach(t=>{t.addEventListener(`click`,()=>{n.currentSort=t.dataset.sort,document.querySelectorAll(`.sort-btn`).forEach(e=>e.classList.remove(`active`)),t.classList.add(`active`);let{renderRankingTable:r}=e;r&&r()})}),u(`btnDetailExpand`)&&u(`btnDetailExpand`).addEventListener(`click`,()=>{typeof window.toggleDetailModalExpand==`function`&&window.toggleDetailModalExpand()}),u(`btnDetailClose`)&&u(`btnDetailClose`).addEventListener(`click`,()=>{let{closeDetailModal:t}=e;t&&t()}),u(`detailModalBackdrop`)&&u(`detailModalBackdrop`).addEventListener(`click`,()=>{let{closeDetailModal:t}=e;t&&t()}),document.addEventListener(`keydown`,t=>{if(t.key===`Escape`){let t=u(`detailModal`);if(t&&!t.classList.contains(`hidden`)){let{closeDetailModal:t}=e;t&&t()}}})}var qn=e((()=>{r(),d(),te(),z(),Gn(),Wn(),Hn()}));t((()=>{r(),d(),te(),we(),z(),ut(),wt(),K(),Rt(),Qt(),_n(),Ln(),Bn(),Hn(),Wn(),Gn(),qn(),console.log(`main.js: Modular orchestrator initializing ✓`);function e(){console.log(`main.js: renderAll() starting`);try{Vn()}catch(e){console.error(`KPI Update Error:`,e)}[tn,nn,rn,an,mn,ln,un,dn,pn,hn].forEach(e=>{try{e()}catch(t){console.warn(`Chart Renderer Error (${e.name}):`,t)}});try{St()}catch(e){console.error(`Map Render Error:`,e)}try{ot()}catch(e){console.error(`Grid Update Error:`,e)}try{ct()}catch(e){console.error(`Ranking Table Error:`,e)}try{It()}catch(e){console.error(`MM111 Error:`,e)}try{Jt()}catch(e){console.error(`Inconsistencias Error:`,e)}window.lucide&&lucide.createIcons()}De(e);var t=()=>{Se(),Me(),n.filtered=[...n.rawData],e()};async function i(){In(),Rn(),console.log(`main.js: init() start`),a(),$(`normal`),Kn({onProcessData:t,renderRankingTable:ct,closeDetailModal:Ze}),o(),Promise.allSettled([dt(),pt().then(()=>{n.rawData.length>0&&(console.log(`main.js: Refreshing data with catalog index…`),t())}),N(e=>P(e,t))]).then(()=>{console.log(`main.js: Bootstrap phase completed.`),window.lucide&&lucide.createIcons()})}function a(){let e=u(`currentDateDisplay`);e&&(e.textContent=new Date().toLocaleDateString(`es-ES`,{weekday:`long`,year:`numeric`,month:`long`,day:`numeric`}))}function o(){let e=[];typeof Tabulator>`u`&&e.push(`Tabulator`),typeof Chart>`u`&&e.push(`Chart.js`),typeof L>`u`&&e.push(`Leaflet`);let t=u(`libCheckWarn`);e.length>0?(console.error(`CRITICAL: Missing libraries:`,e.join(`, `)),t&&t.classList.remove(`hidden`)):t&&t.classList.add(`hidden`)}document.addEventListener(`DOMContentLoaded`,()=>{i(),bt()}),window.setMapStateForDebug=$,window.switchTabForDebug=Un}))();