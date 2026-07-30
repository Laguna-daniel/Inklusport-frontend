import React, { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext()

const USERS_KEY = 'inklusport_registered_users'
const CURRENT_USER_KEY = 'inklusport_current_user'
const TOKEN_KEY = 'inklusport_token'

const defaultUsers = [
  {
    fullName: 'Demo Athlete',
    email: 'laguna@gmail.com',
    phone: '+34 612 345 678',
    disabilityType: 'Física / Motora',
    athleteId: '#4402',
    profilePicUrl: 'https://images.unsplash.com/photo-1581343432368-17c864c29e01?q=80&w=300&auto=format&fit=crop',
    password: '123456',
  },
]

const loadUsers = () => {
  try {
    const stored = localStorage.getItem(USERS_KEY)
    if (!stored) {
      localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers))
      return [...defaultUsers]
    }
    return JSON.parse(stored)
  } catch {
    return [...defaultUsers]
  }
}

const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

const loadCurrentUser = () => {
  try {
    const stored = localStorage.getItem(CURRENT_USER_KEY)
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

const saveCurrentUser = (user) => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
}

const clearCurrentUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY)
  localStorage.removeItem(TOKEN_KEY)
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(loadCurrentUser())
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY))
  const [loading, setLoading] = useState(true)

  const login = async ({ email, password }) => {
    const users = loadUsers()
    const normalizedEmail = email?.trim().toLowerCase()
    const matched = users.find((u) => u.email.toLowerCase() === normalizedEmail)

    if (!matched) {
      return {
        success: false,
        error: 'No existe una cuenta registrada con ese correo.',
      }
    }

    if (matched.password !== password) {
      return {
        success: false,
        error: 'La contraseña ingresada es incorrecta.',
      }
    }

    const authUser = { ...matched }
    delete authUser.password

    const newToken = `token-${Date.now()}`
    setToken(newToken)
    setUser(authUser)
    saveCurrentUser(authUser)
    localStorage.setItem(TOKEN_KEY, newToken)

    return { success: true, data: { user: authUser, token: newToken } }
  }

  const register = async (userData) => {
    const users = loadUsers()
    const normalizedEmail = userData.email?.trim().toLowerCase()

    if (users.some((u) => u.email.toLowerCase() === normalizedEmail)) {
      return {
        success: false,
        error: 'Ya existe una cuenta con ese correo electrónico.',
      }
    }

    const newUser = {
      fullName: userData.fullName,
      email: normalizedEmail,
      phone: userData.phone || '',
      disabilityType: userData.disabilityType || 'Física / Motora',
      athleteId: userData.athleteId || `#${Math.floor(Math.random() * 9000) + 1000}`,
      profilePicUrl:
        userData.profilePicUrl ||
        'https://images.unsplash.com/photo-1581343432368-17c864c29e01?q=80&w=300&auto=format&fit=crop',
      password: userData.password,
    }

    const updatedUsers = [...users, newUser]
    saveUsers(updatedUsers)

    const authUser = { ...newUser }
    delete authUser.password

    const newToken = `token-${Date.now()}`
    setToken(newToken)
    setUser(authUser)
    saveCurrentUser(authUser)
    localStorage.setItem(TOKEN_KEY, newToken)

    return { success: true, data: { user: authUser, token: newToken } }
  }

  const updateProfile = async (updatedFields) => {
    if (!user) {
      return { success: false, error: 'Usuario no autenticado.' }
    }

    const users = loadUsers()
    const currentEmail = user.email.toLowerCase()
    const normalizedEmail = updatedFields.email?.trim().toLowerCase() || currentEmail

    const updatedUsers = users.map((storedUser) => {
      if (storedUser.email.toLowerCase() !== currentEmail) {
        return storedUser
      }
      return {
        ...storedUser,
        ...updatedFields,
        email: normalizedEmail,
      }
    })

    saveUsers(updatedUsers)

    const updatedUser = {
      ...user,
      ...updatedFields,
      email: normalizedEmail,
    }

    setUser(updatedUser)
    saveCurrentUser(updatedUser)

    return { success: true, data: updatedUser }
  }

  const logout = () => {
    clearCurrentUser()
    setToken(null)
    setUser(null)
  }

  const validateToken = async () => {
    const storedUser = loadCurrentUser()
    if (storedUser) {
      setUser(storedUser)
      return true
    }

    logout()
    return false
  }

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        await validateToken()
      }
      setLoading(false)
    }
    loadUser()
  }, [token])

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateProfile,
    validateToken,
    isAuthenticated: !!user,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }
  return context
}