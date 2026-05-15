import type { WaitingStatus, PaymentStatus } from '../types'

type AnyStatus = WaitingStatus | PaymentStatus

const cfg: Record<AnyStatus, { bg: string; text: string; dot: string }> = {
  Waiting:       { bg: 'bg-amber-50',   text: 'text-amber-700',   dot: 'bg-amber-400'   },
  'In Treatment':{ bg: 'bg-blue-50',    text: 'text-blue-700',    dot: 'bg-blue-500'    },
  Completed:     { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  Paid:          { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  Partial:       { bg: 'bg-amber-50',   text: 'text-amber-700',   dot: 'bg-amber-400'   },
  Unpaid:        { bg: 'bg-red-50',     text: 'text-red-600',     dot: 'bg-red-500'     },
}

export default function WaitingBadge({ status }: { status: AnyStatus }) {
  const c = cfg[status]
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {status}
    </span>
  )
}
