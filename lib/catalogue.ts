export type PricingMode = 'starting' | 'quote' | 'range';

export type PackageOption = {
  id: string;
  name: string;
  description: string;
  priceUsd: number;
  isActive: boolean;
};

export type VariablePricing = {
  minimumUsd: number;
  maximumUsd: number | null;
};

export type Listing = {
  id: string;
  name: string;
  category: string;
  eyebrow: string;
  description: string;
  priceUsd: number | null;
  pricing: PricingMode;
  packages: PackageOption[];
  variablePricing: VariablePricing | null;
  image: string;
  tone: string;
  availability: string;
};

export const categories = ['All services', 'Account support', 'Cash drops', 'Rank & unlocks', 'Other services'];

export const listings: Listing[] = [
  {
    id: 'll-001',
    name: 'Account support',
    category: 'Account support',
    eyebrow: '01 / account',
    description: 'A configurable service slot for account setup and progression requests.',
    priceUsd: 45,
    pricing: 'starting',
    packages: [
      { id: 'll-001-standard', name: 'Standard package', description: 'Administrator-configured fixed-price option.', priceUsd: 45, isActive: true },
      { id: 'll-001-expanded', name: 'Expanded package', description: 'Administrator-configured extended option.', priceUsd: 75, isActive: true },
    ],
    variablePricing: null,
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1000&q=85',
    tone: 'lime',
    availability: 'Configure to publish',
  },
  {
    id: 'll-002',
    name: 'Cash drop brief',
    category: 'Cash drops',
    eyebrow: '02 / economy',
    description: 'A flexible listing template for approved in-game economy services.',
    priceUsd: null,
    pricing: 'range',
    packages: [],
    variablePricing: { minimumUsd: 25, maximumUsd: 100 },
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=85',
    tone: 'red',
    availability: 'Configure to publish',
  },
  {
    id: 'll-003',
    name: 'Rank & unlocks',
    category: 'Rank & unlocks',
    eyebrow: '03 / progression',
    description: 'A quote-led service card for detailed progression requirements.',
    priceUsd: null,
    pricing: 'quote',
    packages: [],
    variablePricing: null,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=85',
    tone: 'blue',
    availability: 'Configure to publish',
  },
];

export const currencies = {
  USD: { symbol: '$', rate: 1 },
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.78 },
} as const;

export type CurrencyCode = keyof typeof currencies;

export function displayAmount(amountUsd: number, currency: CurrencyCode): string {
  const value = Math.round(amountUsd * currencies[currency].rate);
  return `${currencies[currency].symbol}${value}`;
}

export function displayPrice(listing: Listing, currency: CurrencyCode): string {
  if (listing.pricing === 'quote') return 'QUOTE';
  if (listing.pricing === 'range' && listing.variablePricing) {
    const minimum = displayAmount(listing.variablePricing.minimumUsd, currency);
    const maximum = listing.variablePricing.maximumUsd === null ? '' : `-${displayAmount(listing.variablePricing.maximumUsd, currency)}`;
    return `${minimum}${maximum}`;
  }
  if (listing.priceUsd === null) return 'QUOTE';
  return displayAmount(listing.priceUsd, currency);
}