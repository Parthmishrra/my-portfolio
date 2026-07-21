"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import * as THREE from "three";

type Project = { name: string; tag: string; pitch: string; metric: string; tone: string; link?: string };

const projects: Project[] = [
  { name: "fidelity-RAG", tag: "Enterprise AI / Python", metric: "Self-correcting retrieval", tone: "violet", link: "https://github.com/Parthmishrra/fidelity-RAG", pitch: "High-fidelity agentic RAG pipeline for complex PDFs, pairing LangGraph and Unstructured with multi-query expansion, FlashRank reranking, and automated Ragas / TruLens evaluation." },
  { name: "autonomous-dev-team", tag: "Multi-Agent Systems", metric: "From feature brief to tests", tone: "blue", link: "https://github.com/Parthmishrra/autonomous-dev-team", pitch: "An autonomous development team built with Python, CrewAI, and FastAPI that turns raw requests into system designs, production-grade code, and test suites." },
  { name: "equinox-ui", tag: "Frontend Engineering", metric: "100% unit-test focus", tone: "lime", link: "https://github.com/Parthmishrra/equinox-ui", pitch: "A token-driven, highly accessible component laboratory built with Next.js SSR, TypeScript, Tailwind, Vitest, and React Testing Library." },
  { name: "SmartHire AI", tag: "Full-Stack MERN", metric: "45% less manual parsing", tone: "orange", link: "https://github.com/Parthmishrra/smarthire-ai", pitch: "AI-powered candidate screening that reduces resume parsing time, while supporting up to 500 concurrent users." },
  { name: "Campus Connect", tag: "RESTful Architecture", metric: "40% lower query latency", tone: "pink", link: "https://github.com/Parthmishrra/campus-connect", pitch: "MERN student collaboration and events portal with a focused data layer that improved API response times by 200ms." },
  { name: "FitTrack Pro", tag: "Performance Optimization", metric: "98 Lighthouse performance", tone: "silver", link: "https://github.com/Parthmishrra/fit-track-pro", pitch: "Responsive fitness tracking experience refined across 12 mobile device profiles without compromising speed or visual precision." }
];

const skillGroups = [
  ["JavaScript (ES6+)", "TypeScript", "Java", "Python", "SQL", "HTML5", "CSS3"],
  ["React.js", "Next.js", "Node.js", "Express.js"],
  ["Figma", "Adobe XD", "High-Fidelity UI", "Design Systems", "Wireframing", "Accessibility"],
  ["REST API Design", "Build Pipelines", "Web Infrastructure", "Agile / Scrum", "Git", "GitHub", "Vite", "Postman", "Vercel", "npm / Yarn"]
];

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, 1, .1, 100); camera.position.z = 17;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true }); renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
    const count = 520; const positions = new Float32Array(count * 3); const colors = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) { const radius = 3 + Math.random() * 13; const theta = Math.random() * Math.PI * 2; const height = (Math.random() - .5) * 12; positions.set([Math.cos(theta) * radius, height, Math.sin(theta) * radius - 5], index * 3); const accent = Math.random() > .88; colors.set(accent ? [.72, 1, .27] : [.74, .74, .74], index * 3); }
    const geometry = new THREE.BufferGeometry(); geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3)); geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const material = new THREE.PointsMaterial({ size: .045, vertexColors: true, transparent: true, opacity: .8, sizeAttenuation: true }); const stars = new THREE.Points(geometry, material); scene.add(stars);
    const grid = new THREE.GridHelper(28, 28, 0x526532, 0x222222); grid.position.y = -5.5; grid.position.z = -7; grid.material.transparent = true; grid.material.opacity = .22; scene.add(grid);
    const mouse = new THREE.Vector2(); let frame = 0;
    const resize = () => { const { width, height } = canvas.getBoundingClientRect(); renderer.setSize(width, height, false); camera.aspect = width / height; camera.updateProjectionMatrix(); };
    const draw = () => { stars.rotation.y += .0012; stars.rotation.x += (mouse.y * .1 - stars.rotation.x) * .018; stars.rotation.z += (mouse.x * .05 - stars.rotation.z) * .018; grid.rotation.z = stars.rotation.z * .45; renderer.render(scene, camera); frame = requestAnimationFrame(draw); };
    const move = (event: MouseEvent) => { const rect = canvas.getBoundingClientRect(); mouse.x = ((event.clientX - rect.left) / rect.width - .5) * 2; mouse.y = -((event.clientY - rect.top) / rect.height - .5) * 2; };
    resize(); window.addEventListener("resize", resize); window.addEventListener("mousemove", move); draw();
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); window.removeEventListener("mousemove", move); geometry.dispose(); material.dispose(); renderer.dispose(); };
  }, []);
  return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />;
}

