import "@testing-library/jest-dom";

jest.spyOn(console, "warn").mockImplementation((msg) => {
  if (typeof msg === "string" && msg.includes("prisma:warn")) return;
  console.warn(msg);
});

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

