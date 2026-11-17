# RedVecina


## Fotos de ejemplo

Las fotos de `img/trabajos/` vienen de Wikimedia Commons (dominio público, CC0, CC BY y CC BY-SA). El autor, la licencia y el enlace a la fuente de cada una están en la constante `FOTOS` de `app.js`, y se muestran debajo de cada foto en la galería. Si se reemplaza una foto, hay que actualizar también su crédito.

## Comunas, barrios y mapa

- `comunas.js`: las 16 comunas y los 5 corregimientos con los barrios y veredas que se pueden elegir, y un punto interior de cada uno. Viene de la capa catastral «Límite barrio vereda catastral» de la Alcaldía de Medellín (sincronizada en mayo de 2025, publicada en ArcGIS Online). Se excluyen las áreas institucionales y de expansión.
- `geo-medellin.js` (unos 450 KB): los límites de comunas, barrios y veredas para dibujar el mapa. Se descarga solo cuando se abre un mapa.
- Mapa: [Leaflet](https://leafletjs.com) 1.9.4 con los mapas de [OpenStreetMap](https://www.openstreetmap.org/copyright). En modo oscuro se aplica un filtro de color.
- Dirección del vecino: se busca con [Nominatim](https://nominatim.org) (máximo una consulta por segundo) y se guarda solo en el navegador. Los trabajadores se muestran en su barrio, nunca en su casa.
- Los mapas de OpenStreetMap no cargan si se abre `index.html` como archivo: hay que usar Live Server o GitHub Pages.
