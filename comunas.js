/* División político-administrativa de Medellín: 16 comunas y 5 corregimientos.
   Barrios según el Decreto 346 de 2000 (áreas institucionales sin población residente excluidas).
   En los corregimientos se listan centros poblados y veredas.
   "c" es el centro aproximado [latitud, longitud]; solo se usa para ordenar por cercanía y ubicar
   los pines del mapa. Nunca se muestra como ubicación exacta de nadie. */
window.COMUNAS_MEDELLIN = [
  {n:1, nombre:"Popular", c:[6.2955,-75.5470], barrios:[
    "Santo Domingo Savio n.º 1","Santo Domingo Savio n.º 2","Popular","Granizal","Moscú n.º 2","Villa Guadalupe",
    "San Pablo","El Compromiso","Aldea Pablo VI","La Esperanza n.º 2","La Avanzada","Carpinelo"]},
  {n:2, nombre:"Santa Cruz", c:[6.2970,-75.5570], barrios:[
    "La Isla","El Playón de los Comuneros","Pablo VI","La Frontera","La Francia","Andalucía","Villa del Socorro",
    "Villa Niza","Moscú n.º 1","Santa Cruz","La Rosa"]},
  {n:3, nombre:"Manrique", c:[6.2800,-75.5470], barrios:[
    "La Salle","Las Granjas","Campo Valdés n.º 2","Santa Inés","El Raizal","El Pomar","Manrique Central n.º 2",
    "Manrique Oriental","Versalles n.º 1","Versalles n.º 2","La Cruz","Oriente","María Cano - Carambolas",
    "San José La Cima n.º 1","San José La Cima n.º 2"]},
  {n:4, nombre:"Aranjuez", c:[6.2830,-75.5600], barrios:[
    "Berlín","San Isidro","Palermo","Los Álamos","Moravia","Sevilla","San Pedro","Manrique Central n.º 1",
    "Campo Valdés n.º 1","Las Esmeraldas","La Piñuela","Aranjuez","Brasilia","Miranda"]},
  {n:5, nombre:"Castilla", c:[6.2930,-75.5740], barrios:[
    "Castilla","Tricentenario","Héctor Abad Gómez","Toscana","Boyacá","Las Brisas","Florencia","Tejelo","Girardot",
    "Francisco Antonio Zea","Alfonso López","Belalcázar","Caribe","El Progreso"]},
  {n:6, nombre:"Doce de Octubre", c:[6.3040,-75.5860], barrios:[
    "Santander","Doce de Octubre n.º 1","Doce de Octubre n.º 2","Progreso n.º 2","El Triunfo","Mirador del Doce",
    "Picachito","Picacho","San Martín de Porres","Pedregal","La Esperanza","Kennedy"]},
  {n:7, nombre:"Robledo", c:[6.2790,-75.5940], barrios:[
    "Cerro El Volador","San Germán","Facultad de Minas","La Pilarica","Bosques de San Pablo","Altamira","Córdoba",
    "López de Mesa","El Diamante","Miramar","Aures n.º 1","Aures n.º 2","Bello Horizonte","Villa Flora","Palenque",
    "Robledo","Cucaracho","Fuente Clara","Santa Margarita","La Campiña","La Huerta","Olaya Herrera","Pajarito",
    "Monteclaro","Nueva Villa de La Iguaná"]},
  {n:8, nombre:"Villa Hermosa", c:[6.2550,-75.5480], barrios:[
    "Villa Hermosa","La Mansión","San Miguel","La Ladera","Batallón Girardot","Llanaditas","Los Mangos","Enciso",
    "Sucre","El Pinal","Trece de Noviembre","La Libertad","Villatina","San Antonio","Las Estancias","Villa Turbay",
    "La Sierra","Villa Liliam"]},
  {n:9, nombre:"Buenos Aires", c:[6.2370,-75.5530], barrios:[
    "Juan Pablo II","Barrios de Jesús","Ocho de Marzo","Barrio Caicedo","Bomboná n.º 2","Los Cerros - El Vergel",
    "Buenos Aires","Miraflores","Cataluña","La Milagrosa","Gerona","El Salvador","Loreto","Asomadera n.º 1",
    "Asomadera n.º 2","Asomadera n.º 3","Alejandro Echavarría"]},
  {n:10, nombre:"La Candelaria", c:[6.2500,-75.5680], barrios:[
    "Prado","Jesús Nazareno","El Chagualo","Estación Villa","San Benito","Guayaquil","Corazón de Jesús","Calle Nueva",
    "Perpetuo Socorro","Colón","Las Palmas","Bomboná n.º 1","Boston","Los Ángeles","Villanueva","La Candelaria","San Diego"]},
  {n:11, nombre:"Laureles - Estadio", c:[6.2490,-75.5900], barrios:[
    "La Castellana","Las Acacias","Laureles","Conquistadores","San Joaquín","Bolivariana","Lorena","El Velódromo",
    "Florida Nueva","Naranjal","Suramericana","Estadio","Los Colores","Cuarta Brigada","Carlos E. Restrepo"]},
  {n:12, nombre:"La América", c:[6.2540,-75.6050], barrios:[
    "Ferrini","Calasanz","Los Pinos","La América","La Floresta","Santa Lucía","El Danubio","Campo Alegre",
    "Santa Mónica","Barrio Cristóbal","Simón Bolívar","Santa Teresita","Calasanz Parte Alta"]},
  {n:13, nombre:"San Javier", c:[6.2580,-75.6170], barrios:[
    "El Pesebre","Blanquizal","Santa Rosa de Lima","Los Alcázares","Metropolitano","La Pradera","Juan XXIII - La Quiebra",
    "Antonio Nariño","San Javier n.º 1","San Javier n.º 2","Veinte de Julio","El Salado","Nuevos Conquistadores",
    "Las Independencias","El Corazón","Belencito","Betania","La Divisa","Eduardo Santos","El Socorro"]},
  {n:14, nombre:"El Poblado", c:[6.2060,-75.5680], barrios:[
    "Barrio Colombia","Villa Carlota","Castropol","Lalinde","Las Lomas n.º 1","Las Lomas n.º 2","Altos del Poblado",
    "El Tesoro","Los Naranjos","Los Balsos n.º 1","Los Balsos n.º 2","San Lucas","El Diamante n.º 2","El Castillo",
    "Alejandría","La Florida","El Poblado","Manila","Astorga","Patio Bonito","La Aguacatala","Santa María de Los Ángeles"]},
  {n:15, nombre:"Guayabal", c:[6.2130,-75.5860], barrios:[
    "Tenche","Trinidad","Santa Fe","Campo Amor","Cristo Rey","Guayabal","La Colina"]},
  {n:16, nombre:"Belén", c:[6.2290,-75.6010], barrios:[
    "Fátima","Rosales","Belén","Granada","San Bernardo","Las Playas","Diego Echavarría","La Mota","La Hondonada",
    "El Rincón","Loma de los Bernal","La Gloria","Altavista","La Palma","Los Alpes","Las Violetas","Las Mercedes",
    "Nueva Villa del Aburrá","Miravalle","El Nogal - Los Almendros","Cerro Nutibara"]},
  {n:50, nombre:"San Sebastián de Palmitas", corto:"Palmitas", corregimiento:true, c:[6.3400,-75.6900], barrios:[
    "Palmitas Central","La Urquitá","La Sucia","La Aldea","La Suiza","Potrera - Miserenga","La Volcana - Guayabal","La Frisola"]},
  {n:60, nombre:"San Cristóbal", corto:"San Cristóbal", corregimiento:true, c:[6.2800,-75.6370], barrios:[
    "San Cristóbal","El Llano","La Loma","La Palma","Pajarito","Pedregal Alto","San José de la Montaña","Naranjal",
    "El Yolombo","La Ilusión","Las Playas","El Uvito","El Carmelo","La Cuchilla","El Picacho","Travesías","Boquerón","El Patio"]},
  {n:70, nombre:"Altavista", corto:"Altavista", corregimiento:true, c:[6.2220,-75.6300], barrios:[
    "Altavista","Aguas Frías","Buga - Patio Bonito","San José de Manzanillo","San Pablo","El Corazón - El Morro",
    "El Jardín","La Esperanza","Patio Bolas"]},
  {n:80, nombre:"San Antonio de Prado", corto:"San Antonio", corregimiento:true, c:[6.1830,-75.6560], barrios:[
    "San Antonio de Prado","La Florida","Potrerito","El Astillero","El Salado","La Verde","Montañita","Yarumalito"]},
  {n:90, nombre:"Santa Elena", corto:"Santa Elena", corregimiento:true, c:[6.2100,-75.5000], barrios:[
    "Santa Elena","Barro Blanco","Mazo","Piedras Blancas - Matasano","Media Luna","El Plan","Las Palmas",
    "Piedra Gorda","El Placer","El Cerro","El Llano"]}
];
