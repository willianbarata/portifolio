import { Github, Youtube, Linkedin, Mail } from 'lucide-react';
import type { ReactNode } from 'react';

// Componente para os ícones de tecnologia (SVG in-line)
const TechIcon = ({ children }: { children: ReactNode }) => (
  <span className="inline-flex items-center justify-center bg-gray-700 text-cyan-400 rounded-full w-8 h-8 mr-2 mb-2">
    {children}
  </span>
);

const DotNetIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#512BD4"/>
        <path d="M12.26 6.17l-4.71 8.16h2.2l1.37-2.38h3.33l-2.19-3.79-1.42-2.46-.03.05c-.1-.17-.18-.32-.25-.48zm1.71 6.35h-3.42l1.71-2.96 1.71 2.96z" fill="white"/>
    </svg>
);


const NextJsIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM9 9h2v6H9V9zm4 0h2v6h-2V9z"/>
    </svg>
);


const SolidityIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
        <path d="M12 2l-10 6 10 6 10-6-10-6zM2 10.5v3l10 6 10-6v-3l-10 6-10-6zM12 22l-10-6v-3l10 6 10-6v3l-10 6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export default function Home() {
  return (
    <div className="bg-gray-900 text-gray-200 font-sans">
      <main className="min-h-screen container mx-auto p-8 sm:p-12 md:p-20">
        <div className="max-w-3xl mx-auto">
          
          {/* --- Seção de Cabeçalho --- */}
          <header className="flex flex-col sm:flex-row items-center justify-between mb-16">
            <div className="text-center sm:text-left mb-6 sm:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                Willian
              </h1>
              <p className="text-lg md:text-xl text-cyan-400 mt-1">
                Desenvolvedor Fullstack & Web3
              </p>
            </div>
            <div className="flex items-center space-x-4">
               <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Github size={28} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Linkedin size={28} />
              </a>
              <a href="https://youtube.com/c/DevWill" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Youtube size={28} />
              </a>
               <a href="mailto:seu-email@exemplo.com" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Mail size={28} />
              </a>
            </div>
          </header>

          {/* --- Seção Sobre Mim --- */}
          <section id="about" className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-cyan-400 pl-4">Sobre Mim</h2>
            <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
              <p>
                Desenvolvedor Fullstack desde 2019, com sólida experiência em <strong className="text-cyan-400">.NET</strong> e <strong className="text-cyan-400">Next.js</strong>. Minha trajetória inclui o desenvolvimento e manutenção de sistemas ERP Web complexos, utilizando bancos de dados como SQL Server e PL/SQL Oracle, com ampla prática em Stored Procedures.
              </p>
              <p>
                Tenho expertise em tecnologias como WebSocket com SignalR, Web API, .NET MAUI e AngularJS. Atualmente, estou expandindo meus conhecimentos para o universo Web3, aprendendo <strong className="text-cyan-400">Solidity</strong> e <strong className="text-cyan-400">Hardhat</strong> para a criação de Smart Contracts na blockchain.
              </p>
              <p>
                Além disso, compartilho minhas descobertas e aprendizados no meu canal do YouTube, <a href="https://youtube.com/c/DevWill" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline hover:text-cyan-300 transition-colors">Dev Will</a>.
              </p>
            </div>
          </section>

          {/* --- Seção de Habilidades --- */}
          <section id="skills">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-cyan-400 pl-4">Habilidades</h2>
            <div className="flex flex-wrap gap-2 text-sm">
                <span className="bg-cyan-900/50 text-cyan-300 py-1 px-3 rounded-full">.NET</span>
                <span className="bg-cyan-900/50 text-cyan-300 py-1 px-3 rounded-full">Next.js</span>
                <span className="bg-cyan-900/50 text-cyan-300 py-1 px-3 rounded-full">SQL Server</span>
                <span className="bg-cyan-900/50 text-cyan-300 py-1 px-3 rounded-full">PL/SQL Oracle</span>
                <span className="bg-cyan-900/50 text-cyan-300 py-1 px-3 rounded-full">Web API</span>
                <span className="bg-cyan-900/50 text-cyan-300 py-1 px-3 rounded-full">.NET MAUI</span>
                <span className="bg-cyan-900/50 text-cyan-300 py-1 px-3 rounded-full">AngularJS</span>
                <span className="bg-gray-700 text-gray-300 py-1 px-3 rounded-full">Solidity</span>
                <span className="bg-gray-700 text-gray-300 py-1 px-3 rounded-full">Hardhat</span>
                <span className="bg-gray-700 text-gray-300 py-1 px-3 rounded-full">Smart Contracts</span>
                <span className="bg-gray-700 text-gray-300 py-1 px-3 rounded-full">Blockchain</span>
                <span className="bg-gray-700 text-gray-300 py-1 px-3 rounded-full">WEB3</span>
            </div>
          </section>

          {/* --- Footer --- */}
          <footer className="text-center text-gray-500 mt-20 pt-8 border-t border-gray-800">
             <p>&copy; {new Date().getFullYear()} Willian. Todos os direitos reservados.</p>
          </footer>

        </div>
      </main>
    </div>
  );
}
