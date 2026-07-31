import React, { useState } from "react";
import { useAccessibility } from '../../domain/contexts/AccessibilityContext.jsx';

export default function Notifications() {
  const { notifSonoras } = useAccessibility();
  const [filtroActivo, setFiltroActivo] = useState("Todas");

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
      alert("Tu navegador no soporta la reproducción de audio por voz.");
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

        <div style={tarjetaNotificacionStyle(true)}>
          <div style={headerNotificacionStyle}>
            <div style={infoNotificacionStyle}>
              <div style={iconoItemStyle(true)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A30D11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                </svg>
              </div>
              <div>
                <h3 style={{ fontSize: "15px", fontWeight: "bold", color: "#1F2937", margin: "0 0 4px 0" }}>
                  15 minutos para nadar!
                </h3>
                <p style={{ fontSize: "14px", color: "#4B5563", margin: "0", lineHeight: "1.4" }}>
                  "El torneo de natación inclusiva comenzará en 15 minutos en el carril central. Por favor, preparen su equipamiento."
                </p>
              </div>
            </div>
            <span style={{ fontSize: "11px", color: "#9CA3AF", fontWeight: "600", whiteSpace: "nowrap" }}>
              HACE 2 MIN
            </span>
          </div>
          <div style={{ ...accionesStyle, paddingLeft: "46px" }}>
            <button 
              style={botonReproducirStyle(notifSonoras)} 
              onClick={() => reproducirAudioTexto("El torneo de natación inclusiva comenzará en 15 minutos en el carril central. Por favor, preparen su equipamiento.")}
              disabled={!notifSonoras}
            >
              <span style={{ color: "#A30D11" }}>▶</span> {notifSonoras ? 'Reproducir Audio' : 'Audio desactivado'}
            </button>
            <button style={botonMarcarLeidaStyle}>Marcar como leída</button>
          </div>
        </div>

        <div style={tarjetaNotificacionStyle(false)}>
          <div style={headerNotificacionStyle}>
            <div style={infoNotificacionStyle}>
              <div style={iconoItemStyle(false)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div>
                <h3 style={{ fontSize: "15px", fontWeight: "bold", color: "#1F2937", margin: "0 0 4px 0" }}>
                  Recordatorio de Calentamiento
                </h3>
                <p style={{ fontSize: "14px", color: "#4B5563", margin: "0", lineHeight: "1.4" }}>
                  "Recordatorio: Sesión de entrenamiento con el Coach Javier a las 16:30. No olvides tu hidratación."
                </p>
              </div>
            </div>
            <span style={{ fontSize: "11px", color: "#9CA3AF", fontWeight: "600", whiteSpace: "nowrap" }}>
              HACE 45 MIN
            </span>
          </div>
          <div style={{ ...accionesStyle, paddingLeft: "46px" }}>
            <button 
              style={botonReproducirStyle(notifSonoras)} 
              onClick={() => reproducirAudioTexto("Recordatorio: Sesión de entrenamiento con el Coach Javier a las 16:30. No olvides tu hidratación.")}
              disabled={!notifSonoras}
            >
              <span style={{ color: "#A30D11" }}>▶</span> {notifSonoras ? 'Reproducir Audio' : 'Audio desactivado'}
            </button>
            <button style={botonMarcarLeidaStyle}>Marcar como leída</button>
          </div>
        </div>

        <div style={tarjetaNotificacionStyle(false)}>
          <div style={headerNotificacionStyle}>
            <div style={infoNotificacionStyle}>
              <div style={iconoItemStyle(false)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div>
                <h3 style={{ fontSize: "15px", fontWeight: "bold", color: "#1F2937", margin: "0 0 4px 0" }}>
                  Voces actualizadas
                </h3>
                <p style={{ fontSize: "14px", color: "#4B5563", margin: "0", lineHeight: "1.4" }}>
                  "Se han optimizado las voces del lector de pantalla para mayor claridad en ambientes ruidosos."
                </p>
              </div>
            </div>
            <span style={{ fontSize: "11px", color: "#9CA3AF", fontWeight: "600", whiteSpace: "nowrap" }}>
              HOY, 09:15 AM
            </span>
          </div>
          <div style={{ ...accionesStyle, paddingLeft: "46px" }}>
            <button 
              style={botonReproducirStyle(notifSonoras)} 
              onClick={() => reproducirAudioTexto("Se han optimizado las voces del lector de pantalla para mayor claridad en ambientes ruidosos.")}
              disabled={!notifSonoras}
            >
              <span style={{ color: "#A30D11" }}>▶</span> {notifSonoras ? 'Reproducir Audio' : 'Audio desactivado'}
            </button>
            <button style={botonMarcarLeidaStyle}>Marcar como leída</button>
          </div>
        </div>

      </div>
    </div>
  );
}