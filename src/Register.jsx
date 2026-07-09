import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    disabilityType: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });

  // Estados para controlar los efectos interactivos mediante JavaScript
  const [isBackHovered, setIsBackHovered] = useState(false);
  const [isBtnHovered, setIsBtnHovered] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }
    console.log('Datos listos para enviar a users-ms:', formData);
  };

  // Imagen real de Unsplash enfocada en un atleta adaptativo en pista
  const atletaImg = "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=1200";

  return (
    <div style={styles.pageWrapper}>
      {/* BARRA SUPERIOR: Componente de navegación integrado con flecha de regreso */}
      <header 
        style={styles.navbar}
        onClick={() => navigate('/')}
        onMouseEnter={() => setIsBackHovered(true)}
        onMouseLeave={() => setIsBackHovered(false)}
      >
        <div style={styles.backNavContainer}>
          {/* Flecha minimalista con animación de desplazamiento */}
          <span style={{
            ...styles.backArrow,
            transform: isBackHovered ? 'translateX(-4px)' : 'translateX(0)',
          }}>
            ←
          </span>
          <div style={styles.navBrand}>
            <span style={styles.navBrandRed}>INKLU</span>SPORT
          </div>
        </div>
      </header>

      {/* TARJETA PRINCIPAL: Con animación de entrada inyectada por keyframes */}
      <div style={styles.cardContainer}>
        
        {/* PANEL IZQUIERDO: Mensaje motivacional y fondo rojo */}
        <div style={{...styles.leftPanel, backgroundImage: `url(${atletaImg})`}}>
          <div style={styles.overlayColor}></div>
          <div style={styles.leftContent}>
            <span style={styles.tag}>ALTO RENDIMIENTO</span>
            <h1 style={styles.mainTitle}>Únete a la élite del deporte adaptado.</h1>
            <p style={styles.subTitle}>
              Tu potencial no tiene límites. Registra tu perfil y comienza a competir hoy mismo.
            </p>
          </div>
        </div>

        {/* PANEL DERECHO: Formulario */}
        <div style={styles.rightPanel}>
          <h2 style={styles.formTitle}>Crear Cuenta</h2>
          <div style={styles.titleUnderline}></div>

          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Fila 1: Nombre Completo y Correo */}
            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>NOMBRE COMPLETO</label>
                <div style={styles.inputWrapper}>
                  <span style={styles.inputIcon}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  </span>
                  <input 
                    type="text" 
                    name="fullName" 
                    placeholder="Ej. Juan Pérez" 
                    value={formData.fullName}
                    onChange={handleChange}
                    style={styles.input} 
                    required 
                  />
                </div>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>CORREO ELECTRÓNICO</label>
                <div style={styles.inputWrapper}>
                  <span style={styles.inputIcon}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  </span>
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="juan@ejemplo.com" 
                    value={formData.email}
                    onChange={handleChange}
                    style={styles.input} 
                    required 
                  />
                </div>
              </div>
            </div>

            {/* Fila 2: Teléfono */}
            <div style={styles.inputGroupFull}>
              <label style={styles.label}>TELÉFONO</label>
              <div style={styles.inputWrapper}>
                <span style={styles.inputIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </span>
                <input 
                  type="tel" 
                  name="phone" 
                  placeholder="+34 000 000 000" 
                  value={formData.phone}
                  onChange={handleChange}
                  style={styles.input} 
                />
              </div>
            </div>

            {/* Fila 3: Tipo de Discapacidad */}
            <div style={styles.inputGroupFull}>
              <label style={styles.label}>TIPO DE DISCAPACIDAD</label>
              <div style={styles.inputWrapper}>
                <span style={styles.inputIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2"><circle cx="12" cy="4" r="1"></circle><path d="m18 19 1-7-6 1V7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v3h2V8h3v3.5l-2.7 3.6a1 1 0 0 0 .2 1.4l3 2.3V22h2v-3.5l-2.3-1.7.9-1.2h3.2v3.5h2z"></path></svg>
                </span>
                <select 
                  name="disabilityType" 
                  value={formData.disabilityType}
                  onChange={handleChange}
                  style={styles.select}
                  required
                >
                  <option value="">Selecciona una opción</option>
                  <option value="fisica">Física o Motriz</option>
                  <option value="visual">Visual</option>
                  <option value="auditiva">Auditiva</option>
                  <option value="intelectual">Intelectual</option>
                  <option value="ninguna">Ninguna / Organismo Oficial</option>
                </select>
              </div>
            </div>

            {/* Fila 4: Contraseñas */}
            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>CONTRASEÑA</label>
                <div style={styles.inputWrapper}>
                  <span style={styles.inputIcon}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  </span>
                  <input 
                    type="password" 
                    name="password" 
                    placeholder="••••••••" 
                    value={formData.password}
                    onChange={handleChange}
                    style={styles.input} 
                    required 
                  />
                </div>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>CONFIRMAR CONTRASEÑA</label>
                <div style={styles.inputWrapper}>
                  <span style={styles.inputIcon}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                  </span>
                  <input 
                    type="password" 
                    name="confirmPassword" 
                    placeholder="••••••••" 
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    style={styles.input} 
                    required 
                  />
                </div>
              </div>
            </div>

            {/* Términos y Condiciones */}
            <div style={styles.checkboxGroup}>
              <input 
                type="checkbox" 
                name="acceptTerms" 
                id="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                style={styles.checkbox}
                required
              />
              <label htmlFor="acceptTerms" style={styles.checkboxLabel}>
                Acepto los <span style={styles.linkText}>Términos y Condiciones</span> y la <span style={styles.linkText}>Política de Privacidad</span> de INKLUSPORT.
              </label>
            </div>

            {/* Botón Registrarse */}
            <button 
              type="submit" 
              style={{
                ...styles.submitButton,
                backgroundColor: isBtnHovered ? '#B81826' : '#D31424'
              }}
              onMouseEnter={() => setIsBtnHovered(true)}
              onMouseLeave={() => setIsBtnHovered(false)}
            >
              REGISTRARSE &gt;
            </button>
          </form>

          {/* Opciones Sociales */}
          <div style={styles.socialDivider}>
            <div style={styles.dividerLine}></div>
            <span style={styles.dividerText}>O REGÍSTRATE CON</span>
            <div style={styles.dividerLine}></div>
          </div>

          <div style={styles.socialIconsRow}>
            <button type="button" style={styles.socialIcon} onClick={() => console.log('Google Register')}>
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
            </button>
            
            <button type="button" style={styles.socialIcon} onClick={() => console.log('Apple Register')}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#000000">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.5-.64.74-1.2 1.88-1.05 3 .1.12.3.18.45.18.88 0 2.03-.54 2.55-1.12z"/>
              </svg>
            </button>
          </div>

          <p style={styles.loginRedirect}>
            ¿Ya tienes una cuenta? <span style={styles.linkTextRed} onClick={() => navigate('/login')}>Inicia Sesión</span>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: {
    backgroundColor: '#F8FAFC',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    boxSizing: 'border-box',
    margin: 0,
    padding: '20px',
    position: 'relative',
    overflow: 'hidden',
  },
  navbar: {
    position: 'absolute',
    top: 0,
    left: 'max(20px, calc((100vw - 1100px) / 2))',
    width: '100%',
    maxWidth: '1100px',
    height: '70px',
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    zIndex: 10,
    cursor: 'pointer',
  },
  backNavContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  backArrow: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333333',
    transition: 'transform 0.2s ease',
    display: 'inline-block',
  },
  navBrand: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333333',
    letterSpacing: '1px',
  },
  navBrandRed: {
    color: '#D31424',
  },
  cardContainer: {
    display: 'flex',
    width: '100%',
    maxWidth: '1100px',
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 20px 40px rgba(15, 23, 42, 0.06)',
    marginTop: '40px',
    zIndex: 5,
    animation: 'fadeInScale 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
  },
  leftPanel: {
    flex: '1 1 42%',
    position: 'relative',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'flex-end',
    padding: '40px',
    color: '#FFFFFF',
    minHeight: '620px',
  },
  overlayColor: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(211, 20, 36, 0.92)',
    zIndex: 1,
  },
  leftContent: {
    position: 'relative',
    zIndex: 2,
  },
  tag: {
    fontSize: '10px',
    fontWeight: 'bold',
    letterSpacing: '1px',
    border: '1px solid rgba(255,255,255,0.5)',
    padding: '4px 10px',
    borderRadius: '20px',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  mainTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    margin: '16px 0 12px 0',
    lineHeight: '1.2',
  },
  subTitle: {
    fontSize: '14px',
    opacity: '0.9',
    lineHeight: '1.5',
    margin: 0,
  },
  rightPanel: {
    flex: '1 1 58%',
    padding: '40px 45px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    boxSizing: 'border-box',
    backgroundColor: '#FFFFFF',
  },
  formTitle: {
    fontSize: '26px',
    fontWeight: 'bold',
    color: '#111827',
    margin: 0,
  },
  titleUnderline: {
    width: '45px',
    height: '4px',
    backgroundColor: '#D31424',
    marginTop: '6px',
    marginBottom: '24px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  row: {
    display: 'flex',
    gap: '20px',
  },
  inputGroup: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  inputGroupFull: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '11px',
    fontWeight: 'bold',
    color: '#6B7280',
    letterSpacing: '0.5px',
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: '8px',
    padding: '0 14px',
    height: '44px',
    border: '1px solid #E2E8F0',
  },
  inputIcon: {
    marginRight: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    border: 'none',
    backgroundColor: 'transparent',
    fontSize: '14px',
    color: '#374151',
    outline: 'none',
    width: '100%',
  },
  select: {
    flex: 1,
    border: 'none',
    backgroundColor: 'transparent',
    fontSize: '14px',
    color: '#374151',
    outline: 'none',
    cursor: 'pointer',
    width: '100%',
  },
  checkboxGroup: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    marginTop: '4px',
  },
  checkbox: {
    marginTop: '3px',
    cursor: 'pointer',
  },
  checkboxLabel: {
    fontSize: '12px',
    color: '#4B5563',
    lineHeight: '1.4',
  },
  linkText: {
    color: '#2563EB',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  submitButton: {
    width: '100%',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '8px',
    padding: '14px 0',
    fontSize: '13px',
    fontWeight: 'bold',
    letterSpacing: '1px',
    cursor: 'pointer',
    marginTop: '6px',
    transition: 'background-color 0.2s ease',
  },
  socialDivider: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '24px 0 16px 0',
    width: '100%',
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    backgroundColor: '#F1F5F9',
  },
  dividerText: {
    fontSize: '11px',
    color: '#9CA3AF',
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    padding: '0 15px',
  },
  socialIconsRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
  },
  socialIcon: {
    flex: 1,
    height: '40px',
    border: '1px solid #E2E8F0',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.15s ease',
  },
  loginRedirect: {
    textAlign: 'center',
    fontSize: '13px',
    color: '#4B5563',
    marginTop: '24px',
    marginBottom: 0,
  },
  linkTextRed: {
    color: '#D31424',
    fontWeight: 'bold',
    cursor: 'pointer',
  }
};

export default Register;