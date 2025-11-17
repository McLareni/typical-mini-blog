import prisma from "@/lib/prisma";

export default async function globalTeardown() {
  await prisma.post.deleteMany({
    where: { id: { in: [1, 2] } },
  });

  await prisma.$disconnect();
}
