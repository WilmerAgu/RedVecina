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
   galeria:[{f:"arreglo-de-fuga-en-llave-de-cocina",c:"Arreglo de fuga en llave de cocina"},{f:"cambio-de-griferia-de-lavamanos",c:"Cambio de grifería de lavamanos"}],
   res:[{a:"Ana Pérez",t:"Excelente servicio, muy puntual y responsable.",c:5,h:"Hace 3 semanas"},{a:"Luis Ramírez",t:"Arregló la fuga en menos de una hora. Muy recomendado.",c:5,h:"Hace 1 mes"},{a:"Marta Gómez",t:"Trabajo de calidad y buen trato.",c:5,h:"Hace 1 mes"}]},
  {id:"andres", nombre:"Andrés Gómez", cat:"electricidad", titulo:"Electricista", rating:4.8, n:19, comuna:4, barrio:"Aranjuez", ang:40, anos:8, tel:"300 000 0002", color:"#3E6E8E",
   sobre:"Electricista residencial. Organizo tableros, cambio tomas e instalo lámparas. Reviso todo antes de irme.",
   trabajos:["Organización de tableros","Cambio de tomas e interruptores","Instalación de lámparas","Revisión de cortos"],
   galeria:[{f:"tablero-de-breakers-organizado",c:"Tablero de breakers organizado"},{f:"iluminacion-de-sala-instalada",c:"Iluminación de sala instalada"}],
   res:[{a:"Paula Restrepo",t:"Dejó el tablero organizado y explicó todo.",c:5,h:"Hace 2 semanas"},{a:"Jorge Mesa",t:"Llegó rápido un domingo, buen precio.",c:4,h:"Hace 2 meses"}]},
  {id:"maria", nombre:"María Fernanda López", cat:"electrodomesticos", titulo:"Técnica en electrodomésticos", rating:5.0, n:14, comuna:10, barrio:"Boston", ang:150, anos:6, tel:"300 000 0003", color:"#8E5A3E",
   sobre:"Reparo neveras, lavadoras y estufas. Diagnóstico honesto: si no vale la pena arreglarlo, te lo digo.",
   trabajos:["Reparación de neveras","Mantenimiento de lavadoras","Revisión de estufas"],
   galeria:[{f:"compresor-de-nevera-cambiado",c:"Compresor de nevera cambiado"},{f:"quemadores-de-estufa-revisados",c:"Quemadores de estufa revisados"}],
   res:[{a:"Sofía Arango",t:"Me salvó la nevera y no me cobró de más.",c:5,h:"Hace 1 semana"},{a:"Camilo Ruiz",t:"Muy honesta con el diagnóstico.",c:5,h:"Hace 3 meses"}]},
  {id:"julian", nombre:"Julián Torres", cat:"plomeria", titulo:"Plomero", rating:4.7, n:11, comuna:2, barrio:"Santa Cruz", ang:200, anos:3, tel:"300 000 0004", color:"#4E7A3F",
   sobre:"Plomero joven y cumplido. Destapo cañerías y cambio sanitarios.",
   trabajos:["Destape de cañerías","Cambio de sanitarios","Instalación de calentadores"],
   galeria:[{f:"sanitario-instalado-en-remodelacion",c:"Sanitario instalado en remodelación"},{f:"calentador-de-paso-instalado",c:"Calentador de paso instalado"}],
   res:[{a:"Diana Castro",t:"Resolvió rápido y dejó todo limpio.",c:5,h:"Hace 1 mes"}]},
  {id:"luis", nombre:"Luis Herrera", cat:"plomeria", titulo:"Plomero", rating:4.6, n:9, comuna:5, barrio:"Castilla", ang:100, anos:10, tel:"300 000 0005", color:"#5B5B8E",
   sobre:"Diez años arreglando tuberías en el barrio. Trabajos grandes y pequeños.",
   trabajos:["Cambio de tubería galvanizada","Reparación de fugas","Instalación de tanques"],
   galeria:[{f:"tanques-de-agua-en-terraza",c:"Tanques de agua en terraza"},{f:"lavaplatos-y-calentador-instalados",c:"Lavaplatos y calentador instalados"}],
   res:[{a:"Hernán Vélez",t:"Sabe mucho, aunque se demoró un poco en llegar.",c:4,h:"Hace 2 meses"}]},
  {id:"diana", nombre:"Diana Ospina", cat:"electricidad", titulo:"Electricista", rating:4.9, n:22, comuna:11, barrio:"Laureles", ang:-110, anos:7, tel:"300 000 0006", color:"#7A3E6E",
   sobre:"Instalaciones eléctricas seguras para casas y locales. Trabajo con materiales certificados.",
   trabajos:["Cableado de casas","Instalación de duchas eléctricas","Iluminación de locales"],
   galeria:[{f:"regatas-para-cableado-nuevo",c:"Regatas para cableado nuevo"},{f:"aplique-de-pared-instalado",c:"Aplique de pared instalado"}],
   res:[{a:"Mónica Gil",t:"Muy profesional y ordenada.",c:5,h:"Hace 3 semanas"}]},
  {id:"oscar", nombre:"Óscar Cardona", cat:"otros", titulo:"Carpintero y pintor", rating:4.5, n:7, comuna:16, barrio:"Belén", ang:250, anos:12, tel:"300 000 0007", color:"#8E7A3E",
   sobre:"Arreglo puertas, closets y muebles. También pinto casas y apartamentos.",
   trabajos:["Ajuste de puertas","Reparación de closets","Pintura de interiores"],
   galeria:[{f:"puerta-de-madera-restaurada",c:"Puerta de madera restaurada"},{f:"preparacion-de-pintura",c:"Preparación de pintura"}],
   res:[{a:"Andrea Lopera",t:"Dejó la puerta como nueva.",c:5,h:"Hace 1 mes"}]},
  {id:"natalia", nombre:"Natalia Ríos", cat:"electrodomesticos", titulo:"Técnica en electrodomésticos", rating:4.7, n:12, comuna:13, barrio:"San Javier n.º 1", ang:310, anos:4, tel:"300 000 0008", color:"#3E8E7A",
   sobre:"Reparación de licuadoras, hornos microondas y televisores.",
   trabajos:["Reparación de microondas","Arreglo de televisores","Mantenimiento de licuadoras"],
   galeria:[{f:"microondas-reparado",c:"Microondas reparado"},{f:"horno-tostador-reparado",c:"Horno tostador reparado"}],
   res:[{a:"Felipe Zapata",t:"Buen servicio y garantía.",c:5,h:"Hace 2 semanas"}]},
  {id:"jhon", nombre:"Jhon Fredy Álvarez", cat:"electricidad", titulo:"Electricista", rating:4.8, n:17, comuna:1, barrio:"Santo Domingo Savio n.º 1", ang:0, anos:9, tel:"300 000 0009", color:"#2F5D3A",
   sobre:"Electricista del barrio desde hace nueve años. Instalo tomas, reviso cortos y cambio contadores con todos los cuidados.",
   trabajos:["Instalación de tomas e interruptores","Organización de tableros","Instalación de lámparas"],
   galeria:[{f:"contador-de-energia-instalado",c:"Contador de energía instalado"},{f:"cambio-de-toma-danada",c:"Cambio de toma dañada"}],
   res:[{a:"Beatriz Arango",t:"Muy puntual y dejó todo limpio. Lo recomiendo.",c:5,h:"Hace 1 semana"},{a:"Juan Camilo Ortiz",t:"Explicó bien el problema y cobró lo justo.",c:5,h:"Hace 2 semanas"}]},
  {id:"ramiro", nombre:"Ramiro Patiño", cat:"otros", titulo:"Albañil", rating:4.6, n:11, comuna:1, barrio:"Granizal", ang:67, anos:15, tel:"300 000 0010", color:"#3E6E8E",
   sobre:"Albañil con quince años de experiencia. Levanto muros, pego baldosa, arreglo goteras y hago planchas pequeñas.",
   trabajos:["Arreglo de goteras","Repello y pañete","Levante de muros"],
   galeria:[{f:"enchape-de-bano",c:"Enchape de baño"},{f:"muro-en-ladrillo",c:"Muro en ladrillo"}],
   res:[{a:"Andrés Felipe Mejía",t:"Explicó bien el problema y cobró lo justo.",c:5,h:"Hace 2 semanas"}]},
  {id:"liliana", nombre:"Liliana Montoya", cat:"electrodomesticos", titulo:"Técnica en electrodomésticos", rating:4.9, n:15, comuna:2, barrio:"Villa del Socorro", ang:134, anos:7, tel:"300 000 0011", color:"#8E5A3E",
   sobre:"Reparo lavadoras, neveras y licuadoras en la casa del cliente. Doy garantía de 30 días en cada arreglo.",
   trabajos:["Arreglo de televisores","Reparación de neveras","Reparación de lavadoras"],
   galeria:[{f:"lavadora-desarmada-para-reparacion",c:"Lavadora desarmada para reparación"},{f:"nevera-enfriando-de-nuevo",c:"Nevera enfriando de nuevo"}],
   res:[{a:"Natalia Duque",t:"Buen trabajo, aunque llegó un poco tarde.",c:4,h:"Hace 3 semanas"},{a:"Mateo Rendón",t:"Resolvió en una sola visita. Excelente.",c:5,h:"Hace 1 mes"}]},
  {id:"wilson", nombre:"Wilson Arango", cat:"electricidad", titulo:"Electricista", rating:4.7, n:13, comuna:3, barrio:"Versalles n.º 1", ang:201, anos:11, tel:"300 000 0012", color:"#4E7A3F",
   sobre:"Electricista residencial. Organizo tableros, instalo duchas eléctricas y dejo todo marcado para que sepas qué es cada circuito.",
   trabajos:["Instalación de tomas e interruptores","Organización de tableros","Instalación de lámparas"],
   galeria:[{f:"tablero-con-cableado-ordenado",c:"Tablero con cableado ordenado"},{f:"toma-con-interruptor",c:"Toma con interruptor"}],
   res:[{a:"Sergio Alzate",t:"Resolvió en una sola visita. Excelente.",c:5,h:"Hace 1 mes"},{a:"Luz Dary Gómez",t:"Muy amable y cuidadoso dentro de la casa.",c:5,h:"Hace 2 meses"}]},
  {id:"gloria", nombre:"Gloria Restrepo", cat:"electrodomesticos", titulo:"Técnica en electrodomésticos", rating:4.8, n:10, comuna:4, barrio:"Palermo", ang:268, anos:8, tel:"300 000 0013", color:"#5B5B8E",
   sobre:"Técnica en neveras y estufas. Llego puntual, explico el daño antes de cobrar y uso repuestos originales.",
   trabajos:["Reparación de microondas","Arreglo de televisores","Reparación de neveras"],
   galeria:[{f:"nevera-revisada-y-funcionando",c:"Nevera revisada y funcionando"},{f:"estufa-a-gas-revisada",c:"Estufa a gas revisada"}],
   res:[{a:"Beatriz Arango",t:"Muy amable y cuidadoso dentro de la casa.",c:5,h:"Hace 2 meses"}]},
  {id:"hernan", nombre:"Hernán Zapata", cat:"otros", titulo:"Cerrajero", rating:4.7, n:19, comuna:5, barrio:"Toscana", ang:335, anos:14, tel:"300 000 0014", color:"#7A3E6E",
   sobre:"Cerrajero a domicilio. Abro puertas, cambio guardas y hago copias de llaves. Atiendo urgencias en el barrio.",
   trabajos:["Copias de llaves","Instalación de chapas","Apertura de puertas"],
   galeria:[{f:"pasador-de-seguridad-instalado",c:"Pasador de seguridad instalado"},{f:"cambio-de-chapa-de-puerta",c:"Cambio de chapa de puerta"}],
   res:[{a:"Andrés Felipe Mejía",t:"Quedó bien. Volvería a llamarlo.",c:4,h:"Hace 1 semana"},{a:"Carolina Vásquez",t:"Muy puntual y dejó todo limpio. Lo recomiendo.",c:5,h:"Hace 2 semanas"}]},
  {id:"fabio", nombre:"Fabio Quintero", cat:"plomeria", titulo:"Plomero", rating:4.6, n:9, comuna:6, barrio:"Santander", ang:42, anos:12, tel:"300 000 0015", color:"#8E7A3E",
   sobre:"Plomero de confianza en el Doce de Octubre. Destapo cañerías, cambio tubería y reparo tanques de sanitario.",
   trabajos:["Cambio de griferías","Reparación de tanques de agua","Arreglo de fugas"],
   galeria:[{f:"lavaplatos-destapado",c:"Lavaplatos destapado"},{f:"cambio-de-sifon-bajo-el-lavaplatos",c:"Cambio de sifón bajo el lavaplatos"}],
   res:[{a:"Natalia Duque",t:"Muy puntual y dejó todo limpio. Lo recomiendo.",c:5,h:"Hace 2 semanas"}]},
  {id:"yesenia", nombre:"Yesenia Correa", cat:"electrodomesticos", titulo:"Técnica en electrodomésticos", rating:4.9, n:8, comuna:6, barrio:"Pedregal", ang:109, anos:5, tel:"300 000 0016", color:"#3E8E7A",
   sobre:"Arreglo lavadoras y hornos microondas. Si no vale la pena repararlo te lo digo sin rodeos.",
   trabajos:["Arreglo de televisores","Reparación de neveras","Reparación de lavadoras"],
   galeria:[{f:"revision-del-tambor-de-lavadora",c:"Revisión del tambor de lavadora"},{f:"lavadora-reparada",c:"Lavadora reparada"}],
   res:[{a:"Sergio Alzate",t:"Explicó bien el problema y cobró lo justo.",c:5,h:"Hace 3 semanas"}]},
  {id:"camilo", nombre:"Camilo Bedoya", cat:"electricidad", titulo:"Electricista", rating:4.7, n:12, comuna:7, barrio:"Aures n.º 1", ang:176, anos:6, tel:"300 000 0017", color:"#2F5D3A",
   sobre:"Electricista técnico del SENA. Hago instalaciones nuevas, cambio cableado viejo y reviso cortos.",
   trabajos:["Instalación de duchas eléctricas","Cambio de cableado","Instalación de tomas e interruptores"],
   galeria:[{f:"cableado-de-interruptores-en-obra",c:"Cableado de interruptores en obra"},{f:"tablero-electrico-nuevo",c:"Tablero eléctrico nuevo"}],
   res:[{a:"Beatriz Arango",t:"Buen trabajo, aunque llegó un poco tarde.",c:4,h:"Hace 1 mes"}]},
  {id:"albeiro", nombre:"Albeiro Gaviria", cat:"plomeria", titulo:"Plomero", rating:4.8, n:24, comuna:7, barrio:"La Pilarica", ang:243, anos:18, tel:"300 000 0018", color:"#3E6E8E",
   sobre:"Dieciocho años como plomero en Robledo. Fugas, calentadores, sanitarios y lavaplatos, sin dejar desorden.",
   trabajos:["Instalación de calentadores","Cambio de griferías","Reparación de tanques de agua"],
   galeria:[{f:"calentador-a-gas-en-cocina",c:"Calentador a gas en cocina"},{f:"lavaplatos-de-acero-instalado",c:"Lavaplatos de acero instalado"}],
   res:[{a:"Andrés Felipe Mejía",t:"Resolvió en una sola visita. Excelente.",c:5,h:"Hace 2 meses"},{a:"Carolina Vásquez",t:"Muy amable y cuidadoso dentro de la casa.",c:5,h:"Hace 1 semana"}]},
  {id:"jairo", nombre:"Jairo Mesa", cat:"plomeria", titulo:"Plomero", rating:4.5, n:7, comuna:8, barrio:"Enciso", ang:310, anos:10, tel:"300 000 0019", color:"#8E5A3E",
   sobre:"Plomero cumplido. Reparo fugas, instalo lavaderos y cambio llaves de paso.",
   trabajos:["Reparación de tanques de agua","Arreglo de fugas","Destape de cañerías"],
   galeria:[{f:"llave-de-cocina-reparada",c:"Llave de cocina reparada"},{f:"lavamanos-de-pedestal-instalado",c:"Lavamanos de pedestal instalado"}],
   res:[{a:"Natalia Duque",t:"Muy amable y cuidadoso dentro de la casa.",c:5,h:"Hace 1 semana"}]},
  {id:"marleny", nombre:"Marleny Ocampo", cat:"otros", titulo:"Pintora", rating:4.9, n:14, comuna:8, barrio:"Llanaditas", ang:17, anos:9, tel:"300 000 0020", color:"#4E7A3F",
   sobre:"Pinto casas por dentro y por fuera. Resano paredes, quito humedad y dejo todo limpio al terminar.",
   trabajos:["Resane de paredes","Tratamiento de humedad","Pintura de interiores"],
   galeria:[{f:"pintura-con-rodillo",c:"Pintura con rodillo"},{f:"sala-pintada",c:"Sala pintada"}],
   res:[{a:"Sergio Alzate",t:"Quedó bien. Volvería a llamarlo.",c:4,h:"Hace 2 semanas"},{a:"Luz Dary Gómez",t:"Muy puntual y dejó todo limpio. Lo recomiendo.",c:5,h:"Hace 3 semanas"}]},
  {id:"esteban", nombre:"Esteban Muñoz", cat:"electricidad", titulo:"Electricista", rating:4.6, n:6, comuna:9, barrio:"Miraflores", ang:84, anos:4, tel:"300 000 0021", color:"#5B5B8E",
   sobre:"Electricista joven y responsable. Instalo lámparas, ventiladores de techo y tomas nuevas.",
   trabajos:["Instalación de tomas e interruptores","Organización de tableros","Instalación de lámparas"],
   galeria:[{f:"ventilador-de-techo-en-sala",c:"Ventilador de techo en sala"},{f:"tomas-nuevas-en-la-pared",c:"Tomas nuevas en la pared"}],
   res:[{a:"Beatriz Arango",t:"Muy puntual y dejó todo limpio. Lo recomiendo.",c:5,h:"Hace 3 semanas"}]},
  {id:"paula", nombre:"Paula Andrea Giraldo", cat:"electrodomesticos", titulo:"Técnica en electrodomésticos", rating:4.8, n:11, comuna:9, barrio:"Cataluña", ang:151, anos:6, tel:"300 000 0022", color:"#7A3E6E",
   sobre:"Reparo televisores, equipos de sonido y hornos microondas. Revisión sin costo si haces el arreglo conmigo.",
   trabajos:["Reparación de lavadoras","Revisión de estufas","Reparación de microondas"],
   galeria:[{f:"microondas-empotrado-instalado",c:"Microondas empotrado instalado"},{f:"ventilador-reparado",c:"Ventilador reparado"}],
   res:[{a:"Andrés Felipe Mejía",t:"Explicó bien el problema y cobró lo justo.",c:5,h:"Hace 1 mes"}]},
  {id:"gustavo", nombre:"Gustavo Henao", cat:"plomeria", titulo:"Plomero", rating:4.9, n:31, comuna:10, barrio:"Prado", ang:218, anos:20, tel:"300 000 0023", color:"#8E7A3E",
   sobre:"Veinte años arreglando tuberías en el centro. Conozco bien las casas antiguas y sus instalaciones.",
   trabajos:["Arreglo de fugas","Destape de cañerías","Cambio de tubería"],
   galeria:[{f:"bano-de-casa-antigua-restaurado",c:"Baño de casa antigua restaurado"},{f:"bano-con-sanitario-y-tina",c:"Baño con sanitario y tina"}],
   res:[{a:"Natalia Duque",t:"Buen trabajo, aunque llegó un poco tarde.",c:4,h:"Hace 2 meses"},{a:"Mateo Rendón",t:"Resolvió en una sola visita. Excelente.",c:5,h:"Hace 1 semana"}]},
  {id:"mauricio", nombre:"Mauricio Vélez", cat:"otros", titulo:"Carpintero", rating:4.8, n:18, comuna:11, barrio:"Los Conquistadores", ang:285, anos:16, tel:"300 000 0024", color:"#3E8E7A",
   sobre:"Carpintero de muebles y puertas. Hago closets a la medida, ajusto puertas y reparo cocinas integrales.",
   trabajos:["Reparación de muebles","Arreglo de cocinas integrales","Ajuste de puertas"],
   galeria:[{f:"closet-empotrado-en-madera",c:"Closet empotrado en madera"},{f:"closet-corredizo-a-la-medida",c:"Closet corredizo a la medida"}],
   res:[{a:"Sergio Alzate",t:"Resolvió en una sola visita. Excelente.",c:5,h:"Hace 1 semana"},{a:"Luz Dary Gómez",t:"Muy amable y cuidadoso dentro de la casa.",c:5,h:"Hace 2 semanas"}]},
  {id:"sandra", nombre:"Sandra Milena Tobón", cat:"plomeria", titulo:"Plomera", rating:4.9, n:16, comuna:12, barrio:"La Floresta", ang:352, anos:7, tel:"300 000 0025", color:"#2F5D3A",
   sobre:"Plomera con siete años de experiencia. Instalo calentadores, griferías y sanitarios con garantía.",
   trabajos:["Instalación de calentadores","Cambio de griferías","Reparación de tanques de agua"],
   galeria:[{f:"instalacion-de-ducha-electrica",c:"Instalación de ducha eléctrica"},{f:"llave-mezcladora-instalada",c:"Llave mezcladora instalada"}],
   res:[{a:"Beatriz Arango",t:"Muy amable y cuidadoso dentro de la casa.",c:5,h:"Hace 2 semanas"},{a:"Juan Camilo Ortiz",t:"Quedó bien. Volvería a llamarlo.",c:4,h:"Hace 3 semanas"}]},
  {id:"felipe", nombre:"Felipe Arboleda", cat:"electricidad", titulo:"Electricista", rating:4.7, n:10, comuna:12, barrio:"Santa Mónica", ang:59, anos:9, tel:"300 000 0026", color:"#3E6E8E",
   sobre:"Electricista certificado RETIE. Revisiones completas de la instalación de la casa y cambios de tablero.",
   trabajos:["Instalación de duchas eléctricas","Cambio de cableado","Instalación de tomas e interruptores"],
   galeria:[{f:"tablero-cerrado-y-marcado",c:"Tablero cerrado y marcado"},{f:"cambio-de-interruptor",c:"Cambio de interruptor"}],
   res:[{a:"Andrés Felipe Mejía",t:"Quedó bien. Volvería a llamarlo.",c:4,h:"Hace 3 semanas"}]},
  {id:"nestor", nombre:"Néstor Úsuga", cat:"plomeria", titulo:"Plomero", rating:4.6, n:9, comuna:13, barrio:"El Salado", ang:126, anos:8, tel:"300 000 0027", color:"#8E5A3E",
   sobre:"Plomero en San Javier. Destapes, cambio de tubería y arreglo de tanques de agua.",
   trabajos:["Destape de cañerías","Cambio de tubería","Instalación de sanitarios"],
   galeria:[{f:"rejilla-de-desague-del-lavaplatos",c:"Rejilla de desagüe del lavaplatos"},{f:"ducha-instalada-en-bano-enchapado",c:"Ducha instalada en baño enchapado"}],
   res:[{a:"Natalia Duque",t:"Muy puntual y dejó todo limpio. Lo recomiendo.",c:5,h:"Hace 1 mes"}]},
  {id:"daniela", nombre:"Daniela Salazar", cat:"electricidad", titulo:"Electricista", rating:4.9, n:12, comuna:14, barrio:"Manila", ang:193, anos:5, tel:"300 000 0028", color:"#4E7A3F",
   sobre:"Electricista para casas y apartamentos. Iluminación, tomas, timbres y revisiones antes de mudanzas.",
   trabajos:["Instalación de lámparas","Revisión de cortos","Instalación de duchas eléctricas"],
   galeria:[{f:"tomacorrientes-nuevos",c:"Tomacorrientes nuevos"},{f:"interruptor-instalado",c:"Interruptor instalado"}],
   res:[{a:"Sergio Alzate",t:"Explicó bien el problema y cobró lo justo.",c:5,h:"Hace 2 meses"}]},
  {id:"rodrigo", nombre:"Rodrigo Posada", cat:"otros", titulo:"Pintor", rating:4.7, n:15, comuna:14, barrio:"Patio Bonito", ang:260, anos:13, tel:"300 000 0029", color:"#5B5B8E",
   sobre:"Pintor de interiores y fachadas. Trabajo con andamio propio y materiales de buena calidad.",
   trabajos:["Pintura de fachadas","Resane de paredes","Pintura de interiores"],
   galeria:[{f:"fachada-pintada",c:"Fachada pintada"},{f:"colores-para-fachada",c:"Colores para fachada"}],
   res:[{a:"Beatriz Arango",t:"Buen trabajo, aunque llegó un poco tarde.",c:4,h:"Hace 1 semana"},{a:"Juan Camilo Ortiz",t:"Resolvió en una sola visita. Excelente.",c:5,h:"Hace 2 semanas"}]},
  {id:"claudia", nombre:"Claudia Jaramillo", cat:"electrodomesticos", titulo:"Técnica en electrodomésticos", rating:4.8, n:13, comuna:15, barrio:"Trinidad", ang:327, anos:10, tel:"300 000 0030", color:"#7A3E6E",
   sobre:"Reparo neveras, nevecones y lavadoras de todas las marcas. Atiendo también los sábados.",
   trabajos:["Revisión de estufas","Reparación de microondas","Arreglo de televisores"],
   galeria:[{f:"secadora-en-mantenimiento",c:"Secadora en mantenimiento"},{f:"lavadora-y-secadora-instaladas",c:"Lavadora y secadora instaladas"}],
   res:[{a:"Andrés Felipe Mejía",t:"Resolvió en una sola visita. Excelente.",c:5,h:"Hace 2 semanas"},{a:"Carolina Vásquez",t:"Muy amable y cuidadoso dentro de la casa.",c:5,h:"Hace 3 semanas"}]},
  {id:"javier", nombre:"Javier Echeverri", cat:"plomeria", titulo:"Plomero", rating:4.5, n:5, comuna:15, barrio:"Campo Amor", ang:34, anos:6, tel:"300 000 0031", color:"#8E7A3E",
   sobre:"Plomero para arreglos rápidos: fugas, sifones, llaves y sanitarios que no paran de llenar.",
   trabajos:["Cambio de tubería","Instalación de sanitarios","Instalación de calentadores"],
   galeria:[{f:"cambio-de-cartucho-de-llave-mezcladora",c:"Cambio de cartucho de llave mezcladora"},{f:"lavamanos-con-grifo-nuevo",c:"Lavamanos con grifo nuevo"}],
   res:[{a:"Natalia Duque",t:"Muy amable y cuidadoso dentro de la casa.",c:5,h:"Hace 3 semanas"}]},
  {id:"leidy", nombre:"Leidy Johana Cano", cat:"electricidad", titulo:"Electricista", rating:0, n:0, comuna:16, barrio:"La Mota", ang:101, anos:2, tel:"300 000 0032", color:"#3E8E7A", nuevo:true,
   sobre:"Electricista recién certificada. Instalo tomas, interruptores y lámparas con precios justos.",
   trabajos:["Instalación de duchas eléctricas","Cambio de cableado","Instalación de tomas e interruptores"],
   galeria:[],
   res:[]},
  {id:"arley", nombre:"Arley Durango", cat:"otros", titulo:"Albañil", rating:0, n:0, comuna:50, barrio:"Palmitas Sector Central", ang:168, anos:12, tel:"300 000 0033", color:"#2F5D3A", nuevo:true,
   sobre:"Albañil del corregimiento. Construyo y reparo muros, pisos y techos de fincas y casas.",
   trabajos:["Levante de muros","Instalación de baldosa","Arreglo de goteras"],
   galeria:[],
   res:[]},
  {id:"edgar", nombre:"Édgar Monsalve", cat:"plomeria", titulo:"Plomero", rating:4.7, n:8, comuna:60, barrio:"Cabecera Urbana San Cristóbal", ang:235, anos:14, tel:"300 000 0034", color:"#3E6E8E",
   sobre:"Plomero en San Cristóbal y sus veredas. Instalo tanques, motobombas y tubería de agua.",
   trabajos:["Destape de cañerías","Cambio de tubería","Instalación de sanitarios"],
   galeria:[{f:"llave-de-lavaplatos-instalada",c:"Llave de lavaplatos instalada"},{f:"remodelacion-de-bano-completo",c:"Remodelación de baño completo"}],
   res:[{a:"Andrés Felipe Mejía",t:"Explicó bien el problema y cobró lo justo.",c:5,h:"Hace 1 semana"}]},
  {id:"yuliana", nombre:"Yuliana Marín", cat:"electricidad", titulo:"Electricista", rating:0, n:0, comuna:70, barrio:"Altavista Sector Central", ang:302, anos:3, tel:"300 000 0035", color:"#8E5A3E", nuevo:true,
   sobre:"Electricista del corregimiento. Cambio cableado, instalo tomas y reviso la luz de casas y fincas.",
   trabajos:["Instalación de duchas eléctricas","Cambio de cableado","Instalación de tomas e interruptores"],
   galeria:[],
   res:[]},
  {id:"ricardo", nombre:"Ricardo Londoño", cat:"electrodomesticos", titulo:"Técnico en electrodomésticos", rating:4.6, n:10, comuna:80, barrio:"Cabecera San Antonio de Prado", ang:9, anos:9, tel:"300 000 0036", color:"#4E7A3F",
   sobre:"Técnico en lavadoras, neveras y estufas a gas en San Antonio de Prado y alrededores.",
   trabajos:["Arreglo de televisores","Reparación de neveras","Reparación de lavadoras"],
   galeria:[{f:"estufa-de-tres-puestos-reparada",c:"Estufa de tres puestos reparada"},{f:"estufa-de-induccion-instalada",c:"Estufa de inducción instalada"}],
   res:[{a:"Sergio Alzate",t:"Resolvió en una sola visita. Excelente.",c:5,h:"Hace 3 semanas"}]},
  {id:"alonso", nombre:"Alonso Betancur", cat:"otros", titulo:"Carpintero", rating:4.9, n:20, comuna:90, barrio:"Santa Elena Sector Central", ang:76, anos:22, tel:"300 000 0037", color:"#5B5B8E",
   sobre:"Carpintero de Santa Elena. Puertas, ventanas, pérgolas y muebles en madera de la región.",
   trabajos:["Ajuste de puertas","Closets a la medida","Reparación de muebles"],
   galeria:[{f:"cocina-en-madera",c:"Cocina en madera"},{f:"gabinetes-de-cocina-reparados",c:"Gabinetes de cocina reparados"}],
   res:[{a:"Beatriz Arango",t:"Muy amable y cuidadoso dentro de la casa.",c:5,h:"Hace 1 mes"},{a:"Juan Camilo Ortiz",t:"Quedó bien. Volvería a llamarlo.",c:4,h:"Hace 2 meses"}]},
  // Perfil real del autor del prototipo. El celular es de ejemplo: con él se puede iniciar sesión.
  {id:"wilmer", nombre:"Wilmer Agudelo", cat:"plomeria", titulo:"Plomero", rating:0, n:0, comuna:2, barrio:"La Francia", ang:20, anos:4, tel:"300 000 0038", color:"#2F5D3A", nuevo:true,
   foto:"img/perfiles/wilmer.jpg",
   sobre:"Arreglo daños en tubería, instalo duchas, hago cualquier tipo de cambio e instalo lavaderos, sanitarios, lavamanos, etc.",
   trabajos:["Reparación e instalación de sanitarios","Cambio de grifos e instalación de lavamanos","Reparación de tuberías","Instalación de duchas y lavaderos"],
   galeria:[{f:"wilmer-sifon-ducha",c:"Reparación del sifón de la ducha: se instala uno nuevo"},{f:"wilmer-cambio-tuberias",c:"Cambio de tuberías por fugas y mal estado"},{f:"wilmer-lavamanos-grifo",c:"Cambio de lavamanos y grifo"},{f:"wilmer-sanitario",c:"Instalación de sanitario"}],
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
  if(t.foto && (/^data:image\/(jpeg|png|webp);base64,/.test(t.foto) || /^img\/perfiles\/[\w-]+\.(jpg|png|webp)$/.test(t.foto)))
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

function origen(){ return estado.comuna !== undefined ? estado.comuna : (miUbic && miUbic.comuna) || (usuario && usuario.comuna) || 0; }
/* Las distancias se miden desde la dirección del vecino si está en la comuna elegida; si no, desde el centro de la comuna */
const usaDireccion = () => !!(miUbic && +miUbic.comuna === +origen());
function puntoOrigen(){
  if(usaDireccion()) return [miUbic.lat, miUbic.lon];
  const c = comunaDe(origen()); return c ? c.c : null;
}
function puntoBarrio(comuna, barrio){ const c = comunaDe(comuna); return c ? ((c.centros && c.centros[barrio]) || c.c) : null; }
const puntoDe = t => puntoBarrio(t.comuna, t.barrio);
function distKm(a, b){
  const r = Math.PI/180, dLat = (b[0]-a[0])*r, dLon = (b[1]-a[1])*r;
  const h = Math.sin(dLat/2)**2 + Math.cos(a[0]*r)*Math.cos(b[0]*r)*Math.sin(dLon/2)**2;
  return 12742 * Math.asin(Math.sqrt(h));
}
const distA = t => { const o = puntoOrigen(), p = puntoDe(t); return o && p ? distKm(o, p) : Infinity; };
const fmtKm = d => d < 1 ? `a ${Math.max(100, Math.round(d * 10) * 100)} m` : `a ${d.toFixed(1).replace(".", ",")} km`;
/* Texto corto de ubicación para tarjetas: "Aranjuez · Comuna 4", "Boston · En tu comuna · a 800 m" */
function lugarCorto(t){
  if(!t.comuna) return esc(t.sector || "Medellín");
  if(esPropio(t)) return `${esc(t.barrio)} · ${comunaCorta(t.comuna)}`;   // en el propio perfil no tiene sentido "en tu comuna"
  const o = origen();
  const misma = o && +o === +t.comuna;
  const etiqueta = misma ? (usaDireccion() || (usuario && +usuario.comuna === +o) ? "En tu comuna" : "En esta comuna") : comunaCorta(t.comuna);
  const km = usaDireccion() ? ` · ${fmtKm(distA(t))}` : "";
  return `${esc(t.barrio)} · ${misma ? `<strong class="misma">${etiqueta}</strong>` : etiqueta}${km}`;
}
function chipDe(t){ return t.nuevo ? '<span class="chip nuevo">Nuevo</span>' : (distA(t) <= (usaDireccion() ? 1.5 : 2.5) ? '<span class="chip">Cercano</span>' : ""); }

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
  cargarUbic();
  const modoTrab = !!(usuario && usuario.tid);
  document.body.classList.toggle("modo-trabajador", modoTrab);
  const logo = document.querySelector(".logo");
  if(logo){ logo.href = modoTrab ? "#perfil-" + usuario.tid : "#inicio"; logo.setAttribute("aria-label", modoTrab ? "Red Vecina, ir a mi perfil" : "Red Vecina, ir al inicio"); }
  const navMio = document.getElementById("navMiPerfil"); if(navMio) navMio.href = modoTrab ? "#perfil-" + usuario.tid : "#inicio";
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
        ${esTrab ? `<button type="button" role="menuitem" id="mcDescargar">Descargar copia de mi perfil</button>` : ""}
        <hr>
        <button type="button" role="menuitem" id="mcSalir">Cerrar sesión</button>
      </div></div>`;
    const btn = document.getElementById("btnCuenta"), menu = document.getElementById("menuCuenta");
    btn.onclick = e => { e.stopPropagation(); menu.hidden = !menu.hidden; btn.setAttribute("aria-expanded", String(!menu.hidden)); };
    document.getElementById("mcPerfil").onclick = () => { cerrarMenuCuenta(); location.hash = esTrab ? "perfil-" + usuario.tid : "cuenta"; };
    document.getElementById("mcEditar").onclick = () => { cerrarMenuCuenta(); abrirEditar(); };
    if(esTrab) document.getElementById("mcDescargar").onclick = () => { cerrarMenuCuenta(); descargarPerfil(); };
    document.getElementById("mcSalir").onclick = () => {
      cerrarMenuCuenta(); usuario = null; store.set("usuario", null); pintarCuenta(); toast("Cerraste sesión");
      if(esTrab || location.hash === "#cuenta") location.hash = "inicio"; else refrescar();
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
  document.getElementById("ayudaDist").textContent = origen() ? (usaDireccion() ? "Cercanas: hasta 3 km de tu dirección." : "") : "Elige una comuna en el buscador para filtrar por cercanía.";
  pintarFormDir();
}

function filtrar(){
  const q = norm(estado.q.trim());
  let lista = todos().filter(t => {
    if(estado.cats.size && !estado.cats.has(t.cat)) return false;
    if(estado.dist < 99999 && origen() && (estado.dist === 0 ? +t.comuna !== +origen() : distA(t) > estado.dist)) return false;
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

/* ---------- Mapa real: Leaflet + OpenStreetMap + límites catastrales ---------- */
let cargaMapas = null;
function cargarScript(src, sri){
  return new Promise((ok, mal) => {
    const s = document.createElement("script"); s.src = src; s.onload = ok; s.onerror = mal;
    if(sri){ s.integrity = sri; s.crossOrigin = ""; }
    document.head.appendChild(s);
  });
}
/* Leaflet y los límites (450 KB) solo se descargan la primera vez que se abre un mapa */
function cargarMapas(){
  if(!cargaMapas) cargaMapas = Promise.all([
    window.L ? null : cargarScript("https://unpkg.com/leaflet@1.9.4/dist/leaflet.js", "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="),
    window.GEO_MEDELLIN ? null : cargarScript("geo-medellin.js")
  ]).catch(e => { cargaMapas = null; throw e; });
  return cargaMapas;
}
const temaOscuro = () => (document.documentElement.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")) === "dark";
/* Mapas estándar de OpenStreetMap: no piden clave. En modo oscuro se oscurecen con un filtro (ver styles.css) */
function ponerTeselas(m){
  if(!m._teselas) m._teselas = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> · Límites: Alcaldía de Medellín'
  }).addTo(m);
  m.getContainer().classList.toggle("mapa-oscuro", temaOscuro());
}
function refrescarTeselas(){
  [mapaRes, mapaPerfil].forEach(m => { if(m) ponerTeselas(m); });
  if(capaComunas) capaComunas.setStyle(estiloComuna);
}
const featuresDe = lista => ({type: "FeatureCollection", features: lista.map(x => ({type: "Feature", properties: {n: x.n, b: x.b}, geometry: x.g}))});
function geoBarrio(comuna, barrio){ return window.GEO_MEDELLIN && GEO_MEDELLIN.barrios.find(x => x.n === +comuna && x.b === barrio); }

/* ¿En qué barrio cae un punto? (punto en polígono sobre los límites catastrales) */
function enPoligono(lon, lat, g){
  const anillo = r => { let c = false; for(let i = 0, j = r.length - 1; i < r.length; j = i++){
    const [xi, yi] = r[i], [xj, yj] = r[j];
    if(((yi > lat) !== (yj > lat)) && (lon < (xj - xi) * (lat - yi) / (yj - yi) + xi)) c = !c; } return c; };
  const polys = g.type === "Polygon" ? [g.coordinates] : g.coordinates;
  return polys.some(p => anillo(p[0]) && !p.slice(1).some(anillo));
}
function barrioEn(lat, lon){
  const x = GEO_MEDELLIN.barrios.find(b => enPoligono(lon, lat, b.g));
  if(!x) return null;
  const c = comunaDe(x.n);
  // Si cae en un área institucional, se asigna igual a la comuna; el barrio queda como referencia
  return {comuna: x.n, barrio: c && c.barrios.includes(x.b) ? x.b : x.b};
}

/* Pequeño desplazamiento fijo por trabajador (70–150 m) para que los pines del mismo barrio no se encimen.
   Refuerza que la ubicación es aproximada: es el barrio, no la casa. */
function desfase(id){
  let h = 0; for(const ch of id) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const a = (h % 360) * Math.PI / 180, r = 0.0007 + (h % 7) * 0.0001;
  return [Math.sin(a) * r, Math.cos(a) * r];
}
const iconoPin = color => L.divIcon({className: "pin-mapa", iconSize: [28, 36], iconAnchor: [14, 35], popupAnchor: [0, -30],
  html: `<svg width="28" height="36" viewBox="0 0 28 36" aria-hidden="true"><path d="M14 35 3.5 20.5a12 12 0 1 1 21 0z" fill="${color}" stroke="#fff" stroke-width="2"/><circle cx="14" cy="13" r="4.5" fill="#fff"/></svg>`});
const iconoYo = () => L.divIcon({className: "pin-yo", iconSize: [40, 40], iconAnchor: [20, 20], popupAnchor: [0, -18], html: "<span>Tú</span>"});

function estiloComuna(f){
  const o = +origen(), sel = f.properties.n === o, osc = temaOscuro();
  if(sel) return {color: "#F2A300", weight: 3, opacity: 1, fillColor: "#FFB627", fillOpacity: .06};
  return {color: osc ? "#5CC594" : "#1F6B4F", weight: 1.2, opacity: .55, fillColor: osc ? "#000" : "#1C2B33", fillOpacity: o ? .14 : .03};
}

let mapaRes = null, capaComunas = null, capaBarrios = null, capaPines = null, marcaYo = null, marcadores = {}, ultimoEncuadre = null;
function pintarMapa(lista){
  const cont = document.getElementById("mapa");
  cargarMapas().then(() => dibujarMapa(lista)).catch(() => {
    cont.innerHTML = `<div class="mapa-error"><strong>No pudimos cargar el mapa.</strong><br>Revisa tu conexión a internet y vuelve a intentarlo.</div>`;
  });
}
function dibujarMapa(lista){
  if(!mapaRes){
    mapaRes = L.map("mapa", {scrollWheelZoom: true, wheelPxPerZoomLevel: 90, zoomControl: false});
    L.control.zoom({position: "topright"}).addTo(mapaRes);
    ponerTeselas(mapaRes);
    capaComunas = L.geoJSON(featuresDe(GEO_MEDELLIN.comunas), {
      style: estiloComuna,
      onEachFeature: (f, l) => { l.bindTooltip(nombreComuna(f.properties.n), {sticky: true}); l.on("click", () => elegirComunaMapa(f.properties.n)); }
    }).addTo(mapaRes);
    capaBarrios = L.layerGroup().addTo(mapaRes);
    capaPines = L.layerGroup().addTo(mapaRes);
  }
  mapaRes.invalidateSize();
  const o = +origen();
  capaComunas.setStyle(estiloComuna);

  // Barrios de la comuna elegida, con su nombre al pasar el cursor
  capaBarrios.clearLayers();
  if(o) L.geoJSON(featuresDe(GEO_MEDELLIN.barrios.filter(b => b.n === o)), {
    style: {color: temaOscuro() ? "#F2BE3A" : "#B07A00", weight: 1, opacity: .7, dashArray: "4 4", fill: true, fillOpacity: 0},
    onEachFeature: (f, l) => l.bindTooltip(f.properties.b, {sticky: true, className: "tip-barrio"})
  }).addTo(capaBarrios);

  // Trabajadores en su barrio (aproximado)
  capaPines.clearLayers(); marcadores = {};
  lista.forEach(t => {
    const p = puntoDe(t); if(!p) return;
    const d = desfase(t.id), {r, n} = ratingDe(t);
    const m = L.marker([p[0] + d[0], p[1] + d[1]], {icon: iconoPin(cColor(t.cat)), title: `${t.nombre} · ${catLabel(t.cat)}`, alt: `${t.nombre}, ${catLabel(t.cat)}`, riseOnHover: true})
      .bindPopup(`<div class="popup-trab"><strong>${esc(t.nombre)}</strong><span class="oficio" style="--c:${cColor(t.cat)}">${catLabel(t.cat)}</span>
        <span>${esc(lugarDe(t))}</span><span>★ ${n ? fmtR(r) + ` (${n})` : "Sin calificar"}${usaDireccion() ? " · " + fmtKm(distA(t)) : ""}</span>
        <a class="btn btn-primario btn-chico" href="#perfil-${t.id}">Ver perfil</a></div>`);
    m.on("click", () => marcarFila(t.id, true));
    m.addTo(capaPines); marcadores[t.id] = m;
  });

  // La dirección del vecino: solo existe en su navegador
  if(marcaYo){ marcaYo.remove(); marcaYo = null; }
  if(miUbic){
    marcaYo = L.marker([miUbic.lat, miUbic.lon], {icon: iconoYo(), draggable: true, zIndexOffset: 1000, title: "Tu dirección (arrástrala para corregirla)", alt: "Tu dirección"})
      .bindPopup("<strong>Tu dirección</strong><br>Solo tú la ves. Si no quedó exacta, arrastra este punto.")
      .addTo(mapaRes);
    marcaYo.on("dragend", e => { const ll = e.target.getLatLng(); fijarMiUbicacion(ll.lat, ll.lng, miUbic.dir, "arrastre"); });
  }

  // Encuadre: la comuna elegida, o toda la zona urbana
  const clave = o + "|" + (miUbic ? miUbic.lat + "," + miUbic.lon : "");
  if(clave !== ultimoEncuadre){
    ultimoEncuadre = clave;
    const capa = o && capaComunas.getLayers().find(l => l.feature.properties.n === o);
    const urbano = L.featureGroup(capaComunas.getLayers().filter(l => l.feature.properties.n < 50));
    mapaRes.fitBounds((capa || urbano).getBounds(), {padding: [24, 24]});
  }

  const nota = document.getElementById("mapaNota");
  if(nota) nota.innerHTML = o
    ? `<strong>${usuario && +usuario.comuna === o ? "Tu comuna: " : ""}${esc(nombreComuna(o))}</strong><br>Los trabajadores aparecen en su barrio, nunca en su casa. Toca otra comuna para cambiar.`
    : `<strong>Toda Medellín</strong><br>Toca una comuna en el mapa o escribe tu dirección para ver quién está más cerca.`;
}

/* Resalta un trabajador en la lista. Desde el mapa, su tarjeta sube a encabezar la lista sin mover la página */
function marcarFila(id, alInicio){
  document.querySelectorAll(".fila.foco").forEach(e => e.classList.remove("foco", "subio"));
  const f = document.querySelector(`[data-fila="${id}"]`); if(!f) return;
  if(alInicio && f.parentElement.firstElementChild !== f){
    f.parentElement.prepend(f);
    void f.offsetWidth;                 // reinicia la animación de entrada
    f.classList.add("subio");
  }
  f.classList.add("foco");
}
function enfocar(id){
  marcarFila(id);
  const m = marcadores[id];
  if(m && mapaRes){ mapaRes.panTo(m.getLatLng()); m.openPopup(); }
}

/* ---------- Dirección del vecino ---------- */
const MEDELLIN_VB = [-75.72, 6.37, -75.47, 6.15];
const espera = ms => new Promise(r => setTimeout(r, ms));
let ultimaConsulta = 0;
/* Nominatim pide máximo una consulta por segundo */
async function nominatim(params){
  const falta = 1100 - (Date.now() - ultimaConsulta); if(falta > 0) await espera(falta);
  ultimaConsulta = Date.now();
  const u = "https://nominatim.openstreetmap.org/search?" + new URLSearchParams({format: "jsonv2", countrycodes: "co", bounded: "1", "accept-language": "es", ...params});
  const r = await fetch(u, {headers: {"Accept": "application/json"}});
  if(!r.ok) throw new Error("servicio");
  return r.json();
}
/* "Calle 107 # 51-20" → {via:"Calle 107", cruce:"Carrera 51"} */
function parsearDireccion(txt){
  const t = txt.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/\s+/g, " ").trim();
  const TIPOS = [[/^(calle|cll?|cl|clle)\b\.?/, "Calle", "Carrera"], [/^(carrera|cra|kra?|cr|carr)\b\.?/, "Carrera", "Calle"],
                 [/^(diagonal|dg|diag)\b\.?/, "Diagonal", "Transversal"], [/^(transversal|tv|tr|transv)\b\.?/, "Transversal", "Diagonal"],
                 [/^(circular|cq|cir)\b\.?/, "Circular", "Carrera"]];
  for(const [re, tipo, otro] of TIPOS){
    const m = t.match(re); if(!m) continue;
    const resto = t.slice(m[0].length).trim();
    const n = resto.match(/^(\d+\s?[a-f]?)(\s?bis)?(\s?sur)?\s*(?:#|no\.?|n°|nº|numero|num)?\s*(\d+\s?[a-f]?)?/);
    if(!n) return null;
    const num = s => s.replace(/\s/g, "").toUpperCase();
    return {via: `${tipo} ${num(n[1])}${n[3] ? " Sur" : ""}`, cruce: n[4] ? `${otro} ${num(n[4])}` : null};
  }
  return null;
}
const puntosDe = g => g.type === "LineString" ? g.coordinates : g.coordinates.flat();
function cajaDe(lista){
  const p = lista.flatMap(x => puntosDe(x.geojson)); if(!p.length) return MEDELLIN_VB; const m = .004;
  return [Math.min(...p.map(c => c[0])) - m, Math.max(...p.map(c => c[1])) + m, Math.max(...p.map(c => c[0])) + m, Math.min(...p.map(c => c[1])) - m];
}
async function tramos(nombre, caja){
  const j = await nominatim({street: nombre, city: "Medellín", limit: "40", dedupe: "0", polygon_geojson: "1", viewbox: caja.join(",")});
  return j.filter(x => x.geojson && /LineString/.test(x.geojson.type));
}
function cruceMasCercano(A, B){
  let m = null;
  for(const x of A) for(const y of B) for(const p of puntosDe(x.geojson)) for(const q of puntosDe(y.geojson)){
    const d = Math.hypot((p[0] - q[0]) * 110.3, (p[1] - q[1]) * 110.6) * 1000;
    if(!m || d < m.d) m = {d, lat: (p[1] + q[1]) / 2, lon: (p[0] + q[0]) / 2};
  }
  return m;
}
async function geocodificar(txt){
  const p = parsearDireccion(txt);
  if(p && p.cruce){
    let A = await tramos(p.via, MEDELLIN_VB);
    if(A.length){
      let B = await tramos(p.cruce, cajaDe(A)), m = cruceMasCercano(A, B);
      if(!m || m.d > 80){ A = await tramos(p.via, cajaDe(B)); const m2 = cruceMasCercano(A, B); if(m2 && (!m || m2.d < m.d)) m = m2; }
      if(m && m.d <= 900) return {lat: m.lat, lon: m.lon, exacto: m.d <= 80};
    }
  }
  // Sitios, barrios o direcciones escritas de otra forma
  const j = await nominatim({q: txt + ", Medellín", limit: "1", viewbox: MEDELLIN_VB.join(",")});
  return j[0] ? {lat: +j[0].lat, lon: +j[0].lon, exacto: false} : null;
}

function claveUbic(){ return "ubic-" + (usuario && usuario.tel ? usuario.tel : "invitado"); }
let miUbic = null;
function cargarUbic(){ miUbic = store.get(claveUbic(), null); }
function mensajeDir(html, tipo){ const el = document.getElementById("dirMsg"); if(el){ el.innerHTML = html; el.dataset.tipo = tipo || ""; } }
function pintarFormDir(){
  const t = document.getElementById("dirTxt"), q = document.getElementById("dirQuitar"); if(!t) return;
  if(document.activeElement !== t) t.value = miUbic ? miUbic.dir : "";
  q.hidden = !miUbic;
  if(miUbic && !document.getElementById("dirMsg").dataset.tipo)
    mensajeDir(`Midiendo distancias desde tu dirección en <strong>${esc(miUbic.barrio)} · ${esc(comunaCorta(miUbic.comuna))}</strong>.`, "");
  if(!miUbic && !document.getElementById("dirMsg").dataset.tipo)
    mensajeDir("Opcional. Se guarda solo en este navegador; para ubicarla la consultamos en OpenStreetMap.", "");
}
async function fijarMiUbicacion(lat, lon, dir, origenDato, exacto){
  await cargarMapas();
  const b = barrioEn(lat, lon);
  if(!b){ mensajeDir("Ese punto queda fuera de Medellín. Escribe una dirección dentro de la ciudad.", "error"); if(marcaYo && miUbic) marcaYo.setLatLng([miUbic.lat, miUbic.lon]); return; }
  miUbic = {lat: +lat.toFixed(6), lon: +lon.toFixed(6), dir, comuna: b.comuna, barrio: b.barrio};
  store.set(claveUbic(), miUbic);
  estado.comuna = b.comuna;
  const donde = `<strong>${esc(b.barrio)} · ${esc(nombreComuna(b.comuna))}</strong>`;
  mensajeDir(origenDato === "arrastre" ? `Listo, quedaste en ${donde}.`
    : exacto === false ? `Te ubicamos cerca de ${donde}, pero no exacto. Arrastra el punto <span class="yo-mini">Tú</span> del mapa hasta tu cuadra.`
    : `Te ubicamos en ${donde}. Si no quedó exacto, arrastra el punto <span class="yo-mini">Tú</span> del mapa.`, "ok");
  pintarFiltros(); pintarResultados();
}
function conectarFormDir(){
  const f = document.getElementById("formDir"); if(!f) return;
  const btn = f.querySelector("button[type=submit]");
  f.onsubmit = async e => {
    e.preventDefault();
    const dir = document.getElementById("dirTxt").value.trim();
    if(dir.length < 4) return mensajeDir("Escribe tu dirección, por ejemplo: Calle 107 # 51-20.", "error");
    btn.disabled = true; mensajeDir("Buscando tu dirección…", "cargando");
    try{
      const r = await geocodificar(dir);
      if(!r) mensajeDir("No encontramos esa dirección. Prueba escribiéndola como <em>Calle 107 # 51-20</em>, con el nombre de tu barrio, o usa tu ubicación.", "error");
      else await fijarMiUbicacion(r.lat, r.lon, dir, "texto", r.exacto);
    }catch(_){ mensajeDir("El servicio de mapas no respondió. Intenta de nuevo en un momento.", "error"); }
    btn.disabled = false;
  };
  document.getElementById("dirGps").onclick = () => {
    if(!navigator.geolocation) return mensajeDir("Tu navegador no permite usar la ubicación.", "error");
    mensajeDir("Pidiendo tu ubicación al navegador…", "cargando");
    navigator.geolocation.getCurrentPosition(
      p => fijarMiUbicacion(p.coords.latitude, p.coords.longitude, "Mi ubicación actual", "gps"),
      () => mensajeDir("No pudimos obtener tu ubicación. Revisa el permiso del navegador o escribe tu dirección.", "error"),
      {enableHighAccuracy: true, timeout: 12000});
  };
  document.getElementById("dirQuitar").onclick = () => {
    store.set(claveUbic(), null); miUbic = null; estado.comuna = undefined;
    mensajeDir("Quitamos tu dirección de este navegador.", "ok");
    pintarFiltros(); pintarResultados();
  };
}

/* ---------- Mini mapa del perfil: el barrio donde trabaja ---------- */
let mapaPerfil = null;
function pintarMapaPerfil(t){
  if(mapaPerfil){ mapaPerfil.remove(); mapaPerfil = null; }
  const el = document.getElementById("mapaPerfil"); if(!el || !t.comuna) return;
  cargarMapas().then(() => {
    if(!document.body.contains(el)) return;
    mapaPerfil = L.map(el, {scrollWheelZoom: false, zoomControl: false, attributionControl: true});
    ponerTeselas(mapaPerfil);
    const com = GEO_MEDELLIN.comunas.find(c => c.n === +t.comuna);
    if(com) L.geoJSON(featuresDe([com]), {style: {color: "#F2A300", weight: 2, fillOpacity: 0, dashArray: "5 5"}, interactive: false}).addTo(mapaPerfil);
    const b = geoBarrio(t.comuna, t.barrio);
    const capa = b ? L.geoJSON(featuresDe([b]), {style: {color: cColor(t.cat), weight: 2.5, fillColor: cColor(t.cat), fillOpacity: .25}, interactive: false}).addTo(mapaPerfil) : null;
    if(capa) mapaPerfil.fitBounds(capa.getBounds(), {padding: [18, 18], maxZoom: 15});
    else { const p = puntoDe(t); mapaPerfil.setView(p, 14); }
  }).catch(() => { el.innerHTML = `<div class="mapa-error">Mapa no disponible sin conexión.</div>`; });
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
          <div class="avatar-xl">${t.foto ? `<button type="button" class="ver-foto" data-ver-foto="perfil" aria-label="Ver foto de perfil más grande">${avatarSVG(t,200)}</button>` : avatarSVG(t,200)}</div>
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
        ${t.comuna ? `<div class="mapa-perfil" id="mapaPerfil" role="img" aria-label="Mapa del barrio ${esc(t.barrio)}"></div>
        <p class="nota-mapa">${esMio ? "Los vecinos ven tu barrio resaltado, nunca tu dirección." : "Zona aproximada: el barrio donde trabaja, no su dirección."}</p>` : ""}
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

  pintarMapaPerfil(t);
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
  "wilmer-sifon-ducha"        : {a:"Wilmer Agudelo", l:"Foto propia"},
  "wilmer-cambio-tuberias"    : {a:"Wilmer Agudelo", l:"Foto propia"},
  "wilmer-lavamanos-grifo"    : {a:"Wilmer Agudelo", l:"Foto propia"},
  "wilmer-sanitario"          : {a:"Wilmer Agudelo", l:"Foto propia"},
  "arreglo-de-fuga-en-llave-de-cocina"     : {a:"Philip Bosma at Dutch Wikipedia (Original text: Philip Bosma", l:"CC BY-SA 3.0", u:"File:Keukenmengkraan.jpg"},
  "cambio-de-griferia-de-lavamanos"        : {a:"NorthernGermanUnion", l:"CC BY-SA 4.0", u:"File:Sink_missing_faucet.jpg"},
  "sanitario-instalado-en-remodelacion"    : {a:"Gaurav Dhwaj Khadka", l:"CC BY-SA 4.0", u:"File:Toilet_and_Bathroom.jpg"},
  "calentador-de-paso-instalado"           : {a:"DryPot", l:"CC BY-SA 3.0", u:"File:Japanese_Electric_Water_Heater.jpg"},
  "tanques-de-agua-en-terraza"             : {a:"Fatma005", l:"CC BY-SA 4.0", u:"File:Modern_Swahili_House_Roof_top_Area.jpg"},
  "lavaplatos-y-calentador-instalados"     : {a:"Marek Ślusarczyk (Tupungato) Photo portfolio", l:"CC BY 3.0", u:"File:003_Rustic_style_tiled_kitchen_sink_area_in_a_rental_apartment_in_Portugal.jpg"},
  "lavaplatos-destapado"                   : {a:"Tony Webster", l:"CC BY 2.0", u:"File:Water_Faucet_Sink_Basin_Disposal_(53659540553).jpg"},
  "cambio-de-sifon-bajo-el-lavaplatos"     : {a:"Tony Webster", l:"CC BY 2.0", u:"File:Under_Sink_-_PVC_Piping.jpg"},
  "calentador-a-gas-en-cocina"             : {a:"Turbojet", l:"CC BY-SA 4.0", u:"File:Wall_mounted_boiler_in_kitchen.jpg"},
  "lavaplatos-de-acero-instalado"          : {a:"Thomas Renger from Stuttgart, Germany", l:"CC BY-SA 2.0", u:"File:Spuelbecken.jpg"},
  "llave-de-cocina-reparada"               : {a:"Fourteenzerozero", l:"CC0", u:"File:Water_running_from_kitchen_tap.jpg"},
  "lavamanos-de-pedestal-instalado"        : {a:"meltdown61", l:"CC0", u:"File:Soap_dish_-_built-in_-_white_sink.jpg"},
  "bano-de-casa-antigua-restaurado"        : {a:"Joe Mabel", l:"CC BY-SA 4.0", u:"File:Sixes,_Oregon_-_Patrick_Hughes_House_-_interior_16_-_bathroom.jpg"},
  "bano-con-sanitario-y-tina"              : {a:"Wendy Harman", l:"CC BY 2.0", u:"File:1823_Bathroom_-tub_and_toilet_-_New_Orleans.jpg"},
  "instalacion-de-ducha-electrica"         : {a:"Andrevruas", l:"CC BY 3.0", u:"File:Chuveiro.JPG"},
  "llave-mezcladora-instalada"             : {a:"Lee Haywood from Wollaton, Nottingham, England", l:"CC BY-SA 2.0", u:"File:Happy,_drunken_tap_(5218741039).jpg"},
  "rejilla-de-desague-del-lavaplatos"      : {a:"Stilfehler", l:"CC BY-SA 3.0", u:"File:Kitchen_sink_drain.jpg"},
  "ducha-instalada-en-bano-enchapado"      : {a:"andrechinn", l:"CC BY 2.0", u:"File:Dual-head_shower_-_Flickr_-_andrechinn.jpg"},
  "cambio-de-cartucho-de-llave-mezcladora" : {a:"Wiki LIC", l:"CC BY-SA 4.0", u:"File:Monomando_y_Cartucho.JPG"},
  "lavamanos-con-grifo-nuevo"              : {a:"Dejan Krsmanovic", l:"CC BY 2.0", u:"File:Old_Ceramic_Sink_and_Faucet_(48456993227).jpg"},
  "llave-de-lavaplatos-instalada"          : {a:"Vyacheslav Argenberg", l:"CC BY 4.0", u:"File:Kitchen,_Tableware,_Rostov-on-Don,_Russia.jpg"},
  "remodelacion-de-bano-completo"          : {a:"Nenad Stojkovic", l:"CC BY 2.0", u:"File:Red_modern_bathroom_interior._(51528276166).jpg"},
  "tablero-de-breakers-organizado"         : {a:"Dmitry G", l:"CC BY-SA 3.0", u:"File:Linnamäe_37_-_fuse_box_is_wired.JPG"},
  "iluminacion-de-sala-instalada"          : {a:"Corey Taratuta", l:"CC BY 2.0", u:"File:New_Orleans_French_Quarter_Apartment_Living_Room_2.jpg"},
  "regatas-para-cableado-nuevo"            : {a:"Dmitry G", l:"CC BY-SA 3.0", u:"File:AL-CU_connection_in_USSR_apartments.JPG"},
  "aplique-de-pared-instalado"             : {a:"Roco Julie", l:"CC BY-SA 2.0", u:"File:Wall_light.jpg"},
  "contador-de-energia-instalado"          : {a:"Hezery99", l:"Dominio público", u:"File:Hezery99-TNB_electricity_meter.jpg"},
  "cambio-de-toma-danada"                  : {a:"Almanta", l:"CC BY-SA 4.0", u:"File:Coverless_DSL_outlet.jpg"},
  "tablero-con-cableado-ordenado"          : {a:"Dmitry G", l:"CC BY-SA 3.0", u:"File:Fuse_box_hager.JPG"},
  "toma-con-interruptor"                   : {a:"Carnby", l:"CC BY-SA 4.0", u:"File:BTicino_Magic_electrical_socket_and_switches_1980s_installation.jpg"},
  "cableado-de-interruptores-en-obra"      : {a:"Paul Cutler from Chaska, USA", l:"CC BY 2.0", u:"File:Three_light_switches_with_exposed_wiring.jpg"},
  "tablero-electrico-nuevo"                : {a:"Dmitry G", l:"CC BY-SA 3.0", u:"File:Fuse_box_for_garage.JPG"},
  "ventilador-de-techo-en-sala"            : {a:"Lisa Heindel", l:"CC BY 2.0", u:"File:1102_Perry_Street_Gretna_LA_Living_room.jpg"},
  "tomas-nuevas-en-la-pared"               : {a:"Taoheedah", l:"CC BY-SA 4.0", u:"File:A_socket_switch.jpg"},
  "tablero-cerrado-y-marcado"              : {a:"Shixart1985", l:"CC BY 2.0", u:"File:Electrical_panel_with_exposed_wiring_in_a_residential_setting.jpg"},
  "cambio-de-interruptor"                  : {a:"dejankrsmanovic", l:"CC BY 2.0", u:"File:Old_Light_Switcher.jpg"},
  "tomacorrientes-nuevos"                  : {a:"U.S. Army USAGA by [null Courtesy]", l:"Dominio público", u:"File:European_electric_socket_(9649876).jpg"},
  "interruptor-instalado"                  : {a:"Santeri Viinamäki", l:"CC BY-SA 4.0", u:"File:White_light_switch.jpg"},
  "compresor-de-nevera-cambiado"           : {a:"Kshew12", l:"CC BY-SA 3.0", u:"File:0416999-2h.JPG"},
  "quemadores-de-estufa-revisados"         : {a:"Tony Webster", l:"CC BY 2.0", u:"File:Gas_Stove_Burners.jpg"},
  "microondas-reparado"                    : {a:"NeoMeesje", l:"CC BY-SA 4.0", u:"File:Microwave_Kitchen.jpg"},
  "horno-tostador-reparado"                : {a:"Infrogmation", l:"CC BY-SA 4.0", u:"File:Hamilton_Beach_Toaster_Oven_Model_31300_-_Door_closed.jpg"},
  "lavadora-desarmada-para-reparacion"     : {a:"No machine-readable author provided. Poo~commonswiki assumed", l:"Dominio público", u:"File:Washing_machine-_without_front.jpg"},
  "nevera-enfriando-de-nuevo"              : {a:"Cosoleto", l:"Dominio público", u:"File:Inside_domestic_refrigerator.JPG"},
  "nevera-revisada-y-funcionando"          : {a:"Bretwa", l:"CC0", u:"File:Food_into_a_refrigerator_-_20111002.jpg"},
  "estufa-a-gas-revisada"                  : {a:"K.Venkataramana", l:"CC BY-SA 4.0", u:"File:Gas_Stove_(two_burners).jpg"},
  "revision-del-tambor-de-lavadora"        : {a:"Santeri Viinamäki", l:"CC BY-SA 4.0", u:"File:Money_in_washing_machine.jpg"},
  "lavadora-reparada"                      : {a:"ברוך שם", l:"CC BY-SA 4.0", u:"File:A_Washing_machine_IMG_3785.jpg"},
  "microondas-empotrado-instalado"         : {a:"Stilfehler", l:"CC BY-SA 4.0", u:"File:California_Kitchen_Microwave_Oven.jpg"},
  "ventilador-reparado"                    : {a:"Donald Trung Quoc Don (Chữ Hán: 徵國單) - Wikimedia Commons - ©", l:"CC BY-SA 4.0", u:"File:Bestron_retro_electric_fan,_Hillegersberg,_Rotterdam_(2021)_02.jpg"},
  "secadora-en-mantenimiento"              : {a:"FASTILY", l:"CC BY-SA 4.0", u:"File:Clothes_dryer_1_2018-09-29.jpg"},
  "lavadora-y-secadora-instaladas"         : {a:"Infrogmation of New Orleans", l:"CC BY 2.0", u:"File:Laundry_time.jpg"},
  "estufa-de-tres-puestos-reparada"        : {a:"Madhumitha Tamil", l:"CC0", u:"File:3_burner_gas_stove.jpg"},
  "estufa-de-induccion-instalada"          : {a:"Erik1980 at Dutch Wikipedia", l:"CC BY-SA 3.0", u:"File:Kookplaat_inductie.JPG"},
  "puerta-de-madera-restaurada"            : {a:"Titus Tscharntke", l:"Dominio público", u:"File:Wooden_brown_door_of_a_house_in_Kerlouan,_Finistére.jpg"},
  "preparacion-de-pintura"                 : {a:"David Mulder", l:"CC BY-SA 2.0", u:"File:Indoor_painting_supplies_(30185142347).jpg"},
  "closet-empotrado-en-madera"             : {a:"Ajsm712", l:"CC BY-SA 4.0", u:"File:Built-in_wardrobe_assembled_in_late_2001_in_Barinas,_Venezuela.jpg"},
  "closet-corredizo-a-la-medida"           : {a:"Shixart1985", l:"CC BY 2.0", u:"File:Cozy_wooden_bedroom_with_floral_bedding.jpg"},
  "cocina-en-madera"                       : {a:"Kotivalo", l:"CC BY-SA 3.0", u:"File:Brown_wood_kitchen_in_attic.jpg"},
  "gabinetes-de-cocina-reparados"          : {a:"Tami Hills", l:"CC BY 2.0", u:"File:New_Orleans_-_Kitchen_upper-before.jpg"},
  "pintura-con-rodillo"                    : {a:"marc falardeau from toronto", l:"CC BY 2.0", u:"File:Blue_paint_roller_(6819216874).jpg"},
  "sala-pintada"                           : {a:"PattayaPatrol", l:"CC BY-SA 4.0", u:"File:DSC_8575_A_cozy_elegantly_furnished_sitting_room_with_two_tufted_armchairs_ornate_gold-accent_tables_patterned_tile_floor_and_rug_warm_lighting_and_decorative_artwork_on_the_walls.jpg"},
  "fachada-pintada"                        : {a:"Bart Everson", l:"CC BY 2.0", u:"File:Mid-City_New_Orleans_Magenta_Trim.jpg"},
  "colores-para-fachada"                   : {a:"United Soybean Board", l:"CC BY 2.0", u:"File:Open_Soy_Paint_Cans_(10481728754).jpg"},
  "enchape-de-bano"                        : {a:"Alf van Beem", l:"CC0", u:"File:Old_bathroom_with_subway_tiles.JPG"},
  "muro-en-ladrillo"                       : {a:"WiseMan42", l:"CC0", u:"File:Brick_wall_of_house_in_Denmark.jpg"},
  "pasador-de-seguridad-instalado"         : {a:"Tony Webster from Laramie, Wyoming, United States", l:"CC BY 2.0", u:"File:Deadbolt_Door_Lock_(48650623173).jpg"},
  "cambio-de-chapa-de-puerta"              : {a:"Belchers Albert", l:"CC BY-SA 3.0", u:"File:Stainless_steel_room_door_handle_lock_keys_Oct-2011_HK_Ip4.jpg"}
};

function figuraTrabajo(t, g, i, esMio){
  // g puede ser: texto (perfiles antiguos sin foto), {f,c} foto de ejemplo, {src,c} foto subida por el trabajador
  if(typeof g === "string") g = {c: g};
  let img, credito = "";
  if(g.f && FOTOS[g.f]){
    const cr = FOTOS[g.f];
    img = `<img src="img/trabajos/${g.f}.jpg" alt="${esc(g.c)}" loading="lazy" width="640" height="427">`;
    if(cr.u) credito = `<a class="credito" href="https://commons.wikimedia.org/wiki/${encodeURI(cr.u)}" target="_blank" rel="noopener">Foto: ${esc(cr.a)} · ${esc(cr.l)}</a>`;
  } else if(g.src && /^data:image\/(jpeg|png|webp);base64,/.test(g.src)){
    img = `<img src="${g.src}" alt="${esc(g.c||"Trabajo de "+t.nombre)}" loading="lazy">`;
  } else {
    img = `<svg viewBox="0 0 160 110" width="100%" style="display:block" aria-hidden="true"><rect width="160" height="110" fill="${cSuave(t.cat)}"/><g transform="translate(62 30) scale(1.5)" fill="${cColor(t.cat)}" opacity=".8">${ICON[catK(t.cat)].replace(/<\/?svg[^>]*>/g,"")}</g></svg>`;
  }
  const borrar = esMio ? `<button type="button" class="borrar-foto" data-borrar-foto="${i}" aria-label="Borrar foto: ${esc(g.c||"")}">×</button>` : "";
  if(!img.startsWith("<svg")) img = `<button type="button" class="ver-foto" data-ver-foto="${i}" aria-label="Ver más grande: ${esc(g.c||"foto del trabajo")}">${img}</button>`;
  return `<figure>${borrar}${img}<figcaption>${esc(g.c||"")}${credito}</figcaption></figure>`;
}

/* ---------- Visor de fotos ---------- */
let visor = {fotos: [], i: 0};
function fotosDe(t){
  const lista = [];
  t.galeria.forEach((g, i) => {
    if(typeof g !== "object") return;
    if(g.f && FOTOS[g.f]){
      const cr = FOTOS[g.f];
      if(!cr.u){ lista.push({i, src: `img/trabajos/${g.f}.jpg`, c: g.c, credito: ""}); return; }   // foto propia del trabajador
      const archivo = cr.u.replace(/^File:/, "");
      lista.push({i, src: `img/trabajos/${g.f}.jpg`, alta: `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(archivo)}?width=1600`, c: g.c,
        credito: `<a href="https://commons.wikimedia.org/wiki/${encodeURI(cr.u)}" target="_blank" rel="noopener">Foto: ${esc(cr.a)} · ${esc(cr.l)}</a>`});
    } else if(g.src && /^data:image\/(jpeg|png|webp);base64,/.test(g.src)) lista.push({i, src: g.src, c: g.c || "Trabajo de " + t.nombre, credito: ""});
  });
  return lista;
}
function abrirVisor(t, cual){
  if(cual === "perfil"){ visor = {fotos: [{src: t.foto, c: "Foto de perfil de " + t.nombre, credito: ""}], i: 0}; }
  else { const fotos = fotosDe(t); visor = {fotos, i: Math.max(0, fotos.findIndex(f => f.i === +cual))}; }
  if(!visor.fotos.length) return;
  const d = document.getElementById("dlgFoto");
  mostrarFoto();
  if(!d.open) d.showModal();
}
function mostrarFoto(){
  const f = visor.fotos[visor.i], img = document.getElementById("fotoGrande"), varias = visor.fotos.length > 1;
  img.src = f.src; img.alt = f.c;
  if(f.alta){   // versión en mayor resolución desde Wikimedia; si no carga, se queda la local
    const alta = new Image(), quien = f;
    alta.onload = () => { if(visor.fotos[visor.i] === quien) img.src = f.alta; };
    alta.src = f.alta;
  }
  document.getElementById("fotoTxt").textContent = f.c;
  document.getElementById("fotoCredito").innerHTML = f.credito;
  document.getElementById("fotoCuenta").textContent = varias ? `${visor.i + 1} de ${visor.fotos.length}` : "";
  document.querySelectorAll(".foto-nav").forEach(b => b.hidden = !varias);
}
function moverFoto(paso){ if(visor.fotos.length < 2) return; visor.i = (visor.i + paso + visor.fotos.length) % visor.fotos.length; mostrarFoto(); }
(function conectarVisor(){
  const d = document.getElementById("dlgFoto");
  d.querySelector(".foto-cerrar").onclick = () => d.close();
  d.querySelector(".foto-nav.ant").onclick = () => moverFoto(-1);
  d.querySelector(".foto-nav.sig").onclick = () => moverFoto(1);
  d.addEventListener("click", e => { if(e.target === d || e.target.classList.contains("foto-escenario")) d.close(); });   // clic fuera de la foto
  d.addEventListener("keydown", e => { if(e.key === "ArrowLeft") moverFoto(-1); if(e.key === "ArrowRight") moverFoto(1); });
  let x0 = null;   // deslizar en el celular
  d.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; }, {passive: true});
  d.addEventListener("touchend", e => { if(x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if(Math.abs(dx) > 50) moverFoto(dx < 0 ? 1 : -1); x0 = null; });
  d.addEventListener("close", () => { document.getElementById("fotoGrande").src = ""; });
})();
document.addEventListener("click", e => {
  const b = e.target.closest("[data-ver-foto]"); if(!b) return;
  const id = (location.hash || "").replace("#perfil-", "");
  const t = usuario && usuario.tid === id ? (miTrabajador() || buscarT(id)) : buscarT(id);
  if(t) abrirVisor(t, b.dataset.verFoto);
});

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

/* Descarga el perfil del trabajador con sus fotos, para guardarlo de forma permanente en el código */
function descargarPerfil(){
  const t = miTrabajador(); if(!t) return;
  const datos = JSON.stringify({version: 1, exportado: new Date().toISOString(), perfil: t}, null, 1);
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([datos], {type: "application/json"}));
  a.download = "perfil-" + t.id + ".json";
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  toast("Descargamos una copia de tu perfil con tus fotos");
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
  store.set(claveUbic(), null);
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

conectarFormDir();

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
  const fila = e.target.closest("[data-fila]");
  if(fila && !e.target.closest("a,button")) enfocar(fila.dataset.fila);
});
function elegirComunaMapa(n){ estado.comuna = estado.comuna === n ? 0 : n; pintarFiltros(); pintarResultados(); }
document.addEventListener("keydown", e => {
  if(e.key !== "Enter" && e.key !== " ") return;
  const abrir = e.target.closest && e.target.closest("[data-abrir]");
  if(abrir && e.target === abrir){ e.preventDefault(); location.hash = "perfil-" + abrir.dataset.abrir; }
  const pin = e.target.closest && e.target.closest("[data-pin]");
  if(pin){ e.preventDefault(); enfocar(pin.dataset.pin); return; }

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
  if(window.L) refrescarTeselas();
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
  if(usuario && usuario.tid && vista !== "nosotros" && !(vista === "perfil" && id === usuario.tid)){
    location.replace("#perfil-" + usuario.tid); return;
  }
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