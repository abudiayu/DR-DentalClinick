import type { PaymentStatus, AppointmentStatus } from '../types'

type Status = PaymentStatus | AppointmentStatus

const config: Record<Status, { bg: string; text: string; dot: string }> = {
  Paid:       { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  Partial:    { bg: 'bg-amber-50',   text: 'text-amber-700',   dot: 'bg-amber-500'   },
  Unpaid:     { bg: 'bg-red-50',     text: 'text-red-600',     dot: 'bg-red-500'     },
  Approved:   { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  Pending:    { bg: 'bg-amber-50',   text: 'text-amber-700',   dot: 'bg-amber-500'   },
  Cancelled:  { bg: 'bg-red-50',     text: 'text-red-600',     dot: 'bg-red-500'     },
}

export default function StatusBadge({ status }: { status: Status }) {
  const c = config[status]
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {status}
    </span>
  )
}
