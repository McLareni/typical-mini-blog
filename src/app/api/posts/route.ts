import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";
import { PostDetailDTO, PostListDTO } from "@/types/post";

export async function GET() {
  const posts: PostListDTO[] | [] = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      excerpt: true,
      tags: true,
    },
  });

  return Response.json(posts, { status: 200 });
}

export async function POST(request: Request) {
  const body: PostDetailDTO = await request.json();

  if (!body.title) {
    return Response.json({ error: "Invalid post data" }, { status: 400 });
  }

  const newPost = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content || null,
      excerpt: body.content?.slice(0, 30) || null,
      tags: body.tags || [],
    },
  });

  revalidatePath("/");
  return Response.json(newPost, { status: 201 });
}
