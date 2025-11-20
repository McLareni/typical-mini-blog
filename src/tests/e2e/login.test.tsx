import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Page from "@/app/login/page";
import {
  TEST_USER,
  TEST_USER_ID,
  TEST_USER_PASSWORD,
} from "@/tests/setup/globalSetup";
import { UserDTO } from "@/types/user";

const pushMock = jest.fn();
const refreshMock = jest.fn();

const mockSetUser = jest.fn();
let mockUser: UserDTO | null = null;

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    refresh: refreshMock,
  }),
}));

jest.mock("@/context/userContext", () => ({
  useUser: () => ({
    user: mockUser,
    setUser: mockSetUser,
    userLoaded: true,
    setUserLoaded: jest.fn(),
  }),
}));

describe("Login Form", () => {
  beforeEach(() => {
    window.alert = jest.fn();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            id: TEST_USER_ID,
            email: TEST_USER.email,
            name: TEST_USER.name,
            accessToken: TEST_USER.accessToken,
            refreshToken: TEST_USER.refreshToken,
            createdAt: TEST_USER.refreshToken,
          }),
      })
    ) as jest.Mock;
  });

  test("Login user", async () => {
    render(<Page />);
    mockUser = null;

    const loginInput = screen.getByLabelText(/Login/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole("button", { name: /Login/i });

    await userEvent.type(loginInput, TEST_USER.email);
    await userEvent.type(passwordInput, TEST_USER_PASSWORD);

    await userEvent.click(submitButton);

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/user/login",
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: TEST_USER.email,
          password: TEST_USER_PASSWORD,
        }),
      })
    );

    expect(mockSetUser).toHaveBeenCalledWith({
      id: TEST_USER_ID,
      email: TEST_USER.email,
      name: TEST_USER.name,
      accessToken: TEST_USER.accessToken,
      refreshToken: TEST_USER.refreshToken,
      createdAt: TEST_USER.refreshToken,
    });
    expect(window.alert).toHaveBeenCalled();
    expect(pushMock).toHaveBeenCalled();
  });

  test("Login if you login", async () => {
    mockUser = { ...TEST_USER };
    render(<Page />);

    expect(pushMock).toHaveBeenCalled();
  });
});

describe("Register Form", () => {
  beforeEach(() => {
    window.alert = jest.fn();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: "User created", id: 0 }),
      })
    ) as jest.Mock;
  });

  const newUser = {
    login: "newUser",
    password: "password",
    name: "user",
  };

  test("Registration user", async () => {
    mockUser = null;
    render(<Page />);

    const changeModeButton = screen.getByRole("button", {
      name: "Don't have an account? Register",
    });

    await userEvent.click(changeModeButton);

    expect(changeModeButton).toHaveTextContent(
      "Already have an account? Login"
    );

    const loginInput = screen.getByLabelText(/Login/i);
    const nameInput = screen.getByLabelText(/Name/i);
    const passwordInput = screen.getByLabelText("Password");
    const repasswordInput = screen.getByLabelText("Repeat Password");

    const submitButton = screen.getByRole("button", { name: /Registration/i });

    await userEvent.type(loginInput, newUser.login);
    await userEvent.type(passwordInput, newUser.password);
    await userEvent.type(repasswordInput, newUser.password);
    await userEvent.type(nameInput, newUser.name);

    await userEvent.click(submitButton);

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/user/register",
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newUser,
          repassword: newUser.password,
        }),
      })
    );

    expect(window.alert).toHaveBeenCalled();
    expect(changeModeButton).toHaveTextContent(
      "Don't have an account? Register"
    );
  });
});
