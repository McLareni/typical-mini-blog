import { render, screen } from "@testing-library/react";

import PostCard from "@/components/PostCard/PostCard";
import { POST_TAGS } from "@/utils/Constants/Post";

import { TEST_USER } from "../setup/globalSetup";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
}));

describe("Form component", () => {
  test("renders form with title and content fields", () => {
    const post = {
      id: 1,
      title: "Sample Post",
      excerpt: "This is a sample post content.",
      tags: [POST_TAGS[0], POST_TAGS[1]],
      author: TEST_USER,
    };
    render(<PostCard post={post} />);

    expect(screen.getByText("Sample Post")).toBeInTheDocument();
    expect(
      screen.getByText("This is a sample post content.")
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Sample Post/i })).toHaveAttribute(
      "href",
      "/post/1"
    );

    post.tags.forEach((tag) => {
      const tagEl = screen.getByText(tag);
      expect(tagEl).toBeInTheDocument();
      expect(tagEl).toHaveClass("active");
    });
  });
});
