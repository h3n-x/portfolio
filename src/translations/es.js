export const es = {
  // Navegación
  nav: {
    home: 'Inicio',
    about: 'Sobre Mí',
    technologies: 'Tecnologías',
    experience: 'Experiencia',
    projects: 'Proyectos',
    education: 'Formación'
  },
  
  // Hero
  hero: {
    location: 'Colombia',
    contactMe: 'Contáctame',
    downloadCV: 'Descargar CV',
    viewProjects: 'Ver Proyectos',
    availableForWork: 'Disponible para proyectos',
    availableStatus: 'Disponible',
    tagline: 'Construyo backends en Python con foco en seguridad y fiabilidad: APIs autenticadas, automatización en Linux y despliegues que funcionan en producción.',
    quickScan: {
      title: 'Resumen para reclutador',
      item1: 'Backend Python con foco en sistemas Linux',
      item2: 'Proyectos desplegados y mantenimiento activo',
      item3: 'Código abierto con documentación y demo funcional'
    }
  },
  
  // Sobre Mí
  about: {
    title: 'Sobre Mí',
    description: 'Comencé personalizando Linux para entender cómo funcionan los sistemas por dentro; hoy uso esa base para diseñar backends en Python con decisiones claras de arquitectura, seguridad y mantenimiento.',
    interests: 'Actualmente curso 8 de 10 semestres de Ingeniería de Sistemas y avanzo en el Certificado Profesional de Ciberseguridad de Google en Coursera (6 de 9 cursos). Mi enfoque está en hardening Linux, automatización con Bash y servicios backend listos para producción con impacto real.',
    stats: {
      projects: 'Proyectos',
      years: 'Años',
      openSource: 'Open Source'
    }
  },
  
  // Tecnologías
  technologies: {
    title: 'Tecnologías',
    bash: {
      name: 'Bash',
      description: 'Intérprete de línea de comandos'
    },
    git: {
      name: 'Git',
      description: 'Sistema de control de versiones'
    },
    linux: {
      name: 'Linux',
      description: 'Sistema operativo'
    },
    mysql: {
      name: 'MySQL',
      description: 'Base de datos relacional'
    },
    python: {
      name: 'Python',
      description: 'Lenguaje de programación'
    },
    vim: {
      name: 'Vim',
      description: 'Editor de texto'
    }
  },
  
  // Experiencia
  experience: {
    title: 'Experiencia',
    present: 'Presente',
    achievements: 'Logros principales:',
    selfTaught: {
      title: 'Desarrollo Independiente',
      description: 'Construcción de proyectos end-to-end: APIs REST con Python/Flask, bots de Discord con persistencia en Supabase, y aplicaciones web con React/Vite. Resolución de problemas reales de arquitectura, autenticación y despliegue en producción en Netlify.',
      achievements: [
        'Chat anónimo en tiempo real usando WebSockets — sin base de datos de usuarios',
        'ZenShell Bot: sistema de moderación Discord con panel de control Flask',
        'Automatización de entornos Linux con scripts Bash y configuración Hyprland',
      ]
    },
    openSource: {
      title: 'Proyectos Open Source en GitHub',
      description: 'Publicación y mantenimiento de repositorios públicos con documentación. Énfasis en código limpio, READMEs descriptivos y demos funcionales desplegadas en producción.',
      achievements: [
        '3 repositorios públicos activos con demos en producción',
        'Chat Anónimo e Hypr-Dot con usuarios reales',
      ]
    }
  },
  
  // Proyectos
  projects: {
    title: 'Proyectos',
    featured: 'Destacado',
    demo: 'Demo',
    code: 'Código',
    details: 'Detalles',
    technologies: 'Tecnologías',
    viewDemo: 'Ver Demo',
    viewCode: 'Ver Código',
    back: 'Volver',
    showMore: 'Ver más proyectos',
    showLess: 'Ver menos proyectos',
    proof: {
      title: 'Pruebas de ejecución',
      role: 'Rol',
      scope: 'Alcance',
      status: 'Estado'
    },
    chat: {
      title: 'Chat Anónimo',
      description: '¿Quieres hablar sin dejar rastro? Chat en tiempo real sin cuentas, sin historial, sin datos personales',
      details: 'Esta aplicación permite a los usuarios unirse a salas de chat públicas o privadas sin necesidad de registrarse, utilizando un nombre de usuario temporal. La comunicación en tiempo real se logra mediante WebSockets, proporcionando una experiencia fluida y rápida. La interfaz de usuario es intuitiva y atractiva, diseñada con Tailwind CSS para una apariencia moderna y responsiva. Además, la aplicación incluye características como notificaciones de nuevos mensajes, historial de chat limitado y opciones de personalización del nombre de usuario.',
      impact: 'Chat en tiempo real sin fricción de registro',
      proofRole: 'Autor principal del frontend y backend',
      proofScope: 'Arquitectura en tiempo real, UX y despliegue',
      proofStatus: 'Demo pública y repositorio activo'
    },
    hyprDot: {
      title: 'Hypr-Dot',
      description: 'Entorno Linux funcional y visualmente cohesivo con gestión dinámica de temas',
      details: 'Un entorno Arch Linux altamente personalizado con Hyprland como gestor de ventanas, con esquemas de colores dinámicos que se adaptan a tu fondo de pantalla.',
      impact: 'Reduce horas de configuración manual del entorno Linux',
      proofRole: 'Diseño y automatización de dotfiles',
      proofScope: 'Tema visual, scripts y mantenimiento del entorno',
      proofStatus: 'Repositorio público con uso real'
    },
    archforge: {
      title: 'ArchForge',
      description: 'Automatiza la post-instalación de Arch Linux para evitar errores manuales y dejar el sistema listo en minutos',
      details: 'Toolkit modular para configurar un Arch Linux recién instalado con backups automáticos y restauración por sesión. Cubre paquetes, servicios, seguridad, red, energía y gráficos con un flujo guiado y modo dry-run. Su evolución activa en el changelog (v0.3.0) demuestra madurez y mantenimiento continuo.',
      impact: 'Estandariza post-instalación y minimiza drift operativo',
      proofRole: 'Autor y mantenedor del toolkit',
      proofScope: 'Módulos de seguridad, red, energía y gráficos',
      proofStatus: 'Versionado activo con changelog público'
    }
  },
  
  // Formación
  education: {
    title: 'Formación',
    computerScience: {
      title: 'Bootcamp Programación',
      description: 'Curso de programación básico ofrecido por el Ministerio de las TICs de Colombia en colaboración con la Universidad Tecnológica de Bolívar. En este curso, adquirí una sólida comprensión de los fundamentos de la programación, incluyendo lógica de programación, estructuras de control y desarrollo de software, preparando el camino para continuar avanzando en el mundo de la tecnología.'
    },
    autoDidactic: {
      title: 'Personalización Entornos Linux',
      description: 'Curso autodidacta sobre la personalización de entornos Linux ofrecido por Savitar en la academia Hack4U. En este curso, adquirí conocimientos prácticos sobre la configuración, optimización y personalización avanzada de sistemas Linux, mejorando mis habilidades para trabajar en entornos de desarrollo y seguridad.'
    },
    basic: {
      title: 'Oracle Next Education - Backend',
      description: 'Formación especializada en backend a través del programa Oracle Next Education, donde adquirí conocimientos técnicos, habilidades prácticas y experiencia en programación, creando una base sólida para continuar mis estudios en la universidad.'
    },
    viewCertificate: 'Ver certificado'
  },
  
  // Footer
  footer: {
    contact: 'Contacto',
    social: 'Redes',
    rights: ' ',
    quote: 'Inserte cafe para iniciar.'
  },
  
  // Botones
  buttons: {
    backToTop: 'Volver arriba'
  },
  
  // Modal de certificaciones
  certificateModal: {
    external: 'Certificado Externo',
    externalDescription: 'Este certificado se encuentra alojado en una plataforma externa. Haz clic en el botón de abajo para verlo.',
    viewCertificate: 'Ver Certificado',
    copyLink: 'Copiar enlace',
    copied: 'Enlace copiado',
    mayRequireLogin: 'Algunos certificados externos pueden requerir inicio de sesión. Si no abre, copia el enlace y ábrelo manualmente.',
    pressEsc: 'Presiona',
    toClose: 'para cerrar',
    close: 'Cerrar'
  },

  image: {
    loading: 'Cargando imagen...',
    error: 'Error al cargar la imagen'
  },
};
