import { Stamp } from 'lucide-react'
import type { Ruling } from '@/lib/rulings'

type RulingCardProps = {
  ruling: Ruling
  name: string
  subject: string
}

export function RulingCard({ ruling, name, subject }: RulingCardProps) {
  return (
    <section
      aria-labelledby="ruling-heading"
      className="animate-in fade-in slide-in-from-bottom-2 rounded-md border-2 border-primary bg-card duration-300"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 bg-primary px-5 py-3 text-primary-foreground">
        <h2 id="ruling-heading" className="font-serif text-lg font-semibold">
          Official Ruling
        </h2>
        <p className="font-mono text-sm">Case No. {ruling.caseNumber}</p>
      </div>

      <div className="flex flex-col gap-5 p-5 md:p-6">
        <dl className="grid gap-3 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-muted-foreground">Complainant</dt>
            <dd className="font-medium">{name}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Subject</dt>
            <dd className="font-medium">{subject}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Severity</dt>
            <dd className="font-medium">
              {ruling.severity.label} ({ruling.severity.code})
            </dd>
          </div>
        </dl>

        <blockquote className="border-l-4 border-accent bg-muted px-4 py-4 font-serif text-xl leading-relaxed text-pretty md:text-2xl">
          {ruling.ruling}
        </blockquote>

        <div className="flex flex-wrap items-end justify-between gap-4 border-t pt-4">
          <div className="text-sm text-muted-foreground">
            <p>Issued {ruling.issuedAt}</p>
            <p>By order of the Assistant Deputy of Small Stuff</p>
          </div>
          <div
            aria-hidden="true"
            className="flex -rotate-6 items-center gap-2 rounded border-2 border-destructive px-3 py-1 text-sm font-bold uppercase tracking-widest text-destructive"
          >
            <Stamp className="size-4" />
            Ruled upon
          </div>
        </div>
      </div>
    </section>
  )
}
