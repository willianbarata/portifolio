'use client';

import React, { useState, useEffect } from 'react';
import { Linkedin, Share2, ThumbsUp, MessageSquare, ArrowLeft, Sun, Moon } from 'lucide-react';

// Tipagem para os dados do projeto
type Translations = {
  [key: string]: {
    nav: {
      home: string;
      resume: string;
      articles: string;
    };
    home: {
      greeting: string;
      title: string;
      bio: string;
    };
    resume: {
      title: string;
      download: string;
      educationTitle: string;
      experienceTitle: string;
      professionalSkills: string;
      studyingSkills: string;
      education: {
        course: string;
        institution: string;
        period: string;
      }[];
      experience: {
        role: string;
        company: string;
        period: string;
      }[];
      skills: string[];
      studying: string[];
    };
    articles: {
      title: string;
      back: string;
      share: string;
      shareOn: string;
      like: string;
      comments: string;
      commentCTA: string;
      posts: {
        slug: string;
        title: string;
        summary: string;
        content: string;
        date: string;
      }[];
    };
    footer: {
        text: string;
    }
  };
};

// DADOS DO PORTFÓLIO (Português e Inglês)
// Você pode facilmente adicionar ou editar seu conteúdo aqui
const portfolioData: Translations = {
  pt: {
    nav: { home: 'Início', resume: 'Currículo', articles: 'Artigos' },
    home: {
      greeting: 'Olá, eu sou',
      title: 'Willian Barata',
      bio: 'Engenheiro de Software apaixonado por criar soluções robustas e escaláveis. Com sólida experiência em .NET e explorando o universo de React, busco constantemente novos desafios para transformar ideias em realidade através da tecnologia.'
    },
    resume: {
      title: 'Currículo',
      download: 'Baixar Currículo (PDF)',
      educationTitle: 'Formação Acadêmica',
      experienceTitle: 'Experiência Profissional',
      professionalSkills: 'Habilidades e Tecnologias',
      studyingSkills: 'Atualmente Estudando',
      education: [
        { course: 'Técnico em Desenvolvimento de Software (ênfase C#)', institution: 'SENAC', period: '2022 - 2023' },
        { course: 'Análise e Desenvolvimento de Sistemas', institution: 'UNORP', period: '2019 - 2021' },
        { course: 'Administração de Empresas', institution: 'FAECA', period: '2008 - 2012' },
        { course: 'Ensino Médio', institution: 'Nicola Mastrocola', period: 'Concluído' },
      ],
      experience: [
        { role: 'Desenvolvedor .Net Backend e NextJS', company: 'It4you', period: '9 meses' },
        { role: 'Desenvolvedor .Net Backend e ReactJS', company: 'Essere Group', period: '1 ano e 2 meses' },
        { role: 'Analista e Desenvolvedor .NET e AngularJS', company: 'Riosoft', period: '4 anos e 6 meses' },
      ],
      skills: [ 'Git', 'API Rest', 'BPMN', 'Automação de processos', 'MVC', 'Injeção de dependência', 'Entity Framework', 'SQLSERVER', 'PL/SQL', 'MYSQL', 'SQLite', 'SignalR', 'Rotativa (PDF)', 'SOLID', 'ASP.NET', 'Identity', 'JWT', 'Google Maps API', 'Impressora Zebra/Argox', 'ReactJS', 'ReactNative', 'AngularJS', 'Metodologia Ágil' ],
      studying: [ 'Docker', 'DevOps (CI/CD com Jenkins, GitHub Actions)', 'Kubernetes', 'DDD', 'Clean Code', 'Clean Architecture', 'Arquitetura Hexagonal', 'Microsserviços', 'NoSQL', 'Design Patterns C#', 'Solidity', 'Hardhat', 'Smart Contracts' ]
    },
    articles: {
      title: 'Meus Artigos',
      back: 'Voltar para os artigos',
      share: 'Compartilhar',
      shareOn: 'Compartilhar no',
      like: 'Curtir',
      comments: 'Comentários',
      commentCTA: 'Para habilitar os comentários e curtidas, integre um serviço como Disqus, Firebase ou similar.',
      posts: [
        { slug: 'clean-architecture-dotnet', title: 'Desvendando a Clean Architecture em .NET', summary: 'Uma introdução prática aos conceitos da Clean Architecture e como aplicá-la em seus projetos .NET para criar software manutenível e testável.', date: '01/08/2025', content: '<h2>O que é Clean Architecture?</h2><p>A Clean Architecture, proposta por Robert C. Martin (Uncle Bob), é um design de software que separa as preocupações do seu aplicativo em camadas. O objetivo principal é a independência: a lógica de negócios não deve depender de frameworks, bancos de dados ou UI.</p><h3>Principais Camadas:</h3><ul><li><strong>Entities:</strong> Contêm a lógica de negócio principal.</li><li><strong>Use Cases:</strong> Orquestram o fluxo de dados para e das entidades.</li><li><strong>Interface Adapters:</strong> Convertem dados para o formato mais conveniente para os use cases e entidades.</li><li><strong>Frameworks & Drivers:</strong> A camada mais externa, onde ficam a UI, banco de dados, etc.</li></ul><p>Implementar isso em .NET resulta em um código mais resiliente a mudanças e muito mais fácil de testar.</p>' },
        { slug: 'docker-para-devs-dotnet', title: 'Docker para Desenvolvedores .NET: O Guia de Início Rápido', summary: 'Aprenda o básico sobre como containerizar suas aplicações .NET com Docker, facilitando o desenvolvimento e o deploy.', date: '15/07/2025', content: '<h2>Por que Docker?</h2><p>Docker resolve o clássico problema "funciona na minha máquina". Ao empacotar sua aplicação e suas dependências em um container, você garante que ela rodará de forma consistente em qualquer ambiente.</p><h3>Passos Iniciais:</h3><ol><li>Instalar o Docker Desktop.</li><li>Criar um <strong>Dockerfile</strong> na raiz do seu projeto .NET.</li><li>Definir a imagem base (ex: <code>mcr.microsoft.com/dotnet/sdk:8.0</code>).</li><li>Copiar os arquivos do projeto e restaurar as dependências.</li><li>Construir e rodar seu container.</li></ol><p>Com poucos passos, sua aplicação está isolada e pronta para ser distribuída.</p>' },
      ],
    },
    footer: {
        text: 'Desenvolvido com ❤️ por Willian Barata'
    }
  },
  en: {
    nav: { home: 'Home', resume: 'Resume', articles: 'Articles' },
    home: {
      greeting: 'Hi, I am',
      title: 'Willian Fernando Barata dos Santos',
      bio: 'Software Engineer passionate about creating robust and scalable solutions. With solid experience in .NET and exploring the React universe, I constantly seek new challenges to turn ideas into reality through technology.'
    },
    resume: {
      title: 'Resume',
      download: 'Download Resume (PDF)',
      educationTitle: 'Education',
      experienceTitle: 'Professional Experience',
      professionalSkills: 'Skills & Technologies',
      studyingSkills: 'Currently Studying',
      education: [
        { course: 'Technical Course in Software Development (C# focus)', institution: 'SENAC', period: '2022 - 2023' },
        { course: 'Analysis and Systems Development', institution: 'UNORP', period: '2019 - 2021' },
        { course: 'Business Administration', institution: 'FAECA', period: '2008 - 2012' },
        { course: 'High School', institution: 'Nicola Mastrocola', period: 'Completed' },
      ],
      experience: [
        { role: '.Net Backend and ReactJS Developer', company: 'Essere Group', period: '1 year and 2 months' },
        { role: '.NET and AngularJS Developer', company: 'Previous Company', period: '4 years and 6 months' },
      ],
      skills: [ 'Git', 'REST API', 'BPMN', 'Process Automation', 'MVC', 'Dependency Injection', 'Entity Framework', 'SQLSERVER', 'PL/SQL', 'MYSQL', 'SQLite', 'SignalR', 'Rotativa (PDF)', 'SOLID', 'ASP.NET', 'Identity', 'JWT', 'Google Maps API', 'Zebra/Argox Printer', 'ReactJS', 'ReactNative', 'AngularJS', 'Agile Methodology' ],
      studying: [ 'Docker', 'DevOps (CI/CD with Jenkins, GitHub Actions)', 'Kubernetes', 'DDD', 'Clean Code', 'Clean Architecture', 'Hexagonal Architecture', 'Microservices', 'NoSQL', 'Design Patterns C#', 'Solidity', 'Hardhat', 'Smart Contracts' ]
    },
    articles: {
      title: 'My Articles',
      back: 'Back to articles',
      share: 'Share',
      shareOn: 'Share on',
      like: 'Like',
      comments: 'Comments',
      commentCTA: 'To enable comments and likes, integrate a service like Disqus, Firebase, or similar.',
      posts: [
        { slug: 'clean-architecture-dotnet', title: 'Unveiling Clean Architecture in .NET', summary: 'A practical introduction to the concepts of Clean Architecture and how to apply it in your .NET projects to create maintainable and testable software.', date: 'Aug 01, 2025', content: '<h2>What is Clean Architecture?</h2><p>Clean Architecture, proposed by Robert C. Martin (Uncle Bob), is a software design that separates the concerns of your application into layers. The main goal is independence: business logic should not depend on frameworks, databases, or UI.</p><h3>Main Layers:</h3><ul><li><strong>Entities:</strong> Contain the core business logic.</li><li><strong>Use Cases:</strong> Orchestrate the flow of data to and from the entities.</li><li><strong>Interface Adapters:</strong> Convert data into the most convenient format for use cases and entities.</li><li><strong>Frameworks & Drivers:</strong> The outermost layer, where the UI, database, etc., reside.</li></ul><p>Implementing this in .NET results in code that is more resilient to change and much easier to test.</p>' },
        { slug: 'docker-para-devs-dotnet', title: 'Docker for .NET Developers: The Quick Start Guide', summary: 'Learn the basics of how to containerize your .NET applications with Docker, making development and deployment easier.', date: 'Jul 15, 2025', content: '<h2>Why Docker?</h2><p>Docker solves the classic "it works on my machine" problem. By packaging your application and its dependencies into a container, you ensure that it will run consistently in any environment.</p><h3>Initial Steps:</h3><ol><li>Install Docker Desktop.</li><li>Create a <strong>Dockerfile</strong> in the root of your .NET project.</li><li>Define the base image (e.g., <code>mcr.microsoft.com/dotnet/sdk:8.0</code>).</li><li>Copy the project files and restore dependencies.</li><li>Build and run your container.</li></ol><p>With a few steps, your application is isolated and ready to be distributed.</p>' },
      ]
    },
    footer: {
        text: 'Developed with ❤️ by Willian F. B. Santos'
    }
  }
};

