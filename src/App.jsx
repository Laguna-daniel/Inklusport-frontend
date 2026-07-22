import React from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './ui/pages/Login';
import Register from './ui/pages/Register';
import './styles/App.css';
import logo from './ui/assets/logo.png';

function App() {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      {/* Fuentes: Oswald para titulares con carácter deportivo, Inter para texto, JetBrains Mono para etiquetas técnicas */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap');
      `}</style>

      {/* 1. ELEMENTO DECORATIVO: Patrón de cuadrícula técnica en el fondo */}
      <div style={styles.gridOverlay}></div>

      {/* 1b. ELEMENTO FIRMA: Carriles de pista de atletismo, gran escala, para ocupar el espacio vacío del fondo */}
      <div style={styles.laneField} aria-hidden="true">
        <div style={{ ...styles.lane, top: '8%' }}></div>
        <div style={{ ...styles.lane, top: '28%' }}></div>
        <div style={{ ...styles.lane, top: '48%' }}></div>
        <div style={{ ...styles.lane, top: '68%' }}></div>
        <div style={{ ...styles.lane, top: '88%' }}></div>
      </div>

      {/* CONTENEDOR ESTRUCTURAL PRINCIPAL */}
      <main style={styles.contentWrapper}>

        {/* BLOQUE IZQUIERDO - CON ALINEACIÓN PERFECTA CON EL BORDE DEL LOGO */}
        <div style={styles.leftSection}>
          {/* LOGO Y TEXTO COMPARTIENDO LA MISMA ESTRUCTURA DE ANCHO */}
          <div style={styles.logoWrapper}>
            <div style={styles.logoFrame}>
              <img src={logo} alt="Inklusport Logo" style={styles.logo} />
            </div>
          </div>

          {/* TEXTO EXACTAMENTE ALINEADO AL BORDE IZQUIERDO DEL MARCO DEL LOGO */}
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

        {/* BLOQUE DERECHO */}
        <div style={styles.rightSection}>
          <div style={styles.actionCard}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>Control de Acceso</h2>
              <p style={styles.cardSubtitle}>Identifícate para ingresar a tu panel de gestión.</p>
            </div>

            <div style={styles.buttonGroup}>
              <button
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
              </button>

              <button
                onClick={handleLogin}
                style={styles.loginButton}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#890A0D'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#A30D11'}
              >
                Iniciar Sesión
              </button>
            </div>
          </div>
        </div>

      </main>

      {/* 3. BARRA INFERIOR */}
      <footer style={styles.footerBottom}>
      </footer>
    </div>
  );
};

// ============================================
// ESTILOS - CON ALINEACIÓN DE BORDES CORREGIDA
// ============================================
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    minWidth: '100vw',
    minHeight: '100vh',
    maxWidth: '100vw',
    maxHeight: '100vh',
    backgroundColor: '#F8FAFC',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  gridOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'linear-gradient(rgba(148, 163, 184, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.05) 1px, transparent 1px)',
    backgroundSize: '30px 30px',
    zIndex: 1,
    pointerEvents: 'none',
  },
  laneField: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
    pointerEvents: 'none',
    overflow: 'hidden',
  },
  lane: {
    position: 'absolute',
    left: '-10%',
    width: '140%',
    height: '2px',
    backgroundColor: 'rgba(163, 13, 17, 0.06)',
    transform: 'rotate(-6deg)',
  },
  headerTop: {
    width: '100%',
    maxWidth: '1180px',
    padding: '20px 60px 16px 60px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
    zIndex: 5,
    flexShrink: 0,
  },
  versionTag: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    color: '#64748B',
    fontWeight: '700',
    letterSpacing: '1px',
  },
  topLinks: {
    display: 'flex',
    gap: '24px',
    fontSize: '13px',
    color: '#64748B',
    fontWeight: '500',
  },
  topLink: {
    cursor: 'pointer',
  },
  topLinkActive: {
    color: '#A30D11',
    fontWeight: '700',
    cursor: 'pointer',
  },
  contentWrapper: {
    display: 'flex',
    width: '100%',
    maxWidth: '1180px',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '70px',
    padding: '0 60px',
    margin: '0 auto',
    boxSizing: 'border-box',
    zIndex: 5,
    flex: '1 1 auto',
    minHeight: 0,
  },
  
  // ============================================
  // SECCIÓN IZQUIERDA - ALINEACIÓN DE BORDES
  // ============================================
  leftSection: {
    flex: '1.15',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
  },
  
  logoWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: '20px',
    width: '100%',
  },
  
  logoFrame: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    padding: '16px 24px',
    border: '2px solid #A30D11',
    boxShadow: '0 2px 8px rgba(163, 13, 17, 0.08)',
    transition: 'all 0.3s ease',
  },
  
  logo: {
    width: '100%',
    maxWidth: '340px',
    height: 'auto',
    objectFit: 'contain',
    display: 'block',
  },
  
  // Contenedor alineado estrictamente a la izquierda sin márgenes residuales
  textContentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingLeft: '0px',
    marginLeft: '0px',
    width: '100%',
    maxWidth: '520px',
  },
  
  eyebrow: {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '1.2px',
    color: '#A30D11',
    backgroundColor: 'rgba(163, 13, 17, 0.07)',
    border: '1px solid rgba(163, 13, 17, 0.18)',
    borderRadius: '20px',
    padding: '5px 12px',
    marginBottom: '14px',
    textTransform: 'uppercase',
    alignSelf: 'flex-start',
  },
  
  brandTextGroup: {
    marginBottom: '20px',
    width: '100%',
    textAlign: 'left',
  },
  
  brandTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '34px',
    fontWeight: '700',
    color: '#0F172A',
    margin: '0 0 10px 0',
    letterSpacing: '-0.3px',
    textTransform: 'uppercase',
    textAlign: 'left',
  },
  
  brandData: {
    fontSize: '14.5px',
    color: '#475569',
    lineHeight: '1.65',
    margin: 0,
    textAlign: 'left',
  },
  
  // ============================================
  // SECCIÓN DERECHA
  // ============================================
  rightSection: {
    flex: '0.9',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  
  actionCard: {
    width: '100%',
    maxWidth: '380px',
    backgroundColor: '#FFFFFF',
    padding: '36px 40px',
    borderRadius: '16px',
    boxShadow: '0 14px 32px rgba(15, 23, 42, 0.07)',
    border: '1px solid #E2E8F0',
  },
  
  cardHeader: {
    marginBottom: '26px',
  },
  
  cardTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '22px',
    fontWeight: '600',
    color: '#0F172A',
    margin: '0 0 5px 0',
    textTransform: 'uppercase',
    letterSpacing: '0.2px',
  },
  
  cardSubtitle: {
    fontSize: '13px',
    color: '#64748B',
    margin: 0,
  },
  
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  
  registerButton: {
    width: '100%',
    padding: '14px 0',
    backgroundColor: '#FFFFFF',
    color: '#A30D11',
    border: '1px solid #CBD5E1',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  
  loginButton: {
    width: '100%',
    padding: '14px 0',
    backgroundColor: '#A30D11',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.15s ease',
  },
  
  footerBottom: {
    width: '100%',
    maxWidth: '1180px',
    padding: '16px 60px 20px 60px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '11px',
    color: '#94A3B8',
    fontWeight: '500',
    boxSizing: 'border-box',
    zIndex: 5,
    flexShrink: 0,
  },
};

export default App;