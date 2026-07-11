# Bitácora de Desarrollo: Sistema de Registro Veterinaria 

Este documento reúne de forma cronológica los requerimientos, consultas y prompts más relevantes realizados durante el diseño y construcción lógica de la aplicación web **Registro Veterinaria**, detallando el objetivo de cada solicitud y el resumen de las soluciones aplicadas.

---

##  Índice de Prompts y Evolución del Proyecto

1. [Corrección inicial de errores sintácticos y lógicos](#1-corrección-inicial-de-errores-sintácticos-y-lógicos)
2. [Flujo de transición de estados secuenciales](#2-flujo-de-transición-de-estados-secuenciales)
3. [Cálculo dinámico de totales parciales](#3-cálculo-dinámico-de-totales-parciales)
4. [Búsqueda parcial de elementos por nombre](#4-búsqueda-parcial-de-elementos-por-nombre)
5. [Limpieza automatizada de la interfaz de búsqueda](#5-limpieza-automatizada-de-la-interfaz-de-búsqueda)
6. [Cláusula de escape para búsquedas vacías](#6-cláusula-de-escape-para-búsquedas-vacías)
7. [Filtrado de datos mediante menús desplegables](#7-filtrado-de-datos-mediante-menús-desplegables)
8. [Resolución de conflictos por sensibilidad a mayúsculas y caracteres fantasma](#8-resolución-de-contingencias-caracteres-fantasma-y-sensibilidad-a-mayúsculas)
9. [Optimización del problema de actualización en eventos `change`](#9-optimización-del-problema-de-actualización-en-eventos-change)
10. [Diseño y centralización de una Ficha de Edición y Eliminación](#10-diseño-y-centralización-de-una-ficha-de-edición-y-eliminación)

---

### 1. Corrección inicial de errores sintácticos y lógicos
* **Prompt:** *"Considerando ambos archivos... ¿qué errores encuentras?"*
* **Resumen de la respuesta:** Se realizó una auditoría de código donde se identificaron fallas críticas de referencia en el DOM, tales como funciones que no recibían parámetros (`validarFormulario` y `mostrarMensaje`), uso erróneo de variables en plural al iterar objetos, elementos creados en memoria que nunca se inyectaban en el árbol HTML (`appendChild`) e IDs mal escritos que impedían limpiar el formulario de manera correcta.

### 2. Flujo de transición de estados secuenciales
* **Prompt:** *"Agregué estas líneas de código para poder cambiar el estado de la mascota de 'pendiente' a 'en atención' y posterior a 'en alta'. ¿Cómo puedo crear una función que haga esto? Guíame en el paso a paso."*
* **Resumen de la respuesta:** Se estructuró un camino de decisiones utilizando condicionales (`if / else if`). La lógica se basó en capturar el índice de la mascota seleccionada en el arreglo, evaluar su string de estado actual, mutarlo al siguiente paso del flujo operativo y volver a ejecutar el renderizado completo de la pantalla para reflejar los cambios en el navegador de manera inmediata.

### 3. Cálculo dinámico de totales parciales
* **Prompt:** *"¿Por qué no está sumando los valores de mascotas según su estado?"*
* **Resumen de la respuesta:** Se detectó que la función matemática encargada de recorrer el arreglo e incrementar los contadores nunca estaba siendo invocada en los momentos críticos del ciclo de vida de los datos. Se sugirió anidar su ejecución directamente al final del proceso de renderizado principal, garantizando que los contadores se actualicen de manera automática ante cualquier inserción o cambio de estado.

### 4. Búsqueda parcial de elementos por nombre
* **Prompt:** *"Necesito generar una función que me permita buscar una mascota por su nombre."*
* **Resumen de la respuesta:** Se diseñó un algoritmo de filtrado utilizando el método nativo `.filter()`. Para optimizar la experiencia de usuario, se implementó una normalización de texto a minúsculas (`.toLowerCase()`) y se sustituyó la comparación estricta por el método `.includes()`, permitiendo búsquedas parciales (coincidencias por caracteres iniciales o fragmentos de nombre).

### 5. Limpieza automatizada de la interfaz de búsqueda
* **Prompt:** *"¿Se puede limpiar la sección de resultados de búsqueda al momento de hacer click en el buscador? Así no se acumulan los resultados anteriores."*
* **Resumen de la respuesta:** Se propuso la creación de una función dedicada a vaciar el HTML de la zona de resultados. Se explicó cómo vincularla mediante listeners especializados, evaluando alternativas como el evento `focus` (al hacer clic dentro del input) o el evento `input` (para actualizar los resultados de búsqueda letra por letra en tiempo real).

### 6. Cláusula de escape para búsquedas vacías
* **Prompt:** *"Me percaté de que al apretar una segunda vez sin escribir nada en el input buscar mascota, me arroja todos los elementos dentro del listado. ¿Cómo puedo evitar que pase eso?"*
* **Resumen de la respuesta:** Se identificó que evaluar una cadena vacía en `.includes("")` siempre devuelve verdadero en JavaScript. Para resolverlo, se introdujo una **cláusula de escape** al principio de la función que verifica si el campo está vacío, interrumpiendo la ejecución del código con un `return` temprano y mostrando un mensaje de advertencia.

### 7. Filtrado de datos mediante menús desplegables
* **Prompt:** *"Mediante algo así... quiero filtrar las mascotas según su estado y que me las muestre en un listado abajo de esto (Adjunta captura de un elemento `<select>`)."*
* **Resumen de la respuesta:** Se guio en la correcta parametrización de la etiqueta `<select>` en el HTML, rellenando los atributos `value` e `id`. En JavaScript se reutilizó la lógica de filtrado de arreglos para comparar de forma exacta la propiedad de estado de las mascotas y renderizar dinámicamente un bloque secundario exclusivo para los resultados filtrados.

### 8. Resolución de contingencias: caracteres fantasma y sensibilidad a mayúsculas
* **Prompt:** *"No me muestra ningún resultado después del filtro." / "¿Dónde está el error en el filtro? Y otra cosa, ¿puedo eliminar el botón filtrar?"*
* **Resumen de la respuesta:** Se detectó un error de sintaxis provocado por un carácter fantasma (una letra `L` suelta) que rompía la interpretación del script. Adicionalmente, se confirmó que al asociar el filtro al evento `change` del elemento select, la actualización se realiza en tiempo real, haciendo que el botón físico "Filtrar" fuese completamente obsoleto y seguro de remover en el HTML.

### 9. Optimización del problema de actualización en eventos `change`
* **Prompt:** *"Por último, no está filtrando por 'Pendiente'."*
* **Resumen de la respuesta:** Se explicó que el evento `change` requiere una variación de valor para dispararse; dado que "Pendiente" era la primera opción por defecto, re-seleccionarla no generaba un cambio. Se presentaron dos soluciones: añadir una opción neutra de instrucción al inicio de la lista desplegable o invocar la función de filtrado directamente en la carga inicial de la página.

### 10. Diseño y centralización de una Ficha de Edición y Eliminación
* **Prompt:** *"Pensé más bien en una sección en el HTML en donde usar la función buscar. Una vez encontrada la mascota, que se despliegue la ficha con los valores para poder editar, y que esta sección tenga 2 botones: guardar y eliminar. Con guardar se guardan los cambios realizados y con eliminar se elimina completamente el documento. ¿Cómo podría hacerlo?"*
* **Resumen de la respuesta:** Se validó el enfoque como una excelente práctica de experiencia de usuario (UX). Se implementó una **Ficha de Edición Dedicada** oculta por defecto mediante estilos CSS (`display: none`), que se hace visible al seleccionar una mascota encontrada. Los botones se conectaron a funciones que sobreescriben los datos en la posición correspondiente del arreglo original (mediante su índice de referencia) o remueven el registro de forma definitiva usando `.splice()`, actualizando en cascada todo el estado de la aplicación.
