import { createContext, useContext, useState, useEffect, useCallback, useMemo, type ReactNode } from 'react'

export interface UserProfile {
  email: string
  username: string
  name: string
  age: number
  dob: string
  pronouns: string[]
  inviteCode?: string
  tokens: number
  clubTier: 'Bronze Club Member' | 'Silver Club Member' | 'Gold Club Member'
  vipPasses: number
  invitePasses: number
}

export interface SignupData {
  email: string
  subscribedToNewsletter: boolean
  otp: string
  username: string
  name: string
  dob: string
  age: number
  pronouns: string[]
  inviteCode: string
}

interface AuthContextType {
  isAuthenticated: boolean
  currentUser: UserProfile | null
  signupData: SignupData
  showSignupSuccessToast: boolean
  setShowSignupSuccessToast: (show: boolean) => void
  updateSignupData: (fields: Partial<SignupData>) => void
  completeSignup: () => void
  loginAsDemo: (email: string) => void
  logout: () => void
}

const defaultSignupData: SignupData = {
  email: '',
  subscribedToNewsletter: false,
  otp: '',
  username: '',
  name: '',
  dob: '',
  age: 0,
  pronouns: [],
  inviteCode: '',
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const STORAGE_KEY_AUTH = 'extroverts_auth_user'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_AUTH)
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  const [signupData, setSignupData] = useState<SignupData>(defaultSignupData)
  const [showSignupSuccessToast, setShowSignupSuccessToast] = useState(false)

  const isAuthenticated = currentUser !== null

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(currentUser))
      } else {
        localStorage.removeItem(STORAGE_KEY_AUTH)
      }
    } catch (e) {
      console.error('Failed to sync auth state to localStorage', e)
    }
  }, [currentUser])

  const updateSignupData = useCallback((fields: Partial<SignupData>) => {
    setSignupData((prev) => ({ ...prev, ...fields }))
  }, [])

  const completeSignup = useCallback(() => {
    setSignupData((prev) => {
      const extraTokens = prev.inviteCode ? 30 : 0
      const newUser: UserProfile = {
        email: prev.email || 'partyboy@extroverts.app',
        username: prev.username || 'partyboy',
        name: prev.name || 'Party Check Name',
        age: prev.age || 18,
        dob: prev.dob || '2008-01-01',
        pronouns: prev.pronouns.length > 0 ? prev.pronouns : ['he', 'him', 'his'],
        inviteCode: prev.inviteCode,
        tokens: extraTokens, // TODO: Move to backend API
        clubTier: 'Bronze Club Member',
        vipPasses: 0,
        invitePasses: 3,
      }

      setCurrentUser(newUser)
      setShowSignupSuccessToast(true)
      return defaultSignupData
    })
  }, [])

  const loginAsDemo = useCallback((email: string) => {
    const demoUser: UserProfile = {
      email,
      username: 'partyboy',
      name: 'Party Person',
      age: 22,
      dob: '2004-05-15',
      pronouns: ['he', 'him', 'his'],
      tokens: 160,
      clubTier: 'Silver Club Member',
      vipPasses: 1,
      invitePasses: 3,
    }
    setCurrentUser(demoUser)
  }, [])

  const logout = useCallback(() => {
    setCurrentUser(null)
    setSignupData(defaultSignupData)
    setShowSignupSuccessToast(false)
  }, [])

  const value = useMemo(() => ({
    isAuthenticated,
    currentUser,
    signupData,
    showSignupSuccessToast,
    setShowSignupSuccessToast,
    updateSignupData,
    completeSignup,
    loginAsDemo,
    logout,
  }), [isAuthenticated, currentUser, signupData, showSignupSuccessToast, updateSignupData, completeSignup, loginAsDemo, logout])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
