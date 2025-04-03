# Portfolio Personal - H3n

Un portfolio web personal con estética Matrix, creado con React y Tailwind CSS, optimizado para rendimiento y SEO.

![Portfolio Preview](/public/images/og-image.svg)

## Características

- **Estética Matrix**: Diseño inspirado en la película Matrix con efectos visuales como lluvia de código y grid.
- **Cursor Personalizado**: Cursor con efecto de rastro que sigue el movimiento del ratón.
- **Totalmente Responsivo**: Se adapta perfectamente a todos los tamaños de pantalla (móvil, tablet, escritorio).
- **Internacionalización**: Soporte para múltiples idiomas (Español e Inglés).
- **Animaciones Sutiles**: Microinteracciones y animaciones para mejorar la experiencia del usuario.
- **Optimizado para SEO**: Estructura semántica y metadatos optimizados para motores de búsqueda.
- **Optimizado para Compartir**: Metadatos específicos para compartir en redes sociales, incluyendo WhatsApp.
- **Lazy Loading**: Carga perezosa de componentes e imágenes para mejorar el rendimiento.
- **PWA Ready**: Configurado como Progressive Web App para instalación en dispositivos móviles.

## Secciones

- **Inicio**: Presentación personal con efectos visuales.
- **Sobre Mí**: Información personal y profesional.
- **Experiencia**: Historial laboral y proyectos destacados.
- **Proyectos**: Galería de proyectos personales y profesionales.
- **Tecnologías**: Listado de tecnologías y herramientas dominadas.
- **Formación**: Información sobre educación formal y autodidacta.

## Tecnologías Utilizadas

- **React**: Biblioteca JavaScript para construir interfaces de usuario.
- **Tailwind CSS**: Framework CSS de utilidades para diseño rápido y responsivo.
- **Vite**: Herramienta de compilación rápida para desarrollo moderno.
- **React Context API**: Para gestionar el estado global de la aplicación (idioma).
- **Font Awesome**: Para iconos y elementos visuales.

## Optimizaciones Implementadas

- **Lazy Loading**: Carga diferida de componentes pesados e imágenes.
- **Code Splitting**: División de código para reducir el tamaño inicial de carga.
- **Preload de Recursos Críticos**: Precarga de fuentes y recursos esenciales.
- **Compresión Brotli**: Compresión avanzada para archivos estáticos.
- **Sitemap y Robots.txt**: Archivos para mejorar la indexación en buscadores.
- **Open Graph y Twitter Cards**: Metadatos para compartir en redes sociales.

## Requisitos

- Node.js (v23.9.0 o superior)
- npm (v11.2.0 o superior)

## Instalación

1. Clona este repositorio:
```bash
git clone https://github.com/h3n/portfolio.git
cd portfolio
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Abre tu navegador en `http://localhost:5173`

## Compilación para Producción

Para crear una versión optimizada para producción:

```bash
npm run build
```

Los archivos compilados estarán en el directorio `dist/`.

## Personalización

- Modifica los textos y traducciones en los archivos `src/translations/es.js` y `src/translations/en.js`
- Ajusta los colores y estilos en `src/App.css`
- Reemplaza las imágenes en `public/images/` con tus propias imágenes

## Licencia

MIT

---

Creado por Henry Pacheco (H3n) - 2025
