import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  // Estado para capturar credenciales de acceso
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Estado independiente para el formulario de recuperación de contraseña
  const [recoveryEmail, setRecoveryEmail] = useState('');

  // Estados de control para la interfaz de usuario (Modales y Hovers)
  const [showPassword, setShowPassword] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showRecoveryModal, setShowRecoveryModal] = useState(false);
  
  const [isBackHovered, setIsBackHovered] = useState(false);
  const [isBtnHovered, setIsBtnHovered] = useState(false);
  const [isRecoveryBtnHovered, setIsRecoveryBtnHovered] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (formData.email !== "admin@inklusport.com" || formData.password !== "123456") {
      setShowErrorModal(true);
    } else {
      console.log('Credenciales correctas. Accediendo...');
      navigate('/'); 
    }
  };

  const handleRecoverySubmit = (e) => {
    e.preventDefault();
    console.log(`Enviando enlace de restauración para: ${recoveryEmail}`);
    alert(`Se ha enviado un enlace de recuperación a ${recoveryEmail}`);
    setShowRecoveryModal(false);
    setRecoveryEmail('');
  };

  // Imagen real de alta calidad en Unsplash enfocada en atletas en pista de atletismo
  const loginBgImg = "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=1200";

  return (
    <div style={styles.pageWrapper}>
      
      {/* BARRA SUPERIOR: Navegación de regreso */}
      <header 
        style={styles.navbar}
        onClick={() => navigate('/')}
        onMouseEnter={() => setIsBackHovered(true)}
        onMouseLeave={() => setIsBackHovered(false)}
      >
        <div style={styles.backNavContainer}>
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

      {/* TARJETA PRINCIPAL DE INICIO DE SESIÓN */}
      <div style={styles.cardContainer}>
        
        {/* PANEL IZQUIERDO: Hero Visual */}
        <div style={{...styles.leftPanel, backgroundImage: `url(${loginBgImg})`}}>
          <div style={styles.overlayColor}></div>
          <div style={styles.leftContent}>
            <h1 style={styles.mainTitle}>REDEFINE TU POTENCIAL.</h1>
            <p style={styles.subTitle}>
              Plataforma de alto rendimiento para atletas adaptativos impulsada por IA.
            </p>
            <div style={styles.carouselIndicators}>
              <span style={{...styles.dot, ...styles.activeDot}}></span>
              <span style={styles.dot}></span>
              <span style={styles.dot}></span>
            </div>
          </div>
        </div>

        {/* PANEL DERECHO: Formulario de Login */}
        <div style={styles.rightPanel}>
          <div style={styles.topLabelContainer}>
            <span style={styles.topLabel}>PERFORMANCE PORTAL</span>
          </div>
          
          <h2 style={styles.formTitle}>Iniciar Sesión</h2>
          <p style={styles.formSubText}>Bienvenido de nuevo a la arquitectura del éxito.</p>

          <form onSubmit={handleLoginSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>CORREO ELECTRÓNICO</label>
              <div style={styles.inputWrapper}>
                <span style={styles.inputIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </span>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="nombre@ejemplo.com" 
                  value={formData.email}
                  onChange={handleChange}
                  style={styles.input} 
                  required 
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <div style={styles.passwordLabelRow}>
                <label style={styles.label}>CONTRASEÑA</label>
                <span style={styles.forgotPasswordLink} onClick={() => setShowRecoveryModal(true)}>
                  ¿OLVIDASTE TU CONTRASEÑA?
                </span>
              </div>
              <div style={styles.inputWrapper}>
                <span style={styles.inputIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                </span>
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password" 
                  placeholder="••••••••" 
                  value={formData.password}
                  onChange={handleChange}
                  style={styles.input} 
                  required 
                />
                <span style={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </span>
              </div>
            </div>

            <button 
              type="submit" 
              style={{
                ...styles.submitButton,
                backgroundColor: isBtnHovered ? '#B81826' : '#D31424'
              }}
              onMouseEnter={() => setIsBtnHovered(true)}
              onMouseLeave={() => setIsBtnHovered(false)}
            >
              ACCEDER
            </button>
          </form>

          <div style={styles.socialDivider}>
            <div style={styles.dividerLine}></div>
            <span style={styles.dividerText}>O CONTINÚA CON</span>
            <div style={styles.dividerLine}></div>
          </div>
          
          <div style={styles.socialButtonsRow}>
            <button type="button" style={styles.socialButton}>
              <svg width="16" height="16" viewBox="0 0 24 24" style={{marginRight: '8px'}}>
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              Google
            </button>
            
            <button type="button" style={styles.socialButton}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#000000" style={{marginRight: '8px'}}>
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.5-.64.74-1.2 1.88-1.05 3 .1.12.3.18.45.18.88 0 2.03-.54 2.55-1.12z"/>
              </svg>
              Apple ID
            </button>
          </div>

          <p style={styles.registerRedirect}>
            ¿No tienes cuenta? <span style={styles.linkTextRed} onClick={() => navigate('/register')}>Regístrate</span>
          </p>
        </div>
      </div>

      {/* POP-UP 1: INTERFAZ DE RECUPERACIÓN DE CONTRASEÑA */}
      {showRecoveryModal && (
        <div style={styles.modalOverlay} onClick={() => setShowRecoveryModal(false)}>
          <div style={styles.recoveryCard} onClick={(e) => e.stopPropagation()}>
            <button style={styles.recoveryCloseX} onClick={() => setShowRecoveryModal(false)}>✕</button>

            {/* LADO IZQUIERDO DEL MODAL: Candado */}
            <div style={styles.recoveryLeft}>
              <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.5">
                <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeLinecap="round" />
                <path d="M5 11h14a2 2 0 0 1 2 2v5a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-5a2 2 0 0 1 2-2z" fill="#0A0A0A" stroke="#000000" />
                <circle cx="12" cy="16" r="3" fill="none" stroke="#D31424" strokeWidth="1.5" />
                <path d="m10.5 16 1 1 2-2" stroke="#D31424" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* LADO DERECHO DEL MODAL: Formulario */}
            <div style={styles.recoveryRight}>
              <h3 style={styles.recoveryTitle}>Recuperación de Contraseña</h3>
              <form onSubmit={handleRecoverySubmit} style={styles.recoveryForm}>
                <div style={styles.recoveryInputGroup}>
                  <label style={styles.recoveryLabel}>Email</label>
                  <input
                    type="email"
                    placeholder="juan.perez@gmail.com"
                    value={recoveryEmail}
                    onChange={(e) => setRecoveryEmail(e.target.value)}
                    style={styles.recoveryInput}
                    required
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    ...styles.recoverySubmitBtn,
                    backgroundColor: isRecoveryBtnHovered ? '#E2E8F0' : '#FFFFFF',
                    transform: isRecoveryBtnHovered ? 'translateY(-1px)' : 'translateY(0)'
                  }}
                  onMouseEnter={() => setIsRecoveryBtnHovered(true)}
                  onMouseLeave={() => setIsRecoveryBtnHovered(false)}
                >
                  Enviar
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* POP-UP 2: CREDENCIALES DENEGADAS */}
      {showErrorModal && (
        <div style={styles.modalOverlay} onClick={() => setShowErrorModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 style={styles.modalTitle}>Credenciales Denegadas</h3>
            <div style={styles.errorIconCircle}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
            <button style={styles.modalCloseButton} onClick={() => setShowErrorModal(false)}>
              Cerrar Aviso
            </button>
          </div>
        </div>
      )}

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
    flex: '1 1 50%',
    position: 'relative',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'flex-end',
    padding: '50px',
    color: '#FFFFFF',
    minHeight: '580px',
  },
  overlayColor: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(211, 20, 36, 0.88)',
    zIndex: 1,
  },
  leftContent: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '460px',
  },
  mainTitle: {
    fontSize: '36px',
    fontWeight: '900',
    margin: '0 0 16px 0',
    lineHeight: '1.1',
    letterSpacing: '0.5px',
  },
  subTitle: {
    fontSize: '14px',
    opacity: '0.9',
    lineHeight: '1.6',
    margin: '0 0 30px 0',
  },
  carouselIndicators: {
    display: 'flex',
    gap: '6px',
  },
  dot: {
    width: '16px',
    height: '3px',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: '2px',
  },
  activeDot: {
    backgroundColor: '#FFFFFF',
    width: '28px',
  },
  rightPanel: {
    flex: '1 1 50%',
    padding: '50px 60px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    boxSizing: 'border-box',
    backgroundColor: '#FFFFFF',
  },
  topLabelContainer: {
    textAlign: 'right',
    marginBottom: '20px',
  },
  topLabel: {
    fontSize: '11px',
    fontWeight: 'bold',
    color: '#9CA3AF',
    letterSpacing: '1px',
  },
  formTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#111827',
    margin: 0,
  },
  formSubText: {
    fontSize: '14px',
    color: '#6B7280',
    marginTop: '6px',
    marginBottom: '32px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  passwordLabelRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: '11px',
    fontWeight: 'bold',
    color: '#D31424',
    letterSpacing: '0.5px',
  },
  forgotPasswordLink: {
    fontSize: '10px',
    fontWeight: 'bold',
    color: '#2563EB',
    cursor: 'pointer',
    letterSpacing: '0.5px',
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: '8px',
    padding: '0 14px',
    height: '46px',
    border: '1px solid #E2E8F0',
  },
  inputIcon: {
    marginRight: '12px',
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
  eyeIcon: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    marginLeft: '10px',
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
    marginTop: '10px',
    transition: 'background-color 0.2s ease',
  },
  socialDivider: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '30px 0 20px 0',
    width: '100%',
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    backgroundColor: '#F1F5F9',
  },
  dividerText: {
    fontSize: '10px',
    color: '#9CA3AF',
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    padding: '0 15px',
  },
  socialButtonsRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
  },
  socialButton: {
    flex: 1,
    height: '40px',
    border: '1px solid #E2E8F0',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '13px',
    fontWeight: '500',
    color: '#374151',
  },
  registerRedirect: {
    textAlign: 'center',
    fontSize: '13px',
    color: '#4B5563',
    marginTop: '32px',
    marginBottom: 0,
  },
  linkTextRed: {
    color: '#D31424',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    backdropFilter: 'blur(5px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  modalContent: {
    backgroundColor: '#F8FAFC',
    padding: '40px 60px',
    borderRadius: '16px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    minWidth: '340px',
    border: '1px solid #E2E8F0',
  },
  modalTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#7B1113',
    margin: '0 0 30px 0',
  },
  errorIconCircle: {
    width: '80px',
    height: '80px',
    backgroundColor: '#FF6473',
    border: '8px solid #FF96A2',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 10px 15px -3px rgba(255, 100, 115, 0.3)',
    marginBottom: '30px',
  },
  modalCloseButton: {
    backgroundColor: '#7B1113',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '6px',
    padding: '12px 24px',
    fontSize: '13px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  recoveryCard: {
    backgroundColor: '#A30D11', 
    width: '90%',
    maxWidth: '750px',
    borderRadius: '16px',
    padding: '50px 40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '40px',
    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    position: 'relative',
  },
  recoveryCloseX: {
    position: 'absolute',
    top: '20px',
    right: '25px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '18px',
    cursor: 'pointer',
    padding: '5px',
    transition: 'color 0.2s',
  },
  recoveryLeft: {
    flex: '1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recoveryRight: {
    flex: '1.2',
    display: 'flex',
    flexDirection: 'column',
  },
  recoveryTitle: {
    fontSize: '26px',
    fontWeight: '800',
    color: '#0A0A0A', 
    margin: '0 0 32px 0',
    fontFamily: 'Arial, sans-serif',
    letterSpacing: '-0.5px',
  },
  recoveryForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  recoveryInputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  recoveryLabel: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#0A0A0A',
    letterSpacing: '0.5px',
  },
  recoveryInput: {
    width: '100%',
    height: '42px',
    backgroundColor: '#FFFFFF',
    border: 'none',
    borderRadius: '6px',
    padding: '0 14px',
    fontSize: '14px',
    color: '#1E293B',
    fontWeight: 'bold',
    boxSizing: 'border-box',
    outline: 'none',
    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.06)',
  },
  recoverySubmitBtn: {
    width: '120px',
    height: '38px',
    backgroundColor: '#FFFFFF',
    color: '#0A0A0A',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    alignSelf: 'flex-start',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    transition: 'all 0.15s ease',
  }
};

export default Login;