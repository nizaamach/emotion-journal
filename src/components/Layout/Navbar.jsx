import { Link, useLocation } from 'react-router-dom'
import { BookOpen, Calendar, Home, LogOut } from 'lucide-react'
import { supabase } from '../../lib/supabase'

export default function Navbar() {
  const location = useLocation()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  const navItems = [
    { path: '/journal', icon: BookOpen, label: 'New Entry' },
    { path: '/dashboard', icon: Home, label: 'Home' },
    { path: '/calendar', icon: Calendar, label: 'Calendar' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-[#FAF9F6]/80 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/journal" className="flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <span className="font-medium text-lg text-[#3D3D3D]">Journal</span>
          </Link>

          <div className="flex items-center gap-1">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname === path
                    ? 'bg-[#6B8E6B] text-white'
                    : 'text-[#6B6B6B] hover:bg-[#E8EDE5]'
                }`}
              >
                <Icon size={18} />
                <span className="text-sm font-medium hidden sm:inline">{label}</span>
              </Link>
            ))}

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#6B6B6B] hover:bg-[#E8EDE5] transition-all duration-200 ml-2"
              title="Logout"
            >
              <LogOut size={18} />
              <span className="text-sm font-medium hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
