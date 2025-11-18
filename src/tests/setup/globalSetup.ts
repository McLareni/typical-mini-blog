import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import prisma from "@/lib/prisma";
import { UserDTO } from "@/types/user";

export const TEST_USER_ID = 1;
export const TEST_USER_PASSWORD = "password123";

const token = jwt.sign(
  { userId: TEST_USER_ID },
  process.env.ACCESS_TOKEN_SECRET!,
  { expiresIn: "1h" }
);

export const TEST_USER: UserDTO = {
  id: TEST_USER_ID,
  name: "testUser",
  email: "TestUser",
  createdAt: new Date(),
  updatedAt: new Date(),
  Posts: [],
  accessToken: token,
};

export default async function globalSetup() {
  const hashedPassword = await bcrypt.hash(TEST_USER_PASSWORD, 10);
  await prisma.user.createMany({
    data: [
      {
        id: TEST_USER.id,
        name: TEST_USER.name,
        email: TEST_USER.email,
        password: hashedPassword,
      },
    ],
    skipDuplicates: true,
  });

  await prisma.post.createMany({
    data: [
      { id: 1, title: "Wand", content: "Magic wand", authorId: 1 },
      { id: 2, title: "Broomstick", content: "Flying broom", authorId: 1 },
    ],
    skipDuplicates: true,
  });
}
