import { useState } from 'react'
import { Menu, Search, Bell, ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface TopbarProps {
  onMenuClick: () => void
  title: string
}

export default function Topbar({ onMenuClick, title }: TopbarProps) {
  const [search, setSearch] = useState('')
  const { t } = useTranslation()

  return (
    <header className="h-14 bg-white border-b border-slate-100 flex items-center px-4 gap-4 sticky top-0 z-20">
      <button
        onClick={onMenuClick}
        className="lg:hidden text-slate-500 hover:text-slate-800 transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      <h1 className="text-sm font-semibold text-slate-800 uppercase tracking-widest hidden sm:block">
        {title}
      </h1>

      {/* Search */}
      <div className="flex-1 max-w-xs ms-auto sm:ms-4 relative">
        <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={t('manager.searchBar')}
          aria-label={t('manager.searchBar')}
          className="w-full ps-8 pe-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-slate-400 transition-colors"
        />
      </div>

      {/* Notifications */}
      <button className="relative text-slate-500 hover:text-slate-800 transition-colors" aria-label="Notifications">
        <Bell className="w-4 h-4" />
        <span className="absolute -top-1 -end-1 w-2 h-2 bg-red-500 rounded-full" />
      </button>

      {/* Profile */}
      <button className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
        <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-xs font-bold">
          M
        </div>
        <span className="text-xs font-medium hidden sm:block">{t('auth.manager')}</span>
        <ChevronDown className="w-3 h-3" />
      </button>
    </header>
  )
}
