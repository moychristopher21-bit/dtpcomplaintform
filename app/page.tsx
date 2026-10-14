import { ComplaintForm } from '@/components/complaint-form'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

const EXAMPLE = {
  complaint: 'My coffee went cold.',
  ruling: 'You are entitled to one replacement coffee and a dramatic sigh.',
}

export default function Page() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pt-10 md:pt-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <aside className="flex flex-col gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Public Services
              </p>
              <h1 className="mt-2 font-serif text-3xl font-semibold leading-tight text-primary text-balance md:text-4xl">
                File a complaint about life&apos;s smallest inconveniences
              </h1>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Something mildly irritating happened? Our highly unqualified staff stands ready to review your
                grievance and issue a binding*, official ruling.
              </p>
              <p className="mt-2 text-xs text-muted-foreground">*Not binding.</p>
            </div>

            <div className="rounded-md border bg-card p-4">
              <h2 className="text-sm font-semibold text-primary">Example case</h2>
              <dl className="mt-3 flex flex-col gap-3 text-sm">
                <div>
                  <dt className="text-muted-foreground">Complaint</dt>
                  <dd className="font-medium">&ldquo;{EXAMPLE.complaint}&rdquo;</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Ruling</dt>
                  <dd className="font-serif text-base">&ldquo;{EXAMPLE.ruling}&rdquo;</dd>
                </div>
              </dl>
            </div>

            <ol className="flex flex-col gap-3 text-sm">
              {['Describe your tiny problem.', 'Choose how serious it feels.', 'Receive your official ruling.'].map(
                (step, index) => (
                  <li key={step} className="flex items-center gap-3">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ),
              )}
            </ol>
          </aside>

          <ComplaintForm />
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
