import prisma from "@/lib/prisma";
import { PostDetailDTO } from "@/types/post";
import { generateExcerpt } from "@/utils/function/generateValidExcerpt";
import { userValidId } from "@/utils/validation/validUser";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: number }> }
) {
  const { id } = await params;

  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
  });

  if (!post) {
    return Response.json(
      { error: `Post with id ${id} not found` },
      { status: 404 }
    );
  }

  return Response.json(post, { status: 200 });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: number }> }
) {
  const { id } = await params;
  try {
    const token = request.headers.get("Authorization")?.split(" ")[1];
    const userId = userValidId(token);

    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
    });

    if (!userId || userId !== post?.authorId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const deletedPost = await prisma.post.delete({
      where: { id: Number(id) },
    });

    return new Response(
      JSON.stringify({ message: "Post deleted", post: deletedPost }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    if (error.code === "P2025") {
      return new Response(JSON.stringify({ message: "Post not found" }), {
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

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: number }> }
) {
  const { id } = await params;
  const token = request.headers.get("Authorization")?.split(" ")[1];
  const userId = userValidId(token);

  const updatePost = await prisma.post.findFirst({ where: { id: +id } });

  if (!userId || !updatePost || userId !== updatePost?.authorId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: PostDetailDTO;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ message: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const updated = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        title: body.title,
        content: body.content,
        tags: body.tags,
        excerpt: generateExcerpt(body.content),
      },
    });

    return new Response(JSON.stringify(updated), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    if (error?.code === "P2025") {
      return new Response(JSON.stringify({ message: "Post not found" }), {
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
