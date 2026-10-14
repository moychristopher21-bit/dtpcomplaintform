'use client'

import { useEffect, useRef, useState } from 'react'
import { FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { RulingCard } from '@/components/ruling-card'
import { SEVERITY_OPTIONS, issueRuling, type Ruling, type Severity } from '@/lib/rulings'

type Filed = { ruling: Ruling; name: string; subject: string }

const inputClass =
  'w-full rounded-md border border-input bg-card px-3 py-2.5 text-base text-foreground placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/30'

export function ComplaintForm() {
  const [severity, setSeverity] = useState<Severity>('mild')
  const [filed, setFiled] = useState<Filed | null>(null)
  const rulingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (filed) rulingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [filed])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const subject = String(data.get('subject') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()

    setFiled({
      ruling: issueRuling(`${subject} ${message}`, severity),
      name,
      subject,
    })
  }

  return (
    <div className="flex flex-col gap-8">
      <section aria-labelledby="form-heading" className="rounded-md border bg-card shadow-sm">
        <div className="flex items-center gap-3 border-b px-5 py-4 md:px-6">
          <FileText className="size-5 text-primary" aria-hidden="true" />
          <div>
            <h2 id="form-heading" className="font-serif text-lg font-semibold text-primary">
              Form TP-1: Official Complaint
            </h2>
            <p className="text-sm text-muted-foreground">All fields are required. Pettiness is encouraged.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-5 md:p-6">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-sm font-semibold">
                Full name
              </label>
              <input id="name" name="name" type="text" required autoComplete="name" placeholder="Jane Q. Public" className={inputClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-semibold">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="jane@example.com"
                className={inputClass}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="subject" className="text-sm font-semibold">
              Subject
            </label>
            <input id="subject" name="subject" type="text" required maxLength={80} placeholder="My coffee went cold." className={inputClass} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-sm font-semibold">
              Describe the incident
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              maxLength={1000}
              placeholder="I set it down for one minute to answer an email. When I returned, it was room temperature. I feel betrayed."
              className={`${inputClass} resize-y`}
            />
          </div>

          <fieldset className="flex flex-col gap-2">
            <legend className="mb-1.5 text-sm font-semibold">How serious does this feel?</legend>
            <div className="grid gap-3 sm:grid-cols-3">
              {SEVERITY_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className="flex cursor-pointer items-start gap-3 rounded-md border border-input bg-card p-3 transition-colors hover:bg-muted has-checked:border-primary has-checked:bg-secondary has-focus-visible:ring-3 has-focus-visible:ring-ring/30"
                >
                  <input
                    type="radio"
                    name="severity"
                    value={option.value}
                    checked={severity === option.value}
                    onChange={() => setSeverity(option.value)}
                    className="mt-1 size-4 accent-primary"
                  />
                  <span className="flex flex-col">
                    <span className="text-sm font-medium">{option.label}</span>
                    <span className="text-xs text-muted-foreground">{option.code}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="flex flex-col gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
              Nothing is sent or stored. Your ruling is generated right here in your browser.
            </p>
            <Button type="submit" size="lg" className="h-11 px-6 text-base font-semibold">
              File Official Complaint
            </Button>
          </div>
        </form>
      </section>

      <div ref={rulingRef} aria-live="polite" className="scroll-mt-6">
        {filed ? (
          <RulingCard ruling={filed.ruling} name={filed.name} subject={filed.subject} />
        ) : (
          <div className="rounded-md border border-dashed border-input px-5 py-8 text-center text-sm text-muted-foreground">
            Your official ruling will appear here once your complaint has been filed.
          </div>
        )}
      </div>
    </div>
  )
}
