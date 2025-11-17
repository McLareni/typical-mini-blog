/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { POST_TAGS } from "@/utils/Constants/Post";

import AddForm from "../../components/AddPostForm/AddPostForm";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
}));

describe("Form component", () => {
  test("renders form with title and content fields", () => {
    render(<AddForm />);

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/content/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /add post/i })
    ).toBeInTheDocument();

    POST_TAGS.forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  test("addTag() toggles tags correctly", async () => {
    render(<AddForm />);
    const tagButton = screen.getByText(POST_TAGS[0]);

    await userEvent.click(tagButton);
    expect(tagButton).toHaveClass("active");

    await userEvent.click(tagButton);
    expect(tagButton).not.toHaveClass("active");
  });
});
