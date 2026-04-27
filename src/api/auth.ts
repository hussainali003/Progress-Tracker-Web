const API_URL = "http://localhost:3000";

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

export type RegisterResponse = {
  name: string;
  id: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type LoginResponse = {
  name: string;
  id: string;
  token: string;
};

export async function registerUser({
  name,
  email,
  password,
}: RegisterInput): Promise<RegisterResponse> {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Registration failed.");
  }

  return res.json();
}

export async function loginUser({ email, password }: LoginInput): Promise<LoginResponse> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Registration failed.");
  }

  return res.json();
}
