import jwt from "jsonwebtoken";

export function userValidId(token: string | undefined): number {
  try {
    const validUserId = jwt.verify(
      token || "",
      process.env.ACCESS_TOKEN_SECRET || ""
    ) as { userId: number };
    return validUserId.userId;
  } catch {
    return 0;
  }
}
