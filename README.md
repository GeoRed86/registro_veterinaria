# 🐾 Sistema de Gestión de Registro Veterinaria

Un sistema web interactivo en formato de **Dashboard** diseñado para clínicas veterinarias, que permite digitalizar el control de pacientes desde su ingreso, monitorear el flujo de sus estados de atención médica en tiempo real y gestionar fichas clínicas mediante búsquedas selectivas.

La aplicación destaca por una interfaz moderna que implementa tendencias de diseño web actual como el **Glassmorphism** (vidrio esmerilado translúcido) y una arquitectura responsiva distribuida en dos columnas para agilizar la experiencia de usuario (UX).

---

## 🚀 Características Principales (¿Qué hace?)

El sistema está desarrollado con programación modular en JavaScript puro y manipulación avanzada del DOM, ofreciendo las siguientes capacidades:

*   **Ingreso y Validación Segura:** Formulario para registrar mascotas capturando datos esenciales: Nombre, Especie, Dueño y Edad. Incluye reglas de negocio que impiden ingresar campos vacíos, nombres sospechosamente cortos o edades negativas.
*   **Flujo Operativo de Estados:** Cada mascota inicia en estado `Pendiente`. A través de controles interactivos en línea, el personal puede cambiar secuencialmente su estado a `En Atención` y posteriormente a `De Alta`.
*   **Ficha Clínica Avanzada de Edición y Eliminación:** Centraliza los procesos de modificación a través de un motor de búsqueda por nombre. Al seleccionar una mascota encontrada, se despliega una ficha flotante exclusiva que permite actualizar cualquier propiedad del registro o eliminar permanentemente el documento de la base de datos local.
*   **Módulos de Filtrado en Tiempo Real:** Filtra dinámicamente el listado de pacientes mediante un menú desplegable según su estado clínico actual, aislando los datos de interés sin recargar la página.
*   **Panel Estadístico Automático:** Muestra un bloque de totales parciales y globales que se recalcula instantáneamente ante cualquier evento en el sistema (registro, cambio de estado, edición o eliminación).
*   **Footer de Contacto Integrado:** Barra de navegación al pie de la pantalla que incluye enlaces de políticas y un acceso directo automatizado que redirige mediante la API oficial a un chat de asistencia por WhatsApp.

---

## 🛠️ Arquitectura y Tecnologías Utilizadas

El proyecto se estructuró bajo el estándar clásico de desarrollo web *frontend* (SPA Básica), utilizando:

1.  **HTML5:** Estructura semántica organizada por secciones independientes (`<main>`, `<section>`, `<nav>`, `<footer>`) utilizando campos ocultos para el manejo seguro de índices en memoria.
2.  **CSS3 Avanzado (Grid & Glassmorphism):** 
    *   Uso de **CSS Grid** para la división de la pantalla en dos columnas asimétricas (`1.2fr 1fr`), manteniendo formularios de control a la izquierda y listados/métricas a la derecha.
    *   Efecto **Glassmorphism** implementado mediante transparencias alfa (`rgba`), desenfoque selectivo de fondo (`backdrop-filter: blur`) y cantos reflectivos sutiles.
3.  **JavaScript Vanilla (ES6+):** 
    *   Estructuras de datos basadas en arreglos de objetos dinámicos.
    *   Métodos declarativos de iteración y filtrado como `.forEach()` y `.filter()`.
    *   Uso extendido de *Event Listeners* orientados a eventos como `click` y `change`.

---

## 📁 Estructura del Proyecto

```text
├── index.html     # Estructura semántica del Dashboard y componentes visuales
├── style.css      # Estilos globales, Grid de doble columna y efectos de glassmorphism
└── script.js      # Lógica del negocio, controladores de eventos y mutación del DOM