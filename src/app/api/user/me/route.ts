import jwt from "jsonwebtoken";

import prisma from "@/lib/prisma";
import { userValidId } from "@/utils/validation/validUser";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

export async function GET(request: Request) {
  try {
    const token = request.headers.get("Authorization")?.split(" ")[1];
    const userId = userValidId(token);

    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    if (user) {
      const access_token = jwt.sign({ userId: user.id }, ACCESS_TOKEN_SECRET!, {
        expiresIn: "1h",
      });

      const refresh_token = jwt.sign(
        { userId: user.id },
        REFRESH_TOKEN_SECRET!,
        {
          expiresIn: "7d",
        }
      );

      return new Response(
        JSON.stringify({
          id: user.id,
          email: user.email,
          name: user.name,
          accessToken: access_token,
          refreshToken: refresh_token,
          createdAt: user.createdAt,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error: any) {
    if (error.code === "P2025") {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
