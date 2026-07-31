import React from "react";
import { useAccessibility } from '../../domain/contexts/AccessibilityContext.jsx';

export default function Accessibility() {
  const {
    contraste,
    notifSonoras,
    feedbackHaptico,
    tamanoFuente,
    setContraste,
    setNotifSonoras,
    setFeedbackHaptico,
    setTamanoFuente,
  } = useAccessibility();

  const handleToggleHaptico = () => {
    const nuevoEstado = !feedbackHaptico;
    setFeedbackHaptico(nuevoEstado);
    if (nuevoEstado && "vibrate" in navigator) {
      navigator.vibrate(50);
    }
  };

  const handleGuardarCambios = () => {
    const configuracion = {
      contraste,
      notificacionesSonoras: notifSonoras,
      feedbackHaptico,
      tamanoFuente,
    };

    console.log("Guardando configuración en la API:", configuracion);
    alert("¡Configuración de accesibilidad guardada con éxito!");
  };

  const obtenerEstilosContraste = () => {
    if (contraste === "ALTO") {
      return {
        bgGeneral: "#000000",
        bgTarjeta: "#121212",
        textoPrincipal: "#FFFFFF",
        textoSecundario: "#E0E0E0",
        bordeTarjeta: "1px solid #333333",
      };
    } else if (contraste === "BAJO") {
      return {
        bgGeneral: "#F9FAFB",
        bgTarjeta: "#FFFFFF",
        textoPrincipal: "#6B7280",
        textoSecundario: "#9CA3AF",
        bordeTarjeta: "1px solid #E5E7EB",
      };
    }
    return {
      bgGeneral: "#F9FAFB",
      bgTarjeta: "#FFFFFF",
      textoPrincipal: "#1F2937",
      textoSecundario: "#4B5563",
      bordeTarjeta: "none",
    };
  };

  const currentTheme = obtenerEstilosContraste();

  const contenedorStyle = {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    backgroundColor: currentTheme.bgGeneral,
    color: currentTheme.textoPrincipal,
    fontSize: 'var(--app-font-size, 16px)',
    minHeight: "100vh",
    padding: "40px 20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    transition: "background-color 0.3s ease",
  };

  const wrapperStyle = {
    width: "100%",
    maxWidth: "700px",
  };

  const headerStyle = {
    marginBottom: "24px",
  };

  const subtituloHeaderStyle = {
    fontSize: "12px",
    fontWeight: "700",
    color: "#A30D11",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    margin: "0 0 6px 0",
  };

  const tituloHeaderStyle = {
    fontSize: "26px",
    fontWeight: "bold",
    color: currentTheme.textoPrincipal,
    margin: "0 0 8px 0",
  };

  const descHeaderStyle = {
    fontSize: "14px",
    color: currentTheme.textoSecundario,
    lineHeight: "1.5",
    margin: "0",
  };

  const tarjetaStyle = {
    backgroundColor: currentTheme.bgTarjeta,
    borderRadius: "16px",
    padding: "24px",
    marginBottom: "16px",
    boxShadow: contraste === "ALTO" ? "none" : "0 4px 12px rgba(0, 0, 0, 0.03)",
    border: currentTheme.bordeTarjeta,
    transition: "all 0.3s ease",
  };

  const tituloSeccionStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "15px",
    fontWeight: "bold",
    color: currentTheme.textoPrincipal,
    marginBottom: "20px",
  };

  const opcionesContrasteContainer = {
    display: "flex",
    gap: "16px",
    justifyContent: "space-between",
  };

  const tarjetaOpcionContraste = (activa) => ({
    flex: 1,
    border: activa ? "2px solid #A30D11" : "2px solid #E5E7EB",
    borderRadius: "14px",
    padding: "16px 10px",
    textAlign: "center",
    cursor: "pointer",
    backgroundColor: contraste === "ALTO" ? "#1A1A1A" : "#FFFFFF",
    transition: "all 0.2s ease",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
  });

  const filaToggleStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const switchStyle = (activo) => ({
    width: "48px",
    height: "26px",
    backgroundColor: activo ? "#E41B23" : "#D1D5DB",
    borderRadius: "15px",
    position: "relative",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  });

  const switchHandleStyle = (activo) => ({
    width: "20px",
    height: "20px",
    backgroundColor: "#FFFFFF",
    borderRadius: "50%",
    position: "absolute",
    top: "3px",
    left: activo ? "24px" : "4px",
    transition: "left 0.2s ease",
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
  });

  const sliderStyle = {
    width: "100%",
    accentColor: "#A30D11",
    cursor: "pointer",
    marginBottom: "8px",
  };

  const etiquetasSliderStyle = {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "11px",
    color: currentTheme.textoSecundario,
    fontWeight: "bold",
    marginBottom: "12px",
  };

  const vistaPreviaBoxStyle = {
    backgroundColor: contraste === "ALTO" ? "#1F1F1F" : "#F3F4F6",
    borderRadius: "12px",
    padding: "20px",
    marginTop: "16px",
  };

  const botonGuardarStyle = {
    backgroundColor: "#E41B23",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "12px",
    width: "100%",
    padding: "16px",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(228, 27, 35, 0.3)",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    marginTop: "8px",
    transition: "opacity 0.2s ease",
  };

  return (
    <div style={contenedorStyle}>
      <div style={wrapperStyle}>
        
        <div style={headerStyle}>
          <p style={subtituloHeaderStyle}>PERSONALIZACIÓN TÉCNICA</p>
          <h1 style={tituloHeaderStyle}>Configuración de Accesibilidad</h1>
          <p style={descHeaderStyle}>
            Optimiza tu experiencia digital. Cada ajuste está diseñado para garantizar que el rendimiento deportivo y la tecnología sean accesibles para todos.
          </p>
        </div>

        <div style={tarjetaStyle}>
          <div style={tituloSeccionStyle}>
            <span style={{ color: "#A30D11", fontSize: "18px" }}>◐</span>
            <span>Selector de contraste</span>
          </div>

          <div style={opcionesContrasteContainer}>
            <div 
              style={tarjetaOpcionContraste(contraste === "BAJO")} 
              onClick={() => setContraste("BAJO")}
            >
              <div style={{ width: "36px", height: "54px", backgroundColor: "#E5E7EB", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "20px", height: "30px", backgroundColor: "#D1D5DB", borderRadius: "4px" }}></div>
              </div>
              <span style={{ fontSize: "12px", fontWeight: "bold", color: contraste === "BAJO" ? "#A30D11" : currentTheme.textoSecundario }}>BAJO</span>
            </div>

            <div 
              style={tarjetaOpcionContraste(contraste === "MEDIO")} 
              onClick={() => setContraste("MEDIO")}
            >
              <div style={{ width: "36px", height: "54px", backgroundColor: "#FEE2E2", borderRadius: "6px", border: "1px solid #A30D11", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <div style={{ width: "14px", height: "14px", backgroundColor: "#A30D11", borderRadius: "50%", position: "absolute", top: "10px" }}></div>
                <div style={{ width: "20px", height: "20px", backgroundColor: "#F87171", borderRadius: "4px", position: "absolute", bottom: "8px" }}></div>
              </div>
              <span style={{ fontSize: "12px", fontWeight: "bold", color: contraste === "MEDIO" ? "#A30D11" : currentTheme.textoSecundario }}>MEDIO</span>
            </div>

            <div 
              style={tarjetaOpcionContraste(contraste === "ALTO")} 
              onClick={() => setContraste("ALTO")}
            >
              <div style={{ width: "36px", height: "54px", backgroundColor: "#1F2937", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "18px", height: "18px", backgroundColor: "#FFFFFF", borderRadius: "50%" }}></div>
              </div>
              <span style={{ fontSize: "12px", fontWeight: "bold", color: contraste === "ALTO" ? "#A30D11" : currentTheme.textoSecundario }}>ALTO</span>
            </div>
          </div>
        </div>

        <div style={tarjetaStyle}>
          <div style={filaToggleStyle}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A30D11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
              <span style={{ fontSize: "15px", fontWeight: "600", color: currentTheme.textoPrincipal }}>Notificaciones sonoras</span>
            </div>
            <div style={switchStyle(notifSonoras)} onClick={() => setNotifSonoras(!notifSonoras)}>
              <div style={switchHandleStyle(notifSonoras)}></div>
            </div>
          </div>
        </div>

        <div style={tarjetaStyle}>
          <div style={filaToggleStyle}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A30D11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                <line x1="12" y1="18" x2="12.01" y2="18"></line>
              </svg>
              <span style={{ fontSize: "15px", fontWeight: "600", color: currentTheme.textoPrincipal }}>Feedback háptico</span>
            </div>
            <div style={switchStyle(feedbackHaptico)} onClick={handleToggleHaptico}>
              <div style={switchHandleStyle(feedbackHaptico)}></div>
            </div>
          </div>
        </div>

        <div style={tarjetaStyle}>
          <div style={tituloSeccionStyle}>
            <span style={{ color: "#A30D11", fontSize: "16px", fontWeight: "bold" }}>Tt</span>
            <span>Tamaño de fuente</span>
          </div>

          <input 
            type="range" 
            min="0" 
            max="100" 
            value={tamanoFuente} 
            onChange={(e) => setTamanoFuente(Number(e.target.value))}
            style={sliderStyle} 
          />

          <div style={etiquetasSliderStyle}>
            <span>PEQUEÑO</span>
            <span>MEDIANO</span>
            <span>GRANDE</span>
            <span>MUY GRANDE</span>
          </div>

          <p style={{ fontSize: "12px", color: currentTheme.textoSecundario, margin: "0 0 16px 0", fontStyle: "italic" }}>
            Ajuste el control para previsualizar el tamaño del texto técnico.
          </p>

          <div style={vistaPreviaBoxStyle}>
            <span style={{ fontSize: "10px", fontWeight: "bold", color: "#A30D11", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>
              Vista previa
            </span>
            <p style={{ fontSize: `${13 + (tamanoFuente / 25)}px`, fontWeight: "bold", color: contraste === "ALTO" ? "#FFFFFF" : "#1F2937", margin: "0 0 8px 0", lineHeight: "1.4" }}>
              "La excelencia deportiva no tiene límites, la tecnología debe ser el puente que los elimine."
            </p>
            <p style={{ fontSize: `${11 + (tamanoFuente / 35)}px`, color: contraste === "ALTO" ? "#CCCCCC" : "#4B5563", margin: "0", lineHeight: "1.4" }}>
              El rendimiento adaptativo requiere precisión en cada detalle visual y funcional.
            </p>
          </div>
        </div>

        <button style={botonGuardarStyle} onClick={handleGuardarCambios}>
          GUARDAR CAMBIOS
        </button>

      </div>
    </div>
  );
}