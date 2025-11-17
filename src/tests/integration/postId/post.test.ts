import { DELETE, GET, PATCH } from "@/app/api/posts/[id]/route";

describe("GET /api/posts/[id]", () => {
  it("returns a post", async () => {
    const res = await GET(new Request("http://localhost/api/posts/1"), {
      params: Promise.resolve({ id: "1" }),
    });

    expect(res.status).toBe(200);

    const data = await res.json();

    expect(data).toHaveProperty("id", 1);
    expect(data).toHaveProperty("title");
    expect(data).toHaveProperty("content");
  });
});

describe("PATCH /api/posts/[id]", () => {
  it("updates a post", async () => {
    const updatedData = {
      title: "Updated Wand",
      content: "Updated magic wand content.",
      tags: ["Magic", "Updated"],
    };

    const res = await PATCH(
      new Request("http://localhost/api/posts/1", {
        method: "PATCH",
        body: JSON.stringify(updatedData),
      }),
      { params: Promise.resolve({ id: "1" }) }
    );

    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data).toHaveProperty("id", 1);
    expect(data).toHaveProperty("title", updatedData.title);
    expect(data).toHaveProperty("content", updatedData.content);
    expect(data.tags).toEqual(expect.arrayContaining(updatedData.tags));
    expect(data.tags.length).toBe(updatedData.tags.length);
    expect(new Date(data.updatedAt)).toBeInstanceOf(Date);
  });
});

describe("DELETE /api/posts/[id]", () => {
  it("deletes a post", async () => {
    const res = await DELETE(
      new Request("http://localhost/api/posts/1", {
        method: "DELETE",
      }),
      { params: Promise.resolve({ id: "1" }) }
    );

    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data).toHaveProperty("message", "Post deleted");

    const getRes = await GET(new Request("http://localhost/api/posts/1"), {
      params: Promise.resolve({ id: "1" }),
    });
    expect(getRes.status).toBe(404);
  });
});
