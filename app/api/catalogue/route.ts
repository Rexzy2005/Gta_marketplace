import { catalogueRepository } from '@/lib/catalogue-repository';

export async function GET() {
  const listings = await catalogueRepository.listForStorefront();

  return Response.json({ listings });
}