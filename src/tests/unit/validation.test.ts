/**
 * @jest-environment node
*/

import { validateNewPost } from "@/utils/validation/newPostValidation";

describe("validateNewPost()", () => {
  it("should return valid: true for valid title and content", () => {
    const result = validateNewPost("Test Post", "This is test content");
    expect(result.valid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it("should return invalid for empty title", () => {
    expect(validateNewPost("", "Some content").valid).toBe(false);
  });

  it("should return invalid for title longer than 100 characters", () => {
    expect(validateNewPost("a".repeat(101), "Some content").valid).toBe(false);
  });

  it("should return invalid for content longer than 1000 characters", () => {
    expect(validateNewPost("Some content", "a".repeat(1001)).valid).toBe(false);
  });

  it("should return invalid when content is provided but title is missing", () => {
    expect(validateNewPost("", "Some content").valid).toBe(false);
  });
});
