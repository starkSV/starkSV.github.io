import React from "react";
import "./skills-carousel.css"; // Now much smaller!

const SKILLS = [
  "React",
  "Tailwind",
  "Python",
  "Node.js",
  "Postgres",
  "Docker",
  "Vite",
  "Git",
  "Redis",
  "Figma",
  "WordPress",
  "Photoshop",
  "DaVinci Resolve",
  "OpenAI",
  "PHP",
  "DigitalOcean",
  "FastAPI",
];

function Row({ items, reverse = false, speed = 28 }) {
  // duplicate the list to create seamless scroll
  const doubled = [...items, ...items];
  const style = { "--scroll-duration": `${speed}s` };
  
  return (
    <div className="relative w-full block py-1 overflow-hidden">
      <div
        className={`skills-track flex gap-4 items-center whitespace-nowrap py-2 ${reverse ? "reverse" : ""}`}
        style={style}
        aria-hidden
      >
        {doubled.map((text, i) => (
          <div 
            key={i} 
            className="inline-flex items-center justify-center px-4 py-2.5 rounded-full bg-white/[0.04] text-slate-200 border border-white/[0.06] text-sm min-w-[86px] text-center select-none shadow-[0_6px_18px_rgba(2,6,23,0.35)_inset] md:px-3 md:py-2 md:text-xs md:min-w-[72px] md:gap-2.5"
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SkillsCarousel() {
  return (
    <section id="skills-carousel" className="py-12">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-white">Skills Cloud</h2>
          <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
            Quick glance at tools and skills. Hover to pause animation.
          </p>
        </div>

        <div className="space-y-4">
          <div className="group">
            <Row items={SKILLS.slice(0, Math.ceil(SKILLS.length / 2))} reverse={false} speed={28} />
          </div>

          <div className="group">
            <Row items={SKILLS.slice(Math.ceil(SKILLS.length / 2))} reverse={true} speed={32} />
          </div>
        </div>
      </div>
    </section>
  );
}