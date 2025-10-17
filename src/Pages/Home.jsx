import React from 'react';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import FeaturedProjects from '../components/FeaturedProjects';
import Blogs from '../components/Blogs';
import Contact from '../components/Contact';

export default function HomePage() {
  return (
    <>
      <Hero
        id="home"
        name="Shekhar Vaidya"
        title="Blogger. Tech Writer. Builder."
        ctaWorkHref="#projects"
        ctaContactHref="#contact"
        image="/assets/hero-photo.jpg"
        resumeHref="/assets/ShekharResume.pdf"
      />
      
      <Skills />

      <Blogs itemsPerFeed={5} />      
      
      <FeaturedProjects />
      
      <Contact 
        emailjsConfig={{
          serviceId: "service_swubjt9",     
          templateId: "template_xl5505m",     
          publicKey: "h9ZA1tIrtzGXLl1lK" 
        }}
        fallbackEmail="shekhar@tech-latest.com"
      />
    </>
  );
}