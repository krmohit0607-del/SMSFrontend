const API_URL = "https://sikshakendra-api.azurewebsites.net/schooladmin/fees";

const authHeader = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const getFees = async () => {
  const res = await fetch(API_URL, { headers: authHeader() });
  return res.json();
};

export const getPendingFees = async () => {
  const res = await fetch(`${API_URL}/pending`, { headers: authHeader() });
  return res.json();
};

export const createFee = async (data) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(data),
  });
  return res.json();
};

export const payFee = async (id) => {
  return fetch(`${API_URL}/pay/${id}`, {
    method: "PUT",
    headers: authHeader(),
  });
};
