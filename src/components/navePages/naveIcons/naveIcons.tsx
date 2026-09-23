import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './navIcons.css'

type Theme = 'light' | 'dark'

// Default is always LIGHT.
// Only switch to dark if the user explicitly saved "dark" before.
// We deliberately ignore prefers-color-scheme so the page never starts black.
function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark') return 'dark'
  } catch {
    // localStorage unavailable — stay light
  }
  return 'light'
}

function NaveIcons() {
  const { t } = useTranslation()
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  // Apply data-theme to <html> and persist choice whenever it changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // localStorage unavailable
    }
  }, [theme])

  // On first mount make absolutely sure data-theme="light" is set,
  // in case a stale value was left on the element by a previous session.
  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme')
    if (current !== 'dark') {
      document.documentElement.setAttribute('data-theme', 'light')
    }
  }, [])

  function toggle() {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  const isDark    = theme === 'dark'
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
