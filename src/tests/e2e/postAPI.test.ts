// src/tests/e2e/posts.e2e.test.ts

import { GET, DELETE } from "@/app/api/posts/[id]/route";
import { POST } from "@/app/api/posts/route";
import prisma from "@/lib/prisma";

import { TEST_USER } from "../setup/globalSetup";

describe("E2E: Posts API", () => {
  let createdPostId: number;

  afterAll(async () => {
    try {
      if (createdPostId) {
        await prisma.post.delete({ where: { id: createdPostId } });
      }
    } catch {
      console.log("Post already deleted");
    }
    await prisma.$disconnect();
  });

  it("creates a new post and retrieves it", async () => {
    const newPost = {
      title: "E2E Test Post",
      content: "Testing content",
      tags: ["Test"],
      authorId: 1,
    };

    const postRes = await POST(
      new Request("http://localhost/api/posts", {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: {
          Authorization: `Bearer ${TEST_USER.accessToken}`,
        },
      })
    );

    expect(postRes.status).toBe(201);
    const postData = await postRes.json();
    createdPostId = postData.id;

    expect(postData).toMatchObject({
      title: "E2E Test Post",
      content: "Testing content",
      tags: ["Test"],
    });

    const getRes = await GET(
      new Request(`http://localhost/api/posts/${createdPostId}`),
      {
        params: Promise.resolve({ id: String(createdPostId) }),
      }
    );

    expect(getRes.status).toBe(200);
    const getData = await getRes.json();
    expect(getData.id).toBe(createdPostId);
    expect(getData.title).toBe("E2E Test Post");
  });

  it("deletes the post", async () => {
    if (!createdPostId) return;

    const deleteRes = await DELETE(
      new Request(`http://localhost/api/posts/${createdPostId}`, {
        method: "DELETE",
      }),
      { params: Promise.resolve({ id: String(createdPostId) }) }
    );

    expect(deleteRes.status).toBe(200);
    const deleteData = await deleteRes.json();
    expect(deleteData.message).toBe("Post deleted");

    const getRes = await GET(
      new Request(`http://localhost/api/posts/${createdPostId}`),
      {
        params: Promise.resolve({ id: String(createdPostId) }),
      }
    );

    expect(getRes.status).toBe(404);
  });
});
