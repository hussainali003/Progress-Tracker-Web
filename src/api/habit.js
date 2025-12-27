const API_URL = "http://localhost:3000"; // your backend port

export async function createHabit({ habit, color, repeat, startDate, endDate, reminder }) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/habits/createHabit`, {
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

export async function getHabits() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/habits/getHabits`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch habits");
  }

  return await response.json();
}

export async function getHabitsWithRecords() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/habits/getHabitsWithRecords`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch habits");
  }

  return await response.json();
}

export async function getHabitDetail({ habitId }) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/habits/${habitId}/getHabitDetail`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch habit detail");
  }

  return await response.json();
}

export async function getUserHabits({ habitId }) {
  const token = localStorage.getItem("token");

  // i didn't need to send my habitId in params because i don't need habitId but frontend path is same as this so i think we should keep it or i don't know.
  const response = await fetch(`${API_URL}/habits/${habitId}/getUserHabits`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users habits");
  }

  return await response.json();
}
