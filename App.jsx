import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, OrbitControls, Stars, Sparkles } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail, Menu, MoveUpRight, Sparkles as SparkleIcon, X } from 'lucide-react';
import * as THREE from 'three';

function Orb() {
  const group = useRef();
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.13;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.12;
    }
  });
  return <group ref={group}>
    <Float speed={1.5} rotationIntensity={0.35} floatIntensity={0.8}>
      <mesh>
        <icosahedronGeometry args={[1.35, 5]} />
        <MeshDistortMaterial color="#8b5cf6" roughness={0.17} metalness={0.72} distort={0.32} speed={1.8} />
      </mesh>
      <mesh scale={1.58} rotation={[0.8, 0.2, 0.3]}>
        <torusGeometry args={[1.1, 0.012, 12, 180]} />
        <meshBasicMaterial color="#a5f3fc" />
      </mesh>
      <mesh scale={1.82} rotation={[1.2, 0.7, 0.1]}>
        <torusGeometry args={[1.1, 0.008, 8, 180]} />
        <meshBasicMaterial color="#ec4899" />
      </mesh>
    </Float>
  </group>;
}

function Scene() {
  return <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
    <ambientLight intensity={0.8} />
    <pointLight position={[3, 3, 4]} intensity={22} color="#a78bfa" />
    <pointLight position={[-4, -2, 1]} intensity={13} color="#22d3ee" />
    <Suspense fallback={null}>
      <Stars radius={55} depth={40} count={1600} factor={3} saturation={0.25} fade speed={0.5} />
      <Sparkles count={80} scale={5.8} size={2.2} speed={0.25} color="#c4b5fd" />
      <Orb />
    </Suspense>
    <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.65} />
  </Canvas>;
}

