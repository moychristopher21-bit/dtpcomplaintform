import { Landmark } from 'lucide-react'

export function SiteHeader() {
  return (
    <header>
      <div className="bg-secondary text-secondary-foreground">
        <p className="mx-auto max-w-5xl px-4 py-1.5 text-xs">
          A fictional, just-for-fun website. Not affiliated with any real government agency.
        </p>
      </div>
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-5">
          <div
            aria-hidden="true"
            className="flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-accent bg-primary"
          >
            <Landmark className="size-6 text-accent" />
          </div>
          <div>
            <p className="font-serif text-xl font-semibold leading-tight md:text-2xl">
              The Department of Tiny Problems
            </p>
            <p className="text-sm text-primary-foreground/75">
              Office of Minor Grievances &amp; Small Disappointments
            </p>
          </div>
        </div>
        <div className="h-1 bg-accent" />
      </div>
    </header>
  )
}
