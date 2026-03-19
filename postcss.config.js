export default {
  plugins: {
    '@tailwindcss/postcss': {},
    // eslint-disable-next-line no-undef
    cssnano: process.env.NODE_ENV === 'production' ? { preset: 'default' } : false,
  },
}
