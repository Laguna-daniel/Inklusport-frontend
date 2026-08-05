import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// --- 1. COMPONENTE HEADER / NAVBAR ---
const HeaderNav = () => {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/home') // Redirige a home.jsx
  }

  return (
    <header className="header-nav">
      <style>{`
        .header-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 24px;
          background-color: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          height: 60px;
          box-sizing: border-box;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .menu-icon {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 20px;
          color: #64748b;
          display: flex;
          align-items: center;
        }

        .back-home-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0f172a;
          transition: transform 0.2s ease;
        }

        .back-home-btn:hover {
          transform: translateX(-3px);
        }

        .header-logo {
          font-size: 20px;
          font-weight: 900;
          color: #d32f2f;
          letter-spacing: -0.02em;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .header-icon-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #64748b;
          padding: 6px;
        }

        .header-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: #2563eb;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 14px;
        }
      `}</style>

      <div className="header-left">
        <button className="menu-icon" aria-label="Menu">&#9776;</button>

        {/* Botón de retroceso al lado del logo */}
        <button 
          className="back-home-btn" 
          onClick={handleGoHome}
          title="Volver a Home"
          type="button"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>

        <span className="header-logo">INKLUSPORT</span>
      </div>

      <div className="header-right">
        <button className="header-icon-btn" aria-label="Buscar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
        <div className="header-avatar">U</div>
      </div>
    </header>
  )
}

// --- 2. COMPONENTE SIDEBAR ---
const Sidebar = () => {
  return (
    <aside className="sidebar">
      <style>{`
        .sidebar {
          width: 220px;
          background-color: #f8fafc;
          padding: 24px 16px;
          display: flex;
          flex-direction: column;
          gap: 24px;
          border-right: 1px solid #e2e8f0;
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-bottom: 12px;
        }

        .user-avatar {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background-color: #a7f3d0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .user-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .user-info {
          display: flex;
          flex-direction: column;
        }

        .user-name {
          font-size: 14px;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }

        .user-role {
          font-size: 11px;
          color: #64748b;
          margin: 0;
        }

        .nav-menu {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          color: #475569;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .nav-item:hover {
          background-color: #f1f5f9;
          color: #0f172a;
        }

        .nav-item.active {
          background-color: #e11d48;
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(225, 29, 72, 0.3);
        }

        .nav-icon {
          width: 18px;
          height: 18px;
        }
      `}</style>

      <div className="user-profile">
        <div className="user-avatar">
          <img src="https://api.dicebear.com/7.x/bottts/svg?seed=UserName" alt="User" />
        </div>
        <div className="user-info">
          <h4 className="user-name">User Name</h4>
          <p className="user-role">Adaptive Athlete</p>
        </div>
      </div>

      <nav className="nav-menu">
        <a href="#home" className="nav-item">
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
          Home
        </a>
        <a href="#events" className="nav-item">
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          Events
        </a>
        <a href="#calendar" className="nav-item active">
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          Calendar
        </a>
        <a href="#profile" className="nav-item">
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          Profile
        </a>
        <a href="#accessibility" className="nav-item">
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v8"></path><path d="M8 12h8"></path></svg>
          Accessibility
        </a>
        <a href="#ai" className="nav-item">
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 1 0 10 10H12V2z"></path></svg>
          AI Assistant
        </a>
      </nav>
    </aside>
  )
}

