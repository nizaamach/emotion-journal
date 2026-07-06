import { createContext, useContext, useReducer, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)
const AuthDispatchContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, dispatch] = useReducer(authReducer, null)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      dispatch({ type: 'SET_USER', user: session?.user ?? null })
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        dispatch({ type: 'SET_USER', user: session?.user ?? null })
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={user}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

export function useAuthDispatch() {
  return useContext(AuthDispatchContext)
}

function authReducer(user, action) {
  switch (action.type) {
    case 'SET_USER':
      return action.user
    case 'SIGN_OUT':
      return null
    default:
      return user
  }
}
