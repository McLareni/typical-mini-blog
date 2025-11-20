import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";
import { PostDetailDTO, PostListDTO } from "@/types/post";
import { generateExcerpt } from "@/utils/function/generateValidExcerpt";
import { userValidId } from "@/utils/validation/validUser";

export async function GET() {
  const posts: PostListDTO[] | [] = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      excerpt: true,
      tags: true,
      author: {
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });

  return Response.json(posts, { status: 200 });
}

export async function POST(request: Request) {
  const body: PostDetailDTO = await request.json();
  const token = request.headers.get("Authorization")?.split(" ")[1];

  const validUserId = userValidId(token);

  if (!validUserId || validUserId !== body.authorId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!body.title) {
    return Response.json({ error: "Invalid post data" }, { status: 400 });
  }

  const newPost = await prisma.post.create({
    data: {
      authorId: body.authorId,
      title: body.title,
      content: body.content || null,
      excerpt: generateExcerpt(body.content) || null,
      tags: body.tags || [],
    },
  });

  revalidatePath("/");
  return Response.json(newPost, { status: 201 });
}
