import { useState, useEffect } from 'react'
import { Save, Trash2, KeyRound, Eye, EyeOff, Loader, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { staffApi, type StaffUser } from '../../../../lib/api'

const ROLE_COLOR: Record<string, string> = {
  manager: 'bg-indigo-50 text-indigo-700',
  nurse:   'bg-amber-50 text-amber-700',
  card:    'bg-emerald-50 text-emerald-700',
}

export default function SettingsSection() {
  const { t } = useTranslation()

  // ── Clinic settings (local state — no backend for this yet) ──────────────
  const [clinicName, setClinicName] = useState('Dr. Muhammed Zain Dental Clinic')
  const [password,   setPassword]   = useState('')
  const [confirm,    setConfirm]    = useState('')
  const [saved,      setSaved]      = useState(false)

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  // ── Staff users ───────────────────────────────────────────────────────────
  const [staff,        setStaff]        = useState<StaffUser[]>([])
  const [staffLoading, setStaffLoading] = useState(true)
  const [staffError,   setStaffError]   = useState('')

  // Reset password modal state
  const [resetTarget,  setResetTarget]  = useState<StaffUser | null>(null)
  const [newPw,        setNewPw]        = useState('')
  const [showPw,       setShowPw]       = useState(false)
  const [resetSaving,  setResetSaving]  = useState(false)
  const [resetError,   setResetError]   = useState('')

  // Delete in-progress set
  const [deleting, setDeleting] = useState<Set<string>>(new Set())

  useEffect(() => {
    staffApi.getAll()
      .then(rows => setStaff(rows))
      .catch(err => setStaffError(err instanceof Error ? err.message : 'Could not load staff.'))
      .finally(() => setStaffLoading(false))
  }, [])

  async function deleteUser(user: StaffUser) {
    if (!confirm(`Delete ${user.name} (${user.email})?`)) return
    setDeleting(prev => new Set(prev).add(user.id))
    try {
      await staffApi.remove(user.id)
      setStaff(prev => prev.filter(u => u.id !== user.id))
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Could not delete user.')
    } finally {
      setDeleting(prev => { const s = new Set(prev); s.delete(user.id); return s })
    }
  }

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault()
    if (!resetTarget) return
    setResetError('')
    setResetSaving(true)
    try {
      await staffApi.resetPassword(resetTarget.id, newPw)
      setResetTarget(null)
      setNewPw('')
    } catch (err) {
      setResetError(err instanceof Error ? err.message : 'Could not reset password.')
    } finally {
      setResetSaving(false)
    }
  }

  return (
    <div className="max-w-2xl space-y-6">

      {/* ── Clinic Settings ── */}
      <form onSubmit={handleSave} className="bg-white rounded-xl border border-slate-100 p-6 space-y-4">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">{t('manager.clinicSettings')}</h3>

        <div>
          <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-1">{t('manager.clinicName')}</label>
          <input value={clinicName} onChange={e => setClinicName(e.target.value)} aria-label={t('manager.clinicName')}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-slate-400 transition-colors" />
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-1">{t('manager.newPassword')}</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}
            placeholder={t('manager.newPasswordPlaceholder')} aria-label={t('manager.newPassword')}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-slate-400 transition-colors" />
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-1">{t('manager.confirmPassword')}</label>
          <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)}
            placeholder={t('manager.confirmPasswordPlaceholder')} aria-label={t('manager.confirmPassword')}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-slate-400 transition-colors" />
        </div>

        <button type="submit"
          className="flex items-center gap-2 bg-[#0F172A] text-white text-xs px-4 py-2.5 rounded-lg hover:bg-slate-700 transition-colors">
          <Save className="w-3.5 h-3.5" />
          {saved ? t('manager.saved') : t('manager.saveChanges')}
        </button>
      </form>

      {/* ── Staff Users ── */}
      <div className="bg-white rounded-xl border border-slate-100 p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-slate-400" />
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Staff Accounts</h3>
        </div>

        {staffLoading && (
          <div className="flex items-center gap-2 py-4 text-slate-400 text-sm">
            <Loader className="w-4 h-4 animate-spin" /> Loading…
          </div>
        )}

        {staffError && (
          <p className="text-xs text-red-500">{staffError}</p>
        )}

        {!staffLoading && !staffError && (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100">
                  {['Name', 'Email', 'Role', 'Joined', 'Actions'].map(h => (
                    <th key={h} className="text-start pb-2 text-slate-400 font-semibold uppercase tracking-wider pe-4 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {staff.length === 0 ? (
                  <tr><td colSpan={5} className="py-8 text-center text-slate-400">No staff registered yet.</td></tr>
                ) : staff.map(u => (
                  <tr key={u.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 pe-4 font-medium text-slate-800 whitespace-nowrap">{u.name}</td>
                    <td className="py-2.5 pe-4 text-slate-500">{u.email}</td>
                    <td className="py-2.5 pe-4">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${ROLE_COLOR[u.role] ?? 'bg-slate-100 text-slate-600'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-2.5 pe-4 text-slate-400 whitespace-nowrap">
                      {new Date(u.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-2.5">
                      <div className="flex items-center gap-1.5">
                        {/* Reset password */}
                        <button
                          onClick={() => { setResetTarget(u); setNewPw(''); setResetError('') }}
                          className="p-1.5 rounded-md hover:bg-amber-50 text-amber-500 transition-colors"
                          title="Reset password"
                        >
                          <KeyRound className="w-3.5 h-3.5" />
                        </button>
                        {/* Delete */}
                        <button
                          onClick={() => deleteUser(u)}
                          disabled={deleting.has(u.id)}
                          className="p-1.5 rounded-md hover:bg-red-50 text-red-400 transition-colors disabled:opacity-40"
                          title="Delete user"
                        >
                          {deleting.has(u.id)
                            ? <span className="w-3.5 h-3.5 border-2 border-red-300 border-t-transparent rounded-full animate-spin inline-block" />
                            : <Trash2 className="w-3.5 h-3.5" />
                          }
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── User Roles ── */}
      <div className="bg-white rounded-xl border border-slate-100 p-6 space-y-3">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">{t('manager.userRoles')}</h3>
        {[
          { role: t('manager.managerAdmin'), perms: t('manager.managerPerms'),      color: 'bg-indigo-50 text-indigo-700'   },
          { role: t('manager.receptionist'), perms: t('manager.receptionistPerms'), color: 'bg-amber-50 text-amber-700'     },
          { role: t('manager.doctorRole'),   perms: t('manager.doctorPerms'),       color: 'bg-emerald-50 text-emerald-700' },
        ].map(u => (
          <div key={u.role} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${u.color}`}>{u.role}</span>
            <span className="text-xs text-slate-400">{u.perms}</span>
          </div>
        ))}
      </div>

      {/* ── Reset Password Modal ── */}
      {resetTarget && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
          onClick={() => setResetTarget(null)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl"
            onClick={e => e.stopPropagation()}>
            <h3 className="text-sm font-bold text-slate-800 mb-1">Reset Password</h3>
            <p className="text-xs text-slate-400 mb-4">
              Set a new password for <span className="font-semibold text-slate-700">{resetTarget.name}</span>
            </p>

            {resetError && (
              <p className="text-xs text-red-500 mb-3">{resetError}</p>
            )}

            <form onSubmit={handleResetPassword} className="space-y-3">
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={newPw}
                  onChange={e => setNewPw(e.target.value)}
                  placeholder="New password (min 8 chars)"
                  minLength={8}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm pr-9 outline-none focus:border-slate-400 transition-colors"
                />
                <button type="button" onClick={() => setShowPw(v => !v)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex gap-2 pt-1">
                <button type="submit" disabled={resetSaving}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-[#0F172A] text-white text-xs py-2 rounded-lg hover:bg-slate-700 transition-colors disabled:opacity-60">
                  {resetSaving
                    ? <span className="w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    : <KeyRound className="w-3.5 h-3.5" />
                  }
                  Reset Password
                </button>
                <button type="button" onClick={() => setResetTarget(null)}
                  className="px-4 py-2 text-xs rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