// --- 3. COMPONENTE CALENDARIO (LÓGICA DE FECHAS) ---
const CalendarSection = () => {
  const [currentDate, setCurrentDate] = useState(new Date())

  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]

  const daysOfWeek = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB']
  const eventDays = [9, 10, 22] // Días con marcas de eventos

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay()

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)
  const prevMonthDays = getDaysInMonth(year, month - 1)

  const calendarCells = []

  // Días de relleno del mes anterior
  for (let i = firstDay - 1; i >= 0; i--) {
    calendarCells.push({
      day: prevMonthDays - i,
      isCurrentMonth: false
    })
  }

  // Días del mes actual
  for (let i = 1; i <= daysInMonth; i++) {
    calendarCells.push({
      day: i,
      isCurrentMonth: true,
      hasEvent: eventDays.includes(i),
      isSelected: i === 10
    })
  }

  return (
    <section className="calendar-card">
      <style>{`
        .calendar-card {
          background-color: #ffffff;
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
        }

        .calendar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .month-title-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .month-title {
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }

        .month-nav-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 14px;
          color: #64748b;
          padding: 4px 8px;
        }

        .view-toggle {
          display: flex;
          background-color: #f1f5f9;
          padding: 3px;
          border-radius: 20px;
        }

        .toggle-btn {
          border: none;
          background: none;
          padding: 6px 14px;
          font-size: 11px;
          font-weight: 700;
          border-radius: 16px;
          cursor: pointer;
          color: #64748b;
        }

        .toggle-btn.active {
          background-color: #e2e8f0;
          color: #0f172a;
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          text-align: center;
          row-gap: 16px;
        }

        .day-label {
          font-size: 11px;
          font-weight: 700;
          color: #94a3b8;
          text-transform: uppercase;
        }

        .day-cell {
          height: 44px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 600;
          color: #334155;
          position: relative;
          cursor: pointer;
          border-radius: 12px;
        }

        .day-cell.other-month {
          color: #cbd5e1;
        }

        .day-cell.selected {
          background-color: #fff1f2;
          border: 1px solid #fecdd3;
          color: #A30D11;
          font-weight: 800;
        }

        .event-dot {
          width: 5px;
          height: 5px;
          background-color: #A30D11;
          border-radius: 50%;
          position: absolute;
          bottom: 6px;
        }
      `}</style>

      <div className="calendar-header">
        <div className="month-title-wrap">
          <h2 className="month-title">{months[month]} {year}</h2>
          <button className="month-nav-btn" onClick={prevMonth}>&lt;</button>
          <button className="month-nav-btn" onClick={nextMonth}>&gt;</button>
        </div>

        <div className="view-toggle">
          <button className="toggle-btn active">MES</button>
          <button className="toggle-btn">SEMANA</button>
        </div>
      </div>

      <div className="calendar-grid">
        {daysOfWeek.map((day, idx) => (
          <div key={idx} className="day-label">{day}</div>
        ))}

        {calendarCells.map((cell, idx) => (
          <div
            key={idx}
            className={`day-cell ${!cell.isCurrentMonth ? 'other-month' : ''} ${cell.isSelected ? 'selected' : ''}`}
          >
            {cell.day}
            {cell.hasEvent && <span className="event-dot"></span>}
          </div>
        ))}
      </div>
    </section>
  )
}

