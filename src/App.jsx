import React, { useEffect, useRef } from 'react';
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
        backgroundColor: '#F8FAFC', // Mantiene el fondo limpio y evita cualquier flash
      }}
    >
      {children}
    </motion.div>
  );
};

// COMPONENTE: CAMPO ESPACIAL VISUAL DE PARTÍCULAS ROJAS (ESTABLE, SIN PARPADEO)
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

    // Paleta de Colores Espaciales Rojos
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
        const depth = Math.random() * 0.85 + 0.15; // Profundidad Z para efecto 3D

        particles.push({
          x,
          y,
          depth,
          size: (Math.random() * 2.8 + 1.0) * depth,
          colorPrefix: redPalette[Math.floor(Math.random() * redPalette.length)],
          alpha: Math.random() * 0.45 + 0.35, // Brillo estático fijo (sin parpadeo)
          // Movimiento de deriva suave en el espacio
          vx: (Math.random() - 0.5) * 0.4 * depth,
          vy: (Math.random() - 0.5) * 0.4 * depth,
        });
      }
    };

    initParticles();

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // 1. Deriva continua en el espacio
        p.x += p.vx;
        p.y += p.vy;

        // Reenvolver en la pantalla al salir por las orillas
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // 2. Renderizado Visual sin fluctuaciones de alpha (sin parpadeo)
        if (p.depth > 0.6) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 1.8, 0, Math.PI * 2);
          ctx.fillStyle = `${p.colorPrefix}${(p.alpha * 0.2).toFixed(2)})`;
          ctx.fill();
        }

        // Núcleo de la partícula con opacidad estática
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
        zIndex: 3,
      }}
    />
  );
};

// COMPONENTE LANDING / HOME
const Home = () => {
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

      {/* 2. CAPA ESPACIAL DE PARTÍCULAS ROJAS (ESTABLE, SIN PARPADEO) */}
      <RedSpaceBackground />

      {/* CONTENEDOR PRINCIPAL */}
      <main style={styles.contentWrapper}>
        <div style={styles.leftSection}>
          <div style={styles.logoWrapper}>
            <div style={styles.logoFrame}>
              <img src={logo} alt="Inklusport Logo" style={styles.logo} />
            </div>
          </div>

          <div style={styles.textContentWrapper}>
            <span style={styles.eyebrow}>Plataforma · Deporte Adaptado</span>

            <div style={styles.brandTextGroup}>
              <h1 style={styles.brandTitle}>Alto Rendimiento Inclusivo</h1>
              <p style={styles.brandData}>
                Portal centralizado para la gestión de atletas adaptados, analíticas avanzadas y organización de eventos deportivos oficiales.
              </p>
            </div>
          </div>
        </div>

        <div style={styles.rightSection}>
          <div style={styles.actionCard}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>Control de Acceso</h2>
              <p style={styles.cardSubtitle}>Identifícate para ingresar a tu panel de gestión.</p>
            </div>

            <div style={styles.buttonGroup}>
              {/* Botón Registrarse con animación clara de expansión */}
              <motion.button
                whileTap={{ scale: 1.08 }}
                transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                onClick={handleRegister}
                style={styles.registerButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F8FAFC';
                  e.currentTarget.style.borderColor = '#94A3B8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.borderColor = '#CBD5E1';
                }}
              >
                Registrarse
              </motion.button>

              {/* Botón Iniciar Sesión con animación clara de expansión */}
              <motion.button
                whileTap={{ scale: 1.08 }}
                transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                onClick={handleLogin}
                style={styles.loginButton}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#890A0D')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#A30D11')}
              >
                Iniciar Sesión
              </motion.button>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={styles.footerBottom}>

      </footer>
    </div>
  );
};

// COMPONENTE PRINCIPAL CON ENRUTAMIENTO Y TRANSICIONES LIMPIAS
function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="popLayout">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
        <Route path="/login" element={<AnimatedPage><Login /></AnimatedPage>} />
        <Route path="/register" element={<AnimatedPage><Register /></AnimatedPage>} />
      </Routes>
    </AnimatePresence>
  );
}

// ============================================
// ESTILOS
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
    padding: 0,
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
  contentWrapper: {
    display: 'flex',
    width: '100%',
    maxWidth: '1180px',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '60px',
    padding: '0 60px',
    margin: 'auto 0',
    boxSizing: 'border-box',
    zIndex: 5,
  },
  leftSection: {
    flex: '1.2',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  logoWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '24px',
  },
  logoFrame: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: '14px',
    padding: '14px 22px',
    border: '2px solid #A30D11',
    boxShadow: '0 4px 16px rgba(163, 13, 17, 0.08)',
  },
  logo: {
    width: '100%',
    maxWidth: '280px',
    height: 'auto',
    objectFit: 'contain',
    display: 'block',
  },
  textContentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    maxWidth: '520px',
  },
  eyebrow: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '1px',
    color: '#A30D11',
    backgroundColor: 'rgba(163, 13, 17, 0.08)',
    border: '1px solid rgba(163, 13, 17, 0.2)',
    borderRadius: '20px',
    padding: '6px 14px',
    marginBottom: '16px',
    textTransform: 'uppercase',
  },
  brandTextGroup: {
    textAlign: 'left',
  },
  brandTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '38px',
    fontWeight: '700',
    color: '#0F172A',
    margin: '0 0 12px 0',
    letterSpacing: '-0.3px',
    textTransform: 'uppercase',
    lineHeight: '1.15',
  },
  brandData: {
    fontSize: '15px',
    color: '#475569',
    lineHeight: '1.6',
    margin: 0,
  },
  rightSection: {
    flex: '0.85',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  actionCard: {
    width: '100%',
    maxWidth: '380px',
    backgroundColor: '#FFFFFF',
    padding: '40px 36px',
    borderRadius: '20px',
    boxShadow: '0 20px 40px rgba(15, 23, 42, 0.08)',
    border: '1px solid #E2E8F0',
  },
  cardHeader: {
    marginBottom: '28px',
  },
  cardTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '24px',
    fontWeight: '600',
    color: '#0F172A',
    margin: '0 0 6px 0',
    textTransform: 'uppercase',
    letterSpacing: '0.2px',
  },
  cardSubtitle: {
    fontSize: '13px',
    color: '#64748B',
    margin: 0,
    lineHeight: '1.4',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  registerButton: {
    width: '100%',
    padding: '14px 0',
    backgroundColor: '#FFFFFF',
    color: '#A30D11',
    border: '1px solid #CBD5E1',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
  },
  loginButton: {
    width: '100%',
    padding: '14px 0',
    backgroundColor: '#A30D11',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(163, 13, 17, 0.2)',
  },
  footerBottom: {
    width: '100%',
    maxWidth: '1180px',
    padding: '0 60px 24px 60px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '11px',
    color: '#94A3B8',
    fontWeight: '600',
    letterSpacing: '0.5px',
    boxSizing: 'border-box',
    zIndex: 5,
    flexShrink: 0,
  },
};

export default App;