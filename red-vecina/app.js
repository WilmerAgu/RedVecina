(function(){
"use strict";

/* ---------- Almacenamiento seguro ---------- */
const store = {
  get(k, d){ try{ const v = localStorage.getItem("rv-"+k); return v ? JSON.parse(v) : d; }catch(e){ return d; } },
  set(k, v){ try{ localStorage.setItem("rv-"+k, JSON.stringify(v)); }catch(e){} }
};

/* ---------- Íconos ---------- */
const ICON = {
  plomeria:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2s-6 7-6 12a6 6 0 0 0 12 0c0-5-6-12-6-12z"/></svg>',
  electricidad:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 4 14h6l-1 8 9-12h-6z"/></svg>',
  electrodomesticos:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 7h10V4H7zm2-3.5h1.5V8H9zm0 6.5h1.5v4H9z"/></svg>',
  otros:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.7 6.3a5 5 0 0 1-6.6 6.2L7.4 20.2a2.1 2.1 0 1 1-3-3l7.7-7.7a5 5 0 0 1 6.2-6.6L15 6.2 17.8 9z"/></svg>',
  corazon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>',
  maletin:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 3h6a2 2 0 0 1 2 2v2h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3V5a2 2 0 0 1 2-2zm0 4h6V5H9z"/></svg>',
  ubicacion:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7zm0 4.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z"/></svg>'
};
const CATS = [
  {k:"plomeria", label:"Plomería", oficio:"Plomería"},
  {k:"electricidad", label:"Electricidad", oficio:"Electricidad"},
  {k:"electrodomesticos", label:"Electrodomésticos", oficio:"Electrodomésticos"},
  {k:"otros", label:"Otros servicios", oficio:"Otros oficios"}
];
const catLabel = k => (CATS.find(c=>c.k===k)||CATS[3]).label;

/* ---------- Datos de ejemplo ---------- */
const BASE = [
  {id:"carlos", nombre:"Carlos Rodríguez", cat:"plomeria", titulo:"Plomero", rating:4.9, n:28, dist:800, ang:-30, anos:5, sector:"Sector de demostración", tel:"300 000 0001", color:"#2F5D3A",
   sobre:"Soy Carlos, plomero con 5 años de experiencia en reparación de tuberías, grifos, fugas y sanitarios. Trabajo con responsabilidad y puntualidad.",
   trabajos:["Reparación de tuberías","Instalación de grifos","Arreglo de fugas","Mantenimiento de sanitarios"],
   galeria:["Tubería de cocina, antes","Tubería de cocina, después","Cambio de grifo"],
   res:[{a:"Ana Pérez",t:"Excelente servicio, muy puntual y responsable.",c:5,h:"Hace 3 semanas"},{a:"Luis Ramírez",t:"Arregló la fuga en menos de una hora. Muy recomendado.",c:5,h:"Hace 1 mes"},{a:"Marta Gómez",t:"Trabajo de calidad y buen trato.",c:5,h:"Hace 1 mes"}]},
  {id:"andres", nombre:"Andrés Gómez", cat:"electricidad", titulo:"Electricista", rating:4.8, n:19, dist:1200, ang:40, anos:8, sector:"Sector de demostración", tel:"300 000 0002", color:"#3E6E8E",
   sobre:"Electricista residencial. Organizo tableros, cambio tomas e instalo lámparas. Reviso todo antes de irme.",
   trabajos:["Organización de tableros","Cambio de tomas e interruptores","Instalación de lámparas","Revisión de cortos"],
   galeria:["Tablero eléctrico, antes","Tablero eléctrico, después","Instalación de lámpara"],
   res:[{a:"Paula Restrepo",t:"Dejó el tablero organizado y explicó todo.",c:5,h:"Hace 2 semanas"},{a:"Jorge Mesa",t:"Llegó rápido un domingo, buen precio.",c:4,h:"Hace 2 meses"}]},
  {id:"maria", nombre:"María Fernanda López", cat:"electrodomesticos", titulo:"Técnica en electrodomésticos", rating:5.0, n:14, dist:1500, ang:150, anos:6, sector:"Sector de demostración", tel:"300 000 0003", color:"#8E5A3E",
   sobre:"Reparo neveras, lavadoras y estufas. Diagnóstico honesto: si no vale la pena arreglarlo, te lo digo.",
   trabajos:["Reparación de neveras","Mantenimiento de lavadoras","Revisión de estufas"],
   galeria:["Nevera sin enfriar, antes","Nevera reparada","Lavadora en mantenimiento"],
   res:[{a:"Sofía Arango",t:"Me salvó la nevera y no me cobró de más.",c:5,h:"Hace 1 semana"},{a:"Camilo Ruiz",t:"Muy honesta con el diagnóstico.",c:5,h:"Hace 3 meses"}]},
  {id:"julian", nombre:"Julián Torres", cat:"plomeria", titulo:"Plomero", rating:4.7, n:11, dist:2000, ang:200, anos:3, sector:"Sector de demostración", tel:"300 000 0004", color:"#4E7A3F",
   sobre:"Plomero joven y cumplido. Destapo cañerías y cambio sanitarios.",
   trabajos:["Destape de cañerías","Cambio de sanitarios","Instalación de calentadores"],
   galeria:["Cañería tapada, antes","Cañería despejada","Sanitario nuevo"],
   res:[{a:"Diana Castro",t:"Resolvió rápido y dejó todo limpio.",c:5,h:"Hace 1 mes"}]},
  {id:"luis", nombre:"Luis Herrera", cat:"plomeria", titulo:"Plomero", rating:4.6, n:9, dist:2300, ang:100, anos:10, sector:"Sector de demostración", tel:"300 000 0005", color:"#5B5B8E",
   sobre:"Diez años arreglando tuberías en el barrio. Trabajos grandes y pequeños.",
   trabajos:["Cambio de tubería galvanizada","Reparación de fugas","Instalación de tanques"],
   galeria:["Tubería vieja","Tubería nueva en PVC","Tanque instalado"],
   res:[{a:"Hernán Vélez",t:"Sabe mucho, aunque se demoró un poco en llegar.",c:4,h:"Hace 2 meses"}]},
  {id:"diana", nombre:"Diana Ospina", cat:"electricidad", titulo:"Electricista", rating:4.9, n:22, dist:1700, ang:-110, anos:7, sector:"Sector de demostración", tel:"300 000 0006", color:"#7A3E6E",
   sobre:"Instalaciones eléctricas seguras para casas y locales. Trabajo con materiales certificados.",
   trabajos:["Cableado de casas","Instalación de duchas eléctricas","Iluminación de locales"],
   galeria:["Cableado expuesto, antes","Cableado canalizado","Ducha instalada"],
   res:[{a:"Mónica Gil",t:"Muy profesional y ordenada.",c:5,h:"Hace 3 semanas"}]},
  {id:"oscar", nombre:"Óscar Cardona", cat:"otros", titulo:"Carpintero y pintor", rating:4.5, n:7, dist:900, ang:250, anos:12, sector:"Sector de demostración", tel:"300 000 0007", color:"#8E7A3E",
   sobre:"Arreglo puertas, closets y muebles. También pinto casas y apartamentos.",
   trabajos:["Ajuste de puertas","Reparación de closets","Pintura de interiores"],
   galeria:["Puerta descuadrada","Puerta ajustada","Sala pintada"],
   res:[{a:"Andrea Lopera",t:"Dejó la puerta como nueva.",c:5,h:"Hace 1 mes"}]},
  {id:"natalia", nombre:"Natalia Ríos", cat:"electrodomesticos", titulo:"Técnica en electrodomésticos", rating:4.7, n:12, dist:2800, ang:310, anos:4, sector:"Sector de demostración", tel:"300 000 0008", color:"#3E8E7A",
   sobre:"Reparación de licuadoras, hornos microondas y televisores.",
   trabajos:["Reparación de microondas","Arreglo de televisores","Mantenimiento de licuadoras"],
   galeria:["Microondas sin encender","Microondas reparado","Televisor revisado"],
   res:[{a:"Felipe Zapata",t:"Buen servicio y garantía.",c:5,h:"Hace 2 semanas"}]}
];

let extras = store.get("trabajadores", []);
let resenasUsuario = store.get("resenas", {});
let favoritos = new Set(store.get("favoritos", []));
let contratados = new Set(store.get("contratados", []));
let usuario = store.get("usuario", null);

const todos = () => BASE.concat(extras);
const buscarT = id => todos().find(t => t.id === id);

function ratingDe(t){
  const extra = resenasUsuario[t.id] || [];
  const n = t.n + extra.length;
  if(n === 0) return {r:0, n:0};
  const suma = t.rating * t.n + extra.reduce((s,x)=>s+x.c,0);
  return {r: suma/n, n};
}
const fmtR = r => r.toFixed(1).replace(".", ",");
const fmtD = m => m < 1000 ? `A ${Math.round(m/100)*100} m` : `A ${(m/1000).toFixed(1).replace(".0","").replace(".",",")} km`;
const iniciales = n => n.split(" ").filter(Boolean).slice(0,2).map(p=>p[0]).join("").toUpperCase();
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

function avatarSVG(t, alto){
  return `<svg viewBox="0 0 200 ${alto}" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style="display:block">
    <rect width="200" height="${alto}" fill="${t.color}"/>
    <rect width="200" height="${alto}" fill="#fff" opacity=".08"/>
    <circle cx="100" cy="${alto*0.42}" r="${alto*0.2}" fill="#fff" opacity=".9"/>
    <path d="M${100-alto*0.38} ${alto} q0 -${alto*0.36} ${alto*0.38} -${alto*0.36} q${alto*0.38} 0 ${alto*0.38} ${alto*0.36}z" fill="#fff" opacity=".9"/>
    <text x="100" y="${alto*0.42+alto*0.065}" text-anchor="middle" font-family="Poppins,sans-serif" font-weight="600" font-size="${alto*0.17}" fill="${t.color}">${iniciales(t.nombre)}</text>
  </svg>`;
}

function chipDe(t){ return t.nuevo ? '<span class="chip nuevo">Nuevo</span>' : (t.dist <= 2500 ? '<span class="chip">Cercano</span>' : ""); }

function botonFav(t, cls){
  const on = favoritos.has(t.id);
  return `<button class="fav ${cls||""}" type="button" data-fav="${t.id}" aria-pressed="${on}" aria-label="${on?"Quitar de":"Guardar en"} favoritos a ${esc(t.nombre)}">${ICON.corazon}</button>`;
}

function tarjeta(t){
  const {r,n} = ratingDe(t);
  return `<article class="tarjeta" data-abrir="${t.id}" tabindex="0" aria-label="Ver perfil de ${esc(t.nombre)}">
    <div class="foto">${avatarSVG(t,150)}${chipDe(t)}${botonFav(t)}</div>
    <div class="cuerpo"><h3>${esc(t.nombre)}</h3><div class="oficio">${catLabel(t.cat)}</div>
    <div class="meta"><span><span class="estrella">★</span> ${n?fmtR(r):"Sin calificar"} ${n?`(${n} opiniones)`:""}</span><span>${t.nuevo?"En tu sector":fmtD(t.dist)}</span></div></div>
  </article>`;
}

/* ---------- Toast ---------- */
let toastT;
function toast(msg){
  const el = document.getElementById("toast");
  el.textContent = msg; el.classList.add("ver");
  clearTimeout(toastT); toastT = setTimeout(()=>el.classList.remove("ver"), 2800);
}

/* ---------- Encabezado / cuenta ---------- */
function pintarCuenta(){
  const z = document.getElementById("zonaCuenta");
  if(usuario){
    z.innerHTML = `<button class="avatar-top" id="btnCuenta" title="${esc(usuario.nombre)}" aria-label="Tu cuenta: ${esc(usuario.nombre)}">${iniciales(usuario.nombre)}</button>`;
    document.getElementById("btnCuenta").onclick = () => {
      if(usuario.rol === "trabajador" && usuario.tid) location.hash = "perfil-" + usuario.tid;
      else if(confirm(`Hola, ${usuario.nombre.split(" ")[0]}. ¿Quieres cerrar sesión en este prototipo?`)){ usuario = null; store.set("usuario", null); pintarCuenta(); toast("Cerraste sesión"); }
    };
  } else {
    z.innerHTML = `<a href="#registro" class="btn btn-texto ocultar-movil">Iniciar sesión</a><a href="#registro" class="btn btn-primario">Registrarse</a>`;
  }
}

/* ---------- Inicio ---------- */
function pintarInicio(){
  document.getElementById("catsHero").innerHTML = CATS.map(c =>
    `<button type="button" class="cat" data-cat="${c.k}">${ICON[c.k]}${c.label}</button>`).join("");
  const dest = todos().slice().sort((a,b)=>ratingDe(b).r - ratingDe(a).r).slice(0,4);
  document.getElementById("destacados").innerHTML = dest.map(tarjeta).join("");
}

/* ---------- Búsqueda ---------- */
const estado = { q:"", sector:"", cats:new Set(), dist:99999, rating:0, orden:"dist" };
const norm = s => s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();

function pintarFiltros(){
  document.getElementById("filtroCats").innerHTML = CATS.map(c =>
    `<label class="check"><input type="checkbox" value="${c.k}" ${estado.cats.has(c.k)?"checked":""}> ${c.label}</label>`).join("");
  document.getElementById("filtroDist").value = String(estado.dist);
  document.getElementById("filtroRating").value = String(estado.rating);
  document.getElementById("orden").value = estado.orden;
  document.getElementById("resQ").value = estado.q;
  document.getElementById("resS").value = estado.sector;
}

function filtrar(){
  const q = norm(estado.q.trim());
  let lista = todos().filter(t => {
    if(estado.cats.size && !estado.cats.has(t.cat)) return false;
    if((t.nuevo ? 0 : t.dist) > estado.dist) return false;
    if(ratingDe(t).r < estado.rating) return false;
    if(q){
      const txt = norm([t.nombre, t.titulo, catLabel(t.cat), t.sobre, t.trabajos.join(" ")].join(" "));
      const palabras = q.split(/\s+/);
      if(!palabras.every(p => txt.includes(p) || txt.includes(p.replace(/o$/,"")) )) return false;
    }
    return true;
  });
  lista.sort(estado.orden === "rating" ? (a,b)=>ratingDe(b).r-ratingDe(a).r : (a,b)=>(a.nuevo?0:a.dist)-(b.nuevo?0:b.dist));
  return lista;
}

function pintarResultados(){
  const lista = filtrar();
  const donde = estado.sector.trim() ? ` cerca de ${esc(estado.sector.trim())}` : " cerca de ti";
  document.getElementById("resumenRes").innerHTML = lista.length
    ? `Encontramos ${lista.length} ${lista.length===1?"trabajador":"trabajadores"}${donde}.`
    : `No encontramos trabajadores con esos filtros${donde}.`;
  const cont = document.getElementById("listaRes");
  cont.innerHTML = lista.length ? lista.map(t => {
    const {r,n} = ratingDe(t);
    return `<div class="fila" data-fila="${t.id}">
      <div style="width:100%;aspect-ratio:1;border-radius:10px;overflow:hidden">${avatarSVG(t,200)}</div>
      <div><h3>${esc(t.nombre)}</h3><div class="oficio">${catLabel(t.cat)}</div>
        <div class="meta"><span><span class="estrella">★</span> ${n?fmtR(r):"Sin calificar"} ${n?`(${n} opiniones)`:""}</span><span>${t.nuevo?"En tu sector":fmtD(t.dist)}</span><span>${t.anos} años de experiencia</span></div></div>
      <div class="lado"><div class="fila-top">${chipDe(t)}${botonFav(t)}</div><a class="btn btn-primario" href="#perfil-${t.id}">Ver perfil</a></div>
    </div>`;
  }).join("") : `<div class="vacio"><strong>Prueba con menos filtros.</strong><br>Quita la distancia o la calificación mínima, o busca otra categoría.<br><button class="btn btn-secundario" style="margin-top:14px" type="button" id="limpiar2">Limpiar filtros</button></div>`;
  const l2 = document.getElementById("limpiar2"); if(l2) l2.onclick = limpiarFiltros;
  pintarMapa(lista);
}

function pintarMapa(lista){
  const svg = document.getElementById("mapa");
  const cx = 400, cy = 150, esc_ = 0.085;
  let calles = "";
  for(let x=-40; x<840; x+=70) calles += `<line x1="${x}" y1="0" x2="${x+60}" y2="300" stroke="var(--borde)" stroke-width="6"/>`;
  for(let y=20; y<300; y+=55) calles += `<line x1="0" y1="${y}" x2="800" y2="${y-30}" stroke="var(--borde)" stroke-width="6"/>`;
  const pins = lista.map(t => {
    const d = t.nuevo ? 300 : t.dist;
    const a = (t.ang||0) * Math.PI/180;
    const x = Math.max(24, Math.min(776, cx + Math.cos(a)*d*esc_*2.2));
    const y = Math.max(24, Math.min(276, cy + Math.sin(a)*d*esc_));
    return `<g class="pin" data-pin="${t.id}" tabindex="0" role="button" aria-label="${esc(t.nombre)}, ${catLabel(t.cat)}, ${t.nuevo?"en tu sector":fmtD(t.dist).toLowerCase()}">
      <title>${esc(t.nombre)} · ${catLabel(t.cat)}</title>
      <path d="M${x} ${y+2} l-9 -14 a11 11 0 1 1 18 0z" fill="#2F5D3A"/><circle cx="${x}" cy="${y-17}" r="4.5" fill="#fff"/></g>`;
  }).join("");
  svg.innerHTML = `<rect width="800" height="300" fill="var(--surface-2)"/>
    <path d="M0 230 Q200 190 400 240 T800 210" stroke="#9DC6E0" stroke-opacity=".6" stroke-width="14" fill="none"/>
    <rect x="560" y="40" width="120" height="70" rx="10" fill="#B9DDAF" opacity=".45"/>
    <rect x="90" y="70" width="90" height="60" rx="10" fill="#B9DDAF" opacity=".45"/>
    ${calles}
    <circle cx="${cx}" cy="${cy}" r="60" fill="#5E9B5A" opacity=".12"/>
    <circle cx="${cx}" cy="${cy}" r="9" fill="#3B7BD6" stroke="#fff" stroke-width="3"/>
    ${pins}`;
}

function enfocar(id){
  document.querySelectorAll(".fila.foco,.pin.foco").forEach(e=>e.classList.remove("foco"));
  const f = document.querySelector(`[data-fila="${id}"]`); const p = document.querySelector(`[data-pin="${id}"]`);
  if(f){ f.classList.add("foco"); f.scrollIntoView({behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto":"smooth", block:"center"}); }
  if(p) p.classList.add("foco");
}

function limpiarFiltros(){
  estado.q=""; estado.sector=""; estado.cats.clear(); estado.dist=99999; estado.rating=0; estado.orden="dist";
  pintarFiltros(); pintarResultados();
}

/* ---------- Perfil ---------- */
function pintarPerfil(id){
  const t = buscarT(id);
  const cont = document.getElementById("perfilCont");
  if(!t){ cont.innerHTML = `<div class="vacio" style="margin-bottom:48px"><strong>Este perfil ya no está disponible.</strong><br><a href="#buscar">Busca otros trabajadores cerca de ti</a></div>`; return; }
  const {r,n} = ratingDe(t);
  const todasRes = (resenasUsuario[t.id]||[]).map(x=>({...x, verificada:true})).reverse().concat(t.res.map(x=>({...x, verificada:true})));
  const estrellas = n ? "★".repeat(Math.round(r)) + "☆".repeat(5-Math.round(r)) : "☆☆☆☆☆";
  cont.innerHTML = `<div class="perfil-grid">
    <div>
      <div class="panel">
        <div class="perfil-cab">
          <div class="avatar-xl">${avatarSVG(t,200)}</div>
          <div>
            <h1>${esc(t.nombre)} ${chipDe(t)}</h1>
            <div class="oficio">${esc(t.titulo)}</div>
            <div class="meta"><span><span class="estrella">★</span> ${n?fmtR(r):"Sin calificar"} ${n?`(${n} opiniones)`:""}</span><span>${t.nuevo?"En tu sector":fmtD(t.dist)}</span></div>
            <div class="modal-acciones">
              <button class="btn btn-primario" type="button" id="btnContactar">Contactar</button>
              <button class="btn btn-borde" type="button" id="btnFavPerfil" aria-pressed="${favoritos.has(t.id)}">${favoritos.has(t.id)?"Guardado en favoritos":"Guardar en favoritos"}</button>
            </div>
          </div>
        </div>
      </div>
      <div class="panel"><h2>Sobre mí</h2><p style="margin:0;color:var(--texto-2);font-size:.9rem">${esc(t.sobre||"Este trabajador aún no ha escrito su presentación.")}</p></div>
      <div class="panel"><h2>Trabajos que realizo</h2><ul class="trabajos">${(t.trabajos.length?t.trabajos:["Aún no ha agregado trabajos"]).map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>
      <div class="panel"><h2>Galería de trabajos</h2>
        ${t.galeria.length ? `<div class="galeria">${t.galeria.map((g,i)=>`<figure>${fotoTrabajo(t,i)}<figcaption>${esc(g)}</figcaption></figure>`).join("")}</div>` : `<p style="margin:0;color:var(--texto-2);font-size:.88rem">Todavía no hay fotos. Las fotos de antes y después funcionan como una hoja de vida práctica.</p>`}
      </div>
    </div>
    <div>
      <div class="panel datos">
        <div class="dato">${ICON.maletin}<div>Experiencia<small>${t.anos} ${t.anos==1?"año":"años"}</small></div></div>
        <div class="dato">${ICON.ubicacion}<div>Ubicación<small>${esc(t.sector)} · distancia aproximada</small></div></div>
        <div class="dato">${ICON[t.cat]}<div>Especialidad<small>${catLabel(t.cat)}</small></div></div>
      </div>
      <div class="panel">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:6px">
          <h2 style="margin:0">Opiniones de otros vecinos</h2>
          <button class="btn btn-secundario" type="button" id="btnCalificar" style="padding:7px 12px;font-size:.8rem">Calificar</button>
        </div>
        <div style="font-size:.9rem;margin-bottom:6px"><span class="estrella">${estrellas}</span> <strong>${n?fmtR(r):"—"}</strong> <span style="color:var(--texto-2)">${n?`(${n} opiniones)`:"Aún sin opiniones"}</span></div>
        ${todasRes.map(x=>`<div class="resena"><div class="ini">${iniciales(x.a)}</div><div><strong style="font-size:.86rem">${esc(x.a)}</strong> <span class="estrella" style="font-size:.8rem">${"★".repeat(x.c)}</span><p>${esc(x.t)}</p><small>${esc(x.h)}</small> · <span class="verificada">Contrató por Red Vecina</span></div></div>`).join("") || `<p style="color:var(--texto-2);font-size:.86rem">Sé el primer vecino en calificar después de contratar.</p>`}
      </div>
    </div>
  </div>`;
  document.getElementById("btnContactar").onclick = () => abrirContacto(t);
  document.getElementById("btnCalificar").onclick = () => abrirCalificar(t);
  document.getElementById("btnFavPerfil").onclick = () => { alternarFav(t.id); pintarPerfil(t.id); };
}

function fotoTrabajo(t, i){
  const tonos = ["#C9B79C","#A8C6A0","#B5C4D6"];
  return `<svg viewBox="0 0 160 110" width="100%" style="display:block" aria-hidden="true">
    <rect width="160" height="110" fill="${tonos[i%3]}"/>
    <g transform="translate(62 30) scale(1.5)" fill="${t.color}" opacity=".85">${ICON[t.cat].replace(/<\/?svg[^>]*>/g,"")}</g>
    ${i<2?`<rect x="8" y="8" width="${i===0?46:62}" height="20" rx="10" fill="#fff" opacity=".9"/><text x="${i===0?31:39}" y="22" text-anchor="middle" font-family="Poppins,sans-serif" font-size="10" font-weight="600" fill="#1F2F4A">${i===0?"Antes":"Después"}</text>`:""}
  </svg>`;
}

/* ---------- Contacto y calificación ---------- */
function abrirContacto(t){
  const d = document.getElementById("dlgContacto");
  const ya = contratados.has(t.id);
  document.getElementById("dlgContactoCuerpo").innerHTML = `
    <h2>Contactar a ${esc(t.nombre.split(" ")[0])}</h2>
    <p>Llámalo o escríbele para acordar la visita. Después de que haga el trabajo, márcalo como contratado para poder calificarlo.</p>
    <div class="tel">${t.tel}</div>
    <p style="font-size:.75rem;margin:0">Número de ejemplo para el prototipo.</p>
    <div class="modal-acciones">
      <a class="btn btn-primario" href="tel:${t.tel.replace(/\s/g,"")}">Llamar</a>
      <button class="btn btn-secundario" type="button" id="btnContratado" ${ya?"disabled":""}>${ya?"Ya lo contrataste":"Ya lo contraté"}</button>
      <button class="btn btn-texto" type="button" id="cerrarContacto">Cerrar</button>
    </div>`;
  document.getElementById("cerrarContacto").onclick = () => d.close();
  const b = document.getElementById("btnContratado");
  if(!ya) b.onclick = () => {
    contratados.add(t.id); store.set("contratados", [...contratados]);
    d.close(); toast(`Listo. Ya puedes calificar a ${t.nombre.split(" ")[0]}.`);
  };
  d.showModal();
}

function abrirCalificar(t){
  const d = document.getElementById("dlgCalificar");
  const c = document.getElementById("dlgCalificarCuerpo");
  if(!contratados.has(t.id)){
    c.innerHTML = `<h2>Primero contrátalo</h2>
      <p>Solo pueden calificar los vecinos que contrataron a ${esc(t.nombre.split(" ")[0])} desde Red Vecina. Así las opiniones vienen de vecinos reales.</p>
      <div class="modal-acciones"><button class="btn btn-primario" type="button" id="irContacto">Contactar ahora</button><button class="btn btn-texto" type="button" id="cerrarCal">Cerrar</button></div>`;
    d.showModal();
    document.getElementById("cerrarCal").onclick = () => d.close();
    document.getElementById("irContacto").onclick = () => { d.close(); abrirContacto(t); };
    return;
  }
  let nota = 0;
  c.innerHTML = `<h2>¿Cómo te fue con ${esc(t.nombre.split(" ")[0])}?</h2>
    <p>Tu opinión ayuda al siguiente vecino que tenga el mismo problema.</p>
    <div class="estrellas-input" role="radiogroup" aria-label="Calificación">${[1,2,3,4,5].map(i=>`<button type="button" role="radio" aria-checked="false" aria-label="${i} de 5" data-e="${i}">★</button>`).join("")}</div>
    <div class="campo"><label for="calTxt">Comentario</label><textarea id="calTxt" placeholder="Ej. Llegó a tiempo y dejó todo funcionando."></textarea></div>
    <div class="error" id="calErr">Elige de 1 a 5 estrellas.</div>
    <div class="modal-acciones"><button class="btn btn-primario" type="button" id="publicarCal">Publicar calificación</button><button class="btn btn-texto" type="button" id="cerrarCal">Cancelar</button></div>`;
  c.querySelectorAll("[data-e]").forEach(b => b.onclick = () => {
    nota = +b.dataset.e;
    c.querySelectorAll("[data-e]").forEach(x => { const on = +x.dataset.e <= nota; x.classList.toggle("on", on); x.setAttribute("aria-checked", String(+x.dataset.e===nota)); });
    document.getElementById("calErr").style.display = "none";
  });
  document.getElementById("cerrarCal").onclick = () => d.close();
  document.getElementById("publicarCal").onclick = () => {
    if(!nota){ document.getElementById("calErr").style.display = "block"; return; }
    const txt = document.getElementById("calTxt").value.trim() || "Sin comentario.";
    (resenasUsuario[t.id] = resenasUsuario[t.id] || []).push({a: usuario ? usuario.nombre : "Vecino de Red Vecina", t: txt, c: nota, h: "Hace un momento"});
    store.set("resenas", resenasUsuario);
    d.close(); pintarPerfil(t.id); toast("Calificación publicada. ¡Gracias!");
  };
  d.showModal();
}

/* ---------- Favoritos ---------- */
function alternarFav(id){
  const t = buscarT(id);
  if(favoritos.has(id)){ favoritos.delete(id); toast(`Quitaste a ${t.nombre.split(" ")[0]} de favoritos`); }
  else { favoritos.add(id); toast(`Guardaste a ${t.nombre.split(" ")[0]} en favoritos`); }
  store.set("favoritos", [...favoritos]);
}
function pintarFavoritos(){
  const lista = todos().filter(t=>favoritos.has(t.id));
  document.getElementById("gridFav").innerHTML = lista.length ? lista.map(tarjeta).join("")
    : `<div class="vacio" style="grid-column:1/-1"><strong>Aún no tienes favoritos.</strong><br>Toca el corazón en cualquier trabajador para guardarlo aquí.<br><a class="btn btn-primario" style="margin-top:14px" href="#buscar">Buscar trabajadores</a></div>`;
}

/* ---------- Registro ---------- */
let rolSel = "trabajador";
function ponerRol(r){
  rolSel = r;
  document.querySelectorAll(".rol").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.r === r)));
  document.getElementById("camposTrab").style.display = r === "trabajador" ? "block" : "none";
}
document.querySelectorAll(".rol").forEach(b => b.onclick = () => ponerRol(b.dataset.r));
document.querySelectorAll('[data-rol]').forEach(a => a.addEventListener("click", () => ponerRol(a.dataset.rol)));

document.getElementById("formReg").addEventListener("submit", e => {
  e.preventDefault();
  const v = id => document.getElementById(id).value.trim();
  const marcar = (c, ok) => document.querySelector(`[data-c="${c}"]`).classList.toggle("invalido", !ok);
  const tel = v("rTel").replace(/\D/g,"");
  let valido = true;
  const chk = (c, cond) => { marcar(c, cond); if(!cond) valido = false; };
  chk("nombre", v("rNombre").split(/\s+/).filter(Boolean).length >= 2);
  chk("tel", /^3\d{9}$/.test(tel));
  chk("sector", v("rSector").length >= 3);
  if(rolSel === "trabajador") chk("esp", !!v("rEsp")); else marcar("esp", true);
  const consent = document.getElementById("rConsent").checked;
  document.getElementById("errConsent").style.display = consent ? "none" : "block";
  if(!consent) valido = false;
  if(!valido){ const p = document.querySelector(".invalido input,.invalido select"); if(p) p.focus(); return; }

  usuario = { nombre: v("rNombre"), rol: rolSel, sector: v("rSector") };
  if(rolSel === "trabajador"){
    const id = "t" + Date.now().toString(36);
    const anos = parseInt(v("rAnos"),10) || 0;
    const t = { id, nombre: v("rNombre"), cat: v("rEsp"), titulo: catLabel(v("rEsp")), rating:0, n:0, dist:0, ang: Math.random()*360, anos, sector: v("rSector"),
      tel: tel.replace(/(\d{3})(\d{3})(\d{4})/,"$1 $2 $3"), color:"#2F5D3A", sobre: v("rSobre"), trabajos: [], galeria: [], res: [], nuevo:true };
    extras.push(t); store.set("trabajadores", extras);
    usuario.tid = id;
  }
  store.set("usuario", usuario);
  e.target.reset(); ponerRol("trabajador");
  pintarCuenta();
  toast(`Cuenta creada. Bienvenido, ${usuario.nombre.split(" ")[0]}.`);
  location.hash = usuario.tid ? "perfil-" + usuario.tid : "buscar";
});

/* ---------- Eventos generales ---------- */
document.addEventListener("click", e => {
  const fav = e.target.closest("[data-fav]");
  if(fav){ e.stopPropagation(); alternarFav(fav.dataset.fav); refrescar(); return; }
  const cat = e.target.closest("[data-cat]");
  if(cat){ estado.cats = new Set([cat.dataset.cat]); estado.q = ""; location.hash = "buscar"; refrescar(); return; }
  const abrir = e.target.closest("[data-abrir]");
  if(abrir){ location.hash = "perfil-" + abrir.dataset.abrir; return; }
  const pin = e.target.closest("[data-pin]");
  if(pin){ enfocar(pin.dataset.pin); }
});
document.addEventListener("keydown", e => {
  if(e.key !== "Enter" && e.key !== " ") return;
  const abrir = e.target.closest && e.target.closest("[data-abrir]");
  if(abrir && e.target === abrir){ e.preventDefault(); location.hash = "perfil-" + abrir.dataset.abrir; }
  const pin = e.target.closest && e.target.closest("[data-pin]");
  if(pin){ e.preventDefault(); enfocar(pin.dataset.pin); }
});

document.getElementById("formHero").addEventListener("submit", e => {
  e.preventDefault();
  estado.q = document.getElementById("heroQ").value; estado.sector = document.getElementById("heroS").value; estado.cats.clear();
  location.hash = "buscar"; refrescar();
});
document.getElementById("formRes").addEventListener("submit", e => {
  e.preventDefault();
  estado.q = document.getElementById("resQ").value; estado.sector = document.getElementById("resS").value;
  pintarResultados();
});
document.getElementById("filtroCats").addEventListener("change", e => {
  if(e.target.checked) estado.cats.add(e.target.value); else estado.cats.delete(e.target.value);
  pintarResultados();
});
document.getElementById("filtroDist").onchange = e => { estado.dist = +e.target.value; pintarResultados(); };
document.getElementById("filtroRating").onchange = e => { estado.rating = +e.target.value; pintarResultados(); };
document.getElementById("orden").onchange = e => { estado.orden = e.target.value; pintarResultados(); };
document.getElementById("limpiar").onclick = limpiarFiltros;
document.getElementById("btnVolver").onclick = () => { location.hash = "buscar"; };

/* ---------- Tema ---------- */
const temaGuardado = store.get("tema", null);
if(temaGuardado) document.documentElement.dataset.theme = temaGuardado;
document.getElementById("temaBtn").onclick = () => {
  const actual = document.documentElement.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  const nuevo = actual === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = nuevo; store.set("tema", nuevo);
  if(vistaActual === "buscar") pintarResultados();
};

/* ---------- Router ---------- */
let vistaActual = "inicio";
function refrescar(){
  const h = (location.hash || "#inicio").slice(1);
  let vista = h, id = null;
  if(h.startsWith("perfil-")){ vista = "perfil"; id = h.slice(7); }
  if(!document.querySelector(`[data-view="${vista}"]`)) vista = "inicio";
  const cambio = vista !== vistaActual || vista === "perfil";
  vistaActual = vista;
  document.querySelectorAll(".vista").forEach(s => s.classList.toggle("activa", s.dataset.view === vista));
  document.querySelectorAll("[data-nav]").forEach(a => a.classList.toggle("activo", a.dataset.nav === vista || (vista==="perfil" && a.dataset.nav==="buscar")));
  if(vista === "inicio") pintarInicio();
  if(vista === "buscar"){ pintarFiltros(); pintarResultados(); }
  if(vista === "perfil") pintarPerfil(id);
  if(vista === "favoritos") pintarFavoritos();
  if(cambio) window.scrollTo(0,0);
}
window.addEventListener("hashchange", refrescar);
pintarCuenta();
refrescar();
})();