// --- 4. COMPONENTE DETALLES DE EVENTOS Y ASISTENTE IA ---
const EventDetailsSection = () => {
  return (
    <aside className="event-details-column">
      <style>{`
        .event-details-column {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .events-card {
          background-color: #f1f3f5;
          border-radius: 20px;
          padding: 20px;
        }

        .events-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .event-date-title {
          font-size: 16px;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
        }

        .event-count {
          font-size: 12px;
          color: #64748b;
          margin: 2px 0 0 0;
        }

        .calendar-badge {
          width: 32px;
          height: 32px;
          background-color: #A30D11;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .event-item {
          background-color: #ffffff;
          border-radius: 14px;
          padding: 16px;
          margin-bottom: 12px;
          border-left: 4px solid #A30D11;
          box-shadow: 0 2px 8px rgba(0,0,0,0.02);
        }

        .event-item.blue {
          border-left-color: #2563eb;
        }

        .event-item-title {
          font-size: 14px;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 10px 0;
        }

        .event-meta {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: #64748b;
          margin-bottom: 6px;
        }

        .event-meta-spots {
          color: #0d9488;
          font-weight: 700;
        }

        .event-action-btn {
          width: 100%;
          background-color: #A30D11;
          color: white;
          border: none;
          padding: 10px;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.05em;
          cursor: pointer;
          margin-top: 8px;
        }

        .event-outline-btn {
          width: 100%;
          background: transparent;
          color: #A30D11;
          border: 1px solid #A30D11;
          padding: 8px;
          border-radius: 8px;
          font-size: 10px;
          font-weight: 800;
          cursor: pointer;
          margin-top: 6px;
        }

        .ai-assistant-card {
          background-color: #004d5a;
          color: white;
          border-radius: 16px;
          padding: 16px;
          position: relative;
        }

        .ai-header {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.05em;
          margin-bottom: 8px;
          color: #38bdf8;
        }

        .ai-text {
          font-size: 12px;
          line-height: 1.4;
          margin: 0 0 12px 0;
          opacity: 0.9;
        }

        .ai-link {
          font-size: 11px;
          font-weight: 800;
          color: #38bdf8;
          text-decoration: none;
          letter-spacing: 0.05em;
        }
      `}</style>

      {/* Tarjeta de Eventos */}
      <div className="events-card">
        <div className="events-card-header">
          <div>
            <h3 className="event-date-title">10 de Octubre</h3>
            <p className="event-count">2 Eventos programados</p>
          </div>
          <div className="calendar-badge">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          </div>
        </div>

        {/* Evento 1 */}
        <div className="event-item">
          <h4 className="event-item-title">Maratón Inclusiva Santiago</h4>
          <div className="event-meta">
            <span>&#128336;</span> 08:30 AM - 12:00 PM
          </div>
          <div className="event-meta">
            <span>&#128205;</span> Parque O'Higgins, RM
          </div>
          <div className="event-meta event-meta-spots">
            <span>&#128101;</span> 12 cupos disponibles
          </div>
          <button className="event-action-btn">INSCRIBIRSE</button>
        </div>

        {/* Evento 2 */}
        <div className="event-item blue">
          <h4 className="event-item-title">Taller de Natación Adaptada</h4>
          <div className="event-meta">
            <span>&#128336;</span> 16:00 PM - 18:00 PM
          </div>
          <div className="event-meta">
            <span>&#128205;</span> Centro Acuático Estadio Nacional
          </div>
          <div className="event-meta" style={{ color: '#A30D11', fontWeight: 700 }}>
            <span>&#128101;</span> ¡Últimos 3 cupos!
          </div>
          <button className="event-action-btn">LLENAR ASISTENCIA</button>
          <button className="event-outline-btn">SALIRSE DEL EVENTO</button>
        </div>
      </div>

      {/* Banner Asistente IA */}
      <div className="ai-assistant-card">
        <div className="ai-header">
          <span>&#10024;</span> ASISTENTE AI
        </div>
        <p className="ai-text">
          "Veo que tienes espacio el día 12. Se ha añadido un entrenamiento de recuperación ligera a tu calendario."
        </p>
        <a href="#detalles" className="ai-link">VER DETALLES</a>
      </div>
    </aside>
  )
}

// --- 5. COMPONENTE PRINCIPAL (DASHBOARD) ---
const Dashboard = () => {
  return (
    <div className="dashboard-layout">
      <style>{`
        .dashboard-layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: #f6f7f9;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          color: #1e293b;
        }

        .dashboard-container {
          display: flex;
          flex: 1;
        }

        .dashboard-content {
          flex: 1;
          padding: 32px 40px;
          overflow-y: auto;
        }

        .dashboard-header-title {
          margin-bottom: 24px;
        }

        .dashboard-subtitle {
          color: #A30D11;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin: 0 0 6px 0;
        }

        .dashboard-main-title {
          font-size: 32px;
          font-weight: 900;
          margin: 0;
          color: #0f172a;
        }

        .dashboard-main-title span {
          color: #A30D11;
          font-style: italic;
        }

        .dashboard-underline {
          width: 60px;
          height: 4px;
          background-color: #A30D11;
          margin-top: 8px;
          border-radius: 2px;
        }

        .dashboard-header-title,
        .calendar-card,
        .events-card,
        .ai-assistant-card {
          opacity: 0;
          transform: translateY(18px);
          animation: fadeInUp 0.42s ease forwards;
        }

        .events-card {
          animation-delay: 0.08s;
        }

        .ai-assistant-card {
          animation-delay: 0.16s;
        }

        .event-item {
          transition: transform 0.24s ease, box-shadow 0.24s ease;
        }

        .event-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 24px;
          align-items: start;
        }

        @media (max-width: 1024px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Header Superior */}
      <HeaderNav />

      <div className="dashboard-container">
        {/* Sidebar */}
        <Sidebar />

        {/* Área Principal de Contenido */}
        <main className="dashboard-content">
          <div className="dashboard-header-title">
            <p className="dashboard-subtitle">PLANIFICACIÓN</p>
            <h1 className="dashboard-main-title">
              Tu Próximo <span>Desafío</span>
            </h1>
            <div className="dashboard-underline"></div>
          </div>

          <div className="dashboard-grid">
            <CalendarSection />
            <EventDetailsSection />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard