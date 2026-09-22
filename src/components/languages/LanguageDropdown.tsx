import { useState, useRef, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import './languageDropdown.css'

interface Language {
  code: string
  name: string
  native: string
}

const LANGUAGES: Language[] = [
  { code: 'en', name: 'English',      native: 'English'        },
  { code: 'am', name: 'Amharic',      native: 'አማርኛ'           },
  { code: 'ar', name: 'Arabic',       native: 'العربية'         },
  { code: 'om', name: 'Afaan Oromo',  native: 'Afaan Oromoo'   },
]

function GlobeIcon() {
  return (
    <svg className="lang__globe" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M3 12h18M12 3c2.6 2.5 4 5.6 4 9s-1.4 6.5-4 9c-2.6-2.5-4-5.6-4-9s1.4-6.5 4-9z"
        fill="none" stroke="currentColor" strokeWidth="1.6"
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg className="lang__chevron" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
      <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg className="lang__check" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.2"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function LanguageDropdown() {
  const { i18n, t } = useTranslation()
  const language = i18n.resolvedLanguage ?? 'en'

  const [open, setOpen] = useState(false)
  const rootRef   = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const itemRefs  = useRef<(HTMLButtonElement | null)[]>([])

  const current = LANGUAGES.find(l => l.code === language) ?? LANGUAGES[0]

  // Apply lang + dir on every language change
  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir  = language === 'ar' ? 'rtl' : 'ltr'
    // Persist choice
    localStorage.setItem('lang', language)
  }, [language])

  const select = useCallback((code: string) => {
    i18n.changeLanguage(code)
    setOpen(false)
    buttonRef.current?.focus()
  }, [i18n])

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handle = (e: MouseEvent | TouchEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handle)
    document.addEventListener('touchstart', handle)
    return () => {
      document.removeEventListener('mousedown', handle)
      document.removeEventListener('touchstart', handle)
    }
  }, [open])

  // Focus selected item when menu opens
  useEffect(() => {
    if (!open) return
    const idx = LANGUAGES.findIndex(l => l.code === language)
    itemRefs.current[idx >= 0 ? idx : 0]?.focus()
  }, [open, language])

  const focusItem = (index: number) => {
    const last = LANGUAGES.length - 1
    const next = index < 0 ? last : index > last ? 0 : index
    itemRefs.current[next]?.focus()
  }

  const handleButtonKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      setOpen(true)
    }
  }

  const handleMenuKeyDown = (e: React.KeyboardEvent, index: number) => {
    switch (e.key) {
      case 'ArrowDown': e.preventDefault(); focusItem(index + 1); break
      case 'ArrowUp':   e.preventDefault(); focusItem(index - 1); break
      case 'Home':      e.preventDefault(); focusItem(0);                    break
      case 'End':       e.preventDefault(); focusItem(LANGUAGES.length - 1); break
      case 'Escape':    e.preventDefault(); setOpen(false); buttonRef.current?.focus(); break
      case 'Tab':       setOpen(false); break
    }
  }

  return (
    <div className={`lang ${open ? 'lang--open' : ''}`} ref={rootRef}>
      <button
        ref={buttonRef}
        type="button"
        className="lang__button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${t('nav.language')}: ${current.name}`}
        onClick={() => setOpen(o => !o)}
        onKeyDown={handleButtonKeyDown}
      >
        <GlobeIcon />
        <span className="lang__code">{current.code}</span>
        <ChevronIcon />
      </button>

      <ul
        className="lang__menu"
        role="listbox"
        aria-label={t('nav.selectLanguage')}
        aria-hidden={!open}
      >
        {LANGUAGES.map((lang, index) => {
          const selected = lang.code === language
          return (
            <li key={lang.code} role="presentation">
              <button
                ref={el => { itemRefs.current[index] = el }}
                type="button"
                role="option"
                aria-selected={selected}
                tabIndex={open ? 0 : -1}
                className={`lang__item ${selected ? 'lang__item--active' : ''}`}
                onClick={() => select(lang.code)}
                onKeyDown={e => handleMenuKeyDown(e, index)}
              >
                <span className="lang__badge">{lang.code}</span>
                <span className="lang__labels">
                  <span className="lang__native">{lang.native}</span>
                  {lang.native !== lang.name && (
                    <span className="lang__english">{lang.name}</span>
                  )}
                </span>
                {selected && <CheckIcon />}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
