/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";

import PostsList from "@/components/PostsList/PostList";
import { POST_TAGS } from "@/utils/Constants/Post";

describe("Post list", () => {
  test("renders list with posts", () => {
    const posts = [
      {
        id: 1,
        title: "Sample Post",
        excerpt: "This is a sample post content.",
        tags: [POST_TAGS[0], POST_TAGS[1]],
      },
      {
        id: 2,
        title: "Second Post",
        excerpt: "This is a sample post content.",
        tags: [POST_TAGS[3]],
      },
    ];
    render(<PostsList posts={posts} />);

    const cards = screen.getAllByRole("link");
    expect(cards.length).toBe(posts.length);
  });
});
