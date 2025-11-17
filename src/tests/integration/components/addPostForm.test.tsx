/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Form from "@/components/AddPostForm/AddPostForm";

const pushMock = jest.fn();
const refreshMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    refresh: refreshMock,
  }),
}));

describe("Form API integration", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve({ id: 1 }) })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("createPost sends correct request and clears form", async () => {
    render(<Form />);

    const titleInput = screen.getByLabelText(/title/i);
    const contentInput = screen.getByLabelText(/content/i);
    const submitButton = screen.getByRole("button", { name: /add post/i });

    await userEvent.type(titleInput, "Test Post");
    await userEvent.type(contentInput, "Test content");

    await userEvent.click(submitButton);

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/posts",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Test Post",
          content: "Test content",
          tags: [],
        }),
      })
    );

    expect(titleInput).toHaveValue("");
    expect(contentInput).toHaveValue("");

    expect(refreshMock).toHaveBeenCalled();
  });

  test("editPost sends PATCH request and navigates", async () => {
    const defaultValues = {
      id: 1,
      title: "Old",
      content: "Old content",
      tags: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      excerpt: "Old excerpt",
    };
    render(<Form defaultvalues={defaultValues} />);

    const titleInput = screen.getByLabelText(/title/i);
    const submitButton = screen.getByRole("button", { name: /edit post/i });

    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, "Updated Title");
    await userEvent.click(submitButton);

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/posts/1",
      expect.objectContaining({
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Updated Title",
          content: "Old content",
          tags: [],
        }),
      })
    );

    expect(pushMock).toHaveBeenCalledWith("/post/1");
  });
});
