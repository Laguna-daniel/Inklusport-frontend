
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../domain/contexts/AuthContext';
import { useAccessibility } from '../../domain/contexts/AccessibilityContext.jsx';

const Home = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { contraste } = useAccessibility();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('Calendar');
  const scrollContainerRef = useRef(null);
  const homeRef = useRef(null);
  const eventsRef = useRef(null);
  const calendarRef = useRef(null);
  const aiRef = useRef(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  
  const scrollToSection = (name) => {
    const map = {
      'Home': homeRef,
      'Events': eventsRef,
      'Calendar': calendarRef,
      'AI Assistant': aiRef,
    };

    const targetRef = map[name];
    if (targetRef && targetRef.current && scrollContainerRef.current) {
      const scrollContainer = scrollContainerRef.current;
      const containerTop = scrollContainer.getBoundingClientRect().top;
      const targetTop = targetRef.current.getBoundingClientRect().top;
      const offset = targetTop - containerTop + scrollContainer.scrollTop - 110;
      scrollContainer.scrollTo({ top: offset, behavior: 'smooth' });
      setActiveMenu(name);
      return;
    }

    // Fallbacks: navigate to routes when the section is not present on this page
    if (name === 'Profile') {
      navigate('/profile');
      setActiveMenu(name);
      return;
    }
    if (name === 'Accessibility') {
      navigate('/accessibility');
      setActiveMenu(name);
      return;
    }

    if (name === 'Home') {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      setActiveMenu('Home');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const refs = [
        { name: 'Home', ref: homeRef },
        { name: 'Events', ref: eventsRef },
        { name: 'Calendar', ref: calendarRef },
        { name: 'AI Assistant', ref: aiRef },
      ];
      const fromTop = 120; // offset to account for header
      for (const r of refs) {
        if (r.ref && r.ref.current) {
          const rect = r.ref.current.getBoundingClientRect();
          if (rect.top <= fromTop && rect.bottom > fromTop) {
            if (activeMenu !== r.name) setActiveMenu(r.name);
            return;
          }
        }
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [activeMenu]);

  const usuarioActivo = {
    nombre: user?.fullName || 'Usuario',
    rol: user?.disabilityType ? `Deportista adaptado • ${user.disabilityType}` : 'Adaptive Athlete',
  };

  const handleLogout = () => {
    logout()
    navigate('/login');
  };

  return (
    <div style={homeStyles.homeContainer}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');
      `}</style>

      {/* HEADER SUPERIOR */}
      <header style={homeStyles.topNav}>
        <div style={homeStyles.navLeft}>
          <button style={homeStyles.hamburgerBtn} onClick={() => setSidebarOpen(true)}>
            <span style={homeStyles.hamburgerLine}></span>
            <span style={homeStyles.hamburgerLine}></span>
            <span style={homeStyles.hamburgerLine}></span>
          </button>
          <a href="#" style={homeStyles.brandLogo} onClick={(e) => e.preventDefault()}>INKLUSPORT</a>
        </div>
        <div style={homeStyles.navRight}>
          <div style={homeStyles.userInfoText}>
            <span style={homeStyles.userRoleLabel}>ADAPTIVE ATHLETE</span>
            <div style={homeStyles.userNameText}>{usuarioActivo.nombre}</div>
          </div>
          <div style={homeStyles.userAvatarBtn} onClick={handleLogout} title="">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E11D48" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
        </div>
      </header>

      {/* MENÚ LATERAL DESLIZABLE */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              style={homeStyles.sidebarBackdrop}
            />

            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={homeStyles.sidebarPanel}
            >
              <button 
                style={homeStyles.closeSidebarBtn} 
                onClick={() => setSidebarOpen(false)}
                title="Cerrar menú"
              >
                ✕
              </button>

              <div style={homeStyles.sidebarProfileSection}>
                <div style={homeStyles.sidebarAvatarBox}>
                  <svg width="54" height="54" viewBox="0 0 24 24" fill="#0D9488">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <h3 style={homeStyles.sidebarUserName}>{usuarioActivo.nombre}</h3>
                <p style={homeStyles.sidebarUserRole}>{usuarioActivo.rol}</p>
              </div>

              <div style={homeStyles.sidebarNavList}>
                <div 
                  style={{
                    ...homeStyles.sidebarNavItem, 
                    ...(activeMenu === 'Home' ? homeStyles.sidebarNavItemActive : {})
                  }}
                  onClick={() => { setSidebarOpen(false); scrollToSection('Home'); }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                  <span>Home</span>
                </div>

                <div 
                  style={{
                    ...homeStyles.sidebarNavItem, 
                    ...(activeMenu === 'Events' ? homeStyles.sidebarNavItemActive : {})
                  }}
                  onClick={() => { setSidebarOpen(false); scrollToSection('Events'); }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <span>Events</span>
                </div>

                <div 
                  style={{
                    ...homeStyles.sidebarNavItem, 
                    ...(activeMenu === 'Calendar' ? homeStyles.sidebarNavItemActive : {})
                  }}
                  onClick={() => { setSidebarOpen(false); scrollToSection('Calendar'); }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <span>Calendar</span>
                </div>

                <div 
                  style={{
                    ...homeStyles.sidebarNavItem, 
                    ...(activeMenu === 'Profile' ? homeStyles.sidebarNavItemActive : {})
                  }}
                  onClick={() => { setSidebarOpen(false); scrollToSection('Profile'); }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  <span>Profile</span>
                </div>

                <div 
                  style={{
                    ...homeStyles.sidebarNavItem, 
                    ...(activeMenu === 'Accessibility' ? homeStyles.sidebarNavItemActive : {})
                  }}
                  onClick={() => { setSidebarOpen(false); scrollToSection('Accessibility'); }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="4" r="2"/>
                    <path d="M12 6v6m0 0v6m-4-8h8"/>
                  </svg>
                  <span>Accessibility</span>
                </div>

                <div 
                  style={{
                    ...homeStyles.sidebarNavItem, 
                    ...(activeMenu === 'AI Assistant' ? homeStyles.sidebarNavItemActive : {})
                  }}
                  onClick={() => { setSidebarOpen(false); scrollToSection('AI Assistant'); }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="10" rx="2"/>
                    <circle cx="12" cy="5" r="2"/>
                    <path d="M12 7v4"/>
                  </svg>
                  <span>AI Assistant</span>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* CONTENIDO DE LA VISTA */}
      <main ref={scrollContainerRef} style={homeStyles.dashboardContent}>
        <div style={homeStyles.welcomeBanner}>
          <div style={homeStyles.welcomeTitleGroup}>
            <h1 style={homeStyles.welcomeH1}>Ready to <span style={{ color: '#A30D11' }}>Push</span> Your Limits?</h1>
            <p style={homeStyles.welcomeP}>Your personalized AI insights are ready. You've maintained a 12-day streak. Keep the momentum going!</p>
          </div>
          <button style={homeStyles.notificationsBtn} onClick={() => navigate('/notifications')}>
            NOTIFICATIONS
          </button>
        </div>

        <div style={homeStyles.statsTopGrid}>
          <div style={homeStyles.statBox}>
            <div style={homeStyles.statBoxHeader}>
              <span style={homeStyles.statBoxTitle}>NEXT EVENT</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A30D11" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <div>
              <div style={{ fontFamily: 'Oswald', fontSize: '18px', fontWeight: '600', color: '#0F172A', lineHeight: '1.2' }}>Maratón Adaptada CDMX</div>
              <div style={homeStyles.statBoxSubtextStyle}>24 Oct, 2023</div>
            </div>
          </div>

          <div style={homeStyles.statBox}>
            <div style={homeStyles.statBoxHeader}>
              <span style={homeStyles.statBoxTitle}>MY ACTIVITIES</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
              </svg>
            </div>
            <div>
              <div style={homeStyles.statBoxValueLarge}>08</div>
              <div style={homeStyles.statBoxSubtext}>Confirmed sports</div>
            </div>
          </div>

          <div style={homeStyles.statBox}>
            <div style={homeStyles.statBoxHeader}>
              <span style={homeStyles.statBoxTitle}>AI INJURY RISK</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div>
              <div style={homeStyles.riskBadgeLow}>Low</div>
              <div style={homeStyles.riskProgressBar}><div style={homeStyles.riskProgressFill}></div></div>
              <div style={{ fontSize: '11px', marginTop: '6px', color: '#475569' }}>Optimal recovery detected</div>
            </div>
          </div>

          <div style={homeStyles.statBox}>
            <div style={homeStyles.statBoxHeader}>
              <span style={homeStyles.statBoxTitle}>STREAK</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A30D11" strokeWidth="2">
                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.5 4 6.5 2 2 3 3.5 3 5.5a6 6 0 1 1-12 0c0-1.03.23-2 .63-2.87Z"/>
              </svg>
            </div>
            <div>
              <div style={homeStyles.statBoxValueLarge}>12 <span style={{ fontSize: '14px', fontWeight: '500', color: '#64748B' }}>Days</span></div>
              <div style={homeStyles.statBoxSubtext}>Keep it up!</div>
            </div>
          </div>
        </div>

        <div style={homeStyles.mainGridLayout}>
          <div ref={eventsRef} style={homeStyles.eventsSection}>
            <div style={homeStyles.sectionHeaderRow}>
              <h3 style={homeStyles.sectionTitle}>Eventos Recomendados para ti</h3>
              <span style={homeStyles.seeAllLink} onClick={() => alert('Ver todos los eventos')}>SEE ALL</span>
            </div>

            <div style={homeStyles.eventCard}>
              <div style={{ ...homeStyles.eventImageContainer, backgroundImage: 'url("https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600&auto=format&fit=crop")' }}>
                <span style={homeStyles.eventTagPill}>PARA-SPORT</span>
              </div>
              <div style={homeStyles.eventCardBody}>
                <div>
                  <h4 style={homeStyles.eventCardTitle}>Clínica de Baloncesto en Silla</h4>
                  <div style={homeStyles.eventMetaList}>
                    <div style={homeStyles.eventMetaItem}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                      <span>15 Nov, 2023</span>
                    </div>
                    <div style={homeStyles.eventMetaItem}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                      </svg>
                      <span>10:00 AM</span>
                    </div>
                    <div style={homeStyles.eventMetaItem}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      <span>Gimnasio Central</span>
                    </div>
                  </div>
                </div>
                <div style={homeStyles.eventCardFooter}>
                  <span style={homeStyles.spotsAvailable}>12 cupos disponibles</span>
                  <button style={homeStyles.registerEventBtn} onClick={() => alert('¡Inscripción simulada con éxito!')}>INSCRIBIRSE</button>
                </div>
              </div>
            </div>

            <div style={homeStyles.eventCard}>
              <div style={{ ...homeStyles.eventImageContainer, backgroundImage: 'url("https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop")' }}>
                <span style={homeStyles.eventTagPill}>WELLNESS</span>
              </div>
              <div style={homeStyles.eventCardBody}>
                <div>
                  <h4 style={homeStyles.eventCardTitle}>Yoga Adaptativo y Mindfulness</h4>
                  <div style={homeStyles.eventMetaList}>
                    <div style={homeStyles.eventMetaItem}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                      <span>18 Nov, 2023</span>
                    </div>
                    <div style={homeStyles.eventMetaItem}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                      </svg>
                      <span>08:30 AM</span>
                    </div>
                    <div style={homeStyles.eventMetaItem}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      <span>Sala de Meditación</span>
                    </div>
                  </div>
                </div>
                <div style={homeStyles.eventCardFooter}>
                  <span style={homeStyles.spotsAvailable}>5 cupos disponibles</span>
                  <button style={homeStyles.registerEventBtn} onClick={() => alert('¡Inscripción simulada con éxito!')}>INSCRIBIRSE</button>
                </div>
              </div>
            </div>
          </div>

          <div style={homeStyles.rightSidebarColumn}>
            <div ref={calendarRef} style={homeStyles.widgetCard}>
              <div style={homeStyles.calendarHeaderRow}>
                <span style={homeStyles.calendarTitle}>Mi Calendario</span>
                <div style={homeStyles.calendarNavArrows}>
                  <span>&lt;</span>
                  <span>&gt;</span>
                </div>
              </div>
              <div style={homeStyles.calendarMonthLabel}>Octubre 2023</div>
              <div style={homeStyles.calendarGrid}>
                <div style={homeStyles.calDayHeader}>S</div>
                <div style={homeStyles.calDayHeader}>M</div>
                <div style={homeStyles.calDayHeader}>T</div>
                <div style={homeStyles.calDayHeader}>W</div>
                <div style={homeStyles.calDayHeader}>T</div>
                <div style={homeStyles.calDayHeader}>F</div>
                <div style={homeStyles.calDayHeader}>S</div>

                <div style={{ ...homeStyles.calCell, color: '#CBD5E1' }}>24</div>
                <div style={{ ...homeStyles.calCell, color: '#CBD5E1' }}>25</div>
                <div style={{ ...homeStyles.calCell, color: '#CBD5E1' }}>26</div>
                <div style={{ ...homeStyles.calCell, color: '#CBD5E1' }}>27</div>
                <div style={{ ...homeStyles.calCell, color: '#CBD5E1' }}>28</div>
                <div style={{ ...homeStyles.calCell, color: '#CBD5E1' }}>29</div>
                <div style={homeStyles.calCell}>1</div>

                <div style={homeStyles.calCell}>2</div>
                <div style={homeStyles.calCell}>3</div>
                <div style={homeStyles.calCell}>4</div>
                <div style={homeStyles.calCell}>5</div>
                <div style={homeStyles.calCell}>6</div>
                <div style={homeStyles.calCell}>7</div>
                <div style={homeStyles.calCell}>8</div>

                <div style={homeStyles.calCell}>9</div>
                <div style={{ ...homeStyles.calCell, backgroundColor: '#A30D11', color: '#ffffff', fontWeight: '700' }}>10</div>
                <div style={homeStyles.calCell}>11</div>
                <div style={homeStyles.calCell}>12</div>
                <div style={{ ...homeStyles.calCell, position: 'relative' }}>13</div>
                <div style={homeStyles.calCell}>14</div>
                <div style={homeStyles.calCell}>15</div>
              </div>
            </div>

            <div ref={aiRef} style={homeStyles.widgetCard}>
              <div style={homeStyles.aiAssistantHeader}>
                <span style={homeStyles.aiAssistantTitle}>Asistente Virtual</span>
                <div style={homeStyles.aiIconBadge}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                  </svg>
                </div>
              </div>
              
              <div style={homeStyles.aiRecommendationTag}>AI RECOMMENDATION</div>
              <p style={homeStyles.aiQuoteText}>"Tu resistencia cardiovascular ha mejorado un 8% esta semana. Considera aumentar 5 minutos a tu rutina de mañana."</p>

              <div style={homeStyles.aiMetricsList}>
                <div style={homeStyles.aiMetricRow}>
                  <div style={{ width: '6px', height: '6px', backgroundColor: '#A30D11', borderRadius: '50%' }}></div>
                  <span>Meta de pasos: 85% completada</span>
                </div>
                <div style={homeStyles.aiMetricRow}>
                  <div style={{ width: '6px', height: '6px', backgroundColor: '#2563EB', borderRadius: '50%' }}></div>
                  <span>Descanso óptimo: 7.5 hrs promedio</span>
                </div>
              </div>

              <button style={homeStyles.talkAiBtn} onClick={() => alert('Abriendo chat con Asistente IA...')}>
                HABLAR CON IA
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// ============================================
// ESTILOS DE LA VISTA HOME Y SIDEBAR
// ============================================
const homeStyles = {
  homeContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'var(--app-bg-color, #F8FAFC)',
    color: 'var(--app-text-color, #0F172A)',
    fontSize: 'var(--app-font-size, 16px)',
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    overflowY: 'auto',
    boxSizing: 'border-box',
  },
  topNav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 48px',
    backgroundColor: '#FFFFFF',
    borderBottom: '1px solid #E2E8F0',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  navLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
  },
  hamburgerBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    padding: '4px',
  },
  hamburgerLine: {
    display: 'block',
    width: '22px',
    height: '2px',
    backgroundColor: '#0F172A',
  },
  brandLogo: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '24px',
    fontWeight: '700',
    color: '#A30D11',
    letterSpacing: '0.5px',
    textDecoration: 'none',
  },
  navRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  userInfoText: {
    textAlign: 'right',
  },
  userRoleLabel: {
    fontSize: '10px',
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: '0.5px',
  },
  userNameText: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#0F172A',
  },
  userAvatarBtn: {
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    backgroundColor: '#FEF2F2',
    border: '1px solid #FCA5A5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  sidebarBackdrop: {
    position: 'fixed',
    inset: 0,
    backgroundColor: '#000000',
    zIndex: 999,
  },
  sidebarPanel: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '320px',
    height: '100vh',
    backgroundColor: '#FFFFFF',
    zIndex: 1000,
    boxShadow: '10px 0 30px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    padding: '32px 24px',
    boxSizing: 'border-box',
    overflowY: 'auto',
  },
  closeSidebarBtn: {
    alignSelf: 'flex-end',
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#64748B',
    padding: '4px 8px',
  },
  sidebarProfileSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: '10px',
    marginBottom: '32px',
    paddingBottom: '20px',
    borderBottom: '1px solid #F1F5F9',
  },
  sidebarAvatarBox: {
    width: '72px',
    height: '72px',
    borderRadius: '16px',
    backgroundColor: '#CCFBF1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '14px',
  },
  sidebarUserName: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '22px',
    fontWeight: '700',
    color: '#0F172A',
    margin: '0 0 2px 0',
  },
  sidebarUserRole: {
    fontSize: '13px',
    color: '#64748B',
    margin: 0,
  },
  sidebarNavList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  sidebarNavItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '12px 16px',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: '600',
    color: '#475569',
    cursor: 'pointer',
    transition: 'background-color 0.2s, color 0.2s',
  },
  sidebarNavItemActive: {
    backgroundColor: '#A30D11',
    color: '#FFFFFF',
    boxShadow: '0 4px 12px rgba(225, 29, 72, 0.25)',
  },
  dashboardContent: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '36px 48px',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
  welcomeBanner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '20px',
  },
  welcomeTitleGroup: {},
  welcomeH1: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '26px',
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: '6px',
    textTransform: 'uppercase',
  },
  welcomeP: {
    fontSize: '14px',
    color: '#475569',
    lineHeight: '1.5',
  },
  notificationsBtn: {
    backgroundColor: '#A30D11',
    color: '#ffffff',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '0.5px',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(225, 29, 72, 0.25)',
    whiteSpace: 'nowrap',
  },
  statsTopGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
  },
  statBox: {
    backgroundColor: '#ffffff',
    border: '1px solid #E2E8F0',
    borderRadius: '14px',
    padding: '22px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '130px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.01)',
  },
  statBoxHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statBoxTitle: {
    fontSize: '10px',
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: '0.8px',
    textTransform: 'uppercase',
  },
  statBoxValueLarge: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '32px',
    fontWeight: '700',
    color: '#0F172A',
    lineHeight: '1.1',
  },
  statBoxSubtext: {
    fontSize: '12px',
    color: '#475569',
    fontWeight: '500',
  },
  statBoxSubtextStyle: {
    fontSize: '12px',
    color: '#475569',
    fontWeight: '500',
    marginTop: '4px',
  },
  riskBadgeLow: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '26px',
    color: '#0D9488',
    fontWeight: '700',
  },
  riskProgressBar: {
    width: '100%',
    height: '6px',
    backgroundColor: '#E2E8F0',
    borderRadius: '3px',
    overflow: 'hidden',
    marginTop: '6px',
  },
  riskProgressFill: {
    width: '25%',
    height: '100%',
    backgroundColor: '#0D9488',
  },
  mainGridLayout: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '24px',
  },
  eventsSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  sectionHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '18px',
    color: '#0F172A',
    textTransform: 'uppercase',
    letterSpacing: '0.3px',
  },
  seeAllLink: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#A30D11',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  eventCard: {
    backgroundColor: '#ffffff',
    border: '1px solid #E2E8F0',
    borderRadius: '16px',
    display: 'flex',
    overflow: 'hidden',
    boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
  },
  eventImageContainer: {
    width: '240px',
    position: 'relative',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    flexShrink: 0,
    minHeight: '160px',
  },
  eventTagPill: {
    position: 'absolute',
    top: '12px',
    left: '12px',
    backgroundColor: '#ffffff',
    color: '#0F172A',
    fontSize: '9.5px',
    fontWeight: '800',
    padding: '4px 10px',
    borderRadius: '20px',
    letterSpacing: '0.5px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  eventCardBody: {
    padding: '20px 24px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  eventCardTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '18px',
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: '8px',
    textTransform: 'uppercase',
  },
  eventMetaList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    fontSize: '12px',
    color: '#64748B',
    marginBottom: '14px',
  },
  eventMetaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  eventCardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid #F1F5F9',
    paddingTop: '12px',
  },
  spotsAvailable: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#0D9488',
  },
  registerEventBtn: {
    backgroundColor: '#A30D11',
    color: '#ffffff',
    border: 'none',
    padding: '8px 18px',
    borderRadius: '8px',
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '0.5px',
    cursor: 'pointer',
  },
  rightSidebarColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  widgetCard: {
    backgroundColor: '#ffffff',
    border: '1px solid #E2E8F0',
    borderRadius: '16px',
    padding: '22px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
  },
  calendarHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  calendarTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '16px',
    color: '#0F172A',
    textTransform: 'uppercase',
  },
  calendarNavArrows: {
    display: 'flex',
    gap: '8px',
    color: '#64748B',
    cursor: 'pointer',
  },
  calendarMonthLabel: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: '12px',
  },
  calendarGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    textAlign: 'center',
    gap: '6px',
  },
  calDayHeader: {
    fontSize: '10px',
    fontWeight: '700',
    color: '#94A3B8',
    paddingBottom: '6px',
  },
  calCell: {
    fontSize: '12px',
    fontWeight: '500',
    color: '#334155',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    cursor: 'pointer',
  },
  aiAssistantHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  aiAssistantTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '16px',
    color: '#0F172A',
    textTransform: 'uppercase',
  },
  aiIconBadge: {
    width: '32px',
    height: '32px',
    backgroundColor: '#FEE2E2',
    color: '#A30D11',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiRecommendationTag: {
    fontSize: '9px',
    fontWeight: '800',
    color: '#A30D11',
    letterSpacing: '0.6px',
    textTransform: 'uppercase',
    marginBottom: '6px',
  },
  aiQuoteText: {
    fontSize: '12.5px',
    color: '#334155',
    lineHeight: '1.5',
    fontStyle: 'italic',
    marginBottom: '16px',
  },
  aiMetricsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    fontSize: '12px',
    color: '#475569',
    borderTop: '1px solid #F1F5F9',
    borderBottom: '1px solid #F1F5F9',
    padding: '12px 0',
    marginBottom: '16px',
  },
  aiMetricRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  talkAiBtn: {
    width: '100%',
    background: 'transparent',
    border: '1px solid #FCA5A5',
    color: '#A30D11',
    borderRadius: '8px',
    padding: '10px',
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '0.5px',
    cursor: 'pointer',
  },
};

export default Home;