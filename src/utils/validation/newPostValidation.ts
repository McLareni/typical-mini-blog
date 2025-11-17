export const validateNewPost = (title: string, content: string) => {
  if (!title || title.trim().length === 0) {
    return { valid: false, error: "Title is required." };
  }
  if (title.length > 100) {
    return { valid: false, error: "Title must be less than 100 characters." };
  }
  if (content && content.length > 1000) {
    return {
      valid: false,
      error: "Content must be less than 1000 characters.",
    };
  }
  return { valid: true };
};
