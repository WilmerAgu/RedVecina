(function(){
"use strict";

/* ---------- Almacenamiento seguro ---------- */
const store = {
  get(k, d){ try{ const v = localStorage.getItem("rv-"+k); return v ? JSON.parse(v) : d; }catch(e){ return d; } },
  set(k, v){ try{ localStorage.setItem("rv-"+k, JSON.stringify(v)); return true; }catch(e){ return false; } }
};

/* ---------- Íconos ---------- */
const ICON = {
  plomeria:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2s-6 7-6 12a6 6 0 0 0 12 0c0-5-6-12-6-12z"/></svg>',
  electricidad:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 4 14h6l-1 8 9-12h-6z"/></svg>',
  electrodomesticos:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 7h10V4H7zm2-3.5h1.5V8H9zm0 6.5h1.5v4H9z"/></svg>',
  otros:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.7 6.3a5 5 0 0 1-6.6 6.2L7.4 20.2a2.1 2.1 0 1 1-3-3l7.7-7.7a5 5 0 0 1 6.2-6.6L15 6.2 17.8 9z"/></svg>',
  corazon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>',
  camara:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13.5" r="3.5"/></svg>',
  lapiz:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z"/><path d="m13.5 6.5 4 4"/></svg>',
  ojo:'<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
  telefono:'<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/></svg>',
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
const catK = k => CATS.some(c=>c.k===k) ? k : "otros";
const cColor = k => `var(--cat-${catK(k)})`;
const cSuave = k => `var(--cat-${catK(k)}-suave)`;

/* ---------- Datos de ejemplo ---------- */
const BASE = [
  {id:"carlos", nombre:"Carlos Rodríguez", cat:"plomeria", titulo:"Plomero", rating:4.9, n:28, comuna:3, barrio:"Manrique Oriental", ang:-30, anos:5, tel:"300 000 0001", color:"#2F5D3A",
   sobre:"Soy Carlos, plomero con 5 años de experiencia en reparación de tuberías, grifos, fugas y sanitarios. Trabajo con responsabilidad y puntualidad.",
   trabajos:["Reparación de tuberías","Instalación de grifos","Arreglo de fugas","Mantenimiento de sanitarios"],
   galeria:[{f:"fuga-reparada",c:"Fuga en tubería reparada"},{f:"instalacion-tuberia",c:"Instalación de tubería"},{f:"sanitario-mantenimiento",c:"Mantenimiento de sanitario"}],
   res:[{a:"Ana Pérez",t:"Excelente servicio, muy puntual y responsable.",c:5,h:"Hace 3 semanas"},{a:"Luis Ramírez",t:"Arregló la fuga en menos de una hora. Muy recomendado.",c:5,h:"Hace 1 mes"},{a:"Marta Gómez",t:"Trabajo de calidad y buen trato.",c:5,h:"Hace 1 mes"}]},
  {id:"andres", nombre:"Andrés Gómez", cat:"electricidad", titulo:"Electricista", rating:4.8, n:19, comuna:4, barrio:"Aranjuez", ang:40, anos:8, tel:"300 000 0002", color:"#3E6E8E",
   sobre:"Electricista residencial. Organizo tableros, cambio tomas e instalo lámparas. Reviso todo antes de irme.",
   trabajos:["Organización de tableros","Cambio de tomas e interruptores","Instalación de lámparas","Revisión de cortos"],
   galeria:[{f:"tablero-electrico",c:"Tablero eléctrico organizado"},{f:"cambio-toma",c:"Cambio de toma"},{f:"tomas-interruptor",c:"Tomas e interruptor instalados"}],
   res:[{a:"Paula Restrepo",t:"Dejó el tablero organizado y explicó todo.",c:5,h:"Hace 2 semanas"},{a:"Jorge Mesa",t:"Llegó rápido un domingo, buen precio.",c:4,h:"Hace 2 meses"}]},
  {id:"maria", nombre:"María Fernanda López", cat:"electrodomesticos", titulo:"Técnica en electrodomésticos", rating:5.0, n:14, comuna:10, barrio:"Boston", ang:150, anos:6, tel:"300 000 0003", color:"#8E5A3E",
   sobre:"Reparo neveras, lavadoras y estufas. Diagnóstico honesto: si no vale la pena arreglarlo, te lo digo.",
   trabajos:["Reparación de neveras","Mantenimiento de lavadoras","Revisión de estufas"],
   galeria:[{f:"reparacion-nevera",c:"Reparación de nevera"},{f:"lavadoras-mantenimiento",c:"Lavadoras en mantenimiento"}],
   res:[{a:"Sofía Arango",t:"Me salvó la nevera y no me cobró de más.",c:5,h:"Hace 1 semana"},{a:"Camilo Ruiz",t:"Muy honesta con el diagnóstico.",c:5,h:"Hace 3 meses"}]},
  {id:"julian", nombre:"Julián Torres", cat:"plomeria", titulo:"Plomero", rating:4.7, n:11, comuna:2, barrio:"Santa Cruz", ang:200, anos:3, tel:"300 000 0004", color:"#4E7A3F",
   sobre:"Plomero joven y cumplido. Destapo cañerías y cambio sanitarios.",
   trabajos:["Destape de cañerías","Cambio de sanitarios","Instalación de calentadores"],
   galeria:[{f:"sanitario-nuevo",c:"Sanitario nuevo instalado"},{f:"cambio-sanitario",c:"Cambio de sanitario"},{f:"calentador-instalado",c:"Instalación de calentador"}],
   res:[{a:"Diana Castro",t:"Resolvió rápido y dejó todo limpio.",c:5,h:"Hace 1 mes"}]},
  {id:"luis", nombre:"Luis Herrera", cat:"plomeria", titulo:"Plomero", rating:4.6, n:9, comuna:5, barrio:"Castilla", ang:100, anos:10, tel:"300 000 0005", color:"#5B5B8E",
   sobre:"Diez años arreglando tuberías en el barrio. Trabajos grandes y pequeños.",
   trabajos:["Cambio de tubería galvanizada","Reparación de fugas","Instalación de tanques"],
   galeria:[{f:"cambio-tuberia",c:"Cambio de tubería"},{f:"tanques-agua",c:"Tanques de agua instalados"},{f:"calentador-tuberia",c:"Calentador y tubería nueva"}],
   res:[{a:"Hernán Vélez",t:"Sabe mucho, aunque se demoró un poco en llegar.",c:4,h:"Hace 2 meses"}]},
  {id:"diana", nombre:"Diana Ospina", cat:"electricidad", titulo:"Electricista", rating:4.9, n:22, comuna:11, barrio:"Laureles", ang:-110, anos:7, tel:"300 000 0006", color:"#7A3E6E",
   sobre:"Instalaciones eléctricas seguras para casas y locales. Trabajo con materiales certificados.",
   trabajos:["Cableado de casas","Instalación de duchas eléctricas","Iluminación de locales"],
   galeria:[{f:"cableado-vivienda",c:"Cableado de vivienda"},{f:"revision-cableado",c:"Revisión de cableado"},{f:"instalacion-electrica",c:"Instalación eléctrica en obra"}],
   res:[{a:"Mónica Gil",t:"Muy profesional y ordenada.",c:5,h:"Hace 3 semanas"}]},
  {id:"oscar", nombre:"Óscar Cardona", cat:"otros", titulo:"Carpintero y pintor", rating:4.5, n:7, comuna:16, barrio:"Belén", ang:250, anos:12, tel:"300 000 0007", color:"#8E7A3E",
   sobre:"Arreglo puertas, closets y muebles. También pinto casas y apartamentos.",
   trabajos:["Ajuste de puertas","Reparación de closets","Pintura de interiores"],
   galeria:[{f:"carpinteria",c:"Trabajo de carpintería"},{f:"pintura-interior",c:"Pintura de interiores"},{f:"pintura-fachada",c:"Pintura de fachada"}],
   res:[{a:"Andrea Lopera",t:"Dejó la puerta como nueva.",c:5,h:"Hace 1 mes"}]},
  {id:"natalia", nombre:"Natalia Ríos", cat:"electrodomesticos", titulo:"Técnica en electrodomésticos", rating:4.7, n:12, comuna:13, barrio:"San Javier n.º 1", ang:310, anos:4, tel:"300 000 0008", color:"#3E8E7A",
   sobre:"Reparación de licuadoras, hornos microondas y televisores.",
   trabajos:["Reparación de microondas","Arreglo de televisores","Mantenimiento de licuadoras"],
   galeria:[{f:"televisor-reparacion",c:"Televisor en reparación"},{f:"tarjeta-electronica",c:"Revisión de tarjeta electrónica"},{f:"reparacion-electronica",c:"Reparación de electrodomésticos"}],
   res:[{a:"Felipe Zapata",t:"Buen servicio y garantía.",c:5,h:"Hace 2 semanas"}]},
  {id:"jhon", nombre:"Jhon Fredy Álvarez", cat:"electricidad", titulo:"Electricista", rating:4.8, n:17, comuna:1, barrio:"Santo Domingo Savio n.º 1", ang:0, anos:9, tel:"300 000 0009", color:"#2F5D3A",
   sobre:"Electricista del barrio desde hace nueve años. Instalo tomas, reviso cortos y cambio contadores con todos los cuidados.",
   trabajos:["Instalación de tomas e interruptores","Organización de tableros","Instalación de lámparas"],
   galeria:[{f:"tablero-electrico",c:"Tablero eléctrico organizado"},{f:"cambio-toma",c:"Cambio de toma"}],
   res:[{a:"Beatriz Arango",t:"Muy puntual y dejó todo limpio. Lo recomiendo.",c:5,h:"Hace 1 semana"},{a:"Juan Camilo Ortiz",t:"Explicó bien el problema y cobró lo justo.",c:5,h:"Hace 2 semanas"}]},
  {id:"ramiro", nombre:"Ramiro Patiño", cat:"otros", titulo:"Albañil", rating:4.6, n:11, comuna:1, barrio:"Granizal", ang:67, anos:15, tel:"300 000 0010", color:"#3E6E8E",
   sobre:"Albañil con quince años de experiencia. Levanto muros, pego baldosa, arreglo goteras y hago planchas pequeñas.",
   trabajos:["Arreglo de goteras","Repello y pañete","Levante de muros"],
   galeria:[],
   res:[{a:"Andrés Felipe Mejía",t:"Explicó bien el problema y cobró lo justo.",c:5,h:"Hace 2 semanas"}]},
  {id:"liliana", nombre:"Liliana Montoya", cat:"electrodomesticos", titulo:"Técnica en electrodomésticos", rating:4.9, n:15, comuna:2, barrio:"Villa del Socorro", ang:134, anos:7, tel:"300 000 0011", color:"#8E5A3E",
   sobre:"Reparo lavadoras, neveras y licuadoras en la casa del cliente. Doy garantía de 30 días en cada arreglo.",
   trabajos:["Arreglo de televisores","Reparación de neveras","Reparación de lavadoras"],
   galeria:[{f:"televisor-reparacion",c:"Televisor en reparación"},{f:"tarjeta-electronica",c:"Revisión de tarjeta electrónica"}],
   res:[{a:"Natalia Duque",t:"Buen trabajo, aunque llegó un poco tarde.",c:4,h:"Hace 3 semanas"},{a:"Mateo Rendón",t:"Resolvió en una sola visita. Excelente.",c:5,h:"Hace 1 mes"}]},
  {id:"wilson", nombre:"Wilson Arango", cat:"electricidad", titulo:"Electricista", rating:4.7, n:13, comuna:3, barrio:"Versalles n.º 1", ang:201, anos:11, tel:"300 000 0012", color:"#4E7A3F",
   sobre:"Electricista residencial. Organizo tableros, instalo duchas eléctricas y dejo todo marcado para que sepas qué es cada circuito.",
   trabajos:["Instalación de tomas e interruptores","Organización de tableros","Instalación de lámparas"],
   galeria:[{f:"cableado-vivienda",c:"Cableado de vivienda"},{f:"instalacion-electrica",c:"Instalación eléctrica"}],
   res:[{a:"Sergio Alzate",t:"Resolvió en una sola visita. Excelente.",c:5,h:"Hace 1 mes"},{a:"Luz Dary Gómez",t:"Muy amable y cuidadoso dentro de la casa.",c:5,h:"Hace 2 meses"}]},
  {id:"gloria", nombre:"Gloria Restrepo", cat:"electrodomesticos", titulo:"Técnica en electrodomésticos", rating:4.8, n:10, comuna:4, barrio:"Palermo", ang:268, anos:8, tel:"300 000 0013", color:"#5B5B8E",
   sobre:"Técnica en neveras y estufas. Llego puntual, explico el daño antes de cobrar y uso repuestos originales.",
   trabajos:["Reparación de microondas","Arreglo de televisores","Reparación de neveras"],
   galeria:[{f:"reparacion-electronica",c:"Reparación de electrodomésticos"},{f:"reparacion-nevera",c:"Reparación de nevera"}],
   res:[{a:"Beatriz Arango",t:"Muy amable y cuidadoso dentro de la casa.",c:5,h:"Hace 2 meses"}]},
  {id:"hernan", nombre:"Hernán Zapata", cat:"otros", titulo:"Cerrajero", rating:4.7, n:19, comuna:5, barrio:"Toscana", ang:335, anos:14, tel:"300 000 0014", color:"#7A3E6E",
   sobre:"Cerrajero a domicilio. Abro puertas, cambio guardas y hago copias de llaves. Atiendo urgencias en el barrio.",
   trabajos:["Copias de llaves","Instalación de chapas","Apertura de puertas"],
   galeria:[],
   res:[{a:"Andrés Felipe Mejía",t:"Quedó bien. Volvería a llamarlo.",c:4,h:"Hace 1 semana"},{a:"Carolina Vásquez",t:"Muy puntual y dejó todo limpio. Lo recomiendo.",c:5,h:"Hace 2 semanas"}]},
  {id:"fabio", nombre:"Fabio Quintero", cat:"plomeria", titulo:"Plomero", rating:4.6, n:9, comuna:6, barrio:"Santander", ang:42, anos:12, tel:"300 000 0015", color:"#8E7A3E",
   sobre:"Plomero de confianza en el Doce de Octubre. Destapo cañerías, cambio tubería y reparo tanques de sanitario.",
   trabajos:["Cambio de griferías","Reparación de tanques de agua","Arreglo de fugas"],
   galeria:[{f:"cambio-sanitario",c:"Cambio de sanitario"},{f:"calentador-tuberia",c:"Calentador y tubería nueva"}],
   res:[{a:"Natalia Duque",t:"Muy puntual y dejó todo limpio. Lo recomiendo.",c:5,h:"Hace 2 semanas"}]},
  {id:"yesenia", nombre:"Yesenia Correa", cat:"electrodomesticos", titulo:"Técnica en electrodomésticos", rating:4.9, n:8, comuna:6, barrio:"Pedregal", ang:109, anos:5, tel:"300 000 0016", color:"#3E8E7A",
   sobre:"Arreglo lavadoras y hornos microondas. Si no vale la pena repararlo te lo digo sin rodeos.",
   trabajos:["Arreglo de televisores","Reparación de neveras","Reparación de lavadoras"],
   galeria:[{f:"televisor-reparacion",c:"Televisor en reparación"},{f:"tarjeta-electronica",c:"Revisión de tarjeta electrónica"}],
   res:[{a:"Sergio Alzate",t:"Explicó bien el problema y cobró lo justo.",c:5,h:"Hace 3 semanas"}]},
  {id:"camilo", nombre:"Camilo Bedoya", cat:"electricidad", titulo:"Electricista", rating:4.7, n:12, comuna:7, barrio:"Aures n.º 1", ang:176, anos:6, tel:"300 000 0017", color:"#2F5D3A",
   sobre:"Electricista técnico del SENA. Hago instalaciones nuevas, cambio cableado viejo y reviso cortos.",
   trabajos:["Instalación de duchas eléctricas","Cambio de cableado","Instalación de tomas e interruptores"],
   galeria:[{f:"tomas-interruptor",c:"Tomas e interruptor instalados"},{f:"cableado-vivienda",c:"Cableado de vivienda"}],
   res:[{a:"Beatriz Arango",t:"Buen trabajo, aunque llegó un poco tarde.",c:4,h:"Hace 1 mes"}]},
  {id:"albeiro", nombre:"Albeiro Gaviria", cat:"plomeria", titulo:"Plomero", rating:4.8, n:24, comuna:7, barrio:"La Pilarica", ang:243, anos:18, tel:"300 000 0018", color:"#3E6E8E",
   sobre:"Dieciocho años como plomero en Robledo. Fugas, calentadores, sanitarios y lavaplatos, sin dejar desorden.",
   trabajos:["Instalación de calentadores","Cambio de griferías","Reparación de tanques de agua"],
   galeria:[{f:"fuga-reparada",c:"Fuga en tubería reparada"},{f:"instalacion-tuberia",c:"Instalación de tubería"}],
   res:[{a:"Andrés Felipe Mejía",t:"Resolvió en una sola visita. Excelente.",c:5,h:"Hace 2 meses"},{a:"Carolina Vásquez",t:"Muy amable y cuidadoso dentro de la casa.",c:5,h:"Hace 1 semana"}]},
  {id:"jairo", nombre:"Jairo Mesa", cat:"plomeria", titulo:"Plomero", rating:4.5, n:7, comuna:8, barrio:"Enciso", ang:310, anos:10, tel:"300 000 0019", color:"#8E5A3E",
   sobre:"Plomero cumplido. Reparo fugas, instalo lavaderos y cambio llaves de paso.",
   trabajos:["Reparación de tanques de agua","Arreglo de fugas","Destape de cañerías"],
   galeria:[{f:"instalacion-tuberia",c:"Instalación de tubería"},{f:"sanitario-nuevo",c:"Sanitario nuevo instalado"}],
   res:[{a:"Natalia Duque",t:"Muy amable y cuidadoso dentro de la casa.",c:5,h:"Hace 1 semana"}]},
  {id:"marleny", nombre:"Marleny Ocampo", cat:"otros", titulo:"Pintora", rating:4.9, n:14, comuna:8, barrio:"Llanaditas", ang:17, anos:9, tel:"300 000 0020", color:"#4E7A3F",
   sobre:"Pinto casas por dentro y por fuera. Resano paredes, quito humedad y dejo todo limpio al terminar.",
   trabajos:["Resane de paredes","Tratamiento de humedad","Pintura de interiores"],
   galeria:[{f:"pintura-fachada",c:"Pintura de fachada"},{f:"pintura-interior",c:"Pintura de interiores"}],
   res:[{a:"Sergio Alzate",t:"Quedó bien. Volvería a llamarlo.",c:4,h:"Hace 2 semanas"},{a:"Luz Dary Gómez",t:"Muy puntual y dejó todo limpio. Lo recomiendo.",c:5,h:"Hace 3 semanas"}]},
  {id:"esteban", nombre:"Esteban Muñoz", cat:"electricidad", titulo:"Electricista", rating:4.6, n:6, comuna:9, barrio:"Miraflores", ang:84, anos:4, tel:"300 000 0021", color:"#5B5B8E",
   sobre:"Electricista joven y responsable. Instalo lámparas, ventiladores de techo y tomas nuevas.",
   trabajos:["Instalación de tomas e interruptores","Organización de tableros","Instalación de lámparas"],
   galeria:[{f:"tablero-electrico",c:"Tablero eléctrico organizado"},{f:"cambio-toma",c:"Cambio de toma"}],
   res:[{a:"Beatriz Arango",t:"Muy puntual y dejó todo limpio. Lo recomiendo.",c:5,h:"Hace 3 semanas"}]},
  {id:"paula", nombre:"Paula Andrea Giraldo", cat:"electrodomesticos", titulo:"Técnica en electrodomésticos", rating:4.8, n:11, comuna:9, barrio:"Cataluña", ang:151, anos:6, tel:"300 000 0022", color:"#7A3E6E",
   sobre:"Reparo televisores, equipos de sonido y hornos microondas. Revisión sin costo si haces el arreglo conmigo.",
   trabajos:["Reparación de lavadoras","Revisión de estufas","Reparación de microondas"],
   galeria:[{f:"tarjeta-electronica",c:"Revisión de tarjeta electrónica"},{f:"reparacion-electronica",c:"Reparación de electrodomésticos"}],
   res:[{a:"Andrés Felipe Mejía",t:"Explicó bien el problema y cobró lo justo.",c:5,h:"Hace 1 mes"}]},
  {id:"gustavo", nombre:"Gustavo Henao", cat:"plomeria", titulo:"Plomero", rating:4.9, n:31, comuna:10, barrio:"Prado", ang:218, anos:20, tel:"300 000 0023", color:"#8E7A3E",
   sobre:"Veinte años arreglando tuberías en el centro. Conozco bien las casas antiguas y sus instalaciones.",
   trabajos:["Arreglo de fugas","Destape de cañerías","Cambio de tubería"],
   galeria:[{f:"tanques-agua",c:"Tanques de agua instalados"},{f:"cambio-sanitario",c:"Cambio de sanitario"}],
   res:[{a:"Natalia Duque",t:"Buen trabajo, aunque llegó un poco tarde.",c:4,h:"Hace 2 meses"},{a:"Mateo Rendón",t:"Resolvió en una sola visita. Excelente.",c:5,h:"Hace 1 semana"}]},
  {id:"mauricio", nombre:"Mauricio Vélez", cat:"otros", titulo:"Carpintero", rating:4.8, n:18, comuna:11, barrio:"Conquistadores", ang:285, anos:16, tel:"300 000 0024", color:"#3E8E7A",
   sobre:"Carpintero de muebles y puertas. Hago closets a la medida, ajusto puertas y reparo cocinas integrales.",
   trabajos:["Reparación de muebles","Arreglo de cocinas integrales","Ajuste de puertas"],
   galeria:[{f:"carpinteria",c:"Trabajo de carpintería"}],
   res:[{a:"Sergio Alzate",t:"Resolvió en una sola visita. Excelente.",c:5,h:"Hace 1 semana"},{a:"Luz Dary Gómez",t:"Muy amable y cuidadoso dentro de la casa.",c:5,h:"Hace 2 semanas"}]},
  {id:"sandra", nombre:"Sandra Milena Tobón", cat:"plomeria", titulo:"Plomera", rating:4.9, n:16, comuna:12, barrio:"La Floresta", ang:352, anos:7, tel:"300 000 0025", color:"#2F5D3A",
   sobre:"Plomera con siete años de experiencia. Instalo calentadores, griferías y sanitarios con garantía.",
   trabajos:["Instalación de calentadores","Cambio de griferías","Reparación de tanques de agua"],
   galeria:[{f:"calentador-tuberia",c:"Calentador y tubería nueva"},{f:"sanitario-mantenimiento",c:"Mantenimiento de sanitario"}],
   res:[{a:"Beatriz Arango",t:"Muy amable y cuidadoso dentro de la casa.",c:5,h:"Hace 2 semanas"},{a:"Juan Camilo Ortiz",t:"Quedó bien. Volvería a llamarlo.",c:4,h:"Hace 3 semanas"}]},
  {id:"felipe", nombre:"Felipe Arboleda", cat:"electricidad", titulo:"Electricista", rating:4.7, n:10, comuna:12, barrio:"Santa Mónica", ang:59, anos:9, tel:"300 000 0026", color:"#3E6E8E",
   sobre:"Electricista certificado RETIE. Revisiones completas de la instalación de la casa y cambios de tablero.",
   trabajos:["Instalación de duchas eléctricas","Cambio de cableado","Instalación de tomas e interruptores"],
   galeria:[{f:"revision-cableado",c:"Revisión de cableado"},{f:"tablero-electrico",c:"Tablero eléctrico organizado"}],
   res:[{a:"Andrés Felipe Mejía",t:"Quedó bien. Volvería a llamarlo.",c:4,h:"Hace 3 semanas"}]},
  {id:"nestor", nombre:"Néstor Úsuga", cat:"plomeria", titulo:"Plomero", rating:4.6, n:9, comuna:13, barrio:"El Salado", ang:126, anos:8, tel:"300 000 0027", color:"#8E5A3E",
   sobre:"Plomero en San Javier. Destapes, cambio de tubería y arreglo de tanques de agua.",
   trabajos:["Destape de cañerías","Cambio de tubería","Instalación de sanitarios"],
   galeria:[{f:"fuga-reparada",c:"Fuga en tubería reparada"},{f:"instalacion-tuberia",c:"Instalación de tubería"}],
   res:[{a:"Natalia Duque",t:"Muy puntual y dejó todo limpio. Lo recomiendo.",c:5,h:"Hace 1 mes"}]},
  {id:"daniela", nombre:"Daniela Salazar", cat:"electricidad", titulo:"Electricista", rating:4.9, n:12, comuna:14, barrio:"Manila", ang:193, anos:5, tel:"300 000 0028", color:"#4E7A3F",
   sobre:"Electricista para casas y apartamentos. Iluminación, tomas, timbres y revisiones antes de mudanzas.",
   trabajos:["Instalación de lámparas","Revisión de cortos","Instalación de duchas eléctricas"],
   galeria:[{f:"cambio-toma",c:"Cambio de toma"},{f:"tomas-interruptor",c:"Tomas e interruptor instalados"}],
   res:[{a:"Sergio Alzate",t:"Explicó bien el problema y cobró lo justo.",c:5,h:"Hace 2 meses"}]},
  {id:"rodrigo", nombre:"Rodrigo Posada", cat:"otros", titulo:"Pintor", rating:4.7, n:15, comuna:14, barrio:"Patio Bonito", ang:260, anos:13, tel:"300 000 0029", color:"#5B5B8E",
   sobre:"Pintor de interiores y fachadas. Trabajo con andamio propio y materiales de buena calidad.",
   trabajos:["Pintura de fachadas","Resane de paredes","Pintura de interiores"],
   galeria:[{f:"pintura-fachada",c:"Pintura de fachada"},{f:"pintura-interior",c:"Pintura de interiores"}],
   res:[{a:"Beatriz Arango",t:"Buen trabajo, aunque llegó un poco tarde.",c:4,h:"Hace 1 semana"},{a:"Juan Camilo Ortiz",t:"Resolvió en una sola visita. Excelente.",c:5,h:"Hace 2 semanas"}]},
  {id:"claudia", nombre:"Claudia Jaramillo", cat:"electrodomesticos", titulo:"Técnica en electrodomésticos", rating:4.8, n:13, comuna:15, barrio:"Trinidad", ang:327, anos:10, tel:"300 000 0030", color:"#7A3E6E",
   sobre:"Reparo neveras, nevecones y lavadoras de todas las marcas. Atiendo también los sábados.",
   trabajos:["Revisión de estufas","Reparación de microondas","Arreglo de televisores"],
   galeria:[{f:"lavadoras-mantenimiento",c:"Lavadoras en mantenimiento"},{f:"televisor-reparacion",c:"Televisor en reparación"}],
   res:[{a:"Andrés Felipe Mejía",t:"Resolvió en una sola visita. Excelente.",c:5,h:"Hace 2 semanas"},{a:"Carolina Vásquez",t:"Muy amable y cuidadoso dentro de la casa.",c:5,h:"Hace 3 semanas"}]},
  {id:"javier", nombre:"Javier Echeverri", cat:"plomeria", titulo:"Plomero", rating:4.5, n:5, comuna:15, barrio:"Campo Amor", ang:34, anos:6, tel:"300 000 0031", color:"#8E7A3E",
   sobre:"Plomero para arreglos rápidos: fugas, sifones, llaves y sanitarios que no paran de llenar.",
   trabajos:["Cambio de tubería","Instalación de sanitarios","Instalación de calentadores"],
   galeria:[{f:"cambio-tuberia",c:"Cambio de tubería"},{f:"tanques-agua",c:"Tanques de agua instalados"}],
   res:[{a:"Natalia Duque",t:"Muy amable y cuidadoso dentro de la casa.",c:5,h:"Hace 3 semanas"}]},
  {id:"leidy", nombre:"Leidy Johana Cano", cat:"electricidad", titulo:"Electricista", rating:0, n:0, comuna:16, barrio:"La Mota", ang:101, anos:2, tel:"300 000 0032", color:"#3E8E7A", nuevo:true,
   sobre:"Electricista recién certificada. Instalo tomas, interruptores y lámparas con precios justos.",
   trabajos:["Instalación de duchas eléctricas","Cambio de cableado","Instalación de tomas e interruptores"],
   galeria:[{f:"revision-cableado",c:"Revisión de cableado"},{f:"tablero-electrico",c:"Tablero eléctrico organizado"}],
   res:[]},
  {id:"arley", nombre:"Arley Durango", cat:"otros", titulo:"Albañil", rating:0, n:0, comuna:50, barrio:"Palmitas Central", ang:168, anos:12, tel:"300 000 0033", color:"#2F5D3A", nuevo:true,
   sobre:"Albañil del corregimiento. Construyo y reparo muros, pisos y techos de fincas y casas.",
   trabajos:["Levante de muros","Instalación de baldosa","Arreglo de goteras"],
   galeria:[],
   res:[]},
  {id:"edgar", nombre:"Édgar Monsalve", cat:"plomeria", titulo:"Plomero", rating:4.7, n:8, comuna:60, barrio:"San Cristóbal", ang:235, anos:14, tel:"300 000 0034", color:"#3E6E8E",
   sobre:"Plomero en San Cristóbal y sus veredas. Instalo tanques, motobombas y tubería de agua.",
   trabajos:["Destape de cañerías","Cambio de tubería","Instalación de sanitarios"],
   galeria:[{f:"calentador-tuberia",c:"Calentador y tubería nueva"},{f:"sanitario-mantenimiento",c:"Mantenimiento de sanitario"}],
   res:[{a:"Andrés Felipe Mejía",t:"Explicó bien el problema y cobró lo justo.",c:5,h:"Hace 1 semana"}]},
  {id:"yuliana", nombre:"Yuliana Marín", cat:"electricidad", titulo:"Electricista", rating:0, n:0, comuna:70, barrio:"Altavista", ang:302, anos:3, tel:"300 000 0035", color:"#8E5A3E", nuevo:true,
   sobre:"Electricista del corregimiento. Cambio cableado, instalo tomas y reviso la luz de casas y fincas.",
   trabajos:["Instalación de duchas eléctricas","Cambio de cableado","Instalación de tomas e interruptores"],
   galeria:[{f:"tomas-interruptor",c:"Tomas e interruptor instalados"},{f:"cableado-vivienda",c:"Cableado de vivienda"}],
   res:[]},
  {id:"ricardo", nombre:"Ricardo Londoño", cat:"electrodomesticos", titulo:"Técnico en electrodomésticos", rating:4.6, n:10, comuna:80, barrio:"San Antonio de Prado", ang:9, anos:9, tel:"300 000 0036", color:"#4E7A3F",
   sobre:"Técnico en lavadoras, neveras y estufas a gas en San Antonio de Prado y alrededores.",
   trabajos:["Arreglo de televisores","Reparación de neveras","Reparación de lavadoras"],
   galeria:[{f:"televisor-reparacion",c:"Televisor en reparación"},{f:"tarjeta-electronica",c:"Revisión de tarjeta electrónica"}],
   res:[{a:"Sergio Alzate",t:"Resolvió en una sola visita. Excelente.",c:5,h:"Hace 3 semanas"}]},
  {id:"alonso", nombre:"Alonso Betancur", cat:"otros", titulo:"Carpintero", rating:4.9, n:20, comuna:90, barrio:"Santa Elena", ang:76, anos:22, tel:"300 000 0037", color:"#5B5B8E",
   sobre:"Carpintero de Santa Elena. Puertas, ventanas, pérgolas y muebles en madera de la región.",
   trabajos:["Ajuste de puertas","Closets a la medida","Reparación de muebles"],
   galeria:[{f:"carpinteria",c:"Trabajo de carpintería"}],
   res:[{a:"Beatriz Arango",t:"Muy amable y cuidadoso dentro de la casa.",c:5,h:"Hace 1 mes"},{a:"Juan Camilo Ortiz",t:"Quedó bien. Volvería a llamarlo.",c:4,h:"Hace 2 meses"}]},
  // Perfil real del autor del prototipo. El celular es de ejemplo: con él se puede iniciar sesión.
  {id:"wilmer", nombre:"Wilmer Agudelo", cat:"plomeria", titulo:"Plomero", rating:0, n:0, comuna:2, barrio:"La Francia", ang:20, anos:4, tel:"300 000 0038", color:"#2F5D3A", nuevo:true,
   sobre:"Arreglo daños en tubería, instalo duchas, hago cualquier tipo de cambio e instalo lavaderos, sanitarios, lavamanos, etc.",
   trabajos:["Arreglo de daños en tubería","Instalación de duchas","Instalación de lavaderos","Instalación de sanitarios y lavamanos"],
   galeria:[],
   res:[]}
];

let extras = store.get("trabajadores", []);
let resenasUsuario = store.get("resenas", {});
let favoritos = new Set(store.get("favoritos", []));
let contratados = new Set(store.get("contratados", []));
let usuario = store.get("usuario", null);
/* Cuentas registradas en este navegador, indexadas por celular (solo dígitos) */
let cuentas = store.get("cuentas", {});
const soloDigitos = s => String(s || "").replace(/\D/g, "");
function buscarCuenta(tel){
  if(cuentas[tel]) return cuentas[tel];
  // Trabajadores sin cuenta registrada: perfiles creados antes de las cuentas o perfiles fijos del código
  const t = todos().find(x => soloDigitos(x.tel) === tel);
  if(t){
    cuentas[tel] = { nombre: t.nombre, rol: "trabajador", sector: t.sector, comuna: t.comuna, barrio: t.barrio, tel, tid: t.id };
    store.set("cuentas", cuentas);
    return cuentas[tel];
  }
  return null;
}

let ocultos = new Set(store.get("ocultos", []));   // perfiles fijos cuya cuenta se eliminó en este navegador
const todos = () => BASE.filter(b => !ocultos.has(b.id) && !extras.some(e => e.id === b.id)).concat(extras);
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
/* ---------- Comunas y barrios de Medellín (datos en comunas.js) ---------- */
const COMUNAS = window.COMUNAS_MEDELLIN || [];
const comunaDe = n => COMUNAS.find(c => c.n === +n) || null;
const nombreComuna = n => { const c = comunaDe(n); return !c ? "" : c.corregimiento ? "Corregimiento " + c.nombre : `Comuna ${c.n} · ${c.nombre}`; };
const comunaCorta = n => { const c = comunaDe(n); return !c ? "" : c.corregimiento ? c.nombre : "Comuna " + c.n; };
const lugarDe = x => x && x.comuna && comunaDe(x.comuna) ? `${x.barrio} · ${nombreComuna(x.comuna)}` : (x && x.sector) || "Medellín";
const normTxt = s => String(s||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/n\.?\s*º?\s*/g,"no ").replace(/[^a-z0-9 ]/g," ").replace(/\s+/g," ").trim();
function ubicarPorTexto(txt){
  const t = normTxt(txt); if(!t) return null;
  for(const c of COMUNAS){ const b = c.barrios.find(x => normTxt(x) === t); if(b) return {comuna: c.n, barrio: b}; }
  return null;
}
/* Distancia aproximada entre los centros de dos comunas, en km */
function distComunas(a, b){
  const A = comunaDe(a), B = comunaDe(b); if(!A || !B) return Infinity; if(A === B) return 0;
  const r = Math.PI/180, dLat = (B.c[0]-A.c[0])*r, dLon = (B.c[1]-A.c[1])*r;
  const h = Math.sin(dLat/2)**2 + Math.cos(A.c[0]*r)*Math.cos(B.c[0]*r)*Math.sin(dLon/2)**2;
  return 12742 * Math.asin(Math.sqrt(h));
}
function opcionesComuna(sel, vacio){
  const op = c => `<option value="${c.n}" ${+sel===c.n?"selected":""}>${c.corregimiento ? c.nombre : `Comuna ${c.n} · ${c.nombre}`}</option>`;
  return `<option value="">${vacio}</option>
    <optgroup label="Comunas">${COMUNAS.filter(c=>!c.corregimiento).map(op).join("")}</optgroup>
    <optgroup label="Corregimientos">${COMUNAS.filter(c=>c.corregimiento).map(op).join("")}</optgroup>`;
}
function opcionesBarrio(comuna, sel){
  const c = comunaDe(comuna);
  if(!c) return `<option value="">Primero elige la comuna</option>`;
  return `<option value="">Elige tu ${c.corregimiento ? "vereda" : "barrio"}</option>` +
    c.barrios.slice().sort((a,b)=>a.localeCompare(b,"es")).map(b => `<option ${b===sel?"selected":""}>${esc(b)}</option>`).join("");
}
/* Conecta un par de selectores: al cambiar la comuna se cargan solo sus barrios */
function conectarComunaBarrio(selC, selB, comuna, barrio){
  selC.innerHTML = opcionesComuna(comuna, "Elige tu comuna");
  const cargar = b => { selB.innerHTML = opcionesBarrio(selC.value, b); selB.disabled = !selC.value; };
  cargar(barrio);
  selC.onchange = () => { cargar(""); if(selC.value) selB.focus(); };
}

(function migrarUbicaciones(){
  let cambio = false;
  const fijar = x => { if(x && !x.comuna && x.sector){ const u = ubicarPorTexto(x.sector); if(u){ Object.assign(x, u); cambio = true; } } };
  extras.forEach(fijar); Object.values(cuentas).forEach(fijar); fijar(usuario);
  if(cambio){ store.set("trabajadores", extras); store.set("cuentas", cuentas); store.set("usuario", usuario); }
})();

const iniciales = n => n.split(" ").filter(Boolean).slice(0,2).map(p=>p[0]).join("").toUpperCase();
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

function avatarSVG(t, alto){
  if(t.foto && /^data:image\/(jpeg|png|webp);base64,/.test(t.foto))
    return `<img src="${t.foto}" alt="" style="display:block;width:100%;height:100%;object-fit:cover">`;
  const c = cColor(t.cat), bg = cSuave(t.cat);
  return `<svg viewBox="0 0 200 ${alto}" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style="display:block">
    <rect width="200" height="${alto}" fill="${bg}"/>
    <circle cx="160" cy="${alto*0.18}" r="${alto*0.32}" fill="${c}" opacity=".12"/>
    <circle cx="100" cy="${alto*0.42}" r="${alto*0.2}" fill="${c}"/>
    <path d="M${100-alto*0.38} ${alto} q0 -${alto*0.36} ${alto*0.38} -${alto*0.36} q${alto*0.38} 0 ${alto*0.38} ${alto*0.36}z" fill="${c}" opacity=".85"/>
    <text x="100" y="${alto*0.42+alto*0.065}" text-anchor="middle" font-family="'Baloo 2',sans-serif" font-weight="700" font-size="${alto*0.18}" fill="var(--surface)">${iniciales(t.nombre)}</text>
  </svg>`;
}

function origen(){ return estado.comuna !== undefined ? estado.comuna : (usuario && usuario.comuna) || 0; }
const distA = t => origen() ? distComunas(origen(), t.comuna) : Infinity;
/* Texto corto de ubicación para tarjetas: "Aranjuez · Comuna 4" o "Boston · En tu comuna" */
function lugarCorto(t){
  if(!t.comuna) return esc(t.sector || "Medellín");
  if(esPropio(t)) return `${esc(t.barrio)} · ${comunaCorta(t.comuna)}`;   // en el propio perfil no tiene sentido "en tu comuna"
  const o = origen();
  const misma = o && +o === +t.comuna;
  const etiqueta = misma ? (usuario && +usuario.comuna === +o ? "En tu comuna" : "En esta comuna") : comunaCorta(t.comuna);
  return `${esc(t.barrio)} · ${misma ? `<strong class="misma">${etiqueta}</strong>` : etiqueta}`;
}
function chipDe(t){ return t.nuevo ? '<span class="chip nuevo">Nuevo</span>' : (distA(t) <= 2.5 ? '<span class="chip">Cercano</span>' : ""); }

function botonFav(t, cls){
  const on = favoritos.has(t.id);
  return `<button class="fav ${cls||""}" type="button" data-fav="${t.id}" aria-pressed="${on}" aria-label="${on?"Quitar de":"Guardar en"} favoritos a ${esc(t.nombre)}">${ICON.corazon}</button>`;
}

function tarjeta(t){
  const {r,n} = ratingDe(t);
  return `<article class="tarjeta" data-abrir="${t.id}" tabindex="0" aria-label="Ver perfil de ${esc(t.nombre)}">
    <div class="foto">${avatarSVG(t,150)}${chipDe(t)}${botonFav(t)}</div>
    <div class="cuerpo"><h3>${esc(t.nombre)}</h3><div class="oficio" style="--c:${cColor(t.cat)}">${catLabel(t.cat)}</div>
    <div class="meta"><span><span class="estrella">★</span> ${n?fmtR(r):"Sin calificar"} ${n?`(${n} opiniones)`:""}</span><span>${lugarCorto(t)}</span></div></div>
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
function cerrarMenuCuenta(){
  const menu = document.getElementById("menuCuenta"), btn = document.getElementById("btnCuenta");
  if(menu) menu.hidden = true;
  if(btn) btn.setAttribute("aria-expanded","false");
}
document.addEventListener("click", e => { const m = document.getElementById("menuCuenta"); if(m && !m.contains(e.target)) cerrarMenuCuenta(); });
document.addEventListener("keydown", e => { if(e.key === "Escape") cerrarMenuCuenta(); });
function pintarCuenta(){
  const z = document.getElementById("zonaCuenta");
  estado.comuna = undefined;
  const tab = document.getElementById("tabPerfil");
  if(tab){
    tab.href = !usuario ? "#registro" : usuario.tid ? "#perfil-" + usuario.tid : "#cuenta";
    document.getElementById("tabPerfilTxt").textContent = !usuario ? "Entrar" : usuario.tid ? "Mi perfil" : "Mi cuenta";
  }
  if(usuario){
    const esTrab = usuario.rol === "trabajador" && usuario.tid;
    z.innerHTML = `<div class="menu-cuenta">
      <button class="avatar-top" id="btnCuenta" title="${esc(usuario.nombre)}" aria-label="Tu cuenta: ${esc(usuario.nombre)}" aria-haspopup="true" aria-expanded="false">${iniciales(usuario.nombre)}</button>
      <div class="menu-cuenta-lista" id="menuCuenta" role="menu" hidden>
        <div class="menu-cuenta-nombre">${esc(usuario.nombre)}</div>
        <div class="menu-cuenta-rol">${esTrab ? "Trabajador · " + esc(catLabel((miTrabajador()||{}).cat || "otros")) : "Vecino"}</div>
        <button type="button" role="menuitem" id="mcPerfil">${esTrab ? "Ver mi perfil" : "Mi cuenta"}</button>
        <button type="button" role="menuitem" id="mcEditar">${esTrab ? "Editar perfil" : "Editar mis datos"}</button>
        <hr>
        <button type="button" role="menuitem" id="mcSalir">Cerrar sesión</button>
      </div></div>`;
    const btn = document.getElementById("btnCuenta"), menu = document.getElementById("menuCuenta");
    btn.onclick = e => { e.stopPropagation(); menu.hidden = !menu.hidden; btn.setAttribute("aria-expanded", String(!menu.hidden)); };
    document.getElementById("mcPerfil").onclick = () => { cerrarMenuCuenta(); location.hash = esTrab ? "perfil-" + usuario.tid : "cuenta"; };
    document.getElementById("mcEditar").onclick = () => { cerrarMenuCuenta(); abrirEditar(); };
    document.getElementById("mcSalir").onclick = () => {
      cerrarMenuCuenta(); usuario = null; store.set("usuario", null); pintarCuenta(); toast("Cerraste sesión");
      if(location.hash === "#cuenta") location.hash = "inicio"; else refrescar();
    };
  } else {
    z.innerHTML = `<a href="#login" class="btn btn-texto ocultar-movil">Iniciar sesión</a><a href="#registro" class="btn btn-primario">Registrarse</a>`;
  }
}

/* ---------- Inicio ---------- */
function pintarInicio(){
  const hs = document.getElementById("heroS");
  if(hs) hs.innerHTML = opcionesComuna((usuario && usuario.comuna) || "", "Toda Medellín");
  document.getElementById("catsHero").innerHTML = CATS.map(c => {
    const n = todos().filter(t => t.cat === c.k).length;
    return `<button type="button" class="cat" data-cat="${c.k}" style="--c:${cColor(c.k)};--cs:${cSuave(c.k)}">
      <span class="cat-ico">${ICON[c.k]}</span><span class="cat-nombre">${c.label}</span>
      <span class="cat-cuenta">${n} ${n===1?"vecino disponible":"vecinos disponibles"}</span></button>`;
  }).join("");
  pintarLadera();
  const dest = todos().slice().sort((a,b)=>ratingDe(b).r - ratingDe(a).r).slice(0,4);
  document.getElementById("destacados").innerHTML = dest.map(tarjeta).join("");
}

/* ---------- Ladera del hero ---------- */
let laderaLista = false;
function pintarLadera(){
  if(laderaLista) return;
  const svg = document.getElementById("ladera"); if(!svg) return;
  const rnd = i => { const x = Math.sin(i*99.13)*43758.5453; return x - Math.floor(x); };
  const fachadas = ["var(--cat-plomeria)","var(--mango)","var(--cat-electrodomesticos)","var(--cat-otros)","var(--monte-2)","var(--cat-electricidad)"];
  const suelo = x => 400 - x*0.42;
  let casas = "", n = 0;
  for(let fila = 0; fila < 7; fila++){
    for(let x = 6 + (fila%2)*20; x < 590; x += 44){
      const base = suelo(x) + 40 + fila*36;
      if(base > 442 || x + 40 > 598) continue;
      const w = 30 + Math.round(rnd(n)*10), h = 22 + Math.round(rnd(n+7)*16);
      const color = fachadas[Math.floor(rnd(n+3)*fachadas.length)];
      const y = base - h, techo = rnd(n+5) > .7;
      casas += `<g class="casa" style="animation-delay:${(n*18)}ms">
        <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="${color}"/>
        ${techo ? `<path d="M${x-3} ${y} L${x+w/2} ${y-10} L${x+w+3} ${y}z" fill="${color}" opacity=".75"/>` : `<rect x="${x-2}" y="${y-3}" width="${w+4}" height="4" rx="1" fill="${color}" opacity=".7"/>`}
        <rect x="${x+5}" y="${y+6}" width="7" height="7" rx="1" fill="var(--ventana)" opacity=".9"/>
        ${w > 34 ? `<rect x="${x+w-12}" y="${y+6}" width="7" height="7" rx="1" fill="var(--ventana)" opacity=".9"/>` : ""}
      </g>`;
      n++;
    }
  }
  svg.innerHTML = `
    <path d="M0 440 Q140 400 280 300 T600 110 V440 H0z" fill="var(--monte-1)"/>
    <path d="M0 ${suelo(0)+20} L600 ${suelo(600)+20} V440 H0z" fill="var(--monte-2)" opacity=".55"/>
    ${casas}
    <line x1="20" y1="110" x2="600" y2="50" stroke="var(--cable)" stroke-opacity=".45" stroke-width="2"/>
    <g class="cabina"><line x1="40" y1="108" x2="40" y2="116" stroke="var(--cable)" stroke-opacity=".6" stroke-width="2"/>
      <rect x="27" y="116" width="26" height="18" rx="5" fill="var(--mango)"/><rect x="31" y="120" width="18" height="7" rx="2" fill="var(--ventana)"/></g>
    <g class="cabina" style="animation-delay:-7s"><line x1="40" y1="108" x2="40" y2="116" stroke="var(--cable)" stroke-opacity=".6" stroke-width="2"/>
      <rect x="27" y="116" width="26" height="18" rx="5" fill="var(--mango)"/><rect x="31" y="120" width="18" height="7" rx="2" fill="var(--ventana)"/></g>`;
  laderaLista = true;
}

/* ---------- Búsqueda ---------- */
const estado = { q:"", comuna:undefined, cats:new Set(), dist:99999, rating:0, orden:"dist" };
const norm = s => s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();

function pintarFiltros(){
  document.getElementById("filtroCats").innerHTML = CATS.map(c =>
    `<label class="check"><input type="checkbox" value="${c.k}" ${estado.cats.has(c.k)?"checked":""}><span class="punto" style="background:${cColor(c.k)}"></span>${c.label}</label>`).join("");
  document.getElementById("filtroDist").value = String(estado.dist);
  document.getElementById("filtroRating").value = String(estado.rating);
  document.getElementById("orden").value = estado.orden;
  document.getElementById("resQ").value = estado.q;
  const rs = document.getElementById("resS");
  rs.innerHTML = opcionesComuna(origen(), "Toda Medellín");
  document.getElementById("ayudaDist").textContent = origen() ? "" : "Elige una comuna en el buscador para filtrar por cercanía.";
}

function filtrar(){
  const q = norm(estado.q.trim());
  let lista = todos().filter(t => {
    if(estado.cats.size && !estado.cats.has(t.cat)) return false;
    if(estado.dist < 99999 && origen() && distA(t) > estado.dist + 0.01) return false;
    if(ratingDe(t).r < estado.rating) return false;
    if(q){
      const txt = norm([t.nombre, t.titulo, catLabel(t.cat), t.sobre, t.trabajos.join(" ")].join(" "));
      const palabras = q.split(/\s+/);
      if(!palabras.every(p => txt.includes(p) || txt.includes(p.replace(/o$/,"")) )) return false;
    }
    return true;
  });
  lista.sort(estado.orden === "rating" || !origen() ? (a,b)=>ratingDe(b).r-ratingDe(a).r : (a,b)=>(distA(a)-distA(b)) || (ratingDe(b).r-ratingDe(a).r));
  return lista;
}

function pintarResultados(){
  const lista = filtrar();
  const donde = origen() ? ` cerca de ${esc(nombreComuna(origen()))}` : " en Medellín";
  document.getElementById("resumenRes").innerHTML = lista.length
    ? `Encontramos ${lista.length} ${lista.length===1?"trabajador":"trabajadores"}${donde}.`
    : `No encontramos trabajadores con esos filtros${donde}.`;
  const cont = document.getElementById("listaRes");
  cont.innerHTML = lista.length ? lista.map(t => {
    const {r,n} = ratingDe(t);
    return `<div class="fila" data-fila="${t.id}">
      <div class="mini">${avatarSVG(t,200)}</div>
      <div><h3>${esc(t.nombre)}</h3><div class="oficio" style="--c:${cColor(t.cat)}">${catLabel(t.cat)}</div>
        <div class="meta"><span><span class="estrella">★</span> ${n?fmtR(r):"Sin calificar"} ${n?`(${n} opiniones)`:""}</span><span>${lugarCorto(t)}</span><span>${t.anos} ${t.anos==1?"año":"años"} de experiencia</span></div></div>
      <div class="lado"><div class="fila-top">${chipDe(t)}${botonFav(t)}</div><a class="btn btn-primario" href="#perfil-${t.id}">Ver perfil</a></div>
    </div>`;
  }).join("") : `<div class="vacio"><strong>Prueba con menos filtros.</strong><br>Quita la distancia o la calificación mínima, o busca otra categoría.<br><button class="btn btn-secundario" style="margin-top:14px" type="button" id="limpiar2">Limpiar filtros</button></div>`;
  const l2 = document.getElementById("limpiar2"); if(l2) l2.onclick = limpiarFiltros;
  pintarMapa(lista);
}

function pintarMapa(lista){
  const svg = document.getElementById("mapa");
  const W = 800, H = 420;
  const o = comunaDe(origen());
  const kmLon = lat => 111.32 * Math.cos(lat * Math.PI/180), KM_LAT = 110.57;
  let c0, KM;
  if(o){
    // Comuna elegida: centrada y con zoom para ver también sus comunas vecinas
    c0 = o.c; KM = 70;
  } else {
    // Toda Medellín: encuadrar todas las comunas y corregimientos
    const lats = COMUNAS.map(c => c.c[0]), lons = COMUNAS.map(c => c.c[1]);
    const [la1, la2, lo1, lo2] = [Math.min(...lats), Math.max(...lats), Math.min(...lons), Math.max(...lons)];
    c0 = [(la1+la2)/2, (lo1+lo2)/2];
    KM = Math.min((W-300) / ((lo2-lo1) * kmLon(c0[0])), (H-90) / ((la2-la1) * KM_LAT));
  }
  const dx = o ? 0 : 90;   // en la vista completa, correr el mapa para que la nota no tape Palmitas
  const pos = c => ({ x: W/2 + dx + (c[1]-c0[1]) * kmLon(c0[0]) * KM, y: H/2 - (c[0]-c0[0]) * KM_LAT * KM });
  const dentro = p => p.x > -20 && p.x < W+20 && p.y > -20 && p.y < H+20;
  const zoom = !!o, rC = zoom ? 26 : 13, escPin = zoom ? 1 : .7;
  // Río Medellín (trazado aproximado de sur a norte)
  const rio = [[6.130,-75.625],[6.185,-75.595],[6.215,-75.580],[6.245,-75.574],[6.270,-75.568],[6.300,-75.560],[6.360,-75.545]]
    .map(pos).map((p,i)=>(i?"L":"M")+p.x.toFixed(1)+" "+p.y.toFixed(1)).join(" ");
  const etiquetas = COMUNAS.map(c => {
    const p = pos(c.c); if(!dentro(p)) return "";
    const elegida = o && o.n === c.n;
    const txt = c.corregimiento ? (c.corto || c.nombre) : c.n;
    return `<g class="comuna-map${elegida?" elegida":""}${c.corregimiento?" correg":""}" data-comuna="${c.n}" tabindex="0" role="button" aria-label="Ver trabajadores cerca de ${esc(nombreComuna(c.n))}">
      <title>${esc(nombreComuna(c.n))}</title>
      <circle cx="${p.x}" cy="${p.y}" r="${elegida ? rC+6 : rC}"/>
      <text x="${p.x}" y="${p.y + (c.corregimiento ? rC + 14 : 4)}" text-anchor="middle" style="font-size:${zoom?13:10}px">${esc(String(txt))}</text></g>`;
  }).join("");
  // Pines repartidos alrededor del círculo de su comuna para que no se tapen
  const porComuna = {};
  lista.forEach(t => { if(comunaDe(t.comuna)) (porComuna[t.comuna] = porComuna[t.comuna] || []).push(t); });
  const pins = Object.entries(porComuna).flatMap(([n, grupo]) => {
    const p = pos(comunaDe(n).c);
    return grupo.map((t, k) => {
      const a = (-90 + k * 360 / grupo.length + (grupo.length > 1 ? 0 : 35)) * Math.PI/180;
      const r = (rC + 10) * (grupo.length > 6 ? 1.35 : 1);
      const x = p.x + Math.cos(a)*r, y = p.y + Math.sin(a)*r + 8*escPin;
      if(x < -10 || x > W+10 || y < -10 || y > H+30) return "";
      return `<g class="pin" data-pin="${t.id}" tabindex="0" role="button" aria-label="${esc(t.nombre)}, ${catLabel(t.cat)}, ${esc(lugarDe(t))}">
        <title>${esc(t.nombre)} · ${catLabel(t.cat)} · ${esc(lugarDe(t))}</title>
        <g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${escPin})"><path d="M0 2 l-10 -15 a12 12 0 1 1 20 0z" fill="${cColor(t.cat)}" stroke="var(--surface)" stroke-width="2"/><circle cx="0" cy="-18" r="4.5" fill="var(--surface)"/></g></g>`;
    });
  }).join("");
  svg.innerHTML = `<rect width="${W}" height="${H}" fill="var(--surface-2)"/>
    <path d="${rio}" stroke="var(--mapa-agua)" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    ${etiquetas}${pins}`;
  const nota = document.getElementById("mapaNota");
  if(nota) nota.innerHTML = o
    ? `<strong>${usuario && +usuario.comuna === o.n ? "Tu comuna: " : ""}${esc(nombreComuna(o.n))}</strong><br>Toca otra comuna para cambiar o la misma para ver toda Medellín. Nunca mostramos direcciones exactas.`
    : `<strong>Trabajadores por comuna</strong><br>Elige tu comuna en el buscador o toca una comuna en el mapa.`;
  const ley = document.getElementById("leyenda");
  if(ley) ley.innerHTML = CATS.map(c => `<span><i style="background:${cColor(c.k)}"></i>${c.label}</span>`).join("");
}

