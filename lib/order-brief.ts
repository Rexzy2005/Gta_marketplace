import { displayAmount, displayPrice, type CurrencyCode, type Listing } from './catalogue';

export const MAX_ORDER_NOTE_LENGTH = 500;

export type OrderBriefInput = {
  listing: Listing;
  currency: CurrencyCode;
  selectedPackageId?: string;
  notes?: string;
};

function cleanNotes(notes: string | undefined): string {
  return (notes ?? '').replace(/\s+/g, ' ').trim().slice(0, MAX_ORDER_NOTE_LENGTH);
}

export function buildOrderSummary({ listing, currency, selectedPackageId, notes }: OrderBriefInput): string {
  const selectedPackage = listing.packages.find((option) => option.id === selectedPackageId && option.isActive);
  const basePrice = selectedPackage?.priceUsd ?? listing.priceUsd;
  const referencePrice = basePrice === null ? displayPrice(listing, 'USD') : displayAmount(basePrice, 'USD');
  const displayValue = basePrice === null ? displayPrice(listing, currency) : displayAmount(basePrice, currency);
  const lines = [
    'LEGEND LANE / ORDER BRIEF',
    `Listing: ${listing.name} (${listing.id})`,
    selectedPackage ? `Package: ${selectedPackage.name}` : 'Package: Not selected',
    `USD reference: ${referencePrice}`,
    `Indicative display: ${displayValue} ${currency}`,
    'Status: Conversation required; no payment or order has been placed.',
  ];
  const cleanNote = cleanNotes(notes);
  if (cleanNote) lines.push(`Notes: ${cleanNote}`);
  return lines.join('\n');
}