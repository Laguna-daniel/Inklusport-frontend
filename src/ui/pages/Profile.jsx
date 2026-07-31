import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../domain/contexts/AuthContext'

const Profile = () => {
  const navigate = useNavigate();
  const { user, updateProfile, logout } = useAuth();
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phone: '',
    disabilityType: '',
    athleteId: '',
    profilePicUrl: '',
  });
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    setProfileData({
      fullName: user.fullName || '',
      email: user.email || '',
      phone: user.phone || '',
      disabilityType: user.disabilityType || '',
      athleteId: user.athleteId || '#0000',
      profilePicUrl:
        user.profilePicUrl ||
        'https://images.unsplash.com/photo-1581343432368-17c864c29e01?q=80&w=300&auto=format&fit=crop',
    })
  }, [user, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!profileData.fullName || !profileData.email) {
      setStatusMessage('Completa el nombre y el correo antes de actualizar.')
      return
    }

    const result = await updateProfile(profileData)
    if (result.success) {
      setStatusMessage('Perfil actualizado correctamente.')
    } else {
      setStatusMessage(result.error)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="profile-container">
      <style>{`
        .profile-container {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          background-color: #f8fafc;
          min-height: 100vh;
          color: #1e293b;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .profile-container *, .profile-container *::before, .profile-container *::after {
          box-sizing: border-box;
        }

        /* Navbar Styles */
        .profile-navbar {
          background-color: #ffffff;
          border-bottom: 1px solid #f1f5f9;
          position: sticky;
          top: 0;
          z-index: 50;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
        }

        .profile-nav-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 12px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .profile-nav-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .profile-logo {
          font-size: 24px;
          font-weight: 800;
          color: #A30D11;
          letter-spacing: -0.025em;
        }

        .profile-nav-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .profile-nav-tag {
          font-size: 13px;
          color: #64748b;
          font-weight: 500;
        }

        .profile-nav-divider {
          width: 1px;
          height: 24px;
          background-color: #e2e8f0;
        }

        .profile-nav-user {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .profile-nav-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #e2e8f0;
        }

        .profile-nav-username {
          font-weight: 600;
          color: #334155;
          font-size: 14px;
        }

        .profile-icon-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          color: #64748b;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s, color 0.2s;
        }

        .profile-icon-btn:hover {
          background-color: #f1f5f9;
          color: #A30D11;
        }

        /* Main Content Styles */
        .profile-main {
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px 24px;
        }

        .profile-header-section {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-bottom: 48px;
          position: relative;
        }

        @media (min-width: 768px) {
          .profile-header-section {
            flex-direction: row;
            align-items: center;
          }
        }

        .profile-avatar-container {
          position: relative;
          width: 140px;
          height: 140px;
        }

        .profile-main-avatar {
          width: 140px;
          height: 140px;
          border-radius: 24px;
          object-fit: cover;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          border: 4px solid #ffffff;
        }

        .profile-camera-btn {
          position: absolute;
          bottom: -6px;
          right: -6px;
          background-color: #A30D11;
          color: #ffffff;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transition: background-color 0.2s;
        }

        .profile-camera-btn:hover {
          background-color: #A30D11;
        }

        .profile-title-area {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .profile-title {
          font-size: 44px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.03em;
          margin: 0;
        }

        .profile-subtitle {
          font-size: 18px;
          color: #2563eb;
          font-weight: 600;
          margin: 0;
        }

        .profile-top-notifications-btn {
          position: absolute;
          top: 0;
          right: 0;
          background-color: #A30D11;
          color: #ffffff;
          border: none;
          padding: 12px 24px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transition: background-color 0.2s;
          display: none;
        }

        @media (min-width: 1024px) {
          .profile-top-notifications-btn {
            display: block;
          }
        }

        .profile-top-notifications-btn:hover {
          background-color: #A30D11;
        }

        /* Card Section Styles */
        .profile-card {
          background-color: #ffffff;
          padding: 40px;
          border-radius: 24px;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
          border: 1px solid #f1f5f9;
        }

        .profile-card-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 36px;
        }

        .profile-card-icon-box {
          background-color: #fef2f2;
          padding: 12px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #A30D11;
        }

        .profile-card-title {
          font-size: 24px;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }

        /* Form Styles */
        .profile-form-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 28px;
        }

        @media (min-width: 768px) {
          .profile-form-grid {
            grid-template-columns: repeat(2, 1fr);
            column-gap: 36px;
          }
        }

        .profile-form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .profile-form-label {
          font-size: 12px;
          font-weight: 700;
          color: #64748b;
          letter-spacing: 0.05em;
        }

        .profile-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .profile-input-icon {
          position: absolute;
          left: 16px;
          color: #94a3b8;
          width: 20px;
          height: 20px;
          pointer-events: none;
        }

        .profile-input, .profile-select {
          width: 100%;
          padding: 16px 20px;
          background-color: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          font-size: 16px;
          color: #0f172a;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .profile-input:focus, .profile-select:focus {
          border-color: #93c5fd;
          box-shadow: 0 0 0 3px rgba(147, 197, 253, 0.3);
          background-color: #ffffff;
        }

        .profile-input.with-icon, .profile-select.with-icon {
          padding-left: 52px;
        }

        .profile-select {
          appearance: none;
          cursor: pointer;
        }

        .profile-select-arrow {
          position: absolute;
          right: 16px;
          color: #94a3b8;
          width: 20px;
          height: 20px;
          pointer-events: none;
        }

        .profile-submit-wrapper {
          grid-column: 1 / -1;
          display: flex;
          justify-content: flex-end;
          margin-top: 16px;
        }

        .profile-submit-btn {
          width: 100%;
          background: linear-gradient(135deg, #A30D11 0%, #A30D11 100%);
          color: #ffffff;
          border: none;
          padding: 18px 48px;
          font-size: 16px;
          font-weight: 700;
          border-radius: 16px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
          transition: transform 0.15s, box-shadow 0.15s, background-color 0.2s;
        }

        .profile-submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(220, 38, 38, 0.4);
        }

        .profile-submit-btn:active {
          transform: translateY(0);
        }

        @media (min-width: 768px) {
          .profile-submit-btn {
            width: auto;
          }
        }
      `}</style>

      {/* Barra de Navegación */}
      <header className="profile-navbar">
        <nav className="profile-nav-content">
          <div className="profile-nav-left">
            <div className="profile-logo">
              INKLUSPORT
            </div>
          </div>
          
          <div className="profile-nav-right">
            <span className="profile-nav-tag">ADAPTIVE ATHLETE</span>
            <div className="profile-nav-divider"></div>
            <div className="profile-nav-user">
              <img 
                src={profileData.profilePicUrl} 
                alt="User" 
                className="profile-nav-avatar"
              />
              <span className="profile-nav-username">{profileData.fullName}</span>
            </div>
            <button className="profile-icon-btn" type="button" onClick={handleLogout} title="Cerrar sesión">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 17l5-5-5-5"></path>
                <path d="M21 12H9"></path>
                <path d="M9 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4"></path>
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Contenido Principal */}
      <main className="profile-main">
        
        {/* Encabezado del Perfil */}
        <div className="profile-header-section">
          <div className="profile-avatar-container">
            <img 
              src={profileData.profilePicUrl} 
              alt={profileData.fullName} 
              className="profile-main-avatar"
            />
            <button className="profile-camera-btn" title="Cambiar foto">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                <circle cx="12" cy="13" r="4"></circle>
              </svg>
            </button>
          </div>
          <div className="profile-title-area">
            <h1 className="profile-title">Mi Perfil</h1>
            <p className="profile-subtitle">Adaptive Athlete ID: {profileData.athleteId}</p>
          </div>
          
          <button className="profile-top-notifications-btn">
            NOTIFICATIONS
          </button>
        </div>

        {/* Tarjeta de Información Personal */}
        <section className="profile-card">
          <div className="profile-card-header">
            <div className="profile-card-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <h2 className="profile-card-title">Información Personal</h2>
          </div>

          <form className="profile-form-grid" onSubmit={handleSubmit}>
            
            {/* Campo: Nombre Completo */}
            <div className="profile-form-group">
              <label htmlFor="fullName" className="profile-form-label">NOMBRE COMPLETO</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={profileData.fullName}
                onChange={handleChange}
                className="profile-input"
              />
            </div>

            {/* Campo: Correo Electrónico */}
            <div className="profile-form-group">
              <label htmlFor="email" className="profile-form-label">CORREO ELECTRÓNICO</label>
              <div className="profile-input-wrapper">
                <svg className="profile-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleChange}
                  className="profile-input with-icon"
                />
              </div>
            </div>

            {/* Campo: Teléfono */}
            <div className="profile-form-group">
              <label htmlFor="phone" className="profile-form-label">TELÉFONO</label>
              <div className="profile-input-wrapper">
                <svg className="profile-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleChange}
                  className="profile-input with-icon"
                />
              </div>
            </div>

            {/* Campo: Tipo de Discapacidad */}
            <div className="profile-form-group">
              <label htmlFor="disabilityType" className="profile-form-label">TIPO DE DISCAPACIDAD</label>
              <div className="profile-input-wrapper">
                <svg className="profile-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="7" r="4"></circle>
                  <path d="M5.5 21l3.5-7h6l3.5 7"></path>
                </svg>
                <select
                  id="disabilityType"
                  name="disabilityType"
                  value={profileData.disabilityType}
                  onChange={handleChange}
                  className="profile-select with-icon"
                >
                  <option>Motriz</option>
                  <option>Visual</option>
                  <option>Auditiva</option>
                  <option>Intelectual</option>
                   <option>Otra/ninguna</option>
                </select>
                <svg className="profile-select-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>

            {statusMessage && (
              <div style={{
                gridColumn: '1 / -1',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '16px 20px',
                color: '#0f172a',
                fontWeight: 600,
              }}>
                {statusMessage}
              </div>
            )}

            <div className="profile-submit-wrapper">
              <button
                type="submit"
                className="profile-submit-btn"
              >
                ACTUALIZAR PERFIL
              </button>
            </div>

          </form>
        </section>

      </main>
    </div>
  );
};

export default Profile;