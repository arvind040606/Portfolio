import React, { useState } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Journey } from './components/Journey';
import { Skills } from './components/Skills';
import { SelectedWork } from './components/SelectedWork';
import { LiveProjects } from './components/LiveProjects';
import { AILab } from './components/AILab';
import { ArvindAI } from './components/ArvindAI';
import { Contact } from './components/Contact';
import { CaseStudyModal } from './components/CaseStudyModal';
import { Project } from './data/projects';

export function App() {
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);

  const handleTryLive = (project: Project) => {
    const liveSection = document.getElementById('live');
    if (liveSection) {
      liveSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#030304] text-white font-sans selection:bg-[#00f0ff] selection:text-black relative overflow-x-hidden">
      {/* Custom Interactive Floating Cursor */}
      <CustomCursor />

      {/* Floating Editorial Header Navigation */}
      <Navbar onOpenAI={() => setIsAIOpen(true)} />

      {/* Main Page Sections */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Journey />
        <Skills />
        <SelectedWork
          onSelectCaseStudy={(proj) => setSelectedCaseStudy(proj)}
          onTryLive={handleTryLive}
        />
        <LiveProjects
          onSelectCaseStudy={(proj) => setSelectedCaseStudy(proj)}
        />
        <AILab />
        <Contact />
      </main>

      {/* Interactive AI Assistant Modal */}
      <ArvindAI isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />

      {/* Case Study Detail Modal */}
      <CaseStudyModal
        project={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        onTryLive={handleTryLive}
      />
    </div>
  );
}

export default App;
