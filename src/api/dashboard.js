const API_URL = "https://sms-api-e10j.onrender.com/api/schooladmin/dashboard";

export const fetchDashboard = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to load dashboard");
  }

  return await response.json();
};
