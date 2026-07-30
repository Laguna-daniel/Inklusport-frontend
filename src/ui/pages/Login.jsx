import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../domain/contexts/AuthContext'

// COMPONENTE: FONDO ESPACIAL DE PARTÍCULAS ROJAS (FONDO CLARO)
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

const Login = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  // Estado para controlar las vistas de resultado: 'idle' | 'success' | 'error' | 'forgot' | 'forgot-success'
  const [authStatus, setAuthStatus] = useState('idle');
  const [forgotEmail, setForgotEmail] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  // Estados de Accesibilidad
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSizeOffset, setFontSizeOffset] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');

    const result = await login({
      email: formData.email,
      password: formData.password,
    });

    if (result.success) {
      setAuthStatus('success');
    } else {
      setAuthStatus('error');
      setLoginError(result.error);
    }
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (forgotEmail.trim()) {
      setAuthStatus('forgot-success');
    }
  };

  const handleIncreaseFont = () => {
    if (fontSizeOffset < 4) setFontSizeOffset(prev => prev + 1);
  };

  const handleDecreaseFont = () => {
    if (fontSizeOffset > -2) setFontSizeOffset(prev => prev - 1);
  };

  const handleResetFont = () => {
    setFontSizeOffset(0);
  };

  const toggleContrast = () => {
    setHighContrast(prev => !prev);
  };

  return (
    <div 
      className={`login-wrapper ${highContrast ? 'high-contrast-mode' : ''}`}
      style={{ '--font-offset': `${fontSizeOffset}px` }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap');

        .login-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: #F8FAFC;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          padding: 20px 40px;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          box-sizing: border-box;
          overflow: hidden;
          transition: background-color 0.3s ease;
        }

        .login-wrapper * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .login-wrapper.high-contrast-mode {
          background-color: #000000 !important;
        }
        .login-wrapper.high-contrast-mode .gridOverlay {
          opacity: 0.1;
        }
        .login-wrapper.high-contrast-mode .auth-card {
          background-color: #121212 !important;
          border-color: #FFFFFF !important;
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
        }

        .gridOverlay {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(148, 163, 184, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.05) 1px, transparent 1px);
          background-size: 36px 36px;
          z-index: 2;
          pointer-events: none;
        }

        .top-header {
          width: 100%;
          max-width: 1050px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-shrink: 0;
          z-index: 5;
        }

        .brand-logo-container {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          cursor: pointer;
        }

        .back-arrow-btn {
          background: none;
          border: none;
          color: #0F172A;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
          transition: transform 0.2s ease;
        }

        .back-arrow-btn:hover {
          transform: translateX(-3px);
        }

        .brand-name {
          font-family: 'Oswald', sans-serif;
          font-size: 22px;
          font-weight: 700;
          color: #A30D11;
          letter-spacing: 0.5px;
        }

        .user-icon-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #475569;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* CARD PRINCIPAL CENTRADA */
        .auth-card {
          display: flex;
          width: 100%;
          max-width: 950px;
          height: calc(100vh - 110px);
          max-height: 560px;
          background-color: #ffffff;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08);
          overflow: hidden;
          margin: auto;
          z-index: 5;
          border: 1px solid #E2E8F0;
        }

        /* FONDO OSCURO PARA MODALES TIPO TOKEN (OVERLAY) */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background-color: rgba(15, 23, 42, 0.55);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          padding: 20px;
          animation: fadeInBackdrop 0.2s ease-out forwards;
        }

        @keyframes fadeInBackdrop {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* VENTANA EMERGENTE TIPO TOKEN */
        .auth-card-modal {
          width: 100% !important;
          max-width: 440px !important;
          height: auto !important;
          max-height: none !important;
          flex-direction: column !important;
          padding: 36px 28px;
          align-items: center;
          text-align: center;
          background-color: #ffffff;
          border-radius: 16px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          border: 1px solid #E2E8F0;
          z-index: 10001;
          animation: scaleUpModal 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes scaleUpModal {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .status-icon-container {
          margin-bottom: 16px;
          display: flex;
          justify-content: center;
        }

        .status-title {
          font-family: 'Oswald', sans-serif;
          font-size: 22px;
          font-weight: 600;
          color: #0F172A;
          margin-bottom: 10px;
          text-transform: uppercase;
        }

        .status-desc {
          font-size: 13px;
          color: #475569;
          line-height: 1.5;
          margin-bottom: 20px;
          max-width: 340px;
        }

        .status-input-box {
          display: flex;
          align-items: center;
          background-color: #F1F5F9;
          border: 1px solid #E2E8F0;
          border-radius: 8px;
          padding: 0 14px;
          height: 42px;
          width: 100%;
          margin-bottom: 16px;
          font-size: 12.5px;
          color: #334155;
          gap: 10px;
        }

        .status-links-container {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 12.5px;
          color: #475569;
          margin-bottom: 20px;
          width: 100%;
        }

        .status-link-red {
          color: #A30D11;
          font-weight: 600;
          text-decoration: none;
          background: none;
          border: none;
          cursor: pointer;
          font-family: inherit;
          font-size: inherit;
          padding: 0;
        }
        .status-link-red:hover {
          text-decoration: underline;
        }

        .status-divider-line {
          width: 100%;
          height: 1px;
          background-color: #E2E8F0;
          margin: 6px 0 14px 0;
        }

        .status-action-btn {
          width: 100%;
          height: 42px;
          background-color: #A30D11;
          color: #ffffff;
          border: none;
          border-radius: 8px;
          font-size: 12.5px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: background-color 0.2s;
        }
        .status-action-btn:hover {
          background-color: #890A0D;
        }

        /* PANEL IZQUIERDO HERO */
        .hero-panel {
          flex: 1;
          position: relative;
          background-color: #A30D11;
          background-image: url('https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1000&auto=format&fit=crop');
          background-size: cover;
          background-position: center;
          background-blend-mode: multiply;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 40px;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background-color: #A30D11;
          opacity: 0.88;
          z-index: 1;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          color: #ffffff;
        }

        .hero-title {
          font-family: 'Oswald', sans-serif;
          font-size: 34px;
          font-weight: 700;
          line-height: 1.15;
          margin-bottom: 14px;
          letter-spacing: -0.3px;
          text-transform: uppercase;
        }

        .hero-desc {
          font-size: 13.5px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.9);
          max-width: 310px;
        }

        /* PANEL DERECHO FORMULARIO */
        .form-panel {
          flex: 1.1;
          padding: 36px 48px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background-color: inherit;
        }

        .auth-header {
          margin-bottom: 8px;
        }

        .auth-title {
          font-family: 'Oswald', sans-serif;
          font-size: 26px;
          font-weight: 600;
          color: #0F172A;
          margin-bottom: 6px;
          text-transform: uppercase;
          letter-spacing: 0.2px;
        }

        .title-line {
          width: 36px;
          height: 3px;
          background-color: #A30D11;
          border-radius: 2px;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          align-items: flex-start;
          width: 100%;
        }

        .input-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .input-label {
          font-size: 10px;
          font-weight: 800;
          color: #475569;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          text-align: left;
        }

        .forgot-link {
          font-size: 11px;
          color: #A30D11;
          text-decoration: none;
          font-weight: 600;
          background: none;
          border: none;
          cursor: pointer;
          font-family: inherit;
          padding: 0;
        }

        .forgot-link:hover {
          text-decoration: underline;
        }

        .input-box {
          display: flex;
          align-items: center;
          background-color: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 10px;
          padding: 0 14px;
          height: 44px;
          width: 100%;
          transition: all 0.2s ease;
        }

        .input-box:focus-within {
          background-color: #ffffff;
          border-color: #A30D11;
          box-shadow: 0 0 0 3px rgba(163, 13, 17, 0.1);
        }

        .input-icon {
          width: 16px;
          height: 16px;
          color: #64748B;
          margin-right: 12px;
          flex-shrink: 0;
        }

        .input-field {
          width: 100%;
          border: none;
          background: transparent;
          outline: none;
          font-size: 13.5px;
          color: #1E293B;
          font-weight: 500;
        }

        .input-field::placeholder {
          color: #94A3B8;
        }

        .toggle-password {
          background: none;
          border: none;
          cursor: pointer;
          color: #64748B;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
          margin-left: 8px;
        }

        .submit-btn {
          width: 100%;
          height: 44px;
          background-color: #A30D11;
          color: #ffffff;
          border: none;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.5px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: 4px;
          transition: background-color 0.2s ease;
          box-shadow: 0 4px 12px rgba(163, 13, 17, 0.2);
        }

        .submit-btn:hover {
          background-color: #890A0D;
        }

        .auth-social {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .auth-divider {
          font-size: 9.5px;
          font-weight: 800;
          color: #64748B;
          letter-spacing: 0.8px;
          margin-bottom: 10px;
        }

        .social-buttons {
          display: flex;
          gap: 12px;
        }

        .social-btn {
          width: 44px;
          height: 38px;
          background-color: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.2s, border-color 0.2s;
        }

        .social-btn:hover {
          background-color: #F1F5F9;
          border-color: #CBD5E1;
        }

        .auth-footer {
          text-align: center;
          font-size: 12.5px;
          color: #475569;
        }

        .auth-link {
          color: #A30D11;
          text-decoration: none;
          font-weight: 700;
        }

        .auth-link:hover {
          text-decoration: underline;
        }

        /* WIDGET DE ACCESIBILIDAD */
        .accessibility-widget-container {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 100000;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          font-family: 'Inter', sans-serif;
        }

        .accessibility-toggle-btn {
          background-color: #A30D11;
          color: #ffffff;
          border: 2px solid #ffffff;
          border-radius: 30px;
          padding: 11px 20px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 6px 20px rgba(163, 13, 17, 0.4);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .accessibility-menu {
          position: absolute;
          bottom: 64px;
          right: 0;
          background-color: #ffffff;
          border: 1px solid #E2E8F0;
          border-radius: 14px;
          box-shadow: 0 12px 30px rgba(15, 23, 42, 0.18);
          width: 220px;
          padding: 10px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .accessibility-option {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 8px;
          padding: 10px 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 12px;
          font-weight: 600;
          color: #1E293B;
          cursor: pointer;
          text-align: left;
          width: 100%;
        }

        @media (max-width: 860px) {
          .hero-panel {
            display: none;
          }
          .auth-card {
            max-width: 460px;
            height: auto;
          }
        }
      `}</style>

      <div className="gridOverlay"></div>
      <RedSpaceBackground />

      <header className="top-header">
        <div className="brand-logo-container" onClick={() => navigate(-1)}>
          <button className="back-arrow-btn" aria-label="Volver">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          <span className="brand-name">INKLUSPORT</span>
        </div>
        <button className="user-icon-btn" aria-label="Perfil">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </button>
      </header>

      {/* VISTA NORMAL: FORMULARIO DE LOGIN DE FONDO */}
      <div className="auth-card">
        <div className="hero-panel">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h1 className="hero-title">
              Supera tus<br />límites cada<br />día.
            </h1>
            <p className="hero-desc">
              Accede a tu panel de deportista para gestionar tus entrenamientos y eventos.
            </p>
          </div>
        </div>

        <div className="form-panel">
          <div className="auth-header">
            <h2 className="auth-title">Iniciar Sesión</h2>
            <div className="title-line"></div>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <label className="input-label">CORREO ELECTRÓNICO</label>
              <div className="input-box">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <input
                  type="email"
                  name="email"
                  placeholder="admin@inklusport.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
            </div>

            <div className="input-group">
              <div className="input-header-row">
                <label className="input-label">CONTRASEÑA</label>
                <button type="button" className="forgot-link" onClick={() => setAuthStatus('forgot')}>
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <div className="input-box">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="123456"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Mostrar u ocultar contraseña"
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="submit-btn">
              <span>ACCEDER</span>
            </button>
          </form>

          <div className="auth-social">
            <span className="auth-divider">O INICIA SESIÓN CON</span>
            <div className="social-buttons">
              <button type="button" className="social-btn" title="Google">
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              </button>
              <button type="button" className="social-btn" title="Apple ID">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#000000">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.62-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.65 1.35-.58.67-1.09 1.75-.95 2.78 1.01.08 2.05-.53 2.68-1.28z"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="auth-footer">
            <p>
              ¿No tienes una cuenta?{' '}
              <Link to="/register" className="auth-link">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* VENTANA EMERGENTE: RECUPERACIÓN DE CONTRASEÑA */}
      {authStatus === 'forgot' && (
        <div className="modal-backdrop">
          <div className="auth-card-modal">
            <div className="status-icon-container">
              <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#A30D11" strokeWidth="2.5">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                <polyline points="9 16 11 18 15 14" />
              </svg>
            </div>
            <h2 className="status-title">Recuperación de Contraseña</h2>
            <p className="status-desc">
              Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
            </p>
            <form onSubmit={handleForgotSubmit} style={{ width: '100%' }}>
              <div className="status-input-box" style={{ backgroundColor: '#F8FAFC' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <input
                  type="email"
                  placeholder="juan.perez@gmail.com"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  required
                  style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '12.5px', color: '#1E293B' }}
                />
              </div>
              <button type="submit" className="status-action-btn" style={{ marginBottom: '14px' }}>
                <span>ENVIAR ENLACE</span>
              </button>
            </form>
            <div className="status-links-container" style={{ alignItems: 'center' }}>
              <div className="status-divider-line"></div>
              <button type="button" className="status-link-red" onClick={() => setAuthStatus('idle')}>
                Volver al inicio de sesión
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VENTANA EMERGENTE: CORREO DE RECUPERACIÓN ENVIADO (TOKEN) */}
      {authStatus === 'forgot-success' && (
        <div className="modal-backdrop">
          <div className="auth-card-modal">
            <div className="status-icon-container">
              <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5">
                <polyline points="9 11 12 14 22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
            </div>
            <h2 className="status-title">Revisa tu correo</h2>
            <p className="status-desc">
              Hemos enviado un enlace de recuperación a tu correo. Sigue las instrucciones para restablecer tu contraseña.
            </p>
            <div className="status-input-box">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span>Enlace enviado a {forgotEmail}</span>
            </div>
            <div className="status-links-container">
              <span>¿No recibiste el correo? <button type="button" className="status-link-red" onClick={() => alert('Correo de recuperación reenviado')}>Reenviar correo</button></span>
              <div className="status-divider-line"></div>
              <span>¿Recordaste tu contraseña? <button type="button" className="status-link-red" onClick={() => setAuthStatus('idle')}>Iniciar sesión</button></span>
            </div>
            <button className="status-action-btn" onClick={() => setAuthStatus('idle')}>
              <span>Aceptar </span>
            </button>
          </div>
        </div>
      )}

      {/* VENTANA EMERGENTE (MODAL TIPO TOKEN): CREDENCIALES ACEPTADAS */}
      {authStatus === 'success' && (
        <div className="modal-backdrop">
          <div className="auth-card-modal">
            <div className="status-icon-container">
              <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
            </div>
            <h2 className="status-title">Credenciales aceptadas</h2>
            <p className="status-desc">
              Revisa tu correo electrónico y sigue las instrucciones para continuar.
            </p>
            <div className="status-input-box">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span>Correo enviado a {formData.email || 'juan.perez@gmail.com'}</span>
            </div>
            <div className="status-links-container">
              <span>¿No encuentras el correo? <button type="button" className="status-link-red" onClick={() => alert('Correo reenviado')}>Reenviar correo</button></span>
              <div className="status-divider-line"></div>
              <span>¿Necesitas ayuda?</span>
            </div>
            <button className="status-action-btn" onClick={() => navigate('/home')}>
              <span>Ir a inicio </span>
            </button>
          </div>
        </div>
      )}

      {/* VENTANA EMERGENTE (MODAL TIPO TOKEN): CREDENCIALES DENEGADAS */}
      {authStatus === 'error' && (
        <div className="modal-backdrop">
          <div className="auth-card-modal">
            <div className="status-icon-container">
              <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
            <h2 className="status-title">Credenciales Denegadas</h2>
            <p className="status-desc">
              El correo o la contraseña proporcionados no coinciden con nuestros registros. Revisa tu información.
            </p>
            <div className="status-input-box" style={{ backgroundColor: '#E2E8F0' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span>{formData.email || 'correo@ejemplo.com'} (intentado)</span>
            </div>
            <div className="status-links-container">
              <span>¿Has olvidado tu contraseña? <button type="button" className="status-link-red" onClick={() => setAuthStatus('forgot')}>Recuperar contraseña</button></span>
              <div className="status-divider-line"></div>
              <span>¿Necesitas ayuda?</span>
            </div>
            <button className="status-action-btn" onClick={() => setAuthStatus('idle')}>
              <span>Reintentar </span>
            </button>
          </div>
        </div>
      )}

      <div className="accessibility-widget-container">
        {isAccessibilityOpen && (
          <div className="accessibility-menu">
            <button className="accessibility-option" onClick={toggleContrast}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span>{highContrast ? 'Contraste Normal' : 'Contraste'}</span>
            </button>
            <button className="accessibility-option" onClick={handleIncreaseFont}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                <path d="M11 5L6 19M16 12H6M18 19V11M22 15h-8" />
              </svg>
              <span>Aumentar letra</span>
            </button>
            <button className="accessibility-option" onClick={handleDecreaseFont}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                <path d="M11 5L6 19M16 12H6M15 15H9" />
              </svg>
              <span>Reducir letra</span>
            </button>
            <button className="accessibility-option" onClick={handleResetFont}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              <span>Restablecer letra</span>
            </button>
          </div>
        )}
        <button 
          className="accessibility-toggle-btn"
          onClick={() => setIsAccessibilityOpen(!isAccessibilityOpen)}
          aria-label="Menú de Accesibilidad"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="4" r="2" />
            <path d="M16 8h-8a2 2 0 0 0-2 2v2h2v8h3v-6h2v6h3v-8h2v-2a2 2 0 0 0-2-2z" />
          </svg>
          <span>Accesibilidad</span>
        </button>
      </div>
    </div>
  );
};

export default Login;