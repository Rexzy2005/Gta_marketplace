import { listings, type Listing } from './catalogue';

export type CatalogueRepository = {
  listForStorefront(): Promise<readonly Listing[]>;
};

/**
 * Temporary adapter for the approved sample catalogue. Replace this adapter
 * with the selected database implementation before admin mutations are added.
 */
export const catalogueRepository: CatalogueRepository = {
  async listForStorefront() {
    return [...listings];
  },
};