function TiltCard({ project, index }: { project: Project; index: number }) {
  const x = useMotionValue(0), y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-.5, .5], [8, -8]), { stiffness: 260, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-.5, .5], [-8, 8]), { stiffness: 260, damping: 20 });
  const translateZ = useSpring(useTransform(x, [-.5, .5], [6, -6]), { stiffness: 260, damping: 20 });
  function move(event: React.MouseEvent<HTMLElement>) { const rect = event.currentTarget.getBoundingClientRect(); x.set((event.clientX - rect.left) / rect.width - .5); y.set((event.clientY - rect.top) / rect.height - .5); }
  const arrow = project.link ? <a href={project.link} target="_blank" rel="noreferrer" className="project-arrow" aria-label={`Open ${project.name} on GitHub`}><span aria-hidden="true">↗</span></a> : <span className="project-arrow" aria-hidden="true">↗</span>;
  return <motion.article onMouseMove={move} onMouseLeave={() => { x.set(0); y.set(0); }} style={{ rotateX, rotateY, x: translateZ, transformPerspective: 1000 }} className={`project-card project-${project.tone} ${index === 0 ? "project-featured" : ""}`}>
    <div className="project-no">0{index + 1}</div><div className="project-orb" />
    <p className="eyebrow">{project.tag}</p><h3>{project.name}</h3><p className="project-pitch">{project.pitch}</p>
    <div className="project-metric"><span>Performance note</span><strong>{project.metric}</strong></div>
    {arrow}
  </motion.article>;
}

function CustomCursor() {
  const x = useMotionValue(-100), y = useMotionValue(-100); const springX = useSpring(x, { stiffness: 700, damping: 40 }); const springY = useSpring(y, { stiffness: 700, damping: 40 });
  useEffect(() => { const move = (event: MouseEvent) => { x.set(event.clientX); y.set(event.clientY); }; window.addEventListener("mousemove", move); return () => window.removeEventListener("mousemove", move); }, [x, y]);
  return <motion.div className="cursor" style={{ x: springX, y: springY }} aria-hidden="true" />;
}

const reveal = { initial: { opacity: 0, y: 28, scale: .98 }, whileInView: { opacity: 1, y: 0, scale: 1 }, viewport: { once: true, margin: "-80px" }, transition: { duration: .72, ease: [0.22, 1, 0.36, 1] } };

