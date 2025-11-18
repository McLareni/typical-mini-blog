import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import prisma from "@/lib/prisma";
import { LoginDTO } from "@/types/authorization";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

export async function POST(request: Request) {
  const { password, login }: LoginDTO = await request.json();

  console.log({ password, login });
  

  if (!login || !password) {
    return Response.json({ error: "Invalid post data" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: login },
  });

  if (!user) {
    return Response.json(
      { error: "Invalid login or password" },
      { status: 401 }
    );
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return Response.json(
      { error: "Invalid login or password" },
      { status: 401 }
    );
  }

  const access_token = jwt.sign({ userId: user.id }, ACCESS_TOKEN_SECRET!, {
    expiresIn: "1h",
  });

  const refresh_token = jwt.sign({ userId: user.id }, REFRESH_TOKEN_SECRET!, {
    expiresIn: "7d",
  });

  const { id, email, name } = user;

  const response = {
    id,
    email,
    name,
    accessToken: access_token,
    refreshToken: refresh_token,
  };

  return Response.json(response, { status: 200 });
}
