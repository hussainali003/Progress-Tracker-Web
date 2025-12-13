const API_URL = "http://localhost:3000"; // your backend port

export async function createHabit({ habit, color, repeat, startDate, endDate, reminder }) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/dashboard/createHabit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ habit, color, repeat, startDate, endDate, reminder }),
  });

  if (!response.ok) {
    throw new Error("Failed to create habit");
  }

  return await response.json();
}
