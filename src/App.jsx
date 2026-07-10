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
      {/* 1. ELEMENTO DECORATIVO: Patrón de cuadrícula técnica en el fondo */}
      <div style={styles.gridOverlay}></div>

      {/* 2. BARRA SUPERIOR: Detalles de navegación global para rellenar espacio útil */}
      <header style={styles.headerTop}>
        <span style={styles.versionTag}>INKLUSPORT ECOSYSTEM v1.0</span>
        <div style={styles.topLinks}>
          <span style={styles.topLink}>Soporte</span>
          <span style={styles.topLink}>Accesibilidad</span>
          <span style={styles.topLinkActive}>ES</span>
        </div>
      </header>

      {/* CONTENEDOR ESTRUCTURAL PRINCIPAL (Mantiene tu misma distribución horizontal) */}
      <main style={styles.contentWrapper}>
        
        {/* BLOQUE IZQUIERDO: Identidad + Contenido de Valor Agregado */}
        <div style={styles.leftSection}>
          <div style={styles.logoFrame}>
            <img src={logo} alt="Inklusport Logo" style={styles.logo} />
          </div>
          
          {/* Bloque de texto agregado para justificar el espacio */}
          <div style={styles.brandTextGroup}>
            <h1 style={styles.brandTitle}>Alto Rendimiento Inclusivo</h1>
            <p style={styles.brandData}>
              Portal centralizado para la gestión de atletas adaptados, analíticas avanzadas y organización de eventos deportivos oficiales.
            </p>
          </div>

          {/* Fila de mini-métricas técnicas simuladas para robustecer la UI */}
          <div style={styles.metricsRow}>
            <div style={styles.metricItem}>
              <span style={styles.metricNumber}>+12k</span>
              <span style={styles.metricLabel}>Atletas</span>
            </div>
            <div style={styles.metricDivider}></div>
            <div style={styles.metricItem}>
              <span style={styles.metricNumber}>100%</span>
              <span style={styles.metricLabel}>Accesible</span>
            </div>
            <div style={styles.metricDivider}></div>
            <div style={styles.metricItem}>
              <span style={styles.metricNumber}>Real-Time</span>
              <span style={styles.metricLabel}>Métricas</span>
            </div>
          </div>
        </div>

        {/* BLOQUE DERECHO: Tarjeta de Acciones Estilizada */}
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

      {/* 3. BARRA INFERIOR: Footer corporativo para cerrar el diseño */}
      <footer style={styles.footerBottom}>
        <span>© {new Date().getFullYear()} Inklusport Inc. Todos los derechos reservados.</span>
        <span>Seguridad TLS Encrypted</span>
      </footer>
    </div>
  );
}

// Estilos Profesionales Estructurados
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#F8FAFC', // Fondo gris claro de software moderno
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  gridOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // Genera una cuadrícula fina de píxeles gris transparente que llena el fondo elegantemente
    backgroundImage: 'linear-gradient(rgba(148, 163, 184, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.05) 1px, transparent 1px)',
    backgroundSize: '30px 30px',
    zIndex: 1,
  },
  headerTop: {
    width: '100%',
    padding: '24px 60px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
    zIndex: 5,
  },
  versionTag: {
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
    maxWidth: '1100px',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '80px',
    padding: '0 60px',
    margin: '0 auto',
    boxSizing: 'border-box',
    zIndex: 5,
  },
  leftSection: {
    flex: '1.1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  logoFrame: {
    marginBottom: '28px',
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    maxWidth: '240px',
    height: 'auto',
    objectFit: 'contain',
  },
  brandTextGroup: {
    marginBottom: '32px',
    maxWidth: '460px',
  },
  brandTitle: {
    fontSize: '26px',
    fontWeight: '800',
    color: '#0F172A',
    margin: '0 0 10px 0',
    letterSpacing: '-0.5px',
  },
  brandData: {
    fontSize: '14px',
    color: '#475569',
    lineHeight: '1.6',
    margin: 0,
  },
  metricsRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(8px)',
    padding: '14px 24px',
    borderRadius: '12px',
    border: '1px solid #E2E8F0',
  },
  metricItem: {
    display: 'flex',
    flexDirection: 'column',
  },
  metricNumber: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#A30D11',
  },
  metricLabel: {
    fontSize: '11px',
    color: '#64748B',
    fontWeight: '500',
    marginTop: '2px',
  },
  metricDivider: {
    width: '1px',
    height: '30px',
    backgroundColor: '#E2E8F0',
  },
  rightSection: {
    flex: '0.9',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  actionCard: {
    width: '100%',
    maxWidth: '360px',
    backgroundColor: '#FFFFFF',
    padding: '36px',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(15, 23, 42, 0.05)',
    border: '1px solid #E2E8F0',
  },
  cardHeader: {
    marginBottom: '28px',
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#0F172A',
    margin: '0 0 6px 0',
  },
  cardSubtitle: {
    fontSize: '13px',
    color: '#64748B',
    margin: 0,
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
    padding: '24px 60px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '11px',
    color: '#94A3B8',
    fontWeight: '500',
    boxSizing: 'border-box',
    zIndex: 5,
  },
};

export default App;
