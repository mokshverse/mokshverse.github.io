import React, { useState, useEffect, useRef } from 'react';
import type { Project } from '../types';
import { LogoutIcon, JSIcon, PythonIcon, ReactIcon, FigmaIcon, UserIcon, MailIcon, MessageIcon } from './IconComponents';

const projectsData: Project[] = [
  { id: 1, title: 'MokshVerse Portfolio', description: 'This very portfolio, built with React and Tailwind CSS to be a high-tech, interactive experience.', imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60', projectUrl: '#', tags: ['React', 'TypeScript', 'Tailwind CSS'] },
  { id: 2, title: 'Project Neon', description: 'A conceptual data visualization dashboard with a focus on real-time updates and a neon aesthetic.', imageUrl: 'https://images.unsplash.com/photo-1580894742597-87bc8789db3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60', projectUrl: '#', tags: ['Data Viz', 'JavaScript'] },
  { id: 3, title: 'Secure File Vault', description: 'The original version of this site, a premium secure file access system with a luxury theme.', imageUrl: 'https://images.unsplash.com/photo-1618423604369-5373a21648a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60', projectUrl: '#', tags: ['UI/UX', 'React'] },
];

const skillsData = [
  { name: 'JavaScript (ES6+)', level: 90, icon: <JSIcon className="h-6 w-6 text-[var(--neon-cyan)]" /> },
  { name: 'Python', level: 85, icon: <PythonIcon className="h-6 w-6 text-[var(--neon-cyan)]" /> },
  { name: 'HTML & CSS', level: 95, icon: null },
  { name: 'React', level: 90, icon: <ReactIcon className="h-6 w-6 text-[var(--neon-cyan)]" /> },
  { name: 'UI/UX Design', level: 80, icon: null },
  { name: 'Figma', level: 75, icon: <FigmaIcon className="h-6 w-6 text-[var(--neon-cyan)]" /> },
];

interface PortfolioProps {
  onLogout: () => void;
}

const useOnScreen = (options: IntersectionObserverInit) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return [ref, isVisible] as const;
};


