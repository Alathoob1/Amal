import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Leaf } from 'lucide-react'

export default function PublicNav() {
  const { t, i18n } = useTranslation();

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar');
  };

  return (
    <nav className="glass-nav sticky top-0 z-50 px-6 py-4 flex justify-between items-center transition-all duration-300">
      <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-[#759A72] hover:opacity-80 transition-opacity">
        <Leaf className="w-8 h-8" />
        Aura
      </Link>
      <div className="flex items-center gap-6">
        <Link to="/" className="font-medium text-[#64748B] hover:text-[#759A72] transition-colors">{t('nav_home')}</Link>
        <button onClick={toggleLang} className="px-3 py-1 text-sm font-medium border border-[#759A72]/50 text-[#759A72] rounded hover:bg-[#759A72]/5 transition-colors">
          EN / AR
        </button>
        <Link to="/login" className="px-6 py-2 bg-[#759A72] text-white font-medium rounded shadow-lg shadow-[#759A72]/30 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300">
          {t('btn_login')}
        </Link>
      </div>
    </nav>
  )
}
