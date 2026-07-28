import React, { useEffect, useRef, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Login from './ui/pages/Login.jsx';
import Register from './ui/pages/Register.jsx';
import './styles/App.css';
import logo from './ui/assets/logo.png';

// =========================================================
// TRANSICIÓN SUAVE DE PÁGINAS (SIN DESTELLOS NEGROS)
// =========================================================
const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.25, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.15, ease: 'easeIn' } },
};

const AnimatedPage = ({ children }) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#F8FAFC',
      }}
    >
      {children}
    </motion.div>
  );
};

// =========================================================
// COMPONENTE: CAMPO ESPACIAL VISUAL DE PARTÍCULAS ROJAS
// =========================================================
const RedSpaceBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };
    window.addEventListener('resize', handleResize);

    let particles = [];
    const particleCount = 220;

    const redPalette = [
      'rgba(163, 13, 17, ',   // Rojo Inklusport principal
      'rgba(225, 29, 72, ',   // Rojo Rubí brillante
      'rgba(244, 63, 94, ',   // Coral Neón
      'rgba(255, 77, 77, ',   // Rojo Espacial Claro
      'rgba(180, 20, 30, ',   // Rojo Profundo
    ];

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const depth = Math.random() * 0.85 + 0.15;

        particles.push({
          x,
          y,
          depth,
          size: (Math.random() * 2.8 + 1.0) * depth,
          colorPrefix: redPalette[Math.floor(Math.random() * redPalette.length)],
          alpha: Math.random() * 0.45 + 0.35,
          vx: (Math.random() - 0.5) * 0.4 * depth,
          vy: (Math.random() - 0.5) * 0.4 * depth,
        });
      }
    };

    initParticles();

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        if (p.depth > 0.6) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 1.8, 0, Math.PI * 2);
          ctx.fillStyle = `${p.colorPrefix}${(p.alpha * 0.2).toFixed(2)})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.colorPrefix}${p.alpha.toFixed(2)})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
};

// =========================================================
// COMPONENTE LANDING / BIENVENIDA (RAÍZ "/")
// =========================================================
const Landing = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap');
      `}</style>

      {/* 1. RETÍCULA DE FONDO */}
      <div style={styles.gridOverlay}></div>

      {/* 2. CAPA ESPACIAL DE PARTÍCULAS ROJAS */}
      <RedSpaceBackground />

      {/* 3. TARJETA PRINCIPAL SPLIT */}
      <main style={styles.authCard}>
        {/* PANEL IZQUIERDO HERO */}
        <div style={styles.heroPanel}>
          <div style={styles.heroOverlay}></div>
          <div style={styles.heroContent}>
            <span style={styles.highlightText}>SIN LÍMITES</span>
            <h1 style={styles.heroTitle}>
              Impulsamos el<br />deporte adaptado.
            </h1>
            <p style={styles.heroDesc}>
              Tecnología, inclusión y rendimiento para construir un futuro sin barreras.
            </p>
          </div>
        </div>

        {/* PANEL DERECHO ACCIONES */}
        <div style={styles.formPanel}>
          <div style={styles.cardHeader}>
            <div style={styles.logoFrame}>
              <img src={logo} alt="Inklusport Logo" style={styles.logo} />
            </div>
            <h2 style={styles.cardTitle}>Bienvenido</h2>
            <div style={styles.titleLine}></div>
            <p style={styles.cardSubtitle}>
              Tu plataforma para el deporte adaptado de alto rendimiento.
            </p>
          </div>

          <div style={styles.buttonGroup}>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleLogin}
              style={styles.loginButton}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#890A0D')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#A30D11')}
            >
              Iniciar sesión <span style={{ marginLeft: '4px' }}>&gt;</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleRegister}
              style={styles.registerButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FEF2F2';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                  <path d="M19 11v6m3-3h-6" />
                </svg>
                <span>Registrarse</span>
                <span style={{ marginLeft: '4px' }}>&gt;</span>
              </div>
            </motion.button>
          </div>

          <div style={styles.authSocial}>
            <span style={styles.authDivider}>ÚNETE A LA COMUNIDAD</span>
            <div style={styles.socialButtons}>
              <button type="button" style={styles.socialBtn} title="Google">
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              </button>
              <button type="button" style={styles.socialBtn} title="Apple ID">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#000000">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.62-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.65 1.35-.58.67-1.09 1.75-.95 2.78 1.01.08 2.05-.53 2.68-1.28z"/>
                </svg>
              </button>
              <button type="button" style={styles.socialBtn} title="Correo">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A30D11" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// =========================================================
// COMPONENTE HOME (DASHBOARD PRINCIPAL CON MENÚ LATERAL)
// =========================================================


export default App;