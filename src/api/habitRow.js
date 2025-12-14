const API_URL = "http://localhost:3000"; // your backend port

export async function completeHabit({ habitId, date }) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/habitRecords/${habitId}/habitRecord`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ date }),
  });

  if (!response.ok) {
    throw new Error("Failed to check habit");
  }

  return await response.json();
}

export async function unCompleteHabit({ habitId, date }) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/habitRecords/${habitId}/habitRecord`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ date }),
  });

  if (!response.ok) {
    throw new Error("Failed to uncheck habit");
  }

  return await response.json();
}
