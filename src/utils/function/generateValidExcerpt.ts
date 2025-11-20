export function generateExcerpt(content: string | null): string {
  return content?.slice(0, 30) || "";
}
