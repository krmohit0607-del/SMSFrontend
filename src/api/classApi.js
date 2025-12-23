const API = "https://sms-api-e10j.onrender.com/api/schooladmin/classes";

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const getClasses = async () => {
  const res = await fetch(API, { headers: headers() });
  return res.json();
};

export const createClass = async (data) =>
  fetch(API, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(data),
  });

export const addSubject = async (data) =>
  fetch(`${API}/subjects`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(data),
  });

export const deleteClass = async (id) =>
  fetch(`${API}/${id}`, {
    method: "DELETE",
    headers: headers(),
  });
