import { POST as Login } from "@/app/api/user/login/route";
import { POST as Registr } from "@/app/api/user/register/route";
import prisma from "@/lib/prisma";
import { TEST_USER, TEST_USER_PASSWORD } from "@/tests/setup/globalSetup";

describe("POST /api/user/login", () => {
  it("login user", async () => {
    const res = await Login(
      new Request("http://localhost/api/user/login", {
        method: "POST",
        body: JSON.stringify({
          password: TEST_USER_PASSWORD,
          login: TEST_USER.email,
        }),
      })
    );

    expect(res.status).toBe(200);
    const data = await res.json();

    expect(data).toHaveProperty("id");
    expect(data).toHaveProperty("email");
    expect(data).toHaveProperty("name");
    expect(data).toHaveProperty("accessToken");
    expect(data).toHaveProperty("refreshToken");
  });

  it("failed login user", async () => {
    const res = await Login(
      new Request("http://localhost/api/user/login", {
        method: "POST",
        body: JSON.stringify({
          password: "FAIL PASSWORD",
          login: TEST_USER.email,
        }),
        
      })
    );

    expect(res.status).toBe(401);
    const data = await res.json();

    expect(data).toHaveProperty("error");
  });
});

let createdUserId: number;

describe("POST /api/user/register", () => {
  const newUser = {
    login: "newUser",
    name: "user",
    password: "password",
  };

  it("user registration", async () => {
    const res = await Registr(
      new Request("http://localhost/api/user/registr", {
        method: "POST",
        body: JSON.stringify({
          ...newUser,
          repassword: "password",
        }),
      })
    );

    expect(res.status).toBe(201);

    const data = await res.json();

    createdUserId = data.id;

    expect(data).toHaveProperty("id");
    expect(data.message).toBe("User created");
  });

  afterAll(async () => {
    if (createdUserId) {
      await prisma.user.delete({
        where: { id: createdUserId },
      });
    }
  });
});