// Componente para um card de Artigo
const ArticleCard = ({ post, onClick, lang }: { post: any, onClick: () => void, lang: string }) => (
  <div
    className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 cursor-pointer border border-gray-200 dark:border-gray-700"
    onClick={onClick}
  >
    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{post.date}</p>
    <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-3">{post.title}</h3>
    <p className="text-gray-600 dark:text-gray-300">{post.summary}</p>
  </div>
);

// Componente para a página de um artigo específico
const ArticlePage = ({ slug, lang, onBack }: { slug: string, lang: string, onBack: () => void }) => {
    const t = portfolioData[lang].articles;
    const post = t.posts.find(p => p.slug === slug);

    if (!post) {
        return (
            <div className="text-center p-8">
                <p>Artigo não encontrado.</p>
                <button
                    onClick={onBack}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
                >
                    <ArrowLeft size={18} />
                    {t.back}
                </button>
            </div>
        );
    }
    
    const shareOnLinkedIn = () => {
        const url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}&summary=${encodeURIComponent(post.summary)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    }

    // A função de compartilhar no Instagram é mais complexa, pois a API é restrita.
    // Geralmente, direcionamos o usuário para o perfil ou usamos uma imagem.
    // Esta função apenas alerta sobre a limitação.
    const shareOnInstagram = () => {
        alert("O Instagram não permite o compartilhamento direto de links via web. Você pode compartilhar uma imagem do artigo e adicionar o link na bio!");
    }
    
    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8">
            <button
                onClick={onBack}
                className="mb-8 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
            >
                <ArrowLeft size={18} />
                {t.back}
            </button>
            
            <article>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">{post.date}</p>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">{post.title}</h1>
                <div 
                    className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
                    dangerouslySetInnerHTML={{ __html: post.content }} 
                />
            </article>

            {/* Ações do Post */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    {/*<div className="flex gap-4">
                        <button className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            <ThumbsUp size={20} />
                            <span>{t.like}</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            <MessageSquare size={20} />
                            <span>{t.comments}</span>
                        </button>
                    </div> */}
                    <div className="flex gap-2 items-center">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.share}:</span>
                        <button onClick={shareOnLinkedIn} title={`${t.shareOn} LinkedIn`} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
                            <Linkedin size={20} className="text-blue-700 dark:text-blue-400" />
                        </button>
                        {/* Ícone do Instagram como exemplo, sem funcionalidade de compartilhamento direto */}
                        <button onClick={shareOnInstagram} title="Compartilhar no Instagram (via imagem)" className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-pink-200 dark:hover:bg-pink-800 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-600 dark:text-pink-400"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Seção de Comentários 
            <div className="mt-8">
                 <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{t.comments}</h2>
                 <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg text-center">
                     <p className="text-gray-600 dark:text-gray-400">{t.commentCTA}</p>
                 </div>
            </div>
            */}
        </div>
    );
}

