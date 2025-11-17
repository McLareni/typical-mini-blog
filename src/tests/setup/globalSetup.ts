import prisma from "@/lib/prisma";

export default async function globalSetup() {
  await prisma.post.createMany({
    data: [
      { id: 1, title: "Wand", content: "Magic wand" },
      { id: 2, title: "Broomstick", content: "Flying broom" },
    ],
    skipDuplicates: true,
  });
}
