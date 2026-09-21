import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './navIcons.css'

type Theme = 'light' | 'dark'

function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    // localStorage unavailable
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function NaveIcons() {
  const { t } = useTranslation()
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // localStorage unavailable
    }
  }, [theme])

  function toggle() {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  const isDark   = theme === 'dark'
  const ariaLabel = isDark ? t('nav.switchToLight') : t('nav.switchToDark')

  return (
    <div className="icons_wrapper">
      <div className="icons_container">
        <div className="icons_list">
          <button
            type="button"
            className="dark_night"
            onClick={toggle}
            aria-label={ariaLabel}
            aria-pressed={isDark}
          >
            <span className="theme-icon" key={theme}>
              {isDark ? '🌙' : '🔆'}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default NaveIcons
