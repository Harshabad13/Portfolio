import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import SpaceBackground from './components/SpaceBackground';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Certifications from './components/Certifications';

const App = React.memo(() => {
  return (
    <ThemeProvider>
      <div className="min-h-screen relative">
        <SpaceBackground />
        <div className="relative z-10">
          <Header />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Timeline />
          <Certifications />
          <Contact />
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
});

App.displayName = 'App';

export default App;