export default function Home() {
  useEffect(() => { document.documentElement.style.scrollBehavior = "smooth"; return () => { document.documentElement.style.scrollBehavior = "auto"; }; }, []);
  return <main>
    <CustomCursor /><section className="hero" id="top"><ParticleField /><nav><a href="#top" className="brand">Parth<span>®</span></a><div className="nav-links"><a href="#archive">Archive</a><a href="#lab">Lab</a><a href="#contact">Contact</a></div><a href="mailto:parthmishra1303@gmail.com" className="availability"><i /> Available for select work</a></nav>
      <div className="hero-content"><motion.p className="eyebrow hero-kicker" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2 }}>Independent digital practice / 2026</motion.p><motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: .25, ease: [0.22, 1, 0.36, 1] }}>Bridging the gap between <em>complex engineering logic</em> and clean interface aesthetics.</motion.h1><motion.div className="hero-bottom" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .8, delay: .65 }}><p>Partha Sarathi Mishra — Software Engineer &amp; UI/UX Designer based in Bengaluru. Architecting high-fidelity digital infrastructure and premium visual systems.</p><div className="hero-actions"><a className="button button-primary" href="#archive">Explore Engineering <span>↓</span></a><a className="button" href="#lab">Design Lab <span>↗</span></a></div></motion.div></div><a className="scroll-cue" href="#archive"><span /> Scroll to explore</a>
    </section>

    <section className="intro-strip"><p>Software engineering <span>×</span> interface systems <span>×</span> visual precision <span>×</span> rigorous performance</p></section>

    <section id="archive" className="section experience"><motion.div {...reveal} className="section-heading"><p className="eyebrow">01 / Experience archive</p><h2>Impact, <em>made tangible.</em></h2><p>Two environments. One consistent point of view: the details that make digital systems feel effortless are engineered, never accidental.</p></motion.div>
      <div className="timeline"><motion.article {...reveal} className="experience-card"><div className="timeline-dot" /><p className="experience-date">May 2026 — Present</p><div className="experience-main"><p className="eyebrow">Orion Services Pvt. Ltd.</p><h3>Junior Software Engineer</h3><ul><li><strong>Core Web Infrastructure</strong> — Achieved 99.9% server uptime and cut page load latency by 32% through refined build pipelines.</li><li><strong>Design System Engineering</strong> — Embedded design resource for the InMobi corporate ecosystem, accelerating approval cycles by 40%.</li><li><strong>Workflow Optimization</strong> — Reduced design-to-development handoff time by 35% with precise component specifications.</li></ul></div><p className="experience-index">01</p></motion.article>
        <motion.article {...reveal} transition={{ ...reveal.transition, delay: .13 }} className="experience-card"><div className="timeline-dot" /><p className="experience-date">Sep 2021 — Feb 2024</p><div className="experience-main"><p className="eyebrow">11x Infisol | Bhubaneswar, India</p><h3>Part-Time Frontend Developer</h3><ul><li><strong>Responsive UI Architecture</strong> — Engineered responsive interfaces and reusable React components, increasing code reusability by 40% and reducing frontend bug reports by 20%.</li><li><strong>Agile Delivery</strong> — Accelerated sprint delivery cycles and increased feature deployment velocity by 25% over 12 consecutive sprints through close collaboration with engineering teams.</li></ul></div><p className="experience-index">02</p></motion.article>
        <motion.article {...reveal} transition={{ ...reveal.transition, delay: .2 }} className="experience-card"><div className="timeline-dot" /><p className="experience-date">Feb 2021 — Aug 2021</p><div className="experience-main"><p className="eyebrow">11x Infisol | Bhubaneswar, India</p><h3>Frontend Developer Intern</h3><ul><li><strong>Navigation Systems</strong> — Established user-centric navigation patterns that improved task completion rates by 30% and reduced bounce rates by 15%.</li><li><strong>Accessible Wireframes</strong> — Turned early wireframes into accessible interaction flows that strengthened the foundation for later frontend growth.</li></ul></div><p className="experience-index">03</p></motion.article></div>
    </section>

    <section id="lab" className="section lab"><motion.div {...reveal} className="section-heading section-heading-wide"><p className="eyebrow">02 / Technical workshops</p><h2>Built for <em>the edge case.</em></h2><p>A collection of systems built to hold up in the real world — complex inputs, constrained time, ambitious goals.</p></motion.div><div className="project-grid">{projects.map((project, index) => <TiltCard project={project} index={index} key={project.name} />)}</div>
    </section>

    <section className="section skills"><motion.div {...reveal} className="skills-top"><div className="section-heading"><p className="eyebrow">03 / Skills matrix</p><h2>Fluent across <em>the stack.</em></h2></div><p className="skills-note">From the first visual token to the production handoff, each tool has a role in making the finished system more capable.</p></motion.div><div className="skills-grid">{skillGroups.map((group, groupIndex) => <motion.div {...reveal} transition={{ ...reveal.transition, delay: groupIndex * .08 }} className="skill-cluster" key={group[0]}><p className="eyebrow">{["Languages", "Frameworks", "Design / UX", "Engineering / Tools"][groupIndex]}</p><div className="skill-list">{group.map((skill) => <span className="skill" key={skill}><i aria-hidden="true">✦</i>{skill}</span>)}</div></motion.div>)}</div>
    </section>

    <footer id="contact"><div className="footer-glow" /><motion.div {...reveal} className="contact-top"><p className="eyebrow">04 / Start a conversation</p><h2>Let’s build something <em>exceptional.</em></h2><a className="email-link" href="mailto:parthmishra1303@gmail.com">parthmishra1303@gmail.com <span>↗</span></a></motion.div><div className="terminal"><div className="terminal-bar"><span /><span /><span /><p>connection_status</p></div><p><b>~/partha</b> <span className="terminal-prompt">$</span> location --check</p><p className="terminal-output">Location: Bengaluru, India</p><p><b>~/partha</b> <span className="terminal-prompt">$</span> availability --now</p><p className="terminal-output">Active Status: <strong>Open to Innovation</strong><i /></p></div><div className="footer-bottom"><p>© 2026 Partha Sarathi Mishra</p><div><a href="https://www.linkedin.com/in/parthmishrra" target="_blank">LinkedIn</a><a href="https://github.com/Parthmishrra" target="_blank">GitHub</a></div><a href="#top">Back to top ↑</a></div></footer>
  </main>;
}
