import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../domain/contexts/AuthContext'

const AdminDashboard = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const stats = [
    { label: 'USUARIOS TOTALES', value: '14,284', note: '+12% vs año anterior', color: '#FFFFFF', icon: '👥', iconBg: '#FEE2E2', iconColor: '#991B1B' },
    { label: 'EVENTOS ACTIVOS', value: '42', note: 'En vivo ahora', color: '#FFFFFF', icon: '⚡', iconBg: '#DBEAFE', iconColor: '#1E40AF' },
    { label: 'ALERTAS IA', value: '07', note: 'Alta prioridad', color: '#FFFFFF', icon: '⚠️', iconBg: '#FEEDE4', iconColor: '#9A3412' },
    { label: 'ASISTENCIA PROM.', value: '88.5%', note: '94% eficiencia', color: '#FFFFFF', icon: '📈', iconBg: '#DCFCE7', iconColor: '#166534' },
  ]

  const recentUsers = [
    { id: '#INK-2201', name: 'Elena Rodríguez', email: 'e.rodriguez@inklusport.org', status: 'Activo' },
    { id: '#INK-2188', name: 'Mark Thompson', email: 'm.thompson@inklusport.org', status: 'Bloqueado' },
    { id: '#INK-2195', name: 'Sarah Jenkins', email: 's.jenkins@inklusport.org', status: 'Pendiente' },
    { id: '#INK-2182', name: 'Liam O’Neill', email: 'l.oneill@inklusport.org', status: 'Activo' },
  ]

  const participation = [
    { label: 'DISCAPACIDAD FÍSICA', value: 45, color: '#DC2626' },
    { label: 'DISCAPACIDAD VISUAL', value: 22, color: '#2563EB' },
    { label: 'DISCAPACIDAD INTELECTUAL', value: 18, color: '#D97706' },
    { label: 'DISCAPACIDAD AUDITIVA', value: 15, color: '#7C3AED' },
  ]

  const activities = [
    { 
      type: 'INFORME CRÍTICO · 2M ATRÁS', 
      title: 'Evento activador HU25', 
      detail: 'Umbral de capacidad alcanzado para "National Wheelchair Open". Se activaron la logística de escalado automático.', 
      dotColor: '#DC2626' 
    },
    { 
      type: 'OPTIMIZACIÓN · 45M ATRÁS', 
      title: 'Pronóstico de asistencia', 
      detail: 'La IA predice 92% de asistencia para las sesiones del sábado. Voluntarios notificados.', 
      dotColor: '#0EA5E9' 
    },
    { 
      type: 'AUDITORÍA DEL SISTEMA · 2H ATRÁS', 
      title: 'Verificación de cumplimiento', 
      detail: 'El módulo HU33 aprobó la validación de accesibilidad para todos los eventos activos.', 
      dotColor: '#2563EB' 
    },
    { 
      type: 'ALERTA URGENTE · 4H ATRÁS', 
      title: 'Desconexión de sensor', 
      detail: 'El concentrador de datos biométricos en el Sector HU46 informa señal intermitente.', 
      dotColor: '#DC2626' 
    },
  ]

  return (
    <div style={pageStyles.pageContainer}>
      {/* OVERLAY PARA MÓVIL CUANDO EL SIDEBAR ESTÁ ABIERTO */}
      {sidebarOpen && (
        <div 
          style={pageStyles.sidebarOverlay} 
          onClick={() => setSidebarOpen(false)} 
        />
      )}

      {/* SIDEBAR CON DISEÑO EXACTO Y ANIMACIÓN DE DESPLAZAMIENTO */}
      <aside style={{
        ...pageStyles.sidebar,
        transform: sidebarOpen ? 'translateX(0)' : undefined,
      }}>
        <div>
          <div style={pageStyles.brandSection}>
            <div style={pageStyles.brandIcon}>
              <span style={{ fontSize: '18px' }}>♿</span>
            </div>
            <div>
              <div style={pageStyles.brandTitle}>INKLUSPORT ADMIN</div>
            </div>
          </div>

          <div style={pageStyles.adminProfileCard}>
            <div style={pageStyles.adminAvatar}>
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                alt="Admin" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
              />
            </div>
            <div>
              <div style={pageStyles.adminName}>Admin Central</div>
              <div style={pageStyles.adminRole}>Inklusport Management</div>
            </div>
          </div>
        </div>

        <nav style={pageStyles.sidebarNav}>
          <button style={{ ...pageStyles.sidebarNavItem, ...pageStyles.sidebarNavItemActive }}>
            <span style={{ marginRight: '16px', fontSize: '16px' }}>🔲</span> Dashboard
          </button>
          <button style={pageStyles.sidebarNavItem}>
            <span style={{ marginRight: '16px', fontSize: '16px' }}>👥</span> Users
          </button>
          <button style={pageStyles.sidebarNavItem}>
            <span style={{ marginRight: '16px', fontSize: '16px' }}>📅</span> Events
          </button>
          <button style={pageStyles.sidebarNavItem}>
            <span style={{ marginRight: '16px', fontSize: '16px' }}>🏃</span> Sports
          </button>
          <button style={pageStyles.sidebarNavItem}>
            <span style={{ marginRight: '16px', fontSize: '16px' }}>♿</span> Disabilities
          </button>
          <button style={pageStyles.sidebarNavItem}>
            <span style={{ marginRight: '16px', fontSize: '16px' }}>🛡️</span> Roles
          </button>
          <button style={pageStyles.sidebarNavItem}>
            <span style={{ marginRight: '16px', fontSize: '16px' }}>📊</span> Audit Logs
          </button>
        </nav>
      </aside>

      {/* CONTENT AREA */}
      <div style={pageStyles.contentArea}>
        {/* TOP NAVBAR / HEADER */}
        <div style={pageStyles.topNavbar}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              style={pageStyles.menuToggleBtn} 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Abrir menú"
            >
              ☰
            </button>
            <div style={pageStyles.topNavTitle}>Panel administrativo de Inklusport</div>
          </div>
          <div style={pageStyles.topNavActions}>
            <button style={pageStyles.iconButton}>🔍</button>
            <button style={pageStyles.iconButton}>🔔</button>
            <button style={pageStyles.logoutButton} onClick={handleLogout}>Cerrar sesión</button>
            <div style={pageStyles.topAvatar}>
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                alt="Usuario" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
              />
            </div>
          </div>
        </div>

        {/* HEADER BAR */}
        <header style={pageStyles.headerBar}>
          <div>
            <div style={pageStyles.headerLabel}>Inteligencia administrativa</div>
            <div style={pageStyles.headerSubtitle}>
              Monitoreo de rendimiento en tiempo real y análisis de inclusión para sistemas deportivos adaptativos.<br />
              Supervisión de los módulos HU25, HU33 y HU46.
            </div>
          </div>
          <div style={pageStyles.headerActions}>
            <button style={pageStyles.headerButtonPrimary}>CREAR EVENTO</button>
            <button style={pageStyles.headerButtonSecondary}>GESTIONAR USUARIOS</button>
            <button style={pageStyles.headerButtonSecondary}>GENERAR REPORTE</button>
          </div>
        </header>

        {/* STATS GRID */}
        <section style={pageStyles.statsGrid}>
          {stats.map((item) => (
            <div key={item.label} style={{ ...pageStyles.statCard, backgroundColor: item.color }}>
              <div style={pageStyles.statCardTop}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ ...pageStyles.statIconBox, backgroundColor: item.iconBg, color: item.iconColor }}>
                    {item.icon}
                  </div>
                  <span style={pageStyles.statLabel}>{item.label}</span>
                </div>
                <span style={pageStyles.statNote}>{item.note}</span>
              </div>
              <div style={pageStyles.statValue}>{item.value}</div>
            </div>
          ))}
        </section>

        {/* MAIN GRID */}
        <section style={pageStyles.mainGrid}>
          {/* LEFT COLUMN */}
          <div style={pageStyles.leftColumn}>
            {/* USERS TABLE CARD */}
            <div style={pageStyles.tableCard}>
              <div style={pageStyles.tableHeaderRow}>
                <div style={pageStyles.cardTitle}>Activaciones recientes de usuarios</div>
                <button style={pageStyles.viewAllBtn}>VER TODO</button>
              </div>

              <div style={pageStyles.tableWrapper}>
                <table style={pageStyles.table}>
                  <thead>
                    <tr>
                      <th style={pageStyles.th}>ID</th>
                      <th style={pageStyles.th}>NOMBRE</th>
                      <th style={pageStyles.th}>CORREO</th>
                      <th style={pageStyles.th}>ESTADO</th>
                      <th style={{ ...pageStyles.th, textAlign: 'right' }}>ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((userItem) => (
                      <tr key={userItem.id} style={pageStyles.tr}>
                        <td style={pageStyles.tdId}>{userItem.id}</td>
                        <td style={pageStyles.td}>{userItem.name}</td>
                        <td style={pageStyles.tdEmail}>{userItem.email}</td>
                        <td style={pageStyles.td}>
                          <span style={{
                            ...pageStyles.statusBadge,
                            color: userItem.status === 'Activo' ? '#059669' : userItem.status === 'Pendiente' ? '#D97706' : '#DC2626',
                          }}>
                            <span style={{
                              height: '6px',
                              width: '6px',
                              borderRadius: '50%',
                              backgroundColor: userItem.status === 'Activo' ? '#059669' : userItem.status === 'Pendiente' ? '#D97706' : '#DC2626',
                              display: 'inline-block',
                              marginRight: '6px'
                            }} />
                            {userItem.status}
                          </span>
                        </td>
                        <td style={{ ...pageStyles.td, textAlign: 'right' }}>
                          <button style={pageStyles.tableActionBtn}>⋮</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* EVENT CARDS ROW */}
            <div style={pageStyles.cardRow}>
              <div style={pageStyles.eventCardLarge}>
                <div style={pageStyles.eventImageWrapper}>
                  <img 
                    src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&auto=format&fit=crop&q=80" 
                    alt="Baloncesto en silla de ruedas" 
                    style={pageStyles.eventImg}
                  />
                </div>
                <div style={pageStyles.eventContent}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={pageStyles.badgeBasketball}>BALONCESTO</span>
                    <span style={pageStyles.eventDate}>Oct 24, 2024</span>
                  </div>
                  <div style={pageStyles.eventCardHeader}>Open Nacional en Silla de Ruedas</div>
                  <p style={pageStyles.eventCardText}>Fase final de coordinación para equipos de campeonato regional.</p>
                  <div style={pageStyles.eventCardFooterRow}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={pageStyles.avatarGroupItem}>👤</div>
                      <div style={{ ...pageStyles.avatarGroupItem, marginLeft: '-8px' }}>👤</div>
                      <span style={{ fontSize: '11px', color: '#6B7280', marginLeft: '6px', fontWeight: '600' }}>+24</span>
                    </div>
                    <button style={pageStyles.eventManageBtn}>GESTIONAR</button>
                  </div>
                </div>
              </div>

              <div style={pageStyles.eventCardLarge}>
                <div style={pageStyles.eventImageWrapper}>
                  <img 
                    src="https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600&auto=format&fit=crop&q=80" 
                    alt="Natación adaptativa" 
                    style={pageStyles.eventImg}
                  />
                </div>
                <div style={pageStyles.eventContent}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={pageStyles.badgeSwimming}>NATACIÓN</span>
                    <span style={pageStyles.eventDate}>Nov 02, 2024</span>
                  </div>
                  <div style={pageStyles.eventCardHeader}>Finales Acuáticas Adaptativas</div>
                  <p style={pageStyles.eventCardText}>Clasificación regional para los próximos paralímpicos internacionales.</p>
                  <div style={pageStyles.eventCardFooterRow}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={pageStyles.avatarGroupItem}>👤</div>
                      <div style={{ ...pageStyles.avatarGroupItem, marginLeft: '-8px' }}>👤</div>
                      <span style={{ fontSize: '11px', color: '#6B7280', marginLeft: '6px', fontWeight: '600' }}>+18</span>
                    </div>
                    <button style={pageStyles.eventManageBtn}>GESTIONAR</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <aside style={pageStyles.rightColumn}>
            {/* DISABILITY PARTICIPATION CARD */}
            <div style={pageStyles.participationCard}>
              <div style={pageStyles.cardTitle}>Participación por discapacidad</div>
              <div style={pageStyles.participationList}>
                {participation.map((item) => (
                  <div key={item.label} style={pageStyles.participationRow}>
                    <div style={pageStyles.participationLabelRow}>
                      <span style={pageStyles.participationLabelText}>{item.label}</span>
                      <span style={pageStyles.participationValueText}>{item.value}%</span>
                    </div>
                    <div style={pageStyles.participationBar}>
                      <div style={{ ...pageStyles.participationFill, width: `${item.value}%`, backgroundColor: item.color }} />
                    </div>
                  </div>
                ))}
              </div>
              <div style={pageStyles.participationFooter}>
                ℹ️ Cumplimiento verificado de los estándares HU33 y HU46 a las 09:00 UTC.
              </div>
            </div>

            {/* AI ACTIVITY STREAM */}
            <div style={pageStyles.activityStreamCard}>
              <div style={pageStyles.cardTitle}>Flujo de actividad de IA</div>
              <div style={pageStyles.activityList}>
                {activities.map((activity, idx) => (
                  <div key={idx} style={pageStyles.activityItem}>
                    <div style={{ ...pageStyles.activityDot, backgroundColor: activity.dotColor }} />
                    <div style={{ flex: 1 }}>
                      <div style={pageStyles.activityType}>{activity.type}</div>
                      <div style={pageStyles.activityTitle}>{activity.title}</div>
                      <div style={pageStyles.activityDetail}>{activity.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button style={pageStyles.expandBtn}>AMPLIAR TODO</button>
            </div>
          </aside>
        </section>
      </div>
    </div>
  )
}

const pageStyles = {
  pageContainer: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#F3F4F6',
    color: '#111827',
    fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    position: 'relative',
    overflowX: 'hidden',
  },
  sidebar: {
    width: '260px',
    backgroundColor: '#FFFFFF',
    borderRight: '1px solid #E5E7EB',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 20px',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 0,
    height: '100vh',
    boxSizing: 'border-box',
    zIndex: 100,
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  sidebarOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 90,
    display: 'none',
  },
  brandSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '24px',
  },
  brandIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '12px',
    backgroundColor: '#DC2626',
    color: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '850',
    boxShadow: '0 4px 12px rgba(220, 38, 38, 0.25)',
  },
  brandTitle: {
    fontSize: '12px',
    fontWeight: '800',
    letterSpacing: '0.8px',
    color: '#DC2626',
  },
  adminProfileCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    backgroundColor: '#F9FAFB',
    borderRadius: '12px',
    marginBottom: '24px',
    border: '1px solid #F3F4F6',
  },
  adminAvatar: {
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    backgroundColor: '#E5E7EB',
    flexShrink: 0,
  },
  adminName: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#111827',
  },
  adminRole: {
    fontSize: '11px',
    color: '#6B7280',
  },
  sidebarNav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    flex: 1,
    overflowY: 'auto',
  },
  sidebarNavItem: {
    border: 'none',
    background: 'transparent',
    color: '#4B5563',
    textAlign: 'left',
    padding: '12px 14px',
    borderRadius: '10px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.2s ease',
  },
  sidebarNavItemActive: {
    backgroundColor: '#DC2626',
    color: '#FFFFFF',
    fontWeight: '700',
    boxShadow: '0 4px 12px rgba(220, 38, 38, 0.25)',
  },
  menuToggleBtn: {
    display: 'none',
    background: '#FFFFFF',
    border: '1px solid #E5E7EB',
    borderRadius: '8px',
    width: '36px',
    height: '36px',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '16px',
    color: '#111827',
  },
  contentArea: {
    flex: 1,
    padding: '24px 32px',
    overflowY: 'auto',
    minWidth: 0,
  },
  topNavbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    paddingBottom: '16px',
    borderBottom: '1px solid #E5E7EB',
  },
  topNavTitle: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#DC2626',
  },
  topNavActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  iconButton: {
    background: '#FFFFFF',
    border: '1px solid #E5E7EB',
    borderRadius: '50%',
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '14px',
  },
  logoutButton: {
    background: 'transparent',
    border: '1px solid #DC2626',
    color: '#DC2626',
    borderRadius: '999px',
    padding: '10px 16px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease, color 0.2s ease',
  },
  topAvatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#E5E7EB',
  },
  headerBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '24px',
    marginBottom: '24px',
  },
  headerLabel: {
    fontSize: '26px',
    fontWeight: '800',
    color: '#111827',
  },
  headerSubtitle: {
    marginTop: '6px',
    color: '#6B7280',
    fontSize: '13px',
    lineHeight: '1.5',
  },
  headerActions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },
  headerButtonPrimary: {
    backgroundColor: '#DC2626',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 16px',
    fontWeight: '700',
    fontSize: '12px',
    cursor: 'pointer',
  },
  headerButtonSecondary: {
    backgroundColor: '#FFFFFF',
    color: '#111827',
    border: '1px solid #E5E7EB',
    borderRadius: '8px',
    padding: '10px 16px',
    fontWeight: '700',
    fontSize: '12px',
    cursor: 'pointer',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    gap: '16px',
    marginBottom: '24px',
  },
  statCard: {
    padding: '20px',
    borderRadius: '16px',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E5E7EB',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  statCardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  statIconBox: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
  },
  statLabel: {
    fontSize: '11px',
    fontWeight: '800',
    letterSpacing: '0.05em',
    color: '#6B7280',
  },
  statNote: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#059669',
  },
  statValue: {
    fontSize: '28px',
    fontWeight: '800',
    color: '#111827',
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '24px',
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  tableCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    padding: '20px',
    border: '1px solid #E5E7EB',
  },
  tableHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  cardTitle: {
    fontSize: '15px',
    fontWeight: '800',
    color: '#111827',
  },
  viewAllBtn: {
    border: 'none',
    background: 'transparent',
    color: '#DC2626',
    fontWeight: '700',
    fontSize: '12px',
    cursor: 'pointer',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    fontSize: '10px',
    fontWeight: '800',
    color: '#9CA3AF',
    paddingBottom: '12px',
    letterSpacing: '0.05em',
    borderBottom: '1px solid #F3F4F6',
  },
  tr: {
    borderBottom: '1px solid #F3F4F6',
  },
  tdId: {
    padding: '12px 0',
    fontSize: '12px',
    fontWeight: '700',
    color: '#4B5563',
  },
  td: {
    padding: '12px 0',
    fontSize: '13px',
    fontWeight: '600',
    color: '#111827',
  },
  tdEmail: {
    padding: '12px 0',
    fontSize: '13px',
    color: '#6B7280',
  },
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: '12px',
    fontWeight: '700',
  },
  tableActionBtn: {
    border: 'none',
    backgroundColor: 'transparent',
    color: '#9CA3AF',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '800',
  },
  cardRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  eventCardLarge: {
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    border: '1px solid #E5E7EB',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  eventImageWrapper: {
    height: '130px',
    width: '100%',
    backgroundColor: '#E5E7EB',
  },
  eventImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  eventContent: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
  },
  badgeBasketball: {
    backgroundColor: '#FEF2F2',
    color: '#DC2626',
    fontSize: '9px',
    fontWeight: '800',
    padding: '3px 8px',
    borderRadius: '4px',
  },
  badgeSwimming: {
    backgroundColor: '#EFF6FF',
    color: '#2563EB',
    fontSize: '9px',
    fontWeight: '800',
    padding: '3px 8px',
    borderRadius: '4px',
  },
  eventDate: {
    fontSize: '11px',
    color: '#6B7280',
    fontWeight: '600',
  },
  eventCardHeader: {
    fontSize: '15px',
    fontWeight: '800',
    color: '#111827',
    marginBottom: '6px',
  },
  eventCardText: {
    color: '#6B7280',
    fontSize: '12px',
    lineHeight: '1.4',
    marginBottom: '16px',
  },
  eventCardFooterRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  avatarGroupItem: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: '#E5E7EB',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    border: '2px solid #FFFFFF',
  },
  eventManageBtn: {
    border: 'none',
    backgroundColor: '#DC2626',
    color: '#ffffff',
    padding: '6px 14px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '11px',
  },
  participationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    padding: '20px',
    border: '1px solid #E5E7EB',
  },
  participationList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    marginTop: '16px',
  },
  participationRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  participationLabelRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  participationLabelText: {
    color: '#374151',
    fontWeight: '800',
    fontSize: '10px',
    letterSpacing: '0.05em',
  },
  participationValueText: {
    color: '#111827',
    fontWeight: '800',
    fontSize: '11px',
  },
  participationBar: {
    width: '100%',
    height: '8px',
    backgroundColor: '#F3F4F6',
    borderRadius: '999px',
    overflow: 'hidden',
  },
  participationFill: {
    height: '100%',
    borderRadius: '999px',
  },
  participationFooter: {
    marginTop: '16px',
    fontSize: '11px',
    color: '#6B7280',
    lineHeight: '1.4',
  },
  activityStreamCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    padding: '20px',
    border: '1px solid #E5E7EB',
  },
  activityList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    marginTop: '16px',
  },
  activityItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    paddingBottom: '12px',
    borderBottom: '1px solid #F3F4F6',
  },
  activityDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    marginTop: '5px',
  },
  activityType: {
    fontSize: '10px',
    fontWeight: '800',
    color: '#9CA3AF',
    letterSpacing: '0.05em',
    marginBottom: '2px',
  },
  activityTitle: {
    fontWeight: '800',
    fontSize: '13px',
    color: '#111827',
  },
  activityDetail: {
    marginTop: '2px',
    color: '#6B7280',
    fontSize: '11px',
    lineHeight: '1.4',
  },
  expandBtn: {
    width: '100%',
    marginTop: '16px',
    backgroundColor: '#F3F4F6',
    color: '#111827',
    border: 'none',
    padding: '10px',
    borderRadius: '8px',
    fontWeight: '700',
    fontSize: '11px',
    cursor: 'pointer',
  },
}

export default AdminDashboard