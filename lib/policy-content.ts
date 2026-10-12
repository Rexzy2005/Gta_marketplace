export type FaqEntry = {
  question: string;
  answer: string;
};

export const policyPrinciples = [
  {
    label: 'NO CHECKOUT',
    description: 'Orders are not placed or paid for here.',
  },
  {
    label: 'USD SOURCE',
    description: 'Local amounts are indicative conversions.',
  },
  {
    label: 'EXTERNAL HANDOFF',
    description: 'Final details are confirmed with the seller.',
  },
] as const;

export const faqs: readonly FaqEntry[] = [
  {
    question: 'Does Legend Lane process payments?',
    answer: 'No. Legend Lane is a catalogue and order-intent handoff. Payment is not collected on this website, and copying or sending a brief does not place an order.',
  },
  {
    question: 'What does the displayed price mean?',
    answer: 'USD is the authoritative reference currency. Any EUR, GBP, or other local amount is an indicative display conversion from the USD value and is not a separately maintained price.',
  },
  {
    question: 'Why do some listings show a range or quote?',
    answer: 'Some services cannot be represented by one fixed package. A range shows configured indicative boundaries, while a quote listing means the details and final price must be confirmed with the seller.',
  },
  {
    question: 'How do I continue an order conversation?',
    answer: 'Review the listing, choose any available package, add relevant notes, and copy the generated brief. When a valid Discord or Telegram destination is configured, a handoff link will appear in the brief.',
  },
  {
    question: 'What information should I include in my notes?',
    answer: 'Include only the details needed for the seller to understand your request. Do not enter passwords, payment credentials, recovery codes, or other sensitive secrets into the brief.',
  },
];