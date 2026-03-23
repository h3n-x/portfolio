import { useContext, memo } from 'react'
import { m as motion } from 'framer-motion'
import { LanguageContext } from '../language-context'
import { useTranslation } from '../translations'
import { Database, Terminal, Globe, FolderGit2, CalendarDays, Code2, Monitor } from 'lucide-react'
import { PythonIcon, LinuxIcon, GitIcon, ReactIcon, FlaskIcon, SupabaseIcon, ViteIcon, FastAPIIcon, PostgreSQLIcon, DockerIcon } from './icons/BrandIcons'

const chipStyle = {
  background: 'var(--bg-elevated)',
  border: '1px solid var(--border-subtle)',
  color: 'var(--text-secondary)',
}

const SobreMi = memo(() => {
  const { language } = useContext(LanguageContext)
  const { t } = useTranslation(language)

  const stats = [
    { value: '3', label: t('about.stats.projects'), icon: <FolderGit2 size={14} /> },
    { value: '2022', label: t('about.stats.started'), icon: <CalendarDays size={14} /> },
    { value: '3+', label: t('about.stats.years'), icon: <Code2 size={14} /> },
    { value: '100%', label: t('about.stats.openSource'), icon: <Monitor size={14} /> },
    { value: 'Py/Flask', label: t('about.stats.stack'), icon: <Database size={14} /> },
  ]

  const techCategories = [
    {
      label: 'Backend & Data',
      items: [
        { icon: <PythonIcon size={16} />, name: 'Python', url: 'https://www.python.org' },
        { icon: <FlaskIcon size={16} />, name: 'Flask', url: 'https://flask.palletsprojects.com' },
        { icon: <FastAPIIcon size={16} />, name: 'FastAPI', url: 'https://fastapi.tiangolo.com' },
        { icon: <SupabaseIcon size={16} />, name: 'Supabase', url: 'https://supabase.com' },
        { icon: <Database size={16} />, name: 'MySQL', url: 'https://www.mysql.com' },
        { icon: <PostgreSQLIcon size={16} />, name: 'PostgreSQL', url: 'https://www.postgresql.org' },
      ],
    },
    {
      label: 'Tools',
      items: [
        { icon: <LinuxIcon size={16} />, name: 'Linux', url: 'https://www.kernel.org' },
        { icon: <Terminal size={16} />, name: 'Bash', url: 'https://www.gnu.org/software/bash/' },
        { icon: <GitIcon size={16} />, name: 'Git', url: 'https://git-scm.com' },
        { icon: <Globe size={16} />, name: 'Vim', url: 'https://www.vim.org' },
        { icon: <DockerIcon size={16} />, name: 'Docker', url: 'https://www.docker.com' },
      ],
    },
    {
      label: 'Frontend',
      items: [
        { icon: <ReactIcon size={16} />, name: 'React', url: 'https://react.dev' },
        { icon: <ViteIcon size={16} />, name: 'Vite', url: 'https://vite.dev' },
      ],
    },
  ]

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  }

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  }

  return (
    <section
      id="sobre-mí"
      className="section section-reveal overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
      aria-labelledby="sobre-mi-title"
    >
      <div aria-hidden="true" className="ambient-glow ambient-glow-tl" />
      <div className="container">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="mb-12"
        >
          <h2 id="sobre-mi-title" className="section-title">
            {t('about.title')}
          </h2>
          <hr className="section-divider" />
        </motion.div>

        {/* 2-column grid with vertical divider */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] gap-y-10 md:gap-x-14 items-stretch md:min-h-[420px]">

          {/* LEFT COLUMN — bio + stats */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="flex flex-col gap-5 justify-between h-full"
          >
            {/* Blockquote */}
            <motion.blockquote
              variants={fadeUp}
              className="pl-6 leading-[1.75] not-italic m-0"
              style={{
                borderLeft: '3px solid var(--accent)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-lg)',
              }}
            >
              {t('about.description')}
            </motion.blockquote>

            {/* Body paragraph */}
            <motion.p
              variants={fadeUp}
              className="leading-[1.7] m-0"
              style={{
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-base)',
              }}
            >
              {t('about.interests')}
            </motion.p>

            {/* Stats 2x2 grid */}
            <motion.div
              variants={stagger}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-2"
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.value}
                  variants={fadeUp}
                  className="card-base flex flex-col items-center gap-2 p-5"
                >
                  <span
                    className="font-display font-bold leading-none"
                    style={{ fontSize: '28px', color: 'var(--accent)' }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="flex items-center gap-1 font-mono uppercase"
                    style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.08em' }}
                  >
                    <span style={{ opacity: 0.5 }}>{stat.icon}</span>
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* VERTICAL DIVIDER */}
          <div
            className="hidden md:block self-stretch"
            style={{ background: 'rgba(255,255,255,0.07)', minHeight: '300px' }}
            aria-hidden="true"
          />

          {/* RIGHT COLUMN — tech stack */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col pt-1 justify-between h-full"
          >
            <span
              className="font-mono uppercase block mb-5"
              style={{ fontSize: '13px', color: 'var(--text-muted)', letterSpacing: '0.1em' }}
            >
              {language === 'es' ? 'Stack tecnológico' : 'Tech Stack'}
            </span>

            {techCategories.map((category) => (
              <div key={category.label} className="mb-4 last:mb-0">
                <span
                  className="block font-mono uppercase mb-2"
                  style={{ fontSize: '11px', color: '#52525B', letterSpacing: '0.09em' }}
                >
                  {category.label}
                </span>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm transition-colors duration-200 no-underline"
                      style={chipStyle}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,183,3,0.25)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-subtle)' }}
                    >
                      <span style={{ color: 'var(--accent)' }}>{item.icon}</span>
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
})

SobreMi.displayName = 'SobreMi'
export default SobreMi