// Componente para a página de Currículo
const ResumePage = ({ lang }: { lang: string }) => {
  const t = portfolioData[lang].resume;
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
     {/* <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{t.title}</h1>
        <a href="#" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
          {t.download}
        </a>
      </div>
*/}
      {/* Formação */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold border-b-2 border-blue-500 pb-2 mb-4 text-gray-800 dark:text-gray-100">{t.educationTitle}</h2>
        <div className="space-y-4">
          {t.education.map((item, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg text-gray-800 dark:text-white">{item.course}</h3>
              <p className="text-blue-600 dark:text-blue-400">{item.institution}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{item.period}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Experiência */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold border-b-2 border-blue-500 pb-2 mb-4 text-gray-800 dark:text-gray-100">{t.experienceTitle}</h2>
        <div className="space-y-4">
          {t.experience.map((item, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="font-bold text-lg text-gray-800 dark:text-white">{item.role}</h3>
              <p className="text-blue-600 dark:text-blue-400">{item.company}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{item.period}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Habilidades */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold border-b-2 border-blue-500 pb-2 mb-4 text-gray-800 dark:text-gray-100">{t.professionalSkills}</h2>
        <div className="flex flex-wrap gap-2">
          {t.skills.map(skill => (
            <span key={skill} className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-sm font-medium px-3 py-1 rounded-full">{skill}</span>
          ))}
        </div>
      </section>

      {/* Estudando */}
      <section>
        <h2 className="text-2xl font-semibold border-b-2 border-blue-500 pb-2 mb-4 text-gray-800 dark:text-gray-100">{t.studyingSkills}</h2>
        <div className="flex flex-wrap gap-2">
          {t.studying.map(skill => (
            <span key={skill} className="bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200 text-sm font-medium px-3 py-1 rounded-full">{skill}</span>
          ))}
        </div>
      </section>
    </div>
  );
};

// Componente para a página Home
const HomePage = ({ lang }: { lang: string }) => {
  const t = portfolioData[lang].home;
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 min-h-[calc(100vh-128px)]">
      {/* IMPORTANTE: Substitua a URL abaixo pela sua foto.
        1. Coloque sua imagem (ex: 'profile.jpg') na pasta `public` do seu projeto Next.js.
        2. Altere o `src` para `src="/profile.jpg"`.
      */}
      <img
        src="imagemwill.jfif"
        alt="Foto de Willian Santos"
        className="w-40 h-40 rounded-full mb-6 object-cover border-4 border-blue-500 shadow-lg"
      />
      <h2 className="text-lg md:text-xl text-gray-600 dark:text-gray-300">{t.greeting}</h2>
      <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white my-2">{t.title}</h1>
      <p className="max-w-2xl text-base md:text-lg text-gray-700 dark:text-gray-200 mt-4">{t.bio}</p>
      <div className="mt-8 flex items-center justify-center gap-4">
        {/* LinkedIn */}
        <a href="https://www.linkedin.com/in/willianbarata/" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="group p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors">
            <Linkedin className="text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
        </a>
        {/* GitHub */}
        <a href="https://github.com/willianbarata" target="_blank" rel="noopener noreferrer" title="GitHub" className="group p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800 dark:text-gray-200 group-hover:text-black dark:group-hover:text-white transition-colors"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
        </a>
        {/* Instagram - IMPORTANTE: Substitua '#' pelo seu link */}
        <a href="https://www.instagram.com/devwillbr" target="_blank" rel="noopener noreferrer" title="Instagram" className="group p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-pink-100 dark:hover:bg-pink-900 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800 dark:text-gray-200 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
        </a>
        {/* YouTube - IMPORTANTE: Substitua '#' pelo seu link */}
        <a href="https://www.youtube.com/@devwill5694" target="_blank" rel="noopener noreferrer" title="YouTube" className="group p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-red-100 dark:hover:bg-red-900 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800 dark:text-gray-200 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
        </a>
      </div>
    </div>
  );
};


// Componente Principal da Aplicação
export default function PortfolioPage() {
  const [page, setPage] = useState('home'); // 'home', 'resume', 'articles', 'articleDetail'
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | null>(null);
  const [lang, setLang] = useState('pt'); // 'pt' ou 'en'
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
      if (isDarkMode) {
          document.documentElement.classList.add('dark');
      } else {
          document.documentElement.classList.remove('dark');
      }
  }, [isDarkMode]);

  const t = portfolioData[lang];

  const renderPage = () => {
    switch (page) {
      case 'resume':
        return <ResumePage lang={lang} />;
      case 'articles':
        return (
          <div className="max-w-4xl mx-auto p-4 md:p-8">
            <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">{t.articles.title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {t.articles.posts.map(post => (
                <ArticleCard
                  key={post.slug}
                  post={post}
                  lang={lang}
                  onClick={() => {
                    setSelectedArticleSlug(post.slug);
                    setPage('articleDetail');
                  }}
                />
              ))}
            </div>
          </div>
        );
       case 'articleDetail':
        if (selectedArticleSlug) {
            return <ArticlePage slug={selectedArticleSlug} lang={lang} onBack={() => setPage('articles')} />
        }
        return null;
      case 'home':
      default:
        return <HomePage lang={lang} />;
    }
  };

  const NavButton = ({ pageName, children }: { pageName: string, children: React.ReactNode }) => (
      <button
          onClick={() => setPage(pageName)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              page === pageName
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700'
          }`}
      >
          {children}
      </button>
  );

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm z-10 border-b border-gray-200 dark:border-gray-800">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="font-bold text-xl text-blue-600 dark:text-blue-400">Dev Will</span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
                <NavButton pageName="home">{t.nav.home}</NavButton>
                <NavButton pageName="resume">{t.nav.resume}</NavButton>
                <NavButton pageName="articles">{t.nav.articles}</NavButton>
            </div>
            <div className="flex items-center gap-2">
                
                  <div className="flex items-center bg-gray-200 dark:bg-gray-700 rounded-full p-1 text-sm">
                      <button onClick={() => setLang('pt')} className={`px-3 py-1 rounded-full ${lang === 'pt' ? 'bg-white dark:bg-gray-900 shadow' : ''}`}>PT</button>
                      <button onClick={() => setLang('en')} className={`px-3 py-1 rounded-full ${lang === 'en' ? 'bg-white dark:bg-gray-900 shadow' : ''}`}>EN</button>
                  </div>
                  {/*
                  <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                      {isDarkMode ? <Sun size={20} className="text-yellow-400"/> : <Moon size={20} className="text-gray-700"/>}
                  </button>
                  */}
              </div>
            
          </div>
        </nav>
      </header>

      {/* Conteúdo da Página */}
      <main>
        {renderPage()}
      </main>
      
      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-500 dark:text-gray-400">
           <p>&copy; {new Date().getFullYear()} {t.footer.text}</p>
        </div>
      </footer>
    </div>
  );
}

