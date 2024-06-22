# Jaraxa Care

## Enunciado
El objetivo es realizar una web en React que use el API de OpenFDA (https://open.fda.gov/apis/) para permitir la búsqueda de medicamentos (de los registrados en EEUU). Estos son los requerimientos:

- Debe haber un campo de búsqueda para introducir el texto.
- Se deben mostrar los resultados concordantes (conforme a la petición hecha al API) tras la introducción de texto en el mismo.
- Si hay muchos resultados, idear una forma para permitir acceder a ellos y/o indicar la situación.
- Al pinchar en un resultado, se debe mostrar la máxima información posible del medicamento en una página independiente.
- Debe usarse MaterialUI.

**Se valora:**
- Calidad y limpieza del código entregado.
- Efectividad en la búsqueda.
- Que sea responsive.
- Aspecto visual en general.

## Tabla de Contenidos
1. [Enunciado](#enunciado)
2. [Estructura de Carpetas](#estructura-de-carpetas)
3. [Retos](#retos)
4. [Cosas a Mejorar](#cosas-a-mejorar)
5. [Despliegue](#despliegue)

## Estructura de carpetas
```
.
├── public
│   └── leaf_favicon.png
└── src
    ├── App.jsx
    ├── main.jsx
    ├── components
    │   ├── DrugDetail.jsx // details of an item on a second page
    │   ├── DrugList.jsx // form and main page
    │   ├── DrugListItems.jsx // items of the grid
    │   ├── Footer.jsx
    │   └── Navbar.jsx 
    ├── context
    │   └── ColorModeContext.js // context for managing the theme
    ├── data  // data for debugging
    │   ├── errorResponse.json 
    │   └── successResponse.json 
    ├── hooks
    │   ├── useColorMode.js // theme management
    │   ├── useDrugs.js  // data passing to fetch and handling search results
    │   └── useSearch.js // validation and search handling
    └── services
        └── fetchDrugs.js // data fetching

```

## Retos

En esta prueba he enfrentado varios desafíos. Es la primera vez que utilizo reactRouter y MaterialUI (anteriormente había utilizado Next UI). Además, es la primera vez que me enfrento a la implementación de una paginación o formularios de búsqueda para una API que es bastante "compleja" en términos de su nivel de inglés y documentación.

## Cosas a Mejorar

Se podrían implementar un diseño más sofisticado, incluyendo mejoras en la paleta de colores del darkTheme. Además, sería beneficioso mejorar el DrugDetail, considerando la inclusión de un botón de descarga que genere un PDF con todos los datos del medicamento utilizando React-PDF u herramientas similares. También se podría agregar desplegables con información relevante y recurrente, según las necesidades del cliente.

## Despliegue
### Primer paso

Entrar en el proyecto y actualizar dependencias

```
cd jaraxa
npm i
```
### Segundo paso

Iniciar y abrir el [servidor](http://localhost:5173/)

```
npm run dev
```