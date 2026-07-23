import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    disabilityType: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Estados de Accesibilidad
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSizeOffset, setFontSizeOffset] = useState(0);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registro de usuario:', formData);
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

        /* RESET & WRAPPER FULLSCREEN CON FONDO CLARO */
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

        /* MODO ALTO CONTRASTE (ACCESIBILIDAD) */
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
        .login-wrapper.high-contrast-mode .auth-title,
        .login-wrapper.high-contrast-mode .input-field,
        .login-wrapper.high-contrast-mode .auth-footer p,
        .login-wrapper.high-contrast-mode .brand-name,
        .login-wrapper.high-contrast-mode .back-arrow-btn {
          color: #FFFFFF !important;
        }
        .login-wrapper.high-contrast-mode .input-box {
          background-color: #000000 !important;
          border-color: #FFFFFF !important;
        }
        .login-wrapper.high-contrast-mode .input-label {
          color: #FFD700 !important;
        }
        .login-wrapper.high-contrast-mode .input-field::placeholder {
          color: #AAAAAA !important;
        }

        /* APLICACIÓN DINÁMICA DE TAMAÑO DE FUENTE */
        .login-wrapper .auth-title { font-size: calc(26px + var(--font-offset)); }
        .login-wrapper .hero-title { font-size: calc(34px + var(--font-offset)); }
        .login-wrapper .input-field { font-size: calc(13px + var(--font-offset)); }
        .login-wrapper .input-label { font-size: calc(10px + var(--font-offset)); }
        .login-wrapper .auth-footer { font-size: calc(12px + var(--font-offset)); }

        /* RETÍCULA DE FONDO CLARA */
        .gridOverlay {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(148, 163, 184, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.05) 1px, transparent 1px);
          background-size: 36px 36px;
          z-index: 2;
          pointer-events: none;
        }

        /* HEADER SUPERIOR CON LOGO */
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

        /* CARD PRINCIPAL CENTRADA */
        .auth-card {
          display: flex;
          width: 100%;
          max-width: 950px;
          height: calc(100vh - 100px);
          max-height: 600px;
          background-color: #ffffff;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08);
          overflow: hidden;
          margin: auto;
          z-index: 5;
          border: 1px solid #E2E8F0;
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

        .highlight-text {
          font-family: 'JetBrains Mono', monospace;
          display: inline-block;
          padding: 6px 14px;
          background-color: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1px;
          margin-bottom: 16px;
          text-transform: uppercase;
        }

        .hero-title {
          font-family: 'Oswald', sans-serif;
          font-size: 32px;
          font-weight: 700;
          line-height: 1.15;
          margin-bottom: 14px;
          letter-spacing: -0.3px;
          text-transform: uppercase;
        }

        .hero-desc {
          font-size: 13px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.9);
          max-width: 310px;
        }

        /* PANEL DERECHO FORMULARIO */
        .form-panel {
          flex: 1.2;
          padding: 28px 40px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background-color: inherit;
          overflow-y: auto;
        }

        .auth-header {
          margin-bottom: 4px;
        }

        .auth-title {
          font-family: 'Oswald', sans-serif;
          font-size: 24px;
          font-weight: 600;
          color: #0F172A;
          margin-bottom: 4px;
          text-transform: uppercase;
          letter-spacing: 0.2px;
        }

        .title-line {
          width: 36px;
          height: 3px;
          background-color: #A30D11;
          border-radius: 2px;
        }

        /* FORMULARIO E INPUTS */
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .form-row {
          display: flex;
          gap: 12px;
          width: 100%;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
          align-items: flex-start;
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

        .input-box {
          display: flex;
          align-items: center;
          background-color: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 8px;
          padding: 0 12px;
          height: 38px;
          width: 100%;
          transition: all 0.2s ease;
        }

        .input-box:focus-within {
          background-color: #ffffff;
          border-color: #A30D11;
          box-shadow: 0 0 0 3px rgba(163, 13, 17, 0.1);
        }

        .input-icon {
          width: 15px;
          height: 15px;
          color: #64748B;
          margin-right: 10px;
          flex-shrink: 0;
        }

        .input-field {
          width: 100%;
          border: none;
          background: transparent;
          outline: none;
          font-size: 13px;
          color: #1E293B;
          font-weight: 500;
        }

        .input-field::placeholder {
          color: #94A3B8;
        }

        select.input-field {
          cursor: pointer;
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
          margin-left: 6px;
        }

        .toggle-password:hover {
          color: #0F172A;
        }

        /* CHECKBOX DE TÉRMINOS */
        .terms-group {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 2px 0;
        }

        .terms-checkbox {
          width: 15px;
          height: 15px;
          accent-color: #A30D11;
          cursor: pointer;
        }

        .terms-label {
          font-size: 11px;
          color: #475569;
        }

        .terms-link {
          color: #A30D11;
          text-decoration: none;
          font-weight: 600;
        }

        .terms-link:hover {
          text-decoration: underline;
        }

        .submit-btn {
          width: 100%;
          height: 40px;
          background-color: #A30D11;
          color: #ffffff;
          border: none;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.5px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: background-color 0.2s ease, transform 0.1s ease;
          box-shadow: 0 4px 12px rgba(163, 13, 17, 0.2);
        }

        .submit-btn:hover {
          background-color: #890A0D;
        }

        .submit-btn:active {
          transform: scale(0.98);
        }

        /* SOCIAL LOGIN & FOOTER */
        .auth-social {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 4px;
        }

        .auth-divider {
          font-size: 9px;
          font-weight: 800;
          color: #64748B;
          letter-spacing: 0.8px;
          margin-bottom: 8px;
        }

        .social-buttons {
          display: flex;
          gap: 10px;
        }

        .social-btn {
          width: 40px;
          height: 34px;
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
          font-size: 12px;
          color: #475569;
          margin-top: 4px;
        }

        .auth-link {
          color: #A30D11;
          text-decoration: none;
          font-weight: 700;
        }

        .auth-link:hover {
          text-decoration: underline;
        }

        /* WIDGET DE ACCESIBILIDAD FLOTANTE */
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

        .accessibility-toggle-btn:hover {
          background-color: #890A0D;
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 8px 25px rgba(163, 13, 17, 0.5);
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
          transform-origin: bottom right;
          animation: menuOpenAnim 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes menuOpenAnim {
          0% { opacity: 0; transform: translateY(12px) scale(0.92); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
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
          transition: all 0.2s ease;
        }

        .accessibility-option:hover {
          background-color: #FEF2F2;
          border-color: #A30D11;
          color: #A30D11;
          transform: translateX(-3px);
        }

        .accessibility-option svg {
          width: 16px;
          height: 16px;
          color: #A30D11;
          flex-shrink: 0;
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

      {/* FONDO DE PARTÍCULAS ESPACIALES Y RETÍCULA */}
      <div className="gridOverlay"></div>
      <RedSpaceBackground />

      {/* 1. TOP HEADER */}
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
      </header>

      {/* 2. CARD PRINCIPAL DE REGISTRO */}
      <div className="auth-card">
        {/* PANEL IZQUIERDO HERO */}
        <div className="hero-panel">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <span className="highlight-text">ALTO RENDIMIENTO</span>
            <h1 className="hero-title">
              Únete a la élite<br />del deporte<br />adaptado.
            </h1>
            <p className="hero-desc">
              Tu potencial no tiene límites. Registra tu perfil y comienza a competir hoy mismo.
            </p>
          </div>
        </div>

        {/* PANEL DERECHO FORMULARIO */}
        <div className="form-panel">
          <div className="auth-header">
            <h2 className="auth-title">Crear Cuenta</h2>
            <div className="title-line"></div>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {/* Nombre Completo y Correo Electrónico */}
            <div className="form-row">
              <div className="input-group">
                <label className="input-label">NOMBRE COMPLETO</label>
                <div className="input-box">
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Ej. Juan Pérez"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </div>
              </div>

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
                    placeholder="juan@ejemplo.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </div>
              </div>
            </div>

            {/* Teléfono y Tipo de Discapacidad */}
            <div className="form-row">
              <div className="input-group">
                <label className="input-label">TELÉFONO</label>
                <div className="input-box">
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+34 000 000 000"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">TIPO DE DISCAPACIDAD</label>
                <div className="input-box">
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="4" r="2" />
                    <path d="M16 8h-8a2 2 0 0 0-2 2v2h2v8h3v-6h2v6h3v-8h2v-2a2 2 0 0 0-2-2z" />
                  </svg>
                  <select
                    name="disabilityType"
                    value={formData.disabilityType}
                    onChange={handleChange}
                    required
                    className="input-field"
                  >
                    <option value="" disabled>Selecciona una opción</option>
                    <option value="visual">Discapacidad Visual</option>
                    <option value="motriz">Discapacidad Motriz</option>
                    <option value="auditiva">Discapacidad Auditiva</option>
                    <option value="intelectual">Discapacidad Intelectual</option>
                    <option value="otra">Otra / Ninguna</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Contraseñas */}
            <div className="form-row">
              <div className="input-group">
                <label className="input-label">CONTRASEÑA</label>
                <div className="input-box">
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="••••••••"
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
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">CONFIRMAR CONTRASEÑA</label>
                <div className="input-box">
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label="Mostrar u ocultar confirmación de contraseña"
                  >
                    {showConfirmPassword ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Acepto Términos y Condiciones */}
            <div className="terms-group">
              <input
                type="checkbox"
                id="acceptTerms"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                required
                className="terms-checkbox"
              />
              <label htmlFor="acceptTerms" className="terms-label">
                Acepto los <a href="#terms" className="terms-link">Términos y Condiciones</a> y la <a href="#privacy" className="terms-link">Política de Privacidad</a> de INKLUSPORT.
              </label>
            </div>

            {/* Botón Registrarse */}
            <button type="submit" className="submit-btn">
              <span>REGISTRARSE</span>
              
            </button>
          </form>

          {/* Social Login */}
          <div className="auth-social">
            <span className="auth-divider">O REGÍSTRATE CON</span>
            <div className="social-buttons">
              <button type="button" className="social-btn" title="Google">
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              </button>
              <button type="button" className="social-btn" title="Apple ID">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#000000">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.62-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.65 1.35-.58.67-1.09 1.75-.95 2.78 1.01.08 2.05-.53 2.68-1.28z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Enlace a Login */}
          <div className="auth-footer">
            <p>
              ¿Ya tienes una cuenta?{' '}
              <Link to="/login" className="auth-link">
                Inicia Sesión
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* 3. BOTÓN FLOTANTE DE ACCESIBILIDAD CON ANIMACIONES */}
      <div className="accessibility-widget-container">
        {isAccessibilityOpen && (
          <div className="accessibility-menu">
            <button className="accessibility-option" onClick={toggleContrast}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span>{highContrast ? 'Contraste Normal' : 'Contraste'}</span>
            </button>
            <button className="accessibility-option" onClick={handleIncreaseFont}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M11 5L6 19M16 12H6M18 19V11M22 15h-8" />
              </svg>
              <span>Aumentar letra</span>
            </button>
            <button className="accessibility-option" onClick={handleDecreaseFont}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M11 5L6 19M16 12H6M15 15H9" />
              </svg>
              <span>Reducir letra</span>
            </button>
            <button className="accessibility-option" onClick={handleResetFont}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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

export default Register;