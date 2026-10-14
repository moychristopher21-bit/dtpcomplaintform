export type Severity = 'mild' | 'ruined' | 'investigation'

export const SEVERITY_OPTIONS: { value: Severity; label: string; code: string }[] = [
  { value: 'mild', label: 'Mildly annoying', code: 'Class C' },
  { value: 'ruined', label: 'Day officially ruined', code: 'Class B' },
  { value: 'investigation', label: 'I demand an investigation', code: 'Class A' },
]

const RULINGS: Record<Severity, string[]> = {
  mild: [
    'Complaint acknowledged. You are authorized to mutter “ugh” up to three times today.',
    'The Department grants you one (1) eye roll, to be used at your discretion.',
    'Ruling: Annoying, but survivable. Please proceed with your day at 94% enthusiasm.',
    'You are entitled to a small snack as compensation. Medium snacks require additional paperwork.',
    'The Department recognizes your inconvenience and awards you a brief, meaningful stare out the window.',
  ],
  ruined: [
    'Your day has been officially declared ruined. You may now wear sweatpants without judgment.',
    'Ruling: You are excused from being cheerful until at least 4:00 PM.',
    'The Department awards you one (1) dramatic flop onto the nearest couch.',
    'Compensation approved: You may tell this story to at least two friends, with mild exaggeration.',
    'You are hereby granted an early bedtime and full permission to say “today was a lot.”',
  ],
  investigation: [
    'An investigation has been opened. Lead detective: a very serious pigeon. Expected findings: inconclusive.',
    'The Department has formed a task force of three interns and a clipboard. Updates will not be provided.',
    'Ruling: This matter has been escalated to the Sub-Committee of Minor Grievances, which meets never.',
    'Investigators have reviewed the evidence and concluded that, yes, that was rude. Case closed.',
    'A formal inquiry has begun. In the meantime, you are entitled to one deeply offended gasp.',
  ],
}

const KEYWORD_RULINGS: { keywords: string[]; ruling: string }[] = [
  {
    keywords: ['coffee', 'latte', 'espresso', 'tea'],
    ruling: 'You are entitled to one replacement coffee and a dramatic sigh.',
  },
  {
    keywords: ['wifi', 'wi-fi', 'internet', 'signal'],
    ruling: 'The Department orders your router to be turned off and on again, with feeling.',
  },
  {
    keywords: ['sock', 'socks'],
    ruling: 'The missing sock has been placed on the national registry. Its partner may grieve openly.',
  },
  {
    keywords: ['charger', 'battery', 'phone'],
    ruling: 'You are granted priority access to the nearest outlet and a sympathetic nod from strangers.',
  },
  {
    keywords: ['toast', 'burnt', 'burned'],
    ruling: 'Your toast has been formally reprimanded. You may scrape it with righteous indignation.',
  },
]

export type Ruling = {
  caseNumber: string
  ruling: string
  severity: (typeof SEVERITY_OPTIONS)[number]
  issuedAt: string
}

export function issueRuling(complaint: string, severity: Severity): Ruling {
  const text = complaint.toLowerCase()
  const keywordMatch = KEYWORD_RULINGS.find(({ keywords }) =>
    keywords.some((keyword) => text.includes(keyword)),
  )
  const pool = RULINGS[severity]
  const ruling = keywordMatch?.ruling ?? pool[Math.floor(Math.random() * pool.length)]
  const year = new Date().getFullYear()
  const serial = Math.floor(10000 + Math.random() * 90000)

  return {
    caseNumber: `DTP-${year}-${serial}`,
    ruling,
    severity: SEVERITY_OPTIONS.find((option) => option.value === severity) ?? SEVERITY_OPTIONS[0],
    issuedAt: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  }
}
