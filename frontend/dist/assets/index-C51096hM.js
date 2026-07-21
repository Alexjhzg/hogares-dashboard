const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./reportes-DrSnxbD3.js","./core-VcZXWso8.js"])))=>i.map(i=>d[i]);
import{_ as e,a as t,c as n,d as r,f as i,g as a,h as o,i as s,l as c,m as l,n as u,p as d,r as f,s as p,t as m,u as h,v as g,y as _}from"./core-VcZXWso8.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function v(e){return e.reduce((e,t)=>e+t,0)/e.length}function y(e){if(!e)return null;try{let t=String(e).trim().split(/\s+/);return t.length<2?null:[parseFloat(t[0]),parseFloat(t[1])]}catch{return null}}function b(e,t){if(!e||!t)return!1;let n=String(e).trim(),r=String(t).trim();return!!(n===r||n.padStart(3,`0`)===r.padStart(3,`0`)||n.endsWith(r)||r.endsWith(n))}var x,S=a((()=>{x=e=>document.getElementById(e)}));function C(e,t=`info`,n=2800){let r=w[t]||w.info,i=T[t]||T.info,a=document.createElement(`div`);a.className=[`fixed bottom-6 left-1/2 -translate-x-1/2 z-[999]`,`px-4 py-2.5 rounded-xl text-xs font-bold shadow-xl`,`text-white flex items-center gap-2 transition-opacity duration-300`,r].join(` `),a.setAttribute(`role`,`status`),a.setAttribute(`aria-live`,`polite`),a.innerHTML=`<span aria-hidden="true">${i}</span><span>${e}</span>`,document.body.appendChild(a),setTimeout(()=>{a.style.opacity=`0`,setTimeout(()=>a.remove(),300)},n)}var w,T,E=a((()=>{w={success:`bg-emerald-500`,warning:`bg-amber-500`,info:`bg-indigo-500`},T={success:`✓`,warning:`⚠`,info:`ℹ`}})),D=a((()=>{S(),E()}));function O(e){let t=x(`loadingOverlay`),n=x(`loadingMsg`);t&&(j&&=(clearTimeout(j),null),t.style.display=`flex`,setTimeout(()=>{t.style.opacity=`1`,t.style.pointerEvents=`all`},10),n&&(n.textContent=e))}function k(){let e=x(`loadingOverlay`);e&&(j&&clearTimeout(j),e.style.opacity=`0`,e.style.pointerEvents=`none`,j=setTimeout(()=>{e.style.display=`none`,j=null},500))}function A(e){let t=document.getElementById(`connectionStatus`),n=document.getElementById(`connectionDot`),r=document.getElementById(`connectionPing`);!t||!n||(e?(t.textContent=`Live Connection`,t.classList.remove(`text-amber-500`),t.classList.add(`text-emerald-400`),n.className=`relative inline-flex rounded-full h-2 w-2 bg-brand-emerald`,r&&(r.className=`animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-emerald opacity-75`)):(t.textContent=`Modo Offline - Datos Cacheados`,t.classList.remove(`text-emerald-400`,`text-slate-400`),t.classList.add(`text-amber-500`),n.className=`relative inline-flex rounded-full h-2 w-2 bg-amber-500`,r&&(r.className=`absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-20`)))}var j,M=a((()=>{D(),j=null})),N,P,F,I=a((()=>{N=`KoboDashboardDB`,P=`cacheStore`,F={async open(){return new Promise((e,t)=>{let n=indexedDB.open(N,1);n.onerror=()=>t(`Error opening DB`),n.onupgradeneeded=e=>{let t=e.target.result;t.objectStoreNames.contains(P)||t.createObjectStore(P)},n.onsuccess=t=>e(t.target.result)})},async get(e){try{let t=await this.open();return new Promise((n,r)=>{let i=t.transaction(P,`readonly`).objectStore(P).get(e);i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)})}catch(e){return console.error(`IndexedDB Get Error:`,e),null}},async set(e,t){try{let n=await this.open();return new Promise((r,i)=>{let a=n.transaction(P,`readwrite`).objectStore(P).put(t,e);a.onsuccess=()=>r(),a.onerror=()=>i(a.error)})}catch(e){console.error(`IndexedDB Set Error:`,e)}}}}));async function R(){let e=await fetch(`/api/assets`);if(!e.ok)throw Error(`Error API (${e.status}) at fetchAssets`);return await e.json()}async function z(e,t=!1,n=``){if(!e)throw Error(`Missing UID in fetchSurveyData`);let r=new URLSearchParams;t&&r.set(`refresh`,`true`),n&&r.set(`next_uid`,n);let i=`/api/data/${e}${r.toString()?`?${r.toString()}`:``}`,a=await fetch(i);if(!a.ok)throw Error(`Error API (${a.status}) at fetchSurveyData`);return await a.json()}function ee(e){e&&fetch(`/api/prefetch/${e}`,{method:`POST`}).then(t=>{t.ok&&console.info(`[api/services] Prefetch scheduled → ${e}`)}).catch(t=>console.warn(`[api/services] Prefetch request failed → ${e}:`,t))}var te=a((()=>{m()}));async function ne(e){console.log(`api/index.js: Orchestrating loadAssets()...`),O(`Buscando formularios en KoboToolbox…`);let t=null;try{t=await R(),await F.set(`assets_cache`,t),A(!0)}catch(e){console.warn(`Network failure. Trying cache...`,e),t=await F.get(`assets_cache`),t&&A(!1)}if(!t){k(),x(`errorState`)&&(x(`errorState`).style.display=`flex`);let e=x(`statusBadge`);e&&(e.textContent=`Error de conexión`,e.classList.remove(`active`)),A(!1);return}let n=x(`assetSelect`);n&&(n.innerHTML=`<option value="">— Seleccionar encuesta —</option>`,t.forEach(e=>{let t=document.createElement(`option`);t.value=e.uid,t.textContent=e.name,n.appendChild(t)}),n.addEventListener(`change`,()=>{let e=n.options[n.selectedIndex];l.assetName=e?e.textContent.trim():``}));let r=x(`statusBadge`);r&&(r.textContent=`Formularios Listos`),window.lucide&&lucide.createIcons();let i=t.find(e=>e.name.toLowerCase().includes(`esca`)&&e.name.toLowerCase().includes(`v4`))||t.find(e=>e.name.toLowerCase().includes(`esca`)&&e.name.toLowerCase().includes(`v3`))||t[0];if(i){n&&(n.value=i.uid),l.assetName=i.name,e&&e(i.uid);let r=t.find(e=>e.uid!==i.uid);r&&ee(r.uid)}else k()}async function re(e,t,n=!1){if(!e)return;O(n?`Sincronizando con KoboToolbox…`:`Descargando datos desde el servidor…`);let r=x(`btnRefresh`);r&&(r.disabled=!0);let i=null,a=!1,o=x(`assetSelect`),s=o?[...o.options].map(e=>e.value).filter(Boolean):[],c=s.indexOf(e),u=c>=0&&c+1<s.length?s[c+1]:``;try{i=await z(e,n,u),await F.set(`data_cache_${e}`,i),A(!0)}catch(t){console.warn(`Network failure. Trying cache...`,t),n||(i=await F.get(`data_cache_${e}`),i&&(a=!0,A(!1)))}if(!i){alert(`Error: No se pudieron descargar los datos y no hay caché disponible.`),k(),r&&(r.disabled=!1);return}l.rawData=i.results||(Array.isArray(i)?i:[]),console.log(`api/index.js: Loaded ${l.rawData.length} records ${a?`(Offline Cache)`:``}`);let d=x(`statusBadge`);d&&(d.textContent=`${l.rawData.length} registros`),x(`errorState`)&&x(`errorState`).classList.add(`hidden`),x(`mainContent`)&&x(`mainContent`).classList.remove(`hidden`),O(`Renderizando dashboard...`),requestAnimationFrame(()=>{setTimeout(async()=>{t&&await t(),window.lucide&&lucide.createIcons(),requestAnimationFrame(()=>{setTimeout(()=>{k(),r&&(r.disabled=!1)},800)})},100)})}async function ie(){if(!l.planificacionData)try{let e=await fetch(`data/planificacion.json`);if(!e.ok)throw Error(`Error loading planificacion.json`);l.planificacionData=await e.json(),console.log(`api/index.js: Planned housing data loaded ✓`)}catch(e){console.error(`Failed to load planificacion.json:`,e)}}var ae=a((()=>{m(),D(),M(),I(),te(),window.loadAssets=()=>ne(e=>re(e,window.__onProcessData))}));function B(e,t,n=[],r=``){if(t&&e._backend_meta&&e._backend_meta[t]!=null&&e._backend_meta[t]!==``)return e._backend_meta[t];for(let t of n)if(e[t]!=null&&String(e[t]).trim()!==``)return e[t];return r}function oe(e){if(!e||typeof e!=`string`)return null;let t=e.match(/T(\d{2}):/);return t?parseInt(t[1],10):null}function V(e){if(!e||typeof e!=`string`)return null;let t=e.trim().split(` `);return t.length>=4?parseFloat(t[3]):null}function se(e){let n=String(B(e,`cedula_encuestador`,[`S0/cedula_encuestador`,`v4_encuestador_cedula`,`cedula_encuestador`],`N/A`)).trim(),r=B(e,`nombre_encuestador`,[`S0/s0_nombreapellido`,`S0/_xm_s0_nombreapellido`,`_xm_cod_nom_y_ape`,`v4_encuestador_nombre`,`nombre_encuestador`]),i=r&&String(r).trim()&&String(r).trim().toLowerCase()!==`desconocido`?String(r).trim():t[n]||(n===`N/A`?`Desconocido`:`Encuestador ${n}`),a=e.start||``,o=e.end||``,s=B(e,``,[`ubicacion_final/hora_fin`,`ubicacion_final/hora_f`,`hora_f`]);s&&(o=!s.includes(`T`)&&a.includes(`T`)?`${a.split(`T`)[0]}T${s}`:s,e.end=o);let c=(e.today||e._submission_time||``).slice(0,10),u=(l.assetName||``).toUpperCase().includes(`EHM`)?`EHM`:`ESCA`,f=B(e,`control`,[`group_sh53u78/control`,`datos_mm111/control`]),p=B(e,`n_linea`,[`group_sh53u78/n_linea`,`datos_mm111/n_linea`]);if(!f&&e[`meta/instanceName`]){let t=String(e[`meta/instanceName`]).split(`-`);t.length>=4&&/^\d+$/.test(t[1])&&(f=t[1]),t.length>=4&&/^\d+$/.test(t[2])&&!p&&(p=t[2])}return f||=e._uuid||``,{cedula:n,nombre:i,start:a,end:o,fecha:c,hora:oe(a),hora_trans:oe(e._submission_time),formType:u,start_precision:V(e[`start-geopoint`]||e.start_geopoint),end_precision:V(e[`group_sh53u78/ubicacion_i`]||e[`end-geopoint`]),ent:B(e,`entidad`,[`S1/ent`,`datos_mm111/ent`]),mun:d(B(e,`municipio`,[`S1/mun`,`S1/S2/mun`])),par:B(e,`parroquia`,[`S1/par`,`S1/S2/par`]),nodo:B(e,`nodo`,[`S1/nodo`,`S1/S2/nodo`]),semana:B(e,`semana_raw`,[`group_sh53u78/semana`,`datos_mm111/semana`]),uso:e[`S1/Uso_de_la_Unidad_inmobiliaria`]||`N/A`,condicion:e[`Condici_n_de_ocupaci_n/condicion_de_ocupacion`]||`N/A`,control:f,lote:e[`group_sh53u78/lote`]||``,situacion_vivienda:e[`Condici_n_de_ocupaci_n/condicion_de_ocupacion`]===`ocupadas_con_ocupantes_ausentes`&&e[`Condici_n_de_ocupaci_n/situacion_vivienda`]===`otro_ausentes`?`otro_ausentes`:e[`Condici_n_de_ocupaci_n/vivienda_ocupada01`]||e[`Condici_n_de_ocupaci_n/situacion_vivienda`]||``,segmento:B(e,`segmento`,[`S1/segmento`,`S1/group_segmeto_sector/segmento`,`group_segmeto_sector/segmento`]),sector:B(e,`sector`,[`S1/sector`,`S1/group_segmeto_sector/sector`,`group_segmeto_sector/sector`]),manzana:B(e,`manzana`,[`S1/manzana`,`S1/S3/manzana`]),parcela:B(e,`parcela`,[`S1/parcela`,`S1/S3/parcela`]),edificacion:B(e,`edificacion`,[`S1/Edificaci_n`,`S1/edificacion`,`S1/S3/edificacion`]),lado_manz:B(e,`lado_manz`,[`S1/lado_manz`,`S1/S3/lado_manz`]),n_linea:p,n_serie:B(e,`n_serie`,[`group_sh53u78/n_serie`]),direccion:B(e,`nombre_sector`,[`S1/P_nomsect`,`S1/S3/sector_1`,`S1/S3/GP10_0b`,`S1/direccion`]),nota:e[`ubicacion_final/nota`]||``,residente:B(e,``,[`control_entrevista/nombre_informante`,`control_de_la_entrevista/nombre_informante`],`-`),observaciones:e[`ubicacion_final/observaciones`]||`-`,fecha_entrevista:e[`ubicacion_final/fecha_entrevista_1`]||c,descripcion:B(e,``,[`control_de_la_entrevista/in11`,`control_entrevista/in11`],`-`),nroCasa:B(e,``,[`control_de_la_entrevista/in10`,`control_entrevista/in10`],`-`)}}function ce(e,t){if(!e||!t)return null;try{let n=new Date(e),r=new Date(t),i=Math.round((r-n)/6e4*10)/10;return i>=0&&i<=600?i:null}catch{return null}}var le=a((()=>{m()}));function ue(e,t){let n=0,r=0,i=0,a=Array.isArray(e.lista_hogar)?e.lista_hogar:Array.isArray(e[`datos_hogar/hogar`])?e[`datos_hogar/hogar`]:[];return a.forEach(e=>{let t=Array.isArray(e[`lista_hogar/lista_miembros`])?e[`lista_hogar/lista_miembros`]:Array.isArray(e[`datos_hogar/hogar/integrantes_hogar`])?e[`datos_hogar/hogar/integrantes_hogar`]:[];if(t.length>0)n+=t.length;else{let t=parseInt(e[`lista_hogar/personas_hogar`]||e[`lista_hogar/lista_miembros_count`]||e[`datos_hogar/hogar/integrantes_hogar_count`]||`0`,10);isNaN(t)||(n+=t)}t.forEach(e=>{let{hCount:t,mCount:n}=de(e);r+=t,i+=n})}),{totalPers:n,totalHombres:r,totalMujeres:i,hogaresCount:a.length,hogaresRaw:a}}function de(e){let t=0,n=0,r=Object.keys(e).find(e=>e.endsWith(`/sexo`)||e.endsWith(`:sexo`)||e===`sexo`||e.endsWith(`/C2`));if(r){let i=String(e[r]).trim().toLowerCase();[`1`,`sexo1`,`v`,`m`,`masculino`,`hombre`].includes(i)&&(t=1),[`2`,`sexo2`,`h`,`f`,`femenino`,`mujer`].includes(i)&&(n=1)}return{hCount:t,mCount:n}}var fe=a((()=>{}));function pe(e){let t=y(e[`ubicacion_final/ubicacion_f`]||e.ubicacion_f),n=y(e[`group_sh53u78/ubicacion_i`]||e.ubicacion_i),r=null,i=null;if(n&&n[0])r=n[0],i=n[1];else if(t&&t[0])r=t[0],i=t[1];else if(e._geolocation&&e._geolocation.length>=2)r=e._geolocation[0],i=e._geolocation[1];else if(e[`S1/ubicacion`]){let t=e[`S1/ubicacion`].split(` `);t.length>=2&&(r=parseFloat(t[0]),i=parseFloat(t[1]))}return{lat:r,lng:i,ptIni:n,ptFin:t}}var me=a((()=>{D()}));function H(e,t,n={}){let r={type:`Feature`};return(n.id===0||n.id)&&(r.id=n.id),n.bbox&&(r.bbox=n.bbox),r.properties=t||{},r.geometry=e,r}function he(e,t,n={}){if(!e)throw Error(`coordinates is required`);if(!Array.isArray(e))throw Error(`coordinates must be an Array`);if(e.length<2)throw Error(`coordinates must be at least 2 numbers long`);if(!xe(e[0])||!xe(e[1]))throw Error(`coordinates must contain numbers`);return H({type:`Point`,coordinates:e},t,n)}function ge(e,t,n={}){for(let t of e){if(t.length<4)throw Error(`Each LinearRing of a Polygon must have 4 or more Positions.`);if(t[t.length-1].length!==t[0].length)throw Error(`First and last Position are not equivalent.`);for(let e=0;e<t[t.length-1].length;e++)if(t[t.length-1][e]!==t[0][e])throw Error(`First and last Position are not equivalent.`)}return H({type:`Polygon`,coordinates:e},t,n)}function _e(e,t,n={}){if(e.length<2)throw Error(`coordinates must be an array of two or more positions`);return H({type:`LineString`,coordinates:e},t,n)}function ve(e,t={}){let n={type:`FeatureCollection`};return t.id&&(n.id=t.id),t.bbox&&(n.bbox=t.bbox),n.features=e,n}function ye(e,t=`kilometers`){let n=Ce[t];if(!n)throw Error(t+` units is invalid`);return e*n}function be(e){return e%360*Math.PI/180}function xe(e){return!isNaN(e)&&e!==null&&!Array.isArray(e)}function Se(e){return typeof e==`object`&&!!e&&!Array.isArray(e)}var U,Ce,we=a((()=>{U=6371008.8,Ce={centimeters:U*100,centimetres:U*100,degrees:360/(2*Math.PI),feet:U*3.28084,inches:U*39.37,kilometers:U/1e3,kilometres:U/1e3,meters:U,metres:U,miles:U/1609.344,millimeters:U*1e3,millimetres:U*1e3,nauticalmiles:U/1852,radians:1,yards:U*1.0936}}));function Te(e){if(!e)throw Error(`coord is required`);if(!Array.isArray(e)){if(e.type===`Feature`&&e.geometry!==null&&e.geometry.type===`Point`)return[...e.geometry.coordinates];if(e.type===`Point`)return[...e.coordinates]}if(Array.isArray(e)&&e.length>=2&&!Array.isArray(e[0])&&!Array.isArray(e[1]))return[...e];throw Error(`coord must be GeoJSON Point or an Array of numbers`)}function Ee(e){if(Array.isArray(e))return e;if(e.type===`Feature`){if(e.geometry!==null)return e.geometry.coordinates}else if(e.coordinates)return e.coordinates;throw Error(`coords must be GeoJSON Feature, Geometry Object or an Array`)}function De(e){return e.type===`Feature`?e.geometry:e}function Oe(e,t){return e.type===`FeatureCollection`?`FeatureCollection`:e.type===`GeometryCollection`?`GeometryCollection`:e.type===`Feature`&&e.geometry!==null?e.geometry.type:e.type}var ke=a((()=>{}));function Ae(e,t,n={}){var r=Te(e),i=Te(t),a=be(i[1]-r[1]),o=be(i[0]-r[0]),s=be(r[1]),c=be(i[1]),l=Math.sin(a/2)**2+Math.sin(o/2)**2*Math.cos(s)*Math.cos(c);return ye(2*Math.atan2(Math.sqrt(l),Math.sqrt(1-l)),n.units)}var je=a((()=>{ke(),we()}));function Me(e,t,n){if(e!==null)for(var r,i,a,o,s,c,l,u=0,d=0,f,p=e.type,m=p===`FeatureCollection`,h=p===`Feature`,g=m?e.features.length:1,_=0;_<g;_++){l=m?e.features[_].geometry:h?e.geometry:e,f=l?l.type===`GeometryCollection`:!1,s=f?l.geometries.length:1;for(var v=0;v<s;v++){var y=0,b=0;if(o=f?l.geometries[v]:l,o!==null){c=o.coordinates;var x=o.type;switch(u=n&&(x===`Polygon`||x===`MultiPolygon`)?1:0,x){case null:break;case`Point`:if(t(c,d,_,y,b)===!1)return!1;d++,y++;break;case`LineString`:case`MultiPoint`:for(r=0;r<c.length;r++){if(t(c[r],d,_,y,b)===!1)return!1;d++,x===`MultiPoint`&&y++}x===`LineString`&&y++;break;case`Polygon`:case`MultiLineString`:for(r=0;r<c.length;r++){for(i=0;i<c[r].length-u;i++){if(t(c[r][i],d,_,y,b)===!1)return!1;d++}x===`MultiLineString`&&y++,x===`Polygon`&&b++}x===`Polygon`&&y++;break;case`MultiPolygon`:for(r=0;r<c.length;r++){for(b=0,i=0;i<c[r].length;i++){for(a=0;a<c[r][i].length-u;a++){if(t(c[r][i][a],d,_,y,b)===!1)return!1;d++}b++}y++}break;case`GeometryCollection`:for(r=0;r<o.geometries.length;r++)if(Me(o.geometries[r],t,n)===!1)return!1;break;default:throw Error(`Unknown Geometry Type`)}}}}}function Ne(e,t){var n,r,i,a,o,s,c,l,u,d,f=0,p=e.type===`FeatureCollection`,m=e.type===`Feature`,h=p?e.features.length:1;for(n=0;n<h;n++){for(s=p?e.features[n].geometry:m?e.geometry:e,l=p?e.features[n].properties:m?e.properties:{},u=p?e.features[n].bbox:m?e.bbox:void 0,d=p?e.features[n].id:m?e.id:void 0,c=s?s.type===`GeometryCollection`:!1,o=c?s.geometries.length:1,i=0;i<o;i++){if(a=c?s.geometries[i]:s,a===null){if(t(null,f,l,u,d)===!1)return!1;continue}switch(a.type){case`Point`:case`LineString`:case`MultiPoint`:case`Polygon`:case`MultiLineString`:case`MultiPolygon`:if(t(a,f,l,u,d)===!1)return!1;break;case`GeometryCollection`:for(r=0;r<a.geometries.length;r++)if(t(a.geometries[r],f,l,u,d)===!1)return!1;break;default:throw Error(`Unknown Geometry Type`)}}f++}}function Pe(e,t,n){var r=n;return Ne(e,function(e,i,a,o,s){r=i===0&&n===void 0?e:t(r,e,i,a,o,s)}),r}var Fe=a((()=>{}));function Ie(e){return Pe(e,(e,t)=>e+Le(t),0)}function Le(e){let t=0,n;switch(e.type){case`Polygon`:return Re(e.coordinates);case`MultiPolygon`:for(n=0;n<e.coordinates.length;n++)t+=Re(e.coordinates[n]);return t;case`Point`:case`MultiPoint`:case`LineString`:case`MultiLineString`:return 0}return 0}function Re(e){let t=0;if(e&&e.length>0){t+=Math.abs(ze(e[0]));for(let n=1;n<e.length;n++)t-=Math.abs(ze(e[n]))}return t}function ze(e){let t=e.length-1;if(t<=2)return 0;let n=0,r=0;for(;r<t;){let i=e[r],a=e[r+1===t?0:r+1],o=e[r+2>=t?(r+2)%t:r+2],s=i[0]*Ve,c=a[1]*Ve,l=o[0]*Ve;n+=(l-s)*Math.sin(c),r++}return n*Be}var Be,Ve,He=a((()=>{we(),Fe(),Be=U*U/2,Ve=Math.PI/180}));function Ue(e,t,n,r,i){let a,o,s,c,l=t[0],u=r[0],d=0,f=0;u>l==u>-l?(a=l,l=t[++d]):(a=u,u=r[++f]);let p=0;if(d<e&&f<n)for(u>l==u>-l?(o=l+a,s=a-(o-l),l=t[++d]):(o=u+a,s=a-(o-u),u=r[++f]),a=o,s!==0&&(i[p++]=s);d<e&&f<n;)u>l==u>-l?(o=a+l,c=o-a,s=a-(o-c)+(l-c),l=t[++d]):(o=a+u,c=o-a,s=a-(o-c)+(u-c),u=r[++f]),a=o,s!==0&&(i[p++]=s);for(;d<e;)o=a+l,c=o-a,s=a-(o-c)+(l-c),l=t[++d],a=o,s!==0&&(i[p++]=s);for(;f<n;)o=a+u,c=o-a,s=a-(o-c)+(u-c),u=r[++f],a=o,s!==0&&(i[p++]=s);return(a!==0||p===0)&&(i[p++]=a),p}function We(e,t){let n=t[0];for(let r=1;r<e;r++)n+=t[r];return n}function W(e){return new Float64Array(e)}var G,K,Ge,Ke=a((()=>{G=11102230246251565e-32,K=134217729,Ge=(3+8*G)*G}));function qe(e,t,n,r,i,a,o){let s,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T=e-i,E=n-i,D=t-a,O=r-a;b=T*O,f=K*T,p=f-(f-T),m=T-p,f=K*O,h=f-(f-O),g=O-h,x=m*g-(b-p*h-m*h-p*g),S=D*E,f=K*D,p=f-(f-D),m=D-p,f=K*E,h=f-(f-E),g=E-h,C=m*g-(S-p*h-m*h-p*g),_=x-C,d=x-_,q[0]=x-(_+d)+(d-C),v=b+_,d=v-b,y=b-(v-d)+(_-d),_=y-S,d=y-_,q[1]=y-(_+d)+(d-S),w=v+_,d=w-v,q[2]=v-(w-d)+(_-d),q[3]=w;let k=We(4,q),A=Xe*o;if(k>=A||-k>=A||(d=e-T,s=e-(T+d)+(d-i),d=n-E,l=n-(E+d)+(d-i),d=t-D,c=t-(D+d)+(d-a),d=r-O,u=r-(O+d)+(d-a),s===0&&c===0&&l===0&&u===0)||(A=Ze*o+Ge*Math.abs(k),k+=T*u+O*s-(D*l+E*c),k>=A||-k>=A))return k;b=s*O,f=K*s,p=f-(f-s),m=s-p,f=K*O,h=f-(f-O),g=O-h,x=m*g-(b-p*h-m*h-p*g),S=c*E,f=K*c,p=f-(f-c),m=c-p,f=K*E,h=f-(f-E),g=E-h,C=m*g-(S-p*h-m*h-p*g),_=x-C,d=x-_,J[0]=x-(_+d)+(d-C),v=b+_,d=v-b,y=b-(v-d)+(_-d),_=y-S,d=y-_,J[1]=y-(_+d)+(d-S),w=v+_,d=w-v,J[2]=v-(w-d)+(_-d),J[3]=w;let j=Ue(4,q,4,J,Qe);b=T*u,f=K*T,p=f-(f-T),m=T-p,f=K*u,h=f-(f-u),g=u-h,x=m*g-(b-p*h-m*h-p*g),S=D*l,f=K*D,p=f-(f-D),m=D-p,f=K*l,h=f-(f-l),g=l-h,C=m*g-(S-p*h-m*h-p*g),_=x-C,d=x-_,J[0]=x-(_+d)+(d-C),v=b+_,d=v-b,y=b-(v-d)+(_-d),_=y-S,d=y-_,J[1]=y-(_+d)+(d-S),w=v+_,d=w-v,J[2]=v-(w-d)+(_-d),J[3]=w;let M=Ue(j,Qe,4,J,$e);return b=s*u,f=K*s,p=f-(f-s),m=s-p,f=K*u,h=f-(f-u),g=u-h,x=m*g-(b-p*h-m*h-p*g),S=c*l,f=K*c,p=f-(f-c),m=c-p,f=K*l,h=f-(f-l),g=l-h,C=m*g-(S-p*h-m*h-p*g),_=x-C,d=x-_,J[0]=x-(_+d)+(d-C),v=b+_,d=v-b,y=b-(v-d)+(_-d),_=y-S,d=y-_,J[1]=y-(_+d)+(d-S),w=v+_,d=w-v,J[2]=v-(w-d)+(_-d),J[3]=w,et[Ue(M,$e,4,J,et)-1]}function Je(e,t,n,r,i,a){let o=(t-a)*(n-i),s=(e-i)*(r-a),c=o-s,l=Math.abs(o+s);return Math.abs(c)>=Ye*l?c:-qe(e,t,n,r,i,a,l)}var Ye,Xe,Ze,q,Qe,$e,et,J,tt=a((()=>{Ke(),Ye=(3+16*G)*G,Xe=(2+12*G)*G,Ze=(9+64*G)*G*G,q=W(4),Qe=W(8),$e=W(12),et=W(16),J=W(4)})),nt=a((()=>{Ke(),(7+56*G)*G,(3+28*G)*G,(26+288*G)*G*G,W(4),W(4),W(4),W(4),W(4),W(4),W(4),W(4),W(4),W(8),W(8),W(8),W(4),W(8),W(8),W(16),W(12),W(192),W(192)})),rt=a((()=>{Ke(),(10+96*G)*G,(4+48*G)*G,(44+576*G)*G*G,W(4),W(4),W(4),W(4),W(4),W(4),W(4),W(4),W(8),W(8),W(8),W(8),W(8),W(8),W(8),W(8),W(8),W(4),W(4),W(4),W(8),W(16),W(16),W(16),W(32),W(32),W(48),W(64),W(1152),W(1152)})),it=a((()=>{Ke(),(16+224*G)*G,(5+72*G)*G,(71+1408*G)*G*G,W(4),W(4),W(4),W(4),W(4),W(4),W(4),W(4),W(4),W(4),W(24),W(24),W(24),W(24),W(24),W(24),W(24),W(24),W(24),W(24),W(1152),W(1152),W(1152),W(1152),W(1152),W(2304),W(2304),W(3456),W(5760),W(8),W(8),W(8),W(16),W(24),W(48),W(48),W(96),W(192),W(384),W(384),W(384),W(768),W(96),W(96),W(96),W(1152)})),at=a((()=>{tt(),nt(),rt(),it()}));function ot(e,t){var n,r,i=0,a,o,s,c,l,u,d,f=e[0],p=e[1],m=t.length;for(n=0;n<m;n++){r=0;var h=t[n],g=h.length-1;if(u=h[0],u[0]!==h[g][0]&&u[1]!==h[g][1])throw Error(`First and last coordinates in a ring must be the same`);for(o=u[0]-f,s=u[1]-p;r<g;r++){if(d=h[r+1],c=d[0]-f,l=d[1]-p,s===0&&l===0){if(c<=0&&o>=0||o<=0&&c>=0)return 0}else if(l>=0&&s<=0||l<=0&&s>=0){if(a=Je(o,c,s,l,0,0),a===0)return 0;(a>0&&l>0&&s<=0||a<0&&l<=0&&s>0)&&i++}u=d,s=l,o=c}}return i%2!=0}var st=a((()=>{at()}));function ct(e,t,n={}){if(!e)throw Error(`point is required`);if(!t)throw Error(`polygon is required`);let r=Te(e),i=De(t),a=i.type,o=t.bbox,s=i.coordinates;if(o&&lt(r,o)===!1)return!1;a===`Polygon`&&(s=[s]);let c=!1;for(var l=0;l<s.length;++l){let e=ot(r,s[l]);if(e===0)return!n.ignoreBoundary;e&&(c=!0)}return c}function lt(e,t){return t[0]<=e[0]&&t[1]<=e[1]&&t[2]>=e[0]&&t[3]>=e[1]}var ut=a((()=>{st(),ke()}));function dt(e,t,n={}){let r=Te(e),i=Ee(t);for(let e=0;e<i.length-1;e++){let t=!1;if(n.ignoreEndVertices&&(e===0&&(t=`start`),e===i.length-2&&(t=`end`),e===0&&e+1===i.length-1&&(t=`both`)),ft(i[e],i[e+1],r,t,n.epsilon===void 0?null:n.epsilon))return!0}return!1}function ft(e,t,n,r,i){let a=n[0],o=n[1],s=e[0],c=e[1],l=t[0],u=t[1],d=n[0]-s,f=n[1]-c,p=l-s,m=u-c,h=d*m-f*p;if(i!==null){if(Math.abs(h)>i)return!1}else if(h!==0)return!1;return Math.abs(p)===Math.abs(m)&&Math.abs(p)===0?r?!1:n[0]===e[0]&&n[1]===e[1]:r?r===`start`?Math.abs(p)>=Math.abs(m)?p>0?s<a&&a<=l:l<=a&&a<s:m>0?c<o&&o<=u:u<=o&&o<c:r===`end`?Math.abs(p)>=Math.abs(m)?p>0?s<=a&&a<l:l<a&&a<=s:m>0?c<=o&&o<u:u<o&&o<=c:r===`both`?Math.abs(p)>=Math.abs(m)?p>0?s<a&&a<l:l<a&&a<s:m>0?c<o&&o<u:u<o&&o<c:!1:Math.abs(p)>=Math.abs(m)?p>0?s<=a&&a<=l:l<=a&&a<=s:m>0?c<=o&&o<=u:u<=o&&o<=c}var pt=a((()=>{ke()})),mt=o(((e,t)=>{(function(n,r){typeof e==`object`&&t!==void 0?t.exports=r():typeof define==`function`&&define.amd?define(r):(n||=self).RBush=r()})(e,function(){function e(e,r,i,a,o){(function e(n,r,i,a,o){for(;a>i;){if(a-i>600){var s=a-i+1,c=r-i+1,l=Math.log(s),u=.5*Math.exp(2*l/3),d=.5*Math.sqrt(l*u*(s-u)/s)*(c-s/2<0?-1:1);e(n,r,Math.max(i,Math.floor(r-c*u/s+d)),Math.min(a,Math.floor(r+(s-c)*u/s+d)),o)}var f=n[r],p=i,m=a;for(t(n,i,r),o(n[a],f)>0&&t(n,i,a);p<m;){for(t(n,p,m),p++,m--;o(n[p],f)<0;)p++;for(;o(n[m],f)>0;)m--}o(n[i],f)===0?t(n,i,m):t(n,++m,a),m<=r&&(i=m+1),r<=m&&(a=m-1)}})(e,r,i||0,a||e.length-1,o||n)}function t(e,t,n){var r=e[t];e[t]=e[n],e[n]=r}function n(e,t){return e<t?-1:+(e>t)}var r=function(e){e===void 0&&(e=9),this._maxEntries=Math.max(4,e),this._minEntries=Math.max(2,Math.ceil(.4*this._maxEntries)),this.clear()};function i(e,t,n){if(!n)return t.indexOf(e);for(var r=0;r<t.length;r++)if(n(e,t[r]))return r;return-1}function a(e,t){o(e,0,e.children.length,t,e)}function o(e,t,n,r,i){i||=m(null),i.minX=1/0,i.minY=1/0,i.maxX=-1/0,i.maxY=-1/0;for(var a=t;a<n;a++){var o=e.children[a];s(i,e.leaf?r(o):o)}return i}function s(e,t){return e.minX=Math.min(e.minX,t.minX),e.minY=Math.min(e.minY,t.minY),e.maxX=Math.max(e.maxX,t.maxX),e.maxY=Math.max(e.maxY,t.maxY),e}function c(e,t){return e.minX-t.minX}function l(e,t){return e.minY-t.minY}function u(e){return(e.maxX-e.minX)*(e.maxY-e.minY)}function d(e){return e.maxX-e.minX+(e.maxY-e.minY)}function f(e,t){return e.minX<=t.minX&&e.minY<=t.minY&&t.maxX<=e.maxX&&t.maxY<=e.maxY}function p(e,t){return t.minX<=e.maxX&&t.minY<=e.maxY&&t.maxX>=e.minX&&t.maxY>=e.minY}function m(e){return{children:e,height:1,leaf:!0,minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0}}function h(t,n,r,i,a){for(var o=[n,r];o.length;)if(!((r=o.pop())-(n=o.pop())<=i)){var s=n+Math.ceil((r-n)/i/2)*i;e(t,s,n,r,a),o.push(n,s,s,r)}}return r.prototype.all=function(){return this._all(this.data,[])},r.prototype.search=function(e){var t=this.data,n=[];if(!p(e,t))return n;for(var r=this.toBBox,i=[];t;){for(var a=0;a<t.children.length;a++){var o=t.children[a],s=t.leaf?r(o):o;p(e,s)&&(t.leaf?n.push(o):f(e,s)?this._all(o,n):i.push(o))}t=i.pop()}return n},r.prototype.collides=function(e){var t=this.data;if(!p(e,t))return!1;for(var n=[];t;){for(var r=0;r<t.children.length;r++){var i=t.children[r],a=t.leaf?this.toBBox(i):i;if(p(e,a)){if(t.leaf||f(e,a))return!0;n.push(i)}}t=n.pop()}return!1},r.prototype.load=function(e){if(!e||!e.length)return this;if(e.length<this._minEntries){for(var t=0;t<e.length;t++)this.insert(e[t]);return this}var n=this._build(e.slice(),0,e.length-1,0);if(this.data.children.length)if(this.data.height===n.height)this._splitRoot(this.data,n);else{if(this.data.height<n.height){var r=this.data;this.data=n,n=r}this._insert(n,this.data.height-n.height-1,!0)}else this.data=n;return this},r.prototype.insert=function(e){return e&&this._insert(e,this.data.height-1),this},r.prototype.clear=function(){return this.data=m([]),this},r.prototype.remove=function(e,t){if(!e)return this;for(var n,r,a,o=this.data,s=this.toBBox(e),c=[],l=[];o||c.length;){if(o||(o=c.pop(),r=c[c.length-1],n=l.pop(),a=!0),o.leaf){var u=i(e,o.children,t);if(u!==-1)return o.children.splice(u,1),c.push(o),this._condense(c),this}a||o.leaf||!f(o,s)?r?(n++,o=r.children[n],a=!1):o=null:(c.push(o),l.push(n),n=0,r=o,o=o.children[0])}return this},r.prototype.toBBox=function(e){return e},r.prototype.compareMinX=function(e,t){return e.minX-t.minX},r.prototype.compareMinY=function(e,t){return e.minY-t.minY},r.prototype.toJSON=function(){return this.data},r.prototype.fromJSON=function(e){return this.data=e,this},r.prototype._all=function(e,t){for(var n=[];e;)e.leaf?t.push.apply(t,e.children):n.push.apply(n,e.children),e=n.pop();return t},r.prototype._build=function(e,t,n,r){var i,o=n-t+1,s=this._maxEntries;if(o<=s)return a(i=m(e.slice(t,n+1)),this.toBBox),i;r||(r=Math.ceil(Math.log(o)/Math.log(s)),s=Math.ceil(o/s**(r-1))),(i=m([])).leaf=!1,i.height=r;var c=Math.ceil(o/s),l=c*Math.ceil(Math.sqrt(s));h(e,t,n,l,this.compareMinX);for(var u=t;u<=n;u+=l){var d=Math.min(u+l-1,n);h(e,u,d,c,this.compareMinY);for(var f=u;f<=d;f+=c){var p=Math.min(f+c-1,d);i.children.push(this._build(e,f,p,r-1))}}return a(i,this.toBBox),i},r.prototype._chooseSubtree=function(e,t,n,r){for(;r.push(t),!t.leaf&&r.length-1!==n;){for(var i=1/0,a=1/0,o=void 0,s=0;s<t.children.length;s++){var c=t.children[s],l=u(c),d=(f=e,p=c,(Math.max(p.maxX,f.maxX)-Math.min(p.minX,f.minX))*(Math.max(p.maxY,f.maxY)-Math.min(p.minY,f.minY))-l);d<a?(a=d,i=l<i?l:i,o=c):d===a&&l<i&&(i=l,o=c)}t=o||t.children[0]}var f,p;return t},r.prototype._insert=function(e,t,n){var r=n?e:this.toBBox(e),i=[],a=this._chooseSubtree(r,this.data,t,i);for(a.children.push(e),s(a,r);t>=0&&i[t].children.length>this._maxEntries;)this._split(i,t),t--;this._adjustParentBBoxes(r,i,t)},r.prototype._split=function(e,t){var n=e[t],r=n.children.length,i=this._minEntries;this._chooseSplitAxis(n,i,r);var o=this._chooseSplitIndex(n,i,r),s=m(n.children.splice(o,n.children.length-o));s.height=n.height,s.leaf=n.leaf,a(n,this.toBBox),a(s,this.toBBox),t?e[t-1].children.push(s):this._splitRoot(n,s)},r.prototype._splitRoot=function(e,t){this.data=m([e,t]),this.data.height=e.height+1,this.data.leaf=!1,a(this.data,this.toBBox)},r.prototype._chooseSplitIndex=function(e,t,n){for(var r,i,a,s,c,l,d,f=1/0,p=1/0,m=t;m<=n-t;m++){var h=o(e,0,m,this.toBBox),g=o(e,m,n,this.toBBox),_=(i=h,a=g,s=void 0,c=void 0,l=void 0,d=void 0,s=Math.max(i.minX,a.minX),c=Math.max(i.minY,a.minY),l=Math.min(i.maxX,a.maxX),d=Math.min(i.maxY,a.maxY),Math.max(0,l-s)*Math.max(0,d-c)),v=u(h)+u(g);_<f?(f=_,r=m,p=v<p?v:p):_===f&&v<p&&(p=v,r=m)}return r||n-t},r.prototype._chooseSplitAxis=function(e,t,n){var r=e.leaf?this.compareMinX:c,i=e.leaf?this.compareMinY:l;this._allDistMargin(e,t,n,r)<this._allDistMargin(e,t,n,i)&&e.children.sort(r)},r.prototype._allDistMargin=function(e,t,n,r){e.children.sort(r);for(var i=this.toBBox,a=o(e,0,t,i),c=o(e,n-t,n,i),l=d(a)+d(c),u=t;u<n-t;u++){var f=e.children[u];s(a,e.leaf?i(f):f),l+=d(a)}for(var p=n-t-1;p>=t;p--){var m=e.children[p];s(c,e.leaf?i(m):m),l+=d(c)}return l},r.prototype._adjustParentBBoxes=function(e,t,n){for(var r=n;r>=0;r--)s(t[r],e)},r.prototype._condense=function(e){for(var t=e.length-1,n=void 0;t>=0;t--)e[t].children.length===0?t>0?(n=e[t-1].children).splice(n.indexOf(e[t]),1):this.clear():a(e[t],this.toBBox)},r})}));function ht(e,t={}){var n=typeof t==`object`?t.mutate:t;if(!e)throw Error(`geojson is required`);var r=Oe(e),i=[];switch(r){case`LineString`:i=gt(e,r);break;case`MultiLineString`:case`Polygon`:Ee(e).forEach(function(e){i.push(gt(e,r))});break;case`MultiPolygon`:Ee(e).forEach(function(e){var t=[];e.forEach(function(e){t.push(gt(e,r))}),i.push(t)});break;case`Point`:return e;case`MultiPoint`:var a={};Ee(e).forEach(function(e){var t=e.join(`-`);Object.prototype.hasOwnProperty.call(a,t)||(i.push(e),a[t]=!0)});break;default:throw Error(r+` geometry not supported`)}return e.coordinates?n===!0?(e.coordinates=i,e):{type:r,coordinates:i}:n===!0?(e.geometry.coordinates=i,e):H({type:r,coordinates:i},e.properties,{bbox:e.bbox,id:e.id})}function gt(e,t){let n=Ee(e);if(n.length===2&&!_t(n[0],n[1]))return n;let r=[],i=0,a=1,o=2;for(r.push(n[i]);o<n.length;)dt(n[a],_e([n[i],n[o]]))?a=o:(r.push(n[a]),i=a,a++,o=a),o++;if(r.push(n[a]),t===`Polygon`||t===`MultiPolygon`){if(dt(r[0],_e([r[1],r[r.length-2]]))&&(r.shift(),r.pop(),r.push(r[0])),r.length<4)throw Error(`invalid polygon, fewer than 4 points`);if(!_t(r[0],r[r.length-1]))throw Error(`invalid polygon, first and last points not equal`)}return r}function _t(e,t){return e[0]===t[0]&&e[1]===t[1]}var vt=a((()=>{we(),ke(),pt()})),yt=e({default:()=>xt});function bt(e,t){return e<t?-1:+(e>t)}var xt,St=a((()=>{xt=class{constructor(e=[],t=bt){if(this.data=e,this.length=this.data.length,this.compare=t,this.length>0)for(let e=(this.length>>1)-1;e>=0;e--)this._down(e)}push(e){this.data.push(e),this.length++,this._up(this.length-1)}pop(){if(this.length===0)return;let e=this.data[0],t=this.data.pop();return this.length--,this.length>0&&(this.data[0]=t,this._down(0)),e}peek(){return this.data[0]}_up(e){let{data:t,compare:n}=this,r=t[e];for(;e>0;){let i=e-1>>1,a=t[i];if(n(r,a)>=0)break;t[e]=a,e=i}t[e]=r}_down(e){let{data:t,compare:n}=this,r=this.length>>1,i=t[e];for(;e<r;){let r=(e<<1)+1,a=t[r],o=r+1;if(o<this.length&&n(t[o],a)<0&&(r=o,a=t[o]),n(a,i)>=0)break;t[e]=a,e=r}t[e]=i}}})),Ct=o(((e,t)=>{t.exports=function(e,t,n,r){var i=e[0],a=e[1],o=!1;n===void 0&&(n=0),r===void 0&&(r=t.length);for(var s=(r-n)/2,c=0,l=s-1;c<s;l=c++){var u=t[n+c*2+0],d=t[n+c*2+1],f=t[n+l*2+0],p=t[n+l*2+1];d>a!=p>a&&i<(f-u)*(a-d)/(p-d)+u&&(o=!o)}return o}})),wt=o(((e,t)=>{t.exports=function(e,t,n,r){var i=e[0],a=e[1],o=!1;n===void 0&&(n=0),r===void 0&&(r=t.length);for(var s=r-n,c=0,l=s-1;c<s;l=c++){var u=t[c+n][0],d=t[c+n][1],f=t[l+n][0],p=t[l+n][1];d>a!=p>a&&i<(f-u)*(a-d)/(p-d)+u&&(o=!o)}return o}})),Tt=o(((e,t)=>{var n=Ct(),r=wt();t.exports=function(e,t,i,a){return t.length>0&&Array.isArray(t[0])?r(e,t,i,a):n(e,t,i,a)},t.exports.nested=r,t.exports.flat=n})),Et=o(((e,t)=>{(function(n,r){typeof e==`object`&&t!==void 0?r(e):typeof define==`function`&&define.amd?define([`exports`],r):r((n||=self).predicates={})})(e,function(e){let t=134217729;function n(e,t,n,r,i){let a,o,s,c,l=t[0],u=r[0],d=0,f=0;u>l==u>-l?(a=l,l=t[++d]):(a=u,u=r[++f]);let p=0;if(d<e&&f<n)for(u>l==u>-l?(s=a-((o=l+a)-l),l=t[++d]):(s=a-((o=u+a)-u),u=r[++f]),a=o,s!==0&&(i[p++]=s);d<e&&f<n;)u>l==u>-l?(s=a-((o=a+l)-(c=o-a))+(l-c),l=t[++d]):(s=a-((o=a+u)-(c=o-a))+(u-c),u=r[++f]),a=o,s!==0&&(i[p++]=s);for(;d<e;)s=a-((o=a+l)-(c=o-a))+(l-c),l=t[++d],a=o,s!==0&&(i[p++]=s);for(;f<n;)s=a-((o=a+u)-(c=o-a))+(u-c),u=r[++f],a=o,s!==0&&(i[p++]=s);return a===0&&p!==0||(i[p++]=a),p}function r(e){return new Float64Array(e)}let i=r(4),a=r(8),o=r(12),s=r(16),c=r(4);e.orient2d=function(e,r,l,u,d,f){let p=(r-f)*(l-d),m=(e-d)*(u-f),h=p-m;if(p===0||m===0||p>0!=m>0)return h;let g=Math.abs(p+m);return Math.abs(h)>=33306690738754716e-32*g?h:-function(e,r,l,u,d,f,p){let m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M=e-d,N=l-d,P=r-f,F=u-f;v=(O=(x=M-(b=(y=t*M)-(y-M)))*(C=F-(S=(y=t*F)-(y-F)))-((D=M*F)-b*S-x*S-b*C))-(w=O-(A=(x=P-(b=(y=t*P)-(y-P)))*(C=N-(S=(y=t*N)-(y-N)))-((k=P*N)-b*S-x*S-b*C))),i[0]=O-(w+v)+(v-A),v=(E=D-((T=D+w)-(v=T-D))+(w-v))-(w=E-k),i[1]=E-(w+v)+(v-k),v=(j=T+w)-T,i[2]=T-(j-v)+(w-v),i[3]=j;let I=function(e,t){let n=t[0];for(let r=1;r<e;r++)n+=t[r];return n}(4,i),R=22204460492503146e-32*p;if(I>=R||-I>=R||(m=e-(M+(v=e-M))+(v-d),g=l-(N+(v=l-N))+(v-d),h=r-(P+(v=r-P))+(v-f),_=u-(F+(v=u-F))+(v-f),m===0&&h===0&&g===0&&_===0)||(R=11093356479670487e-47*p+33306690738754706e-32*Math.abs(I),(I+=M*_+F*m-(P*g+N*h))>=R||-I>=R))return I;v=(O=(x=m-(b=(y=t*m)-(y-m)))*(C=F-(S=(y=t*F)-(y-F)))-((D=m*F)-b*S-x*S-b*C))-(w=O-(A=(x=h-(b=(y=t*h)-(y-h)))*(C=N-(S=(y=t*N)-(y-N)))-((k=h*N)-b*S-x*S-b*C))),c[0]=O-(w+v)+(v-A),v=(E=D-((T=D+w)-(v=T-D))+(w-v))-(w=E-k),c[1]=E-(w+v)+(v-k),v=(j=T+w)-T,c[2]=T-(j-v)+(w-v),c[3]=j;let z=n(4,i,4,c,a);v=(O=(x=M-(b=(y=t*M)-(y-M)))*(C=_-(S=(y=t*_)-(y-_)))-((D=M*_)-b*S-x*S-b*C))-(w=O-(A=(x=P-(b=(y=t*P)-(y-P)))*(C=g-(S=(y=t*g)-(y-g)))-((k=P*g)-b*S-x*S-b*C))),c[0]=O-(w+v)+(v-A),v=(E=D-((T=D+w)-(v=T-D))+(w-v))-(w=E-k),c[1]=E-(w+v)+(v-k),v=(j=T+w)-T,c[2]=T-(j-v)+(w-v),c[3]=j;let ee=n(z,a,4,c,o);return v=(O=(x=m-(b=(y=t*m)-(y-m)))*(C=_-(S=(y=t*_)-(y-_)))-((D=m*_)-b*S-x*S-b*C))-(w=O-(A=(x=h-(b=(y=t*h)-(y-h)))*(C=g-(S=(y=t*g)-(y-g)))-((k=h*g)-b*S-x*S-b*C))),c[0]=O-(w+v)+(v-A),v=(E=D-((T=D+w)-(v=T-D))+(w-v))-(w=E-k),c[1]=E-(w+v)+(v-k),v=(j=T+w)-T,c[2]=T-(j-v)+(w-v),c[3]=j,s[n(ee,o,4,c,s)-1]}(e,r,l,u,d,f,g)},e.orient2dfast=function(e,t,n,r,i,a){return(t-a)*(n-i)-(e-i)*(r-a)},Object.defineProperty(e,`__esModule`,{value:!0})})})),Dt=o(((e,t)=>{var n=mt(),r=(St(),g(yt)),i=Tt(),a=Et().orient2d;r.default&&(r=r.default),t.exports=o,t.exports.default=o;function o(e,t,r){t=Math.max(0,t===void 0?2:t),r||=0;var i=h(e),a=new n(16);a.toBBox=function(e){return{minX:e[0],minY:e[1],maxX:e[0],maxY:e[1]}},a.compareMinX=function(e,t){return e[0]-t[0]},a.compareMinY=function(e,t){return e[1]-t[1]},a.load(e);for(var o=[],c=0,l;c<i.length;c++){var u=i[c];a.remove(u),l=_(u,l),o.push(l)}var d=new n(16);for(c=0;c<o.length;c++)d.insert(m(o[c]));for(var f=t*t,p=r*r;o.length;){var g=o.shift(),y=g.p,b=g.next.p,x=v(y,b);if(!(x<p)){var S=x/f;u=s(a,g.prev.p,y,b,g.next.next.p,S,d),u&&Math.min(v(u,y),v(u,b))<=S&&(o.push(g),o.push(_(u,g)),a.remove(u),d.remove(g),d.insert(m(g)),d.insert(m(g.next)))}}g=l;var C=[];do C.push(g.p),g=g.next;while(g!==l);return C.push(g.p),C}function s(e,t,n,i,a,o,s){for(var u=new r([],c),f=e.data;f;){for(var p=0;p<f.children.length;p++){var m=f.children[p],h=f.leaf?y(m,n,i):l(n,i,m);h>o||u.push({node:m,dist:h})}for(;u.length&&!u.peek().node.children;){var g=u.pop(),_=g.node,v=y(_,t,n),b=y(_,i,a);if(g.dist<v&&g.dist<b&&d(n,_,s)&&d(i,_,s))return _}f=u.pop(),f&&=f.node}return null}function c(e,t){return e.dist-t.dist}function l(e,t,n){if(u(e,n)||u(t,n))return 0;var r=b(e[0],e[1],t[0],t[1],n.minX,n.minY,n.maxX,n.minY);if(r===0)return 0;var i=b(e[0],e[1],t[0],t[1],n.minX,n.minY,n.minX,n.maxY);if(i===0)return 0;var a=b(e[0],e[1],t[0],t[1],n.maxX,n.minY,n.maxX,n.maxY);if(a===0)return 0;var o=b(e[0],e[1],t[0],t[1],n.minX,n.maxY,n.maxX,n.maxY);return o===0?0:Math.min(r,i,a,o)}function u(e,t){return e[0]>=t.minX&&e[0]<=t.maxX&&e[1]>=t.minY&&e[1]<=t.maxY}function d(e,t,n){for(var r=Math.min(e[0],t[0]),i=Math.min(e[1],t[1]),a=Math.max(e[0],t[0]),o=Math.max(e[1],t[1]),s=n.search({minX:r,minY:i,maxX:a,maxY:o}),c=0;c<s.length;c++)if(p(s[c].p,s[c].next.p,e,t))return!1;return!0}function f(e,t,n){return a(e[0],e[1],t[0],t[1],n[0],n[1])}function p(e,t,n,r){return e!==r&&t!==n&&f(e,t,n)>0!=f(e,t,r)>0&&f(n,r,e)>0!=f(n,r,t)>0}function m(e){var t=e.p,n=e.next.p;return e.minX=Math.min(t[0],n[0]),e.minY=Math.min(t[1],n[1]),e.maxX=Math.max(t[0],n[0]),e.maxY=Math.max(t[1],n[1]),e}function h(e){for(var t=e[0],n=e[0],r=e[0],a=e[0],o=0;o<e.length;o++){var s=e[o];s[0]<t[0]&&(t=s),s[0]>r[0]&&(r=s),s[1]<n[1]&&(n=s),s[1]>a[1]&&(a=s)}var c=[t,n,r,a],l=c.slice();for(o=0;o<e.length;o++)i(e[o],c)||l.push(e[o]);return S(l)}function _(e,t){var n={p:e,prev:null,next:null,minX:0,minY:0,maxX:0,maxY:0};return t?(n.next=t.next,n.prev=t,t.next.prev=n,t.next=n):(n.prev=n,n.next=n),n}function v(e,t){var n=e[0]-t[0],r=e[1]-t[1];return n*n+r*r}function y(e,t,n){var r=t[0],i=t[1],a=n[0]-r,o=n[1]-i;if(a!==0||o!==0){var s=((e[0]-r)*a+(e[1]-i)*o)/(a*a+o*o);s>1?(r=n[0],i=n[1]):s>0&&(r+=a*s,i+=o*s)}return a=e[0]-r,o=e[1]-i,a*a+o*o}function b(e,t,n,r,i,a,o,s){var c=n-e,l=r-t,u=o-i,d=s-a,f=e-i,p=t-a,m=c*c+l*l,h=c*u+l*d,g=u*u+d*d,_=c*f+l*p,v=u*f+d*p,y=m*g-h*h,b,x,S,C,w=y,T=y;y===0?(x=0,w=1,C=v,T=g):(x=h*v-g*_,C=m*v-h*_,x<0?(x=0,C=v,T=g):x>w&&(x=w,C=v+h,T=g)),C<0?(C=0,-_<0?x=0:-_>m?x=w:(x=-_,w=m)):C>T&&(C=T,-_+h<0?x=0:-_+h>m?x=w:(x=-_+h,w=m)),b=x===0?0:x/w,S=C===0?0:C/T;var E=(1-b)*e+b*n,D=(1-b)*t+b*r,O=(1-S)*i+S*o,k=(1-S)*a+S*s,A=O-E,j=k-D;return A*A+j*j}function x(e,t){return e[0]===t[0]?e[1]-t[1]:e[0]-t[0]}function S(e){e.sort(x);for(var t=[],n=0;n<e.length;n++){for(;t.length>=2&&f(t[t.length-2],t[t.length-1],e[n])<=0;)t.pop();t.push(e[n])}for(var r=[],i=e.length-1;i>=0;i--){for(;r.length>=2&&f(r[r.length-2],r[r.length-1],e[i])<=0;)r.pop();r.push(e[i])}return r.pop(),t.pop(),t.concat(r)}}));function Ot(e,t={}){t.concavity=t.concavity||1/0;let n=[];if(Me(e,e=>{n.push([e[0],e[1]])}),!n.length)return null;let r=(0,kt.default)(n,t.concavity);return r.length>3?ge([r]):null}var kt,At=a((()=>{we(),Fe(),kt=_(Dt(),1)}));function jt(e){if(!e)throw Error(`geojson is required`);switch(e.type){case`Feature`:return Mt(e);case`FeatureCollection`:return Pt(e);case`Point`:case`LineString`:case`Polygon`:case`MultiPoint`:case`MultiLineString`:case`MultiPolygon`:case`GeometryCollection`:return Ft(e);default:throw Error(`unknown GeoJSON type`)}}function Mt(e){let t={type:`Feature`};return Object.keys(e).forEach(n=>{switch(n){case`type`:case`properties`:case`geometry`:return;default:t[n]=e[n]}}),t.properties=Nt(e.properties),e.geometry==null?t.geometry=null:t.geometry=Ft(e.geometry),t}function Nt(e){let t={};return e&&Object.keys(e).forEach(n=>{let r=e[n];typeof r==`object`?r===null?t[n]=null:Array.isArray(r)?t[n]=r.map(e=>e):t[n]=Nt(r):t[n]=r}),t}function Pt(e){let t={type:`FeatureCollection`};return Object.keys(e).forEach(n=>{switch(n){case`type`:case`features`:return;default:t[n]=e[n]}}),t.features=e.features.map(e=>Mt(e)),t}function Ft(e){let t={type:e.type};return e.bbox&&(t.bbox=e.bbox),e.type===`GeometryCollection`?(t.geometries=e.geometries.map(e=>Ft(e)),t):(t.coordinates=It(e.coordinates),t)}function It(e){let t=e;return typeof t[0]==`object`?t.map(e=>It(e)):t.slice()}var Lt=a((()=>{})),Rt=a((()=>{})),zt=a((()=>{})),Bt=a((()=>{})),Vt=a((()=>{})),Ht=a((()=>{}));function Ut(e,t){var n=e[0]-t[0],r=e[1]-t[1];return n*n+r*r}function Wt(e,t,n){var r=t[0],i=t[1],a=n[0]-r,o=n[1]-i;if(a!==0||o!==0){var s=((e[0]-r)*a+(e[1]-i)*o)/(a*a+o*o);s>1?(r=n[0],i=n[1]):s>0&&(r+=a*s,i+=o*s)}return a=e[0]-r,o=e[1]-i,a*a+o*o}function Gt(e,t){for(var n=e[0],r=[n],i,a=1,o=e.length;a<o;a++)i=e[a],Ut(i,n)>t&&(r.push(i),n=i);return n!==i&&r.push(i),r}function Kt(e,t,n,r,i){for(var a=r,o,s=t+1;s<n;s++){var c=Wt(e[s],e[t],e[n]);c>a&&(o=s,a=c)}a>r&&(o-t>1&&Kt(e,t,o,r,i),i.push(e[o]),n-o>1&&Kt(e,o,n,r,i))}function qt(e,t){var n=e.length-1,r=[e[0]];return Kt(e,0,n,t,r),r.push(e[n]),r}function Jt(e,t,n){if(e.length<=2)return e;var r=t===void 0?1:t*t;return e=n?e:Gt(e,r),e=qt(e,r),e}function Yt(e,t={}){if(t??={},!Se(t))throw Error(`options is invalid`);let n=t.tolerance??1,r=t.highQuality??!1,i=t.mutate??!1;if(!e)throw Error(`geojson is required`);if(n&&n<0)throw Error(`invalid tolerance`);return i!==!0&&(e=jt(e)),Ne(e,function(e){Xt(e,n,r)}),e}function Xt(e,t,n){let r=e.type;if(r===`Point`||r===`MultiPoint`)return e;if(ht(e,{mutate:!0}),r!==`GeometryCollection`)switch(r){case`LineString`:e.coordinates=Jt(e.coordinates,t,n);break;case`MultiLineString`:e.coordinates=e.coordinates.map(e=>Jt(e,t,n));break;case`Polygon`:e.coordinates=Zt(e.coordinates,t,n);break;case`MultiPolygon`:e.coordinates=e.coordinates.map(e=>Zt(e,t,n))}return e}function Zt(e,t,n){return e.map(function(e){if(e.length<4)throw Error(`invalid polygon`);let r=t,i=Jt(e,r,n);for(;!Qt(i)&&r>=2**-52;)r-=r*.01,i=Jt(e,r,n);return Qt(i)?((i[i.length-1][0]!==i[0][0]||i[i.length-1][1]!==i[0][1])&&i.push(i[0]),i):e})}function Qt(e){return e.length<3?!1:!(e.length===3&&e[2][0]===e[0][0]&&e[2][1]===e[0][1])}var $t=a((()=>{vt(),Lt(),Fe(),we()})),en=a((()=>{He(),ut(),Lt(),Rt(),At(),je(),we(),ke(),Fe(),zt(),Bt(),Vt(),Ht(),$t()}));function tn(e){let{r:t,normalized:n,durMin:r,totalPers:i,distance_m:a,dist_ini_fin:o,actualSeg:s,ptIni:c,isCompletada:l,hogaresRaw:u}=e,d=[];if(t._backend_meta&&t._backend_meta.flags){let e=t._backend_meta.flags;e.distance_gt_500m&&d.push(`FUERA_SEGMENTO`),e.hogar_count_mismatch&&d.push(`HOGARES_INCONSISTENTES`),e.integrantes_mismatch&&d.push(`INTEGRANTES_INCONSISTENTES`),e.wrong_segment&&d.push(`SEGMENTO_INCORRECTO`),e.far_from_control&&d.push(`CONTROL_DISTANTE`)}try{let e=y(t[`start-geopoint`]||t.start_geopoint)||(t._geolocation?.length>=2?[t._geolocation[0],t._geolocation[1]]:null);e&&c&&c[0]&&Ae([e[1],e[0]],[c[1],c[0]],{units:`meters`})>500&&d.push(`APERT_LEJOS`)}catch{}a!==null&&a>600&&!d.includes(`FUERA_SEGMENTO`)&&d.push(`FUERA_SEGMENTO`),o!==null&&o>30&&d.push(`DESPLAZAMIENTO_ANOMALO`),l&&r!==null&&(n.formType===`EHM`&&i===1&&r<10?d.push(`TIEMPO_CORTO_EHM`):n.formType!==`EHM`&&r<15?d.push(`TIEMPO_CORTO_ESCA`):r<15&&d.push(`TIEMPO_CORTO`)),l&&r!==null&&r>45&&d.push(`TIEMPO_LARGO`);let f=n.cedula;if(f&&f!==`N/A`){let e=f.replace(/\D/g,``);(e.length<6||e.length>9)&&d.push(`CEDULA_INVALIDA`)}u.forEach(e=>{(Array.isArray(e[`datos_hogar/hogar/integrantes_hogar`])?e[`datos_hogar/hogar/integrantes_hogar`]:[]).forEach(e=>{let t=e[`datos_hogar/hogar/integrantes_hogar/integrantes/cuanto_actividad`];if(t!=null&&t!==``){let e=Number(t);!isNaN(e)&&(e<1||e>9999999)&&(d.includes(`INGRESO_ANOMALO`)||d.push(`INGRESO_ANOMALO`))}})}),u.forEach(e=>{let t=e[`datos_hogar/hogar/productos_22/arranque`]||``,n=e[`datos_hogar/hogar/productos_22/productos`],r=Array.isArray(n)&&n.length>0;l&&r&&!t&&(d.includes(`ARRANQUE_INCONSISTENTE`)||d.push(`ARRANQUE_INCONSISTENTE`))});let p=n.segmento===`000`||n.segmento===`0`?n.sector:n.segmento;return s&&p&&(b(p,s)||d.push(`SEGMENTO_INCORRECTO`)),d}var nn=a((()=>{m(),D(),en()}));function rn(e){return e?String(e).toLowerCase().normalize(`NFD`).replace(/[\u0300-\u036f]/g,``).replace(/[^a-z0-9]/g,``).trim():``}function an(e,t){let n=rn(e||``),r=rn(t||``);if(r===`ocupadaconocupantespresentes`||n===`ocupadaconocupantespresentes`||n.includes(`totalmenteencuestad`))return`Totalmente Encuestado`;if(r===`ocupadasconocupantesausentes`||n===`nadieenvivienda`||n===`ausentetemporalmente`||n===`rehusoentrevista`||n===`otroausentes`)return n===`nadieenvivienda`||n.includes(`nadieenvivienda`)?`Ocupantes Ausentes`:n===`ausentetemporalmente`||n.includes(`ausentetemporalmente`)?`Ausente Temporalmente`:n===`rehusoentrevista`||n.includes(`rehuso`)||n.includes(`rechaz`)?`Rechazada`:`Ocupantes Ausentes`;if(r===`desocupada`||n){if(n===`desocupadaestadoregular`||n.includes(`desocupadaestadoregular`))return`Vivienda Desocupada`;if(n===`inadecuadaeluso`||n.includes(`inadecuadaeluso`)||n.includes(`inadecuadaparaeluso`))return`Inadecuada para Uso`;if(n===`construyendose`||n.includes(`construyendose`)||n.includes(`construc`))return`Construccion`;if(n===`temporalmenteennegocio`||n.includes(`temporalmenteennegocio`))return`Temporalmente en Negocio`;if(n===`usovacacional`||n===`usovacasional`||n.includes(`usovacacional`)||n.includes(`usoocacional`))return`Uso Vacasional`;if(n===`demolida`||n.includes(`demolid`))return`Demolida`;if(n===`negocioalmacenpermanente`||n.includes(`negocioalmacen`)||n.includes(`negociopermanente`)||n.includes(`ferreteria`)||n.includes(`autolavado`)||n.includes(`comercio`)||n.includes(`taller`))return`Negocio Permanente`;if(n===`consolidada`||n.includes(`consolidada`))return`Consolidada`;if(n===`otrodesocupada`||n===`otro`||n.includes(`otro`))return`Otro (Especifique)`}return`Otro (Especifique)`}function on(e){return sn[an(e,e)]||`NO DEFINIDO`}var sn,cn=a((()=>{sn={"Totalmente Encuestado":`TIPO E`,"Ocupantes Ausentes":`TIPO A`,"Ausente Temporalmente":`TIPO A`,Rechazada:`TIPO A`,"Informante No Calificado":`TIPO A`,Incompleta:`TIPO A`,Pendiente:`TIPO A`,"No Atiende Telefono":`TIPO A`,"Sin Entrevista":`TIPO A`,"Vivienda Desocupada":`TIPO B`,"Inadecuada para Uso":`TIPO B`,Construccion:`TIPO B`,"Temporalmente en Negocio":`TIPO B`,"Uso Vacasional":`TIPO B`,"Vivienda Ocasional":`TIPO B`,Demolida:`TIPO C`,"Negocio Permanente":`TIPO C`,Consolidada:`TIPO C`,"Otro (Especifique)":`TIPO C`,"Mal Listada":`TIPO C`,"No Existe":`TIPO C`,"Sin Listar":`TIPO C`,"Otra Condicion":`TIPO C`,"Otra Situacion":`TIPO C`,"No Existe Nro Telefonico":`TIPO C`}}));function ln(e){if(!l.planificacionData||!l.planificacionData.por_semana||!e||e.size===0)return 0;let t=l.assetName&&l.assetName.toUpperCase().includes(`EHM`)?`EHM`:`ESCA`,n=0;return l.planificacionData.por_semana.forEach(r=>{if(r.programa!==t)return;let i=String(r.control).slice(-4).padStart(4,`0`);e.has(i)&&(n+=r.n_viviendas||0)}),n}var un=a((()=>{m(),D()}));async function dn(){console.log(`data/index.js: Processing data pipeline (Optimized)...`),l.encMap={};let e=l.controlsIndex instanceof Map&&l.controlsIndex.size>0,t=l.rawData.length;for(let n=0;n<t;n+=500){let r=Math.min(n+500,t);for(let t=n;t<r;t++){let n=l.rawData[t],r=se(n),i=n._backend_meta&&n._backend_meta.duration_minutes!==void 0?n._backend_meta.duration_minutes:ce(r.start,r.end),{totalPers:a,totalHombres:o,totalMujeres:s,hogaresCount:c,hogaresRaw:u}=ue(n,r.formType),{ptIni:d}=pe(n),f=n._geo_meta||{},p=f.lat??null,m=f.lng??null,h=f.distance_m??null,g=f.dist_ini_fin??null,_=f.actual_seg??null,v=0;Array.isArray(u)&&u.forEach(e=>{let t=(Array.isArray(e[`lista_hogar/lista_miembros`])?e[`lista_hogar/lista_miembros`]:Array.isArray(e[`datos_hogar/hogar/integrantes_hogar`])?e[`datos_hogar/hogar/integrantes_hogar`]:[]).length;if(t===0){let n=parseInt(e[`lista_hogar/personas_hogar`]||e[`lista_hogar/lista_miembros_count`]||`0`,10);isNaN(n)||(t=n)}t===1&&v++});let y=n[`Condici_n_de_ocupaci_n/situacion_vivienda`]||null,b=n[`Condici_n_de_ocupaci_n/condicion_de_ocupacion`]||null,x=on(r.situacion_vivienda||r.condicion),S=an(y,b),C=/totalment/i.test(r.nota)||x===`TIPO E`;if(n._meta={...r,durMin:i,totalPers:a,totalHombres:o,totalMujeres:s,hogares:c,hogaresUniPersonales:v,lat:p,lng:m,distance_m:h,dist_ini_fin:g,actual_seg:_,estado:C?`completada`:`no_efectiva`,tipo_vivienda:x,subtipo_vivienda:S,flag_distance_gt_500:h!==null&&h>500,flag_short_duration:i!==null&&i<10},n._meta.alertas=tn({r:n,normalized:r,durMin:i,totalPers:a,distance_m:h,dist_ini_fin:g,actualSeg:_,ptIni:d,isCompletada:C,hogaresRaw:u}),n._meta.hasAlerts=n._meta.alertas.length>0,e){let e=n._meta.control?n._meta.control.slice(-4):``,t=`${e}-${String(parseInt(n._meta.n_serie,10)||0)}-${String(parseInt(n._meta.n_linea,10)||0)}`,r=l.controlsIndex.has(t),i=l.validControls.has(e);n._meta._ls_ctrl_ok=i,n._meta._ls_serie_ok=r,n._meta._ls_linea_ok=r,r||n._meta.alertas.includes(`LINEA_SERIE_INVALIDA`)||(n._meta.alertas.push(`LINEA_SERIE_INVALIDA`),n._meta.hasAlerts=!0)}let{cedula:w,nombre:T,estado:E,mun:D,condicion:O,semana:k,control:A,tipo_vivienda:j,alertas:M}=n._meta;l.encMap[w]||(l.encMap[w]={cedula:w,nombre:T,encuestas:0,completadas:0,noEfectiva:0,tipoA:0,tipoB:0,tipoC:0,tipoE:0,alertasCount:0,duraciones:[],personas:0,municipios:new Set,condiciones:{},semanas:{},controlesSet:new Set});let N=l.encMap[w];N.encuestas++,E===`completada`?N.completadas++:N.noEfectiva++,j===`TIPO A`?N.tipoA++:j===`TIPO B`?N.tipoB++:j===`TIPO C`?N.tipoC++:j===`TIPO E`&&N.tipoE++,Array.isArray(M)&&M.length>0&&(N.alertasCount+=M.length),A&&N.controlesSet.add(String(A).slice(-4).padStart(4,`0`)),i!==null&&N.duraciones.push(i),N.personas+=a||0,N.municipios.add(D),N.condiciones[O]=(N.condiciones[O]||0)+1,k&&(N.semanas[k]||(N.semanas[k]=new Set),A&&N.semanas[k].add(A))}await new Promise(e=>setTimeout(e,0))}for(let e of Object.values(l.encMap)){let t=ln(e.controlesSet),n=(t>0?t:e.encuestas)-(e.tipoB+e.tipoC);e.avgDur=e.duraciones.length?e.duraciones.reduce((e,t)=>e+t,0)/e.duraciones.length:0,e.planificadas=t,e.noRespuesta=e.tipoA,e.pctCompleta=e.encuestas>0?Math.round(e.completadas/e.encuestas*100):0,e.pctNoRespuesta=n>0?Math.round(e.tipoA/n*100):0,e.score=e.pctNoRespuesta;let r=Object.values(e.semanas||{});e.avgControlesSemana=r.length?Math.round(r.reduce((e,t)=>e+t.size,0)/r.length):0,e.totalSemanas=r.length}console.log(`data/index.js: Pipeline completed ✓`)}var fn=a((()=>{m(),le(),fe(),me(),nn(),cn(),un()}));function pn(){let e=x(`activeFiltersContainer`),t=x(`activeFiltersBadge`);if(!e||!t)return;let n=[{id:`filterEncuestador`,label:`Encuestador`},{id:`filterMunicipio`,label:`Municipio`},{id:`filterParroquia`,label:`Parroquia`},{id:`filterNodo`,label:`Nodo`},{id:`filterEstado`,label:`Estado`},{id:`filterCondicion`,label:`Condición`},{id:`filterSituacionVivienda`,label:`Sit. Viv`},{id:`filterUso`,label:`Uso`},{id:`filterSemana`,label:`Semana`},{id:`filterControl`,label:`Control`},{id:`filterAlerta`,label:`Alerta`},{id:`filterClasificacion`,label:`Clasif`},{id:`filterTasaNoRespuesta`,label:`No Resp Ctrl`},{id:`filterHoraTransmision`,label:`Hora Trans`},{id:`filterHoraInicio`,label:`Hora Inicio`}],r=0;e.innerHTML=``;let i=(t,n,i)=>{r++;let a=document.createElement(`button`);a.className=`group flex items-center gap-1.5 px-2.5 py-1 bg-brand-blue/10 hover:bg-brand-red/10 border border-brand-blue/30 hover:border-brand-red/30 text-brand-blue hover:text-brand-red rounded-lg text-[10px] font-bold transition-all`,a.innerHTML=`
            <span class="opacity-70">${t}:</span> 
            <span class="truncate max-w-[220px]">${n}</span> 
            <i data-lucide="x" class="w-3 h-3 group-hover:scale-110 transition-transform"></i>
        `,a.addEventListener(`click`,()=>{i(),Y()}),e.appendChild(a)},a=x(`searchEncuesta`);a&&a.value.trim()&&i(`Búsqueda`,a.value.trim(),()=>{a.value=``,a.dispatchEvent(new Event(`input`))}),n.forEach(e=>{let t=x(e.id);if(t&&t.value){let n=(t.options[t.selectedIndex]?.text||t.value).replace(/\s*\(\d[\d.,]*\)$/,``);i(e.label,n,()=>{t.value=``,t.dispatchEvent(new Event(`change`))})}});let o=x(`filterFechaInicio`),s=x(`filterFechaFin`);o&&o.value&&i(`Desde`,o.value,()=>{o.value=``}),s&&s.value&&i(`Hasta`,s.value,()=>{s.value=``}),l.filterINE&&i(`Filtro`,`Solo INE`,()=>{l.filterINE=!1,x(`filterINE`)?.classList.remove(`active`,`bg-brand-emerald`,`text-white`)}),l.filterSEGEN&&i(`Filtro`,`Solo SEGEN`,()=>{l.filterSEGEN=!1,x(`filterSEGEN`)?.classList.remove(`active`,`bg-brand-purple`,`text-white`)}),r>0?(t.textContent=r,t.classList.remove(`hidden`),e.classList.remove(`hidden`)):(t.classList.add(`hidden`),t.textContent=`0`,e.classList.add(`hidden`)),window.lucide&&lucide.createIcons()}var mn=a((()=>{m(),D(),Dn()}));function hn(e){if(!e||e.tagName!==`SELECT`)return;let t=e.id,n=e.parentNode;if(!n)return;let r=n.querySelector(`.combobox-container[data-select-id="${t}"]`);r&&r.remove(),e.style.display=`none`;let i=document.createElement(`div`);i.className=`relative w-full combobox-container`,i.setAttribute(`data-select-id`,t);let a=e.options[e.selectedIndex],o=a?a.textContent:`Seleccionar...`,s=e.value;i.innerHTML=`
        <div class="combobox-trigger flex items-center justify-between w-full bg-white dark:bg-surface-dark border border-slate-300 dark:border-slate-700/80 rounded-xl ${n.querySelector(`i[data-lucide], svg.lucide`)===null?`px-3`:`pl-9 pr-2`} py-2 text-sm cursor-pointer focus-within:border-brand-blue/50 focus-within:ring-1 outline-none transition-all">
            <input type="text" class="combobox-input w-full bg-transparent border-none p-0 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-bold outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 truncate" placeholder="Buscar..." value="${o}" readonly autocomplete="off" />
            <span class="combobox-clear p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hidden mr-1 transition-all flex-none">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </span>
            <span class="combobox-arrow-btn text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors flex-none">
                <svg class="w-4 h-4 transition-transform combobox-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </span>
        </div>
        <div class="combobox-dropdown absolute left-0 right-0 mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl z-[100] max-h-60 overflow-y-auto hidden custom-scrollbar">
            <div class="p-1 space-y-0.5 combobox-list"></div>
        </div>
    `,n.insertBefore(i,e.nextSibling);let c=i.querySelector(`.combobox-input`),l=i.querySelector(`.combobox-dropdown`),u=i.querySelector(`.combobox-arrow`),d=i.querySelector(`.combobox-clear`),f=-1;function p(t=``){let n=i.querySelector(`.combobox-list`);n.innerHTML=``;let r=t.toLowerCase().trim(),a=Array.from(e.options),o=0;if(a.forEach(t=>{let i=t.textContent,a=t.value;if(!(r&&a===``)&&i.toLowerCase().includes(r)){o++;let r=document.createElement(`div`);r.className=`combobox-option px-3 py-1.5 text-xs rounded-lg font-bold cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all text-slate-700 dark:text-slate-300 flex items-center justify-between`,r.setAttribute(`data-value`,a),r.textContent=i;let s=t.getAttribute(`style`);s&&r.setAttribute(`style`,s),a===e.value&&r.classList.add(`bg-brand-blue/10`,`text-brand-blue`,`dark:bg-brand-blue/20`,`dark:text-brand-blue`),r.onclick=e=>{e.stopPropagation(),m(a,i)},n.appendChild(r)}}),o===0){let e=document.createElement(`div`);e.className=`px-3 py-2.5 text-xs text-slate-400 dark:text-slate-500 font-bold text-center italic`,e.textContent=`Sin coincidencias`,n.appendChild(e)}}function m(t,n){e.value=t,c.value=n,c.setAttribute(`readonly`,`true`),g(),t===``?d.classList.add(`hidden`):d.classList.remove(`hidden`),e.dispatchEvent(new Event(`change`))}function h(){l.classList.remove(`hidden`),u.classList.add(`rotate-180`),c.removeAttribute(`readonly`);let t=e.options[e.selectedIndex];c.placeholder=t?t.textContent:`Buscar...`,c.value=``,c.focus(),p(``),f=-1}function g(){l.classList.add(`hidden`),u.classList.remove(`rotate-180`),c.setAttribute(`readonly`,`true`),c.placeholder=`Buscar...`;let t=e.options[e.selectedIndex];c.value=t?t.textContent:``,f=-1}function _(){return Array.from(i.querySelectorAll(`.combobox-option`))}function v(){_().forEach((e,t)=>{t===f?(e.classList.add(`bg-slate-100`,`dark:bg-slate-800/80`,`ring-1`,`ring-brand-blue/30`),e.scrollIntoView({block:`nearest`})):e.classList.remove(`bg-slate-100`,`dark:bg-slate-800/80`,`ring-1`,`ring-brand-blue/30`)})}i.querySelector(`.combobox-trigger`).onclick=e=>{d.contains(e.target)||(l.classList.contains(`hidden`)?h():g())},c.oninput=()=>{p(c.value),f=-1},c.onkeydown=e=>{if(l.classList.contains(`hidden`)){(e.key===`ArrowDown`||e.key===`Enter`)&&(e.preventDefault(),h());return}let t=_();if(e.key===`ArrowDown`)e.preventDefault(),f=Math.min(f+1,t.length-1),v();else if(e.key===`ArrowUp`)e.preventDefault(),f=Math.max(f-1,0),v();else if(e.key===`Enter`){if(e.preventDefault(),f>=0&&t[f]){let e=t[f].getAttribute(`data-value`),n=t[f].textContent;m(e,n)}else if(t.length>0){let e=t[0].getAttribute(`data-value`),n=t[0].textContent;m(e,n)}}else e.key===`Escape`&&(e.preventDefault(),g(),c.blur())},d.onclick=t=>{t.stopPropagation(),m(``,e.options[0]?e.options[0].textContent:`Todos`)},s!==``&&d.classList.remove(`hidden`);let y=e=>{i.contains(e.target)||g()};document.addEventListener(`click`,y);let b=()=>{let t=e.options[e.selectedIndex],n=e.value;c.value=t?t.textContent:``,n===``?d.classList.add(`hidden`):d.classList.remove(`hidden`)};e.addEventListener(`change`,b);let x=new MutationObserver(t=>{t.forEach(t=>{t.removedNodes.forEach(t=>{t===i&&(document.removeEventListener(`click`,y),e.removeEventListener(`change`,b),x.disconnect())})})});x.observe(n,{childList:!0})}var gn=a((()=>{D()}));function _n(){let e=x(`offCanvasFilters`),t=x(`filtersOverlay`);!e||!t||(e.classList.remove(`translate-x-full`),t.classList.remove(`hidden`),setTimeout(()=>t.classList.remove(`opacity-0`),10))}function vn(){let e=x(`offCanvasFilters`),t=x(`filtersOverlay`);!e||!t||(e.classList.add(`translate-x-full`),t.classList.add(`opacity-0`),setTimeout(()=>t.classList.add(`hidden`),300))}function yn(){let e=x(`filterEncuestador`);if(!e)return;let n=e.value;e.innerHTML=`<option value="">Todos</option>`,Object.values(l.encMap).sort((e,t)=>(e.nombre||``).localeCompare(t.nombre||``)).forEach(n=>{let r=p.has(String(n.cedula).trim());if(l.filterINE&&!r||l.filterSEGEN&&r)return;let i=n.nombre&&n.nombre!==`Desconocido`?n.nombre:t[n.cedula]||`Encuestador ${n.cedula}`,a=document.createElement(`option`);a.value=n.cedula,a.textContent=`${i} (${n.cedula})${r?` [INE]`:` [SEGEN]`}`,a.style.color=r?`#10B981`:`#8B5CF6`,a.style.fontWeight=`bold`,e.appendChild(a)}),n&&(Array.from(e.options).some(e=>e.value===n)?e.value=n:e.value=``),hn(e)}function bn(){let e=x(`filterMunicipio`);x(`filterParroquia`),x(`filterNodo`),x(`filterControl`);let t=x(`filterSemana`);e&&e.addEventListener(`change`,()=>{let n=e.value;xn(n,t?.value)}),t&&t.addEventListener(`change`,()=>{let n=t.value;xn(e?.value,n)})}function xn(e,t){let n=x(`filterParroquia`),r=x(`filterNodo`),i=x(`filterControl`),a=l.rawData.filter(n=>{let r=n._meta;return!(!r||e&&r.mun!==e||t&&r.semana!==t)}),o={},s={},c={};a.forEach(e=>{let t=e._meta;t.par&&t.par!==`N/A`&&(o[t.par]=(o[t.par]||0)+1),t.nodo&&t.nodo!==`N/A`&&(s[t.nodo]=(s[t.nodo]||0)+1),t.control&&(c[t.control]=(c[t.control]||0)+1)});let u=(e,t,n)=>{if(!e)return;let r=e.value;e.innerHTML=`<option value="">${n}</option>`,Object.entries(t).sort((e,t)=>e[0].localeCompare(t[0])).forEach(([t,n])=>{let r=document.createElement(`option`);r.value=t,r.textContent=`${t} (${n.toLocaleString(`es-VE`)})`,e.appendChild(r)}),r&&t[r]?e.value=r:e.value=``,hn(e)};u(n,o,`Todas las parroquias`),u(r,s,`Todos los nodos`),u(i,c,`Todos los controles`)}function Sn(){let e={enc:x(`filterEncuestador`),mun:x(`filterMunicipio`),con:x(`filterCondicion`),sit:x(`filterSituacionVivienda`),uso:x(`filterUso`),sem:x(`filterSemana`),ctrl:x(`filterControl`),par:x(`filterParroquia`),nodo:x(`filterNodo`),alerta:x(`filterAlerta`),htrans:x(`filterHoraTransmision`),hinicio:x(`filterHoraInicio`)};Object.values(e).forEach(e=>{if(e){if(e.id===`filterEncuestador`)return;let t=`Todos`;e.id===`filterAlerta`?t=`Todas las alertas`:e.id===`filterHoraTransmision`||e.id===`filterHoraInicio`?t=`Cualquier hora`:(e.id.includes(`Condicion`)||e.id.includes(`Semana`)||e.id.includes(`Parroquia`)||e.id.includes(`Municipio`))&&(t=`Todos`),e.innerHTML=`<option value="">${t}</option>`}}),e.alerta&&f.forEach(t=>{let n=document.createElement(`option`);n.value=t.code,n.textContent=t.label,e.alerta.appendChild(n)});let t={muns:{},sitVs:{},cons:{},usos:{},semanas:{},controles:{},pars:{},nodos:{},hTrans:{},hInicio:{}};yn(),l.rawData.forEach(e=>{let n=e._meta;n&&(n.mun&&n.mun!==`N/A`&&(t.muns[n.mun]=(t.muns[n.mun]||0)+1),n.situacion_vivienda&&(t.sitVs[n.situacion_vivienda]=(t.sitVs[n.situacion_vivienda]||0)+1),n.condicion&&n.condicion!==`N/A`&&(t.cons[n.condicion]=(t.cons[n.condicion]||0)+1),n.uso&&n.uso!==`N/A`&&(t.usos[n.uso]=(t.usos[n.uso]||0)+1),n.semana&&(t.semanas[n.semana]=(t.semanas[n.semana]||0)+1),n.control&&(t.controles[n.control]=(t.controles[n.control]||0)+1),n.par&&n.par!==`N/A`&&(t.pars[n.par]=(t.pars[n.par]||0)+1),n.nodo&&n.nodo!==`N/A`&&(t.nodos[n.nodo]=(t.nodos[n.nodo]||0)+1),n.hora_trans!==void 0&&n.hora_trans!==null&&(t.hTrans[n.hora_trans]=(t.hTrans[n.hora_trans]||0)+1),n.hora!==void 0&&n.hora!==null&&(t.hInicio[n.hora]=(t.hInicio[n.hora]||0)+1))});let n=(e,t,n)=>{e&&Object.entries(t).sort((e,t)=>e[0].localeCompare(t[0])).forEach(([t,r])=>{let i=document.createElement(`option`);i.value=t,i.textContent=`${n?n(t):t} (${r.toLocaleString(`es-VE`)})`,e.appendChild(i)})};n(e.mun,t.muns,e=>d(e)),n(e.par,t.pars),n(e.nodo,t.nodos),n(e.sem,t.semanas),n(e.ctrl,t.controles),n(e.sit,t.sitVs,e=>e.replace(/_/g,` `).toUpperCase()),n(e.con,t.cons,e=>e.replace(/_/g,` `).toUpperCase()),n(e.uso,t.usos,e=>e.replace(/_/g,` `).toUpperCase()),n(e.htrans,t.hTrans,e=>`${e}:00`),n(e.hinicio,t.hInicio,e=>`${e}:00`),[`filterMunicipio`,`filterParroquia`,`filterNodo`,`filterEstado`,`filterClasificacion`,`filterCondicion`,`filterSituacionVivienda`,`filterUso`,`filterSemana`,`filterControl`,`filterHoraInicio`,`filterHoraTransmision`,`filterAlerta`,`filterEncuestador`,`filterTasaNoRespuesta`].forEach(e=>{let t=x(e);t&&hn(t)}),bn()}var Cn=a((()=>{m(),D(),gn()}));function wn(e){En=e}function Y(){yn();let e=x(`searchEncuesta`)?.value.toLowerCase()??``,t=x(`filterEncuestador`)?.value??``,n=x(`filterFechaInicio`)?.value??``,r=x(`filterFechaFin`)?.value??``,i=x(`filterSemana`)?.value??``,a=x(`filterControl`)?.value??``,o=x(`filterMunicipio`)?.value??``,s=x(`filterParroquia`)?.value??``,c=x(`filterNodo`)?.value??``,u=x(`filterEstado`)?.value??``,d=x(`filterSituacionVivienda`)?.value??``,f=x(`filterCondicion`)?.value??``,m=x(`filterUso`)?.value??``,h=x(`filterAlerta`)?.value??``,g=x(`filterHoraTransmision`)?.value??``,_=x(`filterHoraInicio`)?.value??``,v=x(`filterClasificacion`)?.value??``,y=x(`filterTasaNoRespuesta`)?.value??``,b=new Set;if(y!==``){let e={},t=l.assetName&&l.assetName.toUpperCase().includes(`EHM`)?`EHM`:`ESCA`;l.planificacionData?.por_semana&&l.planificacionData.por_semana.forEach(n=>{if(n.programa!==t)return;let r=String(n.control).replace(/\D/g,``).padStart(4,`0`);e[r]||(e[r]={planif:0,tipoA:0,tipoB:0,tipoC:0,totalCaptured:0}),e[r].planif+=n.n_viviendas||0}),l.rawData.forEach(t=>{let n=t._meta;if(!n||!n.control)return;let r=String(n.control).replace(/\D/g,``).padStart(4,`0`);e[r]||(e[r]={planif:0,tipoA:0,tipoB:0,tipoC:0,totalCaptured:0}),e[r].totalCaptured++,n.tipo_vivienda===`TIPO A`?e[r].tipoA++:n.tipo_vivienda===`TIPO B`?e[r].tipoB++:n.tipo_vivienda===`TIPO C`&&e[r].tipoC++}),Object.entries(e).forEach(([e,t])=>{let n=(t.planif>0?t.planif:t.totalCaptured)-(t.tipoB+t.tipoC),r=n>0?t.tipoA/n*100:t.tipoA>0?100:0;(y===`con_no_resp`&&r>0||y===`sin_no_resp`&&r===0)&&b.add(e)})}l.filtered=l.rawData.filter(x=>{let S=x._meta;if(!S||e&&!(S.nombre.toLowerCase().includes(e)||S.cedula.includes(e)||S.control.includes(e))||t&&S.cedula!==t||l.filterINE&&!p.has(String(S.cedula).trim())||l.filterSEGEN&&p.has(String(S.cedula).trim())||n&&S.fecha<n||r&&S.fecha>r||i&&S.semana!==i||a&&S.control!==a||o&&S.mun!==o||s&&S.par!==s||c&&S.nodo!==c)return!1;if(y!==``){let e=String(S.control).replace(/\D/g,``).padStart(4,`0`);if(!b.has(e))return!1}return!(u===`completada`&&S.estado!==`completada`||u===`no_efectiva`&&S.estado===`completada`||l.quickFilterMode===`efectivas`&&S.estado!==`completada`||l.quickFilterMode===`no_efectiva`&&S.estado===`completada`||l.quickFilterMode===`alertas`&&!S.hasAlerts||d&&S.situacion_vivienda!==d||f&&S.condicion!==f||m&&S.uso!==m||h&&!S.alertas.includes(h)||g!==``&&String(S.hora_trans)!==g||_!==``&&String(S.hora)!==_||v&&S.tipo_vivienda!==v)}),pn(),typeof En==`function`&&En(),document.dispatchEvent(new CustomEvent(`filtersApplied`))}function Tn(){[`filterEncuestador`,`filterFechaInicio`,`filterFechaFin`,`filterSemana`,`filterControl`,`filterMunicipio`,`filterParroquia`,`filterNodo`,`filterEstado`,`filterCondicion`,`filterSituacionVivienda`,`filterUso`,`filterAlerta`,`filterHoraTransmision`,`filterHoraInicio`,`filterClasificacion`,`filterTasaNoRespuesta`,`searchEncuesta`,`mm111SearchControl`].forEach(e=>{let t=x(e);t&&(t.value=``,t.tagName===`SELECT`&&t.dispatchEvent(new Event(`change`)))}),l.filterINE=!1,l.filterSEGEN=!1,[`filterINE`,`filterSEGEN`].forEach(e=>{let t=x(e);t&&t.classList.remove(`active`,`bg-brand-emerald`,`bg-brand-purple`,`text-white`)}),l.filtered=[...l.rawData],l.quickFilterMode=`all`,typeof window.setQuickFilter==`function`&&window.setQuickFilter(`all`),document.querySelectorAll(`.custom-preset-chip`).forEach(e=>{e.classList.remove(`ring-2`,`ring-indigo-400`,`bg-indigo-500/20`),e.classList.add(`bg-indigo-500/10`)}),pn(),typeof En==`function`&&En()}var En,Dn=a((()=>{m(),D(),mn(),Cn(),En=()=>{}}));function On(){try{let e=localStorage.getItem(Un);return e?JSON.parse(e):[]}catch{return[]}}function kn(e){try{localStorage.setItem(Un,JSON.stringify(e))}catch{}}function An(){let e={};return Gn.forEach(t=>{let n=x(t);e[t]=n?n.value:``}),e.filterINE=l.filterINE||!1,e.filterSEGEN=l.filterSEGEN||!1,e.quickFilterMode=l.quickFilterMode||`all`,e}function jn(e){return Gn.some(t=>e[t]&&e[t]!==``)||e.filterINE||e.filterSEGEN||e.quickFilterMode&&e.quickFilterMode!==`all`}function Mn(e){let{filters:t}=e;Gn.forEach(e=>{let n=x(e);if(!n)return;n.value=t[e]||``;let r=n.parentNode?.querySelector(`.combobox-container`);if(r){let e=r.querySelector(`.combobox-input`),t=r.querySelector(`.combobox-clear`);if(e){let t=Array.from(n.options).find(e=>e.value===n.value);e.value=t?t.textContent:`Todos`}t&&t.classList.toggle(`hidden`,!n.value)}}),l.filterINE=t.filterINE||!1,l.filterSEGEN=t.filterSEGEN||!1,l.quickFilterMode=t.quickFilterMode||`all`,[`filterINE`,`filterSEGEN`].forEach(e=>{let t=x(e);if(!t)return;let n=l[e],r=e===`filterINE`?`bg-brand-emerald`:`bg-brand-purple`;t.classList.toggle(`active`,n),t.classList.toggle(r,n),t.classList.toggle(`text-white`,n)}),Y(),Nn(e.id)}function Nn(e){document.querySelectorAll(`.custom-preset-chip`).forEach(t=>{let n=t.dataset.presetId===e;t.classList.toggle(`ring-2`,n),t.classList.toggle(`ring-indigo-400`,n),t.classList.toggle(`bg-indigo-500/20`,n),t.classList.toggle(`bg-indigo-500/10`,!n)})}function Pn(e,t){let n=On();if(n.length>=Wn)return C(`Máximo de ${Wn} presets alcanzado. Elimina uno primero.`,`warning`),!1;let r=An();if(!jn(r))return C(`Aplica al menos un filtro antes de guardar.`,`warning`),!1;let i={id:`preset_${Date.now()}`,name:e.trim()||`Mi Preset`,icon:t||`bookmark`,filters:r,createdAt:new Date().toISOString()};return n.push(i),kn(n),In(),C(`Preset "${i.name}" guardado.`,`success`),!0}function Fn(e){kn(On().filter(t=>t.id!==e)),In()}function In(){let e=x(`customPresetsContainer`);if(!e)return;let t=On();if(e.innerHTML=``,t.length===0){e.classList.add(`hidden`);return}let n=document.createElement(`span`);n.className=`w-px h-4 bg-slate-300 dark:bg-slate-700 mx-1 self-center flex-none`,e.appendChild(n),t.forEach(t=>{let n=document.createElement(`button`);n.className=[`custom-preset-chip px-2.5 py-1 rounded-lg text-[10px] font-bold`,`bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400`,`border border-indigo-500/20 transition-all flex items-center gap-1.5`].join(` `),n.dataset.presetId=t.id,n.title=`Aplicar: ${t.name}`,n.innerHTML=`
            <i data-lucide="${t.icon}" class="w-3 h-3 flex-none pointer-events-none"></i>
            <span class="preset-label pointer-events-none max-w-[120px] truncate"></span>
            <span class="delete-preset-btn flex-none w-3.5 h-3.5 rounded-sm flex items-center justify-center hover:bg-red-500/20 hover:text-red-400 text-slate-400 transition-colors ml-0.5" title="Eliminar preset" data-id="${t.id}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-2.5 h-2.5 pointer-events-none"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </span>
        `,n.querySelector(`.preset-label`).textContent=t.name,n.addEventListener(`click`,e=>{if(e.target.closest(`.delete-preset-btn`)){e.stopPropagation(),Fn(t.id);return}Mn(t)}),e.appendChild(n)}),e.classList.remove(`hidden`),window.lucide&&lucide.createIcons({nodes:e.querySelectorAll(`[data-lucide]`)})}function Ln(){let e=x(`savePresetPopover`);e&&e.remove();let t=Kn.map(e=>`<button type="button" class="icon-opt w-7 h-7 flex items-center justify-center rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-500" data-icon="${e}" title="${e}" aria-label="${e}">
            <i data-lucide="${e}" class="w-3.5 h-3.5 pointer-events-none"></i>
        </button>`).join(``),n=document.createElement(`div`);return n.id=`savePresetPopover`,n.className=[`absolute top-full left-0 mt-2 z-[200]`,`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700`,`rounded-2xl shadow-2xl p-4 w-72 animate-slide-up`].join(` `),n.innerHTML=`
        <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-black text-slate-700 dark:text-slate-200 tracking-tight">Guardar Filtros como Preset</span>
            <button class="popover-close-btn text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors" aria-label="Cerrar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="w-4 h-4"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
        </div>
        <input class="preset-name-input w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-800 dark:text-slate-100 outline-none focus:border-indigo-400 transition-all mb-3"
            type="text" maxlength="30" placeholder="Nombre del preset (máx. 30 caracteres)" />
        <p class="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">Ícono</p>
        <div class="icon-grid flex flex-wrap gap-1 mb-4">
            ${t}
        </div>
        <button class="confirm-save-btn w-full py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-black transition-colors flex items-center justify-center gap-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="w-3.5 h-3.5"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
            Guardar Preset
        </button>
    `,n}function Rn(e,t){e.querySelectorAll(`.icon-opt`).forEach(e=>{e.classList.remove(`bg-indigo-100`,`text-indigo-500`),e.setAttribute(`aria-pressed`,`false`)}),t.classList.add(`bg-indigo-100`,`text-indigo-500`),t.setAttribute(`aria-pressed`,`true`)}function zn(e){if(qn){Bn();return}let t=Ln(),n=e.parentElement;[`relative`,`absolute`,`fixed`,`sticky`].includes(getComputedStyle(n).position)||(n.style.position=`relative`),n.appendChild(t),qn=!0;let r=Kn[0];window.lucide&&lucide.createIcons({nodes:Array.from(t.querySelectorAll(`[data-lucide]`))});let i=t.querySelector(`.icon-opt`);i&&Rn(t,i),t.querySelector(`.icon-grid`).addEventListener(`click`,e=>{let n=e.target.closest(`.icon-opt`);n&&(Rn(t,n),r=n.dataset.icon)});let a=t.querySelector(`.preset-name-input`),o=t.querySelector(`.confirm-save-btn`),s=t.querySelector(`.popover-close-btn`),c=()=>{Pn(a.value,r)&&Bn()};s.addEventListener(`click`,Bn),o.addEventListener(`click`,c),a.addEventListener(`keydown`,e=>{e.key===`Enter`&&c(),e.key===`Escape`&&Bn()}),setTimeout(()=>a.focus(),50),setTimeout(()=>document.addEventListener(`click`,Vn),100)}function Bn(){let e=x(`savePresetPopover`);e&&e.remove(),qn=!1,document.removeEventListener(`click`,Vn)}function Vn(e){let t=x(`savePresetPopover`),n=x(`btnSavePreset`);t&&!t.contains(e.target)&&e.target!==n&&Bn()}function Hn(){In();let e=x(`btnSavePreset`);e&&e.addEventListener(`click`,t=>{t.stopPropagation(),zn(e)})}var Un,Wn,Gn,Kn,qn,Jn=a((()=>{m(),D(),Dn(),Un=`esca_custom_presets`,Wn=8,Gn=[`filterEncuestador`,`filterMunicipio`,`filterSemana`,`filterControl`,`filterParroquia`,`filterNodo`,`filterEstado`,`filterClasificacion`,`filterCondicion`,`filterSituacionVivienda`,`filterUso`,`filterAlerta`,`filterHoraTransmision`,`filterHoraInicio`,`filterTasaNoRespuesta`,`filterFechaInicio`,`filterFechaFin`],Kn=[`bookmark`,`star`,`user`,`map-pin`,`calendar`,`filter`,`zap`,`flag`,`heart`,`target`,`briefcase`,`home`,`layers`,`tag`,`activity`],qn=!1})),Yn=a((()=>{Dn(),Cn(),mn(),Jn()})),Xn,X,Zn,Qn,$n,er,tr=a((()=>{Xn=(e,t)=>{if(!e)return null;if(e._meta&&e._meta[t]!==void 0&&e._meta[t]!==null)return e._meta[t];if(e[t]!==void 0&&e[t]!==null)return e[t];let n=String(t).split(`/`).map(e=>e.trim());for(let t of n)if(!(!t||t.includes(` `))&&e[t]!==void 0&&e[t]!==null)return e[t];return null},X=e=>e==null||e===``?`<span class="text-slate-500 font-medium italic">(No Registrado)</span>`:typeof e==`object`?`<pre class="text-[10px] bg-slate-950/20 p-2 rounded overflow-x-auto">${JSON.stringify(e,null,2)}</pre>`:`<span class="font-outfit font-bold text-slate-800 dark:text-slate-200 text-sm">${String(e)}</span>`,Zn=e=>{if(!e||typeof e!=`string`)return null;let t=e.trim().split(` `);return t.length>=2?{lat:parseFloat(t[0]),lng:parseFloat(t[1]),alt:t[2]?parseFloat(t[2]):null,acc:t[3]?parseFloat(t[3]):null}:null},Qn=(e,t)=>{if(!e||!t)return null;let n=e=>e*Math.PI/180,r=n(t.lat-e.lat),i=n(t.lng-e.lng),a=Math.sin(r/2)**2+Math.cos(n(e.lat))*Math.cos(n(t.lat))*Math.sin(i/2)**2;return 6371e3*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a))},$n=(e,t)=>String(parseInt(e,10)||0).padStart(t,`0`),er=(e,t,n)=>`${String(e||``).trim().slice(-4)}-${String(parseInt(t,10)||0)}-${String(parseInt(n,10)||0)}`}));function nr(e){let{stEntidad:t,stMpio:n,stParr:i,valHeader:a,valLeftLabel:o,valLeftVal:s,segmentMatchStatus:c,actualSegClasses:l,actualSegText:u,actualSeg:d,stSect:f,stNodo:p,stEncuestador:m,stCedula:g,stFecha:_,stEstado:v,stDur:y,stControl:b,stLinea:x,stSerie:S,ctrlPanelHtml:C,stHogares:w,stPers:T,stCond:E,stUso:D,stSubtipo:O,stDist:k,hasAlerts:A,alertsHtml:j,hasMapData:M,isFlagged:N,walkedDistance:P,rawDist:F,durMin:I,declaredSeg:R,alertas:z}=e,ee=M?`
        <div class="bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700/50 overflow-hidden mt-4">
            <div class="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <div class="flex items-center gap-3">
                    <h4 class="text-[10px] uppercase font-black text-brand-orange tracking-widest flex items-center gap-2 m-0">Verificación Geográfica Histórica</h4>
                    ${N?`<span class="px-2 py-0.5 rounded text-[9px] uppercase font-bold tracking-widest bg-brand-red/20 text-brand-red border border-brand-red/30">Desviación Detectada</span>`:``}
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
                        <div class="flex justify-between items-center mb-1 mt-2 md:mt-0"><span class="text-[10px] text-slate-500 font-bold">Seg. Declarado:</span><span class="text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300">#${R||`N/A`}</span></div>
                        <div class="flex justify-between items-center mb-2 border-b border-slate-100 dark:border-slate-700/50 pb-2"><span class="text-[10px] text-slate-500 font-bold">Seg. en Mapa:</span><span class="text-[10px] font-mono font-bold ${z.includes(`SEGMENTO_INCORRECTO`)||z.includes(`FUERA_SEGMENTO`)?`text-brand-red`:`text-brand-emerald`}">${d?`#`+d:`(Nulo)`}</span></div>
                        <div class="flex justify-between items-center mb-1"><span class="text-[10px] text-slate-500 font-bold">Desplazamiento:</span><span class="text-[10px] font-mono font-bold ${z.includes(`DESPLAZAMIENTO_ANOMALO`)?`text-brand-orange`:`text-slate-700 dark:text-slate-300`}">${P===null?`N/A`:Math.round(P)+`m`}</span></div>
                        <div class="flex justify-between items-center mb-1"><span class="text-[10px] text-slate-500 font-bold">Dist. Centro:</span><span class="text-[10px] font-mono font-bold ${N?`text-brand-red`:`text-brand-emerald`}">${F===null?`N/A`:Math.round(F)+`m`}</span></div>
                        <div class="flex justify-between items-center"><span class="text-[10px] text-slate-500 font-bold">Tiempo Base:</span><span class="text-[10px] font-mono text-brand-blue font-bold">${I?parseFloat(I).toFixed(2)+` min`:`N/A`}</span></div>
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
                    <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Parroquia</div>${i}</div>
                    
                    <div class="pt-3 border-t border-slate-200 dark:border-slate-700">
                        <div class="text-[10px] text-slate-500 font-bold uppercase mb-2">${a}</div>
                        <div class="flex items-center gap-2 mb-1">
                            <div class="flex-1 bg-white dark:bg-slate-900/50 p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-center shadow-sm">
                                <div class="text-[9px] text-slate-500 uppercase font-black mb-1">${o}</div>
                                <div class="font-outfit font-bold text-slate-800 dark:text-slate-200 text-sm">#${s}</div>
                            </div>
                            <div class="flex items-center justify-center min-w-[24px]">
                                ${c}
                            </div>
                            <div class="flex-1 ${l} p-2 rounded-lg border text-center">
                                <div class="font-outfit font-bold text-slate-500 uppercase font-black mb-1">En GeoJSON</div>
                                <div class="font-outfit font-bold ${u} text-sm">${d?`#`+d:`(Nulo)`}</div>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                        <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Sector</div>${f}</div>
                        <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Nodo</div>${p}</div>
                    </div>
                </div>
            </div>
            <div class="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-5 border border-slate-200 dark:border-slate-700/50">
                <h4 class="text-[10px] uppercase font-black text-brand-purple tracking-widest flex items-center gap-2 mb-4">Datos Operativos</h4>
                <div class="space-y-3">
                    <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Encuestador de Campo</div>${m}</div>
                    <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Documento ID</div>${g}</div>
                    <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Fecha y Hora de Carga</div>${_}</div>
                    <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Estatus del Registro</div>${v}</div>
                    <div class="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                        <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Duración Real</div>${y}</div>
                        <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Control Nro.</div>${b}</div>
                    </div>
                    <div class="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                        <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Nro. Línea</div>${x}</div>
                        <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Nro. Serie</div>${S}</div>
                    </div>
                </div>
            </div>

            ${C}

            <div class="bg-slate-50 dark:bg-slate-800/40 rounded-xl p-5 border border-slate-200 dark:border-slate-700/50">
                <h4 class="text-[10px] uppercase font-black text-brand-emerald tracking-widest flex items-center gap-2 mb-4">Resultados / Tipología</h4>
                <div class="space-y-3">
                    <div class="grid grid-cols-2 gap-2 pb-2 border-b border-slate-200 dark:border-slate-700">
                        <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Nro. Hogares</div>${w}</div>
                        <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Nro. Personas</div>${T}</div>
                    </div>
                    <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Condición de Ocupación</div>${E}</div>
                    ${O?`<div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Subtipo de Vivienda</div>
                        <span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest ${(r[O]||r.DEFAULT).badge}">${h[O]?h[O]+` - `:``}${O}</span></div>`:``}
                    <div><div class="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Uso Estructural</div>${D}</div>
                    <div class="pt-2 border-t border-slate-200 dark:border-slate-700">
                        <div class="text-[10px] text-slate-500 font-bold uppercase mb-1">Desplazamiento (Inicio &rarr; Fin)</div>
                        ${k}
                    </div>
                    <div class="pt-2 border-t border-slate-200 dark:border-slate-700">
                        <div class="flex items-center gap-1.5 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${A?`#EF4444`:`#10B981`}" stroke-width="2.5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                            <span class="text-[10px] text-slate-500 font-bold uppercase">${A?`Alertas (${z.length})`:`Sin Alertas`}</span>
                        </div>
                        ${j}
                    </div>
                </div>
            </div>
        </div>
        ${ee}
    `}function rr(e,t){return!e||e.length===0?`<span class="text-[10px] font-bold text-brand-emerald">✔ Encuesta dentro de parámetros normales</span>`:e.map(e=>{let n=u[e];if(!n)return``;let r=``;return e===`LINEA_SERIE_INVALIDA`&&(r=`<div class="mt-1 px-2 py-1 bg-red-100 dark:bg-red-900/30 rounded text-[9px] font-mono text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800/50">
                <b>Error de Datos:</b> ${t._ls_key_reported||`—`}
            </div>`),`<div class="mb-2 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rounded-lg">
            <div class="text-[10px] font-black text-brand-red mb-0.5">⚠ ${n.label}</div>
            <div class="text-[9px] text-slate-500 dark:text-slate-400 leading-tight">${n.detail.replace(/\n/g,` `).trim()}</div>
            ${r}
        </div>`}).join(``)}function ir(e){let{m:t,rawControl:n,rawSerie:r,rawLinea:i,_padM:a,hasCtrlIndex:o,ctrlEntry:s,ctrlKey:c}=e,l=o?``:`<div class="mt-2 text-[9px] text-slate-400 bg-slate-100 dark:bg-slate-800 rounded px-2 py-1.5 text-center">⚠ Índice de controles no cargado aún</div>`,u=``;o&&!s&&e.validCombos&&e.validCombos.length>0&&(u=`
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
    </div>`}function ar(e){return`<details class="mt-3 text-sm text-slate-400 group">
        <summary class="cursor-pointer font-bold text-[10px] uppercase tracking-widest flex items-center gap-2">Ver JSON crudo</summary>
        <pre class="text-[10px] bg-slate-100 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 p-2 rounded-lg mt-2 overflow-x-auto text-slate-700 dark:text-slate-300 font-mono">${JSON.stringify(e,null,2)}</pre>
    </details>`}function or(e){let{cod:t,mun:n,par:r,declaredSeg:i,actualSeg:a,featureLabel:o,displayId:s,color:c,isCurrent:l,isActual:u}=e,d=[l?`<span style="background:#FBBF2433;color:#FBBF24;border:1px solid #FBBF2466;padding:1px 6px;border-radius:4px;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.05em">Declarado</span>`:``,u&&!l?`<span style="background:#10B98133;color:#10B981;border:1px solid #10B98166;padding:1px 6px;border-radius:4px;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.05em">Calculado GPS</span>`:``,u&&l?`<span style="background:#10B98133;color:#10B981;border:1px solid #10B98166;padding:1px 6px;border-radius:4px;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.05em">✔ Coincide</span>`:``].filter(Boolean).join(` `);return`
        <div class="dark:text-slate-200" style="font-family:'Inter',sans-serif;min-width:180px;max-width:240px;padding:2px">
            <div class="dark:border-slate-700" style="font-family:'Outfit',sans-serif;font-weight:900;font-size:12px;color:#6366f1;border-bottom:1px solid #e2e8f0;padding-bottom:6px;margin-bottom:8px">
                ${o} <span class="text-slate-800 dark:text-white" style="font-size:15px;">#${s}</span>
            </div>
            ${d?`<div style="margin-bottom:8px;display:flex;gap:4px;flex-wrap:wrap">${d}</div>`:``}
            <div style="font-size:10px;margin-bottom:3px" class="text-slate-500 dark:text-slate-400"><b>Municipio:</b> ${n}</div>
            <div style="font-size:10px;" class="text-slate-500 dark:text-slate-400"><b>Parroquia:</b> ${r}</div>
        </div>`}function sr(e,t,n,r,i,a){return`<div class="font-inter p-1 w-52">
        <div class="font-outfit font-black text-xs uppercase tracking-widest border-b border-slate-200 pb-1 mb-2" style="color:${t}">${e}</div>
        <div class="flex justify-between items-center text-[10px] mb-1"><span class="font-bold text-slate-500">Coordenada:</span><span class="font-mono text-slate-700">${n.lat.toFixed(5)}, ${n.lng.toFixed(5)}</span></div>
        <div class="flex justify-between items-center text-[10px] mb-1"><span class="font-bold text-slate-500">Precisión GPS:</span><span class="font-mono font-bold">${r}</span></div>
        <div class="flex justify-between items-center text-[10px] mb-1"><span class="font-bold text-slate-500">Altitud Nivel Mar:</span><span class="font-mono text-slate-700">${i}</span></div>
        <div class="flex justify-between items-center text-[10px] border-t border-slate-100 pt-1 mt-1"><span class="font-bold text-slate-500">Hora de Captura:</span><span class="font-mono text-brand-purple font-bold">${a}</span></div>
    </div>`}var cr=a((()=>{m()}));function lr(e,t,n,r){return`<div class="p-2 font-sans">
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
    </div>`}function ur(e){return`<div style="font-family:Inter,sans-serif;font-size:11px;line-height:1.5">
        <b>Control ${e.CONTROL}</b> · Serie ${e.SERIE}<br>
        Línea ${e.LINEA} · Seg ${e.COD_SEG} · Manz ${e.COD_MANZA}
    </div>`}function dr(e,t,n,r,i,a,o,s){let c=a&&a.length>0,l=e.segmento||e.sector||e.manzana||e.parcela||e.edificacion||e.direccion?`
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
                        <div class="text-[10px] font-bold text-slate-800 dark:text-white">${d(e.mun)}</div>
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
                ${a.map(e=>{let t=u[e];return t?`<div class="mb-1 p-1 bg-red-500/5 dark:bg-red-500/10 border border-red-500/10 dark:border-red-500/20 rounded-lg flex items-center gap-2" title="${t.detail.replace(/\n/g,``).trim()}">
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
    `}function fr(e){return`<div style="
        width:22px;height:22px;border-radius:50%;
        background:#F97316;border:2px solid white;
        display:flex;align-items:center;justify-content:center;
        font-family:Inter,sans-serif;font-size:9px;font-weight:900;
        color:white;box-shadow:0 2px 6px rgba(0,0,0,0.4);
        cursor:pointer;
    ">${e}</div>`}function pr(e,t,n,r){return`
        <div style="font-family:Inter,sans-serif;font-size:11px;line-height:1.6;padding:2px 4px">
            <b>#${e} · ${t}</b><br>
            ${n.nombre||`—`}<br>
            Ctrl: ${n.control?n.control.slice(-4):`—`} · S${n.n_serie||`—`} · L${n.n_linea||`—`}<br>
            Duración: ${r}
        </div>
    `}var mr=a((()=>{m()}));function hr(e){let{displayLat:t,displayLng:n,declaredSeg:r,actualSeg:i,ptStart:a,ptIni:o,ptFin:c,ptMain:u,isFlagged:d,rec:f}=e,p=er(Xn(f,`group_sh53u78/control`)||Xn(f,`control`)||``,Xn(f,`n_serie`)||``,Xn(f,`n_linea`)||``);if(!l.detailMiniMapObj){l.detailMiniMapObj=L.map(`detailMap`,{zoomControl:!1}).setView([t,n],16);let e=L.tileLayer(`https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}`,{maxZoom:20,subdomains:[`mt0`,`mt1`,`mt2`,`mt3`],attribution:`&copy; Google`}),r=L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,{attribution:`&copy; OpenStreetMap contributors`});e.addTo(l.detailMiniMapObj),l.detailMiniMapLayerControl=L.control.layers({"Google Satélite":e,OpenStreetMap:r},null,{position:`topright`}).addTo(l.detailMiniMapObj)}else if(l.detailMiniMapObj.setView([t,n],16),l.detailMiniMapObj.eachLayer(e=>{e instanceof L.TileLayer||l.detailMiniMapObj.removeLayer(e)}),l.detailMiniMapLayerControl){l.detailMiniMapObj.removeControl(l.detailMiniMapLayerControl);let e=L.tileLayer(`https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}`,{maxZoom:20,subdomains:[`mt0`,`mt1`,`mt2`,`mt3`],attribution:`&copy; Google`}),t=L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,{attribution:`&copy; OpenStreetMap contributors`});l.detailMiniMapLayerControl=L.control.layers({"Google Satélite":e,OpenStreetMap:t},null,{position:`topright`}).addTo(l.detailMiniMapObj)}let m={};if(l.geoJSONData&&(m.Segmentos=L.geoJSON(l.geoJSONData,{style:e=>{let t=String(e.properties.cod_seg||`0`),n=String(e.properties.cod_seg)===String(r),i=s[t.split(``).reduce((e,t)=>e+t.charCodeAt(0),0)%s.length];return{color:n?`#FBBF24`:i,weight:n?2.5:1.5,opacity:.9,fillColor:n?`#FBBF24`:i,fillOpacity:n?.35:.15}},onEachFeature:(e,t)=>{let n=e.properties||{},a=n.cod_seg||n.id||`N/A`,o=n.cod_munici||n.mun||`N/A`,s=n.cod_parroq||n.par||`N/A`,c=String(a)===String(r),l=String(a)===String(i),u=String(a)===`000`||String(a)===`0`,d=or({cod:a,mun:o,par:s,declaredSeg:r,actualSeg:i,featureLabel:u?`Sector`:`Segmento`,displayId:u?n.cod_sc||`000`:a,isCurrent:c,isActual:l});t.bindPopup(d,{className:`custom-popup`,maxWidth:260})}}).addTo(l.detailMiniMapObj)),l.controlsData&&(m[`Vivienda Esperada`]=L.geoJSON(l.controlsData,{filter:e=>{let t=e.properties;return er(t.CONTROL,t.SERIE,t.LINEA)===p},pointToLayer:(e,t)=>L.circleMarker(t,{radius:7,fillColor:`#38BDF8`,color:`#ffffff`,weight:2,opacity:1,fillOpacity:1}),onEachFeature:(e,t)=>{t.bindPopup(ur(e.properties),{className:`custom-popup`})}}).addTo(l.detailMiniMapObj)),l.detailMiniMapLayerControl)for(let[e,t]of Object.entries(m))l.detailMiniMapLayerControl.addOverlay(t,e);let h=[],g=[],_=(e,t,n,r,i)=>{if(!e)return;let a=L.divIcon({className:`custom-minimap-marker`,html:`<div style="background-color:${t};width:14px;height:14px;border-radius:50%;border:2px solid white;box-shadow:0 0 10px ${t};"></div>`,iconSize:[14,14],iconAnchor:[7,7]}),o=e.acc?`<span class="text-brand-emerald">± ${e.acc}m</span>`:`<span class="text-slate-500">N/A</span>`,s=e.alt?`${e.alt}m s.n.m.`:`N/A`,c=r===`start`?i.start:i.end,u=sr(n,t,e,o,s,c?new Date(c).toLocaleTimeString():`N/A`);L.marker([e.lat,e.lng],{icon:a}).addTo(l.detailMiniMapObj).bindPopup(u,{className:`custom-popup-enrich`}),h.push([e.lat,e.lng]),g.push([e.lat,e.lng])};a&&_(a,`#3B82F6`,`Apertura de la Encuesta`,`start`,f),o&&_(o,`#10B981`,`Confirmación Inicial`,`start`,f),c&&_(c,`#F59E0B`,`Cierre de Encuesta`,`end`,f),!a&&!o&&!c&&u&&_(u,d?`#EF4444`:`#10B981`,`Ubicación Registrada`,`end`,f),g.length>1&&L.polyline(g,{color:`#94a3b8`,dashArray:`4, 4`,weight:2,opacity:.6}).addTo(l.detailMiniMapObj);let v=o||u;if(v){let e=d?`#EF4444`:`#10B981`;L.circle([v.lat,v.lng],{radius:500,color:e,fillColor:e,fillOpacity:.05,weight:1.5,dashArray:`6,5`,interactive:!1}).addTo(l.detailMiniMapObj)}if(h.length>0){let e=L.latLngBounds(h);h.length===1&&!d?l.detailMiniMapObj.setView(h[0],16):l.detailMiniMapObj.fitBounds(e,{padding:[40,40],maxZoom:18})}l.detailMiniMapObj.invalidateSize()}var gr=a((()=>{m(),cr(),mr(),tr()}));function _r(e){let t=document.querySelector(`#mainTabs .tab-btn.active`),n=t?t.getAttribute(`data-tab`):`tab-resumen`,r=[];n===`tab-inconsistencias`&&l.inconsistenciasTabulator?r=l.inconsistenciasTabulator.getData(`active`).map(e=>e._rec).filter(Boolean):l.detailTable&&(r=l.detailTable.getData(`active`).map(e=>e._rec).filter(Boolean)),(!r||r.length===0||!r.includes(e))&&(r=l.filtered&&l.filtered.includes(e)?l.filtered:l.rawData&&l.rawData.includes(e)?l.rawData:[e]),xr=r,Sr=r.indexOf(e)}function vr(e){let t=Sr+e;if(t>=0&&t<xr.length){let e=xr[t];yr(e)}}function yr(e){let t=x(`detailModal`),n=x(`detailModalBody`);if(!t||!n||!e)return;if(_r(e),l.detailMiniMapObj){try{l.detailMiniMapObj.remove()}catch(e){console.error(`[Modal] Error removing previous map object:`,e)}l.detailMiniMapObj=null}let r=x(`detailModalRecordIndex`);r&&(r.textContent=`${Sr+1} / ${xr.length}`);let i=x(`btnDetailPrev`),a=x(`btnDetailNext`);i&&(i.disabled=Sr<=0),a&&(a.disabled=Sr>=xr.length-1);let o=e._meta||{},s={stEntidad:X(o.ent||e[`S1/ent`]||e.ent||null),stMpio:X(d(o.mun||null)),stParr:X(o.par||null),stSect:X(o.sector||null),stNodo:X(o.nodo||null),stEncuestador:X(o.nombre||e[`S0/s0_nombreapellido`]||null),stCedula:X(o.cedula===`N/A`?null:o.cedula),stFecha:X(o.fecha||e.today||e._submission_time||null),stDur:X((()=>{let e=o.durMin;return e==null?null:`${parseFloat(e).toFixed(2)} min`})()),declaredSeg:o.segmento||e[`S1/segmento`]||e[`S1/group_segmeto_sector/segmento`]||null,actualSeg:o.actual_seg||null,rawControl:String(o.control||e[`group_sh53u78/control`]||``),rawSerie:String(o.n_serie||``),rawLinea:String(o.n_linea||``),stHogares:X(o.hogares??null),stPers:X(o.totalPers??null),stUso:X(o.uso||null),stCond:X(o.condicion||null),stSubtipo:o.subtipo_vivienda||null,alertas:o.alertas||[],hasAlerts:o.hasAlerts||!1,isFlagged:o.flag_distance_gt_500,durMin:o.durMin??null,rawDist:o.distance_m??null,m:o};s.isRural=s.declaredSeg===`000`||s.declaredSeg===`0`,s.valHeader=s.isRural?`Validación de Sector`:`Validación de Segmento`,s.valLeftLabel=s.isRural?`Sector Declarado`:`Declarado`,s.valLeftVal=s.isRural?Xn(e,`sector`)||Xn(e,`S1/sector`)||`000`:s.declaredSeg||`N/A`,s.stControl=X(s.rawControl||null),s.stLinea=X(s.rawLinea||null),s.stSerie=X(s.rawSerie||null),s.stEstado=s.m.estado===`completada`?`<span class="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest bg-brand-green/20 text-brand-green border border-brand-green/30">Completada (Efectiva)</span>`:`<span class="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest bg-brand-orange/20 text-brand-orange border border-brand-orange/30">No Efectiva</span>`;let c=er(s.rawControl,s.rawSerie,s.rawLinea),u=l.controlsIndex instanceof Map?l.controlsIndex.get(c):null,f=l.controlsIndex instanceof Map&&l.controlsIndex.size>0,p=s.rawControl?String(s.rawControl).trim().slice(-4):``,m=l.controlDetails instanceof Map?l.controlDetails.get(p):null,h=m?m.combos:[];s.ctrlPanelHtml=ir({m:s.m,rawControl:s.rawControl,rawSerie:s.rawSerie,rawLinea:s.rawLinea,_padM:$n,hasCtrlIndex:f,ctrlEntry:u,ctrlKey:c,validCombos:h});let g=Zn(e[`start-geopoint`]),_=Zn(e[`group_sh53u78/ubicacion_i`]||e.ubicacion_i),v=Zn(e[`ubicacion_final/ubicacion_f`]||e.ubicacion_f),y=e.lat||s.m.lat||(e._geolocation?e._geolocation[0]:null),S=e.lng||s.m.lng||(e._geolocation?e._geolocation[1]:null),C=y&&S?{lat:parseFloat(y),lng:parseFloat(S)}:null;if(s.walkedDistance=_&&v?Qn(_,v):null,s.stDist=s.walkedDistance===null?`<span class="text-slate-500 font-medium italic">N/A</span>`:`<span class="font-outfit font-black ${s.walkedDistance>30?`text-brand-red`:`text-brand-emerald`}">${Math.round(s.walkedDistance)} m</span>`,s.hasMapData=g||_||v||C,s.segmentMatchStatus=!s.valLeftVal||!s.actualSeg?`<i data-lucide="minus" class="text-slate-400 w-4 h-4"></i>`:b(s.valLeftVal,s.actualSeg)?`<i data-lucide="check" class="text-brand-emerald w-5 h-5"></i>`:`<i data-lucide="x" class="text-brand-red w-5 h-5"></i>`,s.actualSegClasses=s.actualSeg&&!b(s.valLeftVal,s.actualSeg)?`bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800/30`:`bg-slate-100 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700`,s.actualSegText=s.actualSeg&&!b(s.valLeftVal,s.actualSeg)?`text-brand-red`:`text-slate-800 dark:text-slate-200`,s.alertsHtml=rr(s.alertas,s.m),n.innerHTML=nr(s)+ar(e),window.lucide&&lucide.createIcons({root:n}),l.lastFocused=document.activeElement,t.classList.remove(`hidden`),window.innerWidth<768){let e=x(`detailModalPane`);e&&e.classList.contains(`max-w-7xl`)&&typeof window.toggleDetailModalExpand==`function`&&window.toggleDetailModalExpand()}setTimeout(()=>{t.querySelector(`#detailModalPane`)?.classList.remove(`scale-95`,`opacity-0`)},10),s.hasMapData&&setTimeout(()=>{hr({displayLat:C?C.lat:_?_.lat:g?g.lat:v.lat,displayLng:C?C.lng:_?_.lng:g?g.lng:v.lng,declaredSeg:s.declaredSeg,actualSeg:s.actualSeg,ptStart:g,ptIni:_,ptFin:v,ptMain:C,isFlagged:s.isFlagged,rec:e})},300)}function br(){let e=x(`detailModal`);e&&(e.querySelector(`#detailModalPane`)?.classList.add(`scale-95`,`opacity-0`),setTimeout(()=>{e.classList.add(`hidden`);let t=x(`detailModalPane`),n=x(`detailModalExpandIcon`),r=x(`detailModalBody`);if(t?.classList.contains(`max-w-none`)&&(t.classList.remove(`w-full`,`max-w-none`,`h-full`,`rounded-none`),t.classList.add(`max-w-7xl`,`w-11/12`,`rounded-2xl`,`p-0`),n&&n.setAttribute(`data-lucide`,`maximize`),r&&(r.classList.remove(`flex-1`,`max-h-none`),r.classList.add(`max-h-[75vh]`))),l.detailMiniMapObj&&=(l.detailMiniMapObj.remove(),null),l.lastFocused?.focus)try{l.lastFocused.focus()}catch{}},300))}var xr,Sr,Cr=a((()=>{m(),D(),tr(),cr(),gr(),xr=[],Sr=-1,window.toggleDetailModalExpand=function(){let e=x(`detailModalPane`),t=x(`detailModalExpandIcon`),n=x(`detailMapWrapper`),r=x(`detailModalBody`);!e||!t||(e.classList.contains(`max-w-7xl`)?(e.classList.remove(`max-w-7xl`,`w-11/12`,`rounded-2xl`,`p-0`),e.classList.add(`w-full`,`max-w-none`,`h-full`,`rounded-none`),t.setAttribute(`data-lucide`,`minimize`),n&&(n.classList.remove(`h-48`,`sm:h-64`,`md:h-96`),n.classList.add(`h-[60vh]`,`md:h-[75vh]`)),r&&(r.classList.remove(`max-h-[75vh]`),r.classList.add(`flex-1`,`max-h-none`))):(e.classList.remove(`w-full`,`max-w-none`,`h-full`,`rounded-none`),e.classList.add(`max-w-7xl`,`w-11/12`,`rounded-2xl`,`p-0`),t.setAttribute(`data-lucide`,`maximize`),n&&(n.classList.remove(`h-[60vh]`,`md:h-[75vh]`),n.classList.add(`h-48`,`sm:h-64`,`md:h-96`)),r&&(r.classList.remove(`flex-1`,`max-h-none`),r.classList.add(`max-h-[75vh]`))),window.lucide&&window.lucide.createIcons(),l.detailMiniMapObj&&setTimeout(()=>l.detailMiniMapObj.invalidateSize(),350))},window.viewTraceByRecord=function(e){let t=l.rawData.find(t=>t._uuid===e||t.uuid===e);t?yr(t):console.warn(`[Modal] Registro con UUID ${e} no encontrado.`)},window.closeDetailModal=br})),wr,Tr,Er,Dr,Or,kr,Ar,jr,Mr=a((()=>{m(),wr=e=>{let t=e.getValue();return`<span style="color:${t===`completada`?`#10B981`:`#F59E0B`};font-weight:700;font-size:10px;letter-spacing:0.02em">${t===`completada`?`EFECTIVA`:`NO EFECTIVA`}</span>`},Tr=e=>{let t=e.getValue();return t===null?`—`:`<span style="color:${t<15?`#EF4444`:t<25?`#F59E0B`:`#10B981`};font-weight:800;font-family:Outfit,sans-serif;">${parseFloat(t).toFixed(2)}m</span>`},Er=e=>{let t=e.getValue();return!t||t.length===0?`<span style="color:var(--text-muted);font-size:10px">—</span>`:t.map(e=>{let t=u[e],n=t?t.label:e;return`<span title="${t?t.detail.replace(/\n/g,` `):``}" style="display:inline-flex;align-items:center;gap:3px;background:rgba(239,68,68,0.15);color:#EF4444;border:1px solid rgba(239,68,68,0.3);border-radius:4px;padding:1px 5px;font-size:9px;font-weight:700;letter-spacing:0.02em;margin-right:3px;white-space:nowrap;">⚠ ${n}</span>`}).join(``)},Dr=e=>{let t=e.getData(),n=p.has(t.cedula)?`<span style="background:#3B82F6;color:white;font-size:8px;font-weight:900;padding:1px 4px;border-radius:4px;margin-left:6px;vertical-align:middle;">INE</span>`:``;return`<div><div style="font-weight:800;color:currentColor;font-size:12px;line-height:1.3;">${t.nombre||`Sin Nombre`}${n}</div><div style="font-size:9px;color:#94a3b8;font-weight:600;">${t.cedula||`N/A`}</div></div>`},Or=e=>{let t=e.getValue(),n=t>=80?`#10B981`:t>=50?`#F59E0B`:`#EF4444`;return`<div style="display:flex;flex-direction:column;align-items:center;gap:3px;padding:4px 0">
        <span style="font-weight:900;color:${n};font-size:15px;">${t}%</span>
        <div style="width:100%;max-width:80px;height:6px;background:rgba(0,0,0,0.05);border-radius:10px;overflow:hidden">
            <div style="width:${t}%;height:100%;background:${n};border-radius:10px;"></div>
        </div>
    </div>`},kr=e=>{let t=Number(e.getValue())||0,n=t>30?`#EF4444`:t>15?`#F59E0B`:`#10B981`;return`<div style="display:flex;flex-direction:column;align-items:center;gap:3px;padding:4px 0">
        <span style="font-weight:900;color:${n};font-size:15px;">${t}%</span>
        <div style="width:100%;max-width:80px;height:6px;background:rgba(0,0,0,0.06);border-radius:10px;overflow:hidden">
            <div style="width:${Math.min(100,t)}%;height:100%;background:${n};border-radius:10px;"></div>
        </div>
    </div>`},Ar=e=>{let t=e.getData(),n=t.tipoA||0,r=t.tipoB||0,i=t.tipoC||0;return`<div style="display:flex;align-items:center;gap:4px;justify-content:center;">
        <span title="Tipo A (Ausentes/Rechazos): ${n}" style="background:rgba(139,92,246,0.15);color:#8B5CF6;border:1px solid rgba(139,92,246,0.3);font-size:9px;font-weight:800;padding:1px 5px;border-radius:4px;">A: ${n}</span>
        <span title="Tipo B (Desocupadas): ${r}" style="background:rgba(245,158,11,0.15);color:#F59E0B;border:1px solid rgba(245,158,11,0.3);font-size:9px;font-weight:800;padding:1px 5px;border-radius:4px;">B: ${r}</span>
        <span title="Tipo C (No Residencial/Demolida): ${i}" style="background:rgba(100,116,139,0.15);color:#64748B;border:1px solid rgba(100,116,139,0.3);font-size:9px;font-weight:800;padding:1px 5px;border-radius:4px;">C: ${i}</span>
    </div>`},jr=e=>{let t=e.getValue();if(!t)return`<span style="color:var(--text-muted);font-size:10px">—</span>`;let n=r[t]||r.DEFAULT;return`<span style="display:inline-flex;align-items:center;background:${n.colorBg};color:${n.color};border:1px solid ${n.color}44;border-radius:6px;padding:2px 6px;font-size:9px;font-weight:800;letter-spacing:0.03em;white-space:nowrap;">${t}</span>`}}));function Nr(e=[]){l.detailTable||(l.detailTable=new Tabulator(`#detailGrid`,{data:e,layout:`fitColumns`,height:`100%`,pagination:!0,paginationSize:25,paginationSizeSelector:[10,25,50,100],movableColumns:!0,responsiveLayout:`collapse`,clipboard:!0,placeholder:`<div style="padding:40px;text-align:center;color:var(--text-muted);font-size:14px;font-family:Inter,sans-serif;">Cargando base de datos...</div>`,columnHeaderVertAlign:`bottom`,columns:[{formatter:`responsiveCollapse`,width:30,minWidth:30,hozAlign:`center`,headerSort:!1,resizable:!1,responsive:0},{title:`Identificación`,columns:[{title:`Cédula`,field:`cedula`,headerFilter:`input`,minWidth:90,responsive:0},{title:`Nombre`,field:`nombre`,headerFilter:`input`,minWidth:140,responsive:0},{title:`Control`,field:`control`,headerFilter:`input`,width:85,responsive:0},{title:`Serie`,field:`serie`,headerFilter:`input`,width:60,responsive:2},{title:`Línea`,field:`linea`,headerFilter:`input`,width:60,responsive:2}]},{title:`Contexto`,columns:[{title:`Fecha`,field:`fecha`,headerFilter:`input`,width:90,sorter:`date`,responsive:1},{title:`Municipio`,field:`mun`,headerFilter:`input`,width:90,responsive:2},{title:`Parroquia`,field:`par`,headerFilter:`input`,width:90,responsive:4},{title:`Segm.`,field:`segmento`,headerFilter:`input`,width:70,hozAlign:`center`,responsive:4},{title:`Sect.`,field:`sector`,headerFilter:`input`,width:70,hozAlign:`center`,responsive:4}]},{title:`Métricas`,columns:[{title:`Estado`,field:`estado`,width:100,responsive:0,formatter:wr,headerFilter:`list`,headerFilterParams:{valuesLookup:!0,clearable:!0}},{title:`Subtipo`,field:`subtipo`,minWidth:160,responsive:1,formatter:jr,headerFilter:`list`,headerFilterParams:{valuesLookup:!0,clearable:!0}},{title:`Dur.`,field:`durMin`,width:70,hozAlign:`center`,responsive:2,formatter:Tr},{title:`Alertas`,field:`alertas`,minWidth:160,headerSort:!1,responsive:2,formatter:Er}]},{title:`Social`,columns:[{title:`Hog.`,field:`hogares`,width:50,hozAlign:`center`,responsive:4},{title:`Pers.`,field:`personas`,width:50,hozAlign:`center`,responsive:4}]}],rowFormatter:e=>{let t=e.getData();t.estado===`completada`?e.getElement().classList.add(`row-complete`):t.estado===`no_efectiva`&&e.getElement().classList.add(`row-no-efectiva`),t.hasAlerts&&e.getElement().classList.add(`row-flagged`)}}),l.detailTable.on(`rowClick`,(e,t)=>{let n=t.getData()._rec;n&&yr(n)}))}function Pr(e=l.filtered){let t=e.map(e=>{let t=e._meta||{};return{_rec:e,id:t.control||e._uuid,cedula:t.cedula||``,nombre:t.nombre||``,control:t.control||``,serie:t.n_serie||``,linea:t.n_linea||``,fecha:t.fecha||``,mun:d(t.mun||``),par:t.par||``,nodo:t.nodo||``,segmento:t.segmento||``,sector:t.sector||``,subtipo:t.subtipo_vivienda||``,estado:t.estado||``,durMin:t.durMin,alertas:t.alertas||[],hasAlerts:t.hasAlerts||!1,hogares:t.hogares||0,personas:t.totalPers||0}});if(!l.detailTable)Nr(t);else try{l.detailTable.setData(t).then(()=>{l.detailTable.redraw(!0)})}catch(e){console.warn(`Tabulator setData delayed:`,e.message),setTimeout(()=>{l.detailTable&&l.detailTable.setData(t).then(()=>{l.detailTable.redraw(!0)})},100)}}var Fr=a((()=>{m(),Cr(),Mr()}));function Ir(e){if(console.log(`table.js: renderRankingTable() initializing leaderboard...`),typeof Tabulator>`u`){console.error(`table.js: CRITICAL - Tabulator library is NOT loaded.`);return}if(!document.querySelector(`#rankingTable`))return;if(!e){if(!l.filtered||!l.encMap)return;let t=l.filtered.filter(e=>e&&e._meta),n=new Set(t.map(e=>e._meta.cedula));e=Object.values(l.encMap).filter(e=>n.has(e.cedula));let r={norespuesta:(e,t)=>(t.pctNoRespuesta||0)-(e.pctNoRespuesta||0),encuestas:(e,t)=>(t.encuestas||0)-(e.encuestas||0),completadas:(e,t)=>(t.completadas||0)-(e.completadas||0),eficiencia:(e,t)=>(t.pctCompleta||0)-(e.pctCompleta||0),personas:(e,t)=>(t.personas||0)-(e.personas||0)},i=l.currentSort||`norespuesta`;e.sort(r[i]||r.norespuesta)}let t=e.map((e,t)=>({pos:t+1,nombre:e.nombre||`Sin Nombre`,cedula:e.cedula||`N/A`,encuestas:e.encuestas||0,completadas:e.completadas||0,noRespuesta:e.noRespuesta||0,pctCompleta:e.pctCompleta||0,pctNoRespuesta:e.pctNoRespuesta||0,tipoA:e.tipoA||0,tipoB:e.tipoB||0,tipoC:e.tipoC||0,personas:e.personas||0,alertasCount:e.alertasCount||0}));l.rankingTabulator?l.rankingTabulator.setData(t).then(()=>{l.rankingTabulator.redraw(!0)}):(l.rankingTabulator=new Tabulator(`#rankingTable`,{data:t,layout:`fitColumns`,height:`460px`,responsiveLayout:`collapse`,persistence:!1,placeholder:`<div style="padding:40px;text-align:center;color:#64748b;font-size:13px;font-family:Inter,sans-serif;">Sin datos disponibles</div>`,initialSort:[{column:`pctNoRespuesta`,dir:`desc`}],columns:[{formatter:`responsiveCollapse`,width:30,minWidth:30,hozAlign:`center`,headerSort:!1,resizable:!1,responsive:0},{title:`#`,field:`pos`,width:50,hozAlign:`center`,headerSort:!1,frozen:!0,responsive:0,formatter:e=>`<span style="color:#64748b;font-weight:800;font-size:12px;">${e.getValue()}</span>`},{title:`Encuestador`,field:`nombre`,minWidth:140,frozen:!0,responsive:0,formatter:Dr},{title:`Volumen`,field:`encuestas`,hozAlign:`center`,width:85,sorter:`number`,responsive:0,formatter:e=>`<span style="font-weight:800;color:#3B82F6;font-size:13px">${e.getValue()}</span>`},{title:`Efectivas (E)`,field:`completadas`,hozAlign:`center`,width:85,sorter:`number`,responsive:1,formatter:e=>`<span style="font-weight:800;color:#10B981;font-size:13px">${e.getValue()}</span>`},{title:`No Resp. (A)`,field:`noRespuesta`,hozAlign:`center`,width:85,sorter:`number`,responsive:1,formatter:e=>`<span style="font-weight:800;color:#8B5CF6;font-size:13px">${e.getValue()}</span>`},{title:`% No Resp.`,field:`pctNoRespuesta`,hozAlign:`center`,minWidth:110,sorter:`number`,responsive:0,formatter:kr},{title:`% Efectividad`,field:`pctCompleta`,hozAlign:`center`,minWidth:110,sorter:`number`,responsive:2,formatter:Or},{title:`Tipologías (A/B/C)`,field:`tipoA`,hozAlign:`center`,minWidth:140,headerSort:!1,responsive:2,formatter:Ar},{title:`Alertas`,field:`alertasCount`,hozAlign:`center`,width:75,sorter:`number`,responsive:2,formatter:e=>{let t=e.getValue();return t>0?`<span style="font-weight:900;color:#EF4444;background:rgba(239,68,68,0.12);padding:2px 6px;border-radius:4px;">⚠ ${t}</span>`:`<span style="color:#94a3b8;">0</span>`}}]}),l.rankingTabulator.on(`rowClick`,(e,t)=>{let n=t.getData().cedula,r=document.getElementById(`filterEncuestador`);n&&r&&(r.value=n,typeof Y==`function`&&Y())}))}var Lr=a((()=>{m(),Yn(),Mr()})),Rr=a((()=>{Fr(),Lr(),Mr()}));async function zr(){if(!l.geoJSONData)try{let e=await fetch(`data/segmentos_monagas.geojson`);if(!e.ok)throw Error(`Error loading GeoJSON`);l.geoJSONData=await e.json(),Br()}catch(e){console.error(`FAILED TO LOAD GEOJSON:`,e)}}function Br(){if(!(!l.geoJSONData||!l.map||l.geoJSONLayer))try{l.geoJSONLayer=L.geoJSON(l.geoJSONData,{smoothFactor:0,style:e=>{let t=e.properties,n=s[(`${t.cod_seg===`000`||t.cod_seg===`0`?t.cod_sc||`0`:t.cod_seg||`0`}`.split(``).reduce((e,t)=>e*31+t.charCodeAt(0),0)>>>0)*13%s.length];return{color:n,weight:2,opacity:.8,fillColor:n,fillOpacity:.15}},onEachFeature:(e,t)=>{let n=e.properties,r=n.cod_seg===`000`||n.cod_seg===`0`,i=s[(`${r?n.cod_sc||`0`:n.cod_seg||`0`}`.split(``).reduce((e,t)=>e*31+t.charCodeAt(0),0)>>>0)*13%s.length],a=r?`Sector`:`Segmento`,o=r?n.cod_sc||`N/A`:n.cod_seg||`N/A`;t.bindPopup(lr(a,o,i,n),{className:`custom-popup`}),t.on(`mouseover`,function(){this.setStyle({fillOpacity:.35,weight:3})}),t.on(`mouseout`,function(){this.setStyle({fillOpacity:.15,weight:2})})}}).addTo(l.map),l.layerControl&&l.layerControl.addOverlay(l.geoJSONLayer,`Segmentos Monagas`)}catch(e){console.error(`FAILED TO DRAW GEOJSON LAYER:`,e)}}async function Vr(){if(!l.controlsIndex)try{let e=await fetch(`data/CONTROLES.geojson`);if(!e.ok)throw Error(`Error loading CONTROLES.geojson: ${e.status}`);l.controlsData=await e.json(),l.controlsIndex=new Map,l.validControls=new Set,l.validSeries=new Set,l.validLineas=new Set,l.controlDetails=new Map;let t=e=>{if(e==null)return null;let t=parseInt(String(e).trim(),10);return isNaN(t)?null:t};l.controlsData.features.forEach(e=>{let n=e.properties,r=t(n.LINEA),i=t(n.SERIE);if(r===null||i===null)return;let a=String(n.CONTROL||``).trim(),o=String(i),s=String(r);l.validControls.add(a),l.validSeries.add(o),l.validLineas.add(s),l.controlDetails.has(a)||l.controlDetails.set(a,{series:new Set,lineas:new Set,combos:[]}),l.controlDetails.get(a).series.add(o),l.controlDetails.get(a).lineas.add(s),l.controlDetails.get(a).combos.push({serie:o,linea:s}),l.controlsIndex.set(`${a}-${o}-${s}`,{COD_SEG:String(n.COD_SEG??``).trim(),COD_MANZA:String(n.COD_MANZA??``).trim()})}),l.map&&Hr()}catch(e){console.error(`FAILED TO LOAD CONTROLES.geojson:`,e)}}function Hr(){if(!(!l.controlsData||!l.map))try{l.controlsLayer&&(l.controlsLayer.remove(),l.layerControl&&l.layerControl.removeLayer(l.controlsLayer)),l.controlsLayer=L.geoJSON(l.controlsData,{pointToLayer:(e,t)=>L.circleMarker(t,{radius:3.5,fillColor:`#38BDF8`,color:`#ffffff`,weight:1,opacity:.9,fillOpacity:.85}),onEachFeature:(e,t)=>{t.bindTooltip(ur(e.properties),{sticky:!0,opacity:.95})}}),l.layerControl&&l.layerControl.addOverlay(l.controlsLayer,`Viviendas`)}catch(e){console.error(`FAILED TO DRAW CONTROLS LAYER:`,e)}}var Ur=a((()=>{m(),mr()}));function Wr(){if(l.map)return;let e=L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,{attribution:`&copy; OpenStreetMap contributors`}),t=L.tileLayer(`https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}`,{maxZoom:20,subdomains:[`mt0`,`mt1`,`mt2`,`mt3`],attribution:`&copy; Google`});l.map=L.map(`mapView`,{center:[10.4806,-66.8983],zoom:12,layers:[e],zoomControl:!1});let n={OpenStreetMap:e,"Google Satélite":t};l.layerControl=L.control.layers(n,{},{collapsed:window.innerWidth<768}).addTo(l.map),L.control.scale().addTo(l.map),l.markerCluster=L.markerClusterGroup({showCoverageOnHover:!1,zoomToBoundsOnClick:!0,spiderfyOnMaxZoom:!0}),l.map.addLayer(l.markerCluster),Br(),Hr()}var Gr=a((()=>{m(),Ur()})),Kr,qr=a((()=>{en(),Kr={findContainingFeature(e,t,n){if(!e||!t||!n||!n.features)return null;let r=he([t,e]);for(let e of n.features)if((e.geometry.type===`Polygon`||e.geometry.type===`MultiPolygon`)&&ct(r,e))return e.properties;return null},getDistance(e,t,n,r){return Ae(he([t,e]),he([r,n]),{units:`meters`})},createConvexHull(e){return!e||e.length<3?null:Ot(ve(e.map(e=>he([e.lng,e.lat]))))},simplifyPath(e,t=1e-4){return!e||e.length<3?e:Yt(_e(e.map(e=>[e[1],e[0]])),{tolerance:t,highQuality:!0}).geometry.coordinates.map(e=>[e[1],e[0]])},getAreaKm2(e){return e?Ie(e)/1e6:0}}}));function Jr(){l.agentRouteLayer&&=(l.map.removeLayer(l.agentRouteLayer),null)}function Yr(e){if(Jr(),!e||!l.map)return;let t=l.filtered.filter(t=>t._meta?.cedula===e&&t._meta.lat&&t._meta.lng).sort((e,t)=>new Date(e.start||0).getTime()-new Date(t.start||0).getTime());if(t.length===0)return;let n=x(`mapRouteAgentCount`);n&&(n.textContent=`${t.length} ptos`);let r=t.map(e=>[e._meta.lat,e._meta.lng]),i=Kr.simplifyPath(r,1e-5),a=[];a.push(L.polyline(i,{color:`#F97316`,weight:2.5,opacity:.85,dashArray:`6 4`})),t.forEach((e,t)=>{let n=e._meta,r=t+1,i=(e.start||``).slice(11,16)||`—`,o=n.durMin===null?`—`:`${Math.round(n.durMin)} min`,s=L.divIcon({className:``,html:fr(r),iconSize:[22,22],iconAnchor:[11,11]}),c=L.marker([n.lat,n.lng],{icon:s});c.bindTooltip(pr(r,i,n,o),{sticky:!0,opacity:.97}),c.on(`click`,()=>yr(e)),a.push(c)}),l.agentRouteLayer=L.layerGroup(a).addTo(l.map);let o=L.latLngBounds(i);o.isValid()&&l.map.fitBounds(o,{padding:[60,60]})}function Xr(){let e=document.getElementById(`filterEncuestador`),t=document.getElementById(`btnVerRutaEncuestador`),n=document.getElementById(`mapRouteAgentCount`);if(!e||!t||t._verRutaAttached)return;t._verRutaAttached=!0;let r=()=>{let r=!!e.value,i=r?l.filtered.filter(t=>t._meta?.cedula===e.value&&t._meta.lat&&t._meta.lng).length:0;if(t.disabled=!r,n&&(n.textContent=r&&i?`${i} pts`:`—`),!r){Jr(),t.dataset.routeActive=`0`,t.classList.remove(`active-filter-route`);let e=t.querySelector(`.route-label`);e&&(e.textContent=`Ver Ruta`),l.map&&l.markerCluster&&!l.map.hasLayer(l.markerCluster)&&l.map.addLayer(l.markerCluster)}};r(),e.addEventListener(`change`,r),document.addEventListener(`filtersApplied`,r),t.addEventListener(`click`,()=>{let r=e.value;if(r)if(t.dataset.routeActive===`1`){Jr(),t.dataset.routeActive=`0`,l.map&&l.markerCluster&&!l.map.hasLayer(l.markerCluster)&&l.map.addLayer(l.markerCluster),t.classList.remove(`active-filter-route`);let e=l.filtered.filter(e=>e._meta?.cedula===r&&e._meta.lat&&e._meta.lng).length;n&&(n.textContent=`${e} pts`);let i=t.querySelector(`.route-label`);i&&(i.textContent=`Ver Ruta`)}else{let e=document.querySelector(`[data-tab="tab-mapa"]`);e&&e.click(),setTimeout(()=>{Yr(r),t.dataset.routeActive=`1`,l.map&&l.markerCluster&&l.map.hasLayer(l.markerCluster)&&l.map.removeLayer(l.markerCluster),t.classList.add(`active-filter-route`);let e=l.filtered.filter(e=>e._meta?.cedula===r&&e._meta.lat&&e._meta.lng).length;n&&(n.textContent=`${e} pts`);let i=t.querySelector(`.route-label`);i&&(i.textContent=`Ocultar Ruta`)},200)}})}var Zr=a((()=>{m(),D(),Yn(),Cr(),mr(),qr()}));function Qr(){if(!l.map||!l.markerCluster)return;l.markerCluster.clearLayers();let e=l.filtered.filter(e=>e._meta.lat!=null&&e._meta.lng!=null),t=e.filter(e=>e._meta&&e._meta.estado===`completada`).length,n=e.length-t,r=new Set(e.map(e=>e._meta.cedula)).size,i=e.filter(e=>e._meta.hasAlerts).length,a=new Set(e.map(e=>e._meta.mun).filter(e=>e&&e!==`N/A`)),o=new Set(e.map(e=>e._meta.par).filter(e=>e&&e!==`N/A`)),s=new Set(e.map(e=>e._meta.nodo).filter(e=>e&&e!==`N/A`));x(`mapKpiPoints`)&&(x(`mapKpiPoints`).textContent=e.length),x(`mapKpiComplete`)&&(x(`mapKpiComplete`).textContent=t),x(`mapKpiNoEfectiva`)&&(x(`mapKpiNoEfectiva`).textContent=n),x(`mapKpiAgents`)&&(x(`mapKpiAgents`).textContent=r),x(`mapKpiAlertas`)&&(x(`mapKpiAlertas`).textContent=i);let c=x(`mapCoverageBadge`);c&&e.length>0&&(c.classList.remove(`hidden`),x(`mapMunCount`)&&(x(`mapMunCount`).textContent=a.size),x(`mapParCount`)&&(x(`mapParCount`).textContent=o.size),x(`mapNodoCount`)&&(x(`mapNodoCount`).textContent=s.size));let u=e.map(e=>{let t=e._meta,n=t.estado===`completada`,r=t.hasAlerts,i=t.alertas||[],a,o,s;r?(a=`#EF4444`,o=`#DC2626`,s=`Alerta`):n?(a=`#10B981`,o=`#059669`,s=`Efectiva`):(a=`#F59E0B`,o=`#D97706`,s=`No Efectiva`);let c=t.durMin===null?`—`:`${Math.round(t.durMin)} min`,l=t.distance_m===null?`—`:`${Math.round(t.distance_m)} m`,u=dr(t,e._uuid,a,o,s,i,c,l);return L.circleMarker([t.lat,t.lng],{radius:7,fillColor:a,color:o,weight:2,opacity:.9,fillOpacity:.7}).bindPopup(u,{className:`custom-popup`,maxWidth:320})});if(l.markerCluster.addLayers(u),document.getElementById(`btnVerRutaEncuestador`)?.dataset?.routeActive===`1`){l.map.hasLayer(l.markerCluster)&&l.map.removeLayer(l.markerCluster);let e=document.getElementById(`filterEncuestador`);e&&e.value&&Yr(e.value)}else if(u.length>0){let e=l.markerCluster.getBounds();e.isValid()&&l.map.fitBounds(e,{padding:[50,50]})}window.lucide&&lucide.createIcons()}var $r=a((()=>{m(),D(),Yn(),mr(),Zr(),window.setQuickFilter=function(e){l.quickFilterMode=e,Object.entries({all:{id:`btnMapFilterAll`,active:[`bg-brand-blue/10`,`dark:bg-brand-blue/20`,`border-brand-blue`,`ring-brand-blue/30`],inactive:`border-brand-blue`},efectivas:{id:`btnMapFilterEfectivas`,active:[`bg-brand-emerald/10`,`dark:bg-brand-emerald/20`,`border-brand-emerald`,`ring-brand-emerald/30`],inactive:`border-brand-emerald`},no_efectiva:{id:`btnMapFilterNoEfectiva`,active:[`bg-brand-orange/10`,`dark:bg-brand-orange/20`,`border-brand-orange`,`ring-brand-orange/30`],inactive:`border-brand-orange`},alertas:{id:`btnMapFilterAlertas`,active:[`bg-brand-red/10`,`dark:bg-brand-red/20`,`border-brand-red`,`ring-brand-red/30`],inactive:`border-brand-red`}}).forEach(([t,n])=>{let r=x(n.id);if(r)if(r.classList.remove(`bg-brand-blue/10`,`dark:bg-brand-blue/20`,`border-brand-blue`,`ring-brand-blue/30`,`bg-brand-emerald/10`,`dark:bg-brand-emerald/20`,`border-brand-emerald`,`ring-brand-emerald/30`,`bg-brand-orange/10`,`dark:bg-brand-orange/20`,`border-brand-orange`,`ring-brand-orange/30`,`bg-brand-red/10`,`dark:bg-brand-red/20`,`border-brand-red`,`ring-brand-red/30`,`ring-1`,`shadow-md`,`border-slate-400`,`active-filter-blue`,`active-filter-emerald`,`active-filter-orange`,`active-filter-red`),t===e){let e=`active-filter-${t===`all`?`blue`:t===`efectivas`?`emerald`:t===`no_efectiva`?`orange`:`red`}`;r.classList.add(e,`shadow-md`)}else r.classList.add(n.inactive)}),Y()}})),ei=a((()=>{Gr(),Ur(),$r(),Zr()}));function ti(e){if(typeof Tabulator>`u`){console.error(`Tabulator not found`);return}let t=(e||[]).map((e,t)=>{let n=[];e[`S1/G_P9/GP10_0b`]&&n.push(e[`S1/G_P9/GP10_0b`]),e[`S1/P_nomsect`]&&n.push(e[`S1/P_nomsect`]);for(let t=1;t<=4;t++){let r=e[`S1/G_P9/gp10_${t}_etiq`],i=e[`S1/G_P9/GP10_${t}b`];r&&i&&n.push(`${r} ${i}`)}let r=n.length>0?n.join(`, `):e[`S1/direccion`]||`-`,i=e[`control_de_la_entrevista/in10`]||e[`control_entrevista/in10`]||`-`,a=e[`control_de_la_entrevista/in11`]||e[`control_entrevista/in11`]||`-`;return{linea:e[`group_sh53u78/n_linea`]||t+1,manzana:e[`S1/manzana`]||`-`,parcela:e[`S1/parcela`]||`-`,edificacion:e[`S1/Edificaci_n`]||e[`S1/edificacion`]||`-`,estructura:e[`S1/estructura`]||e[`S1/unidad`]||`-`,calle:r,listadoCalleNro:`-`,nroCasa:i,descripcion:a,residente:e._meta.residente||`-`,panel:`-`,serie:e[`group_sh53u78/n_serie`]||`-`,razon:e[`Condici_n_de_ocupaci_n/condicion_de_ocupacion`]||e._meta.condicion||`-`,observaciones:e._meta.observaciones||`-`,fecha:e._meta.fecha_entrevista||`-`,duracion:e._meta.durMin,uso:e[`S1/Uso_de_la_Unidad_inmobiliaria`]||e._meta.uso||`-`,encuestador:e._meta.nombre?e._meta.nombre.split(` `)[0]:`N/A`}});t.sort((e,t)=>parseInt(e.linea)-parseInt(t.linea)),l.mm111Table?l.mm111Table.setData(t).then(()=>{l.mm111Table.redraw(!0)}):ri(t)}function ni(e){let t=e.getData();return`
        <div class="flex flex-col gap-1 py-1 font-sans text-xs">
            <div class="text-slate-800 dark:text-slate-200 font-semibold border-b border-slate-100 dark:border-slate-800/40 pb-1 leading-normal">${t.descripcion||`-`}</div>
            <div class="text-[10px] text-slate-500 mt-0.5 leading-normal">
                <span class="font-black text-slate-400 dark:text-slate-500 mr-1 uppercase">NOMBRE:</span> ${t.residente||`-`}
            </div>
        </div>`}function ri(e){l.mm111Table=new Tabulator(`#mm111Grid`,{data:e,layout:`fitColumns`,height:`100%`,responsiveLayout:`collapse`,placeholder:`<div class='p-12 text-center text-slate-400 font-medium'>Seleccione un número de Control para visualizar el listado de las encuestas.</div>`,columns:[{title:`Línea`,field:`linea`,width:65,hozAlign:`center`,formatter:e=>`<span class="font-mono font-bold text-slate-700 dark:text-slate-200">${e.getValue()}</span>`},{title:`Manz.`,field:`manzana`,width:65,hozAlign:`center`},{title:`Parc.`,field:`parcela`,width:65,hozAlign:`center`},{title:`Edif.`,field:`edificacion`,width:65,hozAlign:`center`},{title:`Estr.`,field:`estructura`,width:65,hozAlign:`center`},{title:`Calle / Rumbo`,field:`calle`,minWidth:150,formatter:`textarea`},{title:`Listado C./N° Casa`,field:`listadoCalleNro`,minWidth:150,hozAlign:`center`},{title:`Listado MM-111`,field:`descripcion`,minWidth:260,formatter:ni},{title:`Panel`,field:`panel`,width:60,hozAlign:`center`},{title:`Serie`,field:`serie`,width:60,hozAlign:`center`,formatter:e=>`<span class="font-mono opacity-70">${e.getValue()}</span>`},{title:`Condición Inclusión`,field:`razon`,minWidth:150,formatter:ai},{title:`Observaciones`,field:`observaciones`,minWidth:120,formatter:`textarea`},{title:`Fecha`,field:`fecha`,width:95,hozAlign:`center`},{title:`Duración`,field:`duracion`,width:90,hozAlign:`center`,formatter:e=>{let t=e.getValue();if(t==null||isNaN(t))return`<span class="text-slate-400">—</span>`;let n=Math.round(t);return`<span class="px-2 py-0.5 rounded text-[10px] ${n<5?`bg-red-500/10 text-red-500 border border-red-500/20 font-black animate-pulse`:`bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold`}">${n} min</span>`}},{title:`Uso`,field:`uso`,minWidth:120,formatter:ii},{title:`Encuestador`,field:`encuestador`,width:100,hozAlign:`center`,formatter:e=>`<span class="text-[10px] font-black uppercase text-slate-400 tracking-wider">${e.getValue()}</span>`}]})}function ii(e){let t=String(e.getValue()).toUpperCase(),n=i.DEFAULT;for(let e in i)if(t.includes(e)){n=i[e];break}return`<span class="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-tight ${n.badge}">${t}</span>`}function ai(e){let t=String(e.getValue()).toUpperCase(),n=t.replace(/_/g,` `),r=c.DEFAULT;for(let e in c)if(t.includes(e)){r=c[e];break}return`<span class="px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-tight ${r.badge}">${n}</span>`}function oi(){[`mm111Entidad`,`mm111Municipio`,`mm111Parroquia`,`mm111CPoblado`].forEach(e=>{x(e)&&(x(e).textContent=`---`)}),[`mm111EntidadCod`,`mm111MunicipioCod`,`mm111ParroquiaCod`,`mm111CPobladoCod`].forEach(e=>{x(e)&&(x(e).textContent=`--`)}),[`mm111Segmento`,`mm111Sector`,`mm111Nodo`,`mm111Semana`,`mm111ControlMaestro`,`mm111Lote`,`mm111Duracion`].forEach(e=>{x(e)&&(x(e).textContent=`-`)}),x(`mm111ControlNro`)&&(x(`mm111ControlNro`).textContent=`0000`)}function si(e,t){let n=x(`mm111ResultsList`);if(n){if(e.length>0){let t=l.assetName&&l.assetName.toUpperCase().includes(`EHM`)?`EHM`:`ESCA`;n.innerHTML=e.map((e,n)=>{let r=String(e.control).slice(-4).padStart(4,`0`),i=0;l.planificacionData?.por_semana&&l.planificacionData.por_semana.forEach(e=>{e.programa===t&&String(e.control).padStart(4,`0`)===r&&(i+=e.n_viviendas||0)});let a=0,o=0,s=0;l.rawData.forEach(e=>{let t=e._meta;t&&t.control&&String(t.control).slice(-4).padStart(4,`0`)===r&&(t.tipo_vivienda===`TIPO A`?a++:t.tipo_vivienda===`TIPO B`?o++:t.tipo_vivienda===`TIPO C`&&s++)});let c=i-(o+s),u=c>0?Math.round(a/c*100):0,d=u>0?`bg-red-500/10 text-red-500 border border-red-500/20`:`bg-emerald-500/10 text-emerald-500 border border-emerald-500/20`;return`
                <div class="result-item p-3 hover:bg-brand-blue/10 dark:hover:bg-brand-blue/20 rounded-xl cursor-pointer transition-all flex items-center justify-between group" 
                     data-value="${e.control}" data-index="${n}">
                   <div class="flex flex-col">
                      <span class="text-sm font-bold text-slate-700 dark:text-white group-hover:text-brand-blue">${e.control}</span>
                      <div class="flex items-center gap-2 mt-0.5">
                        <span class="text-[9px] text-slate-400 font-bold uppercase tracking-wider">${e.mun}</span>
                        ${e.seg?`<span class="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700"></span><span class="text-[9px] text-brand-blue/60 font-bold uppercase">Ség: ${e.seg}</span>`:``}
                      </div>
                   </div>
                   <div class="flex items-center gap-2">
                      <span class="text-[9px] font-black px-2 py-0.5 rounded-md ${d}">
                         No Resp: ${u}%
                      </span>
                      <div class="h-6 w-6 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                         <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-brand-blue"></i>
                      </div>
                   </div>
                </div>
            `}).join(``)}else n.innerHTML=`
            <div class="p-8 text-center flex flex-col items-center gap-2">
                <i data-lucide="search-x" class="w-8 h-8 text-slate-300"></i>
                <p class="text-xs text-slate-400 font-medium">No se encontraron resultados para "${t}"</p>
            </div>`;window.lucide&&lucide.createIcons()}}var ci=a((()=>{m(),D()}));function li(e){if(!e)return;let t=l.rawData.filter(t=>String(t._meta.control).toLowerCase()===String(e).toLowerCase());if(t.length===0){oi(),ti([]);return}let n=t[0];x(`mm111Entidad`)&&(x(`mm111Entidad`).textContent=n[`S1/ent`]||d(n._meta.mun||`N/A`)),x(`mm111Municipio`)&&(x(`mm111Municipio`).textContent=d(n._meta.mun||`N/A`)),x(`mm111Parroquia`)&&(x(`mm111Parroquia`).textContent=n._meta.par||`N/A`),x(`mm111CPoblado`)&&(x(`mm111CPoblado`).textContent=n[`S1/cpoblado`]||`N/A`);let r=(e,t=null)=>{if(!e)return`--`;let n=String(e).match(/^(\d+)/),r=n?n[1]:`--`;return r!==`--`&&t&&(r=r.slice(-t)),r};x(`mm111EntidadCod`)&&(x(`mm111EntidadCod`).textContent=r(n[`S1/ent`])||`--`),x(`mm111MunicipioCod`)&&(x(`mm111MunicipioCod`).textContent=r(n._meta.mun,2)||`--`),x(`mm111ParroquiaCod`)&&(x(`mm111ParroquiaCod`).textContent=r(n._meta.par,2)||`--`),x(`mm111CPobladoCod`)&&(x(`mm111CPobladoCod`).textContent=r(n[`S1/cpoblado`])||`--`);let i=(e,t)=>e&&String(e).trim()!==`-`?String(e).slice(-t):`-`;x(`mm111Segmento`)&&(x(`mm111Segmento`).textContent=n[`S1/segmento`]||n[`S1/group_segmeto_sector/segmento`]||n[`group_segmeto_sector/segmento`]||`-`),x(`mm111Sector`)&&(x(`mm111Sector`).textContent=n[`S1/sector`]||n[`S1/group_segmeto_sector/sector`]||n[`group_segmeto_sector/sector`]||`-`),x(`mm111Nodo`)&&(x(`mm111Nodo`).textContent=n._meta.nodo||`-`),x(`mm111Semana`)&&(x(`mm111Semana`).textContent=i(n._meta.semana,2)),x(`mm111ControlNro`)&&(x(`mm111ControlNro`).textContent=i(n._meta.control,4));let a=n[`group_sh53u78/lote`]||n.lote||`-`;x(`mm111Lote`)&&(x(`mm111Lote`).textContent=a);let o=t.map(e=>e._meta.fecha).filter(Boolean).sort();if(o.length>0){let e=x(`filterFechaInicio`),t=x(`filterFechaFin`);e&&(e.value=o[0]),t&&(t.value=o[o.length-1])}let s=t.filter(e=>e._meta&&e._meta.estado===`completada`).map(e=>e._meta.durMin).filter(e=>e!==null&&!isNaN(e));if(s.length>0){let e=Math.round(s.reduce((e,t)=>e+t,0)/s.length),t=Math.round(s.reduce((e,t)=>e+t,0)),n=Math.floor(t/60),r=t%60,i=n>0?`${n}h ${r}m`:`${r}m`;x(`mm111Duracion`)&&(x(`mm111Duracion`).innerHTML=`
                <span class="text-slate-800 dark:text-slate-200 font-bold">${e} min prom.</span>
                <span class="text-[10px] text-slate-400 dark:text-slate-500 block mt-0.5">Total: ${i}</span>
            `)}else x(`mm111Duracion`)&&(x(`mm111Duracion`).textContent=`0 min`);ti(t)}function ui(){let e=new Map;return l.filtered.forEach(t=>{let n=t._meta;!n||!n.control||e.has(n.control)||e.set(n.control,{control:n.control,mun:d(n.mun||`N/A`),seg:n.segmento||``,sec:n.sector||``})}),Array.from(e.values()).sort((e,t)=>e.control.localeCompare(t.control))}var di=a((()=>{m(),D(),ci()}));function fi(){let e=x(`btnLoadMM111`),t=x(`mm111SearchControl`),n=x(`mm111SearchResults`),r=x(`mm111ClearSearch`);if(!t||!n)return;let i=-1,a=e=>{let t=e.toLowerCase().trim(),r=ui().filter(e=>e.control.toLowerCase().includes(t)||e.mun.toLowerCase().includes(t)||e.seg.toLowerCase().includes(t)).slice(0,50);i=-1,t.length>0||e.length===0?(n.classList.remove(`hidden`),si(r,e),n.querySelectorAll(`.result-item`).forEach(e=>{e.onclick=()=>o(e.getAttribute(`data-value`))})):n.classList.add(`hidden`)},o=async e=>{t&&(t.value=e),n&&n.classList.add(`hidden`),e.trim().length>0&&r?.classList.remove(`hidden`);let i=x(`filterControl`);i&&(i.value=e),li(e),Y()};t.onfocus=()=>a(t.value),t.oninput=()=>{t.value.trim().length>0?r?.classList.remove(`hidden`):r?.classList.add(`hidden`),a(t.value)},t.onkeydown=e=>{let t=n.querySelectorAll(`.result-item`);e.key===`ArrowDown`?(e.preventDefault(),i=Math.min(i+1,t.length-1),s(t)):e.key===`ArrowUp`?(e.preventDefault(),i=Math.max(i-1,0),s(t)):e.key===`Enter`?(e.preventDefault(),i>=0&&t[i]?o(t[i].getAttribute(`data-value`)):t.length>0&&o(t[0].getAttribute(`data-value`))):e.key===`Escape`&&n.classList.add(`hidden`)};let s=e=>{e.forEach((e,t)=>{t===i?(e.classList.add(`active`,`bg-brand-blue/10`,`dark:bg-brand-blue/20`,`ring-1`,`ring-brand-blue/30`),e.scrollIntoView({block:`nearest`})):e.classList.remove(`active`,`bg-brand-blue/10`,`dark:bg-brand-blue/20`,`ring-1`,`ring-brand-blue/30`)})};r&&(r.onclick=async()=>{t.value=``,r.classList.add(`hidden`);let e=x(`filterControl`);e&&(e.value=``);let n=x(`filterFechaInicio`),i=x(`filterFechaFin`);n&&(n.value=``),i&&(i.value=``),t.focus(),a(``),Y()}),e&&(e.onclick=()=>o(t.value.trim())),document.addEventListener(`click`,e=>{!t.contains(e.target)&&!n.contains(e.target)&&n.classList.add(`hidden`)})}var pi=a((()=>{D(),di(),ci(),Dn(),document.addEventListener(`filtersApplied`,()=>{let e=x(`filterControl`)?.value,t=x(`mm111SearchControl`),n=x(`mm111ClearSearch`);t&&e&&t.value!==e?(t.value=e,n&&n.classList.remove(`hidden`),li(e)):t&&!e&&t.value!==``&&(t.value=``,n&&n.classList.add(`hidden`),oi(),ti([]))})}));function mi(){hi||=(fi(),!0);let e=x(`mm111SearchControl`),t=x(`mm111ClearSearch`),n=x(`mm111FilteredCount`);if(!e)return;n&&(n.textContent=x(`kpiControles`)?.textContent||`0`),e.value.trim().length===0?t?.classList.add(`hidden`):t?.classList.remove(`hidden`);let r=e.value.trim();r?li(r):(oi(),ti([]))}var hi,gi=a((()=>{D(),pi(),di(),ci(),hi=!1}));function _i(){return`
        <div class="col-span-full text-center py-10 text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" stroke-width="1.5" class="mx-auto mb-2 text-brand-green">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <p class="font-bold text-sm">Sin inconsistencias detectadas</p>
            <p class="text-xs mt-1 opacity-60">Todos los registros del filtro actual pasan las validaciones.</p>
        </div>`}function vi(e,t,n){let r=u[e]||{label:e},i=yi[e]||{bg:`#64748b22`,border:`#64748b`,text:`#64748b`},a=n===e,o=a?`ring-2 ring-offset-1 dark:ring-offset-[#0B1120]`:``,s=a?`ring-color: ${i.border}; border-color: ${i.border};`:`border-color:${i.border}30;`;return`
    <div class="alert-card ${o}"
         data-code="${e}"
         style="background:${i.bg}; ${s};">
        <div class="min-w-0 pr-2">
            <div class="text-[10px] sm:text-xs font-black uppercase tracking-widest mb-0.5 truncate"
                 style="color:${i.text}" title="${r.label}">${r.label}</div>
            <div class="text-[9px] text-slate-500 font-mono truncate opacity-60">${e}</div>
        </div>
        <div class="text-xl sm:text-2xl font-black font-outfit shrink-0 ml-auto" style="color:${i.text}">${t}</div>
    </div>`}var yi,bi=a((()=>{m(),yi={TIEMPO_CORTO_EHM:{bg:`#F59E0B22`,border:`#F59E0B`,text:`#F59E0B`},TIEMPO_CORTO_ESCA:{bg:`#F59E0B22`,border:`#F59E0B`,text:`#F59E0B`},TIEMPO_CORTO:{bg:`#F59E0B22`,border:`#F59E0B`,text:`#F59E0B`},TIEMPO_LARGO:{bg:`#EF444422`,border:`#EF4444`,text:`#EF4444`},APERT_LEJOS:{bg:`#8B5CF622`,border:`#8B5CF6`,text:`#8B5CF6`},FUERA_SEGMENTO:{bg:`#EF444422`,border:`#EF4444`,text:`#EF4444`},SEGMENTO_INCORRECTO:{bg:`#EF444422`,border:`#EF4444`,text:`#EF4444`},ARRANQUE_INCONSISTENTE:{bg:`#F59E0B22`,border:`#F59E0B`,text:`#F59E0B`},LINEA_SERIE_INVALIDA:{bg:`#EF444422`,border:`#EF4444`,text:`#EF4444`},CEDULA_INVALIDA:{bg:`#EF444422`,border:`#EF4444`,text:`#EF4444`},INGRESO_ANOMALO:{bg:`#F59E0B22`,border:`#F59E0B`,text:`#F59E0B`},DESPLAZAMIENTO_ANOMALO:{bg:`#F59E0B22`,border:`#F59E0B`,text:`#F59E0B`},HOGARES_INCONSISTENTES:{bg:`#EF444422`,border:`#EF4444`,text:`#EF4444`},INTEGRANTES_INCONSISTENTES:{bg:`#EF444422`,border:`#EF4444`,text:`#EF4444`}}}));function xi(e=[]){l.inconsistenciasTabulator||(l.inconsistenciasTabulator=new Tabulator(`#inconsistenciasTable`,{data:e,layout:`fitColumns`,height:`500px`,responsiveLayout:`collapse`,placeholder:`<div style="padding:40px;text-align:center;color:var(--text-muted);font-size:14px;font-family:Inter,sans-serif;">No hay inconsistencias para mostrar</div>`,columnHeaderVertAlign:`bottom`,columns:[{formatter:`responsiveCollapse`,width:30,minWidth:30,hozAlign:`center`,headerSort:!1,resizable:!1,responsive:0},{title:`Encuestador`,field:`nombre`,minWidth:150,responsive:0,formatter:e=>`<div style="font-weight:700;">${e.getValue()}</div>`},{title:`Cédula`,field:`cedula`,width:100,responsive:2,cssClass:`font-mono`},{title:`Control`,field:`control`,width:100,responsive:0,cssClass:`font-mono text-brand-blue font-bold`},{title:`Fecha`,field:`fecha`,width:100,responsive:1,sorter:`date`},{title:`Semana`,field:`semana`,width:80,hozAlign:`center`,responsive:1},{title:`Alertas`,field:`alertas`,minWidth:200,headerSort:!1,responsive:0,formatter:e=>{let t=e.getValue();return t?t.map(e=>`<span style="display:inline-flex;align-items:center;background:rgba(239,68,68,0.1);color:#EF4444;border:1px solid rgba(239,68,68,0.2);border-radius:4px;padding:1px 6px;font-size:9px;font-weight:700;margin-right:3px;white-space:nowrap;">${(u[e]||{label:e}).label}</span>`).join(``):``}}]}),l.inconsistenciasTabulator.on(`rowClick`,(e,t)=>{let n=t.getData()._rec;n&&yr(n)}))}function Si(e){l.inconsistenciasTabulator?l.inconsistenciasTabulator.setData(e):xi(e)}var Ci=a((()=>{m(),Cr()}));function wi(e){if(Z.isEventsBound)return;Z.isEventsBound=!0;let t=x(`incSearchInput`),n=x(`incClearSearch`),r=x(`incFilterAlerta`),i=x(`inconsistenciasCards`);t&&t.addEventListener(`input`,t=>{Z.currentSearchQuery=t.target.value.trim().toLowerCase(),n&&n.classList.toggle(`hidden`,Z.currentSearchQuery.length===0),e&&e()}),n&&n.addEventListener(`click`,()=>{t&&(t.value=``),Z.currentSearchQuery=``,n.classList.add(`hidden`),e&&e()}),r&&r.addEventListener(`change`,t=>{Z.currentAlertFilter=t.target.value,e&&e()}),i&&i.addEventListener(`click`,t=>{let n=t.target.closest(`.alert-card`);if(!n)return;let r=n.dataset.code;Z.currentAlertFilter=Z.currentAlertFilter===r?``:r,e&&e()})}var Z,Ti=a((()=>{D(),Z={currentAlertFilter:``,currentSearchQuery:``,isEventsBound:!1}}));function Ei(){if(!x(`inconsistenciasContainer`))return;wi(Ei);let e=l.filtered.filter(e=>e._meta&&e._meta.hasAlerts),t={};e.forEach(e=>{e._meta.alertas.forEach(e=>{t[e]=(t[e]||0)+1})});let n=e.length;Di(t),Oi(t,n),Si(ki(e))}function Di(e){let t=x(`incFilterAlerta`);if(!t)return;let n=Object.entries(e).sort((e,t)=>t[1]-e[1]),r=[`<option value="">Todas las alertas</option>`];n.forEach(([e,t])=>{let n=u[e]?u[e].label:e,i=e===Z.currentAlertFilter?`selected`:``;r.push(`<option value="${e}" ${i}>${n} (${t})</option>`)});let i=r.join(``);t.innerHTML!==i&&(t.innerHTML=i)}function Oi(e,t){let n=x(`inconsistenciasCards`);n&&(t===0?n.innerHTML=_i():n.innerHTML=Object.entries(e).sort((e,t)=>t[1]-e[1]).map(([e,t])=>vi(e,t,Z.currentAlertFilter)).join(``))}function ki(e){let t=e;return Z.currentAlertFilter&&(t=t.filter(e=>e._meta.alertas.includes(Z.currentAlertFilter))),Z.currentSearchQuery&&(t=t.filter(e=>{let t=e._meta;return t.nombre&&t.nombre.toLowerCase().includes(Z.currentSearchQuery)||t.cedula&&t.cedula.toLowerCase().includes(Z.currentSearchQuery)||t.control&&t.control.toLowerCase().includes(Z.currentSearchQuery)})),t.sort((e,t)=>{let n=t._meta.alertas.length-e._meta.alertas.length;return n===0?(t._meta.fecha||``).localeCompare(e._meta.fecha||``):n}).map(e=>({_rec:e,nombre:e._meta.nombre,cedula:e._meta.cedula,control:e._meta.control||`—`,fecha:e._meta.fecha||`—`,semana:e._meta.semana||`—`,alertas:e._meta.alertas}))}var Ai=a((()=>{m(),D(),bi(),Ci(),Ti()}));function ji(e){if(typeof Chart>`u`)return;let t=e?`#ffffff`:`#000000`,n=e?`rgba(255,255,255,0.05)`:`rgba(0,0,0,0.05)`;Chart.defaults.color=t,Chart.defaults.scale.grid.color=n,typeof ChartDataLabels<`u`&&Chart.register(ChartDataLabels),Object.values(l.charts).forEach(e=>{e&&(e.options.color=t,e.options.plugins&&(e.options.plugins.datalabels&&(e.options.plugins.datalabels.color=t),e.options.plugins.legend&&e.options.plugins.legend.labels&&(e.options.plugins.legend.labels.color=t)),e.options.scales&&(e.options.scales.x&&e.options.scales.x.ticks&&(e.options.scales.x.ticks.color=t),e.options.scales.y&&e.options.scales.y.ticks&&(e.options.scales.y.ticks.color=t)),typeof e.update==`function`&&e.update(`none`))})}function Q(e){l.charts[e]&&(l.charts[e].destroy(),delete l.charts[e])}function $(){let e=document.documentElement.classList.contains(`dark`),t=e?`#ffffff`:`#000000`;return{responsive:!0,maintainAspectRatio:!1,color:t,plugins:{legend:{labels:{color:t,font:{size:11,family:`'Inter', sans-serif`,weight:`bold`}}},tooltip:{backgroundColor:e?`#1e293b`:`#ffffff`,titleColor:e?`#f1f5f9`:`#0f172a`,bodyColor:e?`#e2e8f0`:`#334155`,borderColor:e?`rgba(255,255,255,0.1)`:`rgba(0,0,0,0.1)`,titleFont:{weight:`bold`},bodyFont:{family:`'Inter', sans-serif`},borderWidth:1}},scales:{x:{ticks:{color:t,font:{size:11,family:`'Inter', sans-serif`,weight:`600`}},grid:{}},y:{ticks:{color:t,font:{size:11,family:`'Inter', sans-serif`,weight:`600`}},grid:{}}}}}var Mi,Ni=a((()=>{m(),Mi={id:`centerText`,afterDraw:e=>{let t=e.config.options.plugins.centerText;if(t&&t.display!==!1){let{ctx:n,chartArea:{left:r,top:i,width:a,height:o}}=e;n.save();let s=document.documentElement.classList.contains(`dark`),c=s?`#ffffff`:`#000000`;n.font=`bold 18px Outfit`,n.fillStyle=c,n.textAlign=`center`,n.textBaseline=`middle`,n.fillText(t.text||``,r+a/2,i+o/2),n.font=`bold 9px Inter`,n.fillStyle=s?`#ffffff`:`#000000`,n.fillText(`TOTAL`,r+a/2,i+o/2+18),n.restore()}}},typeof Chart<`u`&&Chart.register(Mi)}));function Pi(){Q(`enc`);let e={};l.filtered.forEach(t=>{let n=String(t._meta.nombre||`Desconocido`).split(` `)[0];e[n]=(e[n]||0)+1});let t=Object.entries(e).sort((e,t)=>t[1]-e[1]).slice(0,15),n=x(`chartEncuestador`);n&&(l.charts.enc=new Chart(n,{type:`bar`,data:{labels:t.map(e=>e[0]),datasets:[{label:`Encuestas`,data:t.map(e=>e[1]),backgroundColor:`#3B82F666`,borderColor:`#3B82F6`,borderWidth:1,borderRadius:4}]},options:{...$(),plugins:{...$().plugins,datalabels:{align:`top`,anchor:`end`,font:{weight:`bold`,size:10},color:document.documentElement.classList.contains(`dark`)?`#ffffff`:`#000000`,formatter:e=>e>0?e:``}}}}))}function Fi(){Q(`dur`);let e={};l.filtered.forEach(t=>{let n=String(t._meta.nombre||`Desconocido`).split(` `)[0];t._meta.durMin!==null&&(e[n]||(e[n]=[]),e[n].push(t._meta.durMin))});let t=Object.entries(e).map(([e,t])=>[e,v(t)]).sort((e,t)=>t[1]-e[1]).slice(0,15),n=x(`chartDuracion`);n&&(l.charts.dur=new Chart(n,{type:`bar`,data:{labels:t.map(e=>e[0]),datasets:[{label:`Minutos Promedio`,data:t.map(e=>Math.round(e[1])),backgroundColor:`#8B5CF666`,borderColor:`#8B5CF6`,borderWidth:1,borderRadius:4}]},options:{...$(),plugins:{...$().plugins,datalabels:{align:`top`,anchor:`end`,font:{weight:`bold`,size:10},color:document.documentElement.classList.contains(`dark`)?`#ffffff`:`#000000`,formatter:e=>e>0?e:``}}}}))}function Ii(){Q(`hor`);let e={};l.filtered.forEach(t=>{t._meta.hora!==null&&(e[t._meta.hora]=(e[t._meta.hora]||0)+1)});let t=Object.keys(e).map(Number).sort((e,t)=>e-t),n=t.map(e=>`${e}:00`),r=t.map(t=>e[t]),i=x(`chartHorario`);i&&(l.charts.hor=new Chart(i,{type:`bar`,data:{labels:n,datasets:[{label:`Encuestas Capturadas`,data:r,backgroundColor:`#10B98144`,borderColor:`#10B981`,borderWidth:1,borderRadius:4}]},options:{...$(),plugins:{...$().plugins,legend:{display:!1},datalabels:{align:`top`,anchor:`end`,font:{weight:`bold`,size:9},color:document.documentElement.classList.contains(`dark`)?`#ffffff`:`#000000`,formatter:e=>e>0?e:``}}}}))}function Li(){Q(`htrans`);let e={};l.filtered.forEach(t=>{t._meta.hora_trans!==null&&t._meta.hora_trans!==void 0&&(e[t._meta.hora_trans]=(e[t._meta.hora_trans]||0)+1)});let t=Object.keys(e).map(Number).sort((e,t)=>e-t),n=t.map(e=>`${e}:00`),r=t.map(t=>e[t]),i=x(`chartHoraTransmision`);i&&(l.charts.htrans=new Chart(i,{type:`bar`,data:{labels:n,datasets:[{label:`Encuestas Transmitidas`,data:r,backgroundColor:`#F9731644`,borderColor:`#F97316`,borderWidth:1,borderRadius:4}]},options:{...$(),plugins:{...$().plugins,legend:{display:!1},datalabels:{align:`top`,anchor:`end`,font:{weight:`bold`,size:9},color:document.documentElement.classList.contains(`dark`)?`#ffffff`:`#000000`,formatter:e=>e>0?e:``}}}}))}var Ri=a((()=>{m(),D(),Ni()}));function zi(e){let t=String(e).toUpperCase();for(let e in i)if(t.includes(e))return i[e].color;return i.DEFAULT.color}function Bi(e){let t=String(e).toUpperCase();if(c[t])return c[t].color;for(let e in c)if(t.includes(e))return c[e].color;return c.DEFAULT.color}function Vi(e){return(r[e]||r.DEFAULT).color}function Hi(){Q(`cond`);let e={};l.filtered.forEach(t=>{let n=t._meta?.subtipo_vivienda||`Otro (Especifique)`;e[n]=(e[n]||0)+1});let t=Object.entries(e).sort((e,t)=>t[1]-e[1]),n=x(`chartCondicion`);if(!n)return;let r=t.reduce((e,t)=>e+t[1],0);l.charts.cond=new Chart(n,{type:`doughnut`,data:{labels:t.map(e=>e[0]),datasets:[{data:t.map(e=>e[1]),backgroundColor:t.map(e=>Vi(e[0])+`bb`),borderColor:`#1c2128`,borderWidth:2,hoverOffset:15}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:`bottom`,labels:{color:document.documentElement.classList.contains(`dark`)?`#ffffff`:`#000000`,boxWidth:10,font:{size:10,weight:`bold`}}},datalabels:{color:document.documentElement.classList.contains(`dark`)?`#ffffff`:`#000000`,font:{weight:`bold`,size:11},formatter:e=>e>0?e:``},centerText:{text:String(r)}}}})}function Ui(){Q(`uso`);let e={};l.filtered.forEach(t=>{let r=t._meta.uso||`N/A`,i=n.uso[r]||String(r).replace(/_/g,` `).toUpperCase();e[i]=(e[i]||0)+1});let t=Object.entries(e).sort((e,t)=>t[1]-e[1]),r=x(`chartUso`);if(!r)return;let i=t.reduce((e,t)=>e+t[1],0);l.charts.uso=new Chart(r,{type:`doughnut`,data:{labels:t.map(e=>e[0]),datasets:[{data:t.map(e=>e[1]),backgroundColor:t.map(e=>zi(e[0])+`aa`),borderColor:`#1c2128`,borderWidth:2,hoverOffset:15}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:`bottom`,labels:{color:document.documentElement.classList.contains(`dark`)?`#ffffff`:`#000000`,boxWidth:10,font:{size:10,weight:`bold`}}},datalabels:{color:document.documentElement.classList.contains(`dark`)?`#ffffff`:`#000000`,font:{weight:`bold`,size:10},formatter:e=>e>0?e:``},centerText:{text:String(i)}}}})}function Wi(){if(!x(`chartClasificacion`))return;Q(`clasif`);let e={"TIPO A":0,"TIPO B":0,"TIPO C":0,"TIPO E":0};l.filtered.forEach(t=>{let n=t._meta&&t._meta.tipo_vivienda;e.hasOwnProperty(n)&&e[n]++});let t=Object.entries(e),n=t.map(e=>e[0]),r=t.map(e=>e[1]),i=n.map(e=>Bi(e)),a=r.reduce((e,t)=>e+t,0),o=x(`chartClasificacion`);l.charts.clasif=new Chart(o,{type:`doughnut`,data:{labels:n,datasets:[{data:r,backgroundColor:i.map(e=>e+`aa`),borderColor:`#1c2128`,borderWidth:2,hoverOffset:15}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:`bottom`,labels:{color:document.documentElement.classList.contains(`dark`)?`#ffffff`:`#000000`,boxWidth:10,font:{size:10,weight:`bold`}}},datalabels:{color:document.documentElement.classList.contains(`dark`)?`#ffffff`:`#000000`,font:{weight:`bold`,size:11},formatter:e=>e>0?e:``},centerText:{text:String(a)}}}})}var Gi=a((()=>{m(),D(),Ni()}));function Ki(){Q(`dia`);let e={};l.filtered.forEach(t=>{t._meta.fecha&&(e[t._meta.fecha]=(e[t._meta.fecha]||0)+1)});let t=Object.entries(e).sort(),n=x(`chartPorDia`);n&&(l.charts.dia=new Chart(n,{type:`line`,data:{labels:t.map(e=>e[0]),datasets:[{label:`Encuestas`,data:t.map(e=>e[1]),borderColor:`#10B981`,backgroundColor:`#10B98122`,fill:!0,tension:.3}]},options:{...$(),plugins:{...$().plugins,datalabels:{align:`top`,anchor:`end`,offset:2,font:{weight:`bold`,size:10},color:document.documentElement.classList.contains(`dark`)?`#ffffff`:`#000000`,formatter:e=>e>0?e:``}}}}))}function qi(){Q(`histo`);let e=[0,20,40,60,90,120,999],t=[`<20`,`20-40`,`40-60`,`60-90`,`90-120`,`>120`],n=Array(t.length).fill(0);l.filtered.forEach(t=>{let r=t._meta.durMin;if(r!==null){for(let t=0;t<e.length-1;t++)if(r<e[t+1]){n[t]++;break}}});let r=x(`chartHistograma`);r&&(l.charts.histo=new Chart(r,{type:`bar`,data:{labels:t,datasets:[{data:n,backgroundColor:`#F59E0B66`,borderColor:`#F59E0B`,borderWidth:1}]},options:$()}))}function Ji(){Q(`semana`);let e=x(`chartResumenSemanal`);if(!e)return;let t=new Set;l.filtered.forEach(e=>{e._meta.semana&&t.add(e._meta.semana)});let n=[...t].sort();if(n.length===0)return;let r=new Set(l.filtered.map(e=>e._meta.cedula)),i=Object.values(l.encMap).filter(e=>r.has(e.cedula)&&e.semanas).sort((e,t)=>{let n=Object.values(e.semanas).reduce((e,t)=>e+t.size,0);return Object.values(t.semanas).reduce((e,t)=>e+t.size,0)-n}).slice(0,10).map((e,t)=>({label:String(e.nombre||`N/A`).split(` `)[0],data:n.map(t=>e.semanas[t]?e.semanas[t].size:0),backgroundColor:s[t%s.length]+`99`,borderColor:s[t%s.length],borderWidth:1,borderRadius:3}));l.charts.semana=new Chart(e,{type:`bar`,data:{labels:n,datasets:i},options:{...$(),plugins:{...$().plugins,legend:{position:`bottom`,labels:{boxWidth:10,font:{size:9}}}},scales:{x:{ticks:{font:{size:9}}},y:{beginAtZero:!0,ticks:{font:{size:9}},title:{display:!0,text:`Controles únicos`,font:{size:9}}}}}})}var Yi=a((()=>{m(),D(),Ni()})),Xi=a((()=>{Ni(),Ri(),Gi(),Yi()}));function Zi(){return`
    <div id="tab-inconsistencias" class="tab-content flex flex-col gap-4 sm:gap-6 hidden-tab lg:h-[calc(100vh-180px)] h-auto overflow-y-auto lg:overflow-visible">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 px-2">
        <div>
          <h2 class="text-2xl font-black font-outfit text-slate-900 dark:text-white">Motor de Inconsistencias</h2>
          <p class="text-sm text-slate-500">Detección automática de anomalías en el levantamiento.</p>
        </div>
        
        <!-- Leyenda de Severidad -->
        <div class="flex items-center gap-3 bg-white/80 dark:bg-slate-900/60 backdrop-blur-md rounded-xl p-2.5 border border-slate-200 dark:border-white/5 text-[10px] shadow-sm select-none">
          <div class="text-[9px] uppercase font-bold text-slate-400 tracking-wider border-r border-slate-200 dark:border-slate-800/80 pr-2.5 mr-0.5">Severidad</div>
          <div class="flex items-center gap-3">
            <div class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-[#EF4444]"></span>
              <span class="text-slate-600 dark:text-slate-300 font-medium">Crítico</span>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-[#F59E0B]"></span>
              <span class="text-slate-600 dark:text-slate-300 font-medium">Advertencia</span>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-[#8B5CF6]"></span>
              <span class="text-slate-600 dark:text-slate-300 font-medium">Ubicación / GPS</span>
            </div>
          </div>
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
    </div>`}var Qi=a((()=>{}));function $i(){return`
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
    </div>`}var ea=a((()=>{}));function ta(){return`
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
                  class="w-full bg-white dark:bg-surface-dark border border-slate-300 dark:border-slate-700/80 rounded-xl pl-10 pr-10 py-2.5 text-sm text-slate-800 dark:text-slate-200 font-bold outline-none focus:border-brand-blue/50 focus:ring-1 transition-all" />
                
                <button id="mm111ClearSearch" class="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hidden">
                   <i data-lucide="x" class="w-4 h-4"></i>
                </button>

                <!-- Search Results Dropdown -->
                <div id="mm111SearchResults" class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl z-[100] max-h-64 overflow-y-auto hidden custom-scrollbar">
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

        <!-- Información de Planilla Geográfica (Simplificada) -->
        <div class="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-2">
          <!-- 1. Entidad -->
          <div class="p-4 bg-slate-50 dark:bg-surface-dark/40 rounded-xl border border-slate-200 dark:border-slate-800/80 flex justify-between items-center shadow-sm">
            <div>
              <p class="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Entidad</p>
              <p class="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1 truncate" id="mm111Entidad">---</p>
            </div>
            <div class="bg-slate-200/60 dark:bg-slate-800 px-3 py-1.5 rounded-lg text-xs font-black font-outfit border border-slate-300 dark:border-slate-700" id="mm111EntidadCod">--</div>
          </div>

          <!-- 2. Control -->
          <div class="p-4 bg-yellow-50 dark:bg-yellow-500/5 rounded-xl border border-yellow-100 dark:border-yellow-500/10 flex justify-between items-center shadow-sm">
            <div>
              <p class="text-[9px] uppercase font-black text-yellow-600 dark:text-yellow-400 tracking-wider">Control</p>
              <p class="text-base font-black font-outfit text-yellow-700 dark:text-yellow-200 mt-1" id="mm111ControlNro">0000</p>
            </div>
            <div class="bg-yellow-100/80 dark:bg-yellow-950/30 px-3 py-1.5 rounded-lg text-xs font-black text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-900/30">CTRL</div>
          </div>

          <!-- 3. Lote -->
          <div class="p-4 bg-slate-50 dark:bg-surface-dark/40 rounded-xl border border-slate-200 dark:border-slate-800/80 flex justify-between items-center shadow-sm">
            <div>
              <p class="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Lote</p>
              <p class="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1 truncate" id="mm111Lote">-</p>
            </div>
            <div class="bg-slate-200/60 dark:bg-slate-800 px-3 py-1.5 rounded-lg text-xs font-black font-outfit border border-slate-300 dark:border-slate-700">LOTE</div>
          </div>

          <!-- 4. Segmento o Sector -->
          <div class="p-4 bg-slate-50 dark:bg-surface-dark/40 rounded-xl border border-slate-200 dark:border-slate-800/80 flex justify-between items-center shadow-sm">
            <div>
              <p class="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Segmento / Sector</p>
              <div class="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1 flex gap-1">
                <span id="mm111Segmento">-</span> / <span id="mm111Sector">-</span>
              </div>
            </div>
            <div class="bg-slate-200/60 dark:bg-slate-800 px-3 py-1.5 rounded-lg text-xs font-black font-outfit border border-slate-300 dark:border-slate-700">SEG/SEC</div>
          </div>

          <!-- 5. Duración de Levantamiento -->
          <div class="p-4 bg-slate-50 dark:bg-surface-dark/40 rounded-xl border border-slate-200 dark:border-slate-800/80 flex justify-between items-center shadow-sm">
            <div>
              <p class="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Duración de Levantamiento</p>
              <p class="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1 truncate" id="mm111Duracion">-</p>
            </div>
            <div class="bg-slate-200/60 dark:bg-slate-800 px-3 py-1.5 rounded-lg text-xs font-black font-outfit border border-slate-300 dark:border-slate-700">DUR.</div>
          </div>
        </div>
      </div>

      <!-- Tabla de Listado de Viviendas -->
      <div class="card-premium flex-1 flex flex-col p-0 overflow-hidden border-2 border-slate-200 dark:border-slate-700 mt-4 relative min-h-[500px] lg:min-h-0">
        <div id="mm111Grid" class="w-full h-full bg-white dark:bg-surface-dark"></div>
      </div>
    </div>`}var na=a((()=>{}));function ra(){return`
    <div id="tab-ranking" class="tab-content flex flex-col gap-8 hidden-tab animate-fade-in">
      <!-- Resumen de Desempeño y Tasa de No Respuesta Global -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="glass-panel rounded-2xl p-4 !border-l-4 !border-brand-purple">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-brand-purple/10 rounded-lg text-brand-purple">
              <i data-lucide="percent" class="w-5 h-5"></i>
            </div>
            <div>
              <p class="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-widest font-sans mt-0">Tasa de No Respuesta (TIPO A)</p>
              <div class="flex items-baseline gap-2 mt-0.5">
                <h3 class="font-black font-outfit text-2xl text-slate-900 dark:text-white mt-0" id="rankKpiPctNoRespuesta">0%</h3>
                <span class="text-xs text-slate-500 font-bold" id="rankKpiNoEfectivaSub">(0 Tipo A)</span>
              </div>
            </div>
          </div>
        </div>

        <div class="glass-panel rounded-2xl p-4 !border-l-4 !border-brand-emerald">
          <div class="flex items-center gap-3">
            <div class="p-2 bg-brand-emerald/10 rounded-lg text-brand-emerald">
              <i data-lucide="check-circle" class="w-5 h-5"></i>
            </div>
            <div>
              <p class="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-widest font-sans mt-0">Encuestas Efectivas (TIPO E)</p>
              <div class="flex items-baseline gap-2 mt-0.5">
                <h3 class="font-black font-outfit text-2xl text-slate-900 dark:text-white mt-0" id="rankKpiEfectivas">0</h3>
                <span class="text-xs text-brand-emerald font-bold" id="rankKpiPctEfectivas">(0%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="glass-panel rounded-2xl p-6 flex flex-col">
          <header class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-4 border-b border-slate-200/50 dark:border-white/5">
            <div class="flex items-center gap-3">
              <div class="p-2.5 bg-brand-purple/10 rounded-xl"><i data-lucide="award" class="text-brand-purple w-6 h-6"></i></div>
              <div>
                <h3 class="font-bold font-outfit text-xl text-slate-800 dark:text-white">Tasa de No Respuesta y Desempeño Operativo</h3>
                <p class="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-0.5">Ranking por encuestador y desglose tipológico</p>
              </div>
            </div>
            <div class="flex items-center gap-1 p-1 bg-slate-100 dark:bg-white/5 rounded-lg border border-slate-200/50">
              <button class="sort-btn px-2.5 py-1.5 text-[9px] font-black uppercase rounded-md active" data-sort="norespuesta">No Respuesta</button>
              <button class="sort-btn px-2.5 py-1.5 text-[9px] font-black uppercase rounded-md" data-sort="eficiencia">Eficiencia</button>
              <button class="sort-btn px-2.5 py-1.5 text-[9px] font-black uppercase rounded-md" data-sort="encuestas">Volumen</button>
            </div>
          </header>
          <div id="rankingTable" class="flex-1 border-0 custom-scrollbar"></div>
      </div>
    </div>`}var ia=a((()=>{}));function aa(){return`
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
      <section class="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-7 gap-4">
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

        <div class="card-premium group relative animate-slide-up" title="Comparativa porcentual entre encuestas efectivas y no efectivas: (Efectivas / (Efectivas + No Efectivas)) * 100.">
          <div class="card-glow bg-teal-500/10 group-hover:bg-teal-500/20"></div>
          <div class="h-10 w-10 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center mb-4">
            <i data-lucide="percent" class="w-5 h-5"></i>
          </div>
          <div class="kpi-value-text" id="kpiTasaEfectividad">0%</div>
          <div class="text-[10px] font-bold text-teal-400 tracking-wider uppercase mt-1">Tasa de Efectividad</div>
        </div>

        <div class="card-premium group relative animate-slide-up" title="Tasa de no respuesta calculada sobre el total de viviendas elegibles: (Tipo A / (Planificadas - (Tipo B + Tipo C))) * 100.">
          <div class="card-glow bg-purple-500/10 group-hover:bg-purple-500/20"></div>
          <div class="h-10 w-10 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
            <i data-lucide="user-x" class="w-5 h-5"></i>
          </div>
          <div class="kpi-value-text" id="kpiTasaNoRespuesta">0%</div>
          <div class="text-[10px] font-bold text-purple-400 tracking-wider uppercase mt-1">Tasa No Respuesta</div>
        </div>

        <div class="card-premium group relative animate-slide-up" title="Cantidad de encuestadores únicos que han sincronizado datos en el periodo y filtros seleccionados.">
          <div class="card-glow bg-cyan-500/10 group-hover:bg-cyan-500/20"></div>
          <div class="h-10 w-10 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4">
            <i data-lucide="users" class="w-5 h-5"></i>
          </div>
          <div class="kpi-value-text" id="kpiEncuestadores">0</div>
          <div class="text-[10px] font-bold text-cyan-400 tracking-wider uppercase mt-1">Encuestadores Activos</div>
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

      <!-- TIER 1.5: Clasificación y Desglose Detallado de Viviendas -->
      <section id="subtiposBreakdownContainer" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Rendered dynamically by kpis.js updateSubtiposBreakdown() -->
        <div class="col-span-full text-center text-slate-400 text-xs py-6 animate-pulse">Cargando desglose de viviendas...</div>
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
    </div>`}var oa=a((()=>{}));function sa(){return`
    <div id="tab-reportes" class="tab-content flex flex-col gap-6 hidden-tab animate-fade-in">

      <!-- ── Encabezado ─────────────────────────────────────────────────────── -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 px-2">
        <div>
          <h2 class="text-xl sm:text-2xl font-black font-outfit text-slate-800 dark:text-white flex items-center gap-3">
            <span class="p-2 bg-emerald-500/10 rounded-xl text-emerald-500">
              <i data-lucide="file-spreadsheet" class="w-5 h-5 sm:w-6 sm:h-6"></i>
            </span>
            Generador de Reportes
          </h2>
          <p class="text-sm text-slate-500 font-inter mt-1 ml-1">Selecciona los campos que deseas exportar y descarga el reporte en formato Excel.</p>
        </div>
        <div id="reportes-record-count"
          class="flex items-center gap-2 bg-brand-blue/10 border border-brand-blue/20 text-brand-blue px-4 py-2 rounded-full text-xs font-bold tracking-wide whitespace-nowrap">
          <i data-lucide="database" class="w-3.5 h-3.5"></i>
          <span id="rpt-count-label">— registros listos</span>
        </div>
      </div>

      <!-- ── Cuerpo Principal: Config + Checklist ───────────────────────────── -->
      <div class="grid grid-cols-1 xl:grid-cols-12 gap-5">

        <!-- ── Panel izquierdo: Configuración ──────────────────────────────── -->
        <div class="xl:col-span-4 flex flex-col gap-4">

          <!-- Nombre del archivo -->
          <div class="card-premium flex flex-col gap-4">
            <div class="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <div class="p-1.5 bg-brand-blue/10 text-brand-blue rounded-lg">
                <i data-lucide="settings-2" class="w-4 h-4"></i>
              </div>
              <span class="font-outfit font-black text-sm uppercase tracking-wider text-slate-800 dark:text-slate-200">
                Configuración de Exportación
              </span>
            </div>

            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Nombre del Archivo
              </label>
              <div class="relative">
                <i data-lucide="file-spreadsheet" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"></i>
                <input id="rpt-filename" type="text" value="reporte_encuestas"
                  class="w-full bg-white dark:bg-surface-dark/80 border border-slate-300 dark:border-slate-700/80 rounded-xl pl-10 pr-16 py-2.5 text-sm text-slate-700 dark:text-slate-200 focus:border-brand-emerald/50 focus:ring-1 outline-none transition-all"
                  placeholder="reporte_encuestas" />
                <span class="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">.xlsx</span>
              </div>
            </div>

            <!-- Fuente de datos -->
            <div class="flex flex-col gap-2">
              <label class="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Fuente de Datos
              </label>
              <div class="flex flex-col gap-2">
                <label class="flex items-start gap-3 cursor-pointer group p-2.5 rounded-xl border border-transparent hover:border-brand-emerald/30 hover:bg-emerald-500/5 transition-all">
                  <input type="radio" name="rpt-datasource" id="rpt-src-filtered" value="filtered" checked
                    class="mt-0.5 accent-emerald-500 shrink-0 cursor-pointer" />
                  <div>
                    <div class="text-sm font-bold text-slate-700 dark:text-slate-200">Registros filtrados</div>
                    <div class="text-[11px] text-slate-500">Solo los registros visibles según los filtros activos</div>
                  </div>
                </label>
                <label class="flex items-start gap-3 cursor-pointer group p-2.5 rounded-xl border border-transparent hover:border-brand-blue/30 hover:bg-blue-500/5 transition-all">
                  <input type="radio" name="rpt-datasource" id="rpt-src-all" value="all"
                    class="mt-0.5 accent-blue-500 shrink-0 cursor-pointer" />
                  <div>
                    <div class="text-sm font-bold text-slate-700 dark:text-slate-200">Todos los Registros</div>
                    <div class="text-[11px] text-slate-500">Todos los registros descargados, ignorando filtros</div>
                  </div>
                </label>
              </div>
            </div>

            <!-- Opciones de estructura -->
            <div class="flex flex-col gap-2">
              <label class="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Opciones
              </label>
              <label class="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" id="rpt-opt-alerts-text" checked class="rounded accent-emerald-500 cursor-pointer" />
                <span class="text-sm text-slate-600 dark:text-slate-300">Exportar alertas como texto legible</span>
              </label>
              <label class="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" id="rpt-opt-include-header" checked class="rounded accent-emerald-500 cursor-pointer" />
                <span class="text-sm text-slate-600 dark:text-slate-300">Incluir fila de cabeceras</span>
              </label>
            </div>
          </div>

          <!-- Presets de Selección -->
          <div class="card-premium flex flex-col gap-3">
            <div class="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <div class="p-1.5 bg-brand-purple/10 text-brand-purple rounded-lg">
                <i data-lucide="sparkles" class="w-4 h-4"></i>
              </div>
              <span class="font-outfit font-black text-sm uppercase tracking-wider text-slate-800 dark:text-slate-200">
                Presets Rápidos
              </span>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <button id="rpt-preset-basic" data-preset="basic"
                class="rpt-preset-btn flex flex-col items-center gap-1.5 p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-brand-emerald/50 hover:bg-emerald-500/5 transition-all text-center group">
                <i data-lucide="layout-list" class="w-4 h-4 text-slate-400 group-hover:text-brand-emerald transition-colors"></i>
                <span class="text-[11px] font-bold text-slate-600 dark:text-slate-300 group-hover:text-brand-emerald transition-colors">Básico</span>
                <span class="text-[9px] text-slate-400 leading-tight">ID + Ubicación + Estado</span>
              </button>
              <button id="rpt-preset-audit" data-preset="audit"
                class="rpt-preset-btn flex flex-col items-center gap-1.5 p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-brand-red/50 hover:bg-red-500/5 transition-all text-center group">
                <i data-lucide="shield-alert" class="w-4 h-4 text-slate-400 group-hover:text-brand-red transition-colors"></i>
                <span class="text-[11px] font-bold text-slate-600 dark:text-slate-300 group-hover:text-brand-red transition-colors">Calidad</span>
                <span class="text-[9px] text-slate-400 leading-tight">Métricas de validación</span>
              </button>
              <button id="rpt-preset-demo" data-preset="demo"
                class="rpt-preset-btn flex flex-col items-center gap-1.5 p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-brand-blue/50 hover:bg-blue-500/5 transition-all text-center group">
                <i data-lucide="users" class="w-4 h-4 text-slate-400 group-hover:text-brand-blue transition-colors"></i>
                <span class="text-[11px] font-bold text-slate-600 dark:text-slate-300 group-hover:text-brand-blue transition-colors">Demografía</span>
                <span class="text-[9px] text-slate-400 leading-tight">Personas + Hogares</span>
              </button>
              <button id="rpt-preset-geo" data-preset="geo"
                class="rpt-preset-btn flex flex-col items-center gap-1.5 p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-brand-orange/50 hover:bg-orange-500/5 transition-all text-center group">
                <i data-lucide="map-pin" class="w-4 h-4 text-slate-400 group-hover:text-brand-orange transition-colors"></i>
                <span class="text-[11px] font-bold text-slate-600 dark:text-slate-300 group-hover:text-brand-orange transition-colors">Geográfico</span>
                <span class="text-[9px] text-slate-400 leading-tight">GPS + Segmentos</span>
              </button>
            </div>
            <div class="flex gap-2 pt-1 border-t border-slate-100 dark:border-slate-800 mt-1">
              <button id="rpt-select-all" class="flex-1 text-[11px] font-bold py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-500/10 hover:text-brand-emerald transition-all">
                ✓ Seleccionar Todo
              </button>
              <button id="rpt-clear-all" class="flex-1 text-[11px] font-bold py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-red-500/10 hover:text-brand-red transition-all">
                ✕ Limpiar Todo
              </button>
            </div>
          </div>

          <!-- Botón de Exportación -->
          <button id="rpt-export-btn"
            class="group relative w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl font-outfit font-black text-base text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
            <span id="rpt-export-icon" class="transition-transform group-hover:scale-110">
              <i data-lucide="download" class="w-5 h-5"></i>
            </span>
            <span id="rpt-export-text">Generar Reporte Excel</span>
            <span id="rpt-export-spinner" class="hidden">
              <svg class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
            </span>
          </button>

        </div>

        <!-- ── Panel derecho: Checklist de Campos ──────────────────────────── -->
        <div class="xl:col-span-8 flex flex-col gap-4">

          <!-- ── Grupo: Identificación ───────────────────────────────────── -->
          <div class="card-premium !p-0 overflow-hidden">
            <button class="rpt-section-toggle w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-white/3 transition-colors" data-section="identificacion">
              <div class="flex items-center gap-2.5">
                <div class="p-1.5 bg-brand-blue/10 text-brand-blue rounded-lg"><i data-lucide="id-card" class="w-4 h-4"></i></div>
                <span class="font-outfit font-black text-sm text-slate-800 dark:text-slate-200">Identificación</span>
                <span class="text-[10px] bg-brand-blue/10 text-brand-blue font-bold px-2 py-0.5 rounded-full rpt-selected-count" data-section="identificacion">0</span>
              </div>
              <i data-lucide="chevron-down" class="w-4 h-4 text-slate-400 transition-transform rpt-chevron" data-section="identificacion"></i>
            </button>
            <div class="rpt-section-body px-4 pb-4 border-t border-slate-100 dark:border-slate-800" data-section="identificacion">
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2.5 pt-3">
                ${ca([{id:`rpt-f-cedula`,label:`Cédula`,desc:`Documento del encuestador`,checked:!0},{id:`rpt-f-nombre`,label:`Nombre`,desc:`Nombre del encuestador`,checked:!0},{id:`rpt-f-control`,label:`Control`,desc:`Número de control`,checked:!0},{id:`rpt-f-serie`,label:`Serie`,desc:`N° de serie`,checked:!0},{id:`rpt-f-linea`,label:`Línea`,desc:`N° de línea`,checked:!0},{id:`rpt-f-linea_valida`,label:`Línea Válida`,desc:`Válida / INVÁLIDA`,checked:!1},{id:`rpt-f-lote`,label:`Lote`,desc:`N° de lote`,checked:!1},{id:`rpt-f-semana`,label:`Semana`,desc:`Semana del levantamiento`,checked:!0},{id:`rpt-f-fecha`,label:`Fecha`,desc:`Fecha de la encuesta`,checked:!0},{id:`rpt-f-uuid`,label:`UUID`,desc:`Identificador único Kobo`,checked:!1}])}
              </div>
            </div>
          </div>

          <!-- ── Grupo: Ubicación ────────────────────────────────────────── -->
          <div class="card-premium !p-0 overflow-hidden">
            <button class="rpt-section-toggle w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-white/3 transition-colors" data-section="ubicacion">
              <div class="flex items-center gap-2.5">
                <div class="p-1.5 bg-brand-orange/10 text-brand-orange rounded-lg"><i data-lucide="map-pin" class="w-4 h-4"></i></div>
                <span class="font-outfit font-black text-sm text-slate-800 dark:text-slate-200">Ubicación Geográfica</span>
                <span class="text-[10px] bg-brand-orange/10 text-brand-orange font-bold px-2 py-0.5 rounded-full rpt-selected-count" data-section="ubicacion">0</span>
              </div>
              <i data-lucide="chevron-down" class="w-4 h-4 text-slate-400 transition-transform rpt-chevron" data-section="ubicacion"></i>
            </button>
            <div class="rpt-section-body px-4 pb-4 border-t border-slate-100 dark:border-slate-800" data-section="ubicacion">
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2.5 pt-3">
                ${ca([{id:`rpt-f-entidad`,label:`Entidad`,desc:`Código de estado/entidad`,checked:!1},{id:`rpt-f-mun`,label:`Municipio`,desc:`Código de municipio`,checked:!0},{id:`rpt-f-par`,label:`Parroquia`,desc:`Código de parroquia`,checked:!1},{id:`rpt-f-nodo`,label:`Nodo`,desc:`Nodo censal`,checked:!1},{id:`rpt-f-segmento`,label:`Segmento`,desc:`Código de segmento`,checked:!1},{id:`rpt-f-sector`,label:`Sector`,desc:`Código de sector`,checked:!1},{id:`rpt-f-manzana`,label:`Manzana`,desc:`N° de manzana`,checked:!1},{id:`rpt-f-parcela`,label:`Parcela`,desc:`N° de parcela`,checked:!1},{id:`rpt-f-direccion`,label:`Dirección/Sector`,desc:`Nombre del sector`,checked:!1},{id:`rpt-f-lat`,label:`Latitud`,desc:`Coordenada GPS Lat.`,checked:!1},{id:`rpt-f-lng`,label:`Longitud`,desc:`Coordenada GPS Lng.`,checked:!1}])}
              </div>
            </div>
          </div>

          <!-- ── Grupo: Estado y Vivienda ───────────────────────────────── -->
          <div class="card-premium !p-0 overflow-hidden">
            <button class="rpt-section-toggle w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-white/3 transition-colors" data-section="vivienda">
              <div class="flex items-center gap-2.5">
                <div class="p-1.5 bg-brand-emerald/10 text-brand-emerald rounded-lg"><i data-lucide="home" class="w-4 h-4"></i></div>
                <span class="font-outfit font-black text-sm text-slate-800 dark:text-slate-200">Estado y Vivienda</span>
                <span class="text-[10px] bg-brand-emerald/10 text-brand-emerald font-bold px-2 py-0.5 rounded-full rpt-selected-count" data-section="vivienda">0</span>
              </div>
              <i data-lucide="chevron-down" class="w-4 h-4 text-slate-400 transition-transform rpt-chevron" data-section="vivienda"></i>
            </button>
            <div class="rpt-section-body px-4 pb-4 border-t border-slate-100 dark:border-slate-800" data-section="vivienda">
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2.5 pt-3">
                ${ca([{id:`rpt-f-estado`,label:`Estado`,desc:`Completada / No efectiva`,checked:!0},{id:`rpt-f-tipo_vivienda`,label:`Tipo Vivienda (A/B/C/E)`,desc:`Clasificación del tipo`,checked:!1},{id:`rpt-f-subtipo_vivienda`,label:`Subtipo Vivienda`,desc:`Desglose detallado de subtipo`,checked:!1},{id:`rpt-f-condicion`,label:`Condición de Ocupación`,desc:`Presentes, ausentes, etc.`,checked:!1},{id:`rpt-f-uso`,label:`Uso de la Unidad`,desc:`Residencial, comercial...`,checked:!1},{id:`rpt-f-situacion_vivienda`,label:`Situación Vivienda`,desc:`Valor crudo de situación`,checked:!1},{id:`rpt-f-nota`,label:`Nota / Observación`,desc:`Campo de nota final`,checked:!1}])}
              </div>
            </div>
          </div>

          <!-- ── Grupo: Demografía ──────────────────────────────────────── -->
          <div class="card-premium !p-0 overflow-hidden">
            <button class="rpt-section-toggle w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-white/3 transition-colors" data-section="demografia">
              <div class="flex items-center gap-2.5">
                <div class="p-1.5 bg-indigo-500/10 text-indigo-500 rounded-lg"><i data-lucide="users" class="w-4 h-4"></i></div>
                <span class="font-outfit font-black text-sm text-slate-800 dark:text-slate-200">Demografía</span>
                <span class="text-[10px] bg-indigo-500/10 text-indigo-500 font-bold px-2 py-0.5 rounded-full rpt-selected-count" data-section="demografia">0</span>
              </div>
              <i data-lucide="chevron-down" class="w-4 h-4 text-slate-400 transition-transform rpt-chevron" data-section="demografia"></i>
            </button>
            <div class="rpt-section-body px-4 pb-4 border-t border-slate-100 dark:border-slate-800" data-section="demografia">
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2.5 pt-3">
                ${ca([{id:`rpt-f-totalPers`,label:`Total Personas`,desc:`N° de miembros del hogar`,checked:!1},{id:`rpt-f-hogares`,label:`N° Hogares`,desc:`Hogares por encuesta`,checked:!1},{id:`rpt-f-hombres`,label:`Hombres`,desc:`Total de sexo masculino`,checked:!1},{id:`rpt-f-mujeres`,label:`Mujeres`,desc:`Total de sexo femenino`,checked:!1}])}
              </div>
            </div>
          </div>

          <!-- ── Grupo: Calidad / Auditoría ─────────────────────────────── -->
          <div class="card-premium !p-0 overflow-hidden">
            <button class="rpt-section-toggle w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-white/3 transition-colors" data-section="calidad">
              <div class="flex items-center gap-2.5">
                <div class="p-1.5 bg-brand-red/10 text-brand-red rounded-lg"><i data-lucide="shield-alert" class="w-4 h-4"></i></div>
                <span class="font-outfit font-black text-sm text-slate-800 dark:text-slate-200">Calidad y Auditoría</span>
                <span class="text-[10px] bg-brand-red/10 text-brand-red font-bold px-2 py-0.5 rounded-full rpt-selected-count" data-section="calidad">0</span>
              </div>
              <i data-lucide="chevron-down" class="w-4 h-4 text-slate-400 transition-transform rpt-chevron" data-section="calidad"></i>
            </button>
            <div class="rpt-section-body px-4 pb-4 border-t border-slate-100 dark:border-slate-800" data-section="calidad">
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2.5 pt-3">
                ${ca([{id:`rpt-f-durMin`,label:`Duración (min)`,desc:`Tiempo de la encuesta`,checked:!1},{id:`rpt-f-distance_m`,label:`Dist. al Control (m)`,desc:`Distancia GPS al control`,checked:!1},{id:`rpt-f-dist_ini_fin`,label:`Desplazamiento (m)`,desc:`Dist. inicio a fin`,checked:!1},{id:`rpt-f-actual_seg`,label:`Segmento Real GPS`,desc:`Segmento detectado por GPS`,checked:!1},{id:`rpt-f-alertas`,label:`Alertas`,desc:`Códigos de inconsistencias`,checked:!1},{id:`rpt-f-hasAlerts`,label:`¿Tiene Alertas?`,desc:`Sí / No`,checked:!1},{id:`rpt-f-hora_inicio`,label:`Hora Inicio`,desc:`Hora de apertura del form.`,checked:!1},{id:`rpt-f-hora_trans`,label:`Hora Transmisión`,desc:`Hora de envío al servidor`,checked:!1}])}
              </div>
            </div>
          </div>

          <!-- ── Grupo: Campos Dinámicos (Raw Kobo) ─────────────────────── -->
          <div class="card-premium !p-0 overflow-hidden">
            <button class="rpt-section-toggle w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-white/3 transition-colors" data-section="raw">
              <div class="flex items-center gap-2.5">
                <div class="p-1.5 bg-brand-purple/10 text-brand-purple rounded-lg"><i data-lucide="code-2" class="w-4 h-4"></i></div>
                <span class="font-outfit font-black text-sm text-slate-800 dark:text-slate-200">Variables Originales Kobo</span>
                <span class="text-[10px] bg-brand-purple/10 text-brand-purple font-bold px-2 py-0.5 rounded-full rpt-selected-count" data-section="raw">0</span>
              </div>
              <i data-lucide="chevron-down" class="w-4 h-4 text-slate-400 transition-transform rpt-chevron" data-section="raw" style="transform:rotate(-90deg)"></i>
            </button>
            <div class="rpt-section-body hidden px-4 pb-4 border-t border-slate-100 dark:border-slate-800" data-section="raw">
              <div class="pt-3 flex flex-col gap-3">
                <p class="text-[11px] text-slate-500">Campos adicionales encontrados en el JSON crudo de Kobo. Los valores de tipo objeto/lista serán exportados como JSON.</p>
                <div class="relative">
                  <i data-lucide="search" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"></i>
                  <input id="rpt-raw-search" type="text" placeholder="Buscar campo..." 
                    class="w-full bg-white dark:bg-surface-dark/80 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs outline-none focus:border-brand-purple/50 transition-all" />
                </div>
                <div id="rpt-raw-fields-list" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-y-1.5 gap-x-4 max-h-60 overflow-y-auto pr-1 no-scrollbar">
                  <div class="col-span-full text-center text-sm text-slate-400 py-4">
                    <i data-lucide="loader-2" class="w-4 h-4 animate-spin inline-block mr-1"></i> Cargando campos...
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div> <!-- end right panel -->
      </div> <!-- end grid -->
    </div>`}function ca(e){return e.map(({id:e,label:t,desc:n,checked:r})=>`
        <label for="${e}" class="flex items-start gap-2.5 cursor-pointer group">
          <input type="checkbox" id="${e}" class="rpt-field-checkbox mt-0.5 shrink-0 accent-emerald-500 cursor-pointer rounded" ${r?`checked`:``} />
          <div>
            <div class="text-[12px] font-semibold text-slate-700 dark:text-slate-200 group-hover:text-brand-emerald transition-colors leading-tight">${t}</div>
            <div class="text-[10px] text-slate-400 leading-tight">${n}</div>
          </div>
        </label>
    `).join(``)}var la=a((()=>{})),ua=a((()=>{Qi(),ea(),na(),ia(),oa(),la()}));function da(){return`
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
            <!-- Navegación de registros -->
            <div class="flex items-center gap-1.5 mr-2 sm:mr-4 border-r border-slate-200 dark:border-slate-800 pr-2 sm:pr-4">
              <button id="btnDetailPrev" class="p-2 bg-white dark:bg-slate-800 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all border border-slate-200 dark:border-slate-700 disabled:opacity-30 disabled:pointer-events-none" title="Registro Anterior">
                <i data-lucide="chevron-left" class="w-4 h-4"></i>
              </button>
              <span id="detailModalRecordIndex" class="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 min-w-[3.5rem] text-center">0 / 0</span>
              <button id="btnDetailNext" class="p-2 bg-white dark:bg-slate-800 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all border border-slate-200 dark:border-slate-700 disabled:opacity-30 disabled:pointer-events-none" title="Registro Siguiente">
                <i data-lucide="chevron-right" class="w-4 h-4"></i>
              </button>
            </div>
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
    </div>`}var fa=a((()=>{}));function pa(){return`
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
    </div>`}var ma=a((()=>{}));function ha(){return`
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
            <div>
              <label class="block text-[11px] font-bold text-slate-500 mb-1.5 ml-1">No Respuesta (Por Control)</label>
              <select id="filterTasaNoRespuesta" class="w-full bg-white dark:bg-surface-dark border rounded-xl px-3 py-2 text-sm outline-none">
                <option value="">Todos los controles</option>
                <option value="con_no_resp">Controles con No Respuesta (> 0%)</option>
                <option value="sin_no_resp">Controles sin No Respuesta (= 0%)</option>
              </select>
            </div>
          </div>
        </div>

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
      </div>

      <div class="p-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/80 z-10 flex gap-3">
        <button id="btnResetOffcanvas" class="group flex items-center justify-center gap-2 py-3.5 px-4 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-500 hover:text-brand-orange hover:border-brand-orange/30 transition-all text-xs font-bold uppercase flex-1">
          <i data-lucide="brush-cleaning" class="w-4 h-4 group-hover:-rotate-12 transition-transform"></i> Limpiar
        </button>
        <button id="btnApplyFilters" class="btn-primary flex-[2] py-3.5 text-xs font-bold uppercase">
          <i data-lucide="check" class="w-4 h-4"></i> Aplicar Parámetros
        </button>
      </div>
    </div>`}var ga=a((()=>{}));function _a(){return`
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
    </div>`}var va=a((()=>{})),ya=a((()=>{fa(),ma(),ga(),va()}));function ba(){let e=x(`mainContent`),t=document.body;if(!e){console.error(`Layout Error: mainContent element not found.`);return}let n=[aa(),$i(),ra(),ta(),Zi(),sa()].join(``);e.insertAdjacentHTML(`beforeend`,n);let r=[_a(),pa(),ha(),da()].join(``);t.insertAdjacentHTML(`beforeend`,r),console.log(`UI Layout: All components injected successfully ✓`)}var xa=a((()=>{D(),ua(),ya()})),Sa=a((()=>{xa()}));function Ca(){let e=localStorage.getItem(`esca_theme`),t=!0;e===`light`?t=!1:e===`dark`&&(t=!0),wa(t);let n=x(`btnThemeToggle`);n&&n.addEventListener(`click`,()=>{wa(!document.documentElement.classList.contains(`dark`))})}function wa(e){let t=x(`iconMoon`),n=x(`iconSun`);e?(document.documentElement.classList.add(`dark`),localStorage.setItem(`esca_theme`,`dark`),t&&(t.style.display=`none`),n&&(n.style.display=`block`)):(document.documentElement.classList.remove(`dark`),localStorage.setItem(`esca_theme`,`light`),t&&(t.style.display=`block`),n&&(n.style.display=`none`)),ji(e)}var Ta=a((()=>{D(),Xi()}));function Ea(e=l.filtered){if(!l.planificacionData||!l.planificacionData.por_semana)return 0;let t=l.assetName&&l.assetName.toUpperCase().includes(`EHM`)?`EHM`:`ESCA`,n=x(`filterSemana`)?.value??``,r=x(`filterControl`)?.value??``,i=x(`filterMunicipio`)?.value??``,a=x(`filterParroquia`)?.value??``,o=x(`filterEncuestador`)?.value??``,s=null;o&&e&&(s=new Set(e.map(e=>e._meta?.control?String(e._meta.control).replace(/\D/g,``).padStart(4,`0`):null).filter(Boolean)));let c=``;i&&(c=i.replace(/^\d+\s*/,``).trim().toUpperCase());let u=``;a&&(u=a.replace(/^\d+\s*/,``).trim().toUpperCase());let d=0;return l.planificacionData.por_semana.forEach(e=>{e.programa===t&&(n&&e.semana!==Number(n)||r&&String(e.control).replace(/\D/g,``).padStart(4,`0`)!==r.replace(/\D/g,``).padStart(4,`0`)||s&&!s.has(String(e.control).replace(/\D/g,``).padStart(4,`0`))||c&&e.municipio.toUpperCase()!==c||u&&e.parroquia.toUpperCase()!==u||(d+=e.n_viviendas||0))}),d}function Da(){let e=l.filtered.filter(e=>e._meta&&e._meta.estado===`completada`).length,t=l.filtered.length-e,n=new Set(l.filtered.map(e=>e._meta.cedula)).size,r=l.filtered.filter(e=>e._meta.estado===`completada`).map(e=>e._meta.durMin).filter(e=>e!==null),i=r.length?v(r):0,a=l.filtered.reduce((e,t)=>e+(t._meta.totalPers||0),0),o=l.filtered.reduce((e,t)=>e+(t._meta.hogaresUniPersonales||0),0),s=new Set(l.filtered.map(e=>e._meta.control)).size,c=l.filtered.reduce((e,t)=>e+(t._meta.totalHombres||0),0),u=l.filtered.reduce((e,t)=>e+(t._meta.totalMujeres||0),0),d=new Set(l.filtered.map(e=>e._meta.mun)).size,f=l.filtered.filter(e=>e._meta&&e._meta.tipo_vivienda===`TIPO A`).length,m=l.filtered.filter(e=>e._meta&&e._meta.tipo_vivienda===`TIPO B`).length,h=l.filtered.filter(e=>e._meta&&e._meta.tipo_vivienda===`TIPO C`).length,g=l.filtered.filter(e=>e._meta&&e._meta.tipo_vivienda===`TIPO E`).length,_=l.filtered.filter(e=>e._meta&&e._meta.tipo_vivienda===`NO DEFINIDO`).length,y=l.filtered.length||1,b=Math.round(f/y*100),S=Math.round(m/y*100),C=Math.round(h/y*100),w=Math.round(g/y*100),T=Math.round(_/y*100);x(`kpiTotal`)&&(x(`kpiTotal`).textContent=l.filtered.length),x(`kpiCompletadas`)&&(x(`kpiCompletadas`).textContent=e),x(`kpiNoEfectiva`)&&(x(`kpiNoEfectiva`).textContent=t),x(`kpiEncuestadores`)&&(x(`kpiEncuestadores`).textContent=n),x(`kpiDuracion`)&&(x(`kpiDuracion`).textContent=i?`${Math.round(i)} min`:`N/A`),x(`kpiPersonas`)&&(x(`kpiPersonas`).textContent=a),x(`kpiHogaresUni`)&&(x(`kpiHogaresUni`).textContent=o),x(`kpiControles`)&&(x(`kpiControles`).textContent=s),x(`kpiHombres`)&&(x(`kpiHombres`).textContent=c),x(`kpiMujeres`)&&(x(`kpiMujeres`).textContent=u),x(`kpiMunicipios`)&&(x(`kpiMunicipios`).textContent=d),x(`kpiTipoA`)&&(x(`kpiTipoA`).textContent=f),x(`pctTipoA`)&&(x(`pctTipoA`).textContent=`${b}%`),x(`kpiTipoB`)&&(x(`kpiTipoB`).textContent=m),x(`pctTipoB`)&&(x(`pctTipoB`).textContent=`${S}%`),x(`kpiTipoC`)&&(x(`kpiTipoC`).textContent=h),x(`pctTipoC`)&&(x(`pctTipoC`).textContent=`${C}%`),x(`kpiTipoE`)&&(x(`kpiTipoE`).textContent=g),x(`pctTipoE`)&&(x(`pctTipoE`).textContent=`${w}%`),x(`kpiTipoND`)&&(x(`kpiTipoND`).textContent=_),x(`pctTipoND`)&&(x(`pctTipoND`).textContent=`${T}%`);let E=l.filtered.length/(n*8||1);x(`kpiEncPerHour`)&&(x(`kpiEncPerHour`).textContent=E.toFixed(1));let D={};l.filtered.forEach(e=>{let t=e._meta&&e._meta.nombre||`Desconocido`;D[t]=(D[t]||0)+1});let O=Object.entries(D).sort((e,t)=>t[1]-e[1])[0]||[`--`,0];x(`kpiTopProducer`)&&(x(`kpiTopProducer`).textContent=String(O[0]).split(` `)[0]),x(`kpiTopProducerVal`)&&(x(`kpiTopProducerVal`).textContent=`${O[1]} encuestas`);let k=l.filtered.filter(e=>e._meta&&e._meta.hasAlerts).length,A=l.filtered.length>0?Math.round(e/l.filtered.length*100):0,j=l.filtered.length>0?Math.round(k/l.filtered.length*100):0,M=x(`searchEncuesta`)?.value.toLowerCase()??``,N=x(`filterEncuestador`)?.value??``,P=x(`filterFechaInicio`)?.value??``,F=x(`filterFechaFin`)?.value??``,I=x(`filterSemana`)?.value??``,R=x(`filterControl`)?.value??``,z=x(`filterMunicipio`)?.value??``,ee=x(`filterParroquia`)?.value??``,te=x(`filterNodo`)?.value??``,ne=x(`filterSituacionVivienda`)?.value??``,re=x(`filterCondicion`)?.value??``,ie=x(`filterUso`)?.value??``,ae=x(`filterAlerta`)?.value??``,B=x(`filterHoraTransmision`)?.value??``,oe=x(`filterHoraInicio`)?.value??``,V=l.rawData.filter(e=>{let t=e._meta;return!(!t||M&&!(t.nombre.toLowerCase().includes(M)||t.cedula.includes(M)||t.control.includes(M))||N&&t.cedula!==N||l.filterINE&&!p.has(String(t.cedula).trim())||l.filterSEGEN&&p.has(String(t.cedula).trim())||P&&t.fecha<P||F&&t.fecha>F||I&&t.semana!==I||R&&t.control!==R||z&&t.mun!==z||ee&&t.par!==ee||te&&t.nodo!==te||ne&&t.situacion_vivienda!==ne||re&&t.condicion!==re||ie&&t.uso!==ie||ae&&!t.alertas.includes(ae)||B!==``&&String(t.hora_trans)!==B||oe!==``&&String(t.hora)!==oe)}),se=V.filter(e=>e._meta&&e._meta.tipo_vivienda===`TIPO A`).length,ce=V.filter(e=>e._meta&&e._meta.tipo_vivienda===`TIPO B`).length,le=V.filter(e=>e._meta&&e._meta.tipo_vivienda===`TIPO C`).length,ue=Ea(V),de=(ue>0?ue:V.length)-(ce+le),fe=de>0?Math.round(se/de*100):se>0?100:0;x(`kpiTasaEfectividad`)&&(x(`kpiTasaEfectividad`).textContent=`${A}%`),x(`kpiTasaNoRespuesta`)&&(x(`kpiTasaNoRespuesta`).textContent=`${fe}%`),x(`kpiTotalAlertas`)&&(x(`kpiTotalAlertas`).textContent=k),x(`kpiTasaAlerta`)&&(x(`kpiTasaAlerta`).textContent=`${j}%`);let pe={};l.filtered.forEach(e=>{e._meta&&e._meta.hora!==null&&(pe[e._meta.hora]=(pe[e._meta.hora]||0)+1)});let me=Object.entries(pe).sort((e,t)=>t[1]-e[1])[0]||[null,0];x(`kpiPeakHour`)&&(x(`kpiPeakHour`).textContent=me[0]===null?`--`:`${me[0]}:00`);let H=x(`inputMetaDiaria`),he=n*(H&&!isNaN(Number(H.value))&&Number(H.value)>0?Number(H.value):20),ge=Math.min(100,l.filtered.length/(he||1)*100);x(`kpiMetaProgreso`)&&(x(`kpiMetaProgreso`).textContent=`${Math.round(ge)}%`),x(`kpiMetaBar`)&&(x(`kpiMetaBar`).style.width=`${ge}%`);let _e=l.filtered.length||1,ve=Math.round(e/_e*100);x(`rankKpiPctNoRespuesta`)&&(x(`rankKpiPctNoRespuesta`).textContent=`${fe}%`),x(`rankKpiNoEfectivaSub`)&&(x(`rankKpiNoEfectivaSub`).textContent=`(${f} Tipo A)`),x(`rankKpiEfectivas`)&&(x(`rankKpiEfectivas`).textContent=e),x(`rankKpiPctEfectivas`)&&(x(`rankKpiPctEfectivas`).textContent=`(${ve}%)`),x(`rankKpiAlerts`)&&(x(`rankKpiAlerts`).textContent=k)}function Oa(){let e=document.getElementById(`subtiposBreakdownContainer`);if(!e)return;let t=l.filtered.length||1,n={};l.filtered.forEach(e=>{let t=e._meta?.subtipo_vivienda||`Otro (Especifique)`;n[t]=(n[t]||0)+1}),e.innerHTML=ka.map(e=>{let i=e.subtypes.reduce((e,t)=>e+(n[t]||0),0),a=t>0?Math.round(i/t*100):0,o=e.subtypes.filter(e=>(n[e]||0)>0),s=o.length>0?o.map(e=>{let i=n[e]||0,a=t>0?Math.round(i/t*100):0,o=r[e]||r.DEFAULT,s=h[e]||``;return`
                <div class="flex items-center gap-2 mb-1.5">
                    <div class="flex-1 min-w-0">
                        <div class="flex justify-between items-center mb-0.5">
                            <span class="text-[10px] font-bold text-slate-600 dark:text-slate-300 truncate leading-tight">${s?`${s} - ${e}`:e}</span>
                            <span class="text-[10px] font-black ml-2 shrink-0" style="color:${o.color}">${i}</span>
                        </div>
                        <div class="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div class="h-full rounded-full transition-all duration-700 ease-out"
                                 style="width:${a}%;background:${o.color}"></div>
                        </div>
                    </div>
                </div>`}).join(``):`<div class="text-[10px] font-medium italic text-slate-400 dark:text-slate-500 py-1 text-center">Sin registros</div>`,c=e.tipo.slice(-1);return`
            <div class="card-premium group relative animate-slide-up ${e.borderClass}" title="${e.tooltip}">
                <div class="card-glow bg-[${e.color}]/10 group-hover:bg-[${e.color}]/20"></div>
                <div class="kpi-label !mt-0 mb-1 flex items-center gap-1.5">
                    <i data-lucide="${e.icon}" class="w-4 h-4" style="color:${e.color}"></i>
                    <span class="font-outfit font-black text-xs uppercase tracking-widest text-slate-800 dark:text-slate-200">${e.tipo}</span>
                </div>
                <div class="flex items-baseline gap-2 mb-2">
                    <div class="kpi-value-text text-xl" id="kpiTipo${c}">${i}</div>
                    <div class="text-[10px] font-bold text-slate-400 uppercase tracking-tighter" id="pctTipo${c}">${a}%</div>
                </div>
                <div class="border-t pt-3" style="border-color:${e.color}22">
                    ${s}
                </div>
            </div>`}).join(``),window.lucide&&window.lucide.createIcons({root:e})}var ka,Aa=a((()=>{m(),D(),ka=[{tipo:`TIPO A`,label:`Ausentes / Rechazos / No Respuesta`,icon:`user-round-x`,color:`#8B5CF6`,borderClass:`!border-l-2 !border-l-[#8B5CF6]`,tooltip:`Viviendas con ausencias, rechazos o informantes no calificados (AT, IN, OA, IC, PE, NO, RZ, SE).`,subtypes:[`Ausente Temporalmente`,`Incompleta`,`Ocupantes Ausentes`,`Informante No Calificado`,`Pendiente`,`No Atiende Telefono`,`Rechazada`,`Sin Entrevista`]},{tipo:`TIPO B`,label:`Desocupadas / Ocasionales / Construcción`,icon:`brick-wall`,color:`#F59E0B`,borderClass:`!border-l-2 !border-l-[#F59E0B]`,tooltip:`Viviendas en construcción, desocupadas, vacacionales, ocasionales o inadecuadas para uso (CO, IU, VD, VO, UV, TN).`,subtypes:[`Construccion`,`Inadecuada para Uso`,`Vivienda Desocupada`,`Vivienda Ocasional`,`Uso Vacasional`,`Temporalmente en Negocio`]},{tipo:`TIPO C`,label:`Inexistentes / No Residenciales / Demolidas`,icon:`hammer`,color:`#64748B`,borderClass:`!border-l-2 !border-l-[#64748B]`,tooltip:`Viviendas demolidas, mal listadas, inexistentes, negocios permanentes u otras situaciones no residenciales (DE, ML, NE, SL, OT, OS, NT, NP, OE, CD).`,subtypes:[`Demolida`,`Mal Listada`,`No Existe`,`Sin Listar`,`Otra Condicion`,`Otra Situacion`,`No Existe Nro Telefonico`,`Negocio Permanente`,`Otro (Especifique)`,`Consolidada`]},{tipo:`TIPO E`,label:`Entrevistas Efectivas`,icon:`user-check`,color:`#10B981`,borderClass:`!border-l-2 !border-l-[#10B981]`,tooltip:`Viviendas con entrevistas exitosas (Totalmente Encuestadas - TE).`,subtypes:[`Totalmente Encuestado`]}]})),ja,Ma,Na,Pa,Fa=a((()=>{ja=`modulepreload`,Ma=function(e,t){return new URL(e,t).href},Na={},Pa=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}r=o(t.map(t=>{if(t=Ma(t,n),t in Na)return;Na[t]=!0;let r=t.endsWith(`.css`),i=r?`[rel="stylesheet"]`:``;if(n)for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${t}"]${i}`))return;let o=document.createElement(`link`);if(o.rel=r?`stylesheet`:ja,r||(o.as=`script`),o.crossOrigin=``,o.href=t,a&&o.setAttribute(`nonce`,a),document.head.appendChild(o),r)return new Promise((e,n)=>{o.addEventListener(`load`,e),o.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})}}));function Ia(e){if(!e)return;let t=x(`mainTabs`);t&&t.querySelectorAll(`.tab-btn`).forEach(t=>{let n=t.dataset.tab===e;t.classList.toggle(`tab-btn-active`,n),t.classList.toggle(`active`,n)}),document.querySelectorAll(`.tab-content`).forEach(t=>{t.classList.toggle(`hidden-tab`,t.id!==e)}),e===`tab-mapa`&&(l.map||Wr(),setTimeout(()=>{l.map.invalidateSize(),setTimeout(()=>{let e=!1;La[`tab-mapa`]||(La[`tab-mapa`]=!0,Pr(),e=!0),Qr(),l.detailTable&&!e&&l.detailTable.redraw(!0),window.lucide&&window.lucide.createIcons()},200)},50)),e===`tab-ranking`&&(La[`tab-ranking`]?l.rankingTabulator&&setTimeout(()=>l.rankingTabulator.redraw(!0),50):(La[`tab-ranking`]=!0,setTimeout(()=>Ir(),100))),e===`tab-mm111`&&(l.mm111Table&&l.mm111Table.redraw(),!l.mm111Table&&l.filtered.length>0&&mi()),e===`tab-reportes`&&Pa(async()=>{let{initReportesTab:e}=await import(`./reportes-DrSnxbD3.js`);return{initReportesTab:e}},__vite__mapDeps([0,1]),import.meta.url).then(({initReportesTab:e})=>{e(),window.lucide&&window.lucide.createIcons()}).catch(e=>console.error(`[navigation] Error loading reportes module:`,e)),setTimeout(()=>{Object.values(l.charts).forEach(e=>{e&&typeof e.resize==`function`&&(e.update(`none`),e.resize())}),window.dispatchEvent(new Event(`resize`))},50),window.lucide&&window.lucide.createIcons()}var La,Ra=a((()=>{m(),D(),ei(),Rr(),gi(),Ai(),Fa(),La={}}));function za(e){let t=x(`mapSectionWrapper`),n=x(`mapKpiGrid`),r=x(`mapDisplayContainer`),i=n?n.querySelector(`.header-label`):null;if(!t||!n||!r)return;document.body.classList.remove(`has-map-fullscreen`),t.className=`flex flex-col lg:grid lg:grid-cols-12 gap-4 sm:gap-8 transition-all duration-500 overflow-visible items-stretch`,r.className=`lg:col-span-10 relative transition-all duration-500 rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-slate-900`,n.className=`lg:col-span-2 transition-all duration-500 overflow-visible flex flex-col gap-3`,i&&(i.className=`header-label text-[9px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-widest ml-1 mb-1`);let a=x(`btnToggleMapKpis`);if(a&&a.classList.add(`hidden`),n.querySelectorAll(`button:not(#btnToggleMapKpis), div.glass-panel`).forEach(e=>{e.className=e.id===`btnVerRutaEncuestador`?`glass-panel rounded-xl p-3 flex items-center justify-between !border-l-4 !border-orange-500 hover:bg-orange-500/5 transition-all group disabled:opacity-40 disabled:cursor-not-allowed`:`glass-panel rounded-xl p-3 flex items-center justify-between !border-l-4 hover:bg-slate-100/50 dark:hover:bg-white/5 transition-all group`,e.id===`btnMapFilterAll`&&e.classList.add(`!border-brand-blue`),e.id===`btnMapFilterEfectivas`&&e.classList.add(`!border-brand-emerald`),e.id===`btnMapFilterNoEfectiva`&&e.classList.add(`!border-brand-orange`),e.id===`btnMapFilterAlertas`&&e.classList.add(`!border-brand-red`),(e.classList.contains(`opacity-80`)||e.id===`kpiMapEncuestadorContainer`)&&e.classList.add(`border-brand-purple`);let t=e.querySelector(`span.uppercase`);t&&t.classList.remove(`hidden`)}),e===`normal`)t.classList.add(`h-auto`,`lg:h-[88vh]`,`lg:min-h-[700px]`),r.classList.add(`h-[500px]`,`lg:h-auto`,`lg:col-span-10`),n.classList.add(`grid`,`grid-cols-2`,`sm:flex`,`sm:flex-col`,`gap-2`),i&&i.classList.add(`hidden`,`sm:block`),n.querySelectorAll(`:scope > button, :scope > div.glass-panel`).forEach(e=>{e.id!==`btnToggleMapKpis`&&e.classList.add(`flex-row`,`items-center`,`justify-between`)});else if(e===`expanded`)t.className=`flex flex-col items-center gap-6 transition-all duration-500 w-full mb-8`,r.className=`w-full h-[75vh] relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10`,n.className=`flex flex-wrap sm:flex-nowrap grid grid-cols-2 sm:flex flex-row gap-2 sm:gap-8 mt-4 sm:mt-6 mx-auto max-w-[95%] sm:max-w-fit bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-white/10 px-4 sm:px-10 py-1.5 sm:py-2 shadow-2xl`,i&&i.classList.add(`hidden`),n.querySelectorAll(`:scope > button, :scope > div.glass-panel`).forEach(e=>{e.id!==`btnToggleMapKpis`&&e.classList.add(`flex-col`,`items-center`,`justify-center`,`min-w-0`,`sm:min-w-[130px]`,`flex-1`,`!border-l-0`,`!border-b-2`,`sm:!border-b-4`,`gap-0.5`,`py-1`,`sm:py-1.5`,`px-2`)});else if(e===`full`){r.className=`map-fullscreen fixed inset-0 z-[var(--z-map-full)] bg-slate-900`,document.body.classList.add(`has-map-fullscreen`),n.className=`flex flex-col-reverse sm:flex-row fixed bottom-40 sm:bottom-6 left-4 sm:left-1/2 sm:-translate-x-1/2 z-[var(--z-map-full-controls)] gap-2 transition-all duration-300 items-start sm:items-center w-auto sm:max-w-fit`;let e=x(`btnToggleMapKpis`);e&&e.classList.remove(`hidden`),i&&i.classList.add(`hidden`),n.querySelectorAll(`:scope > button, :scope > div.glass-panel`).forEach(e=>{if(e.id===`btnToggleMapKpis`)return;e.classList.add(`flex`,`flex-col`,`items-center`,`justify-center`,`min-w-[55px]`,`sm:min-w-[75px]`,`!border-2`,`rounded-xl`,`shadow-lg`,`gap-0`,`p-2`);let t=e.querySelector(`span.uppercase`);t&&t.classList.add(`hidden`),e.classList.add(`kpi-drawer-item`)}),n.classList.add(`kpi-drawer-collapsed`)}[`Normal`,`Expanded`,`Full`].forEach(t=>{let n=x(`btnMapState${t}`);if(n){let r=e===t.toLowerCase();n.classList.toggle(`bg-white/30`,r)}}),window.lucide&&window.lucide.createIcons(),setTimeout(()=>{l.map&&l.map.invalidateSize()},600)}var Ba=a((()=>{m(),D()}));function Va(e){let{onProcessData:t}=e,n=()=>{Tn(),[`filterINE`,`filterSEGEN`].forEach(e=>{x(e)&&x(e).classList.remove(`active`,`bg-brand-emerald`,`bg-brand-purple`,`text-white`,`border-brand-emerald`,`border-brand-purple`)}),l.filterINE=!1,l.filterSEGEN=!1};x(`btnReset`)&&(x(`btnReset`).onclick=n),x(`btnResetOffcanvas`)&&(x(`btnResetOffcanvas`).onclick=n),x(`btnRefresh`)&&x(`btnRefresh`).addEventListener(`click`,()=>{let e=x(`assetSelect`).value;e&&re(e,t,!0)}),x(`btnRetryConnection`)&&x(`btnRetryConnection`).addEventListener(`click`,()=>ne(t)),x(`assetSelect`)&&x(`assetSelect`).addEventListener(`change`,e=>re(e.target.value,t)),x(`searchEncuesta`)&&x(`searchEncuesta`).addEventListener(`input`,()=>Y()),x(`btnOpenFilters`)&&(x(`btnOpenFilters`).onclick=_n),x(`btnCloseFilters`)&&x(`btnCloseFilters`).addEventListener(`click`,vn),x(`filtersOverlay`)&&x(`filtersOverlay`).addEventListener(`click`,vn),x(`btnApplyFilters`)&&x(`btnApplyFilters`).addEventListener(`click`,()=>{vn(),Y()});let r=(e,t,n,r,i)=>{let a=x(e);a&&(a.onclick=()=>{l[t]=!l[t],l[t]&&(l[i]=!1),a.classList.toggle(`active`,l[t]),a.classList.toggle(n,l[t]),a.classList.toggle(`text-white`,l[t]),a.classList.toggle(`border-${n.split(`-`)[1]}-${n.split(`-`)[2]}`,l[t]);let e=x(r);e&&e.classList.remove(`active`,`bg-brand-emerald`,`bg-brand-purple`,`text-white`,`border-brand-emerald`,`border-brand-purple`),Y()})};r(`filterINE`,`filterINE`,`bg-brand-emerald`,`filterSEGEN`,`filterSEGEN`),r(`filterSEGEN`,`filterSEGEN`,`bg-brand-purple`,`filterINE`,`filterINE`),[`filterEncuestador`,`filterMunicipio`,`filterSemana`,`filterFechaInicio`,`filterFechaFin`,`filterHoraTransmision`,`filterHoraInicio`,`filterTasaNoRespuesta`].forEach(e=>{x(e)&&x(e).addEventListener(`change`,Y)}),x(`presetAlertas`)&&x(`presetAlertas`).addEventListener(`click`,()=>{l.quickFilterMode=`alertas`,Y()}),x(`presetNoRespuesta`)&&x(`presetNoRespuesta`).addEventListener(`click`,()=>{let e=x(`filterClasificacion`);e&&(e.value=e.value===`TIPO A`?``:`TIPO A`,e.dispatchEvent(new Event(`change`))),Y()}),x(`presetNoEfectivas`)&&x(`presetNoEfectivas`).addEventListener(`click`,()=>{let e=x(`filterEstado`);e&&(e.value=e.value===`no_efectiva`?``:`no_efectiva`,e.dispatchEvent(new Event(`change`))),Y()}),Object.entries({All:`all`,Efectivas:`efectivas`,NoEfectiva:`no_efectiva`,Alertas:`alertas`}).forEach(([e,t])=>{let n=x(`btnMapFilter${e}`);n&&n.addEventListener(`click`,()=>{typeof window.setQuickFilter==`function`&&window.setQuickFilter(t)})});let i=x(`inputMetaDiaria`);if(i){try{let e=localStorage.getItem(`esca_meta_diaria`);e&&!isNaN(Number(e))&&(i.value=e)}catch{}i.addEventListener(`input`,()=>{try{localStorage.setItem(`esca_meta_diaria`,i.value)}catch{}Da()})}x(`btnMapStateNormal`)&&x(`btnMapStateNormal`).addEventListener(`click`,()=>za(`normal`)),x(`btnMapStateExpanded`)&&x(`btnMapStateExpanded`).addEventListener(`click`,()=>za(`expanded`)),x(`btnMapStateFull`)&&x(`btnMapStateFull`).addEventListener(`click`,()=>za(`full`)),x(`btnToggleMapKpis`)&&x(`btnToggleMapKpis`).addEventListener(`click`,()=>{let e=x(`mapKpiGrid`);if(e){let t=e.classList.contains(`kpi-drawer-collapsed`);e.classList.toggle(`kpi-drawer-collapsed`,!t),e.classList.toggle(`kpi-drawer-expanded`,t)}}),document.querySelectorAll(`.tab-btn`).forEach(e=>{e.addEventListener(`click`,t=>{t.preventDefault(),Ia(e.dataset.tab)})}),document.querySelectorAll(`.sort-btn`).forEach(t=>{t.addEventListener(`click`,()=>{l.currentSort=t.dataset.sort,document.querySelectorAll(`.sort-btn`).forEach(e=>e.classList.remove(`active`)),t.classList.add(`active`);let{renderRankingTable:n}=e;n&&n()})}),x(`btnDetailExpand`)&&x(`btnDetailExpand`).addEventListener(`click`,()=>{typeof window.toggleDetailModalExpand==`function`&&window.toggleDetailModalExpand()}),x(`btnDetailClose`)&&x(`btnDetailClose`).addEventListener(`click`,()=>{let{closeDetailModal:t}=e;t&&t()}),x(`detailModalBackdrop`)&&x(`detailModalBackdrop`).addEventListener(`click`,()=>{let{closeDetailModal:t}=e;t&&t()}),x(`btnDetailPrev`)&&x(`btnDetailPrev`).addEventListener(`click`,()=>{let{navigateDetailModal:t}=e;t&&t(-1)}),x(`btnDetailNext`)&&x(`btnDetailNext`).addEventListener(`click`,()=>{let{navigateDetailModal:t}=e;t&&t(1)}),document.addEventListener(`keydown`,t=>{let n=x(`detailModal`);if(n&&!n.classList.contains(`hidden`)){if(t.key===`Escape`){let{closeDetailModal:t}=e;t&&t()}else if(t.key===`ArrowLeft`){let{navigateDetailModal:t}=e;t&&t(-1)}else if(t.key===`ArrowRight`){let{navigateDetailModal:t}=e;t&&t(1)}}})}var Ha=a((()=>{m(),D(),ae(),Yn(),Ba(),Ra(),Aa(),gn()}));o((()=>{m(),D(),ae(),fn(),Yn(),Rr(),ei(),Cr(),gi(),Ai(),Xi(),Sa(),Ta(),Aa(),Ra(),Ba(),Ha(),console.log(`main/index.js: Modular orchestrator initializing ✓`);function e(){console.log(`main/index.js: renderAll() starting`);try{Da()}catch(e){console.error(`KPI Update Error:`,e)}try{Oa()}catch(e){console.warn(`Subtipos Breakdown Error:`,e)}[Pi,Fi,Ii,Li,qi,Hi,Ui,Wi,Ki,Ji].forEach(e=>{try{e()}catch(t){console.warn(`Chart Renderer Error (${e.name}):`,t)}});try{Qr()}catch(e){console.error(`Map Render Error:`,e)}try{Pr()}catch(e){console.error(`Grid Update Error:`,e)}try{Ir()}catch(e){console.error(`Ranking Table Error:`,e)}try{mi()}catch(e){console.error(`MM111 Error:`,e)}try{Ei()}catch(e){console.error(`Inconsistencias Error:`,e)}window.lucide&&lucide.createIcons()}wn(e);var t=async()=>{await dn(),Sn(),l.filtered=[...l.rawData],e()};async function n(){ba(),Ca(),console.log(`main/index.js: init() start`),r(),za(`normal`),Va({onProcessData:t,renderRankingTable:Ir,closeDetailModal:br,navigateDetailModal:vr}),Hn(),i(),Promise.allSettled([zr(),ie(),Vr().then(()=>{l.rawData.length>0&&(console.log(`main/index.js: Refreshing data with catalog index…`),t())}),ne(e=>re(e,t))]).then(()=>{console.log(`main/index.js: Bootstrap phase completed.`),window.lucide&&lucide.createIcons()})}function r(){let e=x(`currentDateDisplay`);e&&(e.textContent=new Date().toLocaleDateString(`es-ES`,{weekday:`long`,year:`numeric`,month:`long`,day:`numeric`}))}function i(){let e=[];typeof Tabulator>`u`&&e.push(`Tabulator`),typeof Chart>`u`&&e.push(`Chart.js`),typeof L>`u`&&e.push(`Leaflet`);let t=x(`libCheckWarn`);e.length>0?(console.error(`CRITICAL: Missing libraries:`,e.join(`, `)),t&&t.classList.remove(`hidden`)):t&&t.classList.add(`hidden`)}document.addEventListener(`DOMContentLoaded`,()=>{n(),Xr()}),window.setMapStateForDebug=za,window.switchTabForDebug=Ia}))();