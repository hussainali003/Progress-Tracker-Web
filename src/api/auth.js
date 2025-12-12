const API_URL = "http://localhost:3000"; // your backend port

export async function registerUser({ name, email, password }) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  // If backend throws 422 (email taken)
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Registration failed.");
  }

  return res.json(); // { name, id }
}

export async function loginUser({ email, password }) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  // If backend throws 422 (email taken)
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Registration failed.");
  }

  return res.json(); // { name, id, token }
}