const Portfolio: React.FC<PortfolioProps> = ({ onLogout }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full h-full animate-fade-in">
        <style>{`
            @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
            .animate-fade-in { animation: fade-in 0.5s ease-in forwards; }
            .section-reveal {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.6s ease-out, transform 0.6s ease-out;
            }
            .section-reveal.visible {
                opacity: 1;
                transform: translateY(0);
            }
            .progress-bar-fill {
                transform: scaleX(0);
                transform-origin: left;
                transition: transform 1.5s cubic-bezier(0.25, 1, 0.5, 1);
            }
            .progress-bar-fill.visible {
                transform: scaleX(1);
            }
            .btn-glow {
              box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
            }
            .btn-glow:hover {
              box-shadow: 0 0 25px rgba(0, 255, 255, 0.6);
            }
        `}</style>
      <header className={`fixed top-0 left-0 right-0 z-40 p-4 transition-all duration-300 ${scrolled ? 'glass-console' : 'bg-transparent'}`}>
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="#" className="font-mono text-xl text-white">Moksh<span className="text-[var(--neon-cyan)]">Verse</span></a>
          <div className="flex items-center gap-4">
              <a href="#projects" className="text-gray-300 hover:text-[var(--neon-cyan)] transition-colors">Projects</a>
              <a href="#contact" className="text-gray-300 hover:text-[var(--neon-cyan)] transition-colors">Contact</a>
              <button onClick={onLogout} className="flex items-center gap-2 text-gray-300 hover:text-red-400 transition-colors">
                  <LogoutIcon className="h-5 w-5" />
              </button>
          </div>
        </nav>
      </header>

      <main className="max-w-5xl mx-auto px-4 pt-24 pb-12">
        <SectionWrapper>
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              MokshVerse
            </h1>
            <TypingEffect text="The Digital Canvas of an Interactive Web Developer." />
          </div>
        </SectionWrapper>
        
        <SectionWrapper>
          <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Hi! I'm Moksh.</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                  A passionate web developer and digital creator focused on premium, animated, and interactive design. I specialize in bringing ideas to life with clean code and compelling user experiences.
              </p>
          </div>
        </SectionWrapper>

        <SectionWrapper id="skills">
            <h2 className="text-3xl font-bold text-white text-center mb-8">Skills & Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                {skillsData.map(skill => <SkillBar key={skill.name} skill={skill} />)}
            </div>
        </SectionWrapper>

        <SectionWrapper id="projects">
            <h2 className="text-3xl font-bold text-white text-center mb-8">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projectsData.map(proj => <ProjectCard key={proj.id} project={proj} />)}
            </div>
        </SectionWrapper>

        <SectionWrapper id="contact">
            <h2 className="text-3xl font-bold text-white text-center mb-8">Send Feedback</h2>
             <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" className="max-w-xl mx-auto space-y-8">
                <div className="relative border-b-2 border-gray-600 focus-within:border-[var(--neon-cyan)] transition-colors duration-300">
                    <UserIcon className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      required
                      className="w-full bg-transparent border-none py-3 pl-8 pr-2 text-white placeholder-gray-500 focus:outline-none focus:placeholder-cyan-400"
                    />
                  </div>
                  <div className="relative border-b-2 border-gray-600 focus-within:border-[var(--neon-cyan)] transition-colors duration-300">
                    <MailIcon className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      required
                      className="w-full bg-transparent border-none py-3 pl-8 pr-2 text-white placeholder-gray-500 focus:outline-none focus:placeholder-cyan-400"
                    />
                  </div>
                  <div className="relative border-b-2 border-gray-600 focus-within:border-[var(--neon-cyan)] transition-colors duration-300">
                    <MessageIcon className="absolute left-0 top-4 h-5 w-5 text-gray-500" />
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      rows={4}
                      required
                      className="w-full bg-transparent border-none py-3 pl-8 pr-2 text-white placeholder-gray-500 focus:outline-none focus:placeholder-cyan-400 resize-none"
                    ></textarea>
                  </div>
                <button type="submit" className="w-full bg-[var(--neon-cyan)] text-black font-bold py-3 rounded-lg hover:bg-white btn-glow transition-all duration-300 transform hover:scale-105 active:scale-100">Send Message</button>
            </form>
        </SectionWrapper>
      </main>
    </div>
  );
};

const TypingEffect: React.FC<{ text: string }> = ({ text }) => {
    const [displayedText, setDisplayedText] = useState('');
    useEffect(() => {
        let i = 0;
        const intervalId = setInterval(() => {
            setDisplayedText(text.substring(0, i + 1));
            i++;
            if (i >= text.length) {
                clearInterval(intervalId);
            }
        }, 50);
        return () => clearInterval(intervalId);
    }, [text]);

    return <p className="font-mono text-lg md:text-xl text-[var(--neon-cyan)] h-8">{displayedText}<span className="animate-ping">_</span></p>
}

const SectionWrapper: React.FC<{ children: React.ReactNode, id?: string }> = ({ children, id }) => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
    return (
        <section ref={ref} id={id} className={`py-16 md:py-20 section-reveal ${isVisible ? 'visible' : ''}`}>
            {children}
        </section>
    )
}

const SkillBar: React.FC<{ skill: { name: string, level: number, icon: React.ReactNode } }> = ({ skill }) => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.5 });
    return (
        <div ref={ref}>
            <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                    {skill.icon}
                    <h3 className="text-white font-medium">{skill.name}</h3>
                </div>
                <p className="text-gray-400 text-sm">{skill.level}%</p>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
                <div className={`bg-[var(--neon-cyan)] h-2 rounded-full progress-bar-fill ${isVisible ? 'visible' : ''}`} style={{ width: `${skill.level}%` }}></div>
            </div>
        </div>
    )
}

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    return (
        <div className="glass-console rounded-lg overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300">
            <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
            <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => <span key={tag} className="bg-cyan-900/50 text-cyan-300 text-xs font-mono px-2 py-1 rounded">{tag}</span>)}
                </div>
                <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="inline-block font-mono text-sm text-[var(--neon-cyan)] hover:text-white transition-colors">View Project &rarr;</a>
            </div>
        </div>
    )
}


export default Portfolio;