const projects = [
  { n: '01', title: 'AUREL / DIGITAL ATELIER', type: 'E-COMMERCE EXPERIENCE', year: '2026', color: 'violet', desc: 'A minimal luxury fashion universe with editorial product storytelling.' },
  { n: '02', title: 'DREAMBUILD STUDIO', type: 'AI / WEB PLATFORM', year: '2026', color: 'cyan', desc: 'A visual website creation concept designed to make building feel effortless.' },
  { n: '03', title: 'NEON ARCHIVE', type: 'INTERACTIVE EXPERIMENT', year: '2026', color: 'pink', desc: 'An experimental digital world exploring motion, light and 3D interfaces.' },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };
  const email = 'hello@example.com';

  return <main>
    <div className="noise" />
    <header className="nav">
      <a className="brand" href="#top" onClick={(e) => {e.preventDefault(); scrollTo('top');}}>S<span>✳</span>P<span className="brand-dot">.</span></a>
      <div className="nav-status"><i /> AVAILABLE FOR SELECT PROJECTS</div>
      <button className="menu-button" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
        <button onClick={() => scrollTo('work')}>WORK <span>↘</span></button>
        <button onClick={() => scrollTo('about')}>ABOUT <span>↘</span></button>
        <button className="contact-nav" onClick={() => scrollTo('contact')}>LET'S TALK <ArrowUpRight size={14}/></button>
      </nav>
    </header>

    <section className="hero" id="top">
      <div className="hero-copy">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }} className="eyebrow"><span className="eyebrow-line"/> INDEPENDENT DIGITAL CREATOR · INDIA</motion.div>
        <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .12 }}>DESIGNING<br/>THE <em>UNSEEN.</em></motion.h1>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .25 }}>I build expressive digital experiences where thoughtful design meets playful technology.</motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .5 }} className="hero-actions">
          <button className="primary-button" onClick={() => scrollTo('work')}>EXPLORE MY WORK <ArrowDownRight size={16}/></button>
          <span className="scroll-hint">SCROLL TO EXPLORE ↓</span>
        </motion.div>
      </div>
      <div className="scene-wrap"><div className="scene-glow"/><Scene/><div className="scene-label top-label">FIG. 001 — DIGITAL MATTER</div><div className="scene-label bottom-label">DRAG TO ROTATE <span>✳</span> REAL-TIME 3D</div><div className="scene-coordinates">21° 15' N<br/>81° 38' E</div></div>
      <div className="hero-index"><span>01 / 04</span><span>PORTFOLIO — 2026</span></div>
    </section>

    <section className="marquee" aria-label="Skills"><div className="marquee-track">{Array.from({length: 2}, (_,i) => <span key={i}>CREATIVE DEVELOPMENT <b>✳</b> INTERACTIVE DESIGN <b>✳</b> 3D WORLDS <b>✳</b> DIGITAL CRAFT <b>✳</b> </span>)}</div></section>

    <section className="work section-pad" id="work">
      <div className="section-heading"><div><span className="eyebrow">[ SELECTED EXPERIMENTS ]</span><h2>Ideas in<br/><em>motion.</em></h2></div><p>A small collection of concepts, experiments and digital places I'm bringing to life.</p></div>
      <div className="project-list">{projects.map((p,i) => <motion.button whileHover={{ x: 5 }} key={p.n} className={`project-row ${p.color} ${active===i?'selected':''}`} onClick={() => setActive(i)}>
        <span className="project-number">{p.n}</span><span className="project-main"><strong>{p.title}</strong><small>{p.type}</small></span><span className="project-year">{p.year}</span><span className="project-arrow"><MoveUpRight size={20}/></span>
      </motion.button>)}</div>
      <motion.div key={active} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className={`project-detail ${projects[active].color}`}><div className="detail-orb"><span>{projects[active].n}</span></div><div><span className="eyebrow">PROJECT NOTE / {projects[active].year}</span><h3>{projects[active].title}</h3><p>{projects[active].desc}</p></div><span className="detail-tag">CONCEPT / IN PROGRESS</span></motion.div>
    </section>

    <section className="about section-pad" id="about">
      <div className="about-left"><span className="eyebrow">[ A LITTLE ABOUT ME ]</span><h2>Curiosity is<br/>my <em>superpower.</em></h2><div className="about-stamp"><SparkleIcon size={22}/><span>ALWAYS<br/>EXPLORING</span></div></div>
      <div className="about-right"><p className="about-lead">I'm a future-focused creator fascinated by the space between technology and imagination.</p><p>From web experiences to AI-powered ideas, I'm learning by building — one experiment at a time. I believe the internet can feel more human, surprising and alive.</p><div className="skill-grid"><div><span>01</span><strong>VISUAL DESIGN</strong></div><div><span>02</span><strong>FRONTEND</strong></div><div><span>03</span><strong>3D & MOTION</strong></div><div><span>04</span><strong>AI EXPERIMENTS</strong></div></div></div>
    </section>

    <section className="contact section-pad" id="contact"><div className="contact-orbit"><div className="orbit-ring ring-one"/><div className="orbit-ring ring-two"/><span>✳</span></div><div className="contact-content"><span className="eyebrow">[ HAVE A GOOD IDEA? ]</span><h2>Let's make<br/>something <em>real.</em></h2><p>Have a project, a wild idea, or just want to say hello?</p><button className="primary-button" onClick={() => {navigator.clipboard?.writeText(email).then(()=>setCopied(true)).catch(()=>{}); window.location.href = `mailto:${email}`;}}> {copied ? 'EMAIL COPIED!' : 'START A CONVERSATION'} <ArrowUpRight size={16}/></button><small className="email-note">DEMO EMAIL: hello@example.com — REPLACE WITH YOURS</small></div></section>

    <footer><a className="brand" href="#top" onClick={(e)=>{e.preventDefault();scrollTo('top')}}>S<span>✳</span>P<span className="brand-dot">.</span></a><span>DESIGNED IN THE DIGITAL UNIVERSE © 2026</span><div className="socials"><a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17}/></a><a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17}/></a><a href="mailto:hello@example.com" aria-label="Email"><Mail size={17}/></a></div></footer>
  </main>;
}

export default App;
