import React, { useState, useEffect } from 'react';
import { useAccessibility } from '../../domain/contexts/AccessibilityContext.jsx';
import { useNotifications } from '../../domain/contexts/NotificationsContext.jsx';

export default function Notifications() {
  const { notifSonoras } = useAccessibility();
  const { notifications, markNotificationAsRead, markAllAsRead } = useNotifications();
  const [filtroActivo, setFiltroActivo] = useState('Todas');

  useEffect(() => {
    const hasUnread = notifications.some((notification) => !notification.read);
    if (notifications.length > 0 && hasUnread) {
      markAllAsRead();
    }
  }, [notifications, markAllAsRead]);

  const filteredNotifications = notifications.filter((notification) => {
    if (filtroActivo === 'Todas') {
      return true;
    }
    if (filtroActivo === 'Urgentes') {
      return (
        notification.category?.toLowerCase() === 'urgentes' ||
        notification.category?.toLowerCase() === 'urgente'
      );
    }
    return notification.category?.toLowerCase() === 'sistema';
  });

  const reproducirAudioTexto = (texto) => {
    if (!notifSonoras) {
      return;
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(texto);
      utterance.lang = 'es-ES'; // Configurado en español
      utterance.rate = 1.0;     // Velocidad normal

      window.speechSynthesis.speak(utterance);
    } else {
      alert('Tu navegador no soporta la reproducción de audio por voz.');
    }
  };

  const contenedorStyle = {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    backgroundColor: 'var(--app-bg-color, #F9FAFB)',
    color: 'var(--app-text-color, #111827)',
    fontSize: 'var(--app-font-size, 16px)',
    minHeight: "100vh",
    padding: "40px 20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  };

  const tarjetaPrincipalStyle = {
    backgroundColor: "#A30D11",
    borderRadius: "24px",
    padding: "36px 40px",
    color: "#FFFFFF",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
    boxShadow: "0 10px 25px rgba(227, 27, 35, 0.2)",
    position: "relative",
    overflow: "hidden",
  };

  const contenidoPrincipalStyle = {
    maxWidth: "500px",
  };

  const iconoGrandeStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: "16px",
    padding: "24px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "blur(5px)",
  };

  const barraFiltrosStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  };

  const contenedorFiltrosStyle = {
    display: "flex",
    gap: "10px",
  };

  const estiloBotonFiltro = (activo) => ({
    backgroundColor: activo ? "#A30D11" : "#E5E7EB",
    color: activo ? "#FFFFFF" : "#4B5563",
    border: "none",
    padding: "8px 18px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  });

  const botonConfigStyle = {
    background: "none",
    border: "none",
    color: "#A30D11",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  };

  const tarjetaNotificacionStyle = (destacada) => ({
    backgroundColor: "#FFFFFF",
    borderRadius: "16px",
    padding: "20px 24px",
    marginBottom: "16px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.03)",
    borderLeft: destacada ? "5px solid #A30D11" : "5px solid transparent",
    position: "relative",
  });

  const headerNotificacionStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "8px",
  };

  const infoNotificacionStyle = {
    display: "flex",
    gap: "14px",
    alignItems: "flex-start",
  };

  const iconoItemStyle = (destacada) => ({
    backgroundColor: destacada ? "#FEE2E2" : "#F3F4F6",
    color: destacada ? "#A30D11" : "#4B5563",
    borderRadius: "12px",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });

  const accionesStyle = {
    display: "flex",
    gap: "16px",
    alignItems: "center",
    marginTop: "12px",
  };

  const botonReproducirStyle = (enabled) => ({
    backgroundColor: enabled ? "#F3F4F6" : "#E5E7EB",
    border: "none",
    borderRadius: "20px",
    padding: "6px 14px",
    fontSize: "13px",
    fontWeight: "500",
    color: enabled ? "#1F2937" : "#9CA3AF",
    cursor: enabled ? "pointer" : "not-allowed",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  });

  const botonMarcarLeidaStyle = {
    background: "none",
    border: "none",
    color: "#6B7280",
    fontSize: "13px",
    cursor: "pointer",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  };

  return (
    <div style={contenedorStyle}>
      <style>{`
        @keyframes slideFadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .slide-fade-in {
          opacity: 0;
          animation: slideFadeIn 0.42s ease forwards;
        }

        .slide-fade-in.delay-1 {
          animation-delay: 0.08s;
        }

        .slide-fade-in.delay-2 {
          animation-delay: 0.14s;
        }
      `}</style>
      <div style={{ width: "100%", maxWidth: "700px" }}>
        
        <div style={tarjetaPrincipalStyle}>
          <div style={contenidoPrincipalStyle}>
            <h1 style={{ fontSize: "28px", fontWeight: "bold", margin: "0 0 12px 0", lineHeight: "1.2" }}>
              Notificaciones Auditivas Recientes
            </h1>
            <p style={{ fontSize: "15px", margin: "0", opacity: "0.9", lineHeight: "1.5" }}>
              Manténgase al tanto de cada pulso de actividad con alertas auditivas inteligentes y transcripciones en tiempo real.
            </p>
          </div>
          <div style={iconoGrandeStyle}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#FFFFFF" }}>
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
          </div>
        </div>

        <div style={barraFiltrosStyle}>
          <div style={contenedorFiltrosStyle}>
            {["Todas", "Urgentes", "Sistema"].map((filtro) => (
              <button
                key={filtro}
                style={estiloBotonFiltro(filtroActivo === filtro)}
                onClick={() => setFiltroActivo(filtro)}
              >
                {filtro}
              </button>
            ))}
          </div>
          <button style={botonConfigStyle}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A30D11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
              <path d="M19 10v1a7 7 0 0 1-14 0v-1"></path>
              <line x1="12" y1="19" x2="12" y2="23"></line>
              <line x1="8" y1="23" x2="16" y2="23"></line>
            </svg>
            Configurar Voz
          </button>
        </div>

        <div style={barraFiltrosStyle}>
          <div style={contenedorFiltrosStyle}>
            {['Todas', 'Urgentes', 'Sistema'].map((filtro) => (
              <button
                key={filtro}
                style={estiloBotonFiltro(filtroActivo === filtro)}
                onClick={() => setFiltroActivo(filtro)}
              >
                {filtro}
              </button>
            ))}
          </div>
          <button style={botonConfigStyle} onClick={markAllAsRead}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A30D11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
              <path d="M19 10v1a7 7 0 0 1-14 0v-1"></path>
              <line x1="12" y1="19" x2="12" y2="23"></line>
              <line x1="8" y1="23" x2="16" y2="23"></line>
            </svg>
            Marcar todo leído
          </button>
        </div>

        {filteredNotifications.length === 0 ? (
          <div style={{ ...tarjetaNotificacionStyle(false), textAlign: 'center', padding: '40px 24px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', color: '#111827' }}>No hay notificaciones para mostrar.</h3>
            <p style={{ margin: '10px 0 0', color: '#6B7280' }}>
              Vuelve más tarde o verifica otra categoría.
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification, index) => (
            <div
              key={notification.id}
              style={{
                ...tarjetaNotificacionStyle(!notification.read),
                animation: 'slideFadeIn 0.4s ease forwards',
                animationDelay: `${0.04 * (index + 1)}s`,
              }}
              className="slide-fade-in"
            >
              <div style={headerNotificacionStyle}>
                <div style={infoNotificacionStyle}>
                  <div style={iconoItemStyle(!notification.read)}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={notification.read ? '#4B5563' : '#A30D11'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: '#1F2937', margin: '0 0 4px 0' }}>
                      {notification.title}
                    </h3>
                    <p style={{ fontSize: '14px', color: '#4B5563', margin: '0', lineHeight: '1.4' }}>
                      {notification.message}
                    </p>
                  </div>
                </div>
                <span style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: '600', whiteSpace: 'nowrap' }}>
                  {new Date(notification.createdAt).toLocaleString('es-ES', {
                    hour: '2-digit',
                    minute: '2-digit',
                    day: '2-digit',
                    month: 'short',
                  })}
                </span>
              </div>
              <div style={{ ...accionesStyle, paddingLeft: '46px' }}>
                <button
                  style={botonReproducirStyle(notifSonoras)}
                  onClick={() => reproducirAudioTexto(notification.message)}
                  disabled={!notifSonoras}
                >
                  <span style={{ color: '#A30D11' }}>▶</span> {notifSonoras ? 'Reproducir Audio' : 'Audio desactivado'}
                </button>
                <button
                  style={botonMarcarLeidaStyle}
                  onClick={() => markNotificationAsRead(notification.id)}
                >
                  {notification.read ? 'Leída' : 'Marcar como leída'}
                </button>
              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
}