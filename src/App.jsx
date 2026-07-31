// App.jsx - VERSIÓN CORREGIDA
import React, { useEffect, useRef } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Login from './ui/pages/Login.jsx';
import Register from './ui/pages/Register.jsx';
import Home from './ui/pages/Home.jsx'; // <--- NUEVA IMPORTACIÓN DEL DASHBOARD
import Accessibility from './ui/pages/accessibility.jsx';
import Notifications from './ui/pages/Notifications.jsx';
import Profile from './ui/pages/Profile.jsx';
import './styles/App.css';
import logo from './ui/assets/logo.png';

// =========================================================
// TRANSICIÓN SUAVE DE PÁGINAS
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
        backgroundColor: 'var(--app-bg-color, #F8FAFC)',
        color: 'var(--app-text-color, #111827)',
      }}
    >
      {children}
    </motion.div>
  );
};

// COMPONENTE: CAMPO ESPACIAL VISUAL DE PARTÍCULAS ROJAS
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
      'rgba(163, 13, 17, ',
      'rgba(225, 29, 72, ',
      'rgba(244, 63, 94, ',
      'rgba(255, 77, 77, ',
      'rgba(180, 20, 30, ',
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

// COMPONENTE LANDING (PÁGINA DE INICIO)
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

      <div style={styles.gridOverlay}></div>
      <RedSpaceBackground />

      <main style={styles.authCard}>
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
              Iniciar sesión
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
// COMPONENTE PRINCIPAL CON ENRUTAMIENTO
// =========================================================
function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="popLayout">
      <Routes location={location} key={location.pathname}>
        {/* Landing */}
        <Route path="/" element={<AnimatedPage><Landing /></AnimatedPage>} />
        
        {/* Login y Register */}
        <Route path="/login" element={<AnimatedPage><Login /></AnimatedPage>} />
        <Route path="/register" element={<AnimatedPage><Register /></AnimatedPage>} />
        
        {/* Dashboard - Home (NUEVO) */}
        <Route path="/home" element={<AnimatedPage><Home /></AnimatedPage>} />
        <Route path="/accessibility" element={<AnimatedPage><Accessibility /></AnimatedPage>} />
        <Route path="/notifications" element={<AnimatedPage><Notifications /></AnimatedPage>} />
        <Route path="/profile" element={<AnimatedPage><Profile /></AnimatedPage>} />
      </Routes>
    </AnimatePresence>
  );
}

// ============================================
// ESTILOS DEL LANDING
// ============================================
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#F8FAFC',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    margin: 0,
    padding: '20px 40px',
    boxSizing: 'border-box',
    position: 'fixed',
    top: 0,
    left: 0,
    overflow: 'hidden',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 9999,
  },
  gridOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundImage:
      'linear-gradient(rgba(148, 163, 184, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.05) 1px, transparent 1px)',
    backgroundSize: '36px 36px',
    zIndex: 1,
    pointerEvents: 'none',
  },
  authCard: {
    display: 'flex',
    width: '100%',
    maxWidth: '950px',
    height: 'calc(100vh - 100px)',
    maxHeight: '600px',
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    boxShadow: '0 20px 40px rgba(15, 23, 42, 0.08)',
    overflow: 'hidden',
    margin: 'auto',
    zIndex: 5,
    border: '1px solid #E2E8F0',
  },
  heroPanel: {
    flex: 1.1,
    position: 'relative',
    backgroundColor: '#A30D11',
    backgroundImage: 'url("https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1000&auto=format&fit=crop")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundBlendMode: 'multiply',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '40px',
  },
  heroOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: '#A30D11',
    opacity: 0.88,
    zIndex: 1,
  },
  heroContent: {
    position: 'relative',
    zIndex: 2,
    color: '#ffffff',
  },
  highlightText: {
    fontFamily: "'JetBrains Mono', monospace",
    display: 'inline-block',
    padding: '6px 14px',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '20px',
    fontSize: '10px',
    fontWeight: '700',
    letterSpacing: '1px',
    marginBottom: '16px',
    textTransform: 'uppercase',
  },
  heroTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '32px',
    fontWeight: '700',
    lineHeight: '1.15',
    margin: '0 0 14px 0',
    letterSpacing: '-0.3px',
    textTransform: 'uppercase',
  },
  heroDesc: {
    fontSize: '13px',
    lineHeight: '1.5',
    color: 'rgba(255, 255, 255, 0.9)',
    maxWidth: '310px',
    margin: 0,
  },
  formPanel: {
    flex: 1.1,
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#FFFFFF',
  },
  cardHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  logoFrame: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10px',
  },
  logo: {
    width: '100%',
    maxWidth: '165px',
    height: 'auto',
    objectFit: 'contain',
    display: 'block',
  },
  cardTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '26px',
    fontWeight: '700',
    color: '#0F172A',
    margin: '0 0 8px 0',
    textTransform: 'uppercase',
    letterSpacing: '0.2px',
  },
  titleLine: {
    width: '36px',
    height: '3px',
    backgroundColor: '#A30D11',
    borderRadius: '2px',
    marginBottom: '14px',
  },
  cardSubtitle: {
    fontSize: '13px',
    color: '#64748B',
    margin: 0,
    lineHeight: '1.5',
    maxWidth: '280px',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '100%',
    maxWidth: '320px',
  },
  loginButton: {
    width: '100%',
    padding: '13px 0',
    backgroundColor: '#A30D11',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '700',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(163, 13, 17, 0.2)',
    letterSpacing: '0.5px',
  },
  registerButton: {
    width: '100%',
    padding: '13px 0',
    backgroundColor: '#FFFFFF',
    color: '#A30D11',
    border: '1px solid #A30D11',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '700',
    cursor: 'pointer',
    letterSpacing: '0.5px',
  },
  authSocial: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  authDivider: {
    fontSize: '9px',
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: '0.8px',
    marginBottom: '12px',
    position: 'relative',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialButtons: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
  },
  socialBtn: {
    width: '42px',
    height: '38px',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.2s, border-color 0.2s',
  },
};

export default App;