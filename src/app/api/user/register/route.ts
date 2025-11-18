import bcrypt from "bcryptjs";

import prisma from "@/lib/prisma";
import { RegistrationDTO } from "@/types/authorization";

export async function POST(request: Request) {
  const { password, login, name, repassword }: RegistrationDTO =
    await request.json();

  if (!login || !password || !name || !repassword) {
    return Response.json({ error: "Invalid post data" }, { status: 400 });
  }

  if (password !== repassword) {
    return Response.json({ error: "Passwords do not match" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: login },
  });
  
  if (user) {
    return Response.json({ error: "User already created" }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      name,
      email: login,
      password: hashedPassword,
    },
  });

  return Response.json(
    { message: "User created", id: newUser.id },
    { status: 201 }
  );
}
