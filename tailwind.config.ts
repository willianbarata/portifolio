import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class', // Esta linha é a chave para o modo escuro funcionar com o clique
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}', // Garante que o Tailwind leia os arquivos na pasta src/app
  ],
  theme: {
    extend: {
      // Você pode adicionar cores, fontes, etc. personalizadas aqui se quiser
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Plugin para estilizar o conteúdo dos artigos (classe 'prose')
  ],
}
export default config

