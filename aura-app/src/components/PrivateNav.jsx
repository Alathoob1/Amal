import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Leaf, LogOut } from 'lucide-react'

export default function PrivateNav({ roleName, userName, avatarColor, avatarInitials }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar');
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <nav className="glass-nav sticky top-0 z-50 px-6 py-4 flex justify-between items-center transition-all duration-300">
      <Link to="#" className="flex items-center gap-2 text-2xl font-bold text-[#759A72]">
        <Leaf className="w-8 h-8" />
        Aura <span className="text-sm text-[#64748B] font-medium opacity-80 mx-2">| {roleName}</span>
      </Link>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold shadow-md" style={{ backgroundColor: avatarColor }}>
            {avatarInitials}
          </div>
          <span className="font-semibold text-[#2C3E50]">{userName}</span>
        </div>
        <button onClick={toggleLang} className="px-3 py-1 text-sm font-medium border border-[#759A72]/50 text-[#759A72] rounded hover:bg-[#759A72]/5 transition-colors">
          EN / AR
        </button>
        <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-[#E27D60] border border-[#E27D60]/30 rounded hover:bg-[#E27D60]/10 font-medium transition-colors">
          <LogOut className="w-4 h-4" />
          {t('btn_logout')}
        </button>
      </div>
    </nav>
  )
}
