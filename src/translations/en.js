export const en = {
  // Navigation
  nav: {
    home: 'Home',
    about: 'About Me',
    technologies: 'Technologies',
    experience: 'Experience',
    projects: 'Projects',
    education: 'Education'
  },
  
  // Hero
  hero: {
    location: 'Colombia',
    contactMe: 'Contact Me',
    downloadCV: 'Download CV',
    viewProjects: 'View Projects',
    availableForWork: 'Available for projects',
    availableStatus: 'Available',
    tagline: 'I build Python backends focused on security and reliability: authenticated APIs, Linux automation, and deployments that perform in production.',
    quickScan: {
      title: 'Recruiter quick scan',
      item1: 'Python backend profile focused on Linux systems',
      item2: 'Deployed projects with ongoing maintenance',
      item3: 'Open-source delivery with docs and live demos'
    }
  },
  
  // About Me
  about: {
    title: 'About Me',
    description: 'I started by customizing Linux to understand systems from the inside out; today I use that foundation to design Python backends with clear architecture, security, and long-term maintainability.',
    interests: 'I am currently in semester 8 of 10 in Systems Engineering and progressing through the Google Cybersecurity Professional Certificate on Coursera (course 6 of 9). My focus is Linux hardening, Bash automation, and production-ready backend services with measurable impact.',
    stats: {
      projects: 'Projects',
      years: 'Years',
      openSource: 'Open Source'
    }
  },
  
  // Technologies
  technologies: {
    title: 'Technologies',
    bash: {
      name: 'Bash',
      description: 'Command line interpreter'
    },
    git: {
      name: 'Git',
      description: 'Version control system'
    },
    linux: {
      name: 'Linux',
      description: 'Operating system'
    },
    mysql: {
      name: 'MySQL',
      description: 'Relational database'
    },
    python: {
      name: 'Python',
      description: 'Programming language'
    },
    vim: {
      name: 'Vim',
      description: 'Text editor'
    }
  },
  
  // Experience
  experience: {
    title: 'Experience',
    present: 'Present',
    achievements: 'Main achievements:',
    selfTaught: {
      title: 'Independent Development',
      description: 'End-to-end project building: REST APIs with Python/Flask, Discord bots with Supabase persistence, and web applications with React/Vite. Solving real architectural, authentication, and production deployment challenges on Netlify.',
      achievements: [
        'Real-time anonymous chat using WebSockets — no user database',
        'ZenShell Bot: Discord moderation system with Flask control panel',
        'Linux environment automation with Bash scripts and Hyprland configuration',
      ]
    },
    openSource: {
      title: 'Open Source Projects on GitHub',
      description: 'Publishing and maintaining documented public repositories. Focus on clean code, descriptive READMEs, and functional demos deployed in production.',
      achievements: [
        '3 active public repositories with production demos',
        'Anonymous Chat and Hypr-Dot with real users',
      ]
    }
  },
  
  // Projects
  projects: {
    title: 'Projects',
    featured: 'Featured',
    demo: 'Demo',
    code: 'Code',
    details: 'Details',
    technologies: 'Technologies',
    viewDemo: 'View Demo',
    viewCode: 'View Code',
    back: 'Back',
    showMore: 'Show more projects',
    showLess: 'Show fewer projects',
    proof: {
      title: 'Execution proof',
      role: 'Role',
      scope: 'Scope',
      status: 'Status'
    },
    chat: {
      title: 'Anonymous Chat',
      description: 'Real-time communication without signup or personal data',
      details: 'This application is built with Python for the backend, utilizing Flask to handle server-side logic and manage user sessions. The frontend is developed using Vite and Tailwind CSS, providing a responsive and user-friendly interface. The chat functionality is implemented using WebSockets, enabling real-time communication between users. The application emphasizes privacy and security, ensuring that no personal data is collected or stored.',
      impact: 'Real-time chat UX without registration friction',
      proofRole: 'Primary author for frontend and backend',
      proofScope: 'Real-time architecture, UX, and deployment',
      proofStatus: 'Public demo and active repository'
    },
    hyprDot: {
      title: 'Hypr-Dot',
      description: 'Functional and visually cohesive Linux environment with dynamic theming',
      details: 'A highly customized Arch Linux environment featuring Hyprland as the window manager, with dynamic color schemes that adapt to your wallpaper.',
      impact: 'Cuts manual Linux environment setup time significantly',
      proofRole: 'Dotfiles design and automation owner',
      proofScope: 'Visual theme, scripts, and environment maintenance',
      proofStatus: 'Public repository with real usage'
    },
    archforge: {
      title: 'ArchForge',
      description: 'Automates Arch Linux post-install setup to eliminate manual drift and get a production-ready system fast',
      details: 'A modular toolkit to configure a freshly installed Arch Linux system with automatic backups and session-based restore. It covers packages, services, security, networking, power, and graphics with a guided flow and dry-run support. Active changelog progress (v0.3.0) shows ongoing maturity and maintenance.',
      impact: 'Standardizes post-install and reduces operational drift',
      proofRole: 'Toolkit author and maintainer',
      proofScope: 'Security, networking, power, and graphics modules',
      proofStatus: 'Actively versioned with public changelog'
    }
  },
  
  // Education
  education: {
    title: 'Education',
    computerScience: {
      title: 'Programming Bootcamp',
      description: 'Basic programming course offered by the Colombian Ministry of ICT in collaboration with the Technological University of Bolívar. In this course, I gained a solid understanding of the fundamentals of programming, including programming logic, control structures, and software development, paving the way for me to continue advancing in the world of technology.'
    },
    autoDidactic: {
      title: 'Linux Environment Customization',
      description: 'Self-paced course on Linux environment customization offered by Savitar at the Hack4U Academy. In this course, I gained practical knowledge on configuring, optimizing, and advanced customizing Linux systems, enhancing my skills for development and security environments.'
    },
    basic: {
      title: 'Oracle Next Education - Backend',
      description: 'Specialized backend training through the Oracle Next Education program, where I gained technical knowledge, practical skills, and hands-on experience, providing a strong foundation for pursuing further studies at the university level.'
    },
    viewCertificate: 'View certificate'
  },
  
  // Footer
  footer: {
    contact: 'Contact',
    social: 'Social',
    rights: ' ',
    quote: 'Insert coffee to boot'
  },
  
  // Buttons
  buttons: {
    backToTop: 'Back to top'
  },
  
  // Certificate Modal
  certificateModal: {
    external: 'External Certificate',
    externalDescription: 'This certificate is hosted on an external platform. Click the button below to view it.',
    viewCertificate: 'View Certificate',
    copyLink: 'Copy link',
    copied: 'Link copied',
    mayRequireLogin: 'Some external certificates may require sign-in. If it does not open, copy the link and open it manually.',
    pressEsc: 'Press',
    toClose: 'to close',
    close: 'Close'
  },

  image: {
    loading: 'Loading image...',
    error: 'Image failed to load'
  },
};
