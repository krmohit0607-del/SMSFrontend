const API = "https://sikshakendra-api.azurewebsites.net/api/schooladmin/attendance";

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const getAttendanceSummary = async () => {
  const res = await fetch(`${API}/summary`, { headers: headers() });
  return res.json();
};

export const markAttendance = async (data) => {
  return fetch(API, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(data),
  });
};