function enfocar(id){
  document.querySelectorAll(".fila.foco,.pin.foco").forEach(e=>e.classList.remove("foco"));
  const f = document.querySelector(`[data-fila="${id}"]`); const p = document.querySelector(`[data-pin="${id}"]`);
  if(f){ f.classList.add("foco"); f.scrollIntoView({behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto":"smooth", block:"center"}); }
  if(p) p.classList.add("foco");
}

function limpiarFiltros(){
  estado.q=""; estado.comuna=undefined; estado.cats.clear(); estado.dist=99999; estado.rating=0; estado.orden="dist";
  pintarFiltros(); pintarResultados();
}

/* ---------- Perfil ---------- */
let vistaVecino = false; // el dueño está previsualizando su perfil como lo ve un vecino
const esPropio = t => !!(usuario && t && usuario.tid === t.id);
const tieneFoto = g => typeof g === "object" && (g.f || g.src);

function completitud(t){
  const pasos = [
    {ok: !!t.foto, txt: "Sube una foto de perfil", campo: "eFoto"},
    {ok: (t.sobre||"").trim().length >= 30, txt: "Escribe una presentación de al menos 30 letras", campo: "eSobre"},
    {ok: t.trabajos.length >= 2, txt: "Agrega al menos 2 trabajos que realizas", campo: "eTrabajos"},
    {ok: t.anos > 0, txt: "Indica tus años de experiencia", campo: "eAnos"},
    {ok: t.galeria.filter(tieneFoto).length >= 3, txt: "Sube 3 fotos de trabajos que hayas hecho", campo: "galeria"}
  ];
  return {pasos, pct: Math.round(100 * pasos.filter(p=>p.ok).length / pasos.length)};
}

function pintarPerfil(id){
  const t = usuario && usuario.tid === id ? (miTrabajador() || buscarT(id)) : buscarT(id);
  const cont = document.getElementById("perfilCont");
  document.getElementById("btnVolver").hidden = esPropio(t);
  if(!t){ cont.innerHTML = `<div class="vacio" style="margin-bottom:48px"><strong>Este perfil ya no está disponible.</strong><br><a href="#buscar">Busca otros trabajadores cerca de ti</a></div>`; return; }
  const propio = esPropio(t);
  if(!propio) vistaVecino = false;
  const esMio = propio && !vistaVecino;          // mostrar controles de edición
  const {r,n} = ratingDe(t);
  const todasRes = (resenasUsuario[t.id]||[]).slice().reverse().concat(t.res);
  const estrellas = n ? "★".repeat(Math.round(r)) + "☆".repeat(5-Math.round(r)) : "☆☆☆☆☆";
  const comp = completitud(t);
  const vacioTxt = (mio, publico) => `<p class="texto-vacio">${esMio ? mio : publico}</p>`;

  const accionesCab = esMio
    ? `<button class="btn btn-primario" type="button" id="btnEditarPerfil">${ICON.lapiz} Editar perfil</button>
       <button class="btn btn-borde" type="button" id="btnVistaVecino">${ICON.ojo} Ver como vecino</button>`
    : `<button class="btn btn-primario" type="button" id="btnContactar">Contactar</button>
       <button class="btn btn-borde" type="button" id="btnFavPerfil" aria-pressed="${favoritos.has(t.id)}">${favoritos.has(t.id)?"Guardado en favoritos":"Guardar en favoritos"}</button>`;

  const banda = !propio ? "" : vistaVecino
    ? `<div class="banda-propia previa">${ICON.ojo}<div><strong>Así ven tu perfil los vecinos.</strong> Los botones de contacto no funcionan en esta vista previa.</div><button class="btn btn-primario" type="button" id="btnSalirPrevia">Volver a editar</button></div>`
    : `<div class="banda-propia"><div><strong>Este es tu perfil público.</strong> Los vecinos lo ven cuando te buscan. Solo tú ves los botones para editarlo.</div></div>`;

  const panelComp = !esMio ? "" : comp.pct === 100
    ? `<div class="panel panel-comp completo"><h2>Tu perfil está completo</h2><p class="texto-vacio">Los perfiles completos generan más confianza. Sigue sumando fotos de tus trabajos nuevos.</p></div>`
    : `<div class="panel panel-comp">
        <div class="panel-cab"><h2>Completa tu perfil</h2><strong class="pct">${comp.pct} %</strong></div>
        <div class="barra" role="progressbar" aria-valuenow="${comp.pct}" aria-valuemin="0" aria-valuemax="100" aria-label="Perfil completo"><span style="width:${comp.pct}%"></span></div>
        <ul class="comp-pasos">${comp.pasos.map(p=>`<li class="${p.ok?"hecho":""}">${p.ok?`<span>${esc(p.txt)}</span>`:`<button type="button" class="enlace" data-ir-campo="${p.campo}">${esc(p.txt)}</button>`}</li>`).join("")}</ul>
      </div>`;

  cont.innerHTML = `${banda}<div class="perfil-grid">
    <div>
      <div class="panel panel-principal">
        <div class="perfil-cab">
          <div class="avatar-xl">${avatarSVG(t,200)}</div>
          <div>
            <h1>${esc(t.nombre)} ${chipDe(t)}</h1>
            <div class="oficio" style="--c:${cColor(t.cat)}">${esc(t.titulo)}</div>
            <div class="meta"><span><span class="estrella">★</span> ${n?fmtR(r):"Sin calificar"} ${n?`(${n} opiniones)`:""}</span><span>${lugarCorto(t)}</span></div>
            <div class="modal-acciones">${accionesCab}</div>
          </div>
        </div>
      </div>
      <div class="panel"><div class="panel-cab"><h2>Sobre mí</h2>${esMio?`<button type="button" class="enlace" data-ir-campo="eSobre">Editar</button>`:""}</div>
        ${(t.sobre||"").trim() ? `<p class="texto-suave" style="font-size:.92rem">${esc(t.sobre)}</p>` : vacioTxt("Aún no has escrito tu presentación. Cuéntales a tus vecinos qué haces y cómo trabajas.", "Este trabajador aún no ha escrito su presentación.")}</div>
      <div class="panel"><div class="panel-cab"><h2>Trabajos que realizo</h2>${esMio?`<button type="button" class="enlace" data-ir-campo="eTrabajos">Editar</button>`:""}</div>
        ${t.trabajos.length ? `<ul class="trabajos">${t.trabajos.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>` : vacioTxt("Agrega los trabajos que haces, por ejemplo: cambio de grifos, destape de cañerías.", "Aún no ha agregado trabajos.")}</div>
      <div class="panel" id="panelGaleria"><div class="panel-cab"><h2>Galería de trabajos</h2>${esMio?`<span class="contador">${t.galeria.length}/${MAX_FOTOS}</span>`:""}</div>
        ${t.galeria.length ? `<div class="galeria">${t.galeria.map((g,i)=>figuraTrabajo(t,g,i,esMio)).join("")}</div>` : vacioTxt("Todavía no has subido fotos. Muestra tus mejores trabajos: las fotos de antes y después funcionan como una hoja de vida práctica.", "Todavía no hay fotos. Las fotos de antes y después funcionan como una hoja de vida práctica.")}
        ${esMio ? (t.galeria.length < MAX_FOTOS ? `<form class="subir-foto" id="formFoto">
            <label class="btn btn-borde subir-btn" tabindex="0">${ICON.camara} <span id="fotoNombre">Elegir foto</span><input type="file" id="fotoArchivo" accept="image/*" hidden></label>
            <input type="text" id="fotoTexto" maxlength="60" placeholder="¿Qué trabajo es? Ej. Cambio de grifo" aria-label="Descripción de la foto">
            <button class="btn btn-primario" type="submit">Agregar</button>
            <div class="error" id="errFoto"></div>
          </form>` : `<p class="nota-foto">Llegaste al máximo de ${MAX_FOTOS} fotos. Borra una para subir otra.</p>`) : ""}
      </div>
    </div>
    <div>
      ${panelComp}
      <div class="panel datos">
        <div class="dato"><span class="dato-ico">${ICON.maletin}</span><div>Experiencia<small>${t.anos ? `${t.anos} ${t.anos==1?"año":"años"}` : "Sin indicar"}</small></div></div>
        <div class="dato"><span class="dato-ico">${ICON.ubicacion}</span><div>Ubicación<small>${esc(lugarDe(t))}</small></div></div>
        <div class="dato"><span class="dato-ico" style="background:${cSuave(t.cat)};color:${cColor(t.cat)}">${ICON[catK(t.cat)]}</span><div>Especialidad<small>${catLabel(t.cat)}</small></div></div>
        ${esMio ? `<div class="dato"><span class="dato-ico">${ICON.telefono}</span><div>Tu celular de contacto<small>${esc(t.tel)} · los vecinos lo ven al tocar «Contactar»</small></div></div>` : ""}
      </div>
      <div class="panel">
        <div class="panel-cab">
          <h2>${esMio ? "Lo que dicen tus vecinos" : "Opiniones de otros vecinos"}</h2>
          ${esMio ? "" : `<button class="btn btn-secundario btn-chico" type="button" id="btnCalificar">Calificar</button>`}
        </div>
        <div style="font-size:.9rem;margin-bottom:6px"><span class="estrella">${estrellas}</span> <strong>${n?fmtR(r):"—"}</strong> <span style="color:var(--texto-2)">${n?`(${n} opiniones)`:"Aún sin opiniones"}</span></div>
        ${todasRes.map(x=>`<div class="resena"><div class="ini">${iniciales(x.a)}</div><div><strong style="font-size:.86rem">${esc(x.a)}</strong> <span class="estrella" style="font-size:.8rem">${"★".repeat(x.c)}</span><p>${esc(x.t)}</p><small>${esc(x.h)}</small> · <span class="verificada">Contrató por Red Vecina</span></div></div>`).join("")
          || `<p class="texto-vacio">${esMio ? "Cuando un vecino te contrate por Red Vecina y te califique, su opinión aparecerá aquí." : "Sé el primer vecino en calificar después de contratar."}</p>`}
      </div>
    </div>
  </div>`;

  if(esMio){
    document.getElementById("btnEditarPerfil").onclick = () => abrirEditar();
    document.getElementById("btnVistaVecino").onclick = () => { vistaVecino = true; pintarPerfil(t.id); window.scrollTo(0,0); };
    cont.querySelectorAll("[data-ir-campo]").forEach(b => b.onclick = () => {
      if(b.dataset.irCampo !== "galeria") return abrirEditar(b.dataset.irCampo);
      document.getElementById("panelGaleria").scrollIntoView({behavior:"smooth", block:"start"});
      const lbl = document.querySelector(".subir-btn"); if(lbl) setTimeout(()=>lbl.focus(), 350);
    });
    conectarGaleriaPropia(t);
  } else if(propio){
    document.getElementById("btnSalirPrevia").onclick = () => { vistaVecino = false; pintarPerfil(t.id); };
    const aviso = () => toast("Así verán los vecinos este botón. En tu propio perfil no hace nada.");
    ["btnContactar","btnFavPerfil","btnCalificar"].forEach(id => document.getElementById(id).onclick = aviso);
  } else {
    document.getElementById("btnContactar").onclick = () => abrirContacto(t);
    document.getElementById("btnCalificar").onclick = () => abrirCalificar(t);
    document.getElementById("btnFavPerfil").onclick = () => { alternarFav(t.id); pintarPerfil(t.id); };
  }
}

/* ---------- Galería de trabajos ---------- */
const MAX_FOTOS = 8;
/* Fotos de ejemplo: Wikimedia Commons. Las licencias CC BY / CC BY-SA exigen dar crédito al autor. */
const FOTOS = {
  "fuga-reparada":           {a:"Sarang", l:"Dominio público", u:"File:BCA_pipe_repaired.jpg"},
  "instalacion-tuberia":     {a:"Staff Sgt. Raul Gonzalez", l:"Dominio público", u:"File:New_Dining_Facility_on_Camp_Delaram_II_120609-M-KH643-031.jpg"},
  "sanitario-mantenimiento": {a:"dirtyboxface", l:"CC BY-SA 2.0", u:"File:Toilet_(8844223790).jpg"},
  "sanitario-nuevo":         {a:"dirtyboxface", l:"CC BY-SA 2.0", u:"File:Toilet_(8844260252).jpg"},
  "cambio-sanitario":        {a:"dirtyboxface", l:"CC BY 2.0", u:"File:Toilet_(8801968878).jpg"},
  "calentador-instalado":    {a:"Audetat", l:"CC BY-SA 3.0", u:"File:ModCon_boiler_system.jpg"},
  "cambio-tuberia":          {a:"Sarang", l:"Dominio público", u:"File:BCA_pipe_repair_2_in_Cabacú.jpg"},
  "tanques-agua":            {a:"PattayaPatrol", l:"CC BY-SA 4.0", u:"File:DZ6_2947_Rooftop_view_in_Pattaya_water_storage_tanks_and_satellite_dishes_tucked_into_a_tiled_roof_cavity.jpg"},
  "calentador-tuberia":      {a:"NIST", l:"Dominio público", u:"File:NIST_1700_(7788040326).jpg"},
  "tablero-electrico":       {a:"Retired electrician", l:"CC0", u:"File:Модульные_блоки_защиты_российских_брендов.jpg"},
  "cambio-toma":             {a:"Santeri Viinamäki", l:"CC BY-SA 4.0", u:"File:Electrician_installing_socket.jpg"},
  "tomas-interruptor":       {a:"Carnby", l:"CC BY-SA 4.0", u:"File:BTicino_Magic_electrical_installation_modern_configuration.jpg"},
  "cableado-vivienda":       {a:"Oregon Department of Transportation", l:"CC BY 2.0", u:"File:Elevator_electrician_(6267811128).jpg"},
  "revision-cableado":       {a:"U.S. Navy / Kenneth Abbate", l:"Dominio público", u:"File:US_Navy_111201-N-OY799-022_Aviation_Electrician's_Mate_Airman_Zachary_King_installs_wiring_aboard_the_Nimitz-class_aircraft_carrier_USS_John_C._Ste.jpg"},
  "instalacion-electrica":   {a:"editor B (Flickr)", l:"CC BY 2.0", u:"File:Electrician_Working.jpg"},
  "reparacion-nevera":       {a:"Shixart1985", l:"CC BY 2.0", u:"File:Person_repairs_a_kitchen_appliance_in_a_home_kitchen.jpg"},
  "lavadoras-mantenimiento": {a:"PattayaPatrol", l:"CC BY-SA 4.0", u:"File:DFC_1275_A_sidewalk_appliance_stall_sheltered_by_tarps_displays_rows_of_washing_machines_and_dryers_while_a_vendor_examines_one_unit.jpg"},
  "televisor-reparacion":    {a:"Metchyves", l:"CC BY-SA 4.0", u:"File:Reparatrice_de_television_15.jpg"},
  "tarjeta-electronica":     {a:"Metchyves", l:"CC BY-SA 4.0", u:"File:Reparatrice_de_television_5.jpg"},
  "reparacion-electronica":  {a:"Metchyves", l:"CC BY-SA 4.0", u:"File:Reparatrice_de_television_11.jpg"},
  "carpinteria":             {a:"Minette Lontsie", l:"CC BY-SA 4.0", u:"File:Carpenter_at_work_2.jpg"},
  "pintura-interior":        {a:"U.S. Navy / Patrick M. Kearney", l:"Dominio público", u:"File:US_Navy_070823-N-9195K-025_Aerographer's_Mate_1st_Class_William_Palmer_uses_a_roller_to_add_a_second_coat_of_paint_to_a_wall_during_a_community_relations_project_at_Voza_Medical_Clinic_in_support_of_Pacific_Partnership.jpg"},
  "pintura-fachada":         {a:"Lukeroberts", l:"CC BY-SA 2.5", u:"File:Modern-Trade-Painter.jpg"}
};

function figuraTrabajo(t, g, i, esMio){
  // g puede ser: texto (perfiles antiguos sin foto), {f,c} foto de ejemplo, {src,c} foto subida por el trabajador
  if(typeof g === "string") g = {c: g};
  let img, credito = "";
  if(g.f && FOTOS[g.f]){
    const cr = FOTOS[g.f];
    img = `<img src="img/trabajos/${g.f}.jpg" alt="${esc(g.c)}" loading="lazy" width="640" height="427">`;
    credito = `<a class="credito" href="https://commons.wikimedia.org/wiki/${encodeURI(cr.u)}" target="_blank" rel="noopener">Foto: ${esc(cr.a)} · ${esc(cr.l)}</a>`;
  } else if(g.src && /^data:image\/(jpeg|png|webp);base64,/.test(g.src)){
    img = `<img src="${g.src}" alt="${esc(g.c||"Trabajo de "+t.nombre)}" loading="lazy">`;
  } else {
    img = `<svg viewBox="0 0 160 110" width="100%" style="display:block" aria-hidden="true"><rect width="160" height="110" fill="${cSuave(t.cat)}"/><g transform="translate(62 30) scale(1.5)" fill="${cColor(t.cat)}" opacity=".8">${ICON[catK(t.cat)].replace(/<\/?svg[^>]*>/g,"")}</g></svg>`;
  }
  const borrar = esMio ? `<button type="button" class="borrar-foto" data-borrar-foto="${i}" aria-label="Borrar foto: ${esc(g.c||"")}">×</button>` : "";
  return `<figure>${borrar}${img}<figcaption>${esc(g.c||"")}${credito}</figcaption></figure>`;
}

/* Reduce la foto a máx. 1000 px y la pasa a JPEG para que quepa en el almacenamiento del navegador */
function comprimirFoto(file, max = 1000){
  return new Promise((ok, falla) => {
    const url = URL.createObjectURL(file), im = new Image();
    im.onload = () => {
      const k = Math.min(1, max / Math.max(im.width, im.height));
      const cv = document.createElement("canvas");
      cv.width = Math.round(im.width * k); cv.height = Math.round(im.height * k);
      cv.getContext("2d").drawImage(im, 0, 0, cv.width, cv.height);
      URL.revokeObjectURL(url);
      ok(cv.toDataURL("image/jpeg", 0.75));
    };
    im.onerror = () => { URL.revokeObjectURL(url); falla(new Error("imagen")); };
    im.src = url;
  });
}

function guardarExtras(){ return store.set("trabajadores", extras); }

function conectarGaleriaPropia(t){
  document.querySelectorAll("[data-borrar-foto]").forEach(b => b.onclick = () => {
    if(!confirm("¿Borrar esta foto de tu galería?")) return;
    t.galeria.splice(+b.dataset.borrarFoto, 1); guardarExtras(); pintarPerfil(t.id); toast("Foto borrada");
  });
  const form = document.getElementById("formFoto"); if(!form) return;
  const archivo = document.getElementById("fotoArchivo"), err = document.getElementById("errFoto");
  archivo.parentElement.onkeydown = e => { if(e.key === "Enter" || e.key === " "){ e.preventDefault(); archivo.click(); } };
  const error = m => { err.textContent = m; err.style.display = m ? "block" : "none"; };
  archivo.onchange = () => { document.getElementById("fotoNombre").textContent = archivo.files[0] ? archivo.files[0].name : "Elegir foto"; error(""); };
  form.onsubmit = async e => {
    e.preventDefault();
    const f = archivo.files[0], texto = document.getElementById("fotoTexto").value.trim();
    if(!f) return error("Elige una foto de un trabajo que hayas hecho.");
    if(!f.type.startsWith("image/")) return error("El archivo tiene que ser una imagen.");
    if(!texto) return error("Escribe qué trabajo muestra la foto.");
    let src;
    try{ src = await comprimirFoto(f); }catch(_){ return error("No pudimos leer esa imagen. Prueba con otra."); }
    t.galeria.push({src, c: texto});
    if(!guardarExtras()){ t.galeria.pop(); return error("No hay espacio para más fotos en este navegador. Borra alguna e intenta de nuevo."); }
    pintarPerfil(t.id); toast("Foto agregada a tu galería");
  };
}

/* ---------- Editar perfil / datos de la cuenta ---------- */
function miTrabajador(){
  if(!usuario || !usuario.tid) return null;
  let t = extras.find(x => x.id === usuario.tid);
  if(!t){
    const fijo = BASE.find(x => x.id === usuario.tid);
    if(fijo){ t = JSON.parse(JSON.stringify(fijo)); extras.push(t); }   // se guarda en el primer cambio
  }
  return t || null;
}
const fmtTel = tel => tel.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");
const opcionesEsp = sel => CATS.map(c => `<option value="${c.k}" ${c.k===sel?"selected":""}>${c.label}</option>`).join("");

function abrirEditar(enfocar){
  const d = document.getElementById("dlgEditar"), f = document.getElementById("formEditar");
  const t = miTrabajador();
  let fotoNueva = t ? (t.foto || null) : null;
  const campo = (id, c, etiqueta, control, error) =>
    `<div class="campo" data-c="${c}"><label for="${id}">${etiqueta}</label>${control}${error?`<div class="error">${error}</div>`:""}</div>`;

  f.innerHTML = `
    <h2>${t ? "Editar tu perfil" : "Editar tus datos"}</h2>
    <p>${t ? "Los cambios se ven de inmediato en tu perfil público." : "Estos datos solo los usamos para tu cuenta. Los trabajadores no ven tu celular."}</p>
    ${t ? `<div class="editar-foto">
      <div class="editar-foto-vista" id="eFotoVista">${avatarSVG(t,200)}</div>
      <div>
        <strong>Foto de perfil</strong>
        <p class="ayuda">Una foto clara de tu cara genera confianza.</p>
        <div class="modal-acciones" style="margin-top:6px">
          <label class="btn btn-borde btn-chico" tabindex="0" id="eFotoLbl">${ICON.camara} Cambiar foto<input type="file" id="eFoto" accept="image/*" hidden></label>
          <button type="button" class="btn btn-texto btn-chico" id="eFotoQuitar" ${fotoNueva?"":"hidden"}>Quitar</button>
        </div>
      </div>
    </div>` : ""}
    ${campo("eNombre","nombre",'Nombre completo <span class="req">*</span>',`<input id="eNombre" type="text" autocomplete="name" value="${esc(usuario.nombre)}">`,"Escribe tu nombre y apellido.")}
    <div class="campos-2">
      ${campo("eTel","tel",'Celular <span class="req">*</span>',`<input id="eTel" type="tel" inputmode="numeric" autocomplete="tel" value="${esc(fmtTel(usuario.tel||""))}">`,"Escribe un celular de 10 dígitos que empiece por 3.")}
      <div></div>
    </div>
    <div class="campos-2">
      ${campo("eComuna","comuna",'Comuna o corregimiento <span class="req">*</span>',`<select id="eComuna" class="sel-comuna"></select>`,"Elige tu comuna o corregimiento.")}
      ${campo("eBarrio","barrio",'Barrio o vereda <span class="req">*</span>',`<select id="eBarrio"></select>`,"Elige tu barrio.")}
    </div>
    ${t ? `<div class="campos-2">
      ${campo("eEsp","esp",'Especialidad <span class="req">*</span>',`<select id="eEsp">${opcionesEsp(t.cat)}</select>`,"Elige tu especialidad.")}
      ${campo("eAnos","anos","Años de experiencia",`<input id="eAnos" type="text" inputmode="numeric" maxlength="2" value="${t.anos||""}">`,"Escribe un número entre 0 y 60.")}
    </div>
    ${campo("eSobre","sobre",'Sobre mí <span class="contador" id="eSobreCont"></span>',`<textarea id="eSobre" maxlength="400" placeholder="Ej. Soy plomero con 5 años de experiencia. Trabajo con puntualidad y dejo todo limpio.">${esc(t.sobre||"")}</textarea>`)}
    ${campo("eTrabajos","trabajos",'Trabajos que realizas <span class="ayuda-inline">uno por línea</span>',`<textarea id="eTrabajos" placeholder="Cambio de grifos&#10;Destape de cañerías&#10;Instalación de duchas">${esc(t.trabajos.join("\n"))}</textarea>`)}` : ""}
    <div class="error error-consent" id="eErrTel" style="margin:0 0 10px">Ese celular ya está registrado en otra cuenta.</div>
    <div class="modal-acciones">
      <button class="btn btn-primario" type="submit">Guardar cambios</button>
      <button class="btn btn-texto" type="button" id="eCancelar">Cancelar</button>
    </div>
    <div class="zona-peligro">
      <button type="button" class="enlace peligro" id="eEliminar">Eliminar mi cuenta</button>
      <span>Borra tu cuenta${t ? ", tu perfil y tus fotos" : ""} de este dispositivo. No se puede deshacer.</span>
    </div>`;

  const $ = id => document.getElementById(id);
  $("eCancelar").onclick = () => d.close();
  $("eEliminar").onclick = () => { d.close(); eliminarCuenta(); };
  $("eTel").oninput = () => { $("eErrTel").style.display = "none"; };
  conectarComunaBarrio($("eComuna"), $("eBarrio"), usuario.comuna, usuario.barrio);

  if(t){
    const sobre = $("eSobre"), cuenta = () => { $("eSobreCont").textContent = `${sobre.value.length}/400`; };
    sobre.oninput = cuenta; cuenta();
    const vista = () => { $("eFotoVista").innerHTML = avatarSVG({...t, foto: fotoNueva}, 200); $("eFotoQuitar").hidden = !fotoNueva; };
    $("eFotoLbl").onkeydown = e => { if(e.key === "Enter" || e.key === " "){ e.preventDefault(); $("eFoto").click(); } };
    $("eFoto").onchange = async () => {
      const file = $("eFoto").files[0]; if(!file) return;
      if(!file.type.startsWith("image/")) return toast("El archivo tiene que ser una imagen.");
      try{ fotoNueva = await comprimirFoto(file, 400); vista(); }catch(_){ toast("No pudimos leer esa imagen. Prueba con otra."); }
    };
    $("eFotoQuitar").onclick = () => { fotoNueva = null; vista(); };
  }

  f.onsubmit = e => {
    e.preventDefault();
    const v = id => $(id).value.trim();
    const marcar = (c, ok) => f.querySelector(`[data-c="${c}"]`).classList.toggle("invalido", !ok);
    let valido = true;
    const chk = (c, cond) => { marcar(c, cond); if(!cond) valido = false; };
    const tel = soloDigitos(v("eTel"));
    chk("nombre", v("eNombre").split(/\s+/).filter(Boolean).length >= 2);
    chk("tel", /^3\d{9}$/.test(tel));
    chk("comuna", !!v("eComuna"));
    chk("barrio", !!v("eBarrio"));
    let anos = 0;
    if(t){
      chk("esp", !!v("eEsp"));
      anos = v("eAnos") === "" ? 0 : parseInt(v("eAnos"), 10);
      chk("anos", Number.isInteger(anos) && anos >= 0 && anos <= 60);
    }
    const otro = /^3\d{9}$/.test(tel) && tel !== usuario.tel && buscarCuenta(tel);
    $("eErrTel").style.display = otro ? "block" : "none";
    if(otro) valido = false;
    if(!valido){ const p = f.querySelector(".invalido input,.invalido select"); if(p) p.focus(); return; }

    const telViejo = usuario.tel;
    usuario.nombre = v("eNombre"); usuario.comuna = +v("eComuna"); usuario.barrio = v("eBarrio"); usuario.sector = usuario.barrio; usuario.tel = tel;
    if(t){
      Object.assign(t, {
        nombre: usuario.nombre, sector: usuario.sector, comuna: usuario.comuna, barrio: usuario.barrio, tel: fmtTel(tel), cat: v("eEsp"), titulo: catLabel(v("eEsp")), anos,
        sobre: v("eSobre"), trabajos: v("eTrabajos").split(/\r?\n/).map(x => x.trim()).filter(Boolean).slice(0, 12)
      });
      if(fotoNueva) t.foto = fotoNueva; else delete t.foto;
      if(!guardarExtras()){ toast("No hay espacio en este navegador para guardar la foto. Prueba con otra más pequeña."); return; }
    }
    if(telViejo && telViejo !== tel) delete cuentas[telViejo];
    cuentas[tel] = usuario;
    store.set("cuentas", cuentas); store.set("usuario", usuario);
    d.close(); pintarCuenta(); refrescar(); toast("Guardamos tus cambios");
  };

  d.showModal();
  if(enfocar && $(enfocar)){
    const el = enfocar === "eFoto" ? $("eFotoLbl") : $(enfocar);
    setTimeout(() => { el.scrollIntoView({block:"center"}); el.focus(); }, 50);
  }
}

function eliminarCuenta(){
  if(!usuario) return;
  const t = miTrabajador();
  const msg = t
    ? "¿Seguro que quieres eliminar tu cuenta? Se borrarán tu perfil de trabajador, tus fotos y tus datos de este dispositivo. No se puede deshacer."
    : "¿Seguro que quieres eliminar tu cuenta? Se borrarán tus datos de este dispositivo. No se puede deshacer.";
  if(!confirm(msg)) return;
  if(t){
    extras = extras.filter(x => x.id !== t.id); guardarExtras();
    if(BASE.some(b => b.id === t.id)){ ocultos.add(t.id); store.set("ocultos", [...ocultos]); }
    favoritos.delete(t.id); store.set("favoritos", [...favoritos]);
  }
  delete cuentas[usuario.tel]; store.set("cuentas", cuentas);
  usuario = null; store.set("usuario", null);
  pintarCuenta(); location.hash = "inicio"; toast("Eliminamos tu cuenta");
}

/* ---------- Mi cuenta (vecinos) ---------- */
const esMiResena = x => usuario && (x.tel ? x.tel === usuario.tel : x.a === usuario.nombre);

function filaTrab(t, derecha){
  return `<div class="fila-trab">
    <a class="fila-trab-av" href="#perfil-${t.id}" aria-hidden="true" tabindex="-1">${avatarSVG(t,200)}</a>
    <div class="fila-trab-txt"><a href="#perfil-${t.id}"><strong>${esc(t.nombre)}</strong></a><span style="--c:${cColor(t.cat)}" class="oficio">${catLabel(t.cat)}</span></div>
    <div class="fila-trab-der">${derecha || ""}</div>
  </div>`;
}

function pintarCuentaVista(){
  const cont = document.getElementById("cuentaCont");
  if(!usuario) return;
  const contratadosL = todos().filter(t => contratados.has(t.id));
  const favL = todos().filter(t => favoritos.has(t.id));
  const misRes = [];
  for(const [id, lista] of Object.entries(resenasUsuario)){
    const t = buscarT(id); if(!t) continue;
    lista.forEach(x => { if(esMiResena(x)) misRes.push({t, x}); });
  }
  const calif = id => (resenasUsuario[id]||[]).find(esMiResena);

  cont.innerHTML = `<div class="perfil-grid cuenta">
    <div>
      <div class="panel">
        <div class="perfil-cab">
          <div class="avatar-redondo" aria-hidden="true">${iniciales(usuario.nombre)}</div>
          <div>
            <h1>${esc(usuario.nombre)}</h1>
            <div class="oficio" style="--c:var(--marca)">Vecino de ${esc(lugarDe(usuario))}</div>
            <div class="meta"><span>${ICON.telefono} ${esc(fmtTel(usuario.tel || ""))}</span></div>
            <div class="modal-acciones">
              <button class="btn btn-primario" type="button" id="btnEditarCuenta">${ICON.lapiz} Editar mis datos</button>
              <a class="btn btn-borde" href="#buscar">Buscar trabajadores</a>
            </div>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-cab"><h2>Trabajadores que contrataste</h2><span class="contador">${contratadosL.length}</span></div>
        ${contratadosL.length ? contratadosL.map(t => {
            const r = calif(t.id);
            return filaTrab(t, r ? `<span class="calificado"><span class="estrella">${"★".repeat(r.c)}</span> Calificado</span>`
                                : `<button class="btn btn-secundario btn-chico" type="button" data-calificar="${t.id}">Calificar</button>`);
          }).join("")
          : `<p class="texto-vacio">Cuando contactes a un trabajador y marques «Ya lo contraté», aparecerá aquí para que lo califiques.</p>`}
      </div>
      <div class="panel">
        <div class="panel-cab"><h2>Tus opiniones</h2><span class="contador">${misRes.length}</span></div>
        ${misRes.length ? misRes.map(({t,x}) => `<div class="resena"><div class="ini">${iniciales(t.nombre)}</div><div><a href="#perfil-${t.id}"><strong style="font-size:.86rem">${esc(t.nombre)}</strong></a> <span class="estrella" style="font-size:.8rem">${"★".repeat(x.c)}</span><p>${esc(x.t)}</p><small>${esc(x.h)}</small></div></div>`).join("")
          : `<p class="texto-vacio">Aún no has calificado a nadie. Tus opiniones ayudan a otros vecinos a elegir bien.</p>`}
      </div>
    </div>
    <div>
      <div class="panel">
        <div class="panel-cab"><h2>Tus favoritos</h2>${favL.length ? `<a class="enlace" href="#favoritos">Ver todos</a>` : ""}</div>
        ${favL.length ? favL.slice(0,4).map(t => filaTrab(t)).join("")
          : `<p class="texto-vacio">Toca el corazón en cualquier trabajador para guardarlo aquí.</p>`}
      </div>
      <div class="panel">
        <h2>Tu privacidad</h2>
        <p class="texto-vacio">Tus datos se usan solo para tu cuenta, según la Ley 1581 de 2012. Los trabajadores no ven tu celular ni tu dirección.</p>
        <button type="button" class="enlace peligro" id="btnEliminarCuenta" style="margin-top:12px">Eliminar mi cuenta</button>
      </div>
    </div>
  </div>`;
  document.getElementById("btnEditarCuenta").onclick = () => abrirEditar();
  document.getElementById("btnEliminarCuenta").onclick = eliminarCuenta;
  cont.querySelectorAll("[data-calificar]").forEach(b => b.onclick = () => abrirCalificar(buscarT(b.dataset.calificar)));
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
    (resenasUsuario[t.id] = resenasUsuario[t.id] || []).push({a: usuario ? usuario.nombre : "Vecino de Red Vecina", tel: usuario ? usuario.tel : undefined, t: txt, c: nota, h: "Hace un momento"});
    store.set("resenas", resenasUsuario);
    d.close(); if(vistaActual === "cuenta") pintarCuentaVista(); else pintarPerfil(t.id); toast("Calificación publicada. ¡Gracias!");
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
  chk("comuna", !!v("rComuna"));
  chk("barrio", !!v("rBarrio"));
  if(rolSel === "trabajador") chk("esp", !!v("rEsp")); else marcar("esp", true);
  const consent = document.getElementById("rConsent").checked;
  document.getElementById("errConsent").style.display = consent ? "none" : "block";
  if(!consent) valido = false;
  const yaExiste = /^3\d{9}$/.test(tel) && buscarCuenta(tel);
  document.getElementById("errExiste").style.display = yaExiste ? "block" : "none";
  if(yaExiste) valido = false;
  if(!valido){ const p = document.querySelector("#formReg .invalido input,#formReg .invalido select"); if(p) p.focus(); return; }

  usuario = { nombre: v("rNombre"), rol: rolSel, comuna: +v("rComuna"), barrio: v("rBarrio"), sector: v("rBarrio"), tel };
  if(rolSel === "trabajador"){
    const id = "t" + Date.now().toString(36);
    const anos = parseInt(v("rAnos"),10) || 0;
    const t = { id, nombre: v("rNombre"), cat: v("rEsp"), titulo: catLabel(v("rEsp")), rating:0, n:0, ang: Math.round(Math.random()*360), anos, comuna: usuario.comuna, barrio: usuario.barrio, sector: usuario.barrio,
      tel: tel.replace(/(\d{3})(\d{3})(\d{4})/,"$1 $2 $3"), color:"#2F5D3A", sobre: v("rSobre"), trabajos: [], galeria: [], res: [], nuevo:true };
    extras.push(t); store.set("trabajadores", extras);
    usuario.tid = id;
  }
  cuentas[tel] = usuario; store.set("cuentas", cuentas);
  store.set("usuario", usuario);
  e.target.reset(); ponerRol("trabajador"); prepararRegistro();
  pintarCuenta();
  toast(`Cuenta creada. Bienvenido, ${usuario.nombre.split(" ")[0]}.`);
  location.hash = usuario.tid ? "perfil-" + usuario.tid : "buscar";
});

function prepararRegistro(){ conectarComunaBarrio(document.getElementById("rComuna"), document.getElementById("rBarrio"), "", ""); }
prepararRegistro();

/* ---------- Iniciar sesión ---------- */
document.getElementById("formLogin").addEventListener("submit", e => {
  e.preventDefault();
  const tel = soloDigitos(document.getElementById("lTel").value);
  const campo = document.querySelector('[data-c="ltel"]');
  const noExiste = document.getElementById("errNoExiste");
  noExiste.style.display = "none";
  const formatoOk = /^3\d{9}$/.test(tel);
  campo.classList.toggle("invalido", !formatoOk);
  if(!formatoOk){ document.getElementById("lTel").focus(); return; }
  const cuenta = buscarCuenta(tel);
  if(!cuenta){ noExiste.style.display = "block"; return; }
  usuario = cuenta; store.set("usuario", usuario);
  e.target.reset();
  pintarCuenta();
  toast(`Bienvenido de nuevo, ${usuario.nombre.split(" ")[0]}.`);
  location.hash = usuario.tid ? "perfil-" + usuario.tid : "buscar";
});
// Si escribe un celular ya registrado en el formulario de registro, ocultar el aviso al corregirlo
document.getElementById("rTel").addEventListener("input", () => { document.getElementById("errExiste").style.display = "none"; });

/* ---------- Eventos generales ---------- */
document.addEventListener("click", e => {
  const fav = e.target.closest("[data-fav]");
  if(fav){ e.stopPropagation(); alternarFav(fav.dataset.fav); refrescar(); return; }
  const sug = e.target.closest("[data-q]");
  if(sug){ estado.q = sug.dataset.q; estado.cats.clear(); location.hash = "buscar"; refrescar(); return; }
  const cat = e.target.closest("[data-cat]");
  if(cat){ estado.cats = new Set([cat.dataset.cat]); estado.q = ""; location.hash = "buscar"; refrescar(); return; }
  const abrir = e.target.closest("[data-abrir]");
  if(abrir){ location.hash = "perfil-" + abrir.dataset.abrir; return; }
  const pin = e.target.closest("[data-pin]");
  if(pin){ enfocar(pin.dataset.pin); return; }
  const cm = e.target.closest("[data-comuna]");
  if(cm) elegirComunaMapa(+cm.dataset.comuna);
});
function elegirComunaMapa(n){ estado.comuna = estado.comuna === n ? 0 : n; pintarFiltros(); pintarResultados(); }
document.addEventListener("keydown", e => {
  if(e.key !== "Enter" && e.key !== " ") return;
  const abrir = e.target.closest && e.target.closest("[data-abrir]");
  if(abrir && e.target === abrir){ e.preventDefault(); location.hash = "perfil-" + abrir.dataset.abrir; }
  const pin = e.target.closest && e.target.closest("[data-pin]");
  if(pin){ e.preventDefault(); enfocar(pin.dataset.pin); return; }
  const cm = e.target.closest && e.target.closest("[data-comuna]");
  if(cm){ e.preventDefault(); elegirComunaMapa(+cm.dataset.comuna); }
});

document.getElementById("formHero").addEventListener("submit", e => {
  e.preventDefault();
  estado.q = document.getElementById("heroQ").value; estado.comuna = +document.getElementById("heroS").value || 0; estado.cats.clear();
  location.hash = "buscar"; refrescar();
});
document.getElementById("formRes").addEventListener("submit", e => {
  e.preventDefault();
  estado.q = document.getElementById("resQ").value; estado.comuna = +document.getElementById("resS").value || 0; pintarFiltros();
  pintarResultados();
});
document.getElementById("filtroCats").addEventListener("change", e => {
  if(e.target.checked) estado.cats.add(e.target.value); else estado.cats.delete(e.target.value);
  pintarResultados();
});
document.getElementById("filtroDist").onchange = e => { estado.dist = +e.target.value; pintarResultados(); };
document.getElementById("resS").onchange = e => { estado.comuna = +e.target.value || 0; pintarFiltros(); pintarResultados(); };
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
};
const filtrosEl = document.getElementById("filtros");
if(filtrosEl && matchMedia("(max-width:900px)").matches) filtrosEl.open = false;

/* ---------- Router ---------- */
let vistaActual = "inicio";
function refrescar(){
  const h = (location.hash || "#inicio").slice(1);
  let vista = h, id = null;
  if(h.startsWith("perfil-")){ vista = "perfil"; id = h.slice(7); }
  if(!document.querySelector(`[data-view="${vista}"]`)) vista = "inicio";
  // Con sesión iniciada no tiene sentido ver el login ni el registro
  if(usuario && (vista === "login" || vista === "registro" || (vista === "cuenta" && usuario.tid))){
    location.replace(usuario.tid ? "#perfil-" + usuario.tid : "#cuenta"); return;
  }
  if(!usuario && vista === "cuenta"){ location.replace("#login"); return; }
  const cambio = vista !== vistaActual || vista === "perfil";
  vistaActual = vista;
  document.querySelectorAll(".vista").forEach(s => s.classList.toggle("activa", s.dataset.view === vista));
  const propio = vista === "perfil" && usuario && usuario.tid === id;
  const nav = propio || vista === "cuenta" || vista === "login" || vista === "registro" ? "cuenta" : vista === "perfil" ? "buscar" : vista;
  document.querySelectorAll("[data-nav]").forEach(a => a.classList.toggle("activo", a.dataset.nav === nav));
  if(vista === "inicio") pintarInicio();
  if(vista === "buscar"){ pintarFiltros(); pintarResultados(); }
  if(vista === "perfil") pintarPerfil(id);
  if(vista === "favoritos") pintarFavoritos();
  if(vista === "cuenta") pintarCuentaVista();
  if(cambio) window.scrollTo(0,0);
}
window.addEventListener("hashchange", refrescar);
pintarCuenta();
refrescar();
})();