import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const initialCategories = [
  { name: 'Modded accounts', slug: 'modded-accounts', sortOrder: 1 },
  { name: 'Money drops', slug: 'money-drops', sortOrder: 2 },
  { name: 'Boosting', slug: 'boosting', sortOrder: 3 },
  { name: 'Other GTA services', slug: 'other-gta-services', sortOrder: 4 },
];

async function main() {
  for (const category of initialCategories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: { name: category.name, sortOrder: category.sortOrder, isActive: true },
      create: category,
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });