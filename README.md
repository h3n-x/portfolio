<div align="center">

# 🚀 Portfolio Personal - Henry Pacheco (H3n)

### Backend Developer | | Open Source Contributor

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Site-00ff41?style=for-the-badge)](https://h3n-x.netlify.app)
[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

![Portfolio Preview](https://github.com/user-attachments/assets/cab146a2-2498-49f2-8f96-e6406c0df1d9)

[![GitHub Stars](https://img.shields.io/github/stars/h3n-x/portfolio?style=social)](https://github.com/h3n-x/portfolio/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/h3n-x/portfolio?style=social)](https://github.com/h3n-x/portfolio/network/members)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

</div>

---

## 📖 Descripción

Un **portfolio personal de última generación** desarrollado con las tecnologías más modernas del ecosistema React. Presenta una **estética cyberpunk única** con efectos visuales personalizados, optimización extrema de rendimiento y una experiencia de usuario inmersiva.

### 🎯 Objetivos del Proyecto
- 🚀 Crear una experiencia visual única e memorable
- 📱 Garantizar accesibilidad y rendimiento óptimo en todos los dispositivos
- 🌍 Proporcionar soporte multilenguaje completo

## ✨ Características Principales

<table>
<tr>
<td width="50%">

### 🎨 **Diseño y UX**
- 🎭 **Efectos Cyberpunk** - Matrix rain, neon glows, terminals
- 🌈 **Paleta de colores futurista** - Verde neón sobre fondo oscuro
- 📱 **Responsive Design** - Optimizado para móviles, tablets y desktop
- 🎯 **Micro-interacciones** - Hover effects, smooth transitions
- 🖱️ **Cursor personalizado** - Efectos de trail y partículas

</td>
<td width="50%">

### ⚡ **Rendimiento y Optimización**
- 🚀 **Lazy Loading** - Carga diferida de secciones
- 🖼️ **Imágenes optimizadas** - AVIF/WebP/JPG responsive
- ⚡ **Bundle optimizado** - Code splitting con React.lazy
- 🎪 **Animaciones fluidas** - 60fps con Framer Motion
- 📊 **Core Web Vitals** - Puntuación perfecta en Lighthouse

</td>
</tr>
<tr>
<td width="50%">

### 🌐 **Funcionalidades**
- 🗣️ **Multilenguaje** - Español e Inglés completo
- 📄 **Visualizador de certificados** - PDFs y enlaces externos
- 🔍 **SEO optimizado** - Meta tags, sitemap, robots.txt
- 🎵 **Easter eggs** - Interacciones ocultas para descubrir

</td>
<td width="50%">

### 🛡️ **Calidad y Mantenimiento**
- 🧪 **Código limpio** - ESLint + Prettier configurados
- 📝 **TypeScript ready** - Estructura preparada para TS
- 🔧 **Componentización** - Arquitectura modular y reutilizable
- 📱 **PWA features** - Manifest y service worker
- 🎯 **Accesibilidad** - ARIA labels y navegación por teclado

</td>
</tr>
</table>

## 🛠️ Stack Tecnológico

### Frontend Core
[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=flat-square&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2024-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

### Styling & UI
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.x-0055FF?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![PostCSS](https://img.shields.io/badge/PostCSS-8.x-DD3A0A?style=flat-square&logo=postcss&logoColor=white)](https://postcss.org/)

### Optimización & Build
[![Sharp](https://img.shields.io/badge/Sharp-0.33-99CC00?style=flat-square&logo=sharp&logoColor=white)](https://sharp.pixelplumbing.com/)
[![ESLint](https://img.shields.io/badge/ESLint-9.x-4B32C3?style=flat-square&logo=eslint&logoColor=white)](https://eslint.org/)
[![Netlify](https://img.shields.io/badge/Netlify-Deploy-00C7B7?style=flat-square&logo=netlify&logoColor=white)](https://netlify.com/)

## 📦 Arquitectura del Proyecto

<details>
<summary>🗂️ <strong>Ver estructura detallada</strong></summary>

```
portfolio/
├── 📁 public/
│   ├── 🖼️ images/               # Imágenes optimizadas
│   │   ├── originals/           # Imágenes fuente
│   │   ├── *-640.jpeg          # Móvil (640px)
│   │   ├── *-960.jpeg          # Tablet (960px)
│   │   ├── *-1280.jpeg         # Desktop (1280px)
│   │   └── *-1920.jpeg         # HD (1920px)
│   ├── 📄 certifications/       # Certificados PDF
│   ├── 🖱️ cursors/             # Cursores personalizados
│   ├── 📋 manifest.json        # PWA manifest
│   ├── 🤖 robots.txt           # SEO robots
│   └── 🗺️ sitemap.xml          # Sitemap SEO
├── 📁 src/
│   ├── 🧩 components/          # Componentes React
│   │   ├── Hero.jsx            # Sección principal
│   │   ├── Header.jsx          # Navegación
│   │   ├── Proyectos.jsx       # Portfolio de proyectos
│   │   ├── Tecnologias.jsx     # Stack tecnológico
│   │   ├── Experiencia.jsx     # Experiencia laboral
│   │   ├── Formacion.jsx       # Educación y certificados
│   │   ├── SobreMi.jsx         # Información personal
│   │   ├── MatrixRain.jsx      # Efecto Matrix
│   │   └── ...                 # Más componentes
│   ├── 🪝 hooks/              # Custom hooks
│   ├── 🌐 translations/        # Sistema i18n
│   │   ├── es.js              # Español
│   │   ├── en.js              # Inglés
│   │   └── index.js           # Hook de traducción
│   ├── 🎨 styles/             # Estilos globales
│   └── ⚙️ utils/              # Utilidades
├── 📁 scripts/
│   └── generate-images.js      # Optimización de imágenes
├── ⚙️ vite.config.js          # Configuración Vite
├── 🎨 tailwind.config.js      # Configuración Tailwind
├── 📋 package.json            # Dependencias y scripts
└── 📖 README.md               # Este archivo
```

</details>

## 🚀 Guía de Instalación

### Prerrequisitos
- 📦 **Node.js** >= 18.0.0
- 📦 **npm** >= 9.0.0 o **yarn** >= 1.22.0

### Instalación Rápida

```bash
# 1️⃣ Clonar el repositorio
git clone https://github.com/h3n-x/portfolio.git
cd portfolio

# 2️⃣ Instalar dependencias
npm install

# 3️⃣ Generar imágenes optimizadas (opcional)
npm run generate-images

# 4️⃣ Iniciar servidor de desarrollo
npm run dev
```

### 🌐 Despliegue en Producción

```bash
# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview

# Deploy en Netlify (automático con git push)
git push origin main
```

## 📜 Scripts Disponibles

| Script | Descripción | Uso |
|--------|-------------|-----|
| `dev` | 🚀 Servidor de desarrollo con HMR | `npm run dev` |
| `build` | 📦 Build optimizado para producción | `npm run build` |
| `preview` | 👀 Preview de la build de producción | `npm run preview` |
| `lint` | 🔍 Análisis de código con ESLint | `npm run lint` |
| `generate-images` | 🖼️ Optimización automática de imágenes | `npm run generate-images` |

## 🎨 Personalización

<details>
<summary>📝 <strong>Guía de personalización completa</strong></summary>

### 🎨 Temas y Estilos

```javascript
// tailwind.config.js - Configuración principal
module.exports = {
  theme: {
    extend: {
      colors: {
        'cyber-green': '#00ff41',     // Color principal
        'dark-bg': '#0a0a0a',        // Fondo principal
        'matrix-green': '#00ff00',   // Verde Matrix
      },
      fontFamily: {
        'cyber': ['JetBrains Mono', 'monospace'],
      }
    }
  }
}
```

### 🌐 Contenido Multilenguaje

```javascript
// src/translations/es.js - Agregar nuevas traducciones
export const es = {
  nav: {
    newSection: 'Nueva Sección'
  },
  // ... más traducciones
}
```

### 🖼️ Imágenes y Assets

1. **Agregar nuevas imágenes**: Colocar archivos originales en `public/images/originals/`
2. **Generar versiones optimizadas**: Ejecutar `npm run generate-images`
3. **Usar en componentes**:
   ```jsx
   <OptimizedImage
     src="/images/nueva-imagen"
     alt="Descripción"
     sizes="(max-width: 768px) 640px, 1280px"
   />
   ```

### 🧩 Nuevos Componentes

```jsx
// src/components/NuevoComponente.jsx
import { motion } from 'framer-motion';
import { useTranslation } from '../translations';

const NuevoComponente = () => {
  const { t } = useTranslation();
  
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-20 bg-black"
    >
      {/* Tu contenido aquí */}
    </motion.section>
  );
};
```

</details>

## 🚀 Roadmap y Características Futuras

- [ ] 🎮 **Modo de juego interactivo** - Mini-games cyberpunk
- [ ] 🎵 **Reproductor de música** - Soundtrack cyberpunk ambiental  
- [ ] 🌍 **Más idiomas** - Francés, Alemán, Japonés
- [ ] 📊 **Analytics dashboard** - Métricas de visitantes en tiempo real
- [ ] 🤖 **Chatbot AI** - Asistente virtual personalizado
- [ ] 🎨 **Editor de temas** - Personalización en tiempo real
- [ ] 📱 **App móvil** - Versión nativa con React Native

## 🤝 Contribuciones

¡Las contribuciones son **altamente bienvenidas**! Este proyecto está abierto a:

### 🎯 Tipos de Contribución
- 🐛 **Bug fixes**
- ✨ **Nuevas características**
- 📚 **Mejoras en documentación**
- 🎨 **Mejoras de UI/UX**
- 🌐 **Traducciones**
- ⚡ **Optimizaciones de rendimiento**

### 📋 Proceso de Contribución

1. 🍴 **Fork** el repositorio
2. 🌿 **Crea una rama** para tu feature
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. ✅ **Commit** tus cambios
   ```bash
   git commit -m 'feat: Add some AmazingFeature'
   ```
4. 📤 **Push** a la rama
   ```bash
   git push origin feature/AmazingFeature
   ```
5. 🔄 **Abre un Pull Request**

### 🏷️ Convención de Commits
Utilizamos [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` Nueva característica
- `fix:` Corrección de bug
- `docs:` Cambios en documentación
- `style:` Cambios de formato
- `refactor:` Refactorización de código
- `test:` Agregar tests
- `chore:` Tareas de mantenimiento

## 📊 Métricas del Proyecto

![GitHub repo size](https://img.shields.io/github/repo-size/h3n-x/portfolio?style=flat-square&color=00ff41)
![GitHub code size](https://img.shields.io/github/languages/code-size/h3n-x/portfolio?style=flat-square&color=00ff41)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/h3n-x/portfolio?style=flat-square&color=00ff41)
![GitHub last commit](https://img.shields.io/github/last-commit/h3n-x/portfolio?style=flat-square&color=00ff41)

## 📄 Licencia

Este proyecto está licenciado bajo la **MIT License** - consulta el archivo [LICENSE](LICENSE) para más detalles.

```
MIT License - Libertad para usar, modificar y distribuir
✅ Uso comercial permitido
✅ Modificaciones permitidas
✅ Distribución permitida
✅ Uso privado permitido
```

---

<div align="center">

## 📧 Contacto y Redes

[![Email](https://img.shields.io/badge/📧_Email-h3n.eth@gmail.com-00ff41?style=for-the-badge)](mailto:h3n.eth@gmail.com)
[![Portfolio](https://img.shields.io/badge/🌐_Portfolio-Visit_Live_Site-00ff41?style=for-the-badge)](https://h3n-x.netlify.app)
[![GitHub](https://img.shields.io/badge/💻_GitHub-Follow_Me-00ff41?style=for-the-badge&logo=github&logoColor=00ff41)](https://github.com/h3n-x)

### 💖 Si te gusta este proyecto, ¡dale una estrella! ⭐

[![GitHub stars](https://img.shields.io/github/stars/h3n-x/portfolio?style=social)](https://github.com/h3n-x/portfolio/stargazers)

---

**🎭 "En un mundo de matrices y códigos, cada línea cuenta una historia." - H3n**

*Desarrollado con* 💚 *y mucho* ☕ *por Henry Pacheco*

</div>

## 🙏 Agradecimientos

Un agradecimiento especial a las increíbles herramientas y librerías que hicieron posible este proyecto:

<div align="center">

[![React](https://img.shields.io/badge/React-⚛️-61DAFB?style=flat-square&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-⚡-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-🎨-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-🎭-0055FF?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Sharp](https://img.shields.io/badge/Sharp-🖼️-99CC00?style=flat-square)](https://sharp.pixelplumbing.com/)
[![Netlify](https://img.shields.io/badge/Netlify-🚀-00C7B7?style=flat-square&logo=netlify&logoColor=white)](https://netlify.com/)

</div>
