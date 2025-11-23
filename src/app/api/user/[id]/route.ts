import prisma from "@/lib/prisma";
import { userValidId } from "@/utils/validation/validUser";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const token = request.headers.get("Authorization")?.split(" ")[1];
  const userId = userValidId(token);

  const user = await prisma.user.findFirst({ where: { id: +id } });

  if (!userId || !user || userId !== user.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const posts = await prisma.post.findMany({
      where: { authorId: user.id },
      select: {
        id: true,
        title: true,
        content: true,
        tags: true,
        excerpt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return new Response(
      JSON.stringify({
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
        posts: posts || [],
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.log(error);

    return new Response(
      JSON.stringify("Not found information about this user"),
      { status: 404 }
    );
  }
}
