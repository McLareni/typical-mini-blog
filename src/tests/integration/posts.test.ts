import { GET, POST } from "@/app/api/posts/route";
import prisma from "@/lib/prisma";

import { TEST_USER_ID, TEST_USER } from "../setup/globalSetup";

describe("GET /api/posts", () => {
  it("returns a posts", async () => {
    const res = await GET();

    expect(res.status).toBe(200);
    const data = await res.json();

    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
    expect(data[0]).toHaveProperty("id");
    expect(data[0]).toHaveProperty("title");
    expect(data[0]).toHaveProperty("excerpt");
  });
});

let createdPostId: number;
describe("POST /api/posts", () => {
  it("creates a new post", async () => {
    const newPost = {
      title: "Test Post",
      content: "This is a test post content.",
      tags: ["Food"],
      authorId: 1,
    };
    const res = await POST(
      new Request("http://localhost/api/posts", {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: {
          Authorization: `Bearer ${TEST_USER.accessToken}`,
        },
      })
    );

    expect(res.status).toBe(201);
    const data = await res.json();

    createdPostId = data.id;

    expect(data).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        title: expect.any(String),
        content: expect.any(String),
        tags: expect.any(Array),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        excerpt: expect.any(String),
        authorId: expect.any(Number),
      })
    );

    expect(data.tags).toEqual(expect.arrayContaining(["Food"]));
    expect(data.excerpt.length).toBeLessThan(30);
  });

  afterAll(async () => {
    if (createdPostId) {
      await prisma.post.delete({
        where: { id: createdPostId },
      });
    }
  });
});
